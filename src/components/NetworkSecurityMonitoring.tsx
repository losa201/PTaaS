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
  Network,
  Shield,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Activity,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  LineChart,
  Search,
  Filter,
  Download,
  RefreshCw,
  Play,
  Pause,
  Stop,
  Eye,
  Settings,
  MapPin,
  Globe,
  Wifi,
  Server,
  Database,
  Router,
  Smartphone,
  Monitor,
  HardDrive,
  Cpu,
  MemoryStick,
  Zap,
  Target,
  Crosshair,
  Radar,
  Gauge,
  Timer,
  Clock,
  Calendar,
  Users,
  UserCheck,
  UserX,
  Lock,
  Unlock,
  Key,
  ShieldCheck,
  ShieldX,
  ShieldAlert,
  AlertCircle,
  Info,
  Warning,
  Bell,
  BellRing,
  Flame,
  Bug,
  Skull,
  Crown,
  Flag,
  Star,
  Award,
  Plus,
  Minus,
  ArrowUp,
  ArrowDown,
  ArrowRight,
  ArrowLeft,
  ExternalLink,
  Link2,
  GitBranch,
  Layers,
  Workflow,
  Microscope,
  ScanLine,
  Terminal,
  Code,
  FileText,
  Mail,
  Phone,
  MessageSquare
} from 'lucide-react';
import { motion } from 'framer-motion';

interface NetworkDevice {
  id: string;
  name: string;
  type: 'router' | 'switch' | 'firewall' | 'server' | 'workstation' | 'mobile' | 'iot' | 'unknown';
  ipAddress: string;
  macAddress: string;
  vendor: string;
  model?: string;
  operatingSystem?: string;
  location: string;
  status: 'online' | 'offline' | 'unknown';
  lastSeen: string;
  riskScore: number;
  vulnerabilityCount: number;
  openPorts: Port[];
  networkSegment: string;
  owner?: string;
  businessCriticality: 'critical' | 'high' | 'medium' | 'low';
}

interface Port {
  number: number;
  protocol: 'tcp' | 'udp';
  service: string;
  version?: string;
  state: 'open' | 'closed' | 'filtered';
  riskLevel: 'critical' | 'high' | 'medium' | 'low';
}

interface NetworkTraffic {
  id: string;
  timestamp: string;
  sourceIp: string;
  destinationIp: string;
  sourcePort: number;
  destinationPort: number;
  protocol: string;
  bytesTransferred: number;
  duration: number;
  classification: 'normal' | 'suspicious' | 'malicious' | 'unknown';
  severity: 'low' | 'medium' | 'high' | 'critical';
  alertTriggered: boolean;
  description?: string;
  mitreTactic?: string;
  blocked: boolean;
}

interface SecurityAlert {
  id: string;
  timestamp: string;
  type: 'intrusion_attempt' | 'malware_communication' | 'data_exfiltration' | 'brute_force' | 'dos_attack' | 'policy_violation' | 'anomaly';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  sourceIp: string;
  destinationIp?: string;
  affectedDevice: string;
  ruleId?: string;
  signature?: string;
  confidence: number;
  status: 'new' | 'investigating' | 'resolved' | 'false_positive';
  assignedTo?: string;
  actions: string[];
  evidence: string[];
  relatedAlerts: string[];
}

interface NetworkSegment {
  id: string;
  name: string;
  cidr: string;
  vlan?: number;
  description: string;
  securityZone: 'dmz' | 'internal' | 'guest' | 'management' | 'critical';
  deviceCount: number;
  trafficVolume: number; // MB/day
  threatLevel: 'low' | 'medium' | 'high' | 'critical';
  firewallRules: number;
  accessControlEnabled: boolean;
  monitoringEnabled: boolean;
}

interface ThreatIndicator {
  id: string;
  type: 'ip' | 'domain' | 'url' | 'hash' | 'email';
  value: string;
  category: 'malware' | 'phishing' | 'c2' | 'botnet' | 'apt' | 'spam';
  threatLevel: 'low' | 'medium' | 'high' | 'critical';
  confidence: number;
  source: string;
  firstSeen: string;
  lastSeen: string;
  detections: number;
  description: string;
  tags: string[];
}

