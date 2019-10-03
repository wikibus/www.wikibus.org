import { LitElement, html, query } from 'lit-element'
import './wikibus-shell.ts'
import { WikibusShell } from './wikibus-shell'
import '../views/index.ts'
import '../lib/ns.ts'
import '../lib/types/index.ts'
import { states } from '../lib/state'

export default class WikibusEncyclopedia extends LitElement {
  @query('#shell')
  private __shell: WikibusShell | null = null

  protected async firstUpdated() {
    // eslint-disable-next-line array-callback-return
    ;(await states).map(value => {
      console.log(value)
      if (this.__shell) {
        this.__shell.appState = { ...value }
      }
    })
  }

  protected createRenderRoot() {
    return this
  }

  protected render() {
    return html`
      <wikibus-shell id="shell">
        Your content will arrive shortly.
      </wikibus-shell>
    `
  }
}

customElements.define('wikibus-encyclopedia', WikibusEncyclopedia)
