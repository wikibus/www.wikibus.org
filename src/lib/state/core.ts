import { Hydra } from 'alcaeus/web'
import { ResourceIdentifier, Class, Resource, SupportedProperty, RuntimeOperation } from 'alcaeus'
import O from 'patchinko/immutable'
import { hydra, sh } from '@tpluscode/rdf-ns-builders'
import { getRequestBody } from '../hydra/operation'
import { ServiceParams, State } from './index'
import * as App from '../state'
import { Message } from '../../components/canvas-shell/canvas-message'
import { wba } from '../ns'
import { PageTitle } from './page-title'

type StateModification = (s: Core) => Core | Promise<Core>

const noReloadTypes = [sh.Shape, sh.NodeShape, hydra.ApiDocumentation, wba.EntryPoint]
Hydra.cacheStrategy.shouldLoad = (previous): boolean => noReloadTypes.reduce<boolean>((shouldReload, type) => {
  if (!shouldReload) return false

  return !previous.representation.root?.types.has(type)
}, true)

export interface OperationFormState {
  opened: boolean
  invoking: boolean
  operation?: RuntimeOperation
  value?: any
  error?: string
}

export interface Core<T extends Resource | null = Resource | null> {
  debug: boolean
  entrypoints: Map<SupportedProperty, ResourceIdentifier>
  resource: T
  resourceUrlOverride: string | null
  homeEntrypoint: Resource
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

  const response = await Hydra.loadResource(rootUri)
  if (!response.representation?.root) {
    throw new Error('Failed to initialize app. Could not fetch root entrypoint')
  }

  const entrypoints = response.representation.root
    .getLinks()
    .reduce((map, { supportedProperty, resources }) => {
      map.set(supportedProperty, resources[0].id)
      return map
    }, new Map<SupportedProperty, ResourceIdentifier>())

  return {
    debug: false,
    entrypoints,
    isLoading: false,
    resource: null,
    resourceUrlOverride: null,
    homeEntrypoint: response.representation.root,
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

      if (state.core.resource && state.core.resource.load) {
        update({
          core: O<Core>({
            isLoading: true,
          }),
        })
        state.core.resource
          .load()
          .then(({ representation }) => {
            update({
              core: O<Core>({
                resource: representation?.root,
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
  setResource(resource: Resource): void
  overrideResourceUrl(url: string): void
  showOperationForm(operation: RuntimeOperation): void
  hideOperationForm(): void
  invokeOperation(operation: RuntimeOperation, value?: object): void
  showMessage(text: string, kind: Message['kind']): void
  reload(): void
  hideRefreshHint(): void
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
    hideRefreshHint() {
      update({
        core: O<Core>({
          showManualRefreshHint: false,
        }),
      })
    },
    setResource(resource: Resource) {
      update({
        pageTitle: O<PageTitle>({
          hidden: false,
        }),
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
    showOperationForm(this: Actions, operation: RuntimeOperation) {
      if (!(operation.expects[0] as Class).supportedProperty.length) {
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
    invokeOperation(this: App.Actions, operation: RuntimeOperation, value?: object) {
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
        .then(({ response, representation }) => {
          if (response?.xhr.ok) {
            this.showMessage('Operation complete', 'success')

            update({
              core: O<Core>({
                operationForm: O<OperationFormState>({
                  opened: false,
                }),
              }),
            })

            if (representation?.root) {
              update({
                core: O<Core>({
                  resource: representation.root,
                  resourceUrlOverride: representation.root.id.value,
                }),
              })
            } else {
              update({
                core: O<Core>({
                  requestRefresh: true,
                }),
              })
            }
          } else if (response?.xhr.status === 401) {
            this.login()
          } else {
            this.showMessage(response?.xhr.statusText || 'Error', 'error')
            update({
              core: O<Core>({
                operationForm: O<OperationFormState>({
                  error: response?.xhr.statusText,
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
