import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnalyticsTracker } from "@/components/AnalyticsTracker";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Finance from "./pages/Finance";
import Healthcare from "./pages/Healthcare";
import Manufacturing from "./pages/Manufacturing";
import SecurityAssessmentPage from "./pages/SecurityAssessment";
import DemoPage from "./pages/Demo";
import ABTestingPage from "./pages/ABTesting";
import About from "./pages/About";
import Solutions from "./pages/Solutions";
import CaseStudies from "./pages/CaseStudies";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
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
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
