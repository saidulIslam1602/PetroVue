# PetroVue - Advanced Oil & Gas Industry Dashboard

## Architecture Overview

PetroVue is a modern, enterprise-grade React application built specifically for the oil & gas industry. It provides real-time monitoring, operational insights, and comprehensive data visualization for petroleum facilities worldwide.

### Tech Stack

- **Frontend Framework**: React 19.2.0 with TypeScript 4.9.5
- **State Management**: Redux Toolkit with React-Redux
- **UI Components**: Material-UI 7.3.4 with Emotion styling
- **Data Visualization**: Recharts for industry-specific charts
- **Build Tools**: Custom Webpack 5 configuration with Babel
- **Testing**: Jest + Testing Library + Cypress for E2E
- **Performance**: Advanced monitoring with Web Vitals integration

### Key Features

- **Real-time Facility Monitoring**: Live data from refineries, drilling sites, and processing plants
- **Advanced Analytics**: Production metrics, efficiency tracking, and predictive insights
- **Safety Management**: Incident tracking, compliance monitoring, and safety scores
- **Environmental Compliance**: CO2 emissions, water usage, waste management tracking
- **Equipment Management**: Health monitoring, maintenance scheduling, alerts system
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm 9+
- Modern browser with ES2020+ support

### Installation

```bash
# Clone the repository
git clone https://github.com/saidulIslam1602/petro-vue.git
cd petro-vue

# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Run E2E tests
npm run cypress:open
```

### Environment Setup

Create a `.env` file in the root directory:

```env
REACT_APP_API_BASE_URL=https://api.petrovue.com
REACT_APP_WEBSOCKET_URL=wss://ws.petrovue.com
REACT_APP_ENVIRONMENT=development
REACT_APP_VERSION=1.0.0
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Basic UI components (Button, Card, etc.)
│   ├── industry/       # Oil & gas specific components
│   ├── layout/         # Layout components (Header, Sidebar)
│   └── features/       # Feature-specific components
├── services/           # API services and data layer
│   ├── api.ts         # HTTP client configuration
│   ├── dataService.ts # Business logic layer
│   └── types.ts       # Service type definitions
├── store/             # Redux store configuration
│   ├── index.ts       # Store setup and root reducer
│   ├── slices/        # Redux Toolkit slices
│   └── middleware/    # Custom middleware
├── hooks/             # Custom React hooks
│   ├── useData.ts     # Data fetching hooks
│   └── useAuth.ts     # Authentication hooks
├── utils/             # Utility functions
│   ├── performance.ts # Performance monitoring
│   ├── testUtils.tsx  # Testing utilities
│   └── accessibility.ts # A11y helpers
├── types/             # TypeScript type definitions
├── constants/         # Application constants
└── styles/           # Global styles and themes
```

## Development Workflow

### Code Standards

- **TypeScript**: Strict mode enabled with comprehensive type coverage
- **ESLint**: Airbnb configuration with React hooks rules
- **Prettier**: Consistent code formatting
- **Husky**: Pre-commit hooks for code quality

### Component Development

```typescript
// Example: Creating an industry-specific component
import React from 'react';
import { useOperationalMetrics } from '@hooks/useData';
import { MetricCard } from '@components/ui';

interface ProductionTrackerProps {
  facilityId: string;
  realTimeUpdates?: boolean;
}

export const ProductionTracker: React.FC<ProductionTrackerProps> = ({
  facilityId,
  realTimeUpdates = true
}) => {
  const { data, loading, error } = useOperationalMetrics(facilityId, {
    realTime: realTimeUpdates,
    refreshInterval: 5000
  });

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorBoundary error={error} />;

  return (
    <MetricCard
      title="Production Metrics"
      value={data.production.current}
      unit="barrels/day"
      trend={data.production.trend}
      target={data.production.target}
    />
  );
};
```

### API Integration

```typescript
// Example: Service layer integration
import { dataService } from '@services/dataService';

// Fetch facility data with error handling
const facilityData = await dataService.facilities.getById(facilityId);

// Real-time updates via WebSocket
dataService.subscribe('production-updates', (data) => {
  dispatch(updateProductionMetrics(data));
});
```

## Testing Strategy

### Unit Testing

```typescript
// Example: Component testing with Redux
import { renderWithStore } from '@utils/testUtils';
import { ProductionTracker } from './ProductionTracker';

describe('ProductionTracker', () => {
  it('displays production metrics correctly', async () => {
    const { screen } = renderWithStore(
      <ProductionTracker facilityId="facility-001" />,
      {
        operational: {
          metrics: mockOperationalMetrics(),
        },
      }
    );

    await waitFor(() => {
      expect(screen.getByText('125,000')).toBeInTheDocument();
      expect(screen.getByText('barrels/day')).toBeInTheDocument();
    });
  });
});
```

### Integration Testing

