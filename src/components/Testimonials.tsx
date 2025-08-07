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
    company: "TechCorp Solutions",
    content: "VerteiDiq found critical vulnerabilities our previous tools missed. The AI-driven insights helped us prevent a potential breach that could have cost millions.",
    rating: 5,
    avatar: "SC"
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    role: "Security Engineer",
    company: "Global Finance Inc",
    content: "The automated remediation suggestions are game-changing. What used to take weeks of manual analysis now happens in minutes with actionable results.",
    rating: 5,
    avatar: "MR"
  },
  {
    id: 3,
    name: "Dr. Elena Vasquez",
    role: "Head of Compliance",
    company: "MedTech Innovations",
    content: "GDPR and HIPAA compliance tracking is seamless. VerteiDiq's real-time monitoring gives us confidence in our security posture during audits.",
    rating: 5,
    avatar: "EV"
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

                <div className="flex items-center justify-center gap-1 mb-6">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

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