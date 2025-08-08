import { Shield, CheckCircle, Award, Lock, Globe, FileCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const ComplianceBadges = () => {
  const badges = [
    {
      icon: Shield,
      name: 'SOC 2 Type II',
      description: 'System and Organization Controls - Security, Availability, and Confidentiality',
      color: 'text-blue-500'
    },
    {
      icon: Award,
      name: 'ISO 27001',
      description: 'International Information Security Management Standard',
      color: 'text-green-500'
    },
    {
      icon: Globe,
      name: 'GDPR Compliant',
      description: 'General Data Protection Regulation - EU Data Privacy',
      color: 'text-purple-500'
    },
    {
      icon: FileCheck,
      name: 'PCI DSS',
      description: 'Payment Card Industry Data Security Standard',
      color: 'text-orange-500'
    },
    {
      icon: Lock,
      name: 'TISAX',
      description: 'Trusted Information Security Assessment Exchange',
      color: 'text-cyan-500'
    },
    {
      icon: CheckCircle,
      name: 'NIS2 Ready',
      description: 'Network and Information Systems Directive 2',
      color: 'text-indigo-500'
    }
  ];

  return (
    <div className="bg-primary/5 backdrop-blur border-t border-b border-primary/20 py-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-6">
          <div className="text-center">
            <p className="text-lg font-bold text-foreground mb-2">
              Enterprise-Ready Security Platform
            </p>
            <p className="text-sm text-muted-foreground font-medium">
              Certified & Compliant • Trusted by Fortune 500 CISOs • Zero-Trust Architecture
            </p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
            <TooltipProvider>
              {badges.map((badge, index) => (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <div className="flex items-center space-x-2 group cursor-pointer">
                      <div className={`p-2 rounded-lg bg-background/50 border border-border group-hover:border-primary/50 transition-all duration-200 ${badge.color}`}>
                        <badge.icon className="h-5 w-5" />
                      </div>
                      <Badge 
                        variant="secondary" 
                        className="text-xs font-medium bg-background/80 text-foreground border-border group-hover:border-primary/50 transition-all duration-200"
                      >
                        {badge.name}
                      </Badge>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-sm max-w-xs">{badge.description}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplianceBadges;