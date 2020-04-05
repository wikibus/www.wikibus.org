import { LitElement, html, query, property } from 'lit-element'
import './wikibus-shell.ts'
import { WikibusShell } from './wikibus-shell'
import '../views/index.ts'
import '../lib/ns.ts'
import '../lib/types/index.ts'
import { Actions, app, State } from '../lib/state'
import './canvas-shell/canvas-emphasis-title.ts'

export default class WikibusEncyclopedia extends LitElement {
  @query('#shell')
  private __shell!: WikibusShell

  @property()
  public state!: State

  @property()
  public actions!: Actions

  public async connectedCallback() {
    if (super.connectedCallback) {
      super.connectedCallback()
    }

    const { states, actions } = await app
    this.actions = actions

    states.map(state => {
      this.state = state
      if (!this.__shell) {
        return
      }

      if (state.core.resourceUrlOverride) {
        this.__shell.url = state.core.resourceUrlOverride
        this.__shell.reflectUrlInState(state.core.resourceUrlOverride)
      }

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
    if (!this.state) {
      return html``
    }

    return html`
      <wikibus-shell
        id="shell"
        .model="${this.state}"
        .isLoading="${this.state.core.isLoading}"
        .showProgressBar="${this.state.core.operationForm.invoking}"
        .message="${this.state.core.message}"
      >
        <canvas-emphasis-title
          background-image="images/emphasis-header/yellow-trams.jpg"
          heading="Don't go away"
          lead="Your content will arrive shortly"
        ></canvas-emphasis-title>

        ${this.refreshMessage()}
      </wikibus-shell>
    `
  }

  private refreshMessage() {
    if (!this.state.core.showManualRefreshHint) {
      return ''
    }

    return html`
      <canvas-message
        slot="messages"
        kind="info"
        dismissable
        ?visible="${this.state.core.showManualRefreshHint}"
      >
        Hello, ${this.state.auth.userName}! You have been logged in.
        <a href="javascript:void(0)" @click="${this.actions.reload}"
          >Click here to refresh the page</a
        >
        if necessary
      </canvas-message>
    `
  }

  private async debug() {
    this.actions.toggleDebug()
  }
}

customElements.define('wikibus-encyclopedia', WikibusEncyclopedia)
