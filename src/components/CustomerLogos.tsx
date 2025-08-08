import { Building2, ShieldCheck, Zap, Globe, Cpu, Database } from 'lucide-react';
import { motion } from 'framer-motion';

const CustomerLogos = () => {
  const customers = [
    { name: 'TechCorp', icon: Building2, sector: 'FinTech' },
    { name: 'SecureBank', icon: ShieldCheck, sector: 'Banking' },
    { name: 'CloudFirst', icon: Globe, sector: 'Cloud Services' },
    { name: 'DataSys', icon: Database, sector: 'Enterprise Software' },
    { name: 'NanoTech', icon: Cpu, sector: 'Manufacturing' },
    { name: 'VelocityPay', icon: Zap, sector: 'Payments' }
  ];

  return (
    <section className="py-12 bg-background/50 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <p className="text-2xl font-bold text-foreground mb-3">
            Join 500+ CISOs Who Stopped Breaches With VerteidIQ
          </p>
          <p className="text-lg text-muted-foreground mb-4">
            From Fortune 500 banks to unicorn startups - enterprises trust our autonomous security
          </p>
          <div className="flex justify-center items-center space-x-8 text-sm">
            <span className="text-green-400 font-semibold">$18.7B+ in breach costs prevented</span>
            <span className="text-blue-400 font-semibold">99.2% threat detection accuracy</span>
            <span className="text-purple-400 font-semibold">24/7 autonomous monitoring</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {customers.map((customer, index) => (
            <motion.div
              key={customer.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group text-center"
            >
              <div className="flex flex-col items-center space-y-3">
                <div className="p-4 rounded-xl bg-card border border-border group-hover:border-primary/50 group-hover:shadow-lg transition-all duration-300">
                  <customer.icon className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                    {customer.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {customer.sector}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <div className="inline-flex items-center space-x-8 text-sm text-muted-foreground">
            <span className="flex items-center space-x-2">
              <ShieldCheck className="h-4 w-4 text-green-500" />
              <span>85% faster incident response</span>
            </span>
            <span className="flex items-center space-x-2">
              <Zap className="h-4 w-4 text-yellow-500" />
              <span>$2.4M average breach cost savings</span>
            </span>
            <span className="flex items-center space-x-2">
              <Globe className="h-4 w-4 text-blue-500" />
              <span>99.7% vulnerability detection rate</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerLogos;