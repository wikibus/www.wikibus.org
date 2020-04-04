import O from 'patchinko/immutable'
import { State } from '../../state'
import { PageTitle } from './State'

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
