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
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileText,
  Calendar,
  Clock,
  Users,
  Target,
  BarChart3,
  PieChart,
  TrendingUp,
  TrendingDown,
  Search,
  Filter,
  Download,
  RefreshCw,
  Play,
  Pause,
  Eye,
  Settings,
  Award,
  Star,
  Crown,
  Flag,
  Bell,
  AlertCircle,
  Info,
  CheckCircle,
  XOctagon,
  Zap,
  Activity,
  Gauge,
  Timer,
  Archive,
  History,
  GitBranch,
  Workflow,
  Layers,
  Network,
  Server,
  Database,
  Globe,
  Lock,
  Unlock,
  Key,
  ShieldCheck,
  ShieldX,
  ShieldAlert,
  Code,
  Terminal,
  FileCheck,
  FilePlus,
  FileX,
  Folder,
  FolderOpen,
  BookOpen,
  Book,
  Bookmark,
  Tag,
  Tags,
  Link,
  ExternalLink,
  Mail,
  Phone,
  MessageSquare,
  UserCheck,
  UserX,
  Building,
  MapPin,
  Calendar as CalendarIcon,
  Plus,
  Minus,
  ArrowUp,
  ArrowDown,
  ArrowRight,
  ArrowLeft,
  Edit,
  Trash,
  Copy,
  Share,
  Upload,
  RotateCcw,
  CheckCheck,
  AlertOctagon,
  Ban,
  HelpCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

interface ComplianceFramework {
  id: string;
  name: string;
  version: string;
  description: string;
  type: 'regulatory' | 'industry' | 'internal' | 'certification';
  status: 'active' | 'inactive' | 'draft';
  applicableRegions: string[];
  businessUnits: string[];
  totalControls: number;
  implementedControls: number;
  compliantControls: number;
  nonCompliantControls: number;
  overallScore: number;
  lastAssessment: string;
  nextAssessment: string;
  auditor?: string;
  certificationExpiry?: string;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  tags: string[];
}

interface ComplianceControl {
  id: string;
  frameworkId: string;
  controlId: string;
  title: string;
  description: string;
  category: string;
  subCategory?: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  status: 'compliant' | 'non_compliant' | 'partially_compliant' | 'not_applicable' | 'not_assessed';
  implementationStatus: 'implemented' | 'in_progress' | 'planned' | 'not_started';
  automationLevel: 'fully_automated' | 'partially_automated' | 'manual';
  lastAssessed: string;
  nextAssessment: string;
  assessor: string;
  evidence: Evidence[];
  remediation: RemediationAction[];
  riskRating: number;
  businessImpact: 'high' | 'medium' | 'low';
  implementationGuidance: string;
  testingProcedure: string;
  owner: string;
  tags: string[];
}

interface Evidence {
  id: string;
  type: 'document' | 'screenshot' | 'log' | 'policy' | 'procedure' | 'configuration' | 'certificate';
  name: string;
  description: string;
  uploadedBy: string;
  uploadedDate: string;
  lastModified: string;
  version: string;
  filePath: string;
  hash: string;
  approvalStatus: 'approved' | 'pending' | 'rejected';
  approver?: string;
  expiryDate?: string;
}

interface RemediationAction {
  id: string;
  title: string;
  description: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  status: 'open' | 'in_progress' | 'completed' | 'cancelled';
  assignee: string;
  dueDate: string;
  estimatedEffort: number; // hours
  actualEffort?: number; // hours
  dependencies: string[];
  progress: number;
  notes: string[];
}

interface ComplianceAudit {
  id: string;
  frameworkId: string;
  type: 'internal' | 'external' | 'certification' | 'regulatory';
  title: string;
  description: string;
  auditor: string;
  auditorOrganization?: string;
  startDate: string;
  endDate: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  scope: string[];
  findings: AuditFinding[];
  overallRating: 'excellent' | 'good' | 'satisfactory' | 'needs_improvement' | 'inadequate';
  finalReport?: string;
  certificationIssued?: boolean;
  followUpRequired: boolean;
}

