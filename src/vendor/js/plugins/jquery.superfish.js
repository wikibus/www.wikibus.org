/*
 * jQuery Superfish Menu Plugin - v1.7.10
 * Copyright (c) 2018 Joel Birch
 *
 * Dual licensed under the MIT and GPL licenses:
 *	http://www.opensource.org/licenses/mit-license.php
 *	http://www.gnu.org/licenses/gpl.html
 */
;!(function (a, b) {
  const c = (function () { const c = { bcClass: 'sf-breadcrumb', menuClass: 'sf-js-enabled', anchorClass: 'sf-with-ul', menuArrowClass: 'sf-arrows' }; const d = (function () { const b = /^(?![\w\W]*Windows Phone)[\w\W]*(iPhone|iPad|iPod)/i.test(navigator.userAgent); return b && a('html').css('cursor', 'pointer').on('click', a.noop), b }()); const e = (function () { const a = document.documentElement.style; return 'behavior' in a && 'fill' in a && /iemobile/i.test(navigator.userAgent) }()); const f = (function () { return !!b.PointerEvent }()); const g = function (a, b, d) { let e; let f = c.menuClass; b.cssArrows && (f += ` ${c.menuArrowClass}`), e = d ? 'addClass' : 'removeClass', a[e](f) }; const h = function (b, d) { return b.find(`li.${d.pathClass}`).slice(0, d.pathLevels).addClass(`${d.hoverClass} ${c.bcClass}`).filter(function () { return a(this).children(d.popUpSelector).hide().show().length }).removeClass(d.pathClass) }; const i = function (a, b) { const d = b ? 'addClass' : 'removeClass'; a.children('a')[d](c.anchorClass) }; const j = function (a) { const b = a.css('ms-touch-action'); let c = a.css('touch-action'); c = c || b, c = c === 'pan-y' ? 'auto' : 'pan-y', a.css({ 'ms-touch-action': c, 'touch-action': c }) }; const k = function (a) { return a.closest(`.${c.menuClass}`) }; const l = function (a) { return k(a).data('sfOptions') }; const m = function () { const b = a(this); const c = l(b); clearTimeout(c.sfTimer), b.siblings().superfish('hide').end().superfish('show') }; const n = function (b) { b.retainPath = a.inArray(this[0], b.$path) > -1, this.superfish('hide'), this.parents(`.${b.hoverClass}`).length || (b.onIdle.call(k(this)), b.$path.length && a.proxy(m, b.$path)()) }; const o = function () { const b = a(this); const c = l(b); d ? a.proxy(n, b, c)() : (clearTimeout(c.sfTimer), c.sfTimer = setTimeout(a.proxy(n, b, c), c.delay)) }; const p = function (b) { const c = a(this); const d = l(c); const e = c.siblings(b.data.popUpSelector); return d.onHandleTouch.call(e) === !1 ? this : void (e.length > 0 && e.is(':hidden') && (c.one('click.superfish', !1), b.type === 'MSPointerDown' || b.type === 'pointerdown' ? c.trigger('focus') : a.proxy(m, c.parent('li'))())) }; const q = function (b, c) { const g = `li:has(${c.popUpSelector})`; a.fn.hoverIntent && !c.disableHI ? b.hoverIntent(m, o, g) : b.on('mouseenter.superfish', g, m).on('mouseleave.superfish', g, o); let h = 'MSPointerDown.superfish'; f && (h = 'pointerdown.superfish'), d || (h += ' touchend.superfish'), e && (h += ' mousedown.superfish'), b.on('focusin.superfish', 'li', m).on('focusout.superfish', 'li', o).on(h, 'a', c, p) }; return { hide(b) { if (this.length) { const c = this; const d = l(c); if (!d) return this; const e = d.retainPath === !0 ? d.$path : ''; const f = c.find(`li.${d.hoverClass}`).add(this).not(e).removeClass(d.hoverClass).children(d.popUpSelector); let g = d.speedOut; if (b && (f.show(), g = 0), d.retainPath = !1, d.onBeforeHide.call(f) === !1) return this; f.stop(!0, !0).animate(d.animationOut, g, function () { const b = a(this); d.onHide.call(b) }) } return this }, show() { const a = l(this); if (!a) return this; const b = this.addClass(a.hoverClass); const c = b.children(a.popUpSelector); return a.onBeforeShow.call(c) === !1 ? this : (c.stop(!0, !0).animate(a.animation, a.speed, () => { a.onShow.call(c) }), this) }, destroy() { return this.each(function () { let b; const d = a(this); const e = d.data('sfOptions'); return !!e && (b = d.find(e.popUpSelector).parent('li'), clearTimeout(e.sfTimer), g(d, e), i(b), j(d), d.off('.superfish').off('.hoverIntent'), b.children(e.popUpSelector).attr('style', (a, b) => { if (typeof b !== 'undefined') return b.replace(/display[^;]+;?/g, '') }), e.$path.removeClass(`${e.hoverClass} ${c.bcClass}`).addClass(e.pathClass), d.find(`.${e.hoverClass}`).removeClass(e.hoverClass), e.onDestroy.call(d), void d.removeData('sfOptions')) }) }, init(b) { return this.each(function () { const d = a(this); if (d.data('sfOptions')) return !1; const e = a.extend({}, a.fn.superfish.defaults, b); const f = d.find(e.popUpSelector).parent('li'); e.$path = h(d, e), d.data('sfOptions', e), g(d, e, !0), i(f, !0), j(d), q(d, e), f.not(`.${c.bcClass}`).superfish('hide', !0), e.onInit.call(this) }) } } }()); a.fn.superfish = function (b, d) { return c[b] ? c[b].apply(this, Array.prototype.slice.call(arguments, 1)) : typeof b !== 'object' && b ? a.error(`Method ${b} does not exist on jQuery.fn.superfish`) : c.init.apply(this, arguments) }, a.fn.superfish.defaults = { popUpSelector: 'ul,.sf-mega', hoverClass: 'sfHover', pathClass: 'overrideThisToUse', pathLevels: 1, delay: 800, animation: { opacity: 'show' }, animationOut: { opacity: 'hide' }, speed: 'normal', speedOut: 'fast', cssArrows: !0, disableHI: !1, onInit: a.noop, onBeforeShow: a.noop, onShow: a.noop, onBeforeHide: a.noop, onHide: a.noop, onIdle: a.noop, onDestroy: a.noop, onHandleTouch: a.noop }
}(jQuery, window))

