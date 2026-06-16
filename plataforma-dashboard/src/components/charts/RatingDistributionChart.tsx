import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
} from 'recharts'
import type { RatingDist } from '../../hooks/useStats'

const COLORS = ['#e94560', '#f5a623', '#78C850', '#6890F0', '#A040A0']

interface Props { data: RatingDist[] }

export function RatingDistributionChart({ data }: Props) {
  const total = data.reduce((s, d) => s + d.count, 0)

  if (total === 0) {
    return (
      <div className="chart-card">
        <h3 className="chart-card__title">Distribución de calificaciones</h3>
        <p className="chart-empty">Aún no hay reseñas</p>
      </div>
    )
  }

  return (
    <div className="chart-card">
      <h3 className="chart-card__title">Distribución de calificaciones</h3>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            dataKey="count"
            nameKey="rating"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={3}
            label={({ rating, percent }) =>
              `${rating} (${(percent * 100).toFixed(0)}%)`
            }
            labelLine={false}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ background: '#16213e', border: '1px solid #0f3460', borderRadius: 8 }}
            itemStyle={{ color: '#eaeaea' }}
            formatter={(value: number) => [`${value} reseñas`, '']}
          />
          <Legend
            formatter={(value) => (
              <span style={{ color: '#8892b0', fontSize: 12 }}>{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
