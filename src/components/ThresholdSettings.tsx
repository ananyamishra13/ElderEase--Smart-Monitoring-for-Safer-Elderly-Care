import { useState } from 'react';
import { PersonalThresholds, DEFAULT_THRESHOLDS } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Settings, Save, X } from 'lucide-react';

interface Props {
  thresholds: PersonalThresholds;
  onSave: (t: PersonalThresholds) => void;
}

export const ThresholdSettings = ({ thresholds, onSave }: Props) => {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<PersonalThresholds>(thresholds);

  const handleSave = () => {
    onSave(values);
    setOpen(false);
  };

  const handleReset = () => {
    setValues(DEFAULT_THRESHOLDS);
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
      >
        <Settings className="w-4 h-4" />
        Custom Thresholds
      </button>
    );
  }

  return (
    <div className="health-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground">Personalized Thresholds</h3>
        <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground">Heart Rate Range (bpm)</label>
          <div className="flex gap-2">
            <Input
              type="number"
              value={values.heartRate.low}
              onChange={e => setValues(v => ({ ...v, heartRate: { ...v.heartRate, low: Number(e.target.value) } }))}
              className="text-sm"
              placeholder="Low"
            />
            <span className="text-muted-foreground self-center">-</span>
            <Input
              type="number"
              value={values.heartRate.high}
              onChange={e => setValues(v => ({ ...v, heartRate: { ...v.heartRate, high: Number(e.target.value) } }))}
              className="text-sm"
              placeholder="High"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground">SpO₂ Minimum (%)</label>
          <Input
            type="number"
            value={values.spo2.low}
            onChange={e => setValues(v => ({ ...v, spo2: { low: Number(e.target.value) } }))}
            className="text-sm"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground">Temperature Range (°C)</label>
          <div className="flex gap-2">
            <Input
              type="number"
              step="0.1"
              value={values.temperature.low}
              onChange={e => setValues(v => ({ ...v, temperature: { ...v.temperature, low: Number(e.target.value) } }))}
              className="text-sm"
              placeholder="Low"
            />
            <span className="text-muted-foreground self-center">-</span>
            <Input
              type="number"
              step="0.1"
              value={values.temperature.high}
              onChange={e => setValues(v => ({ ...v, temperature: { ...v.temperature, high: Number(e.target.value) } }))}
              className="text-sm"
              placeholder="High"
            />
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <Button onClick={handleSave} size="sm">
          <Save className="w-4 h-4 mr-1" /> Save
        </Button>
        <Button onClick={handleReset} variant="outline" size="sm">
          Reset Defaults
        </Button>
      </div>
    </div>
  );
};
