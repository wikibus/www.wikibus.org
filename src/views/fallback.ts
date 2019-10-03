import { HydraResource } from 'alcaeus/types/Resources'
import { ViewTemplates } from '@lit-any/views'
import { html } from 'lit-html'
import { unsafeHTML } from 'lit-html/directives/unsafe-html'
import { wikibusResource } from './scopes'
import { State } from '../lib/state'

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
  .valueMatches((v: State) => !!v.resource)
  .renders((value: State, next) => next(value.resource, wikibusResource))

ViewTemplates.default.when
  .scopeMatches(wikibusResource)
  .valueMatches(() => true)
  .renders(
    value =>
      html`
        <pre>${unsafeHTML(JSON.stringify(value, getReplacer(), 2))}</pre>
      `,
  )
