/// <reference types="cypress" />
// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands from commands.ts
import './commands';

// Global test setup
beforeEach(() => {
  // Reset any state before each test
  cy.window().then((win) => {
    // Clear localStorage if needed
    win.localStorage.clear();
    // Clear sessionStorage if needed
    win.sessionStorage.clear();
  });
});

// Global error handling
Cypress.on('uncaught:exception', (err, runnable) => {
  // Prevent Cypress from failing on known React errors
  if (
    err.message.includes('ResizeObserver loop limit exceeded') ||
    err.message.includes('Non-Error promise rejection captured')
  ) {
    return false;
  }
  return true;
});

