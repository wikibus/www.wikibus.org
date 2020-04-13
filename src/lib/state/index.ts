import { HydraResource } from 'alcaeus/types/Resources'
import * as core from './core'
import * as gallery from './gallery'
import * as pageTitle from './page-title'
import * as menu from './menu'
import * as auth from './auth'
import * as resources from './resources'
import { Actions } from '../state'

export interface State<T extends HydraResource | null = HydraResource | null> {
  core: core.Core<T>
  gallery: gallery.Gallery
  pageTitle: pageTitle.PageTitle
  menu: menu.Menu
  auth: auth.Auth
  resources: resources.Resources
}

export interface ServiceParams {
  state: State
  update: (patch: Partial<State>) => void
  actions: Actions
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
