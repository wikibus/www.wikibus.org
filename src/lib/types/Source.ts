import { dcterms, dtype, schema } from '@tpluscode/rdf-ns-builders'
import { Constructor, property, RdfResource } from '@tpluscode/rdfine'
import { ImageObject, ImageObjectMixin } from '@rdfine/schema'
import { wbo } from '../ns'

export interface Source extends RdfResource {
  title: string | null
  images: ImageObject[]
  primaryImage: ImageObject | null
}

export function SourceMixin<B extends Constructor<RdfResource>>(Base: B) {
  class SourceClass extends Base implements Source {
    @property.literal({ path: dcterms.title })
    public title!: string

    public get images() {
      return this.getArray<ImageObject>(schema.image.value).sort((left, right) => {
        const leftIndex = left.getNumber(dtype.orderIndex) || 0
        const rightIndex = right.getNumber(dtype.orderIndex) || 0

        return leftIndex - rightIndex
      })
    }

    @property.resource({ path: schema.primaryImageOfPage, as: [ImageObjectMixin] })
    public primaryImage!: ImageObject
  }

  return SourceClass
}

SourceMixin.shouldApply = (r: RdfResource) =>
  r.types.has(wbo.Book.value) || r.types.has(wbo.Brochure)
