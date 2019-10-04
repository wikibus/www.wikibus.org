// @ts-ignore
import * as icons from 'feather-icon-literals'
import { html, TemplateResult } from 'lit-element'

icons.setCustomTemplateLiteralTag(html)

export type IconFunction = (size?: number) => TemplateResult

function wrap(featherIcon: Function): IconFunction {
  return (size?: number) => featherIcon({ width: size, height: size })
}

export const Menu = wrap(icons.Menu)
export const Search = wrap(icons.Search)
export const ChevronUp = wrap(icons.ChevronUp)
export const Facebook = wrap(icons.Facebook)
export const Twitter = wrap(icons.Twitter)
export const GitHub = wrap(icons.GitHub)
export const Linkedin = wrap(icons.Linkedin)
export const BookOpen = wrap(icons.BookOpen)
export const Pinterest = wrap(icons.Instagram)
export const Box = wrap(icons.Box)
export const FileText = wrap(icons.FileText)
export const Layers = wrap(icons.Layers)
export const MoreHorizontal = wrap(icons.MoreHorizontal)
export const ZoomIn = wrap(icons.ZoomIn)
export const AlertTriangle = wrap(icons.AlertTriangle)
export const Share2 = wrap(icons.Share2)
export const Clock = wrap(icons.Clock)
export const CornerRightDown = wrap(icons.CornerRightDown)
