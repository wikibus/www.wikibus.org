import { HydraResource } from 'alcaeus'

interface LoadedResource {
  isLoading: false
  value: HydraResource
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
