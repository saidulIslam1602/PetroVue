/**
 * Redux Store Configuration
 * Global state management for PetroVue application
 */

import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { FacilityData, OperationalMetrics, AlertData } from '../services/dataService';

// Facility slice
interface FacilityState {
  selectedFacilityId: string;
  facilities: FacilityData[];
  loading: boolean;
  error: string | null;
}

const initialFacilityState: FacilityState = {
  selectedFacilityId: 'PLT-001',
  facilities: [],
  loading: false,
  error: null,
};

const facilitySlice = createSlice({
  name: 'facility',
  initialState: initialFacilityState,
  reducers: {
    setSelectedFacility: (state, action: PayloadAction<string>) => {
      state.selectedFacilityId = action.payload;
    },
    setFacilities: (state, action: PayloadAction<FacilityData[]>) => {
      state.facilities = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

// Operational data slice
interface OperationalState {
  metrics: OperationalMetrics | null;
  alerts: AlertData[];
  loading: boolean;
  error: string | null;
  lastUpdated: string | null;
}

const initialOperationalState: OperationalState = {
  metrics: null,
  alerts: [],
  loading: false,
  error: null,
  lastUpdated: null,
};

const operationalSlice = createSlice({
  name: 'operational',
  initialState: initialOperationalState,
  reducers: {
    setMetrics: (state, action: PayloadAction<OperationalMetrics>) => {
      state.metrics = action.payload;
      state.lastUpdated = new Date().toISOString();
      state.loading = false;
      state.error = null;
    },
    setAlerts: (state, action: PayloadAction<AlertData[]>) => {
      state.alerts = action.payload;
    },
    addAlert: (state, action: PayloadAction<AlertData>) => {
      state.alerts.unshift(action.payload);
    },
    dismissAlert: (state, action: PayloadAction<string>) => {
      state.alerts = state.alerts.filter(alert => alert.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

// UI state slice
interface UIState {
  sidebarCollapsed: boolean;
  activeView: string;
  theme: 'light' | 'dark';
  notifications: {
    id: string;
    type: 'success' | 'warning' | 'error' | 'info';
    message: string;
    timestamp: string;
  }[];
}

const initialUIState: UIState = {
  sidebarCollapsed: false,
  activeView: 'dashboard',
  theme: 'light',
  notifications: [],
};

const uiSlice = createSlice({
  name: 'ui',
  initialState: initialUIState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    setActiveView: (state, action: PayloadAction<string>) => {
      state.activeView = action.payload;
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
    addNotification: (state, action: PayloadAction<Omit<UIState['notifications'][0], 'id' | 'timestamp'>>) => {
      const notification = {
        ...action.payload,
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
      };
      state.notifications.push(notification);
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload);
    },
  },
});

// Configure store
export const store = configureStore({
  reducer: {
    facility: facilitySlice.reducer,
    operational: operationalSlice.reducer,
    ui: uiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export actions
export const facilityActions = facilitySlice.actions;
export const operationalActions = operationalSlice.actions;
export const uiActions = uiSlice.actions;

// Selectors
export const selectSelectedFacilityId = (state: RootState) => state.facility.selectedFacilityId;
export const selectFacilities = (state: RootState) => state.facility.facilities;
export const selectOperationalMetrics = (state: RootState) => state.operational.metrics;
export const selectAlerts = (state: RootState) => state.operational.alerts;
export const selectActiveView = (state: RootState) => state.ui.activeView;
export const selectSidebarCollapsed = (state: RootState) => state.ui.sidebarCollapsed;
export const selectNotifications = (state: RootState) => state.ui.notifications;