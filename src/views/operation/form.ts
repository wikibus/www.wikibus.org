import { ViewTemplates } from '@lit-any/views'
import { html, render } from 'lit-html'
import { until } from 'lit-html/directives/until'
import { RuntimeOperation } from 'alcaeus'
import { ifDefined } from 'lit-html/directives/if-defined'
import { operationForm } from '../scopes'
import { State, app } from '../../lib/state'
import { OperationFormState } from '../../lib/state/core'

const formElement = '__operation-form-element'

async function updateState() {
  const { actions } = await app
  actions.hideOperationForm()
}

function invokeOperation(operation: RuntimeOperation) {
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
    import('../../components/canvas-shell/canvas-spinner')
    import('@vaadin/vaadin-dialog/vaadin-dialog.js')

    function renderDialog(root: Element) {
      const div = root.firstElementChild || document.createElement('div')

      render(html`<span @click="${updateState}">foo</span> ${op.error ? renderError(op.error) : html``} ${until(formLoaded, html`<canvas-spinner size="30"></canvas-spinner> Form loading`)}
        ${op.invoking
    ? html`
              <canvas-spinner size="30"></canvas-spinner> Please wait
            `
    : html``}`, div)

      root.appendChild(div)
    }

    return html`
      <vaadin-dialog no-close-on-outside-click style="width: 50%"
        heading="${ifDefined(op.operation && op.operation.title)}"
        ?opened="${state.core.operationForm.opened}"
        .renderer="${renderDialog}"
      >
      </vaadin-dialog>
    `
  })

ViewTemplates.default.when.scopeMatches(formElement).renders((op: OperationFormState) => html`
    <canvas-operation-form
      .operation="${op.operation}"
      ?no-submit-button="${op.invoking}"
      ?no-reset-button="${op.invoking}"
      ?no-clear-button="${op.invoking}"
      @submit="${invokeOperation(op.operation)}"
    ></canvas-operation-form>
  `)
