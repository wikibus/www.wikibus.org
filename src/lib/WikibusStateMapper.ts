import { StateMapper } from 'ld-navigation'

export class WikibusStateMapper extends StateMapper {
  private __innerMappers: [string, StateMapper][] = []

  public constructor(o: { useHashFragment: boolean }) {
    super(o)

    this.__innerMappers.push([
      'library',
      new StateMapper({
        ...o,
        baseUrl: 'http://sources.wikibus.org/',
        clientBasePath: 'library',
      }),
    ])

    this.__innerMappers.push([
      'data-sheets',
      new StateMapper({
        ...o,
        baseUrl: 'http://tech.wikibus.org/',
        clientBasePath: 'data-sheets',
      }),
    ])
  }

  public getStatePath(resourceUrl: string): string {
    // eslint-disable-next-line no-restricted-syntax
    for (const mapper of this.__innerMappers) {
      const path = mapper[1].getStatePath(resourceUrl)
      if (!path.startsWith('/http://')) {
        return `/${mapper[0]}${path}`
      }
    }

    return super.getStatePath(resourceUrl)
  }

  public getStateUrl(resourceUrl: string): string {
    return super.getStateUrl(resourceUrl)
  }

  public getResourceUrl(urlString: string): string {
    const url = new URL(urlString)
    const mapper = this.__innerMappers.find(m => new RegExp(`^/${m[0]}`).test(url.pathname))

    if (mapper) {
      return mapper[1].getResourceUrl(urlString)
    }

    return ''
  }
}
