import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Users,
  Key,
  Shield,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  UserCheck,
  UserX,
  Crown,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  Activity,
  BarChart3,
  Settings,
  Search,
  Filter,
  Download,
  RefreshCw,
  Plus,
  Edit,
  Trash2,
  Globe,
  Smartphone,
  Laptop,
  Server,
  Database,
  Network,
  FileText,
  Calendar,
  MapPin,
  TrendingUp,
  TrendingDown,
  Zap,
  Target,
  Flag,
  Building,
  Mail,
  Phone,
  Hash,
  Fingerprint,
  ScanLine,
  ShieldCheck
} from 'lucide-react';
import { motion } from 'framer-motion';

interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  department: string;
  role: string;
  status: 'active' | 'inactive' | 'locked' | 'suspended';
  lastLogin: string;
  createdDate: string;
  permissions: string[];
  groups: string[];
  mfaEnabled: boolean;
  privilegedAccess: boolean;
  riskScore: number;
  loginAttempts: number;
  sessionCount: number;
  location: string;
  deviceCount: number;
}

interface Role {
  id: string;
  name: string;
  description: string;
  type: 'builtin' | 'custom';
  permissions: string[];
  userCount: number;
  privileged: boolean;
  createdDate: string;
  lastModified: string;
}

interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  assignedUsers: number;
  assignedRoles: number;
}

interface AccessRequest {
  id: string;
  requestor: string;
  resource: string;
  accessType: string;
  justification: string;
  status: 'pending' | 'approved' | 'rejected' | 'expired';
  requestDate: string;
  approver?: string;
  approvalDate?: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
}

interface PrivilegedSession {
  id: string;
  user: string;
  targetSystem: string;
  sessionType: 'rdp' | 'ssh' | 'database' | 'api';
  startTime: string;
  endTime?: string;
  status: 'active' | 'completed' | 'terminated';
  recorded: boolean;
  commands: number;
  riskEvents: number;
}

interface IdentityRisk {
  userId: string;
  username: string;
  riskScore: number;
  riskFactors: {
    type: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    description: string;
  }[];
  lastAssessed: string;
  trend: 'increasing' | 'stable' | 'decreasing';
}

