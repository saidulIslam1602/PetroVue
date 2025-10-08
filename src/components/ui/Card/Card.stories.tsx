/**
 * Card Component Storybook Stories
 * Professional examples for design system documentation
 */

import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeaderComponent as CardHeader, CardContentComponent as CardContent, CardFooterComponent as CardFooter } from './Card';
import { Button } from '../Button';

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile container component for displaying content, designed for oil & gas industry data presentation.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'elevated', 'outlined'],
      description: 'Visual style variant of the card',
    },
    padding: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Padding size of the card',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    children: 'This is a basic card component.',
  },
};

// With header and content
export const WithHeader: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <h3>Production Metrics</h3>
      </CardHeader>
      <CardContent>
        <p>Current oil production: 1,250 bbl/day</p>
        <p>Gas production: 2,100 mcf/day</p>
        <p>Water production: 850 bbl/day</p>
      </CardContent>
    </Card>
  ),
};

// With footer
export const WithFooter: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <h3>Safety Alert</h3>
      </CardHeader>
      <CardContent>
        <p>High pressure detected in pipeline section A-12. Immediate attention required.</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm">
          Dismiss
        </Button>
        <Button variant="primary" size="sm">
          View Details
        </Button>
      </CardFooter>
    </Card>
  ),
};

// Elevated variant
export const Elevated: Story = {
  args: {
    variant: 'elevated',
    children: 'This card has an elevated shadow effect.',
  },
};

// Outlined variant
export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: 'This card has a prominent border.',
  },
};

// Different padding sizes
export const PaddingSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Card padding="xs">
        <h4>Extra Small</h4>
        <p>Minimal padding</p>
      </Card>
      <Card padding="sm">
        <h4>Small</h4>
        <p>Small padding</p>
      </Card>
      <Card padding="md">
        <h4>Medium</h4>
        <p>Default padding</p>
      </Card>
      <Card padding="lg">
        <h4>Large</h4>
        <p>Large padding</p>
      </Card>
      <Card padding="xl">
        <h4>Extra Large</h4>
        <p>Maximum padding</p>
      </Card>
    </div>
  ),
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Card variant="default">
        <h4>Default</h4>
        <p>Standard card appearance</p>
      </Card>
      <Card variant="elevated">
        <h4>Elevated</h4>
        <p>Card with shadow</p>
      </Card>
      <Card variant="outlined">
        <h4>Outlined</h4>
        <p>Card with border</p>
      </Card>
    </div>
  ),
};
