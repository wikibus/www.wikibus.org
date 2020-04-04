export { acceptors } from './acceptors'

export interface Menu {
  items: Record<string, string>
  current: string
}

export function Initial(): Menu {
  return {
    items: {},
    current: '',
  }
}
