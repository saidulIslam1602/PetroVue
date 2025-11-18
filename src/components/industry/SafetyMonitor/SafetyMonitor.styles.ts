/**
 * SafetyMonitor Component Styles
 * Professional styling for safety monitoring dashboard
 */

import styled from '@emotion/styled';

export const SafetyMonitorContainer = styled.div`
  padding: 1.5rem;
  background-color: #f8fafc;
  min-height: 100vh;
`;

export const SafetyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

export const IncidentList = styled.div`
  max-height: 400px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
  }
`;

export const ComplianceStatus = styled.div`
  padding: 1rem 0;
`;
