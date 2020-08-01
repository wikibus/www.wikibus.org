import { html } from 'lit-html'
import { PortfolioItem } from '../../../components/canvas-shell/canvas-portfolio'
import { app, State } from '../../../lib/state'
import '../../../components/url-template-form.ts'

interface GalleryOptions<T> {
  mapMember: (member: T) => PortfolioItem
}

function loadPreviousPage(state: State) {
  return async () => {
    const { actions } = await app
    if (state.gallery.prevPage && !state.gallery.prevPageLoading) {
      actions.prependToGallery(state.gallery.prevPage)
      actions.overrideResourceUrl(state.gallery.prevPage.id.value)
    }
  }
}

function loadNextPage(state: State) {
  return async () => {
    const { actions } = await app
    if (state.gallery.nextPage && !state.gallery.nextPageLoading) {
      actions.appendToGallery(state.gallery.nextPage)
      actions.overrideResourceUrl(state.gallery.nextPage.id.value)
    }
  }
}

export function galleryContents<T>(state: State, options: GalleryOptions<T>) {
  return html`
    <div class="center" ?hidden="${!state.gallery.prevPage}">
      <ld-link resource-url="${state.gallery.prevPage && state.gallery.prevPage.id.value}" disabled>
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
      <ld-link resource-url="${state.gallery.nextPage && state.gallery.nextPage.id.value}" disabled>
        <a
          @click="${loadNextPage(state)}"
          class="button button-full button-dark button-rounded load-next-portfolio"
          >Next page...${state.gallery.nextPageLoading ? ' (loading)' : ''}</a
        >
      </ld-link>
    </div>
  `
}
