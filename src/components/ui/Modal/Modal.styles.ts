/**
 * Modal Component Styles
 * Professional modal styling for critical operations
 */

import styled from '@emotion/styled';
import { theme } from '../../../themes';

// Size variants
const sizeVariants = {
  sm: '400px',
  md: '500px',
  lg: '700px',
  xl: '900px',
};

export const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1050;
  padding: 1rem;
`;

export const ModalContainer = styled.div<{ size: 'sm' | 'md' | 'lg' | 'xl' }>`
  background-color: #ffffff;
  border-radius: ${theme.borderRadius.lg};
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  max-width: ${({ size }) => sizeVariants[size]};
  width: 100%;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  
  @media (max-width: 768px) {
    max-width: 95vw;
    margin: 0.5rem;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 1.5rem 0 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 1rem;
`;

export const ModalContent = styled.div`
  padding: 0 1.5rem;
  flex: 1;
  overflow-y: auto;
  
  &:last-child {
    padding-bottom: 1.5rem;
  }
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  padding: 1rem 1.5rem 1.5rem 1.5rem;
  border-top: 1px solid #e5e7eb;
  margin-top: 1rem;
  background-color: #f9fafb;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  border-radius: ${theme.borderRadius.md};
  color: #6b7280;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #f3f4f6;
    color: #374151;
  }
  
  &:focus {
    outline: 2px solid #0066cc;
    outline-offset: 2px;
  }
  
  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;
