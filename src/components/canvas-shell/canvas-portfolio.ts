import { css, customElement, html, LitElement, property } from 'lit-element'
import { repeat } from 'lit-html/directives/repeat'
import { ImageObject } from '@rdfine/schema'
import CanvasShellBase from './CanvasShellBase'
import { MoreHorizontal, ZoomIn } from '../icons'

export interface PortfolioItem {
  id: string
  title: string
  image: ImageObject | null
}

@customElement('canvas-portfolio')
export class CanvasPortfolio extends CanvasShellBase(LitElement) {
  @property({ type: String })
  public transition = '0.65s'

  @property({ type: String })
  public layoutMode = 'masonry'

  @property({ type: Number })
  public stagger = 0

  @property({ type: Boolean, attribute: 'origin-left' })
  public originLeft = true

  @property({ type: Array, attribute: false })
  public items: PortfolioItem[] = []

  private __initialized = false

  private fallbackImage = 'images/portfolio-gallery/book-stack.jpg'

  public connectedCallback() {
    super.connectedCallback()

    this.$(window).on('resize', () => {
      this.arrange()
      this.portfolioDescMargin()
    })
    if (this.$(document.body).hasClass('rtl')) {
      this.originLeft = false
    }
  }

  public static get styles() {
    return [
      super.styles || [],
      css`
        .portfolio-desc {
          height: 100px;
          white-space: nowrap;
        }

        .portfolio-desc h3 {
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .portfolio-overlay svg {
          margin-top: -5px;
        }
      `,
    ]
  }

  protected firstUpdated() {
    // this.ajaxload()
    this.gridInit()
    // this.filterInit()
    // this.shuffleInit()
    this.arrange()
    this.portfolioDescMargin()
  }

  protected updated(_changedProperties: Map<PropertyKey, unknown>) {
    if (_changedProperties.has('items')) {
      this.__reloadIsotope()
    }
  }

  private __reloadIsotope() {
    const $container = this.getContainer()
    if (!$container || !this.__initialized) return

    $container.isotope('reloadItems')
    this.gridInit()
  }

  // eslint-disable-next-line class-methods-use-this
  private renderMagnifierLink(image: ImageObject | null) {
    if (!image) {
      return html``
    }

    return html`
      <a href="${image.contentUrl?.value}" class="left-icon" data-lightbox="image" target="_blank">
        ${ZoomIn()}
      </a>
    `
  }

  private renderPortfolioItem(item: PortfolioItem) {
    return html`
      <article class="portfolio-item pf-media pf-icons" title="${item.title}">
        <div class="portfolio-image">
          <ld-link resource-url="${item.id}">
            <a>
              <img
                @load="${this.layout}"
                src="${item.image?.thumbnail?.contentUrl?.value || this.fallbackImage}"
                alt="${item.title}"
              />
            </a>
          </ld-link>
          <div class="portfolio-overlay">
            ${this.renderMagnifierLink(item.image)}
            <ld-link resource-url="${item.id}">
              <a class="${item.image ? 'right-icon' : 'center-icon'}">${MoreHorizontal()}</a>
            </ld-link>
          </div>
        </div>
        <div class="portfolio-desc">
          <h3>
            <ld-link resource-url="${item.id}">
              <a>${item.title}</a>
            </ld-link>
          </h3>
          <!--<span><a href="#">Media</a>, <a href="#">Icons</a></span>-->
        </div>
      </article>
    `
  }

  protected render() {
    return html`
      <div id="portfolio" class="portfolio grid-container clearfix">
        ${repeat(this.items, this.renderPortfolioItem.bind(this))}
      </div>
    `
  }

  private getContainer() {
    const containerElement = this.renderRoot.querySelector('#portfolio')
    if (containerElement == null) {
      // eslint-disable-next-line no-console
      console.error('gridInit: Container element not found')
      return null
    }

    return this.$(containerElement)
  }

  private layout() {
    const $container = this.getContainer()
    if (!$container || !this.__initialized) return
    $container.isotope('layout')
  }

