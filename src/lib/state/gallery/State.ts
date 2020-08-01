import { HydraResource, ResourceIdentifier } from 'alcaeus'

export interface Gallery {
  collectionId: ResourceIdentifier | null
  resources: any[]
  nextPage: HydraResource | null
  prevPage: HydraResource | null
  nextPageLoading: boolean
  prevPageLoading: boolean
}
