import { useEffect, useRef, useState } from 'react';
import { AlertTriangle, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Patient } from '@/lib/types';

interface Props {
  patient: Patient;
  onDismiss: () => void;
}

export const EmergencyAlert = ({ patient, onDismiss }: Props) => {
  const audioRef = useRef<AudioContext | null>(null);
  const [buzzing, setBuzzing] = useState(true);

  useEffect(() => {
    // Create buzzer sound
    try {
      const ctx = new AudioContext();
      audioRef.current = ctx;
      const playBeep = () => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = 880;
        gain.gain.value = 0.3;
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
      };
      playBeep();
      const interval = setInterval(playBeep, 1000);
      return () => {
        clearInterval(interval);
        ctx.close();
      };
    } catch {
      // Audio not supported
    }
  }, []);

  const handleCallCaregiver = () => {
    setBuzzing(false);
    audioRef.current?.close();
    onDismiss();
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${buzzing ? 'emergency-flash' : ''}`}
      style={{ backgroundColor: 'hsl(0 72% 55% / 0.2)', backdropFilter: 'blur(8px)' }}>
      <div className="bg-card rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl border-2 border-status-emergency">
        <div className="w-20 h-20 rounded-full bg-status-emergency-bg flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-10 h-10 text-status-emergency" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Emergency Detected</h2>
        <p className="text-muted-foreground mb-2">
          Critical health readings for <strong>{patient.name}</strong>
        </p>
        <div className="bg-status-emergency-bg rounded-lg p-3 mb-6 text-sm text-status-emergency">
          HR: {patient.currentHealth.heartRate} bpm · SpO₂: {patient.currentHealth.spo2}% · Temp: {patient.currentHealth.temperature}°C
        </div>
        <Button
          onClick={handleCallCaregiver}
          className="w-full bg-status-emergency hover:bg-status-emergency/90 text-primary-foreground"
          size="lg"
        >
          <Phone className="w-5 h-5 mr-2" />
          Call Caregiver
        </Button>
      </div>
    </div>
  );
};
