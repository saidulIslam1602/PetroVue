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
import { CarbonFootprintCalculator } from './components/industry/CarbonFootprintCalculator';
import { ReportGenerator } from './components/industry/ReportGenerator';
import { SustainabilityInsights } from './components/industry/SustainabilityInsights';
import { APP_CONFIG } from './constants';
import {
  useFacilities,
  useOperationalMetrics,
  useAlerts,
  useSafetyMetrics,
  useSafetyIncidents,
  useWells,
  useEquipment,
  useEnvironmentalMetrics,
  useProductionData
} from './hooks/useData';
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
  const [selectedFacilityId, setSelectedFacilityId] = React.useState('PLT-001');
  
  // Data hooks
  const { data: facilities } = useFacilities();
  const { data: operationalData } = useOperationalMetrics(selectedFacilityId);
  const { data: alertsData } = useAlerts(selectedFacilityId);
  const { data: safetyData } = useSafetyMetrics(selectedFacilityId);
  const { data: incidentsData } = useSafetyIncidents(selectedFacilityId);
  const { data: wellsData } = useWells(selectedFacilityId);
  const { data: equipmentData } = useEquipment(selectedFacilityId);
  const { data: envData } = useEnvironmentalMetrics(selectedFacilityId);
  const { data: prodData } = useProductionData(selectedFacilityId);

  // Transform production data for charts
  const chartData = React.useMemo(() => {
    if (!prodData || prodData.length === 0) {
      // Fallback chart data
      return [
        { name: 'Jan', value: 1200, oil: 1200, gas: 2100, water: 850 },
        { name: 'Feb', value: 1350, oil: 1350, gas: 2300, water: 920 },
        { name: 'Mar', value: 1280, oil: 1280, gas: 2200, water: 880 },
        { name: 'Apr', value: 1420, oil: 1420, gas: 2400, water: 950 },
        { name: 'May', value: 1380, oil: 1380, gas: 2350, water: 900 },
        { name: 'Jun', value: 1500, oil: 1500, gas: 2500, water: 1000 },
      ];
    }
    return prodData.slice(-6).map((item, index) => ({
      name: new Date(item.timestamp).toLocaleDateString('en-US', { month: 'short' }),
      value: item.oil,
      oil: item.oil,
      gas: item.gas,
      water: item.water
    }));
  }, [prodData]);

  // Create fallback metrics for dashboard
  const dashboardMetrics = React.useMemo(() => {
    return {
      oil: operationalData?.production.oil || 1250,
      gas: operationalData?.production.gas || 2100,
      water: operationalData?.production.water || 850,
      safety: safetyData?.overallScore || 98.5
    };
  }, [operationalData, safetyData]);

  // Type adapters to convert between data service types and component types
  const adaptSafetyIncidents = (incidents: typeof incidentsData) => {
    if (!incidents) return [];
    return incidents.map(incident => ({
      ...incident,
      type: incident.type === 'personnel' ? 'injury' as const : incident.type
    }));
  };

  const adaptWellData = (wells: typeof wellsData) => {
    if (!wells) return [];
    return wells.map(well => ({
      ...well,
      status: well.status === 'abandoned' ? 'shut-in' as const : well.status
    }));
  };

  const adaptEquipmentData = (equipment: typeof equipmentData) => {
    if (!equipment) return [];
    return equipment.map(item => ({
      ...item,
      type: item.type === 'heat_exchanger' ? 'sensor' as const : item.type,
      status: item.status === 'failed' ? 'critical' as const : 
              item.status === 'standby' ? 'offline' as const : item.status
    }));
  };

  const adaptAlertsToEnvironmental = (alerts: typeof alertsData) => {
    if (!alerts) return [];
    return alerts.filter(alert => alert.type === 'warning').map(alert => ({
      id: alert.id,
      type: 'emission' as const,
      severity: 'medium' as const,
      message: alert.message,
      location: 'Platform Alpha',
      timestamp: alert.timestamp,
      status: 'active' as const
    }));
  };
  
  const navigationItems = [
    { label: 'Dashboard', href: '/dashboard', active: activeView === 'dashboard' },
    { label: 'Operations', href: '/operations', active: activeView === 'operations' },
    { label: 'Safety', href: '/safety', active: activeView === 'safety' },
    { label: 'Production', href: '/production', active: activeView === 'production' },
    { label: 'Environmental', href: '/environmental', active: activeView === 'environmental' },
    { label: 'Equipment', href: '/equipment', active: activeView === 'equipment' },
    { label: 'Sustainability', href: '/sustainability', active: activeView === 'sustainability' },
    { label: 'Carbon Calculator', href: '/carbon', active: activeView === 'carbon' },
    { label: 'Reports', href: '/reports', active: activeView === 'reports' },
  ];

  const sidebarItems = [
    { id: 'dashboard', icon: 'dashboard', label: 'Dashboard', href: '#', active: activeView === 'dashboard', onClick: () => setActiveView('dashboard') },
    { id: 'operations', icon: 'settings', label: 'Operations', href: '#', active: activeView === 'operations', onClick: () => setActiveView('operations') },
    { id: 'safety', icon: 'security', label: 'Safety', href: '#', active: activeView === 'safety', onClick: () => setActiveView('safety') },
    { id: 'production', icon: 'analytics', label: 'Production', href: '#', active: activeView === 'production', onClick: () => setActiveView('production') },
    { id: 'environmental', icon: 'eco', label: 'Environmental', href: '#', active: activeView === 'environmental', onClick: () => setActiveView('environmental') },
    { id: 'equipment', icon: 'build', label: 'Equipment', href: '#', active: activeView === 'equipment', onClick: () => setActiveView('equipment') },
    { id: 'sustainability', icon: 'eco', label: 'Sustainability Insights', href: '#', active: activeView === 'sustainability', onClick: () => setActiveView('sustainability') },
    { id: 'carbon', icon: 'calculate', label: 'Carbon Calculator', href: '#', active: activeView === 'carbon', onClick: () => setActiveView('carbon') },
    { id: 'reports', icon: 'description', label: 'Reports', href: '#', active: activeView === 'reports', onClick: () => setActiveView('reports') },
  ];

  const user = {
    name: 'John Smith',
    role: 'Operations Manager',
  };

  // Transform facilities data for Select component
  const facilityOptions = React.useMemo(() => {
    if (!facilities) return [];
    return facilities.map(facility => ({
      value: facility.id,
      label: facility.name
    }));
  }, [facilities]);

  // Get selected facility data
  const selectedFacility = React.useMemo(() => {
    return facilities?.find(f => f.id === selectedFacilityId) || null;
  }, [facilities, selectedFacilityId]);

  const renderActiveView = () => {
    if (!selectedFacility) {
      return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading facility data...</div>;
    }

    switch (activeView) {
      case 'operations':
        return operationalData && alertsData ? (
          <OperationalDashboard
            facilityId={selectedFacilityId}
            facilityName={selectedFacility.name}
            metrics={operationalData}
            alerts={alertsData}
          />
        ) : <div style={{ padding: '2rem', textAlign: 'center' }}>Loading operational data...</div>;
        
      case 'safety':
        return safetyData && incidentsData ? (
          <SafetyMonitor
            facilityId={selectedFacilityId}
            metrics={safetyData}
            incidents={adaptSafetyIncidents(incidentsData)}
          />
        ) : <div style={{ padding: '2rem', textAlign: 'center' }}>Loading safety data...</div>;
        
      case 'production':
        return wellsData ? (
          <ProductionTracker
            facilityId={selectedFacilityId}
            wells={adaptWellData(wellsData)}
            metrics={{
              totalOil: operationalData?.production.oil || 0,
              totalGas: operationalData?.production.gas || 0,
              totalWater: operationalData?.production.water || 0,
              efficiency: operationalData?.production.efficiency || 0,
              activeWells: wellsData.filter(w => w.status === 'active').length,
              totalWells: wellsData.length,
              dailyTarget: 1200,
              monthlyTarget: 36000
            }}
          />
        ) : <div style={{ padding: '2rem', textAlign: 'center' }}>Loading production data...</div>;
        
      case 'environmental':
        return envData ? (
          <EnvironmentalMonitor
            facilityId={selectedFacilityId}
            metrics={envData}
            alerts={adaptAlertsToEnvironmental(alertsData)}
          />
        ) : <div style={{ padding: '2rem', textAlign: 'center' }}>Loading environmental data...</div>;
        
      case 'equipment':
        return equipmentData ? (
          <EquipmentStatus
            facilityId={selectedFacilityId}
            equipment={adaptEquipmentData(equipmentData)}
            maintenanceTasks={[]} // TODO: Add maintenance tasks to data service
          />
        ) : <div style={{ padding: '2rem', textAlign: 'center' }}>Loading equipment data...</div>;
        
      case 'sustainability':
        return <SustainabilityInsights />;
        
      case 'carbon':
        return <CarbonFootprintCalculator />;
        
      case 'reports':
        return <ReportGenerator />;
        
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
          <Button variant='secondary' size='lg' onClick={() => setActiveView('sustainability')}>
            Sustainability Insights
          </Button>
          <Button variant='outline' size='lg' onClick={() => setActiveView('carbon')}>
            Carbon Calculator
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
              value={dashboardMetrics.oil}
              unit="bbl/day"
              change={{ value: 5.2, type: 'increase', period: 'vs last month' }}
              status="success"
              trend="up"
            />
            <MetricCard
              title="Gas Production"
              value={dashboardMetrics.gas}
              unit="mcf/day"
              change={{ value: 2.1, type: 'increase', period: 'vs last month' }}
              status="normal"
              trend="up"
            />
            <MetricCard
              title="Water Production"
              value={dashboardMetrics.water}
              unit="bbl/day"
              change={{ value: 1.5, type: 'decrease', period: 'vs last month' }}
              status="warning"
              trend="down"
            />
            <MetricCard
              title="Safety Score"
              value={dashboardMetrics.safety}
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
                data={chartData}
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
                  value={selectedFacilityId}
                  onChange={(value) => setSelectedFacilityId(String(value))}
                />
                <Input
                  label="Production Rate"
                  placeholder="Enter daily production"
                  helperText="Production rate in barrels per day"
                  value={dashboardMetrics.oil.toString()}
                  readOnly
                />
                <Input
                  label="Pressure Reading"
                  placeholder="Enter pressure"
                  helperText="Current system pressure"
                  value="850 PSI"
                  readOnly
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