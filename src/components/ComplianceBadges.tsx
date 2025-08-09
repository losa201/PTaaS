import { Shield, CheckCircle, Award, Lock, Globe, FileCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const ComplianceBadges = () => {
  const badges = [
    {
      icon: Shield,
      name: 'SOC 2 Type II',
      description: 'System and Organization Controls - Security, Availability, and Confidentiality',
      color: 'text-primary'
    },
    {
      icon: Award,
      name: 'ISO 27001',
      description: 'International Information Security Management Standard',
      color: 'text-secondary'
    },
    {
      icon: Globe,
      name: 'GDPR Compliant',
      description: 'General Data Protection Regulation - EU Data Privacy',
      color: 'text-accent'
    },
    {
      icon: FileCheck,
      name: 'PCI DSS',
      description: 'Payment Card Industry Data Security Standard',
      color: 'text-brand-warning'
    },
    {
      icon: Lock,
      name: 'TISAX',
      description: 'Trusted Information Security Assessment Exchange',
      color: 'text-brand-secondary'
    },
    {
      icon: CheckCircle,
      name: 'NIS2 Ready',
      description: 'Network and Information Systems Directive 2',
      color: 'text-brand-accent'
    }
  ];

  return (
    <div className="relative bg-surface-glass/30 backdrop-blur-2xl border-y border-border/20 py-8 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 cyber-mesh opacity-30" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center space-y-8">
          <div className="text-center max-w-4xl">
            <Badge className="mb-4 glass hover:bg-primary/20 border-primary/30 text-primary animate-glow-pulse">
              Enterprise Security Standards
            </Badge>
            <h2 className="text-2xl lg:text-3xl font-semibold text-foreground mb-3">
              Built for the Most <span className="text-gradient">Demanding Security Requirements</span>
            </h2>
            <p className="text-muted-foreground font-medium">
              Certified & Compliant • Trusted by Fortune 500 CISOs • Zero-Trust Architecture
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 w-full max-w-6xl">
            <TooltipProvider>
              {badges.map((badge, index) => (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <div className="group cursor-pointer">
                      <div className="glass glass-hover p-6 rounded-2xl h-full flex flex-col items-center text-center space-y-3 interactive-glow">
                        <div className={`p-3 rounded-xl bg-card/40 border border-border/30 group-hover:border-primary/40 transition-all duration-300 ${badge.color}`}>
                          <badge.icon className="h-6 w-6" />
                        </div>
                        <div>
                          <Badge 
                            variant="outline" 
                            className="text-xs font-medium bg-background/60 text-foreground border-border/50 group-hover:border-primary/40 transition-all duration-300"
                          >
                            {badge.name}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="glass border-primary/20">
                    <p className="text-sm max-w-xs">{badge.description}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
          </div>
          
          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-8 pt-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-glow-pulse" />
              <span>99.9% Security SLA</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-secondary rounded-full animate-glow-pulse" style={{ animationDelay: '1s' }} />
              <span>24/7 SOC Monitoring</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-accent rounded-full animate-glow-pulse" style={{ animationDelay: '2s' }} />
              <span>Zero-Knowledge Architecture</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplianceBadges;