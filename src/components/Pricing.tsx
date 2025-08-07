import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  Check, 
  ChevronDown,
  Shield, 
  Zap, 
  Crown,
  Users,
  Server,
  Clock
} from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    icon: Shield,
    price: 0,
    description: 'Perfect for small teams getting started',
    features: [
      'Up to 10 assets monitored',
      'Monthly security scans',
      'Basic vulnerability detection',
      'Email notifications',
      'Community support'
    ],
    cta: 'Start Free',
    popular: false
  },
  {
    name: 'Team',
    icon: Zap,
    price: 199,
    description: 'Advanced protection for growing organizations',
    features: [
      'Up to 100 assets monitored',
      'Weekly automated scans',
      'AI-powered threat intelligence',
      'Real-time notifications',
      'Compliance reporting (GDPR, SOC2)',
      'Priority support',
      'Custom integrations'
    ],
    cta: 'Start Free Trial',
    popular: true
  },
  {
    name: 'Enterprise',
    icon: Crown,
    price: 'Custom',
    description: 'Complete security orchestration for enterprises',
    features: [
      'Unlimited assets monitored',
      'Continuous real-time scanning',
      'Advanced AI threat modeling',
      'Dedicated security consultant',
      'Full compliance automation',
      'Custom deployment options',
      'SLA guarantees',
      '24/7 dedicated support'
    ],
    cta: 'Contact Sales',
    popular: false
  }
];

const faqs = [
  {
    question: 'How quickly can I see results?',
    answer: 'Most customers see their first security assessment results within 60 seconds of signup. Full environment analysis typically completes within 24 hours.'
  },
  {
    question: 'What compliance frameworks do you support?',
    answer: 'We support GDPR, DSGVO, BSI, IT-SiG, NIS2, SOC 2, ISO 27001, HIPAA, and PCI DSS. Custom compliance frameworks can be configured for Enterprise plans.'
  },
  {
    question: 'Can I integrate with existing security tools?',
    answer: 'Yes! We offer integrations with 50+ security tools including SIEM platforms, ticketing systems, and CI/CD pipelines. Custom integrations available for Enterprise customers.'
  },
  {
    question: 'What happens during the free trial?',
    answer: 'You get full access to all Team plan features for 14 days. No credit card required. We\'ll scan your assets and provide a comprehensive security report.'
  },
  {
    question: 'How does pricing scale with organization size?',
    answer: 'Our pricing is based on the number of assets monitored. Use our calculator above to get an accurate estimate for your organization size.'
  }
];

export const Pricing = () => {
  const [orgSize, setOrgSize] = useState([50]);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const calculatePrice = (assets: number) => {
    if (assets <= 10) return 0;
    if (assets <= 100) return 199;
    return Math.round(199 + (assets - 100) * 2.5);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-dark-surface to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cyber font-bold mb-6">
            <span className="bg-gradient-cyber bg-clip-text text-transparent">
              Transparent Pricing
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that fits your security needs. All plans include a free trial.
          </p>
        </div>

        {/* Price Calculator */}
        <div className="max-w-md mx-auto mb-16">
          <Card className="card-cyber p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Server className="h-5 w-5 text-primary" />
              Estimate Your Cost
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground">
                  Number of assets to monitor
                </label>
                <div className="mt-2">
                  <Slider
                    value={orgSize}
                    onValueChange={setOrgSize}
                    max={500}
                    min={1}
                    step={10}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>1</span>
                    <span className="font-semibold text-primary">{orgSize[0]} assets</span>
                    <span>500+</span>
                  </div>
                </div>
              </div>
              <div className="text-center pt-4 border-t border-border">
                <div className="text-2xl font-bold text-primary">
                  ${calculatePrice(orgSize[0])}/month
                </div>
                <p className="text-sm text-muted-foreground">
                  Estimated monthly cost
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Pricing Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                  Most Popular
                </Badge>
              )}
              <Card className={`card-cyber p-8 h-full ${plan.popular ? 'border-primary/50 shadow-neon' : ''}`}>
                <div className="text-center mb-6">
                  <plan.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground mb-4">{plan.description}</p>
                  <div className="mb-6">
                    {typeof plan.price === 'number' ? (
                      <>
                        <span className="text-4xl font-bold text-primary">${plan.price}</span>
                        <span className="text-muted-foreground">/month</span>
                      </>
                    ) : (
                      <span className="text-4xl font-bold text-primary">{plan.price}</span>
                    )}
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full ${plan.popular ? 'btn-cyber' : ''}`}
                  variant={plan.popular ? 'default' : 'outline'}
                >
                  {plan.cta}
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-center text-foreground mb-8">
            Frequently Asked Questions
          </h3>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Collapsible
                key={index}
                open={openFaq === index}
                onOpenChange={() => setOpenFaq(openFaq === index ? null : index)}
              >
                <CollapsibleTrigger asChild>
                  <Card className="card-cyber p-4 cursor-pointer hover:border-primary/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-semibold text-foreground">{faq.question}</h4>
                      <ChevronDown className={`h-5 w-5 text-primary transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                    </div>
                  </Card>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="px-4 pb-4 pt-2">
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;