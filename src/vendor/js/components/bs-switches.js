/* ========================================================================
 * bootstrap-switch - v3.3.2
 * http://www.bootstrap-switch.org
 * ======================================================================== */
(function () {
  const t = [].slice; !(function (e, i) {
    let n; return n = (function () { function t(t, i) { i == null && (i = {}), this.$element = e(t), this.options = e.extend({}, e.fn.bootstrapSwitch.defaults, { state: this.$element.is(':checked'), size: this.$element.data('size'), animate: this.$element.data('animate'), disabled: this.$element.is(':disabled'), readonly: this.$element.is('[readonly]'), indeterminate: this.$element.data('indeterminate'), inverse: this.$element.data('inverse'), radioAllOff: this.$element.data('radio-all-off'), onColor: this.$element.data('on-color'), offColor: this.$element.data('off-color'), onText: this.$element.data('on-text'), offText: this.$element.data('off-text'), labelText: this.$element.data('label-text'), handleWidth: this.$element.data('handle-width'), labelWidth: this.$element.data('label-width'), baseClass: this.$element.data('base-class'), wrapperClass: this.$element.data('wrapper-class') }, i), this.prevOptions = {}, this.$wrapper = e('<div>', { class: (function (t) { return function () { let e; return e = [`${t.options.baseClass}`].concat(t._getClasses(t.options.wrapperClass)), e.push(t.options.state ? `${t.options.baseClass}-on` : `${t.options.baseClass}-off`), t.options.size != null && e.push(`${t.options.baseClass}-${t.options.size}`), t.options.disabled && e.push(`${t.options.baseClass}-disabled`), t.options.readonly && e.push(`${t.options.baseClass}-readonly`), t.options.indeterminate && e.push(`${t.options.baseClass}-indeterminate`), t.options.inverse && e.push(`${t.options.baseClass}-inverse`), t.$element.attr('id') && e.push(`${t.options.baseClass}-id-${t.$element.attr('id')}`), e.join(' ') } }(this))() }), this.$container = e('<div>', { class: `${this.options.baseClass}-container` }), this.$on = e('<span>', { html: this.options.onText, class: `${this.options.baseClass}-handle-on ${this.options.baseClass}-${this.options.onColor}` }), this.$off = e('<span>', { html: this.options.offText, class: `${this.options.baseClass}-handle-off ${this.options.baseClass}-${this.options.offColor}` }), this.$label = e('<span>', { html: this.options.labelText, class: `${this.options.baseClass}-label` }), this.$element.on('init.bootstrapSwitch', (function (e) { return function () { return e.options.onInit.apply(t, arguments) } }(this))), this.$element.on('switchChange.bootstrapSwitch', (function (i) { return function (n) { return !1 === i.options.onSwitchChange.apply(t, arguments) ? i.$element.is(':radio') ? e(`[name='${i.$element.attr('name')}']`).trigger('previousState.bootstrapSwitch', !0) : i.$element.trigger('previousState.bootstrapSwitch', !0) : void 0 } }(this))), this.$container = this.$element.wrap(this.$container).parent(), this.$wrapper = this.$container.wrap(this.$wrapper).parent(), this.$element.before(this.options.inverse ? this.$off : this.$on).before(this.$label).before(this.options.inverse ? this.$on : this.$off), this.options.indeterminate && this.$element.prop('indeterminate', !0), this._init(), this._elementHandlers(), this._handleHandlers(), this._labelHandlers(), this._formHandler(), this._externalLabelHandler(), this.$element.trigger('init.bootstrapSwitch', this.options.state) } return t.prototype._constructor = t, t.prototype.setPrevOptions = function () { return this.prevOptions = e.extend(!0, {}, this.options) }, t.prototype.state = function (t, i) { return typeof t === 'undefined' ? this.options.state : this.options.disabled || this.options.readonly ? this.$element : this.options.state && !this.options.radioAllOff && this.$element.is(':radio') ? this.$element : (this.$element.is(':radio') ? e(`[name='${this.$element.attr('name')}']`).trigger('setPreviousOptions.bootstrapSwitch') : this.$element.trigger('setPreviousOptions.bootstrapSwitch'), this.options.indeterminate && this.indeterminate(!1), t = !!t, this.$element.prop('checked', t).trigger('change.bootstrapSwitch', i), this.$element) }, t.prototype.toggleState = function (t) { return this.options.disabled || this.options.readonly ? this.$element : this.options.indeterminate ? (this.indeterminate(!1), this.state(!0)) : this.$element.prop('checked', !this.options.state).trigger('change.bootstrapSwitch', t) }, t.prototype.size = function (t) { return typeof t === 'undefined' ? this.options.size : (this.options.size != null && this.$wrapper.removeClass(`${this.options.baseClass}-${this.options.size}`), t && this.$wrapper.addClass(`${this.options.baseClass}-${t}`), this._width(), this._containerPosition(), this.options.size = t, this.$element) }, t.prototype.animate = function (t) { return typeof t === 'undefined' ? this.options.animate : (t = !!t, t === this.options.animate ? this.$element : this.toggleAnimate()) }, t.prototype.toggleAnimate = function () { return this.options.animate = !this.options.animate, this.$wrapper.toggleClass(`${this.options.baseClass}-animate`), this.$element }, t.prototype.disabled = function (t) { return typeof t === 'undefined' ? this.options.disabled : (t = !!t, t === this.options.disabled ? this.$element : this.toggleDisabled()) }, t.prototype.toggleDisabled = function () { return this.options.disabled = !this.options.disabled, this.$element.prop('disabled', this.options.disabled), this.$wrapper.toggleClass(`${this.options.baseClass}-disabled`), this.$element }, t.prototype.readonly = function (t) { return typeof t === 'undefined' ? this.options.readonly : (t = !!t, t === this.options.readonly ? this.$element : this.toggleReadonly()) }, t.prototype.toggleReadonly = function () { return this.options.readonly = !this.options.readonly, this.$element.prop('readonly', this.options.readonly), this.$wrapper.toggleClass(`${this.options.baseClass}-readonly`), this.$element }, t.prototype.indeterminate = function (t) { return typeof t === 'undefined' ? this.options.indeterminate : (t = !!t, t === this.options.indeterminate ? this.$element : this.toggleIndeterminate()) }, t.prototype.toggleIndeterminate = function () { return this.options.indeterminate = !this.options.indeterminate, this.$element.prop('indeterminate', this.options.indeterminate), this.$wrapper.toggleClass(`${this.options.baseClass}-indeterminate`), this._containerPosition(), this.$element }, t.prototype.inverse = function (t) { return typeof t === 'undefined' ? this.options.inverse : (t = !!t, t === this.options.inverse ? this.$element : this.toggleInverse()) }, t.prototype.toggleInverse = function () { let t, e; return this.$wrapper.toggleClass(`${this.options.baseClass}-inverse`), e = this.$on.clone(!0), t = this.$off.clone(!0), this.$on.replaceWith(t), this.$off.replaceWith(e), this.$on = t, this.$off = e, this.options.inverse = !this.options.inverse, this.$element }, t.prototype.onColor = function (t) { let e; return e = this.options.onColor, typeof t === 'undefined' ? e : (e != null && this.$on.removeClass(`${this.options.baseClass}-${e}`), this.$on.addClass(`${this.options.baseClass}-${t}`), this.options.onColor = t, this.$element) }, t.prototype.offColor = function (t) { let e; return e = this.options.offColor, typeof t === 'undefined' ? e : (e != null && this.$off.removeClass(`${this.options.baseClass}-${e}`), this.$off.addClass(`${this.options.baseClass}-${t}`), this.options.offColor = t, this.$element) }, t.prototype.onText = function (t) { return typeof t === 'undefined' ? this.options.onText : (this.$on.html(t), this._width(), this._containerPosition(), this.options.onText = t, this.$element) }, t.prototype.offText = function (t) { return typeof t === 'undefined' ? this.options.offText : (this.$off.html(t), this._width(), this._containerPosition(), this.options.offText = t, this.$element) }, t.prototype.labelText = function (t) { return typeof t === 'undefined' ? this.options.labelText : (this.$label.html(t), this._width(), this.options.labelText = t, this.$element) }, t.prototype.handleWidth = function (t) { return typeof t === 'undefined' ? this.options.handleWidth : (this.options.handleWidth = t, this._width(), this._containerPosition(), this.$element) }, t.prototype.labelWidth = function (t) { return typeof t === 'undefined' ? this.options.labelWidth : (this.options.labelWidth = t, this._width(), this._containerPosition(), this.$element) }, t.prototype.baseClass = function (t) { return this.options.baseClass }, t.prototype.wrapperClass = function (t) { return typeof t === 'undefined' ? this.options.wrapperClass : (t || (t = e.fn.bootstrapSwitch.defaults.wrapperClass), this.$wrapper.removeClass(this._getClasses(this.options.wrapperClass).join(' ')), this.$wrapper.addClass(this._getClasses(t).join(' ')), this.options.wrapperClass = t, this.$element) }, t.prototype.radioAllOff = function (t) { return typeof t === 'undefined' ? this.options.radioAllOff : (t = !!t, t === this.options.radioAllOff ? this.$element : (this.options.radioAllOff = t, this.$element)) }, t.prototype.onInit = function (t) { return typeof t === 'undefined' ? this.options.onInit : (t || (t = e.fn.bootstrapSwitch.defaults.onInit), this.options.onInit = t, this.$element) }, t.prototype.onSwitchChange = function (t) { return typeof t === 'undefined' ? this.options.onSwitchChange : (t || (t = e.fn.bootstrapSwitch.defaults.onSwitchChange), this.options.onSwitchChange = t, this.$element) }, t.prototype.destroy = function () { let t; return t = this.$element.closest('form'), t.length && t.off('reset.bootstrapSwitch').removeData('bootstrap-switch'), this.$container.children().not(this.$element).remove(), this.$element.unwrap().unwrap().off('.bootstrapSwitch').removeData('bootstrap-switch'), this.$element }, t.prototype._width = function () { let t, e; return t = this.$on.add(this.$off), t.add(this.$label).css('width', ''), e = this.options.handleWidth === 'auto' ? Math.max(this.$on.width(), this.$off.width()) : this.options.handleWidth, t.width(e), this.$label.width(function (t) { return function (i, n) { return t.options.labelWidth !== 'auto' ? t.options.labelWidth : e > n ? e : n } }(this)), this._handleWidth = this.$on.outerWidth(), this._labelWidth = this.$label.outerWidth(), this.$container.width(2 * this._handleWidth + this._labelWidth), this.$wrapper.width(this._handleWidth + this._labelWidth) }, t.prototype._containerPosition = function (t, e) { return t == null && (t = this.options.state), this.$container.css('margin-left', (function (e) { return function () { let i; return i = [0, `-${e._handleWidth}px`], e.options.indeterminate ? `-${e._handleWidth / 2}px` : t ? e.options.inverse ? i[1] : i[0] : e.options.inverse ? i[0] : i[1] } }(this))), e ? setTimeout(() => e(), 50) : void 0 }, t.prototype._init = function () { let t, e; return t = (function (t) { return function () { return t.setPrevOptions(), t._width(), t._containerPosition(null, () => t.options.animate ? t.$wrapper.addClass(`${t.options.baseClass}-animate`) : void 0) } }(this)), this.$wrapper.is(':visible') ? t() : e = i.setInterval((function (n) { return function () { return n.$wrapper.is(':visible') ? (t(), i.clearInterval(e)) : void 0 } }(this)), 50) }, t.prototype._elementHandlers = function () { return this.$element.on({ 'setPreviousOptions.bootstrapSwitch': (function (t) { return function (e) { return t.setPrevOptions() } }(this)), 'previousState.bootstrapSwitch': (function (t) { return function (e) { return t.options = t.prevOptions, t.options.indeterminate && t.$wrapper.addClass(`${t.options.baseClass}-indeterminate`), t.$element.prop('checked', t.options.state).trigger('change.bootstrapSwitch', !0) } }(this)), 'change.bootstrapSwitch': (function (t) { return function (i, n) { let o; return i.preventDefault(), i.stopImmediatePropagation(), o = t.$element.is(':checked'), t._containerPosition(o), o !== t.options.state ? (t.options.state = o, t.$wrapper.toggleClass(`${t.options.baseClass}-off`).toggleClass(`${t.options.baseClass}-on`), n ? void 0 : (t.$element.is(':radio') && e(`[name='${t.$element.attr('name')}']`).not(t.$element).prop('checked', !1).trigger('change.bootstrapSwitch', !0), t.$element.trigger('switchChange.bootstrapSwitch', [o]))) : void 0 } }(this)), 'focus.bootstrapSwitch': (function (t) { return function (e) { return e.preventDefault(), t.$wrapper.addClass(`${t.options.baseClass}-focused`) } }(this)), 'blur.bootstrapSwitch': (function (t) { return function (e) { return e.preventDefault(), t.$wrapper.removeClass(`${t.options.baseClass}-focused`) } }(this)), 'keydown.bootstrapSwitch': (function (t) { return function (e) { if (e.which && !t.options.disabled && !t.options.readonly) switch (e.which) { case 37:return e.preventDefault(), e.stopImmediatePropagation(), t.state(!1); case 39:return e.preventDefault(), e.stopImmediatePropagation(), t.state(!0) } } }(this)) }) }, t.prototype._handleHandlers = function () { return this.$on.on('click.bootstrapSwitch', (function (t) { return function (e) { return e.preventDefault(), e.stopPropagation(), t.state(!1), t.$element.trigger('focus.bootstrapSwitch') } }(this))), this.$off.on('click.bootstrapSwitch', (function (t) { return function (e) { return e.preventDefault(), e.stopPropagation(), t.state(!0), t.$element.trigger('focus.bootstrapSwitch') } }(this))) }, t.prototype._labelHandlers = function () { return this.$label.on({ click(t) { return t.stopPropagation() }, 'mousedown.bootstrapSwitch touchstart.bootstrapSwitch': (function (t) { return function (e) { return t._dragStart || t.options.disabled || t.options.readonly ? void 0 : (e.preventDefault(), e.stopPropagation(), t._dragStart = (e.pageX || e.originalEvent.touches[0].pageX) - parseInt(t.$container.css('margin-left'), 10), t.options.animate && t.$wrapper.removeClass(`${t.options.baseClass}-animate`), t.$element.trigger('focus.bootstrapSwitch')) } }(this)), 'mousemove.bootstrapSwitch touchmove.bootstrapSwitch': (function (t) { return function (e) { let i; if (t._dragStart != null && (e.preventDefault(), i = (e.pageX || e.originalEvent.touches[0].pageX) - t._dragStart, !(i < -t._handleWidth || i > 0))) return t._dragEnd = i, t.$container.css('margin-left', `${t._dragEnd}px`) } }(this)), 'mouseup.bootstrapSwitch touchend.bootstrapSwitch': (function (t) { return function (e) { let i; if (t._dragStart) return e.preventDefault(), t.options.animate && t.$wrapper.addClass(`${t.options.baseClass}-animate`), t._dragEnd ? (i = t._dragEnd > -(t._handleWidth / 2), t._dragEnd = !1, t.state(t.options.inverse ? !i : i)) : t.state(!t.options.state), t._dragStart = !1 } }(this)), 'mouseleave.bootstrapSwitch': (function (t) { return function (e) { return t.$label.trigger('mouseup.bootstrapSwitch') } }(this)) }) }, t.prototype._externalLabelHandler = function () { let t; return t = this.$element.closest('label'), t.on('click', (function (e) { return function (i) { return i.preventDefault(), i.stopImmediatePropagation(), i.target === t[0] ? e.toggleState() : void 0 } }(this))) }, t.prototype._formHandler = function () { let t; return t = this.$element.closest('form'), t.data('bootstrap-switch') ? void 0 : t.on('reset.bootstrapSwitch', () => i.setTimeout(() => t.find('input').filter(function () { return e(this).data('bootstrap-switch') }).each(function () { return e(this).bootstrapSwitch('state', this.checked) }), 1)).data('bootstrap-switch', !0) }, t.prototype._getClasses = function (t) { let i, n, o, s; if (!e.isArray(t)) return [`${this.options.baseClass}-${t}`]; for (n = [], o = 0, s = t.length; s > o; o++)i = t[o], n.push(`${this.options.baseClass}-${i}`); return n }, t }()), e.fn.bootstrapSwitch = function () { let i, o, s; return o = arguments[0], i = arguments.length >= 2 ? t.call(arguments, 1) : [], s = this, this.each(function () { let t, a; return t = e(this), a = t.data('bootstrap-switch'), a || t.data('bootstrap-switch', a = new n(this, o)), typeof o === 'string' ? s = a[o].apply(a, i) : void 0 }), s }, e.fn.bootstrapSwitch.Constructor = n, e.fn.bootstrapSwitch.defaults = { state: !0, size: null, animate: !0, disabled: !1, readonly: !1, indeterminate: !1, inverse: !1, radioAllOff: !1, onColor: 'primary', offColor: 'default', onText: 'ON', offText: 'OFF', labelText: '&nbsp;', handleWidth: 'auto', labelWidth: 'auto', baseClass: 'bootstrap-switch', wrapperClass: 'wrapper', onInit() {}, onSwitchChange() {} }
  }(window.jQuery, window))
}).call(this)