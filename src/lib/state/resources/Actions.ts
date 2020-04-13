import O from 'patchinko/immutable'
import { HydraResource } from 'alcaeus/types/Resources'
import { State } from '../../state'
import { Resources } from './State'

export interface Actions {
  loadResource(resource: HydraResource): void
}

export function actions(update: (patch: Partial<State>) => void): Actions {
  return {
    loadResource(resource: HydraResource) {
      const { id } = resource

      update({
        resources: O<Resources>({
          [id]: {
            isLoading: true,
          },
        }),
      })

      resource
        .load()
        .then(response => {
          const loaded = response.root

          if (!loaded) {
            update({
              resources: O<Resources>({
                [id]: {
                  isLoading: false,
                  error: response.xhr.statusText,
                },
              }),
            })
          } else {
            update({
              resources: O<Resources>({
                [id]: {
                  isLoading: false,
                  value: loaded,
                },
              }),
            })
          }
        })
        .catch(e => {
          update({
            resources: O<Resources>({
              [id]: {
                isLoading: false,
                error: e.message,
              },
            }),
          })
        })
    },
  }
}
