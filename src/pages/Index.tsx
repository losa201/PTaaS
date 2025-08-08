import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ComplianceBadges from '@/components/ComplianceBadges';
import CustomerLogos from '@/components/CustomerLogos';
import InteractiveSecurityDemo from '@/components/InteractiveSecurityDemo';
import PTaaSWorkflow from '@/components/PTaaSWorkflow';
import IntegrationsShowcase from '@/components/IntegrationsShowcase';
import CompetitiveDifferentiation from '@/components/CompetitiveDifferentiation';
import Platform from '@/components/Platform';
import PTaaS from '@/components/PTaaS';
import Testimonials from '@/components/Testimonials';
import Pricing from '@/components/Pricing';
import TrustBadges from '@/components/TrustBadges';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { MobileCTA, ScrollToTop } from '@/components/MobileOptimization';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ComplianceBadges />
      <main>
        <Hero />
        <CustomerLogos />
        <InteractiveSecurityDemo />
        <PTaaSWorkflow />
        <CompetitiveDifferentiation />
        <IntegrationsShowcase />
        <Platform />
        <PTaaS />
        <Testimonials />
        <Pricing />
        <Contact />
      </main>
      <Footer />
      
      {/* Mobile Optimizations */}
      <MobileCTA />
      <ScrollToTop />
    </div>
  );
};

export default Index;
