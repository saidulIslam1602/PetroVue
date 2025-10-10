# Code Review Guidelines

## Overview
This document outlines the code review standards and practices for the PetroVue project, demonstrating professional development practices as expected in Norwegian oil & gas industry frontend development roles.

## Code Review Process

### 1. Pre-Review Checklist (Author)
Before submitting a pull request, ensure:

#### Code Quality
- [ ] Code follows project TypeScript and ESLint standards
- [ ] All tests pass (unit tests, integration tests, E2E tests)
- [ ] No console.log statements in production code
- [ ] No commented-out code blocks
- [ ] All imports are used and properly organized

#### Functionality
- [ ] Feature works as intended in all supported browsers
- [ ] Responsive design tested on mobile, tablet, and desktop
- [ ] Error handling implemented for all user interactions
- [ ] Loading states implemented for async operations
- [ ] Accessibility requirements met (WCAG 2.1 AA)

#### Performance
- [ ] Bundle size impact assessed (should not increase by >10KB without justification)
- [ ] Performance metrics checked (Core Web Vitals)
- [ ] Images optimized and properly sized
- [ ] Lazy loading implemented where appropriate

#### Documentation
- [ ] Component documentation updated (JSDoc comments)
- [ ] README updated if new features/setup required
- [ ] Architecture documentation updated for significant changes

### 2. Pull Request Template

```markdown
## Description
Brief description of changes and why they were made.

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing completed
- [ ] Accessibility testing completed

## Screenshots/Videos
If applicable, add screenshots or videos demonstrating the changes.

## Performance Impact
- Bundle size change: +/- X KB
- Performance metrics: (include Lighthouse scores if applicable)

## Checklist
- [ ] My code follows the style guidelines of this project
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes
```

### 3. Review Guidelines for Reviewers

#### What to Look For

##### Architecture & Design
- **Component Structure**: Is the component well-structured and follows React best practices?
- **State Management**: Is state properly managed? Redux for global state, local state for component-specific data?
- **Separation of Concerns**: Are business logic, UI logic, and styling properly separated?
- **Reusability**: Can components/functions be reused? Are they properly abstracted?

##### Code Quality
- **TypeScript Usage**: Are types properly defined? No `any` types without justification?
- **Error Handling**: Are errors properly caught and handled? User-friendly error messages?
- **Performance**: Are there any obvious performance issues? Unnecessary re-renders?
- **Security**: Are there any security vulnerabilities? XSS, CSRF considerations?

##### Oil & Gas Industry Specific
- **Safety First**: Critical alerts and safety warnings properly implemented?
- **Data Accuracy**: Production metrics, environmental data properly validated?
- **Compliance**: Does code support regulatory reporting requirements?
- **Field Operations**: Mobile-friendly for offshore/field workers?

#### Review Comments Standards

##### Constructive Feedback
```markdown
Good: "Consider extracting this logic into a custom hook for better reusability."
Avoid: "This is wrong."

Good: "This function could benefit from error handling for the API call on line 45."
Avoid: "Fix the error handling."

Good: "The loading state looks great! Consider adding a skeleton loader for better UX."
Avoid: "Loading state is basic."
```

##### Severity Levels
- **Must Fix**: Blocks merge, critical issues (security, breaking changes, major bugs)
- **Should Fix**: Important improvements, performance issues, maintainability
- **Nice to Have**: Suggestions, minor optimizations, style preferences
- **Discussion**: Questions, alternative approaches, learning opportunities

### 4. Norwegian Industry Standards

#### Equinor/Aker Solutions Style Practices
- Prefer explicit type definitions over inference
- Use meaningful variable names that reflect domain knowledge
- Document complex business logic with comments
- Prioritize code readability over cleverness

#### Offshore/Field Worker Considerations
- Mobile-first responsive design
- Offline capability considerations
- Touch-friendly interfaces (minimum 44px touch targets)
- High contrast colors for outdoor visibility
- Simple, intuitive navigation for safety-critical operations

### 5. Common Review Areas

#### React/TypeScript Specific
```typescript
// Good: Proper TypeScript interface
interface ProductionMetrics {
  oilProduction: number;
  gasProduction: number;
  efficiency: number;
  timestamp: string;
}

// Avoid: Using any type
const metrics: any = getProductionData();

// Good: Proper error handling
const fetchData = async (): Promise<ProductionMetrics | null> => {
  try {
    const response = await api.getProductionMetrics();
    return response.data;
  } catch (error) {
    logger.error('Failed to fetch production metrics:', error);
    showErrorNotification('Unable to load production data');
    return null;
  }
};

// Avoid: Unhandled promises
const fetchData = () => {
  api.getProductionMetrics().then(data => setMetrics(data));
};
```

#### Performance Considerations
```typescript
// Good: Memoization for expensive calculations
const expensiveMetrics = useMemo(() => {
  return calculateComplexProductionMetrics(rawData);
}, [rawData]);

// Good: Proper dependency array
useEffect(() => {
  fetchProductionData();
}, [facilityId, timeRange]);

// Avoid: Missing dependencies
useEffect(() => {
  fetchProductionData();
}, []); // Missing facilityId, timeRange
```

#### Accessibility
```tsx
// Good: Proper ARIA labels and semantic HTML
<button
  aria-label="Emergency shutdown"
  onClick={handleEmergencyShutdown}
  className="emergency-button"
>
  <Icon name="emergency" />
  Emergency Stop
</button>

// Good: Form labels
<label htmlFor="facility-selector">
  Select Facility
  <select id="facility-selector" value={selectedFacility}>
    {facilities.map(facility => (
      <option key={facility.id} value={facility.id}>
        {facility.name}
      </option>
    ))}
  </select>
</label>
```

### 6. Review Timeline

#### Target Response Times
- **Initial Review**: Within 24 hours
- **Follow-up Reviews**: Within 4 hours during business hours
- **Emergency Fixes**: Within 2 hours
- **Documentation Updates**: Within 48 hours

#### Approval Process
- **Minor Changes**: 1 approval required
- **Feature Changes**: 2 approvals required (1 technical, 1 domain expert)
- **Breaking Changes**: 3 approvals required (technical lead, product owner, domain expert)
- **Security Changes**: Security team approval required

### 7. Post-Review Actions

#### Merge Requirements
- All conversations resolved
- CI/CD pipeline passes
- Required approvals obtained
- Branch up to date with main

#### Post-Merge
- Monitor production deployments
- Verify metrics and error rates
- Update documentation if needed
- Share learnings with team

### 8. Learning and Improvement

#### Knowledge Sharing
- Weekly code review retrospectives
- Share interesting solutions in team meetings
- Document common patterns and anti-patterns
- Mentoring junior developers through reviews

#### Continuous Improvement
- Regularly update review guidelines
- Incorporate feedback from team members
- Learn from production issues
- Stay updated with industry best practices

---

*This document reflects professional standards expected in Norwegian oil & gas industry frontend development roles, emphasizing code quality, safety, and maintainability.*