import { c as ue } from "./libs-0c2ad75d.js";
import { c as ge } from "./embed-v2-ee42466a.js";
function je(ve, we) {
  for (var g = 0; g < we.length; g++) {
    const L = we[g];
    if (typeof L != "string" && !Array.isArray(L)) {
      for (const v in L)
        if (v !== "default" && !(v in ve)) {
          const f = Object.getOwnPropertyDescriptor(L, v);
          f && Object.defineProperty(ve, v, f.get ? f : {
            enumerable: !0,
            get: () => L[v]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(ve, Symbol.toStringTag, { value: "Module" }));
}
var ye = {}, Ee = {
  get exports() {
    return ye;
  },
  set exports(ve) {
    ye = ve;
  }
};
(function(ve, we) {
  (function(g) {
    ve.exports = g();
  })(function() {
    return function() {
      function g(L, v, f) {
        function d(m, n) {
          if (!v[m]) {
            if (!L[m]) {
              var t = typeof ge == "function" && ge;
              if (!n && t)
                return t(m, !0);
              if (h)
                return h(m, !0);
              var o = new Error("Cannot find module '" + m + "'");
              throw o.code = "MODULE_NOT_FOUND", o;
            }
            var a = v[m] = { exports: {} };
            L[m][0].call(a.exports, function(_) {
              var T = L[m][1][_];
              return d(T || _);
            }, a, a.exports, g, L, v, f);
          }
          return v[m].exports;
        }
        for (var h = typeof ge == "function" && ge, b = 0; b < f.length; b++)
          d(f[b]);
        return d;
      }
      return g;
    }()({ 1: [function(g, L, v) {
      (function(f, d) {
        var h = g("combined-stream"), b = g("util"), m = g("path"), n = g("http"), t = g("https"), o = g("url").parse, a = g("fs"), _ = g("mime-types"), T = g("asynckit"), U = g("./populate.js");
        L.exports = A, b.inherits(A, h);
        function A(x) {
          if (!(this instanceof A))
            return new A(x);
          this._overheadLength = 0, this._valueLength = 0, this._valuesToMeasure = [], h.call(this), x = x || {};
          for (var u in x)
            this[u] = x[u];
        }
        A.LINE_BREAK = `\r
`, A.DEFAULT_CONTENT_TYPE = "application/octet-stream", A.prototype.append = function(x, u, y) {
          y = y || {}, typeof y == "string" && (y = { filename: y });
          var S = h.prototype.append.bind(this);
          if (typeof u == "number" && (u = "" + u), b.isArray(u)) {
            this._error(new Error("Arrays are not supported."));
            return;
          }
          var k = this._multiPartHeader(x, u, y), O = this._multiPartFooter();
          S(k), S(u), S(O), this._trackLength(k, u, y);
        }, A.prototype._trackLength = function(x, u, y) {
          var S = 0;
          y.knownLength != null ? S += +y.knownLength : d.isBuffer(u) ? S = u.length : typeof u == "string" && (S = d.byteLength(u)), this._valueLength += S, this._overheadLength += d.byteLength(x) + A.LINE_BREAK.length, !(!u || !u.path && !(u.readable && u.hasOwnProperty("httpVersion"))) && (y.knownLength || this._valuesToMeasure.push(u));
        }, A.prototype._lengthRetriever = function(x, u) {
          x.hasOwnProperty("fd") ? x.end != null && x.end != 1 / 0 && x.start != null ? u(null, x.end + 1 - (x.start ? x.start : 0)) : a.stat(x.path, function(y, S) {
            var k;
            if (y) {
              u(y);
              return;
            }
            k = S.size - (x.start ? x.start : 0), u(null, k);
          }) : x.hasOwnProperty("httpVersion") ? u(null, +x.headers["content-length"]) : x.hasOwnProperty("httpModule") ? (x.on("response", function(y) {
            x.pause(), u(null, +y.headers["content-length"]);
          }), x.resume()) : u("Unknown stream");
        }, A.prototype._multiPartHeader = function(x, u, y) {
          if (typeof y.header == "string")
            return y.header;
          var S = this._getContentDisposition(u, y), k = this._getContentType(u, y), O = "", q = {
            // add custom disposition as third element or keep it two elements if not
            "Content-Disposition": ["form-data", 'name="' + x + '"'].concat(S || []),
            // if no content type. allow it to be empty array
            "Content-Type": [].concat(k || [])
          };
          typeof y.header == "object" && U(q, y.header);
          var H;
          for (var Y in q)
            q.hasOwnProperty(Y) && (H = q[Y], H != null && (Array.isArray(H) || (H = [H]), H.length && (O += Y + ": " + H.join("; ") + A.LINE_BREAK)));
          return "--" + this.getBoundary() + A.LINE_BREAK + O + A.LINE_BREAK;
        }, A.prototype._getContentDisposition = function(x, u) {
          var y, S;
          return typeof u.filepath == "string" ? y = m.normalize(u.filepath).replace(/\\/g, "/") : u.filename || x.name || x.path ? y = m.basename(u.filename || x.name || x.path) : x.readable && x.hasOwnProperty("httpVersion") && (y = m.basename(x.client._httpMessage.path || "")), y && (S = 'filename="' + y + '"'), S;
        }, A.prototype._getContentType = function(x, u) {
          var y = u.contentType;
          return !y && x.name && (y = _.lookup(x.name)), !y && x.path && (y = _.lookup(x.path)), !y && x.readable && x.hasOwnProperty("httpVersion") && (y = x.headers["content-type"]), !y && (u.filepath || u.filename) && (y = _.lookup(u.filepath || u.filename)), !y && typeof x == "object" && (y = A.DEFAULT_CONTENT_TYPE), y;
        }, A.prototype._multiPartFooter = function() {
          return function(x) {
            var u = A.LINE_BREAK, y = this._streams.length === 0;
            y && (u += this._lastBoundary()), x(u);
          }.bind(this);
        }, A.prototype._lastBoundary = function() {
          return "--" + this.getBoundary() + "--" + A.LINE_BREAK;
        }, A.prototype.getHeaders = function(x) {
          var u, y = {
            "content-type": "multipart/form-data; boundary=" + this.getBoundary()
          };
          for (u in x)
            x.hasOwnProperty(u) && (y[u.toLowerCase()] = x[u]);
          return y;
        }, A.prototype.setBoundary = function(x) {
          this._boundary = x;
        }, A.prototype.getBoundary = function() {
          return this._boundary || this._generateBoundary(), this._boundary;
        }, A.prototype.getBuffer = function() {
          for (var x = new d.alloc(0), u = this.getBoundary(), y = 0, S = this._streams.length; y < S; y++)
            typeof this._streams[y] != "function" && (d.isBuffer(this._streams[y]) ? x = d.concat([x, this._streams[y]]) : x = d.concat([x, d.from(this._streams[y])]), (typeof this._streams[y] != "string" || this._streams[y].substring(2, u.length + 2) !== u) && (x = d.concat([x, d.from(A.LINE_BREAK)])));
          return d.concat([x, d.from(this._lastBoundary())]);
        }, A.prototype._generateBoundary = function() {
          for (var x = "--------------------------", u = 0; u < 24; u++)
            x += Math.floor(Math.random() * 10).toString(16);
          this._boundary = x;
        }, A.prototype.getLengthSync = function() {
          var x = this._overheadLength + this._valueLength;
          return this._streams.length && (x += this._lastBoundary().length), this.hasKnownLength() || this._error(new Error("Cannot calculate proper length in synchronous way.")), x;
        }, A.prototype.hasKnownLength = function() {
          var x = !0;
          return this._valuesToMeasure.length && (x = !1), x;
        }, A.prototype.getLength = function(x) {
          var u = this._overheadLength + this._valueLength;
          if (this._streams.length && (u += this._lastBoundary().length), !this._valuesToMeasure.length) {
            f.nextTick(x.bind(this, null, u));
            return;
          }
          T.parallel(this._valuesToMeasure, this._lengthRetriever, function(y, S) {
            if (y) {
              x(y);
              return;
            }
            S.forEach(function(k) {
              u += k;
            }), x(null, u);
          });
        }, A.prototype.submit = function(x, u) {
          var y, S, k = { method: "post" };
          return typeof x == "string" ? (x = o(x), S = U({
            port: x.port,
            path: x.pathname,
            host: x.hostname,
            protocol: x.protocol
          }, k)) : (S = U(x, k), S.port || (S.port = S.protocol == "https:" ? 443 : 80)), S.headers = this.getHeaders(x.headers), S.protocol == "https:" ? y = t.request(S) : y = n.request(S), this.getLength(function(O, q) {
            if (O) {
              this._error(O);
              return;
            }
            if (y.setHeader("Content-Length", q), this.pipe(y), u) {
              var H, Y = function(C, V) {
                return y.removeListener("error", Y), y.removeListener("response", H), u.call(this, C, V);
              };
              H = Y.bind(this, null), y.on("error", Y), y.on("response", H);
            }
          }.bind(this)), y;
        }, A.prototype._error = function(x) {
          this.error || (this.error = x, this.pause(), this.emit("error", x));
        }, A.prototype.toString = function() {
          return "[object FormData]";
        };
      }).call(this, g("_process"), g("buffer").Buffer);
    }, { "./populate.js": 2, _process: 32, asynckit: 3, buffer: 16, "combined-stream": 18, fs: 15, http: 53, https: 22, "mime-types": 29, path: 30, url: 59, util: 64 }], 2: [function(g, L, v) {
      L.exports = function(f, d) {
        return Object.keys(d).forEach(function(h) {
          f[h] = f[h] || d[h];
        }), f;
      };
    }, {}], 3: [function(g, L, v) {
      L.exports = {
        parallel: g("./parallel.js"),
        serial: g("./serial.js"),
        serialOrdered: g("./serialOrdered.js")
      };
    }, { "./parallel.js": 10, "./serial.js": 11, "./serialOrdered.js": 12 }], 4: [function(g, L, v) {
      L.exports = f;
      function f(h) {
        Object.keys(h.jobs).forEach(d.bind(h)), h.jobs = {};
      }
      function d(h) {
        typeof this.jobs[h] == "function" && this.jobs[h]();
      }
    }, {}], 5: [function(g, L, v) {
      var f = g("./defer.js");
      L.exports = d;
      function d(h) {
        var b = !1;
        return f(function() {
          b = !0;
        }), function(n, t) {
          b ? h(n, t) : f(function() {
            h(n, t);
          });
        };
      }
    }, { "./defer.js": 6 }], 6: [function(g, L, v) {
      (function(f, d) {
        L.exports = h;
        function h(b) {
          var m = typeof d == "function" ? d : typeof f == "object" && typeof f.nextTick == "function" ? f.nextTick : null;
          m ? m(b) : setTimeout(b, 0);
        }
      }).call(this, g("_process"), g("timers").setImmediate);
    }, { _process: 32, timers: 57 }], 7: [function(g, L, v) {
      var f = g("./async.js"), d = g("./abort.js");
      L.exports = h;
      function h(m, n, t, o) {
        var a = t.keyedList ? t.keyedList[t.index] : t.index;
        t.jobs[a] = b(n, a, m[a], function(_, T) {
          a in t.jobs && (delete t.jobs[a], _ ? d(t) : t.results[a] = T, o(_, t.results));
        });
      }
      function b(m, n, t, o) {
        var a;
        return m.length == 2 ? a = m(t, f(o)) : a = m(t, n, f(o)), a;
      }
    }, { "./abort.js": 4, "./async.js": 5 }], 8: [function(g, L, v) {
      L.exports = f;
      function f(d, h) {
        var b = !Array.isArray(d), m = {
          index: 0,
          keyedList: b || h ? Object.keys(d) : null,
          jobs: {},
          results: b ? {} : [],
          size: b ? Object.keys(d).length : d.length
        };
        return h && m.keyedList.sort(b ? h : function(n, t) {
          return h(d[n], d[t]);
        }), m;
      }
    }, {}], 9: [function(g, L, v) {
      var f = g("./abort.js"), d = g("./async.js");
      L.exports = h;
      function h(b) {
        Object.keys(this.jobs).length && (this.index = this.size, f(this), d(b)(null, this.results));
      }
    }, { "./abort.js": 4, "./async.js": 5 }], 10: [function(g, L, v) {
      var f = g("./lib/iterate.js"), d = g("./lib/state.js"), h = g("./lib/terminator.js");
      L.exports = b;
      function b(m, n, t) {
        for (var o = d(m); o.index < (o.keyedList || m).length; )
          f(m, n, o, function(a, _) {
            if (a) {
              t(a, _);
              return;
            }
            if (Object.keys(o.jobs).length === 0) {
              t(null, o.results);
              return;
            }
          }), o.index++;
        return h.bind(o, t);
      }
    }, { "./lib/iterate.js": 7, "./lib/state.js": 8, "./lib/terminator.js": 9 }], 11: [function(g, L, v) {
      var f = g("./serialOrdered.js");
      L.exports = d;
      function d(h, b, m) {
        return f(h, b, null, m);
      }
    }, { "./serialOrdered.js": 12 }], 12: [function(g, L, v) {
      var f = g("./lib/iterate.js"), d = g("./lib/state.js"), h = g("./lib/terminator.js");
      L.exports = b, L.exports.ascending = m, L.exports.descending = n;
      function b(t, o, a, _) {
        var T = d(t, a);
        return f(t, o, T, function U(A, x) {
          if (A) {
            _(A, x);
            return;
          }
          if (T.index++, T.index < (T.keyedList || t).length) {
            f(t, o, T, U);
            return;
          }
          _(null, T.results);
        }), h.bind(T, _);
      }
      function m(t, o) {
        return t < o ? -1 : t > o ? 1 : 0;
      }
      function n(t, o) {
        return -1 * m(t, o);
      }
    }, { "./lib/iterate.js": 7, "./lib/state.js": 8, "./lib/terminator.js": 9 }], 13: [function(g, L, v) {
      v.byteLength = o, v.toByteArray = _, v.fromByteArray = A;
      for (var f = [], d = [], h = typeof Uint8Array < "u" ? Uint8Array : Array, b = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", m = 0, n = b.length; m < n; ++m)
        f[m] = b[m], d[b.charCodeAt(m)] = m;
      d["-".charCodeAt(0)] = 62, d["_".charCodeAt(0)] = 63;
      function t(x) {
        var u = x.length;
        if (u % 4 > 0)
          throw new Error("Invalid string. Length must be a multiple of 4");
        var y = x.indexOf("=");
        y === -1 && (y = u);
        var S = y === u ? 0 : 4 - y % 4;
        return [y, S];
      }
      function o(x) {
        var u = t(x), y = u[0], S = u[1];
        return (y + S) * 3 / 4 - S;
      }
      function a(x, u, y) {
        return (u + y) * 3 / 4 - y;
      }
      function _(x) {
        var u, y = t(x), S = y[0], k = y[1], O = new h(a(x, S, k)), q = 0, H = k > 0 ? S - 4 : S, Y;
        for (Y = 0; Y < H; Y += 4)
          u = d[x.charCodeAt(Y)] << 18 | d[x.charCodeAt(Y + 1)] << 12 | d[x.charCodeAt(Y + 2)] << 6 | d[x.charCodeAt(Y + 3)], O[q++] = u >> 16 & 255, O[q++] = u >> 8 & 255, O[q++] = u & 255;
        return k === 2 && (u = d[x.charCodeAt(Y)] << 2 | d[x.charCodeAt(Y + 1)] >> 4, O[q++] = u & 255), k === 1 && (u = d[x.charCodeAt(Y)] << 10 | d[x.charCodeAt(Y + 1)] << 4 | d[x.charCodeAt(Y + 2)] >> 2, O[q++] = u >> 8 & 255, O[q++] = u & 255), O;
      }
      function T(x) {
        return f[x >> 18 & 63] + f[x >> 12 & 63] + f[x >> 6 & 63] + f[x & 63];
      }
      function U(x, u, y) {
        for (var S, k = [], O = u; O < y; O += 3)
          S = (x[O] << 16 & 16711680) + (x[O + 1] << 8 & 65280) + (x[O + 2] & 255), k.push(T(S));
        return k.join("");
      }
      function A(x) {
        for (var u, y = x.length, S = y % 3, k = [], O = 16383, q = 0, H = y - S; q < H; q += O)
          k.push(U(
            x,
            q,
            q + O > H ? H : q + O
          ));
        return S === 1 ? (u = x[y - 1], k.push(
          f[u >> 2] + f[u << 4 & 63] + "=="
        )) : S === 2 && (u = (x[y - 2] << 8) + x[y - 1], k.push(
          f[u >> 10] + f[u >> 4 & 63] + f[u << 2 & 63] + "="
        )), k.join("");
      }
    }, {}], 14: [function(g, L, v) {
    }, {}], 15: [function(g, L, v) {
      arguments[4][14][0].apply(v, arguments);
    }, { dup: 14 }], 16: [function(g, L, v) {
      (function(f, a) {
        var h = g("base64-js"), b = g("ieee754"), m = g("isarray");
        v.Buffer = a, v.SlowBuffer = O, v.INSPECT_MAX_BYTES = 50, a.TYPED_ARRAY_SUPPORT = f.TYPED_ARRAY_SUPPORT !== void 0 ? f.TYPED_ARRAY_SUPPORT : n(), v.kMaxLength = t();
        function n() {
          try {
            var s = new Uint8Array(1);
            return s.__proto__ = { __proto__: Uint8Array.prototype, foo: function() {
              return 42;
            } }, s.foo() === 42 && // typed array instances can be augmented
            typeof s.subarray == "function" && // chrome 9-10 lack `subarray`
            s.subarray(1, 1).byteLength === 0;
          } catch {
            return !1;
          }
        }
        function t() {
          return a.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
        }
        function o(s, e) {
          if (t() < e)
            throw new RangeError("Invalid typed array length");
          return a.TYPED_ARRAY_SUPPORT ? (s = new Uint8Array(e), s.__proto__ = a.prototype) : (s === null && (s = new a(e)), s.length = e), s;
        }
        function a(s, e, i) {
          if (!a.TYPED_ARRAY_SUPPORT && !(this instanceof a))
            return new a(s, e, i);
          if (typeof s == "number") {
            if (typeof e == "string")
              throw new Error(
                "If encoding is specified then the first argument must be a string"
              );
            return A(this, s);
          }
          return _(this, s, e, i);
        }
        a.poolSize = 8192, a._augment = function(s) {
          return s.__proto__ = a.prototype, s;
        };
        function _(s, e, i, c) {
          if (typeof e == "number")
            throw new TypeError('"value" argument must not be a number');
          return typeof ArrayBuffer < "u" && e instanceof ArrayBuffer ? y(s, e, i, c) : typeof e == "string" ? x(s, e, i) : S(s, e);
        }
        a.from = function(s, e, i) {
          return _(null, s, e, i);
        }, a.TYPED_ARRAY_SUPPORT && (a.prototype.__proto__ = Uint8Array.prototype, a.__proto__ = Uint8Array, typeof Symbol < "u" && Symbol.species && a[Symbol.species] === a && Object.defineProperty(a, Symbol.species, {
          value: null,
          configurable: !0
        }));
        function T(s) {
          if (typeof s != "number")
            throw new TypeError('"size" argument must be a number');
          if (s < 0)
            throw new RangeError('"size" argument must not be negative');
        }
        function U(s, e, i, c) {
          return T(e), e <= 0 ? o(s, e) : i !== void 0 ? typeof c == "string" ? o(s, e).fill(i, c) : o(s, e).fill(i) : o(s, e);
        }
        a.alloc = function(s, e, i) {
          return U(null, s, e, i);
        };
        function A(s, e) {
          if (T(e), s = o(s, e < 0 ? 0 : k(e) | 0), !a.TYPED_ARRAY_SUPPORT)
            for (var i = 0; i < e; ++i)
              s[i] = 0;
          return s;
        }
        a.allocUnsafe = function(s) {
          return A(null, s);
        }, a.allocUnsafeSlow = function(s) {
          return A(null, s);
        };
        function x(s, e, i) {
          if ((typeof i != "string" || i === "") && (i = "utf8"), !a.isEncoding(i))
            throw new TypeError('"encoding" must be a valid string encoding');
          var c = q(e, i) | 0;
          s = o(s, c);
          var E = s.write(e, i);
          return E !== c && (s = s.slice(0, E)), s;
        }
        function u(s, e) {
          var i = e.length < 0 ? 0 : k(e.length) | 0;
          s = o(s, i);
          for (var c = 0; c < i; c += 1)
            s[c] = e[c] & 255;
          return s;
        }
        function y(s, e, i, c) {
          if (e.byteLength, i < 0 || e.byteLength < i)
            throw new RangeError("'offset' is out of bounds");
          if (e.byteLength < i + (c || 0))
            throw new RangeError("'length' is out of bounds");
          return i === void 0 && c === void 0 ? e = new Uint8Array(e) : c === void 0 ? e = new Uint8Array(e, i) : e = new Uint8Array(e, i, c), a.TYPED_ARRAY_SUPPORT ? (s = e, s.__proto__ = a.prototype) : s = u(s, e), s;
        }
        function S(s, e) {
          if (a.isBuffer(e)) {
            var i = k(e.length) | 0;
            return s = o(s, i), s.length === 0 || e.copy(s, 0, 0, i), s;
          }
          if (e) {
            if (typeof ArrayBuffer < "u" && e.buffer instanceof ArrayBuffer || "length" in e)
              return typeof e.length != "number" || xe(e.length) ? o(s, 0) : u(s, e);
            if (e.type === "Buffer" && m(e.data))
              return u(s, e.data);
          }
          throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
        }
        function k(s) {
          if (s >= t())
            throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + t().toString(16) + " bytes");
          return s | 0;
        }
        function O(s) {
          return +s != s && (s = 0), a.alloc(+s);
        }
        a.isBuffer = function(e) {
          return !!(e != null && e._isBuffer);
        }, a.compare = function(e, i) {
          if (!a.isBuffer(e) || !a.isBuffer(i))
            throw new TypeError("Arguments must be Buffers");
          if (e === i)
            return 0;
          for (var c = e.length, E = i.length, D = 0, P = Math.min(c, E); D < P; ++D)
            if (e[D] !== i[D]) {
              c = e[D], E = i[D];
              break;
            }
          return c < E ? -1 : E < c ? 1 : 0;
        }, a.isEncoding = function(e) {
          switch (String(e).toLowerCase()) {
            case "hex":
            case "utf8":
            case "utf-8":
            case "ascii":
            case "latin1":
            case "binary":
            case "base64":
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return !0;
            default:
              return !1;
          }
        }, a.concat = function(e, i) {
          if (!m(e))
            throw new TypeError('"list" argument must be an Array of Buffers');
          if (e.length === 0)
            return a.alloc(0);
          var c;
          if (i === void 0)
            for (i = 0, c = 0; c < e.length; ++c)
              i += e[c].length;
          var E = a.allocUnsafe(i), D = 0;
          for (c = 0; c < e.length; ++c) {
            var P = e[c];
            if (!a.isBuffer(P))
              throw new TypeError('"list" argument must be an Array of Buffers');
            P.copy(E, D), D += P.length;
          }
          return E;
        };
        function q(s, e) {
          if (a.isBuffer(s))
            return s.length;
          if (typeof ArrayBuffer < "u" && typeof ArrayBuffer.isView == "function" && (ArrayBuffer.isView(s) || s instanceof ArrayBuffer))
            return s.byteLength;
          typeof s != "string" && (s = "" + s);
          var i = s.length;
          if (i === 0)
            return 0;
          for (var c = !1; ; )
            switch (e) {
              case "ascii":
              case "latin1":
              case "binary":
                return i;
              case "utf8":
              case "utf-8":
              case void 0:
                return $(s).length;
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return i * 2;
              case "hex":
                return i >>> 1;
              case "base64":
                return he(s).length;
              default:
                if (c)
                  return $(s).length;
                e = ("" + e).toLowerCase(), c = !0;
            }
        }
        a.byteLength = q;
        function H(s, e, i) {
          var c = !1;
          if ((e === void 0 || e < 0) && (e = 0), e > this.length || ((i === void 0 || i > this.length) && (i = this.length), i <= 0) || (i >>>= 0, e >>>= 0, i <= e))
            return "";
          for (s || (s = "utf8"); ; )
            switch (s) {
              case "hex":
                return l(this, e, i);
              case "utf8":
              case "utf-8":
                return te(this, e, i);
              case "ascii":
                return z(this, e, i);
              case "latin1":
              case "binary":
                return j(this, e, i);
              case "base64":
                return re(this, e, i);
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return w(this, e, i);
              default:
                if (c)
                  throw new TypeError("Unknown encoding: " + s);
                s = (s + "").toLowerCase(), c = !0;
            }
        }
        a.prototype._isBuffer = !0;
        function Y(s, e, i) {
          var c = s[e];
          s[e] = s[i], s[i] = c;
        }
        a.prototype.swap16 = function() {
          var e = this.length;
          if (e % 2 !== 0)
            throw new RangeError("Buffer size must be a multiple of 16-bits");
          for (var i = 0; i < e; i += 2)
            Y(this, i, i + 1);
          return this;
        }, a.prototype.swap32 = function() {
          var e = this.length;
          if (e % 4 !== 0)
            throw new RangeError("Buffer size must be a multiple of 32-bits");
          for (var i = 0; i < e; i += 4)
            Y(this, i, i + 3), Y(this, i + 1, i + 2);
          return this;
        }, a.prototype.swap64 = function() {
          var e = this.length;
          if (e % 8 !== 0)
            throw new RangeError("Buffer size must be a multiple of 64-bits");
          for (var i = 0; i < e; i += 8)
            Y(this, i, i + 7), Y(this, i + 1, i + 6), Y(this, i + 2, i + 5), Y(this, i + 3, i + 4);
          return this;
        }, a.prototype.toString = function() {
          var e = this.length | 0;
          return e === 0 ? "" : arguments.length === 0 ? te(this, 0, e) : H.apply(this, arguments);
        }, a.prototype.equals = function(e) {
          if (!a.isBuffer(e))
            throw new TypeError("Argument must be a Buffer");
          return this === e ? !0 : a.compare(this, e) === 0;
        }, a.prototype.inspect = function() {
          var e = "", i = v.INSPECT_MAX_BYTES;
          return this.length > 0 && (e = this.toString("hex", 0, i).match(/.{2}/g).join(" "), this.length > i && (e += " ... ")), "<Buffer " + e + ">";
        }, a.prototype.compare = function(e, i, c, E, D) {
          if (!a.isBuffer(e))
            throw new TypeError("Argument must be a Buffer");
          if (i === void 0 && (i = 0), c === void 0 && (c = e ? e.length : 0), E === void 0 && (E = 0), D === void 0 && (D = this.length), i < 0 || c > e.length || E < 0 || D > this.length)
            throw new RangeError("out of range index");
          if (E >= D && i >= c)
            return 0;
          if (E >= D)
            return -1;
          if (i >= c)
            return 1;
          if (i >>>= 0, c >>>= 0, E >>>= 0, D >>>= 0, this === e)
            return 0;
          for (var P = D - E, Q = c - i, ie = Math.min(P, Q), se = this.slice(E, D), me = e.slice(i, c), pe = 0; pe < ie; ++pe)
            if (se[pe] !== me[pe]) {
              P = se[pe], Q = me[pe];
              break;
            }
          return P < Q ? -1 : Q < P ? 1 : 0;
        };
        function C(s, e, i, c, E) {
          if (s.length === 0)
            return -1;
          if (typeof i == "string" ? (c = i, i = 0) : i > 2147483647 ? i = 2147483647 : i < -2147483648 && (i = -2147483648), i = +i, isNaN(i) && (i = E ? 0 : s.length - 1), i < 0 && (i = s.length + i), i >= s.length) {
            if (E)
              return -1;
            i = s.length - 1;
          } else if (i < 0)
            if (E)
              i = 0;
            else
              return -1;
          if (typeof e == "string" && (e = a.from(e, c)), a.isBuffer(e))
            return e.length === 0 ? -1 : V(s, e, i, c, E);
          if (typeof e == "number")
            return e = e & 255, a.TYPED_ARRAY_SUPPORT && typeof Uint8Array.prototype.indexOf == "function" ? E ? Uint8Array.prototype.indexOf.call(s, e, i) : Uint8Array.prototype.lastIndexOf.call(s, e, i) : V(s, [e], i, c, E);
          throw new TypeError("val must be string, number or Buffer");
        }
        function V(s, e, i, c, E) {
          var D = 1, P = s.length, Q = e.length;
          if (c !== void 0 && (c = String(c).toLowerCase(), c === "ucs2" || c === "ucs-2" || c === "utf16le" || c === "utf-16le")) {
            if (s.length < 2 || e.length < 2)
              return -1;
            D = 2, P /= 2, Q /= 2, i /= 2;
          }
          function ie(_e, ke) {
            return D === 1 ? _e[ke] : _e.readUInt16BE(ke * D);
          }
          var se;
          if (E) {
            var me = -1;
            for (se = i; se < P; se++)
              if (ie(s, se) === ie(e, me === -1 ? 0 : se - me)) {
                if (me === -1 && (me = se), se - me + 1 === Q)
                  return me * D;
              } else
                me !== -1 && (se -= se - me), me = -1;
          } else
            for (i + Q > P && (i = P - Q), se = i; se >= 0; se--) {
              for (var pe = !0, be = 0; be < Q; be++)
                if (ie(s, se + be) !== ie(e, be)) {
                  pe = !1;
                  break;
                }
              if (pe)
                return se;
            }
          return -1;
        }
        a.prototype.includes = function(e, i, c) {
          return this.indexOf(e, i, c) !== -1;
        }, a.prototype.indexOf = function(e, i, c) {
          return C(this, e, i, c, !0);
        }, a.prototype.lastIndexOf = function(e, i, c) {
          return C(this, e, i, c, !1);
        };
        function F(s, e, i, c) {
          i = Number(i) || 0;
          var E = s.length - i;
          c ? (c = Number(c), c > E && (c = E)) : c = E;
          var D = e.length;
          if (D % 2 !== 0)
            throw new TypeError("Invalid hex string");
          c > D / 2 && (c = D / 2);
          for (var P = 0; P < c; ++P) {
            var Q = parseInt(e.substr(P * 2, 2), 16);
            if (isNaN(Q))
              return P;
            s[i + P] = Q;
          }
          return P;
        }
        function ne(s, e, i, c) {
          return fe($(e, s.length - i), s, i, c);
        }
        function ae(s, e, i, c) {
          return fe(X(e), s, i, c);
        }
        function oe(s, e, i, c) {
          return ae(s, e, i, c);
        }
        function ce(s, e, i, c) {
          return fe(he(e), s, i, c);
        }
        function G(s, e, i, c) {
          return fe(J(e, s.length - i), s, i, c);
        }
        a.prototype.write = function(e, i, c, E) {
          if (i === void 0)
            E = "utf8", c = this.length, i = 0;
          else if (c === void 0 && typeof i == "string")
            E = i, c = this.length, i = 0;
          else if (isFinite(i))
            i = i | 0, isFinite(c) ? (c = c | 0, E === void 0 && (E = "utf8")) : (E = c, c = void 0);
          else
            throw new Error(
              "Buffer.write(string, encoding, offset[, length]) is no longer supported"
            );
          var D = this.length - i;
          if ((c === void 0 || c > D) && (c = D), e.length > 0 && (c < 0 || i < 0) || i > this.length)
            throw new RangeError("Attempt to write outside buffer bounds");
          E || (E = "utf8");
          for (var P = !1; ; )
            switch (E) {
              case "hex":
                return F(this, e, i, c);
              case "utf8":
              case "utf-8":
                return ne(this, e, i, c);
              case "ascii":
                return ae(this, e, i, c);
              case "latin1":
              case "binary":
                return oe(this, e, i, c);
              case "base64":
                return ce(this, e, i, c);
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return G(this, e, i, c);
              default:
                if (P)
                  throw new TypeError("Unknown encoding: " + E);
                E = ("" + E).toLowerCase(), P = !0;
            }
        }, a.prototype.toJSON = function() {
          return {
            type: "Buffer",
            data: Array.prototype.slice.call(this._arr || this, 0)
          };
        };
        function re(s, e, i) {
          return e === 0 && i === s.length ? h.fromByteArray(s) : h.fromByteArray(s.slice(e, i));
        }
        function te(s, e, i) {
          i = Math.min(s.length, i);
          for (var c = [], E = e; E < i; ) {
            var D = s[E], P = null, Q = D > 239 ? 4 : D > 223 ? 3 : D > 191 ? 2 : 1;
            if (E + Q <= i) {
              var ie, se, me, pe;
              switch (Q) {
                case 1:
                  D < 128 && (P = D);
                  break;
                case 2:
                  ie = s[E + 1], (ie & 192) === 128 && (pe = (D & 31) << 6 | ie & 63, pe > 127 && (P = pe));
                  break;
                case 3:
                  ie = s[E + 1], se = s[E + 2], (ie & 192) === 128 && (se & 192) === 128 && (pe = (D & 15) << 12 | (ie & 63) << 6 | se & 63, pe > 2047 && (pe < 55296 || pe > 57343) && (P = pe));
                  break;
                case 4:
                  ie = s[E + 1], se = s[E + 2], me = s[E + 3], (ie & 192) === 128 && (se & 192) === 128 && (me & 192) === 128 && (pe = (D & 15) << 18 | (ie & 63) << 12 | (se & 63) << 6 | me & 63, pe > 65535 && pe < 1114112 && (P = pe));
              }
            }
            P === null ? (P = 65533, Q = 1) : P > 65535 && (P -= 65536, c.push(P >>> 10 & 1023 | 55296), P = 56320 | P & 1023), c.push(P), E += Q;
          }
          return le(c);
        }
        var de = 4096;
        function le(s) {
          var e = s.length;
          if (e <= de)
            return String.fromCharCode.apply(String, s);
          for (var i = "", c = 0; c < e; )
            i += String.fromCharCode.apply(
              String,
              s.slice(c, c += de)
            );
          return i;
        }
        function z(s, e, i) {
          var c = "";
          i = Math.min(s.length, i);
          for (var E = e; E < i; ++E)
            c += String.fromCharCode(s[E] & 127);
          return c;
        }
        function j(s, e, i) {
          var c = "";
          i = Math.min(s.length, i);
          for (var E = e; E < i; ++E)
            c += String.fromCharCode(s[E]);
          return c;
        }
        function l(s, e, i) {
          var c = s.length;
          (!e || e < 0) && (e = 0), (!i || i < 0 || i > c) && (i = c);
          for (var E = "", D = e; D < i; ++D)
            E += W(s[D]);
          return E;
        }
        function w(s, e, i) {
          for (var c = s.slice(e, i), E = "", D = 0; D < c.length; D += 2)
            E += String.fromCharCode(c[D] + c[D + 1] * 256);
          return E;
        }
        a.prototype.slice = function(e, i) {
          var c = this.length;
          e = ~~e, i = i === void 0 ? c : ~~i, e < 0 ? (e += c, e < 0 && (e = 0)) : e > c && (e = c), i < 0 ? (i += c, i < 0 && (i = 0)) : i > c && (i = c), i < e && (i = e);
          var E;
          if (a.TYPED_ARRAY_SUPPORT)
            E = this.subarray(e, i), E.__proto__ = a.prototype;
          else {
            var D = i - e;
            E = new a(D, void 0);
            for (var P = 0; P < D; ++P)
              E[P] = this[P + e];
          }
          return E;
        };
        function R(s, e, i) {
          if (s % 1 !== 0 || s < 0)
            throw new RangeError("offset is not uint");
          if (s + e > i)
            throw new RangeError("Trying to access beyond buffer length");
        }
        a.prototype.readUIntLE = function(e, i, c) {
          e = e | 0, i = i | 0, c || R(e, i, this.length);
          for (var E = this[e], D = 1, P = 0; ++P < i && (D *= 256); )
            E += this[e + P] * D;
          return E;
        }, a.prototype.readUIntBE = function(e, i, c) {
          e = e | 0, i = i | 0, c || R(e, i, this.length);
          for (var E = this[e + --i], D = 1; i > 0 && (D *= 256); )
            E += this[e + --i] * D;
          return E;
        }, a.prototype.readUInt8 = function(e, i) {
          return i || R(e, 1, this.length), this[e];
        }, a.prototype.readUInt16LE = function(e, i) {
          return i || R(e, 2, this.length), this[e] | this[e + 1] << 8;
        }, a.prototype.readUInt16BE = function(e, i) {
          return i || R(e, 2, this.length), this[e] << 8 | this[e + 1];
        }, a.prototype.readUInt32LE = function(e, i) {
          return i || R(e, 4, this.length), (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + this[e + 3] * 16777216;
        }, a.prototype.readUInt32BE = function(e, i) {
          return i || R(e, 4, this.length), this[e] * 16777216 + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]);
        }, a.prototype.readIntLE = function(e, i, c) {
          e = e | 0, i = i | 0, c || R(e, i, this.length);
          for (var E = this[e], D = 1, P = 0; ++P < i && (D *= 256); )
            E += this[e + P] * D;
          return D *= 128, E >= D && (E -= Math.pow(2, 8 * i)), E;
        }, a.prototype.readIntBE = function(e, i, c) {
          e = e | 0, i = i | 0, c || R(e, i, this.length);
          for (var E = i, D = 1, P = this[e + --E]; E > 0 && (D *= 256); )
            P += this[e + --E] * D;
          return D *= 128, P >= D && (P -= Math.pow(2, 8 * i)), P;
        }, a.prototype.readInt8 = function(e, i) {
          return i || R(e, 1, this.length), this[e] & 128 ? (255 - this[e] + 1) * -1 : this[e];
        }, a.prototype.readInt16LE = function(e, i) {
          i || R(e, 2, this.length);
          var c = this[e] | this[e + 1] << 8;
          return c & 32768 ? c | 4294901760 : c;
        }, a.prototype.readInt16BE = function(e, i) {
          i || R(e, 2, this.length);
          var c = this[e + 1] | this[e] << 8;
          return c & 32768 ? c | 4294901760 : c;
        }, a.prototype.readInt32LE = function(e, i) {
          return i || R(e, 4, this.length), this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24;
        }, a.prototype.readInt32BE = function(e, i) {
          return i || R(e, 4, this.length), this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3];
        }, a.prototype.readFloatLE = function(e, i) {
          return i || R(e, 4, this.length), b.read(this, e, !0, 23, 4);
        }, a.prototype.readFloatBE = function(e, i) {
          return i || R(e, 4, this.length), b.read(this, e, !1, 23, 4);
        }, a.prototype.readDoubleLE = function(e, i) {
          return i || R(e, 8, this.length), b.read(this, e, !0, 52, 8);
        }, a.prototype.readDoubleBE = function(e, i) {
          return i || R(e, 8, this.length), b.read(this, e, !1, 52, 8);
        };
        function I(s, e, i, c, E, D) {
          if (!a.isBuffer(s))
            throw new TypeError('"buffer" argument must be a Buffer instance');
          if (e > E || e < D)
            throw new RangeError('"value" argument is out of bounds');
          if (i + c > s.length)
            throw new RangeError("Index out of range");
        }
        a.prototype.writeUIntLE = function(e, i, c, E) {
          if (e = +e, i = i | 0, c = c | 0, !E) {
            var D = Math.pow(2, 8 * c) - 1;
            I(this, e, i, c, D, 0);
          }
          var P = 1, Q = 0;
          for (this[i] = e & 255; ++Q < c && (P *= 256); )
            this[i + Q] = e / P & 255;
          return i + c;
        }, a.prototype.writeUIntBE = function(e, i, c, E) {
          if (e = +e, i = i | 0, c = c | 0, !E) {
            var D = Math.pow(2, 8 * c) - 1;
            I(this, e, i, c, D, 0);
          }
          var P = c - 1, Q = 1;
          for (this[i + P] = e & 255; --P >= 0 && (Q *= 256); )
            this[i + P] = e / Q & 255;
          return i + c;
        }, a.prototype.writeUInt8 = function(e, i, c) {
          return e = +e, i = i | 0, c || I(this, e, i, 1, 255, 0), a.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)), this[i] = e & 255, i + 1;
        };
        function B(s, e, i, c) {
          e < 0 && (e = 65535 + e + 1);
          for (var E = 0, D = Math.min(s.length - i, 2); E < D; ++E)
            s[i + E] = (e & 255 << 8 * (c ? E : 1 - E)) >>> (c ? E : 1 - E) * 8;
        }
        a.prototype.writeUInt16LE = function(e, i, c) {
          return e = +e, i = i | 0, c || I(this, e, i, 2, 65535, 0), a.TYPED_ARRAY_SUPPORT ? (this[i] = e & 255, this[i + 1] = e >>> 8) : B(this, e, i, !0), i + 2;
        }, a.prototype.writeUInt16BE = function(e, i, c) {
          return e = +e, i = i | 0, c || I(this, e, i, 2, 65535, 0), a.TYPED_ARRAY_SUPPORT ? (this[i] = e >>> 8, this[i + 1] = e & 255) : B(this, e, i, !1), i + 2;
        };
        function N(s, e, i, c) {
          e < 0 && (e = 4294967295 + e + 1);
          for (var E = 0, D = Math.min(s.length - i, 4); E < D; ++E)
            s[i + E] = e >>> (c ? E : 3 - E) * 8 & 255;
        }
        a.prototype.writeUInt32LE = function(e, i, c) {
          return e = +e, i = i | 0, c || I(this, e, i, 4, 4294967295, 0), a.TYPED_ARRAY_SUPPORT ? (this[i + 3] = e >>> 24, this[i + 2] = e >>> 16, this[i + 1] = e >>> 8, this[i] = e & 255) : N(this, e, i, !0), i + 4;
        }, a.prototype.writeUInt32BE = function(e, i, c) {
          return e = +e, i = i | 0, c || I(this, e, i, 4, 4294967295, 0), a.TYPED_ARRAY_SUPPORT ? (this[i] = e >>> 24, this[i + 1] = e >>> 16, this[i + 2] = e >>> 8, this[i + 3] = e & 255) : N(this, e, i, !1), i + 4;
        }, a.prototype.writeIntLE = function(e, i, c, E) {
          if (e = +e, i = i | 0, !E) {
            var D = Math.pow(2, 8 * c - 1);
            I(this, e, i, c, D - 1, -D);
          }
          var P = 0, Q = 1, ie = 0;
          for (this[i] = e & 255; ++P < c && (Q *= 256); )
            e < 0 && ie === 0 && this[i + P - 1] !== 0 && (ie = 1), this[i + P] = (e / Q >> 0) - ie & 255;
          return i + c;
        }, a.prototype.writeIntBE = function(e, i, c, E) {
          if (e = +e, i = i | 0, !E) {
            var D = Math.pow(2, 8 * c - 1);
            I(this, e, i, c, D - 1, -D);
          }
          var P = c - 1, Q = 1, ie = 0;
          for (this[i + P] = e & 255; --P >= 0 && (Q *= 256); )
            e < 0 && ie === 0 && this[i + P + 1] !== 0 && (ie = 1), this[i + P] = (e / Q >> 0) - ie & 255;
          return i + c;
        }, a.prototype.writeInt8 = function(e, i, c) {
          return e = +e, i = i | 0, c || I(this, e, i, 1, 127, -128), a.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)), e < 0 && (e = 255 + e + 1), this[i] = e & 255, i + 1;
        }, a.prototype.writeInt16LE = function(e, i, c) {
          return e = +e, i = i | 0, c || I(this, e, i, 2, 32767, -32768), a.TYPED_ARRAY_SUPPORT ? (this[i] = e & 255, this[i + 1] = e >>> 8) : B(this, e, i, !0), i + 2;
        }, a.prototype.writeInt16BE = function(e, i, c) {
          return e = +e, i = i | 0, c || I(this, e, i, 2, 32767, -32768), a.TYPED_ARRAY_SUPPORT ? (this[i] = e >>> 8, this[i + 1] = e & 255) : B(this, e, i, !1), i + 2;
        }, a.prototype.writeInt32LE = function(e, i, c) {
          return e = +e, i = i | 0, c || I(this, e, i, 4, 2147483647, -2147483648), a.TYPED_ARRAY_SUPPORT ? (this[i] = e & 255, this[i + 1] = e >>> 8, this[i + 2] = e >>> 16, this[i + 3] = e >>> 24) : N(this, e, i, !0), i + 4;
        }, a.prototype.writeInt32BE = function(e, i, c) {
          return e = +e, i = i | 0, c || I(this, e, i, 4, 2147483647, -2147483648), e < 0 && (e = 4294967295 + e + 1), a.TYPED_ARRAY_SUPPORT ? (this[i] = e >>> 24, this[i + 1] = e >>> 16, this[i + 2] = e >>> 8, this[i + 3] = e & 255) : N(this, e, i, !1), i + 4;
        };
        function K(s, e, i, c, E, D) {
          if (i + c > s.length)
            throw new RangeError("Index out of range");
          if (i < 0)
            throw new RangeError("Index out of range");
        }
        function Z(s, e, i, c, E) {
          return E || K(s, e, i, 4), b.write(s, e, i, c, 23, 4), i + 4;
        }
        a.prototype.writeFloatLE = function(e, i, c) {
          return Z(this, e, i, !0, c);
        }, a.prototype.writeFloatBE = function(e, i, c) {
          return Z(this, e, i, !1, c);
        };
        function ee(s, e, i, c, E) {
          return E || K(s, e, i, 8), b.write(s, e, i, c, 52, 8), i + 8;
        }
        a.prototype.writeDoubleLE = function(e, i, c) {
          return ee(this, e, i, !0, c);
        }, a.prototype.writeDoubleBE = function(e, i, c) {
          return ee(this, e, i, !1, c);
        }, a.prototype.copy = function(e, i, c, E) {
          if (c || (c = 0), !E && E !== 0 && (E = this.length), i >= e.length && (i = e.length), i || (i = 0), E > 0 && E < c && (E = c), E === c || e.length === 0 || this.length === 0)
            return 0;
          if (i < 0)
            throw new RangeError("targetStart out of bounds");
          if (c < 0 || c >= this.length)
            throw new RangeError("sourceStart out of bounds");
          if (E < 0)
            throw new RangeError("sourceEnd out of bounds");
          E > this.length && (E = this.length), e.length - i < E - c && (E = e.length - i + c);
          var D = E - c, P;
          if (this === e && c < i && i < E)
            for (P = D - 1; P >= 0; --P)
              e[P + i] = this[P + c];
          else if (D < 1e3 || !a.TYPED_ARRAY_SUPPORT)
            for (P = 0; P < D; ++P)
              e[P + i] = this[P + c];
          else
            Uint8Array.prototype.set.call(
              e,
              this.subarray(c, c + D),
              i
            );
          return D;
        }, a.prototype.fill = function(e, i, c, E) {
          if (typeof e == "string") {
            if (typeof i == "string" ? (E = i, i = 0, c = this.length) : typeof c == "string" && (E = c, c = this.length), e.length === 1) {
              var D = e.charCodeAt(0);
              D < 256 && (e = D);
            }
            if (E !== void 0 && typeof E != "string")
              throw new TypeError("encoding must be a string");
            if (typeof E == "string" && !a.isEncoding(E))
              throw new TypeError("Unknown encoding: " + E);
          } else
            typeof e == "number" && (e = e & 255);
          if (i < 0 || this.length < i || this.length < c)
            throw new RangeError("Out of range index");
          if (c <= i)
            return this;
          i = i >>> 0, c = c === void 0 ? this.length : c >>> 0, e || (e = 0);
          var P;
          if (typeof e == "number")
            for (P = i; P < c; ++P)
              this[P] = e;
          else {
            var Q = a.isBuffer(e) ? e : $(new a(e, E).toString()), ie = Q.length;
            for (P = 0; P < c - i; ++P)
              this[P + i] = Q[P % ie];
          }
          return this;
        };
        var r = /[^+\/0-9A-Za-z-_]/g;
        function p(s) {
          if (s = M(s).replace(r, ""), s.length < 2)
            return "";
          for (; s.length % 4 !== 0; )
            s = s + "=";
          return s;
        }
        function M(s) {
          return s.trim ? s.trim() : s.replace(/^\s+|\s+$/g, "");
        }
        function W(s) {
          return s < 16 ? "0" + s.toString(16) : s.toString(16);
        }
        function $(s, e) {
          e = e || 1 / 0;
          for (var i, c = s.length, E = null, D = [], P = 0; P < c; ++P) {
            if (i = s.charCodeAt(P), i > 55295 && i < 57344) {
              if (!E) {
                if (i > 56319) {
                  (e -= 3) > -1 && D.push(239, 191, 189);
                  continue;
                } else if (P + 1 === c) {
                  (e -= 3) > -1 && D.push(239, 191, 189);
                  continue;
                }
                E = i;
                continue;
              }
              if (i < 56320) {
                (e -= 3) > -1 && D.push(239, 191, 189), E = i;
                continue;
              }
              i = (E - 55296 << 10 | i - 56320) + 65536;
            } else
              E && (e -= 3) > -1 && D.push(239, 191, 189);
            if (E = null, i < 128) {
              if ((e -= 1) < 0)
                break;
              D.push(i);
            } else if (i < 2048) {
              if ((e -= 2) < 0)
                break;
              D.push(
                i >> 6 | 192,
                i & 63 | 128
              );
            } else if (i < 65536) {
              if ((e -= 3) < 0)
                break;
              D.push(
                i >> 12 | 224,
                i >> 6 & 63 | 128,
                i & 63 | 128
              );
            } else if (i < 1114112) {
              if ((e -= 4) < 0)
                break;
              D.push(
                i >> 18 | 240,
                i >> 12 & 63 | 128,
                i >> 6 & 63 | 128,
                i & 63 | 128
              );
            } else
              throw new Error("Invalid code point");
          }
          return D;
        }
        function X(s) {
          for (var e = [], i = 0; i < s.length; ++i)
            e.push(s.charCodeAt(i) & 255);
          return e;
        }
        function J(s, e) {
          for (var i, c, E, D = [], P = 0; P < s.length && !((e -= 2) < 0); ++P)
            i = s.charCodeAt(P), c = i >> 8, E = i % 256, D.push(E), D.push(c);
          return D;
        }
        function he(s) {
          return h.toByteArray(p(s));
        }
        function fe(s, e, i, c) {
          for (var E = 0; E < c && !(E + i >= e.length || E >= s.length); ++E)
            e[E + i] = s[E];
          return E;
        }
        function xe(s) {
          return s !== s;
        }
      }).call(this, typeof ue < "u" ? ue : typeof self < "u" ? self : typeof window < "u" ? window : {}, g("buffer").Buffer);
    }, { "base64-js": 13, buffer: 16, ieee754: 23, isarray: 26 }], 17: [function(g, L, v) {
      L.exports = {
        100: "Continue",
        101: "Switching Protocols",
        102: "Processing",
        200: "OK",
        201: "Created",
        202: "Accepted",
        203: "Non-Authoritative Information",
        204: "No Content",
        205: "Reset Content",
        206: "Partial Content",
        207: "Multi-Status",
        208: "Already Reported",
        226: "IM Used",
        300: "Multiple Choices",
        301: "Moved Permanently",
        302: "Found",
        303: "See Other",
        304: "Not Modified",
        305: "Use Proxy",
        307: "Temporary Redirect",
        308: "Permanent Redirect",
        400: "Bad Request",
        401: "Unauthorized",
        402: "Payment Required",
        403: "Forbidden",
        404: "Not Found",
        405: "Method Not Allowed",
        406: "Not Acceptable",
        407: "Proxy Authentication Required",
        408: "Request Timeout",
        409: "Conflict",
        410: "Gone",
        411: "Length Required",
        412: "Precondition Failed",
        413: "Payload Too Large",
        414: "URI Too Long",
        415: "Unsupported Media Type",
        416: "Range Not Satisfiable",
        417: "Expectation Failed",
        418: "I'm a teapot",
        421: "Misdirected Request",
        422: "Unprocessable Entity",
        423: "Locked",
        424: "Failed Dependency",
        425: "Unordered Collection",
        426: "Upgrade Required",
        428: "Precondition Required",
        429: "Too Many Requests",
        431: "Request Header Fields Too Large",
        451: "Unavailable For Legal Reasons",
        500: "Internal Server Error",
        501: "Not Implemented",
        502: "Bad Gateway",
        503: "Service Unavailable",
        504: "Gateway Timeout",
        505: "HTTP Version Not Supported",
        506: "Variant Also Negotiates",
        507: "Insufficient Storage",
        508: "Loop Detected",
        509: "Bandwidth Limit Exceeded",
        510: "Not Extended",
        511: "Network Authentication Required"
      };
    }, {}], 18: [function(g, L, v) {
      (function(f) {
        var d = g("util"), h = g("stream").Stream, b = g("delayed-stream");
        L.exports = m;
        function m() {
          this.writable = !1, this.readable = !0, this.dataSize = 0, this.maxDataSize = 2 * 1024 * 1024, this.pauseStreams = !0, this._released = !1, this._streams = [], this._currentStream = null, this._insideLoop = !1, this._pendingNext = !1;
        }
        d.inherits(m, h), m.create = function(n) {
          var t = new this();
          n = n || {};
          for (var o in n)
            t[o] = n[o];
          return t;
        }, m.isStreamLike = function(n) {
          return typeof n != "function" && typeof n != "string" && typeof n != "boolean" && typeof n != "number" && !f.isBuffer(n);
        }, m.prototype.append = function(n) {
          var t = m.isStreamLike(n);
          if (t) {
            if (!(n instanceof b)) {
              var o = b.create(n, {
                maxDataSize: 1 / 0,
                pauseStream: this.pauseStreams
              });
              n.on("data", this._checkDataSize.bind(this)), n = o;
            }
            this._handleErrors(n), this.pauseStreams && n.pause();
          }
          return this._streams.push(n), this;
        }, m.prototype.pipe = function(n, t) {
          return h.prototype.pipe.call(this, n, t), this.resume(), n;
        }, m.prototype._getNext = function() {
          if (this._currentStream = null, this._insideLoop) {
            this._pendingNext = !0;
            return;
          }
          this._insideLoop = !0;
          try {
            do
              this._pendingNext = !1, this._realGetNext();
            while (this._pendingNext);
          } finally {
            this._insideLoop = !1;
          }
        }, m.prototype._realGetNext = function() {
          var n = this._streams.shift();
          if (typeof n > "u") {
            this.end();
            return;
          }
          if (typeof n != "function") {
            this._pipeNext(n);
            return;
          }
          var t = n;
          t(function(o) {
            var a = m.isStreamLike(o);
            a && (o.on("data", this._checkDataSize.bind(this)), this._handleErrors(o)), this._pipeNext(o);
          }.bind(this));
        }, m.prototype._pipeNext = function(n) {
          this._currentStream = n;
          var t = m.isStreamLike(n);
          if (t) {
            n.on("end", this._getNext.bind(this)), n.pipe(this, { end: !1 });
            return;
          }
          var o = n;
          this.write(o), this._getNext();
        }, m.prototype._handleErrors = function(n) {
          var t = this;
          n.on("error", function(o) {
            t._emitError(o);
          });
        }, m.prototype.write = function(n) {
          this.emit("data", n);
        }, m.prototype.pause = function() {
          this.pauseStreams && (this.pauseStreams && this._currentStream && typeof this._currentStream.pause == "function" && this._currentStream.pause(), this.emit("pause"));
        }, m.prototype.resume = function() {
          this._released || (this._released = !0, this.writable = !0, this._getNext()), this.pauseStreams && this._currentStream && typeof this._currentStream.resume == "function" && this._currentStream.resume(), this.emit("resume");
        }, m.prototype.end = function() {
          this._reset(), this.emit("end");
        }, m.prototype.destroy = function() {
          this._reset(), this.emit("close");
        }, m.prototype._reset = function() {
          this.writable = !1, this._streams = [], this._currentStream = null;
        }, m.prototype._checkDataSize = function() {
          if (this._updateDataSize(), !(this.dataSize <= this.maxDataSize)) {
            var n = "DelayedStream#maxDataSize of " + this.maxDataSize + " bytes exceeded.";
            this._emitError(new Error(n));
          }
        }, m.prototype._updateDataSize = function() {
          this.dataSize = 0;
          var n = this;
          this._streams.forEach(function(t) {
            t.dataSize && (n.dataSize += t.dataSize);
          }), this._currentStream && this._currentStream.dataSize && (this.dataSize += this._currentStream.dataSize);
        }, m.prototype._emitError = function(n) {
          this._reset(), this.emit("error", n);
        };
      }).call(this, { isBuffer: g("../../is-buffer/index.js") });
    }, { "../../is-buffer/index.js": 25, "delayed-stream": 20, stream: 52, util: 64 }], 19: [function(g, L, v) {
      (function(f) {
        function d(S) {
          return Array.isArray ? Array.isArray(S) : y(S) === "[object Array]";
        }
        v.isArray = d;
        function h(S) {
          return typeof S == "boolean";
        }
        v.isBoolean = h;
        function b(S) {
          return S === null;
        }
        v.isNull = b;
        function m(S) {
          return S == null;
        }
        v.isNullOrUndefined = m;
        function n(S) {
          return typeof S == "number";
        }
        v.isNumber = n;
        function t(S) {
          return typeof S == "string";
        }
        v.isString = t;
        function o(S) {
          return typeof S == "symbol";
        }
        v.isSymbol = o;
        function a(S) {
          return S === void 0;
        }
        v.isUndefined = a;
        function _(S) {
          return y(S) === "[object RegExp]";
        }
        v.isRegExp = _;
        function T(S) {
          return typeof S == "object" && S !== null;
        }
        v.isObject = T;
        function U(S) {
          return y(S) === "[object Date]";
        }
        v.isDate = U;
        function A(S) {
          return y(S) === "[object Error]" || S instanceof Error;
        }
        v.isError = A;
        function x(S) {
          return typeof S == "function";
        }
        v.isFunction = x;
        function u(S) {
          return S === null || typeof S == "boolean" || typeof S == "number" || typeof S == "string" || typeof S == "symbol" || // ES6 symbol
          typeof S > "u";
        }
        v.isPrimitive = u, v.isBuffer = f.isBuffer;
        function y(S) {
          return Object.prototype.toString.call(S);
        }
      }).call(this, { isBuffer: g("../../is-buffer/index.js") });
    }, { "../../is-buffer/index.js": 25 }], 20: [function(g, L, v) {
      var f = g("stream").Stream, d = g("util");
      L.exports = h;
      function h() {
        this.source = null, this.dataSize = 0, this.maxDataSize = 1024 * 1024, this.pauseStream = !0, this._maxDataSizeExceeded = !1, this._released = !1, this._bufferedEvents = [];
      }
      d.inherits(h, f), h.create = function(b, m) {
        var n = new this();
        m = m || {};
        for (var t in m)
          n[t] = m[t];
        n.source = b;
        var o = b.emit;
        return b.emit = function() {
          return n._handleEmit(arguments), o.apply(b, arguments);
        }, b.on("error", function() {
        }), n.pauseStream && b.pause(), n;
      }, Object.defineProperty(h.prototype, "readable", {
        configurable: !0,
        enumerable: !0,
        get: function() {
          return this.source.readable;
        }
      }), h.prototype.setEncoding = function() {
        return this.source.setEncoding.apply(this.source, arguments);
      }, h.prototype.resume = function() {
        this._released || this.release(), this.source.resume();
      }, h.prototype.pause = function() {
        this.source.pause();
      }, h.prototype.release = function() {
        this._released = !0, this._bufferedEvents.forEach(function(b) {
          this.emit.apply(this, b);
        }.bind(this)), this._bufferedEvents = [];
      }, h.prototype.pipe = function() {
        var b = f.prototype.pipe.apply(this, arguments);
        return this.resume(), b;
      }, h.prototype._handleEmit = function(b) {
        if (this._released) {
          this.emit.apply(this, b);
          return;
        }
        b[0] === "data" && (this.dataSize += b[1].length, this._checkIfMaxDataSizeExceeded()), this._bufferedEvents.push(b);
      }, h.prototype._checkIfMaxDataSizeExceeded = function() {
        if (!this._maxDataSizeExceeded && !(this.dataSize <= this.maxDataSize)) {
          this._maxDataSizeExceeded = !0;
          var b = "DelayedStream#maxDataSize of " + this.maxDataSize + " bytes exceeded.";
          this.emit("error", new Error(b));
        }
      };
    }, { stream: 52, util: 64 }], 21: [function(g, L, v) {
      function f() {
        this._events = this._events || {}, this._maxListeners = this._maxListeners || void 0;
      }
      L.exports = f, f.EventEmitter = f, f.prototype._events = void 0, f.prototype._maxListeners = void 0, f.defaultMaxListeners = 10, f.prototype.setMaxListeners = function(n) {
        if (!h(n) || n < 0 || isNaN(n))
          throw TypeError("n must be a positive number");
        return this._maxListeners = n, this;
      }, f.prototype.emit = function(n) {
        var t, o, a, _, T, U;
        if (this._events || (this._events = {}), n === "error" && (!this._events.error || b(this._events.error) && !this._events.error.length)) {
          if (t = arguments[1], t instanceof Error)
            throw t;
          var A = new Error('Uncaught, unspecified "error" event. (' + t + ")");
          throw A.context = t, A;
        }
        if (o = this._events[n], m(o))
          return !1;
        if (d(o))
          switch (arguments.length) {
            case 1:
              o.call(this);
              break;
            case 2:
              o.call(this, arguments[1]);
              break;
            case 3:
              o.call(this, arguments[1], arguments[2]);
              break;
            default:
              _ = Array.prototype.slice.call(arguments, 1), o.apply(this, _);
          }
        else if (b(o))
          for (_ = Array.prototype.slice.call(arguments, 1), U = o.slice(), a = U.length, T = 0; T < a; T++)
            U[T].apply(this, _);
        return !0;
      }, f.prototype.addListener = function(n, t) {
        var o;
        if (!d(t))
          throw TypeError("listener must be a function");
        return this._events || (this._events = {}), this._events.newListener && this.emit(
          "newListener",
          n,
          d(t.listener) ? t.listener : t
        ), this._events[n] ? b(this._events[n]) ? this._events[n].push(t) : this._events[n] = [this._events[n], t] : this._events[n] = t, b(this._events[n]) && !this._events[n].warned && (m(this._maxListeners) ? o = f.defaultMaxListeners : o = this._maxListeners, o && o > 0 && this._events[n].length > o && (this._events[n].warned = !0, console.error(
          "(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",
          this._events[n].length
        ), typeof console.trace == "function" && console.trace())), this;
      }, f.prototype.on = f.prototype.addListener, f.prototype.once = function(n, t) {
        if (!d(t))
          throw TypeError("listener must be a function");
        var o = !1;
        function a() {
          this.removeListener(n, a), o || (o = !0, t.apply(this, arguments));
        }
        return a.listener = t, this.on(n, a), this;
      }, f.prototype.removeListener = function(n, t) {
        var o, a, _, T;
        if (!d(t))
          throw TypeError("listener must be a function");
        if (!this._events || !this._events[n])
          return this;
        if (o = this._events[n], _ = o.length, a = -1, o === t || d(o.listener) && o.listener === t)
          delete this._events[n], this._events.removeListener && this.emit("removeListener", n, t);
        else if (b(o)) {
          for (T = _; T-- > 0; )
            if (o[T] === t || o[T].listener && o[T].listener === t) {
              a = T;
              break;
            }
          if (a < 0)
            return this;
          o.length === 1 ? (o.length = 0, delete this._events[n]) : o.splice(a, 1), this._events.removeListener && this.emit("removeListener", n, t);
        }
        return this;
      }, f.prototype.removeAllListeners = function(n) {
        var t, o;
        if (!this._events)
          return this;
        if (!this._events.removeListener)
          return arguments.length === 0 ? this._events = {} : this._events[n] && delete this._events[n], this;
        if (arguments.length === 0) {
          for (t in this._events)
            t !== "removeListener" && this.removeAllListeners(t);
          return this.removeAllListeners("removeListener"), this._events = {}, this;
        }
        if (o = this._events[n], d(o))
          this.removeListener(n, o);
        else if (o)
          for (; o.length; )
            this.removeListener(n, o[o.length - 1]);
        return delete this._events[n], this;
      }, f.prototype.listeners = function(n) {
        var t;
        return !this._events || !this._events[n] ? t = [] : d(this._events[n]) ? t = [this._events[n]] : t = this._events[n].slice(), t;
      }, f.prototype.listenerCount = function(n) {
        if (this._events) {
          var t = this._events[n];
          if (d(t))
            return 1;
          if (t)
            return t.length;
        }
        return 0;
      }, f.listenerCount = function(n, t) {
        return n.listenerCount(t);
      };
      function d(n) {
        return typeof n == "function";
      }
      function h(n) {
        return typeof n == "number";
      }
      function b(n) {
        return typeof n == "object" && n !== null;
      }
      function m(n) {
        return n === void 0;
      }
    }, {}], 22: [function(g, L, v) {
      var f = g("http"), d = L.exports;
      for (var h in f)
        f.hasOwnProperty(h) && (d[h] = f[h]);
      d.request = function(b, m) {
        return b || (b = {}), b.scheme = "https", b.protocol = "https:", f.request.call(this, b, m);
      };
    }, { http: 53 }], 23: [function(g, L, v) {
      v.read = function(f, d, h, b, m) {
        var n, t, o = m * 8 - b - 1, a = (1 << o) - 1, _ = a >> 1, T = -7, U = h ? m - 1 : 0, A = h ? -1 : 1, x = f[d + U];
        for (U += A, n = x & (1 << -T) - 1, x >>= -T, T += o; T > 0; n = n * 256 + f[d + U], U += A, T -= 8)
          ;
        for (t = n & (1 << -T) - 1, n >>= -T, T += b; T > 0; t = t * 256 + f[d + U], U += A, T -= 8)
          ;
        if (n === 0)
          n = 1 - _;
        else {
          if (n === a)
            return t ? NaN : (x ? -1 : 1) * (1 / 0);
          t = t + Math.pow(2, b), n = n - _;
        }
        return (x ? -1 : 1) * t * Math.pow(2, n - b);
      }, v.write = function(f, d, h, b, m, n) {
        var t, o, a, _ = n * 8 - m - 1, T = (1 << _) - 1, U = T >> 1, A = m === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, x = b ? 0 : n - 1, u = b ? 1 : -1, y = d < 0 || d === 0 && 1 / d < 0 ? 1 : 0;
        for (d = Math.abs(d), isNaN(d) || d === 1 / 0 ? (o = isNaN(d) ? 1 : 0, t = T) : (t = Math.floor(Math.log(d) / Math.LN2), d * (a = Math.pow(2, -t)) < 1 && (t--, a *= 2), t + U >= 1 ? d += A / a : d += A * Math.pow(2, 1 - U), d * a >= 2 && (t++, a /= 2), t + U >= T ? (o = 0, t = T) : t + U >= 1 ? (o = (d * a - 1) * Math.pow(2, m), t = t + U) : (o = d * Math.pow(2, U - 1) * Math.pow(2, m), t = 0)); m >= 8; f[h + x] = o & 255, x += u, o /= 256, m -= 8)
          ;
        for (t = t << m | o, _ += m; _ > 0; f[h + x] = t & 255, x += u, t /= 256, _ -= 8)
          ;
        f[h + x - u] |= y * 128;
      };
    }, {}], 24: [function(g, L, v) {
      typeof Object.create == "function" ? L.exports = function(d, h) {
        h && (d.super_ = h, d.prototype = Object.create(h.prototype, {
          constructor: {
            value: d,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }));
      } : L.exports = function(d, h) {
        if (h) {
          d.super_ = h;
          var b = function() {
          };
          b.prototype = h.prototype, d.prototype = new b(), d.prototype.constructor = d;
        }
      };
    }, {}], 25: [function(g, L, v) {
      /*!
       * Determine if an object is a Buffer
       *
       * @author   Feross Aboukhadijeh <https://feross.org>
       * @license  MIT
       */
      L.exports = function(h) {
        return h != null && (f(h) || d(h) || !!h._isBuffer);
      };
      function f(h) {
        return !!h.constructor && typeof h.constructor.isBuffer == "function" && h.constructor.isBuffer(h);
      }
      function d(h) {
        return typeof h.readFloatLE == "function" && typeof h.slice == "function" && f(h.slice(0, 0));
      }
    }, {}], 26: [function(g, L, v) {
      var f = {}.toString;
      L.exports = Array.isArray || function(d) {
        return f.call(d) == "[object Array]";
      };
    }, {}], 27: [function(g, L, v) {
      L.exports = {
        "application/1d-interleaved-parityfec": {
          source: "iana"
        },
        "application/3gpdash-qoe-report+xml": {
          source: "iana",
          charset: "UTF-8",
          compressible: !0
        },
        "application/3gpp-ims+xml": {
          source: "iana",
          compressible: !0
        },
        "application/a2l": {
          source: "iana"
        },
        "application/activemessage": {
          source: "iana"
        },
        "application/activity+json": {
          source: "iana",
          compressible: !0
        },
        "application/alto-costmap+json": {
          source: "iana",
          compressible: !0
        },
        "application/alto-costmapfilter+json": {
          source: "iana",
          compressible: !0
        },
        "application/alto-directory+json": {
          source: "iana",
          compressible: !0
        },
        "application/alto-endpointcost+json": {
          source: "iana",
          compressible: !0
        },
        "application/alto-endpointcostparams+json": {
          source: "iana",
          compressible: !0
        },
        "application/alto-endpointprop+json": {
          source: "iana",
          compressible: !0
        },
        "application/alto-endpointpropparams+json": {
          source: "iana",
          compressible: !0
        },
        "application/alto-error+json": {
          source: "iana",
          compressible: !0
        },
        "application/alto-networkmap+json": {
          source: "iana",
          compressible: !0
        },
        "application/alto-networkmapfilter+json": {
          source: "iana",
          compressible: !0
        },
        "application/alto-updatestreamcontrol+json": {
          source: "iana",
          compressible: !0
        },
        "application/alto-updatestreamparams+json": {
          source: "iana",
          compressible: !0
        },
        "application/aml": {
          source: "iana"
        },
        "application/andrew-inset": {
          source: "iana",
          extensions: ["ez"]
        },
        "application/applefile": {
          source: "iana"
        },
        "application/applixware": {
          source: "apache",
          extensions: ["aw"]
        },
        "application/atf": {
          source: "iana"
        },
        "application/atfx": {
          source: "iana"
        },
        "application/atom+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["atom"]
        },
        "application/atomcat+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["atomcat"]
        },
        "application/atomdeleted+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["atomdeleted"]
        },
        "application/atomicmail": {
          source: "iana"
        },
        "application/atomsvc+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["atomsvc"]
        },
        "application/atsc-dwd+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["dwd"]
        },
        "application/atsc-dynamic-event-message": {
          source: "iana"
        },
        "application/atsc-held+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["held"]
        },
        "application/atsc-rdt+json": {
          source: "iana",
          compressible: !0
        },
        "application/atsc-rsat+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["rsat"]
        },
        "application/atxml": {
          source: "iana"
        },
        "application/auth-policy+xml": {
          source: "iana",
          compressible: !0
        },
        "application/bacnet-xdd+zip": {
          source: "iana",
          compressible: !1
        },
        "application/batch-smtp": {
          source: "iana"
        },
        "application/bdoc": {
          compressible: !1,
          extensions: ["bdoc"]
        },
        "application/beep+xml": {
          source: "iana",
          charset: "UTF-8",
          compressible: !0
        },
        "application/calendar+json": {
          source: "iana",
          compressible: !0
        },
        "application/calendar+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["xcs"]
        },
        "application/call-completion": {
          source: "iana"
        },
        "application/cals-1840": {
          source: "iana"
        },
        "application/cap+xml": {
          source: "iana",
          charset: "UTF-8",
          compressible: !0
        },
        "application/cbor": {
          source: "iana"
        },
        "application/cbor-seq": {
          source: "iana"
        },
        "application/cccex": {
          source: "iana"
        },
        "application/ccmp+xml": {
          source: "iana",
          compressible: !0
        },
        "application/ccxml+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["ccxml"]
        },
        "application/cdfx+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["cdfx"]
        },
        "application/cdmi-capability": {
          source: "iana",
          extensions: ["cdmia"]
        },
        "application/cdmi-container": {
          source: "iana",
          extensions: ["cdmic"]
        },
        "application/cdmi-domain": {
          source: "iana",
          extensions: ["cdmid"]
        },
        "application/cdmi-object": {
          source: "iana",
          extensions: ["cdmio"]
        },
        "application/cdmi-queue": {
          source: "iana",
          extensions: ["cdmiq"]
        },
        "application/cdni": {
          source: "iana"
        },
        "application/cea": {
          source: "iana"
        },
        "application/cea-2018+xml": {
          source: "iana",
          compressible: !0
        },
        "application/cellml+xml": {
          source: "iana",
          compressible: !0
        },
        "application/cfw": {
          source: "iana"
        },
        "application/clue+xml": {
          source: "iana",
          compressible: !0
        },
        "application/clue_info+xml": {
          source: "iana",
          compressible: !0
        },
        "application/cms": {
          source: "iana"
        },
        "application/cnrp+xml": {
          source: "iana",
          compressible: !0
        },
        "application/coap-group+json": {
          source: "iana",
          compressible: !0
        },
        "application/coap-payload": {
          source: "iana"
        },
        "application/commonground": {
          source: "iana"
        },
        "application/conference-info+xml": {
          source: "iana",
          compressible: !0
        },
        "application/cose": {
          source: "iana"
        },
        "application/cose-key": {
          source: "iana"
        },
        "application/cose-key-set": {
          source: "iana"
        },
        "application/cpl+xml": {
          source: "iana",
          compressible: !0
        },
        "application/csrattrs": {
          source: "iana"
        },
        "application/csta+xml": {
          source: "iana",
          compressible: !0
        },
        "application/cstadata+xml": {
          source: "iana",
          compressible: !0
        },
        "application/csvm+json": {
          source: "iana",
          compressible: !0
        },
        "application/cu-seeme": {
          source: "apache",
          extensions: ["cu"]
        },
        "application/cwt": {
          source: "iana"
        },
        "application/cybercash": {
          source: "iana"
        },
        "application/dart": {
          compressible: !0
        },
        "application/dash+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["mpd"]
        },
        "application/dashdelta": {
          source: "iana"
        },
        "application/davmount+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["davmount"]
        },
        "application/dca-rft": {
          source: "iana"
        },
        "application/dcd": {
          source: "iana"
        },
        "application/dec-dx": {
          source: "iana"
        },
        "application/dialog-info+xml": {
          source: "iana",
          compressible: !0
        },
        "application/dicom": {
          source: "iana"
        },
        "application/dicom+json": {
          source: "iana",
          compressible: !0
        },
        "application/dicom+xml": {
          source: "iana",
          compressible: !0
        },
        "application/dii": {
          source: "iana"
        },
        "application/dit": {
          source: "iana"
        },
        "application/dns": {
          source: "iana"
        },
        "application/dns+json": {
          source: "iana",
          compressible: !0
        },
        "application/dns-message": {
          source: "iana"
        },
        "application/docbook+xml": {
          source: "apache",
          compressible: !0,
          extensions: ["dbk"]
        },
        "application/dots+cbor": {
          source: "iana"
        },
        "application/dskpp+xml": {
          source: "iana",
          compressible: !0
        },
        "application/dssc+der": {
          source: "iana",
          extensions: ["dssc"]
        },
        "application/dssc+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["xdssc"]
        },
        "application/dvcs": {
          source: "iana"
        },
        "application/ecmascript": {
          source: "iana",
          compressible: !0,
          extensions: ["ecma", "es"]
        },
        "application/edi-consent": {
          source: "iana"
        },
        "application/edi-x12": {
          source: "iana",
          compressible: !1
        },
        "application/edifact": {
          source: "iana",
          compressible: !1
        },
        "application/efi": {
          source: "iana"
        },
        "application/emergencycalldata.comment+xml": {
          source: "iana",
          compressible: !0
        },
        "application/emergencycalldata.control+xml": {
          source: "iana",
          compressible: !0
        },
        "application/emergencycalldata.deviceinfo+xml": {
          source: "iana",
          compressible: !0
        },
        "application/emergencycalldata.ecall.msd": {
          source: "iana"
        },
        "application/emergencycalldata.providerinfo+xml": {
          source: "iana",
          compressible: !0
        },
        "application/emergencycalldata.serviceinfo+xml": {
          source: "iana",
          compressible: !0
        },
        "application/emergencycalldata.subscriberinfo+xml": {
          source: "iana",
          compressible: !0
        },
        "application/emergencycalldata.veds+xml": {
          source: "iana",
          compressible: !0
        },
        "application/emma+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["emma"]
        },
        "application/emotionml+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["emotionml"]
        },
        "application/encaprtp": {
          source: "iana"
        },
        "application/epp+xml": {
          source: "iana",
          compressible: !0
        },
        "application/epub+zip": {
          source: "iana",
          compressible: !1,
          extensions: ["epub"]
        },
        "application/eshop": {
          source: "iana"
        },
        "application/exi": {
          source: "iana",
          extensions: ["exi"]
        },
        "application/expect-ct-report+json": {
          source: "iana",
          compressible: !0
        },
        "application/fastinfoset": {
          source: "iana"
        },
        "application/fastsoap": {
          source: "iana"
        },
        "application/fdt+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["fdt"]
        },
        "application/fhir+json": {
          source: "iana",
          charset: "UTF-8",
          compressible: !0
        },
        "application/fhir+xml": {
          source: "iana",
          charset: "UTF-8",
          compressible: !0
        },
        "application/fido.trusted-apps+json": {
          compressible: !0
        },
        "application/fits": {
          source: "iana"
        },
        "application/flexfec": {
          source: "iana"
        },
        "application/font-sfnt": {
          source: "iana"
        },
        "application/font-tdpfr": {
          source: "iana",
          extensions: ["pfr"]
        },
        "application/font-woff": {
          source: "iana",
          compressible: !1
        },
        "application/framework-attributes+xml": {
          source: "iana",
          compressible: !0
        },
        "application/geo+json": {
          source: "iana",
          compressible: !0,
          extensions: ["geojson"]
        },
        "application/geo+json-seq": {
          source: "iana"
        },
        "application/geopackage+sqlite3": {
          source: "iana"
        },
        "application/geoxacml+xml": {
          source: "iana",
          compressible: !0
        },
        "application/gltf-buffer": {
          source: "iana"
        },
        "application/gml+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["gml"]
        },
        "application/gpx+xml": {
          source: "apache",
          compressible: !0,
          extensions: ["gpx"]
        },
        "application/gxf": {
          source: "apache",
          extensions: ["gxf"]
        },
        "application/gzip": {
          source: "iana",
          compressible: !1,
          extensions: ["gz"]
        },
        "application/h224": {
          source: "iana"
        },
        "application/held+xml": {
          source: "iana",
          compressible: !0
        },
        "application/hjson": {
          extensions: ["hjson"]
        },
        "application/http": {
          source: "iana"
        },
        "application/hyperstudio": {
          source: "iana",
          extensions: ["stk"]
        },
        "application/ibe-key-request+xml": {
          source: "iana",
          compressible: !0
        },
        "application/ibe-pkg-reply+xml": {
          source: "iana",
          compressible: !0
        },
        "application/ibe-pp-data": {
          source: "iana"
        },
        "application/iges": {
          source: "iana"
        },
        "application/im-iscomposing+xml": {
          source: "iana",
          charset: "UTF-8",
          compressible: !0
        },
        "application/index": {
          source: "iana"
        },
        "application/index.cmd": {
          source: "iana"
        },
        "application/index.obj": {
          source: "iana"
        },
        "application/index.response": {
          source: "iana"
        },
        "application/index.vnd": {
          source: "iana"
        },
        "application/inkml+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["ink", "inkml"]
        },
        "application/iotp": {
          source: "iana"
        },
        "application/ipfix": {
          source: "iana",
          extensions: ["ipfix"]
        },
        "application/ipp": {
          source: "iana"
        },
        "application/isup": {
          source: "iana"
        },
        "application/its+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["its"]
        },
        "application/java-archive": {
          source: "apache",
          compressible: !1,
          extensions: ["jar", "war", "ear"]
        },
        "application/java-serialized-object": {
          source: "apache",
          compressible: !1,
          extensions: ["ser"]
        },
        "application/java-vm": {
          source: "apache",
          compressible: !1,
          extensions: ["class"]
        },
        "application/javascript": {
          source: "iana",
          charset: "UTF-8",
          compressible: !0,
          extensions: ["js", "mjs"]
        },
        "application/jf2feed+json": {
          source: "iana",
          compressible: !0
        },
        "application/jose": {
          source: "iana"
        },
        "application/jose+json": {
          source: "iana",
          compressible: !0
        },
        "application/jrd+json": {
          source: "iana",
          compressible: !0
        },
        "application/json": {
          source: "iana",
          charset: "UTF-8",
          compressible: !0,
          extensions: ["json", "map"]
        },
        "application/json-patch+json": {
          source: "iana",
          compressible: !0
        },
        "application/json-seq": {
          source: "iana"
        },
        "application/json5": {
          extensions: ["json5"]
        },
        "application/jsonml+json": {
          source: "apache",
          compressible: !0,
          extensions: ["jsonml"]
        },
        "application/jwk+json": {
          source: "iana",
          compressible: !0
        },
        "application/jwk-set+json": {
          source: "iana",
          compressible: !0
        },
        "application/jwt": {
          source: "iana"
        },
        "application/kpml-request+xml": {
          source: "iana",
          compressible: !0
        },
        "application/kpml-response+xml": {
          source: "iana",
          compressible: !0
        },
        "application/ld+json": {
          source: "iana",
          compressible: !0,
          extensions: ["jsonld"]
        },
        "application/lgr+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["lgr"]
        },
        "application/link-format": {
          source: "iana"
        },
        "application/load-control+xml": {
          source: "iana",
          compressible: !0
        },
        "application/lost+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["lostxml"]
        },
        "application/lostsync+xml": {
          source: "iana",
          compressible: !0
        },
        "application/lpf+zip": {
          source: "iana",
          compressible: !1
        },
        "application/lxf": {
          source: "iana"
        },
        "application/mac-binhex40": {
          source: "iana",
          extensions: ["hqx"]
        },
        "application/mac-compactpro": {
          source: "apache",
          extensions: ["cpt"]
        },
        "application/macwriteii": {
          source: "iana"
        },
        "application/mads+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["mads"]
        },
        "application/manifest+json": {
          charset: "UTF-8",
          compressible: !0,
          extensions: ["webmanifest"]
        },
        "application/marc": {
          source: "iana",
          extensions: ["mrc"]
        },
        "application/marcxml+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["mrcx"]
        },
        "application/mathematica": {
          source: "iana",
          extensions: ["ma", "nb", "mb"]
        },
        "application/mathml+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["mathml"]
        },
        "application/mathml-content+xml": {
          source: "iana",
          compressible: !0
        },
        "application/mathml-presentation+xml": {
          source: "iana",
          compressible: !0
        },
        "application/mbms-associated-procedure-description+xml": {
          source: "iana",
          compressible: !0
        },
        "application/mbms-deregister+xml": {
          source: "iana",
          compressible: !0
        },
        "application/mbms-envelope+xml": {
          source: "iana",
          compressible: !0
        },
        "application/mbms-msk+xml": {
          source: "iana",
          compressible: !0
        },
        "application/mbms-msk-response+xml": {
          source: "iana",
          compressible: !0
        },
        "application/mbms-protection-description+xml": {
          source: "iana",
          compressible: !0
        },
        "application/mbms-reception-report+xml": {
          source: "iana",
          compressible: !0
        },
        "application/mbms-register+xml": {
          source: "iana",
          compressible: !0
        },
        "application/mbms-register-response+xml": {
          source: "iana",
          compressible: !0
        },
        "application/mbms-schedule+xml": {
          source: "iana",
          compressible: !0
        },
        "application/mbms-user-service-description+xml": {
          source: "iana",
          compressible: !0
        },
        "application/mbox": {
          source: "iana",
          extensions: ["mbox"]
        },
        "application/media-policy-dataset+xml": {
          source: "iana",
          compressible: !0
        },
        "application/media_control+xml": {
          source: "iana",
          compressible: !0
        },
        "application/mediaservercontrol+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["mscml"]
        },
        "application/merge-patch+json": {
          source: "iana",
          compressible: !0
        },
        "application/metalink+xml": {
          source: "apache",
          compressible: !0,
          extensions: ["metalink"]
        },
        "application/metalink4+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["meta4"]
        },
        "application/mets+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["mets"]
        },
        "application/mf4": {
          source: "iana"
        },
        "application/mikey": {
          source: "iana"
        },
        "application/mipc": {
          source: "iana"
        },
        "application/mmt-aei+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["maei"]
        },
        "application/mmt-usd+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["musd"]
        },
        "application/mods+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["mods"]
        },
        "application/moss-keys": {
          source: "iana"
        },
        "application/moss-signature": {
          source: "iana"
        },
        "application/mosskey-data": {
          source: "iana"
        },
        "application/mosskey-request": {
          source: "iana"
        },
        "application/mp21": {
          source: "iana",
          extensions: ["m21", "mp21"]
        },
        "application/mp4": {
          source: "iana",
          extensions: ["mp4s", "m4p"]
        },
        "application/mpeg4-generic": {
          source: "iana"
        },
        "application/mpeg4-iod": {
          source: "iana"
        },
        "application/mpeg4-iod-xmt": {
          source: "iana"
        },
        "application/mrb-consumer+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["xdf"]
        },
        "application/mrb-publish+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["xdf"]
        },
        "application/msc-ivr+xml": {
          source: "iana",
          charset: "UTF-8",
          compressible: !0
        },
        "application/msc-mixer+xml": {
          source: "iana",
          charset: "UTF-8",
          compressible: !0
        },
        "application/msword": {
          source: "iana",
          compressible: !1,
          extensions: ["doc", "dot"]
        },
        "application/mud+json": {
          source: "iana",
          compressible: !0
        },
        "application/multipart-core": {
          source: "iana"
        },
        "application/mxf": {
          source: "iana",
          extensions: ["mxf"]
        },
        "application/n-quads": {
          source: "iana",
          extensions: ["nq"]
        },
        "application/n-triples": {
          source: "iana",
          extensions: ["nt"]
        },
        "application/nasdata": {
          source: "iana"
        },
        "application/news-checkgroups": {
          source: "iana",
          charset: "US-ASCII"
        },
        "application/news-groupinfo": {
          source: "iana",
          charset: "US-ASCII"
        },
        "application/news-transmission": {
          source: "iana"
        },
        "application/nlsml+xml": {
          source: "iana",
          compressible: !0
        },
        "application/node": {
          source: "iana",
          extensions: ["cjs"]
        },
        "application/nss": {
          source: "iana"
        },
        "application/ocsp-request": {
          source: "iana"
        },
        "application/ocsp-response": {
          source: "iana"
        },
        "application/octet-stream": {
          source: "iana",
          compressible: !1,
          extensions: ["bin", "dms", "lrf", "mar", "so", "dist", "distz", "pkg", "bpk", "dump", "elc", "deploy", "exe", "dll", "deb", "dmg", "iso", "img", "msi", "msp", "msm", "buffer"]
        },
        "application/oda": {
          source: "iana",
          extensions: ["oda"]
        },
        "application/odm+xml": {
          source: "iana",
          compressible: !0
        },
        "application/odx": {
          source: "iana"
        },
        "application/oebps-package+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["opf"]
        },
        "application/ogg": {
          source: "iana",
          compressible: !1,
          extensions: ["ogx"]
        },
        "application/omdoc+xml": {
          source: "apache",
          compressible: !0,
          extensions: ["omdoc"]
        },
        "application/onenote": {
          source: "apache",
          extensions: ["onetoc", "onetoc2", "onetmp", "onepkg"]
        },
        "application/oscore": {
          source: "iana"
        },
        "application/oxps": {
          source: "iana",
          extensions: ["oxps"]
        },
        "application/p2p-overlay+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["relo"]
        },
        "application/parityfec": {
          source: "iana"
        },
        "application/passport": {
          source: "iana"
        },
        "application/patch-ops-error+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["xer"]
        },
        "application/pdf": {
          source: "iana",
          compressible: !1,
          extensions: ["pdf"]
        },
        "application/pdx": {
          source: "iana"
        },
        "application/pem-certificate-chain": {
          source: "iana"
        },
        "application/pgp-encrypted": {
          source: "iana",
          compressible: !1,
          extensions: ["pgp"]
        },
        "application/pgp-keys": {
          source: "iana"
        },
        "application/pgp-signature": {
          source: "iana",
          extensions: ["asc", "sig"]
        },
        "application/pics-rules": {
          source: "apache",
          extensions: ["prf"]
        },
        "application/pidf+xml": {
          source: "iana",
          charset: "UTF-8",
          compressible: !0
        },
        "application/pidf-diff+xml": {
          source: "iana",
          charset: "UTF-8",
          compressible: !0
        },
        "application/pkcs10": {
          source: "iana",
          extensions: ["p10"]
        },
        "application/pkcs12": {
          source: "iana"
        },
        "application/pkcs7-mime": {
          source: "iana",
          extensions: ["p7m", "p7c"]
        },
        "application/pkcs7-signature": {
          source: "iana",
          extensions: ["p7s"]
        },
        "application/pkcs8": {
          source: "iana",
          extensions: ["p8"]
        },
        "application/pkcs8-encrypted": {
          source: "iana"
        },
        "application/pkix-attr-cert": {
          source: "iana",
          extensions: ["ac"]
        },
        "application/pkix-cert": {
          source: "iana",
          extensions: ["cer"]
        },
        "application/pkix-crl": {
          source: "iana",
          extensions: ["crl"]
        },
        "application/pkix-pkipath": {
          source: "iana",
          extensions: ["pkipath"]
        },
        "application/pkixcmp": {
          source: "iana",
          extensions: ["pki"]
        },
        "application/pls+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["pls"]
        },
        "application/poc-settings+xml": {
          source: "iana",
          charset: "UTF-8",
          compressible: !0
        },
        "application/postscript": {
          source: "iana",
          compressible: !0,
          extensions: ["ai", "eps", "ps"]
        },
        "application/ppsp-tracker+json": {
          source: "iana",
          compressible: !0
        },
        "application/problem+json": {
          source: "iana",
          compressible: !0
        },
        "application/problem+xml": {
          source: "iana",
          compressible: !0
        },
        "application/provenance+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["provx"]
        },
        "application/prs.alvestrand.titrax-sheet": {
          source: "iana"
        },
        "application/prs.cww": {
          source: "iana",
          extensions: ["cww"]
        },
        "application/prs.hpub+zip": {
          source: "iana",
          compressible: !1
        },
        "application/prs.nprend": {
          source: "iana"
        },
        "application/prs.plucker": {
          source: "iana"
        },
        "application/prs.rdf-xml-crypt": {
          source: "iana"
        },
        "application/prs.xsf+xml": {
          source: "iana",
          compressible: !0
        },
        "application/pskc+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["pskcxml"]
        },
        "application/pvd+json": {
          source: "iana",
          compressible: !0
        },
        "application/qsig": {
          source: "iana"
        },
        "application/raml+yaml": {
          compressible: !0,
          extensions: ["raml"]
        },
        "application/raptorfec": {
          source: "iana"
        },
        "application/rdap+json": {
          source: "iana",
          compressible: !0
        },
        "application/rdf+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["rdf", "owl"]
        },
        "application/reginfo+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["rif"]
        },
        "application/relax-ng-compact-syntax": {
          source: "iana",
          extensions: ["rnc"]
        },
        "application/remote-printing": {
          source: "iana"
        },
        "application/reputon+json": {
          source: "iana",
          compressible: !0
        },
        "application/resource-lists+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["rl"]
        },
        "application/resource-lists-diff+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["rld"]
        },
        "application/rfc+xml": {
          source: "iana",
          compressible: !0
        },
        "application/riscos": {
          source: "iana"
        },
        "application/rlmi+xml": {
          source: "iana",
          compressible: !0
        },
        "application/rls-services+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["rs"]
        },
        "application/route-apd+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["rapd"]
        },
        "application/route-s-tsid+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["sls"]
        },
        "application/route-usd+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["rusd"]
        },
        "application/rpki-ghostbusters": {
          source: "iana",
          extensions: ["gbr"]
        },
        "application/rpki-manifest": {
          source: "iana",
          extensions: ["mft"]
        },
        "application/rpki-publication": {
          source: "iana"
        },
        "application/rpki-roa": {
          source: "iana",
          extensions: ["roa"]
        },
        "application/rpki-updown": {
          source: "iana"
        },
        "application/rsd+xml": {
          source: "apache",
          compressible: !0,
          extensions: ["rsd"]
        },
        "application/rss+xml": {
          source: "apache",
          compressible: !0,
          extensions: ["rss"]
        },
        "application/rtf": {
          source: "iana",
          compressible: !0,
          extensions: ["rtf"]
        },
        "application/rtploopback": {
          source: "iana"
        },
        "application/rtx": {
          source: "iana"
        },
        "application/samlassertion+xml": {
          source: "iana",
          compressible: !0
        },
        "application/samlmetadata+xml": {
          source: "iana",
          compressible: !0
        },
        "application/sbe": {
          source: "iana"
        },
        "application/sbml+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["sbml"]
        },
        "application/scaip+xml": {
          source: "iana",
          compressible: !0
        },
        "application/scim+json": {
          source: "iana",
          compressible: !0
        },
        "application/scvp-cv-request": {
          source: "iana",
          extensions: ["scq"]
        },
        "application/scvp-cv-response": {
          source: "iana",
          extensions: ["scs"]
        },
        "application/scvp-vp-request": {
          source: "iana",
          extensions: ["spq"]
        },
        "application/scvp-vp-response": {
          source: "iana",
          extensions: ["spp"]
        },
        "application/sdp": {
          source: "iana",
          extensions: ["sdp"]
        },
        "application/secevent+jwt": {
          source: "iana"
        },
        "application/senml+cbor": {
          source: "iana"
        },
        "application/senml+json": {
          source: "iana",
          compressible: !0
        },
        "application/senml+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["senmlx"]
        },
        "application/senml-etch+cbor": {
          source: "iana"
        },
        "application/senml-etch+json": {
          source: "iana",
          compressible: !0
        },
        "application/senml-exi": {
          source: "iana"
        },
        "application/sensml+cbor": {
          source: "iana"
        },
        "application/sensml+json": {
          source: "iana",
          compressible: !0
        },
        "application/sensml+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["sensmlx"]
        },
        "application/sensml-exi": {
          source: "iana"
        },
        "application/sep+xml": {
          source: "iana",
          compressible: !0
        },
        "application/sep-exi": {
          source: "iana"
        },
        "application/session-info": {
          source: "iana"
        },
        "application/set-payment": {
          source: "iana"
        },
        "application/set-payment-initiation": {
          source: "iana",
          extensions: ["setpay"]
        },
        "application/set-registration": {
          source: "iana"
        },
        "application/set-registration-initiation": {
          source: "iana",
          extensions: ["setreg"]
        },
        "application/sgml": {
          source: "iana"
        },
        "application/sgml-open-catalog": {
          source: "iana"
        },
        "application/shf+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["shf"]
        },
        "application/sieve": {
          source: "iana",
          extensions: ["siv", "sieve"]
        },
        "application/simple-filter+xml": {
          source: "iana",
          compressible: !0
        },
        "application/simple-message-summary": {
          source: "iana"
        },
        "application/simplesymbolcontainer": {
          source: "iana"
        },
        "application/sipc": {
          source: "iana"
        },
        "application/slate": {
          source: "iana"
        },
        "application/smil": {
          source: "iana"
        },
        "application/smil+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["smi", "smil"]
        },
        "application/smpte336m": {
          source: "iana"
        },
        "application/soap+fastinfoset": {
          source: "iana"
        },
        "application/soap+xml": {
          source: "iana",
          compressible: !0
        },
        "application/sparql-query": {
          source: "iana",
          extensions: ["rq"]
        },
        "application/sparql-results+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["srx"]
        },
        "application/spirits-event+xml": {
          source: "iana",
          compressible: !0
        },
        "application/sql": {
          source: "iana"
        },
        "application/srgs": {
          source: "iana",
          extensions: ["gram"]
        },
        "application/srgs+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["grxml"]
        },
        "application/sru+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["sru"]
        },
        "application/ssdl+xml": {
          source: "apache",
          compressible: !0,
          extensions: ["ssdl"]
        },
        "application/ssml+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["ssml"]
        },
        "application/stix+json": {
          source: "iana",
          compressible: !0
        },
        "application/swid+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["swidtag"]
        },
        "application/tamp-apex-update": {
          source: "iana"
        },
        "application/tamp-apex-update-confirm": {
          source: "iana"
        },
        "application/tamp-community-update": {
          source: "iana"
        },
        "application/tamp-community-update-confirm": {
          source: "iana"
        },
        "application/tamp-error": {
          source: "iana"
        },
        "application/tamp-sequence-adjust": {
          source: "iana"
        },
        "application/tamp-sequence-adjust-confirm": {
          source: "iana"
        },
        "application/tamp-status-query": {
          source: "iana"
        },
        "application/tamp-status-response": {
          source: "iana"
        },
        "application/tamp-update": {
          source: "iana"
        },
        "application/tamp-update-confirm": {
          source: "iana"
        },
        "application/tar": {
          compressible: !0
        },
        "application/taxii+json": {
          source: "iana",
          compressible: !0
        },
        "application/td+json": {
          source: "iana",
          compressible: !0
        },
        "application/tei+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["tei", "teicorpus"]
        },
        "application/tetra_isi": {
          source: "iana"
        },
        "application/thraud+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["tfi"]
        },
        "application/timestamp-query": {
          source: "iana"
        },
        "application/timestamp-reply": {
          source: "iana"
        },
        "application/timestamped-data": {
          source: "iana",
          extensions: ["tsd"]
        },
        "application/tlsrpt+gzip": {
          source: "iana"
        },
        "application/tlsrpt+json": {
          source: "iana",
          compressible: !0
        },
        "application/tnauthlist": {
          source: "iana"
        },
        "application/toml": {
          compressible: !0,
          extensions: ["toml"]
        },
        "application/trickle-ice-sdpfrag": {
          source: "iana"
        },
        "application/trig": {
          source: "iana"
        },
        "application/ttml+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["ttml"]
        },
        "application/tve-trigger": {
          source: "iana"
        },
        "application/tzif": {
          source: "iana"
        },
        "application/tzif-leap": {
          source: "iana"
        },
        "application/ulpfec": {
          source: "iana"
        },
        "application/urc-grpsheet+xml": {
          source: "iana",
          compressible: !0
        },
        "application/urc-ressheet+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["rsheet"]
        },
        "application/urc-targetdesc+xml": {
          source: "iana",
          compressible: !0
        },
        "application/urc-uisocketdesc+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vcard+json": {
          source: "iana",
          compressible: !0
        },
        "application/vcard+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vemmi": {
          source: "iana"
        },
        "application/vividence.scriptfile": {
          source: "apache"
        },
        "application/vnd.1000minds.decision-model+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["1km"]
        },
        "application/vnd.3gpp-prose+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.3gpp-prose-pc3ch+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.3gpp-v2x-local-service-information": {
          source: "iana"
        },
        "application/vnd.3gpp.access-transfer-events+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.3gpp.bsf+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.3gpp.gmop+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.3gpp.mc-signalling-ear": {
          source: "iana"
        },
        "application/vnd.3gpp.mcdata-affiliation-command+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.3gpp.mcdata-info+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.3gpp.mcdata-payload": {
          source: "iana"
        },
        "application/vnd.3gpp.mcdata-service-config+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.3gpp.mcdata-signalling": {
          source: "iana"
        },
        "application/vnd.3gpp.mcdata-ue-config+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.3gpp.mcdata-user-profile+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.3gpp.mcptt-affiliation-command+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.3gpp.mcptt-floor-request+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.3gpp.mcptt-info+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.3gpp.mcptt-location-info+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.3gpp.mcptt-mbms-usage-info+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.3gpp.mcptt-service-config+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.3gpp.mcptt-signed+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.3gpp.mcptt-ue-config+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.3gpp.mcptt-ue-init-config+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.3gpp.mcptt-user-profile+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.3gpp.mcvideo-affiliation-command+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.3gpp.mcvideo-affiliation-info+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.3gpp.mcvideo-info+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.3gpp.mcvideo-location-info+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.3gpp.mcvideo-mbms-usage-info+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.3gpp.mcvideo-service-config+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.3gpp.mcvideo-transmission-request+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.3gpp.mcvideo-ue-config+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.3gpp.mcvideo-user-profile+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.3gpp.mid-call+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.3gpp.pic-bw-large": {
          source: "iana",
          extensions: ["plb"]
        },
        "application/vnd.3gpp.pic-bw-small": {
          source: "iana",
          extensions: ["psb"]
        },
        "application/vnd.3gpp.pic-bw-var": {
          source: "iana",
          extensions: ["pvb"]
        },
        "application/vnd.3gpp.sms": {
          source: "iana"
        },
        "application/vnd.3gpp.sms+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.3gpp.srvcc-ext+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.3gpp.srvcc-info+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.3gpp.state-and-event-info+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.3gpp.ussd+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.3gpp2.bcmcsinfo+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.3gpp2.sms": {
          source: "iana"
        },
        "application/vnd.3gpp2.tcap": {
          source: "iana",
          extensions: ["tcap"]
        },
        "application/vnd.3lightssoftware.imagescal": {
          source: "iana"
        },
        "application/vnd.3m.post-it-notes": {
          source: "iana",
          extensions: ["pwn"]
        },
        "application/vnd.accpac.simply.aso": {
          source: "iana",
          extensions: ["aso"]
        },
        "application/vnd.accpac.simply.imp": {
          source: "iana",
          extensions: ["imp"]
        },
        "application/vnd.acucobol": {
          source: "iana",
          extensions: ["acu"]
        },
        "application/vnd.acucorp": {
          source: "iana",
          extensions: ["atc", "acutc"]
        },
        "application/vnd.adobe.air-application-installer-package+zip": {
          source: "apache",
          compressible: !1,
          extensions: ["air"]
        },
        "application/vnd.adobe.flash.movie": {
          source: "iana"
        },
        "application/vnd.adobe.formscentral.fcdt": {
          source: "iana",
          extensions: ["fcdt"]
        },
        "application/vnd.adobe.fxp": {
          source: "iana",
          extensions: ["fxp", "fxpl"]
        },
        "application/vnd.adobe.partial-upload": {
          source: "iana"
        },
        "application/vnd.adobe.xdp+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["xdp"]
        },
        "application/vnd.adobe.xfdf": {
          source: "iana",
          extensions: ["xfdf"]
        },
        "application/vnd.aether.imp": {
          source: "iana"
        },
        "application/vnd.afpc.afplinedata": {
          source: "iana"
        },
        "application/vnd.afpc.afplinedata-pagedef": {
          source: "iana"
        },
        "application/vnd.afpc.foca-charset": {
          source: "iana"
        },
        "application/vnd.afpc.foca-codedfont": {
          source: "iana"
        },
        "application/vnd.afpc.foca-codepage": {
          source: "iana"
        },
        "application/vnd.afpc.modca": {
          source: "iana"
        },
        "application/vnd.afpc.modca-formdef": {
          source: "iana"
        },
        "application/vnd.afpc.modca-mediummap": {
          source: "iana"
        },
        "application/vnd.afpc.modca-objectcontainer": {
          source: "iana"
        },
        "application/vnd.afpc.modca-overlay": {
          source: "iana"
        },
        "application/vnd.afpc.modca-pagesegment": {
          source: "iana"
        },
        "application/vnd.ah-barcode": {
          source: "iana"
        },
        "application/vnd.ahead.space": {
          source: "iana",
          extensions: ["ahead"]
        },
        "application/vnd.airzip.filesecure.azf": {
          source: "iana",
          extensions: ["azf"]
        },
        "application/vnd.airzip.filesecure.azs": {
          source: "iana",
          extensions: ["azs"]
        },
        "application/vnd.amadeus+json": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.amazon.ebook": {
          source: "apache",
          extensions: ["azw"]
        },
        "application/vnd.amazon.mobi8-ebook": {
          source: "iana"
        },
        "application/vnd.americandynamics.acc": {
          source: "iana",
          extensions: ["acc"]
        },
        "application/vnd.amiga.ami": {
          source: "iana",
          extensions: ["ami"]
        },
        "application/vnd.amundsen.maze+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.android.ota": {
          source: "iana"
        },
        "application/vnd.android.package-archive": {
          source: "apache",
          compressible: !1,
          extensions: ["apk"]
        },
        "application/vnd.anki": {
          source: "iana"
        },
        "application/vnd.anser-web-certificate-issue-initiation": {
          source: "iana",
          extensions: ["cii"]
        },
        "application/vnd.anser-web-funds-transfer-initiation": {
          source: "apache",
          extensions: ["fti"]
        },
        "application/vnd.antix.game-component": {
          source: "iana",
          extensions: ["atx"]
        },
        "application/vnd.apache.thrift.binary": {
          source: "iana"
        },
        "application/vnd.apache.thrift.compact": {
          source: "iana"
        },
        "application/vnd.apache.thrift.json": {
          source: "iana"
        },
        "application/vnd.api+json": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.aplextor.warrp+json": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.apothekende.reservation+json": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.apple.installer+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["mpkg"]
        },
        "application/vnd.apple.keynote": {
          source: "iana",
          extensions: ["keynote"]
        },
        "application/vnd.apple.mpegurl": {
          source: "iana",
          extensions: ["m3u8"]
        },
        "application/vnd.apple.numbers": {
          source: "iana",
          extensions: ["numbers"]
        },
        "application/vnd.apple.pages": {
          source: "iana",
          extensions: ["pages"]
        },
        "application/vnd.apple.pkpass": {
          compressible: !1,
          extensions: ["pkpass"]
        },
        "application/vnd.arastra.swi": {
          source: "iana"
        },
        "application/vnd.aristanetworks.swi": {
          source: "iana",
          extensions: ["swi"]
        },
        "application/vnd.artisan+json": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.artsquare": {
          source: "iana"
        },
        "application/vnd.astraea-software.iota": {
          source: "iana",
          extensions: ["iota"]
        },
        "application/vnd.audiograph": {
          source: "iana",
          extensions: ["aep"]
        },
        "application/vnd.autopackage": {
          source: "iana"
        },
        "application/vnd.avalon+json": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.avistar+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.balsamiq.bmml+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["bmml"]
        },
        "application/vnd.balsamiq.bmpr": {
          source: "iana"
        },
        "application/vnd.banana-accounting": {
          source: "iana"
        },
        "application/vnd.bbf.usp.error": {
          source: "iana"
        },
        "application/vnd.bbf.usp.msg": {
          source: "iana"
        },
        "application/vnd.bbf.usp.msg+json": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.bekitzur-stech+json": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.bint.med-content": {
          source: "iana"
        },
        "application/vnd.biopax.rdf+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.blink-idb-value-wrapper": {
          source: "iana"
        },
        "application/vnd.blueice.multipass": {
          source: "iana",
          extensions: ["mpm"]
        },
        "application/vnd.bluetooth.ep.oob": {
          source: "iana"
        },
        "application/vnd.bluetooth.le.oob": {
          source: "iana"
        },
        "application/vnd.bmi": {
          source: "iana",
          extensions: ["bmi"]
        },
        "application/vnd.bpf": {
          source: "iana"
        },
        "application/vnd.bpf3": {
          source: "iana"
        },
        "application/vnd.businessobjects": {
          source: "iana",
          extensions: ["rep"]
        },
        "application/vnd.byu.uapi+json": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.cab-jscript": {
          source: "iana"
        },
        "application/vnd.canon-cpdl": {
          source: "iana"
        },
        "application/vnd.canon-lips": {
          source: "iana"
        },
        "application/vnd.capasystems-pg+json": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.cendio.thinlinc.clientconf": {
          source: "iana"
        },
        "application/vnd.century-systems.tcp_stream": {
          source: "iana"
        },
        "application/vnd.chemdraw+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["cdxml"]
        },
        "application/vnd.chess-pgn": {
          source: "iana"
        },
        "application/vnd.chipnuts.karaoke-mmd": {
          source: "iana",
          extensions: ["mmd"]
        },
        "application/vnd.ciedi": {
          source: "iana"
        },
        "application/vnd.cinderella": {
          source: "iana",
          extensions: ["cdy"]
        },
        "application/vnd.cirpack.isdn-ext": {
          source: "iana"
        },
        "application/vnd.citationstyles.style+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["csl"]
        },
        "application/vnd.claymore": {
          source: "iana",
          extensions: ["cla"]
        },
        "application/vnd.cloanto.rp9": {
          source: "iana",
          extensions: ["rp9"]
        },
        "application/vnd.clonk.c4group": {
          source: "iana",
          extensions: ["c4g", "c4d", "c4f", "c4p", "c4u"]
        },
        "application/vnd.cluetrust.cartomobile-config": {
          source: "iana",
          extensions: ["c11amc"]
        },
        "application/vnd.cluetrust.cartomobile-config-pkg": {
          source: "iana",
          extensions: ["c11amz"]
        },
        "application/vnd.coffeescript": {
          source: "iana"
        },
        "application/vnd.collabio.xodocuments.document": {
          source: "iana"
        },
        "application/vnd.collabio.xodocuments.document-template": {
          source: "iana"
        },
        "application/vnd.collabio.xodocuments.presentation": {
          source: "iana"
        },
        "application/vnd.collabio.xodocuments.presentation-template": {
          source: "iana"
        },
        "application/vnd.collabio.xodocuments.spreadsheet": {
          source: "iana"
        },
        "application/vnd.collabio.xodocuments.spreadsheet-template": {
          source: "iana"
        },
        "application/vnd.collection+json": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.collection.doc+json": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.collection.next+json": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.comicbook+zip": {
          source: "iana",
          compressible: !1
        },
        "application/vnd.comicbook-rar": {
          source: "iana"
        },
        "application/vnd.commerce-battelle": {
          source: "iana"
        },
        "application/vnd.commonspace": {
          source: "iana",
          extensions: ["csp"]
        },
        "application/vnd.contact.cmsg": {
          source: "iana",
          extensions: ["cdbcmsg"]
        },
        "application/vnd.coreos.ignition+json": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.cosmocaller": {
          source: "iana",
          extensions: ["cmc"]
        },
        "application/vnd.crick.clicker": {
          source: "iana",
          extensions: ["clkx"]
        },
        "application/vnd.crick.clicker.keyboard": {
          source: "iana",
          extensions: ["clkk"]
        },
        "application/vnd.crick.clicker.palette": {
          source: "iana",
          extensions: ["clkp"]
        },
        "application/vnd.crick.clicker.template": {
          source: "iana",
          extensions: ["clkt"]
        },
        "application/vnd.crick.clicker.wordbank": {
          source: "iana",
          extensions: ["clkw"]
        },
        "application/vnd.criticaltools.wbs+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["wbs"]
        },
        "application/vnd.cryptii.pipe+json": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.crypto-shade-file": {
          source: "iana"
        },
        "application/vnd.ctc-posml": {
          source: "iana",
          extensions: ["pml"]
        },
        "application/vnd.ctct.ws+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.cups-pdf": {
          source: "iana"
        },
        "application/vnd.cups-postscript": {
          source: "iana"
        },
        "application/vnd.cups-ppd": {
          source: "iana",
          extensions: ["ppd"]
        },
        "application/vnd.cups-raster": {
          source: "iana"
        },
        "application/vnd.cups-raw": {
          source: "iana"
        },
        "application/vnd.curl": {
          source: "iana"
        },
        "application/vnd.curl.car": {
          source: "apache",
          extensions: ["car"]
        },
        "application/vnd.curl.pcurl": {
          source: "apache",
          extensions: ["pcurl"]
        },
        "application/vnd.cyan.dean.root+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.cybank": {
          source: "iana"
        },
        "application/vnd.d2l.coursepackage1p0+zip": {
          source: "iana",
          compressible: !1
        },
        "application/vnd.dart": {
          source: "iana",
          compressible: !0,
          extensions: ["dart"]
        },
        "application/vnd.data-vision.rdz": {
          source: "iana",
          extensions: ["rdz"]
        },
        "application/vnd.datapackage+json": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.dataresource+json": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.dbf": {
          source: "iana"
        },
        "application/vnd.debian.binary-package": {
          source: "iana"
        },
        "application/vnd.dece.data": {
          source: "iana",
          extensions: ["uvf", "uvvf", "uvd", "uvvd"]
        },
        "application/vnd.dece.ttml+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["uvt", "uvvt"]
        },
        "application/vnd.dece.unspecified": {
          source: "iana",
          extensions: ["uvx", "uvvx"]
        },
        "application/vnd.dece.zip": {
          source: "iana",
          extensions: ["uvz", "uvvz"]
        },
        "application/vnd.denovo.fcselayout-link": {
          source: "iana",
          extensions: ["fe_launch"]
        },
        "application/vnd.desmume.movie": {
          source: "iana"
        },
        "application/vnd.dir-bi.plate-dl-nosuffix": {
          source: "iana"
        },
        "application/vnd.dm.delegation+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.dna": {
          source: "iana",
          extensions: ["dna"]
        },
        "application/vnd.document+json": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.dolby.mlp": {
          source: "apache",
          extensions: ["mlp"]
        },
        "application/vnd.dolby.mobile.1": {
          source: "iana"
        },
        "application/vnd.dolby.mobile.2": {
          source: "iana"
        },
        "application/vnd.doremir.scorecloud-binary-document": {
          source: "iana"
        },
        "application/vnd.dpgraph": {
          source: "iana",
          extensions: ["dpg"]
        },
        "application/vnd.dreamfactory": {
          source: "iana",
          extensions: ["dfac"]
        },
        "application/vnd.drive+json": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.ds-keypoint": {
          source: "apache",
          extensions: ["kpxx"]
        },
        "application/vnd.dtg.local": {
          source: "iana"
        },
        "application/vnd.dtg.local.flash": {
          source: "iana"
        },
        "application/vnd.dtg.local.html": {
          source: "iana"
        },
        "application/vnd.dvb.ait": {
          source: "iana",
          extensions: ["ait"]
        },
        "application/vnd.dvb.dvbisl+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.dvb.dvbj": {
          source: "iana"
        },
        "application/vnd.dvb.esgcontainer": {
          source: "iana"
        },
        "application/vnd.dvb.ipdcdftnotifaccess": {
          source: "iana"
        },
        "application/vnd.dvb.ipdcesgaccess": {
          source: "iana"
        },
        "application/vnd.dvb.ipdcesgaccess2": {
          source: "iana"
        },
        "application/vnd.dvb.ipdcesgpdd": {
          source: "iana"
        },
        "application/vnd.dvb.ipdcroaming": {
          source: "iana"
        },
        "application/vnd.dvb.iptv.alfec-base": {
          source: "iana"
        },
        "application/vnd.dvb.iptv.alfec-enhancement": {
          source: "iana"
        },
        "application/vnd.dvb.notif-aggregate-root+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.dvb.notif-container+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.dvb.notif-generic+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.dvb.notif-ia-msglist+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.dvb.notif-ia-registration-request+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.dvb.notif-ia-registration-response+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.dvb.notif-init+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.dvb.pfr": {
          source: "iana"
        },
        "application/vnd.dvb.service": {
          source: "iana",
          extensions: ["svc"]
        },
        "application/vnd.dxr": {
          source: "iana"
        },
        "application/vnd.dynageo": {
          source: "iana",
          extensions: ["geo"]
        },
        "application/vnd.dzr": {
          source: "iana"
        },
        "application/vnd.easykaraoke.cdgdownload": {
          source: "iana"
        },
        "application/vnd.ecdis-update": {
          source: "iana"
        },
        "application/vnd.ecip.rlp": {
          source: "iana"
        },
        "application/vnd.ecowin.chart": {
          source: "iana",
          extensions: ["mag"]
        },
        "application/vnd.ecowin.filerequest": {
          source: "iana"
        },
        "application/vnd.ecowin.fileupdate": {
          source: "iana"
        },
        "application/vnd.ecowin.series": {
          source: "iana"
        },
        "application/vnd.ecowin.seriesrequest": {
          source: "iana"
        },
        "application/vnd.ecowin.seriesupdate": {
          source: "iana"
        },
        "application/vnd.efi.img": {
          source: "iana"
        },
        "application/vnd.efi.iso": {
          source: "iana"
        },
        "application/vnd.emclient.accessrequest+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.enliven": {
          source: "iana",
          extensions: ["nml"]
        },
        "application/vnd.enphase.envoy": {
          source: "iana"
        },
        "application/vnd.eprints.data+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.epson.esf": {
          source: "iana",
          extensions: ["esf"]
        },
        "application/vnd.epson.msf": {
          source: "iana",
          extensions: ["msf"]
        },
        "application/vnd.epson.quickanime": {
          source: "iana",
          extensions: ["qam"]
        },
        "application/vnd.epson.salt": {
          source: "iana",
          extensions: ["slt"]
        },
        "application/vnd.epson.ssf": {
          source: "iana",
          extensions: ["ssf"]
        },
        "application/vnd.ericsson.quickcall": {
          source: "iana"
        },
        "application/vnd.espass-espass+zip": {
          source: "iana",
          compressible: !1
        },
        "application/vnd.eszigno3+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["es3", "et3"]
        },
        "application/vnd.etsi.aoc+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.etsi.asic-e+zip": {
          source: "iana",
          compressible: !1
        },
        "application/vnd.etsi.asic-s+zip": {
          source: "iana",
          compressible: !1
        },
        "application/vnd.etsi.cug+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.etsi.iptvcommand+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.etsi.iptvdiscovery+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.etsi.iptvprofile+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.etsi.iptvsad-bc+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.etsi.iptvsad-cod+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.etsi.iptvsad-npvr+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.etsi.iptvservice+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.etsi.iptvsync+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.etsi.iptvueprofile+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.etsi.mcid+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.etsi.mheg5": {
          source: "iana"
        },
        "application/vnd.etsi.overload-control-policy-dataset+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.etsi.pstn+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.etsi.sci+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.etsi.simservs+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.etsi.timestamp-token": {
          source: "iana"
        },
        "application/vnd.etsi.tsl+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.etsi.tsl.der": {
          source: "iana"
        },
        "application/vnd.eudora.data": {
          source: "iana"
        },
        "application/vnd.evolv.ecig.profile": {
          source: "iana"
        },
        "application/vnd.evolv.ecig.settings": {
          source: "iana"
        },
        "application/vnd.evolv.ecig.theme": {
          source: "iana"
        },
        "application/vnd.exstream-empower+zip": {
          source: "iana",
          compressible: !1
        },
        "application/vnd.exstream-package": {
          source: "iana"
        },
        "application/vnd.ezpix-album": {
          source: "iana",
          extensions: ["ez2"]
        },
        "application/vnd.ezpix-package": {
          source: "iana",
          extensions: ["ez3"]
        },
        "application/vnd.f-secure.mobile": {
          source: "iana"
        },
        "application/vnd.fastcopy-disk-image": {
          source: "iana"
        },
        "application/vnd.fdf": {
          source: "iana",
          extensions: ["fdf"]
        },
        "application/vnd.fdsn.mseed": {
          source: "iana",
          extensions: ["mseed"]
        },
        "application/vnd.fdsn.seed": {
          source: "iana",
          extensions: ["seed", "dataless"]
        },
        "application/vnd.ffsns": {
          source: "iana"
        },
        "application/vnd.ficlab.flb+zip": {
          source: "iana",
          compressible: !1
        },
        "application/vnd.filmit.zfc": {
          source: "iana"
        },
        "application/vnd.fints": {
          source: "iana"
        },
        "application/vnd.firemonkeys.cloudcell": {
          source: "iana"
        },
        "application/vnd.flographit": {
          source: "iana",
          extensions: ["gph"]
        },
        "application/vnd.fluxtime.clip": {
          source: "iana",
          extensions: ["ftc"]
        },
        "application/vnd.font-fontforge-sfd": {
          source: "iana"
        },
        "application/vnd.framemaker": {
          source: "iana",
          extensions: ["fm", "frame", "maker", "book"]
        },
        "application/vnd.frogans.fnc": {
          source: "iana",
          extensions: ["fnc"]
        },
        "application/vnd.frogans.ltf": {
          source: "iana",
          extensions: ["ltf"]
        },
        "application/vnd.fsc.weblaunch": {
          source: "iana",
          extensions: ["fsc"]
        },
        "application/vnd.fujitsu.oasys": {
          source: "iana",
          extensions: ["oas"]
        },
        "application/vnd.fujitsu.oasys2": {
          source: "iana",
          extensions: ["oa2"]
        },
        "application/vnd.fujitsu.oasys3": {
          source: "iana",
          extensions: ["oa3"]
        },
        "application/vnd.fujitsu.oasysgp": {
          source: "iana",
          extensions: ["fg5"]
        },
        "application/vnd.fujitsu.oasysprs": {
          source: "iana",
          extensions: ["bh2"]
        },
        "application/vnd.fujixerox.art-ex": {
          source: "iana"
        },
        "application/vnd.fujixerox.art4": {
          source: "iana"
        },
        "application/vnd.fujixerox.ddd": {
          source: "iana",
          extensions: ["ddd"]
        },
        "application/vnd.fujixerox.docuworks": {
          source: "iana",
          extensions: ["xdw"]
        },
        "application/vnd.fujixerox.docuworks.binder": {
          source: "iana",
          extensions: ["xbd"]
        },
        "application/vnd.fujixerox.docuworks.container": {
          source: "iana"
        },
        "application/vnd.fujixerox.hbpl": {
          source: "iana"
        },
        "application/vnd.fut-misnet": {
          source: "iana"
        },
        "application/vnd.futoin+cbor": {
          source: "iana"
        },
        "application/vnd.futoin+json": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.fuzzysheet": {
          source: "iana",
          extensions: ["fzs"]
        },
        "application/vnd.genomatix.tuxedo": {
          source: "iana",
          extensions: ["txd"]
        },
        "application/vnd.gentics.grd+json": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.geo+json": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.geocube+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.geogebra.file": {
          source: "iana",
          extensions: ["ggb"]
        },
        "application/vnd.geogebra.tool": {
          source: "iana",
          extensions: ["ggt"]
        },
        "application/vnd.geometry-explorer": {
          source: "iana",
          extensions: ["gex", "gre"]
        },
        "application/vnd.geonext": {
          source: "iana",
          extensions: ["gxt"]
        },
        "application/vnd.geoplan": {
          source: "iana",
          extensions: ["g2w"]
        },
        "application/vnd.geospace": {
          source: "iana",
          extensions: ["g3w"]
        },
        "application/vnd.gerber": {
          source: "iana"
        },
        "application/vnd.globalplatform.card-content-mgt": {
          source: "iana"
        },
        "application/vnd.globalplatform.card-content-mgt-response": {
          source: "iana"
        },
        "application/vnd.gmx": {
          source: "iana",
          extensions: ["gmx"]
        },
        "application/vnd.google-apps.document": {
          compressible: !1,
          extensions: ["gdoc"]
        },
        "application/vnd.google-apps.presentation": {
          compressible: !1,
          extensions: ["gslides"]
        },
        "application/vnd.google-apps.spreadsheet": {
          compressible: !1,
          extensions: ["gsheet"]
        },
        "application/vnd.google-earth.kml+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["kml"]
        },
        "application/vnd.google-earth.kmz": {
          source: "iana",
          compressible: !1,
          extensions: ["kmz"]
        },
        "application/vnd.gov.sk.e-form+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.gov.sk.e-form+zip": {
          source: "iana",
          compressible: !1
        },
        "application/vnd.gov.sk.xmldatacontainer+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.grafeq": {
          source: "iana",
          extensions: ["gqf", "gqs"]
        },
        "application/vnd.gridmp": {
          source: "iana"
        },
        "application/vnd.groove-account": {
          source: "iana",
          extensions: ["gac"]
        },
        "application/vnd.groove-help": {
          source: "iana",
          extensions: ["ghf"]
        },
        "application/vnd.groove-identity-message": {
          source: "iana",
          extensions: ["gim"]
        },
        "application/vnd.groove-injector": {
          source: "iana",
          extensions: ["grv"]
        },
        "application/vnd.groove-tool-message": {
          source: "iana",
          extensions: ["gtm"]
        },
        "application/vnd.groove-tool-template": {
          source: "iana",
          extensions: ["tpl"]
        },
        "application/vnd.groove-vcard": {
          source: "iana",
          extensions: ["vcg"]
        },
        "application/vnd.hal+json": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.hal+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["hal"]
        },
        "application/vnd.handheld-entertainment+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["zmm"]
        },
        "application/vnd.hbci": {
          source: "iana",
          extensions: ["hbci"]
        },
        "application/vnd.hc+json": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.hcl-bireports": {
          source: "iana"
        },
        "application/vnd.hdt": {
          source: "iana"
        },
        "application/vnd.heroku+json": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.hhe.lesson-player": {
          source: "iana",
          extensions: ["les"]
        },
        "application/vnd.hp-hpgl": {
          source: "iana",
          extensions: ["hpgl"]
        },
        "application/vnd.hp-hpid": {
          source: "iana",
          extensions: ["hpid"]
        },
        "application/vnd.hp-hps": {
          source: "iana",
          extensions: ["hps"]
        },
        "application/vnd.hp-jlyt": {
          source: "iana",
          extensions: ["jlt"]
        },
        "application/vnd.hp-pcl": {
          source: "iana",
          extensions: ["pcl"]
        },
        "application/vnd.hp-pclxl": {
          source: "iana",
          extensions: ["pclxl"]
        },
        "application/vnd.httphone": {
          source: "iana"
        },
        "application/vnd.hydrostatix.sof-data": {
          source: "iana",
          extensions: ["sfd-hdstx"]
        },
        "application/vnd.hyper+json": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.hyper-item+json": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.hyperdrive+json": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.hzn-3d-crossword": {
          source: "iana"
        },
        "application/vnd.ibm.afplinedata": {
          source: "iana"
        },
        "application/vnd.ibm.electronic-media": {
          source: "iana"
        },
        "application/vnd.ibm.minipay": {
          source: "iana",
          extensions: ["mpy"]
        },
        "application/vnd.ibm.modcap": {
          source: "iana",
          extensions: ["afp", "listafp", "list3820"]
        },
        "application/vnd.ibm.rights-management": {
          source: "iana",
          extensions: ["irm"]
        },
        "application/vnd.ibm.secure-container": {
          source: "iana",
          extensions: ["sc"]
        },
        "application/vnd.iccprofile": {
          source: "iana",
          extensions: ["icc", "icm"]
        },
        "application/vnd.ieee.1905": {
          source: "iana"
        },
        "application/vnd.igloader": {
          source: "iana",
          extensions: ["igl"]
        },
        "application/vnd.imagemeter.folder+zip": {
          source: "iana",
          compressible: !1
        },
        "application/vnd.imagemeter.image+zip": {
          source: "iana",
          compressible: !1
        },
        "application/vnd.immervision-ivp": {
          source: "iana",
          extensions: ["ivp"]
        },
        "application/vnd.immervision-ivu": {
          source: "iana",
          extensions: ["ivu"]
        },
        "application/vnd.ims.imsccv1p1": {
          source: "iana"
        },
        "application/vnd.ims.imsccv1p2": {
          source: "iana"
        },
        "application/vnd.ims.imsccv1p3": {
          source: "iana"
        },
        "application/vnd.ims.lis.v2.result+json": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.ims.lti.v2.toolconsumerprofile+json": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.ims.lti.v2.toolproxy+json": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.ims.lti.v2.toolproxy.id+json": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.ims.lti.v2.toolsettings+json": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.ims.lti.v2.toolsettings.simple+json": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.informedcontrol.rms+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.informix-visionary": {
          source: "iana"
        },
        "application/vnd.infotech.project": {
          source: "iana"
        },
        "application/vnd.infotech.project+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.innopath.wamp.notification": {
          source: "iana"
        },
        "application/vnd.insors.igm": {
          source: "iana",
          extensions: ["igm"]
        },
        "application/vnd.intercon.formnet": {
          source: "iana",
          extensions: ["xpw", "xpx"]
        },
        "application/vnd.intergeo": {
          source: "iana",
          extensions: ["i2g"]
        },
        "application/vnd.intertrust.digibox": {
          source: "iana"
        },
        "application/vnd.intertrust.nncp": {
          source: "iana"
        },
        "application/vnd.intu.qbo": {
          source: "iana",
          extensions: ["qbo"]
        },
        "application/vnd.intu.qfx": {
          source: "iana",
          extensions: ["qfx"]
        },
        "application/vnd.iptc.g2.catalogitem+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.iptc.g2.conceptitem+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.iptc.g2.knowledgeitem+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.iptc.g2.newsitem+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.iptc.g2.newsmessage+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.iptc.g2.packageitem+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.iptc.g2.planningitem+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.ipunplugged.rcprofile": {
          source: "iana",
          extensions: ["rcprofile"]
        },
        "application/vnd.irepository.package+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["irp"]
        },
        "application/vnd.is-xpr": {
          source: "iana",
          extensions: ["xpr"]
        },
        "application/vnd.isac.fcs": {
          source: "iana",
          extensions: ["fcs"]
        },
        "application/vnd.iso11783-10+zip": {
          source: "iana",
          compressible: !1
        },
        "application/vnd.jam": {
          source: "iana",
          extensions: ["jam"]
        },
        "application/vnd.japannet-directory-service": {
          source: "iana"
        },
        "application/vnd.japannet-jpnstore-wakeup": {
          source: "iana"
        },
        "application/vnd.japannet-payment-wakeup": {
          source: "iana"
        },
        "application/vnd.japannet-registration": {
          source: "iana"
        },
        "application/vnd.japannet-registration-wakeup": {
          source: "iana"
        },
        "application/vnd.japannet-setstore-wakeup": {
          source: "iana"
        },
        "application/vnd.japannet-verification": {
          source: "iana"
        },
        "application/vnd.japannet-verification-wakeup": {
          source: "iana"
        },
        "application/vnd.jcp.javame.midlet-rms": {
          source: "iana",
          extensions: ["rms"]
        },
        "application/vnd.jisp": {
          source: "iana",
          extensions: ["jisp"]
        },
        "application/vnd.joost.joda-archive": {
          source: "iana",
          extensions: ["joda"]
        },
        "application/vnd.jsk.isdn-ngn": {
          source: "iana"
        },
        "application/vnd.kahootz": {
          source: "iana",
          extensions: ["ktz", "ktr"]
        },
        "application/vnd.kde.karbon": {
          source: "iana",
          extensions: ["karbon"]
        },
        "application/vnd.kde.kchart": {
          source: "iana",
          extensions: ["chrt"]
        },
        "application/vnd.kde.kformula": {
          source: "iana",
          extensions: ["kfo"]
        },
        "application/vnd.kde.kivio": {
          source: "iana",
          extensions: ["flw"]
        },
        "application/vnd.kde.kontour": {
          source: "iana",
          extensions: ["kon"]
        },
        "application/vnd.kde.kpresenter": {
          source: "iana",
          extensions: ["kpr", "kpt"]
        },
        "application/vnd.kde.kspread": {
          source: "iana",
          extensions: ["ksp"]
        },
        "application/vnd.kde.kword": {
          source: "iana",
          extensions: ["kwd", "kwt"]
        },
        "application/vnd.kenameaapp": {
          source: "iana",
          extensions: ["htke"]
        },
        "application/vnd.kidspiration": {
          source: "iana",
          extensions: ["kia"]
        },
        "application/vnd.kinar": {
          source: "iana",
          extensions: ["kne", "knp"]
        },
        "application/vnd.koan": {
          source: "iana",
          extensions: ["skp", "skd", "skt", "skm"]
        },
        "application/vnd.kodak-descriptor": {
          source: "iana",
          extensions: ["sse"]
        },
        "application/vnd.las": {
          source: "iana"
        },
        "application/vnd.las.las+json": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.las.las+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["lasxml"]
        },
        "application/vnd.laszip": {
          source: "iana"
        },
        "application/vnd.leap+json": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.liberty-request+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.llamagraphics.life-balance.desktop": {
          source: "iana",
          extensions: ["lbd"]
        },
        "application/vnd.llamagraphics.life-balance.exchange+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["lbe"]
        },
        "application/vnd.logipipe.circuit+zip": {
          source: "iana",
          compressible: !1
        },
        "application/vnd.loom": {
          source: "iana"
        },
        "application/vnd.lotus-1-2-3": {
          source: "iana",
          extensions: ["123"]
        },
        "application/vnd.lotus-approach": {
          source: "iana",
          extensions: ["apr"]
        },
        "application/vnd.lotus-freelance": {
          source: "iana",
          extensions: ["pre"]
        },
        "application/vnd.lotus-notes": {
          source: "iana",
          extensions: ["nsf"]
        },
        "application/vnd.lotus-organizer": {
          source: "iana",
          extensions: ["org"]
        },
        "application/vnd.lotus-screencam": {
          source: "iana",
          extensions: ["scm"]
        },
        "application/vnd.lotus-wordpro": {
          source: "iana",
          extensions: ["lwp"]
        },
        "application/vnd.macports.portpkg": {
          source: "iana",
          extensions: ["portpkg"]
        },
        "application/vnd.mapbox-vector-tile": {
          source: "iana"
        },
        "application/vnd.marlin.drm.actiontoken+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.marlin.drm.conftoken+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.marlin.drm.license+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.marlin.drm.mdcf": {
          source: "iana"
        },
        "application/vnd.mason+json": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.maxmind.maxmind-db": {
          source: "iana"
        },
        "application/vnd.mcd": {
          source: "iana",
          extensions: ["mcd"]
        },
        "application/vnd.medcalcdata": {
          source: "iana",
          extensions: ["mc1"]
        },
        "application/vnd.mediastation.cdkey": {
          source: "iana",
          extensions: ["cdkey"]
        },
        "application/vnd.meridian-slingshot": {
          source: "iana"
        },
        "application/vnd.mfer": {
          source: "iana",
          extensions: ["mwf"]
        },
        "application/vnd.mfmp": {
          source: "iana",
          extensions: ["mfm"]
        },
        "application/vnd.micro+json": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.micrografx.flo": {
          source: "iana",
          extensions: ["flo"]
        },
        "application/vnd.micrografx.igx": {
          source: "iana",
          extensions: ["igx"]
        },
        "application/vnd.microsoft.portable-executable": {
          source: "iana"
        },
        "application/vnd.microsoft.windows.thumbnail-cache": {
          source: "iana"
        },
        "application/vnd.miele+json": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.mif": {
          source: "iana",
          extensions: ["mif"]
        },
        "application/vnd.minisoft-hp3000-save": {
          source: "iana"
        },
        "application/vnd.mitsubishi.misty-guard.trustweb": {
          source: "iana"
        },
        "application/vnd.mobius.daf": {
          source: "iana",
          extensions: ["daf"]
        },
        "application/vnd.mobius.dis": {
          source: "iana",
          extensions: ["dis"]
        },
        "application/vnd.mobius.mbk": {
          source: "iana",
          extensions: ["mbk"]
        },
        "application/vnd.mobius.mqy": {
          source: "iana",
          extensions: ["mqy"]
        },
        "application/vnd.mobius.msl": {
          source: "iana",
          extensions: ["msl"]
        },
        "application/vnd.mobius.plc": {
          source: "iana",
          extensions: ["plc"]
        },
        "application/vnd.mobius.txf": {
          source: "iana",
          extensions: ["txf"]
        },
        "application/vnd.mophun.application": {
          source: "iana",
          extensions: ["mpn"]
        },
        "application/vnd.mophun.certificate": {
          source: "iana",
          extensions: ["mpc"]
        },
        "application/vnd.motorola.flexsuite": {
          source: "iana"
        },
        "application/vnd.motorola.flexsuite.adsi": {
          source: "iana"
        },
        "application/vnd.motorola.flexsuite.fis": {
          source: "iana"
        },
        "application/vnd.motorola.flexsuite.gotap": {
          source: "iana"
        },
        "application/vnd.motorola.flexsuite.kmr": {
          source: "iana"
        },
        "application/vnd.motorola.flexsuite.ttc": {
          source: "iana"
        },
        "application/vnd.motorola.flexsuite.wem": {
          source: "iana"
        },
        "application/vnd.motorola.iprm": {
          source: "iana"
        },
        "application/vnd.mozilla.xul+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["xul"]
        },
        "application/vnd.ms-3mfdocument": {
          source: "iana"
        },
        "application/vnd.ms-artgalry": {
          source: "iana",
          extensions: ["cil"]
        },
        "application/vnd.ms-asf": {
          source: "iana"
        },
        "application/vnd.ms-cab-compressed": {
          source: "iana",
          extensions: ["cab"]
        },
        "application/vnd.ms-color.iccprofile": {
          source: "apache"
        },
        "application/vnd.ms-excel": {
          source: "iana",
          compressible: !1,
          extensions: ["xls", "xlm", "xla", "xlc", "xlt", "xlw"]
        },
        "application/vnd.ms-excel.addin.macroenabled.12": {
          source: "iana",
          extensions: ["xlam"]
        },
        "application/vnd.ms-excel.sheet.binary.macroenabled.12": {
          source: "iana",
          extensions: ["xlsb"]
        },
        "application/vnd.ms-excel.sheet.macroenabled.12": {
          source: "iana",
          extensions: ["xlsm"]
        },
        "application/vnd.ms-excel.template.macroenabled.12": {
          source: "iana",
          extensions: ["xltm"]
        },
        "application/vnd.ms-fontobject": {
          source: "iana",
          compressible: !0,
          extensions: ["eot"]
        },
        "application/vnd.ms-htmlhelp": {
          source: "iana",
          extensions: ["chm"]
        },
        "application/vnd.ms-ims": {
          source: "iana",
          extensions: ["ims"]
        },
        "application/vnd.ms-lrm": {
          source: "iana",
          extensions: ["lrm"]
        },
        "application/vnd.ms-office.activex+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.ms-officetheme": {
          source: "iana",
          extensions: ["thmx"]
        },
        "application/vnd.ms-opentype": {
          source: "apache",
          compressible: !0
        },
        "application/vnd.ms-outlook": {
          compressible: !1,
          extensions: ["msg"]
        },
        "application/vnd.ms-package.obfuscated-opentype": {
          source: "apache"
        },
        "application/vnd.ms-pki.seccat": {
          source: "apache",
          extensions: ["cat"]
        },
        "application/vnd.ms-pki.stl": {
          source: "apache",
          extensions: ["stl"]
        },
        "application/vnd.ms-playready.initiator+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.ms-powerpoint": {
          source: "iana",
          compressible: !1,
          extensions: ["ppt", "pps", "pot"]
        },
        "application/vnd.ms-powerpoint.addin.macroenabled.12": {
          source: "iana",
          extensions: ["ppam"]
        },
        "application/vnd.ms-powerpoint.presentation.macroenabled.12": {
          source: "iana",
          extensions: ["pptm"]
        },
        "application/vnd.ms-powerpoint.slide.macroenabled.12": {
          source: "iana",
          extensions: ["sldm"]
        },
        "application/vnd.ms-powerpoint.slideshow.macroenabled.12": {
          source: "iana",
          extensions: ["ppsm"]
        },
        "application/vnd.ms-powerpoint.template.macroenabled.12": {
          source: "iana",
          extensions: ["potm"]
        },
        "application/vnd.ms-printdevicecapabilities+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.ms-printing.printticket+xml": {
          source: "apache",
          compressible: !0
        },
        "application/vnd.ms-printschematicket+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.ms-project": {
          source: "iana",
          extensions: ["mpp", "mpt"]
        },
        "application/vnd.ms-tnef": {
          source: "iana"
        },
        "application/vnd.ms-windows.devicepairing": {
          source: "iana"
        },
        "application/vnd.ms-windows.nwprinting.oob": {
          source: "iana"
        },
        "application/vnd.ms-windows.printerpairing": {
          source: "iana"
        },
        "application/vnd.ms-windows.wsd.oob": {
          source: "iana"
        },
        "application/vnd.ms-wmdrm.lic-chlg-req": {
          source: "iana"
        },
        "application/vnd.ms-wmdrm.lic-resp": {
          source: "iana"
        },
        "application/vnd.ms-wmdrm.meter-chlg-req": {
          source: "iana"
        },
        "application/vnd.ms-wmdrm.meter-resp": {
          source: "iana"
        },
        "application/vnd.ms-word.document.macroenabled.12": {
          source: "iana",
          extensions: ["docm"]
        },
        "application/vnd.ms-word.template.macroenabled.12": {
          source: "iana",
          extensions: ["dotm"]
        },
        "application/vnd.ms-works": {
          source: "iana",
          extensions: ["wps", "wks", "wcm", "wdb"]
        },
        "application/vnd.ms-wpl": {
          source: "iana",
          extensions: ["wpl"]
        },
        "application/vnd.ms-xpsdocument": {
          source: "iana",
          compressible: !1,
          extensions: ["xps"]
        },
        "application/vnd.msa-disk-image": {
          source: "iana"
        },
        "application/vnd.mseq": {
          source: "iana",
          extensions: ["mseq"]
        },
        "application/vnd.msign": {
          source: "iana"
        },
        "application/vnd.multiad.creator": {
          source: "iana"
        },
        "application/vnd.multiad.creator.cif": {
          source: "iana"
        },
        "application/vnd.music-niff": {
          source: "iana"
        },
        "application/vnd.musician": {
          source: "iana",
          extensions: ["mus"]
        },
        "application/vnd.muvee.style": {
          source: "iana",
          extensions: ["msty"]
        },
        "application/vnd.mynfc": {
          source: "iana",
          extensions: ["taglet"]
        },
        "application/vnd.ncd.control": {
          source: "iana"
        },
        "application/vnd.ncd.reference": {
          source: "iana"
        },
        "application/vnd.nearst.inv+json": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.nervana": {
          source: "iana"
        },
        "application/vnd.netfpx": {
          source: "iana"
        },
        "application/vnd.neurolanguage.nlu": {
          source: "iana",
          extensions: ["nlu"]
        },
        "application/vnd.nimn": {
          source: "iana"
        },
        "application/vnd.nintendo.nitro.rom": {
          source: "iana"
        },
        "application/vnd.nintendo.snes.rom": {
          source: "iana"
        },
        "application/vnd.nitf": {
          source: "iana",
          extensions: ["ntf", "nitf"]
        },
        "application/vnd.noblenet-directory": {
          source: "iana",
          extensions: ["nnd"]
        },
        "application/vnd.noblenet-sealer": {
          source: "iana",
          extensions: ["nns"]
        },
        "application/vnd.noblenet-web": {
          source: "iana",
          extensions: ["nnw"]
        },
        "application/vnd.nokia.catalogs": {
          source: "iana"
        },
        "application/vnd.nokia.conml+wbxml": {
          source: "iana"
        },
        "application/vnd.nokia.conml+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.nokia.iptv.config+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.nokia.isds-radio-presets": {
          source: "iana"
        },
        "application/vnd.nokia.landmark+wbxml": {
          source: "iana"
        },
        "application/vnd.nokia.landmark+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.nokia.landmarkcollection+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.nokia.n-gage.ac+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["ac"]
        },
        "application/vnd.nokia.n-gage.data": {
          source: "iana",
          extensions: ["ngdat"]
        },
        "application/vnd.nokia.n-gage.symbian.install": {
          source: "iana",
          extensions: ["n-gage"]
        },
        "application/vnd.nokia.ncd": {
          source: "iana"
        },
        "application/vnd.nokia.pcd+wbxml": {
          source: "iana"
        },
        "application/vnd.nokia.pcd+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.nokia.radio-preset": {
          source: "iana",
          extensions: ["rpst"]
        },
        "application/vnd.nokia.radio-presets": {
          source: "iana",
          extensions: ["rpss"]
        },
        "application/vnd.novadigm.edm": {
          source: "iana",
          extensions: ["edm"]
        },
        "application/vnd.novadigm.edx": {
          source: "iana",
          extensions: ["edx"]
        },
        "application/vnd.novadigm.ext": {
          source: "iana",
          extensions: ["ext"]
        },
        "application/vnd.ntt-local.content-share": {
          source: "iana"
        },
        "application/vnd.ntt-local.file-transfer": {
          source: "iana"
        },
        "application/vnd.ntt-local.ogw_remote-access": {
          source: "iana"
        },
        "application/vnd.ntt-local.sip-ta_remote": {
          source: "iana"
        },
        "application/vnd.ntt-local.sip-ta_tcp_stream": {
          source: "iana"
        },
        "application/vnd.oasis.opendocument.chart": {
          source: "iana",
          extensions: ["odc"]
        },
        "application/vnd.oasis.opendocument.chart-template": {
          source: "iana",
          extensions: ["otc"]
        },
        "application/vnd.oasis.opendocument.database": {
          source: "iana",
          extensions: ["odb"]
        },
        "application/vnd.oasis.opendocument.formula": {
          source: "iana",
          extensions: ["odf"]
        },
        "application/vnd.oasis.opendocument.formula-template": {
          source: "iana",
          extensions: ["odft"]
        },
        "application/vnd.oasis.opendocument.graphics": {
          source: "iana",
          compressible: !1,
          extensions: ["odg"]
        },
        "application/vnd.oasis.opendocument.graphics-template": {
          source: "iana",
          extensions: ["otg"]
        },
        "application/vnd.oasis.opendocument.image": {
          source: "iana",
          extensions: ["odi"]
        },
        "application/vnd.oasis.opendocument.image-template": {
          source: "iana",
          extensions: ["oti"]
        },
        "application/vnd.oasis.opendocument.presentation": {
          source: "iana",
          compressible: !1,
          extensions: ["odp"]
        },
        "application/vnd.oasis.opendocument.presentation-template": {
          source: "iana",
          extensions: ["otp"]
        },
        "application/vnd.oasis.opendocument.spreadsheet": {
          source: "iana",
          compressible: !1,
          extensions: ["ods"]
        },
        "application/vnd.oasis.opendocument.spreadsheet-template": {
          source: "iana",
          extensions: ["ots"]
        },
        "application/vnd.oasis.opendocument.text": {
          source: "iana",
          compressible: !1,
          extensions: ["odt"]
        },
        "application/vnd.oasis.opendocument.text-master": {
          source: "iana",
          extensions: ["odm"]
        },
        "application/vnd.oasis.opendocument.text-template": {
          source: "iana",
          extensions: ["ott"]
        },
        "application/vnd.oasis.opendocument.text-web": {
          source: "iana",
          extensions: ["oth"]
        },
        "application/vnd.obn": {
          source: "iana"
        },
        "application/vnd.ocf+cbor": {
          source: "iana"
        },
        "application/vnd.oci.image.manifest.v1+json": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.oftn.l10n+json": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.oipf.contentaccessdownload+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.oipf.contentaccessstreaming+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.oipf.cspg-hexbinary": {
          source: "iana"
        },
        "application/vnd.oipf.dae.svg+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.oipf.dae.xhtml+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.oipf.mippvcontrolmessage+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.oipf.pae.gem": {
          source: "iana"
        },
        "application/vnd.oipf.spdiscovery+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.oipf.spdlist+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.oipf.ueprofile+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.oipf.userprofile+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.olpc-sugar": {
          source: "iana",
          extensions: ["xo"]
        },
        "application/vnd.oma-scws-config": {
          source: "iana"
        },
        "application/vnd.oma-scws-http-request": {
          source: "iana"
        },
        "application/vnd.oma-scws-http-response": {
          source: "iana"
        },
        "application/vnd.oma.bcast.associated-procedure-parameter+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.oma.bcast.drm-trigger+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.oma.bcast.imd+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.oma.bcast.ltkm": {
          source: "iana"
        },
        "application/vnd.oma.bcast.notification+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.oma.bcast.provisioningtrigger": {
          source: "iana"
        },
        "application/vnd.oma.bcast.sgboot": {
          source: "iana"
        },
        "application/vnd.oma.bcast.sgdd+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.oma.bcast.sgdu": {
          source: "iana"
        },
        "application/vnd.oma.bcast.simple-symbol-container": {
          source: "iana"
        },
        "application/vnd.oma.bcast.smartcard-trigger+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.oma.bcast.sprov+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.oma.bcast.stkm": {
          source: "iana"
        },
        "application/vnd.oma.cab-address-book+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.oma.cab-feature-handler+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.oma.cab-pcc+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.oma.cab-subs-invite+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.oma.cab-user-prefs+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.oma.dcd": {
          source: "iana"
        },
        "application/vnd.oma.dcdc": {
          source: "iana"
        },
        "application/vnd.oma.dd2+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["dd2"]
        },
        "application/vnd.oma.drm.risd+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.oma.group-usage-list+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.oma.lwm2m+json": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.oma.lwm2m+tlv": {
          source: "iana"
        },
        "application/vnd.oma.pal+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.oma.poc.detailed-progress-report+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.oma.poc.final-report+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.oma.poc.groups+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.oma.poc.invocation-descriptor+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.oma.poc.optimized-progress-report+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.oma.push": {
          source: "iana"
        },
        "application/vnd.oma.scidm.messages+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.oma.xcap-directory+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.omads-email+xml": {
          source: "iana",
          charset: "UTF-8",
          compressible: !0
        },
        "application/vnd.omads-file+xml": {
          source: "iana",
          charset: "UTF-8",
          compressible: !0
        },
        "application/vnd.omads-folder+xml": {
          source: "iana",
          charset: "UTF-8",
          compressible: !0
        },
        "application/vnd.omaloc-supl-init": {
          source: "iana"
        },
        "application/vnd.onepager": {
          source: "iana"
        },
        "application/vnd.onepagertamp": {
          source: "iana"
        },
        "application/vnd.onepagertamx": {
          source: "iana"
        },
        "application/vnd.onepagertat": {
          source: "iana"
        },
        "application/vnd.onepagertatp": {
          source: "iana"
        },
        "application/vnd.onepagertatx": {
          source: "iana"
        },
        "application/vnd.openblox.game+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["obgx"]
        },
        "application/vnd.openblox.game-binary": {
          source: "iana"
        },
        "application/vnd.openeye.oeb": {
          source: "iana"
        },
        "application/vnd.openofficeorg.extension": {
          source: "apache",
          extensions: ["oxt"]
        },
        "application/vnd.openstreetmap.data+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["osm"]
        },
        "application/vnd.openxmlformats-officedocument.custom-properties+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.openxmlformats-officedocument.customxmlproperties+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.openxmlformats-officedocument.drawing+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.openxmlformats-officedocument.drawingml.chart+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.openxmlformats-officedocument.drawingml.diagramcolors+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.openxmlformats-officedocument.drawingml.diagramdata+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.openxmlformats-officedocument.drawingml.diagramlayout+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.openxmlformats-officedocument.drawingml.diagramstyle+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.openxmlformats-officedocument.extended-properties+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.openxmlformats-officedocument.presentationml.commentauthors+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.openxmlformats-officedocument.presentationml.comments+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.openxmlformats-officedocument.presentationml.handoutmaster+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.openxmlformats-officedocument.presentationml.notesmaster+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.openxmlformats-officedocument.presentationml.notesslide+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.openxmlformats-officedocument.presentationml.presentation": {
          source: "iana",
          compressible: !1,
          extensions: ["pptx"]
        },
        "application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.openxmlformats-officedocument.presentationml.presprops+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.openxmlformats-officedocument.presentationml.slide": {
          source: "iana",
          extensions: ["sldx"]
        },
        "application/vnd.openxmlformats-officedocument.presentationml.slide+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.openxmlformats-officedocument.presentationml.slidelayout+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.openxmlformats-officedocument.presentationml.slidemaster+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.openxmlformats-officedocument.presentationml.slideshow": {
          source: "iana",
          extensions: ["ppsx"]
        },
        "application/vnd.openxmlformats-officedocument.presentationml.slideshow.main+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.openxmlformats-officedocument.presentationml.slideupdateinfo+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.openxmlformats-officedocument.presentationml.tablestyles+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.openxmlformats-officedocument.presentationml.tags+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.openxmlformats-officedocument.presentationml.template": {
          source: "iana",
          extensions: ["potx"]
        },
        "application/vnd.openxmlformats-officedocument.presentationml.template.main+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.openxmlformats-officedocument.presentationml.viewprops+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.openxmlformats-officedocument.spreadsheetml.calcchain+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.openxmlformats-officedocument.spreadsheetml.externallink+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcachedefinition+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcacherecords+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.openxmlformats-officedocument.spreadsheetml.pivottable+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.openxmlformats-officedocument.spreadsheetml.querytable+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionheaders+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionlog+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedstrings+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
          source: "iana",
          compressible: !1,
          extensions: ["xlsx"]
        },
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheetmetadata+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.openxmlformats-officedocument.spreadsheetml.tablesinglecells+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.openxmlformats-officedocument.spreadsheetml.template": {
          source: "iana",
          extensions: ["xltx"]
        },
        "application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.openxmlformats-officedocument.spreadsheetml.usernames+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.openxmlformats-officedocument.spreadsheetml.volatiledependencies+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.openxmlformats-officedocument.theme+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.openxmlformats-officedocument.themeoverride+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.openxmlformats-officedocument.vmldrawing": {
          source: "iana"
        },
        "application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
          source: "iana",
          compressible: !1,
          extensions: ["docx"]
        },
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document.glossary+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.openxmlformats-officedocument.wordprocessingml.fonttable+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.openxmlformats-officedocument.wordprocessingml.template": {
          source: "iana",
          extensions: ["dotx"]
        },
        "application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.openxmlformats-officedocument.wordprocessingml.websettings+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.openxmlformats-package.core-properties+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.openxmlformats-package.digital-signature-xmlsignature+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.openxmlformats-package.relationships+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.oracle.resource+json": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.orange.indata": {
          source: "iana"
        },
        "application/vnd.osa.netdeploy": {
          source: "iana"
        },
        "application/vnd.osgeo.mapguide.package": {
          source: "iana",
          extensions: ["mgp"]
        },
        "application/vnd.osgi.bundle": {
          source: "iana"
        },
        "application/vnd.osgi.dp": {
          source: "iana",
          extensions: ["dp"]
        },
        "application/vnd.osgi.subsystem": {
          source: "iana",
          extensions: ["esa"]
        },
        "application/vnd.otps.ct-kip+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.oxli.countgraph": {
          source: "iana"
        },
        "application/vnd.pagerduty+json": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.palm": {
          source: "iana",
          extensions: ["pdb", "pqa", "oprc"]
        },
        "application/vnd.panoply": {
          source: "iana"
        },
        "application/vnd.paos.xml": {
          source: "iana"
        },
        "application/vnd.patentdive": {
          source: "iana"
        },
        "application/vnd.patientecommsdoc": {
          source: "iana"
        },
        "application/vnd.pawaafile": {
          source: "iana",
          extensions: ["paw"]
        },
        "application/vnd.pcos": {
          source: "iana"
        },
        "application/vnd.pg.format": {
          source: "iana",
          extensions: ["str"]
        },
        "application/vnd.pg.osasli": {
          source: "iana",
          extensions: ["ei6"]
        },
        "application/vnd.piaccess.application-licence": {
          source: "iana"
        },
        "application/vnd.picsel": {
          source: "iana",
          extensions: ["efif"]
        },
        "application/vnd.pmi.widget": {
          source: "iana",
          extensions: ["wg"]
        },
        "application/vnd.poc.group-advertisement+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.pocketlearn": {
          source: "iana",
          extensions: ["plf"]
        },
        "application/vnd.powerbuilder6": {
          source: "iana",
          extensions: ["pbd"]
        },
        "application/vnd.powerbuilder6-s": {
          source: "iana"
        },
        "application/vnd.powerbuilder7": {
          source: "iana"
        },
        "application/vnd.powerbuilder7-s": {
          source: "iana"
        },
        "application/vnd.powerbuilder75": {
          source: "iana"
        },
        "application/vnd.powerbuilder75-s": {
          source: "iana"
        },
        "application/vnd.preminet": {
          source: "iana"
        },
        "application/vnd.previewsystems.box": {
          source: "iana",
          extensions: ["box"]
        },
        "application/vnd.proteus.magazine": {
          source: "iana",
          extensions: ["mgz"]
        },
        "application/vnd.psfs": {
          source: "iana"
        },
        "application/vnd.publishare-delta-tree": {
          source: "iana",
          extensions: ["qps"]
        },
        "application/vnd.pvi.ptid1": {
          source: "iana",
          extensions: ["ptid"]
        },
        "application/vnd.pwg-multiplexed": {
          source: "iana"
        },
        "application/vnd.pwg-xhtml-print+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.qualcomm.brew-app-res": {
          source: "iana"
        },
        "application/vnd.quarantainenet": {
          source: "iana"
        },
        "application/vnd.quark.quarkxpress": {
          source: "iana",
          extensions: ["qxd", "qxt", "qwd", "qwt", "qxl", "qxb"]
        },
        "application/vnd.quobject-quoxdocument": {
          source: "iana"
        },
        "application/vnd.radisys.moml+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.radisys.msml+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.radisys.msml-audit+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.radisys.msml-audit-conf+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.radisys.msml-audit-conn+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.radisys.msml-audit-dialog+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.radisys.msml-audit-stream+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.radisys.msml-conf+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.radisys.msml-dialog+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.radisys.msml-dialog-base+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.radisys.msml-dialog-fax-detect+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.radisys.msml-dialog-fax-sendrecv+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.radisys.msml-dialog-group+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.radisys.msml-dialog-speech+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.radisys.msml-dialog-transform+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.rainstor.data": {
          source: "iana"
        },
        "application/vnd.rapid": {
          source: "iana"
        },
        "application/vnd.rar": {
          source: "iana"
        },
        "application/vnd.realvnc.bed": {
          source: "iana",
          extensions: ["bed"]
        },
        "application/vnd.recordare.musicxml": {
          source: "iana",
          extensions: ["mxl"]
        },
        "application/vnd.recordare.musicxml+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["musicxml"]
        },
        "application/vnd.renlearn.rlprint": {
          source: "iana"
        },
        "application/vnd.restful+json": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.rig.cryptonote": {
          source: "iana",
          extensions: ["cryptonote"]
        },
        "application/vnd.rim.cod": {
          source: "apache",
          extensions: ["cod"]
        },
        "application/vnd.rn-realmedia": {
          source: "apache",
          extensions: ["rm"]
        },
        "application/vnd.rn-realmedia-vbr": {
          source: "apache",
          extensions: ["rmvb"]
        },
        "application/vnd.route66.link66+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["link66"]
        },
        "application/vnd.rs-274x": {
          source: "iana"
        },
        "application/vnd.ruckus.download": {
          source: "iana"
        },
        "application/vnd.s3sms": {
          source: "iana"
        },
        "application/vnd.sailingtracker.track": {
          source: "iana",
          extensions: ["st"]
        },
        "application/vnd.sar": {
          source: "iana"
        },
        "application/vnd.sbm.cid": {
          source: "iana"
        },
        "application/vnd.sbm.mid2": {
          source: "iana"
        },
        "application/vnd.scribus": {
          source: "iana"
        },
        "application/vnd.sealed.3df": {
          source: "iana"
        },
        "application/vnd.sealed.csf": {
          source: "iana"
        },
        "application/vnd.sealed.doc": {
          source: "iana"
        },
        "application/vnd.sealed.eml": {
          source: "iana"
        },
        "application/vnd.sealed.mht": {
          source: "iana"
        },
        "application/vnd.sealed.net": {
          source: "iana"
        },
        "application/vnd.sealed.ppt": {
          source: "iana"
        },
        "application/vnd.sealed.tiff": {
          source: "iana"
        },
        "application/vnd.sealed.xls": {
          source: "iana"
        },
        "application/vnd.sealedmedia.softseal.html": {
          source: "iana"
        },
        "application/vnd.sealedmedia.softseal.pdf": {
          source: "iana"
        },
        "application/vnd.seemail": {
          source: "iana",
          extensions: ["see"]
        },
        "application/vnd.sema": {
          source: "iana",
          extensions: ["sema"]
        },
        "application/vnd.semd": {
          source: "iana",
          extensions: ["semd"]
        },
        "application/vnd.semf": {
          source: "iana",
          extensions: ["semf"]
        },
        "application/vnd.shade-save-file": {
          source: "iana"
        },
        "application/vnd.shana.informed.formdata": {
          source: "iana",
          extensions: ["ifm"]
        },
        "application/vnd.shana.informed.formtemplate": {
          source: "iana",
          extensions: ["itp"]
        },
        "application/vnd.shana.informed.interchange": {
          source: "iana",
          extensions: ["iif"]
        },
        "application/vnd.shana.informed.package": {
          source: "iana",
          extensions: ["ipk"]
        },
        "application/vnd.shootproof+json": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.shopkick+json": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.shp": {
          source: "iana"
        },
        "application/vnd.shx": {
          source: "iana"
        },
        "application/vnd.sigrok.session": {
          source: "iana"
        },
        "application/vnd.simtech-mindmapper": {
          source: "iana",
          extensions: ["twd", "twds"]
        },
        "application/vnd.siren+json": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.smaf": {
          source: "iana",
          extensions: ["mmf"]
        },
        "application/vnd.smart.notebook": {
          source: "iana"
        },
        "application/vnd.smart.teacher": {
          source: "iana",
          extensions: ["teacher"]
        },
        "application/vnd.snesdev-page-table": {
          source: "iana"
        },
        "application/vnd.software602.filler.form+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["fo"]
        },
        "application/vnd.software602.filler.form-xml-zip": {
          source: "iana"
        },
        "application/vnd.solent.sdkm+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["sdkm", "sdkd"]
        },
        "application/vnd.spotfire.dxp": {
          source: "iana",
          extensions: ["dxp"]
        },
        "application/vnd.spotfire.sfs": {
          source: "iana",
          extensions: ["sfs"]
        },
        "application/vnd.sqlite3": {
          source: "iana"
        },
        "application/vnd.sss-cod": {
          source: "iana"
        },
        "application/vnd.sss-dtf": {
          source: "iana"
        },
        "application/vnd.sss-ntf": {
          source: "iana"
        },
        "application/vnd.stardivision.calc": {
          source: "apache",
          extensions: ["sdc"]
        },
        "application/vnd.stardivision.draw": {
          source: "apache",
          extensions: ["sda"]
        },
        "application/vnd.stardivision.impress": {
          source: "apache",
          extensions: ["sdd"]
        },
        "application/vnd.stardivision.math": {
          source: "apache",
          extensions: ["smf"]
        },
        "application/vnd.stardivision.writer": {
          source: "apache",
          extensions: ["sdw", "vor"]
        },
        "application/vnd.stardivision.writer-global": {
          source: "apache",
          extensions: ["sgl"]
        },
        "application/vnd.stepmania.package": {
          source: "iana",
          extensions: ["smzip"]
        },
        "application/vnd.stepmania.stepchart": {
          source: "iana",
          extensions: ["sm"]
        },
        "application/vnd.street-stream": {
          source: "iana"
        },
        "application/vnd.sun.wadl+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["wadl"]
        },
        "application/vnd.sun.xml.calc": {
          source: "apache",
          extensions: ["sxc"]
        },
        "application/vnd.sun.xml.calc.template": {
          source: "apache",
          extensions: ["stc"]
        },
        "application/vnd.sun.xml.draw": {
          source: "apache",
          extensions: ["sxd"]
        },
        "application/vnd.sun.xml.draw.template": {
          source: "apache",
          extensions: ["std"]
        },
        "application/vnd.sun.xml.impress": {
          source: "apache",
          extensions: ["sxi"]
        },
        "application/vnd.sun.xml.impress.template": {
          source: "apache",
          extensions: ["sti"]
        },
        "application/vnd.sun.xml.math": {
          source: "apache",
          extensions: ["sxm"]
        },
        "application/vnd.sun.xml.writer": {
          source: "apache",
          extensions: ["sxw"]
        },
        "application/vnd.sun.xml.writer.global": {
          source: "apache",
          extensions: ["sxg"]
        },
        "application/vnd.sun.xml.writer.template": {
          source: "apache",
          extensions: ["stw"]
        },
        "application/vnd.sus-calendar": {
          source: "iana",
          extensions: ["sus", "susp"]
        },
        "application/vnd.svd": {
          source: "iana",
          extensions: ["svd"]
        },
        "application/vnd.swiftview-ics": {
          source: "iana"
        },
        "application/vnd.symbian.install": {
          source: "apache",
          extensions: ["sis", "sisx"]
        },
        "application/vnd.syncml+xml": {
          source: "iana",
          charset: "UTF-8",
          compressible: !0,
          extensions: ["xsm"]
        },
        "application/vnd.syncml.dm+wbxml": {
          source: "iana",
          charset: "UTF-8",
          extensions: ["bdm"]
        },
        "application/vnd.syncml.dm+xml": {
          source: "iana",
          charset: "UTF-8",
          compressible: !0,
          extensions: ["xdm"]
        },
        "application/vnd.syncml.dm.notification": {
          source: "iana"
        },
        "application/vnd.syncml.dmddf+wbxml": {
          source: "iana"
        },
        "application/vnd.syncml.dmddf+xml": {
          source: "iana",
          charset: "UTF-8",
          compressible: !0,
          extensions: ["ddf"]
        },
        "application/vnd.syncml.dmtnds+wbxml": {
          source: "iana"
        },
        "application/vnd.syncml.dmtnds+xml": {
          source: "iana",
          charset: "UTF-8",
          compressible: !0
        },
        "application/vnd.syncml.ds.notification": {
          source: "iana"
        },
        "application/vnd.tableschema+json": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.tao.intent-module-archive": {
          source: "iana",
          extensions: ["tao"]
        },
        "application/vnd.tcpdump.pcap": {
          source: "iana",
          extensions: ["pcap", "cap", "dmp"]
        },
        "application/vnd.think-cell.ppttc+json": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.tmd.mediaflex.api+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.tml": {
          source: "iana"
        },
        "application/vnd.tmobile-livetv": {
          source: "iana",
          extensions: ["tmo"]
        },
        "application/vnd.tri.onesource": {
          source: "iana"
        },
        "application/vnd.trid.tpt": {
          source: "iana",
          extensions: ["tpt"]
        },
        "application/vnd.triscape.mxs": {
          source: "iana",
          extensions: ["mxs"]
        },
        "application/vnd.trueapp": {
          source: "iana",
          extensions: ["tra"]
        },
        "application/vnd.truedoc": {
          source: "iana"
        },
        "application/vnd.ubisoft.webplayer": {
          source: "iana"
        },
        "application/vnd.ufdl": {
          source: "iana",
          extensions: ["ufd", "ufdl"]
        },
        "application/vnd.uiq.theme": {
          source: "iana",
          extensions: ["utz"]
        },
        "application/vnd.umajin": {
          source: "iana",
          extensions: ["umj"]
        },
        "application/vnd.unity": {
          source: "iana",
          extensions: ["unityweb"]
        },
        "application/vnd.uoml+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["uoml"]
        },
        "application/vnd.uplanet.alert": {
          source: "iana"
        },
        "application/vnd.uplanet.alert-wbxml": {
          source: "iana"
        },
        "application/vnd.uplanet.bearer-choice": {
          source: "iana"
        },
        "application/vnd.uplanet.bearer-choice-wbxml": {
          source: "iana"
        },
        "application/vnd.uplanet.cacheop": {
          source: "iana"
        },
        "application/vnd.uplanet.cacheop-wbxml": {
          source: "iana"
        },
        "application/vnd.uplanet.channel": {
          source: "iana"
        },
        "application/vnd.uplanet.channel-wbxml": {
          source: "iana"
        },
        "application/vnd.uplanet.list": {
          source: "iana"
        },
        "application/vnd.uplanet.list-wbxml": {
          source: "iana"
        },
        "application/vnd.uplanet.listcmd": {
          source: "iana"
        },
        "application/vnd.uplanet.listcmd-wbxml": {
          source: "iana"
        },
        "application/vnd.uplanet.signal": {
          source: "iana"
        },
        "application/vnd.uri-map": {
          source: "iana"
        },
        "application/vnd.valve.source.material": {
          source: "iana"
        },
        "application/vnd.vcx": {
          source: "iana",
          extensions: ["vcx"]
        },
        "application/vnd.vd-study": {
          source: "iana"
        },
        "application/vnd.vectorworks": {
          source: "iana"
        },
        "application/vnd.vel+json": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.verimatrix.vcas": {
          source: "iana"
        },
        "application/vnd.veryant.thin": {
          source: "iana"
        },
        "application/vnd.ves.encrypted": {
          source: "iana"
        },
        "application/vnd.vidsoft.vidconference": {
          source: "iana"
        },
        "application/vnd.visio": {
          source: "iana",
          extensions: ["vsd", "vst", "vss", "vsw"]
        },
        "application/vnd.visionary": {
          source: "iana",
          extensions: ["vis"]
        },
        "application/vnd.vividence.scriptfile": {
          source: "iana"
        },
        "application/vnd.vsf": {
          source: "iana",
          extensions: ["vsf"]
        },
        "application/vnd.wap.sic": {
          source: "iana"
        },
        "application/vnd.wap.slc": {
          source: "iana"
        },
        "application/vnd.wap.wbxml": {
          source: "iana",
          charset: "UTF-8",
          extensions: ["wbxml"]
        },
        "application/vnd.wap.wmlc": {
          source: "iana",
          extensions: ["wmlc"]
        },
        "application/vnd.wap.wmlscriptc": {
          source: "iana",
          extensions: ["wmlsc"]
        },
        "application/vnd.webturbo": {
          source: "iana",
          extensions: ["wtb"]
        },
        "application/vnd.wfa.p2p": {
          source: "iana"
        },
        "application/vnd.wfa.wsc": {
          source: "iana"
        },
        "application/vnd.windows.devicepairing": {
          source: "iana"
        },
        "application/vnd.wmc": {
          source: "iana"
        },
        "application/vnd.wmf.bootstrap": {
          source: "iana"
        },
        "application/vnd.wolfram.mathematica": {
          source: "iana"
        },
        "application/vnd.wolfram.mathematica.package": {
          source: "iana"
        },
        "application/vnd.wolfram.player": {
          source: "iana",
          extensions: ["nbp"]
        },
        "application/vnd.wordperfect": {
          source: "iana",
          extensions: ["wpd"]
        },
        "application/vnd.wqd": {
          source: "iana",
          extensions: ["wqd"]
        },
        "application/vnd.wrq-hp3000-labelled": {
          source: "iana"
        },
        "application/vnd.wt.stf": {
          source: "iana",
          extensions: ["stf"]
        },
        "application/vnd.wv.csp+wbxml": {
          source: "iana"
        },
        "application/vnd.wv.csp+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.wv.ssp+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.xacml+json": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.xara": {
          source: "iana",
          extensions: ["xar"]
        },
        "application/vnd.xfdl": {
          source: "iana",
          extensions: ["xfdl"]
        },
        "application/vnd.xfdl.webform": {
          source: "iana"
        },
        "application/vnd.xmi+xml": {
          source: "iana",
          compressible: !0
        },
        "application/vnd.xmpie.cpkg": {
          source: "iana"
        },
        "application/vnd.xmpie.dpkg": {
          source: "iana"
        },
        "application/vnd.xmpie.plan": {
          source: "iana"
        },
        "application/vnd.xmpie.ppkg": {
          source: "iana"
        },
        "application/vnd.xmpie.xlim": {
          source: "iana"
        },
        "application/vnd.yamaha.hv-dic": {
          source: "iana",
          extensions: ["hvd"]
        },
        "application/vnd.yamaha.hv-script": {
          source: "iana",
          extensions: ["hvs"]
        },
        "application/vnd.yamaha.hv-voice": {
          source: "iana",
          extensions: ["hvp"]
        },
        "application/vnd.yamaha.openscoreformat": {
          source: "iana",
          extensions: ["osf"]
        },
        "application/vnd.yamaha.openscoreformat.osfpvg+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["osfpvg"]
        },
        "application/vnd.yamaha.remote-setup": {
          source: "iana"
        },
        "application/vnd.yamaha.smaf-audio": {
          source: "iana",
          extensions: ["saf"]
        },
        "application/vnd.yamaha.smaf-phrase": {
          source: "iana",
          extensions: ["spf"]
        },
        "application/vnd.yamaha.through-ngn": {
          source: "iana"
        },
        "application/vnd.yamaha.tunnel-udpencap": {
          source: "iana"
        },
        "application/vnd.yaoweme": {
          source: "iana"
        },
        "application/vnd.yellowriver-custom-menu": {
          source: "iana",
          extensions: ["cmp"]
        },
        "application/vnd.youtube.yt": {
          source: "iana"
        },
        "application/vnd.zul": {
          source: "iana",
          extensions: ["zir", "zirz"]
        },
        "application/vnd.zzazz.deck+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["zaz"]
        },
        "application/voicexml+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["vxml"]
        },
        "application/voucher-cms+json": {
          source: "iana",
          compressible: !0
        },
        "application/vq-rtcpxr": {
          source: "iana"
        },
        "application/wasm": {
          compressible: !0,
          extensions: ["wasm"]
        },
        "application/watcherinfo+xml": {
          source: "iana",
          compressible: !0
        },
        "application/webpush-options+json": {
          source: "iana",
          compressible: !0
        },
        "application/whoispp-query": {
          source: "iana"
        },
        "application/whoispp-response": {
          source: "iana"
        },
        "application/widget": {
          source: "iana",
          extensions: ["wgt"]
        },
        "application/winhlp": {
          source: "apache",
          extensions: ["hlp"]
        },
        "application/wita": {
          source: "iana"
        },
        "application/wordperfect5.1": {
          source: "iana"
        },
        "application/wsdl+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["wsdl"]
        },
        "application/wspolicy+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["wspolicy"]
        },
        "application/x-7z-compressed": {
          source: "apache",
          compressible: !1,
          extensions: ["7z"]
        },
        "application/x-abiword": {
          source: "apache",
          extensions: ["abw"]
        },
        "application/x-ace-compressed": {
          source: "apache",
          extensions: ["ace"]
        },
        "application/x-amf": {
          source: "apache"
        },
        "application/x-apple-diskimage": {
          source: "apache",
          extensions: ["dmg"]
        },
        "application/x-arj": {
          compressible: !1,
          extensions: ["arj"]
        },
        "application/x-authorware-bin": {
          source: "apache",
          extensions: ["aab", "x32", "u32", "vox"]
        },
        "application/x-authorware-map": {
          source: "apache",
          extensions: ["aam"]
        },
        "application/x-authorware-seg": {
          source: "apache",
          extensions: ["aas"]
        },
        "application/x-bcpio": {
          source: "apache",
          extensions: ["bcpio"]
        },
        "application/x-bdoc": {
          compressible: !1,
          extensions: ["bdoc"]
        },
        "application/x-bittorrent": {
          source: "apache",
          extensions: ["torrent"]
        },
        "application/x-blorb": {
          source: "apache",
          extensions: ["blb", "blorb"]
        },
        "application/x-bzip": {
          source: "apache",
          compressible: !1,
          extensions: ["bz"]
        },
        "application/x-bzip2": {
          source: "apache",
          compressible: !1,
          extensions: ["bz2", "boz"]
        },
        "application/x-cbr": {
          source: "apache",
          extensions: ["cbr", "cba", "cbt", "cbz", "cb7"]
        },
        "application/x-cdlink": {
          source: "apache",
          extensions: ["vcd"]
        },
        "application/x-cfs-compressed": {
          source: "apache",
          extensions: ["cfs"]
        },
        "application/x-chat": {
          source: "apache",
          extensions: ["chat"]
        },
        "application/x-chess-pgn": {
          source: "apache",
          extensions: ["pgn"]
        },
        "application/x-chrome-extension": {
          extensions: ["crx"]
        },
        "application/x-cocoa": {
          source: "nginx",
          extensions: ["cco"]
        },
        "application/x-compress": {
          source: "apache"
        },
        "application/x-conference": {
          source: "apache",
          extensions: ["nsc"]
        },
        "application/x-cpio": {
          source: "apache",
          extensions: ["cpio"]
        },
        "application/x-csh": {
          source: "apache",
          extensions: ["csh"]
        },
        "application/x-deb": {
          compressible: !1
        },
        "application/x-debian-package": {
          source: "apache",
          extensions: ["deb", "udeb"]
        },
        "application/x-dgc-compressed": {
          source: "apache",
          extensions: ["dgc"]
        },
        "application/x-director": {
          source: "apache",
          extensions: ["dir", "dcr", "dxr", "cst", "cct", "cxt", "w3d", "fgd", "swa"]
        },
        "application/x-doom": {
          source: "apache",
          extensions: ["wad"]
        },
        "application/x-dtbncx+xml": {
          source: "apache",
          compressible: !0,
          extensions: ["ncx"]
        },
        "application/x-dtbook+xml": {
          source: "apache",
          compressible: !0,
          extensions: ["dtb"]
        },
        "application/x-dtbresource+xml": {
          source: "apache",
          compressible: !0,
          extensions: ["res"]
        },
        "application/x-dvi": {
          source: "apache",
          compressible: !1,
          extensions: ["dvi"]
        },
        "application/x-envoy": {
          source: "apache",
          extensions: ["evy"]
        },
        "application/x-eva": {
          source: "apache",
          extensions: ["eva"]
        },
        "application/x-font-bdf": {
          source: "apache",
          extensions: ["bdf"]
        },
        "application/x-font-dos": {
          source: "apache"
        },
        "application/x-font-framemaker": {
          source: "apache"
        },
        "application/x-font-ghostscript": {
          source: "apache",
          extensions: ["gsf"]
        },
        "application/x-font-libgrx": {
          source: "apache"
        },
        "application/x-font-linux-psf": {
          source: "apache",
          extensions: ["psf"]
        },
        "application/x-font-pcf": {
          source: "apache",
          extensions: ["pcf"]
        },
        "application/x-font-snf": {
          source: "apache",
          extensions: ["snf"]
        },
        "application/x-font-speedo": {
          source: "apache"
        },
        "application/x-font-sunos-news": {
          source: "apache"
        },
        "application/x-font-type1": {
          source: "apache",
          extensions: ["pfa", "pfb", "pfm", "afm"]
        },
        "application/x-font-vfont": {
          source: "apache"
        },
        "application/x-freearc": {
          source: "apache",
          extensions: ["arc"]
        },
        "application/x-futuresplash": {
          source: "apache",
          extensions: ["spl"]
        },
        "application/x-gca-compressed": {
          source: "apache",
          extensions: ["gca"]
        },
        "application/x-glulx": {
          source: "apache",
          extensions: ["ulx"]
        },
        "application/x-gnumeric": {
          source: "apache",
          extensions: ["gnumeric"]
        },
        "application/x-gramps-xml": {
          source: "apache",
          extensions: ["gramps"]
        },
        "application/x-gtar": {
          source: "apache",
          extensions: ["gtar"]
        },
        "application/x-gzip": {
          source: "apache"
        },
        "application/x-hdf": {
          source: "apache",
          extensions: ["hdf"]
        },
        "application/x-httpd-php": {
          compressible: !0,
          extensions: ["php"]
        },
        "application/x-install-instructions": {
          source: "apache",
          extensions: ["install"]
        },
        "application/x-iso9660-image": {
          source: "apache",
          extensions: ["iso"]
        },
        "application/x-java-archive-diff": {
          source: "nginx",
          extensions: ["jardiff"]
        },
        "application/x-java-jnlp-file": {
          source: "apache",
          compressible: !1,
          extensions: ["jnlp"]
        },
        "application/x-javascript": {
          compressible: !0
        },
        "application/x-keepass2": {
          extensions: ["kdbx"]
        },
        "application/x-latex": {
          source: "apache",
          compressible: !1,
          extensions: ["latex"]
        },
        "application/x-lua-bytecode": {
          extensions: ["luac"]
        },
        "application/x-lzh-compressed": {
          source: "apache",
          extensions: ["lzh", "lha"]
        },
        "application/x-makeself": {
          source: "nginx",
          extensions: ["run"]
        },
        "application/x-mie": {
          source: "apache",
          extensions: ["mie"]
        },
        "application/x-mobipocket-ebook": {
          source: "apache",
          extensions: ["prc", "mobi"]
        },
        "application/x-mpegurl": {
          compressible: !1
        },
        "application/x-ms-application": {
          source: "apache",
          extensions: ["application"]
        },
        "application/x-ms-shortcut": {
          source: "apache",
          extensions: ["lnk"]
        },
        "application/x-ms-wmd": {
          source: "apache",
          extensions: ["wmd"]
        },
        "application/x-ms-wmz": {
          source: "apache",
          extensions: ["wmz"]
        },
        "application/x-ms-xbap": {
          source: "apache",
          extensions: ["xbap"]
        },
        "application/x-msaccess": {
          source: "apache",
          extensions: ["mdb"]
        },
        "application/x-msbinder": {
          source: "apache",
          extensions: ["obd"]
        },
        "application/x-mscardfile": {
          source: "apache",
          extensions: ["crd"]
        },
        "application/x-msclip": {
          source: "apache",
          extensions: ["clp"]
        },
        "application/x-msdos-program": {
          extensions: ["exe"]
        },
        "application/x-msdownload": {
          source: "apache",
          extensions: ["exe", "dll", "com", "bat", "msi"]
        },
        "application/x-msmediaview": {
          source: "apache",
          extensions: ["mvb", "m13", "m14"]
        },
        "application/x-msmetafile": {
          source: "apache",
          extensions: ["wmf", "wmz", "emf", "emz"]
        },
        "application/x-msmoney": {
          source: "apache",
          extensions: ["mny"]
        },
        "application/x-mspublisher": {
          source: "apache",
          extensions: ["pub"]
        },
        "application/x-msschedule": {
          source: "apache",
          extensions: ["scd"]
        },
        "application/x-msterminal": {
          source: "apache",
          extensions: ["trm"]
        },
        "application/x-mswrite": {
          source: "apache",
          extensions: ["wri"]
        },
        "application/x-netcdf": {
          source: "apache",
          extensions: ["nc", "cdf"]
        },
        "application/x-ns-proxy-autoconfig": {
          compressible: !0,
          extensions: ["pac"]
        },
        "application/x-nzb": {
          source: "apache",
          extensions: ["nzb"]
        },
        "application/x-perl": {
          source: "nginx",
          extensions: ["pl", "pm"]
        },
        "application/x-pilot": {
          source: "nginx",
          extensions: ["prc", "pdb"]
        },
        "application/x-pkcs12": {
          source: "apache",
          compressible: !1,
          extensions: ["p12", "pfx"]
        },
        "application/x-pkcs7-certificates": {
          source: "apache",
          extensions: ["p7b", "spc"]
        },
        "application/x-pkcs7-certreqresp": {
          source: "apache",
          extensions: ["p7r"]
        },
        "application/x-pki-message": {
          source: "iana"
        },
        "application/x-rar-compressed": {
          source: "apache",
          compressible: !1,
          extensions: ["rar"]
        },
        "application/x-redhat-package-manager": {
          source: "nginx",
          extensions: ["rpm"]
        },
        "application/x-research-info-systems": {
          source: "apache",
          extensions: ["ris"]
        },
        "application/x-sea": {
          source: "nginx",
          extensions: ["sea"]
        },
        "application/x-sh": {
          source: "apache",
          compressible: !0,
          extensions: ["sh"]
        },
        "application/x-shar": {
          source: "apache",
          extensions: ["shar"]
        },
        "application/x-shockwave-flash": {
          source: "apache",
          compressible: !1,
          extensions: ["swf"]
        },
        "application/x-silverlight-app": {
          source: "apache",
          extensions: ["xap"]
        },
        "application/x-sql": {
          source: "apache",
          extensions: ["sql"]
        },
        "application/x-stuffit": {
          source: "apache",
          compressible: !1,
          extensions: ["sit"]
        },
        "application/x-stuffitx": {
          source: "apache",
          extensions: ["sitx"]
        },
        "application/x-subrip": {
          source: "apache",
          extensions: ["srt"]
        },
        "application/x-sv4cpio": {
          source: "apache",
          extensions: ["sv4cpio"]
        },
        "application/x-sv4crc": {
          source: "apache",
          extensions: ["sv4crc"]
        },
        "application/x-t3vm-image": {
          source: "apache",
          extensions: ["t3"]
        },
        "application/x-tads": {
          source: "apache",
          extensions: ["gam"]
        },
        "application/x-tar": {
          source: "apache",
          compressible: !0,
          extensions: ["tar"]
        },
        "application/x-tcl": {
          source: "apache",
          extensions: ["tcl", "tk"]
        },
        "application/x-tex": {
          source: "apache",
          extensions: ["tex"]
        },
        "application/x-tex-tfm": {
          source: "apache",
          extensions: ["tfm"]
        },
        "application/x-texinfo": {
          source: "apache",
          extensions: ["texinfo", "texi"]
        },
        "application/x-tgif": {
          source: "apache",
          extensions: ["obj"]
        },
        "application/x-ustar": {
          source: "apache",
          extensions: ["ustar"]
        },
        "application/x-virtualbox-hdd": {
          compressible: !0,
          extensions: ["hdd"]
        },
        "application/x-virtualbox-ova": {
          compressible: !0,
          extensions: ["ova"]
        },
        "application/x-virtualbox-ovf": {
          compressible: !0,
          extensions: ["ovf"]
        },
        "application/x-virtualbox-vbox": {
          compressible: !0,
          extensions: ["vbox"]
        },
        "application/x-virtualbox-vbox-extpack": {
          compressible: !1,
          extensions: ["vbox-extpack"]
        },
        "application/x-virtualbox-vdi": {
          compressible: !0,
          extensions: ["vdi"]
        },
        "application/x-virtualbox-vhd": {
          compressible: !0,
          extensions: ["vhd"]
        },
        "application/x-virtualbox-vmdk": {
          compressible: !0,
          extensions: ["vmdk"]
        },
        "application/x-wais-source": {
          source: "apache",
          extensions: ["src"]
        },
        "application/x-web-app-manifest+json": {
          compressible: !0,
          extensions: ["webapp"]
        },
        "application/x-www-form-urlencoded": {
          source: "iana",
          compressible: !0
        },
        "application/x-x509-ca-cert": {
          source: "iana",
          extensions: ["der", "crt", "pem"]
        },
        "application/x-x509-ca-ra-cert": {
          source: "iana"
        },
        "application/x-x509-next-ca-cert": {
          source: "iana"
        },
        "application/x-xfig": {
          source: "apache",
          extensions: ["fig"]
        },
        "application/x-xliff+xml": {
          source: "apache",
          compressible: !0,
          extensions: ["xlf"]
        },
        "application/x-xpinstall": {
          source: "apache",
          compressible: !1,
          extensions: ["xpi"]
        },
        "application/x-xz": {
          source: "apache",
          extensions: ["xz"]
        },
        "application/x-zmachine": {
          source: "apache",
          extensions: ["z1", "z2", "z3", "z4", "z5", "z6", "z7", "z8"]
        },
        "application/x400-bp": {
          source: "iana"
        },
        "application/xacml+xml": {
          source: "iana",
          compressible: !0
        },
        "application/xaml+xml": {
          source: "apache",
          compressible: !0,
          extensions: ["xaml"]
        },
        "application/xcap-att+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["xav"]
        },
        "application/xcap-caps+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["xca"]
        },
        "application/xcap-diff+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["xdf"]
        },
        "application/xcap-el+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["xel"]
        },
        "application/xcap-error+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["xer"]
        },
        "application/xcap-ns+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["xns"]
        },
        "application/xcon-conference-info+xml": {
          source: "iana",
          compressible: !0
        },
        "application/xcon-conference-info-diff+xml": {
          source: "iana",
          compressible: !0
        },
        "application/xenc+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["xenc"]
        },
        "application/xhtml+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["xhtml", "xht"]
        },
        "application/xhtml-voice+xml": {
          source: "apache",
          compressible: !0
        },
        "application/xliff+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["xlf"]
        },
        "application/xml": {
          source: "iana",
          compressible: !0,
          extensions: ["xml", "xsl", "xsd", "rng"]
        },
        "application/xml-dtd": {
          source: "iana",
          compressible: !0,
          extensions: ["dtd"]
        },
        "application/xml-external-parsed-entity": {
          source: "iana"
        },
        "application/xml-patch+xml": {
          source: "iana",
          compressible: !0
        },
        "application/xmpp+xml": {
          source: "iana",
          compressible: !0
        },
        "application/xop+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["xop"]
        },
        "application/xproc+xml": {
          source: "apache",
          compressible: !0,
          extensions: ["xpl"]
        },
        "application/xslt+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["xslt"]
        },
        "application/xspf+xml": {
          source: "apache",
          compressible: !0,
          extensions: ["xspf"]
        },
        "application/xv+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["mxml", "xhvml", "xvml", "xvm"]
        },
        "application/yang": {
          source: "iana",
          extensions: ["yang"]
        },
        "application/yang-data+json": {
          source: "iana",
          compressible: !0
        },
        "application/yang-data+xml": {
          source: "iana",
          compressible: !0
        },
        "application/yang-patch+json": {
          source: "iana",
          compressible: !0
        },
        "application/yang-patch+xml": {
          source: "iana",
          compressible: !0
        },
        "application/yin+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["yin"]
        },
        "application/zip": {
          source: "iana",
          compressible: !1,
          extensions: ["zip"]
        },
        "application/zlib": {
          source: "iana"
        },
        "application/zstd": {
          source: "iana"
        },
        "audio/1d-interleaved-parityfec": {
          source: "iana"
        },
        "audio/32kadpcm": {
          source: "iana"
        },
        "audio/3gpp": {
          source: "iana",
          compressible: !1,
          extensions: ["3gpp"]
        },
        "audio/3gpp2": {
          source: "iana"
        },
        "audio/aac": {
          source: "iana"
        },
        "audio/ac3": {
          source: "iana"
        },
        "audio/adpcm": {
          source: "apache",
          extensions: ["adp"]
        },
        "audio/amr": {
          source: "iana"
        },
        "audio/amr-wb": {
          source: "iana"
        },
        "audio/amr-wb+": {
          source: "iana"
        },
        "audio/aptx": {
          source: "iana"
        },
        "audio/asc": {
          source: "iana"
        },
        "audio/atrac-advanced-lossless": {
          source: "iana"
        },
        "audio/atrac-x": {
          source: "iana"
        },
        "audio/atrac3": {
          source: "iana"
        },
        "audio/basic": {
          source: "iana",
          compressible: !1,
          extensions: ["au", "snd"]
        },
        "audio/bv16": {
          source: "iana"
        },
        "audio/bv32": {
          source: "iana"
        },
        "audio/clearmode": {
          source: "iana"
        },
        "audio/cn": {
          source: "iana"
        },
        "audio/dat12": {
          source: "iana"
        },
        "audio/dls": {
          source: "iana"
        },
        "audio/dsr-es201108": {
          source: "iana"
        },
        "audio/dsr-es202050": {
          source: "iana"
        },
        "audio/dsr-es202211": {
          source: "iana"
        },
        "audio/dsr-es202212": {
          source: "iana"
        },
        "audio/dv": {
          source: "iana"
        },
        "audio/dvi4": {
          source: "iana"
        },
        "audio/eac3": {
          source: "iana"
        },
        "audio/encaprtp": {
          source: "iana"
        },
        "audio/evrc": {
          source: "iana"
        },
        "audio/evrc-qcp": {
          source: "iana"
        },
        "audio/evrc0": {
          source: "iana"
        },
        "audio/evrc1": {
          source: "iana"
        },
        "audio/evrcb": {
          source: "iana"
        },
        "audio/evrcb0": {
          source: "iana"
        },
        "audio/evrcb1": {
          source: "iana"
        },
        "audio/evrcnw": {
          source: "iana"
        },
        "audio/evrcnw0": {
          source: "iana"
        },
        "audio/evrcnw1": {
          source: "iana"
        },
        "audio/evrcwb": {
          source: "iana"
        },
        "audio/evrcwb0": {
          source: "iana"
        },
        "audio/evrcwb1": {
          source: "iana"
        },
        "audio/evs": {
          source: "iana"
        },
        "audio/flexfec": {
          source: "iana"
        },
        "audio/fwdred": {
          source: "iana"
        },
        "audio/g711-0": {
          source: "iana"
        },
        "audio/g719": {
          source: "iana"
        },
        "audio/g722": {
          source: "iana"
        },
        "audio/g7221": {
          source: "iana"
        },
        "audio/g723": {
          source: "iana"
        },
        "audio/g726-16": {
          source: "iana"
        },
        "audio/g726-24": {
          source: "iana"
        },
        "audio/g726-32": {
          source: "iana"
        },
        "audio/g726-40": {
          source: "iana"
        },
        "audio/g728": {
          source: "iana"
        },
        "audio/g729": {
          source: "iana"
        },
        "audio/g7291": {
          source: "iana"
        },
        "audio/g729d": {
          source: "iana"
        },
        "audio/g729e": {
          source: "iana"
        },
        "audio/gsm": {
          source: "iana"
        },
        "audio/gsm-efr": {
          source: "iana"
        },
        "audio/gsm-hr-08": {
          source: "iana"
        },
        "audio/ilbc": {
          source: "iana"
        },
        "audio/ip-mr_v2.5": {
          source: "iana"
        },
        "audio/isac": {
          source: "apache"
        },
        "audio/l16": {
          source: "iana"
        },
        "audio/l20": {
          source: "iana"
        },
        "audio/l24": {
          source: "iana",
          compressible: !1
        },
        "audio/l8": {
          source: "iana"
        },
        "audio/lpc": {
          source: "iana"
        },
        "audio/melp": {
          source: "iana"
        },
        "audio/melp1200": {
          source: "iana"
        },
        "audio/melp2400": {
          source: "iana"
        },
        "audio/melp600": {
          source: "iana"
        },
        "audio/mhas": {
          source: "iana"
        },
        "audio/midi": {
          source: "apache",
          extensions: ["mid", "midi", "kar", "rmi"]
        },
        "audio/mobile-xmf": {
          source: "iana",
          extensions: ["mxmf"]
        },
        "audio/mp3": {
          compressible: !1,
          extensions: ["mp3"]
        },
        "audio/mp4": {
          source: "iana",
          compressible: !1,
          extensions: ["m4a", "mp4a"]
        },
        "audio/mp4a-latm": {
          source: "iana"
        },
        "audio/mpa": {
          source: "iana"
        },
        "audio/mpa-robust": {
          source: "iana"
        },
        "audio/mpeg": {
          source: "iana",
          compressible: !1,
          extensions: ["mpga", "mp2", "mp2a", "mp3", "m2a", "m3a"]
        },
        "audio/mpeg4-generic": {
          source: "iana"
        },
        "audio/musepack": {
          source: "apache"
        },
        "audio/ogg": {
          source: "iana",
          compressible: !1,
          extensions: ["oga", "ogg", "spx"]
        },
        "audio/opus": {
          source: "iana"
        },
        "audio/parityfec": {
          source: "iana"
        },
        "audio/pcma": {
          source: "iana"
        },
        "audio/pcma-wb": {
          source: "iana"
        },
        "audio/pcmu": {
          source: "iana"
        },
        "audio/pcmu-wb": {
          source: "iana"
        },
        "audio/prs.sid": {
          source: "iana"
        },
        "audio/qcelp": {
          source: "iana"
        },
        "audio/raptorfec": {
          source: "iana"
        },
        "audio/red": {
          source: "iana"
        },
        "audio/rtp-enc-aescm128": {
          source: "iana"
        },
        "audio/rtp-midi": {
          source: "iana"
        },
        "audio/rtploopback": {
          source: "iana"
        },
        "audio/rtx": {
          source: "iana"
        },
        "audio/s3m": {
          source: "apache",
          extensions: ["s3m"]
        },
        "audio/silk": {
          source: "apache",
          extensions: ["sil"]
        },
        "audio/smv": {
          source: "iana"
        },
        "audio/smv-qcp": {
          source: "iana"
        },
        "audio/smv0": {
          source: "iana"
        },
        "audio/sp-midi": {
          source: "iana"
        },
        "audio/speex": {
          source: "iana"
        },
        "audio/t140c": {
          source: "iana"
        },
        "audio/t38": {
          source: "iana"
        },
        "audio/telephone-event": {
          source: "iana"
        },
        "audio/tetra_acelp": {
          source: "iana"
        },
        "audio/tetra_acelp_bb": {
          source: "iana"
        },
        "audio/tone": {
          source: "iana"
        },
        "audio/uemclip": {
          source: "iana"
        },
        "audio/ulpfec": {
          source: "iana"
        },
        "audio/usac": {
          source: "iana"
        },
        "audio/vdvi": {
          source: "iana"
        },
        "audio/vmr-wb": {
          source: "iana"
        },
        "audio/vnd.3gpp.iufp": {
          source: "iana"
        },
        "audio/vnd.4sb": {
          source: "iana"
        },
        "audio/vnd.audiokoz": {
          source: "iana"
        },
        "audio/vnd.celp": {
          source: "iana"
        },
        "audio/vnd.cisco.nse": {
          source: "iana"
        },
        "audio/vnd.cmles.radio-events": {
          source: "iana"
        },
        "audio/vnd.cns.anp1": {
          source: "iana"
        },
        "audio/vnd.cns.inf1": {
          source: "iana"
        },
        "audio/vnd.dece.audio": {
          source: "iana",
          extensions: ["uva", "uvva"]
        },
        "audio/vnd.digital-winds": {
          source: "iana",
          extensions: ["eol"]
        },
        "audio/vnd.dlna.adts": {
          source: "iana"
        },
        "audio/vnd.dolby.heaac.1": {
          source: "iana"
        },
        "audio/vnd.dolby.heaac.2": {
          source: "iana"
        },
        "audio/vnd.dolby.mlp": {
          source: "iana"
        },
        "audio/vnd.dolby.mps": {
          source: "iana"
        },
        "audio/vnd.dolby.pl2": {
          source: "iana"
        },
        "audio/vnd.dolby.pl2x": {
          source: "iana"
        },
        "audio/vnd.dolby.pl2z": {
          source: "iana"
        },
        "audio/vnd.dolby.pulse.1": {
          source: "iana"
        },
        "audio/vnd.dra": {
          source: "iana",
          extensions: ["dra"]
        },
        "audio/vnd.dts": {
          source: "iana",
          extensions: ["dts"]
        },
        "audio/vnd.dts.hd": {
          source: "iana",
          extensions: ["dtshd"]
        },
        "audio/vnd.dts.uhd": {
          source: "iana"
        },
        "audio/vnd.dvb.file": {
          source: "iana"
        },
        "audio/vnd.everad.plj": {
          source: "iana"
        },
        "audio/vnd.hns.audio": {
          source: "iana"
        },
        "audio/vnd.lucent.voice": {
          source: "iana",
          extensions: ["lvp"]
        },
        "audio/vnd.ms-playready.media.pya": {
          source: "iana",
          extensions: ["pya"]
        },
        "audio/vnd.nokia.mobile-xmf": {
          source: "iana"
        },
        "audio/vnd.nortel.vbk": {
          source: "iana"
        },
        "audio/vnd.nuera.ecelp4800": {
          source: "iana",
          extensions: ["ecelp4800"]
        },
        "audio/vnd.nuera.ecelp7470": {
          source: "iana",
          extensions: ["ecelp7470"]
        },
        "audio/vnd.nuera.ecelp9600": {
          source: "iana",
          extensions: ["ecelp9600"]
        },
        "audio/vnd.octel.sbc": {
          source: "iana"
        },
        "audio/vnd.presonus.multitrack": {
          source: "iana"
        },
        "audio/vnd.qcelp": {
          source: "iana"
        },
        "audio/vnd.rhetorex.32kadpcm": {
          source: "iana"
        },
        "audio/vnd.rip": {
          source: "iana",
          extensions: ["rip"]
        },
        "audio/vnd.rn-realaudio": {
          compressible: !1
        },
        "audio/vnd.sealedmedia.softseal.mpeg": {
          source: "iana"
        },
        "audio/vnd.vmx.cvsd": {
          source: "iana"
        },
        "audio/vnd.wave": {
          compressible: !1
        },
        "audio/vorbis": {
          source: "iana",
          compressible: !1
        },
        "audio/vorbis-config": {
          source: "iana"
        },
        "audio/wav": {
          compressible: !1,
          extensions: ["wav"]
        },
        "audio/wave": {
          compressible: !1,
          extensions: ["wav"]
        },
        "audio/webm": {
          source: "apache",
          compressible: !1,
          extensions: ["weba"]
        },
        "audio/x-aac": {
          source: "apache",
          compressible: !1,
          extensions: ["aac"]
        },
        "audio/x-aiff": {
          source: "apache",
          extensions: ["aif", "aiff", "aifc"]
        },
        "audio/x-caf": {
          source: "apache",
          compressible: !1,
          extensions: ["caf"]
        },
        "audio/x-flac": {
          source: "apache",
          extensions: ["flac"]
        },
        "audio/x-m4a": {
          source: "nginx",
          extensions: ["m4a"]
        },
        "audio/x-matroska": {
          source: "apache",
          extensions: ["mka"]
        },
        "audio/x-mpegurl": {
          source: "apache",
          extensions: ["m3u"]
        },
        "audio/x-ms-wax": {
          source: "apache",
          extensions: ["wax"]
        },
        "audio/x-ms-wma": {
          source: "apache",
          extensions: ["wma"]
        },
        "audio/x-pn-realaudio": {
          source: "apache",
          extensions: ["ram", "ra"]
        },
        "audio/x-pn-realaudio-plugin": {
          source: "apache",
          extensions: ["rmp"]
        },
        "audio/x-realaudio": {
          source: "nginx",
          extensions: ["ra"]
        },
        "audio/x-tta": {
          source: "apache"
        },
        "audio/x-wav": {
          source: "apache",
          extensions: ["wav"]
        },
        "audio/xm": {
          source: "apache",
          extensions: ["xm"]
        },
        "chemical/x-cdx": {
          source: "apache",
          extensions: ["cdx"]
        },
        "chemical/x-cif": {
          source: "apache",
          extensions: ["cif"]
        },
        "chemical/x-cmdf": {
          source: "apache",
          extensions: ["cmdf"]
        },
        "chemical/x-cml": {
          source: "apache",
          extensions: ["cml"]
        },
        "chemical/x-csml": {
          source: "apache",
          extensions: ["csml"]
        },
        "chemical/x-pdb": {
          source: "apache"
        },
        "chemical/x-xyz": {
          source: "apache",
          extensions: ["xyz"]
        },
        "font/collection": {
          source: "iana",
          extensions: ["ttc"]
        },
        "font/otf": {
          source: "iana",
          compressible: !0,
          extensions: ["otf"]
        },
        "font/sfnt": {
          source: "iana"
        },
        "font/ttf": {
          source: "iana",
          compressible: !0,
          extensions: ["ttf"]
        },
        "font/woff": {
          source: "iana",
          extensions: ["woff"]
        },
        "font/woff2": {
          source: "iana",
          extensions: ["woff2"]
        },
        "image/aces": {
          source: "iana",
          extensions: ["exr"]
        },
        "image/apng": {
          compressible: !1,
          extensions: ["apng"]
        },
        "image/avci": {
          source: "iana"
        },
        "image/avcs": {
          source: "iana"
        },
        "image/bmp": {
          source: "iana",
          compressible: !0,
          extensions: ["bmp"]
        },
        "image/cgm": {
          source: "iana",
          extensions: ["cgm"]
        },
        "image/dicom-rle": {
          source: "iana",
          extensions: ["drle"]
        },
        "image/emf": {
          source: "iana",
          extensions: ["emf"]
        },
        "image/fits": {
          source: "iana",
          extensions: ["fits"]
        },
        "image/g3fax": {
          source: "iana",
          extensions: ["g3"]
        },
        "image/gif": {
          source: "iana",
          compressible: !1,
          extensions: ["gif"]
        },
        "image/heic": {
          source: "iana",
          extensions: ["heic"]
        },
        "image/heic-sequence": {
          source: "iana",
          extensions: ["heics"]
        },
        "image/heif": {
          source: "iana",
          extensions: ["heif"]
        },
        "image/heif-sequence": {
          source: "iana",
          extensions: ["heifs"]
        },
        "image/hej2k": {
          source: "iana",
          extensions: ["hej2"]
        },
        "image/hsj2": {
          source: "iana",
          extensions: ["hsj2"]
        },
        "image/ief": {
          source: "iana",
          extensions: ["ief"]
        },
        "image/jls": {
          source: "iana",
          extensions: ["jls"]
        },
        "image/jp2": {
          source: "iana",
          compressible: !1,
          extensions: ["jp2", "jpg2"]
        },
        "image/jpeg": {
          source: "iana",
          compressible: !1,
          extensions: ["jpeg", "jpg", "jpe"]
        },
        "image/jph": {
          source: "iana",
          extensions: ["jph"]
        },
        "image/jphc": {
          source: "iana",
          extensions: ["jhc"]
        },
        "image/jpm": {
          source: "iana",
          compressible: !1,
          extensions: ["jpm"]
        },
        "image/jpx": {
          source: "iana",
          compressible: !1,
          extensions: ["jpx", "jpf"]
        },
        "image/jxr": {
          source: "iana",
          extensions: ["jxr"]
        },
        "image/jxra": {
          source: "iana",
          extensions: ["jxra"]
        },
        "image/jxrs": {
          source: "iana",
          extensions: ["jxrs"]
        },
        "image/jxs": {
          source: "iana",
          extensions: ["jxs"]
        },
        "image/jxsc": {
          source: "iana",
          extensions: ["jxsc"]
        },
        "image/jxsi": {
          source: "iana",
          extensions: ["jxsi"]
        },
        "image/jxss": {
          source: "iana",
          extensions: ["jxss"]
        },
        "image/ktx": {
          source: "iana",
          extensions: ["ktx"]
        },
        "image/naplps": {
          source: "iana"
        },
        "image/pjpeg": {
          compressible: !1
        },
        "image/png": {
          source: "iana",
          compressible: !1,
          extensions: ["png"]
        },
        "image/prs.btif": {
          source: "iana",
          extensions: ["btif"]
        },
        "image/prs.pti": {
          source: "iana",
          extensions: ["pti"]
        },
        "image/pwg-raster": {
          source: "iana"
        },
        "image/sgi": {
          source: "apache",
          extensions: ["sgi"]
        },
        "image/svg+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["svg", "svgz"]
        },
        "image/t38": {
          source: "iana",
          extensions: ["t38"]
        },
        "image/tiff": {
          source: "iana",
          compressible: !1,
          extensions: ["tif", "tiff"]
        },
        "image/tiff-fx": {
          source: "iana",
          extensions: ["tfx"]
        },
        "image/vnd.adobe.photoshop": {
          source: "iana",
          compressible: !0,
          extensions: ["psd"]
        },
        "image/vnd.airzip.accelerator.azv": {
          source: "iana",
          extensions: ["azv"]
        },
        "image/vnd.cns.inf2": {
          source: "iana"
        },
        "image/vnd.dece.graphic": {
          source: "iana",
          extensions: ["uvi", "uvvi", "uvg", "uvvg"]
        },
        "image/vnd.djvu": {
          source: "iana",
          extensions: ["djvu", "djv"]
        },
        "image/vnd.dvb.subtitle": {
          source: "iana",
          extensions: ["sub"]
        },
        "image/vnd.dwg": {
          source: "iana",
          extensions: ["dwg"]
        },
        "image/vnd.dxf": {
          source: "iana",
          extensions: ["dxf"]
        },
        "image/vnd.fastbidsheet": {
          source: "iana",
          extensions: ["fbs"]
        },
        "image/vnd.fpx": {
          source: "iana",
          extensions: ["fpx"]
        },
        "image/vnd.fst": {
          source: "iana",
          extensions: ["fst"]
        },
        "image/vnd.fujixerox.edmics-mmr": {
          source: "iana",
          extensions: ["mmr"]
        },
        "image/vnd.fujixerox.edmics-rlc": {
          source: "iana",
          extensions: ["rlc"]
        },
        "image/vnd.globalgraphics.pgb": {
          source: "iana"
        },
        "image/vnd.microsoft.icon": {
          source: "iana",
          extensions: ["ico"]
        },
        "image/vnd.mix": {
          source: "iana"
        },
        "image/vnd.mozilla.apng": {
          source: "iana"
        },
        "image/vnd.ms-dds": {
          extensions: ["dds"]
        },
        "image/vnd.ms-modi": {
          source: "iana",
          extensions: ["mdi"]
        },
        "image/vnd.ms-photo": {
          source: "apache",
          extensions: ["wdp"]
        },
        "image/vnd.net-fpx": {
          source: "iana",
          extensions: ["npx"]
        },
        "image/vnd.radiance": {
          source: "iana"
        },
        "image/vnd.sealed.png": {
          source: "iana"
        },
        "image/vnd.sealedmedia.softseal.gif": {
          source: "iana"
        },
        "image/vnd.sealedmedia.softseal.jpg": {
          source: "iana"
        },
        "image/vnd.svf": {
          source: "iana"
        },
        "image/vnd.tencent.tap": {
          source: "iana",
          extensions: ["tap"]
        },
        "image/vnd.valve.source.texture": {
          source: "iana",
          extensions: ["vtf"]
        },
        "image/vnd.wap.wbmp": {
          source: "iana",
          extensions: ["wbmp"]
        },
        "image/vnd.xiff": {
          source: "iana",
          extensions: ["xif"]
        },
        "image/vnd.zbrush.pcx": {
          source: "iana",
          extensions: ["pcx"]
        },
        "image/webp": {
          source: "apache",
          extensions: ["webp"]
        },
        "image/wmf": {
          source: "iana",
          extensions: ["wmf"]
        },
        "image/x-3ds": {
          source: "apache",
          extensions: ["3ds"]
        },
        "image/x-cmu-raster": {
          source: "apache",
          extensions: ["ras"]
        },
        "image/x-cmx": {
          source: "apache",
          extensions: ["cmx"]
        },
        "image/x-freehand": {
          source: "apache",
          extensions: ["fh", "fhc", "fh4", "fh5", "fh7"]
        },
        "image/x-icon": {
          source: "apache",
          compressible: !0,
          extensions: ["ico"]
        },
        "image/x-jng": {
          source: "nginx",
          extensions: ["jng"]
        },
        "image/x-mrsid-image": {
          source: "apache",
          extensions: ["sid"]
        },
        "image/x-ms-bmp": {
          source: "nginx",
          compressible: !0,
          extensions: ["bmp"]
        },
        "image/x-pcx": {
          source: "apache",
          extensions: ["pcx"]
        },
        "image/x-pict": {
          source: "apache",
          extensions: ["pic", "pct"]
        },
        "image/x-portable-anymap": {
          source: "apache",
          extensions: ["pnm"]
        },
        "image/x-portable-bitmap": {
          source: "apache",
          extensions: ["pbm"]
        },
        "image/x-portable-graymap": {
          source: "apache",
          extensions: ["pgm"]
        },
        "image/x-portable-pixmap": {
          source: "apache",
          extensions: ["ppm"]
        },
        "image/x-rgb": {
          source: "apache",
          extensions: ["rgb"]
        },
        "image/x-tga": {
          source: "apache",
          extensions: ["tga"]
        },
        "image/x-xbitmap": {
          source: "apache",
          extensions: ["xbm"]
        },
        "image/x-xcf": {
          compressible: !1
        },
        "image/x-xpixmap": {
          source: "apache",
          extensions: ["xpm"]
        },
        "image/x-xwindowdump": {
          source: "apache",
          extensions: ["xwd"]
        },
        "message/cpim": {
          source: "iana"
        },
        "message/delivery-status": {
          source: "iana"
        },
        "message/disposition-notification": {
          source: "iana",
          extensions: [
            "disposition-notification"
          ]
        },
        "message/external-body": {
          source: "iana"
        },
        "message/feedback-report": {
          source: "iana"
        },
        "message/global": {
          source: "iana",
          extensions: ["u8msg"]
        },
        "message/global-delivery-status": {
          source: "iana",
          extensions: ["u8dsn"]
        },
        "message/global-disposition-notification": {
          source: "iana",
          extensions: ["u8mdn"]
        },
        "message/global-headers": {
          source: "iana",
          extensions: ["u8hdr"]
        },
        "message/http": {
          source: "iana",
          compressible: !1
        },
        "message/imdn+xml": {
          source: "iana",
          compressible: !0
        },
        "message/news": {
          source: "iana"
        },
        "message/partial": {
          source: "iana",
          compressible: !1
        },
        "message/rfc822": {
          source: "iana",
          compressible: !0,
          extensions: ["eml", "mime"]
        },
        "message/s-http": {
          source: "iana"
        },
        "message/sip": {
          source: "iana"
        },
        "message/sipfrag": {
          source: "iana"
        },
        "message/tracking-status": {
          source: "iana"
        },
        "message/vnd.si.simp": {
          source: "iana"
        },
        "message/vnd.wfa.wsc": {
          source: "iana",
          extensions: ["wsc"]
        },
        "model/3mf": {
          source: "iana",
          extensions: ["3mf"]
        },
        "model/gltf+json": {
          source: "iana",
          compressible: !0,
          extensions: ["gltf"]
        },
        "model/gltf-binary": {
          source: "iana",
          compressible: !0,
          extensions: ["glb"]
        },
        "model/iges": {
          source: "iana",
          compressible: !1,
          extensions: ["igs", "iges"]
        },
        "model/mesh": {
          source: "iana",
          compressible: !1,
          extensions: ["msh", "mesh", "silo"]
        },
        "model/mtl": {
          source: "iana",
          extensions: ["mtl"]
        },
        "model/obj": {
          source: "iana",
          extensions: ["obj"]
        },
        "model/stl": {
          source: "iana",
          extensions: ["stl"]
        },
        "model/vnd.collada+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["dae"]
        },
        "model/vnd.dwf": {
          source: "iana",
          extensions: ["dwf"]
        },
        "model/vnd.flatland.3dml": {
          source: "iana"
        },
        "model/vnd.gdl": {
          source: "iana",
          extensions: ["gdl"]
        },
        "model/vnd.gs-gdl": {
          source: "apache"
        },
        "model/vnd.gs.gdl": {
          source: "iana"
        },
        "model/vnd.gtw": {
          source: "iana",
          extensions: ["gtw"]
        },
        "model/vnd.moml+xml": {
          source: "iana",
          compressible: !0
        },
        "model/vnd.mts": {
          source: "iana",
          extensions: ["mts"]
        },
        "model/vnd.opengex": {
          source: "iana",
          extensions: ["ogex"]
        },
        "model/vnd.parasolid.transmit.binary": {
          source: "iana",
          extensions: ["x_b"]
        },
        "model/vnd.parasolid.transmit.text": {
          source: "iana",
          extensions: ["x_t"]
        },
        "model/vnd.rosette.annotated-data-model": {
          source: "iana"
        },
        "model/vnd.usdz+zip": {
          source: "iana",
          compressible: !1,
          extensions: ["usdz"]
        },
        "model/vnd.valve.source.compiled-map": {
          source: "iana",
          extensions: ["bsp"]
        },
        "model/vnd.vtu": {
          source: "iana",
          extensions: ["vtu"]
        },
        "model/vrml": {
          source: "iana",
          compressible: !1,
          extensions: ["wrl", "vrml"]
        },
        "model/x3d+binary": {
          source: "apache",
          compressible: !1,
          extensions: ["x3db", "x3dbz"]
        },
        "model/x3d+fastinfoset": {
          source: "iana",
          extensions: ["x3db"]
        },
        "model/x3d+vrml": {
          source: "apache",
          compressible: !1,
          extensions: ["x3dv", "x3dvz"]
        },
        "model/x3d+xml": {
          source: "iana",
          compressible: !0,
          extensions: ["x3d", "x3dz"]
        },
        "model/x3d-vrml": {
          source: "iana",
          extensions: ["x3dv"]
        },
        "multipart/alternative": {
          source: "iana",
          compressible: !1
        },
        "multipart/appledouble": {
          source: "iana"
        },
        "multipart/byteranges": {
          source: "iana"
        },
        "multipart/digest": {
          source: "iana"
        },
        "multipart/encrypted": {
          source: "iana",
          compressible: !1
        },
        "multipart/form-data": {
          source: "iana",
          compressible: !1
        },
        "multipart/header-set": {
          source: "iana"
        },
        "multipart/mixed": {
          source: "iana"
        },
        "multipart/multilingual": {
          source: "iana"
        },
        "multipart/parallel": {
          source: "iana"
        },
        "multipart/related": {
          source: "iana",
          compressible: !1
        },
        "multipart/report": {
          source: "iana"
        },
        "multipart/signed": {
          source: "iana",
          compressible: !1
        },
        "multipart/vnd.bint.med-plus": {
          source: "iana"
        },
        "multipart/voice-message": {
          source: "iana"
        },
        "multipart/x-mixed-replace": {
          source: "iana"
        },
        "text/1d-interleaved-parityfec": {
          source: "iana"
        },
        "text/cache-manifest": {
          source: "iana",
          compressible: !0,
          extensions: ["appcache", "manifest"]
        },
        "text/calendar": {
          source: "iana",
          extensions: ["ics", "ifb"]
        },
        "text/calender": {
          compressible: !0
        },
        "text/cmd": {
          compressible: !0
        },
        "text/coffeescript": {
          extensions: ["coffee", "litcoffee"]
        },
        "text/css": {
          source: "iana",
          charset: "UTF-8",
          compressible: !0,
          extensions: ["css"]
        },
        "text/csv": {
          source: "iana",
          compressible: !0,
          extensions: ["csv"]
        },
        "text/csv-schema": {
          source: "iana"
        },
        "text/directory": {
          source: "iana"
        },
        "text/dns": {
          source: "iana"
        },
        "text/ecmascript": {
          source: "iana"
        },
        "text/encaprtp": {
          source: "iana"
        },
        "text/enriched": {
          source: "iana"
        },
        "text/flexfec": {
          source: "iana"
        },
        "text/fwdred": {
          source: "iana"
        },
        "text/grammar-ref-list": {
          source: "iana"
        },
        "text/html": {
          source: "iana",
          compressible: !0,
          extensions: ["html", "htm", "shtml"]
        },
        "text/jade": {
          extensions: ["jade"]
        },
        "text/javascript": {
          source: "iana",
          compressible: !0
        },
        "text/jcr-cnd": {
          source: "iana"
        },
        "text/jsx": {
          compressible: !0,
          extensions: ["jsx"]
        },
        "text/less": {
          compressible: !0,
          extensions: ["less"]
        },
        "text/markdown": {
          source: "iana",
          compressible: !0,
          extensions: ["markdown", "md"]
        },
        "text/mathml": {
          source: "nginx",
          extensions: ["mml"]
        },
        "text/mdx": {
          compressible: !0,
          extensions: ["mdx"]
        },
        "text/mizar": {
          source: "iana"
        },
        "text/n3": {
          source: "iana",
          charset: "UTF-8",
          compressible: !0,
          extensions: ["n3"]
        },
        "text/parameters": {
          source: "iana",
          charset: "UTF-8"
        },
        "text/parityfec": {
          source: "iana"
        },
        "text/plain": {
          source: "iana",
          compressible: !0,
          extensions: ["txt", "text", "conf", "def", "list", "log", "in", "ini"]
        },
        "text/provenance-notation": {
          source: "iana",
          charset: "UTF-8"
        },
        "text/prs.fallenstein.rst": {
          source: "iana"
        },
        "text/prs.lines.tag": {
          source: "iana",
          extensions: ["dsc"]
        },
        "text/prs.prop.logic": {
          source: "iana"
        },
        "text/raptorfec": {
          source: "iana"
        },
        "text/red": {
          source: "iana"
        },
        "text/rfc822-headers": {
          source: "iana"
        },
        "text/richtext": {
          source: "iana",
          compressible: !0,
          extensions: ["rtx"]
        },
        "text/rtf": {
          source: "iana",
          compressible: !0,
          extensions: ["rtf"]
        },
        "text/rtp-enc-aescm128": {
          source: "iana"
        },
        "text/rtploopback": {
          source: "iana"
        },
        "text/rtx": {
          source: "iana"
        },
        "text/sgml": {
          source: "iana",
          extensions: ["sgml", "sgm"]
        },
        "text/shex": {
          extensions: ["shex"]
        },
        "text/slim": {
          extensions: ["slim", "slm"]
        },
        "text/strings": {
          source: "iana"
        },
        "text/stylus": {
          extensions: ["stylus", "styl"]
        },
        "text/t140": {
          source: "iana"
        },
        "text/tab-separated-values": {
          source: "iana",
          compressible: !0,
          extensions: ["tsv"]
        },
        "text/troff": {
          source: "iana",
          extensions: ["t", "tr", "roff", "man", "me", "ms"]
        },
        "text/turtle": {
          source: "iana",
          charset: "UTF-8",
          extensions: ["ttl"]
        },
        "text/ulpfec": {
          source: "iana"
        },
        "text/uri-list": {
          source: "iana",
          compressible: !0,
          extensions: ["uri", "uris", "urls"]
        },
        "text/vcard": {
          source: "iana",
          compressible: !0,
          extensions: ["vcard"]
        },
        "text/vnd.a": {
          source: "iana"
        },
        "text/vnd.abc": {
          source: "iana"
        },
        "text/vnd.ascii-art": {
          source: "iana"
        },
        "text/vnd.curl": {
          source: "iana",
          extensions: ["curl"]
        },
        "text/vnd.curl.dcurl": {
          source: "apache",
          extensions: ["dcurl"]
        },
        "text/vnd.curl.mcurl": {
          source: "apache",
          extensions: ["mcurl"]
        },
        "text/vnd.curl.scurl": {
          source: "apache",
          extensions: ["scurl"]
        },
        "text/vnd.debian.copyright": {
          source: "iana",
          charset: "UTF-8"
        },
        "text/vnd.dmclientscript": {
          source: "iana"
        },
        "text/vnd.dvb.subtitle": {
          source: "iana",
          extensions: ["sub"]
        },
        "text/vnd.esmertec.theme-descriptor": {
          source: "iana",
          charset: "UTF-8"
        },
        "text/vnd.ficlab.flt": {
          source: "iana"
        },
        "text/vnd.fly": {
          source: "iana",
          extensions: ["fly"]
        },
        "text/vnd.fmi.flexstor": {
          source: "iana",
          extensions: ["flx"]
        },
        "text/vnd.gml": {
          source: "iana"
        },
        "text/vnd.graphviz": {
          source: "iana",
          extensions: ["gv"]
        },
        "text/vnd.hgl": {
          source: "iana"
        },
        "text/vnd.in3d.3dml": {
          source: "iana",
          extensions: ["3dml"]
        },
        "text/vnd.in3d.spot": {
          source: "iana",
          extensions: ["spot"]
        },
        "text/vnd.iptc.newsml": {
          source: "iana"
        },
        "text/vnd.iptc.nitf": {
          source: "iana"
        },
        "text/vnd.latex-z": {
          source: "iana"
        },
        "text/vnd.motorola.reflex": {
          source: "iana"
        },
        "text/vnd.ms-mediapackage": {
          source: "iana"
        },
        "text/vnd.net2phone.commcenter.command": {
          source: "iana"
        },
        "text/vnd.radisys.msml-basic-layout": {
          source: "iana"
        },
        "text/vnd.senx.warpscript": {
          source: "iana"
        },
        "text/vnd.si.uricatalogue": {
          source: "iana"
        },
        "text/vnd.sosi": {
          source: "iana"
        },
        "text/vnd.sun.j2me.app-descriptor": {
          source: "iana",
          charset: "UTF-8",
          extensions: ["jad"]
        },
        "text/vnd.trolltech.linguist": {
          source: "iana",
          charset: "UTF-8"
        },
        "text/vnd.wap.si": {
          source: "iana"
        },
        "text/vnd.wap.sl": {
          source: "iana"
        },
        "text/vnd.wap.wml": {
          source: "iana",
          extensions: ["wml"]
        },
        "text/vnd.wap.wmlscript": {
          source: "iana",
          extensions: ["wmls"]
        },
        "text/vtt": {
          source: "iana",
          charset: "UTF-8",
          compressible: !0,
          extensions: ["vtt"]
        },
        "text/x-asm": {
          source: "apache",
          extensions: ["s", "asm"]
        },
        "text/x-c": {
          source: "apache",
          extensions: ["c", "cc", "cxx", "cpp", "h", "hh", "dic"]
        },
        "text/x-component": {
          source: "nginx",
          extensions: ["htc"]
        },
        "text/x-fortran": {
          source: "apache",
          extensions: ["f", "for", "f77", "f90"]
        },
        "text/x-gwt-rpc": {
          compressible: !0
        },
        "text/x-handlebars-template": {
          extensions: ["hbs"]
        },
        "text/x-java-source": {
          source: "apache",
          extensions: ["java"]
        },
        "text/x-jquery-tmpl": {
          compressible: !0
        },
        "text/x-lua": {
          extensions: ["lua"]
        },
        "text/x-markdown": {
          compressible: !0,
          extensions: ["mkd"]
        },
        "text/x-nfo": {
          source: "apache",
          extensions: ["nfo"]
        },
        "text/x-opml": {
          source: "apache",
          extensions: ["opml"]
        },
        "text/x-org": {
          compressible: !0,
          extensions: ["org"]
        },
        "text/x-pascal": {
          source: "apache",
          extensions: ["p", "pas"]
        },
        "text/x-processing": {
          compressible: !0,
          extensions: ["pde"]
        },
        "text/x-sass": {
          extensions: ["sass"]
        },
        "text/x-scss": {
          extensions: ["scss"]
        },
        "text/x-setext": {
          source: "apache",
          extensions: ["etx"]
        },
        "text/x-sfv": {
          source: "apache",
          extensions: ["sfv"]
        },
        "text/x-suse-ymp": {
          compressible: !0,
          extensions: ["ymp"]
        },
        "text/x-uuencode": {
          source: "apache",
          extensions: ["uu"]
        },
        "text/x-vcalendar": {
          source: "apache",
          extensions: ["vcs"]
        },
        "text/x-vcard": {
          source: "apache",
          extensions: ["vcf"]
        },
        "text/xml": {
          source: "iana",
          compressible: !0,
          extensions: ["xml"]
        },
        "text/xml-external-parsed-entity": {
          source: "iana"
        },
        "text/yaml": {
          extensions: ["yaml", "yml"]
        },
        "video/1d-interleaved-parityfec": {
          source: "iana"
        },
        "video/3gpp": {
          source: "iana",
          extensions: ["3gp", "3gpp"]
        },
        "video/3gpp-tt": {
          source: "iana"
        },
        "video/3gpp2": {
          source: "iana",
          extensions: ["3g2"]
        },
        "video/bmpeg": {
          source: "iana"
        },
        "video/bt656": {
          source: "iana"
        },
        "video/celb": {
          source: "iana"
        },
        "video/dv": {
          source: "iana"
        },
        "video/encaprtp": {
          source: "iana"
        },
        "video/flexfec": {
          source: "iana"
        },
        "video/h261": {
          source: "iana",
          extensions: ["h261"]
        },
        "video/h263": {
          source: "iana",
          extensions: ["h263"]
        },
        "video/h263-1998": {
          source: "iana"
        },
        "video/h263-2000": {
          source: "iana"
        },
        "video/h264": {
          source: "iana",
          extensions: ["h264"]
        },
        "video/h264-rcdo": {
          source: "iana"
        },
        "video/h264-svc": {
          source: "iana"
        },
        "video/h265": {
          source: "iana"
        },
        "video/iso.segment": {
          source: "iana"
        },
        "video/jpeg": {
          source: "iana",
          extensions: ["jpgv"]
        },
        "video/jpeg2000": {
          source: "iana"
        },
        "video/jpm": {
          source: "apache",
          extensions: ["jpm", "jpgm"]
        },
        "video/mj2": {
          source: "iana",
          extensions: ["mj2", "mjp2"]
        },
        "video/mp1s": {
          source: "iana"
        },
        "video/mp2p": {
          source: "iana"
        },
        "video/mp2t": {
          source: "iana",
          extensions: ["ts"]
        },
        "video/mp4": {
          source: "iana",
          compressible: !1,
          extensions: ["mp4", "mp4v", "mpg4"]
        },
        "video/mp4v-es": {
          source: "iana"
        },
        "video/mpeg": {
          source: "iana",
          compressible: !1,
          extensions: ["mpeg", "mpg", "mpe", "m1v", "m2v"]
        },
        "video/mpeg4-generic": {
          source: "iana"
        },
        "video/mpv": {
          source: "iana"
        },
        "video/nv": {
          source: "iana"
        },
        "video/ogg": {
          source: "iana",
          compressible: !1,
          extensions: ["ogv"]
        },
        "video/parityfec": {
          source: "iana"
        },
        "video/pointer": {
          source: "iana"
        },
        "video/quicktime": {
          source: "iana",
          compressible: !1,
          extensions: ["qt", "mov"]
        },
        "video/raptorfec": {
          source: "iana"
        },
        "video/raw": {
          source: "iana"
        },
        "video/rtp-enc-aescm128": {
          source: "iana"
        },
        "video/rtploopback": {
          source: "iana"
        },
        "video/rtx": {
          source: "iana"
        },
        "video/smpte291": {
          source: "iana"
        },
        "video/smpte292m": {
          source: "iana"
        },
        "video/ulpfec": {
          source: "iana"
        },
        "video/vc1": {
          source: "iana"
        },
        "video/vc2": {
          source: "iana"
        },
        "video/vnd.cctv": {
          source: "iana"
        },
        "video/vnd.dece.hd": {
          source: "iana",
          extensions: ["uvh", "uvvh"]
        },
        "video/vnd.dece.mobile": {
          source: "iana",
          extensions: ["uvm", "uvvm"]
        },
        "video/vnd.dece.mp4": {
          source: "iana"
        },
        "video/vnd.dece.pd": {
          source: "iana",
          extensions: ["uvp", "uvvp"]
        },
        "video/vnd.dece.sd": {
          source: "iana",
          extensions: ["uvs", "uvvs"]
        },
        "video/vnd.dece.video": {
          source: "iana",
          extensions: ["uvv", "uvvv"]
        },
        "video/vnd.directv.mpeg": {
          source: "iana"
        },
        "video/vnd.directv.mpeg-tts": {
          source: "iana"
        },
        "video/vnd.dlna.mpeg-tts": {
          source: "iana"
        },
        "video/vnd.dvb.file": {
          source: "iana",
          extensions: ["dvb"]
        },
        "video/vnd.fvt": {
          source: "iana",
          extensions: ["fvt"]
        },
        "video/vnd.hns.video": {
          source: "iana"
        },
        "video/vnd.iptvforum.1dparityfec-1010": {
          source: "iana"
        },
        "video/vnd.iptvforum.1dparityfec-2005": {
          source: "iana"
        },
        "video/vnd.iptvforum.2dparityfec-1010": {
          source: "iana"
        },
        "video/vnd.iptvforum.2dparityfec-2005": {
          source: "iana"
        },
        "video/vnd.iptvforum.ttsavc": {
          source: "iana"
        },
        "video/vnd.iptvforum.ttsmpeg2": {
          source: "iana"
        },
        "video/vnd.motorola.video": {
          source: "iana"
        },
        "video/vnd.motorola.videop": {
          source: "iana"
        },
        "video/vnd.mpegurl": {
          source: "iana",
          extensions: ["mxu", "m4u"]
        },
        "video/vnd.ms-playready.media.pyv": {
          source: "iana",
          extensions: ["pyv"]
        },
        "video/vnd.nokia.interleaved-multimedia": {
          source: "iana"
        },
        "video/vnd.nokia.mp4vr": {
          source: "iana"
        },
        "video/vnd.nokia.videovoip": {
          source: "iana"
        },
        "video/vnd.objectvideo": {
          source: "iana"
        },
        "video/vnd.radgamettools.bink": {
          source: "iana"
        },
        "video/vnd.radgamettools.smacker": {
          source: "iana"
        },
        "video/vnd.sealed.mpeg1": {
          source: "iana"
        },
        "video/vnd.sealed.mpeg4": {
          source: "iana"
        },
        "video/vnd.sealed.swf": {
          source: "iana"
        },
        "video/vnd.sealedmedia.softseal.mov": {
          source: "iana"
        },
        "video/vnd.uvvu.mp4": {
          source: "iana",
          extensions: ["uvu", "uvvu"]
        },
        "video/vnd.vivo": {
          source: "iana",
          extensions: ["viv"]
        },
        "video/vnd.youtube.yt": {
          source: "iana"
        },
        "video/vp8": {
          source: "iana"
        },
        "video/webm": {
          source: "apache",
          compressible: !1,
          extensions: ["webm"]
        },
        "video/x-f4v": {
          source: "apache",
          extensions: ["f4v"]
        },
        "video/x-fli": {
          source: "apache",
          extensions: ["fli"]
        },
        "video/x-flv": {
          source: "apache",
          compressible: !1,
          extensions: ["flv"]
        },
        "video/x-m4v": {
          source: "apache",
          extensions: ["m4v"]
        },
        "video/x-matroska": {
          source: "apache",
          compressible: !1,
          extensions: ["mkv", "mk3d", "mks"]
        },
        "video/x-mng": {
          source: "apache",
          extensions: ["mng"]
        },
        "video/x-ms-asf": {
          source: "apache",
          extensions: ["asf", "asx"]
        },
        "video/x-ms-vob": {
          source: "apache",
          extensions: ["vob"]
        },
        "video/x-ms-wm": {
          source: "apache",
          extensions: ["wm"]
        },
        "video/x-ms-wmv": {
          source: "apache",
          compressible: !1,
          extensions: ["wmv"]
        },
        "video/x-ms-wmx": {
          source: "apache",
          extensions: ["wmx"]
        },
        "video/x-ms-wvx": {
          source: "apache",
          extensions: ["wvx"]
        },
        "video/x-msvideo": {
          source: "apache",
          extensions: ["avi"]
        },
        "video/x-sgi-movie": {
          source: "apache",
          extensions: ["movie"]
        },
        "video/x-smv": {
          source: "apache",
          extensions: ["smv"]
        },
        "x-conference/x-cooltalk": {
          source: "apache",
          extensions: ["ice"]
        },
        "x-shader/x-fragment": {
          compressible: !0
        },
        "x-shader/x-vertex": {
          compressible: !0
        }
      };
    }, {}], 28: [function(g, L, v) {
      /*!
       * mime-db
       * Copyright(c) 2014 Jonathan Ong
       * MIT Licensed
       */
      L.exports = g("./db.json");
    }, { "./db.json": 27 }], 29: [function(g, L, v) {
      var f = g("mime-db"), d = g("path").extname, h = /^\s*([^;\s]*)(?:;|\s|$)/, b = /^text\//i;
      v.charset = m, v.charsets = { lookup: m }, v.contentType = n, v.extension = t, v.extensions = /* @__PURE__ */ Object.create(null), v.lookup = o, v.types = /* @__PURE__ */ Object.create(null), a(v.extensions, v.types);
      function m(_) {
        if (!_ || typeof _ != "string")
          return !1;
        var T = h.exec(_), U = T && f[T[1].toLowerCase()];
        return U && U.charset ? U.charset : T && b.test(T[1]) ? "UTF-8" : !1;
      }
      function n(_) {
        if (!_ || typeof _ != "string")
          return !1;
        var T = _.indexOf("/") === -1 ? v.lookup(_) : _;
        if (!T)
          return !1;
        if (T.indexOf("charset") === -1) {
          var U = v.charset(T);
          U && (T += "; charset=" + U.toLowerCase());
        }
        return T;
      }
      function t(_) {
        if (!_ || typeof _ != "string")
          return !1;
        var T = h.exec(_), U = T && v.extensions[T[1].toLowerCase()];
        return !U || !U.length ? !1 : U[0];
      }
      function o(_) {
        if (!_ || typeof _ != "string")
          return !1;
        var T = d("x." + _).toLowerCase().substr(1);
        return T && v.types[T] || !1;
      }
      function a(_, T) {
        var U = ["nginx", "apache", void 0, "iana"];
        Object.keys(f).forEach(function(x) {
          var u = f[x], y = u.extensions;
          if (!(!y || !y.length)) {
            _[x] = y;
            for (var S = 0; S < y.length; S++) {
              var k = y[S];
              if (T[k]) {
                var O = U.indexOf(f[T[k]].source), q = U.indexOf(u.source);
                if (T[k] !== "application/octet-stream" && (O > q || O === q && T[k].substr(0, 12) === "application/"))
                  continue;
              }
              T[k] = x;
            }
          }
        });
      }
    }, { "mime-db": 28, path: 30 }], 30: [function(g, L, v) {
      (function(f) {
        function d(n, t) {
          for (var o = 0, a = n.length - 1; a >= 0; a--) {
            var _ = n[a];
            _ === "." ? n.splice(a, 1) : _ === ".." ? (n.splice(a, 1), o++) : o && (n.splice(a, 1), o--);
          }
          if (t)
            for (; o--; o)
              n.unshift("..");
          return n;
        }
        v.resolve = function() {
          for (var n = "", t = !1, o = arguments.length - 1; o >= -1 && !t; o--) {
            var a = o >= 0 ? arguments[o] : f.cwd();
            if (typeof a != "string")
              throw new TypeError("Arguments to path.resolve must be strings");
            if (!a)
              continue;
            n = a + "/" + n, t = a.charAt(0) === "/";
          }
          return n = d(b(n.split("/"), function(_) {
            return !!_;
          }), !t).join("/"), (t ? "/" : "") + n || ".";
        }, v.normalize = function(n) {
          var t = v.isAbsolute(n), o = m(n, -1) === "/";
          return n = d(b(n.split("/"), function(a) {
            return !!a;
          }), !t).join("/"), !n && !t && (n = "."), n && o && (n += "/"), (t ? "/" : "") + n;
        }, v.isAbsolute = function(n) {
          return n.charAt(0) === "/";
        }, v.join = function() {
          var n = Array.prototype.slice.call(arguments, 0);
          return v.normalize(b(n, function(t, o) {
            if (typeof t != "string")
              throw new TypeError("Arguments to path.join must be strings");
            return t;
          }).join("/"));
        }, v.relative = function(n, t) {
          n = v.resolve(n).substr(1), t = v.resolve(t).substr(1);
          function o(u) {
            for (var y = 0; y < u.length && u[y] === ""; y++)
              ;
            for (var S = u.length - 1; S >= 0 && u[S] === ""; S--)
              ;
            return y > S ? [] : u.slice(y, S - y + 1);
          }
          for (var a = o(n.split("/")), _ = o(t.split("/")), T = Math.min(a.length, _.length), U = T, A = 0; A < T; A++)
            if (a[A] !== _[A]) {
              U = A;
              break;
            }
          for (var x = [], A = U; A < a.length; A++)
            x.push("..");
          return x = x.concat(_.slice(U)), x.join("/");
        }, v.sep = "/", v.delimiter = ":", v.dirname = function(n) {
          if (typeof n != "string" && (n = n + ""), n.length === 0)
            return ".";
          for (var t = n.charCodeAt(0), o = t === 47, a = -1, _ = !0, T = n.length - 1; T >= 1; --T)
            if (t = n.charCodeAt(T), t === 47) {
              if (!_) {
                a = T;
                break;
              }
            } else
              _ = !1;
          return a === -1 ? o ? "/" : "." : o && a === 1 ? "/" : n.slice(0, a);
        };
        function h(n) {
          typeof n != "string" && (n = n + "");
          var t = 0, o = -1, a = !0, _;
          for (_ = n.length - 1; _ >= 0; --_)
            if (n.charCodeAt(_) === 47) {
              if (!a) {
                t = _ + 1;
                break;
              }
            } else
              o === -1 && (a = !1, o = _ + 1);
          return o === -1 ? "" : n.slice(t, o);
        }
        v.basename = function(n, t) {
          var o = h(n);
          return t && o.substr(-1 * t.length) === t && (o = o.substr(0, o.length - t.length)), o;
        }, v.extname = function(n) {
          typeof n != "string" && (n = n + "");
          for (var t = -1, o = 0, a = -1, _ = !0, T = 0, U = n.length - 1; U >= 0; --U) {
            var A = n.charCodeAt(U);
            if (A === 47) {
              if (!_) {
                o = U + 1;
                break;
              }
              continue;
            }
            a === -1 && (_ = !1, a = U + 1), A === 46 ? t === -1 ? t = U : T !== 1 && (T = 1) : t !== -1 && (T = -1);
          }
          return t === -1 || a === -1 || // We saw a non-dot character immediately before the dot
          T === 0 || // The (right-most) trimmed path component is exactly '..'
          T === 1 && t === a - 1 && t === o + 1 ? "" : n.slice(t, a);
        };
        function b(n, t) {
          if (n.filter)
            return n.filter(t);
          for (var o = [], a = 0; a < n.length; a++)
            t(n[a], a, n) && o.push(n[a]);
          return o;
        }
        var m = "ab".substr(-1) === "b" ? function(n, t, o) {
          return n.substr(t, o);
        } : function(n, t, o) {
          return t < 0 && (t = n.length + t), n.substr(t, o);
        };
      }).call(this, g("_process"));
    }, { _process: 32 }], 31: [function(g, L, v) {
      (function(f) {
        typeof f > "u" || !f.version || f.version.indexOf("v0.") === 0 || f.version.indexOf("v1.") === 0 && f.version.indexOf("v1.8.") !== 0 ? L.exports = { nextTick: d } : L.exports = f;
        function d(h, b, m, n) {
          if (typeof h != "function")
            throw new TypeError('"callback" argument must be a function');
          var t = arguments.length, o, a;
          switch (t) {
            case 0:
            case 1:
              return f.nextTick(h);
            case 2:
              return f.nextTick(function() {
                h.call(null, b);
              });
            case 3:
              return f.nextTick(function() {
                h.call(null, b, m);
              });
            case 4:
              return f.nextTick(function() {
                h.call(null, b, m, n);
              });
            default:
              for (o = new Array(t - 1), a = 0; a < o.length; )
                o[a++] = arguments[a];
              return f.nextTick(function() {
                h.apply(null, o);
              });
          }
        }
      }).call(this, g("_process"));
    }, { _process: 32 }], 32: [function(g, L, v) {
      var f = L.exports = {}, d, h;
      function b() {
        throw new Error("setTimeout has not been defined");
      }
      function m() {
        throw new Error("clearTimeout has not been defined");
      }
      (function() {
        try {
          typeof setTimeout == "function" ? d = setTimeout : d = b;
        } catch {
          d = b;
        }
        try {
          typeof clearTimeout == "function" ? h = clearTimeout : h = m;
        } catch {
          h = m;
        }
      })();
      function n(y) {
        if (d === setTimeout)
          return setTimeout(y, 0);
        if ((d === b || !d) && setTimeout)
          return d = setTimeout, setTimeout(y, 0);
        try {
          return d(y, 0);
        } catch {
          try {
            return d.call(null, y, 0);
          } catch {
            return d.call(this, y, 0);
          }
        }
      }
      function t(y) {
        if (h === clearTimeout)
          return clearTimeout(y);
        if ((h === m || !h) && clearTimeout)
          return h = clearTimeout, clearTimeout(y);
        try {
          return h(y);
        } catch {
          try {
            return h.call(null, y);
          } catch {
            return h.call(this, y);
          }
        }
      }
      var o = [], a = !1, _, T = -1;
      function U() {
        !a || !_ || (a = !1, _.length ? o = _.concat(o) : T = -1, o.length && A());
      }
      function A() {
        if (!a) {
          var y = n(U);
          a = !0;
          for (var S = o.length; S; ) {
            for (_ = o, o = []; ++T < S; )
              _ && _[T].run();
            T = -1, S = o.length;
          }
          _ = null, a = !1, t(y);
        }
      }
      f.nextTick = function(y) {
        var S = new Array(arguments.length - 1);
        if (arguments.length > 1)
          for (var k = 1; k < arguments.length; k++)
            S[k - 1] = arguments[k];
        o.push(new x(y, S)), o.length === 1 && !a && n(A);
      };
      function x(y, S) {
        this.fun = y, this.array = S;
      }
      x.prototype.run = function() {
        this.fun.apply(null, this.array);
      }, f.title = "browser", f.browser = !0, f.env = {}, f.argv = [], f.version = "", f.versions = {};
      function u() {
      }
      f.on = u, f.addListener = u, f.once = u, f.off = u, f.removeListener = u, f.removeAllListeners = u, f.emit = u, f.prependListener = u, f.prependOnceListener = u, f.listeners = function(y) {
        return [];
      }, f.binding = function(y) {
        throw new Error("process.binding is not supported");
      }, f.cwd = function() {
        return "/";
      }, f.chdir = function(y) {
        throw new Error("process.chdir is not supported");
      }, f.umask = function() {
        return 0;
      };
    }, {}], 33: [function(g, L, v) {
      (function(f) {
        (function(d) {
          var h = typeof v == "object" && v && !v.nodeType && v, b = typeof L == "object" && L && !L.nodeType && L, m = typeof f == "object" && f;
          (m.global === m || m.window === m || m.self === m) && (d = m);
          var n, t = 2147483647, o = 36, a = 1, _ = 26, T = 38, U = 700, A = 72, x = 128, u = "-", y = /^xn--/, S = /[^\x20-\x7E]/, k = /[\x2E\u3002\uFF0E\uFF61]/g, O = {
            overflow: "Overflow: input needs wider integers to process",
            "not-basic": "Illegal input >= 0x80 (not a basic code point)",
            "invalid-input": "Invalid input"
          }, q = o - a, H = Math.floor, Y = String.fromCharCode, C;
          function V(j) {
            throw new RangeError(O[j]);
          }
          function F(j, l) {
            for (var w = j.length, R = []; w--; )
              R[w] = l(j[w]);
            return R;
          }
          function ne(j, l) {
            var w = j.split("@"), R = "";
            w.length > 1 && (R = w[0] + "@", j = w[1]), j = j.replace(k, ".");
            var I = j.split("."), B = F(I, l).join(".");
            return R + B;
          }
          function ae(j) {
            for (var l = [], w = 0, R = j.length, I, B; w < R; )
              I = j.charCodeAt(w++), I >= 55296 && I <= 56319 && w < R ? (B = j.charCodeAt(w++), (B & 64512) == 56320 ? l.push(((I & 1023) << 10) + (B & 1023) + 65536) : (l.push(I), w--)) : l.push(I);
            return l;
          }
          function oe(j) {
            return F(j, function(l) {
              var w = "";
              return l > 65535 && (l -= 65536, w += Y(l >>> 10 & 1023 | 55296), l = 56320 | l & 1023), w += Y(l), w;
            }).join("");
          }
          function ce(j) {
            return j - 48 < 10 ? j - 22 : j - 65 < 26 ? j - 65 : j - 97 < 26 ? j - 97 : o;
          }
          function G(j, l) {
            return j + 22 + 75 * (j < 26) - ((l != 0) << 5);
          }
          function re(j, l, w) {
            var R = 0;
            for (j = w ? H(j / U) : j >> 1, j += H(j / l); j > q * _ >> 1; R += o)
              j = H(j / q);
            return H(R + (q + 1) * j / (j + T));
          }
          function te(j) {
            var l = [], w = j.length, R, I = 0, B = x, N = A, K, Z, ee, r, p, M, W, $, X;
            for (K = j.lastIndexOf(u), K < 0 && (K = 0), Z = 0; Z < K; ++Z)
              j.charCodeAt(Z) >= 128 && V("not-basic"), l.push(j.charCodeAt(Z));
            for (ee = K > 0 ? K + 1 : 0; ee < w; ) {
              for (r = I, p = 1, M = o; ee >= w && V("invalid-input"), W = ce(j.charCodeAt(ee++)), (W >= o || W > H((t - I) / p)) && V("overflow"), I += W * p, $ = M <= N ? a : M >= N + _ ? _ : M - N, !(W < $); M += o)
                X = o - $, p > H(t / X) && V("overflow"), p *= X;
              R = l.length + 1, N = re(I - r, R, r == 0), H(I / R) > t - B && V("overflow"), B += H(I / R), I %= R, l.splice(I++, 0, B);
            }
            return oe(l);
          }
          function de(j) {
            var l, w, R, I, B, N, K, Z, ee, r, p, M = [], W, $, X, J;
            for (j = ae(j), W = j.length, l = x, w = 0, B = A, N = 0; N < W; ++N)
              p = j[N], p < 128 && M.push(Y(p));
            for (R = I = M.length, I && M.push(u); R < W; ) {
              for (K = t, N = 0; N < W; ++N)
                p = j[N], p >= l && p < K && (K = p);
              for ($ = R + 1, K - l > H((t - w) / $) && V("overflow"), w += (K - l) * $, l = K, N = 0; N < W; ++N)
                if (p = j[N], p < l && ++w > t && V("overflow"), p == l) {
                  for (Z = w, ee = o; r = ee <= B ? a : ee >= B + _ ? _ : ee - B, !(Z < r); ee += o)
                    J = Z - r, X = o - r, M.push(
                      Y(G(r + J % X, 0))
                    ), Z = H(J / X);
                  M.push(Y(G(Z, 0))), B = re(w, $, R == I), w = 0, ++R;
                }
              ++w, ++l;
            }
            return M.join("");
          }
          function le(j) {
            return ne(j, function(l) {
              return y.test(l) ? te(l.slice(4).toLowerCase()) : l;
            });
          }
          function z(j) {
            return ne(j, function(l) {
              return S.test(l) ? "xn--" + de(l) : l;
            });
          }
          if (n = {
            /**
             * A string representing the current Punycode.js version number.
             * @memberOf punycode
             * @type String
             */
            version: "1.4.1",
            /**
             * An object of methods to convert from JavaScript's internal character
             * representation (UCS-2) to Unicode code points, and back.
             * @see <https://mathiasbynens.be/notes/javascript-encoding>
             * @memberOf punycode
             * @type Object
             */
            ucs2: {
              decode: ae,
              encode: oe
            },
            decode: te,
            encode: de,
            toASCII: z,
            toUnicode: le
          }, h && b)
            if (L.exports == h)
              b.exports = n;
            else
              for (C in n)
                n.hasOwnProperty(C) && (h[C] = n[C]);
          else
            d.punycode = n;
        })(this);
      }).call(this, typeof ue < "u" ? ue : typeof self < "u" ? self : typeof window < "u" ? window : {});
    }, {}], 34: [function(g, L, v) {
      function f(h, b) {
        return Object.prototype.hasOwnProperty.call(h, b);
      }
      L.exports = function(h, b, m, n) {
        b = b || "&", m = m || "=";
        var t = {};
        if (typeof h != "string" || h.length === 0)
          return t;
        var o = /\+/g;
        h = h.split(b);
        var a = 1e3;
        n && typeof n.maxKeys == "number" && (a = n.maxKeys);
        var _ = h.length;
        a > 0 && _ > a && (_ = a);
        for (var T = 0; T < _; ++T) {
          var U = h[T].replace(o, "%20"), A = U.indexOf(m), x, u, y, S;
          A >= 0 ? (x = U.substr(0, A), u = U.substr(A + 1)) : (x = U, u = ""), y = decodeURIComponent(x), S = decodeURIComponent(u), f(t, y) ? d(t[y]) ? t[y].push(S) : t[y] = [t[y], S] : t[y] = S;
        }
        return t;
      };
      var d = Array.isArray || function(h) {
        return Object.prototype.toString.call(h) === "[object Array]";
      };
    }, {}], 35: [function(g, L, v) {
      var f = function(m) {
        switch (typeof m) {
          case "string":
            return m;
          case "boolean":
            return m ? "true" : "false";
          case "number":
            return isFinite(m) ? m : "";
          default:
            return "";
        }
      };
      L.exports = function(m, n, t, o) {
        return n = n || "&", t = t || "=", m === null && (m = void 0), typeof m == "object" ? h(b(m), function(a) {
          var _ = encodeURIComponent(f(a)) + t;
          return d(m[a]) ? h(m[a], function(T) {
            return _ + encodeURIComponent(f(T));
          }).join(n) : _ + encodeURIComponent(f(m[a]));
        }).join(n) : o ? encodeURIComponent(f(o)) + t + encodeURIComponent(f(m)) : "";
      };
      var d = Array.isArray || function(m) {
        return Object.prototype.toString.call(m) === "[object Array]";
      };
      function h(m, n) {
        if (m.map)
          return m.map(n);
        for (var t = [], o = 0; o < m.length; o++)
          t.push(n(m[o], o));
        return t;
      }
      var b = Object.keys || function(m) {
        var n = [];
        for (var t in m)
          Object.prototype.hasOwnProperty.call(m, t) && n.push(t);
        return n;
      };
    }, {}], 36: [function(g, L, v) {
      v.decode = v.parse = g("./decode"), v.encode = v.stringify = g("./encode");
    }, { "./decode": 34, "./encode": 35 }], 37: [function(g, L, v) {
      L.exports = g("./lib/_stream_duplex.js");
    }, { "./lib/_stream_duplex.js": 38 }], 38: [function(g, L, v) {
      var f = g("process-nextick-args"), d = Object.keys || function(U) {
        var A = [];
        for (var x in U)
          A.push(x);
        return A;
      };
      L.exports = a;
      var h = Object.create(g("core-util-is"));
      h.inherits = g("inherits");
      var b = g("./_stream_readable"), m = g("./_stream_writable");
      h.inherits(a, b);
      for (var n = d(m.prototype), t = 0; t < n.length; t++) {
        var o = n[t];
        a.prototype[o] || (a.prototype[o] = m.prototype[o]);
      }
      function a(U) {
        if (!(this instanceof a))
          return new a(U);
        b.call(this, U), m.call(this, U), U && U.readable === !1 && (this.readable = !1), U && U.writable === !1 && (this.writable = !1), this.allowHalfOpen = !0, U && U.allowHalfOpen === !1 && (this.allowHalfOpen = !1), this.once("end", _);
      }
      Object.defineProperty(a.prototype, "writableHighWaterMark", {
        // making it explicit this property is not enumerable
        // because otherwise some prototype manipulation in
        // userland will fail
        enumerable: !1,
        get: function() {
          return this._writableState.highWaterMark;
        }
      });
      function _() {
        this.allowHalfOpen || this._writableState.ended || f.nextTick(T, this);
      }
      function T(U) {
        U.end();
      }
      Object.defineProperty(a.prototype, "destroyed", {
        get: function() {
          return this._readableState === void 0 || this._writableState === void 0 ? !1 : this._readableState.destroyed && this._writableState.destroyed;
        },
        set: function(U) {
          this._readableState === void 0 || this._writableState === void 0 || (this._readableState.destroyed = U, this._writableState.destroyed = U);
        }
      }), a.prototype._destroy = function(U, A) {
        this.push(null), this.end(), f.nextTick(A, U);
      };
    }, { "./_stream_readable": 40, "./_stream_writable": 42, "core-util-is": 19, inherits: 24, "process-nextick-args": 31 }], 39: [function(g, L, v) {
      L.exports = h;
      var f = g("./_stream_transform"), d = Object.create(g("core-util-is"));
      d.inherits = g("inherits"), d.inherits(h, f);
      function h(b) {
        if (!(this instanceof h))
          return new h(b);
        f.call(this, b);
      }
      h.prototype._transform = function(b, m, n) {
        n(null, b);
      };
    }, { "./_stream_transform": 41, "core-util-is": 19, inherits: 24 }], 40: [function(g, L, v) {
      (function(f, d) {
        var h = g("process-nextick-args");
        L.exports = H;
        var b = g("isarray"), m;
        H.ReadableState = q, g("events").EventEmitter;
        var n = function(r, p) {
          return r.listeners(p).length;
        }, t = g("./internal/streams/stream"), o = g("safe-buffer").Buffer, a = d.Uint8Array || function() {
        };
        function _(r) {
          return o.from(r);
        }
        function T(r) {
          return o.isBuffer(r) || r instanceof a;
        }
        var U = Object.create(g("core-util-is"));
        U.inherits = g("inherits");
        var A = g("util"), x = void 0;
        A && A.debuglog ? x = A.debuglog("stream") : x = function() {
        };
        var u = g("./internal/streams/BufferList"), y = g("./internal/streams/destroy"), S;
        U.inherits(H, t);
        var k = ["error", "close", "destroy", "pause", "resume"];
        function O(r, p, M) {
          if (typeof r.prependListener == "function")
            return r.prependListener(p, M);
          !r._events || !r._events[p] ? r.on(p, M) : b(r._events[p]) ? r._events[p].unshift(M) : r._events[p] = [M, r._events[p]];
        }
        function q(r, p) {
          m = m || g("./_stream_duplex"), r = r || {};
          var M = p instanceof m;
          this.objectMode = !!r.objectMode, M && (this.objectMode = this.objectMode || !!r.readableObjectMode);
          var W = r.highWaterMark, $ = r.readableHighWaterMark, X = this.objectMode ? 16 : 16 * 1024;
          W || W === 0 ? this.highWaterMark = W : M && ($ || $ === 0) ? this.highWaterMark = $ : this.highWaterMark = X, this.highWaterMark = Math.floor(this.highWaterMark), this.buffer = new u(), this.length = 0, this.pipes = null, this.pipesCount = 0, this.flowing = null, this.ended = !1, this.endEmitted = !1, this.reading = !1, this.sync = !0, this.needReadable = !1, this.emittedReadable = !1, this.readableListening = !1, this.resumeScheduled = !1, this.destroyed = !1, this.defaultEncoding = r.defaultEncoding || "utf8", this.awaitDrain = 0, this.readingMore = !1, this.decoder = null, this.encoding = null, r.encoding && (S || (S = g("string_decoder/").StringDecoder), this.decoder = new S(r.encoding), this.encoding = r.encoding);
        }
        function H(r) {
          if (m = m || g("./_stream_duplex"), !(this instanceof H))
            return new H(r);
          this._readableState = new q(r, this), this.readable = !0, r && (typeof r.read == "function" && (this._read = r.read), typeof r.destroy == "function" && (this._destroy = r.destroy)), t.call(this);
        }
        Object.defineProperty(H.prototype, "destroyed", {
          get: function() {
            return this._readableState === void 0 ? !1 : this._readableState.destroyed;
          },
          set: function(r) {
            this._readableState && (this._readableState.destroyed = r);
          }
        }), H.prototype.destroy = y.destroy, H.prototype._undestroy = y.undestroy, H.prototype._destroy = function(r, p) {
          this.push(null), p(r);
        }, H.prototype.push = function(r, p) {
          var M = this._readableState, W;
          return M.objectMode ? W = !0 : typeof r == "string" && (p = p || M.defaultEncoding, p !== M.encoding && (r = o.from(r, p), p = ""), W = !0), Y(this, r, p, !1, W);
        }, H.prototype.unshift = function(r) {
          return Y(this, r, null, !0, !1);
        };
        function Y(r, p, M, W, $) {
          var X = r._readableState;
          if (p === null)
            X.reading = !1, ce(r, X);
          else {
            var J;
            $ || (J = V(X, p)), J ? r.emit("error", J) : X.objectMode || p && p.length > 0 ? (typeof p != "string" && !X.objectMode && Object.getPrototypeOf(p) !== o.prototype && (p = _(p)), W ? X.endEmitted ? r.emit("error", new Error("stream.unshift() after end event")) : C(r, X, p, !0) : X.ended ? r.emit("error", new Error("stream.push() after EOF")) : (X.reading = !1, X.decoder && !M ? (p = X.decoder.write(p), X.objectMode || p.length !== 0 ? C(r, X, p, !1) : te(r, X)) : C(r, X, p, !1))) : W || (X.reading = !1);
          }
          return F(X);
        }
        function C(r, p, M, W) {
          p.flowing && p.length === 0 && !p.sync ? (r.emit("data", M), r.read(0)) : (p.length += p.objectMode ? 1 : M.length, W ? p.buffer.unshift(M) : p.buffer.push(M), p.needReadable && G(r)), te(r, p);
        }
        function V(r, p) {
          var M;
          return !T(p) && typeof p != "string" && p !== void 0 && !r.objectMode && (M = new TypeError("Invalid non-string/buffer chunk")), M;
        }
        function F(r) {
          return !r.ended && (r.needReadable || r.length < r.highWaterMark || r.length === 0);
        }
        H.prototype.isPaused = function() {
          return this._readableState.flowing === !1;
        }, H.prototype.setEncoding = function(r) {
          return S || (S = g("string_decoder/").StringDecoder), this._readableState.decoder = new S(r), this._readableState.encoding = r, this;
        };
        var ne = 8388608;
        function ae(r) {
          return r >= ne ? r = ne : (r--, r |= r >>> 1, r |= r >>> 2, r |= r >>> 4, r |= r >>> 8, r |= r >>> 16, r++), r;
        }
        function oe(r, p) {
          return r <= 0 || p.length === 0 && p.ended ? 0 : p.objectMode ? 1 : r !== r ? p.flowing && p.length ? p.buffer.head.data.length : p.length : (r > p.highWaterMark && (p.highWaterMark = ae(r)), r <= p.length ? r : p.ended ? p.length : (p.needReadable = !0, 0));
        }
        H.prototype.read = function(r) {
          x("read", r), r = parseInt(r, 10);
          var p = this._readableState, M = r;
          if (r !== 0 && (p.emittedReadable = !1), r === 0 && p.needReadable && (p.length >= p.highWaterMark || p.ended))
            return x("read: emitReadable", p.length, p.ended), p.length === 0 && p.ended ? K(this) : G(this), null;
          if (r = oe(r, p), r === 0 && p.ended)
            return p.length === 0 && K(this), null;
          var W = p.needReadable;
          x("need readable", W), (p.length === 0 || p.length - r < p.highWaterMark) && (W = !0, x("length less than watermark", W)), p.ended || p.reading ? (W = !1, x("reading or ended", W)) : W && (x("do read"), p.reading = !0, p.sync = !0, p.length === 0 && (p.needReadable = !0), this._read(p.highWaterMark), p.sync = !1, p.reading || (r = oe(M, p)));
          var $;
          return r > 0 ? $ = R(r, p) : $ = null, $ === null ? (p.needReadable = !0, r = 0) : p.length -= r, p.length === 0 && (p.ended || (p.needReadable = !0), M !== r && p.ended && K(this)), $ !== null && this.emit("data", $), $;
        };
        function ce(r, p) {
          if (!p.ended) {
            if (p.decoder) {
              var M = p.decoder.end();
              M && M.length && (p.buffer.push(M), p.length += p.objectMode ? 1 : M.length);
            }
            p.ended = !0, G(r);
          }
        }
        function G(r) {
          var p = r._readableState;
          p.needReadable = !1, p.emittedReadable || (x("emitReadable", p.flowing), p.emittedReadable = !0, p.sync ? h.nextTick(re, r) : re(r));
        }
        function re(r) {
          x("emit readable"), r.emit("readable"), w(r);
        }
        function te(r, p) {
          p.readingMore || (p.readingMore = !0, h.nextTick(de, r, p));
        }
        function de(r, p) {
          for (var M = p.length; !p.reading && !p.flowing && !p.ended && p.length < p.highWaterMark && (x("maybeReadMore read 0"), r.read(0), M !== p.length); )
            M = p.length;
          p.readingMore = !1;
        }
        H.prototype._read = function(r) {
          this.emit("error", new Error("_read() is not implemented"));
        }, H.prototype.pipe = function(r, p) {
          var M = this, W = this._readableState;
          switch (W.pipesCount) {
            case 0:
              W.pipes = r;
              break;
            case 1:
              W.pipes = [W.pipes, r];
              break;
            default:
              W.pipes.push(r);
              break;
          }
          W.pipesCount += 1, x("pipe count=%d opts=%j", W.pipesCount, p);
          var $ = (!p || p.end !== !1) && r !== f.stdout && r !== f.stderr, X = $ ? he : P;
          W.endEmitted ? h.nextTick(X) : M.once("end", X), r.on("unpipe", J);
          function J(Q, ie) {
            x("onunpipe"), Q === M && ie && ie.hasUnpiped === !1 && (ie.hasUnpiped = !0, s());
          }
          function he() {
            x("onend"), r.end();
          }
          var fe = le(M);
          r.on("drain", fe);
          var xe = !1;
          function s() {
            x("cleanup"), r.removeListener("close", E), r.removeListener("finish", D), r.removeListener("drain", fe), r.removeListener("error", c), r.removeListener("unpipe", J), M.removeListener("end", he), M.removeListener("end", P), M.removeListener("data", i), xe = !0, W.awaitDrain && (!r._writableState || r._writableState.needDrain) && fe();
          }
          var e = !1;
          M.on("data", i);
          function i(Q) {
            x("ondata"), e = !1;
            var ie = r.write(Q);
            ie === !1 && !e && ((W.pipesCount === 1 && W.pipes === r || W.pipesCount > 1 && ee(W.pipes, r) !== -1) && !xe && (x("false write response, pause", M._readableState.awaitDrain), M._readableState.awaitDrain++, e = !0), M.pause());
          }
          function c(Q) {
            x("onerror", Q), P(), r.removeListener("error", c), n(r, "error") === 0 && r.emit("error", Q);
          }
          O(r, "error", c);
          function E() {
            r.removeListener("finish", D), P();
          }
          r.once("close", E);
          function D() {
            x("onfinish"), r.removeListener("close", E), P();
          }
          r.once("finish", D);
          function P() {
            x("unpipe"), M.unpipe(r);
          }
          return r.emit("pipe", M), W.flowing || (x("pipe resume"), M.resume()), r;
        };
        function le(r) {
          return function() {
            var p = r._readableState;
            x("pipeOnDrain", p.awaitDrain), p.awaitDrain && p.awaitDrain--, p.awaitDrain === 0 && n(r, "data") && (p.flowing = !0, w(r));
          };
        }
        H.prototype.unpipe = function(r) {
          var p = this._readableState, M = { hasUnpiped: !1 };
          if (p.pipesCount === 0)
            return this;
          if (p.pipesCount === 1)
            return r && r !== p.pipes ? this : (r || (r = p.pipes), p.pipes = null, p.pipesCount = 0, p.flowing = !1, r && r.emit("unpipe", this, M), this);
          if (!r) {
            var W = p.pipes, $ = p.pipesCount;
            p.pipes = null, p.pipesCount = 0, p.flowing = !1;
            for (var X = 0; X < $; X++)
              W[X].emit("unpipe", this, M);
            return this;
          }
          var J = ee(p.pipes, r);
          return J === -1 ? this : (p.pipes.splice(J, 1), p.pipesCount -= 1, p.pipesCount === 1 && (p.pipes = p.pipes[0]), r.emit("unpipe", this, M), this);
        }, H.prototype.on = function(r, p) {
          var M = t.prototype.on.call(this, r, p);
          if (r === "data")
            this._readableState.flowing !== !1 && this.resume();
          else if (r === "readable") {
            var W = this._readableState;
            !W.endEmitted && !W.readableListening && (W.readableListening = W.needReadable = !0, W.emittedReadable = !1, W.reading ? W.length && G(this) : h.nextTick(z, this));
          }
          return M;
        }, H.prototype.addListener = H.prototype.on;
        function z(r) {
          x("readable nexttick read 0"), r.read(0);
        }
        H.prototype.resume = function() {
          var r = this._readableState;
          return r.flowing || (x("resume"), r.flowing = !0, j(this, r)), this;
        };
        function j(r, p) {
          p.resumeScheduled || (p.resumeScheduled = !0, h.nextTick(l, r, p));
        }
        function l(r, p) {
          p.reading || (x("resume read 0"), r.read(0)), p.resumeScheduled = !1, p.awaitDrain = 0, r.emit("resume"), w(r), p.flowing && !p.reading && r.read(0);
        }
        H.prototype.pause = function() {
          return x("call pause flowing=%j", this._readableState.flowing), this._readableState.flowing !== !1 && (x("pause"), this._readableState.flowing = !1, this.emit("pause")), this;
        };
        function w(r) {
          var p = r._readableState;
          for (x("flow", p.flowing); p.flowing && r.read() !== null; )
            ;
        }
        H.prototype.wrap = function(r) {
          var p = this, M = this._readableState, W = !1;
          r.on("end", function() {
            if (x("wrapped end"), M.decoder && !M.ended) {
              var J = M.decoder.end();
              J && J.length && p.push(J);
            }
            p.push(null);
          }), r.on("data", function(J) {
            if (x("wrapped data"), M.decoder && (J = M.decoder.write(J)), !(M.objectMode && J == null) && !(!M.objectMode && (!J || !J.length))) {
              var he = p.push(J);
              he || (W = !0, r.pause());
            }
          });
          for (var $ in r)
            this[$] === void 0 && typeof r[$] == "function" && (this[$] = function(J) {
              return function() {
                return r[J].apply(r, arguments);
              };
            }($));
          for (var X = 0; X < k.length; X++)
            r.on(k[X], this.emit.bind(this, k[X]));
          return this._read = function(J) {
            x("wrapped _read", J), W && (W = !1, r.resume());
          }, this;
        }, Object.defineProperty(H.prototype, "readableHighWaterMark", {
          // making it explicit this property is not enumerable
          // because otherwise some prototype manipulation in
          // userland will fail
          enumerable: !1,
          get: function() {
            return this._readableState.highWaterMark;
          }
        }), H._fromList = R;
        function R(r, p) {
          if (p.length === 0)
            return null;
          var M;
          return p.objectMode ? M = p.buffer.shift() : !r || r >= p.length ? (p.decoder ? M = p.buffer.join("") : p.buffer.length === 1 ? M = p.buffer.head.data : M = p.buffer.concat(p.length), p.buffer.clear()) : M = I(r, p.buffer, p.decoder), M;
        }
        function I(r, p, M) {
          var W;
          return r < p.head.data.length ? (W = p.head.data.slice(0, r), p.head.data = p.head.data.slice(r)) : r === p.head.data.length ? W = p.shift() : W = M ? B(r, p) : N(r, p), W;
        }
        function B(r, p) {
          var M = p.head, W = 1, $ = M.data;
          for (r -= $.length; M = M.next; ) {
            var X = M.data, J = r > X.length ? X.length : r;
            if (J === X.length ? $ += X : $ += X.slice(0, r), r -= J, r === 0) {
              J === X.length ? (++W, M.next ? p.head = M.next : p.head = p.tail = null) : (p.head = M, M.data = X.slice(J));
              break;
            }
            ++W;
          }
          return p.length -= W, $;
        }
        function N(r, p) {
          var M = o.allocUnsafe(r), W = p.head, $ = 1;
          for (W.data.copy(M), r -= W.data.length; W = W.next; ) {
            var X = W.data, J = r > X.length ? X.length : r;
            if (X.copy(M, M.length - r, 0, J), r -= J, r === 0) {
              J === X.length ? (++$, W.next ? p.head = W.next : p.head = p.tail = null) : (p.head = W, W.data = X.slice(J));
              break;
            }
            ++$;
          }
          return p.length -= $, M;
        }
        function K(r) {
          var p = r._readableState;
          if (p.length > 0)
            throw new Error('"endReadable()" called on non-empty stream');
          p.endEmitted || (p.ended = !0, h.nextTick(Z, p, r));
        }
        function Z(r, p) {
          !r.endEmitted && r.length === 0 && (r.endEmitted = !0, p.readable = !1, p.emit("end"));
        }
        function ee(r, p) {
          for (var M = 0, W = r.length; M < W; M++)
            if (r[M] === p)
              return M;
          return -1;
        }
      }).call(this, g("_process"), typeof ue < "u" ? ue : typeof self < "u" ? self : typeof window < "u" ? window : {});
    }, { "./_stream_duplex": 38, "./internal/streams/BufferList": 43, "./internal/streams/destroy": 44, "./internal/streams/stream": 45, _process: 32, "core-util-is": 19, events: 21, inherits: 24, isarray: 26, "process-nextick-args": 31, "safe-buffer": 46, "string_decoder/": 47, util: 14 }], 41: [function(g, L, v) {
      L.exports = b;
      var f = g("./_stream_duplex"), d = Object.create(g("core-util-is"));
      d.inherits = g("inherits"), d.inherits(b, f);
      function h(t, o) {
        var a = this._transformState;
        a.transforming = !1;
        var _ = a.writecb;
        if (!_)
          return this.emit("error", new Error("write callback called multiple times"));
        a.writechunk = null, a.writecb = null, o != null && this.push(o), _(t);
        var T = this._readableState;
        T.reading = !1, (T.needReadable || T.length < T.highWaterMark) && this._read(T.highWaterMark);
      }
      function b(t) {
        if (!(this instanceof b))
          return new b(t);
        f.call(this, t), this._transformState = {
          afterTransform: h.bind(this),
          needTransform: !1,
          transforming: !1,
          writecb: null,
          writechunk: null,
          writeencoding: null
        }, this._readableState.needReadable = !0, this._readableState.sync = !1, t && (typeof t.transform == "function" && (this._transform = t.transform), typeof t.flush == "function" && (this._flush = t.flush)), this.on("prefinish", m);
      }
      function m() {
        var t = this;
        typeof this._flush == "function" ? this._flush(function(o, a) {
          n(t, o, a);
        }) : n(this, null, null);
      }
      b.prototype.push = function(t, o) {
        return this._transformState.needTransform = !1, f.prototype.push.call(this, t, o);
      }, b.prototype._transform = function(t, o, a) {
        throw new Error("_transform() is not implemented");
      }, b.prototype._write = function(t, o, a) {
        var _ = this._transformState;
        if (_.writecb = a, _.writechunk = t, _.writeencoding = o, !_.transforming) {
          var T = this._readableState;
          (_.needTransform || T.needReadable || T.length < T.highWaterMark) && this._read(T.highWaterMark);
        }
      }, b.prototype._read = function(t) {
        var o = this._transformState;
        o.writechunk !== null && o.writecb && !o.transforming ? (o.transforming = !0, this._transform(o.writechunk, o.writeencoding, o.afterTransform)) : o.needTransform = !0;
      }, b.prototype._destroy = function(t, o) {
        var a = this;
        f.prototype._destroy.call(this, t, function(_) {
          o(_), a.emit("close");
        });
      };
      function n(t, o, a) {
        if (o)
          return t.emit("error", o);
        if (a != null && t.push(a), t._writableState.length)
          throw new Error("Calling transform done when ws.length != 0");
        if (t._transformState.transforming)
          throw new Error("Calling transform done when still transforming");
        return t.push(null);
      }
    }, { "./_stream_duplex": 38, "core-util-is": 19, inherits: 24 }], 42: [function(g, L, v) {
      (function(f, d, h) {
        var b = g("process-nextick-args");
        L.exports = O;
        function m(l) {
          var w = this;
          this.next = null, this.entry = null, this.finish = function() {
            j(w, l);
          };
        }
        var n = !f.browser && ["v0.10", "v0.9."].indexOf(f.version.slice(0, 5)) > -1 ? h : b.nextTick, t;
        O.WritableState = S;
        var o = Object.create(g("core-util-is"));
        o.inherits = g("inherits");
        var a = {
          deprecate: g("util-deprecate")
        }, _ = g("./internal/streams/stream"), T = g("safe-buffer").Buffer, U = d.Uint8Array || function() {
        };
        function A(l) {
          return T.from(l);
        }
        function x(l) {
          return T.isBuffer(l) || l instanceof U;
        }
        var u = g("./internal/streams/destroy");
        o.inherits(O, _);
        function y() {
        }
        function S(l, w) {
          t = t || g("./_stream_duplex"), l = l || {};
          var R = w instanceof t;
          this.objectMode = !!l.objectMode, R && (this.objectMode = this.objectMode || !!l.writableObjectMode);
          var I = l.highWaterMark, B = l.writableHighWaterMark, N = this.objectMode ? 16 : 16 * 1024;
          I || I === 0 ? this.highWaterMark = I : R && (B || B === 0) ? this.highWaterMark = B : this.highWaterMark = N, this.highWaterMark = Math.floor(this.highWaterMark), this.finalCalled = !1, this.needDrain = !1, this.ending = !1, this.ended = !1, this.finished = !1, this.destroyed = !1;
          var K = l.decodeStrings === !1;
          this.decodeStrings = !K, this.defaultEncoding = l.defaultEncoding || "utf8", this.length = 0, this.writing = !1, this.corked = 0, this.sync = !0, this.bufferProcessing = !1, this.onwrite = function(Z) {
            ae(w, Z);
          }, this.writecb = null, this.writelen = 0, this.bufferedRequest = null, this.lastBufferedRequest = null, this.pendingcb = 0, this.prefinished = !1, this.errorEmitted = !1, this.bufferedRequestCount = 0, this.corkedRequestsFree = new m(this);
        }
        S.prototype.getBuffer = function() {
          for (var w = this.bufferedRequest, R = []; w; )
            R.push(w), w = w.next;
          return R;
        }, function() {
          try {
            Object.defineProperty(S.prototype, "buffer", {
              get: a.deprecate(function() {
                return this.getBuffer();
              }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
            });
          } catch {
          }
        }();
        var k;
        typeof Symbol == "function" && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] == "function" ? (k = Function.prototype[Symbol.hasInstance], Object.defineProperty(O, Symbol.hasInstance, {
          value: function(l) {
            return k.call(this, l) ? !0 : this !== O ? !1 : l && l._writableState instanceof S;
          }
        })) : k = function(l) {
          return l instanceof this;
        };
        function O(l) {
          if (t = t || g("./_stream_duplex"), !k.call(O, this) && !(this instanceof t))
            return new O(l);
          this._writableState = new S(l, this), this.writable = !0, l && (typeof l.write == "function" && (this._write = l.write), typeof l.writev == "function" && (this._writev = l.writev), typeof l.destroy == "function" && (this._destroy = l.destroy), typeof l.final == "function" && (this._final = l.final)), _.call(this);
        }
        O.prototype.pipe = function() {
          this.emit("error", new Error("Cannot pipe, not readable"));
        };
        function q(l, w) {
          var R = new Error("write after end");
          l.emit("error", R), b.nextTick(w, R);
        }
        function H(l, w, R, I) {
          var B = !0, N = !1;
          return R === null ? N = new TypeError("May not write null values to stream") : typeof R != "string" && R !== void 0 && !w.objectMode && (N = new TypeError("Invalid non-string/buffer chunk")), N && (l.emit("error", N), b.nextTick(I, N), B = !1), B;
        }
        O.prototype.write = function(l, w, R) {
          var I = this._writableState, B = !1, N = !I.objectMode && x(l);
          return N && !T.isBuffer(l) && (l = A(l)), typeof w == "function" && (R = w, w = null), N ? w = "buffer" : w || (w = I.defaultEncoding), typeof R != "function" && (R = y), I.ended ? q(this, R) : (N || H(this, I, l, R)) && (I.pendingcb++, B = C(this, I, N, l, w, R)), B;
        }, O.prototype.cork = function() {
          var l = this._writableState;
          l.corked++;
        }, O.prototype.uncork = function() {
          var l = this._writableState;
          l.corked && (l.corked--, !l.writing && !l.corked && !l.finished && !l.bufferProcessing && l.bufferedRequest && G(this, l));
        }, O.prototype.setDefaultEncoding = function(w) {
          if (typeof w == "string" && (w = w.toLowerCase()), !(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((w + "").toLowerCase()) > -1))
            throw new TypeError("Unknown encoding: " + w);
          return this._writableState.defaultEncoding = w, this;
        };
        function Y(l, w, R) {
          return !l.objectMode && l.decodeStrings !== !1 && typeof w == "string" && (w = T.from(w, R)), w;
        }
        Object.defineProperty(O.prototype, "writableHighWaterMark", {
          // making it explicit this property is not enumerable
          // because otherwise some prototype manipulation in
          // userland will fail
          enumerable: !1,
          get: function() {
            return this._writableState.highWaterMark;
          }
        });
        function C(l, w, R, I, B, N) {
          if (!R) {
            var K = Y(w, I, B);
            I !== K && (R = !0, B = "buffer", I = K);
          }
          var Z = w.objectMode ? 1 : I.length;
          w.length += Z;
          var ee = w.length < w.highWaterMark;
          if (ee || (w.needDrain = !0), w.writing || w.corked) {
            var r = w.lastBufferedRequest;
            w.lastBufferedRequest = {
              chunk: I,
              encoding: B,
              isBuf: R,
              callback: N,
              next: null
            }, r ? r.next = w.lastBufferedRequest : w.bufferedRequest = w.lastBufferedRequest, w.bufferedRequestCount += 1;
          } else
            V(l, w, !1, Z, I, B, N);
          return ee;
        }
        function V(l, w, R, I, B, N, K) {
          w.writelen = I, w.writecb = K, w.writing = !0, w.sync = !0, R ? l._writev(B, w.onwrite) : l._write(B, N, w.onwrite), w.sync = !1;
        }
        function F(l, w, R, I, B) {
          --w.pendingcb, R ? (b.nextTick(B, I), b.nextTick(le, l, w), l._writableState.errorEmitted = !0, l.emit("error", I)) : (B(I), l._writableState.errorEmitted = !0, l.emit("error", I), le(l, w));
        }
        function ne(l) {
          l.writing = !1, l.writecb = null, l.length -= l.writelen, l.writelen = 0;
        }
        function ae(l, w) {
          var R = l._writableState, I = R.sync, B = R.writecb;
          if (ne(R), w)
            F(l, R, I, w, B);
          else {
            var N = re(R);
            !N && !R.corked && !R.bufferProcessing && R.bufferedRequest && G(l, R), I ? n(oe, l, R, N, B) : oe(l, R, N, B);
          }
        }
        function oe(l, w, R, I) {
          R || ce(l, w), w.pendingcb--, I(), le(l, w);
        }
        function ce(l, w) {
          w.length === 0 && w.needDrain && (w.needDrain = !1, l.emit("drain"));
        }
        function G(l, w) {
          w.bufferProcessing = !0;
          var R = w.bufferedRequest;
          if (l._writev && R && R.next) {
            var I = w.bufferedRequestCount, B = new Array(I), N = w.corkedRequestsFree;
            N.entry = R;
            for (var K = 0, Z = !0; R; )
              B[K] = R, R.isBuf || (Z = !1), R = R.next, K += 1;
            B.allBuffers = Z, V(l, w, !0, w.length, B, "", N.finish), w.pendingcb++, w.lastBufferedRequest = null, N.next ? (w.corkedRequestsFree = N.next, N.next = null) : w.corkedRequestsFree = new m(w), w.bufferedRequestCount = 0;
          } else {
            for (; R; ) {
              var ee = R.chunk, r = R.encoding, p = R.callback, M = w.objectMode ? 1 : ee.length;
              if (V(l, w, !1, M, ee, r, p), R = R.next, w.bufferedRequestCount--, w.writing)
                break;
            }
            R === null && (w.lastBufferedRequest = null);
          }
          w.bufferedRequest = R, w.bufferProcessing = !1;
        }
        O.prototype._write = function(l, w, R) {
          R(new Error("_write() is not implemented"));
        }, O.prototype._writev = null, O.prototype.end = function(l, w, R) {
          var I = this._writableState;
          typeof l == "function" ? (R = l, l = null, w = null) : typeof w == "function" && (R = w, w = null), l != null && this.write(l, w), I.corked && (I.corked = 1, this.uncork()), !I.ending && !I.finished && z(this, I, R);
        };
        function re(l) {
          return l.ending && l.length === 0 && l.bufferedRequest === null && !l.finished && !l.writing;
        }
        function te(l, w) {
          l._final(function(R) {
            w.pendingcb--, R && l.emit("error", R), w.prefinished = !0, l.emit("prefinish"), le(l, w);
          });
        }
        function de(l, w) {
          !w.prefinished && !w.finalCalled && (typeof l._final == "function" ? (w.pendingcb++, w.finalCalled = !0, b.nextTick(te, l, w)) : (w.prefinished = !0, l.emit("prefinish")));
        }
        function le(l, w) {
          var R = re(w);
          return R && (de(l, w), w.pendingcb === 0 && (w.finished = !0, l.emit("finish"))), R;
        }
        function z(l, w, R) {
          w.ending = !0, le(l, w), R && (w.finished ? b.nextTick(R) : l.once("finish", R)), w.ended = !0, l.writable = !1;
        }
        function j(l, w, R) {
          var I = l.entry;
          for (l.entry = null; I; ) {
            var B = I.callback;
            w.pendingcb--, B(R), I = I.next;
          }
          w.corkedRequestsFree ? w.corkedRequestsFree.next = l : w.corkedRequestsFree = l;
        }
        Object.defineProperty(O.prototype, "destroyed", {
          get: function() {
            return this._writableState === void 0 ? !1 : this._writableState.destroyed;
          },
          set: function(l) {
            this._writableState && (this._writableState.destroyed = l);
          }
        }), O.prototype.destroy = u.destroy, O.prototype._undestroy = u.undestroy, O.prototype._destroy = function(l, w) {
          this.end(), w(l);
        };
      }).call(this, g("_process"), typeof ue < "u" ? ue : typeof self < "u" ? self : typeof window < "u" ? window : {}, g("timers").setImmediate);
    }, { "./_stream_duplex": 38, "./internal/streams/destroy": 44, "./internal/streams/stream": 45, _process: 32, "core-util-is": 19, inherits: 24, "process-nextick-args": 31, "safe-buffer": 46, timers: 57, "util-deprecate": 61 }], 43: [function(g, L, v) {
      function f(m, n) {
        if (!(m instanceof n))
          throw new TypeError("Cannot call a class as a function");
      }
      var d = g("safe-buffer").Buffer, h = g("util");
      function b(m, n, t) {
        m.copy(n, t);
      }
      L.exports = function() {
        function m() {
          f(this, m), this.head = null, this.tail = null, this.length = 0;
        }
        return m.prototype.push = function(t) {
          var o = { data: t, next: null };
          this.length > 0 ? this.tail.next = o : this.head = o, this.tail = o, ++this.length;
        }, m.prototype.unshift = function(t) {
          var o = { data: t, next: this.head };
          this.length === 0 && (this.tail = o), this.head = o, ++this.length;
        }, m.prototype.shift = function() {
          if (this.length !== 0) {
            var t = this.head.data;
            return this.length === 1 ? this.head = this.tail = null : this.head = this.head.next, --this.length, t;
          }
        }, m.prototype.clear = function() {
          this.head = this.tail = null, this.length = 0;
        }, m.prototype.join = function(t) {
          if (this.length === 0)
            return "";
          for (var o = this.head, a = "" + o.data; o = o.next; )
            a += t + o.data;
          return a;
        }, m.prototype.concat = function(t) {
          if (this.length === 0)
            return d.alloc(0);
          if (this.length === 1)
            return this.head.data;
          for (var o = d.allocUnsafe(t >>> 0), a = this.head, _ = 0; a; )
            b(a.data, o, _), _ += a.data.length, a = a.next;
          return o;
        }, m;
      }(), h && h.inspect && h.inspect.custom && (L.exports.prototype[h.inspect.custom] = function() {
        var m = h.inspect({ length: this.length });
        return this.constructor.name + " " + m;
      });
    }, { "safe-buffer": 46, util: 14 }], 44: [function(g, L, v) {
      var f = g("process-nextick-args");
      function d(m, n) {
        var t = this, o = this._readableState && this._readableState.destroyed, a = this._writableState && this._writableState.destroyed;
        return o || a ? (n ? n(m) : m && (!this._writableState || !this._writableState.errorEmitted) && f.nextTick(b, this, m), this) : (this._readableState && (this._readableState.destroyed = !0), this._writableState && (this._writableState.destroyed = !0), this._destroy(m || null, function(_) {
          !n && _ ? (f.nextTick(b, t, _), t._writableState && (t._writableState.errorEmitted = !0)) : n && n(_);
        }), this);
      }
      function h() {
        this._readableState && (this._readableState.destroyed = !1, this._readableState.reading = !1, this._readableState.ended = !1, this._readableState.endEmitted = !1), this._writableState && (this._writableState.destroyed = !1, this._writableState.ended = !1, this._writableState.ending = !1, this._writableState.finished = !1, this._writableState.errorEmitted = !1);
      }
      function b(m, n) {
        m.emit("error", n);
      }
      L.exports = {
        destroy: d,
        undestroy: h
      };
    }, { "process-nextick-args": 31 }], 45: [function(g, L, v) {
      L.exports = g("events").EventEmitter;
    }, { events: 21 }], 46: [function(g, L, v) {
      var f = g("buffer"), d = f.Buffer;
      function h(m, n) {
        for (var t in m)
          n[t] = m[t];
      }
      d.from && d.alloc && d.allocUnsafe && d.allocUnsafeSlow ? L.exports = f : (h(f, v), v.Buffer = b);
      function b(m, n, t) {
        return d(m, n, t);
      }
      h(d, b), b.from = function(m, n, t) {
        if (typeof m == "number")
          throw new TypeError("Argument must not be a number");
        return d(m, n, t);
      }, b.alloc = function(m, n, t) {
        if (typeof m != "number")
          throw new TypeError("Argument must be a number");
        var o = d(m);
        return n !== void 0 ? typeof t == "string" ? o.fill(n, t) : o.fill(n) : o.fill(0), o;
      }, b.allocUnsafe = function(m) {
        if (typeof m != "number")
          throw new TypeError("Argument must be a number");
        return d(m);
      }, b.allocUnsafeSlow = function(m) {
        if (typeof m != "number")
          throw new TypeError("Argument must be a number");
        return f.SlowBuffer(m);
      };
    }, { buffer: 16 }], 47: [function(g, L, v) {
      var f = g("safe-buffer").Buffer, d = f.isEncoding || function(k) {
        switch (k = "" + k, k && k.toLowerCase()) {
          case "hex":
          case "utf8":
          case "utf-8":
          case "ascii":
          case "binary":
          case "base64":
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
          case "raw":
            return !0;
          default:
            return !1;
        }
      };
      function h(k) {
        if (!k)
          return "utf8";
        for (var O; ; )
          switch (k) {
            case "utf8":
            case "utf-8":
              return "utf8";
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return "utf16le";
            case "latin1":
            case "binary":
              return "latin1";
            case "base64":
            case "ascii":
            case "hex":
              return k;
            default:
              if (O)
                return;
              k = ("" + k).toLowerCase(), O = !0;
          }
      }
      function b(k) {
        var O = h(k);
        if (typeof O != "string" && (f.isEncoding === d || !d(k)))
          throw new Error("Unknown encoding: " + k);
        return O || k;
      }
      v.StringDecoder = m;
      function m(k) {
        this.encoding = b(k);
        var O;
        switch (this.encoding) {
          case "utf16le":
            this.text = U, this.end = A, O = 4;
            break;
          case "utf8":
            this.fillLast = a, O = 4;
            break;
          case "base64":
            this.text = x, this.end = u, O = 3;
            break;
          default:
            this.write = y, this.end = S;
            return;
        }
        this.lastNeed = 0, this.lastTotal = 0, this.lastChar = f.allocUnsafe(O);
      }
      m.prototype.write = function(k) {
        if (k.length === 0)
          return "";
        var O, q;
        if (this.lastNeed) {
          if (O = this.fillLast(k), O === void 0)
            return "";
          q = this.lastNeed, this.lastNeed = 0;
        } else
          q = 0;
        return q < k.length ? O ? O + this.text(k, q) : this.text(k, q) : O || "";
      }, m.prototype.end = T, m.prototype.text = _, m.prototype.fillLast = function(k) {
        if (this.lastNeed <= k.length)
          return k.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
        k.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, k.length), this.lastNeed -= k.length;
      };
      function n(k) {
        return k <= 127 ? 0 : k >> 5 === 6 ? 2 : k >> 4 === 14 ? 3 : k >> 3 === 30 ? 4 : k >> 6 === 2 ? -1 : -2;
      }
      function t(k, O, q) {
        var H = O.length - 1;
        if (H < q)
          return 0;
        var Y = n(O[H]);
        return Y >= 0 ? (Y > 0 && (k.lastNeed = Y - 1), Y) : --H < q || Y === -2 ? 0 : (Y = n(O[H]), Y >= 0 ? (Y > 0 && (k.lastNeed = Y - 2), Y) : --H < q || Y === -2 ? 0 : (Y = n(O[H]), Y >= 0 ? (Y > 0 && (Y === 2 ? Y = 0 : k.lastNeed = Y - 3), Y) : 0));
      }
      function o(k, O, q) {
        if ((O[0] & 192) !== 128)
          return k.lastNeed = 0, "�";
        if (k.lastNeed > 1 && O.length > 1) {
          if ((O[1] & 192) !== 128)
            return k.lastNeed = 1, "�";
          if (k.lastNeed > 2 && O.length > 2 && (O[2] & 192) !== 128)
            return k.lastNeed = 2, "�";
        }
      }
      function a(k) {
        var O = this.lastTotal - this.lastNeed, q = o(this, k);
        if (q !== void 0)
          return q;
        if (this.lastNeed <= k.length)
          return k.copy(this.lastChar, O, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
        k.copy(this.lastChar, O, 0, k.length), this.lastNeed -= k.length;
      }
      function _(k, O) {
        var q = t(this, k, O);
        if (!this.lastNeed)
          return k.toString("utf8", O);
        this.lastTotal = q;
        var H = k.length - (q - this.lastNeed);
        return k.copy(this.lastChar, 0, H), k.toString("utf8", O, H);
      }
      function T(k) {
        var O = k && k.length ? this.write(k) : "";
        return this.lastNeed ? O + "�" : O;
      }
      function U(k, O) {
        if ((k.length - O) % 2 === 0) {
          var q = k.toString("utf16le", O);
          if (q) {
            var H = q.charCodeAt(q.length - 1);
            if (H >= 55296 && H <= 56319)
              return this.lastNeed = 2, this.lastTotal = 4, this.lastChar[0] = k[k.length - 2], this.lastChar[1] = k[k.length - 1], q.slice(0, -1);
          }
          return q;
        }
        return this.lastNeed = 1, this.lastTotal = 2, this.lastChar[0] = k[k.length - 1], k.toString("utf16le", O, k.length - 1);
      }
      function A(k) {
        var O = k && k.length ? this.write(k) : "";
        if (this.lastNeed) {
          var q = this.lastTotal - this.lastNeed;
          return O + this.lastChar.toString("utf16le", 0, q);
        }
        return O;
      }
      function x(k, O) {
        var q = (k.length - O) % 3;
        return q === 0 ? k.toString("base64", O) : (this.lastNeed = 3 - q, this.lastTotal = 3, q === 1 ? this.lastChar[0] = k[k.length - 1] : (this.lastChar[0] = k[k.length - 2], this.lastChar[1] = k[k.length - 1]), k.toString("base64", O, k.length - q));
      }
      function u(k) {
        var O = k && k.length ? this.write(k) : "";
        return this.lastNeed ? O + this.lastChar.toString("base64", 0, 3 - this.lastNeed) : O;
      }
      function y(k) {
        return k.toString(this.encoding);
      }
      function S(k) {
        return k && k.length ? this.write(k) : "";
      }
    }, { "safe-buffer": 46 }], 48: [function(g, L, v) {
      L.exports = g("./readable").PassThrough;
    }, { "./readable": 49 }], 49: [function(g, L, v) {
      v = L.exports = g("./lib/_stream_readable.js"), v.Stream = v, v.Readable = v, v.Writable = g("./lib/_stream_writable.js"), v.Duplex = g("./lib/_stream_duplex.js"), v.Transform = g("./lib/_stream_transform.js"), v.PassThrough = g("./lib/_stream_passthrough.js");
    }, { "./lib/_stream_duplex.js": 38, "./lib/_stream_passthrough.js": 39, "./lib/_stream_readable.js": 40, "./lib/_stream_transform.js": 41, "./lib/_stream_writable.js": 42 }], 50: [function(g, L, v) {
      L.exports = g("./readable").Transform;
    }, { "./readable": 49 }], 51: [function(g, L, v) {
      L.exports = g("./lib/_stream_writable.js");
    }, { "./lib/_stream_writable.js": 42 }], 52: [function(g, L, v) {
      L.exports = h;
      var f = g("events").EventEmitter, d = g("inherits");
      d(h, f), h.Readable = g("readable-stream/readable.js"), h.Writable = g("readable-stream/writable.js"), h.Duplex = g("readable-stream/duplex.js"), h.Transform = g("readable-stream/transform.js"), h.PassThrough = g("readable-stream/passthrough.js"), h.Stream = h;
      function h() {
        f.call(this);
      }
      h.prototype.pipe = function(b, m) {
        var n = this;
        function t(x) {
          b.writable && b.write(x) === !1 && n.pause && n.pause();
        }
        n.on("data", t);
        function o() {
          n.readable && n.resume && n.resume();
        }
        b.on("drain", o), !b._isStdio && (!m || m.end !== !1) && (n.on("end", _), n.on("close", T));
        var a = !1;
        function _() {
          a || (a = !0, b.end());
        }
        function T() {
          a || (a = !0, typeof b.destroy == "function" && b.destroy());
        }
        function U(x) {
          if (A(), f.listenerCount(this, "error") === 0)
            throw x;
        }
        n.on("error", U), b.on("error", U);
        function A() {
          n.removeListener("data", t), b.removeListener("drain", o), n.removeListener("end", _), n.removeListener("close", T), n.removeListener("error", U), b.removeListener("error", U), n.removeListener("end", A), n.removeListener("close", A), b.removeListener("close", A);
        }
        return n.on("end", A), n.on("close", A), b.on("close", A), b.emit("pipe", n), b;
      };
    }, { events: 21, inherits: 24, "readable-stream/duplex.js": 37, "readable-stream/passthrough.js": 48, "readable-stream/readable.js": 49, "readable-stream/transform.js": 50, "readable-stream/writable.js": 51 }], 53: [function(g, L, v) {
      (function(f) {
        var d = g("./lib/request"), h = g("./lib/response"), b = g("xtend"), m = g("builtin-status-codes"), n = g("url"), t = v;
        t.request = function(o, a) {
          typeof o == "string" ? o = n.parse(o) : o = b(o);
          var _ = f.location.protocol.search(/^https?:$/) === -1 ? "http:" : "", T = o.protocol || _, U = o.hostname || o.host, A = o.port, x = o.path || "/";
          U && U.indexOf(":") !== -1 && (U = "[" + U + "]"), o.url = (U ? T + "//" + U : "") + (A ? ":" + A : "") + x, o.method = (o.method || "GET").toUpperCase(), o.headers = o.headers || {};
          var u = new d(o);
          return a && u.on("response", a), u;
        }, t.get = function(a, _) {
          var T = t.request(a, _);
          return T.end(), T;
        }, t.ClientRequest = d, t.IncomingMessage = h.IncomingMessage, t.Agent = function() {
        }, t.Agent.defaultMaxSockets = 4, t.globalAgent = new t.Agent(), t.STATUS_CODES = m, t.METHODS = [
          "CHECKOUT",
          "CONNECT",
          "COPY",
          "DELETE",
          "GET",
          "HEAD",
          "LOCK",
          "M-SEARCH",
          "MERGE",
          "MKACTIVITY",
          "MKCOL",
          "MOVE",
          "NOTIFY",
          "OPTIONS",
          "PATCH",
          "POST",
          "PROPFIND",
          "PROPPATCH",
          "PURGE",
          "PUT",
          "REPORT",
          "SEARCH",
          "SUBSCRIBE",
          "TRACE",
          "UNLOCK",
          "UNSUBSCRIBE"
        ];
      }).call(this, typeof ue < "u" ? ue : typeof self < "u" ? self : typeof window < "u" ? window : {});
    }, { "./lib/request": 55, "./lib/response": 56, "builtin-status-codes": 17, url: 59, xtend: 65 }], 54: [function(g, L, v) {
      (function(f) {
        v.fetch = t(f.fetch) && t(f.ReadableStream), v.writableStream = t(f.WritableStream), v.abortController = t(f.AbortController), v.blobConstructor = !1;
        try {
          new Blob([new ArrayBuffer(1)]), v.blobConstructor = !0;
        } catch {
        }
        var d;
        function h() {
          if (d !== void 0)
            return d;
          if (f.XMLHttpRequest) {
            d = new f.XMLHttpRequest();
            try {
              d.open("GET", f.XDomainRequest ? "/" : "https://example.com");
            } catch {
              d = null;
            }
          } else
            d = null;
          return d;
        }
        function b(o) {
          var a = h();
          if (!a)
            return !1;
          try {
            return a.responseType = o, a.responseType === o;
          } catch {
          }
          return !1;
        }
        var m = typeof f.ArrayBuffer < "u", n = m && t(f.ArrayBuffer.prototype.slice);
        v.arraybuffer = v.fetch || m && b("arraybuffer"), v.msstream = !v.fetch && n && b("ms-stream"), v.mozchunkedarraybuffer = !v.fetch && m && b("moz-chunked-arraybuffer"), v.overrideMimeType = v.fetch || (h() ? t(h().overrideMimeType) : !1), v.vbArray = t(f.VBArray);
        function t(o) {
          return typeof o == "function";
        }
        d = null;
      }).call(this, typeof ue < "u" ? ue : typeof self < "u" ? self : typeof window < "u" ? window : {});
    }, {}], 55: [function(g, L, v) {
      (function(f, d, h) {
        var b = g("./capability"), m = g("inherits"), n = g("./response"), t = g("readable-stream"), o = g("to-arraybuffer"), a = n.IncomingMessage, _ = n.readyStates;
        function T(u, y) {
          return b.fetch && y ? "fetch" : b.mozchunkedarraybuffer ? "moz-chunked-arraybuffer" : b.msstream ? "ms-stream" : b.arraybuffer && u ? "arraybuffer" : b.vbArray && u ? "text:vbarray" : "text";
        }
        var U = L.exports = function(u) {
          var y = this;
          t.Writable.call(y), y._opts = u, y._body = [], y._headers = {}, u.auth && y.setHeader("Authorization", "Basic " + new h(u.auth).toString("base64")), Object.keys(u.headers).forEach(function(O) {
            y.setHeader(O, u.headers[O]);
          });
          var S, k = !0;
          if (u.mode === "disable-fetch" || "requestTimeout" in u && !b.abortController)
            k = !1, S = !0;
          else if (u.mode === "prefer-streaming")
            S = !1;
          else if (u.mode === "allow-wrong-content-type")
            S = !b.overrideMimeType;
          else if (!u.mode || u.mode === "default" || u.mode === "prefer-fast")
            S = !0;
          else
            throw new Error("Invalid value for opts.mode");
          y._mode = T(S, k), y._fetchTimer = null, y.on("finish", function() {
            y._onFinish();
          });
        };
        m(U, t.Writable), U.prototype.setHeader = function(u, y) {
          var S = this, k = u.toLowerCase();
          x.indexOf(k) === -1 && (S._headers[k] = {
            name: u,
            value: y
          });
        }, U.prototype.getHeader = function(u) {
          var y = this._headers[u.toLowerCase()];
          return y ? y.value : null;
        }, U.prototype.removeHeader = function(u) {
          var y = this;
          delete y._headers[u.toLowerCase()];
        }, U.prototype._onFinish = function() {
          var u = this;
          if (!u._destroyed) {
            var y = u._opts, S = u._headers, k = null;
            y.method !== "GET" && y.method !== "HEAD" && (b.arraybuffer ? k = o(h.concat(u._body)) : b.blobConstructor ? k = new d.Blob(u._body.map(function(C) {
              return o(C);
            }), {
              type: (S["content-type"] || {}).value || ""
            }) : k = h.concat(u._body).toString());
            var O = [];
            if (Object.keys(S).forEach(function(C) {
              var V = S[C].name, F = S[C].value;
              Array.isArray(F) ? F.forEach(function(ne) {
                O.push([V, ne]);
              }) : O.push([V, F]);
            }), u._mode === "fetch") {
              var q = null;
              if (b.abortController) {
                var H = new AbortController();
                q = H.signal, u._fetchAbortController = H, "requestTimeout" in y && y.requestTimeout !== 0 && (u._fetchTimer = d.setTimeout(function() {
                  u.emit("requestTimeout"), u._fetchAbortController && u._fetchAbortController.abort();
                }, y.requestTimeout));
              }
              d.fetch(u._opts.url, {
                method: u._opts.method,
                headers: O,
                body: k || void 0,
                mode: "cors",
                credentials: y.withCredentials ? "include" : "same-origin",
                signal: q
              }).then(function(C) {
                u._fetchResponse = C, u._connect();
              }, function(C) {
                d.clearTimeout(u._fetchTimer), u._destroyed || u.emit("error", C);
              });
            } else {
              var Y = u._xhr = new d.XMLHttpRequest();
              try {
                Y.open(u._opts.method, u._opts.url, !0);
              } catch (C) {
                f.nextTick(function() {
                  u.emit("error", C);
                });
                return;
              }
              "responseType" in Y && (Y.responseType = u._mode.split(":")[0]), "withCredentials" in Y && (Y.withCredentials = !!y.withCredentials), u._mode === "text" && "overrideMimeType" in Y && Y.overrideMimeType("text/plain; charset=x-user-defined"), "requestTimeout" in y && (Y.timeout = y.requestTimeout, Y.ontimeout = function() {
                u.emit("requestTimeout");
              }), O.forEach(function(C) {
                Y.setRequestHeader(C[0], C[1]);
              }), u._response = null, Y.onreadystatechange = function() {
                switch (Y.readyState) {
                  case _.LOADING:
                  case _.DONE:
                    u._onXHRProgress();
                    break;
                }
              }, u._mode === "moz-chunked-arraybuffer" && (Y.onprogress = function() {
                u._onXHRProgress();
              }), Y.onerror = function() {
                u._destroyed || u.emit("error", new Error("XHR error"));
              };
              try {
                Y.send(k);
              } catch (C) {
                f.nextTick(function() {
                  u.emit("error", C);
                });
                return;
              }
            }
          }
        };
        function A(u) {
          try {
            var y = u.status;
            return y !== null && y !== 0;
          } catch {
            return !1;
          }
        }
        U.prototype._onXHRProgress = function() {
          var u = this;
          !A(u._xhr) || u._destroyed || (u._response || u._connect(), u._response._onXHRProgress());
        }, U.prototype._connect = function() {
          var u = this;
          u._destroyed || (u._response = new a(u._xhr, u._fetchResponse, u._mode, u._fetchTimer), u._response.on("error", function(y) {
            u.emit("error", y);
          }), u.emit("response", u._response));
        }, U.prototype._write = function(u, y, S) {
          var k = this;
          k._body.push(u), S();
        }, U.prototype.abort = U.prototype.destroy = function() {
          var u = this;
          u._destroyed = !0, d.clearTimeout(u._fetchTimer), u._response && (u._response._destroyed = !0), u._xhr ? u._xhr.abort() : u._fetchAbortController && u._fetchAbortController.abort();
        }, U.prototype.end = function(u, y, S) {
          var k = this;
          typeof u == "function" && (S = u, u = void 0), t.Writable.prototype.end.call(k, u, y, S);
        }, U.prototype.flushHeaders = function() {
        }, U.prototype.setTimeout = function() {
        }, U.prototype.setNoDelay = function() {
        }, U.prototype.setSocketKeepAlive = function() {
        };
        var x = [
          "accept-charset",
          "accept-encoding",
          "access-control-request-headers",
          "access-control-request-method",
          "connection",
          "content-length",
          "cookie",
          "cookie2",
          "date",
          "dnt",
          "expect",
          "host",
          "keep-alive",
          "origin",
          "referer",
          "te",
          "trailer",
          "transfer-encoding",
          "upgrade",
          "via"
        ];
      }).call(this, g("_process"), typeof ue < "u" ? ue : typeof self < "u" ? self : typeof window < "u" ? window : {}, g("buffer").Buffer);
    }, { "./capability": 54, "./response": 56, _process: 32, buffer: 16, inherits: 24, "readable-stream": 49, "to-arraybuffer": 58 }], 56: [function(g, L, v) {
      (function(f, d, h) {
        var b = g("./capability"), m = g("inherits"), n = g("readable-stream"), t = v.readyStates = {
          UNSENT: 0,
          OPENED: 1,
          HEADERS_RECEIVED: 2,
          LOADING: 3,
          DONE: 4
        }, o = v.IncomingMessage = function(a, _, T, U) {
          var A = this;
          if (n.Readable.call(A), A._mode = T, A.headers = {}, A.rawHeaders = [], A.trailers = {}, A.rawTrailers = [], A.on("end", function() {
            f.nextTick(function() {
              A.emit("close");
            });
          }), T === "fetch") {
            let O = function() {
              u.read().then(function(q) {
                if (!A._destroyed) {
                  if (q.done) {
                    d.clearTimeout(U), A.push(null);
                    return;
                  }
                  A.push(new h(q.value)), O();
                }
              }).catch(function(q) {
                d.clearTimeout(U), A._destroyed || A.emit("error", q);
              });
            };
            if (A._fetchResponse = _, A.url = _.url, A.statusCode = _.status, A.statusMessage = _.statusText, _.headers.forEach(function(q, H) {
              A.headers[H.toLowerCase()] = q, A.rawHeaders.push(H, q);
            }), b.writableStream) {
              var x = new WritableStream({
                write: function(q) {
                  return new Promise(function(H, Y) {
                    A._destroyed ? Y() : A.push(new h(q)) ? H() : A._resumeFetch = H;
                  });
                },
                close: function() {
                  d.clearTimeout(U), A._destroyed || A.push(null);
                },
                abort: function(q) {
                  A._destroyed || A.emit("error", q);
                }
              });
              try {
                _.body.pipeTo(x).catch(function(q) {
                  d.clearTimeout(U), A._destroyed || A.emit("error", q);
                });
                return;
              } catch {
              }
            }
            var u = _.body.getReader();
            O();
          } else {
            A._xhr = a, A._pos = 0, A.url = a.responseURL, A.statusCode = a.status, A.statusMessage = a.statusText;
            var y = a.getAllResponseHeaders().split(/\r?\n/);
            if (y.forEach(function(O) {
              var q = O.match(/^([^:]+):\s*(.*)/);
              if (q) {
                var H = q[1].toLowerCase();
                H === "set-cookie" ? (A.headers[H] === void 0 && (A.headers[H] = []), A.headers[H].push(q[2])) : A.headers[H] !== void 0 ? A.headers[H] += ", " + q[2] : A.headers[H] = q[2], A.rawHeaders.push(q[1], q[2]);
              }
            }), A._charset = "x-user-defined", !b.overrideMimeType) {
              var S = A.rawHeaders["mime-type"];
              if (S) {
                var k = S.match(/;\s*charset=([^;])(;|$)/);
                k && (A._charset = k[1].toLowerCase());
              }
              A._charset || (A._charset = "utf-8");
            }
          }
        };
        m(o, n.Readable), o.prototype._read = function() {
          var a = this, _ = a._resumeFetch;
          _ && (a._resumeFetch = null, _());
        }, o.prototype._onXHRProgress = function() {
          var a = this, _ = a._xhr, T = null;
          switch (a._mode) {
            case "text:vbarray":
              if (_.readyState !== t.DONE)
                break;
              try {
                T = new d.VBArray(_.responseBody).toArray();
              } catch {
              }
              if (T !== null) {
                a.push(new h(T));
                break;
              }
            case "text":
              try {
                T = _.responseText;
              } catch {
                a._mode = "text:vbarray";
                break;
              }
              if (T.length > a._pos) {
                var U = T.substr(a._pos);
                if (a._charset === "x-user-defined") {
                  for (var A = new h(U.length), x = 0; x < U.length; x++)
                    A[x] = U.charCodeAt(x) & 255;
                  a.push(A);
                } else
                  a.push(U, a._charset);
                a._pos = T.length;
              }
              break;
            case "arraybuffer":
              if (_.readyState !== t.DONE || !_.response)
                break;
              T = _.response, a.push(new h(new Uint8Array(T)));
              break;
            case "moz-chunked-arraybuffer":
              if (T = _.response, _.readyState !== t.LOADING || !T)
                break;
              a.push(new h(new Uint8Array(T)));
              break;
            case "ms-stream":
              if (T = _.response, _.readyState !== t.LOADING)
                break;
              var u = new d.MSStreamReader();
              u.onprogress = function() {
                u.result.byteLength > a._pos && (a.push(new h(new Uint8Array(u.result.slice(a._pos)))), a._pos = u.result.byteLength);
              }, u.onload = function() {
                a.push(null);
              }, u.readAsArrayBuffer(T);
              break;
          }
          a._xhr.readyState === t.DONE && a._mode !== "ms-stream" && a.push(null);
        };
      }).call(this, g("_process"), typeof ue < "u" ? ue : typeof self < "u" ? self : typeof window < "u" ? window : {}, g("buffer").Buffer);
    }, { "./capability": 54, _process: 32, buffer: 16, inherits: 24, "readable-stream": 49 }], 57: [function(g, L, v) {
      (function(f, d) {
        var h = g("process/browser.js").nextTick, b = Function.prototype.apply, m = Array.prototype.slice, n = {}, t = 0;
        v.setTimeout = function() {
          return new o(b.call(setTimeout, window, arguments), clearTimeout);
        }, v.setInterval = function() {
          return new o(b.call(setInterval, window, arguments), clearInterval);
        }, v.clearTimeout = v.clearInterval = function(a) {
          a.close();
        };
        function o(a, _) {
          this._id = a, this._clearFn = _;
        }
        o.prototype.unref = o.prototype.ref = function() {
        }, o.prototype.close = function() {
          this._clearFn.call(window, this._id);
        }, v.enroll = function(a, _) {
          clearTimeout(a._idleTimeoutId), a._idleTimeout = _;
        }, v.unenroll = function(a) {
          clearTimeout(a._idleTimeoutId), a._idleTimeout = -1;
        }, v._unrefActive = v.active = function(a) {
          clearTimeout(a._idleTimeoutId);
          var _ = a._idleTimeout;
          _ >= 0 && (a._idleTimeoutId = setTimeout(function() {
            a._onTimeout && a._onTimeout();
          }, _));
        }, v.setImmediate = typeof f == "function" ? f : function(a) {
          var _ = t++, T = arguments.length < 2 ? !1 : m.call(arguments, 1);
          return n[_] = !0, h(function() {
            n[_] && (T ? a.apply(null, T) : a.call(null), v.clearImmediate(_));
          }), _;
        }, v.clearImmediate = typeof d == "function" ? d : function(a) {
          delete n[a];
        };
      }).call(this, g("timers").setImmediate, g("timers").clearImmediate);
    }, { "process/browser.js": 32, timers: 57 }], 58: [function(g, L, v) {
      var f = g("buffer").Buffer;
      L.exports = function(d) {
        if (d instanceof Uint8Array) {
          if (d.byteOffset === 0 && d.byteLength === d.buffer.byteLength)
            return d.buffer;
          if (typeof d.buffer.slice == "function")
            return d.buffer.slice(d.byteOffset, d.byteOffset + d.byteLength);
        }
        if (f.isBuffer(d)) {
          for (var h = new Uint8Array(d.length), b = d.length, m = 0; m < b; m++)
            h[m] = d[m];
          return h.buffer;
        } else
          throw new Error("Argument must be a Buffer");
      };
    }, { buffer: 16 }], 59: [function(g, L, v) {
      var f = g("punycode"), d = g("./util");
      v.parse = O, v.resolve = H, v.resolveObject = Y, v.format = q, v.Url = h;
      function h() {
        this.protocol = null, this.slashes = null, this.auth = null, this.host = null, this.port = null, this.hostname = null, this.hash = null, this.search = null, this.query = null, this.pathname = null, this.path = null, this.href = null;
      }
      var b = /^([a-z0-9.+-]+:)/i, m = /:[0-9]*$/, n = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/, t = ["<", ">", '"', "`", " ", "\r", `
`, "	"], o = ["{", "}", "|", "\\", "^", "`"].concat(t), a = ["'"].concat(o), _ = ["%", "/", "?", ";", "#"].concat(a), T = ["/", "?", "#"], U = 255, A = /^[+a-z0-9A-Z_-]{0,63}$/, x = /^([+a-z0-9A-Z_-]{0,63})(.*)$/, u = {
        javascript: !0,
        "javascript:": !0
      }, y = {
        javascript: !0,
        "javascript:": !0
      }, S = {
        http: !0,
        https: !0,
        ftp: !0,
        gopher: !0,
        file: !0,
        "http:": !0,
        "https:": !0,
        "ftp:": !0,
        "gopher:": !0,
        "file:": !0
      }, k = g("querystring");
      function O(C, V, F) {
        if (C && d.isObject(C) && C instanceof h)
          return C;
        var ne = new h();
        return ne.parse(C, V, F), ne;
      }
      h.prototype.parse = function(C, V, F) {
        if (!d.isString(C))
          throw new TypeError("Parameter 'url' must be a string, not " + typeof C);
        var ne = C.indexOf("?"), ae = ne !== -1 && ne < C.indexOf("#") ? "?" : "#", oe = C.split(ae), ce = /\\/g;
        oe[0] = oe[0].replace(ce, "/"), C = oe.join(ae);
        var G = C;
        if (G = G.trim(), !F && C.split("#").length === 1) {
          var re = n.exec(G);
          if (re)
            return this.path = G, this.href = G, this.pathname = re[1], re[2] ? (this.search = re[2], V ? this.query = k.parse(this.search.substr(1)) : this.query = this.search.substr(1)) : V && (this.search = "", this.query = {}), this;
        }
        var te = b.exec(G);
        if (te) {
          te = te[0];
          var de = te.toLowerCase();
          this.protocol = de, G = G.substr(te.length);
        }
        if (F || te || G.match(/^\/\/[^@\/]+@[^@\/]+/)) {
          var le = G.substr(0, 2) === "//";
          le && !(te && y[te]) && (G = G.substr(2), this.slashes = !0);
        }
        if (!y[te] && (le || te && !S[te])) {
          for (var z = -1, j = 0; j < T.length; j++) {
            var l = G.indexOf(T[j]);
            l !== -1 && (z === -1 || l < z) && (z = l);
          }
          var w, R;
          z === -1 ? R = G.lastIndexOf("@") : R = G.lastIndexOf("@", z), R !== -1 && (w = G.slice(0, R), G = G.slice(R + 1), this.auth = decodeURIComponent(w)), z = -1;
          for (var j = 0; j < _.length; j++) {
            var l = G.indexOf(_[j]);
            l !== -1 && (z === -1 || l < z) && (z = l);
          }
          z === -1 && (z = G.length), this.host = G.slice(0, z), G = G.slice(z), this.parseHost(), this.hostname = this.hostname || "";
          var I = this.hostname[0] === "[" && this.hostname[this.hostname.length - 1] === "]";
          if (!I)
            for (var B = this.hostname.split(/\./), j = 0, N = B.length; j < N; j++) {
              var K = B[j];
              if (K && !K.match(A)) {
                for (var Z = "", ee = 0, r = K.length; ee < r; ee++)
                  K.charCodeAt(ee) > 127 ? Z += "x" : Z += K[ee];
                if (!Z.match(A)) {
                  var p = B.slice(0, j), M = B.slice(j + 1), W = K.match(x);
                  W && (p.push(W[1]), M.unshift(W[2])), M.length && (G = "/" + M.join(".") + G), this.hostname = p.join(".");
                  break;
                }
              }
            }
          this.hostname.length > U ? this.hostname = "" : this.hostname = this.hostname.toLowerCase(), I || (this.hostname = f.toASCII(this.hostname));
          var $ = this.port ? ":" + this.port : "", X = this.hostname || "";
          this.host = X + $, this.href += this.host, I && (this.hostname = this.hostname.substr(1, this.hostname.length - 2), G[0] !== "/" && (G = "/" + G));
        }
        if (!u[de])
          for (var j = 0, N = a.length; j < N; j++) {
            var J = a[j];
            if (G.indexOf(J) !== -1) {
              var he = encodeURIComponent(J);
              he === J && (he = escape(J)), G = G.split(J).join(he);
            }
          }
        var fe = G.indexOf("#");
        fe !== -1 && (this.hash = G.substr(fe), G = G.slice(0, fe));
        var xe = G.indexOf("?");
        if (xe !== -1 ? (this.search = G.substr(xe), this.query = G.substr(xe + 1), V && (this.query = k.parse(this.query)), G = G.slice(0, xe)) : V && (this.search = "", this.query = {}), G && (this.pathname = G), S[de] && this.hostname && !this.pathname && (this.pathname = "/"), this.pathname || this.search) {
          var $ = this.pathname || "", s = this.search || "";
          this.path = $ + s;
        }
        return this.href = this.format(), this;
      };
      function q(C) {
        return d.isString(C) && (C = O(C)), C instanceof h ? C.format() : h.prototype.format.call(C);
      }
      h.prototype.format = function() {
        var C = this.auth || "";
        C && (C = encodeURIComponent(C), C = C.replace(/%3A/i, ":"), C += "@");
        var V = this.protocol || "", F = this.pathname || "", ne = this.hash || "", ae = !1, oe = "";
        this.host ? ae = C + this.host : this.hostname && (ae = C + (this.hostname.indexOf(":") === -1 ? this.hostname : "[" + this.hostname + "]"), this.port && (ae += ":" + this.port)), this.query && d.isObject(this.query) && Object.keys(this.query).length && (oe = k.stringify(this.query));
        var ce = this.search || oe && "?" + oe || "";
        return V && V.substr(-1) !== ":" && (V += ":"), this.slashes || (!V || S[V]) && ae !== !1 ? (ae = "//" + (ae || ""), F && F.charAt(0) !== "/" && (F = "/" + F)) : ae || (ae = ""), ne && ne.charAt(0) !== "#" && (ne = "#" + ne), ce && ce.charAt(0) !== "?" && (ce = "?" + ce), F = F.replace(/[?#]/g, function(G) {
          return encodeURIComponent(G);
        }), ce = ce.replace("#", "%23"), V + ae + F + ce + ne;
      };
      function H(C, V) {
        return O(C, !1, !0).resolve(V);
      }
      h.prototype.resolve = function(C) {
        return this.resolveObject(O(C, !1, !0)).format();
      };
      function Y(C, V) {
        return C ? O(C, !1, !0).resolveObject(V) : V;
      }
      h.prototype.resolveObject = function(C) {
        if (d.isString(C)) {
          var V = new h();
          V.parse(C, !1, !0), C = V;
        }
        for (var F = new h(), ne = Object.keys(this), ae = 0; ae < ne.length; ae++) {
          var oe = ne[ae];
          F[oe] = this[oe];
        }
        if (F.hash = C.hash, C.href === "")
          return F.href = F.format(), F;
        if (C.slashes && !C.protocol) {
          for (var ce = Object.keys(C), G = 0; G < ce.length; G++) {
            var re = ce[G];
            re !== "protocol" && (F[re] = C[re]);
          }
          return S[F.protocol] && F.hostname && !F.pathname && (F.path = F.pathname = "/"), F.href = F.format(), F;
        }
        if (C.protocol && C.protocol !== F.protocol) {
          if (!S[C.protocol]) {
            for (var te = Object.keys(C), de = 0; de < te.length; de++) {
              var le = te[de];
              F[le] = C[le];
            }
            return F.href = F.format(), F;
          }
          if (F.protocol = C.protocol, !C.host && !y[C.protocol]) {
            for (var N = (C.pathname || "").split("/"); N.length && !(C.host = N.shift()); )
              ;
            C.host || (C.host = ""), C.hostname || (C.hostname = ""), N[0] !== "" && N.unshift(""), N.length < 2 && N.unshift(""), F.pathname = N.join("/");
          } else
            F.pathname = C.pathname;
          if (F.search = C.search, F.query = C.query, F.host = C.host || "", F.auth = C.auth, F.hostname = C.hostname || C.host, F.port = C.port, F.pathname || F.search) {
            var z = F.pathname || "", j = F.search || "";
            F.path = z + j;
          }
          return F.slashes = F.slashes || C.slashes, F.href = F.format(), F;
        }
        var l = F.pathname && F.pathname.charAt(0) === "/", w = C.host || C.pathname && C.pathname.charAt(0) === "/", R = w || l || F.host && C.pathname, I = R, B = F.pathname && F.pathname.split("/") || [], N = C.pathname && C.pathname.split("/") || [], K = F.protocol && !S[F.protocol];
        if (K && (F.hostname = "", F.port = null, F.host && (B[0] === "" ? B[0] = F.host : B.unshift(F.host)), F.host = "", C.protocol && (C.hostname = null, C.port = null, C.host && (N[0] === "" ? N[0] = C.host : N.unshift(C.host)), C.host = null), R = R && (N[0] === "" || B[0] === "")), w)
          F.host = C.host || C.host === "" ? C.host : F.host, F.hostname = C.hostname || C.hostname === "" ? C.hostname : F.hostname, F.search = C.search, F.query = C.query, B = N;
        else if (N.length)
          B || (B = []), B.pop(), B = B.concat(N), F.search = C.search, F.query = C.query;
        else if (!d.isNullOrUndefined(C.search)) {
          if (K) {
            F.hostname = F.host = B.shift();
            var Z = F.host && F.host.indexOf("@") > 0 ? F.host.split("@") : !1;
            Z && (F.auth = Z.shift(), F.host = F.hostname = Z.shift());
          }
          return F.search = C.search, F.query = C.query, (!d.isNull(F.pathname) || !d.isNull(F.search)) && (F.path = (F.pathname ? F.pathname : "") + (F.search ? F.search : "")), F.href = F.format(), F;
        }
        if (!B.length)
          return F.pathname = null, F.search ? F.path = "/" + F.search : F.path = null, F.href = F.format(), F;
        for (var ee = B.slice(-1)[0], r = (F.host || C.host || B.length > 1) && (ee === "." || ee === "..") || ee === "", p = 0, M = B.length; M >= 0; M--)
          ee = B[M], ee === "." ? B.splice(M, 1) : ee === ".." ? (B.splice(M, 1), p++) : p && (B.splice(M, 1), p--);
        if (!R && !I)
          for (; p--; p)
            B.unshift("..");
        R && B[0] !== "" && (!B[0] || B[0].charAt(0) !== "/") && B.unshift(""), r && B.join("/").substr(-1) !== "/" && B.push("");
        var W = B[0] === "" || B[0] && B[0].charAt(0) === "/";
        if (K) {
          F.hostname = F.host = W ? "" : B.length ? B.shift() : "";
          var Z = F.host && F.host.indexOf("@") > 0 ? F.host.split("@") : !1;
          Z && (F.auth = Z.shift(), F.host = F.hostname = Z.shift());
        }
        return R = R || F.host && B.length, R && !W && B.unshift(""), B.length ? F.pathname = B.join("/") : (F.pathname = null, F.path = null), (!d.isNull(F.pathname) || !d.isNull(F.search)) && (F.path = (F.pathname ? F.pathname : "") + (F.search ? F.search : "")), F.auth = C.auth || F.auth, F.slashes = F.slashes || C.slashes, F.href = F.format(), F;
      }, h.prototype.parseHost = function() {
        var C = this.host, V = m.exec(C);
        V && (V = V[0], V !== ":" && (this.port = V.substr(1)), C = C.substr(0, C.length - V.length)), C && (this.hostname = C);
      };
    }, { "./util": 60, punycode: 33, querystring: 36 }], 60: [function(g, L, v) {
      L.exports = {
        isString: function(f) {
          return typeof f == "string";
        },
        isObject: function(f) {
          return typeof f == "object" && f !== null;
        },
        isNull: function(f) {
          return f === null;
        },
        isNullOrUndefined: function(f) {
          return f == null;
        }
      };
    }, {}], 61: [function(g, L, v) {
      (function(f) {
        L.exports = d;
        function d(b, m) {
          if (h("noDeprecation"))
            return b;
          var n = !1;
          function t() {
            if (!n) {
              if (h("throwDeprecation"))
                throw new Error(m);
              h("traceDeprecation") ? console.trace(m) : console.warn(m), n = !0;
            }
            return b.apply(this, arguments);
          }
          return t;
        }
        function h(b) {
          try {
            if (!f.localStorage)
              return !1;
          } catch {
            return !1;
          }
          var m = f.localStorage[b];
          return m == null ? !1 : String(m).toLowerCase() === "true";
        }
      }).call(this, typeof ue < "u" ? ue : typeof self < "u" ? self : typeof window < "u" ? window : {});
    }, {}], 62: [function(g, L, v) {
      typeof Object.create == "function" ? L.exports = function(d, h) {
        d.super_ = h, d.prototype = Object.create(h.prototype, {
          constructor: {
            value: d,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        });
      } : L.exports = function(d, h) {
        d.super_ = h;
        var b = function() {
        };
        b.prototype = h.prototype, d.prototype = new b(), d.prototype.constructor = d;
      };
    }, {}], 63: [function(g, L, v) {
      L.exports = function(d) {
        return d && typeof d == "object" && typeof d.copy == "function" && typeof d.fill == "function" && typeof d.readUInt8 == "function";
      };
    }, {}], 64: [function(g, L, v) {
      (function(f, d) {
        var h = /%[sdj%]/g;
        v.format = function(z) {
          if (!H(z)) {
            for (var j = [], l = 0; l < arguments.length; l++)
              j.push(n(arguments[l]));
            return j.join(" ");
          }
          for (var l = 1, w = arguments, R = w.length, I = String(z).replace(h, function(N) {
            if (N === "%%")
              return "%";
            if (l >= R)
              return N;
            switch (N) {
              case "%s":
                return String(w[l++]);
              case "%d":
                return Number(w[l++]);
              case "%j":
                try {
                  return JSON.stringify(w[l++]);
                } catch {
                  return "[Circular]";
                }
              default:
                return N;
            }
          }), B = w[l]; l < R; B = w[++l])
            k(B) || !F(B) ? I += " " + B : I += " " + n(B);
          return I;
        }, v.deprecate = function(z, j) {
          if (C(d.process))
            return function() {
              return v.deprecate(z, j).apply(this, arguments);
            };
          if (f.noDeprecation === !0)
            return z;
          var l = !1;
          function w() {
            if (!l) {
              if (f.throwDeprecation)
                throw new Error(j);
              f.traceDeprecation ? console.trace(j) : console.error(j), l = !0;
            }
            return z.apply(this, arguments);
          }
          return w;
        };
        var b = {}, m;
        v.debuglog = function(z) {
          if (C(m) && (m = f.env.NODE_DEBUG || ""), z = z.toUpperCase(), !b[z])
            if (new RegExp("\\b" + z + "\\b", "i").test(m)) {
              var j = f.pid;
              b[z] = function() {
                var l = v.format.apply(v, arguments);
                console.error("%s %d: %s", z, j, l);
              };
            } else
              b[z] = function() {
              };
          return b[z];
        };
        function n(z, j) {
          var l = {
            seen: [],
            stylize: o
          };
          return arguments.length >= 3 && (l.depth = arguments[2]), arguments.length >= 4 && (l.colors = arguments[3]), S(j) ? l.showHidden = j : j && v._extend(l, j), C(l.showHidden) && (l.showHidden = !1), C(l.depth) && (l.depth = 2), C(l.colors) && (l.colors = !1), C(l.customInspect) && (l.customInspect = !0), l.colors && (l.stylize = t), _(l, z, l.depth);
        }
        v.inspect = n, n.colors = {
          bold: [1, 22],
          italic: [3, 23],
          underline: [4, 24],
          inverse: [7, 27],
          white: [37, 39],
          grey: [90, 39],
          black: [30, 39],
          blue: [34, 39],
          cyan: [36, 39],
          green: [32, 39],
          magenta: [35, 39],
          red: [31, 39],
          yellow: [33, 39]
        }, n.styles = {
          special: "cyan",
          number: "yellow",
          boolean: "yellow",
          undefined: "grey",
          null: "bold",
          string: "green",
          date: "magenta",
          // "name": intentionally not styling
          regexp: "red"
        };
        function t(z, j) {
          var l = n.styles[j];
          return l ? "\x1B[" + n.colors[l][0] + "m" + z + "\x1B[" + n.colors[l][1] + "m" : z;
        }
        function o(z, j) {
          return z;
        }
        function a(z) {
          var j = {};
          return z.forEach(function(l, w) {
            j[l] = !0;
          }), j;
        }
        function _(z, j, l) {
          if (z.customInspect && j && oe(j.inspect) && // Filter out the util module, it's inspect function is special
          j.inspect !== v.inspect && // Also filter out any prototype objects using the circular check.
          !(j.constructor && j.constructor.prototype === j)) {
            var w = j.inspect(l, z);
            return H(w) || (w = _(z, w, l)), w;
          }
          var R = T(z, j);
          if (R)
            return R;
          var I = Object.keys(j), B = a(I);
          if (z.showHidden && (I = Object.getOwnPropertyNames(j)), ae(j) && (I.indexOf("message") >= 0 || I.indexOf("description") >= 0))
            return U(j);
          if (I.length === 0) {
            if (oe(j)) {
              var N = j.name ? ": " + j.name : "";
              return z.stylize("[Function" + N + "]", "special");
            }
            if (V(j))
              return z.stylize(RegExp.prototype.toString.call(j), "regexp");
            if (ne(j))
              return z.stylize(Date.prototype.toString.call(j), "date");
            if (ae(j))
              return U(j);
          }
          var K = "", Z = !1, ee = ["{", "}"];
          if (y(j) && (Z = !0, ee = ["[", "]"]), oe(j)) {
            var r = j.name ? ": " + j.name : "";
            K = " [Function" + r + "]";
          }
          if (V(j) && (K = " " + RegExp.prototype.toString.call(j)), ne(j) && (K = " " + Date.prototype.toUTCString.call(j)), ae(j) && (K = " " + U(j)), I.length === 0 && (!Z || j.length == 0))
            return ee[0] + K + ee[1];
          if (l < 0)
            return V(j) ? z.stylize(RegExp.prototype.toString.call(j), "regexp") : z.stylize("[Object]", "special");
          z.seen.push(j);
          var p;
          return Z ? p = A(z, j, l, B, I) : p = I.map(function(M) {
            return x(z, j, l, B, M, Z);
          }), z.seen.pop(), u(p, K, ee);
        }
        function T(z, j) {
          if (C(j))
            return z.stylize("undefined", "undefined");
          if (H(j)) {
            var l = "'" + JSON.stringify(j).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
            return z.stylize(l, "string");
          }
          if (q(j))
            return z.stylize("" + j, "number");
          if (S(j))
            return z.stylize("" + j, "boolean");
          if (k(j))
            return z.stylize("null", "null");
        }
        function U(z) {
          return "[" + Error.prototype.toString.call(z) + "]";
        }
        function A(z, j, l, w, R) {
          for (var I = [], B = 0, N = j.length; B < N; ++B)
            le(j, String(B)) ? I.push(x(
              z,
              j,
              l,
              w,
              String(B),
              !0
            )) : I.push("");
          return R.forEach(function(K) {
            K.match(/^\d+$/) || I.push(x(
              z,
              j,
              l,
              w,
              K,
              !0
            ));
          }), I;
        }
        function x(z, j, l, w, R, I) {
          var B, N, K;
          if (K = Object.getOwnPropertyDescriptor(j, R) || { value: j[R] }, K.get ? K.set ? N = z.stylize("[Getter/Setter]", "special") : N = z.stylize("[Getter]", "special") : K.set && (N = z.stylize("[Setter]", "special")), le(w, R) || (B = "[" + R + "]"), N || (z.seen.indexOf(K.value) < 0 ? (k(l) ? N = _(z, K.value, null) : N = _(z, K.value, l - 1), N.indexOf(`
`) > -1 && (I ? N = N.split(`
`).map(function(Z) {
            return "  " + Z;
          }).join(`
`).substr(2) : N = `
` + N.split(`
`).map(function(Z) {
            return "   " + Z;
          }).join(`
`))) : N = z.stylize("[Circular]", "special")), C(B)) {
            if (I && R.match(/^\d+$/))
              return N;
            B = JSON.stringify("" + R), B.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (B = B.substr(1, B.length - 2), B = z.stylize(B, "name")) : (B = B.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'"), B = z.stylize(B, "string"));
          }
          return B + ": " + N;
        }
        function u(z, j, l) {
          var w = z.reduce(function(R, I) {
            return I.indexOf(`
`) >= 0, R + I.replace(/\u001b\[\d\d?m/g, "").length + 1;
          }, 0);
          return w > 60 ? l[0] + (j === "" ? "" : j + `
 `) + " " + z.join(`,
  `) + " " + l[1] : l[0] + j + " " + z.join(", ") + " " + l[1];
        }
        function y(z) {
          return Array.isArray(z);
        }
        v.isArray = y;
        function S(z) {
          return typeof z == "boolean";
        }
        v.isBoolean = S;
        function k(z) {
          return z === null;
        }
        v.isNull = k;
        function O(z) {
          return z == null;
        }
        v.isNullOrUndefined = O;
        function q(z) {
          return typeof z == "number";
        }
        v.isNumber = q;
        function H(z) {
          return typeof z == "string";
        }
        v.isString = H;
        function Y(z) {
          return typeof z == "symbol";
        }
        v.isSymbol = Y;
        function C(z) {
          return z === void 0;
        }
        v.isUndefined = C;
        function V(z) {
          return F(z) && G(z) === "[object RegExp]";
        }
        v.isRegExp = V;
        function F(z) {
          return typeof z == "object" && z !== null;
        }
        v.isObject = F;
        function ne(z) {
          return F(z) && G(z) === "[object Date]";
        }
        v.isDate = ne;
        function ae(z) {
          return F(z) && (G(z) === "[object Error]" || z instanceof Error);
        }
        v.isError = ae;
        function oe(z) {
          return typeof z == "function";
        }
        v.isFunction = oe;
        function ce(z) {
          return z === null || typeof z == "boolean" || typeof z == "number" || typeof z == "string" || typeof z == "symbol" || // ES6 symbol
          typeof z > "u";
        }
        v.isPrimitive = ce, v.isBuffer = g("./support/isBuffer");
        function G(z) {
          return Object.prototype.toString.call(z);
        }
        function re(z) {
          return z < 10 ? "0" + z.toString(10) : z.toString(10);
        }
        var te = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
        ];
        function de() {
          var z = /* @__PURE__ */ new Date(), j = [
            re(z.getHours()),
            re(z.getMinutes()),
            re(z.getSeconds())
          ].join(":");
          return [z.getDate(), te[z.getMonth()], j].join(" ");
        }
        v.log = function() {
          console.log("%s - %s", de(), v.format.apply(v, arguments));
        }, v.inherits = g("inherits"), v._extend = function(z, j) {
          if (!j || !F(j))
            return z;
          for (var l = Object.keys(j), w = l.length; w--; )
            z[l[w]] = j[l[w]];
          return z;
        };
        function le(z, j) {
          return Object.prototype.hasOwnProperty.call(z, j);
        }
      }).call(this, g("_process"), typeof ue < "u" ? ue : typeof self < "u" ? self : typeof window < "u" ? window : {});
    }, { "./support/isBuffer": 63, _process: 32, inherits: 62 }], 65: [function(g, L, v) {
      L.exports = d;
      var f = Object.prototype.hasOwnProperty;
      function d() {
        for (var h = {}, b = 0; b < arguments.length; b++) {
          var m = arguments[b];
          for (var n in m)
            f.call(m, n) && (h[n] = m[n]);
        }
        return h;
      }
    }, {}] }, {}, [1])(1);
  });
})(Ee);
const Se = ye, Re = /* @__PURE__ */ je({
  __proto__: null,
  default: Se
}, [ye]);
export {
  Re as b
};
