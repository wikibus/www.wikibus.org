import { css, CSSResultArray, customElement, html, LitElement, property } from 'lit-element'
import CanvasShellBase from './CanvasShellBase'

@customElement('canvas-emphasis-title')
export class CanvasEmphasisTitle extends CanvasShellBase(LitElement) {
  @property({ type: String, attribute: 'background-image' })
  public backgroundImage?: string

  @property({ type: String })
  public heading?: string

  @property({ type: String })
  public lead?: string

  public static get styles() {
    return [
      super.styles as CSSResultArray,
      css`
        .section {
          padding: 80px 0px;
          background-position: 0px 12.7349px;
        }
      `,
    ]
  }

  public render() {
    return html`
      <style>
        .section {
          background-image: url('${this.backgroundImage}');
        }
      </style>

      <div
        class="section parallax dark notopmargin noborder skrollable skrollable-between"
        data-bottom-top="background-position:0px 300px;"
        data-top-bottom="background-position:0px -300px;"
      >
        <div class="container center clearfix">
          <div class="emphasis-title">
            <h2>${this.heading}</h2>
            <p class="lead topmargin-sm">${this.lead}.</p>
          </div>
        </div>
      </div>
    `
  }
}