/*!
 * hoverIntent v1.9.0 // 2017.09.01 // jQuery v1.7.0+
 * http://briancherne.github.io/jquery-hoverIntent/
 *
 * You may use hoverIntent under the terms of the MIT license. Basically that
 * means you are free to use hoverIntent as long as this header is left intact.
 * Copyright 2007-2017 Brian Cherne
 */
!(function (factory) {
  typeof define === 'function' && define.amd ? define(['jquery'], factory) : jQuery && !jQuery.fn.hoverIntent && factory(jQuery)
}(($) => {
  let cX; let cY; const _cfg = { interval: 100, sensitivity: 6, timeout: 0 }; let INSTANCE_COUNT = 0; const track = function (ev) { cX = ev.pageX, cY = ev.pageY }; var compare = function (ev, $el, s, cfg) { if (Math.sqrt((s.pX - cX) * (s.pX - cX) + (s.pY - cY) * (s.pY - cY)) < cfg.sensitivity) return $el.off(s.event, track), delete s.timeoutId, s.isActive = !0, ev.pageX = cX, ev.pageY = cY, delete s.pX, delete s.pY, cfg.over.apply($el[0], [ev]); s.pX = cX, s.pY = cY, s.timeoutId = setTimeout(() => { compare(ev, $el, s, cfg) }, cfg.interval) }; const delay = function (ev, $el, s, out) { return delete $el.data('hoverIntent')[s.id], out.apply($el[0], [ev]) }; $.fn.hoverIntent = function (handlerIn, handlerOut, selector) { const instanceId = INSTANCE_COUNT++; let cfg = $.extend({}, _cfg); $.isPlainObject(handlerIn) ? (cfg = $.extend(cfg, handlerIn), $.isFunction(cfg.out) || (cfg.out = cfg.over)) : cfg = $.isFunction(handlerOut) ? $.extend(cfg, { over: handlerIn, out: handlerOut, selector }) : $.extend(cfg, { over: handlerIn, out: handlerIn, selector: handlerOut }); const handleHover = function (e) { const ev = $.extend({}, e); const $el = $(this); let hoverIntentData = $el.data('hoverIntent'); hoverIntentData || $el.data('hoverIntent', hoverIntentData = {}); let state = hoverIntentData[instanceId]; state || (hoverIntentData[instanceId] = state = { id: instanceId }), state.timeoutId && (state.timeoutId = clearTimeout(state.timeoutId)); const mousemove = state.event = `mousemove.hoverIntent.hoverIntent${instanceId}`; if (e.type === 'mouseenter') { if (state.isActive) return; state.pX = ev.pageX, state.pY = ev.pageY, $el.off(mousemove, track).on(mousemove, track), state.timeoutId = setTimeout(() => { compare(ev, $el, state, cfg) }, cfg.interval) } else { if (!state.isActive) return; $el.off(mousemove, track), state.timeoutId = setTimeout(() => { delay(ev, $el, state, cfg.out) }, cfg.timeout) } }; return this.on({ 'mouseenter.hoverIntent': handleHover, 'mouseleave.hoverIntent': handleHover }, cfg.selector) }
}))