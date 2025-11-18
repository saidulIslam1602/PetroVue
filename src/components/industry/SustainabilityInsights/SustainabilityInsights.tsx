/**
 * Sustainability Insights Dashboard
 * Real-time sustainability performance metrics and actionable insights
 * Designed with modern UX principles for clean data presentation
 */

import React, { useState } from 'react';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  LinearProgress,
  Avatar,
  Button,
} from '@mui/material';
import { GridLegacy as Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Nature,
  TrendingDown,
  TrendingUp,
  EnergySavingsLeaf,
  WaterDrop,
  RecyclingRounded,
  Co2,
  Assessment,
  ArrowForward,
  CheckCircle,
} from '@mui/icons-material';

// Styled components
const DashboardContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: '1600px',
}));

const InsightCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'transform 0.2s, box-shadow 0.2s',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8],
  },
}));

const MetricBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
  height: '100%',
}));

const ScoreCircle = styled(Box)(({ theme }) => ({
  width: 120,
  height: 120,
  borderRadius: '50%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
  color: 'white',
  boxShadow: theme.shadows[4],
}));

interface SustainabilityData {
  overallScore: number;
  carbonReduction: {
    current: number;
    target: number;
    percentage: number;
    trend: 'up' | 'down';
  };
  renewableEnergy: {
    current: number;
    target: number;
    percentage: number;
  };
  wasteRecycling: {
    current: number;
    target: number;
    percentage: number;
  };
  waterConservation: {
    current: number;
    target: number;
    percentage: number;
  };
  insights: Insight[];
  recommendations: Recommendation[];
  achievements: Achievement[];
}

interface Insight {
  id: string;
  category: 'energy' | 'emissions' | 'water' | 'waste';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  metric: string;
  trend: 'improving' | 'declining' | 'stable';
}

interface Recommendation {
  id: string;
  title: string;
  description: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  estimatedImpact: string;
  implementationTime: string;
  cost: 'low' | 'medium' | 'high';
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
}

// Mock data
const mockData: SustainabilityData = {
  overallScore: 87,
  carbonReduction: {
    current: 45000,
    target: 80000,
    percentage: 56.3,
    trend: 'up',
  },
  renewableEnergy: {
    current: 42,
    target: 60,
    percentage: 70,
  },
  wasteRecycling: {
    current: 78,
    target: 85,
    percentage: 91.8,
  },
  waterConservation: {
    current: 32,
    target: 40,
    percentage: 80,
  },
  insights: [
    {
      id: '1',
      category: 'emissions',
      title: 'Carbon Emissions Declining',
      description: 'CO₂ emissions decreased by 12% compared to last quarter through electrification initiatives',
      impact: 'high',
      metric: '-12% QoQ',
      trend: 'improving',
    },
    {
      id: '2',
      category: 'energy',
      title: 'Renewable Energy Integration Ahead of Schedule',
      description: 'Offshore wind integration surpassing targets, contributing to 42% renewable energy mix',
      impact: 'high',
      metric: '+8% vs target',
      trend: 'improving',
    },
    {
      id: '3',
      category: 'water',
      title: 'Water Recycling Efficiency Improved',
      description: 'New water treatment systems increased recycling rate from 68% to 78%',
      impact: 'medium',
      metric: '+10% efficiency',
      trend: 'improving',
    },
    {
      id: '4',
      category: 'waste',
      title: 'Waste Reduction Opportunity Identified',
      description: 'Analysis shows 15% of operational waste could be diverted to recycling streams',
      impact: 'medium',
      metric: '15% potential',
      trend: 'stable',
    },
  ],
  recommendations: [
    {
      id: '1',
      title: 'Implement Heat Recovery Systems',
      description: 'Install heat recovery systems on gas turbines to reduce fuel consumption by 8-10%',
      priority: 'high',
      estimatedImpact: '8,000 tonnes CO₂e/year',
      implementationTime: '6-8 months',
      cost: 'medium',
    },
    {
      id: '2',
      title: 'Expand Solar Panel Installation',
      description: 'Increase solar capacity on offshore platforms to supplement power generation',
      priority: 'medium',
      estimatedImpact: '2,500 tonnes CO₂e/year',
      implementationTime: '3-4 months',
      cost: 'medium',
    },
    {
      id: '3',
      title: 'Upgrade to LED Lighting',
      description: 'Replace all remaining traditional lighting with LED systems across facilities',
      priority: 'low',
      estimatedImpact: '500 tonnes CO₂e/year',
      implementationTime: '2-3 months',
      cost: 'low',
    },
  ],
  achievements: [
    {
      id: '1',
      title: 'Zero Flaring Milestone',
      description: 'Achieved zero routine flaring across all Norwegian Continental Shelf operations',
      date: '2024-11',
      category: 'Emissions',
    },
    {
      id: '2',
      title: 'ISO 14001 Recertification',
      description: 'Successfully renewed ISO 14001 Environmental Management certification',
      date: '2024-10',
      category: 'Compliance',
    },
    {
      id: '3',
      title: '1 Million Hours Zero Incidents',
      description: 'Reached 1 million working hours without environmental incidents',
      date: '2024-09',
      category: 'Safety',
    },
  ],
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'energy':
      return <EnergySavingsLeaf />;
    case 'emissions':
      return <Co2 />;
    case 'water':
      return <WaterDrop />;
    case 'waste':
      return <RecyclingRounded />;
    default:
      return <Nature />;
  }
};

