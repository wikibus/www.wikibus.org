import { LitElement, html, query } from 'lit-element'
import './wikibus-shell.ts'
import { WikibusShell } from './wikibus-shell'
import './views'

export default class WikibusEncyclopedia extends LitElement {
  @query('#shell')
  private __shell: WikibusShell | null = null

  protected firstUpdated() {
    if (this.__shell) {
      this.__shell.model = {
        menu: {
          Library: process.env.API_LIBRARY,
        },
      }
    }
  }

  protected createRenderRoot() {
    return this
  }

  protected render() {
    return html`
      <wikibus-shell id="shell">
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
      </wikibus-shell>
    `
  }
}

customElements.define('wikibus-encyclopedia', WikibusEncyclopedia)
