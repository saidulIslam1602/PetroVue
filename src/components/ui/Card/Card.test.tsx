/**
 * Card Component Tests
 * Comprehensive unit tests for Card component
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  Card,
  CardHeaderComponent as CardHeader,
  CardContentComponent as CardContent,
  CardFooterComponent as CardFooter,
} from './Card';

describe('Card Component', () => {
  it('renders with default props', () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('renders with different variants', () => {
    const { rerender } = render(<Card variant='elevated'>Elevated</Card>);
    expect(screen.getByText('Elevated')).toBeInTheDocument();

    rerender(<Card variant='outlined'>Outlined</Card>);
    expect(screen.getByText('Outlined')).toBeInTheDocument();
  });

  it('renders with custom className', () => {
    render(<Card className='custom-card'>Custom</Card>);
    const card = screen.getByText('Custom');
    expect(card).toBeInTheDocument();
  });

  it('renders with data-testid', () => {
    render(<Card data-testid='test-card'>Test</Card>);
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
