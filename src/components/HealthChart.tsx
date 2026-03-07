import { HealthData } from '@/lib/types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

interface Props {
  data: HealthData[];
  metric: 'heartRate' | 'spo2' | 'temperature';
  label: string;
  color: string;
}

export const HealthChart = ({ data, metric, label, color }: Props) => {
  const chartData = data.map(d => ({
    time: format(new Date(d.timestamp), 'HH:mm'),
    value: d[metric],
  }));

  return (
    <div className="health-card">
      <h3 className="text-sm font-semibold text-foreground mb-4">{label} - Last 24h</h3>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
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
        </ResponsiveContainer>
      </div>
    </div>
  );
};
