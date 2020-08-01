/* eslint-disable @typescript-eslint/camelcase,no-console */
import { HydraResource } from 'alcaeus'
import { State } from '../index'

type StateModification = (s: State) => State | Promise<State>

export interface Actions {
  login(resource?: HydraResource): Promise<void>
  logout(): Promise<void>
}

export function actions(update: (patch: Partial<State> | StateModification) => void): Actions {
  return {
    async login(resource?: HydraResource) {
      update(async (state: State) => {
        if (!state.auth.client) {
          return state
        }

        const resourceId = (resource || state.core.resource || state.core.homeEntrypoint).id

        try {
          console.log('Logging in')

          const options = {
            redirect_uri: window.location.origin,
            appState: { resourceUrl: resourceId },
          }

          await state.auth.client.loginWithRedirect(options)
        } catch (err) {
          console.log('Log in failed', err)
        }

        return state
      })
    },

    async logout() {
      update(async state => {
        if (!state.auth.client) {
          return state
        }

        try {
          console.log('Logging out')
          await state.auth.client.logout({
            returnTo: window.location.origin,
          })
        } catch (err) {
          console.log('Log out failed', err)
        }

        return state
      })
    },
  }
}
