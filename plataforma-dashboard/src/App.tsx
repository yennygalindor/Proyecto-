import { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { usePokemonList } from './hooks/usePokemonList'
import { PokemonCard } from './components/PokemonCard'
import { PokemonModal } from './components/PokemonModal'
import { SearchBar } from './components/SearchBar'
import { Pagination } from './components/Pagination'
import { LoginPage } from './components/LoginPage'
import { UserMenu } from './components/UserMenu'

export default function App() {
  const { isAuthenticated, isLoading } = useAuth0()
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState<string | null>(null)

  // Pantalla de carga mientras Auth0 inicializa
  if (isLoading) {
    return (
      <div className="login-page">
        <div className="state-message">Cargando...</div>
      </div>
    )
  }

  // Si no está autenticado, mostrar pantalla de login
  if (!isAuthenticated) {
    return <LoginPage />
  }

  return <Dashboard page={page} setPage={setPage} selected={selected} setSelected={setSelected} />
}

// Componente separado para evitar llamar hooks condicionalmente
interface DashboardProps {
  page: number
  setPage: (p: number) => void
  selected: string | null
  setSelected: (s: string | null) => void
}

function Dashboard({ page, setPage, selected, setSelected }: DashboardProps) {
  const { data, loading, error, totalPages } = usePokemonList(page)

  const handleSearch = (query: string) => {
    if (query) setSelected(query)
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">
          <span role="img" aria-label="pokeball">⚪</span> Pokédex Dashboard
        </h1>
        <SearchBar onSearch={handleSearch} />
        <UserMenu />
      </header>

      <main className="app__main">
        {loading && (
          <div className="state-message" role="status" aria-live="polite">
            Cargando pokémon...
          </div>
        )}

        {error && (
          <div className="state-message state-message--error" role="alert">
            {error}
          </div>
        )}

        {!loading && !error && data && (
          <>
            <p className="app__count">{data.count.toLocaleString()} pokémon en total</p>
            <div className="pokemon-grid" role="list">
              {data.results.map((p) => (
                <div key={p.id} role="listitem">
                  <PokemonCard pokemon={p} onClick={setSelected} />
                </div>
              ))}
            </div>
            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </main>

      {selected && (
        <PokemonModal nameOrId={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  )
}
