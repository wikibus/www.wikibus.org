import { css, customElement, html, LitElement, property, query } from 'lit-element'
import CanvasShellBase from './CanvasShellBase'
import '@lit-element-bootstrap/modal'

@customElement('canvas-modal')
export class CanvasModal extends CanvasShellBase(LitElement) {
  public static get styles() {
    return [
      super.styles || [],
      css`
        h4 {
          margin: 0;
        }
      `,
    ]
  }

  @property({ type: String })
  public heading = 'Modal heading'

  @property({ type: Boolean })
  public opened = false

  @query('bs-modal')
  private __modal?: any

  protected updated(_changedProperties: Map<PropertyKey, unknown>): void {
    if (_changedProperties.has('opened')) {
      if (this.opened) {
        this.__modal.open()
      } else if (this.__modal.opened) {
        this.__modal.close()
      }
    }
  }

  protected firstUpdated() {
    this.__modal!.addEventListener('bs.modal.close', () => {
      this.opened = false
      this.dispatchEvent(new CustomEvent('closed'))
    })
  }

  public render() {
    return html`
      <bs-modal backdrop>
        <bs-modal-header slot="header">
          <h4>${this.heading}</h4>
        </bs-modal-header>
        <bs-modal-body slot="body">
          <slot></slot>
        </bs-modal-body>
      </bs-modal>
    `
  }
}
