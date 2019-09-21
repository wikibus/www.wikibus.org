// @ts-ignore
import * as icons from 'feather-icon-literals'
import { html } from 'lit-element'

icons.setCustomTemplateLiteralTag(html)

function wrap(featherIcon: Function) {
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
