import { ViewTemplates } from '@lit-any/views'
import { hydra, schema } from '@tpluscode/rdf-ns-builders'
import { html } from 'lit-html'
import { repeat } from 'lit-html/directives/repeat'
import { HydraResource, IOperation } from 'alcaeus/types/Resources'
import { operationSelector, operationTrigger, operationList, operationIcon } from '../scopes'
import { app } from '../../lib/state'
import './form'
import './icons'

interface OperationTriggerModel {
  resource?: HydraResource
  operation: IOperation
}

function openOperationForm(op: OperationTriggerModel) {
  return async () => {
    const { actions } = await app

    actions.showOperationForm(op.operation)
  }
}

function findOperations(resource: HydraResource) {
  return resource
    .findOperationsDeep({
      excludedProperties: [hydra.member.value, schema.image.value],
    })
    .filter(op => !op.target.isAnonymous)
}

ViewTemplates.default.when.scopeMatches(operationList).renders((resource: HydraResource, next) => {
  const operations = findOperations(resource)

  if (operations.length === 0) {
    return html`
      <bs-dropdown-item-text>Nothing to do</bs-dropdown-item-text>
    `
  }

  return html`
    ${repeat(operations, operation => next({ resource, operation }, operationTrigger))}
  `
})

ViewTemplates.default.when
  .scopeMatches(operationSelector)
  .renders((resource: HydraResource, next) => {
    const operations = findOperations(resource)
    if (!operations.length) {
      return ''
    }

    return html`
      <div class="widget clearfix">
        ${repeat(
          operations,
          operation => html`
            <canvas-featured-box
              light
              effect
              style="cursor: pointer"
              title="${operation.title}"
              @click="${openOperationForm({ operation, resource })}"
            >
              ${next(operation, operationIcon)}
              <p slot="description">${operation.description}</p>
            </canvas-featured-box>
          `,
        )}
      </div>
    `
  })

ViewTemplates.default.when.scopeMatches(operationTrigger).renders(
  (v: OperationTriggerModel) =>
    html`
      <bs-dropdown-item-button
        title="${v.operation.title}"
        @bs-dropdown-item-click="${openOperationForm(v)}"
      ></bs-dropdown-item-button>
    `,
)
