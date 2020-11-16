import O from 'patchinko/immutable'
import { Resource } from 'alcaeus'
import { onChange } from '../onChange'
import { State } from '../index'

const populateMenu = onChange(
  state => state.core.homeEntrypoint,
  state => {
    const menu = state.core.homeEntrypoint
      .getLinks()
      .reduce((map, { supportedProperty, resources }) => {
        const resource = resources[0] as Resource
        const title = resource.title || supportedProperty.title
        if (!title) {
          return map
        }

        return {
          ...map,
          [title]: resources[0].id,
        }
      }, {})

    return {
      menu: O<typeof state.menu>({
        items: {
          Home: state.core.homeEntrypoint.id,
          ...menu,
        },
      }),
    }
  },
)

const selectCurrentMenuItem = (state: State): Partial<State> => ({})

/*
  const { resource } = state.core as any
  const currentLinkedEntrypoint = resource.apiDocumentation.valueOrThrow()[hydra.entrypoint.value]
    .id
  const currentMenuItem = Object.entries(state.menu.items).find(
    ([key, value]) => value === currentLinkedEntrypoint,
  )

  return {
    menu: O<typeof state.menu>({
      current: currentMenuItem ? currentMenuItem[0] : '',
    }),
  }
  */

export const acceptors = [populateMenu, selectCurrentMenuItem]
