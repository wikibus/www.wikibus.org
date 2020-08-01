import { StateMapper } from 'ld-navigation'
import { ResourceIdentifier } from '@tpluscode/rdfine'

interface StateMapperOptions {
  baseUrl?: string
  useHashFragment?: boolean
  clientBasePath?: string
  apis: Record<string, ResourceIdentifier | undefined>
}

interface ApiStateMapping {
  path: string
  mapper: StateMapper
  pathRegex: RegExp
}

export class WikibusStateMapper extends StateMapper {
  private readonly __apis: ApiStateMapping[]

  public constructor(o: StateMapperOptions) {
    super(o)

    this.__apis = Object.entries(o.apis).map(api => {
      if (!api[1]) {
        throw new Error(`Missing URL for API ${api[0]}`)
      }

      return {
        path: api[0],
        pathRegex: new RegExp(`^/${api[0]}`),
        mapper: new StateMapper({
          ...o,
          baseUrl: api[1].value,
          clientBasePath: api[0],
        }),
      }
    })
  }

  public getStatePath(resourceUrl: string): string {
    // eslint-disable-next-line no-restricted-syntax
    for (const api of this.__apis) {
      const path = api.mapper.getStatePath(resourceUrl)
      if (!path.match(/\/https?:\/\//)) {
        return `/${api.path}${path}`
      }
    }

    return super.getStatePath(resourceUrl)
  }

  public getStateUrl(resourceUrl: string): string {
    return super.getStateUrl(resourceUrl)
  }

  public getResourceUrl(urlString: string): string {
    const url = new URL(urlString)
    const api = this.__apis.find(candidate => candidate.pathRegex.test(url.pathname))

    if (api) {
      return api.mapper.getResourceUrl(urlString)
    }

    return super.getResourceUrl(urlString)
  }
}
