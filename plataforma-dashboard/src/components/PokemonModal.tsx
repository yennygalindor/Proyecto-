import { useEffect } from 'react'
import { usePokemonDetail } from '../hooks/usePokemonDetail'
import { TYPE_COLORS } from '../utils/typeColors'

interface Props {
  nameOrId: string
  onClose: () => void
}

export function PokemonModal({ nameOrId, onClose }: Props) {
  const { data, loading, error } = usePokemonDetail(nameOrId)

  // Cerrar con Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={`Detalle de ${nameOrId}`}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal">
        <button className="modal__close" onClick={onClose} aria-label="Cerrar">✕</button>

        {loading && <p className="modal__state">Cargando...</p>}
        {error && <p className="modal__state modal__state--error">{error}</p>}

        {data && (
          <>
            <img src={data.sprite} alt={data.name} className="modal__sprite" />
            <h2 className="modal__title">
              <span className="modal__id">#{String(data.id).padStart(3, '0')}</span>
              {data.name}
            </h2>

            {/* Tipos */}
            <div className="modal__types">
              {data.types.map((t) => (
                <span
                  key={t}
                  className="badge"
                  style={{ backgroundColor: TYPE_COLORS[t] ?? '#777' }}
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Info básica */}
            <div className="modal__info">
              <div className="modal__info-item">
                <span>Altura</span>
                <strong>{(data.height / 10).toFixed(1)} m</strong>
              </div>
              <div className="modal__info-item">
                <span>Peso</span>
                <strong>{(data.weight / 10).toFixed(1)} kg</strong>
              </div>
              <div className="modal__info-item">
                <span>Exp. base</span>
                <strong>{data.base_experience}</strong>
              </div>
            </div>

            {/* Stats */}
            <h3 className="modal__section-title">Estadísticas base</h3>
            <div className="modal__stats">
              {data.stats.map((s) => (
                <div key={s.name} className="stat">
                  <span className="stat__name">{s.name}</span>
                  <div className="stat__bar-track">
                    <div
                      className="stat__bar-fill"
                      style={{ width: `${Math.min((s.base / 255) * 100, 100)}%` }}
                      role="progressbar"
                      aria-valuenow={s.base}
                      aria-valuemin={0}
                      aria-valuemax={255}
                    />
                  </div>
                  <span className="stat__value">{s.base}</span>
                </div>
              ))}
            </div>

            {/* Habilidades */}
            <h3 className="modal__section-title">Habilidades</h3>
            <div className="modal__abilities">
              {data.abilities.map((a) => (
                <span key={a.name} className={`badge ${a.hidden ? 'badge--hidden' : ''}`}>
                  {a.name} {a.hidden && '(oculta)'}
                </span>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