```typescript
// Example: API integration test
describe('Data Service Integration', () => {
  it('fetches and caches facility data', async () => {
    const facilityId = 'test-facility-001';
    const data = await dataService.facilities.getById(facilityId);
    
    expect(data).toMatchObject({
      id: facilityId,
      name: expect.any(String),
      status: expect.oneOf(['operational', 'maintenance', 'offline']),
      production: expect.objectContaining({
        current: expect.any(Number),
        target: expect.any(Number),
      }),
    });
  });
});
```

### E2E Testing with Cypress

```typescript
// cypress/e2e/dashboard.cy.ts
describe('Dashboard E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/dashboard');
    cy.mockApiResponses();
  });

  it('loads facility dashboard with production metrics', () => {
    cy.get('[data-testid="facility-selector"]').select('Refinery Alpha');
    cy.get('[data-testid="production-metrics"]').should('be.visible');
    cy.get('[data-testid="safety-score"]').should('contain', '98.5');
  });

  it('updates metrics in real-time', () => {
    cy.mockWebSocket();
    cy.get('[data-testid="production-current"]').should('contain', '125,000');
    
    cy.sendWebSocketMessage({
      type: 'production-update',
      data: { current: 130000 }
    });
    
    cy.get('[data-testid="production-current"]').should('contain', '130,000');
  });
});
```

## Performance Optimization

### Bundle Optimization

- **Code Splitting**: Route-based and component-based splitting
- **Tree Shaking**: Eliminating unused code from bundles
- **Lazy Loading**: Dynamic imports for non-critical components
- **Bundle Analysis**: Webpack Bundle Analyzer integration

### Runtime Performance

```typescript
// Example: Performance monitoring
import { usePerformanceTracking } from '@utils/advancedPerformance';

export const DashboardComponent = () => {
  const { renderTime } = usePerformanceTracking('Dashboard');
  
  // Component logic...
  
  return (
    <div>
      {/* Dashboard content */}
      {process.env.NODE_ENV === 'development' && (
        <PerformanceMetrics renderTime={renderTime} />
      )}
    </div>
  );
};
```

### Performance Budgets

- **Bundle Size**: < 300KB gzipped
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Time to Interactive**: < 3s
- **Memory Usage**: < 50MB

## Security & Compliance

### Data Security

- **HTTPS Only**: All API communications encrypted
- **JWT Authentication**: Secure token-based auth
- **Input Sanitization**: XSS prevention
- **CSRF Protection**: Token-based CSRF prevention

### Industry Compliance

- **ISO 27001**: Information security management
- **SOC 2 Type II**: Security and availability controls
- **GDPR**: Data privacy compliance
- **API Security**: OAuth 2.0 / OpenID Connect

## Deployment

### Production Build

```bash
# Build optimized production bundle
npm run build

# Analyze bundle composition
npm run analyze

# Run production server locally
npm run serve
```

### Docker Deployment

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY build ./build
EXPOSE 3000
CMD ["npm", "start"]
```

### Environment Configuration

```yaml
# docker-compose.yml
version: '3.8'
services:
  petrovue:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - REACT_APP_API_BASE_URL=https://api.petrovue.com
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
```

## Monitoring & Analytics

### Performance Monitoring

- **Real User Monitoring (RUM)**: Web Vitals tracking
- **Error Tracking**: Sentry integration
- **Performance Budgets**: Automated alerts
- **Bundle Analysis**: Size tracking over time

### Business Metrics

- **User Engagement**: Dashboard usage patterns
- **Feature Adoption**: Component interaction tracking
- **Performance Impact**: Business KPI correlation
- **Industry Benchmarks**: Comparative analysis

## Contributing

### Development Process

1. **Feature Branch**: Create from `main`
2. **Development**: Follow coding standards
3. **Testing**: Unit + Integration + E2E tests
4. **Code Review**: Peer review required
5. **CI/CD**: Automated testing and deployment

### Code Review Checklist

- [ ] TypeScript types properly defined
- [ ] Components properly tested
- [ ] Performance impact assessed
- [ ] Accessibility guidelines followed
- [ ] Security considerations reviewed
- [ ] Documentation updated

## Roadmap

### Q1 2025
- [ ] Mobile app development (React Native)
- [ ] Advanced AI/ML integration
- [ ] Predictive maintenance algorithms
- [ ] Enhanced real-time capabilities

### Q2 2025
- [ ] Multi-tenant architecture
- [ ] Advanced reporting engine
- [ ] Third-party integrations (SAP, Oracle)
- [ ] Enhanced security features

## Support

### Documentation
- **API Documentation**: `/docs/api`
- **Component Storybook**: `/docs/storybook`
- **Architecture Decisions**: `/docs/adr`

### Getting Help
- **Issues**: GitHub Issues for bugs and features
- **Discussions**: GitHub Discussions for questions
- **Email**: support@petrovue.com
- **Slack**: #petrovue-dev channel

---

Built for the Oil & Gas Industry by the PetroVue Team