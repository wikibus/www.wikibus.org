import './book/index.ts'
import './brochure/index.ts'
import { ViewTemplates } from '@lit-any/views'
import { HydraResource, SupportedProperty } from 'alcaeus/types/Resources'
import { IResource } from 'alcaeus/types/Resources/Resource'
import { repeat } from 'lit-html/directives/repeat'
import { html } from 'lit-html'
import { rdfType } from '../matchers'
import { propertyIcon } from './property-icons'

ViewTemplates.default.when
  .scopeMatches('wikibus-resource')
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
      <canvas-emphasis-title
        background-image="https://pixabay.com/get/55e4d1454e57ad14f6d1867dda6d49214b6ac3e45657784972267adc93/books-3446451_1920.jpg"
        heading="wikibus.org library"
        lead="Here you can explore the private collection of books and other physical and electronic media about public transport"
      ></canvas-emphasis-title>

      <section id="content">
        <div class="content-wrap">
          <div class="container clearfix">
            ${repeat(
              links,
              (link, index) => html`
                <canvas-featured-box
                  class="col_one_third ${index % 3 === 0 ? 'col_last' : ''}"
                  .title="${link.supportedProperty.title}"
                  .description="${link.supportedProperty.description}"
                  .resourceUrl="${link.resource.id}"
                >
                  ${next(link.supportedProperty, propertyIcon)}
                </canvas-featured-box>
              `,
            )}
          </div>
        </div>
      </section>
    `
  })
