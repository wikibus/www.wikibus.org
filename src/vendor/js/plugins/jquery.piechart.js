/** !
 * easy-pie-chart
 * Lightweight plugin to render simple, animated and retina optimized pie charts
 *
 * @license
 * @author Robert Fleischmann <rendro87@gmail.com> (http://robert-fleischmann.de)
 * @version 2.1.7
 **/
!(function (a, b) { typeof define === 'function' && define.amd ? define(['jquery'], (a) => b(a)) : typeof exports === 'object' ? module.exports = b(require('jquery')) : b(jQuery) }(this, (a) => { const b = function (a, b) { let c; const d = document.createElement('canvas'); a.appendChild(d), typeof G_vmlCanvasManager === 'object' && G_vmlCanvasManager.initElement(d); const e = d.getContext('2d'); d.width = d.height = b.size; let f = 1; window.devicePixelRatio > 1 && (f = window.devicePixelRatio, d.style.width = d.style.height = [b.size, 'px'].join(''), d.width = d.height = b.size * f, e.scale(f, f)), e.translate(b.size / 2, b.size / 2), e.rotate((-0.5 + b.rotate / 180) * Math.PI); let g = (b.size - b.lineWidth) / 2; b.scaleColor && b.scaleLength && (g -= b.scaleLength + 2), Date.now = Date.now || function () { return +new Date() }; const h = function (a, b, c) { c = Math.min(Math.max(-1, c || 0), 1); const d = c <= 0 ? !0 : !1; e.beginPath(), e.arc(0, 0, g, 0, 2 * Math.PI * c, d), e.strokeStyle = a, e.lineWidth = b, e.stroke() }; const i = function () { let a, c; e.lineWidth = 1, e.fillStyle = b.scaleColor, e.save(); for (let d = 24; d > 0; --d)d % 6 === 0 ? (c = b.scaleLength, a = 0) : (c = 0.6 * b.scaleLength, a = b.scaleLength - c), e.fillRect(-b.size / 2 + a, 0, c, 1), e.rotate(Math.PI / 12); e.restore() }; const j = (function () { return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (a) { window.setTimeout(a, 1e3 / 60) } }()); const k = function () { b.scaleColor && i(), b.trackColor && h(b.trackColor, b.trackWidth || b.lineWidth, 1) }; this.getCanvas = function () { return d }, this.getCtx = function () { return e }, this.clear = function () { e.clearRect(b.size / -2, b.size / -2, b.size, b.size) }, this.draw = function (a) { b.scaleColor || b.trackColor ? e.getImageData && e.putImageData ? c ? e.putImageData(c, 0, 0) : (k(), c = e.getImageData(0, 0, b.size * f, b.size * f)) : (this.clear(), k()) : this.clear(), e.lineCap = b.lineCap; let d; d = typeof b.barColor === 'function' ? b.barColor(a) : b.barColor, h(d, b.lineWidth, a / 100) }.bind(this), this.animate = function (a, c) { const d = Date.now(); b.onStart(a, c); var e = function () { const f = Math.min(Date.now() - d, b.animate.duration); const g = b.easing(this, f, a, c - a, b.animate.duration); this.draw(g), b.onStep(a, c, g), f >= b.animate.duration ? b.onStop(a, c) : j(e) }.bind(this); j(e) }.bind(this) }; const c = function (a, c) { const d = { barColor: '#ef1e25', trackColor: '#f9f9f9', scaleColor: '#dfe0e0', scaleLength: 5, lineCap: 'round', lineWidth: 3, trackWidth: void 0, size: 110, rotate: 0, animate: { duration: 1e3, enabled: !0 }, easing(a, b, c, d, e) { return b /= e / 2, b < 1 ? d / 2 * b * b + c : -d / 2 * (--b * (b - 2) - 1) + c }, onStart(a, b) {}, onStep(a, b, c) {}, onStop(a, b) {} }; if (typeof b !== 'undefined')d.renderer = b; else { if (typeof SVGRenderer === 'undefined') throw new Error('Please load either the SVG- or the CanvasRenderer'); d.renderer = SVGRenderer } const e = {}; let f = 0; const g = function () { this.el = a, this.options = e; for (const b in d)d.hasOwnProperty(b) && (e[b] = c && typeof c[b] !== 'undefined' ? c[b] : d[b], typeof e[b] === 'function' && (e[b] = e[b].bind(this))); typeof e.easing === 'string' && typeof jQuery !== 'undefined' && jQuery.isFunction(jQuery.easing[e.easing]) ? e.easing = jQuery.easing[e.easing] : e.easing = d.easing, typeof e.animate === 'number' && (e.animate = { duration: e.animate, enabled: !0 }), typeof e.animate !== 'boolean' || e.animate || (e.animate = { duration: 1e3, enabled: e.animate }), this.renderer = new e.renderer(a, e), this.renderer.draw(f), a.dataset && a.dataset.percent ? this.update(parseFloat(a.dataset.percent)) : a.getAttribute && a.getAttribute('data-percent') && this.update(parseFloat(a.getAttribute('data-percent'))) }.bind(this); this.update = function (a) { return a = parseFloat(a), e.animate.enabled ? this.renderer.animate(f, a) : this.renderer.draw(a), f = a, this }.bind(this), this.disableAnimation = function () { return e.animate.enabled = !1, this }, this.enableAnimation = function () { return e.animate.enabled = !0, this }, g() }; a.fn.easyPieChart = function (b) { return this.each(function () { let d; a.data(this, 'easyPieChart') || (d = a.extend({}, b, a(this).data()), a.data(this, 'easyPieChart', new c(this, d))) }) } }))