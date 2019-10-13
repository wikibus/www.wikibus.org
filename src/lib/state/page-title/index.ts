import { State } from './State'

export { State } from './State'
export { Initial } from './Initial'
export { acceptors } from './acceptors'

export function Actions(update: (patch: Partial<State>) => void) {
  return {}
}
