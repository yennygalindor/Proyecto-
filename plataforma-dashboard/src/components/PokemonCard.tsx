import type { PokemonListItem } from '../types/pokemon'
import { TYPE_COLORS } from '../utils/typeColors'

interface Props {
  pokemon: PokemonListItem
  onClick: (name: string) => void
}

export function PokemonCard({ pokemon, onClick }: Props) {
  return (
    <button
      className="pokemon-card"
      onClick={() => onClick(pokemon.name)}
      aria-label={`Ver detalle de ${pokemon.name}`}
    >
      <img
        src={pokemon.sprite}
        alt={pokemon.name}
        loading="lazy"
        className="pokemon-card__img"
      />
      <span className="pokemon-card__id">#{String(pokemon.id).padStart(3, '0')}</span>
      <span className="pokemon-card__name">{pokemon.name}</span>
    </button>
  )
}
