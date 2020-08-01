import { ViewTemplates } from '@lit-any/views'
import { html, TemplateResult } from 'lit-html'
import { repeat } from 'lit-html/directives/repeat'
import { schema } from '@tpluscode/rdf-ns-builders'
import { HydraResource, SupportedProperty } from 'alcaeus'
import { portfolioSpecializedProperties, mediaTypeIcon, portfolioProperty } from '../scopes'
import '../../components/canvas-shell/canvas-featured-box'
import { State, app } from '../../lib/state'
import { User } from '../../components/icons'

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
    let contents: () => TemplateResult | string
    const resourceState = state.resources[value.id.value]
    const load = () => app.then(({ actions }) => actions.loadResource(value))

    if (!resourceState) {
      load()
      contents = () => ''
    } else if (resourceState.isLoading) {
      contents = () =>
        html`
          ${User(50)}
          <p slot="description">Loading</p>
        `
    } else if ('value' in resourceState) {
      contents = () => next(resourceState.value, portfolioProperty)
    } else {
      contents = () =>
        html`
          ${User(50)}
          <p slot="description">
            Loading failed <a href="javascript:void(0)" @click="${load}">Try again</a>
          </p>
        `
    }

    return html`
      <canvas-featured-box title="${property.title}">${contents()}</canvas-featured-box>
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
    ({ value }, next) => html`
      <canvas-featured-box
        title="${value[schema.name.value]}"
        .href="${value[schema.contentUrl.value]}"
      >
        ${next(value, mediaTypeIcon)}
        <p slot="description">${value[schema.contentSize.value]}</p>
      </canvas-featured-box>
    `,
  )
