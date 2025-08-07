import { Card } from '@/components/ui/card';
import { ArrowRight, Target, Search, Eye, RefreshCw } from 'lucide-react';

const PTaaSWorkflow = () => {
  const steps = [
    {
      number: '01',
      icon: Target,
      title: 'Scope & Launch Test',
      description: 'Define your target scope (web/API/cloud) and launch automated + manual testing'
    },
    {
      number: '02', 
      icon: Search,
      title: 'Automated Scanning + Human Review',
      description: 'AI-powered tools run comprehensive scans while security experts validate findings'
    },
    {
      number: '03',
      icon: Eye,
      title: 'Live Dashboard with Findings',
      description: 'Real-time results appear in your dashboard with detailed remediation guidance'
    },
    {
      number: '04',
      icon: RefreshCw,
      title: 'Retest on Demand',
      description: 'Validate fixes instantly with one-click retesting and continuous monitoring'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-background to-background/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-cyber bg-clip-text text-transparent">
            How PTaaS Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From scope to remediation, see how continuous penetration testing integrates seamlessly into your workflow
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="card-cyber p-6 text-center group hover:scale-105 transition-all duration-300">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">
                  {step.number}
                </div>
                
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-lg bg-primary/10 mb-4 mt-2 group-hover:bg-primary/20 transition-colors">
                  <step.icon className="h-8 w-8 text-primary" />
                </div>
                
                <h3 className="text-lg font-semibold mb-3 text-foreground">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
              </Card>

              {/* Arrow connector (hidden on last item and mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                  <ArrowRight className="h-6 w-6 text-primary/40" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground max-w-3xl mx-auto">
            Unlike traditional point-in-time assessments, PTaaS provides continuous validation of your security posture. 
            Start testing in minutes, not months.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PTaaSWorkflow;