/**
 * ProductionTracker Component
 * Real-time production tracking for oil & gas facilities
 * Monitors wells, production rates, and efficiency metrics
 */

import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '../../ui/Card';
import { MetricCard } from '../../ui/MetricCard';
import { Chart } from '../../ui/Chart';
import { Alert } from '../../ui/Alert';
import { ProductionTrackerContainer, WellGrid, ProductionChart } from './ProductionTracker.styles';

export interface WellData {
  id: string;
  name: string;
  type: 'oil' | 'gas' | 'water' | 'injection';
  status: 'active' | 'inactive' | 'maintenance' | 'shut-in';
  production: {
    rate: number;
    unit: string;
    efficiency: number;
  };
  pressure: {
    current: number;
    target: number;
    unit: string;
  };
  lastUpdate: string;
  location: {
    platform: string;
    zone: string;
  };
}

export interface ProductionMetrics {
  totalOil: number;
  totalGas: number;
  totalWater: number;
  efficiency: number;
  activeWells: number;
  totalWells: number;
  dailyTarget: number;
  monthlyTarget: number;
}

export interface ProductionTrackerProps {
  facilityId: string;
  wells: WellData[];
  metrics: ProductionMetrics;
  onWellClick?: (well: WellData) => void;
  onRefresh?: () => void;
  className?: string;
  'data-testid'?: string;
}

const getWellStatusColor = (status: WellData['status']) => {
  switch (status) {
    case 'active': return '#059669';
    case 'inactive': return '#6b7280';
    case 'maintenance': return '#d97706';
    case 'shut-in': return '#dc2626';
    default: return '#6b7280';
  }
};

const getWellStatusIcon = (status: WellData['status']) => {
  const iconProps = { width: 16, height: 16 };
  
  switch (status) {
    case 'active':
      return (
        <svg {...iconProps} viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      );
    case 'maintenance':
      return (
        <svg {...iconProps} viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01-.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
        </svg>
      );
    case 'shut-in':
      return (
        <svg {...iconProps} viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
      );
    default:
      return (
        <svg {...iconProps} viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      );
  }
};

