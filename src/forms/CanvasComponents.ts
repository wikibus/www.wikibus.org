import { html } from 'lit-html'
import { until } from 'lit-html/directives/until'
import buttonFactory from '@lit-any/forms/lib/components/button'
import textboxFactory from '@lit-any/forms/lib/components/textbox'

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
