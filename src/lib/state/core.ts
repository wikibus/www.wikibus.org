import { HydraResource } from 'alcaeus/types/Resources'

export interface State<T extends HydraResource | null = HydraResource | null> {
  debug: boolean
  menu: Record<string, string | undefined>
  resource: T
  resourceUrlOverride: string | null
}

export function Initial(): State {
  return {
    debug: false,
    menu: {
      Library: process.env.API_LIBRARY,
    },
    resource: null,
    resourceUrlOverride: null,
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
