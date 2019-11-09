import { html, TemplateResult } from 'lit-html'

export function widget(contents: TemplateResult) {
  if (contents.getHTML().length === 0) {
    return html``
  }

  return html`
    <div class="widget clearfix">
      ${contents}
    </div>
  `
}
