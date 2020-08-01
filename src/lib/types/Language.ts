import codes from 'iso-639-1'
import { Constructor, RdfResource } from '@tpluscode/rdfine'
import { langIso } from '../ns'

export function LanguageMixin<B extends Constructor>(Base: B) {
  return class extends Base {
    get name() {
      const matches = this.id.value.match(/\/([^/]+)$/)
      if (!matches) {
        return this.id
      }

      return codes.getNativeName(matches[1])
    }

    toString() {
      return this.name
    }
  }
}

LanguageMixin.shouldApply = (r: RdfResource) => r.id.value.startsWith(langIso().value)
