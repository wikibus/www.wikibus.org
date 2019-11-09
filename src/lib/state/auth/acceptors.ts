import { Hydra } from 'alcaeus'
import { onChange } from '../index'

const setHydraAuthHeader = onChange(
  state => state.auth.token,
  state => {
    Hydra.defaultHeaders = {
      Authorization: `Bearer ${state.auth.token}`,
    }
    return state
  },
)

export const acceptors = [setHydraAuthHeader]
