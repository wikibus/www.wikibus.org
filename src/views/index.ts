import './debug.ts'
import './entrypoint/index.ts'
import './portfolio-gallery/index.ts'
import './portfolio/index.ts'
import './page-title/index.ts'
import './fallback.ts'
import './profile-menu.ts'
import './operation'
import './library/media-type-icons'
import './collectionTable'
import './cms'
import type { State } from '../lib/state'

export interface ViewParams {
  state: State
}
