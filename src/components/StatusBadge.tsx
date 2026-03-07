import { HealthStatus } from '@/lib/types';

const labels: Record<HealthStatus, string> = {
  normal: 'Normal',
  warning: 'Warning',
  emergency: 'Emergency',
};

export const StatusBadge = ({ status }: { status: HealthStatus }) => (
  <span
    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
      status === 'normal'
        ? 'bg-status-normal-bg text-status-normal'
        : status === 'warning'
        ? 'bg-status-warning-bg text-status-warning'
        : 'bg-status-emergency-bg text-status-emergency'
    }`}
  >
    <span className={`status-dot status-${status}`} />
    {labels[status]}
  </span>
);
