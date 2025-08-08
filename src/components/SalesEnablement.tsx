import { useState } from 'react';
import { FileText, Users, Target, TrendingUp, MessageCircle, PlayCircle, Download, Star, Clock, DollarSign } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

interface SalesAsset {
  id: string;
  title: string;
  type: 'deck' | 'battlecard' | 'case_study' | 'demo_script' | 'objection_handler' | 'roi_calculator';
  industry?: 'finance' | 'healthcare' | 'manufacturing' | 'general';
  stage: 'prospecting' | 'discovery' | 'demo' | 'proposal' | 'negotiation' | 'closing';
  usage: number;
  effectiveness: number;
  lastUpdated: Date;
  description: string;
}

interface SalesPlaybook {
  id: string;
  title: string;
  description: string;
  stages: {
    stage: string;
    duration: string;
    activities: string[];
    assets: string[];
    exitCriteria: string[];
  }[];
}

interface CompetitorBattlecard {
  competitor: string;
  strengths: string[];
  weaknesses: string[];
  positioning: string[];
  objections: {
    objection: string;
    response: string;
  }[];
  winRate: number;
}

const SalesEnablement = () => {
  const [activeTab, setActiveTab] = useState('assets');

  const salesAssets: SalesAsset[] = [
    {
      id: 'enterprise-deck',
      title: 'Enterprise Security Platform Overview',
      type: 'deck',
      industry: 'general',
      stage: 'demo',
      usage: 89,
      effectiveness: 94,
      lastUpdated: new Date('2025-01-15'),
      description: 'Comprehensive platform overview for C-level executives'
    },
    {
      id: 'finance-battlecard',
      title: 'Financial Services Battlecard',
      type: 'battlecard',
      industry: 'finance',
      stage: 'discovery',
      usage: 76,
      effectiveness: 87,
      lastUpdated: new Date('2025-01-20'),
      description: 'Industry-specific talking points and competitive positioning'
    },
    {
      id: 'roi-calculator',
      title: 'Cybersecurity ROI Calculator',
      type: 'roi_calculator',
      industry: 'general',
      stage: 'proposal',
      usage: 94,
      effectiveness: 91,
      lastUpdated: new Date('2025-01-18'),
      description: 'Interactive tool to demonstrate cost savings and ROI'
    },
    {
      id: 'healthcare-case-study',
      title: 'Regional Hospital Network Success Story',
      type: 'case_study',
      industry: 'healthcare',
      stage: 'demo',
      usage: 67,
      effectiveness: 89,
      lastUpdated: new Date('2025-01-12'),
      description: 'HIPAA compliance automation and patient data protection'
    }
  ];

  const salesPlaybook: SalesPlaybook = {
    id: 'enterprise-sales',
    title: 'Enterprise Cybersecurity Sales Playbook',
    description: 'Proven methodology for selling to enterprise CISOs and security teams',
    stages: [
      {
        stage: 'Prospecting',
        duration: '2-4 weeks',
        activities: [
          'Research target account and security posture',
          'Identify key stakeholders (CISO, CTO, Security Managers)',
          'Map current security stack and pain points',
          'Craft personalized outreach messaging'
        ],
        assets: ['Industry Research Report', 'Prospecting Email Templates', 'LinkedIn Outreach Scripts'],
        exitCriteria: ['Qualified opportunity identified', 'Initial meeting scheduled', 'BANT qualified']
      },
      {
        stage: 'Discovery',
        duration: '2-3 weeks',
        activities: [
          'Conduct security posture assessment',
          'Understand current challenges and initiatives',
          'Map technical requirements and evaluation criteria',
          'Identify decision-making process and timeline'
        ],
        assets: ['Discovery Question Framework', 'Industry Battlecards', 'Technical Assessment Tools'],
        exitCriteria: ['Pain points identified', 'Technical fit confirmed', 'Budget and timeline established']
      },
      {
        stage: 'Demo & Proof of Concept',
        duration: '3-4 weeks',
        activities: [
          'Deliver customized platform demonstration',
          'Configure proof of concept environment',
          'Facilitate technical evaluation and testing',
          'Address technical objections and concerns'
        ],
        assets: ['Demo Scripts', 'POC Setup Guide', 'Technical Objection Handlers'],
        exitCriteria: ['Successful POC completed', 'Technical validation achieved', 'Champion identified']
      },
      {
        stage: 'Proposal & Business Case',
        duration: '2-3 weeks',
        activities: [
          'Develop comprehensive security assessment',
          'Create ROI analysis and business case',
          'Present formal proposal and pricing',
          'Negotiate terms and implementation plan'
        ],
        assets: ['ROI Calculator', 'Proposal Templates', 'Implementation Plans'],
        exitCriteria: ['Proposal submitted', 'Business case approved', 'Contract negotiations initiated']
      },
      {
        stage: 'Closing & Contracting',
        duration: '2-4 weeks',
        activities: [
          'Finalize contract terms and conditions',
          'Address legal and procurement requirements',
          'Coordinate implementation planning',
          'Execute master service agreement'
        ],
        assets: ['Contract Templates', 'Legal Q&A', 'Implementation Roadmaps'],
        exitCriteria: ['Contract signed', 'Implementation scheduled', 'Customer success handoff completed']
      }
    ]
  };

  const battlecards: CompetitorBattlecard[] = [
    {
      competitor: 'CrowdStrike',
      strengths: ['Strong endpoint detection', 'Cloud-native architecture', 'Threat hunting capabilities'],
      weaknesses: ['Limited industry specialization', 'Complex pricing model', 'Heavy resource requirements'],
      positioning: [
        'Better AI automation and autonomous response',
        'Industry-specific compliance and workflows',
        'Lower total cost of ownership'
      ],
      objections: [
        {
          objection: 'CrowdStrike has more market share',
          response: 'Market share doesn\'t equal innovation. VerteidIQ\'s AI-powered autonomous response is 3 generations ahead of CrowdStrike\'s reactive approach.'
        },
        {
          objection: 'CrowdStrike integrates with our existing tools',
          response: 'VerteidIQ has 200+ integrations including all major SIEM, SOAR, and ITSM platforms. Plus, our API-first architecture makes integration easier than CrowdStrike.'
        }
      ],
      winRate: 68
    },
    {
      competitor: 'Palo Alto Networks',
      strengths: ['Comprehensive platform', 'Network security expertise', 'Brand recognition'],
      weaknesses: ['Complex architecture', 'High implementation costs', 'Limited AI capabilities'],
      positioning: [
        'Superior AI and machine learning capabilities',
        'Faster time to value and easier deployment',
        'Purpose-built for modern hybrid environments'
      ],
      objections: [
        {
          objection: 'Palo Alto has a complete security platform',
          response: 'Completeness doesn\'t equal effectiveness. VerteidIQ\'s AI detects 94% more threats with 87% fewer false positives than Palo Alto\'s signature-based approach.'
        }
      ],
      winRate: 72
    }
  ];

  const objectionHandlers = [
    {
      category: 'Budget & Pricing',
      objections: [
        {
          objection: 'Your solution is too expensive',
          response: 'I understand budget is a concern. Let me show you our ROI calculator - our customers typically see 4.2x ROI in year one through reduced incident response costs and prevented breaches. What would a single data breach cost your organization?'
        },
        {
          objection: 'We need to wait for next budget cycle',
          response: 'The cost of waiting could be significant. Cyber attacks don\'t wait for budget cycles. Can we explore a phased implementation that fits your current budget while providing immediate protection for your most critical assets?'
        }
      ]
    },
    {
      category: 'Competition',
      objections: [
        {
          objection: 'We\'re already evaluating [Competitor]',
          response: 'That\'s great - it shows you\'re taking security seriously. What specific criteria are most important in your evaluation? I\'d love to show you how VerteidIQ\'s AI-powered automation addresses those requirements differently.'
        }
      ]
    },
    {
      category: 'Technical Fit',
      objections: [
        {
          objection: 'We need to see how it works in our environment',
          response: 'Absolutely - that\'s why we offer a comprehensive proof of concept. We can deploy VerteidIQ in your environment within 48 hours and show you real threat detection results within the first week. When would be a good time to set that up?'
        }
      ]
    }
  ];

  const getEffectivenessColor = (score: number) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 80) return 'text-yellow-400';
    return 'text-orange-400';
  };

  const getAssetIcon = (type: string) => {
    switch (type) {
      case 'deck': return FileText;
      case 'battlecard': return Target;
      case 'case_study': return Users;
      case 'demo_script': return PlayCircle;
      case 'roi_calculator': return DollarSign;
      default: return FileText;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-4 text-white">Sales Enablement Hub</h2>
        <p className="text-xl text-slate-300 mb-8">
          Everything your sales team needs to win more deals faster
        </p>
      </div>

      {/* Sales Performance Overview */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="bg-slate-900/80 border-green-500/30">
          <CardContent className="text-center p-6">
            <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-400">73%</div>
            <div className="text-sm text-slate-400">Win Rate (Enterprise)</div>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-900/80 border-blue-500/30">
          <CardContent className="text-center p-6">
            <Clock className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-400">89 days</div>
            <div className="text-sm text-slate-400">Avg Sales Cycle</div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/80 border-purple-500/30">
          <CardContent className="text-center p-6">
            <DollarSign className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-400">$247K</div>
            <div className="text-sm text-slate-400">Avg Deal Size</div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/80 border-orange-500/30">
          <CardContent className="text-center p-6">
            <Star className="w-8 h-8 text-orange-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-400">4.8/5</div>
            <div className="text-sm text-slate-400">Customer Satisfaction</div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-slate-800">
          <TabsTrigger value="assets" className="data-[state=active]:bg-blue-500/20">
            Sales Assets
          </TabsTrigger>
          <TabsTrigger value="playbook" className="data-[state=active]:bg-green-500/20">
            Sales Playbook
          </TabsTrigger>
          <TabsTrigger value="battlecards" className="data-[state=active]:bg-red-500/20">
            Battlecards
          </TabsTrigger>
          <TabsTrigger value="objections" className="data-[state=active]:bg-purple-500/20">
            Objection Handling
          </TabsTrigger>
          <TabsTrigger value="training" className="data-[state=active]:bg-orange-500/20">
            Training
          </TabsTrigger>
        </TabsList>

        <TabsContent value="assets" className="space-y-6">
          <div className="grid gap-6">
            {salesAssets.map((asset) => {
              const IconComponent = getAssetIcon(asset.type);
              return (
                <Card key={asset.id} className="bg-slate-900/80 border-slate-500/30 hover:border-blue-400 transition-colors">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <IconComponent className="w-6 h-6 text-blue-400" />
                        <div>
                          <CardTitle className="text-white">{asset.title}</CardTitle>
                          <CardDescription>{asset.description}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-blue-500/20 text-blue-400">
                          {asset.type.replace('_', ' ').toUpperCase()}
                        </Badge>
                        {asset.industry && (
                          <Badge className="bg-green-500/20 text-green-400">
                            {asset.industry.toUpperCase()}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <div className="text-sm text-slate-400">Sales Stage</div>
                        <div className="text-white font-medium capitalize">{asset.stage}</div>
                      </div>
                      <div>
                        <div className="text-sm text-slate-400">Usage Rate</div>
                        <div className="text-blue-400 font-medium">{asset.usage}%</div>
                      </div>
                      <div>
                        <div className="text-sm text-slate-400">Effectiveness</div>
                        <div className={`font-medium ${getEffectivenessColor(asset.effectiveness)}`}>
                          {asset.effectiveness}%
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-slate-400">Last Updated</div>
                        <div className="text-white font-medium">
                          {asset.lastUpdated.toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                      <Button size="sm" variant="outline" className="border-slate-500 text-slate-300 hover:bg-slate-700">
                        <PlayCircle className="w-4 h-4 mr-2" />
                        Preview
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="playbook" className="space-y-8">
          <Card className="bg-slate-900/80 border-slate-500/30">
            <CardHeader>
              <CardTitle className="text-white">{salesPlaybook.title}</CardTitle>
              <CardDescription>{salesPlaybook.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {salesPlaybook.stages.map((stage, index) => (
                  <div key={index} className="relative">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-green-400 font-bold">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-xl font-bold text-white">{stage.stage}</h3>
                          <Badge className="bg-green-500/20 text-green-400">{stage.duration}</Badge>
                        </div>
                        
                        <div className="grid lg:grid-cols-3 gap-6">
                          <div>
                            <h4 className="font-medium text-green-400 mb-3">Key Activities</h4>
                            <ul className="space-y-2">
                              {stage.activities.map((activity, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
                                  {activity}
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="font-medium text-blue-400 mb-3">Required Assets</h4>
                            <ul className="space-y-2">
                              {stage.assets.map((asset, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                                  <FileText className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                                  {asset}
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="font-medium text-purple-400 mb-3">Exit Criteria</h4>
                            <ul className="space-y-2">
                              {stage.exitCriteria.map((criteria, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                                  <Target className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                                  {criteria}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    {index < salesPlaybook.stages.length - 1 && (
                      <div className="ml-4 w-0.5 h-8 bg-green-500/30 mt-4"></div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="battlecards" className="space-y-8">
          {battlecards.map((battlecard, index) => (
            <Card key={index} className="bg-slate-900/80 border-slate-500/30">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">vs. {battlecard.competitor}</CardTitle>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-400">Win Rate:</span>
                    <Badge className={battlecard.winRate >= 70 ? 'bg-green-500/20 text-green-400' : 'bg-orange-500/20 text-orange-400'}>
                      {battlecard.winRate}%
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium text-green-400 mb-3">Their Strengths</h4>
                      <ul className="space-y-2">
                        {battlecard.strengths.map((strength, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
                            {strength}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-red-400 mb-3">Their Weaknesses</h4>
                      <ul className="space-y-2">
                        {battlecard.weaknesses.map((weakness, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                            {weakness}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium text-blue-400 mb-3">Our Positioning</h4>
                      <ul className="space-y-2">
                        {battlecard.positioning.map((position, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                            <Target className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                            {position}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-purple-400 mb-3">Common Objections</h4>
                      <div className="space-y-3">
                        {battlecard.objections.map((obj, idx) => (
                          <div key={idx} className="p-3 bg-slate-800/50 rounded-lg">
                            <div className="font-medium text-slate-200 mb-1">{obj.objection}</div>
                            <div className="text-sm text-slate-400">{obj.response}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="objections" className="space-y-8">
          {objectionHandlers.map((category, index) => (
            <Card key={index} className="bg-slate-900/80 border-slate-500/30">
              <CardHeader>
                <CardTitle className="text-white">{category.category}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {category.objections.map((obj, idx) => (
                    <div key={idx} className="p-4 bg-slate-800/50 rounded-lg border-l-4 border-purple-500">
                      <div className="font-medium text-red-300 mb-2">
                        <MessageCircle className="w-4 h-4 inline mr-2" />
                        Objection: "{obj.objection}"
                      </div>
                      <div className="text-slate-300 pl-6">
                        <strong className="text-green-400">Response:</strong> {obj.response}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="training" className="space-y-8">
          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="bg-slate-900/80 border-slate-500/30">
              <CardHeader>
                <CardTitle className="text-white">Sales Training Modules</CardTitle>
                <CardDescription>Interactive training and certification programs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-slate-800/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-white">Cybersecurity Fundamentals</span>
                    <Badge className="bg-green-500/20 text-green-400">Completed</Badge>
                  </div>
                  <Progress value={100} className="mb-2" />
                  <div className="text-sm text-slate-400">Understanding the threat landscape and security challenges</div>
                </div>

                <div className="p-4 bg-slate-800/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-white">VerteidIQ Platform Deep Dive</span>
                    <Badge className="bg-yellow-500/20 text-yellow-400">In Progress</Badge>
                  </div>
                  <Progress value={67} className="mb-2" />
                  <div className="text-sm text-slate-400">Technical product knowledge and differentiation</div>
                </div>

                <div className="p-4 bg-slate-800/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-white">Industry-Specific Selling</span>
                    <Badge className="bg-slate-500/20 text-slate-400">Planned</Badge>
                  </div>
                  <Progress value={0} className="mb-2" />
                  <div className="text-sm text-slate-400">Finance, healthcare, and manufacturing verticals</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/80 border-slate-500/30">
              <CardHeader>
                <CardTitle className="text-white">Quick Reference</CardTitle>
                <CardDescription>Key talking points and competitive differentiators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-blue-400 mb-2">Key Value Props</h4>
                    <ul className="text-sm text-slate-300 space-y-1">
                      <li>• 94% threat detection improvement</li>
                      <li>• 87% reduction in false positives</li>
                      <li>• 4.2x ROI in first year</li>
                      <li>• 2-second average response time</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-green-400 mb-2">Competitive Advantages</h4>
                    <ul className="text-sm text-slate-300 space-y-1">
                      <li>• AI-powered autonomous response</li>
                      <li>• Industry-specific compliance automation</li>
                      <li>• 200+ native integrations</li>
                      <li>• Zero-downtime deployment</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SalesEnablement;