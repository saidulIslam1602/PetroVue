/**
 * Drilling Operations Tracker
 * Comprehensive drilling operations monitoring for Norwegian Continental Shelf
 * Demonstrates expertise in drilling engineering and North Sea operations
 */

import React, { useState, useEffect } from 'react';
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
  Speed,
  Thermostat,
  Timeline,
  Construction,
  Psychology,
  TrendingUp,
  Warning,
  CheckCircle,
  Engineering,
  Layers,
  Compress,
  LocalGasStation
} from '@mui/icons-material';
import { norwegianTranslations, petroleumTerminology } from '../../../constants/norwegianLocalization';

// Styled components
const DrillingCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, #7c2d12 0%, #ea580c 100%)',
  color: 'white',
}));

const MudCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, #166534 0%, #22c55e 100%)',
  color: 'white',
}));

const FormationCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
  color: 'white',
}));

const PerformanceCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
  color: 'white',
}));

// Interfaces for drilling data
interface DrillingOperation {
  wellId: string;
  wellName: string;
  rigName: string;
  location: {
    block: string;
    field: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
    waterDepth: number; // meters
  };
  wellType: 'exploration' | 'development' | 'production' | 'injection' | 'observation';
  status: 'planning' | 'drilling' | 'casing' | 'completion' | 'testing' | 'suspended' | 'completed';
  timeline: {
    spudDate: Date;
    plannedTD: Date;
    currentDate: Date;
    estimatedCompletion: Date;
  };
  wellDesign: {
    plannedDepth: number; // meters MD
    currentDepth: number; // meters MD
    targetDepth: number; // meters TVD
    sections: DrillSection[];
  };
  mudLogging: MudLoggingData;
  drillingParameters: DrillingParameters;
  formations: FormationData[];
  bitPerformance: BitPerformanceData[];
  costs: DrillingCosts;
}

interface DrillSection {
  sectionName: string;
  topDepth: number;
  bottomDepth: number;
  holeDiameter: number; // inches
  casingSize: number; // inches
  mudWeight: number; // SG
  status: 'planned' | 'drilling' | 'completed';
}

interface MudLoggingData {
  currentDepth: number;
  rop: number; // m/hr - Rate of Penetration
  gasUnits: number;
  hydrocarbon: {
    c1: number; // %
    c2: number; // %
    c3: number; // %
    c4: number; // %
    c5plus: number; // %
    totalGas: number; // %
  };
  mudProperties: {
    density: number; // SG
    viscosity: number; // cP
    fluidLoss: number; // ml/30min
    ph: number;
    temperature: number; // °C
  };
  cuttings: {
    lithology: string;
    porosity: string;
    oilStaining: 'none' | 'trace' | 'poor' | 'fair' | 'good' | 'very good';
    fluorescence: 'none' | 'dull' | 'bright' | 'very bright';
  };
}

interface DrillingParameters {
  currentDepth: number;
  bitDepth: number;
  hookLoad: number; // tons
  blockPosition: number; // meters
  rotarySpeed: number; // rpm
  torque: number; // kNm
  standpipePressure: number; // bar
  pumpRate: number; // l/min
  weightOnBit: number; // tons
  rateOfPenetration: number; // m/hr
  mudFlowIn: number; // l/min
  mudFlowOut: number; // l/min
  mudTemperatureIn: number; // °C
  mudTemperatureOut: number; // °C
}

interface FormationData {
  topDepth: number;
  bottomDepth: number;
  formationName: string;
  lithology: string;
  age: string;
  porosity: number; // %
  permeability: number; // mD
  shows: {
    oilShows: boolean;
    gasShows: boolean;
    waterShows: boolean;
    description: string;
  };
  pressure: {
    pore: number; // bar
    fracture: number; // bar
    mudWeight: number; // SG
  };
}

interface BitPerformanceData {
  runNumber: number;
  bitType: string;
  bitSize: number; // inches
  inDepth: number;
  outDepth: number;
  footage: number; // meters
  rotatingHours: number;
  rop: number; // m/hr
  reasonPulled: string;
  dullGrading: string;
  cost: number; // NOK
}

