import { useState } from 'react'

interface Props {
  onSearch: (query: string) => void
}

export function SearchBar({ onSearch }: Props) {
  const [value, setValue] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = value.trim().toLowerCase()
    if (trimmed) onSearch(trimmed)
  }

  const handleClear = () => {
    setValue('')
    onSearch('')
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit} role="search">
      <input
        type="search"
        className="search-bar__input"
        placeholder="Buscar por nombre o número..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        aria-label="Buscar pokémon"
      />
      <button type="submit" className="search-bar__btn" aria-label="Buscar">
        🔍
      </button>
      {value && (
        <button
          type="button"
          className="search-bar__btn search-bar__btn--clear"
          onClick={handleClear}
          aria-label="Limpiar búsqueda"
        >
          ✕
        </button>
      )}
    </form>
  )
}
