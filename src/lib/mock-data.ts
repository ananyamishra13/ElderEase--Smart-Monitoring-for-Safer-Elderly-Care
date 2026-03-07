import { Patient, User, HealthData, getHealthStatus, Medication } from './types';

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

export function generateHistory(count: number, hoursAgo = 1): HealthData[] {
  const history: HealthData[] = [];
  for (let i = count; i >= 0; i--) {
    const bias = Math.random() > 0.9 ? 'warning' : 'normal';
    const raw = randomHealth(bias);
    const entry: HealthData = {
      ...raw,
      status: getHealthStatus(raw),
      timestamp: new Date(Date.now() - i * hoursAgo * 3600000),
    };
    history.push(entry);
  }
  return history;
}

// Generate weekly data (7 days, 4 readings per day)
export function generateWeeklyHistory(): HealthData[] {
  return generateHistory(28, 6);
}

// Generate monthly data (30 days, 1 reading per day)
export function generateMonthlyHistory(): HealthData[] {
  return generateHistory(30, 24);
}

const DEFAULT_MEDICATIONS: Medication[] = [
  {
    id: 'med1',
    name: 'Lisinopril',
    dosage: '10mg',
    schedule: 'Daily',
    times: ['08:00', '20:00'],
    takenToday: { '08:00': true, '20:00': false },
  },
  {
    id: 'med2',
    name: 'Metformin',
    dosage: '500mg',
    schedule: 'Daily',
    times: ['07:00', '13:00', '19:00'],
    takenToday: { '07:00': true, '13:00': true, '19:00': false },
  },
  {
    id: 'med3',
    name: 'Aspirin',
    dosage: '81mg',
    schedule: 'Daily',
    times: ['09:00'],
    takenToday: { '09:00': false },
  },
];

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
    medications: DEFAULT_MEDICATIONS,
  },
  {
    id: 'p2', name: 'Robert Williams', age: 82, room: 'Room 102',
    currentHealth: makeHealthData('warning'),
    healthHistory: generateHistory(24),
    lastEmergency: new Date(Date.now() - 86400000 * 2),
    caregiverId: 'c1',
    medications: [DEFAULT_MEDICATIONS[0], DEFAULT_MEDICATIONS[2]],
  },
  {
    id: 'p3', name: 'Dorothy Smith', age: 75, room: 'Room 103',
    currentHealth: makeHealthData('normal'),
    healthHistory: generateHistory(24),
    caregiverId: 'c1',
    medications: [DEFAULT_MEDICATIONS[1]],
  },
  {
    id: 'p4', name: 'James Brown', age: 85, room: 'Room 104',
    currentHealth: makeHealthData('emergency'),
    healthHistory: generateHistory(24),
    lastEmergency: new Date(Date.now() - 3600000),
    caregiverId: 'c1',
    medications: DEFAULT_MEDICATIONS,
  },
];
