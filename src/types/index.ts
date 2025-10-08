/**
 * Core type definitions for PetroVue application
 * Following industry standards for type safety and maintainability
 */

// Theme and Design System Types
export interface Theme {
  palette: {
    primary: ColorPalette;
    secondary: ColorPalette;
    neutral: ColorPalette;
    semantic: SemanticColors;
  };
  typography: TypographyScale;
  spacing: SpacingScale;
  breakpoints: BreakpointScale;
  shadows: ShadowScale;
  borderRadius: BorderRadiusScale;
}

export interface ColorPalette {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
}

export interface SemanticColors {
  success: string;
  warning: string;
  error: string;
  info: string;
}

export interface TypographyScale {
  fontFamily: {
    primary: string;
    secondary: string;
    mono: string;
  };
  fontSize: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
    '5xl': string;
  };
  fontWeight: {
    light: number;
    normal: number;
    medium: number;
    semibold: number;
    bold: number;
  };
  lineHeight: {
    tight: number;
    normal: number;
    relaxed: number;
  };
}

export interface SpacingScale {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  '4xl': string;
}

export interface BreakpointScale {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
}

export interface ShadowScale {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
}

export interface BorderRadiusScale {
  none: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  full: string;
}

// Component Props Types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
  'data-testid'?: string;
}

export interface ButtonProps extends BaseComponentProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export interface CardProps extends BaseComponentProps {
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: keyof SpacingScale;
}

export interface HeaderProps {
  title?: string;
  onMenuToggle?: () => void;
  user?: {
    name: string;
    role: string;
    avatar?: string;
  };
  navigation?: Array<{
    label: string;
    href: string;
    active?: boolean;
  }>;
}

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outlined' | 'filled';
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
  'data-testid'?: string;
}

export interface TableColumn<T = Record<string, unknown>> {
  key: string;
  title: string;
  dataIndex?: keyof T;
  render?: (value: unknown, record: T, index: number) => React.ReactNode;
  width?: string | number;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
}

export interface TableProps<T = Record<string, unknown>> {
  columns: TableColumn<T>[];
  data: T[];
  loading?: boolean;
  emptyText?: string;
  size?: 'sm' | 'md' | 'lg';
  striped?: boolean;
  hoverable?: boolean;
  className?: string;
  'data-testid'?: string;
}

// Oil & Gas Industry Specific Types
export interface OperationalMetrics {
  production: {
    oil: number;
    gas: number;
    water: number;
  };
  efficiency: {
    uptime: number;
    utilization: number;
  };
  safety: {
    incidents: number;
    nearMisses: number;
    safetyScore: number;
  };
  environmental: {
    emissions: number;
    waste: number;
    energyConsumption: number;
  };
}

export interface Facility {
  id: string;
  name: string;
  type: 'platform' | 'refinery' | 'pipeline' | 'storage';
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  status: 'operational' | 'maintenance' | 'shutdown' | 'emergency';
  metrics: OperationalMetrics;
  lastUpdated: string;
}

export interface Alert {
  id: string;
  type: 'safety' | 'environmental' | 'operational' | 'maintenance';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  facilityId: string;
  timestamp: string;
  acknowledged: boolean;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  errors?: string[];
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form Types
export interface FormFieldProps {
  name: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  error?: string;
  helperText?: string;
}

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: unknown) => string | undefined;
}
