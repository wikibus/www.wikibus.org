import { Collection, HydraResource, PartialCollectionView } from 'alcaeus'

export function getPage(resource: Collection, rel: 'next' | 'previous') {
  if (resource.views && resource.views.length > 0) {
    if (rel in resource.views[0]) {
      return ((resource.views[0] as PartialCollectionView)[rel] as HydraResource) || null
    }
  }

  return null
}
