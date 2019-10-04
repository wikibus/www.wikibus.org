import { HydraResource } from 'alcaeus/types/Resources'
import flyd from 'flyd'
import meiosisPatchinko from 'meiosis-setup/patchinko'
import O from 'patchinko/immutable'
import * as core from './state/core'
import * as gallery from './state/gallery'

export interface State<T extends HydraResource | null = HydraResource | null> {
  core: core.State<T>
  gallery: gallery.State
}

const appMeiosis = {
  Initial(): State {
    return {
      core: core.Initial(),
      gallery: gallery.Initial(),
    }
  },
  Actions(update: flyd.Stream<Partial<State>>) {
    return {
      core: core.Actions(patch => update({ core: O(patch) })),
      gallery: gallery.Actions(patch => update({ gallery: O(patch) })),
    }
  },
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
