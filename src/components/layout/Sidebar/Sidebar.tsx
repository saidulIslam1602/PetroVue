/**
 * Sidebar Component
 * Navigation sidebar for dashboard and application navigation
 * Designed for oil & gas industry operational interfaces
 */

import React from 'react';
import { SidebarContainer, SidebarHeader, SidebarContent, SidebarFooter, SidebarItem } from './Sidebar.styles';

export interface SidebarItemType {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
  badge?: string | number;
  children?: SidebarItemType[];
}

export interface SidebarProps {
  items: SidebarItemType[];
  title?: string;
  logo?: React.ReactNode;
  user?: {
    name: string;
    role: string;
    avatar?: string;
  };
  collapsed?: boolean;
  onToggle?: () => void;
  className?: string;
  'data-testid'?: string;
}

const defaultIcons = {
  dashboard: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-10zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
    </svg>
  ),
  operations: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
    </svg>
  ),
  sustainability: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  ),
  reports: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
    </svg>
  ),
  settings: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
    </svg>
  ),
};

export const Sidebar: React.FC<SidebarProps> = ({
  items,
  title = 'PetroVue',
  logo,
  user,
  collapsed = false,
  onToggle,
  className,
  'data-testid': testId,
}) => {
  const handleItemClick = (item: SidebarItemType) => {
    if (!item.disabled) {
      if (item.onClick) {
        item.onClick();
      } else if (item.href) {
        window.location.href = item.href;
      }
    }
  };

  const renderItem = (item: SidebarItemType) => {
    const icon = item.icon || defaultIcons[item.id as keyof typeof defaultIcons];
    
    return (
      <SidebarItem
        key={item.id}
        active={item.active || false}
        disabled={item.disabled || false}
        collapsed={collapsed}
        onClick={() => handleItemClick(item)}
      >
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: collapsed ? '0' : '0.75rem',
          flex: 1,
          minWidth: 0,
          overflow: 'hidden'
        }}>
          {icon && (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              width: '20px',
              height: '20px',
              flexShrink: 0
            }}>
              {icon}
            </div>
          )}
          {!collapsed && (
            <span style={{ 
              fontSize: '0.875rem', 
              fontWeight: item.active ? '600' : '400',
              color: item.disabled ? '#9ca3af' : 'inherit',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              flex: 1,
              minWidth: 0
            }}>
              {item.label}
            </span>
          )}
        </div>
        {!collapsed && item.badge && (
          <div style={{
            backgroundColor: item.active ? '#0066cc' : '#e5e7eb',
            color: item.active ? '#ffffff' : '#374151',
            fontSize: '0.75rem',
            fontWeight: '600',
            padding: '0.125rem 0.375rem',
            borderRadius: '9999px',
            minWidth: '1.25rem',
            textAlign: 'center'
          }}>
            {item.badge}
          </div>
        )}
      </SidebarItem>
    );
  };

  return (
    <SidebarContainer collapsed={collapsed} className={className} data-testid={testId}>
      <SidebarHeader collapsed={collapsed}>
        <div style={{ 
          width: '100%',
          display: 'flex',
          justifyContent: collapsed ? 'center' : 'flex-start',
          alignItems: 'center'
        }}>
          {logo || (
            <div style={{
              fontSize: collapsed ? '1.5rem' : '1.25rem',
              fontWeight: '700',
              color: '#0066cc',
              textAlign: collapsed ? 'center' : 'left',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              {collapsed ? 'PV' : title}
            </div>
          )}
        </div>
        {onToggle && (
          <button
            onClick={onToggle}
            style={{
              position: 'absolute',
              top: '1rem',
              right: collapsed ? '50%' : '1rem',
              transform: collapsed ? 'translateX(50%)' : 'none',
              marginTop: collapsed ? '2.5rem' : '0',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem',
              borderRadius: '4px',
              color: '#6b7280',
              transition: 'all 0.3s ease'
            }}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d={collapsed ? "M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" : "M2.5 8a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"} />
            </svg>
          </button>
        )}
      </SidebarHeader>

      <SidebarContent>
        {items.map(renderItem)}
      </SidebarContent>

      {user && (
        <SidebarFooter collapsed={collapsed}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.75rem',
            padding: '0.75rem',
            backgroundColor: '#f9fafb',
            borderRadius: '8px'
          }}>
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  objectFit: 'cover'
                }}
              />
            ) : (
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: '#0066cc',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: '600',
                  fontSize: '0.875rem'
                }}
              >
                {user.name.charAt(0).toUpperCase()}
              </div>
            )}
            {!collapsed && (
              <div style={{
                flex: 1,
                minWidth: 0,
                overflow: 'hidden'
              }}>
                <div style={{ 
                  fontSize: '0.875rem', 
                  fontWeight: '600', 
                  color: '#111827',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {user.name}
                </div>
                <div style={{ 
                  fontSize: '0.75rem', 
                  color: '#6b7280',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {user.role}
                </div>
              </div>
            )}
          </div>
        </SidebarFooter>
      )}
    </SidebarContainer>
  );
};

export default Sidebar;
