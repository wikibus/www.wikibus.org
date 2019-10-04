import { html } from 'lit-html'
import { Collection, HydraResource } from 'alcaeus/types/Resources'
import { RenderFunc } from '@lit-any/views/lib'
import { PortfolioItem } from '../../components/canvas-shell/canvas-portfolio'
import { app, State } from '../../lib/state'

function loadPreviousPage(state: State) {
  return async () => {
    const { actions } = await app
    if (state.gallery.prevPage && !state.gallery.prevPageLoading) {
      actions.gallery.prependToGallery(state.gallery.prevPage)
      actions.core.overrideResourceUrl(state.gallery.prevPage.id)
    }
  }
}

function loadNextPage(state: State) {
  return async () => {
    const { actions } = await app
    if (state.gallery.nextPage && !state.gallery.nextPageLoading) {
      actions.gallery.appendToGallery(state.gallery.nextPage)
      actions.core.overrideResourceUrl(state.gallery.nextPage.id)
    }
  }
}

export function portfolioGallery<T extends HydraResource>(options: {
  mapMember: (member: T) => PortfolioItem
}): RenderFunc {
  import('../../components/canvas-shell/canvas-portfolio')

  return (state: State<Collection>) => {
    if (state.gallery.collectionId !== state.core.resource.id) {
      app.then(a => a.actions.gallery.replaceGallery(state.core.resource as Collection))
    }

    return html`
      <section id="content">
        <div class="content-wrap">
          <div class="container clearfix">
            <div class="center" ?hidden="${!state.gallery.prevPage}">
              <ld-link
                resource-url="${state.gallery.prevPage && state.gallery.prevPage.id}"
                disabled
              >
                <a
                  @click="${loadPreviousPage(state)}"
                  class="button button-full button-dark button-rounded load-next-portfolio"
                  >Previous page...${state.gallery.prevPageLoading ? ' (loading)' : ''}</a
                >
              </ld-link>
            </div>
            <canvas-portfolio .items="${state.gallery.resources.map(options.mapMember)}">
            </canvas-portfolio>
            <div class="center" ?hidden="${!state.gallery.nextPage}">
              <ld-link
                resource-url="${state.gallery.nextPage && state.gallery.nextPage.id}"
                disabled
              >
                <a
                  @click="${loadNextPage(state)}"
                  class="button button-full button-dark button-rounded load-next-portfolio"
                  >Next page...${state.gallery.nextPageLoading ? ' (loading)' : ''}</a
                >
              </ld-link>
            </div>
          </div>
        </div>
      </section>
    `
  }
}
