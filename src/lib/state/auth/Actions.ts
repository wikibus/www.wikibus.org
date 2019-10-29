/* eslint-disable @typescript-eslint/camelcase */
import { HydraResource } from 'alcaeus/types/Resources'
import { State } from './State'

type StateModification = (s: State) => State | Promise<State>

export function Actions(update: (patch: Partial<State> | StateModification) => void) {
  return {
    async login(resourceUrl: HydraResource) {
      update(async (state: State) => {
        if (!state.client) {
          return state
        }

        try {
          console.log('Logging in')

          const options = {
            redirect_uri: window.location.origin,
            appState: { resourceUrl: resourceUrl.id },
          }

          await state.client.loginWithRedirect(options)
        } catch (err) {
          console.log('Log in failed', err)
        }

        return state
      })
    },

    async logout() {
      update(async state => {
        if (!state.client) {
          return state
        }

        try {
          console.log('Logging out')
          await state.client.logout({
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
