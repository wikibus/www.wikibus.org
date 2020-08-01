import { ViewTemplates } from '@lit-any/views'
import { html } from 'lit-html'
import { unsafeHTML } from 'lit-html/directives/unsafe-html'
import { HydraResource } from 'alcaeus'
import { State } from '../lib/state'

function getReplacer() {
  const uris = new Map<string, number>()

  return function replacer(i: string, v: string | HydraResource) {
    if (typeof v === 'object' && !Array.isArray(v)) {
      if (uris.has(v.id.value)) {
        return {
          '@id': v.id,
        }
      }

      uris.set(v.id.value, 0)
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
  .valueMatches((v: State) => v.core.debug)
  .renders(
    (value: State) => html`
      <pre>${unsafeHTML(JSON.stringify(value.core.resource, getReplacer(), 2))}</pre>
    `,
  )
