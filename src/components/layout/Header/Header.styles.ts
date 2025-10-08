/**
 * Header Component Styles
 * Professional styling for oil & gas industry applications
 */

import styled from '@emotion/styled';

export const HeaderContainer = styled.header`
  background-color: #ffffff;
  border-bottom: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
`;

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
  height: 64px;
  max-width: 1200px;
  margin: 0 auto;
`;

export const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #0066cc;
  text-decoration: none;
`;

export const Navigation = styled.nav`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 768px) {
    display: none;
  }

  a {
    color: #666;
    text-decoration: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    font-weight: 400;
    transition: all 0.2s ease;

    &:hover {
      color: #0066cc;
      background-color: #f5f5f5;
    }

    &.active {
      color: #0066cc;
      font-weight: 600;
      background-color: #e6f3ff;
    }
  }
`;

export const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const MobileMenuButton = styled.button`
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 24px;
  height: 24px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;

  @media (max-width: 768px) {
    display: flex;
  }

  span {
    width: 100%;
    height: 2px;
    background-color: #333;
    border-radius: 1px;
    transition: all 0.3s ease;
  }

  &:hover span {
    background-color: #0066cc;
  }
`;
