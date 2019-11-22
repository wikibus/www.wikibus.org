import { customElement, html, LitElement, property, queryAll, css } from 'lit-element'
import { repeat } from 'lit-html/directives/repeat'
import { ifDefined } from 'lit-html/directives/if-defined'
import CanvasShellBase from './CanvasShellBase'
import { Image } from '../../lib/types/Image'
import CanvasLightboxMixin from './CanvasLightboxMixin'

@customElement('canvas-fslider')
export class CanvasFslider extends CanvasLightboxMixin(CanvasShellBase(LitElement)) {
  @queryAll('.flexslider')
  private __flexslider?: HTMLDivElement[]

  @property({ type: Array })
  public images: Image[] = []

  @property({ type: Object })
  public primaryImage: Image | null = null

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

  protected firstUpdated(): void {
    const $flexSliderEl = this.$(this.renderRoot).find('.flexslider')
    this._initLightbox()
    if ($flexSliderEl.length > 0) {
      $flexSliderEl.each((i, e) => {
        const $flexsSlider = this.$(e) as any
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
      <div class="flexslider">
        <div class="slider-wrap" data-lightbox="gallery">
          ${repeat(this.images, CanvasFslider.__slide)}
        </div>
      </div>
    `
  }

  private static __slide(image: Image) {
    const thumbnailUrl = image.thumbnail ? image.thumbnail.contentUrl : undefined

    return html`
      <div class="slide" data-thumb="${ifDefined(thumbnailUrl)}">
        <a data-lightbox="gallery-item" href="${image.contentUrl}"
          ><img src="${image.contentUrl}" alt=""
        /></a>
      </div>
    `
  }
}
