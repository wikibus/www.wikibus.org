import { Gallery } from './State'

export function Initial(): Gallery {
  return {
    collectionId: null,
    resources: [],
    nextPage: null,
    prevPage: null,
    nextPageLoading: false,
    prevPageLoading: false,
  }
}
