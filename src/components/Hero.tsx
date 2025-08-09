import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Zap, Globe, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import heroBg from '@/assets/hero-cyber-bg.jpg';
import DemoModal from '@/components/DemoModal';
import ProgressiveLeadCapture from '@/components/ProgressiveLeadCapture';

const Hero = () => {
  const [showDemo, setShowDemo] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img 
          src={heroBg} 
          alt="Cyber background" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/70 to-transparent"></div>
        <div className="absolute inset-0 cyber-grid opacity-20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="text-center max-w-5xl mx-auto">
          {/* Trust Badge */}
          <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/30 rounded-full px-6 py-3 mb-8 animate-cyber-fade-in">
            <Shield className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-primary">Trusted by 500+ Enterprise CISOs • SOC2 • ISO 27001</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-cyber font-bold mb-6 animate-cyber-fade-in">
            <span className="text-gradient">
              Autonomous PTaaS to Stop Breaches Before They Happen
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto mb-8 leading-relaxed animate-cyber-fade-in">
            Validate controls, hunt threats, and auto-remediate risk across your stack — continuously.
          </p>

          {/* PTaaS Explainer */}
          <div className="max-w-4xl mx-auto mb-12 animate-cyber-fade-in">
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              PTaaS blends automation with expert human testing across web, API & infrastructure. 
              You get real-time findings, seamless DevOps integration, and continuous validation—no more waiting for outdated one-off reports.
            </p>
          </div>

          {/* Progressive Lead Capture */}
          <div className="max-w-3xl mx-auto mb-8 animate-cyber-fade-in">
            <ProgressiveLeadCapture variant="hero" />
          </div>

          {/* Primary CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 mb-16 animate-cyber-fade-in">
            <Button 
              variant="gradient" 
              size="xl"
              className="group interactive-glow"
              onClick={() => setShowDemo(true)}
            >
              Get a Demo
              <ArrowRight className="h-5 w-5 ml-3 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="glass"
              size="xl"
              className="group interactive-glow"
            >
              Explore Platform
              <Play className="h-5 w-5 ml-3 group-hover:animate-pulse" />
            </Button>
          </div>

          {/* Business Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto animate-cyber-fade-in">
            {[
              {
                icon: Shield,
                title: '85% Faster Incident Response',
                description: 'Eliminate month-long pentest cycles. Get continuous validation with human expertise backing every finding.'
              },
              {
                icon: Zap,
                title: '$2.4M Average Breach Prevention',
                description: 'Identify critical vulnerabilities before attackers do. Real-time detection prevents costly incidents.'
              },
              {
                icon: Globe,
                title: '99.7% Vulnerability Detection',
                description: 'AI-powered scanning + human validation ensures comprehensive coverage across web, API & cloud infrastructure.'
              }
            ].map((feature, index) => (
              <div key={index} className="card-cyber text-center group interactive-glow">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6 group-hover:bg-primary/20 transition-all duration-300 animate-float">
                  <feature.icon className="h-8 w-8 text-primary animate-glow-pulse" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Floating Elements */}
      <div className="absolute top-20 left-10 w-3 h-3 bg-primary rounded-full animate-ping opacity-60 shadow-glow"></div>
      <div className="absolute top-32 right-20 w-2 h-2 bg-accent rounded-full animate-pulse opacity-50 shadow-glow"></div>
      <div className="absolute bottom-40 left-20 w-4 h-4 bg-brand-accent rounded-full animate-bounce opacity-40 shadow-glow"></div>
      <div className="absolute top-1/2 right-10 w-1 h-1 bg-brand-secondary rounded-full animate-ping opacity-30"></div>
      <div className="absolute bottom-60 right-1/3 w-2 h-2 bg-primary rounded-full animate-float opacity-40"></div>

      {/* Demo Modal */}
      <DemoModal open={showDemo} onOpenChange={setShowDemo} />
    </section>
  );
};

export default Hero;