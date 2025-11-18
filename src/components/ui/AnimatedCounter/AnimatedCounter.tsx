/**
 * Animated Counter Component
 * Smooth number counting animation for statistics
 */

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { Typography, Box } from '@mui/material';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2';
  color?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  duration = 2,
  decimals = 0,
  prefix = '',
  suffix = '',
  variant = 'h3',
  color,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hasAnimated, setHasAnimated] = useState(false);

  const spring = useSpring(0, {
    duration: duration * 1000,
    bounce: 0,
  });

  const display = useTransform(
    spring,
    current => prefix + current.toFixed(decimals) + suffix
  );

  useEffect(() => {
    if (isInView && !hasAnimated) {
      spring.set(value);
      setHasAnimated(true);
    }
  }, [isInView, value, spring, hasAnimated]);

  return (
    <Box ref={ref} component='span'>
      <motion.span>
        <Typography
          variant={variant}
          component='span'
          sx={{
            fontWeight: 'bold',
            color: color || 'inherit',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          <motion.span>{display}</motion.span>
        </Typography>
      </motion.span>
    </Box>
  );
};

export default AnimatedCounter;
