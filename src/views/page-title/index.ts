import { ViewTemplates } from '@lit-any/views'
import { RdfResource, Resource, ResourceIndexer } from 'alcaeus'
import { html } from 'lit-html'
import { ifDefined } from 'lit-html/directives/if-defined'
import { until } from 'lit-html/directives/until'
import { hydra, rdfs } from '@tpluscode/rdf-ns-builders'
import { pageTitle } from '../scopes'
import { rdfType } from '../matchers'
import { State, app } from '../../lib/state'
import { wba } from '../../lib/ns'

const pageTitleInternal = 'page-title-internal'

ViewTemplates.default.when
  .scopeMatches(pageTitle)
  .valueMatches(rdfType(wba.Entrypoint))
  .renders(
    (value: Resource, next, scope, { state }: { state: State }) => html`
      <canvas-emphasis-title
        background-image="${state.pageTitle.background}"
        heading="${ifDefined(value.title)}"
        lead="${ifDefined(value.description)}"
      ></canvas-emphasis-title>
    `,
  )

ViewTemplates.default.when
  .scopeMatches(pageTitle)
  .valueMatches(v => typeof v === 'object')
  .renders((resource: RdfResource & ResourceIndexer) => {
    const title = resource.getString(hydra.title, { strict: false }) || resource.getString(rdfs.label, { strict: false }) || resource.id.value
    const description = resource.getString(hydra.description, { strict: false }) || resource.getString(rdfs.comment, { strict: false })

    const appResolved = app.then(
      ({ states }) => html`
      <section id="page-title" ?hidden="${states.val.pageTitle.hidden}">
        <div class="container clearfix">
          <h1>${title}</h1>
          ${description
    ? html`
                <span>${description}</span>
              `
    : ''}
        </div>
      </section>
    `,
    )

    return html`
    ${until(appResolved, '')}
  `
  })

ViewTemplates.default.when
  .scopeMatches(pageTitle)
  .valueMatches(v => typeof v === 'string')
  .renders((title, next) => next({ title }, pageTitleInternal))
