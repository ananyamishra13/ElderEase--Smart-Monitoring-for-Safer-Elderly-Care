import { ReactNode } from 'react';
import { HealthStatus } from '@/lib/types';

interface Props {
  label: string;
  value: string | number;
  unit: string;
  icon: ReactNode;
  status: HealthStatus;
}

export const HealthMetricCard = ({ label, value, unit, icon, status }: Props) => (
  <div
    className={`health-card flex flex-col gap-3 ${
      status === 'emergency' ? 'emergency-flash border-status-emergency' : ''
    } ${status === 'warning' ? 'border-status-warning' : ''}`}
  >
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
      <div
        className={`w-9 h-9 rounded-lg flex items-center justify-center ${
          status === 'normal'
            ? 'bg-status-normal-bg text-status-normal'
            : status === 'warning'
            ? 'bg-status-warning-bg text-status-warning'
            : 'bg-status-emergency-bg text-status-emergency'
        }`}
      >
        {icon}
      </div>
    </div>
    <div className="flex items-baseline gap-1">
      <span className="text-3xl font-bold text-foreground">{value}</span>
      <span className="text-sm text-muted-foreground">{unit}</span>
    </div>
  </div>
);
