import { ViewTemplates } from '@lit-any/views'
import { html } from 'lit-html'
import { repeat } from 'lit-html/directives/repeat'
import { RdfResource, RuntimeOperation } from 'alcaeus'
import { operationSelector, operationTrigger, operationList, operationIcon } from '../scopes'
import { app } from '../../lib/state'
import './form'
import './icons'
import { wba } from '../../lib/ns'

interface OperationTriggerModel {
  resource?: RdfResource
  operation: RuntimeOperation
}

function openOperationForm(op: OperationTriggerModel) {
  return async () => {
    const { actions } = await app

    actions.showOperationForm(op.operation)
  }
}

function findOperations(resource: RdfResource) {
  return resource
    .findOperationsDeep({
      namespaces: [wba],
    })
    .filter(op => !op.target.isAnonymous)
}

ViewTemplates.default.when.scopeMatches(operationList).renders((resource: RdfResource, next) => {
  const operations = findOperations(resource)

  if (operations.length === 0) {
    return html` <bs-dropdown-item-text>Nothing to do</bs-dropdown-item-text> `
  }

  return html` ${repeat(operations, operation => next({ resource, operation }, operationTrigger))} `
})

ViewTemplates.default.when
  .scopeMatches(operationSelector)
  .renders((resource: RdfResource, next) => {
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

ViewTemplates.default.when
  .scopeMatches(operationTrigger)
  .renders(
    (v: OperationTriggerModel) =>
      html`
        <bs-dropdown-item-button
          title="${v.operation.title}"
          @bs-dropdown-item-click="${openOperationForm(v)}"
        ></bs-dropdown-item-button>
      `,
  )
