declare module 'patchinko/immutable' {
  type StateModification<State> = (s: State) => State | Promise<State>

  export default function O<T = unknown>(arg: Partial<T> | StateModification<T>): T
}
