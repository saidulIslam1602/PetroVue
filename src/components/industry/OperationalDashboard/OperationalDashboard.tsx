/**
 * OperationalDashboard Component
 * Real-time operational dashboard for oil & gas facilities
 * Displays critical metrics, alerts, and system status
 */

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '../../ui/Card';
import { MetricCard } from '../../ui/MetricCard';
import { Alert } from '../../ui/Alert';
import { Chart } from '../../ui/Chart';
import {
  OperationalDashboardContainer,
  DashboardGrid,
  StatusIndicator,
} from './OperationalDashboard.styles';

export interface OperationalMetrics {
  production: {
    oil: number;
    gas: number;
    water: number;
    efficiency: number;
  };
  safety: {
    score: number;
    incidents: number;
    lastInspection: string;
  };
  equipment: {
    totalUnits: number;
    operational: number;
    maintenance: number;
    critical: number;
  };
  environmental: {
    emissions: number;
    waste: number;
    compliance: number;
  };
}

export interface OperationalDashboardProps {
  facilityId: string;
  facilityName: string;
  metrics: OperationalMetrics;
  alerts: Array<{
    id: string;
    type: 'critical' | 'warning' | 'info';
    title: string;
    message: string;
    timestamp: string;
  }>;
  onRefresh?: () => void;
  className?: string;
  'data-testid'?: string;
}

// Sample real-time data generator
const generateRealTimeData = () => {
  const baseData = [
    { name: '00:00', oil: 1200, gas: 2100, water: 850 },
    { name: '04:00', oil: 1250, gas: 2150, water: 880 },
    { name: '08:00', oil: 1300, gas: 2200, water: 900 },
    { name: '12:00', oil: 1280, gas: 2180, water: 870 },
    { name: '16:00', oil: 1350, gas: 2250, water: 920 },
    { name: '20:00', oil: 1320, gas: 2220, water: 890 },
  ];

  return baseData.map(item => ({
    ...item,
    value: item.oil,
    oil: item.oil + Math.floor(Math.random() * 100 - 50),
    gas: item.gas + Math.floor(Math.random() * 200 - 100),
    water: item.water + Math.floor(Math.random() * 50 - 25),
  }));
};

