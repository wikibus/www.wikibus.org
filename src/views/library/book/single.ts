import { ViewTemplates } from '@lit-any/views'
import { rdfType } from '../../matchers'
import { Source } from '../../../lib/types/Source'
import '../../../components/canvas-shell/canvas-fslider'
import { portfolioSingleGallery } from '../../_partials/portfolioSingleGallery'

ViewTemplates.default.when
  .scopeMatches('wikibus-resource')
  .valueMatches(rdfType('wbo:Book'))
  .renders(
    portfolioSingleGallery<Source>({
      title(book) {
        return book.title
      },
      images(book) {
        return book.image ? [book.image] : []
      },
      heading: 'About this book',
      excludedProperties: ['schema:image'],
    }),
  )
