import { Badge } from '@/components/ui/badge';
import { Shield, Award, CheckCircle, Lock } from 'lucide-react';

const badges = [
  {
    icon: Shield,
    label: 'GDPR Compliant',
    status: 'certified'
  },
  {
    icon: Award,
    label: 'SOC 2 Type II',
    status: 'in-progress'
  },
  {
    icon: CheckCircle,
    label: 'ISO 27001',
    status: 'in-progress'
  },
  {
    icon: Lock,
    label: 'BSI Approved',
    status: 'certified'
  }
];

export const TrustBadges = () => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 py-8">
      <p className="text-sm text-muted-foreground w-full text-center mb-4">
        Trusted by enterprises worldwide
      </p>
      <div className="flex flex-wrap items-center gap-4">
        {badges.map((badge, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <badge.icon className="h-4 w-4 text-primary" />
            <span className="text-foreground">{badge.label}</span>
            {badge.status === 'in-progress' && (
              <Badge variant="outline" className="text-xs border-yellow-500 text-yellow-500">
                In Progress
              </Badge>
            )}
            {badge.status === 'certified' && (
              <Badge variant="outline" className="text-xs border-primary text-primary">
                Certified
              </Badge>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustBadges;