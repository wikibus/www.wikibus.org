import { Collection, PartialCollectionView } from 'alcaeus'

export function getPage(resource: Collection, rel: 'next' | 'previous') {
  if (resource.view?.length > 0) {
    if (rel in resource.view[0]) {
      return ((resource.view[0] as PartialCollectionView)[rel]) || null
    }
  }

  return null
}
