import { useState } from 'react';
import { Menu, X, Shield, Zap, Moon, Sun, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const navItems = [
    { label: 'Platform', href: '#platform' },
    { label: 'PTaaS', href: '#ptaas' },
    { label: 'Compliance', href: '#compliance' },
    { label: 'Docs', href: '#docs' },
    { label: 'Contact', href: '#contact' }
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Shield className="h-8 w-8 text-primary" />
              <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping"></div>
            </div>
            <span className="font-cyber text-xl font-bold text-neon-glow">VerteiDiq</span>
          </div>

          {/* Global Search */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Enter target..." 
              className="pl-10 bg-background/50 border-primary/30 focus:border-primary"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-foreground hover:text-primary transition-colors duration-200 relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Dark Mode Toggle & CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center gap-2">
              <Sun className="h-4 w-4 text-muted-foreground" />
              <Switch 
                checked={isDarkMode}
                onCheckedChange={setIsDarkMode}
                className="data-[state=checked]:bg-primary"
              />
              <Moon className="h-4 w-4 text-primary" />
            </div>
            <Button variant="ghost" className="text-primary hover:text-primary-foreground hover:bg-primary">
              Request Demo
            </Button>
            <Button 
              className="btn-cyber"
              onClick={() => window.location.href = '/dashboard'}
            >
              <Zap className="h-4 w-4 mr-2" />
              Launch PTaaS
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-primary"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-background/95 backdrop-blur-lg border-b border-border animate-cyber-fade-in">
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block text-foreground hover:text-primary transition-colors duration-200 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-4 space-y-3">
                <Button variant="ghost" className="w-full text-primary hover:text-primary-foreground hover:bg-primary">
                  Request Demo
                </Button>
                <Button 
                  className="w-full btn-cyber"
                  onClick={() => window.location.href = '/dashboard'}
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Launch PTaaS
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;