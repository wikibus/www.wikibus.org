import { ViewTemplates } from '@lit-any/views'
import { html } from 'lit-html'
import { repeat } from 'lit-html/directives/repeat'
import { HydraResource, IOperation } from 'alcaeus/types/Resources'
import { operationSelector, operationTrigger } from '../scopes'
import { app } from '../../lib/state'
import './form'

interface OperationTriggerModel {
  resource?: HydraResource
  operation: IOperation
}

function openOperationForm(op: OperationTriggerModel) {
  return async () => {
    const { actions } = await app

    actions.core.showOperationForm(op.operation)
  }
}

ViewTemplates.default.when
  .scopeMatches(operationSelector)
  .valueMatches((resource: HydraResource) => !!resource && resource.findOperationsDeep().length > 0)
  .renders(
    (resource: HydraResource, next) => html`
      <bs-dropdown>
        <bs-button dropdown-toggle label="Operations" color="aqua" primary>Operations</bs-button>
        <bs-dropdown-menu down x-placement="bottom-start">
          ${repeat(resource.findOperationsDeep(), operation =>
            next({ resource, operation }, operationTrigger),
          )}
        </bs-dropdown-menu>
      </bs-dropdown>
    `,
  )

ViewTemplates.default.when.scopeMatches(operationTrigger).renders(
  (v: OperationTriggerModel) =>
    html`
      <bs-dropdown-item-button
        title="${v.operation.title}"
        @bs-dropdown-item-click="${openOperationForm(v)}"
      ></bs-dropdown-item-button>
    `,
)
