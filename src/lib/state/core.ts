import { HydraResource, SupportedProperty } from 'alcaeus/types/Resources'
import { Hydra } from 'alcaeus'

export interface State<T extends HydraResource | null = HydraResource | null> {
  debug: boolean
  entrypoints: Map<SupportedProperty, string>
  menu: Record<string, string>
  resource: T
  resourceUrlOverride: string | null
  rootUri: string
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

  const menu = response.root.getLinks().reduce(
    (map, { supportedProperty, resources }) => ({
      ...map,
      [supportedProperty.title]: resources[0].id,
    }),
    {},
  )

  return {
    debug: false,
    entrypoints,
    menu,
    resource: null,
    resourceUrlOverride: null,
    rootUri,
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
