import Header from '@/components/Header';
import Hero from '@/components/Hero';
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
      <main>
        <Hero />
        <TrustBadges />
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
