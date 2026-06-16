const BASE = '/api/stats'

async function authFetch(url: string, token: string) {
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error(`Error ${res.status}`)
  return res.json()
}

export async function fetchSummary(token: string) {
  return authFetch(`${BASE}/summary`, token)
}

export async function fetchRatingDistribution(token: string) {
  return authFetch(`${BASE}/rating-distribution`, token)
}

export async function fetchTopRated(token: string) {
  return authFetch(`${BASE}/top-rated`, token)
}

export async function fetchReviewsPerDay(token: string) {
  return authFetch(`${BASE}/reviews-per-day`, token)
}

// Obtener distribución de tipos desde PokéAPI (endpoint de tipos, más eficiente)
export async function fetchPokemonTypeStats(): Promise<
  { type: string; count: number }[]
> {
  const res = await fetch('https://pokeapi.co/api/v2/type?limit=20')
  const data = await res.json()

  const results = await Promise.all(
    data.results.map(async (t: { name: string; url: string }) => {
      const r = await fetch(t.url)
      const d = await r.json()
      // pokemon es un array de { pokemon: {...}, slot: number }
      const count = (d.pokemon as unknown[]).length
      return { type: t.name, count }
    }),
  )

  // Excluir tipos especiales sin pokémon reales
  return results
    .filter((t) => t.count > 0 && t.type !== 'unknown' && t.type !== 'shadow')
    .sort((a, b) => b.count - a.count)
}
