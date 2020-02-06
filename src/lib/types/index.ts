import { Hydra } from 'alcaeus'
import * as SourceMixin from './Source'
import * as ImageMixin from './Image'
import * as LanguageMixin from './Language'

const rdf = Hydra.mediaTypeProcessors.RDF as any

rdf.resourceFactory.mixins.push(SourceMixin)
rdf.resourceFactory.mixins.push(ImageMixin)
rdf.resourceFactory.mixins.push(LanguageMixin)
