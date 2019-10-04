import { HydraResource } from 'alcaeus/types/Resources'
import { expand } from '@zazuko/rdf-vocabularies'
import { Image } from './Image'

export interface Source extends HydraResource {
  title: string | null
  image: Image | null
}

type Constructor<T = {}> = new (...args: any[]) => HydraResource

export function Mixin<B extends Constructor>(Base: B) {
  return class extends Base implements Source {
    public get title() {
      return this.get<string>(expand('dcterms:title'))
    }

    public get image() {
      return this.get<Image>(expand('schema:image'))
    }
  }
}

export const shouldApply = (r: HydraResource) =>
  r.types.contains(expand('wbo:Book')) || r.types.contains(expand('wbo:Brochure'))