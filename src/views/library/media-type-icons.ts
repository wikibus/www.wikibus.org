import { ViewTemplates } from '@lit-any/views'
import { schema } from '@tpluscode/rdf-ns-builders'
import { html } from 'lit-html'
import { HydraResource } from 'alcaeus'
import { Pdf } from '../../components/icons'
import { mediaTypeIcon } from '../scopes'

ViewTemplates.default.when
  .scopeMatches(mediaTypeIcon)
  .valueMatches((res: HydraResource) => res.getString(schema.encodingFormat) === 'application/pdf')
  .renders(
    () =>
      html`
        ${Pdf}
      `,
  )
