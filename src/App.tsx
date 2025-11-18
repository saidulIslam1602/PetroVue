/**
 * Main Application Component
 * Demonstrates clean architecture and component organization
 */

import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box, Typography, Card as MuiCard } from '@mui/material';
import { createTheme } from '@mui/material/styles';
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
import { Hero } from './components/layout/Hero';
import { EnhancedChart } from './components/ui/EnhancedChart';
import { Logo } from './components/ui/Logo';
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
  useProductionData,
} from './hooks/useData';
import './styles/globals.css';

// Create Material-UI theme based on our design system
const muiTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#10b981',
      light: '#34d399',
      dark: '#059669',
    },
    secondary: {
      main: '#3b82f6',
      light: '#60a5fa',
      dark: '#2563eb',
    },
    background: {
      default: '#0f172a',
      paper: '#1e293b',
    },
    success: {
      main: '#10b981',
    },
    warning: {
      main: '#f59e0b',
    },
    error: {
      main: '#ef4444',
    },
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", "Roboto", "Arial", sans-serif',
    h1: {
      fontWeight: 800,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 700,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});

const App: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const [activeView, setActiveView] = React.useState('dashboard');
  const [selectedFacilityId] = React.useState('PLT-001');

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
      name: new Date(item.timestamp).toLocaleDateString('en-US', {
        month: 'short',
      }),
      value: item.oil,
      oil: item.oil,
      gas: item.gas,
      water: item.water,
    }));
  }, [prodData]);

  // Type adapters to convert between data service types and component types
  const adaptSafetyIncidents = (incidents: typeof incidentsData) => {
    if (!incidents) return [];
    return incidents.map(incident => ({
      ...incident,
      type: incident.type === 'personnel' ? ('injury' as const) : incident.type,
    }));
  };

  const adaptWellData = (wells: typeof wellsData) => {
    if (!wells) return [];
    return wells.map(well => ({
      ...well,
      status: well.status === 'abandoned' ? ('shut-in' as const) : well.status,
    }));
  };

  const adaptEquipmentData = (equipment: typeof equipmentData) => {
    if (!equipment) return [];
    return equipment.map(item => ({
      ...item,
      type: item.type === 'heat_exchanger' ? ('sensor' as const) : item.type,
      status:
        item.status === 'failed'
          ? ('critical' as const)
          : item.status === 'standby'
            ? ('offline' as const)
            : item.status,
    }));
  };

  const adaptAlertsToEnvironmental = (alerts: typeof alertsData) => {
    if (!alerts) return [];
    return alerts
      .filter(alert => alert.type === 'warning')
      .map(alert => ({
        id: alert.id,
        type: 'emission' as const,
        severity: 'medium' as const,
        message: alert.message,
        location: 'Platform Alpha',
        timestamp: alert.timestamp,
        status: 'active' as const,
      }));
  };

  const navigationItems = [
    {
      label: 'Dashboard',
      href: '#',
      active: activeView === 'dashboard',
      onClick: () => setActiveView('dashboard'),
    },
    {
      label: 'Operations',
      href: '#',
      active: activeView === 'operations',
      onClick: () => setActiveView('operations'),
    },
    {
      label: 'Safety',
      href: '#',
      active: activeView === 'safety',
      onClick: () => setActiveView('safety'),
    },
    {
      label: 'Production',
      href: '#',
      active: activeView === 'production',
      onClick: () => setActiveView('production'),
    },
    {
      label: 'Environmental',
      href: '#',
      active: activeView === 'environmental',
      onClick: () => setActiveView('environmental'),
    },
    {
      label: 'Equipment',
      href: '#',
      active: activeView === 'equipment',
      onClick: () => setActiveView('equipment'),
    },
    {
      label: 'Sustainability',
      href: '#',
      active: activeView === 'sustainability',
      onClick: () => setActiveView('sustainability'),
    },
    {
      label: 'Carbon Calculator',
      href: '#',
      active: activeView === 'carbon',
      onClick: () => setActiveView('carbon'),
    },
    {
      label: 'Reports',
      href: '#',
      active: activeView === 'reports',
      onClick: () => setActiveView('reports'),
    },
  ];

  const sidebarItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      active: activeView === 'dashboard',
      onClick: () => setActiveView('dashboard'),
    },
    {
      id: 'operations',
      label: 'Operations',
      active: activeView === 'operations',
      onClick: () => setActiveView('operations'),
    },
    {
      id: 'safety',
      label: 'Safety',
      active: activeView === 'safety',
      onClick: () => setActiveView('safety'),
    },
    {
      id: 'production',
      label: 'Production',
      active: activeView === 'production',
      onClick: () => setActiveView('production'),
    },
    {
      id: 'environmental',
      label: 'Environmental',
      active: activeView === 'environmental',
      onClick: () => setActiveView('environmental'),
    },
    {
      id: 'equipment',
      label: 'Equipment',
      active: activeView === 'equipment',
      onClick: () => setActiveView('equipment'),
    },
    {
      id: 'sustainability',
      label: 'Sustainability Insights',
      active: activeView === 'sustainability',
      onClick: () => setActiveView('sustainability'),
    },
    {
      id: 'carbon',
      label: 'Carbon Calculator',
      active: activeView === 'carbon',
      onClick: () => setActiveView('carbon'),
    },
    {
      id: 'reports',
      label: 'Reports',
      active: activeView === 'reports',
      onClick: () => setActiveView('reports'),
    },
  ];

  const user = {
    name: 'John Smith',
    role: 'Operations Manager',
  };

  // Get selected facility data
  const selectedFacility = React.useMemo(() => {
    return facilities?.find(f => f.id === selectedFacilityId) || null;
  }, [facilities, selectedFacilityId]);

  const renderActiveView = () => {
    switch (activeView) {
      case 'dashboard':
        return renderDashboard();
      case 'operations':
        return operationalData && alertsData && selectedFacility ? (
          <OperationalDashboard
            facilityId={selectedFacilityId}
            facilityName={selectedFacility.name}
            metrics={operationalData}
            alerts={alertsData}
          />
        ) : (
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            Loading operational data...
          </div>
        );

      case 'safety':
        return safetyData && incidentsData ? (
          <SafetyMonitor
            facilityId={selectedFacilityId}
            metrics={safetyData}
            incidents={adaptSafetyIncidents(incidentsData)}
          />
        ) : (
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            Loading safety data...
          </div>
        );

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
              monthlyTarget: 36000,
            }}
          />
        ) : (
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            Loading production data...
          </div>
        );

      case 'environmental':
        return envData ? (
          <EnvironmentalMonitor
            facilityId={selectedFacilityId}
            metrics={envData}
            alerts={adaptAlertsToEnvironmental(alertsData)}
          />
        ) : (
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            Loading environmental data...
          </div>
        );

      case 'equipment':
        return equipmentData ? (
          <EquipmentStatus
            facilityId={selectedFacilityId}
            equipment={adaptEquipmentData(equipmentData)}
            maintenanceTasks={[]} // TODO: Add maintenance tasks to data service
          />
        ) : (
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            Loading equipment data...
          </div>
        );

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
    <div style={{ background: '#0f172a', minHeight: '100vh' }}>
      {/* Demo Data Banner */}
      <Box
        sx={{
          background: 'linear-gradient(90deg, #10b981 0%, #059669 100%)',
          py: 1,
          px: 3,
          textAlign: 'center',
        }}
      >
        <Typography variant='caption' sx={{ color: 'white', fontWeight: 600 }}>
          🎯 Demo Mode - Using Simulated Industry Data
        </Typography>
      </Box>

      <Hero onExplore={() => setActiveView('sustainability')} />

      <Box sx={{ py: 8, px: 4, maxWidth: 1400, mx: 'auto' }}>
        {/* Quick Stats */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: '1fr 1fr',
              md: 'repeat(4, 1fr)',
            },
            gap: 3,
            mb: 6,
          }}
        >
          <MuiCard
            sx={{
              p: 3,
              background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
            }}
          >
            <Typography
              variant='overline'
              sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem' }}
            >
              Active Facilities
            </Typography>
            <Typography
              variant='h3'
              sx={{ color: 'white', fontWeight: 'bold', mt: 1 }}
            >
              {facilities?.length || 0}
            </Typography>
          </MuiCard>

          <MuiCard
            sx={{
              p: 3,
              background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
            }}
          >
            <Typography
              variant='overline'
              sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem' }}
            >
              Production (bbl/d)
            </Typography>
            <Typography
              variant='h3'
              sx={{ color: '#10b981', fontWeight: 'bold', mt: 1 }}
            >
              {operationalData?.production.oil.toLocaleString() || '0'}
            </Typography>
          </MuiCard>

          <MuiCard
            sx={{
              p: 3,
              background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
            }}
          >
            <Typography
              variant='overline'
              sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem' }}
            >
              Safety Score
            </Typography>
            <Typography
              variant='h3'
              sx={{ color: '#3b82f6', fontWeight: 'bold', mt: 1 }}
            >
              {operationalData?.safety.score || '0'}%
            </Typography>
          </MuiCard>

          <MuiCard
            sx={{
              p: 3,
              background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
            }}
          >
            <Typography
              variant='overline'
              sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem' }}
            >
              Active Alerts
            </Typography>
            <Typography
              variant='h3'
              sx={{ color: '#f59e0b', fontWeight: 'bold', mt: 1 }}
            >
              {alertsData?.filter(a => !a.resolved).length || '0'}
            </Typography>
          </MuiCard>
        </Box>

        <EnhancedChart
          data={chartData}
          type='area'
          title='Environmental Performance Trends'
          height={350}
          dataKeys={['oil', 'gas', 'water']}
          showGrid
          showLegend
          gradient
        />
      </Box>
    </div>
  );

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh', background: '#0f172a' }}>
        <Sidebar
          items={sidebarItems}
          user={user}
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          logo={<Logo collapsed={sidebarCollapsed} />}
        />

        <Box
          sx={{
            flex: 1,
            marginLeft: sidebarCollapsed ? '64px' : '256px',
            transition: 'margin-left 0.3s ease',
            background: '#0f172a',
          }}
        >
          <Header
            title={APP_CONFIG.name}
            navigation={navigationItems}
            user={user}
          />

          <Box
            component='main'
            sx={{ padding: '0', flex: 1, background: '#0f172a' }}
          >
            {renderActiveView()}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
