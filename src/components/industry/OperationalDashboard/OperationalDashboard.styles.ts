/**
 * OperationalDashboard Component Styles
 * Professional styling for oil & gas operational dashboard
 */

import styled from '@emotion/styled';

export const OperationalDashboardContainer = styled.div`
  padding: 1.5rem;
  background-color: #f8fafc;
  min-height: 100vh;
`;

export const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

export const StatusIndicator = styled.div<{ status: 'normal' | 'warning' | 'critical' }>`
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 600;
  text-align: center;
  min-width: 80px;
  
  ${({ status }) => {
    switch (status) {
      case 'critical':
        return `
          background-color: #fef2f2;
          color: #dc2626;
          border: 1px solid #fecaca;
        `;
      case 'warning':
        return `
          background-color: #fffbeb;
          color: #d97706;
          border: 1px solid #fed7aa;
        `;
      case 'normal':
      default:
        return `
          background-color: #f0fdf4;
          color: #059669;
          border: 1px solid #bbf7d0;
        `;
    }
  }}
`;
