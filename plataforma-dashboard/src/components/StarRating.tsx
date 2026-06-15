interface Props {
  value: number        // calificación actual (0-5)
  onChange?: (v: number) => void  // si se pasa, es interactivo
  size?: 'sm' | 'md'
}

export function StarRating({ value, onChange, size = 'md' }: Props) {
  const stars = [1, 2, 3, 4, 5]
  const fontSize = size === 'sm' ? '1rem' : '1.5rem'

  return (
    <div
      className="star-rating"
      style={{ fontSize }}
      role={onChange ? 'radiogroup' : 'img'}
      aria-label={`Calificación: ${value} de 5 estrellas`}
    >
      {stars.map((star) => (
        <button
          key={star}
          type="button"
          className={`star ${star <= value ? 'star--filled' : 'star--empty'}`}
          onClick={() => onChange?.(star)}
          disabled={!onChange}
          aria-label={`${star} estrella${star > 1 ? 's' : ''}`}
          style={{ cursor: onChange ? 'pointer' : 'default' }}
        >
          {star <= value ? '★' : '☆'}
        </button>
      ))}
    </div>
  )
}
