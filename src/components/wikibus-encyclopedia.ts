import { LitElement, html } from 'lit-element'
import './canvas-shell/index.ts'

export default class WikibusEncyclopedia extends LitElement {
  protected createRenderRoot() {
    return this
  }

  protected render() {
    return html`
      <canvas-shell>
        <div class="content-wrap">
          <div class="container clearfix">
            <div class="row clearfix">
              <div class="col-xl-5">
                <div class="heading-block topmargin">
                  <h1>Welcome to Canvas.<br />MultiPurpose Template.</h1>
                </div>
                <p class="lead">
                  Create a website that you are gonna be proud of. Be it Business, Portfolio,
                  Agency, Photography, eCommerce &amp; much more.
                </p>
              </div>

              <div class="col-xl-7"></div>
            </div>
          </div>
        </div>
      </canvas-shell>
    `
  }
}

customElements.define('wikibus-encyclopedia', WikibusEncyclopedia)
