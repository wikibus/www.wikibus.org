import { HydraResource } from 'alcaeus/types/Resources'
import { dcterms, dtype, schema } from '@tpluscode/rdf-ns-builders'
import { Image } from './Image'
import { wbo } from '../ns'

export interface Source extends HydraResource {
  title: string | null
  images: Image[]
  primaryImage: Image | null
}

type Constructor<T = {}> = new (...args: any[]) => HydraResource

export function Mixin<B extends Constructor>(Base: B) {
  return class extends Base implements Source {
    public get title() {
      return this.get<string>(dcterms.title.value)
    }

    public get images() {
      return this.getArray<Image>(schema.image.value).sort((left, right) => {
        const leftIndex = left.get<number>(dtype.orderIndex.value) || 0
        const rightIndex = right.get<number>(dtype.orderIndex.value) || 0

        return leftIndex - rightIndex
      })
    }

    public get primaryImage() {
      return this.get<Image>(schema.primaryImageOfPage.value)
    }
  }
}

export const shouldApply = (r: HydraResource) =>
  r.types.contains(wbo.Book.value) || r.types.contains(wbo.Brochure.value)
