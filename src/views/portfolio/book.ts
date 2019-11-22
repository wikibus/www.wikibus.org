import { ViewTemplates } from '@lit-any/views'
import { rdfType } from '../matchers'
import { Source } from '../../lib/types/Source'
import '../../components/canvas-shell/canvas-fslider.ts'
import { portfolioSingleGallery } from './portfolioSingleGallery'
import { resourceMain } from '../scopes'

ViewTemplates.default.when
  .scopeMatches(resourceMain)
  .valueMatches(rdfType('wbo:Book'))
  .renders(
    portfolioSingleGallery<Source>({
      title(book) {
        return book.title
      },
      images(book) {
        return book.images
      },
      heading: 'About this book',
      primaryImage(resource) {
        return resource.primaryImage
      },
    }),
  )
