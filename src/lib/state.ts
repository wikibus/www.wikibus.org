import flyd from 'flyd'
import meiosisPatchinko from 'meiosis-setup/patchinko'
import O from 'patchinko/immutable'
import * as core from './state/core'
import * as gallery from './state/gallery'
import * as pageTitle from './state/page-title'
import * as menu from './state/menu'
import * as auth from './state/auth'
import { State } from './state/index'

export { State } from './state/index'

export type Actions = core.Actions & gallery.Actions & pageTitle.Actions & auth.Actions

const appMeiosis = {
  async Initial(): Promise<State> {
    return {
      core: await core.Initial(),
      gallery: gallery.Initial(),
      pageTitle: pageTitle.Initial(),
      menu: menu.Initial(),
      auth: await auth.Initial(),
    }
  },
  Actions(update: flyd.Stream<Partial<State>>): Actions {
    return {
      ...core.actions(update),
      ...gallery.actions(update),
      ...pageTitle.actions(update),
      ...auth.actions(update),
    }
  },
  acceptors: [...pageTitle.acceptors, ...menu.acceptors, ...gallery.acceptors, ...auth.acceptors],
  services: [...auth.services, ...core.services],
}

const setup = meiosisPatchinko<State, ReturnType<typeof appMeiosis.Actions>>({
  stream: flyd,
  O,
  app: appMeiosis,
})

export const app = setup.then(({ states, actions }) => ({
  states,
  actions,
}))
