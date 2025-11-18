/**
 * Data Services
 * Business logic and data fetching services for PetroVue
 */

import { apiClient, withRetry, handleApiError } from './api';

// Type definitions for data models
export interface FacilityData {
  id: string;
  name: string;
  type: 'platform' | 'refinery' | 'terminal';
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  capacity: {
    oil: number;
    gas: number;
    storage: number;
  };
  status: 'operational' | 'maintenance' | 'shutdown';
  lastUpdated: string;
}

export interface OperationalMetrics {
  production: {
    oil: number;
    gas: number;
    water: number;
    efficiency: number;
  };
  safety: {
    score: number;
    incidents: number;
    lastInspection: string;
  };
  equipment: {
    totalUnits: number;
    operational: number;
    maintenance: number;
    critical: number;
  };
  environmental: {
    emissions: number;
    waste: number;
    compliance: number;
  };
}

export interface AlertData {
  id: string;
  type: 'critical' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: string;
  facilityId: string;
  priority: number;
  acknowledged: boolean;
  resolved: boolean;
}

export interface ProductionData {
  timestamp: string;
  facilityId: string;
  oil: number;
  gas: number;
  water: number;
  efficiency: number;
  target: number;
}

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
  type: 'equipment' | 'personnel' | 'environmental' | 'process';
  severity: 'critical' | 'high' | 'medium' | 'low';
  description: string;
  location: string;
  timestamp: string;
  status: 'open' | 'investigating' | 'resolved';
  assignedTo?: string;
  reportedBy: string;
}

export interface WellData {
  id: string;
  name: string;
  type: 'oil' | 'gas' | 'injection';
  status: 'active' | 'inactive' | 'maintenance' | 'abandoned';
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

export interface EquipmentData {
  id: string;
  name: string;
  type:
    | 'pump'
    | 'compressor'
    | 'valve'
    | 'turbine'
    | 'generator'
    | 'heat_exchanger';
  status: 'operational' | 'maintenance' | 'failed' | 'standby';
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

// Data Services
export class DataService {
  // Facility Services
  async getFacilities(): Promise<FacilityData[]> {
    try {
      const response = await withRetry(() =>
        apiClient.get<FacilityData[]>('/facilities')
      );
      return response.data;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to fetch facilities, using fallback data:', error);
      return this.getFallbackFacilities();
    }
  }

  async getFacility(id: string): Promise<FacilityData | null> {
    try {
      const response = await withRetry(() =>
        apiClient.get<FacilityData>(`/facilities/${id}`)
      );
      return response.data;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching facility:', handleApiError(error));
      const facilities = this.getFallbackFacilities();
      return facilities.find(f => f.id === id) || null;
    }
  }

  // Operational Data Services
  async getOperationalMetrics(facilityId: string): Promise<OperationalMetrics> {
    try {
      const response = await withRetry(() =>
        apiClient.get<OperationalMetrics>(`/facilities/${facilityId}/metrics`)
      );
      return response.data;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(
        'Error fetching operational metrics:',
        handleApiError(error)
      );
      return this.getFallbackOperationalMetrics();
    }
  }

  async getAlerts(facilityId?: string): Promise<AlertData[]> {
    try {
      const endpoint = facilityId
        ? `/facilities/${facilityId}/alerts`
        : '/alerts';
      const response = await withRetry(() =>
        apiClient.get<AlertData[]>(endpoint)
      );
      return response.data;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching alerts:', handleApiError(error));
      return this.getFallbackAlerts();
    }
  }

  // Production Services
  async getProductionData(
    facilityId: string,
    period: string = '7d'
  ): Promise<ProductionData[]> {
    try {
      const response = await withRetry(() =>
        apiClient.get<ProductionData[]>(
          `/facilities/${facilityId}/production`,
          { period }
        )
      );
      return response.data;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching production data:', handleApiError(error));
      return this.getFallbackProductionData();
    }
  }

  async getWells(facilityId: string): Promise<WellData[]> {
    try {
      const response = await withRetry(() =>
        apiClient.get<WellData[]>(`/facilities/${facilityId}/wells`)
      );
      return response.data;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching wells:', handleApiError(error));
      return this.getFallbackWells();
    }
  }

  // Safety Services
  async getSafetyMetrics(facilityId: string): Promise<SafetyMetrics> {
    try {
      const response = await withRetry(() =>
        apiClient.get<SafetyMetrics>(`/facilities/${facilityId}/safety/metrics`)
      );
      return response.data;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching safety metrics:', handleApiError(error));
      return this.getFallbackSafetyMetrics();
    }
  }

  async getSafetyIncidents(
    facilityId: string,
    limit: number = 50
  ): Promise<SafetyIncident[]> {
    try {
      const response = await withRetry(() =>
        apiClient.get<SafetyIncident[]>(
          `/facilities/${facilityId}/safety/incidents`,
          { limit: limit.toString() }
        )
      );
      return response.data;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching safety incidents:', handleApiError(error));
      return this.getFallbackSafetyIncidents();
    }
  }

