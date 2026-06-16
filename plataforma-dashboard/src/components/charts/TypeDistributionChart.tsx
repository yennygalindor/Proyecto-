import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell,
} from 'recharts'
import { TYPE_COLORS } from '../../utils/typeColors'
import type { TypeStat } from '../../hooks/useStats'

interface Props { data: TypeStat[] }

export function TypeDistributionChart({ data }: Props) {
  return (
    <div className="chart-card">
      <h3 className="chart-card__title">Pokémon por tipo</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#0f3460" />
          <XAxis
            dataKey="type"
            tick={{ fill: '#8892b0', fontSize: 11 }}
            angle={-45}
            textAnchor="end"
            interval={0}
          />
          <YAxis tick={{ fill: '#8892b0', fontSize: 11 }} />
          <Tooltip
            contentStyle={{ background: '#16213e', border: '1px solid #0f3460', borderRadius: 8 }}
            labelStyle={{ color: '#eaeaea', textTransform: 'capitalize' }}
            itemStyle={{ color: '#eaeaea' }}
          />
          <Bar dataKey="count" name="Pokémon" radius={[4, 4, 0, 0]}>
            {data.map((entry) => (
              <Cell
                key={entry.type}
                fill={TYPE_COLORS[entry.type] ?? '#e94560'}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
