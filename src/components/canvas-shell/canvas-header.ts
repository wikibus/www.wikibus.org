import { customElement, html, LitElement, property } from 'lit-element'
import { repeat } from 'lit-html/directives/repeat'
// @ts-ignore
import { Menu, Search } from '../icons'
import CanvasShellBase from './CanvasShellBase'
import './canvas-view'

const iconSize = 17

@customElement('canvas-header')
export class CanvasHeader extends CanvasShellBase(LitElement) {
  @property({ type: Boolean })
  public topSearchOpen = false

  @property({ type: Boolean })
  public primaryMenuOpen = false

  @property({ type: String })
  public home: string = ''

  @property({ type: String })
  public current: string = ''

  @property({ type: Object })
  public menu: Record<string, any> = {}

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

    SEMICOLON.header.init()
    SEMICOLON.widget.extras()
  }

  private __renderMenuItem([label, url]: [string, string]) {
    return html`
      <li class="${label === this.current ? 'current' : ''}">
        <ld-link resource-url="${url}">${label}</ld-link>
      </li>
    `
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
              <ld-link resource-url="${this.home}">
                <a href="/" class="standard-logo" data-dark-logo="/images/logo-dark.png"
                  ><img src="/images/logo.png" alt="Canvas Logo"
                /></a>
              </ld-link>
              <ld-link resource-url="${this.home}">
                <a href="/" class="retina-logo" data-dark-logo="/images/logo-dark@2x.png"
                  ><img src="/images/logo@2x.png" alt="Canvas Logo"
                /></a>
              </ld-link>
            </div>

            <nav id="primary-menu">
              <ul>
                ${repeat(Object.entries(this.menu), this.__renderMenuItem.bind(this))}
              </ul>

              <div id="top-search">
                <a href="javascript:void(0)" id="top-search-trigger"> ${Search(iconSize)}</a>
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
