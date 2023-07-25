import { g_ as J, gV as Mt, x as q, gS as fe } from "./libs-0c2ad75d.js";
import "https://cdn.skypack.dev/pin/react@v17.0.1-yH0aYV1FOvoIPeKBbHxg/mode=imports,min/optimized/react.js";
import "https://cdn.skypack.dev/pin/react-dom@v17.0.1-oZ1BXZ5opQ1DbTh7nu9r/mode=imports,min/optimized/react-dom.js";
import "https://cdn.skypack.dev/pin/react-dom@v17.0.1-oZ1BXZ5opQ1DbTh7nu9r/dist=es2020,mode=imports,min/unoptimized/cjs/react-dom-server.browser.production.min.js";
var Vt = 2 * 60 * 1e3, Bt = (
  /** @class */
  function() {
    function e(r) {
      var i = this;
      this._defaults = r, this._worker = null, this._idleCheckInterval = setInterval(function() {
        return i._checkIfIdle();
      }, 30 * 1e3), this._lastUsedTime = 0, this._configChangeListener = this._defaults.onDidChange(function() {
        return i._stopWorker();
      });
    }
    return e.prototype._stopWorker = function() {
      this._worker && (this._worker.dispose(), this._worker = null), this._client = null;
    }, e.prototype.dispose = function() {
      clearInterval(this._idleCheckInterval), this._configChangeListener.dispose(), this._stopWorker();
    }, e.prototype._checkIfIdle = function() {
      if (this._worker) {
        var r = Date.now() - this._lastUsedTime;
        r > Vt && this._stopWorker();
      }
    }, e.prototype._getClient = function() {
      return this._lastUsedTime = Date.now(), this._client || (this._worker = J.createWebWorker({
        // module that exports the create() method and returns a `JSONWorker` instance
        moduleId: "vs/language/json/jsonWorker",
        label: this._defaults.languageId,
        // passed in to the create() method
        createData: {
          languageSettings: this._defaults.diagnosticsOptions,
          languageId: this._defaults.languageId,
          enableSchemaRequest: this._defaults.diagnosticsOptions.enableSchemaRequest
        }
      }), this._client = this._worker.getProxy()), this._client;
    }, e.prototype.getLanguageServiceWorker = function() {
      for (var r = this, i = [], n = 0; n < arguments.length; n++)
        i[n] = arguments[n];
      var t;
      return this._getClient().then(function(a) {
        t = a;
      }).then(function(a) {
        return r._worker.withSyncedResources(i);
      }).then(function(a) {
        return t;
      });
    }, e;
  }()
);
function $t(e, r) {
  r === void 0 && (r = !1);
  var i = e.length, n = 0, t = "", a = 0, o = 16, s = 0, u = 0, c = 0, l = 0, p = 0;
  function m(w, R) {
    for (var L = 0, D = 0; L < w || !R; ) {
      var P = e.charCodeAt(n);
      if (P >= 48 && P <= 57)
        D = D * 16 + P - 48;
      else if (P >= 65 && P <= 70)
        D = D * 16 + P - 65 + 10;
      else if (P >= 97 && P <= 102)
        D = D * 16 + P - 97 + 10;
      else
        break;
      n++, L++;
    }
    return L < w && (D = -1), D;
  }
  function h(w) {
    n = w, t = "", a = 0, o = 16, p = 0;
  }
  function g() {
    var w = n;
    if (e.charCodeAt(n) === 48)
      n++;
    else
      for (n++; n < e.length && oe(e.charCodeAt(n)); )
        n++;
    if (n < e.length && e.charCodeAt(n) === 46)
      if (n++, n < e.length && oe(e.charCodeAt(n)))
        for (n++; n < e.length && oe(e.charCodeAt(n)); )
          n++;
      else
        return p = 3, e.substring(w, n);
    var R = n;
    if (n < e.length && (e.charCodeAt(n) === 69 || e.charCodeAt(n) === 101))
      if (n++, (n < e.length && e.charCodeAt(n) === 43 || e.charCodeAt(n) === 45) && n++, n < e.length && oe(e.charCodeAt(n))) {
        for (n++; n < e.length && oe(e.charCodeAt(n)); )
          n++;
        R = n;
      } else
        p = 3;
    return e.substring(w, R);
  }
  function A() {
    for (var w = "", R = n; ; ) {
      if (n >= i) {
        w += e.substring(R, n), p = 2;
        break;
      }
      var L = e.charCodeAt(n);
      if (L === 34) {
        w += e.substring(R, n), n++;
        break;
      }
      if (L === 92) {
        if (w += e.substring(R, n), n++, n >= i) {
          p = 2;
          break;
        }
        var D = e.charCodeAt(n++);
        switch (D) {
          case 34:
            w += '"';
            break;
          case 92:
            w += "\\";
            break;
          case 47:
            w += "/";
            break;
          case 98:
            w += "\b";
            break;
          case 102:
            w += "\f";
            break;
          case 110:
            w += `
`;
            break;
          case 114:
            w += "\r";
            break;
          case 116:
            w += "	";
            break;
          case 117:
            var P = m(4, !0);
            P >= 0 ? w += String.fromCharCode(P) : p = 4;
            break;
          default:
            p = 5;
        }
        R = n;
        continue;
      }
      if (L >= 0 && L <= 31)
        if (le(L)) {
          w += e.substring(R, n), p = 2;
          break;
        } else
          p = 6;
      n++;
    }
    return w;
  }
  function k() {
    if (t = "", p = 0, a = n, u = s, l = c, n >= i)
      return a = i, o = 17;
    var w = e.charCodeAt(n);
    if (Te(w)) {
      do
        n++, t += String.fromCharCode(w), w = e.charCodeAt(n);
      while (Te(w));
      return o = 15;
    }
    if (le(w))
      return n++, t += String.fromCharCode(w), w === 13 && e.charCodeAt(n) === 10 && (n++, t += `
`), s++, c = n, o = 14;
    switch (w) {
      case 123:
        return n++, o = 1;
      case 125:
        return n++, o = 2;
      case 91:
        return n++, o = 3;
      case 93:
        return n++, o = 4;
      case 58:
        return n++, o = 6;
      case 44:
        return n++, o = 5;
      case 34:
        return n++, t = A(), o = 10;
      case 47:
        var R = n - 1;
        if (e.charCodeAt(n + 1) === 47) {
          for (n += 2; n < i && !le(e.charCodeAt(n)); )
            n++;
          return t = e.substring(R, n), o = 12;
        }
        if (e.charCodeAt(n + 1) === 42) {
          n += 2;
          for (var L = i - 1, D = !1; n < L; ) {
            var P = e.charCodeAt(n);
            if (P === 42 && e.charCodeAt(n + 1) === 47) {
              n += 2, D = !0;
              break;
            }
            n++, le(P) && (P === 13 && e.charCodeAt(n) === 10 && n++, s++, c = n);
          }
          return D || (n++, p = 1), t = e.substring(R, n), o = 13;
        }
        return t += String.fromCharCode(w), n++, o = 16;
      case 45:
        if (t += String.fromCharCode(w), n++, n === i || !oe(e.charCodeAt(n)))
          return o = 16;
      case 48:
      case 49:
      case 50:
      case 51:
      case 52:
      case 53:
      case 54:
      case 55:
      case 56:
      case 57:
        return t += g(), o = 11;
      default:
        for (; n < i && I(w); )
          n++, w = e.charCodeAt(n);
        if (a !== n) {
          switch (t = e.substring(a, n), t) {
            case "true":
              return o = 8;
            case "false":
              return o = 9;
            case "null":
              return o = 7;
          }
          return o = 16;
        }
        return t += String.fromCharCode(w), n++, o = 16;
    }
  }
  function I(w) {
    if (Te(w) || le(w))
      return !1;
    switch (w) {
      case 125:
      case 93:
      case 123:
      case 91:
      case 34:
      case 58:
      case 44:
      case 47:
        return !1;
    }
    return !0;
  }
  function _() {
    var w;
    do
      w = k();
    while (w >= 12 && w <= 15);
    return w;
  }
  return {
    setPosition: h,
    getPosition: function() {
      return n;
    },
    scan: r ? _ : k,
    getToken: function() {
      return o;
    },
    getTokenValue: function() {
      return t;
    },
    getTokenOffset: function() {
      return a;
    },
    getTokenLength: function() {
      return n - a;
    },
    getTokenStartLine: function() {
      return u;
    },
    getTokenStartCharacter: function() {
      return a - l;
    },
    getTokenError: function() {
      return p;
    }
  };
}
function Te(e) {
  return e === 32 || e === 9 || e === 11 || e === 12 || e === 160 || e === 5760 || e >= 8192 && e <= 8203 || e === 8239 || e === 8287 || e === 12288 || e === 65279;
}
function le(e) {
  return e === 10 || e === 13 || e === 8232 || e === 8233;
}
function oe(e) {
  return e >= 48 && e <= 57;
}
var Ce;
(function(e) {
  e.DEFAULT = {
    allowTrailingComma: !1
  };
})(Ce || (Ce = {}));
function zt(e, r, i) {
  r === void 0 && (r = []), i === void 0 && (i = Ce.DEFAULT);
  var n = null, t = [], a = [];
  function o(u) {
    Array.isArray(t) ? t.push(u) : n !== null && (t[n] = u);
  }
  var s = {
    onObjectBegin: function() {
      var u = {};
      o(u), a.push(t), t = u, n = null;
    },
    onObjectProperty: function(u) {
      n = u;
    },
    onObjectEnd: function() {
      t = a.pop();
    },
    onArrayBegin: function() {
      var u = [];
      o(u), a.push(t), t = u, n = null;
    },
    onArrayEnd: function() {
      t = a.pop();
    },
    onLiteralValue: o,
    onError: function(u, c, l) {
      r.push({ error: u, offset: c, length: l });
    }
  };
  return Ht(e, s, i), t[0];
}
function Ne(e) {
  switch (e.type) {
    case "array":
      return e.children.map(Ne);
    case "object":
      for (var r = /* @__PURE__ */ Object.create(null), i = 0, n = e.children; i < n.length; i++) {
        var t = n[i], a = t.children[1];
        a && (r[t.children[0].value] = Ne(a));
      }
      return r;
    case "null":
    case "string":
    case "number":
    case "boolean":
      return e.value;
    default:
      return;
  }
}
function Ht(e, r, i) {
  i === void 0 && (i = Ce.DEFAULT);
  var n = $t(e, !1);
  function t(S) {
    return S ? function() {
      return S(n.getTokenOffset(), n.getTokenLength(), n.getTokenStartLine(), n.getTokenStartCharacter());
    } : function() {
      return !0;
    };
  }
  function a(S) {
    return S ? function(E) {
      return S(E, n.getTokenOffset(), n.getTokenLength(), n.getTokenStartLine(), n.getTokenStartCharacter());
    } : function() {
      return !0;
    };
  }
  var o = t(r.onObjectBegin), s = a(r.onObjectProperty), u = t(r.onObjectEnd), c = t(r.onArrayBegin), l = t(r.onArrayEnd), p = a(r.onLiteralValue), m = a(r.onSeparator), h = t(r.onComment), g = a(r.onError), A = i && i.disallowComments, k = i && i.allowTrailingComma;
  function I() {
    for (; ; ) {
      var S = n.scan();
      switch (n.getTokenError()) {
        case 4:
          _(
            14
            /* InvalidUnicode */
          );
          break;
        case 5:
          _(
            15
            /* InvalidEscapeCharacter */
          );
          break;
        case 3:
          _(
            13
            /* UnexpectedEndOfNumber */
          );
          break;
        case 1:
          A || _(
            11
            /* UnexpectedEndOfComment */
          );
          break;
        case 2:
          _(
            12
            /* UnexpectedEndOfString */
          );
          break;
        case 6:
          _(
            16
            /* InvalidCharacter */
          );
          break;
      }
      switch (S) {
        case 12:
        case 13:
          A ? _(
            10
            /* InvalidCommentToken */
          ) : h();
          break;
        case 16:
          _(
            1
            /* InvalidSymbol */
          );
          break;
        case 15:
        case 14:
          break;
        default:
          return S;
      }
    }
  }
  function _(S, E, T) {
    if (E === void 0 && (E = []), T === void 0 && (T = []), g(S), E.length + T.length > 0)
      for (var N = n.getToken(); N !== 17; ) {
        if (E.indexOf(N) !== -1) {
          I();
          break;
        } else if (T.indexOf(N) !== -1)
          break;
        N = I();
      }
  }
  function w(S) {
    var E = n.getTokenValue();
    return S ? p(E) : s(E), I(), !0;
  }
  function R() {
    switch (n.getToken()) {
      case 11:
        var S = n.getTokenValue(), E = Number(S);
        isNaN(E) && (_(
          2
          /* InvalidNumberFormat */
        ), E = 0), p(E);
        break;
      case 7:
        p(null);
        break;
      case 8:
        p(!0);
        break;
      case 9:
        p(!1);
        break;
      default:
        return !1;
    }
    return I(), !0;
  }
  function L() {
    return n.getToken() !== 10 ? (_(3, [], [
      2,
      5
      /* CommaToken */
    ]), !1) : (w(!1), n.getToken() === 6 ? (m(":"), I(), H() || _(4, [], [
      2,
      5
      /* CommaToken */
    ])) : _(5, [], [
      2,
      5
      /* CommaToken */
    ]), !0);
  }
  function D() {
    o(), I();
    for (var S = !1; n.getToken() !== 2 && n.getToken() !== 17; ) {
      if (n.getToken() === 5) {
        if (S || _(4, [], []), m(","), I(), n.getToken() === 2 && k)
          break;
      } else
        S && _(6, [], []);
      L() || _(4, [], [
        2,
        5
        /* CommaToken */
      ]), S = !0;
    }
    return u(), n.getToken() !== 2 ? _(7, [
      2
      /* CloseBraceToken */
    ], []) : I(), !0;
  }
  function P() {
    c(), I();
    for (var S = !1; n.getToken() !== 4 && n.getToken() !== 17; ) {
      if (n.getToken() === 5) {
        if (S || _(4, [], []), m(","), I(), n.getToken() === 4 && k)
          break;
      } else
        S && _(6, [], []);
      H() || _(4, [], [
        4,
        5
        /* CommaToken */
      ]), S = !0;
    }
    return l(), n.getToken() !== 4 ? _(8, [
      4
      /* CloseBracketToken */
    ], []) : I(), !0;
  }
  function H() {
    switch (n.getToken()) {
      case 3:
        return P();
      case 1:
        return D();
      case 10:
        return w(!0);
      default:
        return R();
    }
  }
  return I(), n.getToken() === 17 ? i.allowEmptyContent ? !0 : (_(4, [], []), !1) : H() ? (n.getToken() !== 17 && _(9, [], []), !0) : (_(4, [], []), !1);
}
var Jt = $t, Gt = zt, Xt = Ne;
function Zt(e) {
  return typeof e == "boolean";
}
var Be;
(function(e) {
  e.MIN_VALUE = -2147483648, e.MAX_VALUE = 2147483647;
})(Be || (Be = {}));
var _e;
(function(e) {
  e.MIN_VALUE = 0, e.MAX_VALUE = 2147483647;
})(_e || (_e = {}));
var G;
(function(e) {
  function r(n, t) {
    return n === Number.MAX_VALUE && (n = _e.MAX_VALUE), t === Number.MAX_VALUE && (t = _e.MAX_VALUE), { line: n, character: t };
  }
  e.create = r;
  function i(n) {
    var t = n;
    return f.objectLiteral(t) && f.uinteger(t.line) && f.uinteger(t.character);
  }
  e.is = i;
})(G || (G = {}));
var U;
(function(e) {
  function r(n, t, a, o) {
    if (f.uinteger(n) && f.uinteger(t) && f.uinteger(a) && f.uinteger(o))
      return { start: G.create(n, t), end: G.create(a, o) };
    if (G.is(n) && G.is(t))
      return { start: n, end: t };
    throw new Error("Range#create called with invalid arguments[" + n + ", " + t + ", " + a + ", " + o + "]");
  }
  e.create = r;
  function i(n) {
    var t = n;
    return f.objectLiteral(t) && G.is(t.start) && G.is(t.end);
  }
  e.is = i;
})(U || (U = {}));
var Me;
(function(e) {
  function r(n, t) {
    return { uri: n, range: t };
  }
  e.create = r;
  function i(n) {
    var t = n;
    return f.defined(t) && U.is(t.range) && (f.string(t.uri) || f.undefined(t.uri));
  }
  e.is = i;
})(Me || (Me = {}));
var ze;
(function(e) {
  function r(n, t, a, o) {
    return { targetUri: n, targetRange: t, targetSelectionRange: a, originSelectionRange: o };
  }
  e.create = r;
  function i(n) {
    var t = n;
    return f.defined(t) && U.is(t.targetRange) && f.string(t.targetUri) && (U.is(t.targetSelectionRange) || f.undefined(t.targetSelectionRange)) && (U.is(t.originSelectionRange) || f.undefined(t.originSelectionRange));
  }
  e.is = i;
})(ze || (ze = {}));
var $e;
(function(e) {
  function r(n, t, a, o) {
    return {
      red: n,
      green: t,
      blue: a,
      alpha: o
    };
  }
  e.create = r;
  function i(n) {
    var t = n;
    return f.numberRange(t.red, 0, 1) && f.numberRange(t.green, 0, 1) && f.numberRange(t.blue, 0, 1) && f.numberRange(t.alpha, 0, 1);
  }
  e.is = i;
})($e || ($e = {}));
var He;
(function(e) {
  function r(n, t) {
    return {
      range: n,
      color: t
    };
  }
  e.create = r;
  function i(n) {
    var t = n;
    return U.is(t.range) && $e.is(t.color);
  }
  e.is = i;
})(He || (He = {}));
var Je;
(function(e) {
  function r(n, t, a) {
    return {
      label: n,
      textEdit: t,
      additionalTextEdits: a
    };
  }
  e.create = r;
  function i(n) {
    var t = n;
    return f.string(t.label) && (f.undefined(t.textEdit) || te.is(t)) && (f.undefined(t.additionalTextEdits) || f.typedArray(t.additionalTextEdits, te.is));
  }
  e.is = i;
})(Je || (Je = {}));
var pe;
(function(e) {
  e.Comment = "comment", e.Imports = "imports", e.Region = "region";
})(pe || (pe = {}));
var Ge;
(function(e) {
  function r(n, t, a, o, s) {
    var u = {
      startLine: n,
      endLine: t
    };
    return f.defined(a) && (u.startCharacter = a), f.defined(o) && (u.endCharacter = o), f.defined(s) && (u.kind = s), u;
  }
  e.create = r;
  function i(n) {
    var t = n;
    return f.uinteger(t.startLine) && f.uinteger(t.startLine) && (f.undefined(t.startCharacter) || f.uinteger(t.startCharacter)) && (f.undefined(t.endCharacter) || f.uinteger(t.endCharacter)) && (f.undefined(t.kind) || f.string(t.kind));
  }
  e.is = i;
})(Ge || (Ge = {}));
var Fe;
(function(e) {
  function r(n, t) {
    return {
      location: n,
      message: t
    };
  }
  e.create = r;
  function i(n) {
    var t = n;
    return f.defined(t) && Me.is(t.location) && f.string(t.message);
  }
  e.is = i;
})(Fe || (Fe = {}));
var ue;
(function(e) {
  e.Error = 1, e.Warning = 2, e.Information = 3, e.Hint = 4;
})(ue || (ue = {}));
var Xe;
(function(e) {
  e.Unnecessary = 1, e.Deprecated = 2;
})(Xe || (Xe = {}));
var Ze;
(function(e) {
  function r(i) {
    var n = i;
    return n != null && f.string(n.href);
  }
  e.is = r;
})(Ze || (Ze = {}));
var Ie;
(function(e) {
  function r(n, t, a, o, s, u) {
    var c = { range: n, message: t };
    return f.defined(a) && (c.severity = a), f.defined(o) && (c.code = o), f.defined(s) && (c.source = s), f.defined(u) && (c.relatedInformation = u), c;
  }
  e.create = r;
  function i(n) {
    var t, a = n;
    return f.defined(a) && U.is(a.range) && f.string(a.message) && (f.number(a.severity) || f.undefined(a.severity)) && (f.integer(a.code) || f.string(a.code) || f.undefined(a.code)) && (f.undefined(a.codeDescription) || f.string((t = a.codeDescription) === null || t === void 0 ? void 0 : t.href)) && (f.string(a.source) || f.undefined(a.source)) && (f.undefined(a.relatedInformation) || f.typedArray(a.relatedInformation, Fe.is));
  }
  e.is = i;
})(Ie || (Ie = {}));
var me;
(function(e) {
  function r(n, t) {
    for (var a = [], o = 2; o < arguments.length; o++)
      a[o - 2] = arguments[o];
    var s = { title: n, command: t };
    return f.defined(a) && a.length > 0 && (s.arguments = a), s;
  }
  e.create = r;
  function i(n) {
    var t = n;
    return f.defined(t) && f.string(t.title) && f.string(t.command);
  }
  e.is = i;
})(me || (me = {}));
var te;
(function(e) {
  function r(a, o) {
    return { range: a, newText: o };
  }
  e.replace = r;
  function i(a, o) {
    return { range: { start: a, end: a }, newText: o };
  }
  e.insert = i;
  function n(a) {
    return { range: a, newText: "" };
  }
  e.del = n;
  function t(a) {
    var o = a;
    return f.objectLiteral(o) && f.string(o.newText) && U.is(o.range);
  }
  e.is = t;
})(te || (te = {}));
var ce;
(function(e) {
  function r(n, t, a) {
    var o = { label: n };
    return t !== void 0 && (o.needsConfirmation = t), a !== void 0 && (o.description = a), o;
  }
  e.create = r;
  function i(n) {
    var t = n;
    return t !== void 0 && f.objectLiteral(t) && f.string(t.label) && (f.boolean(t.needsConfirmation) || t.needsConfirmation === void 0) && (f.string(t.description) || t.description === void 0);
  }
  e.is = i;
})(ce || (ce = {}));
var W;
(function(e) {
  function r(i) {
    var n = i;
    return typeof n == "string";
  }
  e.is = r;
})(W || (W = {}));
var ee;
(function(e) {
  function r(a, o, s) {
    return { range: a, newText: o, annotationId: s };
  }
  e.replace = r;
  function i(a, o, s) {
    return { range: { start: a, end: a }, newText: o, annotationId: s };
  }
  e.insert = i;
  function n(a, o) {
    return { range: a, newText: "", annotationId: o };
  }
  e.del = n;
  function t(a) {
    var o = a;
    return te.is(o) && (ce.is(o.annotationId) || W.is(o.annotationId));
  }
  e.is = t;
})(ee || (ee = {}));
var je;
(function(e) {
  function r(n, t) {
    return { textDocument: n, edits: t };
  }
  e.create = r;
  function i(n) {
    var t = n;
    return f.defined(t) && Ee.is(t.textDocument) && Array.isArray(t.edits);
  }
  e.is = i;
})(je || (je = {}));
var ve;
(function(e) {
  function r(n, t, a) {
    var o = {
      kind: "create",
      uri: n
    };
    return t !== void 0 && (t.overwrite !== void 0 || t.ignoreIfExists !== void 0) && (o.options = t), a !== void 0 && (o.annotationId = a), o;
  }
  e.create = r;
  function i(n) {
    var t = n;
    return t && t.kind === "create" && f.string(t.uri) && (t.options === void 0 || (t.options.overwrite === void 0 || f.boolean(t.options.overwrite)) && (t.options.ignoreIfExists === void 0 || f.boolean(t.options.ignoreIfExists))) && (t.annotationId === void 0 || W.is(t.annotationId));
  }
  e.is = i;
})(ve || (ve = {}));
var ye;
(function(e) {
  function r(n, t, a, o) {
    var s = {
      kind: "rename",
      oldUri: n,
      newUri: t
    };
    return a !== void 0 && (a.overwrite !== void 0 || a.ignoreIfExists !== void 0) && (s.options = a), o !== void 0 && (s.annotationId = o), s;
  }
  e.create = r;
  function i(n) {
    var t = n;
    return t && t.kind === "rename" && f.string(t.oldUri) && f.string(t.newUri) && (t.options === void 0 || (t.options.overwrite === void 0 || f.boolean(t.options.overwrite)) && (t.options.ignoreIfExists === void 0 || f.boolean(t.options.ignoreIfExists))) && (t.annotationId === void 0 || W.is(t.annotationId));
  }
  e.is = i;
})(ye || (ye = {}));
var be;
(function(e) {
  function r(n, t, a) {
    var o = {
      kind: "delete",
      uri: n
    };
    return t !== void 0 && (t.recursive !== void 0 || t.ignoreIfNotExists !== void 0) && (o.options = t), a !== void 0 && (o.annotationId = a), o;
  }
  e.create = r;
  function i(n) {
    var t = n;
    return t && t.kind === "delete" && f.string(t.uri) && (t.options === void 0 || (t.options.recursive === void 0 || f.boolean(t.options.recursive)) && (t.options.ignoreIfNotExists === void 0 || f.boolean(t.options.ignoreIfNotExists))) && (t.annotationId === void 0 || W.is(t.annotationId));
  }
  e.is = i;
})(be || (be = {}));
var De;
(function(e) {
  function r(i) {
    var n = i;
    return n && (n.changes !== void 0 || n.documentChanges !== void 0) && (n.documentChanges === void 0 || n.documentChanges.every(function(t) {
      return f.string(t.kind) ? ve.is(t) || ye.is(t) || be.is(t) : je.is(t);
    }));
  }
  e.is = r;
})(De || (De = {}));
var Se = (
  /** @class */
  function() {
    function e(r, i) {
      this.edits = r, this.changeAnnotations = i;
    }
    return e.prototype.insert = function(r, i, n) {
      var t, a;
      if (n === void 0 ? t = te.insert(r, i) : W.is(n) ? (a = n, t = ee.insert(r, i, n)) : (this.assertChangeAnnotations(this.changeAnnotations), a = this.changeAnnotations.manage(n), t = ee.insert(r, i, a)), this.edits.push(t), a !== void 0)
        return a;
    }, e.prototype.replace = function(r, i, n) {
      var t, a;
      if (n === void 0 ? t = te.replace(r, i) : W.is(n) ? (a = n, t = ee.replace(r, i, n)) : (this.assertChangeAnnotations(this.changeAnnotations), a = this.changeAnnotations.manage(n), t = ee.replace(r, i, a)), this.edits.push(t), a !== void 0)
        return a;
    }, e.prototype.delete = function(r, i) {
      var n, t;
      if (i === void 0 ? n = te.del(r) : W.is(i) ? (t = i, n = ee.del(r, i)) : (this.assertChangeAnnotations(this.changeAnnotations), t = this.changeAnnotations.manage(i), n = ee.del(r, t)), this.edits.push(n), t !== void 0)
        return t;
    }, e.prototype.add = function(r) {
      this.edits.push(r);
    }, e.prototype.all = function() {
      return this.edits;
    }, e.prototype.clear = function() {
      this.edits.splice(0, this.edits.length);
    }, e.prototype.assertChangeAnnotations = function(r) {
      if (r === void 0)
        throw new Error("Text edit change is not configured to manage change annotations.");
    }, e;
  }()
), Ye = (
  /** @class */
  function() {
    function e(r) {
      this._annotations = r === void 0 ? /* @__PURE__ */ Object.create(null) : r, this._counter = 0, this._size = 0;
    }
    return e.prototype.all = function() {
      return this._annotations;
    }, Object.defineProperty(e.prototype, "size", {
      get: function() {
        return this._size;
      },
      enumerable: !1,
      configurable: !0
    }), e.prototype.manage = function(r, i) {
      var n;
      if (W.is(r) ? n = r : (n = this.nextId(), i = r), this._annotations[n] !== void 0)
        throw new Error("Id " + n + " is already in use.");
      if (i === void 0)
        throw new Error("No annotation provided for id " + n);
      return this._annotations[n] = i, this._size++, n;
    }, e.prototype.nextId = function() {
      return this._counter++, this._counter.toString();
    }, e;
  }()
);
(function() {
  function e(r) {
    var i = this;
    this._textEditChanges = /* @__PURE__ */ Object.create(null), r !== void 0 ? (this._workspaceEdit = r, r.documentChanges ? (this._changeAnnotations = new Ye(r.changeAnnotations), r.changeAnnotations = this._changeAnnotations.all(), r.documentChanges.forEach(function(n) {
      if (je.is(n)) {
        var t = new Se(n.edits, i._changeAnnotations);
        i._textEditChanges[n.textDocument.uri] = t;
      }
    })) : r.changes && Object.keys(r.changes).forEach(function(n) {
      var t = new Se(r.changes[n]);
      i._textEditChanges[n] = t;
    })) : this._workspaceEdit = {};
  }
  return Object.defineProperty(e.prototype, "edit", {
    /**
     * Returns the underlying [WorkspaceEdit](#WorkspaceEdit) literal
     * use to be returned from a workspace edit operation like rename.
     */
    get: function() {
      return this.initDocumentChanges(), this._changeAnnotations !== void 0 && (this._changeAnnotations.size === 0 ? this._workspaceEdit.changeAnnotations = void 0 : this._workspaceEdit.changeAnnotations = this._changeAnnotations.all()), this._workspaceEdit;
    },
    enumerable: !1,
    configurable: !0
  }), e.prototype.getTextEditChange = function(r) {
    if (Ee.is(r)) {
      if (this.initDocumentChanges(), this._workspaceEdit.documentChanges === void 0)
        throw new Error("Workspace edit is not configured for document changes.");
      var i = { uri: r.uri, version: r.version }, n = this._textEditChanges[i.uri];
      if (!n) {
        var t = [], a = {
          textDocument: i,
          edits: t
        };
        this._workspaceEdit.documentChanges.push(a), n = new Se(t, this._changeAnnotations), this._textEditChanges[i.uri] = n;
      }
      return n;
    } else {
      if (this.initChanges(), this._workspaceEdit.changes === void 0)
        throw new Error("Workspace edit is not configured for normal text edit changes.");
      var n = this._textEditChanges[r];
      if (!n) {
        var t = [];
        this._workspaceEdit.changes[r] = t, n = new Se(t), this._textEditChanges[r] = n;
      }
      return n;
    }
  }, e.prototype.initDocumentChanges = function() {
    this._workspaceEdit.documentChanges === void 0 && this._workspaceEdit.changes === void 0 && (this._changeAnnotations = new Ye(), this._workspaceEdit.documentChanges = [], this._workspaceEdit.changeAnnotations = this._changeAnnotations.all());
  }, e.prototype.initChanges = function() {
    this._workspaceEdit.documentChanges === void 0 && this._workspaceEdit.changes === void 0 && (this._workspaceEdit.changes = /* @__PURE__ */ Object.create(null));
  }, e.prototype.createFile = function(r, i, n) {
    if (this.initDocumentChanges(), this._workspaceEdit.documentChanges === void 0)
      throw new Error("Workspace edit is not configured for document changes.");
    var t;
    ce.is(i) || W.is(i) ? t = i : n = i;
    var a, o;
    if (t === void 0 ? a = ve.create(r, n) : (o = W.is(t) ? t : this._changeAnnotations.manage(t), a = ve.create(r, n, o)), this._workspaceEdit.documentChanges.push(a), o !== void 0)
      return o;
  }, e.prototype.renameFile = function(r, i, n, t) {
    if (this.initDocumentChanges(), this._workspaceEdit.documentChanges === void 0)
      throw new Error("Workspace edit is not configured for document changes.");
    var a;
    ce.is(n) || W.is(n) ? a = n : t = n;
    var o, s;
    if (a === void 0 ? o = ye.create(r, i, t) : (s = W.is(a) ? a : this._changeAnnotations.manage(a), o = ye.create(r, i, t, s)), this._workspaceEdit.documentChanges.push(o), s !== void 0)
      return s;
  }, e.prototype.deleteFile = function(r, i, n) {
    if (this.initDocumentChanges(), this._workspaceEdit.documentChanges === void 0)
      throw new Error("Workspace edit is not configured for document changes.");
    var t;
    ce.is(i) || W.is(i) ? t = i : n = i;
    var a, o;
    if (t === void 0 ? a = be.create(r, n) : (o = W.is(t) ? t : this._changeAnnotations.manage(t), a = be.create(r, n, o)), this._workspaceEdit.documentChanges.push(a), o !== void 0)
      return o;
  }, e;
})();
var Qe;
(function(e) {
  function r(n) {
    return { uri: n };
  }
  e.create = r;
  function i(n) {
    var t = n;
    return f.defined(t) && f.string(t.uri);
  }
  e.is = i;
})(Qe || (Qe = {}));
var Ke;
(function(e) {
  function r(n, t) {
    return { uri: n, version: t };
  }
  e.create = r;
  function i(n) {
    var t = n;
    return f.defined(t) && f.string(t.uri) && f.integer(t.version);
  }
  e.is = i;
})(Ke || (Ke = {}));
var Ee;
(function(e) {
  function r(n, t) {
    return { uri: n, version: t };
  }
  e.create = r;
  function i(n) {
    var t = n;
    return f.defined(t) && f.string(t.uri) && (t.version === null || f.integer(t.version));
  }
  e.is = i;
})(Ee || (Ee = {}));
var et;
(function(e) {
  function r(n, t, a, o) {
    return { uri: n, languageId: t, version: a, text: o };
  }
  e.create = r;
  function i(n) {
    var t = n;
    return f.defined(t) && f.string(t.uri) && f.string(t.languageId) && f.integer(t.version) && f.string(t.text);
  }
  e.is = i;
})(et || (et = {}));
var ne;
(function(e) {
  e.PlainText = "plaintext", e.Markdown = "markdown";
})(ne || (ne = {}));
(function(e) {
  function r(i) {
    var n = i;
    return n === e.PlainText || n === e.Markdown;
  }
  e.is = r;
})(ne || (ne = {}));
var Le;
(function(e) {
  function r(i) {
    var n = i;
    return f.objectLiteral(i) && ne.is(n.kind) && f.string(n.value);
  }
  e.is = r;
})(Le || (Le = {}));
var $;
(function(e) {
  e.Text = 1, e.Method = 2, e.Function = 3, e.Constructor = 4, e.Field = 5, e.Variable = 6, e.Class = 7, e.Interface = 8, e.Module = 9, e.Property = 10, e.Unit = 11, e.Value = 12, e.Enum = 13, e.Keyword = 14, e.Snippet = 15, e.Color = 16, e.File = 17, e.Reference = 18, e.Folder = 19, e.EnumMember = 20, e.Constant = 21, e.Struct = 22, e.Event = 23, e.Operator = 24, e.TypeParameter = 25;
})($ || ($ = {}));
var Ue;
(function(e) {
  e.PlainText = 1, e.Snippet = 2;
})(Ue || (Ue = {}));
var tt;
(function(e) {
  e.Deprecated = 1;
})(tt || (tt = {}));
var nt;
(function(e) {
  function r(n, t, a) {
    return { newText: n, insert: t, replace: a };
  }
  e.create = r;
  function i(n) {
    var t = n;
    return t && f.string(t.newText) && U.is(t.insert) && U.is(t.replace);
  }
  e.is = i;
})(nt || (nt = {}));
var rt;
(function(e) {
  e.asIs = 1, e.adjustIndentation = 2;
})(rt || (rt = {}));
var it;
(function(e) {
  function r(i) {
    return { label: i };
  }
  e.create = r;
})(it || (it = {}));
var at;
(function(e) {
  function r(i, n) {
    return { items: i || [], isIncomplete: !!n };
  }
  e.create = r;
})(at || (at = {}));
var Oe;
(function(e) {
  function r(n) {
    return n.replace(/[\\`*_{}[\]()#+\-.!]/g, "\\$&");
  }
  e.fromPlainText = r;
  function i(n) {
    var t = n;
    return f.string(t) || f.objectLiteral(t) && f.string(t.language) && f.string(t.value);
  }
  e.is = i;
})(Oe || (Oe = {}));
var ot;
(function(e) {
  function r(i) {
    var n = i;
    return !!n && f.objectLiteral(n) && (Le.is(n.contents) || Oe.is(n.contents) || f.typedArray(n.contents, Oe.is)) && (i.range === void 0 || U.is(i.range));
  }
  e.is = r;
})(ot || (ot = {}));
var st;
(function(e) {
  function r(i, n) {
    return n ? { label: i, documentation: n } : { label: i };
  }
  e.create = r;
})(st || (st = {}));
var ut;
(function(e) {
  function r(i, n) {
    for (var t = [], a = 2; a < arguments.length; a++)
      t[a - 2] = arguments[a];
    var o = { label: i };
    return f.defined(n) && (o.documentation = n), f.defined(t) ? o.parameters = t : o.parameters = [], o;
  }
  e.create = r;
})(ut || (ut = {}));
var ct;
(function(e) {
  e.Text = 1, e.Read = 2, e.Write = 3;
})(ct || (ct = {}));
var ft;
(function(e) {
  function r(i, n) {
    var t = { range: i };
    return f.number(n) && (t.kind = n), t;
  }
  e.create = r;
})(ft || (ft = {}));
var F;
(function(e) {
  e.File = 1, e.Module = 2, e.Namespace = 3, e.Package = 4, e.Class = 5, e.Method = 6, e.Property = 7, e.Field = 8, e.Constructor = 9, e.Enum = 10, e.Interface = 11, e.Function = 12, e.Variable = 13, e.Constant = 14, e.String = 15, e.Number = 16, e.Boolean = 17, e.Array = 18, e.Object = 19, e.Key = 20, e.Null = 21, e.EnumMember = 22, e.Struct = 23, e.Event = 24, e.Operator = 25, e.TypeParameter = 26;
})(F || (F = {}));
var lt;
(function(e) {
  e.Deprecated = 1;
})(lt || (lt = {}));
var ht;
(function(e) {
  function r(i, n, t, a, o) {
    var s = {
      name: i,
      kind: n,
      location: { uri: a, range: t }
    };
    return o && (s.containerName = o), s;
  }
  e.create = r;
})(ht || (ht = {}));
var dt;
(function(e) {
  function r(n, t, a, o, s, u) {
    var c = {
      name: n,
      detail: t,
      kind: a,
      range: o,
      selectionRange: s
    };
    return u !== void 0 && (c.children = u), c;
  }
  e.create = r;
  function i(n) {
    var t = n;
    return t && f.string(t.name) && f.number(t.kind) && U.is(t.range) && U.is(t.selectionRange) && (t.detail === void 0 || f.string(t.detail)) && (t.deprecated === void 0 || f.boolean(t.deprecated)) && (t.children === void 0 || Array.isArray(t.children)) && (t.tags === void 0 || Array.isArray(t.tags));
  }
  e.is = i;
})(dt || (dt = {}));
var gt;
(function(e) {
  e.Empty = "", e.QuickFix = "quickfix", e.Refactor = "refactor", e.RefactorExtract = "refactor.extract", e.RefactorInline = "refactor.inline", e.RefactorRewrite = "refactor.rewrite", e.Source = "source", e.SourceOrganizeImports = "source.organizeImports", e.SourceFixAll = "source.fixAll";
})(gt || (gt = {}));
var pt;
(function(e) {
  function r(n, t) {
    var a = { diagnostics: n };
    return t != null && (a.only = t), a;
  }
  e.create = r;
  function i(n) {
    var t = n;
    return f.defined(t) && f.typedArray(t.diagnostics, Ie.is) && (t.only === void 0 || f.typedArray(t.only, f.string));
  }
  e.is = i;
})(pt || (pt = {}));
var mt;
(function(e) {
  function r(n, t, a) {
    var o = { title: n }, s = !0;
    return typeof t == "string" ? (s = !1, o.kind = t) : me.is(t) ? o.command = t : o.edit = t, s && a !== void 0 && (o.kind = a), o;
  }
  e.create = r;
  function i(n) {
    var t = n;
    return t && f.string(t.title) && (t.diagnostics === void 0 || f.typedArray(t.diagnostics, Ie.is)) && (t.kind === void 0 || f.string(t.kind)) && (t.edit !== void 0 || t.command !== void 0) && (t.command === void 0 || me.is(t.command)) && (t.isPreferred === void 0 || f.boolean(t.isPreferred)) && (t.edit === void 0 || De.is(t.edit));
  }
  e.is = i;
})(mt || (mt = {}));
var vt;
(function(e) {
  function r(n, t) {
    var a = { range: n };
    return f.defined(t) && (a.data = t), a;
  }
  e.create = r;
  function i(n) {
    var t = n;
    return f.defined(t) && U.is(t.range) && (f.undefined(t.command) || me.is(t.command));
  }
  e.is = i;
})(vt || (vt = {}));
var yt;
(function(e) {
  function r(n, t) {
    return { tabSize: n, insertSpaces: t };
  }
  e.create = r;
  function i(n) {
    var t = n;
    return f.defined(t) && f.uinteger(t.tabSize) && f.boolean(t.insertSpaces);
  }
  e.is = i;
})(yt || (yt = {}));
var bt;
(function(e) {
  function r(n, t, a) {
    return { range: n, target: t, data: a };
  }
  e.create = r;
  function i(n) {
    var t = n;
    return f.defined(t) && U.is(t.range) && (f.undefined(t.target) || f.string(t.target));
  }
  e.is = i;
})(bt || (bt = {}));
var wt;
(function(e) {
  function r(n, t) {
    return { range: n, parent: t };
  }
  e.create = r;
  function i(n) {
    var t = n;
    return t !== void 0 && U.is(t.range) && (t.parent === void 0 || e.is(t.parent));
  }
  e.is = i;
})(wt || (wt = {}));
var At;
(function(e) {
  function r(a, o, s, u) {
    return new Yt(a, o, s, u);
  }
  e.create = r;
  function i(a) {
    var o = a;
    return !!(f.defined(o) && f.string(o.uri) && (f.undefined(o.languageId) || f.string(o.languageId)) && f.uinteger(o.lineCount) && f.func(o.getText) && f.func(o.positionAt) && f.func(o.offsetAt));
  }
  e.is = i;
  function n(a, o) {
    for (var s = a.getText(), u = t(o, function(g, A) {
      var k = g.range.start.line - A.range.start.line;
      return k === 0 ? g.range.start.character - A.range.start.character : k;
    }), c = s.length, l = u.length - 1; l >= 0; l--) {
      var p = u[l], m = a.offsetAt(p.range.start), h = a.offsetAt(p.range.end);
      if (h <= c)
        s = s.substring(0, m) + p.newText + s.substring(h, s.length);
      else
        throw new Error("Overlapping edit");
      c = m;
    }
    return s;
  }
  e.applyEdits = n;
  function t(a, o) {
    if (a.length <= 1)
      return a;
    var s = a.length / 2 | 0, u = a.slice(0, s), c = a.slice(s);
    t(u, o), t(c, o);
    for (var l = 0, p = 0, m = 0; l < u.length && p < c.length; ) {
      var h = o(u[l], c[p]);
      h <= 0 ? a[m++] = u[l++] : a[m++] = c[p++];
    }
    for (; l < u.length; )
      a[m++] = u[l++];
    for (; p < c.length; )
      a[m++] = c[p++];
    return a;
  }
})(At || (At = {}));
var Yt = (
  /** @class */
  function() {
    function e(r, i, n, t) {
      this._uri = r, this._languageId = i, this._version = n, this._content = t, this._lineOffsets = void 0;
    }
    return Object.defineProperty(e.prototype, "uri", {
      get: function() {
        return this._uri;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "languageId", {
      get: function() {
        return this._languageId;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "version", {
      get: function() {
        return this._version;
      },
      enumerable: !1,
      configurable: !0
    }), e.prototype.getText = function(r) {
      if (r) {
        var i = this.offsetAt(r.start), n = this.offsetAt(r.end);
        return this._content.substring(i, n);
      }
      return this._content;
    }, e.prototype.update = function(r, i) {
      this._content = r.text, this._version = i, this._lineOffsets = void 0;
    }, e.prototype.getLineOffsets = function() {
      if (this._lineOffsets === void 0) {
        for (var r = [], i = this._content, n = !0, t = 0; t < i.length; t++) {
          n && (r.push(t), n = !1);
          var a = i.charAt(t);
          n = a === "\r" || a === `
`, a === "\r" && t + 1 < i.length && i.charAt(t + 1) === `
` && t++;
        }
        n && i.length > 0 && r.push(i.length), this._lineOffsets = r;
      }
      return this._lineOffsets;
    }, e.prototype.positionAt = function(r) {
      r = Math.max(Math.min(r, this._content.length), 0);
      var i = this.getLineOffsets(), n = 0, t = i.length;
      if (t === 0)
        return G.create(0, r);
      for (; n < t; ) {
        var a = Math.floor((n + t) / 2);
        i[a] > r ? t = a : n = a + 1;
      }
      var o = n - 1;
      return G.create(o, r - i[o]);
    }, e.prototype.offsetAt = function(r) {
      var i = this.getLineOffsets();
      if (r.line >= i.length)
        return this._content.length;
      if (r.line < 0)
        return 0;
      var n = i[r.line], t = r.line + 1 < i.length ? i[r.line + 1] : this._content.length;
      return Math.max(Math.min(n + r.character, t), n);
    }, Object.defineProperty(e.prototype, "lineCount", {
      get: function() {
        return this.getLineOffsets().length;
      },
      enumerable: !1,
      configurable: !0
    }), e;
  }()
), f;
(function(e) {
  var r = Object.prototype.toString;
  function i(h) {
    return typeof h < "u";
  }
  e.defined = i;
  function n(h) {
    return typeof h > "u";
  }
  e.undefined = n;
  function t(h) {
    return h === !0 || h === !1;
  }
  e.boolean = t;
  function a(h) {
    return r.call(h) === "[object String]";
  }
  e.string = a;
  function o(h) {
    return r.call(h) === "[object Number]";
  }
  e.number = o;
  function s(h, g, A) {
    return r.call(h) === "[object Number]" && g <= h && h <= A;
  }
  e.numberRange = s;
  function u(h) {
    return r.call(h) === "[object Number]" && -2147483648 <= h && h <= 2147483647;
  }
  e.integer = u;
  function c(h) {
    return r.call(h) === "[object Number]" && 0 <= h && h <= 2147483647;
  }
  e.uinteger = c;
  function l(h) {
    return r.call(h) === "[object Function]";
  }
  e.func = l;
  function p(h) {
    return h !== null && typeof h == "object";
  }
  e.objectLiteral = p;
  function m(h, g) {
    return Array.isArray(h) && h.every(g);
  }
  e.typedArray = m;
})(f || (f = {}));
var St = (
  /** @class */
  function() {
    function e(r, i, n, t) {
      this._uri = r, this._languageId = i, this._version = n, this._content = t, this._lineOffsets = void 0;
    }
    return Object.defineProperty(e.prototype, "uri", {
      get: function() {
        return this._uri;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "languageId", {
      get: function() {
        return this._languageId;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "version", {
      get: function() {
        return this._version;
      },
      enumerable: !0,
      configurable: !0
    }), e.prototype.getText = function(r) {
      if (r) {
        var i = this.offsetAt(r.start), n = this.offsetAt(r.end);
        return this._content.substring(i, n);
      }
      return this._content;
    }, e.prototype.update = function(r, i) {
      for (var n = 0, t = r; n < t.length; n++) {
        var a = t[n];
        if (e.isIncremental(a)) {
          var o = Ft(a.range), s = this.offsetAt(o.start), u = this.offsetAt(o.end);
          this._content = this._content.substring(0, s) + a.text + this._content.substring(u, this._content.length);
          var c = Math.max(o.start.line, 0), l = Math.max(o.end.line, 0), p = this._lineOffsets, m = Ct(a.text, !1, s);
          if (l - c === m.length)
            for (var h = 0, g = m.length; h < g; h++)
              p[h + c + 1] = m[h];
          else
            m.length < 1e4 ? p.splice.apply(p, [c + 1, l - c].concat(m)) : this._lineOffsets = p = p.slice(0, c + 1).concat(m, p.slice(l + 1));
          var A = a.text.length - (u - s);
          if (A !== 0)
            for (var h = c + 1 + m.length, g = p.length; h < g; h++)
              p[h] = p[h] + A;
        } else if (e.isFull(a))
          this._content = a.text, this._lineOffsets = void 0;
        else
          throw new Error("Unknown change event received");
      }
      this._version = i;
    }, e.prototype.getLineOffsets = function() {
      return this._lineOffsets === void 0 && (this._lineOffsets = Ct(this._content, !0)), this._lineOffsets;
    }, e.prototype.positionAt = function(r) {
      r = Math.max(Math.min(r, this._content.length), 0);
      var i = this.getLineOffsets(), n = 0, t = i.length;
      if (t === 0)
        return { line: 0, character: r };
      for (; n < t; ) {
        var a = Math.floor((n + t) / 2);
        i[a] > r ? t = a : n = a + 1;
      }
      var o = n - 1;
      return { line: o, character: r - i[o] };
    }, e.prototype.offsetAt = function(r) {
      var i = this.getLineOffsets();
      if (r.line >= i.length)
        return this._content.length;
      if (r.line < 0)
        return 0;
      var n = i[r.line], t = r.line + 1 < i.length ? i[r.line + 1] : this._content.length;
      return Math.max(Math.min(n + r.character, t), n);
    }, Object.defineProperty(e.prototype, "lineCount", {
      get: function() {
        return this.getLineOffsets().length;
      },
      enumerable: !0,
      configurable: !0
    }), e.isIncremental = function(r) {
      var i = r;
      return i != null && typeof i.text == "string" && i.range !== void 0 && (i.rangeLength === void 0 || typeof i.rangeLength == "number");
    }, e.isFull = function(r) {
      var i = r;
      return i != null && typeof i.text == "string" && i.range === void 0 && i.rangeLength === void 0;
    }, e;
  }()
), kt;
(function(e) {
  function r(t, a, o, s) {
    return new St(t, a, o, s);
  }
  e.create = r;
  function i(t, a, o) {
    if (t instanceof St)
      return t.update(a, o), t;
    throw new Error("TextDocument.update: document must be created by TextDocument.create");
  }
  e.update = i;
  function n(t, a) {
    for (var o = t.getText(), s = qe(a.map(Qt), function(g, A) {
      var k = g.range.start.line - A.range.start.line;
      return k === 0 ? g.range.start.character - A.range.start.character : k;
    }), u = 0, c = [], l = 0, p = s; l < p.length; l++) {
      var m = p[l], h = t.offsetAt(m.range.start);
      if (h < u)
        throw new Error("Overlapping edit");
      h > u && c.push(o.substring(u, h)), m.newText.length && c.push(m.newText), u = t.offsetAt(m.range.end);
    }
    return c.push(o.substr(u)), c.join("");
  }
  e.applyEdits = n;
})(kt || (kt = {}));
function qe(e, r) {
  if (e.length <= 1)
    return e;
  var i = e.length / 2 | 0, n = e.slice(0, i), t = e.slice(i);
  qe(n, r), qe(t, r);
  for (var a = 0, o = 0, s = 0; a < n.length && o < t.length; ) {
    var u = r(n[a], t[o]);
    u <= 0 ? e[s++] = n[a++] : e[s++] = t[o++];
  }
  for (; a < n.length; )
    e[s++] = n[a++];
  for (; o < t.length; )
    e[s++] = t[o++];
  return e;
}
function Ct(e, r, i) {
  i === void 0 && (i = 0);
  for (var n = r ? [i] : [], t = 0; t < e.length; t++) {
    var a = e.charCodeAt(t);
    (a === 13 || a === 10) && (a === 13 && t + 1 < e.length && e.charCodeAt(t + 1) === 10 && t++, n.push(i + t + 1));
  }
  return n;
}
function Ft(e) {
  var r = e.start, i = e.end;
  return r.line > i.line || r.line === i.line && r.character > i.character ? { start: i, end: r } : e;
}
function Qt(e) {
  var r = Ft(e.range);
  return r !== e.range ? { newText: e.newText, range: r } : e;
}
var _t;
(function(e) {
  e[e.Undefined = 0] = "Undefined", e[e.EnumValueMismatch = 1] = "EnumValueMismatch", e[e.Deprecated = 2] = "Deprecated", e[e.UnexpectedEndOfComment = 257] = "UnexpectedEndOfComment", e[e.UnexpectedEndOfString = 258] = "UnexpectedEndOfString", e[e.UnexpectedEndOfNumber = 259] = "UnexpectedEndOfNumber", e[e.InvalidUnicode = 260] = "InvalidUnicode", e[e.InvalidEscapeCharacter = 261] = "InvalidEscapeCharacter", e[e.InvalidCharacter = 262] = "InvalidCharacter", e[e.PropertyExpected = 513] = "PropertyExpected", e[e.CommaExpected = 514] = "CommaExpected", e[e.ColonExpected = 515] = "ColonExpected", e[e.ValueExpected = 516] = "ValueExpected", e[e.CommaOrCloseBacketExpected = 517] = "CommaOrCloseBacketExpected", e[e.CommaOrCloseBraceExpected = 518] = "CommaOrCloseBraceExpected", e[e.TrailingComma = 519] = "TrailingComma", e[e.DuplicateKey = 520] = "DuplicateKey", e[e.CommentNotPermitted = 521] = "CommentNotPermitted", e[e.SchemaResolveError = 768] = "SchemaResolveError";
})(_t || (_t = {}));
var It;
(function(e) {
  e.LATEST = {
    textDocument: {
      completion: {
        completionItem: {
          documentationFormat: [ne.Markdown, ne.PlainText],
          commitCharactersSupport: !0
        }
      }
    }
  };
})(It || (It = {}));
function Kt(e, r) {
  var i;
  return r.length === 0 ? i = e : i = e.replace(/\{(\d+)\}/g, function(n, t) {
    var a = t[0];
    return typeof r[a] < "u" ? r[a] : n;
  }), i;
}
function en(e, r) {
  for (var i = [], n = 2; n < arguments.length; n++)
    i[n - 2] = arguments[n];
  return Kt(r, i);
}
function We(e) {
  return en;
}
var re = globalThis && globalThis.__extends || function() {
  var e = function(r, i) {
    return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, t) {
      n.__proto__ = t;
    } || function(n, t) {
      for (var a in t)
        Object.prototype.hasOwnProperty.call(t, a) && (n[a] = t[a]);
    }, e(r, i);
  };
  return function(r, i) {
    e(r, i);
    function n() {
      this.constructor = r;
    }
    r.prototype = i === null ? Object.create(i) : (n.prototype = i.prototype, new n());
  };
}(), he = We();
he("colorHexFormatWarning", "Invalid color format. Use #RGB, #RGBA, #RRGGBB or #RRGGBBAA."), he("dateTimeFormatWarning", "String is not a RFC3339 date-time."), he("dateFormatWarning", "String is not a RFC3339 date."), he("timeFormatWarning", "String is not a RFC3339 time."), he("emailFormatWarning", "String is not an e-mail address.");
var ie = (
  /** @class */
  function() {
    function e(r, i, n) {
      n === void 0 && (n = 0), this.offset = i, this.length = n, this.parent = r;
    }
    return Object.defineProperty(e.prototype, "children", {
      get: function() {
        return [];
      },
      enumerable: !1,
      configurable: !0
    }), e.prototype.toString = function() {
      return "type: " + this.type + " (" + this.offset + "/" + this.length + ")" + (this.parent ? " parent: {" + this.parent.toString() + "}" : "");
    }, e;
  }()
);
(function(e) {
  re(r, e);
  function r(i, n) {
    var t = e.call(this, i, n) || this;
    return t.type = "null", t.value = null, t;
  }
  return r;
})(ie);
(function(e) {
  re(r, e);
  function r(i, n, t) {
    var a = e.call(this, i, t) || this;
    return a.type = "boolean", a.value = n, a;
  }
  return r;
})(ie);
(function(e) {
  re(r, e);
  function r(i, n) {
    var t = e.call(this, i, n) || this;
    return t.type = "array", t.items = [], t;
  }
  return Object.defineProperty(r.prototype, "children", {
    get: function() {
      return this.items;
    },
    enumerable: !1,
    configurable: !0
  }), r;
})(ie);
(function(e) {
  re(r, e);
  function r(i, n) {
    var t = e.call(this, i, n) || this;
    return t.type = "number", t.isInteger = !0, t.value = Number.NaN, t;
  }
  return r;
})(ie);
(function(e) {
  re(r, e);
  function r(i, n, t) {
    var a = e.call(this, i, n, t) || this;
    return a.type = "string", a.value = "", a;
  }
  return r;
})(ie);
(function(e) {
  re(r, e);
  function r(i, n, t) {
    var a = e.call(this, i, n) || this;
    return a.type = "property", a.colonOffset = -1, a.keyNode = t, a;
  }
  return Object.defineProperty(r.prototype, "children", {
    get: function() {
      return this.valueNode ? [this.keyNode, this.valueNode] : [this.keyNode];
    },
    enumerable: !1,
    configurable: !0
  }), r;
})(ie);
(function(e) {
  re(r, e);
  function r(i, n) {
    var t = e.call(this, i, n) || this;
    return t.type = "object", t.properties = [], t;
  }
  return Object.defineProperty(r.prototype, "children", {
    get: function() {
      return this.properties;
    },
    enumerable: !1,
    configurable: !0
  }), r;
})(ie);
function tn(e) {
  return Zt(e) ? e ? {} : { not: {} } : e;
}
var jt;
(function(e) {
  e[e.Key = 0] = "Key", e[e.Enum = 1] = "Enum";
})(jt || (jt = {}));
(function() {
  function e() {
  }
  return Object.defineProperty(e.prototype, "schemas", {
    get: function() {
      return [];
    },
    enumerable: !1,
    configurable: !0
  }), e.prototype.add = function(r) {
  }, e.prototype.merge = function(r) {
  }, e.prototype.include = function(r) {
    return !0;
  }, e.prototype.newSub = function() {
    return this;
  }, e.instance = new e(), e;
})();
function nn(e) {
  return Xt(e);
}
function rn(e, r) {
  if (e.length < r.length)
    return !1;
  for (var i = 0; i < r.length; i++)
    if (e[i] !== r[i])
      return !1;
  return !0;
}
function an(e, r) {
  var i = e.length - r.length;
  return i > 0 ? e.lastIndexOf(r) === i : i === 0 ? e === r : !1;
}
function on(e) {
  return e.replace(/[\-\\\{\}\+\?\|\^\$\.\,\[\]\(\)\#\s]/g, "\\$&").replace(/[\*]/g, ".*");
}
var Dt;
Dt = (() => {
  var e = { 470: (n) => {
    function t(s) {
      if (typeof s != "string")
        throw new TypeError("Path must be a string. Received " + JSON.stringify(s));
    }
    function a(s, u) {
      for (var c, l = "", p = 0, m = -1, h = 0, g = 0; g <= s.length; ++g) {
        if (g < s.length)
          c = s.charCodeAt(g);
        else {
          if (c === 47)
            break;
          c = 47;
        }
        if (c === 47) {
          if (!(m === g - 1 || h === 1))
            if (m !== g - 1 && h === 2) {
              if (l.length < 2 || p !== 2 || l.charCodeAt(l.length - 1) !== 46 || l.charCodeAt(l.length - 2) !== 46) {
                if (l.length > 2) {
                  var A = l.lastIndexOf("/");
                  if (A !== l.length - 1) {
                    A === -1 ? (l = "", p = 0) : p = (l = l.slice(0, A)).length - 1 - l.lastIndexOf("/"), m = g, h = 0;
                    continue;
                  }
                } else if (l.length === 2 || l.length === 1) {
                  l = "", p = 0, m = g, h = 0;
                  continue;
                }
              }
              u && (l.length > 0 ? l += "/.." : l = "..", p = 2);
            } else
              l.length > 0 ? l += "/" + s.slice(m + 1, g) : l = s.slice(m + 1, g), p = g - m - 1;
          m = g, h = 0;
        } else
          c === 46 && h !== -1 ? ++h : h = -1;
      }
      return l;
    }
    var o = { resolve: function() {
      for (var s, u = "", c = !1, l = arguments.length - 1; l >= -1 && !c; l--) {
        var p;
        l >= 0 ? p = arguments[l] : (s === void 0 && (s = process.cwd()), p = s), t(p), p.length !== 0 && (u = p + "/" + u, c = p.charCodeAt(0) === 47);
      }
      return u = a(u, !c), c ? u.length > 0 ? "/" + u : "/" : u.length > 0 ? u : ".";
    }, normalize: function(s) {
      if (t(s), s.length === 0)
        return ".";
      var u = s.charCodeAt(0) === 47, c = s.charCodeAt(s.length - 1) === 47;
      return (s = a(s, !u)).length !== 0 || u || (s = "."), s.length > 0 && c && (s += "/"), u ? "/" + s : s;
    }, isAbsolute: function(s) {
      return t(s), s.length > 0 && s.charCodeAt(0) === 47;
    }, join: function() {
      if (arguments.length === 0)
        return ".";
      for (var s, u = 0; u < arguments.length; ++u) {
        var c = arguments[u];
        t(c), c.length > 0 && (s === void 0 ? s = c : s += "/" + c);
      }
      return s === void 0 ? "." : o.normalize(s);
    }, relative: function(s, u) {
      if (t(s), t(u), s === u || (s = o.resolve(s)) === (u = o.resolve(u)))
        return "";
      for (var c = 1; c < s.length && s.charCodeAt(c) === 47; ++c)
        ;
      for (var l = s.length, p = l - c, m = 1; m < u.length && u.charCodeAt(m) === 47; ++m)
        ;
      for (var h = u.length - m, g = p < h ? p : h, A = -1, k = 0; k <= g; ++k) {
        if (k === g) {
          if (h > g) {
            if (u.charCodeAt(m + k) === 47)
              return u.slice(m + k + 1);
            if (k === 0)
              return u.slice(m + k);
          } else
            p > g && (s.charCodeAt(c + k) === 47 ? A = k : k === 0 && (A = 0));
          break;
        }
        var I = s.charCodeAt(c + k);
        if (I !== u.charCodeAt(m + k))
          break;
        I === 47 && (A = k);
      }
      var _ = "";
      for (k = c + A + 1; k <= l; ++k)
        k !== l && s.charCodeAt(k) !== 47 || (_.length === 0 ? _ += ".." : _ += "/..");
      return _.length > 0 ? _ + u.slice(m + A) : (m += A, u.charCodeAt(m) === 47 && ++m, u.slice(m));
    }, _makeLong: function(s) {
      return s;
    }, dirname: function(s) {
      if (t(s), s.length === 0)
        return ".";
      for (var u = s.charCodeAt(0), c = u === 47, l = -1, p = !0, m = s.length - 1; m >= 1; --m)
        if ((u = s.charCodeAt(m)) === 47) {
          if (!p) {
            l = m;
            break;
          }
        } else
          p = !1;
      return l === -1 ? c ? "/" : "." : c && l === 1 ? "//" : s.slice(0, l);
    }, basename: function(s, u) {
      if (u !== void 0 && typeof u != "string")
        throw new TypeError('"ext" argument must be a string');
      t(s);
      var c, l = 0, p = -1, m = !0;
      if (u !== void 0 && u.length > 0 && u.length <= s.length) {
        if (u.length === s.length && u === s)
          return "";
        var h = u.length - 1, g = -1;
        for (c = s.length - 1; c >= 0; --c) {
          var A = s.charCodeAt(c);
          if (A === 47) {
            if (!m) {
              l = c + 1;
              break;
            }
          } else
            g === -1 && (m = !1, g = c + 1), h >= 0 && (A === u.charCodeAt(h) ? --h == -1 && (p = c) : (h = -1, p = g));
        }
        return l === p ? p = g : p === -1 && (p = s.length), s.slice(l, p);
      }
      for (c = s.length - 1; c >= 0; --c)
        if (s.charCodeAt(c) === 47) {
          if (!m) {
            l = c + 1;
            break;
          }
        } else
          p === -1 && (m = !1, p = c + 1);
      return p === -1 ? "" : s.slice(l, p);
    }, extname: function(s) {
      t(s);
      for (var u = -1, c = 0, l = -1, p = !0, m = 0, h = s.length - 1; h >= 0; --h) {
        var g = s.charCodeAt(h);
        if (g !== 47)
          l === -1 && (p = !1, l = h + 1), g === 46 ? u === -1 ? u = h : m !== 1 && (m = 1) : u !== -1 && (m = -1);
        else if (!p) {
          c = h + 1;
          break;
        }
      }
      return u === -1 || l === -1 || m === 0 || m === 1 && u === l - 1 && u === c + 1 ? "" : s.slice(u, l);
    }, format: function(s) {
      if (s === null || typeof s != "object")
        throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof s);
      return function(u, c) {
        var l = c.dir || c.root, p = c.base || (c.name || "") + (c.ext || "");
        return l ? l === c.root ? l + p : l + "/" + p : p;
      }(0, s);
    }, parse: function(s) {
      t(s);
      var u = { root: "", dir: "", base: "", ext: "", name: "" };
      if (s.length === 0)
        return u;
      var c, l = s.charCodeAt(0), p = l === 47;
      p ? (u.root = "/", c = 1) : c = 0;
      for (var m = -1, h = 0, g = -1, A = !0, k = s.length - 1, I = 0; k >= c; --k)
        if ((l = s.charCodeAt(k)) !== 47)
          g === -1 && (A = !1, g = k + 1), l === 46 ? m === -1 ? m = k : I !== 1 && (I = 1) : m !== -1 && (I = -1);
        else if (!A) {
          h = k + 1;
          break;
        }
      return m === -1 || g === -1 || I === 0 || I === 1 && m === g - 1 && m === h + 1 ? g !== -1 && (u.base = u.name = h === 0 && p ? s.slice(1, g) : s.slice(h, g)) : (h === 0 && p ? (u.name = s.slice(1, m), u.base = s.slice(1, g)) : (u.name = s.slice(h, m), u.base = s.slice(h, g)), u.ext = s.slice(m, g)), h > 0 ? u.dir = s.slice(0, h - 1) : p && (u.dir = "/"), u;
    }, sep: "/", delimiter: ":", win32: null, posix: null };
    o.posix = o, n.exports = o;
  }, 447: (n, t, a) => {
    var o;
    if (a.r(t), a.d(t, { URI: () => I, Utils: () => N }), typeof process == "object")
      o = process.platform === "win32";
    else if (typeof navigator == "object") {
      var s = navigator.userAgent;
      o = s.indexOf("Windows") >= 0;
    }
    var u, c, l = (u = function(y, d) {
      return (u = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(v, b) {
        v.__proto__ = b;
      } || function(v, b) {
        for (var x in b)
          Object.prototype.hasOwnProperty.call(b, x) && (v[x] = b[x]);
      })(y, d);
    }, function(y, d) {
      function v() {
        this.constructor = y;
      }
      u(y, d), y.prototype = d === null ? Object.create(d) : (v.prototype = d.prototype, new v());
    }), p = /^\w[\w\d+.-]*$/, m = /^\//, h = /^\/\//, g = "", A = "/", k = /^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/, I = function() {
      function y(d, v, b, x, j, O) {
        O === void 0 && (O = !1), typeof d == "object" ? (this.scheme = d.scheme || g, this.authority = d.authority || g, this.path = d.path || g, this.query = d.query || g, this.fragment = d.fragment || g) : (this.scheme = function(M, V) {
          return M || V ? M : "file";
        }(d, O), this.authority = v || g, this.path = function(M, V) {
          switch (M) {
            case "https":
            case "http":
            case "file":
              V ? V[0] !== A && (V = A + V) : V = A;
          }
          return V;
        }(this.scheme, b || g), this.query = x || g, this.fragment = j || g, function(M, V) {
          if (!M.scheme && V)
            throw new Error('[UriError]: Scheme is missing: {scheme: "", authority: "' + M.authority + '", path: "' + M.path + '", query: "' + M.query + '", fragment: "' + M.fragment + '"}');
          if (M.scheme && !p.test(M.scheme))
            throw new Error("[UriError]: Scheme contains illegal characters.");
          if (M.path) {
            if (M.authority) {
              if (!m.test(M.path))
                throw new Error('[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character');
            } else if (h.test(M.path))
              throw new Error('[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")');
          }
        }(this, O));
      }
      return y.isUri = function(d) {
        return d instanceof y || !!d && typeof d.authority == "string" && typeof d.fragment == "string" && typeof d.path == "string" && typeof d.query == "string" && typeof d.scheme == "string" && typeof d.fsPath == "function" && typeof d.with == "function" && typeof d.toString == "function";
      }, Object.defineProperty(y.prototype, "fsPath", { get: function() {
        return P(this, !1);
      }, enumerable: !1, configurable: !0 }), y.prototype.with = function(d) {
        if (!d)
          return this;
        var v = d.scheme, b = d.authority, x = d.path, j = d.query, O = d.fragment;
        return v === void 0 ? v = this.scheme : v === null && (v = g), b === void 0 ? b = this.authority : b === null && (b = g), x === void 0 ? x = this.path : x === null && (x = g), j === void 0 ? j = this.query : j === null && (j = g), O === void 0 ? O = this.fragment : O === null && (O = g), v === this.scheme && b === this.authority && x === this.path && j === this.query && O === this.fragment ? this : new w(v, b, x, j, O);
      }, y.parse = function(d, v) {
        v === void 0 && (v = !1);
        var b = k.exec(d);
        return b ? new w(b[2] || g, T(b[4] || g), T(b[5] || g), T(b[7] || g), T(b[9] || g), v) : new w(g, g, g, g, g);
      }, y.file = function(d) {
        var v = g;
        if (o && (d = d.replace(/\\/g, A)), d[0] === A && d[1] === A) {
          var b = d.indexOf(A, 2);
          b === -1 ? (v = d.substring(2), d = A) : (v = d.substring(2, b), d = d.substring(b) || A);
        }
        return new w("file", v, d, g, g);
      }, y.from = function(d) {
        return new w(d.scheme, d.authority, d.path, d.query, d.fragment);
      }, y.prototype.toString = function(d) {
        return d === void 0 && (d = !1), H(this, d);
      }, y.prototype.toJSON = function() {
        return this;
      }, y.revive = function(d) {
        if (d) {
          if (d instanceof y)
            return d;
          var v = new w(d);
          return v._formatted = d.external, v._fsPath = d._sep === _ ? d.fsPath : null, v;
        }
        return d;
      }, y;
    }(), _ = o ? 1 : void 0, w = function(y) {
      function d() {
        var v = y !== null && y.apply(this, arguments) || this;
        return v._formatted = null, v._fsPath = null, v;
      }
      return l(d, y), Object.defineProperty(d.prototype, "fsPath", { get: function() {
        return this._fsPath || (this._fsPath = P(this, !1)), this._fsPath;
      }, enumerable: !1, configurable: !0 }), d.prototype.toString = function(v) {
        return v === void 0 && (v = !1), v ? H(this, !0) : (this._formatted || (this._formatted = H(this, !1)), this._formatted);
      }, d.prototype.toJSON = function() {
        var v = { $mid: 1 };
        return this._fsPath && (v.fsPath = this._fsPath, v._sep = _), this._formatted && (v.external = this._formatted), this.path && (v.path = this.path), this.scheme && (v.scheme = this.scheme), this.authority && (v.authority = this.authority), this.query && (v.query = this.query), this.fragment && (v.fragment = this.fragment), v;
      }, d;
    }(I), R = ((c = {})[58] = "%3A", c[47] = "%2F", c[63] = "%3F", c[35] = "%23", c[91] = "%5B", c[93] = "%5D", c[64] = "%40", c[33] = "%21", c[36] = "%24", c[38] = "%26", c[39] = "%27", c[40] = "%28", c[41] = "%29", c[42] = "%2A", c[43] = "%2B", c[44] = "%2C", c[59] = "%3B", c[61] = "%3D", c[32] = "%20", c);
    function L(y, d) {
      for (var v = void 0, b = -1, x = 0; x < y.length; x++) {
        var j = y.charCodeAt(x);
        if (j >= 97 && j <= 122 || j >= 65 && j <= 90 || j >= 48 && j <= 57 || j === 45 || j === 46 || j === 95 || j === 126 || d && j === 47)
          b !== -1 && (v += encodeURIComponent(y.substring(b, x)), b = -1), v !== void 0 && (v += y.charAt(x));
        else {
          v === void 0 && (v = y.substr(0, x));
          var O = R[j];
          O !== void 0 ? (b !== -1 && (v += encodeURIComponent(y.substring(b, x)), b = -1), v += O) : b === -1 && (b = x);
        }
      }
      return b !== -1 && (v += encodeURIComponent(y.substring(b))), v !== void 0 ? v : y;
    }
    function D(y) {
      for (var d = void 0, v = 0; v < y.length; v++) {
        var b = y.charCodeAt(v);
        b === 35 || b === 63 ? (d === void 0 && (d = y.substr(0, v)), d += R[b]) : d !== void 0 && (d += y[v]);
      }
      return d !== void 0 ? d : y;
    }
    function P(y, d) {
      var v;
      return v = y.authority && y.path.length > 1 && y.scheme === "file" ? "//" + y.authority + y.path : y.path.charCodeAt(0) === 47 && (y.path.charCodeAt(1) >= 65 && y.path.charCodeAt(1) <= 90 || y.path.charCodeAt(1) >= 97 && y.path.charCodeAt(1) <= 122) && y.path.charCodeAt(2) === 58 ? d ? y.path.substr(1) : y.path[1].toLowerCase() + y.path.substr(2) : y.path, o && (v = v.replace(/\//g, "\\")), v;
    }
    function H(y, d) {
      var v = d ? D : L, b = "", x = y.scheme, j = y.authority, O = y.path, M = y.query, V = y.fragment;
      if (x && (b += x, b += ":"), (j || x === "file") && (b += A, b += A), j) {
        var X = j.indexOf("@");
        if (X !== -1) {
          var Ae = j.substr(0, X);
          j = j.substr(X + 1), (X = Ae.indexOf(":")) === -1 ? b += v(Ae, !1) : (b += v(Ae.substr(0, X), !1), b += ":", b += v(Ae.substr(X + 1), !1)), b += "@";
        }
        (X = (j = j.toLowerCase()).indexOf(":")) === -1 ? b += v(j, !1) : (b += v(j.substr(0, X), !1), b += j.substr(X));
      }
      if (O) {
        if (O.length >= 3 && O.charCodeAt(0) === 47 && O.charCodeAt(2) === 58)
          (ae = O.charCodeAt(1)) >= 65 && ae <= 90 && (O = "/" + String.fromCharCode(ae + 32) + ":" + O.substr(3));
        else if (O.length >= 2 && O.charCodeAt(1) === 58) {
          var ae;
          (ae = O.charCodeAt(0)) >= 65 && ae <= 90 && (O = String.fromCharCode(ae + 32) + ":" + O.substr(2));
        }
        b += v(O, !0);
      }
      return M && (b += "?", b += v(M, !1)), V && (b += "#", b += d ? V : L(V, !1)), b;
    }
    function S(y) {
      try {
        return decodeURIComponent(y);
      } catch {
        return y.length > 3 ? y.substr(0, 3) + S(y.substr(3)) : y;
      }
    }
    var E = /(%[0-9A-Za-z][0-9A-Za-z])+/g;
    function T(y) {
      return y.match(E) ? y.replace(E, function(d) {
        return S(d);
      }) : y;
    }
    var N, B = a(470), Y = function() {
      for (var y = 0, d = 0, v = arguments.length; d < v; d++)
        y += arguments[d].length;
      var b = Array(y), x = 0;
      for (d = 0; d < v; d++)
        for (var j = arguments[d], O = 0, M = j.length; O < M; O++, x++)
          b[x] = j[O];
      return b;
    }, z = B.posix || B;
    (function(y) {
      y.joinPath = function(d) {
        for (var v = [], b = 1; b < arguments.length; b++)
          v[b - 1] = arguments[b];
        return d.with({ path: z.join.apply(z, Y([d.path], v)) });
      }, y.resolvePath = function(d) {
        for (var v = [], b = 1; b < arguments.length; b++)
          v[b - 1] = arguments[b];
        var x = d.path || "/";
        return d.with({ path: z.resolve.apply(z, Y([x], v)) });
      }, y.dirname = function(d) {
        var v = z.dirname(d.path);
        return v.length === 1 && v.charCodeAt(0) === 46 ? d : d.with({ path: v });
      }, y.basename = function(d) {
        return z.basename(d.path);
      }, y.extname = function(d) {
        return z.extname(d.path);
      };
    })(N || (N = {}));
  } }, r = {};
  function i(n) {
    if (r[n])
      return r[n].exports;
    var t = r[n] = { exports: {} };
    return e[n](t, t.exports, i), t.exports;
  }
  return i.d = (n, t) => {
    for (var a in t)
      i.o(t, a) && !i.o(n, a) && Object.defineProperty(n, a, { enumerable: !0, get: t[a] });
  }, i.o = (n, t) => Object.prototype.hasOwnProperty.call(n, t), i.r = (n) => {
    typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(n, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(n, "__esModule", { value: !0 });
  }, i(447);
})();
const { URI: xe, Utils: Hn } = Dt;
var Q = We(), sn = (
  /** @class */
  function() {
    function e(r, i) {
      this.patternRegExps = [], this.isInclude = [];
      try {
        for (var n = 0, t = r; n < t.length; n++) {
          var a = t[n], o = a[0] !== "!";
          o || (a = a.substring(1)), this.patternRegExps.push(new RegExp(on(a) + "$")), this.isInclude.push(o);
        }
        this.uris = i;
      } catch {
        this.patternRegExps.length = 0, this.isInclude.length = 0, this.uris = [];
      }
    }
    return e.prototype.matchesPattern = function(r) {
      for (var i = !1, n = 0; n < this.patternRegExps.length; n++) {
        var t = this.patternRegExps[n];
        t.test(r) && (i = this.isInclude[n]);
      }
      return i;
    }, e.prototype.getURIs = function() {
      return this.uris;
    }, e;
  }()
), un = (
  /** @class */
  function() {
    function e(r, i, n) {
      this.service = r, this.url = i, this.dependencies = {}, n && (this.unresolvedSchema = this.service.promise.resolve(new se(n)));
    }
    return e.prototype.getUnresolvedSchema = function() {
      return this.unresolvedSchema || (this.unresolvedSchema = this.service.loadSchema(this.url)), this.unresolvedSchema;
    }, e.prototype.getResolvedSchema = function() {
      var r = this;
      return this.resolvedSchema || (this.resolvedSchema = this.getUnresolvedSchema().then(function(i) {
        return r.service.resolveSchemaContent(i, r.url, r.dependencies);
      })), this.resolvedSchema;
    }, e.prototype.clearSchema = function() {
      this.resolvedSchema = void 0, this.unresolvedSchema = void 0, this.dependencies = {};
    }, e;
  }()
), se = (
  /** @class */
  function() {
    function e(r, i) {
      i === void 0 && (i = []), this.schema = r, this.errors = i;
    }
    return e;
  }()
), Et = (
  /** @class */
  function() {
    function e(r, i) {
      i === void 0 && (i = []), this.schema = r, this.errors = i;
    }
    return e.prototype.getSection = function(r) {
      var i = this.getSectionRecursive(r, this.schema);
      if (i)
        return tn(i);
    }, e.prototype.getSectionRecursive = function(r, i) {
      if (!i || typeof i == "boolean" || r.length === 0)
        return i;
      var n = r.shift();
      if (i.properties && typeof i.properties[n])
        return this.getSectionRecursive(r, i.properties[n]);
      if (i.patternProperties)
        for (var t = 0, a = Object.keys(i.patternProperties); t < a.length; t++) {
          var o = a[t], s = new RegExp(o);
          if (s.test(n))
            return this.getSectionRecursive(r, i.patternProperties[o]);
        }
      else {
        if (typeof i.additionalProperties == "object")
          return this.getSectionRecursive(r, i.additionalProperties);
        if (n.match("[0-9]+")) {
          if (Array.isArray(i.items)) {
            var u = parseInt(n, 10);
            if (!isNaN(u) && i.items[u])
              return this.getSectionRecursive(r, i.items[u]);
          } else if (i.items)
            return this.getSectionRecursive(r, i.items);
        }
      }
    }, e;
  }()
);
(function() {
  function e(r, i, n) {
    this.contextService = i, this.requestService = r, this.promiseConstructor = n || Promise, this.callOnDispose = [], this.contributionSchemas = {}, this.contributionAssociations = [], this.schemasById = {}, this.filePatternAssociations = [], this.registeredSchemasIds = {};
  }
  return e.prototype.getRegisteredSchemaIds = function(r) {
    return Object.keys(this.registeredSchemasIds).filter(function(i) {
      var n = xe.parse(i).scheme;
      return n !== "schemaservice" && (!r || r(n));
    });
  }, Object.defineProperty(e.prototype, "promise", {
    get: function() {
      return this.promiseConstructor;
    },
    enumerable: !1,
    configurable: !0
  }), e.prototype.dispose = function() {
    for (; this.callOnDispose.length > 0; )
      this.callOnDispose.pop()();
  }, e.prototype.onResourceChange = function(r) {
    var i = this, n = !1;
    r = K(r);
    for (var t = [r], a = Object.keys(this.schemasById).map(function(c) {
      return i.schemasById[c];
    }); t.length; )
      for (var o = t.pop(), s = 0; s < a.length; s++) {
        var u = a[s];
        u && (u.url === o || u.dependencies[o]) && (u.url !== o && t.push(u.url), u.clearSchema(), a[s] = void 0, n = !0);
      }
    return n;
  }, e.prototype.setSchemaContributions = function(r) {
    if (r.schemas) {
      var i = r.schemas;
      for (var n in i) {
        var t = K(n);
        this.contributionSchemas[t] = this.addSchemaHandle(t, i[n]);
      }
    }
    if (Array.isArray(r.schemaAssociations))
      for (var a = r.schemaAssociations, o = 0, s = a; o < s.length; o++) {
        var u = s[o], c = u.uris.map(K), l = this.addFilePatternAssociation(u.pattern, c);
        this.contributionAssociations.push(l);
      }
  }, e.prototype.addSchemaHandle = function(r, i) {
    var n = new un(this, r, i);
    return this.schemasById[r] = n, n;
  }, e.prototype.getOrAddSchemaHandle = function(r, i) {
    return this.schemasById[r] || this.addSchemaHandle(r, i);
  }, e.prototype.addFilePatternAssociation = function(r, i) {
    var n = new sn(r, i);
    return this.filePatternAssociations.push(n), n;
  }, e.prototype.registerExternalSchema = function(r, i, n) {
    var t = K(r);
    return this.registeredSchemasIds[t] = !0, this.cachedSchemaForResource = void 0, i && this.addFilePatternAssociation(i, [r]), n ? this.addSchemaHandle(t, n) : this.getOrAddSchemaHandle(t);
  }, e.prototype.clearExternalSchemas = function() {
    this.schemasById = {}, this.filePatternAssociations = [], this.registeredSchemasIds = {}, this.cachedSchemaForResource = void 0;
    for (var r in this.contributionSchemas)
      this.schemasById[r] = this.contributionSchemas[r], this.registeredSchemasIds[r] = !0;
    for (var i = 0, n = this.contributionAssociations; i < n.length; i++) {
      var t = n[i];
      this.filePatternAssociations.push(t);
    }
  }, e.prototype.getResolvedSchema = function(r) {
    var i = K(r), n = this.schemasById[i];
    return n ? n.getResolvedSchema() : this.promise.resolve(void 0);
  }, e.prototype.loadSchema = function(r) {
    if (!this.requestService) {
      var i = Q("json.schema.norequestservice", "Unable to load schema from '{0}'. No schema request service available", ke(r));
      return this.promise.resolve(new se({}, [i]));
    }
    return this.requestService(r).then(function(n) {
      if (!n) {
        var t = Q("json.schema.nocontent", "Unable to load schema from '{0}': No content.", ke(r));
        return new se({}, [t]);
      }
      var a = {}, o = [];
      a = Gt(n, o);
      var s = o.length ? [Q("json.schema.invalidFormat", "Unable to parse content from '{0}': Parse error at offset {1}.", ke(r), o[0].offset)] : [];
      return new se(a, s);
    }, function(n) {
      var t = n.toString(), a = n.toString().split("Error: ");
      return a.length > 1 && (t = a[1]), an(t, ".") && (t = t.substr(0, t.length - 1)), new se({}, [Q("json.schema.nocontent", "Unable to load schema from '{0}': {1}.", ke(r), t)]);
    });
  }, e.prototype.resolveSchemaContent = function(r, i, n) {
    var t = this, a = r.errors.slice(0), o = r.schema;
    if (o.$schema) {
      var s = K(o.$schema);
      if (s === "http://json-schema.org/draft-03/schema")
        return this.promise.resolve(new Et({}, [Q("json.schema.draft03.notsupported", "Draft-03 schemas are not supported.")]));
      s === "https://json-schema.org/draft/2019-09/schema" && a.push(Q("json.schema.draft201909.notsupported", "Draft 2019-09 schemas are not yet fully supported."));
    }
    var u = this.contextService, c = function(h, g) {
      if (!g)
        return h;
      var A = h;
      return g[0] === "/" && (g = g.substr(1)), g.split("/").some(function(k) {
        return A = A[k], !A;
      }), A;
    }, l = function(h, g, A, k) {
      var I = k ? decodeURIComponent(k) : void 0, _ = c(g, I);
      if (_)
        for (var w in _)
          _.hasOwnProperty(w) && !h.hasOwnProperty(w) && (h[w] = _[w]);
      else
        a.push(Q("json.schema.invalidref", "$ref '{0}' in '{1}' can not be resolved.", I, A));
    }, p = function(h, g, A, k, I) {
      u && !/^\w+:\/\/.*/.test(g) && (g = u.resolveRelativePath(g, k)), g = K(g);
      var _ = t.getOrAddSchemaHandle(g);
      return _.getUnresolvedSchema().then(function(w) {
        if (I[g] = !0, w.errors.length) {
          var R = A ? g + "#" + A : g;
          a.push(Q("json.schema.problemloadingref", "Problems loading reference '{0}': {1}", R, w.errors[0]));
        }
        return l(h, w.schema, g, A), m(h, w.schema, g, _.dependencies);
      });
    }, m = function(h, g, A, k) {
      if (!h || typeof h != "object")
        return Promise.resolve(null);
      for (var I = [h], _ = [], w = [], R = function() {
        for (var S = [], E = 0; E < arguments.length; E++)
          S[E] = arguments[E];
        for (var T = 0, N = S; T < N.length; T++) {
          var B = N[T];
          typeof B == "object" && I.push(B);
        }
      }, L = function() {
        for (var S = [], E = 0; E < arguments.length; E++)
          S[E] = arguments[E];
        for (var T = 0, N = S; T < N.length; T++) {
          var B = N[T];
          if (typeof B == "object")
            for (var Y in B) {
              var z = Y, y = B[z];
              typeof y == "object" && I.push(y);
            }
        }
      }, D = function() {
        for (var S = [], E = 0; E < arguments.length; E++)
          S[E] = arguments[E];
        for (var T = 0, N = S; T < N.length; T++) {
          var B = N[T];
          if (Array.isArray(B))
            for (var Y = 0, z = B; Y < z.length; Y++) {
              var y = z[Y];
              typeof y == "object" && I.push(y);
            }
        }
      }, P = function(S) {
        for (var E = []; S.$ref; ) {
          var T = S.$ref, N = T.split("#", 2);
          if (delete S.$ref, N[0].length > 0) {
            w.push(p(S, N[0], N[1], A, k));
            return;
          } else
            E.indexOf(T) === -1 && (l(S, g, A, N[1]), E.push(T));
        }
        R(S.items, S.additionalItems, S.additionalProperties, S.not, S.contains, S.propertyNames, S.if, S.then, S.else), L(S.definitions, S.properties, S.patternProperties, S.dependencies), D(S.anyOf, S.allOf, S.oneOf, S.items);
      }; I.length; ) {
        var H = I.pop();
        _.indexOf(H) >= 0 || (_.push(H), P(H));
      }
      return t.promise.all(w);
    };
    return m(o, o, i, n).then(function(h) {
      return new Et(o, a);
    });
  }, e.prototype.getSchemaForResource = function(r, i) {
    if (i && i.root && i.root.type === "object") {
      var n = i.root.properties.filter(function(I) {
        return I.keyNode.value === "$schema" && I.valueNode && I.valueNode.type === "string";
      });
      if (n.length > 0) {
        var t = n[0].valueNode;
        if (t && t.type === "string") {
          var a = nn(t);
          if (a && rn(a, ".") && this.contextService && (a = this.contextService.resolveRelativePath(a, r)), a) {
            var o = K(a);
            return this.getOrAddSchemaHandle(o).getResolvedSchema();
          }
        }
      }
    }
    if (this.cachedSchemaForResource && this.cachedSchemaForResource.resource === r)
      return this.cachedSchemaForResource.resolvedSchema;
    for (var s = /* @__PURE__ */ Object.create(null), u = [], c = fn(r), l = 0, p = this.filePatternAssociations; l < p.length; l++) {
      var m = p[l];
      if (m.matchesPattern(c))
        for (var h = 0, g = m.getURIs(); h < g.length; h++) {
          var A = g[h];
          s[A] || (u.push(A), s[A] = !0);
        }
    }
    var k = u.length > 0 ? this.createCombinedSchema(r, u).getResolvedSchema() : this.promise.resolve(void 0);
    return this.cachedSchemaForResource = { resource: r, resolvedSchema: k }, k;
  }, e.prototype.createCombinedSchema = function(r, i) {
    if (i.length === 1)
      return this.getOrAddSchemaHandle(i[0]);
    var n = "schemaservice://combinedSchema/" + encodeURIComponent(r), t = {
      allOf: i.map(function(a) {
        return { $ref: a };
      })
    };
    return this.addSchemaHandle(n, t);
  }, e.prototype.getMatchingSchemas = function(r, i, n) {
    if (n) {
      var t = n.id || "schemaservice://untitled/matchingSchemas/" + cn++;
      return this.resolveSchemaContent(new se(n), t, {}).then(function(a) {
        return i.getMatchingSchemas(a.schema).filter(function(o) {
          return !o.inverted;
        });
      });
    }
    return this.getSchemaForResource(r.uri, i).then(function(a) {
      return a ? i.getMatchingSchemas(a.schema).filter(function(o) {
        return !o.inverted;
      }) : [];
    });
  }, e;
})();
var cn = 0;
function K(e) {
  try {
    return xe.parse(e).toString();
  } catch {
    return e;
  }
}
function fn(e) {
  try {
    return xe.parse(e).with({ fragment: null, query: null }).toString();
  } catch {
    return e;
  }
}
function ke(e) {
  try {
    var r = xe.parse(e);
    if (r.scheme === "file")
      return r.fsPath;
  } catch {
  }
  return e;
}
var C = We(), Ot = {
  schemaAssociations: [],
  schemas: {
    // refer to the latest schema
    "http://json-schema.org/schema#": {
      $ref: "http://json-schema.org/draft-07/schema#"
    },
    // bundle the schema-schema to include (localized) descriptions
    "http://json-schema.org/draft-04/schema#": {
      title: C("schema.json", "Describes a JSON file using a schema. See json-schema.org for more info."),
      $schema: "http://json-schema.org/draft-04/schema#",
      definitions: {
        schemaArray: {
          type: "array",
          minItems: 1,
          items: {
            $ref: "#"
          }
        },
        positiveInteger: {
          type: "integer",
          minimum: 0
        },
        positiveIntegerDefault0: {
          allOf: [
            {
              $ref: "#/definitions/positiveInteger"
            },
            {
              default: 0
            }
          ]
        },
        simpleTypes: {
          type: "string",
          enum: [
            "array",
            "boolean",
            "integer",
            "null",
            "number",
            "object",
            "string"
          ]
        },
        stringArray: {
          type: "array",
          items: {
            type: "string"
          },
          minItems: 1,
          uniqueItems: !0
        }
      },
      type: "object",
      properties: {
        id: {
          type: "string",
          format: "uri"
        },
        $schema: {
          type: "string",
          format: "uri"
        },
        title: {
          type: "string"
        },
        description: {
          type: "string"
        },
        default: {},
        multipleOf: {
          type: "number",
          minimum: 0,
          exclusiveMinimum: !0
        },
        maximum: {
          type: "number"
        },
        exclusiveMaximum: {
          type: "boolean",
          default: !1
        },
        minimum: {
          type: "number"
        },
        exclusiveMinimum: {
          type: "boolean",
          default: !1
        },
        maxLength: {
          allOf: [
            {
              $ref: "#/definitions/positiveInteger"
            }
          ]
        },
        minLength: {
          allOf: [
            {
              $ref: "#/definitions/positiveIntegerDefault0"
            }
          ]
        },
        pattern: {
          type: "string",
          format: "regex"
        },
        additionalItems: {
          anyOf: [
            {
              type: "boolean"
            },
            {
              $ref: "#"
            }
          ],
          default: {}
        },
        items: {
          anyOf: [
            {
              $ref: "#"
            },
            {
              $ref: "#/definitions/schemaArray"
            }
          ],
          default: {}
        },
        maxItems: {
          allOf: [
            {
              $ref: "#/definitions/positiveInteger"
            }
          ]
        },
        minItems: {
          allOf: [
            {
              $ref: "#/definitions/positiveIntegerDefault0"
            }
          ]
        },
        uniqueItems: {
          type: "boolean",
          default: !1
        },
        maxProperties: {
          allOf: [
            {
              $ref: "#/definitions/positiveInteger"
            }
          ]
        },
        minProperties: {
          allOf: [
            {
              $ref: "#/definitions/positiveIntegerDefault0"
            }
          ]
        },
        required: {
          allOf: [
            {
              $ref: "#/definitions/stringArray"
            }
          ]
        },
        additionalProperties: {
          anyOf: [
            {
              type: "boolean"
            },
            {
              $ref: "#"
            }
          ],
          default: {}
        },
        definitions: {
          type: "object",
          additionalProperties: {
            $ref: "#"
          },
          default: {}
        },
        properties: {
          type: "object",
          additionalProperties: {
            $ref: "#"
          },
          default: {}
        },
        patternProperties: {
          type: "object",
          additionalProperties: {
            $ref: "#"
          },
          default: {}
        },
        dependencies: {
          type: "object",
          additionalProperties: {
            anyOf: [
              {
                $ref: "#"
              },
              {
                $ref: "#/definitions/stringArray"
              }
            ]
          }
        },
        enum: {
          type: "array",
          minItems: 1,
          uniqueItems: !0
        },
        type: {
          anyOf: [
            {
              $ref: "#/definitions/simpleTypes"
            },
            {
              type: "array",
              items: {
                $ref: "#/definitions/simpleTypes"
              },
              minItems: 1,
              uniqueItems: !0
            }
          ]
        },
        format: {
          anyOf: [
            {
              type: "string",
              enum: [
                "date-time",
                "uri",
                "email",
                "hostname",
                "ipv4",
                "ipv6",
                "regex"
              ]
            },
            {
              type: "string"
            }
          ]
        },
        allOf: {
          allOf: [
            {
              $ref: "#/definitions/schemaArray"
            }
          ]
        },
        anyOf: {
          allOf: [
            {
              $ref: "#/definitions/schemaArray"
            }
          ]
        },
        oneOf: {
          allOf: [
            {
              $ref: "#/definitions/schemaArray"
            }
          ]
        },
        not: {
          allOf: [
            {
              $ref: "#"
            }
          ]
        }
      },
      dependencies: {
        exclusiveMaximum: [
          "maximum"
        ],
        exclusiveMinimum: [
          "minimum"
        ]
      },
      default: {}
    },
    "http://json-schema.org/draft-07/schema#": {
      title: C("schema.json", "Describes a JSON file using a schema. See json-schema.org for more info."),
      definitions: {
        schemaArray: {
          type: "array",
          minItems: 1,
          items: { $ref: "#" }
        },
        nonNegativeInteger: {
          type: "integer",
          minimum: 0
        },
        nonNegativeIntegerDefault0: {
          allOf: [
            { $ref: "#/definitions/nonNegativeInteger" },
            { default: 0 }
          ]
        },
        simpleTypes: {
          enum: [
            "array",
            "boolean",
            "integer",
            "null",
            "number",
            "object",
            "string"
          ]
        },
        stringArray: {
          type: "array",
          items: { type: "string" },
          uniqueItems: !0,
          default: []
        }
      },
      type: ["object", "boolean"],
      properties: {
        $id: {
          type: "string",
          format: "uri-reference"
        },
        $schema: {
          type: "string",
          format: "uri"
        },
        $ref: {
          type: "string",
          format: "uri-reference"
        },
        $comment: {
          type: "string"
        },
        title: {
          type: "string"
        },
        description: {
          type: "string"
        },
        default: !0,
        readOnly: {
          type: "boolean",
          default: !1
        },
        examples: {
          type: "array",
          items: !0
        },
        multipleOf: {
          type: "number",
          exclusiveMinimum: 0
        },
        maximum: {
          type: "number"
        },
        exclusiveMaximum: {
          type: "number"
        },
        minimum: {
          type: "number"
        },
        exclusiveMinimum: {
          type: "number"
        },
        maxLength: { $ref: "#/definitions/nonNegativeInteger" },
        minLength: { $ref: "#/definitions/nonNegativeIntegerDefault0" },
        pattern: {
          type: "string",
          format: "regex"
        },
        additionalItems: { $ref: "#" },
        items: {
          anyOf: [
            { $ref: "#" },
            { $ref: "#/definitions/schemaArray" }
          ],
          default: !0
        },
        maxItems: { $ref: "#/definitions/nonNegativeInteger" },
        minItems: { $ref: "#/definitions/nonNegativeIntegerDefault0" },
        uniqueItems: {
          type: "boolean",
          default: !1
        },
        contains: { $ref: "#" },
        maxProperties: { $ref: "#/definitions/nonNegativeInteger" },
        minProperties: { $ref: "#/definitions/nonNegativeIntegerDefault0" },
        required: { $ref: "#/definitions/stringArray" },
        additionalProperties: { $ref: "#" },
        definitions: {
          type: "object",
          additionalProperties: { $ref: "#" },
          default: {}
        },
        properties: {
          type: "object",
          additionalProperties: { $ref: "#" },
          default: {}
        },
        patternProperties: {
          type: "object",
          additionalProperties: { $ref: "#" },
          propertyNames: { format: "regex" },
          default: {}
        },
        dependencies: {
          type: "object",
          additionalProperties: {
            anyOf: [
              { $ref: "#" },
              { $ref: "#/definitions/stringArray" }
            ]
          }
        },
        propertyNames: { $ref: "#" },
        const: !0,
        enum: {
          type: "array",
          items: !0,
          minItems: 1,
          uniqueItems: !0
        },
        type: {
          anyOf: [
            { $ref: "#/definitions/simpleTypes" },
            {
              type: "array",
              items: { $ref: "#/definitions/simpleTypes" },
              minItems: 1,
              uniqueItems: !0
            }
          ]
        },
        format: { type: "string" },
        contentMediaType: { type: "string" },
        contentEncoding: { type: "string" },
        if: { $ref: "#" },
        then: { $ref: "#" },
        else: { $ref: "#" },
        allOf: { $ref: "#/definitions/schemaArray" },
        anyOf: { $ref: "#/definitions/schemaArray" },
        oneOf: { $ref: "#/definitions/schemaArray" },
        not: { $ref: "#" }
      },
      default: !0
    }
  }
}, ln = {
  id: C("schema.json.id", "A unique identifier for the schema."),
  $schema: C("schema.json.$schema", "The schema to verify this document against."),
  title: C("schema.json.title", "A descriptive title of the element."),
  description: C("schema.json.description", "A long description of the element. Used in hover menus and suggestions."),
  default: C("schema.json.default", "A default value. Used by suggestions."),
  multipleOf: C("schema.json.multipleOf", "A number that should cleanly divide the current value (i.e. have no remainder)."),
  maximum: C("schema.json.maximum", "The maximum numerical value, inclusive by default."),
  exclusiveMaximum: C("schema.json.exclusiveMaximum", "Makes the maximum property exclusive."),
  minimum: C("schema.json.minimum", "The minimum numerical value, inclusive by default."),
  exclusiveMinimum: C("schema.json.exclusiveMininum", "Makes the minimum property exclusive."),
  maxLength: C("schema.json.maxLength", "The maximum length of a string."),
  minLength: C("schema.json.minLength", "The minimum length of a string."),
  pattern: C("schema.json.pattern", "A regular expression to match the string against. It is not implicitly anchored."),
  additionalItems: C("schema.json.additionalItems", "For arrays, only when items is set as an array. If it is a schema, then this schema validates items after the ones specified by the items array. If it is false, then additional items will cause validation to fail."),
  items: C("schema.json.items", "For arrays. Can either be a schema to validate every element against or an array of schemas to validate each item against in order (the first schema will validate the first element, the second schema will validate the second element, and so on."),
  maxItems: C("schema.json.maxItems", "The maximum number of items that can be inside an array. Inclusive."),
  minItems: C("schema.json.minItems", "The minimum number of items that can be inside an array. Inclusive."),
  uniqueItems: C("schema.json.uniqueItems", "If all of the items in the array must be unique. Defaults to false."),
  maxProperties: C("schema.json.maxProperties", "The maximum number of properties an object can have. Inclusive."),
  minProperties: C("schema.json.minProperties", "The minimum number of properties an object can have. Inclusive."),
  required: C("schema.json.required", "An array of strings that lists the names of all properties required on this object."),
  additionalProperties: C("schema.json.additionalProperties", "Either a schema or a boolean. If a schema, then used to validate all properties not matched by 'properties' or 'patternProperties'. If false, then any properties not matched by either will cause this schema to fail."),
  definitions: C("schema.json.definitions", "Not used for validation. Place subschemas here that you wish to reference inline with $ref."),
  properties: C("schema.json.properties", "A map of property names to schemas for each property."),
  patternProperties: C("schema.json.patternProperties", "A map of regular expressions on property names to schemas for matching properties."),
  dependencies: C("schema.json.dependencies", "A map of property names to either an array of property names or a schema. An array of property names means the property named in the key depends on the properties in the array being present in the object in order to be valid. If the value is a schema, then the schema is only applied to the object if the property in the key exists on the object."),
  enum: C("schema.json.enum", "The set of literal values that are valid."),
  type: C("schema.json.type", "Either a string of one of the basic schema types (number, integer, null, array, object, boolean, string) or an array of strings specifying a subset of those types."),
  format: C("schema.json.format", "Describes the format expected for the value."),
  allOf: C("schema.json.allOf", "An array of schemas, all of which must match."),
  anyOf: C("schema.json.anyOf", "An array of schemas, where at least one must match."),
  oneOf: C("schema.json.oneOf", "An array of schemas, exactly one of which must match."),
  not: C("schema.json.not", "A schema which must not match."),
  $id: C("schema.json.$id", "A unique identifier for the schema."),
  $ref: C("schema.json.$ref", "Reference a definition hosted on any location."),
  $comment: C("schema.json.$comment", "Comments from schema authors to readers or maintainers of the schema."),
  readOnly: C("schema.json.readOnly", "Indicates that the value of the instance is managed exclusively by the owning authority."),
  examples: C("schema.json.examples", "Sample JSON values associated with a particular schema, for the purpose of illustrating usage."),
  contains: C("schema.json.contains", 'An array instance is valid against "contains" if at least one of its elements is valid against the given schema.'),
  propertyNames: C("schema.json.propertyNames", "If the instance is an object, this keyword validates if every property name in the instance validates against the provided schema."),
  const: C("schema.json.const", "An instance validates successfully against this keyword if its value is equal to the value of the keyword."),
  contentMediaType: C("schema.json.contentMediaType", "Describes the media type of a string property."),
  contentEncoding: C("schema.json.contentEncoding", "Describes the content encoding of a string property."),
  if: C("schema.json.if", 'The validation outcome of the "if" subschema controls which of the "then" or "else" keywords are evaluated.'),
  then: C("schema.json.then", 'The "if" subschema is used for validation when the "if" subschema succeeds.'),
  else: C("schema.json.else", 'The "else" subschema is used for validation when the "if" subschema fails.')
};
for (var hn in Ot.schemas) {
  var Pe = Ot.schemas[hn];
  for (var de in Pe.properties) {
    var Re = Pe.properties[de];
    typeof Re == "boolean" && (Re = Pe.properties[de] = {});
    var xt = ln[de];
    xt ? Re.description = xt : console.log(de + ": localize('schema.json." + de + `', "")`);
  }
}
var dn = (
  /** @class */
  function() {
    function e(r, i, n) {
      var t = this;
      this._languageId = r, this._worker = i, this._disposables = [], this._listener = /* @__PURE__ */ Object.create(null);
      var a = function(s) {
        var u = s.getModeId();
        if (u === t._languageId) {
          var c;
          t._listener[s.uri.toString()] = s.onDidChangeContent(function() {
            clearTimeout(c), c = setTimeout(function() {
              return t._doValidate(s.uri, u);
            }, 500);
          }), t._doValidate(s.uri, u);
        }
      }, o = function(s) {
        J.setModelMarkers(s, t._languageId, []);
        var u = s.uri.toString(), c = t._listener[u];
        c && (c.dispose(), delete t._listener[u]);
      };
      this._disposables.push(J.onDidCreateModel(a)), this._disposables.push(J.onWillDisposeModel(function(s) {
        o(s), t._resetSchema(s.uri);
      })), this._disposables.push(J.onDidChangeModelLanguage(function(s) {
        o(s.model), a(s.model), t._resetSchema(s.model.uri);
      })), this._disposables.push(n.onDidChange(function(s) {
        J.getModels().forEach(function(u) {
          u.getModeId() === t._languageId && (o(u), a(u));
        });
      })), this._disposables.push({
        dispose: function() {
          J.getModels().forEach(o);
          for (var s in t._listener)
            t._listener[s].dispose();
        }
      }), J.getModels().forEach(a);
    }
    return e.prototype.dispose = function() {
      this._disposables.forEach(function(r) {
        return r && r.dispose();
      }), this._disposables = [];
    }, e.prototype._resetSchema = function(r) {
      this._worker().then(function(i) {
        i.resetSchema(r.toString());
      });
    }, e.prototype._doValidate = function(r, i) {
      this._worker(r).then(function(n) {
        return n.doValidation(r.toString()).then(function(t) {
          var a = t.map(function(s) {
            return pn(r, s);
          }), o = J.getModel(r);
          o && o.getModeId() === i && J.setModelMarkers(o, i, a);
        });
      }).then(void 0, function(n) {
        console.error(n);
      });
    }, e;
  }()
);
function gn(e) {
  switch (e) {
    case ue.Error:
      return fe.Error;
    case ue.Warning:
      return fe.Warning;
    case ue.Information:
      return fe.Info;
    case ue.Hint:
      return fe.Hint;
    default:
      return fe.Info;
  }
}
function pn(e, r) {
  var i = typeof r.code == "number" ? String(r.code) : r.code;
  return {
    severity: gn(r.severity),
    startLineNumber: r.range.start.line + 1,
    startColumn: r.range.start.character + 1,
    endLineNumber: r.range.end.line + 1,
    endColumn: r.range.end.character + 1,
    message: r.message,
    code: i,
    source: r.source
  };
}
function Ve(e) {
  if (e)
    return { character: e.column - 1, line: e.lineNumber - 1 };
}
function Lt(e) {
  if (e)
    return {
      start: {
        line: e.startLineNumber - 1,
        character: e.startColumn - 1
      },
      end: { line: e.endLineNumber - 1, character: e.endColumn - 1 }
    };
}
function Z(e) {
  if (e)
    return new Mt(e.start.line + 1, e.start.character + 1, e.end.line + 1, e.end.character + 1);
}
function mn(e) {
  return typeof e.insert < "u" && typeof e.replace < "u";
}
function vn(e) {
  var r = q.CompletionItemKind;
  switch (e) {
    case $.Text:
      return r.Text;
    case $.Method:
      return r.Method;
    case $.Function:
      return r.Function;
    case $.Constructor:
      return r.Constructor;
    case $.Field:
      return r.Field;
    case $.Variable:
      return r.Variable;
    case $.Class:
      return r.Class;
    case $.Interface:
      return r.Interface;
    case $.Module:
      return r.Module;
    case $.Property:
      return r.Property;
    case $.Unit:
      return r.Unit;
    case $.Value:
      return r.Value;
    case $.Enum:
      return r.Enum;
    case $.Keyword:
      return r.Keyword;
    case $.Snippet:
      return r.Snippet;
    case $.Color:
      return r.Color;
    case $.File:
      return r.File;
    case $.Reference:
      return r.Reference;
  }
  return r.Property;
}
function we(e) {
  if (e)
    return {
      range: Z(e.range),
      text: e.newText
    };
}
var yn = (
  /** @class */
  function() {
    function e(r) {
      this._worker = r;
    }
    return Object.defineProperty(e.prototype, "triggerCharacters", {
      get: function() {
        return [" ", ":"];
      },
      enumerable: !1,
      configurable: !0
    }), e.prototype.provideCompletionItems = function(r, i, n, t) {
      var a = r.uri;
      return this._worker(a).then(function(o) {
        return o.doComplete(a.toString(), Ve(i));
      }).then(function(o) {
        if (o) {
          var s = r.getWordUntilPosition(i), u = new Mt(i.lineNumber, s.startColumn, i.lineNumber, s.endColumn), c = o.items.map(function(l) {
            var p = {
              label: l.label,
              insertText: l.insertText || l.label,
              sortText: l.sortText,
              filterText: l.filterText,
              documentation: l.documentation,
              detail: l.detail,
              range: u,
              kind: vn(l.kind)
            };
            return l.textEdit && (mn(l.textEdit) ? p.range = {
              insert: Z(l.textEdit.insert),
              replace: Z(l.textEdit.replace)
            } : p.range = Z(l.textEdit.range), p.insertText = l.textEdit.newText), l.additionalTextEdits && (p.additionalTextEdits = l.additionalTextEdits.map(we)), l.insertTextFormat === Ue.Snippet && (p.insertTextRules = q.CompletionItemInsertTextRule.InsertAsSnippet), p;
          });
          return {
            isIncomplete: o.isIncomplete,
            suggestions: c
          };
        }
      });
    }, e;
  }()
);
function bn(e) {
  return e && typeof e == "object" && typeof e.kind == "string";
}
function Tt(e) {
  return typeof e == "string" ? {
    value: e
  } : bn(e) ? e.kind === "plaintext" ? {
    value: e.value.replace(/[\\`*_{}[\]()#+\-.!]/g, "\\$&")
  } : {
    value: e.value
  } : { value: "```" + e.language + `
` + e.value + "\n```\n" };
}
function wn(e) {
  if (e)
    return Array.isArray(e) ? e.map(Tt) : [Tt(e)];
}
var An = (
  /** @class */
  function() {
    function e(r) {
      this._worker = r;
    }
    return e.prototype.provideHover = function(r, i, n) {
      var t = r.uri;
      return this._worker(t).then(function(a) {
        return a.doHover(t.toString(), Ve(i));
      }).then(function(a) {
        if (a)
          return {
            range: Z(a.range),
            contents: wn(a.contents)
          };
      });
    }, e;
  }()
);
function Sn(e) {
  var r = q.SymbolKind;
  switch (e) {
    case F.File:
      return r.Array;
    case F.Module:
      return r.Module;
    case F.Namespace:
      return r.Namespace;
    case F.Package:
      return r.Package;
    case F.Class:
      return r.Class;
    case F.Method:
      return r.Method;
    case F.Property:
      return r.Property;
    case F.Field:
      return r.Field;
    case F.Constructor:
      return r.Constructor;
    case F.Enum:
      return r.Enum;
    case F.Interface:
      return r.Interface;
    case F.Function:
      return r.Function;
    case F.Variable:
      return r.Variable;
    case F.Constant:
      return r.Constant;
    case F.String:
      return r.String;
    case F.Number:
      return r.Number;
    case F.Boolean:
      return r.Boolean;
    case F.Array:
      return r.Array;
  }
  return r.Function;
}
var kn = (
  /** @class */
  function() {
    function e(r) {
      this._worker = r;
    }
    return e.prototype.provideDocumentSymbols = function(r, i) {
      var n = r.uri;
      return this._worker(n).then(function(t) {
        return t.findDocumentSymbols(n.toString());
      }).then(function(t) {
        if (t)
          return t.map(function(a) {
            return {
              name: a.name,
              detail: "",
              containerName: a.containerName,
              kind: Sn(a.kind),
              range: Z(a.location.range),
              selectionRange: Z(a.location.range),
              tags: []
            };
          });
      });
    }, e;
  }()
);
function Ut(e) {
  return {
    tabSize: e.tabSize,
    insertSpaces: e.insertSpaces
  };
}
var Cn = (
  /** @class */
  function() {
    function e(r) {
      this._worker = r;
    }
    return e.prototype.provideDocumentFormattingEdits = function(r, i, n) {
      var t = r.uri;
      return this._worker(t).then(function(a) {
        return a.format(t.toString(), null, Ut(i)).then(function(o) {
          if (!(!o || o.length === 0))
            return o.map(we);
        });
      });
    }, e;
  }()
), _n = (
  /** @class */
  function() {
    function e(r) {
      this._worker = r;
    }
    return e.prototype.provideDocumentRangeFormattingEdits = function(r, i, n, t) {
      var a = r.uri;
      return this._worker(a).then(function(o) {
        return o.format(a.toString(), Lt(i), Ut(n)).then(function(s) {
          if (!(!s || s.length === 0))
            return s.map(we);
        });
      });
    }, e;
  }()
), In = (
  /** @class */
  function() {
    function e(r) {
      this._worker = r;
    }
    return e.prototype.provideDocumentColors = function(r, i) {
      var n = r.uri;
      return this._worker(n).then(function(t) {
        return t.findDocumentColors(n.toString());
      }).then(function(t) {
        if (t)
          return t.map(function(a) {
            return {
              color: a.color,
              range: Z(a.range)
            };
          });
      });
    }, e.prototype.provideColorPresentations = function(r, i, n) {
      var t = r.uri;
      return this._worker(t).then(function(a) {
        return a.getColorPresentations(t.toString(), i.color, Lt(i.range));
      }).then(function(a) {
        if (a)
          return a.map(function(o) {
            var s = {
              label: o.label
            };
            return o.textEdit && (s.textEdit = we(o.textEdit)), o.additionalTextEdits && (s.additionalTextEdits = o.additionalTextEdits.map(we)), s;
          });
      });
    }, e;
  }()
), jn = (
  /** @class */
  function() {
    function e(r) {
      this._worker = r;
    }
    return e.prototype.provideFoldingRanges = function(r, i, n) {
      var t = r.uri;
      return this._worker(t).then(function(a) {
        return a.getFoldingRanges(t.toString(), i);
      }).then(function(a) {
        if (a)
          return a.map(function(o) {
            var s = {
              start: o.startLine + 1,
              end: o.endLine + 1
            };
            return typeof o.kind < "u" && (s.kind = En(o.kind)), s;
          });
      });
    }, e;
  }()
);
function En(e) {
  switch (e) {
    case pe.Comment:
      return q.FoldingRangeKind.Comment;
    case pe.Imports:
      return q.FoldingRangeKind.Imports;
    case pe.Region:
      return q.FoldingRangeKind.Region;
  }
}
var On = (
  /** @class */
  function() {
    function e(r) {
      this._worker = r;
    }
    return e.prototype.provideSelectionRanges = function(r, i, n) {
      var t = r.uri;
      return this._worker(t).then(function(a) {
        return a.getSelectionRanges(t.toString(), i.map(Ve));
      }).then(function(a) {
        if (a)
          return a.map(function(o) {
            for (var s = []; o; )
              s.push({ range: Z(o.range) }), o = o.parent;
            return s;
          });
      });
    }, e;
  }()
);
function xn(e) {
  return {
    getInitialState: function() {
      return new qt(null, null, !1, null);
    },
    tokenize: function(r, i, n, t) {
      return Un(e, r, i, n);
    }
  };
}
var Pt = "delimiter.bracket.json", Rt = "delimiter.array.json", Tn = "delimiter.colon.json", Pn = "delimiter.comma.json", Rn = "keyword.json", Nn = "keyword.json", Mn = "string.value.json", $n = "number.json", Fn = "string.key.json", Dn = "comment.block.json", Ln = "comment.line.json", ge = (
  /** @class */
  function() {
    function e(r, i) {
      this.parent = r, this.type = i;
    }
    return e.pop = function(r) {
      return r ? r.parent : null;
    }, e.push = function(r, i) {
      return new e(r, i);
    }, e.equals = function(r, i) {
      if (!r && !i)
        return !0;
      if (!r || !i)
        return !1;
      for (; r && i; ) {
        if (r === i)
          return !0;
        if (r.type !== i.type)
          return !1;
        r = r.parent, i = i.parent;
      }
      return !0;
    }, e;
  }()
), qt = (
  /** @class */
  function() {
    function e(r, i, n, t) {
      this._state = r, this.scanError = i, this.lastWasColon = n, this.parents = t;
    }
    return e.prototype.clone = function() {
      return new e(this._state, this.scanError, this.lastWasColon, this.parents);
    }, e.prototype.equals = function(r) {
      return r === this ? !0 : !r || !(r instanceof e) ? !1 : this.scanError === r.scanError && this.lastWasColon === r.lastWasColon && ge.equals(this.parents, r.parents);
    }, e.prototype.getStateData = function() {
      return this._state;
    }, e.prototype.setStateData = function(r) {
      this._state = r;
    }, e;
  }()
);
function Un(e, r, i, n, t) {
  n === void 0 && (n = 0);
  var a = 0, o = !1;
  switch (i.scanError) {
    case 2:
      r = '"' + r, a = 1;
      break;
    case 1:
      r = "/*" + r, a = 2;
      break;
  }
  for (var s = Jt(r), u = i.lastWasColon, c = i.parents, l = {
    tokens: [],
    endState: i.clone()
  }; ; ) {
    var p = n + s.getPosition(), m = "", h = s.scan();
    if (h === 17)
      break;
    if (p === n + s.getPosition())
      throw new Error("Scanner did not advance, next 3 characters are: " + r.substr(s.getPosition(), 3));
    switch (o && (p -= a), o = a > 0, h) {
      case 1:
        c = ge.push(
          c,
          0
          /* Object */
        ), m = Pt, u = !1;
        break;
      case 2:
        c = ge.pop(c), m = Pt, u = !1;
        break;
      case 3:
        c = ge.push(
          c,
          1
          /* Array */
        ), m = Rt, u = !1;
        break;
      case 4:
        c = ge.pop(c), m = Rt, u = !1;
        break;
      case 6:
        m = Tn, u = !0;
        break;
      case 5:
        m = Pn, u = !1;
        break;
      case 8:
      case 9:
        m = Rn, u = !1;
        break;
      case 7:
        m = Nn, u = !1;
        break;
      case 10:
        var g = c ? c.type : 0, A = g === 1;
        m = u || A ? Mn : Fn, u = !1;
        break;
      case 11:
        m = $n, u = !1;
        break;
    }
    if (e)
      switch (h) {
        case 12:
          m = Ln;
          break;
        case 13:
          m = Dn;
          break;
      }
    l.endState = new qt(i.getStateData(), s.getTokenError(), u, c), l.tokens.push({
      startIndex: p,
      scopes: m
    });
  }
  return l;
}
function Jn(e) {
  var r = [], i = [], n = new Bt(e);
  r.push(n);
  var t = function() {
    for (var s = [], u = 0; u < arguments.length; u++)
      s[u] = arguments[u];
    return n.getLanguageServiceWorker.apply(n, s);
  };
  function a() {
    var s = e.languageId, u = e.modeConfiguration;
    Wt(i), u.documentFormattingEdits && i.push(q.registerDocumentFormattingEditProvider(s, new Cn(t))), u.documentRangeFormattingEdits && i.push(q.registerDocumentRangeFormattingEditProvider(s, new _n(t))), u.completionItems && i.push(q.registerCompletionItemProvider(s, new yn(t))), u.hovers && i.push(q.registerHoverProvider(s, new An(t))), u.documentSymbols && i.push(q.registerDocumentSymbolProvider(s, new kn(t))), u.tokens && i.push(q.setTokensProvider(s, xn(!0))), u.colors && i.push(q.registerColorProvider(s, new In(t))), u.foldingRanges && i.push(q.registerFoldingRangeProvider(s, new jn(t))), u.diagnostics && i.push(new dn(s, t, e)), u.selectionRanges && i.push(q.registerSelectionRangeProvider(s, new On(t)));
  }
  a(), r.push(q.setLanguageConfiguration(e.languageId, qn));
  var o = e.modeConfiguration;
  return e.onDidChange(function(s) {
    s.modeConfiguration !== o && (o = s.modeConfiguration, a());
  }), r.push(Nt(i)), Nt(r);
}
function Nt(e) {
  return { dispose: function() {
    return Wt(e);
  } };
}
function Wt(e) {
  for (; e.length; )
    e.pop().dispose();
}
var qn = {
  wordPattern: /(-?\d*\.\d\w*)|([^\[\{\]\}\:\"\,\s]+)/g,
  comments: {
    lineComment: "//",
    blockComment: ["/*", "*/"]
  },
  brackets: [
    ["{", "}"],
    ["[", "]"]
  ],
  autoClosingPairs: [
    { open: "{", close: "}", notIn: ["string"] },
    { open: "[", close: "]", notIn: ["string"] },
    { open: '"', close: '"', notIn: ["string"] }
  ]
};
export {
  Jn as setupMode
};
