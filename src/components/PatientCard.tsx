import { Patient } from '@/lib/types';
import { StatusBadge } from './StatusBadge';
import { Activity, Droplets, Thermometer, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export const PatientCard = ({ patient }: { patient: Patient }) => {
  const { heartRate, spo2, temperature, status } = patient.currentHealth;

  return (
    <div className={`health-card ${status === 'emergency' ? 'emergency-flash border-status-emergency' : ''}`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-foreground">{patient.name}</h3>
          <p className="text-xs text-muted-foreground">Age {patient.age} · {patient.room}</p>
        </div>
        <StatusBadge status={status} />
      </div>

      <div className="grid grid-cols-3 gap-3 mb-3">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-status-emergency" />
          <div>
            <p className="text-xs text-muted-foreground">HR</p>
            <p className="text-sm font-semibold text-foreground">{heartRate} <span className="text-xs font-normal">bpm</span></p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Droplets className="w-4 h-4 text-accent" />
          <div>
            <p className="text-xs text-muted-foreground">SpO₂</p>
            <p className="text-sm font-semibold text-foreground">{spo2}<span className="text-xs font-normal">%</span></p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Thermometer className="w-4 h-4 text-status-warning" />
          <div>
            <p className="text-xs text-muted-foreground">Temp</p>
            <p className="text-sm font-semibold text-foreground">{temperature}<span className="text-xs font-normal">°C</span></p>
          </div>
        </div>
      </div>

      {patient.lastEmergency && (
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground pt-2 border-t border-border">
          <Clock className="w-3 h-3" />
          Last emergency: {formatDistanceToNow(patient.lastEmergency, { addSuffix: true })}
        </div>
      )}
    </div>
  );
};