export const OperationalDashboard: React.FC<OperationalDashboardProps> = ({
  facilityId,
  facilityName,
  metrics,
  alerts,
  onRefresh,
  className,
  'data-testid': testId,
}) => {
  const [realTimeData, setRealTimeData] = useState(generateRealTimeData());
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(generateRealTimeData());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    onRefresh?.();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const getOverallStatus = () => {
    const criticalAlerts = alerts.filter(
      alert => alert.type === 'critical'
    ).length;
    const warningAlerts = alerts.filter(
      alert => alert.type === 'warning'
    ).length;

    if (criticalAlerts > 0) return 'critical';
    if (warningAlerts > 0) return 'warning';
    if (metrics.safety.score < 95) return 'warning';
    return 'normal';
  };

  const overallStatus = getOverallStatus();

  return (
    <OperationalDashboardContainer className={className} data-testid={testId}>
      {/* Header Section */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
          padding: '1rem',
          backgroundColor: '#f8fafc',
          borderRadius: '8px',
          border: '1px solid #e2e8f0',
        }}
      >
        <div>
          <h2
            style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#1e293b',
              margin: '0 0 0.25rem 0',
            }}
          >
            {facilityName}
          </h2>
          <p
            style={{
              fontSize: '0.875rem',
              color: '#64748b',
              margin: 0,
            }}
          >
            Facility ID: {facilityId} | Last Updated:{' '}
            {new Date().toLocaleTimeString()}
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <StatusIndicator status={overallStatus}>
            {overallStatus === 'critical'
              ? 'CRITICAL'
              : overallStatus === 'warning'
                ? 'WARNING'
                : 'NORMAL'}
          </StatusIndicator>

          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#0066cc',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: isRefreshing ? 'not-allowed' : 'pointer',
              opacity: isRefreshing ? 0.7 : 1,
              fontSize: '0.875rem',
              fontWeight: '500',
            }}
          >
            {isRefreshing ? 'Refreshing...' : 'Refresh Data'}
          </button>
        </div>
      </div>

      {/* Critical Alerts */}
      {alerts.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h3
            style={{
              fontSize: '1.125rem',
              fontWeight: '600',
              color: '#1e293b',
              marginBottom: '1rem',
            }}
          >
            Active Alerts ({alerts.length})
          </h3>
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
          >
            {alerts.slice(0, 3).map(alert => (
              <Alert
                key={alert.id}
                type={alert.type}
                title={alert.title}
                message={alert.message}
                dismissible={false}
              />
            ))}
            {alerts.length > 3 && (
              <div
                style={{
                  padding: '0.75rem',
                  backgroundColor: '#f1f5f9',
                  borderRadius: '6px',
                  textAlign: 'center',
                  color: '#64748b',
                  fontSize: '0.875rem',
                }}
              >
                +{alerts.length - 3} more alerts
              </div>
            )}
          </div>
        </div>
      )}

      {/* Key Metrics Grid */}
      <DashboardGrid>
        <MetricCard
          title='Oil Production'
          value={metrics.production.oil}
          unit='bbl/day'
          change={{
            value: 2.5,
            type: 'increase',
            period: 'vs yesterday',
          }}
          status={metrics.production.oil > 1200 ? 'success' : 'normal'}
          trend='up'
        />

        <MetricCard
          title='Gas Production'
          value={metrics.production.gas}
          unit='mcf/day'
          change={{
            value: 1.8,
            type: 'increase',
            period: 'vs yesterday',
          }}
          status='normal'
          trend='up'
        />

        <MetricCard
          title='Safety Score'
          value={metrics.safety.score}
          unit='%'
          change={{
            value: 0.5,
            type: 'increase',
            period: 'vs last week',
          }}
          status={metrics.safety.score >= 95 ? 'success' : 'warning'}
          trend='up'
        />

        <MetricCard
          title='Equipment Status'
          value={metrics.equipment.operational}
          unit={`/ ${metrics.equipment.totalUnits}`}
          change={{
            value: 0,
            type: 'neutral',
            period: 'units operational',
          }}
          status={metrics.equipment.critical > 0 ? 'critical' : 'normal'}
        />
      </DashboardGrid>

      {/* Charts Section */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '1.5rem',
          marginTop: '2rem',
        }}
      >
        <Card>
          <CardHeader>
            <h4>Real-time Production Trends</h4>
          </CardHeader>
          <CardContent>
            <Chart
              type='line'
              data={realTimeData}
              height={300}
              showLegend
              showGrid
              title='24-Hour Production Overview'
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h4>System Status</h4>
          </CardHeader>
          <CardContent>
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '0.75rem',
                  backgroundColor: '#f8fafc',
                  borderRadius: '6px',
                }}
              >
                <span style={{ fontSize: '0.875rem', color: '#64748b' }}>
                  Total Equipment
                </span>
                <span style={{ fontWeight: '600' }}>
                  {metrics.equipment.totalUnits}
                </span>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '0.75rem',
                  backgroundColor: '#f0fdf4',
                  borderRadius: '6px',
                }}
              >
                <span style={{ fontSize: '0.875rem', color: '#64748b' }}>
                  Operational
                </span>
                <span style={{ fontWeight: '600', color: '#059669' }}>
                  {metrics.equipment.operational}
                </span>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '0.75rem',
                  backgroundColor: '#fef3c7',
                  borderRadius: '6px',
                }}
              >
                <span style={{ fontSize: '0.875rem', color: '#64748b' }}>
                  Maintenance
                </span>
                <span style={{ fontWeight: '600', color: '#d97706' }}>
                  {metrics.equipment.maintenance}
                </span>
              </div>

              {metrics.equipment.critical > 0 && (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '0.75rem',
                    backgroundColor: '#fef2f2',
                    borderRadius: '6px',
                  }}
                >
                  <span style={{ fontSize: '0.875rem', color: '#64748b' }}>
                    Critical
                  </span>
                  <span style={{ fontWeight: '600', color: '#dc2626' }}>
                    {metrics.equipment.critical}
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </OperationalDashboardContainer>
  );
};

export default OperationalDashboard;
