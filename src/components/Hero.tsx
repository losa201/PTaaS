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
            <span className="bg-gradient-cyber bg-clip-text text-transparent">
              Stop Breaches Before They Happen
            </span>
            <br />
            <span className="text-neon-glow">AI-Powered Security That Thinks Like Attackers</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto mb-8 leading-relaxed animate-cyber-fade-in">
            VerteidIQ's <span className="text-primary font-semibold">autonomous agents detect, validate, and neutralize threats 24/7</span> - 
            reducing security incidents by <span className="text-green-400 font-bold">89%</span> and preventing 
            <span className="text-green-400 font-bold"> $4.2M average breach costs</span> for enterprise teams.
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

          {/* Secondary CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 mb-16 animate-cyber-fade-in">
            <Button 
              variant="outline" 
              className="text-lg px-10 py-4 border-primary/50 text-primary hover:bg-primary/10 group bg-background/50 backdrop-blur"
              onClick={() => setShowDemo(true)}
            >
              <Play className="h-5 w-5 mr-3 group-hover:animate-pulse" />
              See Live Demo
              <ArrowRight className="h-4 w-4 ml-3 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="ghost"
              className="text-lg px-8 py-4 text-muted-foreground hover:text-primary group"
            >
              Talk to CISO
              <span className="text-xs ml-2 bg-primary/20 px-2 py-1 rounded">15 min</span>
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
              <div key={index} className="card-cyber text-center group hover:scale-105 transition-transform duration-300">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-primary rounded-full animate-ping opacity-60"></div>
      <div className="absolute top-32 right-20 w-1 h-1 bg-accent rounded-full animate-pulse opacity-40"></div>
      <div className="absolute bottom-40 left-20 w-3 h-3 bg-cyber-violet rounded-full animate-bounce opacity-30"></div>

      {/* Demo Modal */}
      <DemoModal open={showDemo} onOpenChange={setShowDemo} />
    </section>
  );
};

export default Hero;