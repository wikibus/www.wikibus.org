import { LitElement, html, property, css } from 'lit-element'
import CanvasShellBase from './CanvasShellBase'

export interface Message {
  kind: 'error' | 'warning' | 'info' | 'success' | ''
  text: string
  visible: boolean
}

export class CanvasMessage extends CanvasShellBase(LitElement) {
  public static get styles() {
    return [
      super.styles || [],
      css`
        .style-msg {
          margin-bottom: 0;
        }

        div.infomsg slot#main::slotted(a) {
          color: var(--heading-color) !important;
        }
      `,
    ]
  }

  @property({ type: Boolean })
  public hidden = false

  @property()
  public kind: Message['kind'] = ''

  @property()
  public text = ''

  @property({ type: Boolean })
  public dismissable = false

  render() {
    return html`
      <div ?hidden="${this.hidden}" class="style-msg ${this.kind}msg">
        <div class="sb-msg">
          <slot name="icon"></slot>
          <strong>${this.kind.replace(/^\w/, i => i.toUpperCase())}</strong>
          <slot id="main">${this.text}</slot>
        </div>
        <button
          ?hidden=${!this.dismissable}
          type="button"
          class="close"
          data-dismiss="alert"
          @click="${this.hide}"
        >
          ×
        </button>
      </div>
    `
  }

  public hide() {
    this.hidden = true
  }
}

customElements.define('canvas-message', CanvasMessage)