export const ProductionTracker: React.FC<ProductionTrackerProps> = ({
  facilityId,
  wells,
  metrics,
  onWellClick,
  onRefresh,
  className,
  'data-testid': testId,
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState<'24h' | '7d' | '30d'>('24h');

  const handleRefresh = async () => {
    setIsRefreshing(true);
    onRefresh?.();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  // Generate production trend data based on selected timeframe
  const generateProductionData = () => {
    const hours = selectedTimeframe === '24h' ? 24 : selectedTimeframe === '7d' ? 7 : 30;
    const data = [];
    
    for (let i = 0; i < hours; i++) {
      const baseOil = metrics.totalOil;
      const baseGas = metrics.totalGas;
      const baseWater = metrics.totalWater;
      
      data.push({
        name: selectedTimeframe === '24h' ? `${i}:00` : `Day ${i + 1}`,
        value: baseOil + Math.floor(Math.random() * 200 - 100),
        oil: baseOil + Math.floor(Math.random() * 200 - 100),
        gas: baseGas + Math.floor(Math.random() * 300 - 150),
        water: baseWater + Math.floor(Math.random() * 100 - 50),
      });
    }
    
    return data;
  };

  const productionData = generateProductionData();

  const getOverallStatus = () => {
    const shutInWells = wells.filter(well => well.status === 'shut-in').length;
    const maintenanceWells = wells.filter(well => well.status === 'maintenance').length;
    
    if (shutInWells > 0) return 'critical';
    if (maintenanceWells > wells.length * 0.2) return 'warning';
    if (metrics.efficiency < 85) return 'warning';
    return 'success';
  };

  const overallStatus = getOverallStatus();

  return (
    <ProductionTrackerContainer className={className} data-testid={testId}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '2rem',
        padding: '1rem',
        backgroundColor: '#f8fafc',
        borderRadius: '8px',
        border: '1px solid #e2e8f0'
      }}>
        <div>
          <h2 style={{ 
            fontSize: '1.5rem', 
            fontWeight: '700', 
            color: '#1e293b',
            margin: '0 0 0.25rem 0'
          }}>
            Production Tracker - Facility {facilityId}
          </h2>
          <p style={{ 
            fontSize: '0.875rem', 
            color: '#64748b',
            margin: 0
          }}>
            Real-time production monitoring and well management
          </p>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value as '24h' | '7d' | '30d')}
            style={{
              padding: '0.5rem',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '0.875rem'
            }}
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
          
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
              fontWeight: '500'
            }}
          >
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
      </div>

      {/* Production Alerts */}
      {overallStatus === 'critical' && (
        <Alert
          type="critical"
          title="Production Alert"
          message="One or more wells are shut-in. Immediate attention required."
          dismissible={false}
        />
      )}

      {/* Production Metrics */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        <MetricCard
          title="Total Oil Production"
          value={metrics.totalOil}
          unit="bbl/day"
          change={{ 
            value: 3.2, 
            type: 'increase', 
            period: 'vs yesterday' 
          }}
          status={overallStatus}
          trend="up"
        />
        
        <MetricCard
          title="Total Gas Production"
          value={metrics.totalGas}
          unit="mcf/day"
          change={{ 
            value: 1.8, 
            type: 'increase', 
            period: 'vs yesterday' 
          }}
          status="normal"
          trend="up"
        />
        
        <MetricCard
          title="Production Efficiency"
          value={metrics.efficiency}
          unit="%"
          change={{ 
            value: 0.5, 
            type: 'increase', 
            period: 'vs last week' 
          }}
          status={metrics.efficiency >= 90 ? 'success' : 'warning'}
          trend="up"
        />
        
        <MetricCard
          title="Active Wells"
          value={metrics.activeWells}
          unit={`/ ${metrics.totalWells}`}
          change={{ 
            value: 0, 
            type: 'neutral', 
            period: 'wells operational' 
          }}
          status={metrics.activeWells === metrics.totalWells ? 'success' : 'warning'}
        />
      </div>

      {/* Production Chart */}
      <Card style={{ marginBottom: '2rem' }}>
        <CardHeader>
          <h4>Production Trends - {selectedTimeframe === '24h' ? 'Last 24 Hours' : selectedTimeframe === '7d' ? 'Last 7 Days' : 'Last 30 Days'}</h4>
        </CardHeader>
        <CardContent>
          <ProductionChart>
            <Chart
              type="line"
              data={productionData}
              height={350}
              showLegend
              showGrid
            />
          </ProductionChart>
        </CardContent>
      </Card>

      {/* Wells Status Grid */}
      <Card>
        <CardHeader>
          <h4>Well Status Overview</h4>
        </CardHeader>
        <CardContent>
          <WellGrid>
            {wells.map((well) => (
              <div
                key={well.id}
                style={{
                  padding: '1rem',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  backgroundColor: '#ffffff'
                }}
                onClick={() => onWellClick?.(well)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#0066cc';
                  e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e2e8f0';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  marginBottom: '0.75rem'
                }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.5rem' 
                  }}>
                    <div style={{ color: getWellStatusColor(well.status) }}>
                      {getWellStatusIcon(well.status)}
                    </div>
                    <h5 style={{ 
                      fontSize: '1rem', 
                      fontWeight: '600',
                      margin: 0,
                      color: '#1e293b'
                    }}>
                      {well.name}
                    </h5>
                  </div>
                  <span style={{ 
                    fontSize: '0.75rem', 
                    color: getWellStatusColor(well.status),
                    textTransform: 'uppercase',
                    fontWeight: '600',
                    padding: '0.25rem 0.5rem',
                    backgroundColor: `${getWellStatusColor(well.status)}20`,
                    borderRadius: '4px'
                  }}>
                    {well.status}
                  </span>
                </div>
                
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr 1fr', 
                  gap: '0.75rem',
                  marginBottom: '0.75rem'
                }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.25rem' }}>
                      Production Rate
                    </div>
                    <div style={{ fontWeight: '600', color: '#1e293b' }}>
                      {well.production.rate} {well.production.unit}
                    </div>
                  </div>
                  
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.25rem' }}>
                      Efficiency
                    </div>
                    <div style={{ fontWeight: '600', color: '#1e293b' }}>
                      {well.production.efficiency}%
                    </div>
                  </div>
                  
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.25rem' }}>
                      Pressure
                    </div>
                    <div style={{ fontWeight: '600', color: '#1e293b' }}>
                      {well.pressure.current} {well.pressure.unit}
                    </div>
                  </div>
                  
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.25rem' }}>
                      Location
                    </div>
                    <div style={{ fontWeight: '600', color: '#1e293b' }}>
                      {well.location.zone}
                    </div>
                  </div>
                </div>
                
                <div style={{ 
                  fontSize: '0.75rem', 
                  color: '#64748b',
                  borderTop: '1px solid #f1f5f9',
                  paddingTop: '0.5rem'
                }}>
                  Last updated: {new Date(well.lastUpdate).toLocaleString()}
                </div>
              </div>
            ))}
          </WellGrid>
        </CardContent>
      </Card>
    </ProductionTrackerContainer>
  );
};

export default ProductionTracker;
