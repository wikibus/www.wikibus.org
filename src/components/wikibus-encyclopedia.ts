import { LitElement, html } from 'lit-element'
import './canvas-shell/index.ts'

export default class WikibusEncyclopedia extends LitElement {
  protected createRenderRoot() {
    return this
  }

  protected render() {
    return html`
     <canvas-shell></canvas-shell>
    `
  }
}

customElements.define('wikibus-encyclopedia', WikibusEncyclopedia)
