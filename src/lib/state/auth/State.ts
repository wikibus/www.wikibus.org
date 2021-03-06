import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client'

export interface Auth {
  isAuthenticated?: boolean
  client?: Auth0Client
  token?: string
  userName?: string
}
