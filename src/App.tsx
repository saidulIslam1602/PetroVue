/**
 * PetroVue Main Application Component
 * Clean, organized structure following industry standards
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
import { APP_CONFIG } from './constants';
import './styles/globals.css';

// Create Material-UI theme based on our design system
const muiTheme = createTheme({
  palette: {
    primary: {
      main: '#0066cc',
      light: '#4da6ff',
      dark: '#003d7a',
    },
    secondary: {
      main: '#ff6600',
      light: '#ffa64d',
      dark: '#993d00',
    },
  },
  typography: {
    fontFamily:
      '"Inter", "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif',
  },
});

/**
 * Main Application Component
 * Demonstrates clean architecture and component organization
 */
const App: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  
  const navigationItems = [
    { label: 'Dashboard', href: '/dashboard', active: true },
    { label: 'Operations', href: '/operations' },
    { label: 'Sustainability', href: '/sustainability' },
    { label: 'Reports', href: '/reports' },
  ];

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', active: true },
    { id: 'operations', label: 'Operations', badge: 3 },
    { id: 'sustainability', label: 'Sustainability' },
    { id: 'reports', label: 'Reports' },
    { id: 'settings', label: 'Settings' },
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
        
        <header
          style={{
            padding: '2rem',
            textAlign: 'center',
            backgroundColor: '#f5f5f5',
            borderBottom: '1px solid #e0e0e0',
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

          {/* Button Showcase */}
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: '2rem',
            }}
          >
            <Button variant='primary' size='lg'>
              Get Started
            </Button>
            <Button variant='outline' size='lg'>
              View Dashboard
            </Button>
            <Button variant='secondary' size='lg'>
              Operations
            </Button>
          </div>
        </header>

        <main
          style={{
            padding: '3rem 2rem',
            maxWidth: '1200px',
            margin: '0 auto',
          }}
        >
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
            
            {/* Alerts Section */}
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

            {/* Metrics Section */}
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

            {/* Charts and Forms Section */}
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

            {/* Quick Actions */}
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
        </main>

        <footer
          style={{
            padding: '2rem',
            textAlign: 'center',
            backgroundColor: '#212121',
            color: '#fff',
            marginTop: '3rem',
          }}
        >
          <p style={{ margin: 0 }}>
            © 2024 {APP_CONFIG.name} - Built for the Oil & Gas Industry
          </p>
        </footer>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
