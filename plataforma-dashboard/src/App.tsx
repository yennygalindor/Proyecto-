import { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { usePokemonList } from './hooks/usePokemonList'
import { PokemonCard } from './components/PokemonCard'
import { PokemonModal } from './components/PokemonModal'
import { SearchBar } from './components/SearchBar'
import { Pagination } from './components/Pagination'
import { LoginPage } from './components/LoginPage'
import { UserMenu } from './components/UserMenu'
import { ReportsPage } from './pages/ReportsPage'

type Tab = 'pokedex' | 'reports'

export default function App() {
  const { isAuthenticated, isLoading } = useAuth0()
  const [tab, setTab] = useState<Tab>('pokedex')
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState<string | null>(null)

  if (isLoading) {
    return (
      <div className="login-page">
        <div className="state-message">Cargando...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <LoginPage />
  }

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">
          <span role="img" aria-label="pokeball">⚪</span> Pokédex Dashboard
        </h1>

        {/* Tabs de navegación */}
        <nav className="app__tabs" aria-label="Navegación principal">
          <button
            className={`app__tab ${tab === 'pokedex' ? 'app__tab--active' : ''}`}
            onClick={() => setTab('pokedex')}
          >
            🗂 Pokédex
          </button>
          <button
            className={`app__tab ${tab === 'reports' ? 'app__tab--active' : ''}`}
            onClick={() => setTab('reports')}
          >
            📊 Reportes
          </button>
        </nav>

        {tab === 'pokedex' && <SearchBar onSearch={(q) => q && setSelected(q)} />}
        <UserMenu />
      </header>

      <main className="app__main">
        {tab === 'pokedex' ? (
          <PokedexView
            page={page}
            setPage={setPage}
            selected={selected}
            setSelected={setSelected}
          />
        ) : (
          <ReportsPage />
        )}
      </main>

      {selected && tab === 'pokedex' && (
        <PokemonModal nameOrId={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  )
}

interface PokedexViewProps {
  page: number
  setPage: (p: number) => void
  selected: string | null
  setSelected: (s: string | null) => void
}

function PokedexView({ page, setPage, setSelected }: PokedexViewProps) {
  const { data, loading, error, totalPages } = usePokemonList(page)

  return (
    <>
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
            onPageChange={(newPage) => {
              setPage(newPage)
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          />
        </>
      )}
    </>
  )
}
