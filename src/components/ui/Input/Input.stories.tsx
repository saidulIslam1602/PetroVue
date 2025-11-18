/**
 * Input Component Storybook Stories
 * Professional examples for form components
 */

import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A form input component with validation and accessibility features, designed for oil & gas industry data entry.',
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size of the input field',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'outlined', 'filled'],
      description: 'Visual style variant of the input',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the input is disabled',
    },
    label: {
      control: { type: 'text' },
      description: 'Label text for the input',
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    placeholder: 'Enter value...',
  },
};

// With label
export const WithLabel: Story = {
  args: {
    label: 'Facility Name',
    placeholder: 'Enter facility name',
  },
};

// With helper text
export const WithHelperText: Story = {
  args: {
    label: 'Production Rate',
    placeholder: 'Enter production rate',
    helperText: 'Enter the daily production rate in barrels per day',
  },
};

// With error
export const WithError: Story = {
  args: {
    label: 'Pressure Reading',
    placeholder: 'Enter pressure',
    error: 'Pressure reading must be between 0 and 1000 PSI',
    defaultValue: '1500',
  },
};

// Size variants
export const Small: Story = {
  args: {
    size: 'sm',
    label: 'Small Input',
    placeholder: 'Small size',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    label: 'Medium Input',
    placeholder: 'Medium size',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    label: 'Large Input',
    placeholder: 'Large size',
  },
};

// Variant styles
export const Outlined: Story = {
  args: {
    variant: 'outlined',
    label: 'Outlined Input',
    placeholder: 'Outlined style',
  },
};

export const Filled: Story = {
  args: {
    variant: 'filled',
    label: 'Filled Input',
    placeholder: 'Filled style',
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    placeholder: 'Cannot edit',
    disabled: true,
    defaultValue: 'Read only value',
  },
};

// All sizes showcase
export const AllSizes: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        width: '300px',
      }}
    >
      <Input size='sm' label='Small' placeholder='Small input' />
      <Input size='md' label='Medium' placeholder='Medium input' />
      <Input size='lg' label='Large' placeholder='Large input' />
    </div>
  ),
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        width: '300px',
      }}
    >
      <Input variant='default' label='Default' placeholder='Default style' />
      <Input variant='outlined' label='Outlined' placeholder='Outlined style' />
      <Input variant='filled' label='Filled' placeholder='Filled style' />
    </div>
  ),
};
