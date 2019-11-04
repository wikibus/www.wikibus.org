import { ViewTemplates } from '@lit-any/views'
import { html } from 'lit-html'
import { until } from 'lit-html/directives/until'
import { IOperation } from 'alcaeus/types/Resources'
import { ifDefined } from 'lit-html/directives/if-defined'
import { operationForm } from '../scopes'
import { State, app } from '../../lib/state'
import { OperationFormState } from '../../lib/state/core'

async function updateState() {
  const { actions } = await app
  actions.core.hideOperationForm()
}

function invokeOperation(operation: IOperation) {
  return async (e: CustomEvent) => {
    const { actions } = await app
    return actions.core.invokeOperation(operation, e.detail.value)
  }
}

function renderError(error: string) {
  import('@lit-element-bootstrap/alert')

  return html`
    <bs-alert danger>
      <div slot="message">${error}</div>
    </bs-alert>
  `
}

ViewTemplates.default.when
  .scopeMatches(operationForm)
  .renders((op: OperationFormState, next, scope, { state }: { state: State }) => {
    const formLoaded = import('../../components/canvas-shell/canvas-operation-form').then(() => {
      if (!op.operation) return html``

      return html`
        <canvas-operation-form
          no-labels
          no-legend
          ?no-submit-button="${op.invoking}"
          ?no-reset-button="${op.invoking}"
          ?no-clear-button="${op.invoking}"
          .operation="${op.operation}"
          @submit="${invokeOperation(op.operation)}"
        ></canvas-operation-form>
      `
    })
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
