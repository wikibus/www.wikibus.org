/* eslint-disable */
import { css, customElement, html, LitElement, property, query } from 'lit-element'
import { IronDropdownElement } from '@polymer/iron-dropdown/iron-dropdown.js'
import '@polymer/iron-dropdown/iron-dropdown.js'
import CanvasShellBase from './CanvasShellBase'

@customElement('canvas-dropdown')
export class CanvasDropdown extends CanvasShellBase(LitElement) {
  @query('iron-dropdown')
  private dropdown?: IronDropdownElement

  @property({ type: Boolean })
  public disabled = false

  public static get styles() {
    return [
      super.styles || [],
      css`
        :host {
          display: inline-block;
        }
      `,
    ]
  }

  public render() {
    return html`
      <a
        href="javascript:void(0)"
        @click="${this.__open}"
        class="btn btn-secondary btn-sm dropdown-toggle"
        aria-haspopup="true"
        aria-expanded="true"
      >
        <slot name="toggle"></slot>
      </a>
      <div>
        <iron-dropdown horizontal-align="right" vertical-align="top" allow-outside-scroll>
          <ul class="list-group" aria-labelledby="dropdownMenu1" slot="dropdown-content">
            <slot></slot>
          </ul>
        </iron-dropdown>
      </div>
    `
  }

  private __open() {
    if (!this.disabled) {
      this.dropdown!.toggle()
    }
  }
}