  private gridInit() {
    const $container = this.getContainer()
    if (!$container) return

    if (!this.$().isotope) {
      // eslint-disable-next-line no-console
      console.log('gridInit: Isotope not Defined.')
      return
    }

    $container.each((i, e) => {
      const element = this.$(e)

      setTimeout(() => {
        if (element.hasClass('portfolio')) {
          element.isotope({
            layoutMode: this.layoutMode,
            isOriginLeft: this.originLeft,
            transitionDuration: this.transition,
            stagger: this.stagger,
            masonry: {
              columnWidth: element.find('.portfolio-item:not(.wide)')[0],
            },
          })
        } else {
          element.isotope({
            layoutMode: this.layoutMode,
            isOriginLeft: this.originLeft,
            transitionDuration: this.transition,
          })
        }

        this.__initialized = true
      }, 300)
    })
  }

  /* filterInit() {
    if (!this.$().isotope) {
      console.log('filterInit: Isotope not Defined.')
      return
    }

    if ($portfolioFilter.length < 1) { return }
    if ($portfolioFilter.hasClass('customjs')) { return }

    $portfolioFilter.each(function () {
      const element = $(this)
      const elementContainer = element.attr('data-container')
      let elementActiveClass = element.attr('data-active-class')
      const elementDefaultFilter = element.attr('data-default')

      if (!elementActiveClass) { elementActiveClass = 'activeFilter' }

      element.find('a').off('click').on('click', () => {
        element.find('li').removeClass(elementActiveClass)
        $(this).parent('li').addClass(elementActiveClass)
        const selector = $(this).attr('data-filter')
        $(elementContainer).isotope({ filter: selector })
        return false
      })

      if (elementDefaultFilter) {
        element.find('li').removeClass(elementActiveClass)
        element.find(`[data-filter="${elementDefaultFilter}"]`).parent('li').addClass(elementActiveClass)
        $(elementContainer).isotope({ filter: elementDefaultFilter })
      }
    })
  }

  shuffleInit() {
    if (!$().isotope) {
      console.log('shuffleInit: Isotope not Defined.')
      return true
    }

    if ($('.portfolio-shuffle').length < 1) { return true }

    $('.portfolio-shuffle').off('click').on('click', function () {
      const element = $(this)
      const elementContainer = element.attr('data-container')

      $(elementContainer).isotope('shuffle')
    })
  } */

  private portfolioDescMargin() {
    const $portfolioOverlayEl = this.$('.portfolio-overlay', this.renderRoot)
    if ($portfolioOverlayEl.length > 0) {
      $portfolioOverlayEl.each((i, e) => {
        const element = this.$(e)
        if (element.find('.portfolio-desc').length > 0) {
          let portfolioOverlayIconHeight = 0
          const portfolioOverlayHeight = element.outerHeight() || 0
          const portfolioOverlayDescHeight = element.find('.portfolio-desc').outerHeight() || 0
          if (
            element.find('a.left-icon').length > 0 ||
            element.find('a.right-icon').length > 0 ||
            element.find('a.center-icon').length > 0
          ) {
            portfolioOverlayIconHeight = 40 + 20
          }
          const portfolioOverlayMiddleAlign =
            (portfolioOverlayHeight - portfolioOverlayDescHeight - portfolioOverlayIconHeight) / 2
          element.find('.portfolio-desc').css({ 'margin-top': portfolioOverlayMiddleAlign })
        }
      })
    }
  }

  private arrange() {
    const $portfolio = this.$('.portfolio', this.renderRoot)

    if ($portfolio.length > 0) {
      $portfolio.each((i, e) => {
        const element = this.$(e)
        SEMICOLON.initialize.setFullColumnWidth(element)
      })
    }
  }

