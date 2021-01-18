import { customElement, html, LitElement, property } from 'lit-element'
import { BsButtonMixin } from '@lit-element-bootstrap/button/bs-button-mixin.js'
import { classMap } from 'lit-html/directives/class-map'
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

  @property({ type: Boolean })
  public mini = false

  @property({ type: Boolean, reflect: true, attribute: 'dropdown-toggle' })
  public dropdownToggle = false

  @property({ type: Object })
  public icon: (size: number) => string = () => ''

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
    const classes = {
      [this.__buttonLight]: true,
      [`button-${this.color}`]: true,
      'button-3d': this.threeDimensional,
      'button-rounded': this.rounded,
      'dropdown-toggle': this.dropdownToggle,
      'button-mini': this.mini,
    }

    return html`
      <button class="button ${classMap(classes)}">
        ${this.icon(this.mini ? 16 : 24)} <slot>${this.label}</slot>
      </button>
    `
  }
}
