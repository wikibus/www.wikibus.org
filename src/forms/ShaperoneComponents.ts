import { SingleEditorComponent, html } from '@hydrofoil/shaperone-wc'
import { dash } from '@tpluscode/rdf-ns-builders'

export const textField: SingleEditorComponent = {
  editor: dash.TextFieldEditor,
  render({ value, property }, { update }) {
    return html`<input
      type="text"
      name="${property.name}"
      .value="${value.object.value}"
      class="form-control required"
      placeholder="${property.name}"
      @input="${(e: any) => update(e.target.value)}"
    />`
  },
}