interface BandwidthUsage {
  timestamp: string;
  inbound: number; // Mbps
  outbound: number; // Mbps
  internal: number; // Mbps
  total: number; // Mbps
}

interface NetworkMetrics {
  totalDevices: number;
  activeDevices: number;
  offlineDevices: number;
  criticalAlerts: number;
  highAlerts: number;
  mediumAlerts: number;
  lowAlerts: number;
  bandwidthUtilization: number;
  threatsBlocked: number;
  policyViolations: number;
  anomalyDetections: number;
  meanTimeToDetect: number; // minutes
  meanTimeToResolve: number; // minutes
  networkUptime: number; // percentage
}

const NetworkSecurityMonitoring: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSegment, setSelectedSegment] = useState('all');
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);

  const [networkMetrics] = useState<NetworkMetrics>({
    totalDevices: 1247,
    activeDevices: 1189,
    offlineDevices: 58,
    criticalAlerts: 7,
    highAlerts: 23,
    mediumAlerts: 89,
    lowAlerts: 234,
    bandwidthUtilization: 68.4,
    threatsBlocked: 1567,
    policyViolations: 45,
    anomalyDetections: 12,
    meanTimeToDetect: 4.7,
    meanTimeToResolve: 18.3,
    networkUptime: 99.97
  });

  const [networkDevices] = useState<NetworkDevice[]>([
    {
      id: 'dev-001',
      name: 'Core Switch 01',
      type: 'switch',
      ipAddress: '10.1.1.1',
      macAddress: '00:1B:44:11:3A:B7',
      vendor: 'Cisco',
      model: 'Catalyst 9300',
      location: 'Data Center A',
      status: 'online',
      lastSeen: '2025-08-09T14:30:00Z',
      riskScore: 15,
      vulnerabilityCount: 0,
      openPorts: [
        { number: 22, protocol: 'tcp', service: 'SSH', state: 'open', riskLevel: 'medium' },
        { number: 23, protocol: 'tcp', service: 'Telnet', state: 'open', riskLevel: 'high' },
        { number: 443, protocol: 'tcp', service: 'HTTPS', state: 'open', riskLevel: 'low' }
      ],
      networkSegment: 'management',
      owner: 'Network Team',
      businessCriticality: 'critical'
    },
    {
      id: 'dev-002',
      name: 'Firewall-DMZ-01',
      type: 'firewall',
      ipAddress: '10.2.1.1',
      macAddress: '00:1B:44:11:3A:C8',
      vendor: 'Palo Alto',
      model: 'PA-3220',
      location: 'DMZ',
      status: 'online',
      lastSeen: '2025-08-09T14:29:00Z',
      riskScore: 25,
      vulnerabilityCount: 2,
      openPorts: [
        { number: 443, protocol: 'tcp', service: 'HTTPS', state: 'open', riskLevel: 'low' },
        { number: 22, protocol: 'tcp', service: 'SSH', state: 'open', riskLevel: 'medium' }
      ],
      networkSegment: 'dmz',
      owner: 'Security Team',
      businessCriticality: 'critical'
    },
    {
      id: 'dev-003',
      name: 'Workstation-Marketing-15',
      type: 'workstation',
      ipAddress: '10.3.2.45',
      macAddress: '00:1B:44:11:3A:D9',
      vendor: 'Dell',
      model: 'OptiPlex 7090',
      operatingSystem: 'Windows 11 Pro',
      location: 'Office Floor 3',
      status: 'online',
      lastSeen: '2025-08-09T14:25:00Z',
      riskScore: 67,
      vulnerabilityCount: 8,
      openPorts: [
        { number: 135, protocol: 'tcp', service: 'RPC', state: 'open', riskLevel: 'medium' },
        { number: 445, protocol: 'tcp', service: 'SMB', state: 'open', riskLevel: 'high' }
      ],
      networkSegment: 'internal',
      owner: 'Marketing Department',
      businessCriticality: 'medium'
    },
    {
      id: 'dev-004',
      name: 'Unknown-IoT-Device',
      type: 'iot',
      ipAddress: '10.3.5.127',
      macAddress: '00:1B:44:11:3A:EA',
      vendor: 'Unknown',
      location: 'Conference Room B',
      status: 'online',
      lastSeen: '2025-08-09T14:20:00Z',
      riskScore: 89,
      vulnerabilityCount: 15,
      openPorts: [
        { number: 80, protocol: 'tcp', service: 'HTTP', state: 'open', riskLevel: 'medium' },
        { number: 23, protocol: 'tcp', service: 'Telnet', state: 'open', riskLevel: 'critical' }
      ],
      networkSegment: 'guest',
      businessCriticality: 'low'
    }
  ]);

  const [securityAlerts] = useState<SecurityAlert[]>([
    {
      id: 'alert-001',
      timestamp: '2025-08-09T14:28:15Z',
      type: 'malware_communication',
      severity: 'critical',
      title: 'Malware C2 Communication Detected',
      description: 'Workstation attempting to communicate with known malware command and control server',
      sourceIp: '10.3.2.45',
      destinationIp: '185.159.158.234',
      affectedDevice: 'Workstation-Marketing-15',
      ruleId: 'IDS-2024-089',
      signature: 'ET MALWARE Suspicious outbound connection to known C2',
      confidence: 94,
      status: 'new',
      actions: ['Block destination IP', 'Isolate source device', 'Initiate incident response'],
      evidence: ['Network traffic logs', 'DNS query logs', 'Process execution logs'],
      relatedAlerts: []
    },
    {
      id: 'alert-002',
      timestamp: '2025-08-09T14:15:42Z',
      type: 'brute_force',
      severity: 'high',
      title: 'SSH Brute Force Attack Detected',
      description: 'Multiple failed SSH login attempts from external IP address',
      sourceIp: '203.0.113.45',
      destinationIp: '10.1.1.1',
      affectedDevice: 'Core Switch 01',
      ruleId: 'IDS-2024-012',
      confidence: 87,
      status: 'investigating',
      assignedTo: 'SOC Team',
      actions: ['Block source IP', 'Review SSH access logs', 'Notify system administrator'],
      evidence: ['Authentication logs', 'Network connection logs'],
      relatedAlerts: ['alert-003']
    },
    {
      id: 'alert-003',
      timestamp: '2025-08-09T13:45:18Z',
      type: 'policy_violation',
      severity: 'medium',
      title: 'Unauthorized Protocol Usage',
      description: 'Telnet protocol detected on network - violates security policy',
      sourceIp: '10.3.5.127',
      affectedDevice: 'Unknown-IoT-Device',
      ruleId: 'POL-2024-003',
      confidence: 100,
      status: 'new',
      actions: ['Disable telnet service', 'Review device configuration', 'Update security policy'],
      evidence: ['Network traffic analysis', 'Protocol usage logs'],
      relatedAlerts: []
    },
    {
      id: 'alert-004',
      timestamp: '2025-08-09T12:30:05Z',
      type: 'anomaly',
      severity: 'low',
      title: 'Unusual Bandwidth Usage Pattern',
      description: 'Significant increase in outbound traffic from marketing department',
      sourceIp: '10.3.2.0/24',
      affectedDevice: 'Marketing Network Segment',
      confidence: 73,
      status: 'resolved',
      assignedTo: 'Network Team',
      actions: ['Monitor traffic patterns', 'Investigate large file transfers'],
      evidence: ['Bandwidth monitoring logs', 'NetFlow data'],
      relatedAlerts: []
    }
  ]);

  const [networkSegments] = useState<NetworkSegment[]>([
    {
      id: 'seg-001',
      name: 'DMZ',
      cidr: '10.2.0.0/16',
      vlan: 200,
      description: 'Demilitarized zone for public-facing services',
      securityZone: 'dmz',
      deviceCount: 23,
      trafficVolume: 850,
      threatLevel: 'high',
      firewallRules: 45,
      accessControlEnabled: true,
      monitoringEnabled: true
    },
    {
      id: 'seg-002',
      name: 'Internal Corporate',
      cidr: '10.3.0.0/16',
      vlan: 300,
      description: 'Internal corporate network for employees',
      securityZone: 'internal',
      deviceCount: 892,
      trafficVolume: 2340,
      threatLevel: 'medium',
      firewallRules: 127,
      accessControlEnabled: true,
      monitoringEnabled: true
    },
    {
      id: 'seg-003',
      name: 'Guest Network',
      cidr: '10.4.0.0/16',
      vlan: 400,
      description: 'Guest and visitor network access',
      securityZone: 'guest',
      deviceCount: 156,
      trafficVolume: 420,
      threatLevel: 'high',
      firewallRules: 23,
      accessControlEnabled: true,
      monitoringEnabled: true
    },
    {
      id: 'seg-004',
      name: 'Management',
      cidr: '10.1.0.0/16',
      vlan: 100,
      description: 'Network infrastructure management',
      securityZone: 'management',
      deviceCount: 34,
      trafficVolume: 125,
      threatLevel: 'medium',
      firewallRules: 67,
      accessControlEnabled: true,
      monitoringEnabled: true
    }
  ]);

  const [threatIndicators] = useState<ThreatIndicator[]>([
    {
      id: 'ti-001',
      type: 'ip',
      value: '185.159.158.234',
      category: 'c2',
      threatLevel: 'critical',
      confidence: 95,
      source: 'Threat Intelligence Feed',
      firstSeen: '2025-08-08T10:00:00Z',
      lastSeen: '2025-08-09T14:28:00Z',
      detections: 5,
      description: 'Known command and control server for banking trojan',
      tags: ['malware', 'banking_trojan', 'c2_server']
    },
    {
      id: 'ti-002',
      type: 'domain',
      value: 'malicious-update.com',
      category: 'malware',
      threatLevel: 'high',
      confidence: 89,
      source: 'Security Vendor Feed',
      firstSeen: '2025-08-07T15:30:00Z',
      lastSeen: '2025-08-09T09:45:00Z',
      detections: 12,
      description: 'Domain used for malware distribution and fake software updates',
      tags: ['malware_distribution', 'fake_updates']
    },
    {
      id: 'ti-003',
      type: 'hash',
      value: 'a1b2c3d4e5f6789012345678901234567890abcd',
      category: 'malware',
      threatLevel: 'critical',
      confidence: 100,
      source: 'Internal Analysis',
      firstSeen: '2025-08-09T11:20:00Z',
      lastSeen: '2025-08-09T11:20:00Z',
      detections: 1,
      description: 'SHA-1 hash of confirmed malware sample found on network',
      tags: ['malware_sample', 'sha1_hash']
    }
  ]);

  const getDeviceTypeIcon = (type: string) => {
    switch (type) {
      case 'router': return <Router className="h-4 w-4" />;
      case 'switch': return <Network className="h-4 w-4" />;
      case 'firewall': return <Shield className="h-4 w-4" />;
      case 'server': return <Server className="h-4 w-4" />;
      case 'workstation': return <Monitor className="h-4 w-4" />;
      case 'mobile': return <Smartphone className="h-4 w-4" />;
      case 'iot': return <Wifi className="h-4 w-4" />;
      default: return <HardDrive className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-600';
      case 'offline': return 'text-red-600';
      case 'unknown': return 'text-gray-600';
      default: return 'text-gray-600';
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

  const getAlertTypeIcon = (type: string) => {
    switch (type) {
      case 'intrusion_attempt': return <ShieldAlert className="h-4 w-4" />;
      case 'malware_communication': return <Bug className="h-4 w-4" />;
      case 'data_exfiltration': return <Download className="h-4 w-4" />;
      case 'brute_force': return <Target className="h-4 w-4" />;
      case 'dos_attack': return <Zap className="h-4 w-4" />;
      case 'policy_violation': return <AlertTriangle className="h-4 w-4" />;
      case 'anomaly': return <Radar className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getRiskScoreColor = (score: number) => {
    if (score >= 80) return 'text-red-600';
    if (score >= 60) return 'text-orange-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getSecurityZoneColor = (zone: string) => {
    switch (zone) {
      case 'dmz': return 'bg-red-100 text-red-800';
      case 'internal': return 'bg-blue-100 text-blue-800';
      case 'guest': return 'bg-orange-100 text-orange-800';
      case 'management': return 'bg-purple-100 text-purple-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getThreatLevelColor = (level: string) => {
    switch (level) {
      case 'critical': return 'text-red-600';
      case 'high': return 'text-orange-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const filteredAlerts = securityAlerts.filter(alert => {
    const matchesSearch = alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         alert.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         alert.sourceIp.includes(searchQuery);
    const matchesSeverity = selectedSeverity === 'all' || alert.severity === selectedSeverity;
    
    return matchesSearch && matchesSeverity;
  });

  const filteredDevices = networkDevices.filter(device => {
    const matchesSearch = device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         device.ipAddress.includes(searchQuery) ||
                         device.vendor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSegment = selectedSegment === 'all' || device.networkSegment === selectedSegment;
    
    return matchesSearch && matchesSegment;
  });

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 1000);
      }, 30000); // Refresh every 30 seconds

      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

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
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Network Security Monitoring
            </h1>
            <p className="text-lg text-gray-600 mt-2">
              Real-time network visibility, threat detection, and security analytics across your infrastructure
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1h">1 Hour</SelectItem>
                <SelectItem value="24h">24 Hours</SelectItem>
                <SelectItem value="7d">7 Days</SelectItem>
                <SelectItem value="30d">30 Days</SelectItem>
              </SelectContent>
            </Select>
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
          </div>
        </div>

        {/* Key Metrics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Network className="h-6 w-6 text-blue-600" />
                  </div>
                  <p className="text-2xl font-bold text-blue-600">{networkMetrics.totalDevices}</p>
                  <p className="text-sm text-gray-600">Total Devices</p>
                  <div className="mt-1">
                    <Badge className="bg-green-100 text-green-800">
                      {networkMetrics.activeDevices} Online
                    </Badge>
                  </div>
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
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <AlertTriangle className="h-6 w-6 text-red-600" />
                  </div>
                  <p className="text-2xl font-bold text-red-600">{networkMetrics.criticalAlerts}</p>
                  <p className="text-sm text-gray-600">Critical Alerts</p>
                  <div className="mt-1">
                    <Badge className="bg-orange-100 text-orange-800">
                      {networkMetrics.highAlerts} High
                    </Badge>
                  </div>
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
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Activity className="h-6 w-6 text-purple-600" />
                  </div>
                  <p className="text-2xl font-bold text-purple-600">{networkMetrics.bandwidthUtilization}%</p>
                  <p className="text-sm text-gray-600">Bandwidth Usage</p>
                  <div className="mt-2">
                    <Progress value={networkMetrics.bandwidthUtilization} className="h-2" />
                  </div>
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
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Shield className="h-6 w-6 text-green-600" />
                  </div>
                  <p className="text-2xl font-bold text-green-600">{networkMetrics.threatsBlocked}</p>
                  <p className="text-sm text-gray-600">Threats Blocked</p>
                  <div className="mt-1">
                    <Badge className="bg-blue-100 text-blue-800">
                      Today
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Timer className="h-6 w-6 text-orange-600" />
                  </div>
                  <p className="text-2xl font-bold text-orange-600">{networkMetrics.meanTimeToDetect}m</p>
                  <p className="text-sm text-gray-600">Mean Detection Time</p>
                  <div className="mt-1">
                    <Badge className="bg-green-100 text-green-800">
                      -1.2m
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                  </div>
                  <p className="text-2xl font-bold text-green-600">{networkMetrics.networkUptime}%</p>
                  <p className="text-sm text-gray-600">Network Uptime</p>
                  <div className="mt-2">
                    <Progress value={networkMetrics.networkUptime} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="alerts" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Security Alerts
          </TabsTrigger>
          <TabsTrigger value="devices" className="flex items-center gap-2">
            <Network className="h-4 w-4" />
            Network Devices
          </TabsTrigger>
          <TabsTrigger value="traffic" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Traffic Analysis
          </TabsTrigger>
          <TabsTrigger value="threats" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Threat Intelligence
          </TabsTrigger>
          <TabsTrigger value="topology" className="flex items-center gap-2">
            <GitBranch className="h-4 w-4" />
            Network Topology
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Network Health Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Alert Distribution
                </CardTitle>
                <CardDescription>Security alerts by severity level over the last 24 hours</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { severity: 'critical', count: networkMetrics.criticalAlerts, color: 'bg-red-500' },
                    { severity: 'high', count: networkMetrics.highAlerts, color: 'bg-orange-500' },
                    { severity: 'medium', count: networkMetrics.mediumAlerts, color: 'bg-yellow-500' },
                    { severity: 'low', count: networkMetrics.lowAlerts, color: 'bg-blue-500' }
                  ].map((item) => {
                    const total = networkMetrics.criticalAlerts + networkMetrics.highAlerts + networkMetrics.mediumAlerts + networkMetrics.lowAlerts;
                    const percentage = total > 0 ? (item.count / total) * 100 : 0;
                    return (
                      <div key={item.severity} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                          <span className="capitalize font-medium">{item.severity}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress value={percentage} className="w-24 h-2" />
                          <span className="text-sm font-medium w-8 text-right">{item.count}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="h-5 w-5" />
                  Network Performance Metrics
                </CardTitle>
                <CardDescription>Key performance indicators for network security</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{networkMetrics.meanTimeToDetect}m</p>
                    <p className="text-sm text-gray-600">Mean Time to Detect</p>
                    <div className="flex items-center justify-center gap-1 mt-1">
                      <TrendingDown className="h-3 w-3 text-green-600" />
                      <span className="text-xs text-green-600">Improving</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-orange-600">{networkMetrics.meanTimeToResolve}m</p>
                    <p className="text-sm text-gray-600">Mean Time to Resolve</p>
                    <div className="flex items-center justify-center gap-1 mt-1">
                      <TrendingDown className="h-3 w-3 text-green-600" />
                      <span className="text-xs text-green-600">Improving</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{networkMetrics.threatsBlocked}</p>
                    <p className="text-sm text-gray-600">Threats Blocked</p>
                    <div className="flex items-center justify-center gap-1 mt-1">
                      <TrendingUp className="h-3 w-3 text-green-600" />
                      <span className="text-xs text-green-600">+12%</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">{networkMetrics.anomalyDetections}</p>
                    <p className="text-sm text-gray-600">Anomalies Found</p>
                    <div className="flex items-center justify-center gap-1 mt-1">
                      <TrendingDown className="h-3 w-3 text-green-600" />
                      <span className="text-xs text-green-600">-8%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Network Segments Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="h-5 w-5" />
                Network Segments Security Status
              </CardTitle>
              <CardDescription>Security posture across different network segments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {networkSegments.map((segment, index) => (
                  <motion.div
                    key={segment.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border rounded-lg p-4"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold">{segment.name}</h3>
                          <Badge className={getSecurityZoneColor(segment.securityZone)}>
                            {segment.securityZone}
                          </Badge>
                          <Badge variant="outline">{segment.cidr}</Badge>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{segment.description}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="flex items-center gap-1">
                            <Network className="h-3 w-3" />
                            {segment.deviceCount} devices
                          </span>
                          <span className="flex items-center gap-1">
                            <Activity className="h-3 w-3" />
                            {segment.trafficVolume} MB/day
                          </span>
                          <span className="flex items-center gap-1">
                            <Shield className="h-3 w-3" />
                            {segment.firewallRules} rules
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {segment.monitoringEnabled ? 'Monitored' : 'Unmonitored'}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${getThreatLevelColor(segment.threatLevel)}`}>
                          {segment.threatLevel.toUpperCase()}
                        </div>
                        <p className="text-xs text-gray-600">Threat Level</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity Feed */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Recent Security Activity
              </CardTitle>
              <CardDescription>Latest security events and system activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>CRITICAL:</strong> Malware C2 communication detected from workstation 10.3.2.45 - immediate containment required
                  </AlertDescription>
                </Alert>
                <Alert>
                  <Shield className="h-4 w-4" />
                  <AlertDescription>
                    SSH brute force attack blocked from 203.0.113.45 - 47 failed login attempts detected
                  </AlertDescription>
                </Alert>
                <Alert>
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertDescription>
                    Firewall rules updated successfully - 15 new threat intelligence indicators blocked
                  </AlertDescription>
                </Alert>
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    Network scan completed for DMZ segment - 3 new vulnerabilities identified
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Alerts Tab */}
        <TabsContent value="alerts" className="space-y-6">
          {/* Search and Filter Controls */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search alerts, IPs, signatures..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
              <SelectTrigger className="w-[140px]">
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
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Advanced Filters
            </Button>
          </div>

          {/* Alerts List */}
          <div className="grid gap-6">
            {filteredAlerts.map((alert, index) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`border-l-4 ${
                  alert.severity === 'critical' ? 'border-l-red-500' :
                  alert.severity === 'high' ? 'border-l-orange-500' :
                  alert.severity === 'medium' ? 'border-l-yellow-500' :
                  'border-l-blue-500'
                }`}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          {getAlertTypeIcon(alert.type)}
                          <CardTitle className="text-lg">{alert.title}</CardTitle>
                          <Badge className={getSeverityColor(alert.severity)}>
                            {alert.severity}
                          </Badge>
                          <Badge variant="outline">
                            {alert.confidence}% confidence
                          </Badge>
                        </div>
                        <CardDescription className="mb-2">{alert.description}</CardDescription>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>ID: {alert.id}</span>
                          <span>Source: {alert.sourceIp}</span>
                          {alert.destinationIp && <span>Destination: {alert.destinationIp}</span>}
                          <span>Device: {alert.affectedDevice}</span>
                          <span>{new Date(alert.timestamp).toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={
                          alert.status === 'new' ? 'bg-blue-100 text-blue-800' :
                          alert.status === 'investigating' ? 'bg-yellow-100 text-yellow-800' :
                          alert.status === 'resolved' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }>
                          {alert.status}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Rule Information */}
                    {alert.ruleId && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="font-medium">Rule ID</p>
                          <p className="text-gray-600">{alert.ruleId}</p>
                        </div>
                        {alert.signature && (
                          <div>
                            <p className="font-medium">Signature</p>
                            <p className="text-gray-600">{alert.signature}</p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Actions and Evidence */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="font-medium text-sm mb-2">Recommended Actions</p>
                        <ul className="space-y-1">
                          {alert.actions.slice(0, 3).map((action, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm">
                              <ArrowRight className="h-3 w-3 text-blue-600 mt-0.5" />
                              {action}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="font-medium text-sm mb-2">Evidence Available</p>
                        <div className="flex flex-wrap gap-1">
                          {alert.evidence.map((evidence, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {evidence}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center gap-2">
                        {alert.assignedTo && (
                          <Badge variant="outline">Assigned to: {alert.assignedTo}</Badge>
                        )}
                        <span className="text-sm text-gray-600">
                          Confidence: {alert.confidence}%
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-2" />
                          Details
                        </Button>
                        <Button size="sm" variant="outline">
                          <Users className="h-4 w-4 mr-2" />
                          Assign
                        </Button>
                        <Button size="sm">
                          <Shield className="h-4 w-4 mr-2" />
                          Investigate
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Network Devices Tab */}
        <TabsContent value="devices" className="space-y-6">
          {/* Search and Filter Controls */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search devices, IPs, vendors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedSegment} onValueChange={setSelectedSegment}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Network Segment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Segments</SelectItem>
                <SelectItem value="dmz">DMZ</SelectItem>
                <SelectItem value="internal">Internal</SelectItem>
                <SelectItem value="guest">Guest</SelectItem>
                <SelectItem value="management">Management</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <ScanLine className="h-4 w-4 mr-2" />
              Scan Network
            </Button>
          </div>

          {/* Devices Grid */}
          <div className="grid gap-6">
            {filteredDevices.map((device, index) => (
              <motion.div
                key={device.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          {getDeviceTypeIcon(device.type)}
                          <CardTitle className="text-lg">{device.name}</CardTitle>
                          <Badge className={getSecurityZoneColor(device.networkSegment)}>
                            {device.networkSegment}
                          </Badge>
                          <div className={`flex items-center gap-1 ${getStatusColor(device.status)}`}>
                            <div className={`w-2 h-2 rounded-full ${
                              device.status === 'online' ? 'bg-green-600' : 
                              device.status === 'offline' ? 'bg-red-600' : 'bg-gray-600'
                            }`}></div>
                            <span className="capitalize text-sm">{device.status}</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="font-medium">IP Address</p>
                            <p className="text-gray-600">{device.ipAddress}</p>
                          </div>
                          <div>
                            <p className="font-medium">Vendor</p>
                            <p className="text-gray-600">{device.vendor}</p>
                          </div>
                          <div>
                            <p className="font-medium">Location</p>
                            <p className="text-gray-600">{device.location}</p>
                          </div>
                          <div>
                            <p className="font-medium">Owner</p>
                            <p className="text-gray-600">{device.owner || 'Unknown'}</p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-3xl font-bold ${getRiskScoreColor(device.riskScore)}`}>
                          {device.riskScore}
                        </div>
                        <p className="text-xs text-gray-600">Risk Score</p>
                        <Badge className={
                          device.businessCriticality === 'critical' ? 'bg-red-100 text-red-800' :
                          device.businessCriticality === 'high' ? 'bg-orange-100 text-orange-800' :
                          device.businessCriticality === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }>
                          {device.businessCriticality}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Device Details */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="font-medium">MAC Address</p>
                        <p className="text-gray-600 font-mono">{device.macAddress}</p>
                      </div>
                      {device.model && (
                        <div>
                          <p className="font-medium">Model</p>
                          <p className="text-gray-600">{device.model}</p>
                        </div>
                      )}
                      {device.operatingSystem && (
                        <div>
                          <p className="font-medium">Operating System</p>
                          <p className="text-gray-600">{device.operatingSystem}</p>
                        </div>
                      )}
                    </div>

                    {/* Open Ports */}
                    <div>
                      <p className="font-medium text-sm mb-2">Open Ports ({device.openPorts.length})</p>
                      <div className="flex flex-wrap gap-2">
                        {device.openPorts.slice(0, 6).map((port, idx) => (
                          <Badge key={idx} variant="outline" className={`text-xs ${
                            port.riskLevel === 'critical' ? 'border-red-200 text-red-800' :
                            port.riskLevel === 'high' ? 'border-orange-200 text-orange-800' :
                            port.riskLevel === 'medium' ? 'border-yellow-200 text-yellow-800' :
                            'border-green-200 text-green-800'
                          }`}>
                            {port.number}/{port.protocol} ({port.service})
                          </Badge>
                        ))}
                        {device.openPorts.length > 6 && (
                          <Badge variant="outline">+{device.openPorts.length - 6} more</Badge>
                        )}
                      </div>
                    </div>

                    {/* Security Status */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium">Vulnerabilities</p>
                        <div className="flex items-center gap-2">
                          <Badge className={
                            device.vulnerabilityCount > 10 ? 'bg-red-100 text-red-800' :
                            device.vulnerabilityCount > 5 ? 'bg-orange-100 text-orange-800' :
                            device.vulnerabilityCount > 0 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }>
                            {device.vulnerabilityCount} found
                          </Badge>
                        </div>
                      </div>
                      <div>
                        <p className="font-medium">Last Seen</p>
                        <p className="text-gray-600">{new Date(device.lastSeen).toLocaleString()}</p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">
                          Type: {device.type.replace('_', ' ')}
                        </Badge>
                        <span className="text-sm text-gray-600">
                          Segment: {device.networkSegment}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-2" />
                          Details
                        </Button>
                        <Button size="sm" variant="outline">
                          <ScanLine className="h-4 w-4 mr-2" />
                          Scan
                        </Button>
                        <Button size="sm">
                          <Settings className="h-4 w-4 mr-2" />
                          Configure
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Additional tabs would continue here but truncated for length */}
      </Tabs>
    </div>
  );
};

export default NetworkSecurityMonitoring;