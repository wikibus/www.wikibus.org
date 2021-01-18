import { LitElement } from 'lit-element'
import { CanvasShellBase } from './CanvasShellBase'

type ShellConstructor = new (...args: any[]) => LitElement & CanvasShellBase

type ReturnConstructor = new (...args: any[]) => LitElement & CanvasShellBase & LightboxElement

interface LightboxElement {
  _initLightbox(): void
}

export default function mixin<B extends ShellConstructor>(Base: B): B & ReturnConstructor {
  return class extends Base {
    public _initLightbox() {
      const jq = this.$
      const $ = this.$(this.renderRoot).find.bind(this.$(this.renderRoot))

      const $lightboxImageEl = $('[data-lightbox="image"]')
      const $lightboxGalleryEl = $('[data-lightbox="gallery"]')
      const $lightboxIframeEl = $('[data-lightbox="iframe"]')
      const $lightboxInlineEl = $('[data-lightbox="inline"]')
      // const $lightboxAjaxEl = $('[data-lightbox="ajax"]')
      // const $lightboxAjaxGalleryEl = $('[data-lightbox="ajax-gallery"]')

      if ($lightboxImageEl.length > 0) {
        $lightboxImageEl.magnificPopup({
          type: 'image',
          closeOnContentClick: true,
          closeBtnInside: false,
          fixedContentPos: true,
          mainClass: 'mfp-no-margins mfp-fade', // class to remove default margin from left and right side
          image: {
            verticalFit: true,
          },
        })
      }

      if ($lightboxGalleryEl.length > 0) {
        $lightboxGalleryEl.each(function () {
          const element = jq(this)

          if (element.find('a[data-lightbox="gallery-item"]').parent('.clone').hasClass('clone')) {
            element
              .find('a[data-lightbox="gallery-item"]')
              .parent('.clone')
              .find('a[data-lightbox="gallery-item"]')
              .attr('data-lightbox', '')
          }

          if (
            element.find('a[data-lightbox="gallery-item"]').parents('.cloned').hasClass('cloned')
          ) {
            element
              .find('a[data-lightbox="gallery-item"]')
              .parents('.cloned')
              .find('a[data-lightbox="gallery-item"]')
              .attr('data-lightbox', '')
          }

          element.magnificPopup({
            delegate: 'a[data-lightbox="gallery-item"]',
            type: 'image',
            closeOnContentClick: true,
            closeBtnInside: false,
            fixedContentPos: true,
            mainClass: 'mfp-no-margins mfp-fade', // class to remove default margin from left and right side
            image: {
              verticalFit: true,
            },
            gallery: {
              enabled: true,
              navigateByImgClick: true,
              preload: [0, 1], // Will preload 0 - before current, and 1 after the current image
            },
          })
        })
      }

      if ($lightboxIframeEl.length > 0) {
        $lightboxIframeEl.magnificPopup({
          disableOn: 600,
          type: 'iframe',
          removalDelay: 160,
          preloader: false,
          fixedContentPos: false,
        })
      }

      if ($lightboxInlineEl.length > 0) {
        $lightboxInlineEl.magnificPopup({
          type: 'inline',
          mainClass: 'mfp-no-margins mfp-fade',
          closeBtnInside: false,
          fixedContentPos: true,
          overflowY: 'scroll',
        })
      }

      /* if ($lightboxAjaxEl.length > 0) {
        $lightboxAjaxEl.magnificPopup({
          type: 'ajax',
          closeBtnInside: false,
          autoFocusLast: false,
          callbacks: {
            ajaxContentAdded(mfpResponse) {
              SEMICOLON.widget.loadFlexSlider()
              SEMICOLON.initialize.resizeVideos()
              SEMICOLON.widget.masonryThumbs()
            },
            open() {
              $body.addClass('ohidden')
            },
            close() {
              $body.removeClass('ohidden')
            },
          },
        })
      }

      if ($lightboxAjaxGalleryEl.length > 0) {
        $lightboxAjaxGalleryEl.magnificPopup({
          delegate: 'a[data-lightbox="ajax-gallery-item"]',
          type: 'ajax',
          closeBtnInside: false,
          autoFocusLast: false,
          gallery: {
            enabled: true,
            preload: 0,
            navigateByImgClick: false,
          },
          callbacks: {
            ajaxContentAdded(mfpResponse) {
              SEMICOLON.widget.loadFlexSlider()
              SEMICOLON.initialize.resizeVideos()
              SEMICOLON.widget.masonryThumbs()
            },
            open() {
              $body.addClass('ohidden')
            },
            close() {
              $body.removeClass('ohidden')
            },
          },
        })
      } */

      $('[data-lightbox]').on('mfpOpen', () => {
        const lightboxItem = jq.magnificPopup.instance.currItem.el
        const lightboxClass = jq(lightboxItem).attr('data-lightbox-class')!
        const lightboxBgClass = jq(lightboxItem).attr('data-lightbox-bg-class')!

        if (lightboxClass !== '') {
          jq(jq.magnificPopup.instance.container).addClass(lightboxClass)
        }

        if (lightboxBgClass !== '') {
          jq(jq.magnificPopup.instance.bgOverlay).addClass(lightboxBgClass)
        }
      })
    }
  }
}
