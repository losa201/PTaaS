import { useEffect } from 'react';

// Type definitions for analytics events
interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  custom_parameters?: Record<string, any>;
}

interface UserProperties {
  industry?: string;
  company_size?: string;
  user_role?: string;
  lead_source?: string;
}

interface ConversionEvent {
  event_name: 'page_view' | 'demo_request' | 'assessment_start' | 'assessment_complete' | 'lead_capture' | 'button_click';
  page_location?: string;
  page_title?: string;
  industry?: string;
  conversion_value?: number;
  custom_parameters?: Record<string, any>;
}

// Declare global gtag function properly
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

class AnalyticsManager {
  private static instance: AnalyticsManager;
  private isEnabled: boolean = false;
  private userId: string | null = null;
  private sessionId: string;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.initializeAnalytics();
  }

  static getInstance(): AnalyticsManager {
    if (!AnalyticsManager.instance) {
      AnalyticsManager.instance = new AnalyticsManager();
    }
    return AnalyticsManager.instance;
  }

  private generateSessionId(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  private initializeAnalytics() {
    // Initialize Google Analytics 4
    if (typeof window !== 'undefined' && window.gtag) {
      this.isEnabled = true;
      
      // Configure GA4
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        session_id: this.sessionId,
        custom_map: {
          custom_parameter_1: 'industry',
          custom_parameter_2: 'company_size',
          custom_parameter_3: 'user_role'
        }
      });

      console.log('📊 Analytics initialized');
    }

    // Initialize additional analytics tools (mock implementations)
    this.initializeHubSpot();
    this.initializeMixpanel();
    this.initializeHotjar();
  }

  private initializeHubSpot() {
    // HubSpot tracking code would go here
    if (typeof window !== 'undefined') {
      // Mock HubSpot initialization
      (window as any).hsConversationsAPI = {
        conversation: {
          requestChat: () => console.log('🔄 HubSpot chat requested'),
          close: () => console.log('❌ HubSpot chat closed')
        }
      };
      console.log('🎯 HubSpot initialized');
    }
  }

  private initializeMixpanel() {
    // Mixpanel would be initialized here
    if (typeof window !== 'undefined') {
      console.log('📈 Mixpanel initialized');
    }
  }

  private initializeHotjar() {
    // Hotjar would be initialized here
    if (typeof window !== 'undefined') {
      console.log('🔥 Hotjar initialized');
    }
  }

  // Track page views
  trackPageView(page: string, title: string, industry?: string) {
    if (!this.isEnabled) return;

    const event: ConversionEvent = {
      event_name: 'page_view',
      page_location: window.location.href,
      page_title: title,
      industry,
      custom_parameters: {
        session_id: this.sessionId,
        timestamp: new Date().toISOString()
      }
    };

    // Google Analytics 4
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: title,
        page_location: window.location.href,
        custom_parameter_1: industry
      });
    }

    // Send to backend for custom analytics
    this.sendToBackend('page_view', event);
    
    console.log('📊 Page view tracked:', { page, title, industry });
  }

  // Track conversion events
  trackConversion(eventName: ConversionEvent['event_name'], params: Partial<ConversionEvent> = {}) {
    if (!this.isEnabled) return;

    const event: ConversionEvent = {
      event_name: eventName,
      conversion_value: this.getConversionValue(eventName),
      custom_parameters: {
        session_id: this.sessionId,
        user_id: this.userId,
        timestamp: new Date().toISOString(),
        ...params.custom_parameters
      },
      ...params
    };

    // Google Analytics 4
    if (window.gtag) {
      window.gtag('event', eventName, {
        value: event.conversion_value,
        currency: 'USD',
        ...event.custom_parameters
      });
    }

    // HubSpot event tracking
    this.trackHubSpotEvent(eventName, event);

    // Mixpanel tracking
    this.trackMixpanelEvent(eventName, event);

    // Send to backend
    this.sendToBackend('conversion', event);

    console.log('🎯 Conversion tracked:', { eventName, value: event.conversion_value });
  }

  // Track user interactions
  trackUserInteraction(action: string, category: string, label?: string, value?: number) {
    if (!this.isEnabled) return;

    const event: AnalyticsEvent = {
      action,
      category,
      label,
      value,
      custom_parameters: {
        session_id: this.sessionId,
        timestamp: new Date().toISOString()
      }
    };

    // Google Analytics 4
    if (window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value
      });
    }

    console.log('👆 User interaction tracked:', { action, category, label, value });
  }

  // Set user properties
  setUserProperties(properties: UserProperties) {
    if (!this.isEnabled) return;

    // Google Analytics 4
    if (window.gtag) {
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        custom_map: {
          custom_parameter_1: properties.industry,
          custom_parameter_2: properties.company_size,
          custom_parameter_3: properties.user_role
        }
      });
    }

    // Store for session
    sessionStorage.setItem('user_properties', JSON.stringify(properties));
    
    console.log('👤 User properties set:', properties);
  }

  // Lead scoring and qualification
  trackLeadQualification(leadData: {
    email: string;
    company: string;
    industry: string;
    company_size: string;
    role: string;
    lead_score: number;
  }) {
    if (!this.isEnabled) return;

    // HubSpot lead tracking
    this.sendToHubSpot('lead_qualification', leadData);

    // Internal lead scoring
    this.sendToBackend('lead_qualification', {
      ...leadData,
      session_id: this.sessionId,
      timestamp: new Date().toISOString(),
      source: 'website_assessment'
    });

    console.log('🎯 Lead qualification tracked:', leadData);
  }

  private getConversionValue(eventName: ConversionEvent['event_name']): number {
    // Assign monetary values to different conversion events
    const conversionValues: Record<ConversionEvent['event_name'], number> = {
      page_view: 1,
      demo_request: 500,
      assessment_start: 100,
      assessment_complete: 250,
      lead_capture: 300,
      button_click: 10
    };
    return conversionValues[eventName] || 0;
  }

  private trackHubSpotEvent(eventName: string, event: ConversionEvent) {
    // Mock HubSpot event tracking
    if (typeof window !== 'undefined' && (window as any).hsConversationsAPI) {
      console.log('🎯 HubSpot event:', eventName, event);
    }
  }

  private trackMixpanelEvent(eventName: string, event: ConversionEvent) {
    // Mock Mixpanel event tracking
    console.log('📈 Mixpanel event:', eventName, event);
  }

  private sendToHubSpot(eventType: string, data: any) {
    // Mock HubSpot API call
    console.log('🎯 Sending to HubSpot:', eventType, data);
  }

  private sendToBackend(eventType: string, data: any) {
    // Mock backend API call for custom analytics
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Backend analytics:', eventType, data);
      return;
    }

    // In production, this would send to your analytics backend
    fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eventType, data, timestamp: new Date().toISOString() })
    }).catch(error => console.error('Analytics error:', error));
  }

  getExperimentVariant(experimentId: string): string {
    // Mock A/B testing - in production, integrate with your A/B testing platform
    const variants = ['control', 'variant_a', 'variant_b'];
    const hash = this.hashString(this.sessionId + experimentId);
    const variantIndex = hash % variants.length;
    
    const variant = variants[variantIndex];
    
    // Track experiment exposure
    this.trackUserInteraction('experiment_exposure', 'ab_test', `${experimentId}_${variant}`);
    
    return variant;
  }

  private hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  }
}

