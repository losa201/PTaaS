import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  FileText, 
  TrendingUp, 
  BarChart3, 
  PieChart, 
  Download,
  Calendar,
  Mail,
  Users,
  Clock,
  Eye,
  Filter,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  Settings,
  Share2,
  Printer,
  Globe,
  Shield,
  Target
} from 'lucide-react';
import { motion } from 'framer-motion';

interface Report {
  id: string;
  title: string;
  type: 'security' | 'compliance' | 'executive' | 'technical' | 'risk';
  description: string;
  status: 'generating' | 'ready' | 'scheduled' | 'delivered';
  createdDate: string;
  lastUpdated: string;
  format: 'pdf' | 'docx' | 'xlsx' | 'pptx';
  frequency: 'one-time' | 'daily' | 'weekly' | 'monthly' | 'quarterly';
  recipients: string[];
  tags: string[];
  fileSize?: string;
  pageCount?: number;
  confidentiality: 'public' | 'internal' | 'confidential' | 'restricted';
}

interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  category: 'security' | 'compliance' | 'executive' | 'operational';
  sections: string[];
  estimatedPages: number;
  dataRequired: string[];
  automation: boolean;
}

interface MetricsDashboard {
  totalReports: number;
  reportsThisMonth: number;
  scheduledReports: number;
  averageGenerationTime: string;
  topCategories: { category: string; count: number }[];
  deliveryStats: { delivered: number; pending: number; failed: number };
}

