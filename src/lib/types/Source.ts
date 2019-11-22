import { HydraResource } from 'alcaeus/types/Resources'
import { expand } from '@zazuko/rdf-vocabularies'
import { Image } from './Image'

export interface Source extends HydraResource {
  title: string | null
  images: Image[]
  primaryImage: Image | null
}

type Constructor<T = {}> = new (...args: any[]) => HydraResource

export function Mixin<B extends Constructor>(Base: B) {
  return class extends Base implements Source {
    public get title() {
      return this.get<string>(expand('dcterms:title'))
    }

    public get images() {
      return this.getArray<Image>(expand('schema:image')).sort((left, right) => {
        const leftIndex = left.get<number>(expand('dtype:orderIndex')) || 0
        const rightIndex = right.get<number>(expand('dtype:orderIndex')) || 0

        return leftIndex - rightIndex
      })
    }

    public get primaryImage() {
      return this.get<Image>(expand('schema:primaryImageOfPage'))
    }
  }
}

export const shouldApply = (r: HydraResource) =>
  r.types.contains(expand('wbo:Book')) || r.types.contains(expand('wbo:Brochure'))
