import { Collection, HydraResource, PartialCollectionView } from 'alcaeus/types/Resources'
import O from 'patchinko/immutable'

export interface State {
  collectionId: string
  resources: any[]
  nextPage: HydraResource | null
  prevPage: HydraResource | null
  nextPageLoading: boolean
  prevPageLoading: boolean
}

export function Initial(): State {
  return {
    collectionId: '',
    resources: [],
    nextPage: null,
    prevPage: null,
    nextPageLoading: false,
    prevPageLoading: false,
  }
}

function getPage(resource: Collection, rel: 'next' | 'previous') {
  if (resource.views && resource.views.length > 0) {
    if (rel in resource.views[0]) {
      return ((resource.views[0] as PartialCollectionView)[rel] as HydraResource) || null
    }
  }

  return null
}

export function Actions(update: (patch: Partial<State>) => void) {
  return {
    replaceGallery(resource: Collection) {
      update({
        collectionId: resource.id,
        resources: resource.members,
        prevPage: getPage(resource, 'previous'),
        nextPage: getPage(resource, 'next'),
      })
    },
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
