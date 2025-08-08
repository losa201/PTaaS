import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Shield, 
  AlertTriangle, 
  TrendingUp, 
  Eye, 
  Lock, 
  Zap,
  Brain,
  Target,
  Activity,
  Globe,
  Users,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

interface ThreatIndicator {
  id: string;
  type: 'ip' | 'domain' | 'hash' | 'url';
  value: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  confidence: number;
  source: string;
  timestamp: string;
  description: string;
}

interface SecurityMetrics {
  threatLevel: number;
  vulnerabilities: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
  compliance: {
    score: number;
    frameworks: string[];
  };
  incidents: {
    open: number;
    resolved: number;
    mttr: string;
  };
}

const AdvancedSecurity: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [securityMetrics, setSecurityMetrics] = useState<SecurityMetrics>({
    threatLevel: 65,
    vulnerabilities: {
      critical: 3,
      high: 12,
      medium: 45,
      low: 78
    },
    compliance: {
      score: 87,
      frameworks: ['PCI-DSS', 'HIPAA', 'SOX', 'GDPR']
    },
    incidents: {
      open: 7,
      resolved: 143,
      mttr: '2.3h'
    }
  });

  const [threatIntel, setThreatIntel] = useState<ThreatIndicator[]>([
    {
      id: '1',
      type: 'ip',
      value: '192.168.1.100',
      severity: 'high',
      confidence: 87,
      source: 'OSINT',
      timestamp: '2 hours ago',
      description: 'Known malicious IP associated with APT group'
    },
    {
      id: '2',
      type: 'domain',
      value: 'suspicious-domain.com',
      severity: 'critical',
      confidence: 95,
      source: 'Threat Feed',
      timestamp: '4 hours ago',
      description: 'Command and control domain for ransomware'
    },
    {
      id: '3',
      type: 'hash',
      value: 'd41d8cd98f00b204e9800998ecf8427e',
      severity: 'medium',
      confidence: 72,
      source: 'Sandbox',
      timestamp: '6 hours ago',
      description: 'Suspicious file hash detected in network traffic'
    }
  ]);

  const [realTimeEvents, setRealTimeEvents] = useState([
    { id: 1, type: 'auth_failure', user: 'john.doe', severity: 'medium', time: '10:45 AM' },
    { id: 2, type: 'malware_detected', host: 'web-server-01', severity: 'critical', time: '10:42 AM' },
    { id: 3, type: 'policy_violation', user: 'jane.smith', severity: 'low', time: '10:38 AM' },
    { id: 4, type: 'unauthorized_access', resource: 'database', severity: 'high', time: '10:35 AM' }
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSecurityMetrics(prev => ({
        ...prev,
        threatLevel: Math.max(0, Math.min(100, prev.threatLevel + (Math.random() - 0.5) * 10)),
        incidents: {
          ...prev.incidents,
          open: Math.max(0, prev.incidents.open + (Math.random() > 0.7 ? 1 : -1))
        }
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <XCircle className="h-4 w-4" />;
      case 'high': return <AlertTriangle className="h-4 w-4" />;
      case 'medium': return <AlertCircle className="h-4 w-4" />;
      case 'low': return <CheckCircle2 className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Advanced Security Operations
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl">
          Real-time threat intelligence, AI-powered security analytics, and automated incident response 
          for enterprise-grade protection.
        </p>
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="threats" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Threat Intel
          </TabsTrigger>
          <TabsTrigger value="monitoring" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Monitoring
          </TabsTrigger>
          <TabsTrigger value="compliance" className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" />
            Compliance
          </TabsTrigger>
          <TabsTrigger value="response" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Response
          </TabsTrigger>
        </TabsList>

        {/* Security Dashboard */}
        <TabsContent value="dashboard" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-red-800">Threat Level</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-red-900">{securityMetrics.threatLevel}%</span>
                    <AlertTriangle className="h-8 w-8 text-red-600" />
                  </div>
                  <Progress value={securityMetrics.threatLevel} className="mt-2" />
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-orange-800">Active Vulnerabilities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-orange-900">
                      {securityMetrics.vulnerabilities.critical + securityMetrics.vulnerabilities.high}
                    </span>
                    <Target className="h-8 w-8 text-orange-600" />
                  </div>
                  <div className="mt-2 flex gap-1">
                    <Badge variant="destructive" className="text-xs">
                      {securityMetrics.vulnerabilities.critical} Critical
                    </Badge>
                    <Badge variant="outline" className="text-xs border-orange-300">
                      {securityMetrics.vulnerabilities.high} High
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-green-800">Compliance Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-green-900">{securityMetrics.compliance.score}%</span>
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                  </div>
                  <Progress value={securityMetrics.compliance.score} className="mt-2" />
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-blue-800">Open Incidents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-blue-900">{securityMetrics.incidents.open}</span>
                    <Activity className="h-8 w-8 text-blue-600" />
                  </div>
                  <p className="text-xs text-blue-700 mt-2">MTTR: {securityMetrics.incidents.mttr}</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Real-time Events */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Real-time Security Events
              </CardTitle>
              <CardDescription>
                Live security events and automated responses across your infrastructure
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {realTimeEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      {getSeverityIcon(event.severity)}
                      <div>
                        <p className="font-medium text-sm">
                          {event.type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </p>
                        <p className="text-xs text-gray-600">
                          {event.user || event.host || event.resource} • {event.time}
                        </p>
                      </div>
                    </div>
                    <Badge className={getSeverityColor(event.severity)}>
                      {event.severity}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Threat Intelligence */}
        <TabsContent value="threats" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                AI-Powered Threat Intelligence
              </CardTitle>
              <CardDescription>
                Advanced threat indicators with confidence scoring and automated analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {threatIntel.map((indicator, index) => (
                  <motion.div
                    key={indicator.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="text-xs">
                          {indicator.type.toUpperCase()}
                        </Badge>
                        <Badge className={getSeverityColor(indicator.severity)}>
                          {indicator.severity}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">Confidence: {indicator.confidence}%</p>
                        <p className="text-xs text-gray-500">{indicator.timestamp}</p>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <p className="font-mono text-sm bg-gray-100 p-2 rounded">
                        {indicator.value}
                      </p>
                    </div>
                    
                    <p className="text-sm text-gray-700 mb-3">{indicator.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="text-xs">
                        Source: {indicator.source}
                      </Badge>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Block
                        </Button>
                        <Button size="sm" variant="outline">
                          Investigate
                        </Button>
                        <Button size="sm">
                          Add to Watchlist
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Monitoring */}
        <TabsContent value="monitoring" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Network Monitoring
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Inbound Traffic</span>
                    <span className="text-sm font-medium">2.4 GB/s</span>
                  </div>
                  <Progress value={75} />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Outbound Traffic</span>
                    <span className="text-sm font-medium">1.8 GB/s</span>
                  </div>
                  <Progress value={60} />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Blocked Connections</span>
                    <span className="text-sm font-medium">1,247</span>
                  </div>
                  <Progress value={25} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  User Activity Monitoring
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Active Sessions</span>
                    <span className="text-sm font-medium">1,234</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Failed Logins</span>
                    <span className="text-sm font-medium text-red-600">23</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Privileged Access</span>
                    <span className="text-sm font-medium">45</span>
                  </div>
                  
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      3 users detected with unusual access patterns
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Compliance Management */}
        <TabsContent value="compliance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {securityMetrics.compliance.frameworks.map((framework, index) => (
              <motion.div
                key={framework}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{framework}</CardTitle>
                    <CardDescription>
                      Compliance status and requirements tracking
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm">Overall Compliance</span>
                          <span className="text-sm font-medium">
                            {Math.floor(securityMetrics.compliance.score + Math.random() * 10)}%
                          </span>
                        </div>
                        <Progress value={securityMetrics.compliance.score + Math.random() * 10} />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-gray-600">Requirements Met</p>
                          <p className="text-lg font-bold text-green-600">142</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600">Action Items</p>
                          <p className="text-lg font-bold text-orange-600">8</p>
                        </div>
                      </div>
                      
                      <Button className="w-full" variant="outline">
                        View Detailed Report
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Incident Response */}
        <TabsContent value="response" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Automated Incident Response
              </CardTitle>
              <CardDescription>
                AI-powered automated response and remediation workflows
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Eye className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="font-semibold mb-1">Detection</h3>
                    <p className="text-sm text-gray-600">AI-powered threat detection with 99.2% accuracy</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Brain className="h-8 w-8 text-yellow-600" />
                    </div>
                    <h3 className="font-semibold mb-1">Analysis</h3>
                    <p className="text-sm text-gray-600">Automated threat analysis and classification</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Zap className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="font-semibold mb-1">Response</h3>
                    <p className="text-sm text-gray-600">Automated containment and remediation</p>
                  </div>
                </div>
                
                <Alert>
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Active Response:</strong> Malware detected on 3 endpoints - automatic isolation and cleanup in progress
                  </AlertDescription>
                </Alert>
                
                <div className="space-y-2">
                  <h4 className="font-semibold">Recent Automated Actions</h4>
                  <div className="space-y-1 text-sm">
                    <p>• Blocked 127 malicious IPs automatically</p>
                    <p>• Quarantined 8 suspicious files</p>
                    <p>• Isolated 2 compromised endpoints</p>
                    <p>• Generated incident reports for security team</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedSecurity;