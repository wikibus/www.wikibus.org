import O from 'patchinko/immutable'
import { RdfResource } from 'alcaeus'
import type { State } from '../index'
import type { Resources } from './State'

export interface Actions {
  loadResource(resource: RdfResource): void
}

export function actions(update: (patch: Partial<State>) => void): Actions {
  return {
    loadResource(resource: RdfResource) {
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
                  resource: loaded,
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
