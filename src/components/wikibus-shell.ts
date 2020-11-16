import { customElement } from 'lit-element'
import AlcaeusLoader from '@hydrofoil/alcaeus-loader'
import { StateMapper } from 'ld-navigation'
import { ResourceIdentifier } from '@tpluscode/rdfine'
import { HydraResponse } from 'alcaeus'
import { Hydra } from 'alcaeus/web'
import { CanvasShell } from './canvas-shell'
import { WikibusStateMapper } from '../lib/WikibusStateMapper'
import { app } from '../lib/state'
import { wba } from '../lib/ns'
import { Core } from '../lib/state/core'

const knownApis = new Map<string, string>()
knownApis.set(wba.library.value, 'library')

function getKnownApis(state: Core): Record<string, ResourceIdentifier> {
  return [...state.entrypoints.entries()].reduce(
    (apis, [sp, entrypoint]) => {
      if (sp.property) {
        const linkId = knownApis.get(sp.property.id.value)
        if (linkId) {
          return { ...apis, [linkId]: entrypoint }
        }
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
  private __apis: Record<string, ResourceIdentifier> = {}

  private __rooUri: ResourceIdentifier | null = null

  public createStateMapper() {
    return app
      .then(({ states }) => {
        this.Hydra = Hydra
        this.__apis = getKnownApis(states.val.core)
        this.__rooUri = states.val.core.homeEntrypoint.id
        return new WikibusStateMapper({
          useHashFragment: this.usesHashFragment,
          baseUrl: this.__rooUri?.value,
          apis: this.__apis,
        })
      })
      .catch(e => {
        this.state = 'error'
        this.lastError = e
        return new StateMapper()
      })
  }

  protected async onResourceLoaded({ response, representation }: HydraResponse) {
    const { actions } = await app
    if (representation?.root) {
      actions.setResource(representation?.root)
    }

    this.consoleState = {
      ...this.consoleState,
      lastResponse: {
        status: response?.xhr.status || 0,
      },
    }
  }

  // eslint-disable-next-line class-methods-use-this
  public async onResourceUrlChanged() {
    const { actions } = await app
    actions.hideRefreshHint()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
