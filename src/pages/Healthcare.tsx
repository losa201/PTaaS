import { useState } from 'react';
import { Shield, Heart, Lock, AlertTriangle, CheckCircle, Users, TrendingUp, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProgressiveLeadCapture from '@/components/ProgressiveLeadCapture';

const Healthcare = () => {
  const [showLeadCapture, setShowLeadCapture] = useState(false);

  const healthcareThreats = [
    {
      threat: "Ransomware Attacks",
      frequency: "Every 11 seconds",
      impact: "78% of healthcare targeted",
      icon: Lock,
      severity: "critical"
    },
    {
      threat: "HIPAA Violations",
      frequency: "Daily breaches",
      impact: "$2.3M average fine",
      icon: AlertTriangle,
      severity: "high"
    },
    {
      threat: "Medical Device Hacks",
      frequency: "Growing exponentially",
      impact: "Patient safety risk",
      icon: Heart,
      severity: "critical"
    }
  ];

  const healthcareMetrics = [
    { metric: "HIPAA Compliance Score", value: "99.7%", change: "+47% improvement" },
    { metric: "Medical Device Security", value: "100% coverage", change: "All IoMT devices protected" },
    { metric: "Breach Prevention", value: "$4.88M saved", change: "Avg healthcare breach cost" },
    { metric: "Patient Trust Score", value: "94%", change: "+28% patient confidence" }
  ];

  const complianceStandards = [
    { name: "HIPAA", description: "Healthcare data privacy & security", icon: Shield },
    { name: "HITECH", description: "Health information technology standards", icon: Lock },
    { name: "FDA Guidelines", description: "Medical device cybersecurity", icon: Heart },
    { name: "SOC 2 Type II", description: "Security & availability controls", icon: CheckCircle },
    { name: "ISO 27001", description: "Information security management", icon: Shield },
    { name: "NIST CSF", description: "Cybersecurity framework", icon: Lock }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-900 to-slate-900">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <Badge className="mb-6 bg-red-500/20 text-red-300 border-red-500/30">
            Healthcare Under Siege
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-teal-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            HIPAA-Compliant Security That
            <span className="block text-red-400">Prevents Patient Data Breaches</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Protect patient lives and privacy with AI-powered cybersecurity designed for healthcare. 
            Stop ransomware, secure medical devices, and maintain HIPAA compliance automatically.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button 
              onClick={() => window.location.href = '/assessment?industry=healthcare'}
              className="bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white px-8 py-4 text-lg rounded-xl shadow-2xl hover:shadow-teal-500/25 transition-all duration-300 transform hover:scale-105"
            >
              Get HIPAA Security Assessment
            </Button>
            <Button 
              variant="outline" 
              className="border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-white px-8 py-4 text-lg rounded-xl"
              onClick={() => window.location.href = '/demo?industry=healthcare'}
            >
              Watch Live Demo
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-8 text-slate-400">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-400" />
              <span>Protecting 2.5M+ Patient Records</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-400" />
              <span>Zero HIPAA Violations</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-green-400" />
              <span>Trusted by 50+ Hospitals</span>
            </div>
          </div>
        </div>
      </section>

      {/* Healthcare Threat Landscape */}
      <section className="py-20 px-4 bg-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-white">
              Healthcare is the #1 Target for Cybercriminals
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Patient data is 50x more valuable than credit card data on the dark web. 
              Healthcare organizations face unique challenges protecting lives and privacy.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {healthcareThreats.map((threat, index) => (
              <Card key={index} className="bg-slate-900/80 border-red-500/30 hover:border-red-400 transition-colors">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <threat.icon className={`w-8 h-8 ${threat.severity === 'critical' ? 'text-red-400' : 'text-orange-400'}`} />
                    <Badge variant={threat.severity === 'critical' ? 'destructive' : 'secondary'}>
                      Critical
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
              Healthcare breaches cost $4.88M on average - 88% more than other industries
            </p>
            <p className="text-slate-400">
              Source: IBM Cost of a Data Breach Report 2024
            </p>
          </div>
        </div>
      </section>

      {/* Healthcare-Specific Solutions */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-white">
              Built Specifically for Healthcare Security
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Our AI platform understands the unique challenges of healthcare environments and provides targeted protection.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-teal-500/20 p-3 rounded-xl">
                  <Heart className="w-6 h-6 text-teal-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Medical Device Security</h3>
                  <p className="text-slate-300">Protect IoMT devices, infusion pumps, and patient monitors from cyber attacks without disrupting patient care.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-blue-500/20 p-3 rounded-xl">
                  <Lock className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">EHR Protection</h3>
                  <p className="text-slate-300">Secure electronic health records with AI-powered threat detection and automated HIPAA compliance monitoring.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-purple-500/20 p-3 rounded-xl">
                  <Shield className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Ransomware Prevention</h3>
                  <p className="text-slate-300">Stop ransomware before it can encrypt critical patient data or disrupt life-saving medical equipment.</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/80 rounded-2xl p-8 border border-teal-500/30">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Healthcare Protection Metrics</h3>
              <div className="grid grid-cols-2 gap-6">
                {healthcareMetrics.map((metric, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-teal-400 mb-1">{metric.value}</div>
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

      {/* HIPAA Compliance */}
      <section className="py-20 px-4 bg-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-white">
              Automated HIPAA & Healthcare Compliance
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Maintain continuous compliance with healthcare regulations. 
              Reduce audit preparation time and eliminate compliance gaps with automated monitoring.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {complianceStandards.map((standard, index) => (
              <Card key={index} className="bg-slate-900/80 border-teal-500/30 hover:border-teal-400 transition-colors">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <standard.icon className="w-6 h-6 text-teal-400" />
                    <CardTitle className="text-white">{standard.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-300">
                    {standard.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 max-w-2xl mx-auto mb-8">
              <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-green-400 mb-2">99.7% HIPAA Compliance Score</h3>
              <p className="text-slate-300">
                Our customers maintain industry-leading compliance scores with automated monitoring and reporting.
              </p>
            </div>
            
            <Button 
              onClick={() => setShowLeadCapture(true)}
              className="bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white px-8 py-4 text-lg rounded-xl"
            >
              Download HIPAA Compliance Guide
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">
            Protect Patients. Secure Data. Maintain Trust.
          </h2>
          <p className="text-xl text-slate-300 mb-12">
            Join 50+ hospitals and healthcare organizations protecting 2.5M+ patient records with VerteidIQ.
            Get your HIPAA security assessment in 60 seconds.
          </p>
          
          <Button 
            onClick={() => window.location.href = '/assessment?industry=healthcare'}
            className="bg-gradient-to-r from-teal-600 to-purple-600 hover:from-teal-700 hover:to-purple-700 text-white px-12 py-6 text-xl rounded-xl shadow-2xl hover:shadow-teal-500/25 transition-all duration-300 transform hover:scale-105"
          >
            Start Healthcare Security Assessment
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

export default Healthcare;