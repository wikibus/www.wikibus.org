import { ViewTemplates } from '@lit-any/views'
import { HydraResource, SupportedProperty } from 'alcaeus/types/Resources'
import { html, TemplateResult } from 'lit-html'
import { repeat } from 'lit-html/directives/repeat'
import { IResource } from 'alcaeus/types/Resources/Resource'
import { until } from 'lit-html/directives/until'
import { dtype, schema, rdfs } from '@tpluscode/rdf-ns-builders'
import { portfolioProperties, portfolioProperty } from '../scopes'
import { wba, wbo } from '../../lib/ns'
import { lazyResourceRender } from './lazyResourceRender'
import { State } from '../../lib/state'

interface PropertiesOptions {
  except?: string[]
  state: State
}

interface PropertyModel {
  property?: SupportedProperty
  value: IResource | number | string
}

ViewTemplates.default.when
  .scopeMatches(portfolioProperties)
  .renders((res: HydraResource, next, scope, { except = [], state }: PropertiesOptions) => {
    const properties = res
      .getProperties()
      .filter(prop => prop.objects.length > 0)
      .filter(prop => !except || !except.includes(prop.supportedProperty.property.id))

    return html`
      ${repeat(
    properties,
    pair =>
      html`
            <li>
              <span>${pair.supportedProperty.title}:</span> ${repeat(
  pair.objects,
  (value, index) =>
    html`
                    ${next({ property: pair.supportedProperty, value }, portfolioProperty, { state })}${index < pair.objects.length - 1 ? ', ' : ''}
                  `,
)}
            </li>
          `,
  )}
    `
  })

ViewTemplates.default.when
  .scopeMatches(portfolioProperty)
  .valueMatches(({ value }: PropertyModel) => typeof value === 'object' && /lexvo/.test(value.id))
  .renders(({ value }) => {
    const matches = /\/(\w+)$/[Symbol.match](value.id)
    if (!matches) return ''

    const countryCode = matches[1]
    const languagesLoaded = import('iso-639-1').then(codes =>
      codes.default.getNativeName(countryCode),
    )

    return html`
      ${until(languagesLoaded, '')}
    `
  })

ViewTemplates.default.when
  .scopeMatches(portfolioProperty)
  .valueMatches(({ value }: PropertyModel) => typeof value === 'object' && value.types.contains(schema.Person.value))
  .renders(
    ({ value }) =>
      html`
        <img
          src="${value[schema.image.value][schema.contentUrl.value].id}"
          alt="${value[schema.name.value]} avatar"
        />
        <p slot="description">${value[schema.name.value]}</p>
      `,
  )

ViewTemplates.default.when
  .scopeMatches(portfolioProperty)
  .valueMatches(({ value }: PropertyModel) => typeof value === 'object' && schema.name.value in value)
  .renders(
    ({ value }) =>
      html`
        ${value[schema.name.value]}
      `,
  )

ViewTemplates.default.when
  .scopeMatches(portfolioProperty)
  .valueMatches(({ property }: PropertyModel) => !!property && property.property.id === wba.storageLocation.value)
  .renders(
    ({ value }, next, _, { state }) => lazyResourceRender(value, state)({ next }),
  )

ViewTemplates.default.when
  .scopeMatches(portfolioProperty)
  .valueMatches(({ value }: PropertyModel) => typeof value === 'object' && value.types.contains(wbo.StorageLocation.value))
  .renders(
    ({ value }, next, _, { state }) => {
      const params = {
        next,
        wrapLoaded: (c: string | TemplateResult) => html`${c}&nbsp;(${value[dtype.position.value]})`,
      }

      return html`${lazyResourceRender(value[schema.containedInPlace.value], state)(params)}`
    },
  )

ViewTemplates.default.when
  .scopeMatches(portfolioProperty)
  .valueMatches(({ value }: PropertyModel) => typeof value === 'object' && value.types.contains(wbo.StorageContainer.value))
  .renders(
    ({ value }) => html`${value[rdfs.label.value]}`,
  )

ViewTemplates.default.when.scopeMatches(portfolioProperty).renders(
  ({ value }) =>
    html`
      ${value}
    `,
)
