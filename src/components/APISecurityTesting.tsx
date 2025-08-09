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
  Globe,
  Code,
  Shield,
  Zap,
  Play,
  Pause,
  Square,
  RefreshCw,
  Eye,
  Download,
  Upload,
  Settings,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  Activity,
  BarChart3,
  Target,
  Lock,
  Unlock,
  Key,
  Database,
  Server,
  Network,
  FileText,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Copy,
  Terminal,
  Bug,
  Crosshair,
  Radar,
  TrendingUp,
  AlertOctagon,
  Info,
  Calendar,
  Timer,
  Gauge
} from 'lucide-react';
import { motion } from 'framer-motion';

interface APIEndpoint {
  id: string;
  name: string;
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  description: string;
  authRequired: boolean;
  riskScore: number;
  lastTested: string;
  vulnerabilities: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
  status: 'active' | 'deprecated' | 'development';
  version: string;
  owner: string;
}

interface SecurityTest {
  id: string;
  name: string;
  description: string;
  category: 'authentication' | 'authorization' | 'injection' | 'data_exposure' | 'rate_limiting' | 'input_validation';
  severity: 'low' | 'medium' | 'high' | 'critical';
  technique: string;
  payload?: string;
  expectedResult: string;
  automated: boolean;
  owaspCategory: string;
}

interface TestSuite {
  id: string;
  name: string;
  description: string;
  endpoints: string[];
  tests: string[];
  schedule: 'manual' | 'daily' | 'weekly' | 'monthly';
  lastRun: string;
  status: 'passing' | 'failing' | 'warning' | 'not_run';
  passRate: number;
  totalTests: number;
  duration: number;
}

interface VulnerabilityFinding {
  id: string;
  endpointId: string;
  testId: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: string;
  cweId?: string;
  owaspCategory: string;
  discoveredDate: string;
  status: 'open' | 'acknowledged' | 'fixed' | 'false_positive';
  evidence: string;
  remediation: string;
  cvssScore?: number;
}

interface TestExecution {
  id: string;
  suiteId: string;
  suiteName: string;
  status: 'running' | 'completed' | 'failed' | 'cancelled';
  startTime: string;
  endTime?: string;
  progress: number;
  testsRun: number;
  totalTests: number;
  passed: number;
  failed: number;
  warnings: number;
  duration: number;
  findings: number;
}

