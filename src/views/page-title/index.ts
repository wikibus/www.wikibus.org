import { ViewTemplates } from '@lit-any/views'
import { HydraResource } from 'alcaeus/types/Resources'
import { html } from 'lit-html'
import { ifDefined } from 'lit-html/directives/if-defined'
import { until } from 'lit-html/directives/until'
import { pageTitle } from '../scopes'
import { rdfType } from '../matchers'
import { State, app } from '../../lib/state'
import { wba } from '../../lib/ns'

const pageTitleInternal = 'page-title-internal'

ViewTemplates.default.when.scopeMatches(pageTitleInternal).renders(({ title, description }) => {
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
  .valueMatches(rdfType(wba.Entrypoint))
  .renders(
    (value: HydraResource, next, scope, { state }: { state: State }) => html`
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
  .renders((resource: HydraResource, next) => {
    if ('title' in resource) {
      return next(resource, pageTitleInternal)
    }

    return next({ title: resource.id }, pageTitleInternal)
  })

ViewTemplates.default.when
  .scopeMatches(pageTitle)
  .valueMatches(v => typeof v === 'string')
  .renders((title, next) => next({ title }, pageTitleInternal))