  // Equipment Services
  async getEquipment(facilityId: string): Promise<EquipmentData[]> {
    try {
      const response = await withRetry(() =>
        apiClient.get<EquipmentData[]>(`/facilities/${facilityId}/equipment`)
      );
      return response.data;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching equipment:', handleApiError(error));
      return this.getFallbackEquipment();
    }
  }

  // Environmental Services
  async getEnvironmentalMetrics(
    facilityId: string
  ): Promise<EnvironmentalMetrics> {
    try {
      const response = await withRetry(() =>
        apiClient.get<EnvironmentalMetrics>(
          `/facilities/${facilityId}/environmental`
        )
      );
      return response.data;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(
        'Error fetching environmental metrics:',
        handleApiError(error)
      );
      return this.getFallbackEnvironmentalMetrics();
    }
  }

  // Fallback data methods (for development/offline use)
  private getFallbackFacilities(): FacilityData[] {
    return [
      {
        id: 'PLT-001',
        name: 'Platform Alpha',
        type: 'platform',
        location: {
          latitude: 29.7604,
          longitude: -95.3698,
          address: 'Gulf of Mexico, Sector 7',
        },
        capacity: {
          oil: 2000,
          gas: 5000,
          storage: 10000,
        },
        status: 'operational',
        lastUpdated: new Date().toISOString(),
      },
      {
        id: 'PLT-002',
        name: 'Platform Beta',
        type: 'platform',
        location: {
          latitude: 29.8604,
          longitude: -95.2698,
          address: 'Gulf of Mexico, Sector 8',
        },
        capacity: {
          oil: 1800,
          gas: 4500,
          storage: 9000,
        },
        status: 'operational',
        lastUpdated: new Date().toISOString(),
      },
    ];
  }

  private getFallbackOperationalMetrics(): OperationalMetrics {
    return {
      production: {
        oil: Math.floor(Math.random() * 500) + 1000,
        gas: Math.floor(Math.random() * 1000) + 2000,
        water: Math.floor(Math.random() * 200) + 800,
        efficiency: Math.floor(Math.random() * 10) + 90,
      },
      safety: {
        score: Math.floor(Math.random() * 5) + 95,
        incidents: Math.floor(Math.random() * 3),
        lastInspection: new Date(
          Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
        )
          .toISOString()
          .split('T')[0],
      },
      equipment: {
        totalUnits: 45,
        operational: 40 + Math.floor(Math.random() * 4),
        maintenance: Math.floor(Math.random() * 3) + 1,
        critical: Math.floor(Math.random() * 2),
      },
      environmental: {
        emissions: Math.floor(Math.random() * 200) + 1000,
        waste: Math.floor(Math.random() * 20) + 80,
        compliance: Math.floor(Math.random() * 5) + 94,
      },
    };
  }

  private getFallbackAlerts(): AlertData[] {
    const alertTypes = ['critical', 'warning', 'info'] as const;
    const titles = [
      'High Pressure Alert',
      'Maintenance Due',
      'Low Inventory',
      'Equipment Malfunction',
      'Temperature Warning',
    ];

    return Array.from(
      { length: Math.floor(Math.random() * 5) + 1 },
      (_, i) => ({
        id: `alert-${i + 1}`,
        type: alertTypes[Math.floor(Math.random() * alertTypes.length)],
        title: titles[Math.floor(Math.random() * titles.length)],
        message: `System alert detected at ${new Date().toLocaleTimeString()}`,
        timestamp: new Date(
          Date.now() - Math.random() * 24 * 60 * 60 * 1000
        ).toISOString(),
        facilityId: 'PLT-001',
        priority: Math.floor(Math.random() * 10) + 1,
        acknowledged: Math.random() > 0.5,
        resolved: Math.random() > 0.7,
      })
    );
  }

  private getFallbackProductionData(): ProductionData[] {
    const now = new Date();
    return Array.from({ length: 30 }, (_, i) => {
      const date = new Date(now.getTime() - (29 - i) * 24 * 60 * 60 * 1000);
      return {
        timestamp: date.toISOString(),
        facilityId: 'PLT-001',
        oil: Math.floor(Math.random() * 200) + 1100,
        gas: Math.floor(Math.random() * 400) + 1900,
        water: Math.floor(Math.random() * 100) + 800,
        efficiency: Math.floor(Math.random() * 10) + 88,
        target: 1200,
      };
    });
  }

