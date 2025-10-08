/**
 * EnvironmentalMonitor Component Styles
 * Professional styling for environmental monitoring dashboard
 */

import styled from '@emotion/styled';

export const EnvironmentalMonitorContainer = styled.div`
  padding: 1.5rem;
  background-color: #f8fafc;
  min-height: 100vh;
`;

export const EnvironmentalGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

export const ComplianceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;
