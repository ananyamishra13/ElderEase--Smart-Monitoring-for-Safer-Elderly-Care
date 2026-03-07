import { useState } from 'react';
import { Medication } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Pill, Check, AlertTriangle, Plus, X, Clock } from 'lucide-react';
import { toast } from 'sonner';

interface Props {
  medications: Medication[];
  onUpdate: (meds: Medication[]) => void;
}

export const MedicationReminder = ({ medications, onUpdate }: Props) => {
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDosage, setNewDosage] = useState('');
  const [newTimes, setNewTimes] = useState('08:00');

  const handleMarkTaken = (medId: string, time: string) => {
    const updated = medications.map(m =>
      m.id === medId
        ? { ...m, takenToday: { ...m.takenToday, [time]: true } }
        : m
    );
    onUpdate(updated);
    toast.success('Medication marked as taken!');
  };

  const handleAdd = () => {
    if (!newName.trim() || !newDosage.trim()) return;
    const times = newTimes.split(',').map(t => t.trim());
    const takenToday: Record<string, boolean> = {};
    times.forEach(t => (takenToday[t] = false));
    const med: Medication = {
      id: `med-${Date.now()}`,
      name: newName.trim(),
      dosage: newDosage.trim(),
      schedule: 'Daily',
      times,
      takenToday,
    };
    onUpdate([...medications, med]);
    setNewName('');
    setNewDosage('');
    setNewTimes('08:00');
    setShowAdd(false);
    toast.success(`${med.name} added to schedule`);
  };

  const handleRemove = (medId: string) => {
    onUpdate(medications.filter(m => m.id !== medId));
    toast('Medication removed');
  };

  const now = new Date();
  const currentHour = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  return (
    <div className="health-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Pill className="w-5 h-5 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Medication Schedule</h3>
        </div>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-3 h-3" />
          Add
        </button>
      </div>

      {showAdd && (
        <div className="bg-secondary rounded-lg p-3 mb-4 space-y-2">
          <Input
            placeholder="Medicine name"
            value={newName}
            onChange={e => setNewName(e.target.value)}
            className="text-sm"
          />
          <div className="flex gap-2">
            <Input
              placeholder="Dosage (e.g. 10mg)"
              value={newDosage}
              onChange={e => setNewDosage(e.target.value)}
              className="text-sm"
            />
            <Input
              placeholder="Times (e.g. 08:00,20:00)"
              value={newTimes}
              onChange={e => setNewTimes(e.target.value)}
              className="text-sm"
            />
          </div>
          <div className="flex gap-2">
            <Button size="sm" onClick={handleAdd}>Add Medicine</Button>
            <Button size="sm" variant="outline" onClick={() => setShowAdd(false)}>Cancel</Button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {medications.map(med => {
          const missedTimes = Object.entries(med.takenToday)
            .filter(([time, taken]) => !taken && time < currentHour)
            .map(([time]) => time);
          const hasMissed = missedTimes.length > 0;

          return (
            <div
              key={med.id}
              className={`rounded-lg border p-3 ${hasMissed ? 'border-status-warning bg-status-warning-bg' : 'border-border'}`}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <span className="font-medium text-sm text-foreground">{med.name}</span>
                  <span className="text-xs text-muted-foreground ml-2">{med.dosage} · {med.schedule}</span>
                </div>
                <button onClick={() => handleRemove(med.id)} className="text-muted-foreground hover:text-destructive">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {hasMissed && (
                <div className="flex items-center gap-1 text-xs text-status-warning mb-2">
                  <AlertTriangle className="w-3 h-3" />
                  Missed dose at {missedTimes.join(', ')}
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                {med.times.map(time => {
                  const taken = med.takenToday[time];
                  const missed = !taken && time < currentHour;
                  return (
                    <button
                      key={time}
                      onClick={() => !taken && handleMarkTaken(med.id, time)}
                      disabled={taken}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                        taken
                          ? 'bg-status-normal-bg text-status-normal'
                          : missed
                          ? 'bg-status-warning-bg text-status-warning hover:bg-status-warning/20 cursor-pointer'
                          : 'bg-secondary text-secondary-foreground hover:bg-secondary/80 cursor-pointer'
                      }`}
                    >
                      {taken ? <Check className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                      {time}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
        {medications.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">No medications scheduled. Click "Add" to set up reminders.</p>
        )}
      </div>
    </div>
  );
};
