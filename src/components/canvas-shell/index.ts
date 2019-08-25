import { HydrofoilShell } from '@hydrofoil/hydrofoil-shell/hydrofoil-shell'
import { css, html, unsafeCSS, property } from 'lit-element'
import style from '../../style.scss'
import dark from '../../sass/dark.scss'
import bootstrap from '../../css/bootstrap.css'
import rs from '../../sass/responsive.scss'
import icons from '../../css/font-icons.css'
import './canvas-gototop.ts'

export class CanvasShell extends HydrofoilShell {
  @property({ type: Boolean })
  public topSearchOpen = false

  @property({ type: Boolean })
  public primaryMenuOpen = false

  public static get styles() {
    return css`${unsafeCSS(bootstrap)} ${unsafeCSS(style)} ${unsafeCSS(dark)} ${unsafeCSS(icons)} ${unsafeCSS(rs)}`
  }

  public connectedCallback() {
    super.connectedCallback()
    const bodyObserverConfig = { attributes: true, childList: false, subtree: false }
    const observer = new MutationObserver((list) => {
      const classMutations = list.filter(m => m.type === 'attributes' && m.attributeName === 'class')

      classMutations.forEach((mutation) => {
        const body = mutation.target as Element
        this.topSearchOpen = body.classList.contains('top-search-open')
        this.primaryMenuOpen = body.classList.contains('primary-menu-open')
      })
    })

    observer.observe(document.body, bodyObserverConfig)
  }

  protected firstUpdated() {
    this.dispatchEvent(new CustomEvent('canvas-functions-init', {
      composed: true,
      detail: {
        header: this.renderRoot.querySelector('#header'),
        headerWrap: this.renderRoot.querySelector('#header-wrap'),
        topSearch: this.renderRoot.querySelector('#top-search'),
        topSearchTrigger: this.renderRoot.querySelector('#top-search-trigger'),
        primaryMenu: this.renderRoot.querySelector('#primary-menu'),
        primaryMenuTrigger: this.renderRoot.querySelector('#primary-menu-trigger'),
      },
    }))
  }

