import { FieldTemplates } from '@lit-any/forms'
import { checkbox } from '@lit-any/forms/components'
import { FieldContract } from '@lit-any/forms/lib/formContract'
import { dcterms, schema, xsd } from '@tpluscode/rdf-ns-builders'
import { html } from 'lit-html'
import { until } from 'lit-html/directives/until'
import * as CanvasComponents from './CanvasComponents'

FieldTemplates.default.useComponents(CanvasComponents)

FieldTemplates.default.when
  .fieldMatches(field => field.type === dcterms.language.value)
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

function UploadComponent(
  f: FieldContract,
  set: Function,
  options: { accept: string; multiple: boolean },
) {
  return html`
    <input
      type="file"
      accept="${options.accept}"
      ?multiple="${options.multiple}"
      ?required="${f.required}"
      @change="${(e: any) => {
        set(e.target.files)
      }}"
    />
  `
}

FieldTemplates.default.when
  .fieldMatches(field => field.type === schema.ImageObject.value)
  .renders((f, id, v, set) => UploadComponent(f, set, { accept: 'image/*', multiple: true }))

FieldTemplates.default.when
  .fieldMatches(field => field.type === schema.MediaObject.value)
  .renders((f, id, v, set) =>
    UploadComponent(f, set, { accept: 'application/pdf', multiple: true }),
  )

FieldTemplates.default.when
  .fieldMatches((field: any) => field.type.id === xsd.boolean.value)
  .rendersComponent(checkbox())
