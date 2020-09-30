import { ViewTemplates } from '@lit-any/views'
import { html, TemplateResult } from 'lit-html'
import { repeat } from 'lit-html/directives/repeat'
import { schema } from '@tpluscode/rdf-ns-builders'
import { HydraResource, SupportedProperty } from 'alcaeus'
import { mediaTypeIcon, portfolioSpecializedProperties } from '../scopes'
import '../../components/canvas-shell/canvas-featured-box'
import { State } from '../../lib/state'
import { User } from '../../components/icons'
import { lazyResourceRender } from './lazyResourceRender'

const portfolioSpecializedProperty = 'portfolioSpecializedProperty'

interface SpecializedPropertyModel<T = unknown> {
  property: SupportedProperty
  value: T
  state: State
}

ViewTemplates.default.when
  .scopeMatches(portfolioSpecializedProperties)
  .renders((res: HydraResource, next, scope, { state }) => {
    const properties = res.getProperties()

    return html`
      ${repeat(
    properties,
    ({ supportedProperty, objects }) =>
      html`
            ${repeat(
    objects,
    value =>
      html`
                  ${next(
    { property: supportedProperty, value, state },
    portfolioSpecializedProperty,
  )}
                `,
  )}
          `,
  )}
    `
  })
ViewTemplates.default.when
  .scopeMatches(portfolioSpecializedProperty)
  .valueMatches<SpecializedPropertyModel>(({ property }) =>
    property.property.id.equals(schema.contributor),
)
  .renders(({ property, value, state }: SpecializedPropertyModel<HydraResource>, next) => {
    import('../../components/canvas-shell/canvas-sidebar-section')

    const userIcon = (c: TemplateResult | string) => html`${User(50)}<p slot="description">${c}</p>`

    return html`
      <canvas-featured-box title="${property.title}">
        ${lazyResourceRender(value, state)({ next, wrapLoading: userIcon, wrapFailed: userIcon })}
      </canvas-featured-box>
    `
  })

ViewTemplates.default.when
  .scopeMatches(portfolioSpecializedProperty)
  .valueMatches<SpecializedPropertyModel<HydraResource>>(
  ({ value }) =>
    typeof value === 'object' &&
      value &&
      value.types.has(schema.MediaObject) &&
      !!value.get(schema.contentUrl),
)
  .renders(
    ({ value, property }, next) => {
      const renderContentSize = () => {
        const contentSize = value[schema.contentSize.value]
        if (typeof contentSize === 'number') {
          return `${Math.floor(contentSize / 1024 / 1024 * 100) / 100} MB`
        }

        return contentSize
      }

      const contentUrl = value[schema.contentUrl.value]
      return html`
        <canvas-featured-box
          title="${property.title}"
          .href="${contentUrl.id || contentUrl}"
        >
          ${next(value, mediaTypeIcon)}
          <p slot="description">${renderContentSize()}</p>
        </canvas-featured-box>
      `
    },
  )
