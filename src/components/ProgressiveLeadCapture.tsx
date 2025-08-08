import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { trackFormStart, trackFormComplete, useAnalytics } from '@/components/AnalyticsTracker';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Shield, 
  Building, 
  Users, 
  Mail, 
  Phone, 
  CheckCircle,
  ArrowRight,
  Target,
  Clock,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';

interface ProgressiveLeadCaptureProps {
  variant?: 'hero' | 'modal' | 'inline';
  onComplete?: (data: LeadData) => void;
  onClose?: () => void;
}

interface LeadData {
  domain?: string;
  email?: string;
  companySize?: string;
  role?: string;
  phone?: string;
  challenges?: string[];
}

const ProgressiveLeadCapture = ({ variant = 'hero', onComplete }: ProgressiveLeadCaptureProps) => {
  const [step, setStep] = useState(1);
  const [leadData, setLeadData] = useState<LeadData>({});
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const analytics = useAnalytics();

  useEffect(() => {
    // Track form start
    trackFormStart('lead_capture');
    analytics.trackUserInteraction('lead_form_view', 'engagement', variant);
  }, [analytics, variant]);

  const companySizes = [
    { value: '1-50', label: '1-50 employees', risk: 'High' },
    { value: '51-200', label: '51-200 employees', risk: 'Medium-High' },
    { value: '201-1000', label: '201-1,000 employees', risk: 'Medium' },
    { value: '1001-5000', label: '1,001-5,000 employees', risk: 'Medium-Low' },
    { value: '5000+', label: '5,000+ employees', risk: 'Enterprise' }
  ];

  const roles = [
    { value: 'ciso', label: 'CISO/Security Director', priority: 'High' },
    { value: 'it-manager', label: 'IT Manager', priority: 'High' },
    { value: 'devops', label: 'DevOps Lead', priority: 'Medium' },
    { value: 'engineer', label: 'Security Engineer', priority: 'Medium' },
    { value: 'consultant', label: 'Security Consultant', priority: 'Medium' },
    { value: 'other', label: 'Other', priority: 'Low' }
  ];

  const securityChallenges = [
    'Compliance requirements (SOC2, ISO 27001, GDPR)',
    'Zero-day vulnerability detection',
    'False positive reduction',
    'Automated threat response',
    'Security team scaling',
    'DevOps integration'
  ];

  const handleDomainSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate domain analysis
    setTimeout(() => {
      setStep(2);
      setLoading(false);
    }, 2000);
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setStep(3);
      setLoading(false);
    }, 1500);
  };

  const handleQualificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      setCompleted(true);
      setLoading(false);
      
      // Track form completion
      trackFormComplete('lead_capture', {
        email: leadData.email,
        company_size: leadData.companySize,
        role: leadData.role,
        industry: 'general'
      });
      
      onComplete?.(leadData);
    }, 1000);
  };

  const getProgressPercentage = () => {
    switch (step) {
      case 1: return 25;
      case 2: return 50;
      case 3: return 75;
      default: return 100;
    }
  };

  if (completed) {
    return (
      <Card className="card-cyber p-8 max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mb-4">
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
          
          <h3 className="text-2xl font-bold text-foreground">Security Assessment Initiated!</h3>
          
          <div className="bg-primary/10 border border-primary/30 rounded-lg p-6">
            <h4 className="font-semibold text-foreground mb-3">Your Personalized Security Report Includes:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-primary" />
                <span>Vulnerability assessment</span>
              </div>
              <div className="flex items-center space-x-2">
                <Target className="h-4 w-4 text-primary" />
                <span>Risk prioritization</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span>Industry benchmarking</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-primary" />
                <span>Remediation timeline</span>
              </div>
            </div>
          </div>
          
          <p className="text-muted-foreground">
            A security expert will contact you within 24 hours with your detailed assessment and next steps.
          </p>
          
          <Button className="btn-cyber px-8 py-3">
            Access Security Dashboard
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </motion.div>
      </Card>
    );
  }

  return (
    <Card className="card-cyber p-6 max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground">Step {step} of 3</span>
          <span className="text-sm text-primary font-semibold">{getProgressPercentage()}% Complete</span>
        </div>
        <Progress value={getProgressPercentage()} className="h-2" />
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <form onSubmit={handleDomainSubmit} className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Get Instant Security Analysis
                </h3>
                <p className="text-muted-foreground">
                  Enter your domain to see vulnerabilities in under 60 seconds
                </p>
              </div>

              <div className="space-y-4">
                <Input
                  type="text"
                  placeholder="your-company.com"
                  value={leadData.domain || ''}
                  onChange={(e) => setLeadData({ ...leadData, domain: e.target.value })}
                  className="h-12 text-lg"
                  required
                />
                
                <Button 
                  type="submit" 
                  className="w-full btn-cyber h-12 text-lg" 
                  disabled={loading}
                >
                  {loading ? (
                    <>Analyzing Security Posture...</>
                  ) : (
                    <>
                      Analyze My Security
                      <Shield className="h-5 w-5 ml-2" />
                    </>
                  )}
                </Button>
              </div>

              <p className="text-xs text-center text-muted-foreground">
                No credit card required • Instant results • Enterprise-grade analysis
              </p>
            </form>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-orange-500/20 mb-4">
                <AlertTriangle className="h-6 w-6 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                We Found Security Vulnerabilities
              </h3>
              <p className="text-muted-foreground">
                Get your full security report and remediation plan
              </p>
            </div>

            {/* Mock Security Findings */}
            <div className="bg-background/50 rounded-lg p-4 mb-6 space-y-3">
              <div className="flex items-center justify-between p-2 bg-red-500/10 rounded border border-red-500/20">
                <span className="text-sm">Critical SSL/TLS Issues</span>
                <Badge className="bg-red-500/20 text-red-400">Critical</Badge>
              </div>
              <div className="flex items-center justify-between p-2 bg-orange-500/10 rounded border border-orange-500/20">
                <span className="text-sm">Outdated Security Headers</span>
                <Badge className="bg-orange-500/20 text-orange-400">High</Badge>
              </div>
              <div className="flex items-center justify-between p-2 bg-yellow-500/10 rounded border border-yellow-500/20">
                <span className="text-sm">Weak Password Policies</span>
                <Badge className="bg-yellow-500/20 text-yellow-400">Medium</Badge>
              </div>
            </div>

            <form onSubmit={handleContactSubmit} className="space-y-4">
              <Input
                type="email"
                placeholder="your.email@company.com"
                value={leadData.email || ''}
                onChange={(e) => setLeadData({ ...leadData, email: e.target.value })}
                className="h-12"
                required
              />
              
              <Button 
                type="submit" 
                className="w-full btn-cyber h-12" 
                disabled={loading}
              >
                {loading ? 'Generating Report...' : 'Get Full Security Report'}
              </Button>
            </form>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-foreground mb-2">
                Customize Your Security Strategy
              </h3>
              <p className="text-muted-foreground">
                Help us prioritize the most relevant security insights for your organization
              </p>
            </div>

            <form onSubmit={handleQualificationSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Company Size
                  </label>
                  <Select onValueChange={(value) => setLeadData({ ...leadData, companySize: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select company size" />
                    </SelectTrigger>
                    <SelectContent>
                      {companySizes.map((size) => (
                        <SelectItem key={size.value} value={size.value}>
                          <div className="flex items-center justify-between w-full">
                            <span>{size.label}</span>
                            <Badge className="ml-2 text-xs">{size.risk}</Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Your Role
                  </label>
                  <Select onValueChange={(value) => setLeadData({ ...leadData, role: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role.value} value={role.value}>
                          <div className="flex items-center justify-between w-full">
                            <span>{role.label}</span>
                            <Badge className="ml-2 text-xs">{role.priority}</Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Input
                  type="tel"
                  placeholder="Phone number (optional)"
                  value={leadData.phone || ''}
                  onChange={(e) => setLeadData({ ...leadData, phone: e.target.value })}
                  className="h-12"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full btn-cyber h-12" 
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Complete Security Assessment'}
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};

export default ProgressiveLeadCapture;