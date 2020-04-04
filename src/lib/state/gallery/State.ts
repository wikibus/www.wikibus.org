import { HydraResource } from 'alcaeus/types/Resources'

export interface Gallery {
  collectionId: string
  resources: any[]
  nextPage: HydraResource | null
  prevPage: HydraResource | null
  nextPageLoading: boolean
  prevPageLoading: boolean
}
