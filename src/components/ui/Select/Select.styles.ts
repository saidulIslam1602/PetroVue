/**
 * Select Component Styles
 * Professional dropdown styling for data selection
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

export const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  width: 100%;
  position: relative;
`;

export const SelectButton = styled.button<{
  size: 'sm' | 'md' | 'lg';
  hasError: boolean;
}>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
  border: 2px solid ${({ hasError }) => (hasError ? '#f44336' : '#d1d5db')};
  border-radius: ${theme.borderRadius.md};
  font-family: ${theme.typography.fontFamily.primary};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  outline: none;

  ${({ size }) => sizeVariants[size]}

  &:hover:not(:disabled) {
    border-color: ${({ hasError }) => (hasError ? '#f44336' : '#0066cc')};
  }

  &:focus {
    border-color: #0066cc;
    box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.1);
  }

  &:disabled {
    background-color: #f3f4f6;
    color: #9ca3af;
    cursor: not-allowed;
    border-color: #e5e7eb;
  }
`;

export const SelectDropdown = styled.div<{ size: 'sm' | 'md' | 'lg' }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: ${theme.borderRadius.md};
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  z-index: 1000;
  max-height: 200px;
  overflow-y: auto;
  margin-top: 4px;

  ${({ size }) => sizeVariants[size]}
`;

export const SelectSearch = styled.input`
  width: 100%;
  border: none;
  border-bottom: 1px solid #e5e7eb;
  padding: 0.75rem 1rem;
  font-size: ${theme.typography.fontSize.sm};
  outline: none;
  background-color: #f9fafb;

  &:focus {
    background-color: #ffffff;
    border-bottom-color: #0066cc;
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

export const SelectOption = styled.div<{
  size: 'sm' | 'md' | 'lg';
  disabled: boolean;
  focused: boolean;
}>`
  padding: 0.75rem 1rem;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  color: ${({ disabled }) => (disabled ? '#9ca3af' : '#374151')};
  background-color: ${({ focused }) => (focused ? '#f3f4f6' : 'transparent')};
  transition: background-color 0.15s ease;

  ${({ size }) => sizeVariants[size]}

  &:hover:not([disabled]) {
    background-color: #f3f4f6;
  }

  &:first-of-type {
    border-top-left-radius: ${theme.borderRadius.md};
    border-top-right-radius: ${theme.borderRadius.md};
  }

  &:last-of-type {
    border-bottom-left-radius: ${theme.borderRadius.md};
    border-bottom-right-radius: ${theme.borderRadius.md};
  }
`;
