/**
 * PetroVue Main Application Component
 * Clean, organized structure following industry standards
 */

import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { Button } from './components/ui/Button';
import { APP_CONFIG } from './constants';
import './styles/globals.css';

// Create Material-UI theme based on our design system
const muiTheme = createTheme({
  palette: {
    primary: {
      main: '#0066cc',
      light: '#4da6ff',
      dark: '#003d7a',
    },
    secondary: {
      main: '#ff6600',
      light: '#ffa64d',
      dark: '#993d00',
    },
  },
  typography: {
    fontFamily:
      '"Inter", "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif',
  },
});

/**
 * Main Application Component
 * Demonstrates clean architecture and component organization
 */
const App: React.FC = () => {
  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <div className='App'>
        <header
          style={{
            padding: '2rem',
            textAlign: 'center',
            backgroundColor: '#f5f5f5',
            borderBottom: '1px solid #e0e0e0',
          }}
        >
          <h1
            style={{
              color: '#0066cc',
              marginBottom: '0.5rem',
              fontSize: '2.5rem',
              fontWeight: 600,
            }}
          >
            {APP_CONFIG.name}
          </h1>
          <p
            style={{
              color: '#666',
              fontSize: '1.1rem',
              marginBottom: '2rem',
            }}
          >
            {APP_CONFIG.description}
          </p>

          {/* Button Showcase */}
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: '2rem',
            }}
          >
            <Button variant='primary' size='lg'>
              Get Started
            </Button>
            <Button variant='outline' size='lg'>
              View Dashboard
            </Button>
            <Button variant='secondary' size='lg'>
              Operations
            </Button>
          </div>
        </header>

        <main
          style={{
            padding: '3rem 2rem',
            maxWidth: '1200px',
            margin: '0 auto',
          }}
        >
          <section style={{ marginBottom: '3rem' }}>
            <h2
              style={{
                color: '#212121',
                marginBottom: '1rem',
                fontSize: '2rem',
              }}
            >
              Modern Oil & Gas Operations Dashboard
            </h2>
            <p
              style={{
                color: '#666',
                lineHeight: 1.6,
                fontSize: '1.1rem',
                marginBottom: '2rem',
              }}
            >
              Built with React, TypeScript, and Material-UI following industry
              standards for clean, maintainable, and scalable code architecture.
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem',
                marginTop: '2rem',
              }}
            >
              <div
                style={{
                  padding: '1.5rem',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  backgroundColor: '#fafafa',
                }}
              >
                <h3 style={{ color: '#0066cc', marginBottom: '1rem' }}>
                  Clean Architecture
                </h3>
                <p style={{ color: '#666', lineHeight: 1.5 }}>
                  Organized folder structure, TypeScript types, and
                  component-based design following industry best practices.
                </p>
              </div>

              <div
                style={{
                  padding: '1.5rem',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  backgroundColor: '#fafafa',
                }}
              >
                <h3 style={{ color: '#ff6600', marginBottom: '1rem' }}>
                  Type Safety
                </h3>
                <p style={{ color: '#666', lineHeight: 1.5 }}>
                  Comprehensive TypeScript implementation with strict typing for
                  better development experience and fewer runtime errors.
                </p>
              </div>

              <div
                style={{
                  padding: '1.5rem',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  backgroundColor: '#fafafa',
                }}
              >
                <h3 style={{ color: '#4caf50', marginBottom: '1rem' }}>
                  Accessibility
                </h3>
                <p style={{ color: '#666', lineHeight: 1.5 }}>
                  WCAG 2.1 AA compliant components with proper ARIA labels,
                  keyboard navigation, and screen reader support.
                </p>
              </div>
            </div>
          </section>

          <section
            style={{
              textAlign: 'center',
              padding: '2rem',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px',
            }}
          >
            <h3 style={{ color: '#212121', marginBottom: '1rem' }}>
              Ready to explore the codebase?
            </h3>
            <p style={{ color: '#666', marginBottom: '1.5rem' }}>
              Check out the Storybook documentation and component examples.
            </p>
            <Button
              variant='primary'
              size='md'
              onClick={() => window.open('http://localhost:6006', '_blank')}
            >
              Open Storybook
            </Button>
          </section>
        </main>

        <footer
          style={{
            padding: '2rem',
            textAlign: 'center',
            backgroundColor: '#212121',
            color: '#fff',
            marginTop: '3rem',
          }}
        >
          <p style={{ margin: 0 }}>
            © 2024 {APP_CONFIG.name} - Built for the Oil & Gas Industry
          </p>
        </footer>
      </div>
    </ThemeProvider>
  );
};

export default App;
