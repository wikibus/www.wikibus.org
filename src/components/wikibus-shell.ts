import { IHydraResponse } from 'alcaeus/types/HydraResponse'
import { customElement } from 'lit-element'
import AlcaeusLoader from '@hydrofoil/alcaeus-loader'
import { expand } from '@zazuko/rdf-vocabularies'
import { StateMapper } from 'ld-navigation'
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

  public createStateMapper() {
    return app
      .then(({ states }) => {
        this.__apis = getKnownApis(states.val.core)
        this.__rooUri = states.val.core.homeEntrypoint.id
        return new WikibusStateMapper({
          useHashFragment: this.usesHashFragment,
          baseUrl: this.__rooUri,
          apis: this.__apis,
        })
      })
      .catch(e => {
        this.state = 'error'
        this.lastError = e
        return new StateMapper()
      })
  }

  protected async onResourceLoaded(resource: IHydraResponse) {
    const { actions } = await app
    if (resource.root) {
      actions.core.setResource(resource.root)
    }

    this.consoleState = {
      ...this.consoleState,
      lastResponse: {
        status: resource.xhr.status,
      },
    }
  }

  // eslint-disable-next-line class-methods-use-this
  public onResourceUrlChanged() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
