import AlcaeusForm from '@hydrofoil/alcaeus-forms/alcaeus-form'
import { customElement, html } from 'lit-element'
import { FieldContract } from '@lit-any/forms/lib/formContract'
import CanvasShellBase from './CanvasShellBase'

@customElement('canvas-operation-form')
export class CanvasOperationForm extends CanvasShellBase(AlcaeusForm) {
  // eslint-disable-next-line class-methods-use-this
  __labelTemplate(field: FieldContract) {
    return html`
      <label for="template-contactform-name">
        ${field.title || field.property}
        <small class="text-danger" ?hidden="${!field.required}">*</small>
      </label>
    `
  }
}