  /* ajaxload() {
    $('.portfolio-ajax .portfolio-item a.center-icon').off('click').on('click', function (e) {
      const portPostId = $(this).parents('.portfolio-item').attr('id')
      if (!$(this).parents('.portfolio-item').hasClass('portfolio-active')) {
        this.loadItem(portPostId, prevPostPortId)
      }
      e.preventDefault()
    })
  }

  newNextPrev(portPostId) {
    const portNext = SEMICOLON.portfolio.getNextItem(portPostId)
    const portPrev = SEMICOLON.portfolio.getPrevItem(portPostId)
    $('#next-portfolio').attr('data-id', portNext)
    $('#prev-portfolio').attr('data-id', portPrev)
  }

  loadItem(portPostId, prevPostPortId, getIt) {
    if (!getIt) { getIt = false }
    const portNext = SEMICOLON.portfolio.getNextItem(portPostId)
    const portPrev = SEMICOLON.portfolio.getPrevItem(portPostId)
    if (getIt == false) {
      SEMICOLON.portfolio.closeItem()
      $portfolioAjaxLoader.fadeIn()
      const portfolioDataLoader = $(`#${portPostId}`).attr('data-loader')
      $portfolioDetailsContainer.load(portfolioDataLoader, { portid: portPostId, portnext: portNext, portprev: portPrev },
        () => {
          SEMICOLON.portfolio.initializeAjax(portPostId)
          SEMICOLON.portfolio.openItem()
          $portfolioItems.removeClass('portfolio-active')
          $(`#${portPostId}`).addClass('portfolio-active')
        })
    }
  }

  closeItem() {
    if ($portfolioDetails && $portfolioDetails.height() > 32) {
      $portfolioAjaxLoader.fadeIn()
      $portfolioDetails.find('#portfolio-ajax-single').fadeOut('600', function () {
        $(this).remove()
      })
      $portfolioDetails.removeClass('portfolio-ajax-opened')
    }
  }

  openItem() {
    const noOfImages = $portfolioDetails.find('img').length
    let noLoaded = 0

    if (noOfImages > 0) {
      $portfolioDetails.find('img').on('load', () => {
        noLoaded++
        const topOffsetScroll = SEMICOLON.initialize.topScrollOffset()
        if (noOfImages === noLoaded) {
          $portfolioDetailsContainer.css({ display: 'block' })
          $portfolioDetails.addClass('portfolio-ajax-opened')
          $portfolioAjaxLoader.fadeOut()
          const t = setTimeout(() => {
            SEMICOLON.widget.loadFlexSlider()
            SEMICOLON.initialize.lightbox()
            SEMICOLON.initialize.resizeVideos()
            SEMICOLON.widget.masonryThumbs()
            $('html,body').stop(true).animate({
              scrollTop: $portfolioDetails.offset().top - topOffsetScroll,
            }, 900, 'easeOutQuad')
          }, 500)
        }
      })
    } else {
      const topOffsetScroll = SEMICOLON.initialize.topScrollOffset()
      $portfolioDetailsContainer.css({ display: 'block' })
      $portfolioDetails.addClass('portfolio-ajax-opened')
      $portfolioAjaxLoader.fadeOut()
      const t = setTimeout(() => {
        SEMICOLON.widget.loadFlexSlider()
        SEMICOLON.initialize.lightbox()
        SEMICOLON.initialize.resizeVideos()
        SEMICOLON.widget.masonryThumbs()
        $('html,body').stop(true).animate({
          scrollTop: $portfolioDetails.offset().top - topOffsetScroll,
        }, 900, 'easeOutQuad')
      }, 500)
    }
  }

  getNextItem(portPostId) {
    let portNext = ''
    const hasNext = $(`#${portPostId}`).next()
    if (hasNext.length != 0) {
      portNext = hasNext.attr('id')
    }
    return portNext
  }

  getPrevItem(portPostId) {
    let portPrev = ''
    const hasPrev = $(`#${portPostId}`).prev()
    if (hasPrev.length != 0) {
      portPrev = hasPrev.attr('id')
    }
    return portPrev
  }

  initializeAjax(portPostId) {
    prevPostPortId = $(`#${portPostId}`)

    $('#next-portfolio, #prev-portfolio').off('click').on('click', function () {
      const portPostId = $(this).attr('data-id')
      $portfolioItems.removeClass('portfolio-active')
      $(`#${portPostId}`).addClass('portfolio-active')
      this.loadItem(portPostId, prevPostPortId)
      return false
    })

    $('#close-portfolio').off('click').on('click', () => {
      $portfolioDetailsContainer.fadeOut('600', () => {
        $portfolioDetails.find('#portfolio-ajax-single').remove()
      })
      $portfolioDetails.removeClass('portfolio-ajax-opened')
      $portfolioItems.removeClass('portfolio-active')
      return false
    })
  } */
}
