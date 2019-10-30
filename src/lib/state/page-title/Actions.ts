import { State } from './State'

export function Actions(update: (patch: Partial<State>) => void) {
  return {
    hide() {
      update({
        hidden: true,
      })
    },
  }
}
