/**
 * ESG Sustainability Dashboard
 * Environmental, Social, and Governance tracking for Norwegian petroleum operations
 * Demonstrates commitment to sustainable energy transition and climate goals
 */

import React, { useState } from 'react';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Box,
  Alert,
  Chip,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Tabs,
  Tab,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Nature,
  Co2,
  WaterDrop,
  EnergySavingsLeaf,
  RecyclingRounded,
  Groups,
  Security,
  TrendingDown,
  CheckCircle,
  Warning,
  WindPower,
  WbSunny,
} from '@mui/icons-material';

// Styled components for ESG metrics
const EnvironmentalCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, #166534 0%, #22c55e 100%)',
  color: 'white',
}));

const SocialCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
  color: 'white',
}));

const GovernanceCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
  color: 'white',
}));

const CarbonCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
  color: 'white',
}));

// ESG Data Interfaces
interface ESGMetrics {
  operatorId: string;
  operatorName: string;
  reportingPeriod: {
    year: number;
    quarter: string;
  };
  environmental: EnvironmentalMetrics;
  social: SocialMetrics;
  governance: GovernanceMetrics;
  carbonIntensity: CarbonIntensityData;
  renewableEnergy: RenewableEnergyData;
  climateGoals: ClimateGoalsData;
  sustainability: SustainabilityTargets;
}

interface EnvironmentalMetrics {
  emissions: {
    scope1: number; // tonnes CO2e - direct emissions
    scope2: number; // tonnes CO2e - indirect emissions
    scope3: number; // tonnes CO2e - value chain emissions
    total: number; // tonnes CO2e
    intensity: number; // kg CO2e/boe
    flaring: number; // tonnes CO2e
    venting: number; // tonnes CO2e
    fugitive: number; // tonnes CO2e
  };
  energy: {
    consumption: number; // GWh
    renewable: number; // GWh
    renewablePercentage: number; // %
    efficiency: number; // % improvement YoY
  };
  water: {
    consumption: number; // million m³
    recycled: number; // million m³
    discharged: number; // million m³
    quality: 'excellent' | 'good' | 'acceptable' | 'poor';
  };
  waste: {
    generated: number; // tonnes
    recycled: number; // tonnes
    hazardous: number; // tonnes
    recyclingRate: number; // %
  };
  biodiversity: {
    protectedAreas: number; // km²
    restoration: number; // km²
    marineProtection: number; // km²
    impactAssessments: number;
  };
  spills: {
    number: number;
    volume: number; // m³
    severity: 'low' | 'medium' | 'high';
    recovered: number; // %
  };
}

interface SocialMetrics {
  workforce: {
    total: number;
    norwegian: number; // %
    female: number; // %
    indigenous: number; // %
    contractors: number;
  };
  safety: {
    recordableInjuryRate: number; // per million hours
    lostTimeInjuryRate: number; // per million hours
    fatalities: number;
    nearMisses: number;
    safetyScore: number; // 0-100
  };
  training: {
    hoursPerEmployee: number;
    safetyTraining: number; // hours
    technicalTraining: number; // hours
    leadershipTraining: number; // hours
  };
  community: {
    investment: number; // MNOK
    localProcurement: number; // %
    jobs: number; // local jobs supported
    education: number; // MNOK in education programs
  };
  humanRights: {
    assessments: number;
    grievances: number;
    resolved: number; // %
    trainingHours: number;
  };
}

interface GovernanceMetrics {
  boardComposition: {
    independence: number; // %
    diversity: number; // %
    expertise: number; // sustainability expertise %
  };
  ethics: {
    trainingCompletion: number; // %
    violations: number;
    investigations: number;
    resolved: number; // %
  };
  transparency: {
    reportingScore: number; // 0-100
    stakeholderEngagement: number; // events/year
    publicDisclosures: number;
  };
  riskManagement: {
    climateRiskAssessment: boolean;
    scenario2C: boolean;
    scenario15C: boolean;
    tcfdCompliance: boolean;
  };
  cybersecurity: {
    incidents: number;
    resolved: number; // %
    investmentMNOK: number;
    certifications: string[];
  };
}

interface CarbonIntensityData {
  current: number; // kg CO2e/boe
  baseline: number; // kg CO2e/boe (2020)
  target2030: number; // kg CO2e/boe
  reduction: number; // % from baseline
  trajectory: {
    year: number;
    intensity: number;
    target: number;
  }[];
}

interface RenewableEnergyData {
  offshore: {
    wind: number; // MW installed
    floating: number; // MW planned
    projects: string[];
  };
  onshore: {
    wind: number; // MW
    solar: number; // MW
    hydro: number; // MW
  };
  electrification: {
    platforms: number; // platforms electrified
    percentage: number; // % of operations
    cableLength: number; // km
    co2Reduction: number; // tonnes CO2e/year
  };
  hydrogen: {
    production: number; // tonnes/year
    blue: number; // %
    green: number; // %
    projects: string[];
  };
}

interface ClimateGoalsData {
  netZero: {
    target: number; // year
    scope1and2: number; // year for scope 1&2
    scope3: number; // year for scope 3
    progress: number; // % towards target
  };
  parisAlignment: {
    scenario: '1.5C' | '2C' | 'below2C';
    aligned: boolean;
    lastAssessment: Date;
  };
  carbonBudget: {
    allocated: number; // tonnes CO2e
    used: number; // tonnes CO2e
    remaining: number; // tonnes CO2e
    percentage: number; // % used
  };
  natureSolutions: {
    investment: number; // MNOK
    projects: number;
    co2Sequestration: number; // tonnes CO2e/year
  };
}

interface SustainabilityTargets {
  sdgAlignment: {
    goals: number[]; // UN SDG numbers
    score: number; // 0-100
    progress: string[];
  };
  esgRating: {
    msci: string; // AAA, AA, A, BBB, BB, B, CCC
    sustainalytics: number; // 0-100
    cdp: string; // A, A-, B, B-, C, C-, D
    djsi: boolean; // Dow Jones Sustainability Index
  };
  certifications: {
    iso14001: boolean;
    iso45001: boolean;
    iso50001: boolean;
    ohsas18001: boolean;
  };
}

// Mock data for Norwegian petroleum ESG performance
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mockESGData: ESGMetrics[] = [
  {
    operatorId: 'EQN-001',
    operatorName: 'Equinor ASA',
    reportingPeriod: {
      year: 2024,
      quarter: 'Q1',
    },
    environmental: {
      emissions: {
        scope1: 8500000,
        scope2: 2100000,
        scope3: 385000000,
        total: 395600000,
        intensity: 8.2,
        flaring: 1200000,
        venting: 450000,
        fugitive: 650000,
      },
      energy: {
        consumption: 28500,
        renewable: 4800,
        renewablePercentage: 16.8,
        efficiency: 3.2,
      },
      water: {
        consumption: 185,
        recycled: 125,
        discharged: 45,
        quality: 'good',
      },
      waste: {
        generated: 145000,
        recycled: 98000,
        hazardous: 28000,
        recyclingRate: 67.6,
      },
      biodiversity: {
        protectedAreas: 850,
        restoration: 125,
        marineProtection: 2500,
        impactAssessments: 25,
      },
      spills: {
        number: 3,
        volume: 0.8,
        severity: 'low',
        recovered: 95,
      },
    },
    social: {
      workforce: {
        total: 20000,
        norwegian: 65,
        female: 38,
        indigenous: 8,
        contractors: 15000,
      },
      safety: {
        recordableInjuryRate: 1.2,
        lostTimeInjuryRate: 0.3,
        fatalities: 0,
        nearMisses: 1250,
        safetyScore: 92,
      },
      training: {
        hoursPerEmployee: 45,
        safetyTraining: 28,
        technicalTraining: 35,
        leadershipTraining: 12,
      },
      community: {
        investment: 285,
        localProcurement: 78,
        jobs: 12500,
        education: 125,
      },
      humanRights: {
        assessments: 15,
        grievances: 8,
        resolved: 87.5,
        trainingHours: 18500,
      },
    },
    governance: {
      boardComposition: {
        independence: 82,
        diversity: 45,
        expertise: 38,
      },
      ethics: {
        trainingCompletion: 98.5,
        violations: 12,
        investigations: 15,
        resolved: 93.3,
      },
      transparency: {
        reportingScore: 88,
        stakeholderEngagement: 45,
        publicDisclosures: 125,
      },
      riskManagement: {
        climateRiskAssessment: true,
        scenario2C: true,
        scenario15C: true,
        tcfdCompliance: true,
      },
      cybersecurity: {
        incidents: 28,
        resolved: 96.4,
        investmentMNOK: 485,
        certifications: ['ISO 27001', 'NIST', 'SOC 2'],
      },
    },
    carbonIntensity: {
      current: 8.2,
      baseline: 12.8,
      target2030: 5.5,
      reduction: 35.9,
      trajectory: [
        { year: 2020, intensity: 12.8, target: 12.8 },
        { year: 2021, intensity: 11.5, target: 11.8 },
        { year: 2022, intensity: 10.2, target: 10.8 },
        { year: 2023, intensity: 9.1, target: 9.8 },
        { year: 2024, intensity: 8.2, target: 8.8 },
      ],
    },
    renewableEnergy: {
      offshore: {
        wind: 2500,
        floating: 1500,
        projects: ['Hywind Tampen', 'Dogger Bank', 'Empire Wind'],
      },
      onshore: {
        wind: 850,
        solar: 285,
        hydro: 1250,
      },
      electrification: {
        platforms: 8,
        percentage: 35,
        cableLength: 185,
        co2Reduction: 850000,
      },
      hydrogen: {
        production: 125000,
        blue: 75,
        green: 25,
        projects: ['H2morrow', 'Hydrogen to Europe', 'NortH2'],
      },
    },
    climateGoals: {
      netZero: {
        target: 2050,
        scope1and2: 2030,
        scope3: 2050,
        progress: 35.9,
      },
      parisAlignment: {
        scenario: '1.5C',
        aligned: true,
        lastAssessment: new Date('2024-01-15'),
      },
      carbonBudget: {
        allocated: 2500000000,
        used: 395600000,
        remaining: 2104400000,
        percentage: 15.8,
      },
      natureSolutions: {
        investment: 850,
        projects: 12,
        co2Sequestration: 125000,
      },
    },
    sustainability: {
      sdgAlignment: {
        goals: [3, 4, 5, 6, 7, 8, 9, 12, 13, 14, 15, 16, 17],
        score: 78,
        progress: [
          'SDG 7: Affordable and Clean Energy - Leading offshore wind development',
          'SDG 13: Climate Action - 36% reduction in carbon intensity since 2020',
          'SDG 14: Life Below Water - Marine protection and restoration programs',
        ],
      },
      esgRating: {
        msci: 'AA',
        sustainalytics: 18.5,
        cdp: 'A-',
        djsi: true,
      },
      certifications: {
        iso14001: true,
        iso45001: true,
        iso50001: true,
        ohsas18001: true,
      },
    },
  },
];

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div role='tabpanel' hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export const ESGSustainabilityDashboard: React.FC = () => {
  const [selectedOperator] = useState<ESGMetrics>(mockESGData[0]);
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const getESGRatingColor = (
    rating: string
  ): 'success' | 'warning' | 'error' => {
    if (['AAA', 'AA', 'A'].includes(rating)) return 'success';
    if (['BBB', 'BB'].includes(rating)) return 'warning';
    return 'error';
  };

  const getCDPColor = (rating: string): 'success' | 'warning' | 'error' => {
    if (['A', 'A-'].includes(rating)) return 'success';
    if (['B', 'B-'].includes(rating)) return 'warning';
    return 'error';
  };

  const getWaterQualityColor = (
    quality: string
  ): 'success' | 'warning' | 'error' => {
    switch (quality) {
      case 'excellent':
        return 'success';
      case 'good':
        return 'success';
      case 'acceptable':
        return 'warning';
      case 'poor':
        return 'error';
      default:
        return 'warning';
    }
  };

  const getSpillSeverityColor = (
    severity: string
  ): 'success' | 'warning' | 'error' => {
    switch (severity) {
      case 'low':
        return 'success';
      case 'medium':
        return 'warning';
      case 'high':
        return 'error';
      default:
        return 'warning';
    }
  };

  return (
    <Container maxWidth='xl' sx={{ py: 4 }}>
      <Typography variant='h4' gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
        ESG Sustainability Dashboard
      </Typography>

      <Typography variant='subtitle1' sx={{ mb: 4, color: 'text.secondary' }}>
        Miljø, Sosial og Styring (ESG) overvåking for bærekraftig
        energiomstilling
      </Typography>

      {/* ESG Overview Cards */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' },
          gap: 3,
          mb: 4,
        }}
      >
        <EnvironmentalCard>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Nature sx={{ mr: 1 }} />
              <Typography variant='h6'>Karbon Intensitet</Typography>
            </Box>
            <Typography variant='h4' sx={{ fontWeight: 'bold', mb: 1 }}>
              {selectedOperator.carbonIntensity.current}
            </Typography>
            <Typography variant='body2' sx={{ opacity: 0.9 }}>
              kg CO₂e/foe
            </Typography>
            <LinearProgress
              variant='determinate'
              value={selectedOperator.carbonIntensity.reduction}
              sx={{ mt: 1, backgroundColor: 'rgba(255,255,255,0.3)' }}
            />
            <Typography variant='caption' sx={{ opacity: 0.9 }}>
              {selectedOperator.carbonIntensity.reduction}% reduksjon fra 2020
            </Typography>
          </CardContent>
        </EnvironmentalCard>

        <SocialCard>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Groups sx={{ mr: 1 }} />
              <Typography variant='h6'>Sikkerhet</Typography>
            </Box>
            <Typography variant='h4' sx={{ fontWeight: 'bold', mb: 1 }}>
              {selectedOperator.social.safety.safetyScore}
            </Typography>
            <Typography variant='body2' sx={{ opacity: 0.9 }}>
              sikkerhet score
            </Typography>
            <Typography variant='body2' sx={{ opacity: 0.9 }}>
              RIR: {selectedOperator.social.safety.recordableInjuryRate}
            </Typography>
          </CardContent>
        </SocialCard>

        <GovernanceCard>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Security sx={{ mr: 1 }} />
              <Typography variant='h6'>Styring</Typography>
            </Box>
            <Typography variant='h4' sx={{ fontWeight: 'bold', mb: 1 }}>
              {selectedOperator.governance.transparency.reportingScore}
            </Typography>
            <Typography variant='body2' sx={{ opacity: 0.9 }}>
              transparens score
            </Typography>
            <Typography variant='body2' sx={{ opacity: 0.9 }}>
              Styre uavhengighet:{' '}
              {selectedOperator.governance.boardComposition.independence}%
            </Typography>
          </CardContent>
        </GovernanceCard>

        <CarbonCard>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <EnergySavingsLeaf sx={{ mr: 1 }} />
              <Typography variant='h6'>Fornybar Energi</Typography>
            </Box>
            <Typography variant='h4' sx={{ fontWeight: 'bold', mb: 1 }}>
              {selectedOperator.environmental.energy.renewablePercentage}%
            </Typography>
            <Typography variant='body2' sx={{ opacity: 0.9 }}>
              av total energiforbruk
            </Typography>
            <Typography variant='body2' sx={{ opacity: 0.9 }}>
              {(selectedOperator.environmental.energy.renewable / 1000).toFixed(
                1
              )}{' '}
              GWh
            </Typography>
          </CardContent>
        </CarbonCard>
      </Box>

      {/* Operator Information */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 3,
            }}
          >
            <Box>
              <Typography variant='h5' sx={{ fontWeight: 'bold', mb: 1 }}>
                {selectedOperator.operatorName}
              </Typography>
              <Typography variant='body1' color='text.secondary'>
                Rapporteringsperiode: {selectedOperator.reportingPeriod.year}{' '}
                {selectedOperator.reportingPeriod.quarter}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Netto-null mål: {selectedOperator.climateGoals.netZero.target} •
                Paris-avtale:{' '}
                {selectedOperator.climateGoals.parisAlignment.scenario} • TCFD:{' '}
                {selectedOperator.governance.riskManagement.tcfdCompliance
                  ? 'Compliant'
                  : 'Non-compliant'}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column' }}>
              <Chip
                label={`MSCI: ${selectedOperator.sustainability.esgRating.msci}`}
                color={getESGRatingColor(
                  selectedOperator.sustainability.esgRating.msci
                )}
                size='small'
              />
              <Chip
                label={`CDP: ${selectedOperator.sustainability.esgRating.cdp}`}
                color={getCDPColor(
                  selectedOperator.sustainability.esgRating.cdp
                )}
                size='small'
              />
              {selectedOperator.sustainability.esgRating.djsi && (
                <Chip label='DJSI Member' color='success' size='small' />
              )}
            </Box>
          </Box>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' },
              gap: 3,
            }}
          >
            <Paper sx={{ p: 2 }}>
              <Typography variant='subtitle2' color='text.secondary'>
                Total Utslipp
              </Typography>
              <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                {(
                  selectedOperator.environmental.emissions.total / 1000000
                ).toFixed(1)}
                M
              </Typography>
              <Typography variant='caption'>tonnes CO₂e</Typography>
            </Paper>
            <Paper sx={{ p: 2 }}>
              <Typography variant='subtitle2' color='text.secondary'>
                Ansatte
              </Typography>
              <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                {selectedOperator.social.workforce.total.toLocaleString(
                  'nb-NO'
                )}
              </Typography>
              <Typography variant='caption'>
                {selectedOperator.social.workforce.female}% kvinner
              </Typography>
            </Paper>
            <Paper sx={{ p: 2 }}>
              <Typography variant='subtitle2' color='text.secondary'>
                Samfunnsinvestering
              </Typography>
              <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                {selectedOperator.social.community.investment} MNOK
              </Typography>
            </Paper>
            <Paper sx={{ p: 2 }}>
              <Typography variant='subtitle2' color='text.secondary'>
                SDG Score
              </Typography>
              <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                {selectedOperator.sustainability.sdgAlignment.score}/100
              </Typography>
            </Paper>
          </Box>
        </CardContent>
      </Card>

      {/* Detailed ESG Tabs */}
      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={handleTabChange}>
            <Tab label='Miljø (E)' icon={<Nature />} />
            <Tab label='Sosial (S)' icon={<Groups />} />
            <Tab label='Styring (G)' icon={<Security />} />
            <Tab label='Klimamål' icon={<TrendingDown />} />
          </Tabs>
        </Box>

        <TabPanel value={activeTab} index={0}>
          <Typography variant='h6' gutterBottom>
            Miljøprestasjon
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
              gap: 3,
              mb: 3,
            }}
          >
            <Card>
              <CardContent>
                <Typography variant='h6' gutterBottom>
                  <Co2 sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Karbon Utslipp
                </Typography>
                <TableContainer>
                  <Table size='small'>
                    <TableBody>
                      <TableRow>
                        <TableCell>Scope 1 (Direkte)</TableCell>
                        <TableCell align='right'>
                          {(
                            selectedOperator.environmental.emissions.scope1 /
                            1000000
                          ).toFixed(1)}{' '}
                          Mt
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Scope 2 (Indirekte)</TableCell>
                        <TableCell align='right'>
                          {(
                            selectedOperator.environmental.emissions.scope2 /
                            1000000
                          ).toFixed(1)}{' '}
                          Mt
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Scope 3 (Verdikjede)</TableCell>
                        <TableCell align='right'>
                          {(
                            selectedOperator.environmental.emissions.scope3 /
                            1000000
                          ).toFixed(0)}{' '}
                          Mt
                        </TableCell>
                      </TableRow>
                      <TableRow sx={{ backgroundColor: 'primary.light' }}>
                        <TableCell sx={{ fontWeight: 'bold' }}>Total</TableCell>
                        <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                          {(
                            selectedOperator.environmental.emissions.total /
                            1000000
                          ).toFixed(0)}{' '}
                          Mt
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>

                <Typography variant='subtitle2' sx={{ mt: 2, mb: 1 }}>
                  Utslippskilder
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Chip
                    label={`Fakkling: ${(selectedOperator.environmental.emissions.flaring / 1000000).toFixed(1)}Mt`}
                    size='small'
                  />
                  <Chip
                    label={`Venting: ${(selectedOperator.environmental.emissions.venting / 1000000).toFixed(1)}Mt`}
                    size='small'
                  />
                  <Chip
                    label={`Lekkasje: ${(selectedOperator.environmental.emissions.fugitive / 1000000).toFixed(1)}Mt`}
                    size='small'
                  />
                </Box>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant='h6' gutterBottom>
                  <WaterDrop sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Vannforvalting
                </Typography>
                <TableContainer>
                  <Table size='small'>
                    <TableBody>
                      <TableRow>
                        <TableCell>Forbruk</TableCell>
                        <TableCell align='right'>
                          {selectedOperator.environmental.water.consumption} Mm³
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Resirkulert</TableCell>
                        <TableCell align='right'>
                          {selectedOperator.environmental.water.recycled} Mm³
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Utslipp</TableCell>
                        <TableCell align='right'>
                          {selectedOperator.environmental.water.discharged} Mm³
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Kvalitet</TableCell>
                        <TableCell align='right'>
                          <Chip
                            label={selectedOperator.environmental.water.quality}
                            color={getWaterQualityColor(
                              selectedOperator.environmental.water.quality
                            )}
                            size='small'
                          />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>

                <Alert severity='info' sx={{ mt: 2 }}>
                  <Typography variant='body2'>
                    Resirkuleringsgrad:{' '}
                    {(
                      (selectedOperator.environmental.water.recycled /
                        selectedOperator.environmental.water.consumption) *
                      100
                    ).toFixed(1)}
                    %
                  </Typography>
                </Alert>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant='h6' gutterBottom>
                  <RecyclingRounded sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Avfallshåndtering
                </Typography>
                <TableContainer>
                  <Table size='small'>
                    <TableBody>
                      <TableRow>
                        <TableCell>Generert</TableCell>
                        <TableCell align='right'>
                          {selectedOperator.environmental.waste.generated.toLocaleString(
                            'nb-NO'
                          )}{' '}
                          t
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Resirkulert</TableCell>
                        <TableCell align='right'>
                          {selectedOperator.environmental.waste.recycled.toLocaleString(
                            'nb-NO'
                          )}{' '}
                          t
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Farlig avfall</TableCell>
                        <TableCell align='right'>
                          {selectedOperator.environmental.waste.hazardous.toLocaleString(
                            'nb-NO'
                          )}{' '}
                          t
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Resirkuleringsgrad</TableCell>
                        <TableCell align='right'>
                          {selectedOperator.environmental.waste.recyclingRate}%
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>

                <Box sx={{ mt: 2 }}>
                  <Typography variant='body2' sx={{ mb: 1 }}>
                    Resirkulering fremgang
                  </Typography>
                  <LinearProgress
                    variant='determinate'
                    value={selectedOperator.environmental.waste.recyclingRate}
                    color='success'
                  />
                </Box>
              </CardContent>
            </Card>
          </Box>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
              gap: 3,
            }}
          >
            <Card>
              <CardContent>
                <Typography variant='h6' gutterBottom>
                  Biologisk Mangfold
                </Typography>
                <TableContainer>
                  <Table size='small'>
                    <TableBody>
                      <TableRow>
                        <TableCell>Beskyttede områder</TableCell>
                        <TableCell align='right'>
                          {
                            selectedOperator.environmental.biodiversity
                              .protectedAreas
                          }{' '}
                          km²
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Restaurering</TableCell>
                        <TableCell align='right'>
                          {
                            selectedOperator.environmental.biodiversity
                              .restoration
                          }{' '}
                          km²
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Marin beskyttelse</TableCell>
                        <TableCell align='right'>
                          {
                            selectedOperator.environmental.biodiversity
                              .marineProtection
                          }{' '}
                          km²
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Konsekvensutredninger</TableCell>
                        <TableCell align='right'>
                          {
                            selectedOperator.environmental.biodiversity
                              .impactAssessments
                          }
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant='h6' gutterBottom>
                  Utslipp til Sjø
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography variant='h4' sx={{ fontWeight: 'bold', mr: 2 }}>
                    {selectedOperator.environmental.spills.number}
                  </Typography>
                  <Chip
                    label={selectedOperator.environmental.spills.severity}
                    color={getSpillSeverityColor(
                      selectedOperator.environmental.spills.severity
                    )}
                    size='small'
                  />
                </Box>

                <TableContainer>
                  <Table size='small'>
                    <TableBody>
                      <TableRow>
                        <TableCell>Volum</TableCell>
                        <TableCell align='right'>
                          {selectedOperator.environmental.spills.volume} m³
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Gjenvunnet</TableCell>
                        <TableCell align='right'>
                          {selectedOperator.environmental.spills.recovered}%
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>

                {selectedOperator.environmental.spills.number === 0 ? (
                  <Alert severity='success' sx={{ mt: 2 }}>
                    <Typography variant='body2'>
                      Ingen betydelige utslipp rapportert denne perioden
                    </Typography>
                  </Alert>
                ) : (
                  <Alert severity='warning' sx={{ mt: 2 }}>
                    <Typography variant='body2'>
                      {selectedOperator.environmental.spills.recovered}%
                      gjenvunnet av utslippet
                    </Typography>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </Box>
        </TabPanel>

        <TabPanel value={activeTab} index={1}>
          <Typography variant='h6' gutterBottom>
            Sosial Prestasjon
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
              gap: 3,
              mb: 3,
            }}
          >
            <Card>
              <CardContent>
                <Typography variant='h6' gutterBottom>
                  Arbeidsstyrke Profil
                </Typography>
                <TableContainer>
                  <Table size='small'>
                    <TableBody>
                      <TableRow>
                        <TableCell>Total ansatte</TableCell>
                        <TableCell align='right'>
                          {selectedOperator.social.workforce.total.toLocaleString(
                            'nb-NO'
                          )}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Norske ansatte</TableCell>
                        <TableCell align='right'>
                          {selectedOperator.social.workforce.norwegian}%
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Kvinner</TableCell>
                        <TableCell align='right'>
                          {selectedOperator.social.workforce.female}%
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Urbefolkning</TableCell>
                        <TableCell align='right'>
                          {selectedOperator.social.workforce.indigenous}%
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Kontraktører</TableCell>
                        <TableCell align='right'>
                          {selectedOperator.social.workforce.contractors.toLocaleString(
                            'nb-NO'
                          )}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>

                <Box sx={{ mt: 2 }}>
                  <Typography variant='body2' sx={{ mb: 1 }}>
                    Kjønnsmangfold
                  </Typography>
                  <LinearProgress
                    variant='determinate'
                    value={selectedOperator.social.workforce.female}
                    color='primary'
                  />
                  <Typography variant='caption'>Mål: 40% innen 2030</Typography>
                </Box>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant='h6' gutterBottom>
                  Sikkerhetsprestasjon
                </Typography>
                <TableContainer>
                  <Table size='small'>
                    <TableBody>
                      <TableRow>
                        <TableCell>RIR (Registrerbare skader)</TableCell>
                        <TableCell align='right'>
                          {selectedOperator.social.safety.recordableInjuryRate}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>LTIR (Tapt tid skader)</TableCell>
                        <TableCell align='right'>
                          {selectedOperator.social.safety.lostTimeInjuryRate}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Dødsfall</TableCell>
                        <TableCell align='right'>
                          {selectedOperator.social.safety.fatalities}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Nesten-ulykker</TableCell>
                        <TableCell align='right'>
                          {selectedOperator.social.safety.nearMisses.toLocaleString(
                            'nb-NO'
                          )}
                        </TableCell>
                      </TableRow>
                      <TableRow sx={{ backgroundColor: 'success.light' }}>
                        <TableCell sx={{ fontWeight: 'bold' }}>
                          Sikkerhet Score
                        </TableCell>
                        <TableCell align='right' sx={{ fontWeight: 'bold' }}>
                          {selectedOperator.social.safety.safetyScore}/100
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>

                <Alert
                  severity={
                    selectedOperator.social.safety.fatalities === 0
                      ? 'success'
                      : 'error'
                  }
                  sx={{ mt: 2 }}
                >
                  <Typography variant='body2'>
                    {selectedOperator.social.safety.fatalities === 0
                      ? 'Null dødsfall denne perioden - Utmerket sikkerhetsprerasjon'
                      : `${selectedOperator.social.safety.fatalities} dødsfall rapportert`}
                  </Typography>
                </Alert>
              </CardContent>
            </Card>
          </Box>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
              gap: 3,
            }}
          >
            <Card>
              <CardContent>
                <Typography variant='h6' gutterBottom>
                  Opplæring og Utvikling
                </Typography>
                <TableContainer>
                  <Table size='small'>
                    <TableBody>
                      <TableRow>
                        <TableCell>Timer per ansatt</TableCell>
                        <TableCell align='right'>
                          {selectedOperator.social.training.hoursPerEmployee}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Sikkerhetsopplæring</TableCell>
                        <TableCell align='right'>
                          {selectedOperator.social.training.safetyTraining}{' '}
                          timer
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Teknisk opplæring</TableCell>
                        <TableCell align='right'>
                          {selectedOperator.social.training.technicalTraining}{' '}
                          timer
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Lederopplæring</TableCell>
                        <TableCell align='right'>
                          {selectedOperator.social.training.leadershipTraining}{' '}
                          timer
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant='h6' gutterBottom>
                  Samfunnsengasjement
                </Typography>
                <TableContainer>
                  <Table size='small'>
                    <TableBody>
                      <TableRow>
                        <TableCell>Investering</TableCell>
                        <TableCell align='right'>
                          {selectedOperator.social.community.investment} MNOK
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Lokal innkjøp</TableCell>
                        <TableCell align='right'>
                          {selectedOperator.social.community.localProcurement}%
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Lokale arbeidsplasser</TableCell>
                        <TableCell align='right'>
                          {selectedOperator.social.community.jobs.toLocaleString(
                            'nb-NO'
                          )}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Utdanningsprogrammer</TableCell>
                        <TableCell align='right'>
                          {selectedOperator.social.community.education} MNOK
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Box>
        </TabPanel>

        <TabPanel value={activeTab} index={2}>
          <Typography variant='h6' gutterBottom>
            Styring og Ledelse
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
              gap: 3,
              mb: 3,
            }}
          >
            <Card>
              <CardContent>
                <Typography variant='h6' gutterBottom>
                  Styre Sammensetning
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      mb: 1,
                    }}
                  >
                    <Typography variant='body2'>Uavhengighet</Typography>
                    <Typography variant='body2'>
                      {
                        selectedOperator.governance.boardComposition
                          .independence
                      }
                      %
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant='determinate'
                    value={
                      selectedOperator.governance.boardComposition.independence
                    }
                    color='primary'
                  />
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      mb: 1,
                    }}
                  >
                    <Typography variant='body2'>Mangfold</Typography>
                    <Typography variant='body2'>
                      {selectedOperator.governance.boardComposition.diversity}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant='determinate'
                    value={
                      selectedOperator.governance.boardComposition.diversity
                    }
                    color='secondary'
                  />
                </Box>

                <Box>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      mb: 1,
                    }}
                  >
                    <Typography variant='body2'>
                      Bærekraft Ekspertise
                    </Typography>
                    <Typography variant='body2'>
                      {selectedOperator.governance.boardComposition.expertise}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant='determinate'
                    value={
                      selectedOperator.governance.boardComposition.expertise
                    }
                    color='success'
                  />
                </Box>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant='h6' gutterBottom>
                  Etikk og Integritet
                </Typography>
                <TableContainer>
                  <Table size='small'>
                    <TableBody>
                      <TableRow>
                        <TableCell>Opplæring fullført</TableCell>
                        <TableCell align='right'>
                          {
                            selectedOperator.governance.ethics
                              .trainingCompletion
                          }
                          %
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Brudd rapportert</TableCell>
                        <TableCell align='right'>
                          {selectedOperator.governance.ethics.violations}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Undersøkelser</TableCell>
                        <TableCell align='right'>
                          {selectedOperator.governance.ethics.investigations}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Løst</TableCell>
                        <TableCell align='right'>
                          {selectedOperator.governance.ethics.resolved}%
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>

                <Alert severity='success' sx={{ mt: 2 }}>
                  <Typography variant='body2'>
                    Høy etikk-score med{' '}
                    {selectedOperator.governance.ethics.trainingCompletion}%
                    opplæring fullført
                  </Typography>
                </Alert>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant='h6' gutterBottom>
                  Cybersikkerhet
                </Typography>
                <TableContainer>
                  <Table size='small'>
                    <TableBody>
                      <TableRow>
                        <TableCell>Sikkerhetshendelser</TableCell>
                        <TableCell align='right'>
                          {selectedOperator.governance.cybersecurity.incidents}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Løst</TableCell>
                        <TableCell align='right'>
                          {selectedOperator.governance.cybersecurity.resolved}%
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Investering</TableCell>
                        <TableCell align='right'>
                          {
                            selectedOperator.governance.cybersecurity
                              .investmentMNOK
                          }{' '}
                          MNOK
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>

                <Typography variant='subtitle2' sx={{ mt: 2, mb: 1 }}>
                  Sertifiseringer
                </Typography>
                <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                  {selectedOperator.governance.cybersecurity.certifications.map(
                    (cert, index) => (
                      <Chip
                        key={index}
                        label={cert}
                        color='primary'
                        size='small'
                      />
                    )
                  )}
                </Box>
              </CardContent>
            </Card>
          </Box>

          <Card>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                Risikostyring og Transparens
              </Typography>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                  gap: 3,
                }}
              >
                <Box>
                  <Typography variant='subtitle2' gutterBottom>
                    Klimarisiko Vurdering
                  </Typography>
                  <Box
                    sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}
                  >
                    <Chip
                      label='Klimarisiko'
                      color={
                        selectedOperator.governance.riskManagement
                          .climateRiskAssessment
                          ? 'success'
                          : 'error'
                      }
                      icon={
                        selectedOperator.governance.riskManagement
                          .climateRiskAssessment ? (
                          <CheckCircle />
                        ) : (
                          <Warning />
                        )
                      }
                      size='small'
                    />
                    <Chip
                      label='2°C Scenario'
                      color={
                        selectedOperator.governance.riskManagement.scenario2C
                          ? 'success'
                          : 'error'
                      }
                      size='small'
                    />
                    <Chip
                      label='1.5°C Scenario'
                      color={
                        selectedOperator.governance.riskManagement.scenario15C
                          ? 'success'
                          : 'error'
                      }
                      size='small'
                    />
                    <Chip
                      label='TCFD'
                      color={
                        selectedOperator.governance.riskManagement
                          .tcfdCompliance
                          ? 'success'
                          : 'error'
                      }
                      size='small'
                    />
                  </Box>
                </Box>

                <Box>
                  <Typography variant='subtitle2' gutterBottom>
                    Transparens Metrics
                  </Typography>
                  <TableContainer>
                    <Table size='small'>
                      <TableBody>
                        <TableRow>
                          <TableCell>Rapportering Score</TableCell>
                          <TableCell align='right'>
                            {
                              selectedOperator.governance.transparency
                                .reportingScore
                            }
                            /100
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Interessent Møter</TableCell>
                          <TableCell align='right'>
                            {
                              selectedOperator.governance.transparency
                                .stakeholderEngagement
                            }
                            /år
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Offentlige Rapporter</TableCell>
                          <TableCell align='right'>
                            {
                              selectedOperator.governance.transparency
                                .publicDisclosures
                            }
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </TabPanel>

        <TabPanel value={activeTab} index={3}>
          <Typography variant='h6' gutterBottom>
            Klimamål og Energiomstilling
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
              gap: 3,
              mb: 3,
            }}
          >
            <Card>
              <CardContent>
                <Typography variant='h6' gutterBottom>
                  Netto-null Progresjon
                </Typography>
                <Box sx={{ mb: 3 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      mb: 1,
                    }}
                  >
                    <Typography variant='body2'>
                      Progresjon mot{' '}
                      {selectedOperator.climateGoals.netZero.target}
                    </Typography>
                    <Typography variant='body2'>
                      {selectedOperator.climateGoals.netZero.progress}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant='determinate'
                    value={selectedOperator.climateGoals.netZero.progress}
                    color='success'
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>

                <TableContainer>
                  <Table size='small'>
                    <TableBody>
                      <TableRow>
                        <TableCell>Scope 1 & 2 mål</TableCell>
                        <TableCell align='right'>
                          {selectedOperator.climateGoals.netZero.scope1and2}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Scope 3 mål</TableCell>
                        <TableCell align='right'>
                          {selectedOperator.climateGoals.netZero.scope3}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Paris-avtal</TableCell>
                        <TableCell align='right'>
                          <Chip
                            label={
                              selectedOperator.climateGoals.parisAlignment
                                .scenario
                            }
                            color={
                              selectedOperator.climateGoals.parisAlignment
                                .aligned
                                ? 'success'
                                : 'error'
                            }
                            size='small'
                          />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant='h6' gutterBottom>
                  Fornybar Energi Investeringer
                </Typography>
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: 2,
                    mb: 2,
                  }}
                >
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <WindPower
                      sx={{ fontSize: 40, color: 'primary.main', mb: 1 }}
                    />
                    <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                      {selectedOperator.renewableEnergy.offshore.wind}
                    </Typography>
                    <Typography variant='caption'>MW Offshore Vind</Typography>
                  </Paper>

                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <WbSunny
                      sx={{ fontSize: 40, color: 'warning.main', mb: 1 }}
                    />
                    <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                      {selectedOperator.renewableEnergy.hydrogen.production /
                        1000}
                      K
                    </Typography>
                    <Typography variant='caption'>tonn Hydrogen/år</Typography>
                  </Paper>
                </Box>

                <Typography variant='subtitle2' gutterBottom>
                  Større Prosjekter
                </Typography>
                <Box
                  sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 2 }}
                >
                  {selectedOperator.renewableEnergy.offshore.projects.map(
                    (project, index) => (
                      <Chip
                        key={index}
                        label={project}
                        color='primary'
                        size='small'
                      />
                    )
                  )}
                </Box>

                <Alert severity='info'>
                  <Typography variant='body2'>
                    Elektrifisering av{' '}
                    {selectedOperator.renewableEnergy.electrification.platforms}{' '}
                    plattformer reduserer utslipp med{' '}
                    {(
                      selectedOperator.renewableEnergy.electrification
                        .co2Reduction / 1000
                    ).toFixed(0)}
                    k tonn CO₂e/år
                  </Typography>
                </Alert>
              </CardContent>
            </Card>
          </Box>

          <Card>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                Karbon Budsjett og Naturbaserte Løsninger
              </Typography>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                  gap: 3,
                }}
              >
                <Box>
                  <Typography variant='subtitle2' gutterBottom>
                    Karbon Budsjett Status
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mb: 1,
                      }}
                    >
                      <Typography variant='body2'>Forbrukt</Typography>
                      <Typography variant='body2'>
                        {selectedOperator.climateGoals.carbonBudget.percentage}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant='determinate'
                      value={
                        selectedOperator.climateGoals.carbonBudget.percentage
                      }
                      color={
                        selectedOperator.climateGoals.carbonBudget.percentage <
                        50
                          ? 'success'
                          : 'warning'
                      }
                    />
                  </Box>

                  <TableContainer>
                    <Table size='small'>
                      <TableBody>
                        <TableRow>
                          <TableCell>Tildelt</TableCell>
                          <TableCell align='right'>
                            {(
                              selectedOperator.climateGoals.carbonBudget
                                .allocated / 1000000000
                            ).toFixed(1)}{' '}
                            Gt
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Brukt</TableCell>
                          <TableCell align='right'>
                            {(
                              selectedOperator.climateGoals.carbonBudget.used /
                              1000000
                            ).toFixed(0)}{' '}
                            Mt
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Gjenværende</TableCell>
                          <TableCell align='right'>
                            {(
                              selectedOperator.climateGoals.carbonBudget
                                .remaining / 1000000000
                            ).toFixed(1)}{' '}
                            Gt
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>

                <Box>
                  <Typography variant='subtitle2' gutterBottom>
                    Naturbaserte Løsninger
                  </Typography>
                  <TableContainer>
                    <Table size='small'>
                      <TableBody>
                        <TableRow>
                          <TableCell>Investering</TableCell>
                          <TableCell align='right'>
                            {
                              selectedOperator.climateGoals.natureSolutions
                                .investment
                            }{' '}
                            MNOK
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Prosjekter</TableCell>
                          <TableCell align='right'>
                            {
                              selectedOperator.climateGoals.natureSolutions
                                .projects
                            }
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>CO₂ Lagring</TableCell>
                          <TableCell align='right'>
                            {(
                              selectedOperator.climateGoals.natureSolutions
                                .co2Sequestration / 1000
                            ).toFixed(0)}
                            k t/år
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>

                  <Alert severity='success' sx={{ mt: 2 }}>
                    <Typography variant='body2'>
                      Naturbaserte løsninger bidrar til{' '}
                      {(
                        selectedOperator.climateGoals.natureSolutions
                          .co2Sequestration / 1000
                      ).toFixed(0)}
                      k tonn CO₂ lagring per år
                    </Typography>
                  </Alert>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </TabPanel>
      </Card>
    </Container>
  );
};

export default ESGSustainabilityDashboard;
