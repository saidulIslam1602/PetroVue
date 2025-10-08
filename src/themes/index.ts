/**
 * Design System Theme Configuration
 * Following Material Design 3 principles with oil & gas industry customization
 */

import { Theme } from '../types';

// Color Palette - Oil & Gas Industry Inspired
const colors = {
  // Primary - Deep Ocean Blue (representing offshore operations)
  primary: {
    50: '#e6f3ff',
    100: '#b3d9ff',
    200: '#80bfff',
    300: '#4da6ff',
    400: '#1a8cff',
    500: '#0066cc', // Main brand color
    600: '#0052a3',
    700: '#003d7a',
    800: '#002952',
    900: '#001429',
  },

  // Secondary - Safety Orange (representing safety and alerts)
  secondary: {
    50: '#fff3e6',
    100: '#ffd9b3',
    200: '#ffbf80',
    300: '#ffa64d',
    400: '#ff8c1a',
    500: '#ff6600', // Safety orange
    600: '#cc5200',
    700: '#993d00',
    800: '#662900',
    900: '#331400',
  },

  // Neutral - Professional Grays
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#eeeeee',
    300: '#e0e0e0',
    400: '#bdbdbd',
    500: '#9e9e9e',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },

  // Semantic Colors
  semantic: {
    success: '#4caf50', // Green for positive metrics
    warning: '#ff9800', // Orange for warnings
    error: '#f44336', // Red for critical alerts
    info: '#2196f3', // Blue for information
  },
} as const;

// Typography Scale
const typography = {
  fontFamily: {
    primary:
      '"Inter", "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif',
    secondary: '"Roboto Mono", "Consolas", "Monaco", monospace',
    mono: '"JetBrains Mono", "Fira Code", "Consolas", monospace',
  },
  fontSize: {
    xs: '0.75rem', // 12px
    sm: '0.875rem', // 14px
    base: '1rem', // 16px
    lg: '1.125rem', // 18px
    xl: '1.25rem', // 20px
    '2xl': '1.5rem', // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem', // 48px
  },
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
} as const;

// Spacing Scale (8px base unit)
const spacing = {
  xs: '0.25rem', // 4px
  sm: '0.5rem', // 8px
  md: '1rem', // 16px
  lg: '1.5rem', // 24px
  xl: '2rem', // 32px
  '2xl': '3rem', // 48px
  '3xl': '4rem', // 64px
  '4xl': '6rem', // 96px
} as const;

// Breakpoints
const breakpoints = {
  xs: '0px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  '2xl': '1400px',
} as const;

// Shadow Scale
const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
} as const;

// Border Radius Scale
const borderRadius = {
  none: '0',
  sm: '0.125rem', // 2px
  md: '0.375rem', // 6px
  lg: '0.5rem', // 8px
  xl: '0.75rem', // 12px
  full: '9999px',
} as const;

// Main Theme Object
export const theme: Theme = {
  palette: colors,
  typography,
  spacing,
  breakpoints,
  shadows,
  borderRadius,
} as const;

// Dark Theme Variant
export const darkTheme: Theme = {
  ...theme,
  palette: {
    ...colors,
    neutral: {
      50: '#212121',
      100: '#424242',
      200: '#616161',
      300: '#757575',
      400: '#9e9e9e',
      500: '#bdbdbd',
      600: '#e0e0e0',
      700: '#eeeeee',
      800: '#f5f5f5',
      900: '#fafafa',
    },
  },
} as const;

// Theme Utilities
export const getThemeColor = (
  colorPath: string,
  themeInstance: Theme = theme
): string => {
  const keys = colorPath.split('.');
  let value: unknown = themeInstance;

  for (const key of keys) {
    if (typeof value === 'object' && value !== null && key in value) {
      value = (value as Record<string, unknown>)[key];
    } else {
      // eslint-disable-next-line no-console
      console.warn(`Theme color not found: ${colorPath}`);
      return themeInstance.palette.neutral[500];
    }
  }

  return typeof value === 'string' ? value : themeInstance.palette.neutral[500];
};

// Responsive Utilities
export const mediaQueries = {
  xs: `@media (min-width: ${breakpoints.xs})`,
  sm: `@media (min-width: ${breakpoints.sm})`,
  md: `@media (min-width: ${breakpoints.md})`,
  lg: `@media (min-width: ${breakpoints.lg})`,
  xl: `@media (min-width: ${breakpoints.xl})`,
  '2xl': `@media (min-width: ${breakpoints['2xl']})`,
} as const;

export default theme;
