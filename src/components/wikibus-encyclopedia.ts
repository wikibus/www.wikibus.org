import { LitElement, html, query, property } from 'lit-element'
import './wikibus-shell.ts'
import { WikibusShell } from './wikibus-shell'
import '../views/index.ts'
import '../lib/ns.ts'
import '../lib/types/index.ts'
import { app, State } from '../lib/state'
import './canvas-shell/canvas-emphasis-title.ts'

export default class WikibusEncyclopedia extends LitElement {
  @query('#shell')
  private __shell: WikibusShell | null = null

  public async connectedCallback() {
    if (super.connectedCallback) {
      super.connectedCallback()
    }

    const { states } = await app

    states.map(console.log)
    states.map(
      this.withShell((shell, state) => {
        if (state.core.resourceUrlOverride) {
          // eslint-disable-next-line no-param-reassign
          shell.url = state.core.resourceUrlOverride
          shell.reflectUrlInState(state.core.resourceUrlOverride)
        }
      }),
    )

    states.map(
      this.withShell((shell, state) => {
        // eslint-disable-next-line no-param-reassign
        shell.appState = state
        // eslint-disable-next-line no-param-reassign
        shell.isLoading = state.core.isLoading
      }),
    )
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
      return this.__shell.appState.core.debug
    }

    return false
  }

  // eslint-disable-next-line class-methods-use-this
  private set debug(value: boolean) {
    app.then(({ actions }) => actions.core.setDebug(value))
  }

  private withShell(fun: (shell: WikibusShell, state: State) => void) {
    return (state: State) => {
      if (this.__shell) {
        fun(this.__shell, state)
      }
    }
  }
}

customElements.define('wikibus-encyclopedia', WikibusEncyclopedia)
