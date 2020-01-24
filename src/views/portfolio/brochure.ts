import { ViewTemplates } from '@lit-any/views'
import { rdfType } from '../matchers'
import { Source } from '../../lib/types/Source'
import '../../components/canvas-shell/canvas-fslider.ts'
import { portfolioSingleGallery } from './portfolioSingleGallery'
import { resourceMain } from '../scopes'

ViewTemplates.default.when
  .scopeMatches(resourceMain)
  .valueMatches(rdfType('wbo:Brochure'))
  .renders(
    portfolioSingleGallery<Source>({
      title(brochure) {
        return brochure.title
      },
      images(brochure) {
        return brochure.images
      },
      heading: 'About this brochure',
      primaryImage(brochure) {
        return brochure.primaryImage
      },
    }),
  )
