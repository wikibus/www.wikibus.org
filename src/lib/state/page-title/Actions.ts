import O from 'patchinko/immutable'
import { PageTitle } from './State'
import { State } from '../index'

export interface Actions {
  hidePageTitle(): void
}

export function actions(update: (patch: Partial<State>) => void): Actions {
  return {
    hidePageTitle() {
      update({
        pageTitle: O<PageTitle>({
          hidden: true,
        }),
      })
    },
  }
}
