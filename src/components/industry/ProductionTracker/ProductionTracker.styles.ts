/**
 * ProductionTracker Component Styles
 * Professional styling for production tracking dashboard
 */

import styled from '@emotion/styled';

export const ProductionTrackerContainer = styled.div`
  padding: 1.5rem;
  background-color: #f8fafc;
  min-height: 100vh;
`;

export const WellGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1rem;
`;

export const ProductionChart = styled.div`
  width: 100%;
  height: 350px;
`;
