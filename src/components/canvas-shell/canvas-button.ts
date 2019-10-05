import { customElement, html, LitElement, property } from 'lit-element'
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
export class CanvasButton extends CanvasShellBase(LitElement) {
  @property({ type: String })
  public color: Color = 'white'

  @property({ type: String })
  public label?: string

  @property({ type: Boolean, attribute: 'three-d' })
  public threeDimensional: boolean = false

  @property({ type: Boolean })
  public rounded: boolean = false

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
      <a
        href="javascript:void(0)"
        class="button ${this.threeDimensional ? 'button-3d' : ''} ${this.rounded
          ? 'button-rounded'
          : ''} button-${this.color} ${this.__buttonLight}"
        >${this.icon()} ${this.label}</a
      >
    `
  }
}
