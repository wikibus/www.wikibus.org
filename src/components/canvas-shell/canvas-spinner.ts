import { css, customElement, html, LitElement, property } from 'lit-element'
import { Loader } from '../icons'

@customElement('canvas-spinner')
export class CanvasSpinner extends LitElement {
  public static get styles() {
    return css`
      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(359deg);
        }
      }

      svg {
        position: relative;
        top: 2px;
      }
    `
  }

  @property({ type: Number })
  public size = 10

  @property({ type: Number })
  public speed = 2

  protected render() {
    return html`
      <style>
        svg {
          animation: ${`spin ${this.speed}s linear infinite`};
        }
      </style>
      ${Loader(this.size)}
    `
  }
}
