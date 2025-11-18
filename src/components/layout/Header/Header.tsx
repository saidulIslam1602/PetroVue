/**
 * Header Component
 * Main application header with navigation and user controls
 * Designed for oil & gas industry applications
 */

import React, { useState } from 'react';
import { HeaderContainer, HeaderContent, Logo, Navigation, UserSection, MobileMenuButton } from './Header.styles';
import { Button } from '../../ui/Button';

export interface HeaderProps {
  title?: string;
  onMenuToggle?: () => void;
  user?: {
    name: string;
    role: string;
    avatar?: string;
  };
  navigation?: Array<{
    label: string;
    href: string;
    active?: boolean;
    onClick?: () => void;
  }>;
}

export const Header: React.FC<HeaderProps> = ({
  title = 'PetroVue',
  onMenuToggle,
  user,
  navigation = [],
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    onMenuToggle?.();
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <MobileMenuButton onClick={handleMenuToggle} aria-label="Toggle navigation menu">
            <span></span>
            <span></span>
            <span></span>
          </MobileMenuButton>
          <Logo>{title}</Logo>
        </div>

        <Navigation>
          {navigation.map((item, index) => (
            <a
              key={index}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                item.onClick?.();
              }}
              style={{
                color: item.active ? '#0066cc' : '#666',
                textDecoration: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                fontWeight: item.active ? '600' : '400',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
              }}
            >
              {item.label}
            </a>
          ))}
        </Navigation>

        <UserSection>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#212121' }}>
                  {user.name}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#666' }}>
                  {user.role}
                </div>
              </div>
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                  }}
                />
              ) : (
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: '#0066cc',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: '600',
                    fontSize: '1rem',
                  }}
                >
                  {user.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          ) : (
            <Button variant="outline" size="sm">
              Sign In
            </Button>
          )}
        </UserSection>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
