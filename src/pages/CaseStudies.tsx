import { TrendingUp, Shield, Users, DollarSign, Clock, CheckCircle, ArrowRight, Quote } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const CaseStudies = () => {
  const caseStudies = [
    {
      id: 'global-bank',
      industry: 'Financial Services',
      company: 'Global Investment Bank',
      size: '50,000+ employees',
      challenge: 'Legacy security infrastructure couldn\'t keep up with sophisticated nation-state attacks targeting trading systems',
      solution: 'Deployed VerteidIQ\'s AI-powered threat detection with ultra-low latency financial market protection',
      results: {
        threatReduction: 94,
        costSavings: '$12.3M',
        responseTime: '2.1 seconds',
        compliance: '100%'
      },
      outcomes: [
        'Blocked 2,847 advanced persistent threats in first 90 days',
        'Reduced security incident response time by 89%',
        'Achieved continuous SOX and PCI DSS compliance',
        'Zero trading system downtime from security incidents'
      ],
      testimonial: {
        quote: "VerteidIQ transformed our cybersecurity posture from reactive to proactive. The AI-powered threat detection caught attacks our previous tools missed completely.",
        author: "Sarah Mitchell",
        title: "Chief Information Security Officer",
        company: "Global Investment Bank"
      },
      metrics: [
        { label: 'Threats Blocked', value: '2,847+', icon: Shield },
        { label: 'Cost Savings', value: '$12.3M', icon: DollarSign },
        { label: 'Response Time', value: '2.1s', icon: Clock },
        { label: 'Uptime', value: '99.99%', icon: TrendingUp }
      ]
    },
    {
      id: 'hospital-network',
      industry: 'Healthcare',
      company: 'Regional Hospital Network',
      size: '15,000+ employees, 8 facilities',
      challenge: 'Protecting patient data and medical devices while maintaining HIPAA compliance across multiple locations',
      solution: 'Implemented comprehensive healthcare security suite with medical device protection and automated compliance monitoring',
      results: {
        threatReduction: 97,
        costSavings: '$4.8M',
        responseTime: '1.3 seconds',
        compliance: '100%'
      },
      outcomes: [
        'Protected 2.3M patient records from breach attempts',
        'Secured 1,200+ medical devices without operational disruption',
        'Automated HIPAA compliance reporting reduced audit time by 78%',
        'Prevented ransomware attack on critical care systems'
      ],
      testimonial: {
        quote: "Patient safety is our top priority. VerteidIQ gives us the confidence that our medical devices and patient data are protected 24/7 without compromising care delivery.",
        author: "Dr. Michael Chen",
        title: "Chief Medical Information Officer",
        company: "Regional Hospital Network"
      },
      metrics: [
        { label: 'Patient Records Protected', value: '2.3M', icon: Users },
        { label: 'Medical Devices Secured', value: '1,200+', icon: Shield },
        { label: 'Audit Time Reduction', value: '78%', icon: Clock },
        { label: 'Compliance Score', value: '100%', icon: CheckCircle }
      ]
    },
    {
      id: 'manufacturing-corp',
      industry: 'Manufacturing',
      company: 'Industrial Manufacturing Corporation',
      size: '25,000+ employees, 12 facilities',
      challenge: 'Securing OT/IT convergence while protecting intellectual property and maintaining zero-downtime production',
      solution: 'Deployed industrial cybersecurity platform with OT monitoring, supply chain protection, and AI-powered anomaly detection',
      results: {
        threatReduction: 91,
        costSavings: '$8.7M',
        responseTime: '0.8 seconds',
        compliance: '100%'
      },
      outcomes: [
        'Prevented industrial espionage attempts on proprietary designs',
        'Maintained 100% production uptime during security deployments',
        'Secured 5,000+ IoT devices across manufacturing floor',
        'Reduced supply chain security incidents by 89%'
      ],
      testimonial: {
        quote: "VerteidIQ understands manufacturing environments. Their solution protects our operations without slowing down production - that's exactly what we needed.",
        author: "James Rodriguez",
        title: "VP of Operations Technology",
        company: "Industrial Manufacturing Corporation"
      },
      metrics: [
        { label: 'IoT Devices Secured', value: '5,000+', icon: Shield },
        { label: 'Production Uptime', value: '100%', icon: TrendingUp },
        { label: 'IP Protection', value: '100%', icon: CheckCircle },
        { label: 'Supply Chain Incidents', value: '-89%', icon: DollarSign }
      ]
    }
  ];

  const successStats = [
    { label: 'Average Threat Reduction', value: '94%', description: 'Across all customer deployments' },
    { label: 'Cumulative Cost Savings', value: '$125M+', description: 'Prevented breach costs and operational savings' },
    { label: 'Average Response Time', value: '< 2 seconds', description: 'From detection to automated response' },
    { label: 'Customer Satisfaction', value: '98%', description: 'Would recommend VerteidIQ to peers' }
  ];

  const implementationPhases = [
    {
      phase: 'Assessment & Planning',
      duration: '1-2 weeks',
      activities: ['Security posture assessment', 'Architecture planning', 'Integration mapping', 'Compliance requirements']
    },
    {
      phase: 'Deployment & Configuration',
      duration: '2-4 weeks',
      activities: ['Platform deployment', 'Policy configuration', 'Integration setup', 'Initial tuning']
    },
    {
      phase: 'Testing & Optimization',
      duration: '1-2 weeks',
      activities: ['Penetration testing', 'Performance optimization', 'Fine-tuning detection rules', 'User training']
    },
    {
      phase: 'Go-Live & Support',
      duration: 'Ongoing',
      activities: ['Full production deployment', '24/7 monitoring', 'Continuous optimization', 'Regular reviews']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Customer Success Stories
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            See how leading organizations across finance, healthcare, and manufacturing transformed 
            their cybersecurity posture with VerteidIQ's AI-powered platform.
          </p>
          
          {/* Success Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            {successStats.map((stat, index) => (
              <Card key={index} className="bg-slate-900/80 border-green-500/30 text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-green-400 mb-2">{stat.value}</div>
                  <div className="text-white font-medium mb-1">{stat.label}</div>
                  <div className="text-sm text-slate-400">{stat.description}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="global-bank" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-slate-800 mb-12">
              <TabsTrigger value="global-bank" className="data-[state=active]:bg-blue-500/20">
                Financial Services
              </TabsTrigger>
              <TabsTrigger value="hospital-network" className="data-[state=active]:bg-green-500/20">
                Healthcare
              </TabsTrigger>
              <TabsTrigger value="manufacturing-corp" className="data-[state=active]:bg-orange-500/20">
                Manufacturing
              </TabsTrigger>
            </TabsList>

            {caseStudies.map((study) => (
              <TabsContent key={study.id} value={study.id} className="space-y-8">
                {/* Study Overview */}
                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <Card className="bg-slate-900/80 border-slate-500/30 h-full">
                      <CardHeader>
                        <div className="flex items-center justify-between mb-4">
                          <Badge className="bg-green-500/20 text-green-400">{study.industry}</Badge>
                          <span className="text-slate-400 text-sm">{study.size}</span>
                        </div>
                        <CardTitle className="text-2xl text-white">{study.company}</CardTitle>
                        <CardDescription className="text-lg">{study.challenge}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium text-green-400 mb-2">Solution Deployed</h4>
                            <p className="text-slate-300">{study.solution}</p>
                          </div>
                          
                          <div>
                            <h4 className="font-medium text-green-400 mb-3">Key Outcomes</h4>
                            <div className="grid gap-2">
                              {study.outcomes.map((outcome, index) => (
                                <div key={index} className="flex items-start gap-2">
                                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                                  <span className="text-slate-300">{outcome}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="space-y-6">
                    <Card className="bg-slate-900/80 border-slate-500/30">
                      <CardHeader>
                        <CardTitle className="text-white">Results at a Glance</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                          {study.metrics.map((metric, index) => (
                            <div key={index} className="text-center">
                              <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-green-500/20 flex items-center justify-center">
                                <metric.icon className="w-6 h-6 text-green-400" />
                              </div>
                              <div className="text-xl font-bold text-green-400">{metric.value}</div>
                              <div className="text-sm text-slate-400">{metric.label}</div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Testimonial */}
                <Card className="bg-gradient-to-r from-green-600/10 to-blue-600/10 border-green-500/30">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4">
                      <Quote className="w-8 h-8 text-green-400 flex-shrink-0 mt-1" />
                      <div>
                        <blockquote className="text-xl text-white leading-relaxed mb-4">
                          "{study.testimonial.quote}"
                        </blockquote>
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                            <Users className="w-6 h-6 text-green-400" />
                          </div>
                          <div>
                            <div className="font-medium text-white">{study.testimonial.author}</div>
                            <div className="text-green-400 text-sm">{study.testimonial.title}</div>
                            <div className="text-slate-400 text-sm">{study.testimonial.company}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* CTA for this case study */}
                <div className="text-center">
                  <Button 
                    onClick={() => window.location.href = `/${study.industry.toLowerCase().replace(' services', '')}`}
                    className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                  >
                    Learn More About {study.industry} Solutions
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Implementation Process */}
      <section className="py-20 px-4 bg-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-white">Implementation Process</h2>
            <p className="text-xl text-slate-300">
              Our proven methodology ensures successful deployment and optimal results
            </p>
          </div>
          
          <div className="grid lg:grid-cols-4 gap-8">
            {implementationPhases.map((phase, index) => (
              <Card key={index} className="bg-slate-900/80 border-slate-500/30 relative">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                    <span className="text-green-400 font-bold">{index + 1}</span>
                  </div>
                  <CardTitle className="text-white">{phase.phase}</CardTitle>
                  <Badge className="bg-green-500/20 text-green-400 mx-auto">{phase.duration}</Badge>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {phase.activities.map((activity, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        {activity}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                {index < implementationPhases.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-green-400" />
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Calculator Preview */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-r from-green-600/20 to-blue-600/20 border-green-500/50">
            <CardContent className="p-8 text-center">
              <h3 className="text-3xl font-bold text-white mb-4">Calculate Your ROI</h3>
              <p className="text-xl text-slate-300 mb-6">
                See how much VerteidIQ can save your organization in breach prevention and operational efficiency.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">$4.2M</div>
                  <div className="text-slate-300">Average breach cost prevented</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">87%</div>
                  <div className="text-slate-300">Reduction in security incidents</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">6.2x</div>
                  <div className="text-slate-300">Average ROI in first year</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => window.location.href = '/assessment'}
                  className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-4 text-lg rounded-xl"
                >
                  Calculate Your Savings
                </Button>
                <Button 
                  variant="outline" 
                  className="border-green-400 text-green-400 hover:bg-green-400 hover:text-white px-8 py-4 text-lg rounded-xl"
                  onClick={() => window.location.href = '/demo'}
                >
                  See Platform Demo
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-slate-800/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">
            Ready to Join Our Success Stories?
          </h2>
          <p className="text-xl text-slate-300 mb-12">
            Transform your cybersecurity posture like hundreds of leading organizations worldwide. 
            Get a personalized assessment and see how VerteidIQ can protect your business.
          </p>
          
          <Button 
            onClick={() => window.location.href = '/assessment'}
            className="bg-gradient-to-r from-green-600 to-purple-600 hover:from-green-700 hover:to-purple-700 text-white px-12 py-6 text-xl rounded-xl shadow-2xl hover:shadow-green-500/25 transition-all duration-300 transform hover:scale-105"
          >
            Start Your Success Story
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CaseStudies;