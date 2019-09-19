import { customElement } from 'lit-element'
import AlcaeusLoader from '@hydrofoil/alcaeus-loader'
import { CanvasShell } from './canvas-shell'
import { WikibusStateMapper } from '../lib/WikibusStateMapper'

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

    return Promise.resolve({
      ...this.model,
      resource,
    })
  }
}
