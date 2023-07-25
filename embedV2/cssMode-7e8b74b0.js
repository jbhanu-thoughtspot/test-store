import { g_ as he, gV as Mi, x as q, gS as Me, gZ as Oi } from "./libs-0c2ad75d.js";
import "https://cdn.skypack.dev/pin/react@v17.0.1-yH0aYV1FOvoIPeKBbHxg/mode=imports,min/optimized/react.js";
import "https://cdn.skypack.dev/pin/react-dom@v17.0.1-oZ1BXZ5opQ1DbTh7nu9r/mode=imports,min/optimized/react-dom.js";
import "https://cdn.skypack.dev/pin/react-dom@v17.0.1-oZ1BXZ5opQ1DbTh7nu9r/dist=es2020,mode=imports,min/unoptimized/cjs/react-dom-server.browser.production.min.js";
var cn = 2 * 60 * 1e3, ln = (
  /** @class */
  function() {
    function r(e) {
      var t = this;
      this._defaults = e, this._worker = null, this._idleCheckInterval = window.setInterval(function() {
        return t._checkIfIdle();
      }, 30 * 1e3), this._lastUsedTime = 0, this._configChangeListener = this._defaults.onDidChange(function() {
        return t._stopWorker();
      });
    }
    return r.prototype._stopWorker = function() {
      this._worker && (this._worker.dispose(), this._worker = null), this._client = null;
    }, r.prototype.dispose = function() {
      clearInterval(this._idleCheckInterval), this._configChangeListener.dispose(), this._stopWorker();
    }, r.prototype._checkIfIdle = function() {
      if (this._worker) {
        var e = Date.now() - this._lastUsedTime;
        e > cn && this._stopWorker();
      }
    }, r.prototype._getClient = function() {
      return this._lastUsedTime = Date.now(), this._client || (this._worker = he.createWebWorker({
        // module that exports the create() method and returns a `CSSWorker` instance
        moduleId: "vs/language/css/cssWorker",
        label: this._defaults.languageId,
        // passed in to the create() method
        createData: {
          options: this._defaults.options,
          languageId: this._defaults.languageId
        }
      }), this._client = this._worker.getProxy()), this._client;
    }, r.prototype.getLanguageServiceWorker = function() {
      for (var e = this, t = [], i = 0; i < arguments.length; i++)
        t[i] = arguments[i];
      var n;
      return this._getClient().then(function(s) {
        n = s;
      }).then(function(s) {
        return e._worker.withSyncedResources(t);
      }).then(function(s) {
        return n;
      });
    }, r;
  }()
), u;
(function(r) {
  r[r.Ident = 0] = "Ident", r[r.AtKeyword = 1] = "AtKeyword", r[r.String = 2] = "String", r[r.BadString = 3] = "BadString", r[r.UnquotedString = 4] = "UnquotedString", r[r.Hash = 5] = "Hash", r[r.Num = 6] = "Num", r[r.Percentage = 7] = "Percentage", r[r.Dimension = 8] = "Dimension", r[r.UnicodeRange = 9] = "UnicodeRange", r[r.CDO = 10] = "CDO", r[r.CDC = 11] = "CDC", r[r.Colon = 12] = "Colon", r[r.SemiColon = 13] = "SemiColon", r[r.CurlyL = 14] = "CurlyL", r[r.CurlyR = 15] = "CurlyR", r[r.ParenthesisL = 16] = "ParenthesisL", r[r.ParenthesisR = 17] = "ParenthesisR", r[r.BracketL = 18] = "BracketL", r[r.BracketR = 19] = "BracketR", r[r.Whitespace = 20] = "Whitespace", r[r.Includes = 21] = "Includes", r[r.Dashmatch = 22] = "Dashmatch", r[r.SubstringOperator = 23] = "SubstringOperator", r[r.PrefixOperator = 24] = "PrefixOperator", r[r.SuffixOperator = 25] = "SuffixOperator", r[r.Delim = 26] = "Delim", r[r.EMS = 27] = "EMS", r[r.EXS = 28] = "EXS", r[r.Length = 29] = "Length", r[r.Angle = 30] = "Angle", r[r.Time = 31] = "Time", r[r.Freq = 32] = "Freq", r[r.Exclamation = 33] = "Exclamation", r[r.Resolution = 34] = "Resolution", r[r.Comma = 35] = "Comma", r[r.Charset = 36] = "Charset", r[r.EscapedJavaScript = 37] = "EscapedJavaScript", r[r.BadEscapedJavaScript = 38] = "BadEscapedJavaScript", r[r.Comment = 39] = "Comment", r[r.SingleLineComment = 40] = "SingleLineComment", r[r.EOF = 41] = "EOF", r[r.CustomToken = 42] = "CustomToken";
})(u || (u = {}));
var mr = (
  /** @class */
  function() {
    function r(e) {
      this.source = e, this.len = e.length, this.position = 0;
    }
    return r.prototype.substring = function(e, t) {
      return t === void 0 && (t = this.position), this.source.substring(e, t);
    }, r.prototype.eos = function() {
      return this.len <= this.position;
    }, r.prototype.pos = function() {
      return this.position;
    }, r.prototype.goBackTo = function(e) {
      this.position = e;
    }, r.prototype.goBack = function(e) {
      this.position -= e;
    }, r.prototype.advance = function(e) {
      this.position += e;
    }, r.prototype.nextChar = function() {
      return this.source.charCodeAt(this.position++) || 0;
    }, r.prototype.peekChar = function(e) {
      return e === void 0 && (e = 0), this.source.charCodeAt(this.position + e) || 0;
    }, r.prototype.lookbackChar = function(e) {
      return e === void 0 && (e = 0), this.source.charCodeAt(this.position - e) || 0;
    }, r.prototype.advanceIfChar = function(e) {
      return e === this.source.charCodeAt(this.position) ? (this.position++, !0) : !1;
    }, r.prototype.advanceIfChars = function(e) {
      if (this.position + e.length > this.source.length)
        return !1;
      for (var t = 0; t < e.length; t++)
        if (this.source.charCodeAt(this.position + t) !== e[t])
          return !1;
      return this.advance(t), !0;
    }, r.prototype.advanceWhileChar = function(e) {
      for (var t = this.position; this.position < this.len && e(this.source.charCodeAt(this.position)); )
        this.position++;
      return this.position - t;
    }, r;
  }()
), Pt = "a".charCodeAt(0), hn = "f".charCodeAt(0), gr = "z".charCodeAt(0), St = "A".charCodeAt(0), fn = "F".charCodeAt(0), vr = "Z".charCodeAt(0), Ye = "0".charCodeAt(0), et = "9".charCodeAt(0), pn = "~".charCodeAt(0), dn = "^".charCodeAt(0), Oe = "=".charCodeAt(0), mn = "|".charCodeAt(0), we = "-".charCodeAt(0), yr = "_".charCodeAt(0), gn = "%".charCodeAt(0), Et = "*".charCodeAt(0), Li = "(".charCodeAt(0), $i = ")".charCodeAt(0), vn = "<".charCodeAt(0), yn = ">".charCodeAt(0), bn = "@".charCodeAt(0), Cn = "#".charCodeAt(0), xn = "$".charCodeAt(0), Rt = "\\".charCodeAt(0), br = "/".charCodeAt(0), _e = `
`.charCodeAt(0), Pe = "\r".charCodeAt(0), Le = "\f".charCodeAt(0), Cr = '"'.charCodeAt(0), xr = "'".charCodeAt(0), At = " ".charCodeAt(0), It = "	".charCodeAt(0), kn = ";".charCodeAt(0), wn = ":".charCodeAt(0), _n = "{".charCodeAt(0), Pn = "}".charCodeAt(0), Sn = "[".charCodeAt(0), En = "]".charCodeAt(0), Rn = ",".charCodeAt(0), kr = ".".charCodeAt(0), wr = "!".charCodeAt(0), ce = {};
ce[kn] = u.SemiColon;
ce[wn] = u.Colon;
ce[_n] = u.CurlyL;
ce[Pn] = u.CurlyR;
ce[En] = u.BracketR;
ce[Sn] = u.BracketL;
ce[Li] = u.ParenthesisL;
ce[$i] = u.ParenthesisR;
ce[Rn] = u.Comma;
var N = {};
N.em = u.EMS;
N.ex = u.EXS;
N.px = u.Length;
N.cm = u.Length;
N.mm = u.Length;
N.in = u.Length;
N.pt = u.Length;
N.pc = u.Length;
N.deg = u.Angle;
N.rad = u.Angle;
N.grad = u.Angle;
N.ms = u.Time;
N.s = u.Time;
N.hz = u.Freq;
N.khz = u.Freq;
N["%"] = u.Percentage;
N.fr = u.Percentage;
N.dpi = u.Resolution;
N.dpcm = u.Resolution;
var tr = (
  /** @class */
  function() {
    function r() {
      this.stream = new mr(""), this.ignoreComment = !0, this.ignoreWhitespace = !0, this.inURL = !1;
    }
    return r.prototype.setSource = function(e) {
      this.stream = new mr(e);
    }, r.prototype.finishToken = function(e, t, i) {
      return {
        offset: e,
        len: this.stream.pos() - e,
        type: t,
        text: i || this.stream.substring(e)
      };
    }, r.prototype.substring = function(e, t) {
      return this.stream.substring(e, e + t);
    }, r.prototype.pos = function() {
      return this.stream.pos();
    }, r.prototype.goBackTo = function(e) {
      this.stream.goBackTo(e);
    }, r.prototype.scanUnquotedString = function() {
      var e = this.stream.pos(), t = [];
      return this._unquotedString(t) ? this.finishToken(e, u.UnquotedString, t.join("")) : null;
    }, r.prototype.scan = function() {
      var e = this.trivia();
      if (e !== null)
        return e;
      var t = this.stream.pos();
      return this.stream.eos() ? this.finishToken(t, u.EOF) : this.scanNext(t);
    }, r.prototype.scanNext = function(e) {
      if (this.stream.advanceIfChars([vn, wr, we, we]))
        return this.finishToken(e, u.CDO);
      if (this.stream.advanceIfChars([we, we, yn]))
        return this.finishToken(e, u.CDC);
      var t = [];
      if (this.ident(t))
        return this.finishToken(e, u.Ident, t.join(""));
      if (this.stream.advanceIfChar(bn))
        if (t = ["@"], this._name(t)) {
          var i = t.join("");
          return i === "@charset" ? this.finishToken(e, u.Charset, i) : this.finishToken(e, u.AtKeyword, i);
        } else
          return this.finishToken(e, u.Delim);
      if (this.stream.advanceIfChar(Cn))
        return t = ["#"], this._name(t) ? this.finishToken(e, u.Hash, t.join("")) : this.finishToken(e, u.Delim);
      if (this.stream.advanceIfChar(wr))
        return this.finishToken(e, u.Exclamation);
      if (this._number()) {
        var n = this.stream.pos();
        if (t = [this.stream.substring(e, n)], this.stream.advanceIfChar(gn))
          return this.finishToken(e, u.Percentage);
        if (this.ident(t)) {
          var s = this.stream.substring(n).toLowerCase(), a = N[s];
          return typeof a < "u" ? this.finishToken(e, a, t.join("")) : this.finishToken(e, u.Dimension, t.join(""));
        }
        return this.finishToken(e, u.Num);
      }
      t = [];
      var o = this._string(t);
      return o !== null ? this.finishToken(e, o, t.join("")) : (o = ce[this.stream.peekChar()], typeof o < "u" ? (this.stream.advance(1), this.finishToken(e, o)) : this.stream.peekChar(0) === pn && this.stream.peekChar(1) === Oe ? (this.stream.advance(2), this.finishToken(e, u.Includes)) : this.stream.peekChar(0) === mn && this.stream.peekChar(1) === Oe ? (this.stream.advance(2), this.finishToken(e, u.Dashmatch)) : this.stream.peekChar(0) === Et && this.stream.peekChar(1) === Oe ? (this.stream.advance(2), this.finishToken(e, u.SubstringOperator)) : this.stream.peekChar(0) === dn && this.stream.peekChar(1) === Oe ? (this.stream.advance(2), this.finishToken(e, u.PrefixOperator)) : this.stream.peekChar(0) === xn && this.stream.peekChar(1) === Oe ? (this.stream.advance(2), this.finishToken(e, u.SuffixOperator)) : (this.stream.nextChar(), this.finishToken(e, u.Delim)));
    }, r.prototype.trivia = function() {
      for (; ; ) {
        var e = this.stream.pos();
        if (this._whitespace()) {
          if (!this.ignoreWhitespace)
            return this.finishToken(e, u.Whitespace);
        } else if (this.comment()) {
          if (!this.ignoreComment)
            return this.finishToken(e, u.Comment);
        } else
          return null;
      }
    }, r.prototype.comment = function() {
      if (this.stream.advanceIfChars([br, Et])) {
        var e = !1, t = !1;
        return this.stream.advanceWhileChar(function(i) {
          return t && i === br ? (e = !0, !1) : (t = i === Et, !0);
        }), e && this.stream.advance(1), !0;
      }
      return !1;
    }, r.prototype._number = function() {
      var e = 0, t;
      return this.stream.peekChar() === kr && (e = 1), t = this.stream.peekChar(e), t >= Ye && t <= et ? (this.stream.advance(e + 1), this.stream.advanceWhileChar(function(i) {
        return i >= Ye && i <= et || e === 0 && i === kr;
      }), !0) : !1;
    }, r.prototype._newline = function(e) {
      var t = this.stream.peekChar();
      switch (t) {
        case Pe:
        case Le:
        case _e:
          return this.stream.advance(1), e.push(String.fromCharCode(t)), t === Pe && this.stream.advanceIfChar(_e) && e.push(`
`), !0;
      }
      return !1;
    }, r.prototype._escape = function(e, t) {
      var i = this.stream.peekChar();
      if (i === Rt) {
        this.stream.advance(1), i = this.stream.peekChar();
        for (var n = 0; n < 6 && (i >= Ye && i <= et || i >= Pt && i <= hn || i >= St && i <= fn); )
          this.stream.advance(1), i = this.stream.peekChar(), n++;
        if (n > 0) {
          try {
            var s = parseInt(this.stream.substring(this.stream.pos() - n), 16);
            s && e.push(String.fromCharCode(s));
          } catch {
          }
          return i === At || i === It ? this.stream.advance(1) : this._newline([]), !0;
        }
        if (i !== Pe && i !== Le && i !== _e)
          return this.stream.advance(1), e.push(String.fromCharCode(i)), !0;
        if (t)
          return this._newline(e);
      }
      return !1;
    }, r.prototype._stringChar = function(e, t) {
      var i = this.stream.peekChar();
      return i !== 0 && i !== e && i !== Rt && i !== Pe && i !== Le && i !== _e ? (this.stream.advance(1), t.push(String.fromCharCode(i)), !0) : !1;
    }, r.prototype._string = function(e) {
      if (this.stream.peekChar() === xr || this.stream.peekChar() === Cr) {
        var t = this.stream.nextChar();
        for (e.push(String.fromCharCode(t)); this._stringChar(t, e) || this._escape(e, !0); )
          ;
        return this.stream.peekChar() === t ? (this.stream.nextChar(), e.push(String.fromCharCode(t)), u.String) : u.BadString;
      }
      return null;
    }, r.prototype._unquotedChar = function(e) {
      var t = this.stream.peekChar();
      return t !== 0 && t !== Rt && t !== xr && t !== Cr && t !== Li && t !== $i && t !== At && t !== It && t !== _e && t !== Le && t !== Pe ? (this.stream.advance(1), e.push(String.fromCharCode(t)), !0) : !1;
    }, r.prototype._unquotedString = function(e) {
      for (var t = !1; this._unquotedChar(e) || this._escape(e); )
        t = !0;
      return t;
    }, r.prototype._whitespace = function() {
      var e = this.stream.advanceWhileChar(function(t) {
        return t === At || t === It || t === _e || t === Le || t === Pe;
      });
      return e > 0;
    }, r.prototype._name = function(e) {
      for (var t = !1; this._identChar(e) || this._escape(e); )
        t = !0;
      return t;
    }, r.prototype.ident = function(e) {
      var t = this.stream.pos(), i = this._minus(e);
      if (i && this._minus(e)) {
        if (this._identFirstChar(e) || this._escape(e)) {
          for (; this._identChar(e) || this._escape(e); )
            ;
          return !0;
        }
      } else if (this._identFirstChar(e) || this._escape(e)) {
        for (; this._identChar(e) || this._escape(e); )
          ;
        return !0;
      }
      return this.stream.goBackTo(t), !1;
    }, r.prototype._identFirstChar = function(e) {
      var t = this.stream.peekChar();
      return t === yr || // _
      t >= Pt && t <= gr || // a-z
      t >= St && t <= vr || // A-Z
      t >= 128 && t <= 65535 ? (this.stream.advance(1), e.push(String.fromCharCode(t)), !0) : !1;
    }, r.prototype._minus = function(e) {
      var t = this.stream.peekChar();
      return t === we ? (this.stream.advance(1), e.push(String.fromCharCode(t)), !0) : !1;
    }, r.prototype._identChar = function(e) {
      var t = this.stream.peekChar();
      return t === yr || // _
      t === we || // -
      t >= Pt && t <= gr || // a-z
      t >= St && t <= vr || // A-Z
      t >= Ye && t <= et || // 0/9
      t >= 128 && t <= 65535 ? (this.stream.advance(1), e.push(String.fromCharCode(t)), !0) : !1;
    }, r;
  }()
);
function J(r, e) {
  if (r.length < e.length)
    return !1;
  for (var t = 0; t < e.length; t++)
    if (r[t] !== e[t])
      return !1;
  return !0;
}
function Vi(r, e) {
  var t = r.length - e.length;
  return t > 0 ? r.lastIndexOf(e) === t : t === 0 ? r === e : !1;
}
function _r(r, e) {
  return e === void 0 && (e = !0), r ? r.length < 140 ? r : r.slice(0, 140) + (e ? "…" : "") : "";
}
function An(r, e) {
  var t = e.exec(r);
  return t && t[0].length ? r.substr(0, r.length - t[0].length) : r;
}
var S = globalThis && globalThis.__extends || function() {
  var r = function(e, t) {
    return r = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(i, n) {
      i.__proto__ = n;
    } || function(i, n) {
      for (var s in n)
        Object.prototype.hasOwnProperty.call(n, s) && (i[s] = n[s]);
    }, r(e, t);
  };
  return function(e, t) {
    if (typeof t != "function" && t !== null)
      throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
    r(e, t);
    function i() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (i.prototype = t.prototype, new i());
  };
}(), f;
(function(r) {
  r[r.Undefined = 0] = "Undefined", r[r.Identifier = 1] = "Identifier", r[r.Stylesheet = 2] = "Stylesheet", r[r.Ruleset = 3] = "Ruleset", r[r.Selector = 4] = "Selector", r[r.SimpleSelector = 5] = "SimpleSelector", r[r.SelectorInterpolation = 6] = "SelectorInterpolation", r[r.SelectorCombinator = 7] = "SelectorCombinator", r[r.SelectorCombinatorParent = 8] = "SelectorCombinatorParent", r[r.SelectorCombinatorSibling = 9] = "SelectorCombinatorSibling", r[r.SelectorCombinatorAllSiblings = 10] = "SelectorCombinatorAllSiblings", r[r.SelectorCombinatorShadowPiercingDescendant = 11] = "SelectorCombinatorShadowPiercingDescendant", r[r.Page = 12] = "Page", r[r.PageBoxMarginBox = 13] = "PageBoxMarginBox", r[r.ClassSelector = 14] = "ClassSelector", r[r.IdentifierSelector = 15] = "IdentifierSelector", r[r.ElementNameSelector = 16] = "ElementNameSelector", r[r.PseudoSelector = 17] = "PseudoSelector", r[r.AttributeSelector = 18] = "AttributeSelector", r[r.Declaration = 19] = "Declaration", r[r.Declarations = 20] = "Declarations", r[r.Property = 21] = "Property", r[r.Expression = 22] = "Expression", r[r.BinaryExpression = 23] = "BinaryExpression", r[r.Term = 24] = "Term", r[r.Operator = 25] = "Operator", r[r.Value = 26] = "Value", r[r.StringLiteral = 27] = "StringLiteral", r[r.URILiteral = 28] = "URILiteral", r[r.EscapedValue = 29] = "EscapedValue", r[r.Function = 30] = "Function", r[r.NumericValue = 31] = "NumericValue", r[r.HexColorValue = 32] = "HexColorValue", r[r.MixinDeclaration = 33] = "MixinDeclaration", r[r.MixinReference = 34] = "MixinReference", r[r.VariableName = 35] = "VariableName", r[r.VariableDeclaration = 36] = "VariableDeclaration", r[r.Prio = 37] = "Prio", r[r.Interpolation = 38] = "Interpolation", r[r.NestedProperties = 39] = "NestedProperties", r[r.ExtendsReference = 40] = "ExtendsReference", r[r.SelectorPlaceholder = 41] = "SelectorPlaceholder", r[r.Debug = 42] = "Debug", r[r.If = 43] = "If", r[r.Else = 44] = "Else", r[r.For = 45] = "For", r[r.Each = 46] = "Each", r[r.While = 47] = "While", r[r.MixinContentReference = 48] = "MixinContentReference", r[r.MixinContentDeclaration = 49] = "MixinContentDeclaration", r[r.Media = 50] = "Media", r[r.Keyframe = 51] = "Keyframe", r[r.FontFace = 52] = "FontFace", r[r.Import = 53] = "Import", r[r.Namespace = 54] = "Namespace", r[r.Invocation = 55] = "Invocation", r[r.FunctionDeclaration = 56] = "FunctionDeclaration", r[r.ReturnStatement = 57] = "ReturnStatement", r[r.MediaQuery = 58] = "MediaQuery", r[r.FunctionParameter = 59] = "FunctionParameter", r[r.FunctionArgument = 60] = "FunctionArgument", r[r.KeyframeSelector = 61] = "KeyframeSelector", r[r.ViewPort = 62] = "ViewPort", r[r.Document = 63] = "Document", r[r.AtApplyRule = 64] = "AtApplyRule", r[r.CustomPropertyDeclaration = 65] = "CustomPropertyDeclaration", r[r.CustomPropertySet = 66] = "CustomPropertySet", r[r.ListEntry = 67] = "ListEntry", r[r.Supports = 68] = "Supports", r[r.SupportsCondition = 69] = "SupportsCondition", r[r.NamespacePrefix = 70] = "NamespacePrefix", r[r.GridLine = 71] = "GridLine", r[r.Plugin = 72] = "Plugin", r[r.UnknownAtRule = 73] = "UnknownAtRule", r[r.Use = 74] = "Use", r[r.ModuleConfiguration = 75] = "ModuleConfiguration", r[r.Forward = 76] = "Forward", r[r.ForwardVisibility = 77] = "ForwardVisibility", r[r.Module = 78] = "Module";
})(f || (f = {}));
var D;
(function(r) {
  r[r.Mixin = 0] = "Mixin", r[r.Rule = 1] = "Rule", r[r.Variable = 2] = "Variable", r[r.Function = 3] = "Function", r[r.Keyframe = 4] = "Keyframe", r[r.Unknown = 5] = "Unknown", r[r.Module = 6] = "Module", r[r.Forward = 7] = "Forward", r[r.ForwardVisibility = 8] = "ForwardVisibility";
})(D || (D = {}));
function Wt(r, e) {
  var t = null;
  return !r || e < r.offset || e > r.end ? null : (r.accept(function(i) {
    return i.offset === -1 && i.length === -1 ? !0 : i.offset <= e && i.end >= e ? (t ? i.length <= t.length && (t = i) : t = i, !0) : !1;
  }), t);
}
function In(r, e) {
  for (var t = Wt(r, e), i = []; t; )
    i.unshift(t), t = t.parent;
  return i;
}
function Dn(r) {
  var e = r.findParent(f.Declaration), t = e && e.getValue();
  return t && t.encloses(r) ? e : null;
}
var R = (
  /** @class */
  function() {
    function r(e, t, i) {
      e === void 0 && (e = -1), t === void 0 && (t = -1), this.parent = null, this.offset = e, this.length = t, i && (this.nodeType = i);
    }
    return Object.defineProperty(r.prototype, "end", {
      get: function() {
        return this.offset + this.length;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(r.prototype, "type", {
      get: function() {
        return this.nodeType || f.Undefined;
      },
      set: function(e) {
        this.nodeType = e;
      },
      enumerable: !1,
      configurable: !0
    }), r.prototype.getTextProvider = function() {
      for (var e = this; e && !e.textProvider; )
        e = e.parent;
      return e ? e.textProvider : function() {
        return "unknown";
      };
    }, r.prototype.getText = function() {
      return this.getTextProvider()(this.offset, this.length);
    }, r.prototype.matches = function(e) {
      return this.length === e.length && this.getTextProvider()(this.offset, this.length) === e;
    }, r.prototype.startsWith = function(e) {
      return this.length >= e.length && this.getTextProvider()(this.offset, e.length) === e;
    }, r.prototype.endsWith = function(e) {
      return this.length >= e.length && this.getTextProvider()(this.end - e.length, e.length) === e;
    }, r.prototype.accept = function(e) {
      if (e(this) && this.children)
        for (var t = 0, i = this.children; t < i.length; t++) {
          var n = i[t];
          n.accept(e);
        }
    }, r.prototype.acceptVisitor = function(e) {
      this.accept(e.visitNode.bind(e));
    }, r.prototype.adoptChild = function(e, t) {
      if (t === void 0 && (t = -1), e.parent && e.parent.children) {
        var i = e.parent.children.indexOf(e);
        i >= 0 && e.parent.children.splice(i, 1);
      }
      e.parent = this;
      var n = this.children;
      return n || (n = this.children = []), t !== -1 ? n.splice(t, 0, e) : n.push(e), e;
    }, r.prototype.attachTo = function(e, t) {
      return t === void 0 && (t = -1), e && e.adoptChild(this, t), this;
    }, r.prototype.collectIssues = function(e) {
      this.issues && e.push.apply(e, this.issues);
    }, r.prototype.addIssue = function(e) {
      this.issues || (this.issues = []), this.issues.push(e);
    }, r.prototype.hasIssue = function(e) {
      return Array.isArray(this.issues) && this.issues.some(function(t) {
        return t.getRule() === e;
      });
    }, r.prototype.isErroneous = function(e) {
      return e === void 0 && (e = !1), this.issues && this.issues.length > 0 ? !0 : e && Array.isArray(this.children) && this.children.some(function(t) {
        return t.isErroneous(!0);
      });
    }, r.prototype.setNode = function(e, t, i) {
      return i === void 0 && (i = -1), t ? (t.attachTo(this, i), this[e] = t, !0) : !1;
    }, r.prototype.addChild = function(e) {
      return e ? (this.children || (this.children = []), e.attachTo(this), this.updateOffsetAndLength(e), !0) : !1;
    }, r.prototype.updateOffsetAndLength = function(e) {
      (e.offset < this.offset || this.offset === -1) && (this.offset = e.offset);
      var t = e.end;
      (t > this.end || this.length === -1) && (this.length = t - this.offset);
    }, r.prototype.hasChildren = function() {
      return !!this.children && this.children.length > 0;
    }, r.prototype.getChildren = function() {
      return this.children ? this.children.slice(0) : [];
    }, r.prototype.getChild = function(e) {
      return this.children && e < this.children.length ? this.children[e] : null;
    }, r.prototype.addChildren = function(e) {
      for (var t = 0, i = e; t < i.length; t++) {
        var n = i[t];
        this.addChild(n);
      }
    }, r.prototype.findFirstChildBeforeOffset = function(e) {
      if (this.children) {
        for (var t = null, i = this.children.length - 1; i >= 0; i--)
          if (t = this.children[i], t.offset <= e)
            return t;
      }
      return null;
    }, r.prototype.findChildAtOffset = function(e, t) {
      var i = this.findFirstChildBeforeOffset(e);
      return i && i.end >= e ? t && i.findChildAtOffset(e, !0) || i : null;
    }, r.prototype.encloses = function(e) {
      return this.offset <= e.offset && this.offset + this.length >= e.offset + e.length;
    }, r.prototype.getParent = function() {
      for (var e = this.parent; e instanceof X; )
        e = e.parent;
      return e;
    }, r.prototype.findParent = function(e) {
      for (var t = this; t && t.type !== e; )
        t = t.parent;
      return t;
    }, r.prototype.findAParent = function() {
      for (var e = [], t = 0; t < arguments.length; t++)
        e[t] = arguments[t];
      for (var i = this; i && !e.some(function(n) {
        return i.type === n;
      }); )
        i = i.parent;
      return i;
    }, r.prototype.setData = function(e, t) {
      this.options || (this.options = {}), this.options[e] = t;
    }, r.prototype.getData = function(e) {
      return !this.options || !this.options.hasOwnProperty(e) ? null : this.options[e];
    }, r;
  }()
), X = (
  /** @class */
  function(r) {
    S(e, r);
    function e(t, i) {
      i === void 0 && (i = -1);
      var n = r.call(this, -1, -1) || this;
      return n.attachTo(t, i), n.offset = -1, n.length = -1, n;
    }
    return e;
  }(R)
), se = (
  /** @class */
  function(r) {
    S(e, r);
    function e(t, i) {
      var n = r.call(this, t, i) || this;
      return n.isCustomProperty = !1, n;
    }
    return Object.defineProperty(e.prototype, "type", {
      get: function() {
        return f.Identifier;
      },
      enumerable: !1,
      configurable: !0
    }), e.prototype.containsInterpolation = function() {
      return this.hasChildren();
    }, e;
  }(R)
), Fn = (
  /** @class */
  function(r) {
    S(e, r);
    function e(t, i) {
      return r.call(this, t, i) || this;
    }
    return Object.defineProperty(e.prototype, "type", {
      get: function() {
        return f.Stylesheet;
      },
      enumerable: !1,
      configurable: !0
    }), e;
  }(R)
), rr = (
  /** @class */
  function(r) {
    S(e, r);
    function e(t, i) {
      return r.call(this, t, i) || this;
    }
    return Object.defineProperty(e.prototype, "type", {
      get: function() {
        return f.Declarations;
      },
      enumerable: !1,
      configurable: !0
    }), e;
  }(R)
), U = (
  /** @class */
  function(r) {
    S(e, r);
    function e(t, i) {
      return r.call(this, t, i) || this;
    }
    return e.prototype.getDeclarations = function() {
      return this.declarations;
    }, e.prototype.setDeclarations = function(t) {
      return this.setNode("declarations", t);
    }, e;
  }(R)
), ut = (
  /** @class */
  function(r) {
    S(e, r);
    function e(t, i) {
      return r.call(this, t, i) || this;
    }
    return Object.defineProperty(e.prototype, "type", {
      get: function() {
        return f.Ruleset;
      },
      enumerable: !1,
      configurable: !0
    }), e.prototype.getSelectors = function() {
      return this.selectors || (this.selectors = new X(this)), this.selectors;
    }, e.prototype.isNested = function() {
      return !!this.parent && this.parent.findParent(f.Declarations) !== null;
    }, e;
  }(U)
), bt = (
  /** @class */
  function(r) {
    S(e, r);
    function e(t, i) {
      return r.call(this, t, i) || this;
    }
    return Object.defineProperty(e.prototype, "type", {
      get: function() {
        return f.Selector;
      },
      enumerable: !1,
      configurable: !0
    }), e;
  }(R)
), Bi = (
  /** @class */
  function(r) {
    S(e, r);
    function e(t, i) {
      return r.call(this, t, i) || this;
    }
    return Object.defineProperty(e.prototype, "type", {
      get: function() {
        return f.SimpleSelector;
      },
      enumerable: !1,
      configurable: !0
    }), e;
  }(R)
);
(function(r) {
  S(e, r);
  function e(t, i) {
    return r.call(this, t, i) || this;
  }
  return Object.defineProperty(e.prototype, "type", {
    get: function() {
      return f.AtApplyRule;
    },
    enumerable: !1,
    configurable: !0
  }), e.prototype.setIdentifier = function(t) {
    return this.setNode("identifier", t, 0);
  }, e.prototype.getIdentifier = function() {
    return this.identifier;
  }, e.prototype.getName = function() {
    return this.identifier ? this.identifier.getText() : "";
  }, e;
})(R);
var ir = (
  /** @class */
  function(r) {
    S(e, r);
    function e(t, i) {
      return r.call(this, t, i) || this;
    }
    return e;
  }(R)
), Mn = (
  /** @class */
  function(r) {
    S(e, r);
    function e(t, i) {
      return r.call(this, t, i) || this;
    }
    return Object.defineProperty(e.prototype, "type", {
      get: function() {
        return f.CustomPropertySet;
      },
      enumerable: !1,
      configurable: !0
    }), e;
  }(U)
), Ie = (
  /** @class */
  function(r) {
    S(e, r);
    function e(t, i) {
      var n = r.call(this, t, i) || this;
      return n.property = null, n;
    }
    return Object.defineProperty(e.prototype, "type", {
      get: function() {
        return f.Declaration;
      },
      enumerable: !1,
      configurable: !0
    }), e.prototype.setProperty = function(t) {
      return this.setNode("property", t);
    }, e.prototype.getProperty = function() {
      return this.property;
    }, e.prototype.getFullPropertyName = function() {
      var t = this.property ? this.property.getName() : "unknown";
      if (this.parent instanceof rr && this.parent.getParent() instanceof Wi) {
        var i = this.parent.getParent().getParent();
        if (i instanceof e)
          return i.getFullPropertyName() + t;
      }
      return t;
    }, e.prototype.getNonPrefixedPropertyName = function() {
      var t = this.getFullPropertyName();
      if (t && t.charAt(0) === "-") {
        var i = t.indexOf("-", 1);
        if (i !== -1)
          return t.substring(i + 1);
      }
      return t;
    }, e.prototype.setValue = function(t) {
      return this.setNode("value", t);
    }, e.prototype.getValue = function() {
      return this.value;
    }, e.prototype.setNestedProperties = function(t) {
      return this.setNode("nestedProperties", t);
    }, e.prototype.getNestedProperties = function() {
      return this.nestedProperties;
    }, e;
  }(ir)
), On = (
  /** @class */
  function(r) {
    S(e, r);
    function e(t, i) {
      return r.call(this, t, i) || this;
    }
    return Object.defineProperty(e.prototype, "type", {
      get: function() {
        return f.CustomPropertyDeclaration;
      },
      enumerable: !1,
      configurable: !0
    }), e.prototype.setPropertySet = function(t) {
      return this.setNode("propertySet", t);
    }, e.prototype.getPropertySet = function() {
      return this.propertySet;
    }, e;
  }(Ie)
), nr = (
  /** @class */
  function(r) {
    S(e, r);
    function e(t, i) {
      return r.call(this, t, i) || this;
    }
    return Object.defineProperty(e.prototype, "type", {
      get: function() {
        return f.Property;
      },
      enumerable: !1,
      configurable: !0
    }), e.prototype.setIdentifier = function(t) {
      return this.setNode("identifier", t);
    }, e.prototype.getIdentifier = function() {
      return this.identifier;
    }, e.prototype.getName = function() {
      return An(this.getText(), /[_\+]+$/);
    }, e.prototype.isCustomProperty = function() {
      return !!this.identifier && this.identifier.isCustomProperty;
    }, e;
  }(R)
), Ln = (
  /** @class */
  function(r) {
    S(e, r);
    function e(t, i) {
      return r.call(this, t, i) || this;
    }
    return Object.defineProperty(e.prototype, "type", {
      get: function() {
        return f.Invocation;
      },
      enumerable: !1,
      configurable: !0
    }), e.prototype.getArguments = function() {
      return this.arguments || (this.arguments = new X(this)), this.arguments;
    }, e;
  }(R)
), Je = (
  /** @class */
  function(r) {
    S(e, r);
    function e(t, i) {
      return r.call(this, t, i) || this;
    }
    return Object.defineProperty(e.prototype, "type", {
      get: function() {
        return f.Function;
      },
      enumerable: !1,
      configurable: !0
    }), e.prototype.setIdentifier = function(t) {
      return this.setNode("identifier", t, 0);
    }, e.prototype.getIdentifier = function() {
      return this.identifier;
    }, e.prototype.getName = function() {
      return this.identifier ? this.identifier.getText() : "";
    }, e;
  }(Ln)
), Ct = (
  /** @class */
  function(r) {
    S(e, r);
    function e(t, i) {
      return r.call(this, t, i) || this;
    }
    return Object.defineProperty(e.prototype, "type", {
      get: function() {
        return f.FunctionParameter;
      },
      enumerable: !1,
      configurable: !0
    }), e.prototype.setIdentifier = function(t) {
      return this.setNode("identifier", t, 0);
    }, e.prototype.getIdentifier = function() {
      return this.identifier;
    }, e.prototype.getName = function() {
      return this.identifier ? this.identifier.getText() : "";
    }, e.prototype.setDefaultValue = function(t) {
      return this.setNode("defaultValue", t, 0);
    }, e.prototype.getDefaultValue = function() {
      return this.defaultValue;
    }, e;
  }(R)
), De = (
  /** @class */
  function(r) {
    S(e, r);
    function e(t, i) {
      return r.call(this, t, i) || this;
    }
    return Object.defineProperty(e.prototype, "type", {
      get: function() {
        return f.FunctionArgument;
      },
      enumerable: !1,
      configurable: !0
    }), e.prototype.setIdentifier = function(t) {
      return this.setNode("identifier", t, 0);
    }, e.prototype.getIdentifier = function() {
      return this.identifier;
    }, e.prototype.getName = function() {
      return this.identifier ? this.identifier.getText() : "";
    }, e.prototype.setValue = function(t) {
      return this.setNode("value", t, 0);
    }, e.prototype.getValue = function() {
      return this.value;
    }, e;
  }(R)
), $n = (
  /** @class */
  function(r) {
    S(e, r);
    function e(t, i) {
      return r.call(this, t, i) || this;
    }
    return Object.defineProperty(e.prototype, "type", {
      get: function() {
        return f.If;
      },
      enumerable: !1,
      configurable: !0
    }), e.prototype.setExpression = function(t) {
      return this.setNode("expression", t, 0);
    }, e.prototype.setElseClause = function(t) {
      return this.setNode("elseClause", t);
    }, e;
  }(U)
), Vn = (
  /** @class */
  function(r) {
    S(e, r);
    function e(t, i) {
      return r.call(this, t, i) || this;
    }
    return Object.defineProperty(e.prototype, "type", {
      get: function() {
        return f.For;
      },
      enumerable: !1,
      configurable: !0
    }), e.prototype.setVariable = function(t) {
      return this.setNode("variable", t, 0);
    }, e;
  }(U)
), Bn = (
  /** @class */
  function(r) {
    S(e, r);
    function e(t, i) {
      return r.call(this, t, i) || this;
    }
    return Object.defineProperty(e.prototype, "type", {
      get: function() {
        return f.Each;
      },
      enumerable: !1,
      configurable: !0
    }), e.prototype.getVariables = function() {
      return this.variables || (this.variables = new X(this)), this.variables;
    }, e;
  }(U)
), jn = (
  /** @class */
  function(r) {
    S(e, r);
    function e(t, i) {
      return r.call(this, t, i) || this;
    }
    return Object.defineProperty(e.prototype, "type", {
      get: function() {
        return f.While;
      },
      enumerable: !1,
      configurable: !0
    }), e;
  }(U)
), Wn = (
  /** @class */
  function(r) {
    S(e, r);
    function e(t, i) {
      return r.call(this, t, i) || this;
    }
    return Object.defineProperty(e.prototype, "type", {
      get: function() {
        return f.Else;
      },
      enumerable: !1,
      configurable: !0
    }), e;
  }(U)
), lt = (
  /** @class */
  function(r) {
    S(e, r);
    function e(t, i) {
      return r.call(this, t, i) || this;
    }
    return Object.defineProperty(e.prototype, "type", {
      get: function() {
        return f.FunctionDeclaration;
      },
      enumerable: !1,
      configurable: !0
    }), e.prototype.setIdentifier = function(t) {
      return this.setNode("identifier", t, 0);
    }, e.prototype.getIdentifier = function() {
      return this.identifier;
    }, e.prototype.getName = function() {
      return this.identifier ? this.identifier.getText() : "";
    }, e.prototype.getParameters = function() {
      return this.parameters || (this.parameters = new X(this)), this.parameters;
    }, e;
  }(U)
), Un = (
  /** @class */
  function(r) {
    S(e, r);
    function e(t, i) {
      return r.call(this, t, i) || this;
    }
    return Object.defineProperty(e.prototype, "type", {
      get: function() {
        return f.ViewPort;
      },
      enumerable: !1,
      configurable: !0
    }), e;
  }(U)
), ji = (
  /** @class */
  function(r) {
    S(e, r);
    function e(t, i) {
      return r.call(this, t, i) || this;
    }
    return Object.defineProperty(e.prototype, "type", {
      get: function() {
        return f.FontFace;
      },
      enumerable: !1,
      configurable: !0
    }), e;
  }(U)
), Wi = (
  /** @class */
  function(r) {
    S(e, r);
    function e(t, i) {
      return r.call(this, t, i) || this;
    }
    return Object.defineProperty(e.prototype, "type", {
      get: function() {
        return f.NestedProperties;
      },
      enumerable: !1,
      configurable: !0
    }), e;
  }(U)
), Ui = (
  /** @class */
  function(r) {
    S(e, r);
    function e(t, i) {
      return r.call(this, t, i) || this;
    }
    return Object.defineProperty(e.prototype, "type", {
      get: function() {
        return f.Keyframe;
      },
      enumerable: !1,
      configurable: !0
    }), e.prototype.setKeyword = function(t) {
      return this.setNode("keyword", t, 0);
    }, e.prototype.getKeyword = function() {
      return this.keyword;
    }, e.prototype.setIdentifier = function(t) {
      return this.setNode("identifier", t, 0);
    }, e.prototype.getIdentifier = function() {
      return this.identifier;
    }, e.prototype.getName = function() {
      return this.identifier ? this.identifier.getText() : "";
    }, e;
  }(U)
), Pr = (
  /** @class */
  function(r) {
    S(e, r);
    function e(t, i) {
      return r.call(this, t, i) || this;
    }
    return Object.defineProperty(e.prototype, "type", {
      get: function() {
        return f.KeyframeSelector;
      },
      enumerable: !1,
      configurable: !0
    }), e;
  }(U)
), sr = (
  /** @class */
  function(r) {
    S(e, r);
    function e(t, i) {
      return r.call(this, t, i) || this;
    }
    return Object.defineProperty(e.prototype, "type", {
      get: function() {
        return f.Import;
      },
      enumerable: !1,
      configurable: !0
    }), e.prototype.setMedialist = function(t) {
      return t ? (t.attachTo(this), !0) : !1;
    }, e;
  }(R)
), Tn = (
  /** @class */
  function(r) {
    S(e, r);
    function e() {
      return r !== null && r.apply(this, arguments) || this;
    }
    return Object.defineProperty(e.prototype, "type", {
      get: function() {
        return f.Use;
      },
      enumerable: !1,
      configurable: !0
    }), e.prototype.getParameters = function() {
      return this.parameters || (this.parameters = new X(this)), this.parameters;
    }, e.prototype.setIdentifier = function(t) {
      return this.setNode("identifier", t, 0);
    }, e.prototype.getIdentifier = function() {
      return this.identifier;
    }, e;
  }(R)
), Kn = (
  /** @class */
  function(r) {
    S(e, r);
    function e() {
      return r !== null && r.apply(this, arguments) || this;
    }
    return Object.defineProperty(e.prototype, "type", {
      get: function() {
        return f.ModuleConfiguration;
      },
      enumerable: !1,
      configurable: !0
    }), e.prototype.setIdentifier = function(t) {
      return this.setNode("identifier", t, 0);
    }, e.prototype.getIdentifier = function() {
      return this.identifier;
    }, e.prototype.getName = function() {
      return this.identifier ? this.identifier.getText() : "";
    }, e.prototype.setValue = function(t) {
      return this.setNode("value", t, 0);
    }, e.prototype.getValue = function() {
      return this.value;
    }, e;
  }(R)
), zn = (
  /** @class */
  function(r) {
    S(e, r);
    function e() {
      return r !== null && r.apply(this, arguments) || this;
    }
    return Object.defineProperty(e.prototype, "type", {
      get: function() {
        return f.Forward;
      },
      enumerable: !1,
      configurable: !0
    }), e.prototype.setIdentifier = function(t) {
      return this.setNode("identifier", t, 0);
    }, e.prototype.getIdentifier = function() {
      return this.identifier;
    }, e.prototype.getMembers = function() {
      return this.members || (this.members = new X(this)), this.members;
    }, e.prototype.getParameters = function() {
      return this.parameters || (this.parameters = new X(this)), this.parameters;
    }, e;
  }(R)
), qn = (
  /** @class */
  function(r) {
    S(e, r);
    function e() {
      return r !== null && r.apply(this, arguments) || this;
    }
    return Object.defineProperty(e.prototype, "type", {
      get: function() {
        return f.ForwardVisibility;
      },
      enumerable: !1,
      configurable: !0
    }), e.prototype.setIdentifier = function(t) {
      return this.setNode("identifier", t, 0);
    }, e.prototype.getIdentifier = function() {
      return this.identifier;
    }, e;
  }(R)
), Nn = (
  /** @class */
  function(r) {
    S(e, r);
    function e(t, i) {
      return r.call(this, t, i) || this;
    }
    return Object.defineProperty(e.prototype, "type", {
      get: function() {
        return f.Namespace;
      },
      enumerable: !1,
      configurable: !0
    }), e;
  }(R)
), Ti = (
  /** @class */
  function(r) {
    S(e, r);
    function e(t, i) {
      return r.call(this, t, i) || this;
    }
    return Object.defineProperty(e.prototype, "type", {
      get: function() {
        return f.Media;
      },
      enumerable: !1,
      configurable: !0
    }), e;
  }(U)
), Ut = (
  /** @class */
  function(r) {
    S(e, r);
    function e(t, i) {
      return r.call(this, t, i) || this;
    }
    return Object.defineProperty(e.prototype, "type", {
      get: function() {
        return f.Supports;
      },
      enumerable: !1,
      configurable: !0
    }), e;
  }(U)
), Hn = (
  /** @class */
  function(r) {
    S(e, r);
    function e(t, i) {
      return r.call(this, t, i) || this;
    }
    return Object.defineProperty(e.prototype, "type", {
      get: function() {
        return f.Document;
      },
      enumerable: !1,
      configurable: !0
    }), e;
  }(U)
), Ki = (
  /** @class */
  function(r) {
    S(e, r);
    function e(t, i) {
      return r.call(this, t, i) || this;
    }
    return e.prototype.getMediums = function() {
      return this.mediums || (this.mediums = new X(this)), this.mediums;
    }, e;
  }(R)
), zi = (
  /** @class */
  function(r) {
    S(e, r);
    function e(t, i) {
      return r.call(this, t, i) || this;
    }
    return Object.defineProperty(e.prototype, "type", {
      get: function() {
        return f.MediaQuery;
      },
      enumerable: !1,
      configurable: !0
    }), e;
  }(R)
), We = (
  /** @class */
  function(r) {
    S(e, r);
    function e(t, i) {
      return r.call(this, t, i) || this;
    }
    return Object.defineProperty(e.prototype, "type", {
      get: function() {
        return f.SupportsCondition;
      },
      enumerable: !1,
      configurable: !0
    }), e;
  }(R)
), Gn = (
  /** @class */
  function(r) {
    S(e, r);
    function e(t, i) {
      return r.call(this, t, i) || this;
    }
    return Object.defineProperty(e.prototype, "type", {
      get: function() {
        return f.Page;
      },
      enumerable: !1,
      configurable: !0
    }), e;
  }(U)
), Qn = (
  /** @class */
  function(r) {
    S(e, r);
    function e(t, i) {
      return r.call(this, t, i) || this;
    }
    return Object.defineProperty(e.prototype, "type", {
      get: function() {
        return f.PageBoxMarginBox;
      },
      enumerable: !1,
      configurable: !0
    }), e;
  }(U)
), qi = (
  /** @class */
  function(r) {
    S(e, r);
    function e(t, i) {
      return r.call(this, t, i) || this;
    }
    return Object.defineProperty(e.prototype, "type", {
      get: function() {
        return f.Expression;
      },
      enumerable: !1,
      configurable: !0
    }), e;
  }(R)
), Jn = (
  /** @class */
  function(r) {
    S(e, r);
    function e(t, i) {
      return r.call(this, t, i) || this;
    }
    return Object.defineProperty(e.prototype, "type", {
      get: function() {
        return f.BinaryExpression;
      },
      enumerable: !1,
      configurable: !0
    }), e.prototype.setLeft = function(t) {
      return this.setNode("left", t);
    }, e.prototype.getLeft = function() {
      return this.left;
    }, e.prototype.setRight = function(t) {
      return this.setNode("right", t);
    }, e.prototype.getRight = function() {
      return this.right;
    }, e.prototype.setOperator = function(t) {
      return this.setNode("operator", t);
    }, e.prototype.getOperator = function() {
      return this.operator;
    }, e;
  }(R)
), Xn = (
  /** @class */
  function(r) {
    S(e, r);
    function e(t, i) {
      return r.call(this, t, i) || this;
    }
    return Object.defineProperty(e.prototype, "type", {
      get: function() {
        return f.Term;
      },
      enumerable: !1,
      configurable: !0
    }), e.prototype.setOperator = function(t) {
      return this.setNode("operator", t);
    }, e.prototype.getOperator = function() {
      return this.operator;
    }, e.prototype.setExpression = function(t) {
      return this.setNode("expression", t);
    }, e.prototype.getExpression = function() {
      return this.expression;
    }, e;
  }(R)
), Zn = (
  /** @class */
  function(r) {
    S(e, r);
    function e(t, i) {
      return r.call(this, t, i) || this;
    }
    return Object.defineProperty(e.prototype, "type", {
      get: function() {
        return f.AttributeSelector;
      },
      enumerable: !1,
      configurable: !0
    }), e.prototype.setNamespacePrefix = function(t) {
      return this.setNode("namespacePrefix", t);
    }, e.prototype.getNamespacePrefix = function() {
      return this.namespacePrefix;
    }, e.prototype.setIdentifier = function(t) {
      return this.setNode("identifier", t);
    }, e.prototype.getIdentifier = function() {
      return this.identifier;
    }, e.prototype.setOperator = function(t) {
      return this.setNode("operator", t);
    }, e.prototype.getOperator = function() {
      return this.operator;
    }, e.prototype.setValue = function(t) {
      return this.setNode("value", t);
    }, e.prototype.getValue = function() {
      return this.value;
    }, e;
  }(R)
);
(function(r) {
  S(e, r);
  function e(t, i) {
    return r.call(this, t, i) || this;
  }
  return Object.defineProperty(e.prototype, "type", {
    get: function() {
      return f.Operator;
    },
    enumerable: !1,
    configurable: !0
  }), e;
})(R);
var ar = (
  /** @class */
  function(r) {
    S(e, r);
    function e(t, i) {
      return r.call(this, t, i) || this;
    }
    return Object.defineProperty(e.prototype, "type", {
      get: function() {
        return f.HexColorValue;
      },
      enumerable: !1,
      configurable: !0
    }), e;
  }(R)
), Yn = ".".charCodeAt(0), es = "0".charCodeAt(0), ts = "9".charCodeAt(0), or = (
  /** @class */
  function(r) {
    S(e, r);
    function e(t, i) {
      return r.call(this, t, i) || this;
    }
    return Object.defineProperty(e.prototype, "type", {
      get: function() {
        return f.NumericValue;
      },
      enumerable: !1,
      configurable: !0
    }), e.prototype.getValue = function() {
      for (var t = this.getText(), i = 0, n, s = 0, a = t.length; s < a && (n = t.charCodeAt(s), es <= n && n <= ts || n === Yn); s++)
        i += 1;
      return {
        value: t.substring(0, i),
        unit: i < t.length ? t.substring(i) : void 0
      };
    }, e;
  }(R)
), xt = (
  /** @class */
  function(r) {
    S(e, r);
    function e(t, i) {
      var n = r.call(this, t, i) || this;
      return n.variable = null, n.value = null, n.needsSemicolon = !0, n;
    }
    return Object.defineProperty(e.prototype, "type", {
      get: function() {
        return f.VariableDeclaration;
      },
      enumerable: !1,
      configurable: !0
    }), e.prototype.setVariable = function(t) {
      return t ? (t.attachTo(this), this.variable = t, !0) : !1;
    }, e.prototype.getVariable = function() {
      return this.variable;
    }, e.prototype.getName = function() {
      return this.variable ? this.variable.getName() : "";
    }, e.prototype.setValue = function(t) {
      return t ? (t.attachTo(this), this.value = t, !0) : !1;
    }, e.prototype.getValue = function() {
      return this.value;
    }, e;
  }(ir)
), Tt = (
  /** @class */
  function(r) {
    S(e, r);
    function e(t, i) {
      return r.call(this, t, i) || this;
    }
    return Object.defineProperty(e.prototype, "type", {
      get: function() {
        return f.Interpolation;
      },
      enumerable: !1,
      configurable: !0
    }), e;
  }(R)
), ur = (
  /** @class */
  function(r) {
    S(e, r);
    function e(t, i) {
      return r.call(this, t, i) || this;
    }
    return Object.defineProperty(e.prototype, "type", {
      get: function() {
        return f.VariableName;
      },
      enumerable: !1,
      configurable: !0
    }), e.prototype.getName = function() {
      return this.getText();
    }, e;
  }(R)
), Te = (
  /** @class */
  function(r) {
    S(e, r);
    function e(t, i) {
      return r.call(this, t, i) || this;
    }
    return Object.defineProperty(e.prototype, "type", {
      get: function() {
        return f.ExtendsReference;
      },
      enumerable: !1,
      configurable: !0
    }), e.prototype.getSelectors = function() {
      return this.selectors || (this.selectors = new X(this)), this.selectors;
    }, e;
  }(R)
), rs = (
  /** @class */
  function(r) {
    S(e, r);
    function e(t, i) {
      return r.call(this, t, i) || this;
    }
    return Object.defineProperty(e.prototype, "type", {
      get: function() {
        return f.MixinContentReference;
      },
      enumerable: !1,
      configurable: !0
    }), e.prototype.getArguments = function() {
      return this.arguments || (this.arguments = new X(this)), this.arguments;
    }, e;
  }(R)
), is = (
  /** @class */
  function(r) {
    S(e, r);
    function e(t, i) {
      return r.call(this, t, i) || this;
    }
    return Object.defineProperty(e.prototype, "type", {
      get: function() {
        return f.MixinContentReference;
      },
      enumerable: !1,
      configurable: !0
    }), e.prototype.getParameters = function() {
      return this.parameters || (this.parameters = new X(this)), this.parameters;
    }, e;
  }(U)
), ht = (
  /** @class */
  function(r) {
    S(e, r);
    function e(t, i) {
      return r.call(this, t, i) || this;
    }
    return Object.defineProperty(e.prototype, "type", {
      get: function() {
        return f.MixinReference;
      },
      enumerable: !1,
      configurable: !0
    }), e.prototype.getNamespaces = function() {
      return this.namespaces || (this.namespaces = new X(this)), this.namespaces;
    }, e.prototype.setIdentifier = function(t) {
      return this.setNode("identifier", t, 0);
    }, e.prototype.getIdentifier = function() {
      return this.identifier;
    }, e.prototype.getName = function() {
      return this.identifier ? this.identifier.getText() : "";
    }, e.prototype.getArguments = function() {
      return this.arguments || (this.arguments = new X(this)), this.arguments;
    }, e.prototype.setContent = function(t) {
      return this.setNode("content", t);
    }, e.prototype.getContent = function() {
      return this.content;
    }, e;
  }(R)
), Ke = (
  /** @class */
  function(r) {
    S(e, r);
    function e(t, i) {
      return r.call(this, t, i) || this;
    }
    return Object.defineProperty(e.prototype, "type", {
      get: function() {
        return f.MixinDeclaration;
      },
      enumerable: !1,
      configurable: !0
    }), e.prototype.setIdentifier = function(t) {
      return this.setNode("identifier", t, 0);
    }, e.prototype.getIdentifier = function() {
      return this.identifier;
    }, e.prototype.getName = function() {
      return this.identifier ? this.identifier.getText() : "";
    }, e.prototype.getParameters = function() {
      return this.parameters || (this.parameters = new X(this)), this.parameters;
    }, e.prototype.setGuard = function(t) {
      return t && (t.attachTo(this), this.guard = t), !1;
    }, e;
  }(U)
), ns = (
  /** @class */
  function(r) {
    S(e, r);
    function e(t, i) {
      return r.call(this, t, i) || this;
    }
    return Object.defineProperty(e.prototype, "type", {
      get: function() {
        return f.UnknownAtRule;
      },
      enumerable: !1,
      configurable: !0
    }), e.prototype.setAtRuleName = function(t) {
      this.atRuleName = t;
    }, e.prototype.getAtRuleName = function() {
      return this.atRuleName;
    }, e;
  }(U)
), ss = (
  /** @class */
  function(r) {
    S(e, r);
    function e() {
      return r !== null && r.apply(this, arguments) || this;
    }
    return Object.defineProperty(e.prototype, "type", {
      get: function() {
        return f.ListEntry;
      },
      enumerable: !1,
      configurable: !0
    }), e.prototype.setKey = function(t) {
      return this.setNode("key", t, 0);
    }, e.prototype.setValue = function(t) {
      return this.setNode("value", t, 1);
    }, e;
  }(R)
), as = (
  /** @class */
  function(r) {
    S(e, r);
    function e() {
      return r !== null && r.apply(this, arguments) || this;
    }
    return e.prototype.getConditions = function() {
      return this.conditions || (this.conditions = new X(this)), this.conditions;
    }, e;
  }(R)
), os = (
  /** @class */
  function(r) {
    S(e, r);
    function e() {
      return r !== null && r.apply(this, arguments) || this;
    }
    return e.prototype.setVariable = function(t) {
      return this.setNode("variable", t);
    }, e;
  }(R)
), Sr = (
  /** @class */
  function(r) {
    S(e, r);
    function e() {
      return r !== null && r.apply(this, arguments) || this;
    }
    return Object.defineProperty(e.prototype, "type", {
      get: function() {
        return f.Module;
      },
      enumerable: !1,
      configurable: !0
    }), e.prototype.setIdentifier = function(t) {
      return this.setNode("identifier", t, 0);
    }, e.prototype.getIdentifier = function() {
      return this.identifier;
    }, e;
  }(R)
), Fe;
(function(r) {
  r[r.Ignore = 1] = "Ignore", r[r.Warning = 2] = "Warning", r[r.Error = 4] = "Error";
})(Fe || (Fe = {}));
var us = (
  /** @class */
  function() {
    function r(e, t, i, n, s, a) {
      s === void 0 && (s = e.offset), a === void 0 && (a = e.length), this.node = e, this.rule = t, this.level = i, this.message = n || t.message, this.offset = s, this.length = a;
    }
    return r.prototype.getRule = function() {
      return this.rule;
    }, r.prototype.getLevel = function() {
      return this.level;
    }, r.prototype.getOffset = function() {
      return this.offset;
    }, r.prototype.getLength = function() {
      return this.length;
    }, r.prototype.getNode = function() {
      return this.node;
    }, r.prototype.getMessage = function() {
      return this.message;
    }, r;
  }()
);
function cs(r, e) {
  var t;
  return e.length === 0 ? t = r : t = r.replace(/\{(\d+)\}/g, function(i, n) {
    var s = n[0];
    return typeof e[s] < "u" ? e[s] : i;
  }), t;
}
function ls(r, e) {
  for (var t = [], i = 2; i < arguments.length; i++)
    t[i - 2] = arguments[i];
  return cs(e, t);
}
function ge(r) {
  return ls;
}
var O = ge(), L = (
  /** @class */
  function() {
    function r(e, t) {
      this.id = e, this.message = t;
    }
    return r;
  }()
), d = {
  NumberExpected: new L("css-numberexpected", O("expected.number", "number expected")),
  ConditionExpected: new L("css-conditionexpected", O("expected.condt", "condition expected")),
  RuleOrSelectorExpected: new L("css-ruleorselectorexpected", O("expected.ruleorselector", "at-rule or selector expected")),
  DotExpected: new L("css-dotexpected", O("expected.dot", "dot expected")),
  ColonExpected: new L("css-colonexpected", O("expected.colon", "colon expected")),
  SemiColonExpected: new L("css-semicolonexpected", O("expected.semicolon", "semi-colon expected")),
  TermExpected: new L("css-termexpected", O("expected.term", "term expected")),
  ExpressionExpected: new L("css-expressionexpected", O("expected.expression", "expression expected")),
  OperatorExpected: new L("css-operatorexpected", O("expected.operator", "operator expected")),
  IdentifierExpected: new L("css-identifierexpected", O("expected.ident", "identifier expected")),
  PercentageExpected: new L("css-percentageexpected", O("expected.percentage", "percentage expected")),
  URIOrStringExpected: new L("css-uriorstringexpected", O("expected.uriorstring", "uri or string expected")),
  URIExpected: new L("css-uriexpected", O("expected.uri", "URI expected")),
  VariableNameExpected: new L("css-varnameexpected", O("expected.varname", "variable name expected")),
  VariableValueExpected: new L("css-varvalueexpected", O("expected.varvalue", "variable value expected")),
  PropertyValueExpected: new L("css-propertyvalueexpected", O("expected.propvalue", "property value expected")),
  LeftCurlyExpected: new L("css-lcurlyexpected", O("expected.lcurly", "{ expected")),
  RightCurlyExpected: new L("css-rcurlyexpected", O("expected.rcurly", "} expected")),
  LeftSquareBracketExpected: new L("css-rbracketexpected", O("expected.lsquare", "[ expected")),
  RightSquareBracketExpected: new L("css-lbracketexpected", O("expected.rsquare", "] expected")),
  LeftParenthesisExpected: new L("css-lparentexpected", O("expected.lparen", "( expected")),
  RightParenthesisExpected: new L("css-rparentexpected", O("expected.rparent", ") expected")),
  CommaExpected: new L("css-commaexpected", O("expected.comma", "comma expected")),
  PageDirectiveOrDeclarationExpected: new L("css-pagedirordeclexpected", O("expected.pagedirordecl", "page directive or declaraton expected")),
  UnknownAtRule: new L("css-unknownatrule", O("unknown.atrule", "at-rule unknown")),
  UnknownKeyword: new L("css-unknownkeyword", O("unknown.keyword", "unknown keyword")),
  SelectorExpected: new L("css-selectorexpected", O("expected.selector", "selector expected")),
  StringLiteralExpected: new L("css-stringliteralexpected", O("expected.stringliteral", "string literal expected")),
  WhitespaceExpected: new L("css-whitespaceexpected", O("expected.whitespace", "whitespace expected")),
  MediaQueryExpected: new L("css-mediaqueryexpected", O("expected.mediaquery", "media query expected")),
  IdentifierOrWildcardExpected: new L("css-idorwildcardexpected", O("expected.idorwildcard", "identifier or wildcard expected")),
  WildcardExpected: new L("css-wildcardexpected", O("expected.wildcard", "wildcard expected")),
  IdentifierOrVariableExpected: new L("css-idorvarexpected", O("expected.idorvar", "identifier or variable expected"))
}, Er = {
  E: "Edge",
  FF: "Firefox",
  S: "Safari",
  C: "Chrome",
  IE: "IE",
  O: "Opera"
};
function Ni(r) {
  switch (r) {
    case "experimental":
      return `⚠️ Property is experimental. Be cautious when using it.️

`;
    case "nonstandard":
      return `🚨️ Property is nonstandard. Avoid using it.

`;
    case "obsolete":
      return `🚨️️️ Property is obsolete. Avoid using it.

`;
    default:
      return "";
  }
}
function $e(r, e, t) {
  var i;
  if (e ? i = {
    kind: "markdown",
    value: fs(r, t)
  } : i = {
    kind: "plaintext",
    value: hs(r, t)
  }, i.value !== "")
    return i;
}
function Dt(r) {
  return r = r.replace(/[\\`*_{}[\]()#+\-.!]/g, "\\$&"), r.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function hs(r, e) {
  if (!r.description || r.description === "")
    return "";
  if (typeof r.description != "string")
    return r.description.value;
  var t = "";
  if ((e == null ? void 0 : e.documentation) !== !1) {
    r.status && (t += Ni(r.status)), t += r.description;
    var i = Hi(r.browsers);
    i && (t += `
(` + i + ")"), "syntax" in r && (t += `

Syntax: ` + r.syntax);
  }
  return r.references && r.references.length > 0 && (e == null ? void 0 : e.references) !== !1 && (t.length > 0 && (t += `

`), t += r.references.map(function(n) {
    return n.name + ": " + n.url;
  }).join(" | ")), t;
}
function fs(r, e) {
  if (!r.description || r.description === "")
    return "";
  var t = "";
  if ((e == null ? void 0 : e.documentation) !== !1) {
    r.status && (t += Ni(r.status));
    var i = typeof r.description == "string" ? r.description : r.description.value;
    t += Dt(i);
    var n = Hi(r.browsers);
    n && (t += `

(` + Dt(n) + ")"), "syntax" in r && r.syntax && (t += `

Syntax: ` + Dt(r.syntax));
  }
  return r.references && r.references.length > 0 && (e == null ? void 0 : e.references) !== !1 && (t.length > 0 && (t += `

`), t += r.references.map(function(s) {
    return "[" + s.name + "](" + s.url + ")";
  }).join(" | ")), t;
}
function Hi(r) {
  return r === void 0 && (r = []), r.length === 0 ? null : r.map(function(e) {
    var t = "", i = e.match(/([A-Z]+)(\d+)?/), n = i[1], s = i[2];
    return n in Er && (t += Er[n]), s && (t += " " + s), t;
  }).join(", ");
}
var tt = ge(), ps = [
  { func: "rgb($red, $green, $blue)", desc: tt("css.builtin.rgb", "Creates a Color from red, green, and blue values.") },
  { func: "rgba($red, $green, $blue, $alpha)", desc: tt("css.builtin.rgba", "Creates a Color from red, green, blue, and alpha values.") },
  { func: "hsl($hue, $saturation, $lightness)", desc: tt("css.builtin.hsl", "Creates a Color from hue, saturation, and lightness values.") },
  { func: "hsla($hue, $saturation, $lightness, $alpha)", desc: tt("css.builtin.hsla", "Creates a Color from hue, saturation, lightness, and alpha values.") }
], ft = {
  aliceblue: "#f0f8ff",
  antiquewhite: "#faebd7",
  aqua: "#00ffff",
  aquamarine: "#7fffd4",
  azure: "#f0ffff",
  beige: "#f5f5dc",
  bisque: "#ffe4c4",
  black: "#000000",
  blanchedalmond: "#ffebcd",
  blue: "#0000ff",
  blueviolet: "#8a2be2",
  brown: "#a52a2a",
  burlywood: "#deb887",
  cadetblue: "#5f9ea0",
  chartreuse: "#7fff00",
  chocolate: "#d2691e",
  coral: "#ff7f50",
  cornflowerblue: "#6495ed",
  cornsilk: "#fff8dc",
  crimson: "#dc143c",
  cyan: "#00ffff",
  darkblue: "#00008b",
  darkcyan: "#008b8b",
  darkgoldenrod: "#b8860b",
  darkgray: "#a9a9a9",
  darkgrey: "#a9a9a9",
  darkgreen: "#006400",
  darkkhaki: "#bdb76b",
  darkmagenta: "#8b008b",
  darkolivegreen: "#556b2f",
  darkorange: "#ff8c00",
  darkorchid: "#9932cc",
  darkred: "#8b0000",
  darksalmon: "#e9967a",
  darkseagreen: "#8fbc8f",
  darkslateblue: "#483d8b",
  darkslategray: "#2f4f4f",
  darkslategrey: "#2f4f4f",
  darkturquoise: "#00ced1",
  darkviolet: "#9400d3",
  deeppink: "#ff1493",
  deepskyblue: "#00bfff",
  dimgray: "#696969",
  dimgrey: "#696969",
  dodgerblue: "#1e90ff",
  firebrick: "#b22222",
  floralwhite: "#fffaf0",
  forestgreen: "#228b22",
  fuchsia: "#ff00ff",
  gainsboro: "#dcdcdc",
  ghostwhite: "#f8f8ff",
  gold: "#ffd700",
  goldenrod: "#daa520",
  gray: "#808080",
  grey: "#808080",
  green: "#008000",
  greenyellow: "#adff2f",
  honeydew: "#f0fff0",
  hotpink: "#ff69b4",
  indianred: "#cd5c5c",
  indigo: "#4b0082",
  ivory: "#fffff0",
  khaki: "#f0e68c",
  lavender: "#e6e6fa",
  lavenderblush: "#fff0f5",
  lawngreen: "#7cfc00",
  lemonchiffon: "#fffacd",
  lightblue: "#add8e6",
  lightcoral: "#f08080",
  lightcyan: "#e0ffff",
  lightgoldenrodyellow: "#fafad2",
  lightgray: "#d3d3d3",
  lightgrey: "#d3d3d3",
  lightgreen: "#90ee90",
  lightpink: "#ffb6c1",
  lightsalmon: "#ffa07a",
  lightseagreen: "#20b2aa",
  lightskyblue: "#87cefa",
  lightslategray: "#778899",
  lightslategrey: "#778899",
  lightsteelblue: "#b0c4de",
  lightyellow: "#ffffe0",
  lime: "#00ff00",
  limegreen: "#32cd32",
  linen: "#faf0e6",
  magenta: "#ff00ff",
  maroon: "#800000",
  mediumaquamarine: "#66cdaa",
  mediumblue: "#0000cd",
  mediumorchid: "#ba55d3",
  mediumpurple: "#9370d8",
  mediumseagreen: "#3cb371",
  mediumslateblue: "#7b68ee",
  mediumspringgreen: "#00fa9a",
  mediumturquoise: "#48d1cc",
  mediumvioletred: "#c71585",
  midnightblue: "#191970",
  mintcream: "#f5fffa",
  mistyrose: "#ffe4e1",
  moccasin: "#ffe4b5",
  navajowhite: "#ffdead",
  navy: "#000080",
  oldlace: "#fdf5e6",
  olive: "#808000",
  olivedrab: "#6b8e23",
  orange: "#ffa500",
  orangered: "#ff4500",
  orchid: "#da70d6",
  palegoldenrod: "#eee8aa",
  palegreen: "#98fb98",
  paleturquoise: "#afeeee",
  palevioletred: "#d87093",
  papayawhip: "#ffefd5",
  peachpuff: "#ffdab9",
  peru: "#cd853f",
  pink: "#ffc0cb",
  plum: "#dda0dd",
  powderblue: "#b0e0e6",
  purple: "#800080",
  red: "#ff0000",
  rebeccapurple: "#663399",
  rosybrown: "#bc8f8f",
  royalblue: "#4169e1",
  saddlebrown: "#8b4513",
  salmon: "#fa8072",
  sandybrown: "#f4a460",
  seagreen: "#2e8b57",
  seashell: "#fff5ee",
  sienna: "#a0522d",
  silver: "#c0c0c0",
  skyblue: "#87ceeb",
  slateblue: "#6a5acd",
  slategray: "#708090",
  slategrey: "#708090",
  snow: "#fffafa",
  springgreen: "#00ff7f",
  steelblue: "#4682b4",
  tan: "#d2b48c",
  teal: "#008080",
  thistle: "#d8bfd8",
  tomato: "#ff6347",
  turquoise: "#40e0d0",
  violet: "#ee82ee",
  wheat: "#f5deb3",
  white: "#ffffff",
  whitesmoke: "#f5f5f5",
  yellow: "#ffff00",
  yellowgreen: "#9acd32"
}, Rr = {
  currentColor: "The value of the 'color' property. The computed value of the 'currentColor' keyword is the computed value of the 'color' property. If the 'currentColor' keyword is set on the 'color' property itself, it is treated as 'color:inherit' at parse time.",
  transparent: "Fully transparent. This keyword can be considered a shorthand for rgba(0,0,0,0) which is its computed value."
};
function Se(r, e) {
  var t = r.getText(), i = t.match(/^([-+]?[0-9]*\.?[0-9]+)(%?)$/);
  if (i) {
    i[2] && (e = 100);
    var n = parseFloat(i[1]) / e;
    if (n >= 0 && n <= 1)
      return n;
  }
  throw new Error();
}
function ds(r) {
  var e = r.getText(), t = e.match(/^([-+]?[0-9]*\.?[0-9]+)(deg)?$/);
  if (t)
    return parseFloat(e) % 360;
  throw new Error();
}
function ms(r) {
  var e = r.getName();
  return e ? /^(rgb|rgba|hsl|hsla)$/gi.test(e) : !1;
}
var Ar = 48, gs = 57, vs = 65, rt = 97, ys = 102;
function K(r) {
  return r < Ar ? 0 : r <= gs ? r - Ar : (r < rt && (r += rt - vs), r >= rt && r <= ys ? r - rt + 10 : 0);
}
function Ir(r) {
  if (r[0] !== "#")
    return null;
  switch (r.length) {
    case 4:
      return {
        red: K(r.charCodeAt(1)) * 17 / 255,
        green: K(r.charCodeAt(2)) * 17 / 255,
        blue: K(r.charCodeAt(3)) * 17 / 255,
        alpha: 1
      };
    case 5:
      return {
        red: K(r.charCodeAt(1)) * 17 / 255,
        green: K(r.charCodeAt(2)) * 17 / 255,
        blue: K(r.charCodeAt(3)) * 17 / 255,
        alpha: K(r.charCodeAt(4)) * 17 / 255
      };
    case 7:
      return {
        red: (K(r.charCodeAt(1)) * 16 + K(r.charCodeAt(2))) / 255,
        green: (K(r.charCodeAt(3)) * 16 + K(r.charCodeAt(4))) / 255,
        blue: (K(r.charCodeAt(5)) * 16 + K(r.charCodeAt(6))) / 255,
        alpha: 1
      };
    case 9:
      return {
        red: (K(r.charCodeAt(1)) * 16 + K(r.charCodeAt(2))) / 255,
        green: (K(r.charCodeAt(3)) * 16 + K(r.charCodeAt(4))) / 255,
        blue: (K(r.charCodeAt(5)) * 16 + K(r.charCodeAt(6))) / 255,
        alpha: (K(r.charCodeAt(7)) * 16 + K(r.charCodeAt(8))) / 255
      };
  }
  return null;
}
function bs(r, e, t, i) {
  if (i === void 0 && (i = 1), r = r / 60, e === 0)
    return { red: t, green: t, blue: t, alpha: i };
  var n = function(o, l, c) {
    for (; c < 0; )
      c += 6;
    for (; c >= 6; )
      c -= 6;
    return c < 1 ? (l - o) * c + o : c < 3 ? l : c < 4 ? (l - o) * (4 - c) + o : o;
  }, s = t <= 0.5 ? t * (e + 1) : t + e - t * e, a = t * 2 - s;
  return { red: n(a, s, r + 2), green: n(a, s, r), blue: n(a, s, r - 2), alpha: i };
}
function Cs(r) {
  var e = r.red, t = r.green, i = r.blue, n = r.alpha, s = Math.max(e, t, i), a = Math.min(e, t, i), o = 0, l = 0, c = (a + s) / 2, h = s - a;
  if (h > 0) {
    switch (l = Math.min(c <= 0.5 ? h / (2 * c) : h / (2 - 2 * c), 1), s) {
      case e:
        o = (t - i) / h + (t < i ? 6 : 0);
        break;
      case t:
        o = (i - e) / h + 2;
        break;
      case i:
        o = (e - t) / h + 4;
        break;
    }
    o *= 60, o = Math.round(o);
  }
  return { h: o, s: l, l: c, a: n };
}
function xs(r) {
  if (r.type === f.HexColorValue) {
    var e = r.getText();
    return Ir(e);
  } else if (r.type === f.Function) {
    var t = r, i = t.getName(), n = t.getArguments().getChildren();
    if (!i || n.length < 3 || n.length > 4)
      return null;
    try {
      var s = n.length === 4 ? Se(n[3], 1) : 1;
      if (i === "rgb" || i === "rgba")
        return {
          red: Se(n[0], 255),
          green: Se(n[1], 255),
          blue: Se(n[2], 255),
          alpha: s
        };
      if (i === "hsl" || i === "hsla") {
        var a = ds(n[0]), o = Se(n[1], 100), l = Se(n[2], 100);
        return bs(a, o, l, s);
      }
    } catch {
      return null;
    }
  } else if (r.type === f.Identifier) {
    if (r.parent && r.parent.type !== f.Term)
      return null;
    var c = r.parent;
    if (c && c.parent && c.parent.type === f.BinaryExpression) {
      var h = c.parent;
      if (h.parent && h.parent.type === f.ListEntry && h.parent.key === h)
        return null;
    }
    var p = r.getText().toLowerCase();
    if (p === "none")
      return null;
    var y = ft[p];
    if (y)
      return Ir(y);
  }
  return null;
}
var Dr = {
  bottom: "Computes to ‘100%’ for the vertical position if one or two values are given, otherwise specifies the bottom edge as the origin for the next offset.",
  center: "Computes to ‘50%’ (‘left 50%’) for the horizontal position if the horizontal position is not otherwise specified, or ‘50%’ (‘top 50%’) for the vertical position if it is.",
  left: "Computes to ‘0%’ for the horizontal position if one or two values are given, otherwise specifies the left edge as the origin for the next offset.",
  right: "Computes to ‘100%’ for the horizontal position if one or two values are given, otherwise specifies the right edge as the origin for the next offset.",
  top: "Computes to ‘0%’ for the vertical position if one or two values are given, otherwise specifies the top edge as the origin for the next offset."
}, Fr = {
  "no-repeat": "Placed once and not repeated in this direction.",
  repeat: "Repeated in this direction as often as needed to cover the background painting area.",
  "repeat-x": "Computes to ‘repeat no-repeat’.",
  "repeat-y": "Computes to ‘no-repeat repeat’.",
  round: "Repeated as often as will fit within the background positioning area. If it doesn’t fit a whole number of times, it is rescaled so that it does.",
  space: "Repeated as often as will fit within the background positioning area without being clipped and then the images are spaced out to fill the area."
}, Mr = {
  dashed: "A series of square-ended dashes.",
  dotted: "A series of round dots.",
  double: "Two parallel solid lines with some space between them.",
  groove: "Looks as if it were carved in the canvas.",
  hidden: "Same as ‘none’, but has different behavior in the border conflict resolution rules for border-collapsed tables.",
  inset: "Looks as if the content on the inside of the border is sunken into the canvas.",
  none: "No border. Color and width are ignored.",
  outset: "Looks as if the content on the inside of the border is coming out of the canvas.",
  ridge: "Looks as if it were coming out of the canvas.",
  solid: "A single line segment."
}, ks = ["medium", "thick", "thin"], Or = {
  "border-box": "The background is painted within (clipped to) the border box.",
  "content-box": "The background is painted within (clipped to) the content box.",
  "padding-box": "The background is painted within (clipped to) the padding box."
}, Lr = {
  "margin-box": "Uses the margin box as reference box.",
  "fill-box": "Uses the object bounding box as reference box.",
  "stroke-box": "Uses the stroke bounding box as reference box.",
  "view-box": "Uses the nearest SVG viewport as reference box."
}, $r = {
  initial: "Represents the value specified as the property’s initial value.",
  inherit: "Represents the computed value of the property on the element’s parent.",
  unset: "Acts as either `inherit` or `initial`, depending on whether the property is inherited or not."
}, Vr = {
  "url()": "Reference an image file by URL",
  "image()": "Provide image fallbacks and annotations.",
  "-webkit-image-set()": "Provide multiple resolutions. Remember to use unprefixed image-set() in addition.",
  "image-set()": "Provide multiple resolutions of an image and const the UA decide which is most appropriate in a given situation.",
  "-moz-element()": "Use an element in the document as an image. Remember to use unprefixed element() in addition.",
  "element()": "Use an element in the document as an image.",
  "cross-fade()": "Indicates the two images to be combined and how far along in the transition the combination is.",
  "-webkit-gradient()": "Deprecated. Use modern linear-gradient() or radial-gradient() instead.",
  "-webkit-linear-gradient()": "Linear gradient. Remember to use unprefixed version in addition.",
  "-moz-linear-gradient()": "Linear gradient. Remember to use unprefixed version in addition.",
  "-o-linear-gradient()": "Linear gradient. Remember to use unprefixed version in addition.",
  "linear-gradient()": "A linear gradient is created by specifying a straight gradient line, and then several colors placed along that line.",
  "-webkit-repeating-linear-gradient()": "Repeating Linear gradient. Remember to use unprefixed version in addition.",
  "-moz-repeating-linear-gradient()": "Repeating Linear gradient. Remember to use unprefixed version in addition.",
  "-o-repeating-linear-gradient()": "Repeating Linear gradient. Remember to use unprefixed version in addition.",
  "repeating-linear-gradient()": "Same as linear-gradient, except the color-stops are repeated infinitely in both directions, with their positions shifted by multiples of the difference between the last specified color-stop’s position and the first specified color-stop’s position.",
  "-webkit-radial-gradient()": "Radial gradient. Remember to use unprefixed version in addition.",
  "-moz-radial-gradient()": "Radial gradient. Remember to use unprefixed version in addition.",
  "radial-gradient()": "Colors emerge from a single point and smoothly spread outward in a circular or elliptical shape.",
  "-webkit-repeating-radial-gradient()": "Repeating radial gradient. Remember to use unprefixed version in addition.",
  "-moz-repeating-radial-gradient()": "Repeating radial gradient. Remember to use unprefixed version in addition.",
  "repeating-radial-gradient()": "Same as radial-gradient, except the color-stops are repeated infinitely in both directions, with their positions shifted by multiples of the difference between the last specified color-stop’s position and the first specified color-stop’s position."
}, Br = {
  ease: "Equivalent to cubic-bezier(0.25, 0.1, 0.25, 1.0).",
  "ease-in": "Equivalent to cubic-bezier(0.42, 0, 1.0, 1.0).",
  "ease-in-out": "Equivalent to cubic-bezier(0.42, 0, 0.58, 1.0).",
  "ease-out": "Equivalent to cubic-bezier(0, 0, 0.58, 1.0).",
  linear: "Equivalent to cubic-bezier(0.0, 0.0, 1.0, 1.0).",
  "step-end": "Equivalent to steps(1, end).",
  "step-start": "Equivalent to steps(1, start).",
  "steps()": "The first parameter specifies the number of intervals in the function. The second parameter, which is optional, is either the value “start” or “end”.",
  "cubic-bezier()": "Specifies a cubic-bezier curve. The four values specify points P1 and P2  of the curve as (x1, y1, x2, y2).",
  "cubic-bezier(0.6, -0.28, 0.735, 0.045)": "Ease-in Back. Overshoots.",
  "cubic-bezier(0.68, -0.55, 0.265, 1.55)": "Ease-in-out Back. Overshoots.",
  "cubic-bezier(0.175, 0.885, 0.32, 1.275)": "Ease-out Back. Overshoots.",
  "cubic-bezier(0.6, 0.04, 0.98, 0.335)": "Ease-in Circular. Based on half circle.",
  "cubic-bezier(0.785, 0.135, 0.15, 0.86)": "Ease-in-out Circular. Based on half circle.",
  "cubic-bezier(0.075, 0.82, 0.165, 1)": "Ease-out Circular. Based on half circle.",
  "cubic-bezier(0.55, 0.055, 0.675, 0.19)": "Ease-in Cubic. Based on power of three.",
  "cubic-bezier(0.645, 0.045, 0.355, 1)": "Ease-in-out Cubic. Based on power of three.",
  "cubic-bezier(0.215, 0.610, 0.355, 1)": "Ease-out Cubic. Based on power of three.",
  "cubic-bezier(0.95, 0.05, 0.795, 0.035)": "Ease-in Exponential. Based on two to the power ten.",
  "cubic-bezier(1, 0, 0, 1)": "Ease-in-out Exponential. Based on two to the power ten.",
  "cubic-bezier(0.19, 1, 0.22, 1)": "Ease-out Exponential. Based on two to the power ten.",
  "cubic-bezier(0.47, 0, 0.745, 0.715)": "Ease-in Sine.",
  "cubic-bezier(0.445, 0.05, 0.55, 0.95)": "Ease-in-out Sine.",
  "cubic-bezier(0.39, 0.575, 0.565, 1)": "Ease-out Sine.",
  "cubic-bezier(0.55, 0.085, 0.68, 0.53)": "Ease-in Quadratic. Based on power of two.",
  "cubic-bezier(0.455, 0.03, 0.515, 0.955)": "Ease-in-out Quadratic. Based on power of two.",
  "cubic-bezier(0.25, 0.46, 0.45, 0.94)": "Ease-out Quadratic. Based on power of two.",
  "cubic-bezier(0.895, 0.03, 0.685, 0.22)": "Ease-in Quartic. Based on power of four.",
  "cubic-bezier(0.77, 0, 0.175, 1)": "Ease-in-out Quartic. Based on power of four.",
  "cubic-bezier(0.165, 0.84, 0.44, 1)": "Ease-out Quartic. Based on power of four.",
  "cubic-bezier(0.755, 0.05, 0.855, 0.06)": "Ease-in Quintic. Based on power of five.",
  "cubic-bezier(0.86, 0, 0.07, 1)": "Ease-in-out Quintic. Based on power of five.",
  "cubic-bezier(0.23, 1, 0.320, 1)": "Ease-out Quintic. Based on power of five."
}, jr = {
  "circle()": "Defines a circle.",
  "ellipse()": "Defines an ellipse.",
  "inset()": "Defines an inset rectangle.",
  "polygon()": "Defines a polygon."
}, ws = {
  length: ["em", "rem", "ex", "px", "cm", "mm", "in", "pt", "pc", "ch", "vw", "vh", "vmin", "vmax"],
  angle: ["deg", "rad", "grad", "turn"],
  time: ["ms", "s"],
  frequency: ["Hz", "kHz"],
  resolution: ["dpi", "dpcm", "dppx"],
  percentage: ["%", "fr"]
}, _s = [
  "a",
  "abbr",
  "address",
  "area",
  "article",
  "aside",
  "audio",
  "b",
  "base",
  "bdi",
  "bdo",
  "blockquote",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "col",
  "colgroup",
  "data",
  "datalist",
  "dd",
  "del",
  "details",
  "dfn",
  "dialog",
  "div",
  "dl",
  "dt",
  "em",
  "embed",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hgroup",
  "hr",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "keygen",
  "label",
  "legend",
  "li",
  "link",
  "main",
  "map",
  "mark",
  "menu",
  "menuitem",
  "meta",
  "meter",
  "nav",
  "noscript",
  "object",
  "ol",
  "optgroup",
  "option",
  "output",
  "p",
  "param",
  "picture",
  "pre",
  "progress",
  "q",
  "rb",
  "rp",
  "rt",
  "rtc",
  "ruby",
  "s",
  "samp",
  "script",
  "section",
  "select",
  "small",
  "source",
  "span",
  "strong",
  "style",
  "sub",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "template",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "title",
  "tr",
  "track",
  "u",
  "ul",
  "const",
  "video",
  "wbr"
], Ps = [
  "circle",
  "clipPath",
  "cursor",
  "defs",
  "desc",
  "ellipse",
  "feBlend",
  "feColorMatrix",
  "feComponentTransfer",
  "feComposite",
  "feConvolveMatrix",
  "feDiffuseLighting",
  "feDisplacementMap",
  "feDistantLight",
  "feDropShadow",
  "feFlood",
  "feFuncA",
  "feFuncB",
  "feFuncG",
  "feFuncR",
  "feGaussianBlur",
  "feImage",
  "feMerge",
  "feMergeNode",
  "feMorphology",
  "feOffset",
  "fePointLight",
  "feSpecularLighting",
  "feSpotLight",
  "feTile",
  "feTurbulence",
  "filter",
  "foreignObject",
  "g",
  "hatch",
  "hatchpath",
  "image",
  "line",
  "linearGradient",
  "marker",
  "mask",
  "mesh",
  "meshpatch",
  "meshrow",
  "metadata",
  "mpath",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "radialGradient",
  "rect",
  "set",
  "solidcolor",
  "stop",
  "svg",
  "switch",
  "symbol",
  "text",
  "textPath",
  "tspan",
  "use",
  "view"
], Ss = [
  "@bottom-center",
  "@bottom-left",
  "@bottom-left-corner",
  "@bottom-right",
  "@bottom-right-corner",
  "@left-bottom",
  "@left-middle",
  "@left-top",
  "@right-bottom",
  "@right-middle",
  "@right-top",
  "@top-center",
  "@top-left",
  "@top-left-corner",
  "@top-right",
  "@top-right-corner"
];
function ae(r) {
  return typeof r < "u";
}
var Gi = (
  /** @class */
  function() {
    function r(e) {
      e === void 0 && (e = new tr()), this.keyframeRegex = /^@(\-(webkit|ms|moz|o)\-)?keyframes$/i, this.scanner = e, this.token = { type: u.EOF, offset: -1, len: 0, text: "" }, this.prevToken = void 0;
    }
    return r.prototype.peekIdent = function(e) {
      return u.Ident === this.token.type && e.length === this.token.text.length && e === this.token.text.toLowerCase();
    }, r.prototype.peekKeyword = function(e) {
      return u.AtKeyword === this.token.type && e.length === this.token.text.length && e === this.token.text.toLowerCase();
    }, r.prototype.peekDelim = function(e) {
      return u.Delim === this.token.type && e === this.token.text;
    }, r.prototype.peek = function(e) {
      return e === this.token.type;
    }, r.prototype.peekOne = function(e) {
      return e.indexOf(this.token.type) !== -1;
    }, r.prototype.peekRegExp = function(e, t) {
      return e !== this.token.type ? !1 : t.test(this.token.text);
    }, r.prototype.hasWhitespace = function() {
      return !!this.prevToken && this.prevToken.offset + this.prevToken.len !== this.token.offset;
    }, r.prototype.consumeToken = function() {
      this.prevToken = this.token, this.token = this.scanner.scan();
    }, r.prototype.mark = function() {
      return {
        prev: this.prevToken,
        curr: this.token,
        pos: this.scanner.pos()
      };
    }, r.prototype.restoreAtMark = function(e) {
      this.prevToken = e.prev, this.token = e.curr, this.scanner.goBackTo(e.pos);
    }, r.prototype.try = function(e) {
      var t = this.mark(), i = e();
      return i || (this.restoreAtMark(t), null);
    }, r.prototype.acceptOneKeyword = function(e) {
      if (u.AtKeyword === this.token.type)
        for (var t = 0, i = e; t < i.length; t++) {
          var n = i[t];
          if (n.length === this.token.text.length && n === this.token.text.toLowerCase())
            return this.consumeToken(), !0;
        }
      return !1;
    }, r.prototype.accept = function(e) {
      return e === this.token.type ? (this.consumeToken(), !0) : !1;
    }, r.prototype.acceptIdent = function(e) {
      return this.peekIdent(e) ? (this.consumeToken(), !0) : !1;
    }, r.prototype.acceptKeyword = function(e) {
      return this.peekKeyword(e) ? (this.consumeToken(), !0) : !1;
    }, r.prototype.acceptDelim = function(e) {
      return this.peekDelim(e) ? (this.consumeToken(), !0) : !1;
    }, r.prototype.acceptRegexp = function(e) {
      return e.test(this.token.text) ? (this.consumeToken(), !0) : !1;
    }, r.prototype._parseRegexp = function(e) {
      var t = this.createNode(f.Identifier);
      do
        ;
      while (this.acceptRegexp(e));
      return this.finish(t);
    }, r.prototype.acceptUnquotedString = function() {
      var e = this.scanner.pos();
      this.scanner.goBackTo(this.token.offset);
      var t = this.scanner.scanUnquotedString();
      return t ? (this.token = t, this.consumeToken(), !0) : (this.scanner.goBackTo(e), !1);
    }, r.prototype.resync = function(e, t) {
      for (; ; ) {
        if (e && e.indexOf(this.token.type) !== -1)
          return this.consumeToken(), !0;
        if (t && t.indexOf(this.token.type) !== -1)
          return !0;
        if (this.token.type === u.EOF)
          return !1;
        this.token = this.scanner.scan();
      }
    }, r.prototype.createNode = function(e) {
      return new R(this.token.offset, this.token.len, e);
    }, r.prototype.create = function(e) {
      return new e(this.token.offset, this.token.len);
    }, r.prototype.finish = function(e, t, i, n) {
      if (!(e instanceof X) && (t && this.markError(e, t, i, n), this.prevToken)) {
        var s = this.prevToken.offset + this.prevToken.len;
        e.length = s > e.offset ? s - e.offset : 0;
      }
      return e;
    }, r.prototype.markError = function(e, t, i, n) {
      this.token !== this.lastErrorToken && (e.addIssue(new us(e, t, Fe.Error, void 0, this.token.offset, this.token.len)), this.lastErrorToken = this.token), (i || n) && this.resync(i, n);
    }, r.prototype.parseStylesheet = function(e) {
      var t = e.version, i = e.getText(), n = function(s, a) {
        if (e.version !== t)
          throw new Error("Underlying model has changed, AST is no longer valid");
        return i.substr(s, a);
      };
      return this.internalParse(i, this._parseStylesheet, n);
    }, r.prototype.internalParse = function(e, t, i) {
      this.scanner.setSource(e), this.token = this.scanner.scan();
      var n = t.bind(this)();
      return n && (i ? n.textProvider = i : n.textProvider = function(s, a) {
        return e.substr(s, a);
      }), n;
    }, r.prototype._parseStylesheet = function() {
      for (var e = this.create(Fn); e.addChild(this._parseStylesheetStart()); )
        ;
      var t = !1;
      do {
        var i = !1;
        do {
          i = !1;
          var n = this._parseStylesheetStatement();
          for (n && (e.addChild(n), i = !0, t = !1, !this.peek(u.EOF) && this._needsSemicolonAfter(n) && !this.accept(u.SemiColon) && this.markError(e, d.SemiColonExpected)); this.accept(u.SemiColon) || this.accept(u.CDO) || this.accept(u.CDC); )
            i = !0, t = !1;
        } while (i);
        if (this.peek(u.EOF))
          break;
        t || (this.peek(u.AtKeyword) ? this.markError(e, d.UnknownAtRule) : this.markError(e, d.RuleOrSelectorExpected), t = !0), this.consumeToken();
      } while (!this.peek(u.EOF));
      return this.finish(e);
    }, r.prototype._parseStylesheetStart = function() {
      return this._parseCharset();
    }, r.prototype._parseStylesheetStatement = function(e) {
      return e === void 0 && (e = !1), this.peek(u.AtKeyword) ? this._parseStylesheetAtStatement(e) : this._parseRuleset(e);
    }, r.prototype._parseStylesheetAtStatement = function(e) {
      return e === void 0 && (e = !1), this._parseImport() || this._parseMedia(e) || this._parsePage() || this._parseFontFace() || this._parseKeyframe() || this._parseSupports(e) || this._parseViewPort() || this._parseNamespace() || this._parseDocument() || this._parseUnknownAtRule();
    }, r.prototype._tryParseRuleset = function(e) {
      var t = this.mark();
      if (this._parseSelector(e)) {
        for (; this.accept(u.Comma) && this._parseSelector(e); )
          ;
        if (this.accept(u.CurlyL))
          return this.restoreAtMark(t), this._parseRuleset(e);
      }
      return this.restoreAtMark(t), null;
    }, r.prototype._parseRuleset = function(e) {
      e === void 0 && (e = !1);
      var t = this.create(ut), i = t.getSelectors();
      if (!i.addChild(this._parseSelector(e)))
        return null;
      for (; this.accept(u.Comma); )
        if (!i.addChild(this._parseSelector(e)))
          return this.finish(t, d.SelectorExpected);
      return this._parseBody(t, this._parseRuleSetDeclaration.bind(this));
    }, r.prototype._parseRuleSetDeclarationAtStatement = function() {
      return this._parseUnknownAtRule();
    }, r.prototype._parseRuleSetDeclaration = function() {
      return this.peek(u.AtKeyword) ? this._parseRuleSetDeclarationAtStatement() : this._parseDeclaration();
    }, r.prototype._needsSemicolonAfter = function(e) {
      switch (e.type) {
        case f.Keyframe:
        case f.ViewPort:
        case f.Media:
        case f.Ruleset:
        case f.Namespace:
        case f.If:
        case f.For:
        case f.Each:
        case f.While:
        case f.MixinDeclaration:
        case f.FunctionDeclaration:
        case f.MixinContentDeclaration:
          return !1;
        case f.ExtendsReference:
        case f.MixinContentReference:
        case f.ReturnStatement:
        case f.MediaQuery:
        case f.Debug:
        case f.Import:
        case f.AtApplyRule:
        case f.CustomPropertyDeclaration:
          return !0;
        case f.VariableDeclaration:
          return e.needsSemicolon;
        case f.MixinReference:
          return !e.getContent();
        case f.Declaration:
          return !e.getNestedProperties();
      }
      return !1;
    }, r.prototype._parseDeclarations = function(e) {
      var t = this.create(rr);
      if (!this.accept(u.CurlyL))
        return null;
      for (var i = e(); t.addChild(i) && !this.peek(u.CurlyR); ) {
        if (this._needsSemicolonAfter(i) && !this.accept(u.SemiColon))
          return this.finish(t, d.SemiColonExpected, [u.SemiColon, u.CurlyR]);
        for (i && this.prevToken && this.prevToken.type === u.SemiColon && (i.semicolonPosition = this.prevToken.offset); this.accept(u.SemiColon); )
          ;
        i = e();
      }
      return this.accept(u.CurlyR) ? this.finish(t) : this.finish(t, d.RightCurlyExpected, [u.CurlyR, u.SemiColon]);
    }, r.prototype._parseBody = function(e, t) {
      return e.setDeclarations(this._parseDeclarations(t)) ? this.finish(e) : this.finish(e, d.LeftCurlyExpected, [u.CurlyR, u.SemiColon]);
    }, r.prototype._parseSelector = function(e) {
      var t = this.create(bt), i = !1;
      for (e && (i = t.addChild(this._parseCombinator())); t.addChild(this._parseSimpleSelector()); )
        i = !0, t.addChild(this._parseCombinator());
      return i ? this.finish(t) : null;
    }, r.prototype._parseDeclaration = function(e) {
      var t = this._tryParseCustomPropertyDeclaration(e);
      if (t)
        return t;
      var i = this.create(Ie);
      return i.setProperty(this._parseProperty()) ? this.accept(u.Colon) ? (this.prevToken && (i.colonPosition = this.prevToken.offset), i.setValue(this._parseExpr()) ? (i.addChild(this._parsePrio()), this.peek(u.SemiColon) && (i.semicolonPosition = this.token.offset), this.finish(i)) : this.finish(i, d.PropertyValueExpected)) : this.finish(i, d.ColonExpected, [u.Colon], e || [u.SemiColon]) : null;
    }, r.prototype._tryParseCustomPropertyDeclaration = function(e) {
      if (!this.peekRegExp(u.Ident, /^--/))
        return null;
      var t = this.create(On);
      if (!t.setProperty(this._parseProperty()))
        return null;
      if (!this.accept(u.Colon))
        return this.finish(t, d.ColonExpected, [u.Colon]);
      this.prevToken && (t.colonPosition = this.prevToken.offset);
      var i = this.mark();
      if (this.peek(u.CurlyL)) {
        var n = this.create(Mn), s = this._parseDeclarations(this._parseRuleSetDeclaration.bind(this));
        if (n.setDeclarations(s) && !s.isErroneous(!0) && (n.addChild(this._parsePrio()), this.peek(u.SemiColon)))
          return this.finish(n), t.setPropertySet(n), t.semicolonPosition = this.token.offset, this.finish(t);
        this.restoreAtMark(i);
      }
      var a = this._parseExpr();
      return a && !a.isErroneous(!0) && (this._parsePrio(), this.peekOne(e || [u.SemiColon])) ? (t.setValue(a), t.semicolonPosition = this.token.offset, this.finish(t)) : (this.restoreAtMark(i), t.addChild(this._parseCustomPropertyValue(e)), t.addChild(this._parsePrio()), ae(t.colonPosition) && this.token.offset === t.colonPosition + 1 ? this.finish(t, d.PropertyValueExpected) : this.finish(t));
    }, r.prototype._parseCustomPropertyValue = function(e) {
      var t = this;
      e === void 0 && (e = [u.CurlyR]);
      var i = this.create(R), n = function() {
        return a === 0 && o === 0 && l === 0;
      }, s = function() {
        return e.indexOf(t.token.type) !== -1;
      }, a = 0, o = 0, l = 0;
      e:
        for (; ; ) {
          switch (this.token.type) {
            case u.SemiColon:
              if (n())
                break e;
              break;
            case u.Exclamation:
              if (n())
                break e;
              break;
            case u.CurlyL:
              a++;
              break;
            case u.CurlyR:
              if (a--, a < 0) {
                if (s() && o === 0 && l === 0)
                  break e;
                return this.finish(i, d.LeftCurlyExpected);
              }
              break;
            case u.ParenthesisL:
              o++;
              break;
            case u.ParenthesisR:
              if (o--, o < 0) {
                if (s() && l === 0 && a === 0)
                  break e;
                return this.finish(i, d.LeftParenthesisExpected);
              }
              break;
            case u.BracketL:
              l++;
              break;
            case u.BracketR:
              if (l--, l < 0)
                return this.finish(i, d.LeftSquareBracketExpected);
              break;
            case u.BadString:
              break e;
            case u.EOF:
              var c = d.RightCurlyExpected;
              return l > 0 ? c = d.RightSquareBracketExpected : o > 0 && (c = d.RightParenthesisExpected), this.finish(i, c);
          }
          this.consumeToken();
        }
      return this.finish(i);
    }, r.prototype._tryToParseDeclaration = function(e) {
      var t = this.mark();
      return this._parseProperty() && this.accept(u.Colon) ? (this.restoreAtMark(t), this._parseDeclaration(e)) : (this.restoreAtMark(t), null);
    }, r.prototype._parseProperty = function() {
      var e = this.create(nr), t = this.mark();
      return (this.acceptDelim("*") || this.acceptDelim("_")) && this.hasWhitespace() ? (this.restoreAtMark(t), null) : e.setIdentifier(this._parsePropertyIdentifier()) ? this.finish(e) : null;
    }, r.prototype._parsePropertyIdentifier = function() {
      return this._parseIdent();
    }, r.prototype._parseCharset = function() {
      if (!this.peek(u.Charset))
        return null;
      var e = this.create(R);
      return this.consumeToken(), this.accept(u.String) ? this.accept(u.SemiColon) ? this.finish(e) : this.finish(e, d.SemiColonExpected) : this.finish(e, d.IdentifierExpected);
    }, r.prototype._parseImport = function() {
      if (!this.peekKeyword("@import"))
        return null;
      var e = this.create(sr);
      return this.consumeToken(), !e.addChild(this._parseURILiteral()) && !e.addChild(this._parseStringLiteral()) ? this.finish(e, d.URIOrStringExpected) : (!this.peek(u.SemiColon) && !this.peek(u.EOF) && e.setMedialist(this._parseMediaQueryList()), this.finish(e));
    }, r.prototype._parseNamespace = function() {
      if (!this.peekKeyword("@namespace"))
        return null;
      var e = this.create(Nn);
      return this.consumeToken(), !e.addChild(this._parseURILiteral()) && (e.addChild(this._parseIdent()), !e.addChild(this._parseURILiteral()) && !e.addChild(this._parseStringLiteral())) ? this.finish(e, d.URIExpected, [u.SemiColon]) : this.accept(u.SemiColon) ? this.finish(e) : this.finish(e, d.SemiColonExpected);
    }, r.prototype._parseFontFace = function() {
      if (!this.peekKeyword("@font-face"))
        return null;
      var e = this.create(ji);
      return this.consumeToken(), this._parseBody(e, this._parseRuleSetDeclaration.bind(this));
    }, r.prototype._parseViewPort = function() {
      if (!this.peekKeyword("@-ms-viewport") && !this.peekKeyword("@-o-viewport") && !this.peekKeyword("@viewport"))
        return null;
      var e = this.create(Un);
      return this.consumeToken(), this._parseBody(e, this._parseRuleSetDeclaration.bind(this));
    }, r.prototype._parseKeyframe = function() {
      if (!this.peekRegExp(u.AtKeyword, this.keyframeRegex))
        return null;
      var e = this.create(Ui), t = this.create(R);
      return this.consumeToken(), e.setKeyword(this.finish(t)), t.matches("@-ms-keyframes") && this.markError(t, d.UnknownKeyword), e.setIdentifier(this._parseKeyframeIdent()) ? this._parseBody(e, this._parseKeyframeSelector.bind(this)) : this.finish(e, d.IdentifierExpected, [u.CurlyR]);
    }, r.prototype._parseKeyframeIdent = function() {
      return this._parseIdent([D.Keyframe]);
    }, r.prototype._parseKeyframeSelector = function() {
      var e = this.create(Pr);
      if (!e.addChild(this._parseIdent()) && !this.accept(u.Percentage))
        return null;
      for (; this.accept(u.Comma); )
        if (!e.addChild(this._parseIdent()) && !this.accept(u.Percentage))
          return this.finish(e, d.PercentageExpected);
      return this._parseBody(e, this._parseRuleSetDeclaration.bind(this));
    }, r.prototype._tryParseKeyframeSelector = function() {
      var e = this.create(Pr), t = this.mark();
      if (!e.addChild(this._parseIdent()) && !this.accept(u.Percentage))
        return null;
      for (; this.accept(u.Comma); )
        if (!e.addChild(this._parseIdent()) && !this.accept(u.Percentage))
          return this.restoreAtMark(t), null;
      return this.peek(u.CurlyL) ? this._parseBody(e, this._parseRuleSetDeclaration.bind(this)) : (this.restoreAtMark(t), null);
    }, r.prototype._parseSupports = function(e) {
      if (e === void 0 && (e = !1), !this.peekKeyword("@supports"))
        return null;
      var t = this.create(Ut);
      return this.consumeToken(), t.addChild(this._parseSupportsCondition()), this._parseBody(t, this._parseSupportsDeclaration.bind(this, e));
    }, r.prototype._parseSupportsDeclaration = function(e) {
      return e === void 0 && (e = !1), e ? this._tryParseRuleset(!0) || this._tryToParseDeclaration() || this._parseStylesheetStatement(!0) : this._parseStylesheetStatement(!1);
    }, r.prototype._parseSupportsCondition = function() {
      var e = this.create(We);
      if (this.acceptIdent("not"))
        e.addChild(this._parseSupportsConditionInParens());
      else if (e.addChild(this._parseSupportsConditionInParens()), this.peekRegExp(u.Ident, /^(and|or)$/i))
        for (var t = this.token.text.toLowerCase(); this.acceptIdent(t); )
          e.addChild(this._parseSupportsConditionInParens());
      return this.finish(e);
    }, r.prototype._parseSupportsConditionInParens = function() {
      var e = this.create(We);
      if (this.accept(u.ParenthesisL))
        return this.prevToken && (e.lParent = this.prevToken.offset), !e.addChild(this._tryToParseDeclaration([u.ParenthesisR])) && !this._parseSupportsCondition() ? this.finish(e, d.ConditionExpected) : this.accept(u.ParenthesisR) ? (this.prevToken && (e.rParent = this.prevToken.offset), this.finish(e)) : this.finish(e, d.RightParenthesisExpected, [u.ParenthesisR], []);
      if (this.peek(u.Ident)) {
        var t = this.mark();
        if (this.consumeToken(), !this.hasWhitespace() && this.accept(u.ParenthesisL)) {
          for (var i = 1; this.token.type !== u.EOF && i !== 0; )
            this.token.type === u.ParenthesisL ? i++ : this.token.type === u.ParenthesisR && i--, this.consumeToken();
          return this.finish(e);
        } else
          this.restoreAtMark(t);
      }
      return this.finish(e, d.LeftParenthesisExpected, [], [u.ParenthesisL]);
    }, r.prototype._parseMediaDeclaration = function(e) {
      return e === void 0 && (e = !1), e ? this._tryParseRuleset(!0) || this._tryToParseDeclaration() || this._parseStylesheetStatement(!0) : this._parseStylesheetStatement(!1);
    }, r.prototype._parseMedia = function(e) {
      if (e === void 0 && (e = !1), !this.peekKeyword("@media"))
        return null;
      var t = this.create(Ti);
      return this.consumeToken(), t.addChild(this._parseMediaQueryList()) ? this._parseBody(t, this._parseMediaDeclaration.bind(this, e)) : this.finish(t, d.MediaQueryExpected);
    }, r.prototype._parseMediaQueryList = function() {
      var e = this.create(Ki);
      if (!e.addChild(this._parseMediaQuery([u.CurlyL])))
        return this.finish(e, d.MediaQueryExpected);
      for (; this.accept(u.Comma); )
        if (!e.addChild(this._parseMediaQuery([u.CurlyL])))
          return this.finish(e, d.MediaQueryExpected);
      return this.finish(e);
    }, r.prototype._parseMediaQuery = function(e) {
      var t = this.create(zi), i = !0, n = !1;
      if (!this.peek(u.ParenthesisL)) {
        if (this.acceptIdent("only") || this.acceptIdent("not"), !t.addChild(this._parseIdent()))
          return null;
        n = !0, i = this.acceptIdent("and");
      }
      for (; i; ) {
        if (t.addChild(this._parseMediaContentStart())) {
          i = this.acceptIdent("and");
          continue;
        }
        if (!this.accept(u.ParenthesisL))
          return n ? this.finish(t, d.LeftParenthesisExpected, [], e) : null;
        if (!t.addChild(this._parseMediaFeatureName()))
          return this.finish(t, d.IdentifierExpected, [], e);
        if (this.accept(u.Colon) && !t.addChild(this._parseExpr()))
          return this.finish(t, d.TermExpected, [], e);
        if (!this.accept(u.ParenthesisR))
          return this.finish(t, d.RightParenthesisExpected, [], e);
        i = this.acceptIdent("and");
      }
      return this.finish(t);
    }, r.prototype._parseMediaContentStart = function() {
      return null;
    }, r.prototype._parseMediaFeatureName = function() {
      return this._parseIdent();
    }, r.prototype._parseMedium = function() {
      var e = this.create(R);
      return e.addChild(this._parseIdent()) ? this.finish(e) : null;
    }, r.prototype._parsePageDeclaration = function() {
      return this._parsePageMarginBox() || this._parseRuleSetDeclaration();
    }, r.prototype._parsePage = function() {
      if (!this.peekKeyword("@page"))
        return null;
      var e = this.create(Gn);
      if (this.consumeToken(), e.addChild(this._parsePageSelector())) {
        for (; this.accept(u.Comma); )
          if (!e.addChild(this._parsePageSelector()))
            return this.finish(e, d.IdentifierExpected);
      }
      return this._parseBody(e, this._parsePageDeclaration.bind(this));
    }, r.prototype._parsePageMarginBox = function() {
      if (!this.peek(u.AtKeyword))
        return null;
      var e = this.create(Qn);
      return this.acceptOneKeyword(Ss) || this.markError(e, d.UnknownAtRule, [], [u.CurlyL]), this._parseBody(e, this._parseRuleSetDeclaration.bind(this));
    }, r.prototype._parsePageSelector = function() {
      if (!this.peek(u.Ident) && !this.peek(u.Colon))
        return null;
      var e = this.create(R);
      return e.addChild(this._parseIdent()), this.accept(u.Colon) && !e.addChild(this._parseIdent()) ? this.finish(e, d.IdentifierExpected) : this.finish(e);
    }, r.prototype._parseDocument = function() {
      if (!this.peekKeyword("@-moz-document"))
        return null;
      var e = this.create(Hn);
      return this.consumeToken(), this.resync([], [u.CurlyL]), this._parseBody(e, this._parseStylesheetStatement.bind(this));
    }, r.prototype._parseUnknownAtRule = function() {
      if (!this.peek(u.AtKeyword))
        return null;
      var e = this.create(ns);
      e.addChild(this._parseUnknownAtRuleName());
      var t = function() {
        return n === 0 && s === 0 && a === 0;
      }, i = 0, n = 0, s = 0, a = 0;
      e:
        for (; ; ) {
          switch (this.token.type) {
            case u.SemiColon:
              if (t())
                break e;
              break;
            case u.EOF:
              return n > 0 ? this.finish(e, d.RightCurlyExpected) : a > 0 ? this.finish(e, d.RightSquareBracketExpected) : s > 0 ? this.finish(e, d.RightParenthesisExpected) : this.finish(e);
            case u.CurlyL:
              i++, n++;
              break;
            case u.CurlyR:
              if (n--, i > 0 && n === 0) {
                if (this.consumeToken(), a > 0)
                  return this.finish(e, d.RightSquareBracketExpected);
                if (s > 0)
                  return this.finish(e, d.RightParenthesisExpected);
                break e;
              }
              if (n < 0) {
                if (s === 0 && a === 0)
                  break e;
                return this.finish(e, d.LeftCurlyExpected);
              }
              break;
            case u.ParenthesisL:
              s++;
              break;
            case u.ParenthesisR:
              if (s--, s < 0)
                return this.finish(e, d.LeftParenthesisExpected);
              break;
            case u.BracketL:
              a++;
              break;
            case u.BracketR:
              if (a--, a < 0)
                return this.finish(e, d.LeftSquareBracketExpected);
              break;
          }
          this.consumeToken();
        }
      return e;
    }, r.prototype._parseUnknownAtRuleName = function() {
      var e = this.create(R);
      return this.accept(u.AtKeyword) ? this.finish(e) : e;
    }, r.prototype._parseOperator = function() {
      if (this.peekDelim("/") || this.peekDelim("*") || this.peekDelim("+") || this.peekDelim("-") || this.peek(u.Dashmatch) || this.peek(u.Includes) || this.peek(u.SubstringOperator) || this.peek(u.PrefixOperator) || this.peek(u.SuffixOperator) || this.peekDelim("=")) {
        var e = this.createNode(f.Operator);
        return this.consumeToken(), this.finish(e);
      } else
        return null;
    }, r.prototype._parseUnaryOperator = function() {
      if (!this.peekDelim("+") && !this.peekDelim("-"))
        return null;
      var e = this.create(R);
      return this.consumeToken(), this.finish(e);
    }, r.prototype._parseCombinator = function() {
      if (this.peekDelim(">")) {
        var e = this.create(R);
        this.consumeToken();
        var t = this.mark();
        if (!this.hasWhitespace() && this.acceptDelim(">")) {
          if (!this.hasWhitespace() && this.acceptDelim(">"))
            return e.type = f.SelectorCombinatorShadowPiercingDescendant, this.finish(e);
          this.restoreAtMark(t);
        }
        return e.type = f.SelectorCombinatorParent, this.finish(e);
      } else if (this.peekDelim("+")) {
        var e = this.create(R);
        return this.consumeToken(), e.type = f.SelectorCombinatorSibling, this.finish(e);
      } else if (this.peekDelim("~")) {
        var e = this.create(R);
        return this.consumeToken(), e.type = f.SelectorCombinatorAllSiblings, this.finish(e);
      } else if (this.peekDelim("/")) {
        var e = this.create(R);
        this.consumeToken();
        var t = this.mark();
        if (!this.hasWhitespace() && this.acceptIdent("deep") && !this.hasWhitespace() && this.acceptDelim("/"))
          return e.type = f.SelectorCombinatorShadowPiercingDescendant, this.finish(e);
        this.restoreAtMark(t);
      }
      return null;
    }, r.prototype._parseSimpleSelector = function() {
      var e = this.create(Bi), t = 0;
      for (e.addChild(this._parseElementName()) && t++; (t === 0 || !this.hasWhitespace()) && e.addChild(this._parseSimpleSelectorBody()); )
        t++;
      return t > 0 ? this.finish(e) : null;
    }, r.prototype._parseSimpleSelectorBody = function() {
      return this._parsePseudo() || this._parseHash() || this._parseClass() || this._parseAttrib();
    }, r.prototype._parseSelectorIdent = function() {
      return this._parseIdent();
    }, r.prototype._parseHash = function() {
      if (!this.peek(u.Hash) && !this.peekDelim("#"))
        return null;
      var e = this.createNode(f.IdentifierSelector);
      if (this.acceptDelim("#")) {
        if (this.hasWhitespace() || !e.addChild(this._parseSelectorIdent()))
          return this.finish(e, d.IdentifierExpected);
      } else
        this.consumeToken();
      return this.finish(e);
    }, r.prototype._parseClass = function() {
      if (!this.peekDelim("."))
        return null;
      var e = this.createNode(f.ClassSelector);
      return this.consumeToken(), this.hasWhitespace() || !e.addChild(this._parseSelectorIdent()) ? this.finish(e, d.IdentifierExpected) : this.finish(e);
    }, r.prototype._parseElementName = function() {
      var e = this.mark(), t = this.createNode(f.ElementNameSelector);
      return t.addChild(this._parseNamespacePrefix()), !t.addChild(this._parseSelectorIdent()) && !this.acceptDelim("*") ? (this.restoreAtMark(e), null) : this.finish(t);
    }, r.prototype._parseNamespacePrefix = function() {
      var e = this.mark(), t = this.createNode(f.NamespacePrefix);
      return !t.addChild(this._parseIdent()) && this.acceptDelim("*"), this.acceptDelim("|") ? this.finish(t) : (this.restoreAtMark(e), null);
    }, r.prototype._parseAttrib = function() {
      if (!this.peek(u.BracketL))
        return null;
      var e = this.create(Zn);
      return this.consumeToken(), e.setNamespacePrefix(this._parseNamespacePrefix()), e.setIdentifier(this._parseIdent()) ? (e.setOperator(this._parseOperator()) && (e.setValue(this._parseBinaryExpr()), this.acceptIdent("i")), this.accept(u.BracketR) ? this.finish(e) : this.finish(e, d.RightSquareBracketExpected)) : this.finish(e, d.IdentifierExpected);
    }, r.prototype._parsePseudo = function() {
      var e = this, t = this._tryParsePseudoIdentifier();
      if (t) {
        if (!this.hasWhitespace() && this.accept(u.ParenthesisL)) {
          var i = function() {
            var n = e.create(R);
            if (!n.addChild(e._parseSelector(!1)))
              return null;
            for (; e.accept(u.Comma) && n.addChild(e._parseSelector(!1)); )
              ;
            return e.peek(u.ParenthesisR) ? e.finish(n) : null;
          };
          if (t.addChild(this.try(i) || this._parseBinaryExpr()), !this.accept(u.ParenthesisR))
            return this.finish(t, d.RightParenthesisExpected);
        }
        return this.finish(t);
      }
      return null;
    }, r.prototype._tryParsePseudoIdentifier = function() {
      if (!this.peek(u.Colon))
        return null;
      var e = this.mark(), t = this.createNode(f.PseudoSelector);
      return this.consumeToken(), this.hasWhitespace() ? (this.restoreAtMark(e), null) : (this.accept(u.Colon), this.hasWhitespace() || !t.addChild(this._parseIdent()) ? this.finish(t, d.IdentifierExpected) : this.finish(t));
    }, r.prototype._tryParsePrio = function() {
      var e = this.mark(), t = this._parsePrio();
      return t || (this.restoreAtMark(e), null);
    }, r.prototype._parsePrio = function() {
      if (!this.peek(u.Exclamation))
        return null;
      var e = this.createNode(f.Prio);
      return this.accept(u.Exclamation) && this.acceptIdent("important") ? this.finish(e) : null;
    }, r.prototype._parseExpr = function(e) {
      e === void 0 && (e = !1);
      var t = this.create(qi);
      if (!t.addChild(this._parseBinaryExpr()))
        return null;
      for (; ; ) {
        if (this.peek(u.Comma)) {
          if (e)
            return this.finish(t);
          this.consumeToken();
        }
        if (!t.addChild(this._parseBinaryExpr()))
          break;
      }
      return this.finish(t);
    }, r.prototype._parseNamedLine = function() {
      if (!this.peek(u.BracketL))
        return null;
      var e = this.createNode(f.GridLine);
      for (this.consumeToken(); e.addChild(this._parseIdent()); )
        ;
      return this.accept(u.BracketR) ? this.finish(e) : this.finish(e, d.RightSquareBracketExpected);
    }, r.prototype._parseBinaryExpr = function(e, t) {
      var i = this.create(Jn);
      if (!i.setLeft(e || this._parseTerm()))
        return null;
      if (!i.setOperator(t || this._parseOperator()))
        return this.finish(i);
      if (!i.setRight(this._parseTerm()))
        return this.finish(i, d.TermExpected);
      i = this.finish(i);
      var n = this._parseOperator();
      return n && (i = this._parseBinaryExpr(i, n)), this.finish(i);
    }, r.prototype._parseTerm = function() {
      var e = this.create(Xn);
      return e.setOperator(this._parseUnaryOperator()), e.setExpression(this._parseTermExpression()) ? this.finish(e) : null;
    }, r.prototype._parseTermExpression = function() {
      return this._parseURILiteral() || // url before function
      this._parseFunction() || // function before ident
      this._parseIdent() || this._parseStringLiteral() || this._parseNumeric() || this._parseHexColor() || this._parseOperation() || this._parseNamedLine();
    }, r.prototype._parseOperation = function() {
      if (!this.peek(u.ParenthesisL))
        return null;
      var e = this.create(R);
      return this.consumeToken(), e.addChild(this._parseExpr()), this.accept(u.ParenthesisR) ? this.finish(e) : this.finish(e, d.RightParenthesisExpected);
    }, r.prototype._parseNumeric = function() {
      if (this.peek(u.Num) || this.peek(u.Percentage) || this.peek(u.Resolution) || this.peek(u.Length) || this.peek(u.EMS) || this.peek(u.EXS) || this.peek(u.Angle) || this.peek(u.Time) || this.peek(u.Dimension) || this.peek(u.Freq)) {
        var e = this.create(or);
        return this.consumeToken(), this.finish(e);
      }
      return null;
    }, r.prototype._parseStringLiteral = function() {
      if (!this.peek(u.String) && !this.peek(u.BadString))
        return null;
      var e = this.createNode(f.StringLiteral);
      return this.consumeToken(), this.finish(e);
    }, r.prototype._parseURILiteral = function() {
      if (!this.peekRegExp(u.Ident, /^url(-prefix)?$/i))
        return null;
      var e = this.mark(), t = this.createNode(f.URILiteral);
      return this.accept(u.Ident), this.hasWhitespace() || !this.peek(u.ParenthesisL) ? (this.restoreAtMark(e), null) : (this.scanner.inURL = !0, this.consumeToken(), t.addChild(this._parseURLArgument()), this.scanner.inURL = !1, this.accept(u.ParenthesisR) ? this.finish(t) : this.finish(t, d.RightParenthesisExpected));
    }, r.prototype._parseURLArgument = function() {
      var e = this.create(R);
      return !this.accept(u.String) && !this.accept(u.BadString) && !this.acceptUnquotedString() ? null : this.finish(e);
    }, r.prototype._parseIdent = function(e) {
      if (!this.peek(u.Ident))
        return null;
      var t = this.create(se);
      return e && (t.referenceTypes = e), t.isCustomProperty = this.peekRegExp(u.Ident, /^--/), this.consumeToken(), this.finish(t);
    }, r.prototype._parseFunction = function() {
      var e = this.mark(), t = this.create(Je);
      if (!t.setIdentifier(this._parseFunctionIdentifier()))
        return null;
      if (this.hasWhitespace() || !this.accept(u.ParenthesisL))
        return this.restoreAtMark(e), null;
      if (t.getArguments().addChild(this._parseFunctionArgument()))
        for (; this.accept(u.Comma) && !this.peek(u.ParenthesisR); )
          t.getArguments().addChild(this._parseFunctionArgument()) || this.markError(t, d.ExpressionExpected);
      return this.accept(u.ParenthesisR) ? this.finish(t) : this.finish(t, d.RightParenthesisExpected);
    }, r.prototype._parseFunctionIdentifier = function() {
      if (!this.peek(u.Ident))
        return null;
      var e = this.create(se);
      if (e.referenceTypes = [D.Function], this.acceptIdent("progid")) {
        if (this.accept(u.Colon))
          for (; this.accept(u.Ident) && this.acceptDelim("."); )
            ;
        return this.finish(e);
      }
      return this.consumeToken(), this.finish(e);
    }, r.prototype._parseFunctionArgument = function() {
      var e = this.create(De);
      return e.setValue(this._parseExpr(!0)) ? this.finish(e) : null;
    }, r.prototype._parseHexColor = function() {
      if (this.peekRegExp(u.Hash, /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{4}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/g)) {
        var e = this.create(ar);
        return this.consumeToken(), this.finish(e);
      } else
        return null;
    }, r;
  }()
);
function Es(r, e) {
  var t = 0, i = r.length;
  if (i === 0)
    return 0;
  for (; t < i; ) {
    var n = Math.floor((t + i) / 2);
    e(r[n]) ? i = n : t = n + 1;
  }
  return t;
}
var Rs = globalThis && globalThis.__extends || function() {
  var r = function(e, t) {
    return r = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(i, n) {
      i.__proto__ = n;
    } || function(i, n) {
      for (var s in n)
        Object.prototype.hasOwnProperty.call(n, s) && (i[s] = n[s]);
    }, r(e, t);
  };
  return function(e, t) {
    if (typeof t != "function" && t !== null)
      throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
    r(e, t);
    function i() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (i.prototype = t.prototype, new i());
  };
}(), Qi = (
  /** @class */
  function() {
    function r(e, t) {
      this.offset = e, this.length = t, this.symbols = [], this.parent = null, this.children = [];
    }
    return r.prototype.addChild = function(e) {
      this.children.push(e), e.setParent(this);
    }, r.prototype.setParent = function(e) {
      this.parent = e;
    }, r.prototype.findScope = function(e, t) {
      return t === void 0 && (t = 0), this.offset <= e && this.offset + this.length > e + t || this.offset === e && this.length === t ? this.findInScope(e, t) : null;
    }, r.prototype.findInScope = function(e, t) {
      t === void 0 && (t = 0);
      var i = e + t, n = Es(this.children, function(a) {
        return a.offset > i;
      });
      if (n === 0)
        return this;
      var s = this.children[n - 1];
      return s.offset <= e && s.offset + s.length >= e + t ? s.findInScope(e, t) : this;
    }, r.prototype.addSymbol = function(e) {
      this.symbols.push(e);
    }, r.prototype.getSymbol = function(e, t) {
      for (var i = 0; i < this.symbols.length; i++) {
        var n = this.symbols[i];
        if (n.name === e && n.type === t)
          return n;
      }
      return null;
    }, r.prototype.getSymbols = function() {
      return this.symbols;
    }, r;
  }()
), As = (
  /** @class */
  function(r) {
    Rs(e, r);
    function e() {
      return r.call(this, 0, Number.MAX_VALUE) || this;
    }
    return e;
  }(Qi)
), it = (
  /** @class */
  function() {
    function r(e, t, i, n) {
      this.name = e, this.value = t, this.node = i, this.type = n;
    }
    return r;
  }()
), Is = (
  /** @class */
  function() {
    function r(e) {
      this.scope = e;
    }
    return r.prototype.addSymbol = function(e, t, i, n) {
      if (e.offset !== -1) {
        var s = this.scope.findScope(e.offset, e.length);
        s && s.addSymbol(new it(t, i, e, n));
      }
    }, r.prototype.addScope = function(e) {
      if (e.offset !== -1) {
        var t = this.scope.findScope(e.offset, e.length);
        if (t && (t.offset !== e.offset || t.length !== e.length)) {
          var i = new Qi(e.offset, e.length);
          return t.addChild(i), i;
        }
        return t;
      }
      return null;
    }, r.prototype.addSymbolToChildScope = function(e, t, i, n, s) {
      if (e && e.offset !== -1) {
        var a = this.addScope(e);
        a && a.addSymbol(new it(i, n, t, s));
      }
    }, r.prototype.visitNode = function(e) {
      switch (e.type) {
        case f.Keyframe:
          return this.addSymbol(e, e.getName(), void 0, D.Keyframe), !0;
        case f.CustomPropertyDeclaration:
          return this.visitCustomPropertyDeclarationNode(e);
        case f.VariableDeclaration:
          return this.visitVariableDeclarationNode(e);
        case f.Ruleset:
          return this.visitRuleSet(e);
        case f.MixinDeclaration:
          return this.addSymbol(e, e.getName(), void 0, D.Mixin), !0;
        case f.FunctionDeclaration:
          return this.addSymbol(e, e.getName(), void 0, D.Function), !0;
        case f.FunctionParameter:
          return this.visitFunctionParameterNode(e);
        case f.Declarations:
          return this.addScope(e), !0;
        case f.For:
          var t = e, i = t.getDeclarations();
          return i && t.variable && this.addSymbolToChildScope(i, t.variable, t.variable.getName(), void 0, D.Variable), !0;
        case f.Each: {
          var n = e, s = n.getDeclarations();
          if (s)
            for (var a = n.getVariables().getChildren(), o = 0, l = a; o < l.length; o++) {
              var c = l[o];
              this.addSymbolToChildScope(s, c, c.getName(), void 0, D.Variable);
            }
          return !0;
        }
      }
      return !0;
    }, r.prototype.visitRuleSet = function(e) {
      var t = this.scope.findScope(e.offset, e.length);
      if (t)
        for (var i = 0, n = e.getSelectors().getChildren(); i < n.length; i++) {
          var s = n[i];
          s instanceof bt && s.getChildren().length === 1 && t.addSymbol(new it(s.getChild(0).getText(), void 0, s, D.Rule));
        }
      return !0;
    }, r.prototype.visitVariableDeclarationNode = function(e) {
      var t = e.getValue() ? e.getValue().getText() : void 0;
      return this.addSymbol(e, e.getName(), t, D.Variable), !0;
    }, r.prototype.visitFunctionParameterNode = function(e) {
      var t = e.getParent().getDeclarations();
      if (t) {
        var i = e.getDefaultValue(), n = i ? i.getText() : void 0;
        this.addSymbolToChildScope(t, e, e.getName(), n, D.Variable);
      }
      return !0;
    }, r.prototype.visitCustomPropertyDeclarationNode = function(e) {
      var t = e.getValue() ? e.getValue().getText() : "";
      return this.addCSSVariable(e.getProperty(), e.getProperty().getName(), t, D.Variable), !0;
    }, r.prototype.addCSSVariable = function(e, t, i, n) {
      e.offset !== -1 && this.scope.addSymbol(new it(t, i, e, n));
    }, r;
  }()
), Kt = (
  /** @class */
  function() {
    function r(e) {
      this.global = new As(), e.acceptVisitor(new Is(this.global));
    }
    return r.prototype.findSymbolsAtOffset = function(e, t) {
      for (var i = this.global.findScope(e, 0), n = [], s = {}; i; ) {
        for (var a = i.getSymbols(), o = 0; o < a.length; o++) {
          var l = a[o];
          l.type === t && !s[l.name] && (n.push(l), s[l.name] = !0);
        }
        i = i.parent;
      }
      return n;
    }, r.prototype.internalFindSymbol = function(e, t) {
      var i = e;
      if (e.parent instanceof Ct && e.parent.getParent() instanceof U && (i = e.parent.getParent().getDeclarations()), e.parent instanceof De && e.parent.getParent() instanceof Je) {
        var n = e.parent.getParent().getIdentifier();
        if (n) {
          var s = this.internalFindSymbol(n, [D.Function]);
          s && (i = s.node.getDeclarations());
        }
      }
      if (!i)
        return null;
      for (var a = e.getText(), o = this.global.findScope(i.offset, i.length); o; ) {
        for (var l = 0; l < t.length; l++) {
          var c = t[l], h = o.getSymbol(a, c);
          if (h)
            return h;
        }
        o = o.parent;
      }
      return null;
    }, r.prototype.evaluateReferenceTypes = function(e) {
      if (e instanceof se) {
        var t = e.referenceTypes;
        if (t)
          return t;
        if (e.isCustomProperty)
          return [D.Variable];
        var i = Dn(e);
        if (i) {
          var n = i.getNonPrefixedPropertyName();
          if ((n === "animation" || n === "animation-name") && i.getValue() && i.getValue().offset === e.offset)
            return [D.Keyframe];
        }
      } else if (e instanceof ur)
        return [D.Variable];
      var s = e.findAParent(f.Selector, f.ExtendsReference);
      return s ? [D.Rule] : null;
    }, r.prototype.findSymbolFromNode = function(e) {
      if (!e)
        return null;
      for (; e.type === f.Interpolation; )
        e = e.getParent();
      var t = this.evaluateReferenceTypes(e);
      return t ? this.internalFindSymbol(e, t) : null;
    }, r.prototype.matchesSymbol = function(e, t) {
      if (!e)
        return !1;
      for (; e.type === f.Interpolation; )
        e = e.getParent();
      if (!e.matches(t.name))
        return !1;
      var i = this.evaluateReferenceTypes(e);
      if (!i || i.indexOf(t.type) === -1)
        return !1;
      var n = this.internalFindSymbol(e, i);
      return n === t;
    }, r.prototype.findSymbol = function(e, t, i) {
      for (var n = this.global.findScope(i); n; ) {
        var s = n.getSymbol(e, t);
        if (s)
          return s;
        n = n.parent;
      }
      return null;
    }, r;
  }()
), Wr;
(function(r) {
  r.MIN_VALUE = -2147483648, r.MAX_VALUE = 2147483647;
})(Wr || (Wr = {}));
var pt;
(function(r) {
  r.MIN_VALUE = 0, r.MAX_VALUE = 2147483647;
})(pt || (pt = {}));
var re;
(function(r) {
  function e(i, n) {
    return i === Number.MAX_VALUE && (i = pt.MAX_VALUE), n === Number.MAX_VALUE && (n = pt.MAX_VALUE), { line: i, character: n };
  }
  r.create = e;
  function t(i) {
    var n = i;
    return m.objectLiteral(n) && m.uinteger(n.line) && m.uinteger(n.character);
  }
  r.is = t;
})(re || (re = {}));
var W;
(function(r) {
  function e(i, n, s, a) {
    if (m.uinteger(i) && m.uinteger(n) && m.uinteger(s) && m.uinteger(a))
      return { start: re.create(i, n), end: re.create(s, a) };
    if (re.is(i) && re.is(n))
      return { start: i, end: n };
    throw new Error("Range#create called with invalid arguments[" + i + ", " + n + ", " + s + ", " + a + "]");
  }
  r.create = e;
  function t(i) {
    var n = i;
    return m.objectLiteral(n) && re.is(n.start) && re.is(n.end);
  }
  r.is = t;
})(W || (W = {}));
var ze;
(function(r) {
  function e(i, n) {
    return { uri: i, range: n };
  }
  r.create = e;
  function t(i) {
    var n = i;
    return m.defined(n) && W.is(n.range) && (m.string(n.uri) || m.undefined(n.uri));
  }
  r.is = t;
})(ze || (ze = {}));
var Ur;
(function(r) {
  function e(i, n, s, a) {
    return { targetUri: i, targetRange: n, targetSelectionRange: s, originSelectionRange: a };
  }
  r.create = e;
  function t(i) {
    var n = i;
    return m.defined(n) && W.is(n.targetRange) && m.string(n.targetUri) && (W.is(n.targetSelectionRange) || m.undefined(n.targetSelectionRange)) && (W.is(n.originSelectionRange) || m.undefined(n.originSelectionRange));
  }
  r.is = t;
})(Ur || (Ur = {}));
var zt;
(function(r) {
  function e(i, n, s, a) {
    return {
      red: i,
      green: n,
      blue: s,
      alpha: a
    };
  }
  r.create = e;
  function t(i) {
    var n = i;
    return m.numberRange(n.red, 0, 1) && m.numberRange(n.green, 0, 1) && m.numberRange(n.blue, 0, 1) && m.numberRange(n.alpha, 0, 1);
  }
  r.is = t;
})(zt || (zt = {}));
var Tr;
(function(r) {
  function e(i, n) {
    return {
      range: i,
      color: n
    };
  }
  r.create = e;
  function t(i) {
    var n = i;
    return W.is(n.range) && zt.is(n.color);
  }
  r.is = t;
})(Tr || (Tr = {}));
var Kr;
(function(r) {
  function e(i, n, s) {
    return {
      label: i,
      textEdit: n,
      additionalTextEdits: s
    };
  }
  r.create = e;
  function t(i) {
    var n = i;
    return m.string(n.label) && (m.undefined(n.textEdit) || I.is(n)) && (m.undefined(n.additionalTextEdits) || m.typedArray(n.additionalTextEdits, I.is));
  }
  r.is = t;
})(Kr || (Kr = {}));
var Ue;
(function(r) {
  r.Comment = "comment", r.Imports = "imports", r.Region = "region";
})(Ue || (Ue = {}));
var zr;
(function(r) {
  function e(i, n, s, a, o) {
    var l = {
      startLine: i,
      endLine: n
    };
    return m.defined(s) && (l.startCharacter = s), m.defined(a) && (l.endCharacter = a), m.defined(o) && (l.kind = o), l;
  }
  r.create = e;
  function t(i) {
    var n = i;
    return m.uinteger(n.startLine) && m.uinteger(n.startLine) && (m.undefined(n.startCharacter) || m.uinteger(n.startCharacter)) && (m.undefined(n.endCharacter) || m.uinteger(n.endCharacter)) && (m.undefined(n.kind) || m.string(n.kind));
  }
  r.is = t;
})(zr || (zr = {}));
var qt;
(function(r) {
  function e(i, n) {
    return {
      location: i,
      message: n
    };
  }
  r.create = e;
  function t(i) {
    var n = i;
    return m.defined(n) && ze.is(n.location) && m.string(n.message);
  }
  r.is = t;
})(qt || (qt = {}));
var Re;
(function(r) {
  r.Error = 1, r.Warning = 2, r.Information = 3, r.Hint = 4;
})(Re || (Re = {}));
var qr;
(function(r) {
  r.Unnecessary = 1, r.Deprecated = 2;
})(qr || (qr = {}));
var Nr;
(function(r) {
  function e(t) {
    var i = t;
    return i != null && m.string(i.href);
  }
  r.is = e;
})(Nr || (Nr = {}));
var dt;
(function(r) {
  function e(i, n, s, a, o, l) {
    var c = { range: i, message: n };
    return m.defined(s) && (c.severity = s), m.defined(a) && (c.code = a), m.defined(o) && (c.source = o), m.defined(l) && (c.relatedInformation = l), c;
  }
  r.create = e;
  function t(i) {
    var n, s = i;
    return m.defined(s) && W.is(s.range) && m.string(s.message) && (m.number(s.severity) || m.undefined(s.severity)) && (m.integer(s.code) || m.string(s.code) || m.undefined(s.code)) && (m.undefined(s.codeDescription) || m.string((n = s.codeDescription) === null || n === void 0 ? void 0 : n.href)) && (m.string(s.source) || m.undefined(s.source)) && (m.undefined(s.relatedInformation) || m.typedArray(s.relatedInformation, qt.is));
  }
  r.is = t;
})(dt || (dt = {}));
var qe;
(function(r) {
  function e(i, n) {
    for (var s = [], a = 2; a < arguments.length; a++)
      s[a - 2] = arguments[a];
    var o = { title: i, command: n };
    return m.defined(s) && s.length > 0 && (o.arguments = s), o;
  }
  r.create = e;
  function t(i) {
    var n = i;
    return m.defined(n) && m.string(n.title) && m.string(n.command);
  }
  r.is = t;
})(qe || (qe = {}));
var I;
(function(r) {
  function e(s, a) {
    return { range: s, newText: a };
  }
  r.replace = e;
  function t(s, a) {
    return { range: { start: s, end: s }, newText: a };
  }
  r.insert = t;
  function i(s) {
    return { range: s, newText: "" };
  }
  r.del = i;
  function n(s) {
    var a = s;
    return m.objectLiteral(a) && m.string(a.newText) && W.is(a.range);
  }
  r.is = n;
})(I || (I = {}));
var Ae;
(function(r) {
  function e(i, n, s) {
    var a = { label: i };
    return n !== void 0 && (a.needsConfirmation = n), s !== void 0 && (a.description = s), a;
  }
  r.create = e;
  function t(i) {
    var n = i;
    return n !== void 0 && m.objectLiteral(n) && m.string(n.label) && (m.boolean(n.needsConfirmation) || n.needsConfirmation === void 0) && (m.string(n.description) || n.description === void 0);
  }
  r.is = t;
})(Ae || (Ae = {}));
var Y;
(function(r) {
  function e(t) {
    var i = t;
    return typeof i == "string";
  }
  r.is = e;
})(Y || (Y = {}));
var me;
(function(r) {
  function e(s, a, o) {
    return { range: s, newText: a, annotationId: o };
  }
  r.replace = e;
  function t(s, a, o) {
    return { range: { start: s, end: s }, newText: a, annotationId: o };
  }
  r.insert = t;
  function i(s, a) {
    return { range: s, newText: "", annotationId: a };
  }
  r.del = i;
  function n(s) {
    var a = s;
    return I.is(a) && (Ae.is(a.annotationId) || Y.is(a.annotationId));
  }
  r.is = n;
})(me || (me = {}));
var mt;
(function(r) {
  function e(i, n) {
    return { textDocument: i, edits: n };
  }
  r.create = e;
  function t(i) {
    var n = i;
    return m.defined(n) && gt.is(n.textDocument) && Array.isArray(n.edits);
  }
  r.is = t;
})(mt || (mt = {}));
var Ne;
(function(r) {
  function e(i, n, s) {
    var a = {
      kind: "create",
      uri: i
    };
    return n !== void 0 && (n.overwrite !== void 0 || n.ignoreIfExists !== void 0) && (a.options = n), s !== void 0 && (a.annotationId = s), a;
  }
  r.create = e;
  function t(i) {
    var n = i;
    return n && n.kind === "create" && m.string(n.uri) && (n.options === void 0 || (n.options.overwrite === void 0 || m.boolean(n.options.overwrite)) && (n.options.ignoreIfExists === void 0 || m.boolean(n.options.ignoreIfExists))) && (n.annotationId === void 0 || Y.is(n.annotationId));
  }
  r.is = t;
})(Ne || (Ne = {}));
var He;
(function(r) {
  function e(i, n, s, a) {
    var o = {
      kind: "rename",
      oldUri: i,
      newUri: n
    };
    return s !== void 0 && (s.overwrite !== void 0 || s.ignoreIfExists !== void 0) && (o.options = s), a !== void 0 && (o.annotationId = a), o;
  }
  r.create = e;
  function t(i) {
    var n = i;
    return n && n.kind === "rename" && m.string(n.oldUri) && m.string(n.newUri) && (n.options === void 0 || (n.options.overwrite === void 0 || m.boolean(n.options.overwrite)) && (n.options.ignoreIfExists === void 0 || m.boolean(n.options.ignoreIfExists))) && (n.annotationId === void 0 || Y.is(n.annotationId));
  }
  r.is = t;
})(He || (He = {}));
var Ge;
(function(r) {
  function e(i, n, s) {
    var a = {
      kind: "delete",
      uri: i
    };
    return n !== void 0 && (n.recursive !== void 0 || n.ignoreIfNotExists !== void 0) && (a.options = n), s !== void 0 && (a.annotationId = s), a;
  }
  r.create = e;
  function t(i) {
    var n = i;
    return n && n.kind === "delete" && m.string(n.uri) && (n.options === void 0 || (n.options.recursive === void 0 || m.boolean(n.options.recursive)) && (n.options.ignoreIfNotExists === void 0 || m.boolean(n.options.ignoreIfNotExists))) && (n.annotationId === void 0 || Y.is(n.annotationId));
  }
  r.is = t;
})(Ge || (Ge = {}));
var Nt;
(function(r) {
  function e(t) {
    var i = t;
    return i && (i.changes !== void 0 || i.documentChanges !== void 0) && (i.documentChanges === void 0 || i.documentChanges.every(function(n) {
      return m.string(n.kind) ? Ne.is(n) || He.is(n) || Ge.is(n) : mt.is(n);
    }));
  }
  r.is = e;
})(Nt || (Nt = {}));
var nt = (
  /** @class */
  function() {
    function r(e, t) {
      this.edits = e, this.changeAnnotations = t;
    }
    return r.prototype.insert = function(e, t, i) {
      var n, s;
      if (i === void 0 ? n = I.insert(e, t) : Y.is(i) ? (s = i, n = me.insert(e, t, i)) : (this.assertChangeAnnotations(this.changeAnnotations), s = this.changeAnnotations.manage(i), n = me.insert(e, t, s)), this.edits.push(n), s !== void 0)
        return s;
    }, r.prototype.replace = function(e, t, i) {
      var n, s;
      if (i === void 0 ? n = I.replace(e, t) : Y.is(i) ? (s = i, n = me.replace(e, t, i)) : (this.assertChangeAnnotations(this.changeAnnotations), s = this.changeAnnotations.manage(i), n = me.replace(e, t, s)), this.edits.push(n), s !== void 0)
        return s;
    }, r.prototype.delete = function(e, t) {
      var i, n;
      if (t === void 0 ? i = I.del(e) : Y.is(t) ? (n = t, i = me.del(e, t)) : (this.assertChangeAnnotations(this.changeAnnotations), n = this.changeAnnotations.manage(t), i = me.del(e, n)), this.edits.push(i), n !== void 0)
        return n;
    }, r.prototype.add = function(e) {
      this.edits.push(e);
    }, r.prototype.all = function() {
      return this.edits;
    }, r.prototype.clear = function() {
      this.edits.splice(0, this.edits.length);
    }, r.prototype.assertChangeAnnotations = function(e) {
      if (e === void 0)
        throw new Error("Text edit change is not configured to manage change annotations.");
    }, r;
  }()
), Hr = (
  /** @class */
  function() {
    function r(e) {
      this._annotations = e === void 0 ? /* @__PURE__ */ Object.create(null) : e, this._counter = 0, this._size = 0;
    }
    return r.prototype.all = function() {
      return this._annotations;
    }, Object.defineProperty(r.prototype, "size", {
      get: function() {
        return this._size;
      },
      enumerable: !1,
      configurable: !0
    }), r.prototype.manage = function(e, t) {
      var i;
      if (Y.is(e) ? i = e : (i = this.nextId(), t = e), this._annotations[i] !== void 0)
        throw new Error("Id " + i + " is already in use.");
      if (t === void 0)
        throw new Error("No annotation provided for id " + i);
      return this._annotations[i] = t, this._size++, i;
    }, r.prototype.nextId = function() {
      return this._counter++, this._counter.toString();
    }, r;
  }()
);
(function() {
  function r(e) {
    var t = this;
    this._textEditChanges = /* @__PURE__ */ Object.create(null), e !== void 0 ? (this._workspaceEdit = e, e.documentChanges ? (this._changeAnnotations = new Hr(e.changeAnnotations), e.changeAnnotations = this._changeAnnotations.all(), e.documentChanges.forEach(function(i) {
      if (mt.is(i)) {
        var n = new nt(i.edits, t._changeAnnotations);
        t._textEditChanges[i.textDocument.uri] = n;
      }
    })) : e.changes && Object.keys(e.changes).forEach(function(i) {
      var n = new nt(e.changes[i]);
      t._textEditChanges[i] = n;
    })) : this._workspaceEdit = {};
  }
  return Object.defineProperty(r.prototype, "edit", {
    /**
     * Returns the underlying [WorkspaceEdit](#WorkspaceEdit) literal
     * use to be returned from a workspace edit operation like rename.
     */
    get: function() {
      return this.initDocumentChanges(), this._changeAnnotations !== void 0 && (this._changeAnnotations.size === 0 ? this._workspaceEdit.changeAnnotations = void 0 : this._workspaceEdit.changeAnnotations = this._changeAnnotations.all()), this._workspaceEdit;
    },
    enumerable: !1,
    configurable: !0
  }), r.prototype.getTextEditChange = function(e) {
    if (gt.is(e)) {
      if (this.initDocumentChanges(), this._workspaceEdit.documentChanges === void 0)
        throw new Error("Workspace edit is not configured for document changes.");
      var t = { uri: e.uri, version: e.version }, i = this._textEditChanges[t.uri];
      if (!i) {
        var n = [], s = {
          textDocument: t,
          edits: n
        };
        this._workspaceEdit.documentChanges.push(s), i = new nt(n, this._changeAnnotations), this._textEditChanges[t.uri] = i;
      }
      return i;
    } else {
      if (this.initChanges(), this._workspaceEdit.changes === void 0)
        throw new Error("Workspace edit is not configured for normal text edit changes.");
      var i = this._textEditChanges[e];
      if (!i) {
        var n = [];
        this._workspaceEdit.changes[e] = n, i = new nt(n), this._textEditChanges[e] = i;
      }
      return i;
    }
  }, r.prototype.initDocumentChanges = function() {
    this._workspaceEdit.documentChanges === void 0 && this._workspaceEdit.changes === void 0 && (this._changeAnnotations = new Hr(), this._workspaceEdit.documentChanges = [], this._workspaceEdit.changeAnnotations = this._changeAnnotations.all());
  }, r.prototype.initChanges = function() {
    this._workspaceEdit.documentChanges === void 0 && this._workspaceEdit.changes === void 0 && (this._workspaceEdit.changes = /* @__PURE__ */ Object.create(null));
  }, r.prototype.createFile = function(e, t, i) {
    if (this.initDocumentChanges(), this._workspaceEdit.documentChanges === void 0)
      throw new Error("Workspace edit is not configured for document changes.");
    var n;
    Ae.is(t) || Y.is(t) ? n = t : i = t;
    var s, a;
    if (n === void 0 ? s = Ne.create(e, i) : (a = Y.is(n) ? n : this._changeAnnotations.manage(n), s = Ne.create(e, i, a)), this._workspaceEdit.documentChanges.push(s), a !== void 0)
      return a;
  }, r.prototype.renameFile = function(e, t, i, n) {
    if (this.initDocumentChanges(), this._workspaceEdit.documentChanges === void 0)
      throw new Error("Workspace edit is not configured for document changes.");
    var s;
    Ae.is(i) || Y.is(i) ? s = i : n = i;
    var a, o;
    if (s === void 0 ? a = He.create(e, t, n) : (o = Y.is(s) ? s : this._changeAnnotations.manage(s), a = He.create(e, t, n, o)), this._workspaceEdit.documentChanges.push(a), o !== void 0)
      return o;
  }, r.prototype.deleteFile = function(e, t, i) {
    if (this.initDocumentChanges(), this._workspaceEdit.documentChanges === void 0)
      throw new Error("Workspace edit is not configured for document changes.");
    var n;
    Ae.is(t) || Y.is(t) ? n = t : i = t;
    var s, a;
    if (n === void 0 ? s = Ge.create(e, i) : (a = Y.is(n) ? n : this._changeAnnotations.manage(n), s = Ge.create(e, i, a)), this._workspaceEdit.documentChanges.push(s), a !== void 0)
      return a;
  }, r;
})();
var Gr;
(function(r) {
  function e(i) {
    return { uri: i };
  }
  r.create = e;
  function t(i) {
    var n = i;
    return m.defined(n) && m.string(n.uri);
  }
  r.is = t;
})(Gr || (Gr = {}));
var Qr;
(function(r) {
  function e(i, n) {
    return { uri: i, version: n };
  }
  r.create = e;
  function t(i) {
    var n = i;
    return m.defined(n) && m.string(n.uri) && m.integer(n.version);
  }
  r.is = t;
})(Qr || (Qr = {}));
var gt;
(function(r) {
  function e(i, n) {
    return { uri: i, version: n };
  }
  r.create = e;
  function t(i) {
    var n = i;
    return m.defined(n) && m.string(n.uri) && (n.version === null || m.integer(n.version));
  }
  r.is = t;
})(gt || (gt = {}));
var Jr;
(function(r) {
  function e(i, n, s, a) {
    return { uri: i, languageId: n, version: s, text: a };
  }
  r.create = e;
  function t(i) {
    var n = i;
    return m.defined(n) && m.string(n.uri) && m.string(n.languageId) && m.integer(n.version) && m.string(n.text);
  }
  r.is = t;
})(Jr || (Jr = {}));
var ue;
(function(r) {
  r.PlainText = "plaintext", r.Markdown = "markdown";
})(ue || (ue = {}));
(function(r) {
  function e(t) {
    var i = t;
    return i === r.PlainText || i === r.Markdown;
  }
  r.is = e;
})(ue || (ue = {}));
var Ht;
(function(r) {
  function e(t) {
    var i = t;
    return m.objectLiteral(t) && ue.is(i.kind) && m.string(i.value);
  }
  r.is = e;
})(Ht || (Ht = {}));
var P;
(function(r) {
  r.Text = 1, r.Method = 2, r.Function = 3, r.Constructor = 4, r.Field = 5, r.Variable = 6, r.Class = 7, r.Interface = 8, r.Module = 9, r.Property = 10, r.Unit = 11, r.Value = 12, r.Enum = 13, r.Keyword = 14, r.Snippet = 15, r.Color = 16, r.File = 17, r.Reference = 18, r.Folder = 19, r.EnumMember = 20, r.Constant = 21, r.Struct = 22, r.Event = 23, r.Operator = 24, r.TypeParameter = 25;
})(P || (P = {}));
var te;
(function(r) {
  r.PlainText = 1, r.Snippet = 2;
})(te || (te = {}));
var Ce;
(function(r) {
  r.Deprecated = 1;
})(Ce || (Ce = {}));
var Xr;
(function(r) {
  function e(i, n, s) {
    return { newText: i, insert: n, replace: s };
  }
  r.create = e;
  function t(i) {
    var n = i;
    return n && m.string(n.newText) && W.is(n.insert) && W.is(n.replace);
  }
  r.is = t;
})(Xr || (Xr = {}));
var Zr;
(function(r) {
  r.asIs = 1, r.adjustIndentation = 2;
})(Zr || (Zr = {}));
var Yr;
(function(r) {
  function e(t) {
    return { label: t };
  }
  r.create = e;
})(Yr || (Yr = {}));
var ei;
(function(r) {
  function e(t, i) {
    return { items: t || [], isIncomplete: !!i };
  }
  r.create = e;
})(ei || (ei = {}));
var vt;
(function(r) {
  function e(i) {
    return i.replace(/[\\`*_{}[\]()#+\-.!]/g, "\\$&");
  }
  r.fromPlainText = e;
  function t(i) {
    var n = i;
    return m.string(n) || m.objectLiteral(n) && m.string(n.language) && m.string(n.value);
  }
  r.is = t;
})(vt || (vt = {}));
var ti;
(function(r) {
  function e(t) {
    var i = t;
    return !!i && m.objectLiteral(i) && (Ht.is(i.contents) || vt.is(i.contents) || m.typedArray(i.contents, vt.is)) && (t.range === void 0 || W.is(t.range));
  }
  r.is = e;
})(ti || (ti = {}));
var ri;
(function(r) {
  function e(t, i) {
    return i ? { label: t, documentation: i } : { label: t };
  }
  r.create = e;
})(ri || (ri = {}));
var ii;
(function(r) {
  function e(t, i) {
    for (var n = [], s = 2; s < arguments.length; s++)
      n[s - 2] = arguments[s];
    var a = { label: t };
    return m.defined(i) && (a.documentation = i), m.defined(n) ? a.parameters = n : a.parameters = [], a;
  }
  r.create = e;
})(ii || (ii = {}));
var fe;
(function(r) {
  r.Text = 1, r.Read = 2, r.Write = 3;
})(fe || (fe = {}));
var ni;
(function(r) {
  function e(t, i) {
    var n = { range: t };
    return m.number(i) && (n.kind = i), n;
  }
  r.create = e;
})(ni || (ni = {}));
var j;
(function(r) {
  r.File = 1, r.Module = 2, r.Namespace = 3, r.Package = 4, r.Class = 5, r.Method = 6, r.Property = 7, r.Field = 8, r.Constructor = 9, r.Enum = 10, r.Interface = 11, r.Function = 12, r.Variable = 13, r.Constant = 14, r.String = 15, r.Number = 16, r.Boolean = 17, r.Array = 18, r.Object = 19, r.Key = 20, r.Null = 21, r.EnumMember = 22, r.Struct = 23, r.Event = 24, r.Operator = 25, r.TypeParameter = 26;
})(j || (j = {}));
var si;
(function(r) {
  r.Deprecated = 1;
})(si || (si = {}));
var ai;
(function(r) {
  function e(t, i, n, s, a) {
    var o = {
      name: t,
      kind: i,
      location: { uri: s, range: n }
    };
    return a && (o.containerName = a), o;
  }
  r.create = e;
})(ai || (ai = {}));
var oi;
(function(r) {
  function e(i, n, s, a, o, l) {
    var c = {
      name: i,
      detail: n,
      kind: s,
      range: a,
      selectionRange: o
    };
    return l !== void 0 && (c.children = l), c;
  }
  r.create = e;
  function t(i) {
    var n = i;
    return n && m.string(n.name) && m.number(n.kind) && W.is(n.range) && W.is(n.selectionRange) && (n.detail === void 0 || m.string(n.detail)) && (n.deprecated === void 0 || m.boolean(n.deprecated)) && (n.children === void 0 || Array.isArray(n.children)) && (n.tags === void 0 || Array.isArray(n.tags));
  }
  r.is = t;
})(oi || (oi = {}));
var ui;
(function(r) {
  r.Empty = "", r.QuickFix = "quickfix", r.Refactor = "refactor", r.RefactorExtract = "refactor.extract", r.RefactorInline = "refactor.inline", r.RefactorRewrite = "refactor.rewrite", r.Source = "source", r.SourceOrganizeImports = "source.organizeImports", r.SourceFixAll = "source.fixAll";
})(ui || (ui = {}));
var ci;
(function(r) {
  function e(i, n) {
    var s = { diagnostics: i };
    return n != null && (s.only = n), s;
  }
  r.create = e;
  function t(i) {
    var n = i;
    return m.defined(n) && m.typedArray(n.diagnostics, dt.is) && (n.only === void 0 || m.typedArray(n.only, m.string));
  }
  r.is = t;
})(ci || (ci = {}));
var li;
(function(r) {
  function e(i, n, s) {
    var a = { title: i }, o = !0;
    return typeof n == "string" ? (o = !1, a.kind = n) : qe.is(n) ? a.command = n : a.edit = n, o && s !== void 0 && (a.kind = s), a;
  }
  r.create = e;
  function t(i) {
    var n = i;
    return n && m.string(n.title) && (n.diagnostics === void 0 || m.typedArray(n.diagnostics, dt.is)) && (n.kind === void 0 || m.string(n.kind)) && (n.edit !== void 0 || n.command !== void 0) && (n.command === void 0 || qe.is(n.command)) && (n.isPreferred === void 0 || m.boolean(n.isPreferred)) && (n.edit === void 0 || Nt.is(n.edit));
  }
  r.is = t;
})(li || (li = {}));
var hi;
(function(r) {
  function e(i, n) {
    var s = { range: i };
    return m.defined(n) && (s.data = n), s;
  }
  r.create = e;
  function t(i) {
    var n = i;
    return m.defined(n) && W.is(n.range) && (m.undefined(n.command) || qe.is(n.command));
  }
  r.is = t;
})(hi || (hi = {}));
var fi;
(function(r) {
  function e(i, n) {
    return { tabSize: i, insertSpaces: n };
  }
  r.create = e;
  function t(i) {
    var n = i;
    return m.defined(n) && m.uinteger(n.tabSize) && m.boolean(n.insertSpaces);
  }
  r.is = t;
})(fi || (fi = {}));
var pi;
(function(r) {
  function e(i, n, s) {
    return { range: i, target: n, data: s };
  }
  r.create = e;
  function t(i) {
    var n = i;
    return m.defined(n) && W.is(n.range) && (m.undefined(n.target) || m.string(n.target));
  }
  r.is = t;
})(pi || (pi = {}));
var di;
(function(r) {
  function e(i, n) {
    return { range: i, parent: n };
  }
  r.create = e;
  function t(i) {
    var n = i;
    return n !== void 0 && W.is(n.range) && (n.parent === void 0 || r.is(n.parent));
  }
  r.is = t;
})(di || (di = {}));
var mi;
(function(r) {
  function e(s, a, o, l) {
    return new Ds(s, a, o, l);
  }
  r.create = e;
  function t(s) {
    var a = s;
    return !!(m.defined(a) && m.string(a.uri) && (m.undefined(a.languageId) || m.string(a.languageId)) && m.uinteger(a.lineCount) && m.func(a.getText) && m.func(a.positionAt) && m.func(a.offsetAt));
  }
  r.is = t;
  function i(s, a) {
    for (var o = s.getText(), l = n(a, function(b, E) {
      var _ = b.range.start.line - E.range.start.line;
      return _ === 0 ? b.range.start.character - E.range.start.character : _;
    }), c = o.length, h = l.length - 1; h >= 0; h--) {
      var p = l[h], y = s.offsetAt(p.range.start), g = s.offsetAt(p.range.end);
      if (g <= c)
        o = o.substring(0, y) + p.newText + o.substring(g, o.length);
      else
        throw new Error("Overlapping edit");
      c = y;
    }
    return o;
  }
  r.applyEdits = i;
  function n(s, a) {
    if (s.length <= 1)
      return s;
    var o = s.length / 2 | 0, l = s.slice(0, o), c = s.slice(o);
    n(l, a), n(c, a);
    for (var h = 0, p = 0, y = 0; h < l.length && p < c.length; ) {
      var g = a(l[h], c[p]);
      g <= 0 ? s[y++] = l[h++] : s[y++] = c[p++];
    }
    for (; h < l.length; )
      s[y++] = l[h++];
    for (; p < c.length; )
      s[y++] = c[p++];
    return s;
  }
})(mi || (mi = {}));
var Ds = (
  /** @class */
  function() {
    function r(e, t, i, n) {
      this._uri = e, this._languageId = t, this._version = i, this._content = n, this._lineOffsets = void 0;
    }
    return Object.defineProperty(r.prototype, "uri", {
      get: function() {
        return this._uri;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(r.prototype, "languageId", {
      get: function() {
        return this._languageId;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(r.prototype, "version", {
      get: function() {
        return this._version;
      },
      enumerable: !1,
      configurable: !0
    }), r.prototype.getText = function(e) {
      if (e) {
        var t = this.offsetAt(e.start), i = this.offsetAt(e.end);
        return this._content.substring(t, i);
      }
      return this._content;
    }, r.prototype.update = function(e, t) {
      this._content = e.text, this._version = t, this._lineOffsets = void 0;
    }, r.prototype.getLineOffsets = function() {
      if (this._lineOffsets === void 0) {
        for (var e = [], t = this._content, i = !0, n = 0; n < t.length; n++) {
          i && (e.push(n), i = !1);
          var s = t.charAt(n);
          i = s === "\r" || s === `
`, s === "\r" && n + 1 < t.length && t.charAt(n + 1) === `
` && n++;
        }
        i && t.length > 0 && e.push(t.length), this._lineOffsets = e;
      }
      return this._lineOffsets;
    }, r.prototype.positionAt = function(e) {
      e = Math.max(Math.min(e, this._content.length), 0);
      var t = this.getLineOffsets(), i = 0, n = t.length;
      if (n === 0)
        return re.create(0, e);
      for (; i < n; ) {
        var s = Math.floor((i + n) / 2);
        t[s] > e ? n = s : i = s + 1;
      }
      var a = i - 1;
      return re.create(a, e - t[a]);
    }, r.prototype.offsetAt = function(e) {
      var t = this.getLineOffsets();
      if (e.line >= t.length)
        return this._content.length;
      if (e.line < 0)
        return 0;
      var i = t[e.line], n = e.line + 1 < t.length ? t[e.line + 1] : this._content.length;
      return Math.max(Math.min(i + e.character, n), i);
    }, Object.defineProperty(r.prototype, "lineCount", {
      get: function() {
        return this.getLineOffsets().length;
      },
      enumerable: !1,
      configurable: !0
    }), r;
  }()
), m;
(function(r) {
  var e = Object.prototype.toString;
  function t(g) {
    return typeof g < "u";
  }
  r.defined = t;
  function i(g) {
    return typeof g > "u";
  }
  r.undefined = i;
  function n(g) {
    return g === !0 || g === !1;
  }
  r.boolean = n;
  function s(g) {
    return e.call(g) === "[object String]";
  }
  r.string = s;
  function a(g) {
    return e.call(g) === "[object Number]";
  }
  r.number = a;
  function o(g, b, E) {
    return e.call(g) === "[object Number]" && b <= g && g <= E;
  }
  r.numberRange = o;
  function l(g) {
    return e.call(g) === "[object Number]" && -2147483648 <= g && g <= 2147483647;
  }
  r.integer = l;
  function c(g) {
    return e.call(g) === "[object Number]" && 0 <= g && g <= 2147483647;
  }
  r.uinteger = c;
  function h(g) {
    return e.call(g) === "[object Function]";
  }
  r.func = h;
  function p(g) {
    return g !== null && typeof g == "object";
  }
  r.objectLiteral = p;
  function y(g, b) {
    return Array.isArray(g) && g.every(b);
  }
  r.typedArray = y;
})(m || (m = {}));
var gi = (
  /** @class */
  function() {
    function r(e, t, i, n) {
      this._uri = e, this._languageId = t, this._version = i, this._content = n, this._lineOffsets = void 0;
    }
    return Object.defineProperty(r.prototype, "uri", {
      get: function() {
        return this._uri;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(r.prototype, "languageId", {
      get: function() {
        return this._languageId;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(r.prototype, "version", {
      get: function() {
        return this._version;
      },
      enumerable: !0,
      configurable: !0
    }), r.prototype.getText = function(e) {
      if (e) {
        var t = this.offsetAt(e.start), i = this.offsetAt(e.end);
        return this._content.substring(t, i);
      }
      return this._content;
    }, r.prototype.update = function(e, t) {
      for (var i = 0, n = e; i < n.length; i++) {
        var s = n[i];
        if (r.isIncremental(s)) {
          var a = Ji(s.range), o = this.offsetAt(a.start), l = this.offsetAt(a.end);
          this._content = this._content.substring(0, o) + s.text + this._content.substring(l, this._content.length);
          var c = Math.max(a.start.line, 0), h = Math.max(a.end.line, 0), p = this._lineOffsets, y = yi(s.text, !1, o);
          if (h - c === y.length)
            for (var g = 0, b = y.length; g < b; g++)
              p[g + c + 1] = y[g];
          else
            y.length < 1e4 ? p.splice.apply(p, [c + 1, h - c].concat(y)) : this._lineOffsets = p = p.slice(0, c + 1).concat(y, p.slice(h + 1));
          var E = s.text.length - (l - o);
          if (E !== 0)
            for (var g = c + 1 + y.length, b = p.length; g < b; g++)
              p[g] = p[g] + E;
        } else if (r.isFull(s))
          this._content = s.text, this._lineOffsets = void 0;
        else
          throw new Error("Unknown change event received");
      }
      this._version = t;
    }, r.prototype.getLineOffsets = function() {
      return this._lineOffsets === void 0 && (this._lineOffsets = yi(this._content, !0)), this._lineOffsets;
    }, r.prototype.positionAt = function(e) {
      e = Math.max(Math.min(e, this._content.length), 0);
      var t = this.getLineOffsets(), i = 0, n = t.length;
      if (n === 0)
        return { line: 0, character: e };
      for (; i < n; ) {
        var s = Math.floor((i + n) / 2);
        t[s] > e ? n = s : i = s + 1;
      }
      var a = i - 1;
      return { line: a, character: e - t[a] };
    }, r.prototype.offsetAt = function(e) {
      var t = this.getLineOffsets();
      if (e.line >= t.length)
        return this._content.length;
      if (e.line < 0)
        return 0;
      var i = t[e.line], n = e.line + 1 < t.length ? t[e.line + 1] : this._content.length;
      return Math.max(Math.min(i + e.character, n), i);
    }, Object.defineProperty(r.prototype, "lineCount", {
      get: function() {
        return this.getLineOffsets().length;
      },
      enumerable: !0,
      configurable: !0
    }), r.isIncremental = function(e) {
      var t = e;
      return t != null && typeof t.text == "string" && t.range !== void 0 && (t.rangeLength === void 0 || typeof t.rangeLength == "number");
    }, r.isFull = function(e) {
      var t = e;
      return t != null && typeof t.text == "string" && t.range === void 0 && t.rangeLength === void 0;
    }, r;
  }()
), vi;
(function(r) {
  function e(n, s, a, o) {
    return new gi(n, s, a, o);
  }
  r.create = e;
  function t(n, s, a) {
    if (n instanceof gi)
      return n.update(s, a), n;
    throw new Error("TextDocument.update: document must be created by TextDocument.create");
  }
  r.update = t;
  function i(n, s) {
    for (var a = n.getText(), o = Gt(s.map(Fs), function(b, E) {
      var _ = b.range.start.line - E.range.start.line;
      return _ === 0 ? b.range.start.character - E.range.start.character : _;
    }), l = 0, c = [], h = 0, p = o; h < p.length; h++) {
      var y = p[h], g = n.offsetAt(y.range.start);
      if (g < l)
        throw new Error("Overlapping edit");
      g > l && c.push(a.substring(l, g)), y.newText.length && c.push(y.newText), l = n.offsetAt(y.range.end);
    }
    return c.push(a.substr(l)), c.join("");
  }
  r.applyEdits = i;
})(vi || (vi = {}));
function Gt(r, e) {
  if (r.length <= 1)
    return r;
  var t = r.length / 2 | 0, i = r.slice(0, t), n = r.slice(t);
  Gt(i, e), Gt(n, e);
  for (var s = 0, a = 0, o = 0; s < i.length && a < n.length; ) {
    var l = e(i[s], n[a]);
    l <= 0 ? r[o++] = i[s++] : r[o++] = n[a++];
  }
  for (; s < i.length; )
    r[o++] = i[s++];
  for (; a < n.length; )
    r[o++] = n[a++];
  return r;
}
function yi(r, e, t) {
  t === void 0 && (t = 0);
  for (var i = e ? [t] : [], n = 0; n < r.length; n++) {
    var s = r.charCodeAt(n);
    (s === 13 || s === 10) && (s === 13 && n + 1 < r.length && r.charCodeAt(n + 1) === 10 && n++, i.push(t + n + 1));
  }
  return i;
}
function Ji(r) {
  var e = r.start, t = r.end;
  return e.line > t.line || e.line === t.line && e.character > t.character ? { start: t, end: e } : r;
}
function Fs(r) {
  var e = Ji(r.range);
  return e !== r.range ? { newText: r.newText, range: e } : r;
}
var bi;
(function(r) {
  r.LATEST = {
    textDocument: {
      completion: {
        completionItem: {
          documentationFormat: [ue.Markdown, ue.PlainText]
        }
      },
      hover: {
        contentFormat: [ue.Markdown, ue.PlainText]
      }
    }
  };
})(bi || (bi = {}));
var Qe;
(function(r) {
  r[r.Unknown = 0] = "Unknown", r[r.File = 1] = "File", r[r.Directory = 2] = "Directory", r[r.SymbolicLink = 64] = "SymbolicLink";
})(Qe || (Qe = {}));
var Xi;
Xi = (() => {
  var r = { 470: (i) => {
    function n(o) {
      if (typeof o != "string")
        throw new TypeError("Path must be a string. Received " + JSON.stringify(o));
    }
    function s(o, l) {
      for (var c, h = "", p = 0, y = -1, g = 0, b = 0; b <= o.length; ++b) {
        if (b < o.length)
          c = o.charCodeAt(b);
        else {
          if (c === 47)
            break;
          c = 47;
        }
        if (c === 47) {
          if (!(y === b - 1 || g === 1))
            if (y !== b - 1 && g === 2) {
              if (h.length < 2 || p !== 2 || h.charCodeAt(h.length - 1) !== 46 || h.charCodeAt(h.length - 2) !== 46) {
                if (h.length > 2) {
                  var E = h.lastIndexOf("/");
                  if (E !== h.length - 1) {
                    E === -1 ? (h = "", p = 0) : p = (h = h.slice(0, E)).length - 1 - h.lastIndexOf("/"), y = b, g = 0;
                    continue;
                  }
                } else if (h.length === 2 || h.length === 1) {
                  h = "", p = 0, y = b, g = 0;
                  continue;
                }
              }
              l && (h.length > 0 ? h += "/.." : h = "..", p = 2);
            } else
              h.length > 0 ? h += "/" + o.slice(y + 1, b) : h = o.slice(y + 1, b), p = b - y - 1;
          y = b, g = 0;
        } else
          c === 46 && g !== -1 ? ++g : g = -1;
      }
      return h;
    }
    var a = { resolve: function() {
      for (var o, l = "", c = !1, h = arguments.length - 1; h >= -1 && !c; h--) {
        var p;
        h >= 0 ? p = arguments[h] : (o === void 0 && (o = process.cwd()), p = o), n(p), p.length !== 0 && (l = p + "/" + l, c = p.charCodeAt(0) === 47);
      }
      return l = s(l, !c), c ? l.length > 0 ? "/" + l : "/" : l.length > 0 ? l : ".";
    }, normalize: function(o) {
      if (n(o), o.length === 0)
        return ".";
      var l = o.charCodeAt(0) === 47, c = o.charCodeAt(o.length - 1) === 47;
      return (o = s(o, !l)).length !== 0 || l || (o = "."), o.length > 0 && c && (o += "/"), l ? "/" + o : o;
    }, isAbsolute: function(o) {
      return n(o), o.length > 0 && o.charCodeAt(0) === 47;
    }, join: function() {
      if (arguments.length === 0)
        return ".";
      for (var o, l = 0; l < arguments.length; ++l) {
        var c = arguments[l];
        n(c), c.length > 0 && (o === void 0 ? o = c : o += "/" + c);
      }
      return o === void 0 ? "." : a.normalize(o);
    }, relative: function(o, l) {
      if (n(o), n(l), o === l || (o = a.resolve(o)) === (l = a.resolve(l)))
        return "";
      for (var c = 1; c < o.length && o.charCodeAt(c) === 47; ++c)
        ;
      for (var h = o.length, p = h - c, y = 1; y < l.length && l.charCodeAt(y) === 47; ++y)
        ;
      for (var g = l.length - y, b = p < g ? p : g, E = -1, _ = 0; _ <= b; ++_) {
        if (_ === b) {
          if (g > b) {
            if (l.charCodeAt(y + _) === 47)
              return l.slice(y + _ + 1);
            if (_ === 0)
              return l.slice(y + _);
          } else
            p > b && (o.charCodeAt(c + _) === 47 ? E = _ : _ === 0 && (E = 0));
          break;
        }
        var M = o.charCodeAt(c + _);
        if (M !== l.charCodeAt(y + _))
          break;
        M === 47 && (E = _);
      }
      var B = "";
      for (_ = c + E + 1; _ <= h; ++_)
        _ !== h && o.charCodeAt(_) !== 47 || (B.length === 0 ? B += ".." : B += "/..");
      return B.length > 0 ? B + l.slice(y + E) : (y += E, l.charCodeAt(y) === 47 && ++y, l.slice(y));
    }, _makeLong: function(o) {
      return o;
    }, dirname: function(o) {
      if (n(o), o.length === 0)
        return ".";
      for (var l = o.charCodeAt(0), c = l === 47, h = -1, p = !0, y = o.length - 1; y >= 1; --y)
        if ((l = o.charCodeAt(y)) === 47) {
          if (!p) {
            h = y;
            break;
          }
        } else
          p = !1;
      return h === -1 ? c ? "/" : "." : c && h === 1 ? "//" : o.slice(0, h);
    }, basename: function(o, l) {
      if (l !== void 0 && typeof l != "string")
        throw new TypeError('"ext" argument must be a string');
      n(o);
      var c, h = 0, p = -1, y = !0;
      if (l !== void 0 && l.length > 0 && l.length <= o.length) {
        if (l.length === o.length && l === o)
          return "";
        var g = l.length - 1, b = -1;
        for (c = o.length - 1; c >= 0; --c) {
          var E = o.charCodeAt(c);
          if (E === 47) {
            if (!y) {
              h = c + 1;
              break;
            }
          } else
            b === -1 && (y = !1, b = c + 1), g >= 0 && (E === l.charCodeAt(g) ? --g == -1 && (p = c) : (g = -1, p = b));
        }
        return h === p ? p = b : p === -1 && (p = o.length), o.slice(h, p);
      }
      for (c = o.length - 1; c >= 0; --c)
        if (o.charCodeAt(c) === 47) {
          if (!y) {
            h = c + 1;
            break;
          }
        } else
          p === -1 && (y = !1, p = c + 1);
      return p === -1 ? "" : o.slice(h, p);
    }, extname: function(o) {
      n(o);
      for (var l = -1, c = 0, h = -1, p = !0, y = 0, g = o.length - 1; g >= 0; --g) {
        var b = o.charCodeAt(g);
        if (b !== 47)
          h === -1 && (p = !1, h = g + 1), b === 46 ? l === -1 ? l = g : y !== 1 && (y = 1) : l !== -1 && (y = -1);
        else if (!p) {
          c = g + 1;
          break;
        }
      }
      return l === -1 || h === -1 || y === 0 || y === 1 && l === h - 1 && l === c + 1 ? "" : o.slice(l, h);
    }, format: function(o) {
      if (o === null || typeof o != "object")
        throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof o);
      return function(l, c) {
        var h = c.dir || c.root, p = c.base || (c.name || "") + (c.ext || "");
        return h ? h === c.root ? h + p : h + "/" + p : p;
      }(0, o);
    }, parse: function(o) {
      n(o);
      var l = { root: "", dir: "", base: "", ext: "", name: "" };
      if (o.length === 0)
        return l;
      var c, h = o.charCodeAt(0), p = h === 47;
      p ? (l.root = "/", c = 1) : c = 0;
      for (var y = -1, g = 0, b = -1, E = !0, _ = o.length - 1, M = 0; _ >= c; --_)
        if ((h = o.charCodeAt(_)) !== 47)
          b === -1 && (E = !1, b = _ + 1), h === 46 ? y === -1 ? y = _ : M !== 1 && (M = 1) : y !== -1 && (M = -1);
        else if (!E) {
          g = _ + 1;
          break;
        }
      return y === -1 || b === -1 || M === 0 || M === 1 && y === b - 1 && y === g + 1 ? b !== -1 && (l.base = l.name = g === 0 && p ? o.slice(1, b) : o.slice(g, b)) : (g === 0 && p ? (l.name = o.slice(1, y), l.base = o.slice(1, b)) : (l.name = o.slice(g, y), l.base = o.slice(g, b)), l.ext = o.slice(y, b)), g > 0 ? l.dir = o.slice(0, g - 1) : p && (l.dir = "/"), l;
    }, sep: "/", delimiter: ":", win32: null, posix: null };
    a.posix = a, i.exports = a;
  }, 447: (i, n, s) => {
    var a;
    if (s.r(n), s.d(n, { URI: () => M, Utils: () => _t }), typeof process == "object")
      a = process.platform === "win32";
    else if (typeof navigator == "object") {
      var o = navigator.userAgent;
      a = o.indexOf("Windows") >= 0;
    }
    var l, c, h = (l = function(k, v) {
      return (l = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(x, w) {
        x.__proto__ = w;
      } || function(x, w) {
        for (var V in w)
          Object.prototype.hasOwnProperty.call(w, V) && (x[V] = w[V]);
      })(k, v);
    }, function(k, v) {
      function x() {
        this.constructor = k;
      }
      l(k, v), k.prototype = v === null ? Object.create(v) : (x.prototype = v.prototype, new x());
    }), p = /^\w[\w\d+.-]*$/, y = /^\//, g = /^\/\//, b = "", E = "/", _ = /^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/, M = function() {
      function k(v, x, w, V, F, $) {
        $ === void 0 && ($ = !1), typeof v == "object" ? (this.scheme = v.scheme || b, this.authority = v.authority || b, this.path = v.path || b, this.query = v.query || b, this.fragment = v.fragment || b) : (this.scheme = function(T, ee) {
          return T || ee ? T : "file";
        }(v, $), this.authority = x || b, this.path = function(T, ee) {
          switch (T) {
            case "https":
            case "http":
            case "file":
              ee ? ee[0] !== E && (ee = E + ee) : ee = E;
          }
          return ee;
        }(this.scheme, w || b), this.query = V || b, this.fragment = F || b, function(T, ee) {
          if (!T.scheme && ee)
            throw new Error('[UriError]: Scheme is missing: {scheme: "", authority: "' + T.authority + '", path: "' + T.path + '", query: "' + T.query + '", fragment: "' + T.fragment + '"}');
          if (T.scheme && !p.test(T.scheme))
            throw new Error("[UriError]: Scheme contains illegal characters.");
          if (T.path) {
            if (T.authority) {
              if (!y.test(T.path))
                throw new Error('[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character');
            } else if (g.test(T.path))
              throw new Error('[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")');
          }
        }(this, $));
      }
      return k.isUri = function(v) {
        return v instanceof k || !!v && typeof v.authority == "string" && typeof v.fragment == "string" && typeof v.path == "string" && typeof v.query == "string" && typeof v.scheme == "string" && typeof v.fsPath == "function" && typeof v.with == "function" && typeof v.toString == "function";
      }, Object.defineProperty(k.prototype, "fsPath", { get: function() {
        return lr(this, !1);
      }, enumerable: !1, configurable: !0 }), k.prototype.with = function(v) {
        if (!v)
          return this;
        var x = v.scheme, w = v.authority, V = v.path, F = v.query, $ = v.fragment;
        return x === void 0 ? x = this.scheme : x === null && (x = b), w === void 0 ? w = this.authority : w === null && (w = b), V === void 0 ? V = this.path : V === null && (V = b), F === void 0 ? F = this.query : F === null && (F = b), $ === void 0 ? $ = this.fragment : $ === null && ($ = b), x === this.scheme && w === this.authority && V === this.path && F === this.query && $ === this.fragment ? this : new H(x, w, V, F, $);
      }, k.parse = function(v, x) {
        x === void 0 && (x = !1);
        var w = _.exec(v);
        return w ? new H(w[2] || b, Xe(w[4] || b), Xe(w[5] || b), Xe(w[7] || b), Xe(w[9] || b), x) : new H(b, b, b, b, b);
      }, k.file = function(v) {
        var x = b;
        if (a && (v = v.replace(/\\/g, E)), v[0] === E && v[1] === E) {
          var w = v.indexOf(E, 2);
          w === -1 ? (x = v.substring(2), v = E) : (x = v.substring(2, w), v = v.substring(w) || E);
        }
        return new H("file", x, v, b, b);
      }, k.from = function(v) {
        return new H(v.scheme, v.authority, v.path, v.query, v.fragment);
      }, k.prototype.toString = function(v) {
        return v === void 0 && (v = !1), wt(this, v);
      }, k.prototype.toJSON = function() {
        return this;
      }, k.revive = function(v) {
        if (v) {
          if (v instanceof k)
            return v;
          var x = new H(v);
          return x._formatted = v.external, x._fsPath = v._sep === B ? v.fsPath : null, x;
        }
        return v;
      }, k;
    }(), B = a ? 1 : void 0, H = function(k) {
      function v() {
        var x = k !== null && k.apply(this, arguments) || this;
        return x._formatted = null, x._fsPath = null, x;
      }
      return h(v, k), Object.defineProperty(v.prototype, "fsPath", { get: function() {
        return this._fsPath || (this._fsPath = lr(this, !1)), this._fsPath;
      }, enumerable: !1, configurable: !0 }), v.prototype.toString = function(x) {
        return x === void 0 && (x = !1), x ? wt(this, !0) : (this._formatted || (this._formatted = wt(this, !1)), this._formatted);
      }, v.prototype.toJSON = function() {
        var x = { $mid: 1 };
        return this._fsPath && (x.fsPath = this._fsPath, x._sep = B), this._formatted && (x.external = this._formatted), this.path && (x.path = this.path), this.scheme && (x.scheme = this.scheme), this.authority && (x.authority = this.authority), this.query && (x.query = this.query), this.fragment && (x.fragment = this.fragment), x;
      }, v;
    }(M), Z = ((c = {})[58] = "%3A", c[47] = "%2F", c[63] = "%3F", c[35] = "%23", c[91] = "%5B", c[93] = "%5D", c[64] = "%40", c[33] = "%21", c[36] = "%24", c[38] = "%26", c[39] = "%27", c[40] = "%28", c[41] = "%29", c[42] = "%2A", c[43] = "%2B", c[44] = "%2C", c[59] = "%3B", c[61] = "%3D", c[32] = "%20", c);
    function Q(k, v) {
      for (var x = void 0, w = -1, V = 0; V < k.length; V++) {
        var F = k.charCodeAt(V);
        if (F >= 97 && F <= 122 || F >= 65 && F <= 90 || F >= 48 && F <= 57 || F === 45 || F === 46 || F === 95 || F === 126 || v && F === 47)
          w !== -1 && (x += encodeURIComponent(k.substring(w, V)), w = -1), x !== void 0 && (x += k.charAt(V));
        else {
          x === void 0 && (x = k.substr(0, V));
          var $ = Z[F];
          $ !== void 0 ? (w !== -1 && (x += encodeURIComponent(k.substring(w, V)), w = -1), x += $) : w === -1 && (w = V);
        }
      }
      return w !== -1 && (x += encodeURIComponent(k.substring(w))), x !== void 0 ? x : k;
    }
    function kt(k) {
      for (var v = void 0, x = 0; x < k.length; x++) {
        var w = k.charCodeAt(x);
        w === 35 || w === 63 ? (v === void 0 && (v = k.substr(0, x)), v += Z[w]) : v !== void 0 && (v += k[x]);
      }
      return v !== void 0 ? v : k;
    }
    function lr(k, v) {
      var x;
      return x = k.authority && k.path.length > 1 && k.scheme === "file" ? "//" + k.authority + k.path : k.path.charCodeAt(0) === 47 && (k.path.charCodeAt(1) >= 65 && k.path.charCodeAt(1) <= 90 || k.path.charCodeAt(1) >= 97 && k.path.charCodeAt(1) <= 122) && k.path.charCodeAt(2) === 58 ? v ? k.path.substr(1) : k.path[1].toLowerCase() + k.path.substr(2) : k.path, a && (x = x.replace(/\//g, "\\")), x;
    }
    function wt(k, v) {
      var x = v ? kt : Q, w = "", V = k.scheme, F = k.authority, $ = k.path, T = k.query, ee = k.fragment;
      if (V && (w += V, w += ":"), (F || V === "file") && (w += E, w += E), F) {
        var le = F.indexOf("@");
        if (le !== -1) {
          var Ze = F.substr(0, le);
          F = F.substr(le + 1), (le = Ze.indexOf(":")) === -1 ? w += x(Ze, !1) : (w += x(Ze.substr(0, le), !1), w += ":", w += x(Ze.substr(le + 1), !1)), w += "@";
        }
        (le = (F = F.toLowerCase()).indexOf(":")) === -1 ? w += x(F, !1) : (w += x(F.substr(0, le), !1), w += F.substr(le));
      }
      if ($) {
        if ($.length >= 3 && $.charCodeAt(0) === 47 && $.charCodeAt(2) === 58)
          (ke = $.charCodeAt(1)) >= 65 && ke <= 90 && ($ = "/" + String.fromCharCode(ke + 32) + ":" + $.substr(3));
        else if ($.length >= 2 && $.charCodeAt(1) === 58) {
          var ke;
          (ke = $.charCodeAt(0)) >= 65 && ke <= 90 && ($ = String.fromCharCode(ke + 32) + ":" + $.substr(2));
        }
        w += x($, !0);
      }
      return T && (w += "?", w += x(T, !1)), ee && (w += "#", w += v ? ee : Q(ee, !1)), w;
    }
    function hr(k) {
      try {
        return decodeURIComponent(k);
      } catch {
        return k.length > 3 ? k.substr(0, 3) + hr(k.substr(3)) : k;
      }
    }
    var fr = /(%[0-9A-Za-z][0-9A-Za-z])+/g;
    function Xe(k) {
      return k.match(fr) ? k.replace(fr, function(v) {
        return hr(v);
      }) : k;
    }
    var _t, pr = s(470), dr = function() {
      for (var k = 0, v = 0, x = arguments.length; v < x; v++)
        k += arguments[v].length;
      var w = Array(k), V = 0;
      for (v = 0; v < x; v++)
        for (var F = arguments[v], $ = 0, T = F.length; $ < T; $++, V++)
          w[V] = F[$];
      return w;
    }, ve = pr.posix || pr;
    (function(k) {
      k.joinPath = function(v) {
        for (var x = [], w = 1; w < arguments.length; w++)
          x[w - 1] = arguments[w];
        return v.with({ path: ve.join.apply(ve, dr([v.path], x)) });
      }, k.resolvePath = function(v) {
        for (var x = [], w = 1; w < arguments.length; w++)
          x[w - 1] = arguments[w];
        var V = v.path || "/";
        return v.with({ path: ve.resolve.apply(ve, dr([V], x)) });
      }, k.dirname = function(v) {
        var x = ve.dirname(v.path);
        return x.length === 1 && x.charCodeAt(0) === 46 ? v : v.with({ path: x });
      }, k.basename = function(v) {
        return ve.basename(v.path);
      }, k.extname = function(v) {
        return ve.extname(v.path);
      };
    })(_t || (_t = {}));
  } }, e = {};
  function t(i) {
    if (e[i])
      return e[i].exports;
    var n = e[i] = { exports: {} };
    return r[i](n, n.exports, t), n.exports;
  }
  return t.d = (i, n) => {
    for (var s in n)
      t.o(n, s) && !t.o(i, s) && Object.defineProperty(i, s, { enumerable: !0, get: n[s] });
  }, t.o = (i, n) => Object.prototype.hasOwnProperty.call(i, n), t.r = (i) => {
    typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(i, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(i, "__esModule", { value: !0 });
  }, t(447);
})();
const { URI: cr, Utils: Qt } = Xi;
var Ms = globalThis && globalThis.__spreadArray || function(r, e) {
  for (var t = 0, i = e.length, n = r.length; t < i; t++, n++)
    r[n] = e[t];
  return r;
};
function Ft(r) {
  return Qt.dirname(cr.parse(r)).toString();
}
function Jt(r) {
  for (var e = [], t = 1; t < arguments.length; t++)
    e[t - 1] = arguments[t];
  return Qt.joinPath.apply(Qt, Ms([cr.parse(r)], e)).toString();
}
var Ci = globalThis && globalThis.__awaiter || function(r, e, t, i) {
  function n(s) {
    return s instanceof t ? s : new t(function(a) {
      a(s);
    });
  }
  return new (t || (t = Promise))(function(s, a) {
    function o(h) {
      try {
        c(i.next(h));
      } catch (p) {
        a(p);
      }
    }
    function l(h) {
      try {
        c(i.throw(h));
      } catch (p) {
        a(p);
      }
    }
    function c(h) {
      h.done ? s(h.value) : n(h.value).then(o, l);
    }
    c((i = i.apply(r, e || [])).next());
  });
}, xi = globalThis && globalThis.__generator || function(r, e) {
  var t = { label: 0, sent: function() {
    if (s[0] & 1)
      throw s[1];
    return s[1];
  }, trys: [], ops: [] }, i, n, s, a;
  return a = { next: o(0), throw: o(1), return: o(2) }, typeof Symbol == "function" && (a[Symbol.iterator] = function() {
    return this;
  }), a;
  function o(c) {
    return function(h) {
      return l([c, h]);
    };
  }
  function l(c) {
    if (i)
      throw new TypeError("Generator is already executing.");
    for (; t; )
      try {
        if (i = 1, n && (s = c[0] & 2 ? n.return : c[0] ? n.throw || ((s = n.return) && s.call(n), 0) : n.next) && !(s = s.call(n, c[1])).done)
          return s;
        switch (n = 0, s && (c = [c[0] & 2, s.value]), c[0]) {
          case 0:
          case 1:
            s = c;
            break;
          case 4:
            return t.label++, { value: c[1], done: !1 };
          case 5:
            t.label++, n = c[1], c = [0];
            continue;
          case 7:
            c = t.ops.pop(), t.trys.pop();
            continue;
          default:
            if (s = t.trys, !(s = s.length > 0 && s[s.length - 1]) && (c[0] === 6 || c[0] === 2)) {
              t = 0;
              continue;
            }
            if (c[0] === 3 && (!s || c[1] > s[0] && c[1] < s[3])) {
              t.label = c[1];
              break;
            }
            if (c[0] === 6 && t.label < s[1]) {
              t.label = s[1], s = c;
              break;
            }
            if (s && t.label < s[2]) {
              t.label = s[2], t.ops.push(c);
              break;
            }
            s[2] && t.ops.pop(), t.trys.pop();
            continue;
        }
        c = e.call(r, t);
      } catch (h) {
        c = [6, h], n = 0;
      } finally {
        i = s = 0;
      }
    if (c[0] & 5)
      throw c[1];
    return { value: c[0] ? c[1] : void 0, done: !0 };
  }
}, Os = (
  /** @class */
  function() {
    function r(e) {
      this.readDirectory = e, this.literalCompletions = [], this.importCompletions = [];
    }
    return r.prototype.onCssURILiteralValue = function(e) {
      this.literalCompletions.push(e);
    }, r.prototype.onCssImportPath = function(e) {
      this.importCompletions.push(e);
    }, r.prototype.computeCompletions = function(e, t) {
      return Ci(this, void 0, void 0, function() {
        var i, n, s, a, o, E, l, c, h, H, p, y, g, b, E, _, M, B, H;
        return xi(this, function(Z) {
          switch (Z.label) {
            case 0:
              i = { items: [], isIncomplete: !1 }, n = 0, s = this.literalCompletions, Z.label = 1;
            case 1:
              return n < s.length ? (a = s[n], o = a.uriValue, E = Mt(o), E === "." || E === ".." ? (i.isIncomplete = !0, [3, 4]) : [3, 2]) : [3, 5];
            case 2:
              return [4, this.providePathSuggestions(o, a.position, a.range, e, t)];
            case 3:
              for (l = Z.sent(), c = 0, h = l; c < h.length; c++)
                H = h[c], i.items.push(H);
              Z.label = 4;
            case 4:
              return n++, [3, 1];
            case 5:
              p = 0, y = this.importCompletions, Z.label = 6;
            case 6:
              return p < y.length ? (g = y[p], b = g.pathValue, E = Mt(b), E === "." || E === ".." ? (i.isIncomplete = !0, [3, 9]) : [3, 7]) : [3, 10];
            case 7:
              return [4, this.providePathSuggestions(b, g.position, g.range, e, t)];
            case 8:
              for (_ = Z.sent(), e.languageId === "scss" && _.forEach(function(Q) {
                J(Q.label, "_") && Vi(Q.label, ".scss") && (Q.textEdit ? Q.textEdit.newText = Q.label.slice(1, -5) : Q.label = Q.label.slice(1, -5));
              }), M = 0, B = _; M < B.length; M++)
                H = B[M], i.items.push(H);
              Z.label = 9;
            case 9:
              return p++, [3, 6];
            case 10:
              return [2, i];
          }
        });
      });
    }, r.prototype.providePathSuggestions = function(e, t, i, n, s) {
      return Ci(this, void 0, void 0, function() {
        var a, o, l, c, h, p, y, g, b, E, _, M, B, H, Z;
        return xi(this, function(Q) {
          switch (Q.label) {
            case 0:
              if (a = Mt(e), o = J(e, "'") || J(e, '"'), l = o ? a.slice(0, t.character - (i.start.character + 1)) : a.slice(0, t.character - i.start.character), c = n.uri, h = o ? Bs(i, 1, -1) : i, p = $s(l, a, h), y = l.substring(0, l.lastIndexOf("/") + 1), g = s.resolveReference(y || ".", c), !g)
                return [3, 4];
              Q.label = 1;
            case 1:
              return Q.trys.push([1, 3, , 4]), b = [], [4, this.readDirectory(g)];
            case 2:
              for (E = Q.sent(), _ = 0, M = E; _ < M.length; _++)
                B = M[_], H = B[0], Z = B[1], H.charCodeAt(0) !== Ls && (Z === Qe.Directory || Jt(g, H) !== c) && b.push(Vs(H, Z === Qe.Directory, p));
              return [2, b];
            case 3:
              return Q.sent(), [3, 4];
            case 4:
              return [2, []];
          }
        });
      });
    }, r;
  }()
), Ls = ".".charCodeAt(0);
function Mt(r) {
  return J(r, "'") || J(r, '"') ? r.slice(1, -1) : r;
}
function $s(r, e, t) {
  var i, n = r.lastIndexOf("/");
  if (n === -1)
    i = t;
  else {
    var s = e.slice(n + 1), a = yt(t.end, -s.length), o = s.indexOf(" "), l = void 0;
    o !== -1 ? l = yt(a, o) : l = t.end, i = W.create(a, l);
  }
  return i;
}
function Vs(r, e, t) {
  return e ? (r = r + "/", {
    label: st(r),
    kind: P.Folder,
    textEdit: I.replace(t, st(r)),
    command: {
      title: "Suggest",
      command: "editor.action.triggerSuggest"
    }
  }) : {
    label: st(r),
    kind: P.File,
    textEdit: I.replace(t, st(r))
  };
}
function st(r) {
  return r.replace(/(\s|\(|\)|,|"|')/g, "\\$1");
}
function yt(r, e) {
  return re.create(r.line, r.character + e);
}
function Bs(r, e, t) {
  var i = yt(r.start, e), n = yt(r.end, t);
  return W.create(i, n);
}
var js = globalThis && globalThis.__awaiter || function(r, e, t, i) {
  function n(s) {
    return s instanceof t ? s : new t(function(a) {
      a(s);
    });
  }
  return new (t || (t = Promise))(function(s, a) {
    function o(h) {
      try {
        c(i.next(h));
      } catch (p) {
        a(p);
      }
    }
    function l(h) {
      try {
        c(i.throw(h));
      } catch (p) {
        a(p);
      }
    }
    function c(h) {
      h.done ? s(h.value) : n(h.value).then(o, l);
    }
    c((i = i.apply(r, e || [])).next());
  });
}, Ws = globalThis && globalThis.__generator || function(r, e) {
  var t = { label: 0, sent: function() {
    if (s[0] & 1)
      throw s[1];
    return s[1];
  }, trys: [], ops: [] }, i, n, s, a;
  return a = { next: o(0), throw: o(1), return: o(2) }, typeof Symbol == "function" && (a[Symbol.iterator] = function() {
    return this;
  }), a;
  function o(c) {
    return function(h) {
      return l([c, h]);
    };
  }
  function l(c) {
    if (i)
      throw new TypeError("Generator is already executing.");
    for (; t; )
      try {
        if (i = 1, n && (s = c[0] & 2 ? n.return : c[0] ? n.throw || ((s = n.return) && s.call(n), 0) : n.next) && !(s = s.call(n, c[1])).done)
          return s;
        switch (n = 0, s && (c = [c[0] & 2, s.value]), c[0]) {
          case 0:
          case 1:
            s = c;
            break;
          case 4:
            return t.label++, { value: c[1], done: !1 };
          case 5:
            t.label++, n = c[1], c = [0];
            continue;
          case 7:
            c = t.ops.pop(), t.trys.pop();
            continue;
          default:
            if (s = t.trys, !(s = s.length > 0 && s[s.length - 1]) && (c[0] === 6 || c[0] === 2)) {
              t = 0;
              continue;
            }
            if (c[0] === 3 && (!s || c[1] > s[0] && c[1] < s[3])) {
              t.label = c[1];
              break;
            }
            if (c[0] === 6 && t.label < s[1]) {
              t.label = s[1], s = c;
              break;
            }
            if (s && t.label < s[2]) {
              t.label = s[2], t.ops.push(c);
              break;
            }
            s[2] && t.ops.pop(), t.trys.pop();
            continue;
        }
        c = e.call(r, t);
      } catch (h) {
        c = [6, h], n = 0;
      } finally {
        i = s = 0;
      }
    if (c[0] & 5)
      throw c[1];
    return { value: c[0] ? c[1] : void 0, done: !0 };
  }
}, Us = ge(), de = te.Snippet, oe;
(function(r) {
  r.Enums = " ", r.Normal = "d", r.VendorPrefixed = "x", r.Term = "y", r.Variable = "z";
})(oe || (oe = {}));
var Zi = (
  /** @class */
  function() {
    function r(e, t, i) {
      e === void 0 && (e = null), this.variablePrefix = e, this.lsOptions = t, this.cssDataManager = i, this.completionParticipants = [];
    }
    return r.prototype.configure = function(e) {
      this.defaultSettings = e;
    }, r.prototype.getSymbolContext = function() {
      return this.symbolContext || (this.symbolContext = new Kt(this.styleSheet)), this.symbolContext;
    }, r.prototype.setCompletionParticipants = function(e) {
      this.completionParticipants = e || [];
    }, r.prototype.doComplete2 = function(e, t, i, n, s) {
      return s === void 0 && (s = this.defaultSettings), js(this, void 0, void 0, function() {
        var a, o, l, c;
        return Ws(this, function(h) {
          switch (h.label) {
            case 0:
              if (!this.lsOptions.fileSystemProvider || !this.lsOptions.fileSystemProvider.readDirectory)
                return [2, this.doComplete(e, t, i, s)];
              a = new Os(this.lsOptions.fileSystemProvider.readDirectory), o = this.completionParticipants, this.completionParticipants = [a].concat(o), l = this.doComplete(e, t, i, s), h.label = 1;
            case 1:
              return h.trys.push([1, , 3, 4]), [4, a.computeCompletions(e, n)];
            case 2:
              return c = h.sent(), [2, {
                isIncomplete: l.isIncomplete || c.isIncomplete,
                items: c.items.concat(l.items)
              }];
            case 3:
              return this.completionParticipants = o, [
                7
                /*endfinally*/
              ];
            case 4:
              return [
                2
                /*return*/
              ];
          }
        });
      });
    }, r.prototype.doComplete = function(e, t, i, n) {
      this.offset = e.offsetAt(t), this.position = t, this.currentWord = zs(e, this.offset), this.defaultReplaceRange = W.create(re.create(this.position.line, this.position.character - this.currentWord.length), this.position), this.textDocument = e, this.styleSheet = i, this.documentSettings = n;
      try {
        var s = { isIncomplete: !1, items: [] };
        this.nodePath = In(this.styleSheet, this.offset);
        for (var a = this.nodePath.length - 1; a >= 0; a--) {
          var o = this.nodePath[a];
          if (o instanceof nr)
            this.getCompletionsForDeclarationProperty(o.getParent(), s);
          else if (o instanceof qi)
            o.parent instanceof Tt ? this.getVariableProposals(null, s) : this.getCompletionsForExpression(o, s);
          else if (o instanceof Bi) {
            var l = o.findAParent(f.ExtendsReference, f.Ruleset);
            if (l)
              if (l.type === f.ExtendsReference)
                this.getCompletionsForExtendsReference(l, o, s);
              else {
                var c = l;
                this.getCompletionsForSelector(c, c && c.isNested(), s);
              }
          } else if (o instanceof De)
            this.getCompletionsForFunctionArgument(o, o.getParent(), s);
          else if (o instanceof rr)
            this.getCompletionsForDeclarations(o, s);
          else if (o instanceof xt)
            this.getCompletionsForVariableDeclaration(o, s);
          else if (o instanceof ut)
            this.getCompletionsForRuleSet(o, s);
          else if (o instanceof Tt)
            this.getCompletionsForInterpolation(o, s);
          else if (o instanceof lt)
            this.getCompletionsForFunctionDeclaration(o, s);
          else if (o instanceof ht)
            this.getCompletionsForMixinReference(o, s);
          else if (o instanceof Je)
            this.getCompletionsForFunctionArgument(null, o, s);
          else if (o instanceof Ut)
            this.getCompletionsForSupports(o, s);
          else if (o instanceof We)
            this.getCompletionsForSupportsCondition(o, s);
          else if (o instanceof Te)
            this.getCompletionsForExtendsReference(o, null, s);
          else if (o.type === f.URILiteral)
            this.getCompletionForUriLiteralValue(o, s);
          else if (o.parent === null)
            this.getCompletionForTopLevel(s);
          else if (o.type === f.StringLiteral && this.isImportPathParent(o.parent.type))
            this.getCompletionForImportPath(o, s);
          else
            continue;
          if (s.items.length > 0 || this.offset > o.offset)
            return this.finalize(s);
        }
        return this.getCompletionsForStylesheet(s), s.items.length === 0 && this.variablePrefix && this.currentWord.indexOf(this.variablePrefix) === 0 && this.getVariableProposals(null, s), this.finalize(s);
      } finally {
        this.position = null, this.currentWord = null, this.textDocument = null, this.styleSheet = null, this.symbolContext = null, this.defaultReplaceRange = null, this.nodePath = null;
      }
    }, r.prototype.isImportPathParent = function(e) {
      return e === f.Import;
    }, r.prototype.finalize = function(e) {
      return e;
    }, r.prototype.findInNodePath = function() {
      for (var e = [], t = 0; t < arguments.length; t++)
        e[t] = arguments[t];
      for (var i = this.nodePath.length - 1; i >= 0; i--) {
        var n = this.nodePath[i];
        if (e.indexOf(n.type) !== -1)
          return n;
      }
      return null;
    }, r.prototype.getCompletionsForDeclarationProperty = function(e, t) {
      return this.getPropertyProposals(e, t);
    }, r.prototype.getPropertyProposals = function(e, t) {
      var i = this, n = this.isTriggerPropertyValueCompletionEnabled, s = this.isCompletePropertyWithSemicolonEnabled, a = this.cssDataManager.getProperties();
      return a.forEach(function(o) {
        var l, c, h = !1;
        e ? (l = i.getCompletionRange(e.getProperty()), c = o.name, ae(e.colonPosition) || (c += ": ", h = !0)) : (l = i.getCompletionRange(null), c = o.name + ": ", h = !0), !e && s && (c += "$0;"), e && !e.semicolonPosition && s && i.offset >= i.textDocument.offsetAt(l.end) && (c += "$0;");
        var p = {
          label: o.name,
          documentation: $e(o, i.doesSupportMarkdown()),
          tags: Ve(o) ? [Ce.Deprecated] : [],
          textEdit: I.replace(l, c),
          insertTextFormat: te.Snippet,
          kind: P.Property
        };
        o.restrictions || (h = !1), n && h && (p.command = {
          title: "Suggest",
          command: "editor.action.triggerSuggest"
        });
        var y = typeof o.relevance == "number" ? Math.min(Math.max(o.relevance, 0), 99) : 50, g = (255 - y).toString(16), b = J(o.name, "-") ? oe.VendorPrefixed : oe.Normal;
        p.sortText = b + "_" + g, t.items.push(p);
      }), this.completionParticipants.forEach(function(o) {
        o.onCssProperty && o.onCssProperty({
          propertyName: i.currentWord,
          range: i.defaultReplaceRange
        });
      }), t;
    }, Object.defineProperty(r.prototype, "isTriggerPropertyValueCompletionEnabled", {
      get: function() {
        var e, t;
        return (t = (e = this.documentSettings) === null || e === void 0 ? void 0 : e.triggerPropertyValueCompletion) !== null && t !== void 0 ? t : !0;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(r.prototype, "isCompletePropertyWithSemicolonEnabled", {
      get: function() {
        var e, t;
        return (t = (e = this.documentSettings) === null || e === void 0 ? void 0 : e.completePropertyWithSemicolon) !== null && t !== void 0 ? t : !0;
      },
      enumerable: !1,
      configurable: !0
    }), r.prototype.getCompletionsForDeclarationValue = function(e, t) {
      for (var i = this, n = e.getFullPropertyName(), s = this.cssDataManager.getProperty(n), a = e.getValue() || null; a && a.hasChildren(); )
        a = a.findChildAtOffset(this.offset, !1);
      if (this.completionParticipants.forEach(function(b) {
        b.onCssPropertyValue && b.onCssPropertyValue({
          propertyName: n,
          propertyValue: i.currentWord,
          range: i.getCompletionRange(a)
        });
      }), s) {
        if (s.restrictions)
          for (var o = 0, l = s.restrictions; o < l.length; o++) {
            var c = l[o];
            switch (c) {
              case "color":
                this.getColorProposals(s, a, t);
                break;
              case "position":
                this.getPositionProposals(s, a, t);
                break;
              case "repeat":
                this.getRepeatStyleProposals(s, a, t);
                break;
              case "line-style":
                this.getLineStyleProposals(s, a, t);
                break;
              case "line-width":
                this.getLineWidthProposals(s, a, t);
                break;
              case "geometry-box":
                this.getGeometryBoxProposals(s, a, t);
                break;
              case "box":
                this.getBoxProposals(s, a, t);
                break;
              case "image":
                this.getImageProposals(s, a, t);
                break;
              case "timing-function":
                this.getTimingFunctionProposals(s, a, t);
                break;
              case "shape":
                this.getBasicShapeProposals(s, a, t);
                break;
            }
          }
        this.getValueEnumProposals(s, a, t), this.getCSSWideKeywordProposals(s, a, t), this.getUnitProposals(s, a, t);
      } else
        for (var h = Ts(this.styleSheet, e), p = 0, y = h.getEntries(); p < y.length; p++) {
          var g = y[p];
          t.items.push({
            label: g,
            textEdit: I.replace(this.getCompletionRange(a), g),
            kind: P.Value
          });
        }
      return this.getVariableProposals(a, t), this.getTermProposals(s, a, t), t;
    }, r.prototype.getValueEnumProposals = function(e, t, i) {
      if (e.values)
        for (var n = 0, s = e.values; n < s.length; n++) {
          var a = s[n], o = a.name, l = void 0;
          if (Vi(o, ")")) {
            var c = o.lastIndexOf("(");
            c !== -1 && (o = o.substr(0, c) + "($1)", l = de);
          }
          var h = oe.Enums;
          J(a.name, "-") && (h += oe.VendorPrefixed);
          var p = {
            label: a.name,
            documentation: $e(a, this.doesSupportMarkdown()),
            tags: Ve(e) ? [Ce.Deprecated] : [],
            textEdit: I.replace(this.getCompletionRange(t), o),
            sortText: h,
            kind: P.Value,
            insertTextFormat: l
          };
          i.items.push(p);
        }
      return i;
    }, r.prototype.getCSSWideKeywordProposals = function(e, t, i) {
      for (var n in $r)
        i.items.push({
          label: n,
          documentation: $r[n],
          textEdit: I.replace(this.getCompletionRange(t), n),
          kind: P.Value
        });
      return i;
    }, r.prototype.getCompletionsForInterpolation = function(e, t) {
      return this.offset >= e.offset + 2 && this.getVariableProposals(null, t), t;
    }, r.prototype.getVariableProposals = function(e, t) {
      for (var i = this.getSymbolContext().findSymbolsAtOffset(this.offset, D.Variable), n = 0, s = i; n < s.length; n++) {
        var a = s[n], o = J(a.name, "--") ? "var(" + a.name + ")" : a.name, l = {
          label: a.name,
          documentation: a.value ? _r(a.value) : a.value,
          textEdit: I.replace(this.getCompletionRange(e), o),
          kind: P.Variable,
          sortText: oe.Variable
        };
        if (typeof l.documentation == "string" && ki(l.documentation) && (l.kind = P.Color), a.node.type === f.FunctionParameter) {
          var c = a.node.getParent();
          c.type === f.MixinDeclaration && (l.detail = Us("completion.argument", "argument from '{0}'", c.getName()));
        }
        t.items.push(l);
      }
      return t;
    }, r.prototype.getVariableProposalsForCSSVarFunction = function(e) {
      var t = this.getSymbolContext().findSymbolsAtOffset(this.offset, D.Variable);
      t = t.filter(function(o) {
        return J(o.name, "--");
      });
      for (var i = 0, n = t; i < n.length; i++) {
        var s = n[i], a = {
          label: s.name,
          documentation: s.value ? _r(s.value) : s.value,
          textEdit: I.replace(this.getCompletionRange(null), s.name),
          kind: P.Variable
        };
        typeof a.documentation == "string" && ki(a.documentation) && (a.kind = P.Color), e.items.push(a);
      }
      return e;
    }, r.prototype.getUnitProposals = function(e, t, i) {
      var n = "0";
      if (this.currentWord.length > 0) {
        var s = this.currentWord.match(/^-?\d[\.\d+]*/);
        s && (n = s[0], i.isIncomplete = n.length === this.currentWord.length);
      } else
        this.currentWord.length === 0 && (i.isIncomplete = !0);
      if (t && t.parent && t.parent.type === f.Term && (t = t.getParent()), e.restrictions)
        for (var a = 0, o = e.restrictions; a < o.length; a++) {
          var l = o[a], c = ws[l];
          if (c)
            for (var h = 0, p = c; h < p.length; h++) {
              var y = p[h], g = n + y;
              i.items.push({
                label: g,
                textEdit: I.replace(this.getCompletionRange(t), g),
                kind: P.Unit
              });
            }
        }
      return i;
    }, r.prototype.getCompletionRange = function(e) {
      if (e && e.offset <= this.offset && this.offset <= e.end) {
        var t = e.end !== -1 ? this.textDocument.positionAt(e.end) : this.position, i = this.textDocument.positionAt(e.offset);
        if (i.line === t.line)
          return W.create(i, t);
      }
      return this.defaultReplaceRange;
    }, r.prototype.getColorProposals = function(e, t, i) {
      for (var n in ft)
        i.items.push({
          label: n,
          documentation: ft[n],
          textEdit: I.replace(this.getCompletionRange(t), n),
          kind: P.Color
        });
      for (var n in Rr)
        i.items.push({
          label: n,
          documentation: Rr[n],
          textEdit: I.replace(this.getCompletionRange(t), n),
          kind: P.Value
        });
      var s = new Yi();
      this.styleSheet.acceptVisitor(new Ks(s, this.offset));
      for (var a = 0, o = s.getEntries(); a < o.length; a++) {
        var n = o[a];
        i.items.push({
          label: n,
          textEdit: I.replace(this.getCompletionRange(t), n),
          kind: P.Color
        });
      }
      for (var l = function(g) {
        var b = 1, E = function(M, B) {
          return "${" + b++ + ":" + B + "}";
        }, _ = g.func.replace(/\[?\$(\w+)\]?/g, E);
        i.items.push({
          label: g.func.substr(0, g.func.indexOf("(")),
          detail: g.func,
          documentation: g.desc,
          textEdit: I.replace(c.getCompletionRange(t), _),
          insertTextFormat: de,
          kind: P.Function
        });
      }, c = this, h = 0, p = ps; h < p.length; h++) {
        var y = p[h];
        l(y);
      }
      return i;
    }, r.prototype.getPositionProposals = function(e, t, i) {
      for (var n in Dr)
        i.items.push({
          label: n,
          documentation: Dr[n],
          textEdit: I.replace(this.getCompletionRange(t), n),
          kind: P.Value
        });
      return i;
    }, r.prototype.getRepeatStyleProposals = function(e, t, i) {
      for (var n in Fr)
        i.items.push({
          label: n,
          documentation: Fr[n],
          textEdit: I.replace(this.getCompletionRange(t), n),
          kind: P.Value
        });
      return i;
    }, r.prototype.getLineStyleProposals = function(e, t, i) {
      for (var n in Mr)
        i.items.push({
          label: n,
          documentation: Mr[n],
          textEdit: I.replace(this.getCompletionRange(t), n),
          kind: P.Value
        });
      return i;
    }, r.prototype.getLineWidthProposals = function(e, t, i) {
      for (var n = 0, s = ks; n < s.length; n++) {
        var a = s[n];
        i.items.push({
          label: a,
          textEdit: I.replace(this.getCompletionRange(t), a),
          kind: P.Value
        });
      }
      return i;
    }, r.prototype.getGeometryBoxProposals = function(e, t, i) {
      for (var n in Lr)
        i.items.push({
          label: n,
          documentation: Lr[n],
          textEdit: I.replace(this.getCompletionRange(t), n),
          kind: P.Value
        });
      return i;
    }, r.prototype.getBoxProposals = function(e, t, i) {
      for (var n in Or)
        i.items.push({
          label: n,
          documentation: Or[n],
          textEdit: I.replace(this.getCompletionRange(t), n),
          kind: P.Value
        });
      return i;
    }, r.prototype.getImageProposals = function(e, t, i) {
      for (var n in Vr) {
        var s = Be(n);
        i.items.push({
          label: n,
          documentation: Vr[n],
          textEdit: I.replace(this.getCompletionRange(t), s),
          kind: P.Function,
          insertTextFormat: n !== s ? de : void 0
        });
      }
      return i;
    }, r.prototype.getTimingFunctionProposals = function(e, t, i) {
      for (var n in Br) {
        var s = Be(n);
        i.items.push({
          label: n,
          documentation: Br[n],
          textEdit: I.replace(this.getCompletionRange(t), s),
          kind: P.Function,
          insertTextFormat: n !== s ? de : void 0
        });
      }
      return i;
    }, r.prototype.getBasicShapeProposals = function(e, t, i) {
      for (var n in jr) {
        var s = Be(n);
        i.items.push({
          label: n,
          documentation: jr[n],
          textEdit: I.replace(this.getCompletionRange(t), s),
          kind: P.Function,
          insertTextFormat: n !== s ? de : void 0
        });
      }
      return i;
    }, r.prototype.getCompletionsForStylesheet = function(e) {
      var t = this.styleSheet.findFirstChildBeforeOffset(this.offset);
      return t ? t instanceof ut ? this.getCompletionsForRuleSet(t, e) : t instanceof Ut ? this.getCompletionsForSupports(t, e) : e : this.getCompletionForTopLevel(e);
    }, r.prototype.getCompletionForTopLevel = function(e) {
      var t = this;
      return this.cssDataManager.getAtDirectives().forEach(function(i) {
        e.items.push({
          label: i.name,
          textEdit: I.replace(t.getCompletionRange(null), i.name),
          documentation: $e(i, t.doesSupportMarkdown()),
          tags: Ve(i) ? [Ce.Deprecated] : [],
          kind: P.Keyword
        });
      }), this.getCompletionsForSelector(null, !1, e), e;
    }, r.prototype.getCompletionsForRuleSet = function(e, t) {
      var i = e.getDeclarations(), n = i && i.endsWith("}") && this.offset >= i.end;
      if (n)
        return this.getCompletionForTopLevel(t);
      var s = !i || this.offset <= i.offset;
      return s ? this.getCompletionsForSelector(e, e.isNested(), t) : this.getCompletionsForDeclarations(e.getDeclarations(), t);
    }, r.prototype.getCompletionsForSelector = function(e, t, i) {
      var n = this, s = this.findInNodePath(f.PseudoSelector, f.IdentifierSelector, f.ClassSelector, f.ElementNameSelector);
      !s && this.hasCharacterAtPosition(this.offset - this.currentWord.length - 1, ":") && (this.currentWord = ":" + this.currentWord, this.hasCharacterAtPosition(this.offset - this.currentWord.length - 1, ":") && (this.currentWord = ":" + this.currentWord), this.defaultReplaceRange = W.create(re.create(this.position.line, this.position.character - this.currentWord.length), this.position));
      var a = this.cssDataManager.getPseudoClasses();
      a.forEach(function(_) {
        var M = Be(_.name), B = {
          label: _.name,
          textEdit: I.replace(n.getCompletionRange(s), M),
          documentation: $e(_, n.doesSupportMarkdown()),
          tags: Ve(_) ? [Ce.Deprecated] : [],
          kind: P.Function,
          insertTextFormat: _.name !== M ? de : void 0
        };
        J(_.name, ":-") && (B.sortText = oe.VendorPrefixed), i.items.push(B);
      });
      var o = this.cssDataManager.getPseudoElements();
      if (o.forEach(function(_) {
        var M = Be(_.name), B = {
          label: _.name,
          textEdit: I.replace(n.getCompletionRange(s), M),
          documentation: $e(_, n.doesSupportMarkdown()),
          tags: Ve(_) ? [Ce.Deprecated] : [],
          kind: P.Function,
          insertTextFormat: _.name !== M ? de : void 0
        };
        J(_.name, "::-") && (B.sortText = oe.VendorPrefixed), i.items.push(B);
      }), !t) {
        for (var l = 0, c = _s; l < c.length; l++) {
          var h = c[l];
          i.items.push({
            label: h,
            textEdit: I.replace(this.getCompletionRange(s), h),
            kind: P.Keyword
          });
        }
        for (var p = 0, y = Ps; p < y.length; p++) {
          var h = y[p];
          i.items.push({
            label: h,
            textEdit: I.replace(this.getCompletionRange(s), h),
            kind: P.Keyword
          });
        }
      }
      var g = {};
      g[this.currentWord] = !0;
      var b = this.textDocument.getText();
      if (this.styleSheet.accept(function(_) {
        if (_.type === f.SimpleSelector && _.length > 0) {
          var M = b.substr(_.offset, _.length);
          return M.charAt(0) === "." && !g[M] && (g[M] = !0, i.items.push({
            label: M,
            textEdit: I.replace(n.getCompletionRange(s), M),
            kind: P.Keyword
          })), !1;
        }
        return !0;
      }), e && e.isNested()) {
        var E = e.getSelectors().findFirstChildBeforeOffset(this.offset);
        E && e.getSelectors().getChildren().indexOf(E) === 0 && this.getPropertyProposals(null, i);
      }
      return i;
    }, r.prototype.getCompletionsForDeclarations = function(e, t) {
      if (!e || this.offset === e.offset)
        return t;
      var i = e.findFirstChildBeforeOffset(this.offset);
      if (!i)
        return this.getCompletionsForDeclarationProperty(null, t);
      if (i instanceof ir) {
        var n = i;
        if (!ae(n.colonPosition) || this.offset <= n.colonPosition)
          return this.getCompletionsForDeclarationProperty(n, t);
        if (ae(n.semicolonPosition) && n.semicolonPosition < this.offset)
          return this.offset === n.semicolonPosition + 1 ? t : this.getCompletionsForDeclarationProperty(null, t);
        if (n instanceof Ie)
          return this.getCompletionsForDeclarationValue(n, t);
      } else
        i instanceof Te ? this.getCompletionsForExtendsReference(i, null, t) : this.currentWord && this.currentWord[0] === "@" ? this.getCompletionsForDeclarationProperty(null, t) : i instanceof ut && this.getCompletionsForDeclarationProperty(null, t);
      return t;
    }, r.prototype.getCompletionsForVariableDeclaration = function(e, t) {
      return this.offset && ae(e.colonPosition) && this.offset > e.colonPosition && this.getVariableProposals(e.getValue(), t), t;
    }, r.prototype.getCompletionsForExpression = function(e, t) {
      var i = e.getParent();
      if (i instanceof De)
        return this.getCompletionsForFunctionArgument(i, i.getParent(), t), t;
      var n = e.findParent(f.Declaration);
      if (!n)
        return this.getTermProposals(void 0, null, t), t;
      var s = e.findChildAtOffset(this.offset, !0);
      return s ? s instanceof or || s instanceof se ? this.getCompletionsForDeclarationValue(n, t) : t : this.getCompletionsForDeclarationValue(n, t);
    }, r.prototype.getCompletionsForFunctionArgument = function(e, t, i) {
      var n = t.getIdentifier();
      return n && n.matches("var") && (!t.getArguments().hasChildren() || t.getArguments().getChild(0) === e) && this.getVariableProposalsForCSSVarFunction(i), i;
    }, r.prototype.getCompletionsForFunctionDeclaration = function(e, t) {
      var i = e.getDeclarations();
      return i && this.offset > i.offset && this.offset < i.end && this.getTermProposals(void 0, null, t), t;
    }, r.prototype.getCompletionsForMixinReference = function(e, t) {
      for (var i = this, n = this.getSymbolContext().findSymbolsAtOffset(this.offset, D.Mixin), s = 0, a = n; s < a.length; s++) {
        var o = a[s];
        o.node instanceof Ke && t.items.push(this.makeTermProposal(o, o.node.getParameters(), null));
      }
      var l = e.getIdentifier() || null;
      return this.completionParticipants.forEach(function(c) {
        c.onCssMixinReference && c.onCssMixinReference({
          mixinName: i.currentWord,
          range: i.getCompletionRange(l)
        });
      }), t;
    }, r.prototype.getTermProposals = function(e, t, i) {
      for (var n = this.getSymbolContext().findSymbolsAtOffset(this.offset, D.Function), s = 0, a = n; s < a.length; s++) {
        var o = a[s];
        o.node instanceof lt && i.items.push(this.makeTermProposal(o, o.node.getParameters(), t));
      }
      return i;
    }, r.prototype.makeTermProposal = function(e, t, i) {
      e.node;
      var n = t.getChildren().map(function(a) {
        return a instanceof Ct ? a.getName() : a.getText();
      }), s = e.name + "(" + n.map(function(a, o) {
        return "${" + (o + 1) + ":" + a + "}";
      }).join(", ") + ")";
      return {
        label: e.name,
        detail: e.name + "(" + n.join(", ") + ")",
        textEdit: I.replace(this.getCompletionRange(i), s),
        insertTextFormat: de,
        kind: P.Function,
        sortText: oe.Term
      };
    }, r.prototype.getCompletionsForSupportsCondition = function(e, t) {
      var i = e.findFirstChildBeforeOffset(this.offset);
      if (i) {
        if (i instanceof Ie)
          return !ae(i.colonPosition) || this.offset <= i.colonPosition ? this.getCompletionsForDeclarationProperty(i, t) : this.getCompletionsForDeclarationValue(i, t);
        if (i instanceof We)
          return this.getCompletionsForSupportsCondition(i, t);
      }
      return ae(e.lParent) && this.offset > e.lParent && (!ae(e.rParent) || this.offset <= e.rParent) ? this.getCompletionsForDeclarationProperty(null, t) : t;
    }, r.prototype.getCompletionsForSupports = function(e, t) {
      var i = e.getDeclarations(), n = !i || this.offset <= i.offset;
      if (n) {
        var s = e.findFirstChildBeforeOffset(this.offset);
        return s instanceof We ? this.getCompletionsForSupportsCondition(s, t) : t;
      }
      return this.getCompletionForTopLevel(t);
    }, r.prototype.getCompletionsForExtendsReference = function(e, t, i) {
      return i;
    }, r.prototype.getCompletionForUriLiteralValue = function(e, t) {
      var i, n, s;
      if (e.hasChildren()) {
        var o = e.getChild(0);
        i = o.getText(), n = this.position, s = this.getCompletionRange(o);
      } else {
        i = "", n = this.position;
        var a = this.textDocument.positionAt(e.offset + 4);
        s = W.create(a, a);
      }
      return this.completionParticipants.forEach(function(l) {
        l.onCssURILiteralValue && l.onCssURILiteralValue({
          uriValue: i,
          position: n,
          range: s
        });
      }), t;
    }, r.prototype.getCompletionForImportPath = function(e, t) {
      var i = this;
      return this.completionParticipants.forEach(function(n) {
        n.onCssImportPath && n.onCssImportPath({
          pathValue: e.getText(),
          position: i.position,
          range: i.getCompletionRange(e)
        });
      }), t;
    }, r.prototype.hasCharacterAtPosition = function(e, t) {
      var i = this.textDocument.getText();
      return e >= 0 && e < i.length && i.charAt(e) === t;
    }, r.prototype.doesSupportMarkdown = function() {
      var e, t, i;
      if (!ae(this.supportsMarkdown)) {
        if (!ae(this.lsOptions.clientCapabilities))
          return this.supportsMarkdown = !0, this.supportsMarkdown;
        var n = (i = (t = (e = this.lsOptions.clientCapabilities.textDocument) === null || e === void 0 ? void 0 : e.completion) === null || t === void 0 ? void 0 : t.completionItem) === null || i === void 0 ? void 0 : i.documentationFormat;
        this.supportsMarkdown = Array.isArray(n) && n.indexOf(ue.Markdown) !== -1;
      }
      return this.supportsMarkdown;
    }, r;
  }()
);
function Ve(r) {
  return !!(r.status && (r.status === "nonstandard" || r.status === "obsolete"));
}
var Yi = (
  /** @class */
  function() {
    function r() {
      this.entries = {};
    }
    return r.prototype.add = function(e) {
      this.entries[e] = !0;
    }, r.prototype.getEntries = function() {
      return Object.keys(this.entries);
    }, r;
  }()
);
function Be(r) {
  return r.replace(/\(\)$/, "($1)");
}
function Ts(r, e) {
  var t = e.getFullPropertyName(), i = new Yi();
  function n(o) {
    return (o instanceof se || o instanceof or || o instanceof ar) && i.add(o.getText()), !0;
  }
  function s(o) {
    var l = o.getFullPropertyName();
    return t === l;
  }
  function a(o) {
    if (o instanceof Ie && o !== e && s(o)) {
      var l = o.getValue();
      l && l.accept(n);
    }
    return !0;
  }
  return r.accept(a), i;
}
var Ks = (
  /** @class */
  function() {
    function r(e, t) {
      this.entries = e, this.currentOffset = t;
    }
    return r.prototype.visitNode = function(e) {
      return (e instanceof ar || e instanceof Je && ms(e)) && (this.currentOffset < e.offset || e.end < this.currentOffset) && this.entries.add(e.getText()), !0;
    }, r;
  }()
);
function zs(r, e) {
  for (var t = e - 1, i = r.getText(); t >= 0 && ` 	
\r":{[()]},*>+`.indexOf(i.charAt(t)) === -1; )
    t--;
  return i.substring(t + 1, e);
}
function ki(r) {
  return r.toLowerCase() in ft || /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(r);
}
var en = globalThis && globalThis.__extends || function() {
  var r = function(e, t) {
    return r = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(i, n) {
      i.__proto__ = n;
    } || function(i, n) {
      for (var s in n)
        Object.prototype.hasOwnProperty.call(n, s) && (i[s] = n[s]);
    }, r(e, t);
  };
  return function(e, t) {
    if (typeof t != "function" && t !== null)
      throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
    r(e, t);
    function i() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (i.prototype = t.prototype, new i());
  };
}(), tn = (
  /** @class */
  function() {
    function r() {
      this.parent = null, this.children = null, this.attributes = null;
    }
    return r.prototype.findAttribute = function(e) {
      if (this.attributes)
        for (var t = 0, i = this.attributes; t < i.length; t++) {
          var n = i[t];
          if (n.name === e)
            return n.value;
        }
      return null;
    }, r.prototype.addChild = function(e) {
      e instanceof r && (e.parent = this), this.children || (this.children = []), this.children.push(e);
    }, r.prototype.append = function(e) {
      if (this.attributes) {
        var t = this.attributes[this.attributes.length - 1];
        t.value = t.value + e;
      }
    }, r.prototype.prepend = function(e) {
      if (this.attributes) {
        var t = this.attributes[0];
        t.value = e + t.value;
      }
    }, r.prototype.findRoot = function() {
      for (var e = this; e.parent && !(e.parent instanceof wi); )
        e = e.parent;
      return e;
    }, r.prototype.removeChild = function(e) {
      if (this.children) {
        var t = this.children.indexOf(e);
        if (t !== -1)
          return this.children.splice(t, 1), !0;
      }
      return !1;
    }, r.prototype.addAttr = function(e, t) {
      this.attributes || (this.attributes = []);
      for (var i = 0, n = this.attributes; i < n.length; i++) {
        var s = n[i];
        if (s.name === e) {
          s.value += " " + t;
          return;
        }
      }
      this.attributes.push({ name: e, value: t });
    }, r.prototype.clone = function(e) {
      e === void 0 && (e = !0);
      var t = new r();
      if (this.attributes) {
        t.attributes = [];
        for (var i = 0, n = this.attributes; i < n.length; i++) {
          var s = n[i];
          t.addAttr(s.name, s.value);
        }
      }
      if (e && this.children) {
        t.children = [];
        for (var a = 0; a < this.children.length; a++)
          t.addChild(this.children[a].clone());
      }
      return t;
    }, r.prototype.cloneWithParent = function() {
      var e = this.clone(!1);
      if (this.parent && !(this.parent instanceof wi)) {
        var t = this.parent.cloneWithParent();
        t.addChild(e);
      }
      return e;
    }, r;
  }()
), wi = (
  /** @class */
  function(r) {
    en(e, r);
    function e() {
      return r !== null && r.apply(this, arguments) || this;
    }
    return e;
  }(tn)
);
(function(r) {
  en(e, r);
  function e(t) {
    var i = r.call(this) || this;
    return i.addAttr("name", t), i;
  }
  return e;
})(tn);
var _i;
(function(r) {
  function e(i, n) {
    return n + t(i) + n;
  }
  r.ensure = e;
  function t(i) {
    var n = i.match(/^['"](.*)["']$/);
    return n ? n[1] : i;
  }
  r.remove = t;
})(_i || (_i = {}));
var at = globalThis && globalThis.__awaiter || function(r, e, t, i) {
  function n(s) {
    return s instanceof t ? s : new t(function(a) {
      a(s);
    });
  }
  return new (t || (t = Promise))(function(s, a) {
    function o(h) {
      try {
        c(i.next(h));
      } catch (p) {
        a(p);
      }
    }
    function l(h) {
      try {
        c(i.throw(h));
      } catch (p) {
        a(p);
      }
    }
    function c(h) {
      h.done ? s(h.value) : n(h.value).then(o, l);
    }
    c((i = i.apply(r, e || [])).next());
  });
}, ot = globalThis && globalThis.__generator || function(r, e) {
  var t = { label: 0, sent: function() {
    if (s[0] & 1)
      throw s[1];
    return s[1];
  }, trys: [], ops: [] }, i, n, s, a;
  return a = { next: o(0), throw: o(1), return: o(2) }, typeof Symbol == "function" && (a[Symbol.iterator] = function() {
    return this;
  }), a;
  function o(c) {
    return function(h) {
      return l([c, h]);
    };
  }
  function l(c) {
    if (i)
      throw new TypeError("Generator is already executing.");
    for (; t; )
      try {
        if (i = 1, n && (s = c[0] & 2 ? n.return : c[0] ? n.throw || ((s = n.return) && s.call(n), 0) : n.next) && !(s = s.call(n, c[1])).done)
          return s;
        switch (n = 0, s && (c = [c[0] & 2, s.value]), c[0]) {
          case 0:
          case 1:
            s = c;
            break;
          case 4:
            return t.label++, { value: c[1], done: !1 };
          case 5:
            t.label++, n = c[1], c = [0];
            continue;
          case 7:
            c = t.ops.pop(), t.trys.pop();
            continue;
          default:
            if (s = t.trys, !(s = s.length > 0 && s[s.length - 1]) && (c[0] === 6 || c[0] === 2)) {
              t = 0;
              continue;
            }
            if (c[0] === 3 && (!s || c[1] > s[0] && c[1] < s[3])) {
              t.label = c[1];
              break;
            }
            if (c[0] === 6 && t.label < s[1]) {
              t.label = s[1], s = c;
              break;
            }
            if (s && t.label < s[2]) {
              t.label = s[2], t.ops.push(c);
              break;
            }
            s[2] && t.ops.pop(), t.trys.pop();
            continue;
        }
        c = e.call(r, t);
      } catch (h) {
        c = [6, h], n = 0;
      } finally {
        i = s = 0;
      }
    if (c[0] & 5)
      throw c[1];
    return { value: c[0] ? c[1] : void 0, done: !0 };
  }
}, Pi = ge(), qs = (
  /** @class */
  function() {
    function r(e) {
      this.fileSystemProvider = e;
    }
    return r.prototype.findDefinition = function(e, t, i) {
      var n = new Kt(i), s = e.offsetAt(t), a = Wt(i, s);
      if (!a)
        return null;
      var o = n.findSymbolFromNode(a);
      return o ? {
        uri: e.uri,
        range: be(o.node, e)
      } : null;
    }, r.prototype.findReferences = function(e, t, i) {
      var n = this.findDocumentHighlights(e, t, i);
      return n.map(function(s) {
        return {
          uri: e.uri,
          range: s.range
        };
      });
    }, r.prototype.findDocumentHighlights = function(e, t, i) {
      var n = [], s = e.offsetAt(t), a = Wt(i, s);
      if (!a || a.type === f.Stylesheet || a.type === f.Declarations)
        return n;
      a.type === f.Identifier && a.parent && a.parent.type === f.ClassSelector && (a = a.parent);
      var o = new Kt(i), l = o.findSymbolFromNode(a), c = a.getText();
      return i.accept(function(h) {
        if (l) {
          if (o.matchesSymbol(h, l))
            return n.push({
              kind: Si(h),
              range: be(h, e)
            }), !1;
        } else
          a && a.type === h.type && h.matches(c) && n.push({
            kind: Si(h),
            range: be(h, e)
          });
        return !0;
      }), n;
    }, r.prototype.isRawStringDocumentLinkNode = function(e) {
      return e.type === f.Import;
    }, r.prototype.findDocumentLinks = function(e, t, i) {
      for (var n = this.findUnresolvedLinks(e, t), s = [], a = 0, o = n; a < o.length; a++) {
        var l = o[a], c = l.link, h = c.target;
        if (h && !/^\w+:\/\//g.test(h)) {
          var p = i.resolveReference(h, e.uri);
          p && (c.target = p);
        }
        s.push(c);
      }
      return s;
    }, r.prototype.findDocumentLinks2 = function(e, t, i) {
      return at(this, void 0, void 0, function() {
        var n, s, a, o, l, c, h, p;
        return ot(this, function(y) {
          switch (y.label) {
            case 0:
              n = this.findUnresolvedLinks(e, t), s = [], a = 0, o = n, y.label = 1;
            case 1:
              return a < o.length ? (l = o[a], c = l.link, h = c.target, h && !/^\w+:\/\//g.test(h) ? [4, this.resolveRelativeReference(h, e.uri, i, l.isRawLink)] : [3, 3]) : [3, 5];
            case 2:
              return p = y.sent(), p !== void 0 && (c.target = p, s.push(c)), [3, 4];
            case 3:
              s.push(c), y.label = 4;
            case 4:
              return a++, [3, 1];
            case 5:
              return [2, s];
          }
        });
      });
    }, r.prototype.findUnresolvedLinks = function(e, t) {
      var i = this, n = [], s = function(a) {
        var o = a.getText(), l = be(a, e);
        if (!(l.start.line === l.end.line && l.start.character === l.end.character)) {
          (J(o, "'") || J(o, '"')) && (o = o.slice(1, -1));
          var c = a.parent ? i.isRawStringDocumentLinkNode(a.parent) : !1;
          n.push({ link: { target: o, range: l }, isRawLink: c });
        }
      };
      return t.accept(function(a) {
        if (a.type === f.URILiteral) {
          var o = a.getChild(0);
          return o && s(o), !1;
        }
        if (a.parent && i.isRawStringDocumentLinkNode(a.parent)) {
          var l = a.getText();
          return (J(l, "'") || J(l, '"')) && s(a), !1;
        }
        return !0;
      }), n;
    }, r.prototype.findDocumentSymbols = function(e, t) {
      var i = [];
      return t.accept(function(n) {
        var s = {
          name: null,
          kind: j.Class,
          location: null
        }, a = n;
        if (n instanceof bt)
          return s.name = n.getText(), a = n.findAParent(f.Ruleset, f.ExtendsReference), a && (s.location = ze.create(e.uri, be(a, e)), i.push(s)), !1;
        if (n instanceof xt)
          s.name = n.getName(), s.kind = j.Variable;
        else if (n instanceof Ke)
          s.name = n.getName(), s.kind = j.Method;
        else if (n instanceof lt)
          s.name = n.getName(), s.kind = j.Function;
        else if (n instanceof Ui)
          s.name = Pi("literal.keyframes", "@keyframes {0}", n.getName());
        else if (n instanceof ji)
          s.name = Pi("literal.fontface", "@font-face");
        else if (n instanceof Ti) {
          var o = n.getChild(0);
          o instanceof Ki && (s.name = "@media " + o.getText(), s.kind = j.Module);
        }
        return s.name && (s.location = ze.create(e.uri, be(a, e)), i.push(s)), !0;
      }), i;
    }, r.prototype.findDocumentColors = function(e, t) {
      var i = [];
      return t.accept(function(n) {
        var s = Ns(n, e);
        return s && i.push(s), !0;
      }), i;
    }, r.prototype.getColorPresentations = function(e, t, i, n) {
      var s = [], a = Math.round(i.red * 255), o = Math.round(i.green * 255), l = Math.round(i.blue * 255), c;
      i.alpha === 1 ? c = "rgb(" + a + ", " + o + ", " + l + ")" : c = "rgba(" + a + ", " + o + ", " + l + ", " + i.alpha + ")", s.push({ label: c, textEdit: I.replace(n, c) }), i.alpha === 1 ? c = "#" + ye(a) + ye(o) + ye(l) : c = "#" + ye(a) + ye(o) + ye(l) + ye(Math.round(i.alpha * 255)), s.push({ label: c, textEdit: I.replace(n, c) });
      var h = Cs(i);
      return h.a === 1 ? c = "hsl(" + h.h + ", " + Math.round(h.s * 100) + "%, " + Math.round(h.l * 100) + "%)" : c = "hsla(" + h.h + ", " + Math.round(h.s * 100) + "%, " + Math.round(h.l * 100) + "%, " + h.a + ")", s.push({ label: c, textEdit: I.replace(n, c) }), s;
    }, r.prototype.doRename = function(e, t, i, n) {
      var s, a = this.findDocumentHighlights(e, t, n), o = a.map(function(l) {
        return I.replace(l.range, i);
      });
      return {
        changes: (s = {}, s[e.uri] = o, s)
      };
    }, r.prototype.resolveRelativeReference = function(e, t, i, n) {
      return at(this, void 0, void 0, function() {
        var s, a, o, l, c;
        return ot(this, function(h) {
          switch (h.label) {
            case 0:
              return e[0] === "~" && e[1] !== "/" && this.fileSystemProvider ? (e = e.substring(1), J(t, "file://") ? (s = Hs(e), a = i.resolveReference("/", t), o = Ft(t), [4, this.resolvePathToModule(s, o, a)]) : [3, 2]) : [3, 3];
            case 1:
              if (l = h.sent(), l)
                return c = e.substring(s.length + 1), [2, Jt(l, c)];
              h.label = 2;
            case 2:
              return [2, i.resolveReference(e, t)];
            case 3:
              return [2, i.resolveReference(e, t)];
          }
        });
      });
    }, r.prototype.resolvePathToModule = function(e, t, i) {
      return at(this, void 0, void 0, function() {
        var n;
        return ot(this, function(s) {
          switch (s.label) {
            case 0:
              return n = Jt(t, "node_modules", e, "package.json"), [4, this.fileExists(n)];
            case 1:
              return s.sent() ? [2, Ft(n)] : i && t.startsWith(i) && t.length !== i.length ? [2, this.resolvePathToModule(e, Ft(t), i)] : [2, void 0];
          }
        });
      });
    }, r.prototype.fileExists = function(e) {
      return at(this, void 0, void 0, function() {
        var t;
        return ot(this, function(i) {
          switch (i.label) {
            case 0:
              if (!this.fileSystemProvider)
                return [2, !1];
              i.label = 1;
            case 1:
              return i.trys.push([1, 3, , 4]), [4, this.fileSystemProvider.stat(e)];
            case 2:
              return t = i.sent(), t.type === Qe.Unknown && t.size === -1 ? [2, !1] : [2, !0];
            case 3:
              return i.sent(), [2, !1];
            case 4:
              return [
                2
                /*return*/
              ];
          }
        });
      });
    }, r;
  }()
);
function Ns(r, e) {
  var t = xs(r);
  if (t) {
    var i = be(r, e);
    return { color: t, range: i };
  }
  return null;
}
function be(r, e) {
  return W.create(e.positionAt(r.offset), e.positionAt(r.end));
}
function Si(r) {
  if (r.type === f.Selector || r instanceof se && r.parent && r.parent instanceof nr && r.isCustomProperty)
    return fe.Write;
  if (r.parent)
    switch (r.parent.type) {
      case f.FunctionDeclaration:
      case f.MixinDeclaration:
      case f.Keyframe:
      case f.VariableDeclaration:
      case f.FunctionParameter:
        return fe.Write;
    }
  return fe.Read;
}
function ye(r) {
  var e = r.toString(16);
  return e.length !== 2 ? "0" + e : e;
}
function Hs(r) {
  return r[0] === "@" ? r.substring(0, r.indexOf("/", r.indexOf("/") + 1)) : r.substring(0, r.indexOf("/"));
}
var z = ge(), Ee = Fe.Warning, Ei = Fe.Error, ne = Fe.Ignore, G = (
  /** @class */
  function() {
    function r(e, t, i) {
      this.id = e, this.message = t, this.defaultValue = i;
    }
    return r;
  }()
), Gs = (
  /** @class */
  function() {
    function r(e, t, i) {
      this.id = e, this.message = t, this.defaultValue = i;
    }
    return r;
  }()
);
new G("compatibleVendorPrefixes", z("rule.vendorprefixes.all", "When using a vendor-specific prefix make sure to also include all other vendor-specific properties"), ne), new G("vendorPrefix", z("rule.standardvendorprefix.all", "When using a vendor-specific prefix also include the standard property"), Ee), new G("duplicateProperties", z("rule.duplicateDeclarations", "Do not use duplicate style definitions"), ne), new G("emptyRules", z("rule.emptyRuleSets", "Do not use empty rulesets"), Ee), new G("importStatement", z("rule.importDirective", "Import statements do not load in parallel"), ne), new G("boxModel", z("rule.bewareOfBoxModelSize", "Do not use width or height when using padding or border"), ne), new G("universalSelector", z("rule.universalSelector", "The universal selector (*) is known to be slow"), ne), new G("zeroUnits", z("rule.zeroWidthUnit", "No unit for zero needed"), ne), new G("fontFaceProperties", z("rule.fontFaceProperties", "@font-face rule must define 'src' and 'font-family' properties"), Ee), new G("hexColorLength", z("rule.hexColor", "Hex colors must consist of three, four, six or eight hex numbers"), Ei), new G("argumentsInColorFunction", z("rule.colorFunction", "Invalid number of parameters"), Ei), new G("unknownProperties", z("rule.unknownProperty", "Unknown property."), Ee), new G("unknownAtRules", z("rule.unknownAtRules", "Unknown at-rule."), Ee), new G("ieHack", z("rule.ieHack", "IE hacks are only necessary when supporting IE7 and older"), ne), new G("unknownVendorSpecificProperties", z("rule.unknownVendorSpecificProperty", "Unknown vendor specific property."), ne), new G("propertyIgnoredDueToDisplay", z("rule.propertyIgnoredDueToDisplay", "Property is ignored due to the display."), Ee), new G("important", z("rule.avoidImportant", "Avoid using !important. It is an indication that the specificity of the entire CSS has gotten out of control and needs to be refactored."), ne), new G("float", z("rule.avoidFloat", "Avoid using 'float'. Floats lead to fragile CSS that is easy to break if one aspect of the layout changes."), ne), new G("idSelector", z("rule.avoidIdSelector", "Selectors should not contain IDs because these rules are too tightly coupled with the HTML."), ne);
new Gs("validProperties", z("rule.validProperties", "A list of properties that are not validated against the `unknownProperties` rule."), []);
var Qs = globalThis && globalThis.__extends || function() {
  var r = function(e, t) {
    return r = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(i, n) {
      i.__proto__ = n;
    } || function(i, n) {
      for (var s in n)
        Object.prototype.hasOwnProperty.call(n, s) && (i[s] = n[s]);
    }, r(e, t);
  };
  return function(e, t) {
    if (typeof t != "function" && t !== null)
      throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
    r(e, t);
    function i() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (i.prototype = t.prototype, new i());
  };
}(), Ri = "/".charCodeAt(0), Js = `
`.charCodeAt(0), Xs = "\r".charCodeAt(0), Zs = "\f".charCodeAt(0), Ys = "$".charCodeAt(0), ea = "#".charCodeAt(0), ta = "{".charCodeAt(0), je = "=".charCodeAt(0), ra = "!".charCodeAt(0), ia = "<".charCodeAt(0), na = ">".charCodeAt(0), Ot = ".".charCodeAt(0), pe = u.CustomToken, Xt = pe++, Zt = pe++;
pe++;
var rn = pe++, nn = pe++, sn = pe++, an = pe++, ct = pe++;
pe++;
var sa = (
  /** @class */
  function(r) {
    Qs(e, r);
    function e() {
      return r !== null && r.apply(this, arguments) || this;
    }
    return e.prototype.scanNext = function(t) {
      if (this.stream.advanceIfChar(Ys)) {
        var i = ["$"];
        if (this.ident(i))
          return this.finishToken(t, Xt, i.join(""));
        this.stream.goBackTo(t);
      }
      return this.stream.advanceIfChars([ea, ta]) ? this.finishToken(t, Zt) : this.stream.advanceIfChars([je, je]) ? this.finishToken(t, rn) : this.stream.advanceIfChars([ra, je]) ? this.finishToken(t, nn) : this.stream.advanceIfChar(ia) ? this.stream.advanceIfChar(je) ? this.finishToken(t, an) : this.finishToken(t, u.Delim) : this.stream.advanceIfChar(na) ? this.stream.advanceIfChar(je) ? this.finishToken(t, sn) : this.finishToken(t, u.Delim) : this.stream.advanceIfChars([Ot, Ot, Ot]) ? this.finishToken(t, ct) : r.prototype.scanNext.call(this, t);
    }, e.prototype.comment = function() {
      return r.prototype.comment.call(this) ? !0 : !this.inURL && this.stream.advanceIfChars([Ri, Ri]) ? (this.stream.advanceWhileChar(function(t) {
        switch (t) {
          case Js:
          case Xs:
          case Zs:
            return !1;
          default:
            return !0;
        }
      }), !0) : !1;
    }, e;
  }(tr)
), Lt = ge(), $t = (
  /** @class */
  function() {
    function r(e, t) {
      this.id = e, this.message = t;
    }
    return r;
  }()
), Vt = {
  FromExpected: new $t("scss-fromexpected", Lt("expected.from", "'from' expected")),
  ThroughOrToExpected: new $t("scss-throughexpected", Lt("expected.through", "'through' or 'to' expected")),
  InExpected: new $t("scss-fromexpected", Lt("expected.in", "'in' expected"))
}, aa = globalThis && globalThis.__extends || function() {
  var r = function(e, t) {
    return r = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(i, n) {
      i.__proto__ = n;
    } || function(i, n) {
      for (var s in n)
        Object.prototype.hasOwnProperty.call(n, s) && (i[s] = n[s]);
    }, r(e, t);
  };
  return function(e, t) {
    if (typeof t != "function" && t !== null)
      throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
    r(e, t);
    function i() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (i.prototype = t.prototype, new i());
  };
}();
(function(r) {
  aa(e, r);
  function e() {
    return r.call(this, new sa()) || this;
  }
  return e.prototype._parseStylesheetStatement = function(t) {
    return t === void 0 && (t = !1), this.peek(u.AtKeyword) ? this._parseWarnAndDebug() || this._parseControlStatement() || this._parseMixinDeclaration() || this._parseMixinContent() || this._parseMixinReference() || this._parseFunctionDeclaration() || this._parseForward() || this._parseUse() || this._parseRuleset(t) || r.prototype._parseStylesheetAtStatement.call(this, t) : this._parseRuleset(!0) || this._parseVariableDeclaration();
  }, e.prototype._parseImport = function() {
    if (!this.peekKeyword("@import"))
      return null;
    var t = this.create(sr);
    if (this.consumeToken(), !t.addChild(this._parseURILiteral()) && !t.addChild(this._parseStringLiteral()))
      return this.finish(t, d.URIOrStringExpected);
    for (; this.accept(u.Comma); )
      if (!t.addChild(this._parseURILiteral()) && !t.addChild(this._parseStringLiteral()))
        return this.finish(t, d.URIOrStringExpected);
    return !this.peek(u.SemiColon) && !this.peek(u.EOF) && t.setMedialist(this._parseMediaQueryList()), this.finish(t);
  }, e.prototype._parseVariableDeclaration = function(t) {
    if (t === void 0 && (t = []), !this.peek(Xt))
      return null;
    var i = this.create(xt);
    if (!i.setVariable(this._parseVariable()))
      return null;
    if (!this.accept(u.Colon))
      return this.finish(i, d.ColonExpected);
    if (this.prevToken && (i.colonPosition = this.prevToken.offset), !i.setValue(this._parseExpr()))
      return this.finish(i, d.VariableValueExpected, [], t);
    for (; this.peek(u.Exclamation); )
      if (!i.addChild(this._tryParsePrio())) {
        if (this.consumeToken(), !this.peekRegExp(u.Ident, /^(default|global)$/))
          return this.finish(i, d.UnknownKeyword);
        this.consumeToken();
      }
    return this.peek(u.SemiColon) && (i.semicolonPosition = this.token.offset), this.finish(i);
  }, e.prototype._parseMediaContentStart = function() {
    return this._parseInterpolation();
  }, e.prototype._parseMediaFeatureName = function() {
    return this._parseModuleMember() || this._parseFunction() || this._parseIdent() || this._parseVariable();
  }, e.prototype._parseKeyframeSelector = function() {
    return this._tryParseKeyframeSelector() || this._parseControlStatement(this._parseKeyframeSelector.bind(this)) || this._parseVariableDeclaration() || this._parseMixinContent();
  }, e.prototype._parseVariable = function() {
    if (!this.peek(Xt))
      return null;
    var t = this.create(ur);
    return this.consumeToken(), t;
  }, e.prototype._parseModuleMember = function() {
    var t = this.mark(), i = this.create(Sr);
    return i.setIdentifier(this._parseIdent([D.Module])) ? this.hasWhitespace() || !this.acceptDelim(".") || this.hasWhitespace() ? (this.restoreAtMark(t), null) : i.addChild(this._parseVariable() || this._parseFunction()) ? i : this.finish(i, d.IdentifierOrVariableExpected) : null;
  }, e.prototype._parseIdent = function(t) {
    var i = this;
    if (!this.peek(u.Ident) && !this.peek(Zt) && !this.peekDelim("-"))
      return null;
    var n = this.create(se);
    n.referenceTypes = t, n.isCustomProperty = this.peekRegExp(u.Ident, /^--/);
    for (var s = !1, a = function() {
      var o = i.mark();
      return i.acceptDelim("-") && (i.hasWhitespace() || i.acceptDelim("-"), i.hasWhitespace()) ? (i.restoreAtMark(o), null) : i._parseInterpolation();
    }; (this.accept(u.Ident) || n.addChild(a()) || s && this.acceptRegexp(/^[\w-]/)) && (s = !0, !this.hasWhitespace()); )
      ;
    return s ? this.finish(n) : null;
  }, e.prototype._parseTermExpression = function() {
    return this._parseModuleMember() || this._parseVariable() || this._parseSelectorCombinator() || //this._tryParsePrio() ||
    r.prototype._parseTermExpression.call(this);
  }, e.prototype._parseInterpolation = function() {
    if (this.peek(Zt)) {
      var t = this.create(Tt);
      return this.consumeToken(), !t.addChild(this._parseExpr()) && !this._parseSelectorCombinator() ? this.accept(u.CurlyR) ? this.finish(t) : this.finish(t, d.ExpressionExpected) : this.accept(u.CurlyR) ? this.finish(t) : this.finish(t, d.RightCurlyExpected);
    }
    return null;
  }, e.prototype._parseOperator = function() {
    if (this.peek(rn) || this.peek(nn) || this.peek(sn) || this.peek(an) || this.peekDelim(">") || this.peekDelim("<") || this.peekIdent("and") || this.peekIdent("or") || this.peekDelim("%")) {
      var t = this.createNode(f.Operator);
      return this.consumeToken(), this.finish(t);
    }
    return r.prototype._parseOperator.call(this);
  }, e.prototype._parseUnaryOperator = function() {
    if (this.peekIdent("not")) {
      var t = this.create(R);
      return this.consumeToken(), this.finish(t);
    }
    return r.prototype._parseUnaryOperator.call(this);
  }, e.prototype._parseRuleSetDeclaration = function() {
    return this.peek(u.AtKeyword) ? this._parseKeyframe() || this._parseImport() || this._parseMedia(!0) || this._parseFontFace() || this._parseWarnAndDebug() || this._parseControlStatement() || this._parseFunctionDeclaration() || this._parseExtends() || this._parseMixinReference() || this._parseMixinContent() || this._parseMixinDeclaration() || this._parseRuleset(!0) || this._parseSupports(!0) || r.prototype._parseRuleSetDeclarationAtStatement.call(this) : this._parseVariableDeclaration() || this._tryParseRuleset(!0) || r.prototype._parseRuleSetDeclaration.call(this);
  }, e.prototype._parseDeclaration = function(t) {
    var i = this._tryParseCustomPropertyDeclaration(t);
    if (i)
      return i;
    var n = this.create(Ie);
    if (!n.setProperty(this._parseProperty()))
      return null;
    if (!this.accept(u.Colon))
      return this.finish(n, d.ColonExpected, [u.Colon], t || [u.SemiColon]);
    this.prevToken && (n.colonPosition = this.prevToken.offset);
    var s = !1;
    if (n.setValue(this._parseExpr()) && (s = !0, n.addChild(this._parsePrio())), this.peek(u.CurlyL))
      n.setNestedProperties(this._parseNestedProperties());
    else if (!s)
      return this.finish(n, d.PropertyValueExpected);
    return this.peek(u.SemiColon) && (n.semicolonPosition = this.token.offset), this.finish(n);
  }, e.prototype._parseNestedProperties = function() {
    var t = this.create(Wi);
    return this._parseBody(t, this._parseDeclaration.bind(this));
  }, e.prototype._parseExtends = function() {
    if (this.peekKeyword("@extend")) {
      var t = this.create(Te);
      if (this.consumeToken(), !t.getSelectors().addChild(this._parseSimpleSelector()))
        return this.finish(t, d.SelectorExpected);
      for (; this.accept(u.Comma); )
        t.getSelectors().addChild(this._parseSimpleSelector());
      return this.accept(u.Exclamation) && !this.acceptIdent("optional") ? this.finish(t, d.UnknownKeyword) : this.finish(t);
    }
    return null;
  }, e.prototype._parseSimpleSelectorBody = function() {
    return this._parseSelectorCombinator() || this._parseSelectorPlaceholder() || r.prototype._parseSimpleSelectorBody.call(this);
  }, e.prototype._parseSelectorCombinator = function() {
    if (this.peekDelim("&")) {
      var t = this.createNode(f.SelectorCombinator);
      for (this.consumeToken(); !this.hasWhitespace() && (this.acceptDelim("-") || this.accept(u.Num) || this.accept(u.Dimension) || t.addChild(this._parseIdent()) || this.acceptDelim("&")); )
        ;
      return this.finish(t);
    }
    return null;
  }, e.prototype._parseSelectorPlaceholder = function() {
    if (this.peekDelim("%")) {
      var t = this.createNode(f.SelectorPlaceholder);
      return this.consumeToken(), this._parseIdent(), this.finish(t);
    } else if (this.peekKeyword("@at-root")) {
      var t = this.createNode(f.SelectorPlaceholder);
      return this.consumeToken(), this.finish(t);
    }
    return null;
  }, e.prototype._parseElementName = function() {
    var t = this.mark(), i = r.prototype._parseElementName.call(this);
    return i && !this.hasWhitespace() && this.peek(u.ParenthesisL) ? (this.restoreAtMark(t), null) : i;
  }, e.prototype._tryParsePseudoIdentifier = function() {
    return this._parseInterpolation() || r.prototype._tryParsePseudoIdentifier.call(this);
  }, e.prototype._parseWarnAndDebug = function() {
    if (!this.peekKeyword("@debug") && !this.peekKeyword("@warn") && !this.peekKeyword("@error"))
      return null;
    var t = this.createNode(f.Debug);
    return this.consumeToken(), t.addChild(this._parseExpr()), this.finish(t);
  }, e.prototype._parseControlStatement = function(t) {
    return t === void 0 && (t = this._parseRuleSetDeclaration.bind(this)), this.peek(u.AtKeyword) ? this._parseIfStatement(t) || this._parseForStatement(t) || this._parseEachStatement(t) || this._parseWhileStatement(t) : null;
  }, e.prototype._parseIfStatement = function(t) {
    return this.peekKeyword("@if") ? this._internalParseIfStatement(t) : null;
  }, e.prototype._internalParseIfStatement = function(t) {
    var i = this.create($n);
    if (this.consumeToken(), !i.setExpression(this._parseExpr(!0)))
      return this.finish(i, d.ExpressionExpected);
    if (this._parseBody(i, t), this.acceptKeyword("@else")) {
      if (this.peekIdent("if"))
        i.setElseClause(this._internalParseIfStatement(t));
      else if (this.peek(u.CurlyL)) {
        var n = this.create(Wn);
        this._parseBody(n, t), i.setElseClause(n);
      }
    }
    return this.finish(i);
  }, e.prototype._parseForStatement = function(t) {
    if (!this.peekKeyword("@for"))
      return null;
    var i = this.create(Vn);
    return this.consumeToken(), i.setVariable(this._parseVariable()) ? this.acceptIdent("from") ? i.addChild(this._parseBinaryExpr()) ? !this.acceptIdent("to") && !this.acceptIdent("through") ? this.finish(i, Vt.ThroughOrToExpected, [u.CurlyR]) : i.addChild(this._parseBinaryExpr()) ? this._parseBody(i, t) : this.finish(i, d.ExpressionExpected, [u.CurlyR]) : this.finish(i, d.ExpressionExpected, [u.CurlyR]) : this.finish(i, Vt.FromExpected, [u.CurlyR]) : this.finish(i, d.VariableNameExpected, [u.CurlyR]);
  }, e.prototype._parseEachStatement = function(t) {
    if (!this.peekKeyword("@each"))
      return null;
    var i = this.create(Bn);
    this.consumeToken();
    var n = i.getVariables();
    if (!n.addChild(this._parseVariable()))
      return this.finish(i, d.VariableNameExpected, [u.CurlyR]);
    for (; this.accept(u.Comma); )
      if (!n.addChild(this._parseVariable()))
        return this.finish(i, d.VariableNameExpected, [u.CurlyR]);
    return this.finish(n), this.acceptIdent("in") ? i.addChild(this._parseExpr()) ? this._parseBody(i, t) : this.finish(i, d.ExpressionExpected, [u.CurlyR]) : this.finish(i, Vt.InExpected, [u.CurlyR]);
  }, e.prototype._parseWhileStatement = function(t) {
    if (!this.peekKeyword("@while"))
      return null;
    var i = this.create(jn);
    return this.consumeToken(), i.addChild(this._parseBinaryExpr()) ? this._parseBody(i, t) : this.finish(i, d.ExpressionExpected, [u.CurlyR]);
  }, e.prototype._parseFunctionBodyDeclaration = function() {
    return this._parseVariableDeclaration() || this._parseReturnStatement() || this._parseWarnAndDebug() || this._parseControlStatement(this._parseFunctionBodyDeclaration.bind(this));
  }, e.prototype._parseFunctionDeclaration = function() {
    if (!this.peekKeyword("@function"))
      return null;
    var t = this.create(lt);
    if (this.consumeToken(), !t.setIdentifier(this._parseIdent([D.Function])))
      return this.finish(t, d.IdentifierExpected, [u.CurlyR]);
    if (!this.accept(u.ParenthesisL))
      return this.finish(t, d.LeftParenthesisExpected, [u.CurlyR]);
    if (t.getParameters().addChild(this._parseParameterDeclaration())) {
      for (; this.accept(u.Comma) && !this.peek(u.ParenthesisR); )
        if (!t.getParameters().addChild(this._parseParameterDeclaration()))
          return this.finish(t, d.VariableNameExpected);
    }
    return this.accept(u.ParenthesisR) ? this._parseBody(t, this._parseFunctionBodyDeclaration.bind(this)) : this.finish(t, d.RightParenthesisExpected, [u.CurlyR]);
  }, e.prototype._parseReturnStatement = function() {
    if (!this.peekKeyword("@return"))
      return null;
    var t = this.createNode(f.ReturnStatement);
    return this.consumeToken(), t.addChild(this._parseExpr()) ? this.finish(t) : this.finish(t, d.ExpressionExpected);
  }, e.prototype._parseMixinDeclaration = function() {
    if (!this.peekKeyword("@mixin"))
      return null;
    var t = this.create(Ke);
    if (this.consumeToken(), !t.setIdentifier(this._parseIdent([D.Mixin])))
      return this.finish(t, d.IdentifierExpected, [u.CurlyR]);
    if (this.accept(u.ParenthesisL)) {
      if (t.getParameters().addChild(this._parseParameterDeclaration())) {
        for (; this.accept(u.Comma) && !this.peek(u.ParenthesisR); )
          if (!t.getParameters().addChild(this._parseParameterDeclaration()))
            return this.finish(t, d.VariableNameExpected);
      }
      if (!this.accept(u.ParenthesisR))
        return this.finish(t, d.RightParenthesisExpected, [u.CurlyR]);
    }
    return this._parseBody(t, this._parseRuleSetDeclaration.bind(this));
  }, e.prototype._parseParameterDeclaration = function() {
    var t = this.create(Ct);
    return t.setIdentifier(this._parseVariable()) ? (this.accept(ct), this.accept(u.Colon) && !t.setDefaultValue(this._parseExpr(!0)) ? this.finish(t, d.VariableValueExpected, [], [u.Comma, u.ParenthesisR]) : this.finish(t)) : null;
  }, e.prototype._parseMixinContent = function() {
    if (!this.peekKeyword("@content"))
      return null;
    var t = this.create(rs);
    if (this.consumeToken(), this.accept(u.ParenthesisL)) {
      if (t.getArguments().addChild(this._parseFunctionArgument())) {
        for (; this.accept(u.Comma) && !this.peek(u.ParenthesisR); )
          if (!t.getArguments().addChild(this._parseFunctionArgument()))
            return this.finish(t, d.ExpressionExpected);
      }
      if (!this.accept(u.ParenthesisR))
        return this.finish(t, d.RightParenthesisExpected);
    }
    return this.finish(t);
  }, e.prototype._parseMixinReference = function() {
    if (!this.peekKeyword("@include"))
      return null;
    var t = this.create(ht);
    this.consumeToken();
    var i = this._parseIdent([D.Mixin]);
    if (!t.setIdentifier(i))
      return this.finish(t, d.IdentifierExpected, [u.CurlyR]);
    if (!this.hasWhitespace() && this.acceptDelim(".") && !this.hasWhitespace()) {
      var n = this._parseIdent([D.Mixin]);
      if (!n)
        return this.finish(t, d.IdentifierExpected, [u.CurlyR]);
      var s = this.create(Sr);
      i.referenceTypes = [D.Module], s.setIdentifier(i), t.setIdentifier(n), t.addChild(s);
    }
    if (this.accept(u.ParenthesisL)) {
      if (t.getArguments().addChild(this._parseFunctionArgument())) {
        for (; this.accept(u.Comma) && !this.peek(u.ParenthesisR); )
          if (!t.getArguments().addChild(this._parseFunctionArgument()))
            return this.finish(t, d.ExpressionExpected);
      }
      if (!this.accept(u.ParenthesisR))
        return this.finish(t, d.RightParenthesisExpected);
    }
    return (this.peekIdent("using") || this.peek(u.CurlyL)) && t.setContent(this._parseMixinContentDeclaration()), this.finish(t);
  }, e.prototype._parseMixinContentDeclaration = function() {
    var t = this.create(is);
    if (this.acceptIdent("using")) {
      if (!this.accept(u.ParenthesisL))
        return this.finish(t, d.LeftParenthesisExpected, [u.CurlyL]);
      if (t.getParameters().addChild(this._parseParameterDeclaration())) {
        for (; this.accept(u.Comma) && !this.peek(u.ParenthesisR); )
          if (!t.getParameters().addChild(this._parseParameterDeclaration()))
            return this.finish(t, d.VariableNameExpected);
      }
      if (!this.accept(u.ParenthesisR))
        return this.finish(t, d.RightParenthesisExpected, [u.CurlyL]);
    }
    return this.peek(u.CurlyL) && this._parseBody(t, this._parseMixinReferenceBodyStatement.bind(this)), this.finish(t);
  }, e.prototype._parseMixinReferenceBodyStatement = function() {
    return this._tryParseKeyframeSelector() || this._parseRuleSetDeclaration();
  }, e.prototype._parseFunctionArgument = function() {
    var t = this.create(De), i = this.mark(), n = this._parseVariable();
    if (n)
      if (this.accept(u.Colon))
        t.setIdentifier(n);
      else {
        if (this.accept(ct))
          return t.setValue(n), this.finish(t);
        this.restoreAtMark(i);
      }
    return t.setValue(this._parseExpr(!0)) ? (this.accept(ct), t.addChild(this._parsePrio()), this.finish(t)) : t.setValue(this._tryParsePrio()) ? this.finish(t) : null;
  }, e.prototype._parseURLArgument = function() {
    var t = this.mark(), i = r.prototype._parseURLArgument.call(this);
    if (!i || !this.peek(u.ParenthesisR)) {
      this.restoreAtMark(t);
      var n = this.create(R);
      return n.addChild(this._parseBinaryExpr()), this.finish(n);
    }
    return i;
  }, e.prototype._parseOperation = function() {
    if (!this.peek(u.ParenthesisL))
      return null;
    var t = this.create(R);
    for (this.consumeToken(); t.addChild(this._parseListElement()); )
      this.accept(u.Comma);
    return this.accept(u.ParenthesisR) ? this.finish(t) : this.finish(t, d.RightParenthesisExpected);
  }, e.prototype._parseListElement = function() {
    var t = this.create(ss), i = this._parseBinaryExpr();
    if (!i)
      return null;
    if (this.accept(u.Colon)) {
      if (t.setKey(i), !t.setValue(this._parseBinaryExpr()))
        return this.finish(t, d.ExpressionExpected);
    } else
      t.setValue(i);
    return this.finish(t);
  }, e.prototype._parseUse = function() {
    if (!this.peekKeyword("@use"))
      return null;
    var t = this.create(Tn);
    if (this.consumeToken(), !t.addChild(this._parseStringLiteral()))
      return this.finish(t, d.StringLiteralExpected);
    if (!this.peek(u.SemiColon) && !this.peek(u.EOF)) {
      if (!this.peekRegExp(u.Ident, /as|with/))
        return this.finish(t, d.UnknownKeyword);
      if (this.acceptIdent("as") && !t.setIdentifier(this._parseIdent([D.Module])) && !this.acceptDelim("*"))
        return this.finish(t, d.IdentifierOrWildcardExpected);
      if (this.acceptIdent("with")) {
        if (!this.accept(u.ParenthesisL))
          return this.finish(t, d.LeftParenthesisExpected, [u.ParenthesisR]);
        if (!t.getParameters().addChild(this._parseModuleConfigDeclaration()))
          return this.finish(t, d.VariableNameExpected);
        for (; this.accept(u.Comma) && !this.peek(u.ParenthesisR); )
          if (!t.getParameters().addChild(this._parseModuleConfigDeclaration()))
            return this.finish(t, d.VariableNameExpected);
        if (!this.accept(u.ParenthesisR))
          return this.finish(t, d.RightParenthesisExpected);
      }
    }
    return !this.accept(u.SemiColon) && !this.accept(u.EOF) ? this.finish(t, d.SemiColonExpected) : this.finish(t);
  }, e.prototype._parseModuleConfigDeclaration = function() {
    var t = this.create(Kn);
    return t.setIdentifier(this._parseVariable()) ? !this.accept(u.Colon) || !t.setValue(this._parseExpr(!0)) ? this.finish(t, d.VariableValueExpected, [], [u.Comma, u.ParenthesisR]) : this.accept(u.Exclamation) && (this.hasWhitespace() || !this.acceptIdent("default")) ? this.finish(t, d.UnknownKeyword) : this.finish(t) : null;
  }, e.prototype._parseForward = function() {
    if (!this.peekKeyword("@forward"))
      return null;
    var t = this.create(zn);
    if (this.consumeToken(), !t.addChild(this._parseStringLiteral()))
      return this.finish(t, d.StringLiteralExpected);
    if (this.acceptIdent("with")) {
      if (!this.accept(u.ParenthesisL))
        return this.finish(t, d.LeftParenthesisExpected, [u.ParenthesisR]);
      if (!t.getParameters().addChild(this._parseModuleConfigDeclaration()))
        return this.finish(t, d.VariableNameExpected);
      for (; this.accept(u.Comma) && !this.peek(u.ParenthesisR); )
        if (!t.getParameters().addChild(this._parseModuleConfigDeclaration()))
          return this.finish(t, d.VariableNameExpected);
      if (!this.accept(u.ParenthesisR))
        return this.finish(t, d.RightParenthesisExpected);
    }
    if (!this.peek(u.SemiColon) && !this.peek(u.EOF)) {
      if (!this.peekRegExp(u.Ident, /as|hide|show/))
        return this.finish(t, d.UnknownKeyword);
      if (this.acceptIdent("as")) {
        var i = this._parseIdent([D.Forward]);
        if (!t.setIdentifier(i))
          return this.finish(t, d.IdentifierExpected);
        if (this.hasWhitespace() || !this.acceptDelim("*"))
          return this.finish(t, d.WildcardExpected);
      }
      if ((this.peekIdent("hide") || this.peekIdent("show")) && !t.addChild(this._parseForwardVisibility()))
        return this.finish(t, d.IdentifierOrVariableExpected);
    }
    return !this.accept(u.SemiColon) && !this.accept(u.EOF) ? this.finish(t, d.SemiColonExpected) : this.finish(t);
  }, e.prototype._parseForwardVisibility = function() {
    var t = this.create(qn);
    for (t.setIdentifier(this._parseIdent()); t.addChild(this._parseVariable() || this._parseIdent()); )
      this.accept(u.Comma);
    return t.getChildren().length > 1 ? t : null;
  }, e.prototype._parseSupportsCondition = function() {
    return this._parseInterpolation() || r.prototype._parseSupportsCondition.call(this);
  }, e;
})(Gi);
var oa = globalThis && globalThis.__extends || function() {
  var r = function(e, t) {
    return r = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(i, n) {
      i.__proto__ = n;
    } || function(i, n) {
      for (var s in n)
        Object.prototype.hasOwnProperty.call(n, s) && (i[s] = n[s]);
    }, r(e, t);
  };
  return function(e, t) {
    if (typeof t != "function" && t !== null)
      throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
    r(e, t);
    function i() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (i.prototype = t.prototype, new i());
  };
}(), C = ge();
(function(r) {
  oa(e, r);
  function e(t, i) {
    var n = r.call(this, "$", t, i) || this;
    return Ai(e.scssModuleLoaders), Ai(e.scssModuleBuiltIns), n;
  }
  return e.prototype.isImportPathParent = function(t) {
    return t === f.Forward || t === f.Use || r.prototype.isImportPathParent.call(this, t);
  }, e.prototype.getCompletionForImportPath = function(t, i) {
    var n = t.getParent().type;
    if (n === f.Forward || n === f.Use)
      for (var s = 0, a = e.scssModuleBuiltIns; s < a.length; s++) {
        var o = a[s], l = {
          label: o.label,
          documentation: o.documentation,
          textEdit: I.replace(this.getCompletionRange(t), "'" + o.label + "'"),
          kind: P.Module
        };
        i.items.push(l);
      }
    return r.prototype.getCompletionForImportPath.call(this, t, i);
  }, e.prototype.createReplaceFunction = function() {
    var t = 1;
    return function(i, n) {
      return "\\" + n + ": ${" + t++ + ":" + (e.variableDefaults[n] || "") + "}";
    };
  }, e.prototype.createFunctionProposals = function(t, i, n, s) {
    for (var a = 0, o = t; a < o.length; a++) {
      var l = o[a], c = l.func.replace(/\[?(\$\w+)\]?/g, this.createReplaceFunction()), h = l.func.substr(0, l.func.indexOf("(")), p = {
        label: h,
        detail: l.func,
        documentation: l.desc,
        textEdit: I.replace(this.getCompletionRange(i), c),
        insertTextFormat: te.Snippet,
        kind: P.Function
      };
      n && (p.sortText = "z"), s.items.push(p);
    }
    return s;
  }, e.prototype.getCompletionsForSelector = function(t, i, n) {
    return this.createFunctionProposals(e.selectorFuncs, null, !0, n), r.prototype.getCompletionsForSelector.call(this, t, i, n);
  }, e.prototype.getTermProposals = function(t, i, n) {
    var s = e.builtInFuncs;
    return t && (s = s.filter(function(a) {
      return !a.type || !t.restrictions || t.restrictions.indexOf(a.type) !== -1;
    })), this.createFunctionProposals(s, i, !0, n), r.prototype.getTermProposals.call(this, t, i, n);
  }, e.prototype.getColorProposals = function(t, i, n) {
    return this.createFunctionProposals(e.colorProposals, i, !1, n), r.prototype.getColorProposals.call(this, t, i, n);
  }, e.prototype.getCompletionsForDeclarationProperty = function(t, i) {
    return this.getCompletionForAtDirectives(i), this.getCompletionsForSelector(null, !0, i), r.prototype.getCompletionsForDeclarationProperty.call(this, t, i);
  }, e.prototype.getCompletionsForExtendsReference = function(t, i, n) {
    for (var s = this.getSymbolContext().findSymbolsAtOffset(this.offset, D.Rule), a = 0, o = s; a < o.length; a++) {
      var l = o[a], c = {
        label: l.name,
        textEdit: I.replace(this.getCompletionRange(i), l.name),
        kind: P.Function
      };
      n.items.push(c);
    }
    return n;
  }, e.prototype.getCompletionForAtDirectives = function(t) {
    var i;
    return (i = t.items).push.apply(i, e.scssAtDirectives), t;
  }, e.prototype.getCompletionForTopLevel = function(t) {
    return this.getCompletionForAtDirectives(t), this.getCompletionForModuleLoaders(t), r.prototype.getCompletionForTopLevel.call(this, t), t;
  }, e.prototype.getCompletionForModuleLoaders = function(t) {
    var i;
    return (i = t.items).push.apply(i, e.scssModuleLoaders), t;
  }, e.variableDefaults = {
    $red: "1",
    $green: "2",
    $blue: "3",
    $alpha: "1.0",
    $color: "#000000",
    $weight: "0.5",
    $hue: "0",
    $saturation: "0%",
    $lightness: "0%",
    $degrees: "0",
    $amount: "0",
    $string: '""',
    $substring: '"s"',
    $number: "0",
    $limit: "1"
  }, e.colorProposals = [
    { func: "red($color)", desc: C("scss.builtin.red", "Gets the red component of a color.") },
    { func: "green($color)", desc: C("scss.builtin.green", "Gets the green component of a color.") },
    { func: "blue($color)", desc: C("scss.builtin.blue", "Gets the blue component of a color.") },
    { func: "mix($color, $color, [$weight])", desc: C("scss.builtin.mix", "Mixes two colors together.") },
    { func: "hue($color)", desc: C("scss.builtin.hue", "Gets the hue component of a color.") },
    { func: "saturation($color)", desc: C("scss.builtin.saturation", "Gets the saturation component of a color.") },
    { func: "lightness($color)", desc: C("scss.builtin.lightness", "Gets the lightness component of a color.") },
    { func: "adjust-hue($color, $degrees)", desc: C("scss.builtin.adjust-hue", "Changes the hue of a color.") },
    { func: "lighten($color, $amount)", desc: C("scss.builtin.lighten", "Makes a color lighter.") },
    { func: "darken($color, $amount)", desc: C("scss.builtin.darken", "Makes a color darker.") },
    { func: "saturate($color, $amount)", desc: C("scss.builtin.saturate", "Makes a color more saturated.") },
    { func: "desaturate($color, $amount)", desc: C("scss.builtin.desaturate", "Makes a color less saturated.") },
    { func: "grayscale($color)", desc: C("scss.builtin.grayscale", "Converts a color to grayscale.") },
    { func: "complement($color)", desc: C("scss.builtin.complement", "Returns the complement of a color.") },
    { func: "invert($color)", desc: C("scss.builtin.invert", "Returns the inverse of a color.") },
    { func: "alpha($color)", desc: C("scss.builtin.alpha", "Gets the opacity component of a color.") },
    { func: "opacity($color)", desc: "Gets the alpha component (opacity) of a color." },
    { func: "rgba($color, $alpha)", desc: C("scss.builtin.rgba", "Changes the alpha component for a color.") },
    { func: "opacify($color, $amount)", desc: C("scss.builtin.opacify", "Makes a color more opaque.") },
    { func: "fade-in($color, $amount)", desc: C("scss.builtin.fade-in", "Makes a color more opaque.") },
    { func: "transparentize($color, $amount)", desc: C("scss.builtin.transparentize", "Makes a color more transparent.") },
    { func: "fade-out($color, $amount)", desc: C("scss.builtin.fade-out", "Makes a color more transparent.") },
    { func: "adjust-color($color, [$red], [$green], [$blue], [$hue], [$saturation], [$lightness], [$alpha])", desc: C("scss.builtin.adjust-color", "Increases or decreases one or more components of a color.") },
    { func: "scale-color($color, [$red], [$green], [$blue], [$saturation], [$lightness], [$alpha])", desc: C("scss.builtin.scale-color", "Fluidly scales one or more properties of a color.") },
    { func: "change-color($color, [$red], [$green], [$blue], [$hue], [$saturation], [$lightness], [$alpha])", desc: C("scss.builtin.change-color", "Changes one or more properties of a color.") },
    { func: "ie-hex-str($color)", desc: C("scss.builtin.ie-hex-str", "Converts a color into the format understood by IE filters.") }
  ], e.selectorFuncs = [
    { func: "selector-nest($selectors…)", desc: C("scss.builtin.selector-nest", "Nests selector beneath one another like they would be nested in the stylesheet.") },
    { func: "selector-append($selectors…)", desc: C("scss.builtin.selector-append", "Appends selectors to one another without spaces in between.") },
    { func: "selector-extend($selector, $extendee, $extender)", desc: C("scss.builtin.selector-extend", "Extends $extendee with $extender within $selector.") },
    { func: "selector-replace($selector, $original, $replacement)", desc: C("scss.builtin.selector-replace", "Replaces $original with $replacement within $selector.") },
    { func: "selector-unify($selector1, $selector2)", desc: C("scss.builtin.selector-unify", "Unifies two selectors to produce a selector that matches elements matched by both.") },
    { func: "is-superselector($super, $sub)", desc: C("scss.builtin.is-superselector", "Returns whether $super matches all the elements $sub does, and possibly more.") },
    { func: "simple-selectors($selector)", desc: C("scss.builtin.simple-selectors", "Returns the simple selectors that comprise a compound selector.") },
    { func: "selector-parse($selector)", desc: C("scss.builtin.selector-parse", "Parses a selector into the format returned by &.") }
  ], e.builtInFuncs = [
    { func: "unquote($string)", desc: C("scss.builtin.unquote", "Removes quotes from a string.") },
    { func: "quote($string)", desc: C("scss.builtin.quote", "Adds quotes to a string.") },
    { func: "str-length($string)", desc: C("scss.builtin.str-length", "Returns the number of characters in a string.") },
    { func: "str-insert($string, $insert, $index)", desc: C("scss.builtin.str-insert", "Inserts $insert into $string at $index.") },
    { func: "str-index($string, $substring)", desc: C("scss.builtin.str-index", "Returns the index of the first occurance of $substring in $string.") },
    { func: "str-slice($string, $start-at, [$end-at])", desc: C("scss.builtin.str-slice", "Extracts a substring from $string.") },
    { func: "to-upper-case($string)", desc: C("scss.builtin.to-upper-case", "Converts a string to upper case.") },
    { func: "to-lower-case($string)", desc: C("scss.builtin.to-lower-case", "Converts a string to lower case.") },
    { func: "percentage($number)", desc: C("scss.builtin.percentage", "Converts a unitless number to a percentage."), type: "percentage" },
    { func: "round($number)", desc: C("scss.builtin.round", "Rounds a number to the nearest whole number.") },
    { func: "ceil($number)", desc: C("scss.builtin.ceil", "Rounds a number up to the next whole number.") },
    { func: "floor($number)", desc: C("scss.builtin.floor", "Rounds a number down to the previous whole number.") },
    { func: "abs($number)", desc: C("scss.builtin.abs", "Returns the absolute value of a number.") },
    { func: "min($numbers)", desc: C("scss.builtin.min", "Finds the minimum of several numbers.") },
    { func: "max($numbers)", desc: C("scss.builtin.max", "Finds the maximum of several numbers.") },
    { func: "random([$limit])", desc: C("scss.builtin.random", "Returns a random number.") },
    { func: "length($list)", desc: C("scss.builtin.length", "Returns the length of a list.") },
    { func: "nth($list, $n)", desc: C("scss.builtin.nth", "Returns a specific item in a list.") },
    { func: "set-nth($list, $n, $value)", desc: C("scss.builtin.set-nth", "Replaces the nth item in a list.") },
    { func: "join($list1, $list2, [$separator])", desc: C("scss.builtin.join", "Joins together two lists into one.") },
    { func: "append($list1, $val, [$separator])", desc: C("scss.builtin.append", "Appends a single value onto the end of a list.") },
    { func: "zip($lists)", desc: C("scss.builtin.zip", "Combines several lists into a single multidimensional list.") },
    { func: "index($list, $value)", desc: C("scss.builtin.index", "Returns the position of a value within a list.") },
    { func: "list-separator(#list)", desc: C("scss.builtin.list-separator", "Returns the separator of a list.") },
    { func: "map-get($map, $key)", desc: C("scss.builtin.map-get", "Returns the value in a map associated with a given key.") },
    { func: "map-merge($map1, $map2)", desc: C("scss.builtin.map-merge", "Merges two maps together into a new map.") },
    { func: "map-remove($map, $keys)", desc: C("scss.builtin.map-remove", "Returns a new map with keys removed.") },
    { func: "map-keys($map)", desc: C("scss.builtin.map-keys", "Returns a list of all keys in a map.") },
    { func: "map-values($map)", desc: C("scss.builtin.map-values", "Returns a list of all values in a map.") },
    { func: "map-has-key($map, $key)", desc: C("scss.builtin.map-has-key", "Returns whether a map has a value associated with a given key.") },
    { func: "keywords($args)", desc: C("scss.builtin.keywords", "Returns the keywords passed to a function that takes variable arguments.") },
    { func: "feature-exists($feature)", desc: C("scss.builtin.feature-exists", "Returns whether a feature exists in the current Sass runtime.") },
    { func: "variable-exists($name)", desc: C("scss.builtin.variable-exists", "Returns whether a variable with the given name exists in the current scope.") },
    { func: "global-variable-exists($name)", desc: C("scss.builtin.global-variable-exists", "Returns whether a variable with the given name exists in the global scope.") },
    { func: "function-exists($name)", desc: C("scss.builtin.function-exists", "Returns whether a function with the given name exists.") },
    { func: "mixin-exists($name)", desc: C("scss.builtin.mixin-exists", "Returns whether a mixin with the given name exists.") },
    { func: "inspect($value)", desc: C("scss.builtin.inspect", "Returns the string representation of a value as it would be represented in Sass.") },
    { func: "type-of($value)", desc: C("scss.builtin.type-of", "Returns the type of a value.") },
    { func: "unit($number)", desc: C("scss.builtin.unit", "Returns the unit(s) associated with a number.") },
    { func: "unitless($number)", desc: C("scss.builtin.unitless", "Returns whether a number has units.") },
    { func: "comparable($number1, $number2)", desc: C("scss.builtin.comparable", "Returns whether two numbers can be added, subtracted, or compared.") },
    { func: "call($name, $args…)", desc: C("scss.builtin.call", "Dynamically calls a Sass function.") }
  ], e.scssAtDirectives = [
    {
      label: "@extend",
      documentation: C("scss.builtin.@extend", "Inherits the styles of another selector."),
      kind: P.Keyword
    },
    {
      label: "@at-root",
      documentation: C("scss.builtin.@at-root", "Causes one or more rules to be emitted at the root of the document."),
      kind: P.Keyword
    },
    {
      label: "@debug",
      documentation: C("scss.builtin.@debug", "Prints the value of an expression to the standard error output stream. Useful for debugging complicated Sass files."),
      kind: P.Keyword
    },
    {
      label: "@warn",
      documentation: C("scss.builtin.@warn", "Prints the value of an expression to the standard error output stream. Useful for libraries that need to warn users of deprecations or recovering from minor mixin usage mistakes. Warnings can be turned off with the `--quiet` command-line option or the `:quiet` Sass option."),
      kind: P.Keyword
    },
    {
      label: "@error",
      documentation: C("scss.builtin.@error", "Throws the value of an expression as a fatal error with stack trace. Useful for validating arguments to mixins and functions."),
      kind: P.Keyword
    },
    {
      label: "@if",
      documentation: C("scss.builtin.@if", "Includes the body if the expression does not evaluate to `false` or `null`."),
      insertText: `@if \${1:expr} {
	$0
}`,
      insertTextFormat: te.Snippet,
      kind: P.Keyword
    },
    {
      label: "@for",
      documentation: C("scss.builtin.@for", "For loop that repeatedly outputs a set of styles for each `$var` in the `from/through` or `from/to` clause."),
      insertText: "@for \\$${1:var} from ${2:start} ${3|to,through|} ${4:end} {\n	$0\n}",
      insertTextFormat: te.Snippet,
      kind: P.Keyword
    },
    {
      label: "@each",
      documentation: C("scss.builtin.@each", "Each loop that sets `$var` to each item in the list or map, then outputs the styles it contains using that value of `$var`."),
      insertText: "@each \\$${1:var} in ${2:list} {\n	$0\n}",
      insertTextFormat: te.Snippet,
      kind: P.Keyword
    },
    {
      label: "@while",
      documentation: C("scss.builtin.@while", "While loop that takes an expression and repeatedly outputs the nested styles until the statement evaluates to `false`."),
      insertText: `@while \${1:condition} {
	$0
}`,
      insertTextFormat: te.Snippet,
      kind: P.Keyword
    },
    {
      label: "@mixin",
      documentation: C("scss.builtin.@mixin", "Defines styles that can be re-used throughout the stylesheet with `@include`."),
      insertText: `@mixin \${1:name} {
	$0
}`,
      insertTextFormat: te.Snippet,
      kind: P.Keyword
    },
    {
      label: "@include",
      documentation: C("scss.builtin.@include", "Includes the styles defined by another mixin into the current rule."),
      kind: P.Keyword
    },
    {
      label: "@function",
      documentation: C("scss.builtin.@function", "Defines complex operations that can be re-used throughout stylesheets."),
      kind: P.Keyword
    }
  ], e.scssModuleLoaders = [
    {
      label: "@use",
      documentation: C("scss.builtin.@use", "Loads mixins, functions, and variables from other Sass stylesheets as 'modules', and combines CSS from multiple stylesheets together."),
      references: [{ name: "Sass documentation", url: "https://sass-lang.com/documentation/at-rules/use" }],
      insertText: "@use $0;",
      insertTextFormat: te.Snippet,
      kind: P.Keyword
    },
    {
      label: "@forward",
      documentation: C("scss.builtin.@forward", "Loads a Sass stylesheet and makes its mixins, functions, and variables available when this stylesheet is loaded with the @use rule."),
      references: [{ name: "Sass documentation", url: "https://sass-lang.com/documentation/at-rules/forward" }],
      insertText: "@forward $0;",
      insertTextFormat: te.Snippet,
      kind: P.Keyword
    }
  ], e.scssModuleBuiltIns = [
    {
      label: "sass:math",
      documentation: C("scss.builtin.sass:math", "Provides functions that operate on numbers."),
      references: [{ name: "Sass documentation", url: "https://sass-lang.com/documentation/modules/math" }]
    },
    {
      label: "sass:string",
      documentation: C("scss.builtin.sass:string", "Makes it easy to combine, search, or split apart strings."),
      references: [{ name: "Sass documentation", url: "https://sass-lang.com/documentation/modules/string" }]
    },
    {
      label: "sass:color",
      documentation: C("scss.builtin.sass:color", "Generates new colors based on existing ones, making it easy to build color themes."),
      references: [{ name: "Sass documentation", url: "https://sass-lang.com/documentation/modules/color" }]
    },
    {
      label: "sass:list",
      documentation: C("scss.builtin.sass:list", "Lets you access and modify values in lists."),
      references: [{ name: "Sass documentation", url: "https://sass-lang.com/documentation/modules/list" }]
    },
    {
      label: "sass:map",
      documentation: C("scss.builtin.sass:map", "Makes it possible to look up the value associated with a key in a map, and much more."),
      references: [{ name: "Sass documentation", url: "https://sass-lang.com/documentation/modules/map" }]
    },
    {
      label: "sass:selector",
      documentation: C("scss.builtin.sass:selector", "Provides access to Sass’s powerful selector engine."),
      references: [{ name: "Sass documentation", url: "https://sass-lang.com/documentation/modules/selector" }]
    },
    {
      label: "sass:meta",
      documentation: C("scss.builtin.sass:meta", "Exposes the details of Sass’s inner workings."),
      references: [{ name: "Sass documentation", url: "https://sass-lang.com/documentation/modules/meta" }]
    }
  ], e;
})(Zi);
function Ai(r) {
  r.forEach(function(e) {
    if (e.documentation && e.references && e.references.length > 0) {
      var t = typeof e.documentation == "string" ? { kind: "markdown", value: e.documentation } : { kind: "markdown", value: e.documentation.value };
      t.value += `

`, t.value += e.references.map(function(i) {
        return "[" + i.name + "](" + i.url + ")";
      }).join(" | "), e.documentation = t;
    }
  });
}
var ua = globalThis && globalThis.__extends || function() {
  var r = function(e, t) {
    return r = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(i, n) {
      i.__proto__ = n;
    } || function(i, n) {
      for (var s in n)
        Object.prototype.hasOwnProperty.call(n, s) && (i[s] = n[s]);
    }, r(e, t);
  };
  return function(e, t) {
    if (typeof t != "function" && t !== null)
      throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
    r(e, t);
    function i() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (i.prototype = t.prototype, new i());
  };
}(), Ii = "/".charCodeAt(0), ca = `
`.charCodeAt(0), la = "\r".charCodeAt(0), ha = "\f".charCodeAt(0), Bt = "`".charCodeAt(0), jt = ".".charCodeAt(0), fa = u.CustomToken, Yt = fa++, pa = (
  /** @class */
  function(r) {
    ua(e, r);
    function e() {
      return r !== null && r.apply(this, arguments) || this;
    }
    return e.prototype.scanNext = function(t) {
      var i = this.escapedJavaScript();
      return i !== null ? this.finishToken(t, i) : this.stream.advanceIfChars([jt, jt, jt]) ? this.finishToken(t, Yt) : r.prototype.scanNext.call(this, t);
    }, e.prototype.comment = function() {
      return r.prototype.comment.call(this) ? !0 : !this.inURL && this.stream.advanceIfChars([Ii, Ii]) ? (this.stream.advanceWhileChar(function(t) {
        switch (t) {
          case ca:
          case la:
          case ha:
            return !1;
          default:
            return !0;
        }
      }), !0) : !1;
    }, e.prototype.escapedJavaScript = function() {
      var t = this.stream.peekChar();
      return t === Bt ? (this.stream.advance(1), this.stream.advanceWhileChar(function(i) {
        return i !== Bt;
      }), this.stream.advanceIfChar(Bt) ? u.EscapedJavaScript : u.BadEscapedJavaScript) : null;
    }, e;
  }(tr)
), da = globalThis && globalThis.__extends || function() {
  var r = function(e, t) {
    return r = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(i, n) {
      i.__proto__ = n;
    } || function(i, n) {
      for (var s in n)
        Object.prototype.hasOwnProperty.call(n, s) && (i[s] = n[s]);
    }, r(e, t);
  };
  return function(e, t) {
    if (typeof t != "function" && t !== null)
      throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
    r(e, t);
    function i() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (i.prototype = t.prototype, new i());
  };
}();
(function(r) {
  da(e, r);
  function e() {
    return r.call(this, new pa()) || this;
  }
  return e.prototype._parseStylesheetStatement = function(t) {
    return t === void 0 && (t = !1), this.peek(u.AtKeyword) ? this._parseVariableDeclaration() || this._parsePlugin() || r.prototype._parseStylesheetAtStatement.call(this, t) : this._tryParseMixinDeclaration() || this._tryParseMixinReference() || this._parseFunction() || this._parseRuleset(!0);
  }, e.prototype._parseImport = function() {
    if (!this.peekKeyword("@import") && !this.peekKeyword("@import-once"))
      return null;
    var t = this.create(sr);
    if (this.consumeToken(), this.accept(u.ParenthesisL)) {
      if (!this.accept(u.Ident))
        return this.finish(t, d.IdentifierExpected, [u.SemiColon]);
      do
        if (!this.accept(u.Comma))
          break;
      while (this.accept(u.Ident));
      if (!this.accept(u.ParenthesisR))
        return this.finish(t, d.RightParenthesisExpected, [u.SemiColon]);
    }
    return !t.addChild(this._parseURILiteral()) && !t.addChild(this._parseStringLiteral()) ? this.finish(t, d.URIOrStringExpected, [u.SemiColon]) : (!this.peek(u.SemiColon) && !this.peek(u.EOF) && t.setMedialist(this._parseMediaQueryList()), this.finish(t));
  }, e.prototype._parsePlugin = function() {
    if (!this.peekKeyword("@plugin"))
      return null;
    var t = this.createNode(f.Plugin);
    return this.consumeToken(), t.addChild(this._parseStringLiteral()) ? this.accept(u.SemiColon) ? this.finish(t) : this.finish(t, d.SemiColonExpected) : this.finish(t, d.StringLiteralExpected);
  }, e.prototype._parseMediaQuery = function(t) {
    var i = r.prototype._parseMediaQuery.call(this, t);
    if (!i) {
      var n = this.create(zi);
      return n.addChild(this._parseVariable()) ? this.finish(n) : null;
    }
    return i;
  }, e.prototype._parseMediaDeclaration = function(t) {
    return t === void 0 && (t = !1), this._tryParseRuleset(t) || this._tryToParseDeclaration() || this._tryParseMixinDeclaration() || this._tryParseMixinReference() || this._parseDetachedRuleSetMixin() || this._parseStylesheetStatement(t);
  }, e.prototype._parseMediaFeatureName = function() {
    return this._parseIdent() || this._parseVariable();
  }, e.prototype._parseVariableDeclaration = function(t) {
    t === void 0 && (t = []);
    var i = this.create(xt), n = this.mark();
    if (!i.setVariable(this._parseVariable(!0)))
      return null;
    if (this.accept(u.Colon)) {
      if (this.prevToken && (i.colonPosition = this.prevToken.offset), i.setValue(this._parseDetachedRuleSet()))
        i.needsSemicolon = !1;
      else if (!i.setValue(this._parseExpr()))
        return this.finish(i, d.VariableValueExpected, [], t);
      i.addChild(this._parsePrio());
    } else
      return this.restoreAtMark(n), null;
    return this.peek(u.SemiColon) && (i.semicolonPosition = this.token.offset), this.finish(i);
  }, e.prototype._parseDetachedRuleSet = function() {
    var t = this.mark();
    if (this.peekDelim("#") || this.peekDelim("."))
      if (this.consumeToken(), !this.hasWhitespace() && this.accept(u.ParenthesisL)) {
        var i = this.create(Ke);
        if (i.getParameters().addChild(this._parseMixinParameter()))
          for (; (this.accept(u.Comma) || this.accept(u.SemiColon)) && !this.peek(u.ParenthesisR); )
            i.getParameters().addChild(this._parseMixinParameter()) || this.markError(i, d.IdentifierExpected, [], [u.ParenthesisR]);
        if (!this.accept(u.ParenthesisR))
          return this.restoreAtMark(t), null;
      } else
        return this.restoreAtMark(t), null;
    if (!this.peek(u.CurlyL))
      return null;
    var n = this.create(U);
    return this._parseBody(n, this._parseDetachedRuleSetBody.bind(this)), this.finish(n);
  }, e.prototype._parseDetachedRuleSetBody = function() {
    return this._tryParseKeyframeSelector() || this._parseRuleSetDeclaration();
  }, e.prototype._addLookupChildren = function(t) {
    if (!t.addChild(this._parseLookupValue()))
      return !1;
    for (var i = !1; this.peek(u.BracketL) && (i = !0), !!t.addChild(this._parseLookupValue()); )
      i = !1;
    return !i;
  }, e.prototype._parseLookupValue = function() {
    var t = this.create(R), i = this.mark();
    return this.accept(u.BracketL) ? (t.addChild(this._parseVariable(!1, !0)) || t.addChild(this._parsePropertyIdentifier())) && this.accept(u.BracketR) || this.accept(u.BracketR) ? t : (this.restoreAtMark(i), null) : (this.restoreAtMark(i), null);
  }, e.prototype._parseVariable = function(t, i) {
    t === void 0 && (t = !1), i === void 0 && (i = !1);
    var n = !t && this.peekDelim("$");
    if (!this.peekDelim("@") && !n && !this.peek(u.AtKeyword))
      return null;
    for (var s = this.create(ur), a = this.mark(); this.acceptDelim("@") || !t && this.acceptDelim("$"); )
      if (this.hasWhitespace())
        return this.restoreAtMark(a), null;
    return !this.accept(u.AtKeyword) && !this.accept(u.Ident) ? (this.restoreAtMark(a), null) : !i && this.peek(u.BracketL) && !this._addLookupChildren(s) ? (this.restoreAtMark(a), null) : s;
  }, e.prototype._parseTermExpression = function() {
    return this._parseVariable() || this._parseEscaped() || r.prototype._parseTermExpression.call(this) || // preference for colors before mixin references
    this._tryParseMixinReference(!1);
  }, e.prototype._parseEscaped = function() {
    if (this.peek(u.EscapedJavaScript) || this.peek(u.BadEscapedJavaScript)) {
      var t = this.createNode(f.EscapedValue);
      return this.consumeToken(), this.finish(t);
    }
    if (this.peekDelim("~")) {
      var t = this.createNode(f.EscapedValue);
      return this.consumeToken(), this.accept(u.String) || this.accept(u.EscapedJavaScript) ? this.finish(t) : this.finish(t, d.TermExpected);
    }
    return null;
  }, e.prototype._parseOperator = function() {
    var t = this._parseGuardOperator();
    return t || r.prototype._parseOperator.call(this);
  }, e.prototype._parseGuardOperator = function() {
    if (this.peekDelim(">")) {
      var t = this.createNode(f.Operator);
      return this.consumeToken(), this.acceptDelim("="), t;
    } else if (this.peekDelim("=")) {
      var t = this.createNode(f.Operator);
      return this.consumeToken(), this.acceptDelim("<"), t;
    } else if (this.peekDelim("<")) {
      var t = this.createNode(f.Operator);
      return this.consumeToken(), this.acceptDelim("="), t;
    }
    return null;
  }, e.prototype._parseRuleSetDeclaration = function() {
    return this.peek(u.AtKeyword) ? this._parseKeyframe() || this._parseMedia(!0) || this._parseImport() || this._parseSupports(!0) || this._parseDetachedRuleSetMixin() || this._parseVariableDeclaration() || r.prototype._parseRuleSetDeclarationAtStatement.call(this) : this._tryParseMixinDeclaration() || this._tryParseRuleset(!0) || this._tryParseMixinReference() || this._parseFunction() || this._parseExtend() || r.prototype._parseRuleSetDeclaration.call(this);
  }, e.prototype._parseKeyframeIdent = function() {
    return this._parseIdent([D.Keyframe]) || this._parseVariable();
  }, e.prototype._parseKeyframeSelector = function() {
    return this._parseDetachedRuleSetMixin() || r.prototype._parseKeyframeSelector.call(this);
  }, e.prototype._parseSimpleSelectorBody = function() {
    return this._parseSelectorCombinator() || r.prototype._parseSimpleSelectorBody.call(this);
  }, e.prototype._parseSelector = function(t) {
    var i = this.create(bt), n = !1;
    for (t && (n = i.addChild(this._parseCombinator())); i.addChild(this._parseSimpleSelector()); ) {
      n = !0;
      var s = this.mark();
      if (i.addChild(this._parseGuard()) && this.peek(u.CurlyL))
        break;
      this.restoreAtMark(s), i.addChild(this._parseCombinator());
    }
    return n ? this.finish(i) : null;
  }, e.prototype._parseSelectorCombinator = function() {
    if (this.peekDelim("&")) {
      var t = this.createNode(f.SelectorCombinator);
      for (this.consumeToken(); !this.hasWhitespace() && (this.acceptDelim("-") || this.accept(u.Num) || this.accept(u.Dimension) || t.addChild(this._parseIdent()) || this.acceptDelim("&")); )
        ;
      return this.finish(t);
    }
    return null;
  }, e.prototype._parseSelectorIdent = function() {
    if (!this.peekInterpolatedIdent())
      return null;
    var t = this.createNode(f.SelectorInterpolation), i = this._acceptInterpolatedIdent(t);
    return i ? this.finish(t) : null;
  }, e.prototype._parsePropertyIdentifier = function(t) {
    t === void 0 && (t = !1);
    var i = /^[\w-]+/;
    if (!this.peekInterpolatedIdent() && !this.peekRegExp(this.token.type, i))
      return null;
    var n = this.mark(), s = this.create(se);
    s.isCustomProperty = this.acceptDelim("-") && this.acceptDelim("-");
    var a = !1;
    return t ? s.isCustomProperty ? a = s.addChild(this._parseIdent()) : a = s.addChild(this._parseRegexp(i)) : s.isCustomProperty ? a = this._acceptInterpolatedIdent(s) : a = this._acceptInterpolatedIdent(s, i), a ? (!t && !this.hasWhitespace() && (this.acceptDelim("+"), this.hasWhitespace() || this.acceptIdent("_")), this.finish(s)) : (this.restoreAtMark(n), null);
  }, e.prototype.peekInterpolatedIdent = function() {
    return this.peek(u.Ident) || this.peekDelim("@") || this.peekDelim("$") || this.peekDelim("-");
  }, e.prototype._acceptInterpolatedIdent = function(t, i) {
    for (var n = this, s = !1, a = function() {
      var l = n.mark();
      return n.acceptDelim("-") && (n.hasWhitespace() || n.acceptDelim("-"), n.hasWhitespace()) ? (n.restoreAtMark(l), null) : n._parseInterpolation();
    }, o = i ? function() {
      return n.acceptRegexp(i);
    } : function() {
      return n.accept(u.Ident);
    }; (o() || t.addChild(this._parseInterpolation() || this.try(a))) && (s = !0, !this.hasWhitespace()); )
      ;
    return s;
  }, e.prototype._parseInterpolation = function() {
    var t = this.mark();
    if (this.peekDelim("@") || this.peekDelim("$")) {
      var i = this.createNode(f.Interpolation);
      return this.consumeToken(), this.hasWhitespace() || !this.accept(u.CurlyL) ? (this.restoreAtMark(t), null) : i.addChild(this._parseIdent()) ? this.accept(u.CurlyR) ? this.finish(i) : this.finish(i, d.RightCurlyExpected) : this.finish(i, d.IdentifierExpected);
    }
    return null;
  }, e.prototype._tryParseMixinDeclaration = function() {
    var t = this.mark(), i = this.create(Ke);
    if (!i.setIdentifier(this._parseMixinDeclarationIdentifier()) || !this.accept(u.ParenthesisL))
      return this.restoreAtMark(t), null;
    if (i.getParameters().addChild(this._parseMixinParameter()))
      for (; (this.accept(u.Comma) || this.accept(u.SemiColon)) && !this.peek(u.ParenthesisR); )
        i.getParameters().addChild(this._parseMixinParameter()) || this.markError(i, d.IdentifierExpected, [], [u.ParenthesisR]);
    return this.accept(u.ParenthesisR) ? (i.setGuard(this._parseGuard()), this.peek(u.CurlyL) ? this._parseBody(i, this._parseMixInBodyDeclaration.bind(this)) : (this.restoreAtMark(t), null)) : (this.restoreAtMark(t), null);
  }, e.prototype._parseMixInBodyDeclaration = function() {
    return this._parseFontFace() || this._parseRuleSetDeclaration();
  }, e.prototype._parseMixinDeclarationIdentifier = function() {
    var t;
    if (this.peekDelim("#") || this.peekDelim(".")) {
      if (t = this.create(se), this.consumeToken(), this.hasWhitespace() || !t.addChild(this._parseIdent()))
        return null;
    } else if (this.peek(u.Hash))
      t = this.create(se), this.consumeToken();
    else
      return null;
    return t.referenceTypes = [D.Mixin], this.finish(t);
  }, e.prototype._parsePseudo = function() {
    if (!this.peek(u.Colon))
      return null;
    var t = this.mark(), i = this.create(Te);
    return this.consumeToken(), this.acceptIdent("extend") ? this._completeExtends(i) : (this.restoreAtMark(t), r.prototype._parsePseudo.call(this));
  }, e.prototype._parseExtend = function() {
    if (!this.peekDelim("&"))
      return null;
    var t = this.mark(), i = this.create(Te);
    return this.consumeToken(), this.hasWhitespace() || !this.accept(u.Colon) || !this.acceptIdent("extend") ? (this.restoreAtMark(t), null) : this._completeExtends(i);
  }, e.prototype._completeExtends = function(t) {
    if (!this.accept(u.ParenthesisL))
      return this.finish(t, d.LeftParenthesisExpected);
    var i = t.getSelectors();
    if (!i.addChild(this._parseSelector(!0)))
      return this.finish(t, d.SelectorExpected);
    for (; this.accept(u.Comma); )
      if (!i.addChild(this._parseSelector(!0)))
        return this.finish(t, d.SelectorExpected);
    return this.accept(u.ParenthesisR) ? this.finish(t) : this.finish(t, d.RightParenthesisExpected);
  }, e.prototype._parseDetachedRuleSetMixin = function() {
    if (!this.peek(u.AtKeyword))
      return null;
    var t = this.mark(), i = this.create(ht);
    return i.addChild(this._parseVariable(!0)) && (this.hasWhitespace() || !this.accept(u.ParenthesisL)) ? (this.restoreAtMark(t), null) : this.accept(u.ParenthesisR) ? this.finish(i) : this.finish(i, d.RightParenthesisExpected);
  }, e.prototype._tryParseMixinReference = function(t) {
    t === void 0 && (t = !0);
    for (var i = this.mark(), n = this.create(ht), s = this._parseMixinDeclarationIdentifier(); s; ) {
      this.acceptDelim(">");
      var a = this._parseMixinDeclarationIdentifier();
      if (a)
        n.getNamespaces().addChild(s), s = a;
      else
        break;
    }
    if (!n.setIdentifier(s))
      return this.restoreAtMark(i), null;
    var o = !1;
    if (this.accept(u.ParenthesisL)) {
      if (o = !0, n.getArguments().addChild(this._parseMixinArgument())) {
        for (; (this.accept(u.Comma) || this.accept(u.SemiColon)) && !this.peek(u.ParenthesisR); )
          if (!n.getArguments().addChild(this._parseMixinArgument()))
            return this.finish(n, d.ExpressionExpected);
      }
      if (!this.accept(u.ParenthesisR))
        return this.finish(n, d.RightParenthesisExpected);
      s.referenceTypes = [D.Mixin];
    } else
      s.referenceTypes = [D.Mixin, D.Rule];
    return this.peek(u.BracketL) ? t || this._addLookupChildren(n) : n.addChild(this._parsePrio()), !o && !this.peek(u.SemiColon) && !this.peek(u.CurlyR) && !this.peek(u.EOF) ? (this.restoreAtMark(i), null) : this.finish(n);
  }, e.prototype._parseMixinArgument = function() {
    var t = this.create(De), i = this.mark(), n = this._parseVariable();
    return n && (this.accept(u.Colon) ? t.setIdentifier(n) : this.restoreAtMark(i)), t.setValue(this._parseDetachedRuleSet() || this._parseExpr(!0)) ? this.finish(t) : (this.restoreAtMark(i), null);
  }, e.prototype._parseMixinParameter = function() {
    var t = this.create(Ct);
    if (this.peekKeyword("@rest")) {
      var i = this.create(R);
      return this.consumeToken(), this.accept(Yt) ? (t.setIdentifier(this.finish(i)), this.finish(t)) : this.finish(t, d.DotExpected, [], [u.Comma, u.ParenthesisR]);
    }
    if (this.peek(Yt)) {
      var n = this.create(R);
      return this.consumeToken(), t.setIdentifier(this.finish(n)), this.finish(t);
    }
    var s = !1;
    return t.setIdentifier(this._parseVariable()) && (this.accept(u.Colon), s = !0), !t.setDefaultValue(this._parseDetachedRuleSet() || this._parseExpr(!0)) && !s ? null : this.finish(t);
  }, e.prototype._parseGuard = function() {
    if (!this.peekIdent("when"))
      return null;
    var t = this.create(as);
    if (this.consumeToken(), t.isNegated = this.acceptIdent("not"), !t.getConditions().addChild(this._parseGuardCondition()))
      return this.finish(t, d.ConditionExpected);
    for (; this.acceptIdent("and") || this.accept(u.Comma); )
      if (!t.getConditions().addChild(this._parseGuardCondition()))
        return this.finish(t, d.ConditionExpected);
    return this.finish(t);
  }, e.prototype._parseGuardCondition = function() {
    if (!this.peek(u.ParenthesisL))
      return null;
    var t = this.create(os);
    return this.consumeToken(), t.addChild(this._parseExpr()), this.accept(u.ParenthesisR) ? this.finish(t) : this.finish(t, d.RightParenthesisExpected);
  }, e.prototype._parseFunction = function() {
    var t = this.mark(), i = this.create(Je);
    if (!i.setIdentifier(this._parseFunctionIdentifier()))
      return null;
    if (this.hasWhitespace() || !this.accept(u.ParenthesisL))
      return this.restoreAtMark(t), null;
    if (i.getArguments().addChild(this._parseMixinArgument())) {
      for (; (this.accept(u.Comma) || this.accept(u.SemiColon)) && !this.peek(u.ParenthesisR); )
        if (!i.getArguments().addChild(this._parseMixinArgument()))
          return this.finish(i, d.ExpressionExpected);
    }
    return this.accept(u.ParenthesisR) ? this.finish(i) : this.finish(i, d.RightParenthesisExpected);
  }, e.prototype._parseFunctionIdentifier = function() {
    if (this.peekDelim("%")) {
      var t = this.create(se);
      return t.referenceTypes = [D.Function], this.consumeToken(), this.finish(t);
    }
    return r.prototype._parseFunctionIdentifier.call(this);
  }, e.prototype._parseURLArgument = function() {
    var t = this.mark(), i = r.prototype._parseURLArgument.call(this);
    if (!i || !this.peek(u.ParenthesisR)) {
      this.restoreAtMark(t);
      var n = this.create(R);
      return n.addChild(this._parseBinaryExpr()), this.finish(n);
    }
    return i;
  }, e;
})(Gi);
var ma = globalThis && globalThis.__extends || function() {
  var r = function(e, t) {
    return r = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(i, n) {
      i.__proto__ = n;
    } || function(i, n) {
      for (var s in n)
        Object.prototype.hasOwnProperty.call(n, s) && (i[s] = n[s]);
    }, r(e, t);
  };
  return function(e, t) {
    if (typeof t != "function" && t !== null)
      throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
    r(e, t);
    function i() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (i.prototype = t.prototype, new i());
  };
}(), A = ge();
(function(r) {
  ma(e, r);
  function e(t, i) {
    return r.call(this, "@", t, i) || this;
  }
  return e.prototype.createFunctionProposals = function(t, i, n, s) {
    for (var a = 0, o = t; a < o.length; a++) {
      var l = o[a], c = {
        label: l.name,
        detail: l.example,
        documentation: l.description,
        textEdit: I.replace(this.getCompletionRange(i), l.name + "($0)"),
        insertTextFormat: te.Snippet,
        kind: P.Function
      };
      n && (c.sortText = "z"), s.items.push(c);
    }
    return s;
  }, e.prototype.getTermProposals = function(t, i, n) {
    var s = e.builtInProposals;
    return t && (s = s.filter(function(a) {
      return !a.type || !t.restrictions || t.restrictions.indexOf(a.type) !== -1;
    })), this.createFunctionProposals(s, i, !0, n), r.prototype.getTermProposals.call(this, t, i, n);
  }, e.prototype.getColorProposals = function(t, i, n) {
    return this.createFunctionProposals(e.colorProposals, i, !1, n), r.prototype.getColorProposals.call(this, t, i, n);
  }, e.prototype.getCompletionsForDeclarationProperty = function(t, i) {
    return this.getCompletionsForSelector(null, !0, i), r.prototype.getCompletionsForDeclarationProperty.call(this, t, i);
  }, e.builtInProposals = [
    // Boolean functions
    {
      name: "if",
      example: "if(condition, trueValue [, falseValue]);",
      description: A("less.builtin.if", "returns one of two values depending on a condition.")
    },
    {
      name: "boolean",
      example: "boolean(condition);",
      description: A("less.builtin.boolean", '"store" a boolean test for later evaluation in a guard or if().')
    },
    // List functions
    {
      name: "length",
      example: "length(@list);",
      description: A("less.builtin.length", "returns the number of elements in a value list")
    },
    {
      name: "extract",
      example: "extract(@list, index);",
      description: A("less.builtin.extract", "returns a value at the specified position in the list")
    },
    {
      name: "range",
      example: "range([start, ] end [, step]);",
      description: A("less.builtin.range", "generate a list spanning a range of values")
    },
    {
      name: "each",
      example: "each(@list, ruleset);",
      description: A("less.builtin.each", "bind the evaluation of a ruleset to each member of a list.")
    },
    // Other built-ins
    {
      name: "escape",
      example: "escape(@string);",
      description: A("less.builtin.escape", "URL encodes a string")
    },
    {
      name: "e",
      example: "e(@string);",
      description: A("less.builtin.e", "escape string content")
    },
    {
      name: "replace",
      example: "replace(@string, @pattern, @replacement[, @flags]);",
      description: A("less.builtin.replace", "string replace")
    },
    {
      name: "unit",
      example: "unit(@dimension, [@unit: '']);",
      description: A("less.builtin.unit", "remove or change the unit of a dimension")
    },
    {
      name: "color",
      example: "color(@string);",
      description: A("less.builtin.color", "parses a string to a color"),
      type: "color"
    },
    {
      name: "convert",
      example: "convert(@value, unit);",
      description: A("less.builtin.convert", "converts numbers from one type into another")
    },
    {
      name: "data-uri",
      example: "data-uri([mimetype,] url);",
      description: A("less.builtin.data-uri", "inlines a resource and falls back to `url()`"),
      type: "url"
    },
    {
      name: "abs",
      description: A("less.builtin.abs", "absolute value of a number"),
      example: "abs(number);"
    },
    {
      name: "acos",
      description: A("less.builtin.acos", "arccosine - inverse of cosine function"),
      example: "acos(number);"
    },
    {
      name: "asin",
      description: A("less.builtin.asin", "arcsine - inverse of sine function"),
      example: "asin(number);"
    },
    {
      name: "ceil",
      example: "ceil(@number);",
      description: A("less.builtin.ceil", "rounds up to an integer")
    },
    {
      name: "cos",
      description: A("less.builtin.cos", "cosine function"),
      example: "cos(number);"
    },
    {
      name: "floor",
      description: A("less.builtin.floor", "rounds down to an integer"),
      example: "floor(@number);"
    },
    {
      name: "percentage",
      description: A("less.builtin.percentage", "converts to a %, e.g. 0.5 > 50%"),
      example: "percentage(@number);",
      type: "percentage"
    },
    {
      name: "round",
      description: A("less.builtin.round", "rounds a number to a number of places"),
      example: "round(number, [places: 0]);"
    },
    {
      name: "sqrt",
      description: A("less.builtin.sqrt", "calculates square root of a number"),
      example: "sqrt(number);"
    },
    {
      name: "sin",
      description: A("less.builtin.sin", "sine function"),
      example: "sin(number);"
    },
    {
      name: "tan",
      description: A("less.builtin.tan", "tangent function"),
      example: "tan(number);"
    },
    {
      name: "atan",
      description: A("less.builtin.atan", "arctangent - inverse of tangent function"),
      example: "atan(number);"
    },
    {
      name: "pi",
      description: A("less.builtin.pi", "returns pi"),
      example: "pi();"
    },
    {
      name: "pow",
      description: A("less.builtin.pow", "first argument raised to the power of the second argument"),
      example: "pow(@base, @exponent);"
    },
    {
      name: "mod",
      description: A("less.builtin.mod", "first argument modulus second argument"),
      example: "mod(number, number);"
    },
    {
      name: "min",
      description: A("less.builtin.min", "returns the lowest of one or more values"),
      example: "min(@x, @y);"
    },
    {
      name: "max",
      description: A("less.builtin.max", "returns the lowest of one or more values"),
      example: "max(@x, @y);"
    }
  ], e.colorProposals = [
    {
      name: "argb",
      example: "argb(@color);",
      description: A("less.builtin.argb", "creates a #AARRGGBB")
    },
    {
      name: "hsl",
      example: "hsl(@hue, @saturation, @lightness);",
      description: A("less.builtin.hsl", "creates a color")
    },
    {
      name: "hsla",
      example: "hsla(@hue, @saturation, @lightness, @alpha);",
      description: A("less.builtin.hsla", "creates a color")
    },
    {
      name: "hsv",
      example: "hsv(@hue, @saturation, @value);",
      description: A("less.builtin.hsv", "creates a color")
    },
    {
      name: "hsva",
      example: "hsva(@hue, @saturation, @value, @alpha);",
      description: A("less.builtin.hsva", "creates a color")
    },
    {
      name: "hue",
      example: "hue(@color);",
      description: A("less.builtin.hue", "returns the `hue` channel of `@color` in the HSL space")
    },
    {
      name: "saturation",
      example: "saturation(@color);",
      description: A("less.builtin.saturation", "returns the `saturation` channel of `@color` in the HSL space")
    },
    {
      name: "lightness",
      example: "lightness(@color);",
      description: A("less.builtin.lightness", "returns the `lightness` channel of `@color` in the HSL space")
    },
    {
      name: "hsvhue",
      example: "hsvhue(@color);",
      description: A("less.builtin.hsvhue", "returns the `hue` channel of `@color` in the HSV space")
    },
    {
      name: "hsvsaturation",
      example: "hsvsaturation(@color);",
      description: A("less.builtin.hsvsaturation", "returns the `saturation` channel of `@color` in the HSV space")
    },
    {
      name: "hsvvalue",
      example: "hsvvalue(@color);",
      description: A("less.builtin.hsvvalue", "returns the `value` channel of `@color` in the HSV space")
    },
    {
      name: "red",
      example: "red(@color);",
      description: A("less.builtin.red", "returns the `red` channel of `@color`")
    },
    {
      name: "green",
      example: "green(@color);",
      description: A("less.builtin.green", "returns the `green` channel of `@color`")
    },
    {
      name: "blue",
      example: "blue(@color);",
      description: A("less.builtin.blue", "returns the `blue` channel of `@color`")
    },
    {
      name: "alpha",
      example: "alpha(@color);",
      description: A("less.builtin.alpha", "returns the `alpha` channel of `@color`")
    },
    {
      name: "luma",
      example: "luma(@color);",
      description: A("less.builtin.luma", "returns the `luma` value (perceptual brightness) of `@color`")
    },
    {
      name: "saturate",
      example: "saturate(@color, 10%);",
      description: A("less.builtin.saturate", "return `@color` 10% points more saturated")
    },
    {
      name: "desaturate",
      example: "desaturate(@color, 10%);",
      description: A("less.builtin.desaturate", "return `@color` 10% points less saturated")
    },
    {
      name: "lighten",
      example: "lighten(@color, 10%);",
      description: A("less.builtin.lighten", "return `@color` 10% points lighter")
    },
    {
      name: "darken",
      example: "darken(@color, 10%);",
      description: A("less.builtin.darken", "return `@color` 10% points darker")
    },
    {
      name: "fadein",
      example: "fadein(@color, 10%);",
      description: A("less.builtin.fadein", "return `@color` 10% points less transparent")
    },
    {
      name: "fadeout",
      example: "fadeout(@color, 10%);",
      description: A("less.builtin.fadeout", "return `@color` 10% points more transparent")
    },
    {
      name: "fade",
      example: "fade(@color, 50%);",
      description: A("less.builtin.fade", "return `@color` with 50% transparency")
    },
    {
      name: "spin",
      example: "spin(@color, 10);",
      description: A("less.builtin.spin", "return `@color` with a 10 degree larger in hue")
    },
    {
      name: "mix",
      example: "mix(@color1, @color2, [@weight: 50%]);",
      description: A("less.builtin.mix", "return a mix of `@color1` and `@color2`")
    },
    {
      name: "greyscale",
      example: "greyscale(@color);",
      description: A("less.builtin.greyscale", "returns a grey, 100% desaturated color")
    },
    {
      name: "contrast",
      example: "contrast(@color1, [@darkcolor: black], [@lightcolor: white], [@threshold: 43%]);",
      description: A("less.builtin.contrast", "return `@darkcolor` if `@color1 is> 43% luma` otherwise return `@lightcolor`, see notes")
    },
    {
      name: "multiply",
      example: "multiply(@color1, @color2);"
    },
    {
      name: "screen",
      example: "screen(@color1, @color2);"
    },
    {
      name: "overlay",
      example: "overlay(@color1, @color2);"
    },
    {
      name: "softlight",
      example: "softlight(@color1, @color2);"
    },
    {
      name: "hardlight",
      example: "hardlight(@color1, @color2);"
    },
    {
      name: "difference",
      example: "difference(@color1, @color2);"
    },
    {
      name: "exclusion",
      example: "exclusion(@color1, @color2);"
    },
    {
      name: "average",
      example: "average(@color1, @color2);"
    },
    {
      name: "negation",
      example: "negation(@color1, @color2);"
    }
  ], e;
})(Zi);
var ga = globalThis && globalThis.__extends || function() {
  var r = function(e, t) {
    return r = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(i, n) {
      i.__proto__ = n;
    } || function(i, n) {
      for (var s in n)
        Object.prototype.hasOwnProperty.call(n, s) && (i[s] = n[s]);
    }, r(e, t);
  };
  return function(e, t) {
    if (typeof t != "function" && t !== null)
      throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
    r(e, t);
    function i() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (i.prototype = t.prototype, new i());
  };
}(), va = globalThis && globalThis.__awaiter || function(r, e, t, i) {
  function n(s) {
    return s instanceof t ? s : new t(function(a) {
      a(s);
    });
  }
  return new (t || (t = Promise))(function(s, a) {
    function o(h) {
      try {
        c(i.next(h));
      } catch (p) {
        a(p);
      }
    }
    function l(h) {
      try {
        c(i.throw(h));
      } catch (p) {
        a(p);
      }
    }
    function c(h) {
      h.done ? s(h.value) : n(h.value).then(o, l);
    }
    c((i = i.apply(r, e || [])).next());
  });
}, ya = globalThis && globalThis.__generator || function(r, e) {
  var t = { label: 0, sent: function() {
    if (s[0] & 1)
      throw s[1];
    return s[1];
  }, trys: [], ops: [] }, i, n, s, a;
  return a = { next: o(0), throw: o(1), return: o(2) }, typeof Symbol == "function" && (a[Symbol.iterator] = function() {
    return this;
  }), a;
  function o(c) {
    return function(h) {
      return l([c, h]);
    };
  }
  function l(c) {
    if (i)
      throw new TypeError("Generator is already executing.");
    for (; t; )
      try {
        if (i = 1, n && (s = c[0] & 2 ? n.return : c[0] ? n.throw || ((s = n.return) && s.call(n), 0) : n.next) && !(s = s.call(n, c[1])).done)
          return s;
        switch (n = 0, s && (c = [c[0] & 2, s.value]), c[0]) {
          case 0:
          case 1:
            s = c;
            break;
          case 4:
            return t.label++, { value: c[1], done: !1 };
          case 5:
            t.label++, n = c[1], c = [0];
            continue;
          case 7:
            c = t.ops.pop(), t.trys.pop();
            continue;
          default:
            if (s = t.trys, !(s = s.length > 0 && s[s.length - 1]) && (c[0] === 6 || c[0] === 2)) {
              t = 0;
              continue;
            }
            if (c[0] === 3 && (!s || c[1] > s[0] && c[1] < s[3])) {
              t.label = c[1];
              break;
            }
            if (c[0] === 6 && t.label < s[1]) {
              t.label = s[1], s = c;
              break;
            }
            if (s && t.label < s[2]) {
              t.label = s[2], t.ops.push(c);
              break;
            }
            s[2] && t.ops.pop(), t.trys.pop();
            continue;
        }
        c = e.call(r, t);
      } catch (h) {
        c = [6, h], n = 0;
      } finally {
        i = s = 0;
      }
    if (c[0] & 5)
      throw c[1];
    return { value: c[0] ? c[1] : void 0, done: !0 };
  }
};
(function(r) {
  ga(e, r);
  function e(t) {
    return r.call(this, t) || this;
  }
  return e.prototype.isRawStringDocumentLinkNode = function(t) {
    return r.prototype.isRawStringDocumentLinkNode.call(this, t) || t.type === f.Use || t.type === f.Forward;
  }, e.prototype.resolveRelativeReference = function(t, i, n, s) {
    return va(this, void 0, void 0, function() {
      function a(p) {
        if (p.path !== "" && !(p.path.endsWith(".scss") || p.path.endsWith(".css"))) {
          if (p.path.endsWith("/"))
            return [
              p.with({ path: p.path + "index.scss" }).toString(),
              p.with({ path: p.path + "_index.scss" }).toString()
            ];
          var y = p.path.split("/"), g = y[y.length - 1], b = p.path.slice(0, -g.length);
          if (g.startsWith("_"))
            return p.path.endsWith(".scss") ? void 0 : [p.with({ path: p.path + ".scss" }).toString()];
          var E = g + ".scss", _ = function(kt) {
            return p.with({ path: b + kt }).toString();
          }, M = _(E), B = _("_" + E), H = _(E.slice(0, -5) + "/index.scss"), Z = _(E.slice(0, -5) + "/_index.scss"), Q = _(E.slice(0, -5) + ".css");
          return [M, B, H, Z, Q];
        }
      }
      var o, l, c, h;
      return ya(this, function(p) {
        switch (p.label) {
          case 0:
            return J(t, "sass:") ? [2, void 0] : [4, r.prototype.resolveRelativeReference.call(this, t, i, n, s)];
          case 1:
            if (o = p.sent(), !(this.fileSystemProvider && o && s))
              return [3, 8];
            l = cr.parse(o), p.label = 2;
          case 2:
            if (p.trys.push([2, 7, , 8]), c = a(l), !c)
              return [3, 6];
            h = 0, p.label = 3;
          case 3:
            return h < c.length ? [4, this.fileExists(c[h])] : [3, 6];
          case 4:
            if (p.sent())
              return [2, c[h]];
            p.label = 5;
          case 5:
            return h++, [3, 3];
          case 6:
            return [3, 8];
          case 7:
            return p.sent(), [3, 8];
          case 8:
            return [2, o];
        }
      });
    });
  }, e;
})(qs);
var ba = (
  /** @class */
  function() {
    function r(e, t, i) {
      var n = this;
      this._languageId = e, this._worker = t, this._disposables = [], this._listener = /* @__PURE__ */ Object.create(null);
      var s = function(o) {
        var l = o.getModeId();
        if (l === n._languageId) {
          var c;
          n._listener[o.uri.toString()] = o.onDidChangeContent(function() {
            window.clearTimeout(c), c = window.setTimeout(function() {
              return n._doValidate(o.uri, l);
            }, 500);
          }), n._doValidate(o.uri, l);
        }
      }, a = function(o) {
        he.setModelMarkers(o, n._languageId, []);
        var l = o.uri.toString(), c = n._listener[l];
        c && (c.dispose(), delete n._listener[l]);
      };
      this._disposables.push(he.onDidCreateModel(s)), this._disposables.push(he.onWillDisposeModel(a)), this._disposables.push(he.onDidChangeModelLanguage(function(o) {
        a(o.model), s(o.model);
      })), i.onDidChange(function(o) {
        he.getModels().forEach(function(l) {
          l.getModeId() === n._languageId && (a(l), s(l));
        });
      }), this._disposables.push({
        dispose: function() {
          for (var o in n._listener)
            n._listener[o].dispose();
        }
      }), he.getModels().forEach(s);
    }
    return r.prototype.dispose = function() {
      this._disposables.forEach(function(e) {
        return e && e.dispose();
      }), this._disposables = [];
    }, r.prototype._doValidate = function(e, t) {
      this._worker(e).then(function(i) {
        return i.doValidation(e.toString());
      }).then(function(i) {
        var n = i.map(function(a) {
          return xa(e, a);
        }), s = he.getModel(e);
        s && s.getModeId() === t && he.setModelMarkers(s, t, n);
      }).then(void 0, function(i) {
        console.error(i);
      });
    }, r;
  }()
);
function Ca(r) {
  switch (r) {
    case Re.Error:
      return Me.Error;
    case Re.Warning:
      return Me.Warning;
    case Re.Information:
      return Me.Info;
    case Re.Hint:
      return Me.Hint;
    default:
      return Me.Info;
  }
}
function xa(r, e) {
  var t = typeof e.code == "number" ? String(e.code) : e.code;
  return {
    severity: Ca(e.severity),
    startLineNumber: e.range.start.line + 1,
    startColumn: e.range.start.character + 1,
    endLineNumber: e.range.end.line + 1,
    endColumn: e.range.end.character + 1,
    message: e.message,
    code: t,
    source: e.source
  };
}
function xe(r) {
  if (r)
    return { character: r.column - 1, line: r.lineNumber - 1 };
}
function ka(r) {
  if (r)
    return {
      start: {
        line: r.startLineNumber - 1,
        character: r.startColumn - 1
      },
      end: { line: r.endLineNumber - 1, character: r.endColumn - 1 }
    };
}
function ie(r) {
  if (r)
    return new Mi(r.start.line + 1, r.start.character + 1, r.end.line + 1, r.end.character + 1);
}
function wa(r) {
  return typeof r.insert < "u" && typeof r.replace < "u";
}
function _a(r) {
  var e = q.CompletionItemKind;
  switch (r) {
    case P.Text:
      return e.Text;
    case P.Method:
      return e.Method;
    case P.Function:
      return e.Function;
    case P.Constructor:
      return e.Constructor;
    case P.Field:
      return e.Field;
    case P.Variable:
      return e.Variable;
    case P.Class:
      return e.Class;
    case P.Interface:
      return e.Interface;
    case P.Module:
      return e.Module;
    case P.Property:
      return e.Property;
    case P.Unit:
      return e.Unit;
    case P.Value:
      return e.Value;
    case P.Enum:
      return e.Enum;
    case P.Keyword:
      return e.Keyword;
    case P.Snippet:
      return e.Snippet;
    case P.Color:
      return e.Color;
    case P.File:
      return e.File;
    case P.Reference:
      return e.Reference;
  }
  return e.Property;
}
function er(r) {
  if (r)
    return {
      range: ie(r.range),
      text: r.newText
    };
}
var Pa = (
  /** @class */
  function() {
    function r(e) {
      this._worker = e;
    }
    return Object.defineProperty(r.prototype, "triggerCharacters", {
      get: function() {
        return [" ", ":"];
      },
      enumerable: !1,
      configurable: !0
    }), r.prototype.provideCompletionItems = function(e, t, i, n) {
      var s = e.uri;
      return this._worker(s).then(function(a) {
        return a.doComplete(s.toString(), xe(t));
      }).then(function(a) {
        if (a) {
          var o = e.getWordUntilPosition(t), l = new Mi(t.lineNumber, o.startColumn, t.lineNumber, o.endColumn), c = a.items.map(function(h) {
            var p = {
              label: h.label,
              insertText: h.insertText || h.label,
              sortText: h.sortText,
              filterText: h.filterText,
              documentation: h.documentation,
              detail: h.detail,
              range: l,
              kind: _a(h.kind)
            };
            return h.textEdit && (wa(h.textEdit) ? p.range = {
              insert: ie(h.textEdit.insert),
              replace: ie(h.textEdit.replace)
            } : p.range = ie(h.textEdit.range), p.insertText = h.textEdit.newText), h.additionalTextEdits && (p.additionalTextEdits = h.additionalTextEdits.map(er)), h.insertTextFormat === te.Snippet && (p.insertTextRules = q.CompletionItemInsertTextRule.InsertAsSnippet), p;
          });
          return {
            isIncomplete: a.isIncomplete,
            suggestions: c
          };
        }
      });
    }, r;
  }()
);
function Sa(r) {
  return r && typeof r == "object" && typeof r.kind == "string";
}
function Di(r) {
  return typeof r == "string" ? {
    value: r
  } : Sa(r) ? r.kind === "plaintext" ? {
    value: r.value.replace(/[\\`*_{}[\]()#+\-.!]/g, "\\$&")
  } : {
    value: r.value
  } : { value: "```" + r.language + `
` + r.value + "\n```\n" };
}
function Ea(r) {
  if (r)
    return Array.isArray(r) ? r.map(Di) : [Di(r)];
}
var Ra = (
  /** @class */
  function() {
    function r(e) {
      this._worker = e;
    }
    return r.prototype.provideHover = function(e, t, i) {
      var n = e.uri;
      return this._worker(n).then(function(s) {
        return s.doHover(n.toString(), xe(t));
      }).then(function(s) {
        if (s)
          return {
            range: ie(s.range),
            contents: Ea(s.contents)
          };
      });
    }, r;
  }()
);
function Aa(r) {
  switch (r) {
    case fe.Read:
      return q.DocumentHighlightKind.Read;
    case fe.Write:
      return q.DocumentHighlightKind.Write;
    case fe.Text:
      return q.DocumentHighlightKind.Text;
  }
  return q.DocumentHighlightKind.Text;
}
var Ia = (
  /** @class */
  function() {
    function r(e) {
      this._worker = e;
    }
    return r.prototype.provideDocumentHighlights = function(e, t, i) {
      var n = e.uri;
      return this._worker(n).then(function(s) {
        return s.findDocumentHighlights(n.toString(), xe(t));
      }).then(function(s) {
        if (s)
          return s.map(function(a) {
            return {
              range: ie(a.range),
              kind: Aa(a.kind)
            };
          });
      });
    }, r;
  }()
);
function on(r) {
  return {
    uri: Oi.parse(r.uri),
    range: ie(r.range)
  };
}
var Da = (
  /** @class */
  function() {
    function r(e) {
      this._worker = e;
    }
    return r.prototype.provideDefinition = function(e, t, i) {
      var n = e.uri;
      return this._worker(n).then(function(s) {
        return s.findDefinition(n.toString(), xe(t));
      }).then(function(s) {
        if (s)
          return [on(s)];
      });
    }, r;
  }()
), Fa = (
  /** @class */
  function() {
    function r(e) {
      this._worker = e;
    }
    return r.prototype.provideReferences = function(e, t, i, n) {
      var s = e.uri;
      return this._worker(s).then(function(a) {
        return a.findReferences(s.toString(), xe(t));
      }).then(function(a) {
        if (a)
          return a.map(on);
      });
    }, r;
  }()
);
function Ma(r) {
  if (!(!r || !r.changes)) {
    var e = [];
    for (var t in r.changes)
      for (var i = Oi.parse(t), n = 0, s = r.changes[t]; n < s.length; n++) {
        var a = s[n];
        e.push({
          resource: i,
          edit: {
            range: ie(a.range),
            text: a.newText
          }
        });
      }
    return {
      edits: e
    };
  }
}
var Oa = (
  /** @class */
  function() {
    function r(e) {
      this._worker = e;
    }
    return r.prototype.provideRenameEdits = function(e, t, i, n) {
      var s = e.uri;
      return this._worker(s).then(function(a) {
        return a.doRename(s.toString(), xe(t), i);
      }).then(function(a) {
        return Ma(a);
      });
    }, r;
  }()
);
function La(r) {
  var e = q.SymbolKind;
  switch (r) {
    case j.File:
      return e.Array;
    case j.Module:
      return e.Module;
    case j.Namespace:
      return e.Namespace;
    case j.Package:
      return e.Package;
    case j.Class:
      return e.Class;
    case j.Method:
      return e.Method;
    case j.Property:
      return e.Property;
    case j.Field:
      return e.Field;
    case j.Constructor:
      return e.Constructor;
    case j.Enum:
      return e.Enum;
    case j.Interface:
      return e.Interface;
    case j.Function:
      return e.Function;
    case j.Variable:
      return e.Variable;
    case j.Constant:
      return e.Constant;
    case j.String:
      return e.String;
    case j.Number:
      return e.Number;
    case j.Boolean:
      return e.Boolean;
    case j.Array:
      return e.Array;
  }
  return e.Function;
}
var $a = (
  /** @class */
  function() {
    function r(e) {
      this._worker = e;
    }
    return r.prototype.provideDocumentSymbols = function(e, t) {
      var i = e.uri;
      return this._worker(i).then(function(n) {
        return n.findDocumentSymbols(i.toString());
      }).then(function(n) {
        if (n)
          return n.map(function(s) {
            return {
              name: s.name,
              detail: "",
              containerName: s.containerName,
              kind: La(s.kind),
              tags: [],
              range: ie(s.location.range),
              selectionRange: ie(s.location.range)
            };
          });
      });
    }, r;
  }()
), Va = (
  /** @class */
  function() {
    function r(e) {
      this._worker = e;
    }
    return r.prototype.provideDocumentColors = function(e, t) {
      var i = e.uri;
      return this._worker(i).then(function(n) {
        return n.findDocumentColors(i.toString());
      }).then(function(n) {
        if (n)
          return n.map(function(s) {
            return {
              color: s.color,
              range: ie(s.range)
            };
          });
      });
    }, r.prototype.provideColorPresentations = function(e, t, i) {
      var n = e.uri;
      return this._worker(n).then(function(s) {
        return s.getColorPresentations(n.toString(), t.color, ka(t.range));
      }).then(function(s) {
        if (s)
          return s.map(function(a) {
            var o = {
              label: a.label
            };
            return a.textEdit && (o.textEdit = er(a.textEdit)), a.additionalTextEdits && (o.additionalTextEdits = a.additionalTextEdits.map(er)), o;
          });
      });
    }, r;
  }()
), Ba = (
  /** @class */
  function() {
    function r(e) {
      this._worker = e;
    }
    return r.prototype.provideFoldingRanges = function(e, t, i) {
      var n = e.uri;
      return this._worker(n).then(function(s) {
        return s.getFoldingRanges(n.toString(), t);
      }).then(function(s) {
        if (s)
          return s.map(function(a) {
            var o = {
              start: a.startLine + 1,
              end: a.endLine + 1
            };
            return typeof a.kind < "u" && (o.kind = ja(a.kind)), o;
          });
      });
    }, r;
  }()
);
function ja(r) {
  switch (r) {
    case Ue.Comment:
      return q.FoldingRangeKind.Comment;
    case Ue.Imports:
      return q.FoldingRangeKind.Imports;
    case Ue.Region:
      return q.FoldingRangeKind.Region;
  }
}
var Wa = (
  /** @class */
  function() {
    function r(e) {
      this._worker = e;
    }
    return r.prototype.provideSelectionRanges = function(e, t, i) {
      var n = e.uri;
      return this._worker(n).then(function(s) {
        return s.getSelectionRanges(n.toString(), t.map(xe));
      }).then(function(s) {
        if (s)
          return s.map(function(a) {
            for (var o = []; a; )
              o.push({ range: ie(a.range) }), a = a.parent;
            return o;
          });
      });
    }, r;
  }()
);
function qa(r) {
  var e = [], t = [], i = new ln(r);
  e.push(i);
  var n = function() {
    for (var a = [], o = 0; o < arguments.length; o++)
      a[o] = arguments[o];
    return i.getLanguageServiceWorker.apply(i, a);
  };
  function s() {
    var a = r.languageId, o = r.modeConfiguration;
    un(t), o.completionItems && t.push(q.registerCompletionItemProvider(a, new Pa(n))), o.hovers && t.push(q.registerHoverProvider(a, new Ra(n))), o.documentHighlights && t.push(q.registerDocumentHighlightProvider(a, new Ia(n))), o.definitions && t.push(q.registerDefinitionProvider(a, new Da(n))), o.references && t.push(q.registerReferenceProvider(a, new Fa(n))), o.documentSymbols && t.push(q.registerDocumentSymbolProvider(a, new $a(n))), o.rename && t.push(q.registerRenameProvider(a, new Oa(n))), o.colors && t.push(q.registerColorProvider(a, new Va(n))), o.foldingRanges && t.push(q.registerFoldingRangeProvider(a, new Ba(n))), o.diagnostics && t.push(new ba(a, n, r)), o.selectionRanges && t.push(q.registerSelectionRangeProvider(a, new Wa(n)));
  }
  return s(), e.push(Fi(t)), Fi(e);
}
function Fi(r) {
  return { dispose: function() {
    return un(r);
  } };
}
function un(r) {
  for (; r.length; )
    r.pop().dispose();
}
export {
  qa as setupMode
};
