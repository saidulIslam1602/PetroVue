/**
 * EquipmentStatus Component Styles
 * Professional styling for equipment monitoring dashboard
 */

import styled from '@emotion/styled';

export const EquipmentStatusContainer = styled.div`
  padding: 1.5rem;
  background-color: #f8fafc;
  min-height: 100vh;
`;

export const EquipmentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1rem;
`;

export const MaintenanceSchedule = styled.div`
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
