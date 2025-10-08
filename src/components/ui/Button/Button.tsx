/**
 * Button Component
 * A reusable, accessible button component following Material Design principles
 * Optimized for oil & gas industry applications
 */

import React from 'react';
import { ButtonProps } from '../../../types';
import { ButtonContainer, ButtonContent, LoadingSpinner, ButtonGroupContainer } from './Button.styles';

/**
 * Button component with multiple variants and sizes
 * Supports loading states and accessibility features
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  children,
  className,
  onClick,
  type = 'button',
  'data-testid': testId,
  ...props
}) => {
  const handleClick = () => {
    if (!disabled && !loading && onClick) {
      onClick();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  };

  return (
    <ButtonContainer
      variant={variant}
      size={size}
      disabled={disabled || loading}
      loading={loading}
      className={className}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      type={type}
      data-testid={testId}
      aria-disabled={disabled || loading}
      {...props}
    >
      <ButtonContent>
        {loading && <LoadingSpinner size={size} />}
        {children}
      </ButtonContent>
    </ButtonContainer>
  );
};

// Button Group Component
export const ButtonGroup: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return <ButtonGroupContainer className={className}>{children}</ButtonGroupContainer>;
};

export default Button;
