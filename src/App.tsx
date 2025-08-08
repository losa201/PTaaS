import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnalyticsTracker } from "@/components/AnalyticsTracker";
import { Suspense, lazy, useEffect } from "react";
import { initializeMonitoring, initializeWebVitals, monitorHealthChecks } from "@/lib/monitoring";
import { ErrorBoundary } from "@/components/ErrorBoundary";

// Lazy load pages for better performance
const Index = lazy(() => import("./pages/Index"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Finance = lazy(() => import("./pages/Finance"));
const Healthcare = lazy(() => import("./pages/Healthcare"));
const Manufacturing = lazy(() => import("./pages/Manufacturing"));
const SecurityAssessmentPage = lazy(() => import("./pages/SecurityAssessment"));
const DemoPage = lazy(() => import("./pages/Demo"));
const ABTestingPage = lazy(() => import("./pages/ABTesting"));
const About = lazy(() => import("./pages/About"));
const Solutions = lazy(() => import("./pages/Solutions"));
const CaseStudies = lazy(() => import("./pages/CaseStudies"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Loading component for Suspense fallback
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
  </div>
);

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Initialize monitoring and performance tracking
    initializeMonitoring();
    initializeWebVitals();
    monitorHealthChecks();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ErrorBoundary>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AnalyticsTracker />
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/finance" element={<Finance />} />
                <Route path="/healthcare" element={<Healthcare />} />
                <Route path="/manufacturing" element={<Manufacturing />} />
                <Route path="/assessment" element={<SecurityAssessmentPage />} />
                <Route path="/demo" element={<DemoPage />} />
                <Route path="/ab-testing" element={<ABTestingPage />} />
                <Route path="/about" element={<About />} />
                <Route path="/solutions" element={<Solutions />} />
                <Route path="/case-studies" element={<CaseStudies />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </ErrorBoundary>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
