import { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { fetchReviews, fetchMyReview, upsertReview, deleteReview } from '../api/reviews'
import type { ReviewsResponse, Review } from '../types/review'
import { StarRating } from './StarRating'

interface Props {
  pokemonId: number
}

export function ReviewSection({ pokemonId }: Props) {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0()

  const [data, setData] = useState<ReviewsResponse | null>(null)
  const [myReview, setMyReview] = useState<Review | null>(null)
  const [loadingReviews, setLoadingReviews] = useState(true)

  // Formulario
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)

  // Cargar reviews públicas
  const loadReviews = async () => {
    setLoadingReviews(true)
    try {
      const result = await fetchReviews(pokemonId)
      setData(result)
    } catch {
      // silencioso
    } finally {
      setLoadingReviews(false)
    }
  }

  // Cargar mi review si está autenticado
  const loadMyReview = async () => {
    if (!isAuthenticated) return
    try {
      const token = await getAccessTokenSilently()
      const mine = await fetchMyReview(pokemonId, token)
      setMyReview(mine)
      if (mine) {
        setRating(mine.rating)
        setComment(mine.comment ?? '')
      }
    } catch {
      // silencioso
    }
  }

  useEffect(() => {
    loadReviews()
    loadMyReview()
    // reset form al cambiar pokémon
    setShowForm(false)
    setRating(0)
    setComment('')
  }, [pokemonId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (rating === 0) {
      setFormError('Selecciona una calificación')
      return
    }
    setSubmitting(true)
    setFormError(null)
    try {
      const token = await getAccessTokenSilently()
      await upsertReview({ pokemonId, rating, comment }, token)
      setShowForm(false)
      await loadReviews()
      await loadMyReview()
    } catch (e: unknown) {
      setFormError(e instanceof Error ? e.message : 'Error al guardar')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('¿Eliminar tu review?')) return
    try {
      const token = await getAccessTokenSilently()
      await deleteReview(pokemonId, token)
      setMyReview(null)
      setRating(0)
      setComment('')
      await loadReviews()
    } catch {
      // silencioso
    }
  }

  return (
    <div className="review-section">
      <h3 className="modal__section-title">Reseñas</h3>

      {/* Resumen */}
      {data && (
        <div className="review-summary">
          <span className="review-summary__avg">
            {data.averageRating > 0 ? data.averageRating.toFixed(1) : '—'}
          </span>
          <StarRating value={Math.round(data.averageRating)} size="sm" />
          <span className="review-summary__count">
            {data.totalReviews} reseña{data.totalReviews !== 1 ? 's' : ''}
          </span>
        </div>
      )}

      {/* Mi review actual o botón para agregar */}
      {isAuthenticated && (
        <div className="my-review">
          {myReview && !showForm ? (
            <div className="my-review__existing">
              <span className="my-review__label">Tu reseña:</span>
              <StarRating value={myReview.rating} size="sm" />
              {myReview.comment && (
                <p className="my-review__comment">"{myReview.comment}"</p>
              )}
              <div className="my-review__actions">
                <button
                  className="review-btn review-btn--edit"
                  onClick={() => setShowForm(true)}
                >
                  Editar
                </button>
                <button
                  className="review-btn review-btn--delete"
                  onClick={handleDelete}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ) : !showForm ? (
            <button
              className="review-btn review-btn--add"
              onClick={() => setShowForm(true)}
            >
              + Agregar reseña
            </button>
          ) : null}

          {/* Formulario */}
          {showForm && (
            <form className="review-form" onSubmit={handleSubmit}>
              <label className="review-form__label">Calificación</label>
              <StarRating value={rating} onChange={setRating} />

              <label className="review-form__label" htmlFor="comment">
                Comentario (opcional)
              </label>
              <textarea
                id="comment"
                className="review-form__textarea"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="¿Qué piensas de este pokémon?"
                rows={3}
                maxLength={500}
              />

              {formError && (
                <p className="review-form__error">{formError}</p>
              )}

              <div className="review-form__actions">
                <button
                  type="submit"
                  className="review-btn review-btn--submit"
                  disabled={submitting}
                >
                  {submitting ? 'Guardando...' : 'Guardar'}
                </button>
                <button
                  type="button"
                  className="review-btn review-btn--cancel"
                  onClick={() => {
                    setShowForm(false)
                    setFormError(null)
                    if (myReview) {
                      setRating(myReview.rating)
                      setComment(myReview.comment ?? '')
                    } else {
                      setRating(0)
                      setComment('')
                    }
                  }}
                >
                  Cancelar
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {!isAuthenticated && (
        <p className="review-login-hint">Inicia sesión para dejar una reseña</p>
      )}

      {/* Lista de reviews */}
      {!loadingReviews && data && data.reviews.length > 0 && (
        <ul className="review-list">
          {data.reviews.map((r) => (
            <li key={r.id} className="review-item">
              <div className="review-item__header">
                <StarRating value={r.rating} size="sm" />
                <span className="review-item__date">
                  {new Date(r.createdAt).toLocaleDateString('es', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </div>
              {r.comment && (
                <p className="review-item__comment">{r.comment}</p>
              )}
            </li>
          ))}
        </ul>
      )}

      {!loadingReviews && data && data.reviews.length === 0 && (
        <p className="review-empty">Aún no hay reseñas. ¡Sé el primero!</p>
      )}
    </div>
  )
}
