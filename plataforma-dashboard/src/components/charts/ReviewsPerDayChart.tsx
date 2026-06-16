import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from 'recharts'
import type { ReviewsPerDay } from '../../hooks/useStats'

interface Props { data: ReviewsPerDay[] }

export function ReviewsPerDayChart({ data }: Props) {
  if (data.length === 0) {
    return (
      <div className="chart-card">
        <h3 className="chart-card__title">Actividad de reseñas (últimos 30 días)</h3>
        <p className="chart-empty">Sin actividad reciente</p>
      </div>
    )
  }

  const formatted = data.map((d) => ({
    ...d,
    label: new Date(d.date).toLocaleDateString('es', {
      day: '2-digit',
      month: 'short',
    }),
  }))

  return (
    <div className="chart-card">
      <h3 className="chart-card__title">Actividad de reseñas (últimos 30 días)</h3>
      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={formatted} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="colorReviews" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#e94560" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#e94560" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#0f3460" />
          <XAxis dataKey="label" tick={{ fill: '#8892b0', fontSize: 11 }} />
          <YAxis allowDecimals={false} tick={{ fill: '#8892b0', fontSize: 11 }} />
          <Tooltip
            contentStyle={{ background: '#16213e', border: '1px solid #0f3460', borderRadius: 8 }}
            labelStyle={{ color: '#eaeaea' }}
            itemStyle={{ color: '#eaeaea' }}
            formatter={(v: number) => [v, 'Reseñas']}
          />
          <Area
            type="monotone"
            dataKey="count"
            stroke="#e94560"
            strokeWidth={2}
            fill="url(#colorReviews)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
