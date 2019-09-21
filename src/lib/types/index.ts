import { Hydra } from 'alcaeus'
import * as BookMixin from './Book'
import * as ImageMixin from './Image'

const rdf = Hydra.mediaTypeProcessors.RDF as any

rdf.resourceFactory.mixins.push(BookMixin)
rdf.resourceFactory.mixins.push(ImageMixin)
