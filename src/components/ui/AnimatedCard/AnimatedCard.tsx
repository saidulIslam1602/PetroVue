/**
 * Animated Card Component
 * Modern card with hover effects and animations
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Card as MuiCard, CardProps } from '@mui/material';
import { styled } from '@mui/material/styles';

interface AnimatedCardProps extends CardProps {
  delay?: number;
  hover?: boolean;
  scale?: number;
}

const StyledCard = styled(MuiCard)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  borderRadius: theme.spacing(2),
  transition: 'all 0.3s ease',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(90deg, #059669 0%, #10b981 50%, #34d399 100%)',
    transform: 'scaleX(0)',
    transformOrigin: 'left',
    transition: 'transform 0.3s ease',
  },
  '&:hover::before': {
    transform: 'scaleX(1)',
  },
}));

export const AnimatedCard: React.FC<AnimatedCardProps> = ({ 
  children, 
  delay = 0, 
  hover = true,
  scale = 1.02,
  ...props 
}) => {
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        delay,
        ease: [0.43, 0.13, 0.23, 0.96] as [number, number, number, number]
      }
    },
  };

  const hoverVariants = hover ? {
    scale,
    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
    transition: { duration: 0.2 }
  } : {};

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      whileHover={hoverVariants}
    >
      <StyledCard {...props}>
        {children}
      </StyledCard>
    </motion.div>
  );
};

export default AnimatedCard;

