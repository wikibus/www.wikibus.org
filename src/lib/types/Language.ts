import { HydraResource } from 'alcaeus/types/Resources'
import codes from 'iso-639-1'
import { langIso } from '../ns'

type Constructor<T = {}> = new (...args: any[]) => HydraResource

export function Mixin<B extends Constructor>(Base: B) {
  return class extends Base {
    get name() {
      const matches = this.id.match(/\/([^/]+)$/)
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

export const shouldApply = (r: HydraResource) => r.id.startsWith(langIso().value)
