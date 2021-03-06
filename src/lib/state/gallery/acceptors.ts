import O from 'patchinko/immutable'
import { hydra } from '@tpluscode/rdf-ns-builders'
import { Collection } from 'alcaeus'
import { onChange } from '../onChange'
import { getPage } from './helpers'
import { Gallery } from './State'

const replaceGallery = onChange(
  state => state.core.resource,
  state => {
    const { resource } = state.core
    if (!resource || !resource.types.has(hydra.Collection)) return {}
    const collection = resource as Collection

    return {
      gallery: O<Gallery>({
        collectionId: resource.id,
        resources: collection.member,
        prevPage: getPage(collection, 'previous'),
        nextPage: getPage(collection, 'next'),
      }),
    }
  },
)

export const acceptors = [replaceGallery]
