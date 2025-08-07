import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Shield, 
  Target,
  Zap,
  ExternalLink,
  Play,
  Pause
} from 'lucide-react';

interface DemoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const DemoModal = ({ open, onOpenChange }: DemoModalProps) => {
  const [scanProgress, setScanProgress] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const startDemo = () => {
    setIsScanning(true);
    setScanProgress(0);
    setShowResults(false);
    
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          setShowResults(true);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const mockFindings = [
    {
      severity: 'critical',
      title: 'SQL Injection Vulnerability',
      description: 'Input validation bypass in login form',
      impact: 'Database access compromise',
      fix: 'Implement parameterized queries'
    },
    {
      severity: 'high',
      title: 'Cross-Site Scripting (XSS)',
      description: 'Stored XSS in user comments',
      impact: 'Session hijacking possible',
      fix: 'Sanitize user inputs'
    },
    {
      severity: 'medium',
      title: 'Missing Security Headers',
      description: 'CSP and HSTS headers not configured',
      impact: 'Clickjacking vulnerability',
      fix: 'Configure security headers'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-destructive text-destructive-foreground';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-yellow-500 text-black';
      default: return 'bg-muted';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl h-[80vh] overflow-y-auto bg-card border-primary/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-cyber text-primary">
            Interactive Security Assessment Demo
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Demo Control */}
          <Card className="p-6 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Target: demo.verteidiq.com</h3>
                <p className="text-muted-foreground">Simulated penetration test environment</p>
              </div>
              <Button 
                onClick={startDemo}
                disabled={isScanning}
                className="btn-cyber"
              >
                {isScanning ? (
                  <>
                    <Pause className="h-4 w-4 mr-2" />
                    Scanning...
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Start Assessment
                  </>
                )}
              </Button>
            </div>
            
            {isScanning && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
              >
                <Progress value={scanProgress} className="h-2" />
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 animate-spin" />
                  Scanning ports, checking vulnerabilities, analyzing attack surface...
                </div>
              </motion.div>
            )}
          </Card>

          {/* Results Section */}
          <AnimatePresence>
            {showResults && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {/* AI Summary */}
                <Card className="p-6 border border-primary/30 bg-gradient-to-r from-primary/10 to-transparent">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/20">
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">AI Threat Assessment</h3>
                      <p className="text-muted-foreground mb-3">
                        <strong className="text-destructive">High Risk:</strong> Critical SQL injection found in authentication system. 
                        <strong className="text-primary"> Recommended action:</strong> Immediate patching required.
                      </p>
                      <Button size="sm" className="btn-cyber">
                        <Zap className="h-4 w-4 mr-2" />
                        Generate Fix
                      </Button>
                    </div>
                  </div>
                </Card>

                {/* Vulnerability List */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    Security Findings ({mockFindings.length})
                  </h3>
                  
                  {mockFindings.map((finding, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="p-4 border border-border hover:border-primary/50 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <Badge className={getSeverityColor(finding.severity)}>
                                {finding.severity.toUpperCase()}
                              </Badge>
                              <h4 className="font-semibold text-foreground">{finding.title}</h4>
                            </div>
                            <p className="text-muted-foreground mb-2">{finding.description}</p>
                            <p className="text-sm text-destructive mb-3">
                              <strong>Impact:</strong> {finding.impact}
                            </p>
                            <div className="flex items-center gap-2">
                              <Button size="sm" className="btn-cyber">
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Apply Fix
                              </Button>
                              <Button size="sm" variant="outline">
                                <ExternalLink className="h-4 w-4 mr-2" />
                                View Details
                              </Button>
                            </div>
                          </div>
                          <AlertTriangle className="h-6 w-6 text-destructive flex-shrink-0" />
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Action CTA */}
                <Card className="p-6 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20 text-center">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Ready to secure your real infrastructure?
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Start your free assessment and get actionable security insights in minutes.
                  </p>
                  <Button className="btn-cyber">
                    Start Free Assessment
                  </Button>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DemoModal;