/**
 * SafetyMonitor Component
 * Real-time safety monitoring for oil & gas facilities
 * Displays safety metrics, incident tracking, and compliance status
 */

import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '../../ui/Card';
import { Alert } from '../../ui/Alert';
import { MetricCard } from '../../ui/MetricCard';
import { Chart } from '../../ui/Chart';
import { SafetyMonitorContainer, SafetyGrid, IncidentList, ComplianceStatus } from './SafetyMonitor.styles';

export interface SafetyMetrics {
  overallScore: number;
  daysSinceIncident: number;
  totalIncidents: number;
  criticalAlerts: number;
  complianceRate: number;
  lastInspection: string;
  nextInspection: string;
}

export interface SafetyIncident {
  id: string;
  type: 'injury' | 'equipment' | 'environmental' | 'process';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  location: string;
  timestamp: string;
  status: 'open' | 'investigating' | 'resolved';
  assignedTo?: string;
}

export interface SafetyMonitorProps {
  facilityId: string;
  metrics: SafetyMetrics;
  incidents: SafetyIncident[];
  onIncidentClick?: (incident: SafetyIncident) => void;
  onRefresh?: () => void;
  className?: string;
  'data-testid'?: string;
}

const getSeverityColor = (severity: SafetyIncident['severity']) => {
  switch (severity) {
    case 'critical': return '#dc2626';
    case 'high': return '#ea580c';
    case 'medium': return '#d97706';
    case 'low': return '#059669';
    default: return '#6b7280';
  }
};

const getSeverityIcon = (severity: SafetyIncident['severity']) => {
  const iconProps = { width: 16, height: 16 };
  
  switch (severity) {
    case 'critical':
      return (
        <svg {...iconProps} viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
      );
    case 'high':
      return (
        <svg {...iconProps} viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      );
    default:
      return (
        <svg {...iconProps} viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
      );
  }
};

