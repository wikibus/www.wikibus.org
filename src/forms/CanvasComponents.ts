import { html } from 'lit-html'
import { SingleEditorComponent } from '@hydrofoil/shaperone-wc'
import { dash, sh } from '@tpluscode/rdf-ns-builders'

export const textbox: SingleEditorComponent = {
  editor: dash.TextFieldEditor,
  render({ value, property }, { update }) {
    return html`
  <input
    type="text"
    name="${property.name}"
    .value="${value.object.value}"
    class="form-control required"
    placeholder="${property.shape.getString(sh.description) || ''}"
    @input="${(e: any) => update(e.target.value)}"
  />`
  },
}

/* export const button = buttonFactory(({ label, onClick }) => {
  const buttonImport = import('../components/canvas-shell/canvas-button').then(
    () =>
      html`
        <canvas-button label="${label}" @click="${onClick}"></canvas-button>
      `,
  )

  return html`
    ${until(buttonImport, '')}
  `
})

export const checkbox = cbFactory(() => (f, id, v, set) => html`
  <div>
    <input
      id="${id}"
      class="checkbox-style"
      type="checkbox"
      ?checked="${ifDefined(v)}"
      @change="${({ target }: { target: HTMLInputElement }) => set(target.checked)}"
    />
    <label for="${id}" class="checkbox-style-2-label"></label>
  </div>
`) */
