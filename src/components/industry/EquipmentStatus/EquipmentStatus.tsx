/**
 * EquipmentStatus Component
 * Equipment monitoring and maintenance tracking for oil & gas facilities
 * Displays equipment he  // Generate performance trend data based on current equipment
  const performanceData = React.useMemo(() => {
    const avgEfficiency = equipment.reduce((sum, item) => sum + (item.performance?.efficiency || 85), 0) / equipment.length;
    const avgUptime = equipment.reduce((sum, item) => sum + (item.performance?.uptime || 90), 0) / equipment.length;
    const avgLoad = equipment.reduce((sum, item) => sum + (item.performance?.load || 75), 0) / equipment.length;
    
    return Array.from({ length: 6 }, (_, index) => {
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
      const trend = 1 + (index * 0.01); // Slight upward trend
      
      return {
        name: monthNames[index],
        value: Math.round(avgEfficiency * trend),
        efficiency: Math.round(avgEfficiency * trend),
        uptime: Math.round(Math.min(99, avgUptime * trend)),
        load: Math.round(avgLoad * (0.9 + Math.random() * 0.2))
      };
    });
  }, [equipment]);intenance schedules, and performance metrics
 */

import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '../../ui/Card';
import { MetricCard } from '../../ui/MetricCard';
import { Chart } from '../../ui/Chart';
import { Alert } from '../../ui/Alert';
import { EquipmentStatusContainer, EquipmentGrid, MaintenanceSchedule } from './EquipmentStatus.styles';

export interface EquipmentItem {
  id: string;
  name: string;
  type: 'pump' | 'compressor' | 'generator' | 'valve' | 'sensor' | 'turbine';
  status: 'operational' | 'maintenance' | 'critical' | 'offline';
  health: number; // 0-100
  location: string;
  lastMaintenance: string;
  nextMaintenance: string;
  performance: {
    efficiency: number;
    uptime: number;
    load: number;
  };
  alerts: number;
}

export interface MaintenanceTask {
  id: string;
  equipmentId: string;
  equipmentName: string;
  type: 'preventive' | 'corrective' | 'emergency';
  priority: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  scheduledDate: string;
  estimatedDuration: number; // hours
  assignedTo?: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'overdue';
}

export interface EquipmentStatusProps {
  facilityId: string;
  equipment: EquipmentItem[];
  maintenanceTasks: MaintenanceTask[];
  onEquipmentClick?: (equipment: EquipmentItem) => void;
  onMaintenanceClick?: (task: MaintenanceTask) => void;
  onRefresh?: () => void;
  className?: string;
  'data-testid'?: string;
}

const getEquipmentStatusColor = (status: EquipmentItem['status']) => {
  switch (status) {
    case 'operational': return '#059669';
    case 'maintenance': return '#d97706';
    case 'critical': return '#dc2626';
    case 'offline': return '#6b7280';
    default: return '#6b7280';
  }
};

