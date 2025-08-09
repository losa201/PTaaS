import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, HardDrive, FileText, Image, Clock, Hash, 
  Shield, Eye, Download, Upload, Filter, MoreVertical,
  Fingerprint, Microscope, Database, Network, Cpu,
  Lock, Unlock, Key, AlertTriangle, CheckCircle,
  Calendar, MapPin, User, Activity, BarChart3,
  FolderOpen, File, Archive, Code, Settings,
  Zap, Target, Layers, Monitor, Server
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

// Types and Interfaces
interface ForensicCase {
  id: string;
  case_number: string;
  title: string;
  description: string;
  created_date: Date;
  status: 'active' | 'pending' | 'completed' | 'archived';
  priority: 'critical' | 'high' | 'medium' | 'low';
  assigned_examiner: string;
  evidence_count: number;
  completion_percentage: number;
  incident_type: string;
  last_activity: Date;
}

interface DigitalEvidence {
  id: string;
  case_id: string;
  name: string;
  type: 'disk_image' | 'memory_dump' | 'network_capture' | 'file_system' | 'mobile_device' | 'cloud_data';
  file_size: number;
  acquisition_date: Date;
  hash_md5: string;
  hash_sha256: string;
  integrity_verified: boolean;
  chain_of_custody: CustodyEntry[];
  analysis_status: 'pending' | 'analyzing' | 'completed' | 'error';
  findings_count: number;
}

interface CustodyEntry {
  timestamp: Date;
  action: 'acquired' | 'transferred' | 'analyzed' | 'stored' | 'accessed';
  examiner: string;
  location: string;
  notes: string;
}

interface ForensicFinding {
  id: string;
  evidence_id: string;
  type: 'file_recovery' | 'registry_analysis' | 'network_activity' | 'malware_detection' | 'user_activity' | 'system_logs';
  title: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low' | 'info';
  timestamp: Date;
  file_path?: string;
  confidence_score: number;
  artifacts: ForensicArtifact[];
  timeline_position?: Date;
}

interface ForensicArtifact {
  type: 'file' | 'registry_key' | 'network_connection' | 'process' | 'log_entry';
  name: string;
  value: string;
  metadata: Record<string, any>;
}

interface TimelineEvent {
  id: string;
  timestamp: Date;
  event_type: string;
  description: string;
  source: string;
  confidence: number;
  related_findings: string[];
}

interface ForensicTool {
  id: string;
  name: string;
  category: 'acquisition' | 'analysis' | 'recovery' | 'visualization' | 'reporting';
  status: 'available' | 'running' | 'offline' | 'updating';
  version: string;
  last_used: Date;
  capabilities: string[];
}

