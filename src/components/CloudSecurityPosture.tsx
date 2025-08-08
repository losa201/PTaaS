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
  Cloud, 
  Shield, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Eye,
  Settings,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Activity,
  Lock,
  Key,
  Database,
  Server,
  Globe,
  Network,
  FileCheck,
  Users,
  Clock,
  Zap,
  Target,
  Filter,
  Search,
  Download,
  Upload,
  HardDrive,
  Cpu,
  Wifi,
  Calendar,
  MapPin,
  Building,
  Layers,
  GitBranch
} from 'lucide-react';
import { motion } from 'framer-motion';

interface CloudAsset {
  id: string;
  name: string;
  type: 'compute' | 'storage' | 'database' | 'network' | 'security' | 'iam';
  provider: 'aws' | 'azure' | 'gcp' | 'multi-cloud';
  region: string;
  environment: 'production' | 'staging' | 'development';
  riskScore: number;
  securityScore: number;
  complianceStatus: 'compliant' | 'non-compliant' | 'unknown';
  vulnerabilities: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
  misconfigurations: number;
  lastScanned: string;
  cost: number;
  owner: string;
}

interface SecurityFinding {
  id: string;
  title: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  category: 'configuration' | 'vulnerability' | 'compliance' | 'access' | 'encryption';
  resource: string;
  provider: string;
  region: string;
  status: 'open' | 'acknowledged' | 'resolved' | 'false_positive';
  firstDetected: string;
  lastUpdated: string;
  remediation: string;
  impact: string;
}

interface ComplianceFramework {
  id: string;
  name: string;
  description: string;
  totalControls: number;
  compliantControls: number;
  nonCompliantControls: number;
  unknownControls: number;
  compliancePercentage: number;
  lastAssessment: string;
  critical_failures: number;
}

interface CloudProvider {
  name: string;
  assets: number;
  securityScore: number;
  complianceScore: number;
  criticalIssues: number;
  totalCost: number;
  regions: string[];
}

