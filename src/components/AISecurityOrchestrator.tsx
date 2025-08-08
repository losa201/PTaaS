import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Brain, 
  Zap, 
  Target, 
  Shield, 
  Network,
  Eye,
  AlertTriangle,
  TrendingUp,
  Activity,
  Cpu,
  Database,
  Globe,
  Users,
  Lock,
  Unlock,
  PlayCircle,
  PauseCircle,
  StopCircle,
  RefreshCw,
  Settings,
  BarChart3,
  PieChart,
  LineChart,
  Layers,
  Workflow,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AIAgent {
  id: string;
  name: string;
  type: 'threat_detection' | 'incident_response' | 'vulnerability_analysis' | 'behavioral_analysis';
  status: 'active' | 'idle' | 'learning' | 'error';
  confidence: number;
  lastAction: string;
  performance: {
    accuracy: number;
    falsePositives: number;
    responseTime: number;
    learningProgress: number;
  };
  capabilities: string[];
  currentTask?: string;
  autonomyLevel: 'supervised' | 'semi_autonomous' | 'fully_autonomous';
}

interface SecurityWorkflow {
  id: string;
  name: string;
  description: string;
  status: 'running' | 'paused' | 'completed' | 'failed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  steps: WorkflowStep[];
  progress: number;
  estimatedCompletion: string;
  triggerConditions: string[];
  aiAgentsInvolved: string[];
  automationLevel: number;
}

interface WorkflowStep {
  id: string;
  name: string;
  type: 'detection' | 'analysis' | 'response' | 'remediation' | 'reporting';
  status: 'pending' | 'running' | 'completed' | 'failed';
  aiAgent?: string;
  duration: string;
  output?: any;
}

interface SecurityInsight {
  id: string;
  type: 'threat_prediction' | 'vulnerability_forecast' | 'behavior_anomaly' | 'risk_assessment';
  title: string;
  description: string;
  confidence: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  predictedImpact: string;
  recommendations: string[];
  dataSource: string[];
  timestamp: string;
  aiModel: string;
}

