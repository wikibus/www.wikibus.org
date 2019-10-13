import { html } from 'lit-html'
import { DocumentedResource, HydraResource } from 'alcaeus/types/Resources'
import { ViewTemplates } from '@lit-any/views'
import { pageTitle } from '../scopes'

function renderTitle(title: string, description?: string) {
  return html`
    <section id="page-title">
      <div class="container clearfix">
        <h1>${title}</h1>
        ${description
          ? html`
              <span>${description}</span>
            `
          : ''}
      </div>
    </section>
  `
}

ViewTemplates.default.when
  .scopeMatches(pageTitle)
  .valueMatches(v => typeof v === 'object')
  .renders((resource: HydraResource, next) => {
    if ('title' in resource) {
      return renderTitle(
        (resource as DocumentedResource).title,
        (resource as DocumentedResource).description,
      )
    }

    return renderTitle(resource.id)
  })

ViewTemplates.default.when
  .scopeMatches(pageTitle)
  .valueMatches(v => typeof v === 'string')
  .renders(title => renderTitle(title))
