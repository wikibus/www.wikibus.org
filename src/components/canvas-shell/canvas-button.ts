import { customElement, html, LitElement, property } from 'lit-element'
import { BsButtonMixin } from '@lit-element-bootstrap/button/bs-button-mixin.js'
import CanvasShellBase from './CanvasShellBase'

type Color =
  | 'white'
  | 'black'
  | 'red'
  | 'teal'
  | 'yellow'
  | 'green'
  | 'brown'
  | 'aqua'
  | 'purple'
  | 'leaf'
  | 'pink'
  | 'blue'
  | 'amber'
  | 'dirtygreen'

@customElement('canvas-button')
export class CanvasButton extends BsButtonMixin(CanvasShellBase(LitElement)) {
  @property({ type: String })
  public color: Color = 'white'

  @property({ type: String })
  public label?: string

  @property({ type: Boolean, attribute: 'three-d' })
  public threeDimensional = false

  @property({ type: Boolean })
  public rounded = false

  @property({ type: Boolean, reflect: true, attribute: 'dropdown-toggle' })
  public dropdownToggle = false

  @property({ type: Object })
  public icon: () => string = () => ''

  private get __buttonLight() {
    switch (this.color) {
      case 'white':
      case 'yellow':
        return 'button-light'
      default:
        return ''
    }
  }

  protected render() {
    return html`
      <button
        class="button ${this.threeDimensional ? 'button-3d' : ''} ${this.rounded
          ? 'button-rounded'
          : ''} button-${this.color} ${this.__buttonLight}
        ${this.dropdownToggle ? 'dropdown-toggle' : ''}"
      >
        ${this.icon()} ${this.label}
      </button>
    `
  }
}
