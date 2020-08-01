import { ResourceIdentifier } from '@tpluscode/rdfine'

export { acceptors } from './acceptors'

export interface Menu {
  items: Record<string, ResourceIdentifier>
  current: string
}

export function Initial(): Menu {
  return {
    items: {},
    current: '',
  }
}
