import { FieldTemplates } from '@lit-any/forms'
import { expand } from '@zazuko/rdf-vocabularies'
import { html } from 'lit-html'
import * as CanvasComponents from './CanvasComponents'

FieldTemplates.default.useComponents(CanvasComponents)

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
