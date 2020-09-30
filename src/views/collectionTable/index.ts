import { html, TemplateResult } from 'lit-html'
import { Collection, HydraResource, SupportedProperty } from 'alcaeus'
import { repeat } from 'lit-html/directives/repeat'
import { rdf } from '@tpluscode/rdf-ns-builders'
import { collectionTableCell } from '../scopes'
import { State } from '../../lib/state'

import './cells'

export function collectionTable(
  state: State<Collection>,
  next: (value: unknown, scope: string) => TemplateResult,
) {
  const collection = state.core.resource

  let properties: SupportedProperty[] = []
  const managedClass = collection.manages.find(
    mb => mb.property && mb.property.equals(rdf.type),
  )
  if (managedClass && managedClass.object) {
    properties = managedClass.object.supportedProperties
  }

  const headerCell = (sp: SupportedProperty) =>
    html`
      <th>${sp.title}</th>
    `
  const memberRow = (member: HydraResource) => (sp: SupportedProperty) => {
    const propertyValues = member.getProperties().find(p => p.supportedProperty.id === sp.id)

    let value: string | TemplateResult = ''
    if (propertyValues && propertyValues.objects[0]) {
      value = next(propertyValues.objects[0], collectionTableCell)
    }

    return html`
      <td>${value}</td>
    `
  }

  return html`
    <table class="table">
      <thead>
        <tr>
          ${repeat(properties, headerCell)}
        </tr>
      </thead>
      <tbody>
        ${repeat(
          collection.members,
          member => html`
            <tr>
              ${repeat(properties, memberRow(member))}
            </tr>
          `,
        )}
      </tbody>
    </table>
  `
}
