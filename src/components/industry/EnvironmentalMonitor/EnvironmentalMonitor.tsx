/**
 * EnvironmentalMonitor Component
 * Environmental monitoring and sustainability tracking for oil & gas facilities
 * Tracks emissions, waste management, and environmental compliance
 */

import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '../../ui/Card';
import { MetricCard } from '../../ui/MetricCard';
import { Chart } from '../../ui/Chart';
import { Alert } from '../../ui/Alert';
import { EnvironmentalMonitorContainer, EnvironmentalGrid, ComplianceGrid } from './EnvironmentalMonitor.styles';

export interface EnvironmentalMetrics {
  emissions: {
    co2: number;
    methane: number;
    nox: number;
    sox: number;
    unit: string;
  };
  waste: {
    hazardous: number;
    nonHazardous: number;
    recycled: number;
    unit: string;
  };
  water: {
    consumption: number;
    discharge: number;
    treatment: number;
    unit: string;
  };
  compliance: {
    airQuality: number;
    waterQuality: number;
    wasteManagement: number;
    overall: number;
  };
  sustainability: {
    energyEfficiency: number;
    renewableEnergy: number;
    carbonIntensity: number;
  };
}

export interface EnvironmentalAlert {
  id: string;
  type: 'emission' | 'waste' | 'water' | 'compliance';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  location: string;
  timestamp: string;
  status: 'active' | 'investigating' | 'resolved';
}

export interface EnvironmentalMonitorProps {
  facilityId: string;
  metrics: EnvironmentalMetrics;
  alerts: EnvironmentalAlert[];
  onAlertClick?: (alert: EnvironmentalAlert) => void;
  onRefresh?: () => void;
  className?: string;
  'data-testid'?: string;
}


const getComplianceColor = (score: number) => {
  if (score >= 95) return '#059669';
  if (score >= 85) return '#d97706';
  return '#dc2626';
};

