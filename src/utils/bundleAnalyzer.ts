/**
 * Bundle Analysis Utilities
 * Tools for analyzing and optimizing bundle size
 */

// Bundle size monitoring
export const analyzeBundleSize = () => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Bundle analysis is only available in production builds');
    return;
  }

  // Get bundle size information
  const scripts = document.querySelectorAll('script[src]');
  const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
  
  const totalScriptSize = 0;
  const totalStyleSize = 0;
  
  scripts.forEach(script => {
    const src = script.getAttribute('src');
    if (src && src.includes('static/js')) {
      // This is a simplified approach - in reality, you'd need to fetch the actual file size
      console.log(`Script: ${src}`);
    }
  });
  
  stylesheets.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.includes('static/css')) {
      console.log(`Stylesheet: ${href}`);
    }
  });
  
  console.log(`Total script size: ${totalScriptSize} bytes`);
  console.log(`Total style size: ${totalStyleSize} bytes`);
};

// Code splitting recommendations
export const getCodeSplittingRecommendations = () => {
  const recommendations = [
    {
      component: 'OperationalDashboard',
      reason: 'Large component with multiple charts and data visualizations',
      suggestion: 'Consider lazy loading this component',
      priority: 'high'
    },
    {
      component: 'SafetyMonitor',
      reason: 'Contains complex safety metrics and incident tracking',
      suggestion: 'Split into smaller sub-components',
      priority: 'medium'
    },
    {
      component: 'ProductionTracker',
      reason: 'Heavy data processing and real-time updates',
      suggestion: 'Implement virtual scrolling for large datasets',
      priority: 'high'
    },
    {
      component: 'EnvironmentalMonitor',
      reason: 'Multiple charts and environmental data processing',
      suggestion: 'Lazy load chart components',
      priority: 'medium'
    },
    {
      component: 'EquipmentStatus',
      reason: 'Large equipment list with detailed status information',
      suggestion: 'Implement pagination or virtual scrolling',
      priority: 'medium'
    }
  ];
  
  return recommendations;
};

// Performance budget monitoring
export const checkPerformanceBudget = () => {
  const budget = {
    'first-contentful-paint': 2000, // 2 seconds
    'largest-contentful-paint': 4000, // 4 seconds
    'cumulative-layout-shift': 0.1, // 0.1
    'first-input-delay': 100, // 100ms
    'total-blocking-time': 300, // 300ms
  };
  
  const currentMetrics = {
    'first-contentful-paint': 0,
    'largest-contentful-paint': 0,
    'cumulative-layout-shift': 0,
    'first-input-delay': 0,
    'total-blocking-time': 0,
  };
  
  // This would be populated with actual performance metrics
  const violations: Array<{
    metric: string;
    threshold: number;
    current: number;
    severity: 'critical' | 'warning';
  }> = [];
  
  Object.entries(budget).forEach(([metric, threshold]) => {
    const current = currentMetrics[metric as keyof typeof currentMetrics];
    if (current > threshold) {
      violations.push({
        metric,
        threshold,
        current,
        severity: current > threshold * 1.5 ? 'critical' : 'warning'
      });
    }
  });
  
  return {
    budget,
    current: currentMetrics,
    violations,
    status: violations.length === 0 ? 'pass' : 'fail'
  };
};

// Dependency analysis
export const analyzeDependencies = () => {
  const dependencies = {
    'react': '19.2.0',
    'react-dom': '19.2.0',
    '@mui/material': '7.3.4',
    '@emotion/react': '11.14.0',
    '@emotion/styled': '11.14.1',
    'recharts': '3.2.1',
    'framer-motion': '12.23.22',
    'react-hook-form': '7.64.0',
    'yup': '1.7.1',
  };
  
  const analysis = Object.entries(dependencies).map(([name, version]) => {
    const size = getEstimatedSize(name);
    return {
      name,
      version,
      estimatedSize: size,
      category: getDependencyCategory(name),
      critical: isCriticalDependency(name)
    };
  });
  
  return analysis;
};

// Helper functions
const getEstimatedSize = (packageName: string): number => {
  const sizes: Record<string, number> = {
    'react': 42,
    'react-dom': 130,
    '@mui/material': 280,
    '@emotion/react': 15,
    '@emotion/styled': 8,
    'recharts': 180,
    'framer-motion': 95,
    'react-hook-form': 25,
    'yup': 45,
  };
  
  return sizes[packageName] || 0;
};

const getDependencyCategory = (packageName: string): string => {
  if (packageName.startsWith('@mui/') || packageName.startsWith('@emotion/')) {
    return 'UI Framework';
  }
  if (packageName.includes('react')) {
    return 'React Core';
  }
  if (packageName.includes('chart') || packageName.includes('recharts')) {
    return 'Data Visualization';
  }
  if (packageName.includes('form') || packageName.includes('yup')) {
    return 'Form Handling';
  }
  if (packageName.includes('motion') || packageName.includes('animation')) {
    return 'Animation';
  }
  return 'Utility';
};

const isCriticalDependency = (packageName: string): boolean => {
  const critical = ['react', 'react-dom', '@mui/material', '@emotion/react'];
  return critical.includes(packageName);
};

// Bundle optimization suggestions
export const getOptimizationSuggestions = () => {
  return [
    {
      category: 'Code Splitting',
      suggestions: [
        'Implement lazy loading for industry-specific components',
        'Split vendor bundles from application code',
        'Use dynamic imports for heavy libraries like Recharts'
      ]
    },
    {
      category: 'Tree Shaking',
      suggestions: [
        'Import only needed MUI components',
        'Use named imports for utility libraries',
        'Remove unused dependencies'
      ]
    },
    {
      category: 'Asset Optimization',
      suggestions: [
        'Compress images and use modern formats (WebP, AVIF)',
        'Minify CSS and JavaScript',
        'Use CDN for static assets'
      ]
    },
    {
      category: 'Caching',
      suggestions: [
        'Implement service worker for offline functionality',
        'Use browser caching for static assets',
        'Implement proper cache headers'
      ]
    }
  ];
};
