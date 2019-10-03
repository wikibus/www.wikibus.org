import { ViewTemplates } from '@lit-any/views'
import { collectionOf } from '../../matchers'
import { portfolioGallery } from '../../_partials/portfolioGallery'
import { Source } from '../../../lib/types/Source'

ViewTemplates.default.when
  .scopeMatches('hydrofoil-shell')
  .valueMatches(collectionOf('wbo:Brochure'))
  .renders(
    portfolioGallery<Source>({
      mapMember: brochure => ({
        image: brochure.image,
        title: brochure.title || 'Brochure',
        id: brochure.id,
      }),
    }),
  )
