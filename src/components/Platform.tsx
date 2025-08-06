import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Brain, 
  Network, 
  Shield, 
  Zap, 
  Eye, 
  Lock, 
  Target, 
  AlertTriangle,
  ArrowRight 
} from 'lucide-react';

const Platform = () => {
  const coreCapabilities = [
    {
      icon: Brain,
      title: 'AI Swarm Intelligence',
      description: 'Distributed AI agents that collaborate to identify and neutralize threats autonomously',
      features: ['Self-learning algorithms', 'Predictive threat modeling', 'Behavioral analysis'],
      color: 'primary'
    },
    {
      icon: Network,
      title: 'Quantum-Secure Networks',
      description: 'Next-generation encryption and secure communication protocols for ultimate protection',
      features: ['Quantum key distribution', 'Zero-trust architecture', 'Encrypted data pipelines'],
      color: 'cyber-violet'
    },
    {
      icon: Shield,
      title: 'Autonomous Defense',
      description: 'Automated response systems that adapt and evolve with emerging threat landscapes',
      features: ['Real-time mitigation', 'Threat isolation', 'Recovery automation'],
      color: 'accent'
    }
  ];

  const platformFeatures = [
    { icon: Eye, title: 'Continuous Monitoring', description: '24/7 threat surveillance across all endpoints' },
    { icon: Lock, title: 'Zero-Trust Security', description: 'Verify every user, device, and connection' },
    { icon: Target, title: 'Precision Targeting', description: 'Surgical threat elimination with minimal disruption' },
    { icon: AlertTriangle, title: 'Predictive Alerts', description: 'Advanced warning system for emerging threats' }
  ];

  return (
    <section id="platform" className="py-24 bg-gradient-dark">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cyber font-bold mb-6">
            <span className="text-neon-glow">Platform</span>{' '}
            <span className="text-foreground">Architecture</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            VerteiDiq's distributed intelligence platform combines autonomous AI agents, quantum-secure protocols, 
            and real-time threat response to create an impenetrable cybersecurity ecosystem.
          </p>
        </div>

        {/* Core Capabilities */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {coreCapabilities.map((capability, index) => (
            <Card key={index} className="card-cyber group hover:scale-105 transition-all duration-300 border-border/50">
              <CardHeader className="text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-${capability.color}/10 mb-4 group-hover:bg-${capability.color}/20 transition-colors`}>
                  <capability.icon className={`h-8 w-8 text-${capability.color}`} />
                </div>
                <CardTitle className="text-xl font-semibold text-foreground">{capability.title}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {capability.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {capability.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-muted-foreground">
                      <Zap className="h-3 w-3 text-primary mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Platform Features Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {platformFeatures.map((feature, index) => (
            <div key={index} className="card-cyber text-center group hover:scale-105 transition-transform duration-300">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2 text-foreground">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Architecture Diagram Placeholder */}
        <div className="card-cyber mb-12">
          <div className="text-center py-16">
            <Network className="h-16 w-16 text-primary mx-auto mb-4 animate-pulse" />
            <h3 className="text-2xl font-semibold mb-4 text-foreground">VerteiDiq Network Architecture</h3>
            <p className="text-muted-foreground mb-6">
              Interactive architecture diagram showing AI agent distribution, quantum-secure channels, and threat response flows
            </p>
            <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground">
              Explore Architecture
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4 text-foreground">Ready to Deploy VerteiDiq?</h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Experience the future of cybersecurity with our autonomous intelligence platform. 
            Get started with a personalized demo and security assessment.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button className="btn-cyber">
              <Shield className="h-4 w-4 mr-2" />
              Schedule Demo
            </Button>
            <Button variant="outline" className="border-accent/50 text-accent hover:bg-accent hover:text-accent-foreground">
              View Technical Specs
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Platform;