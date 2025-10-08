/**
 * MetricCard Component Styles
 * Professional styling for operational metrics display
 */

import styled from '@emotion/styled';
import { theme } from '../../../themes';

// Status-based styling
const statusStyles = {
  normal: {
    borderColor: '#e5e7eb',
    backgroundColor: '#ffffff',
  },
  warning: {
    borderColor: '#f59e0b',
    backgroundColor: '#fffbeb',
  },
  critical: {
    borderColor: '#dc2626',
    backgroundColor: '#fef2f2',
  },
  success: {
    borderColor: '#10b981',
    backgroundColor: '#f0fdf4',
  },
};

export const MetricCardContainer = styled.div<{ status: 'normal' | 'warning' | 'critical' | 'success' }>`
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: ${theme.borderRadius.lg};
  padding: 1.5rem;
  transition: all 0.2s ease-in-out;
  
  ${({ status }) => {
    const style = statusStyles[status];
    return `
      border-color: ${style.borderColor};
      background-color: ${style.backgroundColor};
    `;
  }}
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
`;

export const MetricHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

export const MetricValue = styled.div`
  display: flex;
  align-items: baseline;
  margin-bottom: 0.5rem;
`;

export const MetricChange = styled.div<{ type: 'increase' | 'decrease' | 'neutral' }>`
  display: flex;
  align-items: center;
  
  ${({ type }) => {
    switch (type) {
      case 'increase':
        return 'color: #059669;';
      case 'decrease':
        return 'color: #dc2626;';
      case 'neutral':
      default:
        return 'color: #6b7280;';
    }
  }}
`;

export const MetricIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  color: #6b7280;
  
  svg {
    width: 16px;
    height: 16px;
  }
`;
