import { HydrofoilShell } from '@hydrofoil/hydrofoil-shell/hydrofoil-shell'
import { ResourceScope, ReflectedInHistory } from 'ld-navigation'
import { css, html, property } from 'lit-element'
import { ResourceIdentifier } from '@tpluscode/rdfine'
import './canvas-gototop.ts'
import './canvas-footer.ts'
import './canvas-view.ts'
import './canvas-header.ts'
import CanvasShellBase from './CanvasShellBase'
import 'ld-navigation/ld-link'
import { Message } from './canvas-message'

interface ConsoleState {
  menu: {
    items: Record<string, ResourceIdentifier>
    current: string
  }
  isAuthenticated?: boolean
  homeEntrypoint: ResourceIdentifier | null
  lastResponse: {
    status: number
  }
}

export class CanvasShell extends CanvasShellBase(
  ReflectedInHistory(ResourceScope(HydrofoilShell)),
) {
  public static get styles() {
    return [
      super.styles,
      css`
        .error404 {
          line-height: 1;
        }

        paper-progress {
          width: 100%;
        }
      `,
    ]
  }

  @property({ type: Object })
  public consoleState: ConsoleState = {
    homeEntrypoint: null,
    lastResponse: {
      status: 0,
    },
    menu: {
      current: '',
      items: {},
    },
  }

  @property({ type: Boolean })
  public showProgressBar = false

  @property()
  public message: Message = { visible: false, kind: '', text: '' }

  @property({ type: Boolean })
  private __errorDetailsVisible = false

  public connectedCallback() {
    super.connectedCallback()
    import('@polymer/paper-progress/paper-progress')
    import('./canvas-button')
    import('./canvas-message')
  }

  protected render() {
    return html`
      <canvas-header
        .menu="${this.consoleState.menu.items}"
        .home="${this.consoleState.homeEntrypoint}"
        .current="${this.consoleState.menu.current}"
        .authReady="${typeof this.consoleState.isAuthenticated !== 'undefined'}"
      >
        <canvas-view
          .value="${this.model}"
          template-scope="profile-menu"
          slot="profile-menu"
          ignore-missing
        ></canvas-view>
      </canvas-header>

      <paper-progress indeterminate ?hidden="${!this.showProgressBar}"></paper-progress>
      <canvas-message
        ?hidden="${!this.message.visible}"
        kind="${this.message.kind}"
        text="${this.message.text}"
      ></canvas-message>
      <slot name="messages"></slot>

      <section id="content">
        ${this.isLoading
          ? html`
              <slot></slot>
            `
          : super.render()}
      </section>

      <canvas-footer></canvas-footer>

      <canvas-gototop></canvas-gototop>
    `
  }

  protected renderMain() {
    return html`
      <canvas-view
        .value="${this.model}"
        ignore-missing
        template-scope="hydrofoil-shell"
      ></canvas-view>
    `
  }

  protected renderError() {
    return html`
      <section id="content">
        <div class="content-wrap">
          <div class="container clearfix">
            <div class="col_half nobottommargin">
              <div class="error404 center">${this.consoleState.lastResponse.status}</div>
            </div>
            <div class="col_half nobottommargin col_last">
              <div class="heading-block nobottomborder">
                <h4>Ooopps.! The Page you were looking for, couldn't be displayed.</h4>
                <span
                  >Try again later or contact us through the social links at the bottom of this
                  page.</span
                >
              </div>

              <div class="topmargin nobottommargin">
                <canvas-button
                  color="white"
                  @click="${this.__toggleErrorDetails}"
                  label="Show details"
                  three-d
                  rounded
                ></canvas-button>
                ${this.__errorDetailsVisible ? super.renderError() : ''}
              </div>
            </div>
          </div>
        </div>
      </section>
    `
  }

  protected updated(_changedProperties: Map<PropertyKey, unknown>): void {
    if (_changedProperties.has('consoleState')) {
      if (this.consoleState.lastResponse.status >= 400) {
        this.state = 'error'
      }
    }

    if (_changedProperties.has('lastError')) {
      this.consoleState = {
        ...this.consoleState,
        lastResponse: {
          status: 500,
        },
      }
    }
  }

  private __toggleErrorDetails() {
    this.__errorDetailsVisible = !this.__errorDetailsVisible
  }
}

customElements.define('canvas-shell', CanvasShell)