const getImpactColor = (impact: string) => {
  switch (impact) {
    case 'high':
      return 'error';
    case 'medium':
      return 'warning';
    case 'low':
      return 'success';
    default:
      return 'default';
  }
};

const getPriorityColor = (priority: string): 'error' | 'warning' | 'info' | 'default' => {
  switch (priority) {
    case 'critical':
      return 'error';
    case 'high':
      return 'warning';
    case 'medium':
      return 'info';
    case 'low':
      return 'default';
    default:
      return 'default';
  }
};

export const SustainabilityInsights: React.FC = () => {
  const [data] = useState<SustainabilityData>(mockData);

  return (
    <DashboardContainer>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 2 }}>
          <Nature fontSize="large" color="success" />
          Sustainability Insights
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Real-time performance tracking and actionable environmental insights
        </Typography>
      </Box>

      {/* Overall Score & Key Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <Card sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', py: 3 }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <ScoreCircle>
                <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
                  {data.overallScore}
                </Typography>
                <Typography variant="caption">
                  Overall Score
                </Typography>
              </ScoreCircle>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                Sustainability Performance Index
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={9}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <MetricBox>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Carbon Reduction Progress
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                      {data.carbonReduction.percentage}%
                    </Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: 'success.main' }}>
                    <Co2 />
                  </Avatar>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={data.carbonReduction.percentage} 
                  sx={{ height: 8, borderRadius: 4, mb: 1 }}
                  color="success"
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="caption" color="text.secondary">
                    {data.carbonReduction.current.toLocaleString()} / {data.carbonReduction.target.toLocaleString()} tonnes CO₂e
                  </Typography>
                  <Chip 
                    icon={<TrendingDown />} 
                    label="On Track" 
                    color="success" 
                    size="small" 
                  />
                </Box>
              </MetricBox>
            </Grid>

            <Grid item xs={12} sm={6}>
              <MetricBox>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Renewable Energy Mix
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                      {data.renewableEnergy.current}%
                    </Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                    <EnergySavingsLeaf />
                  </Avatar>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={data.renewableEnergy.percentage} 
                  sx={{ height: 8, borderRadius: 4, mb: 1 }}
                  color="primary"
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="caption" color="text.secondary">
                    Target: {data.renewableEnergy.target}% by 2025
                  </Typography>
                  <Chip 
                    icon={<TrendingUp />} 
                    label="Ahead" 
                    color="primary" 
                    size="small" 
                  />
                </Box>
              </MetricBox>
            </Grid>

            <Grid item xs={12} sm={6}>
              <MetricBox>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Waste Recycling Rate
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                      {data.wasteRecycling.current}%
                    </Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: 'info.main' }}>
                    <RecyclingRounded />
                  </Avatar>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={data.wasteRecycling.percentage} 
                  sx={{ height: 8, borderRadius: 4, mb: 1 }}
                  color="info"
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="caption" color="text.secondary">
                    Target: {data.wasteRecycling.target}%
                  </Typography>
                  <Chip 
                    label="Near Target" 
                    color="info" 
                    size="small" 
                  />
                </Box>
              </MetricBox>
            </Grid>

            <Grid item xs={12} sm={6}>
              <MetricBox>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Water Conservation
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                      {data.waterConservation.current}%
                    </Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: 'secondary.main' }}>
                    <WaterDrop />
                  </Avatar>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={data.waterConservation.percentage} 
                  sx={{ height: 8, borderRadius: 4, mb: 1 }}
                  color="secondary"
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="caption" color="text.secondary">
                    Reduction vs baseline: {data.waterConservation.current}%
                  </Typography>
                  <Chip 
                    label="Improving" 
                    color="secondary" 
                    size="small" 
                  />
                </Box>
              </MetricBox>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Key Insights */}
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
        Key Insights
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {data.insights.map((insight) => (
          <Grid item xs={12} md={6} key={insight.id}>
            <InsightCard>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'start' }}>
                    <Avatar sx={{ bgcolor: `${insight.trend === 'improving' ? 'success' : 'warning'}.light` }}>
                      {getCategoryIcon(insight.category)}
                    </Avatar>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                        {insight.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {insight.description}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                  <Chip 
                    label={insight.metric} 
                    color={insight.trend === 'improving' ? 'success' : 'warning'}
                    size="small" 
                  />
                  <Chip 
                    label={`${insight.impact.toUpperCase()} Impact`} 
                    color={getImpactColor(insight.impact)} 
                    size="small"
                    variant="outlined"
                  />
                  <Chip 
                    label={insight.category.toUpperCase()} 
                    size="small"
                    variant="outlined"
                  />
                </Box>
              </CardContent>
            </InsightCard>
          </Grid>
        ))}
      </Grid>

      {/* Recommendations */}
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
        Recommended Actions
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {data.recommendations.map((rec) => (
          <Grid item xs={12} key={rec.id}>
            <InsightCard>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {rec.title}
                      </Typography>
                      <Chip 
                        label={rec.priority.toUpperCase()} 
                        color={getPriorityColor(rec.priority)} 
                        size="small"
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {rec.description}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                      <Chip 
                        icon={<Assessment />}
                        label={`Impact: ${rec.estimatedImpact}`} 
                        size="small"
                        variant="outlined"
                      />
                      <Chip 
                        label={`Timeline: ${rec.implementationTime}`} 
                        size="small"
                        variant="outlined"
                      />
                      <Chip 
                        label={`Cost: ${rec.cost.toUpperCase()}`} 
                        size="small"
                        variant="outlined"
                      />
                    </Box>
                  </Box>
                  <Button 
                    variant="outlined" 
                    endIcon={<ArrowForward />}
                    sx={{ ml: 2 }}
                  >
                    View Details
                  </Button>
                </Box>
              </CardContent>
            </InsightCard>
          </Grid>
        ))}
      </Grid>

      {/* Recent Achievements */}
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
        Recent Achievements
      </Typography>
      <Grid container spacing={3}>
        {data.achievements.map((achievement) => (
          <Grid item xs={12} md={4} key={achievement.id}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  <Avatar sx={{ bgcolor: 'success.main', width: 56, height: 56 }}>
                    <CheckCircle fontSize="large" />
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      {achievement.category}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(achievement.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long' 
                      })}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {achievement.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {achievement.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </DashboardContainer>
  );
};

export default SustainabilityInsights;

