/**
 * Alert Component Styles
 * Professional alert styling for industry notifications
 */

import styled from '@emotion/styled';
import { theme } from '../../../themes';

// Alert type styles
const alertStyles = {
  success: {
    backgroundColor: '#f0f9ff',
    borderColor: '#0ea5e9',
    textColor: '#0c4a6e',
    iconColor: '#059669',
    animation: undefined,
  },
  warning: {
    backgroundColor: '#fffbeb',
    borderColor: '#f59e0b',
    textColor: '#92400e',
    iconColor: '#d97706',
    animation: undefined,
  },
  error: {
    backgroundColor: '#fef2f2',
    borderColor: '#ef4444',
    textColor: '#991b1b',
    iconColor: '#dc2626',
    animation: undefined,
  },
  critical: {
    backgroundColor: '#fef2f2',
    borderColor: '#dc2626',
    textColor: '#991b1b',
    iconColor: '#dc2626',
    animation: 'pulse 2s infinite',
  },
  info: {
    backgroundColor: '#f0f9ff',
    borderColor: '#3b82f6',
    textColor: '#1e40af',
    iconColor: '#2563eb',
    animation: undefined,
  },
};

export const AlertContainer = styled.div<{
  type: 'success' | 'warning' | 'error' | 'info' | 'critical';
}>`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem;
  border-radius: ${theme.borderRadius.lg};
  border: 1px solid;
  margin-bottom: 1rem;

  ${({ type }) => {
    const style = alertStyles[type];
    return `
      background-color: ${style.backgroundColor};
      border-color: ${style.borderColor};
      color: ${style.textColor};
      ${style.animation ? `animation: ${style.animation};` : ''}
    `;
  }}

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.8;
    }
  }
`;

export const AlertIcon = styled.div<{
  type: 'success' | 'warning' | 'error' | 'info' | 'critical';
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 0.125rem;

  ${({ type }) => {
    const style = alertStyles[type];
    return `color: ${style.iconColor};`;
  }}

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const AlertContent = styled.div`
  flex: 1;
  min-width: 0;
`;

export const AlertCloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: ${theme.borderRadius.sm};
  color: inherit;
  opacity: 0.7;
  transition: opacity 0.2s ease;
  flex-shrink: 0;

  &:hover {
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.1);
  }

  &:focus {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;
