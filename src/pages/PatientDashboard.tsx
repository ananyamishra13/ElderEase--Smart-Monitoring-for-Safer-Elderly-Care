import { useState, useEffect } from 'react';
import { Activity, Droplets, Thermometer } from 'lucide-react';
import { MOCK_PATIENTS } from '@/lib/mock-data';
import { getHealthStatus, HealthData } from '@/lib/types';
import { HealthMetricCard } from '@/components/HealthMetricCard';
import { StatusBadge } from '@/components/StatusBadge';
import { HealthChart } from '@/components/HealthChart';
import { EmergencyAlert } from '@/components/EmergencyAlert';
import { AppHeader } from '@/components/AppHeader';

const PatientDashboard = () => {
  const [patient, setPatient] = useState(MOCK_PATIENTS[0]);
  const [showEmergency, setShowEmergency] = useState(false);

  // Simulate live data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPatient(prev => {
        const hr = 60 + Math.floor(Math.random() * 45);
        const spo2 = 93 + Math.floor(Math.random() * 7);
        const temp = parseFloat((36.0 + Math.random() * 2.5).toFixed(1));
        const status = getHealthStatus({ heartRate: hr, spo2, temperature: temp });
        const newData: HealthData = { heartRate: hr, spo2, temperature: temp, timestamp: new Date(), status };

        if (status === 'emergency') {
          setShowEmergency(true);
        }

        return {
          ...prev,
          currentHealth: newData,
          healthHistory: [...prev.healthHistory.slice(-23), newData],
          lastEmergency: status === 'emergency' ? new Date() : prev.lastEmergency,
        };
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const { heartRate, spo2, temperature, status } = patient.currentHealth;

  const hrStatus = getHealthStatus({ heartRate, spo2: 98, temperature: 36.5 });
  const spo2Status = getHealthStatus({ heartRate: 75, spo2, temperature: 36.5 });
  const tempStatus = getHealthStatus({ heartRate: 75, spo2: 98, temperature });

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      {showEmergency && <EmergencyAlert patient={patient} onDismiss={() => setShowEmergency(false)} />}

      <main className="container mx-auto px-4 py-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">My Health Dashboard</h1>
            <p className="text-muted-foreground text-sm">Real-time health monitoring</p>
          </div>
          <StatusBadge status={status} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <HealthMetricCard
            label="Heart Rate"
            value={heartRate}
            unit="bpm"
            icon={<Activity className="w-5 h-5" />}
            status={hrStatus}
          />
          <HealthMetricCard
            label="SpO₂"
            value={spo2}
            unit="%"
            icon={<Droplets className="w-5 h-5" />}
            status={spo2Status}
          />
          <HealthMetricCard
            label="Temperature"
            value={temperature}
            unit="°C"
            icon={<Thermometer className="w-5 h-5" />}
            status={tempStatus}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <HealthChart data={patient.healthHistory} metric="heartRate" label="Heart Rate" color="hsl(0, 72%, 55%)" />
          <HealthChart data={patient.healthHistory} metric="spo2" label="SpO₂ Level" color="hsl(200, 80%, 50%)" />
          <HealthChart data={patient.healthHistory} metric="temperature" label="Temperature" color="hsl(35, 92%, 50%)" />
        </div>
      </main>
    </div>
  );
};

export default PatientDashboard;
