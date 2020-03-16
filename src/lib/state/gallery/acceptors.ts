import O from 'patchinko/immutable'
import { hydra } from '@tpluscode/rdf-ns-builders'
import { Collection } from 'alcaeus/types/Resources'
import { onChange } from '../index'
import { getPage } from './helpers'
import { State } from '.'

const replaceGallery = onChange(
  state => state.core.resource,
  state => {
    const { resource } = state.core
    if (!resource || !resource.types.includes(hydra.Collection.value)) return {}
    const collection = resource as Collection

    return {
      gallery: O<State>({
        collectionId: resource.id,
        resources: collection.members,
        prevPage: getPage(collection, 'previous'),
        nextPage: getPage(collection, 'next'),
      }),
    }
  },
)

export const acceptors = [replaceGallery]
