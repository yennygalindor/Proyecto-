import { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import {
  fetchSummary,
  fetchRatingDistribution,
  fetchTopRated,
  fetchReviewsPerDay,
  fetchPokemonTypeStats,
} from '../api/stats'

export interface Summary {
  totalReviews: number
  totalPokemonReviewed: number
  avgRating: number
}

export interface TopRatedItem {
  pokemonId: number
  avgRating: number
  totalReviews: number
}

export interface RatingDist {
  rating: string
  count: number
}

export interface ReviewsPerDay {
  date: string
  count: number
}

export interface TypeStat {
  type: string
  count: number
}

export function useStats() {
  const { getAccessTokenSilently } = useAuth0()

  const [summary, setSummary] = useState<Summary | null>(null)
  const [ratingDist, setRatingDist] = useState<RatingDist[]>([])
  const [topRated, setTopRated] = useState<TopRatedItem[]>([])
  const [reviewsPerDay, setReviewsPerDay] = useState<ReviewsPerDay[]>([])
  const [typeStats, setTypeStats] = useState<TypeStat[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    getAccessTokenSilently()
      .then(async (token) => {
        const [sum, dist, top, perDay, types] = await Promise.all([
          fetchSummary(token),
          fetchRatingDistribution(token),
          fetchTopRated(token),
          fetchReviewsPerDay(token),
          fetchPokemonTypeStats(),
        ])
        setSummary(sum)
        setRatingDist(dist)
        setTopRated(top)
        setReviewsPerDay(perDay)
        setTypeStats(types)
      })
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false))
  }, [getAccessTokenSilently])

  return { summary, ratingDist, topRated, reviewsPerDay, typeStats, loading, error }
}
