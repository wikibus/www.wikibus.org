import { ViewTemplates } from '@lit-any/views'
import { html } from 'lit-html'
import { until } from 'lit-html/directives/until'
import { Operation } from 'alcaeus'
import { ifDefined } from 'lit-html/directives/if-defined'
import { operationForm } from '../scopes'
import { State, app } from '../../lib/state'
import { OperationFormState } from '../../lib/state/core'

const formElement = '__operation-form-element'

async function updateState() {
  const { actions } = await app
  actions.hideOperationForm()
}

function invokeOperation(operation: Operation) {
  return async (e: CustomEvent) => {
    const { actions } = await app
    return actions.invokeOperation(operation, e.detail.value)
  }
}

function renderError(error: string) {
  return html`
    <bs-alert danger>
      <div slot="message">${error}</div>
    </bs-alert>
  `
}

ViewTemplates.default.when
  .scopeMatches(operationForm)
  .renders((op: OperationFormState, next, scope, { state }: { state: State }) => {
    const formLoaded = import('../../components/canvas-shell/canvas-operation-form').then(() =>
      next(op, formElement),
    )
    import('../../components/canvas-shell/canvas-modal')
    import('../../components/canvas-shell/canvas-spinner')

    return html`
      <canvas-modal
        heading="${ifDefined(op.operation && op.operation.title)}"
        ?opened="${state.core.operationForm.opened}"
        @closed="${updateState}"
      >
        ${op.error ? renderError(op.error) : html``} ${until(formLoaded, html``)}
        ${op.invoking
          ? html`
              <canvas-spinner size="30"></canvas-spinner> Please wait
            `
          : html``}
      </canvas-modal>
    `
  })

ViewTemplates.default.when.scopeMatches(formElement).renders((op: OperationFormState) => {
  if (!op.operation) return html``

  return html`
    <canvas-operation-form
      no-legend
      no-shadow
      ?no-submit-button="${op.invoking}"
      ?no-reset-button="${op.invoking}"
      ?no-clear-button="${op.invoking}"
      .operation="${op.operation}"
      @submit="${invokeOperation(op.operation)}"
      .value="${ifDefined(op.value)}"
    ></canvas-operation-form>
  `
})
