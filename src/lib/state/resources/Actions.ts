import O from 'patchinko/immutable'
import { HydraResource } from 'alcaeus'
import { State } from '../index'
import { Resources } from './State'

export interface Actions {
  loadResource(resource: HydraResource): void
}

export function actions(update: (patch: Partial<State>) => void): Actions {
  return {
    loadResource(resource: HydraResource) {
      if (!resource.load) return

      const { id } = resource

      update({
        resources: O<Resources>({
          [id.value]: {
            isLoading: true,
          },
        }),
      })

      resource
        .load()
        .then(({ response, representation }) => {
          const loaded = representation?.root

          if (!loaded) {
            update({
              resources: O<Resources>({
                [id.value]: {
                  isLoading: false,
                  error: response?.xhr.statusText || 'Error',
                },
              }),
            })
          } else {
            update({
              resources: O<Resources>({
                [id.value]: {
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
              [id.value]: {
                isLoading: false,
                error: e.message,
              },
            }),
          })
        })
    },
  }
}