  private getFallbackWells(): WellData[] {
    return [
      {
        id: 'WELL-001',
        name: 'Well Alpha-1',
        type: 'oil',
        status: 'active',
        production: {
          rate: Math.floor(Math.random() * 50) + 100,
          unit: 'bbl/day',
          efficiency: Math.floor(Math.random() * 10) + 90,
        },
        pressure: {
          current: Math.floor(Math.random() * 100) + 800,
          target: 900,
          unit: 'PSI',
        },
        lastUpdate: new Date().toISOString(),
        location: {
          platform: 'Alpha',
          zone: 'A',
        },
      },
    ];
  }

  private getFallbackSafetyMetrics(): SafetyMetrics {
    return {
      overallScore: Math.floor(Math.random() * 5) + 95,
      daysSinceIncident: Math.floor(Math.random() * 100) + 30,
      totalIncidents: Math.floor(Math.random() * 5) + 1,
      criticalAlerts: Math.floor(Math.random() * 2),
      complianceRate: Math.floor(Math.random() * 5) + 95,
      lastInspection: new Date(
        Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000
      )
        .toISOString()
        .split('T')[0],
      nextInspection: new Date(
        Date.now() + Math.random() * 90 * 24 * 60 * 60 * 1000
      )
        .toISOString()
        .split('T')[0],
    };
  }

  private getFallbackSafetyIncidents(): SafetyIncident[] {
    const types = [
      'equipment',
      'personnel',
      'environmental',
      'process',
    ] as const;
    const severities = ['critical', 'high', 'medium', 'low'] as const;
    const statuses = ['open', 'investigating', 'resolved'] as const;

    return Array.from(
      { length: Math.floor(Math.random() * 3) + 1 },
      (_, i) => ({
        id: `incident-${i + 1}`,
        type: types[Math.floor(Math.random() * types.length)],
        severity: severities[Math.floor(Math.random() * severities.length)],
        description: `Safety incident detected in facility zone ${String.fromCharCode(65 + i)}`,
        location: `Platform Alpha - Zone ${String.fromCharCode(65 + i)}`,
        timestamp: new Date(
          Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000
        ).toISOString(),
        status: statuses[Math.floor(Math.random() * statuses.length)],
        reportedBy: 'Safety Officer',
      })
    );
  }

  private getFallbackEquipment(): EquipmentData[] {
    const types = [
      'pump',
      'compressor',
      'valve',
      'turbine',
      'generator',
    ] as const;
    const statuses = [
      'operational',
      'maintenance',
      'failed',
      'standby',
    ] as const;

    return Array.from({ length: 8 }, (_, i) => ({
      id: `equip-${i + 1}`,
      name: `${types[i % types.length].charAt(0).toUpperCase() + types[i % types.length].slice(1)} ${String.fromCharCode(65 + i)}`,
      type: types[i % types.length],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      health: Math.floor(Math.random() * 30) + 70,
      location: `Platform Alpha - Zone ${String.fromCharCode(65 + Math.floor(i / 2))}`,
      lastMaintenance: new Date(
        Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
      )
        .toISOString()
        .split('T')[0],
      nextMaintenance: new Date(
        Date.now() + Math.random() * 90 * 24 * 60 * 60 * 1000
      )
        .toISOString()
        .split('T')[0],
      performance: {
        efficiency: Math.floor(Math.random() * 15) + 85,
        uptime: Math.floor(Math.random() * 10) + 90,
        load: Math.floor(Math.random() * 40) + 60,
      },
      alerts: Math.floor(Math.random() * 3),
    }));
  }

  private getFallbackEnvironmentalMetrics(): EnvironmentalMetrics {
    return {
      emissions: {
        co2: Math.floor(Math.random() * 200) + 1000,
        methane: Math.floor(Math.random() * 10) + 30,
        nox: Math.floor(Math.random() * 5) + 15,
        sox: Math.floor(Math.random() * 5) + 8,
        unit: 'tonnes/month',
      },
      waste: {
        hazardous: Math.floor(Math.random() * 10) + 10,
        nonHazardous: Math.floor(Math.random() * 20) + 40,
        recycled: Math.floor(Math.random() * 15) + 20,
        unit: 'tonnes/month',
      },
      water: {
        consumption: Math.floor(Math.random() * 200) + 1100,
        discharge: Math.floor(Math.random() * 150) + 750,
        treatment: Math.floor(Math.random() * 100) + 950,
        unit: 'm³/day',
      },
      compliance: {
        airQuality: Math.floor(Math.random() * 5) + 95,
        waterQuality: Math.floor(Math.random() * 8) + 92,
        wasteManagement: Math.floor(Math.random() * 10) + 90,
        overall: Math.floor(Math.random() * 6) + 94,
      },
      sustainability: {
        energyEfficiency: Math.floor(Math.random() * 8) + 88,
        renewableEnergy: Math.floor(Math.random() * 10) + 10,
        carbonIntensity: Math.floor(Math.random() * 5) + 10,
      },
    };
  }
}

// Export singleton instance
export const dataService = new DataService();
