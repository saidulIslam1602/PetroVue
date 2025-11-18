/// <reference types="cypress" />

// Cypress custom commands and utilities for PetroVue testing

// Helper functions for E2E tests (can be imported in test files)
export const loginUser = (email: string, password: string) => {
  cy.get('[data-testid="email-input"]').type(email);
  cy.get('[data-testid="password-input"]').type(password);
  cy.get('[data-testid="login-button"]').click();
};

export const mockApiResponses = () => {
  cy.intercept('GET', '/api/facilities', { fixture: 'facilities.json' }).as('getFacilities');
  cy.intercept('GET', '/api/operational-metrics/*', { fixture: 'metrics.json' }).as('getMetrics');
  cy.intercept('GET', '/api/environmental/*', { fixture: 'environmental.json' }).as('getEnvironmental');
};

export const setupDashboardTest = () => {
  mockApiResponses();
  cy.visit('/dashboard');
  cy.wait('@getFacilities');
};

export const selectFacility = (facilityName: string) => {
  cy.get('[data-testid="facility-selector"]').click();
  cy.get(`[data-testid="facility-option-${facilityName}"]`).click();
};

export const checkPerformanceMetrics = () => {
  cy.window().then((win) => {
    const navigation = win.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
    
    // Assert performance budgets
    expect(loadTime).to.be.lessThan(3000); // 3 second budget
  });
};