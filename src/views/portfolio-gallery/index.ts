import { ViewTemplates } from '@lit-any/views'
import { Collection, DocumentedResource, HydraResource } from 'alcaeus'
import { html } from 'lit-html'
import { dcterms, schema, hydra } from '@tpluscode/rdf-ns-builders'
import { resourceMain } from '../scopes'
import { rdfType } from '../matchers'
import { State } from '../../lib/state'
import { galleryContents } from './_partials/galleryContents'
import './sidebar.ts'
import { wba } from '../../lib/ns'
import { collectionTable } from '../collectionTable'
import { PortfolioItem } from '../../components/canvas-shell/canvas-portfolio'

function mapMember(resource: HydraResource & DocumentedResource): PortfolioItem {
  return {
    image: (resource.get(schema.primaryImageOfPage) ||
      resource.getArray(schema.image.value)[0]) as any,
    title: resource.title || resource.getString(dcterms.title) || 'Item',
    id: resource.id.value,
  }
}
ViewTemplates.default.when
  .scopeMatches(resourceMain)
  .valueMatches(rdfType(wba.WishlistCollection))
  .renders((resource: Collection, next, scope, { state }: { state: State<Collection> }) => {
    import('../../components/canvas-shell/canvas-portfolio')

    return html`
      <div class="container clearfix">
        ${next(resource, 'collection-sidebar')}
        <div class="postcontent nobottommargin col_last">
          ${collectionTable(state, next)}
        </div>
      </div>
    `
  })

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
