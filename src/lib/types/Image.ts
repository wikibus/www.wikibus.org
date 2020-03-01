import { HydraResource } from 'alcaeus/types/Resources'
import { schema } from '@tpluscode/rdf-ns-builders'

export interface Image extends HydraResource {
  thumbnail: Image | null
  contentUrl: string
}

type Constructor<T = {}> = new (...args: any[]) => HydraResource

export function Mixin<B extends Constructor>(Base: B) {
  return class extends Base implements Image {
    public get contentUrl() {
      return this.get<string>(schema.contentUrl.value) || ''
    }

    public get thumbnail() {
      return this.get<Image>(schema.thumbnail.value)
    }
  }
}

export const shouldApply = (r: HydraResource) => r.get(schema.contentUrl.value)
