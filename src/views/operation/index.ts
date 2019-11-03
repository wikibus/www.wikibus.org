import { ViewTemplates } from '@lit-any/views'
import { html } from 'lit-html'
import { HydraResource, IOperation } from 'alcaeus/types/Resources'
import { operationTrigger } from '../scopes'
import { app } from '../../lib/state'
import './form'

interface OperationTriggerModel {
  resource?: HydraResource
  operation: IOperation
}

function openOperationForm(op: OperationTriggerModel) {
  return async () => {
    const { actions } = await app

    actions.core.showOperationForm(op.operation, op.resource)
  }
}

ViewTemplates.default.when
  .scopeMatches(operationTrigger)
  .valueMatches((v: OperationTriggerModel) => (v.operation.method || '').toUpperCase() !== 'GET')
  .renders(
    (v: OperationTriggerModel) =>
      html`
        <canvas-button
          three-d
          label="${v.operation.title}"
          @click="${openOperationForm(v)}"
        ></canvas-button>
      `,
  )
