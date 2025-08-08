import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Shield, 
  Eye, 
  Network, 
  Lock, 
  Users, 
  Smartphone,
  Globe,
  Server,
  Key,
  AlertTriangle,
  CheckCircle2,
  Clock,
  BarChart3,
  Target,
  ArrowRight,
  Settings,
  Filter,
  RefreshCw,
  TrendingUp,
  Activity,
  Zap,
  Database,
  Cpu,
  HardDrive,
  Wifi,
  FileCheck,
  UserCheck,
  ShieldCheck,
  XCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

interface ZeroTrustPolicy {
  id: string;
  name: string;
  description: string;
  category: 'identity' | 'device' | 'network' | 'application' | 'data';
  status: 'active' | 'inactive' | 'testing' | 'failed';
  priority: 'critical' | 'high' | 'medium' | 'low';
  lastUpdated: string;
  rules: number;
  compliance: number;
  enforcement: 'monitor' | 'warn' | 'block';
  affectedAssets: number;
}

interface TrustScore {
  entity: string;
  type: 'user' | 'device' | 'application' | 'network';
  score: number;
  risk: 'low' | 'medium' | 'high' | 'critical';
  factors: {
    behavioral: number;
    contextual: number;
    security: number;
    compliance: number;
  };
  lastAssessed: string;
  trends: { time: string; score: number }[];
}

interface ZeroTrustAsset {
  id: string;
  name: string;
  type: 'endpoint' | 'server' | 'application' | 'database' | 'network';
  trustLevel: number;
  verified: boolean;
  encrypted: boolean;
  monitored: boolean;
  location: string;
  owner: string;
  riskScore: number;
  lastVerified: string;
  violations: number;
}

interface SecurityEvent {
  id: string;
  timestamp: string;
  event: string;
  source: string;
  target: string;
  action: 'allowed' | 'blocked' | 'monitored';
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  policy: string;
  details: string;
}

