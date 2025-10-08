/**
 * Input Component
 * Form input component with validation and accessibility
 * Designed for oil & gas industry data entry
 */

import React, { forwardRef } from 'react';
import { InputContainer, InputField, InputLabel, InputError, InputHelper } from './Input.styles';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outlined' | 'filled';
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      size = 'md',
      variant = 'outlined',
      startIcon,
      endIcon,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const hasError = !!error;

    return (
      <InputContainer className={className}>
        {label && (
          <InputLabel htmlFor={inputId} hasError={hasError}>
            {label}
          </InputLabel>
        )}
        
        <div style={{ position: 'relative' }}>
          {startIcon && (
            <div
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#666',
                zIndex: 1,
              }}
            >
              {startIcon}
            </div>
          )}
          
          <InputField
            ref={ref}
            id={inputId}
            inputSize={size}
            variant={variant}
            hasError={hasError}
            hasStartIcon={!!startIcon}
            hasEndIcon={!!endIcon}
            {...props}
          />
          
          {endIcon && (
            <div
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#666',
                zIndex: 1,
              }}
            >
              {endIcon}
            </div>
          )}
        </div>
        
        {error && <InputError>{error}</InputError>}
        {helperText && !error && <InputHelper>{helperText}</InputHelper>}
      </InputContainer>
    );
  }
);

Input.displayName = 'Input';

export default Input;
