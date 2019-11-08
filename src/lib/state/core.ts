import { HydraResource, IOperation, SupportedProperty } from 'alcaeus/types/Resources'
import { Hydra } from 'alcaeus'
import O from 'patchinko/immutable'
import { IHydraResponse } from 'alcaeus/types/HydraResponse'

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
    resource: null,
    resourceUrlOverride: null,
    homeEntrypoint: response.root,
    operationForm: {
      invoking: false,
      opened: false,
    },
  }
}

export function Actions(update: (patch: Partial<State> | StateModification) => void) {
  return {
    setDebug(debug: boolean) {
      update({
        debug,
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

      return operation
        .invoke(JSON.stringify(value))
        .then(response => {
          if (response.xhr.ok) {
            update({
              operationForm: O<OperationFormState>({
                opened: false,
              }),
              resource: response.root,
              resourceUrlOverride: response.root && response.root.id,
            })
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
