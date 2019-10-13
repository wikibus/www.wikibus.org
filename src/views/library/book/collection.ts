import { ViewTemplates } from '@lit-any/views'
import { collectionOf } from '../../matchers'
import { portfolioGallery } from '../../_partials/portfolioGallery'
import { Source } from '../../../lib/types/Source'
import { resourceMain } from '../../scopes'

ViewTemplates.default.when
  .scopeMatches(resourceMain)
  .valueMatches(collectionOf('wbo:Book'))
  .renders(
    portfolioGallery<Source>({
      mapMember: book => ({
        image: book.image,
        title: book.title || 'Book',
        id: book.id,
      }),
    }),
  )
