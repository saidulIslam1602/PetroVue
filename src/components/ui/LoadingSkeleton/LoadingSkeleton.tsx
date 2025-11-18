/**
 * Loading Skeleton Component
 * Animated loading states with shimmer effect
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Box } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

const AnimatedSkeleton = styled(Box)(({ theme }) => ({
  background:
    'linear-gradient(90deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.05) 100%)',
  backgroundSize: '1000px 100%',
  animation: `${shimmer} 2s infinite linear`,
  borderRadius: theme.spacing(1),
}));

interface LoadingSkeletonProps {
  variant?: 'card' | 'metric' | 'chart' | 'list' | 'text';
  count?: number;
  height?: number | string;
  width?: number | string;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  variant = 'card',
  count = 1,
  height = 200,
  width = '100%',
}) => {
  const renderSkeleton = () => {
    switch (variant) {
      case 'card':
        return (
          <Box sx={{ width, height, p: 3 }}>
            <AnimatedSkeleton sx={{ width: '60%', height: 24, mb: 2 }} />
            <AnimatedSkeleton sx={{ width: '100%', height: 16, mb: 1 }} />
            <AnimatedSkeleton sx={{ width: '80%', height: 16, mb: 3 }} />
            <AnimatedSkeleton sx={{ width: '40%', height: 32 }} />
          </Box>
        );

      case 'metric':
        return (
          <Box
            sx={{
              width,
              height,
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <AnimatedSkeleton sx={{ width: '50%', height: 16, mb: 2 }} />
            <AnimatedSkeleton sx={{ width: '80%', height: 40, mb: 1 }} />
            <AnimatedSkeleton sx={{ width: '60%', height: 14 }} />
          </Box>
        );

      case 'chart':
        return (
          <Box sx={{ width, height, p: 3 }}>
            <AnimatedSkeleton sx={{ width: '40%', height: 24, mb: 3 }} />
            <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-end',
                gap: 2,
                height: '70%',
              }}
            >
              {[1, 2, 3, 4, 5, 6].map(i => (
                <AnimatedSkeleton
                  key={i}
                  sx={{
                    flex: 1,
                    height: `${Math.random() * 60 + 40}%`,
                  }}
                />
              ))}
            </Box>
          </Box>
        );

      case 'list':
        return (
          <Box sx={{ width }}>
            {Array.from({ length: count }).map((_, index) => (
              <Box
                key={index}
                sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center' }}
              >
                <AnimatedSkeleton
                  sx={{ width: 40, height: 40, borderRadius: '50%' }}
                />
                <Box sx={{ flex: 1 }}>
                  <AnimatedSkeleton sx={{ width: '70%', height: 16, mb: 1 }} />
                  <AnimatedSkeleton sx={{ width: '50%', height: 14 }} />
                </Box>
              </Box>
            ))}
          </Box>
        );

      case 'text':
        return (
          <Box sx={{ width }}>
            {Array.from({ length: count }).map((_, index) => (
              <AnimatedSkeleton
                key={index}
                sx={{
                  width: index === count - 1 ? '60%' : '100%',
                  height: 16,
                  mb: 1,
                }}
              />
            ))}
          </Box>
        );

      default:
        return <AnimatedSkeleton sx={{ width, height }} />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {renderSkeleton()}
    </motion.div>
  );
};

export default LoadingSkeleton;
