import { html } from 'lit-html'
import { RenderFunc } from '@lit-any/views/lib'
import { expand } from '@zazuko/rdf-vocabularies'
import { HydraResource } from 'alcaeus/types/Resources'
import { repeat } from 'lit-html/directives/repeat'
import { Image } from '../../lib/types/Image'
import { operationTrigger } from '../scopes'

interface Options<T> {
  heading: string
  title(resource: T): string | null
  images(resource: T): Image[]
  excludedProperties?: string[]
}

export function portfolioSingleGallery<T extends HydraResource>(options: Options<T>): RenderFunc {
  return (resource: T, next) => {
    let except = []
    if (options.excludedProperties) {
      except = options.excludedProperties.map(prop => expand(prop))
    }

    return html`
      <div class="container clearfix">
        <div class="col_two_third portfolio-single-image nobottommargin">
          <canvas-fslider
            no-arrows
            thumbs
            animation="fade"
            .images="${options.images(resource)}"
          ></canvas-fslider>
        </div>

        <div class="col_one_third portfolio-single-content col_last nobottommargin">
          ${repeat(resource.operations, operation =>
            next({ resource, operation }, operationTrigger),
          )}
          <div class="fancy-title title-bottom-border">
            <h2>${options.heading}</h2>
          </div>

          <ul class="portfolio-meta bottommargin">
            ${next(resource, 'portfolio-properties', { except })}
          </ul>
        </div>

        <div class="clear"></div>
      </div>
    `
  }
}
