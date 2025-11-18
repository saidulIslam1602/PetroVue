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
  style?: React.CSSProperties;
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

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
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

export interface ChartData {
  name: string;
  value?: number;
  [key: string]: string | number | undefined;
}

export interface ChartProps {
  type: 'line' | 'area' | 'bar' | 'pie';
  data: ChartData[];
  title?: string;
  width?: string | number;
  height?: string | number;
  xAxisKey?: string;
  yAxisKey?: string;
  colors?: string[];
  showLegend?: boolean;
  showGrid?: boolean;
  loading?: boolean;
  error?: string;
  className?: string;
  'data-testid'?: string;
}

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string | number;
  onChange?: (value: string | number, option: SelectOption) => void;
  placeholder?: string;
  searchable?: boolean;
  disabled?: boolean;
  error?: string;
  label?: string;
  helperText?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  'data-testid'?: string;
}

export interface AlertProps {
  type: 'success' | 'warning' | 'error' | 'info' | 'critical';
  title?: string;
  message: string;
  dismissible?: boolean;
  onDismiss?: () => void;
  icon?: React.ReactNode;
  className?: string;
  'data-testid'?: string;
}

export interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  change?: {
    value: number;
    type: 'increase' | 'decrease' | 'neutral';
    period?: string;
  };
  icon?: React.ReactNode;
  status?: 'normal' | 'warning' | 'critical' | 'success';
  trend?: 'up' | 'down' | 'stable';
  className?: string;
  'data-testid'?: string;
}

export interface SidebarItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
  badge?: string | number;
  children?: SidebarItem[];
}

export interface SidebarProps {
  items: SidebarItem[];
  title?: string;
  logo?: React.ReactNode;
  user?: {
    name: string;
    role: string;
    avatar?: string;
  };
  collapsed?: boolean;
  onToggle?: () => void;
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

// Additional Industry-Specific Types for Phase 4
export interface SafetyMetrics {
  overallScore: number;
  daysSinceIncident: number;
  totalIncidents: number;
  criticalAlerts: number;
  complianceRate: number;
  lastInspection: string;
  nextInspection: string;
}

export interface SafetyIncident {
  id: string;
  type: 'injury' | 'equipment' | 'environmental' | 'process';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  location: string;
  timestamp: string;
  status: 'open' | 'investigating' | 'resolved';
  assignedTo?: string;
}

export interface WellData {
  id: string;
  name: string;
  type: 'oil' | 'gas' | 'water' | 'injection';
  status: 'active' | 'inactive' | 'maintenance' | 'shut-in';
  production: {
    rate: number;
    unit: string;
    efficiency: number;
  };
  pressure: {
    current: number;
    target: number;
    unit: string;
  };
  lastUpdate: string;
  location: {
    platform: string;
    zone: string;
  };
}

export interface ProductionMetrics {
  totalOil: number;
  totalGas: number;
  totalWater: number;
  efficiency: number;
  activeWells: number;
  totalWells: number;
  dailyTarget: number;
  monthlyTarget: number;
}

export interface EnvironmentalMetrics {
  emissions: {
    co2: number;
    methane: number;
    nox: number;
    sox: number;
    unit: string;
  };
  waste: {
    hazardous: number;
    nonHazardous: number;
    recycled: number;
    unit: string;
  };
  water: {
    consumption: number;
    discharge: number;
    treatment: number;
    unit: string;
  };
  compliance: {
    airQuality: number;
    waterQuality: number;
    wasteManagement: number;
    overall: number;
  };
  sustainability: {
    energyEfficiency: number;
    renewableEnergy: number;
    carbonIntensity: number;
  };
}

export interface EnvironmentalAlert {
  id: string;
  type: 'emission' | 'waste' | 'water' | 'compliance';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  location: string;
  timestamp: string;
  status: 'active' | 'investigating' | 'resolved';
}

export interface EquipmentItem {
  id: string;
  name: string;
  type: 'pump' | 'compressor' | 'generator' | 'valve' | 'sensor' | 'turbine';
  status: 'operational' | 'maintenance' | 'critical' | 'offline';
  health: number;
  location: string;
  lastMaintenance: string;
  nextMaintenance: string;
  performance: {
    efficiency: number;
    uptime: number;
    load: number;
  };
  alerts: number;
}

export interface MaintenanceTask {
  id: string;
  equipmentId: string;
  equipmentName: string;
  type: 'preventive' | 'corrective' | 'emergency';
  priority: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  scheduledDate: string;
  estimatedDuration: number;
  assignedTo?: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'overdue';
}
