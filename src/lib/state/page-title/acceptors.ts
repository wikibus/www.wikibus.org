import { onChange } from '../index'

const setEmphasisBackground = onChange(
  state => (state.core.resource ? state.core.resource.id : ''),
  state => {
    const { resource } = state.core

    if (resource) {
      const fileName = Object.entries(state.menu.items).find(([, value]) => value === resource.id)

      return {
        pageTitle: {
          background: `images/emphasis-header/${fileName ? fileName[0].toLowerCase() : 'home'}.jpg`,
        },
      }
    }

    return {}
  },
)

export const acceptors = [setEmphasisBackground]
