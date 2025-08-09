
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Index from '../Index';

// Mock child components to isolate testing
jest.mock('../../components/Navigation', () => ({
  Navigation: () => <nav data-testid="navigation">Navigation</nav>
}));

jest.mock('../../components/Hero', () => ({
  Hero: () => <div data-testid="hero">Hero Section</div>
}));

jest.mock('../../components/ProgressiveLeadCapture', () => ({
  __esModule: true,
  default: () => <div data-testid="lead-capture">Lead Capture</div>
}));

jest.mock('../../components/SecurityAssessment', () => ({
  SecurityAssessment: () => <div data-testid="security-assessment">Security Assessment</div>
}));

jest.mock('../../components/Footer', () => ({
  Footer: () => <footer data-testid="footer">Footer</footer>
}));

// Test wrapper with necessary providers
const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </QueryClientProvider>
  );
};

describe('Index Page', () => {
  it('renders all major sections', () => {
    render(
      <TestWrapper>
        <Index />
      </TestWrapper>
    );

    expect(screen.getByTestId('navigation')).toBeInTheDocument();
    expect(screen.getByTestId('hero')).toBeInTheDocument();
    expect(screen.getByTestId('lead-capture')).toBeInTheDocument();
    expect(screen.getByTestId('security-assessment')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('has the correct document title', () => {
    render(
      <TestWrapper>
        <Index />
      </TestWrapper>
    );

    // The title is set in the component via document.title or helmet
    expect(document.title).toContain('VerteidIQ');
  });

  it('renders without crashing', () => {
    expect(() => {
      render(
        <TestWrapper>
          <Index />
        </TestWrapper>
      );
    }).not.toThrow();
  });
});
