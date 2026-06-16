import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell, LabelList,
} from 'recharts'
import type { TopRatedItem } from '../../hooks/useStats'

interface Props { data: TopRatedItem[] }

export function TopRatedChart({ data }: Props) {
  if (data.length === 0) {
    return (
      <div className="chart-card">
        <h3 className="chart-card__title">Top 10 Pokémon mejor calificados</h3>
        <p className="chart-empty">Aún no hay reseñas suficientes</p>
      </div>
    )
  }

  const formatted = data.map((d) => ({
    ...d,
    label: `#${d.pokemonId}`,
  }))

  return (
    <div className="chart-card">
      <h3 className="chart-card__title">Top 10 Pokémon mejor calificados</h3>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart
          data={formatted}
          layout="vertical"
          margin={{ top: 5, right: 50, left: 10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#0f3460" horizontal={false} />
          <XAxis
            type="number"
            domain={[0, 5]}
            tick={{ fill: '#8892b0', fontSize: 11 }}
            tickCount={6}
          />
          <YAxis
            type="category"
            dataKey="label"
            tick={{ fill: '#8892b0', fontSize: 11 }}
            width={40}
          />
          <Tooltip
            contentStyle={{ background: '#16213e', border: '1px solid #0f3460', borderRadius: 8 }}
            labelStyle={{ color: '#eaeaea' }}
            itemStyle={{ color: '#eaeaea' }}
            formatter={(v: number, _: string, props: { payload: TopRatedItem }) => [
              `${v}★ (${props.payload.totalReviews} reseñas)`,
              'Calificación',
            ]}
          />
          <Bar dataKey="avgRating" name="Promedio" radius={[0, 4, 4, 0]}>
            <LabelList
              dataKey="avgRating"
              position="right"
              style={{ fill: '#f5a623', fontSize: 11, fontWeight: 700 }}
              formatter={(v: number) => `${v}★`}
            />
            {formatted.map((_, i) => (
              <Cell
                key={i}
                fill={`hsl(${200 + i * 15}, 70%, 55%)`}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