// React Hook for analytics
export const useAnalytics = () => {
  const analytics = AnalyticsManager.getInstance();

  useEffect(() => {
    // Track page view on mount
    analytics.trackPageView(window.location.pathname, document.title);
  }, [analytics]);

  return {
    trackPageView: analytics.trackPageView.bind(analytics),
    trackConversion: analytics.trackConversion.bind(analytics),
    trackUserInteraction: analytics.trackUserInteraction.bind(analytics),
    setUserProperties: analytics.setUserProperties.bind(analytics),
    trackLeadQualification: analytics.trackLeadQualification.bind(analytics),
    getExperimentVariant: analytics.getExperimentVariant.bind(analytics)
  };
};

// Component for tracking specific page types
export const AnalyticsTracker = ({ 
  page, 
  industry, 
  conversionGoal 
}: { 
  page: string; 
  industry?: string; 
  conversionGoal?: ConversionEvent['event_name'];
}) => {
  const analytics = useAnalytics();

  useEffect(() => {
    // Track page-specific analytics
    analytics.trackPageView(page, document.title, industry);
    
    // Set up conversion tracking if specified
    if (conversionGoal) {
      const trackConversionGoal = () => {
        analytics.trackConversion(conversionGoal, {
          page_location: window.location.href,
          industry,
          custom_parameters: {
            conversion_page: page
          }
        });
      };

      // Track conversion goal after page interaction
      const timer = setTimeout(trackConversionGoal, 5000); // Track after 5 seconds on page
      
      return () => clearTimeout(timer);
    }
  }, [page, industry, conversionGoal, analytics]);

  // This component doesn't render anything
  return null;
};

// Utility functions for common tracking scenarios
export const trackCTAClick = (ctaText: string, location: string, industry?: string) => {
  const analytics = AnalyticsManager.getInstance();
  analytics.trackUserInteraction('cta_click', 'engagement', `${ctaText}_${location}`, 1);
  analytics.trackConversion('button_click', {
    custom_parameters: {
      cta_text: ctaText,
      cta_location: location,
      industry
    }
  });
};

export const trackFormStart = (formType: string, industry?: string) => {
  const analytics = AnalyticsManager.getInstance();
  analytics.trackUserInteraction('form_start', 'engagement', formType);
  
  if (formType === 'assessment') {
    analytics.trackConversion('assessment_start', { industry });
  }
};

export const trackFormComplete = (formType: string, formData: any) => {
  const analytics = AnalyticsManager.getInstance();
  analytics.trackUserInteraction('form_complete', 'conversion', formType);
  
  if (formType === 'assessment') {
    analytics.trackConversion('assessment_complete', {
      industry: formData.industry,
      custom_parameters: formData
    });
  } else if (formType === 'lead_capture') {
    analytics.trackConversion('lead_capture', {
      custom_parameters: formData
    });
    
    // Calculate lead score based on form data
    const leadScore = calculateLeadScore(formData);
    analytics.trackLeadQualification({
      ...formData,
      lead_score: leadScore
    });
  }
};

// Lead scoring algorithm
function calculateLeadScore(formData: any): number {
  let score = 0;
  
  // Company size scoring
  const sizeScoring: Record<string, number> = {
    '1-50': 10,
    '51-200': 25,
    '201-1000': 40,
    '1001-5000': 60,
    '5000+': 80
  };
  score += sizeScoring[formData.company_size] || 0;
  
  // Role scoring
  const roleScoring: Record<string, number> = {
    'ciso': 80,
    'cto': 70,
    'security_manager': 60,
    'it_manager': 40,
    'developer': 20,
    'other': 10
  };
  score += roleScoring[formData.role] || 0;
  
  // Industry scoring (higher value industries)
  const industryScoring: Record<string, number> = {
    'finance': 30,
    'healthcare': 25,
    'manufacturing': 20,
    'general': 10
  };
  score += industryScoring[formData.industry] || 0;
  
  return Math.min(score, 100); // Cap at 100
}

export default AnalyticsManager;
