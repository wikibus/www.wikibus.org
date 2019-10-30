import { HydraResource } from 'alcaeus/types/Resources'
import * as core from './core'
import * as gallery from './gallery'
import * as pageTitle from './page-title'
import * as menu from './menu'

export interface State<T extends HydraResource | null = HydraResource | null> {
  core: core.State<T>
  gallery: gallery.State
  pageTitle: pageTitle.State
  menu: menu.State
}

export function onChange<T>(
  selector: (state: State) => T,
  acceptor: (state: State) => Partial<State>,
) {
  let previous: T | undefined

  return (state: State) => {
    let patch = {}
    const current = selector(state)
    if (previous !== current) {
      patch = acceptor(state)
    }

    previous = current
    return patch
  }
}
