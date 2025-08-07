import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Shield, ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const MobileCTA = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur border-t border-primary/20 p-4 md:hidden">
      <Button className="w-full btn-cyber h-12 text-base font-semibold">
        <Shield className="h-5 w-5 mr-2" />
        Start Free Assessment
      </Button>
    </div>
  );
};

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          className="fixed bottom-20 right-4 z-40 p-3 bg-primary/20 backdrop-blur border border-primary/30 rounded-full text-primary hover:bg-primary/30 transition-colors"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};