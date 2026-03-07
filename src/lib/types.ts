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
}

export const THRESHOLDS = {
  heartRate: { low: 60, high: 100, emergencyHigh: 120, emergencyLow: 45 },
  spo2: { low: 95, emergencyLow: 90 },
  temperature: { low: 36.1, high: 37.5, emergencyHigh: 39, emergencyLow: 35 },
};

export function getHealthStatus(data: Pick<HealthData, 'heartRate' | 'spo2' | 'temperature'>): HealthStatus {
  const { heartRate, spo2, temperature } = data;
  if (
    heartRate > THRESHOLDS.heartRate.emergencyHigh ||
    heartRate < THRESHOLDS.heartRate.emergencyLow ||
    spo2 < THRESHOLDS.spo2.emergencyLow ||
    temperature > THRESHOLDS.temperature.emergencyHigh ||
    temperature < THRESHOLDS.temperature.emergencyLow
  ) {
    return 'emergency';
  }
  if (
    heartRate > THRESHOLDS.heartRate.high ||
    heartRate < THRESHOLDS.heartRate.low ||
    spo2 < THRESHOLDS.spo2.low ||
    temperature > THRESHOLDS.temperature.high ||
    temperature < THRESHOLDS.temperature.low
  ) {
    return 'warning';
  }
  return 'normal';
}
