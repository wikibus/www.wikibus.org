/* eslint-disable */
import { css, customElement, html, LitElement, query } from 'lit-element'
import { IronDropdownElement } from '@polymer/iron-dropdown/iron-dropdown.js'
import '@polymer/iron-dropdown/iron-dropdown.js'
import CanvasShellBase from './CanvasShellBase'

@customElement('canvas-dropdown')
export class CanvasDropdown extends CanvasShellBase(LitElement) {
  @query('iron-dropdown')
  private dropdown?: IronDropdownElement

  public static get styles() {
    return [
      super.styles || [],
      css`
        :host {
          display: inline-block;
        }

        ul {
          position: relative;
          top: 32px;
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
      <iron-dropdown horizontal-align="right" vertical-align="top" allow-outside-scroll>
        <ul class="list-group" aria-labelledby="dropdownMenu1" slot="dropdown-content">
          <slot></slot>
        </ul>
      </iron-dropdown>
    `
  }

  private __open() {
    this.dropdown!.open()
  }
}
