import { LitView } from '@lit-any/views'
import { customElement } from 'lit-element'
import CanvasShellBase from './CanvasShellBase'

@customElement('canvas-view')
export class CanvasView extends CanvasShellBase(LitView) {}
