import { useState, useEffect } from 'react';
import { MOCK_PATIENTS } from '@/lib/mock-data';
import { Patient, getHealthStatus, HealthData } from '@/lib/types';
import { PatientCard } from '@/components/PatientCard';
import { AppHeader } from '@/components/AppHeader';
import { Users, AlertTriangle, CheckCircle } from 'lucide-react';

const CaregiverDashboard = () => {
  const [patients, setPatients] = useState<Patient[]>(MOCK_PATIENTS);

  useEffect(() => {
    const interval = setInterval(() => {
      setPatients(prev =>
        prev.map(p => {
          const hr = 55 + Math.floor(Math.random() * 55);
          const spo2 = 88 + Math.floor(Math.random() * 12);
          const temp = parseFloat((35.5 + Math.random() * 3.5).toFixed(1));
          const status = getHealthStatus({ heartRate: hr, spo2, temperature: temp });
          const newData: HealthData = { heartRate: hr, spo2, temperature: temp, timestamp: new Date(), status };
          return {
            ...p,
            currentHealth: newData,
            lastEmergency: status === 'emergency' ? new Date() : p.lastEmergency,
          };
        })
      );
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const emergencyCount = patients.filter(p => p.currentHealth.status === 'emergency').length;
  const warningCount = patients.filter(p => p.currentHealth.status === 'warning').length;

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className="container mx-auto px-4 py-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Caregiver Dashboard</h1>
          <p className="text-muted-foreground text-sm">Monitoring {patients.length} patients</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="health-card flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Patients</p>
              <p className="text-2xl font-bold text-foreground">{patients.length}</p>
            </div>
          </div>
          <div className="health-card flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-status-emergency-bg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-status-emergency" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Emergencies</p>
              <p className="text-2xl font-bold text-status-emergency">{emergencyCount}</p>
            </div>
          </div>
          <div className="health-card flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-status-normal-bg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-status-normal" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Warnings</p>
              <p className="text-2xl font-bold text-status-warning">{warningCount}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {patients
            .sort((a, b) => {
              const order = { emergency: 0, warning: 1, normal: 2 };
              return order[a.currentHealth.status] - order[b.currentHealth.status];
            })
            .map(p => (
              <PatientCard key={p.id} patient={p} />
            ))}
        </div>
      </main>
    </div>
  );
};

export default CaregiverDashboard;