  protected render() {
    return html` <!-- Header
        ============================================= -->
        <header id="header" ?search-open="${this.topSearchOpen}" ?primary-menu-open="${this.primaryMenuOpen}">

            <div id="header-wrap">

                <div class="container clearfix">

                    <div id="primary-menu-trigger"><i class="icon-reorder"></i></div>

                    <!-- Logo
                    ============================================= -->
                    <div id="logo">
                        <a href="index.html" class="standard-logo" data-dark-logo="images/logo-dark.png"><img src="images/logo.png" alt="Canvas Logo"></a>
                        <a href="index.html" class="retina-logo" data-dark-logo="images/logo-dark@2x.png"><img src="images/logo@2x.png" alt="Canvas Logo"></a>
                    </div><!-- #logo end -->

                    <!-- Primary Navigation
                    ============================================= -->
                    <nav id="primary-menu">

                        <ul>
                            <li><a href="index.html"><div>Home</div></a>
                            </li>
                            <li class="current"><a href="#"><div>Features</div></a>
                            </li>
                            <li class="mega-menu"><a href="#"><div>Pages</div></a>
                            </li>
                            <li class="mega-menu"><a href="#"><div>Portfolio</div></a>
                            </li>
                            <li class="mega-menu"><a href="#"><div>Blog</div></a>
                            </li>
                            <li><a href="shop.html"><div>Shop</div></a>
                            </li>
                            <li class="mega-menu"><a href="#"><div>Shortcodes</div></a>
                            </li>
                        </ul>

                        <!-- Top Search
                        ============================================= -->
                        <div id="top-search">
                            <a href="#" id="top-search-trigger"><i class="icon-search3"></i><i class="icon-line-cross"></i></a>
                            <form action="search.html" method="get">
                                <input type="text" name="q" class="form-control" value="" placeholder="Type &amp; Hit Enter..">
                            </form>
                        </div><!-- #top-search end -->

                    </nav><!-- #primary-menu end -->

                </div>

            </div>

        </header><!-- #header end -->

        <!-- Content
        ============================================= -->
        <section id="content">

            <div class="content-wrap">

                <div class="container clearfix">
                    <div class="row clearfix">

                        <div class="col-xl-5">
                            <div class="heading-block topmargin">
                                <h1>Welcome to Canvas.<br>MultiPurpose Template.</h1>
                            </div>
                            <p class="lead">Create a website that you are gonna be proud of. Be it Business, Portfolio, Agency, Photography, eCommerce &amp; much more.</p>
                        </div>

                        <div class="col-xl-7">

                            <div style="position: relative; margin-bottom: -60px;" class="ohidden" data-height-xl="426" data-height-lg="567" data-height-md="470" data-height-md="287" data-height-xs="183">
                                <img src="images/services/main-fbrowser.png" style="position: absolute; top: 0; left: 0;" data-animate="fadeInUp" data-delay="100" alt="Chrome">
                                <img src="images/services/main-fmobile.png" style="position: absolute; top: 0; left: 0;" data-animate="fadeInUp" data-delay="400" alt="iPad">
                            </div>

                        </div>

                    </div>
                </div>
            </div><div class="container clearfix">
                    <div class="row clearfix">

                        <div class="col-xl-5">
                            <div class="heading-block topmargin">
                                <h1>Welcome to Canvas.<br>MultiPurpose Template.</h1>
                            </div>
                            <p class="lead">Create a website that you are gonna be proud of. Be it Business, Portfolio, Agency, Photography, eCommerce &amp; much more.</p>
                        </div>

                        <div class="col-xl-7">

                            <div style="position: relative; margin-bottom: -60px;" class="ohidden" data-height-xl="426" data-height-lg="567" data-height-md="470" data-height-md="287" data-height-xs="183">
                                <img src="images/services/main-fbrowser.png" style="position: absolute; top: 0; left: 0;" data-animate="fadeInUp" data-delay="100" alt="Chrome">
                                <img src="images/services/main-fmobile.png" style="position: absolute; top: 0; left: 0;" data-animate="fadeInUp" data-delay="400" alt="iPad">
                            </div>

                        </div>

                    </div>
                </div>
            </div><div class="container clearfix">
                    <div class="row clearfix">

                        <div class="col-xl-5">
                            <div class="heading-block topmargin">
                                <h1>Welcome to Canvas.<br>MultiPurpose Template.</h1>
                            </div>
                            <p class="lead">Create a website that you are gonna be proud of. Be it Business, Portfolio, Agency, Photography, eCommerce &amp; much more.</p>
                        </div>

                        <div class="col-xl-7">

                            <div style="position: relative; margin-bottom: -60px;" class="ohidden" data-height-xl="426" data-height-lg="567" data-height-md="470" data-height-md="287" data-height-xs="183">
                                <img src="images/services/main-fbrowser.png" style="position: absolute; top: 0; left: 0;" data-animate="fadeInUp" data-delay="100" alt="Chrome">
                                <img src="images/services/main-fmobile.png" style="position: absolute; top: 0; left: 0;" data-animate="fadeInUp" data-delay="400" alt="iPad">
                            </div>

                        </div>

                    </div>
                </div>
            </div><div class="container clearfix">
                    <div class="row clearfix">

                        <div class="col-xl-5">
                            <div class="heading-block topmargin">
                                <h1>Welcome to Canvas.<br>MultiPurpose Template.</h1>
                            </div>
                            <p class="lead">Create a website that you are gonna be proud of. Be it Business, Portfolio, Agency, Photography, eCommerce &amp; much more.</p>
                        </div>

                        <div class="col-xl-7">

                            <div style="position: relative; margin-bottom: -60px;" class="ohidden" data-height-xl="426" data-height-lg="567" data-height-md="470" data-height-md="287" data-height-xs="183">
                                <img src="images/services/main-fbrowser.png" style="position: absolute; top: 0; left: 0;" data-animate="fadeInUp" data-delay="100" alt="Chrome">
                                <img src="images/services/main-fmobile.png" style="position: absolute; top: 0; left: 0;" data-animate="fadeInUp" data-delay="400" alt="iPad">
                            </div>

                        </div>

                    </div>
                </div>
            </div><div class="container clearfix">
                    <div class="row clearfix">

                        <div class="col-xl-5">
                            <div class="heading-block topmargin">
                                <h1>Welcome to Canvas.<br>MultiPurpose Template.</h1>
                            </div>
                            <p class="lead">Create a website that you are gonna be proud of. Be it Business, Portfolio, Agency, Photography, eCommerce &amp; much more.</p>
                        </div>

                        <div class="col-xl-7">

                            <div style="position: relative; margin-bottom: -60px;" class="ohidden" data-height-xl="426" data-height-lg="567" data-height-md="470" data-height-md="287" data-height-xs="183">
                                <img src="images/services/main-fbrowser.png" style="position: absolute; top: 0; left: 0;" data-animate="fadeInUp" data-delay="100" alt="Chrome">
                                <img src="images/services/main-fmobile.png" style="position: absolute; top: 0; left: 0;" data-animate="fadeInUp" data-delay="400" alt="iPad">
                            </div>

                        </div>

                    </div>
                </div>
            </div>

        </section><!-- #content end --><!-- Footer
        ============================================= -->
        <footer id="footer" class="dark">

            <!-- Copyrights
            ============================================= -->
            <div id="copyrights">

                <div class="container clearfix">

                    <div class="col_half">
                        <img src="images/footer-logo.png" alt="" class="footer-logo">

                        Copyrights &copy; 2014 All Rights Reserved by Canvas Inc.
                    </div>

                    <div class="col_half col_last tright">
                        <div class="copyrights-menu copyright-links fright clearfix">
                            <a href="#">Home</a>/<a href="#">About</a>/<a href="#">Features</a>/<a href="#">Portfolio</a>/<a href="#">FAQs</a>/<a href="#">Contact</a>
                        </div>
                        <div class="fright clearfix">
                            <a href="#" class="social-icon si-small si-borderless nobottommargin si-facebook">
                                <i class="icon-facebook"></i>
                                <i class="icon-facebook"></i>
                            </a>

                            <a href="#" class="social-icon si-small si-borderless nobottommargin si-twitter">
                                <i class="icon-twitter"></i>
                                <i class="icon-twitter"></i>
                            </a>

                            <a href="#" class="social-icon si-small si-borderless nobottommargin si-gplus">
                                <i class="icon-gplus"></i>
                                <i class="icon-gplus"></i>
                            </a>

                            <a href="#" class="social-icon si-small si-borderless nobottommargin si-pinterest">
                                <i class="icon-pinterest"></i>
                                <i class="icon-pinterest"></i>
                            </a>

                            <a href="#" class="social-icon si-small si-borderless nobottommargin si-vimeo">
                                <i class="icon-vimeo"></i>
                                <i class="icon-vimeo"></i>
                            </a>

                            <a href="#" class="social-icon si-small si-borderless nobottommargin si-github">
                                <i class="icon-github"></i>
                                <i class="icon-github"></i>
                            </a>

                            <a href="#" class="social-icon si-small si-borderless nobottommargin si-yahoo">
                                <i class="icon-yahoo"></i>
                                <i class="icon-yahoo"></i>
                            </a>

                            <a href="#" class="social-icon si-small si-borderless nobottommargin si-linkedin">
                                <i class="icon-linkedin"></i>
                                <i class="icon-linkedin"></i>
                            </a>
                        </div>
                    </div>

                </div>

            </div><!-- #copyrights end -->

        </footer><!-- #footer end -->

    <!-- Go To Top
    ============================================= -->
    <canvas-gototop></canvas-gototop>
    `
  }
}

customElements.define('canvas-shell', CanvasShell)
