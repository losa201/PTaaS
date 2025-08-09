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
  Brain,
  Target,
  Globe,
  AlertTriangle,
  Shield,
  Eye,
  Zap,
  TrendingUp,
  Map,
  Users,
  Clock,
  Activity,
  BarChart3,
  PieChart,
  Network,
  Search,
  Filter,
  Download,
  RefreshCw,
  Settings,
  Flag,
  MapPin,
  Link,
  Calendar,
  FileText,
  Database,
  Lock,
  Unlock,
  CheckCircle2,
  XCircle,
  AlertOctagon,
  Radar,
  Satellite,
  Crosshair,
  Layers,
  GitBranch,
  Hash,
  Binary,
  Server,
  HardDrive
} from 'lucide-react';
import { motion } from 'framer-motion';

interface ThreatIndicator {
  id: string;
  type: 'ip' | 'domain' | 'hash' | 'url' | 'email' | 'file';
  value: string;
  confidence: number;
  severity: 'critical' | 'high' | 'medium' | 'low';
  firstSeen: string;
  lastSeen: string;
  sources: string[];
  tags: string[];
  description: string;
  malwareFamily?: string;
  country?: string;
  isp?: string;
  asn?: string;
  reputation: number;
  contextualInfo: {
    campaigns?: string[];
    actors?: string[];
    techniques?: string[];
    industries?: string[];
  };
}

interface ThreatActor {
  id: string;
  name: string;
  aliases: string[];
  type: 'apt' | 'cybercriminal' | 'hacktivist' | 'nation_state' | 'insider';
  sophistication: 'low' | 'medium' | 'high' | 'expert';
  motivation: string[];
  primaryTargets: string[];
  geolocation: string;
  activeStatus: 'active' | 'dormant' | 'disrupted';
  firstObserved: string;
  lastActivity: string;
  campaigns: number;
  techniques: string[];
  attribution: number;
  description: string;
}

interface ThreatCampaign {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'monitoring';
  severity: 'critical' | 'high' | 'medium' | 'low';
  startDate: string;
  endDate?: string;
  actors: string[];
  targetedIndustries: string[];
  targetedRegions: string[];
  techniques: string[];
  malwareFamilies: string[];
  iocs: number;
  confidence: number;
  affectedOrganizations: number;
  description: string;
}

interface VulnerabilityIntel {
  id: string;
  cveId: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  cvssScore: number;
  exploited: boolean;
  weaponized: boolean;
  publishedDate: string;
  exploitPublicDate?: string;
  affectedProducts: string[];
  threatActors: string[];
  campaigns: string[];
  patchAvailable: boolean;
  workarounds: string[];
  description: string;
  mitreId?: string;
}

interface IOCAnalysis {
  indicator: string;
  type: string;
  risk: 'high' | 'medium' | 'low';
  enrichment: {
    whois?: any;
    dns?: string[];
    geolocation?: any;
    reputation?: any;
    relationships?: string[];
  };
}

