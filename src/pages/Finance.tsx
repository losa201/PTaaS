import { useState } from 'react';
import { Shield, TrendingUp, Clock, Users, CheckCircle, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProgressiveLeadCapture from '@/components/ProgressiveLeadCapture';

const Finance = () => {
  const [showLeadCapture, setShowLeadCapture] = useState(false);

  const financialThreats = [
    {
      threat: "Wire Fraud Attacks",
      frequency: "Daily",
      avgLoss: "$301K",
      icon: AlertTriangle,
      severity: "critical"
    },
    {
      threat: "Data Breaches",
      frequency: "Weekly",
      avgLoss: "$4.2M",
      icon: Shield,
      severity: "high"
    },
    {
      threat: "Ransomware",
      frequency: "Monthly", 
      avgLoss: "$1.85M",
      icon: Clock,
      severity: "critical"
    }
  ];

  const complianceFrameworks = [
    { name: "PCI DSS Level 1", description: "Payment card data protection" },
    { name: "SOC 2 Type II", description: "Security & availability controls" },
    { name: "ISO 27001", description: "Information security management" },
    { name: "FFIEC Guidelines", description: "Federal banking regulations" },
    { name: "SOX Compliance", description: "Financial reporting integrity" },
    { name: "GLBA", description: "Financial privacy protection" }
  ];

  const roiMetrics = [
    { metric: "Average Breach Cost Prevented", value: "$4.2M", change: "+23%" },
    { metric: "Compliance Audit Prep Time", value: "89% faster", change: "-156 hours" },
    { metric: "False Positive Reduction", value: "94%", change: "-2,847 alerts/month" },
    { metric: "Mean Time to Detection", value: "3.2 minutes", change: "vs 287 days industry avg" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <Badge className="mb-6 bg-red-500/20 text-red-300 border-red-500/30">
            Financial Services Under Attack
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-600 bg-clip-text text-transparent">
            Protect Your Financial Institution from 
            <span className="block text-red-400">$4.2M Average Breach Costs</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            AI-powered cybersecurity that thinks like attackers targeting banks, credit unions, and fintech companies. 
            Stop wire fraud, prevent data breaches, and maintain regulatory compliance automatically.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button 
              onClick={() => window.location.href = '/assessment?industry=finance'}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg rounded-xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
            >
              Get Financial Security Assessment
            </Button>
            <Button 
              variant="outline" 
              className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white px-8 py-4 text-lg rounded-xl"
              onClick={() => window.location.href = '/demo?industry=finance'}
            >
              Watch Live Demo
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-8 text-slate-400">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-400" />
              <span>Trusted by 15+ Fortune 500 Banks</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>99.97% Uptime SLA</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-green-400" />
              <span>$2.1B+ Assets Protected</span>
            </div>
          </div>
        </div>
      </section>

      {/* Threat Landscape */}
      <section className="py-20 px-4 bg-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-white">
              Financial Institutions Face Unprecedented Cyber Threats
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Banking and finance are the #1 target for cybercriminals. Traditional security can't keep up with AI-powered attacks.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {financialThreats.map((threat, index) => (
              <Card key={index} className="bg-slate-900/80 border-red-500/30 hover:border-red-400 transition-colors">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <threat.icon className={`w-8 h-8 ${threat.severity === 'critical' ? 'text-red-400' : 'text-orange-400'}`} />
                    <Badge variant={threat.severity === 'critical' ? 'destructive' : 'secondary'}>
                      {threat.frequency}
                    </Badge>
                  </div>
                  <CardTitle className="text-white">{threat.threat}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-400 mb-2">{threat.avgLoss}</div>
                  <CardDescription>Average loss per incident</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <p className="text-lg text-red-300 mb-4">
              <AlertTriangle className="w-5 h-5 inline mr-2" />
              78% of financial institutions experienced a cyber attack in the last 12 months
            </p>
            <p className="text-slate-400">
              Source: Deloitte Financial Services Cyber Survey 2024
            </p>
          </div>
        </div>
      </section>

      {/* ROI Metrics */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-white">
              Proven Results for Financial Institutions
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Our AI-powered platform delivers measurable security improvements and cost savings for banks and financial services.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {roiMetrics.map((metric, index) => (
              <Card key={index} className="bg-slate-900/80 border-green-500/30 text-center hover:border-green-400 transition-colors">
                <CardHeader>
                  <CardTitle className="text-3xl font-bold text-green-400 mb-2">
                    {metric.value}
                  </CardTitle>
                  <CardDescription className="text-white font-medium">
                    {metric.metric}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    {metric.change}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Section */}
      <section className="py-20 px-4 bg-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-white">
              Built for Financial Services Compliance
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Automatically maintain compliance with banking regulations and industry standards. 
              Reduce audit preparation time by 89% with continuous monitoring and reporting.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {complianceFrameworks.map((framework, index) => (
              <Card key={index} className="bg-slate-900/80 border-blue-500/30 hover:border-blue-400 transition-colors">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-green-400" />
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

          <div className="text-center mt-12">
            <Button 
              onClick={() => setShowLeadCapture(true)}
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-4 text-lg rounded-xl"
            >
              Download Compliance Checklist
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">
            Ready to Secure Your Financial Institution?
          </h2>
          <p className="text-xl text-slate-300 mb-12">
            Join 15+ Fortune 500 banks and credit unions protecting $2.1B+ in assets with VerteidIQ.
            Get your personalized security assessment in 60 seconds.
          </p>
          
          <Button 
            onClick={() => window.location.href = '/assessment?industry=finance'}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-6 text-xl rounded-xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
          >
            Start Financial Security Assessment
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

export default Finance;