import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Zap, 
  FileText, 
  ShieldCheck, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const DashboardSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const navItems = [
    { 
      label: 'Dashboard', 
      href: '/dashboard', 
      icon: LayoutDashboard,
      active: location.pathname === '/dashboard'
    },
    { 
      label: 'Scans', 
      href: '/scans', 
      icon: Zap,
      active: location.pathname === '/scans'
    },
    { 
      label: 'Reports', 
      href: '/reports', 
      icon: FileText,
      active: location.pathname === '/reports'
    },
    { 
      label: 'Compliance', 
      href: '/compliance', 
      icon: ShieldCheck,
      active: location.pathname === '/compliance'
    },
    { 
      label: 'Settings', 
      href: '/settings', 
      icon: Settings,
      active: location.pathname === '/settings'
    }
  ];

  return (
    <div className={cn(
      "bg-card border-r border-border flex flex-col transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Collapse Toggle */}
      <div className="p-4 flex justify-end">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={cn(
              "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors",
              item.active 
                ? "bg-primary/20 text-primary border border-primary/30" 
                : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
            )}
          >
            <item.icon className="h-5 w-5 flex-shrink-0" />
            {!collapsed && <span className="font-medium">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-border">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start text-muted-foreground hover:text-foreground hover:bg-destructive/10",
            collapsed && "px-2"
          )}
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          {!collapsed && <span className="ml-3">Logout</span>}
        </Button>
      </div>
    </div>
  );
};

export default DashboardSidebar;