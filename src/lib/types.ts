export type UserRole = 'patient' | 'caregiver';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  avatar?: string;
}

export type HealthStatus = 'normal' | 'warning' | 'emergency';

export interface HealthData {
  heartRate: number;
  spo2: number;
  temperature: number;
  timestamp: Date;
  status: HealthStatus;
}

export interface PersonalThresholds {
  heartRate: { low: number; high: number };
  spo2: { low: number };
  temperature: { low: number; high: number };
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  schedule: string; // e.g. "08:00", "14:00", "20:00"
  times: string[];
  takenToday: Record<string, boolean>; // time -> taken
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  room: string;
  avatar?: string;
  currentHealth: HealthData;
  healthHistory: HealthData[];
  lastEmergency?: Date;
  caregiverId: string;
  thresholds?: PersonalThresholds;
  medications: Medication[];
}

export const DEFAULT_THRESHOLDS: PersonalThresholds = {
  heartRate: { low: 60, high: 100 },
  spo2: { low: 95 },
  temperature: { low: 36.1, high: 37.5 },
};

export const THRESHOLDS = {
  heartRate: { low: 60, high: 100, emergencyHigh: 120, emergencyLow: 45 },
  spo2: { low: 95, emergencyLow: 90 },
  temperature: { low: 36.1, high: 37.5, emergencyHigh: 39, emergencyLow: 35 },
};

export function getHealthStatus(data: Pick<HealthData, 'heartRate' | 'spo2' | 'temperature'>, custom?: PersonalThresholds): HealthStatus {
  const { heartRate, spo2, temperature } = data;
  // Emergency thresholds (always fixed)
  if (
    heartRate > THRESHOLDS.heartRate.emergencyHigh ||
    heartRate < THRESHOLDS.heartRate.emergencyLow ||
    spo2 < THRESHOLDS.spo2.emergencyLow ||
    temperature > THRESHOLDS.temperature.emergencyHigh ||
    temperature < THRESHOLDS.temperature.emergencyLow
  ) {
    return 'emergency';
  }
  // Warning thresholds (use custom if provided)
  const t = custom || DEFAULT_THRESHOLDS;
  if (
    heartRate > t.heartRate.high ||
    heartRate < t.heartRate.low ||
    spo2 < t.spo2.low ||
    temperature > t.temperature.high ||
    temperature < t.temperature.low
  ) {
    return 'warning';
  }
  return 'normal';
}

export function calculateHealthScore(history: HealthData[]): { score: number; warnings: number; emergencies: number } {
  if (history.length === 0) return { score: 100, warnings: 0, emergencies: 0 };
  
  let warnings = 0;
  let emergencies = 0;
  
  // Only consider last 24 entries
  const recent = history.slice(-24);
  recent.forEach(d => {
    if (d.status === 'warning') warnings++;
    if (d.status === 'emergency') emergencies++;
  });
  
  const total = recent.length;
  const normalCount = total - warnings - emergencies;
  // Score: 100 base, -3 per warning, -10 per emergency
  const score = Math.max(0, Math.min(100, Math.round((normalCount / total) * 100 - emergencies * 7)));
  
  return { score, warnings, emergencies };
}
