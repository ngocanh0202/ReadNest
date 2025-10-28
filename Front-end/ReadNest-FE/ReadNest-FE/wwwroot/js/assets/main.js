const Xt = {
  lastScrollY: 0,
  ticking: !1,
  componentRef: null,
  navScrollHandler: null,
  navMouseHandler: null
};
window.initNavScroll = (i) => {
  Xt.componentRef = i;
  const t = () => {
    const e = window.scrollY, r = e < Xt.lastScrollY, o = e < 50;
    Xt.componentRef && Xt.componentRef.invokeMethodAsync("OnScroll", e, r, o), Xt.lastScrollY = e, Xt.ticking = !1;
  };
  Xt.navScrollHandler = () => {
    Xt.ticking || (window.requestAnimationFrame(t), Xt.ticking = !0);
  }, Xt.navMouseHandler = (e) => {
    Xt.componentRef?.invokeMethodAsync("OnMouseMove", e.clientY);
  }, window.addEventListener("scroll", Xt.navScrollHandler, { passive: !0 }), window.addEventListener("mousemove", Xt.navMouseHandler, { passive: !0 }), Xt.lastScrollY = window.scrollY;
};
window.cleanupNavScroll = () => {
  Xt.navScrollHandler && window.removeEventListener("scroll", Xt.navScrollHandler), Xt.navMouseHandler && window.removeEventListener("mousemove", Xt.navMouseHandler), Xt.componentRef = null, Xt.lastScrollY = 0, Xt.ticking = !1;
};
const ks = "readnest-theme", Yl = "data-theme";
class Ql {
  currentTheme;
  constructor() {
    this.currentTheme = this.loadTheme();
  }
  loadTheme() {
    const t = localStorage.getItem(ks);
    return t === "light" || t === "dark" ? t : window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  saveTheme(t) {
    localStorage.setItem(ks, t);
  }
  applyTheme(t) {
    const e = document.documentElement;
    e.setAttribute(Yl, t), e.classList.add("theme-transitioning"), setTimeout(() => {
      e.classList.remove("theme-transitioning");
    }, 300), this.currentTheme = t;
  }
  initialize() {
    return this.applyTheme(this.currentTheme), window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
      localStorage.getItem(ks) || this.setTheme(e.matches ? "dark" : "light");
    }), this.currentTheme === "dark";
  }
  setTheme(t) {
    this.applyTheme(t), this.saveTheme(t), window.dispatchEvent(new CustomEvent("themechange", {
      detail: { theme: t }
    }));
  }
  getTheme() {
    return this.currentTheme;
  }
  toggle() {
    const t = this.currentTheme === "dark" ? "light" : "dark";
    this.setTheme(t);
  }
}
const Is = new Ql();
window.themeToggle = {
  initialize: () => Is.initialize(),
  setTheme: (i) => Is.setTheme(i),
  getTheme: () => Is.getTheme()
};
const $a = document.createElement("style");
$a.textContent = `
    html.theme-transitioning,
    html.theme-transitioning *,
    html.theme-transitioning *::before,
    html.theme-transitioning *::after {
        transition: background-color 0.3s ease, 
                    color 0.3s ease, 
                    border-color 0.3s ease,
                    box-shadow 0.3s ease !important;
    }
`;
document.head.appendChild($a);
const Ha = {};
function Jl(i, t) {
  Ha[i] = t;
}
function tu(i, t) {
  const e = t, r = Ha[i];
  if (!r || r.length === 0)
    return !0;
  for (let o = 0; o < r.length; o++) {
    const l = r[o];
    try {
      if (new Function("value", `return Boolean(${l.rule});`)(e) === !0)
        return as(i, l.message), !1;
    } catch (h) {
      return console.error(`Error evaluating rule for ${i}:`, h), as(i, "Validation error occurred"), !1;
    }
  }
  return as(i, ""), !0;
}
function as(i, t) {
  const e = document.querySelector(
    `.validation-message[for="${i}"]`
  ), r = document.getElementById(i);
  e && (t ? (e.style.display = "block", r && (r.classList.add("invalid"), r.classList.remove("valid"))) : (e.style.display = "none", r && (r.classList.add("valid"), r.classList.remove("invalid"))), e.textContent = t);
}
function eu() {
  const i = document.querySelector("input.invalid, textarea.invalid, select.invalid");
  if (i)
    i.focus();
  else {
    const t = document.querySelector('.validation-message[style*="display: block"]');
    t && t.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}
window.setDynamicRules = Jl;
window.checkDynamicRules = tu;
window.setValidationMessage = as;
window.focusFirstInvalidField = eu;
let Sr = null, ls = !1;
window.addReaderKeyListener = function(i) {
  Sr && window.removeEventListener("keydown", Sr), Sr = async (t) => {
    if (!ls && !(t.target instanceof HTMLInputElement || t.target instanceof HTMLTextAreaElement) && (t.key === "ArrowLeft" || t.key === "ArrowRight")) {
      ls = !0;
      try {
        t.key === "ArrowLeft" ? await i.invokeMethodAsync("OnArrowLeft") : t.key === "ArrowRight" && await i.invokeMethodAsync("OnArrowRight");
      } catch (e) {
        console.error("Error handling arrow key:", e);
      } finally {
        setTimeout(() => {
          ls = !1;
        }, 300);
      }
    }
  }, window.addEventListener("keydown", Sr);
};
window.removeReaderKeyListener = function() {
  Sr && (window.removeEventListener("keydown", Sr), Sr = null), ls = !1;
};
var Ua = typeof global == "object" && global && global.Object === Object && global, nu = typeof self == "object" && self && self.Object === Object && self, Tn = Ua || nu || Function("return this")(), rr = Tn.Symbol, Fa = Object.prototype, ru = Fa.hasOwnProperty, iu = Fa.toString, qi = rr ? rr.toStringTag : void 0;
function su(i) {
  var t = ru.call(i, qi), e = i[qi];
  try {
    i[qi] = void 0;
    var r = !0;
  } catch {
  }
  var o = iu.call(i);
  return r && (t ? i[qi] = e : delete i[qi]), o;
}
var ou = Object.prototype, au = ou.toString;
function lu(i) {
  return au.call(i);
}
var uu = "[object Null]", cu = "[object Undefined]", Mo = rr ? rr.toStringTag : void 0;
function mi(i) {
  return i == null ? i === void 0 ? cu : uu : Mo && Mo in Object(i) ? su(i) : lu(i);
}
function Dn(i) {
  return i != null && typeof i == "object";
}
var Cr = Array.isArray;
function ir(i) {
  var t = typeof i;
  return i != null && (t == "object" || t == "function");
}
function za(i) {
  return i;
}
var fu = "[object AsyncFunction]", hu = "[object Function]", du = "[object GeneratorFunction]", pu = "[object Proxy]";
function co(i) {
  if (!ir(i))
    return !1;
  var t = mi(i);
  return t == hu || t == du || t == fu || t == pu;
}
var Rs = Tn["__core-js_shared__"], Do = (function() {
  var i = /[^.]+$/.exec(Rs && Rs.keys && Rs.keys.IE_PROTO || "");
  return i ? "Symbol(src)_1." + i : "";
})();
function gu(i) {
  return !!Do && Do in i;
}
var mu = Function.prototype, yu = mu.toString;
function _r(i) {
  if (i != null) {
    try {
      return yu.call(i);
    } catch {
    }
    try {
      return i + "";
    } catch {
    }
  }
  return "";
}
var bu = /[\\^$.*+?()[\]{}|]/g, vu = /^\[object .+?Constructor\]$/, xu = Function.prototype, wu = Object.prototype, Tu = xu.toString, Eu = wu.hasOwnProperty, Au = RegExp(
  "^" + Tu.call(Eu).replace(bu, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function Nu(i) {
  if (!ir(i) || gu(i))
    return !1;
  var t = co(i) ? Au : vu;
  return t.test(_r(i));
}
function Su(i, t) {
  return i?.[t];
}
function kr(i, t) {
  var e = Su(i, t);
  return Nu(e) ? e : void 0;
}
var Ks = kr(Tn, "WeakMap"), jo = Object.create, Cu = /* @__PURE__ */ (function() {
  function i() {
  }
  return function(t) {
    if (!ir(t))
      return {};
    if (jo)
      return jo(t);
    i.prototype = t;
    var e = new i();
    return i.prototype = void 0, e;
  };
})();
function Lu(i, t, e) {
  switch (e.length) {
    case 0:
      return i.call(t);
    case 1:
      return i.call(t, e[0]);
    case 2:
      return i.call(t, e[0], e[1]);
    case 3:
      return i.call(t, e[0], e[1], e[2]);
  }
  return i.apply(t, e);
}
function qu(i, t) {
  var e = -1, r = i.length;
  for (t || (t = Array(r)); ++e < r; )
    t[e] = i[e];
  return t;
}
var Ou = 800, _u = 16, ku = Date.now;
function Iu(i) {
  var t = 0, e = 0;
  return function() {
    var r = ku(), o = _u - (r - e);
    if (e = r, o > 0) {
      if (++t >= Ou)
        return arguments[0];
    } else
      t = 0;
    return i.apply(void 0, arguments);
  };
}
function Ru(i) {
  return function() {
    return i;
  };
}
var fs = (function() {
  try {
    var i = kr(Object, "defineProperty");
    return i({}, "", {}), i;
  } catch {
  }
})(), Mu = fs ? function(i, t) {
  return fs(i, "toString", {
    configurable: !0,
    enumerable: !1,
    value: Ru(t),
    writable: !0
  });
} : za, Du = Iu(Mu);
function ju(i, t) {
  for (var e = -1, r = i == null ? 0 : i.length; ++e < r && t(i[e], e, i) !== !1; )
    ;
  return i;
}
var Bu = 9007199254740991, Pu = /^(?:0|[1-9]\d*)$/;
function Wa(i, t) {
  var e = typeof i;
  return t = t ?? Bu, !!t && (e == "number" || e != "symbol" && Pu.test(i)) && i > -1 && i % 1 == 0 && i < t;
}
function fo(i, t, e) {
  t == "__proto__" && fs ? fs(i, t, {
    configurable: !0,
    enumerable: !0,
    value: e,
    writable: !0
  }) : i[t] = e;
}
function Ui(i, t) {
  return i === t || i !== i && t !== t;
}
var $u = Object.prototype, Hu = $u.hasOwnProperty;
function Va(i, t, e) {
  var r = i[t];
  (!(Hu.call(i, t) && Ui(r, e)) || e === void 0 && !(t in i)) && fo(i, t, e);
}
function Uu(i, t, e, r) {
  var o = !e;
  e || (e = {});
  for (var l = -1, h = t.length; ++l < h; ) {
    var m = t[l], b = void 0;
    b === void 0 && (b = i[m]), o ? fo(e, m, b) : Va(e, m, b);
  }
  return e;
}
var Bo = Math.max;
function Fu(i, t, e) {
  return t = Bo(t === void 0 ? i.length - 1 : t, 0), function() {
    for (var r = arguments, o = -1, l = Bo(r.length - t, 0), h = Array(l); ++o < l; )
      h[o] = r[t + o];
    o = -1;
    for (var m = Array(t + 1); ++o < t; )
      m[o] = r[o];
    return m[t] = e(h), Lu(i, this, m);
  };
}
function zu(i, t) {
  return Du(Fu(i, t, za), i + "");
}
var Wu = 9007199254740991;
function Ga(i) {
  return typeof i == "number" && i > -1 && i % 1 == 0 && i <= Wu;
}
function ys(i) {
  return i != null && Ga(i.length) && !co(i);
}
function Vu(i, t, e) {
  if (!ir(e))
    return !1;
  var r = typeof t;
  return (r == "number" ? ys(e) && Wa(t, e.length) : r == "string" && t in e) ? Ui(e[t], i) : !1;
}
function Gu(i) {
  return zu(function(t, e) {
    var r = -1, o = e.length, l = o > 1 ? e[o - 1] : void 0, h = o > 2 ? e[2] : void 0;
    for (l = i.length > 3 && typeof l == "function" ? (o--, l) : void 0, h && Vu(e[0], e[1], h) && (l = o < 3 ? void 0 : l, o = 1), t = Object(t); ++r < o; ) {
      var m = e[r];
      m && i(t, m, r, l);
    }
    return t;
  });
}
var Ku = Object.prototype;
function ho(i) {
  var t = i && i.constructor, e = typeof t == "function" && t.prototype || Ku;
  return i === e;
}
function Zu(i, t) {
  for (var e = -1, r = Array(i); ++e < i; )
    r[e] = t(e);
  return r;
}
var Xu = "[object Arguments]";
function Po(i) {
  return Dn(i) && mi(i) == Xu;
}
var Ka = Object.prototype, Yu = Ka.hasOwnProperty, Qu = Ka.propertyIsEnumerable, Zs = Po(/* @__PURE__ */ (function() {
  return arguments;
})()) ? Po : function(i) {
  return Dn(i) && Yu.call(i, "callee") && !Qu.call(i, "callee");
};
function Ju() {
  return !1;
}
var Za = typeof exports == "object" && exports && !exports.nodeType && exports, $o = Za && typeof module == "object" && module && !module.nodeType && module, tc = $o && $o.exports === Za, Ho = tc ? Tn.Buffer : void 0, ec = Ho ? Ho.isBuffer : void 0, Di = ec || Ju, nc = "[object Arguments]", rc = "[object Array]", ic = "[object Boolean]", sc = "[object Date]", oc = "[object Error]", ac = "[object Function]", lc = "[object Map]", uc = "[object Number]", cc = "[object Object]", fc = "[object RegExp]", hc = "[object Set]", dc = "[object String]", pc = "[object WeakMap]", gc = "[object ArrayBuffer]", mc = "[object DataView]", yc = "[object Float32Array]", bc = "[object Float64Array]", vc = "[object Int8Array]", xc = "[object Int16Array]", wc = "[object Int32Array]", Tc = "[object Uint8Array]", Ec = "[object Uint8ClampedArray]", Ac = "[object Uint16Array]", Nc = "[object Uint32Array]", Wt = {};
Wt[yc] = Wt[bc] = Wt[vc] = Wt[xc] = Wt[wc] = Wt[Tc] = Wt[Ec] = Wt[Ac] = Wt[Nc] = !0;
Wt[nc] = Wt[rc] = Wt[gc] = Wt[ic] = Wt[mc] = Wt[sc] = Wt[oc] = Wt[ac] = Wt[lc] = Wt[uc] = Wt[cc] = Wt[fc] = Wt[hc] = Wt[dc] = Wt[pc] = !1;
function Sc(i) {
  return Dn(i) && Ga(i.length) && !!Wt[mi(i)];
}
function po(i) {
  return function(t) {
    return i(t);
  };
}
var Xa = typeof exports == "object" && exports && !exports.nodeType && exports, Ri = Xa && typeof module == "object" && module && !module.nodeType && module, Cc = Ri && Ri.exports === Xa, Ms = Cc && Ua.process, pi = (function() {
  try {
    var i = Ri && Ri.require && Ri.require("util").types;
    return i || Ms && Ms.binding && Ms.binding("util");
  } catch {
  }
})(), Uo = pi && pi.isTypedArray, go = Uo ? po(Uo) : Sc, Lc = Object.prototype, qc = Lc.hasOwnProperty;
function Ya(i, t) {
  var e = Cr(i), r = !e && Zs(i), o = !e && !r && Di(i), l = !e && !r && !o && go(i), h = e || r || o || l, m = h ? Zu(i.length, String) : [], b = m.length;
  for (var x in i)
    (t || qc.call(i, x)) && !(h && // Safari 9 has enumerable `arguments.length` in strict mode.
    (x == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    o && (x == "offset" || x == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    l && (x == "buffer" || x == "byteLength" || x == "byteOffset") || // Skip index properties.
    Wa(x, b))) && m.push(x);
  return m;
}
function Qa(i, t) {
  return function(e) {
    return i(t(e));
  };
}
var Oc = Qa(Object.keys, Object), _c = Object.prototype, kc = _c.hasOwnProperty;
function Ic(i) {
  if (!ho(i))
    return Oc(i);
  var t = [];
  for (var e in Object(i))
    kc.call(i, e) && e != "constructor" && t.push(e);
  return t;
}
function Rc(i) {
  return ys(i) ? Ya(i) : Ic(i);
}
function Mc(i) {
  var t = [];
  if (i != null)
    for (var e in Object(i))
      t.push(e);
  return t;
}
var Dc = Object.prototype, jc = Dc.hasOwnProperty;
function Bc(i) {
  if (!ir(i))
    return Mc(i);
  var t = ho(i), e = [];
  for (var r in i)
    r == "constructor" && (t || !jc.call(i, r)) || e.push(r);
  return e;
}
function Ja(i) {
  return ys(i) ? Ya(i, !0) : Bc(i);
}
var ji = kr(Object, "create");
function Pc() {
  this.__data__ = ji ? ji(null) : {}, this.size = 0;
}
function $c(i) {
  var t = this.has(i) && delete this.__data__[i];
  return this.size -= t ? 1 : 0, t;
}
var Hc = "__lodash_hash_undefined__", Uc = Object.prototype, Fc = Uc.hasOwnProperty;
function zc(i) {
  var t = this.__data__;
  if (ji) {
    var e = t[i];
    return e === Hc ? void 0 : e;
  }
  return Fc.call(t, i) ? t[i] : void 0;
}
var Wc = Object.prototype, Vc = Wc.hasOwnProperty;
function Gc(i) {
  var t = this.__data__;
  return ji ? t[i] !== void 0 : Vc.call(t, i);
}
var Kc = "__lodash_hash_undefined__";
function Zc(i, t) {
  var e = this.__data__;
  return this.size += this.has(i) ? 0 : 1, e[i] = ji && t === void 0 ? Kc : t, this;
}
function Lr(i) {
  var t = -1, e = i == null ? 0 : i.length;
  for (this.clear(); ++t < e; ) {
    var r = i[t];
    this.set(r[0], r[1]);
  }
}
Lr.prototype.clear = Pc;
Lr.prototype.delete = $c;
Lr.prototype.get = zc;
Lr.prototype.has = Gc;
Lr.prototype.set = Zc;
function Xc() {
  this.__data__ = [], this.size = 0;
}
function bs(i, t) {
  for (var e = i.length; e--; )
    if (Ui(i[e][0], t))
      return e;
  return -1;
}
var Yc = Array.prototype, Qc = Yc.splice;
function Jc(i) {
  var t = this.__data__, e = bs(t, i);
  if (e < 0)
    return !1;
  var r = t.length - 1;
  return e == r ? t.pop() : Qc.call(t, e, 1), --this.size, !0;
}
function tf(i) {
  var t = this.__data__, e = bs(t, i);
  return e < 0 ? void 0 : t[e][1];
}
function ef(i) {
  return bs(this.__data__, i) > -1;
}
function nf(i, t) {
  var e = this.__data__, r = bs(e, i);
  return r < 0 ? (++this.size, e.push([i, t])) : e[r][1] = t, this;
}
function Bn(i) {
  var t = -1, e = i == null ? 0 : i.length;
  for (this.clear(); ++t < e; ) {
    var r = i[t];
    this.set(r[0], r[1]);
  }
}
Bn.prototype.clear = Xc;
Bn.prototype.delete = Jc;
Bn.prototype.get = tf;
Bn.prototype.has = ef;
Bn.prototype.set = nf;
var Bi = kr(Tn, "Map");
function rf() {
  this.size = 0, this.__data__ = {
    hash: new Lr(),
    map: new (Bi || Bn)(),
    string: new Lr()
  };
}
function sf(i) {
  var t = typeof i;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? i !== "__proto__" : i === null;
}
function vs(i, t) {
  var e = i.__data__;
  return sf(t) ? e[typeof t == "string" ? "string" : "hash"] : e.map;
}
function of(i) {
  var t = vs(this, i).delete(i);
  return this.size -= t ? 1 : 0, t;
}
function af(i) {
  return vs(this, i).get(i);
}
function lf(i) {
  return vs(this, i).has(i);
}
function uf(i, t) {
  var e = vs(this, i), r = e.size;
  return e.set(i, t), this.size += e.size == r ? 0 : 1, this;
}
function Ir(i) {
  var t = -1, e = i == null ? 0 : i.length;
  for (this.clear(); ++t < e; ) {
    var r = i[t];
    this.set(r[0], r[1]);
  }
}
Ir.prototype.clear = rf;
Ir.prototype.delete = of;
Ir.prototype.get = af;
Ir.prototype.has = lf;
Ir.prototype.set = uf;
function cf(i, t) {
  for (var e = -1, r = t.length, o = i.length; ++e < r; )
    i[o + e] = t[e];
  return i;
}
var tl = Qa(Object.getPrototypeOf, Object), ff = "[object Object]", hf = Function.prototype, df = Object.prototype, el = hf.toString, pf = df.hasOwnProperty, gf = el.call(Object);
function mf(i) {
  if (!Dn(i) || mi(i) != ff)
    return !1;
  var t = tl(i);
  if (t === null)
    return !0;
  var e = pf.call(t, "constructor") && t.constructor;
  return typeof e == "function" && e instanceof e && el.call(e) == gf;
}
function yf() {
  this.__data__ = new Bn(), this.size = 0;
}
function bf(i) {
  var t = this.__data__, e = t.delete(i);
  return this.size = t.size, e;
}
function vf(i) {
  return this.__data__.get(i);
}
function xf(i) {
  return this.__data__.has(i);
}
var wf = 200;
function Tf(i, t) {
  var e = this.__data__;
  if (e instanceof Bn) {
    var r = e.__data__;
    if (!Bi || r.length < wf - 1)
      return r.push([i, t]), this.size = ++e.size, this;
    e = this.__data__ = new Ir(r);
  }
  return e.set(i, t), this.size = e.size, this;
}
function xn(i) {
  var t = this.__data__ = new Bn(i);
  this.size = t.size;
}
xn.prototype.clear = yf;
xn.prototype.delete = bf;
xn.prototype.get = vf;
xn.prototype.has = xf;
xn.prototype.set = Tf;
var nl = typeof exports == "object" && exports && !exports.nodeType && exports, Fo = nl && typeof module == "object" && module && !module.nodeType && module, Ef = Fo && Fo.exports === nl, zo = Ef ? Tn.Buffer : void 0, Wo = zo ? zo.allocUnsafe : void 0;
function rl(i, t) {
  if (t)
    return i.slice();
  var e = i.length, r = Wo ? Wo(e) : new i.constructor(e);
  return i.copy(r), r;
}
function Af(i, t) {
  for (var e = -1, r = i == null ? 0 : i.length, o = 0, l = []; ++e < r; ) {
    var h = i[e];
    t(h, e, i) && (l[o++] = h);
  }
  return l;
}
function Nf() {
  return [];
}
var Sf = Object.prototype, Cf = Sf.propertyIsEnumerable, Vo = Object.getOwnPropertySymbols, Lf = Vo ? function(i) {
  return i == null ? [] : (i = Object(i), Af(Vo(i), function(t) {
    return Cf.call(i, t);
  }));
} : Nf;
function qf(i, t, e) {
  var r = t(i);
  return Cr(i) ? r : cf(r, e(i));
}
function Xs(i) {
  return qf(i, Rc, Lf);
}
var Ys = kr(Tn, "DataView"), Qs = kr(Tn, "Promise"), Js = kr(Tn, "Set"), Go = "[object Map]", Of = "[object Object]", Ko = "[object Promise]", Zo = "[object Set]", Xo = "[object WeakMap]", Yo = "[object DataView]", _f = _r(Ys), kf = _r(Bi), If = _r(Qs), Rf = _r(Js), Mf = _r(Ks), Xe = mi;
(Ys && Xe(new Ys(new ArrayBuffer(1))) != Yo || Bi && Xe(new Bi()) != Go || Qs && Xe(Qs.resolve()) != Ko || Js && Xe(new Js()) != Zo || Ks && Xe(new Ks()) != Xo) && (Xe = function(i) {
  var t = mi(i), e = t == Of ? i.constructor : void 0, r = e ? _r(e) : "";
  if (r)
    switch (r) {
      case _f:
        return Yo;
      case kf:
        return Go;
      case If:
        return Ko;
      case Rf:
        return Zo;
      case Mf:
        return Xo;
    }
  return t;
});
var Df = Object.prototype, jf = Df.hasOwnProperty;
function Bf(i) {
  var t = i.length, e = new i.constructor(t);
  return t && typeof i[0] == "string" && jf.call(i, "index") && (e.index = i.index, e.input = i.input), e;
}
var hs = Tn.Uint8Array;
function mo(i) {
  var t = new i.constructor(i.byteLength);
  return new hs(t).set(new hs(i)), t;
}
function Pf(i, t) {
  var e = mo(i.buffer);
  return new i.constructor(e, i.byteOffset, i.byteLength);
}
var $f = /\w*$/;
function Hf(i) {
  var t = new i.constructor(i.source, $f.exec(i));
  return t.lastIndex = i.lastIndex, t;
}
var Qo = rr ? rr.prototype : void 0, Jo = Qo ? Qo.valueOf : void 0;
function Uf(i) {
  return Jo ? Object(Jo.call(i)) : {};
}
function il(i, t) {
  var e = t ? mo(i.buffer) : i.buffer;
  return new i.constructor(e, i.byteOffset, i.length);
}
var Ff = "[object Boolean]", zf = "[object Date]", Wf = "[object Map]", Vf = "[object Number]", Gf = "[object RegExp]", Kf = "[object Set]", Zf = "[object String]", Xf = "[object Symbol]", Yf = "[object ArrayBuffer]", Qf = "[object DataView]", Jf = "[object Float32Array]", th = "[object Float64Array]", eh = "[object Int8Array]", nh = "[object Int16Array]", rh = "[object Int32Array]", ih = "[object Uint8Array]", sh = "[object Uint8ClampedArray]", oh = "[object Uint16Array]", ah = "[object Uint32Array]";
function lh(i, t, e) {
  var r = i.constructor;
  switch (t) {
    case Yf:
      return mo(i);
    case Ff:
    case zf:
      return new r(+i);
    case Qf:
      return Pf(i);
    case Jf:
    case th:
    case eh:
    case nh:
    case rh:
    case ih:
    case sh:
    case oh:
    case ah:
      return il(i, e);
    case Wf:
      return new r();
    case Vf:
    case Zf:
      return new r(i);
    case Gf:
      return Hf(i);
    case Kf:
      return new r();
    case Xf:
      return Uf(i);
  }
}
function sl(i) {
  return typeof i.constructor == "function" && !ho(i) ? Cu(tl(i)) : {};
}
var uh = "[object Map]";
function ch(i) {
  return Dn(i) && Xe(i) == uh;
}
var ta = pi && pi.isMap, fh = ta ? po(ta) : ch, hh = "[object Set]";
function dh(i) {
  return Dn(i) && Xe(i) == hh;
}
var ea = pi && pi.isSet, ph = ea ? po(ea) : dh, gh = 1, ol = "[object Arguments]", mh = "[object Array]", yh = "[object Boolean]", bh = "[object Date]", vh = "[object Error]", al = "[object Function]", xh = "[object GeneratorFunction]", wh = "[object Map]", Th = "[object Number]", ll = "[object Object]", Eh = "[object RegExp]", Ah = "[object Set]", Nh = "[object String]", Sh = "[object Symbol]", Ch = "[object WeakMap]", Lh = "[object ArrayBuffer]", qh = "[object DataView]", Oh = "[object Float32Array]", _h = "[object Float64Array]", kh = "[object Int8Array]", Ih = "[object Int16Array]", Rh = "[object Int32Array]", Mh = "[object Uint8Array]", Dh = "[object Uint8ClampedArray]", jh = "[object Uint16Array]", Bh = "[object Uint32Array]", zt = {};
zt[ol] = zt[mh] = zt[Lh] = zt[qh] = zt[yh] = zt[bh] = zt[Oh] = zt[_h] = zt[kh] = zt[Ih] = zt[Rh] = zt[wh] = zt[Th] = zt[ll] = zt[Eh] = zt[Ah] = zt[Nh] = zt[Sh] = zt[Mh] = zt[Dh] = zt[jh] = zt[Bh] = !0;
zt[vh] = zt[al] = zt[Ch] = !1;
function us(i, t, e, r, o, l) {
  var h, m = t & gh;
  if (h !== void 0)
    return h;
  if (!ir(i))
    return i;
  var b = Cr(i);
  if (b)
    h = Bf(i);
  else {
    var x = Xe(i), C = x == al || x == xh;
    if (Di(i))
      return rl(i, m);
    if (x == ll || x == ol || C && !o)
      h = C ? {} : sl(i);
    else {
      if (!zt[x])
        return o ? i : {};
      h = lh(i, x, m);
    }
  }
  l || (l = new xn());
  var R = l.get(i);
  if (R)
    return R;
  l.set(i, h), ph(i) ? i.forEach(function(q) {
    h.add(us(q, t, e, q, i, l));
  }) : fh(i) && i.forEach(function(q, k) {
    h.set(k, us(q, t, e, k, i, l));
  });
  var E = Xs, _ = b ? void 0 : E(i);
  return ju(_ || i, function(q, k) {
    _ && (k = q, q = i[k]), Va(h, k, us(q, t, e, k, i, l));
  }), h;
}
var Ph = 1, $h = 4;
function fi(i) {
  return us(i, Ph | $h);
}
var Hh = "__lodash_hash_undefined__";
function Uh(i) {
  return this.__data__.set(i, Hh), this;
}
function Fh(i) {
  return this.__data__.has(i);
}
function ds(i) {
  var t = -1, e = i == null ? 0 : i.length;
  for (this.__data__ = new Ir(); ++t < e; )
    this.add(i[t]);
}
ds.prototype.add = ds.prototype.push = Uh;
ds.prototype.has = Fh;
function zh(i, t) {
  for (var e = -1, r = i == null ? 0 : i.length; ++e < r; )
    if (t(i[e], e, i))
      return !0;
  return !1;
}
function Wh(i, t) {
  return i.has(t);
}
var Vh = 1, Gh = 2;
function ul(i, t, e, r, o, l) {
  var h = e & Vh, m = i.length, b = t.length;
  if (m != b && !(h && b > m))
    return !1;
  var x = l.get(i), C = l.get(t);
  if (x && C)
    return x == t && C == i;
  var R = -1, E = !0, _ = e & Gh ? new ds() : void 0;
  for (l.set(i, t), l.set(t, i); ++R < m; ) {
    var q = i[R], k = t[R];
    if (r)
      var F = h ? r(k, q, R, t, i, l) : r(q, k, R, i, t, l);
    if (F !== void 0) {
      if (F)
        continue;
      E = !1;
      break;
    }
    if (_) {
      if (!zh(t, function(j, Y) {
        if (!Wh(_, Y) && (q === j || o(q, j, e, r, l)))
          return _.push(Y);
      })) {
        E = !1;
        break;
      }
    } else if (!(q === k || o(q, k, e, r, l))) {
      E = !1;
      break;
    }
  }
  return l.delete(i), l.delete(t), E;
}
function Kh(i) {
  var t = -1, e = Array(i.size);
  return i.forEach(function(r, o) {
    e[++t] = [o, r];
  }), e;
}
function Zh(i) {
  var t = -1, e = Array(i.size);
  return i.forEach(function(r) {
    e[++t] = r;
  }), e;
}
var Xh = 1, Yh = 2, Qh = "[object Boolean]", Jh = "[object Date]", td = "[object Error]", ed = "[object Map]", nd = "[object Number]", rd = "[object RegExp]", id = "[object Set]", sd = "[object String]", od = "[object Symbol]", ad = "[object ArrayBuffer]", ld = "[object DataView]", na = rr ? rr.prototype : void 0, Ds = na ? na.valueOf : void 0;
function ud(i, t, e, r, o, l, h) {
  switch (e) {
    case ld:
      if (i.byteLength != t.byteLength || i.byteOffset != t.byteOffset)
        return !1;
      i = i.buffer, t = t.buffer;
    case ad:
      return !(i.byteLength != t.byteLength || !l(new hs(i), new hs(t)));
    case Qh:
    case Jh:
    case nd:
      return Ui(+i, +t);
    case td:
      return i.name == t.name && i.message == t.message;
    case rd:
    case sd:
      return i == t + "";
    case ed:
      var m = Kh;
    case id:
      var b = r & Xh;
      if (m || (m = Zh), i.size != t.size && !b)
        return !1;
      var x = h.get(i);
      if (x)
        return x == t;
      r |= Yh, h.set(i, t);
      var C = ul(m(i), m(t), r, o, l, h);
      return h.delete(i), C;
    case od:
      if (Ds)
        return Ds.call(i) == Ds.call(t);
  }
  return !1;
}
var cd = 1, fd = Object.prototype, hd = fd.hasOwnProperty;
function dd(i, t, e, r, o, l) {
  var h = e & cd, m = Xs(i), b = m.length, x = Xs(t), C = x.length;
  if (b != C && !h)
    return !1;
  for (var R = b; R--; ) {
    var E = m[R];
    if (!(h ? E in t : hd.call(t, E)))
      return !1;
  }
  var _ = l.get(i), q = l.get(t);
  if (_ && q)
    return _ == t && q == i;
  var k = !0;
  l.set(i, t), l.set(t, i);
  for (var F = h; ++R < b; ) {
    E = m[R];
    var j = i[E], Y = t[E];
    if (r)
      var rt = h ? r(Y, j, E, t, i, l) : r(j, Y, E, i, t, l);
    if (!(rt === void 0 ? j === Y || o(j, Y, e, r, l) : rt)) {
      k = !1;
      break;
    }
    F || (F = E == "constructor");
  }
  if (k && !F) {
    var dt = i.constructor, ht = t.constructor;
    dt != ht && "constructor" in i && "constructor" in t && !(typeof dt == "function" && dt instanceof dt && typeof ht == "function" && ht instanceof ht) && (k = !1);
  }
  return l.delete(i), l.delete(t), k;
}
var pd = 1, ra = "[object Arguments]", ia = "[object Array]", Yi = "[object Object]", gd = Object.prototype, sa = gd.hasOwnProperty;
function md(i, t, e, r, o, l) {
  var h = Cr(i), m = Cr(t), b = h ? ia : Xe(i), x = m ? ia : Xe(t);
  b = b == ra ? Yi : b, x = x == ra ? Yi : x;
  var C = b == Yi, R = x == Yi, E = b == x;
  if (E && Di(i)) {
    if (!Di(t))
      return !1;
    h = !0, C = !1;
  }
  if (E && !C)
    return l || (l = new xn()), h || go(i) ? ul(i, t, e, r, o, l) : ud(i, t, b, e, r, o, l);
  if (!(e & pd)) {
    var _ = C && sa.call(i, "__wrapped__"), q = R && sa.call(t, "__wrapped__");
    if (_ || q) {
      var k = _ ? i.value() : i, F = q ? t.value() : t;
      return l || (l = new xn()), o(k, F, e, r, l);
    }
  }
  return E ? (l || (l = new xn()), dd(i, t, e, r, o, l)) : !1;
}
function cl(i, t, e, r, o) {
  return i === t ? !0 : i == null || t == null || !Dn(i) && !Dn(t) ? i !== i && t !== t : md(i, t, e, r, cl, o);
}
function yd(i) {
  return function(t, e, r) {
    for (var o = -1, l = Object(t), h = r(t), m = h.length; m--; ) {
      var b = h[++o];
      if (e(l[b], b, l) === !1)
        break;
    }
    return t;
  };
}
var bd = yd();
function to(i, t, e) {
  (e !== void 0 && !Ui(i[t], e) || e === void 0 && !(t in i)) && fo(i, t, e);
}
function vd(i) {
  return Dn(i) && ys(i);
}
function eo(i, t) {
  if (!(t === "constructor" && typeof i[t] == "function") && t != "__proto__")
    return i[t];
}
function xd(i) {
  return Uu(i, Ja(i));
}
function wd(i, t, e, r, o, l, h) {
  var m = eo(i, e), b = eo(t, e), x = h.get(b);
  if (x) {
    to(i, e, x);
    return;
  }
  var C = l ? l(m, b, e + "", i, t, h) : void 0, R = C === void 0;
  if (R) {
    var E = Cr(b), _ = !E && Di(b), q = !E && !_ && go(b);
    C = b, E || _ || q ? Cr(m) ? C = m : vd(m) ? C = qu(m) : _ ? (R = !1, C = rl(b, !0)) : q ? (R = !1, C = il(b, !0)) : C = [] : mf(b) || Zs(b) ? (C = m, Zs(m) ? C = xd(m) : (!ir(m) || co(m)) && (C = sl(b))) : R = !1;
  }
  R && (h.set(b, C), o(C, b, r, l, h), h.delete(b)), to(i, e, C);
}
function fl(i, t, e, r, o) {
  i !== t && bd(t, function(l, h) {
    if (o || (o = new xn()), ir(l))
      wd(i, t, h, e, fl, r, o);
    else {
      var m = r ? r(eo(i, h), l, h + "", i, t, o) : void 0;
      m === void 0 && (m = l), to(i, h, m);
    }
  }, Ja);
}
function yo(i, t) {
  return cl(i, t);
}
var er = Gu(function(i, t, e) {
  fl(i, t, e);
}), lt = /* @__PURE__ */ ((i) => (i[i.TYPE = 3] = "TYPE", i[i.LEVEL = 12] = "LEVEL", i[i.ATTRIBUTE = 13] = "ATTRIBUTE", i[i.BLOT = 14] = "BLOT", i[i.INLINE = 7] = "INLINE", i[i.BLOCK = 11] = "BLOCK", i[i.BLOCK_BLOT = 10] = "BLOCK_BLOT", i[i.INLINE_BLOT = 6] = "INLINE_BLOT", i[i.BLOCK_ATTRIBUTE = 9] = "BLOCK_ATTRIBUTE", i[i.INLINE_ATTRIBUTE = 5] = "INLINE_ATTRIBUTE", i[i.ANY = 15] = "ANY", i))(lt || {});
class wn {
  constructor(t, e, r = {}) {
    this.attrName = t, this.keyName = e;
    const o = lt.TYPE & lt.ATTRIBUTE;
    this.scope = r.scope != null ? (
      // Ignore type bits, force attribute bit
      r.scope & lt.LEVEL | o
    ) : lt.ATTRIBUTE, r.whitelist != null && (this.whitelist = r.whitelist);
  }
  static keys(t) {
    return Array.from(t.attributes).map((e) => e.name);
  }
  add(t, e) {
    return this.canAdd(t, e) ? (t.setAttribute(this.keyName, e), !0) : !1;
  }
  canAdd(t, e) {
    return this.whitelist == null ? !0 : typeof e == "string" ? this.whitelist.indexOf(e.replace(/["']/g, "")) > -1 : this.whitelist.indexOf(e) > -1;
  }
  remove(t) {
    t.removeAttribute(this.keyName);
  }
  value(t) {
    const e = t.getAttribute(this.keyName);
    return this.canAdd(t, e) && e ? e : "";
  }
}
class hi extends Error {
  constructor(t) {
    t = "[Parchment] " + t, super(t), this.message = t, this.name = this.constructor.name;
  }
}
const hl = class no {
  constructor() {
    this.attributes = {}, this.classes = {}, this.tags = {}, this.types = {};
  }
  static find(t, e = !1) {
    if (t == null)
      return null;
    if (this.blots.has(t))
      return this.blots.get(t) || null;
    if (e) {
      let r = null;
      try {
        r = t.parentNode;
      } catch {
        return null;
      }
      return this.find(r, e);
    }
    return null;
  }
  create(t, e, r) {
    const o = this.query(e);
    if (o == null)
      throw new hi(`Unable to create ${e} blot`);
    const l = o, h = (
      // @ts-expect-error Fix me later
      e instanceof Node || e.nodeType === Node.TEXT_NODE ? e : l.create(r)
    ), m = new l(t, h, r);
    return no.blots.set(m.domNode, m), m;
  }
  find(t, e = !1) {
    return no.find(t, e);
  }
  query(t, e = lt.ANY) {
    let r;
    return typeof t == "string" ? r = this.types[t] || this.attributes[t] : t instanceof Text || t.nodeType === Node.TEXT_NODE ? r = this.types.text : typeof t == "number" ? t & lt.LEVEL & lt.BLOCK ? r = this.types.block : t & lt.LEVEL & lt.INLINE && (r = this.types.inline) : t instanceof Element && ((t.getAttribute("class") || "").split(/\s+/).some((o) => (r = this.classes[o], !!r)), r = r || this.tags[t.tagName]), r == null ? null : "scope" in r && e & lt.LEVEL & r.scope && e & lt.TYPE & r.scope ? r : null;
  }
  register(...t) {
    return t.map((e) => {
      const r = "blotName" in e, o = "attrName" in e;
      if (!r && !o)
        throw new hi("Invalid definition");
      if (r && e.blotName === "abstract")
        throw new hi("Cannot register abstract class");
      const l = r ? e.blotName : o ? e.attrName : void 0;
      return this.types[l] = e, o ? typeof e.keyName == "string" && (this.attributes[e.keyName] = e) : r && (e.className && (this.classes[e.className] = e), e.tagName && (Array.isArray(e.tagName) ? e.tagName = e.tagName.map((h) => h.toUpperCase()) : e.tagName = e.tagName.toUpperCase(), (Array.isArray(e.tagName) ? e.tagName : [e.tagName]).forEach((h) => {
        (this.tags[h] == null || e.className == null) && (this.tags[h] = e);
      }))), e;
    });
  }
};
hl.blots = /* @__PURE__ */ new WeakMap();
let gi = hl;
function oa(i, t) {
  return (i.getAttribute("class") || "").split(/\s+/).filter((e) => e.indexOf(`${t}-`) === 0);
}
class Td extends wn {
  static keys(t) {
    return (t.getAttribute("class") || "").split(/\s+/).map((e) => e.split("-").slice(0, -1).join("-"));
  }
  add(t, e) {
    return this.canAdd(t, e) ? (this.remove(t), t.classList.add(`${this.keyName}-${e}`), !0) : !1;
  }
  remove(t) {
    oa(t, this.keyName).forEach((e) => {
      t.classList.remove(e);
    }), t.classList.length === 0 && t.removeAttribute("class");
  }
  value(t) {
    const e = (oa(t, this.keyName)[0] || "").slice(this.keyName.length + 1);
    return this.canAdd(t, e) ? e : "";
  }
}
const en = Td;
function js(i) {
  const t = i.split("-"), e = t.slice(1).map((r) => r[0].toUpperCase() + r.slice(1)).join("");
  return t[0] + e;
}
class Ed extends wn {
  static keys(t) {
    return (t.getAttribute("style") || "").split(";").map((e) => e.split(":")[0].trim());
  }
  add(t, e) {
    return this.canAdd(t, e) ? (t.style[js(this.keyName)] = e, !0) : !1;
  }
  remove(t) {
    t.style[js(this.keyName)] = "", t.getAttribute("style") || t.removeAttribute("style");
  }
  value(t) {
    const e = t.style[js(this.keyName)];
    return this.canAdd(t, e) ? e : "";
  }
}
const sr = Ed;
class Ad {
  constructor(t) {
    this.attributes = {}, this.domNode = t, this.build();
  }
  attribute(t, e) {
    e ? t.add(this.domNode, e) && (t.value(this.domNode) != null ? this.attributes[t.attrName] = t : delete this.attributes[t.attrName]) : (t.remove(this.domNode), delete this.attributes[t.attrName]);
  }
  build() {
    this.attributes = {};
    const t = gi.find(this.domNode);
    if (t == null)
      return;
    const e = wn.keys(this.domNode), r = en.keys(this.domNode), o = sr.keys(this.domNode);
    e.concat(r).concat(o).forEach((l) => {
      const h = t.scroll.query(l, lt.ATTRIBUTE);
      h instanceof wn && (this.attributes[h.attrName] = h);
    });
  }
  copy(t) {
    Object.keys(this.attributes).forEach((e) => {
      const r = this.attributes[e].value(this.domNode);
      t.format(e, r);
    });
  }
  move(t) {
    this.copy(t), Object.keys(this.attributes).forEach((e) => {
      this.attributes[e].remove(this.domNode);
    }), this.attributes = {};
  }
  values() {
    return Object.keys(this.attributes).reduce(
      (t, e) => (t[e] = this.attributes[e].value(this.domNode), t),
      {}
    );
  }
}
const xs = Ad, dl = class {
  constructor(t, e) {
    this.scroll = t, this.domNode = e, gi.blots.set(e, this), this.prev = null, this.next = null;
  }
  static create(t) {
    if (this.tagName == null)
      throw new hi("Blot definition missing tagName");
    let e, r;
    return Array.isArray(this.tagName) ? (typeof t == "string" ? (r = t.toUpperCase(), parseInt(r, 10).toString() === r && (r = parseInt(r, 10))) : typeof t == "number" && (r = t), typeof r == "number" ? e = document.createElement(this.tagName[r - 1]) : r && this.tagName.indexOf(r) > -1 ? e = document.createElement(r) : e = document.createElement(this.tagName[0])) : e = document.createElement(this.tagName), this.className && e.classList.add(this.className), e;
  }
  // Hack for accessing inherited static methods
  get statics() {
    return this.constructor;
  }
  attach() {
  }
  clone() {
    const t = this.domNode.cloneNode(!1);
    return this.scroll.create(t);
  }
  detach() {
    this.parent != null && this.parent.removeChild(this), gi.blots.delete(this.domNode);
  }
  deleteAt(t, e) {
    this.isolate(t, e).remove();
  }
  formatAt(t, e, r, o) {
    const l = this.isolate(t, e);
    if (this.scroll.query(r, lt.BLOT) != null && o)
      l.wrap(r, o);
    else if (this.scroll.query(r, lt.ATTRIBUTE) != null) {
      const h = this.scroll.create(this.statics.scope);
      l.wrap(h), h.format(r, o);
    }
  }
  insertAt(t, e, r) {
    const o = r == null ? this.scroll.create("text", e) : this.scroll.create(e, r), l = this.split(t);
    this.parent.insertBefore(o, l || void 0);
  }
  isolate(t, e) {
    const r = this.split(t);
    if (r == null)
      throw new Error("Attempt to isolate at end");
    return r.split(e), r;
  }
  length() {
    return 1;
  }
  offset(t = this.parent) {
    return this.parent == null || this === t ? 0 : this.parent.children.offset(this) + this.parent.offset(t);
  }
  optimize(t) {
    this.statics.requiredContainer && !(this.parent instanceof this.statics.requiredContainer) && this.wrap(this.statics.requiredContainer.blotName);
  }
  remove() {
    this.domNode.parentNode != null && this.domNode.parentNode.removeChild(this.domNode), this.detach();
  }
  replaceWith(t, e) {
    const r = typeof t == "string" ? this.scroll.create(t, e) : t;
    return this.parent != null && (this.parent.insertBefore(r, this.next || void 0), this.remove()), r;
  }
  split(t, e) {
    return t === 0 ? this : this.next;
  }
  update(t, e) {
  }
  wrap(t, e) {
    const r = typeof t == "string" ? this.scroll.create(t, e) : t;
    if (this.parent != null && this.parent.insertBefore(r, this.next || void 0), typeof r.appendChild != "function")
      throw new hi(`Cannot wrap ${t}`);
    return r.appendChild(this), r;
  }
};
dl.blotName = "abstract";
let pl = dl;
const gl = class extends pl {
  /**
   * Returns the value represented by domNode if it is this Blot's type
   * No checking that domNode can represent this Blot type is required so
   * applications needing it should check externally before calling.
   */
  static value(t) {
    return !0;
  }
  /**
   * Given location represented by node and offset from DOM Selection Range,
   * return index to that location.
   */
  index(t, e) {
    return this.domNode === t || this.domNode.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_CONTAINED_BY ? Math.min(e, 1) : -1;
  }
  /**
   * Given index to location within blot, return node and offset representing
   * that location, consumable by DOM Selection Range
   */
  position(t, e) {
    let r = Array.from(this.parent.domNode.childNodes).indexOf(this.domNode);
    return t > 0 && (r += 1), [this.parent.domNode, r];
  }
  /**
   * Return value represented by this blot
   * Should not change without interaction from API or
   * user change detectable by update()
   */
  value() {
    return {
      [this.statics.blotName]: this.statics.value(this.domNode) || !0
    };
  }
};
gl.scope = lt.INLINE_BLOT;
let Nd = gl;
const ge = Nd;
class Sd {
  constructor() {
    this.head = null, this.tail = null, this.length = 0;
  }
  append(...t) {
    if (this.insertBefore(t[0], null), t.length > 1) {
      const e = t.slice(1);
      this.append(...e);
    }
  }
  at(t) {
    const e = this.iterator();
    let r = e();
    for (; r && t > 0; )
      t -= 1, r = e();
    return r;
  }
  contains(t) {
    const e = this.iterator();
    let r = e();
    for (; r; ) {
      if (r === t)
        return !0;
      r = e();
    }
    return !1;
  }
  indexOf(t) {
    const e = this.iterator();
    let r = e(), o = 0;
    for (; r; ) {
      if (r === t)
        return o;
      o += 1, r = e();
    }
    return -1;
  }
  insertBefore(t, e) {
    t != null && (this.remove(t), t.next = e, e != null ? (t.prev = e.prev, e.prev != null && (e.prev.next = t), e.prev = t, e === this.head && (this.head = t)) : this.tail != null ? (this.tail.next = t, t.prev = this.tail, this.tail = t) : (t.prev = null, this.head = this.tail = t), this.length += 1);
  }
  offset(t) {
    let e = 0, r = this.head;
    for (; r != null; ) {
      if (r === t)
        return e;
      e += r.length(), r = r.next;
    }
    return -1;
  }
  remove(t) {
    this.contains(t) && (t.prev != null && (t.prev.next = t.next), t.next != null && (t.next.prev = t.prev), t === this.head && (this.head = t.next), t === this.tail && (this.tail = t.prev), this.length -= 1);
  }
  iterator(t = this.head) {
    return () => {
      const e = t;
      return t != null && (t = t.next), e;
    };
  }
  find(t, e = !1) {
    const r = this.iterator();
    let o = r();
    for (; o; ) {
      const l = o.length();
      if (t < l || e && t === l && (o.next == null || o.next.length() !== 0))
        return [o, t];
      t -= l, o = r();
    }
    return [null, 0];
  }
  forEach(t) {
    const e = this.iterator();
    let r = e();
    for (; r; )
      t(r), r = e();
  }
  forEachAt(t, e, r) {
    if (e <= 0)
      return;
    const [o, l] = this.find(t);
    let h = t - l;
    const m = this.iterator(o);
    let b = m();
    for (; b && h < t + e; ) {
      const x = b.length();
      t > h ? r(
        b,
        t - h,
        Math.min(e, h + x - t)
      ) : r(b, 0, Math.min(x, t + e - h)), h += x, b = m();
    }
  }
  map(t) {
    return this.reduce((e, r) => (e.push(t(r)), e), []);
  }
  reduce(t, e) {
    const r = this.iterator();
    let o = r();
    for (; o; )
      e = t(e, o), o = r();
    return e;
  }
}
function aa(i, t) {
  const e = t.find(i);
  if (e)
    return e;
  try {
    return t.create(i);
  } catch {
    const r = t.create(lt.INLINE);
    return Array.from(i.childNodes).forEach((o) => {
      r.domNode.appendChild(o);
    }), i.parentNode && i.parentNode.replaceChild(r.domNode, i), r.attach(), r;
  }
}
const ml = class Qn extends pl {
  constructor(t, e) {
    super(t, e), this.uiNode = null, this.build();
  }
  appendChild(t) {
    this.insertBefore(t);
  }
  attach() {
    super.attach(), this.children.forEach((t) => {
      t.attach();
    });
  }
  attachUI(t) {
    this.uiNode != null && this.uiNode.remove(), this.uiNode = t, Qn.uiClass && this.uiNode.classList.add(Qn.uiClass), this.uiNode.setAttribute("contenteditable", "false"), this.domNode.insertBefore(this.uiNode, this.domNode.firstChild);
  }
  /**
   * Called during construction, should fill its own children LinkedList.
   */
  build() {
    this.children = new Sd(), Array.from(this.domNode.childNodes).filter((t) => t !== this.uiNode).reverse().forEach((t) => {
      try {
        const e = aa(t, this.scroll);
        this.insertBefore(e, this.children.head || void 0);
      } catch (e) {
        if (e instanceof hi)
          return;
        throw e;
      }
    });
  }
  deleteAt(t, e) {
    if (t === 0 && e === this.length())
      return this.remove();
    this.children.forEachAt(t, e, (r, o, l) => {
      r.deleteAt(o, l);
    });
  }
  descendant(t, e = 0) {
    const [r, o] = this.children.find(e);
    return t.blotName == null && t(r) || t.blotName != null && r instanceof t ? [r, o] : r instanceof Qn ? r.descendant(t, o) : [null, -1];
  }
  descendants(t, e = 0, r = Number.MAX_VALUE) {
    let o = [], l = r;
    return this.children.forEachAt(
      e,
      r,
      (h, m, b) => {
        (t.blotName == null && t(h) || t.blotName != null && h instanceof t) && o.push(h), h instanceof Qn && (o = o.concat(
          h.descendants(t, m, l)
        )), l -= b;
      }
    ), o;
  }
  detach() {
    this.children.forEach((t) => {
      t.detach();
    }), super.detach();
  }
  enforceAllowedChildren() {
    let t = !1;
    this.children.forEach((e) => {
      t || this.statics.allowedChildren.some(
        (r) => e instanceof r
      ) || (e.statics.scope === lt.BLOCK_BLOT ? (e.next != null && this.splitAfter(e), e.prev != null && this.splitAfter(e.prev), e.parent.unwrap(), t = !0) : e instanceof Qn ? e.unwrap() : e.remove());
    });
  }
  formatAt(t, e, r, o) {
    this.children.forEachAt(t, e, (l, h, m) => {
      l.formatAt(h, m, r, o);
    });
  }
  insertAt(t, e, r) {
    const [o, l] = this.children.find(t);
    if (o)
      o.insertAt(l, e, r);
    else {
      const h = r == null ? this.scroll.create("text", e) : this.scroll.create(e, r);
      this.appendChild(h);
    }
  }
  insertBefore(t, e) {
    t.parent != null && t.parent.children.remove(t);
    let r = null;
    this.children.insertBefore(t, e || null), t.parent = this, e != null && (r = e.domNode), (this.domNode.parentNode !== t.domNode || this.domNode.nextSibling !== r) && this.domNode.insertBefore(t.domNode, r), t.attach();
  }
  length() {
    return this.children.reduce((t, e) => t + e.length(), 0);
  }
  moveChildren(t, e) {
    this.children.forEach((r) => {
      t.insertBefore(r, e);
    });
  }
  optimize(t) {
    if (super.optimize(t), this.enforceAllowedChildren(), this.uiNode != null && this.uiNode !== this.domNode.firstChild && this.domNode.insertBefore(this.uiNode, this.domNode.firstChild), this.children.length === 0)
      if (this.statics.defaultChild != null) {
        const e = this.scroll.create(this.statics.defaultChild.blotName);
        this.appendChild(e);
      } else
        this.remove();
  }
  path(t, e = !1) {
    const [r, o] = this.children.find(t, e), l = [[this, t]];
    return r instanceof Qn ? l.concat(r.path(o, e)) : (r != null && l.push([r, o]), l);
  }
  removeChild(t) {
    this.children.remove(t);
  }
  replaceWith(t, e) {
    const r = typeof t == "string" ? this.scroll.create(t, e) : t;
    return r instanceof Qn && this.moveChildren(r), super.replaceWith(r);
  }
  split(t, e = !1) {
    if (!e) {
      if (t === 0)
        return this;
      if (t === this.length())
        return this.next;
    }
    const r = this.clone();
    return this.parent && this.parent.insertBefore(r, this.next || void 0), this.children.forEachAt(t, this.length(), (o, l, h) => {
      const m = o.split(l, e);
      m != null && r.appendChild(m);
    }), r;
  }
  splitAfter(t) {
    const e = this.clone();
    for (; t.next != null; )
      e.appendChild(t.next);
    return this.parent && this.parent.insertBefore(e, this.next || void 0), e;
  }
  unwrap() {
    this.parent && this.moveChildren(this.parent, this.next || void 0), this.remove();
  }
  update(t, e) {
    const r = [], o = [];
    t.forEach((l) => {
      l.target === this.domNode && l.type === "childList" && (r.push(...l.addedNodes), o.push(...l.removedNodes));
    }), o.forEach((l) => {
      if (l.parentNode != null && // @ts-expect-error Fix me later
      l.tagName !== "IFRAME" && document.body.compareDocumentPosition(l) & Node.DOCUMENT_POSITION_CONTAINED_BY)
        return;
      const h = this.scroll.find(l);
      h != null && (h.domNode.parentNode == null || h.domNode.parentNode === this.domNode) && h.detach();
    }), r.filter((l) => l.parentNode === this.domNode && l !== this.uiNode).sort((l, h) => l === h ? 0 : l.compareDocumentPosition(h) & Node.DOCUMENT_POSITION_FOLLOWING ? 1 : -1).forEach((l) => {
      let h = null;
      l.nextSibling != null && (h = this.scroll.find(l.nextSibling));
      const m = aa(l, this.scroll);
      (m.next !== h || m.next == null) && (m.parent != null && m.parent.removeChild(this), this.insertBefore(m, h || void 0));
    }), this.enforceAllowedChildren();
  }
};
ml.uiClass = "";
let Cd = ml;
const Je = Cd;
function Ld(i, t) {
  if (Object.keys(i).length !== Object.keys(t).length)
    return !1;
  for (const e in i)
    if (i[e] !== t[e])
      return !1;
  return !0;
}
const oi = class ai extends Je {
  static create(t) {
    return super.create(t);
  }
  static formats(t, e) {
    const r = e.query(ai.blotName);
    if (!(r != null && t.tagName === r.tagName)) {
      if (typeof this.tagName == "string")
        return !0;
      if (Array.isArray(this.tagName))
        return t.tagName.toLowerCase();
    }
  }
  constructor(t, e) {
    super(t, e), this.attributes = new xs(this.domNode);
  }
  format(t, e) {
    if (t === this.statics.blotName && !e)
      this.children.forEach((r) => {
        r instanceof ai || (r = r.wrap(ai.blotName, !0)), this.attributes.copy(r);
      }), this.unwrap();
    else {
      const r = this.scroll.query(t, lt.INLINE);
      if (r == null)
        return;
      r instanceof wn ? this.attributes.attribute(r, e) : e && (t !== this.statics.blotName || this.formats()[t] !== e) && this.replaceWith(t, e);
    }
  }
  formats() {
    const t = this.attributes.values(), e = this.statics.formats(this.domNode, this.scroll);
    return e != null && (t[this.statics.blotName] = e), t;
  }
  formatAt(t, e, r, o) {
    this.formats()[r] != null || this.scroll.query(r, lt.ATTRIBUTE) ? this.isolate(t, e).format(r, o) : super.formatAt(t, e, r, o);
  }
  optimize(t) {
    super.optimize(t);
    const e = this.formats();
    if (Object.keys(e).length === 0)
      return this.unwrap();
    const r = this.next;
    r instanceof ai && r.prev === this && Ld(e, r.formats()) && (r.moveChildren(this), r.remove());
  }
  replaceWith(t, e) {
    const r = super.replaceWith(t, e);
    return this.attributes.copy(r), r;
  }
  update(t, e) {
    super.update(t, e), t.some(
      (r) => r.target === this.domNode && r.type === "attributes"
    ) && this.attributes.build();
  }
  wrap(t, e) {
    const r = super.wrap(t, e);
    return r instanceof ai && this.attributes.move(r), r;
  }
};
oi.allowedChildren = [oi, ge], oi.blotName = "inline", oi.scope = lt.INLINE_BLOT, oi.tagName = "SPAN";
let qd = oi;
const bo = qd, li = class ro extends Je {
  static create(t) {
    return super.create(t);
  }
  static formats(t, e) {
    const r = e.query(ro.blotName);
    if (!(r != null && t.tagName === r.tagName)) {
      if (typeof this.tagName == "string")
        return !0;
      if (Array.isArray(this.tagName))
        return t.tagName.toLowerCase();
    }
  }
  constructor(t, e) {
    super(t, e), this.attributes = new xs(this.domNode);
  }
  format(t, e) {
    const r = this.scroll.query(t, lt.BLOCK);
    r != null && (r instanceof wn ? this.attributes.attribute(r, e) : t === this.statics.blotName && !e ? this.replaceWith(ro.blotName) : e && (t !== this.statics.blotName || this.formats()[t] !== e) && this.replaceWith(t, e));
  }
  formats() {
    const t = this.attributes.values(), e = this.statics.formats(this.domNode, this.scroll);
    return e != null && (t[this.statics.blotName] = e), t;
  }
  formatAt(t, e, r, o) {
    this.scroll.query(r, lt.BLOCK) != null ? this.format(r, o) : super.formatAt(t, e, r, o);
  }
  insertAt(t, e, r) {
    if (r == null || this.scroll.query(e, lt.INLINE) != null)
      super.insertAt(t, e, r);
    else {
      const o = this.split(t);
      if (o != null) {
        const l = this.scroll.create(e, r);
        o.parent.insertBefore(l, o);
      } else
        throw new Error("Attempt to insertAt after block boundaries");
    }
  }
  replaceWith(t, e) {
    const r = super.replaceWith(t, e);
    return this.attributes.copy(r), r;
  }
  update(t, e) {
    super.update(t, e), t.some(
      (r) => r.target === this.domNode && r.type === "attributes"
    ) && this.attributes.build();
  }
};
li.blotName = "block", li.scope = lt.BLOCK_BLOT, li.tagName = "P", li.allowedChildren = [
  bo,
  li,
  ge
];
let Od = li;
const Pi = Od, io = class extends Je {
  checkMerge() {
    return this.next !== null && this.next.statics.blotName === this.statics.blotName;
  }
  deleteAt(t, e) {
    super.deleteAt(t, e), this.enforceAllowedChildren();
  }
  formatAt(t, e, r, o) {
    super.formatAt(t, e, r, o), this.enforceAllowedChildren();
  }
  insertAt(t, e, r) {
    super.insertAt(t, e, r), this.enforceAllowedChildren();
  }
  optimize(t) {
    super.optimize(t), this.children.length > 0 && this.next != null && this.checkMerge() && (this.next.moveChildren(this), this.next.remove());
  }
};
io.blotName = "container", io.scope = lt.BLOCK_BLOT;
let _d = io;
const ws = _d;
class kd extends ge {
  static formats(t, e) {
  }
  format(t, e) {
    super.formatAt(0, this.length(), t, e);
  }
  formatAt(t, e, r, o) {
    t === 0 && e === this.length() ? this.format(r, o) : super.formatAt(t, e, r, o);
  }
  formats() {
    return this.statics.formats(this.domNode, this.scroll);
  }
}
const Re = kd, Id = {
  attributes: !0,
  characterData: !0,
  characterDataOldValue: !0,
  childList: !0,
  subtree: !0
}, Rd = 100, ui = class extends Je {
  constructor(t, e) {
    super(null, e), this.registry = t, this.scroll = this, this.build(), this.observer = new MutationObserver((r) => {
      this.update(r);
    }), this.observer.observe(this.domNode, Id), this.attach();
  }
  create(t, e) {
    return this.registry.create(this, t, e);
  }
  find(t, e = !1) {
    const r = this.registry.find(t, e);
    return r ? r.scroll === this ? r : e ? this.find(r.scroll.domNode.parentNode, !0) : null : null;
  }
  query(t, e = lt.ANY) {
    return this.registry.query(t, e);
  }
  register(...t) {
    return this.registry.register(...t);
  }
  build() {
    this.scroll != null && super.build();
  }
  detach() {
    super.detach(), this.observer.disconnect();
  }
  deleteAt(t, e) {
    this.update(), t === 0 && e === this.length() ? this.children.forEach((r) => {
      r.remove();
    }) : super.deleteAt(t, e);
  }
  formatAt(t, e, r, o) {
    this.update(), super.formatAt(t, e, r, o);
  }
  insertAt(t, e, r) {
    this.update(), super.insertAt(t, e, r);
  }
  optimize(t = [], e = {}) {
    super.optimize(e);
    const r = e.mutationsMap || /* @__PURE__ */ new WeakMap();
    let o = Array.from(this.observer.takeRecords());
    for (; o.length > 0; )
      t.push(o.pop());
    const l = (b, x = !0) => {
      b == null || b === this || b.domNode.parentNode != null && (r.has(b.domNode) || r.set(b.domNode, []), x && l(b.parent));
    }, h = (b) => {
      r.has(b.domNode) && (b instanceof Je && b.children.forEach(h), r.delete(b.domNode), b.optimize(e));
    };
    let m = t;
    for (let b = 0; m.length > 0; b += 1) {
      if (b >= Rd)
        throw new Error("[Parchment] Maximum optimize iterations reached");
      for (m.forEach((x) => {
        const C = this.find(x.target, !0);
        C != null && (C.domNode === x.target && (x.type === "childList" ? (l(this.find(x.previousSibling, !1)), Array.from(x.addedNodes).forEach((R) => {
          const E = this.find(R, !1);
          l(E, !1), E instanceof Je && E.children.forEach((_) => {
            l(_, !1);
          });
        })) : x.type === "attributes" && l(C.prev)), l(C));
      }), this.children.forEach(h), m = Array.from(this.observer.takeRecords()), o = m.slice(); o.length > 0; )
        t.push(o.pop());
    }
  }
  update(t, e = {}) {
    t = t || this.observer.takeRecords();
    const r = /* @__PURE__ */ new WeakMap();
    t.map((o) => {
      const l = this.find(o.target, !0);
      return l == null ? null : r.has(l.domNode) ? (r.get(l.domNode).push(o), null) : (r.set(l.domNode, [o]), l);
    }).forEach((o) => {
      o != null && o !== this && r.has(o.domNode) && o.update(r.get(o.domNode) || [], e);
    }), e.mutationsMap = r, r.has(this.domNode) && super.update(r.get(this.domNode), e), this.optimize(t, e);
  }
};
ui.blotName = "scroll", ui.defaultChild = Pi, ui.allowedChildren = [Pi, ws], ui.scope = lt.BLOCK_BLOT, ui.tagName = "DIV";
let Md = ui;
const vo = Md, so = class yl extends ge {
  static create(t) {
    return document.createTextNode(t);
  }
  static value(t) {
    return t.data;
  }
  constructor(t, e) {
    super(t, e), this.text = this.statics.value(this.domNode);
  }
  deleteAt(t, e) {
    this.domNode.data = this.text = this.text.slice(0, t) + this.text.slice(t + e);
  }
  index(t, e) {
    return this.domNode === t ? e : -1;
  }
  insertAt(t, e, r) {
    r == null ? (this.text = this.text.slice(0, t) + e + this.text.slice(t), this.domNode.data = this.text) : super.insertAt(t, e, r);
  }
  length() {
    return this.text.length;
  }
  optimize(t) {
    super.optimize(t), this.text = this.statics.value(this.domNode), this.text.length === 0 ? this.remove() : this.next instanceof yl && this.next.prev === this && (this.insertAt(this.length(), this.next.value()), this.next.remove());
  }
  position(t, e = !1) {
    return [this.domNode, t];
  }
  split(t, e = !1) {
    if (!e) {
      if (t === 0)
        return this;
      if (t === this.length())
        return this.next;
    }
    const r = this.scroll.create(this.domNode.splitText(t));
    return this.parent.insertBefore(r, this.next || void 0), this.text = this.statics.value(this.domNode), r;
  }
  update(t, e) {
    t.some((r) => r.type === "characterData" && r.target === this.domNode) && (this.text = this.statics.value(this.domNode));
  }
  value() {
    return this.text;
  }
};
so.blotName = "text", so.scope = lt.INLINE_BLOT;
let Dd = so;
const ps = Dd, jd = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Attributor: wn,
  AttributorStore: xs,
  BlockBlot: Pi,
  ClassAttributor: en,
  ContainerBlot: ws,
  EmbedBlot: Re,
  InlineBlot: bo,
  LeafBlot: ge,
  ParentBlot: Je,
  Registry: gi,
  Scope: lt,
  ScrollBlot: vo,
  StyleAttributor: sr,
  TextBlot: ps
}, Symbol.toStringTag, { value: "Module" }));
var Jn = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function xo(i) {
  return i && i.__esModule && Object.prototype.hasOwnProperty.call(i, "default") ? i.default : i;
}
var Qi = { exports: {} }, Bs, la;
function Bd() {
  if (la) return Bs;
  la = 1;
  var i = -1, t = 1, e = 0;
  function r(N, V, O, X, K) {
    if (N === V)
      return N ? [[e, N]] : [];
    if (O != null) {
      var z = Nt(N, V, O);
      if (z)
        return z;
    }
    var G = m(N, V), et = N.substring(0, G);
    N = N.substring(G), V = V.substring(G), G = x(N, V);
    var it = N.substring(N.length - G);
    N = N.substring(0, N.length - G), V = V.substring(0, V.length - G);
    var Q = o(N, V);
    return et && Q.unshift([e, et]), it && Q.push([e, it]), Y(Q, K), X && R(Q), Q;
  }
  function o(N, V) {
    var O;
    if (!N)
      return [[t, V]];
    if (!V)
      return [[i, N]];
    var X = N.length > V.length ? N : V, K = N.length > V.length ? V : N, z = X.indexOf(K);
    if (z !== -1)
      return O = [
        [t, X.substring(0, z)],
        [e, K],
        [t, X.substring(z + K.length)]
      ], N.length > V.length && (O[0][0] = O[2][0] = i), O;
    if (K.length === 1)
      return [
        [i, N],
        [t, V]
      ];
    var G = C(N, V);
    if (G) {
      var et = G[0], it = G[1], Q = G[2], vt = G[3], gt = G[4], Tt = r(et, Q), At = r(it, vt);
      return Tt.concat([[e, gt]], At);
    }
    return l(N, V);
  }
  function l(N, V) {
    for (var O = N.length, X = V.length, K = Math.ceil((O + X) / 2), z = K, G = 2 * K, et = new Array(G), it = new Array(G), Q = 0; Q < G; Q++)
      et[Q] = -1, it[Q] = -1;
    et[z + 1] = 0, it[z + 1] = 0;
    for (var vt = O - X, gt = vt % 2 !== 0, Tt = 0, At = 0, ct = 0, $t = 0, Ht = 0; Ht < K; Ht++) {
      for (var xt = -Ht + Tt; xt <= Ht - At; xt += 2) {
        var It = z + xt, wt;
        xt === -Ht || xt !== Ht && et[It - 1] < et[It + 1] ? wt = et[It + 1] : wt = et[It - 1] + 1;
        for (var jt = wt - xt; wt < O && jt < X && N.charAt(wt) === V.charAt(jt); )
          wt++, jt++;
        if (et[It] = wt, wt > O)
          At += 2;
        else if (jt > X)
          Tt += 2;
        else if (gt) {
          var Lt = z + vt - xt;
          if (Lt >= 0 && Lt < G && it[Lt] !== -1) {
            var Rt = O - it[Lt];
            if (wt >= Rt)
              return h(N, V, wt, jt);
          }
        }
      }
      for (var Vt = -Ht + ct; Vt <= Ht - $t; Vt += 2) {
        var Lt = z + Vt, Rt;
        Vt === -Ht || Vt !== Ht && it[Lt - 1] < it[Lt + 1] ? Rt = it[Lt + 1] : Rt = it[Lt - 1] + 1;
        for (var ee = Rt - Vt; Rt < O && ee < X && N.charAt(O - Rt - 1) === V.charAt(X - ee - 1); )
          Rt++, ee++;
        if (it[Lt] = Rt, Rt > O)
          $t += 2;
        else if (ee > X)
          ct += 2;
        else if (!gt) {
          var It = z + vt - Vt;
          if (It >= 0 && It < G && et[It] !== -1) {
            var wt = et[It], jt = z + wt - It;
            if (Rt = O - Rt, wt >= Rt)
              return h(N, V, wt, jt);
          }
        }
      }
    }
    return [
      [i, N],
      [t, V]
    ];
  }
  function h(N, V, O, X) {
    var K = N.substring(0, O), z = V.substring(0, X), G = N.substring(O), et = V.substring(X), it = r(K, z), Q = r(G, et);
    return it.concat(Q);
  }
  function m(N, V) {
    if (!N || !V || N.charAt(0) !== V.charAt(0))
      return 0;
    for (var O = 0, X = Math.min(N.length, V.length), K = X, z = 0; O < K; )
      N.substring(z, K) == V.substring(z, K) ? (O = K, z = O) : X = K, K = Math.floor((X - O) / 2 + O);
    return rt(N.charCodeAt(K - 1)) && K--, K;
  }
  function b(N, V) {
    var O = N.length, X = V.length;
    if (O == 0 || X == 0)
      return 0;
    O > X ? N = N.substring(O - X) : O < X && (V = V.substring(0, O));
    var K = Math.min(O, X);
    if (N == V)
      return K;
    for (var z = 0, G = 1; ; ) {
      var et = N.substring(K - G), it = V.indexOf(et);
      if (it == -1)
        return z;
      G += it, (it == 0 || N.substring(K - G) == V.substring(0, G)) && (z = G, G++);
    }
  }
  function x(N, V) {
    if (!N || !V || N.slice(-1) !== V.slice(-1))
      return 0;
    for (var O = 0, X = Math.min(N.length, V.length), K = X, z = 0; O < K; )
      N.substring(N.length - K, N.length - z) == V.substring(V.length - K, V.length - z) ? (O = K, z = O) : X = K, K = Math.floor((X - O) / 2 + O);
    return dt(N.charCodeAt(N.length - K)) && K--, K;
  }
  function C(N, V) {
    var O = N.length > V.length ? N : V, X = N.length > V.length ? V : N;
    if (O.length < 4 || X.length * 2 < O.length)
      return null;
    function K(At, ct, $t) {
      for (var Ht = At.substring($t, $t + Math.floor(At.length / 4)), xt = -1, It = "", wt, jt, Lt, Rt; (xt = ct.indexOf(Ht, xt + 1)) !== -1; ) {
        var Vt = m(
          At.substring($t),
          ct.substring(xt)
        ), ee = x(
          At.substring(0, $t),
          ct.substring(0, xt)
        );
        It.length < ee + Vt && (It = ct.substring(xt - ee, xt) + ct.substring(xt, xt + Vt), wt = At.substring(0, $t - ee), jt = At.substring($t + Vt), Lt = ct.substring(0, xt - ee), Rt = ct.substring(xt + Vt));
      }
      return It.length * 2 >= At.length ? [
        wt,
        jt,
        Lt,
        Rt,
        It
      ] : null;
    }
    var z = K(
      O,
      X,
      Math.ceil(O.length / 4)
    ), G = K(
      O,
      X,
      Math.ceil(O.length / 2)
    ), et;
    if (!z && !G)
      return null;
    G ? z ? et = z[4].length > G[4].length ? z : G : et = G : et = z;
    var it, Q, vt, gt;
    N.length > V.length ? (it = et[0], Q = et[1], vt = et[2], gt = et[3]) : (vt = et[0], gt = et[1], it = et[2], Q = et[3]);
    var Tt = et[4];
    return [it, Q, vt, gt, Tt];
  }
  function R(N) {
    for (var V = !1, O = [], X = 0, K = null, z = 0, G = 0, et = 0, it = 0, Q = 0; z < N.length; )
      N[z][0] == e ? (O[X++] = z, G = it, et = Q, it = 0, Q = 0, K = N[z][1]) : (N[z][0] == t ? it += N[z][1].length : Q += N[z][1].length, K && K.length <= Math.max(G, et) && K.length <= Math.max(it, Q) && (N.splice(O[X - 1], 0, [
        i,
        K
      ]), N[O[X - 1] + 1][0] = t, X--, X--, z = X > 0 ? O[X - 1] : -1, G = 0, et = 0, it = 0, Q = 0, K = null, V = !0)), z++;
    for (V && Y(N), j(N), z = 1; z < N.length; ) {
      if (N[z - 1][0] == i && N[z][0] == t) {
        var vt = N[z - 1][1], gt = N[z][1], Tt = b(vt, gt), At = b(gt, vt);
        Tt >= At ? (Tt >= vt.length / 2 || Tt >= gt.length / 2) && (N.splice(z, 0, [
          e,
          gt.substring(0, Tt)
        ]), N[z - 1][1] = vt.substring(
          0,
          vt.length - Tt
        ), N[z + 1][1] = gt.substring(Tt), z++) : (At >= vt.length / 2 || At >= gt.length / 2) && (N.splice(z, 0, [
          e,
          vt.substring(0, At)
        ]), N[z - 1][0] = t, N[z - 1][1] = gt.substring(
          0,
          gt.length - At
        ), N[z + 1][0] = i, N[z + 1][1] = vt.substring(At), z++), z++;
      }
      z++;
    }
  }
  var E = /[^a-zA-Z0-9]/, _ = /\s/, q = /[\r\n]/, k = /\n\r?\n$/, F = /^\r?\n\r?\n/;
  function j(N) {
    function V(At, ct) {
      if (!At || !ct)
        return 6;
      var $t = At.charAt(At.length - 1), Ht = ct.charAt(0), xt = $t.match(E), It = Ht.match(E), wt = xt && $t.match(_), jt = It && Ht.match(_), Lt = wt && $t.match(q), Rt = jt && Ht.match(q), Vt = Lt && At.match(k), ee = Rt && ct.match(F);
      return Vt || ee ? 5 : Lt || Rt ? 4 : xt && !wt && jt ? 3 : wt || jt ? 2 : xt || It ? 1 : 0;
    }
    for (var O = 1; O < N.length - 1; ) {
      if (N[O - 1][0] == e && N[O + 1][0] == e) {
        var X = N[O - 1][1], K = N[O][1], z = N[O + 1][1], G = x(X, K);
        if (G) {
          var et = K.substring(K.length - G);
          X = X.substring(0, X.length - G), K = et + K.substring(0, K.length - G), z = et + z;
        }
        for (var it = X, Q = K, vt = z, gt = V(X, K) + V(K, z); K.charAt(0) === z.charAt(0); ) {
          X += K.charAt(0), K = K.substring(1) + z.charAt(0), z = z.substring(1);
          var Tt = V(X, K) + V(K, z);
          Tt >= gt && (gt = Tt, it = X, Q = K, vt = z);
        }
        N[O - 1][1] != it && (it ? N[O - 1][1] = it : (N.splice(O - 1, 1), O--), N[O][1] = Q, vt ? N[O + 1][1] = vt : (N.splice(O + 1, 1), O--));
      }
      O++;
    }
  }
  function Y(N, V) {
    N.push([e, ""]);
    for (var O = 0, X = 0, K = 0, z = "", G = "", et; O < N.length; ) {
      if (O < N.length - 1 && !N[O][1]) {
        N.splice(O, 1);
        continue;
      }
      switch (N[O][0]) {
        case t:
          K++, G += N[O][1], O++;
          break;
        case i:
          X++, z += N[O][1], O++;
          break;
        case e:
          var it = O - K - X - 1;
          if (V) {
            if (it >= 0 && Pt(N[it][1])) {
              var Q = N[it][1].slice(-1);
              if (N[it][1] = N[it][1].slice(
                0,
                -1
              ), z = Q + z, G = Q + G, !N[it][1]) {
                N.splice(it, 1), O--;
                var vt = it - 1;
                N[vt] && N[vt][0] === t && (K++, G = N[vt][1] + G, vt--), N[vt] && N[vt][0] === i && (X++, z = N[vt][1] + z, vt--), it = vt;
              }
            }
            if (ht(N[O][1])) {
              var Q = N[O][1].charAt(0);
              N[O][1] = N[O][1].slice(1), z += Q, G += Q;
            }
          }
          if (O < N.length - 1 && !N[O][1]) {
            N.splice(O, 1);
            break;
          }
          if (z.length > 0 || G.length > 0) {
            z.length > 0 && G.length > 0 && (et = m(G, z), et !== 0 && (it >= 0 ? N[it][1] += G.substring(
              0,
              et
            ) : (N.splice(0, 0, [
              e,
              G.substring(0, et)
            ]), O++), G = G.substring(et), z = z.substring(et)), et = x(G, z), et !== 0 && (N[O][1] = G.substring(G.length - et) + N[O][1], G = G.substring(
              0,
              G.length - et
            ), z = z.substring(
              0,
              z.length - et
            )));
            var gt = K + X;
            z.length === 0 && G.length === 0 ? (N.splice(O - gt, gt), O = O - gt) : z.length === 0 ? (N.splice(O - gt, gt, [t, G]), O = O - gt + 1) : G.length === 0 ? (N.splice(O - gt, gt, [i, z]), O = O - gt + 1) : (N.splice(
              O - gt,
              gt,
              [i, z],
              [t, G]
            ), O = O - gt + 2);
          }
          O !== 0 && N[O - 1][0] === e ? (N[O - 1][1] += N[O][1], N.splice(O, 1)) : O++, K = 0, X = 0, z = "", G = "";
          break;
      }
    }
    N[N.length - 1][1] === "" && N.pop();
    var Tt = !1;
    for (O = 1; O < N.length - 1; )
      N[O - 1][0] === e && N[O + 1][0] === e && (N[O][1].substring(
        N[O][1].length - N[O - 1][1].length
      ) === N[O - 1][1] ? (N[O][1] = N[O - 1][1] + N[O][1].substring(
        0,
        N[O][1].length - N[O - 1][1].length
      ), N[O + 1][1] = N[O - 1][1] + N[O + 1][1], N.splice(O - 1, 1), Tt = !0) : N[O][1].substring(0, N[O + 1][1].length) == N[O + 1][1] && (N[O - 1][1] += N[O + 1][1], N[O][1] = N[O][1].substring(N[O + 1][1].length) + N[O + 1][1], N.splice(O + 1, 1), Tt = !0)), O++;
    Tt && Y(N, V);
  }
  function rt(N) {
    return N >= 55296 && N <= 56319;
  }
  function dt(N) {
    return N >= 56320 && N <= 57343;
  }
  function ht(N) {
    return dt(N.charCodeAt(0));
  }
  function Pt(N) {
    return rt(N.charCodeAt(N.length - 1));
  }
  function c(N) {
    for (var V = [], O = 0; O < N.length; O++)
      N[O][1].length > 0 && V.push(N[O]);
    return V;
  }
  function Kt(N, V, O, X) {
    return Pt(N) || ht(X) ? null : c([
      [e, N],
      [i, V],
      [t, O],
      [e, X]
    ]);
  }
  function Nt(N, V, O) {
    var X = typeof O == "number" ? { index: O, length: 0 } : O.oldRange, K = typeof O == "number" ? null : O.newRange, z = N.length, G = V.length;
    if (X.length === 0 && (K === null || K.length === 0)) {
      var et = X.index, it = N.slice(0, et), Q = N.slice(et), vt = K ? K.index : null;
      t: {
        var gt = et + G - z;
        if (vt !== null && vt !== gt || gt < 0 || gt > G)
          break t;
        var Tt = V.slice(0, gt), At = V.slice(gt);
        if (At !== Q)
          break t;
        var ct = Math.min(et, gt), $t = it.slice(0, ct), Ht = Tt.slice(0, ct);
        if ($t !== Ht)
          break t;
        var xt = it.slice(ct), It = Tt.slice(ct);
        return Kt($t, xt, It, Q);
      }
      t: {
        if (vt !== null && vt !== et)
          break t;
        var wt = et, Tt = V.slice(0, wt), At = V.slice(wt);
        if (Tt !== it)
          break t;
        var jt = Math.min(z - wt, G - wt), Lt = Q.slice(Q.length - jt), Rt = At.slice(At.length - jt);
        if (Lt !== Rt)
          break t;
        var xt = Q.slice(0, Q.length - jt), It = At.slice(0, At.length - jt);
        return Kt(it, xt, It, Lt);
      }
    }
    if (X.length > 0 && K && K.length === 0)
      t: {
        var $t = N.slice(0, X.index), Lt = N.slice(X.index + X.length), ct = $t.length, jt = Lt.length;
        if (G < ct + jt)
          break t;
        var Ht = V.slice(0, ct), Rt = V.slice(G - jt);
        if ($t !== Ht || Lt !== Rt)
          break t;
        var xt = N.slice(ct, z - jt), It = V.slice(ct, G - jt);
        return Kt($t, xt, It, Lt);
      }
    return null;
  }
  function me(N, V, O, X) {
    return r(N, V, O, X, !0);
  }
  return me.INSERT = t, me.DELETE = i, me.EQUAL = e, Bs = me, Bs;
}
var _i = { exports: {} };
_i.exports;
var ua;
function bl() {
  return ua || (ua = 1, (function(i, t) {
    var e = 200, r = "__lodash_hash_undefined__", o = 9007199254740991, l = "[object Arguments]", h = "[object Array]", m = "[object Boolean]", b = "[object Date]", x = "[object Error]", C = "[object Function]", R = "[object GeneratorFunction]", E = "[object Map]", _ = "[object Number]", q = "[object Object]", k = "[object Promise]", F = "[object RegExp]", j = "[object Set]", Y = "[object String]", rt = "[object Symbol]", dt = "[object WeakMap]", ht = "[object ArrayBuffer]", Pt = "[object DataView]", c = "[object Float32Array]", Kt = "[object Float64Array]", Nt = "[object Int8Array]", me = "[object Int16Array]", N = "[object Int32Array]", V = "[object Uint8Array]", O = "[object Uint8ClampedArray]", X = "[object Uint16Array]", K = "[object Uint32Array]", z = /[\\^$.*+?()[\]{}|]/g, G = /\w*$/, et = /^\[object .+?Constructor\]$/, it = /^(?:0|[1-9]\d*)$/, Q = {};
    Q[l] = Q[h] = Q[ht] = Q[Pt] = Q[m] = Q[b] = Q[c] = Q[Kt] = Q[Nt] = Q[me] = Q[N] = Q[E] = Q[_] = Q[q] = Q[F] = Q[j] = Q[Y] = Q[rt] = Q[V] = Q[O] = Q[X] = Q[K] = !0, Q[x] = Q[C] = Q[dt] = !1;
    var vt = typeof Jn == "object" && Jn && Jn.Object === Object && Jn, gt = typeof self == "object" && self && self.Object === Object && self, Tt = vt || gt || Function("return this")(), At = t && !t.nodeType && t, ct = At && !0 && i && !i.nodeType && i, $t = ct && ct.exports === At;
    function Ht(f, y) {
      return f.set(y[0], y[1]), f;
    }
    function xt(f, y) {
      return f.add(y), f;
    }
    function It(f, y) {
      for (var A = -1, P = f ? f.length : 0; ++A < P && y(f[A], A, f) !== !1; )
        ;
      return f;
    }
    function wt(f, y) {
      for (var A = -1, P = y.length, mt = f.length; ++A < P; )
        f[mt + A] = y[A];
      return f;
    }
    function jt(f, y, A, P) {
      for (var mt = -1, ut = f ? f.length : 0; ++mt < ut; )
        A = y(A, f[mt], mt, f);
      return A;
    }
    function Lt(f, y) {
      for (var A = -1, P = Array(f); ++A < f; )
        P[A] = y(A);
      return P;
    }
    function Rt(f, y) {
      return f?.[y];
    }
    function Vt(f) {
      var y = !1;
      if (f != null && typeof f.toString != "function")
        try {
          y = !!(f + "");
        } catch {
        }
      return y;
    }
    function ee(f) {
      var y = -1, A = Array(f.size);
      return f.forEach(function(P, mt) {
        A[++y] = [mt, P];
      }), A;
    }
    function An(f, y) {
      return function(A) {
        return f(y(A));
      };
    }
    function Nn(f) {
      var y = -1, A = Array(f.size);
      return f.forEach(function(P) {
        A[++y] = P;
      }), A;
    }
    var Se = Array.prototype, bi = Function.prototype, $n = Object.prototype, or = Tt["__core-js_shared__"], ye = (function() {
      var f = /[^.]+$/.exec(or && or.keys && or.keys.IE_PROTO || "");
      return f ? "Symbol(src)_1." + f : "";
    })(), rn = bi.toString, he = $n.hasOwnProperty, nt = $n.toString, ne = RegExp(
      "^" + rn.call(he).replace(z, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    ), Sn = $t ? Tt.Buffer : void 0, Hn = Tt.Symbol, ar = Tt.Uint8Array, be = An(Object.getPrototypeOf, Object), lr = Object.create, sn = $n.propertyIsEnumerable, Ce = Se.splice, Le = Object.getOwnPropertySymbols, qe = Sn ? Sn.isBuffer : void 0, jr = An(Object.keys, Object), We = Ie(Tt, "DataView"), on = Ie(Tt, "Map"), Ee = Ie(Tt, "Promise"), Un = Ie(Tt, "Set"), Me = Ie(Tt, "WeakMap"), Oe = Ie(Object, "create"), Fn = oe(We), an = oe(on), re = oe(Ee), Yt = oe(Un), Cn = oe(Me), ln = Hn ? Hn.prototype : void 0, ur = ln ? ln.valueOf : void 0;
    function De(f) {
      var y = -1, A = f ? f.length : 0;
      for (this.clear(); ++y < A; ) {
        var P = f[y];
        this.set(P[0], P[1]);
      }
    }
    function un() {
      this.__data__ = Oe ? Oe(null) : {};
    }
    function cn(f) {
      return this.has(f) && delete this.__data__[f];
    }
    function cr(f) {
      var y = this.__data__;
      if (Oe) {
        var A = y[f];
        return A === r ? void 0 : A;
      }
      return he.call(y, f) ? y[f] : void 0;
    }
    function Ln(f) {
      var y = this.__data__;
      return Oe ? y[f] !== void 0 : he.call(y, f);
    }
    function fr(f, y) {
      var A = this.__data__;
      return A[f] = Oe && y === void 0 ? r : y, this;
    }
    De.prototype.clear = un, De.prototype.delete = cn, De.prototype.get = cr, De.prototype.has = Ln, De.prototype.set = fr;
    function Jt(f) {
      var y = -1, A = f ? f.length : 0;
      for (this.clear(); ++y < A; ) {
        var P = f[y];
        this.set(P[0], P[1]);
      }
    }
    function vi() {
      this.__data__ = [];
    }
    function Br(f) {
      var y = this.__data__, A = hn(y, f);
      if (A < 0)
        return !1;
      var P = y.length - 1;
      return A == P ? y.pop() : Ce.call(y, A, 1), !0;
    }
    function xi(f) {
      var y = this.__data__, A = hn(y, f);
      return A < 0 ? void 0 : y[A][1];
    }
    function wi(f) {
      return hn(this.__data__, f) > -1;
    }
    function Pr(f, y) {
      var A = this.__data__, P = hn(A, f);
      return P < 0 ? A.push([f, y]) : A[P][1] = y, this;
    }
    Jt.prototype.clear = vi, Jt.prototype.delete = Br, Jt.prototype.get = xi, Jt.prototype.has = wi, Jt.prototype.set = Pr;
    function ie(f) {
      var y = -1, A = f ? f.length : 0;
      for (this.clear(); ++y < A; ) {
        var P = f[y];
        this.set(P[0], P[1]);
      }
    }
    function fn() {
      this.__data__ = {
        hash: new De(),
        map: new (on || Jt)(),
        string: new De()
      };
    }
    function $r(f) {
      return ke(this, f).delete(f);
    }
    function hr(f) {
      return ke(this, f).get(f);
    }
    function dr(f) {
      return ke(this, f).has(f);
    }
    function zn(f, y) {
      return ke(this, f).set(f, y), this;
    }
    ie.prototype.clear = fn, ie.prototype.delete = $r, ie.prototype.get = hr, ie.prototype.has = dr, ie.prototype.set = zn;
    function le(f) {
      this.__data__ = new Jt(f);
    }
    function Ti() {
      this.__data__ = new Jt();
    }
    function qn(f) {
      return this.__data__.delete(f);
    }
    function Hr(f) {
      return this.__data__.get(f);
    }
    function Ur(f) {
      return this.__data__.has(f);
    }
    function Fr(f, y) {
      var A = this.__data__;
      if (A instanceof Jt) {
        var P = A.__data__;
        if (!on || P.length < e - 1)
          return P.push([f, y]), this;
        A = this.__data__ = new ie(P);
      }
      return A.set(f, y), this;
    }
    le.prototype.clear = Ti, le.prototype.delete = qn, le.prototype.get = Hr, le.prototype.has = Ur, le.prototype.set = Fr;
    function On(f, y) {
      var A = xr(f) || Gn(f) ? Lt(f.length, String) : [], P = A.length, mt = !!P;
      for (var ut in f)
        he.call(f, ut) && !(mt && (ut == "length" || kn(ut, P))) && A.push(ut);
      return A;
    }
    function zr(f, y, A) {
      var P = f[y];
      (!(he.call(f, y) && vr(P, A)) || A === void 0 && !(y in f)) && (f[y] = A);
    }
    function hn(f, y) {
      for (var A = f.length; A--; )
        if (vr(f[A][0], y))
          return A;
      return -1;
    }
    function je(f, y) {
      return f && mr(y, Tr(y), f);
    }
    function pr(f, y, A, P, mt, ut, _t) {
      var Ot;
      if (P && (Ot = ut ? P(f, mt, ut, _t) : P(f)), Ot !== void 0)
        return Ot;
      if (!Be(f))
        return f;
      var Ut = xr(f);
      if (Ut) {
        if (Ot = Ge(f), !y)
          return Ei(f, Ot);
      } else {
        var Mt = ue(f), Qt = Mt == C || Mt == R;
        if (ti(f))
          return _e(f, y);
        if (Mt == q || Mt == l || Qt && !ut) {
          if (Vt(f))
            return ut ? f : {};
          if (Ot = Ae(Qt ? {} : f), !y)
            return ve(f, je(Ot, f));
        } else {
          if (!Q[Mt])
            return ut ? f : {};
          Ot = Ai(f, Mt, pr, y);
        }
      }
      _t || (_t = new le());
      var de = _t.get(f);
      if (de)
        return de;
      if (_t.set(f, Ot), !Ut)
        var Zt = A ? Yr(f) : Tr(f);
      return It(Zt || f, function(ae, n) {
        Zt && (n = ae, ae = f[n]), zr(Ot, n, pr(ae, y, A, P, n, f, _t));
      }), Ot;
    }
    function Wr(f) {
      return Be(f) ? lr(f) : {};
    }
    function Vr(f, y, A) {
      var P = y(f);
      return xr(f) ? P : wt(P, A(f));
    }
    function gr(f) {
      return nt.call(f);
    }
    function Gr(f) {
      if (!Be(f) || yr(f))
        return !1;
      var y = wr(f) || Vt(f) ? ne : et;
      return y.test(oe(f));
    }
    function se(f) {
      if (!br(f))
        return jr(f);
      var y = [];
      for (var A in Object(f))
        he.call(f, A) && A != "constructor" && y.push(A);
      return y;
    }
    function _e(f, y) {
      if (y)
        return f.slice();
      var A = new f.constructor(f.length);
      return f.copy(A), A;
    }
    function dn(f) {
      var y = new f.constructor(f.byteLength);
      return new ar(y).set(new ar(f)), y;
    }
    function _n(f, y) {
      var A = y ? dn(f.buffer) : f.buffer;
      return new f.constructor(A, f.byteOffset, f.byteLength);
    }
    function Kr(f, y, A) {
      var P = y ? A(ee(f), !0) : ee(f);
      return jt(P, Ht, new f.constructor());
    }
    function Wn(f) {
      var y = new f.constructor(f.source, G.exec(f));
      return y.lastIndex = f.lastIndex, y;
    }
    function Zr(f, y, A) {
      var P = y ? A(Nn(f), !0) : Nn(f);
      return jt(P, xt, new f.constructor());
    }
    function Vn(f) {
      return ur ? Object(ur.call(f)) : {};
    }
    function Xr(f, y) {
      var A = y ? dn(f.buffer) : f.buffer;
      return new f.constructor(A, f.byteOffset, f.length);
    }
    function Ei(f, y) {
      var A = -1, P = f.length;
      for (y || (y = Array(P)); ++A < P; )
        y[A] = f[A];
      return y;
    }
    function mr(f, y, A, P) {
      A || (A = {});
      for (var mt = -1, ut = y.length; ++mt < ut; ) {
        var _t = y[mt], Ot = void 0;
        zr(A, _t, Ot === void 0 ? f[_t] : Ot);
      }
      return A;
    }
    function ve(f, y) {
      return mr(f, Ve(f), y);
    }
    function Yr(f) {
      return Vr(f, Tr, Ve);
    }
    function ke(f, y) {
      var A = f.__data__;
      return Qr(y) ? A[typeof y == "string" ? "string" : "hash"] : A.map;
    }
    function Ie(f, y) {
      var A = Rt(f, y);
      return Gr(A) ? A : void 0;
    }
    var Ve = Le ? An(Le, Object) : ri, ue = gr;
    (We && ue(new We(new ArrayBuffer(1))) != Pt || on && ue(new on()) != E || Ee && ue(Ee.resolve()) != k || Un && ue(new Un()) != j || Me && ue(new Me()) != dt) && (ue = function(f) {
      var y = nt.call(f), A = y == q ? f.constructor : void 0, P = A ? oe(A) : void 0;
      if (P)
        switch (P) {
          case Fn:
            return Pt;
          case an:
            return E;
          case re:
            return k;
          case Yt:
            return j;
          case Cn:
            return dt;
        }
      return y;
    });
    function Ge(f) {
      var y = f.length, A = f.constructor(y);
      return y && typeof f[0] == "string" && he.call(f, "index") && (A.index = f.index, A.input = f.input), A;
    }
    function Ae(f) {
      return typeof f.constructor == "function" && !br(f) ? Wr(be(f)) : {};
    }
    function Ai(f, y, A, P) {
      var mt = f.constructor;
      switch (y) {
        case ht:
          return dn(f);
        case m:
        case b:
          return new mt(+f);
        case Pt:
          return _n(f, P);
        case c:
        case Kt:
        case Nt:
        case me:
        case N:
        case V:
        case O:
        case X:
        case K:
          return Xr(f, P);
        case E:
          return Kr(f, P, A);
        case _:
        case Y:
          return new mt(f);
        case F:
          return Wn(f);
        case j:
          return Zr(f, P, A);
        case rt:
          return Vn(f);
      }
    }
    function kn(f, y) {
      return y = y ?? o, !!y && (typeof f == "number" || it.test(f)) && f > -1 && f % 1 == 0 && f < y;
    }
    function Qr(f) {
      var y = typeof f;
      return y == "string" || y == "number" || y == "symbol" || y == "boolean" ? f !== "__proto__" : f === null;
    }
    function yr(f) {
      return !!ye && ye in f;
    }
    function br(f) {
      var y = f && f.constructor, A = typeof y == "function" && y.prototype || $n;
      return f === A;
    }
    function oe(f) {
      if (f != null) {
        try {
          return rn.call(f);
        } catch {
        }
        try {
          return f + "";
        } catch {
        }
      }
      return "";
    }
    function Jr(f) {
      return pr(f, !0, !0);
    }
    function vr(f, y) {
      return f === y || f !== f && y !== y;
    }
    function Gn(f) {
      return Ni(f) && he.call(f, "callee") && (!sn.call(f, "callee") || nt.call(f) == l);
    }
    var xr = Array.isArray;
    function pn(f) {
      return f != null && ei(f.length) && !wr(f);
    }
    function Ni(f) {
      return ni(f) && pn(f);
    }
    var ti = qe || Er;
    function wr(f) {
      var y = Be(f) ? nt.call(f) : "";
      return y == C || y == R;
    }
    function ei(f) {
      return typeof f == "number" && f > -1 && f % 1 == 0 && f <= o;
    }
    function Be(f) {
      var y = typeof f;
      return !!f && (y == "object" || y == "function");
    }
    function ni(f) {
      return !!f && typeof f == "object";
    }
    function Tr(f) {
      return pn(f) ? On(f) : se(f);
    }
    function ri() {
      return [];
    }
    function Er() {
      return !1;
    }
    i.exports = Jr;
  })(_i, _i.exports)), _i.exports;
}
var ki = { exports: {} };
ki.exports;
var ca;
function vl() {
  return ca || (ca = 1, (function(i, t) {
    var e = 200, r = "__lodash_hash_undefined__", o = 1, l = 2, h = 9007199254740991, m = "[object Arguments]", b = "[object Array]", x = "[object AsyncFunction]", C = "[object Boolean]", R = "[object Date]", E = "[object Error]", _ = "[object Function]", q = "[object GeneratorFunction]", k = "[object Map]", F = "[object Number]", j = "[object Null]", Y = "[object Object]", rt = "[object Promise]", dt = "[object Proxy]", ht = "[object RegExp]", Pt = "[object Set]", c = "[object String]", Kt = "[object Symbol]", Nt = "[object Undefined]", me = "[object WeakMap]", N = "[object ArrayBuffer]", V = "[object DataView]", O = "[object Float32Array]", X = "[object Float64Array]", K = "[object Int8Array]", z = "[object Int16Array]", G = "[object Int32Array]", et = "[object Uint8Array]", it = "[object Uint8ClampedArray]", Q = "[object Uint16Array]", vt = "[object Uint32Array]", gt = /[\\^$.*+?()[\]{}|]/g, Tt = /^\[object .+?Constructor\]$/, At = /^(?:0|[1-9]\d*)$/, ct = {};
    ct[O] = ct[X] = ct[K] = ct[z] = ct[G] = ct[et] = ct[it] = ct[Q] = ct[vt] = !0, ct[m] = ct[b] = ct[N] = ct[C] = ct[V] = ct[R] = ct[E] = ct[_] = ct[k] = ct[F] = ct[Y] = ct[ht] = ct[Pt] = ct[c] = ct[me] = !1;
    var $t = typeof Jn == "object" && Jn && Jn.Object === Object && Jn, Ht = typeof self == "object" && self && self.Object === Object && self, xt = $t || Ht || Function("return this")(), It = t && !t.nodeType && t, wt = It && !0 && i && !i.nodeType && i, jt = wt && wt.exports === It, Lt = jt && $t.process, Rt = (function() {
      try {
        return Lt && Lt.binding && Lt.binding("util");
      } catch {
      }
    })(), Vt = Rt && Rt.isTypedArray;
    function ee(f, y) {
      for (var A = -1, P = f == null ? 0 : f.length, mt = 0, ut = []; ++A < P; ) {
        var _t = f[A];
        y(_t, A, f) && (ut[mt++] = _t);
      }
      return ut;
    }
    function An(f, y) {
      for (var A = -1, P = y.length, mt = f.length; ++A < P; )
        f[mt + A] = y[A];
      return f;
    }
    function Nn(f, y) {
      for (var A = -1, P = f == null ? 0 : f.length; ++A < P; )
        if (y(f[A], A, f))
          return !0;
      return !1;
    }
    function Se(f, y) {
      for (var A = -1, P = Array(f); ++A < f; )
        P[A] = y(A);
      return P;
    }
    function bi(f) {
      return function(y) {
        return f(y);
      };
    }
    function $n(f, y) {
      return f.has(y);
    }
    function or(f, y) {
      return f?.[y];
    }
    function ye(f) {
      var y = -1, A = Array(f.size);
      return f.forEach(function(P, mt) {
        A[++y] = [mt, P];
      }), A;
    }
    function rn(f, y) {
      return function(A) {
        return f(y(A));
      };
    }
    function he(f) {
      var y = -1, A = Array(f.size);
      return f.forEach(function(P) {
        A[++y] = P;
      }), A;
    }
    var nt = Array.prototype, ne = Function.prototype, Sn = Object.prototype, Hn = xt["__core-js_shared__"], ar = ne.toString, be = Sn.hasOwnProperty, lr = (function() {
      var f = /[^.]+$/.exec(Hn && Hn.keys && Hn.keys.IE_PROTO || "");
      return f ? "Symbol(src)_1." + f : "";
    })(), sn = Sn.toString, Ce = RegExp(
      "^" + ar.call(be).replace(gt, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    ), Le = jt ? xt.Buffer : void 0, qe = xt.Symbol, jr = xt.Uint8Array, We = Sn.propertyIsEnumerable, on = nt.splice, Ee = qe ? qe.toStringTag : void 0, Un = Object.getOwnPropertySymbols, Me = Le ? Le.isBuffer : void 0, Oe = rn(Object.keys, Object), Fn = Ve(xt, "DataView"), an = Ve(xt, "Map"), re = Ve(xt, "Promise"), Yt = Ve(xt, "Set"), Cn = Ve(xt, "WeakMap"), ln = Ve(Object, "create"), ur = oe(Fn), De = oe(an), un = oe(re), cn = oe(Yt), cr = oe(Cn), Ln = qe ? qe.prototype : void 0, fr = Ln ? Ln.valueOf : void 0;
    function Jt(f) {
      var y = -1, A = f == null ? 0 : f.length;
      for (this.clear(); ++y < A; ) {
        var P = f[y];
        this.set(P[0], P[1]);
      }
    }
    function vi() {
      this.__data__ = ln ? ln(null) : {}, this.size = 0;
    }
    function Br(f) {
      var y = this.has(f) && delete this.__data__[f];
      return this.size -= y ? 1 : 0, y;
    }
    function xi(f) {
      var y = this.__data__;
      if (ln) {
        var A = y[f];
        return A === r ? void 0 : A;
      }
      return be.call(y, f) ? y[f] : void 0;
    }
    function wi(f) {
      var y = this.__data__;
      return ln ? y[f] !== void 0 : be.call(y, f);
    }
    function Pr(f, y) {
      var A = this.__data__;
      return this.size += this.has(f) ? 0 : 1, A[f] = ln && y === void 0 ? r : y, this;
    }
    Jt.prototype.clear = vi, Jt.prototype.delete = Br, Jt.prototype.get = xi, Jt.prototype.has = wi, Jt.prototype.set = Pr;
    function ie(f) {
      var y = -1, A = f == null ? 0 : f.length;
      for (this.clear(); ++y < A; ) {
        var P = f[y];
        this.set(P[0], P[1]);
      }
    }
    function fn() {
      this.__data__ = [], this.size = 0;
    }
    function $r(f) {
      var y = this.__data__, A = _e(y, f);
      if (A < 0)
        return !1;
      var P = y.length - 1;
      return A == P ? y.pop() : on.call(y, A, 1), --this.size, !0;
    }
    function hr(f) {
      var y = this.__data__, A = _e(y, f);
      return A < 0 ? void 0 : y[A][1];
    }
    function dr(f) {
      return _e(this.__data__, f) > -1;
    }
    function zn(f, y) {
      var A = this.__data__, P = _e(A, f);
      return P < 0 ? (++this.size, A.push([f, y])) : A[P][1] = y, this;
    }
    ie.prototype.clear = fn, ie.prototype.delete = $r, ie.prototype.get = hr, ie.prototype.has = dr, ie.prototype.set = zn;
    function le(f) {
      var y = -1, A = f == null ? 0 : f.length;
      for (this.clear(); ++y < A; ) {
        var P = f[y];
        this.set(P[0], P[1]);
      }
    }
    function Ti() {
      this.size = 0, this.__data__ = {
        hash: new Jt(),
        map: new (an || ie)(),
        string: new Jt()
      };
    }
    function qn(f) {
      var y = Ie(this, f).delete(f);
      return this.size -= y ? 1 : 0, y;
    }
    function Hr(f) {
      return Ie(this, f).get(f);
    }
    function Ur(f) {
      return Ie(this, f).has(f);
    }
    function Fr(f, y) {
      var A = Ie(this, f), P = A.size;
      return A.set(f, y), this.size += A.size == P ? 0 : 1, this;
    }
    le.prototype.clear = Ti, le.prototype.delete = qn, le.prototype.get = Hr, le.prototype.has = Ur, le.prototype.set = Fr;
    function On(f) {
      var y = -1, A = f == null ? 0 : f.length;
      for (this.__data__ = new le(); ++y < A; )
        this.add(f[y]);
    }
    function zr(f) {
      return this.__data__.set(f, r), this;
    }
    function hn(f) {
      return this.__data__.has(f);
    }
    On.prototype.add = On.prototype.push = zr, On.prototype.has = hn;
    function je(f) {
      var y = this.__data__ = new ie(f);
      this.size = y.size;
    }
    function pr() {
      this.__data__ = new ie(), this.size = 0;
    }
    function Wr(f) {
      var y = this.__data__, A = y.delete(f);
      return this.size = y.size, A;
    }
    function Vr(f) {
      return this.__data__.get(f);
    }
    function gr(f) {
      return this.__data__.has(f);
    }
    function Gr(f, y) {
      var A = this.__data__;
      if (A instanceof ie) {
        var P = A.__data__;
        if (!an || P.length < e - 1)
          return P.push([f, y]), this.size = ++A.size, this;
        A = this.__data__ = new le(P);
      }
      return A.set(f, y), this.size = A.size, this;
    }
    je.prototype.clear = pr, je.prototype.delete = Wr, je.prototype.get = Vr, je.prototype.has = gr, je.prototype.set = Gr;
    function se(f, y) {
      var A = Gn(f), P = !A && vr(f), mt = !A && !P && pn(f), ut = !A && !P && !mt && ni(f), _t = A || P || mt || ut, Ot = _t ? Se(f.length, String) : [], Ut = Ot.length;
      for (var Mt in f)
        be.call(f, Mt) && !(_t && // Safari 9 has enumerable `arguments.length` in strict mode.
        (Mt == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
        mt && (Mt == "offset" || Mt == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
        ut && (Mt == "buffer" || Mt == "byteLength" || Mt == "byteOffset") || // Skip index properties.
        Ai(Mt, Ut))) && Ot.push(Mt);
      return Ot;
    }
    function _e(f, y) {
      for (var A = f.length; A--; )
        if (Jr(f[A][0], y))
          return A;
      return -1;
    }
    function dn(f, y, A) {
      var P = y(f);
      return Gn(f) ? P : An(P, A(f));
    }
    function _n(f) {
      return f == null ? f === void 0 ? Nt : j : Ee && Ee in Object(f) ? ue(f) : br(f);
    }
    function Kr(f) {
      return Be(f) && _n(f) == m;
    }
    function Wn(f, y, A, P, mt) {
      return f === y ? !0 : f == null || y == null || !Be(f) && !Be(y) ? f !== f && y !== y : Zr(f, y, A, P, Wn, mt);
    }
    function Zr(f, y, A, P, mt, ut) {
      var _t = Gn(f), Ot = Gn(y), Ut = _t ? b : Ae(f), Mt = Ot ? b : Ae(y);
      Ut = Ut == m ? Y : Ut, Mt = Mt == m ? Y : Mt;
      var Qt = Ut == Y, de = Mt == Y, Zt = Ut == Mt;
      if (Zt && pn(f)) {
        if (!pn(y))
          return !1;
        _t = !0, Qt = !1;
      }
      if (Zt && !Qt)
        return ut || (ut = new je()), _t || ni(f) ? mr(f, y, A, P, mt, ut) : ve(f, y, Ut, A, P, mt, ut);
      if (!(A & o)) {
        var ae = Qt && be.call(f, "__wrapped__"), n = de && be.call(y, "__wrapped__");
        if (ae || n) {
          var s = ae ? f.value() : f, a = n ? y.value() : y;
          return ut || (ut = new je()), mt(s, a, A, P, ut);
        }
      }
      return Zt ? (ut || (ut = new je()), Yr(f, y, A, P, mt, ut)) : !1;
    }
    function Vn(f) {
      if (!ei(f) || Qr(f))
        return !1;
      var y = ti(f) ? Ce : Tt;
      return y.test(oe(f));
    }
    function Xr(f) {
      return Be(f) && wr(f.length) && !!ct[_n(f)];
    }
    function Ei(f) {
      if (!yr(f))
        return Oe(f);
      var y = [];
      for (var A in Object(f))
        be.call(f, A) && A != "constructor" && y.push(A);
      return y;
    }
    function mr(f, y, A, P, mt, ut) {
      var _t = A & o, Ot = f.length, Ut = y.length;
      if (Ot != Ut && !(_t && Ut > Ot))
        return !1;
      var Mt = ut.get(f);
      if (Mt && ut.get(y))
        return Mt == y;
      var Qt = -1, de = !0, Zt = A & l ? new On() : void 0;
      for (ut.set(f, y), ut.set(y, f); ++Qt < Ot; ) {
        var ae = f[Qt], n = y[Qt];
        if (P)
          var s = _t ? P(n, ae, Qt, y, f, ut) : P(ae, n, Qt, f, y, ut);
        if (s !== void 0) {
          if (s)
            continue;
          de = !1;
          break;
        }
        if (Zt) {
          if (!Nn(y, function(a, u) {
            if (!$n(Zt, u) && (ae === a || mt(ae, a, A, P, ut)))
              return Zt.push(u);
          })) {
            de = !1;
            break;
          }
        } else if (!(ae === n || mt(ae, n, A, P, ut))) {
          de = !1;
          break;
        }
      }
      return ut.delete(f), ut.delete(y), de;
    }
    function ve(f, y, A, P, mt, ut, _t) {
      switch (A) {
        case V:
          if (f.byteLength != y.byteLength || f.byteOffset != y.byteOffset)
            return !1;
          f = f.buffer, y = y.buffer;
        case N:
          return !(f.byteLength != y.byteLength || !ut(new jr(f), new jr(y)));
        case C:
        case R:
        case F:
          return Jr(+f, +y);
        case E:
          return f.name == y.name && f.message == y.message;
        case ht:
        case c:
          return f == y + "";
        case k:
          var Ot = ye;
        case Pt:
          var Ut = P & o;
          if (Ot || (Ot = he), f.size != y.size && !Ut)
            return !1;
          var Mt = _t.get(f);
          if (Mt)
            return Mt == y;
          P |= l, _t.set(f, y);
          var Qt = mr(Ot(f), Ot(y), P, mt, ut, _t);
          return _t.delete(f), Qt;
        case Kt:
          if (fr)
            return fr.call(f) == fr.call(y);
      }
      return !1;
    }
    function Yr(f, y, A, P, mt, ut) {
      var _t = A & o, Ot = ke(f), Ut = Ot.length, Mt = ke(y), Qt = Mt.length;
      if (Ut != Qt && !_t)
        return !1;
      for (var de = Ut; de--; ) {
        var Zt = Ot[de];
        if (!(_t ? Zt in y : be.call(y, Zt)))
          return !1;
      }
      var ae = ut.get(f);
      if (ae && ut.get(y))
        return ae == y;
      var n = !0;
      ut.set(f, y), ut.set(y, f);
      for (var s = _t; ++de < Ut; ) {
        Zt = Ot[de];
        var a = f[Zt], u = y[Zt];
        if (P)
          var d = _t ? P(u, a, Zt, y, f, ut) : P(a, u, Zt, f, y, ut);
        if (!(d === void 0 ? a === u || mt(a, u, A, P, ut) : d)) {
          n = !1;
          break;
        }
        s || (s = Zt == "constructor");
      }
      if (n && !s) {
        var p = f.constructor, g = y.constructor;
        p != g && "constructor" in f && "constructor" in y && !(typeof p == "function" && p instanceof p && typeof g == "function" && g instanceof g) && (n = !1);
      }
      return ut.delete(f), ut.delete(y), n;
    }
    function ke(f) {
      return dn(f, Tr, Ge);
    }
    function Ie(f, y) {
      var A = f.__data__;
      return kn(y) ? A[typeof y == "string" ? "string" : "hash"] : A.map;
    }
    function Ve(f, y) {
      var A = or(f, y);
      return Vn(A) ? A : void 0;
    }
    function ue(f) {
      var y = be.call(f, Ee), A = f[Ee];
      try {
        f[Ee] = void 0;
        var P = !0;
      } catch {
      }
      var mt = sn.call(f);
      return P && (y ? f[Ee] = A : delete f[Ee]), mt;
    }
    var Ge = Un ? function(f) {
      return f == null ? [] : (f = Object(f), ee(Un(f), function(y) {
        return We.call(f, y);
      }));
    } : ri, Ae = _n;
    (Fn && Ae(new Fn(new ArrayBuffer(1))) != V || an && Ae(new an()) != k || re && Ae(re.resolve()) != rt || Yt && Ae(new Yt()) != Pt || Cn && Ae(new Cn()) != me) && (Ae = function(f) {
      var y = _n(f), A = y == Y ? f.constructor : void 0, P = A ? oe(A) : "";
      if (P)
        switch (P) {
          case ur:
            return V;
          case De:
            return k;
          case un:
            return rt;
          case cn:
            return Pt;
          case cr:
            return me;
        }
      return y;
    });
    function Ai(f, y) {
      return y = y ?? h, !!y && (typeof f == "number" || At.test(f)) && f > -1 && f % 1 == 0 && f < y;
    }
    function kn(f) {
      var y = typeof f;
      return y == "string" || y == "number" || y == "symbol" || y == "boolean" ? f !== "__proto__" : f === null;
    }
    function Qr(f) {
      return !!lr && lr in f;
    }
    function yr(f) {
      var y = f && f.constructor, A = typeof y == "function" && y.prototype || Sn;
      return f === A;
    }
    function br(f) {
      return sn.call(f);
    }
    function oe(f) {
      if (f != null) {
        try {
          return ar.call(f);
        } catch {
        }
        try {
          return f + "";
        } catch {
        }
      }
      return "";
    }
    function Jr(f, y) {
      return f === y || f !== f && y !== y;
    }
    var vr = Kr(/* @__PURE__ */ (function() {
      return arguments;
    })()) ? Kr : function(f) {
      return Be(f) && be.call(f, "callee") && !We.call(f, "callee");
    }, Gn = Array.isArray;
    function xr(f) {
      return f != null && wr(f.length) && !ti(f);
    }
    var pn = Me || Er;
    function Ni(f, y) {
      return Wn(f, y);
    }
    function ti(f) {
      if (!ei(f))
        return !1;
      var y = _n(f);
      return y == _ || y == q || y == x || y == dt;
    }
    function wr(f) {
      return typeof f == "number" && f > -1 && f % 1 == 0 && f <= h;
    }
    function ei(f) {
      var y = typeof f;
      return f != null && (y == "object" || y == "function");
    }
    function Be(f) {
      return f != null && typeof f == "object";
    }
    var ni = Vt ? bi(Vt) : Xr;
    function Tr(f) {
      return xr(f) ? se(f) : Ei(f);
    }
    function ri() {
      return [];
    }
    function Er() {
      return !1;
    }
    i.exports = Ni;
  })(ki, ki.exports)), ki.exports;
}
var Ji = {}, fa;
function Pd() {
  if (fa) return Ji;
  fa = 1, Object.defineProperty(Ji, "__esModule", { value: !0 });
  const i = bl(), t = vl();
  var e;
  return (function(r) {
    function o(b = {}, x = {}, C = !1) {
      typeof b != "object" && (b = {}), typeof x != "object" && (x = {});
      let R = i(x);
      C || (R = Object.keys(R).reduce((E, _) => (R[_] != null && (E[_] = R[_]), E), {}));
      for (const E in b)
        b[E] !== void 0 && x[E] === void 0 && (R[E] = b[E]);
      return Object.keys(R).length > 0 ? R : void 0;
    }
    r.compose = o;
    function l(b = {}, x = {}) {
      typeof b != "object" && (b = {}), typeof x != "object" && (x = {});
      const C = Object.keys(b).concat(Object.keys(x)).reduce((R, E) => (t(b[E], x[E]) || (R[E] = x[E] === void 0 ? null : x[E]), R), {});
      return Object.keys(C).length > 0 ? C : void 0;
    }
    r.diff = l;
    function h(b = {}, x = {}) {
      b = b || {};
      const C = Object.keys(x).reduce((R, E) => (x[E] !== b[E] && b[E] !== void 0 && (R[E] = x[E]), R), {});
      return Object.keys(b).reduce((R, E) => (b[E] !== x[E] && x[E] === void 0 && (R[E] = null), R), C);
    }
    r.invert = h;
    function m(b, x, C = !1) {
      if (typeof b != "object")
        return x;
      if (typeof x != "object")
        return;
      if (!C)
        return x;
      const R = Object.keys(x).reduce((E, _) => (b[_] === void 0 && (E[_] = x[_]), E), {});
      return Object.keys(R).length > 0 ? R : void 0;
    }
    r.transform = m;
  })(e || (e = {})), Ji.default = e, Ji;
}
var ts = {}, ha;
function xl() {
  if (ha) return ts;
  ha = 1, Object.defineProperty(ts, "__esModule", { value: !0 });
  var i;
  return (function(t) {
    function e(r) {
      return typeof r.delete == "number" ? r.delete : typeof r.retain == "number" ? r.retain : typeof r.retain == "object" && r.retain !== null ? 1 : typeof r.insert == "string" ? r.insert.length : 1;
    }
    t.length = e;
  })(i || (i = {})), ts.default = i, ts;
}
var es = {}, da;
function $d() {
  if (da) return es;
  da = 1, Object.defineProperty(es, "__esModule", { value: !0 });
  const i = xl();
  class t {
    constructor(r) {
      this.ops = r, this.index = 0, this.offset = 0;
    }
    hasNext() {
      return this.peekLength() < 1 / 0;
    }
    next(r) {
      r || (r = 1 / 0);
      const o = this.ops[this.index];
      if (o) {
        const l = this.offset, h = i.default.length(o);
        if (r >= h - l ? (r = h - l, this.index += 1, this.offset = 0) : this.offset += r, typeof o.delete == "number")
          return { delete: r };
        {
          const m = {};
          return o.attributes && (m.attributes = o.attributes), typeof o.retain == "number" ? m.retain = r : typeof o.retain == "object" && o.retain !== null ? m.retain = o.retain : typeof o.insert == "string" ? m.insert = o.insert.substr(l, r) : m.insert = o.insert, m;
        }
      } else
        return { retain: 1 / 0 };
    }
    peek() {
      return this.ops[this.index];
    }
    peekLength() {
      return this.ops[this.index] ? i.default.length(this.ops[this.index]) - this.offset : 1 / 0;
    }
    peekType() {
      const r = this.ops[this.index];
      return r ? typeof r.delete == "number" ? "delete" : typeof r.retain == "number" || typeof r.retain == "object" && r.retain !== null ? "retain" : "insert" : "retain";
    }
    rest() {
      if (this.hasNext()) {
        if (this.offset === 0)
          return this.ops.slice(this.index);
        {
          const r = this.offset, o = this.index, l = this.next(), h = this.ops.slice(this.index);
          return this.offset = r, this.index = o, [l].concat(h);
        }
      } else return [];
    }
  }
  return es.default = t, es;
}
var pa;
function Hd() {
  return pa || (pa = 1, (function(i, t) {
    Object.defineProperty(t, "__esModule", { value: !0 }), t.AttributeMap = t.OpIterator = t.Op = void 0;
    const e = Bd(), r = bl(), o = vl(), l = Pd();
    t.AttributeMap = l.default;
    const h = xl();
    t.Op = h.default;
    const m = $d();
    t.OpIterator = m.default;
    const b = "\0", x = (R, E) => {
      if (typeof R != "object" || R === null)
        throw new Error(`cannot retain a ${typeof R}`);
      if (typeof E != "object" || E === null)
        throw new Error(`cannot retain a ${typeof E}`);
      const _ = Object.keys(R)[0];
      if (!_ || _ !== Object.keys(E)[0])
        throw new Error(`embed types not matched: ${_} != ${Object.keys(E)[0]}`);
      return [_, R[_], E[_]];
    };
    class C {
      constructor(E) {
        Array.isArray(E) ? this.ops = E : E != null && Array.isArray(E.ops) ? this.ops = E.ops : this.ops = [];
      }
      static registerEmbed(E, _) {
        this.handlers[E] = _;
      }
      static unregisterEmbed(E) {
        delete this.handlers[E];
      }
      static getHandler(E) {
        const _ = this.handlers[E];
        if (!_)
          throw new Error(`no handlers for embed type "${E}"`);
        return _;
      }
      insert(E, _) {
        const q = {};
        return typeof E == "string" && E.length === 0 ? this : (q.insert = E, _ != null && typeof _ == "object" && Object.keys(_).length > 0 && (q.attributes = _), this.push(q));
      }
      delete(E) {
        return E <= 0 ? this : this.push({ delete: E });
      }
      retain(E, _) {
        if (typeof E == "number" && E <= 0)
          return this;
        const q = { retain: E };
        return _ != null && typeof _ == "object" && Object.keys(_).length > 0 && (q.attributes = _), this.push(q);
      }
      push(E) {
        let _ = this.ops.length, q = this.ops[_ - 1];
        if (E = r(E), typeof q == "object") {
          if (typeof E.delete == "number" && typeof q.delete == "number")
            return this.ops[_ - 1] = { delete: q.delete + E.delete }, this;
          if (typeof q.delete == "number" && E.insert != null && (_ -= 1, q = this.ops[_ - 1], typeof q != "object"))
            return this.ops.unshift(E), this;
          if (o(E.attributes, q.attributes)) {
            if (typeof E.insert == "string" && typeof q.insert == "string")
              return this.ops[_ - 1] = { insert: q.insert + E.insert }, typeof E.attributes == "object" && (this.ops[_ - 1].attributes = E.attributes), this;
            if (typeof E.retain == "number" && typeof q.retain == "number")
              return this.ops[_ - 1] = { retain: q.retain + E.retain }, typeof E.attributes == "object" && (this.ops[_ - 1].attributes = E.attributes), this;
          }
        }
        return _ === this.ops.length ? this.ops.push(E) : this.ops.splice(_, 0, E), this;
      }
      chop() {
        const E = this.ops[this.ops.length - 1];
        return E && typeof E.retain == "number" && !E.attributes && this.ops.pop(), this;
      }
      filter(E) {
        return this.ops.filter(E);
      }
      forEach(E) {
        this.ops.forEach(E);
      }
      map(E) {
        return this.ops.map(E);
      }
      partition(E) {
        const _ = [], q = [];
        return this.forEach((k) => {
          (E(k) ? _ : q).push(k);
        }), [_, q];
      }
      reduce(E, _) {
        return this.ops.reduce(E, _);
      }
      changeLength() {
        return this.reduce((E, _) => _.insert ? E + h.default.length(_) : _.delete ? E - _.delete : E, 0);
      }
      length() {
        return this.reduce((E, _) => E + h.default.length(_), 0);
      }
      slice(E = 0, _ = 1 / 0) {
        const q = [], k = new m.default(this.ops);
        let F = 0;
        for (; F < _ && k.hasNext(); ) {
          let j;
          F < E ? j = k.next(E - F) : (j = k.next(_ - F), q.push(j)), F += h.default.length(j);
        }
        return new C(q);
      }
      compose(E) {
        const _ = new m.default(this.ops), q = new m.default(E.ops), k = [], F = q.peek();
        if (F != null && typeof F.retain == "number" && F.attributes == null) {
          let Y = F.retain;
          for (; _.peekType() === "insert" && _.peekLength() <= Y; )
            Y -= _.peekLength(), k.push(_.next());
          F.retain - Y > 0 && q.next(F.retain - Y);
        }
        const j = new C(k);
        for (; _.hasNext() || q.hasNext(); )
          if (q.peekType() === "insert")
            j.push(q.next());
          else if (_.peekType() === "delete")
            j.push(_.next());
          else {
            const Y = Math.min(_.peekLength(), q.peekLength()), rt = _.next(Y), dt = q.next(Y);
            if (dt.retain) {
              const ht = {};
              if (typeof rt.retain == "number")
                ht.retain = typeof dt.retain == "number" ? Y : dt.retain;
              else if (typeof dt.retain == "number")
                rt.retain == null ? ht.insert = rt.insert : ht.retain = rt.retain;
              else {
                const c = rt.retain == null ? "insert" : "retain", [Kt, Nt, me] = x(rt[c], dt.retain), N = C.getHandler(Kt);
                ht[c] = {
                  [Kt]: N.compose(Nt, me, c === "retain")
                };
              }
              const Pt = l.default.compose(rt.attributes, dt.attributes, typeof rt.retain == "number");
              if (Pt && (ht.attributes = Pt), j.push(ht), !q.hasNext() && o(j.ops[j.ops.length - 1], ht)) {
                const c = new C(_.rest());
                return j.concat(c).chop();
              }
            } else typeof dt.delete == "number" && (typeof rt.retain == "number" || typeof rt.retain == "object" && rt.retain !== null) && j.push(dt);
          }
        return j.chop();
      }
      concat(E) {
        const _ = new C(this.ops.slice());
        return E.ops.length > 0 && (_.push(E.ops[0]), _.ops = _.ops.concat(E.ops.slice(1))), _;
      }
      diff(E, _) {
        if (this.ops === E.ops)
          return new C();
        const q = [this, E].map((rt) => rt.map((dt) => {
          if (dt.insert != null)
            return typeof dt.insert == "string" ? dt.insert : b;
          const ht = rt === E ? "on" : "with";
          throw new Error("diff() called " + ht + " non-document");
        }).join("")), k = new C(), F = e(q[0], q[1], _, !0), j = new m.default(this.ops), Y = new m.default(E.ops);
        return F.forEach((rt) => {
          let dt = rt[1].length;
          for (; dt > 0; ) {
            let ht = 0;
            switch (rt[0]) {
              case e.INSERT:
                ht = Math.min(Y.peekLength(), dt), k.push(Y.next(ht));
                break;
              case e.DELETE:
                ht = Math.min(dt, j.peekLength()), j.next(ht), k.delete(ht);
                break;
              case e.EQUAL:
                ht = Math.min(j.peekLength(), Y.peekLength(), dt);
                const Pt = j.next(ht), c = Y.next(ht);
                o(Pt.insert, c.insert) ? k.retain(ht, l.default.diff(Pt.attributes, c.attributes)) : k.push(c).delete(ht);
                break;
            }
            dt -= ht;
          }
        }), k.chop();
      }
      eachLine(E, _ = `
`) {
        const q = new m.default(this.ops);
        let k = new C(), F = 0;
        for (; q.hasNext(); ) {
          if (q.peekType() !== "insert")
            return;
          const j = q.peek(), Y = h.default.length(j) - q.peekLength(), rt = typeof j.insert == "string" ? j.insert.indexOf(_, Y) - Y : -1;
          if (rt < 0)
            k.push(q.next());
          else if (rt > 0)
            k.push(q.next(rt));
          else {
            if (E(k, q.next(1).attributes || {}, F) === !1)
              return;
            F += 1, k = new C();
          }
        }
        k.length() > 0 && E(k, {}, F);
      }
      invert(E) {
        const _ = new C();
        return this.reduce((q, k) => {
          if (k.insert)
            _.delete(h.default.length(k));
          else {
            if (typeof k.retain == "number" && k.attributes == null)
              return _.retain(k.retain), q + k.retain;
            if (k.delete || typeof k.retain == "number") {
              const F = k.delete || k.retain;
              return E.slice(q, q + F).forEach((Y) => {
                k.delete ? _.push(Y) : k.retain && k.attributes && _.retain(h.default.length(Y), l.default.invert(k.attributes, Y.attributes));
              }), q + F;
            } else if (typeof k.retain == "object" && k.retain !== null) {
              const F = E.slice(q, q + 1), j = new m.default(F.ops).next(), [Y, rt, dt] = x(k.retain, j.insert), ht = C.getHandler(Y);
              return _.retain({ [Y]: ht.invert(rt, dt) }, l.default.invert(k.attributes, j.attributes)), q + 1;
            }
          }
          return q;
        }, 0), _.chop();
      }
      transform(E, _ = !1) {
        if (_ = !!_, typeof E == "number")
          return this.transformPosition(E, _);
        const q = E, k = new m.default(this.ops), F = new m.default(q.ops), j = new C();
        for (; k.hasNext() || F.hasNext(); )
          if (k.peekType() === "insert" && (_ || F.peekType() !== "insert"))
            j.retain(h.default.length(k.next()));
          else if (F.peekType() === "insert")
            j.push(F.next());
          else {
            const Y = Math.min(k.peekLength(), F.peekLength()), rt = k.next(Y), dt = F.next(Y);
            if (rt.delete)
              continue;
            if (dt.delete)
              j.push(dt);
            else {
              const ht = rt.retain, Pt = dt.retain;
              let c = typeof Pt == "object" && Pt !== null ? Pt : Y;
              if (typeof ht == "object" && ht !== null && typeof Pt == "object" && Pt !== null) {
                const Kt = Object.keys(ht)[0];
                if (Kt === Object.keys(Pt)[0]) {
                  const Nt = C.getHandler(Kt);
                  Nt && (c = {
                    [Kt]: Nt.transform(ht[Kt], Pt[Kt], _)
                  });
                }
              }
              j.retain(c, l.default.transform(rt.attributes, dt.attributes, _));
            }
          }
        return j.chop();
      }
      transformPosition(E, _ = !1) {
        _ = !!_;
        const q = new m.default(this.ops);
        let k = 0;
        for (; q.hasNext() && k <= E; ) {
          const F = q.peekLength(), j = q.peekType();
          if (q.next(), j === "delete") {
            E -= Math.min(F, E - k);
            continue;
          } else j === "insert" && (k < E || !_) && (E += F);
          k += F;
        }
        return E;
      }
    }
    C.Op = h.default, C.OpIterator = m.default, C.AttributeMap = l.default, C.handlers = {}, t.default = C, i.exports = C, i.exports.default = C;
  })(Qi, Qi.exports)), Qi.exports;
}
var ze = Hd();
const ot = /* @__PURE__ */ xo(ze);
class nn extends Re {
  static value() {
  }
  optimize() {
    (this.prev || this.next) && this.remove();
  }
  length() {
    return 0;
  }
  value() {
    return "";
  }
}
nn.blotName = "break";
nn.tagName = "BR";
let tn = class extends ps {
};
const Ud = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};
function Ts(i) {
  return i.replace(/[&<>"']/g, (t) => Ud[t]);
}
class we extends bo {
  static allowedChildren = [we, nn, Re, tn];
  // Lower index means deeper in the DOM tree, since not found (-1) is for embeds
  static order = [
    "cursor",
    "inline",
    // Must be lower
    "link",
    // Chrome wants <a> to be lower
    "underline",
    "strike",
    "italic",
    "bold",
    "script",
    "code"
    // Must be higher
  ];
  static compare(t, e) {
    const r = we.order.indexOf(t), o = we.order.indexOf(e);
    return r >= 0 || o >= 0 ? r - o : t === e ? 0 : t < e ? -1 : 1;
  }
  formatAt(t, e, r, o) {
    if (we.compare(this.statics.blotName, r) < 0 && this.scroll.query(r, lt.BLOT)) {
      const l = this.isolate(t, e);
      o && l.wrap(r, o);
    } else
      super.formatAt(t, e, r, o);
  }
  optimize(t) {
    if (super.optimize(t), this.parent instanceof we && we.compare(this.statics.blotName, this.parent.statics.blotName) > 0) {
      const e = this.parent.isolate(this.offset(), this.length());
      this.moveChildren(e), e.wrap(this);
    }
  }
}
const ga = 1;
class fe extends Pi {
  cache = {};
  delta() {
    return this.cache.delta == null && (this.cache.delta = wl(this)), this.cache.delta;
  }
  deleteAt(t, e) {
    super.deleteAt(t, e), this.cache = {};
  }
  formatAt(t, e, r, o) {
    e <= 0 || (this.scroll.query(r, lt.BLOCK) ? t + e === this.length() && this.format(r, o) : super.formatAt(t, Math.min(e, this.length() - t - 1), r, o), this.cache = {});
  }
  insertAt(t, e, r) {
    if (r != null) {
      super.insertAt(t, e, r), this.cache = {};
      return;
    }
    if (e.length === 0) return;
    const o = e.split(`
`), l = o.shift();
    l.length > 0 && (t < this.length() - 1 || this.children.tail == null ? super.insertAt(Math.min(t, this.length() - 1), l) : this.children.tail.insertAt(this.children.tail.length(), l), this.cache = {});
    let h = this;
    o.reduce((m, b) => (h = h.split(m, !0), h.insertAt(0, b), b.length), t + l.length);
  }
  insertBefore(t, e) {
    const {
      head: r
    } = this.children;
    super.insertBefore(t, e), r instanceof nn && r.remove(), this.cache = {};
  }
  length() {
    return this.cache.length == null && (this.cache.length = super.length() + ga), this.cache.length;
  }
  moveChildren(t, e) {
    super.moveChildren(t, e), this.cache = {};
  }
  optimize(t) {
    super.optimize(t), this.cache = {};
  }
  path(t) {
    return super.path(t, !0);
  }
  removeChild(t) {
    super.removeChild(t), this.cache = {};
  }
  split(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    if (e && (t === 0 || t >= this.length() - ga)) {
      const o = this.clone();
      return t === 0 ? (this.parent.insertBefore(o, this), this) : (this.parent.insertBefore(o, this.next), o);
    }
    const r = super.split(t, e);
    return this.cache = {}, r;
  }
}
fe.blotName = "block";
fe.tagName = "P";
fe.defaultChild = nn;
fe.allowedChildren = [nn, we, Re, tn];
class Fe extends Re {
  attach() {
    super.attach(), this.attributes = new xs(this.domNode);
  }
  delta() {
    return new ot().insert(this.value(), {
      ...this.formats(),
      ...this.attributes.values()
    });
  }
  format(t, e) {
    const r = this.scroll.query(t, lt.BLOCK_ATTRIBUTE);
    r != null && this.attributes.attribute(r, e);
  }
  formatAt(t, e, r, o) {
    this.format(r, o);
  }
  insertAt(t, e, r) {
    if (r != null) {
      super.insertAt(t, e, r);
      return;
    }
    const o = e.split(`
`), l = o.pop(), h = o.map((b) => {
      const x = this.scroll.create(fe.blotName);
      return x.insertAt(0, b), x;
    }), m = this.split(t);
    h.forEach((b) => {
      this.parent.insertBefore(b, m);
    }), l && this.parent.insertBefore(this.scroll.create("text", l), m);
  }
}
Fe.scope = lt.BLOCK_BLOT;
function wl(i) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
  return i.descendants(ge).reduce((e, r) => r.length() === 0 ? e : e.insert(r.value(), He(r, {}, t)), new ot()).insert(`
`, He(i));
}
function He(i) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, e = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
  return i == null || ("formats" in i && typeof i.formats == "function" && (t = {
    ...t,
    ...i.formats()
  }, e && delete t["code-token"]), i.parent == null || i.parent.statics.blotName === "scroll" || i.parent.statics.scope !== i.statics.scope) ? t : He(i.parent, t, e);
}
class Ye extends Re {
  static blotName = "cursor";
  static className = "ql-cursor";
  static tagName = "span";
  static CONTENTS = "\uFEFF";
  // Zero width no break space
  static value() {
  }
  constructor(t, e, r) {
    super(t, e), this.selection = r, this.textNode = document.createTextNode(Ye.CONTENTS), this.domNode.appendChild(this.textNode), this.savedLength = 0;
  }
  detach() {
    this.parent != null && this.parent.removeChild(this);
  }
  format(t, e) {
    if (this.savedLength !== 0) {
      super.format(t, e);
      return;
    }
    let r = this, o = 0;
    for (; r != null && r.statics.scope !== lt.BLOCK_BLOT; )
      o += r.offset(r.parent), r = r.parent;
    r != null && (this.savedLength = Ye.CONTENTS.length, r.optimize(), r.formatAt(o, Ye.CONTENTS.length, t, e), this.savedLength = 0);
  }
  index(t, e) {
    return t === this.textNode ? 0 : super.index(t, e);
  }
  length() {
    return this.savedLength;
  }
  position() {
    return [this.textNode, this.textNode.data.length];
  }
  remove() {
    super.remove(), this.parent = null;
  }
  restore() {
    if (this.selection.composing || this.parent == null) return null;
    const t = this.selection.getNativeRange();
    for (; this.domNode.lastChild != null && this.domNode.lastChild !== this.textNode; )
      this.domNode.parentNode.insertBefore(this.domNode.lastChild, this.domNode);
    const e = this.prev instanceof tn ? this.prev : null, r = e ? e.length() : 0, o = this.next instanceof tn ? this.next : null, l = o ? o.text : "", {
      textNode: h
    } = this, m = h.data.split(Ye.CONTENTS).join("");
    h.data = Ye.CONTENTS;
    let b;
    if (e)
      b = e, (m || o) && (e.insertAt(e.length(), m + l), o && o.remove());
    else if (o)
      b = o, o.insertAt(0, m);
    else {
      const x = document.createTextNode(m);
      b = this.scroll.create(x), this.parent.insertBefore(b, this);
    }
    if (this.remove(), t) {
      const x = (E, _) => e && E === e.domNode ? _ : E === h ? r + _ - 1 : o && E === o.domNode ? r + m.length + _ : null, C = x(t.start.node, t.start.offset), R = x(t.end.node, t.end.offset);
      if (C !== null && R !== null)
        return {
          startNode: b.domNode,
          startOffset: C,
          endNode: b.domNode,
          endOffset: R
        };
    }
    return null;
  }
  update(t, e) {
    if (t.some((r) => r.type === "characterData" && r.target === this.textNode)) {
      const r = this.restore();
      r && (e.range = r);
    }
  }
  // Avoid .ql-cursor being a descendant of `<a/>`.
  // The reason is Safari pushes down `<a/>` on text insertion.
  // That will cause DOM nodes not sync with the model.
  //
  // For example ({I} is the caret), given the markup:
  //    <a><span class="ql-cursor">\uFEFF{I}</span></a>
  // When typing a char "x", `<a/>` will be pushed down inside the `<span>` first:
  //    <span class="ql-cursor"><a>\uFEFF{I}</a></span>
  // And then "x" will be inserted after `<a/>`:
  //    <span class="ql-cursor"><a>\uFEFF</a>d{I}</span>
  optimize(t) {
    super.optimize(t);
    let {
      parent: e
    } = this;
    for (; e; ) {
      if (e.domNode.tagName === "A") {
        this.savedLength = Ye.CONTENTS.length, e.isolate(this.offset(e), this.length()).unwrap(), this.savedLength = 0;
        break;
      }
      e = e.parent;
    }
  }
  value() {
    return "";
  }
}
var Ps = { exports: {} }, ma;
function Fd() {
  return ma || (ma = 1, (function(i) {
    var t = Object.prototype.hasOwnProperty, e = "~";
    function r() {
    }
    Object.create && (r.prototype = /* @__PURE__ */ Object.create(null), new r().__proto__ || (e = !1));
    function o(b, x, C) {
      this.fn = b, this.context = x, this.once = C || !1;
    }
    function l(b, x, C, R, E) {
      if (typeof C != "function")
        throw new TypeError("The listener must be a function");
      var _ = new o(C, R || b, E), q = e ? e + x : x;
      return b._events[q] ? b._events[q].fn ? b._events[q] = [b._events[q], _] : b._events[q].push(_) : (b._events[q] = _, b._eventsCount++), b;
    }
    function h(b, x) {
      --b._eventsCount === 0 ? b._events = new r() : delete b._events[x];
    }
    function m() {
      this._events = new r(), this._eventsCount = 0;
    }
    m.prototype.eventNames = function() {
      var x = [], C, R;
      if (this._eventsCount === 0) return x;
      for (R in C = this._events)
        t.call(C, R) && x.push(e ? R.slice(1) : R);
      return Object.getOwnPropertySymbols ? x.concat(Object.getOwnPropertySymbols(C)) : x;
    }, m.prototype.listeners = function(x) {
      var C = e ? e + x : x, R = this._events[C];
      if (!R) return [];
      if (R.fn) return [R.fn];
      for (var E = 0, _ = R.length, q = new Array(_); E < _; E++)
        q[E] = R[E].fn;
      return q;
    }, m.prototype.listenerCount = function(x) {
      var C = e ? e + x : x, R = this._events[C];
      return R ? R.fn ? 1 : R.length : 0;
    }, m.prototype.emit = function(x, C, R, E, _, q) {
      var k = e ? e + x : x;
      if (!this._events[k]) return !1;
      var F = this._events[k], j = arguments.length, Y, rt;
      if (F.fn) {
        switch (F.once && this.removeListener(x, F.fn, void 0, !0), j) {
          case 1:
            return F.fn.call(F.context), !0;
          case 2:
            return F.fn.call(F.context, C), !0;
          case 3:
            return F.fn.call(F.context, C, R), !0;
          case 4:
            return F.fn.call(F.context, C, R, E), !0;
          case 5:
            return F.fn.call(F.context, C, R, E, _), !0;
          case 6:
            return F.fn.call(F.context, C, R, E, _, q), !0;
        }
        for (rt = 1, Y = new Array(j - 1); rt < j; rt++)
          Y[rt - 1] = arguments[rt];
        F.fn.apply(F.context, Y);
      } else {
        var dt = F.length, ht;
        for (rt = 0; rt < dt; rt++)
          switch (F[rt].once && this.removeListener(x, F[rt].fn, void 0, !0), j) {
            case 1:
              F[rt].fn.call(F[rt].context);
              break;
            case 2:
              F[rt].fn.call(F[rt].context, C);
              break;
            case 3:
              F[rt].fn.call(F[rt].context, C, R);
              break;
            case 4:
              F[rt].fn.call(F[rt].context, C, R, E);
              break;
            default:
              if (!Y) for (ht = 1, Y = new Array(j - 1); ht < j; ht++)
                Y[ht - 1] = arguments[ht];
              F[rt].fn.apply(F[rt].context, Y);
          }
      }
      return !0;
    }, m.prototype.on = function(x, C, R) {
      return l(this, x, C, R, !1);
    }, m.prototype.once = function(x, C, R) {
      return l(this, x, C, R, !0);
    }, m.prototype.removeListener = function(x, C, R, E) {
      var _ = e ? e + x : x;
      if (!this._events[_]) return this;
      if (!C)
        return h(this, _), this;
      var q = this._events[_];
      if (q.fn)
        q.fn === C && (!E || q.once) && (!R || q.context === R) && h(this, _);
      else {
        for (var k = 0, F = [], j = q.length; k < j; k++)
          (q[k].fn !== C || E && !q[k].once || R && q[k].context !== R) && F.push(q[k]);
        F.length ? this._events[_] = F.length === 1 ? F[0] : F : h(this, _);
      }
      return this;
    }, m.prototype.removeAllListeners = function(x) {
      var C;
      return x ? (C = e ? e + x : x, this._events[C] && h(this, C)) : (this._events = new r(), this._eventsCount = 0), this;
    }, m.prototype.off = m.prototype.removeListener, m.prototype.addListener = m.prototype.on, m.prefixed = e, m.EventEmitter = m, i.exports = m;
  })(Ps)), Ps.exports;
}
var zd = Fd();
const Wd = /* @__PURE__ */ xo(zd), oo = /* @__PURE__ */ new WeakMap(), ao = ["error", "warn", "log", "info"];
let lo = "warn";
function Tl(i) {
  if (lo && ao.indexOf(i) <= ao.indexOf(lo)) {
    for (var t = arguments.length, e = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++)
      e[r - 1] = arguments[r];
    console[i](...e);
  }
}
function Pn(i) {
  return ao.reduce((t, e) => (t[e] = Tl.bind(console, e, i), t), {});
}
Pn.level = (i) => {
  lo = i;
};
Tl.level = Pn.level;
const $s = Pn("quill:events"), Vd = ["selectionchange", "mousedown", "mouseup", "click"];
Vd.forEach((i) => {
  document.addEventListener(i, function() {
    for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++)
      e[r] = arguments[r];
    Array.from(document.querySelectorAll(".ql-container")).forEach((o) => {
      const l = oo.get(o);
      l && l.emitter && l.emitter.handleDOM(...e);
    });
  });
});
class st extends Wd {
  static events = {
    EDITOR_CHANGE: "editor-change",
    SCROLL_BEFORE_UPDATE: "scroll-before-update",
    SCROLL_BLOT_MOUNT: "scroll-blot-mount",
    SCROLL_BLOT_UNMOUNT: "scroll-blot-unmount",
    SCROLL_OPTIMIZE: "scroll-optimize",
    SCROLL_UPDATE: "scroll-update",
    SCROLL_EMBED_UPDATE: "scroll-embed-update",
    SELECTION_CHANGE: "selection-change",
    TEXT_CHANGE: "text-change",
    COMPOSITION_BEFORE_START: "composition-before-start",
    COMPOSITION_START: "composition-start",
    COMPOSITION_BEFORE_END: "composition-before-end",
    COMPOSITION_END: "composition-end"
  };
  static sources = {
    API: "api",
    SILENT: "silent",
    USER: "user"
  };
  constructor() {
    super(), this.domListeners = {}, this.on("error", $s.error);
  }
  emit() {
    for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++)
      e[r] = arguments[r];
    return $s.log.call($s, ...e), super.emit(...e);
  }
  handleDOM(t) {
    for (var e = arguments.length, r = new Array(e > 1 ? e - 1 : 0), o = 1; o < e; o++)
      r[o - 1] = arguments[o];
    (this.domListeners[t.type] || []).forEach((l) => {
      let {
        node: h,
        handler: m
      } = l;
      (t.target === h || h.contains(t.target)) && m(t, ...r);
    });
  }
  listenDOM(t, e, r) {
    this.domListeners[t] || (this.domListeners[t] = []), this.domListeners[t].push({
      node: e,
      handler: r
    });
  }
}
const Hs = Pn("quill:selection");
class qr {
  constructor(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    this.index = t, this.length = e;
  }
}
class Gd {
  constructor(t, e) {
    this.emitter = e, this.scroll = t, this.composing = !1, this.mouseDown = !1, this.root = this.scroll.domNode, this.cursor = this.scroll.create("cursor", this), this.savedRange = new qr(0, 0), this.lastRange = this.savedRange, this.lastNative = null, this.handleComposition(), this.handleDragging(), this.emitter.listenDOM("selectionchange", document, () => {
      !this.mouseDown && !this.composing && setTimeout(this.update.bind(this, st.sources.USER), 1);
    }), this.emitter.on(st.events.SCROLL_BEFORE_UPDATE, () => {
      if (!this.hasFocus()) return;
      const r = this.getNativeRange();
      r != null && r.start.node !== this.cursor.textNode && this.emitter.once(st.events.SCROLL_UPDATE, (o, l) => {
        try {
          this.root.contains(r.start.node) && this.root.contains(r.end.node) && this.setNativeRange(r.start.node, r.start.offset, r.end.node, r.end.offset);
          const h = l.some((m) => m.type === "characterData" || m.type === "childList" || m.type === "attributes" && m.target === this.root);
          this.update(h ? st.sources.SILENT : o);
        } catch {
        }
      });
    }), this.emitter.on(st.events.SCROLL_OPTIMIZE, (r, o) => {
      if (o.range) {
        const {
          startNode: l,
          startOffset: h,
          endNode: m,
          endOffset: b
        } = o.range;
        this.setNativeRange(l, h, m, b), this.update(st.sources.SILENT);
      }
    }), this.update(st.sources.SILENT);
  }
  handleComposition() {
    this.emitter.on(st.events.COMPOSITION_BEFORE_START, () => {
      this.composing = !0;
    }), this.emitter.on(st.events.COMPOSITION_END, () => {
      if (this.composing = !1, this.cursor.parent) {
        const t = this.cursor.restore();
        if (!t) return;
        setTimeout(() => {
          this.setNativeRange(t.startNode, t.startOffset, t.endNode, t.endOffset);
        }, 1);
      }
    });
  }
  handleDragging() {
    this.emitter.listenDOM("mousedown", document.body, () => {
      this.mouseDown = !0;
    }), this.emitter.listenDOM("mouseup", document.body, () => {
      this.mouseDown = !1, this.update(st.sources.USER);
    });
  }
  focus() {
    this.hasFocus() || (this.root.focus({
      preventScroll: !0
    }), this.setRange(this.savedRange));
  }
  format(t, e) {
    this.scroll.update();
    const r = this.getNativeRange();
    if (!(r == null || !r.native.collapsed || this.scroll.query(t, lt.BLOCK))) {
      if (r.start.node !== this.cursor.textNode) {
        const o = this.scroll.find(r.start.node, !1);
        if (o == null) return;
        if (o instanceof ge) {
          const l = o.split(r.start.offset);
          o.parent.insertBefore(this.cursor, l);
        } else
          o.insertBefore(this.cursor, r.start.node);
        this.cursor.attach();
      }
      this.cursor.format(t, e), this.scroll.optimize(), this.setNativeRange(this.cursor.textNode, this.cursor.textNode.data.length), this.update();
    }
  }
  getBounds(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    const r = this.scroll.length();
    t = Math.min(t, r - 1), e = Math.min(t + e, r - 1) - t;
    let o, [l, h] = this.scroll.leaf(t);
    if (l == null) return null;
    if (e > 0 && h === l.length()) {
      const [C] = this.scroll.leaf(t + 1);
      if (C) {
        const [R] = this.scroll.line(t), [E] = this.scroll.line(t + 1);
        R === E && (l = C, h = 0);
      }
    }
    [o, h] = l.position(h, !0);
    const m = document.createRange();
    if (e > 0)
      return m.setStart(o, h), [l, h] = this.scroll.leaf(t + e), l == null ? null : ([o, h] = l.position(h, !0), m.setEnd(o, h), m.getBoundingClientRect());
    let b = "left", x;
    if (o instanceof Text) {
      if (!o.data.length)
        return null;
      h < o.data.length ? (m.setStart(o, h), m.setEnd(o, h + 1)) : (m.setStart(o, h - 1), m.setEnd(o, h), b = "right"), x = m.getBoundingClientRect();
    } else {
      if (!(l.domNode instanceof Element)) return null;
      x = l.domNode.getBoundingClientRect(), h > 0 && (b = "right");
    }
    return {
      bottom: x.top + x.height,
      height: x.height,
      left: x[b],
      right: x[b],
      top: x.top,
      width: 0
    };
  }
  getNativeRange() {
    const t = document.getSelection();
    if (t == null || t.rangeCount <= 0) return null;
    const e = t.getRangeAt(0);
    if (e == null) return null;
    const r = this.normalizeNative(e);
    return Hs.info("getNativeRange", r), r;
  }
  getRange() {
    const t = this.scroll.domNode;
    if ("isConnected" in t && !t.isConnected)
      return [null, null];
    const e = this.getNativeRange();
    return e == null ? [null, null] : [this.normalizedToRange(e), e];
  }
  hasFocus() {
    return document.activeElement === this.root || document.activeElement != null && Us(this.root, document.activeElement);
  }
  normalizedToRange(t) {
    const e = [[t.start.node, t.start.offset]];
    t.native.collapsed || e.push([t.end.node, t.end.offset]);
    const r = e.map((h) => {
      const [m, b] = h, x = this.scroll.find(m, !0), C = x.offset(this.scroll);
      return b === 0 ? C : x instanceof ge ? C + x.index(m, b) : C + x.length();
    }), o = Math.min(Math.max(...r), this.scroll.length() - 1), l = Math.min(o, ...r);
    return new qr(l, o - l);
  }
  normalizeNative(t) {
    if (!Us(this.root, t.startContainer) || !t.collapsed && !Us(this.root, t.endContainer))
      return null;
    const e = {
      start: {
        node: t.startContainer,
        offset: t.startOffset
      },
      end: {
        node: t.endContainer,
        offset: t.endOffset
      },
      native: t
    };
    return [e.start, e.end].forEach((r) => {
      let {
        node: o,
        offset: l
      } = r;
      for (; !(o instanceof Text) && o.childNodes.length > 0; )
        if (o.childNodes.length > l)
          o = o.childNodes[l], l = 0;
        else if (o.childNodes.length === l)
          o = o.lastChild, o instanceof Text ? l = o.data.length : o.childNodes.length > 0 ? l = o.childNodes.length : l = o.childNodes.length + 1;
        else
          break;
      r.node = o, r.offset = l;
    }), e;
  }
  rangeToNative(t) {
    const e = this.scroll.length(), r = (o, l) => {
      o = Math.min(e - 1, o);
      const [h, m] = this.scroll.leaf(o);
      return h ? h.position(m, l) : [null, -1];
    };
    return [...r(t.index, !1), ...r(t.index + t.length, !0)];
  }
  setNativeRange(t, e) {
    let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : t, o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : e, l = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !1;
    if (Hs.info("setNativeRange", t, e, r, o), t != null && (this.root.parentNode == null || t.parentNode == null || // @ts-expect-error Fix me later
    r.parentNode == null))
      return;
    const h = document.getSelection();
    if (h != null)
      if (t != null) {
        this.hasFocus() || this.root.focus({
          preventScroll: !0
        });
        const {
          native: m
        } = this.getNativeRange() || {};
        if (m == null || l || t !== m.startContainer || e !== m.startOffset || r !== m.endContainer || o !== m.endOffset) {
          t instanceof Element && t.tagName === "BR" && (e = Array.from(t.parentNode.childNodes).indexOf(t), t = t.parentNode), r instanceof Element && r.tagName === "BR" && (o = Array.from(r.parentNode.childNodes).indexOf(r), r = r.parentNode);
          const b = document.createRange();
          b.setStart(t, e), b.setEnd(r, o), h.removeAllRanges(), h.addRange(b);
        }
      } else
        h.removeAllRanges(), this.root.blur();
  }
  setRange(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : st.sources.API;
    if (typeof e == "string" && (r = e, e = !1), Hs.info("setRange", t), t != null) {
      const o = this.rangeToNative(t);
      this.setNativeRange(...o, e);
    } else
      this.setNativeRange(null);
    this.update(r);
  }
  update() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : st.sources.USER;
    const e = this.lastRange, [r, o] = this.getRange();
    if (this.lastRange = r, this.lastNative = o, this.lastRange != null && (this.savedRange = this.lastRange), !yo(e, this.lastRange)) {
      if (!this.composing && o != null && o.native.collapsed && o.start.node !== this.cursor.textNode) {
        const h = this.cursor.restore();
        h && this.setNativeRange(h.startNode, h.startOffset, h.endNode, h.endOffset);
      }
      const l = [st.events.SELECTION_CHANGE, fi(this.lastRange), fi(e), t];
      this.emitter.emit(st.events.EDITOR_CHANGE, ...l), t !== st.sources.SILENT && this.emitter.emit(...l);
    }
  }
}
function Us(i, t) {
  try {
    t.parentNode;
  } catch {
    return !1;
  }
  return i.contains(t);
}
const Kd = /^[ -~]*$/;
class Zd {
  constructor(t) {
    this.scroll = t, this.delta = this.getDelta();
  }
  applyDelta(t) {
    this.scroll.update();
    let e = this.scroll.length();
    this.scroll.batchStart();
    const r = ya(t), o = new ot();
    return Yd(r.ops.slice()).reduce((h, m) => {
      const b = ze.Op.length(m);
      let x = m.attributes || {}, C = !1, R = !1;
      if (m.insert != null) {
        if (o.retain(b), typeof m.insert == "string") {
          const q = m.insert;
          R = !q.endsWith(`
`) && (e <= h || !!this.scroll.descendant(Fe, h)[0]), this.scroll.insertAt(h, q);
          const [k, F] = this.scroll.line(h);
          let j = er({}, He(k));
          if (k instanceof fe) {
            const [Y] = k.descendant(ge, F);
            Y && (j = er(j, He(Y)));
          }
          x = ze.AttributeMap.diff(j, x) || {};
        } else if (typeof m.insert == "object") {
          const q = Object.keys(m.insert)[0];
          if (q == null) return h;
          const k = this.scroll.query(q, lt.INLINE) != null;
          if (k)
            (e <= h || this.scroll.descendant(Fe, h)[0]) && (R = !0);
          else if (h > 0) {
            const [F, j] = this.scroll.descendant(ge, h - 1);
            F instanceof tn ? F.value()[j] !== `
` && (C = !0) : F instanceof Re && F.statics.scope === lt.INLINE_BLOT && (C = !0);
          }
          if (this.scroll.insertAt(h, q, m.insert[q]), k) {
            const [F] = this.scroll.descendant(ge, h);
            if (F) {
              const j = er({}, He(F));
              x = ze.AttributeMap.diff(j, x) || {};
            }
          }
        }
        e += b;
      } else if (o.push(m), m.retain !== null && typeof m.retain == "object") {
        const q = Object.keys(m.retain)[0];
        if (q == null) return h;
        this.scroll.updateEmbedAt(h, q, m.retain[q]);
      }
      Object.keys(x).forEach((q) => {
        this.scroll.formatAt(h, b, q, x[q]);
      });
      const E = C ? 1 : 0, _ = R ? 1 : 0;
      return e += E + _, o.retain(E), o.delete(_), h + b + E + _;
    }, 0), o.reduce((h, m) => typeof m.delete == "number" ? (this.scroll.deleteAt(h, m.delete), h) : h + ze.Op.length(m), 0), this.scroll.batchEnd(), this.scroll.optimize(), this.update(r);
  }
  deleteText(t, e) {
    return this.scroll.deleteAt(t, e), this.update(new ot().retain(t).delete(e));
  }
  formatLine(t, e) {
    let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    this.scroll.update(), Object.keys(r).forEach((l) => {
      this.scroll.lines(t, Math.max(e, 1)).forEach((h) => {
        h.format(l, r[l]);
      });
    }), this.scroll.optimize();
    const o = new ot().retain(t).retain(e, fi(r));
    return this.update(o);
  }
  formatText(t, e) {
    let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    Object.keys(r).forEach((l) => {
      this.scroll.formatAt(t, e, l, r[l]);
    });
    const o = new ot().retain(t).retain(e, fi(r));
    return this.update(o);
  }
  getContents(t, e) {
    return this.delta.slice(t, t + e);
  }
  getDelta() {
    return this.scroll.lines().reduce((t, e) => t.concat(e.delta()), new ot());
  }
  getFormat(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, r = [], o = [];
    e === 0 ? this.scroll.path(t).forEach((m) => {
      const [b] = m;
      b instanceof fe ? r.push(b) : b instanceof ge && o.push(b);
    }) : (r = this.scroll.lines(t, e), o = this.scroll.descendants(ge, t, e));
    const [l, h] = [r, o].map((m) => {
      const b = m.shift();
      if (b == null) return {};
      let x = He(b);
      for (; Object.keys(x).length > 0; ) {
        const C = m.shift();
        if (C == null) return x;
        x = Xd(He(C), x);
      }
      return x;
    });
    return {
      ...l,
      ...h
    };
  }
  getHTML(t, e) {
    const [r, o] = this.scroll.line(t);
    if (r) {
      const l = r.length();
      return r.length() >= o + e && !(o === 0 && e === l) ? $i(r, o, e, !0) : $i(this.scroll, t, e, !0);
    }
    return "";
  }
  getText(t, e) {
    return this.getContents(t, e).filter((r) => typeof r.insert == "string").map((r) => r.insert).join("");
  }
  insertContents(t, e) {
    const r = ya(e), o = new ot().retain(t).concat(r);
    return this.scroll.insertContents(t, r), this.update(o);
  }
  insertEmbed(t, e, r) {
    return this.scroll.insertAt(t, e, r), this.update(new ot().retain(t).insert({
      [e]: r
    }));
  }
  insertText(t, e) {
    let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    return e = e.replace(/\r\n/g, `
`).replace(/\r/g, `
`), this.scroll.insertAt(t, e), Object.keys(r).forEach((o) => {
      this.scroll.formatAt(t, e.length, o, r[o]);
    }), this.update(new ot().retain(t).insert(e, fi(r)));
  }
  isBlank() {
    if (this.scroll.children.length === 0) return !0;
    if (this.scroll.children.length > 1) return !1;
    const t = this.scroll.children.head;
    if (t?.statics.blotName !== fe.blotName) return !1;
    const e = t;
    return e.children.length > 1 ? !1 : e.children.head instanceof nn;
  }
  removeFormat(t, e) {
    const r = this.getText(t, e), [o, l] = this.scroll.line(t + e);
    let h = 0, m = new ot();
    o != null && (h = o.length() - l, m = o.delta().slice(l, l + h - 1).insert(`
`));
    const x = this.getContents(t, e + h).diff(new ot().insert(r).concat(m)), C = new ot().retain(t).concat(x);
    return this.applyDelta(C);
  }
  update(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [], r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : void 0;
    const o = this.delta;
    if (e.length === 1 && e[0].type === "characterData" && // @ts-expect-error Fix me later
    e[0].target.data.match(Kd) && this.scroll.find(e[0].target)) {
      const l = this.scroll.find(e[0].target), h = He(l), m = l.offset(this.scroll), b = e[0].oldValue.replace(Ye.CONTENTS, ""), x = new ot().insert(b), C = new ot().insert(l.value()), R = r && {
        oldRange: ba(r.oldRange, -m),
        newRange: ba(r.newRange, -m)
      };
      t = new ot().retain(m).concat(x.diff(C, R)).reduce((_, q) => q.insert ? _.insert(q.insert, h) : _.push(q), new ot()), this.delta = o.compose(t);
    } else
      this.delta = this.getDelta(), (!t || !yo(o.compose(t), this.delta)) && (t = o.diff(this.delta, r));
    return t;
  }
}
function ci(i, t, e) {
  if (i.length === 0) {
    const [_] = Fs(e.pop());
    return t <= 0 ? `</li></${_}>` : `</li></${_}>${ci([], t - 1, e)}`;
  }
  const [{
    child: r,
    offset: o,
    length: l,
    indent: h,
    type: m
  }, ...b] = i, [x, C] = Fs(m);
  if (h > t)
    return e.push(m), h === t + 1 ? `<${x}><li${C}>${$i(r, o, l)}${ci(b, h, e)}` : `<${x}><li>${ci(i, t + 1, e)}`;
  const R = e[e.length - 1];
  if (h === t && m === R)
    return `</li><li${C}>${$i(r, o, l)}${ci(b, h, e)}`;
  const [E] = Fs(e.pop());
  return `</li></${E}>${ci(i, t - 1, e)}`;
}
function $i(i, t, e) {
  let r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  if ("html" in i && typeof i.html == "function")
    return i.html(t, e);
  if (i instanceof tn)
    return Ts(i.value().slice(t, t + e)).replaceAll(" ", "&nbsp;");
  if (i instanceof Je) {
    if (i.statics.blotName === "list-container") {
      const x = [];
      return i.children.forEachAt(t, e, (C, R, E) => {
        const _ = "formats" in C && typeof C.formats == "function" ? C.formats() : {};
        x.push({
          child: C,
          offset: R,
          length: E,
          indent: _.indent || 0,
          type: _.list
        });
      }), ci(x, -1, []);
    }
    const o = [];
    if (i.children.forEachAt(t, e, (x, C, R) => {
      o.push($i(x, C, R));
    }), r || i.statics.blotName === "list")
      return o.join("");
    const {
      outerHTML: l,
      innerHTML: h
    } = i.domNode, [m, b] = l.split(`>${h}<`);
    return m === "<table" ? `<table style="border: 1px solid #000;">${o.join("")}<${b}` : `${m}>${o.join("")}<${b}`;
  }
  return i.domNode instanceof Element ? i.domNode.outerHTML : "";
}
function Xd(i, t) {
  return Object.keys(t).reduce((e, r) => {
    if (i[r] == null) return e;
    const o = t[r];
    return o === i[r] ? e[r] = o : Array.isArray(o) ? o.indexOf(i[r]) < 0 ? e[r] = o.concat([i[r]]) : e[r] = o : e[r] = [o, i[r]], e;
  }, {});
}
function Fs(i) {
  const t = i === "ordered" ? "ol" : "ul";
  switch (i) {
    case "checked":
      return [t, ' data-list="checked"'];
    case "unchecked":
      return [t, ' data-list="unchecked"'];
    default:
      return [t, ""];
  }
}
function ya(i) {
  return i.reduce((t, e) => {
    if (typeof e.insert == "string") {
      const r = e.insert.replace(/\r\n/g, `
`).replace(/\r/g, `
`);
      return t.insert(r, e.attributes);
    }
    return t.push(e);
  }, new ot());
}
function ba(i, t) {
  let {
    index: e,
    length: r
  } = i;
  return new qr(e + t, r);
}
function Yd(i) {
  const t = [];
  return i.forEach((e) => {
    typeof e.insert == "string" ? e.insert.split(`
`).forEach((o, l) => {
      l && t.push({
        insert: `
`,
        attributes: e.attributes
      }), o && t.push({
        insert: o,
        attributes: e.attributes
      });
    }) : t.push(e);
  }), t;
}
class En {
  static DEFAULTS = {};
  constructor(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    this.quill = t, this.options = e;
  }
}
const ns = "\uFEFF";
class wo extends Re {
  constructor(t, e) {
    super(t, e), this.contentNode = document.createElement("span"), this.contentNode.setAttribute("contenteditable", "false"), Array.from(this.domNode.childNodes).forEach((r) => {
      this.contentNode.appendChild(r);
    }), this.leftGuard = document.createTextNode(ns), this.rightGuard = document.createTextNode(ns), this.domNode.appendChild(this.leftGuard), this.domNode.appendChild(this.contentNode), this.domNode.appendChild(this.rightGuard);
  }
  index(t, e) {
    return t === this.leftGuard ? 0 : t === this.rightGuard ? 1 : super.index(t, e);
  }
  restore(t) {
    let e = null, r;
    const o = t.data.split(ns).join("");
    if (t === this.leftGuard)
      if (this.prev instanceof tn) {
        const l = this.prev.length();
        this.prev.insertAt(l, o), e = {
          startNode: this.prev.domNode,
          startOffset: l + o.length
        };
      } else
        r = document.createTextNode(o), this.parent.insertBefore(this.scroll.create(r), this), e = {
          startNode: r,
          startOffset: o.length
        };
    else t === this.rightGuard && (this.next instanceof tn ? (this.next.insertAt(0, o), e = {
      startNode: this.next.domNode,
      startOffset: o.length
    }) : (r = document.createTextNode(o), this.parent.insertBefore(this.scroll.create(r), this.next), e = {
      startNode: r,
      startOffset: o.length
    }));
    return t.data = ns, e;
  }
  update(t, e) {
    t.forEach((r) => {
      if (r.type === "characterData" && (r.target === this.leftGuard || r.target === this.rightGuard)) {
        const o = this.restore(r.target);
        o && (e.range = o);
      }
    });
  }
}
class Qd {
  isComposing = !1;
  constructor(t, e) {
    this.scroll = t, this.emitter = e, this.setupListeners();
  }
  setupListeners() {
    this.scroll.domNode.addEventListener("compositionstart", (t) => {
      this.isComposing || this.handleCompositionStart(t);
    }), this.scroll.domNode.addEventListener("compositionend", (t) => {
      this.isComposing && queueMicrotask(() => {
        this.handleCompositionEnd(t);
      });
    });
  }
  handleCompositionStart(t) {
    const e = t.target instanceof Node ? this.scroll.find(t.target, !0) : null;
    e && !(e instanceof wo) && (this.emitter.emit(st.events.COMPOSITION_BEFORE_START, t), this.scroll.batchStart(), this.emitter.emit(st.events.COMPOSITION_START, t), this.isComposing = !0);
  }
  handleCompositionEnd(t) {
    this.emitter.emit(st.events.COMPOSITION_BEFORE_END, t), this.scroll.batchEnd(), this.emitter.emit(st.events.COMPOSITION_END, t), this.isComposing = !1;
  }
}
class yi {
  static DEFAULTS = {
    modules: {}
  };
  static themes = {
    default: yi
  };
  modules = {};
  constructor(t, e) {
    this.quill = t, this.options = e;
  }
  init() {
    Object.keys(this.options.modules).forEach((t) => {
      this.modules[t] == null && this.addModule(t);
    });
  }
  addModule(t) {
    const e = this.quill.constructor.import(`modules/${t}`);
    return this.modules[t] = new e(this.quill, this.options.modules[t] || {}), this.modules[t];
  }
}
const Jd = (i) => i.parentElement || i.getRootNode().host || null, tp = (i) => {
  const t = i.getBoundingClientRect(), e = "offsetWidth" in i && Math.abs(t.width) / i.offsetWidth || 1, r = "offsetHeight" in i && Math.abs(t.height) / i.offsetHeight || 1;
  return {
    top: t.top,
    right: t.left + i.clientWidth * e,
    bottom: t.top + i.clientHeight * r,
    left: t.left
  };
}, rs = (i) => {
  const t = parseInt(i, 10);
  return Number.isNaN(t) ? 0 : t;
}, va = (i, t, e, r, o, l) => i < e && t > r ? 0 : i < e ? -(e - i + o) : t > r ? t - i > r - e ? i + o - e : t - r + l : 0, ep = (i, t) => {
  const e = i.ownerDocument;
  let r = t, o = i;
  for (; o; ) {
    const l = o === e.body, h = l ? {
      top: 0,
      right: window.visualViewport?.width ?? e.documentElement.clientWidth,
      bottom: window.visualViewport?.height ?? e.documentElement.clientHeight,
      left: 0
    } : tp(o), m = getComputedStyle(o), b = va(r.left, r.right, h.left, h.right, rs(m.scrollPaddingLeft), rs(m.scrollPaddingRight)), x = va(r.top, r.bottom, h.top, h.bottom, rs(m.scrollPaddingTop), rs(m.scrollPaddingBottom));
    if (b || x)
      if (l)
        e.defaultView?.scrollBy(b, x);
      else {
        const {
          scrollLeft: C,
          scrollTop: R
        } = o;
        x && (o.scrollTop += x), b && (o.scrollLeft += b);
        const E = o.scrollLeft - C, _ = o.scrollTop - R;
        r = {
          left: r.left - E,
          top: r.top - _,
          right: r.right - E,
          bottom: r.bottom - _
        };
      }
    o = l || m.position === "fixed" ? null : Jd(o);
  }
}, np = 100, rp = ["block", "break", "cursor", "inline", "scroll", "text"], ip = (i, t, e) => {
  const r = new gi();
  return rp.forEach((o) => {
    const l = t.query(o);
    l && r.register(l);
  }), i.forEach((o) => {
    let l = t.query(o);
    l || e.error(`Cannot register "${o}" specified in "formats" config. Are you sure it was registered?`);
    let h = 0;
    for (; l; )
      if (r.register(l), l = "blotName" in l ? l.requiredContainer ?? null : null, h += 1, h > np) {
        e.error(`Cycle detected in registering blot requiredContainer: "${o}"`);
        break;
      }
  }), r;
}, di = Pn("quill"), is = new gi();
Je.uiClass = "ql-ui";
class U {
  static DEFAULTS = {
    bounds: null,
    modules: {
      clipboard: !0,
      keyboard: !0,
      history: !0,
      uploader: !0
    },
    placeholder: "",
    readOnly: !1,
    registry: is,
    theme: "default"
  };
  static events = st.events;
  static sources = st.sources;
  static version = "2.0.3";
  static imports = {
    delta: ot,
    parchment: jd,
    "core/module": En,
    "core/theme": yi
  };
  static debug(t) {
    t === !0 && (t = "log"), Pn.level(t);
  }
  static find(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    return oo.get(t) || is.find(t, e);
  }
  static import(t) {
    return this.imports[t] == null && di.error(`Cannot import ${t}. Are you sure it was registered?`), this.imports[t];
  }
  static register() {
    if (typeof (arguments.length <= 0 ? void 0 : arguments[0]) != "string") {
      const t = arguments.length <= 0 ? void 0 : arguments[0], e = !!(!(arguments.length <= 1) && arguments[1]), r = "attrName" in t ? t.attrName : t.blotName;
      typeof r == "string" ? this.register(`formats/${r}`, t, e) : Object.keys(t).forEach((o) => {
        this.register(o, t[o], e);
      });
    } else {
      const t = arguments.length <= 0 ? void 0 : arguments[0], e = arguments.length <= 1 ? void 0 : arguments[1], r = !!(!(arguments.length <= 2) && arguments[2]);
      this.imports[t] != null && !r && di.warn(`Overwriting ${t} with`, e), this.imports[t] = e, (t.startsWith("blots/") || t.startsWith("formats/")) && e && typeof e != "boolean" && e.blotName !== "abstract" && is.register(e), typeof e.register == "function" && e.register(is);
    }
  }
  constructor(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (this.options = sp(t, e), this.container = this.options.container, this.container == null) {
      di.error("Invalid Quill container", t);
      return;
    }
    this.options.debug && U.debug(this.options.debug);
    const r = this.container.innerHTML.trim();
    this.container.classList.add("ql-container"), this.container.innerHTML = "", oo.set(this.container, this), this.root = this.addContainer("ql-editor"), this.root.classList.add("ql-blank"), this.emitter = new st();
    const o = vo.blotName, l = this.options.registry.query(o);
    if (!l || !("blotName" in l))
      throw new Error(`Cannot initialize Quill without "${o}" blot`);
    if (this.scroll = new l(this.options.registry, this.root, {
      emitter: this.emitter
    }), this.editor = new Zd(this.scroll), this.selection = new Gd(this.scroll, this.emitter), this.composition = new Qd(this.scroll, this.emitter), this.theme = new this.options.theme(this, this.options), this.keyboard = this.theme.addModule("keyboard"), this.clipboard = this.theme.addModule("clipboard"), this.history = this.theme.addModule("history"), this.uploader = this.theme.addModule("uploader"), this.theme.addModule("input"), this.theme.addModule("uiNode"), this.theme.init(), this.emitter.on(st.events.EDITOR_CHANGE, (h) => {
      h === st.events.TEXT_CHANGE && this.root.classList.toggle("ql-blank", this.editor.isBlank());
    }), this.emitter.on(st.events.SCROLL_UPDATE, (h, m) => {
      const b = this.selection.lastRange, [x] = this.selection.getRange(), C = b && x ? {
        oldRange: b,
        newRange: x
      } : void 0;
      Ze.call(this, () => this.editor.update(null, m, C), h);
    }), this.emitter.on(st.events.SCROLL_EMBED_UPDATE, (h, m) => {
      const b = this.selection.lastRange, [x] = this.selection.getRange(), C = b && x ? {
        oldRange: b,
        newRange: x
      } : void 0;
      Ze.call(this, () => {
        const R = new ot().retain(h.offset(this)).retain({
          [h.statics.blotName]: m
        });
        return this.editor.update(R, [], C);
      }, U.sources.USER);
    }), r) {
      const h = this.clipboard.convert({
        html: `${r}<p><br></p>`,
        text: `
`
      });
      this.setContents(h);
    }
    this.history.clear(), this.options.placeholder && this.root.setAttribute("data-placeholder", this.options.placeholder), this.options.readOnly && this.disable(), this.allowReadOnlyEdits = !1;
  }
  addContainer(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
    if (typeof t == "string") {
      const r = t;
      t = document.createElement("div"), t.classList.add(r);
    }
    return this.container.insertBefore(t, e), t;
  }
  blur() {
    this.selection.setRange(null);
  }
  deleteText(t, e, r) {
    return [t, e, , r] = Mn(t, e, r), Ze.call(this, () => this.editor.deleteText(t, e), r, t, -1 * e);
  }
  disable() {
    this.enable(!1);
  }
  editReadOnly(t) {
    this.allowReadOnlyEdits = !0;
    const e = t();
    return this.allowReadOnlyEdits = !1, e;
  }
  enable() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
    this.scroll.enable(t), this.container.classList.toggle("ql-disabled", !t);
  }
  focus() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    this.selection.focus(), t.preventScroll || this.scrollSelectionIntoView();
  }
  format(t, e) {
    let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : st.sources.API;
    return Ze.call(this, () => {
      const o = this.getSelection(!0);
      let l = new ot();
      if (o == null) return l;
      if (this.scroll.query(t, lt.BLOCK))
        l = this.editor.formatLine(o.index, o.length, {
          [t]: e
        });
      else {
        if (o.length === 0)
          return this.selection.format(t, e), l;
        l = this.editor.formatText(o.index, o.length, {
          [t]: e
        });
      }
      return this.setSelection(o, st.sources.SILENT), l;
    }, r);
  }
  formatLine(t, e, r, o, l) {
    let h;
    return [t, e, h, l] = Mn(
      t,
      e,
      // @ts-expect-error
      r,
      o,
      l
    ), Ze.call(this, () => this.editor.formatLine(t, e, h), l, t, 0);
  }
  formatText(t, e, r, o, l) {
    let h;
    return [t, e, h, l] = Mn(
      // @ts-expect-error
      t,
      e,
      r,
      o,
      l
    ), Ze.call(this, () => this.editor.formatText(t, e, h), l, t, 0);
  }
  getBounds(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, r = null;
    if (typeof t == "number" ? r = this.selection.getBounds(t, e) : r = this.selection.getBounds(t.index, t.length), !r) return null;
    const o = this.container.getBoundingClientRect();
    return {
      bottom: r.bottom - o.top,
      height: r.height,
      left: r.left - o.left,
      right: r.right - o.left,
      top: r.top - o.top,
      width: r.width
    };
  }
  getContents() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.getLength() - t;
    return [t, e] = Mn(t, e), this.editor.getContents(t, e);
  }
  getFormat() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.getSelection(!0), e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    return typeof t == "number" ? this.editor.getFormat(t, e) : this.editor.getFormat(t.index, t.length);
  }
  getIndex(t) {
    return t.offset(this.scroll);
  }
  getLength() {
    return this.scroll.length();
  }
  getLeaf(t) {
    return this.scroll.leaf(t);
  }
  getLine(t) {
    return this.scroll.line(t);
  }
  getLines() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Number.MAX_VALUE;
    return typeof t != "number" ? this.scroll.lines(t.index, t.length) : this.scroll.lines(t, e);
  }
  getModule(t) {
    return this.theme.modules[t];
  }
  getSelection() {
    return (arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1) && this.focus(), this.update(), this.selection.getRange()[0];
  }
  getSemanticHTML() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, e = arguments.length > 1 ? arguments[1] : void 0;
    return typeof t == "number" && (e = e ?? this.getLength() - t), [t, e] = Mn(t, e), this.editor.getHTML(t, e);
  }
  getText() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, e = arguments.length > 1 ? arguments[1] : void 0;
    return typeof t == "number" && (e = e ?? this.getLength() - t), [t, e] = Mn(t, e), this.editor.getText(t, e);
  }
  hasFocus() {
    return this.selection.hasFocus();
  }
  insertEmbed(t, e, r) {
    let o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : U.sources.API;
    return Ze.call(this, () => this.editor.insertEmbed(t, e, r), o, t);
  }
  insertText(t, e, r, o, l) {
    let h;
    return [t, , h, l] = Mn(t, 0, r, o, l), Ze.call(this, () => this.editor.insertText(t, e, h), l, t, e.length);
  }
  isEnabled() {
    return this.scroll.isEnabled();
  }
  off() {
    return this.emitter.off(...arguments);
  }
  on() {
    return this.emitter.on(...arguments);
  }
  once() {
    return this.emitter.once(...arguments);
  }
  removeFormat(t, e, r) {
    return [t, e, , r] = Mn(t, e, r), Ze.call(this, () => this.editor.removeFormat(t, e), r, t);
  }
  scrollRectIntoView(t) {
    ep(this.root, t);
  }
  /**
   * @deprecated Use Quill#scrollSelectionIntoView() instead.
   */
  scrollIntoView() {
    console.warn("Quill#scrollIntoView() has been deprecated and will be removed in the near future. Please use Quill#scrollSelectionIntoView() instead."), this.scrollSelectionIntoView();
  }
  /**
   * Scroll the current selection into the visible area.
   * If the selection is already visible, no scrolling will occur.
   */
  scrollSelectionIntoView() {
    const t = this.selection.lastRange, e = t && this.selection.getBounds(t.index, t.length);
    e && this.scrollRectIntoView(e);
  }
  setContents(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : st.sources.API;
    return Ze.call(this, () => {
      t = new ot(t);
      const r = this.getLength(), o = this.editor.deleteText(0, r), l = this.editor.insertContents(0, t), h = this.editor.deleteText(this.getLength() - 1, 1);
      return o.compose(l).compose(h);
    }, e);
  }
  setSelection(t, e, r) {
    t == null ? this.selection.setRange(null, e || U.sources.API) : ([t, e, , r] = Mn(t, e, r), this.selection.setRange(new qr(Math.max(0, t), e), r), r !== st.sources.SILENT && this.scrollSelectionIntoView());
  }
  setText(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : st.sources.API;
    const r = new ot().insert(t);
    return this.setContents(r, e);
  }
  update() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : st.sources.USER;
    const e = this.scroll.update(t);
    return this.selection.update(t), e;
  }
  updateContents(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : st.sources.API;
    return Ze.call(this, () => (t = new ot(t), this.editor.applyDelta(t)), e, !0);
  }
}
function xa(i) {
  return typeof i == "string" ? document.querySelector(i) : i;
}
function zs(i) {
  return Object.entries(i ?? {}).reduce((t, e) => {
    let [r, o] = e;
    return {
      ...t,
      [r]: o === !0 ? {} : o
    };
  }, {});
}
function wa(i) {
  return Object.fromEntries(Object.entries(i).filter((t) => t[1] !== void 0));
}
function sp(i, t) {
  const e = xa(i);
  if (!e)
    throw new Error("Invalid Quill container");
  const o = !t.theme || t.theme === U.DEFAULTS.theme ? yi : U.import(`themes/${t.theme}`);
  if (!o)
    throw new Error(`Invalid theme ${t.theme}. Did you register it?`);
  const {
    modules: l,
    ...h
  } = U.DEFAULTS, {
    modules: m,
    ...b
  } = o.DEFAULTS;
  let x = zs(t.modules);
  x != null && x.toolbar && x.toolbar.constructor !== Object && (x = {
    ...x,
    toolbar: {
      container: x.toolbar
    }
  });
  const C = er({}, zs(l), zs(m), x), R = {
    ...h,
    ...wa(b),
    ...wa(t)
  };
  let E = t.registry;
  return E ? t.formats && di.warn('Ignoring "formats" option because "registry" is specified') : E = t.formats ? ip(t.formats, R.registry, di) : R.registry, {
    ...R,
    registry: E,
    container: e,
    theme: o,
    modules: Object.entries(C).reduce((_, q) => {
      let [k, F] = q;
      if (!F) return _;
      const j = U.import(`modules/${k}`);
      return j == null ? (di.error(`Cannot load ${k} module. Are you sure you registered it?`), _) : {
        ..._,
        // @ts-expect-error
        [k]: er({}, j.DEFAULTS || {}, F)
      };
    }, {}),
    bounds: xa(R.bounds)
  };
}
function Ze(i, t, e, r) {
  if (!this.isEnabled() && t === st.sources.USER && !this.allowReadOnlyEdits)
    return new ot();
  let o = e == null ? null : this.getSelection();
  const l = this.editor.delta, h = i();
  if (o != null && (e === !0 && (e = o.index), r == null ? o = Ta(o, h, t) : r !== 0 && (o = Ta(o, e, r, t)), this.setSelection(o, st.sources.SILENT)), h.length() > 0) {
    const m = [st.events.TEXT_CHANGE, h, l, t];
    this.emitter.emit(st.events.EDITOR_CHANGE, ...m), t !== st.sources.SILENT && this.emitter.emit(...m);
  }
  return h;
}
function Mn(i, t, e, r, o) {
  let l = {};
  return typeof i.index == "number" && typeof i.length == "number" ? typeof t != "number" ? (o = r, r = e, e = t, t = i.length, i = i.index) : (t = i.length, i = i.index) : typeof t != "number" && (o = r, r = e, e = t, t = 0), typeof e == "object" ? (l = e, o = r) : typeof e == "string" && (r != null ? l[e] = r : o = e), o = o || st.sources.API, [i, t, l, o];
}
function Ta(i, t, e, r) {
  const o = typeof e == "number" ? e : 0;
  if (i == null) return null;
  let l, h;
  return t && typeof t.transformPosition == "function" ? [l, h] = [i.index, i.index + i.length].map((m) => (
    // @ts-expect-error -- TODO: add a better type guard around `index`
    t.transformPosition(m, r !== st.sources.USER)
  )) : [l, h] = [i.index, i.index + i.length].map((m) => m < t || m === t && r === st.sources.USER ? m : o >= 0 ? m + o : Math.max(t, m + o)), new qr(l, h - l);
}
class Rr extends ws {
}
function Ea(i) {
  return i instanceof fe || i instanceof Fe;
}
function Aa(i) {
  return typeof i.updateContent == "function";
}
class op extends vo {
  static blotName = "scroll";
  static className = "ql-editor";
  static tagName = "DIV";
  static defaultChild = fe;
  static allowedChildren = [fe, Fe, Rr];
  constructor(t, e, r) {
    let {
      emitter: o
    } = r;
    super(t, e), this.emitter = o, this.batch = !1, this.optimize(), this.enable(), this.domNode.addEventListener("dragstart", (l) => this.handleDragStart(l));
  }
  batchStart() {
    Array.isArray(this.batch) || (this.batch = []);
  }
  batchEnd() {
    if (!this.batch) return;
    const t = this.batch;
    this.batch = !1, this.update(t);
  }
  emitMount(t) {
    this.emitter.emit(st.events.SCROLL_BLOT_MOUNT, t);
  }
  emitUnmount(t) {
    this.emitter.emit(st.events.SCROLL_BLOT_UNMOUNT, t);
  }
  emitEmbedUpdate(t, e) {
    this.emitter.emit(st.events.SCROLL_EMBED_UPDATE, t, e);
  }
  deleteAt(t, e) {
    const [r, o] = this.line(t), [l] = this.line(t + e);
    if (super.deleteAt(t, e), l != null && r !== l && o > 0) {
      if (r instanceof Fe || l instanceof Fe) {
        this.optimize();
        return;
      }
      const h = l.children.head instanceof nn ? null : l.children.head;
      r.moveChildren(l, h), r.remove();
    }
    this.optimize();
  }
  enable() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
    this.domNode.setAttribute("contenteditable", t ? "true" : "false");
  }
  formatAt(t, e, r, o) {
    super.formatAt(t, e, r, o), this.optimize();
  }
  insertAt(t, e, r) {
    if (t >= this.length())
      if (r == null || this.scroll.query(e, lt.BLOCK) == null) {
        const o = this.scroll.create(this.statics.defaultChild.blotName);
        this.appendChild(o), r == null && e.endsWith(`
`) ? o.insertAt(0, e.slice(0, -1), r) : o.insertAt(0, e, r);
      } else {
        const o = this.scroll.create(e, r);
        this.appendChild(o);
      }
    else
      super.insertAt(t, e, r);
    this.optimize();
  }
  insertBefore(t, e) {
    if (t.statics.scope === lt.INLINE_BLOT) {
      const r = this.scroll.create(this.statics.defaultChild.blotName);
      r.appendChild(t), super.insertBefore(r, e);
    } else
      super.insertBefore(t, e);
  }
  insertContents(t, e) {
    const r = this.deltaToRenderBlocks(e.concat(new ot().insert(`
`))), o = r.pop();
    if (o == null) return;
    this.batchStart();
    const l = r.shift();
    if (l) {
      const b = l.type === "block" && (l.delta.length() === 0 || !this.descendant(Fe, t)[0] && t < this.length()), x = l.type === "block" ? l.delta : new ot().insert({
        [l.key]: l.value
      });
      Ws(this, t, x);
      const C = l.type === "block" ? 1 : 0, R = t + x.length() + C;
      b && this.insertAt(R - 1, `
`);
      const E = He(this.line(t)[0]), _ = ze.AttributeMap.diff(E, l.attributes) || {};
      Object.keys(_).forEach((q) => {
        this.formatAt(R - 1, 1, q, _[q]);
      }), t = R;
    }
    let [h, m] = this.children.find(t);
    if (r.length && (h && (h = h.split(m), m = 0), r.forEach((b) => {
      if (b.type === "block") {
        const x = this.createBlock(b.attributes, h || void 0);
        Ws(x, 0, b.delta);
      } else {
        const x = this.create(b.key, b.value);
        this.insertBefore(x, h || void 0), Object.keys(b.attributes).forEach((C) => {
          x.format(C, b.attributes[C]);
        });
      }
    })), o.type === "block" && o.delta.length()) {
      const b = h ? h.offset(h.scroll) + m : this.length();
      Ws(this, b, o.delta);
    }
    this.batchEnd(), this.optimize();
  }
  isEnabled() {
    return this.domNode.getAttribute("contenteditable") === "true";
  }
  leaf(t) {
    const e = this.path(t).pop();
    if (!e)
      return [null, -1];
    const [r, o] = e;
    return r instanceof ge ? [r, o] : [null, -1];
  }
  line(t) {
    return t === this.length() ? this.line(t - 1) : this.descendant(Ea, t);
  }
  lines() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Number.MAX_VALUE;
    const r = (o, l, h) => {
      let m = [], b = h;
      return o.children.forEachAt(l, h, (x, C, R) => {
        Ea(x) ? m.push(x) : x instanceof ws && (m = m.concat(r(x, C, b))), b -= R;
      }), m;
    };
    return r(this, t, e);
  }
  optimize() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    this.batch || (super.optimize(t, e), t.length > 0 && this.emitter.emit(st.events.SCROLL_OPTIMIZE, t, e));
  }
  path(t) {
    return super.path(t).slice(1);
  }
  remove() {
  }
  update(t) {
    if (this.batch) {
      Array.isArray(t) && (this.batch = this.batch.concat(t));
      return;
    }
    let e = st.sources.USER;
    typeof t == "string" && (e = t), Array.isArray(t) || (t = this.observer.takeRecords()), t = t.filter((r) => {
      let {
        target: o
      } = r;
      const l = this.find(o, !0);
      return l && !Aa(l);
    }), t.length > 0 && this.emitter.emit(st.events.SCROLL_BEFORE_UPDATE, e, t), super.update(t.concat([])), t.length > 0 && this.emitter.emit(st.events.SCROLL_UPDATE, e, t);
  }
  updateEmbedAt(t, e, r) {
    const [o] = this.descendant((l) => l instanceof Fe, t);
    o && o.statics.blotName === e && Aa(o) && o.updateContent(r);
  }
  handleDragStart(t) {
    t.preventDefault();
  }
  deltaToRenderBlocks(t) {
    const e = [];
    let r = new ot();
    return t.forEach((o) => {
      const l = o?.insert;
      if (l)
        if (typeof l == "string") {
          const h = l.split(`
`);
          h.slice(0, -1).forEach((b) => {
            r.insert(b, o.attributes), e.push({
              type: "block",
              delta: r,
              attributes: o.attributes ?? {}
            }), r = new ot();
          });
          const m = h[h.length - 1];
          m && r.insert(m, o.attributes);
        } else {
          const h = Object.keys(l)[0];
          if (!h) return;
          this.query(h, lt.INLINE) ? r.push(o) : (r.length() && e.push({
            type: "block",
            delta: r,
            attributes: {}
          }), r = new ot(), e.push({
            type: "blockEmbed",
            key: h,
            value: l[h],
            attributes: o.attributes ?? {}
          }));
        }
    }), r.length() && e.push({
      type: "block",
      delta: r,
      attributes: {}
    }), e;
  }
  createBlock(t, e) {
    let r;
    const o = {};
    Object.entries(t).forEach((m) => {
      let [b, x] = m;
      this.query(b, lt.BLOCK & lt.BLOT) != null ? r = b : o[b] = x;
    });
    const l = this.create(r || this.statics.defaultChild.blotName, r ? t[r] : void 0);
    this.insertBefore(l, e || void 0);
    const h = l.length();
    return Object.entries(o).forEach((m) => {
      let [b, x] = m;
      l.formatAt(0, h, b, x);
    }), l;
  }
}
function Ws(i, t, e) {
  e.reduce((r, o) => {
    const l = ze.Op.length(o);
    let h = o.attributes || {};
    if (o.insert != null) {
      if (typeof o.insert == "string") {
        const m = o.insert;
        i.insertAt(r, m);
        const [b] = i.descendant(ge, r), x = He(b);
        h = ze.AttributeMap.diff(x, h) || {};
      } else if (typeof o.insert == "object") {
        const m = Object.keys(o.insert)[0];
        if (m == null) return r;
        if (i.insertAt(r, m, o.insert[m]), i.scroll.query(m, lt.INLINE) != null) {
          const [x] = i.descendant(ge, r), C = He(x);
          h = ze.AttributeMap.diff(C, h) || {};
        }
      }
    }
    return Object.keys(h).forEach((m) => {
      i.formatAt(r, l, m, h[m]);
    }), r + l;
  }, t);
}
const To = {
  scope: lt.BLOCK,
  whitelist: ["right", "center", "justify"]
}, ap = new wn("align", "align", To), El = new en("align", "ql-align", To), Al = new sr("align", "text-align", To);
class Nl extends sr {
  value(t) {
    let e = super.value(t);
    return e.startsWith("rgb(") ? (e = e.replace(/^[^\d]+/, "").replace(/[^\d]+$/, ""), `#${e.split(",").map((o) => `00${parseInt(o, 10).toString(16)}`.slice(-2)).join("")}`) : e;
  }
}
const lp = new en("color", "ql-color", {
  scope: lt.INLINE
}), Eo = new Nl("color", "color", {
  scope: lt.INLINE
}), up = new en("background", "ql-bg", {
  scope: lt.INLINE
}), Ao = new Nl("background", "background-color", {
  scope: lt.INLINE
});
class Mr extends Rr {
  static create(t) {
    const e = super.create(t);
    return e.setAttribute("spellcheck", "false"), e;
  }
  code(t, e) {
    return this.children.map((r) => r.length() <= 1 ? "" : r.domNode.innerText).join(`
`).slice(t, t + e);
  }
  html(t, e) {
    return `<pre>
${Ts(this.code(t, e))}
</pre>`;
  }
}
class Te extends fe {
  static TAB = "  ";
  static register() {
    U.register(Mr);
  }
}
class No extends we {
}
No.blotName = "code";
No.tagName = "CODE";
Te.blotName = "code-block";
Te.className = "ql-code-block";
Te.tagName = "DIV";
Mr.blotName = "code-block-container";
Mr.className = "ql-code-block-container";
Mr.tagName = "DIV";
Mr.allowedChildren = [Te];
Te.allowedChildren = [tn, nn, Ye];
Te.requiredContainer = Mr;
const So = {
  scope: lt.BLOCK,
  whitelist: ["rtl"]
}, Sl = new wn("direction", "dir", So), Cl = new en("direction", "ql-direction", So), Ll = new sr("direction", "direction", So), ql = {
  scope: lt.INLINE,
  whitelist: ["serif", "monospace"]
}, Ol = new en("font", "ql-font", ql);
class cp extends sr {
  value(t) {
    return super.value(t).replace(/["']/g, "");
  }
}
const _l = new cp("font", "font-family", ql), kl = new en("size", "ql-size", {
  scope: lt.INLINE,
  whitelist: ["small", "large", "huge"]
}), Il = new sr("size", "font-size", {
  scope: lt.INLINE,
  whitelist: ["10px", "18px", "32px"]
}), fp = Pn("quill:keyboard"), hp = /Mac/i.test(navigator.platform) ? "metaKey" : "ctrlKey";
class Es extends En {
  static match(t, e) {
    return ["altKey", "ctrlKey", "metaKey", "shiftKey"].some((r) => !!e[r] !== t[r] && e[r] !== null) ? !1 : e.key === t.key || e.key === t.which;
  }
  constructor(t, e) {
    super(t, e), this.bindings = {}, Object.keys(this.options.bindings).forEach((r) => {
      this.options.bindings[r] && this.addBinding(this.options.bindings[r]);
    }), this.addBinding({
      key: "Enter",
      shiftKey: null
    }, this.handleEnter), this.addBinding({
      key: "Enter",
      metaKey: null,
      ctrlKey: null,
      altKey: null
    }, () => {
    }), /Firefox/i.test(navigator.userAgent) ? (this.addBinding({
      key: "Backspace"
    }, {
      collapsed: !0
    }, this.handleBackspace), this.addBinding({
      key: "Delete"
    }, {
      collapsed: !0
    }, this.handleDelete)) : (this.addBinding({
      key: "Backspace"
    }, {
      collapsed: !0,
      prefix: /^.?$/
    }, this.handleBackspace), this.addBinding({
      key: "Delete"
    }, {
      collapsed: !0,
      suffix: /^.?$/
    }, this.handleDelete)), this.addBinding({
      key: "Backspace"
    }, {
      collapsed: !1
    }, this.handleDeleteRange), this.addBinding({
      key: "Delete"
    }, {
      collapsed: !1
    }, this.handleDeleteRange), this.addBinding({
      key: "Backspace",
      altKey: null,
      ctrlKey: null,
      metaKey: null,
      shiftKey: null
    }, {
      collapsed: !0,
      offset: 0
    }, this.handleBackspace), this.listen();
  }
  addBinding(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    const o = pp(t);
    if (o == null) {
      fp.warn("Attempted to add invalid keyboard binding", o);
      return;
    }
    typeof e == "function" && (e = {
      handler: e
    }), typeof r == "function" && (r = {
      handler: r
    }), (Array.isArray(o.key) ? o.key : [o.key]).forEach((h) => {
      const m = {
        ...o,
        key: h,
        ...e,
        ...r
      };
      this.bindings[m.key] = this.bindings[m.key] || [], this.bindings[m.key].push(m);
    });
  }
  listen() {
    this.quill.root.addEventListener("keydown", (t) => {
      if (t.defaultPrevented || t.isComposing || t.keyCode === 229 && (t.key === "Enter" || t.key === "Backspace")) return;
      const o = (this.bindings[t.key] || []).concat(this.bindings[t.which] || []).filter((j) => Es.match(t, j));
      if (o.length === 0) return;
      const l = U.find(t.target, !0);
      if (l && l.scroll !== this.quill.scroll) return;
      const h = this.quill.getSelection();
      if (h == null || !this.quill.hasFocus()) return;
      const [m, b] = this.quill.getLine(h.index), [x, C] = this.quill.getLeaf(h.index), [R, E] = h.length === 0 ? [x, C] : this.quill.getLeaf(h.index + h.length), _ = x instanceof ps ? x.value().slice(0, C) : "", q = R instanceof ps ? R.value().slice(E) : "", k = {
        collapsed: h.length === 0,
        // @ts-expect-error Fix me later
        empty: h.length === 0 && m.length() <= 1,
        format: this.quill.getFormat(h),
        line: m,
        offset: b,
        prefix: _,
        suffix: q,
        event: t
      };
      o.some((j) => {
        if (j.collapsed != null && j.collapsed !== k.collapsed || j.empty != null && j.empty !== k.empty || j.offset != null && j.offset !== k.offset)
          return !1;
        if (Array.isArray(j.format)) {
          if (j.format.every((Y) => k.format[Y] == null))
            return !1;
        } else if (typeof j.format == "object" && !Object.keys(j.format).every((Y) => j.format[Y] === !0 ? k.format[Y] != null : j.format[Y] === !1 ? k.format[Y] == null : yo(j.format[Y], k.format[Y])))
          return !1;
        return j.prefix != null && !j.prefix.test(k.prefix) || j.suffix != null && !j.suffix.test(k.suffix) ? !1 : j.handler.call(this, h, k, j) !== !0;
      }) && t.preventDefault();
    });
  }
  handleBackspace(t, e) {
    const r = /[\uD800-\uDBFF][\uDC00-\uDFFF]$/.test(e.prefix) ? 2 : 1;
    if (t.index === 0 || this.quill.getLength() <= 1) return;
    let o = {};
    const [l] = this.quill.getLine(t.index);
    let h = new ot().retain(t.index - r).delete(r);
    if (e.offset === 0) {
      const [m] = this.quill.getLine(t.index - 1);
      if (m && !(m.statics.blotName === "block" && m.length() <= 1)) {
        const x = l.formats(), C = this.quill.getFormat(t.index - 1, 1);
        if (o = ze.AttributeMap.diff(x, C) || {}, Object.keys(o).length > 0) {
          const R = new ot().retain(t.index + l.length() - 2).retain(1, o);
          h = h.compose(R);
        }
      }
    }
    this.quill.updateContents(h, U.sources.USER), this.quill.focus();
  }
  handleDelete(t, e) {
    const r = /^[\uD800-\uDBFF][\uDC00-\uDFFF]/.test(e.suffix) ? 2 : 1;
    if (t.index >= this.quill.getLength() - r) return;
    let o = {};
    const [l] = this.quill.getLine(t.index);
    let h = new ot().retain(t.index).delete(r);
    if (e.offset >= l.length() - 1) {
      const [m] = this.quill.getLine(t.index + 1);
      if (m) {
        const b = l.formats(), x = this.quill.getFormat(t.index, 1);
        o = ze.AttributeMap.diff(b, x) || {}, Object.keys(o).length > 0 && (h = h.retain(m.length() - 1).retain(1, o));
      }
    }
    this.quill.updateContents(h, U.sources.USER), this.quill.focus();
  }
  handleDeleteRange(t) {
    Co({
      range: t,
      quill: this.quill
    }), this.quill.focus();
  }
  handleEnter(t, e) {
    const r = Object.keys(e.format).reduce((l, h) => (this.quill.scroll.query(h, lt.BLOCK) && !Array.isArray(e.format[h]) && (l[h] = e.format[h]), l), {}), o = new ot().retain(t.index).delete(t.length).insert(`
`, r);
    this.quill.updateContents(o, U.sources.USER), this.quill.setSelection(t.index + 1, U.sources.SILENT), this.quill.focus();
  }
}
const dp = {
  bindings: {
    bold: Vs("bold"),
    italic: Vs("italic"),
    underline: Vs("underline"),
    indent: {
      // highlight tab or tab at beginning of list, indent or blockquote
      key: "Tab",
      format: ["blockquote", "indent", "list"],
      handler(i, t) {
        return t.collapsed && t.offset !== 0 ? !0 : (this.quill.format("indent", "+1", U.sources.USER), !1);
      }
    },
    outdent: {
      key: "Tab",
      shiftKey: !0,
      format: ["blockquote", "indent", "list"],
      // highlight tab or tab at beginning of list, indent or blockquote
      handler(i, t) {
        return t.collapsed && t.offset !== 0 ? !0 : (this.quill.format("indent", "-1", U.sources.USER), !1);
      }
    },
    "outdent backspace": {
      key: "Backspace",
      collapsed: !0,
      shiftKey: null,
      metaKey: null,
      ctrlKey: null,
      altKey: null,
      format: ["indent", "list"],
      offset: 0,
      handler(i, t) {
        t.format.indent != null ? this.quill.format("indent", "-1", U.sources.USER) : t.format.list != null && this.quill.format("list", !1, U.sources.USER);
      }
    },
    "indent code-block": Na(!0),
    "outdent code-block": Na(!1),
    "remove tab": {
      key: "Tab",
      shiftKey: !0,
      collapsed: !0,
      prefix: /\t$/,
      handler(i) {
        this.quill.deleteText(i.index - 1, 1, U.sources.USER);
      }
    },
    tab: {
      key: "Tab",
      handler(i, t) {
        if (t.format.table) return !0;
        this.quill.history.cutoff();
        const e = new ot().retain(i.index).delete(i.length).insert("	");
        return this.quill.updateContents(e, U.sources.USER), this.quill.history.cutoff(), this.quill.setSelection(i.index + 1, U.sources.SILENT), !1;
      }
    },
    "blockquote empty enter": {
      key: "Enter",
      collapsed: !0,
      format: ["blockquote"],
      empty: !0,
      handler() {
        this.quill.format("blockquote", !1, U.sources.USER);
      }
    },
    "list empty enter": {
      key: "Enter",
      collapsed: !0,
      format: ["list"],
      empty: !0,
      handler(i, t) {
        const e = {
          list: !1
        };
        t.format.indent && (e.indent = !1), this.quill.formatLine(i.index, i.length, e, U.sources.USER);
      }
    },
    "checklist enter": {
      key: "Enter",
      collapsed: !0,
      format: {
        list: "checked"
      },
      handler(i) {
        const [t, e] = this.quill.getLine(i.index), r = {
          // @ts-expect-error Fix me later
          ...t.formats(),
          list: "checked"
        }, o = new ot().retain(i.index).insert(`
`, r).retain(t.length() - e - 1).retain(1, {
          list: "unchecked"
        });
        this.quill.updateContents(o, U.sources.USER), this.quill.setSelection(i.index + 1, U.sources.SILENT), this.quill.scrollSelectionIntoView();
      }
    },
    "header enter": {
      key: "Enter",
      collapsed: !0,
      format: ["header"],
      suffix: /^$/,
      handler(i, t) {
        const [e, r] = this.quill.getLine(i.index), o = new ot().retain(i.index).insert(`
`, t.format).retain(e.length() - r - 1).retain(1, {
          header: null
        });
        this.quill.updateContents(o, U.sources.USER), this.quill.setSelection(i.index + 1, U.sources.SILENT), this.quill.scrollSelectionIntoView();
      }
    },
    "table backspace": {
      key: "Backspace",
      format: ["table"],
      collapsed: !0,
      offset: 0,
      handler() {
      }
    },
    "table delete": {
      key: "Delete",
      format: ["table"],
      collapsed: !0,
      suffix: /^$/,
      handler() {
      }
    },
    "table enter": {
      key: "Enter",
      shiftKey: null,
      format: ["table"],
      handler(i) {
        const t = this.quill.getModule("table");
        if (t) {
          const [e, r, o, l] = t.getTable(i), h = gp(e, r, o, l);
          if (h == null) return;
          let m = e.offset();
          if (h < 0) {
            const b = new ot().retain(m).insert(`
`);
            this.quill.updateContents(b, U.sources.USER), this.quill.setSelection(i.index + 1, i.length, U.sources.SILENT);
          } else if (h > 0) {
            m += e.length();
            const b = new ot().retain(m).insert(`
`);
            this.quill.updateContents(b, U.sources.USER), this.quill.setSelection(m, U.sources.USER);
          }
        }
      }
    },
    "table tab": {
      key: "Tab",
      shiftKey: null,
      format: ["table"],
      handler(i, t) {
        const {
          event: e,
          line: r
        } = t, o = r.offset(this.quill.scroll);
        e.shiftKey ? this.quill.setSelection(o - 1, U.sources.USER) : this.quill.setSelection(o + r.length(), U.sources.USER);
      }
    },
    "list autofill": {
      key: " ",
      shiftKey: null,
      collapsed: !0,
      format: {
        "code-block": !1,
        blockquote: !1,
        table: !1
      },
      prefix: /^\s*?(\d+\.|-|\*|\[ ?\]|\[x\])$/,
      handler(i, t) {
        if (this.quill.scroll.query("list") == null) return !0;
        const {
          length: e
        } = t.prefix, [r, o] = this.quill.getLine(i.index);
        if (o > e) return !0;
        let l;
        switch (t.prefix.trim()) {
          case "[]":
          case "[ ]":
            l = "unchecked";
            break;
          case "[x]":
            l = "checked";
            break;
          case "-":
          case "*":
            l = "bullet";
            break;
          default:
            l = "ordered";
        }
        this.quill.insertText(i.index, " ", U.sources.USER), this.quill.history.cutoff();
        const h = new ot().retain(i.index - o).delete(e + 1).retain(r.length() - 2 - o).retain(1, {
          list: l
        });
        return this.quill.updateContents(h, U.sources.USER), this.quill.history.cutoff(), this.quill.setSelection(i.index - e, U.sources.SILENT), !1;
      }
    },
    "code exit": {
      key: "Enter",
      collapsed: !0,
      format: ["code-block"],
      prefix: /^$/,
      suffix: /^\s*$/,
      handler(i) {
        const [t, e] = this.quill.getLine(i.index);
        let r = 2, o = t;
        for (; o != null && o.length() <= 1 && o.formats()["code-block"]; )
          if (o = o.prev, r -= 1, r <= 0) {
            const l = new ot().retain(i.index + t.length() - e - 2).retain(1, {
              "code-block": null
            }).delete(1);
            return this.quill.updateContents(l, U.sources.USER), this.quill.setSelection(i.index - 1, U.sources.SILENT), !1;
          }
        return !0;
      }
    },
    "embed left": ss("ArrowLeft", !1),
    "embed left shift": ss("ArrowLeft", !0),
    "embed right": ss("ArrowRight", !1),
    "embed right shift": ss("ArrowRight", !0),
    "table down": Sa(!1),
    "table up": Sa(!0)
  }
};
Es.DEFAULTS = dp;
function Na(i) {
  return {
    key: "Tab",
    shiftKey: !i,
    format: {
      "code-block": !0
    },
    handler(t, e) {
      let {
        event: r
      } = e;
      const o = this.quill.scroll.query("code-block"), {
        TAB: l
      } = o;
      if (t.length === 0 && !r.shiftKey) {
        this.quill.insertText(t.index, l, U.sources.USER), this.quill.setSelection(t.index + l.length, U.sources.SILENT);
        return;
      }
      const h = t.length === 0 ? this.quill.getLines(t.index, 1) : this.quill.getLines(t);
      let {
        index: m,
        length: b
      } = t;
      h.forEach((x, C) => {
        i ? (x.insertAt(0, l), C === 0 ? m += l.length : b += l.length) : x.domNode.textContent.startsWith(l) && (x.deleteAt(0, l.length), C === 0 ? m -= l.length : b -= l.length);
      }), this.quill.update(U.sources.USER), this.quill.setSelection(m, b, U.sources.SILENT);
    }
  };
}
function ss(i, t) {
  return {
    key: i,
    shiftKey: t,
    altKey: null,
    [i === "ArrowLeft" ? "prefix" : "suffix"]: /^$/,
    handler(r) {
      let {
        index: o
      } = r;
      i === "ArrowRight" && (o += r.length + 1);
      const [l] = this.quill.getLeaf(o);
      return l instanceof Re ? (i === "ArrowLeft" ? t ? this.quill.setSelection(r.index - 1, r.length + 1, U.sources.USER) : this.quill.setSelection(r.index - 1, U.sources.USER) : t ? this.quill.setSelection(r.index, r.length + 1, U.sources.USER) : this.quill.setSelection(r.index + r.length + 1, U.sources.USER), !1) : !0;
    }
  };
}
function Vs(i) {
  return {
    key: i[0],
    shortKey: !0,
    handler(t, e) {
      this.quill.format(i, !e.format[i], U.sources.USER);
    }
  };
}
function Sa(i) {
  return {
    key: i ? "ArrowUp" : "ArrowDown",
    collapsed: !0,
    format: ["table"],
    handler(t, e) {
      const r = i ? "prev" : "next", o = e.line, l = o.parent[r];
      if (l != null) {
        if (l.statics.blotName === "table-row") {
          let h = l.children.head, m = o;
          for (; m.prev != null; )
            m = m.prev, h = h.next;
          const b = h.offset(this.quill.scroll) + Math.min(e.offset, h.length() - 1);
          this.quill.setSelection(b, 0, U.sources.USER);
        }
      } else {
        const h = o.table()[r];
        h != null && (i ? this.quill.setSelection(h.offset(this.quill.scroll) + h.length() - 1, 0, U.sources.USER) : this.quill.setSelection(h.offset(this.quill.scroll), 0, U.sources.USER));
      }
      return !1;
    }
  };
}
function pp(i) {
  if (typeof i == "string" || typeof i == "number")
    i = {
      key: i
    };
  else if (typeof i == "object")
    i = fi(i);
  else
    return null;
  return i.shortKey && (i[hp] = i.shortKey, delete i.shortKey), i;
}
function Co(i) {
  let {
    quill: t,
    range: e
  } = i;
  const r = t.getLines(e);
  let o = {};
  if (r.length > 1) {
    const l = r[0].formats(), h = r[r.length - 1].formats();
    o = ze.AttributeMap.diff(h, l) || {};
  }
  t.deleteText(e, U.sources.USER), Object.keys(o).length > 0 && t.formatLine(e.index, 1, o, U.sources.USER), t.setSelection(e.index, U.sources.SILENT);
}
function gp(i, t, e, r) {
  return t.prev == null && t.next == null ? e.prev == null && e.next == null ? r === 0 ? -1 : 1 : e.prev == null ? -1 : 1 : t.prev == null ? -1 : t.next == null ? 1 : null;
}
const mp = /font-weight:\s*normal/, yp = ["P", "OL", "UL"], Ca = (i) => i && yp.includes(i.tagName), bp = (i) => {
  Array.from(i.querySelectorAll("br")).filter((t) => Ca(t.previousElementSibling) && Ca(t.nextElementSibling)).forEach((t) => {
    t.parentNode?.removeChild(t);
  });
}, vp = (i) => {
  Array.from(i.querySelectorAll('b[style*="font-weight"]')).filter((t) => t.getAttribute("style")?.match(mp)).forEach((t) => {
    const e = i.createDocumentFragment();
    e.append(...t.childNodes), t.parentNode?.replaceChild(e, t);
  });
};
function xp(i) {
  i.querySelector('[id^="docs-internal-guid-"]') && (vp(i), bp(i));
}
const wp = /\bmso-list:[^;]*ignore/i, Tp = /\bmso-list:[^;]*\bl(\d+)/i, Ep = /\bmso-list:[^;]*\blevel(\d+)/i, Ap = (i, t) => {
  const e = i.getAttribute("style"), r = e?.match(Tp);
  if (!r)
    return null;
  const o = Number(r[1]), l = e?.match(Ep), h = l ? Number(l[1]) : 1, m = new RegExp(`@list l${o}:level${h}\\s*\\{[^\\}]*mso-level-number-format:\\s*([\\w-]+)`, "i"), b = t.match(m), x = b && b[1] === "bullet" ? "bullet" : "ordered";
  return {
    id: o,
    indent: h,
    type: x,
    element: i
  };
}, Np = (i) => {
  const t = Array.from(i.querySelectorAll("[style*=mso-list]")), e = [], r = [];
  t.forEach((h) => {
    (h.getAttribute("style") || "").match(wp) ? e.push(h) : r.push(h);
  }), e.forEach((h) => h.parentNode?.removeChild(h));
  const o = i.documentElement.innerHTML, l = r.map((h) => Ap(h, o)).filter((h) => h);
  for (; l.length; ) {
    const h = [];
    let m = l.shift();
    for (; m; )
      h.push(m), m = l.length && l[0]?.element === m.element.nextElementSibling && // Different id means the next item doesn't belong to this group.
      l[0].id === m.id ? l.shift() : null;
    const b = document.createElement("ul");
    h.forEach((R) => {
      const E = document.createElement("li");
      E.setAttribute("data-list", R.type), R.indent > 1 && E.setAttribute("class", `ql-indent-${R.indent - 1}`), E.innerHTML = R.element.innerHTML, b.appendChild(E);
    });
    const x = h[0]?.element, {
      parentNode: C
    } = x ?? {};
    x && C?.replaceChild(b, x), h.slice(1).forEach((R) => {
      let {
        element: E
      } = R;
      C?.removeChild(E);
    });
  }
};
function Sp(i) {
  i.documentElement.getAttribute("xmlns:w") === "urn:schemas-microsoft-com:office:word" && Np(i);
}
const Cp = [Sp, xp], Lp = (i) => {
  i.documentElement && Cp.forEach((t) => {
    t(i);
  });
}, qp = Pn("quill:clipboard"), Op = [[Node.TEXT_NODE, Fp], [Node.TEXT_NODE, qa], ["br", Dp], [Node.ELEMENT_NODE, qa], [Node.ELEMENT_NODE, Mp], [Node.ELEMENT_NODE, Rp], [Node.ELEMENT_NODE, Hp], ["li", Pp], ["ol, ul", $p], ["pre", jp], ["tr", Up], ["b", Gs("bold")], ["i", Gs("italic")], ["strike", Gs("strike")], ["style", Bp]], _p = [ap, Sl].reduce((i, t) => (i[t.keyName] = t, i), {}), La = [Al, Ao, Eo, Ll, _l, Il].reduce((i, t) => (i[t.keyName] = t, i), {});
class kp extends En {
  static DEFAULTS = {
    matchers: []
  };
  constructor(t, e) {
    super(t, e), this.quill.root.addEventListener("copy", (r) => this.onCaptureCopy(r, !1)), this.quill.root.addEventListener("cut", (r) => this.onCaptureCopy(r, !0)), this.quill.root.addEventListener("paste", this.onCapturePaste.bind(this)), this.matchers = [], Op.concat(this.options.matchers ?? []).forEach((r) => {
      let [o, l] = r;
      this.addMatcher(o, l);
    });
  }
  addMatcher(t, e) {
    this.matchers.push([t, e]);
  }
  convert(t) {
    let {
      html: e,
      text: r
    } = t, o = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (o[Te.blotName])
      return new ot().insert(r || "", {
        [Te.blotName]: o[Te.blotName]
      });
    if (!e)
      return new ot().insert(r || "", o);
    const l = this.convertHTML(e);
    return Fi(l, `
`) && (l.ops[l.ops.length - 1].attributes == null || o.table) ? l.compose(new ot().retain(l.length() - 1).delete(1)) : l;
  }
  normalizeHTML(t) {
    Lp(t);
  }
  convertHTML(t) {
    const e = new DOMParser().parseFromString(t, "text/html");
    this.normalizeHTML(e);
    const r = e.body, o = /* @__PURE__ */ new WeakMap(), [l, h] = this.prepareMatching(r, o);
    return Lo(this.quill.scroll, r, l, h, o);
  }
  dangerouslyPasteHTML(t, e) {
    let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : U.sources.API;
    if (typeof t == "string") {
      const o = this.convert({
        html: t,
        text: ""
      });
      this.quill.setContents(o, e), this.quill.setSelection(0, U.sources.SILENT);
    } else {
      const o = this.convert({
        html: e,
        text: ""
      });
      this.quill.updateContents(new ot().retain(t).concat(o), r), this.quill.setSelection(t + o.length(), U.sources.SILENT);
    }
  }
  onCaptureCopy(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    if (t.defaultPrevented) return;
    t.preventDefault();
    const [r] = this.quill.selection.getRange();
    if (r == null) return;
    const {
      html: o,
      text: l
    } = this.onCopy(r, e);
    t.clipboardData?.setData("text/plain", l), t.clipboardData?.setData("text/html", o), e && Co({
      range: r,
      quill: this.quill
    });
  }
  /*
   * https://www.iana.org/assignments/media-types/text/uri-list
   */
  normalizeURIList(t) {
    return t.split(/\r?\n/).filter((e) => e[0] !== "#").join(`
`);
  }
  onCapturePaste(t) {
    if (t.defaultPrevented || !this.quill.isEnabled()) return;
    t.preventDefault();
    const e = this.quill.getSelection(!0);
    if (e == null) return;
    const r = t.clipboardData?.getData("text/html");
    let o = t.clipboardData?.getData("text/plain");
    if (!r && !o) {
      const h = t.clipboardData?.getData("text/uri-list");
      h && (o = this.normalizeURIList(h));
    }
    const l = Array.from(t.clipboardData?.files || []);
    if (!r && l.length > 0) {
      this.quill.uploader.upload(e, l);
      return;
    }
    if (r && l.length > 0) {
      const h = new DOMParser().parseFromString(r, "text/html");
      if (h.body.childElementCount === 1 && h.body.firstElementChild?.tagName === "IMG") {
        this.quill.uploader.upload(e, l);
        return;
      }
    }
    this.onPaste(e, {
      html: r,
      text: o
    });
  }
  onCopy(t) {
    const e = this.quill.getText(t);
    return {
      html: this.quill.getSemanticHTML(t),
      text: e
    };
  }
  onPaste(t, e) {
    let {
      text: r,
      html: o
    } = e;
    const l = this.quill.getFormat(t.index), h = this.convert({
      text: r,
      html: o
    }, l);
    qp.log("onPaste", h, {
      text: r,
      html: o
    });
    const m = new ot().retain(t.index).delete(t.length).concat(h);
    this.quill.updateContents(m, U.sources.USER), this.quill.setSelection(m.length() - t.length, U.sources.SILENT), this.quill.scrollSelectionIntoView();
  }
  prepareMatching(t, e) {
    const r = [], o = [];
    return this.matchers.forEach((l) => {
      const [h, m] = l;
      switch (h) {
        case Node.TEXT_NODE:
          o.push(m);
          break;
        case Node.ELEMENT_NODE:
          r.push(m);
          break;
        default:
          Array.from(t.querySelectorAll(h)).forEach((b) => {
            e.has(b) ? e.get(b)?.push(m) : e.set(b, [m]);
          });
          break;
      }
    }), [r, o];
  }
}
function Dr(i, t, e, r) {
  return r.query(t) ? i.reduce((o, l) => {
    if (!l.insert) return o;
    if (l.attributes && l.attributes[t])
      return o.push(l);
    const h = e ? {
      [t]: e
    } : {};
    return o.insert(l.insert, {
      ...h,
      ...l.attributes
    });
  }, new ot()) : i;
}
function Fi(i, t) {
  let e = "";
  for (let r = i.ops.length - 1; r >= 0 && e.length < t.length; --r) {
    const o = i.ops[r];
    if (typeof o.insert != "string") break;
    e = o.insert + e;
  }
  return e.slice(-1 * t.length) === t;
}
function tr(i, t) {
  if (!(i instanceof Element)) return !1;
  const e = t.query(i);
  return e && e.prototype instanceof Re ? !1 : ["address", "article", "blockquote", "canvas", "dd", "div", "dl", "dt", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "iframe", "li", "main", "nav", "ol", "output", "p", "pre", "section", "table", "td", "tr", "ul", "video"].includes(i.tagName.toLowerCase());
}
function Ip(i, t) {
  return i.previousElementSibling && i.nextElementSibling && !tr(i.previousElementSibling, t) && !tr(i.nextElementSibling, t);
}
const os = /* @__PURE__ */ new WeakMap();
function Rl(i) {
  return i == null ? !1 : (os.has(i) || (i.tagName === "PRE" ? os.set(i, !0) : os.set(i, Rl(i.parentNode))), os.get(i));
}
function Lo(i, t, e, r, o) {
  return t.nodeType === t.TEXT_NODE ? r.reduce((l, h) => h(t, l, i), new ot()) : t.nodeType === t.ELEMENT_NODE ? Array.from(t.childNodes || []).reduce((l, h) => {
    let m = Lo(i, h, e, r, o);
    return h.nodeType === t.ELEMENT_NODE && (m = e.reduce((b, x) => x(h, b, i), m), m = (o.get(h) || []).reduce((b, x) => x(h, b, i), m)), l.concat(m);
  }, new ot()) : new ot();
}
function Gs(i) {
  return (t, e, r) => Dr(e, i, !0, r);
}
function Rp(i, t, e) {
  const r = wn.keys(i), o = en.keys(i), l = sr.keys(i), h = {};
  return r.concat(o).concat(l).forEach((m) => {
    let b = e.query(m, lt.ATTRIBUTE);
    b != null && (h[b.attrName] = b.value(i), h[b.attrName]) || (b = _p[m], b != null && (b.attrName === m || b.keyName === m) && (h[b.attrName] = b.value(i) || void 0), b = La[m], b != null && (b.attrName === m || b.keyName === m) && (b = La[m], h[b.attrName] = b.value(i) || void 0));
  }), Object.entries(h).reduce((m, b) => {
    let [x, C] = b;
    return Dr(m, x, C, e);
  }, t);
}
function Mp(i, t, e) {
  const r = e.query(i);
  if (r == null) return t;
  if (r.prototype instanceof Re) {
    const o = {}, l = r.value(i);
    if (l != null)
      return o[r.blotName] = l, new ot().insert(o, r.formats(i, e));
  } else if (r.prototype instanceof Pi && !Fi(t, `
`) && t.insert(`
`), "blotName" in r && "formats" in r && typeof r.formats == "function")
    return Dr(t, r.blotName, r.formats(i, e), e);
  return t;
}
function Dp(i, t) {
  return Fi(t, `
`) || t.insert(`
`), t;
}
function jp(i, t, e) {
  const r = e.query("code-block"), o = r && "formats" in r && typeof r.formats == "function" ? r.formats(i, e) : !0;
  return Dr(t, "code-block", o, e);
}
function Bp() {
  return new ot();
}
function Pp(i, t, e) {
  const r = e.query(i);
  if (r == null || // @ts-expect-error
  r.blotName !== "list" || !Fi(t, `
`))
    return t;
  let o = -1, l = i.parentNode;
  for (; l != null; )
    ["OL", "UL"].includes(l.tagName) && (o += 1), l = l.parentNode;
  return o <= 0 ? t : t.reduce((h, m) => m.insert ? m.attributes && typeof m.attributes.indent == "number" ? h.push(m) : h.insert(m.insert, {
    indent: o,
    ...m.attributes || {}
  }) : h, new ot());
}
function $p(i, t, e) {
  const r = i;
  let o = r.tagName === "OL" ? "ordered" : "bullet";
  const l = r.getAttribute("data-checked");
  return l && (o = l === "true" ? "checked" : "unchecked"), Dr(t, "list", o, e);
}
function qa(i, t, e) {
  if (!Fi(t, `
`)) {
    if (tr(i, e) && (i.childNodes.length > 0 || i instanceof HTMLParagraphElement))
      return t.insert(`
`);
    if (t.length() > 0 && i.nextSibling) {
      let r = i.nextSibling;
      for (; r != null; ) {
        if (tr(r, e))
          return t.insert(`
`);
        const o = e.query(r);
        if (o && o.prototype instanceof Fe)
          return t.insert(`
`);
        r = r.firstChild;
      }
    }
  }
  return t;
}
function Hp(i, t, e) {
  const r = {}, o = i.style || {};
  return o.fontStyle === "italic" && (r.italic = !0), o.textDecoration === "underline" && (r.underline = !0), o.textDecoration === "line-through" && (r.strike = !0), (o.fontWeight?.startsWith("bold") || // @ts-expect-error Fix me later
  parseInt(o.fontWeight, 10) >= 700) && (r.bold = !0), t = Object.entries(r).reduce((l, h) => {
    let [m, b] = h;
    return Dr(l, m, b, e);
  }, t), parseFloat(o.textIndent || 0) > 0 ? new ot().insert("	").concat(t) : t;
}
function Up(i, t, e) {
  const r = i.parentElement?.tagName === "TABLE" ? i.parentElement : i.parentElement?.parentElement;
  if (r != null) {
    const l = Array.from(r.querySelectorAll("tr")).indexOf(i) + 1;
    return Dr(t, "table", l, e);
  }
  return t;
}
function Fp(i, t, e) {
  let r = i.data;
  if (i.parentElement?.tagName === "O:P")
    return t.insert(r.trim());
  if (!Rl(i)) {
    if (r.trim().length === 0 && r.includes(`
`) && !Ip(i, e))
      return t;
    r = r.replace(/[^\S\u00a0]/g, " "), r = r.replace(/ {2,}/g, " "), (i.previousSibling == null && i.parentElement != null && tr(i.parentElement, e) || i.previousSibling instanceof Element && tr(i.previousSibling, e)) && (r = r.replace(/^ /, "")), (i.nextSibling == null && i.parentElement != null && tr(i.parentElement, e) || i.nextSibling instanceof Element && tr(i.nextSibling, e)) && (r = r.replace(/ $/, "")), r = r.replaceAll(" ", " ");
  }
  return t.insert(r);
}
class zp extends En {
  static DEFAULTS = {
    delay: 1e3,
    maxStack: 100,
    userOnly: !1
  };
  lastRecorded = 0;
  ignoreChange = !1;
  stack = {
    undo: [],
    redo: []
  };
  currentRange = null;
  constructor(t, e) {
    super(t, e), this.quill.on(U.events.EDITOR_CHANGE, (r, o, l, h) => {
      r === U.events.SELECTION_CHANGE ? o && h !== U.sources.SILENT && (this.currentRange = o) : r === U.events.TEXT_CHANGE && (this.ignoreChange || (!this.options.userOnly || h === U.sources.USER ? this.record(o, l) : this.transform(o)), this.currentRange = uo(this.currentRange, o));
    }), this.quill.keyboard.addBinding({
      key: "z",
      shortKey: !0
    }, this.undo.bind(this)), this.quill.keyboard.addBinding({
      key: ["z", "Z"],
      shortKey: !0,
      shiftKey: !0
    }, this.redo.bind(this)), /Win/i.test(navigator.platform) && this.quill.keyboard.addBinding({
      key: "y",
      shortKey: !0
    }, this.redo.bind(this)), this.quill.root.addEventListener("beforeinput", (r) => {
      r.inputType === "historyUndo" ? (this.undo(), r.preventDefault()) : r.inputType === "historyRedo" && (this.redo(), r.preventDefault());
    });
  }
  change(t, e) {
    if (this.stack[t].length === 0) return;
    const r = this.stack[t].pop();
    if (!r) return;
    const o = this.quill.getContents(), l = r.delta.invert(o);
    this.stack[e].push({
      delta: l,
      range: uo(r.range, l)
    }), this.lastRecorded = 0, this.ignoreChange = !0, this.quill.updateContents(r.delta, U.sources.USER), this.ignoreChange = !1, this.restoreSelection(r);
  }
  clear() {
    this.stack = {
      undo: [],
      redo: []
    };
  }
  cutoff() {
    this.lastRecorded = 0;
  }
  record(t, e) {
    if (t.ops.length === 0) return;
    this.stack.redo = [];
    let r = t.invert(e), o = this.currentRange;
    const l = Date.now();
    if (
      // @ts-expect-error Fix me later
      this.lastRecorded + this.options.delay > l && this.stack.undo.length > 0
    ) {
      const h = this.stack.undo.pop();
      h && (r = r.compose(h.delta), o = h.range);
    } else
      this.lastRecorded = l;
    r.length() !== 0 && (this.stack.undo.push({
      delta: r,
      range: o
    }), this.stack.undo.length > this.options.maxStack && this.stack.undo.shift());
  }
  redo() {
    this.change("redo", "undo");
  }
  transform(t) {
    Oa(this.stack.undo, t), Oa(this.stack.redo, t);
  }
  undo() {
    this.change("undo", "redo");
  }
  restoreSelection(t) {
    if (t.range)
      this.quill.setSelection(t.range, U.sources.USER);
    else {
      const e = Vp(this.quill.scroll, t.delta);
      this.quill.setSelection(e, U.sources.USER);
    }
  }
}
function Oa(i, t) {
  let e = t;
  for (let r = i.length - 1; r >= 0; r -= 1) {
    const o = i[r];
    i[r] = {
      delta: e.transform(o.delta, !0),
      range: o.range && uo(o.range, e)
    }, e = o.delta.transform(e), i[r].delta.length() === 0 && i.splice(r, 1);
  }
}
function Wp(i, t) {
  const e = t.ops[t.ops.length - 1];
  return e == null ? !1 : e.insert != null ? typeof e.insert == "string" && e.insert.endsWith(`
`) : e.attributes != null ? Object.keys(e.attributes).some((r) => i.query(r, lt.BLOCK) != null) : !1;
}
function Vp(i, t) {
  const e = t.reduce((o, l) => o + (l.delete || 0), 0);
  let r = t.length() - e;
  return Wp(i, t) && (r -= 1), r;
}
function uo(i, t) {
  if (!i) return i;
  const e = t.transformPosition(i.index), r = t.transformPosition(i.index + i.length);
  return {
    index: e,
    length: r - e
  };
}
class Ml extends En {
  constructor(t, e) {
    super(t, e), t.root.addEventListener("drop", (r) => {
      r.preventDefault();
      let o = null;
      if (document.caretRangeFromPoint)
        o = document.caretRangeFromPoint(r.clientX, r.clientY);
      else if (document.caretPositionFromPoint) {
        const h = document.caretPositionFromPoint(r.clientX, r.clientY);
        o = document.createRange(), o.setStart(h.offsetNode, h.offset), o.setEnd(h.offsetNode, h.offset);
      }
      const l = o && t.selection.normalizeNative(o);
      if (l) {
        const h = t.selection.normalizedToRange(l);
        r.dataTransfer?.files && this.upload(h, r.dataTransfer.files);
      }
    });
  }
  upload(t, e) {
    const r = [];
    Array.from(e).forEach((o) => {
      o && this.options.mimetypes?.includes(o.type) && r.push(o);
    }), r.length > 0 && this.options.handler.call(this, t, r);
  }
}
Ml.DEFAULTS = {
  mimetypes: ["image/png", "image/jpeg"],
  handler(i, t) {
    if (!this.quill.scroll.query("image"))
      return;
    const e = t.map((r) => new Promise((o) => {
      const l = new FileReader();
      l.onload = () => {
        o(l.result);
      }, l.readAsDataURL(r);
    }));
    Promise.all(e).then((r) => {
      const o = r.reduce((l, h) => l.insert({
        image: h
      }), new ot().retain(i.index).delete(i.length));
      this.quill.updateContents(o, st.sources.USER), this.quill.setSelection(i.index + r.length, st.sources.SILENT);
    });
  }
};
const Gp = ["insertText", "insertReplacementText"];
class Kp extends En {
  constructor(t, e) {
    super(t, e), t.root.addEventListener("beforeinput", (r) => {
      this.handleBeforeInput(r);
    }), /Android/i.test(navigator.userAgent) || t.on(U.events.COMPOSITION_BEFORE_START, () => {
      this.handleCompositionStart();
    });
  }
  deleteRange(t) {
    Co({
      range: t,
      quill: this.quill
    });
  }
  replaceText(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    if (t.length === 0) return !1;
    if (e) {
      const r = this.quill.getFormat(t.index, 1);
      this.deleteRange(t), this.quill.updateContents(new ot().retain(t.index).insert(e, r), U.sources.USER);
    } else
      this.deleteRange(t);
    return this.quill.setSelection(t.index + e.length, 0, U.sources.SILENT), !0;
  }
  handleBeforeInput(t) {
    if (this.quill.composition.isComposing || t.defaultPrevented || !Gp.includes(t.inputType))
      return;
    const e = t.getTargetRanges ? t.getTargetRanges()[0] : null;
    if (!e || e.collapsed === !0)
      return;
    const r = Zp(t);
    if (r == null)
      return;
    const o = this.quill.selection.normalizeNative(e), l = o ? this.quill.selection.normalizedToRange(o) : null;
    l && this.replaceText(l, r) && t.preventDefault();
  }
  handleCompositionStart() {
    const t = this.quill.getSelection();
    t && this.replaceText(t);
  }
}
function Zp(i) {
  return typeof i.data == "string" ? i.data : i.dataTransfer?.types.includes("text/plain") ? i.dataTransfer.getData("text/plain") : null;
}
const Xp = /Mac/i.test(navigator.platform), Yp = 100, Qp = (i) => !!(i.key === "ArrowLeft" || i.key === "ArrowRight" || // RTL scripts or moving from the end of the previous line
i.key === "ArrowUp" || i.key === "ArrowDown" || i.key === "Home" || Xp && i.key === "a" && i.ctrlKey === !0);
class Jp extends En {
  isListening = !1;
  selectionChangeDeadline = 0;
  constructor(t, e) {
    super(t, e), this.handleArrowKeys(), this.handleNavigationShortcuts();
  }
  handleArrowKeys() {
    this.quill.keyboard.addBinding({
      key: ["ArrowLeft", "ArrowRight"],
      offset: 0,
      shiftKey: null,
      handler(t, e) {
        let {
          line: r,
          event: o
        } = e;
        if (!(r instanceof Je) || !r.uiNode)
          return !0;
        const l = getComputedStyle(r.domNode).direction === "rtl";
        return l && o.key !== "ArrowRight" || !l && o.key !== "ArrowLeft" ? !0 : (this.quill.setSelection(t.index - 1, t.length + (o.shiftKey ? 1 : 0), U.sources.USER), !1);
      }
    });
  }
  handleNavigationShortcuts() {
    this.quill.root.addEventListener("keydown", (t) => {
      !t.defaultPrevented && Qp(t) && this.ensureListeningToSelectionChange();
    });
  }
  /**
   * We only listen to the `selectionchange` event when
   * there is an intention of moving the caret to the beginning using shortcuts.
   * This is primarily implemented to prevent infinite loops, as we are changing
   * the selection within the handler of a `selectionchange` event.
   */
  ensureListeningToSelectionChange() {
    if (this.selectionChangeDeadline = Date.now() + Yp, this.isListening) return;
    this.isListening = !0;
    const t = () => {
      this.isListening = !1, Date.now() <= this.selectionChangeDeadline && this.handleSelectionChange();
    };
    document.addEventListener("selectionchange", t, {
      once: !0
    });
  }
  handleSelectionChange() {
    const t = document.getSelection();
    if (!t) return;
    const e = t.getRangeAt(0);
    if (e.collapsed !== !0 || e.startOffset !== 0) return;
    const r = this.quill.scroll.find(e.startContainer);
    if (!(r instanceof Je) || !r.uiNode) return;
    const o = document.createRange();
    o.setStartAfter(r.uiNode), o.setEndAfter(r.uiNode), t.removeAllRanges(), t.addRange(o);
  }
}
U.register({
  "blots/block": fe,
  "blots/block/embed": Fe,
  "blots/break": nn,
  "blots/container": Rr,
  "blots/cursor": Ye,
  "blots/embed": wo,
  "blots/inline": we,
  "blots/scroll": op,
  "blots/text": tn,
  "modules/clipboard": kp,
  "modules/history": zp,
  "modules/keyboard": Es,
  "modules/uploader": Ml,
  "modules/input": Kp,
  "modules/uiNode": Jp
});
class tg extends en {
  add(t, e) {
    let r = 0;
    if (e === "+1" || e === "-1") {
      const o = this.value(t) || 0;
      r = e === "+1" ? o + 1 : o - 1;
    } else typeof e == "number" && (r = e);
    return r === 0 ? (this.remove(t), !0) : super.add(t, r.toString());
  }
  canAdd(t, e) {
    return super.canAdd(t, e) || super.canAdd(t, parseInt(e, 10));
  }
  value(t) {
    return parseInt(super.value(t), 10) || void 0;
  }
}
const eg = new tg("indent", "ql-indent", {
  scope: lt.BLOCK,
  // @ts-expect-error
  whitelist: [1, 2, 3, 4, 5, 6, 7, 8]
});
class ng extends fe {
  static blotName = "blockquote";
  static tagName = "blockquote";
}
class rg extends fe {
  static blotName = "header";
  static tagName = ["H1", "H2", "H3", "H4", "H5", "H6"];
  static formats(t) {
    return this.tagName.indexOf(t.tagName) + 1;
  }
}
class zi extends Rr {
}
zi.blotName = "list-container";
zi.tagName = "OL";
class Wi extends fe {
  static create(t) {
    const e = super.create();
    return e.setAttribute("data-list", t), e;
  }
  static formats(t) {
    return t.getAttribute("data-list") || void 0;
  }
  static register() {
    U.register(zi);
  }
  constructor(t, e) {
    super(t, e);
    const r = e.ownerDocument.createElement("span"), o = (l) => {
      if (!t.isEnabled()) return;
      const h = this.statics.formats(e, t);
      h === "checked" ? (this.format("list", "unchecked"), l.preventDefault()) : h === "unchecked" && (this.format("list", "checked"), l.preventDefault());
    };
    r.addEventListener("mousedown", o), r.addEventListener("touchstart", o), this.attachUI(r);
  }
  format(t, e) {
    t === this.statics.blotName && e ? this.domNode.setAttribute("data-list", e) : super.format(t, e);
  }
}
Wi.blotName = "list";
Wi.tagName = "LI";
zi.allowedChildren = [Wi];
Wi.requiredContainer = zi;
class qo extends we {
  static blotName = "bold";
  static tagName = ["STRONG", "B"];
  static create() {
    return super.create();
  }
  static formats() {
    return !0;
  }
  optimize(t) {
    super.optimize(t), this.domNode.tagName !== this.statics.tagName[0] && this.replaceWith(this.statics.blotName);
  }
}
class ig extends qo {
  static blotName = "italic";
  static tagName = ["EM", "I"];
}
class gs extends we {
  static blotName = "link";
  static tagName = "A";
  static SANITIZED_URL = "about:blank";
  static PROTOCOL_WHITELIST = ["http", "https", "mailto", "tel", "sms"];
  static create(t) {
    const e = super.create(t);
    return e.setAttribute("href", this.sanitize(t)), e.setAttribute("rel", "noopener noreferrer"), e.setAttribute("target", "_blank"), e;
  }
  static formats(t) {
    return t.getAttribute("href");
  }
  static sanitize(t) {
    return Dl(t, this.PROTOCOL_WHITELIST) ? t : this.SANITIZED_URL;
  }
  format(t, e) {
    t !== this.statics.blotName || !e ? super.format(t, e) : this.domNode.setAttribute("href", this.constructor.sanitize(e));
  }
}
function Dl(i, t) {
  const e = document.createElement("a");
  e.href = i;
  const r = e.href.slice(0, e.href.indexOf(":"));
  return t.indexOf(r) > -1;
}
class sg extends we {
  static blotName = "script";
  static tagName = ["SUB", "SUP"];
  static create(t) {
    return t === "super" ? document.createElement("sup") : t === "sub" ? document.createElement("sub") : super.create(t);
  }
  static formats(t) {
    if (t.tagName === "SUB") return "sub";
    if (t.tagName === "SUP") return "super";
  }
}
class og extends qo {
  static blotName = "strike";
  static tagName = ["S", "STRIKE"];
}
class ag extends we {
  static blotName = "underline";
  static tagName = "U";
}
class lg extends wo {
  static blotName = "formula";
  static className = "ql-formula";
  static tagName = "SPAN";
  static create(t) {
    if (window.katex == null)
      throw new Error("Formula module requires KaTeX.");
    const e = super.create(t);
    return typeof t == "string" && (window.katex.render(t, e, {
      throwOnError: !1,
      errorColor: "#f00"
    }), e.setAttribute("data-value", t)), e;
  }
  static value(t) {
    return t.getAttribute("data-value");
  }
  html() {
    const {
      formula: t
    } = this.value();
    return `<span>${t}</span>`;
  }
}
const _a = ["alt", "height", "width"];
class ug extends Re {
  static blotName = "image";
  static tagName = "IMG";
  static create(t) {
    const e = super.create(t);
    return typeof t == "string" && e.setAttribute("src", this.sanitize(t)), e;
  }
  static formats(t) {
    return _a.reduce((e, r) => (t.hasAttribute(r) && (e[r] = t.getAttribute(r)), e), {});
  }
  static match(t) {
    return /\.(jpe?g|gif|png)$/.test(t) || /^data:image\/.+;base64/.test(t);
  }
  static sanitize(t) {
    return Dl(t, ["http", "https", "data"]) ? t : "//:0";
  }
  static value(t) {
    return t.getAttribute("src");
  }
  format(t, e) {
    _a.indexOf(t) > -1 ? e ? this.domNode.setAttribute(t, e) : this.domNode.removeAttribute(t) : super.format(t, e);
  }
}
const ka = ["height", "width"];
class cg extends Fe {
  static blotName = "video";
  static className = "ql-video";
  static tagName = "IFRAME";
  static create(t) {
    const e = super.create(t);
    return e.setAttribute("frameborder", "0"), e.setAttribute("allowfullscreen", "true"), e.setAttribute("src", this.sanitize(t)), e;
  }
  static formats(t) {
    return ka.reduce((e, r) => (t.hasAttribute(r) && (e[r] = t.getAttribute(r)), e), {});
  }
  static sanitize(t) {
    return gs.sanitize(t);
  }
  static value(t) {
    return t.getAttribute("src");
  }
  format(t, e) {
    ka.indexOf(t) > -1 ? e ? this.domNode.setAttribute(t, e) : this.domNode.removeAttribute(t) : super.format(t, e);
  }
  html() {
    const {
      video: t
    } = this.value();
    return `<a href="${t}">${t}</a>`;
  }
}
const Ii = new en("code-token", "hljs", {
  scope: lt.INLINE
});
class jn extends we {
  static formats(t, e) {
    for (; t != null && t !== e.domNode; ) {
      if (t.classList && t.classList.contains(Te.className))
        return super.formats(t, e);
      t = t.parentNode;
    }
  }
  constructor(t, e, r) {
    super(t, e, r), Ii.add(this.domNode, r);
  }
  format(t, e) {
    t !== jn.blotName ? super.format(t, e) : e ? Ii.add(this.domNode, e) : (Ii.remove(this.domNode), this.domNode.classList.remove(this.statics.className));
  }
  optimize() {
    super.optimize(...arguments), Ii.value(this.domNode) || this.unwrap();
  }
}
jn.blotName = "code-token";
jn.className = "ql-token";
class Ue extends Te {
  static create(t) {
    const e = super.create(t);
    return typeof t == "string" && e.setAttribute("data-language", t), e;
  }
  static formats(t) {
    return t.getAttribute("data-language") || "plain";
  }
  static register() {
  }
  // Syntax module will register
  format(t, e) {
    t === this.statics.blotName && e ? this.domNode.setAttribute("data-language", e) : super.format(t, e);
  }
  replaceWith(t, e) {
    return this.formatAt(0, this.length(), jn.blotName, !1), super.replaceWith(t, e);
  }
}
class Mi extends Mr {
  attach() {
    super.attach(), this.forceNext = !1, this.scroll.emitMount(this);
  }
  format(t, e) {
    t === Ue.blotName && (this.forceNext = !0, this.children.forEach((r) => {
      r.format(t, e);
    }));
  }
  formatAt(t, e, r, o) {
    r === Ue.blotName && (this.forceNext = !0), super.formatAt(t, e, r, o);
  }
  highlight(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    if (this.children.head == null) return;
    const o = `${Array.from(this.domNode.childNodes).filter((h) => h !== this.uiNode).map((h) => h.textContent).join(`
`)}
`, l = Ue.formats(this.children.head.domNode);
    if (e || this.forceNext || this.cachedText !== o) {
      if (o.trim().length > 0 || this.cachedText == null) {
        const h = this.children.reduce((b, x) => b.concat(wl(x, !1)), new ot()), m = t(o, l);
        h.diff(m).reduce((b, x) => {
          let {
            retain: C,
            attributes: R
          } = x;
          return C ? (R && Object.keys(R).forEach((E) => {
            [Ue.blotName, jn.blotName].includes(E) && this.formatAt(b, C, E, R[E]);
          }), b + C) : b;
        }, 0);
      }
      this.cachedText = o, this.forceNext = !1;
    }
  }
  html(t, e) {
    const [r] = this.children.find(t);
    return `<pre data-language="${r ? Ue.formats(r.domNode) : "plain"}">
${Ts(this.code(t, e))}
</pre>`;
  }
  optimize(t) {
    if (super.optimize(t), this.parent != null && this.children.head != null && this.uiNode != null) {
      const e = Ue.formats(this.children.head.domNode);
      e !== this.uiNode.value && (this.uiNode.value = e);
    }
  }
}
Mi.allowedChildren = [Ue];
Ue.requiredContainer = Mi;
Ue.allowedChildren = [jn, Ye, tn, nn];
const fg = (i, t, e) => {
  if (typeof i.versionString == "string") {
    const r = i.versionString.split(".")[0];
    if (parseInt(r, 10) >= 11)
      return i.highlight(e, {
        language: t
      }).value;
  }
  return i.highlight(t, e).value;
};
class jl extends En {
  static register() {
    U.register(jn, !0), U.register(Ue, !0), U.register(Mi, !0);
  }
  constructor(t, e) {
    if (super(t, e), this.options.hljs == null)
      throw new Error("Syntax module requires highlight.js. Please include the library on the page before Quill.");
    this.languages = this.options.languages.reduce((r, o) => {
      let {
        key: l
      } = o;
      return r[l] = !0, r;
    }, {}), this.highlightBlot = this.highlightBlot.bind(this), this.initListener(), this.initTimer();
  }
  initListener() {
    this.quill.on(U.events.SCROLL_BLOT_MOUNT, (t) => {
      if (!(t instanceof Mi)) return;
      const e = this.quill.root.ownerDocument.createElement("select");
      this.options.languages.forEach((r) => {
        let {
          key: o,
          label: l
        } = r;
        const h = e.ownerDocument.createElement("option");
        h.textContent = l, h.setAttribute("value", o), e.appendChild(h);
      }), e.addEventListener("change", () => {
        t.format(Ue.blotName, e.value), this.quill.root.focus(), this.highlight(t, !0);
      }), t.uiNode == null && (t.attachUI(e), t.children.head && (e.value = Ue.formats(t.children.head.domNode)));
    });
  }
  initTimer() {
    let t = null;
    this.quill.on(U.events.SCROLL_OPTIMIZE, () => {
      t && clearTimeout(t), t = setTimeout(() => {
        this.highlight(), t = null;
      }, this.options.interval);
    });
  }
  highlight() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null, e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    if (this.quill.selection.composing) return;
    this.quill.update(U.sources.USER);
    const r = this.quill.getSelection();
    (t == null ? this.quill.scroll.descendants(Mi) : [t]).forEach((l) => {
      l.highlight(this.highlightBlot, e);
    }), this.quill.update(U.sources.SILENT), r != null && this.quill.setSelection(r, U.sources.SILENT);
  }
  highlightBlot(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "plain";
    if (e = this.languages[e] ? e : "plain", e === "plain")
      return Ts(t).split(`
`).reduce((o, l, h) => (h !== 0 && o.insert(`
`, {
        [Te.blotName]: e
      }), o.insert(l)), new ot());
    const r = this.quill.root.ownerDocument.createElement("div");
    return r.classList.add(Te.className), r.innerHTML = fg(this.options.hljs, e, t), Lo(this.quill.scroll, r, [(o, l) => {
      const h = Ii.value(o);
      return h ? l.compose(new ot().retain(l.length(), {
        [jn.blotName]: h
      })) : l;
    }], [(o, l) => o.data.split(`
`).reduce((h, m, b) => (b !== 0 && h.insert(`
`, {
      [Te.blotName]: e
    }), h.insert(m)), l)], /* @__PURE__ */ new WeakMap());
  }
}
jl.DEFAULTS = {
  hljs: window.hljs,
  interval: 1e3,
  languages: [{
    key: "plain",
    label: "Plain"
  }, {
    key: "bash",
    label: "Bash"
  }, {
    key: "cpp",
    label: "C++"
  }, {
    key: "cs",
    label: "C#"
  }, {
    key: "css",
    label: "CSS"
  }, {
    key: "diff",
    label: "Diff"
  }, {
    key: "xml",
    label: "HTML/XML"
  }, {
    key: "java",
    label: "Java"
  }, {
    key: "javascript",
    label: "JavaScript"
  }, {
    key: "markdown",
    label: "Markdown"
  }, {
    key: "php",
    label: "PHP"
  }, {
    key: "python",
    label: "Python"
  }, {
    key: "ruby",
    label: "Ruby"
  }, {
    key: "sql",
    label: "SQL"
  }]
};
class Qe extends fe {
  static blotName = "table";
  static tagName = "TD";
  static create(t) {
    const e = super.create();
    return t ? e.setAttribute("data-row", t) : e.setAttribute("data-row", Oo()), e;
  }
  static formats(t) {
    if (t.hasAttribute("data-row"))
      return t.getAttribute("data-row");
  }
  cellOffset() {
    return this.parent ? this.parent.children.indexOf(this) : -1;
  }
  format(t, e) {
    t === Qe.blotName && e ? this.domNode.setAttribute("data-row", e) : super.format(t, e);
  }
  row() {
    return this.parent;
  }
  rowOffset() {
    return this.row() ? this.row().rowOffset() : -1;
  }
  table() {
    return this.row() && this.row().table();
  }
}
class Or extends Rr {
  static blotName = "table-row";
  static tagName = "TR";
  checkMerge() {
    if (super.checkMerge() && this.next.children.head != null) {
      const t = this.children.head.formats(), e = this.children.tail.formats(), r = this.next.children.head.formats(), o = this.next.children.tail.formats();
      return t.table === e.table && t.table === r.table && t.table === o.table;
    }
    return !1;
  }
  optimize(t) {
    super.optimize(t), this.children.forEach((e) => {
      if (e.next == null) return;
      const r = e.formats(), o = e.next.formats();
      if (r.table !== o.table) {
        const l = this.splitAfter(e);
        l && l.optimize(), this.prev && this.prev.optimize();
      }
    });
  }
  rowOffset() {
    return this.parent ? this.parent.children.indexOf(this) : -1;
  }
  table() {
    return this.parent && this.parent.parent;
  }
}
class nr extends Rr {
  static blotName = "table-body";
  static tagName = "TBODY";
}
class ms extends Rr {
  static blotName = "table-container";
  static tagName = "TABLE";
  balanceCells() {
    const t = this.descendants(Or), e = t.reduce((r, o) => Math.max(o.children.length, r), 0);
    t.forEach((r) => {
      new Array(e - r.children.length).fill(0).forEach(() => {
        let o;
        r.children.head != null && (o = Qe.formats(r.children.head.domNode));
        const l = this.scroll.create(Qe.blotName, o);
        r.appendChild(l), l.optimize();
      });
    });
  }
  cells(t) {
    return this.rows().map((e) => e.children.at(t));
  }
  deleteColumn(t) {
    const [e] = this.descendant(nr);
    e == null || e.children.head == null || e.children.forEach((r) => {
      const o = r.children.at(t);
      o?.remove();
    });
  }
  insertColumn(t) {
    const [e] = this.descendant(nr);
    e == null || e.children.head == null || e.children.forEach((r) => {
      const o = r.children.at(t), l = Qe.formats(r.children.head.domNode), h = this.scroll.create(Qe.blotName, l);
      r.insertBefore(h, o);
    });
  }
  insertRow(t) {
    const [e] = this.descendant(nr);
    if (e == null || e.children.head == null) return;
    const r = Oo(), o = this.scroll.create(Or.blotName);
    e.children.head.children.forEach(() => {
      const h = this.scroll.create(Qe.blotName, r);
      o.appendChild(h);
    });
    const l = e.children.at(t);
    e.insertBefore(o, l);
  }
  rows() {
    const t = this.children.head;
    return t == null ? [] : t.children.map((e) => e);
  }
}
ms.allowedChildren = [nr];
nr.requiredContainer = ms;
nr.allowedChildren = [Or];
Or.requiredContainer = nr;
Or.allowedChildren = [Qe];
Qe.requiredContainer = Or;
function Oo() {
  return `row-${Math.random().toString(36).slice(2, 6)}`;
}
class hg extends En {
  static register() {
    U.register(Qe), U.register(Or), U.register(nr), U.register(ms);
  }
  constructor() {
    super(...arguments), this.listenBalanceCells();
  }
  balanceTables() {
    this.quill.scroll.descendants(ms).forEach((t) => {
      t.balanceCells();
    });
  }
  deleteColumn() {
    const [t, , e] = this.getTable();
    e != null && (t.deleteColumn(e.cellOffset()), this.quill.update(U.sources.USER));
  }
  deleteRow() {
    const [, t] = this.getTable();
    t != null && (t.remove(), this.quill.update(U.sources.USER));
  }
  deleteTable() {
    const [t] = this.getTable();
    if (t == null) return;
    const e = t.offset();
    t.remove(), this.quill.update(U.sources.USER), this.quill.setSelection(e, U.sources.SILENT);
  }
  getTable() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.quill.getSelection();
    if (t == null) return [null, null, null, -1];
    const [e, r] = this.quill.getLine(t.index);
    if (e == null || e.statics.blotName !== Qe.blotName)
      return [null, null, null, -1];
    const o = e.parent;
    return [o.parent.parent, o, e, r];
  }
  insertColumn(t) {
    const e = this.quill.getSelection();
    if (!e) return;
    const [r, o, l] = this.getTable(e);
    if (l == null) return;
    const h = l.cellOffset();
    r.insertColumn(h + t), this.quill.update(U.sources.USER);
    let m = o.rowOffset();
    t === 0 && (m += 1), this.quill.setSelection(e.index + m, e.length, U.sources.SILENT);
  }
  insertColumnLeft() {
    this.insertColumn(0);
  }
  insertColumnRight() {
    this.insertColumn(1);
  }
  insertRow(t) {
    const e = this.quill.getSelection();
    if (!e) return;
    const [r, o, l] = this.getTable(e);
    if (l == null) return;
    const h = o.rowOffset();
    r.insertRow(h + t), this.quill.update(U.sources.USER), t > 0 ? this.quill.setSelection(e, U.sources.SILENT) : this.quill.setSelection(e.index + o.children.length, e.length, U.sources.SILENT);
  }
  insertRowAbove() {
    this.insertRow(0);
  }
  insertRowBelow() {
    this.insertRow(1);
  }
  insertTable(t, e) {
    const r = this.quill.getSelection();
    if (r == null) return;
    const o = new Array(t).fill(0).reduce((l) => {
      const h = new Array(e).fill(`
`).join("");
      return l.insert(h, {
        table: Oo()
      });
    }, new ot().retain(r.index));
    this.quill.updateContents(o, U.sources.USER), this.quill.setSelection(r.index, U.sources.SILENT), this.balanceTables();
  }
  listenBalanceCells() {
    this.quill.on(U.events.SCROLL_OPTIMIZE, (t) => {
      t.some((e) => ["TD", "TR", "TBODY", "TABLE"].includes(e.target.tagName) ? (this.quill.once(U.events.TEXT_CHANGE, (r, o, l) => {
        l === U.sources.USER && this.balanceTables();
      }), !0) : !1);
    });
  }
}
const Ia = Pn("quill:toolbar");
class _o extends En {
  constructor(t, e) {
    if (super(t, e), Array.isArray(this.options.container)) {
      const r = document.createElement("div");
      r.setAttribute("role", "toolbar"), dg(r, this.options.container), t.container?.parentNode?.insertBefore(r, t.container), this.container = r;
    } else typeof this.options.container == "string" ? this.container = document.querySelector(this.options.container) : this.container = this.options.container;
    if (!(this.container instanceof HTMLElement)) {
      Ia.error("Container required for toolbar", this.options);
      return;
    }
    this.container.classList.add("ql-toolbar"), this.controls = [], this.handlers = {}, this.options.handlers && Object.keys(this.options.handlers).forEach((r) => {
      const o = this.options.handlers?.[r];
      o && this.addHandler(r, o);
    }), Array.from(this.container.querySelectorAll("button, select")).forEach((r) => {
      this.attach(r);
    }), this.quill.on(U.events.EDITOR_CHANGE, () => {
      const [r] = this.quill.selection.getRange();
      this.update(r);
    });
  }
  addHandler(t, e) {
    this.handlers[t] = e;
  }
  attach(t) {
    let e = Array.from(t.classList).find((o) => o.indexOf("ql-") === 0);
    if (!e) return;
    if (e = e.slice(3), t.tagName === "BUTTON" && t.setAttribute("type", "button"), this.handlers[e] == null && this.quill.scroll.query(e) == null) {
      Ia.warn("ignoring attaching to nonexistent format", e, t);
      return;
    }
    const r = t.tagName === "SELECT" ? "change" : "click";
    t.addEventListener(r, (o) => {
      let l;
      if (t.tagName === "SELECT") {
        if (t.selectedIndex < 0) return;
        const m = t.options[t.selectedIndex];
        m.hasAttribute("selected") ? l = !1 : l = m.value || !1;
      } else
        t.classList.contains("ql-active") ? l = !1 : l = t.value || !t.hasAttribute("value"), o.preventDefault();
      this.quill.focus();
      const [h] = this.quill.selection.getRange();
      if (this.handlers[e] != null)
        this.handlers[e].call(this, l);
      else if (
        // @ts-expect-error
        this.quill.scroll.query(e).prototype instanceof Re
      ) {
        if (l = prompt(`Enter ${e}`), !l) return;
        this.quill.updateContents(new ot().retain(h.index).delete(h.length).insert({
          [e]: l
        }), U.sources.USER);
      } else
        this.quill.format(e, l, U.sources.USER);
      this.update(h);
    }), this.controls.push([e, t]);
  }
  update(t) {
    const e = t == null ? {} : this.quill.getFormat(t);
    this.controls.forEach((r) => {
      const [o, l] = r;
      if (l.tagName === "SELECT") {
        let h = null;
        if (t == null)
          h = null;
        else if (e[o] == null)
          h = l.querySelector("option[selected]");
        else if (!Array.isArray(e[o])) {
          let m = e[o];
          typeof m == "string" && (m = m.replace(/"/g, '\\"')), h = l.querySelector(`option[value="${m}"]`);
        }
        h == null ? (l.value = "", l.selectedIndex = -1) : h.selected = !0;
      } else if (t == null)
        l.classList.remove("ql-active"), l.setAttribute("aria-pressed", "false");
      else if (l.hasAttribute("value")) {
        const h = e[o], m = h === l.getAttribute("value") || h != null && h.toString() === l.getAttribute("value") || h == null && !l.getAttribute("value");
        l.classList.toggle("ql-active", m), l.setAttribute("aria-pressed", m.toString());
      } else {
        const h = e[o] != null;
        l.classList.toggle("ql-active", h), l.setAttribute("aria-pressed", h.toString());
      }
    });
  }
}
_o.DEFAULTS = {};
function Ra(i, t, e) {
  const r = document.createElement("button");
  r.setAttribute("type", "button"), r.classList.add(`ql-${t}`), r.setAttribute("aria-pressed", "false"), e != null ? (r.value = e, r.setAttribute("aria-label", `${t}: ${e}`)) : r.setAttribute("aria-label", t), i.appendChild(r);
}
function dg(i, t) {
  Array.isArray(t[0]) || (t = [t]), t.forEach((e) => {
    const r = document.createElement("span");
    r.classList.add("ql-formats"), e.forEach((o) => {
      if (typeof o == "string")
        Ra(r, o);
      else {
        const l = Object.keys(o)[0], h = o[l];
        Array.isArray(h) ? pg(r, l, h) : Ra(r, l, h);
      }
    }), i.appendChild(r);
  });
}
function pg(i, t, e) {
  const r = document.createElement("select");
  r.classList.add(`ql-${t}`), e.forEach((o) => {
    const l = document.createElement("option");
    o !== !1 ? l.setAttribute("value", String(o)) : l.setAttribute("selected", "selected"), r.appendChild(l);
  }), i.appendChild(r);
}
_o.DEFAULTS = {
  container: null,
  handlers: {
    clean() {
      const i = this.quill.getSelection();
      if (i != null)
        if (i.length === 0) {
          const t = this.quill.getFormat();
          Object.keys(t).forEach((e) => {
            this.quill.scroll.query(e, lt.INLINE) != null && this.quill.format(e, !1, U.sources.USER);
          });
        } else
          this.quill.removeFormat(i.index, i.length, U.sources.USER);
    },
    direction(i) {
      const {
        align: t
      } = this.quill.getFormat();
      i === "rtl" && t == null ? this.quill.format("align", "right", U.sources.USER) : !i && t === "right" && this.quill.format("align", !1, U.sources.USER), this.quill.format("direction", i, U.sources.USER);
    },
    indent(i) {
      const t = this.quill.getSelection(), e = this.quill.getFormat(t), r = parseInt(e.indent || 0, 10);
      if (i === "+1" || i === "-1") {
        let o = i === "+1" ? 1 : -1;
        e.direction === "rtl" && (o *= -1), this.quill.format("indent", r + o, U.sources.USER);
      }
    },
    link(i) {
      i === !0 && (i = prompt("Enter link URL:")), this.quill.format("link", i, U.sources.USER);
    },
    list(i) {
      const t = this.quill.getSelection(), e = this.quill.getFormat(t);
      i === "check" ? e.list === "checked" || e.list === "unchecked" ? this.quill.format("list", !1, U.sources.USER) : this.quill.format("list", "unchecked", U.sources.USER) : this.quill.format("list", i, U.sources.USER);
    }
  }
};
const gg = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="3" x2="13" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="9" y1="4" y2="4"/></svg>', mg = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="14" x2="4" y1="14" y2="14"/><line class="ql-stroke" x1="12" x2="6" y1="4" y2="4"/></svg>', yg = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="15" x2="5" y1="14" y2="14"/><line class="ql-stroke" x1="15" x2="9" y1="4" y2="4"/></svg>', bg = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="15" x2="3" y1="14" y2="14"/><line class="ql-stroke" x1="15" x2="3" y1="4" y2="4"/></svg>', vg = '<svg viewbox="0 0 18 18"><g class="ql-fill ql-color-label"><polygon points="6 6.868 6 6 5 6 5 7 5.942 7 6 6.868"/><rect height="1" width="1" x="4" y="4"/><polygon points="6.817 5 6 5 6 6 6.38 6 6.817 5"/><rect height="1" width="1" x="2" y="6"/><rect height="1" width="1" x="3" y="5"/><rect height="1" width="1" x="4" y="7"/><polygon points="4 11.439 4 11 3 11 3 12 3.755 12 4 11.439"/><rect height="1" width="1" x="2" y="12"/><rect height="1" width="1" x="2" y="9"/><rect height="1" width="1" x="2" y="15"/><polygon points="4.63 10 4 10 4 11 4.192 11 4.63 10"/><rect height="1" width="1" x="3" y="8"/><path d="M10.832,4.2L11,4.582V4H10.708A1.948,1.948,0,0,1,10.832,4.2Z"/><path d="M7,4.582L7.168,4.2A1.929,1.929,0,0,1,7.292,4H7V4.582Z"/><path d="M8,13H7.683l-0.351.8a1.933,1.933,0,0,1-.124.2H8V13Z"/><rect height="1" width="1" x="12" y="2"/><rect height="1" width="1" x="11" y="3"/><path d="M9,3H8V3.282A1.985,1.985,0,0,1,9,3Z"/><rect height="1" width="1" x="2" y="3"/><rect height="1" width="1" x="6" y="2"/><rect height="1" width="1" x="3" y="2"/><rect height="1" width="1" x="5" y="3"/><rect height="1" width="1" x="9" y="2"/><rect height="1" width="1" x="15" y="14"/><polygon points="13.447 10.174 13.469 10.225 13.472 10.232 13.808 11 14 11 14 10 13.37 10 13.447 10.174"/><rect height="1" width="1" x="13" y="7"/><rect height="1" width="1" x="15" y="5"/><rect height="1" width="1" x="14" y="6"/><rect height="1" width="1" x="15" y="8"/><rect height="1" width="1" x="14" y="9"/><path d="M3.775,14H3v1H4V14.314A1.97,1.97,0,0,1,3.775,14Z"/><rect height="1" width="1" x="14" y="3"/><polygon points="12 6.868 12 6 11.62 6 12 6.868"/><rect height="1" width="1" x="15" y="2"/><rect height="1" width="1" x="12" y="5"/><rect height="1" width="1" x="13" y="4"/><polygon points="12.933 9 13 9 13 8 12.495 8 12.933 9"/><rect height="1" width="1" x="9" y="14"/><rect height="1" width="1" x="8" y="15"/><path d="M6,14.926V15H7V14.316A1.993,1.993,0,0,1,6,14.926Z"/><rect height="1" width="1" x="5" y="15"/><path d="M10.668,13.8L10.317,13H10v1h0.792A1.947,1.947,0,0,1,10.668,13.8Z"/><rect height="1" width="1" x="11" y="15"/><path d="M14.332,12.2a1.99,1.99,0,0,1,.166.8H15V12H14.245Z"/><rect height="1" width="1" x="14" y="15"/><rect height="1" width="1" x="15" y="11"/></g><polyline class="ql-stroke" points="5.5 13 9 5 12.5 13"/><line class="ql-stroke" x1="11.63" x2="6.38" y1="11" y2="11"/></svg>', xg = '<svg viewbox="0 0 18 18"><rect class="ql-fill ql-stroke" height="3" width="3" x="4" y="5"/><rect class="ql-fill ql-stroke" height="3" width="3" x="11" y="5"/><path class="ql-even ql-fill ql-stroke" d="M7,8c0,4.031-3,5-3,5"/><path class="ql-even ql-fill ql-stroke" d="M14,8c0,4.031-3,5-3,5"/></svg>', wg = '<svg viewbox="0 0 18 18"><path class="ql-stroke" d="M5,4H9.5A2.5,2.5,0,0,1,12,6.5v0A2.5,2.5,0,0,1,9.5,9H5A0,0,0,0,1,5,9V4A0,0,0,0,1,5,4Z"/><path class="ql-stroke" d="M5,9h5.5A2.5,2.5,0,0,1,13,11.5v0A2.5,2.5,0,0,1,10.5,14H5a0,0,0,0,1,0,0V9A0,0,0,0,1,5,9Z"/></svg>', Tg = '<svg class="" viewbox="0 0 18 18"><line class="ql-stroke" x1="5" x2="13" y1="3" y2="3"/><line class="ql-stroke" x1="6" x2="9.35" y1="12" y2="3"/><line class="ql-stroke" x1="11" x2="15" y1="11" y2="15"/><line class="ql-stroke" x1="15" x2="11" y1="11" y2="15"/><rect class="ql-fill" height="1" rx="0.5" ry="0.5" width="7" x="2" y="14"/></svg>', Ma = '<svg viewbox="0 0 18 18"><polyline class="ql-even ql-stroke" points="5 7 3 9 5 11"/><polyline class="ql-even ql-stroke" points="13 7 15 9 13 11"/><line class="ql-stroke" x1="10" x2="8" y1="5" y2="13"/></svg>', Eg = '<svg viewbox="0 0 18 18"><line class="ql-color-label ql-stroke ql-transparent" x1="3" x2="15" y1="15" y2="15"/><polyline class="ql-stroke" points="5.5 11 9 3 12.5 11"/><line class="ql-stroke" x1="11.63" x2="6.38" y1="9" y2="9"/></svg>', Ag = '<svg viewbox="0 0 18 18"><polygon class="ql-stroke ql-fill" points="3 11 5 9 3 7 3 11"/><line class="ql-stroke ql-fill" x1="15" x2="11" y1="4" y2="4"/><path class="ql-fill" d="M11,3a3,3,0,0,0,0,6h1V3H11Z"/><rect class="ql-fill" height="11" width="1" x="11" y="4"/><rect class="ql-fill" height="11" width="1" x="13" y="4"/></svg>', Ng = '<svg viewbox="0 0 18 18"><polygon class="ql-stroke ql-fill" points="15 12 13 10 15 8 15 12"/><line class="ql-stroke ql-fill" x1="9" x2="5" y1="4" y2="4"/><path class="ql-fill" d="M5,3A3,3,0,0,0,5,9H6V3H5Z"/><rect class="ql-fill" height="11" width="1" x="5" y="4"/><rect class="ql-fill" height="11" width="1" x="7" y="4"/></svg>', Sg = '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M11.759,2.482a2.561,2.561,0,0,0-3.53.607A7.656,7.656,0,0,0,6.8,6.2C6.109,9.188,5.275,14.677,4.15,14.927a1.545,1.545,0,0,0-1.3-.933A0.922,0.922,0,0,0,2,15.036S1.954,16,4.119,16s3.091-2.691,3.7-5.553c0.177-.826.36-1.726,0.554-2.6L8.775,6.2c0.381-1.421.807-2.521,1.306-2.676a1.014,1.014,0,0,0,1.02.56A0.966,0.966,0,0,0,11.759,2.482Z"/><rect class="ql-fill" height="1.6" rx="0.8" ry="0.8" width="5" x="5.15" y="6.2"/><path class="ql-fill" d="M13.663,12.027a1.662,1.662,0,0,1,.266-0.276q0.193,0.069.456,0.138a2.1,2.1,0,0,0,.535.069,1.075,1.075,0,0,0,.767-0.3,1.044,1.044,0,0,0,.314-0.8,0.84,0.84,0,0,0-.238-0.619,0.8,0.8,0,0,0-.594-0.239,1.154,1.154,0,0,0-.781.3,4.607,4.607,0,0,0-.781,1q-0.091.15-.218,0.346l-0.246.38c-0.068-.288-0.137-0.582-0.212-0.885-0.459-1.847-2.494-.984-2.941-0.8-0.482.2-.353,0.647-0.094,0.529a0.869,0.869,0,0,1,1.281.585c0.217,0.751.377,1.436,0.527,2.038a5.688,5.688,0,0,1-.362.467,2.69,2.69,0,0,1-.264.271q-0.221-.08-0.471-0.147a2.029,2.029,0,0,0-.522-0.066,1.079,1.079,0,0,0-.768.3A1.058,1.058,0,0,0,9,15.131a0.82,0.82,0,0,0,.832.852,1.134,1.134,0,0,0,.787-0.3,5.11,5.11,0,0,0,.776-0.993q0.141-.219.215-0.34c0.046-.076.122-0.194,0.223-0.346a2.786,2.786,0,0,0,.918,1.726,2.582,2.582,0,0,0,2.376-.185c0.317-.181.212-0.565,0-0.494A0.807,0.807,0,0,1,14.176,15a5.159,5.159,0,0,1-.913-2.446l0,0Q13.487,12.24,13.663,12.027Z"/></svg>', Cg = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Zm6.06787,9.209H14.98975V7.59863a.54085.54085,0,0,0-.605-.60547h-.62744a1.01119,1.01119,0,0,0-.748.29688L11.645,8.56641a.5435.5435,0,0,0-.022.8584l.28613.30762a.53861.53861,0,0,0,.84717.0332l.09912-.08789a1.2137,1.2137,0,0,0,.2417-.35254h.02246s-.01123.30859-.01123.60547V13.209H12.041a.54085.54085,0,0,0-.605.60547v.43945a.54085.54085,0,0,0,.605.60547h4.02686a.54085.54085,0,0,0,.605-.60547v-.43945A.54085.54085,0,0,0,16.06787,13.209Z"/></svg>', Lg = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.73975,13.81445v.43945a.54085.54085,0,0,1-.605.60547H11.855a.58392.58392,0,0,1-.64893-.60547V14.0127c0-2.90527,3.39941-3.42187,3.39941-4.55469a.77675.77675,0,0,0-.84717-.78125,1.17684,1.17684,0,0,0-.83594.38477c-.2749.26367-.561.374-.85791.13184l-.4292-.34082c-.30811-.24219-.38525-.51758-.1543-.81445a2.97155,2.97155,0,0,1,2.45361-1.17676,2.45393,2.45393,0,0,1,2.68408,2.40918c0,2.45312-3.1792,2.92676-3.27832,3.93848h2.79443A.54085.54085,0,0,1,16.73975,13.81445ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>', qg = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.65186,12.30664a2.6742,2.6742,0,0,1-2.915,2.68457,3.96592,3.96592,0,0,1-2.25537-.6709.56007.56007,0,0,1-.13232-.83594L11.64648,13c.209-.34082.48389-.36328.82471-.1543a2.32654,2.32654,0,0,0,1.12256.33008c.71484,0,1.12207-.35156,1.12207-.78125,0-.61523-.61621-.86816-1.46338-.86816H13.2085a.65159.65159,0,0,1-.68213-.41895l-.05518-.10937a.67114.67114,0,0,1,.14307-.78125l.71533-.86914a8.55289,8.55289,0,0,1,.68213-.7373V8.58887a3.93913,3.93913,0,0,1-.748.05469H11.9873a.54085.54085,0,0,1-.605-.60547V7.59863a.54085.54085,0,0,1,.605-.60547h3.75146a.53773.53773,0,0,1,.60547.59375v.17676a1.03723,1.03723,0,0,1-.27539.748L14.74854,10.0293A2.31132,2.31132,0,0,1,16.65186,12.30664ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>', Og = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Zm7.05371,7.96582v.38477c0,.39648-.165.60547-.46191.60547h-.47314v1.29785a.54085.54085,0,0,1-.605.60547h-.69336a.54085.54085,0,0,1-.605-.60547V12.95605H11.333a.5412.5412,0,0,1-.60547-.60547v-.15332a1.199,1.199,0,0,1,.22021-.748l2.56348-4.05957a.7819.7819,0,0,1,.72607-.39648h1.27637a.54085.54085,0,0,1,.605.60547v3.7627h.33008A.54055.54055,0,0,1,17.05371,11.96582ZM14.28125,8.7207h-.022a4.18969,4.18969,0,0,1-.38525.81348l-1.188,1.80469v.02246h1.5293V9.60059A7.04058,7.04058,0,0,1,14.28125,8.7207Z"/></svg>', _g = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.74023,12.18555a2.75131,2.75131,0,0,1-2.91553,2.80566,3.908,3.908,0,0,1-2.25537-.68164.54809.54809,0,0,1-.13184-.8252L11.73438,13c.209-.34082.48389-.36328.8252-.1543a2.23757,2.23757,0,0,0,1.1001.33008,1.01827,1.01827,0,0,0,1.1001-.96777c0-.61621-.53906-.97949-1.25439-.97949a2.15554,2.15554,0,0,0-.64893.09961,1.15209,1.15209,0,0,1-.814.01074l-.12109-.04395a.64116.64116,0,0,1-.45117-.71484l.231-3.00391a.56666.56666,0,0,1,.62744-.583H15.541a.54085.54085,0,0,1,.605.60547v.43945a.54085.54085,0,0,1-.605.60547H13.41748l-.04395.72559a1.29306,1.29306,0,0,1-.04395.30859h.022a2.39776,2.39776,0,0,1,.57227-.07715A2.53266,2.53266,0,0,1,16.74023,12.18555ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>', kg = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M14.51758,9.64453a1.85627,1.85627,0,0,0-1.24316.38477H13.252a1.73532,1.73532,0,0,1,1.72754-1.4082,2.66491,2.66491,0,0,1,.5498.06641c.35254.05469.57227.01074.70508-.40723l.16406-.5166a.53393.53393,0,0,0-.373-.75977,4.83723,4.83723,0,0,0-1.17773-.14258c-2.43164,0-3.7627,2.17773-3.7627,4.43359,0,2.47559,1.60645,3.69629,3.19043,3.69629A2.70585,2.70585,0,0,0,16.96,12.19727,2.43861,2.43861,0,0,0,14.51758,9.64453Zm-.23047,3.58691c-.67187,0-1.22168-.81445-1.22168-1.45215,0-.47363.30762-.583.72559-.583.96875,0,1.27734.59375,1.27734,1.12207A.82182.82182,0,0,1,14.28711,13.23145ZM10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Z"/></svg>', Ig = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="13" y1="4" y2="4"/><line class="ql-stroke" x1="5" x2="11" y1="14" y2="14"/><line class="ql-stroke" x1="8" x2="10" y1="14" y2="4"/></svg>', Rg = '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="10" width="12" x="3" y="4"/><circle class="ql-fill" cx="6" cy="7" r="1"/><polyline class="ql-even ql-fill" points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"/></svg>', Mg = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-fill ql-stroke" points="3 7 3 11 5 9 3 7"/></svg>', Dg = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-stroke" points="5 7 5 11 3 9 5 7"/></svg>', jg = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="11" y1="7" y2="11"/><path class="ql-even ql-stroke" d="M8.9,4.577a3.476,3.476,0,0,1,.36,4.679A3.476,3.476,0,0,1,4.577,8.9C3.185,7.5,2.035,6.4,4.217,4.217S7.5,3.185,8.9,4.577Z"/><path class="ql-even ql-stroke" d="M13.423,9.1a3.476,3.476,0,0,0-4.679-.36,3.476,3.476,0,0,0,.36,4.679c1.392,1.392,2.5,2.542,4.679.36S14.815,10.5,13.423,9.1Z"/></svg>', Bg = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="6" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="6" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="6" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="3" y1="4" y2="4"/><line class="ql-stroke" x1="3" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="3" x2="3" y1="14" y2="14"/></svg>', Pg = '<svg class="" viewbox="0 0 18 18"><line class="ql-stroke" x1="9" x2="15" y1="4" y2="4"/><polyline class="ql-stroke" points="3 4 4 5 6 3"/><line class="ql-stroke" x1="9" x2="15" y1="14" y2="14"/><polyline class="ql-stroke" points="3 14 4 15 6 13"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-stroke" points="3 9 4 10 6 8"/></svg>', $g = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="7" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="7" x2="15" y1="14" y2="14"/><line class="ql-stroke ql-thin" x1="2.5" x2="4.5" y1="5.5" y2="5.5"/><path class="ql-fill" d="M3.5,6A0.5,0.5,0,0,1,3,5.5V3.085l-0.276.138A0.5,0.5,0,0,1,2.053,3c-0.124-.247-0.023-0.324.224-0.447l1-.5A0.5,0.5,0,0,1,4,2.5v3A0.5,0.5,0,0,1,3.5,6Z"/><path class="ql-stroke ql-thin" d="M4.5,10.5h-2c0-.234,1.85-1.076,1.85-2.234A0.959,0.959,0,0,0,2.5,8.156"/><path class="ql-stroke ql-thin" d="M2.5,14.846a0.959,0.959,0,0,0,1.85-.109A0.7,0.7,0,0,0,3.75,14a0.688,0.688,0,0,0,.6-0.736,0.959,0.959,0,0,0-1.85-.109"/></svg>', Hg = '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M15.5,15H13.861a3.858,3.858,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.921,1.921,0,0,0,12.021,11.7a0.50013,0.50013,0,1,0,.957.291h0a0.914,0.914,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.076-1.16971,1.86982-1.93971,2.43082A1.45639,1.45639,0,0,0,12,15.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,15Z"/><path class="ql-fill" d="M9.65,5.241a1,1,0,0,0-1.409.108L6,7.964,3.759,5.349A1,1,0,0,0,2.192,6.59178Q2.21541,6.6213,2.241,6.649L4.684,9.5,2.241,12.35A1,1,0,0,0,3.71,13.70722q0.02557-.02768.049-0.05722L6,11.036,8.241,13.65a1,1,0,1,0,1.567-1.24277Q9.78459,12.3777,9.759,12.35L7.316,9.5,9.759,6.651A1,1,0,0,0,9.65,5.241Z"/></svg>', Ug = '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M15.5,7H13.861a4.015,4.015,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.922,1.922,0,0,0,12.021,3.7a0.5,0.5,0,1,0,.957.291,0.917,0.917,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.077-1.164,1.925-1.934,2.486A1.423,1.423,0,0,0,12,7.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,7Z"/><path class="ql-fill" d="M9.651,5.241a1,1,0,0,0-1.41.108L6,7.964,3.759,5.349a1,1,0,1,0-1.519,1.3L4.683,9.5,2.241,12.35a1,1,0,1,0,1.519,1.3L6,11.036,8.241,13.65a1,1,0,0,0,1.519-1.3L7.317,9.5,9.759,6.651A1,1,0,0,0,9.651,5.241Z"/></svg>', Fg = '<svg viewbox="0 0 18 18"><line class="ql-stroke ql-thin" x1="15.5" x2="2.5" y1="8.5" y2="9.5"/><path class="ql-fill" d="M9.007,8C6.542,7.791,6,7.519,6,6.5,6,5.792,7.283,5,9,5c1.571,0,2.765.679,2.969,1.309a1,1,0,0,0,1.9-.617C13.356,4.106,11.354,3,9,3,6.2,3,4,4.538,4,6.5a3.2,3.2,0,0,0,.5,1.843Z"/><path class="ql-fill" d="M8.984,10C11.457,10.208,12,10.479,12,11.5c0,0.708-1.283,1.5-3,1.5-1.571,0-2.765-.679-2.969-1.309a1,1,0,1,0-1.9.617C4.644,13.894,6.646,15,9,15c2.8,0,5-1.538,5-3.5a3.2,3.2,0,0,0-.5-1.843Z"/></svg>', zg = '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="12" width="12" x="3" y="3"/><rect class="ql-fill" height="2" width="3" x="5" y="5"/><rect class="ql-fill" height="2" width="4" x="9" y="5"/><g class="ql-fill ql-transparent"><rect height="2" width="3" x="5" y="8"/><rect height="2" width="4" x="9" y="8"/><rect height="2" width="3" x="5" y="11"/><rect height="2" width="4" x="9" y="11"/></g></svg>', Wg = '<svg viewbox="0 0 18 18"><path class="ql-stroke" d="M5,3V9a4.012,4.012,0,0,0,4,4H9a4.012,4.012,0,0,0,4-4V3"/><rect class="ql-fill" height="1" rx="0.5" ry="0.5" width="12" x="3" y="15"/></svg>', Vg = '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="12" width="12" x="3" y="3"/><rect class="ql-fill" height="12" width="1" x="5" y="3"/><rect class="ql-fill" height="12" width="1" x="12" y="3"/><rect class="ql-fill" height="2" width="8" x="5" y="8"/><rect class="ql-fill" height="1" width="3" x="3" y="5"/><rect class="ql-fill" height="1" width="3" x="3" y="7"/><rect class="ql-fill" height="1" width="3" x="3" y="10"/><rect class="ql-fill" height="1" width="3" x="3" y="12"/><rect class="ql-fill" height="1" width="3" x="12" y="5"/><rect class="ql-fill" height="1" width="3" x="12" y="7"/><rect class="ql-fill" height="1" width="3" x="12" y="10"/><rect class="ql-fill" height="1" width="3" x="12" y="12"/></svg>', Hi = {
  align: {
    "": gg,
    center: mg,
    right: yg,
    justify: bg
  },
  background: vg,
  blockquote: xg,
  bold: wg,
  clean: Tg,
  code: Ma,
  "code-block": Ma,
  color: Eg,
  direction: {
    "": Ag,
    rtl: Ng
  },
  formula: Sg,
  header: {
    1: Cg,
    2: Lg,
    3: qg,
    4: Og,
    5: _g,
    6: kg
  },
  italic: Ig,
  image: Rg,
  indent: {
    "+1": Mg,
    "-1": Dg
  },
  link: jg,
  list: {
    bullet: Bg,
    check: Pg,
    ordered: $g
  },
  script: {
    sub: Hg,
    super: Ug
  },
  strike: Fg,
  table: zg,
  underline: Wg,
  video: Vg
}, Gg = '<svg viewbox="0 0 18 18"><polygon class="ql-stroke" points="7 11 9 13 11 11 7 11"/><polygon class="ql-stroke" points="7 7 9 5 11 7 7 7"/></svg>';
let Da = 0;
function ja(i, t) {
  i.setAttribute(t, `${i.getAttribute(t) !== "true"}`);
}
class As {
  constructor(t) {
    this.select = t, this.container = document.createElement("span"), this.buildPicker(), this.select.style.display = "none", this.select.parentNode.insertBefore(this.container, this.select), this.label.addEventListener("mousedown", () => {
      this.togglePicker();
    }), this.label.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "Enter":
          this.togglePicker();
          break;
        case "Escape":
          this.escape(), e.preventDefault();
          break;
      }
    }), this.select.addEventListener("change", this.update.bind(this));
  }
  togglePicker() {
    this.container.classList.toggle("ql-expanded"), ja(this.label, "aria-expanded"), ja(this.options, "aria-hidden");
  }
  buildItem(t) {
    const e = document.createElement("span");
    e.tabIndex = "0", e.setAttribute("role", "button"), e.classList.add("ql-picker-item");
    const r = t.getAttribute("value");
    return r && e.setAttribute("data-value", r), t.textContent && e.setAttribute("data-label", t.textContent), e.addEventListener("click", () => {
      this.selectItem(e, !0);
    }), e.addEventListener("keydown", (o) => {
      switch (o.key) {
        case "Enter":
          this.selectItem(e, !0), o.preventDefault();
          break;
        case "Escape":
          this.escape(), o.preventDefault();
          break;
      }
    }), e;
  }
  buildLabel() {
    const t = document.createElement("span");
    return t.classList.add("ql-picker-label"), t.innerHTML = Gg, t.tabIndex = "0", t.setAttribute("role", "button"), t.setAttribute("aria-expanded", "false"), this.container.appendChild(t), t;
  }
  buildOptions() {
    const t = document.createElement("span");
    t.classList.add("ql-picker-options"), t.setAttribute("aria-hidden", "true"), t.tabIndex = "-1", t.id = `ql-picker-options-${Da}`, Da += 1, this.label.setAttribute("aria-controls", t.id), this.options = t, Array.from(this.select.options).forEach((e) => {
      const r = this.buildItem(e);
      t.appendChild(r), e.selected === !0 && this.selectItem(r);
    }), this.container.appendChild(t);
  }
  buildPicker() {
    Array.from(this.select.attributes).forEach((t) => {
      this.container.setAttribute(t.name, t.value);
    }), this.container.classList.add("ql-picker"), this.label = this.buildLabel(), this.buildOptions();
  }
  escape() {
    this.close(), setTimeout(() => this.label.focus(), 1);
  }
  close() {
    this.container.classList.remove("ql-expanded"), this.label.setAttribute("aria-expanded", "false"), this.options.setAttribute("aria-hidden", "true");
  }
  selectItem(t) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    const r = this.container.querySelector(".ql-selected");
    t !== r && (r?.classList.remove("ql-selected"), t != null && (t.classList.add("ql-selected"), this.select.selectedIndex = Array.from(t.parentNode.children).indexOf(t), t.hasAttribute("data-value") ? this.label.setAttribute("data-value", t.getAttribute("data-value")) : this.label.removeAttribute("data-value"), t.hasAttribute("data-label") ? this.label.setAttribute("data-label", t.getAttribute("data-label")) : this.label.removeAttribute("data-label"), e && (this.select.dispatchEvent(new Event("change")), this.close())));
  }
  update() {
    let t;
    if (this.select.selectedIndex > -1) {
      const r = (
        // @ts-expect-error Fix me later
        this.container.querySelector(".ql-picker-options").children[this.select.selectedIndex]
      );
      t = this.select.options[this.select.selectedIndex], this.selectItem(r);
    } else
      this.selectItem(null);
    const e = t != null && t !== this.select.querySelector("option[selected]");
    this.label.classList.toggle("ql-active", e);
  }
}
class Bl extends As {
  constructor(t, e) {
    super(t), this.label.innerHTML = e, this.container.classList.add("ql-color-picker"), Array.from(this.container.querySelectorAll(".ql-picker-item")).slice(0, 7).forEach((r) => {
      r.classList.add("ql-primary");
    });
  }
  buildItem(t) {
    const e = super.buildItem(t);
    return e.style.backgroundColor = t.getAttribute("value") || "", e;
  }
  selectItem(t, e) {
    super.selectItem(t, e);
    const r = this.label.querySelector(".ql-color-label"), o = t && t.getAttribute("data-value") || "";
    r && (r.tagName === "line" ? r.style.stroke = o : r.style.fill = o);
  }
}
class Pl extends As {
  constructor(t, e) {
    super(t), this.container.classList.add("ql-icon-picker"), Array.from(this.container.querySelectorAll(".ql-picker-item")).forEach((r) => {
      r.innerHTML = e[r.getAttribute("data-value") || ""];
    }), this.defaultItem = this.container.querySelector(".ql-selected"), this.selectItem(this.defaultItem);
  }
  selectItem(t, e) {
    super.selectItem(t, e);
    const r = t || this.defaultItem;
    if (r != null) {
      if (this.label.innerHTML === r.innerHTML) return;
      this.label.innerHTML = r.innerHTML;
    }
  }
}
const Kg = (i) => {
  const {
    overflowY: t
  } = getComputedStyle(i, null);
  return t !== "visible" && t !== "clip";
};
class $l {
  constructor(t, e) {
    this.quill = t, this.boundsContainer = e || document.body, this.root = t.addContainer("ql-tooltip"), this.root.innerHTML = this.constructor.TEMPLATE, Kg(this.quill.root) && this.quill.root.addEventListener("scroll", () => {
      this.root.style.marginTop = `${-1 * this.quill.root.scrollTop}px`;
    }), this.hide();
  }
  hide() {
    this.root.classList.add("ql-hidden");
  }
  position(t) {
    const e = t.left + t.width / 2 - this.root.offsetWidth / 2, r = t.bottom + this.quill.root.scrollTop;
    this.root.style.left = `${e}px`, this.root.style.top = `${r}px`, this.root.classList.remove("ql-flip");
    const o = this.boundsContainer.getBoundingClientRect(), l = this.root.getBoundingClientRect();
    let h = 0;
    if (l.right > o.right && (h = o.right - l.right, this.root.style.left = `${e + h}px`), l.left < o.left && (h = o.left - l.left, this.root.style.left = `${e + h}px`), l.bottom > o.bottom) {
      const m = l.bottom - l.top, b = t.bottom - t.top + m;
      this.root.style.top = `${r - b}px`, this.root.classList.add("ql-flip");
    }
    return h;
  }
  show() {
    this.root.classList.remove("ql-editing"), this.root.classList.remove("ql-hidden");
  }
}
const Zg = [!1, "center", "right", "justify"], Xg = ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466"], Yg = [!1, "serif", "monospace"], Qg = ["1", "2", "3", !1], Jg = ["small", !1, "large", "huge"];
class Vi extends yi {
  constructor(t, e) {
    super(t, e);
    const r = (o) => {
      if (!document.body.contains(t.root)) {
        document.body.removeEventListener("click", r);
        return;
      }
      this.tooltip != null && // @ts-expect-error
      !this.tooltip.root.contains(o.target) && // @ts-expect-error
      document.activeElement !== this.tooltip.textbox && !this.quill.hasFocus() && this.tooltip.hide(), this.pickers != null && this.pickers.forEach((l) => {
        l.container.contains(o.target) || l.close();
      });
    };
    t.emitter.listenDOM("click", document.body, r);
  }
  addModule(t) {
    const e = super.addModule(t);
    return t === "toolbar" && this.extendToolbar(e), e;
  }
  buildButtons(t, e) {
    Array.from(t).forEach((r) => {
      (r.getAttribute("class") || "").split(/\s+/).forEach((l) => {
        if (l.startsWith("ql-") && (l = l.slice(3), e[l] != null))
          if (l === "direction")
            r.innerHTML = e[l][""] + e[l].rtl;
          else if (typeof e[l] == "string")
            r.innerHTML = e[l];
          else {
            const h = r.value || "";
            h != null && e[l][h] && (r.innerHTML = e[l][h]);
          }
      });
    });
  }
  buildPickers(t, e) {
    this.pickers = Array.from(t).map((o) => {
      if (o.classList.contains("ql-align") && (o.querySelector("option") == null && Oi(o, Zg), typeof e.align == "object"))
        return new Pl(o, e.align);
      if (o.classList.contains("ql-background") || o.classList.contains("ql-color")) {
        const l = o.classList.contains("ql-background") ? "background" : "color";
        return o.querySelector("option") == null && Oi(o, Xg, l === "background" ? "#ffffff" : "#000000"), new Bl(o, e[l]);
      }
      return o.querySelector("option") == null && (o.classList.contains("ql-font") ? Oi(o, Yg) : o.classList.contains("ql-header") ? Oi(o, Qg) : o.classList.contains("ql-size") && Oi(o, Jg)), new As(o);
    });
    const r = () => {
      this.pickers.forEach((o) => {
        o.update();
      });
    };
    this.quill.on(st.events.EDITOR_CHANGE, r);
  }
}
Vi.DEFAULTS = er({}, yi.DEFAULTS, {
  modules: {
    toolbar: {
      handlers: {
        formula() {
          this.quill.theme.tooltip.edit("formula");
        },
        image() {
          let i = this.container.querySelector("input.ql-image[type=file]");
          i == null && (i = document.createElement("input"), i.setAttribute("type", "file"), i.setAttribute("accept", this.quill.uploader.options.mimetypes.join(", ")), i.classList.add("ql-image"), i.addEventListener("change", () => {
            const t = this.quill.getSelection(!0);
            this.quill.uploader.upload(t, i.files), i.value = "";
          }), this.container.appendChild(i)), i.click();
        },
        video() {
          this.quill.theme.tooltip.edit("video");
        }
      }
    }
  }
});
class Hl extends $l {
  constructor(t, e) {
    super(t, e), this.textbox = this.root.querySelector('input[type="text"]'), this.listen();
  }
  listen() {
    this.textbox.addEventListener("keydown", (t) => {
      t.key === "Enter" ? (this.save(), t.preventDefault()) : t.key === "Escape" && (this.cancel(), t.preventDefault());
    });
  }
  cancel() {
    this.hide(), this.restoreFocus();
  }
  edit() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "link", e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
    if (this.root.classList.remove("ql-hidden"), this.root.classList.add("ql-editing"), this.textbox == null) return;
    e != null ? this.textbox.value = e : t !== this.root.getAttribute("data-mode") && (this.textbox.value = "");
    const r = this.quill.getBounds(this.quill.selection.savedRange);
    r != null && this.position(r), this.textbox.select(), this.textbox.setAttribute("placeholder", this.textbox.getAttribute(`data-${t}`) || ""), this.root.setAttribute("data-mode", t);
  }
  restoreFocus() {
    this.quill.focus({
      preventScroll: !0
    });
  }
  save() {
    let {
      value: t
    } = this.textbox;
    switch (this.root.getAttribute("data-mode")) {
      case "link": {
        const {
          scrollTop: e
        } = this.quill.root;
        this.linkRange ? (this.quill.formatText(this.linkRange, "link", t, st.sources.USER), delete this.linkRange) : (this.restoreFocus(), this.quill.format("link", t, st.sources.USER)), this.quill.root.scrollTop = e;
        break;
      }
      case "video":
        t = tm(t);
      // eslint-disable-next-line no-fallthrough
      case "formula": {
        if (!t) break;
        const e = this.quill.getSelection(!0);
        if (e != null) {
          const r = e.index + e.length;
          this.quill.insertEmbed(
            r,
            // @ts-expect-error Fix me later
            this.root.getAttribute("data-mode"),
            t,
            st.sources.USER
          ), this.root.getAttribute("data-mode") === "formula" && this.quill.insertText(r + 1, " ", st.sources.USER), this.quill.setSelection(r + 2, st.sources.USER);
        }
        break;
      }
    }
    this.textbox.value = "", this.hide();
  }
}
function tm(i) {
  let t = i.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtube\.com\/watch.*v=([a-zA-Z0-9_-]+)/) || i.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtu\.be\/([a-zA-Z0-9_-]+)/);
  return t ? `${t[1] || "https"}://www.youtube.com/embed/${t[2]}?showinfo=0` : (t = i.match(/^(?:(https?):\/\/)?(?:www\.)?vimeo\.com\/(\d+)/)) ? `${t[1] || "https"}://player.vimeo.com/video/${t[2]}/` : i;
}
function Oi(i, t) {
  let e = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
  t.forEach((r) => {
    const o = document.createElement("option");
    r === e ? o.setAttribute("selected", "selected") : o.setAttribute("value", String(r)), i.appendChild(o);
  });
}
const em = [["bold", "italic", "link"], [{
  header: 1
}, {
  header: 2
}, "blockquote"]];
class nm extends Hl {
  static TEMPLATE = ['<span class="ql-tooltip-arrow"></span>', '<div class="ql-tooltip-editor">', '<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">', '<a class="ql-close"></a>', "</div>"].join("");
  constructor(t, e) {
    super(t, e), this.quill.on(st.events.EDITOR_CHANGE, (r, o, l, h) => {
      if (r === st.events.SELECTION_CHANGE)
        if (o != null && o.length > 0 && h === st.sources.USER) {
          this.show(), this.root.style.left = "0px", this.root.style.width = "", this.root.style.width = `${this.root.offsetWidth}px`;
          const m = this.quill.getLines(o.index, o.length);
          if (m.length === 1) {
            const b = this.quill.getBounds(o);
            b != null && this.position(b);
          } else {
            const b = m[m.length - 1], x = this.quill.getIndex(b), C = Math.min(b.length() - 1, o.index + o.length - x), R = this.quill.getBounds(new qr(x, C));
            R != null && this.position(R);
          }
        } else document.activeElement !== this.textbox && this.quill.hasFocus() && this.hide();
    });
  }
  listen() {
    super.listen(), this.root.querySelector(".ql-close").addEventListener("click", () => {
      this.root.classList.remove("ql-editing");
    }), this.quill.on(st.events.SCROLL_OPTIMIZE, () => {
      setTimeout(() => {
        if (this.root.classList.contains("ql-hidden")) return;
        const t = this.quill.getSelection();
        if (t != null) {
          const e = this.quill.getBounds(t);
          e != null && this.position(e);
        }
      }, 1);
    });
  }
  cancel() {
    this.show();
  }
  position(t) {
    const e = super.position(t), r = this.root.querySelector(".ql-tooltip-arrow");
    return r.style.marginLeft = "", e !== 0 && (r.style.marginLeft = `${-1 * e - r.offsetWidth / 2}px`), e;
  }
}
class Ul extends Vi {
  constructor(t, e) {
    e.modules.toolbar != null && e.modules.toolbar.container == null && (e.modules.toolbar.container = em), super(t, e), this.quill.container.classList.add("ql-bubble");
  }
  extendToolbar(t) {
    this.tooltip = new nm(this.quill, this.options.bounds), t.container != null && (this.tooltip.root.appendChild(t.container), this.buildButtons(t.container.querySelectorAll("button"), Hi), this.buildPickers(t.container.querySelectorAll("select"), Hi));
  }
}
Ul.DEFAULTS = er({}, Vi.DEFAULTS, {
  modules: {
    toolbar: {
      handlers: {
        link(i) {
          i ? this.quill.theme.tooltip.edit() : this.quill.format("link", !1, U.sources.USER);
        }
      }
    }
  }
});
const rm = [[{
  header: ["1", "2", "3", !1]
}], ["bold", "italic", "underline", "link"], [{
  list: "ordered"
}, {
  list: "bullet"
}], ["clean"]];
class im extends Hl {
  static TEMPLATE = ['<a class="ql-preview" rel="noopener noreferrer" target="_blank" href="about:blank"></a>', '<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">', '<a class="ql-action"></a>', '<a class="ql-remove"></a>'].join("");
  preview = this.root.querySelector("a.ql-preview");
  listen() {
    super.listen(), this.root.querySelector("a.ql-action").addEventListener("click", (t) => {
      this.root.classList.contains("ql-editing") ? this.save() : this.edit("link", this.preview.textContent), t.preventDefault();
    }), this.root.querySelector("a.ql-remove").addEventListener("click", (t) => {
      if (this.linkRange != null) {
        const e = this.linkRange;
        this.restoreFocus(), this.quill.formatText(e, "link", !1, st.sources.USER), delete this.linkRange;
      }
      t.preventDefault(), this.hide();
    }), this.quill.on(st.events.SELECTION_CHANGE, (t, e, r) => {
      if (t != null) {
        if (t.length === 0 && r === st.sources.USER) {
          const [o, l] = this.quill.scroll.descendant(gs, t.index);
          if (o != null) {
            this.linkRange = new qr(t.index - l, o.length());
            const h = gs.formats(o.domNode);
            this.preview.textContent = h, this.preview.setAttribute("href", h), this.show();
            const m = this.quill.getBounds(this.linkRange);
            m != null && this.position(m);
            return;
          }
        } else
          delete this.linkRange;
        this.hide();
      }
    });
  }
  show() {
    super.show(), this.root.removeAttribute("data-mode");
  }
}
class Fl extends Vi {
  constructor(t, e) {
    e.modules.toolbar != null && e.modules.toolbar.container == null && (e.modules.toolbar.container = rm), super(t, e), this.quill.container.classList.add("ql-snow");
  }
  extendToolbar(t) {
    t.container != null && (t.container.classList.add("ql-snow"), this.buildButtons(t.container.querySelectorAll("button"), Hi), this.buildPickers(t.container.querySelectorAll("select"), Hi), this.tooltip = new im(this.quill, this.options.bounds), t.container.querySelector(".ql-link") && this.quill.keyboard.addBinding({
      key: "k",
      shortKey: !0
    }, (e, r) => {
      t.handlers.link.call(t, !r.format.link);
    }));
  }
}
Fl.DEFAULTS = er({}, Vi.DEFAULTS, {
  modules: {
    toolbar: {
      handlers: {
        link(i) {
          if (i) {
            const t = this.quill.getSelection();
            if (t == null || t.length === 0) return;
            let e = this.quill.getText(t);
            /^\S+@\S+\.\S+$/.test(e) && e.indexOf("mailto:") !== 0 && (e = `mailto:${e}`);
            const {
              tooltip: r
            } = this.quill.theme;
            r.edit("link", e);
          } else
            this.quill.format("link", !1, U.sources.USER);
        }
      }
    }
  }
});
U.register({
  "attributors/attribute/direction": Sl,
  "attributors/class/align": El,
  "attributors/class/background": up,
  "attributors/class/color": lp,
  "attributors/class/direction": Cl,
  "attributors/class/font": Ol,
  "attributors/class/size": kl,
  "attributors/style/align": Al,
  "attributors/style/background": Ao,
  "attributors/style/color": Eo,
  "attributors/style/direction": Ll,
  "attributors/style/font": _l,
  "attributors/style/size": Il
}, !0);
U.register({
  "formats/align": El,
  "formats/direction": Cl,
  "formats/indent": eg,
  "formats/background": Ao,
  "formats/color": Eo,
  "formats/font": Ol,
  "formats/size": kl,
  "formats/blockquote": ng,
  "formats/code-block": Te,
  "formats/header": rg,
  "formats/list": Wi,
  "formats/bold": qo,
  "formats/code": No,
  "formats/italic": ig,
  "formats/link": gs,
  "formats/script": sg,
  "formats/strike": og,
  "formats/underline": ag,
  "formats/formula": lg,
  "formats/image": ug,
  "formats/video": cg,
  "modules/syntax": jl,
  "modules/table": hg,
  "modules/toolbar": _o,
  "themes/bubble": Ul,
  "themes/snow": Fl,
  "ui/icons": Hi,
  "ui/picker": As,
  "ui/icon-picker": Pl,
  "ui/color-picker": Bl,
  "ui/tooltip": $l
}, !0);
const Yn = {}, Ba = 5 * 1024 * 1024;
window.editor = {
  init: (i, t) => {
    const e = document.querySelector(i);
    if (!e) {
      console.error(`❌ Element not found: ${i}`);
      return;
    }
    const r = new U(e, {
      theme: "snow",
      modules: {
        toolbar: {
          container: [
            ["bold", "italic", "underline"],
            ["image", "clean"]
          ],
          handlers: {
            image: function() {
              const o = document.createElement("input");
              o.type = "file", o.accept = "image/*", o.click(), o.onchange = async () => {
                const l = o.files?.[0];
                if (!l) return;
                if (l.size > Ba) {
                  alert(`⚠️ Image exceeds the 5MB limit (${(l.size / 1024 / 1024).toFixed(2)}MB)`);
                  return;
                }
                const h = this.quill.getSelection(!0);
                this.quill.insertText(h.index, `
*** Uploading Image ***
`);
                const b = await l.arrayBuffer(), x = new Uint8Array(b);
                t.invokeMethodAsync("OnEditorUploadImage", l.type, x);
              };
            }
          }
        }
      }
    });
    r.root.setAttribute("spellcheck", "false"), Yn[i] = r, r.root.addEventListener("paste", async (o) => {
      if (!o.clipboardData) return;
      const l = o.clipboardData.items;
      for (let h = 0; h < l.length; h++) {
        const m = l[h];
        if (m.type.startsWith("image/")) {
          o.preventDefault();
          const b = m.getAsFile();
          if (!b) return;
          if (b.size > Ba) {
            alert(`⚠️ Image exceeds the 5MB limit (${(b.size / 1024 / 1024).toFixed(2)}MB)`);
            return;
          }
          const x = r.getSelection(!0);
          r.insertText(x.index, `
*** Uploading Image ***
`), setTimeout(() => {
            r.root.querySelectorAll("img").forEach((k) => {
              k.remove();
            });
          }, 100);
          const R = await b.arrayBuffer(), E = new Uint8Array(R);
          t.invokeMethodAsync("OnEditorUploadImage", b.type, E);
        }
      }
    }), r.on("text-change", () => {
      const o = r.root.innerHTML;
      t.invokeMethodAsync("OnEditorContentChanged", o);
    });
  },
  getContent: (i) => {
    const t = Yn[i];
    return t ? t.root.innerHTML : "";
  },
  setContent: (i, t) => {
    const e = Yn[i];
    if (e) {
      if (!t) {
        e.root.innerHTML = "";
        return;
      }
      e.root.innerHTML = t;
    }
  },
  setContentText: (i, t) => {
    const e = Yn[i];
    if (!e) return;
    if (!t) {
      e.root.innerHTML = "";
      return;
    }
    const l = t.replace(/\\n/g, `
`).replace(/\\r\\n/g, `
`).replace(/\\r/g, `
`).split(`
`).map((h) => {
      const m = h.trim();
      return m ? `<p>${m}</p>` : "<p><br></p>";
    }).join("");
    e.root.innerHTML = l;
  },
  replacePlaceholderWithImage: (i, t, e, r) => {
    const o = Yn[i];
    if (!o) return;
    const h = o.getContents().ops || [], m = [];
    for (let x of h)
      if (x.insert && typeof x.insert == "string") {
        const C = x.insert.split("*** Uploading Image ***");
        for (let R = 0; R < C.length; R++)
          C[R].length > 0 && m.push({ insert: C[R] }), R < C.length - 1 && m.push({
            insert: { image: t },
            attributes: {
              alt: e
            }
          });
      } else
        m.push(x);
    o.setContents({ ops: m }, "silent");
    const b = o.root.innerHTML;
    r.invokeMethodAsync("OnEditorContentChanged", b);
  },
  showUploadError: (i, t, e) => {
    const r = Yn[i];
    if (!r) return;
    const l = r.getContents().ops || [], h = [];
    for (let b of l)
      if (b.insert && typeof b.insert == "string") {
        const x = b.insert.split("*** Uploading Image ***");
        for (let C = 0; C < x.length; C++)
          x[C].length > 0 && h.push({ insert: x[C] }), C < x.length - 1 && h.push({ insert: t });
      } else
        h.push(b);
    r.setContents({ ops: h }, "silent");
    const m = r.root.innerHTML;
    e.invokeMethodAsync("OnEditorContentChanged", m);
  },
  destroy: (i) => {
    const t = Yn[i];
    t && (t.off("text-change"), delete Yn[i]);
  }
};
var cs = { exports: {} };
/*!
 * jQuery JavaScript Library v3.7.1
 * https://jquery.com/
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2023-08-28T13:37Z
 */
var sm = cs.exports, Pa;
function om() {
  return Pa || (Pa = 1, (function(i) {
    (function(t, e) {
      i.exports = t.document ? e(t, !0) : function(r) {
        if (!r.document)
          throw new Error("jQuery requires a window with a document");
        return e(r);
      };
    })(typeof window < "u" ? window : sm, function(t, e) {
      var r = [], o = Object.getPrototypeOf, l = r.slice, h = r.flat ? function(n) {
        return r.flat.call(n);
      } : function(n) {
        return r.concat.apply([], n);
      }, m = r.push, b = r.indexOf, x = {}, C = x.toString, R = x.hasOwnProperty, E = R.toString, _ = E.call(Object), q = {}, k = function(s) {
        return typeof s == "function" && typeof s.nodeType != "number" && typeof s.item != "function";
      }, F = function(s) {
        return s != null && s === s.window;
      }, j = t.document, Y = {
        type: !0,
        src: !0,
        nonce: !0,
        noModule: !0
      };
      function rt(n, s, a) {
        a = a || j;
        var u, d, p = a.createElement("script");
        if (p.text = n, s)
          for (u in Y)
            d = s[u] || s.getAttribute && s.getAttribute(u), d && p.setAttribute(u, d);
        a.head.appendChild(p).parentNode.removeChild(p);
      }
      function dt(n) {
        return n == null ? n + "" : typeof n == "object" || typeof n == "function" ? x[C.call(n)] || "object" : typeof n;
      }
      var ht = "3.7.1", Pt = /HTML$/i, c = function(n, s) {
        return new c.fn.init(n, s);
      };
      c.fn = c.prototype = {
        // The current version of jQuery being used
        jquery: ht,
        constructor: c,
        // The default length of a jQuery object is 0
        length: 0,
        toArray: function() {
          return l.call(this);
        },
        // Get the Nth element in the matched element set OR
        // Get the whole matched element set as a clean array
        get: function(n) {
          return n == null ? l.call(this) : n < 0 ? this[n + this.length] : this[n];
        },
        // Take an array of elements and push it onto the stack
        // (returning the new matched element set)
        pushStack: function(n) {
          var s = c.merge(this.constructor(), n);
          return s.prevObject = this, s;
        },
        // Execute a callback for every element in the matched set.
        each: function(n) {
          return c.each(this, n);
        },
        map: function(n) {
          return this.pushStack(c.map(this, function(s, a) {
            return n.call(s, a, s);
          }));
        },
        slice: function() {
          return this.pushStack(l.apply(this, arguments));
        },
        first: function() {
          return this.eq(0);
        },
        last: function() {
          return this.eq(-1);
        },
        even: function() {
          return this.pushStack(c.grep(this, function(n, s) {
            return (s + 1) % 2;
          }));
        },
        odd: function() {
          return this.pushStack(c.grep(this, function(n, s) {
            return s % 2;
          }));
        },
        eq: function(n) {
          var s = this.length, a = +n + (n < 0 ? s : 0);
          return this.pushStack(a >= 0 && a < s ? [this[a]] : []);
        },
        end: function() {
          return this.prevObject || this.constructor();
        },
        // For internal use only.
        // Behaves like an Array's method, not like a jQuery method.
        push: m,
        sort: r.sort,
        splice: r.splice
      }, c.extend = c.fn.extend = function() {
        var n, s, a, u, d, p, g = arguments[0] || {}, T = 1, w = arguments.length, L = !1;
        for (typeof g == "boolean" && (L = g, g = arguments[T] || {}, T++), typeof g != "object" && !k(g) && (g = {}), T === w && (g = this, T--); T < w; T++)
          if ((n = arguments[T]) != null)
            for (s in n)
              u = n[s], !(s === "__proto__" || g === u) && (L && u && (c.isPlainObject(u) || (d = Array.isArray(u))) ? (a = g[s], d && !Array.isArray(a) ? p = [] : !d && !c.isPlainObject(a) ? p = {} : p = a, d = !1, g[s] = c.extend(L, p, u)) : u !== void 0 && (g[s] = u));
        return g;
      }, c.extend({
        // Unique for each copy of jQuery on the page
        expando: "jQuery" + (ht + Math.random()).replace(/\D/g, ""),
        // Assume jQuery is ready without the ready module
        isReady: !0,
        error: function(n) {
          throw new Error(n);
        },
        noop: function() {
        },
        isPlainObject: function(n) {
          var s, a;
          return !n || C.call(n) !== "[object Object]" ? !1 : (s = o(n), s ? (a = R.call(s, "constructor") && s.constructor, typeof a == "function" && E.call(a) === _) : !0);
        },
        isEmptyObject: function(n) {
          var s;
          for (s in n)
            return !1;
          return !0;
        },
        // Evaluates a script in a provided context; falls back to the global one
        // if not specified.
        globalEval: function(n, s, a) {
          rt(n, { nonce: s && s.nonce }, a);
        },
        each: function(n, s) {
          var a, u = 0;
          if (Kt(n))
            for (a = n.length; u < a && s.call(n[u], u, n[u]) !== !1; u++)
              ;
          else
            for (u in n)
              if (s.call(n[u], u, n[u]) === !1)
                break;
          return n;
        },
        // Retrieve the text value of an array of DOM nodes
        text: function(n) {
          var s, a = "", u = 0, d = n.nodeType;
          if (!d)
            for (; s = n[u++]; )
              a += c.text(s);
          return d === 1 || d === 11 ? n.textContent : d === 9 ? n.documentElement.textContent : d === 3 || d === 4 ? n.nodeValue : a;
        },
        // results is for internal usage only
        makeArray: function(n, s) {
          var a = s || [];
          return n != null && (Kt(Object(n)) ? c.merge(
            a,
            typeof n == "string" ? [n] : n
          ) : m.call(a, n)), a;
        },
        inArray: function(n, s, a) {
          return s == null ? -1 : b.call(s, n, a);
        },
        isXMLDoc: function(n) {
          var s = n && n.namespaceURI, a = n && (n.ownerDocument || n).documentElement;
          return !Pt.test(s || a && a.nodeName || "HTML");
        },
        // Support: Android <=4.0 only, PhantomJS 1 only
        // push.apply(_, arraylike) throws on ancient WebKit
        merge: function(n, s) {
          for (var a = +s.length, u = 0, d = n.length; u < a; u++)
            n[d++] = s[u];
          return n.length = d, n;
        },
        grep: function(n, s, a) {
          for (var u, d = [], p = 0, g = n.length, T = !a; p < g; p++)
            u = !s(n[p], p), u !== T && d.push(n[p]);
          return d;
        },
        // arg is for internal usage only
        map: function(n, s, a) {
          var u, d, p = 0, g = [];
          if (Kt(n))
            for (u = n.length; p < u; p++)
              d = s(n[p], p, a), d != null && g.push(d);
          else
            for (p in n)
              d = s(n[p], p, a), d != null && g.push(d);
          return h(g);
        },
        // A global GUID counter for objects
        guid: 1,
        // jQuery.support is not used in Core but other projects attach their
        // properties to it so it needs to exist.
        support: q
      }), typeof Symbol == "function" && (c.fn[Symbol.iterator] = r[Symbol.iterator]), c.each(
        "Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),
        function(n, s) {
          x["[object " + s + "]"] = s.toLowerCase();
        }
      );
      function Kt(n) {
        var s = !!n && "length" in n && n.length, a = dt(n);
        return k(n) || F(n) ? !1 : a === "array" || s === 0 || typeof s == "number" && s > 0 && s - 1 in n;
      }
      function Nt(n, s) {
        return n.nodeName && n.nodeName.toLowerCase() === s.toLowerCase();
      }
      var me = r.pop, N = r.sort, V = r.splice, O = "[\\x20\\t\\r\\n\\f]", X = new RegExp(
        "^" + O + "+|((?:^|[^\\\\])(?:\\\\.)*)" + O + "+$",
        "g"
      );
      c.contains = function(n, s) {
        var a = s && s.parentNode;
        return n === a || !!(a && a.nodeType === 1 && // Support: IE 9 - 11+
        // IE doesn't have `contains` on SVG.
        (n.contains ? n.contains(a) : n.compareDocumentPosition && n.compareDocumentPosition(a) & 16));
      };
      var K = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g;
      function z(n, s) {
        return s ? n === "\0" ? "�" : n.slice(0, -1) + "\\" + n.charCodeAt(n.length - 1).toString(16) + " " : "\\" + n;
      }
      c.escapeSelector = function(n) {
        return (n + "").replace(K, z);
      };
      var G = j, et = m;
      (function() {
        var n, s, a, u, d, p = et, g, T, w, L, B, H = c.expando, M = 0, W = 0, yt = Gi(), kt = Gi(), Et = Gi(), ce = Gi(), te = function(v, S) {
          return v === S && (d = !0), 0;
        }, gn = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", mn = "(?:\\\\[\\da-fA-F]{1,6}" + O + "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+", qt = "\\[" + O + "*(" + mn + ")(?:" + O + // Operator (capture 2)
        "*([*^$|!~]?=)" + O + // "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
        `*(?:'((?:\\\\.|[^\\\\'])*)'|"((?:\\\\.|[^\\\\"])*)"|(` + mn + "))|)" + O + "*\\]", Ar = ":(" + mn + `)(?:\\((('((?:\\\\.|[^\\\\'])*)'|"((?:\\\\.|[^\\\\"])*)")|((?:\\\\.|[^\\\\()[\\]]|` + qt + ")*)|.*)\\)|)", Dt = new RegExp(O + "+", "g"), Gt = new RegExp("^" + O + "*," + O + "*"), Si = new RegExp("^" + O + "*([>+~]|" + O + ")" + O + "*"), Ns = new RegExp(O + "|>"), yn = new RegExp(Ar), Ci = new RegExp("^" + mn + "$"), bn = {
          ID: new RegExp("^#(" + mn + ")"),
          CLASS: new RegExp("^\\.(" + mn + ")"),
          TAG: new RegExp("^(" + mn + "|[*])"),
          ATTR: new RegExp("^" + qt),
          PSEUDO: new RegExp("^" + Ar),
          CHILD: new RegExp(
            "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + O + "*(even|odd|(([+-]|)(\\d*)n|)" + O + "*(?:([+-]|)" + O + "*(\\d+)|))" + O + "*\\)|)",
            "i"
          ),
          bool: new RegExp("^(?:" + gn + ")$", "i"),
          // For use in libraries implementing .is()
          // We use this for POS matching in `select`
          needsContext: new RegExp("^" + O + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + O + "*((?:-\\d)?\\d*)" + O + "*\\)|)(?=[^-]|$)", "i")
        }, Kn = /^(?:input|select|textarea|button)$/i, Zn = /^h\d$/i, Pe = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, Ss = /[+~]/, In = new RegExp("\\\\[\\da-fA-F]{1,6}" + O + "?|\\\\([^\\r\\n\\f])", "g"), Rn = function(v, S) {
          var I = "0x" + v.slice(1) - 65536;
          return S || (I < 0 ? String.fromCharCode(I + 65536) : String.fromCharCode(I >> 10 | 55296, I & 1023 | 56320));
        }, zl = function() {
          Xn();
        }, Wl = Zi(
          function(v) {
            return v.disabled === !0 && Nt(v, "fieldset");
          },
          { dir: "parentNode", next: "legend" }
        );
        function Vl() {
          try {
            return g.activeElement;
          } catch {
          }
        }
        try {
          p.apply(
            r = l.call(G.childNodes),
            G.childNodes
          ), r[G.childNodes.length].nodeType;
        } catch {
          p = {
            apply: function(S, I) {
              et.apply(S, l.call(I));
            },
            call: function(S) {
              et.apply(S, l.call(arguments, 1));
            }
          };
        }
        function Bt(v, S, I, D) {
          var $, Z, J, at, tt, St, pt, bt = S && S.ownerDocument, Ct = S ? S.nodeType : 9;
          if (I = I || [], typeof v != "string" || !v || Ct !== 1 && Ct !== 9 && Ct !== 11)
            return I;
          if (!D && (Xn(S), S = S || g, w)) {
            if (Ct !== 11 && (tt = Pe.exec(v)))
              if ($ = tt[1]) {
                if (Ct === 9)
                  if (J = S.getElementById($)) {
                    if (J.id === $)
                      return p.call(I, J), I;
                  } else
                    return I;
                else if (bt && (J = bt.getElementById($)) && Bt.contains(S, J) && J.id === $)
                  return p.call(I, J), I;
              } else {
                if (tt[2])
                  return p.apply(I, S.getElementsByTagName(v)), I;
                if (($ = tt[3]) && S.getElementsByClassName)
                  return p.apply(I, S.getElementsByClassName($)), I;
              }
            if (!ce[v + " "] && (!L || !L.test(v))) {
              if (pt = v, bt = S, Ct === 1 && (Ns.test(v) || Si.test(v))) {
                for (bt = Ss.test(v) && Cs(S.parentNode) || S, (bt != S || !q.scope) && ((at = S.getAttribute("id")) ? at = c.escapeSelector(at) : S.setAttribute("id", at = H)), St = Li(v), Z = St.length; Z--; )
                  St[Z] = (at ? "#" + at : ":scope") + " " + Ki(St[Z]);
                pt = St.join(",");
              }
              try {
                return p.apply(
                  I,
                  bt.querySelectorAll(pt)
                ), I;
              } catch {
                ce(v, !0);
              } finally {
                at === H && S.removeAttribute("id");
              }
            }
          }
          return Ro(v.replace(X, "$1"), S, I, D);
        }
        function Gi() {
          var v = [];
          function S(I, D) {
            return v.push(I + " ") > s.cacheLength && delete S[v.shift()], S[I + " "] = D;
          }
          return S;
        }
        function Ke(v) {
          return v[H] = !0, v;
        }
        function ii(v) {
          var S = g.createElement("fieldset");
          try {
            return !!v(S);
          } catch {
            return !1;
          } finally {
            S.parentNode && S.parentNode.removeChild(S), S = null;
          }
        }
        function Gl(v) {
          return function(S) {
            return Nt(S, "input") && S.type === v;
          };
        }
        function Kl(v) {
          return function(S) {
            return (Nt(S, "input") || Nt(S, "button")) && S.type === v;
          };
        }
        function ko(v) {
          return function(S) {
            return "form" in S ? S.parentNode && S.disabled === !1 ? "label" in S ? "label" in S.parentNode ? S.parentNode.disabled === v : S.disabled === v : S.isDisabled === v || // Where there is no isDisabled, check manually
            S.isDisabled !== !v && Wl(S) === v : S.disabled === v : "label" in S ? S.disabled === v : !1;
          };
        }
        function Nr(v) {
          return Ke(function(S) {
            return S = +S, Ke(function(I, D) {
              for (var $, Z = v([], I.length, S), J = Z.length; J--; )
                I[$ = Z[J]] && (I[$] = !(D[$] = I[$]));
            });
          });
        }
        function Cs(v) {
          return v && typeof v.getElementsByTagName < "u" && v;
        }
        function Xn(v) {
          var S, I = v ? v.ownerDocument || v : G;
          return I == g || I.nodeType !== 9 || !I.documentElement || (g = I, T = g.documentElement, w = !c.isXMLDoc(g), B = T.matches || T.webkitMatchesSelector || T.msMatchesSelector, T.msMatchesSelector && // Support: IE 11+, Edge 17 - 18+
          // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
          // two documents; shallow comparisons work.
          // eslint-disable-next-line eqeqeq
          G != g && (S = g.defaultView) && S.top !== S && S.addEventListener("unload", zl), q.getById = ii(function(D) {
            return T.appendChild(D).id = c.expando, !g.getElementsByName || !g.getElementsByName(c.expando).length;
          }), q.disconnectedMatch = ii(function(D) {
            return B.call(D, "*");
          }), q.scope = ii(function() {
            return g.querySelectorAll(":scope");
          }), q.cssHas = ii(function() {
            try {
              return g.querySelector(":has(*,:jqfake)"), !1;
            } catch {
              return !0;
            }
          }), q.getById ? (s.filter.ID = function(D) {
            var $ = D.replace(In, Rn);
            return function(Z) {
              return Z.getAttribute("id") === $;
            };
          }, s.find.ID = function(D, $) {
            if (typeof $.getElementById < "u" && w) {
              var Z = $.getElementById(D);
              return Z ? [Z] : [];
            }
          }) : (s.filter.ID = function(D) {
            var $ = D.replace(In, Rn);
            return function(Z) {
              var J = typeof Z.getAttributeNode < "u" && Z.getAttributeNode("id");
              return J && J.value === $;
            };
          }, s.find.ID = function(D, $) {
            if (typeof $.getElementById < "u" && w) {
              var Z, J, at, tt = $.getElementById(D);
              if (tt) {
                if (Z = tt.getAttributeNode("id"), Z && Z.value === D)
                  return [tt];
                for (at = $.getElementsByName(D), J = 0; tt = at[J++]; )
                  if (Z = tt.getAttributeNode("id"), Z && Z.value === D)
                    return [tt];
              }
              return [];
            }
          }), s.find.TAG = function(D, $) {
            return typeof $.getElementsByTagName < "u" ? $.getElementsByTagName(D) : $.querySelectorAll(D);
          }, s.find.CLASS = function(D, $) {
            if (typeof $.getElementsByClassName < "u" && w)
              return $.getElementsByClassName(D);
          }, L = [], ii(function(D) {
            var $;
            T.appendChild(D).innerHTML = "<a id='" + H + "' href='' disabled='disabled'></a><select id='" + H + "-\r\\' disabled='disabled'><option selected=''></option></select>", D.querySelectorAll("[selected]").length || L.push("\\[" + O + "*(?:value|" + gn + ")"), D.querySelectorAll("[id~=" + H + "-]").length || L.push("~="), D.querySelectorAll("a#" + H + "+*").length || L.push(".#.+[+~]"), D.querySelectorAll(":checked").length || L.push(":checked"), $ = g.createElement("input"), $.setAttribute("type", "hidden"), D.appendChild($).setAttribute("name", "D"), T.appendChild(D).disabled = !0, D.querySelectorAll(":disabled").length !== 2 && L.push(":enabled", ":disabled"), $ = g.createElement("input"), $.setAttribute("name", ""), D.appendChild($), D.querySelectorAll("[name='']").length || L.push("\\[" + O + "*name" + O + "*=" + O + `*(?:''|"")`);
          }), q.cssHas || L.push(":has"), L = L.length && new RegExp(L.join("|")), te = function(D, $) {
            if (D === $)
              return d = !0, 0;
            var Z = !D.compareDocumentPosition - !$.compareDocumentPosition;
            return Z || (Z = (D.ownerDocument || D) == ($.ownerDocument || $) ? D.compareDocumentPosition($) : (
              // Otherwise we know they are disconnected
              1
            ), Z & 1 || !q.sortDetached && $.compareDocumentPosition(D) === Z ? D === g || D.ownerDocument == G && Bt.contains(G, D) ? -1 : $ === g || $.ownerDocument == G && Bt.contains(G, $) ? 1 : u ? b.call(u, D) - b.call(u, $) : 0 : Z & 4 ? -1 : 1);
          }), g;
        }
        Bt.matches = function(v, S) {
          return Bt(v, null, null, S);
        }, Bt.matchesSelector = function(v, S) {
          if (Xn(v), w && !ce[S + " "] && (!L || !L.test(S)))
            try {
              var I = B.call(v, S);
              if (I || q.disconnectedMatch || // As well, disconnected nodes are said to be in a document
              // fragment in IE 9
              v.document && v.document.nodeType !== 11)
                return I;
            } catch {
              ce(S, !0);
            }
          return Bt(S, g, null, [v]).length > 0;
        }, Bt.contains = function(v, S) {
          return (v.ownerDocument || v) != g && Xn(v), c.contains(v, S);
        }, Bt.attr = function(v, S) {
          (v.ownerDocument || v) != g && Xn(v);
          var I = s.attrHandle[S.toLowerCase()], D = I && R.call(s.attrHandle, S.toLowerCase()) ? I(v, S, !w) : void 0;
          return D !== void 0 ? D : v.getAttribute(S);
        }, Bt.error = function(v) {
          throw new Error("Syntax error, unrecognized expression: " + v);
        }, c.uniqueSort = function(v) {
          var S, I = [], D = 0, $ = 0;
          if (d = !q.sortStable, u = !q.sortStable && l.call(v, 0), N.call(v, te), d) {
            for (; S = v[$++]; )
              S === v[$] && (D = I.push($));
            for (; D--; )
              V.call(v, I[D], 1);
          }
          return u = null, v;
        }, c.fn.uniqueSort = function() {
          return this.pushStack(c.uniqueSort(l.apply(this)));
        }, s = c.expr = {
          // Can be adjusted by the user
          cacheLength: 50,
          createPseudo: Ke,
          match: bn,
          attrHandle: {},
          find: {},
          relative: {
            ">": { dir: "parentNode", first: !0 },
            " ": { dir: "parentNode" },
            "+": { dir: "previousSibling", first: !0 },
            "~": { dir: "previousSibling" }
          },
          preFilter: {
            ATTR: function(v) {
              return v[1] = v[1].replace(In, Rn), v[3] = (v[3] || v[4] || v[5] || "").replace(In, Rn), v[2] === "~=" && (v[3] = " " + v[3] + " "), v.slice(0, 4);
            },
            CHILD: function(v) {
              return v[1] = v[1].toLowerCase(), v[1].slice(0, 3) === "nth" ? (v[3] || Bt.error(v[0]), v[4] = +(v[4] ? v[5] + (v[6] || 1) : 2 * (v[3] === "even" || v[3] === "odd")), v[5] = +(v[7] + v[8] || v[3] === "odd")) : v[3] && Bt.error(v[0]), v;
            },
            PSEUDO: function(v) {
              var S, I = !v[6] && v[2];
              return bn.CHILD.test(v[0]) ? null : (v[3] ? v[2] = v[4] || v[5] || "" : I && yn.test(I) && // Get excess from tokenize (recursively)
              (S = Li(I, !0)) && // advance to the next closing parenthesis
              (S = I.indexOf(")", I.length - S) - I.length) && (v[0] = v[0].slice(0, S), v[2] = I.slice(0, S)), v.slice(0, 3));
            }
          },
          filter: {
            TAG: function(v) {
              var S = v.replace(In, Rn).toLowerCase();
              return v === "*" ? function() {
                return !0;
              } : function(I) {
                return Nt(I, S);
              };
            },
            CLASS: function(v) {
              var S = yt[v + " "];
              return S || (S = new RegExp("(^|" + O + ")" + v + "(" + O + "|$)")) && yt(v, function(I) {
                return S.test(
                  typeof I.className == "string" && I.className || typeof I.getAttribute < "u" && I.getAttribute("class") || ""
                );
              });
            },
            ATTR: function(v, S, I) {
              return function(D) {
                var $ = Bt.attr(D, v);
                return $ == null ? S === "!=" : S ? ($ += "", S === "=" ? $ === I : S === "!=" ? $ !== I : S === "^=" ? I && $.indexOf(I) === 0 : S === "*=" ? I && $.indexOf(I) > -1 : S === "$=" ? I && $.slice(-I.length) === I : S === "~=" ? (" " + $.replace(Dt, " ") + " ").indexOf(I) > -1 : S === "|=" ? $ === I || $.slice(0, I.length + 1) === I + "-" : !1) : !0;
              };
            },
            CHILD: function(v, S, I, D, $) {
              var Z = v.slice(0, 3) !== "nth", J = v.slice(-4) !== "last", at = S === "of-type";
              return D === 1 && $ === 0 ? (
                // Shortcut for :nth-*(n)
                function(tt) {
                  return !!tt.parentNode;
                }
              ) : function(tt, St, pt) {
                var bt, Ct, ft, Ft, Ne, pe = Z !== J ? "nextSibling" : "previousSibling", $e = tt.parentNode, vn = at && tt.nodeName.toLowerCase(), si = !pt && !at, xe = !1;
                if ($e) {
                  if (Z) {
                    for (; pe; ) {
                      for (ft = tt; ft = ft[pe]; )
                        if (at ? Nt(ft, vn) : ft.nodeType === 1)
                          return !1;
                      Ne = pe = v === "only" && !Ne && "nextSibling";
                    }
                    return !0;
                  }
                  if (Ne = [J ? $e.firstChild : $e.lastChild], J && si) {
                    for (Ct = $e[H] || ($e[H] = {}), bt = Ct[v] || [], Ft = bt[0] === M && bt[1], xe = Ft && bt[2], ft = Ft && $e.childNodes[Ft]; ft = ++Ft && ft && ft[pe] || // Fallback to seeking `elem` from the start
                    (xe = Ft = 0) || Ne.pop(); )
                      if (ft.nodeType === 1 && ++xe && ft === tt) {
                        Ct[v] = [M, Ft, xe];
                        break;
                      }
                  } else if (si && (Ct = tt[H] || (tt[H] = {}), bt = Ct[v] || [], Ft = bt[0] === M && bt[1], xe = Ft), xe === !1)
                    for (; (ft = ++Ft && ft && ft[pe] || (xe = Ft = 0) || Ne.pop()) && !((at ? Nt(ft, vn) : ft.nodeType === 1) && ++xe && (si && (Ct = ft[H] || (ft[H] = {}), Ct[v] = [M, xe]), ft === tt)); )
                      ;
                  return xe -= $, xe === D || xe % D === 0 && xe / D >= 0;
                }
              };
            },
            PSEUDO: function(v, S) {
              var I, D = s.pseudos[v] || s.setFilters[v.toLowerCase()] || Bt.error("unsupported pseudo: " + v);
              return D[H] ? D(S) : D.length > 1 ? (I = [v, v, "", S], s.setFilters.hasOwnProperty(v.toLowerCase()) ? Ke(function($, Z) {
                for (var J, at = D($, S), tt = at.length; tt--; )
                  J = b.call($, at[tt]), $[J] = !(Z[J] = at[tt]);
              }) : function($) {
                return D($, 0, I);
              }) : D;
            }
          },
          pseudos: {
            // Potentially complex pseudos
            not: Ke(function(v) {
              var S = [], I = [], D = _s(v.replace(X, "$1"));
              return D[H] ? Ke(function($, Z, J, at) {
                for (var tt, St = D($, null, at, []), pt = $.length; pt--; )
                  (tt = St[pt]) && ($[pt] = !(Z[pt] = tt));
              }) : function($, Z, J) {
                return S[0] = $, D(S, null, J, I), S[0] = null, !I.pop();
              };
            }),
            has: Ke(function(v) {
              return function(S) {
                return Bt(v, S).length > 0;
              };
            }),
            contains: Ke(function(v) {
              return v = v.replace(In, Rn), function(S) {
                return (S.textContent || c.text(S)).indexOf(v) > -1;
              };
            }),
            // "Whether an element is represented by a :lang() selector
            // is based solely on the element's language value
            // being equal to the identifier C,
            // or beginning with the identifier C immediately followed by "-".
            // The matching of C against the element's language value is performed case-insensitively.
            // The identifier C does not have to be a valid language name."
            // https://www.w3.org/TR/selectors/#lang-pseudo
            lang: Ke(function(v) {
              return Ci.test(v || "") || Bt.error("unsupported lang: " + v), v = v.replace(In, Rn).toLowerCase(), function(S) {
                var I;
                do
                  if (I = w ? S.lang : S.getAttribute("xml:lang") || S.getAttribute("lang"))
                    return I = I.toLowerCase(), I === v || I.indexOf(v + "-") === 0;
                while ((S = S.parentNode) && S.nodeType === 1);
                return !1;
              };
            }),
            // Miscellaneous
            target: function(v) {
              var S = t.location && t.location.hash;
              return S && S.slice(1) === v.id;
            },
            root: function(v) {
              return v === T;
            },
            focus: function(v) {
              return v === Vl() && g.hasFocus() && !!(v.type || v.href || ~v.tabIndex);
            },
            // Boolean properties
            enabled: ko(!1),
            disabled: ko(!0),
            checked: function(v) {
              return Nt(v, "input") && !!v.checked || Nt(v, "option") && !!v.selected;
            },
            selected: function(v) {
              return v.parentNode && v.parentNode.selectedIndex, v.selected === !0;
            },
            // Contents
            empty: function(v) {
              for (v = v.firstChild; v; v = v.nextSibling)
                if (v.nodeType < 6)
                  return !1;
              return !0;
            },
            parent: function(v) {
              return !s.pseudos.empty(v);
            },
            // Element/input types
            header: function(v) {
              return Zn.test(v.nodeName);
            },
            input: function(v) {
              return Kn.test(v.nodeName);
            },
            button: function(v) {
              return Nt(v, "input") && v.type === "button" || Nt(v, "button");
            },
            text: function(v) {
              var S;
              return Nt(v, "input") && v.type === "text" && // Support: IE <10 only
              // New HTML5 attribute values (e.g., "search") appear
              // with elem.type === "text"
              ((S = v.getAttribute("type")) == null || S.toLowerCase() === "text");
            },
            // Position-in-collection
            first: Nr(function() {
              return [0];
            }),
            last: Nr(function(v, S) {
              return [S - 1];
            }),
            eq: Nr(function(v, S, I) {
              return [I < 0 ? I + S : I];
            }),
            even: Nr(function(v, S) {
              for (var I = 0; I < S; I += 2)
                v.push(I);
              return v;
            }),
            odd: Nr(function(v, S) {
              for (var I = 1; I < S; I += 2)
                v.push(I);
              return v;
            }),
            lt: Nr(function(v, S, I) {
              var D;
              for (I < 0 ? D = I + S : I > S ? D = S : D = I; --D >= 0; )
                v.push(D);
              return v;
            }),
            gt: Nr(function(v, S, I) {
              for (var D = I < 0 ? I + S : I; ++D < S; )
                v.push(D);
              return v;
            })
          }
        }, s.pseudos.nth = s.pseudos.eq;
        for (n in { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 })
          s.pseudos[n] = Gl(n);
        for (n in { submit: !0, reset: !0 })
          s.pseudos[n] = Kl(n);
        function Io() {
        }
        Io.prototype = s.filters = s.pseudos, s.setFilters = new Io();
        function Li(v, S) {
          var I, D, $, Z, J, at, tt, St = kt[v + " "];
          if (St)
            return S ? 0 : St.slice(0);
          for (J = v, at = [], tt = s.preFilter; J; ) {
            (!I || (D = Gt.exec(J))) && (D && (J = J.slice(D[0].length) || J), at.push($ = [])), I = !1, (D = Si.exec(J)) && (I = D.shift(), $.push({
              value: I,
              // Cast descendant combinators to space
              type: D[0].replace(X, " ")
            }), J = J.slice(I.length));
            for (Z in s.filter)
              (D = bn[Z].exec(J)) && (!tt[Z] || (D = tt[Z](D))) && (I = D.shift(), $.push({
                value: I,
                type: Z,
                matches: D
              }), J = J.slice(I.length));
            if (!I)
              break;
          }
          return S ? J.length : J ? Bt.error(v) : (
            // Cache the tokens
            kt(v, at).slice(0)
          );
        }
        function Ki(v) {
          for (var S = 0, I = v.length, D = ""; S < I; S++)
            D += v[S].value;
          return D;
        }
        function Zi(v, S, I) {
          var D = S.dir, $ = S.next, Z = $ || D, J = I && Z === "parentNode", at = W++;
          return S.first ? (
            // Check against closest ancestor/preceding element
            function(tt, St, pt) {
              for (; tt = tt[D]; )
                if (tt.nodeType === 1 || J)
                  return v(tt, St, pt);
              return !1;
            }
          ) : (
            // Check against all ancestor/preceding elements
            function(tt, St, pt) {
              var bt, Ct, ft = [M, at];
              if (pt) {
                for (; tt = tt[D]; )
                  if ((tt.nodeType === 1 || J) && v(tt, St, pt))
                    return !0;
              } else
                for (; tt = tt[D]; )
                  if (tt.nodeType === 1 || J)
                    if (Ct = tt[H] || (tt[H] = {}), $ && Nt(tt, $))
                      tt = tt[D] || tt;
                    else {
                      if ((bt = Ct[Z]) && bt[0] === M && bt[1] === at)
                        return ft[2] = bt[2];
                      if (Ct[Z] = ft, ft[2] = v(tt, St, pt))
                        return !0;
                    }
              return !1;
            }
          );
        }
        function Ls(v) {
          return v.length > 1 ? function(S, I, D) {
            for (var $ = v.length; $--; )
              if (!v[$](S, I, D))
                return !1;
            return !0;
          } : v[0];
        }
        function Zl(v, S, I) {
          for (var D = 0, $ = S.length; D < $; D++)
            Bt(v, S[D], I);
          return I;
        }
        function Xi(v, S, I, D, $) {
          for (var Z, J = [], at = 0, tt = v.length, St = S != null; at < tt; at++)
            (Z = v[at]) && (!I || I(Z, D, $)) && (J.push(Z), St && S.push(at));
          return J;
        }
        function qs(v, S, I, D, $, Z) {
          return D && !D[H] && (D = qs(D)), $ && !$[H] && ($ = qs($, Z)), Ke(function(J, at, tt, St) {
            var pt, bt, Ct, ft, Ft = [], Ne = [], pe = at.length, $e = J || Zl(
              S || "*",
              tt.nodeType ? [tt] : tt,
              []
            ), vn = v && (J || !S) ? Xi($e, Ft, v, tt, St) : $e;
            if (I ? (ft = $ || (J ? v : pe || D) ? (
              // ...intermediate processing is necessary
              []
            ) : (
              // ...otherwise use results directly
              at
            ), I(vn, ft, tt, St)) : ft = vn, D)
              for (pt = Xi(ft, Ne), D(pt, [], tt, St), bt = pt.length; bt--; )
                (Ct = pt[bt]) && (ft[Ne[bt]] = !(vn[Ne[bt]] = Ct));
            if (J) {
              if ($ || v) {
                if ($) {
                  for (pt = [], bt = ft.length; bt--; )
                    (Ct = ft[bt]) && pt.push(vn[bt] = Ct);
                  $(null, ft = [], pt, St);
                }
                for (bt = ft.length; bt--; )
                  (Ct = ft[bt]) && (pt = $ ? b.call(J, Ct) : Ft[bt]) > -1 && (J[pt] = !(at[pt] = Ct));
              }
            } else
              ft = Xi(
                ft === at ? ft.splice(pe, ft.length) : ft
              ), $ ? $(null, at, ft, St) : p.apply(at, ft);
          });
        }
        function Os(v) {
          for (var S, I, D, $ = v.length, Z = s.relative[v[0].type], J = Z || s.relative[" "], at = Z ? 1 : 0, tt = Zi(function(bt) {
            return bt === S;
          }, J, !0), St = Zi(function(bt) {
            return b.call(S, bt) > -1;
          }, J, !0), pt = [function(bt, Ct, ft) {
            var Ft = !Z && (ft || Ct != a) || ((S = Ct).nodeType ? tt(bt, Ct, ft) : St(bt, Ct, ft));
            return S = null, Ft;
          }]; at < $; at++)
            if (I = s.relative[v[at].type])
              pt = [Zi(Ls(pt), I)];
            else {
              if (I = s.filter[v[at].type].apply(null, v[at].matches), I[H]) {
                for (D = ++at; D < $ && !s.relative[v[D].type]; D++)
                  ;
                return qs(
                  at > 1 && Ls(pt),
                  at > 1 && Ki(
                    // If the preceding token was a descendant combinator, insert an implicit any-element `*`
                    v.slice(0, at - 1).concat({ value: v[at - 2].type === " " ? "*" : "" })
                  ).replace(X, "$1"),
                  I,
                  at < D && Os(v.slice(at, D)),
                  D < $ && Os(v = v.slice(D)),
                  D < $ && Ki(v)
                );
              }
              pt.push(I);
            }
          return Ls(pt);
        }
        function Xl(v, S) {
          var I = S.length > 0, D = v.length > 0, $ = function(Z, J, at, tt, St) {
            var pt, bt, Ct, ft = 0, Ft = "0", Ne = Z && [], pe = [], $e = a, vn = Z || D && s.find.TAG("*", St), si = M += $e == null ? 1 : Math.random() || 0.1, xe = vn.length;
            for (St && (a = J == g || J || St); Ft !== xe && (pt = vn[Ft]) != null; Ft++) {
              if (D && pt) {
                for (bt = 0, !J && pt.ownerDocument != g && (Xn(pt), at = !w); Ct = v[bt++]; )
                  if (Ct(pt, J || g, at)) {
                    p.call(tt, pt);
                    break;
                  }
                St && (M = si);
              }
              I && ((pt = !Ct && pt) && ft--, Z && Ne.push(pt));
            }
            if (ft += Ft, I && Ft !== ft) {
              for (bt = 0; Ct = S[bt++]; )
                Ct(Ne, pe, J, at);
              if (Z) {
                if (ft > 0)
                  for (; Ft--; )
                    Ne[Ft] || pe[Ft] || (pe[Ft] = me.call(tt));
                pe = Xi(pe);
              }
              p.apply(tt, pe), St && !Z && pe.length > 0 && ft + S.length > 1 && c.uniqueSort(tt);
            }
            return St && (M = si, a = $e), Ne;
          };
          return I ? Ke($) : $;
        }
        function _s(v, S) {
          var I, D = [], $ = [], Z = Et[v + " "];
          if (!Z) {
            for (S || (S = Li(v)), I = S.length; I--; )
              Z = Os(S[I]), Z[H] ? D.push(Z) : $.push(Z);
            Z = Et(
              v,
              Xl($, D)
            ), Z.selector = v;
          }
          return Z;
        }
        function Ro(v, S, I, D) {
          var $, Z, J, at, tt, St = typeof v == "function" && v, pt = !D && Li(v = St.selector || v);
          if (I = I || [], pt.length === 1) {
            if (Z = pt[0] = pt[0].slice(0), Z.length > 2 && (J = Z[0]).type === "ID" && S.nodeType === 9 && w && s.relative[Z[1].type]) {
              if (S = (s.find.ID(
                J.matches[0].replace(In, Rn),
                S
              ) || [])[0], S)
                St && (S = S.parentNode);
              else return I;
              v = v.slice(Z.shift().value.length);
            }
            for ($ = bn.needsContext.test(v) ? 0 : Z.length; $-- && (J = Z[$], !s.relative[at = J.type]); )
              if ((tt = s.find[at]) && (D = tt(
                J.matches[0].replace(In, Rn),
                Ss.test(Z[0].type) && Cs(S.parentNode) || S
              ))) {
                if (Z.splice($, 1), v = D.length && Ki(Z), !v)
                  return p.apply(I, D), I;
                break;
              }
          }
          return (St || _s(v, pt))(
            D,
            S,
            !w,
            I,
            !S || Ss.test(v) && Cs(S.parentNode) || S
          ), I;
        }
        q.sortStable = H.split("").sort(te).join("") === H, Xn(), q.sortDetached = ii(function(v) {
          return v.compareDocumentPosition(g.createElement("fieldset")) & 1;
        }), c.find = Bt, c.expr[":"] = c.expr.pseudos, c.unique = c.uniqueSort, Bt.compile = _s, Bt.select = Ro, Bt.setDocument = Xn, Bt.tokenize = Li, Bt.escape = c.escapeSelector, Bt.getText = c.text, Bt.isXML = c.isXMLDoc, Bt.selectors = c.expr, Bt.support = c.support, Bt.uniqueSort = c.uniqueSort;
      })();
      var it = function(n, s, a) {
        for (var u = [], d = a !== void 0; (n = n[s]) && n.nodeType !== 9; )
          if (n.nodeType === 1) {
            if (d && c(n).is(a))
              break;
            u.push(n);
          }
        return u;
      }, Q = function(n, s) {
        for (var a = []; n; n = n.nextSibling)
          n.nodeType === 1 && n !== s && a.push(n);
        return a;
      }, vt = c.expr.match.needsContext, gt = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
      function Tt(n, s, a) {
        return k(s) ? c.grep(n, function(u, d) {
          return !!s.call(u, d, u) !== a;
        }) : s.nodeType ? c.grep(n, function(u) {
          return u === s !== a;
        }) : typeof s != "string" ? c.grep(n, function(u) {
          return b.call(s, u) > -1 !== a;
        }) : c.filter(s, n, a);
      }
      c.filter = function(n, s, a) {
        var u = s[0];
        return a && (n = ":not(" + n + ")"), s.length === 1 && u.nodeType === 1 ? c.find.matchesSelector(u, n) ? [u] : [] : c.find.matches(n, c.grep(s, function(d) {
          return d.nodeType === 1;
        }));
      }, c.fn.extend({
        find: function(n) {
          var s, a, u = this.length, d = this;
          if (typeof n != "string")
            return this.pushStack(c(n).filter(function() {
              for (s = 0; s < u; s++)
                if (c.contains(d[s], this))
                  return !0;
            }));
          for (a = this.pushStack([]), s = 0; s < u; s++)
            c.find(n, d[s], a);
          return u > 1 ? c.uniqueSort(a) : a;
        },
        filter: function(n) {
          return this.pushStack(Tt(this, n || [], !1));
        },
        not: function(n) {
          return this.pushStack(Tt(this, n || [], !0));
        },
        is: function(n) {
          return !!Tt(
            this,
            // If this is a positional/relative selector, check membership in the returned set
            // so $("p:first").is("p:last") won't return true for a doc with two "p".
            typeof n == "string" && vt.test(n) ? c(n) : n || [],
            !1
          ).length;
        }
      });
      var At, ct = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/, $t = c.fn.init = function(n, s, a) {
        var u, d;
        if (!n)
          return this;
        if (a = a || At, typeof n == "string")
          if (n[0] === "<" && n[n.length - 1] === ">" && n.length >= 3 ? u = [null, n, null] : u = ct.exec(n), u && (u[1] || !s))
            if (u[1]) {
              if (s = s instanceof c ? s[0] : s, c.merge(this, c.parseHTML(
                u[1],
                s && s.nodeType ? s.ownerDocument || s : j,
                !0
              )), gt.test(u[1]) && c.isPlainObject(s))
                for (u in s)
                  k(this[u]) ? this[u](s[u]) : this.attr(u, s[u]);
              return this;
            } else
              return d = j.getElementById(u[2]), d && (this[0] = d, this.length = 1), this;
          else return !s || s.jquery ? (s || a).find(n) : this.constructor(s).find(n);
        else {
          if (n.nodeType)
            return this[0] = n, this.length = 1, this;
          if (k(n))
            return a.ready !== void 0 ? a.ready(n) : (
              // Execute immediately if ready is not present
              n(c)
            );
        }
        return c.makeArray(n, this);
      };
      $t.prototype = c.fn, At = c(j);
      var Ht = /^(?:parents|prev(?:Until|All))/, xt = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
      };
      c.fn.extend({
        has: function(n) {
          var s = c(n, this), a = s.length;
          return this.filter(function() {
            for (var u = 0; u < a; u++)
              if (c.contains(this, s[u]))
                return !0;
          });
        },
        closest: function(n, s) {
          var a, u = 0, d = this.length, p = [], g = typeof n != "string" && c(n);
          if (!vt.test(n)) {
            for (; u < d; u++)
              for (a = this[u]; a && a !== s; a = a.parentNode)
                if (a.nodeType < 11 && (g ? g.index(a) > -1 : (
                  // Don't pass non-elements to jQuery#find
                  a.nodeType === 1 && c.find.matchesSelector(a, n)
                ))) {
                  p.push(a);
                  break;
                }
          }
          return this.pushStack(p.length > 1 ? c.uniqueSort(p) : p);
        },
        // Determine the position of an element within the set
        index: function(n) {
          return n ? typeof n == "string" ? b.call(c(n), this[0]) : b.call(
            this,
            // If it receives a jQuery object, the first element is used
            n.jquery ? n[0] : n
          ) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
        },
        add: function(n, s) {
          return this.pushStack(
            c.uniqueSort(
              c.merge(this.get(), c(n, s))
            )
          );
        },
        addBack: function(n) {
          return this.add(
            n == null ? this.prevObject : this.prevObject.filter(n)
          );
        }
      });
      function It(n, s) {
        for (; (n = n[s]) && n.nodeType !== 1; )
          ;
        return n;
      }
      c.each({
        parent: function(n) {
          var s = n.parentNode;
          return s && s.nodeType !== 11 ? s : null;
        },
        parents: function(n) {
          return it(n, "parentNode");
        },
        parentsUntil: function(n, s, a) {
          return it(n, "parentNode", a);
        },
        next: function(n) {
          return It(n, "nextSibling");
        },
        prev: function(n) {
          return It(n, "previousSibling");
        },
        nextAll: function(n) {
          return it(n, "nextSibling");
        },
        prevAll: function(n) {
          return it(n, "previousSibling");
        },
        nextUntil: function(n, s, a) {
          return it(n, "nextSibling", a);
        },
        prevUntil: function(n, s, a) {
          return it(n, "previousSibling", a);
        },
        siblings: function(n) {
          return Q((n.parentNode || {}).firstChild, n);
        },
        children: function(n) {
          return Q(n.firstChild);
        },
        contents: function(n) {
          return n.contentDocument != null && // Support: IE 11+
          // <object> elements with no `data` attribute has an object
          // `contentDocument` with a `null` prototype.
          o(n.contentDocument) ? n.contentDocument : (Nt(n, "template") && (n = n.content || n), c.merge([], n.childNodes));
        }
      }, function(n, s) {
        c.fn[n] = function(a, u) {
          var d = c.map(this, s, a);
          return n.slice(-5) !== "Until" && (u = a), u && typeof u == "string" && (d = c.filter(u, d)), this.length > 1 && (xt[n] || c.uniqueSort(d), Ht.test(n) && d.reverse()), this.pushStack(d);
        };
      });
      var wt = /[^\x20\t\r\n\f]+/g;
      function jt(n) {
        var s = {};
        return c.each(n.match(wt) || [], function(a, u) {
          s[u] = !0;
        }), s;
      }
      c.Callbacks = function(n) {
        n = typeof n == "string" ? jt(n) : c.extend({}, n);
        var s, a, u, d, p = [], g = [], T = -1, w = function() {
          for (d = d || n.once, u = s = !0; g.length; T = -1)
            for (a = g.shift(); ++T < p.length; )
              p[T].apply(a[0], a[1]) === !1 && n.stopOnFalse && (T = p.length, a = !1);
          n.memory || (a = !1), s = !1, d && (a ? p = [] : p = "");
        }, L = {
          // Add a callback or a collection of callbacks to the list
          add: function() {
            return p && (a && !s && (T = p.length - 1, g.push(a)), (function B(H) {
              c.each(H, function(M, W) {
                k(W) ? (!n.unique || !L.has(W)) && p.push(W) : W && W.length && dt(W) !== "string" && B(W);
              });
            })(arguments), a && !s && w()), this;
          },
          // Remove a callback from the list
          remove: function() {
            return c.each(arguments, function(B, H) {
              for (var M; (M = c.inArray(H, p, M)) > -1; )
                p.splice(M, 1), M <= T && T--;
            }), this;
          },
          // Check if a given callback is in the list.
          // If no argument is given, return whether or not list has callbacks attached.
          has: function(B) {
            return B ? c.inArray(B, p) > -1 : p.length > 0;
          },
          // Remove all callbacks from the list
          empty: function() {
            return p && (p = []), this;
          },
          // Disable .fire and .add
          // Abort any current/pending executions
          // Clear all callbacks and values
          disable: function() {
            return d = g = [], p = a = "", this;
          },
          disabled: function() {
            return !p;
          },
          // Disable .fire
          // Also disable .add unless we have memory (since it would have no effect)
          // Abort any pending executions
          lock: function() {
            return d = g = [], !a && !s && (p = a = ""), this;
          },
          locked: function() {
            return !!d;
          },
          // Call all callbacks with the given context and arguments
          fireWith: function(B, H) {
            return d || (H = H || [], H = [B, H.slice ? H.slice() : H], g.push(H), s || w()), this;
          },
          // Call all the callbacks with the given arguments
          fire: function() {
            return L.fireWith(this, arguments), this;
          },
          // To know if the callbacks have already been called at least once
          fired: function() {
            return !!u;
          }
        };
        return L;
      };
      function Lt(n) {
        return n;
      }
      function Rt(n) {
        throw n;
      }
      function Vt(n, s, a, u) {
        var d;
        try {
          n && k(d = n.promise) ? d.call(n).done(s).fail(a) : n && k(d = n.then) ? d.call(n, s, a) : s.apply(void 0, [n].slice(u));
        } catch (p) {
          a.apply(void 0, [p]);
        }
      }
      c.extend({
        Deferred: function(n) {
          var s = [
            // action, add listener, callbacks,
            // ... .then handlers, argument index, [final state]
            [
              "notify",
              "progress",
              c.Callbacks("memory"),
              c.Callbacks("memory"),
              2
            ],
            [
              "resolve",
              "done",
              c.Callbacks("once memory"),
              c.Callbacks("once memory"),
              0,
              "resolved"
            ],
            [
              "reject",
              "fail",
              c.Callbacks("once memory"),
              c.Callbacks("once memory"),
              1,
              "rejected"
            ]
          ], a = "pending", u = {
            state: function() {
              return a;
            },
            always: function() {
              return d.done(arguments).fail(arguments), this;
            },
            catch: function(p) {
              return u.then(null, p);
            },
            // Keep pipe for back-compat
            pipe: function() {
              var p = arguments;
              return c.Deferred(function(g) {
                c.each(s, function(T, w) {
                  var L = k(p[w[4]]) && p[w[4]];
                  d[w[1]](function() {
                    var B = L && L.apply(this, arguments);
                    B && k(B.promise) ? B.promise().progress(g.notify).done(g.resolve).fail(g.reject) : g[w[0] + "With"](
                      this,
                      L ? [B] : arguments
                    );
                  });
                }), p = null;
              }).promise();
            },
            then: function(p, g, T) {
              var w = 0;
              function L(B, H, M, W) {
                return function() {
                  var yt = this, kt = arguments, Et = function() {
                    var te, gn;
                    if (!(B < w)) {
                      if (te = M.apply(yt, kt), te === H.promise())
                        throw new TypeError("Thenable self-resolution");
                      gn = te && // Support: Promises/A+ section 2.3.4
                      // https://promisesaplus.com/#point-64
                      // Only check objects and functions for thenability
                      (typeof te == "object" || typeof te == "function") && te.then, k(gn) ? W ? gn.call(
                        te,
                        L(w, H, Lt, W),
                        L(w, H, Rt, W)
                      ) : (w++, gn.call(
                        te,
                        L(w, H, Lt, W),
                        L(w, H, Rt, W),
                        L(
                          w,
                          H,
                          Lt,
                          H.notifyWith
                        )
                      )) : (M !== Lt && (yt = void 0, kt = [te]), (W || H.resolveWith)(yt, kt));
                    }
                  }, ce = W ? Et : function() {
                    try {
                      Et();
                    } catch (te) {
                      c.Deferred.exceptionHook && c.Deferred.exceptionHook(
                        te,
                        ce.error
                      ), B + 1 >= w && (M !== Rt && (yt = void 0, kt = [te]), H.rejectWith(yt, kt));
                    }
                  };
                  B ? ce() : (c.Deferred.getErrorHook ? ce.error = c.Deferred.getErrorHook() : c.Deferred.getStackHook && (ce.error = c.Deferred.getStackHook()), t.setTimeout(ce));
                };
              }
              return c.Deferred(function(B) {
                s[0][3].add(
                  L(
                    0,
                    B,
                    k(T) ? T : Lt,
                    B.notifyWith
                  )
                ), s[1][3].add(
                  L(
                    0,
                    B,
                    k(p) ? p : Lt
                  )
                ), s[2][3].add(
                  L(
                    0,
                    B,
                    k(g) ? g : Rt
                  )
                );
              }).promise();
            },
            // Get a promise for this deferred
            // If obj is provided, the promise aspect is added to the object
            promise: function(p) {
              return p != null ? c.extend(p, u) : u;
            }
          }, d = {};
          return c.each(s, function(p, g) {
            var T = g[2], w = g[5];
            u[g[1]] = T.add, w && T.add(
              function() {
                a = w;
              },
              // rejected_callbacks.disable
              // fulfilled_callbacks.disable
              s[3 - p][2].disable,
              // rejected_handlers.disable
              // fulfilled_handlers.disable
              s[3 - p][3].disable,
              // progress_callbacks.lock
              s[0][2].lock,
              // progress_handlers.lock
              s[0][3].lock
            ), T.add(g[3].fire), d[g[0]] = function() {
              return d[g[0] + "With"](this === d ? void 0 : this, arguments), this;
            }, d[g[0] + "With"] = T.fireWith;
          }), u.promise(d), n && n.call(d, d), d;
        },
        // Deferred helper
        when: function(n) {
          var s = arguments.length, a = s, u = Array(a), d = l.call(arguments), p = c.Deferred(), g = function(T) {
            return function(w) {
              u[T] = this, d[T] = arguments.length > 1 ? l.call(arguments) : w, --s || p.resolveWith(u, d);
            };
          };
          if (s <= 1 && (Vt(
            n,
            p.done(g(a)).resolve,
            p.reject,
            !s
          ), p.state() === "pending" || k(d[a] && d[a].then)))
            return p.then();
          for (; a--; )
            Vt(d[a], g(a), p.reject);
          return p.promise();
        }
      });
      var ee = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
      c.Deferred.exceptionHook = function(n, s) {
        t.console && t.console.warn && n && ee.test(n.name) && t.console.warn(
          "jQuery.Deferred exception: " + n.message,
          n.stack,
          s
        );
      }, c.readyException = function(n) {
        t.setTimeout(function() {
          throw n;
        });
      };
      var An = c.Deferred();
      c.fn.ready = function(n) {
        return An.then(n).catch(function(s) {
          c.readyException(s);
        }), this;
      }, c.extend({
        // Is the DOM ready to be used? Set to true once it occurs.
        isReady: !1,
        // A counter to track how many items to wait for before
        // the ready event fires. See trac-6781
        readyWait: 1,
        // Handle when the DOM is ready
        ready: function(n) {
          (n === !0 ? --c.readyWait : c.isReady) || (c.isReady = !0, !(n !== !0 && --c.readyWait > 0) && An.resolveWith(j, [c]));
        }
      }), c.ready.then = An.then;
      function Nn() {
        j.removeEventListener("DOMContentLoaded", Nn), t.removeEventListener("load", Nn), c.ready();
      }
      j.readyState === "complete" || j.readyState !== "loading" && !j.documentElement.doScroll ? t.setTimeout(c.ready) : (j.addEventListener("DOMContentLoaded", Nn), t.addEventListener("load", Nn));
      var Se = function(n, s, a, u, d, p, g) {
        var T = 0, w = n.length, L = a == null;
        if (dt(a) === "object") {
          d = !0;
          for (T in a)
            Se(n, s, T, a[T], !0, p, g);
        } else if (u !== void 0 && (d = !0, k(u) || (g = !0), L && (g ? (s.call(n, u), s = null) : (L = s, s = function(B, H, M) {
          return L.call(c(B), M);
        })), s))
          for (; T < w; T++)
            s(
              n[T],
              a,
              g ? u : u.call(n[T], T, s(n[T], a))
            );
        return d ? n : L ? s.call(n) : w ? s(n[0], a) : p;
      }, bi = /^-ms-/, $n = /-([a-z])/g;
      function or(n, s) {
        return s.toUpperCase();
      }
      function ye(n) {
        return n.replace(bi, "ms-").replace($n, or);
      }
      var rn = function(n) {
        return n.nodeType === 1 || n.nodeType === 9 || !+n.nodeType;
      };
      function he() {
        this.expando = c.expando + he.uid++;
      }
      he.uid = 1, he.prototype = {
        cache: function(n) {
          var s = n[this.expando];
          return s || (s = {}, rn(n) && (n.nodeType ? n[this.expando] = s : Object.defineProperty(n, this.expando, {
            value: s,
            configurable: !0
          }))), s;
        },
        set: function(n, s, a) {
          var u, d = this.cache(n);
          if (typeof s == "string")
            d[ye(s)] = a;
          else
            for (u in s)
              d[ye(u)] = s[u];
          return d;
        },
        get: function(n, s) {
          return s === void 0 ? this.cache(n) : (
            // Always use camelCase key (gh-2257)
            n[this.expando] && n[this.expando][ye(s)]
          );
        },
        access: function(n, s, a) {
          return s === void 0 || s && typeof s == "string" && a === void 0 ? this.get(n, s) : (this.set(n, s, a), a !== void 0 ? a : s);
        },
        remove: function(n, s) {
          var a, u = n[this.expando];
          if (u !== void 0) {
            if (s !== void 0)
              for (Array.isArray(s) ? s = s.map(ye) : (s = ye(s), s = s in u ? [s] : s.match(wt) || []), a = s.length; a--; )
                delete u[s[a]];
            (s === void 0 || c.isEmptyObject(u)) && (n.nodeType ? n[this.expando] = void 0 : delete n[this.expando]);
          }
        },
        hasData: function(n) {
          var s = n[this.expando];
          return s !== void 0 && !c.isEmptyObject(s);
        }
      };
      var nt = new he(), ne = new he(), Sn = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, Hn = /[A-Z]/g;
      function ar(n) {
        return n === "true" ? !0 : n === "false" ? !1 : n === "null" ? null : n === +n + "" ? +n : Sn.test(n) ? JSON.parse(n) : n;
      }
      function be(n, s, a) {
        var u;
        if (a === void 0 && n.nodeType === 1)
          if (u = "data-" + s.replace(Hn, "-$&").toLowerCase(), a = n.getAttribute(u), typeof a == "string") {
            try {
              a = ar(a);
            } catch {
            }
            ne.set(n, s, a);
          } else
            a = void 0;
        return a;
      }
      c.extend({
        hasData: function(n) {
          return ne.hasData(n) || nt.hasData(n);
        },
        data: function(n, s, a) {
          return ne.access(n, s, a);
        },
        removeData: function(n, s) {
          ne.remove(n, s);
        },
        // TODO: Now that all calls to _data and _removeData have been replaced
        // with direct calls to dataPriv methods, these can be deprecated.
        _data: function(n, s, a) {
          return nt.access(n, s, a);
        },
        _removeData: function(n, s) {
          nt.remove(n, s);
        }
      }), c.fn.extend({
        data: function(n, s) {
          var a, u, d, p = this[0], g = p && p.attributes;
          if (n === void 0) {
            if (this.length && (d = ne.get(p), p.nodeType === 1 && !nt.get(p, "hasDataAttrs"))) {
              for (a = g.length; a--; )
                g[a] && (u = g[a].name, u.indexOf("data-") === 0 && (u = ye(u.slice(5)), be(p, u, d[u])));
              nt.set(p, "hasDataAttrs", !0);
            }
            return d;
          }
          return typeof n == "object" ? this.each(function() {
            ne.set(this, n);
          }) : Se(this, function(T) {
            var w;
            if (p && T === void 0)
              return w = ne.get(p, n), w !== void 0 || (w = be(p, n), w !== void 0) ? w : void 0;
            this.each(function() {
              ne.set(this, n, T);
            });
          }, null, s, arguments.length > 1, null, !0);
        },
        removeData: function(n) {
          return this.each(function() {
            ne.remove(this, n);
          });
        }
      }), c.extend({
        queue: function(n, s, a) {
          var u;
          if (n)
            return s = (s || "fx") + "queue", u = nt.get(n, s), a && (!u || Array.isArray(a) ? u = nt.access(n, s, c.makeArray(a)) : u.push(a)), u || [];
        },
        dequeue: function(n, s) {
          s = s || "fx";
          var a = c.queue(n, s), u = a.length, d = a.shift(), p = c._queueHooks(n, s), g = function() {
            c.dequeue(n, s);
          };
          d === "inprogress" && (d = a.shift(), u--), d && (s === "fx" && a.unshift("inprogress"), delete p.stop, d.call(n, g, p)), !u && p && p.empty.fire();
        },
        // Not public - generate a queueHooks object, or return the current one
        _queueHooks: function(n, s) {
          var a = s + "queueHooks";
          return nt.get(n, a) || nt.access(n, a, {
            empty: c.Callbacks("once memory").add(function() {
              nt.remove(n, [s + "queue", a]);
            })
          });
        }
      }), c.fn.extend({
        queue: function(n, s) {
          var a = 2;
          return typeof n != "string" && (s = n, n = "fx", a--), arguments.length < a ? c.queue(this[0], n) : s === void 0 ? this : this.each(function() {
            var u = c.queue(this, n, s);
            c._queueHooks(this, n), n === "fx" && u[0] !== "inprogress" && c.dequeue(this, n);
          });
        },
        dequeue: function(n) {
          return this.each(function() {
            c.dequeue(this, n);
          });
        },
        clearQueue: function(n) {
          return this.queue(n || "fx", []);
        },
        // Get a promise resolved when queues of a certain type
        // are emptied (fx is the type by default)
        promise: function(n, s) {
          var a, u = 1, d = c.Deferred(), p = this, g = this.length, T = function() {
            --u || d.resolveWith(p, [p]);
          };
          for (typeof n != "string" && (s = n, n = void 0), n = n || "fx"; g--; )
            a = nt.get(p[g], n + "queueHooks"), a && a.empty && (u++, a.empty.add(T));
          return T(), d.promise(s);
        }
      });
      var lr = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, sn = new RegExp("^(?:([+-])=|)(" + lr + ")([a-z%]*)$", "i"), Ce = ["Top", "Right", "Bottom", "Left"], Le = j.documentElement, qe = function(n) {
        return c.contains(n.ownerDocument, n);
      }, jr = { composed: !0 };
      Le.getRootNode && (qe = function(n) {
        return c.contains(n.ownerDocument, n) || n.getRootNode(jr) === n.ownerDocument;
      });
      var We = function(n, s) {
        return n = s || n, n.style.display === "none" || n.style.display === "" && // Otherwise, check computed style
        // Support: Firefox <=43 - 45
        // Disconnected elements can have computed display: none, so first confirm that elem is
        // in the document.
        qe(n) && c.css(n, "display") === "none";
      };
      function on(n, s, a, u) {
        var d, p, g = 20, T = u ? function() {
          return u.cur();
        } : function() {
          return c.css(n, s, "");
        }, w = T(), L = a && a[3] || (c.cssNumber[s] ? "" : "px"), B = n.nodeType && (c.cssNumber[s] || L !== "px" && +w) && sn.exec(c.css(n, s));
        if (B && B[3] !== L) {
          for (w = w / 2, L = L || B[3], B = +w || 1; g--; )
            c.style(n, s, B + L), (1 - p) * (1 - (p = T() / w || 0.5)) <= 0 && (g = 0), B = B / p;
          B = B * 2, c.style(n, s, B + L), a = a || [];
        }
        return a && (B = +B || +w || 0, d = a[1] ? B + (a[1] + 1) * a[2] : +a[2], u && (u.unit = L, u.start = B, u.end = d)), d;
      }
      var Ee = {};
      function Un(n) {
        var s, a = n.ownerDocument, u = n.nodeName, d = Ee[u];
        return d || (s = a.body.appendChild(a.createElement(u)), d = c.css(s, "display"), s.parentNode.removeChild(s), d === "none" && (d = "block"), Ee[u] = d, d);
      }
      function Me(n, s) {
        for (var a, u, d = [], p = 0, g = n.length; p < g; p++)
          u = n[p], u.style && (a = u.style.display, s ? (a === "none" && (d[p] = nt.get(u, "display") || null, d[p] || (u.style.display = "")), u.style.display === "" && We(u) && (d[p] = Un(u))) : a !== "none" && (d[p] = "none", nt.set(u, "display", a)));
        for (p = 0; p < g; p++)
          d[p] != null && (n[p].style.display = d[p]);
        return n;
      }
      c.fn.extend({
        show: function() {
          return Me(this, !0);
        },
        hide: function() {
          return Me(this);
        },
        toggle: function(n) {
          return typeof n == "boolean" ? n ? this.show() : this.hide() : this.each(function() {
            We(this) ? c(this).show() : c(this).hide();
          });
        }
      });
      var Oe = /^(?:checkbox|radio)$/i, Fn = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i, an = /^$|^module$|\/(?:java|ecma)script/i;
      (function() {
        var n = j.createDocumentFragment(), s = n.appendChild(j.createElement("div")), a = j.createElement("input");
        a.setAttribute("type", "radio"), a.setAttribute("checked", "checked"), a.setAttribute("name", "t"), s.appendChild(a), q.checkClone = s.cloneNode(!0).cloneNode(!0).lastChild.checked, s.innerHTML = "<textarea>x</textarea>", q.noCloneChecked = !!s.cloneNode(!0).lastChild.defaultValue, s.innerHTML = "<option></option>", q.option = !!s.lastChild;
      })();
      var re = {
        // XHTML parsers do not magically insert elements in the
        // same way that tag soup parsers do. So we cannot shorten
        // this by omitting <tbody> or other required elements.
        thead: [1, "<table>", "</table>"],
        col: [2, "<table><colgroup>", "</colgroup></table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: [0, "", ""]
      };
      re.tbody = re.tfoot = re.colgroup = re.caption = re.thead, re.th = re.td, q.option || (re.optgroup = re.option = [1, "<select multiple='multiple'>", "</select>"]);
      function Yt(n, s) {
        var a;
        return typeof n.getElementsByTagName < "u" ? a = n.getElementsByTagName(s || "*") : typeof n.querySelectorAll < "u" ? a = n.querySelectorAll(s || "*") : a = [], s === void 0 || s && Nt(n, s) ? c.merge([n], a) : a;
      }
      function Cn(n, s) {
        for (var a = 0, u = n.length; a < u; a++)
          nt.set(
            n[a],
            "globalEval",
            !s || nt.get(s[a], "globalEval")
          );
      }
      var ln = /<|&#?\w+;/;
      function ur(n, s, a, u, d) {
        for (var p, g, T, w, L, B, H = s.createDocumentFragment(), M = [], W = 0, yt = n.length; W < yt; W++)
          if (p = n[W], p || p === 0)
            if (dt(p) === "object")
              c.merge(M, p.nodeType ? [p] : p);
            else if (!ln.test(p))
              M.push(s.createTextNode(p));
            else {
              for (g = g || H.appendChild(s.createElement("div")), T = (Fn.exec(p) || ["", ""])[1].toLowerCase(), w = re[T] || re._default, g.innerHTML = w[1] + c.htmlPrefilter(p) + w[2], B = w[0]; B--; )
                g = g.lastChild;
              c.merge(M, g.childNodes), g = H.firstChild, g.textContent = "";
            }
        for (H.textContent = "", W = 0; p = M[W++]; ) {
          if (u && c.inArray(p, u) > -1) {
            d && d.push(p);
            continue;
          }
          if (L = qe(p), g = Yt(H.appendChild(p), "script"), L && Cn(g), a)
            for (B = 0; p = g[B++]; )
              an.test(p.type || "") && a.push(p);
        }
        return H;
      }
      var De = /^([^.]*)(?:\.(.+)|)/;
      function un() {
        return !0;
      }
      function cn() {
        return !1;
      }
      function cr(n, s, a, u, d, p) {
        var g, T;
        if (typeof s == "object") {
          typeof a != "string" && (u = u || a, a = void 0);
          for (T in s)
            cr(n, T, a, u, s[T], p);
          return n;
        }
        if (u == null && d == null ? (d = a, u = a = void 0) : d == null && (typeof a == "string" ? (d = u, u = void 0) : (d = u, u = a, a = void 0)), d === !1)
          d = cn;
        else if (!d)
          return n;
        return p === 1 && (g = d, d = function(w) {
          return c().off(w), g.apply(this, arguments);
        }, d.guid = g.guid || (g.guid = c.guid++)), n.each(function() {
          c.event.add(this, s, d, u, a);
        });
      }
      c.event = {
        global: {},
        add: function(n, s, a, u, d) {
          var p, g, T, w, L, B, H, M, W, yt, kt, Et = nt.get(n);
          if (rn(n))
            for (a.handler && (p = a, a = p.handler, d = p.selector), d && c.find.matchesSelector(Le, d), a.guid || (a.guid = c.guid++), (w = Et.events) || (w = Et.events = /* @__PURE__ */ Object.create(null)), (g = Et.handle) || (g = Et.handle = function(ce) {
              return typeof c < "u" && c.event.triggered !== ce.type ? c.event.dispatch.apply(n, arguments) : void 0;
            }), s = (s || "").match(wt) || [""], L = s.length; L--; )
              T = De.exec(s[L]) || [], W = kt = T[1], yt = (T[2] || "").split(".").sort(), W && (H = c.event.special[W] || {}, W = (d ? H.delegateType : H.bindType) || W, H = c.event.special[W] || {}, B = c.extend({
                type: W,
                origType: kt,
                data: u,
                handler: a,
                guid: a.guid,
                selector: d,
                needsContext: d && c.expr.match.needsContext.test(d),
                namespace: yt.join(".")
              }, p), (M = w[W]) || (M = w[W] = [], M.delegateCount = 0, (!H.setup || H.setup.call(n, u, yt, g) === !1) && n.addEventListener && n.addEventListener(W, g)), H.add && (H.add.call(n, B), B.handler.guid || (B.handler.guid = a.guid)), d ? M.splice(M.delegateCount++, 0, B) : M.push(B), c.event.global[W] = !0);
        },
        // Detach an event or set of events from an element
        remove: function(n, s, a, u, d) {
          var p, g, T, w, L, B, H, M, W, yt, kt, Et = nt.hasData(n) && nt.get(n);
          if (!(!Et || !(w = Et.events))) {
            for (s = (s || "").match(wt) || [""], L = s.length; L--; ) {
              if (T = De.exec(s[L]) || [], W = kt = T[1], yt = (T[2] || "").split(".").sort(), !W) {
                for (W in w)
                  c.event.remove(n, W + s[L], a, u, !0);
                continue;
              }
              for (H = c.event.special[W] || {}, W = (u ? H.delegateType : H.bindType) || W, M = w[W] || [], T = T[2] && new RegExp("(^|\\.)" + yt.join("\\.(?:.*\\.|)") + "(\\.|$)"), g = p = M.length; p--; )
                B = M[p], (d || kt === B.origType) && (!a || a.guid === B.guid) && (!T || T.test(B.namespace)) && (!u || u === B.selector || u === "**" && B.selector) && (M.splice(p, 1), B.selector && M.delegateCount--, H.remove && H.remove.call(n, B));
              g && !M.length && ((!H.teardown || H.teardown.call(n, yt, Et.handle) === !1) && c.removeEvent(n, W, Et.handle), delete w[W]);
            }
            c.isEmptyObject(w) && nt.remove(n, "handle events");
          }
        },
        dispatch: function(n) {
          var s, a, u, d, p, g, T = new Array(arguments.length), w = c.event.fix(n), L = (nt.get(this, "events") || /* @__PURE__ */ Object.create(null))[w.type] || [], B = c.event.special[w.type] || {};
          for (T[0] = w, s = 1; s < arguments.length; s++)
            T[s] = arguments[s];
          if (w.delegateTarget = this, !(B.preDispatch && B.preDispatch.call(this, w) === !1)) {
            for (g = c.event.handlers.call(this, w, L), s = 0; (d = g[s++]) && !w.isPropagationStopped(); )
              for (w.currentTarget = d.elem, a = 0; (p = d.handlers[a++]) && !w.isImmediatePropagationStopped(); )
                (!w.rnamespace || p.namespace === !1 || w.rnamespace.test(p.namespace)) && (w.handleObj = p, w.data = p.data, u = ((c.event.special[p.origType] || {}).handle || p.handler).apply(d.elem, T), u !== void 0 && (w.result = u) === !1 && (w.preventDefault(), w.stopPropagation()));
            return B.postDispatch && B.postDispatch.call(this, w), w.result;
          }
        },
        handlers: function(n, s) {
          var a, u, d, p, g, T = [], w = s.delegateCount, L = n.target;
          if (w && // Support: IE <=9
          // Black-hole SVG <use> instance trees (trac-13180)
          L.nodeType && // Support: Firefox <=42
          // Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
          // https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
          // Support: IE 11 only
          // ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
          !(n.type === "click" && n.button >= 1)) {
            for (; L !== this; L = L.parentNode || this)
              if (L.nodeType === 1 && !(n.type === "click" && L.disabled === !0)) {
                for (p = [], g = {}, a = 0; a < w; a++)
                  u = s[a], d = u.selector + " ", g[d] === void 0 && (g[d] = u.needsContext ? c(d, this).index(L) > -1 : c.find(d, this, null, [L]).length), g[d] && p.push(u);
                p.length && T.push({ elem: L, handlers: p });
              }
          }
          return L = this, w < s.length && T.push({ elem: L, handlers: s.slice(w) }), T;
        },
        addProp: function(n, s) {
          Object.defineProperty(c.Event.prototype, n, {
            enumerable: !0,
            configurable: !0,
            get: k(s) ? function() {
              if (this.originalEvent)
                return s(this.originalEvent);
            } : function() {
              if (this.originalEvent)
                return this.originalEvent[n];
            },
            set: function(a) {
              Object.defineProperty(this, n, {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: a
              });
            }
          });
        },
        fix: function(n) {
          return n[c.expando] ? n : new c.Event(n);
        },
        special: {
          load: {
            // Prevent triggered image.load events from bubbling to window.load
            noBubble: !0
          },
          click: {
            // Utilize native event to ensure correct state for checkable inputs
            setup: function(n) {
              var s = this || n;
              return Oe.test(s.type) && s.click && Nt(s, "input") && Ln(s, "click", !0), !1;
            },
            trigger: function(n) {
              var s = this || n;
              return Oe.test(s.type) && s.click && Nt(s, "input") && Ln(s, "click"), !0;
            },
            // For cross-browser consistency, suppress native .click() on links
            // Also prevent it if we're currently inside a leveraged native-event stack
            _default: function(n) {
              var s = n.target;
              return Oe.test(s.type) && s.click && Nt(s, "input") && nt.get(s, "click") || Nt(s, "a");
            }
          },
          beforeunload: {
            postDispatch: function(n) {
              n.result !== void 0 && n.originalEvent && (n.originalEvent.returnValue = n.result);
            }
          }
        }
      };
      function Ln(n, s, a) {
        if (!a) {
          nt.get(n, s) === void 0 && c.event.add(n, s, un);
          return;
        }
        nt.set(n, s, !1), c.event.add(n, s, {
          namespace: !1,
          handler: function(u) {
            var d, p = nt.get(this, s);
            if (u.isTrigger & 1 && this[s]) {
              if (p)
                (c.event.special[s] || {}).delegateType && u.stopPropagation();
              else if (p = l.call(arguments), nt.set(this, s, p), this[s](), d = nt.get(this, s), nt.set(this, s, !1), p !== d)
                return u.stopImmediatePropagation(), u.preventDefault(), d;
            } else p && (nt.set(this, s, c.event.trigger(
              p[0],
              p.slice(1),
              this
            )), u.stopPropagation(), u.isImmediatePropagationStopped = un);
          }
        });
      }
      c.removeEvent = function(n, s, a) {
        n.removeEventListener && n.removeEventListener(s, a);
      }, c.Event = function(n, s) {
        if (!(this instanceof c.Event))
          return new c.Event(n, s);
        n && n.type ? (this.originalEvent = n, this.type = n.type, this.isDefaultPrevented = n.defaultPrevented || n.defaultPrevented === void 0 && // Support: Android <=2.3 only
        n.returnValue === !1 ? un : cn, this.target = n.target && n.target.nodeType === 3 ? n.target.parentNode : n.target, this.currentTarget = n.currentTarget, this.relatedTarget = n.relatedTarget) : this.type = n, s && c.extend(this, s), this.timeStamp = n && n.timeStamp || Date.now(), this[c.expando] = !0;
      }, c.Event.prototype = {
        constructor: c.Event,
        isDefaultPrevented: cn,
        isPropagationStopped: cn,
        isImmediatePropagationStopped: cn,
        isSimulated: !1,
        preventDefault: function() {
          var n = this.originalEvent;
          this.isDefaultPrevented = un, n && !this.isSimulated && n.preventDefault();
        },
        stopPropagation: function() {
          var n = this.originalEvent;
          this.isPropagationStopped = un, n && !this.isSimulated && n.stopPropagation();
        },
        stopImmediatePropagation: function() {
          var n = this.originalEvent;
          this.isImmediatePropagationStopped = un, n && !this.isSimulated && n.stopImmediatePropagation(), this.stopPropagation();
        }
      }, c.each({
        altKey: !0,
        bubbles: !0,
        cancelable: !0,
        changedTouches: !0,
        ctrlKey: !0,
        detail: !0,
        eventPhase: !0,
        metaKey: !0,
        pageX: !0,
        pageY: !0,
        shiftKey: !0,
        view: !0,
        char: !0,
        code: !0,
        charCode: !0,
        key: !0,
        keyCode: !0,
        button: !0,
        buttons: !0,
        clientX: !0,
        clientY: !0,
        offsetX: !0,
        offsetY: !0,
        pointerId: !0,
        pointerType: !0,
        screenX: !0,
        screenY: !0,
        targetTouches: !0,
        toElement: !0,
        touches: !0,
        which: !0
      }, c.event.addProp), c.each({ focus: "focusin", blur: "focusout" }, function(n, s) {
        function a(u) {
          if (j.documentMode) {
            var d = nt.get(this, "handle"), p = c.event.fix(u);
            p.type = u.type === "focusin" ? "focus" : "blur", p.isSimulated = !0, d(u), p.target === p.currentTarget && d(p);
          } else
            c.event.simulate(
              s,
              u.target,
              c.event.fix(u)
            );
        }
        c.event.special[n] = {
          // Utilize native event if possible so blur/focus sequence is correct
          setup: function() {
            var u;
            if (Ln(this, n, !0), j.documentMode)
              u = nt.get(this, s), u || this.addEventListener(s, a), nt.set(this, s, (u || 0) + 1);
            else
              return !1;
          },
          trigger: function() {
            return Ln(this, n), !0;
          },
          teardown: function() {
            var u;
            if (j.documentMode)
              u = nt.get(this, s) - 1, u ? nt.set(this, s, u) : (this.removeEventListener(s, a), nt.remove(this, s));
            else
              return !1;
          },
          // Suppress native focus or blur if we're currently inside
          // a leveraged native-event stack
          _default: function(u) {
            return nt.get(u.target, n);
          },
          delegateType: s
        }, c.event.special[s] = {
          setup: function() {
            var u = this.ownerDocument || this.document || this, d = j.documentMode ? this : u, p = nt.get(d, s);
            p || (j.documentMode ? this.addEventListener(s, a) : u.addEventListener(n, a, !0)), nt.set(d, s, (p || 0) + 1);
          },
          teardown: function() {
            var u = this.ownerDocument || this.document || this, d = j.documentMode ? this : u, p = nt.get(d, s) - 1;
            p ? nt.set(d, s, p) : (j.documentMode ? this.removeEventListener(s, a) : u.removeEventListener(n, a, !0), nt.remove(d, s));
          }
        };
      }), c.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
      }, function(n, s) {
        c.event.special[n] = {
          delegateType: s,
          bindType: s,
          handle: function(a) {
            var u, d = this, p = a.relatedTarget, g = a.handleObj;
            return (!p || p !== d && !c.contains(d, p)) && (a.type = g.origType, u = g.handler.apply(this, arguments), a.type = s), u;
          }
        };
      }), c.fn.extend({
        on: function(n, s, a, u) {
          return cr(this, n, s, a, u);
        },
        one: function(n, s, a, u) {
          return cr(this, n, s, a, u, 1);
        },
        off: function(n, s, a) {
          var u, d;
          if (n && n.preventDefault && n.handleObj)
            return u = n.handleObj, c(n.delegateTarget).off(
              u.namespace ? u.origType + "." + u.namespace : u.origType,
              u.selector,
              u.handler
            ), this;
          if (typeof n == "object") {
            for (d in n)
              this.off(d, s, n[d]);
            return this;
          }
          return (s === !1 || typeof s == "function") && (a = s, s = void 0), a === !1 && (a = cn), this.each(function() {
            c.event.remove(this, n, a, s);
          });
        }
      });
      var fr = /<script|<style|<link/i, Jt = /checked\s*(?:[^=]|=\s*.checked.)/i, vi = /^\s*<!\[CDATA\[|\]\]>\s*$/g;
      function Br(n, s) {
        return Nt(n, "table") && Nt(s.nodeType !== 11 ? s : s.firstChild, "tr") && c(n).children("tbody")[0] || n;
      }
      function xi(n) {
        return n.type = (n.getAttribute("type") !== null) + "/" + n.type, n;
      }
      function wi(n) {
        return (n.type || "").slice(0, 5) === "true/" ? n.type = n.type.slice(5) : n.removeAttribute("type"), n;
      }
      function Pr(n, s) {
        var a, u, d, p, g, T, w;
        if (s.nodeType === 1) {
          if (nt.hasData(n) && (p = nt.get(n), w = p.events, w)) {
            nt.remove(s, "handle events");
            for (d in w)
              for (a = 0, u = w[d].length; a < u; a++)
                c.event.add(s, d, w[d][a]);
          }
          ne.hasData(n) && (g = ne.access(n), T = c.extend({}, g), ne.set(s, T));
        }
      }
      function ie(n, s) {
        var a = s.nodeName.toLowerCase();
        a === "input" && Oe.test(n.type) ? s.checked = n.checked : (a === "input" || a === "textarea") && (s.defaultValue = n.defaultValue);
      }
      function fn(n, s, a, u) {
        s = h(s);
        var d, p, g, T, w, L, B = 0, H = n.length, M = H - 1, W = s[0], yt = k(W);
        if (yt || H > 1 && typeof W == "string" && !q.checkClone && Jt.test(W))
          return n.each(function(kt) {
            var Et = n.eq(kt);
            yt && (s[0] = W.call(this, kt, Et.html())), fn(Et, s, a, u);
          });
        if (H && (d = ur(s, n[0].ownerDocument, !1, n, u), p = d.firstChild, d.childNodes.length === 1 && (d = p), p || u)) {
          for (g = c.map(Yt(d, "script"), xi), T = g.length; B < H; B++)
            w = d, B !== M && (w = c.clone(w, !0, !0), T && c.merge(g, Yt(w, "script"))), a.call(n[B], w, B);
          if (T)
            for (L = g[g.length - 1].ownerDocument, c.map(g, wi), B = 0; B < T; B++)
              w = g[B], an.test(w.type || "") && !nt.access(w, "globalEval") && c.contains(L, w) && (w.src && (w.type || "").toLowerCase() !== "module" ? c._evalUrl && !w.noModule && c._evalUrl(w.src, {
                nonce: w.nonce || w.getAttribute("nonce")
              }, L) : rt(w.textContent.replace(vi, ""), w, L));
        }
        return n;
      }
      function $r(n, s, a) {
        for (var u, d = s ? c.filter(s, n) : n, p = 0; (u = d[p]) != null; p++)
          !a && u.nodeType === 1 && c.cleanData(Yt(u)), u.parentNode && (a && qe(u) && Cn(Yt(u, "script")), u.parentNode.removeChild(u));
        return n;
      }
      c.extend({
        htmlPrefilter: function(n) {
          return n;
        },
        clone: function(n, s, a) {
          var u, d, p, g, T = n.cloneNode(!0), w = qe(n);
          if (!q.noCloneChecked && (n.nodeType === 1 || n.nodeType === 11) && !c.isXMLDoc(n))
            for (g = Yt(T), p = Yt(n), u = 0, d = p.length; u < d; u++)
              ie(p[u], g[u]);
          if (s)
            if (a)
              for (p = p || Yt(n), g = g || Yt(T), u = 0, d = p.length; u < d; u++)
                Pr(p[u], g[u]);
            else
              Pr(n, T);
          return g = Yt(T, "script"), g.length > 0 && Cn(g, !w && Yt(n, "script")), T;
        },
        cleanData: function(n) {
          for (var s, a, u, d = c.event.special, p = 0; (a = n[p]) !== void 0; p++)
            if (rn(a)) {
              if (s = a[nt.expando]) {
                if (s.events)
                  for (u in s.events)
                    d[u] ? c.event.remove(a, u) : c.removeEvent(a, u, s.handle);
                a[nt.expando] = void 0;
              }
              a[ne.expando] && (a[ne.expando] = void 0);
            }
        }
      }), c.fn.extend({
        detach: function(n) {
          return $r(this, n, !0);
        },
        remove: function(n) {
          return $r(this, n);
        },
        text: function(n) {
          return Se(this, function(s) {
            return s === void 0 ? c.text(this) : this.empty().each(function() {
              (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) && (this.textContent = s);
            });
          }, null, n, arguments.length);
        },
        append: function() {
          return fn(this, arguments, function(n) {
            if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
              var s = Br(this, n);
              s.appendChild(n);
            }
          });
        },
        prepend: function() {
          return fn(this, arguments, function(n) {
            if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
              var s = Br(this, n);
              s.insertBefore(n, s.firstChild);
            }
          });
        },
        before: function() {
          return fn(this, arguments, function(n) {
            this.parentNode && this.parentNode.insertBefore(n, this);
          });
        },
        after: function() {
          return fn(this, arguments, function(n) {
            this.parentNode && this.parentNode.insertBefore(n, this.nextSibling);
          });
        },
        empty: function() {
          for (var n, s = 0; (n = this[s]) != null; s++)
            n.nodeType === 1 && (c.cleanData(Yt(n, !1)), n.textContent = "");
          return this;
        },
        clone: function(n, s) {
          return n = n ?? !1, s = s ?? n, this.map(function() {
            return c.clone(this, n, s);
          });
        },
        html: function(n) {
          return Se(this, function(s) {
            var a = this[0] || {}, u = 0, d = this.length;
            if (s === void 0 && a.nodeType === 1)
              return a.innerHTML;
            if (typeof s == "string" && !fr.test(s) && !re[(Fn.exec(s) || ["", ""])[1].toLowerCase()]) {
              s = c.htmlPrefilter(s);
              try {
                for (; u < d; u++)
                  a = this[u] || {}, a.nodeType === 1 && (c.cleanData(Yt(a, !1)), a.innerHTML = s);
                a = 0;
              } catch {
              }
            }
            a && this.empty().append(s);
          }, null, n, arguments.length);
        },
        replaceWith: function() {
          var n = [];
          return fn(this, arguments, function(s) {
            var a = this.parentNode;
            c.inArray(this, n) < 0 && (c.cleanData(Yt(this)), a && a.replaceChild(s, this));
          }, n);
        }
      }), c.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
      }, function(n, s) {
        c.fn[n] = function(a) {
          for (var u, d = [], p = c(a), g = p.length - 1, T = 0; T <= g; T++)
            u = T === g ? this : this.clone(!0), c(p[T])[s](u), m.apply(d, u.get());
          return this.pushStack(d);
        };
      });
      var hr = new RegExp("^(" + lr + ")(?!px)[a-z%]+$", "i"), dr = /^--/, zn = function(n) {
        var s = n.ownerDocument.defaultView;
        return (!s || !s.opener) && (s = t), s.getComputedStyle(n);
      }, le = function(n, s, a) {
        var u, d, p = {};
        for (d in s)
          p[d] = n.style[d], n.style[d] = s[d];
        u = a.call(n);
        for (d in s)
          n.style[d] = p[d];
        return u;
      }, Ti = new RegExp(Ce.join("|"), "i");
      (function() {
        function n() {
          if (L) {
            w.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0", L.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%", Le.appendChild(w).appendChild(L);
            var B = t.getComputedStyle(L);
            a = B.top !== "1%", T = s(B.marginLeft) === 12, L.style.right = "60%", p = s(B.right) === 36, u = s(B.width) === 36, L.style.position = "absolute", d = s(L.offsetWidth / 3) === 12, Le.removeChild(w), L = null;
          }
        }
        function s(B) {
          return Math.round(parseFloat(B));
        }
        var a, u, d, p, g, T, w = j.createElement("div"), L = j.createElement("div");
        L.style && (L.style.backgroundClip = "content-box", L.cloneNode(!0).style.backgroundClip = "", q.clearCloneStyle = L.style.backgroundClip === "content-box", c.extend(q, {
          boxSizingReliable: function() {
            return n(), u;
          },
          pixelBoxStyles: function() {
            return n(), p;
          },
          pixelPosition: function() {
            return n(), a;
          },
          reliableMarginLeft: function() {
            return n(), T;
          },
          scrollboxSize: function() {
            return n(), d;
          },
          // Support: IE 9 - 11+, Edge 15 - 18+
          // IE/Edge misreport `getComputedStyle` of table rows with width/height
          // set in CSS while `offset*` properties report correct values.
          // Behavior in IE 9 is more subtle than in newer versions & it passes
          // some versions of this test; make sure not to make it pass there!
          //
          // Support: Firefox 70+
          // Only Firefox includes border widths
          // in computed dimensions. (gh-4529)
          reliableTrDimensions: function() {
            var B, H, M, W;
            return g == null && (B = j.createElement("table"), H = j.createElement("tr"), M = j.createElement("div"), B.style.cssText = "position:absolute;left:-11111px;border-collapse:separate", H.style.cssText = "box-sizing:content-box;border:1px solid", H.style.height = "1px", M.style.height = "9px", M.style.display = "block", Le.appendChild(B).appendChild(H).appendChild(M), W = t.getComputedStyle(H), g = parseInt(W.height, 10) + parseInt(W.borderTopWidth, 10) + parseInt(W.borderBottomWidth, 10) === H.offsetHeight, Le.removeChild(B)), g;
          }
        }));
      })();
      function qn(n, s, a) {
        var u, d, p, g, T = dr.test(s), w = n.style;
        return a = a || zn(n), a && (g = a.getPropertyValue(s) || a[s], T && g && (g = g.replace(X, "$1") || void 0), g === "" && !qe(n) && (g = c.style(n, s)), !q.pixelBoxStyles() && hr.test(g) && Ti.test(s) && (u = w.width, d = w.minWidth, p = w.maxWidth, w.minWidth = w.maxWidth = w.width = g, g = a.width, w.width = u, w.minWidth = d, w.maxWidth = p)), g !== void 0 ? (
          // Support: IE <=9 - 11 only
          // IE returns zIndex value as an integer.
          g + ""
        ) : g;
      }
      function Hr(n, s) {
        return {
          get: function() {
            if (n()) {
              delete this.get;
              return;
            }
            return (this.get = s).apply(this, arguments);
          }
        };
      }
      var Ur = ["Webkit", "Moz", "ms"], Fr = j.createElement("div").style, On = {};
      function zr(n) {
        for (var s = n[0].toUpperCase() + n.slice(1), a = Ur.length; a--; )
          if (n = Ur[a] + s, n in Fr)
            return n;
      }
      function hn(n) {
        var s = c.cssProps[n] || On[n];
        return s || (n in Fr ? n : On[n] = zr(n) || n);
      }
      var je = /^(none|table(?!-c[ea]).+)/, pr = { position: "absolute", visibility: "hidden", display: "block" }, Wr = {
        letterSpacing: "0",
        fontWeight: "400"
      };
      function Vr(n, s, a) {
        var u = sn.exec(s);
        return u ? (
          // Guard against undefined "subtract", e.g., when used as in cssHooks
          Math.max(0, u[2] - (a || 0)) + (u[3] || "px")
        ) : s;
      }
      function gr(n, s, a, u, d, p) {
        var g = s === "width" ? 1 : 0, T = 0, w = 0, L = 0;
        if (a === (u ? "border" : "content"))
          return 0;
        for (; g < 4; g += 2)
          a === "margin" && (L += c.css(n, a + Ce[g], !0, d)), u ? (a === "content" && (w -= c.css(n, "padding" + Ce[g], !0, d)), a !== "margin" && (w -= c.css(n, "border" + Ce[g] + "Width", !0, d))) : (w += c.css(n, "padding" + Ce[g], !0, d), a !== "padding" ? w += c.css(n, "border" + Ce[g] + "Width", !0, d) : T += c.css(n, "border" + Ce[g] + "Width", !0, d));
        return !u && p >= 0 && (w += Math.max(0, Math.ceil(
          n["offset" + s[0].toUpperCase() + s.slice(1)] - p - w - T - 0.5
          // If offsetWidth/offsetHeight is unknown, then we can't determine content-box scroll gutter
          // Use an explicit zero to avoid NaN (gh-3964)
        )) || 0), w + L;
      }
      function Gr(n, s, a) {
        var u = zn(n), d = !q.boxSizingReliable() || a, p = d && c.css(n, "boxSizing", !1, u) === "border-box", g = p, T = qn(n, s, u), w = "offset" + s[0].toUpperCase() + s.slice(1);
        if (hr.test(T)) {
          if (!a)
            return T;
          T = "auto";
        }
        return (!q.boxSizingReliable() && p || // Support: IE 10 - 11+, Edge 15 - 18+
        // IE/Edge misreport `getComputedStyle` of table rows with width/height
        // set in CSS while `offset*` properties report correct values.
        // Interestingly, in some cases IE 9 doesn't suffer from this issue.
        !q.reliableTrDimensions() && Nt(n, "tr") || // Fall back to offsetWidth/offsetHeight when value is "auto"
        // This happens for inline elements with no explicit setting (gh-3571)
        T === "auto" || // Support: Android <=4.1 - 4.3 only
        // Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
        !parseFloat(T) && c.css(n, "display", !1, u) === "inline") && // Make sure the element is visible & connected
        n.getClientRects().length && (p = c.css(n, "boxSizing", !1, u) === "border-box", g = w in n, g && (T = n[w])), T = parseFloat(T) || 0, T + gr(
          n,
          s,
          a || (p ? "border" : "content"),
          g,
          u,
          // Provide the current computed size to request scroll gutter calculation (gh-3589)
          T
        ) + "px";
      }
      c.extend({
        // Add in style property hooks for overriding the default
        // behavior of getting and setting a style property
        cssHooks: {
          opacity: {
            get: function(n, s) {
              if (s) {
                var a = qn(n, "opacity");
                return a === "" ? "1" : a;
              }
            }
          }
        },
        // Don't automatically add "px" to these possibly-unitless properties
        cssNumber: {
          animationIterationCount: !0,
          aspectRatio: !0,
          borderImageSlice: !0,
          columnCount: !0,
          flexGrow: !0,
          flexShrink: !0,
          fontWeight: !0,
          gridArea: !0,
          gridColumn: !0,
          gridColumnEnd: !0,
          gridColumnStart: !0,
          gridRow: !0,
          gridRowEnd: !0,
          gridRowStart: !0,
          lineHeight: !0,
          opacity: !0,
          order: !0,
          orphans: !0,
          scale: !0,
          widows: !0,
          zIndex: !0,
          zoom: !0,
          // SVG-related
          fillOpacity: !0,
          floodOpacity: !0,
          stopOpacity: !0,
          strokeMiterlimit: !0,
          strokeOpacity: !0
        },
        // Add in properties whose names you wish to fix before
        // setting or getting the value
        cssProps: {},
        // Get and set the style property on a DOM Node
        style: function(n, s, a, u) {
          if (!(!n || n.nodeType === 3 || n.nodeType === 8 || !n.style)) {
            var d, p, g, T = ye(s), w = dr.test(s), L = n.style;
            if (w || (s = hn(T)), g = c.cssHooks[s] || c.cssHooks[T], a !== void 0) {
              if (p = typeof a, p === "string" && (d = sn.exec(a)) && d[1] && (a = on(n, s, d), p = "number"), a == null || a !== a)
                return;
              p === "number" && !w && (a += d && d[3] || (c.cssNumber[T] ? "" : "px")), !q.clearCloneStyle && a === "" && s.indexOf("background") === 0 && (L[s] = "inherit"), (!g || !("set" in g) || (a = g.set(n, a, u)) !== void 0) && (w ? L.setProperty(s, a) : L[s] = a);
            } else
              return g && "get" in g && (d = g.get(n, !1, u)) !== void 0 ? d : L[s];
          }
        },
        css: function(n, s, a, u) {
          var d, p, g, T = ye(s), w = dr.test(s);
          return w || (s = hn(T)), g = c.cssHooks[s] || c.cssHooks[T], g && "get" in g && (d = g.get(n, !0, a)), d === void 0 && (d = qn(n, s, u)), d === "normal" && s in Wr && (d = Wr[s]), a === "" || a ? (p = parseFloat(d), a === !0 || isFinite(p) ? p || 0 : d) : d;
        }
      }), c.each(["height", "width"], function(n, s) {
        c.cssHooks[s] = {
          get: function(a, u, d) {
            if (u)
              return je.test(c.css(a, "display")) && // Support: Safari 8+
              // Table columns in Safari have non-zero offsetWidth & zero
              // getBoundingClientRect().width unless display is changed.
              // Support: IE <=11 only
              // Running getBoundingClientRect on a disconnected node
              // in IE throws an error.
              (!a.getClientRects().length || !a.getBoundingClientRect().width) ? le(a, pr, function() {
                return Gr(a, s, d);
              }) : Gr(a, s, d);
          },
          set: function(a, u, d) {
            var p, g = zn(a), T = !q.scrollboxSize() && g.position === "absolute", w = T || d, L = w && c.css(a, "boxSizing", !1, g) === "border-box", B = d ? gr(
              a,
              s,
              d,
              L,
              g
            ) : 0;
            return L && T && (B -= Math.ceil(
              a["offset" + s[0].toUpperCase() + s.slice(1)] - parseFloat(g[s]) - gr(a, s, "border", !1, g) - 0.5
            )), B && (p = sn.exec(u)) && (p[3] || "px") !== "px" && (a.style[s] = u, u = c.css(a, s)), Vr(a, u, B);
          }
        };
      }), c.cssHooks.marginLeft = Hr(
        q.reliableMarginLeft,
        function(n, s) {
          if (s)
            return (parseFloat(qn(n, "marginLeft")) || n.getBoundingClientRect().left - le(n, { marginLeft: 0 }, function() {
              return n.getBoundingClientRect().left;
            })) + "px";
        }
      ), c.each({
        margin: "",
        padding: "",
        border: "Width"
      }, function(n, s) {
        c.cssHooks[n + s] = {
          expand: function(a) {
            for (var u = 0, d = {}, p = typeof a == "string" ? a.split(" ") : [a]; u < 4; u++)
              d[n + Ce[u] + s] = p[u] || p[u - 2] || p[0];
            return d;
          }
        }, n !== "margin" && (c.cssHooks[n + s].set = Vr);
      }), c.fn.extend({
        css: function(n, s) {
          return Se(this, function(a, u, d) {
            var p, g, T = {}, w = 0;
            if (Array.isArray(u)) {
              for (p = zn(a), g = u.length; w < g; w++)
                T[u[w]] = c.css(a, u[w], !1, p);
              return T;
            }
            return d !== void 0 ? c.style(a, u, d) : c.css(a, u);
          }, n, s, arguments.length > 1);
        }
      });
      function se(n, s, a, u, d) {
        return new se.prototype.init(n, s, a, u, d);
      }
      c.Tween = se, se.prototype = {
        constructor: se,
        init: function(n, s, a, u, d, p) {
          this.elem = n, this.prop = a, this.easing = d || c.easing._default, this.options = s, this.start = this.now = this.cur(), this.end = u, this.unit = p || (c.cssNumber[a] ? "" : "px");
        },
        cur: function() {
          var n = se.propHooks[this.prop];
          return n && n.get ? n.get(this) : se.propHooks._default.get(this);
        },
        run: function(n) {
          var s, a = se.propHooks[this.prop];
          return this.options.duration ? this.pos = s = c.easing[this.easing](
            n,
            this.options.duration * n,
            0,
            1,
            this.options.duration
          ) : this.pos = s = n, this.now = (this.end - this.start) * s + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), a && a.set ? a.set(this) : se.propHooks._default.set(this), this;
        }
      }, se.prototype.init.prototype = se.prototype, se.propHooks = {
        _default: {
          get: function(n) {
            var s;
            return n.elem.nodeType !== 1 || n.elem[n.prop] != null && n.elem.style[n.prop] == null ? n.elem[n.prop] : (s = c.css(n.elem, n.prop, ""), !s || s === "auto" ? 0 : s);
          },
          set: function(n) {
            c.fx.step[n.prop] ? c.fx.step[n.prop](n) : n.elem.nodeType === 1 && (c.cssHooks[n.prop] || n.elem.style[hn(n.prop)] != null) ? c.style(n.elem, n.prop, n.now + n.unit) : n.elem[n.prop] = n.now;
          }
        }
      }, se.propHooks.scrollTop = se.propHooks.scrollLeft = {
        set: function(n) {
          n.elem.nodeType && n.elem.parentNode && (n.elem[n.prop] = n.now);
        }
      }, c.easing = {
        linear: function(n) {
          return n;
        },
        swing: function(n) {
          return 0.5 - Math.cos(n * Math.PI) / 2;
        },
        _default: "swing"
      }, c.fx = se.prototype.init, c.fx.step = {};
      var _e, dn, _n = /^(?:toggle|show|hide)$/, Kr = /queueHooks$/;
      function Wn() {
        dn && (j.hidden === !1 && t.requestAnimationFrame ? t.requestAnimationFrame(Wn) : t.setTimeout(Wn, c.fx.interval), c.fx.tick());
      }
      function Zr() {
        return t.setTimeout(function() {
          _e = void 0;
        }), _e = Date.now();
      }
      function Vn(n, s) {
        var a, u = 0, d = { height: n };
        for (s = s ? 1 : 0; u < 4; u += 2 - s)
          a = Ce[u], d["margin" + a] = d["padding" + a] = n;
        return s && (d.opacity = d.width = n), d;
      }
      function Xr(n, s, a) {
        for (var u, d = (ve.tweeners[s] || []).concat(ve.tweeners["*"]), p = 0, g = d.length; p < g; p++)
          if (u = d[p].call(a, s, n))
            return u;
      }
      function Ei(n, s, a) {
        var u, d, p, g, T, w, L, B, H = "width" in s || "height" in s, M = this, W = {}, yt = n.style, kt = n.nodeType && We(n), Et = nt.get(n, "fxshow");
        a.queue || (g = c._queueHooks(n, "fx"), g.unqueued == null && (g.unqueued = 0, T = g.empty.fire, g.empty.fire = function() {
          g.unqueued || T();
        }), g.unqueued++, M.always(function() {
          M.always(function() {
            g.unqueued--, c.queue(n, "fx").length || g.empty.fire();
          });
        }));
        for (u in s)
          if (d = s[u], _n.test(d)) {
            if (delete s[u], p = p || d === "toggle", d === (kt ? "hide" : "show"))
              if (d === "show" && Et && Et[u] !== void 0)
                kt = !0;
              else
                continue;
            W[u] = Et && Et[u] || c.style(n, u);
          }
        if (w = !c.isEmptyObject(s), !(!w && c.isEmptyObject(W))) {
          H && n.nodeType === 1 && (a.overflow = [yt.overflow, yt.overflowX, yt.overflowY], L = Et && Et.display, L == null && (L = nt.get(n, "display")), B = c.css(n, "display"), B === "none" && (L ? B = L : (Me([n], !0), L = n.style.display || L, B = c.css(n, "display"), Me([n]))), (B === "inline" || B === "inline-block" && L != null) && c.css(n, "float") === "none" && (w || (M.done(function() {
            yt.display = L;
          }), L == null && (B = yt.display, L = B === "none" ? "" : B)), yt.display = "inline-block")), a.overflow && (yt.overflow = "hidden", M.always(function() {
            yt.overflow = a.overflow[0], yt.overflowX = a.overflow[1], yt.overflowY = a.overflow[2];
          })), w = !1;
          for (u in W)
            w || (Et ? "hidden" in Et && (kt = Et.hidden) : Et = nt.access(n, "fxshow", { display: L }), p && (Et.hidden = !kt), kt && Me([n], !0), M.done(function() {
              kt || Me([n]), nt.remove(n, "fxshow");
              for (u in W)
                c.style(n, u, W[u]);
            })), w = Xr(kt ? Et[u] : 0, u, M), u in Et || (Et[u] = w.start, kt && (w.end = w.start, w.start = 0));
        }
      }
      function mr(n, s) {
        var a, u, d, p, g;
        for (a in n)
          if (u = ye(a), d = s[u], p = n[a], Array.isArray(p) && (d = p[1], p = n[a] = p[0]), a !== u && (n[u] = p, delete n[a]), g = c.cssHooks[u], g && "expand" in g) {
            p = g.expand(p), delete n[u];
            for (a in p)
              a in n || (n[a] = p[a], s[a] = d);
          } else
            s[u] = d;
      }
      function ve(n, s, a) {
        var u, d, p = 0, g = ve.prefilters.length, T = c.Deferred().always(function() {
          delete w.elem;
        }), w = function() {
          if (d)
            return !1;
          for (var H = _e || Zr(), M = Math.max(0, L.startTime + L.duration - H), W = M / L.duration || 0, yt = 1 - W, kt = 0, Et = L.tweens.length; kt < Et; kt++)
            L.tweens[kt].run(yt);
          return T.notifyWith(n, [L, yt, M]), yt < 1 && Et ? M : (Et || T.notifyWith(n, [L, 1, 0]), T.resolveWith(n, [L]), !1);
        }, L = T.promise({
          elem: n,
          props: c.extend({}, s),
          opts: c.extend(!0, {
            specialEasing: {},
            easing: c.easing._default
          }, a),
          originalProperties: s,
          originalOptions: a,
          startTime: _e || Zr(),
          duration: a.duration,
          tweens: [],
          createTween: function(H, M) {
            var W = c.Tween(
              n,
              L.opts,
              H,
              M,
              L.opts.specialEasing[H] || L.opts.easing
            );
            return L.tweens.push(W), W;
          },
          stop: function(H) {
            var M = 0, W = H ? L.tweens.length : 0;
            if (d)
              return this;
            for (d = !0; M < W; M++)
              L.tweens[M].run(1);
            return H ? (T.notifyWith(n, [L, 1, 0]), T.resolveWith(n, [L, H])) : T.rejectWith(n, [L, H]), this;
          }
        }), B = L.props;
        for (mr(B, L.opts.specialEasing); p < g; p++)
          if (u = ve.prefilters[p].call(L, n, B, L.opts), u)
            return k(u.stop) && (c._queueHooks(L.elem, L.opts.queue).stop = u.stop.bind(u)), u;
        return c.map(B, Xr, L), k(L.opts.start) && L.opts.start.call(n, L), L.progress(L.opts.progress).done(L.opts.done, L.opts.complete).fail(L.opts.fail).always(L.opts.always), c.fx.timer(
          c.extend(w, {
            elem: n,
            anim: L,
            queue: L.opts.queue
          })
        ), L;
      }
      c.Animation = c.extend(ve, {
        tweeners: {
          "*": [function(n, s) {
            var a = this.createTween(n, s);
            return on(a.elem, n, sn.exec(s), a), a;
          }]
        },
        tweener: function(n, s) {
          k(n) ? (s = n, n = ["*"]) : n = n.match(wt);
          for (var a, u = 0, d = n.length; u < d; u++)
            a = n[u], ve.tweeners[a] = ve.tweeners[a] || [], ve.tweeners[a].unshift(s);
        },
        prefilters: [Ei],
        prefilter: function(n, s) {
          s ? ve.prefilters.unshift(n) : ve.prefilters.push(n);
        }
      }), c.speed = function(n, s, a) {
        var u = n && typeof n == "object" ? c.extend({}, n) : {
          complete: a || !a && s || k(n) && n,
          duration: n,
          easing: a && s || s && !k(s) && s
        };
        return c.fx.off ? u.duration = 0 : typeof u.duration != "number" && (u.duration in c.fx.speeds ? u.duration = c.fx.speeds[u.duration] : u.duration = c.fx.speeds._default), (u.queue == null || u.queue === !0) && (u.queue = "fx"), u.old = u.complete, u.complete = function() {
          k(u.old) && u.old.call(this), u.queue && c.dequeue(this, u.queue);
        }, u;
      }, c.fn.extend({
        fadeTo: function(n, s, a, u) {
          return this.filter(We).css("opacity", 0).show().end().animate({ opacity: s }, n, a, u);
        },
        animate: function(n, s, a, u) {
          var d = c.isEmptyObject(n), p = c.speed(s, a, u), g = function() {
            var T = ve(this, c.extend({}, n), p);
            (d || nt.get(this, "finish")) && T.stop(!0);
          };
          return g.finish = g, d || p.queue === !1 ? this.each(g) : this.queue(p.queue, g);
        },
        stop: function(n, s, a) {
          var u = function(d) {
            var p = d.stop;
            delete d.stop, p(a);
          };
          return typeof n != "string" && (a = s, s = n, n = void 0), s && this.queue(n || "fx", []), this.each(function() {
            var d = !0, p = n != null && n + "queueHooks", g = c.timers, T = nt.get(this);
            if (p)
              T[p] && T[p].stop && u(T[p]);
            else
              for (p in T)
                T[p] && T[p].stop && Kr.test(p) && u(T[p]);
            for (p = g.length; p--; )
              g[p].elem === this && (n == null || g[p].queue === n) && (g[p].anim.stop(a), d = !1, g.splice(p, 1));
            (d || !a) && c.dequeue(this, n);
          });
        },
        finish: function(n) {
          return n !== !1 && (n = n || "fx"), this.each(function() {
            var s, a = nt.get(this), u = a[n + "queue"], d = a[n + "queueHooks"], p = c.timers, g = u ? u.length : 0;
            for (a.finish = !0, c.queue(this, n, []), d && d.stop && d.stop.call(this, !0), s = p.length; s--; )
              p[s].elem === this && p[s].queue === n && (p[s].anim.stop(!0), p.splice(s, 1));
            for (s = 0; s < g; s++)
              u[s] && u[s].finish && u[s].finish.call(this);
            delete a.finish;
          });
        }
      }), c.each(["toggle", "show", "hide"], function(n, s) {
        var a = c.fn[s];
        c.fn[s] = function(u, d, p) {
          return u == null || typeof u == "boolean" ? a.apply(this, arguments) : this.animate(Vn(s, !0), u, d, p);
        };
      }), c.each({
        slideDown: Vn("show"),
        slideUp: Vn("hide"),
        slideToggle: Vn("toggle"),
        fadeIn: { opacity: "show" },
        fadeOut: { opacity: "hide" },
        fadeToggle: { opacity: "toggle" }
      }, function(n, s) {
        c.fn[n] = function(a, u, d) {
          return this.animate(s, a, u, d);
        };
      }), c.timers = [], c.fx.tick = function() {
        var n, s = 0, a = c.timers;
        for (_e = Date.now(); s < a.length; s++)
          n = a[s], !n() && a[s] === n && a.splice(s--, 1);
        a.length || c.fx.stop(), _e = void 0;
      }, c.fx.timer = function(n) {
        c.timers.push(n), c.fx.start();
      }, c.fx.interval = 13, c.fx.start = function() {
        dn || (dn = !0, Wn());
      }, c.fx.stop = function() {
        dn = null;
      }, c.fx.speeds = {
        slow: 600,
        fast: 200,
        // Default speed
        _default: 400
      }, c.fn.delay = function(n, s) {
        return n = c.fx && c.fx.speeds[n] || n, s = s || "fx", this.queue(s, function(a, u) {
          var d = t.setTimeout(a, n);
          u.stop = function() {
            t.clearTimeout(d);
          };
        });
      }, (function() {
        var n = j.createElement("input"), s = j.createElement("select"), a = s.appendChild(j.createElement("option"));
        n.type = "checkbox", q.checkOn = n.value !== "", q.optSelected = a.selected, n = j.createElement("input"), n.value = "t", n.type = "radio", q.radioValue = n.value === "t";
      })();
      var Yr, ke = c.expr.attrHandle;
      c.fn.extend({
        attr: function(n, s) {
          return Se(this, c.attr, n, s, arguments.length > 1);
        },
        removeAttr: function(n) {
          return this.each(function() {
            c.removeAttr(this, n);
          });
        }
      }), c.extend({
        attr: function(n, s, a) {
          var u, d, p = n.nodeType;
          if (!(p === 3 || p === 8 || p === 2)) {
            if (typeof n.getAttribute > "u")
              return c.prop(n, s, a);
            if ((p !== 1 || !c.isXMLDoc(n)) && (d = c.attrHooks[s.toLowerCase()] || (c.expr.match.bool.test(s) ? Yr : void 0)), a !== void 0) {
              if (a === null) {
                c.removeAttr(n, s);
                return;
              }
              return d && "set" in d && (u = d.set(n, a, s)) !== void 0 ? u : (n.setAttribute(s, a + ""), a);
            }
            return d && "get" in d && (u = d.get(n, s)) !== null ? u : (u = c.find.attr(n, s), u ?? void 0);
          }
        },
        attrHooks: {
          type: {
            set: function(n, s) {
              if (!q.radioValue && s === "radio" && Nt(n, "input")) {
                var a = n.value;
                return n.setAttribute("type", s), a && (n.value = a), s;
              }
            }
          }
        },
        removeAttr: function(n, s) {
          var a, u = 0, d = s && s.match(wt);
          if (d && n.nodeType === 1)
            for (; a = d[u++]; )
              n.removeAttribute(a);
        }
      }), Yr = {
        set: function(n, s, a) {
          return s === !1 ? c.removeAttr(n, a) : n.setAttribute(a, a), a;
        }
      }, c.each(c.expr.match.bool.source.match(/\w+/g), function(n, s) {
        var a = ke[s] || c.find.attr;
        ke[s] = function(u, d, p) {
          var g, T, w = d.toLowerCase();
          return p || (T = ke[w], ke[w] = g, g = a(u, d, p) != null ? w : null, ke[w] = T), g;
        };
      });
      var Ie = /^(?:input|select|textarea|button)$/i, Ve = /^(?:a|area)$/i;
      c.fn.extend({
        prop: function(n, s) {
          return Se(this, c.prop, n, s, arguments.length > 1);
        },
        removeProp: function(n) {
          return this.each(function() {
            delete this[c.propFix[n] || n];
          });
        }
      }), c.extend({
        prop: function(n, s, a) {
          var u, d, p = n.nodeType;
          if (!(p === 3 || p === 8 || p === 2))
            return (p !== 1 || !c.isXMLDoc(n)) && (s = c.propFix[s] || s, d = c.propHooks[s]), a !== void 0 ? d && "set" in d && (u = d.set(n, a, s)) !== void 0 ? u : n[s] = a : d && "get" in d && (u = d.get(n, s)) !== null ? u : n[s];
        },
        propHooks: {
          tabIndex: {
            get: function(n) {
              var s = c.find.attr(n, "tabindex");
              return s ? parseInt(s, 10) : Ie.test(n.nodeName) || Ve.test(n.nodeName) && n.href ? 0 : -1;
            }
          }
        },
        propFix: {
          for: "htmlFor",
          class: "className"
        }
      }), q.optSelected || (c.propHooks.selected = {
        get: function(n) {
          var s = n.parentNode;
          return s && s.parentNode && s.parentNode.selectedIndex, null;
        },
        set: function(n) {
          var s = n.parentNode;
          s && (s.selectedIndex, s.parentNode && s.parentNode.selectedIndex);
        }
      }), c.each([
        "tabIndex",
        "readOnly",
        "maxLength",
        "cellSpacing",
        "cellPadding",
        "rowSpan",
        "colSpan",
        "useMap",
        "frameBorder",
        "contentEditable"
      ], function() {
        c.propFix[this.toLowerCase()] = this;
      });
      function ue(n) {
        var s = n.match(wt) || [];
        return s.join(" ");
      }
      function Ge(n) {
        return n.getAttribute && n.getAttribute("class") || "";
      }
      function Ae(n) {
        return Array.isArray(n) ? n : typeof n == "string" ? n.match(wt) || [] : [];
      }
      c.fn.extend({
        addClass: function(n) {
          var s, a, u, d, p, g;
          return k(n) ? this.each(function(T) {
            c(this).addClass(n.call(this, T, Ge(this)));
          }) : (s = Ae(n), s.length ? this.each(function() {
            if (u = Ge(this), a = this.nodeType === 1 && " " + ue(u) + " ", a) {
              for (p = 0; p < s.length; p++)
                d = s[p], a.indexOf(" " + d + " ") < 0 && (a += d + " ");
              g = ue(a), u !== g && this.setAttribute("class", g);
            }
          }) : this);
        },
        removeClass: function(n) {
          var s, a, u, d, p, g;
          return k(n) ? this.each(function(T) {
            c(this).removeClass(n.call(this, T, Ge(this)));
          }) : arguments.length ? (s = Ae(n), s.length ? this.each(function() {
            if (u = Ge(this), a = this.nodeType === 1 && " " + ue(u) + " ", a) {
              for (p = 0; p < s.length; p++)
                for (d = s[p]; a.indexOf(" " + d + " ") > -1; )
                  a = a.replace(" " + d + " ", " ");
              g = ue(a), u !== g && this.setAttribute("class", g);
            }
          }) : this) : this.attr("class", "");
        },
        toggleClass: function(n, s) {
          var a, u, d, p, g = typeof n, T = g === "string" || Array.isArray(n);
          return k(n) ? this.each(function(w) {
            c(this).toggleClass(
              n.call(this, w, Ge(this), s),
              s
            );
          }) : typeof s == "boolean" && T ? s ? this.addClass(n) : this.removeClass(n) : (a = Ae(n), this.each(function() {
            if (T)
              for (p = c(this), d = 0; d < a.length; d++)
                u = a[d], p.hasClass(u) ? p.removeClass(u) : p.addClass(u);
            else (n === void 0 || g === "boolean") && (u = Ge(this), u && nt.set(this, "__className__", u), this.setAttribute && this.setAttribute(
              "class",
              u || n === !1 ? "" : nt.get(this, "__className__") || ""
            ));
          }));
        },
        hasClass: function(n) {
          var s, a, u = 0;
          for (s = " " + n + " "; a = this[u++]; )
            if (a.nodeType === 1 && (" " + ue(Ge(a)) + " ").indexOf(s) > -1)
              return !0;
          return !1;
        }
      });
      var Ai = /\r/g;
      c.fn.extend({
        val: function(n) {
          var s, a, u, d = this[0];
          return arguments.length ? (u = k(n), this.each(function(p) {
            var g;
            this.nodeType === 1 && (u ? g = n.call(this, p, c(this).val()) : g = n, g == null ? g = "" : typeof g == "number" ? g += "" : Array.isArray(g) && (g = c.map(g, function(T) {
              return T == null ? "" : T + "";
            })), s = c.valHooks[this.type] || c.valHooks[this.nodeName.toLowerCase()], (!s || !("set" in s) || s.set(this, g, "value") === void 0) && (this.value = g));
          })) : d ? (s = c.valHooks[d.type] || c.valHooks[d.nodeName.toLowerCase()], s && "get" in s && (a = s.get(d, "value")) !== void 0 ? a : (a = d.value, typeof a == "string" ? a.replace(Ai, "") : a ?? "")) : void 0;
        }
      }), c.extend({
        valHooks: {
          option: {
            get: function(n) {
              var s = c.find.attr(n, "value");
              return s ?? // Support: IE <=10 - 11 only
              // option.text throws exceptions (trac-14686, trac-14858)
              // Strip and collapse whitespace
              // https://html.spec.whatwg.org/#strip-and-collapse-whitespace
              ue(c.text(n));
            }
          },
          select: {
            get: function(n) {
              var s, a, u, d = n.options, p = n.selectedIndex, g = n.type === "select-one", T = g ? null : [], w = g ? p + 1 : d.length;
              for (p < 0 ? u = w : u = g ? p : 0; u < w; u++)
                if (a = d[u], (a.selected || u === p) && // Don't return options that are disabled or in a disabled optgroup
                !a.disabled && (!a.parentNode.disabled || !Nt(a.parentNode, "optgroup"))) {
                  if (s = c(a).val(), g)
                    return s;
                  T.push(s);
                }
              return T;
            },
            set: function(n, s) {
              for (var a, u, d = n.options, p = c.makeArray(s), g = d.length; g--; )
                u = d[g], (u.selected = c.inArray(c.valHooks.option.get(u), p) > -1) && (a = !0);
              return a || (n.selectedIndex = -1), p;
            }
          }
        }
      }), c.each(["radio", "checkbox"], function() {
        c.valHooks[this] = {
          set: function(n, s) {
            if (Array.isArray(s))
              return n.checked = c.inArray(c(n).val(), s) > -1;
          }
        }, q.checkOn || (c.valHooks[this].get = function(n) {
          return n.getAttribute("value") === null ? "on" : n.value;
        });
      });
      var kn = t.location, Qr = { guid: Date.now() }, yr = /\?/;
      c.parseXML = function(n) {
        var s, a;
        if (!n || typeof n != "string")
          return null;
        try {
          s = new t.DOMParser().parseFromString(n, "text/xml");
        } catch {
        }
        return a = s && s.getElementsByTagName("parsererror")[0], (!s || a) && c.error("Invalid XML: " + (a ? c.map(a.childNodes, function(u) {
          return u.textContent;
        }).join(`
`) : n)), s;
      };
      var br = /^(?:focusinfocus|focusoutblur)$/, oe = function(n) {
        n.stopPropagation();
      };
      c.extend(c.event, {
        trigger: function(n, s, a, u) {
          var d, p, g, T, w, L, B, H, M = [a || j], W = R.call(n, "type") ? n.type : n, yt = R.call(n, "namespace") ? n.namespace.split(".") : [];
          if (p = H = g = a = a || j, !(a.nodeType === 3 || a.nodeType === 8) && !br.test(W + c.event.triggered) && (W.indexOf(".") > -1 && (yt = W.split("."), W = yt.shift(), yt.sort()), w = W.indexOf(":") < 0 && "on" + W, n = n[c.expando] ? n : new c.Event(W, typeof n == "object" && n), n.isTrigger = u ? 2 : 3, n.namespace = yt.join("."), n.rnamespace = n.namespace ? new RegExp("(^|\\.)" + yt.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, n.result = void 0, n.target || (n.target = a), s = s == null ? [n] : c.makeArray(s, [n]), B = c.event.special[W] || {}, !(!u && B.trigger && B.trigger.apply(a, s) === !1))) {
            if (!u && !B.noBubble && !F(a)) {
              for (T = B.delegateType || W, br.test(T + W) || (p = p.parentNode); p; p = p.parentNode)
                M.push(p), g = p;
              g === (a.ownerDocument || j) && M.push(g.defaultView || g.parentWindow || t);
            }
            for (d = 0; (p = M[d++]) && !n.isPropagationStopped(); )
              H = p, n.type = d > 1 ? T : B.bindType || W, L = (nt.get(p, "events") || /* @__PURE__ */ Object.create(null))[n.type] && nt.get(p, "handle"), L && L.apply(p, s), L = w && p[w], L && L.apply && rn(p) && (n.result = L.apply(p, s), n.result === !1 && n.preventDefault());
            return n.type = W, !u && !n.isDefaultPrevented() && (!B._default || B._default.apply(M.pop(), s) === !1) && rn(a) && w && k(a[W]) && !F(a) && (g = a[w], g && (a[w] = null), c.event.triggered = W, n.isPropagationStopped() && H.addEventListener(W, oe), a[W](), n.isPropagationStopped() && H.removeEventListener(W, oe), c.event.triggered = void 0, g && (a[w] = g)), n.result;
          }
        },
        // Piggyback on a donor event to simulate a different one
        // Used only for `focus(in | out)` events
        simulate: function(n, s, a) {
          var u = c.extend(
            new c.Event(),
            a,
            {
              type: n,
              isSimulated: !0
            }
          );
          c.event.trigger(u, null, s);
        }
      }), c.fn.extend({
        trigger: function(n, s) {
          return this.each(function() {
            c.event.trigger(n, s, this);
          });
        },
        triggerHandler: function(n, s) {
          var a = this[0];
          if (a)
            return c.event.trigger(n, s, a, !0);
        }
      });
      var Jr = /\[\]$/, vr = /\r?\n/g, Gn = /^(?:submit|button|image|reset|file)$/i, xr = /^(?:input|select|textarea|keygen)/i;
      function pn(n, s, a, u) {
        var d;
        if (Array.isArray(s))
          c.each(s, function(p, g) {
            a || Jr.test(n) ? u(n, g) : pn(
              n + "[" + (typeof g == "object" && g != null ? p : "") + "]",
              g,
              a,
              u
            );
          });
        else if (!a && dt(s) === "object")
          for (d in s)
            pn(n + "[" + d + "]", s[d], a, u);
        else
          u(n, s);
      }
      c.param = function(n, s) {
        var a, u = [], d = function(p, g) {
          var T = k(g) ? g() : g;
          u[u.length] = encodeURIComponent(p) + "=" + encodeURIComponent(T ?? "");
        };
        if (n == null)
          return "";
        if (Array.isArray(n) || n.jquery && !c.isPlainObject(n))
          c.each(n, function() {
            d(this.name, this.value);
          });
        else
          for (a in n)
            pn(a, n[a], s, d);
        return u.join("&");
      }, c.fn.extend({
        serialize: function() {
          return c.param(this.serializeArray());
        },
        serializeArray: function() {
          return this.map(function() {
            var n = c.prop(this, "elements");
            return n ? c.makeArray(n) : this;
          }).filter(function() {
            var n = this.type;
            return this.name && !c(this).is(":disabled") && xr.test(this.nodeName) && !Gn.test(n) && (this.checked || !Oe.test(n));
          }).map(function(n, s) {
            var a = c(this).val();
            return a == null ? null : Array.isArray(a) ? c.map(a, function(u) {
              return { name: s.name, value: u.replace(vr, `\r
`) };
            }) : { name: s.name, value: a.replace(vr, `\r
`) };
          }).get();
        }
      });
      var Ni = /%20/g, ti = /#.*$/, wr = /([?&])_=[^&]*/, ei = /^(.*?):[ \t]*([^\r\n]*)$/mg, Be = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, ni = /^(?:GET|HEAD)$/, Tr = /^\/\//, ri = {}, Er = {}, f = "*/".concat("*"), y = j.createElement("a");
      y.href = kn.href;
      function A(n) {
        return function(s, a) {
          typeof s != "string" && (a = s, s = "*");
          var u, d = 0, p = s.toLowerCase().match(wt) || [];
          if (k(a))
            for (; u = p[d++]; )
              u[0] === "+" ? (u = u.slice(1) || "*", (n[u] = n[u] || []).unshift(a)) : (n[u] = n[u] || []).push(a);
        };
      }
      function P(n, s, a, u) {
        var d = {}, p = n === Er;
        function g(T) {
          var w;
          return d[T] = !0, c.each(n[T] || [], function(L, B) {
            var H = B(s, a, u);
            if (typeof H == "string" && !p && !d[H])
              return s.dataTypes.unshift(H), g(H), !1;
            if (p)
              return !(w = H);
          }), w;
        }
        return g(s.dataTypes[0]) || !d["*"] && g("*");
      }
      function mt(n, s) {
        var a, u, d = c.ajaxSettings.flatOptions || {};
        for (a in s)
          s[a] !== void 0 && ((d[a] ? n : u || (u = {}))[a] = s[a]);
        return u && c.extend(!0, n, u), n;
      }
      function ut(n, s, a) {
        for (var u, d, p, g, T = n.contents, w = n.dataTypes; w[0] === "*"; )
          w.shift(), u === void 0 && (u = n.mimeType || s.getResponseHeader("Content-Type"));
        if (u) {
          for (d in T)
            if (T[d] && T[d].test(u)) {
              w.unshift(d);
              break;
            }
        }
        if (w[0] in a)
          p = w[0];
        else {
          for (d in a) {
            if (!w[0] || n.converters[d + " " + w[0]]) {
              p = d;
              break;
            }
            g || (g = d);
          }
          p = p || g;
        }
        if (p)
          return p !== w[0] && w.unshift(p), a[p];
      }
      function _t(n, s, a, u) {
        var d, p, g, T, w, L = {}, B = n.dataTypes.slice();
        if (B[1])
          for (g in n.converters)
            L[g.toLowerCase()] = n.converters[g];
        for (p = B.shift(); p; )
          if (n.responseFields[p] && (a[n.responseFields[p]] = s), !w && u && n.dataFilter && (s = n.dataFilter(s, n.dataType)), w = p, p = B.shift(), p) {
            if (p === "*")
              p = w;
            else if (w !== "*" && w !== p) {
              if (g = L[w + " " + p] || L["* " + p], !g) {
                for (d in L)
                  if (T = d.split(" "), T[1] === p && (g = L[w + " " + T[0]] || L["* " + T[0]], g)) {
                    g === !0 ? g = L[d] : L[d] !== !0 && (p = T[0], B.unshift(T[1]));
                    break;
                  }
              }
              if (g !== !0)
                if (g && n.throws)
                  s = g(s);
                else
                  try {
                    s = g(s);
                  } catch (H) {
                    return {
                      state: "parsererror",
                      error: g ? H : "No conversion from " + w + " to " + p
                    };
                  }
            }
          }
        return { state: "success", data: s };
      }
      c.extend({
        // Counter for holding the number of active queries
        active: 0,
        // Last-Modified header cache for next request
        lastModified: {},
        etag: {},
        ajaxSettings: {
          url: kn.href,
          type: "GET",
          isLocal: Be.test(kn.protocol),
          global: !0,
          processData: !0,
          async: !0,
          contentType: "application/x-www-form-urlencoded; charset=UTF-8",
          /*
          timeout: 0,
          data: null,
          dataType: null,
          username: null,
          password: null,
          cache: null,
          throws: false,
          traditional: false,
          headers: {},
          */
          accepts: {
            "*": f,
            text: "text/plain",
            html: "text/html",
            xml: "application/xml, text/xml",
            json: "application/json, text/javascript"
          },
          contents: {
            xml: /\bxml\b/,
            html: /\bhtml/,
            json: /\bjson\b/
          },
          responseFields: {
            xml: "responseXML",
            text: "responseText",
            json: "responseJSON"
          },
          // Data converters
          // Keys separate source (or catchall "*") and destination types with a single space
          converters: {
            // Convert anything to text
            "* text": String,
            // Text to html (true = no transformation)
            "text html": !0,
            // Evaluate text as a json expression
            "text json": JSON.parse,
            // Parse text as xml
            "text xml": c.parseXML
          },
          // For options that shouldn't be deep extended:
          // you can add your own custom options here if
          // and when you create one that shouldn't be
          // deep extended (see ajaxExtend)
          flatOptions: {
            url: !0,
            context: !0
          }
        },
        // Creates a full fledged settings object into target
        // with both ajaxSettings and settings fields.
        // If target is omitted, writes into ajaxSettings.
        ajaxSetup: function(n, s) {
          return s ? (
            // Building a settings object
            mt(mt(n, c.ajaxSettings), s)
          ) : (
            // Extending ajaxSettings
            mt(c.ajaxSettings, n)
          );
        },
        ajaxPrefilter: A(ri),
        ajaxTransport: A(Er),
        // Main method
        ajax: function(n, s) {
          typeof n == "object" && (s = n, n = void 0), s = s || {};
          var a, u, d, p, g, T, w, L, B, H, M = c.ajaxSetup({}, s), W = M.context || M, yt = M.context && (W.nodeType || W.jquery) ? c(W) : c.event, kt = c.Deferred(), Et = c.Callbacks("once memory"), ce = M.statusCode || {}, te = {}, gn = {}, mn = "canceled", qt = {
            readyState: 0,
            // Builds headers hashtable if needed
            getResponseHeader: function(Dt) {
              var Gt;
              if (w) {
                if (!p)
                  for (p = {}; Gt = ei.exec(d); )
                    p[Gt[1].toLowerCase() + " "] = (p[Gt[1].toLowerCase() + " "] || []).concat(Gt[2]);
                Gt = p[Dt.toLowerCase() + " "];
              }
              return Gt == null ? null : Gt.join(", ");
            },
            // Raw string
            getAllResponseHeaders: function() {
              return w ? d : null;
            },
            // Caches the header
            setRequestHeader: function(Dt, Gt) {
              return w == null && (Dt = gn[Dt.toLowerCase()] = gn[Dt.toLowerCase()] || Dt, te[Dt] = Gt), this;
            },
            // Overrides response content-type header
            overrideMimeType: function(Dt) {
              return w == null && (M.mimeType = Dt), this;
            },
            // Status-dependent callbacks
            statusCode: function(Dt) {
              var Gt;
              if (Dt)
                if (w)
                  qt.always(Dt[qt.status]);
                else
                  for (Gt in Dt)
                    ce[Gt] = [ce[Gt], Dt[Gt]];
              return this;
            },
            // Cancel the request
            abort: function(Dt) {
              var Gt = Dt || mn;
              return a && a.abort(Gt), Ar(0, Gt), this;
            }
          };
          if (kt.promise(qt), M.url = ((n || M.url || kn.href) + "").replace(Tr, kn.protocol + "//"), M.type = s.method || s.type || M.method || M.type, M.dataTypes = (M.dataType || "*").toLowerCase().match(wt) || [""], M.crossDomain == null) {
            T = j.createElement("a");
            try {
              T.href = M.url, T.href = T.href, M.crossDomain = y.protocol + "//" + y.host != T.protocol + "//" + T.host;
            } catch {
              M.crossDomain = !0;
            }
          }
          if (M.data && M.processData && typeof M.data != "string" && (M.data = c.param(M.data, M.traditional)), P(ri, M, s, qt), w)
            return qt;
          L = c.event && M.global, L && c.active++ === 0 && c.event.trigger("ajaxStart"), M.type = M.type.toUpperCase(), M.hasContent = !ni.test(M.type), u = M.url.replace(ti, ""), M.hasContent ? M.data && M.processData && (M.contentType || "").indexOf("application/x-www-form-urlencoded") === 0 && (M.data = M.data.replace(Ni, "+")) : (H = M.url.slice(u.length), M.data && (M.processData || typeof M.data == "string") && (u += (yr.test(u) ? "&" : "?") + M.data, delete M.data), M.cache === !1 && (u = u.replace(wr, "$1"), H = (yr.test(u) ? "&" : "?") + "_=" + Qr.guid++ + H), M.url = u + H), M.ifModified && (c.lastModified[u] && qt.setRequestHeader("If-Modified-Since", c.lastModified[u]), c.etag[u] && qt.setRequestHeader("If-None-Match", c.etag[u])), (M.data && M.hasContent && M.contentType !== !1 || s.contentType) && qt.setRequestHeader("Content-Type", M.contentType), qt.setRequestHeader(
            "Accept",
            M.dataTypes[0] && M.accepts[M.dataTypes[0]] ? M.accepts[M.dataTypes[0]] + (M.dataTypes[0] !== "*" ? ", " + f + "; q=0.01" : "") : M.accepts["*"]
          );
          for (B in M.headers)
            qt.setRequestHeader(B, M.headers[B]);
          if (M.beforeSend && (M.beforeSend.call(W, qt, M) === !1 || w))
            return qt.abort();
          if (mn = "abort", Et.add(M.complete), qt.done(M.success), qt.fail(M.error), a = P(Er, M, s, qt), !a)
            Ar(-1, "No Transport");
          else {
            if (qt.readyState = 1, L && yt.trigger("ajaxSend", [qt, M]), w)
              return qt;
            M.async && M.timeout > 0 && (g = t.setTimeout(function() {
              qt.abort("timeout");
            }, M.timeout));
            try {
              w = !1, a.send(te, Ar);
            } catch (Dt) {
              if (w)
                throw Dt;
              Ar(-1, Dt);
            }
          }
          function Ar(Dt, Gt, Si, Ns) {
            var yn, Ci, bn, Kn, Zn, Pe = Gt;
            w || (w = !0, g && t.clearTimeout(g), a = void 0, d = Ns || "", qt.readyState = Dt > 0 ? 4 : 0, yn = Dt >= 200 && Dt < 300 || Dt === 304, Si && (Kn = ut(M, qt, Si)), !yn && c.inArray("script", M.dataTypes) > -1 && c.inArray("json", M.dataTypes) < 0 && (M.converters["text script"] = function() {
            }), Kn = _t(M, Kn, qt, yn), yn ? (M.ifModified && (Zn = qt.getResponseHeader("Last-Modified"), Zn && (c.lastModified[u] = Zn), Zn = qt.getResponseHeader("etag"), Zn && (c.etag[u] = Zn)), Dt === 204 || M.type === "HEAD" ? Pe = "nocontent" : Dt === 304 ? Pe = "notmodified" : (Pe = Kn.state, Ci = Kn.data, bn = Kn.error, yn = !bn)) : (bn = Pe, (Dt || !Pe) && (Pe = "error", Dt < 0 && (Dt = 0))), qt.status = Dt, qt.statusText = (Gt || Pe) + "", yn ? kt.resolveWith(W, [Ci, Pe, qt]) : kt.rejectWith(W, [qt, Pe, bn]), qt.statusCode(ce), ce = void 0, L && yt.trigger(
              yn ? "ajaxSuccess" : "ajaxError",
              [qt, M, yn ? Ci : bn]
            ), Et.fireWith(W, [qt, Pe]), L && (yt.trigger("ajaxComplete", [qt, M]), --c.active || c.event.trigger("ajaxStop")));
          }
          return qt;
        },
        getJSON: function(n, s, a) {
          return c.get(n, s, a, "json");
        },
        getScript: function(n, s) {
          return c.get(n, void 0, s, "script");
        }
      }), c.each(["get", "post"], function(n, s) {
        c[s] = function(a, u, d, p) {
          return k(u) && (p = p || d, d = u, u = void 0), c.ajax(c.extend({
            url: a,
            type: s,
            dataType: p,
            data: u,
            success: d
          }, c.isPlainObject(a) && a));
        };
      }), c.ajaxPrefilter(function(n) {
        var s;
        for (s in n.headers)
          s.toLowerCase() === "content-type" && (n.contentType = n.headers[s] || "");
      }), c._evalUrl = function(n, s, a) {
        return c.ajax({
          url: n,
          // Make this explicit, since user can override this through ajaxSetup (trac-11264)
          type: "GET",
          dataType: "script",
          cache: !0,
          async: !1,
          global: !1,
          // Only evaluate the response if it is successful (gh-4126)
          // dataFilter is not invoked for failure responses, so using it instead
          // of the default converter is kludgy but it works.
          converters: {
            "text script": function() {
            }
          },
          dataFilter: function(u) {
            c.globalEval(u, s, a);
          }
        });
      }, c.fn.extend({
        wrapAll: function(n) {
          var s;
          return this[0] && (k(n) && (n = n.call(this[0])), s = c(n, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && s.insertBefore(this[0]), s.map(function() {
            for (var a = this; a.firstElementChild; )
              a = a.firstElementChild;
            return a;
          }).append(this)), this;
        },
        wrapInner: function(n) {
          return k(n) ? this.each(function(s) {
            c(this).wrapInner(n.call(this, s));
          }) : this.each(function() {
            var s = c(this), a = s.contents();
            a.length ? a.wrapAll(n) : s.append(n);
          });
        },
        wrap: function(n) {
          var s = k(n);
          return this.each(function(a) {
            c(this).wrapAll(s ? n.call(this, a) : n);
          });
        },
        unwrap: function(n) {
          return this.parent(n).not("body").each(function() {
            c(this).replaceWith(this.childNodes);
          }), this;
        }
      }), c.expr.pseudos.hidden = function(n) {
        return !c.expr.pseudos.visible(n);
      }, c.expr.pseudos.visible = function(n) {
        return !!(n.offsetWidth || n.offsetHeight || n.getClientRects().length);
      }, c.ajaxSettings.xhr = function() {
        try {
          return new t.XMLHttpRequest();
        } catch {
        }
      };
      var Ot = {
        // File protocol always yields status code 0, assume 200
        0: 200,
        // Support: IE <=9 only
        // trac-1450: sometimes IE returns 1223 when it should be 204
        1223: 204
      }, Ut = c.ajaxSettings.xhr();
      q.cors = !!Ut && "withCredentials" in Ut, q.ajax = Ut = !!Ut, c.ajaxTransport(function(n) {
        var s, a;
        if (q.cors || Ut && !n.crossDomain)
          return {
            send: function(u, d) {
              var p, g = n.xhr();
              if (g.open(
                n.type,
                n.url,
                n.async,
                n.username,
                n.password
              ), n.xhrFields)
                for (p in n.xhrFields)
                  g[p] = n.xhrFields[p];
              n.mimeType && g.overrideMimeType && g.overrideMimeType(n.mimeType), !n.crossDomain && !u["X-Requested-With"] && (u["X-Requested-With"] = "XMLHttpRequest");
              for (p in u)
                g.setRequestHeader(p, u[p]);
              s = function(T) {
                return function() {
                  s && (s = a = g.onload = g.onerror = g.onabort = g.ontimeout = g.onreadystatechange = null, T === "abort" ? g.abort() : T === "error" ? typeof g.status != "number" ? d(0, "error") : d(
                    // File: protocol always yields status 0; see trac-8605, trac-14207
                    g.status,
                    g.statusText
                  ) : d(
                    Ot[g.status] || g.status,
                    g.statusText,
                    // Support: IE <=9 only
                    // IE9 has no XHR2 but throws on binary (trac-11426)
                    // For XHR2 non-text, let the caller handle it (gh-2498)
                    (g.responseType || "text") !== "text" || typeof g.responseText != "string" ? { binary: g.response } : { text: g.responseText },
                    g.getAllResponseHeaders()
                  ));
                };
              }, g.onload = s(), a = g.onerror = g.ontimeout = s("error"), g.onabort !== void 0 ? g.onabort = a : g.onreadystatechange = function() {
                g.readyState === 4 && t.setTimeout(function() {
                  s && a();
                });
              }, s = s("abort");
              try {
                g.send(n.hasContent && n.data || null);
              } catch (T) {
                if (s)
                  throw T;
              }
            },
            abort: function() {
              s && s();
            }
          };
      }), c.ajaxPrefilter(function(n) {
        n.crossDomain && (n.contents.script = !1);
      }), c.ajaxSetup({
        accepts: {
          script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
          script: /\b(?:java|ecma)script\b/
        },
        converters: {
          "text script": function(n) {
            return c.globalEval(n), n;
          }
        }
      }), c.ajaxPrefilter("script", function(n) {
        n.cache === void 0 && (n.cache = !1), n.crossDomain && (n.type = "GET");
      }), c.ajaxTransport("script", function(n) {
        if (n.crossDomain || n.scriptAttrs) {
          var s, a;
          return {
            send: function(u, d) {
              s = c("<script>").attr(n.scriptAttrs || {}).prop({ charset: n.scriptCharset, src: n.url }).on("load error", a = function(p) {
                s.remove(), a = null, p && d(p.type === "error" ? 404 : 200, p.type);
              }), j.head.appendChild(s[0]);
            },
            abort: function() {
              a && a();
            }
          };
        }
      });
      var Mt = [], Qt = /(=)\?(?=&|$)|\?\?/;
      c.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
          var n = Mt.pop() || c.expando + "_" + Qr.guid++;
          return this[n] = !0, n;
        }
      }), c.ajaxPrefilter("json jsonp", function(n, s, a) {
        var u, d, p, g = n.jsonp !== !1 && (Qt.test(n.url) ? "url" : typeof n.data == "string" && (n.contentType || "").indexOf("application/x-www-form-urlencoded") === 0 && Qt.test(n.data) && "data");
        if (g || n.dataTypes[0] === "jsonp")
          return u = n.jsonpCallback = k(n.jsonpCallback) ? n.jsonpCallback() : n.jsonpCallback, g ? n[g] = n[g].replace(Qt, "$1" + u) : n.jsonp !== !1 && (n.url += (yr.test(n.url) ? "&" : "?") + n.jsonp + "=" + u), n.converters["script json"] = function() {
            return p || c.error(u + " was not called"), p[0];
          }, n.dataTypes[0] = "json", d = t[u], t[u] = function() {
            p = arguments;
          }, a.always(function() {
            d === void 0 ? c(t).removeProp(u) : t[u] = d, n[u] && (n.jsonpCallback = s.jsonpCallback, Mt.push(u)), p && k(d) && d(p[0]), p = d = void 0;
          }), "script";
      }), q.createHTMLDocument = (function() {
        var n = j.implementation.createHTMLDocument("").body;
        return n.innerHTML = "<form></form><form></form>", n.childNodes.length === 2;
      })(), c.parseHTML = function(n, s, a) {
        if (typeof n != "string")
          return [];
        typeof s == "boolean" && (a = s, s = !1);
        var u, d, p;
        return s || (q.createHTMLDocument ? (s = j.implementation.createHTMLDocument(""), u = s.createElement("base"), u.href = j.location.href, s.head.appendChild(u)) : s = j), d = gt.exec(n), p = !a && [], d ? [s.createElement(d[1])] : (d = ur([n], s, p), p && p.length && c(p).remove(), c.merge([], d.childNodes));
      }, c.fn.load = function(n, s, a) {
        var u, d, p, g = this, T = n.indexOf(" ");
        return T > -1 && (u = ue(n.slice(T)), n = n.slice(0, T)), k(s) ? (a = s, s = void 0) : s && typeof s == "object" && (d = "POST"), g.length > 0 && c.ajax({
          url: n,
          // If "type" variable is undefined, then "GET" method will be used.
          // Make value of this field explicit since
          // user can override it through ajaxSetup method
          type: d || "GET",
          dataType: "html",
          data: s
        }).done(function(w) {
          p = arguments, g.html(u ? (
            // If a selector was specified, locate the right elements in a dummy div
            // Exclude scripts to avoid IE 'Permission Denied' errors
            c("<div>").append(c.parseHTML(w)).find(u)
          ) : (
            // Otherwise use the full result
            w
          ));
        }).always(a && function(w, L) {
          g.each(function() {
            a.apply(this, p || [w.responseText, L, w]);
          });
        }), this;
      }, c.expr.pseudos.animated = function(n) {
        return c.grep(c.timers, function(s) {
          return n === s.elem;
        }).length;
      }, c.offset = {
        setOffset: function(n, s, a) {
          var u, d, p, g, T, w, L, B = c.css(n, "position"), H = c(n), M = {};
          B === "static" && (n.style.position = "relative"), T = H.offset(), p = c.css(n, "top"), w = c.css(n, "left"), L = (B === "absolute" || B === "fixed") && (p + w).indexOf("auto") > -1, L ? (u = H.position(), g = u.top, d = u.left) : (g = parseFloat(p) || 0, d = parseFloat(w) || 0), k(s) && (s = s.call(n, a, c.extend({}, T))), s.top != null && (M.top = s.top - T.top + g), s.left != null && (M.left = s.left - T.left + d), "using" in s ? s.using.call(n, M) : H.css(M);
        }
      }, c.fn.extend({
        // offset() relates an element's border box to the document origin
        offset: function(n) {
          if (arguments.length)
            return n === void 0 ? this : this.each(function(d) {
              c.offset.setOffset(this, n, d);
            });
          var s, a, u = this[0];
          if (u)
            return u.getClientRects().length ? (s = u.getBoundingClientRect(), a = u.ownerDocument.defaultView, {
              top: s.top + a.pageYOffset,
              left: s.left + a.pageXOffset
            }) : { top: 0, left: 0 };
        },
        // position() relates an element's margin box to its offset parent's padding box
        // This corresponds to the behavior of CSS absolute positioning
        position: function() {
          if (this[0]) {
            var n, s, a, u = this[0], d = { top: 0, left: 0 };
            if (c.css(u, "position") === "fixed")
              s = u.getBoundingClientRect();
            else {
              for (s = this.offset(), a = u.ownerDocument, n = u.offsetParent || a.documentElement; n && (n === a.body || n === a.documentElement) && c.css(n, "position") === "static"; )
                n = n.parentNode;
              n && n !== u && n.nodeType === 1 && (d = c(n).offset(), d.top += c.css(n, "borderTopWidth", !0), d.left += c.css(n, "borderLeftWidth", !0));
            }
            return {
              top: s.top - d.top - c.css(u, "marginTop", !0),
              left: s.left - d.left - c.css(u, "marginLeft", !0)
            };
          }
        },
        // This method will return documentElement in the following cases:
        // 1) For the element inside the iframe without offsetParent, this method will return
        //    documentElement of the parent window
        // 2) For the hidden or detached element
        // 3) For body or html element, i.e. in case of the html node - it will return itself
        //
        // but those exceptions were never presented as a real life use-cases
        // and might be considered as more preferable results.
        //
        // This logic, however, is not guaranteed and can change at any point in the future
        offsetParent: function() {
          return this.map(function() {
            for (var n = this.offsetParent; n && c.css(n, "position") === "static"; )
              n = n.offsetParent;
            return n || Le;
          });
        }
      }), c.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function(n, s) {
        var a = s === "pageYOffset";
        c.fn[n] = function(u) {
          return Se(this, function(d, p, g) {
            var T;
            if (F(d) ? T = d : d.nodeType === 9 && (T = d.defaultView), g === void 0)
              return T ? T[s] : d[p];
            T ? T.scrollTo(
              a ? T.pageXOffset : g,
              a ? g : T.pageYOffset
            ) : d[p] = g;
          }, n, u, arguments.length);
        };
      }), c.each(["top", "left"], function(n, s) {
        c.cssHooks[s] = Hr(
          q.pixelPosition,
          function(a, u) {
            if (u)
              return u = qn(a, s), hr.test(u) ? c(a).position()[s] + "px" : u;
          }
        );
      }), c.each({ Height: "height", Width: "width" }, function(n, s) {
        c.each({
          padding: "inner" + n,
          content: s,
          "": "outer" + n
        }, function(a, u) {
          c.fn[u] = function(d, p) {
            var g = arguments.length && (a || typeof d != "boolean"), T = a || (d === !0 || p === !0 ? "margin" : "border");
            return Se(this, function(w, L, B) {
              var H;
              return F(w) ? u.indexOf("outer") === 0 ? w["inner" + n] : w.document.documentElement["client" + n] : w.nodeType === 9 ? (H = w.documentElement, Math.max(
                w.body["scroll" + n],
                H["scroll" + n],
                w.body["offset" + n],
                H["offset" + n],
                H["client" + n]
              )) : B === void 0 ? (
                // Get width or height on the element, requesting but not forcing parseFloat
                c.css(w, L, T)
              ) : (
                // Set width or height on the element
                c.style(w, L, B, T)
              );
            }, s, g ? d : void 0, g);
          };
        });
      }), c.each([
        "ajaxStart",
        "ajaxStop",
        "ajaxComplete",
        "ajaxError",
        "ajaxSuccess",
        "ajaxSend"
      ], function(n, s) {
        c.fn[s] = function(a) {
          return this.on(s, a);
        };
      }), c.fn.extend({
        bind: function(n, s, a) {
          return this.on(n, null, s, a);
        },
        unbind: function(n, s) {
          return this.off(n, null, s);
        },
        delegate: function(n, s, a, u) {
          return this.on(s, n, a, u);
        },
        undelegate: function(n, s, a) {
          return arguments.length === 1 ? this.off(n, "**") : this.off(s, n || "**", a);
        },
        hover: function(n, s) {
          return this.on("mouseenter", n).on("mouseleave", s || n);
        }
      }), c.each(
        "blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "),
        function(n, s) {
          c.fn[s] = function(a, u) {
            return arguments.length > 0 ? this.on(s, null, a, u) : this.trigger(s);
          };
        }
      );
      var de = /^[\s\uFEFF\xA0]+|([^\s\uFEFF\xA0])[\s\uFEFF\xA0]+$/g;
      c.proxy = function(n, s) {
        var a, u, d;
        if (typeof s == "string" && (a = n[s], s = n, n = a), !!k(n))
          return u = l.call(arguments, 2), d = function() {
            return n.apply(s || this, u.concat(l.call(arguments)));
          }, d.guid = n.guid = n.guid || c.guid++, d;
      }, c.holdReady = function(n) {
        n ? c.readyWait++ : c.ready(!0);
      }, c.isArray = Array.isArray, c.parseJSON = JSON.parse, c.nodeName = Nt, c.isFunction = k, c.isWindow = F, c.camelCase = ye, c.type = dt, c.now = Date.now, c.isNumeric = function(n) {
        var s = c.type(n);
        return (s === "number" || s === "string") && // parseFloat NaNs numeric-cast false positives ("")
        // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
        // subtraction forces infinities to NaN
        !isNaN(n - parseFloat(n));
      }, c.trim = function(n) {
        return n == null ? "" : (n + "").replace(de, "$1");
      };
      var Zt = t.jQuery, ae = t.$;
      return c.noConflict = function(n) {
        return t.$ === c && (t.$ = ae), n && t.jQuery === c && (t.jQuery = Zt), c;
      }, typeof e > "u" && (t.jQuery = t.$ = c), c;
    });
  })(cs)), cs.exports;
}
var am = om();
const dm = /* @__PURE__ */ xo(am);
function pm() {
  console.log("Vite library successfully imported!");
}
window.reader = {
  clickElement: (i) => {
    i && i.click();
  },
  removeDom: (i) => {
    document.querySelectorAll(i).forEach((e) => e.remove());
  },
  CopyToclipboard(i) {
    navigator.clipboard?.writeText(i).catch((t) => console.error("Clipboard error:", t));
  },
  scrollToSelector: (i, t = "smooth") => {
    setTimeout(() => {
      const e = document.querySelector(i);
      e ? e.scrollIntoView({ behavior: t, block: "center" }) : window.scrollBy({ top: 0, behavior: t });
    });
  },
  focusInput: (i) => {
    setTimeout(() => {
      const t = document.querySelector(i);
      t && t.focus();
    });
  }
};
export {
  dm as $,
  pm as testViteLibrary
};
