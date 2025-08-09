import React, { useState } from 'react';
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
  RefreshCw,
  Copy,
  BookOpen,
  FileText,
  Users,
  Workflow
} from 'lucide-react';

const SecurityPlaybooks = () => {
  const [selectedPlaybook, setSelectedPlaybook] = useState('web-app');
  const [activeStep, setActiveStep] = useState(0);

  const playbooks = {
    'web-app': {
      title: 'Web Application Security',
      description: 'Comprehensive testing methodology for web applications',
      steps: [
        {
          title: 'Reconnaissance & Information Gathering',
          description: 'Passive and active information gathering techniques',
          tools: ['Nmap', 'Dirb', 'Gobuster', 'Nikto'],
          duration: '2-4 hours',
          techniques: [
            'Subdomain enumeration',
            'Technology stack identification',
            'Directory and file discovery',
            'Port scanning and service detection'
          ]
        },
        {
          title: 'Authentication & Session Management',
          description: 'Testing authentication mechanisms and session handling',
          tools: ['Burp Suite', 'OWASP ZAP', 'Custom Scripts'],
          duration: '4-6 hours',
          techniques: [
            'Brute force attacks',
            'Session fixation testing',
            'Password policy evaluation',
            'Multi-factor authentication bypass'
          ]
        },
        {
          title: 'Input Validation & Injection Attacks',
          description: 'Comprehensive injection vulnerability testing',
          tools: ['SQLMap', 'XSSHunter', 'Commix', 'NoSQLMap'],
          duration: '6-8 hours',
          techniques: [
            'SQL injection testing',
            'Cross-site scripting (XSS)',
            'Command injection',
            'LDAP and XML injection'
          ]
        },
        {
          title: 'Business Logic & Authorization',
          description: 'Testing application-specific business logic flaws',
          tools: ['Manual Testing', 'Custom Scripts', 'Postman'],
          duration: '4-6 hours',
          techniques: [
            'Privilege escalation',
            'Business logic bypass',
            'Race condition testing',
            'Workflow manipulation'
          ]
        }
      ]
    },
    'api': {
      title: 'API Security Testing',
      description: 'REST, GraphQL, and SOAP API security assessment',
      steps: [
        {
          title: 'API Discovery & Documentation',
          description: 'Identifying and documenting API endpoints',
          tools: ['Postman', 'Insomnia', 'OpenAPI Tools'],
          duration: '1-2 hours',
          techniques: [
            'Endpoint enumeration',
            'Schema analysis',
            'Version identification',
            'Documentation review'
          ]
        },
        {
          title: 'Authentication & Authorization',
          description: 'Testing API authentication mechanisms',
          tools: ['JWT.io', 'Burp Suite', 'Custom Scripts'],
          duration: '3-4 hours',
          techniques: [
            'JWT token analysis',
            'OAuth flow testing',
            'API key validation',
            'Rate limiting bypass'
          ]
        },
        {
          title: 'Input Validation & Injection',
          description: 'API-specific injection and validation testing',
          tools: ['SQLMap', 'NoSQLMap', 'GraphQL Voyager'],
          duration: '4-6 hours',
          techniques: [
            'Parameter pollution',
            'GraphQL introspection',
            'Mass assignment',
            'Deserialization attacks'
          ]
        },
        {
          title: 'Business Logic & Data Exposure',
          description: 'Testing for business logic flaws and data leakage',
          tools: ['Manual Testing', 'Burp Suite', 'Custom Scripts'],
          duration: '3-5 hours',
          techniques: [
            'BOLA/IDOR testing',
            'Excessive data exposure',
            'Function level authorization',
            'Resource consumption attacks'
          ]
        }
      ]
    },
    'cloud': {
      title: 'Cloud Infrastructure Security',
      description: 'AWS, Azure, and GCP security assessment',
      steps: [
        {
          title: 'Cloud Asset Discovery',
          description: 'Identifying cloud resources and configurations',
          tools: ['ScoutSuite', 'Prowler', 'CloudMapper'],
          duration: '2-3 hours',
          techniques: [
            'Resource enumeration',
            'Service discovery',
            'Configuration analysis',
            'Permission mapping'
          ]
        },
        {
          title: 'Identity & Access Management',
          description: 'Testing IAM policies and permissions',
          tools: ['Pacu', 'CloudGoat', 'Custom Scripts'],
          duration: '4-6 hours',
          techniques: [
            'Privilege escalation',
            'Cross-account access',
            'Service account abuse',
            'Policy misconfiguration'
          ]
        },
        {
          title: 'Storage & Database Security',
          description: 'Testing cloud storage and database security',
          tools: ['S3Scanner', 'CloudBrute', 'Custom Scripts'],
          duration: '3-4 hours',
          techniques: [
            'Bucket enumeration',
            'Public access testing',
            'Encryption validation',
            'Backup security assessment'
          ]
        },
        {
          title: 'Network & Container Security',
          description: 'Testing network controls and container security',
          tools: ['Kube-hunter', 'Docker Bench', 'Nmap'],
          duration: '4-5 hours',
          techniques: [
            'Security group analysis',
            'Container escape testing',
            'Kubernetes RBAC testing',
            'Network segmentation validation'
          ]
        }
      ]
    },
    'mobile': {
      title: 'Mobile Application Security',
      description: 'iOS and Android application security testing',
      steps: [
        {
          title: 'Static Analysis & Reverse Engineering',
          description: 'Analyzing application code and binaries',
          tools: ['MobSF', 'Jadx', 'Hopper', 'IDA Pro'],
          duration: '3-4 hours',
          techniques: [
            'Code review',
            'Binary analysis',
            'Hardcoded secrets detection',
            'Anti-tampering bypass'
          ]
        },
        {
          title: 'Dynamic Analysis & Runtime Testing',
          description: 'Runtime application behavior analysis',
          tools: ['Frida', 'Objection', 'Xposed', 'Cycript'],
          duration: '4-6 hours',
          techniques: [
            'Method hooking',
            'SSL pinning bypass',
            'Root/jailbreak detection bypass',
            'Runtime manipulation'
          ]
        },
        {
          title: 'Network Communication Testing',
          description: 'Testing mobile app network communications',
          tools: ['Burp Suite', 'OWASP ZAP', 'Charles Proxy'],
          duration: '3-4 hours',
          techniques: [
            'Traffic interception',
            'Certificate validation testing',
            'API security testing',
            'Man-in-the-middle attacks'
          ]
        },
        {
          title: 'Platform-Specific Security',
          description: 'iOS and Android specific security testing',
          tools: ['iMazing', 'ADB', 'Keychain Dumper'],
          duration: '3-5 hours',
          techniques: [
            'Keychain/keystore analysis',
            'IPC testing',
            'Deep linking security',
            'Backup security assessment'
          ]
        }
      ]
    }
  };

  const currentPlaybook = playbooks[selectedPlaybook];

  const handleStepClick = (stepIndex) => {
    setActiveStep(stepIndex);
  };

  const copyPlaybook = () => {
    const playbookText = `
# ${currentPlaybook.title}
${currentPlaybook.description}

${currentPlaybook.steps.map((step, index) => `
## Step ${index + 1}: ${step.title}
**Duration:** ${step.duration}
**Description:** ${step.description}

**Tools:**
${step.tools.map(tool => `- ${tool}`).join('\n')}

**Techniques:**
${step.techniques.map(technique => `- ${technique}`).join('\n')}
`).join('\n')}
    `;
    
    navigator.clipboard.writeText(playbookText);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-cyber bg-clip-text text-transparent">
            Security Testing Playbooks
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive, step-by-step methodologies for different types of security assessments
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Playbook Selection */}
          <div className="lg:col-span-1">
            <Card className="card-cyber">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Playbooks
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {Object.entries(playbooks).map(([key, playbook]) => (
                  <Button
                    key={key}
                    variant={selectedPlaybook === key ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => {
                      setSelectedPlaybook(key);
                      setActiveStep(0);
                    }}
                  >
                    {playbook.title}
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Playbook Actions */}
            <Card className="card-cyber mt-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={copyPlaybook}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Playbook
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export PDF
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Share Team
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card className="card-cyber">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">{currentPlaybook.title}</CardTitle>
                    <CardDescription className="text-base mt-2">
                      {currentPlaybook.description}
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="text-sm">
                    {currentPlaybook.steps.length} Steps
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {/* Progress Indicator */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm text-muted-foreground">
                      Step {activeStep + 1} of {currentPlaybook.steps.length}
                    </span>
                  </div>
                  <Progress 
                    value={((activeStep + 1) / currentPlaybook.steps.length) * 100} 
                    className="h-2"
                  />
                </div>

                {/* Step Navigation */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mb-6">
                  {currentPlaybook.steps.map((step, index) => (
                    <Button
                      key={index}
                      variant={activeStep === index ? "default" : "outline"}
                      size="sm"
                      className="justify-start text-left h-auto p-3"
                      onClick={() => handleStepClick(index)}
                    >
                      <div>
                        <div className="font-medium text-xs">Step {index + 1}</div>
                        <div className="text-xs opacity-80 truncate">
                          {step.title}
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>

                {/* Active Step Content */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Step {activeStep + 1}: {currentPlaybook.steps[activeStep].title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {currentPlaybook.steps[activeStep].description}
                    </p>
                    
                    <div className="flex items-center gap-4 mb-6">
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {currentPlaybook.steps[activeStep].duration}
                      </Badge>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Target className="h-3 w-3" />
                        {currentPlaybook.steps[activeStep].techniques.length} Techniques
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Tools */}
                    <Card className="border-border/50">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Settings className="h-4 w-4" />
                          Recommended Tools
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {currentPlaybook.steps[activeStep].tools.map((tool, index) => (
                            <div key={index} className="flex items-center gap-2 p-2 rounded-lg bg-background/50">
                              <Code className="h-4 w-4 text-primary" />
                              <span className="text-sm">{tool}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Techniques */}
                    <Card className="border-border/50">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Zap className="h-4 w-4" />
                          Testing Techniques
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {currentPlaybook.steps[activeStep].techniques.map((technique, index) => (
                            <div key={index} className="flex items-center gap-2 p-2 rounded-lg bg-background/50">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <span className="text-sm">{technique}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Navigation */}
                  <div className="flex items-center justify-between pt-6 border-t">
                    <Button
                      variant="outline"
                      onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                      disabled={activeStep === 0}
                    >
                      Previous Step
                    </Button>
                    <Button
                      onClick={() => setActiveStep(Math.min(currentPlaybook.steps.length - 1, activeStep + 1))}
                      disabled={activeStep === currentPlaybook.steps.length - 1}
                    >
                      Next Step
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Additional Resources */}
            <Card className="card-cyber mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Additional Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 rounded-lg bg-background/50 border border-border/50">
                    <BookOpen className="h-8 w-8 text-primary mx-auto mb-2" />
                    <h4 className="font-medium mb-1">OWASP Guidelines</h4>
                    <p className="text-sm text-muted-foreground">Industry standard testing methodologies</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-background/50 border border-border/50">
                    <Workflow className="h-8 w-8 text-primary mx-auto mb-2" />
                    <h4 className="font-medium mb-1">Custom Workflows</h4>
                    <p className="text-sm text-muted-foreground">Tailored testing procedures for your environment</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-background/50 border border-border/50">
                    <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                    <h4 className="font-medium mb-1">Team Collaboration</h4>
                    <p className="text-sm text-muted-foreground">Share and collaborate on testing methodologies</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityPlaybooks;
