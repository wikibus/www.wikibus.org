import { customElement, html, LitElement, property } from 'lit-element'
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

  public render() {
    return html`
      <div
        class="feature-box ${this.center ? 'fbox-center' : ''} ${this.outline
          ? 'fbox-outline'
          : ''} ${this.effect ? 'fbox-effect' : ''} ${this.light ? 'fbox-light' : ''} ${this.dark
          ? 'fbox-dark'
          : ''}"
      >
        <div class="fbox-icon">
          <ld-link resource-url="${this.resourceUrl}">
            <a href="javascript:void(0)"
              ><i><slot>${Box(50)}</slot></i></a
            >
          </ld-link>
        </div>
        <h3>${this.title}</h3>
        <p>${this.description}</p>
      </div>
    `
  }
}
