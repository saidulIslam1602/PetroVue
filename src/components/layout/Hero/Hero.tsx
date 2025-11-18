/**
 * Hero Section Component
 * Modern hero section with animations and imagery
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Box, Container, Typography, Button } from '@mui/material';
import { GridLegacy as Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { TrendingUp, Nature, Assessment, ArrowForward } from '@mui/icons-material';
import { AnimatedCounter } from '../../ui/AnimatedCounter/AnimatedCounter';

const HeroSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  minHeight: '90vh',
  display: 'flex',
  alignItems: 'center',
  background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 20% 50%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)',
    pointerEvents: 'none',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
    pointerEvents: 'none',
  },
}));

const FloatingCard = styled(motion.div)(({ theme }) => ({
  position: 'absolute',
  padding: theme.spacing(3),
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(10px)',
  borderRadius: theme.spacing(2),
  border: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
}));

const GradientText = styled('span')(({ theme }) => ({
  background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  fontWeight: 'bold',
  fontSize: 'inherit',
  lineHeight: 'inherit',
}));

const StatCard = styled(motion.div)(({ theme }) => ({
  padding: theme.spacing(3),
  background: 'rgba(255, 255, 255, 0.08)',
  backdropFilter: 'blur(20px)',
  borderRadius: theme.spacing(2),
  border: '1px solid rgba(255, 255, 255, 0.1)',
  textAlign: 'center',
}));

interface HeroProps {
  onExplore?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.43, 0.13, 0.23, 0.96] as [number, number, number, number],
      },
    },
  };

  const floatingAnimation = {
    y: [0, -20, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut' as const,
    },
  };

  return (
    <HeroSection>
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <motion.div variants={itemVariants}>
                <Typography
                  variant="overline"
                  sx={{
                    color: 'rgba(16, 185, 129, 1)',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    letterSpacing: 2,
                    mb: 2,
                    display: 'block',
                  }}
                >
                  SUSTAINABLE ENERGY PLATFORM
                </Typography>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Typography
                  variant="h1"
                  sx={{
                    color: 'white',
                    fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
                    fontWeight: 800,
                    lineHeight: 1.2,
                    mb: 3,
                  }}
                >
                  Real-Time{' '}
                  <GradientText>
                    Environmental
                  </GradientText>
                  <br />
                  Data Intelligence
                </Typography>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Typography
                  variant="h6"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    mb: 4,
                    maxWidth: 600,
                    lineHeight: 1.6,
                  }}
                >
                  Advanced analytics platform for carbon footprint tracking,
                  environmental reporting, and sustainability management.
                  Built for the modern energy transition.
                </Typography>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Button
                    variant="contained"
                    size="large"
                    endIcon={<ArrowForward />}
                    onClick={onExplore}
                    sx={{
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      color: 'white',
                      px: 4,
                      py: 1.5,
                      fontSize: '1rem',
                      fontWeight: 600,
                      borderRadius: 2,
                      textTransform: 'none',
                      boxShadow: '0 4px 14px rgba(16, 185, 129, 0.4)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                        boxShadow: '0 6px 20px rgba(16, 185, 129, 0.6)',
                        transform: 'translateY(-2px)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    Explore Dashboard
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    sx={{
                      borderColor: 'rgba(255, 255, 255, 0.3)',
                      color: 'white',
                      px: 4,
                      py: 1.5,
                      fontSize: '1rem',
                      fontWeight: 600,
                      borderRadius: 2,
                      textTransform: 'none',
                      '&:hover': {
                        borderColor: 'rgba(255, 255, 255, 0.5)',
                        background: 'rgba(255, 255, 255, 0.05)',
                      },
                    }}
                  >
                    View Documentation
                  </Button>
                </Box>
              </motion.div>
            </Grid>

            <Grid item xs={12} md={5}>
              <Box sx={{ position: 'relative', height: { xs: 300, md: 500 } }}>
                {/* Floating Stat Cards */}
                <FloatingCard
                  animate={floatingAnimation}
                  style={{
                    top: '10%',
                    right: '10%',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Nature sx={{ color: '#10b981' }} />
                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                      Carbon Reduction
                    </Typography>
                  </Box>
                  <AnimatedCounter value={45} suffix="%" variant="h4" color="white" />
                </FloatingCard>

                <FloatingCard
                  animate={{
                    ...floatingAnimation,
                    transition: { ...floatingAnimation.transition, delay: 1 },
                  }}
                  style={{
                    top: '50%',
                    right: '30%',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <TrendingUp sx={{ color: '#3b82f6' }} />
                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                      Efficiency Gain
                    </Typography>
                  </Box>
                  <AnimatedCounter value={87} suffix="%" variant="h4" color="white" />
                </FloatingCard>

                <FloatingCard
                  animate={{
                    ...floatingAnimation,
                    transition: { ...floatingAnimation.transition, delay: 2 },
                  }}
                  style={{
                    bottom: '15%',
                    right: '5%',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Assessment sx={{ color: '#f59e0b' }} />
                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                      Reports Generated
                    </Typography>
                  </Box>
                  <AnimatedCounter value={1250} suffix="+" variant="h4" color="white" />
                </FloatingCard>

                {/* Background decoration */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    height: 400,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)',
                    filter: 'blur(40px)',
                  }}
                />
              </Box>
            </Grid>
          </Grid>

          {/* Stats Row */}
          <motion.div variants={itemVariants}>
            <Grid container spacing={3} sx={{ mt: 8 }}>
              <Grid item xs={6} md={3}>
                <StatCard
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <AnimatedCounter 
                    value={15000} 
                    suffix="+" 
                    variant="h4" 
                    color="white"
                    decimals={0}
                  />
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mt: 1 }}>
                    Tonnes CO₂e Tracked
                  </Typography>
                </StatCard>
              </Grid>
              <Grid item xs={6} md={3}>
                <StatCard
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <AnimatedCounter 
                    value={42} 
                    suffix="%" 
                    variant="h4" 
                    color="white"
                  />
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mt: 1 }}>
                    Renewable Energy
                  </Typography>
                </StatCard>
              </Grid>
              <Grid item xs={6} md={3}>
                <StatCard
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <AnimatedCounter 
                    value={98.5} 
                    suffix="%" 
                    variant="h4" 
                    color="white"
                    decimals={1}
                  />
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mt: 1 }}>
                    Compliance Rate
                  </Typography>
                </StatCard>
              </Grid>
              <Grid item xs={6} md={3}>
                <StatCard
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <AnimatedCounter 
                    value={24} 
                    suffix="/7" 
                    variant="h4" 
                    color="white"
                  />
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mt: 1 }}>
                    Real-Time Monitoring
                  </Typography>
                </StatCard>
              </Grid>
            </Grid>
          </motion.div>
        </motion.div>
      </Container>
    </HeroSection>
  );
};

export default Hero;

