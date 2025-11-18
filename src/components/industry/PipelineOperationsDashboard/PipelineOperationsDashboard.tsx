/**
 * Pipeline Operations Dashboard
 * Real-time monitoring of Norwegian pipeline infrastructure
 * Demonstrates understanding of midstream operations
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
  IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Timeline,
  Speed,
  Compress,
  Warning,
  CheckCircle,
  Error,
  WaterDrop,
  LocalGasStation,
  Opacity,
} from '@mui/icons-material';
import {
  norwegianTranslations,
  petroleumTerminology,
} from '../../../constants/norwegianLocalization';

// Styled components for pipeline visualization
const PipelineCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
  color: 'white',
  position: 'relative',
  overflow: 'hidden',
}));

const FlowCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
  color: 'white',
}));

const PressureCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
  color: 'white',
}));

const IntegrityCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, #7c2d12 0%, #ea580c 100%)',
  color: 'white',
}));

// Interfaces for pipeline data
interface PipelineData {
  pipelineId: string;
  name: string;
  type: 'oil' | 'gas' | 'water' | 'mixed';
  route: {
    from: string;
    to: string;
    length: number; // km
    diameter: number; // inches
    material: string;
    installationYear: number;
  };
  operatingData: {
    flowRate: number; // m³/day or Sm³/day
    pressure: {
      inlet: number; // bar
      outlet: number; // bar
      operating: number; // bar
      maximum: number; // bar
    };
    temperature: {
      inlet: number; // °C
      outlet: number; // °C
      ambient: number; // °C
    };
    capacity: {
      design: number;
      current: number; // % of design
      available: number; // % available
    };
  };
  status: 'operational' | 'maintenance' | 'emergency' | 'testing';
  integrityData: {
    lastInspection: Date;
    nextInspection: Date;
    corrosionRate: number; // mm/year
    wallThickness: {
      design: number; // mm
      current: number; // mm
      minimum: number; // mm
    };
    piggingData: {
      lastRun: Date;
      nextScheduled: Date;
      findings: string[];
    };
  };
  leakDetection: {
    system: 'SCADA' | 'fiber-optic' | 'acoustic' | 'pressure-wave';
    sensitivity: number; // m³/h minimum detectable
    lastCalibration: Date;
    alerts: PipelineAlert[];
  };
}

interface PipelineAlert {
  id: string;
  timestamp: Date;
  severity: 'low' | 'medium' | 'high' | 'critical';
  type: 'leak' | 'pressure' | 'temperature' | 'flow' | 'integrity';
  message: string;
  acknowledged: boolean;
}

// Mock data for Norwegian pipeline infrastructure
const mockPipelineData: PipelineData[] = [
  {
    pipelineId: 'NGP-001',
    name: 'Norpipe',
    type: 'oil',
    route: {
      from: 'Ekofisk Complex',
      to: 'Teesside, UK',
      length: 354,
      diameter: 32,
      material: 'Carbon Steel API 5L X65',
      installationYear: 1975,
    },
    operatingData: {
      flowRate: 285000,
      pressure: {
        inlet: 45,
        outlet: 12,
        operating: 28,
        maximum: 69,
      },
      temperature: {
        inlet: 18,
        outlet: 8,
        ambient: 4,
      },
      capacity: {
        design: 350000,
        current: 81.4,
        available: 18.6,
      },
    },
    status: 'operational',
    integrityData: {
      lastInspection: new Date('2023-08-15'),
      nextInspection: new Date('2024-08-15'),
      corrosionRate: 0.08,
      wallThickness: {
        design: 15.9,
        current: 14.2,
        minimum: 12.7,
      },
      piggingData: {
        lastRun: new Date('2023-11-20'),
        nextScheduled: new Date('2024-05-20'),
        findings: ['Minor wax deposits', 'Corrosion within limits'],
      },
    },
    leakDetection: {
      system: 'SCADA',
      sensitivity: 0.5,
      lastCalibration: new Date('2024-01-10'),
      alerts: [],
    },
  },
  {
    pipelineId: 'NGP-002',
    name: 'Europipe I',
    type: 'gas',
    route: {
      from: 'Ekofisk/Eldfisk',
      to: 'Dornum, Germany',
      length: 659,
      diameter: 40,
      material: 'Carbon Steel API 5L X70',
      installationYear: 1995,
    },
    operatingData: {
      flowRate: 12500000,
      pressure: {
        inlet: 152,
        outlet: 68,
        operating: 110,
        maximum: 170,
      },
      temperature: {
        inlet: 45,
        outlet: 12,
        ambient: 6,
      },
      capacity: {
        design: 16800000,
        current: 74.4,
        available: 25.6,
      },
    },
    status: 'operational',
    integrityData: {
      lastInspection: new Date('2023-09-10'),
      nextInspection: new Date('2024-09-10'),
      corrosionRate: 0.05,
      wallThickness: {
        design: 17.5,
        current: 16.8,
        minimum: 14.0,
      },
      piggingData: {
        lastRun: new Date('2023-12-05'),
        nextScheduled: new Date('2024-06-05'),
        findings: ['Clean pipeline', 'No significant deposits'],
      },
    },
    leakDetection: {
      system: 'fiber-optic',
      sensitivity: 0.1,
      lastCalibration: new Date('2024-01-15'),
      alerts: [],
    },
  },
  {
    pipelineId: 'NGP-003',
    name: 'Langeled',
    type: 'gas',
    route: {
      from: 'Ormen Lange',
      to: 'Easington, UK',
      length: 1166,
      diameter: 44,
      material: 'Carbon Steel API 5L X70',
      installationYear: 2007,
    },
    operatingData: {
      flowRate: 22800000,
      pressure: {
        inlet: 195,
        outlet: 94,
        operating: 145,
        maximum: 220,
      },
      temperature: {
        inlet: 38,
        outlet: 8,
        ambient: 4,
      },
      capacity: {
        design: 25500000,
        current: 89.4,
        available: 10.6,
      },
    },
    status: 'operational',
    integrityData: {
      lastInspection: new Date('2023-10-22'),
      nextInspection: new Date('2024-10-22'),
      corrosionRate: 0.03,
      wallThickness: {
        design: 20.6,
        current: 20.1,
        minimum: 16.5,
      },
      piggingData: {
        lastRun: new Date('2024-01-18'),
        nextScheduled: new Date('2024-07-18'),
        findings: ['Excellent condition', 'No significant findings'],
      },
    },
    leakDetection: {
      system: 'acoustic',
      sensitivity: 0.05,
      lastCalibration: new Date('2024-01-20'),
      alerts: [
        {
          id: 'AL-001',
          timestamp: new Date('2024-01-28T14:30:00Z'),
          severity: 'medium',
          type: 'pressure',
          message: 'Pressure drop detected at KP 450.2 - investigating',
          acknowledged: false,
        },
      ],
    },
  },
  {
    pipelineId: 'NGP-004',
    name: 'Troll Gas Pipeline',
    type: 'gas',
    route: {
      from: 'Troll A Platform',
      to: 'Kollsnes',
      length: 64,
      diameter: 42,
      material: 'Carbon Steel API 5L X65',
      installationYear: 1996,
    },
    operatingData: {
      flowRate: 35600000,
      pressure: {
        inlet: 68,
        outlet: 58,
        operating: 63,
        maximum: 85,
      },
      temperature: {
        inlet: 42,
        outlet: 38,
        ambient: 8,
      },
      capacity: {
        design: 42000000,
        current: 84.8,
        available: 15.2,
      },
    },
    status: 'operational',
    integrityData: {
      lastInspection: new Date('2023-07-30'),
      nextInspection: new Date('2024-07-30'),
      corrosionRate: 0.06,
      wallThickness: {
        design: 18.3,
        current: 16.9,
        minimum: 14.6,
      },
      piggingData: {
        lastRun: new Date('2023-10-12'),
        nextScheduled: new Date('2024-04-12'),
        findings: [
          'Minor scale deposits',
          'Corrosion within acceptable limits',
        ],
      },
    },
    leakDetection: {
      system: 'pressure-wave',
      sensitivity: 0.2,
      lastCalibration: new Date('2024-01-05'),
      alerts: [],
    },
  },
];

export const PipelineOperationsDashboard: React.FC = () => {
  const [selectedPipeline, setSelectedPipeline] = useState<PipelineData>(
    mockPipelineData[0]
  );

  // Calculate system totals
  const systemTotals = mockPipelineData.reduce(
    (totals, pipeline) => ({
      totalFlow: totals.totalFlow + pipeline.operatingData.flowRate,
      avgCapacity: totals.avgCapacity + pipeline.operatingData.capacity.current,
      activePipelines:
        totals.activePipelines + (pipeline.status === 'operational' ? 1 : 0),
      totalLength: totals.totalLength + pipeline.route.length,
      totalAlerts: totals.totalAlerts + pipeline.leakDetection.alerts.length,
    }),
    {
      totalFlow: 0,
      avgCapacity: 0,
      activePipelines: 0,
      totalLength: 0,
      totalAlerts: 0,
    }
  );

  const getStatusColor = (
    status: string
  ): 'success' | 'warning' | 'error' | 'info' => {
    switch (status) {
      case 'operational':
        return 'success';
      case 'testing':
        return 'info';
      case 'maintenance':
        return 'warning';
      case 'emergency':
        return 'error';
      default:
        return 'info';
    }
  };

  const getPipelineTypeIcon = (type: string) => {
    switch (type) {
      case 'oil':
        return <LocalGasStation />;
      case 'gas':
        return <Speed />;
      case 'water':
        return <WaterDrop />;
      case 'mixed':
        return <Opacity />;
      default:
        return <Timeline />;
    }
  };

  const getSeverityColor = (
    severity: string
  ): 'success' | 'warning' | 'error' | 'info' => {
    switch (severity) {
      case 'low':
        return 'info';
      case 'medium':
        return 'warning';
      case 'high':
        return 'error';
      case 'critical':
        return 'error';
      default:
        return 'info';
    }
  };

  const getIntegrityStatus = (
    pipeline: PipelineData
  ): { status: string; color: 'success' | 'warning' | 'error' } => {
    const wallThicknessRatio =
      pipeline.integrityData.wallThickness.current /
      pipeline.integrityData.wallThickness.minimum;
    const inspectionOverdue =
      new Date() > pipeline.integrityData.nextInspection;

    if (inspectionOverdue || wallThicknessRatio < 1.1) {
      return { status: 'Critical', color: 'error' };
    } else if (
      wallThicknessRatio < 1.3 ||
      pipeline.integrityData.corrosionRate > 0.1
    ) {
      return { status: 'Warning', color: 'warning' };
    } else {
      return { status: 'Good', color: 'success' };
    }
  };

  return (
    <Container maxWidth='xl' sx={{ py: 4 }}>
      <Typography variant='h4' gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
        Pipeline Operations Dashboard
      </Typography>

      <Typography variant='subtitle1' sx={{ mb: 4, color: 'text.secondary' }}>
        {norwegianTranslations.realTime} overvåking av norsk rørledning
        infrastruktur
      </Typography>

      {/* System Overview Cards */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' },
          gap: 3,
          mb: 4,
        }}
      >
        <FlowCard>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Speed sx={{ mr: 1 }} />
              <Typography variant='h6'>Total Flyt</Typography>
            </Box>
            <Typography variant='h4' sx={{ fontWeight: 'bold', mb: 1 }}>
              {(systemTotals.totalFlow / 1000000).toFixed(1)}M
            </Typography>
            <Typography variant='body2' sx={{ opacity: 0.9 }}>
              m³/dag samlet
            </Typography>
          </CardContent>
        </FlowCard>

        <PipelineCard>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Timeline sx={{ mr: 1 }} />
              <Typography variant='h6'>Rørledninger</Typography>
            </Box>
            <Typography variant='h4' sx={{ fontWeight: 'bold', mb: 1 }}>
              {systemTotals.activePipelines}/{mockPipelineData.length}
            </Typography>
            <Typography variant='body2' sx={{ opacity: 0.9 }}>
              Operasjonelle
            </Typography>
          </CardContent>
        </PipelineCard>

        <PressureCard>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Warning sx={{ mr: 1 }} />
              <Typography variant='h6'>Aktive Varsler</Typography>
            </Box>
            <Typography variant='h4' sx={{ fontWeight: 'bold', mb: 1 }}>
              {systemTotals.totalAlerts}
            </Typography>
            <Typography variant='body2' sx={{ opacity: 0.9 }}>
              Krever oppmerksomhet
            </Typography>
          </CardContent>
        </PressureCard>

        <IntegrityCard>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Compress sx={{ mr: 1 }} />
              <Typography variant='h6'>Total Lengde</Typography>
            </Box>
            <Typography variant='h4' sx={{ fontWeight: 'bold', mb: 1 }}>
              {systemTotals.totalLength.toLocaleString('nb-NO')}
            </Typography>
            <Typography variant='body2' sx={{ opacity: 0.9 }}>
              km rørledninger
            </Typography>
          </CardContent>
        </IntegrityCard>
      </Box>

      {/* Pipeline Selection */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant='h6' gutterBottom>
            Velg Rørledning for Detaljert Analyse
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {mockPipelineData.map(pipeline => (
              <Chip
                key={pipeline.pipelineId}
                label={`${pipeline.name} (${pipeline.type.toUpperCase()})`}
                onClick={() => setSelectedPipeline(pipeline)}
                color={
                  selectedPipeline.pipelineId === pipeline.pipelineId
                    ? 'primary'
                    : 'default'
                }
                variant={
                  selectedPipeline.pipelineId === pipeline.pipelineId
                    ? 'filled'
                    : 'outlined'
                }
                icon={getPipelineTypeIcon(pipeline.type)}
              />
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* Selected Pipeline Details */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' },
          gap: 3,
          mb: 4,
        }}
      >
        {/* Operating Data */}
        <Card>
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
                  {selectedPipeline.name}
                </Typography>
                <Typography variant='body1' color='text.secondary'>
                  {selectedPipeline.route.from} → {selectedPipeline.route.to}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  {selectedPipeline.route.length} km •{' '}
                  {selectedPipeline.route.diameter}" •{' '}
                  {selectedPipeline.route.material}
                </Typography>
              </Box>
              <Chip
                label={selectedPipeline.status}
                color={getStatusColor(selectedPipeline.status)}
                size='small'
              />
            </Box>

            <Typography variant='h6' gutterBottom>
              Driftsdata
            </Typography>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 3,
                mb: 3,
              }}
            >
              <Paper sx={{ p: 2 }}>
                <Typography variant='subtitle2' color='text.secondary'>
                  Strømningshastighet
                </Typography>
                <Typography
                  variant='h4'
                  sx={{ fontWeight: 'bold', color: 'primary.main' }}
                >
                  {selectedPipeline.operatingData.flowRate.toLocaleString(
                    'nb-NO'
                  )}
                </Typography>
                <Typography variant='body2'>
                  {selectedPipeline.type === 'gas' ? 'Sm³/dag' : 'm³/dag'}
                </Typography>
                <LinearProgress
                  variant='determinate'
                  value={selectedPipeline.operatingData.capacity.current}
                  sx={{ mt: 1 }}
                />
                <Typography variant='caption'>
                  {selectedPipeline.operatingData.capacity.current.toFixed(1)}%
                  av kapasitet
                </Typography>
              </Paper>

              <Paper sx={{ p: 2 }}>
                <Typography variant='subtitle2' color='text.secondary'>
                  Driftstrykk
                </Typography>
                <Typography
                  variant='h4'
                  sx={{ fontWeight: 'bold', color: 'warning.main' }}
                >
                  {selectedPipeline.operatingData.pressure.operating}
                </Typography>
                <Typography variant='body2'>
                  bar (maks: {selectedPipeline.operatingData.pressure.maximum})
                </Typography>
                <LinearProgress
                  variant='determinate'
                  value={
                    (selectedPipeline.operatingData.pressure.operating /
                      selectedPipeline.operatingData.pressure.maximum) *
                    100
                  }
                  sx={{ mt: 1 }}
                  color='warning'
                />
                <Typography variant='caption'>
                  Innløp: {selectedPipeline.operatingData.pressure.inlet} bar •
                  Utløp: {selectedPipeline.operatingData.pressure.outlet} bar
                </Typography>
              </Paper>
            </Box>

            <TableContainer component={Paper}>
              <Table size='small'>
                <TableHead>
                  <TableRow>
                    <TableCell>Parameter</TableCell>
                    <TableCell align='right'>Innløp</TableCell>
                    <TableCell align='right'>Utløp</TableCell>
                    <TableCell align='right'>Differanse</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Trykk (bar)</TableCell>
                    <TableCell align='right'>
                      {selectedPipeline.operatingData.pressure.inlet}
                    </TableCell>
                    <TableCell align='right'>
                      {selectedPipeline.operatingData.pressure.outlet}
                    </TableCell>
                    <TableCell align='right'>
                      {(
                        selectedPipeline.operatingData.pressure.inlet -
                        selectedPipeline.operatingData.pressure.outlet
                      ).toFixed(1)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Temperatur (°C)</TableCell>
                    <TableCell align='right'>
                      {selectedPipeline.operatingData.temperature.inlet}
                    </TableCell>
                    <TableCell align='right'>
                      {selectedPipeline.operatingData.temperature.outlet}
                    </TableCell>
                    <TableCell align='right'>
                      {(
                        selectedPipeline.operatingData.temperature.inlet -
                        selectedPipeline.operatingData.temperature.outlet
                      ).toFixed(1)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>

        {/* Integrity & Alerts */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Integrity Status */}
          <Card>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                {petroleumTerminology.integrityManagement}
              </Typography>

              <Box sx={{ mb: 2 }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 1,
                  }}
                >
                  <Typography variant='body2'>Veggtykkelse</Typography>
                  <Chip
                    label={getIntegrityStatus(selectedPipeline).status}
                    color={getIntegrityStatus(selectedPipeline).color}
                    size='small'
                  />
                </Box>
                <LinearProgress
                  variant='determinate'
                  value={
                    (selectedPipeline.integrityData.wallThickness.current /
                      selectedPipeline.integrityData.wallThickness.design) *
                    100
                  }
                  color={getIntegrityStatus(selectedPipeline).color}
                  sx={{ mb: 1 }}
                />
                <Typography variant='caption'>
                  {selectedPipeline.integrityData.wallThickness.current} mm av{' '}
                  {selectedPipeline.integrityData.wallThickness.design} mm
                  design
                </Typography>
              </Box>

              <Table size='small'>
                <TableBody>
                  <TableRow>
                    <TableCell>Korrosjonsrate</TableCell>
                    <TableCell align='right'>
                      {selectedPipeline.integrityData.corrosionRate} mm/år
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Siste inspeksjon</TableCell>
                    <TableCell align='right'>
                      {selectedPipeline.integrityData.lastInspection.toLocaleDateString(
                        'nb-NO'
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Neste inspeksjon</TableCell>
                    <TableCell align='right'>
                      {selectedPipeline.integrityData.nextInspection.toLocaleDateString(
                        'nb-NO'
                      )}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Leak Detection & Alerts */}
          <Card>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                Lekkasjedeteksjon & Varsler
              </Typography>

              <Box sx={{ mb: 2 }}>
                <Typography variant='body2' sx={{ mb: 1 }}>
                  System: {selectedPipeline.leakDetection.system}
                </Typography>
                <Typography variant='body2' sx={{ mb: 1 }}>
                  Følsomhet: {selectedPipeline.leakDetection.sensitivity} m³/h
                </Typography>
                <Typography variant='caption' color='text.secondary'>
                  Sist kalibrert:{' '}
                  {selectedPipeline.leakDetection.lastCalibration.toLocaleDateString(
                    'nb-NO'
                  )}
                </Typography>
              </Box>

              {selectedPipeline.leakDetection.alerts.length > 0 ? (
                <Box>
                  <Typography variant='subtitle2' sx={{ mb: 1 }}>
                    Aktive Varsler:
                  </Typography>
                  {selectedPipeline.leakDetection.alerts.map(alert => (
                    <Alert
                      key={alert.id}
                      severity={getSeverityColor(alert.severity)}
                      sx={{ mb: 1 }}
                      action={
                        <IconButton size='small' color='inherit'>
                          {alert.acknowledged ? <CheckCircle /> : <Error />}
                        </IconButton>
                      }
                    >
                      <Typography variant='body2' sx={{ fontWeight: 'bold' }}>
                        {alert.type.toUpperCase()} -{' '}
                        {alert.severity.toUpperCase()}
                      </Typography>
                      <Typography variant='body2'>{alert.message}</Typography>
                      <Typography variant='caption'>
                        {alert.timestamp.toLocaleString('nb-NO')}
                      </Typography>
                    </Alert>
                  ))}
                </Box>
              ) : (
                <Alert severity='success'>
                  Ingen aktive varsler. Alle systemer operative.
                </Alert>
              )}
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Pigging Data */}
      <Card>
        <CardContent>
          <Typography variant='h6' gutterBottom>
            Pigging og Vedlikehold
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
              gap: 3,
            }}
          >
            <Paper sx={{ p: 2 }}>
              <Typography
                variant='subtitle2'
                color='text.secondary'
                gutterBottom
              >
                Siste Pigging
              </Typography>
              <Typography variant='body1' sx={{ fontWeight: 'bold', mb: 1 }}>
                {selectedPipeline.integrityData.piggingData.lastRun.toLocaleDateString(
                  'nb-NO'
                )}
              </Typography>
              <Typography variant='body2'>
                Funn:{' '}
                {selectedPipeline.integrityData.piggingData.findings.join(', ')}
              </Typography>
            </Paper>

            <Paper sx={{ p: 2 }}>
              <Typography
                variant='subtitle2'
                color='text.secondary'
                gutterBottom
              >
                Neste Planlagt
              </Typography>
              <Typography variant='body1' sx={{ fontWeight: 'bold', mb: 1 }}>
                {selectedPipeline.integrityData.piggingData.nextScheduled.toLocaleDateString(
                  'nb-NO'
                )}
              </Typography>
              <Typography variant='body2'>
                {Math.ceil(
                  (selectedPipeline.integrityData.piggingData.nextScheduled.getTime() -
                    Date.now()) /
                    (1000 * 60 * 60 * 24)
                )}{' '}
                dager igjen
              </Typography>
            </Paper>

            <Paper sx={{ p: 2 }}>
              <Typography
                variant='subtitle2'
                color='text.secondary'
                gutterBottom
              >
                Rørledning Alder
              </Typography>
              <Typography variant='body1' sx={{ fontWeight: 'bold', mb: 1 }}>
                {new Date().getFullYear() -
                  selectedPipeline.route.installationYear}{' '}
                år
              </Typography>
              <Typography variant='body2'>
                Installert: {selectedPipeline.route.installationYear}
              </Typography>
            </Paper>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default PipelineOperationsDashboard;
