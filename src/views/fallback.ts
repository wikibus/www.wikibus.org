import { ViewTemplates } from '@lit-any/views'
import { html } from 'lit-html'
import { until } from 'lit-html/directives/until'
import { wikibusResource } from './scopes'
import { State } from '../lib/state'

ViewTemplates.default.when
  .scopeMatches('hydrofoil-shell')
  .valueMatches((v: State) => !!v.resource && !v.debug)
  .renders((state: State, next) => next(state.resource, wikibusResource))

ViewTemplates.default.when
  .scopeMatches(wikibusResource)
  .valueMatches(() => true)
  .renders(() => {
    const loaded = import('./maintenance')

    return html`
      ${until(loaded.then(i => i.template), '')}
    `
  })
