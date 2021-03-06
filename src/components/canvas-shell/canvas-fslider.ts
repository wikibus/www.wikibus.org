import { customElement, html, LitElement, property, queryAll, css } from 'lit-element'
import { repeat } from 'lit-html/directives/repeat'
import { render } from 'lit-html'
import { ifDefined } from 'lit-html/directives/if-defined'
import { Operation } from 'alcaeus'
import type { ImageObject } from '@rdfine/schema'
import CanvasShellBase from './CanvasShellBase'
import CanvasLightboxMixin from './CanvasLightboxMixin'
import { operationList } from '../../views/scopes'

@customElement('canvas-fslider')
export class CanvasFslider extends CanvasLightboxMixin(CanvasShellBase(LitElement)) {
  @queryAll('.flexslider')
  private __flexslider?: HTMLDivElement[]

  @property({ type: Array })
  public images: ImageObject[] = []

  @property({ type: Object })
  public primaryImage: ImageObject | null = null

  @property()
  public animation = 'slide'

  @property()
  public direction = 'horizontal'

  @property()
  public easing = 'swing'

  @property({ type: Boolean })
  public reverse = false

  @property({ type: Boolean })
  public slideshow = false

  @property({ type: Number })
  public pause = 5000

  @property({ type: Number })
  public speed = 600

  @property({ type: Boolean })
  public video = false

  @property({ type: Boolean })
  public pagi = false

  @property({ type: Boolean })
  public touch = false

  @property({ type: Boolean })
  public hover = false

  @property({ type: Boolean })
  public smoothHeight = true

  @property({ type: Boolean, attribute: 'no-arrows' })
  public noArrows = false

  @property({ type: Boolean })
  public thumbs = true

  @property({ type: Array })
  private __menuOperations: Operation[] = []

  public static get styles() {
    return [
      super.styles || [],
      css`
        .flexslider {
          height: auto !important;
        }
      `,
    ]
  }

  public connectedCallback() {
    super.connectedCallback()

    import('@vaadin/vaadin-context-menu')
  }

  protected firstUpdated(): void {
    this.__resetSlider()
  }

  protected updated(_changedProperties: Map<PropertyKey, unknown>) {
    if (_changedProperties.has('images')) {
      const thumbs = this.renderRoot.querySelector('ol.flex-control-thumbs')
      if (thumbs) {
        thumbs.remove()
      }
      this.__resetSlider()
    }
  }

  private __resetSlider() {
    const $flexSliderEl = this.$(this.renderRoot).find('.flexslider')
    this._initLightbox()
    if ($flexSliderEl.length > 0) {
      $flexSliderEl.each((i, e) => {
        const $flexsSlider = this.$(e) as any
        $flexsSlider.removeData('flexslider')
        $flexsSlider.flexslider({
          selector: '.slider-wrap > .slide',
          animation: this.animation,
          easing: this.easing,
          direction: this.direction,
          reverse: this.reverse,
          slideshow: this.slideshow,
          slideshowSpeed: this.pause,
          animationSpeed: this.speed,
          pauseOnHover: this.hover,
          video: this.video,
          controlNav: this.thumbs ? 'thumbnails' : this.pagi,
          directionNav: !this.noArrows,
          smoothHeight: this.direction === 'vertical' ? false : this.smoothHeight,
          useCSS: this.easing === 'swing',
          touch: this.touch,
          start(slider: any) {
            // SEMICOLON.widget.animations()
            // SEMICOLON.initialize.verticalMiddle()
            slider.parent().removeClass('preloader2')
            // const t = setTimeout(() => { $('.grid-container').isotope('layout') }, 1200)
            // $('.flex-prev').html('<i class="icon-angle-left"></i>')
            // $('.flex-next').html('<i class="icon-angle-right"></i>')
            // SEMICOLON.portfolio.portfolioDescMargin()
          },
          after() {
            /* if ($('.grid-container').hasClass('portfolio-full')) {
              $('.grid-container.portfolio-full').isotope('layout')
              SEMICOLON.portfolio.portfolioDescMargin()
            }
            if ($('.post-grid').hasClass('post-masonry-full')) {
              $('.post-grid.post-masonry-full').isotope('layout')
            } */
          },
        })
      })
    }
  }

  protected render() {
    return html`
      <vaadin-context-menu .renderer="${CanvasFslider.__contextMenu}">
        <div class="flexslider">
          <div class="slider-wrap" data-lightbox="gallery">
            ${repeat(this.images, CanvasFslider.__slide)}
          </div>
        </div>
      </vaadin-context-menu>
    `
  }

  private static __slide(image: ImageObject) {
    const thumbnailUrl = image.thumbnail?.contentUrl?.value

    return html`
      <div class="slide" data-thumb="${ifDefined(thumbnailUrl)}">
        <a data-lightbox="gallery-item" href="${image.contentUrl?.value}"
          ><img src="${image.contentUrl?.value}" alt="" ._image="${image}"
        /></a>
      </div>
    `
  }

  private static __contextMenu(
    root: Element,
    contextMenu: Element,
    context: { target: { _image: ImageObject } },
  ) {
    render(
      html`
        <canvas-view
          .templateScope="${operationList}"
          .value="${context.target._image}"
        ></canvas-view>
      `,
      root,
    )
  }
}
