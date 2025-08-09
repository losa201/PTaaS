import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { 
  Shield, 
  Target, 
  Zap, 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Globe, 
  Database,
  Lock,
  Key,
  Code,
  Search,
  Play,
  Pause,
  RotateCcw,
  Download,
  Upload,
  Settings,
  Eye,
  EyeOff,
  Clock,
  Activity,
  BarChart3,
  PieChart,
  TrendingUp,
  Filter,
  RefreshCw
} from 'lucide-react';

const APISecurityTesting = () => {
  const [activeTest, setActiveTest] = useState<string | null>(null);
  const [testProgress, setTestProgress] = useState(0);
  const [testResults, setTestResults] = useState<any[]>([]);
  const [selectedEndpoint, setSelectedEndpoint] = useState<string>('');

  const apiEndpoints = [
    { id: 1, url: '/api/v1/users', method: 'GET', status: 'active' },
    { id: 2, url: '/api/v1/auth/login', method: 'POST', status: 'active' },
    { id: 3, url: '/api/v1/payments', method: 'POST', status: 'active' },
    { id: 4, url: '/api/v1/admin/users', method: 'DELETE', status: 'deprecated' }
  ];

  const vulnerabilityTypes = [
    { name: 'SQL Injection', severity: 'critical', count: 2 },
    { name: 'XSS', severity: 'high', count: 1 },
    { name: 'CSRF', severity: 'medium', count: 3 },
    { name: 'Rate Limiting', severity: 'low', count: 5 }
  ];

  const testCategories = [
    {
      id: 'authentication',
      name: 'Authentication & Authorization',
      tests: [
        'JWT Token Validation',
        'Session Management',
        'Role-Based Access Control',
        'OAuth Implementation'
      ]
    },
    {
      id: 'input-validation',
      name: 'Input Validation',
      tests: [
        'SQL Injection',
        'NoSQL Injection',
        'Command Injection',
        'Path Traversal'
      ]
    },
    {
      id: 'business-logic',
      name: 'Business Logic',
      tests: [
        'Rate Limiting',
        'Resource Exhaustion',
        'Workflow Bypass',
        'Price Manipulation'
      ]
    }
  ];

  const runTest = (testType: string) => {
    setActiveTest(testType);
    setTestProgress(0);
    
    const interval = setInterval(() => {
      setTestProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setActiveTest(null);
          // Add mock results
          setTestResults(prev => [...prev, {
            id: Date.now(),
            type: testType,
            status: Math.random() > 0.7 ? 'failed' : 'passed',
            timestamp: new Date().toISOString(),
            details: `Test completed for ${testType}`
          }]);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-cyber bg-clip-text text-transparent">
            API Security Testing
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Comprehensive automated testing for REST APIs, GraphQL endpoints, and microservices
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <Card className="card-cyber">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Endpoints</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">247</div>
              <div className="flex items-center text-sm text-green-400 mt-1">
                <TrendingUp className="h-4 w-4 mr-1" />
                +12 this week
              </div>
            </CardContent>
          </Card>

          <Card className="card-cyber">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Critical Issues</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-400">3</div>
              <div className="flex items-center text-sm text-red-400 mt-1">
                <AlertTriangle className="h-4 w-4 mr-1" />
                Requires attention
              </div>
            </CardContent>
          </Card>

          <Card className="card-cyber">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Test Coverage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">94%</div>
              <Progress value={94} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="card-cyber">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Last Scan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">2h ago</div>
              <div className="flex items-center text-sm text-green-400 mt-1">
                <CheckCircle className="h-4 w-4 mr-1" />
                Completed
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="endpoints" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="endpoints">API Endpoints</TabsTrigger>
            <TabsTrigger value="testing">Security Testing</TabsTrigger>
            <TabsTrigger value="results">Test Results</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="endpoints" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-foreground">Discovered Endpoints</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Import OpenAPI
                </Button>
                <Button variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Auto-Discover
                </Button>
              </div>
            </div>

            <div className="grid gap-4">
              {apiEndpoints.map((endpoint) => (
                <Card key={endpoint.id} className="card-cyber">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Badge variant={endpoint.method === 'GET' ? 'secondary' : 'default'}>
                          {endpoint.method}
                        </Badge>
                        <code className="text-sm bg-background/50 px-2 py-1 rounded">
                          {endpoint.url}
                        </code>
                        <Badge variant={endpoint.status === 'active' ? 'default' : 'secondary'}>
                          {endpoint.status}
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Play className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="testing" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="card-cyber">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    Test Categories
                  </CardTitle>
                  <CardDescription>
                    Select security test categories to run
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {testCategories.map((category) => (
                    <div key={category.id} className="border border-border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-medium text-foreground">{category.name}</h3>
                        <Button 
                          size="sm" 
                          onClick={() => runTest(category.name)}
                          disabled={activeTest === category.name}
                        >
                          {activeTest === category.name ? (
                            <>
                              <Pause className="h-4 w-4 mr-2" />
                              Running...
                            </>
                          ) : (
                            <>
                              <Play className="h-4 w-4 mr-2" />
                              Run Tests
                            </>
                          )}
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {category.tests.map((test, index) => (
                          <div key={index} className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">{test}</span>
                            <Badge variant="outline" className="text-xs">
                              {Math.floor(Math.random() * 100)}% coverage
                            </Badge>
                          </div>
                        ))}
                      </div>
                      {activeTest === category.name && (
                        <div className="mt-4">
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span>Progress</span>
                            <span>{testProgress}%</span>
                          </div>
                          <Progress value={testProgress} />
                        </div>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="card-cyber">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    Vulnerability Overview
                  </CardTitle>
                  <CardDescription>
                    Current security findings by severity
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {vulnerabilityTypes.map((vuln, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${
                          vuln.severity === 'critical' ? 'bg-red-500' :
                          vuln.severity === 'high' ? 'bg-orange-500' :
                          vuln.severity === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
                        }`} />
                        <span className="font-medium text-foreground">{vuln.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={vuln.severity === 'critical' ? 'destructive' : 'secondary'}>
                          {vuln.count}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="results" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-foreground">Test Results</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            {testResults.length === 0 ? (
              <Card className="card-cyber">
                <CardContent className="p-8 text-center">
                  <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">No test results yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Run some security tests to see results here
                  </p>
                  <Button onClick={() => runTest('Sample Test')}>
                    <Play className="h-4 w-4 mr-2" />
                    Run Sample Test
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {testResults.map((result) => (
                  <Card key={result.id} className="card-cyber">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          {result.status === 'passed' ? (
                            <CheckCircle className="h-5 w-5 text-green-400" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-400" />
                          )}
                          <div>
                            <h3 className="font-medium text-foreground">{result.type}</h3>
                            <p className="text-sm text-muted-foreground">{result.details}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={result.status === 'passed' ? 'default' : 'destructive'}>
                            {result.status}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {new Date(result.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="card-cyber">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5 text-primary" />
                    Security Score Trend
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <div className="text-4xl font-bold text-foreground mb-2">87</div>
                    <div className="text-muted-foreground mb-4">Security Score</div>
                    <div className="flex items-center justify-center gap-2 text-green-400">
                      <TrendingUp className="h-4 w-4" />
                      <span className="text-sm">+5 from last week</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-cyber">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-primary" />
                    Test Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Tests Run Today</span>
                      <span className="font-medium text-foreground">24</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Issues Found</span>
                      <span className="font-medium text-foreground">3</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Issues Resolved</span>
                      <span className="font-medium text-foreground">7</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Coverage</span>
                      <span className="font-medium text-foreground">94%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="card-cyber">
              <CardHeader>
                <CardTitle>Generate Report</CardTitle>
                <CardDescription>
                  Create detailed security assessment reports
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-20 flex-col">
                    <Download className="h-6 w-6 mb-2" />
                    Executive Summary
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <Code className="h-6 w-6 mb-2" />
                    Technical Report
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <Shield className="h-6 w-6 mb-2" />
                    Compliance Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default APISecurityTesting;
