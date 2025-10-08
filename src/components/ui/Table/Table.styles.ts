/**
 * Table Component Styles
 * Professional table styling for data presentation
 */

import styled from '@emotion/styled';
import { theme } from '../../../themes';

// Size variants
const sizeVariants = {
  sm: {
    fontSize: theme.typography.fontSize.sm,
    padding: '0.5rem 0.75rem',
  },
  md: {
    fontSize: theme.typography.fontSize.base,
    padding: '0.75rem 1rem',
  },
  lg: {
    fontSize: theme.typography.fontSize.lg,
    padding: '1rem 1.25rem',
  },
};

export const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  border-radius: ${theme.borderRadius.lg};
  border: 1px solid #e5e7eb;
`;

export const TableElement = styled.table<{
  size: 'sm' | 'md' | 'lg';
  striped: boolean;
  hoverable: boolean;
}>`
  width: 100%;
  border-collapse: collapse;
  background-color: #ffffff;
  
  ${({ size }) => sizeVariants[size]}
`;

export const TableHead = styled.thead`
  background-color: #f9fafb;
  border-bottom: 2px solid #e5e7eb;
`;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr<{ striped?: boolean; hoverable?: boolean }>`
  border-bottom: 1px solid #f3f4f6;
  
  ${({ striped }) =>
    striped &&
    `
    &:nth-of-type(even) {
      background-color: #f9fafb;
    }
  `}
  
  ${({ hoverable }) =>
    hoverable &&
    `
    &:hover {
      background-color: #f3f4f6;
    }
  `}
  
  &:last-child {
    border-bottom: none;
  }
`;

export const TableHeader = styled.th<{
  width?: string | number;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
}>`
  font-weight: ${theme.typography.fontWeight.semibold};
  color: #374151;
  text-align: ${({ align }) => align || 'left'};
  padding: 0.75rem 1rem;
  border-right: 1px solid #e5e7eb;
  
  ${({ width }) => width && `width: ${typeof width === 'number' ? `${width}px` : width};`}
  
  ${({ sortable }) =>
    sortable &&
    `
    cursor: pointer;
    user-select: none;
    
    &:hover {
      background-color: #f3f4f6;
    }
  `}
  
  &:last-child {
    border-right: none;
  }
`;

export const TableCell = styled.td<{
  align?: 'left' | 'center' | 'right';
}>`
  color: #374151;
  text-align: ${({ align }) => align || 'left'};
  padding: 0.75rem 1rem;
  border-right: 1px solid #f3f4f6;
  
  &:last-child {
    border-right: none;
  }
`;
