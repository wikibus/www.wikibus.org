import { ViewTemplates } from '@lit-any/views'
import { Resource, SupportedProperty } from 'alcaeus'
import { html } from 'lit-html'
import { repeat } from 'lit-html/directives/repeat'
import { schema } from '@tpluscode/rdf-ns-builders'
import { RdfResource } from '@tpluscode/rdfine'
import { rdfType } from '../matchers'
import { resourceMain, cmsParts } from '../scopes'
import { propertyIcon } from '../library/property-icons'
import { wba } from '../../lib/ns'
import type { ViewParams } from '../index'

function renderEntrypointLink(next: any) {
  return (link: any, index: number) => {
    const resource = link.resource as Resource

    return html`
      <canvas-featured-box
        center
        effect
        outline
        class="col_one_third ${index % 3 === 2 ? 'col_last' : ''}"
        .title="${resource.title || link.supportedProperty.title}"
        .description="${resource.description || link.supportedProperty.description}"
        .resourceUrl="${link.resource.id.value}"
      >
        ${next(link.supportedProperty, propertyIcon)}
      </canvas-featured-box>
    `
  }
}

ViewTemplates.default.when
  .scopeMatches(resourceMain)
  .valueMatches(rdfType(wba.EntryPoint))
  .renders((value: RdfResource, next, scope, { state }: ViewParams) => {
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
      [] as { supportedProperty: SupportedProperty; resource: RdfResource }[],
    )

    return html`
      <div class="container clearfix">
        ${repeat(links, renderEntrypointLink(next))}
      </div>
      <div class="divider divider-center"><i class="icon-circle"></i></div>
      ${next(state, cmsParts)}
    `
  })

ViewTemplates.default.when
  .scopeMatches(resourceMain)
  .valueMatches(rdfType(schema.WebPageElement))
  .renders((value, next, scope, { state }: ViewParams) => html`${next(state, cmsParts)}`)
