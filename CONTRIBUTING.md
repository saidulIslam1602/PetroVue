# Contributing to PetroVue

Thank you for your interest in contributing to PetroVue! This document provides guidelines and instructions for contributing to this project.

## 🌱 Our Mission

PetroVue is dedicated to building sustainable technology solutions for environmental reporting and carbon management. We welcome contributions that align with this mission.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)

## Code of Conduct

This project adheres to a code of conduct. By participating, you are expected to uphold this code:

- Be respectful and inclusive
- Focus on what is best for the community
- Show empathy towards other community members
- Accept constructive criticism gracefully

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git
- Docker (optional)

### Setup Development Environment

```bash
# Clone the repository
git clone https://github.com/saidulIslam1602/PetroVue.git
cd PetroVue

# Install dependencies
npm install

# Start development server
npm start

# Run tests
npm test

# Open Storybook for component development
npm run storybook
```

## Development Workflow

### 1. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
```

Use descriptive branch names:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Test additions/updates
- `chore/` - Maintenance tasks

### 2. Make Your Changes

- Write clean, readable code
- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Keep commits small and focused

### 3. Test Your Changes

```bash
# Run all tests
npm run test

# Run E2E tests
npm run test:e2e

# Run linter
npm run lint

# Check formatting
npm run format:check
```

### 4. Commit Your Changes

Follow our [commit guidelines](#commit-guidelines).

### 5. Push and Create Pull Request

```bash
git push origin feature/your-feature-name
```

Then create a pull request on GitHub.

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Define proper types and interfaces
- Avoid `any` type unless absolutely necessary
- Use strict type checking

```typescript
// Good
interface User {
  name: string;
  email: string;
  role: 'admin' | 'user';
}

// Bad
const user: any = { name: 'John' };
```

### React Components

- Use functional components with hooks
- Keep components small and focused
- Use proper prop types
- Add JSDoc comments for complex components

```typescript
/**
 * MetricCard displays a key performance indicator
 * @param title - The metric title
 * @param value - The metric value
 * @param unit - The unit of measurement
 */
export const MetricCard: React.FC<MetricCardProps> = ({ title, value, unit }) => {
  // Component implementation
};
```

### File Organization

```
src/
├── components/
│   ├── ui/              # Reusable UI components
│   ├── industry/        # Industry-specific components
│   └── layout/          # Layout components
├── hooks/               # Custom React hooks
├── services/            # API services
├── utils/               # Utility functions
├── types/               # TypeScript types
└── constants/           # Constants and configuration
```

### Styling

- Use Material-UI styled components
- Follow the design system
- Ensure responsive design
- Support dark mode where applicable

```typescript
const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
}));
```

## Testing Guidelines

### Unit Tests

- Write tests for all utility functions
- Test component rendering and interactions
- Aim for >80% code coverage

```typescript
describe('calculateEmissions', () => {
  it('should calculate total emissions correctly', () => {
    const result = calculateEmissions(100, 200, 50);
    expect(result).toBe(350);
  });
});
```

### Component Tests

```typescript
import { render, screen } from '@testing-library/react';
import { MetricCard } from './MetricCard';

describe('MetricCard', () => {
  it('renders metric value', () => {
    render(<MetricCard title="Oil Production" value={1250} unit="bbl/day" />);
    expect(screen.getByText('1250')).toBeInTheDocument();
  });
});
```

### E2E Tests

- Test critical user journeys
- Use realistic test data
- Keep tests maintainable

```typescript
describe('Carbon Calculator', () => {
  it('calculates emissions and shows recommendations', () => {
    cy.visit('/carbon');
    cy.get('[data-testid="diesel-input"]').type('500');
    cy.get('[data-testid="calculate-btn"]').click();
    cy.get('[data-testid="total-emissions"]').should('be.visible');
  });
});
```

## Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes (formatting, etc.)
- `refactor` - Code refactoring
- `test` - Adding or updating tests
- `chore` - Maintenance tasks
- `perf` - Performance improvements

### Examples

```bash
feat(carbon-calculator): add scope 3 emissions calculation

Implemented scope 3 emissions tracking including value chain emissions.
Closes #123

fix(report-generator): correct PDF export formatting

The PDF export was not properly formatting multi-page reports.
This fix ensures consistent formatting across all pages.
```

## Pull Request Process

### Before Submitting

1. ✅ All tests pass
2. ✅ Code is linted and formatted
3. ✅ Documentation is updated
4. ✅ No console errors or warnings
5. ✅ Build succeeds
6. ✅ Accessibility standards met (WCAG 2.1 AA)

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] E2E tests added/updated
- [ ] Manual testing completed

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests pass locally
```

### Review Process

1. At least one maintainer approval required
2. All CI checks must pass
3. No unresolved conversations
4. Branch up to date with main

## Component Development Guidelines

### Creating New Components

1. Create component directory in appropriate location
2. Add TypeScript file with component
3. Add styles file (if needed)
4. Create index.ts for exports
5. Add tests
6. Add Storybook story
7. Update documentation

### Component Template

```typescript
/**
 * ComponentName
 * Brief description of component purpose
 */

import React from 'react';
import { styled } from '@mui/material/styles';

interface ComponentNameProps {
  // Define props
}

const StyledWrapper = styled('div')(({ theme }) => ({
  // Styles
}));

export const ComponentName: React.FC<ComponentNameProps> = (props) => {
  return (
    <StyledWrapper>
      {/* Component JSX */}
    </StyledWrapper>
  );
};

export default ComponentName;
```

## Sustainability Focus

When contributing, consider:

- **Performance** - Optimize for low bandwidth scenarios
- **Accessibility** - Ensure inclusive design
- **Environmental Impact** - Minimize resource consumption
- **Data Accuracy** - Ensure precise environmental calculations
- **User Experience** - Make sustainability data easy to understand

## Questions or Issues?

- 📧 Email: your.email@example.com
- 💬 GitHub Discussions
- 🐛 GitHub Issues

## Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation

Thank you for contributing to a more sustainable future! 🌱

