import { useState, useEffect } from 'react';
import { trackFormStart, trackFormComplete, useAnalytics } from '@/components/AnalyticsTracker';
import { Shield, AlertTriangle, CheckCircle, TrendingUp, Users, Building, DollarSign, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';

interface Question {
  id: string;
  question: string;
  category: 'general' | 'industry' | 'technical' | 'compliance';
  options: {
    value: string;
    label: string;
    riskScore: number;
    description?: string;
  }[];
  industry?: 'finance' | 'healthcare' | 'manufacturing';
}

interface AssessmentResults {
  overallRisk: 'low' | 'medium' | 'high' | 'critical';
  riskScore: number;
  categories: {
    [key: string]: {
      score: number;
      risk: string;
      recommendations: string[];
    };
  };
  estimatedBreachCost: string;
  recommendations: string[];
  nextSteps: string[];
}

const SecurityAssessment = ({ industry = 'general' }: { industry?: string }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [results, setResults] = useState<AssessmentResults | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [companyInfo, setCompanyInfo] = useState({
    name: '',
    email: '',
    company: '',
    employees: '',
    title: ''
  });
  const analytics = useAnalytics();

  useEffect(() => {
    // Track assessment start
    trackFormStart('assessment', industry);
    analytics.trackUserInteraction('assessment_start', 'engagement', industry);
  }, [analytics, industry]);

  const questions: Question[] = [
    {
      id: 'company_size',
      question: 'How many employees does your organization have?',
      category: 'general',
      options: [
        { value: 'small', label: '1-50 employees', riskScore: 3, description: 'Small business' },
        { value: 'medium', label: '51-500 employees', riskScore: 5, description: 'Mid-market' },
        { value: 'large', label: '501-5,000 employees', riskScore: 7, description: 'Large enterprise' },
        { value: 'enterprise', label: '5,000+ employees', riskScore: 9, description: 'Global enterprise' }
      ]
    },
    {
      id: 'security_incidents',
      question: 'Has your organization experienced a security incident in the past 12 months?',
      category: 'general',
      options: [
        { value: 'none', label: 'No security incidents', riskScore: 2 },
        { value: 'minor', label: 'Minor incidents (phishing attempts)', riskScore: 4 },
        { value: 'moderate', label: 'Moderate incidents (malware infections)', riskScore: 6 },
        { value: 'major', label: 'Major incidents (data breach/ransomware)', riskScore: 9 }
      ]
    },
    {
      id: 'security_budget',
      question: 'What percentage of your IT budget is allocated to cybersecurity?',
      category: 'general',
      options: [
        { value: 'none', label: 'No dedicated security budget', riskScore: 9 },
        { value: 'low', label: 'Less than 5%', riskScore: 7 },
        { value: 'medium', label: '5-10%', riskScore: 4 },
        { value: 'high', label: 'More than 10%', riskScore: 2 }
      ]
    },
    {
      id: 'compliance_requirements',
      question: 'Which compliance frameworks apply to your organization?',
      category: 'compliance',
      options: [
        { value: 'none', label: 'No specific compliance requirements', riskScore: 3 },
        { value: 'basic', label: 'Basic compliance (ISO 27001)', riskScore: 5 },
        { value: 'industry', label: 'Industry-specific (HIPAA, PCI DSS, SOX)', riskScore: 7 },
        { value: 'multiple', label: 'Multiple frameworks', riskScore: 9 }
      ]
    },
    {
      id: 'data_sensitivity',
      question: 'What type of sensitive data does your organization handle?',
      category: 'general',
      options: [
        { value: 'low', label: 'Public information only', riskScore: 1 },
        { value: 'medium', label: 'Internal business data', riskScore: 4 },
        { value: 'high', label: 'Customer PII/financial data', riskScore: 7 },
        { value: 'critical', label: 'Regulated data (healthcare, financial)', riskScore: 9 }
      ]
    },
    {
      id: 'security_tools',
      question: 'What security tools do you currently have in place?',
      category: 'technical',
      options: [
        { value: 'basic', label: 'Basic antivirus and firewall', riskScore: 8 },
        { value: 'intermediate', label: 'EDR and SIEM', riskScore: 5 },
        { value: 'advanced', label: 'AI-powered threat detection', riskScore: 3 },
        { value: 'comprehensive', label: 'Full security stack with automation', riskScore: 1 }
      ]
    },
    {
      id: 'threat_monitoring',
      question: 'How do you currently monitor for cyber threats?',
      category: 'technical',
      options: [
        { value: 'none', label: 'No active monitoring', riskScore: 9 },
        { value: 'manual', label: 'Manual monitoring during business hours', riskScore: 7 },
        { value: 'automated', label: 'Automated 24/7 monitoring', riskScore: 4 },
        { value: 'ai_powered', label: 'AI-powered predictive monitoring', riskScore: 2 }
      ]
    },
    {
      id: 'response_time',
      question: 'What is your typical incident response time?',
      category: 'technical',
      options: [
        { value: 'hours', label: 'Hours to days', riskScore: 8 },
        { value: 'minutes', label: 'Minutes to hours', riskScore: 5 },
        { value: 'seconds', label: 'Seconds to minutes', riskScore: 2 },
        { value: 'automated', label: 'Automated real-time response', riskScore: 1 }
      ]
    }
  ];

  // Add industry-specific questions
  const industryQuestions: { [key: string]: Question[] } = {
    finance: [
      {
        id: 'financial_regulations',
        question: 'Which financial regulations does your organization need to comply with?',
        category: 'compliance',
        industry: 'finance',
        options: [
          { value: 'basic', label: 'Basic banking regulations', riskScore: 4 },
          { value: 'pci', label: 'PCI DSS compliance', riskScore: 6 },
          { value: 'sox', label: 'SOX and PCI DSS', riskScore: 7 },
          { value: 'comprehensive', label: 'Full regulatory compliance (SOX, PCI, GLBA)', riskScore: 9 }
        ]
      }
    ],
    healthcare: [
      {
        id: 'patient_data',
        question: 'How much patient data does your organization handle?',
        category: 'compliance',
        industry: 'healthcare',
        options: [
          { value: 'small', label: 'Less than 1,000 patient records', riskScore: 4 },
          { value: 'medium', label: '1,000-10,000 patient records', riskScore: 6 },
          { value: 'large', label: '10,000-100,000 patient records', riskScore: 8 },
          { value: 'massive', label: 'Over 100,000 patient records', riskScore: 9 }
        ]
      }
    ],
    manufacturing: [
      {
        id: 'ot_systems',
        question: 'How connected are your operational technology (OT) systems?',
        category: 'technical',
        industry: 'manufacturing',
        options: [
          { value: 'isolated', label: 'Completely air-gapped', riskScore: 2 },
          { value: 'limited', label: 'Limited connectivity', riskScore: 4 },
          { value: 'connected', label: 'Connected to corporate network', riskScore: 7 },
          { value: 'cloud', label: 'Cloud-connected IoT systems', riskScore: 8 }
        ]
      }
    ]
  };

  const allQuestions = [
    ...questions,
    ...(industry !== 'general' && industryQuestions[industry] ? industryQuestions[industry] : [])
  ];

  const calculateResults = (): AssessmentResults => {
    let totalScore = 0;
    let maxScore = 0;
    const categoryScores: { [key: string]: { score: number; maxScore: number; count: number } } = {};

    Object.entries(answers).forEach(([questionId, answer]) => {
      const question = allQuestions.find(q => q.id === questionId);
      if (question) {
        const option = question.options.find(opt => opt.value === answer);
        if (option) {
          totalScore += option.riskScore;
          maxScore += Math.max(...question.options.map(opt => opt.riskScore));
          
          const category = question.category;
          if (!categoryScores[category]) {
            categoryScores[category] = { score: 0, maxScore: 0, count: 0 };
          }
          categoryScores[category].score += option.riskScore;
          categoryScores[category].maxScore += Math.max(...question.options.map(opt => opt.riskScore));
          categoryScores[category].count += 1;
        }
      }
    });

    const riskPercentage = (totalScore / maxScore) * 100;
    let overallRisk: 'low' | 'medium' | 'high' | 'critical';
    let estimatedBreachCost: string;

    if (riskPercentage <= 30) {
      overallRisk = 'low';
      estimatedBreachCost = '$850K';
    } else if (riskPercentage <= 50) {
      overallRisk = 'medium';
      estimatedBreachCost = '$2.1M';
    } else if (riskPercentage <= 75) {
      overallRisk = 'high';
      estimatedBreachCost = '$4.2M';
    } else {
      overallRisk = 'critical';
      estimatedBreachCost = '$7.8M';
    }

    // Calculate category results
    const categories: { [key: string]: { score: number; risk: string; recommendations: string[] } } = {};
    Object.entries(categoryScores).forEach(([category, data]) => {
      const categoryPercentage = (data.score / data.maxScore) * 100;
      let categoryRisk: string;
      let recommendations: string[] = [];

      if (categoryPercentage <= 30) {
        categoryRisk = 'Good';
        recommendations = [`Your ${category} security posture is strong. Continue current practices.`];
      } else if (categoryPercentage <= 50) {
        categoryRisk = 'Fair';
        recommendations = [`Consider improving your ${category} security measures.`];
      } else if (categoryPercentage <= 75) {
        categoryRisk = 'Poor';
        recommendations = [`Your ${category} security needs immediate attention and improvement.`];
      } else {
        categoryRisk = 'Critical';
        recommendations = [`Critical gaps in ${category} security require urgent remediation.`];
      }

      categories[category] = {
        score: Math.round(categoryPercentage),
        risk: categoryRisk,
        recommendations
      };
    });

    const recommendations = [
      'Implement AI-powered threat detection and response',
      'Establish 24/7 security monitoring',
      'Conduct regular security assessments and penetration testing',
      'Develop and test incident response procedures',
      'Implement zero-trust security architecture'
    ];

    const nextSteps = [
      'Schedule a detailed security consultation',
      'Get a comprehensive penetration test',
      'Review and update security policies',
      'Implement advanced threat protection',
      'Train staff on cybersecurity best practices'
    ];

    return {
      overallRisk,
      riskScore: Math.round(riskPercentage),
      categories,
      estimatedBreachCost,
      recommendations: recommendations.slice(0, 3),
      nextSteps: nextSteps.slice(0, 3)
    };
  };

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [allQuestions[currentStep].id]: value });
  };

  const nextStep = () => {
    if (currentStep < allQuestions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      const assessmentResults = calculateResults();
      setResults(assessmentResults);
      setShowResults(true);
      
      // Track assessment completion
      trackFormComplete('assessment', {
        industry,
        risk_level: assessmentResults.overallRisk,
        risk_score: assessmentResults.riskScore,
        estimated_breach_cost: assessmentResults.estimatedBreachCost
      });
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'low': return 'text-green-400 bg-green-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'high': return 'text-orange-400 bg-orange-500/20';
      case 'critical': return 'text-red-400 bg-red-500/20';
      default: return 'text-slate-400 bg-slate-500/20';
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'low': return CheckCircle;
      case 'medium': return Shield;
      case 'high': case 'critical': return AlertTriangle;
      default: return Shield;
    }
  };

  if (showResults && results) {
    return (
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Results Header */}
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4 text-white">Your Security Assessment Results</h2>
          <p className="text-xl text-slate-300 mb-8">
            Based on your responses, here's your cybersecurity risk profile and recommendations
          </p>
        </div>

        {/* Overall Risk Score */}
        <Card className="bg-slate-900/80 border-2 border-red-500/30">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              {(() => {
                const RiskIcon = getRiskIcon(results.overallRisk);
                return <RiskIcon className={`w-16 h-16 ${getRiskColor(results.overallRisk).split(' ')[0]}`} />;
              })()}
            </div>
            <CardTitle className="text-3xl text-white">Overall Risk Level</CardTitle>
            <Badge className={`text-lg px-4 py-2 ${getRiskColor(results.overallRisk)}`}>
              {results.overallRisk.toUpperCase()} RISK - {results.riskScore}%
            </Badge>
          </CardHeader>
          <CardContent className="text-center">
            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div className="bg-red-500/10 p-6 rounded-xl border border-red-500/30">
                <DollarSign className="w-8 h-8 text-red-400 mx-auto mb-2" />
                <h3 className="text-xl font-bold text-white mb-2">Estimated Breach Cost</h3>
                <p className="text-2xl font-bold text-red-400">{results.estimatedBreachCost}</p>
                <p className="text-slate-400 mt-2">Average cost if breached</p>
              </div>
              <div className="bg-blue-500/10 p-6 rounded-xl border border-blue-500/30">
                <TrendingUp className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <h3 className="text-xl font-bold text-white mb-2">Potential Savings</h3>
                <p className="text-2xl font-bold text-blue-400">$3.2M+</p>
                <p className="text-slate-400 mt-2">With VerteidIQ protection</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Category Breakdown */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-6">Risk Category Breakdown</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(results.categories).map(([category, data]) => (
              <Card key={category} className="bg-slate-900/80 border-slate-500/30">
                <CardHeader>
                  <CardTitle className="text-white capitalize">{category}</CardTitle>
                  <Badge className={getRiskColor(data.risk)}>
                    {data.risk}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white mb-2">{data.score}%</div>
                    <Progress value={data.score} className="mb-4" />
                    <p className="text-slate-400 text-sm">{data.recommendations[0]}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="bg-slate-900/80 border-blue-500/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-400" />
                Top Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {results.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-300">{rec}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/80 border-green-500/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-green-400" />
                Next Steps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {results.nextSteps.map((step, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-sm font-bold mt-0.5 flex-shrink-0">
                      {index + 1}
                    </div>
                    <span className="text-slate-300">{step}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <Card className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-blue-500/50">
          <CardContent className="text-center p-8">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Improve Your Security?</h3>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
              Get personalized recommendations and see how VerteidIQ can reduce your cyber risk by up to 89%.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3">
                Schedule Security Consultation
              </Button>
              <Button variant="outline" className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white px-8 py-3">
                Download Detailed Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Progress Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-3xl font-bold text-white">Security Risk Assessment</h2>
          <Badge variant="outline" className="text-slate-400">
            Question {currentStep + 1} of {allQuestions.length}
          </Badge>
        </div>
        <Progress value={(currentStep + 1) / allQuestions.length * 100} className="mb-2" />
        <p className="text-slate-400 text-sm">
          Get your personalized cybersecurity risk report in 60 seconds
        </p>
      </div>

      {/* Question Card */}
      <Card className="bg-slate-900/80 border-slate-500/30 mb-8">
        <CardHeader>
          <CardTitle className="text-xl text-white">
            {allQuestions[currentStep]?.question}
          </CardTitle>
          <CardDescription>
            Select the option that best describes your current situation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={answers[allQuestions[currentStep]?.id] || ''}
            onValueChange={handleAnswer}
            className="space-y-4"
          >
            {allQuestions[currentStep]?.options.map((option) => (
              <div key={option.value} className="flex items-center space-x-3 p-4 rounded-lg border border-slate-600 hover:border-slate-400 transition-colors">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                  <div className="font-medium text-white">{option.label}</div>
                  {option.description && (
                    <div className="text-sm text-slate-400">{option.description}</div>
                  )}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          onClick={prevStep}
          disabled={currentStep === 0}
          variant="outline"
          className="border-slate-500 text-slate-400 hover:text-white"
        >
          Previous
        </Button>
        <Button
          onClick={nextStep}
          disabled={!answers[allQuestions[currentStep]?.id]}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
        >
          {currentStep === allQuestions.length - 1 ? 'Get Results' : 'Next'}
        </Button>
      </div>
    </div>
  );
};

export default SecurityAssessment;