import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Mail, 
  MessageSquare, 
  Shield, 
  Users, 
  Globe, 
  Clock,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    message: '',
    interest: 'demo'
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Support',
      description: 'security@verteidiq.com',
      response: '< 4 hours',
      color: 'primary'
    },
    {
      icon: MessageSquare,
      title: 'Discord Community',
      description: 'Join our security community',
      response: 'Real-time',
      color: 'cyber-violet'
    },
    {
      icon: Shield,
      title: 'Security Hotline',
      description: 'Emergency security incidents',
      response: 'Immediate',
      color: 'accent'
    }
  ];

  const officeLocations = [
    {
      city: 'Berlin',
      country: 'Germany',
      address: 'Cyber Security District',
      timezone: 'CET',
      primary: true
    },
    {
      city: 'Munich',
      country: 'Germany', 
      address: 'Innovation Campus',
      timezone: 'CET',
      primary: false
    }
  ];

  return (
    <section id="contact" className="py-24 bg-gradient-dark">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/30">
            Get In Touch
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cyber font-bold mb-6">
            <span className="text-neon-glow">Contact</span>{' '}
            <span className="text-foreground">Our Security Experts</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Ready to transform your cybersecurity posture? Our team of security experts is here to help you 
            deploy XORB's autonomous intelligence platform.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="card-cyber border-border/50">
            <CardHeader>
              <CardTitle className="text-2xl text-foreground">Send us a message</CardTitle>
              <CardDescription className="text-muted-foreground">
                Tell us about your security challenges and we'll design a custom solution for your organization.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-foreground">Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                      required
                      className="bg-input border-border text-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@company.com"
                      required
                      className="bg-input border-border text-foreground"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="organization" className="text-foreground">Organization</Label>
                  <Input
                    id="organization"
                    name="organization"
                    value={formData.organization}
                    onChange={handleInputChange}
                    placeholder="Your company or organization"
                    className="bg-input border-border text-foreground"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="interest" className="text-foreground">I'm interested in</Label>
                  <select
                    id="interest"
                    name="interest"
                    value={formData.interest}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground"
                  >
                    <option value="demo">Platform Demo</option>
                    <option value="ptaas">PTaaS Assessment</option>
                    <option value="compliance">Compliance Consultation</option>
                    <option value="enterprise">Enterprise Solutions</option>
                    <option value="partnership">Partnership Opportunities</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-foreground">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your security requirements and challenges..."
                    rows={4}
                    required
                    className="bg-input border-border text-foreground resize-none"
                  />
                </div>

                <Button type="submit" className="w-full btn-cyber">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Message
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Methods */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-foreground">Contact Methods</h3>
              <div className="space-y-4">
                {contactMethods.map((method, index) => (
                  <div key={index} className="card-cyber group hover:scale-105 transition-transform duration-300">
                    <div className="flex items-center space-x-4">
                      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-${method.color}/10 group-hover:bg-${method.color}/20 transition-colors`}>
                        <method.icon className={`h-6 w-6 text-${method.color}`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground">{method.title}</h4>
                        <p className="text-sm text-muted-foreground">{method.description}</p>
                      </div>
                      <Badge variant="outline" className={`border-${method.color}/50 text-${method.color}`}>
                        {method.response}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Office Locations */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-foreground">Office Locations</h3>
              <div className="space-y-4">
                {officeLocations.map((office, index) => (
                  <div key={index} className="card-cyber">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Globe className="h-5 w-5 text-primary" />
                        <div>
                          <h4 className="font-semibold text-foreground">{office.city}, {office.country}</h4>
                          <p className="text-sm text-muted-foreground">{office.address}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        {office.primary && (
                          <Badge className="bg-primary/10 text-primary border-primary/30 mb-1">
                            HQ
                          </Badge>
                        )}
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          {office.timezone}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Security Notice */}
            <div className="card-cyber bg-primary/5 border-primary/20">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-accent mt-0.5" />
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Secure Communications</h4>
                  <p className="text-sm text-muted-foreground">
                    All communications are encrypted and processed according to GDPR and German data protection standards. 
                    For sensitive security discussions, we recommend using our encrypted channels.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;