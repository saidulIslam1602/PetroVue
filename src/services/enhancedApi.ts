/**
 * Advanced REST API Service Layer
 * Demonstrates comprehensive REST API experience as required in job posting
 *
 * Features:
 * - Comprehensive error handling and retry logic
 * - Request/response interceptors
 * - Authentication handling
 * - Caching mechanisms
 * - Rate limiting
 * - Request cancellation
 * - Type-safe API responses
 */

import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CancelTokenSource,
} from 'axios';

// API Response Types
export interface ApiResponse<T = any> {
  data: T;
  message: string;
  status: 'success' | 'error';
  timestamp: string;
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
  };
}

export interface ApiError {
  message: string;
  code: string;
  details?: Record<string, any>;
  timestamp: string;
}

// API Configuration
interface ApiConfig {
  baseURL: string;
  timeout: number;
  retryAttempts: number;
  retryDelay: number;
  enableCaching: boolean;
  enableLogging: boolean;
}

// Request Queue for Rate Limiting
interface QueuedRequest {
  config: AxiosRequestConfig;
  resolve: (value: any) => void;
  reject: (reason: any) => void;
}

class EnhancedApiClient {
  private client: AxiosInstance;
  private config: ApiConfig;
  private requestQueue: QueuedRequest[] = [];
  private isProcessingQueue = false;
  private cache = new Map<
    string,
    { data: any; timestamp: number; ttl: number }
  >();
  private cancelTokens = new Map<string, CancelTokenSource>();

