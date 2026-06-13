import { useAuth0 } from '@auth0/auth0-react'

export function UserMenu() {
  const { user, logout } = useAuth0()

  return (
    <div className="user-menu">
      {user?.picture && (
        <img
          src={user.picture}
          alt={user.name ?? 'Usuario'}
          className="user-menu__avatar"
        />
      )}
      <span className="user-menu__name">{user?.name ?? user?.email}</span>
      <button
        className="user-menu__logout"
        onClick={() =>
          logout({ logoutParams: { returnTo: window.location.origin } })
        }
        aria-label="Cerrar sesión"
      >
        Salir
      </button>
    </div>
  )
}
