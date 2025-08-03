import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Terminal, 
  Shield, 
  Zap, 
  FileText, 
  Clock, 
  Target, 
  AlertCircle, 
  CheckCircle,
  PlayCircle,
  ArrowRight
} from 'lucide-react';

const PTaaS = () => {
  const features = [
    {
      icon: Terminal,
      title: 'Automated Penetration Testing',
      description: 'AI-driven vulnerability assessment with continuous scanning and real-time threat simulation',
      benefits: ['24/7 automated scans', 'Zero false positives', 'Real-time reporting']
    },
    {
      icon: Shield,
      title: 'Compliance Automation',
      description: 'Built-in compliance frameworks for GDPR, BSI, IT-SiG, and NIS2 with automated reporting',
      benefits: ['Regulatory alignment', 'Audit trail generation', 'Compliance scoring']
    },
    {
      icon: FileText,
      title: 'Executive Reporting',
      description: 'Comprehensive security reports with risk scoring, remediation plans, and compliance status',
      benefits: ['Executive dashboards', 'Technical deep-dives', 'Action prioritization']
    }
  ];

  const scanTypes = [
    { 
      name: 'Light Scan', 
      duration: '2-4 hours', 
      coverage: 'Network perimeter, web applications', 
      color: 'accent' 
    },
    { 
      name: 'Full Assessment', 
      duration: '1-3 days', 
      coverage: 'Complete infrastructure, applications, APIs', 
      color: 'primary' 
    },
    { 
      name: 'Evasive Testing', 
      duration: '3-7 days', 
      coverage: 'Advanced persistent threats, social engineering', 
      color: 'cyber-violet' 
    }
  ];

  const workflow = [
    {
      step: '01',
      title: 'Define Scope',
      description: 'Configure targets, assets, and testing parameters through intuitive interface',
      icon: Target
    },
    {
      step: '02',
      title: 'Launch Assessment',
      description: 'Deploy AI agents for comprehensive vulnerability discovery and exploitation',
      icon: PlayCircle
    },
    {
      step: '03',
      title: 'Monitor Progress',
      description: 'Real-time monitoring of scan progress with live vulnerability detection',
      icon: Clock
    },
    {
      step: '04',
      title: 'Review Results',
      description: 'Detailed analysis with CVSS scoring, exploitation paths, and remediation guidance',
      icon: CheckCircle
    }
  ];

  return (
    <section id="ptaas" className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/30">
            Penetration Testing as a Service
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cyber font-bold mb-6">
            <span className="text-neon-glow">PTaaS</span>{' '}
            <span className="text-foreground">Platform</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Transform your security posture with continuous, AI-powered penetration testing. 
            Identify vulnerabilities before attackers do with our autonomous testing platform.
          </p>
        </div>

        {/* Key Features */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="card-cyber border-border/50 hover:scale-105 transition-all duration-300">
              <CardHeader>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl text-foreground">{feature.title}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center text-sm text-muted-foreground">
                      <CheckCircle className="h-3 w-3 text-accent mr-2 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Scan Types */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8 text-foreground">Assessment Types</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {scanTypes.map((scan, index) => (
              <div key={index} className="card-cyber text-center group hover:scale-105 transition-transform duration-300">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-${scan.color}/10 mb-4 group-hover:bg-${scan.color}/20 transition-colors`}>
                  <Terminal className={`h-8 w-8 text-${scan.color}`} />
                </div>
                <h4 className="text-lg font-semibold mb-2 text-foreground">{scan.name}</h4>
                <p className="text-sm text-muted-foreground mb-3">{scan.coverage}</p>
                <Badge variant="outline" className={`border-${scan.color}/50 text-${scan.color}`}>
                  {scan.duration}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Workflow */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-12 text-foreground">How PTaaS Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflow.map((step, index) => (
              <div key={index} className="relative group">
                {/* Connection Line */}
                {index < workflow.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-primary/30 z-0"></div>
                )}
                
                <div className="card-cyber text-center relative z-10 group-hover:scale-105 transition-transform duration-300">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                    <step.icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-xs font-mono text-primary mb-2">{step.step}</div>
                  <h4 className="font-semibold mb-2 text-foreground">{step.title}</h4>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Demo Section */}
        <div className="card-cyber text-center py-16">
          <Terminal className="h-16 w-16 text-primary mx-auto mb-6 animate-pulse" />
          <h3 className="text-2xl font-bold mb-4 text-foreground">Experience PTaaS Live</h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            See our autonomous penetration testing in action. Watch as AI agents discover vulnerabilities, 
            assess risks, and generate comprehensive security reports in real-time.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button className="btn-cyber text-lg px-8 py-4">
              <PlayCircle className="h-5 w-5 mr-2" />
              Watch Demo
            </Button>
            <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground">
              Start Free Assessment
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-12 flex items-center justify-center space-x-2 text-sm text-muted-foreground">
          <AlertCircle className="h-4 w-4 text-accent" />
          <span>All assessments comply with ethical hacking standards and require explicit authorization</span>
        </div>
      </div>
    </section>
  );
};

export default PTaaS;