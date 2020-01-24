import { LitElement, html, query } from 'lit-element'
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
        shell.model = state
        // eslint-disable-next-line no-param-reassign
        shell.isLoading = state.core.isLoading

        // eslint-disable-next-line no-param-reassign
        shell.consoleState = {
          ...shell.consoleState,
          menu: state.menu,
          isAuthenticated: state.auth.isAuthenticated,
          homeEntrypoint: state.core.homeEntrypoint.id,
        }
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

  // eslint-disable-next-line class-methods-use-this
  private debug() {
    app.then(({ actions }) => actions.core.toggleDebug())
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
