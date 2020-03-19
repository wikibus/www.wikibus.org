import { html } from 'lit-html'
import { until } from 'lit-html/directives/until'
import buttonFactory from '@lit-any/forms/lib/components/button'
import textboxFactory from '@lit-any/forms/lib/components/textbox'
import cbFactory from '@lit-any/forms/lib/components/checkbox'
import { ifDefined } from 'lit-html/directives/if-defined'

export const textbox = textboxFactory(() => (f, id, v, set) => html`
  <input
    type="text"
    id="${id}"
    name="${f.title}"
    .value="${v || ''}"
    class="form-control ${f.required ? 'required' : ''}"
    placeholder="${f.description || ''}"
    @input="${(e: any) => set(e.target.value)}"
  />
`)

export const button = buttonFactory(({ label, onClick }) => {
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
`)