const CloudSecurityPosture: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedProvider, setSelectedProvider] = useState<string>('all');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isScanning, setIsScanning] = useState(false);

  const [cloudProviders] = useState<CloudProvider[]>([
    {
      name: 'AWS',
      assets: 847,
      securityScore: 87,
      complianceScore: 92,
      criticalIssues: 12,
      totalCost: 45670,
      regions: ['us-east-1', 'us-west-2', 'eu-west-1']
    },
    {
      name: 'Azure',
      assets: 324,
      securityScore: 91,
      complianceScore: 89,
      criticalIssues: 8,
      totalCost: 23450,
      regions: ['East US', 'West Europe', 'Southeast Asia']
    },
    {
      name: 'GCP',
      assets: 156,
      securityScore: 94,
      complianceScore: 96,
      criticalIssues: 3,
      totalCost: 12890,
      regions: ['us-central1', 'europe-west1', 'asia-southeast1']
    }
  ]);

  const [assets] = useState<CloudAsset[]>([
    {
      id: 'asset-001',
      name: 'Production Web Server Cluster',
      type: 'compute',
      provider: 'aws',
      region: 'us-east-1',
      environment: 'production',
      riskScore: 75,
      securityScore: 88,
      complianceStatus: 'compliant',
      vulnerabilities: { critical: 2, high: 5, medium: 12, low: 8 },
      misconfigurations: 3,
      lastScanned: '2025-08-08T10:30:00Z',
      cost: 2450,
      owner: 'Platform Team'
    },
    {
      id: 'asset-002',
      name: 'Customer Database Primary',
      type: 'database',
      provider: 'azure',
      region: 'East US',
      environment: 'production',
      riskScore: 45,
      securityScore: 95,
      complianceStatus: 'compliant',
      vulnerabilities: { critical: 0, high: 1, medium: 3, low: 2 },
      misconfigurations: 1,
      lastScanned: '2025-08-08T11:15:00Z',
      cost: 3200,
      owner: 'Data Team'
    },
    {
      id: 'asset-003',
      name: 'API Gateway Load Balancer',
      type: 'network',
      provider: 'gcp',
      region: 'us-central1',
      environment: 'production',
      riskScore: 35,
      securityScore: 92,
      complianceStatus: 'compliant',
      vulnerabilities: { critical: 0, high: 0, medium: 2, low: 4 },
      misconfigurations: 0,
      lastScanned: '2025-08-08T09:45:00Z',
      cost: 1890,
      owner: 'Infrastructure Team'
    },
    {
      id: 'asset-004',
      name: 'Development S3 Bucket',
      type: 'storage',
      provider: 'aws',
      region: 'us-west-2',
      environment: 'development',
      riskScore: 85,
      securityScore: 62,
      complianceStatus: 'non-compliant',
      vulnerabilities: { critical: 1, high: 8, medium: 15, low: 22 },
      misconfigurations: 7,
      lastScanned: '2025-08-08T12:00:00Z',
      cost: 340,
      owner: 'Development Team'
    }
  ]);

  const [findings] = useState<SecurityFinding[]>([
    {
      id: 'find-001',
      title: 'S3 Bucket Public Read Access',
      description: 'S3 bucket configured with public read access allowing unauthorized data access',
      severity: 'critical',
      category: 'configuration',
      resource: 'dev-data-bucket',
      provider: 'AWS',
      region: 'us-west-2',
      status: 'open',
      firstDetected: '2025-08-07T14:30:00Z',
      lastUpdated: '2025-08-08T10:15:00Z',
      remediation: 'Remove public read permissions and implement bucket policy with least privilege access',
      impact: 'Potential data breach - sensitive customer data exposed to unauthorized access'
    },
    {
      id: 'find-002',
      title: 'RDS Instance Encryption Disabled',
      description: 'Database instance running without encryption at rest',
      severity: 'high',
      category: 'encryption',
      resource: 'prod-customer-db',
      provider: 'Azure',
      region: 'East US',
      status: 'acknowledged',
      firstDetected: '2025-08-06T09:20:00Z',
      lastUpdated: '2025-08-08T08:30:00Z',
      remediation: 'Enable encryption at rest using Azure Key Vault managed keys',
      impact: 'Data at rest not encrypted, violating compliance requirements'
    },
    {
      id: 'find-003',
      title: 'IAM Over-Privileged Service Account',
      description: 'Service account has excessive permissions beyond operational requirements',
      severity: 'medium',
      category: 'access',
      resource: 'api-service-account',
      provider: 'GCP',
      region: 'us-central1',
      status: 'open',
      firstDetected: '2025-08-05T16:45:00Z',
      lastUpdated: '2025-08-08T11:00:00Z',
      remediation: 'Review and implement least privilege principle for service account permissions',
      impact: 'Increased attack surface if service account is compromised'
    }
  ]);

  const [complianceFrameworks] = useState<ComplianceFramework[]>([
    {
      id: 'soc2',
      name: 'SOC 2 Type II',
      description: 'System and Organization Controls for service organizations',
      totalControls: 67,
      compliantControls: 61,
      nonCompliantControls: 4,
      unknownControls: 2,
      compliancePercentage: 91,
      lastAssessment: '2025-08-07T00:00:00Z',
      critical_failures: 1
    },
    {
      id: 'pci-dss',
      name: 'PCI DSS',
      description: 'Payment Card Industry Data Security Standard',
      totalControls: 315,
      compliantControls: 298,
      nonCompliantControls: 12,
      unknownControls: 5,
      compliancePercentage: 95,
      lastAssessment: '2025-08-06T00:00:00Z',
      critical_failures: 2
    },
    {
      id: 'iso27001',
      name: 'ISO 27001',
      description: 'Information Security Management System standard',
      totalControls: 114,
      compliantControls: 102,
      nonCompliantControls: 8,
      unknownControls: 4,
      compliancePercentage: 89,
      lastAssessment: '2025-08-05T00:00:00Z',
      critical_failures: 0
    },
    {
      id: 'gdpr',
      name: 'GDPR',
      description: 'General Data Protection Regulation',
      totalControls: 87,
      compliantControls: 83,
      nonCompliantControls: 3,
      unknownControls: 1,
      compliancePercentage: 95,
      lastAssessment: '2025-08-08T00:00:00Z',
      critical_failures: 1
    }
  ]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'bg-green-100 text-green-800';
      case 'non-compliant': return 'bg-red-100 text-red-800';
      case 'unknown': return 'bg-gray-100 text-gray-800';
      case 'open': return 'bg-red-100 text-red-800';
      case 'acknowledged': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'false_positive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProviderIcon = (provider: string) => {
    switch (provider) {
      case 'aws': return <Cloud className="h-4 w-4 text-orange-600" />;
      case 'azure': return <Cloud className="h-4 w-4 text-blue-600" />;
      case 'gcp': return <Cloud className="h-4 w-4 text-green-600" />;
      default: return <Cloud className="h-4 w-4" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'compute': return <Cpu className="h-4 w-4" />;
      case 'storage': return <HardDrive className="h-4 w-4" />;
      case 'database': return <Database className="h-4 w-4" />;
      case 'network': return <Network className="h-4 w-4" />;
      case 'security': return <Shield className="h-4 w-4" />;
      case 'iam': return <Users className="h-4 w-4" />;
      default: return <Server className="h-4 w-4" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'configuration': return <Settings className="h-4 w-4" />;
      case 'vulnerability': return <AlertTriangle className="h-4 w-4" />;
      case 'compliance': return <FileCheck className="h-4 w-4" />;
      case 'access': return <Key className="h-4 w-4" />;
      case 'encryption': return <Lock className="h-4 w-4" />;
      default: return <Shield className="h-4 w-4" />;
    }
  };

  const startCloudScan = async () => {
    setIsScanning(true);
    // Simulate scanning process
    setTimeout(() => {
      setIsScanning(false);
    }, 5000);
  };

  // Calculate overall metrics
  const totalAssets = cloudProviders.reduce((sum, provider) => sum + provider.assets, 0);
  const avgSecurityScore = Math.round(
    cloudProviders.reduce((sum, provider) => sum + provider.securityScore, 0) / cloudProviders.length
  );
  const totalCriticalIssues = cloudProviders.reduce((sum, provider) => sum + provider.criticalIssues, 0);
  const totalCost = cloudProviders.reduce((sum, provider) => sum + provider.totalCost, 0);

  const filteredFindings = findings.filter(finding => {
    const matchesProvider = selectedProvider === 'all' || finding.provider.toLowerCase() === selectedProvider.toLowerCase();
    const matchesSeverity = selectedSeverity === 'all' || finding.severity === selectedSeverity;
    const matchesSearch = searchQuery === '' || 
      finding.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      finding.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesProvider && matchesSeverity && matchesSearch;
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
          Cloud Security Posture Management
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl">
          Comprehensive visibility, continuous monitoring, and automated remediation for 
          multi-cloud security posture with real-time compliance assessment and risk management.
        </p>
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="assets" className="flex items-center gap-2">
            <Server className="h-4 w-4" />
            Assets
          </TabsTrigger>
          <TabsTrigger value="findings" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Findings
          </TabsTrigger>
          <TabsTrigger value="compliance" className="flex items-center gap-2">
            <FileCheck className="h-4 w-4" />
            Compliance
          </TabsTrigger>
          <TabsTrigger value="remediation" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Remediation
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Reports
          </TabsTrigger>
        </TabsList>

        {/* Dashboard Overview */}
        <TabsContent value="dashboard" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Assets</p>
                    <p className="text-3xl font-bold text-blue-600">{totalAssets.toLocaleString()}</p>
                  </div>
                  <Cloud className="h-8 w-8 text-blue-600" />
                </div>
                <p className="text-xs text-gray-500 mt-2">Across all cloud providers</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Security Score</p>
                    <p className="text-3xl font-bold text-green-600">{avgSecurityScore}%</p>
                  </div>
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-xs text-green-600 mt-2">+3% from last week</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Critical Issues</p>
                    <p className="text-3xl font-bold text-red-600">{totalCriticalIssues}</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                </div>
                <p className="text-xs text-red-600 mt-2">-5 from yesterday</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Monthly Cost</p>
                    <p className="text-3xl font-bold text-purple-600">${(totalCost/1000).toFixed(0)}K</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                </div>
                <p className="text-xs text-gray-500 mt-2">Cloud infrastructure spend</p>
              </CardContent>
            </Card>
          </div>

          {/* Cloud Provider Status */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Cloud className="h-5 w-5" />
                    Multi-Cloud Security Overview
                  </CardTitle>
                  <CardDescription>Security posture across cloud providers</CardDescription>
                </div>
                <Button 
                  onClick={startCloudScan}
                  disabled={isScanning}
                  className="flex items-center gap-2"
                >
                  {isScanning ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <RefreshCw className="h-4 w-4" />
                  )}
                  {isScanning ? 'Scanning...' : 'Scan Now'}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {cloudProviders.map((provider, index) => (
                  <motion.div
                    key={provider.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border rounded-lg p-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {getProviderIcon(provider.name.toLowerCase())}
                        <div>
                          <h3 className="font-semibold text-lg">{provider.name}</h3>
                          <p className="text-sm text-gray-600">
                            {provider.assets} assets • {provider.regions.length} regions
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-600">{provider.securityScore}%</p>
                        <p className="text-sm text-gray-600">Security Score</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">{provider.assets}</p>
                        <p className="text-xs text-gray-600">Assets</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-purple-600">{provider.complianceScore}%</p>
                        <p className="text-xs text-gray-600">Compliance</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-red-600">{provider.criticalIssues}</p>
                        <p className="text-xs text-gray-600">Critical Issues</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">${(provider.totalCost/1000).toFixed(1)}K</p>
                        <p className="text-xs text-gray-600">Monthly Cost</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Security Score</span>
                        <span>{provider.securityScore}%</span>
                      </div>
                      <Progress value={provider.securityScore} className="h-2" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Security Findings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Recent Security Findings
              </CardTitle>
              <CardDescription>Latest security issues detected across your cloud infrastructure</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {findings.slice(0, 5).map((finding, index) => (
                  <motion.div
                    key={finding.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-full ${getSeverityColor(finding.severity)}`}>
                        <AlertTriangle className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{finding.title}</h4>
                        <p className="text-sm text-gray-600">{finding.resource}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                          {getProviderIcon(finding.provider.toLowerCase())}
                          <span>{finding.provider}</span>
                          <span>•</span>
                          <MapPin className="h-3 w-3" />
                          <span>{finding.region}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={getSeverityColor(finding.severity).replace('text-', 'border-')}>
                        {finding.severity}
                      </Badge>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(finding.firstDetected).toLocaleDateString()}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Assets Inventory */}
        <TabsContent value="assets" className="space-y-6">
          {/* Asset Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <Input
                    placeholder="Search assets..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="max-w-sm"
                  />
                  <Select value={selectedProvider} onValueChange={setSelectedProvider}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Provider" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Providers</SelectItem>
                      <SelectItem value="aws">AWS</SelectItem>
                      <SelectItem value="azure">Azure</SelectItem>
                      <SelectItem value="gcp">GCP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button>
                  <Download className="h-4 w-4 mr-2" />
                  Export Inventory
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Assets Grid */}
          <div className="grid gap-6">
            {assets.map((asset, index) => (
              <motion.div
                key={asset.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        {getTypeIcon(asset.type)}
                        <div>
                          <CardTitle className="text-lg">{asset.name}</CardTitle>
                          <CardDescription>
                            {asset.type} • {asset.environment} • {asset.owner}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getProviderIcon(asset.provider)}
                        <Badge className={getStatusColor(asset.complianceStatus)}>
                          {asset.complianceStatus}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-blue-600">{asset.securityScore}%</p>
                          <p className="text-xs text-gray-600">Security Score</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-orange-600">{asset.riskScore}</p>
                          <p className="text-xs text-gray-600">Risk Score</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-red-600">{asset.misconfigurations}</p>
                          <p className="text-xs text-gray-600">Misconfigurations</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-green-600">${asset.cost}</p>
                          <p className="text-xs text-gray-600">Monthly Cost</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Security Score</span>
                          <span>{asset.securityScore}%</span>
                        </div>
                        <Progress value={asset.securityScore} className="h-2" />
                      </div>

                      <div className="grid grid-cols-4 gap-2 text-center text-sm">
                        <div className="p-2 bg-red-50 rounded">
                          <p className="font-semibold text-red-600">{asset.vulnerabilities.critical}</p>
                          <p className="text-xs text-gray-600">Critical</p>
                        </div>
                        <div className="p-2 bg-orange-50 rounded">
                          <p className="font-semibold text-orange-600">{asset.vulnerabilities.high}</p>
                          <p className="text-xs text-gray-600">High</p>
                        </div>
                        <div className="p-2 bg-yellow-50 rounded">
                          <p className="font-semibold text-yellow-600">{asset.vulnerabilities.medium}</p>
                          <p className="text-xs text-gray-600">Medium</p>
                        </div>
                        <div className="p-2 bg-green-50 rounded">
                          <p className="font-semibold text-green-600">{asset.vulnerabilities.low}</p>
                          <p className="text-xs text-gray-600">Low</p>
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-4 border-t">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="h-4 w-4" />
                          <span>{asset.region}</span>
                          <span>•</span>
                          <Clock className="h-4 w-4" />
                          <span>Scanned {new Date(asset.lastScanned).toLocaleDateString()}</span>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            Details
                          </Button>
                          <Button size="sm">
                            <Settings className="h-4 w-4 mr-1" />
                            Configure
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

        {/* Security Findings */}
        <TabsContent value="findings" className="space-y-6">
          {/* Finding Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <Input
                    placeholder="Search findings..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="max-w-sm"
                  />
                  <Select value={selectedProvider} onValueChange={setSelectedProvider}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Provider" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Providers</SelectItem>
                      <SelectItem value="aws">AWS</SelectItem>
                      <SelectItem value="azure">Azure</SelectItem>
                      <SelectItem value="gcp">GCP</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Severity" />
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
                <Button>
                  <Download className="h-4 w-4 mr-2" />
                  Export Findings
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Findings List */}
          <div className="space-y-4">
            {filteredFindings.map((finding, index) => (
              <motion.div
                key={finding.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        {getCategoryIcon(finding.category)}
                        <div>
                          <CardTitle className="text-lg">{finding.title}</CardTitle>
                          <CardDescription>{finding.description}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getSeverityColor(finding.severity)}>
                          {finding.severity}
                        </Badge>
                        <Badge className={getStatusColor(finding.status)}>
                          {finding.status}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="font-medium text-gray-700">Resource</p>
                          <p className="text-gray-600">{finding.resource}</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-700">Provider & Region</p>
                          <div className="flex items-center gap-2">
                            {getProviderIcon(finding.provider.toLowerCase())}
                            <span>{finding.provider} • {finding.region}</span>
                          </div>
                        </div>
                        <div>
                          <p className="font-medium text-gray-700">First Detected</p>
                          <p className="text-gray-600">{new Date(finding.firstDetected).toLocaleDateString()}</p>
                        </div>
                      </div>

                      <div className="border-t pt-4">
                        <p className="font-medium text-gray-700 mb-2">Impact</p>
                        <p className="text-gray-600 text-sm">{finding.impact}</p>
                      </div>

                      <div className="border-t pt-4">
                        <p className="font-medium text-gray-700 mb-2">Recommended Remediation</p>
                        <p className="text-gray-600 text-sm">{finding.remediation}</p>
                      </div>

                      <div className="flex justify-between items-center pt-4 border-t">
                        <p className="text-sm text-gray-500">
                          Last updated: {new Date(finding.lastUpdated).toLocaleDateString()}
                        </p>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            Details
                          </Button>
                          <Button size="sm">
                            <Zap className="h-4 w-4 mr-1" />
                            Remediate
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

        {/* Compliance Dashboard */}
        <TabsContent value="compliance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {complianceFrameworks.map((framework, index) => (
              <motion.div
                key={framework.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{framework.name}</CardTitle>
                        <CardDescription>{framework.description}</CardDescription>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-bold text-green-600">{framework.compliancePercentage}%</p>
                        <p className="text-sm text-gray-600">Compliance</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Progress value={framework.compliancePercentage} className="h-3" />
                      
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="p-3 bg-green-50 rounded">
                          <p className="text-2xl font-bold text-green-600">{framework.compliantControls}</p>
                          <p className="text-xs text-gray-600">Compliant</p>
                        </div>
                        <div className="p-3 bg-red-50 rounded">
                          <p className="text-2xl font-bold text-red-600">{framework.nonCompliantControls}</p>
                          <p className="text-xs text-gray-600">Non-Compliant</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded">
                          <p className="text-2xl font-bold text-gray-600">{framework.unknownControls}</p>
                          <p className="text-xs text-gray-600">Unknown</p>
                        </div>
                      </div>

                      <div className="pt-4 border-t flex justify-between items-center">
                        <div className="text-sm text-gray-600">
                          <p>Total Controls: {framework.totalControls}</p>
                          <p>Last Assessment: {new Date(framework.lastAssessment).toLocaleDateString()}</p>
                        </div>
                        {framework.critical_failures > 0 && (
                          <Badge className="bg-red-100 text-red-800">
                            {framework.critical_failures} Critical Failures
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Remediation Center */}
        <TabsContent value="remediation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Automated Remediation Center
              </CardTitle>
              <CardDescription>Automated fixes and remediation workflows for security findings</CardDescription>
            </CardHeader>
            <CardContent>
              <Alert>
                <Zap className="h-4 w-4" />
                <AlertDescription>
                  Automated remediation is available for 78% of detected security findings. 
                  Manual review required for critical infrastructure changes.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reports */}
        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                Security & Compliance Reports
              </CardTitle>
              <CardDescription>Generate comprehensive reports for stakeholders and auditors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Button variant="outline" className="h-20 flex flex-col">
                  <FileCheck className="h-6 w-6 mb-2" />
                  Executive Summary
                </Button>
                <Button variant="outline" className="h-20 flex flex-col">
                  <AlertTriangle className="h-6 w-6 mb-2" />
                  Security Findings
                </Button>
                <Button variant="outline" className="h-20 flex flex-col">
                  <Shield className="h-6 w-6 mb-2" />
                  Compliance Status
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CloudSecurityPosture;