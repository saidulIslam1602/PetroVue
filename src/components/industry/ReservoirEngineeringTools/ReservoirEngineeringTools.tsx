/**
 * Reservoir Engineering Tools
 * Advanced reservoir analysis for Norwegian Continental Shelf fields
 * Demonstrates expertise in reservoir engineering and production optimization
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
  TableHead,
  TableRow,
  Paper,
  Tabs,
  Tab
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  TrendingDown,
  BarChart,
  Calculate,
  Assessment,
  Speed,
  LocalGasStation,
  TrendingUp
} from '@mui/icons-material';

// Styled components
const ReservoirCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, #166534 0%, #22c55e 100%)',
  color: 'white',
}));

const ProductionCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
  color: 'white',
}));

const RecoveryCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, #7c2d12 0%, #ea580c 100%)',
  color: 'white',
}));

const EconomicsCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
  color: 'white',
}));

// Interfaces for reservoir engineering data
interface ReservoirField {
  fieldId: string;
  fieldName: string;
  operator: string;
  location: {
    block: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
    waterDepth: number;
  };
  reservoirData: ReservoirProperties;
  productionHistory: ProductionData[];
  wells: WellData[];
  economics: EconomicsData;
  materialBalance: MaterialBalanceData;
  declineCurve: DeclineCurveData;
  recoveryFactor: RecoveryFactorData;
}

interface ReservoirProperties {
  formation: string;
  age: string;
  depth: {
    top: number; // m TVDSS
    bottom: number; // m TVDSS
    gross: number; // m
    net: number; // m
  };
  petrophysics: {
    porosity: number; // %
    permeability: number; // mD
    saturation: {
      oil: number; // %
      water: number; // %
      gas: number; // %
    };
    netToGross: number; // %
  };
  fluidProperties: {
    oilGravity: number; // API
    gasGravity: number; // specific gravity
    bubblePointPressure: number; // bar
    solutionGor: number; // Sm³/m³
    formationVolumeFactorOil: number; // rm³/Sm³
    formationVolumeFactorGas: number; // rm³/Sm³
  };
  pressureData: {
    initial: number; // bar
    current: number; // bar
    bubblePoint: number; // bar
    dewPoint: number; // bar
  };
  temperature: number; // °C
  area: number; // km²
  volume: {
    bulk: number; // million m³
    pore: number; // million m³
    hydrocarbon: number; // million m³
  };
}

interface ProductionData {
  date: Date;
  oil: number; // m³/day
  gas: number; // Sm³/day
  water: number; // m³/day
  waterCut: number; // %
  gor: number; // Sm³/m³
  pressure: number; // bar
  activeWells: number;
}

interface WellData {
  wellName: string;
  wellType: 'producer' | 'injector' | 'observation';
  spudDate: Date;
  onStreamDate: Date;
  status: 'active' | 'shut-in' | 'suspended' | 'abandoned';
  completion: {
    type: 'cased-hole' | 'open-hole' | 'gravel-pack' | 'frac-pack';
    perforations: number;
    skinFactor: number;
  };
  currentProduction: {
    oil: number; // m³/day
    gas: number; // Sm³/day
    water: number; // m³/day
    waterCut: number; // %
  };
  cumulativeProduction: {
    oil: number; // million m³
    gas: number; // billion Sm³
    water: number; // million m³
  };
}

interface EconomicsData {
  reserves: {
    proved: number; // million m³ oil equivalent
    probable: number;
    possible: number;
    contingent: number;
    prospective: number;
  };
  production: {
    peak: number; // m³/day
    current: number; // m³/day
    cumulative: number; // million m³
    remaining: number; // million m³
  };
  economics: {
    opex: number; // NOK/m³
    capex: number; // million NOK
    breakeven: number; // NOK/m³
    npv: number; // million NOK
    irr: number; // %
  };
}

interface MaterialBalanceData {
  drive: 'solution-gas' | 'gas-cap' | 'water' | 'combination';
  pressure: number[]; // bar
  production: number[]; // million m³
  recovery: number[]; // %
  currentRecovery: number; // %
  ultimateRecovery: number; // %
}

interface DeclineCurveData {
  type: 'exponential' | 'hyperbolic' | 'harmonic';
  initialRate: number; // m³/day
  declineRate: number; // %/year
  b: number; // hyperbolic exponent
  forecast: {
    date: Date[];
    rate: number[]; // m³/day
    cumulative: number[]; // million m³
  };
  eur: number; // million m³ - Estimated Ultimate Recovery
}

interface RecoveryFactorData {
  primary: number; // %
  secondary: number; // %
  tertiary: number; // %
  total: number; // %
  waterflood: {
    efficiency: number; // %
    coverage: number; // %
    mobility: number;
  };
  eor: {
    method: string;
    potential: number; // %
    implemented: boolean;
  };
}

// Mock data for Norwegian Continental Shelf reservoirs
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mockReservoirData: ReservoirField[] = [
  {
    fieldId: 'NCS-JOH-SVR',
    fieldName: 'Johan Sverdrup',
    operator: 'Equinor ASA',
    location: {
      block: '16/2, 16/3',
      coordinates: {
        latitude: 58.8756,
        longitude: 2.0598
      },
      waterDepth: 110
    },
    reservoirData: {
      formation: 'Statfjord Formation',
      age: 'Late Triassic',
      depth: {
        top: 1900,
        bottom: 2100,
        gross: 200,
        net: 160
      },
      petrophysics: {
        porosity: 22,
        permeability: 850,
        saturation: {
          oil: 75,
          water: 25,
          gas: 0
        },
        netToGross: 80
      },
      fluidProperties: {
        oilGravity: 34.2,
        gasGravity: 0.78,
        bubblePointPressure: 185,
        solutionGor: 95,
        formationVolumeFactorOil: 1.28,
        formationVolumeFactorGas: 1.15
      },
      pressureData: {
        initial: 195,
        current: 188,
        bubblePoint: 185,
        dewPoint: 0
      },
      temperature: 78,
      area: 190,
      volume: {
        bulk: 4750,
        pore: 1045,
        hydrocarbon: 784
      }
    },
    productionHistory: [
      {
        date: new Date('2019-10-01'),
        oil: 85000,
        gas: 8500000,
        water: 12000,
        waterCut: 12.4,
        gor: 100,
        pressure: 195,
        activeWells: 8
      },
      {
        date: new Date('2020-12-31'),
        oil: 220000,
        gas: 22000000,
        water: 28000,
        waterCut: 11.3,
        gor: 100,
        pressure: 192,
        activeWells: 18
      },
      {
        date: new Date('2021-12-31'),
        oil: 385000,
        gas: 38500000,
        water: 45000,
        waterCut: 10.5,
        gor: 100,
        pressure: 190,
        activeWells: 28
      },
      {
        date: new Date('2022-12-31'),
        oil: 485000,
        gas: 48500000,
        water: 58000,
        waterCut: 10.7,
        gor: 100,
        pressure: 189,
        activeWells: 34
      },
      {
        date: new Date('2023-12-31'),
        oil: 520000,
        gas: 52000000,
        water: 65000,
        waterCut: 11.1,
        gor: 100,
        pressure: 188,
        activeWells: 38
      }
    ],
    wells: [
      {
        wellName: 'A-12H',
        wellType: 'producer',
        spudDate: new Date('2019-02-15'),
        onStreamDate: new Date('2019-10-01'),
        status: 'active',
        completion: {
          type: 'cased-hole',
          perforations: 2850,
          skinFactor: -3.2
        },
        currentProduction: {
          oil: 18500,
          gas: 1850000,
          water: 2200,
          waterCut: 10.6
        },
        cumulativeProduction: {
          oil: 28.5,
          gas: 2.85,
          water: 3.2
        }
      }
    ],
    economics: {
      reserves: {
        proved: 2900,
        probable: 3850,
        possible: 4200,
        contingent: 450,
        prospective: 680
      },
      production: {
        peak: 720000,
        current: 520000,
        cumulative: 485,
        remaining: 2415
      },
      economics: {
        opex: 45,
        capex: 205000,
        breakeven: 25,
        npv: 820000,
        irr: 18.5
      }
    },
    materialBalance: {
      drive: 'water',
      pressure: [195, 192, 190, 189, 188],
      production: [0, 80, 220, 350, 485],
      recovery: [0, 2.8, 7.6, 12.1, 16.7],
      currentRecovery: 16.7,
      ultimateRecovery: 55
    },
    declineCurve: {
      type: 'exponential',
      initialRate: 720000,
      declineRate: 8.5,
      b: 1.0,
      forecast: {
        date: [
          new Date('2024-01-01'),
          new Date('2025-01-01'),
          new Date('2026-01-01'),
          new Date('2027-01-01'),
          new Date('2028-01-01')
        ],
        rate: [680000, 620000, 565000, 515000, 470000],
        cumulative: [735, 1000, 1285, 1590, 1915]
      },
      eur: 2900
    },
    recoveryFactor: {
      primary: 25,
      secondary: 25,
      tertiary: 5,
      total: 55,
      waterflood: {
        efficiency: 68,
        coverage: 85,
        mobility: 0.45
      },
      eor: {
        method: 'Water alternating gas (WAG)',
        potential: 8,
        implemented: false
      }
    }
  }
];

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export const ReservoirEngineeringTools: React.FC = () => {
  const [selectedField] = useState<ReservoirField>(mockReservoirData[0]);
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const calculateRemainingReserves = (field: ReservoirField): number => {
    return field.economics.reserves.proved - field.economics.production.cumulative;
  };

  const calculateProductionIndex = (field: ReservoirField): number => {
    const currentRate = field.economics.production.current;
    const pressure = field.reservoirData.pressureData.current;
    const bubblePoint = field.reservoirData.pressureData.bubblePoint;
    return currentRate / (pressure - bubblePoint);
  };

  const getDriveColor = (drive: string): 'primary' | 'secondary' | 'success' | 'warning' => {
    switch (drive) {
      case 'water': return 'primary';
      case 'gas-cap': return 'warning';
      case 'solution-gas': return 'secondary';
      case 'combination': return 'success';
      default: return 'primary';
    }
  };

  const getRecoveryFactorColor = (rf: number): 'success' | 'warning' | 'error' => {
    if (rf >= 45) return 'success';
    if (rf >= 30) return 'warning';
    return 'error';
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
        Reservoir Engineering Tools
      </Typography>
      
      <Typography variant="subtitle1" sx={{ mb: 4, color: 'text.secondary' }}>
        Avansert reservoarteknikk analyse for norsk kontinentalsokkel
      </Typography>

      {/* Key Metrics Cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' }, gap: 3, mb: 4 }}>
        <ReservoirCard>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <LocalGasStation sx={{ mr: 1 }} />
              <Typography variant="h6">
                Gjenværende Reserver
              </Typography>
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
              {calculateRemainingReserves(selectedField).toLocaleString('nb-NO')}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              million m³ olje ekvivalent
            </Typography>
          </CardContent>
        </ReservoirCard>

        <ProductionCard>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Speed sx={{ mr: 1 }} />
              <Typography variant="h6">
                Nåværende Produksjon
              </Typography>
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
              {(selectedField.economics.production.current / 1000).toFixed(0)}K
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              m³/dag
            </Typography>
            <LinearProgress 
              variant="determinate" 
              value={(selectedField.economics.production.current / selectedField.economics.production.peak) * 100}
              sx={{ mt: 1, backgroundColor: 'rgba(255,255,255,0.3)' }}
            />
          </CardContent>
        </ProductionCard>

        <RecoveryCard>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Assessment sx={{ mr: 1 }} />
              <Typography variant="h6">
                Utvinningsgrad
              </Typography>
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
              {selectedField.materialBalance.currentRecovery}%
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              av {selectedField.materialBalance.ultimateRecovery}% forventet
            </Typography>
            <LinearProgress 
              variant="determinate" 
              value={(selectedField.materialBalance.currentRecovery / selectedField.materialBalance.ultimateRecovery) * 100}
              sx={{ mt: 1, backgroundColor: 'rgba(255,255,255,0.3)' }}
            />
          </CardContent>
        </RecoveryCard>

        <EconomicsCard>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <TrendingUp sx={{ mr: 1 }} />
              <Typography variant="h6">
                NPV
              </Typography>
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
              {(selectedField.economics.economics.npv / 1000).toFixed(0)}B
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              NOK (IRR: {selectedField.economics.economics.irr}%)
            </Typography>
          </CardContent>
        </EconomicsCard>
      </Box>

      {/* Field Information */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                {selectedField.fieldName}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Operatør: {selectedField.operator} • Blokk: {selectedField.location.block} • 
                Formasjon: {selectedField.reservoirData.formation}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Vanndyp: {selectedField.location.waterDepth} m • 
                Reservoar dyp: {selectedField.reservoirData.depth.top}-{selectedField.reservoirData.depth.bottom} m TVDSS •
                Temperatur: {selectedField.reservoirData.temperature}°C
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Chip 
                label={selectedField.materialBalance.drive}
                color={getDriveColor(selectedField.materialBalance.drive)}
                size="small"
              />
              <Chip 
                label={`RF: ${selectedField.recoveryFactor.total}%`}
                color={getRecoveryFactorColor(selectedField.recoveryFactor.total)}
                size="small"
              />
            </Box>
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' }, gap: 3 }}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Porøsitet
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {selectedField.reservoirData.petrophysics.porosity}%
              </Typography>
            </Paper>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Permeabilitet
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {selectedField.reservoirData.petrophysics.permeability} mD
              </Typography>
            </Paper>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Reservoar Trykk
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {selectedField.reservoirData.pressureData.current} bar
              </Typography>
              <Typography variant="caption">
                Opprinnelig: {selectedField.reservoirData.pressureData.initial} bar
              </Typography>
            </Paper>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Olje Gravitet
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {selectedField.reservoirData.fluidProperties.oilGravity}° API
              </Typography>
            </Paper>
          </Box>
        </CardContent>
      </Card>

      {/* Detailed Analysis Tabs */}
      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={handleTabChange}>
            <Tab label="Material Balance" icon={<BarChart />} />
            <Tab label="Decline Analyse" icon={<TrendingDown />} />
            <Tab label="Utvinningsgrad" icon={<Assessment />} />
            <Tab label="Økonomi" icon={<Calculate />} />
          </Tabs>
        </Box>

        <TabPanel value={activeTab} index={0}>
          <Typography variant="h6" gutterBottom>
            Material Balance Analyse
          </Typography>
          
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3, mb: 3 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Drive Mekanisme
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Chip 
                    label={selectedField.materialBalance.drive}
                    color={getDriveColor(selectedField.materialBalance.drive)}
                    sx={{ mr: 2 }}
                  />
                  <Typography variant="body2">
                    Primær drive mekanisme
                  </Typography>
                </Box>
                
                <Typography variant="subtitle2" gutterBottom>
                  Trykk vs Produksjon
                </Typography>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Trykk (bar)</TableCell>
                        <TableCell align="right">Kumulativ (Mm³)</TableCell>
                        <TableCell align="right">RF (%)</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {selectedField.materialBalance.pressure.map((pressure, index) => (
                        <TableRow key={index}>
                          <TableCell>{pressure}</TableCell>
                          <TableCell align="right">
                            {selectedField.materialBalance.production[index].toLocaleString('nb-NO')}
                          </TableCell>
                          <TableCell align="right">
                            {selectedField.materialBalance.recovery[index]}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Reservoir Volumetri
                </Typography>
                <TableContainer>
                  <Table size="small">
                    <TableBody>
                      <TableRow>
                        <TableCell>Brutto Reservoir Volum</TableCell>
                        <TableCell align="right">{selectedField.reservoirData.volume.bulk} Mm³</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Pore Volum</TableCell>
                        <TableCell align="right">{selectedField.reservoirData.volume.pore} Mm³</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Hydrokarbon Volum</TableCell>
                        <TableCell align="right">{selectedField.reservoirData.volume.hydrocarbon} Mm³</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Olje Metning</TableCell>
                        <TableCell align="right">{selectedField.reservoirData.petrophysics.saturation.oil}%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Vann Metning</TableCell>
                        <TableCell align="right">{selectedField.reservoirData.petrophysics.saturation.water}%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Net-to-Gross</TableCell>
                        <TableCell align="right">{selectedField.reservoirData.petrophysics.netToGross}%</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>

                <Alert severity="info" sx={{ mt: 2 }}>
                  <Typography variant="body2">
                    <strong>Produksjons Index:</strong> {calculateProductionIndex(selectedField).toFixed(1)} m³/dag/bar
                  </Typography>
                </Alert>
              </CardContent>
            </Card>
          </Box>
        </TabPanel>

        <TabPanel value={activeTab} index={1}>
          <Typography variant="h6" gutterBottom>
            Decline Curve Analyse
          </Typography>
          
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3, mb: 3 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Decline Parametere
                </Typography>
                <TableContainer>
                  <Table size="small">
                    <TableBody>
                      <TableRow>
                        <TableCell>Decline Type</TableCell>
                        <TableCell align="right">
                          <Chip label={selectedField.declineCurve.type} color="primary" size="small" />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Opprinnelig Rate</TableCell>
                        <TableCell align="right">{selectedField.declineCurve.initialRate.toLocaleString('nb-NO')} m³/dag</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Decline Rate</TableCell>
                        <TableCell align="right">{selectedField.declineCurve.declineRate}% per år</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>b-eksponent</TableCell>
                        <TableCell align="right">{selectedField.declineCurve.b}</TableCell>
                      </TableRow>
                      <TableRow sx={{ backgroundColor: 'primary.light' }}>
                        <TableCell sx={{ fontWeight: 'bold' }}>EUR</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                          {selectedField.declineCurve.eur.toLocaleString('nb-NO')} Mm³
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Produksjons Prognose
                </Typography>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>År</TableCell>
                        <TableCell align="right">Rate (m³/dag)</TableCell>
                        <TableCell align="right">Kumulativ (Mm³)</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {selectedField.declineCurve.forecast.date.map((date, index) => (
                        <TableRow key={index}>
                          <TableCell>{date.getFullYear()}</TableCell>
                          <TableCell align="right">
                            {selectedField.declineCurve.forecast.rate[index].toLocaleString('nb-NO')}
                          </TableCell>
                          <TableCell align="right">
                            {selectedField.declineCurve.forecast.cumulative[index].toLocaleString('nb-NO')}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Box>

          <Alert severity="warning">
            <Typography variant="body2">
              <strong>Basert på eksponentiell decline:</strong> Forventet produksjonslevetid ca. 25 år fra topp produksjon.
              Economic cut-off ved {(selectedField.economics.economics.breakeven * 1.2).toFixed(0)} NOK/m³.
            </Typography>
          </Alert>
        </TabPanel>

        <TabPanel value={activeTab} index={2}>
          <Typography variant="h6" gutterBottom>
            Utvinningsgrad Analyse
          </Typography>
          
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3, mb: 3 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Utvinningsgrad per Fase
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Primær</Typography>
                    <Typography variant="body2">{selectedField.recoveryFactor.primary}%</Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={selectedField.recoveryFactor.primary}
                    color="primary"
                  />
                </Box>
                
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Sekundær</Typography>
                    <Typography variant="body2">{selectedField.recoveryFactor.secondary}%</Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={selectedField.recoveryFactor.secondary}
                    color="warning"
                  />
                </Box>
                
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Tertiær</Typography>
                    <Typography variant="body2">{selectedField.recoveryFactor.tertiary}%</Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={selectedField.recoveryFactor.tertiary}
                    color="success"
                  />
                </Box>
                
                <Box sx={{ p: 2, backgroundColor: 'primary.light', borderRadius: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Total: {selectedField.recoveryFactor.total}%
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Vannflom Effektivitet
                </Typography>
                <TableContainer>
                  <Table size="small">
                    <TableBody>
                      <TableRow>
                        <TableCell>Sweep Effektivitet</TableCell>
                        <TableCell align="right">{selectedField.recoveryFactor.waterflood.efficiency}%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Areal Dekning</TableCell>
                        <TableCell align="right">{selectedField.recoveryFactor.waterflood.coverage}%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Mobilitet Forhold</TableCell>
                        <TableCell align="right">{selectedField.recoveryFactor.waterflood.mobility}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                
                <Alert severity="info" sx={{ mt: 2 }}>
                  <Typography variant="body2">
                    Optimalt mobilitet forhold er 0.2-1.0. Nåværende verdi indikerer {selectedField.recoveryFactor.waterflood.mobility < 0.5 ? 'favorabel' : 'utfordrende'} vannflom.
                  </Typography>
                </Alert>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Enhanced Oil Recovery
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    Metode: {selectedField.recoveryFactor.eor.method}
                  </Typography>
                  <Typography variant="body2">
                    Potensial: {selectedField.recoveryFactor.eor.potential}%
                  </Typography>
                </Box>
                
                <Chip 
                  label={selectedField.recoveryFactor.eor.implemented ? 'Implementert' : 'Ikke Implementert'}
                  color={selectedField.recoveryFactor.eor.implemented ? 'success' : 'warning'}
                  sx={{ mb: 2 }}
                />
                
                {!selectedField.recoveryFactor.eor.implemented && (
                  <Alert severity="warning">
                    <Typography variant="body2">
                      EOR implementering kan øke utvinningsgraden med opptil {selectedField.recoveryFactor.eor.potential}%.
                    </Typography>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </Box>
        </TabPanel>

        <TabPanel value={activeTab} index={3}>
          <Typography variant="h6" gutterBottom>
            Økonomisk Analyse
          </Typography>
          
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3, mb: 3 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Reserver Klassifikasjon
                </Typography>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Kategori</TableCell>
                        <TableCell align="right">Volume (Mm³)</TableCell>
                        <TableCell align="right">Sannsynlighet</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>1P (Påvist)</TableCell>
                        <TableCell align="right">{selectedField.economics.reserves.proved.toLocaleString('nb-NO')}</TableCell>
                        <TableCell align="right">90%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>2P (Sannsynlig)</TableCell>
                        <TableCell align="right">{selectedField.economics.reserves.probable.toLocaleString('nb-NO')}</TableCell>
                        <TableCell align="right">50%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>3P (Mulig)</TableCell>
                        <TableCell align="right">{selectedField.economics.reserves.possible.toLocaleString('nb-NO')}</TableCell>
                        <TableCell align="right">10%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Betinget</TableCell>
                        <TableCell align="right">{selectedField.economics.reserves.contingent.toLocaleString('nb-NO')}</TableCell>
                        <TableCell align="right">-</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Prospektive</TableCell>
                        <TableCell align="right">{selectedField.economics.reserves.prospective.toLocaleString('nb-NO')}</TableCell>
                        <TableCell align="right">-</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Økonomiske Nøkkeltall
                </Typography>
                <TableContainer>
                  <Table size="small">
                    <TableBody>
                      <TableRow>
                        <TableCell>OPEX</TableCell>
                        <TableCell align="right">{selectedField.economics.economics.opex} NOK/m³</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>CAPEX</TableCell>
                        <TableCell align="right">{(selectedField.economics.economics.capex / 1000).toLocaleString('nb-NO')} MNOK</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Breakeven</TableCell>
                        <TableCell align="right">{selectedField.economics.economics.breakeven} NOK/m³</TableCell>
                      </TableRow>
                      <TableRow sx={{ backgroundColor: 'success.light' }}>
                        <TableCell sx={{ fontWeight: 'bold' }}>NPV</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                          {(selectedField.economics.economics.npv / 1000).toLocaleString('nb-NO')} BNOK
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>IRR</TableCell>
                        <TableCell align="right">{selectedField.economics.economics.irr}%</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>

                <Alert severity="success" sx={{ mt: 2 }}>
                  <Typography variant="body2">
                    <strong>Høy Lønnsomhet:</strong> IRR på {selectedField.economics.economics.irr}% er godt over minimumskrav på 12%.
                  </Typography>
                </Alert>
              </CardContent>
            </Card>
          </Box>
        </TabPanel>
      </Card>
    </Container>
  );
};

export default ReservoirEngineeringTools;