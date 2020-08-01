import { schema } from '@tpluscode/rdf-ns-builders'
import { Constructor, namespace, property, RdfResource } from '@tpluscode/rdfine'

export interface Image extends RdfResource {
  thumbnail: Image | null
  contentUrl: string
}

export function ImageMixin<B extends Constructor>(Base: B) {
  @namespace(schema)
  class Image extends Base implements Image {
    @property.literal()
    public contentUrl!: string

    @property.resource({ as: [ImageMixin] })
    public thumbnail!: Image
  }

  return Image
}

ImageMixin.shouldApply = (r: RdfResource) => !!r.get(schema.contentUrl)
