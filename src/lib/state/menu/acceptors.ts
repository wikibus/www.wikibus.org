import O from 'patchinko/immutable'
import { expand } from '@zazuko/rdf-vocabularies'
import { onChange, State } from '../index'

const populateMenu = onChange(
  state => state.core.homeEntrypoint,
  state => {
    const menu = state.core.homeEntrypoint.getLinks().reduce(
      (map, { supportedProperty, resources }) => ({
        ...map,
        [supportedProperty.title]: resources[0].id,
      }),
      {},
    )

    return {
      menu: O({
        items: {
          Home: state.core.homeEntrypoint.id,
          ...menu,
        },
      }),
    }
  },
)

const selectCurrentMenuItem = (state: State): Partial<State> => {
  const resource = state.core.resource as any
  if (!resource) return {}

  const currentLinkedEntrypoint = resource.apiDocumentation.valueOrThrow()[
    expand('hydra:entrypoint')
  ].id
  const currentMenuItem = Object.entries(state.menu.items).find(
    ([key, value]) => value === currentLinkedEntrypoint,
  )

  return {
    menu: O({
      current: currentMenuItem ? currentMenuItem[0] : '',
    }),
  }
}

export const acceptors = [populateMenu, selectCurrentMenuItem]
