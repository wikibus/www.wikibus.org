import { customElement, html, LitElement } from 'lit-element'
import CanvasShellBase from './CanvasShellBase'

@customElement('canvas-footer')
export class CanvasFooter extends CanvasShellBase(LitElement) {
  public render() {
    return html`
      <!-- Footer
      ============================================= -->
      <footer id="footer" class="dark">
        <!-- Copyrights
        ============================================= -->
        <div id="copyrights">
          <div class="container clearfix">
            <div class="col_half">
              <img src="/images/footer-logo.png" alt="" class="footer-logo" />

              Copyrights &copy; 2019 Some Rights Reserved.
            </div>

            <div class="col_half col_last tright">
              <div class="copyrights-menu copyright-links clearfix">
                <a href="/">Home</a>/<a href="#">About</a>
              </div>
              <div class="fright clearfix">
                <a
                  href="https://www.facebook.com/wikibus"
                  class="social-icon si-small si-borderless nobottommargin si-facebook"
                >
                  <i class="icon-facebook"></i>
                  <i class="icon-facebook"></i>
                </a>

                <a
                  href="https://twitter.com/WikibusOrg"
                  class="social-icon si-small si-borderless nobottommargin si-twitter"
                >
                  <i class="icon-twitter"></i>
                  <i class="icon-twitter"></i>
                </a>

                <a
                  href="https://github.com/wikibus"
                  class="social-icon si-small si-borderless nobottommargin si-github"
                >
                  <i class="icon-github"></i>
                  <i class="icon-github"></i>
                </a>

                <a
                  href="https://www.linkedin.com/in/tpluskiewicz/"
                  class="social-icon si-small si-borderless nobottommargin si-linkedin"
                >
                  <i class="icon-linkedin"></i>
                  <i class="icon-linkedin"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <!-- #copyrights end -->
      </footer>
      <!-- #footer end -->
    `
  }
}
