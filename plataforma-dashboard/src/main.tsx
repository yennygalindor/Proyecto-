import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react'
import './index.css'
import App from './App'

const domain = 'dev-4ckh7di1rtpmemjq.us.auth0.com'
const clientId = '9DXciJ4hIaBTlk6njIvBETGqG7uxrNbb'
const audience = 'https://plataforma-api'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: audience,
      }}
    >
      <App />
    </Auth0Provider>
  </StrictMode>,
)
