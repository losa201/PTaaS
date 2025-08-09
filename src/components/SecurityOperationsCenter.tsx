import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield, AlertTriangle, Activity, Users, Server, Globe, 
  Clock, TrendingUp, Eye, Target, Zap, Brain, Lock,
  MonitorSpeaker, Search, Filter, MoreVertical, Play,
  Pause, RefreshCw, Download, Upload, Settings, Bell,
  CheckCircle, XCircle, AlertCircle, Info, ChevronRight,
  BarChart3, LineChart, PieChart, Map, Network, Cpu
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

// Types and Interfaces
interface SecurityAlert {
  id: string;
  timestamp: Date;
  severity: 'critical' | 'high' | 'medium' | 'low' | 'info';
  category: string;
  title: string;
  description: string;
  source: string;
  affected_assets: string[];
  status: 'new' | 'investigating' | 'contained' | 'resolved' | 'false_positive';
  assigned_analyst: string;
  tactics: string[];
  techniques: string[];
  indicators: IOC[];
  risk_score: number;
}

interface IOC {
  type: 'ip' | 'domain' | 'hash' | 'url' | 'email' | 'file';
  value: string;
  confidence: number;
  threat_types: string[];
}

interface SOCMetric {
  id: string;
  name: string;
  current_value: number;
  previous_value: number;
  target_value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  category: 'performance' | 'security' | 'efficiency' | 'quality';
}

interface AnalystWorkload {
  analyst_id: string;
  name: string;
  status: 'available' | 'busy' | 'away' | 'offline';
  active_cases: number;
  avg_resolution_time: number;
  skill_areas: string[];
  current_shift: string;
  performance_score: number;
}

interface ThreatFeed {
  id: string;
  name: string;
  provider: string;
  type: 'commercial' | 'open_source' | 'government' | 'community';
  status: 'active' | 'inactive' | 'error';
  last_updated: Date;
  indicators_count: number;
  quality_score: number;
}

interface SOCPlaybook {
  id: string;
  name: string;
  category: string;
  trigger_conditions: string[];
  automated_actions: string[];
  manual_steps: string[];
  estimated_time: number;
  success_rate: number;
  last_executed: Date;
}

