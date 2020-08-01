import { dcterms, dtype, schema } from '@tpluscode/rdf-ns-builders'
import { Constructor, property, RdfResource } from '@tpluscode/rdfine'
import { HydraResource } from 'alcaeus'
import { ImageMixin, Image } from './Image'
import { wbo } from '../ns'

export interface Source extends HydraResource {
  title: string | null
  images: Image[]
  primaryImage: Image | null
}

export function SourceMixin<B extends Constructor<HydraResource>>(Base: B) {
  class SourceClass extends Base implements Source {
    @property.literal({ path: dcterms.title })
    public title!: string

    public get images() {
      return this.getArray<Image>(schema.image.value).sort((left, right) => {
        const leftIndex = left.getNumber(dtype.orderIndex) || 0
        const rightIndex = right.getNumber(dtype.orderIndex) || 0

        return leftIndex - rightIndex
      })
    }

    @property.resource({ path: schema.primaryImageOfPage, as: [ImageMixin] })
    public primaryImage!: Image
  }

  return SourceClass
}

SourceMixin.shouldApply = (r: RdfResource) =>
  r.types.has(wbo.Book.value) || r.types.has(wbo.Brochure)
