import { useAuth0 } from '@auth0/auth0-react'

export function LoginPage() {
  const { loginWithRedirect, isLoading } = useAuth0()

  return (
    <div className="login-page">
      <div className="login-card">
        <span className="login-card__icon" role="img" aria-label="pokeball">⚪</span>
        <h1 className="login-card__title">Pokédex Dashboard</h1>
        <p className="login-card__subtitle">
          Inicia sesión para explorar la Pokédex
        </p>
        <button
          className="login-card__btn"
          onClick={() => loginWithRedirect()}
          disabled={isLoading}
          aria-label="Iniciar sesión con Auth0"
        >
          {isLoading ? 'Cargando...' : 'Iniciar sesión'}
        </button>
      </div>
    </div>
  )
}
