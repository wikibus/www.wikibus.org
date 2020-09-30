import { ViewTemplates } from '@lit-any/views'
import { HydraResource } from 'alcaeus'
import { schema } from '@tpluscode/rdf-ns-builders'
import { html, TemplateResult } from 'lit-html'
import { repeat } from 'lit-html/directives/repeat'
import { unsafeHTML } from 'lit-html/directives/unsafe-html'
import type { ViewParams } from '../index'
import { app, State } from '../../lib/state'
import { cmsParts } from '../scopes'

const cmsScope = 'cms-part'
const cmsScopeLoaded = 'cms-part-loaded'

ViewTemplates.default.when
  .scopeMatches(cmsParts)
  .valueMatches((state: State) => !!state.core.resource)
  .renders((state: State, next) => {
    const parts = state.core.resource!.getArray(schema.hasPart.value)

    return html`
      ${repeat(
        parts,
        part =>
          html`
            ${next(part, cmsScope, { state })}
          `,
      )}
    `
  })

ViewTemplates.default.when
  .scopeMatches(cmsScope)
  .valueMatches((resource: HydraResource) => resource.isAnonymous)
  .valueMatches((r: HydraResource) => r.types.has(schema.HowToStep))
  .renders((step: HydraResource, next, scope) => {
    const stepItems = step.getArray<HydraResource>(schema.itemListElement.value)

    return html`
      ${repeat(stepItems, item => next(item, scope))}
    `
  })

ViewTemplates.default.when
  .scopeMatches(cmsScope)
  .valueMatches((resource: HydraResource) => resource.isAnonymous)
  .valueMatches((r: HydraResource) => r.types.has(schema.HowToDirection))
  .renders((step: HydraResource, next) => {
    let image: string | TemplateResult = ''

    if (step.get(schema.duringMedia)) {
      image = next(step.get(schema.duringMedia))
    }

    return html`
      <h5>${step.getString(schema.name.value)}</h5>
      ${unsafeHTML(step.getString(schema.text.value))} ${image}
    `
  })

ViewTemplates.default.when
  .scopeMatches(cmsScope)
  .valueMatches((resource: HydraResource) => !resource.isAnonymous)
  .renders((value: HydraResource, next, scope, { state }: ViewParams) => {
    let contents: () => TemplateResult | string
    const resourceState = state.resources[value.id.value]
    const load = () => app.then(({ actions }) => actions.loadResource(value))

    if (!resourceState) {
      load()
      contents = () => ''
    } else if (resourceState.isLoading) {
      contents = () =>
        html`
          <div class="container clearfix">Loading</div>
        `
    } else if ('value' in resourceState) {
      contents = () => next(resourceState.value, cmsScopeLoaded)
    } else {
      contents = () =>
        html`
          <div class="container clearfix">
            Loading failed <a href="javascript:void(0)" @click="${load}">Try again</a>
          </div>
        `
    }

    return html`
      <div class="container clearfix">${contents()}</div>
    `
  })

ViewTemplates.default.when
  .scopeMatches(cmsScopeLoaded)
  .valueMatches((resource: HydraResource) => resource && resource.types.has(schema.HowTo))
  .renders((resource: HydraResource, next) => {
    import('../../components/canvas-shell/canvas-progress-steps')

    const steps = resource
      .getArray<HydraResource>(schema.step.value)
      .sort(
        (left, right) =>
          (left.getNumber(schema.position.value) || 0) -
          (right.getNumber(schema.position.value) || 0),
      )
      .map((step, i) => ({
        heading: step.getString(schema.name.value),
        content: () =>
          html`
            <div slot="step-${i}">${next(step, cmsScope)}</div>
          `,
      }))

    return html`
      <div class="heading-block center">
        <h2>${resource.getString(schema.name.value)}</h2>
      </div>

      <canvas-progress-steps .steps="${steps}">
        ${repeat(steps, step => step.content())}
      </canvas-progress-steps>
    `
  })
