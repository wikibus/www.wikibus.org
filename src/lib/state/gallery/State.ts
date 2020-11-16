import { RdfResource, ResourceIdentifier } from 'alcaeus'

export interface Gallery {
  collectionId: ResourceIdentifier | null
  resources: any[]
  nextPage: RdfResource | null
  prevPage: RdfResource | null
  nextPageLoading: boolean
  prevPageLoading: boolean
}
