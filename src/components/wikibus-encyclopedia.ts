import { LitElement, html, query } from 'lit-element'
import './wikibus-shell.ts'
import { WikibusShell } from './wikibus-shell'
import '../views/index.ts'
import '../lib/ns.ts'
import '../lib/types/index.ts'
import { app } from '../lib/state'
import './canvas-shell/canvas-emphasis-title.ts'

export default class WikibusEncyclopedia extends LitElement {
  @query('#shell')
  private __shell!: WikibusShell

  public async connectedCallback() {
    if (super.connectedCallback) {
      super.connectedCallback()
    }

    const { states } = await app

    states.map(state => {
      if (state.core.resourceUrlOverride) {
        this.__shell.url = state.core.resourceUrlOverride
        this.__shell.reflectUrlInState(state.core.resourceUrlOverride)
      }
    })

    states.map(state => {
      this.__shell.model = state
      this.__shell.isLoading = state.core.isLoading

      this.__shell.consoleState = {
        ...this.__shell.consoleState,
        menu: state.menu,
        isAuthenticated: state.auth.isAuthenticated,
        homeEntrypoint: state.core.homeEntrypoint.id,
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

  // eslint-disable-next-line class-methods-use-this
  private debug() {
    app.then(({ actions }) => actions.toggleDebug())
  }
}

customElements.define('wikibus-encyclopedia', WikibusEncyclopedia)
