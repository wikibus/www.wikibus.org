import { html, LitElement, property, css } from 'lit-element'
import CanvasShellBase from './CanvasShellBase'

export class CanvasSidebarSection extends CanvasShellBase(LitElement) {
  public static get styles() {
    return [
      super.styles || [],
      css`:host {
        display: block
      `,
    ]
  }

  @property({ type: String })
  heading = ''

  render() {
    return html`
      <div class="fancy-title title-bottom-border">
        <h2>${this.heading}</h2>
      </div>
      <slot></slot>
    `
  }
}

customElements.define('canvas-sidebar-section', CanvasSidebarSection)
