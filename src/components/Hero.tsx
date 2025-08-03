import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Zap, Globe } from 'lucide-react';
import heroBg from '@/assets/hero-cyber-bg.jpg';

const Hero = () => {
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
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-2 mb-8 animate-cyber-fade-in">
            <Globe className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Quantum-Secure • AI-Powered • Autonomous</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-cyber font-bold mb-6 animate-cyber-fade-in">
            <span className="text-neon-glow">XORB</span>{' '}
            <span className="bg-gradient-cyber bg-clip-text text-transparent">
              Autonomous
            </span>
            <br />
            <span className="text-foreground">Cybersecurity Intelligence</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed animate-cyber-fade-in">
            Deploy AI-powered security agents that autonomously protect your digital infrastructure with 
            <span className="text-primary font-semibold"> quantum-secure intelligence</span> and 
            <span className="text-accent font-semibold"> real-time threat response</span>.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16 animate-cyber-fade-in">
            <Button className="btn-cyber text-lg px-8 py-4 group">
              <Shield className="h-5 w-5 mr-2 group-hover:animate-pulse" />
              Request Demo
              <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline" 
              className="text-lg px-8 py-4 border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <Zap className="h-5 w-5 mr-2" />
              Launch PTaaS
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto animate-cyber-fade-in">
            {[
              {
                icon: Shield,
                title: 'Autonomous Protection',
                description: 'AI agents that learn, adapt, and respond to threats without human intervention'
              },
              {
                icon: Zap,
                title: 'Real-Time Intelligence',
                description: 'Instant threat detection with quantum-secure data processing and analysis'
              },
              {
                icon: Globe,
                title: 'Global Compliance',
                description: 'Built-in GDPR, DSGVO, BSI, IT-SiG, and NIS2 compliance automation'
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
    </section>
  );
};

export default Hero;