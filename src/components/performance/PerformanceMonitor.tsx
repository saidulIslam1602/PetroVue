/**
 * Performance Monitor Component
 * Real-time performance monitoring and optimization
 */

import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { performanceMetrics, getMemoryUsage } from '../../utils/performance';

interface PerformanceData {
  memory: {
    used: number;
    total: number;
    limit: number;
  } | null;
  metrics: Record<
    string,
    { average: number; max: number; min: number; count: number }
  >;
  renderTime: number;
  componentCount: number;
}

export const PerformanceMonitor: React.FC = () => {
  const [performanceData, setPerformanceData] = useState<PerformanceData>({
    memory: null,
    metrics: {},
    renderTime: 0,
    componentCount: 0,
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const startTime = performance.now();

    const updatePerformanceData = () => {
      const memory = getMemoryUsage();
      const metrics = performanceMetrics.getAllMetrics();
      const renderTime = performance.now() - startTime;

      setPerformanceData({
        memory,
        metrics,
        renderTime,
        componentCount: document.querySelectorAll('[data-testid]').length,
      });
    };

    // Update performance data every 5 seconds
    const interval = setInterval(updatePerformanceData, 5000);
    updatePerformanceData();

    return () => clearInterval(interval);
  }, []);

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getPerformanceColor = (value: number, threshold: number) => {
    if (value < threshold * 0.7) return '#4caf50'; // Green
    if (value < threshold * 0.9) return '#ff9800'; // Orange
    return '#f44336'; // Red
  };

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 1000,
          background: '#0066cc',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          cursor: 'pointer',
          fontSize: '12px',
          fontWeight: 'bold',
        }}
        title='Show Performance Monitor'
      >
        PERF
      </button>
    );
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 1000,
        width: '300px',
        maxHeight: '400px',
        overflow: 'auto',
        background: 'white',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      }}
    >
      <Card>
        <CardHeader>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <h3 style={{ margin: 0, fontSize: '14px', color: '#0066cc' }}>
              Performance Monitor
            </h3>
            <button
              onClick={() => setIsVisible(false)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '16px',
                cursor: 'pointer',
                color: '#666',
              }}
            >
              ×
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <div style={{ fontSize: '12px', lineHeight: 1.4 }}>
            {/* Memory Usage */}
            {performanceData.memory && (
              <div style={{ marginBottom: '12px' }}>
                <h4
                  style={{
                    margin: '0 0 4px 0',
                    fontSize: '12px',
                    color: '#333',
                  }}
                >
                  Memory Usage
                </h4>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <span>Used:</span>
                  <span
                    style={{
                      color: getPerformanceColor(
                        performanceData.memory.used,
                        100
                      ),
                    }}
                  >
                    {formatBytes(performanceData.memory.used * 1024 * 1024)}
                  </span>
                </div>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <span>Total:</span>
                  <span>
                    {formatBytes(performanceData.memory.total * 1024 * 1024)}
                  </span>
                </div>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <span>Limit:</span>
                  <span>
                    {formatBytes(performanceData.memory.limit * 1024 * 1024)}
                  </span>
                </div>
              </div>
            )}

            {/* Render Time */}
            <div style={{ marginBottom: '12px' }}>
              <h4
                style={{ margin: '0 0 4px 0', fontSize: '12px', color: '#333' }}
              >
                Render Performance
              </h4>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Render Time:</span>
                <span
                  style={{
                    color: getPerformanceColor(performanceData.renderTime, 100),
                  }}
                >
                  {performanceData.renderTime.toFixed(2)}ms
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Components:</span>
                <span>{performanceData.componentCount}</span>
              </div>
            </div>

            {/* Performance Metrics */}
            {Object.keys(performanceData.metrics).length > 0 && (
              <div style={{ marginBottom: '12px' }}>
                <h4
                  style={{
                    margin: '0 0 4px 0',
                    fontSize: '12px',
                    color: '#333',
                  }}
                >
                  Custom Metrics
                </h4>
                {Object.entries(performanceData.metrics).map(([name, data]) => (
                  <div key={name} style={{ marginBottom: '4px' }}>
                    <div
                      style={{
                        fontSize: '10px',
                        color: '#666',
                        marginBottom: '2px',
                      }}
                    >
                      {name}
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: '10px',
                      }}
                    >
                      <span>Avg: {data.average.toFixed(2)}</span>
                      <span>Max: {data.max.toFixed(2)}</span>
                      <span>Count: {data.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Performance Tips */}
            <div
              style={{
                marginTop: '12px',
                padding: '8px',
                background: '#f5f5f5',
                borderRadius: '4px',
              }}
            >
              <h4
                style={{ margin: '0 0 4px 0', fontSize: '11px', color: '#333' }}
              >
                Performance Tips
              </h4>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: '16px',
                  fontSize: '10px',
                  color: '#666',
                }}
              >
                <li>Use React.memo for expensive components</li>
                <li>Implement lazy loading for large datasets</li>
                <li>Optimize images and assets</li>
                <li>Monitor bundle size regularly</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
