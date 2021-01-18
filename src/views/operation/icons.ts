import { ViewTemplates } from '@lit-any/views'
import { html } from 'lit-html'
import { RuntimeOperation } from 'alcaeus'
import { NamedNode } from 'rdf-js'
import { schema } from '@tpluscode/rdf-ns-builders'
import { operationIcon } from '../scopes'
import { Command, Pdf, PlusCircle, MinusCircle, UploadCloud, Edit } from '../../components/icons'
import { wba } from '../../lib/ns'

const iconSize = 40

function operationTyped(type: NamedNode) {
  return (op: RuntimeOperation) => op && op.types.has(type.value)
}

ViewTemplates.default.when
  .scopeMatches(operationIcon)
  .valueMatches(operationTyped(wba.AddToWishlistAction))
  .renders(() => html` ${Pdf} `)

ViewTemplates.default.when
  .scopeMatches(operationIcon)
  .valueMatches(operationTyped(schema.CreateAction))
  .renders(() => html` ${PlusCircle(iconSize)} `)

ViewTemplates.default.when
  .scopeMatches(operationIcon)
  .valueMatches(operationTyped(schema.UpdateAction))
  .renders(() => html` ${Edit(iconSize)} `)

ViewTemplates.default.when
  .scopeMatches(operationIcon)
  .valueMatches(operationTyped(schema.DeleteAction))
  .renders(() => html` ${MinusCircle(iconSize)} `)

ViewTemplates.default.when
  .scopeMatches(operationIcon)
  .valueMatches(operationTyped(schema.TransferAction))
  .renders(() => html` ${UploadCloud(iconSize)} `)

ViewTemplates.default.when.scopeMatches(operationIcon).renders(() => html` ${Command(iconSize)} `)
