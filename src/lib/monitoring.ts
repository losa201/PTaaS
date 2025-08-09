
import * as Sentry from '@sentry/react';
import { onCLS, onFID, onFCP, onLCP, onTTFB } from 'web-vitals';

interface ErrorReport {
  message: string;
  stack?: string;
  filename?: string;
  lineno?: number;
  colno?: number;
  timestamp: number;
  userAgent: string;
  url: string;
  userId?: string;
}

export const initializeMonitoring = () => {
  // Initialize Sentry for production error tracking
  if (process.env.NODE_ENV === 'production') {
    Sentry.init({
      dsn: 'YOUR_SENTRY_DSN', // Replace with actual DSN
      environment: process.env.NODE_ENV,
      tracesSampleRate: 0.1,
      beforeSend(event) {
        // Filter out known noisy errors
        if (event.exception) {
          const error = event.exception.values?.[0];
          if (error?.value?.includes('ResizeObserver loop limit exceeded')) {
            return null;
          }
        }
        return event;
      }
    });
  }

  // Global error handler
  window.addEventListener('error', (event) => {
    const error = event.error;
    const errorReport: ErrorReport = {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      url: window.location.href
    };

    console.error('Global error caught:', errorReport);
    
    if (process.env.NODE_ENV === 'production') {
      Sentry.captureException(error);
    }
  });

  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    const error = event.reason;
    const errorReport: ErrorReport = {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      url: window.location.href
    };

    console.error('Unhandled promise rejection:', errorReport);
    
    if (process.env.NODE_ENV === 'production') {
      Sentry.captureException(error);
    }
  });

  console.log('🔍 Error monitoring initialized');
};

// Performance monitoring with Web Vitals
export const initializeWebVitals = () => {
  const sendToAnalytics = (metric: any) => {
    // Send performance metrics to analytics
    console.log('📊 Web Vital:', metric);
    
    if (process.env.NODE_ENV === 'production') {
      // Send to Google Analytics
      if (window.gtag) {
        window.gtag('event', metric.name, {
          value: Math.round(metric.value),
          event_category: 'Web Vitals',
          event_label: metric.id,
          non_interaction: true,
        });
      }

      // Send to custom analytics endpoint
      fetch('/api/analytics/web-vitals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: metric.name,
          value: metric.value,
          id: metric.id,
          timestamp: Date.now(),
          url: window.location.href
        })
      }).catch(error => console.error('Analytics error:', error));
    }
  };

  // Measure Core Web Vitals
  onCLS(sendToAnalytics);
  onFID(sendToAnalytics);
  onFCP(sendToAnalytics);
  onLCP(sendToAnalytics);
  onTTFB(sendToAnalytics);

  console.log('⚡ Web Vitals monitoring initialized');
};

// Health check monitoring
export const monitorHealthChecks = () => {
  const checkAPIHealth = async () => {
    try {
      const response = await fetch('/api/health', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (!response.ok) {
        console.warn('API health check failed:', response.status);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('API health check error:', error);
      return false;
    }
  };

  // Check API health every 5 minutes
  setInterval(async () => {
    const isHealthy = await checkAPIHealth();
    if (!isHealthy && process.env.NODE_ENV === 'production') {
      Sentry.captureMessage('API health check failed', 'warning');
    }
  }, 5 * 60 * 1000);

  console.log('🏥 Health check monitoring initialized');
};

// Performance observer for custom metrics
export const observePerformance = () => {
  if (!('PerformanceObserver' in window)) {
    console.warn('PerformanceObserver not supported');
    return;
  }

  // Observe Long Tasks (tasks over 50ms)
  const longTaskObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      console.log('🐌 Long task detected:', {
        duration: entry.duration,
        startTime: entry.startTime,
        name: entry.name
      });

      if (process.env.NODE_ENV === 'production') {
        // Send to analytics if task is over 100ms
        if (entry.duration > 100) {
          Sentry.addBreadcrumb({
            message: 'Long task detected',
            level: 'warning',
            data: {
              duration: entry.duration,
              startTime: entry.startTime
            }
          });
        }
      }
    }
  });

  try {
    longTaskObserver.observe({ entryTypes: ['longtask'] });
  } catch (error) {
    console.warn('Long task observer not supported');
  }

  console.log('📈 Performance monitoring initialized');
};

// Resource timing monitoring
export const monitorResourceTiming = () => {
  if (!('PerformanceObserver' in window)) return;

  const resourceObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      const resource = entry as PerformanceResourceTiming;
      
      // Flag slow resources (over 1 second)
      if (resource.responseEnd - resource.requestStart > 1000) {
        console.warn('🐌 Slow resource:', {
          name: resource.name,
          duration: resource.responseEnd - resource.requestStart,
          type: resource.initiatorType
        });
      }

      // Flag failed resources
      if (resource.transferSize === 0 && resource.decodedBodySize === 0) {
        console.error('❌ Failed resource:', resource.name);
      }
    }
  });

  try {
    resourceObserver.observe({ entryTypes: ['resource'] });
  } catch (error) {
    console.warn('Resource observer not supported');
  }

  console.log('📦 Resource timing monitoring initialized');
};

// Memory usage monitoring
export const monitorMemoryUsage = () => {
  if (!('memory' in performance)) {
    console.warn('Memory API not supported');
    return;
  }

  const checkMemoryUsage = () => {
    const memory = (performance as any).memory;
    const usedMB = memory.usedJSHeapSize / 1024 / 1024;
    const limitMB = memory.jsHeapSizeLimit / 1024 / 1024;
    const usage = (usedMB / limitMB) * 100;

    console.log('🧠 Memory usage:', {
      used: `${usedMB.toFixed(1)}MB`,
      limit: `${limitMB.toFixed(1)}MB`,
      usage: `${usage.toFixed(1)}%`
    });

    // Alert if memory usage is high
    if (usage > 80) {
      console.warn('⚠️ High memory usage detected:', usage);
      
      if (process.env.NODE_ENV === 'production') {
        Sentry.captureMessage(`High memory usage: ${usage.toFixed(1)}%`, 'warning');
      }
    }
  };

  // Check memory every 30 seconds
  setInterval(checkMemoryUsage, 30000);
  
  console.log('🧠 Memory monitoring initialized');
};

// Initialize all monitoring
export const initializeAllMonitoring = () => {
  initializeMonitoring();
  initializeWebVitals();
  monitorHealthChecks();
  observePerformance();
  monitorResourceTiming();
  monitorMemoryUsage();
};

// Declare global gtag function
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}
