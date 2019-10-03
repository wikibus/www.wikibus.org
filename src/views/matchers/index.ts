import { Collection, HydraResource, SupportedProperty } from 'alcaeus/types/Resources'
import { expand } from '@zazuko/rdf-vocabularies'
import { State } from '../../lib/state'

export function rdfType(type: string) {
  return (value: HydraResource) => value && value.types && value.types.contains(expand(type))
}

export function collectionOf(type: string) {
  const matchesType = rdfType('hydra:Collection')

  return (state: State) => {
    const collection = state.resource as Collection

    return (
      collection &&
      matchesType(collection) &&
      !!collection.manages.find(mb =>
        mb.matches({
          object: expand(type),
        }),
      )
    )
  }
}

export function supportedProperty(id: string) {
  return (sp: SupportedProperty) => sp.property && sp.property.id === expand(id)
}
