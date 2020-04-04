import { ViewTemplates } from '@lit-any/views'
import { hydra, schema } from '@tpluscode/rdf-ns-builders'
import { html } from 'lit-html'
import { repeat } from 'lit-html/directives/repeat'
import { HydraResource, IOperation } from 'alcaeus/types/Resources'
import {
  operationSelector,
  operationTrigger,
  operationList,
  portfolioOperationList,
  operationIcon,
} from '../scopes'
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

ViewTemplates.default.when
  .scopeMatches(operationSelector)
  .valueMatches((resource: HydraResource) => !!resource && resource.findOperationsDeep().length > 0)
  .renders(
    (resource: HydraResource, next) => html`
      <bs-dropdown>
        <bs-button dropdown-toggle label="Operations" color="aqua" primary>Operations</bs-button>
        <bs-dropdown-menu down x-placement="bottom-start">
          ${next(resource, operationList)}
        </bs-dropdown-menu>
      </bs-dropdown>
    `,
  )

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
  .scopeMatches(portfolioOperationList)
  .renders((resource: HydraResource, next) => {
    const operations = findOperations(resource)

    return html`
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
