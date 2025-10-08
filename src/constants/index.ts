/**
 * Application constants following industry standards
 * Centralized configuration for maintainability
 */

// Application Configuration
export const APP_CONFIG = {
  name: 'PetroVue',
  version: '1.0.0',
  description: 'Advanced Oil & Gas Operations Dashboard',
  author: 'PetroVue Team',
} as const;

// API Configuration
export const API_CONFIG = {
  baseUrl: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api',
  timeout: 10000,
  retryAttempts: 3,
} as const;

// Route Paths
export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  OPERATIONS: '/operations',
  SUSTAINABILITY: '/sustainability',
  REPORTS: '/reports',
  SETTINGS: '/settings',
  LOGIN: '/login',
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'petro_vue_auth_token',
  USER_PREFERENCES: 'petro_vue_user_preferences',
  THEME: 'petro_vue_theme',
  LANGUAGE: 'petro_vue_language',
} as const;

// Oil & Gas Industry Constants
export const INDUSTRY_CONSTANTS = {
  // Production Units
  PRODUCTION_UNITS: {
    OIL: 'bbl/day', // barrels per day
    GAS: 'mcf/day', // thousand cubic feet per day
    WATER: 'bbl/day',
    ENERGY: 'MWh',
  },

  // Safety Thresholds
  SAFETY_THRESHOLDS: {
    CRITICAL_INCIDENTS: 0,
    HIGH_INCIDENTS: 1,
    MEDIUM_INCIDENTS: 3,
    LOW_INCIDENTS: 5,
  },

  // Environmental Limits
  ENVIRONMENTAL_LIMITS: {
    CO2_EMISSIONS: 1000, // tons per day
    WASTE_GENERATION: 100, // tons per day
    WATER_USAGE: 10000, // gallons per day
  },

  // Facility Types
  FACILITY_TYPES: {
    PLATFORM: 'platform',
    REFINERY: 'refinery',
    PIPELINE: 'pipeline',
    STORAGE: 'storage',
  },

  // Alert Types
  ALERT_TYPES: {
    SAFETY: 'safety',
    ENVIRONMENTAL: 'environmental',
    OPERATIONAL: 'operational',
    MAINTENANCE: 'maintenance',
  },

  // Alert Severity Levels
  ALERT_SEVERITY: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    CRITICAL: 'critical',
  },
} as const;

// UI Constants
export const UI_CONSTANTS = {
  // Animation Durations (ms)
  ANIMATION_DURATION: {
    FAST: 150,
    NORMAL: 300,
    SLOW: 500,
  },

  // Z-Index Layers
  Z_INDEX: {
    DROPDOWN: 1000,
    STICKY: 1020,
    FIXED: 1030,
    MODAL_BACKDROP: 1040,
    MODAL: 1050,
    POPOVER: 1060,
    TOOLTIP: 1070,
  },

  // Grid Breakpoints
  GRID_BREAKPOINTS: {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1400,
  },

  // Component Sizes
  COMPONENT_SIZES: {
    BUTTON: {
      SM: '32px',
      MD: '40px',
      LG: '48px',
    },
    INPUT: {
      SM: '32px',
      MD: '40px',
      LG: '48px',
    },
  },
} as const;

// Validation Rules
export const VALIDATION_RULES = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^\+?[\d\s\-()]+$/,
  PASSWORD: {
    MIN_LENGTH: 8,
    REQUIRE_UPPERCASE: true,
    REQUIRE_LOWERCASE: true,
    REQUIRE_NUMBERS: true,
    REQUIRE_SPECIAL_CHARS: true,
  },
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  FORBIDDEN: 'Access denied.',
  NOT_FOUND: 'The requested resource was not found.',
  SERVER_ERROR: 'Internal server error. Please try again later.',
  VALIDATION: 'Please check your input and try again.',
  GENERIC: 'An unexpected error occurred. Please try again.',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  SAVED: 'Changes saved successfully.',
  DELETED: 'Item deleted successfully.',
  CREATED: 'Item created successfully.',
  UPDATED: 'Item updated successfully.',
  EXPORTED: 'Data exported successfully.',
} as const;
