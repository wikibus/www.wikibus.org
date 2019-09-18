/*
 * jQuery FlexSlider v2.7.1
 * Copyright 2012 WooThemes
 * Contributing Author: Tyler Smith
 */
!(function ($) { let e = !0; $.flexslider = function (t, a) { const n = $(t); void 0 === a.rtl && $('html').attr('dir') == 'rtl' && (a.rtl = !0), n.vars = $.extend({}, $.flexslider.defaults, a); const i = n.vars.namespace; const r = window.navigator && window.navigator.msPointerEnabled && window.MSGesture; const s = ('ontouchstart' in window || r || window.DocumentTouch && document instanceof DocumentTouch) && n.vars.touch; const o = 'click touchend MSPointerUp keyup'; let l = ''; let c; const d = n.vars.direction === 'vertical'; const u = n.vars.reverse; const v = n.vars.itemWidth > 0; const p = n.vars.animation === 'fade'; const m = n.vars.asNavFor !== ''; let f = {}; $.data(t, 'flexslider', n), f = { init() { n.animating = !1, n.currentSlide = parseInt(n.vars.startAt ? n.vars.startAt : 0, 10), isNaN(n.currentSlide) && (n.currentSlide = 0), n.animatingTo = n.currentSlide, n.atEnd = n.currentSlide === 0 || n.currentSlide === n.last, n.containerSelector = n.vars.selector.substr(0, n.vars.selector.search(' ')), n.slides = $(n.vars.selector, n), n.container = $(n.containerSelector, n), n.count = n.slides.length, n.syncExists = $(n.vars.sync).length > 0, n.vars.animation === 'slide' && (n.vars.animation = 'swing'), n.prop = d ? 'top' : n.vars.rtl ? 'marginRight' : 'marginLeft', n.args = {}, n.manualPause = !1, n.stopped = !1, n.started = !1, n.startTimeout = null, n.transitions = !n.vars.video && !p && n.vars.useCSS && (function () { const e = document.createElement('div'); const t = ['perspectiveProperty', 'WebkitPerspective', 'MozPerspective', 'OPerspective', 'msPerspective']; for (const a in t) if (void 0 !== e.style[t[a]]) return n.pfx = t[a].replace('Perspective', '').toLowerCase(), n.prop = `-${n.pfx}-transform`, !0; return !1 }()), n.isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1, n.ensureAnimationEnd = '', n.vars.controlsContainer !== '' && (n.controlsContainer = $(n.vars.controlsContainer).length > 0 && $(n.vars.controlsContainer)), n.vars.manualControls !== '' && (n.manualControls = $(n.vars.manualControls).length > 0 && $(n.vars.manualControls)), n.vars.customDirectionNav !== '' && (n.customDirectionNav = $(n.vars.customDirectionNav).length === 2 && $(n.vars.customDirectionNav)), n.vars.randomize && (n.slides.sort(() => Math.round(Math.random()) - 0.5), n.container.empty().append(n.slides)), n.doMath(), n.setup('init'), n.vars.controlNav && f.controlNav.setup(), n.vars.directionNav && f.directionNav.setup(), n.vars.keyboard && ($(n.containerSelector).length === 1 || n.vars.multipleKeyboard) && $(document).bind('keyup', (e) => { const t = e.keyCode; if (!n.animating && (t === 39 || t === 37)) { const a = n.vars.rtl ? t === 37 ? n.getTarget('next') : t === 39 && n.getTarget('prev') : t === 39 ? n.getTarget('next') : t === 37 && n.getTarget('prev'); n.flexAnimate(a, n.vars.pauseOnAction) } }), n.vars.mousewheel && n.bind('mousewheel', (e, t, a, i) => { e.preventDefault(); const r = t < 0 ? n.getTarget('next') : n.getTarget('prev'); n.flexAnimate(r, n.vars.pauseOnAction) }), n.vars.pausePlay && f.pausePlay.setup(), n.vars.slideshow && n.vars.pauseInvisible && f.pauseInvisible.init(), n.vars.slideshow && (n.vars.pauseOnHover && n.hover(() => { n.manualPlay || n.manualPause || n.pause() }, () => { n.manualPause || n.manualPlay || n.stopped || n.play() }), n.vars.pauseInvisible && f.pauseInvisible.isHidden() || (n.vars.initDelay > 0 ? n.startTimeout = setTimeout(n.play, n.vars.initDelay) : n.play())), m && f.asNav.setup(), s && n.vars.touch && f.touch(), (!p || p && n.vars.smoothHeight) && $(window).bind('resize orientationchange focus', f.resize), n.find('img').attr('draggable', 'false'), setTimeout(() => { n.vars.start(n) }, 200) }, asNav: { setup() { n.asNav = !0, n.animatingTo = Math.floor(n.currentSlide / n.move), n.currentItem = n.currentSlide, n.slides.removeClass(`${i}active-slide`).eq(n.currentItem).addClass(`${i}active-slide`), r ? (t._slider = n, n.slides.each(function () { const e = this; e._gesture = new MSGesture(), e._gesture.target = e, e.addEventListener('MSPointerDown', (e) => { e.preventDefault(), e.currentTarget._gesture && e.currentTarget._gesture.addPointer(e.pointerId) }, !1), e.addEventListener('MSGestureTap', function (e) { e.preventDefault(); const t = $(this); const a = t.index(); $(n.vars.asNavFor).data('flexslider').animating || t.hasClass('active') || (n.direction = n.currentItem < a ? 'next' : 'prev', n.flexAnimate(a, n.vars.pauseOnAction, !1, !0, !0)) }) })) : n.slides.on(o, function (e) { e.preventDefault(); const t = $(this); const a = t.index(); let r; r = n.vars.rtl ? -1 * (t.offset().right - $(n).scrollLeft()) : t.offset().left - $(n).scrollLeft(), r <= 0 && t.hasClass(`${i}active-slide`) ? n.flexAnimate(n.getTarget('prev'), !0) : $(n.vars.asNavFor).data('flexslider').animating || t.hasClass(`${i}active-slide`) || (n.direction = n.currentItem < a ? 'next' : 'prev', n.flexAnimate(a, n.vars.pauseOnAction, !1, !0, !0)) }) } }, controlNav: { setup() { n.manualControls ? f.controlNav.setupManual() : f.controlNav.setupPaging() }, setupPaging() { const e = n.vars.controlNav === 'thumbnails' ? 'control-thumbs' : 'control-paging'; let t = 1; let a; let r; if (n.controlNavScaffold = $(`<ol class="${i}control-nav ${i}${e}"></ol>`), n.pagingCount > 1) for (let s = 0; s < n.pagingCount; s++) { r = n.slides.eq(s), void 0 === r.attr('data-thumb-alt') && r.attr('data-thumb-alt', ''); var c = r.attr('data-thumb-alt') !== '' ? c = ` alt="${r.attr('data-thumb-alt')}"` : ''; if (a = n.vars.controlNav === 'thumbnails' ? `<img src="${r.attr('data-thumb')}"${c}/>` : `<a href="#">${t}</a>`, n.vars.controlNav === 'thumbnails' && !0 === n.vars.thumbCaptions) { const d = r.attr('data-thumbcaption'); d !== '' && void 0 !== d && (a += `<span class="${i}caption">${d}</span>`) }n.controlNavScaffold.append(`<li>${a}</li>`), t++ }n.controlsContainer ? $(n.controlsContainer).append(n.controlNavScaffold) : n.append(n.controlNavScaffold), f.controlNav.set(), f.controlNav.active(), n.controlNavScaffold.delegate('a, img', o, function (e) { if (e.preventDefault(), l === '' || l === e.type) { const t = $(this); const a = n.controlNav.index(t); t.hasClass(`${i}active`) || (n.direction = a > n.currentSlide ? 'next' : 'prev', n.flexAnimate(a, n.vars.pauseOnAction)) }l === '' && (l = e.type), f.setToClearWatchedEvent() }) }, setupManual() { n.controlNav = n.manualControls, f.controlNav.active(), n.controlNav.bind(o, function (e) { if (e.preventDefault(), l === '' || l === e.type) { const t = $(this); const a = n.controlNav.index(t); t.hasClass(`${i}active`) || (a > n.currentSlide ? n.direction = 'next' : n.direction = 'prev', n.flexAnimate(a, n.vars.pauseOnAction)) }l === '' && (l = e.type), f.setToClearWatchedEvent() }) }, set() { const e = n.vars.controlNav === 'thumbnails' ? 'img' : 'a'; n.controlNav = $(`.${i}control-nav li ${e}`, n.controlsContainer ? n.controlsContainer : n) }, active() { n.controlNav.removeClass(`${i}active`).eq(n.animatingTo).addClass(`${i}active`) }, update(e, t) { n.pagingCount > 1 && e === 'add' ? n.controlNavScaffold.append($(`<li><a href="#">${n.count}</a></li>`)) : n.pagingCount === 1 ? n.controlNavScaffold.find('li').remove() : n.controlNav.eq(t).closest('li').remove(), f.controlNav.set(), n.pagingCount > 1 && n.pagingCount !== n.controlNav.length ? n.update(t, e) : f.controlNav.active() } }, directionNav: { setup() { const e = $(`<ul class="${i}direction-nav"><li class="${i}nav-prev"><a class="${i}prev" href="#">${n.vars.prevText}</a></li><li class="${i}nav-next"><a class="${i}next" href="#">${n.vars.nextText}</a></li></ul>`); n.customDirectionNav ? n.directionNav = n.customDirectionNav : n.controlsContainer ? ($(n.controlsContainer).append(e), n.directionNav = $(`.${i}direction-nav li a`, n.controlsContainer)) : (n.append(e), n.directionNav = $(`.${i}direction-nav li a`, n)), f.directionNav.update(), n.directionNav.bind(o, function (e) { e.preventDefault(); let t; l !== '' && l !== e.type || (t = $(this).hasClass(`${i}next`) ? n.getTarget('next') : n.getTarget('prev'), n.flexAnimate(t, n.vars.pauseOnAction)), l === '' && (l = e.type), f.setToClearWatchedEvent() }) }, update() { const e = `${i}disabled`; n.pagingCount === 1 ? n.directionNav.addClass(e).attr('tabindex', '-1') : n.vars.animationLoop ? n.directionNav.removeClass(e).removeAttr('tabindex') : n.animatingTo === 0 ? n.directionNav.removeClass(e).filter(`.${i}prev`).addClass(e).attr('tabindex', '-1') : n.animatingTo === n.last ? n.directionNav.removeClass(e).filter(`.${i}next`).addClass(e).attr('tabindex', '-1') : n.directionNav.removeClass(e).removeAttr('tabindex') } }, pausePlay: { setup() { const e = $(`<div class="${i}pauseplay"><a href="#"></a></div>`); n.controlsContainer ? (n.controlsContainer.append(e), n.pausePlay = $(`.${i}pauseplay a`, n.controlsContainer)) : (n.append(e), n.pausePlay = $(`.${i}pauseplay a`, n)), f.pausePlay.update(n.vars.slideshow ? `${i}pause` : `${i}play`), n.pausePlay.bind(o, function (e) { e.preventDefault(), l !== '' && l !== e.type || ($(this).hasClass(`${i}pause`) ? (n.manualPause = !0, n.manualPlay = !1, n.pause()) : (n.manualPause = !1, n.manualPlay = !0, n.play())), l === '' && (l = e.type), f.setToClearWatchedEvent() }) }, update(e) { e === 'play' ? n.pausePlay.removeClass(`${i}pause`).addClass(`${i}play`).html(n.vars.playText) : n.pausePlay.removeClass(`${i}play`).addClass(`${i}pause`).html(n.vars.pauseText) } }, touch() { function e(e) { e.stopPropagation(), n.animating ? e.preventDefault() : (n.pause(), t._gesture.addPointer(e.pointerId), w = 0, c = d ? n.h : n.w, f = Number(new Date()), l = v && u && n.animatingTo === n.last ? 0 : v && u ? n.limit - (n.itemW + n.vars.itemMargin) * n.move * n.animatingTo : v && n.currentSlide === n.last ? n.limit : v ? (n.itemW + n.vars.itemMargin) * n.move * n.currentSlide : u ? (n.last - n.currentSlide + n.cloneOffset) * c : (n.currentSlide + n.cloneOffset) * c) } function a(e) { e.stopPropagation(); const a = e.target._slider; if (a) { const n = -e.translationX; const i = -e.translationY; if (w += d ? i : n, m = (a.vars.rtl ? -1 : 1) * w, x = d ? Math.abs(w) < Math.abs(-n) : Math.abs(w) < Math.abs(-i), e.detail === e.MSGESTURE_FLAG_INERTIA) return void setImmediate(() => { t._gesture.stop() }); (!x || Number(new Date()) - f > 500) && (e.preventDefault(), !p && a.transitions && (a.vars.animationLoop || (m = w / (a.currentSlide === 0 && w < 0 || a.currentSlide === a.last && w > 0 ? Math.abs(w) / c + 2 : 1)), a.setProps(l + m, 'setTouch'))) } } function i(e) { e.stopPropagation(); const t = e.target._slider; if (t) { if (t.animatingTo === t.currentSlide && !x && m !== null) { const a = u ? -m : m; const n = a > 0 ? t.getTarget('next') : t.getTarget('prev'); t.canAdvance(n) && (Number(new Date()) - f < 550 && Math.abs(a) > 50 || Math.abs(a) > c / 2) ? t.flexAnimate(n, t.vars.pauseOnAction) : p || t.flexAnimate(t.currentSlide, t.vars.pauseOnAction, !0) }s = null, o = null, m = null, l = null, w = 0 } } let s; let o; let l; let c; let m; let f; let g; let h; let S; var x = !1; let y = 0; let b = 0; var w = 0; r ? (t.style.msTouchAction = 'none', t._gesture = new MSGesture(), t._gesture.target = t, t.addEventListener('MSPointerDown', e, !1), t._slider = n, t.addEventListener('MSGestureChange', a, !1), t.addEventListener('MSGestureEnd', i, !1)) : (g = function (e) { n.animating ? e.preventDefault() : (window.navigator.msPointerEnabled || e.touches.length === 1) && (n.pause(), c = d ? n.h : n.w, f = Number(new Date()), y = e.touches[0].pageX, b = e.touches[0].pageY, l = v && u && n.animatingTo === n.last ? 0 : v && u ? n.limit - (n.itemW + n.vars.itemMargin) * n.move * n.animatingTo : v && n.currentSlide === n.last ? n.limit : v ? (n.itemW + n.vars.itemMargin) * n.move * n.currentSlide : u ? (n.last - n.currentSlide + n.cloneOffset) * c : (n.currentSlide + n.cloneOffset) * c, s = d ? b : y, o = d ? y : b, t.addEventListener('touchmove', h, !1), t.addEventListener('touchend', S, !1)) }, h = function (e) { y = e.touches[0].pageX, b = e.touches[0].pageY, m = d ? s - b : (n.vars.rtl ? -1 : 1) * (s - y), x = d ? Math.abs(m) < Math.abs(y - o) : Math.abs(m) < Math.abs(b - o); const t = 500; (!x || Number(new Date()) - f > 500) && (e.preventDefault(), !p && n.transitions && (n.vars.animationLoop || (m /= n.currentSlide === 0 && m < 0 || n.currentSlide === n.last && m > 0 ? Math.abs(m) / c + 2 : 1), n.setProps(l + m, 'setTouch'))) }, S = function (e) { if (t.removeEventListener('touchmove', h, !1), n.animatingTo === n.currentSlide && !x && m !== null) { const a = u ? -m : m; const i = a > 0 ? n.getTarget('next') : n.getTarget('prev'); n.canAdvance(i) && (Number(new Date()) - f < 550 && Math.abs(a) > 50 || Math.abs(a) > c / 2) ? n.flexAnimate(i, n.vars.pauseOnAction) : p || n.flexAnimate(n.currentSlide, n.vars.pauseOnAction, !0) }t.removeEventListener('touchend', S, !1), s = null, o = null, m = null, l = null }, t.addEventListener('touchstart', g, !1)) }, resize() { !n.animating && n.is(':visible') && (v || n.doMath(), p ? f.smoothHeight() : v ? (n.slides.width(n.computedW), n.update(n.pagingCount), n.setProps()) : d ? (n.viewport.height(n.h), n.setProps(n.h, 'setTotal')) : (n.vars.smoothHeight && f.smoothHeight(), n.newSlides.width(n.computedW), n.setProps(n.computedW, 'setTotal'))) }, smoothHeight(e) { if (!d || p) { const t = p ? n : n.viewport; e ? t.animate({ height: n.slides.eq(n.animatingTo).innerHeight() }, e) : t.innerHeight(n.slides.eq(n.animatingTo).innerHeight()) } }, sync(e) { const t = $(n.vars.sync).data('flexslider'); const a = n.animatingTo; switch (e) { case 'animate':t.flexAnimate(a, n.vars.pauseOnAction, !1, !0); break; case 'play':t.playing || t.asNav || t.play(); break; case 'pause':t.pause(); break } }, uniqueID(e) { return e.filter('[id]').add(e.find('[id]')).each(function () { const e = $(this); e.attr('id', `${e.attr('id')}_clone`) }), e }, pauseInvisible: { visProp: null, init() { const e = f.pauseInvisible.getHiddenProp(); if (e) { const t = `${e.replace(/[H|h]idden/, '')}visibilitychange`; document.addEventListener(t, () => { f.pauseInvisible.isHidden() ? n.startTimeout ? clearTimeout(n.startTimeout) : n.pause() : n.started ? n.play() : n.vars.initDelay > 0 ? setTimeout(n.play, n.vars.initDelay) : n.play() }) } }, isHidden() { const e = f.pauseInvisible.getHiddenProp(); return !!e && document[e] }, getHiddenProp() { const e = ['webkit', 'moz', 'ms', 'o']; if ('hidden' in document) return 'hidden'; for (let t = 0; t < e.length; t++) if (`${e[t]}Hidden` in document) return `${e[t]}Hidden`; return null } }, setToClearWatchedEvent() { clearTimeout(c), c = setTimeout(() => { l = '' }, 3e3) } }, n.flexAnimate = function (e, t, a, r, o) { if (n.vars.animationLoop || e === n.currentSlide || (n.direction = e > n.currentSlide ? 'next' : 'prev'), m && n.pagingCount === 1 && (n.direction = n.currentItem < e ? 'next' : 'prev'), !n.animating && (n.canAdvance(e, o) || a) && n.is(':visible')) { if (m && r) { const l = $(n.vars.asNavFor).data('flexslider'); if (n.atEnd = e === 0 || e === n.count - 1, l.flexAnimate(e, !0, !1, !0, o), n.direction = n.currentItem < e ? 'next' : 'prev', l.direction = n.direction, Math.ceil((e + 1) / n.visible) - 1 === n.currentSlide || e === 0) return n.currentItem = e, n.slides.removeClass(`${i}active-slide`).eq(e).addClass(`${i}active-slide`), !1; n.currentItem = e, n.slides.removeClass(`${i}active-slide`).eq(e).addClass(`${i}active-slide`), e = Math.floor(e / n.visible) } if (n.animating = !0, n.animatingTo = e, t && n.pause(), n.vars.before(n), n.syncExists && !o && f.sync('animate'), n.vars.controlNav && f.controlNav.active(), v || n.slides.removeClass(`${i}active-slide`).eq(e).addClass(`${i}active-slide`), n.atEnd = e === 0 || e === n.last, n.vars.directionNav && f.directionNav.update(), e === n.last && (n.vars.end(n), n.vars.animationLoop || n.pause()), p)s ? (n.slides.eq(n.currentSlide).css({ opacity: 0, zIndex: 1 }), n.slides.eq(e).css({ opacity: 1, zIndex: 2 }), n.wrapup(c)) : (n.slides.eq(n.currentSlide).css({ zIndex: 1 }).animate({ opacity: 0 }, n.vars.animationSpeed, n.vars.easing), n.slides.eq(e).css({ zIndex: 2 }).animate({ opacity: 1 }, n.vars.animationSpeed, n.vars.easing, n.wrapup)); else { var c = d ? n.slides.filter(':first').height() : n.computedW; let g; let h; let S; v ? (g = n.vars.itemMargin, S = (n.itemW + g) * n.move * n.animatingTo, h = S > n.limit && n.visible !== 1 ? n.limit : S) : h = n.currentSlide === 0 && e === n.count - 1 && n.vars.animationLoop && n.direction !== 'next' ? u ? (n.count + n.cloneOffset) * c : 0 : n.currentSlide === n.last && e === 0 && n.vars.animationLoop && n.direction !== 'prev' ? u ? 0 : (n.count + 1) * c : u ? (n.count - 1 - e + n.cloneOffset) * c : (e + n.cloneOffset) * c, n.setProps(h, '', n.vars.animationSpeed), n.transitions ? (n.vars.animationLoop && n.atEnd || (n.animating = !1, n.currentSlide = n.animatingTo), n.container.unbind('webkitTransitionEnd transitionend'), n.container.bind('webkitTransitionEnd transitionend', () => { clearTimeout(n.ensureAnimationEnd), n.wrapup(c) }), clearTimeout(n.ensureAnimationEnd), n.ensureAnimationEnd = setTimeout(() => { n.wrapup(c) }, n.vars.animationSpeed + 100)) : n.container.animate(n.args, n.vars.animationSpeed, n.vars.easing, () => { n.wrapup(c) }) }n.vars.smoothHeight && f.smoothHeight(n.vars.animationSpeed) } }, n.wrapup = function (e) { p || v || (n.currentSlide === 0 && n.animatingTo === n.last && n.vars.animationLoop ? n.setProps(e, 'jumpEnd') : n.currentSlide === n.last && n.animatingTo === 0 && n.vars.animationLoop && n.setProps(e, 'jumpStart')), n.animating = !1, n.currentSlide = n.animatingTo, n.vars.after(n) }, n.animateSlides = function () { !n.animating && e && n.flexAnimate(n.getTarget('next')) }, n.pause = function () { clearInterval(n.animatedSlides), n.animatedSlides = null, n.playing = !1, n.vars.pausePlay && f.pausePlay.update('play'), n.syncExists && f.sync('pause') }, n.play = function () { n.playing && clearInterval(n.animatedSlides), n.animatedSlides = n.animatedSlides || setInterval(n.animateSlides, n.vars.slideshowSpeed), n.started = n.playing = !0, n.vars.pausePlay && f.pausePlay.update('pause'), n.syncExists && f.sync('play') }, n.stop = function () { n.pause(), n.stopped = !0 }, n.canAdvance = function (e, t) { const a = m ? n.pagingCount - 1 : n.last; return !!t || (!(!m || n.currentItem !== n.count - 1 || e !== 0 || n.direction !== 'prev') || (!m || n.currentItem !== 0 || e !== n.pagingCount - 1 || n.direction === 'next') && (!(e === n.currentSlide && !m) && (!!n.vars.animationLoop || (!n.atEnd || n.currentSlide !== 0 || e !== a || n.direction === 'next') && (!n.atEnd || n.currentSlide !== a || e !== 0 || n.direction !== 'next')))) }, n.getTarget = function (e) { return n.direction = e, e === 'next' ? n.currentSlide === n.last ? 0 : n.currentSlide + 1 : n.currentSlide === 0 ? n.last : n.currentSlide - 1 }, n.setProps = function (e, t, a) { let i = (function () { const a = e || (n.itemW + n.vars.itemMargin) * n.move * n.animatingTo; return `${(function () { if (v) return t === 'setTouch' ? e : u && n.animatingTo === n.last ? 0 : u ? n.limit - (n.itemW + n.vars.itemMargin) * n.move * n.animatingTo : n.animatingTo === n.last ? n.limit : a; switch (t) { case 'setTotal':return u ? (n.count - 1 - n.currentSlide + n.cloneOffset) * e : (n.currentSlide + n.cloneOffset) * e; case 'setTouch':return e; case 'jumpEnd':return u ? e : n.count * e; case 'jumpStart':return u ? n.count * e : e; default:return e } }()) * (n.vars.rtl ? 1 : -1)}px` }()); n.transitions && (i = n.isFirefox ? d ? `translate3d(0,${i},0)` : `translate3d(${parseInt(i)}px,0,0)` : d ? `translate3d(0,${i},0)` : `translate3d(${(n.vars.rtl ? -1 : 1) * parseInt(i)}px,0,0)`, a = void 0 !== a ? `${a / 1e3}s` : '0s', n.container.css(`-${n.pfx}-transition-duration`, a), n.container.css('transition-duration', a)), n.args[n.prop] = i, (n.transitions || void 0 === a) && n.container.css(n.args), n.container.css('transform', i) }, n.setup = function (e) { if (p)n.vars.rtl ? n.slides.css({ width: '100%', float: 'right', marginLeft: '-100%', position: 'relative' }) : n.slides.css({ width: '100%', float: 'left', marginRight: '-100%', position: 'relative' }), e === 'init' && (s ? n.slides.css({ opacity: 0, display: 'block', webkitTransition: `opacity ${n.vars.animationSpeed / 1e3}s ease`, zIndex: 1 }).eq(n.currentSlide).css({ opacity: 1, zIndex: 2 }) : n.vars.fadeFirstSlide == 0 ? n.slides.css({ opacity: 0, display: 'block', zIndex: 1 }).eq(n.currentSlide).css({ zIndex: 2 }).css({ opacity: 1 }) : n.slides.css({ opacity: 0, display: 'block', zIndex: 1 }).eq(n.currentSlide).css({ zIndex: 2 }).animate({ opacity: 1 }, n.vars.animationSpeed, n.vars.easing)), n.vars.smoothHeight && f.smoothHeight(); else { let t, a; e === 'init' && (n.viewport = $(`<div class="${i}viewport"></div>`).css({ overflow: 'hidden', position: 'relative' }).appendTo(n).append(n.container), n.cloneCount = 0, n.cloneOffset = 0, u && (a = $.makeArray(n.slides).reverse(), n.slides = $(a), n.container.empty().append(n.slides))), n.vars.animationLoop && !v && (n.cloneCount = 2, n.cloneOffset = 1, e !== 'init' && n.container.find('.clone').remove(), n.container.append(f.uniqueID(n.slides.first().clone().addClass('clone')).attr('aria-hidden', 'true')).prepend(f.uniqueID(n.slides.last().clone().addClass('clone')).attr('aria-hidden', 'true'))), n.newSlides = $(n.vars.selector, n), t = u ? n.count - 1 - n.currentSlide + n.cloneOffset : n.currentSlide + n.cloneOffset, d && !v ? (n.container.height(`${200 * (n.count + n.cloneCount)}%`).css('position', 'absolute').width('100%'), setTimeout(() => { n.newSlides.css({ display: 'block' }), n.doMath(), n.viewport.height(n.h), n.setProps(t * n.h, 'init') }, e === 'init' ? 100 : 0)) : (n.container.width(`${200 * (n.count + n.cloneCount)}%`), n.setProps(t * n.computedW, 'init'), setTimeout(() => { n.doMath(), n.vars.rtl && n.isFirefox ? n.newSlides.css({ width: n.computedW, marginRight: n.computedM, float: 'right', display: 'block' }) : n.newSlides.css({ width: n.computedW, marginRight: n.computedM, float: 'left', display: 'block' }), n.vars.smoothHeight && f.smoothHeight() }, e === 'init' ? 100 : 0)) }v || n.slides.removeClass(`${i}active-slide`).eq(n.currentSlide).addClass(`${i}active-slide`), n.vars.init(n) }, n.doMath = function () { const e = n.slides.first(); const t = n.vars.itemMargin; const a = n.vars.minItems; const i = n.vars.maxItems; n.w = void 0 === n.viewport ? n.width() : n.viewport.width(), n.isFirefox && (n.w = n.width()), n.h = e.height(), n.boxPadding = e.outerWidth() - e.width(), v ? (n.itemT = n.vars.itemWidth + t, n.itemM = t, n.minW = a ? a * n.itemT : n.w, n.maxW = i ? i * n.itemT - t : n.w, n.itemW = n.minW > n.w ? (n.w - t * (a - 1)) / a : n.maxW < n.w ? (n.w - t * (i - 1)) / i : n.vars.itemWidth > n.w ? n.w : n.vars.itemWidth, n.visible = Math.floor(n.w / n.itemW), n.move = n.vars.move > 0 && n.vars.move < n.visible ? n.vars.move : n.visible, n.pagingCount = Math.ceil((n.count - n.visible) / n.move + 1), n.last = n.pagingCount - 1, n.limit = n.pagingCount === 1 ? 0 : n.vars.itemWidth > n.w ? n.itemW * (n.count - 1) + t * (n.count - 1) : (n.itemW + t) * n.count - n.w - t) : (n.itemW = n.w, n.itemM = t, n.pagingCount = n.count, n.last = n.count - 1), n.computedW = n.itemW - n.boxPadding, n.computedM = n.itemM }, n.update = function (e, t) { n.doMath(), v || (e < n.currentSlide ? n.currentSlide += 1 : e <= n.currentSlide && e !== 0 && (n.currentSlide -= 1), n.animatingTo = n.currentSlide), n.vars.controlNav && !n.manualControls && (t === 'add' && !v || n.pagingCount > n.controlNav.length ? f.controlNav.update('add') : (t === 'remove' && !v || n.pagingCount < n.controlNav.length) && (v && n.currentSlide > n.last && (n.currentSlide -= 1, n.animatingTo -= 1), f.controlNav.update('remove', n.last))), n.vars.directionNav && f.directionNav.update() }, n.addSlide = function (e, t) { const a = $(e); n.count += 1, n.last = n.count - 1, d && u ? void 0 !== t ? n.slides.eq(n.count - t).after(a) : n.container.prepend(a) : void 0 !== t ? n.slides.eq(t).before(a) : n.container.append(a), n.update(t, 'add'), n.slides = $(`${n.vars.selector}:not(.clone)`, n), n.setup(), n.vars.added(n) }, n.removeSlide = function (e) { const t = isNaN(e) ? n.slides.index($(e)) : e; n.count -= 1, n.last = n.count - 1, isNaN(e) ? $(e, n.slides).remove() : d && u ? n.slides.eq(n.last).remove() : n.slides.eq(e).remove(), n.doMath(), n.update(t, 'remove'), n.slides = $(`${n.vars.selector}:not(.clone)`, n), n.setup(), n.vars.removed(n) }, f.init() }, $(window).blur((t) => { e = !1 }).focus((t) => { e = !0 }), $.flexslider.defaults = { namespace: 'flex-', selector: '.slides > li', animation: 'fade', easing: 'swing', direction: 'horizontal', reverse: !1, animationLoop: !0, smoothHeight: !1, startAt: 0, slideshow: !0, slideshowSpeed: 7e3, animationSpeed: 600, initDelay: 0, randomize: !1, fadeFirstSlide: !0, thumbCaptions: !1, pauseOnAction: !0, pauseOnHover: !1, pauseInvisible: !0, useCSS: !0, touch: !0, video: !1, controlNav: !0, directionNav: !0, prevText: 'Previous', nextText: 'Next', keyboard: !0, multipleKeyboard: !1, mousewheel: !1, pausePlay: !1, pauseText: 'Pause', playText: 'Play', controlsContainer: '', manualControls: '', customDirectionNav: '', sync: '', asNavFor: '', itemWidth: 0, itemMargin: 0, minItems: 1, maxItems: 0, move: 0, allowOneSlide: !0, isFirefox: !1, start() {}, before() {}, after() {}, end() {}, added() {}, removed() {}, init() {}, rtl: !1 }, $.fn.flexslider = function (e) { if (void 0 === e && (e = {}), typeof e === 'object') return this.each(function () { const t = $(this); const a = e.selector ? e.selector : '.slides > li'; const n = t.find(a); n.length === 1 && !1 === e.allowOneSlide || n.length === 0 ? (n.fadeIn(400), e.start && e.start(t)) : void 0 === t.data('flexslider') && new $.flexslider(this, e) }); const t = $(this).data('flexslider'); switch (e) { case 'play':t.play(); break; case 'pause':t.pause(); break; case 'stop':t.stop(); break; case 'next':t.flexAnimate(t.getTarget('next'), !0); break; case 'prev':case 'previous':t.flexAnimate(t.getTarget('prev'), !0); break; default:typeof e === 'number' && t.flexAnimate(e, !0) } } }(jQuery))