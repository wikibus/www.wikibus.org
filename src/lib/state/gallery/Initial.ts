import { Gallery } from './State'

export function Initial(): Gallery {
  return {
    collectionId: '',
    resources: [],
    nextPage: null,
    prevPage: null,
    nextPageLoading: false,
    prevPageLoading: false,
  }
}
