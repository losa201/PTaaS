import * as Sentry from "@sentry/react";
import React from "react";
import { useLocation, useNavigationType, createRoutesFromChildren, matchRoutes } from "react-router-dom";

// Performance monitoring configuration
export const initializeMonitoring = () => {
  // Only initialize in production
  if (import.meta.env.VITE_ENVIRONMENT === 'production') {
    Sentry.init({
      dsn: import.meta.env.VITE_SENTRY_DSN,
      integrations: [
        // Browser tracing integration (if available)
        ...(typeof window !== 'undefined' && 'BrowserTracing' in Sentry ? [
          new (Sentry as any).BrowserTracing({
            routingInstrumentation: (Sentry as any).reactRouterV6Instrumentation?.(
              React.useEffect,
              useLocation,
              useNavigationType,
              createRoutesFromChildren,
              matchRoutes
            ),
          }),
        ] : []),
        // Replay integration (if available) 
        ...(typeof window !== 'undefined' && 'Replay' in Sentry ? [new (Sentry as any).Replay()] : []),
      ],
      
      // Performance monitoring
      tracesSampleRate: 0.1, // 10% of transactions
      
      // Session replay
      replaysSessionSampleRate: 0.01, // 1% of sessions
      replaysOnErrorSampleRate: 1.0, // 100% of error sessions
      
      // Environment and release tracking
      environment: import.meta.env.VITE_ENVIRONMENT,
      release: import.meta.env.VITE_APP_VERSION || '1.0.0',
      
      // Custom error filtering
      beforeSend(event, hint) {
        // Filter out common non-critical errors
        if (event.exception) {
          const error = hint.originalException;
          if (error && error.message) {
            // Skip common browser extension errors
            if (error.message.includes('Non-Error promise rejection captured')) {
              return null;
            }
            // Skip network errors that are user-related
            if (error.message.includes('Network Error')) {
              return null;
            }
          }
        }
        return event;
      },
    });
  }
};

// Custom performance tracking
export const trackPerformance = (metricName: string, value: number, tags?: Record<string, string>) => {
  if (import.meta.env.VITE_ENVIRONMENT === 'production') {
    Sentry.addBreadcrumb({
      category: 'performance',
      message: `${metricName}: ${value}ms`,
      level: 'info',
      data: {
        metric: metricName,
        value,
        ...tags,
      },
    });
  }
};

// Business metrics tracking
export const trackConversion = (eventType: string, value?: number, properties?: Record<string, any>) => {
  // Track in analytics
  if (window.gtag) {
    window.gtag('event', eventType, {
      event_category: 'conversion',
      event_label: eventType,
      value: value || 1,
      ...properties,
    });
  }
  
  // Track in Mixpanel if available
  if (window.mixpanel) {
    window.mixpanel.track(eventType, {
      value: value || 1,
      timestamp: new Date().toISOString(),
      ...properties,
    });
  }
  
  // Add to Sentry context
  if (import.meta.env.VITE_ENVIRONMENT === 'production') {
    Sentry.addBreadcrumb({
      category: 'conversion',
      message: `Conversion: ${eventType}`,
      level: 'info',
      data: {
        eventType,
        value: value || 1,
        ...properties,
      },
    });
  }
};

// Error tracking with context
export const trackError = (error: Error, context?: Record<string, any>) => {
  console.error('Application Error:', error);
  
  if (import.meta.env.VITE_ENVIRONMENT === 'production') {
    Sentry.withScope((scope) => {
      if (context) {
        Object.keys(context).forEach((key) => {
          scope.setTag(key, context[key]);
        });
      }
      Sentry.captureException(error);
    });
  }
};

// Web Vitals monitoring
export const initializeWebVitals = async () => {
  if (import.meta.env.VITE_PERFORMANCE_MONITORING === 'true') {
    try {
      const { getCLS, getFID, getFCP, getLCP, getTTFB } = await import('web-vitals');
      
      getCLS((metric) => trackPerformance('CLS', metric.value, { id: metric.id }));
      getFID((metric) => trackPerformance('FID', metric.value, { id: metric.id }));
      getFCP((metric) => trackPerformance('FCP', metric.value, { id: metric.id }));
      getLCP((metric) => trackPerformance('LCP', metric.value, { id: metric.id }));
      getTTFB((metric) => trackPerformance('TTFB', metric.value, { id: metric.id }));
      
    } catch (error) {
      console.warn('Web Vitals monitoring failed to initialize:', error);
    }
  }
};

// Custom hook for monitoring React components
export const useErrorBoundary = () => {
  const [error, setError] = React.useState<Error | null>(null);
  
  React.useEffect(() => {
    if (error) {
      trackError(error, { boundary: 'useErrorBoundary' });
    }
  }, [error]);
  
  const resetError = () => setError(null);
  
  return { error, setError, resetError };
};

// Error boundary is now in separate component file

// Health check endpoint monitoring
export const monitorHealthChecks = () => {
  if (import.meta.env.VITE_ENVIRONMENT === 'production') {
    setInterval(async () => {
      try {
        const response = await fetch('/health');
        if (!response.ok) {
          trackError(new Error(`Health check failed: ${response.status}`), {
            endpoint: '/health',
            status: response.status,
          });
        }
      } catch (error) {
        trackError(error as Error, { endpoint: '/health' });
      }
    }, 60000); // Check every minute
  }
};

// Export global types for TypeScript
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    mixpanel?: {
      track: (eventName: string, properties?: Record<string, any>) => void;
    };
  }
}