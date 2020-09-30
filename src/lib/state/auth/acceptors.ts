import { Hydra } from 'alcaeus/web'
import { onChange } from '../onChange'

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
