import createAuth0Client from '@auth0/auth0-spa-js'
import go from 'ld-navigation/fireNavigation'
import once from 'once'
import O from 'patchinko/immutable'
import { ServiceParams } from '../index'

const configureClient = () => {
  if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_CLIENT_ID) {
    throw new Error('Incomplete auth0 configuration')
  }

  return createAuth0Client({
    domain: process.env.AUTH0_DOMAIN,
    client_id: process.env.AUTH0_CLIENT_ID, // eslint-disable-line @typescript-eslint/camelcase
    audience: process.env.AUTH0_AUDIENCE,
  })
}

export const services = [
  once(async ({ state, update }: ServiceParams) => {
    if (!state.auth.client) {
      const client = await configureClient()
      const isAuthenticated = await client.isAuthenticated()

      if (isAuthenticated) {
        console.log('> User is authenticated')
        update({
          auth: O({
            isAuthenticated,
            client,
            token: await client.getTokenSilently(),
          }),
        })
        return
      }

      console.log('> User not authenticated')

      const query = window.location.search
      const shouldParseResult = query.includes('code=') && query.includes('state=')

      if (shouldParseResult) {
        console.log('> Parsing redirect')
        try {
          const result = await client.handleRedirectCallback()
          update({
            auth: O({
              isAuthenticated,
              client,
              token: await client.getTokenSilently(),
            }),
          })
          if (result.appState.resourceUrl) {
            go(result.appState.resourceUrl)
          }

          console.log('Logged in!')
        } catch (err) {
          console.log('Error parsing redirect:', err)
        }

        return
      }

      update({
        auth: O({
          client,
        }),
      })
    }
  }),
]