const ThreatIntelligencePlatform: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d');
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const [threatIndicators] = useState<ThreatIndicator[]>([
    {
      id: 'ioc-001',
      type: 'ip',
      value: '192.168.100.45',
      confidence: 95,
      severity: 'critical',
      firstSeen: '2025-08-07T10:30:00Z',
      lastSeen: '2025-08-08T14:20:00Z',
      sources: ['VirusTotal', 'AlienVault OTX', 'IBM X-Force'],
      tags: ['malware', 'c2', 'apt29'],
      description: 'Command and control server associated with APT29 campaign targeting financial institutions',
      country: 'Russia',
      isp: 'Autonomous System 12345',
      asn: 'AS12345',
      reputation: 5,
      contextualInfo: {
        campaigns: ['Operation GhostWriter', 'SolarWinds Supply Chain'],
        actors: ['APT29', 'Cozy Bear'],
        techniques: ['T1071.001', 'T1055'],
        industries: ['Financial', 'Government', 'Technology']
      }
    },
    {
      id: 'ioc-002',
      type: 'domain',
      value: 'malicious-banking-site.com',
      confidence: 88,
      severity: 'high',
      firstSeen: '2025-08-06T08:15:00Z',
      lastSeen: '2025-08-08T16:45:00Z',
      sources: ['URLVoid', 'Cisco Talos', 'FireEye'],
      tags: ['phishing', 'banking', 'credential-theft'],
      description: 'Phishing domain impersonating major banking institution for credential harvesting',
      reputation: 15,
      contextualInfo: {
        campaigns: ['Banking Trojan Campaign 2025'],
        actors: ['FIN7'],
        techniques: ['T1566.002', 'T1056.001'],
        industries: ['Financial Services', 'Banking']
      }
    },
    {
      id: 'ioc-003',
      type: 'hash',
      value: 'a1b2c3d4e5f67890abcdef1234567890',
      confidence: 92,
      severity: 'high',
      firstSeen: '2025-08-05T12:00:00Z',
      lastSeen: '2025-08-08T11:30:00Z',
      sources: ['Hybrid Analysis', 'Joe Sandbox', 'Any.run'],
      tags: ['ransomware', 'lockbit', 'encryption'],
      description: 'LockBit 3.0 ransomware payload with advanced evasion techniques',
      malwareFamily: 'LockBit',
      reputation: 8,
      contextualInfo: {
        campaigns: ['LockBit 3.0 Campaign'],
        actors: ['LockBit Group'],
        techniques: ['T1486', 'T1083', 'T1057'],
        industries: ['Healthcare', 'Manufacturing', 'Education']
      }
    }
  ]);

  const [threatActors] = useState<ThreatActor[]>([
    {
      id: 'actor-001',
      name: 'APT29',
      aliases: ['Cozy Bear', 'The Dukes', 'NOBELIUM'],
      type: 'apt',
      sophistication: 'expert',
      motivation: ['espionage', 'intelligence collection'],
      primaryTargets: ['Government', 'Healthcare', 'Technology', 'Think Tanks'],
      geolocation: 'Russia',
      activeStatus: 'active',
      firstObserved: '2008-01-01T00:00:00Z',
      lastActivity: '2025-08-08T15:30:00Z',
      campaigns: 47,
      techniques: ['T1071.001', 'T1055', 'T1134', 'T1027'],
      attribution: 98,
      description: 'Russian state-sponsored APT group known for sophisticated supply chain attacks and zero-day exploits'
    },
    {
      id: 'actor-002',
      name: 'FIN7',
      aliases: ['Carbanak Group', 'Navigator Group'],
      type: 'cybercriminal',
      sophistication: 'high',
      motivation: ['financial gain', 'data theft'],
      primaryTargets: ['Retail', 'Restaurant', 'Hospitality', 'Financial Services'],
      geolocation: 'Eastern Europe',
      activeStatus: 'active',
      firstObserved: '2013-01-01T00:00:00Z',
      lastActivity: '2025-08-07T09:45:00Z',
      campaigns: 23,
      techniques: ['T1566.001', 'T1055', 'T1059.001', 'T1083'],
      attribution: 87,
      description: 'Financially motivated cybercriminal group specializing in point-of-sale malware and payment card theft'
    },
    {
      id: 'actor-003',
      name: 'LockBit Group',
      aliases: ['LockBit 3.0', 'LockBit Black'],
      type: 'cybercriminal',
      sophistication: 'high',
      motivation: ['financial gain', 'ransomware'],
      primaryTargets: ['Healthcare', 'Manufacturing', 'Government', 'Education'],
      geolocation: 'Russia',
      activeStatus: 'active',
      firstObserved: '2019-01-01T00:00:00Z',
      lastActivity: '2025-08-08T12:20:00Z',
      campaigns: 15,
      techniques: ['T1486', 'T1083', 'T1057', 'T1012'],
      attribution: 91,
      description: 'Ransomware-as-a-Service operation known for fast encryption and sophisticated affiliate network'
    }
  ]);

  const [threatCampaigns] = useState<ThreatCampaign[]>([
    {
      id: 'campaign-001',
      name: 'Operation GhostWriter',
      status: 'active',
      severity: 'critical',
      startDate: '2025-07-15T00:00:00Z',
      actors: ['APT29'],
      targetedIndustries: ['Government', 'Defense', 'Technology'],
      targetedRegions: ['North America', 'Europe'],
      techniques: ['T1071.001', 'T1055', 'T1134'],
      malwareFamilies: ['SolarWinds Backdoor', 'TEARDROP'],
      iocs: 147,
      confidence: 96,
      affectedOrganizations: 23,
      description: 'Sophisticated supply chain attack targeting software providers and their downstream customers'
    },
    {
      id: 'campaign-002',
      name: 'Banking Trojan Campaign 2025',
      status: 'active',
      severity: 'high',
      startDate: '2025-08-01T00:00:00Z',
      actors: ['FIN7'],
      targetedIndustries: ['Financial Services', 'Banking'],
      targetedRegions: ['North America', 'Europe', 'Asia'],
      techniques: ['T1566.002', 'T1056.001', 'T1555'],
      malwareFamilies: ['Carbanak', 'FlawedAmmyy'],
      iocs: 89,
      confidence: 88,
      affectedOrganizations: 12,
      description: 'Large-scale phishing campaign targeting online banking credentials and payment systems'
    },
    {
      id: 'campaign-003',
      name: 'LockBit 3.0 Campaign',
      status: 'active',
      severity: 'critical',
      startDate: '2025-07-20T00:00:00Z',
      actors: ['LockBit Group'],
      targetedIndustries: ['Healthcare', 'Manufacturing', 'Education'],
      targetedRegions: ['Global'],
      techniques: ['T1486', 'T1083', 'T1057'],
      malwareFamilies: ['LockBit 3.0'],
      iocs: 203,
      confidence: 93,
      affectedOrganizations: 34,
      description: 'Aggressive ransomware campaign with double extortion tactics and leak site operations'
    }
  ]);

  const [vulnerabilities] = useState<VulnerabilityIntel[]>([
    {
      id: 'vuln-001',
      cveId: 'CVE-2025-0001',
      severity: 'critical',
      cvssScore: 9.8,
      exploited: true,
      weaponized: true,
      publishedDate: '2025-08-01T00:00:00Z',
      exploitPublicDate: '2025-08-05T00:00:00Z',
      affectedProducts: ['Microsoft Exchange Server 2019', 'Microsoft Exchange Server 2016'],
      threatActors: ['APT29', 'APT40'],
      campaigns: ['Operation GhostWriter', 'Exchange Server Campaign'],
      patchAvailable: true,
      workarounds: ['Disable external access', 'Enable MFA'],
      description: 'Remote code execution vulnerability in Microsoft Exchange Server allowing unauthenticated attack',
      mitreId: 'T1190'
    },
    {
      id: 'vuln-002',
      cveId: 'CVE-2025-0002',
      severity: 'high',
      cvssScore: 8.1,
      exploited: false,
      weaponized: true,
      publishedDate: '2025-08-03T00:00:00Z',
      affectedProducts: ['Apache Struts 2.5.30', 'Apache Struts 2.3.37'],
      threatActors: [],
      campaigns: [],
      patchAvailable: true,
      workarounds: ['Update to latest version', 'Implement WAF rules'],
      description: 'OGNL injection vulnerability in Apache Struts leading to remote code execution',
      mitreId: 'T1190'
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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'ip': return <Globe className="h-4 w-4" />;
      case 'domain': return <Globe className="h-4 w-4" />;
      case 'hash': return <Hash className="h-4 w-4" />;
      case 'url': return <Link className="h-4 w-4" />;
      case 'email': return <Users className="h-4 w-4" />;
      case 'file': return <FileText className="h-4 w-4" />;
      default: return <Target className="h-4 w-4" />;
    }
  };

  const getActorTypeIcon = (type: string) => {
    switch (type) {
      case 'apt': return <Shield className="h-4 w-4 text-red-600" />;
      case 'cybercriminal': return <Users className="h-4 w-4 text-orange-600" />;
      case 'hacktivist': return <Flag className="h-4 w-4 text-blue-600" />;
      case 'nation_state': return <Flag className="h-4 w-4 text-purple-600" />;
      case 'insider': return <Users className="h-4 w-4 text-yellow-600" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const analyzeThreatIndicator = async (indicator: string) => {
    setIsAnalyzing(true);
    // Simulate analysis
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 3000);
  };

  // Calculate dashboard metrics
  const totalIOCs = threatIndicators.length;
  const activeActors = threatActors.filter(a => a.activeStatus === 'active').length;
  const activeCampaigns = threatCampaigns.filter(c => c.status === 'active').length;
  const criticalVulns = vulnerabilities.filter(v => v.severity === 'critical' && v.exploited).length;

  const filteredIndicators = threatIndicators.filter(indicator => {
    const matchesSeverity = selectedSeverity === 'all' || indicator.severity === selectedSeverity;
    const matchesSearch = searchQuery === '' || 
      indicator.value.toLowerCase().includes(searchQuery.toLowerCase()) ||
      indicator.description.toLowerCase().includes(searchQuery.toLowerCase());
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
          Advanced Threat Intelligence Platform
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl">
          Comprehensive threat intelligence aggregation, analysis, and correlation platform powered by 
          machine learning and global intelligence feeds for proactive threat hunting and defense.
        </p>
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="indicators" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            IOCs
          </TabsTrigger>
          <TabsTrigger value="actors" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Threat Actors
          </TabsTrigger>
          <TabsTrigger value="campaigns" className="flex items-center gap-2">
            <Radar className="h-4 w-4" />
            Campaigns
          </TabsTrigger>
          <TabsTrigger value="vulnerabilities" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Vulnerabilities
          </TabsTrigger>
          <TabsTrigger value="analysis" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            Analysis
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
                    <p className="text-sm font-medium text-gray-600">Total IOCs</p>
                    <p className="text-3xl font-bold text-blue-600">{totalIOCs.toLocaleString()}</p>
                  </div>
                  <Target className="h-8 w-8 text-blue-600" />
                </div>
                <p className="text-xs text-gray-500 mt-2">+247 in last 24h</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Actors</p>
                    <p className="text-3xl font-bold text-red-600">{activeActors}</p>
                  </div>
                  <Users className="h-8 w-8 text-red-600" />
                </div>
                <p className="text-xs text-red-600 mt-2">3 new this week</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Campaigns</p>
                    <p className="text-3xl font-bold text-orange-600">{activeCampaigns}</p>
                  </div>
                  <Radar className="h-8 w-8 text-orange-600" />
                </div>
                <p className="text-xs text-orange-600 mt-2">2 high severity</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Critical CVEs</p>
                    <p className="text-3xl font-bold text-purple-600">{criticalVulns}</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-purple-600" />
                </div>
                <p className="text-xs text-purple-600 mt-2">Actively exploited</p>
              </CardContent>
            </Card>
          </div>

          {/* Threat Landscape Map */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Map className="h-5 w-5" />
                Global Threat Landscape
              </CardTitle>
              <CardDescription>Real-time threat activity by geographic region</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Globe className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                  <p className="text-lg font-semibold text-gray-700">Interactive Threat Map</p>
                  <p className="text-sm text-gray-500">Visualizing global threat intelligence data</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent High-Priority Threats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                High-Priority Threats
              </CardTitle>
              <CardDescription>Critical threats requiring immediate attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {threatIndicators.filter(i => i.severity === 'critical').slice(0, 3).map((indicator, index) => (
                  <motion.div
                    key={indicator.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 border rounded-lg bg-red-50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-red-100 rounded-full text-red-600">
                        {getTypeIcon(indicator.type)}
                      </div>
                      <div>
                        <h4 className="font-semibold">{indicator.value}</h4>
                        <p className="text-sm text-gray-600">{indicator.description}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className="bg-red-100 text-red-800 text-xs">
                            {indicator.confidence}% confidence
                          </Badge>
                          {indicator.contextualInfo.actors?.map(actor => (
                            <Badge key={actor} variant="outline" className="text-xs">
                              {actor}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-1" />
                        Analyze
                      </Button>
                      <Button size="sm">
                        <Shield className="h-4 w-4 mr-1" />
                        Block
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Indicators of Compromise */}
        <TabsContent value="indicators" className="space-y-6">
          {/* IOC Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <Input
                    placeholder="Search IOCs, IPs, domains, hashes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="max-w-sm"
                  />
                  <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
                    <SelectTrigger className="w-[150px]">
                      <Filter className="h-4 w-4 mr-2" />
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
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export IOCs
                  </Button>
                  <Button size="sm">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh Feed
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* IOCs List */}
          <div className="grid gap-6">
            {filteredIndicators.map((indicator, index) => (
              <motion.div
                key={indicator.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        {getTypeIcon(indicator.type)}
                        <div>
                          <CardTitle className="text-lg font-mono">{indicator.value}</CardTitle>
                          <CardDescription>{indicator.description}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getSeverityColor(indicator.severity)}>
                          {indicator.severity}
                        </Badge>
                        <Badge variant="outline">
                          {indicator.confidence}% confidence
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="font-medium text-gray-700">Type</p>
                          <p className="text-gray-600 capitalize">{indicator.type}</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-700">First Seen</p>
                          <p className="text-gray-600">{new Date(indicator.firstSeen).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-700">Last Seen</p>
                          <p className="text-gray-600">{new Date(indicator.lastSeen).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-700">Sources</p>
                          <p className="text-gray-600">{indicator.sources.length} feeds</p>
                        </div>
                      </div>

                      {/* Contextual Information */}
                      <div className="space-y-3">
                        {indicator.contextualInfo.actors && indicator.contextualInfo.actors.length > 0 && (
                          <div>
                            <p className="font-medium text-gray-700 mb-1">Associated Threat Actors</p>
                            <div className="flex flex-wrap gap-1">
                              {indicator.contextualInfo.actors.map((actor, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs bg-red-50 text-red-700">
                                  {actor}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {indicator.contextualInfo.campaigns && indicator.contextualInfo.campaigns.length > 0 && (
                          <div>
                            <p className="font-medium text-gray-700 mb-1">Related Campaigns</p>
                            <div className="flex flex-wrap gap-1">
                              {indicator.contextualInfo.campaigns.map((campaign, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs bg-blue-50 text-blue-700">
                                  {campaign}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {indicator.tags.length > 0 && (
                          <div>
                            <p className="font-medium text-gray-700 mb-1">Tags</p>
                            <div className="flex flex-wrap gap-1">
                              {indicator.tags.map((tag, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex justify-between items-center pt-4 border-t">
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>Reputation: {indicator.reputation}/100</span>
                          {indicator.country && (
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {indicator.country}
                            </span>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Search className="h-4 w-4 mr-1" />
                            Pivot
                          </Button>
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            Enrich
                          </Button>
                          <Button size="sm">
                            <Shield className="h-4 w-4 mr-1" />
                            Block
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

        {/* Threat Actors */}
        <TabsContent value="actors" className="space-y-6">
          <div className="grid gap-6">
            {threatActors.map((actor, index) => (
              <motion.div
                key={actor.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        {getActorTypeIcon(actor.type)}
                        <div>
                          <CardTitle className="text-xl">{actor.name}</CardTitle>
                          <CardDescription>{actor.description}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={actor.activeStatus === 'active' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}>
                          {actor.activeStatus}
                        </Badge>
                        <Badge variant="outline">
                          {actor.attribution}% attribution
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="font-medium text-gray-700">Type</p>
                        <p className="text-gray-600 capitalize">{actor.type.replace('_', ' ')}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">Sophistication</p>
                        <p className="text-gray-600 capitalize">{actor.sophistication}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">Geography</p>
                        <p className="text-gray-600">{actor.geolocation}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">Campaigns</p>
                        <p className="text-gray-600">{actor.campaigns}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <p className="font-medium text-gray-700 mb-1">Aliases</p>
                        <div className="flex flex-wrap gap-1">
                          {actor.aliases.map((alias, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {alias}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="font-medium text-gray-700 mb-1">Primary Motivations</p>
                        <div className="flex flex-wrap gap-1">
                          {actor.motivation.map((motive, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {motive}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="font-medium text-gray-700 mb-1">Primary Targets</p>
                        <div className="flex flex-wrap gap-1">
                          {actor.primaryTargets.map((target, idx) => (
                            <Badge key={idx} className="bg-orange-100 text-orange-800 text-xs">
                              {target}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="font-medium text-gray-700 mb-1">MITRE ATT&CK Techniques</p>
                        <div className="flex flex-wrap gap-1">
                          {actor.techniques.slice(0, 6).map((technique, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs bg-blue-50 text-blue-700">
                              {technique}
                            </Badge>
                          ))}
                          {actor.techniques.length > 6 && (
                            <Badge variant="outline" className="text-xs">
                              +{actor.techniques.length - 6} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t">
                      <div className="text-sm text-gray-600">
                        <p>First Observed: {new Date(actor.firstObserved).toLocaleDateString()}</p>
                        <p>Last Activity: {new Date(actor.lastActivity).toLocaleDateString()}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <FileText className="h-4 w-4 mr-1" />
                          Profile
                        </Button>
                        <Button size="sm">
                          <Target className="h-4 w-4 mr-1" />
                          Track
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Campaigns */}
        <TabsContent value="campaigns" className="space-y-6">
          <div className="grid gap-6">
            {threatCampaigns.map((campaign, index) => (
              <motion.div
                key={campaign.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <Radar className="h-6 w-6 text-orange-600" />
                        <div>
                          <CardTitle className="text-xl">{campaign.name}</CardTitle>
                          <CardDescription>{campaign.description}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getSeverityColor(campaign.severity)}>
                          {campaign.severity}
                        </Badge>
                        <Badge className={campaign.status === 'active' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}>
                          {campaign.status}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="font-medium text-gray-700">Start Date</p>
                        <p className="text-gray-600">{new Date(campaign.startDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">IOCs</p>
                        <p className="text-gray-600">{campaign.iocs}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">Confidence</p>
                        <p className="text-gray-600">{campaign.confidence}%</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">Affected Orgs</p>
                        <p className="text-gray-600">{campaign.affectedOrganizations}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <p className="font-medium text-gray-700 mb-1">Associated Actors</p>
                        <div className="flex flex-wrap gap-1">
                          {campaign.actors.map((actor, idx) => (
                            <Badge key={idx} className="bg-red-100 text-red-800 text-xs">
                              {actor}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="font-medium text-gray-700 mb-1">Targeted Industries</p>
                        <div className="flex flex-wrap gap-1">
                          {campaign.targetedIndustries.map((industry, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {industry}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="font-medium text-gray-700 mb-1">Targeted Regions</p>
                        <div className="flex flex-wrap gap-1">
                          {campaign.targetedRegions.map((region, idx) => (
                            <Badge key={idx} className="bg-blue-100 text-blue-800 text-xs">
                              {region}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="font-medium text-gray-700 mb-1">Malware Families</p>
                        <div className="flex flex-wrap gap-1">
                          {campaign.malwareFamilies.map((family, idx) => (
                            <Badge key={idx} className="bg-purple-100 text-purple-800 text-xs">
                              {family}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t flex justify-end gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-1" />
                        Details
                      </Button>
                      <Button size="sm">
                        <Shield className="h-4 w-4 mr-1" />
                        Monitor
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Vulnerabilities */}
        <TabsContent value="vulnerabilities" className="space-y-6">
          <div className="grid gap-6">
            {vulnerabilities.map((vuln, index) => (
              <motion.div
                key={vuln.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="h-6 w-6 text-red-600" />
                        <div>
                          <CardTitle className="text-xl">{vuln.cveId}</CardTitle>
                          <CardDescription>{vuln.description}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getSeverityColor(vuln.severity)}>
                          {vuln.severity}
                        </Badge>
                        <Badge variant="outline">
                          CVSS {vuln.cvssScore}
                        </Badge>
                        {vuln.exploited && (
                          <Badge className="bg-red-100 text-red-800">
                            Exploited
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="font-medium text-gray-700">Published</p>
                        <p className="text-gray-600">{new Date(vuln.publishedDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">CVSS Score</p>
                        <p className="text-gray-600">{vuln.cvssScore}/10.0</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">Patch Available</p>
                        <p className={vuln.patchAvailable ? 'text-green-600' : 'text-red-600'}>
                          {vuln.patchAvailable ? 'Yes' : 'No'}
                        </p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">Weaponized</p>
                        <p className={vuln.weaponized ? 'text-red-600' : 'text-green-600'}>
                          {vuln.weaponized ? 'Yes' : 'No'}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <p className="font-medium text-gray-700 mb-1">Affected Products</p>
                        <div className="flex flex-wrap gap-1">
                          {vuln.affectedProducts.map((product, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {product}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {vuln.threatActors.length > 0 && (
                        <div>
                          <p className="font-medium text-gray-700 mb-1">Exploiting Actors</p>
                          <div className="flex flex-wrap gap-1">
                            {vuln.threatActors.map((actor, idx) => (
                              <Badge key={idx} className="bg-red-100 text-red-800 text-xs">
                                {actor}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      <div>
                        <p className="font-medium text-gray-700 mb-1">Workarounds</p>
                        <ul className="list-disc list-inside text-sm text-gray-600">
                          {vuln.workarounds.map((workaround, idx) => (
                            <li key={idx}>{workaround}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-4 border-t flex justify-between items-center">
                      <div className="text-sm text-gray-600">
                        {vuln.mitreId && (
                          <span>MITRE Technique: {vuln.mitreId}</span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <FileText className="h-4 w-4 mr-1" />
                          Details
                        </Button>
                        <Button size="sm">
                          <Shield className="h-4 w-4 mr-1" />
                          Protect
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Analysis Engine */}
        <TabsContent value="analysis" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Threat Intelligence Analysis Engine
              </CardTitle>
              <CardDescription>
                Advanced AI-powered threat analysis and correlation platform
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label htmlFor="indicator-input">Enter Indicator to Analyze</Label>
                  <Input
                    id="indicator-input"
                    placeholder="IP address, domain, hash, or URL..."
                    className="mt-2"
                  />
                </div>
                <div className="flex items-end">
                  <Button 
                    onClick={() => analyzeThreatIndicator('')}
                    disabled={isAnalyzing}
                    className="flex items-center gap-2"
                  >
                    {isAnalyzing ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ) : (
                      <Search className="h-4 w-4" />
                    )}
                    Analyze
                  </Button>
                </div>
              </div>

              <Alert>
                <Brain className="h-4 w-4" />
                <AlertDescription>
                  AI analysis engine processes indicators across 50+ threat intelligence feeds, 
                  correlates with known campaigns, and provides contextualized risk assessment 
                  with actionable recommendations.
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Analysis Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        Multi-source correlation
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        Behavioral analysis
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        Campaign attribution
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        Risk scoring
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Data Sources</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li>• Commercial feeds (50+)</li>
                      <li>• Open source intelligence</li>
                      <li>• Government advisories</li>
                      <li>• Industry sharing groups</li>
                      <li>• Internal telemetry</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Output Formats</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li>• STIX/TAXII 2.1</li>
                      <li>• MITRE ATT&CK mapping</li>
                      <li>• Custom IOC formats</li>
                      <li>• API integrations</li>
                      <li>• Executive summaries</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ThreatIntelligencePlatform;