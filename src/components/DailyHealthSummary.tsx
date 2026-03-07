import { calculateHealthScore, HealthData } from '@/lib/types';
import { TrendingUp, AlertTriangle, AlertOctagon } from 'lucide-react';

interface Props {
  history: HealthData[];
}

export const DailyHealthSummary = ({ history }: Props) => {
  const { score, warnings, emergencies } = calculateHealthScore(history);

  const getScoreColor = () => {
    if (score >= 80) return 'text-status-normal';
    if (score >= 50) return 'text-status-warning';
    return 'text-status-emergency';
  };

  const getScoreRing = () => {
    if (score >= 80) return 'border-status-normal';
    if (score >= 50) return 'border-status-warning';
    return 'border-status-emergency';
  };

  return (
    <div className="health-card">
      <h3 className="text-sm font-semibold text-foreground mb-4">Daily Health Summary</h3>
      <div className="flex items-center gap-6">
        <div className={`w-24 h-24 rounded-full border-4 ${getScoreRing()} flex items-center justify-center flex-shrink-0`}>
          <div className="text-center">
            <span className={`text-2xl font-bold ${getScoreColor()}`}>{score}</span>
            <span className="text-xs text-muted-foreground block">/100</span>
          </div>
        </div>
        <div className="space-y-3 flex-1">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-sm text-foreground font-medium">Health Score: <span className={getScoreColor()}>{score}/100</span></span>
          </div>
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-status-warning" />
            <span className="text-sm text-foreground">Warnings detected: <strong>{warnings}</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <AlertOctagon className="w-4 h-4 text-status-emergency" />
            <span className="text-sm text-foreground">Emergencies: <strong>{emergencies}</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
};
