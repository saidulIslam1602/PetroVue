/**
 * Chart Component Styles
 * Professional styling for data visualization
 */

import styled from '@emotion/styled';
import { theme } from '../../../themes';

export const ChartContainer = styled.div`
  background-color: #ffffff;
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.md};
  box-shadow:
    0 1px 3px 0 rgba(0, 0, 0, 0.1),
    0 1px 2px 0 rgba(0, 0, 0, 0.06);
  border: 1px solid #e5e7eb;

  &:hover {
    box-shadow:
      0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
`;

export const ChartTitle = styled.h3`
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: #212121;
  margin: 0 0 ${theme.spacing.md} 0;
  text-align: center;
`;

export const ChartError = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: ${theme.palette.semantic.error};
  font-size: ${theme.typography.fontSize.base};
  text-align: center;
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: ${theme.borderRadius.md};
`;
