import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Shield, TrendingUp, AlertTriangle, CheckCircle, Clock,
  Users, Building, FileText, BarChart3, PieChart, Target,
  BookOpen, Settings, Award, Scale, Lock, Eye, Zap,
  Calendar, MapPin, User, Activity, Monitor, Server,
  Database, Network, Globe, Layers, Cpu, HardDrive
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Types and Interfaces
interface RiskAssessment {
  id: string;
  title: string;
  description: string;
  category: 'operational' | 'strategic' | 'compliance' | 'technical' | 'financial';
  probability: number; // 1-5 scale
  impact: number; // 1-5 scale
  risk_score: number;
  status: 'identified' | 'assessing' | 'mitigating' | 'monitoring' | 'accepted';
  owner: string;
  due_date: Date;
  mitigation_controls: Control[];
  last_review: Date;
}

interface Control {
  id: string;
  name: string;
  description: string;
  type: 'preventive' | 'detective' | 'corrective' | 'compensating';
  effectiveness: 'low' | 'medium' | 'high';
  implementation_status: 'not_started' | 'in_progress' | 'implemented' | 'needs_review';
  responsible_party: string;
  last_tested: Date;
  next_review: Date;
}

interface PolicyDocument {
  id: string;
  title: string;
  category: 'security' | 'privacy' | 'governance' | 'operational';
  version: string;
  status: 'draft' | 'review' | 'approved' | 'archived';
  owner: string;
  effective_date: Date;
  review_date: Date;
  approval_required: boolean;
  stakeholders: string[];
}

interface ComplianceFramework {
  id: string;
  name: string;
  description: string;
  requirements_count: number;
  compliance_score: number;
  status: 'active' | 'planning' | 'audit' | 'non_compliant';
  last_assessment: Date;
  next_assessment: Date;
  gap_count: number;
}

interface GovernanceMetric {
  id: string;
  name: string;
  current_value: number;
  target_value: number;
  unit: string;
  trend: 'improving' | 'declining' | 'stable';
  category: 'risk' | 'compliance' | 'control_effectiveness' | 'governance';
}

