import { HydraResource, IOperation, SupportedProperty } from 'alcaeus/types/Resources'
import { Hydra } from 'alcaeus'
import O from 'patchinko/immutable'
import { IHydraResponse } from 'alcaeus/types/HydraResponse'
import { getRequestBody } from '../hydra/operation'
import { ServiceParams, State } from './index'
import * as App from '../state'
import { Message } from '../../components/canvas-shell/canvas-message'

type StateModification = (s: Core) => Core | Promise<Core>

export interface OperationFormState {
  opened: boolean
  invoking: boolean
  operation?: IOperation
  value?: any
  error?: string
}

export interface Core<T extends HydraResource | null = HydraResource | null> {
  debug: boolean
  entrypoints: Map<SupportedProperty, string>
  resource: T
  resourceUrlOverride: string | null
  homeEntrypoint: HydraResource
  operationForm: OperationFormState
  requestRefresh?: boolean
  isLoading: boolean
  message: Required<Message>
  showManualRefreshHint: boolean
}

export async function Initial(): Promise<Core> {
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
    message: {
      kind: '',
      text: '',
      visible: false,
    },
    showManualRefreshHint: false,
  }
}

export const services = [
  async ({ state, update }: ServiceParams) => {
    if (state.core.requestRefresh) {
      update({
        core: O<Core>({
          requestRefresh: false,
        }),
      })

      if (state.core.resource) {
        update({
          core: O<Core>({
            isLoading: true,
          }),
        })
        state.core.resource
          .load()
          .then(resource => {
            update({
              core: O<Core>({
                resource: resource.root,
                isLoading: false,
              }),
            })
          })
          .catch(() => {
            update({
              core: O<Core>({
                isLoading: false,
              }),
            })
          })
      }
    }
  },
]

export interface Actions {
  toggleDebug(): void
  setResource(resource: HydraResource): void
  overrideResourceUrl(url: string): void
  overrideResourceUrl(url: string): void
  showOperationForm(operation: IOperation): void
  hideOperationForm(): void
  invokeOperation(operation: IOperation, value?: object): void
  showMessage(text: string, kind: Message['kind']): void
  reload(): void
}

export function actions(update: (patch: Partial<State> | StateModification) => void): Actions {
  return {
    reload() {
      update({
        core: O<Core>({
          requestRefresh: true,
          showManualRefreshHint: false,
        }),
      })
    },
    showMessage(text: string, kind: Message['kind'] = '') {
      update({
        core: O<Core>({
          message: {
            visible: true,
            text,
            kind,
          },
        }),
      })

      setTimeout(() => {
        update({
          core: O<Core>({
            message: O<Message>({
              visible: false,
            }),
          }),
        })
      }, 2000)
    },
    toggleDebug() {
      update({
        core: O<Core>({
          debug: O(debug => !debug),
        }),
      })
    },
    setResource(resource: HydraResource) {
      update({
        core: O<Core>({
          resource,
          resourceUrlOverride: null,
        }),
      })
    },
    overrideResourceUrl(url: string) {
      update({
        core: O<Core>({
          resourceUrlOverride: url,
        }),
      })
    },
    showOperationForm(this: Actions, operation: IOperation) {
      if (!operation.expects.supportedProperties.length) {
        this.invokeOperation(operation)
        return
      }

      update({
        core: O<Core>({
          operationForm: O<OperationFormState>({
            opened: true,
            invoking: false,
            operation,
            value: undefined,
            error: undefined,
          }),
        }),
      })
    },
    hideOperationForm() {
      update({
        core: O<Core>({
          operationForm: O<OperationFormState>({
            opened: false,
          }),
        }),
      })
    },
    invokeOperation(this: App.Actions, operation: IOperation, value?: object) {
      update({
        core: O<Core>({
          operationForm: O<OperationFormState>({
            invoking: true,
            error: undefined,
            value,
          }),
        }),
      })

      const body = getRequestBody(operation, value)
      return operation
        .invoke(body)
        .then(response => {
          if (response.xhr.ok) {
            this.showMessage('Operation complete', 'success')

            update({
              core: O<Core>({
                operationForm: O<OperationFormState>({
                  opened: false,
                }),
              }),
            })

            if (response.root) {
              update({
                core: O<Core>({
                  resource: response.root,
                  resourceUrlOverride: response.root.id,
                }),
              })
            } else {
              update({
                core: O<Core>({
                  requestRefresh: true,
                }),
              })
            }
          } else if (response.xhr.status === 401) {
            this.login()
          } else {
            this.showMessage(response.xhr.statusText, 'error')
            update({
              core: O<Core>({
                operationForm: O<OperationFormState>({
                  error: response.xhr.statusText,
                }),
              }),
            })
          }

          update({
            core: O<Core>({
              operationForm: O<OperationFormState>({
                invoking: false,
              }),
            }),
          })
        })
        .catch(e => {
          update({
            core: O<Core>({
              operationForm: O<OperationFormState>({
                error: e.message,
              }),
            }),
          })
        })
        .finally(() => {
          update({
            core: O<Core>({
              operationForm: O<OperationFormState>({
                invoking: false,
              }),
            }),
          })
        })
    },
  }
}
