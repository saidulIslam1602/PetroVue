/**
 * Well Performance Analytics Dashboard
 * Comprehensive monitoring of drilling and production parameters
 * Aligned with Norwegian petroleum industry standards
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
  TrendingUp,
  TrendingDown,
  Speed,
  Opacity,
  Compress,
} from '@mui/icons-material';
import {
  norwegianTranslations,
  petroleumTerminology,
} from '../../../constants/norwegianLocalization';

// Styled components for well performance visualization
const WellCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, #0c4a6e 0%, #0284c7 100%)',
  color: 'white',
  position: 'relative',
  overflow: 'hidden',
}));

const ProductionCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, #15803d 0%, #22c55e 100%)',
  color: 'white',
}));

const DrillingCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, #a16207 0%, #eab308 100%)',
  color: 'white',
}));

const ReservoirCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, #7c2d12 0%, #ea580c 100%)',
  color: 'white',
}));

// Interfaces for well data
interface WellData {
  wellId: string;
  wellName: string;
  field: string;
  platform: string;
  wellType: 'producer' | 'injector' | 'exploration';
  status: 'active' | 'shut-in' | 'drilling' | 'completed' | 'abandoned';
  spudDate: Date;
  completionDate: Date | null;
  totalDepth: number; // meters
  tvd: number; // true vertical depth
  currentProduction: {
    oil: number; // bbl/day
    gas: number; // Sm³/day
    water: number; // bbl/day
    gor: number; // Sm³/Sm³
    wor: number; // water-oil ratio
    bht: number; // bottom hole temperature °C
    whp: number; // wellhead pressure bar
    choke: number; // choke size (mm)
  };
  reservoirData: {
    formation: string;
    porosity: number; // %
    permeability: number; // mD
    saturation: {
      oil: number; // %
      water: number; // %
      gas: number; // %
    };
    pressure: number; // bar
    temperature: number; // °C
  };
  drillingParameters?: {
    rop: number; // rate of penetration m/hr
    wob: number; // weight on bit kN
    rpm: number; // rotations per minute
    torque: number; // kNm
    mudWeight: number; // kg/m³
    mudViscosity: number; // cP
    flowRate: number; // l/min
  };
}

// Mock data for Norwegian Continental Shelf wells
const mockWellData: WellData[] = [
  {
    wellId: 'NO-15/6-A-12H',
    wellName: 'Johan Sverdrup A-12H',
    field: 'Johan Sverdrup',
    platform: 'Johan Sverdrup A',
    wellType: 'producer',
    status: 'active',
    spudDate: new Date('2023-03-15'),
    completionDate: new Date('2023-06-20'),
    totalDepth: 4200,
    tvd: 1950,
    currentProduction: {
      oil: 2800,
      gas: 125000,
      water: 450,
      gor: 45,
      wor: 0.16,
      bht: 85,
      whp: 185,
      choke: 48,
    },
    reservoirData: {
      formation: 'Draupne/Heather',
      porosity: 22,
      permeability: 180,
      saturation: {
        oil: 75,
        water: 22,
        gas: 3,
      },
      pressure: 280,
      temperature: 85,
    },
  },
  {
    wellId: 'NO-34/8-B-7H',
    wellName: 'Troll B-7H',
    field: 'Troll',
    platform: 'Troll A',
    wellType: 'producer',
    status: 'active',
    spudDate: new Date('2023-08-10'),
    completionDate: new Date('2023-11-15'),
    totalDepth: 3800,
    tvd: 1450,
    currentProduction: {
      oil: 1200,
      gas: 285000,
      water: 180,
      gor: 237,
      wor: 0.15,
      bht: 65,
      whp: 195,
      choke: 32,
    },
    reservoirData: {
      formation: 'Fangst Group',
      porosity: 28,
      permeability: 1200,
      saturation: {
        oil: 25,
        water: 15,
        gas: 60,
      },
      pressure: 210,
      temperature: 65,
    },
  },
  {
    wellId: 'NO-2/4-G-14H',
    wellName: 'Ekofisk G-14H',
    field: 'Ekofisk',
    platform: 'Ekofisk 2/4-G',
    wellType: 'producer',
    status: 'drilling',
    spudDate: new Date('2024-01-20'),
    completionDate: null,
    totalDepth: 3200,
    tvd: 3050,
    currentProduction: {
      oil: 0,
      gas: 0,
      water: 0,
      gor: 0,
      wor: 0,
      bht: 95,
      whp: 0,
      choke: 0,
    },
    reservoirData: {
      formation: 'Ekofisk Formation',
      porosity: 35,
      permeability: 25,
      saturation: {
        oil: 65,
        water: 33,
        gas: 2,
      },
      pressure: 410,
      temperature: 95,
    },
    drillingParameters: {
      rop: 12.5,
      wob: 180,
      rpm: 120,
      torque: 15.2,
      mudWeight: 1450,
      mudViscosity: 45,
      flowRate: 2200,
    },
  },
  {
    wellId: 'NO-7120/8-I-3H',
    wellName: 'Snøhvit I-3H',
    field: 'Snøhvit',
    platform: 'Snøhvit Subsea',
    wellType: 'producer',
    status: 'active',
    spudDate: new Date('2023-05-12'),
    completionDate: new Date('2023-09-08'),
    totalDepth: 4500,
    tvd: 2100,
    currentProduction: {
      oil: 0, // Gas field
      gas: 450000,
      water: 25,
      gor: 0,
      wor: 0,
      bht: 45,
      whp: 165,
      choke: 64,
    },
    reservoirData: {
      formation: 'Stø/Tubåen',
      porosity: 18,
      permeability: 85,
      saturation: {
        oil: 0,
        water: 25,
        gas: 75,
      },
      pressure: 180,
      temperature: 45,
    },
  },
];

export const WellPerformanceAnalytics: React.FC = () => {
  const [selectedWell, setSelectedWell] = useState<WellData>(mockWellData[0]);
  const [selectedTab, setSelectedTab] = useState<number>(0);

  // Calculate field totals
  const fieldTotals = mockWellData.reduce(
    (totals, well) => ({
      oil: totals.oil + well.currentProduction.oil,
      gas: totals.gas + well.currentProduction.gas,
      water: totals.water + well.currentProduction.water,
      activeWells: totals.activeWells + (well.status === 'active' ? 1 : 0),
      totalWells: totals.totalWells + 1,
    }),
    { oil: 0, gas: 0, water: 0, activeWells: 0, totalWells: 0 }
  );

  const getStatusColor = (
    status: string
  ): 'success' | 'warning' | 'error' | 'info' => {
    switch (status) {
      case 'active':
        return 'success';
      case 'drilling':
        return 'info';
      case 'shut-in':
        return 'warning';
      case 'abandoned':
        return 'error';
      default:
        return 'info';
    }
  };

  const getWellTypeColor = (
    type: string
  ): 'primary' | 'secondary' | 'warning' => {
    switch (type) {
      case 'producer':
        return 'primary';
      case 'injector':
        return 'secondary';
      case 'exploration':
        return 'warning';
      default:
        return 'primary';
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const TabPanel = ({
    children,
    value,
    index,
  }: {
    children: React.ReactNode;
    value: number;
    index: number;
  }) => (
    <div hidden={value !== index} style={{ paddingTop: '24px' }}>
      {value === index && children}
    </div>
  );

  return (
    <Container maxWidth='xl' sx={{ py: 4 }}>
      <Typography variant='h4' gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
        Well Performance Analytics
      </Typography>

      <Typography variant='subtitle1' sx={{ mb: 4, color: 'text.secondary' }}>
        {petroleumTerminology.realTimeOptimization} av brønnytelse på{' '}
        {norwegianTranslations.continentalShelf}
      </Typography>

      {/* Field Overview Cards */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' },
          gap: 3,
          mb: 4,
        }}
      >
        <ProductionCard>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <TrendingUp sx={{ mr: 1 }} />
              <Typography variant='h6'>
                {norwegianTranslations.oilProduction}
              </Typography>
            </Box>
            <Typography variant='h4' sx={{ fontWeight: 'bold', mb: 1 }}>
              {fieldTotals.oil.toLocaleString('nb-NO')}
            </Typography>
            <Typography variant='body2' sx={{ opacity: 0.9 }}>
              {norwegianTranslations.barrelsPerDay}
            </Typography>
          </CardContent>
        </ProductionCard>

        <WellCard>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Speed sx={{ mr: 1 }} />
              <Typography variant='h6'>
                {norwegianTranslations.gasProduction}
              </Typography>
            </Box>
            <Typography variant='h4' sx={{ fontWeight: 'bold', mb: 1 }}>
              {(fieldTotals.gas / 1000).toFixed(0)}k
            </Typography>
            <Typography variant='body2' sx={{ opacity: 0.9 }}>
              Sm³/dag
            </Typography>
          </CardContent>
        </WellCard>

        <DrillingCard>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Opacity sx={{ mr: 1 }} />
              <Typography variant='h6'>
                {norwegianTranslations.waterProduction}
              </Typography>
            </Box>
            <Typography variant='h4' sx={{ fontWeight: 'bold', mb: 1 }}>
              {fieldTotals.water.toLocaleString('nb-NO')}
            </Typography>
            <Typography variant='body2' sx={{ opacity: 0.9 }}>
              bbl/dag
            </Typography>
          </CardContent>
        </DrillingCard>

        <ReservoirCard>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Compress sx={{ mr: 1 }} />
              <Typography variant='h6'>Aktive Brønner</Typography>
            </Box>
            <Typography variant='h4' sx={{ fontWeight: 'bold', mb: 1 }}>
              {fieldTotals.activeWells}/{fieldTotals.totalWells}
            </Typography>
            <Typography variant='body2' sx={{ opacity: 0.9 }}>
              {(
                (fieldTotals.activeWells / fieldTotals.totalWells) *
                100
              ).toFixed(1)}
              % operativ
            </Typography>
          </CardContent>
        </ReservoirCard>
      </Box>

      {/* Well Selection and Tabs */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant='h6' gutterBottom>
            Velg Brønn for Detaljert Analyse
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
            {mockWellData.map(well => (
              <Chip
                key={well.wellId}
                label={`${well.wellName} (${well.wellId})`}
                onClick={() => setSelectedWell(well)}
                color={
                  selectedWell.wellId === well.wellId ? 'primary' : 'default'
                }
                variant={
                  selectedWell.wellId === well.wellId ? 'filled' : 'outlined'
                }
                icon={
                  getStatusColor(well.status) === 'success' ? (
                    <TrendingUp />
                  ) : getStatusColor(well.status) === 'info' ? (
                    <Speed />
                  ) : getStatusColor(well.status) === 'warning' ? (
                    <TrendingDown />
                  ) : (
                    <TrendingDown />
                  )
                }
              />
            ))}
          </Box>

          <Tabs value={selectedTab} onChange={handleTabChange}>
            <Tab label='Produksjon' />
            <Tab label='Reservoar' />
            <Tab label='Boring' disabled={!selectedWell.drillingParameters} />
            <Tab label='Analyse' />
          </Tabs>
        </CardContent>
      </Card>

      {/* Selected Well Details */}
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
                {selectedWell.wellName}
              </Typography>
              <Typography variant='body1' color='text.secondary'>
                {selectedWell.field} Felt • {selectedWell.platform} •{' '}
                {selectedWell.wellId}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Chip
                label={selectedWell.status}
                color={getStatusColor(selectedWell.status)}
                size='small'
              />
              <Chip
                label={selectedWell.wellType}
                color={getWellTypeColor(selectedWell.wellType)}
                variant='outlined'
                size='small'
              />
            </Box>
          </Box>

          {/* Production Tab */}
          <TabPanel value={selectedTab} index={0}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                gap: 3,
              }}
            >
              <Paper sx={{ p: 3 }}>
                <Typography variant='h6' gutterBottom>
                  Produksjonsdata
                </Typography>
                <TableContainer>
                  <Table size='small'>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          {norwegianTranslations.oilProduction}
                        </TableCell>
                        <TableCell align='right'>
                          <strong>
                            {selectedWell.currentProduction.oil.toLocaleString(
                              'nb-NO'
                            )}{' '}
                            bbl/dag
                          </strong>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          {norwegianTranslations.gasProduction}
                        </TableCell>
                        <TableCell align='right'>
                          <strong>
                            {selectedWell.currentProduction.gas.toLocaleString(
                              'nb-NO'
                            )}{' '}
                            Sm³/dag
                          </strong>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          {norwegianTranslations.waterProduction}
                        </TableCell>
                        <TableCell align='right'>
                          <strong>
                            {selectedWell.currentProduction.water.toLocaleString(
                              'nb-NO'
                            )}{' '}
                            bbl/dag
                          </strong>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          {petroleumTerminology.gasOilRatio}
                        </TableCell>
                        <TableCell align='right'>
                          <strong>
                            {selectedWell.currentProduction.gor} Sm³/Sm³
                          </strong>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>{petroleumTerminology.waterCut}</TableCell>
                        <TableCell align='right'>
                          <strong>
                            {(selectedWell.currentProduction.wor * 100).toFixed(
                              1
                            )}
                            %
                          </strong>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>

              <Paper sx={{ p: 3 }}>
                <Typography variant='h6' gutterBottom>
                  Brønnhode Parameter
                </Typography>
                <TableContainer>
                  <Table size='small'>
                    <TableBody>
                      <TableRow>
                        <TableCell>Brønnhodetrykk (WHP)</TableCell>
                        <TableCell align='right'>
                          <strong>
                            {selectedWell.currentProduction.whp} bar
                          </strong>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Choke Størrelse</TableCell>
                        <TableCell align='right'>
                          <strong>
                            {selectedWell.currentProduction.choke} mm
                          </strong>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Bunnhullstemperatur (BHT)</TableCell>
                        <TableCell align='right'>
                          <strong>
                            {selectedWell.currentProduction.bht}°C
                          </strong>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Total Dybde (TD)</TableCell>
                        <TableCell align='right'>
                          <strong>
                            {selectedWell.totalDepth.toLocaleString('nb-NO')} m
                          </strong>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Vertikal Dybde (TVD)</TableCell>
                        <TableCell align='right'>
                          <strong>
                            {selectedWell.tvd.toLocaleString('nb-NO')} m
                          </strong>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Box>
          </TabPanel>

          {/* Reservoir Tab */}
          <TabPanel value={selectedTab} index={1}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                gap: 3,
              }}
            >
              <Paper sx={{ p: 3 }}>
                <Typography variant='h6' gutterBottom>
                  {petroleumTerminology.reservoirRock} Egenskaper
                </Typography>
                <TableContainer>
                  <Table size='small'>
                    <TableBody>
                      <TableRow>
                        <TableCell>Formasjon</TableCell>
                        <TableCell align='right'>
                          <strong>
                            {selectedWell.reservoirData.formation}
                          </strong>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          {petroleumTerminology.porosityPermeability}
                        </TableCell>
                        <TableCell align='right'>
                          <strong>
                            {selectedWell.reservoirData.porosity}% /{' '}
                            {selectedWell.reservoirData.permeability} mD
                          </strong>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          {petroleumTerminology.reservoirPressure}
                        </TableCell>
                        <TableCell align='right'>
                          <strong>
                            {selectedWell.reservoirData.pressure} bar
                          </strong>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Reservoar Temperatur</TableCell>
                        <TableCell align='right'>
                          <strong>
                            {selectedWell.reservoirData.temperature}°C
                          </strong>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>

              <Paper sx={{ p: 3 }}>
                <Typography variant='h6' gutterBottom>
                  {petroleumTerminology.fluidSaturation}
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant='body2' sx={{ mb: 1 }}>
                    Olje Metning: {selectedWell.reservoirData.saturation.oil}%
                  </Typography>
                  <LinearProgress
                    variant='determinate'
                    value={selectedWell.reservoirData.saturation.oil}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: '#0891b2',
                      },
                    }}
                  />
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant='body2' sx={{ mb: 1 }}>
                    Vann Metning: {selectedWell.reservoirData.saturation.water}%
                  </Typography>
                  <LinearProgress
                    variant='determinate'
                    value={selectedWell.reservoirData.saturation.water}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: '#0ea5e9',
                      },
                    }}
                  />
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant='body2' sx={{ mb: 1 }}>
                    Gass Metning: {selectedWell.reservoirData.saturation.gas}%
                  </Typography>
                  <LinearProgress
                    variant='determinate'
                    value={selectedWell.reservoirData.saturation.gas}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: '#f59e0b',
                      },
                    }}
                  />
                </Box>
              </Paper>
            </Box>
          </TabPanel>

          {/* Drilling Tab */}
          <TabPanel value={selectedTab} index={2}>
            {selectedWell.drillingParameters ? (
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                  gap: 3,
                }}
              >
                <Paper sx={{ p: 3 }}>
                  <Typography variant='h6' gutterBottom>
                    Boreparameter
                  </Typography>
                  <TableContainer>
                    <Table size='small'>
                      <TableBody>
                        <TableRow>
                          <TableCell>Rate of Penetration (ROP)</TableCell>
                          <TableCell align='right'>
                            <strong>
                              {selectedWell.drillingParameters.rop} m/t
                            </strong>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Weight on Bit (WOB)</TableCell>
                          <TableCell align='right'>
                            <strong>
                              {selectedWell.drillingParameters.wob} kN
                            </strong>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Rotasjonshastighet (RPM)</TableCell>
                          <TableCell align='right'>
                            <strong>
                              {selectedWell.drillingParameters.rpm} rpm
                            </strong>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Dreiemoment</TableCell>
                          <TableCell align='right'>
                            <strong>
                              {selectedWell.drillingParameters.torque} kNm
                            </strong>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>

                <Paper sx={{ p: 3 }}>
                  <Typography variant='h6' gutterBottom>
                    {petroleumTerminology.mudLogging}
                  </Typography>
                  <TableContainer>
                    <Table size='small'>
                      <TableBody>
                        <TableRow>
                          <TableCell>Borevæsketetthet</TableCell>
                          <TableCell align='right'>
                            <strong>
                              {selectedWell.drillingParameters.mudWeight} kg/m³
                            </strong>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Viskositet</TableCell>
                          <TableCell align='right'>
                            <strong>
                              {selectedWell.drillingParameters.mudViscosity} cP
                            </strong>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Strømningshastighet</TableCell>
                          <TableCell align='right'>
                            <strong>
                              {selectedWell.drillingParameters.flowRate} l/min
                            </strong>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </Box>
            ) : (
              <Alert severity='info'>
                Boreparameter er kun tilgjengelig for brønner under boring.
              </Alert>
            )}
          </TabPanel>

          {/* Analysis Tab */}
          <TabPanel value={selectedTab} index={3}>
            <Paper sx={{ p: 3 }}>
              <Typography variant='h6' gutterBottom>
                Ytelsesanalyse og Anbefalinger
              </Typography>
              <Box sx={{ display: 'grid', gap: 2 }}>
                {selectedWell.status === 'active' && (
                  <>
                    <Alert severity='success'>
                      <strong>Produksjonsytelse:</strong> Brønnen produserer
                      innenfor forventede parametere.
                      {selectedWell.currentProduction.oil > 2000 &&
                        ' Høy olje-rate indikerer god reservoarkobling.'}
                    </Alert>

                    {selectedWell.currentProduction.wor > 0.5 && (
                      <Alert severity='warning'>
                        <strong>Vanninntrengning:</strong> Økende vannproduksjon
                        ({(selectedWell.currentProduction.wor * 100).toFixed(1)}
                        %). Anbefaler {petroleumTerminology.waterInjection}{' '}
                        optimalisering eller{' '}
                        {petroleumTerminology.artificialLift} vurdering.
                      </Alert>
                    )}

                    {selectedWell.currentProduction.whp < 100 && (
                      <Alert severity='warning'>
                        <strong>Lavt brønnhodetrykk:</strong> Trykket på{' '}
                        {selectedWell.currentProduction.whp} bar kan indikere
                        behov for {petroleumTerminology.gasLift} eller{' '}
                        {petroleumTerminology.electricSubmersiblePump}.
                      </Alert>
                    )}
                  </>
                )}

                {selectedWell.status === 'drilling' &&
                  selectedWell.drillingParameters && (
                    <>
                      <Alert severity='info'>
                        <strong>Boreutførelse:</strong> Nåværende ROP på{' '}
                        {selectedWell.drillingParameters.rop} m/t er{' '}
                        {selectedWell.drillingParameters.rop > 10
                          ? 'god'
                          : 'lav'}{' '}
                        for {selectedWell.reservoirData.formation} formasjon.
                      </Alert>

                      {selectedWell.drillingParameters.mudWeight > 1400 && (
                        <Alert severity='warning'>
                          <strong>Borevæsketetthet:</strong> Høy tetthet (
                          {selectedWell.drillingParameters.mudWeight} kg/m³) kan
                          indikere trykkproblemer. Vurder styrt trykkboring
                          (MPD).
                        </Alert>
                      )}
                    </>
                  )}

                <Alert severity='info'>
                  <strong>Reservoaregenskaper:</strong> Porøsitet på{' '}
                  {selectedWell.reservoirData.porosity}% og permeabilitet på{' '}
                  {selectedWell.reservoirData.permeability} mD indikerer
                  {selectedWell.reservoirData.permeability > 100
                    ? ' god'
                    : ' moderat'}{' '}
                  reservoarkvalitet.
                </Alert>
              </Box>
            </Paper>
          </TabPanel>
        </CardContent>
      </Card>
    </Container>
  );
};

export default WellPerformanceAnalytics;
