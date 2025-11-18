/**
 * Card Component Styles
 * Professional styling for data presentation
 */

import styled from '@emotion/styled';
import { CardProps } from '../../../types';
import { theme } from '../../../themes';

// Card variants
const cardVariants = {
  default: `
    background-color: #ffffff;
    border: 1px solid #e0e0e0;
  `,
  elevated: `
    background-color: #ffffff;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    border: none;
  `,
  outlined: `
    background-color: #ffffff;
    border: 2px solid #e0e0e0;
  `,
};

// Padding variants
const paddingVariants = {
  xs: theme.spacing.xs,
  sm: theme.spacing.sm,
  md: theme.spacing.md,
  lg: theme.spacing.lg,
  xl: theme.spacing.xl,
  '2xl': theme.spacing['2xl'],
  '3xl': theme.spacing['3xl'],
  '4xl': theme.spacing['4xl'],
};

export const CardContainer = styled.div<CardProps>`
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  transition: all 0.2s ease-in-out;

  ${({ variant }) => variant && cardVariants[variant]}

  padding: ${({ padding }) => padding && paddingVariants[padding]};

  &:hover {
    transform: translateY(-2px);
    box-shadow:
      0 8px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
`;

export const CardHeader = styled.div`
  padding: ${theme.spacing.md} ${theme.spacing.md} 0 ${theme.spacing.md};
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: ${theme.spacing.md};

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0 0 ${theme.spacing.sm} 0;
    color: #212121;
  }
`;

export const CardContent = styled.div`
  padding: 0 ${theme.spacing.md};
  flex: 1;

  &:last-child {
    padding-bottom: ${theme.spacing.md};
  }
`;

export const CardFooter = styled.div`
  padding: ${theme.spacing.md};
  border-top: 1px solid #f0f0f0;
  margin-top: ${theme.spacing.md};
  background-color: #fafafa;

  display: flex;
  justify-content: flex-end;
  gap: ${theme.spacing.sm};
`;
