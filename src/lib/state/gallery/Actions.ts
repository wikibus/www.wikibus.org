import { Collection, HydraResource } from 'alcaeus/types/Resources'
import O from 'patchinko/immutable'
import { State } from '../../state'
import { getPage } from './helpers'
import { Gallery } from './State'

export interface Actions {
  appendToGallery(nextPage: HydraResource): Promise<void>
  prependToGallery(prevPage: HydraResource): Promise<void>
}

export function actions(update: (patch: Partial<State>) => void): Actions {
  return {
    async appendToGallery(nextPage: HydraResource) {
      update(
        O({
          gallery: O<Gallery>({
            nextPageLoading: true,
          }),
        }),
      )
      const nextPageResponse = (await nextPage.load()).root as Collection

      update({
        gallery: O<Gallery>({
          resources: O((current: any) => [...current, ...nextPageResponse.members]),
          nextPage: getPage(nextPageResponse, 'next'),
          nextPageLoading: false,
        }),
      })
    },
    async prependToGallery(prevPage: HydraResource) {
      update({
        gallery: O<Gallery>({
          prevPageLoading: true,
        }),
      })
      const prevPageResponse = (await prevPage.load()).root as Collection

      update({
        gallery: O<Gallery>({
          resources: O((current: any) => [...prevPageResponse.members, ...current]),
          prevPage: getPage(prevPageResponse, 'previous'),
          prevPageLoading: false,
        }),
      })
    },
  }
}
