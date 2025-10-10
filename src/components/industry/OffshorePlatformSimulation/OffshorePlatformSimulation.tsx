/**
 * Offshore Platform Simulation Component (Simplified)
 * Demonstrates understanding of Norwegian Continental Shelf operations
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
  LinearProgress 
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { norwegianTranslations } from '../../../constants/norwegianLocalization';

// Styled components for offshore platform visualization
const PlatformCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
  color: 'white',
  minHeight: '200px',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
    opacity: 0.3,
  }
}));

const WeatherCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)',
  color: 'white',
}));

const ProductionCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, #b45309 0%, #f59e0b 100%)',
  color: 'white',
}));

const SafetyCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
  color: 'white',
}));

// Interfaces for offshore platform data
interface WeatherData {
  windSpeed: number;
  waveHeight: number;
  visibility: number;
  temperature: number;
  seaState: number;
  weatherWindow: boolean;
}

interface ProductionData {
  oilProduction: number;
  gasProduction: number;
  waterProduction: number;
  efficiency: number;
  pressure: number;
  temperature: number;
}

interface SafetyStatus {
  personnelOnboard: number;
  daysWithoutIncident: number;
  safetyScore: number;
  emergencyStatus: 'normal' | 'warning' | 'critical';
  lastInspection: Date;
}

interface PlatformData {
  name: string;
  location: {
    field: string;
    sector: string;
    coordinates: { lat: number; lng: number };
  };
  weather: WeatherData;
  production: ProductionData;
  safety: SafetyStatus;
  operational: boolean;
}

// Mock data for Norwegian Continental Shelf platforms
const mockPlatformData: PlatformData[] = [
  {
    name: 'Troll A',
    location: {
      field: 'Troll',
      sector: 'Nordsjøen',
      coordinates: { lat: 60.6436, lng: 3.7167 }
    },
    weather: {
      windSpeed: 15.2,
      waveHeight: 2.8,
      visibility: 8.5,
      temperature: 4.2,
      seaState: 3,
      weatherWindow: true
    },
    production: {
      oilProduction: 85600,
      gasProduction: 142000,
      waterProduction: 12400,
      efficiency: 94.2,
      pressure: 180.5,
      temperature: 35.8
    },
    safety: {
      personnelOnboard: 178,
      daysWithoutIncident: 423,
      safetyScore: 98.5,
      emergencyStatus: 'normal',
      lastInspection: new Date('2024-01-10')
    },
    operational: true
  },
  {
    name: 'Ekofisk Complex',
    location: {
      field: 'Ekofisk',
      sector: 'Nordsjøen',
      coordinates: { lat: 56.5461, lng: 3.2128 }
    },
    weather: {
      windSpeed: 22.8,
      waveHeight: 4.2,
      visibility: 6.2,
      temperature: 2.8,
      seaState: 4,
      weatherWindow: false
    },
    production: {
      oilProduction: 156200,
      gasProduction: 89400,
      waterProduction: 18700,
      efficiency: 91.7,
      pressure: 195.2,
      temperature: 42.1
    },
    safety: {
      personnelOnboard: 245,
      daysWithoutIncident: 156,
      safetyScore: 96.8,
      emergencyStatus: 'normal',
      lastInspection: new Date('2023-12-15')
    },
    operational: true
  },
  {
    name: 'Snøhvit',
    location: {
      field: 'Snøhvit',
      sector: 'Barentshavet',
      coordinates: { lat: 71.2906, lng: 21.8989 }
    },
    weather: {
      windSpeed: 28.5,
      waveHeight: 5.8,
      visibility: 3.2,
      temperature: -2.4,
      seaState: 5,
      weatherWindow: false
    },
    production: {
      oilProduction: 0, // Gas field
      gasProduction: 285000,
      waterProduction: 5600,
      efficiency: 88.3,
      pressure: 165.8,
      temperature: 28.9
    },
    safety: {
      personnelOnboard: 98,
      daysWithoutIncident: 892,
      safetyScore: 99.2,
      emergencyStatus: 'warning', // Due to weather
      lastInspection: new Date('2024-01-05')
    },
    operational: true
  }
];

export const OffshorePlatformSimulation: React.FC = () => {
  const [platforms, setPlatforms] = useState<PlatformData[]>(mockPlatformData);
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformData>(mockPlatformData[0]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPlatforms(prev => prev.map(platform => ({
        ...platform,
        weather: {
          ...platform.weather,
          windSpeed: Math.max(0, platform.weather.windSpeed + (Math.random() - 0.5) * 2),
          waveHeight: Math.max(0, platform.weather.waveHeight + (Math.random() - 0.5) * 0.5),
          visibility: Math.min(10, Math.max(0, platform.weather.visibility + (Math.random() - 0.5))),
          temperature: platform.weather.temperature + (Math.random() - 0.5) * 0.5,
          weatherWindow: platform.weather.windSpeed < 20 && platform.weather.waveHeight < 4
        },
        production: {
          ...platform.production,
          oilProduction: Math.max(0, platform.production.oilProduction + (Math.random() - 0.5) * 1000),
          gasProduction: Math.max(0, platform.production.gasProduction + (Math.random() - 0.5) * 2000),
          efficiency: Math.min(100, Math.max(70, platform.production.efficiency + (Math.random() - 0.5) * 0.5)),
          pressure: Math.max(0, platform.production.pressure + (Math.random() - 0.5) * 2),
          temperature: Math.max(0, platform.production.temperature + (Math.random() - 0.5))
        }
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getWeatherStatus = (weather: WeatherData): 'success' | 'warning' | 'error' => {
    if (weather.windSpeed > 25 || weather.waveHeight > 4.5) return 'error';
    if (weather.windSpeed > 20 || weather.waveHeight > 3.5) return 'warning';
    return 'success';
  };

  const getSafetyStatusColor = (status: string): 'success' | 'warning' | 'error' => {
    switch (status) {
      case 'normal': return 'success';
      case 'warning': return 'warning';
      case 'critical': return 'error';
      default: return 'success';
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
        {norwegianTranslations.offshorePlatform} {norwegianTranslations.dashboard}
      </Typography>
      
      <Typography variant="subtitle1" sx={{ mb: 4, color: 'text.secondary' }}>
        {norwegianTranslations.realTime} overvåking av {norwegianTranslations.continentalShelf} operasjoner
      </Typography>

      {/* Platform Selection */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2 }}>
          {platforms.map((platform) => (
            <PlatformCard 
              key={platform.name}
              sx={{ 
                cursor: 'pointer',
                border: selectedPlatform.name === platform.name ? '2px solid #fbbf24' : 'none'
              }}
              onClick={() => setSelectedPlatform(platform)}
            >
              <CardContent sx={{ position: 'relative', zIndex: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {platform.name}
                </Typography>
                <Typography variant="body2" sx={{ mb: 2, opacity: 0.9 }}>
                  {platform.location.field} - {platform.location.sector}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                  <Chip 
                    label={platform.operational ? norwegianTranslations.operational : norwegianTranslations.maintenance}
                    color={platform.operational ? 'success' : 'warning'}
                    size="small"
                  />
                  <Chip 
                    label={`${platform.safety.personnelOnboard} ${norwegianTranslations.personnel}`}
                    variant="outlined"
                    size="small"
                    sx={{ color: 'white', borderColor: 'white' }}
                  />
                </Box>
              </CardContent>
            </PlatformCard>
          ))}
        </Box>
      </Box>

      {/* Selected Platform Details */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, mb: 4 }}>
        {/* Weather Conditions */}
        <WeatherCard>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {norwegianTranslations.weather} {norwegianTranslations.conditions}
            </Typography>
            
            <Alert 
              severity={getWeatherStatus(selectedPlatform.weather)} 
              sx={{ mb: 2 }}
            >
              {selectedPlatform.weather.weatherWindow 
                ? `${norwegianTranslations.weatherWindow} åpent`
                : `${norwegianTranslations.weatherWindow} stengt`
              }
            </Alert>

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <Box>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  {norwegianTranslations.windSpeed}
                </Typography>
                <Typography variant="h6">
                  {selectedPlatform.weather.windSpeed.toFixed(1)} m/s
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  {norwegianTranslations.waveHeight}
                </Typography>
                <Typography variant="h6">
                  {selectedPlatform.weather.waveHeight.toFixed(1)} m
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  {norwegianTranslations.visibility}
                </Typography>
                <Typography variant="h6">
                  {selectedPlatform.weather.visibility.toFixed(1)} km
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  {norwegianTranslations.temperature}
                </Typography>
                <Typography variant="h6">
                  {selectedPlatform.weather.temperature.toFixed(1)}°C
                </Typography>
              </Box>
            </Box>

            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
                {norwegianTranslations.seaState}: {selectedPlatform.weather.seaState}/6
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={(selectedPlatform.weather.seaState / 6) * 100}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: 'rgba(255,255,255,0.3)',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: selectedPlatform.weather.seaState > 4 ? '#ef4444' : '#10b981'
                  }
                }}
              />
            </Box>
          </CardContent>
        </WeatherCard>

        {/* Production Status */}
        <ProductionCard>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {norwegianTranslations.production} {norwegianTranslations.status}
            </Typography>
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
                {norwegianTranslations.efficiency}: {selectedPlatform.production.efficiency.toFixed(1)}%
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={selectedPlatform.production.efficiency}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: 'rgba(255,255,255,0.3)',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: '#10b981'
                  }
                }}
              />
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              {selectedPlatform.production.oilProduction > 0 && (
                <Box sx={{ gridColumn: '1 / -1' }}>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    {norwegianTranslations.oilProduction}
                  </Typography>
                  <Typography variant="h6">
                    {selectedPlatform.production.oilProduction.toLocaleString('nb-NO')} {norwegianTranslations.barrelsPerDay}
                  </Typography>
                </Box>
              )}
              <Box sx={{ gridColumn: '1 / -1' }}>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  {norwegianTranslations.gasProduction}
                </Typography>
                <Typography variant="h6">
                  {selectedPlatform.production.gasProduction.toLocaleString('nb-NO')} Sm³/dag
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  {norwegianTranslations.pressure}
                </Typography>
                <Typography variant="h6">
                  {selectedPlatform.production.pressure.toFixed(1)} bar
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  {norwegianTranslations.temperature}
                </Typography>
                <Typography variant="h6">
                  {selectedPlatform.production.temperature.toFixed(1)}°C
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </ProductionCard>
      </Box>

      {/* Safety Status */}
      <SafetyCard sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {norwegianTranslations.safetyScore} & HMS Status
          </Typography>
          
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 3 }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                {selectedPlatform.safety.daysWithoutIncident}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                {norwegianTranslations.daysWithoutIncident}
              </Typography>
            </Box>
            
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                {selectedPlatform.safety.personnelOnboard}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                {norwegianTranslations.personnel} {norwegianTranslations.onboard}
              </Typography>
            </Box>
            
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                {selectedPlatform.safety.safetyScore.toFixed(1)}%
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                HMS Score
              </Typography>
            </Box>
            
            <Box sx={{ textAlign: 'center' }}>
              <Chip 
                label={selectedPlatform.safety.emergencyStatus.toUpperCase()}
                color={getSafetyStatusColor(selectedPlatform.safety.emergencyStatus)}
                sx={{ fontSize: '1rem', fontWeight: 'bold', px: 2, py: 1, mb: 1 }}
              />
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Emergency Status
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </SafetyCard>

      {/* Real-time Status */}
      <Box sx={{ textAlign: 'center' }}>
        <Chip 
          label={`${norwegianTranslations.realTime} - ${norwegianTranslations.lastUpdated}: ${new Date().toLocaleTimeString('nb-NO')}`}
          color="primary"
          variant="outlined"
        />
      </Box>
    </Container>
  );
};

export default OffshorePlatformSimulation;