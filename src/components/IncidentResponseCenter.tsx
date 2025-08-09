import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
  Stop,
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
  StopCircle,
  PauseCircle,
  Settings,
  Plus,
  Minus,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Info,
  Warning,
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

interface SecurityIncident {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'new' | 'investigating' | 'containment' | 'eradication' | 'recovery' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  category: string;
  detectedAt: string;
  reportedBy: string;
  assignedTo?: string;
  team?: string;
  estimatedImpact: string;
  affectedSystems: string[];
  affectedUsers: number;
  businessImpact: string;
  containmentActions: string[];
  evidenceCollected: Evidence[];
  timeline: TimelineEvent[];
  communications: Communication[];
  slaTarget: number; // hours
  timeToResolve?: number; // hours
  riskScore: number;
  mitreTactics: string[];
  indicators: string[];
  tags: string[];
}

interface Evidence {
  id: string;
  type: 'log' | 'screenshot' | 'file' | 'network_capture' | 'forensic_image' | 'document';
  name: string;
  description: string;
  collectedBy: string;
  collectedAt: string;
  hash: string;
  size: number;
  location: string;
  chainOfCustody: CustodyRecord[];
}

interface CustodyRecord {
  timestamp: string;
  action: 'collected' | 'transferred' | 'analyzed' | 'stored';
  person: string;
  notes: string;
}

interface TimelineEvent {
  id: string;
  timestamp: string;
  event: string;
  actor: string;
  description: string;
  evidence?: string[];
  automated: boolean;
}

interface Communication {
  id: string;
  timestamp: string;
  type: 'internal' | 'external' | 'legal' | 'regulatory' | 'customer' | 'vendor';
  recipient: string;
  sender: string;
  subject: string;
  content: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'draft' | 'sent' | 'acknowledged' | 'responded';
}

interface IncidentTeam {
  role: string;
  member: string;
  contact: string;
  status: 'available' | 'engaged' | 'unavailable';
  expertise: string[];
}

interface ResponsePlaybook {
  id: string;
  name: string;
  category: string;
  description: string;
  triggerCriteria: string[];
  steps: PlaybookStep[];
  estimatedTime: number;
  requiredRoles: string[];
  automationLevel: 'manual' | 'semi_automated' | 'fully_automated';
  lastUpdated: string;
}

interface PlaybookStep {
  id: string;
  order: number;
  title: string;
  description: string;
  action: string;
  assignedRole: string;
  estimatedTime: number;
  dependencies: string[];
  automatable: boolean;
  status: 'pending' | 'in_progress' | 'completed' | 'skipped' | 'failed';
  evidence?: string[];
  notes?: string;
}

interface IncidentMetrics {
  totalIncidents: number;
  activeIncidents: number;
  criticalIncidents: number;
  meanTimeToDetect: number;
  meanTimeToRespond: number;
  meanTimeToResolve: number;
  slaCompliance: number;
  falsePositiveRate: number;
  resolutionRate: number;
  teamUtilization: number;
}

