import { LitElement, html, query } from 'lit-element'
import './wikibus-shell.ts'
import { WikibusShell } from './wikibus-shell'
import '../views/index.ts'
import '../lib/ns.ts'
import '../lib/types/index.ts'

export default class WikibusEncyclopedia extends LitElement {
  @query('#shell')
  private __shell: WikibusShell | null = null

  protected firstUpdated() {
    if (this.__shell) {
      this.__shell.model = {
        menu: {
          Library: process.env.API_LIBRARY,
        },
      }
    }
  }

  protected createRenderRoot() {
    return this
  }

  protected render() {
    return html`
      <wikibus-shell id="shell"> </wikibus-shell>
    `
  }
}

customElements.define('wikibus-encyclopedia', WikibusEncyclopedia)