interface DrillingCosts {
  totalBudget: number; // NOK
  currentCost: number; // NOK
  dailyRate: number; // NOK/day
  breakdown: {
    rigRate: number;
    mudAndChemicals: number;
    casing: number;
    bits: number;
    cementing: number;
    logging: number;
    completion: number;
    other: number;
  };
}

// Mock data for Norwegian Continental Shelf drilling operations
const mockDrillingData: DrillingOperation[] = [
  {
    wellId: 'NCS-16/2-A12',
    wellName: 'Johan Sverdrup A-12H',
    rigName: 'Deepsea Yantai',
    location: {
      block: '16/2',
      field: 'Johan Sverdrup',
      coordinates: {
        latitude: 58.8756,
        longitude: 2.0598
      },
      waterDepth: 110
    },
    wellType: 'development',
    status: 'drilling',
    timeline: {
      spudDate: new Date('2024-01-15'),
      plannedTD: new Date('2024-03-20'),
      currentDate: new Date('2024-02-15'),
      estimatedCompletion: new Date('2024-03-18')
    },
    wellDesign: {
      plannedDepth: 5450,
      currentDepth: 3890,
      targetDepth: 1950,
      sections: [
        { sectionName: '36" Conductor', topDepth: 0, bottomDepth: 85, holeDiameter: 36, casingSize: 30, mudWeight: 1.03, status: 'completed' },
        { sectionName: '26" Surface', topDepth: 85, bottomDepth: 450, holeDiameter: 26, casingSize: 20, mudWeight: 1.05, status: 'completed' },
        { sectionName: '17½" Intermediate', topDepth: 450, bottomDepth: 2150, holeDiameter: 17.5, casingSize: 13.375, mudWeight: 1.18, status: 'completed' },
        { sectionName: '12¼" Reservoir', topDepth: 2150, bottomDepth: 5450, holeDiameter: 12.25, casingSize: 9.625, mudWeight: 1.32, status: 'drilling' }
      ]
    },
    mudLogging: {
      currentDepth: 3890,
      rop: 12.5,
      gasUnits: 450,
      hydrocarbon: {
        c1: 2.5,
        c2: 0.8,
        c3: 0.4,
        c4: 0.2,
        c5plus: 0.3,
        totalGas: 4.2
      },
      mudProperties: {
        density: 1.32,
        viscosity: 45,
        fluidLoss: 8.5,
        ph: 9.2,
        temperature: 78
      },
      cuttings: {
        lithology: 'Sandstone, fine to medium grained',
        porosity: 'Good (15-20%)',
        oilStaining: 'good',
        fluorescence: 'bright'
      }
    },
    drillingParameters: {
      currentDepth: 3890,
      bitDepth: 3890,
      hookLoad: 185,
      blockPosition: 12.5,
      rotarySpeed: 85,
      torque: 28,
      standpipePressure: 145,
      pumpRate: 2800,
      weightOnBit: 12,
      rateOfPenetration: 12.5,
      mudFlowIn: 2800,
      mudFlowOut: 2820,
      mudTemperatureIn: 22,
      mudTemperatureOut: 78
    },
    formations: [
      {
        topDepth: 0,
        bottomDepth: 180,
        formationName: 'Quaternary',
        lithology: 'Unconsolidated sediments',
        age: 'Quaternary',
        porosity: 25,
        permeability: 500,
        shows: { oilShows: false, gasShows: false, waterShows: true, description: 'Water bearing sands' },
        pressure: { pore: 18, fracture: 22, mudWeight: 1.03 }
      },
      {
        topDepth: 1850,
        bottomDepth: 2150,
        formationName: 'Utsira Formation',
        lithology: 'Fine-medium grained sandstone',
        age: 'Pliocene',
        porosity: 35,
        permeability: 2500,
        shows: { oilShows: false, gasShows: false, waterShows: true, description: 'Aquifer zone' },
        pressure: { pore: 185, fracture: 220, mudWeight: 1.15 }
      },
      {
        topDepth: 3200,
        bottomDepth: 4100,
        formationName: 'Draupne Formation',
        lithology: 'Dark organic-rich shale',
        age: 'Late Jurassic',
        porosity: 8,
        permeability: 0.05,
        shows: { oilShows: true, gasShows: true, waterShows: false, description: 'Source rock with hydrocarbon shows' },
        pressure: { pore: 320, fracture: 385, mudWeight: 1.28 }
      },
      {
        topDepth: 4100,
        bottomDepth: 5450,
        formationName: 'Statfjord Formation',
        lithology: 'Medium-coarse grained sandstone',
        age: 'Late Triassic',
        porosity: 18,
        permeability: 850,
        shows: { oilShows: true, gasShows: false, waterShows: false, description: 'Primary reservoir with oil shows' },
        pressure: { pore: 410, fracture: 492, mudWeight: 1.32 }
      }
    ],
    bitPerformance: [
      {
        runNumber: 1,
        bitType: 'PDC - 7 blade',
        bitSize: 26,
        inDepth: 85,
        outDepth: 450,
        footage: 365,
        rotatingHours: 28,
        rop: 13.0,
        reasonPulled: 'Section TD',
        dullGrading: '1-1-NO-A-X-I-NO-TD',
        cost: 285000
      },
      {
        runNumber: 2,
        bitType: 'PDC - 6 blade',
        bitSize: 17.5,
        inDepth: 450,
        outDepth: 2150,
        footage: 1700,
        rotatingHours: 142,
        rop: 12.0,
        reasonPulled: 'Section TD',
        dullGrading: '2-2-NO-A-X-I-NO-TD',
        cost: 445000
      },
      {
        runNumber: 3,
        bitType: 'PDC - Impregnated',
        bitSize: 12.25,
        inDepth: 2150,
        outDepth: 3890,
        footage: 1740,
        rotatingHours: 139,
        rop: 12.5,
        reasonPulled: 'In hole',
        dullGrading: 'In hole',
        cost: 650000
      }
    ],
    costs: {
      totalBudget: 485000000,
      currentCost: 298500000,
      dailyRate: 2800000,
      breakdown: {
        rigRate: 168000000,
        mudAndChemicals: 28500000,
        casing: 45200000,
        bits: 1380000,
        cementing: 18900000,
        logging: 12400000,
        completion: 15200000,
        other: 8920000
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

export const DrillingOperationsTracker: React.FC = () => {
  const [operations, setOperations] = useState<DrillingOperation[]>(mockDrillingData);
  const [selectedOperation, setSelectedOperation] = useState<DrillingOperation>(mockDrillingData[0]);
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const getStatusColor = (status: string): 'success' | 'warning' | 'error' | 'info' => {
    switch (status) {
      case 'completed': case 'drilling': return 'success';
      case 'planning': case 'testing': return 'info';
      case 'casing': case 'completion': return 'warning';
      case 'suspended': return 'error';
      default: return 'info';
    }
  };

  const getWellTypeColor = (type: string): 'primary' | 'secondary' | 'success' | 'warning' => {
    switch (type) {
      case 'development': return 'primary';
      case 'exploration': return 'warning';
      case 'production': return 'success';
      case 'injection': return 'secondary';
      default: return 'primary';
    }
  };

  const calculateProgress = (operation: DrillingOperation): number => {
    return (operation.wellDesign.currentDepth / operation.wellDesign.plannedDepth) * 100;
  };

  const getDaysRemaining = (operation: DrillingOperation): number => {
    return Math.ceil((operation.timeline.estimatedCompletion.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  };

  const getCurrentSection = (operation: DrillingOperation): DrillSection | undefined => {
    return operation.wellDesign.sections.find(section => 
      operation.wellDesign.currentDepth >= section.topDepth && 
      operation.wellDesign.currentDepth <= section.bottomDepth
    );
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
        Drilling Operations Tracker
      </Typography>
      
      <Typography variant="subtitle1" sx={{ mb: 4, color: 'text.secondary' }}>
        {norwegianTranslations.realTime} overvåking av boreoperasjoner på norsk kontinentalsokkel
      </Typography>

      {/* Operation Overview Cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' }, gap: 3, mb: 4 }}>
        <DrillingCard>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Construction sx={{ mr: 1 }} />
              <Typography variant="h6">
                Aktiv Boring
              </Typography>
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
              {selectedOperation.wellDesign.currentDepth.toLocaleString('nb-NO')}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              av {selectedOperation.wellDesign.plannedDepth.toLocaleString('nb-NO')} m MD
            </Typography>
            <LinearProgress 
              variant="determinate" 
              value={calculateProgress(selectedOperation)}
              sx={{ mt: 1, backgroundColor: 'rgba(255,255,255,0.3)' }}
            />
          </CardContent>
        </DrillingCard>

        <MudCard>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Speed sx={{ mr: 1 }} />
              <Typography variant="h6">
                Penetrasjonsrate
              </Typography>
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
              {selectedOperation.drillingParameters.rateOfPenetration}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              m/time
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Rotasjon: {selectedOperation.drillingParameters.rotarySpeed} rpm
            </Typography>
          </CardContent>
        </MudCard>

        <FormationCard>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Layers sx={{ mr: 1 }} />
              <Typography variant="h6">
                Formasjon
              </Typography>
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
              {selectedOperation.formations.length}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Gjennomboret
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Gass: {selectedOperation.mudLogging.gasUnits} enheter
            </Typography>
          </CardContent>
        </FormationCard>

        <PerformanceCard>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <TrendingUp sx={{ mr: 1 }} />
              <Typography variant="h6">
                Fremdrift
              </Typography>
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
              {getDaysRemaining(selectedOperation)}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              dager igjen
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              {calculateProgress(selectedOperation).toFixed(1)}% ferdig
            </Typography>
          </CardContent>
        </PerformanceCard>
      </Box>

      {/* Well Information */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                {selectedOperation.wellName}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Rigg: {selectedOperation.rigName} • Blokk: {selectedOperation.location.block} • 
                Felt: {selectedOperation.location.field}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Vanndyp: {selectedOperation.location.waterDepth} m • 
                Koordinater: {selectedOperation.location.coordinates.latitude.toFixed(4)}°N, {selectedOperation.location.coordinates.longitude.toFixed(4)}°E
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Chip 
                label={selectedOperation.wellType}
                color={getWellTypeColor(selectedOperation.wellType)}
                size="small"
              />
              <Chip 
                label={selectedOperation.status}
                color={getStatusColor(selectedOperation.status)}
                size="small"
              />
            </Box>
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' }, gap: 3 }}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Spud Dato
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                {selectedOperation.timeline.spudDate.toLocaleDateString('nb-NO')}
              </Typography>
            </Paper>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Planlagt Ferdig
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                {selectedOperation.timeline.estimatedCompletion.toLocaleDateString('nb-NO')}
              </Typography>
            </Paper>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Kostnader
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                {(selectedOperation.costs.currentCost / 1000000).toFixed(1)}M NOK
              </Typography>
              <Typography variant="caption">
                av {(selectedOperation.costs.totalBudget / 1000000).toFixed(0)}M NOK
              </Typography>
            </Paper>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Nåværende Seksjon
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                {getCurrentSection(selectedOperation)?.sectionName || 'Ukjent'}
              </Typography>
              <Typography variant="caption">
                {getCurrentSection(selectedOperation)?.holeDiameter}" hull
              </Typography>
            </Paper>
          </Box>
        </CardContent>
      </Card>

      {/* Detailed Tabs */}
      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={handleTabChange}>
            <Tab label="Boreparametere" icon={<Engineering />} />
            <Tab label="Mudlogging" icon={<Psychology />} />
            <Tab label="Formasjoner" icon={<Layers />} />
            <Tab label="Bit Ytelse" icon={<Construction />} />
          </Tabs>
        </Box>

        <TabPanel value={activeTab} index={0}>
          <Typography variant="h6" gutterBottom>
            Bore Parametere
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3 }}>
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Parameter</TableCell>
                    <TableCell align="right">Verdi</TableCell>
                    <TableCell>Enhet</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Nåværende Dyp</TableCell>
                    <TableCell align="right">{selectedOperation.drillingParameters.currentDepth.toLocaleString('nb-NO')}</TableCell>
                    <TableCell>m MD</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Krok Last</TableCell>
                    <TableCell align="right">{selectedOperation.drillingParameters.hookLoad}</TableCell>
                    <TableCell>tonn</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Vekt på Bit</TableCell>
                    <TableCell align="right">{selectedOperation.drillingParameters.weightOnBit}</TableCell>
                    <TableCell>tonn</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Rotasjonshastighet</TableCell>
                    <TableCell align="right">{selectedOperation.drillingParameters.rotarySpeed}</TableCell>
                    <TableCell>rpm</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Dreiemoment</TableCell>
                    <TableCell align="right">{selectedOperation.drillingParameters.torque}</TableCell>
                    <TableCell>kNm</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Standpipe Trykk</TableCell>
                    <TableCell align="right">{selectedOperation.drillingParameters.standpipePressure}</TableCell>
                    <TableCell>bar</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Seksjon</TableCell>
                    <TableCell align="right">Fra (m)</TableCell>
                    <TableCell align="right">Til (m)</TableCell>
                    <TableCell align="center">Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedOperation.wellDesign.sections.map((section, index) => (
                    <TableRow key={index}>
                      <TableCell>{section.sectionName}</TableCell>
                      <TableCell align="right">{section.topDepth}</TableCell>
                      <TableCell align="right">{section.bottomDepth}</TableCell>
                      <TableCell align="center">
                        <Chip 
                          label={section.status} 
                          color={getStatusColor(section.status)} 
                          size="small"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </TabPanel>

        <TabPanel value={activeTab} index={1}>
          <Typography variant="h6" gutterBottom>
            Mudlogging Data
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Hydrokarbon Analyse
                </Typography>
                <TableContainer>
                  <Table size="small">
                    <TableBody>
                      <TableRow>
                        <TableCell>C1 (Metan)</TableCell>
                        <TableCell align="right">{selectedOperation.mudLogging.hydrocarbon.c1}%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>C2 (Etan)</TableCell>
                        <TableCell align="right">{selectedOperation.mudLogging.hydrocarbon.c2}%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>C3 (Propan)</TableCell>
                        <TableCell align="right">{selectedOperation.mudLogging.hydrocarbon.c3}%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>C4 (Butan)</TableCell>
                        <TableCell align="right">{selectedOperation.mudLogging.hydrocarbon.c4}%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>C5+ (Tyngre)</TableCell>
                        <TableCell align="right">{selectedOperation.mudLogging.hydrocarbon.c5plus}%</TableCell>
                      </TableRow>
                      <TableRow sx={{ backgroundColor: 'primary.light' }}>
                        <TableCell sx={{ fontWeight: 'bold' }}>Total Gass</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                          {selectedOperation.mudLogging.hydrocarbon.totalGas}%
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
                  Bore Slam Egenskaper
                </Typography>
                <TableContainer>
                  <Table size="small">
                    <TableBody>
                      <TableRow>
                        <TableCell>Tetthet</TableCell>
                        <TableCell align="right">{selectedOperation.mudLogging.mudProperties.density} SG</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Viskositet</TableCell>
                        <TableCell align="right">{selectedOperation.mudLogging.mudProperties.viscosity} cP</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Filtervæske Tap</TableCell>
                        <TableCell align="right">{selectedOperation.mudLogging.mudProperties.fluidLoss} ml/30min</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>pH</TableCell>
                        <TableCell align="right">{selectedOperation.mudLogging.mudProperties.ph}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Temperatur</TableCell>
                        <TableCell align="right">{selectedOperation.mudLogging.mudProperties.temperature}°C</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Borekutt Analyse
                </Typography>
                <TableContainer>
                  <Table size="small">
                    <TableBody>
                      <TableRow>
                        <TableCell>Litologi</TableCell>
                        <TableCell>{selectedOperation.mudLogging.cuttings.lithology}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Porøsitet</TableCell>
                        <TableCell>{selectedOperation.mudLogging.cuttings.porosity}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Olje Farging</TableCell>
                        <TableCell>
                          <Chip 
                            label={selectedOperation.mudLogging.cuttings.oilStaining} 
                            color={selectedOperation.mudLogging.cuttings.oilStaining === 'good' ? 'success' : 'default'}
                            size="small"
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Fluorescens</TableCell>
                        <TableCell>
                          <Chip 
                            label={selectedOperation.mudLogging.cuttings.fluorescence}
                            color={selectedOperation.mudLogging.cuttings.fluorescence === 'bright' ? 'warning' : 'default'}
                            size="small"
                          />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                
                <Alert severity="info" sx={{ mt: 2 }}>
                  <Typography variant="body2">
                    <strong>Gass Enheter:</strong> {selectedOperation.mudLogging.gasUnits} enheter
                  </Typography>
                  <Typography variant="body2">
                    <strong>Nåværende ROP:</strong> {selectedOperation.mudLogging.rop} m/h
                  </Typography>
                </Alert>
              </CardContent>
            </Card>
          </Box>
        </TabPanel>

        <TabPanel value={activeTab} index={2}>
          <Typography variant="h6" gutterBottom>
            Geologiske Formasjoner
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Formasjon</TableCell>
                  <TableCell align="right">Top (m)</TableCell>
                  <TableCell align="right">Bunn (m)</TableCell>
                  <TableCell>Alder</TableCell>
                  <TableCell>Litologi</TableCell>
                  <TableCell align="right">Porøsitet (%)</TableCell>
                  <TableCell align="right">Permeabilitet (mD)</TableCell>
                  <TableCell>Påvisninger</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedOperation.formations.map((formation, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ fontWeight: 'bold' }}>{formation.formationName}</TableCell>
                    <TableCell align="right">{formation.topDepth}</TableCell>
                    <TableCell align="right">{formation.bottomDepth}</TableCell>
                    <TableCell>{formation.age}</TableCell>
                    <TableCell>{formation.lithology}</TableCell>
                    <TableCell align="right">{formation.porosity}</TableCell>
                    <TableCell align="right">{formation.permeability}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                        {formation.shows.oilShows && <Chip label="Olje" color="success" size="small" />}
                        {formation.shows.gasShows && <Chip label="Gass" color="warning" size="small" />}
                        {formation.shows.waterShows && <Chip label="Vann" color="info" size="small" />}
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        <TabPanel value={activeTab} index={3}>
          <Typography variant="h6" gutterBottom>
            Bit Ytelse Analyse
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Løp #</TableCell>
                  <TableCell>Bit Type</TableCell>
                  <TableCell align="right">Størrelse (")</TableCell>
                  <TableCell align="right">Inn Dyp (m)</TableCell>
                  <TableCell align="right">Ut Dyp (m)</TableCell>
                  <TableCell align="right">Footage (m)</TableCell>
                  <TableCell align="right">Timer</TableCell>
                  <TableCell align="right">ROP (m/h)</TableCell>
                  <TableCell>Årsak Trukket</TableCell>
                  <TableCell align="right">Kostnad (NOK)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedOperation.bitPerformance.map((bit) => (
                  <TableRow key={bit.runNumber}>
                    <TableCell>{bit.runNumber}</TableCell>
                    <TableCell>{bit.bitType}</TableCell>
                    <TableCell align="right">{bit.bitSize}</TableCell>
                    <TableCell align="right">{bit.inDepth}</TableCell>
                    <TableCell align="right">{bit.outDepth}</TableCell>
                    <TableCell align="right">{bit.footage}</TableCell>
                    <TableCell align="right">{bit.rotatingHours}</TableCell>
                    <TableCell align="right">{bit.rop}</TableCell>
                    <TableCell>{bit.reasonPulled}</TableCell>
                    <TableCell align="right">{bit.cost.toLocaleString('nb-NO')}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ mt: 3, display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Gjennomsnittlig ROP
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                  {(selectedOperation.bitPerformance.reduce((sum, bit) => sum + bit.rop, 0) / selectedOperation.bitPerformance.length).toFixed(1)}
                </Typography>
                <Typography variant="body2">m/time</Typography>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Total Bit Kostnad
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'warning.main' }}>
                  {(selectedOperation.bitPerformance.reduce((sum, bit) => sum + bit.cost, 0) / 1000).toLocaleString('nb-NO')}K
                </Typography>
                <Typography variant="body2">NOK</Typography>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Total Roterende Timer
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'success.main' }}>
                  {selectedOperation.bitPerformance.reduce((sum, bit) => sum + bit.rotatingHours, 0)}
                </Typography>
                <Typography variant="body2">timer</Typography>
              </CardContent>
            </Card>
          </Box>
        </TabPanel>
      </Card>
    </Container>
  );
};

export default DrillingOperationsTracker;