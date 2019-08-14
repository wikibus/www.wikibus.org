import { LitElement, html } from 'lit-element'

export default class WikibusEncyclopedia extends LitElement {
  protected render() {
    return html`
      Wikibus.org
    `
  }
}

customElements.define('wikibus-encyclopedia', WikibusEncyclopedia)
