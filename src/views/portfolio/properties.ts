import { ViewTemplates } from '@lit-any/views'
import { SupportedProperty } from 'alcaeus'
import { html, TemplateResult } from 'lit-html'
import { repeat } from 'lit-html/directives/repeat'
import { until } from 'lit-html/directives/until'
import { dtype, schema, rdfs } from '@tpluscode/rdf-ns-builders'
import { RdfResource } from '@tpluscode/rdfine'
import type { Person } from '@rdfine/schema'
import { portfolioProperties, portfolioProperty } from '../scopes'
import { wba, wbo } from '../../lib/ns'
import { lazyResourceRender } from './lazyResourceRender'
import { State } from '../../lib/state'

interface PropertiesOptions {
  except?: string[]
  state: State
}

interface PropertyModel<T extends RdfResource | undefined = RdfResource | undefined> {
  property?: SupportedProperty
  literal?: number | string
  resource: T
  value: number | string | T
}

ViewTemplates.default.when
  .scopeMatches(portfolioProperties)
  .renders((res: RdfResource, next, scope, { except = [], state }: PropertiesOptions) => {
    const properties = res
      .getProperties()
      .filter(prop => prop.objects.length > 0)
      .filter(prop => !except || !except.includes(prop.supportedProperty.property?.id.value || ''))

    return html`
      ${repeat(
        properties,
        pair => html`
          <li>
            <span>${pair.supportedProperty.title}:</span> ${repeat(pair.objects, (value, index) => {
              const model: PropertyModel = {
                property: pair.supportedProperty,
                resource: undefined,
                value,
              }

              if (typeof value === 'object' && 'id' in value) {
                model.resource = value
              } else {
                model.literal = value
              }

              return html`
                ${next(model, portfolioProperty, { state })}${index < pair.objects.length - 1
                  ? ', '
                  : ''}
              `
            })}
          </li>
        `,
      )}
    `
  })

ViewTemplates.default.when
  .scopeMatches(portfolioProperty)
  .valueMatches(
    ({ resource }: PropertyModel) =>
      // foo
      !!resource && /lexvo/.test(resource.id.value),
  )
  .renders(({ value }) => {
    const matches = /\/(\w+)$/[Symbol.match](value.id.value)
    if (!matches) return ''

    const countryCode = matches[1]
    const languagesLoaded = import('iso-639-1').then(codes =>
      codes.default.getNativeName(countryCode),
    )

    return html` ${until(languagesLoaded, '')} `
  })

ViewTemplates.default.when
  .scopeMatches(portfolioProperty)
  .valueMatches(
    ({ resource }: PropertyModel) =>
      // foo
      resource?.types.has(schema.Person) || false,
  )
  .renders(
    ({ resource }: PropertyModel<Person>) => html`
      <img src="${resource.image?.contentUrl?.value}" alt="${resource.name} avatar" />
      <p slot="description">${resource.name}</p>
    `,
  )

ViewTemplates.default.when
  .scopeMatches(portfolioProperty)
  .valueMatches(({ resource }: PropertyModel) => !!resource && schema.name.value in resource)
  .renders(({ resource }: PropertyModel<any>) => html` ${resource.name} `)

ViewTemplates.default.when
  .scopeMatches(portfolioProperty)
  .valueMatches(
    ({ property }: PropertyModel) =>
      !!property?.property && property.property.equals(wba.storageLocation),
  )
  .renders(({ value }, next, _, { state }) => lazyResourceRender(value, state)({ next }))

ViewTemplates.default.when
  .scopeMatches(portfolioProperty)
  .valueMatches(({ resource }: PropertyModel) => resource?.types.has(wbo.StorageLocation) || false)
  .renders(({ value }, next, _, { state }) => {
    const params = {
      next,
      wrapLoaded: (c: string | TemplateResult) => html`${c}&nbsp;(${value[dtype.position.value]})`,
    }

    return html`${lazyResourceRender(value[schema.containedInPlace.value], state)(params)}`
  })

ViewTemplates.default.when
  .scopeMatches(portfolioProperty)
  .valueMatches(({ resource }: PropertyModel) => !!resource?.get(rdfs.label.value))
  .renders(({ resource }) => html`${resource[rdfs.label.value]}`)

ViewTemplates.default.when.scopeMatches(portfolioProperty).renders(
  ({ value }) =>
    // debugger
    html` ${value.value} `,
)