const DigitalForensics: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedEvidence, setSelectedEvidence] = useState<DigitalEvidence | null>(null);
  const [activeAnalysis, setActiveAnalysis] = useState<string | null>(null);

  // Mock data
  const [forensicCases] = useState<ForensicCase[]>([
    {
      id: 'CASE-001',
      case_number: 'FC-2024-0001',
      title: 'Insider Threat Investigation',
      description: 'Investigation of potential data exfiltration by former employee',
      created_date: new Date('2024-01-10T09:00:00Z'),
      status: 'active',
      priority: 'high',
      assigned_examiner: 'Dr. Sarah Williams',
      evidence_count: 7,
      completion_percentage: 68,
      incident_type: 'Data Breach',
      last_activity: new Date('2024-01-15T16:30:00Z')
    },
    {
      id: 'CASE-002',
      case_number: 'FC-2024-0002',
      title: 'Malware Analysis - APT Campaign',
      description: 'Advanced persistent threat forensic analysis',
      created_date: new Date('2024-01-12T14:20:00Z'),
      status: 'active',
      priority: 'critical',
      assigned_examiner: 'Mike Chen',
      evidence_count: 12,
      completion_percentage: 34,
      incident_type: 'Malware',
      last_activity: new Date('2024-01-15T11:15:00Z')
    }
  ]);

  const [digitalEvidence] = useState<DigitalEvidence[]>([
    {
      id: 'EVD-001',
      case_id: 'CASE-001',
      name: 'Employee_Laptop_Image.dd',
      type: 'disk_image',
      file_size: 512000000000, // 512GB
      acquisition_date: new Date('2024-01-10T10:30:00Z'),
      hash_md5: '5d41402abc4b2a76b9719d911017c592',
      hash_sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      integrity_verified: true,
      chain_of_custody: [
        {
          timestamp: new Date('2024-01-10T10:30:00Z'),
          action: 'acquired',
          examiner: 'Officer Johnson',
          location: 'Corporate HQ - Floor 5',
          notes: 'Laptop seized from employee desk, write blocker used'
        }
      ],
      analysis_status: 'analyzing',
      findings_count: 23
    },
    {
      id: 'EVD-002',
      case_id: 'CASE-002',
      name: 'Infected_Server_Memory.mem',
      type: 'memory_dump',
      file_size: 16000000000, // 16GB
      acquisition_date: new Date('2024-01-12T15:45:00Z'),
      hash_md5: 'c4ca4238a0b923820dcc509a6f75849b',
      hash_sha256: 'e258d248fda94c63753607f7c4494ee0fcbe92f1a76bfdac795c9d84101eb317',
      integrity_verified: true,
      chain_of_custody: [
        {
          timestamp: new Date('2024-01-12T15:45:00Z'),
          action: 'acquired',
          examiner: 'Tech Specialist Ray',
          location: 'Data Center - Rack 7',
          notes: 'Memory dump acquired using FTK Imager'
        }
      ],
      analysis_status: 'completed',
      findings_count: 47
    }
  ]);

  const [forensicFindings] = useState<ForensicFinding[]>([
    {
      id: 'FIND-001',
      evidence_id: 'EVD-001',
      type: 'file_recovery',
      title: 'Deleted Sensitive Files Recovered',
      description: 'Multiple deleted files containing customer PII recovered from unallocated disk space',
      severity: 'high',
      timestamp: new Date('2024-01-11T09:15:00Z'),
      file_path: '/Users/jdoe/Documents/CustomerData/',
      confidence_score: 94,
      artifacts: [
        {
          type: 'file',
          name: 'customers_export.csv',
          value: 'Deleted file containing 15,000 customer records',
          metadata: { size: 2458320, deleted_date: '2024-01-09T18:30:00Z' }
        }
      ]
    },
    {
      id: 'FIND-002',
      evidence_id: 'EVD-002',
      type: 'malware_detection',
      title: 'Advanced Malware Implant Identified',
      description: 'Sophisticated fileless malware detected in memory dump analysis',
      severity: 'critical',
      timestamp: new Date('2024-01-13T11:22:00Z'),
      confidence_score: 98,
      artifacts: [
        {
          type: 'process',
          name: 'svchost.exe',
          value: 'Hollowed process containing malicious payload',
          metadata: { pid: 1432, injection_technique: 'Process Hollowing' }
        }
      ]
    }
  ]);

  const [forensicTools] = useState<ForensicTool[]>([
    { id: 'TOOL-001', name: 'EnCase Forensic', category: 'analysis', status: 'available', version: '8.11', last_used: new Date(), capabilities: ['Disk Analysis', 'File Recovery', 'Timeline Analysis'] },
    { id: 'TOOL-002', name: 'FTK Imager', category: 'acquisition', status: 'available', version: '4.7', last_used: new Date(), capabilities: ['Disk Imaging', 'Memory Acquisition', 'Hash Verification'] },
    { id: 'TOOL-003', name: 'Volatility', category: 'analysis', status: 'running', version: '3.0', last_used: new Date(), capabilities: ['Memory Analysis', 'Malware Detection', 'Process Analysis'] },
    { id: 'TOOL-004', name: 'Autopsy', category: 'analysis', status: 'available', version: '4.19', last_used: new Date(), capabilities: ['Timeline Analysis', 'File Analysis', 'Keyword Search'] }
  ]);

  const filteredCases = useMemo(() => {
    return forensicCases.filter(forensicCase => {
      const matchesStatus = statusFilter === 'all' || forensicCase.status === statusFilter;
      const matchesSearch = searchTerm === '' || 
        forensicCase.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        forensicCase.case_number.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [forensicCases, statusFilter, searchTerm]);

  const formatFileSize = (bytes: number): string => {
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 B';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return <Badge className="bg-green-500">Active</Badge>;
      case 'pending': return <Badge variant="secondary">Pending</Badge>;
      case 'completed': return <Badge className="bg-blue-500">Completed</Badge>;
      case 'archived': return <Badge variant="outline">Archived</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getEvidenceTypeIcon = (type: string) => {
    switch (type) {
      case 'disk_image': return <HardDrive className="h-5 w-5" />;
      case 'memory_dump': return <Cpu className="h-5 w-5" />;
      case 'network_capture': return <Network className="h-5 w-5" />;
      case 'file_system': return <FolderOpen className="h-5 w-5" />;
      case 'mobile_device': return <Monitor className="h-5 w-5" />;
      case 'cloud_data': return <Database className="h-5 w-5" />;
      default: return <File className="h-5 w-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-600 rounded-xl shadow-lg">
              <Microscope className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Digital Forensics Laboratory</h1>
              <p className="text-gray-600">Professional forensic investigation and evidence analysis</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              New Case
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export Report
            </Button>
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>

        {/* Cases Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          <Card className="bg-gradient-to-r from-red-50 to-red-100 border-red-200">
            <CardContent className="p-6 text-center">
              <AlertTriangle className="h-8 w-8 mx-auto text-red-600 mb-2" />
              <h3 className="font-semibold text-red-900">Critical Cases</h3>
              <p className="text-2xl font-bold text-red-700">1</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
            <CardContent className="p-6 text-center">
              <Activity className="h-8 w-8 mx-auto text-orange-600 mb-2" />
              <h3 className="font-semibold text-orange-900">Active Cases</h3>
              <p className="text-2xl font-bold text-orange-700">2</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
            <CardContent className="p-6 text-center">
              <CheckCircle className="h-8 w-8 mx-auto text-green-600 mb-2" />
              <h3 className="font-semibold text-green-900">Completed</h3>
              <p className="text-2xl font-bold text-green-700">47</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-6 text-center">
              <Archive className="h-8 w-8 mx-auto text-blue-600 mb-2" />
              <h3 className="font-semibold text-blue-900">Evidence Items</h3>
              <p className="text-2xl font-bold text-blue-700">156</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Forensics Interface */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs defaultValue="cases" className="space-y-4">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="cases">Active Cases</TabsTrigger>
              <TabsTrigger value="evidence">Evidence</TabsTrigger>
              <TabsTrigger value="findings">Findings</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="tools">Tools</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>

            {/* Active Cases Tab */}
            <TabsContent value="cases" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <FolderOpen className="h-5 w-5 text-purple-600" />
                        Forensic Cases
                      </CardTitle>
                      <CardDescription>
                        Manage active forensic investigations and case files
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          placeholder="Search cases..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 w-64"
                        />
                      </div>
                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredCases.map((forensicCase) => (
                      <motion.div
                        key={forensicCase.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`p-4 rounded-lg border hover:shadow-md transition-shadow cursor-pointer ${
                          selectedCase === forensicCase.id ? 'border-purple-300 bg-purple-50' : 'border-gray-200'
                        }`}
                        onClick={() => setSelectedCase(forensicCase.id)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold text-gray-900">{forensicCase.title}</h3>
                              {getStatusBadge(forensicCase.status)}
                              <Badge variant="outline" className={getPriorityColor(forensicCase.priority)}>
                                {forensicCase.priority}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">{forensicCase.description}</p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <div>
                                <span className="text-gray-500">Case #:</span>
                                <span className="font-medium ml-1">{forensicCase.case_number}</span>
                              </div>
                              <div>
                                <span className="text-gray-500">Examiner:</span>
                                <span className="font-medium ml-1">{forensicCase.assigned_examiner}</span>
                              </div>
                              <div>
                                <span className="text-gray-500">Evidence:</span>
                                <span className="font-medium ml-1">{forensicCase.evidence_count} items</span>
                              </div>
                              <div>
                                <span className="text-gray-500">Progress:</span>
                                <span className="font-medium ml-1">{forensicCase.completion_percentage}%</span>
                              </div>
                            </div>
                            <div className="mt-3">
                              <Progress value={forensicCase.completion_percentage} className="h-2" />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Evidence Tab */}
            <TabsContent value="evidence" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HardDrive className="h-5 w-5 text-indigo-600" />
                    Digital Evidence
                  </CardTitle>
                  <CardDescription>
                    Manage and analyze digital evidence artifacts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {digitalEvidence.map((evidence) => (
                      <div key={evidence.id} className="p-4 border rounded-lg hover:shadow-sm transition-shadow">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4">
                            <div className="p-2 bg-indigo-50 rounded-lg">
                              {getEvidenceTypeIcon(evidence.type)}
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900 mb-1">{evidence.name}</h3>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                                <div>
                                  <span className="text-gray-500">Size:</span>
                                  <span className="ml-1">{formatFileSize(evidence.file_size)}</span>
                                </div>
                                <div>
                                  <span className="text-gray-500">Acquired:</span>
                                  <span className="ml-1">{evidence.acquisition_date.toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  {evidence.integrity_verified ? (
                                    <>
                                      <CheckCircle className="h-4 w-4 text-green-500" />
                                      <span className="text-green-600">Verified</span>
                                    </>
                                  ) : (
                                    <>
                                      <AlertTriangle className="h-4 w-4 text-red-500" />
                                      <span className="text-red-600">Unverified</span>
                                    </>
                                  )}
                                </div>
                                <div>
                                  <span className="text-gray-500">Findings:</span>
                                  <span className="ml-1">{evidence.findings_count}</span>
                                </div>
                              </div>
                              <div className="mt-2">
                                <Badge 
                                  variant={evidence.analysis_status === 'completed' ? 'default' : 'secondary'}
                                  className={evidence.analysis_status === 'analyzing' ? 'bg-orange-500' : ''}
                                >
                                  {evidence.analysis_status}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-1" />
                              Analyze
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-1" />
                              Export
                            </Button>
                          </div>
                        </div>

                        {/* Hash Information */}
                        <div className="mt-3 p-3 bg-gray-50 rounded text-xs font-mono">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <div>
                              <span className="text-gray-500">MD5:</span>
                              <span className="ml-2">{evidence.hash_md5}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">SHA256:</span>
                              <span className="ml-2">{evidence.hash_sha256}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Findings Tab */}
            <TabsContent value="findings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-green-600" />
                    Forensic Findings
                  </CardTitle>
                  <CardDescription>
                    Analysis results and discovered artifacts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {forensicFindings.map((finding) => (
                      <div key={finding.id} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-start gap-3">
                            <Badge 
                              variant="outline" 
                              className={
                                finding.severity === 'critical' ? 'border-red-500 text-red-700' :
                                finding.severity === 'high' ? 'border-orange-500 text-orange-700' :
                                finding.severity === 'medium' ? 'border-yellow-500 text-yellow-700' :
                                'border-blue-500 text-blue-700'
                              }
                            >
                              {finding.severity}
                            </Badge>
                            <div>
                              <h3 className="font-semibold text-gray-900">{finding.title}</h3>
                              <p className="text-sm text-gray-600 mt-1">{finding.description}</p>
                            </div>
                          </div>
                          <div className="text-sm text-gray-500">
                            Confidence: {finding.confidence_score}%
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Type:</span>
                            <span className="ml-1 capitalize">{finding.type.replace('_', ' ')}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Timestamp:</span>
                            <span className="ml-1">{finding.timestamp.toLocaleString()}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Artifacts:</span>
                            <span className="ml-1">{finding.artifacts.length} items</span>
                          </div>
                        </div>

                        {finding.file_path && (
                          <div className="mt-2 p-2 bg-gray-50 rounded text-sm font-mono">
                            <span className="text-gray-500">Path:</span>
                            <span className="ml-2">{finding.file_path}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Timeline Tab */}
            <TabsContent value="timeline" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-blue-600" />
                    Forensic Timeline
                  </CardTitle>
                  <CardDescription>
                    Chronological reconstruction of events
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Alert>
                    <Calendar className="h-4 w-4" />
                    <AlertTitle>Timeline Analysis</AlertTitle>
                    <AlertDescription>
                      Advanced timeline reconstruction showing 1,247 events across digital evidence sources.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tools Tab */}
            <TabsContent value="tools" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-gray-600" />
                    Forensic Tools
                  </CardTitle>
                  <CardDescription>
                    Digital forensics software and analysis tools
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {forensicTools.map((tool) => (
                      <Card key={tool.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-gray-900">{tool.name}</h3>
                            <Badge 
                              variant={tool.status === 'available' ? 'default' : 'secondary'}
                              className={
                                tool.status === 'running' ? 'bg-green-500' :
                                tool.status === 'offline' ? 'bg-red-500' :
                                tool.status === 'updating' ? 'bg-orange-500' : ''
                              }
                            >
                              {tool.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">Version {tool.version}</p>
                          <div className="text-xs text-gray-500">
                            <p>Category: {tool.category}</p>
                            <p>Last used: {tool.last_used.toLocaleDateString()}</p>
                          </div>
                          <div className="mt-3">
                            <p className="text-xs text-gray-500 mb-1">Capabilities:</p>
                            <div className="flex flex-wrap gap-1">
                              {tool.capabilities.slice(0, 2).map((capability) => (
                                <Badge key={capability} variant="outline" className="text-xs">
                                  {capability}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Reports Tab */}
            <TabsContent value="reports" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-orange-600" />
                    Forensic Reports
                  </CardTitle>
                  <CardDescription>
                    Generate comprehensive forensic analysis reports
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
                      <FileText className="h-6 w-6" />
                      <span>Case Report</span>
                    </Button>
                    
                    <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
                      <BarChart3 className="h-6 w-6" />
                      <span>Analysis Summary</span>
                    </Button>

                    <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
                      <Clock className="h-6 w-6" />
                      <span>Timeline Report</span>
                    </Button>

                    <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
                      <Shield className="h-6 w-6" />
                      <span>Chain of Custody</span>
                    </Button>

                    <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
                      <Hash className="h-6 w-6" />
                      <span>Hash Verification</span>
                    </Button>

                    <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
                      <Download className="h-6 w-6" />
                      <span>Export Evidence</span>
                    </Button>
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

export default DigitalForensics;