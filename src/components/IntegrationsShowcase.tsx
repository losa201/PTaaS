import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  GitBranch, 
  MessageSquare, 
  Shield, 
  Zap, 
  Database,
  Cloud,
  Settings,
  Bell,
  CheckCircle
} from 'lucide-react';

const IntegrationsShowcase = () => {
  const integrations = [
    {
      category: 'DevOps & CI/CD',
      tools: [
        { name: 'GitHub Actions', icon: GitBranch, status: 'live' },
        { name: 'GitLab CI', icon: GitBranch, status: 'live' },
        { name: 'Jenkins', icon: Settings, status: 'live' },
        { name: 'Azure DevOps', icon: Cloud, status: 'live' }
      ]
    },
    {
      category: 'Communication',
      tools: [
        { name: 'Slack', icon: MessageSquare, status: 'live' },
        { name: 'Microsoft Teams', icon: MessageSquare, status: 'live' },
        { name: 'PagerDuty', icon: Bell, status: 'live' },
        { name: 'Discord', icon: MessageSquare, status: 'beta' }
      ]
    },
    {
      category: 'Security & SIEM',
      tools: [
        { name: 'Splunk', icon: Database, status: 'live' },
        { name: 'Elastic SIEM', icon: Shield, status: 'live' },
        { name: 'Sentinel', icon: Shield, status: 'live' },
        { name: 'QRadar', icon: Shield, status: 'beta' }
      ]
    },
    {
      category: 'Cloud Platforms',
      tools: [
        { name: 'AWS Security Hub', icon: Cloud, status: 'live' },
        { name: 'Azure Security Center', icon: Cloud, status: 'live' },
        { name: 'GCP Security Center', icon: Cloud, status: 'live' },
        { name: 'Kubernetes', icon: Settings, status: 'live' }
      ]
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'live':
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/50">Live</Badge>;
      case 'beta':
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/50">Beta</Badge>;
      default:
        return null;
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-background to-background/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-cyber bg-clip-text text-transparent">
            Seamless DevOps Integration
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Plug into your existing security and development workflow. No disruption, maximum visibility.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {integrations.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.1 }}
            >
              <Card className="card-cyber p-6 h-full">
                <h3 className="font-semibold text-foreground mb-4 text-center">
                  {category.category}
                </h3>
                <div className="space-y-3">
                  {category.tools.map((tool, toolIndex) => (
                    <div key={toolIndex} className="flex items-center justify-between p-2 rounded-lg bg-background/50 border border-border hover:border-primary/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <tool.icon className="h-4 w-4 text-primary" />
                        <span className="text-sm text-foreground">{tool.name}</span>
                      </div>
                      {getStatusBadge(tool.status)}
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Integration Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Instant Setup</h3>
            <p className="text-muted-foreground text-sm">
              5-minute integration with pre-built connectors and APIs
            </p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
              <CheckCircle className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Automated Workflows</h3>
            <p className="text-muted-foreground text-sm">
              Auto-create tickets, trigger scans, and validate fixes
            </p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Zero False Positives</h3>
            <p className="text-muted-foreground text-sm">
              Human validation ensures only actionable findings reach your team
            </p>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            Missing an integration? <span className="text-primary cursor-pointer hover:underline">Request it here</span> - we typically add new integrations within 14 days.
          </p>
        </div>
      </div>
    </section>
  );
};

export default IntegrationsShowcase;