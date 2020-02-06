import { ViewTemplates } from '@lit-any/views'
import { HydraResource } from 'alcaeus/types/Resources'
import { html } from 'lit-html'
import { repeat } from 'lit-html/directives/repeat'
import { IResource } from 'alcaeus/types/Resources/Resource'
import { until } from 'lit-html/directives/until'
import { expand } from '@zazuko/rdf-vocabularies'

interface PropertiesOptions {
  except?: string[]
}

ViewTemplates.default.when
  .scopeMatches('portfolio-properties')
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
              <span>${pair.supportedProperty.title}:</span> ${repeat(pair.objects, o =>
                next(o, 'portfolio-property'),
              )}
            </li>
          `,
      )}
    `
  })

ViewTemplates.default.when
  .scopeMatches('portfolio-property')
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
  .scopeMatches('portfolio-property')
  .valueMatches((v: IResource) => typeof v === 'object' && expand('schema:name') in v)
  .renders(
    v =>
      html`
        ${v[expand('schema:name')]}
      `,
  )

ViewTemplates.default.when.scopeMatches('portfolio-property').renders(
  v =>
    html`
      ${v}
    `,
)
