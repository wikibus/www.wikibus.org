import { RdfResource, SupportedProperty } from 'alcaeus'
import { NamedNode } from 'rdf-js'

export function rdfType(type: NamedNode) {
  return (value: RdfResource) => value?.types?.has(type)
}

export function supportedProperty(id: NamedNode) {
  return (sp: SupportedProperty) => sp.property?.equals(id) || false
}
