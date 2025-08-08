import { useState } from 'react';
import { Factory, Shield, Zap, AlertTriangle, CheckCircle, Settings, TrendingUp, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProgressiveLeadCapture from '@/components/ProgressiveLeadCapture';

const Manufacturing = () => {
  const [showLeadCapture, setShowLeadCapture] = useState(false);

  const industrialThreats = [
    {
      threat: "Nation-State Attacks",
      frequency: "Increasing 47% annually",
      impact: "Critical infrastructure targeted",
      icon: Globe,
      severity: "critical"
    },
    {
      threat: "Supply Chain Compromises",
      frequency: "Weekly incidents",
      impact: "$4.1M average disruption cost",
      icon: Factory,
      severity: "high"
    },
    {
      threat: "Industrial Espionage",
      frequency: "Daily attempts",
      impact: "IP theft & competitive loss",
      icon: Settings,
      severity: "critical"
    }
  ];

  const manufacturingMetrics = [
    { metric: "Zero-Downtime Protection", value: "99.99%", change: "Production uptime maintained" },
    { metric: "IP Theft Prevention", value: "100%", change: "Trade secrets protected" },
    { metric: "Supply Chain Security", value: "847 vendors", change: "Monitored & secured" },
    { metric: "OT/IT Integration", value: "15 seconds", change: "Threat detection speed" }
  ];

  const industrialAssets = [
    { asset: "SCADA Systems", risk: "Critical", protection: "Air-gapped monitoring" },
    { asset: "PLCs & Controllers", risk: "High", protection: "Behavior analysis" },
    { asset: "HMI Interfaces", risk: "Medium", protection: "Access control" },
    { asset: "Industrial IoT", risk: "Critical", protection: "Device fingerprinting" },
    { asset: "Manufacturing Execution", risk: "High", protection: "Process protection" },
    { asset: "Supply Chain Systems", risk: "Critical", protection: "Vendor monitoring" }
  ];

  const complianceFrameworks = [
    { name: "NIST Manufacturing", description: "Cybersecurity framework for manufacturing", icon: Shield },
    { name: "IEC 62443", description: "Industrial automation security standards", icon: Factory },
    { name: "ISO 27001", description: "Information security management", icon: CheckCircle },
    { name: "CISA Guidelines", description: "Critical infrastructure protection", icon: AlertTriangle },
    { name: "TSA Security", description: "Transportation security requirements", icon: Settings },
    { name: "Export Controls", description: "ITAR & EAR compliance", icon: Globe }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-orange-900 to-slate-900">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <Badge className="mb-6 bg-red-500/20 text-red-300 border-red-500/30">
            Industrial Infrastructure Under Attack
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-orange-400 via-red-400 to-yellow-400 bg-clip-text text-transparent">
            Secure Your Industrial IoT from
            <span className="block text-red-400">Nation-State Attacks</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Protect critical manufacturing operations with AI-powered cybersecurity designed for industrial environments. 
            Secure OT/IT convergence, prevent supply chain attacks, and maintain zero-downtime production.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button 
              onClick={() => window.location.href = '/assessment?industry=manufacturing'}
              className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-8 py-4 text-lg rounded-xl shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 transform hover:scale-105"
            >
              Get Industrial Security Assessment
            </Button>
            <Button 
              variant="outline" 
              className="border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white px-8 py-4 text-lg rounded-xl"
              onClick={() => window.location.href = '/demo?industry=manufacturing'}
            >
              Watch Live Demo
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-8 text-slate-400">
            <div className="flex items-center gap-2">
              <Factory className="w-5 h-5 text-orange-400" />
              <span>200+ Manufacturing Plants Protected</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-400" />
              <span>Zero Production Downtime</span>
            </div>
            <div className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-green-400" />
              <span>50,000+ OT Devices Secured</span>
            </div>
          </div>
        </div>
      </section>

      {/* Industrial Threat Landscape */}
      <section className="py-20 px-4 bg-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-white">
              Manufacturing Under Siege from Advanced Threats
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Industrial espionage, nation-state actors, and supply chain attacks target manufacturing's 
              critical infrastructure and valuable intellectual property.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {industrialThreats.map((threat, index) => (
              <Card key={index} className="bg-slate-900/80 border-red-500/30 hover:border-red-400 transition-colors">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <threat.icon className={`w-8 h-8 ${threat.severity === 'critical' ? 'text-red-400' : 'text-orange-400'}`} />
                    <Badge variant={threat.severity === 'critical' ? 'destructive' : 'secondary'}>
                      {threat.severity === 'critical' ? 'Critical' : 'High'}
                    </Badge>
                  </div>
                  <CardTitle className="text-white">{threat.threat}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-semibold text-red-300 mb-2">{threat.frequency}</div>
                  <CardDescription className="text-slate-300">{threat.impact}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center bg-red-500/10 border border-red-500/30 rounded-xl p-6">
            <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <p className="text-xl text-red-300 mb-2 font-semibold">
              68% of manufacturing companies experienced a cyber attack in the past year
            </p>
            <p className="text-slate-400">
              Source: Deloitte Manufacturing Cybersecurity Survey 2024
            </p>
          </div>
        </div>
      </section>

      {/* Industrial Asset Protection */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-white">
              Comprehensive OT/IT Security Coverage
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Protect every layer of your industrial infrastructure with AI-powered monitoring 
              that understands operational technology and manufacturing processes.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Critical Asset Protection</h3>
              <div className="space-y-4">
                {industrialAssets.map((asset, index) => (
                  <div key={index} className="flex items-center justify-between bg-slate-900/80 rounded-lg p-4 border border-orange-500/30">
                    <div className="flex items-center gap-3">
                      <Factory className="w-5 h-5 text-orange-400" />
                      <span className="text-white font-medium">{asset.asset}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={asset.risk === 'Critical' ? 'destructive' : asset.risk === 'High' ? 'secondary' : 'outline'}>
                        {asset.risk}
                      </Badge>
                      <span className="text-slate-400 text-sm">{asset.protection}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900/80 rounded-2xl p-8 border border-orange-500/30">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Manufacturing Security Metrics</h3>
              <div className="grid grid-cols-2 gap-6">
                {manufacturingMetrics.map((metric, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-orange-400 mb-1">{metric.value}</div>
                    <div className="text-sm text-white font-medium mb-2">{metric.metric}</div>
                    <Badge className="bg-green-500/20 text-green-300 border-green-500/30 text-xs">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {metric.change}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industrial Solutions */}
      <section className="py-20 px-4 bg-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-white">
              Purpose-Built for Manufacturing Environments
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Our industrial cybersecurity platform is designed specifically for manufacturing operations, 
              ensuring protection without disrupting production.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-slate-900/80 border-orange-500/30 hover:border-orange-400 transition-colors">
              <CardHeader className="text-center">
                <div className="bg-orange-500/20 p-4 rounded-xl w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Zap className="w-8 h-8 text-orange-400" />
                </div>
                <CardTitle className="text-white">Zero-Downtime Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-300 text-center">
                  Apply security patches and updates without stopping production lines or disrupting manufacturing processes.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/80 border-red-500/30 hover:border-red-400 transition-colors">
              <CardHeader className="text-center">
                <div className="bg-red-500/20 p-4 rounded-xl w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Globe className="w-8 h-8 text-red-400" />
                </div>
                <CardTitle className="text-white">Supply Chain Security</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-300 text-center">
                  Monitor and protect your entire supply chain ecosystem from vendors to distribution networks.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/80 border-yellow-500/30 hover:border-yellow-400 transition-colors">
              <CardHeader className="text-center">
                <div className="bg-yellow-500/20 p-4 rounded-xl w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Settings className="w-8 h-8 text-yellow-400" />
                </div>
                <CardTitle className="text-white">OT/IT Convergence</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-300 text-center">
                  Seamlessly secure the convergence of operational and information technology systems.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Compliance Standards */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-white">
              Manufacturing & Industrial Compliance
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Meet critical infrastructure protection requirements and industry-specific compliance standards.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {complianceFrameworks.map((framework, index) => (
              <Card key={index} className="bg-slate-900/80 border-orange-500/30 hover:border-orange-400 transition-colors">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <framework.icon className="w-6 h-6 text-orange-400" />
                    <CardTitle className="text-white">{framework.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-300">
                    {framework.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-slate-800/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">
            Protect Your Manufacturing Operations
          </h2>
          <p className="text-xl text-slate-300 mb-12">
            Join 200+ manufacturing companies protecting 50,000+ OT devices with VerteidIQ.
            Get your industrial security assessment and protect your critical infrastructure.
          </p>
          
          <Button 
            onClick={() => window.location.href = '/assessment?industry=manufacturing'}
            className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-12 py-6 text-xl rounded-xl shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 transform hover:scale-105"
          >
            Start Industrial Security Assessment
          </Button>
        </div>
      </section>

      <Footer />

      {/* Lead Capture Modal */}
      {showLeadCapture && (
        <ProgressiveLeadCapture onClose={() => setShowLeadCapture(false)} />
      )}
    </div>
  );
};

export default Manufacturing;