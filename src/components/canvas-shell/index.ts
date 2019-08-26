import { HydrofoilShell } from '@hydrofoil/hydrofoil-shell/hydrofoil-shell'
import { html } from 'lit-element'
import './canvas-gototop.ts'
import './canvas-footer.ts'
import './canvas-header.ts'
import CanvasShellBase from './CanvasShellBase'

export class CanvasShell extends CanvasShellBase(HydrofoilShell) {
  protected render() {
    return html`
      <canvas-header></canvas-header>

      <section id="content">
        ${super.render()}
      </section>

      <canvas-footer></canvas-footer>

      <canvas-gototop></canvas-gototop>
    `
  }
}

customElements.define('canvas-shell', CanvasShell)
