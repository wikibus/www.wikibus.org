import O from 'patchinko/immutable'
import { expand } from '@zazuko/rdf-vocabularies'
import { Collection } from 'alcaeus/types/Resources'
import { onChange } from '../index'
import { getPage } from './helpers'

const replaceGallery = onChange(
  state => state.core.resource,
  state => {
    const { resource } = state.core
    if (!resource || !resource.types.includes(expand('hydra:Collection'))) return {}

    return {
      gallery: O({
        collectionId: resource.id,
        resources: resource.members,
        prevPage: getPage(resource as Collection, 'previous'),
        nextPage: getPage(resource as Collection, 'next'),
      }),
    }
  },
)

export const acceptors = [replaceGallery]