const IAMSecurityCenter: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const [users] = useState<User[]>([
    {
      id: 'user-001',
      username: 'john.doe',
      email: 'john.doe@company.com',
      fullName: 'John Doe',
      department: 'IT',
      role: 'System Administrator',
      status: 'active',
      lastLogin: '2025-08-08T14:30:00Z',
      createdDate: '2024-01-15T00:00:00Z',
      permissions: ['system.admin', 'user.manage', 'server.access'],
      groups: ['IT Administrators', 'Domain Admins'],
      mfaEnabled: true,
      privilegedAccess: true,
      riskScore: 75,
      loginAttempts: 0,
      sessionCount: 3,
      location: 'New York, NY',
      deviceCount: 4
    },
    {
      id: 'user-002',
      username: 'jane.smith',
      email: 'jane.smith@company.com',
      fullName: 'Jane Smith',
      department: 'Finance',
      role: 'Financial Analyst',
      status: 'active',
      lastLogin: '2025-08-08T16:45:00Z',
      createdDate: '2024-03-20T00:00:00Z',
      permissions: ['finance.read', 'finance.write', 'reports.generate'],
      groups: ['Finance Team'],
      mfaEnabled: true,
      privilegedAccess: false,
      riskScore: 32,
      loginAttempts: 0,
      sessionCount: 1,
      location: 'Chicago, IL',
      deviceCount: 2
    },
    {
      id: 'user-003',
      username: 'mike.wilson',
      email: 'mike.wilson@company.com',
      fullName: 'Mike Wilson',
      department: 'Security',
      role: 'Security Analyst',
      status: 'locked',
      lastLogin: '2025-08-06T11:20:00Z',
      createdDate: '2023-11-10T00:00:00Z',
      permissions: ['security.read', 'security.investigate', 'logs.access'],
      groups: ['Security Team', 'SOC Analysts'],
      mfaEnabled: false,
      privilegedAccess: true,
      riskScore: 88,
      loginAttempts: 5,
      sessionCount: 0,
      location: 'Austin, TX',
      deviceCount: 3
    }
  ]);

  const [roles] = useState<Role[]>([
    {
      id: 'role-001',
      name: 'System Administrator',
      description: 'Full administrative access to system resources',
      type: 'builtin',
      permissions: ['system.admin', 'user.manage', 'server.access', 'config.modify'],
      userCount: 5,
      privileged: true,
      createdDate: '2024-01-01T00:00:00Z',
      lastModified: '2025-07-15T00:00:00Z'
    },
    {
      id: 'role-002',
      name: 'Security Analyst',
      description: 'Access to security tools and investigation capabilities',
      type: 'custom',
      permissions: ['security.read', 'security.investigate', 'logs.access', 'reports.security'],
      userCount: 12,
      privileged: true,
      createdDate: '2024-02-01T00:00:00Z',
      lastModified: '2025-06-10T00:00:00Z'
    },
    {
      id: 'role-003',
      name: 'Financial Analyst',
      description: 'Access to financial systems and reporting',
      type: 'custom',
      permissions: ['finance.read', 'finance.write', 'reports.generate', 'budget.view'],
      userCount: 8,
      privileged: false,
      createdDate: '2024-01-15T00:00:00Z',
      lastModified: '2025-05-20T00:00:00Z'
    }
  ]);

  const [permissions] = useState<Permission[]>([
    {
      id: 'perm-001',
      name: 'system.admin',
      description: 'Full system administrative privileges',
      category: 'System',
      riskLevel: 'critical',
      assignedUsers: 5,
      assignedRoles: 1
    },
    {
      id: 'perm-002',
      name: 'user.manage',
      description: 'Create, modify, and delete user accounts',
      category: 'User Management',
      riskLevel: 'high',
      assignedUsers: 8,
      assignedRoles: 2
    },
    {
      id: 'perm-003',
      name: 'finance.write',
      description: 'Modify financial data and transactions',
      category: 'Financial',
      riskLevel: 'high',
      assignedUsers: 12,
      assignedRoles: 3
    },
    {
      id: 'perm-004',
      name: 'reports.generate',
      description: 'Generate and export reports',
      category: 'Reporting',
      riskLevel: 'medium',
      assignedUsers: 25,
      assignedRoles: 5
    }
  ]);

  const [accessRequests] = useState<AccessRequest[]>([
    {
      id: 'req-001',
      requestor: 'sarah.jones@company.com',
      resource: 'Financial Database',
      accessType: 'Read Access',
      justification: 'Need access for quarterly audit preparation',
      status: 'pending',
      requestDate: '2025-08-08T10:00:00Z',
      urgency: 'medium'
    },
    {
      id: 'req-002',
      requestor: 'david.brown@company.com',
      resource: 'Production Servers',
      accessType: 'Administrative Access',
      justification: 'Emergency maintenance required for critical systems',
      status: 'approved',
      requestDate: '2025-08-07T16:30:00Z',
      approver: 'john.doe@company.com',
      approvalDate: '2025-08-07T17:00:00Z',
      urgency: 'critical'
    },
    {
      id: 'req-003',
      requestor: 'lisa.garcia@company.com',
      resource: 'HR System',
      accessType: 'Write Access',
      justification: 'Temporary assignment to HR project',
      status: 'rejected',
      requestDate: '2025-08-06T14:20:00Z',
      approver: 'admin@company.com',
      approvalDate: '2025-08-06T15:45:00Z',
      urgency: 'low'
    }
  ]);

  const [privilegedSessions] = useState<PrivilegedSession[]>([
    {
      id: 'session-001',
      user: 'john.doe',
      targetSystem: 'prod-db-01',
      sessionType: 'database',
      startTime: '2025-08-08T14:00:00Z',
      status: 'active',
      recorded: true,
      commands: 15,
      riskEvents: 0
    },
    {
      id: 'session-002',
      user: 'admin.service',
      targetSystem: 'web-server-cluster',
      sessionType: 'ssh',
      startTime: '2025-08-08T13:30:00Z',
      endTime: '2025-08-08T15:45:00Z',
      status: 'completed',
      recorded: true,
      commands: 47,
      riskEvents: 2
    },
    {
      id: 'session-003',
      user: 'backup.admin',
      targetSystem: 'storage-array-01',
      sessionType: 'rdp',
      startTime: '2025-08-08T12:15:00Z',
      status: 'active',
      recorded: true,
      commands: 8,
      riskEvents: 1
    }
  ]);

  const [identityRisks] = useState<IdentityRisk[]>([
    {
      userId: 'user-003',
      username: 'mike.wilson',
      riskScore: 88,
      riskFactors: [
        {
          type: 'Failed Login Attempts',
          severity: 'high',
          description: '5 failed login attempts in the last hour'
        },
        {
          type: 'MFA Disabled',
          severity: 'critical',
          description: 'Multi-factor authentication not enabled for privileged account'
        },
        {
          type: 'Unusual Location',
          severity: 'medium',
          description: 'Login attempt from unusual geographic location'
        }
      ],
      lastAssessed: '2025-08-08T16:30:00Z',
      trend: 'increasing'
    },
    {
      userId: 'user-001',
      username: 'john.doe',
      riskScore: 75,
      riskFactors: [
        {
          type: 'Privileged Access',
          severity: 'high',
          description: 'High-privilege account with administrative access'
        },
        {
          type: 'Multiple Sessions',
          severity: 'medium',
          description: 'Multiple active sessions across different devices'
        }
      ],
      lastAssessed: '2025-08-08T16:00:00Z',
      trend: 'stable'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'locked': return 'bg-red-100 text-red-800 border-red-200';
      case 'suspended': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'pending': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRiskColor = (score: number) => {
    if (score >= 80) return 'text-red-600';
    if (score >= 60) return 'text-orange-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing': return <TrendingUp className="h-4 w-4 text-red-600" />;
      case 'decreasing': return <TrendingDown className="h-4 w-4 text-green-600" />;
      default: return <Activity className="h-4 w-4 text-blue-600" />;
    }
  };

  // Calculate dashboard metrics
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === 'active').length;
  const privilegedUsers = users.filter(u => u.privilegedAccess).length;
  const highRiskUsers = users.filter(u => u.riskScore >= 70).length;
  const pendingRequests = accessRequests.filter(r => r.status === 'pending').length;
  const activeSessions = privilegedSessions.filter(s => s.status === 'active').length;

  const filteredUsers = users.filter(user => {
    const matchesDepartment = selectedDepartment === 'all' || user.department.toLowerCase() === selectedDepartment.toLowerCase();
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;
    const matchesSearch = searchQuery === '' || 
      user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDepartment && matchesStatus && matchesSearch;
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
          Identity & Access Management Security Center
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl">
          Comprehensive identity governance, privileged access management, and continuous 
          identity risk assessment with AI-powered behavioral analytics and zero-trust enforcement.
        </p>
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Users
          </TabsTrigger>
          <TabsTrigger value="roles" className="flex items-center gap-2">
            <Crown className="h-4 w-4" />
            Roles
          </TabsTrigger>
          <TabsTrigger value="permissions" className="flex items-center gap-2">
            <Key className="h-4 w-4" />
            Permissions
          </TabsTrigger>
          <TabsTrigger value="access-requests" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Requests
          </TabsTrigger>
          <TabsTrigger value="privileged-access" className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4" />
            PAM
          </TabsTrigger>
          <TabsTrigger value="risk-analysis" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Risk Analysis
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
                    <p className="text-sm font-medium text-gray-600">Total Users</p>
                    <p className="text-3xl font-bold text-blue-600">{totalUsers.toLocaleString()}</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <p className="text-xs text-gray-500 mt-2">{activeUsers} active users</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Privileged Users</p>
                    <p className="text-3xl font-bold text-orange-600">{privilegedUsers}</p>
                  </div>
                  <Crown className="h-8 w-8 text-orange-600" />
                </div>
                <p className="text-xs text-orange-600 mt-2">High-risk accounts</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending Requests</p>
                    <p className="text-3xl font-bold text-yellow-600">{pendingRequests}</p>
                  </div>
                  <Clock className="h-8 w-8 text-yellow-600" />
                </div>
                <p className="text-xs text-yellow-600 mt-2">Awaiting approval</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active PAM Sessions</p>
                    <p className="text-3xl font-bold text-red-600">{activeSessions}</p>
                  </div>
                  <Shield className="h-8 w-8 text-red-600" />
                </div>
                <p className="text-xs text-red-600 mt-2">Live monitoring</p>
              </CardContent>
            </Card>
          </div>

          {/* Risk Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  High-Risk Identities
                </CardTitle>
                <CardDescription>Users with elevated risk scores requiring attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {identityRisks.slice(0, 5).map((risk, index) => (
                    <div key={risk.userId} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-red-100 rounded-full">
                          <Users className="h-4 w-4 text-red-600" />
                        </div>
                        <div>
                          <p className="font-semibold">{risk.username}</p>
                          <p className="text-sm text-gray-600">{risk.riskFactors.length} risk factors</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {getTrendIcon(risk.trend)}
                        <span className={`text-2xl font-bold ${getRiskColor(risk.riskScore)}`}>
                          {risk.riskScore}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Recent Access Activity
                </CardTitle>
                <CardDescription>Latest identity and access management events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-semibold">New user created</p>
                        <p className="text-sm text-gray-600">sarah.wilson@company.com</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">2 min ago</span>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="h-5 w-5 text-orange-600" />
                      <div>
                        <p className="font-semibold">Multiple failed logins</p>
                        <p className="text-sm text-gray-600">mike.wilson@company.com</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">5 min ago</span>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Key className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-semibold">Access request approved</p>
                        <p className="text-sm text-gray-600">Production Database access</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">10 min ago</span>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Crown className="h-5 w-5 text-purple-600" />
                      <div>
                        <p className="font-semibold">Privileged session started</p>
                        <p className="text-sm text-gray-600">john.doe - Database Admin</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">15 min ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Compliance Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Identity Compliance Status
              </CardTitle>
              <CardDescription>Compliance with identity security policies and standards</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">94%</div>
                  <p className="text-sm text-gray-600">MFA Adoption</p>
                  <Progress value={94} className="mt-2" />
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">87%</div>
                  <p className="text-sm text-gray-600">Password Policy Compliance</p>
                  <Progress value={87} className="mt-2" />
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">76%</div>
                  <p className="text-sm text-gray-600">Least Privilege Implementation</p>
                  <Progress value={76} className="mt-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Users Management */}
        <TabsContent value="users" className="space-y-6">
          {/* User Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <Input
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="max-w-sm"
                  />
                  <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      <SelectItem value="it">IT</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="security">Security</SelectItem>
                      <SelectItem value="hr">HR</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="locked">Locked</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add User
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Users List */}
          <div className="grid gap-4">
            {filteredUsers.map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-100 rounded-full">
                          <Users className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{user.fullName}</CardTitle>
                          <CardDescription>
                            {user.username} • {user.department} • {user.role}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(user.status)}>
                          {user.status}
                        </Badge>
                        {user.privilegedAccess && (
                          <Badge className="bg-purple-100 text-purple-800">
                            <Crown className="h-3 w-3 mr-1" />
                            Privileged
                          </Badge>
                        )}
                        {user.mfaEnabled && (
                          <Badge className="bg-green-100 text-green-800">
                            <ShieldCheck className="h-3 w-3 mr-1" />
                            MFA
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="font-medium text-gray-700">Email</p>
                          <p className="text-gray-600">{user.email}</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-700">Last Login</p>
                          <p className="text-gray-600">{new Date(user.lastLogin).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-700">Risk Score</p>
                          <p className={`font-semibold ${getRiskColor(user.riskScore)}`}>{user.riskScore}</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-700">Active Sessions</p>
                          <p className="text-gray-600">{user.sessionCount}</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div>
                          <p className="font-medium text-gray-700 mb-1">Groups</p>
                          <div className="flex flex-wrap gap-1">
                            {user.groups.map((group, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {group}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="font-medium text-gray-700 mb-1">Key Permissions</p>
                          <div className="flex flex-wrap gap-1">
                            {user.permissions.slice(0, 3).map((permission, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {permission}
                              </Badge>
                            ))}
                            {user.permissions.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{user.permissions.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-4 border-t">
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {user.location}
                          </span>
                          <span>{user.deviceCount} devices</span>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            Details
                          </Button>
                          {user.status === 'locked' && (
                            <Button size="sm">
                              <Unlock className="h-4 w-4 mr-1" />
                              Unlock
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

        {/* Roles Management */}
        <TabsContent value="roles" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Role Management</h2>
              <p className="text-gray-600">Define and manage user roles and associated permissions</p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Role
            </Button>
          </div>

          <div className="grid gap-6">
            {roles.map((role, index) => (
              <motion.div
                key={role.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <Crown className="h-6 w-6 text-purple-600" />
                        <div>
                          <CardTitle className="text-lg">{role.name}</CardTitle>
                          <CardDescription>{role.description}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={role.type === 'builtin' ? 'secondary' : 'outline'}>
                          {role.type}
                        </Badge>
                        {role.privileged && (
                          <Badge className="bg-red-100 text-red-800">
                            Privileged
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="font-medium text-gray-700">Assigned Users</p>
                        <p className="text-2xl font-bold text-blue-600">{role.userCount}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">Permissions</p>
                        <p className="text-2xl font-bold text-green-600">{role.permissions.length}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">Created</p>
                        <p className="text-gray-600">{new Date(role.createdDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">Last Modified</p>
                        <p className="text-gray-600">{new Date(role.lastModified).toLocaleDateString()}</p>
                      </div>
                    </div>

                    <div>
                      <p className="font-medium text-gray-700 mb-2">Permissions</p>
                      <div className="flex flex-wrap gap-1">
                        {role.permissions.slice(0, 5).map((permission, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {permission}
                          </Badge>
                        ))}
                        {role.permissions.length > 5 && (
                          <Badge variant="outline" className="text-xs">
                            +{role.permissions.length - 5} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-4 border-t">
                      <Button size="sm" variant="outline">
                        <Users className="h-4 w-4 mr-1" />
                        View Users
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      {role.type === 'custom' && (
                        <Button size="sm" variant="outline">
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Permissions */}
        <TabsContent value="permissions" className="space-y-6">
          <div className="grid gap-4">
            {permissions.map((permission, index) => (
              <motion.div
                key={permission.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-4">
                        <Key className="h-6 w-6 text-blue-600" />
                        <div>
                          <h3 className="text-lg font-semibold">{permission.name}</h3>
                          <p className="text-gray-600">{permission.description}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline">{permission.category}</Badge>
                            <Badge className={getSeverityColor(permission.riskLevel)}>
                              {permission.riskLevel} risk
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Assigned to:</p>
                        <p className="font-semibold">{permission.assignedUsers} users</p>
                        <p className="font-semibold">{permission.assignedRoles} roles</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Access Requests */}
        <TabsContent value="access-requests" className="space-y-6">
          <div className="grid gap-6">
            {accessRequests.map((request, index) => (
              <motion.div
                key={request.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{request.resource}</CardTitle>
                        <CardDescription>
                          {request.accessType} requested by {request.requestor}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(request.status)}>
                          {request.status}
                        </Badge>
                        <Badge className={getSeverityColor(request.urgency)}>
                          {request.urgency}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="font-medium text-gray-700 mb-1">Justification</p>
                      <p className="text-gray-600">{request.justification}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium text-gray-700">Request Date</p>
                        <p className="text-gray-600">{new Date(request.requestDate).toLocaleString()}</p>
                      </div>
                      {request.approvalDate && (
                        <div>
                          <p className="font-medium text-gray-700">Approval Date</p>
                          <p className="text-gray-600">{new Date(request.approvalDate).toLocaleString()}</p>
                        </div>
                      )}
                    </div>

                    {request.status === 'pending' && (
                      <div className="flex justify-end gap-2 pt-4 border-t">
                        <Button size="sm" variant="outline">
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                        <Button size="sm">
                          <CheckCircle2 className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Privileged Access Management */}
        <TabsContent value="privileged-access" className="space-y-6">
          <div className="grid gap-6">
            {privilegedSessions.map((session, index) => (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <ShieldCheck className="h-6 w-6 text-purple-600" />
                        <div>
                          <CardTitle className="text-lg">{session.targetSystem}</CardTitle>
                          <CardDescription>
                            {session.sessionType.toUpperCase()} session by {session.user}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(session.status)}>
                          {session.status}
                        </Badge>
                        {session.recorded && (
                          <Badge className="bg-blue-100 text-blue-800">
                            <Eye className="h-3 w-3 mr-1" />
                            Recorded
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="font-medium text-gray-700">Start Time</p>
                        <p className="text-gray-600">{new Date(session.startTime).toLocaleString()}</p>
                      </div>
                      {session.endTime && (
                        <div>
                          <p className="font-medium text-gray-700">End Time</p>
                          <p className="text-gray-600">{new Date(session.endTime).toLocaleString()}</p>
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-gray-700">Commands Executed</p>
                        <p className="text-gray-600">{session.commands}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">Risk Events</p>
                        <p className={session.riskEvents > 0 ? 'text-red-600 font-semibold' : 'text-green-600'}>
                          {session.riskEvents}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-4 border-t">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-1" />
                        View Recording
                      </Button>
                      {session.status === 'active' && (
                        <Button size="sm" variant="outline">
                          <XCircle className="h-4 w-4 mr-1" />
                          Terminate
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Risk Analysis */}
        <TabsContent value="risk-analysis" className="space-y-6">
          <div className="grid gap-6">
            {identityRisks.map((risk, index) => (
              <motion.div
                key={risk.userId}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-red-100 rounded-full">
                          <AlertTriangle className="h-6 w-6 text-red-600" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{risk.username}</CardTitle>
                          <CardDescription>
                            Identity Risk Assessment
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-3xl font-bold ${getRiskColor(risk.riskScore)}`}>
                          {risk.riskScore}
                        </span>
                        {getTrendIcon(risk.trend)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Progress value={risk.riskScore} className="h-3" />
                    
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-700">Risk Factors:</h4>
                      {risk.riskFactors.map((factor, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-3 border rounded-lg">
                          <div className={`p-1 rounded-full ${getSeverityColor(factor.severity)}`}>
                            <AlertTriangle className="h-4 w-4" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{factor.type}</p>
                            <p className="text-sm text-gray-600">{factor.description}</p>
                          </div>
                          <Badge className={getSeverityColor(factor.severity)}>
                            {factor.severity}
                          </Badge>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t">
                      <p className="text-sm text-gray-600">
                        Last assessed: {new Date(risk.lastAssessed).toLocaleString()}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IAMSecurityCenter;