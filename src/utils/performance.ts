/**
 * Performance Optimization Utilities
 * Tools for monitoring and optimizing application performance
 */

import * as React from 'react';
import { ComponentType, lazy, Suspense } from 'react';

// Lazy loading utility for code splitting
export const lazyLoad = <T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  fallback?: React.ReactNode
) => {
  const LazyComponent = lazy(importFunc);
  
  return (props: React.ComponentProps<T>) => {
    const FallbackComponent = fallback || React.createElement('div', null, 'Loading...');
    return React.createElement(Suspense, { fallback: FallbackComponent }, 
      React.createElement(LazyComponent, props)
    );
  };
};

// Debounce utility for performance optimization
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle utility for performance optimization
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Performance monitoring utility
export const measurePerformance = (name: string, fn: () => void) => {
  const start = performance.now();
  fn();
  const end = performance.now();
  console.log(`${name} took ${end - start} milliseconds`);
};

// Memory usage monitoring
export const getMemoryUsage = () => {
  if ('memory' in performance) {
    const memory = (performance as any).memory;
    return {
      used: Math.round(memory.usedJSHeapSize / 1048576 * 100) / 100,
      total: Math.round(memory.totalJSHeapSize / 1048576 * 100) / 100,
      limit: Math.round(memory.jsHeapSizeLimit / 1048576 * 100) / 100,
    };
  }
  return null;
};

// Bundle size optimization helper
export const preloadComponent = (importFunc: () => Promise<any>) => {
  return () => {
    importFunc();
  };
};

// Virtual scrolling utility for large lists
export const getVisibleItems = (
  items: any[],
  containerHeight: number,
  itemHeight: number,
  scrollTop: number
) => {
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(
    startIndex + Math.ceil(containerHeight / itemHeight) + 1,
    items.length
  );
  
  return {
    startIndex,
    endIndex,
    visibleItems: items.slice(startIndex, endIndex),
  };
};

// Image optimization utility
export const optimizeImage = (src: string, width?: number, height?: number) => {
  const params = new URLSearchParams();
  if (width) params.set('w', width.toString());
  if (height) params.set('h', height.toString());
  params.set('q', '80'); // Quality
  params.set('f', 'auto'); // Format
  
  return `${src}?${params.toString()}`;
};

// Cache utility for API responses
export class SimpleCache {
  private cache = new Map<string, { data: any; timestamp: number; ttl: number }>();
  
  set(key: string, data: any, ttl: number = 300000) { // 5 minutes default
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    });
  }
  
  get(key: string) {
    const item = this.cache.get(key);
    if (!item) return null;
    
    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key);
      return null;
    }
    
    return item.data;
  }
  
  clear() {
    this.cache.clear();
  }
  
  size() {
    return this.cache.size;
  }
}

// Performance metrics collection
export class PerformanceMetrics {
  private metrics: Map<string, number[]> = new Map();
  
  record(metricName: string, value: number) {
    if (!this.metrics.has(metricName)) {
      this.metrics.set(metricName, []);
    }
    this.metrics.get(metricName)!.push(value);
  }
  
  getAverage(metricName: string): number {
    const values = this.metrics.get(metricName);
    if (!values || values.length === 0) return 0;
    
    return values.reduce((sum, value) => sum + value, 0) / values.length;
  }
  
  getMax(metricName: string): number {
    const values = this.metrics.get(metricName);
    if (!values || values.length === 0) return 0;
    
    return Math.max(...values);
  }
  
  getMin(metricName: string): number {
    const values = this.metrics.get(metricName);
    if (!values || values.length === 0) return 0;
    
    return Math.min(...values);
  }
  
  getAllMetrics() {
    const result: Record<string, { average: number; max: number; min: number; count: number }> = {};
    
    Array.from(this.metrics.entries()).forEach(([name, values]) => {
      result[name] = {
        average: this.getAverage(name),
        max: this.getMax(name),
        min: this.getMin(name),
        count: values.length,
      };
    });
    
    return result;
  }
  
  clear() {
    this.metrics.clear();
  }
}

// Export singleton instances
export const cache = new SimpleCache();
export const performanceMetrics = new PerformanceMetrics();
