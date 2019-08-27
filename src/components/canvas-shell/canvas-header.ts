import { customElement, html, LitElement, property } from 'lit-element'
// @ts-ignore
import { Menu, Search } from '../icons'
import CanvasShellBase from './CanvasShellBase'

const iconSize = 17

@customElement('canvas-header')
export class CanvasFooter extends CanvasShellBase(LitElement) {
  @property({ type: Boolean })
  public topSearchOpen = false

  @property({ type: Boolean })
  public primaryMenuOpen = false

  public connectedCallback() {
    if (super.connectedCallback) {
      super.connectedCallback()
    }

    const bodyObserverConfig = { attributes: true, childList: false, subtree: false }
    const observer = new MutationObserver(list => {
      const classMutations = list.filter(
        m => m.type === 'attributes' && m.attributeName === 'class',
      )

      classMutations.forEach(mutation => {
        const body = mutation.target as Element
        this.topSearchOpen = body.classList.contains('top-search-open')
        this.primaryMenuOpen = body.classList.contains('primary-menu-open')
      })
    })

    observer.observe(document.body, bodyObserverConfig)
  }

  protected firstUpdated() {
    this.dispatchEvent(
      new CustomEvent('canvas-functions-init', {
        composed: true,
        detail: {
          header: this.renderRoot.querySelector('#header'),
          headerWrap: this.renderRoot.querySelector('#header-wrap'),
          topSearch: this.renderRoot.querySelector('#top-search'),
          topSearchTrigger: this.renderRoot.querySelector('#top-search-trigger'),
          primaryMenu: this.renderRoot.querySelector('#primary-menu'),
          primaryMenuTrigger: this.renderRoot.querySelector('#primary-menu-trigger'),
        },
      }),
    )
  }

  public render() {
    return html`
      <header
        id="header"
        ?search-open="${this.topSearchOpen}"
        ?primary-menu-open="${this.primaryMenuOpen}"
      >
        <div id="header-wrap">
          <div class="container clearfix">
            <div id="primary-menu-trigger">${Menu(iconSize)}</div>

            <div id="logo">
              <a href="index.html" class="standard-logo" data-dark-logo="images/logo-dark.png"
                ><img src="images/logo.png" alt="Canvas Logo"
              /></a>
              <a href="index.html" class="retina-logo" data-dark-logo="images/logo-dark@2x.png"
                ><img src="images/logo@2x.png" alt="Canvas Logo"
              /></a>
            </div>

            <nav id="primary-menu">
              <ul>
                <li>
                  <a href="index.html"><div>Home</div></a>
                </li>
                <li class="current">
                  <a href="#"><div>Features</div></a>
                </li>
                <li class="mega-menu">
                  <a href="#"><div>Pages</div></a>
                </li>
                <li class="mega-menu">
                  <a href="#"><div>Portfolio</div></a>
                </li>
                <li class="mega-menu">
                  <a href="#"><div>Blog</div></a>
                </li>
                <li>
                  <a href="shop.html"><div>Shop</div></a>
                </li>
                <li class="mega-menu">
                  <a href="#"><div>Shortcodes</div></a>
                </li>
              </ul>

              <div id="top-search">
                <a href="#" id="top-search-trigger"> ${Search(iconSize)}</a>
                <form action="search.html" method="get">
                  <input
                    type="text"
                    name="q"
                    class="form-control"
                    value=""
                    placeholder="Type &amp; Hit Enter.."
                  />
                </form>
              </div>
            </nav>
          </div>
        </div>
      </header>
    `
  }
}
