import { ViewTemplates } from '@lit-any/views'
import { HydraResource } from 'alcaeus'
import { html } from 'lit-html'
import { collectionTableCell } from '../scopes'

ViewTemplates.default.when
  .scopeMatches(collectionTableCell)
  .valueMatches((v: HydraResource) => v && !!v.id)
  .renders(
    v =>
      html`
        <ld-link resource-url="${v.id.value}"><a>${v.title || v.id}</a></ld-link>
      `,
  )

ViewTemplates.default.when
  .scopeMatches(collectionTableCell)
  .valueMatches(v => typeof v === 'boolean')
  .renders(v => v)