const AISecurityOrchestrator: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedAgent, setSelectedAgent] = useState<string>('all');
  const [orchestrationMode, setOrchestrationMode] = useState<'manual' | 'semi_auto' | 'fully_auto'>('semi_auto');

  const [aiAgents, setAiAgents] = useState<AIAgent[]>([
    {
      id: 'agent-001',
      name: 'ThreatGuard AI',
      type: 'threat_detection',
      status: 'active',
      confidence: 94,
      lastAction: 'Detected APT activity on network segment 10.0.2.0/24',
      performance: {
        accuracy: 96.2,
        falsePositives: 3.1,
        responseTime: 0.8,
        learningProgress: 87
      },
      capabilities: ['Network Traffic Analysis', 'Malware Detection', 'IOC Correlation', 'Threat Intelligence'],
      currentTask: 'Analyzing suspicious PowerShell execution patterns',
      autonomyLevel: 'semi_autonomous'
    },
    {
      id: 'agent-002',
      name: 'ResponseBot Elite',
      type: 'incident_response',
      status: 'active',
      confidence: 91,
      lastAction: 'Executed automated containment for malware incident INC-2025-0847',
      performance: {
        accuracy: 89.7,
        falsePositives: 5.2,
        responseTime: 12.4,
        learningProgress: 92
      },
      capabilities: ['Incident Orchestration', 'Automated Remediation', 'Evidence Collection', 'Stakeholder Notification'],
      currentTask: 'Coordinating response to data exfiltration attempt',
      autonomyLevel: 'fully_autonomous'
    },
    {
      id: 'agent-003',
      name: 'VulnScan Neural',
      type: 'vulnerability_analysis',
      status: 'learning',
      confidence: 88,
      lastAction: 'Updated vulnerability models with latest CVE data',
      performance: {
        accuracy: 92.4,
        falsePositives: 4.7,
        responseTime: 45.2,
        learningProgress: 78
      },
      capabilities: ['Vulnerability Assessment', 'Risk Prioritization', 'Patch Management', 'Asset Discovery'],
      currentTask: 'Learning new attack patterns from security feeds',
      autonomyLevel: 'supervised'
    },
    {
      id: 'agent-004',
      name: 'BehaviorWatch AI',
      type: 'behavioral_analysis',
      status: 'active',
      confidence: 85,
      lastAction: 'Identified anomalous user behavior: excessive data downloads',
      performance: {
        accuracy: 84.6,
        falsePositives: 8.9,
        responseTime: 2.1,
        learningProgress: 95
      },
      capabilities: ['User Behavior Analysis', 'Anomaly Detection', 'Risk Scoring', 'Insider Threat Detection'],
      currentTask: 'Analyzing after-hours access patterns',
      autonomyLevel: 'semi_autonomous'
    }
  ]);

  const [workflows, setWorkflows] = useState<SecurityWorkflow[]>([
    {
      id: 'wf-001',
      name: 'Advanced Persistent Threat Response',
      description: 'Multi-stage workflow for detecting and responding to APT campaigns',
      status: 'running',
      priority: 'critical',
      steps: [
        { id: 's1', name: 'Initial Detection', type: 'detection', status: 'completed', aiAgent: 'ThreatGuard AI', duration: '2.3s' },
        { id: 's2', name: 'Threat Correlation', type: 'analysis', status: 'completed', aiAgent: 'ThreatGuard AI', duration: '15.7s' },
        { id: 's3', name: 'Impact Assessment', type: 'analysis', status: 'running', aiAgent: 'ResponseBot Elite', duration: '45s' },
        { id: 's4', name: 'Automated Containment', type: 'response', status: 'pending', aiAgent: 'ResponseBot Elite', duration: 'Est. 2m' },
        { id: 's5', name: 'Evidence Collection', type: 'response', status: 'pending', aiAgent: 'ResponseBot Elite', duration: 'Est. 5m' }
      ],
      progress: 67,
      estimatedCompletion: '3 minutes',
      triggerConditions: ['Multiple failed authentications', 'Lateral movement detected', 'Data access anomalies'],
      aiAgentsInvolved: ['agent-001', 'agent-002'],
      automationLevel: 85
    },
    {
      id: 'wf-002',
      name: 'Insider Threat Investigation',
      description: 'Comprehensive analysis of potential insider threat activities',
      status: 'running',
      priority: 'high',
      steps: [
        { id: 's1', name: 'Behavior Baseline Analysis', type: 'analysis', status: 'completed', aiAgent: 'BehaviorWatch AI', duration: '1.2m' },
        { id: 's2', name: 'Anomaly Detection', type: 'detection', status: 'completed', aiAgent: 'BehaviorWatch AI', duration: '45s' },
        { id: 's3', name: 'Risk Assessment', type: 'analysis', status: 'running', aiAgent: 'BehaviorWatch AI', duration: '2m' },
        { id: 's4', name: 'Evidence Gathering', type: 'response', status: 'pending', aiAgent: 'ResponseBot Elite', duration: 'Est. 8m' }
      ],
      progress: 45,
      estimatedCompletion: '8 minutes',
      triggerConditions: ['Unusual data access patterns', 'Off-hours activity', 'Privileged account anomalies'],
      aiAgentsInvolved: ['agent-004', 'agent-002'],
      automationLevel: 92
    }
  ]);

  const [securityInsights, setSecurityInsights] = useState<SecurityInsight[]>([
    {
      id: 'insight-001',
      type: 'threat_prediction',
      title: 'Predicted Ransomware Campaign Targeting Healthcare Sector',
      description: 'AI models predict 73% likelihood of ransomware attacks targeting healthcare infrastructure in next 48 hours',
      confidence: 87,
      severity: 'critical',
      predictedImpact: 'Potential disruption to 15+ healthcare facilities',
      recommendations: [
        'Increase monitoring on healthcare clients',
        'Deploy additional endpoint protection',
        'Activate incident response teams',
        'Update threat intelligence feeds'
      ],
      dataSource: ['Threat Intelligence Feeds', 'Dark Web Monitoring', 'Historical Attack Patterns'],
      timestamp: '2 hours ago',
      aiModel: 'ThreatPredictor-Neural-v2.1'
    },
    {
      id: 'insight-002',
      type: 'vulnerability_forecast',
      title: 'Critical Vulnerability Expected in Popular Web Framework',
      description: 'Predictive analysis suggests high probability of critical RCE vulnerability in React framework',
      confidence: 78,
      severity: 'high',
      predictedImpact: 'Potential impact on 2,340+ client applications',
      recommendations: [
        'Monitor security advisories closely',
        'Prepare emergency patching procedures',
        'Identify applications using React framework',
        'Develop mitigation strategies'
      ],
      dataSource: ['CVE Patterns', 'Framework Development Analysis', 'Security Research Trends'],
      timestamp: '4 hours ago',
      aiModel: 'VulnPredict-ML-v1.8'
    },
    {
      id: 'insight-003',
      type: 'behavior_anomaly',
      title: 'Anomalous Executive Access Patterns Detected',
      description: 'AI behavioral analysis identified unusual access patterns from C-level executives across multiple clients',
      confidence: 91,
      severity: 'medium',
      predictedImpact: 'Potential account compromise or policy violations',
      recommendations: [
        'Implement additional MFA requirements',
        'Conduct executive security awareness training',
        'Review access policies for privileged accounts',
        'Enable enhanced monitoring for executive accounts'
      ],
      dataSource: ['Access Logs', 'Behavioral Baselines', 'Privilege Analytics'],
      timestamp: '6 hours ago',
      aiModel: 'BehaviorAnalyzer-Deep-v3.2'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': case 'running': case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'idle': case 'paused': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'learning': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'error': case 'failed': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getAgentIcon = (type: string) => {
    switch (type) {
      case 'threat_detection': return <Target className="h-5 w-5" />;
      case 'incident_response': return <Zap className="h-5 w-5" />;
      case 'vulnerability_analysis': return <Shield className="h-5 w-5" />;
      case 'behavioral_analysis': return <Eye className="h-5 w-5" />;
      default: return <Brain className="h-5 w-5" />;
    }
  };

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAiAgents(prev => prev.map(agent => ({
        ...agent,
        confidence: Math.max(70, Math.min(99, agent.confidence + (Math.random() - 0.5) * 4)),
        performance: {
          ...agent.performance,
          accuracy: Math.max(80, Math.min(99, agent.performance.accuracy + (Math.random() - 0.5) * 2)),
          responseTime: Math.max(0.1, agent.performance.responseTime + (Math.random() - 0.5) * 0.5)
        }
      })));

      setWorkflows(prev => prev.map(workflow => 
        workflow.status === 'running' ? {
          ...workflow,
          progress: Math.min(100, workflow.progress + Math.random() * 5)
        } : workflow
      ));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
              AI Security Orchestrator
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl">
              Next-generation AI-powered security orchestration with autonomous agents, predictive analytics, 
              and intelligent workflow automation for enterprise cyber defense.
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-gray-600">Orchestration Mode</p>
              <Select value={orchestrationMode} onValueChange={setOrchestrationMode as any}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manual">Manual Control</SelectItem>
                  <SelectItem value="semi_auto">Semi-Autonomous</SelectItem>
                  <SelectItem value="fully_auto">Fully Autonomous</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className={`px-3 py-2 rounded-lg ${
              orchestrationMode === 'fully_auto' ? 'bg-green-100 text-green-800' :
              orchestrationMode === 'semi_auto' ? 'bg-blue-100 text-blue-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  orchestrationMode === 'fully_auto' ? 'bg-green-500 animate-pulse' :
                  orchestrationMode === 'semi_auto' ? 'bg-blue-500 animate-pulse' :
                  'bg-gray-500'
                }`} />
                <span className="text-xs font-medium">
                  {orchestrationMode === 'fully_auto' ? 'AI Autonomous' :
                   orchestrationMode === 'semi_auto' ? 'AI Assisted' : 'Manual'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="agents" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            AI Agents
          </TabsTrigger>
          <TabsTrigger value="workflows" className="flex items-center gap-2">
            <Workflow className="h-4 w-4" />
            Workflows
          </TabsTrigger>
          <TabsTrigger value="insights" className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            AI Insights
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Analytics
          </TabsTrigger>
        </TabsList>

        {/* Overview */}
        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-purple-800">Active AI Agents</p>
                      <p className="text-3xl font-bold text-purple-900">
                        {aiAgents.filter(a => a.status === 'active').length}
                      </p>
                    </div>
                    <Brain className="h-8 w-8 text-purple-600" />
                  </div>
                  <p className="text-xs text-purple-700 mt-2">
                    {aiAgents.filter(a => a.status === 'learning').length} learning
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-800">Active Workflows</p>
                      <p className="text-3xl font-bold text-blue-900">
                        {workflows.filter(w => w.status === 'running').length}
                      </p>
                    </div>
                    <Workflow className="h-8 w-8 text-blue-600" />
                  </div>
                  <p className="text-xs text-blue-700 mt-2">
                    Avg. automation: {Math.round(workflows.reduce((acc, w) => acc + w.automationLevel, 0) / workflows.length)}%
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-800">AI Confidence</p>
                      <p className="text-3xl font-bold text-green-900">
                        {Math.round(aiAgents.reduce((acc, a) => acc + a.confidence, 0) / aiAgents.length)}%
                      </p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-600" />
                  </div>
                  <p className="text-xs text-green-700 mt-2">+2.3% from last hour</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-orange-800">Threats Mitigated</p>
                      <p className="text-3xl font-bold text-orange-900">247</p>
                    </div>
                    <Shield className="h-8 w-8 text-orange-600" />
                  </div>
                  <p className="text-xs text-orange-700 mt-2">23 in last hour</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Real-time Activity Feed */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Real-time AI Security Activities
              </CardTitle>
              <CardDescription>
                Live feed of AI agent activities and automated security operations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { agent: 'ThreatGuard AI', action: 'Detected suspicious network traffic from 192.168.1.45', severity: 'high', time: '2 seconds ago' },
                  { agent: 'ResponseBot Elite', action: 'Automatically quarantined malicious file hash d41d8cd9...', severity: 'critical', time: '15 seconds ago' },
                  { agent: 'BehaviorWatch AI', action: 'Identified anomalous login pattern for user john.doe', severity: 'medium', time: '32 seconds ago' },
                  { agent: 'VulnScan Neural', action: 'Discovered new CVE-2025-1234 affecting 15 assets', severity: 'high', time: '1 minute ago' },
                  { agent: 'ThreatGuard AI', action: 'Correlated IOCs with known APT29 campaign', severity: 'critical', time: '2 minutes ago' }
                ].map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        activity.severity === 'critical' ? 'bg-red-500 animate-pulse' :
                        activity.severity === 'high' ? 'bg-orange-500 animate-pulse' :
                        'bg-yellow-500'
                      }`} />
                      <div>
                        <p className="font-medium text-sm">{activity.action}</p>
                        <p className="text-xs text-gray-600">{activity.agent} • {activity.time}</p>
                      </div>
                    </div>
                    <Badge className={getSeverityColor(activity.severity)}>
                      {activity.severity}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Agents */}
        <TabsContent value="agents" className="space-y-6">
          <div className="grid gap-6">
            {aiAgents.map((agent, index) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-lg ${
                          agent.status === 'active' ? 'bg-green-100' :
                          agent.status === 'learning' ? 'bg-blue-100' :
                          agent.status === 'idle' ? 'bg-yellow-100' :
                          'bg-red-100'
                        }`}>
                          {getAgentIcon(agent.type)}
                        </div>
                        <div>
                          <CardTitle className="text-xl">{agent.name}</CardTitle>
                          <CardDescription className="flex items-center gap-2 mt-1">
                            <Badge className={getStatusColor(agent.status)}>
                              {agent.status}
                            </Badge>
                            <Badge variant="outline">
                              {agent.autonomyLevel.replace('_', ' ')}
                            </Badge>
                          </CardDescription>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600 mb-1">
                          {agent.confidence}%
                        </div>
                        <p className="text-xs text-gray-600">Confidence</p>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm font-medium mb-2">Current Task:</p>
                      <p className="text-sm text-gray-700 bg-gray-50 p-2 rounded">
                        {agent.currentTask || agent.lastAction}
                      </p>
                    </div>
                    
                    {/* Performance Metrics */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <p className="text-lg font-bold text-green-600">{agent.performance.accuracy}%</p>
                        <p className="text-xs text-green-800">Accuracy</p>
                      </div>
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <p className="text-lg font-bold text-blue-600">{agent.performance.falsePositives}%</p>
                        <p className="text-xs text-blue-800">False Positives</p>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <p className="text-lg font-bold text-purple-600">{agent.performance.responseTime}s</p>
                        <p className="text-xs text-purple-800">Response Time</p>
                      </div>
                      <div className="text-center p-3 bg-orange-50 rounded-lg">
                        <p className="text-lg font-bold text-orange-600">{agent.performance.learningProgress}%</p>
                        <p className="text-xs text-orange-800">Learning</p>
                      </div>
                    </div>
                    
                    {/* Capabilities */}
                    <div>
                      <p className="text-sm font-medium mb-2">Capabilities:</p>
                      <div className="flex flex-wrap gap-2">
                        {agent.capabilities.map((capability, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {capability}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    {/* Learning Progress */}
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Learning Progress</span>
                        <span className="text-sm text-gray-600">{agent.performance.learningProgress}%</span>
                      </div>
                      <Progress value={agent.performance.learningProgress} className="h-2" />
                    </div>
                    
                    <div className="flex gap-2 pt-4 border-t">
                      <Button size="sm" variant="outline">
                        <Settings className="h-4 w-4 mr-1" />
                        Configure
                      </Button>
                      <Button size="sm" variant="outline">
                        <BarChart3 className="h-4 w-4 mr-1" />
                        Performance
                      </Button>
                      <Button size="sm">
                        <Brain className="h-4 w-4 mr-1" />
                        Train Model
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Workflows */}
        <TabsContent value="workflows" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Security Workflows</h2>
              <p className="text-gray-600">AI-orchestrated security operations and incident response</p>
            </div>
            <Button>
              <Workflow className="h-4 w-4 mr-2" />
              Create Workflow
            </Button>
          </div>
          
          <div className="grid gap-6">
            {workflows.map((workflow, index) => (
              <motion.div
                key={workflow.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <CardTitle className="text-lg">{workflow.name}</CardTitle>
                          <Badge className={getStatusColor(workflow.status)}>
                            {workflow.status}
                          </Badge>
                          <Badge className={getSeverityColor(workflow.priority)}>
                            {workflow.priority}
                          </Badge>
                        </div>
                        <CardDescription className="mb-3">
                          {workflow.description}
                        </CardDescription>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>{workflow.steps.length} steps</span>
                          <span>{workflow.aiAgentsInvolved.length} AI agents</span>
                          <span>{workflow.automationLevel}% automated</span>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-sm text-gray-600 mb-1">ETA: {workflow.estimatedCompletion}</p>
                        <div className="flex gap-2">
                          {workflow.status === 'running' && (
                            <Button size="sm" variant="outline">
                              <PauseCircle className="h-4 w-4" />
                            </Button>
                          )}
                          {workflow.status === 'paused' && (
                            <Button size="sm" variant="outline">
                              <PlayCircle className="h-4 w-4" />
                            </Button>
                          )}
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Progress */}
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Overall Progress</span>
                        <span className="text-sm text-gray-600">{workflow.progress}%</span>
                      </div>
                      <Progress value={workflow.progress} className="h-2" />
                    </div>
                    
                    {/* Workflow Steps */}
                    <div>
                      <p className="text-sm font-medium mb-3">Workflow Steps:</p>
                      <div className="space-y-2">
                        {workflow.steps.map((step, idx) => (
                          <div key={step.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <div className="flex items-center gap-3">
                              <div className={`w-3 h-3 rounded-full ${
                                step.status === 'completed' ? 'bg-green-500' :
                                step.status === 'running' ? 'bg-blue-500 animate-pulse' :
                                step.status === 'failed' ? 'bg-red-500' :
                                'bg-gray-300'
                              }`} />
                              <span className="text-sm font-medium">{step.name}</span>
                              {step.aiAgent && (
                                <Badge variant="outline" className="text-xs">
                                  {step.aiAgent}
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-500">{step.duration}</span>
                              <Badge className={getStatusColor(step.status)} variant="outline">
                                {step.status}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Trigger Conditions */}
                    <div>
                      <p className="text-sm font-medium mb-2">Trigger Conditions:</p>
                      <div className="flex flex-wrap gap-1">
                        {workflow.triggerConditions.map((condition, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {condition}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* AI Insights */}
        <TabsContent value="insights" className="space-y-6">
          <div className="grid gap-6">
            {securityInsights.map((insight, index) => (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <CardTitle className="text-lg">{insight.title}</CardTitle>
                          <Badge className={getSeverityColor(insight.severity)}>
                            {insight.severity}
                          </Badge>
                          <Badge variant="outline">
                            {insight.confidence}% confidence
                          </Badge>
                        </div>
                        <CardDescription className="mb-4">
                          {insight.description}
                        </CardDescription>
                        
                        <div className="mb-4">
                          <p className="text-sm font-medium mb-2">Predicted Impact:</p>
                          <Alert>
                            <AlertTriangle className="h-4 w-4" />
                            <AlertDescription>
                              {insight.predictedImpact}
                            </AlertDescription>
                          </Alert>
                        </div>
                      </div>
                      
                      <div className="ml-6 text-right">
                        <p className="text-sm text-gray-600 mb-2">{insight.timestamp}</p>
                        <Badge variant="secondary" className="text-xs">
                          {insight.aiModel}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Recommendations */}
                    <div>
                      <p className="text-sm font-medium mb-2">AI Recommendations:</p>
                      <ul className="space-y-1">
                        {insight.recommendations.map((rec, idx) => (
                          <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                            <span className="text-blue-500 mt-1">•</span>
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Data Sources */}
                    <div>
                      <p className="text-sm font-medium mb-2">Data Sources:</p>
                      <div className="flex flex-wrap gap-2">
                        {insight.dataSource.map((source, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {source}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex gap-2 pt-4 border-t">
                      <Button size="sm">
                        Implement Recommendations
                      </Button>
                      <Button size="sm" variant="outline">
                        Create Alert
                      </Button>
                      <Button size="sm" variant="outline">
                        Share Intel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Analytics */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">AI Agent Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {aiAgents.map(agent => (
                    <div key={agent.id} className="flex justify-between items-center">
                      <span className="text-sm">{agent.name}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-16">
                          <Progress value={agent.performance.accuracy} />
                        </div>
                        <span className="text-sm text-gray-600 min-w-[3rem] text-right">
                          {agent.performance.accuracy}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Workflow Automation Levels</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {workflows.map(workflow => (
                    <div key={workflow.id} className="flex justify-between items-center">
                      <span className="text-sm">{workflow.name.substring(0, 20)}...</span>
                      <div className="flex items-center gap-2">
                        <div className="w-16">
                          <Progress value={workflow.automationLevel} />
                        </div>
                        <span className="text-sm text-gray-600 min-w-[3rem] text-right">
                          {workflow.automationLevel}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Threat Detection Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">True Positives</span>
                    <span className="font-semibold text-green-600">892</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">False Positives</span>
                    <span className="font-semibold text-yellow-600">47</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Accuracy Rate</span>
                    <span className="font-semibold text-blue-600">94.7%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Avg Response Time</span>
                    <span className="font-semibold text-purple-600">1.2s</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>AI Performance Trends</CardTitle>
              <CardDescription>
                Performance metrics and learning progression over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center text-gray-500">
                📊 Interactive performance charts showing AI agent learning curves, 
                accuracy improvements, and response time optimization
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AISecurityOrchestrator;