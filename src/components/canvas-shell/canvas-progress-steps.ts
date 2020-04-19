import { html, LitElement, property } from 'lit-element'
import { repeat } from 'lit-html/directives/repeat'
import { classMap } from 'lit-html/directives/class-map'
import CanvasShellBase from './CanvasShellBase'

interface Step {
  heading: string
}

export class CanvasProgressSteps extends CanvasShellBase(LitElement) {
  @property({ type: Number })
  public active = 0

  @property()
  public steps: Step[] = []

  render() {
    return html`
      <ul class="process-steps process-${this.steps.length} bottommargin clearfix">
        ${repeat(this.steps, this.renderStep.bind(this))}
      </ul>
      <slot name="step-${this.active}"></slot>
    `
  }

  private renderStep(step: Step, index: number) {
    const active = this.active === index
    const liClasses = { active }
    const aClasses = {
      divcenter: true,
      'i-rounded': true,
      'i-bordered': !active,
      bgcolor: active,
      'i-alt': active,
    }

    return html`
      <li class="${classMap(liClasses)}">
        <a
          href="javascript:void(0)"
          class="${classMap(aClasses)}"
          @click="${() => {
            this.active = index
          }}"
          >${index + 1}</a
        >
        <h5>${step.heading}</h5>
      </li>
    `
  }
}

customElements.define('canvas-progress-steps', CanvasProgressSteps)
