/**
 * Dashboard End-to-End Tests
 * Comprehensive E2E tests for PetroVue dashboard functionality
 */

describe('PetroVue Dashboard', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('loads the main dashboard', () => {
    cy.contains('PetroVue').should('be.visible');
    cy.contains('Modern Oil & Gas Operations Dashboard').should('be.visible');
  });

  it('navigates between different views', () => {
    // Test sidebar navigation
    cy.get('[data-testid="sidebar"]').should('be.visible');
    
    // Navigate to Operations
    cy.contains('Operations').click();
    cy.url().should('include', '/operations');
    cy.contains('Operational Dashboard').should('be.visible');
    
    // Navigate to Safety
    cy.contains('Safety Monitor').click();
    cy.contains('Safety Monitor').should('be.visible');
    
    // Navigate to Production
    cy.contains('Production').click();
    cy.contains('Production Tracker').should('be.visible');
    
    // Navigate to Environmental
    cy.contains('Environmental').click();
    cy.contains('Environmental Monitor').should('be.visible');
    
    // Navigate to Equipment
    cy.contains('Equipment').click();
    cy.contains('Equipment Status').should('be.visible');
  });

  it('displays operational metrics correctly', () => {
    cy.contains('Operations').click();
    
    // Check for key metrics
    cy.contains('Oil Production').should('be.visible');
    cy.contains('Gas Production').should('be.visible');
    cy.contains('Safety Score').should('be.visible');
    cy.contains('Equipment Status').should('be.visible');
    
    // Check for metric values
    cy.contains('1250').should('be.visible'); // Oil production
    cy.contains('2100').should('be.visible'); // Gas production
    cy.contains('98').should('be.visible'); // Safety score
  });

  it('shows and handles alerts', () => {
    cy.contains('Operations').click();
    
    // Check for alerts
    cy.contains('Active Alerts').should('be.visible');
    cy.contains('High Pressure Alert').should('be.visible');
    cy.contains('Maintenance Due').should('be.visible');
    
    // Test alert dismissal (if dismissible)
    cy.get('[role="alert"]').first().within(() => {
      cy.get('button[aria-label="Dismiss alert"]').click();
    });
  });

  it('displays charts and visualizations', () => {
    cy.contains('Operations').click();
    
    // Check for production trends chart
    cy.contains('Real-time Production Trends').should('be.visible');
    cy.get('.recharts-wrapper').should('be.visible');
    
    // Check for system status
    cy.contains('System Status').should('be.visible');
  });

  it('handles form interactions', () => {
    cy.contains('Operations').click();
    
    // Test facility selection
    cy.get('select').first().select('Platform Alpha');
    
    // Test input fields
    cy.get('input[placeholder*="production"]').type('1500');
    cy.get('input[placeholder*="pressure"]').type('850');
    
    // Test form submission
    cy.contains('Save').click();
  });

  it('responds to mobile viewport', () => {
    cy.viewport(375, 667); // iPhone SE
    
    // Check if sidebar collapses
    cy.get('[data-testid="sidebar"]').should('have.class', 'collapsed');
    
    // Check if content is still accessible
    cy.contains('PetroVue').should('be.visible');
  });

  it('maintains accessibility standards', () => {
    // Check for proper heading hierarchy
    cy.get('h1').should('exist');
    cy.get('h2').should('exist');
    
    // Check for proper form labels
    cy.get('input').each(($input) => {
      cy.wrap($input).should('have.attr', 'aria-label').or('have.attr', 'aria-labelledby');
    });
    
    // Check for proper button labels
    cy.get('button').each(($button) => {
      cy.wrap($button).should('have.text').or('have.attr', 'aria-label');
    });
    
    // Check for proper ARIA roles
    cy.get('[role="alert"]').should('exist');
    cy.get('[role="button"]').should('exist');
  });

  it('handles keyboard navigation', () => {
    // Test tab navigation
    cy.get('body').tab();
    cy.focused().should('have.attr', 'tabindex');
    
    // Test escape key functionality
    cy.get('body').type('{esc}');
    
    // Test enter key on buttons
    cy.contains('Operations').focus().type('{enter}');
    cy.contains('Operational Dashboard').should('be.visible');
  });

  it('displays real-time data updates', () => {
    cy.contains('Operations').click();
    
    // Wait for initial data load
    cy.contains('Last Updated:').should('be.visible');
    
    // Test refresh functionality
    cy.contains('Refresh Data').click();
    cy.contains('Refreshing...').should('be.visible');
  });

  it('handles error states gracefully', () => {
    // Simulate network error
    cy.intercept('GET', '**/api/**', { forceNetworkError: true });
    
    cy.contains('Operations').click();
    
    // Should still display the interface
    cy.contains('Operational Dashboard').should('be.visible');
  });
});
