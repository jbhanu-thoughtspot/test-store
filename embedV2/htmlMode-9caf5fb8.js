import { g_ as Ce, gV as ce, x as N, gZ as Te } from "./libs-0c2ad75d.js";
import "https://cdn.skypack.dev/pin/react@v17.0.1-yH0aYV1FOvoIPeKBbHxg/mode=imports,min/optimized/react.js";
import "https://cdn.skypack.dev/pin/react-dom@v17.0.1-oZ1BXZ5opQ1DbTh7nu9r/mode=imports,min/optimized/react-dom.js";
import "https://cdn.skypack.dev/pin/react-dom@v17.0.1-oZ1BXZ5opQ1DbTh7nu9r/dist=es2020,mode=imports,min/unoptimized/cjs/react-dom-server.browser.production.min.js";
var Oe = 2 * 60 * 1e3, le = (
  /** @class */
  function() {
    function n(_) {
      var u = this;
      this._defaults = _, this._worker = null, this._idleCheckInterval = setInterval(function() {
        return u._checkIfIdle();
      }, 30 * 1e3), this._lastUsedTime = 0, this._configChangeListener = this._defaults.onDidChange(function() {
        return u._stopWorker();
      });
    }
    return n.prototype._stopWorker = function() {
      this._worker && (this._worker.dispose(), this._worker = null), this._client = null;
    }, n.prototype.dispose = function() {
      clearInterval(this._idleCheckInterval), this._configChangeListener.dispose(), this._stopWorker();
    }, n.prototype._checkIfIdle = function() {
      if (this._worker) {
        var _ = Date.now() - this._lastUsedTime;
        _ > Oe && this._stopWorker();
      }
    }, n.prototype._getClient = function() {
      return this._lastUsedTime = Date.now(), this._client || (this._worker = Ce.createWebWorker({
        // module that exports the create() method and returns a `HTMLWorker` instance
        moduleId: "vs/language/html/htmlWorker",
        // passed in to the create() method
        createData: {
          languageSettings: this._defaults.options,
          languageId: this._defaults.languageId
        },
        label: this._defaults.languageId
      }), this._client = this._worker.getProxy()), this._client;
    }, n.prototype.getLanguageServiceWorker = function() {
      for (var _ = this, u = [], s = 0; s < arguments.length; s++)
        u[s] = arguments[s];
      var t;
      return this._getClient().then(function(i) {
        t = i;
      }).then(function(i) {
        return _._worker.withSyncedResources(u);
      }).then(function(i) {
        return t;
      });
    }, n;
  }()
), At;
(function(n) {
  n.MIN_VALUE = -2147483648, n.MAX_VALUE = 2147483647;
})(At || (At = {}));
var ht;
(function(n) {
  n.MIN_VALUE = 0, n.MAX_VALUE = 2147483647;
})(ht || (ht = {}));
var Q;
(function(n) {
  function _(s, t) {
    return s === Number.MAX_VALUE && (s = ht.MAX_VALUE), t === Number.MAX_VALUE && (t = ht.MAX_VALUE), { line: s, character: t };
  }
  n.create = _;
  function u(s) {
    var t = s;
    return g.objectLiteral(t) && g.uinteger(t.line) && g.uinteger(t.character);
  }
  n.is = u;
})(Q || (Q = {}));
var V;
(function(n) {
  function _(s, t, i, a) {
    if (g.uinteger(s) && g.uinteger(t) && g.uinteger(i) && g.uinteger(a))
      return { start: Q.create(s, t), end: Q.create(i, a) };
    if (Q.is(s) && Q.is(t))
      return { start: s, end: t };
    throw new Error("Range#create called with invalid arguments[" + s + ", " + t + ", " + i + ", " + a + "]");
  }
  n.create = _;
  function u(s) {
    var t = s;
    return g.objectLiteral(t) && Q.is(t.start) && Q.is(t.end);
  }
  n.is = u;
})(V || (V = {}));
var dt;
(function(n) {
  function _(s, t) {
    return { uri: s, range: t };
  }
  n.create = _;
  function u(s) {
    var t = s;
    return g.defined(t) && V.is(t.range) && (g.string(t.uri) || g.undefined(t.uri));
  }
  n.is = u;
})(dt || (dt = {}));
var Et;
(function(n) {
  function _(s, t, i, a) {
    return { targetUri: s, targetRange: t, targetSelectionRange: i, originSelectionRange: a };
  }
  n.create = _;
  function u(s) {
    var t = s;
    return g.defined(t) && V.is(t.targetRange) && g.string(t.targetUri) && (V.is(t.targetSelectionRange) || g.undefined(t.targetSelectionRange)) && (V.is(t.originSelectionRange) || g.undefined(t.originSelectionRange));
  }
  n.is = u;
})(Et || (Et = {}));
var gt;
(function(n) {
  function _(s, t, i, a) {
    return {
      red: s,
      green: t,
      blue: i,
      alpha: a
    };
  }
  n.create = _;
  function u(s) {
    var t = s;
    return g.numberRange(t.red, 0, 1) && g.numberRange(t.green, 0, 1) && g.numberRange(t.blue, 0, 1) && g.numberRange(t.alpha, 0, 1);
  }
  n.is = u;
})(gt || (gt = {}));
var kt;
(function(n) {
  function _(s, t) {
    return {
      range: s,
      color: t
    };
  }
  n.create = _;
  function u(s) {
    var t = s;
    return V.is(t.range) && gt.is(t.color);
  }
  n.is = u;
})(kt || (kt = {}));
var Ct;
(function(n) {
  function _(s, t, i) {
    return {
      label: s,
      textEdit: t,
      additionalTextEdits: i
    };
  }
  n.create = _;
  function u(s) {
    var t = s;
    return g.string(t.label) && (g.undefined(t.textEdit) || J.is(t)) && (g.undefined(t.additionalTextEdits) || g.typedArray(t.additionalTextEdits, J.is));
  }
  n.is = u;
})(Ct || (Ct = {}));
var nt;
(function(n) {
  n.Comment = "comment", n.Imports = "imports", n.Region = "region";
})(nt || (nt = {}));
var Tt;
(function(n) {
  function _(s, t, i, a, e) {
    var o = {
      startLine: s,
      endLine: t
    };
    return g.defined(i) && (o.startCharacter = i), g.defined(a) && (o.endCharacter = a), g.defined(e) && (o.kind = e), o;
  }
  n.create = _;
  function u(s) {
    var t = s;
    return g.uinteger(t.startLine) && g.uinteger(t.startLine) && (g.undefined(t.startCharacter) || g.uinteger(t.startCharacter)) && (g.undefined(t.endCharacter) || g.uinteger(t.endCharacter)) && (g.undefined(t.kind) || g.string(t.kind));
  }
  n.is = u;
})(Tt || (Tt = {}));
var vt;
(function(n) {
  function _(s, t) {
    return {
      location: s,
      message: t
    };
  }
  n.create = _;
  function u(s) {
    var t = s;
    return g.defined(t) && dt.is(t.location) && g.string(t.message);
  }
  n.is = u;
})(vt || (vt = {}));
var Ot;
(function(n) {
  n.Error = 1, n.Warning = 2, n.Information = 3, n.Hint = 4;
})(Ot || (Ot = {}));
var Pt;
(function(n) {
  n.Unnecessary = 1, n.Deprecated = 2;
})(Pt || (Pt = {}));
var jt;
(function(n) {
  function _(u) {
    var s = u;
    return s != null && g.string(s.href);
  }
  n.is = _;
})(jt || (jt = {}));
var ct;
(function(n) {
  function _(s, t, i, a, e, o) {
    var r = { range: s, message: t };
    return g.defined(i) && (r.severity = i), g.defined(a) && (r.code = a), g.defined(e) && (r.source = e), g.defined(o) && (r.relatedInformation = o), r;
  }
  n.create = _;
  function u(s) {
    var t, i = s;
    return g.defined(i) && V.is(i.range) && g.string(i.message) && (g.number(i.severity) || g.undefined(i.severity)) && (g.integer(i.code) || g.string(i.code) || g.undefined(i.code)) && (g.undefined(i.codeDescription) || g.string((t = i.codeDescription) === null || t === void 0 ? void 0 : t.href)) && (g.string(i.source) || g.undefined(i.source)) && (g.undefined(i.relatedInformation) || g.typedArray(i.relatedInformation, vt.is));
  }
  n.is = u;
})(ct || (ct = {}));
var rt;
(function(n) {
  function _(s, t) {
    for (var i = [], a = 2; a < arguments.length; a++)
      i[a - 2] = arguments[a];
    var e = { title: s, command: t };
    return g.defined(i) && i.length > 0 && (e.arguments = i), e;
  }
  n.create = _;
  function u(s) {
    var t = s;
    return g.defined(t) && g.string(t.title) && g.string(t.command);
  }
  n.is = u;
})(rt || (rt = {}));
var J;
(function(n) {
  function _(i, a) {
    return { range: i, newText: a };
  }
  n.replace = _;
  function u(i, a) {
    return { range: { start: i, end: i }, newText: a };
  }
  n.insert = u;
  function s(i) {
    return { range: i, newText: "" };
  }
  n.del = s;
  function t(i) {
    var a = i;
    return g.objectLiteral(a) && g.string(a.newText) && V.is(a.range);
  }
  n.is = t;
})(J || (J = {}));
var et;
(function(n) {
  function _(s, t, i) {
    var a = { label: s };
    return t !== void 0 && (a.needsConfirmation = t), i !== void 0 && (a.description = i), a;
  }
  n.create = _;
  function u(s) {
    var t = s;
    return t !== void 0 && g.objectLiteral(t) && g.string(t.label) && (g.boolean(t.needsConfirmation) || t.needsConfirmation === void 0) && (g.string(t.description) || t.description === void 0);
  }
  n.is = u;
})(et || (et = {}));
var $;
(function(n) {
  function _(u) {
    var s = u;
    return typeof s == "string";
  }
  n.is = _;
})($ || ($ = {}));
var Y;
(function(n) {
  function _(i, a, e) {
    return { range: i, newText: a, annotationId: e };
  }
  n.replace = _;
  function u(i, a, e) {
    return { range: { start: i, end: i }, newText: a, annotationId: e };
  }
  n.insert = u;
  function s(i, a) {
    return { range: i, newText: "", annotationId: a };
  }
  n.del = s;
  function t(i) {
    var a = i;
    return J.is(a) && (et.is(a.annotationId) || $.is(a.annotationId));
  }
  n.is = t;
})(Y || (Y = {}));
var lt;
(function(n) {
  function _(s, t) {
    return { textDocument: s, edits: t };
  }
  n.create = _;
  function u(s) {
    var t = s;
    return g.defined(t) && pt.is(t.textDocument) && Array.isArray(t.edits);
  }
  n.is = u;
})(lt || (lt = {}));
var st;
(function(n) {
  function _(s, t, i) {
    var a = {
      kind: "create",
      uri: s
    };
    return t !== void 0 && (t.overwrite !== void 0 || t.ignoreIfExists !== void 0) && (a.options = t), i !== void 0 && (a.annotationId = i), a;
  }
  n.create = _;
  function u(s) {
    var t = s;
    return t && t.kind === "create" && g.string(t.uri) && (t.options === void 0 || (t.options.overwrite === void 0 || g.boolean(t.options.overwrite)) && (t.options.ignoreIfExists === void 0 || g.boolean(t.options.ignoreIfExists))) && (t.annotationId === void 0 || $.is(t.annotationId));
  }
  n.is = u;
})(st || (st = {}));
var at;
(function(n) {
  function _(s, t, i, a) {
    var e = {
      kind: "rename",
      oldUri: s,
      newUri: t
    };
    return i !== void 0 && (i.overwrite !== void 0 || i.ignoreIfExists !== void 0) && (e.options = i), a !== void 0 && (e.annotationId = a), e;
  }
  n.create = _;
  function u(s) {
    var t = s;
    return t && t.kind === "rename" && g.string(t.oldUri) && g.string(t.newUri) && (t.options === void 0 || (t.options.overwrite === void 0 || g.boolean(t.options.overwrite)) && (t.options.ignoreIfExists === void 0 || g.boolean(t.options.ignoreIfExists))) && (t.annotationId === void 0 || $.is(t.annotationId));
  }
  n.is = u;
})(at || (at = {}));
var ot;
(function(n) {
  function _(s, t, i) {
    var a = {
      kind: "delete",
      uri: s
    };
    return t !== void 0 && (t.recursive !== void 0 || t.ignoreIfNotExists !== void 0) && (a.options = t), i !== void 0 && (a.annotationId = i), a;
  }
  n.create = _;
  function u(s) {
    var t = s;
    return t && t.kind === "delete" && g.string(t.uri) && (t.options === void 0 || (t.options.recursive === void 0 || g.boolean(t.options.recursive)) && (t.options.ignoreIfNotExists === void 0 || g.boolean(t.options.ignoreIfNotExists))) && (t.annotationId === void 0 || $.is(t.annotationId));
  }
  n.is = u;
})(ot || (ot = {}));
var mt;
(function(n) {
  function _(u) {
    var s = u;
    return s && (s.changes !== void 0 || s.documentChanges !== void 0) && (s.documentChanges === void 0 || s.documentChanges.every(function(t) {
      return g.string(t.kind) ? st.is(t) || at.is(t) || ot.is(t) : lt.is(t);
    }));
  }
  n.is = _;
})(mt || (mt = {}));
var ut = (
  /** @class */
  function() {
    function n(_, u) {
      this.edits = _, this.changeAnnotations = u;
    }
    return n.prototype.insert = function(_, u, s) {
      var t, i;
      if (s === void 0 ? t = J.insert(_, u) : $.is(s) ? (i = s, t = Y.insert(_, u, s)) : (this.assertChangeAnnotations(this.changeAnnotations), i = this.changeAnnotations.manage(s), t = Y.insert(_, u, i)), this.edits.push(t), i !== void 0)
        return i;
    }, n.prototype.replace = function(_, u, s) {
      var t, i;
      if (s === void 0 ? t = J.replace(_, u) : $.is(s) ? (i = s, t = Y.replace(_, u, s)) : (this.assertChangeAnnotations(this.changeAnnotations), i = this.changeAnnotations.manage(s), t = Y.replace(_, u, i)), this.edits.push(t), i !== void 0)
        return i;
    }, n.prototype.delete = function(_, u) {
      var s, t;
      if (u === void 0 ? s = J.del(_) : $.is(u) ? (t = u, s = Y.del(_, u)) : (this.assertChangeAnnotations(this.changeAnnotations), t = this.changeAnnotations.manage(u), s = Y.del(_, t)), this.edits.push(s), t !== void 0)
        return t;
    }, n.prototype.add = function(_) {
      this.edits.push(_);
    }, n.prototype.all = function() {
      return this.edits;
    }, n.prototype.clear = function() {
      this.edits.splice(0, this.edits.length);
    }, n.prototype.assertChangeAnnotations = function(_) {
      if (_ === void 0)
        throw new Error("Text edit change is not configured to manage change annotations.");
    }, n;
  }()
), It = (
  /** @class */
  function() {
    function n(_) {
      this._annotations = _ === void 0 ? /* @__PURE__ */ Object.create(null) : _, this._counter = 0, this._size = 0;
    }
    return n.prototype.all = function() {
      return this._annotations;
    }, Object.defineProperty(n.prototype, "size", {
      get: function() {
        return this._size;
      },
      enumerable: !1,
      configurable: !0
    }), n.prototype.manage = function(_, u) {
      var s;
      if ($.is(_) ? s = _ : (s = this.nextId(), u = _), this._annotations[s] !== void 0)
        throw new Error("Id " + s + " is already in use.");
      if (u === void 0)
        throw new Error("No annotation provided for id " + s);
      return this._annotations[s] = u, this._size++, s;
    }, n.prototype.nextId = function() {
      return this._counter++, this._counter.toString();
    }, n;
  }()
);
(function() {
  function n(_) {
    var u = this;
    this._textEditChanges = /* @__PURE__ */ Object.create(null), _ !== void 0 ? (this._workspaceEdit = _, _.documentChanges ? (this._changeAnnotations = new It(_.changeAnnotations), _.changeAnnotations = this._changeAnnotations.all(), _.documentChanges.forEach(function(s) {
      if (lt.is(s)) {
        var t = new ut(s.edits, u._changeAnnotations);
        u._textEditChanges[s.textDocument.uri] = t;
      }
    })) : _.changes && Object.keys(_.changes).forEach(function(s) {
      var t = new ut(_.changes[s]);
      u._textEditChanges[s] = t;
    })) : this._workspaceEdit = {};
  }
  return Object.defineProperty(n.prototype, "edit", {
    /**
     * Returns the underlying [WorkspaceEdit](#WorkspaceEdit) literal
     * use to be returned from a workspace edit operation like rename.
     */
    get: function() {
      return this.initDocumentChanges(), this._changeAnnotations !== void 0 && (this._changeAnnotations.size === 0 ? this._workspaceEdit.changeAnnotations = void 0 : this._workspaceEdit.changeAnnotations = this._changeAnnotations.all()), this._workspaceEdit;
    },
    enumerable: !1,
    configurable: !0
  }), n.prototype.getTextEditChange = function(_) {
    if (pt.is(_)) {
      if (this.initDocumentChanges(), this._workspaceEdit.documentChanges === void 0)
        throw new Error("Workspace edit is not configured for document changes.");
      var u = { uri: _.uri, version: _.version }, s = this._textEditChanges[u.uri];
      if (!s) {
        var t = [], i = {
          textDocument: u,
          edits: t
        };
        this._workspaceEdit.documentChanges.push(i), s = new ut(t, this._changeAnnotations), this._textEditChanges[u.uri] = s;
      }
      return s;
    } else {
      if (this.initChanges(), this._workspaceEdit.changes === void 0)
        throw new Error("Workspace edit is not configured for normal text edit changes.");
      var s = this._textEditChanges[_];
      if (!s) {
        var t = [];
        this._workspaceEdit.changes[_] = t, s = new ut(t), this._textEditChanges[_] = s;
      }
      return s;
    }
  }, n.prototype.initDocumentChanges = function() {
    this._workspaceEdit.documentChanges === void 0 && this._workspaceEdit.changes === void 0 && (this._changeAnnotations = new It(), this._workspaceEdit.documentChanges = [], this._workspaceEdit.changeAnnotations = this._changeAnnotations.all());
  }, n.prototype.initChanges = function() {
    this._workspaceEdit.documentChanges === void 0 && this._workspaceEdit.changes === void 0 && (this._workspaceEdit.changes = /* @__PURE__ */ Object.create(null));
  }, n.prototype.createFile = function(_, u, s) {
    if (this.initDocumentChanges(), this._workspaceEdit.documentChanges === void 0)
      throw new Error("Workspace edit is not configured for document changes.");
    var t;
    et.is(u) || $.is(u) ? t = u : s = u;
    var i, a;
    if (t === void 0 ? i = st.create(_, s) : (a = $.is(t) ? t : this._changeAnnotations.manage(t), i = st.create(_, s, a)), this._workspaceEdit.documentChanges.push(i), a !== void 0)
      return a;
  }, n.prototype.renameFile = function(_, u, s, t) {
    if (this.initDocumentChanges(), this._workspaceEdit.documentChanges === void 0)
      throw new Error("Workspace edit is not configured for document changes.");
    var i;
    et.is(s) || $.is(s) ? i = s : t = s;
    var a, e;
    if (i === void 0 ? a = at.create(_, u, t) : (e = $.is(i) ? i : this._changeAnnotations.manage(i), a = at.create(_, u, t, e)), this._workspaceEdit.documentChanges.push(a), e !== void 0)
      return e;
  }, n.prototype.deleteFile = function(_, u, s) {
    if (this.initDocumentChanges(), this._workspaceEdit.documentChanges === void 0)
      throw new Error("Workspace edit is not configured for document changes.");
    var t;
    et.is(u) || $.is(u) ? t = u : s = u;
    var i, a;
    if (t === void 0 ? i = ot.create(_, s) : (a = $.is(t) ? t : this._changeAnnotations.manage(t), i = ot.create(_, s, a)), this._workspaceEdit.documentChanges.push(i), a !== void 0)
      return a;
  }, n;
})();
var St;
(function(n) {
  function _(s) {
    return { uri: s };
  }
  n.create = _;
  function u(s) {
    var t = s;
    return g.defined(t) && g.string(t.uri);
  }
  n.is = u;
})(St || (St = {}));
var Rt;
(function(n) {
  function _(s, t) {
    return { uri: s, version: t };
  }
  n.create = _;
  function u(s) {
    var t = s;
    return g.defined(t) && g.string(t.uri) && g.integer(t.version);
  }
  n.is = u;
})(Rt || (Rt = {}));
var pt;
(function(n) {
  function _(s, t) {
    return { uri: s, version: t };
  }
  n.create = _;
  function u(s) {
    var t = s;
    return g.defined(t) && g.string(t.uri) && (t.version === null || g.integer(t.version));
  }
  n.is = u;
})(pt || (pt = {}));
var Nt;
(function(n) {
  function _(s, t, i, a) {
    return { uri: s, languageId: t, version: i, text: a };
  }
  n.create = _;
  function u(s) {
    var t = s;
    return g.defined(t) && g.string(t.uri) && g.string(t.languageId) && g.integer(t.version) && g.string(t.text);
  }
  n.is = u;
})(Nt || (Nt = {}));
var Z;
(function(n) {
  n.PlainText = "plaintext", n.Markdown = "markdown";
})(Z || (Z = {}));
(function(n) {
  function _(u) {
    var s = u;
    return s === n.PlainText || s === n.Markdown;
  }
  n.is = _;
})(Z || (Z = {}));
var yt;
(function(n) {
  function _(u) {
    var s = u;
    return g.objectLiteral(u) && Z.is(s.kind) && g.string(s.value);
  }
  n.is = _;
})(yt || (yt = {}));
var M;
(function(n) {
  n.Text = 1, n.Method = 2, n.Function = 3, n.Constructor = 4, n.Field = 5, n.Variable = 6, n.Class = 7, n.Interface = 8, n.Module = 9, n.Property = 10, n.Unit = 11, n.Value = 12, n.Enum = 13, n.Keyword = 14, n.Snippet = 15, n.Color = 16, n.File = 17, n.Reference = 18, n.Folder = 19, n.EnumMember = 20, n.Constant = 21, n.Struct = 22, n.Event = 23, n.Operator = 24, n.TypeParameter = 25;
})(M || (M = {}));
var wt;
(function(n) {
  n.PlainText = 1, n.Snippet = 2;
})(wt || (wt = {}));
var Ut;
(function(n) {
  n.Deprecated = 1;
})(Ut || (Ut = {}));
var Lt;
(function(n) {
  function _(s, t, i) {
    return { newText: s, insert: t, replace: i };
  }
  n.create = _;
  function u(s) {
    var t = s;
    return t && g.string(t.newText) && V.is(t.insert) && V.is(t.replace);
  }
  n.is = u;
})(Lt || (Lt = {}));
var zt;
(function(n) {
  n.asIs = 1, n.adjustIndentation = 2;
})(zt || (zt = {}));
var Dt;
(function(n) {
  function _(u) {
    return { label: u };
  }
  n.create = _;
})(Dt || (Dt = {}));
var Wt;
(function(n) {
  function _(u, s) {
    return { items: u || [], isIncomplete: !!s };
  }
  n.create = _;
})(Wt || (Wt = {}));
var ft;
(function(n) {
  function _(s) {
    return s.replace(/[\\`*_{}[\]()#+\-.!]/g, "\\$&");
  }
  n.fromPlainText = _;
  function u(s) {
    var t = s;
    return g.string(t) || g.objectLiteral(t) && g.string(t.language) && g.string(t.value);
  }
  n.is = u;
})(ft || (ft = {}));
var Mt;
(function(n) {
  function _(u) {
    var s = u;
    return !!s && g.objectLiteral(s) && (yt.is(s.contents) || ft.is(s.contents) || g.typedArray(s.contents, ft.is)) && (u.range === void 0 || V.is(u.range));
  }
  n.is = _;
})(Mt || (Mt = {}));
var Ft;
(function(n) {
  function _(u, s) {
    return s ? { label: u, documentation: s } : { label: u };
  }
  n.create = _;
})(Ft || (Ft = {}));
var Bt;
(function(n) {
  function _(u, s) {
    for (var t = [], i = 2; i < arguments.length; i++)
      t[i - 2] = arguments[i];
    var a = { label: u };
    return g.defined(s) && (a.documentation = s), g.defined(t) ? a.parameters = t : a.parameters = [], a;
  }
  n.create = _;
})(Bt || (Bt = {}));
var it;
(function(n) {
  n.Text = 1, n.Read = 2, n.Write = 3;
})(it || (it = {}));
var Vt;
(function(n) {
  function _(u, s) {
    var t = { range: u };
    return g.number(s) && (t.kind = s), t;
  }
  n.create = _;
})(Vt || (Vt = {}));
var F;
(function(n) {
  n.File = 1, n.Module = 2, n.Namespace = 3, n.Package = 4, n.Class = 5, n.Method = 6, n.Property = 7, n.Field = 8, n.Constructor = 9, n.Enum = 10, n.Interface = 11, n.Function = 12, n.Variable = 13, n.Constant = 14, n.String = 15, n.Number = 16, n.Boolean = 17, n.Array = 18, n.Object = 19, n.Key = 20, n.Null = 21, n.EnumMember = 22, n.Struct = 23, n.Event = 24, n.Operator = 25, n.TypeParameter = 26;
})(F || (F = {}));
var Gt;
(function(n) {
  n.Deprecated = 1;
})(Gt || (Gt = {}));
var $t;
(function(n) {
  function _(u, s, t, i, a) {
    var e = {
      name: u,
      kind: s,
      location: { uri: i, range: t }
    };
    return a && (e.containerName = a), e;
  }
  n.create = _;
})($t || ($t = {}));
var Ht;
(function(n) {
  function _(s, t, i, a, e, o) {
    var r = {
      name: s,
      detail: t,
      kind: i,
      range: a,
      selectionRange: e
    };
    return o !== void 0 && (r.children = o), r;
  }
  n.create = _;
  function u(s) {
    var t = s;
    return t && g.string(t.name) && g.number(t.kind) && V.is(t.range) && V.is(t.selectionRange) && (t.detail === void 0 || g.string(t.detail)) && (t.deprecated === void 0 || g.boolean(t.deprecated)) && (t.children === void 0 || Array.isArray(t.children)) && (t.tags === void 0 || Array.isArray(t.tags));
  }
  n.is = u;
})(Ht || (Ht = {}));
var Xt;
(function(n) {
  n.Empty = "", n.QuickFix = "quickfix", n.Refactor = "refactor", n.RefactorExtract = "refactor.extract", n.RefactorInline = "refactor.inline", n.RefactorRewrite = "refactor.rewrite", n.Source = "source", n.SourceOrganizeImports = "source.organizeImports", n.SourceFixAll = "source.fixAll";
})(Xt || (Xt = {}));
var Qt;
(function(n) {
  function _(s, t) {
    var i = { diagnostics: s };
    return t != null && (i.only = t), i;
  }
  n.create = _;
  function u(s) {
    var t = s;
    return g.defined(t) && g.typedArray(t.diagnostics, ct.is) && (t.only === void 0 || g.typedArray(t.only, g.string));
  }
  n.is = u;
})(Qt || (Qt = {}));
var qt;
(function(n) {
  function _(s, t, i) {
    var a = { title: s }, e = !0;
    return typeof t == "string" ? (e = !1, a.kind = t) : rt.is(t) ? a.command = t : a.edit = t, e && i !== void 0 && (a.kind = i), a;
  }
  n.create = _;
  function u(s) {
    var t = s;
    return t && g.string(t.title) && (t.diagnostics === void 0 || g.typedArray(t.diagnostics, ct.is)) && (t.kind === void 0 || g.string(t.kind)) && (t.edit !== void 0 || t.command !== void 0) && (t.command === void 0 || rt.is(t.command)) && (t.isPreferred === void 0 || g.boolean(t.isPreferred)) && (t.edit === void 0 || mt.is(t.edit));
  }
  n.is = u;
})(qt || (qt = {}));
var Zt;
(function(n) {
  function _(s, t) {
    var i = { range: s };
    return g.defined(t) && (i.data = t), i;
  }
  n.create = _;
  function u(s) {
    var t = s;
    return g.defined(t) && V.is(t.range) && (g.undefined(t.command) || rt.is(t.command));
  }
  n.is = u;
})(Zt || (Zt = {}));
var Yt;
(function(n) {
  function _(s, t) {
    return { tabSize: s, insertSpaces: t };
  }
  n.create = _;
  function u(s) {
    var t = s;
    return g.defined(t) && g.uinteger(t.tabSize) && g.boolean(t.insertSpaces);
  }
  n.is = u;
})(Yt || (Yt = {}));
var Jt;
(function(n) {
  function _(s, t, i) {
    return { range: s, target: t, data: i };
  }
  n.create = _;
  function u(s) {
    var t = s;
    return g.defined(t) && V.is(t.range) && (g.undefined(t.target) || g.string(t.target));
  }
  n.is = u;
})(Jt || (Jt = {}));
var Kt;
(function(n) {
  function _(s, t) {
    return { range: s, parent: t };
  }
  n.create = _;
  function u(s) {
    var t = s;
    return t !== void 0 && V.is(t.range) && (t.parent === void 0 || n.is(t.parent));
  }
  n.is = u;
})(Kt || (Kt = {}));
var te;
(function(n) {
  function _(i, a, e, o) {
    return new Pe(i, a, e, o);
  }
  n.create = _;
  function u(i) {
    var a = i;
    return !!(g.defined(a) && g.string(a.uri) && (g.undefined(a.languageId) || g.string(a.languageId)) && g.uinteger(a.lineCount) && g.func(a.getText) && g.func(a.positionAt) && g.func(a.offsetAt));
  }
  n.is = u;
  function s(i, a) {
    for (var e = i.getText(), o = t(a, function(d, x) {
      var w = d.range.start.line - x.range.start.line;
      return w === 0 ? d.range.start.character - x.range.start.character : w;
    }), r = e.length, h = o.length - 1; h >= 0; h--) {
      var l = o[h], y = i.offsetAt(l.range.start), v = i.offsetAt(l.range.end);
      if (v <= r)
        e = e.substring(0, y) + l.newText + e.substring(v, e.length);
      else
        throw new Error("Overlapping edit");
      r = y;
    }
    return e;
  }
  n.applyEdits = s;
  function t(i, a) {
    if (i.length <= 1)
      return i;
    var e = i.length / 2 | 0, o = i.slice(0, e), r = i.slice(e);
    t(o, a), t(r, a);
    for (var h = 0, l = 0, y = 0; h < o.length && l < r.length; ) {
      var v = a(o[h], r[l]);
      v <= 0 ? i[y++] = o[h++] : i[y++] = r[l++];
    }
    for (; h < o.length; )
      i[y++] = o[h++];
    for (; l < r.length; )
      i[y++] = r[l++];
    return i;
  }
})(te || (te = {}));
var Pe = (
  /** @class */
  function() {
    function n(_, u, s, t) {
      this._uri = _, this._languageId = u, this._version = s, this._content = t, this._lineOffsets = void 0;
    }
    return Object.defineProperty(n.prototype, "uri", {
      get: function() {
        return this._uri;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(n.prototype, "languageId", {
      get: function() {
        return this._languageId;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(n.prototype, "version", {
      get: function() {
        return this._version;
      },
      enumerable: !1,
      configurable: !0
    }), n.prototype.getText = function(_) {
      if (_) {
        var u = this.offsetAt(_.start), s = this.offsetAt(_.end);
        return this._content.substring(u, s);
      }
      return this._content;
    }, n.prototype.update = function(_, u) {
      this._content = _.text, this._version = u, this._lineOffsets = void 0;
    }, n.prototype.getLineOffsets = function() {
      if (this._lineOffsets === void 0) {
        for (var _ = [], u = this._content, s = !0, t = 0; t < u.length; t++) {
          s && (_.push(t), s = !1);
          var i = u.charAt(t);
          s = i === "\r" || i === `
`, i === "\r" && t + 1 < u.length && u.charAt(t + 1) === `
` && t++;
        }
        s && u.length > 0 && _.push(u.length), this._lineOffsets = _;
      }
      return this._lineOffsets;
    }, n.prototype.positionAt = function(_) {
      _ = Math.max(Math.min(_, this._content.length), 0);
      var u = this.getLineOffsets(), s = 0, t = u.length;
      if (t === 0)
        return Q.create(0, _);
      for (; s < t; ) {
        var i = Math.floor((s + t) / 2);
        u[i] > _ ? t = i : s = i + 1;
      }
      var a = s - 1;
      return Q.create(a, _ - u[a]);
    }, n.prototype.offsetAt = function(_) {
      var u = this.getLineOffsets();
      if (_.line >= u.length)
        return this._content.length;
      if (_.line < 0)
        return 0;
      var s = u[_.line], t = _.line + 1 < u.length ? u[_.line + 1] : this._content.length;
      return Math.max(Math.min(s + _.character, t), s);
    }, Object.defineProperty(n.prototype, "lineCount", {
      get: function() {
        return this.getLineOffsets().length;
      },
      enumerable: !1,
      configurable: !0
    }), n;
  }()
), g;
(function(n) {
  var _ = Object.prototype.toString;
  function u(v) {
    return typeof v < "u";
  }
  n.defined = u;
  function s(v) {
    return typeof v > "u";
  }
  n.undefined = s;
  function t(v) {
    return v === !0 || v === !1;
  }
  n.boolean = t;
  function i(v) {
    return _.call(v) === "[object String]";
  }
  n.string = i;
  function a(v) {
    return _.call(v) === "[object Number]";
  }
  n.number = a;
  function e(v, d, x) {
    return _.call(v) === "[object Number]" && d <= v && v <= x;
  }
  n.numberRange = e;
  function o(v) {
    return _.call(v) === "[object Number]" && -2147483648 <= v && v <= 2147483647;
  }
  n.integer = o;
  function r(v) {
    return _.call(v) === "[object Number]" && 0 <= v && v <= 2147483647;
  }
  n.uinteger = r;
  function h(v) {
    return _.call(v) === "[object Function]";
  }
  n.func = h;
  function l(v) {
    return v !== null && typeof v == "object";
  }
  n.objectLiteral = l;
  function y(v, d) {
    return Array.isArray(v) && v.every(d);
  }
  n.typedArray = y;
})(g || (g = {}));
var ee = (
  /** @class */
  function() {
    function n(_, u, s, t) {
      this._uri = _, this._languageId = u, this._version = s, this._content = t, this._lineOffsets = void 0;
    }
    return Object.defineProperty(n.prototype, "uri", {
      get: function() {
        return this._uri;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(n.prototype, "languageId", {
      get: function() {
        return this._languageId;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(n.prototype, "version", {
      get: function() {
        return this._version;
      },
      enumerable: !0,
      configurable: !0
    }), n.prototype.getText = function(_) {
      if (_) {
        var u = this.offsetAt(_.start), s = this.offsetAt(_.end);
        return this._content.substring(u, s);
      }
      return this._content;
    }, n.prototype.update = function(_, u) {
      for (var s = 0, t = _; s < t.length; s++) {
        var i = t[s];
        if (n.isIncremental(i)) {
          var a = pe(i.range), e = this.offsetAt(a.start), o = this.offsetAt(a.end);
          this._content = this._content.substring(0, e) + i.text + this._content.substring(o, this._content.length);
          var r = Math.max(a.start.line, 0), h = Math.max(a.end.line, 0), l = this._lineOffsets, y = ie(i.text, !1, e);
          if (h - r === y.length)
            for (var v = 0, d = y.length; v < d; v++)
              l[v + r + 1] = y[v];
          else
            y.length < 1e4 ? l.splice.apply(l, [r + 1, h - r].concat(y)) : this._lineOffsets = l = l.slice(0, r + 1).concat(y, l.slice(h + 1));
          var x = i.text.length - (o - e);
          if (x !== 0)
            for (var v = r + 1 + y.length, d = l.length; v < d; v++)
              l[v] = l[v] + x;
        } else if (n.isFull(i))
          this._content = i.text, this._lineOffsets = void 0;
        else
          throw new Error("Unknown change event received");
      }
      this._version = u;
    }, n.prototype.getLineOffsets = function() {
      return this._lineOffsets === void 0 && (this._lineOffsets = ie(this._content, !0)), this._lineOffsets;
    }, n.prototype.positionAt = function(_) {
      _ = Math.max(Math.min(_, this._content.length), 0);
      var u = this.getLineOffsets(), s = 0, t = u.length;
      if (t === 0)
        return { line: 0, character: _ };
      for (; s < t; ) {
        var i = Math.floor((s + t) / 2);
        u[i] > _ ? t = i : s = i + 1;
      }
      var a = s - 1;
      return { line: a, character: _ - u[a] };
    }, n.prototype.offsetAt = function(_) {
      var u = this.getLineOffsets();
      if (_.line >= u.length)
        return this._content.length;
      if (_.line < 0)
        return 0;
      var s = u[_.line], t = _.line + 1 < u.length ? u[_.line + 1] : this._content.length;
      return Math.max(Math.min(s + _.character, t), s);
    }, Object.defineProperty(n.prototype, "lineCount", {
      get: function() {
        return this.getLineOffsets().length;
      },
      enumerable: !0,
      configurable: !0
    }), n.isIncremental = function(_) {
      var u = _;
      return u != null && typeof u.text == "string" && u.range !== void 0 && (u.rangeLength === void 0 || typeof u.rangeLength == "number");
    }, n.isFull = function(_) {
      var u = _;
      return u != null && typeof u.text == "string" && u.range === void 0 && u.rangeLength === void 0;
    }, n;
  }()
), ne;
(function(n) {
  function _(t, i, a, e) {
    return new ee(t, i, a, e);
  }
  n.create = _;
  function u(t, i, a) {
    if (t instanceof ee)
      return t.update(i, a), t;
    throw new Error("TextDocument.update: document must be created by TextDocument.create");
  }
  n.update = u;
  function s(t, i) {
    for (var a = t.getText(), e = bt(i.map(je), function(d, x) {
      var w = d.range.start.line - x.range.start.line;
      return w === 0 ? d.range.start.character - x.range.start.character : w;
    }), o = 0, r = [], h = 0, l = e; h < l.length; h++) {
      var y = l[h], v = t.offsetAt(y.range.start);
      if (v < o)
        throw new Error("Overlapping edit");
      v > o && r.push(a.substring(o, v)), y.newText.length && r.push(y.newText), o = t.offsetAt(y.range.end);
    }
    return r.push(a.substr(o)), r.join("");
  }
  n.applyEdits = s;
})(ne || (ne = {}));
function bt(n, _) {
  if (n.length <= 1)
    return n;
  var u = n.length / 2 | 0, s = n.slice(0, u), t = n.slice(u);
  bt(s, _), bt(t, _);
  for (var i = 0, a = 0, e = 0; i < s.length && a < t.length; ) {
    var o = _(s[i], t[a]);
    o <= 0 ? n[e++] = s[i++] : n[e++] = t[a++];
  }
  for (; i < s.length; )
    n[e++] = s[i++];
  for (; a < t.length; )
    n[e++] = t[a++];
  return n;
}
function ie(n, _, u) {
  u === void 0 && (u = 0);
  for (var s = _ ? [u] : [], t = 0; t < n.length; t++) {
    var i = n.charCodeAt(t);
    (i === 13 || i === 10) && (i === 13 && t + 1 < n.length && n.charCodeAt(t + 1) === 10 && t++, s.push(u + t + 1));
  }
  return s;
}
function pe(n) {
  var _ = n.start, u = n.end;
  return _.line > u.line || _.line === u.line && _.character > u.character ? { start: u, end: _ } : n;
}
function je(n) {
  var _ = pe(n.range);
  return _ !== n.range ? { newText: n.newText, range: _ } : n;
}
var re;
(function(n) {
  n[n.StartCommentTag = 0] = "StartCommentTag", n[n.Comment = 1] = "Comment", n[n.EndCommentTag = 2] = "EndCommentTag", n[n.StartTagOpen = 3] = "StartTagOpen", n[n.StartTagClose = 4] = "StartTagClose", n[n.StartTagSelfClose = 5] = "StartTagSelfClose", n[n.StartTag = 6] = "StartTag", n[n.EndTagOpen = 7] = "EndTagOpen", n[n.EndTagClose = 8] = "EndTagClose", n[n.EndTag = 9] = "EndTag", n[n.DelimiterAssign = 10] = "DelimiterAssign", n[n.AttributeName = 11] = "AttributeName", n[n.AttributeValue = 12] = "AttributeValue", n[n.StartDoctypeTag = 13] = "StartDoctypeTag", n[n.Doctype = 14] = "Doctype", n[n.EndDoctypeTag = 15] = "EndDoctypeTag", n[n.Content = 16] = "Content", n[n.Whitespace = 17] = "Whitespace", n[n.Unknown = 18] = "Unknown", n[n.Script = 19] = "Script", n[n.Styles = 20] = "Styles", n[n.EOS = 21] = "EOS";
})(re || (re = {}));
var se;
(function(n) {
  n[n.WithinContent = 0] = "WithinContent", n[n.AfterOpeningStartTag = 1] = "AfterOpeningStartTag", n[n.AfterOpeningEndTag = 2] = "AfterOpeningEndTag", n[n.WithinDoctype = 3] = "WithinDoctype", n[n.WithinTag = 4] = "WithinTag", n[n.WithinEndTag = 5] = "WithinEndTag", n[n.WithinComment = 6] = "WithinComment", n[n.WithinScriptContent = 7] = "WithinScriptContent", n[n.WithinStyleContent = 8] = "WithinStyleContent", n[n.AfterAttributeName = 9] = "AfterAttributeName", n[n.BeforeAttributeValue = 10] = "BeforeAttributeValue";
})(se || (se = {}));
var ae;
(function(n) {
  n.LATEST = {
    textDocument: {
      completion: {
        completionItem: {
          documentationFormat: [Z.Markdown, Z.PlainText]
        }
      },
      hover: {
        contentFormat: [Z.Markdown, Z.PlainText]
      }
    }
  };
})(ae || (ae = {}));
var oe;
(function(n) {
  n[n.Unknown = 0] = "Unknown", n[n.File = 1] = "File", n[n.Directory = 2] = "Directory", n[n.SymbolicLink = 64] = "SymbolicLink";
})(oe || (oe = {}));
function _e(n, _) {
  var u = 0, s = n.length;
  if (s === 0)
    return 0;
  for (; u < s; ) {
    var t = Math.floor((u + s) / 2);
    _(n[t]) ? s = t : u = t + 1;
  }
  return u;
}
(function() {
  function n(_, u, s, t) {
    this.start = _, this.end = u, this.children = s, this.parent = t, this.closed = !1;
  }
  return Object.defineProperty(n.prototype, "attributeNames", {
    get: function() {
      return this.attributes ? Object.keys(this.attributes) : [];
    },
    enumerable: !1,
    configurable: !0
  }), n.prototype.isSameTag = function(_) {
    return this.tag === void 0 ? _ === void 0 : _ !== void 0 && this.tag.length === _.length && this.tag.toLowerCase() === _;
  }, Object.defineProperty(n.prototype, "firstChild", {
    get: function() {
      return this.children[0];
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(n.prototype, "lastChild", {
    get: function() {
      return this.children.length ? this.children[this.children.length - 1] : void 0;
    },
    enumerable: !1,
    configurable: !0
  }), n.prototype.findNodeBefore = function(_) {
    var u = _e(this.children, function(i) {
      return _ <= i.start;
    }) - 1;
    if (u >= 0) {
      var s = this.children[u];
      if (_ > s.start) {
        if (_ < s.end)
          return s.findNodeBefore(_);
        var t = s.lastChild;
        return t && t.end === s.end ? s.findNodeBefore(_) : s;
      }
    }
    return this;
  }, n.prototype.findNodeAt = function(_) {
    var u = _e(this.children, function(t) {
      return _ <= t.start;
    }) - 1;
    if (u >= 0) {
      var s = this.children[u];
      if (_ > s.start && _ <= s.end)
        return s.findNodeAt(_);
    }
    return this;
  }, n;
})();
globalThis && globalThis.__awaiter;
globalThis && globalThis.__generator;
globalThis && globalThis.__awaiter;
globalThis && globalThis.__generator;
(function() {
  var n = [
    ,
    ,
    /* 2 */
    /***/
    function(s) {
      function t(e) {
        this.__parent = e, this.__character_count = 0, this.__indent_count = -1, this.__alignment_count = 0, this.__wrap_point_index = 0, this.__wrap_point_character_count = 0, this.__wrap_point_indent_count = -1, this.__wrap_point_alignment_count = 0, this.__items = [];
      }
      t.prototype.clone_empty = function() {
        var e = new t(this.__parent);
        return e.set_indent(this.__indent_count, this.__alignment_count), e;
      }, t.prototype.item = function(e) {
        return e < 0 ? this.__items[this.__items.length + e] : this.__items[e];
      }, t.prototype.has_match = function(e) {
        for (var o = this.__items.length - 1; o >= 0; o--)
          if (this.__items[o].match(e))
            return !0;
        return !1;
      }, t.prototype.set_indent = function(e, o) {
        this.is_empty() && (this.__indent_count = e || 0, this.__alignment_count = o || 0, this.__character_count = this.__parent.get_indent_size(this.__indent_count, this.__alignment_count));
      }, t.prototype._set_wrap_point = function() {
        this.__parent.wrap_line_length && (this.__wrap_point_index = this.__items.length, this.__wrap_point_character_count = this.__character_count, this.__wrap_point_indent_count = this.__parent.next_line.__indent_count, this.__wrap_point_alignment_count = this.__parent.next_line.__alignment_count);
      }, t.prototype._should_wrap = function() {
        return this.__wrap_point_index && this.__character_count > this.__parent.wrap_line_length && this.__wrap_point_character_count > this.__parent.next_line.__character_count;
      }, t.prototype._allow_wrap = function() {
        if (this._should_wrap()) {
          this.__parent.add_new_line();
          var e = this.__parent.current_line;
          return e.set_indent(this.__wrap_point_indent_count, this.__wrap_point_alignment_count), e.__items = this.__items.slice(this.__wrap_point_index), this.__items = this.__items.slice(0, this.__wrap_point_index), e.__character_count += this.__character_count - this.__wrap_point_character_count, this.__character_count = this.__wrap_point_character_count, e.__items[0] === " " && (e.__items.splice(0, 1), e.__character_count -= 1), !0;
        }
        return !1;
      }, t.prototype.is_empty = function() {
        return this.__items.length === 0;
      }, t.prototype.last = function() {
        return this.is_empty() ? null : this.__items[this.__items.length - 1];
      }, t.prototype.push = function(e) {
        this.__items.push(e);
        var o = e.lastIndexOf(`
`);
        o !== -1 ? this.__character_count = e.length - o : this.__character_count += e.length;
      }, t.prototype.pop = function() {
        var e = null;
        return this.is_empty() || (e = this.__items.pop(), this.__character_count -= e.length), e;
      }, t.prototype._remove_indent = function() {
        this.__indent_count > 0 && (this.__indent_count -= 1, this.__character_count -= this.__parent.indent_size);
      }, t.prototype._remove_wrap_indent = function() {
        this.__wrap_point_indent_count > 0 && (this.__wrap_point_indent_count -= 1);
      }, t.prototype.trim = function() {
        for (; this.last() === " "; )
          this.__items.pop(), this.__character_count -= 1;
      }, t.prototype.toString = function() {
        var e = "";
        return this.is_empty() ? this.__parent.indent_empty_lines && (e = this.__parent.get_indent_string(this.__indent_count)) : (e = this.__parent.get_indent_string(this.__indent_count, this.__alignment_count), e += this.__items.join("")), e;
      };
      function i(e, o) {
        this.__cache = [""], this.__indent_size = e.indent_size, this.__indent_string = e.indent_char, e.indent_with_tabs || (this.__indent_string = new Array(e.indent_size + 1).join(e.indent_char)), o = o || "", e.indent_level > 0 && (o = new Array(e.indent_level + 1).join(this.__indent_string)), this.__base_string = o, this.__base_string_length = o.length;
      }
      i.prototype.get_indent_size = function(e, o) {
        var r = this.__base_string_length;
        return o = o || 0, e < 0 && (r = 0), r += e * this.__indent_size, r += o, r;
      }, i.prototype.get_indent_string = function(e, o) {
        var r = this.__base_string;
        return o = o || 0, e < 0 && (e = 0, r = ""), o += e * this.__indent_size, this.__ensure_cache(o), r += this.__cache[o], r;
      }, i.prototype.__ensure_cache = function(e) {
        for (; e >= this.__cache.length; )
          this.__add_column();
      }, i.prototype.__add_column = function() {
        var e = this.__cache.length, o = 0, r = "";
        this.__indent_size && e >= this.__indent_size && (o = Math.floor(e / this.__indent_size), e -= o * this.__indent_size, r = new Array(o + 1).join(this.__indent_string)), e && (r += new Array(e + 1).join(" ")), this.__cache.push(r);
      };
      function a(e, o) {
        this.__indent_cache = new i(e, o), this.raw = !1, this._end_with_newline = e.end_with_newline, this.indent_size = e.indent_size, this.wrap_line_length = e.wrap_line_length, this.indent_empty_lines = e.indent_empty_lines, this.__lines = [], this.previous_line = null, this.current_line = null, this.next_line = new t(this), this.space_before_token = !1, this.non_breaking_space = !1, this.previous_token_wrapped = !1, this.__add_outputline();
      }
      a.prototype.__add_outputline = function() {
        this.previous_line = this.current_line, this.current_line = this.next_line.clone_empty(), this.__lines.push(this.current_line);
      }, a.prototype.get_line_number = function() {
        return this.__lines.length;
      }, a.prototype.get_indent_string = function(e, o) {
        return this.__indent_cache.get_indent_string(e, o);
      }, a.prototype.get_indent_size = function(e, o) {
        return this.__indent_cache.get_indent_size(e, o);
      }, a.prototype.is_empty = function() {
        return !this.previous_line && this.current_line.is_empty();
      }, a.prototype.add_new_line = function(e) {
        return this.is_empty() || !e && this.just_added_newline() ? !1 : (this.raw || this.__add_outputline(), !0);
      }, a.prototype.get_code = function(e) {
        this.trim(!0);
        var o = this.current_line.pop();
        o && (o[o.length - 1] === `
` && (o = o.replace(/\n+$/g, "")), this.current_line.push(o)), this._end_with_newline && this.__add_outputline();
        var r = this.__lines.join(`
`);
        return e !== `
` && (r = r.replace(/[\n]/g, e)), r;
      }, a.prototype.set_wrap_point = function() {
        this.current_line._set_wrap_point();
      }, a.prototype.set_indent = function(e, o) {
        return e = e || 0, o = o || 0, this.next_line.set_indent(e, o), this.__lines.length > 1 ? (this.current_line.set_indent(e, o), !0) : (this.current_line.set_indent(), !1);
      }, a.prototype.add_raw_token = function(e) {
        for (var o = 0; o < e.newlines; o++)
          this.__add_outputline();
        this.current_line.set_indent(-1), this.current_line.push(e.whitespace_before), this.current_line.push(e.text), this.space_before_token = !1, this.non_breaking_space = !1, this.previous_token_wrapped = !1;
      }, a.prototype.add_token = function(e) {
        this.__add_space_before_token(), this.current_line.push(e), this.space_before_token = !1, this.non_breaking_space = !1, this.previous_token_wrapped = this.current_line._allow_wrap();
      }, a.prototype.__add_space_before_token = function() {
        this.space_before_token && !this.just_added_newline() && (this.non_breaking_space || this.set_wrap_point(), this.current_line.push(" "));
      }, a.prototype.remove_indent = function(e) {
        for (var o = this.__lines.length; e < o; )
          this.__lines[e]._remove_indent(), e++;
        this.current_line._remove_wrap_indent();
      }, a.prototype.trim = function(e) {
        for (e = e === void 0 ? !1 : e, this.current_line.trim(); e && this.__lines.length > 1 && this.current_line.is_empty(); )
          this.__lines.pop(), this.current_line = this.__lines[this.__lines.length - 1], this.current_line.trim();
        this.previous_line = this.__lines.length > 1 ? this.__lines[this.__lines.length - 2] : null;
      }, a.prototype.just_added_newline = function() {
        return this.current_line.is_empty();
      }, a.prototype.just_added_blankline = function() {
        return this.is_empty() || this.current_line.is_empty() && this.previous_line.is_empty();
      }, a.prototype.ensure_empty_line_above = function(e, o) {
        for (var r = this.__lines.length - 2; r >= 0; ) {
          var h = this.__lines[r];
          if (h.is_empty())
            break;
          if (h.item(0).indexOf(e) !== 0 && h.item(-1) !== o) {
            this.__lines.splice(r + 1, 0, new t(this)), this.previous_line = this.__lines[this.__lines.length - 2];
            break;
          }
          r--;
        }
      }, s.exports.Output = a;
    },
    ,
    ,
    ,
    /* 6 */
    /***/
    function(s) {
      function t(e, o) {
        this.raw_options = i(e, o), this.disabled = this._get_boolean("disabled"), this.eol = this._get_characters("eol", "auto"), this.end_with_newline = this._get_boolean("end_with_newline"), this.indent_size = this._get_number("indent_size", 4), this.indent_char = this._get_characters("indent_char", " "), this.indent_level = this._get_number("indent_level"), this.preserve_newlines = this._get_boolean("preserve_newlines", !0), this.max_preserve_newlines = this._get_number("max_preserve_newlines", 32786), this.preserve_newlines || (this.max_preserve_newlines = 0), this.indent_with_tabs = this._get_boolean("indent_with_tabs", this.indent_char === "	"), this.indent_with_tabs && (this.indent_char = "	", this.indent_size === 1 && (this.indent_size = 4)), this.wrap_line_length = this._get_number("wrap_line_length", this._get_number("max_char")), this.indent_empty_lines = this._get_boolean("indent_empty_lines"), this.templating = this._get_selection_list("templating", ["auto", "none", "django", "erb", "handlebars", "php", "smarty"], ["auto"]);
      }
      t.prototype._get_array = function(e, o) {
        var r = this.raw_options[e], h = o || [];
        return typeof r == "object" ? r !== null && typeof r.concat == "function" && (h = r.concat()) : typeof r == "string" && (h = r.split(/[^a-zA-Z0-9_\/\-]+/)), h;
      }, t.prototype._get_boolean = function(e, o) {
        var r = this.raw_options[e], h = r === void 0 ? !!o : !!r;
        return h;
      }, t.prototype._get_characters = function(e, o) {
        var r = this.raw_options[e], h = o || "";
        return typeof r == "string" && (h = r.replace(/\\r/, "\r").replace(/\\n/, `
`).replace(/\\t/, "	")), h;
      }, t.prototype._get_number = function(e, o) {
        var r = this.raw_options[e];
        o = parseInt(o, 10), isNaN(o) && (o = 0);
        var h = parseInt(r, 10);
        return isNaN(h) && (h = o), h;
      }, t.prototype._get_selection = function(e, o, r) {
        var h = this._get_selection_list(e, o, r);
        if (h.length !== 1)
          throw new Error(
            "Invalid Option Value: The option '" + e + `' can only be one of the following values:
` + o + `
You passed in: '` + this.raw_options[e] + "'"
          );
        return h[0];
      }, t.prototype._get_selection_list = function(e, o, r) {
        if (!o || o.length === 0)
          throw new Error("Selection list cannot be empty.");
        if (r = r || [o[0]], !this._is_valid_selection(r, o))
          throw new Error("Invalid Default Value!");
        var h = this._get_array(e, r);
        if (!this._is_valid_selection(h, o))
          throw new Error(
            "Invalid Option Value: The option '" + e + `' can contain only the following values:
` + o + `
You passed in: '` + this.raw_options[e] + "'"
          );
        return h;
      }, t.prototype._is_valid_selection = function(e, o) {
        return e.length && o.length && !e.some(function(r) {
          return o.indexOf(r) === -1;
        });
      };
      function i(e, o) {
        var r = {};
        e = a(e);
        var h;
        for (h in e)
          h !== o && (r[h] = e[h]);
        if (o && e[o])
          for (h in e[o])
            r[h] = e[o][h];
        return r;
      }
      function a(e) {
        var o = {}, r;
        for (r in e) {
          var h = r.replace(/-/g, "_");
          o[h] = e[r];
        }
        return o;
      }
      s.exports.Options = t, s.exports.normalizeOpts = a, s.exports.mergeOpts = i;
    },
    ,
    /* 8 */
    /***/
    function(s) {
      var t = RegExp.prototype.hasOwnProperty("sticky");
      function i(a) {
        this.__input = a || "", this.__input_length = this.__input.length, this.__position = 0;
      }
      i.prototype.restart = function() {
        this.__position = 0;
      }, i.prototype.back = function() {
        this.__position > 0 && (this.__position -= 1);
      }, i.prototype.hasNext = function() {
        return this.__position < this.__input_length;
      }, i.prototype.next = function() {
        var a = null;
        return this.hasNext() && (a = this.__input.charAt(this.__position), this.__position += 1), a;
      }, i.prototype.peek = function(a) {
        var e = null;
        return a = a || 0, a += this.__position, a >= 0 && a < this.__input_length && (e = this.__input.charAt(a)), e;
      }, i.prototype.__match = function(a, e) {
        a.lastIndex = e;
        var o = a.exec(this.__input);
        return o && !(t && a.sticky) && o.index !== e && (o = null), o;
      }, i.prototype.test = function(a, e) {
        return e = e || 0, e += this.__position, e >= 0 && e < this.__input_length ? !!this.__match(a, e) : !1;
      }, i.prototype.testChar = function(a, e) {
        var o = this.peek(e);
        return a.lastIndex = 0, o !== null && a.test(o);
      }, i.prototype.match = function(a) {
        var e = this.__match(a, this.__position);
        return e ? this.__position += e[0].length : e = null, e;
      }, i.prototype.read = function(a, e, o) {
        var r = "", h;
        return a && (h = this.match(a), h && (r += h[0])), e && (h || !a) && (r += this.readUntil(e, o)), r;
      }, i.prototype.readUntil = function(a, e) {
        var o = "", r = this.__position;
        a.lastIndex = this.__position;
        var h = a.exec(this.__input);
        return h ? (r = h.index, e && (r += h[0].length)) : r = this.__input_length, o = this.__input.substring(this.__position, r), this.__position = r, o;
      }, i.prototype.readUntilAfter = function(a) {
        return this.readUntil(a, !0);
      }, i.prototype.get_regexp = function(a, e) {
        var o = null, r = "g";
        return e && t && (r = "y"), typeof a == "string" && a !== "" ? o = new RegExp(a, r) : a && (o = new RegExp(a.source, r)), o;
      }, i.prototype.get_literal_regexp = function(a) {
        return RegExp(a.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"));
      }, i.prototype.peekUntilAfter = function(a) {
        var e = this.__position, o = this.readUntilAfter(a);
        return this.__position = e, o;
      }, i.prototype.lookBack = function(a) {
        var e = this.__position - 1;
        return e >= a.length && this.__input.substring(e - a.length, e).toLowerCase() === a;
      }, s.exports.InputScanner = i;
    },
    ,
    ,
    ,
    ,
    /* 13 */
    /***/
    function(s) {
      function t(i, a) {
        i = typeof i == "string" ? i : i.source, a = typeof a == "string" ? a : a.source, this.__directives_block_pattern = new RegExp(i + / beautify( \w+[:]\w+)+ /.source + a, "g"), this.__directive_pattern = / (\w+)[:](\w+)/g, this.__directives_end_ignore_pattern = new RegExp(i + /\sbeautify\signore:end\s/.source + a, "g");
      }
      t.prototype.get_directives = function(i) {
        if (!i.match(this.__directives_block_pattern))
          return null;
        var a = {};
        this.__directive_pattern.lastIndex = 0;
        for (var e = this.__directive_pattern.exec(i); e; )
          a[e[1]] = e[2], e = this.__directive_pattern.exec(i);
        return a;
      }, t.prototype.readIgnored = function(i) {
        return i.readUntilAfter(this.__directives_end_ignore_pattern);
      }, s.exports.Directives = t;
    },
    ,
    /* 15 */
    /***/
    function(s, t, i) {
      var a = i(16).Beautifier, e = i(17).Options;
      function o(r, h) {
        var l = new a(r, h);
        return l.beautify();
      }
      s.exports = o, s.exports.defaultOptions = function() {
        return new e();
      };
    },
    /* 16 */
    /***/
    function(s, t, i) {
      var a = i(17).Options, e = i(2).Output, o = i(8).InputScanner, r = i(13).Directives, h = new r(/\/\*/, /\*\//), l = /\r\n|[\r\n]/, y = /\r\n|[\r\n]/g, v = /\s/, d = /(?:\s|\n)+/g, x = /\/\*(?:[\s\S]*?)((?:\*\/)|$)/g, w = /\/\/(?:[^\n\r\u2028\u2029]*)/g;
      function E(C, P) {
        this._source_text = C || "", this._options = new a(P), this._ch = null, this._input = null, this.NESTED_AT_RULE = {
          "@page": !0,
          "@font-face": !0,
          "@keyframes": !0,
          // also in CONDITIONAL_GROUP_RULE below
          "@media": !0,
          "@supports": !0,
          "@document": !0
        }, this.CONDITIONAL_GROUP_RULE = {
          "@media": !0,
          "@supports": !0,
          "@document": !0
        };
      }
      E.prototype.eatString = function(C) {
        var P = "";
        for (this._ch = this._input.next(); this._ch; ) {
          if (P += this._ch, this._ch === "\\")
            P += this._input.next();
          else if (C.indexOf(this._ch) !== -1 || this._ch === `
`)
            break;
          this._ch = this._input.next();
        }
        return P;
      }, E.prototype.eatWhitespace = function(C) {
        for (var P = v.test(this._input.peek()), B = 0; v.test(this._input.peek()); )
          this._ch = this._input.next(), C && this._ch === `
` && (B === 0 || B < this._options.max_preserve_newlines) && (B++, this._output.add_new_line(!0));
        return P;
      }, E.prototype.foundNestedPseudoClass = function() {
        for (var C = 0, P = 1, B = this._input.peek(P); B; ) {
          if (B === "{")
            return !0;
          if (B === "(")
            C += 1;
          else if (B === ")") {
            if (C === 0)
              return !1;
            C -= 1;
          } else if (B === ";" || B === "}")
            return !1;
          P++, B = this._input.peek(P);
        }
        return !1;
      }, E.prototype.print_string = function(C) {
        this._output.set_indent(this._indentLevel), this._output.non_breaking_space = !0, this._output.add_token(C);
      }, E.prototype.preserveSingleSpace = function(C) {
        C && (this._output.space_before_token = !0);
      }, E.prototype.indent = function() {
        this._indentLevel++;
      }, E.prototype.outdent = function() {
        this._indentLevel > 0 && this._indentLevel--;
      }, E.prototype.beautify = function() {
        if (this._options.disabled)
          return this._source_text;
        var C = this._source_text, P = this._options.eol;
        P === "auto" && (P = `
`, C && l.test(C || "") && (P = C.match(l)[0])), C = C.replace(y, `
`);
        var B = C.match(/^[\t ]*/)[0];
        this._output = new e(this._options, B), this._input = new o(C), this._indentLevel = 0, this._nestedLevel = 0, this._ch = null;
        for (var G = 0, p = !1, c = !1, f = !1, j = !1, T = !1, U = this._ch, D, L, R; D = this._input.read(d), L = D !== "", R = U, this._ch = this._input.next(), this._ch === "\\" && this._input.hasNext() && (this._ch += this._input.next()), U = this._ch, this._ch; )
          if (this._ch === "/" && this._input.peek() === "*") {
            this._output.add_new_line(), this._input.back();
            var z = this._input.read(x), b = h.get_directives(z);
            b && b.ignore === "start" && (z += h.readIgnored(this._input)), this.print_string(z), this.eatWhitespace(!0), this._output.add_new_line();
          } else if (this._ch === "/" && this._input.peek() === "/")
            this._output.space_before_token = !0, this._input.back(), this.print_string(this._input.read(w)), this.eatWhitespace(!0);
          else if (this._ch === "@")
            if (this.preserveSingleSpace(L), this._input.peek() === "{")
              this.print_string(this._ch + this.eatString("}"));
            else {
              this.print_string(this._ch);
              var m = this._input.peekUntilAfter(/[: ,;{}()[\]\/='"]/g);
              m.match(/[ :]$/) && (m = this.eatString(": ").replace(/\s$/, ""), this.print_string(m), this._output.space_before_token = !0), m = m.replace(/\s$/, ""), m === "extend" ? j = !0 : m === "import" && (T = !0), m in this.NESTED_AT_RULE ? (this._nestedLevel += 1, m in this.CONDITIONAL_GROUP_RULE && (f = !0)) : !p && G === 0 && m.indexOf(":") !== -1 && (c = !0, this.indent());
            }
          else
            this._ch === "#" && this._input.peek() === "{" ? (this.preserveSingleSpace(L), this.print_string(this._ch + this.eatString("}"))) : this._ch === "{" ? (c && (c = !1, this.outdent()), f ? (f = !1, p = this._indentLevel >= this._nestedLevel) : p = this._indentLevel >= this._nestedLevel - 1, this._options.newline_between_rules && p && this._output.previous_line && this._output.previous_line.item(-1) !== "{" && this._output.ensure_empty_line_above("/", ","), this._output.space_before_token = !0, this._options.brace_style === "expand" ? (this._output.add_new_line(), this.print_string(this._ch), this.indent(), this._output.set_indent(this._indentLevel)) : (this.indent(), this.print_string(this._ch)), this.eatWhitespace(!0), this._output.add_new_line()) : this._ch === "}" ? (this.outdent(), this._output.add_new_line(), R === "{" && this._output.trim(!0), T = !1, j = !1, c && (this.outdent(), c = !1), this.print_string(this._ch), p = !1, this._nestedLevel && this._nestedLevel--, this.eatWhitespace(!0), this._output.add_new_line(), this._options.newline_between_rules && !this._output.just_added_blankline() && this._input.peek() !== "}" && this._output.add_new_line(!0)) : this._ch === ":" ? (p || f) && !(this._input.lookBack("&") || this.foundNestedPseudoClass()) && !this._input.lookBack("(") && !j && G === 0 ? (this.print_string(":"), c || (c = !0, this._output.space_before_token = !0, this.eatWhitespace(!0), this.indent())) : (this._input.lookBack(" ") && (this._output.space_before_token = !0), this._input.peek() === ":" ? (this._ch = this._input.next(), this.print_string("::")) : this.print_string(":")) : this._ch === '"' || this._ch === "'" ? (this.preserveSingleSpace(L), this.print_string(this._ch + this.eatString(this._ch)), this.eatWhitespace(!0)) : this._ch === ";" ? G === 0 ? (c && (this.outdent(), c = !1), j = !1, T = !1, this.print_string(this._ch), this.eatWhitespace(!0), this._input.peek() !== "/" && this._output.add_new_line()) : (this.print_string(this._ch), this.eatWhitespace(!0), this._output.space_before_token = !0) : this._ch === "(" ? this._input.lookBack("url") ? (this.print_string(this._ch), this.eatWhitespace(), G++, this.indent(), this._ch = this._input.next(), this._ch === ")" || this._ch === '"' || this._ch === "'" ? this._input.back() : this._ch && (this.print_string(this._ch + this.eatString(")")), G && (G--, this.outdent()))) : (this.preserveSingleSpace(L), this.print_string(this._ch), this.eatWhitespace(), G++, this.indent()) : this._ch === ")" ? (G && (G--, this.outdent()), this.print_string(this._ch)) : this._ch === "," ? (this.print_string(this._ch), this.eatWhitespace(!0), this._options.selector_separator_newline && !c && G === 0 && !T ? this._output.add_new_line() : this._output.space_before_token = !0) : (this._ch === ">" || this._ch === "+" || this._ch === "~") && !c && G === 0 ? this._options.space_around_combinator ? (this._output.space_before_token = !0, this.print_string(this._ch), this._output.space_before_token = !0) : (this.print_string(this._ch), this.eatWhitespace(), this._ch && v.test(this._ch) && (this._ch = "")) : this._ch === "]" ? this.print_string(this._ch) : this._ch === "[" ? (this.preserveSingleSpace(L), this.print_string(this._ch)) : this._ch === "=" ? (this.eatWhitespace(), this.print_string("="), v.test(this._ch) && (this._ch = "")) : this._ch === "!" && !this._input.lookBack("\\") ? (this.print_string(" "), this.print_string(this._ch)) : (this.preserveSingleSpace(L), this.print_string(this._ch));
        var A = this._output.get_code(P);
        return A;
      }, s.exports.Beautifier = E;
    },
    /* 17 */
    /***/
    function(s, t, i) {
      var a = i(6).Options;
      function e(o) {
        a.call(this, o, "css"), this.selector_separator_newline = this._get_boolean("selector_separator_newline", !0), this.newline_between_rules = this._get_boolean("newline_between_rules", !0);
        var r = this._get_boolean("space_around_selector_separator");
        this.space_around_combinator = this._get_boolean("space_around_combinator") || r;
        var h = this._get_selection_list("brace_style", ["collapse", "expand", "end-expand", "none", "preserve-inline"]);
        this.brace_style = "collapse";
        for (var l = 0; l < h.length; l++)
          h[l] !== "expand" ? this.brace_style = "collapse" : this.brace_style = h[l];
      }
      e.prototype = new a(), s.exports.Options = e;
    }
    /******/
  ], _ = {};
  function u(s) {
    var t = _[s];
    if (t !== void 0)
      return t.exports;
    var i = _[s] = {
      /******/
      // no module.id needed
      /******/
      // no module.loaded needed
      /******/
      exports: {}
      /******/
    };
    return n[s](i, i.exports, u), i.exports;
  }
  u(15);
})();
(function() {
  var n = [
    ,
    ,
    /* 2 */
    /***/
    function(s) {
      function t(e) {
        this.__parent = e, this.__character_count = 0, this.__indent_count = -1, this.__alignment_count = 0, this.__wrap_point_index = 0, this.__wrap_point_character_count = 0, this.__wrap_point_indent_count = -1, this.__wrap_point_alignment_count = 0, this.__items = [];
      }
      t.prototype.clone_empty = function() {
        var e = new t(this.__parent);
        return e.set_indent(this.__indent_count, this.__alignment_count), e;
      }, t.prototype.item = function(e) {
        return e < 0 ? this.__items[this.__items.length + e] : this.__items[e];
      }, t.prototype.has_match = function(e) {
        for (var o = this.__items.length - 1; o >= 0; o--)
          if (this.__items[o].match(e))
            return !0;
        return !1;
      }, t.prototype.set_indent = function(e, o) {
        this.is_empty() && (this.__indent_count = e || 0, this.__alignment_count = o || 0, this.__character_count = this.__parent.get_indent_size(this.__indent_count, this.__alignment_count));
      }, t.prototype._set_wrap_point = function() {
        this.__parent.wrap_line_length && (this.__wrap_point_index = this.__items.length, this.__wrap_point_character_count = this.__character_count, this.__wrap_point_indent_count = this.__parent.next_line.__indent_count, this.__wrap_point_alignment_count = this.__parent.next_line.__alignment_count);
      }, t.prototype._should_wrap = function() {
        return this.__wrap_point_index && this.__character_count > this.__parent.wrap_line_length && this.__wrap_point_character_count > this.__parent.next_line.__character_count;
      }, t.prototype._allow_wrap = function() {
        if (this._should_wrap()) {
          this.__parent.add_new_line();
          var e = this.__parent.current_line;
          return e.set_indent(this.__wrap_point_indent_count, this.__wrap_point_alignment_count), e.__items = this.__items.slice(this.__wrap_point_index), this.__items = this.__items.slice(0, this.__wrap_point_index), e.__character_count += this.__character_count - this.__wrap_point_character_count, this.__character_count = this.__wrap_point_character_count, e.__items[0] === " " && (e.__items.splice(0, 1), e.__character_count -= 1), !0;
        }
        return !1;
      }, t.prototype.is_empty = function() {
        return this.__items.length === 0;
      }, t.prototype.last = function() {
        return this.is_empty() ? null : this.__items[this.__items.length - 1];
      }, t.prototype.push = function(e) {
        this.__items.push(e);
        var o = e.lastIndexOf(`
`);
        o !== -1 ? this.__character_count = e.length - o : this.__character_count += e.length;
      }, t.prototype.pop = function() {
        var e = null;
        return this.is_empty() || (e = this.__items.pop(), this.__character_count -= e.length), e;
      }, t.prototype._remove_indent = function() {
        this.__indent_count > 0 && (this.__indent_count -= 1, this.__character_count -= this.__parent.indent_size);
      }, t.prototype._remove_wrap_indent = function() {
        this.__wrap_point_indent_count > 0 && (this.__wrap_point_indent_count -= 1);
      }, t.prototype.trim = function() {
        for (; this.last() === " "; )
          this.__items.pop(), this.__character_count -= 1;
      }, t.prototype.toString = function() {
        var e = "";
        return this.is_empty() ? this.__parent.indent_empty_lines && (e = this.__parent.get_indent_string(this.__indent_count)) : (e = this.__parent.get_indent_string(this.__indent_count, this.__alignment_count), e += this.__items.join("")), e;
      };
      function i(e, o) {
        this.__cache = [""], this.__indent_size = e.indent_size, this.__indent_string = e.indent_char, e.indent_with_tabs || (this.__indent_string = new Array(e.indent_size + 1).join(e.indent_char)), o = o || "", e.indent_level > 0 && (o = new Array(e.indent_level + 1).join(this.__indent_string)), this.__base_string = o, this.__base_string_length = o.length;
      }
      i.prototype.get_indent_size = function(e, o) {
        var r = this.__base_string_length;
        return o = o || 0, e < 0 && (r = 0), r += e * this.__indent_size, r += o, r;
      }, i.prototype.get_indent_string = function(e, o) {
        var r = this.__base_string;
        return o = o || 0, e < 0 && (e = 0, r = ""), o += e * this.__indent_size, this.__ensure_cache(o), r += this.__cache[o], r;
      }, i.prototype.__ensure_cache = function(e) {
        for (; e >= this.__cache.length; )
          this.__add_column();
      }, i.prototype.__add_column = function() {
        var e = this.__cache.length, o = 0, r = "";
        this.__indent_size && e >= this.__indent_size && (o = Math.floor(e / this.__indent_size), e -= o * this.__indent_size, r = new Array(o + 1).join(this.__indent_string)), e && (r += new Array(e + 1).join(" ")), this.__cache.push(r);
      };
      function a(e, o) {
        this.__indent_cache = new i(e, o), this.raw = !1, this._end_with_newline = e.end_with_newline, this.indent_size = e.indent_size, this.wrap_line_length = e.wrap_line_length, this.indent_empty_lines = e.indent_empty_lines, this.__lines = [], this.previous_line = null, this.current_line = null, this.next_line = new t(this), this.space_before_token = !1, this.non_breaking_space = !1, this.previous_token_wrapped = !1, this.__add_outputline();
      }
      a.prototype.__add_outputline = function() {
        this.previous_line = this.current_line, this.current_line = this.next_line.clone_empty(), this.__lines.push(this.current_line);
      }, a.prototype.get_line_number = function() {
        return this.__lines.length;
      }, a.prototype.get_indent_string = function(e, o) {
        return this.__indent_cache.get_indent_string(e, o);
      }, a.prototype.get_indent_size = function(e, o) {
        return this.__indent_cache.get_indent_size(e, o);
      }, a.prototype.is_empty = function() {
        return !this.previous_line && this.current_line.is_empty();
      }, a.prototype.add_new_line = function(e) {
        return this.is_empty() || !e && this.just_added_newline() ? !1 : (this.raw || this.__add_outputline(), !0);
      }, a.prototype.get_code = function(e) {
        this.trim(!0);
        var o = this.current_line.pop();
        o && (o[o.length - 1] === `
` && (o = o.replace(/\n+$/g, "")), this.current_line.push(o)), this._end_with_newline && this.__add_outputline();
        var r = this.__lines.join(`
`);
        return e !== `
` && (r = r.replace(/[\n]/g, e)), r;
      }, a.prototype.set_wrap_point = function() {
        this.current_line._set_wrap_point();
      }, a.prototype.set_indent = function(e, o) {
        return e = e || 0, o = o || 0, this.next_line.set_indent(e, o), this.__lines.length > 1 ? (this.current_line.set_indent(e, o), !0) : (this.current_line.set_indent(), !1);
      }, a.prototype.add_raw_token = function(e) {
        for (var o = 0; o < e.newlines; o++)
          this.__add_outputline();
        this.current_line.set_indent(-1), this.current_line.push(e.whitespace_before), this.current_line.push(e.text), this.space_before_token = !1, this.non_breaking_space = !1, this.previous_token_wrapped = !1;
      }, a.prototype.add_token = function(e) {
        this.__add_space_before_token(), this.current_line.push(e), this.space_before_token = !1, this.non_breaking_space = !1, this.previous_token_wrapped = this.current_line._allow_wrap();
      }, a.prototype.__add_space_before_token = function() {
        this.space_before_token && !this.just_added_newline() && (this.non_breaking_space || this.set_wrap_point(), this.current_line.push(" "));
      }, a.prototype.remove_indent = function(e) {
        for (var o = this.__lines.length; e < o; )
          this.__lines[e]._remove_indent(), e++;
        this.current_line._remove_wrap_indent();
      }, a.prototype.trim = function(e) {
        for (e = e === void 0 ? !1 : e, this.current_line.trim(); e && this.__lines.length > 1 && this.current_line.is_empty(); )
          this.__lines.pop(), this.current_line = this.__lines[this.__lines.length - 1], this.current_line.trim();
        this.previous_line = this.__lines.length > 1 ? this.__lines[this.__lines.length - 2] : null;
      }, a.prototype.just_added_newline = function() {
        return this.current_line.is_empty();
      }, a.prototype.just_added_blankline = function() {
        return this.is_empty() || this.current_line.is_empty() && this.previous_line.is_empty();
      }, a.prototype.ensure_empty_line_above = function(e, o) {
        for (var r = this.__lines.length - 2; r >= 0; ) {
          var h = this.__lines[r];
          if (h.is_empty())
            break;
          if (h.item(0).indexOf(e) !== 0 && h.item(-1) !== o) {
            this.__lines.splice(r + 1, 0, new t(this)), this.previous_line = this.__lines[this.__lines.length - 2];
            break;
          }
          r--;
        }
      }, s.exports.Output = a;
    },
    /* 3 */
    /***/
    function(s) {
      function t(i, a, e, o) {
        this.type = i, this.text = a, this.comments_before = null, this.newlines = e || 0, this.whitespace_before = o || "", this.parent = null, this.next = null, this.previous = null, this.opened = null, this.closed = null, this.directives = null;
      }
      s.exports.Token = t;
    },
    ,
    ,
    /* 6 */
    /***/
    function(s) {
      function t(e, o) {
        this.raw_options = i(e, o), this.disabled = this._get_boolean("disabled"), this.eol = this._get_characters("eol", "auto"), this.end_with_newline = this._get_boolean("end_with_newline"), this.indent_size = this._get_number("indent_size", 4), this.indent_char = this._get_characters("indent_char", " "), this.indent_level = this._get_number("indent_level"), this.preserve_newlines = this._get_boolean("preserve_newlines", !0), this.max_preserve_newlines = this._get_number("max_preserve_newlines", 32786), this.preserve_newlines || (this.max_preserve_newlines = 0), this.indent_with_tabs = this._get_boolean("indent_with_tabs", this.indent_char === "	"), this.indent_with_tabs && (this.indent_char = "	", this.indent_size === 1 && (this.indent_size = 4)), this.wrap_line_length = this._get_number("wrap_line_length", this._get_number("max_char")), this.indent_empty_lines = this._get_boolean("indent_empty_lines"), this.templating = this._get_selection_list("templating", ["auto", "none", "django", "erb", "handlebars", "php", "smarty"], ["auto"]);
      }
      t.prototype._get_array = function(e, o) {
        var r = this.raw_options[e], h = o || [];
        return typeof r == "object" ? r !== null && typeof r.concat == "function" && (h = r.concat()) : typeof r == "string" && (h = r.split(/[^a-zA-Z0-9_\/\-]+/)), h;
      }, t.prototype._get_boolean = function(e, o) {
        var r = this.raw_options[e], h = r === void 0 ? !!o : !!r;
        return h;
      }, t.prototype._get_characters = function(e, o) {
        var r = this.raw_options[e], h = o || "";
        return typeof r == "string" && (h = r.replace(/\\r/, "\r").replace(/\\n/, `
`).replace(/\\t/, "	")), h;
      }, t.prototype._get_number = function(e, o) {
        var r = this.raw_options[e];
        o = parseInt(o, 10), isNaN(o) && (o = 0);
        var h = parseInt(r, 10);
        return isNaN(h) && (h = o), h;
      }, t.prototype._get_selection = function(e, o, r) {
        var h = this._get_selection_list(e, o, r);
        if (h.length !== 1)
          throw new Error(
            "Invalid Option Value: The option '" + e + `' can only be one of the following values:
` + o + `
You passed in: '` + this.raw_options[e] + "'"
          );
        return h[0];
      }, t.prototype._get_selection_list = function(e, o, r) {
        if (!o || o.length === 0)
          throw new Error("Selection list cannot be empty.");
        if (r = r || [o[0]], !this._is_valid_selection(r, o))
          throw new Error("Invalid Default Value!");
        var h = this._get_array(e, r);
        if (!this._is_valid_selection(h, o))
          throw new Error(
            "Invalid Option Value: The option '" + e + `' can contain only the following values:
` + o + `
You passed in: '` + this.raw_options[e] + "'"
          );
        return h;
      }, t.prototype._is_valid_selection = function(e, o) {
        return e.length && o.length && !e.some(function(r) {
          return o.indexOf(r) === -1;
        });
      };
      function i(e, o) {
        var r = {};
        e = a(e);
        var h;
        for (h in e)
          h !== o && (r[h] = e[h]);
        if (o && e[o])
          for (h in e[o])
            r[h] = e[o][h];
        return r;
      }
      function a(e) {
        var o = {}, r;
        for (r in e) {
          var h = r.replace(/-/g, "_");
          o[h] = e[r];
        }
        return o;
      }
      s.exports.Options = t, s.exports.normalizeOpts = a, s.exports.mergeOpts = i;
    },
    ,
    /* 8 */
    /***/
    function(s) {
      var t = RegExp.prototype.hasOwnProperty("sticky");
      function i(a) {
        this.__input = a || "", this.__input_length = this.__input.length, this.__position = 0;
      }
      i.prototype.restart = function() {
        this.__position = 0;
      }, i.prototype.back = function() {
        this.__position > 0 && (this.__position -= 1);
      }, i.prototype.hasNext = function() {
        return this.__position < this.__input_length;
      }, i.prototype.next = function() {
        var a = null;
        return this.hasNext() && (a = this.__input.charAt(this.__position), this.__position += 1), a;
      }, i.prototype.peek = function(a) {
        var e = null;
        return a = a || 0, a += this.__position, a >= 0 && a < this.__input_length && (e = this.__input.charAt(a)), e;
      }, i.prototype.__match = function(a, e) {
        a.lastIndex = e;
        var o = a.exec(this.__input);
        return o && !(t && a.sticky) && o.index !== e && (o = null), o;
      }, i.prototype.test = function(a, e) {
        return e = e || 0, e += this.__position, e >= 0 && e < this.__input_length ? !!this.__match(a, e) : !1;
      }, i.prototype.testChar = function(a, e) {
        var o = this.peek(e);
        return a.lastIndex = 0, o !== null && a.test(o);
      }, i.prototype.match = function(a) {
        var e = this.__match(a, this.__position);
        return e ? this.__position += e[0].length : e = null, e;
      }, i.prototype.read = function(a, e, o) {
        var r = "", h;
        return a && (h = this.match(a), h && (r += h[0])), e && (h || !a) && (r += this.readUntil(e, o)), r;
      }, i.prototype.readUntil = function(a, e) {
        var o = "", r = this.__position;
        a.lastIndex = this.__position;
        var h = a.exec(this.__input);
        return h ? (r = h.index, e && (r += h[0].length)) : r = this.__input_length, o = this.__input.substring(this.__position, r), this.__position = r, o;
      }, i.prototype.readUntilAfter = function(a) {
        return this.readUntil(a, !0);
      }, i.prototype.get_regexp = function(a, e) {
        var o = null, r = "g";
        return e && t && (r = "y"), typeof a == "string" && a !== "" ? o = new RegExp(a, r) : a && (o = new RegExp(a.source, r)), o;
      }, i.prototype.get_literal_regexp = function(a) {
        return RegExp(a.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"));
      }, i.prototype.peekUntilAfter = function(a) {
        var e = this.__position, o = this.readUntilAfter(a);
        return this.__position = e, o;
      }, i.prototype.lookBack = function(a) {
        var e = this.__position - 1;
        return e >= a.length && this.__input.substring(e - a.length, e).toLowerCase() === a;
      }, s.exports.InputScanner = i;
    },
    /* 9 */
    /***/
    function(s, t, i) {
      var a = i(8).InputScanner, e = i(3).Token, o = i(10).TokenStream, r = i(11).WhitespacePattern, h = {
        START: "TK_START",
        RAW: "TK_RAW",
        EOF: "TK_EOF"
      }, l = function(y, v) {
        this._input = new a(y), this._options = v || {}, this.__tokens = null, this._patterns = {}, this._patterns.whitespace = new r(this._input);
      };
      l.prototype.tokenize = function() {
        this._input.restart(), this.__tokens = new o(), this._reset();
        for (var y, v = new e(h.START, ""), d = null, x = [], w = new o(); v.type !== h.EOF; ) {
          for (y = this._get_next_token(v, d); this._is_comment(y); )
            w.add(y), y = this._get_next_token(v, d);
          w.isEmpty() || (y.comments_before = w, w = new o()), y.parent = d, this._is_opening(y) ? (x.push(d), d = y) : d && this._is_closing(y, d) && (y.opened = d, d.closed = y, d = x.pop(), y.parent = d), y.previous = v, v.next = y, this.__tokens.add(y), v = y;
        }
        return this.__tokens;
      }, l.prototype._is_first_token = function() {
        return this.__tokens.isEmpty();
      }, l.prototype._reset = function() {
      }, l.prototype._get_next_token = function(y, v) {
        this._readWhitespace();
        var d = this._input.read(/.+/g);
        return d ? this._create_token(h.RAW, d) : this._create_token(h.EOF, "");
      }, l.prototype._is_comment = function(y) {
        return !1;
      }, l.prototype._is_opening = function(y) {
        return !1;
      }, l.prototype._is_closing = function(y, v) {
        return !1;
      }, l.prototype._create_token = function(y, v) {
        var d = new e(
          y,
          v,
          this._patterns.whitespace.newline_count,
          this._patterns.whitespace.whitespace_before_token
        );
        return d;
      }, l.prototype._readWhitespace = function() {
        return this._patterns.whitespace.read();
      }, s.exports.Tokenizer = l, s.exports.TOKEN = h;
    },
    /* 10 */
    /***/
    function(s) {
      function t(i) {
        this.__tokens = [], this.__tokens_length = this.__tokens.length, this.__position = 0, this.__parent_token = i;
      }
      t.prototype.restart = function() {
        this.__position = 0;
      }, t.prototype.isEmpty = function() {
        return this.__tokens_length === 0;
      }, t.prototype.hasNext = function() {
        return this.__position < this.__tokens_length;
      }, t.prototype.next = function() {
        var i = null;
        return this.hasNext() && (i = this.__tokens[this.__position], this.__position += 1), i;
      }, t.prototype.peek = function(i) {
        var a = null;
        return i = i || 0, i += this.__position, i >= 0 && i < this.__tokens_length && (a = this.__tokens[i]), a;
      }, t.prototype.add = function(i) {
        this.__parent_token && (i.parent = this.__parent_token), this.__tokens.push(i), this.__tokens_length += 1;
      }, s.exports.TokenStream = t;
    },
    /* 11 */
    /***/
    function(s, t, i) {
      var a = i(12).Pattern;
      function e(o, r) {
        a.call(this, o, r), r ? this._line_regexp = this._input.get_regexp(r._line_regexp) : this.__set_whitespace_patterns("", ""), this.newline_count = 0, this.whitespace_before_token = "";
      }
      e.prototype = new a(), e.prototype.__set_whitespace_patterns = function(o, r) {
        o += "\\t ", r += "\\n\\r", this._match_pattern = this._input.get_regexp(
          "[" + o + r + "]+",
          !0
        ), this._newline_regexp = this._input.get_regexp(
          "\\r\\n|[" + r + "]"
        );
      }, e.prototype.read = function() {
        this.newline_count = 0, this.whitespace_before_token = "";
        var o = this._input.read(this._match_pattern);
        if (o === " ")
          this.whitespace_before_token = " ";
        else if (o) {
          var r = this.__split(this._newline_regexp, o);
          this.newline_count = r.length - 1, this.whitespace_before_token = r[this.newline_count];
        }
        return o;
      }, e.prototype.matching = function(o, r) {
        var h = this._create();
        return h.__set_whitespace_patterns(o, r), h._update(), h;
      }, e.prototype._create = function() {
        return new e(this._input, this);
      }, e.prototype.__split = function(o, r) {
        o.lastIndex = 0;
        for (var h = 0, l = [], y = o.exec(r); y; )
          l.push(r.substring(h, y.index)), h = y.index + y[0].length, y = o.exec(r);
        return h < r.length ? l.push(r.substring(h, r.length)) : l.push(""), l;
      }, s.exports.WhitespacePattern = e;
    },
    /* 12 */
    /***/
    function(s) {
      function t(i, a) {
        this._input = i, this._starting_pattern = null, this._match_pattern = null, this._until_pattern = null, this._until_after = !1, a && (this._starting_pattern = this._input.get_regexp(a._starting_pattern, !0), this._match_pattern = this._input.get_regexp(a._match_pattern, !0), this._until_pattern = this._input.get_regexp(a._until_pattern), this._until_after = a._until_after);
      }
      t.prototype.read = function() {
        var i = this._input.read(this._starting_pattern);
        return (!this._starting_pattern || i) && (i += this._input.read(this._match_pattern, this._until_pattern, this._until_after)), i;
      }, t.prototype.read_match = function() {
        return this._input.match(this._match_pattern);
      }, t.prototype.until_after = function(i) {
        var a = this._create();
        return a._until_after = !0, a._until_pattern = this._input.get_regexp(i), a._update(), a;
      }, t.prototype.until = function(i) {
        var a = this._create();
        return a._until_after = !1, a._until_pattern = this._input.get_regexp(i), a._update(), a;
      }, t.prototype.starting_with = function(i) {
        var a = this._create();
        return a._starting_pattern = this._input.get_regexp(i, !0), a._update(), a;
      }, t.prototype.matching = function(i) {
        var a = this._create();
        return a._match_pattern = this._input.get_regexp(i, !0), a._update(), a;
      }, t.prototype._create = function() {
        return new t(this._input, this);
      }, t.prototype._update = function() {
      }, s.exports.Pattern = t;
    },
    /* 13 */
    /***/
    function(s) {
      function t(i, a) {
        i = typeof i == "string" ? i : i.source, a = typeof a == "string" ? a : a.source, this.__directives_block_pattern = new RegExp(i + / beautify( \w+[:]\w+)+ /.source + a, "g"), this.__directive_pattern = / (\w+)[:](\w+)/g, this.__directives_end_ignore_pattern = new RegExp(i + /\sbeautify\signore:end\s/.source + a, "g");
      }
      t.prototype.get_directives = function(i) {
        if (!i.match(this.__directives_block_pattern))
          return null;
        var a = {};
        this.__directive_pattern.lastIndex = 0;
        for (var e = this.__directive_pattern.exec(i); e; )
          a[e[1]] = e[2], e = this.__directive_pattern.exec(i);
        return a;
      }, t.prototype.readIgnored = function(i) {
        return i.readUntilAfter(this.__directives_end_ignore_pattern);
      }, s.exports.Directives = t;
    },
    /* 14 */
    /***/
    function(s, t, i) {
      var a = i(12).Pattern, e = {
        django: !1,
        erb: !1,
        handlebars: !1,
        php: !1,
        smarty: !1
      };
      function o(r, h) {
        a.call(this, r, h), this.__template_pattern = null, this._disabled = Object.assign({}, e), this._excluded = Object.assign({}, e), h && (this.__template_pattern = this._input.get_regexp(h.__template_pattern), this._excluded = Object.assign(this._excluded, h._excluded), this._disabled = Object.assign(this._disabled, h._disabled));
        var l = new a(r);
        this.__patterns = {
          handlebars_comment: l.starting_with(/{{!--/).until_after(/--}}/),
          handlebars_unescaped: l.starting_with(/{{{/).until_after(/}}}/),
          handlebars: l.starting_with(/{{/).until_after(/}}/),
          php: l.starting_with(/<\?(?:[= ]|php)/).until_after(/\?>/),
          erb: l.starting_with(/<%[^%]/).until_after(/[^%]%>/),
          // django coflicts with handlebars a bit.
          django: l.starting_with(/{%/).until_after(/%}/),
          django_value: l.starting_with(/{{/).until_after(/}}/),
          django_comment: l.starting_with(/{#/).until_after(/#}/),
          smarty: l.starting_with(/{(?=[^}{\s\n])/).until_after(/[^\s\n]}/),
          smarty_comment: l.starting_with(/{\*/).until_after(/\*}/),
          smarty_literal: l.starting_with(/{literal}/).until_after(/{\/literal}/)
        };
      }
      o.prototype = new a(), o.prototype._create = function() {
        return new o(this._input, this);
      }, o.prototype._update = function() {
        this.__set_templated_pattern();
      }, o.prototype.disable = function(r) {
        var h = this._create();
        return h._disabled[r] = !0, h._update(), h;
      }, o.prototype.read_options = function(r) {
        var h = this._create();
        for (var l in e)
          h._disabled[l] = r.templating.indexOf(l) === -1;
        return h._update(), h;
      }, o.prototype.exclude = function(r) {
        var h = this._create();
        return h._excluded[r] = !0, h._update(), h;
      }, o.prototype.read = function() {
        var r = "";
        this._match_pattern ? r = this._input.read(this._starting_pattern) : r = this._input.read(this._starting_pattern, this.__template_pattern);
        for (var h = this._read_template(); h; )
          this._match_pattern ? h += this._input.read(this._match_pattern) : h += this._input.readUntil(this.__template_pattern), r += h, h = this._read_template();
        return this._until_after && (r += this._input.readUntilAfter(this._until_pattern)), r;
      }, o.prototype.__set_templated_pattern = function() {
        var r = [];
        this._disabled.php || r.push(this.__patterns.php._starting_pattern.source), this._disabled.handlebars || r.push(this.__patterns.handlebars._starting_pattern.source), this._disabled.erb || r.push(this.__patterns.erb._starting_pattern.source), this._disabled.django || (r.push(this.__patterns.django._starting_pattern.source), r.push(this.__patterns.django_value._starting_pattern.source), r.push(this.__patterns.django_comment._starting_pattern.source)), this._disabled.smarty || r.push(this.__patterns.smarty._starting_pattern.source), this._until_pattern && r.push(this._until_pattern.source), this.__template_pattern = this._input.get_regexp("(?:" + r.join("|") + ")");
      }, o.prototype._read_template = function() {
        var r = "", h = this._input.peek();
        if (h === "<") {
          var l = this._input.peek(1);
          !this._disabled.php && !this._excluded.php && l === "?" && (r = r || this.__patterns.php.read()), !this._disabled.erb && !this._excluded.erb && l === "%" && (r = r || this.__patterns.erb.read());
        } else
          h === "{" && (!this._disabled.handlebars && !this._excluded.handlebars && (r = r || this.__patterns.handlebars_comment.read(), r = r || this.__patterns.handlebars_unescaped.read(), r = r || this.__patterns.handlebars.read()), this._disabled.django || (!this._excluded.django && !this._excluded.handlebars && (r = r || this.__patterns.django_value.read()), this._excluded.django || (r = r || this.__patterns.django_comment.read(), r = r || this.__patterns.django.read())), this._disabled.smarty || this._disabled.django && this._disabled.handlebars && (r = r || this.__patterns.smarty_comment.read(), r = r || this.__patterns.smarty_literal.read(), r = r || this.__patterns.smarty.read()));
        return r;
      }, s.exports.TemplatablePattern = o;
    },
    ,
    ,
    ,
    /* 18 */
    /***/
    function(s, t, i) {
      var a = i(19).Beautifier, e = i(20).Options;
      function o(r, h, l, y) {
        var v = new a(r, h, l, y);
        return v.beautify();
      }
      s.exports = o, s.exports.defaultOptions = function() {
        return new e();
      };
    },
    /* 19 */
    /***/
    function(s, t, i) {
      var a = i(20).Options, e = i(2).Output, o = i(21).Tokenizer, r = i(21).TOKEN, h = /\r\n|[\r\n]/, l = /\r\n|[\r\n]/g, y = function(p, c) {
        this.indent_level = 0, this.alignment_size = 0, this.max_preserve_newlines = p.max_preserve_newlines, this.preserve_newlines = p.preserve_newlines, this._output = new e(p, c);
      };
      y.prototype.current_line_has_match = function(p) {
        return this._output.current_line.has_match(p);
      }, y.prototype.set_space_before_token = function(p, c) {
        this._output.space_before_token = p, this._output.non_breaking_space = c;
      }, y.prototype.set_wrap_point = function() {
        this._output.set_indent(this.indent_level, this.alignment_size), this._output.set_wrap_point();
      }, y.prototype.add_raw_token = function(p) {
        this._output.add_raw_token(p);
      }, y.prototype.print_preserved_newlines = function(p) {
        var c = 0;
        p.type !== r.TEXT && p.previous.type !== r.TEXT && (c = p.newlines ? 1 : 0), this.preserve_newlines && (c = p.newlines < this.max_preserve_newlines + 1 ? p.newlines : this.max_preserve_newlines + 1);
        for (var f = 0; f < c; f++)
          this.print_newline(f > 0);
        return c !== 0;
      }, y.prototype.traverse_whitespace = function(p) {
        return p.whitespace_before || p.newlines ? (this.print_preserved_newlines(p) || (this._output.space_before_token = !0), !0) : !1;
      }, y.prototype.previous_token_wrapped = function() {
        return this._output.previous_token_wrapped;
      }, y.prototype.print_newline = function(p) {
        this._output.add_new_line(p);
      }, y.prototype.print_token = function(p) {
        p.text && (this._output.set_indent(this.indent_level, this.alignment_size), this._output.add_token(p.text));
      }, y.prototype.indent = function() {
        this.indent_level++;
      }, y.prototype.get_full_indent = function(p) {
        return p = this.indent_level + (p || 0), p < 1 ? "" : this._output.get_indent_string(p);
      };
      var v = function(p) {
        for (var c = null, f = p.next; f.type !== r.EOF && p.closed !== f; ) {
          if (f.type === r.ATTRIBUTE && f.text === "type") {
            f.next && f.next.type === r.EQUALS && f.next.next && f.next.next.type === r.VALUE && (c = f.next.next.text);
            break;
          }
          f = f.next;
        }
        return c;
      }, d = function(p, c) {
        var f = null, j = null;
        return c.closed ? (p === "script" ? f = "text/javascript" : p === "style" && (f = "text/css"), f = v(c) || f, f.search("text/css") > -1 ? j = "css" : f.search(/module|((text|application|dojo)\/(x-)?(javascript|ecmascript|jscript|livescript|(ld\+)?json|method|aspect))/) > -1 ? j = "javascript" : f.search(/(text|application|dojo)\/(x-)?(html)/) > -1 ? j = "html" : f.search(/test\/null/) > -1 && (j = "null"), j) : null;
      };
      function x(p, c) {
        return c.indexOf(p) !== -1;
      }
      function w(p, c, f) {
        this.parent = p || null, this.tag = c ? c.tag_name : "", this.indent_level = f || 0, this.parser_token = c || null;
      }
      function E(p) {
        this._printer = p, this._current_frame = null;
      }
      E.prototype.get_parser_token = function() {
        return this._current_frame ? this._current_frame.parser_token : null;
      }, E.prototype.record_tag = function(p) {
        var c = new w(this._current_frame, p, this._printer.indent_level);
        this._current_frame = c;
      }, E.prototype._try_pop_frame = function(p) {
        var c = null;
        return p && (c = p.parser_token, this._printer.indent_level = p.indent_level, this._current_frame = p.parent), c;
      }, E.prototype._get_frame = function(p, c) {
        for (var f = this._current_frame; f && p.indexOf(f.tag) === -1; ) {
          if (c && c.indexOf(f.tag) !== -1) {
            f = null;
            break;
          }
          f = f.parent;
        }
        return f;
      }, E.prototype.try_pop = function(p, c) {
        var f = this._get_frame([p], c);
        return this._try_pop_frame(f);
      }, E.prototype.indent_to_tag = function(p) {
        var c = this._get_frame(p);
        c && (this._printer.indent_level = c.indent_level);
      };
      function C(p, c, f, j) {
        this._source_text = p || "", c = c || {}, this._js_beautify = f, this._css_beautify = j, this._tag_stack = null;
        var T = new a(c, "html");
        this._options = T, this._is_wrap_attributes_force = this._options.wrap_attributes.substr(0, 5) === "force", this._is_wrap_attributes_force_expand_multiline = this._options.wrap_attributes === "force-expand-multiline", this._is_wrap_attributes_force_aligned = this._options.wrap_attributes === "force-aligned", this._is_wrap_attributes_aligned_multiple = this._options.wrap_attributes === "aligned-multiple", this._is_wrap_attributes_preserve = this._options.wrap_attributes.substr(0, 8) === "preserve", this._is_wrap_attributes_preserve_aligned = this._options.wrap_attributes === "preserve-aligned";
      }
      C.prototype.beautify = function() {
        if (this._options.disabled)
          return this._source_text;
        var p = this._source_text, c = this._options.eol;
        this._options.eol === "auto" && (c = `
`, p && h.test(p) && (c = p.match(h)[0])), p = p.replace(l, `
`);
        var f = p.match(/^[\t ]*/)[0], j = {
          text: "",
          type: ""
        }, T = new P(), U = new y(this._options, f), D = new o(p, this._options).tokenize();
        this._tag_stack = new E(U);
        for (var L = null, R = D.next(); R.type !== r.EOF; )
          R.type === r.TAG_OPEN || R.type === r.COMMENT ? (L = this._handle_tag_open(U, R, T, j), T = L) : R.type === r.ATTRIBUTE || R.type === r.EQUALS || R.type === r.VALUE || R.type === r.TEXT && !T.tag_complete ? L = this._handle_inside_tag(U, R, T, D) : R.type === r.TAG_CLOSE ? L = this._handle_tag_close(U, R, T) : R.type === r.TEXT ? L = this._handle_text(U, R, T) : U.add_raw_token(R), j = L, R = D.next();
        var z = U._output.get_code(c);
        return z;
      }, C.prototype._handle_tag_close = function(p, c, f) {
        var j = {
          text: c.text,
          type: c.type
        };
        return p.alignment_size = 0, f.tag_complete = !0, p.set_space_before_token(c.newlines || c.whitespace_before !== "", !0), f.is_unformatted ? p.add_raw_token(c) : (f.tag_start_char === "<" && (p.set_space_before_token(c.text[0] === "/", !0), this._is_wrap_attributes_force_expand_multiline && f.has_wrapped_attrs && p.print_newline(!1)), p.print_token(c)), f.indent_content && !(f.is_unformatted || f.is_content_unformatted) && (p.indent(), f.indent_content = !1), !f.is_inline_element && !(f.is_unformatted || f.is_content_unformatted) && p.set_wrap_point(), j;
      }, C.prototype._handle_inside_tag = function(p, c, f, j) {
        var T = f.has_wrapped_attrs, U = {
          text: c.text,
          type: c.type
        };
        if (p.set_space_before_token(c.newlines || c.whitespace_before !== "", !0), f.is_unformatted)
          p.add_raw_token(c);
        else if (f.tag_start_char === "{" && c.type === r.TEXT)
          p.print_preserved_newlines(c) ? (c.newlines = 0, p.add_raw_token(c)) : p.print_token(c);
        else {
          if (c.type === r.ATTRIBUTE ? (p.set_space_before_token(!0), f.attr_count += 1) : (c.type === r.EQUALS || c.type === r.VALUE && c.previous.type === r.EQUALS) && p.set_space_before_token(!1), c.type === r.ATTRIBUTE && f.tag_start_char === "<" && ((this._is_wrap_attributes_preserve || this._is_wrap_attributes_preserve_aligned) && (p.traverse_whitespace(c), T = T || c.newlines !== 0), this._is_wrap_attributes_force)) {
            var D = f.attr_count > 1;
            if (this._is_wrap_attributes_force_expand_multiline && f.attr_count === 1) {
              var L = !0, R = 0, z;
              do {
                if (z = j.peek(R), z.type === r.ATTRIBUTE) {
                  L = !1;
                  break;
                }
                R += 1;
              } while (R < 4 && z.type !== r.EOF && z.type !== r.TAG_CLOSE);
              D = !L;
            }
            D && (p.print_newline(!1), T = !0);
          }
          p.print_token(c), T = T || p.previous_token_wrapped(), f.has_wrapped_attrs = T;
        }
        return U;
      }, C.prototype._handle_text = function(p, c, f) {
        var j = {
          text: c.text,
          type: "TK_CONTENT"
        };
        return f.custom_beautifier_name ? this._print_custom_beatifier_text(p, c, f) : f.is_unformatted || f.is_content_unformatted ? p.add_raw_token(c) : (p.traverse_whitespace(c), p.print_token(c)), j;
      }, C.prototype._print_custom_beatifier_text = function(p, c, f) {
        var j = this;
        if (c.text !== "") {
          var T = c.text, U, D = 1, L = "", R = "";
          f.custom_beautifier_name === "javascript" && typeof this._js_beautify == "function" ? U = this._js_beautify : f.custom_beautifier_name === "css" && typeof this._css_beautify == "function" ? U = this._css_beautify : f.custom_beautifier_name === "html" && (U = function(S, O) {
            var I = new C(S, O, j._js_beautify, j._css_beautify);
            return I.beautify();
          }), this._options.indent_scripts === "keep" ? D = 0 : this._options.indent_scripts === "separate" && (D = -p.indent_level);
          var z = p.get_full_indent(D);
          if (T = T.replace(/\n[ \t]*$/, ""), f.custom_beautifier_name !== "html" && T[0] === "<" && T.match(/^(<!--|<!\[CDATA\[)/)) {
            var b = /^(<!--[^\n]*|<!\[CDATA\[)(\n?)([ \t\n]*)([\s\S]*)(-->|]]>)$/.exec(T);
            if (!b) {
              p.add_raw_token(c);
              return;
            }
            L = z + b[1] + `
`, T = b[4], b[5] && (R = z + b[5]), T = T.replace(/\n[ \t]*$/, ""), (b[2] || b[3].indexOf(`
`) !== -1) && (b = b[3].match(/[ \t]+$/), b && (c.whitespace_before = b[0]));
          }
          if (T)
            if (U) {
              var m = function() {
                this.eol = `
`;
              };
              m.prototype = this._options.raw_options;
              var A = new m();
              T = U(z + T, A);
            } else {
              var k = c.whitespace_before;
              k && (T = T.replace(new RegExp(`
(` + k + ")?", "g"), `
`)), T = z + T.replace(/\n/g, `
` + z);
            }
          L && (T ? T = L + T + `
` + R : T = L + R), p.print_newline(!1), T && (c.text = T, c.whitespace_before = "", c.newlines = 0, p.add_raw_token(c), p.print_newline(!0));
        }
      }, C.prototype._handle_tag_open = function(p, c, f, j) {
        var T = this._get_tag_open_token(c);
        return (f.is_unformatted || f.is_content_unformatted) && !f.is_empty_element && c.type === r.TAG_OPEN && c.text.indexOf("</") === 0 ? (p.add_raw_token(c), T.start_tag_token = this._tag_stack.try_pop(T.tag_name)) : (p.traverse_whitespace(c), this._set_tag_position(p, c, T, f, j), T.is_inline_element || p.set_wrap_point(), p.print_token(c)), (this._is_wrap_attributes_force_aligned || this._is_wrap_attributes_aligned_multiple || this._is_wrap_attributes_preserve_aligned) && (T.alignment_size = c.text.length + 1), !T.tag_complete && !T.is_unformatted && (p.alignment_size = T.alignment_size), T;
      };
      var P = function(p, c) {
        if (this.parent = p || null, this.text = "", this.type = "TK_TAG_OPEN", this.tag_name = "", this.is_inline_element = !1, this.is_unformatted = !1, this.is_content_unformatted = !1, this.is_empty_element = !1, this.is_start_tag = !1, this.is_end_tag = !1, this.indent_content = !1, this.multiline_content = !1, this.custom_beautifier_name = null, this.start_tag_token = null, this.attr_count = 0, this.has_wrapped_attrs = !1, this.alignment_size = 0, this.tag_complete = !1, this.tag_start_char = "", this.tag_check = "", !c)
          this.tag_complete = !0;
        else {
          var f;
          this.tag_start_char = c.text[0], this.text = c.text, this.tag_start_char === "<" ? (f = c.text.match(/^<([^\s>]*)/), this.tag_check = f ? f[1] : "") : (f = c.text.match(/^{{(?:[\^]|#\*?)?([^\s}]+)/), this.tag_check = f ? f[1] : "", c.text === "{{#>" && this.tag_check === ">" && c.next !== null && (this.tag_check = c.next.text)), this.tag_check = this.tag_check.toLowerCase(), c.type === r.COMMENT && (this.tag_complete = !0), this.is_start_tag = this.tag_check.charAt(0) !== "/", this.tag_name = this.is_start_tag ? this.tag_check : this.tag_check.substr(1), this.is_end_tag = !this.is_start_tag || c.closed && c.closed.text === "/>", this.is_end_tag = this.is_end_tag || this.tag_start_char === "{" && (this.text.length < 3 || /[^#\^]/.test(this.text.charAt(2)));
        }
      };
      C.prototype._get_tag_open_token = function(p) {
        var c = new P(this._tag_stack.get_parser_token(), p);
        return c.alignment_size = this._options.wrap_attributes_indent_size, c.is_end_tag = c.is_end_tag || x(c.tag_check, this._options.void_elements), c.is_empty_element = c.tag_complete || c.is_start_tag && c.is_end_tag, c.is_unformatted = !c.tag_complete && x(c.tag_check, this._options.unformatted), c.is_content_unformatted = !c.is_empty_element && x(c.tag_check, this._options.content_unformatted), c.is_inline_element = x(c.tag_name, this._options.inline) || c.tag_start_char === "{", c;
      }, C.prototype._set_tag_position = function(p, c, f, j, T) {
        if (f.is_empty_element || (f.is_end_tag ? f.start_tag_token = this._tag_stack.try_pop(f.tag_name) : (this._do_optional_end_element(f) && (f.is_inline_element || p.print_newline(!1)), this._tag_stack.record_tag(f), (f.tag_name === "script" || f.tag_name === "style") && !(f.is_unformatted || f.is_content_unformatted) && (f.custom_beautifier_name = d(f.tag_check, c)))), x(f.tag_check, this._options.extra_liners) && (p.print_newline(!1), p._output.just_added_blankline() || p.print_newline(!0)), f.is_empty_element) {
          if (f.tag_start_char === "{" && f.tag_check === "else") {
            this._tag_stack.indent_to_tag(["if", "unless", "each"]), f.indent_content = !0;
            var U = p.current_line_has_match(/{{#if/);
            U || p.print_newline(!1);
          }
          f.tag_name === "!--" && T.type === r.TAG_CLOSE && j.is_end_tag && f.text.indexOf(`
`) === -1 || (f.is_inline_element || f.is_unformatted || p.print_newline(!1), this._calcluate_parent_multiline(p, f));
        } else if (f.is_end_tag) {
          var D = !1;
          D = f.start_tag_token && f.start_tag_token.multiline_content, D = D || !f.is_inline_element && !(j.is_inline_element || j.is_unformatted) && !(T.type === r.TAG_CLOSE && f.start_tag_token === j) && T.type !== "TK_CONTENT", (f.is_content_unformatted || f.is_unformatted) && (D = !1), D && p.print_newline(!1);
        } else
          f.indent_content = !f.custom_beautifier_name, f.tag_start_char === "<" && (f.tag_name === "html" ? f.indent_content = this._options.indent_inner_html : f.tag_name === "head" ? f.indent_content = this._options.indent_head_inner_html : f.tag_name === "body" && (f.indent_content = this._options.indent_body_inner_html)), !(f.is_inline_element || f.is_unformatted) && (T.type !== "TK_CONTENT" || f.is_content_unformatted) && p.print_newline(!1), this._calcluate_parent_multiline(p, f);
      }, C.prototype._calcluate_parent_multiline = function(p, c) {
        c.parent && p._output.just_added_newline() && !((c.is_inline_element || c.is_unformatted) && c.parent.is_inline_element) && (c.parent.multiline_content = !0);
      };
      var B = ["address", "article", "aside", "blockquote", "details", "div", "dl", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hr", "main", "nav", "ol", "p", "pre", "section", "table", "ul"], G = ["a", "audio", "del", "ins", "map", "noscript", "video"];
      C.prototype._do_optional_end_element = function(p) {
        var c = null;
        if (!(p.is_empty_element || !p.is_start_tag || !p.parent)) {
          if (p.tag_name === "body")
            c = c || this._tag_stack.try_pop("head");
          else if (p.tag_name === "li")
            c = c || this._tag_stack.try_pop("li", ["ol", "ul"]);
          else if (p.tag_name === "dd" || p.tag_name === "dt")
            c = c || this._tag_stack.try_pop("dt", ["dl"]), c = c || this._tag_stack.try_pop("dd", ["dl"]);
          else if (p.parent.tag_name === "p" && B.indexOf(p.tag_name) !== -1) {
            var f = p.parent.parent;
            (!f || G.indexOf(f.tag_name) === -1) && (c = c || this._tag_stack.try_pop("p"));
          } else
            p.tag_name === "rp" || p.tag_name === "rt" ? (c = c || this._tag_stack.try_pop("rt", ["ruby", "rtc"]), c = c || this._tag_stack.try_pop("rp", ["ruby", "rtc"])) : p.tag_name === "optgroup" ? c = c || this._tag_stack.try_pop("optgroup", ["select"]) : p.tag_name === "option" ? c = c || this._tag_stack.try_pop("option", ["select", "datalist", "optgroup"]) : p.tag_name === "colgroup" ? c = c || this._tag_stack.try_pop("caption", ["table"]) : p.tag_name === "thead" ? (c = c || this._tag_stack.try_pop("caption", ["table"]), c = c || this._tag_stack.try_pop("colgroup", ["table"])) : p.tag_name === "tbody" || p.tag_name === "tfoot" ? (c = c || this._tag_stack.try_pop("caption", ["table"]), c = c || this._tag_stack.try_pop("colgroup", ["table"]), c = c || this._tag_stack.try_pop("thead", ["table"]), c = c || this._tag_stack.try_pop("tbody", ["table"])) : p.tag_name === "tr" ? (c = c || this._tag_stack.try_pop("caption", ["table"]), c = c || this._tag_stack.try_pop("colgroup", ["table"]), c = c || this._tag_stack.try_pop("tr", ["table", "thead", "tbody", "tfoot"])) : (p.tag_name === "th" || p.tag_name === "td") && (c = c || this._tag_stack.try_pop("td", ["table", "thead", "tbody", "tfoot", "tr"]), c = c || this._tag_stack.try_pop("th", ["table", "thead", "tbody", "tfoot", "tr"]));
          return p.parent = this._tag_stack.get_parser_token(), c;
        }
      }, s.exports.Beautifier = C;
    },
    /* 20 */
    /***/
    function(s, t, i) {
      var a = i(6).Options;
      function e(o) {
        a.call(this, o, "html"), this.templating.length === 1 && this.templating[0] === "auto" && (this.templating = ["django", "erb", "handlebars", "php"]), this.indent_inner_html = this._get_boolean("indent_inner_html"), this.indent_body_inner_html = this._get_boolean("indent_body_inner_html", !0), this.indent_head_inner_html = this._get_boolean("indent_head_inner_html", !0), this.indent_handlebars = this._get_boolean("indent_handlebars", !0), this.wrap_attributes = this._get_selection(
          "wrap_attributes",
          ["auto", "force", "force-aligned", "force-expand-multiline", "aligned-multiple", "preserve", "preserve-aligned"]
        ), this.wrap_attributes_indent_size = this._get_number("wrap_attributes_indent_size", this.indent_size), this.extra_liners = this._get_array("extra_liners", ["head", "body", "/html"]), this.inline = this._get_array("inline", [
          "a",
          "abbr",
          "area",
          "audio",
          "b",
          "bdi",
          "bdo",
          "br",
          "button",
          "canvas",
          "cite",
          "code",
          "data",
          "datalist",
          "del",
          "dfn",
          "em",
          "embed",
          "i",
          "iframe",
          "img",
          "input",
          "ins",
          "kbd",
          "keygen",
          "label",
          "map",
          "mark",
          "math",
          "meter",
          "noscript",
          "object",
          "output",
          "progress",
          "q",
          "ruby",
          "s",
          "samp",
          /* 'script', */
          "select",
          "small",
          "span",
          "strong",
          "sub",
          "sup",
          "svg",
          "template",
          "textarea",
          "time",
          "u",
          "var",
          "video",
          "wbr",
          "text",
          // obsolete inline tags
          "acronym",
          "big",
          "strike",
          "tt"
        ]), this.void_elements = this._get_array("void_elements", [
          // HTLM void elements - aka self-closing tags - aka singletons
          // https://www.w3.org/html/wg/drafts/html/master/syntax.html#void-elements
          "area",
          "base",
          "br",
          "col",
          "embed",
          "hr",
          "img",
          "input",
          "keygen",
          "link",
          "menuitem",
          "meta",
          "param",
          "source",
          "track",
          "wbr",
          // NOTE: Optional tags are too complex for a simple list
          // they are hard coded in _do_optional_end_element
          // Doctype and xml elements
          "!doctype",
          "?xml",
          // obsolete tags
          // basefont: https://www.computerhope.com/jargon/h/html-basefont-tag.htm
          // isndex: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/isindex
          "basefont",
          "isindex"
        ]), this.unformatted = this._get_array("unformatted", []), this.content_unformatted = this._get_array("content_unformatted", [
          "pre",
          "textarea"
        ]), this.unformatted_content_delimiter = this._get_characters("unformatted_content_delimiter"), this.indent_scripts = this._get_selection("indent_scripts", ["normal", "keep", "separate"]);
      }
      e.prototype = new a(), s.exports.Options = e;
    },
    /* 21 */
    /***/
    function(s, t, i) {
      var a = i(9).Tokenizer, e = i(9).TOKEN, o = i(13).Directives, r = i(14).TemplatablePattern, h = i(12).Pattern, l = {
        TAG_OPEN: "TK_TAG_OPEN",
        TAG_CLOSE: "TK_TAG_CLOSE",
        ATTRIBUTE: "TK_ATTRIBUTE",
        EQUALS: "TK_EQUALS",
        VALUE: "TK_VALUE",
        COMMENT: "TK_COMMENT",
        TEXT: "TK_TEXT",
        UNKNOWN: "TK_UNKNOWN",
        START: e.START,
        RAW: e.RAW,
        EOF: e.EOF
      }, y = new o(/<\!--/, /-->/), v = function(d, x) {
        a.call(this, d, x), this._current_tag_name = "";
        var w = new r(this._input).read_options(this._options), E = new h(this._input);
        if (this.__patterns = {
          word: w.until(/[\n\r\t <]/),
          single_quote: w.until_after(/'/),
          double_quote: w.until_after(/"/),
          attribute: w.until(/[\n\r\t =>]|\/>/),
          element_name: w.until(/[\n\r\t >\/]/),
          handlebars_comment: E.starting_with(/{{!--/).until_after(/--}}/),
          handlebars: E.starting_with(/{{/).until_after(/}}/),
          handlebars_open: E.until(/[\n\r\t }]/),
          handlebars_raw_close: E.until(/}}/),
          comment: E.starting_with(/<!--/).until_after(/-->/),
          cdata: E.starting_with(/<!\[CDATA\[/).until_after(/]]>/),
          // https://en.wikipedia.org/wiki/Conditional_comment
          conditional_comment: E.starting_with(/<!\[/).until_after(/]>/),
          processing: E.starting_with(/<\?/).until_after(/\?>/)
        }, this._options.indent_handlebars && (this.__patterns.word = this.__patterns.word.exclude("handlebars")), this._unformatted_content_delimiter = null, this._options.unformatted_content_delimiter) {
          var C = this._input.get_literal_regexp(this._options.unformatted_content_delimiter);
          this.__patterns.unformatted_content_delimiter = E.matching(C).until_after(C);
        }
      };
      v.prototype = new a(), v.prototype._is_comment = function(d) {
        return !1;
      }, v.prototype._is_opening = function(d) {
        return d.type === l.TAG_OPEN;
      }, v.prototype._is_closing = function(d, x) {
        return d.type === l.TAG_CLOSE && x && ((d.text === ">" || d.text === "/>") && x.text[0] === "<" || d.text === "}}" && x.text[0] === "{" && x.text[1] === "{");
      }, v.prototype._reset = function() {
        this._current_tag_name = "";
      }, v.prototype._get_next_token = function(d, x) {
        var w = null;
        this._readWhitespace();
        var E = this._input.peek();
        return E === null ? this._create_token(l.EOF, "") : (w = w || this._read_open_handlebars(E, x), w = w || this._read_attribute(E, d, x), w = w || this._read_close(E, x), w = w || this._read_raw_content(E, d, x), w = w || this._read_content_word(E), w = w || this._read_comment_or_cdata(E), w = w || this._read_processing(E), w = w || this._read_open(E, x), w = w || this._create_token(l.UNKNOWN, this._input.next()), w);
      }, v.prototype._read_comment_or_cdata = function(d) {
        var x = null, w = null, E = null;
        if (d === "<") {
          var C = this._input.peek(1);
          C === "!" && (w = this.__patterns.comment.read(), w ? (E = y.get_directives(w), E && E.ignore === "start" && (w += y.readIgnored(this._input))) : w = this.__patterns.cdata.read()), w && (x = this._create_token(l.COMMENT, w), x.directives = E);
        }
        return x;
      }, v.prototype._read_processing = function(d) {
        var x = null, w = null, E = null;
        if (d === "<") {
          var C = this._input.peek(1);
          (C === "!" || C === "?") && (w = this.__patterns.conditional_comment.read(), w = w || this.__patterns.processing.read()), w && (x = this._create_token(l.COMMENT, w), x.directives = E);
        }
        return x;
      }, v.prototype._read_open = function(d, x) {
        var w = null, E = null;
        return x || d === "<" && (w = this._input.next(), this._input.peek() === "/" && (w += this._input.next()), w += this.__patterns.element_name.read(), E = this._create_token(l.TAG_OPEN, w)), E;
      }, v.prototype._read_open_handlebars = function(d, x) {
        var w = null, E = null;
        return x || this._options.indent_handlebars && d === "{" && this._input.peek(1) === "{" && (this._input.peek(2) === "!" ? (w = this.__patterns.handlebars_comment.read(), w = w || this.__patterns.handlebars.read(), E = this._create_token(l.COMMENT, w)) : (w = this.__patterns.handlebars_open.read(), E = this._create_token(l.TAG_OPEN, w))), E;
      }, v.prototype._read_close = function(d, x) {
        var w = null, E = null;
        return x && (x.text[0] === "<" && (d === ">" || d === "/" && this._input.peek(1) === ">") ? (w = this._input.next(), d === "/" && (w += this._input.next()), E = this._create_token(l.TAG_CLOSE, w)) : x.text[0] === "{" && d === "}" && this._input.peek(1) === "}" && (this._input.next(), this._input.next(), E = this._create_token(l.TAG_CLOSE, "}}"))), E;
      }, v.prototype._read_attribute = function(d, x, w) {
        var E = null, C = "";
        if (w && w.text[0] === "<")
          if (d === "=")
            E = this._create_token(l.EQUALS, this._input.next());
          else if (d === '"' || d === "'") {
            var P = this._input.next();
            d === '"' ? P += this.__patterns.double_quote.read() : P += this.__patterns.single_quote.read(), E = this._create_token(l.VALUE, P);
          } else
            C = this.__patterns.attribute.read(), C && (x.type === l.EQUALS ? E = this._create_token(l.VALUE, C) : E = this._create_token(l.ATTRIBUTE, C));
        return E;
      }, v.prototype._is_content_unformatted = function(d) {
        return this._options.void_elements.indexOf(d) === -1 && (this._options.content_unformatted.indexOf(d) !== -1 || this._options.unformatted.indexOf(d) !== -1);
      }, v.prototype._read_raw_content = function(d, x, w) {
        var E = "";
        if (w && w.text[0] === "{")
          E = this.__patterns.handlebars_raw_close.read();
        else if (x.type === l.TAG_CLOSE && x.opened.text[0] === "<" && x.text[0] !== "/") {
          var C = x.opened.text.substr(1).toLowerCase();
          if (C === "script" || C === "style") {
            var P = this._read_comment_or_cdata(d);
            if (P)
              return P.type = l.TEXT, P;
            E = this._input.readUntil(new RegExp("</" + C + "[\\n\\r\\t ]*?>", "ig"));
          } else
            this._is_content_unformatted(C) && (E = this._input.readUntil(new RegExp("</" + C + "[\\n\\r\\t ]*?>", "ig")));
        }
        return E ? this._create_token(l.TEXT, E) : null;
      }, v.prototype._read_content_word = function(d) {
        var x = "";
        if (this._options.unformatted_content_delimiter && d === this._options.unformatted_content_delimiter[0] && (x = this.__patterns.unformatted_content_delimiter.read()), x || (x = this.__patterns.word.read()), x)
          return this._create_token(l.TEXT, x);
      }, s.exports.Tokenizer = v, s.exports.TOKEN = l;
    }
    /******/
  ], _ = {};
  function u(s) {
    var t = _[s];
    if (t !== void 0)
      return t.exports;
    var i = _[s] = {
      /******/
      // no module.id needed
      /******/
      // no module.loaded needed
      /******/
      exports: {}
      /******/
    };
    return n[s](i, i.exports, u), i.exports;
  }
  u(18);
})();
(() => {
  var n = { 470: (s) => {
    function t(e) {
      if (typeof e != "string")
        throw new TypeError("Path must be a string. Received " + JSON.stringify(e));
    }
    function i(e, o) {
      for (var r, h = "", l = 0, y = -1, v = 0, d = 0; d <= e.length; ++d) {
        if (d < e.length)
          r = e.charCodeAt(d);
        else {
          if (r === 47)
            break;
          r = 47;
        }
        if (r === 47) {
          if (!(y === d - 1 || v === 1))
            if (y !== d - 1 && v === 2) {
              if (h.length < 2 || l !== 2 || h.charCodeAt(h.length - 1) !== 46 || h.charCodeAt(h.length - 2) !== 46) {
                if (h.length > 2) {
                  var x = h.lastIndexOf("/");
                  if (x !== h.length - 1) {
                    x === -1 ? (h = "", l = 0) : l = (h = h.slice(0, x)).length - 1 - h.lastIndexOf("/"), y = d, v = 0;
                    continue;
                  }
                } else if (h.length === 2 || h.length === 1) {
                  h = "", l = 0, y = d, v = 0;
                  continue;
                }
              }
              o && (h.length > 0 ? h += "/.." : h = "..", l = 2);
            } else
              h.length > 0 ? h += "/" + e.slice(y + 1, d) : h = e.slice(y + 1, d), l = d - y - 1;
          y = d, v = 0;
        } else
          r === 46 && v !== -1 ? ++v : v = -1;
      }
      return h;
    }
    var a = { resolve: function() {
      for (var e, o = "", r = !1, h = arguments.length - 1; h >= -1 && !r; h--) {
        var l;
        h >= 0 ? l = arguments[h] : (e === void 0 && (e = process.cwd()), l = e), t(l), l.length !== 0 && (o = l + "/" + o, r = l.charCodeAt(0) === 47);
      }
      return o = i(o, !r), r ? o.length > 0 ? "/" + o : "/" : o.length > 0 ? o : ".";
    }, normalize: function(e) {
      if (t(e), e.length === 0)
        return ".";
      var o = e.charCodeAt(0) === 47, r = e.charCodeAt(e.length - 1) === 47;
      return (e = i(e, !o)).length !== 0 || o || (e = "."), e.length > 0 && r && (e += "/"), o ? "/" + e : e;
    }, isAbsolute: function(e) {
      return t(e), e.length > 0 && e.charCodeAt(0) === 47;
    }, join: function() {
      if (arguments.length === 0)
        return ".";
      for (var e, o = 0; o < arguments.length; ++o) {
        var r = arguments[o];
        t(r), r.length > 0 && (e === void 0 ? e = r : e += "/" + r);
      }
      return e === void 0 ? "." : a.normalize(e);
    }, relative: function(e, o) {
      if (t(e), t(o), e === o || (e = a.resolve(e)) === (o = a.resolve(o)))
        return "";
      for (var r = 1; r < e.length && e.charCodeAt(r) === 47; ++r)
        ;
      for (var h = e.length, l = h - r, y = 1; y < o.length && o.charCodeAt(y) === 47; ++y)
        ;
      for (var v = o.length - y, d = l < v ? l : v, x = -1, w = 0; w <= d; ++w) {
        if (w === d) {
          if (v > d) {
            if (o.charCodeAt(y + w) === 47)
              return o.slice(y + w + 1);
            if (w === 0)
              return o.slice(y + w);
          } else
            l > d && (e.charCodeAt(r + w) === 47 ? x = w : w === 0 && (x = 0));
          break;
        }
        var E = e.charCodeAt(r + w);
        if (E !== o.charCodeAt(y + w))
          break;
        E === 47 && (x = w);
      }
      var C = "";
      for (w = r + x + 1; w <= h; ++w)
        w !== h && e.charCodeAt(w) !== 47 || (C.length === 0 ? C += ".." : C += "/..");
      return C.length > 0 ? C + o.slice(y + x) : (y += x, o.charCodeAt(y) === 47 && ++y, o.slice(y));
    }, _makeLong: function(e) {
      return e;
    }, dirname: function(e) {
      if (t(e), e.length === 0)
        return ".";
      for (var o = e.charCodeAt(0), r = o === 47, h = -1, l = !0, y = e.length - 1; y >= 1; --y)
        if ((o = e.charCodeAt(y)) === 47) {
          if (!l) {
            h = y;
            break;
          }
        } else
          l = !1;
      return h === -1 ? r ? "/" : "." : r && h === 1 ? "//" : e.slice(0, h);
    }, basename: function(e, o) {
      if (o !== void 0 && typeof o != "string")
        throw new TypeError('"ext" argument must be a string');
      t(e);
      var r, h = 0, l = -1, y = !0;
      if (o !== void 0 && o.length > 0 && o.length <= e.length) {
        if (o.length === e.length && o === e)
          return "";
        var v = o.length - 1, d = -1;
        for (r = e.length - 1; r >= 0; --r) {
          var x = e.charCodeAt(r);
          if (x === 47) {
            if (!y) {
              h = r + 1;
              break;
            }
          } else
            d === -1 && (y = !1, d = r + 1), v >= 0 && (x === o.charCodeAt(v) ? --v == -1 && (l = r) : (v = -1, l = d));
        }
        return h === l ? l = d : l === -1 && (l = e.length), e.slice(h, l);
      }
      for (r = e.length - 1; r >= 0; --r)
        if (e.charCodeAt(r) === 47) {
          if (!y) {
            h = r + 1;
            break;
          }
        } else
          l === -1 && (y = !1, l = r + 1);
      return l === -1 ? "" : e.slice(h, l);
    }, extname: function(e) {
      t(e);
      for (var o = -1, r = 0, h = -1, l = !0, y = 0, v = e.length - 1; v >= 0; --v) {
        var d = e.charCodeAt(v);
        if (d !== 47)
          h === -1 && (l = !1, h = v + 1), d === 46 ? o === -1 ? o = v : y !== 1 && (y = 1) : o !== -1 && (y = -1);
        else if (!l) {
          r = v + 1;
          break;
        }
      }
      return o === -1 || h === -1 || y === 0 || y === 1 && o === h - 1 && o === r + 1 ? "" : e.slice(o, h);
    }, format: function(e) {
      if (e === null || typeof e != "object")
        throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof e);
      return function(o, r) {
        var h = r.dir || r.root, l = r.base || (r.name || "") + (r.ext || "");
        return h ? h === r.root ? h + l : h + "/" + l : l;
      }(0, e);
    }, parse: function(e) {
      t(e);
      var o = { root: "", dir: "", base: "", ext: "", name: "" };
      if (e.length === 0)
        return o;
      var r, h = e.charCodeAt(0), l = h === 47;
      l ? (o.root = "/", r = 1) : r = 0;
      for (var y = -1, v = 0, d = -1, x = !0, w = e.length - 1, E = 0; w >= r; --w)
        if ((h = e.charCodeAt(w)) !== 47)
          d === -1 && (x = !1, d = w + 1), h === 46 ? y === -1 ? y = w : E !== 1 && (E = 1) : y !== -1 && (E = -1);
        else if (!x) {
          v = w + 1;
          break;
        }
      return y === -1 || d === -1 || E === 0 || E === 1 && y === d - 1 && y === v + 1 ? d !== -1 && (o.base = o.name = v === 0 && l ? e.slice(1, d) : e.slice(v, d)) : (v === 0 && l ? (o.name = e.slice(1, y), o.base = e.slice(1, d)) : (o.name = e.slice(v, y), o.base = e.slice(v, d)), o.ext = e.slice(y, d)), v > 0 ? o.dir = e.slice(0, v - 1) : l && (o.dir = "/"), o;
    }, sep: "/", delimiter: ":", win32: null, posix: null };
    a.posix = a, s.exports = a;
  }, 447: (s, t, i) => {
    var a;
    if (i.r(t), i.d(t, { URI: () => E, Utils: () => D }), typeof process == "object")
      a = process.platform === "win32";
    else if (typeof navigator == "object") {
      var e = navigator.userAgent;
      a = e.indexOf("Windows") >= 0;
    }
    var o, r, h = (o = function(b, m) {
      return (o = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(A, k) {
        A.__proto__ = k;
      } || function(A, k) {
        for (var S in k)
          Object.prototype.hasOwnProperty.call(k, S) && (A[S] = k[S]);
      })(b, m);
    }, function(b, m) {
      function A() {
        this.constructor = b;
      }
      o(b, m), b.prototype = m === null ? Object.create(m) : (A.prototype = m.prototype, new A());
    }), l = /^\w[\w\d+.-]*$/, y = /^\//, v = /^\/\//, d = "", x = "/", w = /^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/, E = function() {
      function b(m, A, k, S, O, I) {
        I === void 0 && (I = !1), typeof m == "object" ? (this.scheme = m.scheme || d, this.authority = m.authority || d, this.path = m.path || d, this.query = m.query || d, this.fragment = m.fragment || d) : (this.scheme = function(W, H) {
          return W || H ? W : "file";
        }(m, I), this.authority = A || d, this.path = function(W, H) {
          switch (W) {
            case "https":
            case "http":
            case "file":
              H ? H[0] !== x && (H = x + H) : H = x;
          }
          return H;
        }(this.scheme, k || d), this.query = S || d, this.fragment = O || d, function(W, H) {
          if (!W.scheme && H)
            throw new Error('[UriError]: Scheme is missing: {scheme: "", authority: "' + W.authority + '", path: "' + W.path + '", query: "' + W.query + '", fragment: "' + W.fragment + '"}');
          if (W.scheme && !l.test(W.scheme))
            throw new Error("[UriError]: Scheme contains illegal characters.");
          if (W.path) {
            if (W.authority) {
              if (!y.test(W.path))
                throw new Error('[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character');
            } else if (v.test(W.path))
              throw new Error('[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")');
          }
        }(this, I));
      }
      return b.isUri = function(m) {
        return m instanceof b || !!m && typeof m.authority == "string" && typeof m.fragment == "string" && typeof m.path == "string" && typeof m.query == "string" && typeof m.scheme == "string" && typeof m.fsPath == "function" && typeof m.with == "function" && typeof m.toString == "function";
      }, Object.defineProperty(b.prototype, "fsPath", { get: function() {
        return c(this, !1);
      }, enumerable: !1, configurable: !0 }), b.prototype.with = function(m) {
        if (!m)
          return this;
        var A = m.scheme, k = m.authority, S = m.path, O = m.query, I = m.fragment;
        return A === void 0 ? A = this.scheme : A === null && (A = d), k === void 0 ? k = this.authority : k === null && (k = d), S === void 0 ? S = this.path : S === null && (S = d), O === void 0 ? O = this.query : O === null && (O = d), I === void 0 ? I = this.fragment : I === null && (I = d), A === this.scheme && k === this.authority && S === this.path && O === this.query && I === this.fragment ? this : new P(A, k, S, O, I);
      }, b.parse = function(m, A) {
        A === void 0 && (A = !1);
        var k = w.exec(m);
        return k ? new P(k[2] || d, U(k[4] || d), U(k[5] || d), U(k[7] || d), U(k[9] || d), A) : new P(d, d, d, d, d);
      }, b.file = function(m) {
        var A = d;
        if (a && (m = m.replace(/\\/g, x)), m[0] === x && m[1] === x) {
          var k = m.indexOf(x, 2);
          k === -1 ? (A = m.substring(2), m = x) : (A = m.substring(2, k), m = m.substring(k) || x);
        }
        return new P("file", A, m, d, d);
      }, b.from = function(m) {
        return new P(m.scheme, m.authority, m.path, m.query, m.fragment);
      }, b.prototype.toString = function(m) {
        return m === void 0 && (m = !1), f(this, m);
      }, b.prototype.toJSON = function() {
        return this;
      }, b.revive = function(m) {
        if (m) {
          if (m instanceof b)
            return m;
          var A = new P(m);
          return A._formatted = m.external, A._fsPath = m._sep === C ? m.fsPath : null, A;
        }
        return m;
      }, b;
    }(), C = a ? 1 : void 0, P = function(b) {
      function m() {
        var A = b !== null && b.apply(this, arguments) || this;
        return A._formatted = null, A._fsPath = null, A;
      }
      return h(m, b), Object.defineProperty(m.prototype, "fsPath", { get: function() {
        return this._fsPath || (this._fsPath = c(this, !1)), this._fsPath;
      }, enumerable: !1, configurable: !0 }), m.prototype.toString = function(A) {
        return A === void 0 && (A = !1), A ? f(this, !0) : (this._formatted || (this._formatted = f(this, !1)), this._formatted);
      }, m.prototype.toJSON = function() {
        var A = { $mid: 1 };
        return this._fsPath && (A.fsPath = this._fsPath, A._sep = C), this._formatted && (A.external = this._formatted), this.path && (A.path = this.path), this.scheme && (A.scheme = this.scheme), this.authority && (A.authority = this.authority), this.query && (A.query = this.query), this.fragment && (A.fragment = this.fragment), A;
      }, m;
    }(E), B = ((r = {})[58] = "%3A", r[47] = "%2F", r[63] = "%3F", r[35] = "%23", r[91] = "%5B", r[93] = "%5D", r[64] = "%40", r[33] = "%21", r[36] = "%24", r[38] = "%26", r[39] = "%27", r[40] = "%28", r[41] = "%29", r[42] = "%2A", r[43] = "%2B", r[44] = "%2C", r[59] = "%3B", r[61] = "%3D", r[32] = "%20", r);
    function G(b, m) {
      for (var A = void 0, k = -1, S = 0; S < b.length; S++) {
        var O = b.charCodeAt(S);
        if (O >= 97 && O <= 122 || O >= 65 && O <= 90 || O >= 48 && O <= 57 || O === 45 || O === 46 || O === 95 || O === 126 || m && O === 47)
          k !== -1 && (A += encodeURIComponent(b.substring(k, S)), k = -1), A !== void 0 && (A += b.charAt(S));
        else {
          A === void 0 && (A = b.substr(0, S));
          var I = B[O];
          I !== void 0 ? (k !== -1 && (A += encodeURIComponent(b.substring(k, S)), k = -1), A += I) : k === -1 && (k = S);
        }
      }
      return k !== -1 && (A += encodeURIComponent(b.substring(k))), A !== void 0 ? A : b;
    }
    function p(b) {
      for (var m = void 0, A = 0; A < b.length; A++) {
        var k = b.charCodeAt(A);
        k === 35 || k === 63 ? (m === void 0 && (m = b.substr(0, A)), m += B[k]) : m !== void 0 && (m += b[A]);
      }
      return m !== void 0 ? m : b;
    }
    function c(b, m) {
      var A;
      return A = b.authority && b.path.length > 1 && b.scheme === "file" ? "//" + b.authority + b.path : b.path.charCodeAt(0) === 47 && (b.path.charCodeAt(1) >= 65 && b.path.charCodeAt(1) <= 90 || b.path.charCodeAt(1) >= 97 && b.path.charCodeAt(1) <= 122) && b.path.charCodeAt(2) === 58 ? m ? b.path.substr(1) : b.path[1].toLowerCase() + b.path.substr(2) : b.path, a && (A = A.replace(/\//g, "\\")), A;
    }
    function f(b, m) {
      var A = m ? p : G, k = "", S = b.scheme, O = b.authority, I = b.path, W = b.query, H = b.fragment;
      if (S && (k += S, k += ":"), (O || S === "file") && (k += x, k += x), O) {
        var q = O.indexOf("@");
        if (q !== -1) {
          var _t = O.substr(0, q);
          O = O.substr(q + 1), (q = _t.indexOf(":")) === -1 ? k += A(_t, !1) : (k += A(_t.substr(0, q), !1), k += ":", k += A(_t.substr(q + 1), !1)), k += "@";
        }
        (q = (O = O.toLowerCase()).indexOf(":")) === -1 ? k += A(O, !1) : (k += A(O.substr(0, q), !1), k += O.substr(q));
      }
      if (I) {
        if (I.length >= 3 && I.charCodeAt(0) === 47 && I.charCodeAt(2) === 58)
          (tt = I.charCodeAt(1)) >= 65 && tt <= 90 && (I = "/" + String.fromCharCode(tt + 32) + ":" + I.substr(3));
        else if (I.length >= 2 && I.charCodeAt(1) === 58) {
          var tt;
          (tt = I.charCodeAt(0)) >= 65 && tt <= 90 && (I = String.fromCharCode(tt + 32) + ":" + I.substr(2));
        }
        k += A(I, !0);
      }
      return W && (k += "?", k += A(W, !1)), H && (k += "#", k += m ? H : G(H, !1)), k;
    }
    function j(b) {
      try {
        return decodeURIComponent(b);
      } catch {
        return b.length > 3 ? b.substr(0, 3) + j(b.substr(3)) : b;
      }
    }
    var T = /(%[0-9A-Za-z][0-9A-Za-z])+/g;
    function U(b) {
      return b.match(T) ? b.replace(T, function(m) {
        return j(m);
      }) : b;
    }
    var D, L = i(470), R = function() {
      for (var b = 0, m = 0, A = arguments.length; m < A; m++)
        b += arguments[m].length;
      var k = Array(b), S = 0;
      for (m = 0; m < A; m++)
        for (var O = arguments[m], I = 0, W = O.length; I < W; I++, S++)
          k[S] = O[I];
      return k;
    }, z = L.posix || L;
    (function(b) {
      b.joinPath = function(m) {
        for (var A = [], k = 1; k < arguments.length; k++)
          A[k - 1] = arguments[k];
        return m.with({ path: z.join.apply(z, R([m.path], A)) });
      }, b.resolvePath = function(m) {
        for (var A = [], k = 1; k < arguments.length; k++)
          A[k - 1] = arguments[k];
        var S = m.path || "/";
        return m.with({ path: z.resolve.apply(z, R([S], A)) });
      }, b.dirname = function(m) {
        var A = z.dirname(m.path);
        return A.length === 1 && A.charCodeAt(0) === 46 ? m : m.with({ path: A });
      }, b.basename = function(m) {
        return z.basename(m.path);
      }, b.extname = function(m) {
        return z.extname(m.path);
      };
    })(D || (D = {}));
  } }, _ = {};
  function u(s) {
    if (_[s])
      return _[s].exports;
    var t = _[s] = { exports: {} };
    return n[s](t, t.exports, u), t.exports;
  }
  return u.d = (s, t) => {
    for (var i in t)
      u.o(t, i) && !u.o(s, i) && Object.defineProperty(s, i, { enumerable: !0, get: t[i] });
  }, u.o = (s, t) => Object.prototype.hasOwnProperty.call(s, t), u.r = (s) => {
    typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(s, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(s, "__esModule", { value: !0 });
  }, u(447);
})();
function K(n) {
  if (n)
    return { character: n.column - 1, line: n.lineNumber - 1 };
}
function Ie(n) {
  if (n)
    return {
      start: K(n.getStartPosition()),
      end: K(n.getEndPosition())
    };
}
function X(n) {
  if (n)
    return new ce(n.start.line + 1, n.start.character + 1, n.end.line + 1, n.end.character + 1);
}
function Se(n) {
  return typeof n.insert < "u" && typeof n.replace < "u";
}
function Re(n) {
  var _ = N.CompletionItemKind;
  switch (n) {
    case M.Text:
      return _.Text;
    case M.Method:
      return _.Method;
    case M.Function:
      return _.Function;
    case M.Constructor:
      return _.Constructor;
    case M.Field:
      return _.Field;
    case M.Variable:
      return _.Variable;
    case M.Class:
      return _.Class;
    case M.Interface:
      return _.Interface;
    case M.Module:
      return _.Module;
    case M.Property:
      return _.Property;
    case M.Unit:
      return _.Unit;
    case M.Value:
      return _.Value;
    case M.Enum:
      return _.Enum;
    case M.Keyword:
      return _.Keyword;
    case M.Snippet:
      return _.Snippet;
    case M.Color:
      return _.Color;
    case M.File:
      return _.File;
    case M.Reference:
      return _.Reference;
  }
  return _.Property;
}
function xt(n) {
  if (n)
    return {
      range: X(n.range),
      text: n.newText
    };
}
var fe = (
  /** @class */
  function() {
    function n(_) {
      this._worker = _;
    }
    return Object.defineProperty(n.prototype, "triggerCharacters", {
      get: function() {
        return [".", ":", "<", '"', "=", "/"];
      },
      enumerable: !1,
      configurable: !0
    }), n.prototype.provideCompletionItems = function(_, u, s, t) {
      var i = _.uri;
      return this._worker(i).then(function(a) {
        return a.doComplete(i.toString(), K(u));
      }).then(function(a) {
        if (a) {
          var e = _.getWordUntilPosition(u), o = new ce(u.lineNumber, e.startColumn, u.lineNumber, e.endColumn), r = a.items.map(function(h) {
            var l = {
              label: h.label,
              insertText: h.insertText || h.label,
              sortText: h.sortText,
              filterText: h.filterText,
              documentation: h.documentation,
              detail: h.detail,
              range: o,
              kind: Re(h.kind)
            };
            return h.textEdit && (Se(h.textEdit) ? l.range = {
              insert: X(h.textEdit.insert),
              replace: X(h.textEdit.replace)
            } : l.range = X(h.textEdit.range), l.insertText = h.textEdit.newText), h.additionalTextEdits && (l.additionalTextEdits = h.additionalTextEdits.map(xt)), h.insertTextFormat === wt.Snippet && (l.insertTextRules = N.CompletionItemInsertTextRule.InsertAsSnippet), l;
          });
          return {
            isIncomplete: a.isIncomplete,
            suggestions: r
          };
        }
      });
    }, n;
  }()
);
function Ne(n) {
  return n && typeof n == "object" && typeof n.kind == "string";
}
function ue(n) {
  return typeof n == "string" ? {
    value: n
  } : Ne(n) ? n.kind === "plaintext" ? {
    value: n.value.replace(/[\\`*_{}[\]()#+\-.!]/g, "\\$&")
  } : {
    value: n.value
  } : { value: "```" + n.language + `
` + n.value + "\n```\n" };
}
function Ue(n) {
  if (n)
    return Array.isArray(n) ? n.map(ue) : [ue(n)];
}
var de = (
  /** @class */
  function() {
    function n(_) {
      this._worker = _;
    }
    return n.prototype.provideHover = function(_, u, s) {
      var t = _.uri;
      return this._worker(t).then(function(i) {
        return i.doHover(t.toString(), K(u));
      }).then(function(i) {
        if (i)
          return {
            range: X(i.range),
            contents: Ue(i.contents)
          };
      });
    }, n;
  }()
);
function Le(n) {
  var _ = N.DocumentHighlightKind;
  switch (n) {
    case it.Read:
      return _.Read;
    case it.Write:
      return _.Write;
    case it.Text:
      return _.Text;
  }
  return _.Text;
}
var ge = (
  /** @class */
  function() {
    function n(_) {
      this._worker = _;
    }
    return n.prototype.provideDocumentHighlights = function(_, u, s) {
      var t = _.uri;
      return this._worker(t).then(function(i) {
        return i.findDocumentHighlights(t.toString(), K(u));
      }).then(function(i) {
        if (i)
          return i.map(function(a) {
            return {
              range: X(a.range),
              kind: Le(a.kind)
            };
          });
      });
    }, n;
  }()
);
function ze(n) {
  var _ = N.SymbolKind;
  switch (n) {
    case F.File:
      return _.Array;
    case F.Module:
      return _.Module;
    case F.Namespace:
      return _.Namespace;
    case F.Package:
      return _.Package;
    case F.Class:
      return _.Class;
    case F.Method:
      return _.Method;
    case F.Property:
      return _.Property;
    case F.Field:
      return _.Field;
    case F.Constructor:
      return _.Constructor;
    case F.Enum:
      return _.Enum;
    case F.Interface:
      return _.Interface;
    case F.Function:
      return _.Function;
    case F.Variable:
      return _.Variable;
    case F.Constant:
      return _.Constant;
    case F.String:
      return _.String;
    case F.Number:
      return _.Number;
    case F.Boolean:
      return _.Boolean;
    case F.Array:
      return _.Array;
  }
  return _.Function;
}
var ve = (
  /** @class */
  function() {
    function n(_) {
      this._worker = _;
    }
    return n.prototype.provideDocumentSymbols = function(_, u) {
      var s = _.uri;
      return this._worker(s).then(function(t) {
        return t.findDocumentSymbols(s.toString());
      }).then(function(t) {
        if (t)
          return t.map(function(i) {
            return {
              name: i.name,
              detail: "",
              containerName: i.containerName,
              kind: ze(i.kind),
              tags: [],
              range: X(i.location.range),
              selectionRange: X(i.location.range)
            };
          });
      });
    }, n;
  }()
), me = (
  /** @class */
  function() {
    function n(_) {
      this._worker = _;
    }
    return n.prototype.provideLinks = function(_, u) {
      var s = _.uri;
      return this._worker(s).then(function(t) {
        return t.findDocumentLinks(s.toString());
      }).then(function(t) {
        if (t)
          return {
            links: t.map(function(i) {
              return {
                range: X(i.range),
                url: i.target
              };
            })
          };
      });
    }, n;
  }()
);
function ye(n) {
  return {
    tabSize: n.tabSize,
    insertSpaces: n.insertSpaces
  };
}
var we = (
  /** @class */
  function() {
    function n(_) {
      this._worker = _;
    }
    return n.prototype.provideDocumentFormattingEdits = function(_, u, s) {
      var t = _.uri;
      return this._worker(t).then(function(i) {
        return i.format(t.toString(), null, ye(u)).then(function(a) {
          if (!(!a || a.length === 0))
            return a.map(xt);
        });
      });
    }, n;
  }()
), be = (
  /** @class */
  function() {
    function n(_) {
      this._worker = _;
    }
    return n.prototype.provideDocumentRangeFormattingEdits = function(_, u, s, t) {
      var i = _.uri;
      return this._worker(i).then(function(a) {
        return a.format(i.toString(), Ie(u), ye(s)).then(function(e) {
          if (!(!e || e.length === 0))
            return e.map(xt);
        });
      });
    }, n;
  }()
), xe = (
  /** @class */
  function() {
    function n(_) {
      this._worker = _;
    }
    return n.prototype.provideRenameEdits = function(_, u, s, t) {
      var i = _.uri;
      return this._worker(i).then(function(a) {
        return a.doRename(i.toString(), K(u), s);
      }).then(function(a) {
        return De(a);
      });
    }, n;
  }()
);
function De(n) {
  if (!(!n || !n.changes)) {
    var _ = [];
    for (var u in n.changes)
      for (var s = Te.parse(u), t = 0, i = n.changes[u]; t < i.length; t++) {
        var a = i[t];
        _.push({
          resource: s,
          edit: {
            range: X(a.range),
            text: a.newText
          }
        });
      }
    return {
      edits: _
    };
  }
}
var Ae = (
  /** @class */
  function() {
    function n(_) {
      this._worker = _;
    }
    return n.prototype.provideFoldingRanges = function(_, u, s) {
      var t = _.uri;
      return this._worker(t).then(function(i) {
        return i.getFoldingRanges(t.toString(), u);
      }).then(function(i) {
        if (i)
          return i.map(function(a) {
            var e = {
              start: a.startLine + 1,
              end: a.endLine + 1
            };
            return typeof a.kind < "u" && (e.kind = We(a.kind)), e;
          });
      });
    }, n;
  }()
);
function We(n) {
  switch (n) {
    case nt.Comment:
      return N.FoldingRangeKind.Comment;
    case nt.Imports:
      return N.FoldingRangeKind.Imports;
    case nt.Region:
      return N.FoldingRangeKind.Region;
  }
}
var Ee = (
  /** @class */
  function() {
    function n(_) {
      this._worker = _;
    }
    return n.prototype.provideSelectionRanges = function(_, u, s) {
      var t = _.uri;
      return this._worker(t).then(function(i) {
        return i.getSelectionRanges(t.toString(), u.map(K));
      }).then(function(i) {
        if (i)
          return i.map(function(a) {
            for (var e = []; a; )
              e.push({ range: X(a.range) }), a = a.parent;
            return e;
          });
      });
    }, n;
  }()
);
function Ge(n) {
  var _ = new le(n), u = function() {
    for (var t = [], i = 0; i < arguments.length; i++)
      t[i] = arguments[i];
    return _.getLanguageServiceWorker.apply(_, t);
  }, s = n.languageId;
  N.registerCompletionItemProvider(s, new fe(u)), N.registerHoverProvider(s, new de(u)), N.registerDocumentHighlightProvider(s, new ge(u)), N.registerLinkProvider(s, new me(u)), N.registerFoldingRangeProvider(s, new Ae(u)), N.registerDocumentSymbolProvider(s, new ve(u)), N.registerSelectionRangeProvider(s, new Ee(u)), N.registerRenameProvider(s, new xe(u)), s === "html" && (N.registerDocumentFormattingEditProvider(s, new we(u)), N.registerDocumentRangeFormattingEditProvider(s, new be(u)));
}
function $e(n) {
  var _ = [], u = [], s = new le(n);
  _.push(s);
  var t = function() {
    for (var a = [], e = 0; e < arguments.length; e++)
      a[e] = arguments[e];
    return s.getLanguageServiceWorker.apply(s, a);
  };
  function i() {
    var a = n.languageId, e = n.modeConfiguration;
    ke(u), e.completionItems && u.push(N.registerCompletionItemProvider(a, new fe(t))), e.hovers && u.push(N.registerHoverProvider(a, new de(t))), e.documentHighlights && u.push(N.registerDocumentHighlightProvider(a, new ge(t))), e.links && u.push(N.registerLinkProvider(a, new me(t))), e.documentSymbols && u.push(N.registerDocumentSymbolProvider(a, new ve(t))), e.rename && u.push(N.registerRenameProvider(a, new xe(t))), e.foldingRanges && u.push(N.registerFoldingRangeProvider(a, new Ae(t))), e.selectionRanges && u.push(N.registerSelectionRangeProvider(a, new Ee(t))), e.documentFormattingEdits && u.push(N.registerDocumentFormattingEditProvider(a, new we(t))), e.documentRangeFormattingEdits && u.push(N.registerDocumentRangeFormattingEditProvider(a, new be(t)));
  }
  return i(), _.push(he(u)), he(_);
}
function he(n) {
  return { dispose: function() {
    return ke(n);
  } };
}
function ke(n) {
  for (; n.length; )
    n.pop().dispose();
}
export {
  $e as setupMode,
  Ge as setupMode1
};
