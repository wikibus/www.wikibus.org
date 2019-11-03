import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client'

export interface State {
  isAuthenticated?: boolean
  client?: Auth0Client
}
