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
        <a
          class="list-group-item tleft py-2"
          href="javascript:void(0)"
          @click="${() => actions.auth.login(resource)}"
          >Login <i class="icon-signout"></i
        ></a>
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
          <a
            class="list-group-item tleft py-2"
            href="javascript:void(0)"
            @click="${actions.auth.logout}"
            >Logout <i class="icon-signout"></i
          ></a>
        `,
    )
    return html`
      ${until(profileMenu, html``)}
    `
  })
