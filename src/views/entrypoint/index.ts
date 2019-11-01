import { ViewTemplates } from '@lit-any/views'
import { HydraResource, SupportedProperty } from 'alcaeus/types/Resources'
import { IResource } from 'alcaeus/types/Resources/Resource'
import { html } from 'lit-html'
import { repeat } from 'lit-html/directives/repeat'
import { rdfType } from '../matchers'
import { resourceMain } from '../scopes'
import { propertyIcon } from '../library/property-icons'

ViewTemplates.default.when
  .scopeMatches(resourceMain)
  .valueMatches(rdfType('wba:EntryPoint'))
  .renders((value: HydraResource, next) => {
    import('../../components/canvas-shell/canvas-featured-box')
    import('../../components/canvas-shell/canvas-emphasis-title')

    const links = value.getLinks().reduce(
      (array, link) => [
        ...array,
        ...link.resources.map(resource => ({
          supportedProperty: link.supportedProperty,
          resource,
        })),
      ],
      [] as { supportedProperty: SupportedProperty; resource: IResource }[],
    )

    return html`
      <div class="container clearfix">
        ${repeat(
    links,
    (link, index) => html`
            <canvas-featured-box
              center
              effect
              outline
              class="col_one_third ${index % 3 === 2 ? 'col_last' : ''}"
              .title="${link.supportedProperty.title}"
              .description="${link.supportedProperty.description}"
              .resourceUrl="${link.resource.id}"
            >
              ${next(link.supportedProperty, propertyIcon)}
            </canvas-featured-box>
          `,
  )}
      </div>
    `
  })
