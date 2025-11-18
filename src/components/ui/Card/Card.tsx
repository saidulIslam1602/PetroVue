/**
 * Card Component
 * Versatile container component for displaying content
 * Optimized for oil & gas industry data presentation
 */

import React from 'react';
import { CardProps } from '../../../types';
import {
  CardContainer,
  CardHeader as CardHeaderStyled,
  CardContent as CardContentStyled,
  CardFooter as CardFooterStyled,
} from './Card.styles';

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'default',
      padding = 'md',
      children,
      className,
      'data-testid': testId,
      ...props
    },
    ref
  ) => {
    return (
      <CardContainer
        ref={ref}
        variant={variant}
        padding={padding}
        className={className}
        data-testid={testId}
        {...props}
      >
        {children}
      </CardContainer>
    );
  }
);

// Export subcomponents
export const CardHeaderComponent: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <CardHeaderStyled className={className}>{children}</CardHeaderStyled>
);

export const CardContentComponent: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <CardContentStyled className={className}>{children}</CardContentStyled>
);

export const CardFooterComponent: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <CardFooterStyled className={className}>{children}</CardFooterStyled>
);

export default Card;
