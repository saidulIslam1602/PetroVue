# PetroVue - Sustainable Energy Data Platform

> **Modern environmental data visualization for the energy transition**

A React application demonstrating expertise in building sustainable, data-driven solutions for environmental reporting and carbon management. Built with React 19, TypeScript, and Material-UI.

[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Material-UI](https://img.shields.io/badge/Material--UI-7.3.4-007FFF?logo=mui)](https://mui.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.23-ff69b4?logo=framer)](https://www.framer.com/motion/)

---

## 🌱 Sustainability First

This platform showcases how technology can drive environmental accountability and support the transition to sustainable energy practices. Every feature is designed with environmental impact measurement and reduction at its core.

### Key Sustainability Features

- **Carbon Footprint Tracking** - Interactive calculator with Scope 1, 2, and 3 emissions
- **Environmental Reporting** - Automated report generation for compliance
- **ESG Dashboard** - Comprehensive Environmental, Social, and Governance metrics
- **Renewable Energy Integration** - Track renewable energy adoption and progress
- **Waste & Water Management** - Monitor resource consumption and recycling rates

---

## 🚀 Technology Stack

### Frontend
- **React 19.2.0** - Latest React with concurrent rendering
- **TypeScript 4.9.5** - Strict type safety
- **Material-UI 7.3.4** - Enterprise component library
- **Framer Motion 12.23** - Smooth animations and micro-interactions
- **Recharts** - Data visualization
- **Redux Toolkit 2.9.0** - State management
- **Emotion** - CSS-in-JS styling

### Development & Quality
- **Jest** - Unit testing
- **React Testing Library** - Component testing
- **Cypress** - End-to-end testing
- **ESLint** - Code quality
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **Webpack 5** - Custom build configuration
- **Babel** - JavaScript compilation

### Architecture Patterns
- Component-based architecture
- Custom hooks for data fetching
- Service layer for API interactions
- Centralized state management
- TypeScript interfaces for type safety
- Performance optimization utilities
- Accessibility utilities (WCAG 2.1 AA)

---

## 💼 For the Norwegian Market

This project demonstrates alignment with Norwegian energy sector requirements:
- Norwegian environmental regulations awareness
- Sustainability focus for modern energy companies
- Real-time environmental data visualization
- Professional localization approach

### Norwegian Localization
- Norwegian (nb-NO) terminology support
- 100+ industry-specific Norwegian terms
- References to Oljedirektoratet and Petroleumstilsynet
- Norwegian Continental Shelf (NCS) terminology

---

## 📊 Core Features

### 1. Dashboard
Modern landing page with:
- Hero section with gradient backgrounds and animations
- Real-time statistics with animated counters
- Environmental performance trend charts
- Quick access to all modules
- Demo data indicator

### 2. Environmental Monitoring
Real-time environmental metrics tracking:
- CO₂, methane, NOx, SOx emissions
- Water consumption and discharge
- Waste generation and recycling
- Compliance scores

### 3. Carbon Footprint Calculator
Interactive carbon management tool:
- Scope 1, 2, and 3 emissions breakdown
- Carbon intensity calculations
- Reduction recommendations
- Historical tracking

### 4. ESG Sustainability Dashboard
Comprehensive ESG reporting:
- Environmental performance metrics
- Social responsibility indicators
- Governance transparency
- Renewable energy tracking
- Climate goals monitoring
- Paris Agreement alignment

### 5. Operational Dashboards
Industry-specific operational views:
- **Operations** - Real-time operational metrics
- **Safety** - Incident tracking and safety scores
- **Production** - Production efficiency and well performance
- **Equipment** - Equipment health and maintenance

### 6. Report Generator
Automated environmental reporting:
- Environmental compliance reports
- ESG performance reports
- Operational summary reports
- Customizable templates

---

## 🎯 Modern UI/UX Features

### Design Elements
- **Dark Theme** - Professional dark mode with gradient accents
- **Glassmorphism** - Modern frosted glass effects
- **Smooth Animations** - Framer Motion powered transitions
- **Micro-interactions** - Engaging user feedback
- **Loading States** - Skeleton screens and loading indicators
- **Responsive Design** - Mobile, tablet, and desktop support

### Navigation
- **Dual Navigation** - Header and sidebar navigation
- **Active Indicators** - Clear visual feedback
- **Professional Logo** - Custom hexagonal oil & gas icon
- **Collapsible Sidebar** - Space-efficient design

### Components
- **Enhanced Charts** - Advanced Recharts with gradients
- **Animated Cards** - Entrance and hover animations
- **Animated Counters** - Smooth number transitions
- **Metric Cards** - KPI displays with trend indicators
- **Modern Hero Section** - Full-screen landing with animations

---

## 🚀 Quick Start

### Prerequisites
```bash
Node.js 18+
npm or yarn
```

### Installation

```bash
# Clone the repository
git clone https://github.com/saidulIslam1602/PetroVue.git
cd PetroVue

# Install dependencies
npm install

# Start development server
npm start

# Open browser to http://localhost:3000
```

### Available Scripts

```bash
npm start          # Development server with hot reload
npm run build      # Production build (optimized)
npm test           # Run unit tests with Jest
npm run test:e2e   # Run Cypress E2E tests (when configured)
npm run lint       # ESLint code quality check
npm run format     # Prettier code formatting
```

---

## 🏗️ Project Structure

```
src/
├── components/
│   ├── industry/              # Domain-specific components
│   │   ├── ESGSustainabilityDashboard/
│   │   ├── EnvironmentalMonitor/
│   │   ├── CarbonFootprintCalculator/
│   │   ├── ReportGenerator/
│   │   ├── SustainabilityInsights/
│   │   ├── OperationalDashboard/
│   │   ├── SafetyMonitor/
│   │   ├── ProductionTracker/
│   │   ├── EquipmentStatus/
│   │   └── WellPerformanceAnalytics/
│   ├── ui/                    # Reusable UI components
│   │   ├── Button/
│   │   ├── Card/
│   │   ├── Chart/
│   │   ├── Input/
│   │   ├── AnimatedCard/
│   │   ├── AnimatedCounter/
│   │   ├── EnhancedChart/
│   │   ├── LoadingSkeleton/
│   │   └── Logo/
│   └── layout/                # Layout components
│       ├── Header/
│       ├── Sidebar/
│       └── Hero/
├── services/
│   ├── api.ts                 # API client with retry logic
│   ├── enhancedApi.ts         # Advanced API with caching
│   └── dataService.ts         # Business logic and mock data
├── hooks/                     # Custom React hooks
│   └── useData.ts            # Data fetching hooks
├── store/                     # Redux state management
│   └── index.ts              # Redux store configuration
├── utils/
│   ├── performance.ts         # Performance optimization
│   └── accessibility.ts       # WCAG 2.1 AA utilities
├── constants/
│   ├── index.ts              # App constants
│   └── norwegianLocalization.ts  # Norwegian terminology
├── types/                     # TypeScript definitions
│   └── index.ts              # Type definitions
└── themes/                    # Theme configuration
    └── index.ts              # Design system theme
```

---

## 🎨 Design Philosophy

### User Experience First
- Clean, intuitive interface
- Accessibility-first approach (WCAG 2.1 AA utilities)
- Responsive design for all devices
- Dark theme for professional appearance
- Smooth animations for better UX

### Performance Optimized
- Code splitting with lazy loading
- Memoization for expensive calculations
- Optimized bundle with Webpack 5
- Advanced caching strategies
- Virtual scrolling for large datasets

### Developer Experience
- Strict TypeScript for type safety
- Component-driven architecture
- Custom hooks for reusability
- Comprehensive prop types
- Organized folder structure
- Consistent code style

---

## 🧪 Testing & Quality

### Testing Infrastructure
- **Jest** - Unit and integration testing framework
- **React Testing Library** - Component testing utilities
- **Cypress** - E2E testing configuration
- **jest-axe** - Accessibility testing

### Code Quality
- **TypeScript** - Strict mode enabled
- **ESLint** - Airbnb style guide with custom rules
- **Prettier** - Consistent code formatting
- **Husky** - Pre-commit hooks
- **Git hooks** - Automated quality checks

---

## 📱 Demo Mode

The application currently runs in **demo mode** with simulated data:
- Mock data service with realistic values
- Fallback data for all API calls
- Randomized metrics for demonstration
- No backend required for testing

### Demo Data Features
- 2 sample facilities (Platform Alpha & Beta)
- Real-time metrics simulation
- Safety incidents
- Well performance data
- Environmental metrics
- Equipment status
- Active alerts

---

## 🔧 Configuration

### Build Configuration
- Custom Webpack 5 configuration
- Babel for modern JavaScript features
- Code splitting for vendors and libraries
- CSS extraction and minification
- Compression plugin for production
- Source maps for debugging

### Environment Support
- Development mode with hot reload
- Production mode with optimizations
- TypeScript compilation
- SCSS/CSS module support
- SVG and image handling

---

## 📚 Key Components

### Industry Components
- **OperationalDashboard** - Real-time operations overview
- **SafetyMonitor** - Safety performance tracking
- **ProductionTracker** - Production metrics and well status
- **EnvironmentalMonitor** - Environmental metrics
- **EquipmentStatus** - Equipment health monitoring
- **ESGSustainabilityDashboard** - Comprehensive ESG reporting
- **CarbonFootprintCalculator** - Interactive carbon calculator
- **ReportGenerator** - Automated report creation
- **SustainabilityInsights** - Real-time sustainability metrics

### UI Components
- **AnimatedCard** - Cards with hover and entrance animations
- **AnimatedCounter** - Smooth number counting animations
- **EnhancedChart** - Advanced charts with gradients
- **LoadingSkeleton** - Loading state indicators
- **Logo** - Professional branded logo component
- **Button, Card, Input, Select** - Form components
- **Alert, Modal, Table** - Utility components
- **MetricCard** - KPI display cards

---

## 🌍 Sustainability Features

### Environmental Tracking
- **Emissions Monitoring** - Track all emission sources
- **Water Management** - Consumption and discharge tracking
- **Waste Tracking** - Generation and recycling metrics
- **Compliance Scoring** - Real-time compliance status

### Carbon Management
- **Scope 1, 2, 3** - Complete emissions breakdown
- **Carbon Intensity** - Per-unit calculations
- **Reduction Tracking** - Progress toward targets
- **Net-Zero Planning** - Goal tracking and insights

### ESG Reporting
- **Environmental** - Full environmental metrics
- **Social** - Workforce and community impact
- **Governance** - Transparency and ethics
- **Renewable Energy** - Clean energy adoption
- **Climate Goals** - Paris Agreement alignment

---

## 👨‍💻 About This Project

Built to demonstrate expertise in:
- **Modern React Development** - React 19 with hooks and concurrent features
- **TypeScript** - Strict type safety and interfaces
- **UI/UX Design** - Modern animations and professional design
- **Component Architecture** - Reusable, maintainable components
- **State Management** - Redux Toolkit patterns
- **Performance** - Optimization techniques and best practices
- **Testing** - Comprehensive testing infrastructure
- **Accessibility** - WCAG 2.1 AA compliance utilities
- **Norwegian Market** - Localization and industry terminology

---

## 📄 License

MIT License - See [LICENSE](./LICENSE) for details

---

## 🔗 Repository

**GitHub** - [github.com/saidulIslam1602/PetroVue](https://github.com/saidulIslam1602/PetroVue)

---

<div align="center">

**Built with 💚 for a sustainable future**

*Demonstrating technical excellence and environmental commitment*

</div>
