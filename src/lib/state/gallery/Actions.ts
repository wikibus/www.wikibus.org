import { Collection, HydraResource } from 'alcaeus/types/Resources'
import O from 'patchinko/immutable'
import { State } from './State'
import { getPage } from './helpers'

export function Actions(update: (patch: Partial<State>) => void) {
  return {
    async appendToGallery(nextPage: HydraResource) {
      update({
        nextPageLoading: true,
      })
      const nextPageResponse = (await nextPage.load()).root as Collection

      update({
        resources: O((current: any) => [...current, ...nextPageResponse.members]),
        nextPage: getPage(nextPageResponse, 'next'),
        nextPageLoading: false,
      })
    },
    async prependToGallery(prevPage: HydraResource) {
      update({
        prevPageLoading: true,
      })
      const prevPageResponse = (await prevPage.load()).root as Collection

      update({
        resources: O((current: any) => [...prevPageResponse.members, ...current]),
        prevPage: getPage(prevPageResponse, 'previous'),
        prevPageLoading: false,
      })
    },
  }
}
