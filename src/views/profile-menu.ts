import { ViewTemplates } from '@lit-any/views'
import { html } from 'lit-html'
import { until } from 'lit-html/directives/until'
import { app, State } from '../lib/state'

ViewTemplates.default.when
  .scopeMatches('profile-menu')
  .valueMatches((value: State) => value.auth.isAuthenticated === false)
  .renders((state: State) => {
    const profileMenu = app.then(({ actions }) => {
      const resource = state.core.resource || state.core.homeEntrypoint
      return html`
        <bs-dropdown-item-button
          @bs-dropdown-item-click="${() => actions.login(resource)}"
          title="Login"
        ></bs-dropdown-item-button>
      `
    })

    return html`
      ${until(profileMenu, html``)}
    `
  })

ViewTemplates.default.when
  .scopeMatches('profile-menu')
  .valueMatches((value: State) => value.auth.isAuthenticated === true)
  .renders(() => {
    const profileMenu = app.then(
      ({ actions }) =>
        html`
          <bs-dropdown-item-button
            @bs-dropdown-item-click="${actions.logout}"
            title="Logout"
          ></bs-dropdown-item-button>
        `,
    )
    return html`
      ${until(profileMenu, html``)}
    `
  })
