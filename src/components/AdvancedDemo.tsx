import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Zap, 
  Brain, 
  Target, 
  Globe,
  Lock,
  Wifi,
  Server,
  Database,
  Users,
  Play,
  Pause,
  RotateCcw,
  TrendingUp,
  Activity
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ThreatEvent {
  id: string;
  timestamp: Date;
  type: 'ransomware' | 'phishing' | 'lateral_movement' | 'data_exfiltration' | 'credential_theft';
  severity: 'low' | 'medium' | 'high' | 'critical';
  source: string;
  target: string;
  blocked: boolean;
  aiResponse: string;
  details: string;
}

interface AIAgent {
  id: string;
  name: string;
  status: 'active' | 'investigating' | 'responding' | 'monitoring';
  task: string;
  confidence: number;
  icon: React.ComponentType<any>;
}

const AdvancedDemo = ({ industry = 'finance' }: { industry?: string }) => {
  const [isActive, setIsActive] = useState(false);
  const [threats, setThreats] = useState<ThreatEvent[]>([]);
  const [agents, setAgents] = useState<AIAgent[]>([]);
  const [currentScenario, setCurrentScenario] = useState('ransomware');
  const [demoStats, setDemoStats] = useState({
    threatsBlocked: 0,
    responseTime: 0,
    falsePositives: 0,
    accuracy: 0
  });

  const scenarios = {
    ransomware: {
      name: 'Ransomware Attack Simulation',
      description: 'Watch AI detect and stop a sophisticated ransomware attack in real-time',
      icon: Lock,
      color: 'text-red-400',
      duration: 30000
    },
    phishing: {
      name: 'Phishing Campaign Detection',
      description: 'See how AI identifies and blocks targeted phishing attempts',
      icon: Target,
      color: 'text-orange-400',
      duration: 25000
    },
    insider_threat: {
      name: 'Insider Threat Analysis',
      description: 'AI behavioral analysis detecting suspicious insider activity',
      icon: Users,
      color: 'text-yellow-400',
      duration: 35000
    }
  };

  const getIndustryThreats = (industry: string): Partial<ThreatEvent>[] => {
    const baseThreats = [
      {
        type: 'phishing' as const,
        severity: 'medium' as const,
        source: 'External Email',
        target: 'Finance Department',
        aiResponse: 'Email quarantined, recipients notified',
        details: 'Sophisticated phishing attempt targeting CFO credentials'
      },
      {
        type: 'lateral_movement' as const,
        severity: 'high' as const,
        source: 'Compromised Workstation',
        target: 'File Server',
        aiResponse: 'Network segmentation triggered, access blocked',
        details: 'Unusual network traversal pattern detected'
      }
    ];

    switch (industry) {
      case 'finance':
        return [
          ...baseThreats,
          {
            type: 'credential_theft' as const,
            severity: 'critical' as const,
            source: 'Banking Portal',
            target: 'Customer Database',
            aiResponse: 'Session terminated, fraud team alerted',
            details: 'Attempt to access customer financial data detected'
          }
        ];
      case 'healthcare':
        return [
          ...baseThreats,
          {
            type: 'ransomware' as const,
            severity: 'critical' as const,
            source: 'Medical Device',
            target: 'Patient Records',
            aiResponse: 'Device isolated, backup systems activated',
            details: 'Ransomware targeting patient data blocked'
          }
        ];
      case 'manufacturing':
        return [
          ...baseThreats,
          {
            type: 'lateral_movement' as const,
            severity: 'critical' as const,
            source: 'OT Network',
            target: 'Production Line',
            aiResponse: 'OT systems isolated, production safeguards engaged',
            details: 'Industrial sabotage attempt on manufacturing systems'
          }
        ];
      default:
        return baseThreats;
    }
  };

  useEffect(() => {
    if (!isActive) return;

    const industryThreats = getIndustryThreats(industry);
    let threatIndex = 0;
    
    const threatInterval = setInterval(() => {
      if (threatIndex < industryThreats.length) {
        const threat = industryThreats[threatIndex];
        const newThreat: ThreatEvent = {
          id: Math.random().toString(36).substr(2, 9),
          timestamp: new Date(),
          blocked: Math.random() > 0.1, // 90% block rate
          ...threat
        } as ThreatEvent;

        setThreats(prev => [newThreat, ...prev.slice(0, 9)]);
        setDemoStats(prev => ({
          threatsBlocked: prev.threatsBlocked + (newThreat.blocked ? 1 : 0),
          responseTime: Math.floor(Math.random() * 5) + 1,
          falsePositives: prev.falsePositives + (Math.random() > 0.95 ? 1 : 0),
          accuracy: Math.floor(Math.random() * 5) + 94
        }));

        threatIndex++;
      }
    }, 3000);

    // Initialize AI agents
    const aiAgents: AIAgent[] = [
      {
        id: '1',
        name: 'Threat Hunter',
        status: 'active',
        task: 'Scanning network for anomalies',
        confidence: 97,
        icon: Target
      },
      {
        id: '2',
        name: 'Behavioral Analyst',
        status: 'investigating',
        task: 'Analyzing user behavior patterns',
        confidence: 89,
        icon: Brain
      },
      {
        id: '3',
        name: 'Response Orchestrator',
        status: 'monitoring',
        task: 'Coordinating automated responses',
        confidence: 94,
        icon: Zap
      }
    ];

    setAgents(aiAgents);

    // Update agent status randomly
    const agentInterval = setInterval(() => {
      setAgents(prev => prev.map(agent => ({
        ...agent,
        status: ['active', 'investigating', 'responding', 'monitoring'][Math.floor(Math.random() * 4)] as any,
        confidence: Math.floor(Math.random() * 10) + 88
      })));
    }, 5000);

    return () => {
      clearInterval(threatInterval);
      clearInterval(agentInterval);
    };
  }, [isActive, industry]);

  const startDemo = () => {
    setIsActive(true);
    setThreats([]);
    setDemoStats({ threatsBlocked: 0, responseTime: 0, falsePositives: 0, accuracy: 0 });
  };

  const stopDemo = () => {
    setIsActive(false);
  };

  const resetDemo = () => {
    setIsActive(false);
    setThreats([]);
    setAgents([]);
    setDemoStats({ threatsBlocked: 0, responseTime: 0, falsePositives: 0, accuracy: 0 });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-400 bg-red-500/20 border-red-500';
      case 'high': return 'text-orange-400 bg-orange-500/20 border-orange-500';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500';
      case 'low': return 'text-green-400 bg-green-500/20 border-green-500';
      default: return 'text-slate-400 bg-slate-500/20 border-slate-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400';
      case 'investigating': return 'text-yellow-400';
      case 'responding': return 'text-red-400';
      case 'monitoring': return 'text-blue-400';
      default: return 'text-slate-400';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Demo Header */}
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-4 text-white">
          Live AI Security Demo
        </h2>
        <p className="text-xl text-slate-300 mb-8">
          Watch VerteidIQ's AI agents detect, analyze, and respond to cyber threats in real-time
        </p>
        
        {/* Demo Controls */}
        <div className="flex justify-center gap-4 mb-8">
          <Button
            onClick={startDemo}
            disabled={isActive}
            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
          >
            <Play className="w-4 h-4 mr-2" />
            Start Demo
          </Button>
          <Button
            onClick={stopDemo}
            disabled={!isActive}
            variant="outline"
            className="border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white"
          >
            <Pause className="w-4 h-4 mr-2" />
            Pause
          </Button>
          <Button
            onClick={resetDemo}
            variant="outline"
            className="border-slate-400 text-slate-400 hover:bg-slate-400 hover:text-white"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>

        {/* Live Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-slate-900/80 border-green-500/30">
            <CardContent className="text-center p-4">
              <div className="text-2xl font-bold text-green-400">{demoStats.threatsBlocked}</div>
              <div className="text-sm text-slate-400">Threats Blocked</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-900/80 border-blue-500/30">
            <CardContent className="text-center p-4">
              <div className="text-2xl font-bold text-blue-400">{demoStats.responseTime}s</div>
              <div className="text-sm text-slate-400">Response Time</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-900/80 border-purple-500/30">
            <CardContent className="text-center p-4">
              <div className="text-2xl font-bold text-purple-400">{demoStats.accuracy}%</div>
              <div className="text-sm text-slate-400">Accuracy</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-900/80 border-yellow-500/30">
            <CardContent className="text-center p-4">
              <div className="text-2xl font-bold text-yellow-400">{demoStats.falsePositives}</div>
              <div className="text-sm text-slate-400">False Positives</div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs defaultValue="threats" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-slate-800">
          <TabsTrigger value="threats" className="data-[state=active]:bg-red-500/20">
            Threat Detection
          </TabsTrigger>
          <TabsTrigger value="agents" className="data-[state=active]:bg-blue-500/20">
            AI Agents
          </TabsTrigger>
          <TabsTrigger value="network" className="data-[state=active]:bg-green-500/20">
            Network View
          </TabsTrigger>
        </TabsList>

        <TabsContent value="threats" className="space-y-4">
          <Card className="bg-slate-900/80 border-red-500/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                Live Threat Feed
                {isActive && <Badge className="bg-green-500/20 text-green-400">LIVE</Badge>}
              </CardTitle>
              <CardDescription>
                Real-time threat detection and automated response
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                <AnimatePresence>
                  {threats.map((threat) => (
                    <motion.div
                      key={threat.id}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      className={`p-4 rounded-lg border ${getSeverityColor(threat.severity)} bg-slate-800/50`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {threat.blocked ? (
                              <CheckCircle className="w-4 h-4 text-green-400" />
                            ) : (
                              <AlertTriangle className="w-4 h-4 text-red-400" />
                            )}
                            <span className="font-medium text-white">
                              {threat.type.replace('_', ' ').toUpperCase()}
                            </span>
                            <Badge className={getSeverityColor(threat.severity)}>
                              {threat.severity}
                            </Badge>
                          </div>
                          <div className="text-sm text-slate-300 mb-2">
                            <strong>Source:</strong> {threat.source} → <strong>Target:</strong> {threat.target}
                          </div>
                          <div className="text-sm text-slate-400 mb-2">
                            {threat.details}
                          </div>
                          <div className="text-sm font-medium text-blue-400">
                            🤖 AI Response: {threat.aiResponse}
                          </div>
                        </div>
                        <div className="text-xs text-slate-500 ml-4">
                          {threat.timestamp.toLocaleTimeString()}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {threats.length === 0 && (
                  <div className="text-center py-8 text-slate-400">
                    {isActive ? 'Monitoring for threats...' : 'Click "Start Demo" to begin threat simulation'}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="agents" className="space-y-4">
          <div className="grid md:grid-cols-3 gap-6">
            {agents.map((agent) => (
              <Card key={agent.id} className="bg-slate-900/80 border-blue-500/30">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-blue-500/20`}>
                      <agent.icon className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <CardTitle className="text-white text-lg">{agent.name}</CardTitle>
                      <Badge className={`${getStatusColor(agent.status)} bg-opacity-20`}>
                        {agent.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-slate-400 mb-1">Current Task</div>
                      <div className="text-white">{agent.task}</div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-400">Confidence</span>
                        <span className="text-green-400">{agent.confidence}%</span>
                      </div>
                      <Progress value={agent.confidence} className="h-2" />
                    </div>
                    {isActive && (
                      <div className="flex items-center gap-2 text-green-400">
                        <Activity className="w-4 h-4 animate-pulse" />
                        <span className="text-sm">Active</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="network" className="space-y-4">
          <Card className="bg-slate-900/80 border-green-500/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Globe className="w-5 h-5 text-green-400" />
                Network Topology & Protection
              </CardTitle>
              <CardDescription>
                Real-time network monitoring and AI-powered protection zones
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-8 py-8">
                {/* Internet Zone */}
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-red-500/20 border-2 border-red-500 flex items-center justify-center">
                    <Globe className="w-8 h-8 text-red-400" />
                  </div>
                  <h3 className="text-white font-medium mb-2">Internet</h3>
                  <Badge className="bg-red-500/20 text-red-400">Threat Zone</Badge>
                </div>

                {/* Firewall/Edge */}
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-blue-500/20 border-2 border-blue-500 flex items-center justify-center">
                    <Shield className="w-8 h-8 text-blue-400" />
                  </div>
                  <h3 className="text-white font-medium mb-2">AI Firewall</h3>
                  <Badge className="bg-blue-500/20 text-blue-400">Protected</Badge>
                </div>

                {/* Internal Network */}
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center">
                    <Server className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-white font-medium mb-2">Internal Network</h3>
                  <Badge className="bg-green-500/20 text-green-400">Secured</Badge>
                </div>
              </div>

              <div className="mt-8 p-4 bg-slate-800/50 rounded-lg">
                <h4 className="text-white font-medium mb-3">Protection Status</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-slate-300">Zero-Trust Architecture Active</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-slate-300">AI Threat Detection Enabled</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-slate-300">Automated Response Active</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-slate-300">24/7 Monitoring Online</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* CTA */}
      <Card className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-blue-500/50">
        <CardContent className="text-center p-8">
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to Deploy AI-Powered Security?
          </h3>
          <p className="text-slate-300 mb-6">
            See how VerteidIQ can protect your organization with autonomous threat detection and response.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              Schedule Live Demo
            </Button>
            <Button variant="outline" className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white">
              Start Free Trial
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedDemo;