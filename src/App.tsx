
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
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
const AdvancedSecurity = lazy(() => import("./components/AdvancedSecurity"));
const ThreatHunting = lazy(() => import("./components/ThreatHunting"));
const AISecurityOrchestrator = lazy(() => import("./components/AISecurityOrchestrator"));
const ZeroTrustManager = lazy(() => import("./components/ZeroTrustManager"));
const CloudSecurityPosture = lazy(() => import("./components/CloudSecurityPosture"));
const ComplianceCenter = lazy(() => import("./components/ComplianceCenter"));
const EnterpriseReporting = lazy(() => import("./components/EnterpriseReporting"));
const ThreatIntelligencePlatform = lazy(() => import("./components/ThreatIntelligencePlatform"));
const IAMSecurityCenter = lazy(() => import("./components/IAMSecurityCenter"));
const SecurityPlaybooks = lazy(() => import("./components/SecurityPlaybooks"));
const ExecutiveSecurityDashboard = lazy(() => import("./components/ExecutiveSecurityDashboard"));
const APISecurityTesting = lazy(() => import("./components/APISecurityTesting"));
const CybersecurityAnalytics = lazy(() => import("./components/CybersecurityAnalytics"));
const IncidentResponseCenter = lazy(() => import("./components/IncidentResponseCenter"));
const VulnerabilityManagement = lazy(() => import("./components/VulnerabilityManagement"));
const NetworkSecurityMonitoring = lazy(() => import("./components/NetworkSecurityMonitoring"));
const ComplianceAutomation = lazy(() => import("./components/ComplianceAutomation"));
const SecurityOperationsCenter = lazy(() => import("./components/SecurityOperationsCenter"));
const DigitalForensics = lazy(() => import("./components/DigitalForensics"));
const SecurityGovernance = lazy(() => import("./components/SecurityGovernance"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Loading component for Suspense fallback
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
  </div>
);

// Analytics wrapper component
const AnalyticsWrapper = () => {
  const location = useLocation();
  return <AnalyticsTracker page={location.pathname} />;
};

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
            <AnalyticsWrapper />
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
                <Route path="/advanced-security" element={<AdvancedSecurity />} />
                <Route path="/threat-hunting" element={<ThreatHunting />} />
                <Route path="/ai-orchestrator" element={<AISecurityOrchestrator />} />
                <Route path="/zero-trust" element={<ZeroTrustManager />} />
                <Route path="/cloud-security" element={<CloudSecurityPosture />} />
                <Route path="/compliance" element={<ComplianceCenter />} />
                <Route path="/reporting" element={<EnterpriseReporting />} />
                <Route path="/threat-intelligence" element={<ThreatIntelligencePlatform />} />
                <Route path="/iam-security" element={<IAMSecurityCenter />} />
                <Route path="/security-playbooks" element={<SecurityPlaybooks />} />
                <Route path="/executive-dashboard" element={<ExecutiveSecurityDashboard />} />
                <Route path="/api-security" element={<APISecurityTesting />} />
                <Route path="/cybersecurity-analytics" element={<CybersecurityAnalytics />} />
                <Route path="/incident-response" element={<IncidentResponseCenter />} />
                <Route path="/vulnerability-management" element={<VulnerabilityManagement />} />
                <Route path="/network-monitoring" element={<NetworkSecurityMonitoring />} />
                <Route path="/compliance-automation" element={<ComplianceAutomation />} />
                <Route path="/security-operations-center" element={<SecurityOperationsCenter />} />
                <Route path="/digital-forensics" element={<DigitalForensics />} />
                <Route path="/security-governance" element={<SecurityGovernance />} />
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
