import { HydraResource, SupportedProperty } from 'alcaeus/types/Resources'
import { expand } from '@zazuko/rdf-vocabularies'

export function rdfType(type: string) {
  return (value: HydraResource) => value && value.types && value.types.contains(expand(type))
}

export function supportedProperty(id: string) {
  return (sp: SupportedProperty) => sp.property && sp.property.id === expand(id)
}
