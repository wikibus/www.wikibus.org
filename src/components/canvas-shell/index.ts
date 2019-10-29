import { HydrofoilShell } from '@hydrofoil/hydrofoil-shell/hydrofoil-shell'
import { ResourceScope, ReflectedInHistory } from 'ld-navigation'
import { css, html, property } from 'lit-element'
import './canvas-gototop.ts'
import './canvas-footer.ts'
import './canvas-view.ts'
import './canvas-header.ts'
import CanvasShellBase from './CanvasShellBase'
import 'ld-navigation/ld-link'
import { State } from '../../lib/state'

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
      `,
    ]
  }

  @property({ type: Object })
  public appState?: State

  @property({ type: Boolean })
  private __errorDetailsVisible: boolean = false

  protected render() {
    return html`
      <canvas-header
        .menu="${this.appState ? this.appState.menu.items : {}}"
        .home="${this.appState ? this.appState.core.homeEntrypoint.id : ''}"
        .current="${this.appState ? this.appState.menu.current : {}}"
        .authReady="${this.appState && typeof this.appState.auth.isAuthenticated === 'boolean'}"
      >
        <canvas-view
          .value="${this.appState}"
          template-scope="profile-menu"
          slot="profile-menu"
          ignore-missing
        ></canvas-view>
      </canvas-header>

      <section id="content">
        ${super.render()}
      </section>

      <canvas-footer></canvas-footer>

      <canvas-gototop></canvas-gototop>
    `
  }

  protected renderMain() {
    return html`
      <canvas-view
        .value="${this.appState}"
        ignore-missing
        template-scope="hydrofoil-shell"
      ></canvas-view>
    `
  }

  protected renderError() {
    import('./canvas-button')

    return html`
      <section id="content">
        <div class="content-wrap">
          <div class="container clearfix">
            <div class="col_half nobottommargin">
              <div class="error404 center">500</div>
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
    if (this.isLoading === true) {
      SEMICOLON.initialize.pageTransition()
    } else {
      const self = this
      this.$('.page-transition-wrap').fadeOut('400', function() {
        self.$(this).remove()
      })
    }
  }

  private __toggleErrorDetails() {
    this.__errorDetailsVisible = !this.__errorDetailsVisible
  }
}

customElements.define('canvas-shell', CanvasShell)
