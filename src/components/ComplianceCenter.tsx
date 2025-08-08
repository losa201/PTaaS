import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { 
  Shield, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  FileText, 
  Download,
  Calendar,
  Users,
  Database,
  Globe,
  Lock,
  Eye,
  TrendingUp,
  BarChart3,
  Filter,
  Search,
  RefreshCw
} from 'lucide-react';
import { motion } from 'framer-motion';

interface ComplianceFramework {
  id: string;
  name: string;
  version: string;
  description: string;
  overallScore: number;
  totalRequirements: number;
  compliantRequirements: number;
  nonCompliantRequirements: number;
  partiallyCompliantRequirements: number;
  lastAssessment: string;
  nextAssessment: string;
  criticality: 'high' | 'medium' | 'low';
  industry: string[];
  logo?: string;
}

interface ComplianceRequirement {
  id: string;
  frameworkId: string;
  requirementNumber: string;
  title: string;
  description: string;
  status: 'compliant' | 'non_compliant' | 'partially_compliant' | 'not_assessed';
  score: number;
  lastTested: string;
  evidence: string[];
  remediation?: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  category: string;
  automatedTest: boolean;
}

interface AuditReport {
  id: string;
  framework: string;
  reportType: 'internal' | 'external' | 'regulatory';
  createdDate: string;
  status: 'draft' | 'completed' | 'submitted';
  auditor: string;
  findings: number;
  recommendations: number;
  score: number;
}

