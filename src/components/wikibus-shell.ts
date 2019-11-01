import { customElement } from 'lit-element'
import AlcaeusLoader from '@hydrofoil/alcaeus-loader'
import { expand } from '@zazuko/rdf-vocabularies'
import { CanvasShell } from './canvas-shell'
import { WikibusStateMapper } from '../lib/WikibusStateMapper'
import { app } from '../lib/state'
import '../lib/ns'
import { State } from '../lib/state/core'

const knownApis = new Map<string, string>()
knownApis.set(expand('wba:library'), 'library')

function getKnownApis(state: State): Record<string, string> {
  return [...state.entrypoints.entries()].reduce(
    (apis, [sp, entrypoint]) => {
      const linkId = knownApis.get(sp.property.id)

      if (linkId) {
        return { ...apis, [linkId]: entrypoint }
      }

      return apis
    },
    {
      home: state.homeEntrypoint.id,
    },
  )
}

@customElement('wikibus-shell')
export class WikibusShell extends AlcaeusLoader(CanvasShell) {
  private __apis: Record<string, string> = {}

  private __rooUri = ''

  public async connectedCallback() {
    const { states } = await app
    this.__apis = getKnownApis(states.val.core)
    this.__rooUri = states.val.core.homeEntrypoint.id

    if (super.connectedCallback) {
      super.connectedCallback()
    }
  }

  public createStateMapper() {
    return new WikibusStateMapper({
      useHashFragment: this.usesHashFragment,
      baseUrl: this.__rooUri,
      apis: this.__apis,
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