const APISecurityTesting: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedEndpoint, setSelectedEndpoint] = useState<string>('all');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isScanning, setIsScanning] = useState(false);

  const [endpoints] = useState<APIEndpoint[]>([
    {
      id: 'api-001',
      name: 'User Authentication',
      url: '/api/v1/auth/login',
      method: 'POST',
      description: 'User login endpoint with JWT token generation',
      authRequired: false,
      riskScore: 85,
      lastTested: '2025-08-08T14:30:00Z',
      vulnerabilities: { critical: 1, high: 2, medium: 3, low: 1 },
      status: 'active',
      version: 'v1.2.3',
      owner: 'Authentication Service'
    },
    {
      id: 'api-002',
      name: 'User Profile',
      url: '/api/v1/users/{id}',
      method: 'GET',
      description: 'Retrieve user profile information',
      authRequired: true,
      riskScore: 65,
      lastTested: '2025-08-08T15:45:00Z',
      vulnerabilities: { critical: 0, high: 1, medium: 2, low: 4 },
      status: 'active',
      version: 'v1.2.3',
      owner: 'User Service'
    },
    {
      id: 'api-003',
      name: 'Payment Processing',
      url: '/api/v1/payments',
      method: 'POST',
      description: 'Process payment transactions',
      authRequired: true,
      riskScore: 95,
      lastTested: '2025-08-08T12:20:00Z',
      vulnerabilities: { critical: 2, high: 1, medium: 1, low: 0 },
      status: 'active',
      version: 'v2.1.0',
      owner: 'Payment Service'
    },
    {
      id: 'api-004',
      name: 'File Upload',
      url: '/api/v1/files/upload',
      method: 'POST',
      description: 'Upload files to cloud storage',
      authRequired: true,
      riskScore: 78,
      lastTested: '2025-08-07T09:30:00Z',
      vulnerabilities: { critical: 0, high: 3, medium: 2, low: 2 },
      status: 'active',
      version: 'v1.5.2',
      owner: 'File Service'
    }
  ]);

  const [securityTests] = useState<SecurityTest[]>([
    {
      id: 'test-001',
      name: 'SQL Injection Test',
      description: 'Test for SQL injection vulnerabilities in API parameters',
      category: 'injection',
      severity: 'critical',
      technique: 'Automated payload injection',
      payload: "'; DROP TABLE users; --",
      expectedResult: 'Should return error without exposing database structure',
      automated: true,
      owaspCategory: 'A03:2021 – Injection'
    },
    {
      id: 'test-002',
      name: 'Authentication Bypass',
      description: 'Attempt to bypass authentication mechanisms',
      category: 'authentication',
      severity: 'critical',
      technique: 'JWT token manipulation',
      expectedResult: 'Should reject invalid or manipulated tokens',
      automated: true,
      owaspCategory: 'A07:2021 – Identification and Authentication Failures'
    },
    {
      id: 'test-003',
      name: 'Rate Limiting Validation',
      description: 'Verify rate limiting controls are properly implemented',
      category: 'rate_limiting',
      severity: 'medium',
      technique: 'Automated request flooding',
      expectedResult: 'Should throttle requests after threshold',
      automated: true,
      owaspCategory: 'A04:2021 – Insecure Design'
    },
    {
      id: 'test-004',
      name: 'Privilege Escalation',
      description: 'Test for vertical and horizontal privilege escalation',
      category: 'authorization',
      severity: 'high',
      technique: 'Parameter manipulation',
      expectedResult: 'Should maintain proper access controls',
      automated: true,
      owaspCategory: 'A01:2021 – Broken Access Control'
    }
  ]);

  const [testSuites] = useState<TestSuite[]>([
    {
      id: 'suite-001',
      name: 'Authentication & Authorization Suite',
      description: 'Comprehensive testing of authentication and authorization mechanisms',
      endpoints: ['api-001', 'api-002'],
      tests: ['test-001', 'test-002', 'test-004'],
      schedule: 'daily',
      lastRun: '2025-08-08T16:00:00Z',
      status: 'failing',
      passRate: 78.5,
      totalTests: 47,
      duration: 45
    },
    {
      id: 'suite-002',
      name: 'Payment Security Suite',
      description: 'Specialized testing for payment processing endpoints',
      endpoints: ['api-003'],
      tests: ['test-001', 'test-002', 'test-003', 'test-004'],
      schedule: 'daily',
      lastRun: '2025-08-08T14:30:00Z',
      status: 'failing',
      passRate: 65.2,
      totalTests: 23,
      duration: 32
    },
    {
      id: 'suite-003',
      name: 'File Upload Security Suite',
      description: 'Security testing for file upload and processing endpoints',
      endpoints: ['api-004'],
      tests: ['test-001', 'test-003'],
      schedule: 'weekly',
      lastRun: '2025-08-07T10:00:00Z',
      status: 'warning',
      passRate: 82.6,
      totalTests: 15,
      duration: 18
    }
  ]);

  const [vulnerabilities] = useState<VulnerabilityFinding[]>([
    {
      id: 'vuln-001',
      endpointId: 'api-001',
      testId: 'test-001',
      title: 'SQL Injection in Login Parameter',
      description: 'Username parameter vulnerable to SQL injection allowing database access',
      severity: 'critical',
      category: 'Injection',
      cweId: 'CWE-89',
      owaspCategory: 'A03:2021 – Injection',
      discoveredDate: '2025-08-08T14:30:00Z',
      status: 'open',
      evidence: 'SELECT * FROM users WHERE username = \'\' OR 1=1 --\' AND password = \'\'',
      remediation: 'Implement parameterized queries and input validation',
      cvssScore: 9.1
    },
    {
      id: 'vuln-002',
      endpointId: 'api-003',
      testId: 'test-002',
      title: 'JWT Token Manipulation',
      description: 'JWT tokens can be manipulated to escalate privileges',
      severity: 'high',
      category: 'Authentication',
      cweId: 'CWE-287',
      owaspCategory: 'A07:2021 – Identification and Authentication Failures',
      discoveredDate: '2025-08-08T12:20:00Z',
      status: 'acknowledged',
      evidence: 'Modified JWT payload to change user role from "user" to "admin"',
      remediation: 'Implement proper JWT signature verification and role validation',
      cvssScore: 7.5
    },
    {
      id: 'vuln-003',
      endpointId: 'api-004',
      testId: 'test-003',
      title: 'Insufficient Rate Limiting',
      description: 'File upload endpoint lacks proper rate limiting controls',
      severity: 'medium',
      category: 'Rate Limiting',
      cweId: 'CWE-770',
      owaspCategory: 'A04:2021 – Insecure Design',
      discoveredDate: '2025-08-07T09:30:00Z',
      status: 'fixed',
      evidence: 'Successfully uploaded 1000 files in 60 seconds without throttling',
      remediation: 'Implement rate limiting based on user/IP with exponential backoff',
      cvssScore: 5.3
    }
  ]);

  const [executions] = useState<TestExecution[]>([
    {
      id: 'exec-001',
      suiteId: 'suite-001',
      suiteName: 'Authentication & Authorization Suite',
      status: 'running',
      startTime: '2025-08-09T16:30:00Z',
      progress: 68,
      testsRun: 32,
      totalTests: 47,
      passed: 25,
      failed: 4,
      warnings: 3,
      duration: 28,
      findings: 7
    },
    {
      id: 'exec-002',
      suiteId: 'suite-002',
      suiteName: 'Payment Security Suite',
      status: 'completed',
      startTime: '2025-08-09T14:30:00Z',
      endTime: '2025-08-09T15:02:00Z',
      progress: 100,
      testsRun: 23,
      totalTests: 23,
      passed: 15,
      failed: 6,
      warnings: 2,
      duration: 32,
      findings: 8
    }
  ]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-100 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-100 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-100 border-green-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passing': return 'bg-green-100 text-green-800';
      case 'failing': return 'bg-red-100 text-red-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'not_run': return 'bg-gray-100 text-gray-800';
      case 'running': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      case 'open': return 'bg-red-100 text-red-800';
      case 'acknowledged': return 'bg-yellow-100 text-yellow-800';
      case 'fixed': return 'bg-green-100 text-green-800';
      case 'false_positive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'bg-blue-100 text-blue-800';
      case 'POST': return 'bg-green-100 text-green-800';
      case 'PUT': return 'bg-orange-100 text-orange-800';
      case 'DELETE': return 'bg-red-100 text-red-800';
      case 'PATCH': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'authentication': return <Lock className="h-4 w-4" />;
      case 'authorization': return <Key className="h-4 w-4" />;
      case 'injection': return <Bug className="h-4 w-4" />;
      case 'data_exposure': return <Eye className="h-4 w-4" />;
      case 'rate_limiting': return <Timer className="h-4 w-4" />;
      case 'input_validation': return <Shield className="h-4 w-4" />;
      default: return <Target className="h-4 w-4" />;
    }
  };

  const getRiskColor = (riskScore: number) => {
    if (riskScore >= 80) return 'text-red-600';
    if (riskScore >= 60) return 'text-orange-600';
    if (riskScore >= 40) return 'text-yellow-600';
    return 'text-green-600';
  };

  const startScan = async (suiteId?: string) => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
    }, 5000);
  };

  // Calculate metrics
  const totalEndpoints = endpoints.length;
  const totalVulnerabilities = vulnerabilities.length;
  const criticalVulns = vulnerabilities.filter(v => v.severity === 'critical').length;
  const avgRiskScore = Math.round(endpoints.reduce((sum, ep) => sum + ep.riskScore, 0) / endpoints.length);
  const openVulns = vulnerabilities.filter(v => v.status === 'open').length;

  const filteredEndpoints = endpoints.filter(endpoint => {
    const matchesSearch = searchQuery === '' || 
      endpoint.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      endpoint.url.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const filteredVulnerabilities = vulnerabilities.filter(vuln => {
    const matchesSeverity = selectedSeverity === 'all' || vuln.severity === selectedSeverity;
    const matchesSearch = searchQuery === '' || 
      vuln.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vuln.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSeverity && matchesSearch;
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
          API Security Testing Platform
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl">
          Comprehensive API security testing with automated vulnerability discovery, 
          OWASP Top 10 coverage, and continuous security monitoring for REST and GraphQL APIs.
        </p>
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="endpoints" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Endpoints
          </TabsTrigger>
          <TabsTrigger value="test-suites" className="flex items-center gap-2">
            <Crosshair className="h-4 w-4" />
            Test Suites
          </TabsTrigger>
          <TabsTrigger value="vulnerabilities" className="flex items-center gap-2">
            <Bug className="h-4 w-4" />
            Vulnerabilities
          </TabsTrigger>
          <TabsTrigger value="tests" className="flex items-center gap-2">
            <Code className="h-4 w-4" />
            Security Tests
          </TabsTrigger>
          <TabsTrigger value="scanner" className="flex items-center gap-2">
            <Radar className="h-4 w-4" />
            Scanner
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
                    <p className="text-sm font-medium text-gray-600">API Endpoints</p>
                    <p className="text-3xl font-bold text-blue-600">{totalEndpoints}</p>
                  </div>
                  <Globe className="h-8 w-8 text-blue-600" />
                </div>
                <p className="text-xs text-gray-500 mt-2">Under security testing</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Critical Vulnerabilities</p>
                    <p className="text-3xl font-bold text-red-600">{criticalVulns}</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                </div>
                <p className="text-xs text-red-600 mt-2">{openVulns} open findings</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Average Risk Score</p>
                    <p className={`text-3xl font-bold ${getRiskColor(avgRiskScore)}`}>{avgRiskScore}</p>
                  </div>
                  <Gauge className="h-8 w-8 text-orange-600" />
                </div>
                <p className="text-xs text-gray-500 mt-2">Across all endpoints</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Test Coverage</p>
                    <p className="text-3xl font-bold text-green-600">87%</p>
                  </div>
                  <Target className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-xs text-green-600 mt-2">OWASP Top 10 coverage</p>
              </CardContent>
            </Card>
          </div>

          {/* Running Tests */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Active Test Executions
              </CardTitle>
              <CardDescription>Currently running API security test suites</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {executions.filter(e => e.status === 'running').map((execution, index) => (
                  <motion.div
                    key={execution.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 border rounded-lg bg-blue-50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-blue-100 rounded-full">
                        <Play className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{execution.suiteName}</h4>
                        <p className="text-sm text-gray-600">
                          Test {execution.testsRun} of {execution.totalTests}
                        </p>
                        <p className="text-xs text-gray-500">Running for {execution.duration} minutes</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                          <span>{execution.passed} passed</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <XCircle className="h-4 w-4 text-red-600" />
                          <span>{execution.failed} failed</span>
                        </div>
                      </div>
                      <div className="w-32">
                        <Progress value={execution.progress} />
                      </div>
                      <span className="text-sm font-medium">{execution.progress}%</span>
                      <div className="flex gap-1">
                        <Button size="sm" variant="outline">
                          <Pause className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
                {executions.filter(e => e.status === 'running').length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Radar className="h-12 w-12 mx-auto mb-2" />
                    <p>No active test executions</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Recent Vulnerabilities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bug className="h-5 w-5" />
                Recent Security Findings
              </CardTitle>
              <CardDescription>Latest vulnerabilities discovered in API endpoints</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {vulnerabilities.slice(0, 5).map((vuln, index) => (
                  <motion.div
                    key={vuln.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-full ${getSeverityColor(vuln.severity)}`}>
                        <AlertTriangle className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{vuln.title}</h4>
                        <p className="text-sm text-gray-600">{vuln.category}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(vuln.discoveredDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getSeverityColor(vuln.severity)}>
                        {vuln.severity}
                      </Badge>
                      <Badge className={getStatusColor(vuln.status)}>
                        {vuln.status}
                      </Badge>
                      {vuln.cvssScore && (
                        <Badge variant="outline">
                          CVSS {vuln.cvssScore}
                        </Badge>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* API Endpoints */}
        <TabsContent value="endpoints" className="space-y-6">
          {/* Endpoint Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <Input
                    placeholder="Search endpoints..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="max-w-sm"
                  />
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Import OpenAPI
                  </Button>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Endpoint
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Endpoints List */}
          <div className="grid gap-6">
            {filteredEndpoints.map((endpoint, index) => (
              <motion.div
                key={endpoint.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <Globe className="h-6 w-6 text-blue-600" />
                        <div>
                          <CardTitle className="text-lg flex items-center gap-2">
                            {endpoint.name}
                            <Badge className={getMethodColor(endpoint.method)}>
                              {endpoint.method}
                            </Badge>
                          </CardTitle>
                          <CardDescription className="font-mono text-sm">
                            {endpoint.url}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-right">
                          <p className={`text-2xl font-bold ${getRiskColor(endpoint.riskScore)}`}>
                            {endpoint.riskScore}
                          </p>
                          <p className="text-xs text-gray-600">Risk Score</p>
                        </div>
                        {endpoint.authRequired && (
                          <Lock className="h-5 w-5 text-yellow-600" title="Authentication Required" />
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-gray-600">{endpoint.description}</p>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="font-medium text-gray-700">Version</p>
                          <p className="text-gray-600">{endpoint.version}</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-700">Owner</p>
                          <p className="text-gray-600">{endpoint.owner}</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-700">Status</p>
                          <Badge className={getStatusColor(endpoint.status === 'active' ? 'passing' : 'warning')}>
                            {endpoint.status}
                          </Badge>
                        </div>
                        <div>
                          <p className="font-medium text-gray-700">Last Tested</p>
                          <p className="text-gray-600">{new Date(endpoint.lastTested).toLocaleDateString()}</p>
                        </div>
                      </div>

                      {/* Vulnerability Summary */}
                      <div className="border-t pt-4">
                        <p className="font-medium text-gray-700 mb-2">Vulnerabilities</p>
                        <div className="grid grid-cols-4 gap-4 text-center">
                          <div className="p-2 bg-red-50 rounded">
                            <p className="text-lg font-bold text-red-600">{endpoint.vulnerabilities.critical}</p>
                            <p className="text-xs text-gray-600">Critical</p>
                          </div>
                          <div className="p-2 bg-orange-50 rounded">
                            <p className="text-lg font-bold text-orange-600">{endpoint.vulnerabilities.high}</p>
                            <p className="text-xs text-gray-600">High</p>
                          </div>
                          <div className="p-2 bg-yellow-50 rounded">
                            <p className="text-lg font-bold text-yellow-600">{endpoint.vulnerabilities.medium}</p>
                            <p className="text-xs text-gray-600">Medium</p>
                          </div>
                          <div className="p-2 bg-green-50 rounded">
                            <p className="text-lg font-bold text-green-600">{endpoint.vulnerabilities.low}</p>
                            <p className="text-xs text-gray-600">Low</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-4 border-t">
                        <div className="text-sm text-gray-600">
                          Total vulnerabilities: {Object.values(endpoint.vulnerabilities).reduce((a, b) => a + b, 0)}
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            Details
                          </Button>
                          <Button size="sm" variant="outline">
                            <Settings className="h-4 w-4 mr-1" />
                            Configure
                          </Button>
                          <Button size="sm">
                            <Zap className="h-4 w-4 mr-1" />
                            Test Now
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

        {/* Test Suites */}
        <TabsContent value="test-suites" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Test Suites</h2>
              <p className="text-gray-600">Organized collections of security tests for API endpoints</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Results
              </Button>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Suite
              </Button>
            </div>
          </div>

          <div className="grid gap-6">
            {testSuites.map((suite, index) => (
              <motion.div
                key={suite.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <Crosshair className="h-6 w-6 text-purple-600" />
                        <div>
                          <CardTitle className="text-lg">{suite.name}</CardTitle>
                          <CardDescription>{suite.description}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(suite.status)}>
                          {suite.status}
                        </Badge>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-blue-600">{suite.passRate}%</p>
                          <p className="text-xs text-gray-600">Pass Rate</p>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="font-medium text-gray-700">Total Tests</p>
                        <p className="text-gray-600">{suite.totalTests}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">Endpoints</p>
                        <p className="text-gray-600">{suite.endpoints.length}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">Schedule</p>
                        <p className="text-gray-600 capitalize">{suite.schedule}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">Duration</p>
                        <p className="text-gray-600">{suite.duration}m</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Test Coverage</span>
                        <span>{suite.passRate}%</span>
                      </div>
                      <Progress value={suite.passRate} className="h-2" />
                    </div>

                    <div className="pt-4 border-t flex justify-between items-center">
                      <p className="text-sm text-gray-600">
                        Last run: {new Date(suite.lastRun).toLocaleString()}
                      </p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" />
                          View Tests
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => startScan(suite.id)}
                          disabled={isScanning}
                        >
                          <Play className="h-4 w-4 mr-1" />
                          Run Suite
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Vulnerabilities */}
        <TabsContent value="vulnerabilities" className="space-y-6">
          {/* Vulnerability Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <Input
                    placeholder="Search vulnerabilities..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="max-w-sm"
                  />
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
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Vulnerabilities List */}
          <div className="grid gap-6">
            {filteredVulnerabilities.map((vuln, index) => (
              <motion.div
                key={vuln.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${getSeverityColor(vuln.severity)}`}>
                          <Bug className="h-5 w-5" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{vuln.title}</CardTitle>
                          <CardDescription>{vuln.description}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getSeverityColor(vuln.severity)}>
                          {vuln.severity}
                        </Badge>
                        <Badge className={getStatusColor(vuln.status)}>
                          {vuln.status}
                        </Badge>
                        {vuln.cvssScore && (
                          <Badge variant="outline">
                            CVSS {vuln.cvssScore}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="font-medium text-gray-700">Category</p>
                        <p className="text-gray-600">{vuln.category}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">OWASP Category</p>
                        <p className="text-gray-600">{vuln.owaspCategory}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">CWE ID</p>
                        <p className="text-gray-600">{vuln.cweId || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">Discovered</p>
                        <p className="text-gray-600">{new Date(vuln.discoveredDate).toLocaleDateString()}</p>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <p className="font-medium text-gray-700 mb-2">Evidence</p>
                      <div className="bg-gray-50 p-3 rounded font-mono text-sm">
                        {vuln.evidence}
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <p className="font-medium text-gray-700 mb-2">Remediation</p>
                      <p className="text-gray-600 text-sm">{vuln.remediation}</p>
                    </div>

                    <div className="flex justify-end gap-2 pt-4 border-t">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-1" />
                        Details
                      </Button>
                      <Button size="sm" variant="outline">
                        <Copy className="h-4 w-4 mr-1" />
                        Copy
                      </Button>
                      {vuln.status === 'open' && (
                        <Button size="sm">
                          <CheckCircle2 className="h-4 w-4 mr-1" />
                          Mark Fixed
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Security Tests */}
        <TabsContent value="tests" className="space-y-6">
          <div className="grid gap-4">
            {securityTests.map((test, index) => (
              <motion.div
                key={test.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        {getCategoryIcon(test.category)}
                        <div>
                          <h3 className="text-lg font-semibold">{test.name}</h3>
                          <p className="text-gray-600">{test.description}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge className={getSeverityColor(test.severity)}>
                              {test.severity}
                            </Badge>
                            <Badge variant="outline">{test.category}</Badge>
                            {test.automated && (
                              <Badge className="bg-blue-100 text-blue-800">
                                Automated
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="font-medium text-gray-700">Technique</p>
                          <p className="text-gray-600">{test.technique}</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-700">OWASP Category</p>
                          <p className="text-gray-600">{test.owaspCategory}</p>
                        </div>
                        <div className="col-span-2">
                          <p className="font-medium text-gray-700 mb-1">Expected Result</p>
                          <p className="text-gray-600 text-sm">{test.expectedResult}</p>
                        </div>
                        {test.payload && (
                          <div className="col-span-2">
                            <p className="font-medium text-gray-700 mb-1">Test Payload</p>
                            <div className="bg-gray-50 p-2 rounded font-mono text-xs">
                              {test.payload}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* API Scanner */}
        <TabsContent value="scanner" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Radar className="h-5 w-5" />
                API Security Scanner
              </CardTitle>
              <CardDescription>
                Automated security testing and vulnerability discovery for API endpoints
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="scan-target">Target API Endpoint</Label>
                    <Input
                      id="scan-target"
                      placeholder="https://api.example.com/v1/"
                      className="mt-2"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="scan-type">Scan Type</Label>
                    <Select defaultValue="comprehensive">
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="quick">Quick Scan</SelectItem>
                        <SelectItem value="standard">Standard Scan</SelectItem>
                        <SelectItem value="comprehensive">Comprehensive Scan</SelectItem>
                        <SelectItem value="custom">Custom Tests</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="auth-token">Authentication Token (Optional)</Label>
                    <Input
                      id="auth-token"
                      type="password"
                      placeholder="Bearer token or API key"
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="scan-config">Additional Configuration</Label>
                    <Textarea
                      id="scan-config"
                      placeholder="Custom headers, parameters, or OpenAPI spec URL..."
                      className="mt-2"
                      rows={4}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Scan Configuration</h3>
                  <div className="space-y-3">
                    {[
                      'OWASP Top 10 API Security',
                      'Authentication & Authorization',
                      'Input Validation',
                      'Rate Limiting',
                      'Data Exposure',
                      'Business Logic Flaws'
                    ].map((category, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 border rounded">
                        <span className="text-sm">{category}</span>
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <Button 
                  size="lg" 
                  onClick={() => startScan()}
                  disabled={isScanning}
                  className="flex items-center gap-2"
                >
                  {isScanning ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <Zap className="h-5 w-5" />
                  )}
                  {isScanning ? 'Scanning...' : 'Start Security Scan'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Scan History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Recent Scan History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {executions.slice(0, 3).map((execution, index) => (
                  <div key={execution.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Badge className={getStatusColor(execution.status)}>
                        {execution.status}
                      </Badge>
                      <div>
                        <p className="font-semibold">{execution.suiteName}</p>
                        <p className="text-sm text-gray-600">
                          {execution.testsRun} tests • {execution.findings} findings
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(execution.startTime).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right text-sm">
                        <p className="text-green-600">{execution.passed} passed</p>
                        <p className="text-red-600">{execution.failed} failed</p>
                      </div>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-1" />
                        View
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

export default APISecurityTesting;