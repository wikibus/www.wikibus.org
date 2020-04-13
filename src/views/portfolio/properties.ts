import { ViewTemplates } from '@lit-any/views'
import { HydraResource } from 'alcaeus/types/Resources'
import { html } from 'lit-html'
import { repeat } from 'lit-html/directives/repeat'
import { IResource } from 'alcaeus/types/Resources/Resource'
import { until } from 'lit-html/directives/until'
import { schema } from '@tpluscode/rdf-ns-builders'
import { portfolioProperties, portfolioProperty } from '../scopes'

interface PropertiesOptions {
  except?: string[]
}

ViewTemplates.default.when
  .scopeMatches(portfolioProperties)
  .renders((res: HydraResource, next, scope, params: PropertiesOptions = { except: [] }) => {
    const properties = res
      .getProperties()
      .filter(prop => prop.objects.length > 0)
      .filter(prop => !params.except || !params.except.includes(prop.supportedProperty.property.id))

    return html`
      ${repeat(
        properties,
        pair =>
          html`
            <li>
              <span>${pair.supportedProperty.title}:</span> ${repeat(
                pair.objects,
                (o, index) =>
                  html`
                    ${next(o, portfolioProperty)}${index < pair.objects.length - 1 ? ', ' : ''}
                  `,
              )}
            </li>
          `,
      )}
    `
  })

ViewTemplates.default.when
  .scopeMatches(portfolioProperty)
  .valueMatches((v: IResource) => typeof v === 'object' && /lexvo/.test(v.id))
  .renders(v => {
    const matches = /\/(\w+)$/[Symbol.match](v.id)
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
  .valueMatches((v: IResource) => typeof v === 'object' && v.types.contains(schema.Person.value))
  .renders(
    person =>
      html`
        <div class="testimonial" style="border: none; box-shadow: none">
          <div class="testi-image">
            <a href="javascript:void(0)"
              ><img
                src="${person[schema.image.value][schema.contentUrl.value].id}"
                alt="${person[schema.name.value]} avatar"
            /></a>
          </div>
          <div class="testi-content">
            <div class="testi-meta">
              ${person[schema.name.value]}
            </div>
          </div>
        </div>
      `,
  )

ViewTemplates.default.when
  .scopeMatches(portfolioProperty)
  .valueMatches((v: IResource) => typeof v === 'object' && schema.name.value in v)
  .renders(
    v =>
      html`
        ${v[schema.name.value]}
      `,
  )
ViewTemplates.default.when.scopeMatches(portfolioProperty).renders(
  v =>
    html`
      ${v}
    `,
)