const ComplianceCenter: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedFramework, setSelectedFramework] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const [frameworks, setFrameworks] = useState<ComplianceFramework[]>([
    {
      id: 'pci-dss',
      name: 'PCI DSS',
      version: '4.0',
      description: 'Payment Card Industry Data Security Standard',
      overallScore: 87,
      totalRequirements: 321,
      compliantRequirements: 279,
      nonCompliantRequirements: 23,
      partiallyCompliantRequirements: 19,
      lastAssessment: '2025-07-15',
      nextAssessment: '2025-10-15',
      criticality: 'high',
      industry: ['financial', 'retail', 'ecommerce']
    },
    {
      id: 'hipaa',
      name: 'HIPAA',
      version: '2013 Omnibus',
      description: 'Health Insurance Portability and Accountability Act',
      overallScore: 92,
      totalRequirements: 164,
      compliantRequirements: 151,
      nonCompliantRequirements: 8,
      partiallyCompliantRequirements: 5,
      lastAssessment: '2025-08-01',
      nextAssessment: '2025-11-01',
      criticality: 'high',
      industry: ['healthcare', 'medical']
    },
    {
      id: 'sox',
      name: 'SOX',
      version: '2002',
      description: 'Sarbanes-Oxley Act',
      overallScore: 94,
      totalRequirements: 89,
      compliantRequirements: 84,
      nonCompliantRequirements: 3,
      partiallyCompliantRequirements: 2,
      lastAssessment: '2025-06-30',
      nextAssessment: '2025-09-30',
      criticality: 'high',
      industry: ['financial', 'public_companies']
    },
    {
      id: 'gdpr',
      name: 'GDPR',
      version: '2018',
      description: 'General Data Protection Regulation',
      overallScore: 89,
      totalRequirements: 99,
      compliantRequirements: 88,
      nonCompliantRequirements: 7,
      partiallyCompliantRequirements: 4,
      lastAssessment: '2025-07-20',
      nextAssessment: '2025-10-20',
      criticality: 'high',
      industry: ['all']
    },
    {
      id: 'iso27001',
      name: 'ISO 27001',
      version: '2022',
      description: 'Information Security Management',
      overallScore: 78,
      totalRequirements: 114,
      compliantRequirements: 89,
      nonCompliantRequirements: 15,
      partiallyCompliantRequirements: 10,
      lastAssessment: '2025-05-15',
      nextAssessment: '2025-11-15',
      criticality: 'medium',
      industry: ['technology', 'all']
    }
  ]);

  const [requirements, setRequirements] = useState<ComplianceRequirement[]>([
    {
      id: 'pci-1.1.1',
      frameworkId: 'pci-dss',
      requirementNumber: '1.1.1',
      title: 'Network Security Controls',
      description: 'Establish and implement network security controls',
      status: 'compliant',
      score: 95,
      lastTested: '2025-08-01',
      evidence: ['Firewall configuration review', 'Network segmentation validation'],
      priority: 'high',
      category: 'Network Security',
      automatedTest: true
    },
    {
      id: 'pci-6.5.1',
      frameworkId: 'pci-dss',
      requirementNumber: '6.5.1',
      title: 'Injection Flaws',
      description: 'Address common vulnerabilities including injection flaws',
      status: 'non_compliant',
      score: 45,
      lastTested: '2025-07-28',
      evidence: ['SAST scan results', 'Penetration test findings'],
      remediation: 'Implement input validation and parameterized queries',
      priority: 'critical',
      category: 'Application Security',
      automatedTest: true
    },
    {
      id: 'hipaa-164.312a',
      frameworkId: 'hipaa',
      requirementNumber: '164.312(a)',
      title: 'Access Control',
      description: 'Assign a unique name and/or number for identifying and tracking user identity',
      status: 'compliant',
      score: 88,
      lastTested: '2025-08-02',
      evidence: ['Identity management audit', 'Access control matrix'],
      priority: 'high',
      category: 'Access Management',
      automatedTest: false
    },
    {
      id: 'gdpr-32',
      frameworkId: 'gdpr',
      requirementNumber: 'Article 32',
      title: 'Security of Processing',
      description: 'Implement appropriate technical and organisational measures',
      status: 'partially_compliant',
      score: 72,
      lastTested: '2025-07-25',
      evidence: ['Encryption assessment', 'Security controls review'],
      remediation: 'Implement additional encryption for data at rest',
      priority: 'medium',
      category: 'Data Security',
      automatedTest: false
    }
  ]);

  const [auditReports] = useState<AuditReport[]>([
    {
      id: 'audit-001',
      framework: 'PCI DSS',
      reportType: 'external',
      createdDate: '2025-07-15',
      status: 'completed',
      auditor: 'SecureAudit LLC',
      findings: 12,
      recommendations: 8,
      score: 87
    },
    {
      id: 'audit-002',
      framework: 'HIPAA',
      reportType: 'internal',
      createdDate: '2025-08-01',
      status: 'completed',
      auditor: 'Internal Compliance Team',
      findings: 5,
      recommendations: 3,
      score: 92
    },
    {
      id: 'audit-003',
      framework: 'SOX',
      reportType: 'regulatory',
      createdDate: '2025-06-30',
      status: 'submitted',
      auditor: 'Big4 Audit Firm',
      findings: 3,
      recommendations: 2,
      score: 94
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'bg-green-100 text-green-800 border-green-200';
      case 'non_compliant': return 'bg-red-100 text-red-800 border-red-200';
      case 'partially_compliant': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'not_assessed': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-yellow-600';
    if (score >= 70) return 'text-orange-600';
    return 'text-red-600';
  };

  // Simulate real-time compliance score updates
  useEffect(() => {
    const interval = setInterval(() => {
      setFrameworks(prev => prev.map(framework => ({
        ...framework,
        overallScore: Math.max(0, Math.min(100, framework.overallScore + (Math.random() - 0.5) * 2))
      })));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const filteredRequirements = requirements.filter(req => {
    const matchesFramework = selectedFramework === 'all' || req.frameworkId === selectedFramework;
    const matchesStatus = statusFilter === 'all' || req.status === statusFilter;
    const matchesSearch = searchQuery === '' || 
      req.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.requirementNumber.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFramework && matchesStatus && matchesSearch;
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
          Compliance Management Center
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl">
          Automated compliance monitoring, assessment, and reporting for multiple regulatory 
          frameworks with real-time status tracking and remediation guidance.
        </p>
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="frameworks" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Frameworks
          </TabsTrigger>
          <TabsTrigger value="requirements" className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" />
            Requirements
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Reports
          </TabsTrigger>
          <TabsTrigger value="calendar" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Schedule
          </TabsTrigger>
        </TabsList>

        {/* Overview Dashboard */}
        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-800">Average Compliance</p>
                      <p className="text-3xl font-bold text-green-900">
                        {Math.round(frameworks.reduce((sum, f) => sum + f.overallScore, 0) / frameworks.length)}%
                      </p>
                    </div>
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="mt-2">
                    <TrendingUp className="h-4 w-4 inline text-green-600 mr-1" />
                    <span className="text-xs text-green-700">+2.3% from last month</span>
                  </div>
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
                      <p className="text-sm font-medium text-blue-800">Active Frameworks</p>
                      <p className="text-3xl font-bold text-blue-900">{frameworks.length}</p>
                    </div>
                    <Shield className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="mt-2">
                    <span className="text-xs text-blue-700">
                      {frameworks.filter(f => f.criticality === 'high').length} critical
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-orange-800">Action Items</p>
                      <p className="text-3xl font-bold text-orange-900">
                        {frameworks.reduce((sum, f) => sum + f.nonCompliantRequirements, 0)}
                      </p>
                    </div>
                    <AlertTriangle className="h-8 w-8 text-orange-600" />
                  </div>
                  <div className="mt-2">
                    <span className="text-xs text-orange-700">Requires immediate attention</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-purple-800">Upcoming Audits</p>
                      <p className="text-3xl font-bold text-purple-900">3</p>
                    </div>
                    <Calendar className="h-8 w-8 text-purple-600" />
                  </div>
                  <div className="mt-2">
                    <span className="text-xs text-purple-700">Next: October 15, 2025</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Framework Status Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {frameworks.slice(0, 4).map((framework, index) => (
              <motion.div
                key={framework.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{framework.name} {framework.version}</CardTitle>
                        <CardDescription>{framework.description}</CardDescription>
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${getScoreColor(framework.overallScore)}`}>
                          {framework.overallScore}%
                        </div>
                        <Badge className={getPriorityColor(framework.criticality)}>
                          {framework.criticality}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-gray-600">Compliance Progress</span>
                          <span className="text-sm font-medium">
                            {framework.compliantRequirements}/{framework.totalRequirements}
                          </span>
                        </div>
                        <Progress value={framework.overallScore} className="h-2" />
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <div className="text-center">
                          <p className="font-semibold text-green-600">{framework.compliantRequirements}</p>
                          <p className="text-gray-500">Compliant</p>
                        </div>
                        <div className="text-center">
                          <p className="font-semibold text-yellow-600">{framework.partiallyCompliantRequirements}</p>
                          <p className="text-gray-500">Partial</p>
                        </div>
                        <div className="text-center">
                          <p className="font-semibold text-red-600">{framework.nonCompliantRequirements}</p>
                          <p className="text-gray-500">Non-compliant</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center pt-4 border-t">
                        <div className="text-sm text-gray-600">
                          <Clock className="h-4 w-4 inline mr-1" />
                          Next assessment: {framework.nextAssessment}
                        </div>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Recent Compliance Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { type: 'assessment', framework: 'PCI DSS', action: 'Automated assessment completed', time: '2 hours ago', status: 'success' },
                  { type: 'remediation', framework: 'HIPAA', action: 'Access control requirement remediated', time: '4 hours ago', status: 'success' },
                  { type: 'finding', framework: 'GDPR', action: 'New non-compliance identified', time: '6 hours ago', status: 'warning' },
                  { type: 'report', framework: 'SOX', action: 'Quarterly report generated', time: '1 day ago', status: 'info' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        activity.status === 'success' ? 'bg-green-500' :
                        activity.status === 'warning' ? 'bg-yellow-500' :
                        'bg-blue-500'
                      }`} />
                      <div>
                        <p className="font-medium text-sm">{activity.action}</p>
                        <p className="text-xs text-gray-600">{activity.framework} • {activity.time}</p>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Frameworks */}
        <TabsContent value="frameworks" className="space-y-6">
          <div className="grid gap-6">
            {frameworks.map((framework, index) => (
              <motion.div
                key={framework.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-2">
                          <CardTitle className="text-xl">{framework.name} {framework.version}</CardTitle>
                          <Badge className={getPriorityColor(framework.criticality)}>
                            {framework.criticality}
                          </Badge>
                        </div>
                        <CardDescription className="mb-4">{framework.description}</CardDescription>
                        
                        <div className="flex items-center gap-6 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Last assessed: {framework.lastAssessment}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            Next assessment: {framework.nextAssessment}
                          </span>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className={`text-3xl font-bold ${getScoreColor(framework.overallScore)} mb-2`}>
                          {framework.overallScore}%
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <RefreshCw className="h-4 w-4 mr-1" />
                            Assess Now
                          </Button>
                          <Button size="sm">
                            View Report
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-4">
                      {/* Progress Bar */}
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">Overall Compliance</span>
                          <span className="text-sm text-gray-600">
                            {framework.compliantRequirements} of {framework.totalRequirements} requirements
                          </span>
                        </div>
                        <Progress value={framework.overallScore} className="h-3" />
                      </div>
                      
                      {/* Requirement Breakdown */}
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-3 bg-green-50 rounded-lg">
                          <p className="text-2xl font-bold text-green-600">{framework.compliantRequirements}</p>
                          <p className="text-sm text-green-800">Compliant</p>
                        </div>
                        <div className="text-center p-3 bg-yellow-50 rounded-lg">
                          <p className="text-2xl font-bold text-yellow-600">{framework.partiallyCompliantRequirements}</p>
                          <p className="text-sm text-yellow-800">Partially Compliant</p>
                        </div>
                        <div className="text-center p-3 bg-red-50 rounded-lg">
                          <p className="text-2xl font-bold text-red-600">{framework.nonCompliantRequirements}</p>
                          <p className="text-sm text-red-800">Non-compliant</p>
                        </div>
                      </div>
                      
                      {/* Industry Tags */}
                      <div>
                        <p className="text-sm font-medium mb-2">Applicable Industries:</p>
                        <div className="flex flex-wrap gap-2">
                          {framework.industry.map((industry, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {industry.replace('_', ' ')}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Requirements */}
        <TabsContent value="requirements" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search requirements..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Select value={selectedFramework} onValueChange={setSelectedFramework}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="All Frameworks" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Frameworks</SelectItem>
                    {frameworks.map(framework => (
                      <SelectItem key={framework.id} value={framework.id}>
                        {framework.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="compliant">Compliant</SelectItem>
                    <SelectItem value="non_compliant">Non-compliant</SelectItem>
                    <SelectItem value="partially_compliant">Partially Compliant</SelectItem>
                    <SelectItem value="not_assessed">Not Assessed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Requirements List */}
          <div className="grid gap-4">
            {filteredRequirements.map((requirement, index) => (
              <motion.div
                key={requirement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold">{requirement.requirementNumber}</h3>
                          <h4 className="text-lg font-medium">{requirement.title}</h4>
                          <Badge className={getStatusColor(requirement.status)}>
                            {requirement.status.replace('_', ' ')}
                          </Badge>
                          <Badge className={getPriorityColor(requirement.priority)}>
                            {requirement.priority}
                          </Badge>
                          {requirement.automatedTest && (
                            <Badge variant="outline" className="text-xs">
                              <RefreshCw className="h-3 w-3 mr-1" />
                              Automated
                            </Badge>
                          )}
                        </div>
                        
                        <p className="text-gray-600 mb-3">{requirement.description}</p>
                        
                        <div className="mb-3">
                          <p className="text-sm font-medium mb-1">Category: {requirement.category}</p>
                          <p className="text-sm text-gray-600">Last tested: {requirement.lastTested}</p>
                        </div>
                        
                        {requirement.evidence.length > 0 && (
                          <div className="mb-3">
                            <p className="text-sm font-medium mb-1">Evidence:</p>
                            <ul className="text-sm text-gray-600 list-disc list-inside">
                              {requirement.evidence.map((evidence, idx) => (
                                <li key={idx}>{evidence}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {requirement.remediation && (
                          <Alert>
                            <AlertTriangle className="h-4 w-4" />
                            <AlertDescription className="text-sm">
                              <strong>Remediation:</strong> {requirement.remediation}
                            </AlertDescription>
                          </Alert>
                        )}
                      </div>
                      
                      <div className="ml-6 text-right">
                        <div className={`text-2xl font-bold ${getScoreColor(requirement.score)} mb-2`}>
                          {requirement.score}%
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            Details
                          </Button>
                          {requirement.status !== 'compliant' && (
                            <Button size="sm">
                              Remediate
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Reports */}
        <TabsContent value="reports" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Audit Reports</h2>
              <p className="text-gray-600">Generated compliance and audit reports</p>
            </div>
            <Button>
              <FileText className="h-4 w-4 mr-2" />
              Generate New Report
            </Button>
          </div>
          
          <div className="grid gap-4">
            {auditReports.map((report, index) => (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">{report.framework} Audit Report</h3>
                          <Badge 
                            className={
                              report.status === 'completed' ? 'bg-green-100 text-green-800' :
                              report.status === 'submitted' ? 'bg-blue-100 text-blue-800' :
                              'bg-yellow-100 text-yellow-800'
                            }
                          >
                            {report.status}
                          </Badge>
                          <Badge variant="outline">
                            {report.reportType}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-gray-600">Created Date</p>
                            <p className="font-medium">{report.createdDate}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Auditor</p>
                            <p className="font-medium">{report.auditor}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Findings</p>
                            <p className="font-medium text-red-600">{report.findings}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Score</p>
                            <p className={`font-medium ${getScoreColor(report.score)}`}>
                              {report.score}%
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="ml-6 flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Schedule */}
        <TabsContent value="calendar" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Upcoming Compliance Activities
              </CardTitle>
              <CardDescription>
                Scheduled assessments, audits, and compliance reviews
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { date: '2025-10-15', framework: 'PCI DSS', activity: 'Quarterly Assessment', type: 'assessment', priority: 'high' },
                  { date: '2025-10-20', framework: 'GDPR', activity: 'Data Protection Review', type: 'review', priority: 'medium' },
                  { date: '2025-11-01', framework: 'HIPAA', activity: 'External Audit', type: 'audit', priority: 'high' },
                  { date: '2025-11-15', framework: 'ISO 27001', activity: 'Annual Certification', type: 'certification', priority: 'high' },
                  { date: '2025-12-01', framework: 'SOX', activity: 'Q4 Controls Testing', type: 'testing', priority: 'medium' }
                ].map((event, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-sm transition-shadow">
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <p className="text-lg font-bold">{new Date(event.date).getDate()}</p>
                        <p className="text-xs text-gray-600">
                          {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold">{event.activity}</h4>
                        <p className="text-sm text-gray-600">{event.framework}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={getPriorityColor(event.priority)}>
                        {event.priority}
                      </Badge>
                      <Badge variant="outline">
                        {event.type}
                      </Badge>
                      <Button size="sm" variant="outline">
                        Schedule
                      </Button>
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

export default ComplianceCenter;