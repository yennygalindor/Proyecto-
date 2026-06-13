import { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { fetchPokemonDetail } from '../api/pokemon'
import type { PokemonDetail } from '../types/pokemon'

export function usePokemonDetail(nameOrId: string | null) {
  const { getAccessTokenSilently } = useAuth0()
  const [data, setData] = useState<PokemonDetail | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!nameOrId) {
      setData(null)
      return
    }
    setLoading(true)
    setError(null)

    getAccessTokenSilently()
      .then((token) => fetchPokemonDetail(nameOrId, token))
      .then(setData)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false))
  }, [nameOrId, getAccessTokenSilently])

  return { data, loading, error }
}
