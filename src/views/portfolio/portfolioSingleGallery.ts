import { html } from 'lit-html'
import { RenderFunc } from '@lit-any/views/lib'
import { schema } from '@tpluscode/rdf-ns-builders'
import { HydraResource } from 'alcaeus/types/Resources'
import { Image } from '../../lib/types/Image'
import * as scope from '../scopes'

interface Options<T> {
  heading: string
  title(resource: T): string | null
  images(resource: T): Image[]
  primaryImage(resource: T): Image | null
}

const excludes = [schema.associatedMedia.value]

export function portfolioSingleGallery<T extends HydraResource>(options: Options<T>): RenderFunc {
  return (resource: T, next) => {
    const except = [
      ...excludes,
      ...resource
        .getProperties()
        .filter(prop => !prop.supportedProperty.readable)
        .map(prop => prop.supportedProperty.property.id),
    ]

    return html`
      <div class="container clearfix">
        <div class="col_two_third portfolio-single-image nobottommargin">
          <canvas-fslider
            no-arrows
            thumbs
            animation="fade"
            .images="${options.images(resource)}"
            .primaryImage="${options.primaryImage(resource)}"
          ></canvas-fslider>
        </div>

        <div class="col_one_third portfolio-single-content col_last nobottommargin">
          ${next(resource, scope.operationSelector)}
          <div class="fancy-title title-bottom-border">
            <h2>${options.heading}</h2>
          </div>

          <ul class="portfolio-meta bottommargin">
            ${next(resource, scope.portfolioProperties, { except })}
          </ul>

          ${next(resource, scope.portfolioSpecializedProperties, { except })}
        </div>

        <div class="clear"></div>
      </div>
    `
  }
}
