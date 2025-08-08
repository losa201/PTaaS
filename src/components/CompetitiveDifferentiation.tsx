import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Shield, 
  Brain, 
  Zap, 
  CheckCircle, 
  X, 
  AlertTriangle,
  Clock,
  Users,
  Target,
  TrendingUp,
  Sparkles
} from 'lucide-react';

const CompetitiveDifferentiation = () => {
  const features = [
    {
      category: "Intelligence",
      feature: "Autonomous Decision Making",
      verteidiq: { status: "full", description: "AI agents make complex decisions independently", icon: Brain },
      competitor1: { status: "partial", description: "Rule-based automation only", icon: AlertTriangle },
      competitor2: { status: "none", description: "Manual analysis required", icon: X },
      competitor3: { status: "partial", description: "Semi-automated workflows", icon: AlertTriangle }
    },
    {
      category: "Security",
      feature: "Quantum-Secure AI",
      verteidiq: { status: "full", description: "Future-proof against quantum computing", icon: Sparkles },
      competitor1: { status: "none", description: "Traditional encryption", icon: X },
      competitor2: { status: "none", description: "No quantum readiness", icon: X },
      competitor3: { status: "none", description: "Legacy security models", icon: X }
    },
    {
      category: "Response",
      feature: "Real-Time Threat Mitigation",
      verteidiq: { status: "full", description: "Instant autonomous response", icon: Zap },
      competitor1: { status: "partial", description: "Alert-based responses", icon: AlertTriangle },
      competitor2: { status: "partial", description: "Delayed manual intervention", icon: AlertTriangle },
      competitor3: { status: "full", description: "Automated responses", icon: CheckCircle }
    },
    {
      category: "Learning",
      feature: "Continuous AI Learning",
      verteidiq: { status: "full", description: "Adapts to new attack patterns", icon: TrendingUp },
      competitor1: { status: "partial", description: "Signature-based updates", icon: AlertTriangle },
      competitor2: { status: "none", description: "Static rule sets", icon: X },
      competitor3: { status: "partial", description: "Limited ML capabilities", icon: AlertTriangle }
    },
    {
      category: "Coverage",
      feature: "Human-AI Hybrid Validation",
      verteidiq: { status: "full", description: "AI speed + human expertise", icon: Users },
      competitor1: { status: "none", description: "Automated only", icon: X },
      competitor2: { status: "partial", description: "Manual validation", icon: AlertTriangle },
      competitor3: { status: "none", description: "No human validation", icon: X }
    }
  ];

  const getStatusIcon = (status: string, IconComponent: any) => {
    switch (status) {
      case 'full':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'partial':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'none':
        return <X className="h-5 w-5 text-red-500" />;
      default:
        return <IconComponent className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'full':
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/50">Full Support</Badge>;
      case 'partial':
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/50">Limited</Badge>;
      case 'none':
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/50">Not Available</Badge>;
      default:
        return null;
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-background/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 bg-gradient-cyber bg-clip-text text-transparent">
            Why CISOs Choose VerteidIQ Over Competitors
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            The only cybersecurity platform with truly autonomous agents that think, learn, and act like elite security teams - 24/7.
          </p>
          
          <div className="flex justify-center items-center space-x-8 text-sm">
            <div className="flex items-center space-x-2">
              <Brain className="h-5 w-5 text-primary" />
              <span className="text-muted-foreground">Autonomous Intelligence</span>
            </div>
            <div className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-purple-400" />
              <span className="text-muted-foreground">Quantum-Secure</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-green-400" />
              <span className="text-muted-foreground">Human-AI Hybrid</span>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="max-w-6xl mx-auto mb-16">
          <Card className="card-cyber p-0 overflow-hidden">
            <div className="bg-primary/5 px-6 py-4 border-b border-border">
              <div className="grid grid-cols-5 gap-4 items-center">
                <div className="font-semibold text-foreground">Capability</div>
                <div className="text-center">
                  <div className="font-bold text-primary text-lg">VerteidIQ</div>
                  <div className="text-xs text-muted-foreground">Autonomous AI</div>
                </div>
                <div className="text-center text-muted-foreground">
                  <div className="font-semibold">Competitor A</div>
                  <div className="text-xs">Rule-Based</div>
                </div>
                <div className="text-center text-muted-foreground">
                  <div className="font-semibold">Competitor B</div>
                  <div className="text-xs">Manual Focus</div>
                </div>
                <div className="text-center text-muted-foreground">
                  <div className="font-semibold">Competitor C</div>
                  <div className="text-xs">Semi-Automated</div>
                </div>
              </div>
            </div>

            <div className="divide-y divide-border">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="px-6 py-6 hover:bg-background/50 transition-colors"
                >
                  <div className="grid grid-cols-5 gap-4 items-center">
                    
                    {/* Feature Name */}
                    <div className="flex items-center space-x-3">
                      <feature.verteidiq.icon className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-semibold text-foreground">{feature.feature}</div>
                        <div className="text-xs text-muted-foreground">{feature.category}</div>
                      </div>
                    </div>

                    {/* VerteidIQ */}
                    <div className="text-center space-y-2">
                      {getStatusIcon(feature.verteidiq.status, feature.verteidiq.icon)}
                      <div className="text-xs text-muted-foreground">{feature.verteidiq.description}</div>
                      {getStatusBadge(feature.verteidiq.status)}
                    </div>

                    {/* Competitor 1 */}
                    <div className="text-center space-y-2">
                      {getStatusIcon(feature.competitor1.status, AlertTriangle)}
                      <div className="text-xs text-muted-foreground">{feature.competitor1.description}</div>
                      {getStatusBadge(feature.competitor1.status)}
                    </div>

                    {/* Competitor 2 */}
                    <div className="text-center space-y-2">
                      {getStatusIcon(feature.competitor2.status, X)}
                      <div className="text-xs text-muted-foreground">{feature.competitor2.description}</div>
                      {getStatusBadge(feature.competitor2.status)}
                    </div>

                    {/* Competitor 3 */}
                    <div className="text-center space-y-2">
                      {getStatusIcon(feature.competitor3.status, AlertTriangle)}
                      <div className="text-xs text-muted-foreground">{feature.competitor3.description}</div>
                      {getStatusBadge(feature.competitor3.status)}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>

        {/* Key Differentiators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
          <Card className="card-cyber p-6 text-center group hover:scale-105 transition-transform">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6 group-hover:bg-primary/20 transition-colors">
              <Brain className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">Truly Autonomous</h3>
            <p className="text-muted-foreground mb-4">
              Our AI agents don't just follow rules - they think, adapt, and make complex security decisions independently.
            </p>
            <Badge className="bg-primary/20 text-primary">Unique to VerteidIQ</Badge>
          </Card>

          <Card className="card-cyber p-6 text-center group hover:scale-105 transition-transform">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-500/10 mb-6 group-hover:bg-purple-500/20 transition-colors">
              <Sparkles className="h-8 w-8 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">Quantum-Secure</h3>
            <p className="text-muted-foreground mb-4">
              Built for the future with quantum-resistant encryption and AI models that defend against quantum computing threats.
            </p>
            <Badge className="bg-purple-500/20 text-purple-400">Future-Proof Security</Badge>
          </Card>

          <Card className="card-cyber p-6 text-center group hover:scale-105 transition-transform">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 mb-6 group-hover:bg-green-500/20 transition-colors">
              <Users className="h-8 w-8 text-green-400" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">Human-AI Hybrid</h3>
            <p className="text-muted-foreground mb-4">
              Combines AI speed and scale with human security expertise for zero false positives and perfect accuracy.
            </p>
            <Badge className="bg-green-500/20 text-green-400">Best of Both Worlds</Badge>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Ready to Experience Autonomous Security?
          </h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join the 500+ CISOs who've made the switch to truly intelligent cybersecurity.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Button className="btn-cyber px-8 py-4 text-lg">
              <Target className="h-5 w-5 mr-2" />
              Start Free Assessment
            </Button>
            <Button variant="outline" className="px-8 py-4 text-lg border-primary/50 text-primary hover:bg-primary/10">
              <Clock className="h-5 w-5 mr-2" />
              Book CISO Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompetitiveDifferentiation;