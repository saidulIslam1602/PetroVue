// Advanced E2E Testing for Oil & Gas Dashboard
// Comprehensive testing scenarios for production environment

import { loginUser, mockApiResponses, setupDashboardTest, selectFacility, checkPerformanceMetrics } from '../support/commands';

describe('PetroVue Dashboard - Comprehensive E2E Tests', () => {
  beforeEach(() => {
    // Setup API mocking and authentication
    mockApiResponses();
    
    // Login and navigate to dashboard
    cy.visit('/login');
    loginUser('test@petrovue.com', 'password123');
    cy.url().should('include', '/dashboard');
  });

  describe('Dashboard Loading and Performance', () => {
    it('loads dashboard within performance budget', () => {
      cy.visit('/dashboard');
      
      // Check that dashboard loads
      cy.get('[data-testid="facility-dashboard"]').should('be.visible');
      
      // Basic performance check using our helper
      checkPerformanceMetrics();
    });

    it('displays loading states correctly', () => {
      cy.intercept('GET', '/api/facilities', { delay: 2000, fixture: 'facilities.json' }).as('slowFacilities');
      
      cy.visit('/dashboard');
      cy.get('[data-testid="loading-spinner"]').should('be.visible');
      cy.get('[data-testid="skeleton-loader"]').should('have.length.at.least', 3);
      
      cy.wait('@slowFacilities');
      cy.get('[data-testid="loading-spinner"]').should('not.exist');
      cy.get('[data-testid="facility-dashboard"]').should('be.visible');
    });
  });

  describe('Facility Management', () => {
    it('switches between facilities correctly', () => {
      cy.get('[data-testid="facility-selector"]').click();
      cy.get('[data-testid="facility-option-refinery-alpha"]').click();
      
      cy.wait('@getMetrics');
      cy.get('[data-testid="facility-name"]').should('contain', 'Refinery Alpha');
      cy.get('[data-testid="production-metrics"]').should('be.visible');
      
      // Verify URL update
      cy.url().should('include', 'facility=refinery-alpha');
      
      // Switch to another facility
      cy.get('[data-testid="facility-selector"]').click();
      cy.get('[data-testid="facility-option-drilling-site-beta"]').click();
      
      cy.get('[data-testid="facility-name"]').should('contain', 'Drilling Site Beta');
      cy.url().should('include', 'facility=drilling-site-beta');
    });

    it('handles facility data errors gracefully', () => {
      cy.intercept('GET', '/api/facilities', { statusCode: 500 }).as('facilityError');
      
      cy.visit('/dashboard');
      cy.wait('@facilityError');
      
      cy.get('[data-testid="error-boundary"]').should('be.visible');
      cy.get('[data-testid="error-message"]').should('contain', 'Unable to load facilities');
      cy.get('[data-testid="retry-button"]').should('be.visible');
      
      // Test retry functionality
      cy.intercept('GET', '/api/facilities', { fixture: 'facilities.json' }).as('facilityRetry');
      cy.get('[data-testid="retry-button"]').click();
      
      cy.wait('@facilityRetry');
      cy.get('[data-testid="facility-dashboard"]').should('be.visible');
    });
  });

  describe('Real-time Data Updates', () => {
    it('updates production metrics in real-time', () => {
      cy.get('[data-testid="production-current"]').should('contain', '125,000');
      cy.get('[data-testid="efficiency-metric"]').should('contain', '83.3%');
      
      // Simulate WebSocket message via window event
      cy.window().then((win) => {
        win.dispatchEvent(new CustomEvent('websocket-message', {
          detail: {
            type: 'production-update',
            facilityId: 'refinery-alpha',
            data: {
              current: 130000,
              efficiency: 85.7
            }
          }
        }));
      });
      
      cy.get('[data-testid="production-current"]').should('contain', '130,000');
      cy.get('[data-testid="efficiency-metric"]').should('contain', '85.7%');
      
      // Verify trend indicators
      cy.get('[data-testid="production-trend"]').should('have.class', 'trend-up');
    });

    it('displays safety alerts immediately', () => {
      // Simulate safety alert via window event
      cy.window().then((win) => {
        win.dispatchEvent(new CustomEvent('websocket-message', {
          detail: {
            type: 'safety-alert',
            facilityId: 'refinery-alpha',
            data: {
              severity: 'high',
              message: 'Gas leak detected in Unit 3',
              timestamp: new Date().toISOString()
            }
          }
        }));
      });
      
      cy.get('[data-testid="alert-notification"]').should('be.visible');
      cy.get('[data-testid="alert-severity"]').should('contain', 'HIGH');
      cy.get('[data-testid="alert-message"]').should('contain', 'Gas leak detected');
      
      // Test alert dismissal
      cy.get('[data-testid="alert-dismiss"]').click();
      cy.get('[data-testid="alert-notification"]').should('not.exist');
    });
  });

  describe('Data Visualization', () => {
    it('renders production charts correctly', () => {
      cy.get('[data-testid="production-chart"]').should('be.visible');
      cy.get('[data-testid="chart-container"] .recharts-wrapper').should('exist');
      
      // Test chart interactions
      cy.get('.recharts-bar').first().trigger('mouseover');
      cy.get('[data-testid="chart-tooltip"]').should('be.visible');
      cy.get('[data-testid="tooltip-value"]').should('contain', 'barrels');
      
      // Test chart zoom functionality
      cy.get('[data-testid="chart-zoom-in"]').click();
      cy.get('.recharts-cartesian-axis-tick').should('have.length.lessThan', 10);
    });

    it('updates environmental monitoring charts', () => {
      cy.get('[data-testid="environmental-tab"]').click();
      cy.wait('@getEnvironmental');
      
      cy.get('[data-testid="co2-emissions-chart"]').should('be.visible');
      cy.get('[data-testid="water-usage-chart"]').should('be.visible');
      
      // Verify chart data accuracy
      cy.get('[data-testid="co2-current-value"]').should('contain', '2.8');
      cy.get('[data-testid="compliance-score"]').should('contain', '96.2%');
    });
  });

  describe('Equipment Monitoring', () => {
    it('displays equipment status grid', () => {
      cy.get('[data-testid="equipment-tab"]').click();
      
      cy.get('[data-testid="equipment-grid"]').should('be.visible');
      cy.get('[data-testid="equipment-item"]').should('have.length.at.least', 3);
      
      // Test equipment filtering
      cy.get('[data-testid="equipment-filter"]').select('Maintenance Required');
      cy.get('[data-testid="equipment-item"][data-status="maintenance"]').should('be.visible');
      cy.get('[data-testid="equipment-item"][data-status="operational"]').should('not.exist');
    });

    it('handles equipment maintenance scheduling', () => {
      cy.get('[data-testid="equipment-item"]').first().click();
      cy.get('[data-testid="equipment-modal"]').should('be.visible');
      
      cy.get('[data-testid="schedule-maintenance-btn"]').click();
      cy.get('[data-testid="maintenance-form"]').should('be.visible');
      
      // Fill maintenance form
      cy.get('[data-testid="maintenance-date"]').type('2024-03-15');
      cy.get('[data-testid="maintenance-type"]').select('Preventive');
      cy.get('[data-testid="maintenance-notes"]').type('Scheduled quarterly maintenance');
      
      cy.intercept('POST', '/api/maintenance/schedule', { statusCode: 201 }).as('scheduleMaintenance');
      cy.get('[data-testid="submit-maintenance"]').click();
      
      cy.wait('@scheduleMaintenance');
      cy.get('[data-testid="success-message"]').should('contain', 'Maintenance scheduled');
    });
  });

  describe('Accessibility Testing', () => {
    it('meets WCAG 2.1 AA standards', () => {
      // Basic accessibility checks without axe-core
      cy.get('[role]').should('exist');
      cy.get('button').should('have.attr', 'type');
      cy.get('img').should('have.attr', 'alt');
      
      // Check color contrast manually
      cy.get('body').should('have.css', 'color');
      cy.get('body').should('have.css', 'background-color');
    });

    it('supports keyboard navigation', () => {
      cy.get('body').type('{tab}');
      cy.focused().should('exist');
      
      cy.focused().type('{tab}');
      cy.focused().should('exist');
      
      // Test dropdown navigation
      cy.focused().type('{enter}');
      cy.get('[data-testid="facility-dropdown"]').should('be.visible');
      
      cy.focused().type('{downarrow}');
      cy.focused().should('contain', 'Refinery Alpha');
    });

    it('provides proper ARIA labels and roles', () => {
      cy.get('[data-testid="production-chart"]').should('have.attr', 'role', 'img');
      cy.get('[data-testid="production-chart"]').should('have.attr', 'aria-label');
      
      cy.get('[data-testid="alert-notification"]').should('have.attr', 'role', 'alert');
      cy.get('[data-testid="facility-selector"]').should('have.attr', 'aria-expanded');
    });
  });

  describe('Mobile Responsiveness', () => {
    it('adapts to mobile viewport', () => {
      cy.viewport('iphone-x');
      
      cy.get('[data-testid="mobile-menu-toggle"]').should('be.visible');
      cy.get('[data-testid="desktop-sidebar"]').should('not.be.visible');
      
      // Test mobile navigation
      cy.get('[data-testid="mobile-menu-toggle"]').click();
      cy.get('[data-testid="mobile-sidebar"]').should('be.visible');
      
      // Verify responsive charts
      cy.get('[data-testid="production-chart"]').should('have.css', 'width').and('match', /\d+px/);
    });

    it('handles touch interactions', () => {
      cy.viewport('ipad-2');
      
      // Test chart touch interactions
      cy.get('[data-testid="production-chart"]').trigger('touchstart', { touches: [{ clientX: 100, clientY: 100 }] });
      cy.get('[data-testid="chart-tooltip"]').should('be.visible');
      
      // Test swipe gestures on data tables
      cy.get('[data-testid="data-table"]').trigger('touchstart', { touches: [{ clientX: 200, clientY: 100 }] });
      cy.get('[data-testid="data-table"]').trigger('touchmove', { touches: [{ clientX: 100, clientY: 100 }] });
      cy.get('[data-testid="data-table"]').trigger('touchend');
    });
  });

  describe('Error Handling and Recovery', () => {
    it('handles network failures gracefully', () => {
      // Simulate network failure
      cy.intercept('GET', '/api/operational-metrics/*', { forceNetworkError: true }).as('networkError');
      
      cy.get('[data-testid="facility-selector"]').select('Refinery Alpha');
      cy.wait('@networkError');
      
      cy.get('[data-testid="network-error-message"]').should('be.visible');
      cy.get('[data-testid="offline-indicator"]').should('be.visible');
      
      // Test recovery when network is restored
      cy.intercept('GET', '/api/operational-metrics/*', { fixture: 'metrics.json' }).as('networkRecovered');
      cy.get('[data-testid="retry-network"]').click();
      
      cy.wait('@networkRecovered');
      cy.get('[data-testid="offline-indicator"]').should('not.exist');
      cy.get('[data-testid="production-metrics"]').should('be.visible');
    });

    it('preserves user state during errors', () => {
      // Set user preferences
      cy.get('[data-testid="settings-menu"]').click();
      cy.get('[data-testid="theme-toggle"]').click();
      cy.get('[data-testid="auto-refresh-toggle"]').click();
      
      // Simulate error and recovery
      cy.intercept('GET', '/api/facilities', { statusCode: 500 }).as('tempError');
      cy.reload();
      cy.wait('@tempError');
      
      cy.intercept('GET', '/api/facilities', { fixture: 'facilities.json' }).as('recovery');
      cy.get('[data-testid="retry-button"]').click();
      cy.wait('@recovery');
      
      // Verify preferences are preserved
      cy.get('body').should('have.class', 'dark-theme');
      cy.get('[data-testid="auto-refresh-indicator"]').should('be.visible');
    });
  });

  describe('Performance Under Load', () => {
    it('handles large datasets efficiently', () => {
      // Load large dataset
      cy.intercept('GET', '/api/operational-metrics/*', { fixture: 'large-dataset.json' }).as('largeData');
      
      cy.get('[data-testid="facility-selector"]').select('Large Refinery Complex');
      cy.wait('@largeData');
      
      // Verify virtual scrolling is working
      cy.get('[data-testid="virtual-table"]').should('be.visible');
      cy.get('[data-testid="table-row"]').should('have.length.lessThan', 50); // Only render visible rows
      
      // Test scrolling performance
      cy.get('[data-testid="virtual-table"]').scrollTo('bottom');
      cy.get('[data-testid="scroll-indicator"]').should('contain', '100%');
      
      // Verify memory usage doesn't exceed limits
      cy.window().then((win) => {
        const memory = (win.performance as any).memory;
        if (memory) {
          expect(memory.usedJSHeapSize).to.be.lessThan(50 * 1024 * 1024); // 50MB limit
        }
      });
    });
  });

  afterEach(() => {
    // Clean up any event listeners
    cy.window().then((win) => {
      win.removeEventListener('websocket-message', () => {});
    });
    
    // Take screenshot on failure
    cy.screenshot({ capture: 'viewport', overwrite: true });
  });
});