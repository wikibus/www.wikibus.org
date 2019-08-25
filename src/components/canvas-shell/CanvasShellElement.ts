import { LitElement } from 'lit-element'

export class CanvasShellElement extends LitElement {
  private _$: JQueryStatic | null = null

  protected get $(): JQueryStatic {
    if (!this._$) {
      throw new Error('jQuery not initialized')
    }

    return this._$
  }

  public connectedCallback(): void {
    super.connectedCallback()

    const init = {
      $: null,
    }

    this.dispatchEvent(new CustomEvent('canvas-functions-init', {
      composed: true,
      detail: init,
    }))

    this._$ = init.$
  }
}
