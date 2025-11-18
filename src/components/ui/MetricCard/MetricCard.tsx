/**
 * MetricCard Component
 * Specialized card for displaying operational metrics and KPIs
 * Designed for oil & gas industry performance indicators
 */

import React from 'react';
import {
  MetricCardContainer,
  MetricHeader,
  MetricValue,
  MetricChange,
  MetricIcon,
} from './MetricCard.styles';

export interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  change?: {
    value: number;
    type: 'increase' | 'decrease' | 'neutral';
    period?: string;
  };
  icon?: React.ReactNode;
  status?: 'normal' | 'warning' | 'critical' | 'success';
  trend?: 'up' | 'down' | 'stable';
  className?: string;
  'data-testid'?: string;
}

const getStatusIcon = (status: MetricCardProps['status']) => {
  const iconProps = { width: 16, height: 16 };

  switch (status) {
    case 'warning':
      return (
        <svg {...iconProps} viewBox='0 0 20 20' fill='currentColor'>
          <path
            fillRule='evenodd'
            d='M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z'
            clipRule='evenodd'
          />
        </svg>
      );
    case 'critical':
      return (
        <svg {...iconProps} viewBox='0 0 20 20' fill='currentColor'>
          <path
            fillRule='evenodd'
            d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
            clipRule='evenodd'
          />
        </svg>
      );
    case 'success':
      return (
        <svg {...iconProps} viewBox='0 0 20 20' fill='currentColor'>
          <path
            fillRule='evenodd'
            d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
            clipRule='evenodd'
          />
        </svg>
      );
    default:
      return null;
  }
};

const getTrendIcon = (trend: MetricCardProps['trend']) => {
  const iconProps = { width: 12, height: 12 };

  switch (trend) {
    case 'up':
      return (
        <svg {...iconProps} viewBox='0 0 20 20' fill='currentColor'>
          <path
            fillRule='evenodd'
            d='M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z'
            clipRule='evenodd'
          />
        </svg>
      );
    case 'down':
      return (
        <svg {...iconProps} viewBox='0 0 20 20' fill='currentColor'>
          <path
            fillRule='evenodd'
            d='M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z'
            clipRule='evenodd'
          />
        </svg>
      );
    case 'stable':
      return (
        <svg {...iconProps} viewBox='0 0 20 20' fill='currentColor'>
          <path
            fillRule='evenodd'
            d='M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
            clipRule='evenodd'
          />
        </svg>
      );
    default:
      return null;
  }
};

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  unit,
  change,
  icon,
  status = 'normal',
  trend,
  className,
  'data-testid': testId,
}) => {
  const formatValue = (val: string | number) => {
    if (typeof val === 'number') {
      return val.toLocaleString();
    }
    return val;
  };

  return (
    <MetricCardContainer
      status={status}
      className={className}
      data-testid={testId}
    >
      <MetricHeader>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {icon && <MetricIcon>{icon}</MetricIcon>}
          <span
            style={{
              fontSize: '0.875rem',
              fontWeight: '500',
              color: '#6b7280',
            }}
          >
            {title}
          </span>
        </div>
        {status !== 'normal' && (
          <div
            style={{
              color:
                status === 'critical'
                  ? '#dc2626'
                  : status === 'warning'
                    ? '#d97706'
                    : '#059669',
            }}
          >
            {getStatusIcon(status)}
          </div>
        )}
      </MetricHeader>

      <MetricValue>
        <span
          style={{
            fontSize: '2rem',
            fontWeight: '700',
            color: '#111827',
            lineHeight: '1',
          }}
        >
          {formatValue(value)}
        </span>
        {unit && (
          <span
            style={{
              fontSize: '0.875rem',
              color: '#6b7280',
              marginLeft: '0.25rem',
            }}
          >
            {unit}
          </span>
        )}
      </MetricValue>

      {change && (
        <MetricChange type={change.type}>
          <div
            style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}
          >
            {getTrendIcon(
              change.type === 'increase'
                ? 'up'
                : change.type === 'decrease'
                  ? 'down'
                  : 'stable'
            )}
            <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>
              {Math.abs(change.value)}%
            </span>
            {change.period && (
              <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>
                vs {change.period}
              </span>
            )}
          </div>
        </MetricChange>
      )}
    </MetricCardContainer>
  );
};

export default MetricCard;
