declare module 'meiosis-setup/patchinko' {
  import flyd from 'flyd'

  export default function meiosisPatchinko<TState, TActions>(opts: {
    stream: any
    O: any
    app: any
  }): Promise<{
    updates: any
    models: any
    states: flyd.Stream<TState>
    actions: TActions
  }>
}
