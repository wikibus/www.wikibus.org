import { customElement, html, LitElement, property } from 'lit-element'
import 'ld-navigation/ld-link'
import CanvasShellBase from './CanvasShellBase'
import { Box } from '../icons'

@customElement('canvas-featured-box')
export class CanvasFeaturedBox extends CanvasShellBase(LitElement) {
  @property({ type: String })
  public title: string = ''

  @property({ type: String })
  public description: string = ''

  @property({ type: String })
  public resourceUrl?: string

  public render() {
    return html`
      <div class="feature-box fbox-center fbox-outline fbox-effect fbox-light">
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
