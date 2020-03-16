import { ViewTemplates } from '@lit-any/views'
import { html } from 'lit-html'
import { repeat } from 'lit-html/directives/repeat'
import { schema } from '@tpluscode/rdf-ns-builders'
import { HydraResource } from 'alcaeus/types/Resources'
import { portfolioSpecializedProperties, mediaTypeIcon } from '../scopes'
import '../../components/canvas-shell/canvas-featured-box'

ViewTemplates.default.when
  .scopeMatches(portfolioSpecializedProperties)
  .renders((res: HydraResource, next) => {
    const properties = res.getProperties()

    return html`
      ${repeat(
        properties,
        ({ objects }) =>
          html`
            ${repeat(
              objects,
              value =>
                html`
                  ${next(value, 'portfolioSpecializedProperty')}
                `,
            )}
          `,
      )}
    `
  })

ViewTemplates.default.when
  .scopeMatches('portfolioSpecializedProperty')
  .valueMatches(
    (v: HydraResource) =>
      typeof v === 'object' &&
      v &&
      v.types.contains(schema.MediaObject.value) &&
      !!v[schema.contentUrl.value],
  )
  .renders(
    (res, next) => html`
      <canvas-featured-box
        title="${res[schema.name.value]}"
        .href="${res[schema.contentUrl.value]}"
      >
        ${next(res, mediaTypeIcon)}
        <p slot="description">${res[schema.contentSize.value]}</p>
      </canvas-featured-box>
    `,
  )
