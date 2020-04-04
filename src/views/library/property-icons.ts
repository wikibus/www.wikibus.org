import { ViewTemplates } from '@lit-any/views'
import { SupportedProperty } from 'alcaeus/types/Resources'
import { html } from 'lit-html'
import { RenderFunc } from '@lit-any/views/lib'
import { supportedProperty } from '../matchers'
import { BookOpen, Box, FileText, Layers, IconFunction, ShoppingCart } from '../../components/icons'
import { wba } from '../../lib/ns'

export const propertyIcon = 'property-icon'
const defaultSize = 50

interface IconOptions {
  size?: number
}

function renderIcon(icon: IconFunction): RenderFunc {
  return (sp: SupportedProperty, next, scope, props: IconOptions) =>
    html`
      ${icon(props.size || defaultSize)}
    `
}

ViewTemplates.default.when
  .scopeMatches(propertyIcon)
  .valueMatches(supportedProperty(wba.books))
  .renders(renderIcon(BookOpen))

ViewTemplates.default.when
  .scopeMatches(propertyIcon)
  .valueMatches(supportedProperty(wba.brochures))
  .renders(renderIcon(FileText))

ViewTemplates.default.when
  .scopeMatches(propertyIcon)
  .valueMatches(supportedProperty(wba.magazines))
  .renders(renderIcon(Layers))

ViewTemplates.default.when
  .scopeMatches(propertyIcon)
  .valueMatches(supportedProperty(wba.library))
  .renders(renderIcon(BookOpen))

ViewTemplates.default.when
  .scopeMatches(propertyIcon)
  .valueMatches(supportedProperty(wba.dataSheets))
  .renders(renderIcon(FileText))

ViewTemplates.default.when
  .scopeMatches(propertyIcon)
  .valueMatches(supportedProperty(wba.wishlist))
  .renders(renderIcon(ShoppingCart))

ViewTemplates.default.when.scopeMatches(propertyIcon).renders(renderIcon(Box))
