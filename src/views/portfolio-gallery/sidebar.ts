import { ViewTemplates } from '@lit-any/views'
import { html } from 'lit-html'
import { Vocab } from 'alcaeus'
import { Collection } from 'alcaeus/types/Resources'
import { operationSelector } from '../scopes'

ViewTemplates.default.when.scopeMatches('collection-sidebar').renders(
  (resource: Collection, next) => html`
    <div class="sidebar nobottommargin">
      <div class="sidebar-widgets-wrap">
        ${next(resource, operationSelector)}
        <div class="widget quick-contact-widget form-widget clearfix">
          <h4>Search</h4>
          <url-template-form
            .template="${resource[Vocab('search')]}"
            .value="${resource['http://hydra-ex.rest/vocab/currentMappings'] || {}}"
          ></url-template-form>
        </div>
      </div>
    </div>
  `,
)
