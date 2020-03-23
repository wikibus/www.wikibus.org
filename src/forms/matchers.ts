import { NamedNode } from 'rdf-js'

export function typeMatches(type: NamedNode) {
  return (field: any) => {
    if (!field.type) {
      return false
    }

    if (field.type.id) {
      return field.type.id === type.value
    }

    return field.type === type.value
  }
}
