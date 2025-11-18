/**
 * Carbon Footprint Calculator Component
 * Interactive calculator for carbon emissions tracking and reduction recommendations
 * Supports Scope 1, 2, and 3 emissions with industry-specific calculations
 */

import React, { useState, useMemo } from 'react';
import { 
  Container, 
  Card, 
  CardContent, 
  Typography, 
  Box,
  TextField,
  Button,
  Chip,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
  Tabs,
  Tab,
  IconButton,
  Tooltip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Calculate,
  TrendingDown,
  TrendingUp,
  Nature,
  Info,
  Download,
  Refresh,
  EnergySavingsLeaf
} from '@mui/icons-material';

// Styled components
const CalculatorContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: '1400px',
}));

const ResultCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
  color: 'white',
  marginBottom: theme.spacing(3),
}));

const EmissionCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  borderLeft: `4px solid ${theme.palette.primary.main}`,
}));

// Emission factors (kg CO2e per unit)
const EMISSION_FACTORS = {
  // Energy (kg CO2e/kWh)
  electricity: {
    grid: 0.5, // Average grid electricity
    coal: 0.9,
    naturalGas: 0.4,
    renewable: 0.01,
  },
  // Fuel (kg CO2e/liter)
  fuel: {
    diesel: 2.68,
    gasoline: 2.31,
    naturalGas: 2.0, // per m³
    lpg: 1.51,
  },
  // Transport (kg CO2e/km)
  transport: {
    car: 0.2,
    truck: 0.8,
    ship: 0.015,
    aircraft: 0.25,
  },
  // Operations
  flaring: 3.5, // kg CO2e per m³ of gas flared
  venting: 28.0, // kg CO2e per m³ of gas vented (methane)
};

interface EmissionData {
  scope1: number;
  scope2: number;
  scope3: number;
  total: number;
  intensity: number;
  breakdown: {
    energy: number;
    fuel: number;
    flaring: number;
    venting: number;
    transport: number;
  };
}

interface CalculatorInputs {
  // Scope 1 - Direct emissions
  electricityConsumption: string;
  electricitySource: keyof typeof EMISSION_FACTORS.electricity;
  dieselConsumption: string;
  naturalGasConsumption: string;
  flaringVolume: string;
  ventingVolume: string;
  
  // Scope 2 - Indirect energy emissions
  purchasedElectricity: string;
  
  // Scope 3 - Value chain
  transportDistance: string;
  transportMode: keyof typeof EMISSION_FACTORS.transport;
  
  // Production data for intensity calculation
  productionVolume: string;
  productionUnit: 'bbl' | 'mcf' | 'tonnes';
}

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

