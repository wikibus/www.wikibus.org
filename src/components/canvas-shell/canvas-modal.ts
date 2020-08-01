import { css, customElement, html, LitElement, property, query } from 'lit-element'
import CanvasShellBase from './CanvasShellBase'

interface BsModal {
  open(): void
  close(): void
  opened: boolean
}

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
  private __modal?: BsModal

  @property({ type: Boolean })
  private __modalLoaded = false

  public connectedCallback() {
    super.connectedCallback()

    import('@lit-element-bootstrap/modal').then(() => {
      this.__modalLoaded = true
    })
  }

  protected updated(_changedProperties: Map<PropertyKey, unknown>): void {
    if (_changedProperties.has('opened')) {
      if (this.opened && this.__modal) {
        this.__modal.open()
      } else if (this.__modal && this.__modal.opened) {
        this.__modal.close()
      }
    }
  }

  private __onClosed() {
    this.opened = false
    this.dispatchEvent(new CustomEvent('closed'))
  }

  public render() {
    if (this.__modalLoaded) {
      return this.__renderBsModal()
    }

    return html``
  }

  private __renderBsModal() {
    return html`
      <bs-modal backdrop @bs.modal.close="${this.__onClosed}">
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
