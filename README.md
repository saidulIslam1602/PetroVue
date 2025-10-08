# PetroVue - Advanced Oil & Gas Operations Dashboard

A modern, scalable React application built for the oil and gas industry, following industry standards for clean code, maintainability, and user experience.

## Project Overview

**PetroVue** is a comprehensive dashboard application designed specifically for oil and gas operations. Built with React, TypeScript, and Material-UI, it provides real-time monitoring, data visualization, and operational insights for industry professionals.

### Key Features

- **Clean Architecture** - Organized folder structure following industry best practices
- **Type Safety** - Comprehensive TypeScript implementation
- **Accessibility** - WCAG 2.1 AA compliant components
- **Responsive Design** - Mobile-first approach for field workers
- **Design System** - Consistent UI components and theming
- **Data Visualization** - Real-time charts and operational metrics
- **Developer Experience** - ESLint, Prettier, Storybook, and testing setup

## Architecture

### Folder Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Base UI components (Button, Card, etc.)
│   ├── layout/          # Layout components (Header, Sidebar, etc.)
│   └── features/        # Feature-specific components
├── pages/               # Page components
│   ├── dashboard/       # Dashboard pages
│   ├── operations/      # Operations pages
│   ├── sustainability/  # Sustainability pages
│   └── reports/         # Reports pages
├── hooks/               # Custom React hooks
├── services/            # API services and utilities
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
├── constants/           # Application constants
├── assets/              # Static assets
│   ├── images/          # Image files
│   └── icons/           # Icon files
├── styles/              # Global styles
├── themes/              # Design system themes
├── contexts/            # React contexts
└── providers/           # Context providers
```

### Design System

Our design system is built around the oil and gas industry requirements:

- **Primary Color**: Deep Ocean Blue (#0066cc) - representing offshore operations
- **Secondary Color**: Safety Orange (#ff6600) - representing safety and alerts
- **Typography**: Inter font family for modern, readable text
- **Spacing**: 8px base unit system for consistent layouts
- **Components**: Material Design 3 principles with industry customization

## Technology Stack

### Core Technologies
- **React 19** - Latest React with concurrent features
- **TypeScript 4.9** - Type-safe JavaScript
- **Material-UI 7** - Component library and theming
- **Emotion** - CSS-in-JS styling

### Development Tools
- **ESLint** - Code linting and quality
- **Prettier** - Code formatting
- **Storybook** - Component documentation
- **Jest** - Unit testing
- **React Testing Library** - Component testing
- **Husky** - Git hooks for quality gates

### Additional Libraries
- **React Hook Form** - Form management
- **Yup** - Schema validation
- **Recharts** - Data visualization
- **Framer Motion** - Animations

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd petro-vue
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open Storybook** (in another terminal)
   ```bash
   npm run storybook
   ```

### Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run storybook` - Start Storybook
- `npm run build-storybook` - Build Storybook

## Code Standards

### TypeScript
- Strict mode enabled
- Comprehensive type definitions
- No `any` types (warnings configured)
- Proper interface definitions

### Component Structure
```typescript
/**
 * Component documentation
 * Clear description of purpose and usage
 */

import React from 'react';
import { ComponentProps } from '../types';

export const Component: React.FC<ComponentProps> = ({
  // Props destructuring
}) => {
  // Component logic
  
  return (
    // JSX
  );
};

export default Component;
```

### File Naming
- **Components**: PascalCase (e.g., `Button.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useAuth.ts`)
- **Utilities**: camelCase (e.g., `formatDate.ts`)
- **Types**: PascalCase (e.g., `UserTypes.ts`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_ENDPOINTS.ts`)

### Styling
- Emotion styled-components for component styling
- CSS-in-JS for dynamic styles
- Global styles in `globals.css`
- Theme-based design tokens

## Testing Strategy

### Unit Tests
- Component testing with React Testing Library
- Hook testing with `@testing-library/react-hooks`
- Utility function testing with Jest

### Integration Tests
- User flow testing
- API integration testing
- Form validation testing

### E2E Tests
- Critical user journeys
- Cross-browser testing
- Performance testing

## Documentation

### Storybook
- Component documentation
- Interactive examples
- Design system showcase
- Accessibility testing

### Code Documentation
- JSDoc comments for functions
- README files for complex modules
- Type definitions with descriptions
- Architecture decision records

## Configuration

### ESLint Configuration
- React and TypeScript rules
- Accessibility rules
- Import/export rules
- Custom rules for project standards

### Prettier Configuration
- Consistent code formatting
- Single quotes
- Semicolons
- 2-space indentation

### TypeScript Configuration
- Strict mode
- Path mapping
- Module resolution
- Build optimization

## Industry Focus

### Oil & Gas Specific Features
- **Operational Monitoring** - Real-time production metrics
- **Safety Alerts** - Critical system notifications
- **Environmental Tracking** - Sustainability metrics
- **Facility Management** - Interactive facility maps
- **Compliance Reporting** - Regulatory requirements

### User Experience
- **Field Worker Support** - Mobile-optimized interfaces
- **Data-Heavy Interfaces** - Complex information display
- **Safety-First Design** - Critical alerts and notifications
- **Regulatory Compliance** - Audit trails and reporting

## Contributing

1. Follow the established code standards
2. Write comprehensive tests
3. Update documentation
4. Use conventional commit messages
5. Ensure accessibility compliance

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Material Design 3 for design principles
- React community for best practices
- Oil & gas industry professionals for domain expertise
- Accessibility community for inclusive design guidance

---

**Built for the Oil & Gas Industry**