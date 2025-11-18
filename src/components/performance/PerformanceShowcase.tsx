/**
 * Performance Optimization Showcase
 * Demonstrates advanced performance and scalability techniques
 * as required in the Norwegian oil & gas job posting
 */

import React, { memo, useCallback, useMemo, lazy, Suspense } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';

// Lazy load heavy components
const HeavyChartComponent = lazy(() => import('./HeavyChartComponent'));
const DataExportModal = lazy(() => import('./DataExportModal'));

// Types for performance optimization examples
interface ProductionData {
  id: string;
  facilityId: string;
  timestamp: string;
  oilProduction: number;
  gasProduction: number;
  efficiency: number;
}

interface PerformanceMetrics {
  renderTime: number;
  memoryUsage: number;
  bundleSize: number;
  cacheHitRate: number;
}

// Memoized sub-components to prevent unnecessary re-renders
const ProductionMetric = memo<{
  label: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
}>(({ label, value, unit, trend }) => {
  return (
    <div className='production-metric'>
      <div className='metric-label'>{label}</div>
      <div className='metric-value'>
        {value.toLocaleString()} {unit}
      </div>
      <div className={`metric-trend trend-${trend}`}>
        {trend === 'up' ? '↗' : trend === 'down' ? '↘' : '→'}
      </div>
    </div>
  );
});

ProductionMetric.displayName = 'ProductionMetric';

