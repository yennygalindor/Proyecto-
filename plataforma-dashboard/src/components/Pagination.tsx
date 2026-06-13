interface Props {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ page, totalPages, onPageChange }: Props) {
  if (totalPages <= 1) return null

  return (
    <nav className="pagination" aria-label="Paginación">
      <button
        className="pagination__btn"
        onClick={() => onPageChange(1)}
        disabled={page === 1}
        aria-label="Primera página"
      >
        «
      </button>
      <button
        className="pagination__btn"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        aria-label="Página anterior"
      >
        ‹
      </button>

      <span className="pagination__info">
        Página {page} de {totalPages}
      </span>

      <button
        className="pagination__btn"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Página siguiente"
      >
        ›
      </button>
      <button
        className="pagination__btn"
        onClick={() => onPageChange(totalPages)}
        disabled={page === totalPages}
        aria-label="Última página"
      >
        »
      </button>
    </nav>
  )
}
