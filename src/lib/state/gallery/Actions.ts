import { Collection, HydraResource } from 'alcaeus'
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
      if (!nextPage.load) return

      update(
        O({
          gallery: O<Gallery>({
            nextPageLoading: true,
          }),
        }),
      )
      const { representation } = (await nextPage.load()) as any
      const collection: Collection = representation?.root
      if (!collection) return

      update({
        gallery: O<Gallery>({
          resources: O((current: any) => [...current, ...collection.members]),
          nextPage: getPage(collection, 'next'),
          nextPageLoading: false,
        }),
      })
    },
    async prependToGallery(prevPage: HydraResource) {
      if (!prevPage.load) return

      update({
        gallery: O<Gallery>({
          prevPageLoading: true,
        }),
      })
      const { representation } = (await prevPage.load()) as any
      const collection: Collection = representation?.root
      if (!collection) return

      update({
        gallery: O<Gallery>({
          resources: O((current: any) => [...collection.members, ...current]),
          prevPage: getPage(collection, 'previous'),
          prevPageLoading: false,
        }),
      })
    },
  }
}
