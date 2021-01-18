import { css, customElement, unsafeCSS } from 'lit-element'
import { ShaperoneForm } from '@hydrofoil/shaperone-wc/ShaperoneForm'
import { components, renderer } from '@hydrofoil/shaperone-wc/configure'
import { DefaultStrategy } from '@hydrofoil/shaperone-wc/renderer/DefaultStrategy'
import { html } from 'lit-html'
import radioCheckbox from '../css/components/radio-checkbox.css'
import CanvasShellBase from './canvas-shell/CanvasShellBase'
import * as Material from '../forms/ShaperoneComponents'
import { PlusCircle } from './icons'

renderer.setStrategy({
  ...DefaultStrategy,
  property: ({ property, renderObject, actions: { addObject } }) => html`<div class="field">
    <label> ${property.name} </label>
    ${property.objects.map(renderObject)}
    ${property.canAdd
      ? html`<canvas-button mini style="display: block;" @click="${addObject}" .icon="${PlusCircle}"
          >Add value...</canvas-button
        >`
      : ''}
  </div>`,
})
components.pushComponents(Material)

@customElement('canvas-form')
export class CanvasForm extends CanvasShellBase(ShaperoneForm) {
  public static get styles() {
    return [
      css`
        ${super.styles as any}
        ${unsafeCSS(radioCheckbox)}

        :host {
          margin-left: -16px;
          margin-right: -16px;
          display: block;
        }
      `,
    ]
  }
}
