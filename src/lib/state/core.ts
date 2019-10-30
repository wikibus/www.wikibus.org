import { HydraResource, SupportedProperty } from 'alcaeus/types/Resources'
import { Hydra } from 'alcaeus'

export interface State<T extends HydraResource | null = HydraResource | null> {
  debug: boolean
  entrypoints: Map<SupportedProperty, string>
  resource: T
  resourceUrlOverride: string | null
  homeEntrypoint: HydraResource
}

export async function Initial(): Promise<State> {
  const rootUri = process.env.API_ROOT
  if (!rootUri) {
    throw new Error('Failed to initialize app. API_ROOT environment variable was not set')
  }

  const response = await Hydra.loadResource(rootUri)
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
  }
}

export function Actions(update: (patch: Partial<State>) => void) {
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
  }
}
