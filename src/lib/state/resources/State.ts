import { RdfResource } from 'alcaeus'

interface LoadedResource {
  isLoading: false
  resource: RdfResource
  value: RdfResource
}

interface LoadingResource {
  isLoading: true
}

interface FailedResource {
  isLoading: false
  error: string
}

type ResourceState = LoadedResource | LoadingResource | FailedResource

export type Resources = Record<string, ResourceState>
