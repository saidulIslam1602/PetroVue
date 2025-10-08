/**
 * Button Component Styles
 * Styled components for the Button component using emotion
 * Following design system specifications
 */

import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';
import { ButtonProps } from '../../../types';
import { theme } from '../../../themes';

// Loading spinner animation
const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

// Base button styles
const baseButtonStyles = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: ${theme.borderRadius.md};
  font-family: ${theme.typography.fontFamily.primary};
  font-weight: ${theme.typography.fontWeight.medium};
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  position: relative;
  overflow: hidden;
  
  &:focus {
    outline: 2px solid ${theme.palette.primary[500]};
    outline-offset: 2px;
  }
  
  &:focus:not(:focus-visible) {
    outline: none;
  }
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

// Size variants
const sizeVariants = {
  sm: css`
    height: 32px;
    padding: 0 ${theme.spacing.sm};
    font-size: ${theme.typography.fontSize.sm};
    min-width: 80px;
  `,
  md: css`
    height: 40px;
    padding: 0 ${theme.spacing.md};
    font-size: ${theme.typography.fontSize.base};
    min-width: 100px;
  `,
  lg: css`
    height: 48px;
    padding: 0 ${theme.spacing.lg};
    font-size: ${theme.typography.fontSize.lg};
    min-width: 120px;
  `,
};

// Color variants
const colorVariants = {
  primary: css`
    background-color: ${theme.palette.primary[500]};
    color: white;
    
    &:hover:not(:disabled) {
      background-color: ${theme.palette.primary[600]};
      transform: translateY(-1px);
      box-shadow: ${theme.shadows.md};
    }
    
    &:active:not(:disabled) {
      background-color: ${theme.palette.primary[700]};
      transform: translateY(0);
    }
  `,
  
  secondary: css`
    background-color: ${theme.palette.secondary[500]};
    color: white;
    
    &:hover:not(:disabled) {
      background-color: ${theme.palette.secondary[600]};
      transform: translateY(-1px);
      box-shadow: ${theme.shadows.md};
    }
    
    &:active:not(:disabled) {
      background-color: ${theme.palette.secondary[700]};
      transform: translateY(0);
    }
  `,
  
  outline: css`
    background-color: transparent;
    color: ${theme.palette.primary[500]};
    border: 2px solid ${theme.palette.primary[500]};
    
    &:hover:not(:disabled) {
      background-color: ${theme.palette.primary[50]};
      border-color: ${theme.palette.primary[600]};
      color: ${theme.palette.primary[600]};
    }
    
    &:active:not(:disabled) {
      background-color: ${theme.palette.primary[100]};
      border-color: ${theme.palette.primary[700]};
      color: ${theme.palette.primary[700]};
    }
  `,
  
  ghost: css`
    background-color: transparent;
    color: ${theme.palette.primary[500]};
    
    &:hover:not(:disabled) {
      background-color: ${theme.palette.primary[50]};
      color: ${theme.palette.primary[600]};
    }
    
    &:active:not(:disabled) {
      background-color: ${theme.palette.primary[100]};
      color: ${theme.palette.primary[700]};
    }
  `,
  
  link: css`
    background-color: transparent;
    color: ${theme.palette.primary[500]};
    text-decoration: underline;
    min-width: auto;
    height: auto;
    padding: 0;
    
    &:hover:not(:disabled) {
      color: ${theme.palette.primary[600]};
      text-decoration: none;
    }
    
    &:active:not(:disabled) {
      color: ${theme.palette.primary[700]};
    }
  `,
};

// Main button container
export const ButtonContainer = styled.button<ButtonProps>`
  ${baseButtonStyles}
  ${({ size }) => size && sizeVariants[size]}
  ${({ variant }) => variant && colorVariants[variant]}
  
  ${({ loading }) =>
    loading &&
    css`
      cursor: wait;
    `}
`;

// Button content wrapper
export const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  width: 100%;
`;

// Loading spinner
export const LoadingSpinner = styled.div<{ size: ButtonProps['size'] }>`
  width: ${({ size }) => {
    switch (size) {
      case 'sm':
        return '14px';
      case 'lg':
        return '20px';
      default:
        return '16px';
    }
  }};
  height: ${({ size }) => {
    switch (size) {
      case 'sm':
        return '14px';
      case 'lg':
        return '20px';
      default:
        return '16px';
    }
  }};
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

// Button group styles for multiple buttons
export const ButtonGroupContainer = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  
  & > button:not(:last-child) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  
  & > button:not(:first-child) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  
  & > button:not(:first-child):not(:last-child) {
    border-radius: 0;
  }
`;
