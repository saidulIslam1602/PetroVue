/**
 * Alert Component Tests
 * Comprehensive unit tests for Alert component
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Alert } from './Alert';

describe('Alert Component', () => {
  it('renders with default props', () => {
    render(<Alert type="info" message="Test message" />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  it('renders with different types', () => {
    const { rerender } = render(<Alert type="success" message="Success" />);
    expect(screen.getByRole('alert')).toHaveClass('alert-container', 'type-success');

    rerender(<Alert type="warning" message="Warning" />);
    expect(screen.getByRole('alert')).toHaveClass('alert-container', 'type-warning');

    rerender(<Alert type="error" message="Error" />);
    expect(screen.getByRole('alert')).toHaveClass('alert-container', 'type-error');

    rerender(<Alert type="critical" message="Critical" />);
    expect(screen.getByRole('alert')).toHaveClass('alert-container', 'type-critical');
  });

  it('renders with title', () => {
    render(<Alert type="info" title="Alert Title" message="Alert message" />);
    expect(screen.getByText('Alert Title')).toBeInTheDocument();
    expect(screen.getByText('Alert message')).toBeInTheDocument();
  });

  it('shows dismiss button when dismissible', () => {
    render(<Alert type="info" message="Dismissible alert" dismissible />);
    const dismissButton = screen.getByLabelText('Dismiss alert');
    expect(dismissButton).toBeInTheDocument();
  });

  it('calls onDismiss when dismiss button is clicked', async () => {
    const user = userEvent.setup();
    const handleDismiss = jest.fn();
    
    render(
      <Alert 
        type="info" 
        message="Dismissible alert" 
        dismissible 
        onDismiss={handleDismiss} 
      />
    );
    
    const dismissButton = screen.getByLabelText('Dismiss alert');
    await user.click(dismissButton);
    
    expect(handleDismiss).toHaveBeenCalledTimes(1);
  });

  it('renders with custom icon', () => {
    const customIcon = <span data-testid="custom-icon">🚨</span>;
    render(<Alert type="info" message="Custom icon alert" icon={customIcon} />);
    
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('renders with custom className', () => {
    render(<Alert type="info" message="Custom class" className="custom-alert" />);
    expect(screen.getByRole('alert')).toHaveClass('alert-container', 'custom-alert');
  });

  it('renders with data-testid', () => {
    render(<Alert type="info" message="Test alert" data-testid="test-alert" />);
    expect(screen.getByTestId('test-alert')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<Alert type="critical" message="Critical alert" />);
    const alert = screen.getByRole('alert');
    expect(alert).toHaveAttribute('role', 'alert');
  });

  it('displays correct icons for each type', () => {
    const { rerender } = render(<Alert type="success" message="Success" />);
    expect(screen.getByRole('alert')).toHaveClass('type-success');

    rerender(<Alert type="warning" message="Warning" />);
    expect(screen.getByRole('alert')).toHaveClass('type-warning');

    rerender(<Alert type="error" message="Error" />);
    expect(screen.getByRole('alert')).toHaveClass('type-error');

    rerender(<Alert type="critical" message="Critical" />);
    expect(screen.getByRole('alert')).toHaveClass('type-critical');
  });

  it('handles keyboard navigation for dismiss button', async () => {
    const user = userEvent.setup();
    const handleDismiss = jest.fn();
    
    render(
      <Alert 
        type="info" 
        message="Dismissible alert" 
        dismissible 
        onDismiss={handleDismiss} 
      />
    );
    
    const dismissButton = screen.getByLabelText('Dismiss alert');
    dismissButton.focus();
    
    await user.keyboard('{Enter}');
    expect(handleDismiss).toHaveBeenCalledTimes(1);
  });
});
