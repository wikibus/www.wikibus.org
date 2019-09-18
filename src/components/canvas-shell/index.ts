import { HydrofoilShell } from '@hydrofoil/hydrofoil-shell/hydrofoil-shell'
import { ResourceScope, ReflectedInHistory } from 'ld-navigation'
import { html } from 'lit-element'
import './canvas-gototop.ts'
import './canvas-footer.ts'
import './canvas-header.ts'
import { ViewTemplates } from '@lit-any/views'
import CanvasShellBase from './CanvasShellBase'
import { WikibusStateMapper } from '../../lib/WikibusStateMapper'
import 'ld-navigation/ld-link'

ViewTemplates.default.when
  .valueMatches(() => true)
  .renders(
    v =>
      html`
        ${v}<br /><ld-link resource-url="https://sources.wikibus.org/brochure/test">Test</ld-link>
      `,
  )

export class CanvasShell extends CanvasShellBase(
  ReflectedInHistory(ResourceScope(HydrofoilShell)),
) {
  public createStateMapper() {
    return new WikibusStateMapper({
      useHashFragment: this.usesHashFragment,
      baseUrl: 'http://www.wikibus.org/',
      apis: {
        library: process.env.API_LIBRARY,
        'data-sheets': process.env.API_DATA_SHEETS,
      },
    })
  }

  // eslint-disable-next-line class-methods-use-this
  protected loadResourceInternal(url: string) {
    return Promise.resolve(url)
  }

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
