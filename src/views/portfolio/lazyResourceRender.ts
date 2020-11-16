import { html, TemplateResult } from 'lit-html'
import { RdfResource, Resource } from 'alcaeus'
import { app, State } from '../../lib/state'
import { portfolioProperty } from '../scopes'

interface LazyRendererParams {
  next: any
  wrapLoading?: (contents: TemplateResult | string) => TemplateResult
  wrapLoaded?: (contents: TemplateResult | string) => TemplateResult
  wrapFailed?: (contents: TemplateResult | string) => TemplateResult
}

function noWrap(c: TemplateResult | string) {
  return html`${c}`
}

export function lazyResourceRender(value: RdfResource, state: State): (params: LazyRendererParams) => TemplateResult | string {
  const resourceState = state.resources[value.id.value]
  const load = () => app.then(({ actions }) => actions.loadResource(value))

  if (!resourceState) {
    load()
    return () => ''
  }

  if (resourceState.isLoading) {
    return ({ wrapLoading = noWrap }) =>
      html`
          ${wrapLoading('Loading')}
        `
  }

  if ('value' in resourceState) {
    return ({ wrapLoaded = noWrap, next }) => html`${wrapLoaded(next(resourceState, portfolioProperty, { state }))}`
  }

  return ({ wrapFailed = noWrap }) =>
    html`
      ${wrapFailed(html`Loading failed <a href="javascript:void(0)" @click="${load}">Try again</a>`)}
    `
}
