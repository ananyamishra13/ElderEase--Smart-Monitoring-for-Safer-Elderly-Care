import { useState } from 'react';
import { HealthData } from '@/lib/types';
import { generateWeeklyHistory, generateMonthlyHistory } from '@/lib/mock-data';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { format } from 'date-fns';

type TimeRange = '24h' | 'weekly' | 'monthly';

interface Props {
  data: HealthData[];
  metric: 'heartRate' | 'spo2' | 'temperature';
  label: string;
  color: string;
}

export const HealthChart = ({ data, metric, label, color }: Props) => {
  const [range, setRange] = useState<TimeRange>('24h');

  const getChartData = () => {
    if (range === '24h') {
      return data.map(d => ({
        time: format(new Date(d.timestamp), 'HH:mm'),
        value: d[metric],
      }));
    }
    if (range === 'weekly') {
      const weekly = generateWeeklyHistory();
      // Group by day and average
      const grouped: Record<string, number[]> = {};
      weekly.forEach(d => {
        const day = format(new Date(d.timestamp), 'EEE');
        if (!grouped[day]) grouped[day] = [];
        grouped[day].push(d[metric]);
      });
      return Object.entries(grouped).map(([day, values]) => ({
        time: day,
        value: Math.round(values.reduce((a, b) => a + b, 0) / values.length * 10) / 10,
      }));
    }
    // monthly
    const monthly = generateMonthlyHistory();
    return monthly.map(d => ({
      time: format(new Date(d.timestamp), 'MMM dd'),
      value: d[metric],
    }));
  };

  const chartData = getChartData();
  const tabs: { key: TimeRange; label: string }[] = [
    { key: '24h', label: '24 Hours' },
    { key: 'weekly', label: 'Weekly Avg' },
    { key: 'monthly', label: 'Monthly' },
  ];

  return (
    <div className="health-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground">{label}</h3>
        <div className="flex gap-1">
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setRange(t.key)}
              className={`px-2 py-1 text-xs rounded-md font-medium transition-colors ${
                range === t.key
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-secondary'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          {range === 'weekly' ? (
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="time" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
              />
              <Bar dataKey="value" fill={color} radius={[4, 4, 0, 0]} />
            </BarChart>
          ) : (
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="time" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
              />
              <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={false} />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};
