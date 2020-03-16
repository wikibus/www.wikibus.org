import { ViewTemplates } from '@lit-any/views'
import { Collection, HydraResource } from 'alcaeus/types/Resources'
import { html } from 'lit-html'
import { dcterms, schema, hydra } from '@tpluscode/rdf-ns-builders'
import { resourceMain } from '../scopes'
import { rdfType } from '../matchers'
import { State } from '../../lib/state'
import { galleryContents } from './_partials/galleryContents'
import './sidebar.ts'

function mapMember(resource: HydraResource) {
  return {
    image: resource[schema.primaryImageOfPage.value] || resource.getArray(schema.image.value)[0],
    title: resource.title || resource[dcterms.title.value] || 'Item',
    id: resource.id,
  } as any
}

ViewTemplates.default.when
  .scopeMatches(resourceMain)
  .valueMatches(rdfType(hydra.Collection))
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
