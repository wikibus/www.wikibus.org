import { Hydra } from 'alcaeus'
import * as SourceMixin from './Source'
import * as ImageMixin from './Image'

const rdf = Hydra.mediaTypeProcessors.RDF as any

rdf.resourceFactory.mixins.push(SourceMixin)
rdf.resourceFactory.mixins.push(ImageMixin)