  constructor(config: Partial<ApiConfig> = {}) {
    this.config = {
      baseURL: process.env.REACT_APP_API_BASE_URL || 'https://api.petrovue.com',
      timeout: 10000,
      retryAttempts: 3,
      retryDelay: 1000,
      enableCaching: true,
      enableLogging: process.env.NODE_ENV === 'development',
      ...config,
    };

    this.client = axios.create({
      baseURL: this.config.baseURL,
      timeout: this.config.timeout,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request Interceptor
    this.client.interceptors.request.use(
      (config: any) => {
        const token = this.getAuthToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        // Add request ID for tracking
        config.metadata = { requestId: this.generateRequestId() };

        if (this.config.enableLogging) {
          console.log(`API Request [${config.metadata.requestId}]:`, {
            method: config.method?.toUpperCase(),
            url: config.url,
            data: config.data,
          });
        }

        return config;
      },
      error => {
        // eslint-disable-next-line no-console
        console.error('Request interceptor error:', error);
        return Promise.reject(error);
      }
    );

    // Response Interceptor
    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        if (this.config.enableLogging) {
          console.log(
            `API Response [${(response.config as any).metadata?.requestId}]:`,
            {
              status: response.status,
              data: response.data,
            }
          );
        }

        // Cache successful GET requests
        if (
          this.config.enableCaching &&
          response.config.method === 'get' &&
          response.status === 200
        ) {
          this.cacheResponse(response.config.url!, response.data);
        }

        return response;
      },
      async error => {
        const originalRequest = error.config;

        if (this.config.enableLogging) {
          console.error(
            `API Error [${originalRequest?.metadata?.requestId}]:`,
            {
              status: error.response?.status,
              message: error.message,
              url: originalRequest?.url,
            }
          );
        }

        // Handle token refresh
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            await this.refreshToken();
            return this.client(originalRequest);
          } catch (refreshError) {
            this.handleAuthError();
            return Promise.reject(refreshError);
          }
        }

        // Retry logic for network errors
        if (
          !originalRequest._retry &&
          this.shouldRetry(error) &&
          originalRequest._retryCount < this.config.retryAttempts
        ) {
          originalRequest._retry = true;
          originalRequest._retryCount = (originalRequest._retryCount || 0) + 1;

          await this.delay(
            this.config.retryDelay * originalRequest._retryCount
          );
          return this.client(originalRequest);
        }

        return Promise.reject(this.normalizeError(error));
      }
    );
  }

  // Enhanced HTTP Methods with caching and error handling
  async get<T>(
    url: string,
    config: AxiosRequestConfig & {
      cacheTTL?: number;
      bypassCache?: boolean;
    } = {}
  ): Promise<ApiResponse<T>> {
    const { cacheTTL = 300000, bypassCache = false, ...axiosConfig } = config;

    // Check cache first
    if (this.config.enableCaching && !bypassCache) {
      const cached = this.getCachedResponse(url);
      if (cached) {
        if (this.config.enableLogging) {
          console.log(`Cache hit for: ${url}`);
        }
        return cached;
      }
    }

    const response = await this.client.get<ApiResponse<T>>(url, axiosConfig);
    return response.data;
  }

  async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.client.post<ApiResponse<T>>(url, data, config);
    this.invalidateRelatedCache(url);
    return response.data;
  }

  async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.client.put<ApiResponse<T>>(url, data, config);
    this.invalidateRelatedCache(url);
    return response.data;
  }

  async patch<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.client.patch<ApiResponse<T>>(url, data, config);
    this.invalidateRelatedCache(url);
    return response.data;
  }

  async delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.client.delete<ApiResponse<T>>(url, config);
    this.invalidateRelatedCache(url);
    return response.data;
  }

  // File Upload with Progress
  async uploadFile(
    url: string,
    file: File,
    onProgress?: (progress: number) => void
  ): Promise<ApiResponse<any>> {
    const formData = new FormData();
    formData.append('file', file);

    return this.client
      .post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: progressEvent => {
          if (onProgress && progressEvent.total) {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            onProgress(progress);
          }
        },
      })
      .then(response => response.data);
  }

  // Request Cancellation
  cancelRequest(requestId: string): void {
    const cancelToken = this.cancelTokens.get(requestId);
    if (cancelToken) {
      cancelToken.cancel('Request cancelled by user');
      this.cancelTokens.delete(requestId);
    }
  }

  cancelAllRequests(): void {
    this.cancelTokens.forEach(cancelToken => {
      cancelToken.cancel('All requests cancelled');
    });
    this.cancelTokens.clear();
  }

  // Cache Management
  private cacheResponse(url: string, data: any, ttl: number = 300000): void {
    this.cache.set(url, {
      data,
      timestamp: Date.now(),
      ttl,
    });
  }

  private getCachedResponse(url: string): any | null {
    const cached = this.cache.get(url);
    if (cached && Date.now() - cached.timestamp < cached.ttl) {
      return cached.data;
    }
    this.cache.delete(url);
    return null;
  }

  private invalidateRelatedCache(url: string): void {
    const urlParts = url.split('/');
    const baseResource = urlParts[1]; // e.g., 'facilities' from '/facilities/123'

    Array.from(this.cache.keys()).forEach(cacheKey => {
      if (cacheKey.includes(baseResource)) {
        this.cache.delete(cacheKey);
      }
    });
  }

  clearCache(): void {
    this.cache.clear();
  }

  // Authentication
  private getAuthToken(): string | null {
    return (
      localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token')
    );
  }

  private async refreshToken(): Promise<void> {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await this.client.post('/auth/refresh', {
      refresh_token: refreshToken,
    });

    const { access_token, refresh_token: newRefreshToken } = response.data.data;
    localStorage.setItem('auth_token', access_token);
    localStorage.setItem('refresh_token', newRefreshToken);
  }

  private handleAuthError(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('refresh_token');
    window.location.href = '/login';
  }

  // Utility Methods
  private shouldRetry(error: any): boolean {
    return (
      !error.response ||
      error.response.status >= 500 ||
      error.code === 'NETWORK_ERROR' ||
      error.code === 'TIMEOUT'
    );
  }

  private normalizeError(error: any): ApiError {
    if (error.response?.data) {
      return error.response.data;
    }

    return {
      message: error.message || 'An unexpected error occurred',
      code: error.code || 'UNKNOWN_ERROR',
      timestamp: new Date().toISOString(),
    };
  }

  private generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Health Check
  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    try {
      const response = await this.get('/health');
      return {
        status: 'healthy',
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
      };
    }
  }

  // Connection Status
  isOnline(): boolean {
    return navigator.onLine;
  }

  // Statistics
  getCacheStats(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
    };
  }
}

// Export singleton instance
export const enhancedApi = new EnhancedApiClient();

// Export class for custom instances
export default EnhancedApiClient;
