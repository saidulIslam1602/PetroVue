/**
 * Card Component
 * Versatile container component for displaying content
 * Optimized for oil & gas industry data presentation
 */

import React from 'react';
import { CardProps } from '../../../types';
import { CardContainer, CardHeader, CardContent, CardFooter } from './Card.styles';

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  padding = 'md',
  children,
  className,
  'data-testid': testId,
  ...props
}) => {
  return (
    <CardContainer
      variant={variant}
      padding={padding}
      className={className}
      data-testid={testId}
      {...props}
    >
      {children}
    </CardContainer>
  );
};

export const CardHeaderComponent: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return <CardHeader className={className}>{children}</CardHeader>;
};

export const CardContentComponent: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return <CardContent className={className}>{children}</CardContent>;
};

export const CardFooterComponent: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return <CardFooter className={className}>{children}</CardFooter>;
};

export default Card;
