import { Shield, Users, Award, Target, Globe, Zap, Brain, Lock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const About = () => {
  const stats = [
    { icon: Users, label: 'Enterprise Customers', value: '500+', description: 'Fortune 500 companies trust us' },
    { icon: Shield, label: 'Threats Blocked Daily', value: '2.3M+', description: 'AI-powered threat prevention' },
    { icon: Globe, label: 'Countries Served', value: '45+', description: 'Global security coverage' },
    { icon: Award, label: 'Security Certifications', value: '12+', description: 'Industry-leading compliance' }
  ];

  const leadership = [
    {
      name: 'Sarah Chen',
      role: 'CEO & Co-Founder',
      background: 'Former CISO at Goldman Sachs, 15+ years cybersecurity experience',
      expertise: 'Financial Services Security, Regulatory Compliance'
    },
    {
      name: 'Dr. Marcus Rodriguez',
      role: 'CTO & Co-Founder', 
      background: 'Former Lead Security Architect at Microsoft, AI/ML researcher',
      expertise: 'AI/ML Security, Threat Detection Algorithms'
    },
    {
      name: 'Jennifer Walsh',
      role: 'VP of Engineering',
      background: 'Former Principal Engineer at CloudFlare, scaled security platforms',
      expertise: 'Platform Architecture, DevSecOps'
    }
  ];

  const timeline = [
    {
      year: '2019',
      milestone: 'Company Founded',
      description: 'VerteidIQ founded by cybersecurity veterans from Goldman Sachs and Microsoft'
    },
    {
      year: '2020', 
      milestone: 'AI Engine Launch',
      description: 'Launched first AI-powered threat detection engine with 99.7% accuracy'
    },
    {
      year: '2021',
      milestone: 'Enterprise Expansion', 
      description: 'Secured first Fortune 100 customers, expanded to healthcare and finance'
    },
    {
      year: '2022',
      milestone: 'Global Reach',
      description: 'International expansion across 45 countries, 100+ enterprise customers'
    },
    {
      year: '2023',
      milestone: 'PTaaS Platform',
      description: 'Launched comprehensive Penetration Testing as a Service platform'
    },
    {
      year: '2024',
      milestone: 'Industry Leadership',
      description: 'Recognized as Gartner Magic Quadrant Leader in cybersecurity'
    }
  ];

  const values = [
    {
      icon: Shield,
      title: 'Security First',
      description: 'Every decision is guided by our commitment to protecting our customers\' most valuable assets.',
      color: 'text-blue-400 bg-blue-500/20'
    },
    {
      icon: Brain,
      title: 'AI Innovation',
      description: 'We leverage cutting-edge artificial intelligence to stay ahead of evolving cyber threats.',
      color: 'text-purple-400 bg-purple-500/20'
    },
    {
      icon: Users,
      title: 'Customer Success',
      description: 'Our customers\' security outcomes drive everything we do, from product development to support.',
      color: 'text-green-400 bg-green-500/20'
    },
    {
      icon: Target,
      title: 'Excellence',
      description: 'We maintain the highest standards in security research, product quality, and service delivery.',
      color: 'text-orange-400 bg-orange-500/20'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-600 bg-clip-text text-transparent">
            Defending the Digital Frontier
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Founded by cybersecurity veterans from Goldman Sachs and Microsoft, VerteidIQ pioneered AI-powered 
            autonomous cybersecurity to protect the world's most critical digital infrastructure.
          </p>
          
          <div className="grid md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-slate-900/80 border-blue-500/30 text-center hover:border-blue-400 transition-colors">
                <CardContent className="p-6">
                  <stat.icon className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-blue-400 font-medium mb-1">{stat.label}</div>
                  <div className="text-sm text-slate-400">{stat.description}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 px-4 bg-slate-800/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 text-white">Our Mission</h2>
          <div className="text-2xl text-slate-300 leading-relaxed mb-8 font-light">
            "To democratize enterprise-grade cybersecurity through autonomous AI, 
            making advanced threat protection accessible to organizations of all sizes 
            while staying ahead of tomorrow's cyber threats today."
          </div>
          <div className="flex items-center justify-center gap-4 text-slate-400">
            <div className="w-12 h-0.5 bg-blue-500"></div>
            <span className="text-blue-400 font-medium">VerteidIQ Leadership Team</span>
            <div className="w-12 h-0.5 bg-blue-500"></div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-white">Leadership Team</h2>
            <p className="text-xl text-slate-300">
              Industry veterans with decades of cybersecurity expertise from leading financial institutions and tech companies
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {leadership.map((leader, index) => (
              <Card key={index} className="bg-slate-900/80 border-slate-500/30 hover:border-blue-400 transition-colors">
                <CardHeader className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <Users className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-white">{leader.name}</CardTitle>
                  <Badge className="bg-blue-500/20 text-blue-400 mx-auto">{leader.role}</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300 mb-3 text-sm">{leader.background}</p>
                  <div className="text-blue-400 text-xs font-medium">
                    <strong>Expertise:</strong> {leader.expertise}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="py-20 px-4 bg-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-white">Our Journey</h2>
            <p className="text-xl text-slate-300">
              From startup to industry leader - transforming cybersecurity through innovation
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-blue-500/30"></div>
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                    <Card className="bg-slate-900/80 border-blue-500/30">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <Badge className="bg-blue-500/20 text-blue-400">{item.year}</Badge>
                          <CardTitle className="text-white text-lg">{item.milestone}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-slate-300">{item.description}</CardDescription>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="relative flex items-center justify-center w-8 h-8 bg-blue-500 rounded-full border-4 border-slate-900 z-10">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-white">Our Core Values</h2>
            <p className="text-xl text-slate-300">
              The principles that guide everything we do at VerteidIQ
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="bg-slate-900/80 border-slate-500/30 hover:border-blue-400 transition-colors text-center">
                <CardHeader>
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${value.color} flex items-center justify-center`}>
                    <value.icon className="w-8 h-8" />
                  </div>
                  <CardTitle className="text-white">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-300">{value.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications & Awards */}
      <section className="py-20 px-4 bg-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-white">Industry Recognition</h2>
            <p className="text-xl text-slate-300">
              Trusted by industry leaders and recognized by top analysts
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-slate-900/80 border-yellow-500/30 text-center">
              <CardHeader>
                <Award className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <CardTitle className="text-white">Gartner Magic Quadrant</CardTitle>
                <CardDescription>Leader in Enterprise Security Platforms 2024</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="bg-slate-900/80 border-green-500/30 text-center">
              <CardHeader>
                <Shield className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <CardTitle className="text-white">SOC 2 Type II</CardTitle>
                <CardDescription>Certified for security and availability controls</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="bg-slate-900/80 border-blue-500/30 text-center">
              <CardHeader>
                <Lock className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <CardTitle className="text-white">ISO 27001</CardTitle>
                <CardDescription>International information security standard</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">
            Ready to Transform Your Security?
          </h2>
          <p className="text-xl text-slate-300 mb-12">
            Join 500+ enterprise customers who trust VerteidIQ to protect their most critical assets.
            Experience the future of cybersecurity today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => window.location.href = '/demo'}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg rounded-xl"
            >
              Watch Live Demo
            </Button>
            <Button 
              onClick={() => window.location.href = '/assessment'}
              variant="outline" 
              className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white px-8 py-4 text-lg rounded-xl"
            >
              Get Security Assessment
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;