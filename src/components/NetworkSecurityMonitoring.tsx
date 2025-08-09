import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Shield,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  Users,
  Activity,
  Search,
  Filter,
  Download,
  RefreshCw,
  Play,
  Pause,
  StopCircle,
  Eye,
  MessageSquare,
  Phone,
  Mail,
  FileText,
  Calendar,
  MapPin,
  Zap,
  Target,
  Flag,
  AlertCircle,
  CheckCircle,
  XOctagon,
  PlayCircle,
  PauseCircle,
  Settings,
  Plus,
  Minus,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Info,
  AlertOctagon,
  Bell,
  BellRing,
  Siren,
  UserCheck,
  UserX,
  Network,
  Server,
  Database,
  Globe,
  Wifi,
  Lock,
  Unlock,
  Bug,
  Skull,
  Crown,
  Award,
  Star,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  LineChart,
  Gauge,
  Crosshair,
  Radar,
  Microscope,
  GitBranch,
  Layers,
  HardDrive,
  Cpu,
  Timer,
  Workflow
} from 'lucide-react';
import { motion } from 'framer-motion';

interface NetworkEvent {
  id: string;
  timestamp: string;
  source: string;
  destination: string;
  protocol: string;
  port: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  status: 'open' | 'investigating' | 'closed';
  category: string;
  dataVolume: number;
  user?: string;
  application?: string;
  location?: string;
  tags: string[];
}

interface ThreatIntelligenceFeed {
  id: string;
  name: string;
  provider: string;
  description: string;
  lastUpdated: string;
  coverage: string[];
  reliabilityScore: number;
  dataSources: string[];
  tags: string[];
}

interface AnomalyDetectionRule {
  id: string;
  name: string;
  description: string;
  category: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'enabled' | 'disabled';
  criteria: string;
  actions: string[];
  createdBy: string;
  lastModified: string;
  tags: string[];
}

interface NetworkBaseline {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  metrics: string[];
  thresholds: { [metric: string]: { upper: number; lower: number } };
  tags: string[];
}

interface NSMMetrics {
  totalEvents: number;
  highSeverityEvents: number;
  averageDataVolume: number;
  uniqueSources: number;
  uniqueDestinations: number;
  threatFeedsActive: number;
  rulesEnabled: number;
}