export const CarbonFootprintCalculator: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [inputs, setInputs] = useState<CalculatorInputs>({
    electricityConsumption: '1000',
    electricitySource: 'grid',
    dieselConsumption: '500',
    naturalGasConsumption: '200',
    flaringVolume: '50',
    ventingVolume: '10',
    purchasedElectricity: '2000',
    transportDistance: '500',
    transportMode: 'truck',
    productionVolume: '1000',
    productionUnit: 'bbl',
  });

  const handleInputChange = (field: keyof CalculatorInputs) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputs(prev => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const calculateEmissions = useMemo((): EmissionData => {
    // Scope 1 - Direct emissions
    const electricityEmissions = 
      parseFloat(inputs.electricityConsumption || '0') * 
      EMISSION_FACTORS.electricity[inputs.electricitySource];
    
    const dieselEmissions = 
      parseFloat(inputs.dieselConsumption || '0') * 
      EMISSION_FACTORS.fuel.diesel;
    
    const naturalGasEmissions = 
      parseFloat(inputs.naturalGasConsumption || '0') * 
      EMISSION_FACTORS.fuel.naturalGas;
    
    const flaringEmissions = 
      parseFloat(inputs.flaringVolume || '0') * 
      EMISSION_FACTORS.flaring;
    
    const ventingEmissions = 
      parseFloat(inputs.ventingVolume || '0') * 
      EMISSION_FACTORS.venting;
    
    const scope1 = 
      electricityEmissions + 
      dieselEmissions + 
      naturalGasEmissions + 
      flaringEmissions + 
      ventingEmissions;

    // Scope 2 - Indirect emissions from purchased energy
    const scope2 = 
      parseFloat(inputs.purchasedElectricity || '0') * 
      EMISSION_FACTORS.electricity.grid;

    // Scope 3 - Value chain emissions
    const transportEmissions = 
      parseFloat(inputs.transportDistance || '0') * 
      EMISSION_FACTORS.transport[inputs.transportMode];
    
    const scope3 = transportEmissions;

    const total = scope1 + scope2 + scope3;
    
    // Calculate carbon intensity (kg CO2e per unit of production)
    const productionVolume = parseFloat(inputs.productionVolume || '1');
    const intensity = total / productionVolume;

    return {
      scope1,
      scope2,
      scope3,
      total,
      intensity,
      breakdown: {
        energy: electricityEmissions,
        fuel: dieselEmissions + naturalGasEmissions,
        flaring: flaringEmissions,
        venting: ventingEmissions,
        transport: transportEmissions,
      },
    };
  }, [inputs]);

  const getRecommendations = () => {
    const recommendations = [];
    
    if (inputs.electricitySource !== 'renewable') {
      recommendations.push({
        title: 'Switch to Renewable Energy',
        impact: 'High',
        reduction: Math.round(calculateEmissions.breakdown.energy * 0.98),
        description: 'Transition to renewable energy sources can reduce emissions by up to 98%',
      });
    }
    
    if (parseFloat(inputs.flaringVolume || '0') > 0) {
      recommendations.push({
        title: 'Reduce Flaring',
        impact: 'High',
        reduction: Math.round(calculateEmissions.breakdown.flaring * 0.7),
        description: 'Implement flare gas recovery systems to capture and utilize gas',
      });
    }
    
    if (parseFloat(inputs.ventingVolume || '0') > 0) {
      recommendations.push({
        title: 'Eliminate Venting',
        impact: 'Critical',
        reduction: Math.round(calculateEmissions.breakdown.venting),
        description: 'Methane venting has 28x global warming potential - capture or combust',
      });
    }
    
    if (inputs.transportMode !== 'ship') {
      const currentTransport = calculateEmissions.breakdown.transport;
      const shipTransport = 
        parseFloat(inputs.transportDistance || '0') * 
        EMISSION_FACTORS.transport.ship;
      if (shipTransport < currentTransport) {
        recommendations.push({
          title: 'Optimize Transportation',
          impact: 'Medium',
          reduction: Math.round(currentTransport - shipTransport),
          description: 'Consider maritime transport for lower emissions per km',
        });
      }
    }
    
    recommendations.push({
      title: 'Energy Efficiency Improvements',
      impact: 'Medium',
      reduction: Math.round(calculateEmissions.total * 0.15),
      description: 'Upgrade equipment and optimize processes for 15% efficiency gain',
    });
    
    return recommendations;
  };

  const recommendations = getRecommendations();
  const totalPotentialReduction = recommendations.reduce((sum, rec) => sum + rec.reduction, 0);

  const handleReset = () => {
    setInputs({
      electricityConsumption: '1000',
      electricitySource: 'grid',
      dieselConsumption: '500',
      naturalGasConsumption: '200',
      flaringVolume: '50',
      ventingVolume: '10',
      purchasedElectricity: '2000',
      transportDistance: '500',
      transportMode: 'truck',
      productionVolume: '1000',
      productionUnit: 'bbl',
    });
  };

  const handleExport = () => {
    const exportData = {
      timestamp: new Date().toISOString(),
      inputs,
      results: calculateEmissions,
      recommendations,
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `carbon-footprint-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <CalculatorContainer>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 2 }}>
          <Calculate fontSize="large" color="primary" />
          Carbon Footprint Calculator
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Calculate emissions across Scope 1, 2, and 3 with actionable reduction recommendations
        </Typography>
      </Box>

      {/* Results Summary */}
      <ResultCard>
        <CardContent>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' }, gap: 3 }}>
            <Box>
              <Typography variant="subtitle2" sx={{ opacity: 0.8, mb: 1 }}>
                Total Emissions
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                {calculateEmissions.total.toLocaleString()}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                kg CO₂e
              </Typography>
            </Box>
            
            <Box>
              <Typography variant="subtitle2" sx={{ opacity: 0.8, mb: 1 }}>
                Carbon Intensity
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                {calculateEmissions.intensity.toFixed(2)}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                kg CO₂e/{inputs.productionUnit}
              </Typography>
            </Box>
            
            <Box>
              <Typography variant="subtitle2" sx={{ opacity: 0.8, mb: 1 }}>
                Potential Reduction
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#4ade80' }}>
                {totalPotentialReduction.toLocaleString()}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                kg CO₂e ({((totalPotentialReduction / calculateEmissions.total) * 100).toFixed(1)}%)
              </Typography>
            </Box>
            
            <Box>
              <Typography variant="subtitle2" sx={{ opacity: 0.8, mb: 1 }}>
                Recommendations
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                {recommendations.length}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                actionable items
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </ResultCard>

      {/* Emissions Breakdown */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3, mb: 4 }}>
        <EmissionCard>
          <Typography variant="h6" gutterBottom color="primary" sx={{ fontWeight: 'bold' }}>
            Scope 1
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
            {calculateEmissions.scope1.toLocaleString()}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            kg CO₂e - Direct Emissions
          </Typography>
          <LinearProgress 
            variant="determinate" 
            value={(calculateEmissions.scope1 / calculateEmissions.total) * 100}
            sx={{ height: 8, borderRadius: 4 }}
          />
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            {((calculateEmissions.scope1 / calculateEmissions.total) * 100).toFixed(1)}% of total
          </Typography>
        </EmissionCard>
        
        <EmissionCard>
          <Typography variant="h6" gutterBottom color="warning.main" sx={{ fontWeight: 'bold' }}>
            Scope 2
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
            {calculateEmissions.scope2.toLocaleString()}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            kg CO₂e - Indirect Energy
          </Typography>
          <LinearProgress 
            variant="determinate" 
            value={(calculateEmissions.scope2 / calculateEmissions.total) * 100}
            sx={{ height: 8, borderRadius: 4 }}
            color="warning"
          />
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            {((calculateEmissions.scope2 / calculateEmissions.total) * 100).toFixed(1)}% of total
          </Typography>
        </EmissionCard>
        
        <EmissionCard>
          <Typography variant="h6" gutterBottom color="secondary.main" sx={{ fontWeight: 'bold' }}>
            Scope 3
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
            {calculateEmissions.scope3.toLocaleString()}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            kg CO₂e - Value Chain
          </Typography>
          <LinearProgress 
            variant="determinate" 
            value={(calculateEmissions.scope3 / calculateEmissions.total) * 100}
            sx={{ height: 8, borderRadius: 4 }}
            color="secondary"
          />
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            {((calculateEmissions.scope3 / calculateEmissions.total) * 100).toFixed(1)}% of total
          </Typography>
        </EmissionCard>
      </Box>

      {/* Input Form and Recommendations */}
      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2 }}>
          <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
            <Tab label="Calculator Input" icon={<Calculate />} iconPosition="start" />
            <Tab label="Recommendations" icon={<EnergySavingsLeaf />} iconPosition="start" />
          </Tabs>
          
          <Box>
            <Tooltip title="Reset all inputs">
              <IconButton onClick={handleReset} size="small">
                <Refresh />
              </IconButton>
            </Tooltip>
            <Tooltip title="Export results">
              <IconButton onClick={handleExport} size="small">
                <Download />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        <TabPanel value={activeTab} index={0}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3 }}>
            <Box>
              <Typography variant="h6" gutterBottom>
                Scope 1 - Direct Emissions
              </Typography>
              
              <TextField
                label="Electricity Consumption (kWh)"
                type="number"
                fullWidth
                margin="normal"
                value={inputs.electricityConsumption}
                onChange={handleInputChange('electricityConsumption')}
              />
              
              <TextField
                label="Electricity Source"
                select
                fullWidth
                margin="normal"
                value={inputs.electricitySource}
                onChange={handleInputChange('electricitySource')}
                SelectProps={{ native: true }}
              >
                <option value="grid">Grid Mix</option>
                <option value="coal">Coal</option>
                <option value="naturalGas">Natural Gas</option>
                <option value="renewable">Renewable</option>
              </TextField>
              
              <TextField
                label="Diesel Consumption (liters)"
                type="number"
                fullWidth
                margin="normal"
                value={inputs.dieselConsumption}
                onChange={handleInputChange('dieselConsumption')}
              />
              
              <TextField
                label="Natural Gas Consumption (m³)"
                type="number"
                fullWidth
                margin="normal"
                value={inputs.naturalGasConsumption}
                onChange={handleInputChange('naturalGasConsumption')}
              />
              
              <TextField
                label="Flaring Volume (m³)"
                type="number"
                fullWidth
                margin="normal"
                value={inputs.flaringVolume}
                onChange={handleInputChange('flaringVolume')}
              />
              
              <TextField
                label="Venting Volume (m³)"
                type="number"
                fullWidth
                margin="normal"
                value={inputs.ventingVolume}
                onChange={handleInputChange('ventingVolume')}
              />
            </Box>
            
            <Box>
              <Typography variant="h6" gutterBottom>
                Scope 2 & 3 - Indirect Emissions
              </Typography>
              
              <TextField
                label="Purchased Electricity (kWh)"
                type="number"
                fullWidth
                margin="normal"
                value={inputs.purchasedElectricity}
                onChange={handleInputChange('purchasedElectricity')}
              />
              
              <TextField
                label="Transport Distance (km)"
                type="number"
                fullWidth
                margin="normal"
                value={inputs.transportDistance}
                onChange={handleInputChange('transportDistance')}
              />
              
              <TextField
                label="Transport Mode"
                select
                fullWidth
                margin="normal"
                value={inputs.transportMode}
                onChange={handleInputChange('transportMode')}
                SelectProps={{ native: true }}
              >
                <option value="car">Car</option>
                <option value="truck">Truck</option>
                <option value="ship">Ship</option>
                <option value="aircraft">Aircraft</option>
              </TextField>
              
              <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                Production Data
              </Typography>
              
              <TextField
                label="Production Volume"
                type="number"
                fullWidth
                margin="normal"
                value={inputs.productionVolume}
                onChange={handleInputChange('productionVolume')}
              />
              
              <TextField
                label="Production Unit"
                select
                fullWidth
                margin="normal"
                value={inputs.productionUnit}
                onChange={handleInputChange('productionUnit')}
                SelectProps={{ native: true }}
              >
                <option value="bbl">Barrels (bbl)</option>
                <option value="mcf">MCF (thousand cubic feet)</option>
                <option value="tonnes">Tonnes</option>
              </TextField>
              
              <Alert severity="info" sx={{ mt: 2 }}>
                <Typography variant="body2">
                  All calculations use standard emission factors from GHG Protocol and IPCC guidelines.
                </Typography>
              </Alert>
            </Box>
          </Box>
        </TabPanel>

        <TabPanel value={activeTab} index={1}>
          <Typography variant="h6" gutterBottom>
            Reduction Recommendations
          </Typography>
          
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Recommendation</TableCell>
                  <TableCell>Impact</TableCell>
                  <TableCell align="right">Potential Reduction</TableCell>
                  <TableCell>Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recommendations.map((rec, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Nature color="success" />
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                          {rec.title}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={rec.impact}
                        color={
                          rec.impact === 'Critical' ? 'error' :
                          rec.impact === 'High' ? 'warning' :
                          'success'
                        }
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1 }}>
                        <TrendingDown color="success" />
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                          {rec.reduction.toLocaleString()} kg CO₂e
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {rec.description}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          
          <Alert severity="success" sx={{ mt: 3 }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
              Total Potential Impact
            </Typography>
            <Typography variant="body2">
              By implementing all recommendations, you could reduce emissions by{' '}
              <strong>{totalPotentialReduction.toLocaleString()} kg CO₂e</strong> 
              {' '}({((totalPotentialReduction / calculateEmissions.total) * 100).toFixed(1)}% reduction)
            </Typography>
          </Alert>
        </TabPanel>
      </Card>
    </CalculatorContainer>
  );
};

export default CarbonFootprintCalculator;

