import type { Summary } from '../../hooks/useStats'

interface Props { data: Summary }

export function SummaryCards({ data }: Props) {
  const cards = [
    {
      label: 'Total reseñas',
      value: data.totalReviews.toLocaleString(),
      icon: '📝',
    },
    {
      label: 'Pokémon reseñados',
      value: data.totalPokemonReviewed.toLocaleString(),
      icon: '⚡',
    },
    {
      label: 'Calificación promedio',
      value: data.avgRating > 0 ? `${data.avgRating} ★` : '—',
      icon: '⭐',
    },
  ]

  return (
    <div className="summary-cards">
      {cards.map((c) => (
        <div key={c.label} className="summary-card">
          <span className="summary-card__icon">{c.icon}</span>
          <span className="summary-card__value">{c.value}</span>
          <span className="summary-card__label">{c.label}</span>
        </div>
      ))}
    </div>
  )
}