const EnterpriseReporting: React.FC = () => {
  const [activeTab, setActiveTab] = useState('reports');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const [reports, setReports] = useState<Report[]>([
    {
      id: 'rpt-001',
      title: 'Q3 2025 Security Assessment Report',
      type: 'security',
      description: 'Comprehensive security assessment covering all enterprise systems and applications',
      status: 'ready',
      createdDate: '2025-08-07',
      lastUpdated: '2025-08-08',
      format: 'pdf',
      frequency: 'quarterly',
      recipients: ['ciso@company.com', 'security-team@company.com'],
      tags: ['quarterly', 'assessment', 'vulnerabilities'],
      fileSize: '4.2 MB',
      pageCount: 47,
      confidentiality: 'confidential'
    },
    {
      id: 'rpt-002',
      title: 'PCI DSS Compliance Status',
      type: 'compliance',
      description: 'Payment Card Industry Data Security Standard compliance report',
      status: 'generating',
      createdDate: '2025-08-08',
      lastUpdated: '2025-08-08',
      format: 'docx',
      frequency: 'monthly',
      recipients: ['compliance@company.com', 'audit@company.com'],
      tags: ['pci-dss', 'compliance', 'monthly'],
      confidentiality: 'restricted'
    },
    {
      id: 'rpt-003',
      title: 'Executive Security Dashboard',
      type: 'executive',
      description: 'High-level security metrics and risk summary for executive leadership',
      status: 'scheduled',
      createdDate: '2025-08-05',
      lastUpdated: '2025-08-08',
      format: 'pptx',
      frequency: 'weekly',
      recipients: ['ceo@company.com', 'board@company.com'],
      tags: ['executive', 'dashboard', 'weekly'],
      fileSize: '2.8 MB',
      pageCount: 15,
      confidentiality: 'restricted'
    },
    {
      id: 'rpt-004',
      title: 'Threat Intelligence Summary',
      type: 'security',
      description: 'Weekly threat intelligence briefing with IOCs and threat actor analysis',
      status: 'delivered',
      createdDate: '2025-08-01',
      lastUpdated: '2025-08-01',
      format: 'pdf',
      frequency: 'weekly',
      recipients: ['threat-intel@company.com', 'soc@company.com'],
      tags: ['threat-intel', 'weekly', 'iocs'],
      fileSize: '1.9 MB',
      pageCount: 12,
      confidentiality: 'internal'
    }
  ]);

  const [templates] = useState<ReportTemplate[]>([
    {
      id: 'tmpl-001',
      name: 'Security Assessment Report',
      description: 'Comprehensive security assessment with findings and recommendations',
      category: 'security',
      sections: ['Executive Summary', 'Methodology', 'Findings', 'Risk Analysis', 'Recommendations', 'Appendices'],
      estimatedPages: 45,
      dataRequired: ['Vulnerability scans', 'Penetration tests', 'Security controls', 'Risk assessments'],
      automation: true
    },
    {
      id: 'tmpl-002',
      name: 'Compliance Status Report',
      description: 'Regulatory compliance status and gap analysis',
      category: 'compliance',
      sections: ['Compliance Overview', 'Framework Status', 'Gap Analysis', 'Remediation Plan'],
      estimatedPages: 25,
      dataRequired: ['Compliance assessments', 'Control evidence', 'Audit findings'],
      automation: true
    },
    {
      id: 'tmpl-003',
      name: 'Executive Security Dashboard',
      description: 'High-level security metrics for executive stakeholders',
      category: 'executive',
      sections: ['Security Posture', 'Key Metrics', 'Risk Summary', 'Strategic Recommendations'],
      estimatedPages: 15,
      dataRequired: ['Security metrics', 'Risk assessments', 'Incident data'],
      automation: true
    },
    {
      id: 'tmpl-004',
      name: 'Incident Response Report',
      description: 'Detailed incident analysis and response documentation',
      category: 'operational',
      sections: ['Incident Summary', 'Timeline', 'Root Cause Analysis', 'Response Actions', 'Lessons Learned'],
      estimatedPages: 20,
      dataRequired: ['Incident logs', 'Response timeline', 'Forensic analysis'],
      automation: false
    }
  ]);

  const [metrics] = useState<MetricsDashboard>({
    totalReports: 247,
    reportsThisMonth: 34,
    scheduledReports: 12,
    averageGenerationTime: '4.2 min',
    topCategories: [
      { category: 'Security', count: 89 },
      { category: 'Compliance', count: 67 },
      { category: 'Executive', count: 45 },
      { category: 'Operational', count: 46 }
    ],
    deliveryStats: {
      delivered: 195,
      pending: 15,
      failed: 3
    }
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': return 'bg-green-100 text-green-800 border-green-200';
      case 'generating': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'scheduled': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'delivered': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getConfidentialityColor = (level: string) => {
    switch (level) {
      case 'public': return 'bg-green-100 text-green-800';
      case 'internal': return 'bg-blue-100 text-blue-800';
      case 'confidential': return 'bg-orange-100 text-orange-800';
      case 'restricted': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'pdf': return <FileText className="h-4 w-4 text-red-600" />;
      case 'docx': return <FileText className="h-4 w-4 text-blue-600" />;
      case 'xlsx': return <BarChart3 className="h-4 w-4 text-green-600" />;
      case 'pptx': return <BarChart3 className="h-4 w-4 text-orange-600" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const generateReport = async (templateId: string) => {
    setIsGenerating(true);
    // Simulate report generation
    setTimeout(() => {
      const newReport: Report = {
        id: `rpt-${Date.now()}`,
        title: `Generated Report - ${new Date().toLocaleDateString()}`,
        type: 'security',
        description: 'Auto-generated security report',
        status: 'ready',
        createdDate: new Date().toISOString().split('T')[0],
        lastUpdated: new Date().toISOString().split('T')[0],
        format: 'pdf',
        frequency: 'one-time',
        recipients: [],
        tags: ['generated', 'security'],
        fileSize: '3.1 MB',
        pageCount: 28,
        confidentiality: 'internal'
      };
      setReports(prev => [newReport, ...prev]);
      setIsGenerating(false);
    }, 3000);
  };

  // Filter reports based on search and category
  const filteredReports = reports.filter(report => {
    const matchesCategory = selectedCategory === 'all' || report.type === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
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
          Enterprise Reporting Center
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl">
          Automated report generation, distribution, and management for security, compliance, 
          and executive reporting needs with customizable templates and scheduling.
        </p>
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Reports
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Templates
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="schedule" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Schedule
          </TabsTrigger>
          <TabsTrigger value="generate" className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Generate
          </TabsTrigger>
        </TabsList>

        {/* Reports List */}
        <TabsContent value="reports" className="space-y-6">
          {/* Filters and Search */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <Input
                    placeholder="Search reports..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="max-w-sm"
                  />
                  
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-[180px]">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="security">Security</SelectItem>
                      <SelectItem value="compliance">Compliance</SelectItem>
                      <SelectItem value="executive">Executive</SelectItem>
                      <SelectItem value="technical">Technical</SelectItem>
                      <SelectItem value="risk">Risk</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export List
                  </Button>
                  <Button size="sm">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    New Report
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reports Grid */}
          <div className="grid gap-6">
            {filteredReports.map((report, index) => (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <CardTitle className="text-lg">{report.title}</CardTitle>
                          <Badge className={getStatusColor(report.status)}>
                            {report.status}
                          </Badge>
                          <Badge className={getConfidentialityColor(report.confidentiality)}>
                            {report.confidentiality}
                          </Badge>
                        </div>
                        <CardDescription className="mb-3">
                          {report.description}
                        </CardDescription>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            {getFormatIcon(report.format)}
                            {report.format.toUpperCase()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {report.frequency}
                          </span>
                          {report.fileSize && (
                            <span className="flex items-center gap-1">
                              <FileText className="h-4 w-4" />
                              {report.fileSize}
                            </span>
                          )}
                          {report.pageCount && (
                            <span>{report.pageCount} pages</span>
                          )}
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-sm text-gray-600 mb-2">
                          Updated: {report.lastUpdated}
                        </p>
                        <div className="flex gap-2">
                          {report.status === 'ready' && (
                            <>
                              <Button size="sm" variant="outline">
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button>
                              <Button size="sm" variant="outline">
                                <Download className="h-4 w-4 mr-1" />
                                Download
                              </Button>
                            </>
                          )}
                          {report.status === 'generating' && (
                            <div className="flex items-center gap-2">
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                              <span className="text-sm">Generating...</span>
                            </div>
                          )}
                          <Button size="sm">
                            <Share2 className="h-4 w-4 mr-1" />
                            Share
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-3">
                      {/* Recipients */}
                      {report.recipients.length > 0 && (
                        <div>
                          <p className="text-sm font-medium mb-1">Recipients:</p>
                          <div className="flex flex-wrap gap-1">
                            {report.recipients.map((recipient, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                <Mail className="h-3 w-3 mr-1" />
                                {recipient}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Tags */}
                      <div>
                        <p className="text-sm font-medium mb-1">Tags:</p>
                        <div className="flex flex-wrap gap-1">
                          {report.tags.map((tag, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {tag}
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

        {/* Templates */}
        <TabsContent value="templates" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Report Templates</h2>
              <p className="text-gray-600">Pre-configured templates for automated report generation</p>
            </div>
            <Button>
              <Settings className="h-4 w-4 mr-2" />
              Create Template
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {templates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg mb-2">{template.name}</CardTitle>
                        <CardDescription className="mb-3">
                          {template.description}
                        </CardDescription>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{template.category}</Badge>
                          {template.automation && (
                            <Badge className="bg-green-100 text-green-800">
                              <RefreshCw className="h-3 w-3 mr-1" />
                              Automated
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm font-medium mb-2">Sections ({template.sections.length}):</p>
                      <div className="flex flex-wrap gap-1">
                        {template.sections.slice(0, 3).map((section, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {section}
                          </Badge>
                        ))}
                        {template.sections.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{template.sections.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium mb-2">Data Required:</p>
                      <ul className="text-sm text-gray-600 list-disc list-inside">
                        {template.dataRequired.slice(0, 2).map((data, idx) => (
                          <li key={idx}>{data}</li>
                        ))}
                        {template.dataRequired.length > 2 && (
                          <li>+{template.dataRequired.length - 2} more data sources</li>
                        )}
                      </ul>
                    </div>
                    
                    <div className="flex justify-between items-center pt-4 border-t">
                      <span className="text-sm text-gray-600">
                        ~{template.estimatedPages} pages
                      </span>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                        <Button 
                          size="sm" 
                          onClick={() => generateReport(template.id)}
                          disabled={isGenerating}
                        >
                          {isGenerating ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-1"></div>
                          ) : (
                            <RefreshCw className="h-4 w-4 mr-1" />
                          )}
                          Generate
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Analytics */}
        <TabsContent value="analytics" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Reports</p>
                    <p className="text-3xl font-bold">{metrics.totalReports}</p>
                  </div>
                  <FileText className="h-8 w-8 text-blue-600" />
                </div>
                <p className="text-xs text-gray-500 mt-2">All time generated</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">This Month</p>
                    <p className="text-3xl font-bold">{metrics.reportsThisMonth}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-xs text-green-600 mt-2">+15% from last month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Scheduled</p>
                    <p className="text-3xl font-bold">{metrics.scheduledReports}</p>
                  </div>
                  <Calendar className="h-8 w-8 text-orange-600" />
                </div>
                <p className="text-xs text-gray-500 mt-2">Automated reports</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avg. Time</p>
                    <p className="text-3xl font-bold">{metrics.averageGenerationTime}</p>
                  </div>
                  <Clock className="h-8 w-8 text-purple-600" />
                </div>
                <p className="text-xs text-gray-500 mt-2">Generation time</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts and Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Report Categories</CardTitle>
                <CardDescription>Distribution of reports by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {metrics.topCategories.map((category, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{category.category}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32">
                          <Progress value={(category.count / metrics.totalReports) * 100} />
                        </div>
                        <span className="text-sm text-gray-600 min-w-[3rem] text-right">
                          {category.count}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Delivery Statistics</CardTitle>
                <CardDescription>Report delivery status overview</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Successfully Delivered</span>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <span className="font-semibold text-green-600">
                        {metrics.deliveryStats.delivered}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Pending Delivery</span>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-yellow-600" />
                      <span className="font-semibold text-yellow-600">
                        {metrics.deliveryStats.pending}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Failed Delivery</span>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <span className="font-semibold text-red-600">
                        {metrics.deliveryStats.failed}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Schedule */}
        <TabsContent value="schedule" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Scheduled Reports
              </CardTitle>
              <CardDescription>
                Automated report generation and delivery schedule
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reports.filter(r => r.frequency !== 'one-time').map((report, index) => (
                  <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          report.frequency === 'weekly' ? 'bg-blue-100 text-blue-600' :
                          report.frequency === 'monthly' ? 'bg-green-100 text-green-600' :
                          'bg-purple-100 text-purple-600'
                        }`}>
                          {getFormatIcon(report.format)}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold">{report.title}</h4>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {report.frequency}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {report.recipients.length} recipients
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={getStatusColor(report.status)}>
                        {report.status}
                      </Badge>
                      <Button size="sm" variant="outline">
                        Edit Schedule
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Generate */}
        <TabsContent value="generate" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RefreshCw className="h-5 w-5" />
                Generate New Report
              </CardTitle>
              <CardDescription>
                Create a custom report using templates or build from scratch
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="report-title">Report Title</Label>
                    <Input id="report-title" placeholder="Enter report title..." />
                  </div>
                  
                  <div>
                    <Label htmlFor="report-type">Report Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select report type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="security">Security Assessment</SelectItem>
                        <SelectItem value="compliance">Compliance Report</SelectItem>
                        <SelectItem value="executive">Executive Summary</SelectItem>
                        <SelectItem value="technical">Technical Report</SelectItem>
                        <SelectItem value="risk">Risk Assessment</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="template">Template</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose template" />
                      </SelectTrigger>
                      <SelectContent>
                        {templates.map(template => (
                          <SelectItem key={template.id} value={template.id}>
                            {template.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="format">Output Format</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF Document</SelectItem>
                        <SelectItem value="docx">Word Document</SelectItem>
                        <SelectItem value="xlsx">Excel Spreadsheet</SelectItem>
                        <SelectItem value="pptx">PowerPoint Presentation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Enter report description..."
                      className="min-h-[100px]"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="recipients">Recipients (Email)</Label>
                    <Input 
                      id="recipients" 
                      placeholder="email1@company.com, email2@company.com"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="confidentiality">Confidentiality Level</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select confidentiality" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public</SelectItem>
                        <SelectItem value="internal">Internal</SelectItem>
                        <SelectItem value="confidential">Confidential</SelectItem>
                        <SelectItem value="restricted">Restricted</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <Alert>
                <Target className="h-4 w-4" />
                <AlertDescription>
                  Report generation may take 2-5 minutes depending on the complexity and data sources required.
                </AlertDescription>
              </Alert>
              
              <div className="flex gap-4">
                <Button 
                  onClick={() => generateReport('custom')}
                  disabled={isGenerating}
                  className="flex-1"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Generating Report...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Generate Report
                    </>
                  )}
                </Button>
                <Button variant="outline">
                  Save as Draft
                </Button>
                <Button variant="outline">
                  Preview
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnterpriseReporting;