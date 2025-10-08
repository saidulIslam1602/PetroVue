/**
 * Storybook Test Runner Configuration
 * Visual regression testing setup
 */

module.exports = {
  // Test configuration
  testMatch: [
    '**/*.stories.@(js|jsx|ts|tsx)',
  ],
  
  // Test environment
  testEnvironment: 'jsdom',
  
  // Setup files
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  
  // Transform configuration
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  
  // Module name mapping
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@types/(.*)$': '<rootDir>/src/types/$1',
    '^@themes/(.*)$': '<rootDir>/src/themes/$1',
    '^@constants/(.*)$': '<rootDir>/src/constants/$1',
  },
  
  // Coverage configuration
  collectCoverage: true,
  coverageDirectory: 'coverage/storybook',
  coverageReporters: ['text', 'lcov', 'html'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/index.tsx',
    '!src/setupTests.ts',
  ],
  
  // Visual regression testing
  visualRegression: {
    threshold: 0.2,
    updateSnapshots: false,
  },
  
  // Accessibility testing
  accessibility: {
    rules: [
      'color-contrast',
      'keyboard-navigation',
      'focus-management',
      'aria-labels',
    ],
  },
  
  // Performance testing
  performance: {
    budget: {
      'first-contentful-paint': 2000,
      'largest-contentful-paint': 4000,
      'cumulative-layout-shift': 0.1,
    },
  },
};
