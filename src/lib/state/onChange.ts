import { State } from './index'

export function onChange<T>(
  selector: (state: State) => T,
  acceptor: (state: State) => Partial<State>,
) {
  let previous: T | undefined

  return (state: State) => {
    let patch = {}
    const current = selector(state)
    if (previous !== current) {
      patch = acceptor(state)
    }

    previous = current
    return patch
  }
}
