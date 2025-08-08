import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  Users, 
  Target, 
  BarChart3, 
  PlayCircle, 
  PauseCircle,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

interface ABTest {
  id: string;
  name: string;
  description: string;
  status: 'draft' | 'running' | 'completed' | 'paused';
  startDate: Date;
  endDate?: Date;
  variants: {
    id: string;
    name: string;
    traffic: number;
    conversions: number;
    visitors: number;
    conversionRate: number;
    confidence: number;
    isControl: boolean;
  }[];
  metrics: {
    primaryMetric: string;
    secondaryMetrics: string[];
    significanceLevel: number;
    minimumDetectableEffect: number;
  };
  results?: {
    winner: string;
    improvement: number;
    confidence: number;
    recommendation: string;
  };
}

interface ABTestConfig {
  testType: 'hero_cta' | 'pricing_page' | 'demo_flow' | 'assessment_questions';
  industry?: 'finance' | 'healthcare' | 'manufacturing' | 'general';
  trafficSplit: number[];
  duration: number; // days
}

const ABTestingFramework = () => {
  const [activeTests, setActiveTests] = useState<ABTest[]>([]);
  const [completedTests, setCompletedTests] = useState<ABTest[]>([]);
  const [selectedTest, setSelectedTest] = useState<ABTest | null>(null);

  // Mock A/B tests data - in production this would come from analytics service
  const mockTests: ABTest[] = [
    {
      id: 'hero-cta-finance',
      name: 'Financial Services Hero CTA Test',
      description: 'Testing "Get Security Assessment" vs "Schedule CISO Demo" for finance landing page',
      status: 'running',
      startDate: new Date('2025-01-15'),
      variants: [
        {
          id: 'control',
          name: 'Get Security Assessment',
          traffic: 50,
          conversions: 127,
          visitors: 2340,
          conversionRate: 5.43,
          confidence: 89,
          isControl: true
        },
        {
          id: 'variant',
          name: 'Schedule CISO Demo',
          traffic: 50,
          conversions: 156,
          visitors: 2280,
          conversionRate: 6.84,
          confidence: 92,
          isControl: false
        }
      ],
      metrics: {
        primaryMetric: 'CTA Click Rate',
        secondaryMetrics: ['Time on Page', 'Bounce Rate', 'Form Completion'],
        significanceLevel: 95,
        minimumDetectableEffect: 10
      },
      results: {
        winner: 'variant',
        improvement: 25.9,
        confidence: 92,
        recommendation: 'Switch to "Schedule CISO Demo" CTA for 25.9% improvement'
      }
    },
    {
      id: 'assessment-flow',
      name: 'Security Assessment Question Flow',
      description: 'Testing 8 questions vs 5 questions in security assessment tool',
      status: 'running',
      startDate: new Date('2025-01-20'),
      variants: [
        {
          id: 'control',
          name: '8 Questions (Detailed)',
          traffic: 50,
          conversions: 89,
          visitors: 1560,
          conversionRate: 5.71,
          confidence: 78,
          isControl: true
        },
        {
          id: 'variant',
          name: '5 Questions (Quick)',
          traffic: 50,
          conversions: 112,
          visitors: 1420,
          conversionRate: 7.89,
          confidence: 85,
          isControl: false
        }
      ],
      metrics: {
        primaryMetric: 'Assessment Completion Rate',
        secondaryMetrics: ['Lead Quality Score', 'Sales Qualified Leads', 'Time to Complete'],
        significanceLevel: 90,
        minimumDetectableEffect: 15
      }
    },
    {
      id: 'pricing-healthcare',
      name: 'Healthcare Pricing Page Layout',
      description: 'Testing compliance-focused vs ROI-focused messaging for healthcare pricing',
      status: 'completed',
      startDate: new Date('2025-01-01'),
      endDate: new Date('2025-01-14'),
      variants: [
        {
          id: 'control',
          name: 'ROI-Focused Messaging',
          traffic: 50,
          conversions: 23,
          visitors: 890,
          conversionRate: 2.58,
          confidence: 95,
          isControl: true
        },
        {
          id: 'variant',
          name: 'Compliance-Focused',
          traffic: 50,
          conversions: 34,
          visitors: 856,
          conversionRate: 3.97,
          confidence: 96,
          isControl: false
        }
      ],
      metrics: {
        primaryMetric: 'Demo Request Rate',
        secondaryMetrics: ['Page Engagement', 'Trust Signals Interaction'],
        significanceLevel: 95,
        minimumDetectableEffect: 20
      },
      results: {
        winner: 'variant',
        improvement: 53.9,
        confidence: 96,
        recommendation: 'Implement compliance-focused messaging for healthcare segment'
      }
    }
  ];

  useEffect(() => {
    // Simulate loading tests
    const running = mockTests.filter(test => test.status === 'running');
    const completed = mockTests.filter(test => test.status === 'completed');
    
    setActiveTests(running);
    setCompletedTests(completed);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'text-green-400 bg-green-500/20';
      case 'completed': return 'text-blue-400 bg-blue-500/20';
      case 'paused': return 'text-yellow-400 bg-yellow-500/20';
      case 'draft': return 'text-slate-400 bg-slate-500/20';
      default: return 'text-slate-400 bg-slate-500/20';
    }
  };

  const getWinnerBadge = (variant: ABTest['variants'][0], results?: ABTest['results']) => {
    if (!results) return null;
    if (results.winner === variant.id) {
      return <Badge className="bg-green-500/20 text-green-400 ml-2">Winner</Badge>;
    }
    return null;
  };

  const calculateStatisticalSignificance = (control: number, variant: number) => {
    // Simplified z-score calculation for demo purposes
    const pooledRate = (control + variant) / 2;
    const se = Math.sqrt(2 * pooledRate * (1 - pooledRate) / 1000); // assuming sample size
    const zScore = Math.abs(variant - control) / se;
    return Math.min(99, Math.round((1 - 2 * (1 - 0.8413)) * 100)); // simplified confidence
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-4 text-white">A/B Testing Framework</h2>
        <p className="text-xl text-slate-300 mb-8">
          Optimize conversion rates through data-driven experimentation
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="bg-slate-900/80 border-green-500/30">
          <CardContent className="text-center p-6">
            <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-400">+27.3%</div>
            <div className="text-sm text-slate-400">Avg Conversion Lift</div>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-900/80 border-blue-500/30">
          <CardContent className="text-center p-6">
            <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-400">{activeTests.length}</div>
            <div className="text-sm text-slate-400">Active Tests</div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/80 border-purple-500/30">
          <CardContent className="text-center p-6">
            <Target className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-400">{completedTests.length}</div>
            <div className="text-sm text-slate-400">Completed Tests</div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/80 border-orange-500/30">
          <CardContent className="text-center p-6">
            <BarChart3 className="w-8 h-8 text-orange-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-400">94.2%</div>
            <div className="text-sm text-slate-400">Avg Confidence</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-slate-800">
          <TabsTrigger value="active" className="data-[state=active]:bg-green-500/20">
            Active Tests ({activeTests.length})
          </TabsTrigger>
          <TabsTrigger value="completed" className="data-[state=active]:bg-blue-500/20">
            Completed Tests ({completedTests.length})
          </TabsTrigger>
          <TabsTrigger value="insights" className="data-[state=active]:bg-purple-500/20">
            Insights & Recommendations
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-6">
          {activeTests.map((test) => (
            <Card key={test.id} className="bg-slate-900/80 border-slate-500/30">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">{test.name}</CardTitle>
                    <CardDescription>{test.description}</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(test.status)}>
                      {test.status.toUpperCase()}
                    </Badge>
                    <Button size="sm" variant="outline">
                      <PauseCircle className="w-4 h-4 mr-1" />
                      Pause
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid lg:grid-cols-2 gap-6">
                  {test.variants.map((variant) => (
                    <div key={variant.id} className="bg-slate-800/50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-white flex items-center">
                          {variant.name}
                          {variant.isControl && <Badge className="ml-2 bg-slate-500/20 text-slate-400">Control</Badge>}
                          {getWinnerBadge(variant, test.results)}
                        </h4>
                        <div className="text-sm text-slate-400">{variant.traffic}% traffic</div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Visitors:</span>
                          <span className="text-white">{variant.visitors.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Conversions:</span>
                          <span className="text-white">{variant.conversions}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Conversion Rate:</span>
                          <span className="text-green-400 font-medium">{variant.conversionRate}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Confidence:</span>
                          <span className={variant.confidence >= 95 ? 'text-green-400' : 'text-yellow-400'}>
                            {variant.confidence}%
                          </span>
                        </div>
                        <Progress value={variant.confidence} className="mt-2" />
                      </div>
                    </div>
                  ))}
                </div>

                {test.results && (
                  <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="font-medium text-green-400">Test Results Available</span>
                    </div>
                    <div className="text-white mb-1">
                      <strong>Winner:</strong> {test.variants.find(v => v.id === test.results!.winner)?.name}
                    </div>
                    <div className="text-slate-300 mb-1">
                      <strong>Improvement:</strong> +{test.results.improvement}% conversion rate
                    </div>
                    <div className="text-slate-300 mb-2">
                      <strong>Confidence:</strong> {test.results.confidence}%
                    </div>
                    <div className="text-blue-400">
                      💡 <strong>Recommendation:</strong> {test.results.recommendation}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="completed" className="space-y-6">
          {completedTests.map((test) => (
            <Card key={test.id} className="bg-slate-900/80 border-slate-500/30">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">{test.name}</CardTitle>
                    <CardDescription>{test.description}</CardDescription>
                  </div>
                  <Badge className={getStatusColor(test.status)}>
                    COMPLETED
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid lg:grid-cols-2 gap-6 mb-6">
                  {test.variants.map((variant) => (
                    <div key={variant.id} className="bg-slate-800/50 p-4 rounded-lg">
                      <h4 className="font-medium text-white mb-3 flex items-center">
                        {variant.name}
                        {variant.isControl && <Badge className="ml-2 bg-slate-500/20 text-slate-400">Control</Badge>}
                        {getWinnerBadge(variant, test.results)}
                      </h4>
                      <div className="text-2xl font-bold text-green-400 mb-1">
                        {variant.conversionRate}%
                      </div>
                      <div className="text-sm text-slate-400">
                        {variant.conversions} / {variant.visitors.toLocaleString()} conversions
                      </div>
                    </div>
                  ))}
                </div>

                {test.results && (
                  <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <h4 className="font-medium text-blue-400 mb-2">Final Results</h4>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="text-slate-400">Winner</div>
                        <div className="text-white font-medium">
                          {test.variants.find(v => v.id === test.results!.winner)?.name}
                        </div>
                      </div>
                      <div>
                        <div className="text-slate-400">Improvement</div>
                        <div className="text-green-400 font-medium">+{test.results.improvement}%</div>
                      </div>
                      <div>
                        <div className="text-slate-400">Confidence</div>
                        <div className="text-blue-400 font-medium">{test.results.confidence}%</div>
                      </div>
                    </div>
                    <div className="mt-3 text-slate-300">
                      <strong>Implementation:</strong> {test.results.recommendation}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="bg-slate-900/80 border-green-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  Top Performing Variants
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-green-500/10 rounded-lg">
                  <div className="font-medium text-green-400">Schedule CISO Demo CTA</div>
                  <div className="text-sm text-slate-300">+25.9% conversion improvement for finance segment</div>
                </div>
                <div className="p-3 bg-green-500/10 rounded-lg">
                  <div className="font-medium text-green-400">5-Question Assessment</div>
                  <div className="text-sm text-slate-300">+38.2% completion rate vs 8-question version</div>
                </div>
                <div className="p-3 bg-green-500/10 rounded-lg">
                  <div className="font-medium text-green-400">Compliance-Focused Messaging</div>
                  <div className="text-sm text-slate-300">+53.9% demo requests for healthcare segment</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/80 border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-400" />
                  Recommended Tests
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/30">
                  <div className="font-medium text-blue-400">Manufacturing Demo Flow</div>
                  <div className="text-sm text-slate-300 mb-2">Test OT-focused vs IT-focused demo scenarios</div>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <PlayCircle className="w-4 h-4 mr-1" />
                    Start Test
                  </Button>
                </div>
                <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/30">
                  <div className="font-medium text-blue-400">Pricing Page Layout</div>
                  <div className="text-sm text-slate-300 mb-2">Test feature comparison vs ROI calculator prominence</div>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <PlayCircle className="w-4 h-4 mr-1" />
                    Start Test
                  </Button>
                </div>
                <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/30">
                  <div className="font-medium text-blue-400">Social Proof Placement</div>
                  <div className="text-sm text-slate-300 mb-2">Test customer logos above vs below hero section</div>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <PlayCircle className="w-4 h-4 mr-1" />
                    Start Test
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Best Practices */}
          <Card className="bg-slate-900/80 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-white">A/B Testing Best Practices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-medium text-purple-400">Test Design</h4>
                  <ul className="space-y-2 text-slate-300 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      Test one element at a time for clear results
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      Run tests for minimum 2 weeks for statistical significance
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      Use 95% confidence level for business decisions
                    </li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium text-purple-400">Industry Insights</h4>
                  <ul className="space-y-2 text-slate-300 text-sm">
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      Finance: Compliance messaging outperforms ROI by 23%
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      Healthcare: Trust signals increase conversions 34%
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      Manufacturing: Demo videos boost engagement 47%
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ABTestingFramework;