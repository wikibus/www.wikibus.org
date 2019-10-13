import { Vocab } from 'alcaeus'
import { html } from 'lit-html'
import { Collection, HydraResource } from 'alcaeus/types/Resources'
import { RenderFunc } from '@lit-any/views/lib'
import { PortfolioItem } from '../../components/canvas-shell/canvas-portfolio'
import { app, State } from '../../lib/state'
import '../../components/url-template-form.ts'

interface GalleryOptions<T> {
  mapMember: (member: T) => PortfolioItem
}

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

function galleryContents<T>(state: State, options: GalleryOptions<T>) {
  return html`
    <div class="center" ?hidden="${!state.gallery.prevPage}">
      <ld-link resource-url="${state.gallery.prevPage && state.gallery.prevPage.id}" disabled>
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
      <ld-link resource-url="${state.gallery.nextPage && state.gallery.nextPage.id}" disabled>
        <a
          @click="${loadNextPage(state)}"
          class="button button-full button-dark button-rounded load-next-portfolio"
          >Next page...${state.gallery.nextPageLoading ? ' (loading)' : ''}</a
        >
      </ld-link>
    </div>
  `
}

function sidebar(resource: Collection) {
  return html`
    <div class="sidebar nobottommargin">
      <div class="sidebar-widgets-wrap">
        <div class="widget quick-contact-widget form-widget clearfix">
          <h4>Search</h4>
          <url-template-form
            .template="${resource[Vocab('search')]}"
            .value="${resource['http://hydra-ex.rest/vocab/currentMappings']}"
          ></url-template-form>
        </div>
      </div>
    </div>
  `
}

export function portfolioGallery<T extends HydraResource>(options: GalleryOptions<T>): RenderFunc {
  import('../../components/canvas-shell/canvas-portfolio')

  return (resource: Collection, next, scope, { state }: { state: State<Collection> }) => html`
    <div class="container clearfix">
      ${sidebar(resource)}
      <div class="postcontent nobottommargin col_last">
        ${galleryContents(state, options)}
      </div>
    </div>
  `
}