interface AuditFinding {
  id: string;
  controlId: string;
  severity: 'critical' | 'high' | 'medium' | 'low' | 'informational';
  category: 'non_compliance' | 'gap' | 'weakness' | 'observation' | 'best_practice';
  title: string;
  description: string;
  evidence: string[];
  recommendation: string;
  managementResponse?: string;
  remediation?: RemediationAction;
  status: 'open' | 'in_progress' | 'resolved' | 'accepted';
}

interface ComplianceReport {
  id: string;
  type: 'executive_summary' | 'detailed_assessment' | 'gap_analysis' | 'remediation_plan' | 'audit_report';
  title: string;
  framework: string;
  generatedDate: string;
  reportPeriod: {
    startDate: string;
    endDate: string;
  };
  recipient: string;
  status: 'draft' | 'pending_review' | 'approved' | 'published';
  metrics: ComplianceMetrics;
  filePath?: string;
  lastModified: string;
  approver?: string;
}

interface ComplianceMetrics {
  totalFrameworks: number;
  activeFrameworks: number;
  overallComplianceScore: number;
  criticalControls: number;
  compliantControls: number;
  nonCompliantControls: number;
  partiallyCompliantControls: number;
  notAssessedControls: number;
  overdueAssessments: number;
  upcomingAssessments: number;
  openFindings: number;
  criticalFindings: number;
  automatedControls: number;
  manualControls: number;
  averageRemediationTime: number;
  complianceTrend: 'improving' | 'stable' | 'declining';
}

interface ComplianceTask {
  id: string;
  type: 'assessment' | 'remediation' | 'documentation' | 'audit_preparation' | 'training';
  title: string;
  description: string;
  framework: string;
  controlId?: string;
  assignee: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  status: 'not_started' | 'in_progress' | 'pending_review' | 'completed' | 'overdue';
  dueDate: string;
  estimatedHours: number;
  actualHours?: number;
  progress: number;
  dependencies: string[];
  artifacts: string[];
  notes: string[];
}