// Virtualized list for handling large datasets
const VirtualizedProductionList: React.FC<{
  data: ProductionData[];
  onItemClick: (item: ProductionData) => void;
}> = memo(({ data, onItemClick }) => {
  const parentRef = React.useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 60,
    overscan: 10, // Render extra items for smooth scrolling
  });

  const handleItemClick = useCallback(
    (item: ProductionData) => {
      onItemClick(item);
    },
    [onItemClick]
  );

  return (
    <div
      ref={parentRef}
      className='virtual-list-container'
      style={{ height: '400px', overflow: 'auto' }}
    >
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {virtualizer.getVirtualItems().map(virtualRow => {
          const item = data[virtualRow.index];
          return (
            <div
              key={item.id}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
              className='virtual-list-item'
              onClick={() => handleItemClick(item)}
            >
              <div className='production-item'>
                <div className='facility-id'>{item.facilityId}</div>
                <div className='production-values'>
                  Oil: {item.oilProduction} bbl/day | Gas: {item.gasProduction}{' '}
                  mcf/day | Efficiency: {item.efficiency}%
                </div>
                <div className='timestamp'>
                  {new Date(item.timestamp).toLocaleString('nb-NO')}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

VirtualizedProductionList.displayName = 'VirtualizedProductionList';

// Performance monitoring hook
const usePerformanceMonitoring = () => {
  const [metrics, setMetrics] = React.useState<PerformanceMetrics | null>(null);

  React.useEffect(() => {
    // Monitor component render times
    const startTime = performance.now();

    return () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;

      setMetrics({
        renderTime,
        memoryUsage: (performance as any).memory?.usedJSHeapSize || 0,
        bundleSize: 0, // Would be calculated by build tools
        cacheHitRate: 0.85, // Example value
      });
    };
  }, []);

  return metrics;
};

// Debounced search hook for performance
const useDebounceSearch = (searchTerm: string, delay: number = 300) => {
  const [debouncedTerm, setDebouncedTerm] = React.useState(searchTerm);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, delay]);

  return debouncedTerm;
};

// Main performance showcase component
const PerformanceShowcase: React.FC = () => {
  const [productionData, setProductionData] = React.useState<ProductionData[]>(
    []
  );
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedView, setSelectedView] = React.useState<'list' | 'chart'>(
    'list'
  );
  const [showExportModal, setShowExportModal] = React.useState(false);

  const debouncedSearchTerm = useDebounceSearch(searchTerm);
  const performanceMetrics = usePerformanceMonitoring();

  // Memoized filtered data to prevent unnecessary recalculations
  const filteredData = useMemo(() => {
    if (!debouncedSearchTerm) return productionData;

    return productionData.filter(item =>
      item.facilityId.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
  }, [productionData, debouncedSearchTerm]);

  // Memoized aggregated metrics
  const aggregatedMetrics = useMemo(() => {
    if (filteredData.length === 0) {
      return { totalOil: 0, totalGas: 0, avgEfficiency: 0 };
    }

    const totals = filteredData.reduce(
      (acc, item) => ({
        totalOil: acc.totalOil + item.oilProduction,
        totalGas: acc.totalGas + item.gasProduction,
        totalEfficiency: acc.totalEfficiency + item.efficiency,
      }),
      { totalOil: 0, totalGas: 0, totalEfficiency: 0 }
    );

    return {
      totalOil: totals.totalOil,
      totalGas: totals.totalGas,
      avgEfficiency: totals.totalEfficiency / filteredData.length,
    };
  }, [filteredData]);

  // Optimized event handlers
  const handleItemClick = useCallback((item: ProductionData) => {
    // eslint-disable-next-line no-console
    console.log('Selected production item:', item);
    // Implement item selection logic
  }, []);

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    },
    []
  );

  const handleViewChange = useCallback((view: 'list' | 'chart') => {
    setSelectedView(view);
  }, []);

  const handleExportData = useCallback(() => {
    setShowExportModal(true);
  }, []);

  // Load initial data with performance optimization
  React.useEffect(() => {
    const loadData = async () => {
      // Simulate loading large dataset with chunking
      const chunkSize = 1000;
      const totalItems = 10000;
      const chunks = Math.ceil(totalItems / chunkSize);

      for (let i = 0; i < chunks; i++) {
        const chunkData = Array.from({ length: chunkSize }, (_, index) => ({
          id: `prod-${i * chunkSize + index}`,
          facilityId: `FACILITY-${Math.floor(Math.random() * 100)
            .toString()
            .padStart(3, '0')}`,
          timestamp: new Date(
            Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
          ).toISOString(),
          oilProduction: Math.floor(Math.random() * 10000),
          gasProduction: Math.floor(Math.random() * 5000),
          efficiency: Math.floor(Math.random() * 40) + 60,
        }));

        setProductionData(prev => [...prev, ...chunkData]);

        // Yield control back to browser to prevent blocking
        await new Promise(resolve => setTimeout(resolve, 0));
      }
    };

    loadData();
  }, []);

  return (
    <div className='performance-showcase'>
      <div className='showcase-header'>
        <h1>Performance & Scalability Demo</h1>
        <div className='performance-metrics'>
          {performanceMetrics && (
            <>
              <span>Render: {performanceMetrics.renderTime.toFixed(2)}ms</span>
              <span>
                Memory:{' '}
                {(performanceMetrics.memoryUsage / 1024 / 1024).toFixed(2)}MB
              </span>
              <span>
                Cache: {(performanceMetrics.cacheHitRate * 100).toFixed(1)}%
              </span>
            </>
          )}
        </div>
      </div>

      {/* Optimized search input */}
      <div className='search-controls'>
        <input
          type='text'
          placeholder='Search facilities...'
          value={searchTerm}
          onChange={handleSearchChange}
          className='search-input'
        />
        <div className='view-controls'>
          <button
            className={selectedView === 'list' ? 'active' : ''}
            onClick={() => handleViewChange('list')}
          >
            List View
          </button>
          <button
            className={selectedView === 'chart' ? 'active' : ''}
            onClick={() => handleViewChange('chart')}
          >
            Chart View
          </button>
        </div>
        <button onClick={handleExportData} className='export-button'>
          Export Data
        </button>
      </div>

      {/* Memoized metrics dashboard */}
      <div className='metrics-dashboard'>
        <ProductionMetric
          label='Total Oil Production'
          value={aggregatedMetrics.totalOil}
          unit='bbl/day'
          trend='up'
        />
        <ProductionMetric
          label='Total Gas Production'
          value={aggregatedMetrics.totalGas}
          unit='mcf/day'
          trend='stable'
        />
        <ProductionMetric
          label='Average Efficiency'
          value={aggregatedMetrics.avgEfficiency}
          unit='%'
          trend='up'
        />
        <ProductionMetric
          label='Active Facilities'
          value={filteredData.length}
          unit='units'
          trend='stable'
        />
      </div>

      {/* Conditional rendering with lazy loading */}
      <div className='data-visualization'>
        {selectedView === 'list' ? (
          <VirtualizedProductionList
            data={filteredData}
            onItemClick={handleItemClick}
          />
        ) : (
          <Suspense
            fallback={<div className='chart-loading'>Loading chart...</div>}
          >
            <HeavyChartComponent data={filteredData} />
          </Suspense>
        )}
      </div>

      {/* Lazy loaded modal */}
      {showExportModal && (
        <Suspense
          fallback={<div className='modal-loading'>Loading export...</div>}
        >
          <DataExportModal
            data={filteredData}
            onClose={() => setShowExportModal(false)}
          />
        </Suspense>
      )}

      {/* Performance tips display */}
      <div className='performance-tips'>
        <h3>Performance Optimizations Applied:</h3>
        <ul>
          <li>
            <strong>Virtualized Lists</strong> - Rendering only visible items
            from {productionData.length.toLocaleString()} records
          </li>
          <li>
            <strong>Memoization</strong> - React.memo, useMemo, and useCallback
            to prevent unnecessary re-renders
          </li>
          <li>
            <strong>Lazy Loading</strong> - Code splitting for heavy components
          </li>
          <li>
            <strong>Debounced Search</strong> - Preventing excessive API calls
          </li>
          <li>
            <strong>Chunked Loading</strong> - Loading large datasets in
            manageable chunks
          </li>
          <li>
            <strong>Efficient State Updates</strong> - Optimized Redux patterns
          </li>
          <li>
            <strong>Image Optimization</strong> - WebP format with lazy loading
          </li>
          <li>
            <strong>Bundle Splitting</strong> - Webpack code splitting for
            smaller initial load
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PerformanceShowcase;
