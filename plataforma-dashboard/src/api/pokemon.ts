import type { PokemonListResponse, PokemonDetail } from '../types/pokemon'

const BASE = '/api/pokemon'

// Función auxiliar para fetch autenticado
async function authFetch(url: string, token: string) {
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  if (!res.ok) {
    const msg = await res.text()
    throw new Error(msg || `Error ${res.status}`)
  }
  return res.json()
}

export async function fetchPokemonList(
  limit: number,
  offset: number,
  token: string,
): Promise<PokemonListResponse> {
  return authFetch(`${BASE}?limit=${limit}&offset=${offset}`, token)
}

export async function fetchPokemonDetail(
  nameOrId: string,
  token: string,
): Promise<PokemonDetail> {
  return authFetch(`${BASE}/${nameOrId}`, token)
}
