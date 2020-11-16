import { Collection, RdfResource, Resource } from 'alcaeus'
import O from 'patchinko/immutable'
import { State } from '../../state'
import { getPage } from './helpers'
import { Gallery } from './State'

export interface Actions {
  appendToGallery(nextPage: RdfResource): Promise<void>
  prependToGallery(prevPage: RdfResource): Promise<void>
}

export function actions(update: (patch: Partial<State>) => void): Actions {
  return {
    async appendToGallery(nextPage: Resource) {
      if (!nextPage.load) return

      update(
        O({
          gallery: O<Gallery>({
            nextPageLoading: true,
          }),
        }),
      )
      const { representation } = await nextPage.load<Collection>()
      const collection = representation?.root
      if (collection && 'manages' in collection) {
        update({
          gallery: O<Gallery>({
            resources: O((current: any) => [...current, ...collection.member]),
            nextPage: getPage(collection, 'next'),
            nextPageLoading: false,
          }),
        })
      }
    },
    async prependToGallery(prevPage: Resource) {
      if (!prevPage.load) return

      update({
        gallery: O<Gallery>({
          prevPageLoading: true,
        }),
      })
      const { representation } = await prevPage.load<Collection>()
      const collection = representation?.root
      if (collection && 'manages' in collection) {
        update({
          gallery: O<Gallery>({
            resources: O((current: any) => [...collection.member, ...current]),
            prevPage: getPage(collection, 'previous'),
            prevPageLoading: false,
          }),
        })
      }
    },
  }
}
