import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "CISO",
    company: "FinanceFirst Bank",
    sector: "Financial Services",
    content: "PTaaS reduced our security assessment time from 6 months to 2 weeks. We caught 3 critical vulnerabilities that would have cost us $4.2M in compliance violations.",
    metrics: "4.2M saved • 95% faster detection",
    rating: 5,
    avatar: "SC"
  },
  {
    id: 2,
    name: "Marcus Weber",
    role: "Head of Security",
    company: "CloudTech Industries",
    sector: "Technology",
    content: "The continuous monitoring caught a zero-day exploit in our API layer before it went public. The human validation gave us confidence to act immediately.",
    metrics: "0-day detection • 24hr response time",
    rating: 5,
    avatar: "MW"
  },
  {
    id: 3,
    name: "Dr. Elena Schmidt",
    role: "Chief Risk Officer",
    company: "MedTech AG",
    sector: "Healthcare",
    content: "GDPR and HIPAA compliance tracking is seamless. PTaaS helped us pass our ISO 27001 audit with zero security findings - a first in our company history.",
    metrics: "100% audit compliance • 0 findings",
    rating: 5,
    avatar: "ES"
  },
  {
    id: 4,
    name: "David Thompson",
    role: "DevSecOps Lead",
    company: "ScaleUp Technologies",
    sector: "SaaS",
    content: "CI/CD integration was flawless. We now catch vulnerabilities before deployment, reducing our production incidents by 78% in just 3 months.",
    metrics: "78% fewer incidents • DevOps ready",
    rating: 5,
    avatar: "DT"
  }
];

export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-background to-dark-surface">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cyber font-bold mb-6">
            <span className="bg-gradient-cyber bg-clip-text text-transparent">
              Trusted by Security Leaders
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of organizations using VerteiDiq to strengthen their security posture
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="card-cyber p-8 text-center relative">
                <Quote className="h-12 w-12 text-primary/30 mx-auto mb-6" />
                
                <blockquote className="text-xl lg:text-2xl text-foreground mb-8 leading-relaxed font-medium">
                  "{testimonials[currentIndex].content}"
                </blockquote>

                <div className="flex items-center justify-center gap-1 mb-4">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Business Metrics */}
                {testimonials[currentIndex].metrics && (
                  <div className="bg-primary/10 border border-primary/30 rounded-lg p-3 mb-6 inline-block">
                    <p className="text-primary font-semibold text-sm">
                      {testimonials[currentIndex].metrics}
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-center gap-4">
                  <Avatar className="h-16 w-16 border-2 border-primary/30">
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold text-lg">
                      {testimonials[currentIndex].avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <div className="font-semibold text-foreground text-lg">
                      {testimonials[currentIndex].name}
                    </div>
                    <div className="text-primary font-medium">
                      {testimonials[currentIndex].role}
                    </div>
                    <div className="text-muted-foreground text-sm">
                      {testimonials[currentIndex].company}
                    </div>
                    <div className="text-xs text-muted-foreground/70 mt-1">
                      {testimonials[currentIndex].sector}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Dots indicator */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex 
                    ? 'bg-primary' 
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;