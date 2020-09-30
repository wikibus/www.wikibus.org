import { ImageObjectBundle } from '@rdfine/schema/bundles/ImageObject'
import { SourceMixin } from './Source'
import { LanguageMixin } from './Language'

export default [SourceMixin, ...ImageObjectBundle, LanguageMixin]
