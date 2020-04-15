import { customElement, html, LitElement, property, css } from 'lit-element'
import 'ld-navigation/ld-link'
import CanvasShellBase from './CanvasShellBase'
import { Box } from '../icons'

@customElement('canvas-featured-box')
export class CanvasFeaturedBox extends CanvasShellBase(LitElement) {
  @property({ type: Boolean })
  public center = false

  @property({ type: Boolean })
  public outline = false

  @property({ type: Boolean })
  public effect = false

  @property({ type: Boolean })
  public light = false

  @property({ type: Boolean })
  public dark = false

  @property({ type: String })
  public title = ''

  @property({ type: String })
  public description = ''

  @property({ type: String })
  public resourceUrl?: string

  @property({ type: String })
  public href = ''

  public static get styles() {
    return [
      super.styles || [],
      css`
        :host {
          display: block;
        }

        slot[name='description'] p,
        slot[name='description']::slotted(p) {
          line-height: 1.4 !important;
        }

        #icon::slotted(img) {
          height: 64px !important;
          clip-path: circle(50%);
          -webkit-clip-path: circle(50%);
        }

        #icon::slotted(svg:not([fill='none'])) {
          fill: white;
        }

        .feature-box:not(.fbox-center) {
          display: block;
          height: 64px;
          margin-top: 4px;
          margin-bottom: 4px;
        }

        .feature-box:not(.fbox-center) slot#icon::slotted(*) {
          position: relative;
          top: -5px;
          height: 45px;
        }
      `,
    ]
  }

  public render() {
    let link = html`
      <i><slot id="icon">${Box(50)}</slot></i>
    `

    if (this.href || this.resourceUrl) {
      link = html`
        <a href="${this.href}" target="_blank">${link}</a>
      `
    }

    if (this.resourceUrl) {
      link = html`
        <ld-link resource-url="${this.resourceUrl}">
          ${link}
        </ld-link>
      `
    }

    return html`
      <div
        class="feature-box ${this.center ? 'fbox-center' : ''} ${this.outline
          ? 'fbox-outline'
          : ''} ${this.effect ? 'fbox-effect' : ''} ${this.light ? 'fbox-light' : ''} ${this.dark
          ? 'fbox-dark'
          : ''}"
      >
        <div class="fbox-icon">
          ${link}
        </div>
        <h3>${this.title}</h3>
        <slot name="description"><p>${this.description}</p></slot>
      </div>
    `
  }
}
