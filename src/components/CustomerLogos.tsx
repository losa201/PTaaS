import { Building2, ShieldCheck, Zap, Globe, Cpu, Database } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

const CustomerLogos = () => {
  const customers = [
    { name: 'TechCorp', icon: Building2, sector: 'FinTech', growth: '+340%' },
    { name: 'SecureBank', icon: ShieldCheck, sector: 'Banking', growth: '+220%' },
    { name: 'CloudFirst', icon: Globe, sector: 'Cloud Services', growth: '+180%' },
    { name: 'DataSys', icon: Database, sector: 'Enterprise Software', growth: '+290%' },
    { name: 'NanoTech', icon: Cpu, sector: 'Manufacturing', growth: '+150%' },
    { name: 'VelocityPay', icon: Zap, sector: 'Payments', growth: '+260%' }
  ];

  const stats = [
    { 
      value: '$18.7B+', 
      label: 'breach costs prevented', 
      icon: ShieldCheck, 
      color: 'text-primary' 
    },
    { 
      value: '99.2%', 
      label: 'threat detection accuracy', 
      icon: Zap, 
      color: 'text-secondary' 
    },
    { 
      value: '24/7', 
      label: 'autonomous monitoring', 
      icon: Globe, 
      color: 'text-accent' 
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-b from-background to-surface-dark">
      {/* Background elements */}
      <div className="absolute inset-0 cyber-mesh opacity-20" />
      <div className="absolute top-10 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '-2s' }} />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <Badge className="mb-6 glass hover:bg-primary/20 border-primary/30 text-primary animate-glow-pulse">
            Trusted by Industry Leaders
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Join <span className="text-gradient">500+ CISOs</span> Who Stopped Breaches
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            From Fortune 500 banks to unicorn startups - enterprises trust our autonomous security platform
          </p>
          
          {/* Key stats */}
          <div className="flex flex-wrap justify-center items-center gap-8 mb-12">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2 }}
                className="glass glass-hover p-4 rounded-xl flex items-center space-x-3 min-w-fit"
              >
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
                <div className="text-left">
                  <div className={`font-bold ${stat.color}`}>{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Customer logos */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-16">
          {customers.map((customer, index) => (
            <motion.div
              key={customer.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group text-center"
            >
              <div className="glass glass-hover p-6 rounded-2xl h-full flex flex-col items-center justify-center space-y-4 interactive-glow">
                <div className="p-4 rounded-xl bg-card/40 border border-border/30 group-hover:border-primary/40 transition-all duration-300">
                  <customer.icon className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors mb-1">
                    {customer.name}
                  </p>
                  <p className="text-xs text-muted-foreground mb-2">
                    {customer.sector}
                  </p>
                  <Badge variant="outline" className="text-xs border-primary/30 text-primary bg-primary/10">
                    {customer.growth} security improvement
                  </Badge>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Bottom metrics */}
        <div className="text-center">
          <div className="glass p-6 rounded-2xl max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center space-y-2">
                <div className="text-2xl font-bold text-primary">85%</div>
                <div className="text-sm text-muted-foreground">faster incident response</div>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="text-2xl font-bold text-secondary">$2.4M</div>
                <div className="text-sm text-muted-foreground">average breach cost savings</div>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="text-2xl font-bold text-accent">99.7%</div>
                <div className="text-sm text-muted-foreground">vulnerability detection rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerLogos;