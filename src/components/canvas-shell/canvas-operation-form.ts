import AlcaeusForm from '@hydrofoil/alcaeus-forms/alcaeus-form'
import { customElement } from 'lit-element'
import CanvasShellBase from './CanvasShellBase'

@customElement('canvas-operation-form')
export class CanvasOperationForm extends CanvasShellBase(AlcaeusForm) {}
