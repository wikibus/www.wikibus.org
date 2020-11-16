import { Resource } from 'alcaeus'
import type * as core from './core'
import type * as gallery from './gallery'
import type * as pageTitle from './page-title'
import type * as menu from './menu'
import type * as auth from './auth'
import type * as resources from './resources'
import type { Actions } from '../state'

export interface State<T extends Resource | null = Resource | null> {
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