const SecurityOperationsCenter: React.FC = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState<string>('24h');
  const [alertFilter, setAlertFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isMonitoring, setIsMonitoring] = useState<boolean>(true);
  const [refreshInterval, setRefreshInterval] = useState<number>(30);
  const [selectedAlert, setSelectedAlert] = useState<SecurityAlert | null>(null);

  // Mock data
  const [securityAlerts] = useState<SecurityAlert[]>([
    {
      id: 'ALT-001',
      timestamp: new Date('2024-01-15T14:23:00Z'),
      severity: 'critical',
      category: 'Malware Detection',
      title: 'Advanced Persistent Threat Detected',
      description: 'Sophisticated malware with C2 communication identified on critical server',
      source: 'EDR-PROD-01',
      affected_assets: ['SRV-DB-001', 'SRV-WEB-003'],
      status: 'investigating',
      assigned_analyst: 'analyst_002',
      tactics: ['Initial Access', 'Persistence', 'Command and Control'],
      techniques: ['T1566.001', 'T1053.005', 'T1071.001'],
      indicators: [
        { type: 'ip', value: '192.168.1.100', confidence: 95, threat_types: ['C2'] },
        { type: 'hash', value: 'abc123def456', confidence: 98, threat_types: ['Malware'] }
      ],
      risk_score: 9.2
    },
    {
      id: 'ALT-002', 
      timestamp: new Date('2024-01-15T13:45:00Z'),
      severity: 'high',
      category: 'Anomalous Behavior',
      title: 'Unusual Admin Account Activity',
      description: 'Admin account accessing systems outside normal patterns',
      source: 'SIEM-CENTRAL',
      affected_assets: ['AD-CONTROLLER-01'],
      status: 'new',
      assigned_analyst: 'analyst_001',
      tactics: ['Privilege Escalation', 'Lateral Movement'],
      techniques: ['T1078.003', 'T1021.001'],
      indicators: [
        { type: 'domain', value: 'suspicious-domain.com', confidence: 87, threat_types: ['Phishing'] }
      ],
      risk_score: 7.8
    }
  ]);

  const [socMetrics] = useState<SOCMetric[]>([
    { id: 'mtdr', name: 'Mean Time to Detection', current_value: 4.2, previous_value: 5.1, target_value: 3.0, unit: 'hours', trend: 'down', category: 'performance' },
    { id: 'mttr', name: 'Mean Time to Response', current_value: 2.8, previous_value: 3.2, target_value: 2.0, unit: 'hours', trend: 'down', category: 'performance' },
    { id: 'alert_volume', name: 'Daily Alert Volume', current_value: 1247, previous_value: 1156, target_value: 1000, unit: 'alerts', trend: 'up', category: 'security' },
    { id: 'false_positive_rate', name: 'False Positive Rate', current_value: 12.4, previous_value: 15.2, target_value: 10.0, unit: '%', trend: 'down', category: 'quality' }
  ]);

  const [analystWorkload] = useState<AnalystWorkload[]>([
    { analyst_id: 'analyst_001', name: 'Sarah Chen', status: 'busy', active_cases: 8, avg_resolution_time: 2.4, skill_areas: ['Malware Analysis', 'Incident Response'], current_shift: 'Day Shift', performance_score: 94 },
    { analyst_id: 'analyst_002', name: 'Mike Rodriguez', status: 'available', active_cases: 3, avg_resolution_time: 1.8, skill_areas: ['Network Security', 'Threat Hunting'], current_shift: 'Day Shift', performance_score: 89 },
    { analyst_id: 'analyst_003', name: 'Alex Kim', status: 'busy', active_cases: 6, avg_resolution_time: 3.1, skill_areas: ['Digital Forensics', 'Reverse Engineering'], current_shift: 'Night Shift', performance_score: 91 }
  ]);

  const [threatFeeds] = useState<ThreatFeed[]>([
    { id: 'feed_001', name: 'Commercial Threat Intel', provider: 'CrowdStrike', type: 'commercial', status: 'active', last_updated: new Date(), indicators_count: 15420, quality_score: 96 },
    { id: 'feed_002', name: 'MISP Community', provider: 'MISP Project', type: 'community', status: 'active', last_updated: new Date(), indicators_count: 8931, quality_score: 87 },
    { id: 'feed_003', name: 'Government CTI', provider: 'US-CERT', type: 'government', status: 'active', last_updated: new Date(), indicators_count: 3247, quality_score: 92 }
  ]);

  const [socPlaybooks] = useState<SOCPlaybook[]>([
    { id: 'pb_001', name: 'Malware Incident Response', category: 'Incident Response', trigger_conditions: ['Malware Detection'], automated_actions: ['Isolate Host', 'Collect Artifacts'], manual_steps: ['Analyze Malware', 'Threat Hunting'], estimated_time: 120, success_rate: 94, last_executed: new Date() },
    { id: 'pb_002', name: 'Phishing Investigation', category: 'Email Security', trigger_conditions: ['Suspicious Email'], automated_actions: ['Block Sender', 'Quarantine Email'], manual_steps: ['URL Analysis', 'User Education'], estimated_time: 45, success_rate: 89, last_executed: new Date() }
  ]);

  // Real-time monitoring simulation
  useEffect(() => {
    if (!isMonitoring) return;

    const interval = setInterval(() => {
      // Simulate real-time updates
    }, refreshInterval * 1000);

    return () => clearInterval(interval);
  }, [isMonitoring, refreshInterval]);

  // Filtered alerts
  const filteredAlerts = useMemo(() => {
    return securityAlerts.filter(alert => {
      const matchesFilter = alertFilter === 'all' || alert.severity === alertFilter;
      const matchesSearch = searchTerm === '' || 
        alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alert.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [securityAlerts, alertFilter, searchTerm]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <XCircle className="h-4 w-4" />;
      case 'high': return <AlertTriangle className="h-4 w-4" />;
      case 'medium': return <AlertCircle className="h-4 w-4" />;
      case 'low': return <Info className="h-4 w-4" />;
      default: return <CheckCircle className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new': return <Badge variant="destructive">New</Badge>;
      case 'investigating': return <Badge variant="default" className="bg-orange-500">Investigating</Badge>;
      case 'contained': return <Badge variant="default" className="bg-blue-500">Contained</Badge>;
      case 'resolved': return <Badge variant="default" className="bg-green-500">Resolved</Badge>;
      case 'false_positive': return <Badge variant="secondary">False Positive</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-600 rounded-xl shadow-lg">
              <MonitorSpeaker className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Security Operations Center</h1>
              <p className="text-gray-600">Enterprise SOC with real-time threat monitoring and response</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1h">Last Hour</SelectItem>
                <SelectItem value="24h">Last 24h</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant={isMonitoring ? "default" : "outline"}
              onClick={() => setIsMonitoring(!isMonitoring)}
              className="flex items-center gap-2"
            >
              {isMonitoring ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {isMonitoring ? 'Monitoring' : 'Paused'}
            </Button>

            <Button variant="outline" size="icon">
              <RefreshCw className="h-4 w-4" />
            </Button>

            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>

        {/* Key Metrics Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {socMetrics.map((metric) => (
            <Card key={metric.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-600">{metric.name}</h3>
                  <div className={`flex items-center gap-1 text-sm ${
                    metric.trend === 'up' ? 'text-green-600' : 
                    metric.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    <TrendingUp className="h-3 w-3" />
                    {metric.trend === 'up' ? '↗' : metric.trend === 'down' ? '↙' : '→'}
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-gray-900">
                    {metric.current_value}
                  </span>
                  <span className="text-sm text-gray-500">{metric.unit}</span>
                </div>
                <div className="mt-2">
                  <Progress 
                    value={(metric.current_value / metric.target_value) * 100} 
                    className="h-2"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Target: {metric.target_value} {metric.unit}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Main SOC Interface */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs defaultValue="alerts" className="space-y-4">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="alerts">Security Alerts</TabsTrigger>
              <TabsTrigger value="analysts">Analyst Workload</TabsTrigger>
              <TabsTrigger value="intelligence">Threat Intelligence</TabsTrigger>
              <TabsTrigger value="playbooks">Playbooks</TabsTrigger>
              <TabsTrigger value="monitoring">Asset Monitoring</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>

            {/* Security Alerts Tab */}
            <TabsContent value="alerts" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-red-600" />
                        Active Security Alerts
                      </CardTitle>
                      <CardDescription>
                        Real-time security alerts from across your infrastructure
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          placeholder="Search alerts..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 w-64"
                        />
                      </div>
                      <Select value={alertFilter} onValueChange={setAlertFilter}>
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Severities</SelectItem>
                          <SelectItem value="critical">Critical</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <AnimatePresence>
                      {filteredAlerts.map((alert) => (
                        <motion.div
                          key={alert.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          className={`p-4 rounded-lg border cursor-pointer hover:shadow-md transition-shadow ${getSeverityColor(alert.severity)}`}
                          onClick={() => setSelectedAlert(alert)}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3 flex-1">
                              <div className="flex items-center gap-2">
                                {getSeverityIcon(alert.severity)}
                                <Badge variant="outline" className="text-xs">
                                  {alert.category}
                                </Badge>
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold text-gray-900 mb-1">{alert.title}</h4>
                                <p className="text-sm text-gray-600 mb-2">{alert.description}</p>
                                <div className="flex items-center gap-4 text-xs text-gray-500">
                                  <span className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {alert.timestamp.toLocaleString()}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Server className="h-3 w-3" />
                                    {alert.affected_assets.length} assets
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Target className="h-3 w-3" />
                                    Risk: {alert.risk_score}/10
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {getStatusBadge(alert.status)}
                              <Button variant="ghost" size="sm">
                                <ChevronRight className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Analyst Workload Tab */}
            <TabsContent value="analysts" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    SOC Analyst Dashboard
                  </CardTitle>
                  <CardDescription>
                    Monitor analyst workload and performance metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {analystWorkload.map((analyst) => (
                      <Card key={analyst.analyst_id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="font-semibold text-gray-900">{analyst.name}</h3>
                            <Badge 
                              variant={analyst.status === 'available' ? 'default' : 'secondary'}
                              className={
                                analyst.status === 'available' ? 'bg-green-500' :
                                analyst.status === 'busy' ? 'bg-orange-500' :
                                analyst.status === 'away' ? 'bg-yellow-500' : 'bg-gray-500'
                              }
                            >
                              {analyst.status}
                            </Badge>
                          </div>
                          
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Active Cases:</span>
                              <span className="font-medium">{analyst.active_cases}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Avg Resolution:</span>
                              <span className="font-medium">{analyst.avg_resolution_time}h</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Performance:</span>
                              <span className="font-medium">{analyst.performance_score}%</span>
                            </div>
                          </div>

                          <div className="mt-3">
                            <Progress value={analyst.performance_score} className="h-2" />
                          </div>

                          <div className="mt-3">
                            <p className="text-xs text-gray-500 mb-1">Skills:</p>
                            <div className="flex flex-wrap gap-1">
                              {analyst.skill_areas.map((skill) => (
                                <Badge key={skill} variant="outline" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Threat Intelligence Tab */}
            <TabsContent value="intelligence" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-purple-600" />
                    Threat Intelligence Feeds
                  </CardTitle>
                  <CardDescription>
                    Monitor and manage threat intelligence data sources
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {threatFeeds.map((feed) => (
                      <div key={feed.id} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-sm transition-shadow">
                        <div className="flex items-center gap-4">
                          <div className={`h-3 w-3 rounded-full ${
                            feed.status === 'active' ? 'bg-green-500' : 
                            feed.status === 'inactive' ? 'bg-yellow-500' : 'bg-red-500'
                          }`} />
                          <div>
                            <h4 className="font-semibold text-gray-900">{feed.name}</h4>
                            <p className="text-sm text-gray-600">{feed.provider}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="text-center">
                            <p className="font-medium text-gray-900">{feed.indicators_count.toLocaleString()}</p>
                            <p className="text-xs">Indicators</p>
                          </div>
                          <div className="text-center">
                            <p className="font-medium text-gray-900">{feed.quality_score}%</p>
                            <p className="text-xs">Quality</p>
                          </div>
                          <Badge variant="outline">{feed.type}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Playbooks Tab */}
            <TabsContent value="playbooks" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-green-600" />
                    Security Playbooks
                  </CardTitle>
                  <CardDescription>
                    Automated response workflows and procedures
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {socPlaybooks.map((playbook) => (
                      <Card key={playbook.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="font-semibold text-gray-900">{playbook.name}</h3>
                            <Badge variant="outline">{playbook.category}</Badge>
                          </div>

                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Success Rate:</span>
                              <span className="font-medium">{playbook.success_rate}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Est. Time:</span>
                              <span className="font-medium">{playbook.estimated_time}min</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Auto Actions:</span>
                              <span className="font-medium">{playbook.automated_actions.length}</span>
                            </div>
                          </div>

                          <div className="mt-3">
                            <Progress value={playbook.success_rate} className="h-2" />
                          </div>

                          <div className="mt-3 flex gap-2">
                            <Button size="sm" variant="outline">
                              <Play className="h-3 w-3 mr-1" />
                              Execute
                            </Button>
                            <Button size="sm" variant="outline">
                              <Settings className="h-3 w-3 mr-1" />
                              Configure
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Asset Monitoring Tab */}
            <TabsContent value="monitoring" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-indigo-600" />
                    Infrastructure Monitoring
                  </CardTitle>
                  <CardDescription>
                    Real-time monitoring of critical infrastructure components
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertTitle>Real-time Asset Monitoring</AlertTitle>
                    <AlertDescription>
                      Monitoring 247 assets across 12 network segments. All systems operational.
                    </AlertDescription>
                  </Alert>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <Card className="bg-green-50 border-green-200">
                      <CardContent className="p-4 text-center">
                        <Server className="h-8 w-8 mx-auto text-green-600 mb-2" />
                        <h3 className="font-semibold text-green-900">Servers</h3>
                        <p className="text-2xl font-bold text-green-700">247</p>
                        <p className="text-sm text-green-600">Online</p>
                      </CardContent>
                    </Card>

                    <Card className="bg-blue-50 border-blue-200">
                      <CardContent className="p-4 text-center">
                        <Network className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                        <h3 className="font-semibold text-blue-900">Network Devices</h3>
                        <p className="text-2xl font-bold text-blue-700">89</p>
                        <p className="text-sm text-blue-600">Active</p>
                      </CardContent>
                    </Card>

                    <Card className="bg-purple-50 border-purple-200">
                      <CardContent className="p-4 text-center">
                        <Cpu className="h-8 w-8 mx-auto text-purple-600 mb-2" />
                        <h3 className="font-semibold text-purple-900">Endpoints</h3>
                        <p className="text-2xl font-bold text-purple-700">1,547</p>
                        <p className="text-sm text-purple-600">Protected</p>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Reports Tab */}
            <TabsContent value="reports" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-orange-600" />
                    SOC Reports & Analytics
                  </CardTitle>
                  <CardDescription>
                    Generate comprehensive security operations reports
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
                      <BarChart3 className="h-6 w-6" />
                      <span>Daily SOC Report</span>
                    </Button>
                    
                    <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
                      <LineChart className="h-6 w-6" />
                      <span>Trend Analysis</span>
                    </Button>

                    <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
                      <PieChart className="h-6 w-6" />
                      <span>Threat Breakdown</span>
                    </Button>

                    <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
                      <Users className="h-6 w-6" />
                      <span>Analyst Performance</span>
                    </Button>

                    <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
                      <Activity className="h-6 w-6" />
                      <span>System Health</span>
                    </Button>

                    <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
                      <Download className="h-6 w-6" />
                      <span>Export Data</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default SecurityOperationsCenter;