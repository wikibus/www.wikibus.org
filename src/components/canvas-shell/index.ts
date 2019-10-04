import { HydrofoilShell } from '@hydrofoil/hydrofoil-shell/hydrofoil-shell'
import { ResourceScope, ReflectedInHistory } from 'ld-navigation'
import { html, property } from 'lit-element'
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
  @property({ type: Object })
  public appState?: State

  protected render() {
    return html`
      <canvas-header .model="${this.appState ? this.appState.core : {}}"></canvas-header>

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
}

customElements.define('canvas-shell', CanvasShell)
