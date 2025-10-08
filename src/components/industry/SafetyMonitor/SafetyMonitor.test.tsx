/**
 * SafetyMonitor Integration Tests
 * Comprehensive tests for safety monitoring functionality
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SafetyMonitor } from './SafetyMonitor';

const mockSafetyMetrics = {
  overallScore: 98,
  daysSinceIncident: 45,
  totalIncidents: 2,
  criticalAlerts: 0,
  complianceRate: 98,
  lastInspection: '2024-01-15',
  nextInspection: '2024-04-15'
};

const mockIncidents = [
  {
    id: '1',
    type: 'equipment' as const,
    severity: 'low' as const,
    description: 'Minor valve leak detected in Zone A',
    location: 'Platform Alpha - Zone A',
    timestamp: '2024-01-10T10:30:00Z',
    status: 'resolved' as const
  },
  {
    id: '2',
    type: 'injury' as const,
    severity: 'medium' as const,
    description: 'Minor injury during maintenance',
    location: 'Platform Beta - Engine Room',
    timestamp: '2024-01-05T14:20:00Z',
    status: 'investigating' as const
  }
];

describe('SafetyMonitor', () => {
  it('renders safety monitor with facility information', () => {
    render(
      <SafetyMonitor
        facilityId="PLT-001"
        metrics={mockSafetyMetrics}
        incidents={mockIncidents}
      />
    );

    expect(screen.getByText('Safety Monitor - Facility PLT-001')).toBeInTheDocument();
  });

  it('displays safety metrics', () => {
    render(
      <SafetyMonitor
        facilityId="PLT-001"
        metrics={mockSafetyMetrics}
        incidents={mockIncidents}
      />
    );

    expect(screen.getByText('Safety Score')).toBeInTheDocument();
    expect(screen.getAllByText('98')[0]).toBeInTheDocument();
    expect(screen.getByText('%')).toBeInTheDocument();
    
    expect(screen.getByText('Days Since Incident')).toBeInTheDocument();
    expect(screen.getByText('45')).toBeInTheDocument();
    expect(screen.getByText('days')).toBeInTheDocument();
  });

  it('displays incident metrics', () => {
    render(
      <SafetyMonitor
        facilityId="PLT-001"
        metrics={mockSafetyMetrics}
        incidents={mockIncidents}
      />
    );

    expect(screen.getByText('Total Incidents')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('this year')).toBeInTheDocument();
    
    expect(screen.getAllByText('Compliance Rate')[0]).toBeInTheDocument();
    expect(screen.getAllByText('98')[0]).toBeInTheDocument();
  });

  it('shows recent incidents', () => {
    render(
      <SafetyMonitor
        facilityId="PLT-001"
        metrics={mockSafetyMetrics}
        incidents={mockIncidents}
      />
    );

    expect(screen.getByText('Recent Incidents')).toBeInTheDocument();
    expect(screen.getByText('Minor valve leak detected in Zone A')).toBeInTheDocument();
    expect(screen.getByText('Minor injury during maintenance')).toBeInTheDocument();
  });

  it('displays compliance status', () => {
    render(
      <SafetyMonitor
        facilityId="PLT-001"
        metrics={mockSafetyMetrics}
        incidents={mockIncidents}
      />
    );

    expect(screen.getByText('Compliance Status')).toBeInTheDocument();
    expect(screen.getByText('Last Inspection')).toBeInTheDocument();
    expect(screen.getByText('Next Inspection')).toBeInTheDocument();
    expect(screen.getAllByText('Compliance Rate')[0]).toBeInTheDocument();
  });

  it('shows critical safety alert when present', () => {
    const metricsWithCritical = {
      ...mockSafetyMetrics,
      criticalAlerts: 1
    };

    render(
      <SafetyMonitor
        facilityId="PLT-001"
        metrics={metricsWithCritical}
        incidents={mockIncidents}
      />
    );

    expect(screen.getByText('Critical Safety Alert')).toBeInTheDocument();
    expect(screen.getByText('1 critical safety issue(s) require immediate attention.')).toBeInTheDocument();
  });

  it('handles incident click events', async () => {
    const user = userEvent.setup();
    const handleIncidentClick = jest.fn();
    
    render(
      <SafetyMonitor
        facilityId="PLT-001"
        metrics={mockSafetyMetrics}
        incidents={mockIncidents}
        onIncidentClick={handleIncidentClick}
      />
    );

    const incidentCard = screen.getByText('Minor valve leak detected in Zone A').closest('div');
    expect(incidentCard).toBeInTheDocument();
    if (incidentCard) {
      await user.click(incidentCard);
    }
    expect(handleIncidentClick).toHaveBeenCalledWith(mockIncidents[0]);
  });

  it('handles refresh functionality', async () => {
    const user = userEvent.setup();
    const handleRefresh = jest.fn();
    
    render(
      <SafetyMonitor
        facilityId="PLT-001"
        metrics={mockSafetyMetrics}
        incidents={mockIncidents}
        onRefresh={handleRefresh}
      />
    );

    const refreshButton = screen.getByText('Refresh');
    await user.click(refreshButton);
    
    expect(handleRefresh).toHaveBeenCalledTimes(1);
  });

  it('displays safety performance trends chart', () => {
    render(
      <SafetyMonitor
        facilityId="PLT-001"
        metrics={mockSafetyMetrics}
        incidents={mockIncidents}
      />
    );

    expect(screen.getByText('Safety Performance Trends')).toBeInTheDocument();
    expect(screen.getByText('6-Month Safety Performance')).toBeInTheDocument();
  });

  it('shows sustainability metrics', () => {
    render(
      <SafetyMonitor
        facilityId="PLT-001"
        metrics={mockSafetyMetrics}
        incidents={mockIncidents}
      />
    );

    expect(screen.getByText('Energy Efficiency')).toBeInTheDocument();
    expect(screen.getByText('Renewable Energy')).toBeInTheDocument();
    expect(screen.getByText('Carbon Intensity')).toBeInTheDocument();
  });

  it('handles empty incidents gracefully', () => {
    render(
      <SafetyMonitor
        facilityId="PLT-001"
        metrics={mockSafetyMetrics}
        incidents={[]}
      />
    );

    expect(screen.getByText('No recent incidents')).toBeInTheDocument();
  });

  it('displays incident severity and type correctly', () => {
    render(
      <SafetyMonitor
        facilityId="PLT-001"
        metrics={mockSafetyMetrics}
        incidents={mockIncidents}
      />
    );

    expect(screen.getByText('equipment')).toBeInTheDocument();
    expect(screen.getByText('low')).toBeInTheDocument();
    expect(screen.getByText('injury')).toBeInTheDocument();
    expect(screen.getByText('medium')).toBeInTheDocument();
  });
});
