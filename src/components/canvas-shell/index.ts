import { HydrofoilShell } from '@hydrofoil/hydrofoil-shell/hydrofoil-shell'
import { ResourceScope, ReflectedInHistory } from 'ld-navigation'
import { html } from 'lit-element'
import './canvas-gototop.ts'
import './canvas-footer.ts'
import './canvas-header.ts'
import CanvasShellBase from './CanvasShellBase'
import 'ld-navigation/ld-link'

export class CanvasShell extends CanvasShellBase(
  ReflectedInHistory(ResourceScope(HydrofoilShell)),
) {
  protected render() {
    return html`
      <canvas-header .model="${this.model}"></canvas-header>

      <section id="content">
        ${super.render()}
      </section>

      <canvas-footer></canvas-footer>

      <canvas-gototop></canvas-gototop>
    `
  }
}

customElements.define('canvas-shell', CanvasShell)
