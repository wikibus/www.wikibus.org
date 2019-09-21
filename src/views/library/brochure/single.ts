import { ViewTemplates } from '@lit-any/views'
import { rdfType } from '../../matchers'
import { Source } from '../../../lib/types/Source'
import '../../../components/canvas-shell/canvas-fslider'
import { portfolioSingleGallery } from '../../_partials/portfolioSingleGallery'

ViewTemplates.default.when
  .scopeMatches('wikibus-resource')
  .valueMatches(rdfType('wbo:Brochure'))
  .renders(
    portfolioSingleGallery<Source>({
      title(brochure) {
        return brochure.title
      },
      images(brochure) {
        return brochure.image ? [brochure.image] : []
      },
      heading: 'About this brochure',
      excludedProperties: ['schema:image'],
    }),
  )
