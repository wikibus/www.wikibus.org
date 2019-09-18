/*!
 * jQuery Color Animations v@VERSION
 * https://github.com/jquery/jquery-color
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * Date: @DATE
 */
!(function (r, n) { function t(r, n, t) { const e = f[n.type] || {}; return r == null ? t || !n.def ? null : n.def : (r = e.floor ? ~~r : parseFloat(r), isNaN(r) ? n.def : e.mod ? (r + e.mod) % e.mod : r < 0 ? 0 : e.max < r ? e.max : r) } function e(n) { const t = l(); let e = t._rgba = []; return n = n.toLowerCase(), h(u, (r, o) => { let a; const s = o.re.exec(n); const i = s && o.parse(s); const u = o.space || 'rgba'; return i ? (a = t[u](i), t[c[u].cache] = a[c[u].cache], e = t._rgba = a._rgba, !1) : void 0 }), e.length ? (e.join() === '0,0,0,0' && r.extend(e, a.transparent), t) : a[n] } function o(r, n, t) { return t = (t + 1) % 1, 6 * t < 1 ? r + (n - r) * t * 6 : 2 * t < 1 ? n : 3 * t < 2 ? r + (n - r) * (2 / 3 - t) * 6 : r } let a; const s = 'backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor'; const i = /^([\-+])=\s*(\d+\.?\d*)/; var u = [{ re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/, parse(r) { return [r[1], r[2], r[3], r[4]] } }, { re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/, parse(r) { return [2.55 * r[1], 2.55 * r[2], 2.55 * r[3], r[4]] } }, { re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/, parse(r) { return [parseInt(r[1], 16), parseInt(r[2], 16), parseInt(r[3], 16)] } }, { re: /#([a-f0-9])([a-f0-9])([a-f0-9])/, parse(r) { return [parseInt(r[1] + r[1], 16), parseInt(r[2] + r[2], 16), parseInt(r[3] + r[3], 16)] } }, { re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/, space: 'hsla', parse(r) { return [r[1], r[2] / 100, r[3] / 100, r[4]] } }]; var l = r.Color = function (n, t, e, o) { return new r.Color.fn.parse(n, t, e, o) }; var c = { rgba: { props: { red: { idx: 0, type: 'byte' }, green: { idx: 1, type: 'byte' }, blue: { idx: 2, type: 'byte' } } }, hsla: { props: { hue: { idx: 0, type: 'degrees' }, saturation: { idx: 1, type: 'percent' }, lightness: { idx: 2, type: 'percent' } } } }; var f = { byte: { floor: !0, max: 255 }, percent: { max: 1 }, degrees: { mod: 360, floor: !0 } }; const p = l.support = {}; const d = r('<p>')[0]; var h = r.each; d.style.cssText = 'background-color:rgba(1,1,1,.5)', p.rgba = d.style.backgroundColor.indexOf('rgba') > -1, h(c, (r, n) => { n.cache = `_${r}`, n.props.alpha = { idx: 3, type: 'percent', def: 1 } }), l.fn = r.extend(l.prototype, { parse(o, s, i, u) { if (o === n) return this._rgba = [null, null, null, null], this; (o.jquery || o.nodeType) && (o = r(o).css(s), s = n); const f = this; let p = r.type(o); const d = this._rgba = []; return s !== n && (o = [o, s, i, u], p = 'array'), p === 'string' ? this.parse(e(o) || a._default) : p === 'array' ? (h(c.rgba.props, (r, n) => { d[n.idx] = t(o[n.idx], n) }), this) : p === 'object' ? (o instanceof l ? h(c, (r, n) => { o[n.cache] && (f[n.cache] = o[n.cache].slice()) }) : h(c, (n, e) => { const a = e.cache; h(e.props, (r, n) => { if (!f[a] && e.to) { if (r === 'alpha' || o[r] == null) return; f[a] = e.to(f._rgba) }f[a][n.idx] = t(o[r], n, !0) }), f[a] && r.inArray(null, f[a].slice(0, 3)) < 0 && (f[a][3] = 1, e.from && (f._rgba = e.from(f[a]))) }), this) : void 0 }, is(r) { const n = l(r); let t = !0; const e = this; return h(c, (r, o) => { let a; const s = n[o.cache]; return s && (a = e[o.cache] || o.to && o.to(e._rgba) || [], h(o.props, (r, n) => s[n.idx] != null ? t = s[n.idx] === a[n.idx] : void 0)), t }), t }, _space() { const r = []; const n = this; return h(c, (t, e) => { n[e.cache] && r.push(t) }), r.pop() }, transition(r, n) { let e = l(r); const o = e._space(); const a = c[o]; const s = this.alpha() === 0 ? l('transparent') : this; const i = s[a.cache] || a.to(s._rgba); const u = i.slice(); return e = e[a.cache], h(a.props, (r, o) => { const a = o.idx; let s = i[a]; const l = e[a]; const c = f[o.type] || {}; l !== null && (s === null ? u[a] = l : (c.mod && (l - s > c.mod / 2 ? s += c.mod : s - l > c.mod / 2 && (s -= c.mod)), u[a] = t((l - s) * n + s, o))) }), this[o](u) }, blend(n) { if (this._rgba[3] === 1) return this; const t = this._rgba.slice(); const e = t.pop(); const o = l(n)._rgba; return l(r.map(t, (r, n) => (1 - e) * o[n] + e * r)) }, toRgbaString() { let n = 'rgba('; const t = r.map(this._rgba, (r, n) => r == null ? n > 2 ? 1 : 0 : r); return t[3] === 1 && (t.pop(), n = 'rgb('), `${n + t.join()})` }, toHslaString() { let n = 'hsla('; const t = r.map(this.hsla(), (r, n) => r == null && (r = n > 2 ? 1 : 0), n && n < 3 && (r = `${Math.round(100 * r)}%`), r); return t[3] === 1 && (t.pop(), n = 'hsl('), `${n + t.join()})` }, toHexString(n) { const t = this._rgba.slice(); const e = t.pop(); return n && t.push(~~(255 * e)), `#${r.map(t, (r) => r = (r || 0).toString(16), r.length === 1 ? `0${r}` : r).join('')}` }, toString() { return this._rgba[3] === 0 ? 'transparent' : this.toRgbaString() } }), l.fn.parse.prototype = l.fn, c.hsla.to = function (r) { if (r[0] == null || r[1] == null || r[2] == null) return [null, null, null, r[3]]; let n; let t; const e = r[0] / 255; const o = r[1] / 255; const a = r[2] / 255; const s = r[3]; const i = Math.max(e, o, a); const u = Math.min(e, o, a); const l = i - u; const c = i + u; const f = 0.5 * c; return n = u === i ? 0 : e === i ? 60 * (o - a) / l + 360 : o === i ? 60 * (a - e) / l + 120 : 60 * (e - o) / l + 240, t = l === 0 ? 0 : f <= 0.5 ? l / c : l / (2 - c), [Math.round(n) % 360, t, f, s == null ? 1 : s] }, c.hsla.from = function (r) { if (r[0] == null || r[1] == null || r[2] == null) return [null, null, null, r[3]]; const n = r[0] / 360; const t = r[1]; const e = r[2]; const a = r[3]; const s = e <= 0.5 ? e * (1 + t) : e + t - e * t; const i = 2 * e - s; return [Math.round(255 * o(i, s, n + 1 / 3)), Math.round(255 * o(i, s, n)), Math.round(255 * o(i, s, n - 1 / 3)), a] }, h(c, (e, o) => { const a = o.props; const s = o.cache; const u = o.to; const c = o.from; l.fn[e] = function (e) { if (u && !this[s] && (this[s] = u(this._rgba)), e === n) return this[s].slice(); let o; const i = r.type(e); const f = i === 'array' || i === 'object' ? e : arguments; const p = this[s].slice(); return h(a, (r, n) => { let e = f[i === 'object' ? r : n.idx]; e == null && (e = p[n.idx]), p[n.idx] = t(e, n) }), c ? (o = l(c(p)), o[s] = p, o) : l(p) }, h(a, (n, t) => { l.fn[n] || (l.fn[n] = function (o) { let a; let s = r.type(o); const u = n === 'alpha' ? this._hsla ? 'hsla' : 'rgba' : e; const l = this[u](); const c = l[t.idx]; return s === 'undefined' ? c : (s === 'function' && (o = o.call(this, c), s = r.type(o)), o == null && t.empty ? this : (s === 'string' && (a = i.exec(o), a && (o = c + parseFloat(a[2]) * (a[1] === '+' ? 1 : -1))), l[t.idx] = o, this[u](l))) }) }) }), l.hook = function (n) { const t = n.split(' '); h(t, (n, t) => { r.cssHooks[t] = { set(n, o) { let a; let s; let i = ''; if (o !== 'transparent' && (r.type(o) !== 'string' || (a = e(o)))) { if (o = l(a || o), !p.rgba && o._rgba[3] !== 1) { for (s = t === 'backgroundColor' ? n.parentNode : n; (i === '' || i === 'transparent') && s && s.style;) try { i = r.css(s, 'backgroundColor'), s = s.parentNode } catch (u) {}o = o.blend(i && i !== 'transparent' ? i : '_default') }o = o.toRgbaString() } try { n.style[t] = o } catch (u) {} } }, r.fx.step[t] = function (n) { n.colorInit || (n.start = l(n.elem, t), n.end = l(n.end), n.colorInit = !0), r.cssHooks[t].set(n.elem, n.start.transition(n.end, n.pos)) } }) }, l.hook(s), r.cssHooks.borderColor = { expand(r) { const n = {}; return h(['Top', 'Right', 'Bottom', 'Left'], (t, e) => { n[`border${e}Color`] = r }), n } }, a = r.Color.names = { aqua: '#00ffff', black: '#000000', blue: '#0000ff', fuchsia: '#ff00ff', gray: '#808080', green: '#008000', lime: '#00ff00', maroon: '#800000', navy: '#000080', olive: '#808000', purple: '#800080', red: '#ff0000', silver: '#c0c0c0', teal: '#008080', white: '#ffffff', yellow: '#ffff00', transparent: [null, null, null, 0], _default: '#ffffff' } }(jQuery))