import { HydraResource, IOperation, SupportedProperty } from 'alcaeus/types/Resources'
import { Hydra } from 'alcaeus'
import O from 'patchinko/immutable'
import { IHydraResponse } from 'alcaeus/types/HydraResponse'
import { getRequestBody } from '../hydra/operation'
import { ServiceParams } from './index'

Hydra.rootSelectors = [Hydra.rootSelectors.pop() as any, ...Hydra.rootSelectors]

type StateModification = (s: State) => State | Promise<State>

export interface OperationFormState {
  opened: boolean
  invoking: boolean
  operation?: IOperation
  value?: any
  error?: string
}

export interface State<T extends HydraResource | null = HydraResource | null> {
  debug: boolean
  entrypoints: Map<SupportedProperty, string>
  resource: T
  resourceUrlOverride: string | null
  homeEntrypoint: HydraResource
  operationForm: OperationFormState
  requestRefresh?: boolean
  isLoading: boolean
}

export async function Initial(): Promise<State> {
  const rootUri = process.env.API_ROOT
  if (!rootUri) {
    throw new Error('Failed to initialize app. API_ROOT environment variable was not set')
  }

  let response: IHydraResponse
  try {
    response = await Hydra.loadResource(rootUri)
  } catch (e) {
    throw new Error('Failed to initialize app. Could not fetch root entrypoint')
  }
  if (!response.root) {
    throw new Error('Failed to initialize app. Could not fetch root entrypoint')
  }

  const entrypoints = response.root.getLinks().reduce((map, { supportedProperty, resources }) => {
    map.set(supportedProperty, resources[0].id)
    return map
  }, new Map<SupportedProperty, string>())

  return {
    debug: false,
    entrypoints,
    isLoading: false,
    resource: null,
    resourceUrlOverride: null,
    homeEntrypoint: response.root,
    operationForm: {
      invoking: false,
      opened: false,
    },
  }
}

export const services = [
  async ({ state, update }: ServiceParams) => {
    if (state.core.requestRefresh) {
      update({
        core: O<State>({
          requestRefresh: false,
          isLoading: true,
        }),
      })

      if (state.core.resource) {
        state.core.resource
          .load()
          .then(resource => {
            update({
              core: O<State>({
                resource: resource.root,
                isLoading: false,
              }),
            })
          })
          .catch(() => {
            update({
              core: O<State>({
                isLoading: false,
              }),
            })
          })
      }
    }
  },
]

export function Actions(update: (patch: Partial<State> | StateModification) => void) {
  return {
    toggleDebug() {
      update({
        debug: O(debug => !debug),
      })
    },
    setResource(resource: HydraResource) {
      update({
        resource,
        resourceUrlOverride: null,
      })
    },
    overrideResourceUrl(url: string) {
      update({
        resourceUrlOverride: url,
      })
    },
    showOperationForm(operation: IOperation) {
      update({
        operationForm: O<OperationFormState>({
          opened: true,
          invoking: false,
          operation,
          value: undefined,
          error: undefined,
        }),
      })
    },
    hideOperationForm() {
      update({
        operationForm: O<OperationFormState>({
          opened: false,
        }),
      })
    },
    invokeOperation(operation: IOperation, value: object) {
      update({
        operationForm: O<OperationFormState>({
          invoking: true,
          error: undefined,
          value,
        }),
      })

      const body = getRequestBody(operation, value)
      return operation
        .invoke(body)
        .then(response => {
          if (response.xhr.ok) {
            update({
              operationForm: O<OperationFormState>({
                opened: false,
              }),
            })

            if (response.root) {
              update({
                resource: response.root,
                resourceUrlOverride: response.root.id,
              })
            } else {
              update({
                requestRefresh: true,
              })
            }
          }

          update({
            operationForm: O<OperationFormState>({
              invoking: false,
            }),
          })
        })
        .catch(e => {
          update({
            operationForm: O<OperationFormState>({
              error: e.message,
            }),
          })
        })
        .finally(() => {
          update({
            operationForm: O<OperationFormState>({
              invoking: false,
            }),
          })
        })
    },
  }
}
