import { ViewTemplates } from '@lit-any/views'
import { html } from 'lit-html'
import { until } from 'lit-html/directives/until'
import { schema } from '@tpluscode/rdf-ns-builders'
import { RdfResource } from 'alcaeus'
import { resourceMain, pageTitle, operationForm } from './scopes'
import { State, app } from '../lib/state'

ViewTemplates.default.when
  .scopeMatches('hydrofoil-shell')
  .valueMatches((v: State) => !!v.core.resource && !v.core.debug)
  .renders(
    (state: State, next) => html`
      ${next(state.core.operationForm, operationForm, { state })}
      ${next(state.core.resource, pageTitle, { state })}
      <section id="content">
        <div class="content-wrap">${next(state.core.resource, resourceMain, { state })}</div>
      </section>
    `,
  )

ViewTemplates.default.when
  .scopeMatches(resourceMain)
  .valueMatches(() => true)
  .renders((resource, next, scope, { state }) => {
    const loaded = import('./maintenance')

    app.then(({ actions }) => {
      if (!state.pageTitle.hidden) {
        actions.hidePageTitle()
      }
    })

    return html`
      ${until(
        loaded.then(i => i.template),
        '',
      )}
    `
  })

ViewTemplates.default.when
  .valueMatches(
    (resource: RdfResource) => resource && resource.types && resource.types.has(schema.ImageObject),
  )
  .valueMatches((image: RdfResource) => !!image.get(schema.contentUrl)?.id)
  .renders((image: RdfResource) => html` <img src=${image.get(schema.contentUrl).id} /> `)
