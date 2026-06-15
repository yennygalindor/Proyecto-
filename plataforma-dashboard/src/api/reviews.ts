import type { ReviewsResponse, Review, CreateReviewDto } from '../types/review'

const BASE = '/api/reviews'

// Obtener reviews de un pokémon (público)
export async function fetchReviews(pokemonId: number): Promise<ReviewsResponse> {
  const res = await fetch(`${BASE}/pokemon/${pokemonId}`)
  if (!res.ok) throw new Error('Error al cargar reviews')
  return res.json()
}

// Obtener mi review para un pokémon
export async function fetchMyReview(
  pokemonId: number,
  token: string,
): Promise<Review | null> {
  const res = await fetch(`${BASE}/pokemon/${pokemonId}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (res.status === 404) return null
  if (!res.ok) throw new Error('Error al cargar tu review')
  return res.json()
}

// Crear o actualizar review (upsert)
export async function upsertReview(
  dto: CreateReviewDto,
  token: string,
): Promise<Review> {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(dto),
  })
  if (!res.ok) throw new Error('Error al guardar la review')
  return res.json()
}

// Eliminar mi review
export async function deleteReview(
  pokemonId: number,
  token: string,
): Promise<void> {
  const res = await fetch(`${BASE}/pokemon/${pokemonId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error('Error al eliminar la review')
}
