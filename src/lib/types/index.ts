import { Hydra } from 'alcaeus/web'
import { ImageObjectBundle } from '@rdfine/schema/bundles/ImageObject'
import { PersonBundle } from '@rdfine/schema/bundles/Person'
import { SourceMixin } from './Source'
import { LanguageMixin } from './Language'

Hydra.resources.factory.addMixin(SourceMixin, ...ImageObjectBundle, LanguageMixin, ...PersonBundle)
