import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Zap, 
  Eye,
  TrendingUp,
  Clock,
  Target,
  Brain,
  Activity
} from 'lucide-react';

const InteractiveSecurityDemo = () => {
  const [activeDemo, setActiveDemo] = useState('scanning');
  const [progress, setProgress] = useState(0);
  const [threats, setThreats] = useState<Array<{id: string, type: string, severity: 'critical' | 'high' | 'medium' | 'low', status: 'detected' | 'analyzing' | 'mitigated'}>>([]);

  const demoScenarios = {
    scanning: {
      title: "Live Threat Scanning",
      description: "Watch our AI agents scan and detect vulnerabilities in real-time"
    },
    analysis: {
      title: "Autonomous Analysis",
      description: "See how our agents analyze threats and prioritize responses"
    },
    response: {
      title: "Automated Response",
      description: "Observe autonomous threat mitigation and remediation"
    }
  };

  const mockThreats = [
    { id: '1', type: 'SQL Injection', severity: 'critical' as const, status: 'detected' as const },
    { id: '2', type: 'Cross-Site Scripting', severity: 'high' as const, status: 'analyzing' as const },
    { id: '3', type: 'Weak Authentication', severity: 'medium' as const, status: 'mitigated' as const },
    { id: '4', type: 'Information Disclosure', severity: 'low' as const, status: 'detected' as const },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 10));
      
      if (Math.random() > 0.7) {
        const randomThreat = mockThreats[Math.floor(Math.random() * mockThreats.length)];
        setThreats(prev => {
          const exists = prev.find(t => t.id === randomThreat.id);
          if (!exists) {
            return [...prev.slice(-2), { ...randomThreat }];
          }
          return prev;
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-500 bg-red-500/20 border-red-500/50';
      case 'high': return 'text-orange-500 bg-orange-500/20 border-orange-500/50';
      case 'medium': return 'text-yellow-500 bg-yellow-500/20 border-yellow-500/50';
      case 'low': return 'text-blue-500 bg-blue-500/20 border-blue-500/50';
      default: return 'text-gray-500 bg-gray-500/20 border-gray-500/50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'detected': return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case 'analyzing': return <Brain className="h-4 w-4 text-blue-500 animate-pulse" />;
      case 'mitigated': return <CheckCircle className="h-4 w-4 text-green-500" />;
      default: return <Eye className="h-4 w-4" />;
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background/50 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-cyber bg-clip-text text-transparent">
            See VerteidIQ's AI Agents in Action
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Watch autonomous threat detection, analysis, and response happen in real-time
          </p>
        </div>

        {/* Demo Controls */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-card/50 rounded-lg p-1 space-x-1">
            {Object.entries(demoScenarios).map(([key, scenario]) => (
              <Button
                key={key}
                variant={activeDemo === key ? "default" : "ghost"}
                className={`px-6 py-3 ${activeDemo === key ? 'btn-cyber' : 'text-muted-foreground hover:text-foreground'}`}
                onClick={() => setActiveDemo(key)}
              >
                {scenario.title}
              </Button>
            ))}
          </div>
        </div>

        {/* Interactive Dashboard */}
        <div className="max-w-6xl mx-auto">
          <Card className="card-cyber p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Left Panel - Metrics */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                    <Activity className="h-5 w-5 mr-2 text-primary" />
                    Live Security Status
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="bg-background/50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Risk Score</span>
                        <span className="text-2xl font-bold text-primary">7.2/10</span>
                      </div>
                      <Progress value={72} className="h-2" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-background/50 rounded-lg p-3 text-center">
                        <div className="text-xl font-bold text-green-400">124</div>
                        <div className="text-xs text-muted-foreground">Assets Monitored</div>
                      </div>
                      <div className="bg-background/50 rounded-lg p-3 text-center">
                        <div className="text-xl font-bold text-blue-400">3.2k</div>
                        <div className="text-xs text-muted-foreground">Scans Today</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center">
                    <Brain className="h-4 w-4 mr-2 text-primary" />
                    AI Agent Activity
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between p-2 bg-background/30 rounded">
                      <span className="text-muted-foreground">Scanning Agent-7</span>
                      <Badge className="bg-green-500/20 text-green-400">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-background/30 rounded">
                      <span className="text-muted-foreground">Analysis Agent-3</span>
                      <Badge className="bg-blue-500/20 text-blue-400">Processing</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-background/30 rounded">
                      <span className="text-muted-foreground">Response Agent-1</span>
                      <Badge className="bg-orange-500/20 text-orange-400">Mitigating</Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* Center Panel - Threat Feed */}
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground flex items-center">
                    <Target className="h-5 w-5 mr-2 text-primary" />
                    Live Threat Detection
                  </h3>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" />
                    Real-time
                  </div>
                </div>

                <div className="bg-background/30 rounded-lg p-4 h-64 overflow-y-auto">
                  <AnimatePresence>
                    {threats.map((threat, index) => (
                      <motion.div
                        key={`${threat.id}-${index}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex items-center justify-between p-3 mb-2 bg-card/50 rounded-lg border border-border hover:border-primary/50 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          {getStatusIcon(threat.status)}
                          <div>
                            <div className="text-sm font-medium text-foreground">{threat.type}</div>
                            <div className="text-xs text-muted-foreground">
                              {threat.status === 'analyzing' ? 'AI analyzing...' : 
                               threat.status === 'mitigated' ? 'Automatically resolved' :
                               'Detected 2s ago'}
                            </div>
                          </div>
                        </div>
                        <Badge className={getSeverityColor(threat.severity)}>
                          {threat.severity.toUpperCase()}
                        </Badge>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  
                  {threats.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <Shield className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p>Scanning for threats...</p>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between items-center mt-6 pt-4 border-t border-border">
                  <div className="text-sm text-muted-foreground">
                    Scanning progress: {progress}%
                  </div>
                  <div className="flex space-x-3">
                    <Button variant="outline" size="sm">
                      View Full Report
                    </Button>
                    <Button className="btn-cyber" size="sm">
                      Start Live Demo
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Demo Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Real-Time Detection</h3>
            <p className="text-muted-foreground text-sm">
              Threats identified and analyzed within seconds of emergence
            </p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
              <Brain className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Autonomous Intelligence</h3>
            <p className="text-muted-foreground text-sm">
              AI agents that think, learn, and adapt to new attack patterns
            </p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Instant Mitigation</h3>
            <p className="text-muted-foreground text-sm">
              Automated response and containment without human intervention
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveSecurityDemo;