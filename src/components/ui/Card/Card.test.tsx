/**
 * Card Component Tests
 * Comprehensive unit tests for Card component
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { Card, CardHeader, CardContent, CardFooter } from './Card';

describe('Card Component', () => {
  it('renders with default props', () => {
    render(<Card>Card content</Card>);
    const card = screen.getByText('Card content').closest('.card-container');
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass('card-container', 'variant-default');
  });

  it('renders with different variants', () => {
    const { rerender } = render(<Card variant="elevated">Elevated</Card>);
    expect(screen.getByText('Elevated').closest('.card-container')).toHaveClass('variant-elevated');

    rerender(<Card variant="outlined">Outlined</Card>);
    expect(screen.getByText('Outlined').closest('.card-container')).toHaveClass('variant-outlined');
  });

  it('renders with custom className', () => {
    render(<Card className="custom-card">Custom</Card>);
    const card = screen.getByText('Custom').closest('.card-container');
    expect(card).toHaveClass('card-container', 'custom-card');
  });

  it('renders with data-testid', () => {
    render(<Card data-testid="test-card">Test</Card>);
    expect(screen.getByTestId('test-card')).toBeInTheDocument();
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Card ref={ref}>Ref Card</Card>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

describe('Card Subcomponents', () => {
  it('renders CardHeader', () => {
    render(
      <Card>
        <CardHeader>Header Content</CardHeader>
        <div>Body Content</div>
      </Card>
    );
    
    expect(screen.getByText('Header Content')).toBeInTheDocument();
    expect(screen.getByText('Body Content')).toBeInTheDocument();
  });

  it('renders CardContent', () => {
    render(
      <Card>
        <CardContent>Content</CardContent>
      </Card>
    );
    
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('renders CardFooter', () => {
    render(
      <Card>
        <div>Body</div>
        <CardFooter>Footer Content</CardFooter>
      </Card>
    );
    
    expect(screen.getByText('Footer Content')).toBeInTheDocument();
  });

  it('renders complete card structure', () => {
    render(
      <Card>
        <CardHeader>Header</CardHeader>
        <CardContent>Content</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>
    );
    
    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });
});
