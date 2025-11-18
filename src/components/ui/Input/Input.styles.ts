/**
 * Input Component Styles
 * Professional form styling for data entry
 */

import styled from '@emotion/styled';
import { theme } from '../../../themes';

// Size variants
const sizeVariants = {
  sm: {
    height: '32px',
    padding: '0 8px',
    fontSize: theme.typography.fontSize.sm,
  },
  md: {
    height: '40px',
    padding: '0 12px',
    fontSize: theme.typography.fontSize.base,
  },
  lg: {
    height: '48px',
    padding: '0 16px',
    fontSize: theme.typography.fontSize.lg,
  },
};

// Variant styles
const variantStyles = {
  default: `
    background-color: #ffffff;
    border: 1px solid #d1d5db;
    
    &:focus {
      border-color: #0066cc;
      box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.1);
    }
  `,
  outlined: `
    background-color: #ffffff;
    border: 2px solid #d1d5db;
    
    &:focus {
      border-color: #0066cc;
      box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.1);
    }
  `,
  filled: `
    background-color: #f9fafb;
    border: 1px solid transparent;
    
    &:focus {
      background-color: #ffffff;
      border-color: #0066cc;
      box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.1);
    }
  `,
};

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  width: 100%;
`;

export const InputLabel = styled.label<{ hasError: boolean }>`
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${({ hasError }) =>
    hasError ? theme.palette.semantic.error : '#374151'};
  margin-bottom: 0.25rem;
`;

export const InputField = styled.input<{
  inputSize: 'sm' | 'md' | 'lg';
  variant: 'default' | 'outlined' | 'filled';
  hasError: boolean;
  hasStartIcon: boolean;
  hasEndIcon: boolean;
}>`
  width: 100%;
  border-radius: ${theme.borderRadius.md};
  font-family: ${theme.typography.fontFamily.primary};
  transition: all 0.2s ease-in-out;
  outline: none;

  ${({ inputSize }) => sizeVariants[inputSize]}
  ${({ variant }) => variantStyles[variant]}
  
  ${({ hasStartIcon, hasEndIcon }) => {
    if (hasStartIcon && hasEndIcon) {
      return 'padding-left: 40px; padding-right: 40px;';
    } else if (hasStartIcon) {
      return 'padding-left: 40px;';
    } else if (hasEndIcon) {
      return 'padding-right: 40px;';
    }
    return '';
  }}
  
  ${({ hasError }) =>
    hasError &&
    `
    border-color: ${theme.palette.semantic.error} !important;
    box-shadow: 0 0 0 3px rgba(244, 67, 54, 0.1) !important;
  `}
  
  &:disabled {
    background-color: #f3f4f6;
    color: #9ca3af;
    cursor: not-allowed;
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

export const InputError = styled.div`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.palette.semantic.error};
  margin-top: 0.25rem;
`;

export const InputHelper = styled.div`
  font-size: ${theme.typography.fontSize.sm};
  color: #6b7280;
  margin-top: 0.25rem;
`;
