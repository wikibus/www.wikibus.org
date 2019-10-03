import { Collection, HydraResource, PartialCollectionView } from 'alcaeus/types/Resources'
import flyd from 'flyd'
import meiosisPatchinko from 'meiosis-setup/patchinko'
import O from 'patchinko/immutable'

export interface State<T extends HydraResource | null = HydraResource | null> {
  menu: Record<string, string | undefined>
  resource: T
  gallery: {
    collectionId: string
    resources: any[]
    nextPage: HydraResource | null
    prevPage: HydraResource | null
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

interface StateUpdate {
  <T extends HydraResource>(state: Partial<State<T>>): void
}

const nullState = {
  menu: {
    Library: process.env.API_LIBRARY,
  },
  resource: null,
  gallery: {
    collectionId: '',
    resources: [],
    nextPage: null,
    prevPage: null,
  },
}

const app = {
  Initial(): State {
    return nullState
  },
  Actions(update: any) {
    return {
      setResource(resource: HydraResource) {
        update({
          resource,
          gallery: nullState.gallery,
        })
      },
      replaceGallery(resource: Collection) {
        update({
          gallery: {
            collectionId: resource.id,
            resources: resource.members,
            prevPage: getPage(resource, 'previous'),
            nextPage: getPage(resource, 'next'),
          },
        })
      },
      async appendToGallery(nextPage: HydraResource | null) {
        if (!nextPage) return
        const nextPageResponse = (await nextPage.load()).root as Collection

        update({
          gallery: O({
            resources: O((current: any) => [...current, ...nextPageResponse.members]),
            nextPage: getPage(nextPageResponse, 'next'),
          }),
        })
      },
      async prependToGallery(prevPage: HydraResource | null) {
        if (!prevPage) return
        const prevPageResponse = (await prevPage.load()).root as Collection

        update({
          gallery: O({
            resources: O((current: any) => [...prevPageResponse.members, ...current]),
            prevPage: getPage(prevPageResponse, 'previous'),
          }),
        })
      },
    }
  },
}

const setup = meiosisPatchinko<State, ReturnType<typeof app.Actions>>({ stream: flyd, O, app })

export const states = setup.then(value => value.states)
export const actions = setup.then(value => value.actions)
