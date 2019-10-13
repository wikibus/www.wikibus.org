import { ViewTemplates } from '@lit-any/views'
import { Collection, HydraResource } from 'alcaeus/types/Resources'
import { html } from 'lit-html'
import { expand } from '@zazuko/rdf-vocabularies'
import { resourceMain } from '../scopes'
import { rdfType } from '../matchers'
import { State } from '../../lib/state'
import { galleryContents } from './_partials/galleryContents'
import './sidebar.ts'

function mapMember(resource: HydraResource) {
  return {
    image: resource.image,
    title: resource.title || resource[expand('dcterms:title')] || 'Item',
    id: resource.id,
  } as any
}

ViewTemplates.default.when
  .scopeMatches(resourceMain)
  .valueMatches(rdfType('hydra:Collection'))
  .renders((resource: Collection, next, scope, { state }: { state: State<Collection> }) => {
    import('../../components/canvas-shell/canvas-portfolio')

    return html`
      <div class="container clearfix">
        ${next(resource, 'collection-sidebar')}
        <div class="postcontent nobottommargin col_last">
          ${galleryContents(state, { mapMember })}
        </div>
      </div>
    `
  })
