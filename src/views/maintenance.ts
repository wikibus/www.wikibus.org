import { html } from 'lit-html'
import { AlertTriangle, Share2, Clock, CornerRightDown } from '../components/icons'

const size = 90

export const template = html`
  <section id="content">
    <div class="content-wrap">
      <div class="container clearfix">
        <div class="heading-block center nobottomborder">
          <h1>Content unavailable</h1>
          <span>Please check back in sometime.</span>
        </div>

        <div class="col_one_third topmargin">
          <div class="feature-box fbox-center fbox-light fbox-plain">
            <div class="fbox-icon">
              ${AlertTriangle(size)}
            </div>
            <h3>Why am I seeing this?</h3>
            <p>It takes a lot of effort to build this site.</p>
          </div>
        </div>

        <div class="col_one_third topmargin">
          <div class="feature-box fbox-center fbox-light fbox-plain">
            <div class="fbox-icon">
              ${Clock(size)}
            </div>
            <h3>How long will it take?</h3>
            <p>Hard to tell. I'm working hard.</p>
          </div>
        </div>

        <div class="col_one_third topmargin col_last">
          <div class="feature-box fbox-center fbox-light fbox-plain">
            <div class="fbox-icon">
              ${Share2(size)}
            </div>
            <h3>What can I do now?</h3>
            <p>In the mean time check our social links below ${CornerRightDown()}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
`
