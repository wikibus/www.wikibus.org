import O from 'patchinko/immutable'
import { onChange } from '../index'

const setEmphasisBackground = onChange(
  state => (state.core.resource ? state.core.resource.id : ''),
  state => {
    const { resource } = state.core

    if (resource) {
      const fileName = Object.entries(state.menu.items).find(([, value]) => value === resource.id)

      return {
        pageTitle: O({
          background: `images/emphasis-header/${fileName ? fileName[0].toLowerCase() : 'home'}.jpg`,
        }),
      }
    }

    return {}
  },
)

const unhideTitleOnResourceChange = onChange(
  state => (state.core.resource ? state.core.resource.id : ''),
  state => {
    if (!state.pageTitle.hidden) {
      return {}
    }

    return {
      pageTitle: O({
        hidden: false,
      }),
    }
  },
)

export const acceptors = [setEmphasisBackground, unhideTitleOnResourceChange]
