import { HydraResource } from 'alcaeus'
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
