import { LitElement, html, query, property } from 'lit-element'
import './wikibus-shell.ts'
import { WikibusShell } from './wikibus-shell'
import '../views/index.ts'
import '../lib/ns.ts'
import '../lib/types/index.ts'
import { actions, states } from '../lib/state'
import './canvas-shell/canvas-emphasis-title.ts'

export default class WikibusEncyclopedia extends LitElement {
  @query('#shell')
  private __shell: WikibusShell | null = null

  protected async firstUpdated() {
    // eslint-disable-next-line array-callback-return
    ;(await states).map(value => {
      console.log(value)
      if (this.__shell) {
        this.__shell.appState = value
      }
    })
  }

  protected createRenderRoot() {
    return this
  }

  protected render() {
    return html`
      <wikibus-shell id="shell">
        <canvas-emphasis-title
          background-image="images/emphasis-header/yellow-trams.jpg"
          heading="Don't go away"
          lead="Your content will arrive shortly"
        ></canvas-emphasis-title>
      </wikibus-shell>
    `
  }

  @property({ type: Boolean })
  private get debug() {
    if (this.__shell && this.__shell.appState) {
      return this.__shell.appState.debug
    }

    return false
  }

  // eslint-disable-next-line class-methods-use-this
  private set debug(value: boolean) {
    actions.then(a => a.setDebug(value))
  }
}

customElements.define('wikibus-encyclopedia', WikibusEncyclopedia)