const NetworkSecurityMonitoring: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);

  const [networkEvents] = useState<NetworkEvent[]>([
    {
      id: 'net-001',
      timestamp: '2025-08-09T15:42:30Z',
      source: '192.168.1.105',
      destination: '8.8.8.8',
      protocol: 'TCP',
      port: 443,
      severity: 'medium',
      description: 'Outbound connection to public DNS server with unusual data volume',
      status: 'investigating',
      category: 'Network Anomaly',
      dataVolume: 5678234,
      user: 'john.doe',
      application: 'web-browser',
      location: 'Office Network',
      tags: ['dns', 'outbound', 'high_volume']
    },
    {
      id: 'net-002',
      timestamp: '2025-08-09T14:18:12Z',
      source: '10.0.0.55',
      destination: '10.0.0.210',
      protocol: 'UDP',
      port: 53,
      severity: 'low',
      description: 'Internal DNS query with non-standard port usage',
      status: 'open',
      category: 'Network Anomaly',
      dataVolume: 12876,
      user: 'system',
      application: 'dns-service',
      location: 'Data Center',
      tags: ['dns', 'internal', 'non_standard_port']
    },
    {
      id: 'net-003',
      timestamp: '2025-08-09T12:55:48Z',
      source: '203.0.113.45',
      destination: '192.168.1.20',
      protocol: 'TCP',
      port: 80,
      severity: 'high',
      description: 'Inbound connection from known malicious IP address',
      status: 'closed',
      category: 'Threat Intelligence',
      dataVolume: 98345,
      user: 'n/a',
      application: 'n/a',
      location: 'Internet',
      tags: ['malicious_ip', 'inbound', 'http']
    }
  ]);

  const [threatIntelligenceFeeds] = useState<ThreatIntelligenceFeed[]>([
    {
      id: 'feed-001',
      name: 'AlienVault OTX',
      provider: 'AlienVault',
      description: 'Community-driven threat intelligence feed with indicators of compromise',
      lastUpdated: '2025-08-09T16:00:00Z',
      coverage: ['IP Addresses', 'Domains', 'File Hashes'],
      reliabilityScore: 85,
      dataSources: ['OTX Community', 'Honeypots', 'Sandboxes'],
      tags: ['community', 'ioc', 'reputation']
    },
    {
      id: 'feed-002',
      name: 'VirusTotal',
      provider: 'Google',
      description: 'Aggregated malware analysis and URL scanning service',
      lastUpdated: '2025-08-09T15:30:00Z',
      coverage: ['File Hashes', 'URLs', 'Domains'],
      reliabilityScore: 92,
      dataSources: ['AV Engines', 'Sandboxes', 'URL Scanners'],
      tags: ['malware', 'url_scan', 'file_hash']
    }
  ]);

  const [anomalyDetectionRules] = useState<AnomalyDetectionRule[]>([
    {
      id: 'rule-001',
      name: 'High Outbound Data Volume',
      description: 'Alert when outbound data volume exceeds baseline threshold',
      category: 'Data Exfiltration',
      severity: 'high',
      status: 'enabled',
      criteria: 'outbound_data_volume > baseline_threshold',
      actions: ['alert_soc', 'block_destination'],
      createdBy: 'admin',
      lastModified: '2025-08-01T10:00:00Z',
      tags: ['data_exfiltration', 'baseline', 'threshold']
    },
    {
      id: 'rule-002',
      name: 'Suspicious DNS Activity',
      description: 'Detect DNS queries to known malicious domains',
      category: 'Malware Communication',
      severity: 'medium',
      status: 'enabled',
      criteria: 'dns_query IN malicious_domains',
      actions: ['alert_soc', 'quarantine_source'],
      createdBy: 'admin',
      lastModified: '2025-07-25T14:30:00Z',
      tags: ['dns', 'malware', 'threat_intel']
    }
  ]);

  const [networkBaselines] = useState<NetworkBaseline[]>([
    {
      id: 'base-001',
      name: 'Office Network Baseline',
      description: 'Network traffic baseline for the office network',
      createdAt: '2025-07-01T00:00:00Z',
      updatedAt: '2025-08-01T00:00:00Z',
      metrics: ['inbound_data_volume', 'outbound_data_volume', 'unique_destinations'],
      thresholds: {
        inbound_data_volume: { upper: 5000000, lower: 100000 },
        outbound_data_volume: { upper: 7000000, lower: 500000 },
        unique_destinations: { upper: 500, lower: 50 }
      },
      tags: ['office', 'network', 'baseline']
    }
  ]);

  const [nsmMetrics] = useState<NSMMetrics>({
    totalEvents: 124567,
    highSeverityEvents: 345,
    averageDataVolume: 23456,
    uniqueSources: 456,
    uniqueDestinations: 789,
    threatFeedsActive: 5,
    rulesEnabled: 23
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-red-100 text-red-800 border-red-200';
      case 'investigating': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'closed': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 1000);
      }, 30000);

      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const filteredEvents = networkEvents.filter(event => {
    const matchesSearch = event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          event.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          event.destination.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSeverity = selectedSeverity === 'all' || event.severity === selectedSeverity;
    const matchesStatus = selectedStatus === 'all' || event.status === selectedStatus;
    
    return matchesSearch && matchesSeverity && matchesStatus;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Network Security Monitoring
            </h1>
            <p className="text-lg text-gray-600 mt-2">
              Real-time network traffic analysis, threat detection, and anomaly alerting
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={autoRefresh ? 'bg-green-50 border-green-200' : ''}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${autoRefresh ? 'animate-spin' : ''}`} />
              Auto Refresh
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Add New Rule
            </Button>
          </div>
        </div>

        {/* Quick Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Events</p>
                    <p className="text-3xl font-bold text-blue-600">{nsmMetrics.totalEvents.toLocaleString()}</p>
                  </div>
                  <Network className="h-8 w-8 text-blue-600" />
                </div>
                <div className="mt-2">
                  <Badge className="bg-blue-100 text-blue-800">
                    {nsmMetrics.highSeverityEvents} High Severity
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avg. Data Volume</p>
                    <p className="text-3xl font-bold text-purple-600">{nsmMetrics.averageDataVolume} MB</p>
                  </div>
                  <Database className="h-8 w-8 text-purple-600" />
                </div>
                <div className="mt-2">
                  <Progress value={65} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Unique Sources</p>
                    <p className="text-3xl font-bold text-green-600">{nsmMetrics.uniqueSources}</p>
                  </div>
                  <Server className="h-8 w-8 text-green-600" />
                </div>
                <div className="mt-2">
                  <Progress value={80} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Threat Feeds Active</p>
                    <p className="text-3xl font-bold text-red-600">{nsmMetrics.threatFeedsActive}</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                </div>
                <div className="mt-2">
                  <Progress value={nsmMetrics.threatFeedsActive * 20} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="events" className="flex items-center gap-2">
            <Network className="h-4 w-4" />
            Network Events
          </TabsTrigger>
          <TabsTrigger value="threats" className="flex items-center gap-2">
            <Skull className="h-4 w-4" />
            Threat Intelligence
          </TabsTrigger>
          <TabsTrigger value="rules" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Detection Rules
          </TabsTrigger>
        </TabsList>

        {/* Dashboard Overview */}
        <TabsContent value="dashboard" className="space-y-6">
          {/* Network Event Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Network Event Summary
              </CardTitle>
              <CardDescription>Overview of recent network activity and event distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{nsmMetrics.totalEvents.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Total Events</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-orange-600">{nsmMetrics.uniqueSources}</p>
                  <p className="text-sm text-gray-600">Unique Sources</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">{nsmMetrics.uniqueDestinations}</p>
                  <p className="text-sm text-gray-600">Unique Destinations</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Threat Intelligence Feeds */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Active Threat Intelligence Feeds
              </CardTitle>
              <CardDescription>Status and coverage of active threat intelligence feeds</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {threatIntelligenceFeeds.map(feed => (
                  <div key={feed.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{feed.name}</p>
                      <p className="text-sm text-gray-600">{feed.provider}</p>
                    </div>
                    <Badge variant="secondary">{feed.coverage.length} Coverage Areas</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Network Events */}
        <TabsContent value="events" className="space-y-6">
          {/* Search and Filter Controls */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search network events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severity</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="investigating">Investigating</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Network Events List */}
          <div className="grid gap-6">
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`border-l-4 ${
                  event.severity === 'critical' ? 'border-l-red-500' :
                  event.severity === 'high' ? 'border-l-orange-500' :
                  event.severity === 'medium' ? 'border-l-yellow-500' :
                  'border-l-green-500'
                }`}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <CardTitle className="text-lg">{event.description}</CardTitle>
                          <Badge className={getSeverityColor(event.severity)}>
                            {event.severity}
                          </Badge>
                          <Badge className={getStatusColor(event.status)}>
                            {event.status}
                          </Badge>
                        </div>
                        <CardDescription className="mb-2">
                          Source: {event.source} - Destination: {event.destination}
                        </CardDescription>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>Protocol: {event.protocol}</span>
                          <span>Port: {event.port}</span>
                          <span>Data Volume: {event.dataVolume}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-red-600 mb-1">
                          {event.severity === 'critical' ? 'High Risk' : 'Moderate Risk'}
                        </div>
                        <p className="text-xs text-gray-600">Risk Level</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Additional Event Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium">User</p>
                        <p className="text-gray-600">{event.user || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="font-medium">Application</p>
                        <p className="text-gray-600">{event.application || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="font-medium">Location</p>
                        <p className="text-gray-600">{event.location || 'N/A'}</p>
                      </div>
                    </div>

                    {/* Tags */}
                    <div>
                      <p className="font-medium text-sm mb-2">Tags</p>
                      <div className="flex flex-wrap gap-2">
                        {event.tags.map((tag, idx) => (
                          <Badge key={idx} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">
                          Last updated: {Math.floor(Math.random() * 30)} minutes ago
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                        <Button size="sm">
                          <PlayCircle className="h-4 w-4 mr-2" />
                          Take Action
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Threat Intelligence */}
        <TabsContent value="threats" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Skull className="h-5 w-5" />
                Threat Intelligence Feeds
              </CardTitle>
              <CardDescription>Manage and monitor active threat intelligence feeds</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {threatIntelligenceFeeds.map(feed => (
                  <div key={feed.id} className="border rounded-md p-4">
                    <div className="flex justify-between items-center mb-2">
                      <p className="font-medium text-lg">{feed.name}</p>
                      <Badge variant="outline">Reliability: {feed.reliabilityScore}%</Badge>
                    </div>
                    <p className="text-sm text-gray-600">{feed.description}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <span>Provider: {feed.provider}</span>
                      <span>Last Updated: {new Date(feed.lastUpdated).toLocaleString()}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {feed.coverage.map((coverage, idx) => (
                        <Badge key={idx} variant="secondary">{coverage}</Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Detection Rules */}
        <TabsContent value="rules" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Anomaly Detection Rules
              </CardTitle>
              <CardDescription>Configure and manage anomaly detection rules for network traffic</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {anomalyDetectionRules.map(rule => (
                  <div key={rule.id} className="border rounded-md p-4">
                    <div className="flex justify-between items-center mb-2">
                      <p className="font-medium text-lg">{rule.name}</p>
                      <Badge className={getSeverityColor(rule.severity)}>{rule.severity}</Badge>
                    </div>
                    <p className="text-sm text-gray-600">{rule.description}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <span>Category: {rule.category}</span>
                      <span>Status: {rule.status}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {rule.tags.map((tag, idx) => (
                        <Badge key={idx} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NetworkSecurityMonitoring;
