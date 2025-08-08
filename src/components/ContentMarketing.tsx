import { useState } from 'react';
import { FileText, Users, TrendingUp, Calendar, Target, Globe, Video, BookOpen, MessageCircle, Share2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

interface ContentPiece {
  id: string;
  title: string;
  type: 'blog' | 'whitepaper' | 'case_study' | 'webinar' | 'video' | 'infographic';
  industry: 'finance' | 'healthcare' | 'manufacturing' | 'general';
  stage: 'awareness' | 'consideration' | 'decision';
  status: 'planned' | 'in_progress' | 'completed' | 'published';
  priority: 'high' | 'medium' | 'low';
  expectedTraffic: number;
  conversionRate: number;
  publishDate: Date;
  keywords: string[];
}

interface ContentCampaign {
  id: string;
  name: string;
  objective: string;
  targetAudience: string;
  duration: string;
  budget: string;
  kpis: string[];
  content: ContentPiece[];
  performance: {
    reach: number;
    engagement: number;
    leads: number;
    pipeline: string;
  };
}

const ContentMarketing = () => {
  const [activeTab, setActiveTab] = useState('strategy');

  const contentCalendar: ContentPiece[] = [
    {
      id: 'ransomware-finance',
      title: 'How AI Stops Ransomware in Banking: 3 Case Studies',
      type: 'blog',
      industry: 'finance',
      stage: 'awareness',
      status: 'published',
      priority: 'high',
      expectedTraffic: 2500,
      conversionRate: 3.2,
      publishDate: new Date('2025-01-15'),
      keywords: ['ransomware banking', 'financial cybersecurity', 'AI threat detection']
    },
    {
      id: 'hipaa-compliance',
      title: 'The CISO\'s Guide to HIPAA Compliance Automation',
      type: 'whitepaper',
      industry: 'healthcare',
      stage: 'consideration',
      status: 'in_progress',
      priority: 'high',
      expectedTraffic: 1200,
      conversionRate: 12.5,
      publishDate: new Date('2025-01-22'),
      keywords: ['HIPAA compliance', 'healthcare cybersecurity', 'automated compliance']
    },
    {
      id: 'ot-security-manufacturing',
      title: 'Securing Industry 4.0: OT/IT Convergence Best Practices',
      type: 'webinar',
      industry: 'manufacturing',
      stage: 'consideration',
      status: 'planned',
      priority: 'medium',
      expectedTraffic: 800,
      conversionRate: 18.7,
      publishDate: new Date('2025-02-05'),
      keywords: ['OT security', 'industrial cybersecurity', 'manufacturing security']
    },
    {
      id: 'ai-security-trends',
      title: '2025 Cybersecurity Trends: What CISOs Need to Know',
      type: 'video',
      industry: 'general',
      stage: 'awareness',
      status: 'completed',
      priority: 'high',
      expectedTraffic: 5000,
      conversionRate: 2.8,
      publishDate: new Date('2025-01-10'),
      keywords: ['cybersecurity trends', 'CISO insights', '2025 security predictions']
    }
  ];

  const campaigns: ContentCampaign[] = [
    {
      id: 'finance-q1',
      name: 'Financial Services Security Awareness',
      objective: 'Generate 500 qualified leads from banking/fintech CISOs',
      targetAudience: 'CISOs, CTOs, Security Managers in Financial Services (10K+ employees)',
      duration: 'Q1 2025 (3 months)',
      budget: '$75,000',
      kpis: ['500 MQLs', '50 SQLs', '$2M pipeline', '25% conversion rate'],
      content: contentCalendar.filter(c => c.industry === 'finance'),
      performance: {
        reach: 125000,
        engagement: 8.4,
        leads: 347,
        pipeline: '$1.8M'
      }
    },
    {
      id: 'healthcare-compliance',
      name: 'Healthcare Compliance Automation',
      objective: 'Position as HIPAA compliance leader, generate enterprise demos',
      targetAudience: 'Healthcare CISOs, Compliance Officers, IT Directors',
      duration: 'Q1-Q2 2025 (6 months)',
      budget: '$50,000',
      kpis: ['300 MQLs', '30 demos', '$1.5M pipeline'],
      content: contentCalendar.filter(c => c.industry === 'healthcare'),
      performance: {
        reach: 85000,
        engagement: 12.1,
        leads: 198,
        pipeline: '$950K'
      }
    }
  ];

  const contentTypes = [
    {
      type: 'Blog Posts',
      icon: FileText,
      count: 24,
      avgTraffic: 2800,
      conversionRate: 3.1,
      description: 'SEO-optimized thought leadership content'
    },
    {
      type: 'Whitepapers',
      icon: BookOpen,
      count: 6,
      avgTraffic: 900,
      conversionRate: 15.2,
      description: 'In-depth technical guides and research'
    },
    {
      type: 'Case Studies',
      icon: Users,
      count: 8,
      avgTraffic: 1200,
      conversionRate: 22.1,
      description: 'Customer success stories and ROI data'
    },
    {
      type: 'Webinars',
      icon: Video,
      count: 12,
      avgTraffic: 650,
      conversionRate: 28.5,
      description: 'Live demos and expert discussions'
    }
  ];

  const seoStrategy = {
    primaryKeywords: [
      { keyword: 'AI cybersecurity platform', difficulty: 78, volume: 8900, rank: 3 },
      { keyword: 'enterprise threat detection', difficulty: 65, volume: 5400, rank: 7 },
      { keyword: 'automated incident response', difficulty: 71, volume: 3200, rank: 4 },
      { keyword: 'CISO security tools', difficulty: 59, volume: 2800, rank: 12 }
    ],
    contentGaps: [
      'Zero-trust architecture implementation',
      'Cyber insurance and security ROI',
      'Board-level cybersecurity reporting',
      'Security automation for SMBs'
    ],
    competitorAnalysis: [
      { competitor: 'CrowdStrike', strength: 'Endpoint detection', opportunity: 'AI automation' },
      { competitor: 'Palo Alto Networks', strength: 'Network security', opportunity: 'Industry specialization' },
      { competitor: 'SentinelOne', strength: 'Behavioral analysis', opportunity: 'Compliance automation' }
    ]
  };

  const distributionChannels = [
    { channel: 'Organic Search', traffic: 45, conversion: 4.2, cost: '$0' },
    { channel: 'LinkedIn Ads', traffic: 25, conversion: 6.8, cost: '$25,000' },
    { channel: 'Industry Publications', traffic: 15, conversion: 8.1, cost: '$15,000' },
    { channel: 'Webinar Partnerships', traffic: 10, conversion: 15.2, cost: '$8,000' },
    { channel: 'Email Marketing', traffic: 5, conversion: 12.5, cost: '$2,000' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'text-green-400 bg-green-500/20';
      case 'completed': return 'text-blue-400 bg-blue-500/20';
      case 'in_progress': return 'text-yellow-400 bg-yellow-500/20';
      case 'planned': return 'text-slate-400 bg-slate-500/20';
      default: return 'text-slate-400 bg-slate-500/20';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400 bg-red-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'low': return 'text-green-400 bg-green-500/20';
      default: return 'text-slate-400 bg-slate-500/20';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-4 text-white">Content Marketing Strategy</h2>
        <p className="text-xl text-slate-300 mb-8">
          Data-driven content strategy to generate qualified leads and establish thought leadership
        </p>
      </div>

      {/* Performance Overview */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="bg-slate-900/80 border-green-500/30">
          <CardContent className="text-center p-6">
            <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-400">547</div>
            <div className="text-sm text-slate-400">Total Leads Generated</div>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-900/80 border-blue-500/30">
          <CardContent className="text-center p-6">
            <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-400">210K</div>
            <div className="text-sm text-slate-400">Content Reach</div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/80 border-purple-500/30">
          <CardContent className="text-center p-6">
            <Target className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-400">8.7%</div>
            <div className="text-sm text-slate-400">Avg Conversion Rate</div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/80 border-orange-500/30">
          <CardContent className="text-center p-6">
            <Globe className="w-8 h-8 text-orange-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-400">$2.75M</div>
            <div className="text-sm text-slate-400">Pipeline Generated</div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-slate-800">
          <TabsTrigger value="strategy" className="data-[state=active]:bg-purple-500/20">
            Strategy
          </TabsTrigger>
          <TabsTrigger value="calendar" className="data-[state=active]:bg-blue-500/20">
            Content Calendar
          </TabsTrigger>
          <TabsTrigger value="campaigns" className="data-[state=active]:bg-green-500/20">
            Campaigns
          </TabsTrigger>
          <TabsTrigger value="seo" className="data-[state=active]:bg-orange-500/20">
            SEO & Keywords
          </TabsTrigger>
          <TabsTrigger value="performance" className="data-[state=active]:bg-red-500/20">
            Performance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="strategy" className="space-y-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Content Types */}
            <Card className="bg-slate-900/80 border-slate-500/30">
              <CardHeader>
                <CardTitle className="text-white">Content Portfolio</CardTitle>
                <CardDescription>Distribution across content types and performance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {contentTypes.map((content, index) => (
                  <div key={index} className="p-4 bg-slate-800/50 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <content.icon className="w-5 h-5 text-purple-400" />
                      <span className="font-medium text-white">{content.type}</span>
                      <Badge className="ml-auto bg-purple-500/20 text-purple-400">{content.count} pieces</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-slate-400">Avg Traffic</div>
                        <div className="text-white font-medium">{content.avgTraffic.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-slate-400">Conversion Rate</div>
                        <div className="text-green-400 font-medium">{content.conversionRate}%</div>
                      </div>
                    </div>
                    <div className="text-xs text-slate-500 mt-2">{content.description}</div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Distribution Channels */}
            <Card className="bg-slate-900/80 border-slate-500/30">
              <CardHeader>
                <CardTitle className="text-white">Distribution Strategy</CardTitle>
                <CardDescription>Channel mix and performance optimization</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {distributionChannels.map((channel, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-white">{channel.channel}</span>
                      <div className="text-sm text-slate-400">{channel.traffic}% traffic</div>
                    </div>
                    <Progress value={channel.traffic} className="h-2" />
                    <div className="flex justify-between text-xs">
                      <span className="text-green-400">{channel.conversion}% conversion</span>
                      <span className="text-slate-400">{channel.cost}/month</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-6">
          <div className="grid gap-6">
            {contentCalendar.map((content) => (
              <Card key={content.id} className="bg-slate-900/80 border-slate-500/30">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-white">{content.title}</CardTitle>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge className={getStatusColor(content.status)}>
                          {content.status.replace('_', ' ').toUpperCase()}
                        </Badge>
                        <Badge className={getPriorityColor(content.priority)}>
                          {content.priority.toUpperCase()}
                        </Badge>
                        <Badge className="bg-blue-500/20 text-blue-400">
                          {content.industry.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-slate-400">Publish Date</div>
                      <div className="text-white font-medium">
                        {content.publishDate.toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <div className="text-sm text-slate-400">Expected Traffic</div>
                      <div className="text-white font-medium">{content.expectedTraffic.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-400">Conversion Rate</div>
                      <div className="text-green-400 font-medium">{content.conversionRate}%</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-400">Funnel Stage</div>
                      <div className="text-purple-400 font-medium">{content.stage}</div>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-400 mb-2">Target Keywords</div>
                    <div className="flex flex-wrap gap-2">
                      {content.keywords.map((keyword, idx) => (
                        <Badge key={idx} className="bg-slate-700 text-slate-300 text-xs">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-8">
          {campaigns.map((campaign) => (
            <Card key={campaign.id} className="bg-slate-900/80 border-slate-500/30">
              <CardHeader>
                <CardTitle className="text-white">{campaign.name}</CardTitle>
                <CardDescription>{campaign.objective}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-white mb-2">Campaign Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Target Audience:</span>
                          <span className="text-white">{campaign.targetAudience}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Duration:</span>
                          <span className="text-white">{campaign.duration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Budget:</span>
                          <span className="text-white">{campaign.budget}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-white mb-2">Key Performance Indicators</h4>
                      <div className="flex flex-wrap gap-2">
                        {campaign.kpis.map((kpi, idx) => (
                          <Badge key={idx} className="bg-green-500/20 text-green-400">
                            {kpi}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium text-white mb-2">Current Performance</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-slate-800/50 rounded-lg">
                        <div className="text-lg font-bold text-blue-400">
                          {campaign.performance.reach.toLocaleString()}
                        </div>
                        <div className="text-sm text-slate-400">Total Reach</div>
                      </div>
                      <div className="text-center p-3 bg-slate-800/50 rounded-lg">
                        <div className="text-lg font-bold text-green-400">
                          {campaign.performance.engagement}%
                        </div>
                        <div className="text-sm text-slate-400">Engagement Rate</div>
                      </div>
                      <div className="text-center p-3 bg-slate-800/50 rounded-lg">
                        <div className="text-lg font-bold text-purple-400">
                          {campaign.performance.leads}
                        </div>
                        <div className="text-sm text-slate-400">Qualified Leads</div>
                      </div>
                      <div className="text-center p-3 bg-slate-800/50 rounded-lg">
                        <div className="text-lg font-bold text-orange-400">
                          {campaign.performance.pipeline}
                        </div>
                        <div className="text-sm text-slate-400">Pipeline Value</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="seo" className="space-y-8">
          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="bg-slate-900/80 border-slate-500/30">
              <CardHeader>
                <CardTitle className="text-white">Primary Keywords Performance</CardTitle>
                <CardDescription>Current rankings and opportunities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {seoStrategy.primaryKeywords.map((keyword, index) => (
                    <div key={index} className="p-4 bg-slate-800/50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-white">{keyword.keyword}</span>
                        <Badge className={keyword.rank <= 5 ? 'bg-green-500/20 text-green-400' : 'bg-orange-500/20 text-orange-400'}>
                          Rank #{keyword.rank}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-slate-400">Search Volume: </span>
                          <span className="text-white">{keyword.volume.toLocaleString()}/mo</span>
                        </div>
                        <div>
                          <span className="text-slate-400">Difficulty: </span>
                          <span className="text-red-400">{keyword.difficulty}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/80 border-slate-500/30">
              <CardHeader>
                <CardTitle className="text-white">Content Gap Analysis</CardTitle>
                <CardDescription>High-opportunity topics to create content for</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {seoStrategy.contentGaps.map((gap, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg">
                      <Target className="w-4 h-4 text-purple-400" />
                      <span className="text-white">{gap}</span>
                      <Button size="sm" className="ml-auto bg-purple-600 hover:bg-purple-700">
                        Create Content
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-slate-900/80 border-slate-500/30">
            <CardHeader>
              <CardTitle className="text-white">Competitor Content Analysis</CardTitle>
              <CardDescription>Competitive positioning and differentiation opportunities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                {seoStrategy.competitorAnalysis.map((comp, index) => (
                  <div key={index} className="p-4 bg-slate-800/50 rounded-lg">
                    <h4 className="font-medium text-white mb-3">{comp.competitor}</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-green-400">Strength: </span>
                        <span className="text-slate-300">{comp.strength}</span>
                      </div>
                      <div>
                        <span className="text-blue-400">Our Opportunity: </span>
                        <span className="text-slate-300">{comp.opportunity}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Content Marketing ROI Dashboard</h3>
            <p className="text-slate-300 mb-8">Real-time performance metrics and attribution analysis</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-br from-green-600/20 to-blue-600/20 border-green-500/50">
              <CardContent className="text-center p-6">
                <TrendingUp className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <div className="text-3xl font-bold text-green-400 mb-2">432%</div>
                <div className="text-white font-medium mb-1">Content Marketing ROI</div>
                <div className="text-sm text-slate-300">$4.32 return per $1 invested</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border-purple-500/50">
              <CardContent className="text-center p-6">
                <Users className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <div className="text-3xl font-bold text-purple-400 mb-2">1,247</div>
                <div className="text-white font-medium mb-1">Marketing Qualified Leads</div>
                <div className="text-sm text-slate-300">23% month-over-month growth</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-600/20 to-red-600/20 border-orange-500/50">
              <CardContent className="text-center p-6">
                <Target className="w-12 h-12 text-orange-400 mx-auto mb-4" />
                <div className="text-3xl font-bold text-orange-400 mb-2">$3.2M</div>
                <div className="text-white font-medium mb-1">Attributed Pipeline</div>
                <div className="text-sm text-slate-300">From content marketing efforts</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentMarketing;