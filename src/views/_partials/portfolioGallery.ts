import { html } from 'lit-html'
import { Collection, HydraResource } from 'alcaeus/types/Resources'
import { RenderFunc } from '@lit-any/views/lib'
import { PortfolioItem } from '../../components/canvas-shell/canvas-portfolio'
import { State, actions } from '../../lib/state'

function loadPreviousPage(state: State) {
  return async () => (await actions).prependToGallery(state.gallery.prevPage)
}

function loadNextPage(state: State) {
  return async () => (await actions).appendToGallery(state.gallery.nextPage)
}

export function portfolioGallery<T extends HydraResource>(options: {
  mapMember: (member: T) => PortfolioItem
}): RenderFunc {
  import('../../components/canvas-shell/canvas-portfolio')

  return (state: State<Collection>) => {
    if (state.gallery.collectionId !== state.resource.id) {
      actions.then(a => a.replaceGallery(state.resource as Collection))
    }

    return html`
      <section id="content" @ld-navigated="${(e: Event) => e.stopPropagation()}">
        <div class="content-wrap">
          <div class="container clearfix">
            <div class="center" ?hidden="${!state.gallery.prevPage}">
              <ld-link resource-url="${state.gallery.prevPage && state.gallery.prevPage.id}">
                <a
                  @click="${loadPreviousPage(state)}"
                  class="button button-full button-dark button-rounded load-next-portfolio"
                  >Previous page...</a
                >
              </ld-link>
            </div>
            <canvas-portfolio .items="${state.gallery.resources.map(options.mapMember)}">
            </canvas-portfolio>
            <div class="center" ?hidden="${!state.gallery.nextPage}">
              <ld-link resource-url="${state.gallery.nextPage && state.gallery.nextPage.id}">
                <a
                  @click="${loadNextPage(state)}"
                  class="button button-full button-dark button-rounded load-next-portfolio"
                  >Next page...</a
                >
              </ld-link>
            </div>
          </div>
        </div>
      </section>
    `
  }
}
