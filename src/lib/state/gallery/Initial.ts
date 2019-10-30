import { State } from './State'

export function Initial(): State {
  return {
    collectionId: '',
    resources: [],
    nextPage: null,
    prevPage: null,
    nextPageLoading: false,
    prevPageLoading: false,
  }
}
