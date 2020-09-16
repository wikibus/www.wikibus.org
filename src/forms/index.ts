import { FieldTemplates } from '@lit-any/forms'
import { checkbox } from '@lit-any/forms/components'
import { FieldContract } from '@lit-any/forms/lib/formContract'
import { dcterms, schema, xsd } from '@tpluscode/rdf-ns-builders'
import { html, directive, PropertyPart, Part } from 'lit-html'
import { until } from 'lit-html/directives/until'
import { Hydra } from 'alcaeus'
import { Collection } from 'alcaeus/types/Resources'
import * as CanvasComponents from './CanvasComponents'
import { typeMatches } from './matchers'

const stateMap = new WeakMap<Part, boolean>()

const resolveOnce = directive((initialPromise: () => Promise<any>) => async (part: Part) => {
  const done = stateMap.has(part)
  if (!done && part instanceof PropertyPart) {
    const resolved = await initialPromise()
    stateMap.set(part, true)
    part.setValue(resolved)
    part.commit()
  }
})

FieldTemplates.default.useComponents(CanvasComponents)

FieldTemplates.default.when
  .fieldMatches(field => field.type === xsd.date.value)
  .renders((f, id, v, set) => {
    import('@vaadin/vaadin-date-picker/vaadin-date-picker.js')

    return html`
      <vaadin-date-picker
        id="${id}"
        placeholder="YYYY-MM-DD"
        .value="${v}"
        @change="${(e: any) => set(e.target.value)}"
        style="width: 100%"
      ></vaadin-date-picker>
    `
  })

FieldTemplates.default.when
  .fieldMatches(field => field.property === schema.contributor.value)
  .renders((f, id, v: any, set) => {
    import('@vaadin/vaadin-combo-box/vaadin-combo-box.js')

    async function dataProvider(params: any, callback: any) {
      const res = await Hydra.loadResource('https://users.wikibus.org/contributors')

      const collection = res.root as Collection | null
      if (collection) {
        callback(
          collection.members.map(m => ({
            id: m.id,
            label: m[schema.name.value],
          })),
          collection.totalItems,
        )
      }
    }

    async function loadInitialUser() {
      if (v) {
        const { root } = await Hydra.loadResource(v)
        if (root) {
          return {
            id: root.id,
            label: root[schema.name.value],
          }
        }
      }

      return undefined
    }

    return html`
      <vaadin-combo-box
        .dataProvider="${dataProvider}"
        item-id-path="id"
        .selectedItem="${resolveOnce(loadInitialUser)}"
        @selected-item-changed="${(e: any) => {
          set(e.detail.value.id)
        }}"
      ></vaadin-combo-box>
    `
  })

FieldTemplates.default.when
  .fieldMatches(field => field.property === dcterms.language.value)
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
  .fieldMatches(typeMatches(schema.ImageObject))
  .renders((f, id, v, set) => UploadComponent(f, set, { accept: 'image/*', multiple: true }))

FieldTemplates.default.when
  .fieldMatches(typeMatches(schema.MediaObject))
  .renders((f, id, v, set) =>
    UploadComponent(f, set, { accept: 'application/pdf', multiple: true }),
  )

FieldTemplates.default.when.fieldMatches(typeMatches(xsd.boolean)).rendersComponent(checkbox())
