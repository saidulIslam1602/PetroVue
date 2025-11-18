/**
 * Sidebar Component Styles
 * Professional sidebar styling for navigation
 */

import styled from '@emotion/styled';

export const SidebarContainer = styled.aside<{ collapsed: boolean }>`
  width: ${({ collapsed }) => collapsed ? '64px' : '256px'};
  height: 100vh;
  background-color: #ffffff;
  border-right: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
`;

export const SidebarHeader = styled.div<{ collapsed: boolean }>`
  padding: ${({ collapsed }) => collapsed ? '1rem' : '1.5rem 1rem'};
  border-bottom: 1px solid #f3f4f6;
  position: relative;
  min-height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: ${({ collapsed }) => collapsed ? 'center' : 'flex-start'};
`;

export const SidebarContent = styled.nav`
  flex: 1;
  padding: 1rem 0;
  overflow-y: auto;
`;

export const SidebarFooter = styled.div<{ collapsed: boolean }>`
  padding: 1rem;
  border-top: 1px solid #f3f4f6;
  
  ${({ collapsed }) => collapsed && `
    padding: 1rem 0.5rem;
  `}
`;

export const SidebarItem = styled.button<{
  active: boolean;
  disabled: boolean;
  collapsed: boolean;
}>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: ${({ collapsed }) => collapsed ? 'center' : 'space-between'};
  padding: ${({ collapsed }) => collapsed ? '0.75rem 0.5rem' : '0.75rem 1rem'};
  margin: 0.125rem 0;
  background: none;
  border: none;
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
  color: ${({ active, disabled }) => 
    disabled ? '#9ca3af' : 
    active ? '#0066cc' : '#374151'
  };
  font-size: 0.875rem;
  transition: all 0.2s ease;
  border-radius: 0;
  text-align: left;
  overflow: hidden;
  
  ${({ active }) => active && `
    background-color: #e6f3ff;
    border-right: 3px solid #0066cc;
  `}
  
  &:hover:not([disabled]) {
    background-color: ${({ active }) => active ? '#e6f3ff' : '#f9fafb'};
    color: ${({ active }) => active ? '#0066cc' : '#111827'};
  }
  
  &:focus {
    outline: 2px solid #0066cc;
    outline-offset: -2px;
  }
  
  &:disabled {
    opacity: 0.5;
  }
`;
