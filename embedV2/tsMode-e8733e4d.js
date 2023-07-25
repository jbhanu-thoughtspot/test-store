import { g_ as S, gZ as D, gT as K, gS as N, gV as V, x as b } from "./libs-0c2ad75d.js";
import { t as j } from "./embed-v2-ee42466a.js";
import "https://cdn.skypack.dev/pin/react@v17.0.1-yH0aYV1FOvoIPeKBbHxg/mode=imports,min/optimized/react.js";
import "https://cdn.skypack.dev/pin/react-dom@v17.0.1-oZ1BXZ5opQ1DbTh7nu9r/mode=imports,min/optimized/react-dom.js";
import "https://cdn.skypack.dev/pin/react-dom@v17.0.1-oZ1BXZ5opQ1DbTh7nu9r/dist=es2020,mode=imports,min/unoptimized/cjs/react-dom-server.browser.production.min.js";
import "https://cdn.jsdelivr.net/gh/thoughtspot/cdn-assets/apollo-client.3.4.13.js";
import "https://cdn.skypack.dev/pin/i18next@v19.9.2-cYmbKVUuU6wo2j3NTw26/mode=imports,min/optimized/i18next.js";
import "https://cdn.skypack.dev/pin/react-i18next@v11.11.3-pjGJCepiIZ8qAL7WuYDX/mode=imports,min/optimized/react-i18next.js";
var B = globalThis && globalThis.__awaiter || function(t, r, e, i) {
  function u(n) {
    return n instanceof e ? n : new e(function(o) {
      o(n);
    });
  }
  return new (e || (e = Promise))(function(n, o) {
    function c(a) {
      try {
        s(i.next(a));
      } catch (f) {
        o(f);
      }
    }
    function l(a) {
      try {
        s(i.throw(a));
      } catch (f) {
        o(f);
      }
    }
    function s(a) {
      a.done ? n(a.value) : u(a.value).then(c, l);
    }
    s((i = i.apply(t, r || [])).next());
  });
}, U = globalThis && globalThis.__generator || function(t, r) {
  var e = { label: 0, sent: function() {
    if (n[0] & 1)
      throw n[1];
    return n[1];
  }, trys: [], ops: [] }, i, u, n, o;
  return o = { next: c(0), throw: c(1), return: c(2) }, typeof Symbol == "function" && (o[Symbol.iterator] = function() {
    return this;
  }), o;
  function c(s) {
    return function(a) {
      return l([s, a]);
    };
  }
  function l(s) {
    if (i)
      throw new TypeError("Generator is already executing.");
    for (; e; )
      try {
        if (i = 1, u && (n = s[0] & 2 ? u.return : s[0] ? u.throw || ((n = u.return) && n.call(u), 0) : u.next) && !(n = n.call(u, s[1])).done)
          return n;
        switch (u = 0, n && (s = [s[0] & 2, n.value]), s[0]) {
          case 0:
          case 1:
            n = s;
            break;
          case 4:
            return e.label++, { value: s[1], done: !1 };
          case 5:
            e.label++, u = s[1], s = [0];
            continue;
          case 7:
            s = e.ops.pop(), e.trys.pop();
            continue;
          default:
            if (n = e.trys, !(n = n.length > 0 && n[n.length - 1]) && (s[0] === 6 || s[0] === 2)) {
              e = 0;
              continue;
            }
            if (s[0] === 3 && (!n || s[1] > n[0] && s[1] < n[3])) {
              e.label = s[1];
              break;
            }
            if (s[0] === 6 && e.label < n[1]) {
              e.label = n[1], n = s;
              break;
            }
            if (n && e.label < n[2]) {
              e.label = n[2], e.ops.push(s);
              break;
            }
            n[2] && e.ops.pop(), e.trys.pop();
            continue;
        }
        s = r.call(t, e);
      } catch (a) {
        s = [6, a], u = 0;
      } finally {
        i = n = 0;
      }
    if (s[0] & 5)
      throw s[1];
    return { value: s[0] ? s[1] : void 0, done: !0 };
  }
}, z = (
  /** @class */
  function() {
    function t(r, e) {
      var i = this;
      this._modeId = r, this._defaults = e, this._worker = null, this._client = null, this._configChangeListener = this._defaults.onDidChange(function() {
        return i._stopWorker();
      }), this._updateExtraLibsToken = 0, this._extraLibsChangeListener = this._defaults.onDidExtraLibsChange(function() {
        return i._updateExtraLibs();
      });
    }
    return t.prototype._stopWorker = function() {
      this._worker && (this._worker.dispose(), this._worker = null), this._client = null;
    }, t.prototype.dispose = function() {
      this._configChangeListener.dispose(), this._extraLibsChangeListener.dispose(), this._stopWorker();
    }, t.prototype._updateExtraLibs = function() {
      return B(this, void 0, void 0, function() {
        var r, e;
        return U(this, function(i) {
          switch (i.label) {
            case 0:
              return this._worker ? (r = ++this._updateExtraLibsToken, [4, this._worker.getProxy()]) : [
                2
                /*return*/
              ];
            case 1:
              return e = i.sent(), this._updateExtraLibsToken !== r ? [
                2
                /*return*/
              ] : (e.updateExtraLibs(this._defaults.getExtraLibs()), [
                2
                /*return*/
              ]);
          }
        });
      });
    }, t.prototype._getClient = function() {
      var r = this;
      if (!this._client) {
        this._worker = S.createWebWorker({
          // module that exports the create() method and returns a `TypeScriptWorker` instance
          moduleId: "vs/language/typescript/tsWorker",
          label: this._modeId,
          keepIdleModels: !0,
          // passed in to the create() method
          createData: {
            compilerOptions: this._defaults.getCompilerOptions(),
            extraLibs: this._defaults.getExtraLibs(),
            customWorkerPath: this._defaults.workerOptions.customWorkerPath
          }
        });
        var e = this._worker.getProxy();
        this._defaults.getEagerModelSync() && (e = e.then(function(i) {
          return r._worker ? r._worker.withSyncedResources(S.getModels().filter(function(u) {
            return u.getModeId() === r._modeId;
          }).map(function(u) {
            return u.uri;
          })) : i;
        })), this._client = e;
      }
      return this._client;
    }, t.prototype.getLanguageServiceWorker = function() {
      for (var r = this, e = [], i = 0; i < arguments.length; i++)
        e[i] = arguments[i];
      var u;
      return this._getClient().then(function(n) {
        u = n;
      }).then(function(n) {
        if (r._worker)
          return r._worker.withSyncedResources(e);
      }).then(function(n) {
        return u;
      });
    }, t;
  }()
), d = {};
d["lib.d.ts"] = !0;
d["lib.dom.d.ts"] = !0;
d["lib.dom.iterable.d.ts"] = !0;
d["lib.es2015.collection.d.ts"] = !0;
d["lib.es2015.core.d.ts"] = !0;
d["lib.es2015.d.ts"] = !0;
d["lib.es2015.generator.d.ts"] = !0;
d["lib.es2015.iterable.d.ts"] = !0;
d["lib.es2015.promise.d.ts"] = !0;
d["lib.es2015.proxy.d.ts"] = !0;
d["lib.es2015.reflect.d.ts"] = !0;
d["lib.es2015.symbol.d.ts"] = !0;
d["lib.es2015.symbol.wellknown.d.ts"] = !0;
d["lib.es2016.array.include.d.ts"] = !0;
d["lib.es2016.d.ts"] = !0;
d["lib.es2016.full.d.ts"] = !0;
d["lib.es2017.d.ts"] = !0;
d["lib.es2017.full.d.ts"] = !0;
d["lib.es2017.intl.d.ts"] = !0;
d["lib.es2017.object.d.ts"] = !0;
d["lib.es2017.sharedmemory.d.ts"] = !0;
d["lib.es2017.string.d.ts"] = !0;
d["lib.es2017.typedarrays.d.ts"] = !0;
d["lib.es2018.asyncgenerator.d.ts"] = !0;
d["lib.es2018.asynciterable.d.ts"] = !0;
d["lib.es2018.d.ts"] = !0;
d["lib.es2018.full.d.ts"] = !0;
d["lib.es2018.intl.d.ts"] = !0;
d["lib.es2018.promise.d.ts"] = !0;
d["lib.es2018.regexp.d.ts"] = !0;
d["lib.es2019.array.d.ts"] = !0;
d["lib.es2019.d.ts"] = !0;
d["lib.es2019.full.d.ts"] = !0;
d["lib.es2019.object.d.ts"] = !0;
d["lib.es2019.string.d.ts"] = !0;
d["lib.es2019.symbol.d.ts"] = !0;
d["lib.es2020.bigint.d.ts"] = !0;
d["lib.es2020.d.ts"] = !0;
d["lib.es2020.full.d.ts"] = !0;
d["lib.es2020.intl.d.ts"] = !0;
d["lib.es2020.promise.d.ts"] = !0;
d["lib.es2020.sharedmemory.d.ts"] = !0;
d["lib.es2020.string.d.ts"] = !0;
d["lib.es2020.symbol.wellknown.d.ts"] = !0;
d["lib.es2021.d.ts"] = !0;
d["lib.es2021.full.d.ts"] = !0;
d["lib.es2021.promise.d.ts"] = !0;
d["lib.es2021.string.d.ts"] = !0;
d["lib.es2021.weakref.d.ts"] = !0;
d["lib.es5.d.ts"] = !0;
d["lib.es6.d.ts"] = !0;
d["lib.esnext.d.ts"] = !0;
d["lib.esnext.full.d.ts"] = !0;
d["lib.esnext.intl.d.ts"] = !0;
d["lib.esnext.promise.d.ts"] = !0;
d["lib.esnext.string.d.ts"] = !0;
d["lib.esnext.weakref.d.ts"] = !0;
d["lib.scripthost.d.ts"] = !0;
d["lib.webworker.d.ts"] = !0;
d["lib.webworker.importscripts.d.ts"] = !0;
d["lib.webworker.iterable.d.ts"] = !0;
var A = globalThis && globalThis.__extends || function() {
  var t = function(r, e) {
    return t = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(i, u) {
      i.__proto__ = u;
    } || function(i, u) {
      for (var n in u)
        Object.prototype.hasOwnProperty.call(u, n) && (i[n] = u[n]);
    }, t(r, e);
  };
  return function(r, e) {
    if (typeof e != "function" && e !== null)
      throw new TypeError("Class extends value " + String(e) + " is not a constructor or null");
    t(r, e);
    function i() {
      this.constructor = r;
    }
    r.prototype = e === null ? Object.create(e) : (i.prototype = e.prototype, new i());
  };
}(), _ = globalThis && globalThis.__awaiter || function(t, r, e, i) {
  function u(n) {
    return n instanceof e ? n : new e(function(o) {
      o(n);
    });
  }
  return new (e || (e = Promise))(function(n, o) {
    function c(a) {
      try {
        s(i.next(a));
      } catch (f) {
        o(f);
      }
    }
    function l(a) {
      try {
        s(i.throw(a));
      } catch (f) {
        o(f);
      }
    }
    function s(a) {
      a.done ? n(a.value) : u(a.value).then(c, l);
    }
    s((i = i.apply(t, r || [])).next());
  });
}, x = globalThis && globalThis.__generator || function(t, r) {
  var e = { label: 0, sent: function() {
    if (n[0] & 1)
      throw n[1];
    return n[1];
  }, trys: [], ops: [] }, i, u, n, o;
  return o = { next: c(0), throw: c(1), return: c(2) }, typeof Symbol == "function" && (o[Symbol.iterator] = function() {
    return this;
  }), o;
  function c(s) {
    return function(a) {
      return l([s, a]);
    };
  }
  function l(s) {
    if (i)
      throw new TypeError("Generator is already executing.");
    for (; e; )
      try {
        if (i = 1, u && (n = s[0] & 2 ? u.return : s[0] ? u.throw || ((n = u.return) && n.call(u), 0) : u.next) && !(n = n.call(u, s[1])).done)
          return n;
        switch (u = 0, n && (s = [s[0] & 2, n.value]), s[0]) {
          case 0:
          case 1:
            n = s;
            break;
          case 4:
            return e.label++, { value: s[1], done: !1 };
          case 5:
            e.label++, u = s[1], s = [0];
            continue;
          case 7:
            s = e.ops.pop(), e.trys.pop();
            continue;
          default:
            if (n = e.trys, !(n = n.length > 0 && n[n.length - 1]) && (s[0] === 6 || s[0] === 2)) {
              e = 0;
              continue;
            }
            if (s[0] === 3 && (!n || s[1] > n[0] && s[1] < n[3])) {
              e.label = s[1];
              break;
            }
            if (s[0] === 6 && e.label < n[1]) {
              e.label = n[1], n = s;
              break;
            }
            if (n && e.label < n[2]) {
              e.label = n[2], e.ops.push(s);
              break;
            }
            n[2] && e.ops.pop(), e.trys.pop();
            continue;
        }
        s = r.call(t, e);
      } catch (a) {
        s = [6, a], u = 0;
      } finally {
        i = n = 0;
      }
    if (s[0] & 5)
      throw s[1];
    return { value: s[0] ? s[1] : void 0, done: !0 };
  }
}, P;
(function(t) {
  t[t.None = 0] = "None", t[t.Block = 1] = "Block", t[t.Smart = 2] = "Smart";
})(P || (P = {}));
function I(t, r, e) {
  if (e === void 0 && (e = 0), typeof t == "string")
    return t;
  if (t === void 0)
    return "";
  var i = "";
  if (e) {
    i += r;
    for (var u = 0; u < e; u++)
      i += "  ";
  }
  if (i += t.messageText, e++, t.next)
    for (var n = 0, o = t.next; n < o.length; n++) {
      var c = o[n];
      i += I(c, r, e);
    }
  return i;
}
function T(t) {
  return t ? t.map(function(r) {
    return r.text;
  }).join("") : "";
}
var F = (
  /** @class */
  function() {
    function t(r) {
      this._worker = r;
    }
    return t.prototype._textSpanToRange = function(r, e) {
      var i = r.getPositionAt(e.start), u = r.getPositionAt(e.start + e.length), n = i.lineNumber, o = i.column, c = u.lineNumber, l = u.column;
      return { startLineNumber: n, startColumn: o, endLineNumber: c, endColumn: l };
    }, t;
  }()
), G = (
  /** @class */
  function() {
    function t(r) {
      this._worker = r, this._libFiles = {}, this._hasFetchedLibFiles = !1, this._fetchLibFilesPromise = null;
    }
    return t.prototype.isLibFile = function(r) {
      return r && r.path.indexOf("/lib.") === 0 ? !!d[r.path.slice(1)] : !1;
    }, t.prototype.getOrCreateModel = function(r) {
      var e = S.getModel(r);
      return e || (this.isLibFile(r) && this._hasFetchedLibFiles ? S.createModel(this._libFiles[r.path.slice(1)], "typescript", r) : null);
    }, t.prototype._containsLibFile = function(r) {
      for (var e = 0, i = r; e < i.length; e++) {
        var u = i[e];
        if (this.isLibFile(u))
          return !0;
      }
      return !1;
    }, t.prototype.fetchLibFilesIfNecessary = function(r) {
      return _(this, void 0, void 0, function() {
        return x(this, function(e) {
          switch (e.label) {
            case 0:
              return this._containsLibFile(r) ? [4, this._fetchLibFiles()] : [
                2
                /*return*/
              ];
            case 1:
              return e.sent(), [
                2
                /*return*/
              ];
          }
        });
      });
    }, t.prototype._fetchLibFiles = function() {
      var r = this;
      return this._fetchLibFilesPromise || (this._fetchLibFilesPromise = this._worker().then(function(e) {
        return e.getLibFiles();
      }).then(function(e) {
        r._hasFetchedLibFiles = !0, r._libFiles = e;
      })), this._fetchLibFilesPromise;
    }, t;
  }()
), L;
(function(t) {
  t[t.Warning = 0] = "Warning", t[t.Error = 1] = "Error", t[t.Suggestion = 2] = "Suggestion", t[t.Message = 3] = "Message";
})(L || (L = {}));
var J = (
  /** @class */
  function(t) {
    A(r, t);
    function r(e, i, u, n) {
      var o = t.call(this, n) || this;
      o._libFiles = e, o._defaults = i, o._selector = u, o._disposables = [], o._listener = /* @__PURE__ */ Object.create(null);
      var c = function(a) {
        if (a.getModeId() === u) {
          var f = function() {
            var m = o._defaults.getDiagnosticsOptions().onlyVisible;
            m ? a.isAttachedToEditor() && o._doValidate(a) : o._doValidate(a);
          }, p, h = a.onDidChangeContent(function() {
            clearTimeout(p), p = setTimeout(f, 500);
          }), g = a.onDidChangeAttached(function() {
            var m = o._defaults.getDiagnosticsOptions().onlyVisible;
            m && (a.isAttachedToEditor() ? f() : S.setModelMarkers(a, o._selector, []));
          });
          o._listener[a.uri.toString()] = {
            dispose: function() {
              h.dispose(), g.dispose(), clearTimeout(p);
            }
          }, f();
        }
      }, l = function(a) {
        S.setModelMarkers(a, o._selector, []);
        var f = a.uri.toString();
        o._listener[f] && (o._listener[f].dispose(), delete o._listener[f]);
      };
      o._disposables.push(S.onDidCreateModel(function(a) {
        return c(a);
      })), o._disposables.push(S.onWillDisposeModel(l)), o._disposables.push(S.onDidChangeModelLanguage(function(a) {
        l(a.model), c(a.model);
      })), o._disposables.push({
        dispose: function() {
          for (var a = 0, f = S.getModels(); a < f.length; a++) {
            var p = f[a];
            l(p);
          }
        }
      });
      var s = function() {
        for (var a = 0, f = S.getModels(); a < f.length; a++) {
          var p = f[a];
          l(p), c(p);
        }
      };
      return o._disposables.push(o._defaults.onDidChange(s)), o._disposables.push(o._defaults.onDidExtraLibsChange(s)), S.getModels().forEach(function(a) {
        return c(a);
      }), o;
    }
    return r.prototype.dispose = function() {
      this._disposables.forEach(function(e) {
        return e && e.dispose();
      }), this._disposables = [];
    }, r.prototype._doValidate = function(e) {
      return _(this, void 0, void 0, function() {
        var i, u, n, o, c, l, s, a, f, p = this;
        return x(this, function(h) {
          switch (h.label) {
            case 0:
              return [4, this._worker(e.uri)];
            case 1:
              return i = h.sent(), e.isDisposed() ? [
                2
                /*return*/
              ] : (u = [], n = this._defaults.getDiagnosticsOptions(), o = n.noSyntaxValidation, c = n.noSemanticValidation, l = n.noSuggestionDiagnostics, o || u.push(i.getSyntacticDiagnostics(e.uri.toString())), c || u.push(i.getSemanticDiagnostics(e.uri.toString())), l || u.push(i.getSuggestionDiagnostics(e.uri.toString())), [4, Promise.all(u)]);
            case 2:
              return s = h.sent(), !s || e.isDisposed() ? [
                2
                /*return*/
              ] : (a = s.reduce(function(g, m) {
                return m.concat(g);
              }, []).filter(function(g) {
                return (p._defaults.getDiagnosticsOptions().diagnosticCodesToIgnore || []).indexOf(g.code) === -1;
              }), f = a.map(function(g) {
                return g.relatedInformation || [];
              }).reduce(function(g, m) {
                return m.concat(g);
              }, []).map(function(g) {
                return g.file ? D.parse(g.file.fileName) : null;
              }), [4, this._libFiles.fetchLibFilesIfNecessary(f)]);
            case 3:
              return h.sent(), e.isDisposed() ? [
                2
                /*return*/
              ] : (S.setModelMarkers(e, this._selector, a.map(function(g) {
                return p._convertDiagnostics(e, g);
              })), [
                2
                /*return*/
              ]);
          }
        });
      });
    }, r.prototype._convertDiagnostics = function(e, i) {
      var u = i.start || 0, n = i.length || 1, o = e.getPositionAt(u), c = o.lineNumber, l = o.column, s = e.getPositionAt(u + n), a = s.lineNumber, f = s.column, p = [];
      return i.reportsUnnecessary && p.push(K.Unnecessary), i.reportsDeprecated && p.push(K.Deprecated), {
        severity: this._tsDiagnosticCategoryToMarkerSeverity(i.category),
        startLineNumber: c,
        startColumn: l,
        endLineNumber: a,
        endColumn: f,
        message: I(i.messageText, `
`),
        code: i.code.toString(),
        tags: p,
        relatedInformation: this._convertRelatedInformation(e, i.relatedInformation)
      };
    }, r.prototype._convertRelatedInformation = function(e, i) {
      var u = this;
      if (!i)
        return [];
      var n = [];
      return i.forEach(function(o) {
        var c = e;
        if (o.file) {
          var l = D.parse(o.file.fileName);
          c = u._libFiles.getOrCreateModel(l);
        }
        if (c) {
          var s = o.start || 0, a = o.length || 1, f = c.getPositionAt(s), p = f.lineNumber, h = f.column, g = c.getPositionAt(s + a), m = g.lineNumber, y = g.column;
          n.push({
            resource: c.uri,
            startLineNumber: p,
            startColumn: h,
            endLineNumber: m,
            endColumn: y,
            message: I(o.messageText, `
`)
          });
        }
      }), n;
    }, r.prototype._tsDiagnosticCategoryToMarkerSeverity = function(e) {
      switch (e) {
        case L.Error:
          return N.Error;
        case L.Message:
          return N.Info;
        case L.Warning:
          return N.Warning;
        case L.Suggestion:
          return N.Hint;
      }
      return N.Info;
    }, r;
  }(F)
), Q = (
  /** @class */
  function(t) {
    A(r, t);
    function r() {
      return t !== null && t.apply(this, arguments) || this;
    }
    return Object.defineProperty(r.prototype, "triggerCharacters", {
      get: function() {
        return ["."];
      },
      enumerable: !1,
      configurable: !0
    }), r.prototype.provideCompletionItems = function(e, i, u, n) {
      return _(this, void 0, void 0, function() {
        var o, c, l, s, a, f, p;
        return x(this, function(h) {
          switch (h.label) {
            case 0:
              return o = e.getWordUntilPosition(i), c = new V(i.lineNumber, o.startColumn, i.lineNumber, o.endColumn), l = e.uri, s = e.getOffsetAt(i), [4, this._worker(l)];
            case 1:
              return a = h.sent(), e.isDisposed() ? [
                2
                /*return*/
              ] : [4, a.getCompletionsAtPosition(l.toString(), s)];
            case 2:
              return f = h.sent(), !f || e.isDisposed() ? [
                2
                /*return*/
              ] : (p = f.entries.map(function(g) {
                var m, y = c;
                if (g.replacementSpan) {
                  var w = e.getPositionAt(g.replacementSpan.start), C = e.getPositionAt(g.replacementSpan.start + g.replacementSpan.length);
                  y = new V(w.lineNumber, w.column, C.lineNumber, C.column);
                }
                var E = [];
                return ((m = g.kindModifiers) === null || m === void 0 ? void 0 : m.indexOf("deprecated")) !== -1 && E.push(b.CompletionItemTag.Deprecated), {
                  uri: l,
                  position: i,
                  offset: s,
                  range: y,
                  label: g.name,
                  insertText: g.name,
                  sortText: g.sortText,
                  kind: r.convertKind(g.kind),
                  tags: E
                };
              }), [2, {
                suggestions: p
              }]);
          }
        });
      });
    }, r.prototype.resolveCompletionItem = function(e, i) {
      return _(this, void 0, void 0, function() {
        var u, n, o, c, l, s;
        return x(this, function(a) {
          switch (a.label) {
            case 0:
              return u = e, n = u.uri, o = u.position, c = u.offset, [4, this._worker(n)];
            case 1:
              return l = a.sent(), [4, l.getCompletionEntryDetails(n.toString(), c, u.label)];
            case 2:
              return s = a.sent(), s ? [2, {
                uri: n,
                position: o,
                label: s.name,
                kind: r.convertKind(s.kind),
                detail: T(s.displayParts),
                documentation: {
                  value: r.createDocumentationString(s)
                }
              }] : [2, u];
          }
        });
      });
    }, r.convertKind = function(e) {
      switch (e) {
        case v.primitiveType:
        case v.keyword:
          return b.CompletionItemKind.Keyword;
        case v.variable:
        case v.localVariable:
          return b.CompletionItemKind.Variable;
        case v.memberVariable:
        case v.memberGetAccessor:
        case v.memberSetAccessor:
          return b.CompletionItemKind.Field;
        case v.function:
        case v.memberFunction:
        case v.constructSignature:
        case v.callSignature:
        case v.indexSignature:
          return b.CompletionItemKind.Function;
        case v.enum:
          return b.CompletionItemKind.Enum;
        case v.module:
          return b.CompletionItemKind.Module;
        case v.class:
          return b.CompletionItemKind.Class;
        case v.interface:
          return b.CompletionItemKind.Interface;
        case v.warning:
          return b.CompletionItemKind.File;
      }
      return b.CompletionItemKind.Property;
    }, r.createDocumentationString = function(e) {
      var i = T(e.documentation);
      if (e.tags)
        for (var u = 0, n = e.tags; u < n.length; u++) {
          var o = n[u];
          i += `

` + W(o);
        }
      return i;
    }, r;
  }(F)
);
function W(t) {
  var r = "*@" + t.name + "*";
  if (t.name === "param" && t.text) {
    var e = t.text, i = e[0], u = e.slice(1);
    r += "`" + i.text + "`", u.length > 0 && (r += " — " + u.map(function(n) {
      return n.text;
    }).join(" "));
  } else
    t.text && (r += " — " + t.text);
  return r;
}
var $ = (
  /** @class */
  function(t) {
    A(r, t);
    function r() {
      var e = t !== null && t.apply(this, arguments) || this;
      return e.signatureHelpTriggerCharacters = ["(", ","], e;
    }
    return r._toSignatureHelpTriggerReason = function(e) {
      switch (e.triggerKind) {
        case b.SignatureHelpTriggerKind.TriggerCharacter:
          return e.triggerCharacter ? e.isRetrigger ? { kind: "retrigger", triggerCharacter: e.triggerCharacter } : { kind: "characterTyped", triggerCharacter: e.triggerCharacter } : { kind: "invoked" };
        case b.SignatureHelpTriggerKind.ContentChange:
          return e.isRetrigger ? { kind: "retrigger" } : { kind: "invoked" };
        case b.SignatureHelpTriggerKind.Invoke:
        default:
          return { kind: "invoked" };
      }
    }, r.prototype.provideSignatureHelp = function(e, i, u, n) {
      return _(this, void 0, void 0, function() {
        var o, c, l, s, a;
        return x(this, function(f) {
          switch (f.label) {
            case 0:
              return o = e.uri, c = e.getOffsetAt(i), [4, this._worker(o)];
            case 1:
              return l = f.sent(), e.isDisposed() ? [
                2
                /*return*/
              ] : [4, l.getSignatureHelpItems(o.toString(), c, {
                triggerReason: r._toSignatureHelpTriggerReason(n)
              })];
            case 2:
              return s = f.sent(), !s || e.isDisposed() ? [
                2
                /*return*/
              ] : (a = {
                activeSignature: s.selectedItemIndex,
                activeParameter: s.argumentIndex,
                signatures: []
              }, s.items.forEach(function(p) {
                var h = {
                  label: "",
                  parameters: []
                };
                h.documentation = {
                  value: T(p.documentation)
                }, h.label += T(p.prefixDisplayParts), p.parameters.forEach(function(g, m, y) {
                  var w = T(g.displayParts), C = {
                    label: w,
                    documentation: {
                      value: T(g.documentation)
                    }
                  };
                  h.label += w, h.parameters.push(C), m < y.length - 1 && (h.label += T(p.separatorDisplayParts));
                }), h.label += T(p.suffixDisplayParts), a.signatures.push(h);
              }), [2, {
                value: a,
                dispose: function() {
                }
              }]);
          }
        });
      });
    }, r;
  }(F)
), q = (
  /** @class */
  function(t) {
    A(r, t);
    function r() {
      return t !== null && t.apply(this, arguments) || this;
    }
    return r.prototype.provideHover = function(e, i, u) {
      return _(this, void 0, void 0, function() {
        var n, o, c, l, s, a, f;
        return x(this, function(p) {
          switch (p.label) {
            case 0:
              return n = e.uri, o = e.getOffsetAt(i), [4, this._worker(n)];
            case 1:
              return c = p.sent(), e.isDisposed() ? [
                2
                /*return*/
              ] : [4, c.getQuickInfoAtPosition(n.toString(), o)];
            case 2:
              return l = p.sent(), !l || e.isDisposed() ? [
                2
                /*return*/
              ] : (s = T(l.documentation), a = l.tags ? l.tags.map(function(h) {
                return W(h);
              }).join(`  

`) : "", f = T(l.displayParts), [2, {
                range: this._textSpanToRange(e, l.textSpan),
                contents: [
                  {
                    value: "```typescript\n" + f + "\n```\n"
                  },
                  {
                    value: s + (a ? `

` + a : "")
                  }
                ]
              }]);
          }
        });
      });
    }, r;
  }(F)
), Z = (
  /** @class */
  function(t) {
    A(r, t);
    function r() {
      return t !== null && t.apply(this, arguments) || this;
    }
    return r.prototype.provideDocumentHighlights = function(e, i, u) {
      return _(this, void 0, void 0, function() {
        var n, o, c, l, s = this;
        return x(this, function(a) {
          switch (a.label) {
            case 0:
              return n = e.uri, o = e.getOffsetAt(i), [4, this._worker(n)];
            case 1:
              return c = a.sent(), e.isDisposed() ? [
                2
                /*return*/
              ] : [4, c.getOccurrencesAtPosition(n.toString(), o)];
            case 2:
              return l = a.sent(), !l || e.isDisposed() ? [
                2
                /*return*/
              ] : [2, l.map(function(f) {
                return {
                  range: s._textSpanToRange(e, f.textSpan),
                  kind: f.isWriteAccess ? b.DocumentHighlightKind.Write : b.DocumentHighlightKind.Text
                };
              })];
          }
        });
      });
    }, r;
  }(F)
), X = (
  /** @class */
  function(t) {
    A(r, t);
    function r(e, i) {
      var u = t.call(this, i) || this;
      return u._libFiles = e, u;
    }
    return r.prototype.provideDefinition = function(e, i, u) {
      return _(this, void 0, void 0, function() {
        var n, o, c, l, s, a, f, p, h, g, m, y;
        return x(this, function(w) {
          switch (w.label) {
            case 0:
              return n = e.uri, o = e.getOffsetAt(i), [4, this._worker(n)];
            case 1:
              return c = w.sent(), e.isDisposed() ? [
                2
                /*return*/
              ] : [4, c.getDefinitionAtPosition(n.toString(), o)];
            case 2:
              return l = w.sent(), !l || e.isDisposed() ? [
                2
                /*return*/
              ] : [4, this._libFiles.fetchLibFilesIfNecessary(l.map(function(C) {
                return D.parse(C.fileName);
              }))];
            case 3:
              if (w.sent(), e.isDisposed())
                return [
                  2
                  /*return*/
                ];
              for (s = [], a = 0, f = l; a < f.length; a++)
                if (p = f[a], h = D.parse(p.fileName), g = this._libFiles.getOrCreateModel(h), g)
                  s.push({
                    uri: h,
                    range: this._textSpanToRange(g, p.textSpan)
                  });
                else if (m = j.getExtraLibs()[p.fileName], m)
                  return y = S.createModel(m.content, "typescript", h), [2, {
                    uri: h,
                    range: this._textSpanToRange(y, p.textSpan)
                  }];
              return [2, s];
          }
        });
      });
    }, r;
  }(F)
), Y = (
  /** @class */
  function(t) {
    A(r, t);
    function r(e, i) {
      var u = t.call(this, i) || this;
      return u._libFiles = e, u;
    }
    return r.prototype.provideReferences = function(e, i, u, n) {
      return _(this, void 0, void 0, function() {
        var o, c, l, s, a, f, p, h, g, m;
        return x(this, function(y) {
          switch (y.label) {
            case 0:
              return o = e.uri, c = e.getOffsetAt(i), [4, this._worker(o)];
            case 1:
              return l = y.sent(), e.isDisposed() ? [
                2
                /*return*/
              ] : [4, l.getReferencesAtPosition(o.toString(), c)];
            case 2:
              return s = y.sent(), !s || e.isDisposed() ? [
                2
                /*return*/
              ] : [4, this._libFiles.fetchLibFilesIfNecessary(s.map(function(w) {
                return D.parse(w.fileName);
              }))];
            case 3:
              if (y.sent(), e.isDisposed())
                return [
                  2
                  /*return*/
                ];
              for (a = [], f = 0, p = s; f < p.length; f++)
                h = p[f], g = D.parse(h.fileName), m = this._libFiles.getOrCreateModel(g), m && a.push({
                  uri: g,
                  range: this._textSpanToRange(m, h.textSpan)
                });
              return [2, a];
          }
        });
      });
    }, r;
  }(F)
), ee = (
  /** @class */
  function(t) {
    A(r, t);
    function r() {
      return t !== null && t.apply(this, arguments) || this;
    }
    return r.prototype.provideDocumentSymbols = function(e, i) {
      return _(this, void 0, void 0, function() {
        var u, n, o, c, l, s = this;
        return x(this, function(a) {
          switch (a.label) {
            case 0:
              return u = e.uri, [4, this._worker(u)];
            case 1:
              return n = a.sent(), e.isDisposed() ? [
                2
                /*return*/
              ] : [4, n.getNavigationBarItems(u.toString())];
            case 2:
              return o = a.sent(), !o || e.isDisposed() ? [
                2
                /*return*/
              ] : (c = function(f, p, h) {
                var g = {
                  name: p.text,
                  detail: "",
                  kind: k[p.kind] || b.SymbolKind.Variable,
                  range: s._textSpanToRange(e, p.spans[0]),
                  selectionRange: s._textSpanToRange(e, p.spans[0]),
                  tags: []
                };
                if (h && (g.containerName = h), p.childItems && p.childItems.length > 0)
                  for (var m = 0, y = p.childItems; m < y.length; m++) {
                    var w = y[m];
                    c(f, w, g.name);
                  }
                f.push(g);
              }, l = [], o.forEach(function(f) {
                return c(l, f);
              }), [2, l]);
          }
        });
      });
    }, r;
  }(F)
), v = (
  /** @class */
  function() {
    function t() {
    }
    return t.unknown = "", t.keyword = "keyword", t.script = "script", t.module = "module", t.class = "class", t.interface = "interface", t.type = "type", t.enum = "enum", t.variable = "var", t.localVariable = "local var", t.function = "function", t.localFunction = "local function", t.memberFunction = "method", t.memberGetAccessor = "getter", t.memberSetAccessor = "setter", t.memberVariable = "property", t.constructorImplementation = "constructor", t.callSignature = "call", t.indexSignature = "index", t.constructSignature = "construct", t.parameter = "parameter", t.typeParameter = "type parameter", t.primitiveType = "primitive type", t.label = "label", t.alias = "alias", t.const = "const", t.let = "let", t.warning = "warning", t;
  }()
), k = /* @__PURE__ */ Object.create(null);
k[v.module] = b.SymbolKind.Module;
k[v.class] = b.SymbolKind.Class;
k[v.enum] = b.SymbolKind.Enum;
k[v.interface] = b.SymbolKind.Interface;
k[v.memberFunction] = b.SymbolKind.Method;
k[v.memberVariable] = b.SymbolKind.Property;
k[v.memberGetAccessor] = b.SymbolKind.Property;
k[v.memberSetAccessor] = b.SymbolKind.Property;
k[v.variable] = b.SymbolKind.Variable;
k[v.const] = b.SymbolKind.Variable;
k[v.localVariable] = b.SymbolKind.Variable;
k[v.variable] = b.SymbolKind.Variable;
k[v.function] = b.SymbolKind.Function;
k[v.localFunction] = b.SymbolKind.Function;
var O = (
  /** @class */
  function(t) {
    A(r, t);
    function r() {
      return t !== null && t.apply(this, arguments) || this;
    }
    return r._convertOptions = function(e) {
      return {
        ConvertTabsToSpaces: e.insertSpaces,
        TabSize: e.tabSize,
        IndentSize: e.tabSize,
        IndentStyle: P.Smart,
        NewLineCharacter: `
`,
        InsertSpaceAfterCommaDelimiter: !0,
        InsertSpaceAfterSemicolonInForStatements: !0,
        InsertSpaceBeforeAndAfterBinaryOperators: !0,
        InsertSpaceAfterKeywordsInControlFlowStatements: !0,
        InsertSpaceAfterFunctionKeywordForAnonymousFunctions: !0,
        InsertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis: !1,
        InsertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets: !1,
        InsertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces: !1,
        PlaceOpenBraceOnNewLineForControlBlocks: !1,
        PlaceOpenBraceOnNewLineForFunctions: !1
      };
    }, r.prototype._convertTextChanges = function(e, i) {
      return {
        text: i.newText,
        range: this._textSpanToRange(e, i.span)
      };
    }, r;
  }(F)
), te = (
  /** @class */
  function(t) {
    A(r, t);
    function r() {
      return t !== null && t.apply(this, arguments) || this;
    }
    return r.prototype.provideDocumentRangeFormattingEdits = function(e, i, u, n) {
      return _(this, void 0, void 0, function() {
        var o, c, l, s, a, f = this;
        return x(this, function(p) {
          switch (p.label) {
            case 0:
              return o = e.uri, c = e.getOffsetAt({
                lineNumber: i.startLineNumber,
                column: i.startColumn
              }), l = e.getOffsetAt({
                lineNumber: i.endLineNumber,
                column: i.endColumn
              }), [4, this._worker(o)];
            case 1:
              return s = p.sent(), e.isDisposed() ? [
                2
                /*return*/
              ] : [4, s.getFormattingEditsForRange(o.toString(), c, l, O._convertOptions(u))];
            case 2:
              return a = p.sent(), !a || e.isDisposed() ? [
                2
                /*return*/
              ] : [2, a.map(function(h) {
                return f._convertTextChanges(e, h);
              })];
          }
        });
      });
    }, r;
  }(O)
), re = (
  /** @class */
  function(t) {
    A(r, t);
    function r() {
      return t !== null && t.apply(this, arguments) || this;
    }
    return Object.defineProperty(r.prototype, "autoFormatTriggerCharacters", {
      get: function() {
        return [";", "}", `
`];
      },
      enumerable: !1,
      configurable: !0
    }), r.prototype.provideOnTypeFormattingEdits = function(e, i, u, n, o) {
      return _(this, void 0, void 0, function() {
        var c, l, s, a, f = this;
        return x(this, function(p) {
          switch (p.label) {
            case 0:
              return c = e.uri, l = e.getOffsetAt(i), [4, this._worker(c)];
            case 1:
              return s = p.sent(), e.isDisposed() ? [
                2
                /*return*/
              ] : [4, s.getFormattingEditsAfterKeystroke(c.toString(), l, u, O._convertOptions(n))];
            case 2:
              return a = p.sent(), !a || e.isDisposed() ? [
                2
                /*return*/
              ] : [2, a.map(function(h) {
                return f._convertTextChanges(e, h);
              })];
          }
        });
      });
    }, r;
  }(O)
), ne = (
  /** @class */
  function(t) {
    A(r, t);
    function r() {
      return t !== null && t.apply(this, arguments) || this;
    }
    return r.prototype.provideCodeActions = function(e, i, u, n) {
      return _(this, void 0, void 0, function() {
        var o, c, l, s, a, f, p, h, g = this;
        return x(this, function(m) {
          switch (m.label) {
            case 0:
              return o = e.uri, c = e.getOffsetAt({
                lineNumber: i.startLineNumber,
                column: i.startColumn
              }), l = e.getOffsetAt({
                lineNumber: i.endLineNumber,
                column: i.endColumn
              }), s = O._convertOptions(e.getOptions()), a = u.markers.filter(function(y) {
                return y.code;
              }).map(function(y) {
                return y.code;
              }).map(Number), [4, this._worker(o)];
            case 1:
              return f = m.sent(), e.isDisposed() ? [
                2
                /*return*/
              ] : [4, f.getCodeFixesAtPosition(o.toString(), c, l, a, s)];
            case 2:
              return p = m.sent(), !p || e.isDisposed() ? [2, { actions: [], dispose: function() {
              } }] : (h = p.filter(function(y) {
                return y.changes.filter(function(w) {
                  return w.isNewFile;
                }).length === 0;
              }).map(function(y) {
                return g._tsCodeFixActionToMonacoCodeAction(e, u, y);
              }), [2, {
                actions: h,
                dispose: function() {
                }
              }]);
          }
        });
      });
    }, r.prototype._tsCodeFixActionToMonacoCodeAction = function(e, i, u) {
      for (var n = [], o = 0, c = u.changes; o < c.length; o++)
        for (var l = c[o], s = 0, a = l.textChanges; s < a.length; s++) {
          var f = a[s];
          n.push({
            resource: e.uri,
            edit: {
              range: this._textSpanToRange(e, f.span),
              text: f.newText
            }
          });
        }
      var p = {
        title: u.description,
        edit: { edits: n },
        diagnostics: i.markers,
        kind: "quickfix"
      };
      return p;
    }, r;
  }(O)
), ie = (
  /** @class */
  function(t) {
    A(r, t);
    function r() {
      return t !== null && t.apply(this, arguments) || this;
    }
    return r.prototype.provideRenameEdits = function(e, i, u, n) {
      return _(this, void 0, void 0, function() {
        var o, c, l, s, a, f, p, h, g, m, y, w;
        return x(this, function(C) {
          switch (C.label) {
            case 0:
              return o = e.uri, c = o.toString(), l = e.getOffsetAt(i), [4, this._worker(o)];
            case 1:
              return s = C.sent(), e.isDisposed() ? [
                2
                /*return*/
              ] : [4, s.getRenameInfo(c, l, {
                allowRenameOfImportPath: !1
              })];
            case 2:
              if (a = C.sent(), a.canRename === !1)
                return [2, {
                  edits: [],
                  rejectReason: a.localizedErrorMessage
                }];
              if (a.fileToRename !== void 0)
                throw new Error("Renaming files is not supported.");
              return [4, s.findRenameLocations(
                c,
                l,
                /*strings*/
                !1,
                /*comments*/
                !1,
                /*prefixAndSuffix*/
                !1
              )];
            case 3:
              if (f = C.sent(), !f || e.isDisposed())
                return [
                  2
                  /*return*/
                ];
              for (p = [], h = 0, g = f; h < g.length; h++)
                if (m = g[h], y = D.parse(m.fileName), w = S.getModel(y), w)
                  p.push({
                    resource: y,
                    edit: {
                      range: this._textSpanToRange(w, m.textSpan),
                      text: u
                    }
                  });
                else
                  throw new Error("Unknown URI " + y + ".");
              return [2, { edits: p }];
          }
        });
      });
    }, r;
  }(F)
), M, R;
function de(t) {
  R = H(t, "typescript");
}
function ge(t) {
  M = H(t, "javascript");
}
function he() {
  return new Promise(function(t, r) {
    if (!M)
      return r("JavaScript not registered!");
    t(M);
  });
}
function be() {
  return new Promise(function(t, r) {
    if (!R)
      return r("TypeScript not registered!");
    t(R);
  });
}
function H(t, r) {
  var e = new z(r, t), i = function() {
    for (var n = [], o = 0; o < arguments.length; o++)
      n[o] = arguments[o];
    return e.getLanguageServiceWorker.apply(e, n);
  }, u = new G(i);
  return b.registerCompletionItemProvider(r, new Q(i)), b.registerSignatureHelpProvider(r, new $(i)), b.registerHoverProvider(r, new q(i)), b.registerDocumentHighlightProvider(r, new Z(i)), b.registerDefinitionProvider(r, new X(u, i)), b.registerReferenceProvider(r, new Y(u, i)), b.registerDocumentSymbolProvider(r, new ee(i)), b.registerDocumentRangeFormattingEditProvider(r, new te(i)), b.registerOnTypeFormattingEditProvider(r, new re(i)), b.registerCodeActionProvider(r, new ne(i)), b.registerRenameProvider(r, new ie(i)), new J(u, t, r, i), i;
}
export {
  he as getJavaScriptWorker,
  be as getTypeScriptWorker,
  ge as setupJavaScript,
  de as setupTypeScript
};
