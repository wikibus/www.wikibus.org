import { css, customElement, LitElement, property, unsafeCSS, html, query } from 'lit-element'
import go from 'ld-navigation/fireNavigation'
import { IriTemplate, RdfResource } from 'alcaeus'
import clownface, { AnyPointer, GraphPointer } from 'clownface'
import { dataset } from '@rdf-esm/dataset'
import type { ShaperoneForm } from '@hydrofoil/shaperone-wc'
import radioCheckbox from '../css/components/radio-checkbox.css'
import CanvasShellBase from './canvas-shell/CanvasShellBase'
import '../forms/index.ts'
import { hashi } from '../lib/ns'
import './canvas-shell/canvas-button'
import './canvas-form'

const Template: unique symbol = Symbol('Template')

@customElement('url-template-form')
export default class UrlTemplateForm extends CanvasShellBase(LitElement) {
  private [Template]?: IriTemplate

  public static get styles() {
    return [
      super.styles || [],
      css`
        ${unsafeCSS(radioCheckbox)}

        canvas-form {
          padding-left: 15px;
        }
      `,
    ] as any
  }

  @property({ type: Object })
  public template: IriTemplate | undefined

  @property({ type: Object })
  public initial?: RdfResource

  @property({ type: Object })
  public shapes: AnyPointer | undefined

  @query('canvas-form')
  public form?: ShaperoneForm

  public resource?: GraphPointer

  protected render(): unknown {
    return html`
      <canvas-form
        .shapes="${this.shapes}"
        .resource="${this.resource}"
        no-editor-switches
      ></canvas-form>
      <canvas-button @click="${this.submit}">Filter</canvas-button>
    `
  }

  protected async updated(_changedProperties: Map<PropertyKey, unknown>) {
    if (_changedProperties.has('template')) {
      const shape = this.template?.get(hashi.shape)
      if (shape?.load) {
        const { representation } = await shape.load()
        if (representation?.root) {
          this.shapes = representation.root.pointer
          this.resource = this.initial?.pointer || clownface({ dataset: dataset() }).namedNode('')
        }
      }
    }
  }

  public submit() {
    if (this.template && this.form?.resource) {
      go(this.template.expand(this.form.resource))
    }
  }
}
