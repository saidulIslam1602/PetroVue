/**
 * OperationalDashboard Integration Tests
 * Comprehensive tests for operational dashboard functionality
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { OperationalDashboard } from './OperationalDashboard';

const mockMetrics = {
  production: {
    oil: 1250,
    gas: 2100,
    water: 850,
    efficiency: 92,
  },
  safety: {
    score: 98,
    incidents: 0,
    lastInspection: '2024-01-15',
  },
  equipment: {
    totalUnits: 45,
    operational: 42,
    maintenance: 2,
    critical: 1,
  },
  environmental: {
    emissions: 1200,
    waste: 85,
    compliance: 96,
  },
};

const mockAlerts = [
  {
    id: '1',
    type: 'critical' as const,
    title: 'High Pressure Alert',
    message: 'Pressure reading exceeds safety threshold.',
    timestamp: new Date().toISOString(),
  },
  {
    id: '2',
    type: 'warning' as const,
    title: 'Maintenance Due',
    message: 'Scheduled maintenance is due in 48 hours.',
    timestamp: new Date().toISOString(),
  },
];

describe('OperationalDashboard', () => {
  it('renders dashboard with facility information', () => {
    render(
      <OperationalDashboard
        facilityId='PLT-001'
        facilityName='Platform Alpha'
        metrics={mockMetrics}
        alerts={mockAlerts}
      />
    );

    expect(screen.getByText('Platform Alpha')).toBeInTheDocument();
    expect(screen.getByText(/Facility ID:/)).toBeInTheDocument();
    expect(screen.getByText(/PLT-001/)).toBeInTheDocument();
  });

  it('displays operational metrics', () => {
    render(
      <OperationalDashboard
        facilityId='PLT-001'
        facilityName='Platform Alpha'
        metrics={mockMetrics}
        alerts={mockAlerts}
      />
    );

    expect(screen.getByText('Oil Production')).toBeInTheDocument();
    expect(screen.getByText(/1250|1,250/)).toBeInTheDocument();
    expect(screen.getByText('bbl/day')).toBeInTheDocument();

    expect(screen.getByText('Gas Production')).toBeInTheDocument();
    expect(screen.getByText(/2100|2,100/)).toBeInTheDocument();
    expect(screen.getByText('mcf/day')).toBeInTheDocument();
  });

  it('displays safety metrics', () => {
    render(
      <OperationalDashboard
        facilityId='PLT-001'
        facilityName='Platform Alpha'
        metrics={mockMetrics}
        alerts={mockAlerts}
      />
    );

    expect(screen.getByText('Safety Score')).toBeInTheDocument();
    expect(screen.getByText('98')).toBeInTheDocument();
    expect(screen.getByText('%')).toBeInTheDocument();
  });

  it('displays equipment status', () => {
    render(
      <OperationalDashboard
        facilityId='PLT-001'
        facilityName='Platform Alpha'
        metrics={mockMetrics}
        alerts={mockAlerts}
      />
    );

    expect(screen.getByText('Equipment Status')).toBeInTheDocument();
    expect(screen.getAllByText('42').length).toBeGreaterThan(0);
    expect(screen.getByText('/ 45')).toBeInTheDocument();
  });

  it('shows active alerts', () => {
    render(
      <OperationalDashboard
        facilityId='PLT-001'
        facilityName='Platform Alpha'
        metrics={mockMetrics}
        alerts={mockAlerts}
      />
    );

    expect(screen.getByText('Active Alerts (2)')).toBeInTheDocument();
    expect(screen.getByText('High Pressure Alert')).toBeInTheDocument();
    expect(screen.getByText('Maintenance Due')).toBeInTheDocument();
  });

  it('displays overall status indicator', () => {
    render(
      <OperationalDashboard
        facilityId='PLT-001'
        facilityName='Platform Alpha'
        metrics={mockMetrics}
        alerts={mockAlerts}
      />
    );

    expect(screen.getByText('CRITICAL')).toBeInTheDocument();
  });

  it('handles refresh functionality', async () => {
    const user = userEvent.setup();
    const handleRefresh = jest.fn();

    render(
      <OperationalDashboard
        facilityId='PLT-001'
        facilityName='Platform Alpha'
        metrics={mockMetrics}
        alerts={mockAlerts}
        onRefresh={handleRefresh}
      />
    );

    const refreshButton = screen.getByText('Refresh Data');
    await user.click(refreshButton);

    expect(handleRefresh).toHaveBeenCalledTimes(1);
  });

  it('displays production trends chart', () => {
    render(
      <OperationalDashboard
        facilityId='PLT-001'
        facilityName='Platform Alpha'
        metrics={mockMetrics}
        alerts={mockAlerts}
      />
    );

    expect(screen.getByText('Real-time Production Trends')).toBeInTheDocument();
  });

  it('shows system status summary', () => {
    render(
      <OperationalDashboard
        facilityId='PLT-001'
        facilityName='Platform Alpha'
        metrics={mockMetrics}
        alerts={mockAlerts}
      />
    );

    expect(screen.getByText('System Status')).toBeInTheDocument();
    expect(screen.getByText('Total Equipment')).toBeInTheDocument();
    expect(screen.getByText('45')).toBeInTheDocument();
    expect(screen.getByText('Operational')).toBeInTheDocument();
    expect(screen.getAllByText('42')[0]).toBeInTheDocument();
  });

  it('handles empty alerts gracefully', () => {
    render(
      <OperationalDashboard
        facilityId='PLT-001'
        facilityName='Platform Alpha'
        metrics={mockMetrics}
        alerts={[]}
      />
    );

    expect(screen.queryByText('Active Alerts')).not.toBeInTheDocument();
  });

  it('displays last updated timestamp', () => {
    render(
      <OperationalDashboard
        facilityId='PLT-001'
        facilityName='Platform Alpha'
        metrics={mockMetrics}
        alerts={mockAlerts}
      />
    );

    expect(screen.getByText(/Last Updated:/)).toBeInTheDocument();
  });
});
