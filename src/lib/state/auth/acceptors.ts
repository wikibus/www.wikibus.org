import { onChange } from '../onChange'

const setHydraAuthHeader = onChange(
  state => state.auth.token,
  state => {
    const { Hydra } = state.core
    Hydra.defaultHeaders = {
      Authorization: `Bearer ${state.auth.token}`,
    }
    return state
  },
)

export const acceptors = [setHydraAuthHeader]