export const SafetyMonitor: React.FC<SafetyMonitorProps> = ({
  facilityId,
  metrics,
  incidents,
  onIncidentClick,
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

  // Safety trend data for chart
  const safetyTrendData = [
    { name: 'Jan', value: 95, score: 95, incidents: 2 },
    { name: 'Feb', value: 97, score: 97, incidents: 1 },
    { name: 'Mar', value: 94, score: 94, incidents: 3 },
    { name: 'Apr', value: 96, score: 96, incidents: 1 },
    { name: 'May', value: 98, score: 98, incidents: 0 },
    { name: 'Jun', value: metrics.overallScore, score: metrics.overallScore, incidents: metrics.totalIncidents },
  ];

  const getOverallStatus = () => {
    if (metrics.criticalAlerts > 0) return 'critical';
    if (metrics.overallScore < 95) return 'warning';
    return 'success';
  };

  const overallStatus = getOverallStatus();

  return (
    <SafetyMonitorContainer className={className} data-testid={testId}>
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
            Safety Monitor - Facility {facilityId}
          </h2>
          <p style={{ 
            fontSize: '0.875rem', 
            color: '#64748b',
            margin: 0
          }}>
            Real-time safety monitoring and incident tracking
          </p>
        </div>
        
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

      {/* Critical Safety Alerts */}
      {metrics.criticalAlerts > 0 && (
        <Alert
          type="critical"
          title="Critical Safety Alert"
          message={`${metrics.criticalAlerts} critical safety issue(s) require immediate attention.`}
          dismissible={false}
        />
      )}

      {/* Safety Metrics Grid */}
      <SafetyGrid>
        <MetricCard
          title="Safety Score"
          value={metrics.overallScore}
          unit="%"
          change={{ 
            value: 1.2, 
            type: 'increase', 
            period: 'vs last month' 
          }}
          status={overallStatus}
          trend="up"
        />
        
        <MetricCard
          title="Days Since Incident"
          value={metrics.daysSinceIncident}
          unit="days"
          change={{ 
            value: 0, 
            type: 'neutral', 
            period: 'current streak' 
          }}
          status={metrics.daysSinceIncident > 30 ? 'success' : 'warning'}
        />
        
        <MetricCard
          title="Total Incidents"
          value={metrics.totalIncidents}
          unit="this year"
          change={{ 
            value: -2, 
            type: 'decrease', 
            period: 'vs last year' 
          }}
          status={metrics.totalIncidents === 0 ? 'success' : 'normal'}
          trend="down"
        />
        
        <MetricCard
          title="Compliance Rate"
          value={metrics.complianceRate}
          unit="%"
          change={{ 
            value: 0.5, 
            type: 'increase', 
            period: 'vs last quarter' 
          }}
          status={metrics.complianceRate >= 98 ? 'success' : 'warning'}
          trend="up"
        />
      </SafetyGrid>

      {/* Charts and Incidents Section */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '2fr 1fr', 
        gap: '1.5rem',
        marginTop: '2rem'
      }}>
        <Card>
          <CardHeader>
            <h4>Safety Performance Trends</h4>
          </CardHeader>
          <CardContent>
            <Chart
              type="line"
              data={safetyTrendData}
              height={300}
              showLegend
              showGrid
              title="6-Month Safety Performance"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h4>Recent Incidents</h4>
          </CardHeader>
          <CardContent>
            <IncidentList>
              {incidents.slice(0, 5).map((incident) => (
                <div
                  key={incident.id}
                  style={{
                    padding: '0.75rem',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px',
                    marginBottom: '0.5rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onClick={() => onIncidentClick?.(incident)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f8fafc';
                    e.currentTarget.style.borderColor = '#0066cc';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.borderColor = '#e2e8f0';
                  }}
                >
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    marginBottom: '0.5rem'
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.5rem' 
                    }}>
                      <div style={{ color: getSeverityColor(incident.severity) }}>
                        {getSeverityIcon(incident.severity)}
                      </div>
                      <span style={{ 
                        fontSize: '0.875rem', 
                        fontWeight: '600',
                        textTransform: 'capitalize'
                      }}>
                        {incident.type}
                      </span>
                    </div>
                    <span style={{ 
                      fontSize: '0.75rem', 
                      color: '#64748b',
                      textTransform: 'uppercase',
                      fontWeight: '500'
                    }}>
                      {incident.severity}
                    </span>
                  </div>
                  
                  <p style={{ 
                    fontSize: '0.875rem', 
                    color: '#374151',
                    margin: '0 0 0.5rem 0',
                    lineHeight: '1.4'
                  }}>
                    {incident.description}
                  </p>
                  
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    fontSize: '0.75rem',
                    color: '#64748b'
                  }}>
                    <span>{incident.location}</span>
                    <span>{new Date(incident.timestamp).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
              
              {incidents.length === 0 && (
                <div style={{
                  textAlign: 'center',
                  padding: '2rem',
                  color: '#64748b'
                }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>✅</div>
                  <p style={{ margin: 0 }}>No recent incidents</p>
                </div>
              )}
            </IncidentList>
          </CardContent>
        </Card>
      </div>

      {/* Compliance Status */}
      <Card style={{ marginTop: '1.5rem' }}>
        <CardHeader>
          <h4>Compliance Status</h4>
        </CardHeader>
        <CardContent>
          <ComplianceStatus>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '1rem' 
            }}>
              <div style={{ 
                padding: '1rem',
                backgroundColor: '#f0fdf4',
                borderRadius: '6px',
                border: '1px solid #bbf7d0'
              }}>
                <div style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.25rem' }}>
                  Last Inspection
                </div>
                <div style={{ fontWeight: '600', color: '#059669' }}>
                  {new Date(metrics.lastInspection).toLocaleDateString()}
                </div>
              </div>
              
              <div style={{ 
                padding: '1rem',
                backgroundColor: '#fef3c7',
                borderRadius: '6px',
                border: '1px solid #fed7aa'
              }}>
                <div style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.25rem' }}>
                  Next Inspection
                </div>
                <div style={{ fontWeight: '600', color: '#d97706' }}>
                  {new Date(metrics.nextInspection).toLocaleDateString()}
                </div>
              </div>
              
              <div style={{ 
                padding: '1rem',
                backgroundColor: '#f0f9ff',
                borderRadius: '6px',
                border: '1px solid #bae6fd'
              }}>
                <div style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.25rem' }}>
                  Compliance Rate
                </div>
                <div style={{ fontWeight: '600', color: '#0284c7' }}>
                  {metrics.complianceRate}%
                </div>
              </div>
            </div>
          </ComplianceStatus>
        </CardContent>
      </Card>
    </SafetyMonitorContainer>
  );
};

export default SafetyMonitor;
