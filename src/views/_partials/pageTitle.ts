import { html } from 'lit-html'

export function pageTitle(title: string) {
  return html`
    <section id="page-title">
      <div class="container clearfix">
        <h1>${title}</h1>
      </div>
    </section>
  `
}