const getEquipmentStatusIcon = (status: EquipmentItem['status']) => {
  const iconProps = { width: 16, height: 16 };
  
  switch (status) {
    case 'operational':
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
    case 'critical':
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

const getPriorityColor = (priority: MaintenanceTask['priority']) => {
  switch (priority) {
    case 'critical': return '#dc2626';
    case 'high': return '#ea580c';
    case 'medium': return '#d97706';
    case 'low': return '#059669';
    default: return '#6b7280';
  }
};

export const EquipmentStatus: React.FC<EquipmentStatusProps> = ({
  facilityId,
  equipment,
  maintenanceTasks,
  onEquipmentClick,
  onMaintenanceClick,
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

  // Calculate equipment metrics
  const totalEquipment = equipment.length;
  const operationalEquipment = equipment.filter(eq => eq.status === 'operational').length;
  const maintenanceEquipment = equipment.filter(eq => eq.status === 'maintenance').length;
  const criticalEquipment = equipment.filter(eq => eq.status === 'critical').length;
  const averageHealth = equipment.reduce((sum, eq) => sum + eq.health, 0) / totalEquipment;

  // Equipment performance trend data
  const performanceData = [
    { name: 'Jan', value: 92, efficiency: 92, uptime: 98, load: 85 },
    { name: 'Feb', value: 94, efficiency: 94, uptime: 97, load: 88 },
    { name: 'Mar', value: 91, efficiency: 91, uptime: 96, load: 82 },
    { name: 'Apr', value: 93, efficiency: 93, uptime: 98, load: 86 },
    { name: 'May', value: 95, efficiency: 95, uptime: 99, load: 89 },
    { name: 'Jun', value: 94, efficiency: 94, uptime: 98, load: 87 },
  ];

  // Utility function for calculating overall status (can be used for future enhancements)
  // const getOverallStatus = () => {
  //   if (criticalEquipment > 0) return 'critical';
  //   if (maintenanceEquipment > totalEquipment * 0.2) return 'warning';
  //   if (averageHealth < 85) return 'warning';
  //   return 'success';
  // };


  return (
    <EquipmentStatusContainer className={className} data-testid={testId}>
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
            Equipment Status - Facility {facilityId}
          </h2>
          <p style={{ 
            fontSize: '0.875rem', 
            color: '#64748b',
            margin: 0
          }}>
            Equipment health monitoring and maintenance management
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

      {/* Equipment Alerts */}
      {criticalEquipment > 0 && (
        <Alert
          type="critical"
          title="Critical Equipment Alert"
          message={`${criticalEquipment} equipment unit(s) require immediate attention.`}
          dismissible={false}
        />
      )}

      {/* Equipment Metrics */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        <MetricCard
          title="Total Equipment"
          value={totalEquipment}
          unit="units"
          change={{ 
            value: 0, 
            type: 'neutral', 
            period: 'total units' 
          }}
          status="normal"
        />
        
        <MetricCard
          title="Operational"
          value={operationalEquipment}
          unit={`/ ${totalEquipment}`}
          change={{ 
            value: 0, 
            type: 'neutral', 
            period: 'units running' 
          }}
          status={operationalEquipment === totalEquipment ? 'success' : 'warning'}
        />
        
        <MetricCard
          title="Average Health"
          value={Math.round(averageHealth)}
          unit="%"
          change={{ 
            value: 1.2, 
            type: 'increase', 
            period: 'vs last week' 
          }}
          status={averageHealth >= 90 ? 'success' : averageHealth >= 80 ? 'warning' : 'critical'}
          trend="up"
        />
        
        <MetricCard
          title="Maintenance Due"
          value={maintenanceTasks.filter(task => task.status === 'scheduled').length}
          unit="tasks"
          change={{ 
            value: 0, 
            type: 'neutral', 
            period: 'scheduled tasks' 
          }}
          status={maintenanceTasks.filter(task => task.status === 'overdue').length > 0 ? 'critical' : 'normal'}
        />
      </div>

      {/* Charts and Equipment Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '2fr 1fr', 
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        <Card>
          <CardHeader>
            <h4>Equipment Performance Trends</h4>
          </CardHeader>
          <CardContent>
            <Chart
              type="line"
              data={performanceData}
              height={300}
              showLegend
              showGrid
              title="6-Month Performance Overview"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h4>Equipment Status Summary</h4>
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
                  Operational
                </span>
                <span style={{ fontWeight: '600', color: '#059669' }}>
                  {operationalEquipment}
                </span>
              </div>
              
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                padding: '0.75rem',
                backgroundColor: '#fef3c7',
                borderRadius: '6px'
              }}>
                <span style={{ fontSize: '0.875rem', color: '#64748b' }}>
                  Maintenance
                </span>
                <span style={{ fontWeight: '600', color: '#d97706' }}>
                  {maintenanceEquipment}
                </span>
              </div>
              
              {criticalEquipment > 0 && (
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  padding: '0.75rem',
                  backgroundColor: '#fef2f2',
                  borderRadius: '6px'
                }}>
                  <span style={{ fontSize: '0.875rem', color: '#64748b' }}>
                    Critical
                  </span>
                  <span style={{ fontWeight: '600', color: '#dc2626' }}>
                    {criticalEquipment}
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Equipment Grid */}
      <Card style={{ marginBottom: '2rem' }}>
        <CardHeader>
          <h4>Equipment Overview</h4>
        </CardHeader>
        <CardContent>
          <EquipmentGrid>
            {equipment.map((item) => (
              <div
                key={item.id}
                style={{
                  padding: '1rem',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  backgroundColor: '#ffffff'
                }}
                onClick={() => onEquipmentClick?.(item)}
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
                    <div style={{ color: getEquipmentStatusColor(item.status) }}>
                      {getEquipmentStatusIcon(item.status)}
                    </div>
                    <h5 style={{ 
                      fontSize: '1rem', 
                      fontWeight: '600',
                      margin: 0,
                      color: '#1e293b'
                    }}>
                      {item.name}
                    </h5>
                  </div>
                  <span style={{ 
                    fontSize: '0.75rem', 
                    color: getEquipmentStatusColor(item.status),
                    textTransform: 'uppercase',
                    fontWeight: '600',
                    padding: '0.25rem 0.5rem',
                    backgroundColor: `${getEquipmentStatusColor(item.status)}20`,
                    borderRadius: '4px'
                  }}>
                    {item.status}
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
                      Health Score
                    </div>
                    <div style={{ fontWeight: '600', color: '#1e293b' }}>
                      {item.health}%
                    </div>
                  </div>
                  
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.25rem' }}>
                      Efficiency
                    </div>
                    <div style={{ fontWeight: '600', color: '#1e293b' }}>
                      {item.performance.efficiency}%
                    </div>
                  </div>
                  
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.25rem' }}>
                      Uptime
                    </div>
                    <div style={{ fontWeight: '600', color: '#1e293b' }}>
                      {item.performance.uptime}%
                    </div>
                  </div>
                  
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.25rem' }}>
                      Location
                    </div>
                    <div style={{ fontWeight: '600', color: '#1e293b' }}>
                      {item.location}
                    </div>
                  </div>
                </div>
                
                {item.alerts > 0 && (
                  <div style={{ 
                    fontSize: '0.75rem', 
                    color: '#dc2626',
                    borderTop: '1px solid #f1f5f9',
                    paddingTop: '0.5rem',
                    fontWeight: '500'
                  }}>
                    {item.alerts} active alert{item.alerts > 1 ? 's' : ''}
                  </div>
                )}
              </div>
            ))}
          </EquipmentGrid>
        </CardContent>
      </Card>

      {/* Maintenance Schedule */}
      <Card>
        <CardHeader>
          <h4>Upcoming Maintenance</h4>
        </CardHeader>
        <CardContent>
          <MaintenanceSchedule>
            {maintenanceTasks.slice(0, 5).map((task) => (
              <div
                key={task.id}
                style={{
                  padding: '1rem',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                  marginBottom: '0.5rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onClick={() => onMaintenanceClick?.(task)}
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
                    <span style={{ 
                      fontSize: '0.875rem', 
                      fontWeight: '600',
                      color: '#1e293b'
                    }}>
                      {task.equipmentName}
                    </span>
                    <span style={{ 
                      fontSize: '0.75rem', 
                      color: getPriorityColor(task.priority),
                      textTransform: 'uppercase',
                      fontWeight: '600',
                      padding: '0.125rem 0.375rem',
                      backgroundColor: `${getPriorityColor(task.priority)}20`,
                      borderRadius: '4px'
                    }}>
                      {task.priority}
                    </span>
                  </div>
                  <span style={{ 
                    fontSize: '0.75rem', 
                    color: '#64748b'
                  }}>
                    {new Date(task.scheduledDate).toLocaleDateString()}
                  </span>
                </div>
                
                <p style={{ 
                  fontSize: '0.875rem', 
                  color: '#374151',
                  margin: '0 0 0.5rem 0',
                  lineHeight: '1.4'
                }}>
                  {task.description}
                </p>
                
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  fontSize: '0.75rem',
                  color: '#64748b'
                }}>
                  <span>Duration: {task.estimatedDuration}h</span>
                  <span>Status: {task.status}</span>
                </div>
              </div>
            ))}
            
            {maintenanceTasks.length === 0 && (
              <div style={{
                textAlign: 'center',
                padding: '2rem',
                color: '#64748b'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>✓</div>
                <p style={{ margin: 0 }}>No upcoming maintenance tasks</p>
              </div>
            )}
          </MaintenanceSchedule>
        </CardContent>
      </Card>
    </EquipmentStatusContainer>
  );
};

export default EquipmentStatus;