const ZeroTrustManager: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');
  const [isLoading, setIsLoading] = useState(false);

  const [policies] = useState<ZeroTrustPolicy[]>([
    {
      id: 'pol-001',
      name: 'Identity Verification & MFA',
      description: 'Multi-factor authentication required for all access requests',
      category: 'identity',
      status: 'active',
      priority: 'critical',
      lastUpdated: '2025-08-08T10:30:00Z',
      rules: 12,
      compliance: 98,
      enforcement: 'block',
      affectedAssets: 1247
    },
    {
      id: 'pol-002',
      name: 'Device Trust Assessment',
      description: 'Continuous device health and compliance monitoring',
      category: 'device',
      status: 'active',
      priority: 'high',
      lastUpdated: '2025-08-08T09:15:00Z',
      rules: 8,
      compliance: 94,
      enforcement: 'warn',
      affectedAssets: 892
    },
    {
      id: 'pol-003',
      name: 'Network Microsegmentation',
      description: 'Zero trust network access with least privilege principles',
      category: 'network',
      status: 'active',
      priority: 'critical',
      lastUpdated: '2025-08-08T11:45:00Z',
      rules: 24,
      compliance: 91,
      enforcement: 'block',
      affectedAssets: 2156
    },
    {
      id: 'pol-004',
      name: 'Application Access Control',
      description: 'Context-aware application access with dynamic risk assessment',
      category: 'application',
      status: 'testing',
      priority: 'high',
      lastUpdated: '2025-08-08T08:20:00Z',
      rules: 15,
      compliance: 87,
      enforcement: 'monitor',
      affectedAssets: 634
    },
    {
      id: 'pol-005',
      name: 'Data Classification & Protection',
      description: 'Automated data discovery, classification, and protection policies',
      category: 'data',
      status: 'active',
      priority: 'critical',
      lastUpdated: '2025-08-08T12:10:00Z',
      rules: 18,
      compliance: 96,
      enforcement: 'block',
      affectedAssets: 3421
    }
  ]);

  const [trustScores] = useState<TrustScore[]>([
    {
      entity: 'john.doe@company.com',
      type: 'user',
      score: 92,
      risk: 'low',
      factors: { behavioral: 95, contextual: 89, security: 94, compliance: 90 },
      lastAssessed: '2025-08-08T12:00:00Z',
      trends: [
        { time: '08:00', score: 88 },
        { time: '09:00', score: 90 },
        { time: '10:00', score: 91 },
        { time: '11:00', score: 93 },
        { time: '12:00', score: 92 }
      ]
    },
    {
      entity: 'LAPTOP-DEV-001',
      type: 'device',
      score: 78,
      risk: 'medium',
      factors: { behavioral: 82, contextual: 75, security: 80, compliance: 76 },
      lastAssessed: '2025-08-08T11:45:00Z',
      trends: [
        { time: '08:00', score: 85 },
        { time: '09:00', score: 82 },
        { time: '10:00', score: 79 },
        { time: '11:00', score: 77 },
        { time: '12:00', score: 78 }
      ]
    },
    {
      entity: 'CRM-Production',
      type: 'application',
      score: 96,
      risk: 'low',
      factors: { behavioral: 98, contextual: 94, security: 97, compliance: 95 },
      lastAssessed: '2025-08-08T12:30:00Z',
      trends: [
        { time: '08:00', score: 94 },
        { time: '09:00', score: 95 },
        { time: '10:00', score: 96 },
        { time: '11:00', score: 97 },
        { time: '12:00', score: 96 }
      ]
    },
    {
      entity: 'Corp-Network-DMZ',
      type: 'network',
      score: 65,
      risk: 'high',
      factors: { behavioral: 70, contextual: 62, security: 68, compliance: 60 },
      lastAssessed: '2025-08-08T11:20:00Z',
      trends: [
        { time: '08:00', score: 72 },
        { time: '09:00', score: 69 },
        { time: '10:00', score: 66 },
        { time: '11:00', score: 64 },
        { time: '12:00', score: 65 }
      ]
    }
  ]);

  const [assets] = useState<ZeroTrustAsset[]>([
    {
      id: 'asset-001',
      name: 'Database Server - Primary',
      type: 'database',
      trustLevel: 94,
      verified: true,
      encrypted: true,
      monitored: true,
      location: 'Data Center A',
      owner: 'IT Operations',
      riskScore: 12,
      lastVerified: '2025-08-08T11:30:00Z',
      violations: 0
    },
    {
      id: 'asset-002',
      name: 'Web Application Gateway',
      type: 'application',
      trustLevel: 87,
      verified: true,
      encrypted: true,
      monitored: true,
      location: 'Cloud Region US-East',
      owner: 'Security Team',
      riskScore: 23,
      lastVerified: '2025-08-08T10:45:00Z',
      violations: 1
    },
    {
      id: 'asset-003',
      name: 'Employee Workstation Pool',
      type: 'endpoint',
      trustLevel: 76,
      verified: false,
      encrypted: true,
      monitored: true,
      location: 'Corporate Office',
      owner: 'End Users',
      riskScore: 34,
      lastVerified: '2025-08-08T09:20:00Z',
      violations: 3
    }
  ]);

  const [securityEvents] = useState<SecurityEvent[]>([
    {
      id: 'evt-001',
      timestamp: '2025-08-08T12:45:00Z',
      event: 'Anomalous login attempt',
      source: '192.168.1.45',
      target: 'CRM Application',
      action: 'blocked',
      riskLevel: 'high',
      policy: 'Identity Verification & MFA',
      details: 'Login from unusual location without proper MFA'
    },
    {
      id: 'evt-002',
      timestamp: '2025-08-08T12:30:00Z',
      event: 'Device compliance violation',
      source: 'LAPTOP-DEV-001',
      target: 'File Server',
      action: 'monitored',
      riskLevel: 'medium',
      policy: 'Device Trust Assessment',
      details: 'Outdated antivirus definition detected'
    },
    {
      id: 'evt-003',
      timestamp: '2025-08-08T12:15:00Z',
      event: 'Unauthorized network scan',
      source: '10.0.2.100',
      target: 'Internal Network',
      action: 'blocked',
      riskLevel: 'critical',
      policy: 'Network Microsegmentation',
      details: 'Port scanning activity detected from compromised device'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'testing': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'failed': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-orange-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'identity': return <Users className="h-4 w-4" />;
      case 'device': return <Smartphone className="h-4 w-4" />;
      case 'network': return <Network className="h-4 w-4" />;
      case 'application': return <Globe className="h-4 w-4" />;
      case 'data': return <Database className="h-4 w-4" />;
      default: return <Shield className="h-4 w-4" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'user': return <Users className="h-4 w-4" />;
      case 'device': return <Smartphone className="h-4 w-4" />;
      case 'application': return <Globe className="h-4 w-4" />;
      case 'network': return <Network className="h-4 w-4" />;
      case 'endpoint': return <Cpu className="h-4 w-4" />;
      case 'server': return <Server className="h-4 w-4" />;
      case 'database': return <Database className="h-4 w-4" />;
      default: return <Shield className="h-4 w-4" />;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'allowed': return 'text-green-600';
      case 'blocked': return 'text-red-600';
      case 'monitored': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  // Calculate overall trust metrics
  const overallTrustScore = Math.round(
    trustScores.reduce((sum, score) => sum + score.score, 0) / trustScores.length
  );

  const filteredPolicies = policies.filter(policy => 
    selectedCategory === 'all' || policy.category === selectedCategory
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Zero Trust Architecture Manager
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl">
          Advanced zero trust implementation with continuous verification, policy enforcement, 
          and adaptive security controls for modern enterprise environments.
        </p>
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="policies" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Policies
          </TabsTrigger>
          <TabsTrigger value="trust-scores" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Trust Scores
          </TabsTrigger>
          <TabsTrigger value="assets" className="flex items-center gap-2">
            <Server className="h-4 w-4" />
            Assets
          </TabsTrigger>
          <TabsTrigger value="events" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Events
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Analytics
          </TabsTrigger>
        </TabsList>

        {/* Overview Dashboard */}
        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Overall Trust Score</p>
                    <p className="text-3xl font-bold text-blue-600">{overallTrustScore}%</p>
                  </div>
                  <Target className="h-8 w-8 text-blue-600" />
                </div>
                <p className="text-xs text-green-600 mt-2">+5% from yesterday</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Policies</p>
                    <p className="text-3xl font-bold text-green-600">
                      {policies.filter(p => p.status === 'active').length}
                    </p>
                  </div>
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-xs text-gray-500 mt-2">{policies.length} total policies</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Protected Assets</p>
                    <p className="text-3xl font-bold text-purple-600">8,350</p>
                  </div>
                  <Server className="h-8 w-8 text-purple-600" />
                </div>
                <p className="text-xs text-gray-500 mt-2">Across all categories</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Security Events</p>
                    <p className="text-3xl font-bold text-orange-600">1,247</p>
                  </div>
                  <Activity className="h-8 w-8 text-orange-600" />
                </div>
                <p className="text-xs text-red-600 mt-2">23 high priority</p>
              </CardContent>
            </Card>
          </div>

          {/* Trust Score Visualization */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Trust Score Distribution
              </CardTitle>
              <CardDescription>Real-time trust assessment across entity types</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {trustScores.map((score, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getTypeIcon(score.type)}
                        <div>
                          <p className="font-medium">{score.entity}</p>
                          <p className="text-sm text-gray-600 capitalize">{score.type}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold">{score.score}%</p>
                        <p className={`text-sm font-medium ${getRiskColor(score.risk)}`}>
                          {score.risk} risk
                        </p>
                      </div>
                    </div>
                    <Progress value={score.score} className="h-2" />
                    <div className="grid grid-cols-4 gap-4 text-xs">
                      <div>
                        <span className="text-gray-600">Behavioral:</span>
                        <span className="ml-1 font-medium">{score.factors.behavioral}%</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Contextual:</span>
                        <span className="ml-1 font-medium">{score.factors.contextual}%</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Security:</span>
                        <span className="ml-1 font-medium">{score.factors.security}%</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Compliance:</span>
                        <span className="ml-1 font-medium">{score.factors.compliance}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Security Events */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Recent Security Events
              </CardTitle>
              <CardDescription>Latest zero trust policy actions and alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {securityEvents.slice(0, 5).map((event, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-full ${
                        event.riskLevel === 'critical' ? 'bg-red-100 text-red-600' :
                        event.riskLevel === 'high' ? 'bg-orange-100 text-orange-600' :
                        event.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-green-100 text-green-600'
                      }`}>
                        <AlertTriangle className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">{event.event}</p>
                        <p className="text-sm text-gray-600">
                          {event.source} → {event.target}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(event.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={`${
                        event.action === 'blocked' ? 'bg-red-100 text-red-800' :
                        event.action === 'monitored' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {event.action}
                      </Badge>
                      <p className="text-xs text-gray-500 mt-1">{event.policy}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Policies Management */}
        <TabsContent value="policies" className="space-y-6">
          {/* Policy Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-[200px]">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="identity">Identity</SelectItem>
                      <SelectItem value="device">Device</SelectItem>
                      <SelectItem value="network">Network</SelectItem>
                      <SelectItem value="application">Application</SelectItem>
                      <SelectItem value="data">Data</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    Policy Builder
                  </Button>
                  <Button>
                    <Shield className="h-4 w-4 mr-2" />
                    New Policy
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Policies List */}
          <div className="grid gap-6">
            {filteredPolicies.map((policy, index) => (
              <motion.div
                key={policy.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <CardTitle className="text-lg">{policy.name}</CardTitle>
                          <Badge className={getStatusColor(policy.status)}>
                            {policy.status}
                          </Badge>
                          <Badge className={getPriorityColor(policy.priority)}>
                            {policy.priority}
                          </Badge>
                        </div>
                        <CardDescription className="mb-3">
                          {policy.description}
                        </CardDescription>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            {getCategoryIcon(policy.category)}
                            {policy.category}
                          </span>
                          <span className="flex items-center gap-1">
                            <FileCheck className="h-4 w-4" />
                            {policy.rules} rules
                          </span>
                          <span className="flex items-center gap-1">
                            <Target className="h-4 w-4" />
                            {policy.affectedAssets} assets
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600 mb-2">
                          Updated: {new Date(policy.lastUpdated).toLocaleDateString()}
                        </p>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Settings className="h-4 w-4 mr-1" />
                            Configure
                          </Button>
                          <Button size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            Monitor
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm font-medium mb-1">Compliance Rate</p>
                          <div className="flex items-center gap-2">
                            <Progress value={policy.compliance} className="flex-1" />
                            <span className="text-sm font-medium">{policy.compliance}%</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium mb-1">Enforcement Mode</p>
                          <Badge className={`${
                            policy.enforcement === 'block' ? 'bg-red-100 text-red-800' :
                            policy.enforcement === 'warn' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {policy.enforcement}
                          </Badge>
                        </div>
                        <div>
                          <p className="text-sm font-medium mb-1">Last Triggered</p>
                          <p className="text-sm text-gray-600">2 hours ago</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Trust Scores Detail */}
        <TabsContent value="trust-scores" className="space-y-6">
          <div className="grid gap-6">
            {trustScores.map((score, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getTypeIcon(score.type)}
                        <div>
                          <CardTitle className="text-lg">{score.entity}</CardTitle>
                          <CardDescription className="capitalize">{score.type} Entity</CardDescription>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-bold">{score.score}%</p>
                        <p className={`text-sm font-medium ${getRiskColor(score.risk)}`}>
                          {score.risk} risk
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Progress value={score.score} className="h-3" />
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {Object.entries(score.factors).map(([factor, value]) => (
                        <div key={factor} className="text-center">
                          <p className="text-sm font-medium capitalize">{factor}</p>
                          <p className="text-2xl font-bold text-blue-600">{value}%</p>
                          <Progress value={value} className="mt-1 h-1" />
                        </div>
                      ))}
                    </div>
                    
                    <div className="pt-4 border-t">
                      <p className="text-sm text-gray-600">
                        Last Assessment: {new Date(score.lastAssessed).toLocaleString()}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Assets Inventory */}
        <TabsContent value="assets" className="space-y-6">
          <div className="grid gap-6">
            {assets.map((asset, index) => (
              <motion.div
                key={asset.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        {getTypeIcon(asset.type)}
                        <div>
                          <CardTitle className="text-lg">{asset.name}</CardTitle>
                          <CardDescription>
                            {asset.type} • {asset.location} • {asset.owner}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-blue-600">{asset.trustLevel}%</p>
                        <p className="text-sm text-gray-600">Trust Level</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Progress value={asset.trustLevel} className="h-2" />
                      
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          {asset.verified ? (
                            <CheckCircle2 className="h-6 w-6 text-green-600" />
                          ) : (
                            <XCircle className="h-6 w-6 text-red-600" />
                          )}
                          <span className="text-xs">Verified</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          {asset.encrypted ? (
                            <Lock className="h-6 w-6 text-green-600" />
                          ) : (
                            <XCircle className="h-6 w-6 text-red-600" />
                          )}
                          <span className="text-xs">Encrypted</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          {asset.monitored ? (
                            <Eye className="h-6 w-6 text-green-600" />
                          ) : (
                            <XCircle className="h-6 w-6 text-red-600" />
                          )}
                          <span className="text-xs">Monitored</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <Target className="h-6 w-6 text-blue-600" />
                          <span className="text-xs">Risk: {asset.riskScore}</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <AlertTriangle className="h-6 w-6 text-orange-600" />
                          <span className="text-xs">Violations: {asset.violations}</span>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t flex justify-between items-center">
                        <p className="text-sm text-gray-600">
                          Last Verified: {new Date(asset.lastVerified).toLocaleDateString()}
                        </p>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Settings className="h-4 w-4 mr-1" />
                            Configure
                          </Button>
                          <Button size="sm">
                            <RefreshCw className="h-4 w-4 mr-1" />
                            Reverify
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Security Events */}
        <TabsContent value="events" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Security Events Log</CardTitle>
                  <CardDescription>Real-time zero trust policy enforcement events</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1h">Last Hour</SelectItem>
                      <SelectItem value="24h">Last 24h</SelectItem>
                      <SelectItem value="7d">Last 7 Days</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {securityEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${
                          event.riskLevel === 'critical' ? 'bg-red-100 text-red-600' :
                          event.riskLevel === 'high' ? 'bg-orange-100 text-orange-600' :
                          event.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                          'bg-green-100 text-green-600'
                        }`}>
                          <AlertTriangle className="h-4 w-4" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{event.event}</h4>
                          <p className="text-sm text-gray-600">
                            {event.source} → {event.target}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={`${
                          event.action === 'blocked' ? 'bg-red-100 text-red-800' :
                          event.action === 'monitored' ? 'bg-blue-100 text-blue-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {event.action}
                        </Badge>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(event.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{event.details}</p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>Policy: {event.policy}</span>
                      <span className={getRiskColor(event.riskLevel)}>
                        {event.riskLevel} risk
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Dashboard */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Policy Effectiveness</CardTitle>
                <CardDescription>Success rates by policy category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['Identity', 'Device', 'Network', 'Application', 'Data'].map((category, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{category}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32">
                          <Progress value={95 - idx * 3} />
                        </div>
                        <span className="text-sm text-gray-600 min-w-[3rem] text-right">
                          {95 - idx * 3}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Risk Trend Analysis</CardTitle>
                <CardDescription>Overall security posture over time</CardDescription>
              </CardHeader>
              <CardContent>
                <Alert>
                  <TrendingUp className="h-4 w-4" />
                  <AlertDescription>
                    Zero trust implementation showing 23% improvement in security posture 
                    over the past 30 days with 89% reduction in policy violations.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ZeroTrustManager;