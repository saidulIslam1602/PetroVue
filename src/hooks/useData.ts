/**
 * Data Hooks
 * React hooks for data fetching and state management
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  dataService,
  FacilityData,
  OperationalMetrics,
  AlertData,
  ProductionData,
  SafetyMetrics,
  SafetyIncident,
  WellData,
  EquipmentData,
  EnvironmentalMetrics
} from '../services/dataService';

// Generic data fetching hook
interface UseDataResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  lastUpdated: Date | null;
}

function useData<T>(
  fetchFn: () => Promise<T>,
  dependencies: unknown[] = [],
  options: {
    refreshInterval?: number;
    retryOnError?: boolean;
    initialData?: T;
  } = {}
): UseDataResult<T> {
  const [data, setData] = useState<T | null>(options.initialData || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  
  const fetchFnRef = useRef(fetchFn);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  fetchFnRef.current = fetchFn;

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchFnRef.current();
      setData(result);
      setLastUpdated(new Date());
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      
      if (!options.retryOnError) {
        console.error('Data fetch error:', errorMessage);
      }
    } finally {
      setLoading(false);
    }
  }, [options.retryOnError]);

  useEffect(() => {
    fetchData();

    // Set up refresh interval if specified
    if (options.refreshInterval && options.refreshInterval > 0) {
      intervalRef.current = setInterval(fetchData, options.refreshInterval);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [...dependencies, fetchData, options.refreshInterval]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    lastUpdated
  };
}

// Facility hooks
export function useFacilities(): UseDataResult<FacilityData[]> {
  return useData(
    () => dataService.getFacilities(),
    [],
    { refreshInterval: 300000 } // 5 minutes
  );
}

export function useFacility(facilityId: string): UseDataResult<FacilityData | null> {
  return useData(
    () => dataService.getFacility(facilityId),
    [facilityId],
    { refreshInterval: 300000 }
  );
}

// Operational data hooks
export function useOperationalMetrics(facilityId: string): UseDataResult<OperationalMetrics> {
  return useData(
    () => dataService.getOperationalMetrics(facilityId),
    [facilityId],
    { refreshInterval: 60000 } // 1 minute
  );
}

export function useAlerts(facilityId?: string): UseDataResult<AlertData[]> {
  return useData(
    () => dataService.getAlerts(facilityId),
    [facilityId],
    { 
      refreshInterval: 30000, // 30 seconds
      initialData: []
    }
  );
}

// Production hooks
export function useProductionData(
  facilityId: string, 
  period: string = '7d'
): UseDataResult<ProductionData[]> {
  return useData(
    () => dataService.getProductionData(facilityId, period),
    [facilityId, period],
    { 
      refreshInterval: 120000, // 2 minutes
      initialData: []
    }
  );
}

export function useWells(facilityId: string): UseDataResult<WellData[]> {
  return useData(
    () => dataService.getWells(facilityId),
    [facilityId],
    { 
      refreshInterval: 300000, // 5 minutes
      initialData: []
    }
  );
}

// Safety hooks
export function useSafetyMetrics(facilityId: string): UseDataResult<SafetyMetrics> {
  return useData(
    () => dataService.getSafetyMetrics(facilityId),
    [facilityId],
    { refreshInterval: 300000 }
  );
}

export function useSafetyIncidents(
  facilityId: string, 
  limit: number = 50
): UseDataResult<SafetyIncident[]> {
  return useData(
    () => dataService.getSafetyIncidents(facilityId, limit),
    [facilityId, limit],
    { 
      refreshInterval: 180000, // 3 minutes
      initialData: []
    }
  );
}

// Equipment hooks
export function useEquipment(facilityId: string): UseDataResult<EquipmentData[]> {
  return useData(
    () => dataService.getEquipment(facilityId),
    [facilityId],
    { 
      refreshInterval: 120000, // 2 minutes
      initialData: []
    }
  );
}

// Environmental hooks
export function useEnvironmentalMetrics(facilityId: string): UseDataResult<EnvironmentalMetrics> {
  return useData(
    () => dataService.getEnvironmentalMetrics(facilityId),
    [facilityId],
    { refreshInterval: 300000 }
  );
}

// Real-time data hook with WebSocket support
export function useRealTimeData<T>(
  endpoint: string,
  initialData: T
): UseDataResult<T> {
  const [data, setData] = useState<T>(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Try to establish WebSocket connection for real-time updates
    const wsUrl = process.env.REACT_APP_WS_URL || 'ws://localhost:3001';
    
    try {
      wsRef.current = new WebSocket(`${wsUrl}${endpoint}`);
      
      wsRef.current.onopen = () => {
        console.log(`WebSocket connected to ${endpoint}`);
        setError(null);
      };
      
      wsRef.current.onmessage = (event) => {
        try {
          const newData = JSON.parse(event.data);
          setData(newData);
          setLastUpdated(new Date());
        } catch (err) {
          console.error('Error parsing WebSocket data:', err);
        }
      };
      
      wsRef.current.onerror = (err) => {
        console.error('WebSocket error:', err);
        setError('Real-time connection failed');
      };
      
      wsRef.current.onclose = () => {
        console.log('WebSocket connection closed');
      };
      
    } catch (err) {
      console.error('Failed to establish WebSocket connection:', err);
      setError('Real-time connection unavailable');
    }

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [endpoint]);

  const refetch = useCallback(async () => {
    // For real-time data, we don't typically refetch manually
    // but we can trigger a refresh request through WebSocket
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ action: 'refresh' }));
    }
  }, []);

  return {
    data,
    loading,
    error,
    refetch,
    lastUpdated
  };
}

// Chart data transformation hook
export function useChartData<T>(
  data: T[] | null,
  transformer: (data: T[]) => unknown[]
): { chartData: unknown[]; loading: boolean } {
  const [chartData, setChartData] = useState<unknown[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data) {
      try {
        const transformed = transformer(data);
        setChartData(transformed);
      } catch (error) {
        console.error('Error transforming chart data:', error);
        setChartData([]);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(true);
    }
  }, [data, transformer]);

  return { chartData, loading };
}

// Data aggregation hook
export function useAggregatedData<T, R>(
  data: T[] | null,
  aggregator: (data: T[]) => R,
  defaultValue: R
): R {
  const [aggregatedData, setAggregatedData] = useState<R>(defaultValue);

  useEffect(() => {
    if (data && data.length > 0) {
      try {
        const result = aggregator(data);
        setAggregatedData(result);
      } catch (error) {
        console.error('Error aggregating data:', error);
        setAggregatedData(defaultValue);
      }
    } else {
      setAggregatedData(defaultValue);
    }
  }, [data, aggregator, defaultValue]);

  return aggregatedData;
}

// Data filtering hook
export function useFilteredData<T>(
  data: T[] | null,
  filterFn: (item: T) => boolean,
  dependencies: unknown[] = []
): T[] {
  const [filteredData, setFilteredData] = useState<T[]>([]);

  useEffect(() => {
    if (data) {
      const filtered = data.filter(filterFn);
      setFilteredData(filtered);
    } else {
      setFilteredData([]);
    }
  }, [data, filterFn, ...dependencies]);

  return filteredData;
}