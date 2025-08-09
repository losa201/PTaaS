import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  TrendingUp,
  TrendingDown,
  Shield,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  DollarSign,
  Users,
  Clock,
  Target,
  BarChart3,
  PieChart,
  Activity,
  Globe,
  Building,
  Eye,
  Download,
  Calendar,
  FileText,
  Mail,
  Gauge,
  Zap,
  Lock,
  Network,
  Database,
  Server,
  Crown,
  Flag,
  Award,
  Minus,
  ArrowUpRight,
  ArrowDownRight,
  MinusCircle,
  Info,
  Settings,
  RefreshCw,
  Filter
} from 'lucide-react';
import { motion } from 'framer-motion';

interface SecurityMetric {
  name: string;
  value: number;
  unit: string;
  change: number;
  trend: 'up' | 'down' | 'stable';
  status: 'good' | 'warning' | 'critical';
  target: number;
}

interface RiskIndicator {
  id: string;
  category: string;
  title: string;
  description: string;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  impact: 'low' | 'medium' | 'high' | 'critical';
  probability: number;
  businessImpact: number;
  mitigation: string;
  owner: string;
  dueDate: string;
}

interface ComplianceStatus {
  framework: string;
  score: number;
  status: 'compliant' | 'partial' | 'non_compliant';
  lastAudit: string;
  nextAudit: string;
  criticalFindings: number;
  totalRequirements: number;
  compliantRequirements: number;
}

interface SecurityIncident {
  id: string;
  title: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'investigating' | 'contained' | 'resolved' | 'closed';
  detectedDate: string;
  resolvedDate?: string;
  affectedSystems: number;
  businessImpact: string;
  estimatedCost: number;
}

interface InvestmentROI {
  category: string;
  investment: number;
  savings: number;
  roi: number;
  timeframe: string;
  description: string;
}

const ExecutiveSecurityDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d');
  const [isLoading, setIsLoading] = useState(false);

  const [securityMetrics] = useState<SecurityMetric[]>([
    {
      name: 'Security Score',
      value: 87,
      unit: '%',
      change: 5.2,
      trend: 'up',
      status: 'good',
      target: 90
    },
    {
      name: 'Incidents',
      value: 23,
      unit: 'count',
      change: -18.5,
      trend: 'down',
      status: 'good',
      target: 15
    },
    {
      name: 'Mean Time to Detect',
      value: 4.2,
      unit: 'hours',
      change: -32.1,
      trend: 'down',
      status: 'good',
      target: 3.0
    },
    {
      name: 'Mean Time to Resolve',
      value: 18.7,
      unit: 'hours',
      change: -24.8,
      trend: 'down',
      status: 'warning',
      target: 12.0
    },
    {
      name: 'Vulnerability Exposure',
      value: 156,
      unit: 'days',
      change: -45.2,
      trend: 'down',
      status: 'good',
      target: 120
    },
    {
      name: 'User Security Training',
      value: 94,
      unit: '%',
      change: 8.3,
      trend: 'up',
      status: 'good',
      target: 95
    }
  ]);

  const [riskIndicators] = useState<RiskIndicator[]>([
    {
      id: 'risk-001',
      category: 'Cyber Threats',
      title: 'Advanced Persistent Threat Activity',
      description: 'Increased APT activity targeting our industry vertical with sophisticated supply chain attacks',
      riskLevel: 'high',
      impact: 'critical',
      probability: 75,
      businessImpact: 8.5,
      mitigation: 'Enhanced threat hunting and supply chain security measures',
      owner: 'CISO Office',
      dueDate: '2025-09-15T00:00:00Z'
    },
    {
      id: 'risk-002',
      category: 'Compliance',
      title: 'GDPR Compliance Gap',
      description: 'Data retention policies not fully aligned with GDPR requirements in EU operations',
      riskLevel: 'medium',
      impact: 'high',
      probability: 60,
      businessImpact: 4.2,
      mitigation: 'Update data retention policies and implement automated deletion',
      owner: 'Legal & Compliance',
      dueDate: '2025-08-30T00:00:00Z'
    },
    {
      id: 'risk-003',
      category: 'Third Party',
      title: 'Vendor Security Posture Degradation',
      description: 'Key vendor experienced security incidents affecting their security posture rating',
      riskLevel: 'medium',
      impact: 'medium',
      probability: 45,
      businessImpact: 2.8,
      mitigation: 'Enhanced vendor assessment and alternative supplier evaluation',
      owner: 'Procurement & Security',
      dueDate: '2025-08-25T00:00:00Z'
    },
    {
      id: 'risk-004',
      category: 'Infrastructure',
      title: 'Legacy System End-of-Life',
      description: 'Critical business systems reaching end-of-support with no security patches available',
      riskLevel: 'critical',
      impact: 'critical',
      probability: 90,
      businessImpact: 12.3,
      mitigation: 'Accelerated modernization program and compensating controls',
      owner: 'IT Infrastructure',
      dueDate: '2025-12-31T00:00:00Z'
    }
  ]);

  const [complianceStatus] = useState<ComplianceStatus[]>([
    {
      framework: 'SOC 2 Type II',
      score: 94,
      status: 'compliant',
      lastAudit: '2025-06-15T00:00:00Z',
      nextAudit: '2026-06-15T00:00:00Z',
      criticalFindings: 0,
      totalRequirements: 67,
      compliantRequirements: 63
    },
    {
      framework: 'PCI DSS',
      score: 89,
      status: 'compliant',
      lastAudit: '2025-07-01T00:00:00Z',
      nextAudit: '2026-07-01T00:00:00Z',
      criticalFindings: 1,
      totalRequirements: 315,
      compliantRequirements: 281
    },
    {
      framework: 'ISO 27001',
      score: 76,
      status: 'partial',
      lastAudit: '2025-05-20T00:00:00Z',
      nextAudit: '2025-11-20T00:00:00Z',
      criticalFindings: 3,
      totalRequirements: 114,
      compliantRequirements: 87
    },
    {
      framework: 'GDPR',
      score: 82,
      status: 'partial',
      lastAudit: '2025-04-10T00:00:00Z',
      nextAudit: '2025-10-10T00:00:00Z',
      criticalFindings: 2,
      totalRequirements: 87,
      compliantRequirements: 71
    }
  ]);

  const [recentIncidents] = useState<SecurityIncident[]>([
    {
      id: 'inc-001',
      title: 'Phishing Campaign Targeting Finance Team',
      severity: 'high',
      status: 'resolved',
      detectedDate: '2025-08-05T09:30:00Z',
      resolvedDate: '2025-08-05T16:45:00Z',
      affectedSystems: 12,
      businessImpact: 'Minimal - no data compromise, user awareness training provided',
      estimatedCost: 8500
    },
    {
      id: 'inc-002',
      title: 'Malware Detection on Development Server',
      severity: 'medium',
      status: 'resolved',
      detectedDate: '2025-08-07T14:20:00Z',
      resolvedDate: '2025-08-07T18:30:00Z',
      affectedSystems: 3,
      businessImpact: 'Low - isolated environment, no production impact',
      estimatedCost: 3200
    },
    {
      id: 'inc-003',
      title: 'Unauthorized Access Attempt',
      severity: 'critical',
      status: 'investigating',
      detectedDate: '2025-08-08T22:15:00Z',
      affectedSystems: 1,
      businessImpact: 'Under investigation - potential data access',
      estimatedCost: 15000
    }
  ]);

  const [securityInvestments] = useState<InvestmentROI[]>([
    {
      category: 'Security Operations Center',
      investment: 2800000,
      savings: 4200000,
      roi: 150,
      timeframe: '24 months',
      description: '24/7 SOC with advanced threat detection and response capabilities'
    },
    {
      category: 'Zero Trust Architecture',
      investment: 1500000,
      savings: 2100000,
      roi: 140,
      timeframe: '18 months',
      description: 'Identity-based security with micro-segmentation and continuous verification'
    },
    {
      category: 'Security Awareness Training',
      investment: 180000,
      savings: 890000,
      roi: 494,
      timeframe: '12 months',
      description: 'Comprehensive user security training and phishing simulation program'
    },
    {
      category: 'Vulnerability Management',
      investment: 420000,
      savings: 1200000,
      roi: 286,
      timeframe: '15 months',
      description: 'Automated vulnerability scanning and patch management platform'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'critical': return 'text-red-600';
      case 'compliant': return 'bg-green-100 text-green-800';
      case 'partial': return 'bg-yellow-100 text-yellow-800';
      case 'non_compliant': return 'bg-red-100 text-red-800';
      default: return 'text-gray-600';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTrendIcon = (trend: string, change: number) => {
    if (trend === 'up') {
      return change > 0 ? <TrendingUp className="h-4 w-4 text-green-600" /> : <TrendingUp className="h-4 w-4 text-red-600" />;
    } else if (trend === 'down') {
      return change < 0 ? <TrendingDown className="h-4 w-4 text-green-600" /> : <TrendingDown className="h-4 w-4 text-red-600" />;
    }
    return <Minus className="h-4 w-4 text-gray-600" />;
  };

  // Calculate summary metrics
  const totalSecuritySpend = securityInvestments.reduce((sum, inv) => sum + inv.investment, 0);
  const totalSavings = securityInvestments.reduce((sum, inv) => sum + inv.savings, 0);
  const avgROI = securityInvestments.reduce((sum, inv) => sum + inv.roi, 0) / securityInvestments.length;
  const highRiskCount = riskIndicators.filter(r => r.riskLevel === 'high' || r.riskLevel === 'critical').length;

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
              Executive Security Dashboard
            </h1>
            <p className="text-lg text-gray-600 mt-2">
              Strategic security insights and risk management overview for executive leadership
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">7 Days</SelectItem>
                <SelectItem value="30d">30 Days</SelectItem>
                <SelectItem value="90d">90 Days</SelectItem>
                <SelectItem value="12m">12 Months</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="risk" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Risk Management
          </TabsTrigger>
          <TabsTrigger value="compliance" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Compliance
          </TabsTrigger>
          <TabsTrigger value="incidents" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Incidents
          </TabsTrigger>
          <TabsTrigger value="investment" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            ROI & Investment
          </TabsTrigger>
        </TabsList>

        {/* Executive Overview */}
        <TabsContent value="overview" className="space-y-6">
          {/* Key Security Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {securityMetrics.map((metric, index) => (
              <motion.div
                key={metric.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{metric.name}</p>
                        <div className="flex items-center gap-2">
                          <span className={`text-3xl font-bold ${getStatusColor(metric.status)}`}>
                            {metric.value}{metric.unit}
                          </span>
                          {getTrendIcon(metric.trend, metric.change)}
                        </div>
                      </div>
                      <Gauge className={`h-8 w-8 ${getStatusColor(metric.status)}`} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Change:</span>
                        <span className={metric.change > 0 ? 'text-green-600' : 'text-red-600'}>
                          {metric.change > 0 ? '+' : ''}{metric.change}%
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Target:</span>
                        <span className="text-gray-600">{metric.target}{metric.unit}</span>
                      </div>
                      <Progress 
                        value={Math.min((metric.value / metric.target) * 100, 100)} 
                        className="h-2" 
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Executive Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Executive Summary
              </CardTitle>
              <CardDescription>Key security insights and strategic recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Current Security Posture</h3>
                  <div className="space-y-3">
                    <Alert>
                      <CheckCircle2 className="h-4 w-4" />
                      <AlertDescription>
                        Security posture improved by 5.2% this month with significant reduction 
                        in incident response times and vulnerability exposure windows.
                      </AlertDescription>
                    </Alert>
                    <Alert>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        {highRiskCount} high-priority risks require executive attention, 
                        particularly legacy system end-of-life and APT threat landscape changes.
                      </AlertDescription>
                    </Alert>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Strategic Recommendations</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <ArrowUpRight className="h-4 w-4 text-blue-600 mt-0.5" />
                      Accelerate legacy system modernization program to reduce critical infrastructure risks
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowUpRight className="h-4 w-4 text-blue-600 mt-0.5" />
                      Expand security awareness training to address evolving phishing techniques
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowUpRight className="h-4 w-4 text-blue-600 mt-0.5" />
                      Consider additional investment in threat intelligence and hunting capabilities
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowUpRight className="h-4 w-4 text-blue-600 mt-0.5" />
                      Enhance vendor security assessment program following recent third-party incidents
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Investment Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Security Investment Impact
              </CardTitle>
              <CardDescription>Financial impact of security investments and initiatives</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-600">${(totalSecuritySpend/1000000).toFixed(1)}M</p>
                  <p className="text-sm text-gray-600">Total Investment</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-600">${(totalSavings/1000000).toFixed(1)}M</p>
                  <p className="text-sm text-gray-600">Cost Avoidance</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-purple-600">{avgROI.toFixed(0)}%</p>
                  <p className="text-sm text-gray-600">Average ROI</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-orange-600">18</p>
                  <p className="text-sm text-gray-600">Months Payback</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Risk Management */}
        <TabsContent value="risk" className="space-y-6">
          {/* Risk Heat Map */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Strategic Risk Portfolio
              </CardTitle>
              <CardDescription>High-priority risks requiring executive oversight and decision-making</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                {riskIndicators.map((risk, index) => (
                  <motion.div
                    key={risk.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border rounded-lg p-6"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">{risk.title}</h3>
                          <Badge className={getRiskColor(risk.riskLevel)}>
                            {risk.riskLevel} risk
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-3">{risk.description}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="flex items-center gap-1">
                            <Building className="h-4 w-4" />
                            {risk.category}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {risk.owner}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Due {new Date(risk.dueDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-red-600 mb-1">
                          ${risk.businessImpact}M
                        </div>
                        <p className="text-xs text-gray-600">Potential Impact</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm font-medium mb-1">Probability</p>
                        <div className="flex items-center gap-2">
                          <Progress value={risk.probability} className="flex-1" />
                          <span className="text-sm">{risk.probability}%</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-1">Impact Level</p>
                        <Badge className={getRiskColor(risk.impact)}>
                          {risk.impact}
                        </Badge>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <p className="text-sm font-medium mb-2">Mitigation Strategy</p>
                      <p className="text-sm text-gray-600">{risk.mitigation}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Compliance Status */}
        <TabsContent value="compliance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {complianceStatus.map((compliance, index) => (
              <motion.div
                key={compliance.framework}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle className="text-lg">{compliance.framework}</CardTitle>
                        <CardDescription>Regulatory compliance assessment</CardDescription>
                      </div>
                      <Badge className={getStatusColor(compliance.status)}>
                        {compliance.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-blue-600 mb-2">{compliance.score}%</div>
                      <Progress value={compliance.score} className="mb-2" />
                      <p className="text-sm text-gray-600">
                        {compliance.compliantRequirements} of {compliance.totalRequirements} requirements met
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium">Last Audit</p>
                        <p className="text-gray-600">{new Date(compliance.lastAudit).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="font-medium">Next Audit</p>
                        <p className="text-gray-600">{new Date(compliance.nextAudit).toLocaleDateString()}</p>
                      </div>
                    </div>

                    {compliance.criticalFindings > 0 && (
                      <Alert>
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>
                          {compliance.criticalFindings} critical findings require immediate attention
                        </AlertDescription>
                      </Alert>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Security Incidents */}
        <TabsContent value="incidents" className="space-y-6">
          <div className="grid gap-6">
            {recentIncidents.map((incident, index) => (
              <motion.div
                key={incident.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{incident.title}</CardTitle>
                        <CardDescription>
                          Detected: {new Date(incident.detectedDate).toLocaleString()}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getSeverityColor(incident.severity)}>
                          {incident.severity}
                        </Badge>
                        <Badge className={getStatusColor(incident.status === 'resolved' ? 'good' : 'warning')}>
                          {incident.status}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="font-medium">Affected Systems</p>
                        <p className="text-gray-600">{incident.affectedSystems}</p>
                      </div>
                      <div>
                        <p className="font-medium">Estimated Cost</p>
                        <p className="text-gray-600">${incident.estimatedCost.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="font-medium">Time to Resolution</p>
                        <p className="text-gray-600">
                          {incident.resolvedDate ? 
                            `${Math.round((new Date(incident.resolvedDate).getTime() - new Date(incident.detectedDate).getTime()) / (1000 * 60 * 60))} hours` :
                            'In progress'
                          }
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="font-medium text-gray-700 mb-2">Business Impact</p>
                      <p className="text-gray-600 text-sm">{incident.businessImpact}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Investment ROI */}
        <TabsContent value="investment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Security Investment Performance
              </CardTitle>
              <CardDescription>Return on investment analysis for security initiatives</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                {securityInvestments.map((investment, index) => (
                  <motion.div
                    key={investment.category}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border rounded-lg p-6"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">{investment.category}</h3>
                        <p className="text-gray-600 text-sm">{investment.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-green-600">{investment.roi}%</div>
                        <p className="text-sm text-gray-600">ROI</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                      <div className="text-center">
                        <p className="font-medium">Investment</p>
                        <p className="text-xl font-bold text-red-600">
                          ${(investment.investment/1000000).toFixed(1)}M
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="font-medium">Cost Savings</p>
                        <p className="text-xl font-bold text-green-600">
                          ${(investment.savings/1000000).toFixed(1)}M
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="font-medium">Payback Period</p>
                        <p className="text-xl font-bold text-blue-600">{investment.timeframe}</p>
                      </div>
                      <div className="text-center">
                        <p className="font-medium">Net Benefit</p>
                        <p className="text-xl font-bold text-purple-600">
                          ${((investment.savings - investment.investment)/1000000).toFixed(1)}M
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Alert>
            <TrendingUp className="h-4 w-4" />
            <AlertDescription>
              Security investments have generated ${(totalSavings/1000000).toFixed(1)}M in cost avoidance 
              and risk mitigation, delivering an average ROI of {avgROI.toFixed(0)}% across all initiatives. 
              Continued investment in automation and threat intelligence is recommended.
            </AlertDescription>
          </Alert>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExecutiveSecurityDashboard;