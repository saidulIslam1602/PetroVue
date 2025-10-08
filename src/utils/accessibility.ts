/**
 * Accessibility Testing and Utilities
 * Tools for ensuring WCAG 2.1 AA compliance
 */

import { axe, toHaveNoViolations } from 'jest-axe';

// Extend Jest matchers
expect.extend(toHaveNoViolations);

// Color contrast checker
export const checkColorContrast = (foreground: string, background: string): boolean => {
  const getLuminance = (color: string): number => {
    const rgb = hexToRgb(color);
    if (!rgb) return 0;
    
    const { r, g, b } = rgb;
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };
  
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };
  
  const l1 = getLuminance(foreground);
  const l2 = getLuminance(background);
  
  const contrast = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  
  // WCAG AA requires 4.5:1 for normal text, 3:1 for large text
  return contrast >= 4.5;
};

// Keyboard navigation tester
export const testKeyboardNavigation = async (container: HTMLElement) => {
  const focusableElements = container.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  const results = [];
  
  for (let i = 0; i < focusableElements.length; i++) {
    const element = focusableElements[i] as HTMLElement;
    element.focus();
    
    results.push({
      element: element.tagName,
      text: element.textContent?.trim() || '',
      hasFocus: document.activeElement === element,
      tabIndex: element.tabIndex,
    });
  }
  
  return results;
};

// Screen reader testing utilities
export const getAriaLabels = (container: HTMLElement) => {
  const elements = container.querySelectorAll('[aria-label], [aria-labelledby], [aria-describedby]');
  
  return Array.from(elements).map(element => ({
    tagName: element.tagName,
    ariaLabel: element.getAttribute('aria-label'),
    ariaLabelledBy: element.getAttribute('aria-labelledby'),
    ariaDescribedBy: element.getAttribute('aria-describedby'),
    textContent: element.textContent?.trim(),
  }));
};

// Focus management utilities
export const trapFocus = (container: HTMLElement) => {
  const focusableElements = container.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  const firstElement = focusableElements[0] as HTMLElement;
  const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
  
  const handleTabKey = (e: KeyboardEvent) => {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    }
  };
  
  container.addEventListener('keydown', handleTabKey);
  
  return () => {
    container.removeEventListener('keydown', handleTabKey);
  };
};

// ARIA live region utilities
export const announceToScreenReader = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
  const liveRegion = document.createElement('div');
  liveRegion.setAttribute('aria-live', priority);
  liveRegion.setAttribute('aria-atomic', 'true');
  liveRegion.style.position = 'absolute';
  liveRegion.style.left = '-10000px';
  liveRegion.style.width = '1px';
  liveRegion.style.height = '1px';
  liveRegion.style.overflow = 'hidden';
  
  document.body.appendChild(liveRegion);
  liveRegion.textContent = message;
  
  setTimeout(() => {
    document.body.removeChild(liveRegion);
  }, 1000);
};

// Semantic HTML checker
export const checkSemanticHTML = (container: HTMLElement) => {
  const issues: string[] = [];
  
  // Check for proper heading hierarchy
  const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
  let previousLevel = 0;
  
  headings.forEach((heading, index) => {
    const level = parseInt(heading.tagName.charAt(1));
    if (index === 0 && level !== 1) {
      issues.push('First heading should be h1');
    }
    if (level > previousLevel + 1) {
      issues.push(`Heading level skipped: ${heading.tagName} after h${previousLevel}`);
    }
    previousLevel = level;
  });
  
  // Check for proper form labels
  const inputs = container.querySelectorAll('input, select, textarea');
  inputs.forEach(input => {
    const id = input.getAttribute('id');
    const ariaLabel = input.getAttribute('aria-label');
    const ariaLabelledBy = input.getAttribute('aria-labelledby');
    const label = id ? container.querySelector(`label[for="${id}"]`) : null;
    
    if (!ariaLabel && !ariaLabelledBy && !label) {
      issues.push(`Form control missing label: ${input.tagName}`);
    }
  });
  
  // Check for proper button text or aria-label
  const buttons = container.querySelectorAll('button');
  buttons.forEach(button => {
    const text = button.textContent?.trim();
    const ariaLabel = button.getAttribute('aria-label');
    
    if (!text && !ariaLabel) {
      issues.push('Button missing text or aria-label');
    }
  });
  
  return issues;
};

// High contrast mode detection
export const isHighContrastMode = (): boolean => {
  if (window.matchMedia) {
    return window.matchMedia('(prefers-contrast: high)').matches;
  }
  return false;
};

// Reduced motion detection
export const prefersReducedMotion = (): boolean => {
  if (window.matchMedia) {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
  return false;
};

// Accessibility testing helper for components
export const testAccessibility = async (container: HTMLElement) => {
  const results = await axe(container);
  
  return {
    violations: results.violations,
    passes: results.passes,
    incomplete: results.incomplete,
    inapplicable: results.inapplicable,
    hasViolations: results.violations.length > 0,
  };
};

// Focus indicator checker
export const checkFocusIndicators = (container: HTMLElement) => {
  const focusableElements = container.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  const issues: string[] = [];
  
  focusableElements.forEach(element => {
    const computedStyle = window.getComputedStyle(element);
    const outline = computedStyle.outline;
    const boxShadow = computedStyle.boxShadow;
    
    if (outline === 'none' && !boxShadow.includes('rgb')) {
      issues.push(`Element missing focus indicator: ${element.tagName}`);
    }
  });
  
  return issues;
};

// Color blindness simulation
export const simulateColorBlindness = (type: 'protanopia' | 'deuteranopia' | 'tritanopia') => {
  const filters = {
    protanopia: 'url(#protanopia)',
    deuteranopia: 'url(#deuteranopia)',
    tritanopia: 'url(#tritanopia)',
  };
  
  const style = document.createElement('style');
  style.textContent = `
    .colorblind-simulation {
      filter: ${filters[type]} !important;
    }
  `;
  
  document.head.appendChild(style);
  
  return () => {
    document.head.removeChild(style);
  };
};
