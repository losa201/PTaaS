import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Textarea } from '@/components/ui/textarea';
import { 
  Search, 
  Target, 
  Brain, 
  Shield, 
  AlertTriangle,
  TrendingUp,
  Clock,
  Users,
  Globe,
  Database,
  Activity,
  Zap,
  Eye,
  Filter,
  Download,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ThreatHunt {
  id: string;
  name: string;
  description: string;
  status: 'running' | 'completed' | 'paused' | 'scheduled';
  priority: 'low' | 'medium' | 'high' | 'critical';
  technique: string;
  dataSource: string[];
  progress: number;
  findings: number;
  startTime: string;
  estimatedCompletion: string;
  huntType: 'hypothesis' | 'ioc' | 'behavioral' | 'anomaly';
}

interface Finding {
  id: string;
  huntId: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  confidence: number;
  title: string;
  description: string;
  evidence: string;
  timestamp: string;
  affectedAssets: string[];
  mitreMapping: string[];
  status: 'new' | 'investigating' | 'validated' | 'false_positive';
}

interface HuntQuery {
  id: string;
  name: string;
  query: string;
  dataSource: string;
  category: 'network' | 'endpoint' | 'user' | 'application';
  description: string;
}

const ThreatHunting: React.FC = () => {
  const [activeTab, setActiveTab] = useState('active-hunts');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [huntingMode, setHuntingMode] = useState<'manual' | 'automated'>('manual');

  const [threatHunts, setThreatHunts] = useState<ThreatHunt[]>([
    {
      id: 'hunt-001',
      name: 'APT Lateral Movement Detection',
      description: 'Hunting for signs of lateral movement using WMI and PsExec',
      status: 'running',
      priority: 'high',
      technique: 'T1021.002, T1021.003',
      dataSource: ['Windows Events', 'Network Logs', 'Process Creation'],
      progress: 67,
      findings: 3,
      startTime: '2 hours ago',
      estimatedCompletion: '45 minutes',
      huntType: 'behavioral'
    },
    {
      id: 'hunt-002',
      name: 'Suspicious PowerShell Activity',
      description: 'Detecting obfuscated PowerShell commands and encoded payloads',
      status: 'completed',
      priority: 'medium',
      technique: 'T1059.001',
      dataSource: ['PowerShell Logs', 'Command Line Logs'],
      progress: 100,
      findings: 7,
      startTime: '6 hours ago',
      estimatedCompletion: 'Completed',
      huntType: 'hypothesis'
    },
    {
      id: 'hunt-003',
      name: 'Data Exfiltration Indicators',
      description: 'Looking for unusual data transfer patterns and file compression',
      status: 'paused',
      priority: 'critical',
      technique: 'T1041, T1560',
      dataSource: ['Network Traffic', 'File System Events'],
      progress: 23,
      findings: 12,
      startTime: '1 day ago',
      estimatedCompletion: '2 hours',
      huntType: 'anomaly'
    }
  ]);

  const [findings, setFindings] = useState<Finding[]>([
    {
      id: 'finding-001',
      huntId: 'hunt-001',
      severity: 'high',
      confidence: 85,
      title: 'Suspicious WMI Process Creation',
      description: 'Multiple WMI process creations detected from single source, indicating possible lateral movement',
      evidence: 'wmiprvse.exe spawned 15 processes in 2 minutes from 192.168.1.50',
      timestamp: '30 minutes ago',
      affectedAssets: ['DC01', 'WEB-SRV-02', 'DB-PROD-01'],
      mitreMapping: ['T1021.002'],
      status: 'investigating'
    },
    {
      id: 'finding-002',
      huntId: 'hunt-002',
      severity: 'critical',
      confidence: 92,
      title: 'Base64 Encoded PowerShell Execution',
      description: 'Highly obfuscated PowerShell command detected with base64 encoding and multiple layers',
      evidence: 'powershell.exe -EncodedCommand SQBFAFgAKABOAGUAdwAtAE8AYgBqAGU...',
      timestamp: '4 hours ago',
      affectedAssets: ['WORKSTATION-15'],
      mitreMapping: ['T1059.001', 'T1140'],
      status: 'validated'
    },
    {
      id: 'finding-003',
      huntId: 'hunt-003',
      severity: 'medium',
      confidence: 78,
      title: 'Unusual File Compression Activity',
      description: 'Large volume file compression detected during off-hours',
      evidence: '7zip.exe compressed 2.3GB of sensitive files at 3:47 AM',
      timestamp: '18 hours ago',
      affectedAssets: ['FILE-SRV-01'],
      mitreMapping: ['T1560.001'],
      status: 'new'
    }
  ]);

  const [savedQueries] = useState<HuntQuery[]>([
    {
      id: 'query-001',
      name: 'Suspicious Process Creation',
      query: 'EventID=4688 AND (CommandLine CONTAINS "powershell" OR CommandLine CONTAINS "cmd")',
      dataSource: 'Windows Security Events',
      category: 'endpoint',
      description: 'Detect suspicious process creation with command line analysis'
    },
    {
      id: 'query-002',
      name: 'Failed Authentication Patterns',
      query: 'EventID=4625 AND LogonType=3 AND SubStatus=0xC000006A',
      dataSource: 'Authentication Logs',
      category: 'user',
      description: 'Multiple failed authentication attempts indicating brute force'
    },
    {
      id: 'query-003',
      name: 'Network Beaconing Detection',
      query: 'protocol=tcp AND bytes_out>1024 AND connection_duration>300',
      dataSource: 'Network Flow Logs',
      category: 'network',
      description: 'Detect periodic network connections that may indicate C2 beaconing'
    }
  ]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'scheduled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const startHunt = (huntId: string) => {
    setThreatHunts(prev => prev.map(hunt => 
      hunt.id === huntId ? { ...hunt, status: 'running' as const } : hunt
    ));
  };

  const pauseHunt = (huntId: string) => {
    setThreatHunts(prev => prev.map(hunt => 
      hunt.id === huntId ? { ...hunt, status: 'paused' as const } : hunt
    ));
  };

  // Simulate real-time updates for running hunts
  useEffect(() => {
    const interval = setInterval(() => {
      setThreatHunts(prev => prev.map(hunt => {
        if (hunt.status === 'running' && hunt.progress < 100) {
          const newProgress = Math.min(100, hunt.progress + Math.random() * 5);
          const newFindings = hunt.findings + (Math.random() > 0.8 ? 1 : 0);
          return { ...hunt, progress: newProgress, findings: newFindings };
        }
        return hunt;
      }));
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
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Advanced Threat Hunting
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl">
          Proactive threat hunting with AI-powered analytics, behavioral detection, and 
          automated investigation workflows to uncover hidden threats.
        </p>
      </motion.div>

      {/* Quick Actions Bar */}
      <div className="bg-white rounded-lg border p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search hunts, findings, or techniques..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={filterSeverity} onValueChange={setFilterSeverity}>
              <SelectTrigger className="w-[150px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severity</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Results
            </Button>
            <Button size="sm">
              <Target className="h-4 w-4 mr-2" />
              New Hunt
            </Button>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="active-hunts" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Active Hunts
          </TabsTrigger>
          <TabsTrigger value="findings" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Findings
          </TabsTrigger>
          <TabsTrigger value="hunt-builder" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            Hunt Builder
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="queries" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            Saved Queries
          </TabsTrigger>
        </TabsList>

        {/* Active Hunts */}
        <TabsContent value="active-hunts" className="space-y-6">
          <div className="grid gap-6">
            {threatHunts.map((hunt, index) => (
              <motion.div
                key={hunt.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl mb-2">{hunt.name}</CardTitle>
                        <CardDescription className="text-sm mb-4">
                          {hunt.description}
                        </CardDescription>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            Started {hunt.startTime}
                          </span>
                          <span className="flex items-center gap-1">
                            <Target className="h-4 w-4" />
                            {hunt.technique}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Badge className={getSeverityColor(hunt.priority)}>
                          {hunt.priority}
                        </Badge>
                        <Badge className={getStatusColor(hunt.status)}>
                          {hunt.status}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-4">
                      {/* Progress Bar */}
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">Progress</span>
                          <span className="text-sm text-gray-600">{hunt.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <motion.div
                            className="bg-blue-600 h-2 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${hunt.progress}%` }}
                            transition={{ duration: 0.5 }}
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          Est. completion: {hunt.estimatedCompletion}
                        </p>
                      </div>
                      
                      {/* Data Sources */}
                      <div>
                        <p className="text-sm font-medium mb-2">Data Sources</p>
                        <div className="flex flex-wrap gap-1">
                          {hunt.dataSource.map((source, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {source}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      {/* Stats and Actions */}
                      <div className="flex justify-between items-center pt-4 border-t">
                        <div className="flex items-center gap-6">
                          <div className="text-center">
                            <p className="text-2xl font-bold text-red-600">{hunt.findings}</p>
                            <p className="text-xs text-gray-600">Findings</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold text-blue-600">{hunt.huntType}</p>
                            <p className="text-xs text-gray-600">Hunt Type</p>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          {hunt.status === 'running' ? (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => pauseHunt(hunt.id)}
                            >
                              <Pause className="h-4 w-4 mr-1" />
                              Pause
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => startHunt(hunt.id)}
                            >
                              <Play className="h-4 w-4 mr-1" />
                              Resume
                            </Button>
                          )}
                          <Button size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            View Details
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

        {/* Findings */}
        <TabsContent value="findings" className="space-y-6">
          <div className="grid gap-4">
            {findings.map((finding, index) => (
              <motion.div
                key={finding.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg">{finding.title}</h3>
                          <Badge className={getSeverityColor(finding.severity)}>
                            {finding.severity}
                          </Badge>
                          <Badge variant="outline">
                            Confidence: {finding.confidence}%
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-3">{finding.description}</p>
                        
                        {/* Evidence */}
                        <div className="mb-4">
                          <p className="text-sm font-medium mb-1">Evidence:</p>
                          <div className="bg-gray-100 p-3 rounded font-mono text-sm">
                            {finding.evidence}
                          </div>
                        </div>
                        
                        {/* MITRE Mapping */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          {finding.mitreMapping.map((technique, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {technique}
                            </Badge>
                          ))}
                        </div>
                        
                        {/* Affected Assets */}
                        <div className="mb-4">
                          <p className="text-sm font-medium mb-1">Affected Assets:</p>
                          <div className="flex flex-wrap gap-1">
                            {finding.affectedAssets.map((asset, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {asset}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="ml-6 text-right">
                        <p className="text-sm text-gray-500 mb-2">{finding.timestamp}</p>
                        <Badge 
                          className={
                            finding.status === 'validated' ? 'bg-green-100 text-green-800' :
                            finding.status === 'investigating' ? 'bg-blue-100 text-blue-800' :
                            finding.status === 'false_positive' ? 'bg-gray-100 text-gray-800' :
                            'bg-red-100 text-red-800'
                          }
                        >
                          {finding.status.replace('_', ' ')}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 pt-4 border-t">
                      <Button size="sm" variant="outline">
                        Investigate
                      </Button>
                      <Button size="sm" variant="outline">
                        Mark as False Positive
                      </Button>
                      <Button size="sm">
                        Create Incident
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Hunt Builder */}
        <TabsContent value="hunt-builder" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                AI-Powered Hunt Builder
              </CardTitle>
              <CardDescription>
                Create custom threat hunts using natural language or advanced query builders
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex gap-2 mb-4">
                <Button
                  variant={huntingMode === 'manual' ? 'default' : 'outline'}
                  onClick={() => setHuntingMode('manual')}
                  size="sm"
                >
                  Manual Query
                </Button>
                <Button
                  variant={huntingMode === 'automated' ? 'default' : 'outline'}
                  onClick={() => setHuntingMode('automated')}
                  size="sm"
                >
                  AI Assistant
                </Button>
              </div>

              <AnimatePresence mode="wait">
                {huntingMode === 'automated' ? (
                  <motion.div
                    key="automated"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Describe what you want to hunt for:
                      </label>
                      <Textarea
                        placeholder="e.g., Find signs of credential stuffing attacks against our web applications in the last 24 hours..."
                        className="min-h-[100px]"
                      />
                    </div>
                    
                    <Alert>
                      <Brain className="h-4 w-4" />
                      <AlertDescription>
                        AI will analyze your request and suggest appropriate data sources, 
                        queries, and MITRE ATT&CK techniques to hunt for.
                      </AlertDescription>
                    </Alert>
                  </motion.div>
                ) : (
                  <motion.div
                    key="manual"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="text-sm font-medium mb-2 block">Hunt Name</label>
                      <Input placeholder="Enter hunt name..." />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-2 block">Description</label>
                      <Textarea placeholder="Describe your hunting hypothesis..." />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Priority</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="critical">Critical</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-2 block">Hunt Type</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hypothesis">Hypothesis-driven</SelectItem>
                            <SelectItem value="ioc">IOC-based</SelectItem>
                            <SelectItem value="behavioral">Behavioral</SelectItem>
                            <SelectItem value="anomaly">Anomaly Detection</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-2 block">Query</label>
                      <Textarea
                        placeholder="Enter your hunting query (KQL, SPL, or SQL)..."
                        className="min-h-[120px] font-mono"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              <div className="flex gap-2">
                <Button>
                  <Target className="h-4 w-4 mr-2" />
                  Start Hunt
                </Button>
                <Button variant="outline">
                  Save Draft
                </Button>
                <Button variant="outline">
                  Validate Query
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Hunts</p>
                    <p className="text-3xl font-bold">12</p>
                  </div>
                  <Activity className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Findings</p>
                    <p className="text-3xl font-bold">247</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Success Rate</p>
                    <p className="text-3xl font-bold">87%</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avg Hunt Time</p>
                    <p className="text-3xl font-bold">4.2h</p>
                  </div>
                  <Clock className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Hunt Performance Trends</CardTitle>
              <CardDescription>
                Track the effectiveness of your threat hunting operations over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center text-gray-500">
                📊 Interactive charts showing hunt success rates, finding trends, and performance metrics
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Saved Queries */}
        <TabsContent value="queries" className="space-y-6">
          <div className="grid gap-4">
            {savedQueries.map((query, index) => (
              <motion.div
                key={query.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold">{query.name}</h3>
                          <Badge variant="outline">{query.category}</Badge>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">{query.description}</p>
                        
                        <div className="bg-gray-100 p-3 rounded font-mono text-sm">
                          {query.query}
                        </div>
                        
                        <p className="text-xs text-gray-500 mt-2">
                          Data Source: {query.dataSource}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 pt-4 border-t">
                      <Button size="sm">
                        <Play className="h-4 w-4 mr-1" />
                        Run Query
                      </Button>
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                      <Button size="sm" variant="outline">
                        Create Hunt
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ThreatHunting;