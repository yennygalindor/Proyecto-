export interface PokemonListItem {
  id: number
  name: string
  sprite: string
  url: string
}

export interface PokemonListResponse {
  count: number
  next: string | null
  previous: string | null
  results: PokemonListItem[]
}

export interface PokemonDetail {
  id: number
  name: string
  height: number
  weight: number
  base_experience: number
  sprite: string
  types: string[]
  abilities: { name: string; hidden: boolean }[]
  stats: { name: string; base: number }[]
}
