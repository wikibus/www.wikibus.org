import { FieldTemplates } from '@lit-any/forms'
import { expand } from '@zazuko/rdf-vocabularies'
import { html } from 'lit-html'
import { until } from 'lit-html/directives/until'
import * as CanvasComponents from './CanvasComponents'

FieldTemplates.default.useComponents(CanvasComponents)

FieldTemplates.default.when
  .fieldMatches(field => field.type === expand('dcterms:language'))
  .renders((f, id, v, set) => {
    import('multiselect-combo-box/multiselect-combo-box')

    const languagesLoaded = import('iso-639-1').then(codes => {
      const c = codes.default.getLanguages(codes.default.getAllCodes()).map(l => ({
        ...l,
        '@id': `http://lexvo.org/id/iso639-1/${l.code}`,
      }))

      let selectedItems: Array<any>
      if (v) {
        selectedItems = Array.isArray(v) ? v : [v]
      } else {
        selectedItems = []
      }

      return html`
        <multiselect-combo-box
          .items="${c}"
          .selectedItems="${selectedItems}"
          item-id-path="@id"
          item-label-path="name"
          ?required="${f.required}"
          style="width: 100%"
          @change="${(e: any) => {
            set(e.target.selectedItems)
          }}"
        ></multiselect-combo-box>
      `
    })

    return html`
      ${until(languagesLoaded, '')}
    `
  })

FieldTemplates.default.when
  .fieldMatches(field => field.type === expand('schema:ImageObject'))
  .renders(
    (f, id, v, set) =>
      html`
        <input
          type="file"
          accept="image/*"
          multiple
          ?required="${f.required}"
          @change="${(e: any) => {
            set(e.target.files)
          }}"
        />
      `,
  )
