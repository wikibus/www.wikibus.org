import { HydraResource } from 'alcaeus/types/Resources'
import { expand } from '@zazuko/rdf-vocabularies'

export function rdfType(type: string) {
  return (value: HydraResource) => value.types && value.types.contains(expand(type))
}
