import { ViewTemplates } from '@lit-any/views'
import { html } from 'lit-html'
import { expand } from '@zazuko/rdf-vocabularies'
import { rdfType } from '../../matchers'
import { pageTitle } from '../../_partials/pageTitle'
import { Book } from '../../../lib/types/Book'
import '../../../components/canvas-shell/canvas-fslider'

ViewTemplates.default.when
  .scopeMatches('wikibus-resource')
  .valueMatches(rdfType('wbo:Book'))
  .renders(
    (book: Book, next) => html`
      ${pageTitle(book.title || 'Book')}
      <section id="content">
        <div class="content-wrap">
          <div class="container clearfix">
            <!-- Portfolio Single Gallery
          ============================================= -->
            <div class="col_two_third portfolio-single-image nobottommargin">
              <canvas-fslider
                no-arrows
                thumbs
                animation="fade"
                .images="${[book.image]}"
              ></canvas-fslider>
            </div>
            <!-- .portfolio-single-image end -->

            <!-- Portfolio Single Content
          ============================================= -->
            <div class="col_one_third portfolio-single-content col_last nobottommargin">
              <div class="fancy-title title-bottom-border">
                <h2>About this book</h2>
              </div>

              <ul class="portfolio-meta bottommargin">
                ${next(book, 'portfolio-properties', { except: [expand('schema:image')] })}
              </ul>
            </div>

            <div class="clear"></div>
          </div>
        </div>
      </section>
    `,
  )
