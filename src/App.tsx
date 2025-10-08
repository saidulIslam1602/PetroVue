/**
 * Main Application Component
 * Demonstrates clean architecture and component organization
 */

import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { Button } from './components/ui/Button';
import { Card, CardHeader, CardContent, CardFooter } from './components/ui/Card';
import { Input } from './components/ui/Input';
import { Select } from './components/ui/Select';
import { Alert } from './components/ui/Alert';
import { MetricCard } from './components/ui/MetricCard';
import { Chart } from './components/ui/Chart';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { OperationalDashboard } from './components/industry/OperationalDashboard';
import { SafetyMonitor } from './components/industry/SafetyMonitor';
import { ProductionTracker } from './components/industry/ProductionTracker';
import { EnvironmentalMonitor } from './components/industry/EnvironmentalMonitor';
import { EquipmentStatus } from './components/industry/EquipmentStatus';
import { APP_CONFIG } from './constants';
import './styles/globals.css';

// Create Material-UI theme based on our design system
const muiTheme = createTheme({
  palette: {
    primary: {
      main: '#0066cc',
    },
    secondary: {
      main: '#ff6600',
    },
  },
});

const App: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const [activeView, setActiveView] = React.useState('dashboard');
  
  const navigationItems = [
    { label: 'Dashboard', href: '/dashboard', active: activeView === 'dashboard' },
    { label: 'Operations', href: '/operations', active: activeView === 'operations' },
    { label: 'Safety', href: '/safety', active: activeView === 'safety' },
    { label: 'Production', href: '/production', active: activeView === 'production' },
    { label: 'Environmental', href: '/environmental', active: activeView === 'environmental' },
    { label: 'Equipment', href: '/equipment', active: activeView === 'equipment' },
  ];

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', active: activeView === 'dashboard', onClick: () => setActiveView('dashboard') },
    { id: 'operations', label: 'Operations', badge: 3, active: activeView === 'operations', onClick: () => setActiveView('operations') },
    { id: 'safety', label: 'Safety Monitor', active: activeView === 'safety', onClick: () => setActiveView('safety') },
    { id: 'production', label: 'Production', active: activeView === 'production', onClick: () => setActiveView('production') },
    { id: 'environmental', label: 'Environmental', active: activeView === 'environmental', onClick: () => setActiveView('environmental') },
    { id: 'equipment', label: 'Equipment', active: activeView === 'equipment', onClick: () => setActiveView('equipment') },
  ];

  const user = {
    name: 'John Smith',
    role: 'Operations Manager',
  };

  // Sample chart data
  const productionData = [
    { name: 'Jan', oil: 1200, gas: 2100, water: 850 },
    { name: 'Feb', oil: 1350, gas: 2300, water: 920 },
    { name: 'Mar', oil: 1280, gas: 2200, water: 880 },
    { name: 'Apr', oil: 1420, gas: 2400, water: 950 },
    { name: 'May', oil: 1380, gas: 2350, water: 900 },
    { name: 'Jun', oil: 1500, gas: 2500, water: 1000 },
  ];

  const facilityOptions = [
    { value: 'platform-a', label: 'Platform Alpha' },
    { value: 'platform-b', label: 'Platform Beta' },
    { value: 'refinery-1', label: 'Refinery North' },
    { value: 'refinery-2', label: 'Refinery South' },
  ];

  // Sample data for industry components
  const operationalMetrics = {
    production: {
      oil: 1250,
      gas: 2100,
      water: 850,
      efficiency: 92
    },
    safety: {
      score: 98,
      incidents: 0,
      lastInspection: '2024-01-15'
    },
    equipment: {
      totalUnits: 45,
      operational: 42,
      maintenance: 2,
      critical: 1
    },
    environmental: {
      emissions: 1200,
      waste: 85,
      compliance: 96
    }
  };

  const operationalAlerts = [
    {
      id: '1',
      type: 'critical' as const,
      title: 'High Pressure Alert',
      message: 'Pressure reading exceeds safety threshold in Platform Alpha.',
      timestamp: new Date().toISOString()
    },
    {
      id: '2',
      type: 'warning' as const,
      title: 'Maintenance Due',
      message: 'Scheduled maintenance for Refinery North is due in 48 hours.',
      timestamp: new Date().toISOString()
    }
  ];

  const safetyMetrics = {
    overallScore: 98,
    daysSinceIncident: 45,
    totalIncidents: 2,
    criticalAlerts: 0,
    complianceRate: 98,
    lastInspection: '2024-01-15',
    nextInspection: '2024-04-15'
  };

  const safetyIncidents = [
    {
      id: '1',
      type: 'equipment' as const,
      severity: 'low' as const,
      description: 'Minor valve leak detected in Zone A',
      location: 'Platform Alpha - Zone A',
      timestamp: '2024-01-10T10:30:00Z',
      status: 'resolved' as const
    }
  ];

  const wells = [
    {
      id: '1',
      name: 'Well A-001',
      type: 'oil' as const,
      status: 'active' as const,
      production: { rate: 150, unit: 'bbl/day', efficiency: 95 },
      pressure: { current: 850, target: 900, unit: 'PSI' },
      lastUpdate: '2024-01-20T14:30:00Z',
      location: { platform: 'Alpha', zone: 'A' }
    },
    {
      id: '2',
      name: 'Well B-002',
      type: 'gas' as const,
      status: 'maintenance' as const,
      production: { rate: 0, unit: 'mcf/day', efficiency: 0 },
      pressure: { current: 0, target: 1200, unit: 'PSI' },
      lastUpdate: '2024-01-20T12:00:00Z',
      location: { platform: 'Beta', zone: 'B' }
    }
  ];

  const productionMetrics = {
    totalOil: 1250,
    totalGas: 2100,
    totalWater: 850,
    efficiency: 92,
    activeWells: 8,
    totalWells: 10,
    dailyTarget: 1200,
    monthlyTarget: 36000
  };

  const environmentalMetrics = {
    emissions: {
      co2: 1080,
      methane: 35,
      nox: 19,
      sox: 10,
      unit: 'tonnes/month'
    },
    waste: {
      hazardous: 15,
      nonHazardous: 45,
      recycled: 25,
      unit: 'tonnes/month'
    },
    water: {
      consumption: 1200,
      discharge: 800,
      treatment: 1000,
      unit: 'm³/day'
    },
    compliance: {
      airQuality: 98,
      waterQuality: 96,
      wasteManagement: 94,
      overall: 96
    },
    sustainability: {
      energyEfficiency: 92,
      renewableEnergy: 15,
      carbonIntensity: 12.5
    }
  };

  const environmentalAlerts = [
    {
      id: '1',
      type: 'emission' as const,
      severity: 'medium' as const,
      message: 'CO2 emissions approaching monthly limit',
      location: 'Platform Alpha',
      timestamp: '2024-01-20T09:00:00Z',
      status: 'active' as const
    }
  ];

  const equipment = [
    {
      id: '1',
      name: 'Main Pump A',
      type: 'pump' as const,
      status: 'operational' as const,
      health: 95,
      location: 'Platform Alpha - Engine Room',
      lastMaintenance: '2024-01-10',
      nextMaintenance: '2024-04-10',
      performance: { efficiency: 92, uptime: 98, load: 85 },
      alerts: 0
    },
    {
      id: '2',
      name: 'Compressor B',
      type: 'compressor' as const,
      status: 'maintenance' as const,
      health: 75,
      location: 'Platform Beta - Compressor Room',
      lastMaintenance: '2024-01-15',
      nextMaintenance: '2024-01-25',
      performance: { efficiency: 88, uptime: 95, load: 0 },
      alerts: 1
    }
  ];

  const maintenanceTasks = [
    {
      id: '1',
      equipmentId: '2',
      equipmentName: 'Compressor B',
      type: 'preventive' as const,
      priority: 'high' as const,
      description: 'Routine maintenance and inspection',
      scheduledDate: '2024-01-25',
      estimatedDuration: 8,
      assignedTo: 'Maintenance Team A',
      status: 'scheduled' as const
    }
  ];

  const renderActiveView = () => {
    switch (activeView) {
      case 'operations':
        return (
          <OperationalDashboard
            facilityId="PLT-001"
            facilityName="Platform Alpha"
            metrics={operationalMetrics}
            alerts={operationalAlerts}
          />
        );
      case 'safety':
        return (
          <SafetyMonitor
            facilityId="PLT-001"
            metrics={safetyMetrics}
            incidents={safetyIncidents}
          />
        );
      case 'production':
        return (
          <ProductionTracker
            facilityId="PLT-001"
            wells={wells}
            metrics={productionMetrics}
          />
        );
      case 'environmental':
        return (
          <EnvironmentalMonitor
            facilityId="PLT-001"
            metrics={environmentalMetrics}
            alerts={environmentalAlerts}
          />
        );
      case 'equipment':
        return (
          <EquipmentStatus
            facilityId="PLT-001"
            equipment={equipment}
            maintenanceTasks={maintenanceTasks}
          />
        );
      default:
        return renderDashboard();
    }
  };

  const renderDashboard = () => (
    <div style={{ padding: '2rem' }}>
      <header
        style={{
          padding: '2rem',
          textAlign: 'center',
          backgroundColor: '#f8fafc',
          borderBottom: '1px solid #e2e8f0',
          marginBottom: '2rem',
        }}
      >
        <h1
          style={{
            color: '#0066cc',
            marginBottom: '0.5rem',
            fontSize: '2.5rem',
            fontWeight: 600,
          }}
        >
          {APP_CONFIG.name}
        </h1>
        <p
          style={{
            color: '#666',
            fontSize: '1.1rem',
            marginBottom: '2rem',
          }}
        >
          {APP_CONFIG.description}
        </p>

        <div
          style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '2rem',
          }}
        >
          <Button variant='primary' size='lg' onClick={() => setActiveView('operations')}>
            Operations Dashboard
          </Button>
          <Button variant='outline' size='lg' onClick={() => setActiveView('safety')}>
            Safety Monitor
          </Button>
          <Button variant='secondary' size='lg' onClick={() => setActiveView('production')}>
            Production Tracker
          </Button>
        </div>
      </header>

      <section style={{ marginBottom: '3rem' }}>
        <h2
          style={{
            color: '#212121',
            marginBottom: '1rem',
            fontSize: '2rem',
          }}
        >
          Modern Oil & Gas Operations Dashboard
        </h2>
        <p
          style={{
            color: '#666',
            lineHeight: 1.6,
            fontSize: '1.1rem',
            marginBottom: '2rem',
          }}
        >
          Built with React, TypeScript, and Material-UI following industry
          standards for clean, maintainable, and scalable code architecture.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginTop: '2rem',
          }}
        >
          <Card variant="elevated">
            <CardHeader>
              <h3 style={{ color: '#0066cc', marginBottom: '1rem' }}>
                Clean Architecture
              </h3>
            </CardHeader>
            <CardContent>
              <p style={{ color: '#666', lineHeight: 1.5 }}>
                Organized folder structure, TypeScript types, and
                component-based design following industry best practices.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm">
                Learn More
              </Button>
            </CardFooter>
          </Card>

          <Card variant="elevated">
            <CardHeader>
              <h3 style={{ color: '#ff6600', marginBottom: '1rem' }}>
                Type Safety
              </h3>
            </CardHeader>
            <CardContent>
              <p style={{ color: '#666', lineHeight: 1.5 }}>
                Comprehensive TypeScript implementation with strict typing for
                better development experience and fewer runtime errors.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm">
                View Types
              </Button>
            </CardFooter>
          </Card>

          <Card variant="elevated">
            <CardHeader>
              <h3 style={{ color: '#4caf50', marginBottom: '1rem' }}>
                Accessibility
              </h3>
            </CardHeader>
            <CardContent>
              <p style={{ color: '#666', lineHeight: 1.5 }}>
                WCAG 2.1 AA compliant components with proper ARIA labels,
                keyboard navigation, and screen reader support.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm">
                Explore Components
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      <section
        style={{
          padding: '2rem',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
        }}
      >
        <h3 style={{ color: '#212121', marginBottom: '1rem', textAlign: 'center' }}>
          Component Examples
        </h3>
        
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ color: '#212121', marginBottom: '1rem' }}>
            System Alerts
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Alert
              type="critical"
              title="High Pressure Alert"
              message="Pressure reading exceeds safety threshold in Platform Alpha. Immediate attention required."
              dismissible
            />
            <Alert
              type="warning"
              title="Maintenance Due"
              message="Scheduled maintenance for Refinery North is due in 48 hours."
              dismissible
            />
            <Alert
              type="success"
              title="Production Target Met"
              message="Daily production target achieved across all facilities."
            />
          </div>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ color: '#212121', marginBottom: '1rem' }}>
            Operational Metrics
          </h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '1rem' 
          }}>
            <MetricCard
              title="Oil Production"
              value={1250}
              unit="bbl/day"
              change={{ value: 5.2, type: 'increase', period: 'vs last month' }}
              status="success"
              trend="up"
            />
            <MetricCard
              title="Gas Production"
              value={2100}
              unit="mcf/day"
              change={{ value: 2.1, type: 'increase', period: 'vs last month' }}
              status="normal"
              trend="up"
            />
            <MetricCard
              title="Water Production"
              value={850}
              unit="bbl/day"
              change={{ value: 1.5, type: 'decrease', period: 'vs last month' }}
              status="warning"
              trend="down"
            />
            <MetricCard
              title="Safety Score"
              value={98.5}
              unit="%"
              change={{ value: 0.8, type: 'increase', period: 'vs last month' }}
              status="success"
              trend="up"
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
          <Card>
            <CardHeader>
              <h4>Production Trends</h4>
            </CardHeader>
            <CardContent>
              <Chart
                type="line"
                data={productionData}
                height={300}
                showLegend
                showGrid
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h4>Facility Management</h4>
            </CardHeader>
            <CardContent>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <Select
                  label="Select Facility"
                  options={facilityOptions}
                  placeholder="Choose a facility"
                  searchable
                />
                <Input
                  label="Production Rate"
                  placeholder="Enter daily production"
                  helperText="Production rate in barrels per day"
                />
                <Input
                  label="Pressure Reading"
                  placeholder="Enter pressure"
                  error="Pressure must be between 0-1000 PSI"
                  defaultValue="1500"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm">
                Cancel
              </Button>
              <Button variant="primary" size="sm">
                Save
              </Button>
            </CardFooter>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <h4>Development Tools</h4>
          </CardHeader>
          <CardContent>
            <p style={{ color: '#666', marginBottom: '1rem' }}>
              Access development tools and documentation for the PetroVue application.
            </p>
          </CardContent>
          <CardFooter>
            <Button
              variant='primary'
              size='sm'
              onClick={() => window.open('http://localhost:6006', '_blank')}
            >
              Open Storybook
            </Button>
          </CardFooter>
        </Card>
      </section>
    </div>
  );

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <div className='App' style={{ display: 'flex' }}>
        <Sidebar
          items={sidebarItems}
          user={user}
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        
        <div style={{ 
          flex: 1, 
          marginLeft: sidebarCollapsed ? '64px' : '256px',
          transition: 'margin-left 0.3s ease'
        }}>
          <Header
            title={APP_CONFIG.name}
            navigation={navigationItems}
            user={user}
          />
        
          <main style={{ padding: '0', flex: 1 }}>
            {renderActiveView()}
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;