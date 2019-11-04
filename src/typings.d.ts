declare module '*.scss'
declare module '*.css'
declare module 'feather-icon-literals'
declare module '@lit-element-bootstrap/alert'
declare module '@lit-element-bootstrap/modal'
declare module '@lit-element-bootstrap/button'
declare module '@lit-element-bootstrap/dropdown'
declare module '@lit-element-bootstrap/button/bs-button-mixin.js' {
  import { LitElement } from 'lit-element'

  interface DropdownButton {
    dropdownToggle: boolean
  }

  type Constructor = new (...args: any[]) => LitElement
  type ReturnConstructor = new (...args: any[]) => LitElement & DropdownButton
  export function BsButtonMixin<B extends Constructor>(Base: B): B & ReturnConstructor
}
