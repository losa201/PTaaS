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

const SecurityPlaybooks = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlaybook, setSelectedPlaybook] = useState(null);
  const [isExecuting, setIsExecuting] = useState(false);

  // Mock data for playbooks
  const [playbooks] = useState([
    {
      id: "pb-001",
      name: "Malware Incident Response",
      description: "Comprehensive malware detection, containment, and eradication playbook with automated threat hunting and remediation",
      category: "incident_response",
      severity: "critical",
      complexity: "advanced",
      status: "active",
      version: "2.1.0",
      author: "Security Team",
      createdDate: "2024-01-15T00:00:00Z",
      lastModified: "2025-07-20T00:00:00Z",
      executionCount: 47,
      successRate: 94.7,
      averageExecutionTime: 45,
      triggers: ["malware_detected", "suspicious_process", "av_alert"],
      requirements: ["EDR_agent", "SIEM_integration", "admin_approval"],
      tags: ["malware", "incident_response", "automated", "high_priority"],
      steps: [
        {
          id: "step-001",
          name: "Initial Assessment",
          type: "automated",
          description: "Gather system information and initial threat indicators",
          estimatedTime: 2,
          dependencies: [],
          outputs: ["system_info", "initial_iocs"],
          configuration: {
            tools: ["osquery", "volatility"],
            timeout: 120
          }
        },
        {
          id: "step-002",
          name: "Threat Containment",
          type: "automated",
          description: "Isolate infected systems and block malicious network traffic",
          estimatedTime: 5,
          dependencies: ["step-001"],
          outputs: ["isolation_status", "network_blocks"],
          configuration: {
            isolation_method: "network",
            backup_isolation: true
          }
        },
        {
          id: "step-003",
          name: "Forensic Analysis",
          type: "manual",
          description: "Deep analysis of malware samples and system artifacts",
          estimatedTime: 30,
          dependencies: ["step-002"],
          outputs: ["analysis_report", "iocs", "attribution"],
          configuration: {
            tools: ["ida_pro", "ghidra", "volatility"],
            priority: "high"
          }
        },
        {
          id: "step-004",
          name: "Eradication",
          type: "automated",
          description: "Remove malware and restore system integrity",
          estimatedTime: 8,
          dependencies: ["step-003"],
          outputs: ["cleanup_report", "system_status"],
          configuration: {
            cleanup_tools: ["custom_script", "av_scan"],
            verify_cleanup: true
          }
        }
      ]
    },
    {
      id: "pb-002",
      name: "Phishing Email Investigation",
      description: "Automated phishing email analysis, user notification, and threat intelligence enrichment workflow",
      category: "threat_hunting",
      severity: "high",
      complexity: "moderate",
      status: "active",
      version: "1.8.5",
      author: "SOC Team",
      createdDate: "2024-02-10T00:00:00Z",
      lastModified: "2025-08-01T00:00:00Z",
      executionCount: 156,
      successRate: 97.4,
      averageExecutionTime: 15,
      triggers: ["phishing_reported", "suspicious_email", "url_clicked"],
      requirements: ["email_security_gateway", "threat_intel_feeds"],
      tags: ["phishing", "email_security", "threat_hunting", "user_awareness"],
      steps: [
        {
          id: "step-101",
          name: "Email Analysis",
          type: "automated",
          description: "Parse email headers, extract URLs and attachments for analysis",
          estimatedTime: 3,
          dependencies: [],
          outputs: ["email_metadata", "extracted_iocs"],
          configuration: {
            parsers: ["email_parser", "url_extractor"],
            timeout: 180
          }
        },
        {
          id: "step-102",
          name: "Threat Intelligence Enrichment",
          type: "automated",
          description: "Enrich IOCs with threat intelligence from multiple sources",
          estimatedTime: 5,
          dependencies: ["step-101"],
          outputs: ["threat_intel_report", "risk_score"],
          configuration: {
            ti_sources: ["virustotal", "alienvault", "custom"],
            threshold: 70
          }
        },
        {
          id: "step-103",
          name: "User Notification",
          type: "automated",
          description: "Notify affected users and provide security awareness guidance",
          estimatedTime: 2,
          dependencies: ["step-102"],
          outputs: ["notification_status", "user_acknowledgment"],
          configuration: {
            notification_method: "email_sms",
            template: "phishing_alert"
          }
        },
        {
          id: "step-104",
          name: "Threat Hunting",
          type: "manual",
          description: "Hunt for similar threats across the environment",
          estimatedTime: 20,
          dependencies: ["step-102"],
          outputs: ["hunt_results", "additional_victims"],
          configuration: {
            hunt_queries: "custom_kql",
            timeframe: "7d"
          }
        }
      ]
    },
    {
      id: "pb-003",
      name: "Vulnerability Patch Management",
      description: "Automated vulnerability assessment, patch testing, and deployment workflow with rollback capabilities",
      category: "vulnerability_management",
      severity: "medium",
      complexity: "complex",
      status: "active",
      version: "3.2.1",
      author: "Infrastructure Team",
      createdDate: "2024-03-05T00:00:00Z",
      lastModified: "2025-07-30T00:00:00Z",
      executionCount: 89,
      successRate: 91,
      averageExecutionTime: 120,
      triggers: ["vulnerability_detected", "patch_available", "scheduled_maintenance"],
      requirements: ["patch_management_system", "test_environment", "change_approval"],
      tags: ["vulnerability_management", "patching", "automated_testing", "change_control"],
      steps: [
        {
          id: "step-201",
          name: "Vulnerability Assessment",
          type: "automated",
          description: "Scan systems for vulnerabilities and prioritize patches",
          estimatedTime: 15,
          dependencies: [],
          outputs: ["vulnerability_report", "patch_list"],
          configuration: {
            scanners: ["nessus", "qualys"],
            criticality_filter: "high"
          }
        },
        {
          id: "step-202",
          name: "Change Approval",
          type: "approval",
          description: "Request approval for patch deployment from change board",
          estimatedTime: 1440,
          dependencies: ["step-201"],
          outputs: ["approval_status", "deployment_window"],
          configuration: {
            approvers: ["change_board"],
            auto_approve_critical: true
          }
        },
        {
          id: "step-203",
          name: "Patch Testing",
          type: "automated",
          description: "Test patches in isolated environment before production deployment",
          estimatedTime: 60,
          dependencies: ["step-202"],
          outputs: ["test_results", "compatibility_report"],
          configuration: {
            test_environment: "staging",
            test_duration: 60
          }
        },
        {
          id: "step-204",
          name: "Production Deployment",
          type: "automated",
          description: "Deploy patches to production systems with monitoring",
          estimatedTime: 30,
          dependencies: ["step-203"],
          outputs: ["deployment_status", "system_health"],
          configuration: {
            deployment_method: "rolling",
            rollback_enabled: true
          }
        }
      ]
    }
  ]);

  // Mock data for executions
  const [executions] = useState([
    {
      id: "exec-001",
      playbookId: "pb-001",
      playbookName: "Malware Incident Response",
      status: "running",
      startTime: "2025-08-09T14:30:00Z",
      triggeredBy: "EDR Alert - Suspicious Process",
      currentStep: 2,
      totalSteps: 4,
      progress: 50,
      executionTime: 15,
      errors: [],
      results: {
        system_info: "Collected",
        initial_iocs: "12 indicators found",
        isolation_status: "Partially isolated"
      }
    },
    {
      id: "exec-002",
      playbookId: "pb-002",
      playbookName: "Phishing Email Investigation",
      status: "completed",
      startTime: "2025-08-09T13:45:00Z",
      endTime: "2025-08-09T14:05:00Z",
      triggeredBy: "User Report - Suspicious Email",
      currentStep: 4,
      totalSteps: 4,
      progress: 100,
      executionTime: 20,
      errors: [],
      results: {
        risk_score: 85,
        threat_classification: "Malicious",
        users_notified: 247,
        additional_victims: 3
      }
    },
    {
      id: "exec-003",
      playbookId: "pb-003",
      playbookName: "Vulnerability Patch Management",
      status: "paused",
      startTime: "2025-08-09T10:00:00Z",
      triggeredBy: "Scheduled Maintenance Window",
      currentStep: 2,
      totalSteps: 4,
      progress: 25,
      executionTime: 1500,
      errors: ["Change approval timeout"],
      results: {
        vulnerabilities_found: 23,
        critical_patches: 5,
        approval_status: "Pending"
      }
    }
  ]);

  // Mock metrics data
  const [metrics] = useState({
    totalPlaybooks: 47,
    activePlaybooks: 38,
    totalExecutions: 1247,
    successfulExecutions: 1165,
    averageExecutionTime: 32,
    timeSaved: 2840,
    incidentsResolved: 892,
    falsePositiveRate: 4.2
  });

  // Helper functions for styling
  const severityClass = (severity) => {
    switch (severity) {
      case "critical":
        return "text-red-600 bg-red-100 border-red-200";
      case "high":
        return "text-orange-600 bg-orange-100 border-orange-200";
      case "medium":
        return "text-yellow-600 bg-yellow-100 border-yellow-200";
      case "low":
        return "text-green-600 bg-green-100 border-green-200";
      default:
        return "text-gray-600 bg-gray-100 border-gray-200";
    }
  };

  const statusClass = (status) => {
    switch (status) {
      case "active":
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "draft":
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "testing":
      case "running":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "deprecated":
      case "failed":
        return "bg-red-100 text-red-800 border-red-200";
      case "cancelled":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "paused":
        return "bg-orange-100 text-orange-800 border-orange-200";
    }
  };

  const complexityClass = (complexity) => {
    switch (complexity) {
      case "simple":
        return "text-green-600";
      case "moderate":
        return "text-yellow-600";
      case "complex":
        return "text-orange-600";
      case "advanced":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const categoryIcon = (category) => {
    switch (category) {
      case "incident_response":
        return <Shield className="h-4 w-4" />;
      case "threat_hunting":
        return <Filter className="h-4 w-4" />;
      case "vulnerability_management":
        return <AlertTriangle className="h-4 w-4" />;
      case "compliance":
        return <CheckCircle className="h-4 w-4" />;
      case "user_management":
        return <Users className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const stepTypeIcon = (type) => {
    switch (type) {
      case "automated":
        return <Zap className="h-4 w-4" />;
      case "manual":
        return <Users className="h-4 w-4" />;
      case "approval":
        return <CheckCircle2 className="h-4 w-4" />;
      case "condition":
        return <Filter className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  // Filtered playbooks based on filters and search
  const filteredPlaybooks = playbooks.filter((pb) => {
    const categoryMatch = categoryFilter === "all" || pb.category === categoryFilter;
    const statusMatch = statusFilter === "all" || pb.status === statusFilter;
    const searchMatch =
      searchTerm === "" ||
      pb.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pb.description.toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatch && statusMatch && searchMatch;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Security Automation Playbooks
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl">
          Comprehensive security orchestration platform with automated incident response, threat hunting, and compliance workflows powered by AI-driven decision engines.
        </p>
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="playbooks" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Playbooks
          </TabsTrigger>
          <TabsTrigger value="executions" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Executions
          </TabsTrigger>
          <TabsTrigger value="builder" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Builder
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Playbooks</p>
                    <p className="text-3xl font-bold text-blue-600">{metrics.totalPlaybooks}</p>
                  </div>
                  <Activity className="h-8 w-8 text-blue-600" />
                </div>
                <p className="text-xs text-blue-600 mt-2">{metrics.activePlaybooks} active</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Success Rate</p>
                    <p className="text-3xl font-bold text-green-600">
                      {(metrics.successfulExecutions / metrics.totalExecutions * 100).toFixed(1)}%
                    </p>
                  </div>
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-xs text-green-600 mt-2">{metrics.successfulExecutions} successful</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Time Saved</p>
                    <p className="text-3xl font-bold text-purple-600">{metrics.timeSaved}h</p>
                  </div>
                  <Zap className="h-8 w-8 text-purple-600" />
                </div>
                <p className="text-xs text-purple-600 mt-2">This month</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Incidents Resolved</p>
                    <p className="text-3xl font-bold text-orange-600">{metrics.incidentsResolved}</p>
                  </div>
                  <Shield className="h-8 w-8 text-orange-600" />
                </div>
                <p className="text-xs text-orange-600 mt-2">Automatically handled</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Active Executions</CardTitle>
              <CardDescription>Currently running security automation playbooks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {executions.filter(e => e.status === "running").map((exec, idx) => (
                  <motion.div
                    key={exec.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * idx }}
                    className="flex items-center justify-between p-4 border rounded-lg bg-blue-50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-blue-100 rounded-full">
                        <Clock className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{exec.playbookName}</h4>
                        <p className="text-sm text-gray-600">Step {exec.currentStep} of {exec.totalSteps}</p>
                        <p className="text-xs text-gray-500">Running for {exec.executionTime} minutes</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-32">
                        <Progress value={exec.progress} />
                      </div>
                      <span className="text-sm font-medium">{exec.progress}%</span>
                      <div className="flex gap-1">
                        <Button size="sm" variant="outline">
                          <Play className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Pause className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Executions</CardTitle>
              <CardDescription>Latest playbook execution results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {executions.slice(0, 5).map((exec, idx) => (
                  <div key={exec.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${statusClass(exec.status)}`}>
                        {exec.status === "completed" && <CheckCircle2 className="h-4 w-4" />}
                        {exec.status === "failed" && <XCircle className="h-4 w-4" />}
                        {exec.status === "running" && <Clock className="h-4 w-4" />}
                        {exec.status === "paused" && <PauseCircle className="h-4 w-4" />}
                      </div>
                      <div>
                        <p className="font-semibold">{exec.playbookName}</p>
                        <p className="text-sm text-gray-600">{exec.triggeredBy}</p>
                        <p className="text-xs text-gray-500">{new Date(exec.startTime).toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={statusClass(exec.status)}>{exec.status}</Badge>
                      <p className="text-xs text-gray-500 mt-1">{exec.executionTime}m</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="playbooks" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <Input
                    placeholder="Search playbooks..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                  />
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="incident_response">Incident Response</SelectItem>
                      <SelectItem value="threat_hunting">Threat Hunting</SelectItem>
                      <SelectItem value="vulnerability_management">Vulnerability Mgmt</SelectItem>
                      <SelectItem value="compliance">Compliance</SelectItem>
                      <SelectItem value="user_management">User Management</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="testing">Testing</SelectItem>
                      <SelectItem value="deprecated">Deprecated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Import
                  </Button>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    New Playbook
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6">
            {filteredPlaybooks.map((pb, idx) => (
              <motion.div
                key={pb.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent>
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        {categoryIcon(pb.category)}
                        <div>
                          <h3 className="text-lg">{pb.name}</h3>
                          <p className="text-gray-600">{pb.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={severityClass(pb.severity)}>{pb.severity}</Badge>
                        <Badge className={statusClass(pb.status)}>{pb.status}</Badge>
                      </div>
                    </div>
                    <div className="space-y-4 mt-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="font-medium text-gray-700">Version</p>
                          <p className="text-gray-600">{pb.version}</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-700">Complexity</p>
                          <p className={`font-semibold ${complexityClass(pb.complexity)}`}>{pb.complexity}</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-700">Success Rate</p>
                          <p className="text-green-600 font-semibold">{pb.successRate}%</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-700">Avg Time</p>
                          <p className="text-gray-600">{pb.averageExecutionTime}m</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div>
                          <p className="font-medium text-gray-700 mb-1">Steps ({pb.steps.length})</p>
                          <div className="flex items-center gap-2">
                            {pb.steps.map((step, i) => (
                              <div key={step.id} className="flex items-center gap-1">
                                {stepTypeIcon(step.type)}
                                {i < pb.steps.length - 1 && <ArrowRight className="h-3 w-3 text-gray-400" />}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="font-medium text-gray-700 mb-1">Triggers</p>
                          <div className="flex flex-wrap gap-1">
                            {pb.triggers.slice(0, 3).map((trigger, i) => (
                              <Badge key={i} variant="outline" className="text-xs">{trigger}</Badge>
                            ))}
                            {pb.triggers.length > 3 && (
                              <Badge variant="outline" className="text-xs">+{pb.triggers.length - 3} more</Badge>
                            )}
                          </div>
                        </div>

                        <div>
                          <p className="font-medium text-gray-700 mb-1">Tags</p>
                          <div className="flex flex-wrap gap-1">
                            {pb.tags.slice(0, 4).map((tag, i) => (
                              <Badge key={i} variant="secondary" className="text-xs">{tag}</Badge>
                            ))}
                            {pb.tags.length > 4 && (
                              <Badge variant="secondary" className="text-xs">+{pb.tags.length - 4} more</Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-4 border-t">
                        <div className="text-sm text-gray-600">
                          <p>Executed {pb.executionCount} times</p>
                          <p>Modified {new Date(pb.lastModified).toLocaleDateString()}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button size="sm" variant="outline">
                            <Copy className="h-4 w-4 mr-1" />
                            Clone
                          </Button>
                          <Button
                            size="sm"
                            onClick={async () => {
                              setIsExecuting(true);
                              setTimeout(() => {
                                setIsExecuting(false);
                              }, 3000);
                            }}
                            disabled={isExecuting || pb.status !== "active"}
                          >
                            <Play className="h-4 w-4 mr-1" />
                            Execute
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

        <TabsContent value="executions" className="space-y-6">
          <div className="grid gap-4">
            {executions.map((exec, idx) => (
              <motion.div
                key={exec.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * idx }}
              >
                <Card>
                  <CardContent>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg">{exec.playbookName}</h3>
                        <p>Triggered by: {exec.triggeredBy}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={statusClass(exec.status)}>{exec.status}</Badge>
                        <span className="text-sm text-gray-500">{exec.executionTime}m</span>
                      </div>
                    </div>
                    <div className="space-y-4 mt-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="font-medium text-gray-700">Start Time</p>
                          <p className="text-gray-600">{new Date(exec.startTime).toLocaleString()}</p>
                        </div>
                        {exec.endTime && (
                          <div>
                            <p className="font-medium text-gray-700">End Time</p>
                            <p className="text-gray-600">{new Date(exec.endTime).toLocaleString()}</p>
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-gray-700">Progress</p>
                          <div className="flex items-center gap-2">
                            <Progress value={exec.progress} className="flex-1" />
                            <span className="text-xs">{exec.progress}%</span>
                          </div>
                        </div>
                        <div>
                          <p className="font-medium text-gray-700">Step</p>
                          <p className="text-gray-600">{exec.currentStep}/{exec.totalSteps}</p>
                        </div>
                      </div>

                      {exec.errors.length > 0 && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                          <p className="font-medium text-red-700 mb-1">Errors:</p>
                          {exec.errors.map((error, i) => (
                            <p key={i} className="text-sm text-red-600">• {error}</p>
                          ))}
                        </div>
                      )}

                      {Object.keys(exec.results).length > 0 && (
                        <div>
                          <p className="font-medium text-gray-700 mb-2">Results:</p>
                          <div className="grid grid-cols-2 gap-2">
                            {Object.entries(exec.results).map(([key, value]) => (
                              <div key={key} className="text-sm">
                                <span className="text-gray-600">{key.replace(/_/g, " ")}:</span>
                                <span className="ml-2 font-medium">{String(value)}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex justify-end gap-2 pt-4 border-t">
                        <Button size="sm" variant="outline">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          Report
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" />
                          Details
                        </Button>
                        {exec.status === "running" && (
                          <Button size="sm" variant="outline">
                            <XCircle className="h-4 w-4 mr-1" />
                            Stop
                          </Button>
                        )}
                        {exec.status === "failed" && (
                          <Button size="sm">
                            <RefreshCw className="h-4 w-4 mr-1" />
                            Retry
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="builder" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Playbook Builder</CardTitle>
              <CardDescription>Visual workflow designer for creating custom security automation playbooks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                <div className="text-center">
                  <Settings className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">Visual Playbook Designer</h3>
                  <p className="text-gray-600 mb-4">Drag-and-drop interface for building security workflows</p>
                  <div className="flex gap-2 justify-center">
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      New Playbook
                    </Button>
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Import Template
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Available Components</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[
                    { icon: Zap, label: "Automated Action" },
                    { icon: Users, label: "Manual Task" },
                    { icon: CheckCircle2, label: "Approval Gate" },
                    { icon: Filter, label: "Conditional Logic" },
                    { icon: Bell, label: "Notification" },
                    { icon: Search, label: "Data Query" }
                  ].map((comp, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 p-2 border rounded cursor-pointer hover:bg-gray-50"
                    >
                      <comp.icon className="h-4 w-4" />
                      <span className="text-sm">{comp.label}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Templates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[
                    "Incident Response Template",
                    "Phishing Investigation",
                    "Vulnerability Remediation",
                    "User Access Review",
                    "Compliance Audit",
                    "Threat Hunting Query"
                  ].map((template, idx) => (
                    <div
                      key={idx}
                      className="p-2 border rounded cursor-pointer hover:bg-blue-50 text-sm"
                    >
                      {template}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Integrations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[
                    "SIEM Platforms",
                    "Ticketing Systems",
                    "Email Gateways",
                    "EDR Solutions",
                    "Threat Intelligence",
                    "Cloud Providers"
                  ].map((integration, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2 border rounded"
                    >
                      <span className="text-sm">{integration}</span>
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Automation Efficiency</CardTitle>
                <CardDescription>Performance metrics for security automation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Average Response Time</span>
                    <span className="text-2xl font-bold text-blue-600">{metrics.averageExecutionTime}m</span>
                  </div>
                  <Progress value={75} />
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">False Positive Rate</span>
                    <span className="text-2xl font-bold text-green-600">{metrics.falsePositiveRate}%</span>
                  </div>
                  <Progress value={metrics.falsePositiveRate} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Playbook Performance</CardTitle>
                <CardDescription>Success rates by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { category: "Incident Response", rate: 94.7 },
                    { category: "Threat Hunting", rate: 97.4 },
                    { category: "Vulnerability Mgmt", rate: 91 },
                    { category: "Compliance", rate: 98.2 },
                    { category: "User Management", rate: 95.8 }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{item.category}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24">
                          <Progress value={item.rate} />
                        </div>
                        <span className="text-sm text-gray-600 min-w-[3rem] text-right">{item.rate}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              Security automation has improved incident response time by 78% and reduced manual effort by {metrics.timeSaved} hours this month, with a {metrics.falsePositiveRate}% false positive rate.
            </AlertDescription>
          </Alert>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SecurityPlaybooks;
