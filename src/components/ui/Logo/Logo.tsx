/**
 * PetroVue Logo Component
 * Professional logo for the application
 */

import React from 'react';

interface LogoProps {
  collapsed?: boolean;
  size?: number;
}

export const Logo: React.FC<LogoProps> = ({ collapsed = false, size = 40 }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: collapsed ? '0' : '0.75rem',
        transition: 'all 0.3s ease',
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox='0 0 48 48'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        style={{ flexShrink: 0 }}
      >
        {/* Outer hexagon - oil & gas industry symbol */}
        <path
          d='M24 2L42 12V28L24 38L6 28V12L24 2Z'
          fill='url(#gradient1)'
          stroke='#0066cc'
          strokeWidth='2'
        />

        {/* Inner droplet - petroleum symbol */}
        <path
          d='M24 12C24 12 18 18 18 23C18 26.866 20.686 30 24 30C27.314 30 30 26.866 30 23C30 18 24 12 24 12Z'
          fill='#ffffff'
          opacity='0.9'
        />

        {/* Wave pattern - representing energy/flow */}
        <path
          d='M14 20C16 22 18 22 20 20C22 18 24 18 26 20C28 22 30 22 32 20'
          stroke='#0066cc'
          strokeWidth='1.5'
          strokeLinecap='round'
          fill='none'
        />

        {/* Gradient definitions */}
        <defs>
          <linearGradient id='gradient1' x1='6' y1='2' x2='42' y2='38'>
            <stop offset='0%' stopColor='#0066cc' />
            <stop offset='50%' stopColor='#0052a3' />
            <stop offset='100%' stopColor='#003d7a' />
          </linearGradient>
        </defs>
      </svg>

      {!collapsed && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }}
        >
          <span
            style={{
              fontSize: '1.25rem',
              fontWeight: '700',
              color: '#0066cc',
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
            }}
          >
            PetroVue
          </span>
          <span
            style={{
              fontSize: '0.625rem',
              color: '#6b7280',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              marginTop: '0.125rem',
            }}
          >
            Operations
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