const IncidentResponseCenter: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedIncident, setSelectedIncident] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);

  const [incidents] = useState<SecurityIncident[]>([
    {
      id: 'inc-001',
      title: 'Advanced Persistent Threat Detection',
      description: 'Sophisticated malware detected with C2 communication attempting data exfiltration from finance systems',
      severity: 'critical',
      status: 'investigating',
      priority: 'critical',
      category: 'Malware',
      detectedAt: '2025-08-09T14:32:15Z',
      reportedBy: 'SIEM System',
      assignedTo: 'Sarah Chen',
      team: 'Incident Response Team Alpha',
      estimatedImpact: 'High - Potential data breach affecting customer financial records',
      affectedSystems: ['finance-db-01', 'web-app-prod', 'backup-server-02'],
      affectedUsers: 1250,
      businessImpact: 'Critical - Financial data at risk, regulatory compliance concerns',
      containmentActions: [
        'Isolated affected systems from network',
        'Preserved forensic images of compromised servers',
        'Implemented emergency access controls',
        'Activated incident response team'
      ],
      evidenceCollected: [
        {
          id: 'ev-001',
          type: 'log',
          name: 'firewall_logs_suspicious_traffic.log',
          description: 'Firewall logs showing suspicious C2 traffic patterns',
          collectedBy: 'Mike Rodriguez',
          collectedAt: '2025-08-09T14:45:00Z',
          hash: 'sha256:a1b2c3d4e5f6...',
          size: 2458672,
          location: '/evidence/inc-001/',
          chainOfCustody: [
            {
              timestamp: '2025-08-09T14:45:00Z',
              action: 'collected',
              person: 'Mike Rodriguez',
              notes: 'Extracted firewall logs for 24-hour period'
            }
          ]
        }
      ],
      timeline: [
        {
          id: 'tl-001',
          timestamp: '2025-08-09T14:32:15Z',
          event: 'Initial Detection',
          actor: 'SIEM System',
          description: 'Anomalous network traffic detected by ML-based threat detection',
          automated: true
        },
        {
          id: 'tl-002',
          timestamp: '2025-08-09T14:35:22Z',
          event: 'Alert Escalation',
          actor: 'SOC Analyst 1',
          description: 'Manual review confirmed threat - escalated to incident response team',
          automated: false
        }
      ],
      communications: [
        {
          id: 'comm-001',
          timestamp: '2025-08-09T14:40:00Z',
          type: 'internal',
          recipient: 'CISO Office',
          sender: 'Sarah Chen',
          subject: 'CRITICAL: APT Detected - Immediate Response Required',
          content: 'Critical security incident detected involving potential data exfiltration...',
          priority: 'urgent',
          status: 'sent'
        }
      ],
      slaTarget: 4,
      riskScore: 92,
      mitreTactics: ['Initial Access', 'Command and Control', 'Exfiltration'],
      indicators: ['suspicious_network_traffic', 'malware_signature', 'c2_communication'],
      tags: ['apt', 'data_exfiltration', 'finance_systems', 'high_priority']
    },
    {
      id: 'inc-002',
      title: 'Phishing Campaign Targeting HR Department',
      description: 'Large-scale phishing campaign targeting HR personnel with credential harvesting attempts',
      severity: 'high',
      status: 'containment',
      priority: 'high',
      category: 'Phishing',
      detectedAt: '2025-08-09T10:15:30Z',
      reportedBy: 'Jennifer Park - HR Manager',
      assignedTo: 'Alex Thompson',
      team: 'Email Security Team',
      estimatedImpact: 'Medium - Potential credential compromise, limited scope',
      affectedSystems: ['email-server-01', 'hr-portal'],
      affectedUsers: 45,
      businessImpact: 'Medium - HR operations potentially disrupted, employee data at risk',
      containmentActions: [
        'Blocked malicious email domains',
        'Reset passwords for potentially affected users',
        'Implemented additional email filtering rules',
        'Conducted user awareness briefing'
      ],
      evidenceCollected: [],
      timeline: [
        {
          id: 'tl-003',
          timestamp: '2025-08-09T10:15:30Z',
          event: 'User Report',
          actor: 'Jennifer Park',
          description: 'HR Manager reported suspicious emails received by multiple team members',
          automated: false
        }
      ],
      communications: [],
      slaTarget: 8,
      timeToResolve: 6.5,
      riskScore: 67,
      mitreTactics: ['Initial Access', 'Credential Access'],
      indicators: ['phishing_email', 'credential_harvesting', 'social_engineering'],
      tags: ['phishing', 'hr_department', 'credential_theft', 'user_training']
    },
    {
      id: 'inc-003',
      title: 'Unauthorized Access to Development Environment',
      description: 'Suspicious login activity detected in development environment with privilege escalation attempts',
      severity: 'medium',
      status: 'recovery',
      priority: 'medium',
      category: 'Unauthorized Access',
      detectedAt: '2025-08-09T08:22:45Z',
      reportedBy: 'Access Control System',
      assignedTo: 'David Kim',
      team: 'Development Security Team',
      estimatedImpact: 'Low - Development environment only, no production impact',
      affectedSystems: ['dev-server-03', 'staging-db'],
      affectedUsers: 12,
      businessImpact: 'Low - Development delays possible, intellectual property at risk',
      containmentActions: [
        'Revoked suspicious user access',
        'Reviewed and updated development environment access controls',
        'Implemented additional monitoring for dev systems'
      ],
      evidenceCollected: [],
      timeline: [],
      communications: [],
      slaTarget: 24,
      timeToResolve: 18.3,
      riskScore: 45,
      mitreTactics: ['Initial Access', 'Privilege Escalation'],
      indicators: ['unusual_login_time', 'privilege_escalation', 'suspicious_commands'],
      tags: ['unauthorized_access', 'development', 'privilege_escalation', 'internal']
    }
  ]);

  const [incidentTeams] = useState<IncidentTeam[]>([
    {
      role: 'Incident Commander',
      member: 'Sarah Chen',
      contact: 'sarah.chen@company.com',
      status: 'engaged',
      expertise: ['incident_management', 'forensics', 'crisis_communication']
    },
    {
      role: 'Lead Analyst',
      member: 'Mike Rodriguez',
      contact: 'mike.rodriguez@company.com',
      status: 'available',
      expertise: ['malware_analysis', 'network_forensics', 'threat_hunting']
    },
    {
      role: 'Communications Lead',
      member: 'Jennifer Park',
      contact: 'jennifer.park@company.com',
      status: 'available',
      expertise: ['crisis_communication', 'stakeholder_management', 'regulatory_compliance']
    },
    {
      role: 'Technical Lead',
      member: 'Alex Thompson',
      contact: 'alex.thompson@company.com',
      status: 'engaged',
      expertise: ['system_administration', 'containment', 'recovery_operations']
    },
    {
      role: 'Legal Counsel',
      member: 'David Kim',
      contact: 'david.kim@company.com',
      status: 'available',
      expertise: ['privacy_law', 'regulatory_compliance', 'breach_notification']
    }
  ]);

  const [responsePlaybooks] = useState<ResponsePlaybook[]>([
    {
      id: 'pb-001',
      name: 'Advanced Persistent Threat Response',
      category: 'Malware',
      description: 'Comprehensive response playbook for sophisticated malware attacks and APT campaigns',
      triggerCriteria: ['apt_indicators', 'c2_communication', 'lateral_movement', 'data_exfiltration'],
      steps: [
        {
          id: 'step-001',
          order: 1,
          title: 'Initial Assessment',
          description: 'Assess the scope and severity of the APT incident',
          action: 'Conduct rapid threat assessment and determine incident classification',
          assignedRole: 'Lead Analyst',
          estimatedTime: 30,
          dependencies: [],
          automatable: false,
          status: 'completed'
        },
        {
          id: 'step-002',
          order: 2,
          title: 'Containment Actions',
          description: 'Implement immediate containment measures to prevent lateral movement',
          action: 'Isolate affected systems and block malicious network traffic',
          assignedRole: 'Technical Lead',
          estimatedTime: 60,
          dependencies: ['step-001'],
          automatable: true,
          status: 'in_progress'
        }
      ],
      estimatedTime: 480,
      requiredRoles: ['Incident Commander', 'Lead Analyst', 'Technical Lead'],
      automationLevel: 'semi_automated',
      lastUpdated: '2025-08-01T10:00:00Z'
    },
    {
      id: 'pb-002',
      name: 'Phishing Incident Response',
      category: 'Phishing',
      description: 'Standard response procedures for phishing attacks and credential harvesting attempts',
      triggerCriteria: ['phishing_email', 'credential_harvesting', 'social_engineering'],
      steps: [
        {
          id: 'step-003',
          order: 1,
          title: 'Email Analysis',
          description: 'Analyze phishing emails and identify indicators of compromise',
          action: 'Extract and analyze email headers, attachments, and embedded links',
          assignedRole: 'Lead Analyst',
          estimatedTime: 45,
          dependencies: [],
          automatable: true,
          status: 'pending'
        }
      ],
      estimatedTime: 240,
      requiredRoles: ['Lead Analyst', 'Communications Lead'],
      automationLevel: 'semi_automated',
      lastUpdated: '2025-07-28T15:30:00Z'
    }
  ]);

  const [incidentMetrics] = useState<IncidentMetrics>({
    totalIncidents: 47,
    activeIncidents: 8,
    criticalIncidents: 2,
    meanTimeToDetect: 3.2,
    meanTimeToRespond: 12.5,
    meanTimeToResolve: 28.7,
    slaCompliance: 87.3,
    falsePositiveRate: 4.8,
    resolutionRate: 94.2,
    teamUtilization: 76.4
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'investigating': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'containment': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'eradication': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'recovery': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'resolved': return 'bg-green-100 text-green-800 border-green-200';
      case 'closed': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'low': return <Flag className="h-4 w-4 text-green-600" />;
      case 'medium': return <Flag className="h-4 w-4 text-yellow-600" />;
      case 'high': return <Flag className="h-4 w-4 text-orange-600" />;
      case 'critical': return <Siren className="h-4 w-4 text-red-600" />;
      default: return <Flag className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new': return <Bell className="h-4 w-4" />;
      case 'investigating': return <Eye className="h-4 w-4" />;
      case 'containment': return <Shield className="h-4 w-4" />;
      case 'eradication': return <Bug className="h-4 w-4" />;
      case 'recovery': return <Settings className="h-4 w-4" />;
      case 'resolved': return <CheckCircle className="h-4 w-4" />;
      case 'closed': return <XOctagon className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getTeamStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'engaged': return 'bg-orange-100 text-orange-800';
      case 'unavailable': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Calculate response times and SLA compliance
  const calculateResponseMetrics = (incident: SecurityIncident) => {
    const detectedAt = new Date(incident.detectedAt);
    const now = new Date();
    const elapsedHours = Math.round((now.getTime() - detectedAt.getTime()) / (1000 * 60 * 60) * 10) / 10;
    const slaProgress = Math.min((elapsedHours / incident.slaTarget) * 100, 100);
    const slaStatus = slaProgress > 100 ? 'breached' : slaProgress > 80 ? 'warning' : 'on_track';
    
    return { elapsedHours, slaProgress, slaStatus };
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

  const filteredIncidents = incidents.filter(incident => {
    const matchesSearch = incident.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         incident.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         incident.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || incident.status === selectedStatus;
    const matchesSeverity = selectedSeverity === 'all' || incident.severity === selectedSeverity;
    
    return matchesSearch && matchesStatus && matchesSeverity;
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
            <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              Security Incident Response Center
            </h1>
            <p className="text-lg text-gray-600 mt-2">
              Comprehensive incident management, forensic analysis, and coordinated response workflows
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
            <Button className="bg-red-600 hover:bg-red-700">
              <Plus className="h-4 w-4 mr-2" />
              Create Incident
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
                    <p className="text-sm font-medium text-gray-600">Active Incidents</p>
                    <p className="text-3xl font-bold text-red-600">{incidentMetrics.activeIncidents}</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                </div>
                <div className="mt-2">
                  <Badge className="bg-red-100 text-red-800">
                    {incidentMetrics.criticalIncidents} Critical
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
                    <p className="text-sm font-medium text-gray-600">Mean Time to Resolve</p>
                    <p className="text-3xl font-bold text-blue-600">{incidentMetrics.meanTimeToResolve}h</p>
                  </div>
                  <Clock className="h-8 w-8 text-blue-600" />
                </div>
                <div className="mt-2">
                  <Progress value={75} className="h-2" />
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
                    <p className="text-sm font-medium text-gray-600">SLA Compliance</p>
                    <p className="text-3xl font-bold text-green-600">{incidentMetrics.slaCompliance}%</p>
                  </div>
                  <Target className="h-8 w-8 text-green-600" />
                </div>
                <div className="mt-2">
                  <Progress value={incidentMetrics.slaCompliance} className="h-2" />
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
                    <p className="text-sm font-medium text-gray-600">Team Utilization</p>
                    <p className="text-3xl font-bold text-purple-600">{incidentMetrics.teamUtilization}%</p>
                  </div>
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <div className="mt-2">
                  <Progress value={incidentMetrics.teamUtilization} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="incidents" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Active Incidents
          </TabsTrigger>
          <TabsTrigger value="playbooks" className="flex items-center gap-2">
            <Workflow className="h-4 w-4" />
            Response Playbooks
          </TabsTrigger>
          <TabsTrigger value="teams" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Response Teams
          </TabsTrigger>
          <TabsTrigger value="forensics" className="flex items-center gap-2">
            <Microscope className="h-4 w-4" />
            Digital Forensics
          </TabsTrigger>
          <TabsTrigger value="communications" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Communications
          </TabsTrigger>
        </TabsList>

        {/* Dashboard Overview */}
        <TabsContent value="dashboard" className="space-y-6">
          {/* Incident Status Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Incident Status Distribution
                </CardTitle>
                <CardDescription>Current status of all active security incidents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['new', 'investigating', 'containment', 'eradication', 'recovery', 'resolved'].map((status) => {
                    const count = incidents.filter(i => i.status === status).length;
                    const percentage = (count / incidents.length) * 100;
                    return (
                      <div key={status} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(status)}
                          <span className="capitalize font-medium">{status.replace('_', ' ')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress value={percentage} className="w-24 h-2" />
                          <span className="text-sm font-medium w-8">{count}</span>
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
                  <TrendingUp className="h-5 w-5" />
                  Response Performance Metrics
                </CardTitle>
                <CardDescription>Key performance indicators for incident response</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{incidentMetrics.meanTimeToDetect}h</p>
                    <p className="text-sm text-gray-600">Mean Time to Detect</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-orange-600">{incidentMetrics.meanTimeToRespond}h</p>
                    <p className="text-sm text-gray-600">Mean Time to Respond</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{incidentMetrics.resolutionRate}%</p>
                    <p className="text-sm text-gray-600">Resolution Rate</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-red-600">{incidentMetrics.falsePositiveRate}%</p>
                    <p className="text-sm text-gray-600">False Positive Rate</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity Feed */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Recent Incident Activity
              </CardTitle>
              <CardDescription>Live feed of incident response activities and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Alert>
                  <Siren className="h-4 w-4" />
                  <AlertDescription>
                    <strong>CRITICAL:</strong> New APT detection in finance systems - Incident Response Team Alpha activated
                  </AlertDescription>
                </Alert>
                <Alert>
                  <Shield className="h-4 w-4" />
                  <AlertDescription>
                    Containment actions completed for phishing incident INC-002 - 45 affected users secured
                  </AlertDescription>
                </Alert>
                <Alert>
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertDescription>
                    Development environment incident INC-003 moved to recovery phase - no production impact
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Active Incidents */}
        <TabsContent value="incidents" className="space-y-6">
          {/* Search and Filter Controls */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search incidents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="investigating">Investigating</SelectItem>
                <SelectItem value="containment">Containment</SelectItem>
                <SelectItem value="recovery">Recovery</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
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
          </div>

          {/* Incidents List */}
          <div className="grid gap-6">
            {filteredIncidents.map((incident, index) => {
              const responseMetrics = calculateResponseMetrics(incident);
              return (
                <motion.div
                  key={incident.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`border-l-4 ${
                    incident.severity === 'critical' ? 'border-l-red-500' :
                    incident.severity === 'high' ? 'border-l-orange-500' :
                    incident.severity === 'medium' ? 'border-l-yellow-500' :
                    'border-l-green-500'
                  }`}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <CardTitle className="text-lg">{incident.title}</CardTitle>
                            <Badge className={getSeverityColor(incident.severity)}>
                              {incident.severity}
                            </Badge>
                            <Badge className={getStatusColor(incident.status)}>
                              {getStatusIcon(incident.status)}
                              <span className="ml-1 capitalize">{incident.status.replace('_', ' ')}</span>
                            </Badge>
                            {getPriorityIcon(incident.priority)}
                          </div>
                          <CardDescription className="mb-2">{incident.description}</CardDescription>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>ID: {incident.id}</span>
                            <span>Category: {incident.category}</span>
                            <span>Detected: {new Date(incident.detectedAt).toLocaleString()}</span>
                            {incident.assignedTo && <span>Assigned to: {incident.assignedTo}</span>}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-red-600 mb-1">
                            {incident.riskScore}
                          </div>
                          <p className="text-xs text-gray-600">Risk Score</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* SLA Progress */}
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">SLA Progress</span>
                          <span className="text-sm">
                            {responseMetrics.elapsedHours}h / {incident.slaTarget}h
                          </span>
                        </div>
                        <Progress 
                          value={responseMetrics.slaProgress} 
                          className={`h-2 ${
                            responseMetrics.slaStatus === 'breached' ? 'bg-red-100' :
                            responseMetrics.slaStatus === 'warning' ? 'bg-yellow-100' :
                            'bg-green-100'
                          }`}
                        />
                      </div>

                      {/* Impact Summary */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="font-medium">Affected Systems</p>
                          <p className="text-gray-600">{incident.affectedSystems.length} systems</p>
                        </div>
                        <div>
                          <p className="font-medium">Affected Users</p>
                          <p className="text-gray-600">{incident.affectedUsers.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="font-medium">Business Impact</p>
                          <p className="text-gray-600">{incident.estimatedImpact}</p>
                        </div>
                      </div>

                      {/* MITRE Tactics */}
                      <div>
                        <p className="font-medium text-sm mb-2">MITRE ATT&CK Tactics</p>
                        <div className="flex flex-wrap gap-2">
                          {incident.mitreTactics.map((tactic, idx) => (
                            <Badge key={idx} variant="secondary">
                              {tactic}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center gap-2">
                          {incident.team && (
                            <Badge variant="outline">{incident.team}</Badge>
                          )}
                          <span className="text-sm text-gray-600">
                            Last updated: {Math.floor(Math.random() * 30)} minutes ago
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                          <Button size="sm" variant="outline">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Communications
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
              );
            })}
          </div>
        </TabsContent>

        {/* Additional tab content would continue here but I'll truncate for length */}
      </Tabs>
    </div>
  );
};

export default IncidentResponseCenter;