const ComplianceAutomation: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedFramework, setSelectedFramework] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);

  const [complianceMetrics] = useState<ComplianceMetrics>({
    totalFrameworks: 8,
    activeFrameworks: 6,
    overallComplianceScore: 87.3,
    criticalControls: 156,
    compliantControls: 1247,
    nonCompliantControls: 89,
    partiallyCompliantControls: 234,
    notAssessedControls: 67,
    overdueAssessments: 12,
    upcomingAssessments: 45,
    openFindings: 78,
    criticalFindings: 15,
    automatedControls: 892,
    manualControls: 345,
    averageRemediationTime: 18.5,
    complianceTrend: 'improving'
  });

  const [complianceFrameworks] = useState<ComplianceFramework[]>([
    {
      id: 'fw-001',
      name: 'SOC 2 Type II',
      version: '2017',
      description: 'Service Organization Control 2 Type II attestation for security, availability, processing integrity, confidentiality, and privacy',
      type: 'certification',
      status: 'active',
      applicableRegions: ['United States', 'Global'],
      businessUnits: ['Technology', 'Operations', 'Security'],
      totalControls: 67,
      implementedControls: 65,
      compliantControls: 63,
      nonCompliantControls: 2,
      overallScore: 94.0,
      lastAssessment: '2025-06-15T00:00:00Z',
      nextAssessment: '2026-06-15T00:00:00Z',
      auditor: 'KPMG',
      certificationExpiry: '2026-06-15T00:00:00Z',
      riskLevel: 'low',
      tags: ['certification', 'annual', 'external_audit']
    },
    {
      id: 'fw-002',
      name: 'ISO 27001:2022',
      version: '2022',
      description: 'Information Security Management System standard providing requirements for establishing, implementing, maintaining and continually improving an ISMS',
      type: 'certification',
      status: 'active',
      applicableRegions: ['Global'],
      businessUnits: ['All'],
      totalControls: 114,
      implementedControls: 108,
      compliantControls: 87,
      nonCompliantControls: 21,
      overallScore: 76.3,
      lastAssessment: '2025-05-20T00:00:00Z',
      nextAssessment: '2025-11-20T00:00:00Z',
      auditor: 'BSI Group',
      certificationExpiry: '2026-05-20T00:00:00Z',
      riskLevel: 'medium',
      tags: ['certification', 'biannual', 'information_security']
    },
    {
      id: 'fw-003',
      name: 'PCI DSS',
      version: '4.0',
      description: 'Payment Card Industry Data Security Standard for organizations that handle credit card transactions',
      type: 'industry',
      status: 'active',
      applicableRegions: ['Global'],
      businessUnits: ['Payment Processing', 'E-commerce'],
      totalControls: 315,
      implementedControls: 298,
      compliantControls: 281,
      nonCompliantControls: 17,
      overallScore: 89.2,
      lastAssessment: '2025-07-01T00:00:00Z',
      nextAssessment: '2026-07-01T00:00:00Z',
      auditor: 'Qualified Security Assessor',
      riskLevel: 'high',
      tags: ['quarterly', 'payment_security', 'mandatory']
    },
    {
      id: 'fw-004',
      name: 'GDPR',
      version: '2018',
      description: 'General Data Protection Regulation for data protection and privacy in the European Union',
      type: 'regulatory',
      status: 'active',
      applicableRegions: ['European Union', 'EEA'],
      businessUnits: ['All'],
      totalControls: 87,
      implementedControls: 82,
      compliantControls: 71,
      nonCompliantControls: 11,
      overallScore: 81.6,
      lastAssessment: '2025-04-10T00:00:00Z',
      nextAssessment: '2025-10-10T00:00:00Z',
      riskLevel: 'high',
      tags: ['regulatory', 'privacy', 'data_protection']
    },
    {
      id: 'fw-005',
      name: 'NIST Cybersecurity Framework',
      version: '2.0',
      description: 'National Institute of Standards and Technology Cybersecurity Framework',
      type: 'industry',
      status: 'active',
      applicableRegions: ['United States'],
      businessUnits: ['Security', 'IT', 'Risk Management'],
      totalControls: 108,
      implementedControls: 95,
      compliantControls: 78,
      nonCompliantControls: 17,
      overallScore: 72.2,
      lastAssessment: '2025-03-15T00:00:00Z',
      nextAssessment: '2025-09-15T00:00:00Z',
      riskLevel: 'medium',
      tags: ['cybersecurity', 'risk_management', 'voluntary']
    }
  ]);

  const [complianceControls] = useState<ComplianceControl[]>([
    {
      id: 'ctrl-001',
      frameworkId: 'fw-001',
      controlId: 'CC6.1',
      title: 'Logical and Physical Access Controls',
      description: 'The entity implements logical and physical access controls to protect against threats from sources outside its system boundaries',
      category: 'Access Controls',
      priority: 'critical',
      status: 'compliant',
      implementationStatus: 'implemented',
      automationLevel: 'partially_automated',
      lastAssessed: '2025-06-10T00:00:00Z',
      nextAssessment: '2025-12-10T00:00:00Z',
      assessor: 'Internal Security Team',
      evidence: [
        {
          id: 'ev-001',
          type: 'policy',
          name: 'Access Control Policy v2.1',
          description: 'Corporate access control policy document',
          uploadedBy: 'Security Manager',
          uploadedDate: '2025-06-01T00:00:00Z',
          lastModified: '2025-06-01T00:00:00Z',
          version: '2.1',
          filePath: '/evidence/access-control-policy-v2.1.pdf',
          hash: 'sha256:a1b2c3d4e5f6...',
          approvalStatus: 'approved',
          approver: 'CISO'
        }
      ],
      remediation: [],
      riskRating: 25,
      businessImpact: 'high',
      implementationGuidance: 'Implement multi-factor authentication, role-based access controls, and regular access reviews',
      testingProcedure: 'Review access control configurations, test authentication mechanisms, validate authorization rules',
      owner: 'Security Team',
      tags: ['access_control', 'authentication', 'authorization']
    },
    {
      id: 'ctrl-002',
      frameworkId: 'fw-002',
      controlId: 'A.8.2.3',
      title: 'Handling of Privileged Access Rights',
      description: 'The allocation and use of privileged access rights shall be restricted and controlled',
      category: 'Access Management',
      priority: 'critical',
      status: 'non_compliant',
      implementationStatus: 'in_progress',
      automationLevel: 'manual',
      lastAssessed: '2025-05-15T00:00:00Z',
      nextAssessment: '2025-08-15T00:00:00Z',
      assessor: 'External Auditor',
      evidence: [],
      remediation: [
        {
          id: 'rem-001',
          title: 'Implement Privileged Access Management System',
          description: 'Deploy and configure PAM solution for privileged account management',
          priority: 'critical',
          status: 'in_progress',
          assignee: 'Security Engineer',
          dueDate: '2025-08-30T00:00:00Z',
          estimatedEffort: 120,
          actualEffort: 45,
          dependencies: [],
          progress: 60,
          notes: ['PAM solution selected', 'Implementation phase 1 completed', 'Testing in progress']
        }
      ],
      riskRating: 87,
      businessImpact: 'high',
      implementationGuidance: 'Deploy privileged access management system with session recording and approval workflows',
      testingProcedure: 'Test privileged account provisioning, approval processes, and session monitoring',
      owner: 'IT Security Team',
      tags: ['privileged_access', 'pam', 'high_risk']
    },
    {
      id: 'ctrl-003',
      frameworkId: 'fw-003',
      controlId: '3.4.1',
      title: 'Display of PAN',
      description: 'PAN is masked when displayed (the BIN and last four digits are the maximum number of digits to be displayed)',
      category: 'Data Protection',
      priority: 'high',
      status: 'compliant',
      implementationStatus: 'implemented',
      automationLevel: 'fully_automated',
      lastAssessed: '2025-07-01T00:00:00Z',
      nextAssessment: '2025-10-01T00:00:00Z',
      assessor: 'QSA',
      evidence: [
        {
          id: 'ev-002',
          type: 'screenshot',
          name: 'PAN Masking Screenshots',
          description: 'Screenshots showing PAN masking in all applications',
          uploadedBy: 'Compliance Officer',
          uploadedDate: '2025-06-25T00:00:00Z',
          lastModified: '2025-06-25T00:00:00Z',
          version: '1.0',
          filePath: '/evidence/pan-masking-screenshots.zip',
          hash: 'sha256:b2c3d4e5f6g7...',
          approvalStatus: 'approved',
          approver: 'QSA'
        }
      ],
      remediation: [],
      riskRating: 15,
      businessImpact: 'medium',
      implementationGuidance: 'Configure application to display only BIN and last 4 digits of PAN',
      testingProcedure: 'Review all applications and screens that display PAN to verify masking',
      owner: 'Application Security Team',
      tags: ['pan_masking', 'data_protection', 'automated']
    }
  ]);

  const [complianceAudits] = useState<ComplianceAudit[]>([
    {
      id: 'audit-001',
      frameworkId: 'fw-001',
      type: 'external',
      title: 'SOC 2 Type II Annual Audit',
      description: 'Annual SOC 2 Type II audit for security, availability, and confidentiality',
      auditor: 'Jane Smith, CPA',
      auditorOrganization: 'KPMG',
      startDate: '2025-06-01T00:00:00Z',
      endDate: '2025-06-30T00:00:00Z',
      status: 'completed',
      scope: ['Security', 'Availability', 'Confidentiality'],
      findings: [
        {
          id: 'find-001',
          controlId: 'CC6.7',
          severity: 'medium',
          category: 'weakness',
          title: 'Incomplete Access Reviews',
          description: 'Quarterly access reviews were not performed for all privileged accounts during the audit period',
          evidence: ['Access review logs', 'Email communications', 'Policy documentation'],
          recommendation: 'Implement automated reminders and tracking system for access reviews',
          managementResponse: 'Management agrees and will implement automated tracking by Q3 2025',
          status: 'open'
        }
      ],
      overallRating: 'good',
      finalReport: '/reports/soc2-2025-final-report.pdf',
      certificationIssued: true,
      followUpRequired: true
    },
    {
      id: 'audit-002',
      frameworkId: 'fw-002',
      type: 'certification',
      title: 'ISO 27001 Surveillance Audit',
      description: 'Annual surveillance audit for ISO 27001 certification maintenance',
      auditor: 'Michael Johnson',
      auditorOrganization: 'BSI Group',
      startDate: '2025-05-15T00:00:00Z',
      endDate: '2025-05-20T00:00:00Z',
      status: 'completed',
      scope: ['Information Security Management System'],
      findings: [
        {
          id: 'find-002',
          controlId: 'A.8.2.3',
          severity: 'high',
          category: 'non_compliance',
          title: 'Missing Privileged Access Management',
          description: 'No formal privileged access management system in place',
          evidence: ['System configurations', 'Access logs', 'Interview notes'],
          recommendation: 'Implement comprehensive PAM solution within 90 days',
          managementResponse: 'PAM solution procurement approved, implementation scheduled for Q3 2025',
          status: 'in_progress'
        }
      ],
      overallRating: 'satisfactory',
      finalReport: '/reports/iso27001-surveillance-2025.pdf',
      certificationIssued: false,
      followUpRequired: true
    }
  ]);

  const [complianceTasks] = useState<ComplianceTask[]>([
    {
      id: 'task-001',
      type: 'remediation',
      title: 'Implement Privileged Access Management System',
      description: 'Deploy and configure PAM solution to address audit finding',
      framework: 'ISO 27001',
      controlId: 'A.8.2.3',
      assignee: 'Security Engineer',
      priority: 'critical',
      status: 'in_progress',
      dueDate: '2025-08-30T00:00:00Z',
      estimatedHours: 120,
      actualHours: 45,
      progress: 60,
      dependencies: [],
      artifacts: ['PAM Solution Requirements', 'Implementation Plan', 'Test Results'],
      notes: ['Vendor selected', 'Hardware ordered', 'Configuration 60% complete']
    },
    {
      id: 'task-002',
      type: 'assessment',
      title: 'Quarterly PCI DSS Self-Assessment',
      description: 'Conduct quarterly self-assessment questionnaire for PCI DSS compliance',
      framework: 'PCI DSS',
      assignee: 'Compliance Officer',
      priority: 'high',
      status: 'not_started',
      dueDate: '2025-09-01T00:00:00Z',
      estimatedHours: 16,
      progress: 0,
      dependencies: [],
      artifacts: [],
      notes: []
    },
    {
      id: 'task-003',
      type: 'documentation',
      title: 'Update Data Protection Impact Assessment',
      description: 'Review and update DPIA for new data processing activities',
      framework: 'GDPR',
      assignee: 'Privacy Officer',
      priority: 'medium',
      status: 'pending_review',
      dueDate: '2025-08-15T00:00:00Z',
      estimatedHours: 24,
      actualHours: 20,
      progress: 90,
      dependencies: [],
      artifacts: ['Updated DPIA Document', 'Legal Review Comments'],
      notes: ['Legal review in progress', 'Minor updates required']
    }
  ]);

  const getFrameworkTypeIcon = (type: string) => {
    switch (type) {
      case 'regulatory': return <Building className="h-4 w-4" />;
      case 'industry': return <Award className="h-4 w-4" />;
      case 'internal': return <FileText className="h-4 w-4" />;
      case 'certification': return <Crown className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'bg-green-100 text-green-800';
      case 'non_compliant': return 'bg-red-100 text-red-800';
      case 'partially_compliant': return 'bg-yellow-100 text-yellow-800';
      case 'not_applicable': return 'bg-gray-100 text-gray-800';
      case 'not_assessed': return 'bg-blue-100 text-blue-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'critical': return <AlertOctagon className="h-4 w-4 text-red-600" />;
      case 'high': return <AlertTriangle className="h-4 w-4 text-orange-600" />;
      case 'medium': return <Flag className="h-4 w-4 text-yellow-600" />;
      case 'low': return <Info className="h-4 w-4 text-blue-600" />;
      default: return <Info className="h-4 w-4 text-gray-600" />;
    }
  };

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'critical': return 'text-red-600';
      case 'high': return 'text-orange-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getComplianceScoreColor = (score: number) => {
    if (score >= 95) return 'text-green-600';
    if (score >= 85) return 'text-blue-600';
    if (score >= 75) return 'text-yellow-600';
    if (score >= 65) return 'text-orange-600';
    return 'text-red-600';
  };

  const getAutomationLevelColor = (level: string) => {
    switch (level) {
      case 'fully_automated': return 'bg-green-100 text-green-800';
      case 'partially_automated': return 'bg-blue-100 text-blue-800';
      case 'manual': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredFrameworks = complianceFrameworks.filter(framework => {
    const matchesSearch = framework.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         framework.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || framework.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const filteredControls = complianceControls.filter(control => {
    const matchesSearch = control.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         control.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         control.controlId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFramework = selectedFramework === 'all' || control.frameworkId === selectedFramework;
    const matchesStatus = selectedStatus === 'all' || control.status === selectedStatus;
    
    return matchesSearch && matchesFramework && matchesStatus;
  });

  const calculateDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate);
    const now = new Date();
    const diffTime = due.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 1000);
      }, 60000); // Refresh every minute

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
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Compliance Automation Platform
            </h1>
            <p className="text-lg text-gray-600 mt-2">
              Automated compliance management, continuous monitoring, and audit readiness across regulatory frameworks
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
              Generate Report
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              New Assessment
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
                    <Target className="h-6 w-6 text-purple-600" />
                  </div>
                  <p className={`text-2xl font-bold ${getComplianceScoreColor(complianceMetrics.overallComplianceScore)}`}>
                    {complianceMetrics.overallComplianceScore}%
                  </p>
                  <p className="text-sm text-gray-600">Overall Score</p>
                  <div className="mt-2">
                    <Progress value={complianceMetrics.overallComplianceScore} className="h-2" />
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
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                  </div>
                  <p className="text-2xl font-bold text-green-600">{complianceMetrics.compliantControls}</p>
                  <p className="text-sm text-gray-600">Compliant</p>
                  <div className="mt-1">
                    <Badge className="bg-green-100 text-green-800">
                      Controls
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
                    <XCircle className="h-6 w-6 text-red-600" />
                  </div>
                  <p className="text-2xl font-bold text-red-600">{complianceMetrics.nonCompliantControls}</p>
                  <p className="text-sm text-gray-600">Non-Compliant</p>
                  <div className="mt-1">
                    <Badge className="bg-red-100 text-red-800">
                      {complianceMetrics.criticalFindings} Critical
                    </Badge>
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
                    <Clock className="h-6 w-6 text-orange-600" />
                  </div>
                  <p className="text-2xl font-bold text-orange-600">{complianceMetrics.overdueAssessments}</p>
                  <p className="text-sm text-gray-600">Overdue</p>
                  <div className="mt-1">
                    <Badge className="bg-blue-100 text-blue-800">
                      {complianceMetrics.upcomingAssessments} Upcoming
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
                    <Zap className="h-6 w-6 text-blue-600" />
                  </div>
                  <p className="text-2xl font-bold text-blue-600">{complianceMetrics.automatedControls}</p>
                  <p className="text-sm text-gray-600">Automated</p>
                  <div className="mt-1">
                    <Badge className="bg-gray-100 text-gray-800">
                      {complianceMetrics.manualControls} Manual
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
                    <Timer className="h-6 w-6 text-indigo-600" />
                  </div>
                  <p className="text-2xl font-bold text-indigo-600">{complianceMetrics.averageRemediationTime}d</p>
                  <p className="text-sm text-gray-600">Avg Remediation</p>
                  <div className="mt-1">
                    <div className="flex items-center justify-center gap-1">
                      <TrendingDown className="h-3 w-3 text-green-600" />
                      <span className="text-xs text-green-600">-2.3d</span>
                    </div>
                  </div>
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
          <TabsTrigger value="frameworks" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Frameworks
          </TabsTrigger>
          <TabsTrigger value="controls" className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" />
            Controls
          </TabsTrigger>
          <TabsTrigger value="audits" className="flex items-center gap-2">
            <Award className="h-4 w-4" />
            Audits
          </TabsTrigger>
          <TabsTrigger value="tasks" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Tasks
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Reports
          </TabsTrigger>
        </TabsList>

        {/* Dashboard Overview */}
        <TabsContent value="dashboard" className="space-y-6">
          {/* Compliance Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Compliance Status Distribution
                </CardTitle>
                <CardDescription>Current compliance status across all controls</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { status: 'compliant', count: complianceMetrics.compliantControls, color: 'bg-green-500' },
                    { status: 'partially_compliant', count: complianceMetrics.partiallyCompliantControls, color: 'bg-yellow-500' },
                    { status: 'non_compliant', count: complianceMetrics.nonCompliantControls, color: 'bg-red-500' },
                    { status: 'not_assessed', count: complianceMetrics.notAssessedControls, color: 'bg-gray-500' }
                  ].map((item) => {
                    const total = complianceMetrics.compliantControls + complianceMetrics.partiallyCompliantControls + 
                                 complianceMetrics.nonCompliantControls + complianceMetrics.notAssessedControls;
                    const percentage = total > 0 ? (item.count / total) * 100 : 0;
                    return (
                      <div key={item.status} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                          <span className="capitalize font-medium">{item.status.replace('_', ' ')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress value={percentage} className="w-24 h-2" />
                          <span className="text-sm font-medium w-12 text-right">{item.count}</span>
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
                  Compliance Trends
                </CardTitle>
                <CardDescription>Key performance trends and automation metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">
                      {Math.round((complianceMetrics.automatedControls / (complianceMetrics.automatedControls + complianceMetrics.manualControls)) * 100)}%
                    </p>
                    <p className="text-sm text-gray-600">Automation Rate</p>
                    <div className="flex items-center justify-center gap-1 mt-1">
                      <TrendingUp className="h-3 w-3 text-green-600" />
                      <span className="text-xs text-green-600">+5.2%</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{complianceMetrics.activeFrameworks}</p>
                    <p className="text-sm text-gray-600">Active Frameworks</p>
                    <div className="flex items-center justify-center gap-1 mt-1">
                      <TrendingUp className="h-3 w-3 text-blue-600" />
                      <span className="text-xs text-blue-600">Stable</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-orange-600">{complianceMetrics.averageRemediationTime}d</p>
                    <p className="text-sm text-gray-600">Avg Resolution</p>
                    <div className="flex items-center justify-center gap-1 mt-1">
                      <TrendingDown className="h-3 w-3 text-green-600" />
                      <span className="text-xs text-green-600">-2.3d</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">{complianceMetrics.openFindings}</p>
                    <p className="text-sm text-gray-600">Open Findings</p>
                    <div className="flex items-center justify-center gap-1 mt-1">
                      <TrendingDown className="h-3 w-3 text-green-600" />
                      <span className="text-xs text-green-600">-12%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Framework Status Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Framework Compliance Status
              </CardTitle>
              <CardDescription>Current compliance status across all active frameworks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {complianceFrameworks.slice(0, 4).map((framework, index) => (
                  <motion.div
                    key={framework.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border rounded-lg p-4"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          {getFrameworkTypeIcon(framework.type)}
                          <h3 className="font-semibold">{framework.name}</h3>
                          <Badge className={getStatusColor(framework.status)}>
                            {framework.status}
                          </Badge>
                          <Badge variant="outline">v{framework.version}</Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm mb-2">
                          <span className="flex items-center gap-1">
                            <CheckCircle2 className="h-3 w-3" />
                            {framework.compliantControls}/{framework.totalControls} compliant
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Next: {new Date(framework.nextAssessment).toLocaleDateString()}
                          </span>
                          {framework.auditor && (
                            <span className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {framework.auditor}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress value={(framework.compliantControls / framework.totalControls) * 100} className="flex-1 h-2" />
                          <span className="text-sm font-medium">{Math.round((framework.compliantControls / framework.totalControls) * 100)}%</span>
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <div className={`text-2xl font-bold ${getComplianceScoreColor(framework.overallScore)}`}>
                          {framework.overallScore}%
                        </div>
                        <p className="text-xs text-gray-600">Overall Score</p>
                        <Badge className={`mt-1 ${
                          framework.riskLevel === 'low' ? 'bg-green-100 text-green-800' :
                          framework.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          framework.riskLevel === 'high' ? 'bg-orange-100 text-orange-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {framework.riskLevel} risk
                        </Badge>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity and Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Recent Compliance Activity
              </CardTitle>
              <CardDescription>Latest compliance events, assessments, and alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>URGENT:</strong> 12 compliance assessments are overdue and require immediate attention
                  </AlertDescription>
                </Alert>
                <Alert>
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertDescription>
                    SOC 2 Type II audit completed successfully - certificate valid until June 2026
                  </AlertDescription>
                </Alert>
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    New NIST Cybersecurity Framework 2.0 controls added - review and assessment required
                  </AlertDescription>
                </Alert>
                <Alert>
                  <Clock className="h-4 w-4" />
                  <AlertDescription>
                    PCI DSS quarterly self-assessment due September 1st - preparation materials available
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Frameworks Tab */}
        <TabsContent value="frameworks" className="space-y-6">
          {/* Search and Filter Controls */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search frameworks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Framework
            </Button>
          </div>

          {/* Frameworks Grid */}
          <div className="grid gap-6">
            {filteredFrameworks.map((framework, index) => (
              <motion.div
                key={framework.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          {getFrameworkTypeIcon(framework.type)}
                          <CardTitle className="text-lg">{framework.name}</CardTitle>
                          <Badge className={getStatusColor(framework.status)}>
                            {framework.status}
                          </Badge>
                          <Badge variant="outline">v{framework.version}</Badge>
                        </div>
                        <CardDescription className="mb-3">{framework.description}</CardDescription>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>Type: {framework.type}</span>
                          <span>Controls: {framework.totalControls}</span>
                          <span>Regions: {framework.applicableRegions.join(', ')}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-3xl font-bold ${getComplianceScoreColor(framework.overallScore)}`}>
                          {framework.overallScore}%
                        </div>
                        <p className="text-xs text-gray-600">Compliance Score</p>
                        <Badge className={`mt-1 ${
                          framework.riskLevel === 'low' ? 'bg-green-100 text-green-800' :
                          framework.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          framework.riskLevel === 'high' ? 'bg-orange-100 text-orange-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {framework.riskLevel} risk
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Control Status Summary */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Control Implementation Status</span>
                        <span className="text-sm text-gray-600">
                          {framework.implementedControls} of {framework.totalControls} implemented
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-center text-sm">
                        <div>
                          <p className="text-xl font-bold text-green-600">{framework.compliantControls}</p>
                          <p className="text-gray-600">Compliant</p>
                        </div>
                        <div>
                          <p className="text-xl font-bold text-red-600">{framework.nonCompliantControls}</p>
                          <p className="text-gray-600">Non-Compliant</p>
                        </div>
                        <div>
                          <p className="text-xl font-bold text-gray-600">{framework.totalControls - framework.implementedControls}</p>
                          <p className="text-gray-600">Not Implemented</p>
                        </div>
                      </div>
                      <Progress 
                        value={(framework.compliantControls / framework.totalControls) * 100} 
                        className="mt-3 h-2" 
                      />
                    </div>

                    {/* Assessment Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium">Last Assessment</p>
                        <p className="text-gray-600">{new Date(framework.lastAssessment).toLocaleDateString()}</p>
                        {framework.auditor && (
                          <p className="text-gray-600">by {framework.auditor}</p>
                        )}
                      </div>
                      <div>
                        <p className="font-medium">Next Assessment</p>
                        <p className="text-gray-600">{new Date(framework.nextAssessment).toLocaleDateString()}</p>
                        <p className="text-gray-600">
                          ({calculateDaysUntilDue(framework.nextAssessment)} days)
                        </p>
                      </div>
                    </div>

                    {/* Business Units and Tags */}
                    <div>
                      <p className="font-medium text-sm mb-2">Business Units</p>
                      <div className="flex flex-wrap gap-2">
                        {framework.businessUnits.map((unit, idx) => (
                          <Badge key={idx} variant="secondary">
                            {unit}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="font-medium text-sm mb-2">Tags</p>
                      <div className="flex flex-wrap gap-2">
                        {framework.tags.map((tag, idx) => (
                          <Badge key={idx} variant="outline">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center gap-2">
                        {framework.certificationExpiry && (
                          <Badge variant="outline">
                            Cert expires: {new Date(framework.certificationExpiry).toLocaleDateString()}
                          </Badge>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                        <Button size="sm" variant="outline">
                          <FileText className="h-4 w-4 mr-2" />
                          Controls
                        </Button>
                        <Button size="sm">
                          <Play className="h-4 w-4 mr-2" />
                          Start Assessment
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Additional tab content would continue here but truncated for length */}
      </Tabs>
    </div>
  );
};

export default ComplianceAutomation;