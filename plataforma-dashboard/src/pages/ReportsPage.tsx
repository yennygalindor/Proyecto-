import { useStats } from '../hooks/useStats'
import { SummaryCards } from '../components/charts/SummaryCards'
import { TypeDistributionChart } from '../components/charts/TypeDistributionChart'
import { RatingDistributionChart } from '../components/charts/RatingDistributionChart'
import { ReviewsPerDayChart } from '../components/charts/ReviewsPerDayChart'
import { TopRatedChart } from '../components/charts/TopRatedChart'
import { exportToCsv } from '../utils/exportCsv'

export function ReportsPage() {
  const { summary, ratingDist, topRated, reviewsPerDay, typeStats, loading, error } =
    useStats()

  const handleExportTopRated = () => {
    exportToCsv(
      'top-pokemon-calificados',
      topRated.map((r) => ({
        pokemon_id: r.pokemonId,
        calificacion_promedio: r.avgRating,
        total_resenas: r.totalReviews,
      })),
    )
  }

  const handleExportActivity = () => {
    exportToCsv(
      'actividad-resenas',
      reviewsPerDay.map((r) => ({
        fecha: r.date,
        resenas: r.count,
      })),
    )
  }

  const handleExportTypes = () => {
    exportToCsv(
      'distribucion-tipos',
      typeStats.map((t) => ({
        tipo: t.type,
        cantidad: t.count,
      })),
    )
  }

  if (loading) {
    return (
      <div className="reports-page">
        <div className="state-message" role="status">Cargando reportes...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="reports-page">
        <div className="state-message state-message--error" role="alert">
          {error}
        </div>
      </div>
    )
  }

  return (
    <div className="reports-page">
      <h2 className="reports-page__title">Reportes y Visualizaciones</h2>

      {/* KPIs */}
      {summary && <SummaryCards data={summary} />}

      {/* Sección PokéAPI */}
      <section className="reports-section">
        <div className="reports-section__header">
          <h3 className="reports-section__title">📊 Datos de PokéAPI</h3>
          <button
            className="export-btn"
            onClick={handleExportTypes}
            aria-label="Exportar distribución de tipos a CSV"
          >
            ⬇ Exportar CSV
          </button>
        </div>
        <div className="charts-grid charts-grid--wide">
          <TypeDistributionChart data={typeStats} />
        </div>
      </section>

      {/* Sección Reviews */}
      <section className="reports-section">
        <div className="reports-section__header">
          <h3 className="reports-section__title">⭐ Datos de Reseñas</h3>
        </div>
        <div className="charts-grid">
          <RatingDistributionChart data={ratingDist} />

          <div className="chart-card-wrapper">
            <div className="reports-section__header">
              <span />
              <button
                className="export-btn"
                onClick={handleExportTopRated}
                aria-label="Exportar top pokémon a CSV"
              >
                ⬇ Exportar CSV
              </button>
            </div>
            <TopRatedChart data={topRated} />
          </div>
        </div>

        <div className="charts-grid charts-grid--wide">
          <div className="chart-card-wrapper">
            <div className="reports-section__header">
              <span />
              <button
                className="export-btn"
                onClick={handleExportActivity}
                aria-label="Exportar actividad a CSV"
              >
                ⬇ Exportar CSV
              </button>
            </div>
            <ReviewsPerDayChart data={reviewsPerDay} />
          </div>
        </div>
      </section>
    </div>
  )
}
