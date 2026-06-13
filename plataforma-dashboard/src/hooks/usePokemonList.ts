import { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { fetchPokemonList } from '../api/pokemon'
import type { PokemonListResponse } from '../types/pokemon'

const PAGE_SIZE = 20

export function usePokemonList(page: number) {
  const { getAccessTokenSilently } = useAuth0()
  const [data, setData] = useState<PokemonListResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)

    getAccessTokenSilently()
      .then((token) => fetchPokemonList(PAGE_SIZE, (page - 1) * PAGE_SIZE, token))
      .then(setData)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false))
  }, [page, getAccessTokenSilently])

  const totalPages = data ? Math.ceil(data.count / PAGE_SIZE) : 0

  return { data, loading, error, totalPages }
}
