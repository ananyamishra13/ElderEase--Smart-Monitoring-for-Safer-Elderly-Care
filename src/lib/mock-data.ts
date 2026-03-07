import { Patient, User, HealthData, getHealthStatus } from './types';

function randomHealth(bias: 'normal' | 'warning' | 'emergency' = 'normal'): Omit<HealthData, 'status'> & { status?: never } {
  let hr: number, spo2: number, temp: number;
  if (bias === 'emergency') {
    hr = Math.random() > 0.5 ? 125 + Math.floor(Math.random() * 15) : 40 + Math.floor(Math.random() * 5);
    spo2 = 85 + Math.floor(Math.random() * 5);
    temp = 39.2 + Math.random() * 1.5;
  } else if (bias === 'warning') {
    hr = 100 + Math.floor(Math.random() * 15);
    spo2 = 92 + Math.floor(Math.random() * 3);
    temp = 37.6 + Math.random() * 0.8;
  } else {
    hr = 65 + Math.floor(Math.random() * 25);
    spo2 = 96 + Math.floor(Math.random() * 4);
    temp = 36.2 + Math.random() * 1.0;
  }
  return { heartRate: hr, spo2, temperature: parseFloat(temp.toFixed(1)), timestamp: new Date() };
}

function makeHealthData(bias: 'normal' | 'warning' | 'emergency'): HealthData {
  const raw = randomHealth(bias);
  return { ...raw, status: getHealthStatus(raw) };
}

function generateHistory(count: number): HealthData[] {
  const history: HealthData[] = [];
  for (let i = count; i >= 0; i--) {
    const bias = Math.random() > 0.9 ? 'warning' : 'normal';
    const raw = randomHealth(bias);
    const entry: HealthData = {
      ...raw,
      status: getHealthStatus(raw),
      timestamp: new Date(Date.now() - i * 3600000),
    };
    history.push(entry);
  }
  return history;
}

export const MOCK_USERS: User[] = [
  { id: 'p1', name: 'Margaret Johnson', role: 'patient', email: 'margaret@example.com' },
  { id: 'c1', name: 'Dr. Sarah Chen', role: 'caregiver', email: 'sarah@example.com' },
];

export const MOCK_PATIENTS: Patient[] = [
  {
    id: 'p1', name: 'Margaret Johnson', age: 78, room: 'Room 101',
    currentHealth: makeHealthData('normal'),
    healthHistory: generateHistory(24),
    caregiverId: 'c1',
  },
  {
    id: 'p2', name: 'Robert Williams', age: 82, room: 'Room 102',
    currentHealth: makeHealthData('warning'),
    healthHistory: generateHistory(24),
    lastEmergency: new Date(Date.now() - 86400000 * 2),
    caregiverId: 'c1',
  },
  {
    id: 'p3', name: 'Dorothy Smith', age: 75, room: 'Room 103',
    currentHealth: makeHealthData('normal'),
    healthHistory: generateHistory(24),
    caregiverId: 'c1',
  },
  {
    id: 'p4', name: 'James Brown', age: 85, room: 'Room 104',
    currentHealth: makeHealthData('emergency'),
    healthHistory: generateHistory(24),
    lastEmergency: new Date(Date.now() - 3600000),
    caregiverId: 'c1',
  },
];
