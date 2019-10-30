import { HydraResource } from 'alcaeus/types/Resources'
import { expand } from '@zazuko/rdf-vocabularies'

export interface Image {
  thumbnail: Image | null
  contentUrl: string
}

type Constructor<T = {}> = new (...args: any[]) => HydraResource

export function Mixin<B extends Constructor>(Base: B) {
  return class extends Base implements Image {
    public get contentUrl() {
      return this.get<string>(expand('schema:contentUrl')) || ''
    }

    public get thumbnail() {
      return this.get<Image>(expand('schema:thumbnail'))
    }
  }
}

export const shouldApply = (r: HydraResource) => r.get(expand('schema:contentUrl'))
