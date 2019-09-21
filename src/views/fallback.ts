import { HydraResource } from 'alcaeus/types/Resources'
import { ViewTemplates } from '@lit-any/views'
import { html } from 'lit-html'
import { unsafeHTML } from 'lit-html/directives/unsafe-html'

function getReplacer() {
  const uris = new Map<string, number>()

  return function replacer(i: string, v: string | HydraResource) {
    if (typeof v === 'object') {
      if (uris.has(v.id)) {
        return {
          '@id': v.id,
        }
      }

      uris.set(v.id, 0)
    }

    if (i === '@id' && typeof v === 'string') {
      if (!/^_/.test(v)) {
        return `<ld-link resource-url=${v}><a name=${v}>${v}</a></ld-link>`
      }
    }

    return v
  }
}

ViewTemplates.default.when
  .scopeMatches('hydrofoil-shell')
  .valueMatches((v: any) => v.resource)
  .renders((value: any, next) => next(value.resource, 'wikibus-resource'))

ViewTemplates.default.when
  .scopeMatches('wikibus-resource')
  .valueMatches(() => true)
  .renders(
    value =>
      html`
        <pre>${unsafeHTML(JSON.stringify(value, getReplacer(), 2))}</pre>
      `,
  )
