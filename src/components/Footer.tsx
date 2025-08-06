import { Shield, Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const footerSections = [
    {
      title: 'Platform',
      links: [
        { label: 'VerteiDiq Intelligence', href: '#platform' },
        { label: 'PTaaS Dashboard', href: '#ptaas' },
        { label: 'API Documentation', href: '#docs' },
        { label: 'Security Center', href: '#security' }
      ]
    },
    {
      title: 'Compliance',
      links: [
        { label: 'GDPR & DSGVO', href: '#gdpr' },
        { label: 'BSI Framework', href: '#bsi' },
        { label: 'IT-SiG Standards', href: '#itsig' },
        { label: 'NIS2 Directive', href: '#nis2' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { label: 'Documentation', href: '#docs' },
        { label: 'Security Blog', href: '#blog' },
        { label: 'Case Studies', href: '#cases' },
        { label: 'White Papers', href: '#papers' }
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About VerteidIQ', href: '#about' },
        { label: 'Contact', href: '#contact' },
        { label: 'Careers', href: '#careers' },
        { label: 'Partners', href: '#partners' }
      ]
    }
  ];

  const socialLinks = [
    { icon: Github, href: '#github', label: 'GitHub' },
    { icon: Twitter, href: '#twitter', label: 'Twitter' },
    { icon: Linkedin, href: '#linkedin', label: 'LinkedIn' },
    { icon: Mail, href: '#contact', label: 'Contact' }
  ];

  return (
    <footer className="bg-darker-surface border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative">
                <Shield className="h-8 w-8 text-primary" />
                <div className="absolute inset-0 rounded-full bg-primary/20 animate-pulse"></div>
              </div>
              <span className="font-cyber text-xl font-bold text-neon-glow">VerteiDiq</span>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Autonomous cybersecurity intelligence platform delivering quantum-secure, 
              AI-powered threat protection for the modern digital landscape.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-card border border-border text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-foreground mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-border mb-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-muted-foreground">
            <span>© 2024 VerteidIQ. All rights reserved.</span>
            <div className="flex space-x-6">
              <a href="#privacy" className="hover:text-primary transition-colors">
                Datenschutzerklärung
              </a>
              <a href="#imprint" className="hover:text-primary transition-colors">
                Impressum
              </a>
              <a href="#terms" className="hover:text-primary transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>Made in Germany</span>
            <div className="w-1 h-1 bg-primary rounded-full"></div>
            <span>Quantum-Secured</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;