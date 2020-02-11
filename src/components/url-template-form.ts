import { customElement, property } from 'lit-element'
import go from 'ld-navigation/fireNavigation'
import LitForm from '@lit-any/forms/lit-form'
import CanvasShellBase from './canvas-shell/CanvasShellBase'
import '../forms/index.ts'

const decorator = {
  unwrap: (v: any) => {
    let value = v
    if (typeof v === 'object' && v !== null) {
      value = v['@value']
    }

    return value || ''
  },
  wrap: (formValue: string) => ({
    '@value': formValue,
  }),
}

@customElement('url-template-form')
export default class UrlTemplateForm extends CanvasShellBase(LitForm) {
  @property({ type: Object })
  public template: any

  public constructor() {
    super()

    this.noResetButton = true
    this.submitButtonLabel = 'Filter'
    this.addEventListener('submit', this.submit.bind(this))
  }

  protected updated(_changedProperties: Map<PropertyKey, unknown>): void {
    if (_changedProperties.has('template')) {
      this.contract = {
        fields: this.template.mappings.map((f: any) => ({
          property: f.property.id,
          title: f.property.title || f.variable,
          type: f.property.range,
          valueDecorator: decorator,
        })),
      } as any
    }
  }

  public submit() {
    go(this.template.expand(this.value))
  }
}
