import { HydraResource, SupportedProperty } from 'alcaeus/types/Resources'
import { NamedNode } from 'rdf-js'

export function rdfType(type: NamedNode) {
  return (value: HydraResource) => value && value.types && value.types.contains(type.value)
}

export function supportedProperty(id: NamedNode) {
  return (sp: SupportedProperty) => sp.property && sp.property.id === id.value
}