const SecurityGovernance: React.FC = () => {
  const [selectedFramework, setSelectedFramework] = useState<string>('all');
  const [riskFilter, setRiskFilter] = useState<string>('all');
  const [timeRange, setTimeRange] = useState<string>('30d');

  // Mock data
  const [riskAssessments] = useState<RiskAssessment[]>([
    {
      id: 'RISK-001',
      title: 'Data Breach via Third-Party Vendor',
      description: 'Risk of data exposure through inadequate vendor security controls',
      category: 'operational',
      probability: 3,
      impact: 5,
      risk_score: 15,
      status: 'mitigating',
      owner: 'CISO Office',
      due_date: new Date('2024-02-15'),
      mitigation_controls: [],
      last_review: new Date('2024-01-10')
    },
    {
      id: 'RISK-002',
      title: 'Regulatory Non-Compliance - GDPR',
      description: 'Risk of regulatory fines due to data processing violations',
      category: 'compliance',
      probability: 2,
      impact: 4,
      risk_score: 8,
      status: 'monitoring',
      owner: 'Privacy Office',
      due_date: new Date('2024-03-01'),
      mitigation_controls: [],
      last_review: new Date('2024-01-08')
    }
  ]);

  const [policyDocuments] = useState<PolicyDocument[]>([
    {
      id: 'POL-001',
      title: 'Information Security Policy',
      category: 'security',
      version: '2.1',
      status: 'approved',
      owner: 'CISO',
      effective_date: new Date('2024-01-01'),
      review_date: new Date('2024-12-31'),
      approval_required: true,
      stakeholders: ['IT', 'Legal', 'HR']
    },
    {
      id: 'POL-002',
      title: 'Data Retention Policy',
      category: 'privacy',
      version: '1.5',
      status: 'review',
      owner: 'Data Protection Officer',
      effective_date: new Date('2023-06-01'),
      review_date: new Date('2024-06-01'),
      approval_required: true,
      stakeholders: ['Privacy Office', 'Legal', 'Records Management']
    }
  ]);

  const [complianceFrameworks] = useState<ComplianceFramework[]>([
    {
      id: 'FW-001',
      name: 'ISO 27001',
      description: 'Information Security Management System',
      requirements_count: 114,
      compliance_score: 87,
      status: 'active',
      last_assessment: new Date('2024-01-01'),
      next_assessment: new Date('2024-07-01'),
      gap_count: 6
    },
    {
      id: 'FW-002',
      name: 'NIST Cybersecurity Framework',
      description: 'Cybersecurity risk management framework',
      requirements_count: 108,
      compliance_score: 92,
      status: 'active',
      last_assessment: new Date('2023-12-15'),
      next_assessment: new Date('2024-06-15'),
      gap_count: 3
    },
    {
      id: 'FW-003',
      name: 'SOC 2 Type II',
      description: 'Service Organization Control 2',
      requirements_count: 64,
      compliance_score: 94,
      status: 'audit',
      last_assessment: new Date('2024-01-05'),
      next_assessment: new Date('2024-04-05'),
      gap_count: 2
    }
  ]);

  const [governanceMetrics] = useState<GovernanceMetric[]>([
    { id: 'M1', name: 'Overall Risk Score', current_value: 3.2, target_value: 2.5, unit: '/5', trend: 'improving', category: 'risk' },
    { id: 'M2', name: 'Compliance Score', current_value: 91, target_value: 95, unit: '%', trend: 'improving', category: 'compliance' },
    { id: 'M3', name: 'Control Effectiveness', current_value: 88, target_value: 90, unit: '%', trend: 'stable', category: 'control_effectiveness' },
    { id: 'M4', name: 'Policy Coverage', current_value: 96, target_value: 100, unit: '%', trend: 'improving', category: 'governance' }
  ]);

  const getRiskLevel = (score: number) => {
    if (score >= 15) return { level: 'Critical', color: 'text-red-600 bg-red-50 border-red-200' };
    if (score >= 10) return { level: 'High', color: 'text-orange-600 bg-orange-50 border-orange-200' };
    if (score >= 6) return { level: 'Medium', color: 'text-yellow-600 bg-yellow-50 border-yellow-200' };
    return { level: 'Low', color: 'text-green-600 bg-green-50 border-green-200' };
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'identified': return <Badge variant="destructive">Identified</Badge>;
      case 'assessing': return <Badge className="bg-orange-500">Assessing</Badge>;
      case 'mitigating': return <Badge className="bg-blue-500">Mitigating</Badge>;
      case 'monitoring': return <Badge className="bg-green-500">Monitoring</Badge>;
      case 'accepted': return <Badge variant="secondary">Accepted</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getComplianceColor = (score: number) => {
    if (score >= 95) return 'text-green-600';
    if (score >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-600 rounded-xl shadow-lg">
              <Scale className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Security Governance & Risk Management</h1>
              <p className="text-gray-600">Enterprise-wide governance, risk management, and compliance oversight</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Generate Report
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
          {governanceMetrics.map((metric) => (
            <Card key={metric.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-600">{metric.name}</h3>
                  <div className={`text-sm ${
                    metric.trend === 'improving' ? 'text-green-600' : 
                    metric.trend === 'declining' ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    <TrendingUp className="h-3 w-3" />
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
                    Target: {metric.target_value}{metric.unit}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Main Governance Interface */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs defaultValue="risk" className="space-y-4">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="risk">Risk Management</TabsTrigger>
              <TabsTrigger value="compliance">Compliance</TabsTrigger>
              <TabsTrigger value="policies">Policies</TabsTrigger>
              <TabsTrigger value="controls">Controls</TabsTrigger>
              <TabsTrigger value="audits">Audits</TabsTrigger>
              <TabsTrigger value="dashboard">Executive Dashboard</TabsTrigger>
            </TabsList>

            {/* Risk Management Tab */}
            <TabsContent value="risk" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    Enterprise Risk Register
                  </CardTitle>
                  <CardDescription>
                    Comprehensive risk identification, assessment, and mitigation tracking
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {riskAssessments.map((risk) => {
                      const riskLevel = getRiskLevel(risk.risk_score);
                      return (
                        <div key={risk.id} className="p-4 border rounded-lg hover:shadow-sm transition-shadow">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="font-semibold text-gray-900">{risk.title}</h3>
                                <Badge className={riskLevel.color}>
                                  {riskLevel.level}
                                </Badge>
                                {getStatusBadge(risk.status)}
                              </div>
                              <p className="text-sm text-gray-600 mb-3">{risk.description}</p>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                <div>
                                  <span className="text-gray-500">Risk Score:</span>
                                  <span className="font-medium ml-1">{risk.risk_score}/25</span>
                                </div>
                                <div>
                                  <span className="text-gray-500">Owner:</span>
                                  <span className="font-medium ml-1">{risk.owner}</span>
                                </div>
                                <div>
                                  <span className="text-gray-500">Category:</span>
                                  <span className="font-medium ml-1 capitalize">{risk.category}</span>
                                </div>
                                <div>
                                  <span className="text-gray-500">Due Date:</span>
                                  <span className="font-medium ml-1">{risk.due_date.toLocaleDateString()}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 text-xs">
                            <div className="flex items-center gap-1">
                              <div className="w-12 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-red-500 h-2 rounded-full" 
                                  style={{ width: `${(risk.probability / 5) * 100}%` }}
                                />
                              </div>
                              <span>Probability: {risk.probability}/5</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <div className="w-12 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-orange-500 h-2 rounded-full" 
                                  style={{ width: `${(risk.impact / 5) * 100}%` }}
                                />
                              </div>
                              <span>Impact: {risk.impact}/5</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Compliance Tab */}
            <TabsContent value="compliance" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    Compliance Frameworks
                  </CardTitle>
                  <CardDescription>
                    Monitor compliance status across multiple regulatory frameworks
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {complianceFrameworks.map((framework) => (
                      <Card key={framework.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-gray-900">{framework.name}</h3>
                            <Badge 
                              variant={framework.status === 'active' ? 'default' : 'secondary'}
                              className={
                                framework.status === 'audit' ? 'bg-orange-500' :
                                framework.status === 'non_compliant' ? 'bg-red-500' : ''
                              }
                            >
                              {framework.status}
                            </Badge>
                          </div>
                          
                          <p className="text-sm text-gray-600 mb-4">{framework.description}</p>
                          
                          <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Compliance Score:</span>
                              <span className={`font-medium ${getComplianceColor(framework.compliance_score)}`}>
                                {framework.compliance_score}%
                              </span>
                            </div>
                            
                            <Progress value={framework.compliance_score} className="h-2" />
                            
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-gray-600">Requirements:</span>
                                <span className="font-medium ml-1">{framework.requirements_count}</span>
                              </div>
                              <div>
                                <span className="text-gray-600">Gaps:</span>
                                <span className="font-medium ml-1 text-red-600">{framework.gap_count}</span>
                              </div>
                            </div>
                            
                            <div className="text-xs text-gray-500">
                              <p>Last Assessment: {framework.last_assessment.toLocaleDateString()}</p>
                              <p>Next Assessment: {framework.next_assessment.toLocaleDateString()}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Policies Tab */}
            <TabsContent value="policies" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                    Policy Management
                  </CardTitle>
                  <CardDescription>
                    Centralized policy document management and approval workflow
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {policyDocuments.map((policy) => (
                      <div key={policy.id} className="p-4 border rounded-lg hover:shadow-sm transition-shadow">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold text-gray-900">{policy.title}</h3>
                              <Badge 
                                variant={policy.status === 'approved' ? 'default' : 'secondary'}
                                className={
                                  policy.status === 'review' ? 'bg-orange-500' :
                                  policy.status === 'draft' ? 'bg-gray-500' :
                                  policy.status === 'approved' ? 'bg-green-500' : ''
                                }
                              >
                                {policy.status}
                              </Badge>
                              <Badge variant="outline">{policy.category}</Badge>
                            </div>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-2">
                              <div>
                                <span className="text-gray-500">Version:</span>
                                <span className="font-medium ml-1">{policy.version}</span>
                              </div>
                              <div>
                                <span className="text-gray-500">Owner:</span>
                                <span className="font-medium ml-1">{policy.owner}</span>
                              </div>
                              <div>
                                <span className="text-gray-500">Effective:</span>
                                <span className="font-medium ml-1">{policy.effective_date.toLocaleDateString()}</span>
                              </div>
                              <div>
                                <span className="text-gray-500">Review Due:</span>
                                <span className="font-medium ml-1">{policy.review_date.toLocaleDateString()}</span>
                              </div>
                            </div>
                            
                            <div className="text-sm">
                              <span className="text-gray-500">Stakeholders:</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {policy.stakeholders.map((stakeholder) => (
                                  <Badge key={stakeholder} variant="outline" className="text-xs">
                                    {stakeholder}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                            <Button variant="outline" size="sm">
                              <Settings className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Controls Tab */}
            <TabsContent value="controls" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-purple-600" />
                    Security Controls Management
                  </CardTitle>
                  <CardDescription>
                    Monitor and manage security control implementation and effectiveness
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card className="bg-green-50 border-green-200">
                      <CardContent className="p-4 text-center">
                        <CheckCircle className="h-8 w-8 mx-auto text-green-600 mb-2" />
                        <h3 className="font-semibold text-green-900">Implemented</h3>
                        <p className="text-2xl font-bold text-green-700">87</p>
                        <p className="text-sm text-green-600">Controls</p>
                      </CardContent>
                    </Card>

                    <Card className="bg-orange-50 border-orange-200">
                      <CardContent className="p-4 text-center">
                        <Clock className="h-8 w-8 mx-auto text-orange-600 mb-2" />
                        <h3 className="font-semibold text-orange-900">In Progress</h3>
                        <p className="text-2xl font-bold text-orange-700">12</p>
                        <p className="text-sm text-orange-600">Controls</p>
                      </CardContent>
                    </Card>

                    <Card className="bg-red-50 border-red-200">
                      <CardContent className="p-4 text-center">
                        <AlertTriangle className="h-8 w-8 mx-auto text-red-600 mb-2" />
                        <h3 className="font-semibold text-red-900">Needs Review</h3>
                        <p className="text-2xl font-bold text-red-700">5</p>
                        <p className="text-sm text-red-600">Controls</p>
                      </CardContent>
                    </Card>

                    <Card className="bg-blue-50 border-blue-200">
                      <CardContent className="p-4 text-center">
                        <Target className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                        <h3 className="font-semibold text-blue-900">Effectiveness</h3>
                        <p className="text-2xl font-bold text-blue-700">94%</p>
                        <p className="text-sm text-blue-600">Average</p>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Audits Tab */}
            <TabsContent value="audits" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-yellow-600" />
                    Audit Management
                  </CardTitle>
                  <CardDescription>
                    Track internal and external audit activities and findings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Calendar className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Audit Calendar</h3>
                    <p className="text-gray-600">
                      Comprehensive audit scheduling and tracking interface coming soon
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Executive Dashboard Tab */}
            <TabsContent value="dashboard" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-indigo-600" />
                    Executive Security Dashboard
                  </CardTitle>
                  <CardDescription>
                    High-level governance and risk metrics for executive leadership
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <PieChart className="h-6 w-6 text-indigo-600" />
                        <h3 className="font-semibold">Risk Distribution</h3>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Critical</span>
                          <span className="text-red-600">1</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>High</span>
                          <span className="text-orange-600">3</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Medium</span>
                          <span className="text-yellow-600">8</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Low</span>
                          <span className="text-green-600">15</span>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <BarChart3 className="h-6 w-6 text-green-600" />
                        <h3 className="font-semibold">Compliance Status</h3>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Overall Score</span>
                            <span className="font-medium">91%</span>
                          </div>
                          <Progress value={91} className="h-2" />
                        </div>
                      </div>
                    </Card>

                    <Card className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <Shield className="h-6 w-6 text-purple-600" />
                        <h3 className="font-semibold">Control Maturity</h3>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600 mb-1">Level 4</div>
                        <div className="text-sm text-gray-600">Managed & Measurable</div>
                      </div>
                    </Card>
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

export default SecurityGovernance;