export const EnvironmentalMonitor: React.FC<EnvironmentalMonitorProps> = ({
  facilityId,
  metrics,
  alerts,
  onAlertClick,
  onRefresh,
  className,
  'data-testid': testId,
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    onRefresh?.();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  // Environmental trend data
  const environmentalTrendData = [
    { name: 'Jan', co2: 1200, methane: 45, nox: 25, sox: 15 },
    { name: 'Feb', co2: 1180, methane: 42, nox: 23, sox: 14 },
    { name: 'Mar', co2: 1150, methane: 40, nox: 22, sox: 13 },
    { name: 'Apr', co2: 1120, methane: 38, nox: 21, sox: 12 },
    { name: 'May', co2: 1100, methane: 36, nox: 20, sox: 11 },
    { name: 'Jun', co2: 1080, methane: 35, nox: 19, sox: 10 },
  ];

  const getOverallStatus = () => {
    const criticalAlerts = alerts.filter(alert => alert.severity === 'critical').length;
    const highAlerts = alerts.filter(alert => alert.severity === 'high').length;
    
    if (criticalAlerts > 0) return 'critical';
    if (highAlerts > 0) return 'warning';
    if (metrics.compliance.overall < 90) return 'warning';
    return 'success';
  };


  return (
    <EnvironmentalMonitorContainer className={className} data-testid={testId}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '2rem',
        padding: '1rem',
        backgroundColor: '#f0fdf4',
        borderRadius: '8px',
        border: '1px solid #bbf7d0'
      }}>
        <div>
          <h2 style={{ 
            fontSize: '1.5rem', 
            fontWeight: '700', 
            color: '#1e293b',
            margin: '0 0 0.25rem 0'
          }}>
            Environmental Monitor - Facility {facilityId}
          </h2>
          <p style={{ 
            fontSize: '0.875rem', 
            color: '#64748b',
            margin: 0
          }}>
            Environmental compliance and sustainability tracking
          </p>
        </div>
        
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#059669',
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

      {/* Environmental Alerts */}
      {alerts.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ 
            fontSize: '1.125rem', 
            fontWeight: '600', 
            color: '#1e293b',
            marginBottom: '1rem'
          }}>
            Environmental Alerts ({alerts.length})
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {alerts.slice(0, 3).map((alert) => (
              <Alert
                key={alert.id}
                type={alert.severity === 'critical' ? 'critical' : alert.severity === 'high' ? 'error' : 'warning'}
                title={`${alert.type.charAt(0).toUpperCase() + alert.type.slice(1)} Alert`}
                message={alert.message}
                dismissible={false}
              />
            ))}
            {alerts.length > 3 && (
              <div style={{
                padding: '0.75rem',
                backgroundColor: '#f1f5f9',
                borderRadius: '6px',
                textAlign: 'center',
                color: '#64748b',
                fontSize: '0.875rem'
              }}>
                +{alerts.length - 3} more alerts
              </div>
            )}
          </div>
        </div>
      )}

      {/* Environmental Metrics */}
      <EnvironmentalGrid>
        <MetricCard
          title="CO2 Emissions"
          value={metrics.emissions.co2}
          unit={metrics.emissions.unit}
          change={{ 
            value: -2.5, 
            type: 'decrease', 
            period: 'vs last month' 
          }}
          status={metrics.emissions.co2 < 1100 ? 'success' : 'warning'}
          trend="down"
        />
        
        <MetricCard
          title="Methane Emissions"
          value={metrics.emissions.methane}
          unit={metrics.emissions.unit}
          change={{ 
            value: -1.8, 
            type: 'decrease', 
            period: 'vs last month' 
          }}
          status={metrics.emissions.methane < 40 ? 'success' : 'warning'}
          trend="down"
        />
        
        <MetricCard
          title="Waste Recycled"
          value={metrics.waste.recycled}
          unit={metrics.waste.unit}
          change={{ 
            value: 5.2, 
            type: 'increase', 
            period: 'vs last month' 
          }}
          status="success"
          trend="up"
        />
        
        <MetricCard
          title="Water Treatment"
          value={metrics.water.treatment}
          unit={metrics.water.unit}
          change={{ 
            value: 1.5, 
            type: 'increase', 
            period: 'vs last month' 
          }}
          status="success"
          trend="up"
        />
      </EnvironmentalGrid>

      {/* Charts Section */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '2fr 1fr', 
        gap: '1.5rem',
        marginTop: '2rem'
      }}>
        <Card>
          <CardHeader>
            <h4>Emission Trends</h4>
          </CardHeader>
          <CardContent>
            <Chart
              type="line"
              data={environmentalTrendData}
              height={300}
              showLegend
              showGrid
              title="6-Month Emission Reduction Progress"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h4>Sustainability Metrics</h4>
          </CardHeader>
          <CardContent>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                padding: '0.75rem',
                backgroundColor: '#f0fdf4',
                borderRadius: '6px'
              }}>
                <span style={{ fontSize: '0.875rem', color: '#64748b' }}>
                  Energy Efficiency
                </span>
                <span style={{ fontWeight: '600', color: '#059669' }}>
                  {metrics.sustainability.energyEfficiency}%
                </span>
              </div>
              
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                padding: '0.75rem',
                backgroundColor: '#f0fdf4',
                borderRadius: '6px'
              }}>
                <span style={{ fontSize: '0.875rem', color: '#64748b' }}>
                  Renewable Energy
                </span>
                <span style={{ fontWeight: '600', color: '#059669' }}>
                  {metrics.sustainability.renewableEnergy}%
                </span>
              </div>
              
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                padding: '0.75rem',
                backgroundColor: '#f0fdf4',
                borderRadius: '6px'
              }}>
                <span style={{ fontSize: '0.875rem', color: '#64748b' }}>
                  Carbon Intensity
                </span>
                <span style={{ fontWeight: '600', color: '#059669' }}>
                  {metrics.sustainability.carbonIntensity} kg/boe
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Compliance Status */}
      <Card style={{ marginTop: '1.5rem' }}>
        <CardHeader>
          <h4>Environmental Compliance Status</h4>
        </CardHeader>
        <CardContent>
          <ComplianceGrid>
            <div style={{ 
              padding: '1rem',
              backgroundColor: getComplianceColor(metrics.compliance.airQuality) === '#059669' ? '#f0fdf4' : 
                              getComplianceColor(metrics.compliance.airQuality) === '#d97706' ? '#fffbeb' : '#fef2f2',
              borderRadius: '6px',
              border: `1px solid ${getComplianceColor(metrics.compliance.airQuality)}40`
            }}>
              <div style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.25rem' }}>
                Air Quality Compliance
              </div>
              <div style={{ 
                fontWeight: '600', 
                color: getComplianceColor(metrics.compliance.airQuality),
                fontSize: '1.25rem'
              }}>
                {metrics.compliance.airQuality}%
              </div>
            </div>
            
            <div style={{ 
              padding: '1rem',
              backgroundColor: getComplianceColor(metrics.compliance.waterQuality) === '#059669' ? '#f0fdf4' : 
                              getComplianceColor(metrics.compliance.waterQuality) === '#d97706' ? '#fffbeb' : '#fef2f2',
              borderRadius: '6px',
              border: `1px solid ${getComplianceColor(metrics.compliance.waterQuality)}40`
            }}>
              <div style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.25rem' }}>
                Water Quality Compliance
              </div>
              <div style={{ 
                fontWeight: '600', 
                color: getComplianceColor(metrics.compliance.waterQuality),
                fontSize: '1.25rem'
              }}>
                {metrics.compliance.waterQuality}%
              </div>
            </div>
            
            <div style={{ 
              padding: '1rem',
              backgroundColor: getComplianceColor(metrics.compliance.wasteManagement) === '#059669' ? '#f0fdf4' : 
                              getComplianceColor(metrics.compliance.wasteManagement) === '#d97706' ? '#fffbeb' : '#fef2f2',
              borderRadius: '6px',
              border: `1px solid ${getComplianceColor(metrics.compliance.wasteManagement)}40`
            }}>
              <div style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.25rem' }}>
                Waste Management Compliance
              </div>
              <div style={{ 
                fontWeight: '600', 
                color: getComplianceColor(metrics.compliance.wasteManagement),
                fontSize: '1.25rem'
              }}>
                {metrics.compliance.wasteManagement}%
              </div>
            </div>
            
            <div style={{ 
              padding: '1rem',
              backgroundColor: getComplianceColor(metrics.compliance.overall) === '#059669' ? '#f0fdf4' : 
                              getComplianceColor(metrics.compliance.overall) === '#d97706' ? '#fffbeb' : '#fef2f2',
              borderRadius: '6px',
              border: `1px solid ${getComplianceColor(metrics.compliance.overall)}40`
            }}>
              <div style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.25rem' }}>
                Overall Compliance
              </div>
              <div style={{ 
                fontWeight: '600', 
                color: getComplianceColor(metrics.compliance.overall),
                fontSize: '1.25rem'
              }}>
                {metrics.compliance.overall}%
              </div>
            </div>
          </ComplianceGrid>
        </CardContent>
      </Card>
    </EnvironmentalMonitorContainer>
  );
};

export default EnvironmentalMonitor;
