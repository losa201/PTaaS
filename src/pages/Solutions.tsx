import { Shield, Zap, Brain, Lock, Globe, Users, Database, Cloud, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Solutions = () => {
  const coreCapabilities = [
    {
      icon: Brain,
      title: 'AI-Powered Threat Detection',
      description: 'Advanced machine learning algorithms that learn from global threat patterns',
      features: ['Real-time behavioral analysis', 'Zero-day threat detection', 'False positive reduction', 'Predictive threat intelligence'],
      color: 'text-purple-400 bg-purple-500/20'
    },
    {
      icon: Zap,
      title: 'Autonomous Response',
      description: 'Automated incident response that acts faster than human analysts',
      features: ['Instant threat isolation', 'Automated forensics', 'Policy enforcement', 'Self-healing networks'],
      color: 'text-blue-400 bg-blue-500/20'
    },
    {
      icon: Shield,
      title: 'Zero-Trust Architecture',
      description: 'Comprehensive identity and access management with continuous verification',
      features: ['Identity verification', 'Least privilege access', 'Continuous monitoring', 'Micro-segmentation'],
      color: 'text-green-400 bg-green-500/20'
    },
    {
      icon: Globe,
      title: 'Cloud Security',
      description: 'Multi-cloud protection across AWS, Azure, GCP, and hybrid environments',
      features: ['Cloud workload protection', 'Container security', 'API protection', 'Serverless monitoring'],
      color: 'text-orange-400 bg-orange-500/20'
    }
  ];

  const industrySpecific = {
    finance: {
      title: 'Financial Services Security',
      description: 'Specialized protection for banks, credit unions, and fintech companies',
      icon: Database,
      solutions: [
        {
          name: 'Fraud Detection & Prevention',
          description: 'Real-time transaction monitoring and anomaly detection',
          benefits: ['99.8% fraud detection accuracy', '< 100ms transaction screening', 'Reduced false positives by 87%']
        },
        {
          name: 'Regulatory Compliance',
          description: 'Automated compliance monitoring for PCI DSS, SOX, GLBA',
          benefits: ['Continuous compliance monitoring', '89% faster audit preparation', 'Real-time violation alerts']
        },
        {
          name: 'Trading Floor Protection',
          description: 'Ultra-low latency security for high-frequency trading environments',
          benefits: ['< 10μs latency impact', 'Market data protection', 'Insider threat detection']
        }
      ]
    },
    healthcare: {
      title: 'Healthcare Security',
      description: 'HIPAA-compliant protection for patient data and medical devices',
      icon: Users,
      solutions: [
        {
          name: 'Medical Device Security',
          description: 'IoMT protection without disrupting patient care',
          benefits: ['Zero downtime deployments', '100% device visibility', 'FDA cybersecurity compliance']
        },
        {
          name: 'Patient Data Protection',
          description: 'End-to-end encryption and access control for PHI',
          benefits: ['HIPAA compliance automation', 'Data loss prevention', 'Audit trail generation']
        },
        {
          name: 'Telehealth Security',
          description: 'Secure remote patient monitoring and virtual consultations',
          benefits: ['Encrypted video sessions', 'Identity verification', 'Privacy controls']
        }
      ]
    },
    manufacturing: {
      title: 'Manufacturing & Industrial Security',
      description: 'OT/IT convergence protection for industrial environments',
      icon: Lock,
      solutions: [
        {
          name: 'Industrial Control Systems',
          description: 'SCADA and PLC protection with operational continuity',
          benefits: ['Zero production downtime', 'OT protocol monitoring', 'Safety system protection']
        },
        {
          name: 'Supply Chain Security',
          description: 'End-to-end supply chain risk management and monitoring',
          benefits: ['Vendor risk assessment', 'Third-party monitoring', 'Supply chain transparency']
        },
        {
          name: 'Smart Factory Protection',
          description: 'IoT device security and data integrity for Industry 4.0',
          benefits: ['Edge computing security', 'AI model protection', 'Predictive maintenance security']
        }
      ]
    }
  };

  const deploymentOptions = [
    {
      title: 'Cloud-Native SaaS',
      description: 'Fully managed security platform with zero infrastructure overhead',
      features: ['Instant deployment', 'Automatic updates', '99.99% uptime SLA', 'Global CDN'],
      bestFor: 'Small to medium businesses, rapid deployment needs'
    },
    {
      title: 'On-Premises',
      description: 'Complete control with dedicated hardware in your data center',
      features: ['Air-gapped deployment', 'Custom configurations', 'Regulatory compliance', 'Local data sovereignty'],
      bestFor: 'Large enterprises, regulated industries, high-security environments'
    },
    {
      title: 'Hybrid Architecture',
      description: 'Best of both worlds with cloud intelligence and on-premises control',
      features: ['Local processing', 'Cloud threat intelligence', 'Flexible scaling', 'Multi-site deployment'],
      bestFor: 'Global enterprises, complex infrastructure, mixed cloud environments'
    }
  ];

  const integrations = [
    { name: 'Microsoft Azure', category: 'Cloud Platform' },
    { name: 'Amazon AWS', category: 'Cloud Platform' },
    { name: 'Google Cloud', category: 'Cloud Platform' },
    { name: 'Splunk', category: 'SIEM' },
    { name: 'IBM QRadar', category: 'SIEM' },
    { name: 'Okta', category: 'Identity' },
    { name: 'Active Directory', category: 'Identity' },
    { name: 'ServiceNow', category: 'ITSM' },
    { name: 'Jira', category: 'Ticketing' },
    { name: 'Slack/Teams', category: 'Communication' },
    { name: 'Kubernetes', category: 'Container' },
    { name: 'Docker', category: 'Container' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-purple-400 via-blue-400 to-green-400 bg-clip-text text-transparent">
            Complete Cybersecurity Solutions
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Comprehensive AI-powered security platform designed for modern enterprises. 
            Protect, detect, and respond to cyber threats autonomously across your entire digital infrastructure.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button 
              onClick={() => window.location.href = '/demo'}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg rounded-xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105"
            >
              Watch Solutions Demo
            </Button>
            <Button 
              variant="outline" 
              className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-8 py-4 text-lg rounded-xl"
              onClick={() => window.location.href = '/assessment'}
            >
              Get Custom Solution
            </Button>
          </div>
        </div>
      </section>

      {/* Core Capabilities */}
      <section className="py-20 px-4 bg-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-white">Core Security Capabilities</h2>
            <p className="text-xl text-slate-300">
              Advanced AI-powered security technologies that work together to protect your organization
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {coreCapabilities.map((capability, index) => (
              <Card key={index} className="bg-slate-900/80 border-slate-500/30 hover:border-purple-400 transition-colors">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-lg ${capability.color} flex items-center justify-center`}>
                      <capability.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <CardTitle className="text-white">{capability.title}</CardTitle>
                      <CardDescription>{capability.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {capability.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-slate-300">
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Industry-Specific Solutions */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-white">Industry-Specific Solutions</h2>
            <p className="text-xl text-slate-300">
              Tailored security solutions designed for the unique challenges of your industry
            </p>
          </div>
          
          <Tabs defaultValue="finance" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-slate-800 mb-8">
              <TabsTrigger value="finance" className="data-[state=active]:bg-blue-500/20">
                Financial Services
              </TabsTrigger>
              <TabsTrigger value="healthcare" className="data-[state=active]:bg-green-500/20">
                Healthcare
              </TabsTrigger>
              <TabsTrigger value="manufacturing" className="data-[state=active]:bg-orange-500/20">
                Manufacturing
              </TabsTrigger>
            </TabsList>

            {Object.entries(industrySpecific).map(([key, industry]) => (
              <TabsContent key={key} value={key} className="space-y-8">
                <div className="text-center mb-12">
                  <div className="flex justify-center mb-4">
                    <industry.icon className="w-16 h-16 text-purple-400" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">{industry.title}</h3>
                  <p className="text-xl text-slate-300">{industry.description}</p>
                </div>
                
                <div className="grid lg:grid-cols-3 gap-8">
                  {industry.solutions.map((solution, index) => (
                    <Card key={index} className="bg-slate-900/80 border-slate-500/30 hover:border-purple-400 transition-colors">
                      <CardHeader>
                        <CardTitle className="text-white">{solution.name}</CardTitle>
                        <CardDescription>{solution.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {solution.benefits.map((benefit, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                              <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                              {benefit}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div className="text-center">
                  <Button 
                    onClick={() => window.location.href = `/${key}`}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    Learn More About {industry.title}
                  </Button>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Deployment Options */}
      <section className="py-20 px-4 bg-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-white">Flexible Deployment Options</h2>
            <p className="text-xl text-slate-300">
              Choose the deployment model that best fits your organization's needs and requirements
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {deploymentOptions.map((option, index) => (
              <Card key={index} className="bg-slate-900/80 border-slate-500/30 hover:border-purple-400 transition-colors">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <Cloud className="w-8 h-8 text-purple-400" />
                  </div>
                  <CardTitle className="text-white">{option.title}</CardTitle>
                  <CardDescription>{option.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-4">
                    {option.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-slate-300">
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-slate-600 pt-3">
                    <div className="text-sm text-slate-400 mb-1">Best for:</div>
                    <div className="text-sm text-purple-400 font-medium">{option.bestFor}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-white">Enterprise Integrations</h2>
            <p className="text-xl text-slate-300 mb-8">
              Seamlessly integrate with your existing security stack and enterprise tools
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {integrations.map((integration, index) => (
              <Card key={index} className="bg-slate-900/80 border-slate-500/30 hover:border-purple-400 transition-colors text-center p-4">
                <div className="text-white font-medium mb-1">{integration.name}</div>
                <Badge className="bg-purple-500/20 text-purple-400 text-xs">
                  {integration.category}
                </Badge>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-slate-400 mb-4">Need a custom integration?</p>
            <Button variant="outline" className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white">
              Contact Integration Team
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-slate-800/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">
            Ready to Secure Your Enterprise?
          </h2>
          <p className="text-xl text-slate-300 mb-12">
            Get a personalized security solution designed for your industry, infrastructure, and threat landscape.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => window.location.href = '/assessment'}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-12 py-6 text-xl rounded-xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105"
            >
              Get Custom Solution Assessment
            </Button>
            <Button 
              onClick={() => window.location.href = '/demo'}
              variant="outline" 
              className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-12 py-6 text-xl rounded-xl"
            >
              Watch Platform Demo
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Solutions;