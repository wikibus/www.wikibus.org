import { customElement } from 'lit-element'
import AlcaeusLoader from '@hydrofoil/alcaeus-loader'
import { CanvasShell } from './canvas-shell'
import { WikibusStateMapper } from '../lib/WikibusStateMapper'
import { app } from '../lib/state'

@customElement('wikibus-shell')
export class WikibusShell extends AlcaeusLoader(CanvasShell) {
  public createStateMapper() {
    return new WikibusStateMapper({
      useHashFragment: this.usesHashFragment,
      baseUrl: process.env.API_FALLBACK,
      apis: {
        library: process.env.API_LIBRARY,
        'data-sheets': process.env.API_DATA_SHEETS,
      },
    })
  }

  protected async loadResourceInternal(url: string) {
    const resource = await super.loadResourceInternal(url)
    const { actions } = await app
    actions.core.setResource(resource)

    return resource
  }

  // eslint-disable-next-line class-methods-use-this
  public onResourceUrlChanged() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
