import { ShaperoneForm } from '@hydrofoil/shaperone-wc/ShaperoneForm'
import { css, customElement, html } from 'lit-element'
import { RuntimeOperation } from 'alcaeus'
import { sh } from '@tpluscode/rdf-ns-builders'
import clownface from 'clownface'
import $rdf from '@rdf-esm/dataset'
import CanvasShellBase from './CanvasShellBase'

const Operation: unique symbol = Symbol('Operation')

@customElement('canvas-operation-form')
export class CanvasOperationForm extends CanvasShellBase(ShaperoneForm) {
  [Operation]: RuntimeOperation | undefined

  static get styles() {
    return [
      css`
        ${super.styles as any}
        :host {
          width: 500px;
          display: block;
        }

        button {
          position: sticky;
          bottom: 0px;
        }
      `,
    ]
  }

  async connectedCallback() {
    await super.connectedCallback()
    if (this.operation) {
      this.__loadShape(this.operation)
    }
  }

  get operation(): RuntimeOperation | undefined {
    return this[Operation]
  }

  set operation(value: RuntimeOperation | undefined) {
    this[Operation] = value

    if (value) {
      this.__loadShape(value)
    }
  }

  render() {
    return html`
      <div></div>
      ${super.render()}
      <div>
        <canvas-button label="Submit"></canvas-button>
      </div>
    `
  }

  async __loadShape(operation: RuntimeOperation) {
    const shape = operation.expects.find(ex => ex.types.has(sh.NodeShape))
    if (shape?.load) {
      const { representation } = await shape.load()
      this.shapes = representation?.root?.pointer
      this.resource = clownface({ dataset: $rdf.dataset() }).node(operation.target.id)
    }
  }
}
