import { HydraResource, SupportedProperty } from 'alcaeus'
import { NamedNode } from 'rdf-js'

export function rdfType(type: NamedNode) {
  return (value: HydraResource) => value?.types?.has(type)
}

export function supportedProperty(id: NamedNode) {
  return (sp: SupportedProperty) => sp.property && sp.property.id.equals(id)
}
