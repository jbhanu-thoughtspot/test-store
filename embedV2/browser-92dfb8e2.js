import { c as commonjsGlobal } from "./libs-d8c0cec7.js";
import { c as commonjsRequire } from "./embed-v2-f83704e6.js";
function _mergeNamespaces(n, m) {
  for (var i = 0; i < m.length; i++) {
    const e = m[i];
    if (typeof e !== "string" && !Array.isArray(e)) {
      for (const k in e) {
        if (k !== "default" && !(k in n)) {
          const d = Object.getOwnPropertyDescriptor(e, k);
          if (d) {
            Object.defineProperty(n, k, d.get ? d : {
              enumerable: true,
              get: () => e[k]
            });
          }
        }
      }
    }
  }
  return Object.freeze(Object.defineProperty(n, Symbol.toStringTag, { value: "Module" }));
}
var browserExports = {};
var browser$2 = {
  get exports() {
    return browserExports;
  },
  set exports(v) {
    browserExports = v;
  }
};
(function(module, exports) {
  (function(f) {
    {
      module.exports = f();
    }
  })(function() {
    return function() {
      function r(e, n, t) {
        function o(i2, f) {
          if (!n[i2]) {
            if (!e[i2]) {
              var c = "function" == typeof commonjsRequire && commonjsRequire;
              if (!f && c)
                return c(i2, true);
              if (u)
                return u(i2, true);
              var a = new Error("Cannot find module '" + i2 + "'");
              throw a.code = "MODULE_NOT_FOUND", a;
            }
            var p = n[i2] = { exports: {} };
            e[i2][0].call(p.exports, function(r2) {
              var n2 = e[i2][1][r2];
              return o(n2 || r2);
            }, p, p.exports, r, e, n, t);
          }
          return n[i2].exports;
        }
        for (var u = "function" == typeof commonjsRequire && commonjsRequire, i = 0; i < t.length; i++)
          o(t[i]);
        return o;
      }
      return r;
    }()({ 1: [function(require2, module2, exports2) {
      (function(process, Buffer) {
        var CombinedStream = require2("combined-stream");
        var util = require2("util");
        var path = require2("path");
        var http = require2("http");
        var https = require2("https");
        var parseUrl = require2("url").parse;
        var fs = require2("fs");
        var mime = require2("mime-types");
        var asynckit = require2("asynckit");
        var populate = require2("./populate.js");
        module2.exports = FormData;
        util.inherits(FormData, CombinedStream);
        function FormData(options) {
          if (!(this instanceof FormData)) {
            return new FormData(options);
          }
          this._overheadLength = 0;
          this._valueLength = 0;
          this._valuesToMeasure = [];
          CombinedStream.call(this);
          options = options || {};
          for (var option in options) {
            this[option] = options[option];
          }
        }
        FormData.LINE_BREAK = "\r\n";
        FormData.DEFAULT_CONTENT_TYPE = "application/octet-stream";
        FormData.prototype.append = function(field, value, options) {
          options = options || {};
          if (typeof options == "string") {
            options = { filename: options };
          }
          var append = CombinedStream.prototype.append.bind(this);
          if (typeof value == "number") {
            value = "" + value;
          }
          if (util.isArray(value)) {
            this._error(new Error("Arrays are not supported."));
            return;
          }
          var header = this._multiPartHeader(field, value, options);
          var footer = this._multiPartFooter();
          append(header);
          append(value);
          append(footer);
          this._trackLength(header, value, options);
        };
        FormData.prototype._trackLength = function(header, value, options) {
          var valueLength = 0;
          if (options.knownLength != null) {
            valueLength += +options.knownLength;
          } else if (Buffer.isBuffer(value)) {
            valueLength = value.length;
          } else if (typeof value === "string") {
            valueLength = Buffer.byteLength(value);
          }
          this._valueLength += valueLength;
          this._overheadLength += Buffer.byteLength(header) + FormData.LINE_BREAK.length;
          if (!value || !value.path && !(value.readable && value.hasOwnProperty("httpVersion"))) {
            return;
          }
          if (!options.knownLength) {
            this._valuesToMeasure.push(value);
          }
        };
        FormData.prototype._lengthRetriever = function(value, callback) {
          if (value.hasOwnProperty("fd")) {
            if (value.end != void 0 && value.end != Infinity && value.start != void 0) {
              callback(null, value.end + 1 - (value.start ? value.start : 0));
            } else {
              fs.stat(value.path, function(err, stat) {
                var fileSize;
                if (err) {
                  callback(err);
                  return;
                }
                fileSize = stat.size - (value.start ? value.start : 0);
                callback(null, fileSize);
              });
            }
          } else if (value.hasOwnProperty("httpVersion")) {
            callback(null, +value.headers["content-length"]);
          } else if (value.hasOwnProperty("httpModule")) {
            value.on("response", function(response) {
              value.pause();
              callback(null, +response.headers["content-length"]);
            });
            value.resume();
          } else {
            callback("Unknown stream");
          }
        };
        FormData.prototype._multiPartHeader = function(field, value, options) {
          if (typeof options.header == "string") {
            return options.header;
          }
          var contentDisposition = this._getContentDisposition(value, options);
          var contentType = this._getContentType(value, options);
          var contents = "";
          var headers = {
            // add custom disposition as third element or keep it two elements if not
            "Content-Disposition": ["form-data", 'name="' + field + '"'].concat(contentDisposition || []),
            // if no content type. allow it to be empty array
            "Content-Type": [].concat(contentType || [])
          };
          if (typeof options.header == "object") {
            populate(headers, options.header);
          }
          var header;
          for (var prop in headers) {
            if (!headers.hasOwnProperty(prop))
              continue;
            header = headers[prop];
            if (header == null) {
              continue;
            }
            if (!Array.isArray(header)) {
              header = [header];
            }
            if (header.length) {
              contents += prop + ": " + header.join("; ") + FormData.LINE_BREAK;
            }
          }
          return "--" + this.getBoundary() + FormData.LINE_BREAK + contents + FormData.LINE_BREAK;
        };
        FormData.prototype._getContentDisposition = function(value, options) {
          var filename, contentDisposition;
          if (typeof options.filepath === "string") {
            filename = path.normalize(options.filepath).replace(/\\/g, "/");
          } else if (options.filename || value.name || value.path) {
            filename = path.basename(options.filename || value.name || value.path);
          } else if (value.readable && value.hasOwnProperty("httpVersion")) {
            filename = path.basename(value.client._httpMessage.path || "");
          }
          if (filename) {
            contentDisposition = 'filename="' + filename + '"';
          }
          return contentDisposition;
        };
        FormData.prototype._getContentType = function(value, options) {
          var contentType = options.contentType;
          if (!contentType && value.name) {
            contentType = mime.lookup(value.name);
          }
          if (!contentType && value.path) {
            contentType = mime.lookup(value.path);
          }
          if (!contentType && value.readable && value.hasOwnProperty("httpVersion")) {
            contentType = value.headers["content-type"];
          }
          if (!contentType && (options.filepath || options.filename)) {
            contentType = mime.lookup(options.filepath || options.filename);
          }
          if (!contentType && typeof value == "object") {
            contentType = FormData.DEFAULT_CONTENT_TYPE;
          }
          return contentType;
        };
        FormData.prototype._multiPartFooter = function() {
          return function(next) {
            var footer = FormData.LINE_BREAK;
            var lastPart = this._streams.length === 0;
            if (lastPart) {
              footer += this._lastBoundary();
            }
            next(footer);
          }.bind(this);
        };
        FormData.prototype._lastBoundary = function() {
          return "--" + this.getBoundary() + "--" + FormData.LINE_BREAK;
        };
        FormData.prototype.getHeaders = function(userHeaders) {
          var header;
          var formHeaders = {
            "content-type": "multipart/form-data; boundary=" + this.getBoundary()
          };
          for (header in userHeaders) {
            if (userHeaders.hasOwnProperty(header)) {
              formHeaders[header.toLowerCase()] = userHeaders[header];
            }
          }
          return formHeaders;
        };
        FormData.prototype.setBoundary = function(boundary) {
          this._boundary = boundary;
        };
        FormData.prototype.getBoundary = function() {
          if (!this._boundary) {
            this._generateBoundary();
          }
          return this._boundary;
        };
        FormData.prototype.getBuffer = function() {
          var dataBuffer = new Buffer.alloc(0);
          var boundary = this.getBoundary();
          for (var i = 0, len = this._streams.length; i < len; i++) {
            if (typeof this._streams[i] !== "function") {
              if (Buffer.isBuffer(this._streams[i])) {
                dataBuffer = Buffer.concat([dataBuffer, this._streams[i]]);
              } else {
                dataBuffer = Buffer.concat([dataBuffer, Buffer.from(this._streams[i])]);
              }
              if (typeof this._streams[i] !== "string" || this._streams[i].substring(2, boundary.length + 2) !== boundary) {
                dataBuffer = Buffer.concat([dataBuffer, Buffer.from(FormData.LINE_BREAK)]);
              }
            }
          }
          return Buffer.concat([dataBuffer, Buffer.from(this._lastBoundary())]);
        };
        FormData.prototype._generateBoundary = function() {
          var boundary = "--------------------------";
          for (var i = 0; i < 24; i++) {
            boundary += Math.floor(Math.random() * 10).toString(16);
          }
          this._boundary = boundary;
        };
        FormData.prototype.getLengthSync = function() {
          var knownLength = this._overheadLength + this._valueLength;
          if (this._streams.length) {
            knownLength += this._lastBoundary().length;
          }
          if (!this.hasKnownLength()) {
            this._error(new Error("Cannot calculate proper length in synchronous way."));
          }
          return knownLength;
        };
        FormData.prototype.hasKnownLength = function() {
          var hasKnownLength = true;
          if (this._valuesToMeasure.length) {
            hasKnownLength = false;
          }
          return hasKnownLength;
        };
        FormData.prototype.getLength = function(cb) {
          var knownLength = this._overheadLength + this._valueLength;
          if (this._streams.length) {
            knownLength += this._lastBoundary().length;
          }
          if (!this._valuesToMeasure.length) {
            process.nextTick(cb.bind(this, null, knownLength));
            return;
          }
          asynckit.parallel(this._valuesToMeasure, this._lengthRetriever, function(err, values) {
            if (err) {
              cb(err);
              return;
            }
            values.forEach(function(length) {
              knownLength += length;
            });
            cb(null, knownLength);
          });
        };
        FormData.prototype.submit = function(params, cb) {
          var request, options, defaults = { method: "post" };
          if (typeof params == "string") {
            params = parseUrl(params);
            options = populate({
              port: params.port,
              path: params.pathname,
              host: params.hostname,
              protocol: params.protocol
            }, defaults);
          } else {
            options = populate(params, defaults);
            if (!options.port) {
              options.port = options.protocol == "https:" ? 443 : 80;
            }
          }
          options.headers = this.getHeaders(params.headers);
          if (options.protocol == "https:") {
            request = https.request(options);
          } else {
            request = http.request(options);
          }
          this.getLength(function(err, length) {
            if (err) {
              this._error(err);
              return;
            }
            request.setHeader("Content-Length", length);
            this.pipe(request);
            if (cb) {
              var onResponse;
              var callback = function(error, responce) {
                request.removeListener("error", callback);
                request.removeListener("response", onResponse);
                return cb.call(this, error, responce);
              };
              onResponse = callback.bind(this, null);
              request.on("error", callback);
              request.on("response", onResponse);
            }
          }.bind(this));
          return request;
        };
        FormData.prototype._error = function(err) {
          if (!this.error) {
            this.error = err;
            this.pause();
            this.emit("error", err);
          }
        };
        FormData.prototype.toString = function() {
          return "[object FormData]";
        };
      }).call(this, require2("_process"), require2("buffer").Buffer);
    }, { "./populate.js": 2, "_process": 32, "asynckit": 3, "buffer": 16, "combined-stream": 18, "fs": 15, "http": 53, "https": 22, "mime-types": 29, "path": 30, "url": 59, "util": 64 }], 2: [function(require2, module2, exports2) {
      module2.exports = function(dst, src) {
        Object.keys(src).forEach(function(prop) {
          dst[prop] = dst[prop] || src[prop];
        });
        return dst;
      };
    }, {}], 3: [function(require2, module2, exports2) {
      module2.exports = {
        parallel: require2("./parallel.js"),
        serial: require2("./serial.js"),
        serialOrdered: require2("./serialOrdered.js")
      };
    }, { "./parallel.js": 10, "./serial.js": 11, "./serialOrdered.js": 12 }], 4: [function(require2, module2, exports2) {
      module2.exports = abort;
      function abort(state) {
        Object.keys(state.jobs).forEach(clean.bind(state));
        state.jobs = {};
      }
      function clean(key) {
        if (typeof this.jobs[key] == "function") {
          this.jobs[key]();
        }
      }
    }, {}], 5: [function(require2, module2, exports2) {
      var defer = require2("./defer.js");
      module2.exports = async;
      function async(callback) {
        var isAsync = false;
        defer(function() {
          isAsync = true;
        });
        return function async_callback(err, result) {
          if (isAsync) {
            callback(err, result);
          } else {
            defer(function nextTick_callback() {
              callback(err, result);
            });
          }
        };
      }
    }, { "./defer.js": 6 }], 6: [function(require2, module2, exports2) {
      (function(process, setImmediate) {
        module2.exports = defer;
        function defer(fn) {
          var nextTick = typeof setImmediate == "function" ? setImmediate : typeof process == "object" && typeof process.nextTick == "function" ? process.nextTick : null;
          if (nextTick) {
            nextTick(fn);
          } else {
            setTimeout(fn, 0);
          }
        }
      }).call(this, require2("_process"), require2("timers").setImmediate);
    }, { "_process": 32, "timers": 57 }], 7: [function(require2, module2, exports2) {
      var async = require2("./async.js"), abort = require2("./abort.js");
      module2.exports = iterate;
      function iterate(list, iterator, state, callback) {
        var key = state["keyedList"] ? state["keyedList"][state.index] : state.index;
        state.jobs[key] = runJob(iterator, key, list[key], function(error, output) {
          if (!(key in state.jobs)) {
            return;
          }
          delete state.jobs[key];
          if (error) {
            abort(state);
          } else {
            state.results[key] = output;
          }
          callback(error, state.results);
        });
      }
      function runJob(iterator, key, item, callback) {
        var aborter;
        if (iterator.length == 2) {
          aborter = iterator(item, async(callback));
        } else {
          aborter = iterator(item, key, async(callback));
        }
        return aborter;
      }
    }, { "./abort.js": 4, "./async.js": 5 }], 8: [function(require2, module2, exports2) {
      module2.exports = state;
      function state(list, sortMethod) {
        var isNamedList = !Array.isArray(list), initState = {
          index: 0,
          keyedList: isNamedList || sortMethod ? Object.keys(list) : null,
          jobs: {},
          results: isNamedList ? {} : [],
          size: isNamedList ? Object.keys(list).length : list.length
        };
        if (sortMethod) {
          initState.keyedList.sort(isNamedList ? sortMethod : function(a, b) {
            return sortMethod(list[a], list[b]);
          });
        }
        return initState;
      }
    }, {}], 9: [function(require2, module2, exports2) {
      var abort = require2("./abort.js"), async = require2("./async.js");
      module2.exports = terminator;
      function terminator(callback) {
        if (!Object.keys(this.jobs).length) {
          return;
        }
        this.index = this.size;
        abort(this);
        async(callback)(null, this.results);
      }
    }, { "./abort.js": 4, "./async.js": 5 }], 10: [function(require2, module2, exports2) {
      var iterate = require2("./lib/iterate.js"), initState = require2("./lib/state.js"), terminator = require2("./lib/terminator.js");
      module2.exports = parallel;
      function parallel(list, iterator, callback) {
        var state = initState(list);
        while (state.index < (state["keyedList"] || list).length) {
          iterate(list, iterator, state, function(error, result) {
            if (error) {
              callback(error, result);
              return;
            }
            if (Object.keys(state.jobs).length === 0) {
              callback(null, state.results);
              return;
            }
          });
          state.index++;
        }
        return terminator.bind(state, callback);
      }
    }, { "./lib/iterate.js": 7, "./lib/state.js": 8, "./lib/terminator.js": 9 }], 11: [function(require2, module2, exports2) {
      var serialOrdered = require2("./serialOrdered.js");
      module2.exports = serial;
      function serial(list, iterator, callback) {
        return serialOrdered(list, iterator, null, callback);
      }
    }, { "./serialOrdered.js": 12 }], 12: [function(require2, module2, exports2) {
      var iterate = require2("./lib/iterate.js"), initState = require2("./lib/state.js"), terminator = require2("./lib/terminator.js");
      module2.exports = serialOrdered;
      module2.exports.ascending = ascending;
      module2.exports.descending = descending;
      function serialOrdered(list, iterator, sortMethod, callback) {
        var state = initState(list, sortMethod);
        iterate(list, iterator, state, function iteratorHandler(error, result) {
          if (error) {
            callback(error, result);
            return;
          }
          state.index++;
          if (state.index < (state["keyedList"] || list).length) {
            iterate(list, iterator, state, iteratorHandler);
            return;
          }
          callback(null, state.results);
        });
        return terminator.bind(state, callback);
      }
      function ascending(a, b) {
        return a < b ? -1 : a > b ? 1 : 0;
      }
      function descending(a, b) {
        return -1 * ascending(a, b);
      }
    }, { "./lib/iterate.js": 7, "./lib/state.js": 8, "./lib/terminator.js": 9 }], 13: [function(require2, module2, exports2) {
      exports2.byteLength = byteLength;
      exports2.toByteArray = toByteArray;
      exports2.fromByteArray = fromByteArray;
      var lookup = [];
      var revLookup = [];
      var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
      var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      for (var i = 0, len = code.length; i < len; ++i) {
        lookup[i] = code[i];
        revLookup[code.charCodeAt(i)] = i;
      }
      revLookup["-".charCodeAt(0)] = 62;
      revLookup["_".charCodeAt(0)] = 63;
      function getLens(b64) {
        var len2 = b64.length;
        if (len2 % 4 > 0) {
          throw new Error("Invalid string. Length must be a multiple of 4");
        }
        var validLen = b64.indexOf("=");
        if (validLen === -1)
          validLen = len2;
        var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
        return [validLen, placeHoldersLen];
      }
      function byteLength(b64) {
        var lens = getLens(b64);
        var validLen = lens[0];
        var placeHoldersLen = lens[1];
        return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
      }
      function _byteLength(b64, validLen, placeHoldersLen) {
        return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
      }
      function toByteArray(b64) {
        var tmp;
        var lens = getLens(b64);
        var validLen = lens[0];
        var placeHoldersLen = lens[1];
        var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
        var curByte = 0;
        var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
        var i2;
        for (i2 = 0; i2 < len2; i2 += 4) {
          tmp = revLookup[b64.charCodeAt(i2)] << 18 | revLookup[b64.charCodeAt(i2 + 1)] << 12 | revLookup[b64.charCodeAt(i2 + 2)] << 6 | revLookup[b64.charCodeAt(i2 + 3)];
          arr[curByte++] = tmp >> 16 & 255;
          arr[curByte++] = tmp >> 8 & 255;
          arr[curByte++] = tmp & 255;
        }
        if (placeHoldersLen === 2) {
          tmp = revLookup[b64.charCodeAt(i2)] << 2 | revLookup[b64.charCodeAt(i2 + 1)] >> 4;
          arr[curByte++] = tmp & 255;
        }
        if (placeHoldersLen === 1) {
          tmp = revLookup[b64.charCodeAt(i2)] << 10 | revLookup[b64.charCodeAt(i2 + 1)] << 4 | revLookup[b64.charCodeAt(i2 + 2)] >> 2;
          arr[curByte++] = tmp >> 8 & 255;
          arr[curByte++] = tmp & 255;
        }
        return arr;
      }
      function tripletToBase64(num) {
        return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
      }
      function encodeChunk(uint8, start, end) {
        var tmp;
        var output = [];
        for (var i2 = start; i2 < end; i2 += 3) {
          tmp = (uint8[i2] << 16 & 16711680) + (uint8[i2 + 1] << 8 & 65280) + (uint8[i2 + 2] & 255);
          output.push(tripletToBase64(tmp));
        }
        return output.join("");
      }
      function fromByteArray(uint8) {
        var tmp;
        var len2 = uint8.length;
        var extraBytes = len2 % 3;
        var parts = [];
        var maxChunkLength = 16383;
        for (var i2 = 0, len22 = len2 - extraBytes; i2 < len22; i2 += maxChunkLength) {
          parts.push(encodeChunk(
            uint8,
            i2,
            i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength
          ));
        }
        if (extraBytes === 1) {
          tmp = uint8[len2 - 1];
          parts.push(
            lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "=="
          );
        } else if (extraBytes === 2) {
          tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
          parts.push(
            lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "="
          );
        }
        return parts.join("");
      }
    }, {}], 14: [function(require2, module2, exports2) {
    }, {}], 15: [function(require2, module2, exports2) {
      arguments[4][14][0].apply(exports2, arguments);
    }, { "dup": 14 }], 16: [function(require2, module2, exports2) {
      (function(global, Buffer) {
        var base64 = require2("base64-js");
        var ieee754 = require2("ieee754");
        var isArray = require2("isarray");
        exports2.Buffer = Buffer;
        exports2.SlowBuffer = SlowBuffer;
        exports2.INSPECT_MAX_BYTES = 50;
        Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== void 0 ? global.TYPED_ARRAY_SUPPORT : typedArraySupport();
        exports2.kMaxLength = kMaxLength();
        function typedArraySupport() {
          try {
            var arr = new Uint8Array(1);
            arr.__proto__ = { __proto__: Uint8Array.prototype, foo: function() {
              return 42;
            } };
            return arr.foo() === 42 && // typed array instances can be augmented
            typeof arr.subarray === "function" && // chrome 9-10 lack `subarray`
            arr.subarray(1, 1).byteLength === 0;
          } catch (e) {
            return false;
          }
        }
        function kMaxLength() {
          return Buffer.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
        }
        function createBuffer(that, length) {
          if (kMaxLength() < length) {
            throw new RangeError("Invalid typed array length");
          }
          if (Buffer.TYPED_ARRAY_SUPPORT) {
            that = new Uint8Array(length);
            that.__proto__ = Buffer.prototype;
          } else {
            if (that === null) {
              that = new Buffer(length);
            }
            that.length = length;
          }
          return that;
        }
        function Buffer(arg, encodingOrOffset, length) {
          if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
            return new Buffer(arg, encodingOrOffset, length);
          }
          if (typeof arg === "number") {
            if (typeof encodingOrOffset === "string") {
              throw new Error(
                "If encoding is specified then the first argument must be a string"
              );
            }
            return allocUnsafe(this, arg);
          }
          return from(this, arg, encodingOrOffset, length);
        }
        Buffer.poolSize = 8192;
        Buffer._augment = function(arr) {
          arr.__proto__ = Buffer.prototype;
          return arr;
        };
        function from(that, value, encodingOrOffset, length) {
          if (typeof value === "number") {
            throw new TypeError('"value" argument must not be a number');
          }
          if (typeof ArrayBuffer !== "undefined" && value instanceof ArrayBuffer) {
            return fromArrayBuffer(that, value, encodingOrOffset, length);
          }
          if (typeof value === "string") {
            return fromString(that, value, encodingOrOffset);
          }
          return fromObject(that, value);
        }
        Buffer.from = function(value, encodingOrOffset, length) {
          return from(null, value, encodingOrOffset, length);
        };
        if (Buffer.TYPED_ARRAY_SUPPORT) {
          Buffer.prototype.__proto__ = Uint8Array.prototype;
          Buffer.__proto__ = Uint8Array;
          if (typeof Symbol !== "undefined" && Symbol.species && Buffer[Symbol.species] === Buffer) {
            Object.defineProperty(Buffer, Symbol.species, {
              value: null,
              configurable: true
            });
          }
        }
        function assertSize(size) {
          if (typeof size !== "number") {
            throw new TypeError('"size" argument must be a number');
          } else if (size < 0) {
            throw new RangeError('"size" argument must not be negative');
          }
        }
        function alloc(that, size, fill, encoding) {
          assertSize(size);
          if (size <= 0) {
            return createBuffer(that, size);
          }
          if (fill !== void 0) {
            return typeof encoding === "string" ? createBuffer(that, size).fill(fill, encoding) : createBuffer(that, size).fill(fill);
          }
          return createBuffer(that, size);
        }
        Buffer.alloc = function(size, fill, encoding) {
          return alloc(null, size, fill, encoding);
        };
        function allocUnsafe(that, size) {
          assertSize(size);
          that = createBuffer(that, size < 0 ? 0 : checked(size) | 0);
          if (!Buffer.TYPED_ARRAY_SUPPORT) {
            for (var i = 0; i < size; ++i) {
              that[i] = 0;
            }
          }
          return that;
        }
        Buffer.allocUnsafe = function(size) {
          return allocUnsafe(null, size);
        };
        Buffer.allocUnsafeSlow = function(size) {
          return allocUnsafe(null, size);
        };
        function fromString(that, string, encoding) {
          if (typeof encoding !== "string" || encoding === "") {
            encoding = "utf8";
          }
          if (!Buffer.isEncoding(encoding)) {
            throw new TypeError('"encoding" must be a valid string encoding');
          }
          var length = byteLength(string, encoding) | 0;
          that = createBuffer(that, length);
          var actual = that.write(string, encoding);
          if (actual !== length) {
            that = that.slice(0, actual);
          }
          return that;
        }
        function fromArrayLike(that, array) {
          var length = array.length < 0 ? 0 : checked(array.length) | 0;
          that = createBuffer(that, length);
          for (var i = 0; i < length; i += 1) {
            that[i] = array[i] & 255;
          }
          return that;
        }
        function fromArrayBuffer(that, array, byteOffset, length) {
          array.byteLength;
          if (byteOffset < 0 || array.byteLength < byteOffset) {
            throw new RangeError("'offset' is out of bounds");
          }
          if (array.byteLength < byteOffset + (length || 0)) {
            throw new RangeError("'length' is out of bounds");
          }
          if (byteOffset === void 0 && length === void 0) {
            array = new Uint8Array(array);
          } else if (length === void 0) {
            array = new Uint8Array(array, byteOffset);
          } else {
            array = new Uint8Array(array, byteOffset, length);
          }
          if (Buffer.TYPED_ARRAY_SUPPORT) {
            that = array;
            that.__proto__ = Buffer.prototype;
          } else {
            that = fromArrayLike(that, array);
          }
          return that;
        }
        function fromObject(that, obj) {
          if (Buffer.isBuffer(obj)) {
            var len = checked(obj.length) | 0;
            that = createBuffer(that, len);
            if (that.length === 0) {
              return that;
            }
            obj.copy(that, 0, 0, len);
            return that;
          }
          if (obj) {
            if (typeof ArrayBuffer !== "undefined" && obj.buffer instanceof ArrayBuffer || "length" in obj) {
              if (typeof obj.length !== "number" || isnan(obj.length)) {
                return createBuffer(that, 0);
              }
              return fromArrayLike(that, obj);
            }
            if (obj.type === "Buffer" && isArray(obj.data)) {
              return fromArrayLike(that, obj.data);
            }
          }
          throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
        }
        function checked(length) {
          if (length >= kMaxLength()) {
            throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + kMaxLength().toString(16) + " bytes");
          }
          return length | 0;
        }
        function SlowBuffer(length) {
          if (+length != length) {
            length = 0;
          }
          return Buffer.alloc(+length);
        }
        Buffer.isBuffer = function isBuffer(b) {
          return !!(b != null && b._isBuffer);
        };
        Buffer.compare = function compare(a, b) {
          if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
            throw new TypeError("Arguments must be Buffers");
          }
          if (a === b)
            return 0;
          var x = a.length;
          var y = b.length;
          for (var i = 0, len = Math.min(x, y); i < len; ++i) {
            if (a[i] !== b[i]) {
              x = a[i];
              y = b[i];
              break;
            }
          }
          if (x < y)
            return -1;
          if (y < x)
            return 1;
          return 0;
        };
        Buffer.isEncoding = function isEncoding(encoding) {
          switch (String(encoding).toLowerCase()) {
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
              return true;
            default:
              return false;
          }
        };
        Buffer.concat = function concat(list, length) {
          if (!isArray(list)) {
            throw new TypeError('"list" argument must be an Array of Buffers');
          }
          if (list.length === 0) {
            return Buffer.alloc(0);
          }
          var i;
          if (length === void 0) {
            length = 0;
            for (i = 0; i < list.length; ++i) {
              length += list[i].length;
            }
          }
          var buffer = Buffer.allocUnsafe(length);
          var pos = 0;
          for (i = 0; i < list.length; ++i) {
            var buf = list[i];
            if (!Buffer.isBuffer(buf)) {
              throw new TypeError('"list" argument must be an Array of Buffers');
            }
            buf.copy(buffer, pos);
            pos += buf.length;
          }
          return buffer;
        };
        function byteLength(string, encoding) {
          if (Buffer.isBuffer(string)) {
            return string.length;
          }
          if (typeof ArrayBuffer !== "undefined" && typeof ArrayBuffer.isView === "function" && (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
            return string.byteLength;
          }
          if (typeof string !== "string") {
            string = "" + string;
          }
          var len = string.length;
          if (len === 0)
            return 0;
          var loweredCase = false;
          for (; ; ) {
            switch (encoding) {
              case "ascii":
              case "latin1":
              case "binary":
                return len;
              case "utf8":
              case "utf-8":
              case void 0:
                return utf8ToBytes(string).length;
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return len * 2;
              case "hex":
                return len >>> 1;
              case "base64":
                return base64ToBytes(string).length;
              default:
                if (loweredCase)
                  return utf8ToBytes(string).length;
                encoding = ("" + encoding).toLowerCase();
                loweredCase = true;
            }
          }
        }
        Buffer.byteLength = byteLength;
        function slowToString(encoding, start, end) {
          var loweredCase = false;
          if (start === void 0 || start < 0) {
            start = 0;
          }
          if (start > this.length) {
            return "";
          }
          if (end === void 0 || end > this.length) {
            end = this.length;
          }
          if (end <= 0) {
            return "";
          }
          end >>>= 0;
          start >>>= 0;
          if (end <= start) {
            return "";
          }
          if (!encoding)
            encoding = "utf8";
          while (true) {
            switch (encoding) {
              case "hex":
                return hexSlice(this, start, end);
              case "utf8":
              case "utf-8":
                return utf8Slice(this, start, end);
              case "ascii":
                return asciiSlice(this, start, end);
              case "latin1":
              case "binary":
                return latin1Slice(this, start, end);
              case "base64":
                return base64Slice(this, start, end);
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return utf16leSlice(this, start, end);
              default:
                if (loweredCase)
                  throw new TypeError("Unknown encoding: " + encoding);
                encoding = (encoding + "").toLowerCase();
                loweredCase = true;
            }
          }
        }
        Buffer.prototype._isBuffer = true;
        function swap(b, n, m) {
          var i = b[n];
          b[n] = b[m];
          b[m] = i;
        }
        Buffer.prototype.swap16 = function swap16() {
          var len = this.length;
          if (len % 2 !== 0) {
            throw new RangeError("Buffer size must be a multiple of 16-bits");
          }
          for (var i = 0; i < len; i += 2) {
            swap(this, i, i + 1);
          }
          return this;
        };
        Buffer.prototype.swap32 = function swap32() {
          var len = this.length;
          if (len % 4 !== 0) {
            throw new RangeError("Buffer size must be a multiple of 32-bits");
          }
          for (var i = 0; i < len; i += 4) {
            swap(this, i, i + 3);
            swap(this, i + 1, i + 2);
          }
          return this;
        };
        Buffer.prototype.swap64 = function swap64() {
          var len = this.length;
          if (len % 8 !== 0) {
            throw new RangeError("Buffer size must be a multiple of 64-bits");
          }
          for (var i = 0; i < len; i += 8) {
            swap(this, i, i + 7);
            swap(this, i + 1, i + 6);
            swap(this, i + 2, i + 5);
            swap(this, i + 3, i + 4);
          }
          return this;
        };
        Buffer.prototype.toString = function toString() {
          var length = this.length | 0;
          if (length === 0)
            return "";
          if (arguments.length === 0)
            return utf8Slice(this, 0, length);
          return slowToString.apply(this, arguments);
        };
        Buffer.prototype.equals = function equals(b) {
          if (!Buffer.isBuffer(b))
            throw new TypeError("Argument must be a Buffer");
          if (this === b)
            return true;
          return Buffer.compare(this, b) === 0;
        };
        Buffer.prototype.inspect = function inspect() {
          var str = "";
          var max = exports2.INSPECT_MAX_BYTES;
          if (this.length > 0) {
            str = this.toString("hex", 0, max).match(/.{2}/g).join(" ");
            if (this.length > max)
              str += " ... ";
          }
          return "<Buffer " + str + ">";
        };
        Buffer.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
          if (!Buffer.isBuffer(target)) {
            throw new TypeError("Argument must be a Buffer");
          }
          if (start === void 0) {
            start = 0;
          }
          if (end === void 0) {
            end = target ? target.length : 0;
          }
          if (thisStart === void 0) {
            thisStart = 0;
          }
          if (thisEnd === void 0) {
            thisEnd = this.length;
          }
          if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
            throw new RangeError("out of range index");
          }
          if (thisStart >= thisEnd && start >= end) {
            return 0;
          }
          if (thisStart >= thisEnd) {
            return -1;
          }
          if (start >= end) {
            return 1;
          }
          start >>>= 0;
          end >>>= 0;
          thisStart >>>= 0;
          thisEnd >>>= 0;
          if (this === target)
            return 0;
          var x = thisEnd - thisStart;
          var y = end - start;
          var len = Math.min(x, y);
          var thisCopy = this.slice(thisStart, thisEnd);
          var targetCopy = target.slice(start, end);
          for (var i = 0; i < len; ++i) {
            if (thisCopy[i] !== targetCopy[i]) {
              x = thisCopy[i];
              y = targetCopy[i];
              break;
            }
          }
          if (x < y)
            return -1;
          if (y < x)
            return 1;
          return 0;
        };
        function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
          if (buffer.length === 0)
            return -1;
          if (typeof byteOffset === "string") {
            encoding = byteOffset;
            byteOffset = 0;
          } else if (byteOffset > 2147483647) {
            byteOffset = 2147483647;
          } else if (byteOffset < -2147483648) {
            byteOffset = -2147483648;
          }
          byteOffset = +byteOffset;
          if (isNaN(byteOffset)) {
            byteOffset = dir ? 0 : buffer.length - 1;
          }
          if (byteOffset < 0)
            byteOffset = buffer.length + byteOffset;
          if (byteOffset >= buffer.length) {
            if (dir)
              return -1;
            else
              byteOffset = buffer.length - 1;
          } else if (byteOffset < 0) {
            if (dir)
              byteOffset = 0;
            else
              return -1;
          }
          if (typeof val === "string") {
            val = Buffer.from(val, encoding);
          }
          if (Buffer.isBuffer(val)) {
            if (val.length === 0) {
              return -1;
            }
            return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
          } else if (typeof val === "number") {
            val = val & 255;
            if (Buffer.TYPED_ARRAY_SUPPORT && typeof Uint8Array.prototype.indexOf === "function") {
              if (dir) {
                return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
              } else {
                return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
              }
            }
            return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
          }
          throw new TypeError("val must be string, number or Buffer");
        }
        function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
          var indexSize = 1;
          var arrLength = arr.length;
          var valLength = val.length;
          if (encoding !== void 0) {
            encoding = String(encoding).toLowerCase();
            if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
              if (arr.length < 2 || val.length < 2) {
                return -1;
              }
              indexSize = 2;
              arrLength /= 2;
              valLength /= 2;
              byteOffset /= 2;
            }
          }
          function read(buf, i2) {
            if (indexSize === 1) {
              return buf[i2];
            } else {
              return buf.readUInt16BE(i2 * indexSize);
            }
          }
          var i;
          if (dir) {
            var foundIndex = -1;
            for (i = byteOffset; i < arrLength; i++) {
              if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
                if (foundIndex === -1)
                  foundIndex = i;
                if (i - foundIndex + 1 === valLength)
                  return foundIndex * indexSize;
              } else {
                if (foundIndex !== -1)
                  i -= i - foundIndex;
                foundIndex = -1;
              }
            }
          } else {
            if (byteOffset + valLength > arrLength)
              byteOffset = arrLength - valLength;
            for (i = byteOffset; i >= 0; i--) {
              var found = true;
              for (var j = 0; j < valLength; j++) {
                if (read(arr, i + j) !== read(val, j)) {
                  found = false;
                  break;
                }
              }
              if (found)
                return i;
            }
          }
          return -1;
        }
        Buffer.prototype.includes = function includes(val, byteOffset, encoding) {
          return this.indexOf(val, byteOffset, encoding) !== -1;
        };
        Buffer.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
          return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
        };
        Buffer.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
          return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
        };
        function hexWrite(buf, string, offset, length) {
          offset = Number(offset) || 0;
          var remaining = buf.length - offset;
          if (!length) {
            length = remaining;
          } else {
            length = Number(length);
            if (length > remaining) {
              length = remaining;
            }
          }
          var strLen = string.length;
          if (strLen % 2 !== 0)
            throw new TypeError("Invalid hex string");
          if (length > strLen / 2) {
            length = strLen / 2;
          }
          for (var i = 0; i < length; ++i) {
            var parsed = parseInt(string.substr(i * 2, 2), 16);
            if (isNaN(parsed))
              return i;
            buf[offset + i] = parsed;
          }
          return i;
        }
        function utf8Write(buf, string, offset, length) {
          return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
        }
        function asciiWrite(buf, string, offset, length) {
          return blitBuffer(asciiToBytes(string), buf, offset, length);
        }
        function latin1Write(buf, string, offset, length) {
          return asciiWrite(buf, string, offset, length);
        }
        function base64Write(buf, string, offset, length) {
          return blitBuffer(base64ToBytes(string), buf, offset, length);
        }
        function ucs2Write(buf, string, offset, length) {
          return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
        }
        Buffer.prototype.write = function write(string, offset, length, encoding) {
          if (offset === void 0) {
            encoding = "utf8";
            length = this.length;
            offset = 0;
          } else if (length === void 0 && typeof offset === "string") {
            encoding = offset;
            length = this.length;
            offset = 0;
          } else if (isFinite(offset)) {
            offset = offset | 0;
            if (isFinite(length)) {
              length = length | 0;
              if (encoding === void 0)
                encoding = "utf8";
            } else {
              encoding = length;
              length = void 0;
            }
          } else {
            throw new Error(
              "Buffer.write(string, encoding, offset[, length]) is no longer supported"
            );
          }
          var remaining = this.length - offset;
          if (length === void 0 || length > remaining)
            length = remaining;
          if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
            throw new RangeError("Attempt to write outside buffer bounds");
          }
          if (!encoding)
            encoding = "utf8";
          var loweredCase = false;
          for (; ; ) {
            switch (encoding) {
              case "hex":
                return hexWrite(this, string, offset, length);
              case "utf8":
              case "utf-8":
                return utf8Write(this, string, offset, length);
              case "ascii":
                return asciiWrite(this, string, offset, length);
              case "latin1":
              case "binary":
                return latin1Write(this, string, offset, length);
              case "base64":
                return base64Write(this, string, offset, length);
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return ucs2Write(this, string, offset, length);
              default:
                if (loweredCase)
                  throw new TypeError("Unknown encoding: " + encoding);
                encoding = ("" + encoding).toLowerCase();
                loweredCase = true;
            }
          }
        };
        Buffer.prototype.toJSON = function toJSON() {
          return {
            type: "Buffer",
            data: Array.prototype.slice.call(this._arr || this, 0)
          };
        };
        function base64Slice(buf, start, end) {
          if (start === 0 && end === buf.length) {
            return base64.fromByteArray(buf);
          } else {
            return base64.fromByteArray(buf.slice(start, end));
          }
        }
        function utf8Slice(buf, start, end) {
          end = Math.min(buf.length, end);
          var res = [];
          var i = start;
          while (i < end) {
            var firstByte = buf[i];
            var codePoint = null;
            var bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
            if (i + bytesPerSequence <= end) {
              var secondByte, thirdByte, fourthByte, tempCodePoint;
              switch (bytesPerSequence) {
                case 1:
                  if (firstByte < 128) {
                    codePoint = firstByte;
                  }
                  break;
                case 2:
                  secondByte = buf[i + 1];
                  if ((secondByte & 192) === 128) {
                    tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
                    if (tempCodePoint > 127) {
                      codePoint = tempCodePoint;
                    }
                  }
                  break;
                case 3:
                  secondByte = buf[i + 1];
                  thirdByte = buf[i + 2];
                  if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
                    tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
                    if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                      codePoint = tempCodePoint;
                    }
                  }
                  break;
                case 4:
                  secondByte = buf[i + 1];
                  thirdByte = buf[i + 2];
                  fourthByte = buf[i + 3];
                  if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
                    tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
                    if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                      codePoint = tempCodePoint;
                    }
                  }
              }
            }
            if (codePoint === null) {
              codePoint = 65533;
              bytesPerSequence = 1;
            } else if (codePoint > 65535) {
              codePoint -= 65536;
              res.push(codePoint >>> 10 & 1023 | 55296);
              codePoint = 56320 | codePoint & 1023;
            }
            res.push(codePoint);
            i += bytesPerSequence;
          }
          return decodeCodePointsArray(res);
        }
        var MAX_ARGUMENTS_LENGTH = 4096;
        function decodeCodePointsArray(codePoints) {
          var len = codePoints.length;
          if (len <= MAX_ARGUMENTS_LENGTH) {
            return String.fromCharCode.apply(String, codePoints);
          }
          var res = "";
          var i = 0;
          while (i < len) {
            res += String.fromCharCode.apply(
              String,
              codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
            );
          }
          return res;
        }
        function asciiSlice(buf, start, end) {
          var ret = "";
          end = Math.min(buf.length, end);
          for (var i = start; i < end; ++i) {
            ret += String.fromCharCode(buf[i] & 127);
          }
          return ret;
        }
        function latin1Slice(buf, start, end) {
          var ret = "";
          end = Math.min(buf.length, end);
          for (var i = start; i < end; ++i) {
            ret += String.fromCharCode(buf[i]);
          }
          return ret;
        }
        function hexSlice(buf, start, end) {
          var len = buf.length;
          if (!start || start < 0)
            start = 0;
          if (!end || end < 0 || end > len)
            end = len;
          var out = "";
          for (var i = start; i < end; ++i) {
            out += toHex(buf[i]);
          }
          return out;
        }
        function utf16leSlice(buf, start, end) {
          var bytes = buf.slice(start, end);
          var res = "";
          for (var i = 0; i < bytes.length; i += 2) {
            res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
          }
          return res;
        }
        Buffer.prototype.slice = function slice(start, end) {
          var len = this.length;
          start = ~~start;
          end = end === void 0 ? len : ~~end;
          if (start < 0) {
            start += len;
            if (start < 0)
              start = 0;
          } else if (start > len) {
            start = len;
          }
          if (end < 0) {
            end += len;
            if (end < 0)
              end = 0;
          } else if (end > len) {
            end = len;
          }
          if (end < start)
            end = start;
          var newBuf;
          if (Buffer.TYPED_ARRAY_SUPPORT) {
            newBuf = this.subarray(start, end);
            newBuf.__proto__ = Buffer.prototype;
          } else {
            var sliceLen = end - start;
            newBuf = new Buffer(sliceLen, void 0);
            for (var i = 0; i < sliceLen; ++i) {
              newBuf[i] = this[i + start];
            }
          }
          return newBuf;
        };
        function checkOffset(offset, ext, length) {
          if (offset % 1 !== 0 || offset < 0)
            throw new RangeError("offset is not uint");
          if (offset + ext > length)
            throw new RangeError("Trying to access beyond buffer length");
        }
        Buffer.prototype.readUIntLE = function readUIntLE(offset, byteLength2, noAssert) {
          offset = offset | 0;
          byteLength2 = byteLength2 | 0;
          if (!noAssert)
            checkOffset(offset, byteLength2, this.length);
          var val = this[offset];
          var mul = 1;
          var i = 0;
          while (++i < byteLength2 && (mul *= 256)) {
            val += this[offset + i] * mul;
          }
          return val;
        };
        Buffer.prototype.readUIntBE = function readUIntBE(offset, byteLength2, noAssert) {
          offset = offset | 0;
          byteLength2 = byteLength2 | 0;
          if (!noAssert) {
            checkOffset(offset, byteLength2, this.length);
          }
          var val = this[offset + --byteLength2];
          var mul = 1;
          while (byteLength2 > 0 && (mul *= 256)) {
            val += this[offset + --byteLength2] * mul;
          }
          return val;
        };
        Buffer.prototype.readUInt8 = function readUInt8(offset, noAssert) {
          if (!noAssert)
            checkOffset(offset, 1, this.length);
          return this[offset];
        };
        Buffer.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
          if (!noAssert)
            checkOffset(offset, 2, this.length);
          return this[offset] | this[offset + 1] << 8;
        };
        Buffer.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
          if (!noAssert)
            checkOffset(offset, 2, this.length);
          return this[offset] << 8 | this[offset + 1];
        };
        Buffer.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
          if (!noAssert)
            checkOffset(offset, 4, this.length);
          return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
        };
        Buffer.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
          if (!noAssert)
            checkOffset(offset, 4, this.length);
          return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
        };
        Buffer.prototype.readIntLE = function readIntLE(offset, byteLength2, noAssert) {
          offset = offset | 0;
          byteLength2 = byteLength2 | 0;
          if (!noAssert)
            checkOffset(offset, byteLength2, this.length);
          var val = this[offset];
          var mul = 1;
          var i = 0;
          while (++i < byteLength2 && (mul *= 256)) {
            val += this[offset + i] * mul;
          }
          mul *= 128;
          if (val >= mul)
            val -= Math.pow(2, 8 * byteLength2);
          return val;
        };
        Buffer.prototype.readIntBE = function readIntBE(offset, byteLength2, noAssert) {
          offset = offset | 0;
          byteLength2 = byteLength2 | 0;
          if (!noAssert)
            checkOffset(offset, byteLength2, this.length);
          var i = byteLength2;
          var mul = 1;
          var val = this[offset + --i];
          while (i > 0 && (mul *= 256)) {
            val += this[offset + --i] * mul;
          }
          mul *= 128;
          if (val >= mul)
            val -= Math.pow(2, 8 * byteLength2);
          return val;
        };
        Buffer.prototype.readInt8 = function readInt8(offset, noAssert) {
          if (!noAssert)
            checkOffset(offset, 1, this.length);
          if (!(this[offset] & 128))
            return this[offset];
          return (255 - this[offset] + 1) * -1;
        };
        Buffer.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
          if (!noAssert)
            checkOffset(offset, 2, this.length);
          var val = this[offset] | this[offset + 1] << 8;
          return val & 32768 ? val | 4294901760 : val;
        };
        Buffer.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
          if (!noAssert)
            checkOffset(offset, 2, this.length);
          var val = this[offset + 1] | this[offset] << 8;
          return val & 32768 ? val | 4294901760 : val;
        };
        Buffer.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
          if (!noAssert)
            checkOffset(offset, 4, this.length);
          return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
        };
        Buffer.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
          if (!noAssert)
            checkOffset(offset, 4, this.length);
          return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
        };
        Buffer.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
          if (!noAssert)
            checkOffset(offset, 4, this.length);
          return ieee754.read(this, offset, true, 23, 4);
        };
        Buffer.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
          if (!noAssert)
            checkOffset(offset, 4, this.length);
          return ieee754.read(this, offset, false, 23, 4);
        };
        Buffer.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
          if (!noAssert)
            checkOffset(offset, 8, this.length);
          return ieee754.read(this, offset, true, 52, 8);
        };
        Buffer.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
          if (!noAssert)
            checkOffset(offset, 8, this.length);
          return ieee754.read(this, offset, false, 52, 8);
        };
        function checkInt(buf, value, offset, ext, max, min) {
          if (!Buffer.isBuffer(buf))
            throw new TypeError('"buffer" argument must be a Buffer instance');
          if (value > max || value < min)
            throw new RangeError('"value" argument is out of bounds');
          if (offset + ext > buf.length)
            throw new RangeError("Index out of range");
        }
        Buffer.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength2, noAssert) {
          value = +value;
          offset = offset | 0;
          byteLength2 = byteLength2 | 0;
          if (!noAssert) {
            var maxBytes = Math.pow(2, 8 * byteLength2) - 1;
            checkInt(this, value, offset, byteLength2, maxBytes, 0);
          }
          var mul = 1;
          var i = 0;
          this[offset] = value & 255;
          while (++i < byteLength2 && (mul *= 256)) {
            this[offset + i] = value / mul & 255;
          }
          return offset + byteLength2;
        };
        Buffer.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength2, noAssert) {
          value = +value;
          offset = offset | 0;
          byteLength2 = byteLength2 | 0;
          if (!noAssert) {
            var maxBytes = Math.pow(2, 8 * byteLength2) - 1;
            checkInt(this, value, offset, byteLength2, maxBytes, 0);
          }
          var i = byteLength2 - 1;
          var mul = 1;
          this[offset + i] = value & 255;
          while (--i >= 0 && (mul *= 256)) {
            this[offset + i] = value / mul & 255;
          }
          return offset + byteLength2;
        };
        Buffer.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
          value = +value;
          offset = offset | 0;
          if (!noAssert)
            checkInt(this, value, offset, 1, 255, 0);
          if (!Buffer.TYPED_ARRAY_SUPPORT)
            value = Math.floor(value);
          this[offset] = value & 255;
          return offset + 1;
        };
        function objectWriteUInt16(buf, value, offset, littleEndian) {
          if (value < 0)
            value = 65535 + value + 1;
          for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
            buf[offset + i] = (value & 255 << 8 * (littleEndian ? i : 1 - i)) >>> (littleEndian ? i : 1 - i) * 8;
          }
        }
        Buffer.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
          value = +value;
          offset = offset | 0;
          if (!noAssert)
            checkInt(this, value, offset, 2, 65535, 0);
          if (Buffer.TYPED_ARRAY_SUPPORT) {
            this[offset] = value & 255;
            this[offset + 1] = value >>> 8;
          } else {
            objectWriteUInt16(this, value, offset, true);
          }
          return offset + 2;
        };
        Buffer.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
          value = +value;
          offset = offset | 0;
          if (!noAssert)
            checkInt(this, value, offset, 2, 65535, 0);
          if (Buffer.TYPED_ARRAY_SUPPORT) {
            this[offset] = value >>> 8;
            this[offset + 1] = value & 255;
          } else {
            objectWriteUInt16(this, value, offset, false);
          }
          return offset + 2;
        };
        function objectWriteUInt32(buf, value, offset, littleEndian) {
          if (value < 0)
            value = 4294967295 + value + 1;
          for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
            buf[offset + i] = value >>> (littleEndian ? i : 3 - i) * 8 & 255;
          }
        }
        Buffer.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
          value = +value;
          offset = offset | 0;
          if (!noAssert)
            checkInt(this, value, offset, 4, 4294967295, 0);
          if (Buffer.TYPED_ARRAY_SUPPORT) {
            this[offset + 3] = value >>> 24;
            this[offset + 2] = value >>> 16;
            this[offset + 1] = value >>> 8;
            this[offset] = value & 255;
          } else {
            objectWriteUInt32(this, value, offset, true);
          }
          return offset + 4;
        };
        Buffer.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
          value = +value;
          offset = offset | 0;
          if (!noAssert)
            checkInt(this, value, offset, 4, 4294967295, 0);
          if (Buffer.TYPED_ARRAY_SUPPORT) {
            this[offset] = value >>> 24;
            this[offset + 1] = value >>> 16;
            this[offset + 2] = value >>> 8;
            this[offset + 3] = value & 255;
          } else {
            objectWriteUInt32(this, value, offset, false);
          }
          return offset + 4;
        };
        Buffer.prototype.writeIntLE = function writeIntLE(value, offset, byteLength2, noAssert) {
          value = +value;
          offset = offset | 0;
          if (!noAssert) {
            var limit = Math.pow(2, 8 * byteLength2 - 1);
            checkInt(this, value, offset, byteLength2, limit - 1, -limit);
          }
          var i = 0;
          var mul = 1;
          var sub = 0;
          this[offset] = value & 255;
          while (++i < byteLength2 && (mul *= 256)) {
            if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
              sub = 1;
            }
            this[offset + i] = (value / mul >> 0) - sub & 255;
          }
          return offset + byteLength2;
        };
        Buffer.prototype.writeIntBE = function writeIntBE(value, offset, byteLength2, noAssert) {
          value = +value;
          offset = offset | 0;
          if (!noAssert) {
            var limit = Math.pow(2, 8 * byteLength2 - 1);
            checkInt(this, value, offset, byteLength2, limit - 1, -limit);
          }
          var i = byteLength2 - 1;
          var mul = 1;
          var sub = 0;
          this[offset + i] = value & 255;
          while (--i >= 0 && (mul *= 256)) {
            if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
              sub = 1;
            }
            this[offset + i] = (value / mul >> 0) - sub & 255;
          }
          return offset + byteLength2;
        };
        Buffer.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
          value = +value;
          offset = offset | 0;
          if (!noAssert)
            checkInt(this, value, offset, 1, 127, -128);
          if (!Buffer.TYPED_ARRAY_SUPPORT)
            value = Math.floor(value);
          if (value < 0)
            value = 255 + value + 1;
          this[offset] = value & 255;
          return offset + 1;
        };
        Buffer.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
          value = +value;
          offset = offset | 0;
          if (!noAssert)
            checkInt(this, value, offset, 2, 32767, -32768);
          if (Buffer.TYPED_ARRAY_SUPPORT) {
            this[offset] = value & 255;
            this[offset + 1] = value >>> 8;
          } else {
            objectWriteUInt16(this, value, offset, true);
          }
          return offset + 2;
        };
        Buffer.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
          value = +value;
          offset = offset | 0;
          if (!noAssert)
            checkInt(this, value, offset, 2, 32767, -32768);
          if (Buffer.TYPED_ARRAY_SUPPORT) {
            this[offset] = value >>> 8;
            this[offset + 1] = value & 255;
          } else {
            objectWriteUInt16(this, value, offset, false);
          }
          return offset + 2;
        };
        Buffer.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
          value = +value;
          offset = offset | 0;
          if (!noAssert)
            checkInt(this, value, offset, 4, 2147483647, -2147483648);
          if (Buffer.TYPED_ARRAY_SUPPORT) {
            this[offset] = value & 255;
            this[offset + 1] = value >>> 8;
            this[offset + 2] = value >>> 16;
            this[offset + 3] = value >>> 24;
          } else {
            objectWriteUInt32(this, value, offset, true);
          }
          return offset + 4;
        };
        Buffer.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
          value = +value;
          offset = offset | 0;
          if (!noAssert)
            checkInt(this, value, offset, 4, 2147483647, -2147483648);
          if (value < 0)
            value = 4294967295 + value + 1;
          if (Buffer.TYPED_ARRAY_SUPPORT) {
            this[offset] = value >>> 24;
            this[offset + 1] = value >>> 16;
            this[offset + 2] = value >>> 8;
            this[offset + 3] = value & 255;
          } else {
            objectWriteUInt32(this, value, offset, false);
          }
          return offset + 4;
        };
        function checkIEEE754(buf, value, offset, ext, max, min) {
          if (offset + ext > buf.length)
            throw new RangeError("Index out of range");
          if (offset < 0)
            throw new RangeError("Index out of range");
        }
        function writeFloat(buf, value, offset, littleEndian, noAssert) {
          if (!noAssert) {
            checkIEEE754(buf, value, offset, 4);
          }
          ieee754.write(buf, value, offset, littleEndian, 23, 4);
          return offset + 4;
        }
        Buffer.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
          return writeFloat(this, value, offset, true, noAssert);
        };
        Buffer.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
          return writeFloat(this, value, offset, false, noAssert);
        };
        function writeDouble(buf, value, offset, littleEndian, noAssert) {
          if (!noAssert) {
            checkIEEE754(buf, value, offset, 8);
          }
          ieee754.write(buf, value, offset, littleEndian, 52, 8);
          return offset + 8;
        }
        Buffer.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
          return writeDouble(this, value, offset, true, noAssert);
        };
        Buffer.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
          return writeDouble(this, value, offset, false, noAssert);
        };
        Buffer.prototype.copy = function copy(target, targetStart, start, end) {
          if (!start)
            start = 0;
          if (!end && end !== 0)
            end = this.length;
          if (targetStart >= target.length)
            targetStart = target.length;
          if (!targetStart)
            targetStart = 0;
          if (end > 0 && end < start)
            end = start;
          if (end === start)
            return 0;
          if (target.length === 0 || this.length === 0)
            return 0;
          if (targetStart < 0) {
            throw new RangeError("targetStart out of bounds");
          }
          if (start < 0 || start >= this.length)
            throw new RangeError("sourceStart out of bounds");
          if (end < 0)
            throw new RangeError("sourceEnd out of bounds");
          if (end > this.length)
            end = this.length;
          if (target.length - targetStart < end - start) {
            end = target.length - targetStart + start;
          }
          var len = end - start;
          var i;
          if (this === target && start < targetStart && targetStart < end) {
            for (i = len - 1; i >= 0; --i) {
              target[i + targetStart] = this[i + start];
            }
          } else if (len < 1e3 || !Buffer.TYPED_ARRAY_SUPPORT) {
            for (i = 0; i < len; ++i) {
              target[i + targetStart] = this[i + start];
            }
          } else {
            Uint8Array.prototype.set.call(
              target,
              this.subarray(start, start + len),
              targetStart
            );
          }
          return len;
        };
        Buffer.prototype.fill = function fill(val, start, end, encoding) {
          if (typeof val === "string") {
            if (typeof start === "string") {
              encoding = start;
              start = 0;
              end = this.length;
            } else if (typeof end === "string") {
              encoding = end;
              end = this.length;
            }
            if (val.length === 1) {
              var code = val.charCodeAt(0);
              if (code < 256) {
                val = code;
              }
            }
            if (encoding !== void 0 && typeof encoding !== "string") {
              throw new TypeError("encoding must be a string");
            }
            if (typeof encoding === "string" && !Buffer.isEncoding(encoding)) {
              throw new TypeError("Unknown encoding: " + encoding);
            }
          } else if (typeof val === "number") {
            val = val & 255;
          }
          if (start < 0 || this.length < start || this.length < end) {
            throw new RangeError("Out of range index");
          }
          if (end <= start) {
            return this;
          }
          start = start >>> 0;
          end = end === void 0 ? this.length : end >>> 0;
          if (!val)
            val = 0;
          var i;
          if (typeof val === "number") {
            for (i = start; i < end; ++i) {
              this[i] = val;
            }
          } else {
            var bytes = Buffer.isBuffer(val) ? val : utf8ToBytes(new Buffer(val, encoding).toString());
            var len = bytes.length;
            for (i = 0; i < end - start; ++i) {
              this[i + start] = bytes[i % len];
            }
          }
          return this;
        };
        var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;
        function base64clean(str) {
          str = stringtrim(str).replace(INVALID_BASE64_RE, "");
          if (str.length < 2)
            return "";
          while (str.length % 4 !== 0) {
            str = str + "=";
          }
          return str;
        }
        function stringtrim(str) {
          if (str.trim)
            return str.trim();
          return str.replace(/^\s+|\s+$/g, "");
        }
        function toHex(n) {
          if (n < 16)
            return "0" + n.toString(16);
          return n.toString(16);
        }
        function utf8ToBytes(string, units) {
          units = units || Infinity;
          var codePoint;
          var length = string.length;
          var leadSurrogate = null;
          var bytes = [];
          for (var i = 0; i < length; ++i) {
            codePoint = string.charCodeAt(i);
            if (codePoint > 55295 && codePoint < 57344) {
              if (!leadSurrogate) {
                if (codePoint > 56319) {
                  if ((units -= 3) > -1)
                    bytes.push(239, 191, 189);
                  continue;
                } else if (i + 1 === length) {
                  if ((units -= 3) > -1)
                    bytes.push(239, 191, 189);
                  continue;
                }
                leadSurrogate = codePoint;
                continue;
              }
              if (codePoint < 56320) {
                if ((units -= 3) > -1)
                  bytes.push(239, 191, 189);
                leadSurrogate = codePoint;
                continue;
              }
              codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
            } else if (leadSurrogate) {
              if ((units -= 3) > -1)
                bytes.push(239, 191, 189);
            }
            leadSurrogate = null;
            if (codePoint < 128) {
              if ((units -= 1) < 0)
                break;
              bytes.push(codePoint);
            } else if (codePoint < 2048) {
              if ((units -= 2) < 0)
                break;
              bytes.push(
                codePoint >> 6 | 192,
                codePoint & 63 | 128
              );
            } else if (codePoint < 65536) {
              if ((units -= 3) < 0)
                break;
              bytes.push(
                codePoint >> 12 | 224,
                codePoint >> 6 & 63 | 128,
                codePoint & 63 | 128
              );
            } else if (codePoint < 1114112) {
              if ((units -= 4) < 0)
                break;
              bytes.push(
                codePoint >> 18 | 240,
                codePoint >> 12 & 63 | 128,
                codePoint >> 6 & 63 | 128,
                codePoint & 63 | 128
              );
            } else {
              throw new Error("Invalid code point");
            }
          }
          return bytes;
        }
        function asciiToBytes(str) {
          var byteArray = [];
          for (var i = 0; i < str.length; ++i) {
            byteArray.push(str.charCodeAt(i) & 255);
          }
          return byteArray;
        }
        function utf16leToBytes(str, units) {
          var c, hi, lo;
          var byteArray = [];
          for (var i = 0; i < str.length; ++i) {
            if ((units -= 2) < 0)
              break;
            c = str.charCodeAt(i);
            hi = c >> 8;
            lo = c % 256;
            byteArray.push(lo);
            byteArray.push(hi);
          }
          return byteArray;
        }
        function base64ToBytes(str) {
          return base64.toByteArray(base64clean(str));
        }
        function blitBuffer(src, dst, offset, length) {
          for (var i = 0; i < length; ++i) {
            if (i + offset >= dst.length || i >= src.length)
              break;
            dst[i + offset] = src[i];
          }
          return i;
        }
        function isnan(val) {
          return val !== val;
        }
      }).call(this, typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require2("buffer").Buffer);
    }, { "base64-js": 13, "buffer": 16, "ieee754": 23, "isarray": 26 }], 17: [function(require2, module2, exports2) {
      module2.exports = {
        "100": "Continue",
        "101": "Switching Protocols",
        "102": "Processing",
        "200": "OK",
        "201": "Created",
        "202": "Accepted",
        "203": "Non-Authoritative Information",
        "204": "No Content",
        "205": "Reset Content",
        "206": "Partial Content",
        "207": "Multi-Status",
        "208": "Already Reported",
        "226": "IM Used",
        "300": "Multiple Choices",
        "301": "Moved Permanently",
        "302": "Found",
        "303": "See Other",
        "304": "Not Modified",
        "305": "Use Proxy",
        "307": "Temporary Redirect",
        "308": "Permanent Redirect",
        "400": "Bad Request",
        "401": "Unauthorized",
        "402": "Payment Required",
        "403": "Forbidden",
        "404": "Not Found",
        "405": "Method Not Allowed",
        "406": "Not Acceptable",
        "407": "Proxy Authentication Required",
        "408": "Request Timeout",
        "409": "Conflict",
        "410": "Gone",
        "411": "Length Required",
        "412": "Precondition Failed",
        "413": "Payload Too Large",
        "414": "URI Too Long",
        "415": "Unsupported Media Type",
        "416": "Range Not Satisfiable",
        "417": "Expectation Failed",
        "418": "I'm a teapot",
        "421": "Misdirected Request",
        "422": "Unprocessable Entity",
        "423": "Locked",
        "424": "Failed Dependency",
        "425": "Unordered Collection",
        "426": "Upgrade Required",
        "428": "Precondition Required",
        "429": "Too Many Requests",
        "431": "Request Header Fields Too Large",
        "451": "Unavailable For Legal Reasons",
        "500": "Internal Server Error",
        "501": "Not Implemented",
        "502": "Bad Gateway",
        "503": "Service Unavailable",
        "504": "Gateway Timeout",
        "505": "HTTP Version Not Supported",
        "506": "Variant Also Negotiates",
        "507": "Insufficient Storage",
        "508": "Loop Detected",
        "509": "Bandwidth Limit Exceeded",
        "510": "Not Extended",
        "511": "Network Authentication Required"
      };
    }, {}], 18: [function(require2, module2, exports2) {
      (function(Buffer) {
        var util = require2("util");
        var Stream = require2("stream").Stream;
        var DelayedStream = require2("delayed-stream");
        module2.exports = CombinedStream;
        function CombinedStream() {
          this.writable = false;
          this.readable = true;
          this.dataSize = 0;
          this.maxDataSize = 2 * 1024 * 1024;
          this.pauseStreams = true;
          this._released = false;
          this._streams = [];
          this._currentStream = null;
          this._insideLoop = false;
          this._pendingNext = false;
        }
        util.inherits(CombinedStream, Stream);
        CombinedStream.create = function(options) {
          var combinedStream = new this();
          options = options || {};
          for (var option in options) {
            combinedStream[option] = options[option];
          }
          return combinedStream;
        };
        CombinedStream.isStreamLike = function(stream) {
          return typeof stream !== "function" && typeof stream !== "string" && typeof stream !== "boolean" && typeof stream !== "number" && !Buffer.isBuffer(stream);
        };
        CombinedStream.prototype.append = function(stream) {
          var isStreamLike = CombinedStream.isStreamLike(stream);
          if (isStreamLike) {
            if (!(stream instanceof DelayedStream)) {
              var newStream = DelayedStream.create(stream, {
                maxDataSize: Infinity,
                pauseStream: this.pauseStreams
              });
              stream.on("data", this._checkDataSize.bind(this));
              stream = newStream;
            }
            this._handleErrors(stream);
            if (this.pauseStreams) {
              stream.pause();
            }
          }
          this._streams.push(stream);
          return this;
        };
        CombinedStream.prototype.pipe = function(dest, options) {
          Stream.prototype.pipe.call(this, dest, options);
          this.resume();
          return dest;
        };
        CombinedStream.prototype._getNext = function() {
          this._currentStream = null;
          if (this._insideLoop) {
            this._pendingNext = true;
            return;
          }
          this._insideLoop = true;
          try {
            do {
              this._pendingNext = false;
              this._realGetNext();
            } while (this._pendingNext);
          } finally {
            this._insideLoop = false;
          }
        };
        CombinedStream.prototype._realGetNext = function() {
          var stream = this._streams.shift();
          if (typeof stream == "undefined") {
            this.end();
            return;
          }
          if (typeof stream !== "function") {
            this._pipeNext(stream);
            return;
          }
          var getStream = stream;
          getStream(function(stream2) {
            var isStreamLike = CombinedStream.isStreamLike(stream2);
            if (isStreamLike) {
              stream2.on("data", this._checkDataSize.bind(this));
              this._handleErrors(stream2);
            }
            this._pipeNext(stream2);
          }.bind(this));
        };
        CombinedStream.prototype._pipeNext = function(stream) {
          this._currentStream = stream;
          var isStreamLike = CombinedStream.isStreamLike(stream);
          if (isStreamLike) {
            stream.on("end", this._getNext.bind(this));
            stream.pipe(this, { end: false });
            return;
          }
          var value = stream;
          this.write(value);
          this._getNext();
        };
        CombinedStream.prototype._handleErrors = function(stream) {
          var self2 = this;
          stream.on("error", function(err) {
            self2._emitError(err);
          });
        };
        CombinedStream.prototype.write = function(data) {
          this.emit("data", data);
        };
        CombinedStream.prototype.pause = function() {
          if (!this.pauseStreams) {
            return;
          }
          if (this.pauseStreams && this._currentStream && typeof this._currentStream.pause == "function")
            this._currentStream.pause();
          this.emit("pause");
        };
        CombinedStream.prototype.resume = function() {
          if (!this._released) {
            this._released = true;
            this.writable = true;
            this._getNext();
          }
          if (this.pauseStreams && this._currentStream && typeof this._currentStream.resume == "function")
            this._currentStream.resume();
          this.emit("resume");
        };
        CombinedStream.prototype.end = function() {
          this._reset();
          this.emit("end");
        };
        CombinedStream.prototype.destroy = function() {
          this._reset();
          this.emit("close");
        };
        CombinedStream.prototype._reset = function() {
          this.writable = false;
          this._streams = [];
          this._currentStream = null;
        };
        CombinedStream.prototype._checkDataSize = function() {
          this._updateDataSize();
          if (this.dataSize <= this.maxDataSize) {
            return;
          }
          var message = "DelayedStream#maxDataSize of " + this.maxDataSize + " bytes exceeded.";
          this._emitError(new Error(message));
        };
        CombinedStream.prototype._updateDataSize = function() {
          this.dataSize = 0;
          var self2 = this;
          this._streams.forEach(function(stream) {
            if (!stream.dataSize) {
              return;
            }
            self2.dataSize += stream.dataSize;
          });
          if (this._currentStream && this._currentStream.dataSize) {
            this.dataSize += this._currentStream.dataSize;
          }
        };
        CombinedStream.prototype._emitError = function(err) {
          this._reset();
          this.emit("error", err);
        };
      }).call(this, { "isBuffer": require2("../../is-buffer/index.js") });
    }, { "../../is-buffer/index.js": 25, "delayed-stream": 20, "stream": 52, "util": 64 }], 19: [function(require2, module2, exports2) {
      (function(Buffer) {
        function isArray(arg) {
          if (Array.isArray) {
            return Array.isArray(arg);
          }
          return objectToString(arg) === "[object Array]";
        }
        exports2.isArray = isArray;
        function isBoolean(arg) {
          return typeof arg === "boolean";
        }
        exports2.isBoolean = isBoolean;
        function isNull(arg) {
          return arg === null;
        }
        exports2.isNull = isNull;
        function isNullOrUndefined(arg) {
          return arg == null;
        }
        exports2.isNullOrUndefined = isNullOrUndefined;
        function isNumber(arg) {
          return typeof arg === "number";
        }
        exports2.isNumber = isNumber;
        function isString(arg) {
          return typeof arg === "string";
        }
        exports2.isString = isString;
        function isSymbol(arg) {
          return typeof arg === "symbol";
        }
        exports2.isSymbol = isSymbol;
        function isUndefined(arg) {
          return arg === void 0;
        }
        exports2.isUndefined = isUndefined;
        function isRegExp(re) {
          return objectToString(re) === "[object RegExp]";
        }
        exports2.isRegExp = isRegExp;
        function isObject(arg) {
          return typeof arg === "object" && arg !== null;
        }
        exports2.isObject = isObject;
        function isDate(d) {
          return objectToString(d) === "[object Date]";
        }
        exports2.isDate = isDate;
        function isError(e) {
          return objectToString(e) === "[object Error]" || e instanceof Error;
        }
        exports2.isError = isError;
        function isFunction(arg) {
          return typeof arg === "function";
        }
        exports2.isFunction = isFunction;
        function isPrimitive(arg) {
          return arg === null || typeof arg === "boolean" || typeof arg === "number" || typeof arg === "string" || typeof arg === "symbol" || // ES6 symbol
          typeof arg === "undefined";
        }
        exports2.isPrimitive = isPrimitive;
        exports2.isBuffer = Buffer.isBuffer;
        function objectToString(o) {
          return Object.prototype.toString.call(o);
        }
      }).call(this, { "isBuffer": require2("../../is-buffer/index.js") });
    }, { "../../is-buffer/index.js": 25 }], 20: [function(require2, module2, exports2) {
      var Stream = require2("stream").Stream;
      var util = require2("util");
      module2.exports = DelayedStream;
      function DelayedStream() {
        this.source = null;
        this.dataSize = 0;
        this.maxDataSize = 1024 * 1024;
        this.pauseStream = true;
        this._maxDataSizeExceeded = false;
        this._released = false;
        this._bufferedEvents = [];
      }
      util.inherits(DelayedStream, Stream);
      DelayedStream.create = function(source, options) {
        var delayedStream = new this();
        options = options || {};
        for (var option in options) {
          delayedStream[option] = options[option];
        }
        delayedStream.source = source;
        var realEmit = source.emit;
        source.emit = function() {
          delayedStream._handleEmit(arguments);
          return realEmit.apply(source, arguments);
        };
        source.on("error", function() {
        });
        if (delayedStream.pauseStream) {
          source.pause();
        }
        return delayedStream;
      };
      Object.defineProperty(DelayedStream.prototype, "readable", {
        configurable: true,
        enumerable: true,
        get: function() {
          return this.source.readable;
        }
      });
      DelayedStream.prototype.setEncoding = function() {
        return this.source.setEncoding.apply(this.source, arguments);
      };
      DelayedStream.prototype.resume = function() {
        if (!this._released) {
          this.release();
        }
        this.source.resume();
      };
      DelayedStream.prototype.pause = function() {
        this.source.pause();
      };
      DelayedStream.prototype.release = function() {
        this._released = true;
        this._bufferedEvents.forEach(function(args) {
          this.emit.apply(this, args);
        }.bind(this));
        this._bufferedEvents = [];
      };
      DelayedStream.prototype.pipe = function() {
        var r = Stream.prototype.pipe.apply(this, arguments);
        this.resume();
        return r;
      };
      DelayedStream.prototype._handleEmit = function(args) {
        if (this._released) {
          this.emit.apply(this, args);
          return;
        }
        if (args[0] === "data") {
          this.dataSize += args[1].length;
          this._checkIfMaxDataSizeExceeded();
        }
        this._bufferedEvents.push(args);
      };
      DelayedStream.prototype._checkIfMaxDataSizeExceeded = function() {
        if (this._maxDataSizeExceeded) {
          return;
        }
        if (this.dataSize <= this.maxDataSize) {
          return;
        }
        this._maxDataSizeExceeded = true;
        var message = "DelayedStream#maxDataSize of " + this.maxDataSize + " bytes exceeded.";
        this.emit("error", new Error(message));
      };
    }, { "stream": 52, "util": 64 }], 21: [function(require2, module2, exports2) {
      function EventEmitter() {
        this._events = this._events || {};
        this._maxListeners = this._maxListeners || void 0;
      }
      module2.exports = EventEmitter;
      EventEmitter.EventEmitter = EventEmitter;
      EventEmitter.prototype._events = void 0;
      EventEmitter.prototype._maxListeners = void 0;
      EventEmitter.defaultMaxListeners = 10;
      EventEmitter.prototype.setMaxListeners = function(n) {
        if (!isNumber(n) || n < 0 || isNaN(n))
          throw TypeError("n must be a positive number");
        this._maxListeners = n;
        return this;
      };
      EventEmitter.prototype.emit = function(type) {
        var er, handler, len, args, i, listeners;
        if (!this._events)
          this._events = {};
        if (type === "error") {
          if (!this._events.error || isObject(this._events.error) && !this._events.error.length) {
            er = arguments[1];
            if (er instanceof Error) {
              throw er;
            } else {
              var err = new Error('Uncaught, unspecified "error" event. (' + er + ")");
              err.context = er;
              throw err;
            }
          }
        }
        handler = this._events[type];
        if (isUndefined(handler))
          return false;
        if (isFunction(handler)) {
          switch (arguments.length) {
            case 1:
              handler.call(this);
              break;
            case 2:
              handler.call(this, arguments[1]);
              break;
            case 3:
              handler.call(this, arguments[1], arguments[2]);
              break;
            default:
              args = Array.prototype.slice.call(arguments, 1);
              handler.apply(this, args);
          }
        } else if (isObject(handler)) {
          args = Array.prototype.slice.call(arguments, 1);
          listeners = handler.slice();
          len = listeners.length;
          for (i = 0; i < len; i++)
            listeners[i].apply(this, args);
        }
        return true;
      };
      EventEmitter.prototype.addListener = function(type, listener) {
        var m;
        if (!isFunction(listener))
          throw TypeError("listener must be a function");
        if (!this._events)
          this._events = {};
        if (this._events.newListener)
          this.emit(
            "newListener",
            type,
            isFunction(listener.listener) ? listener.listener : listener
          );
        if (!this._events[type])
          this._events[type] = listener;
        else if (isObject(this._events[type]))
          this._events[type].push(listener);
        else
          this._events[type] = [this._events[type], listener];
        if (isObject(this._events[type]) && !this._events[type].warned) {
          if (!isUndefined(this._maxListeners)) {
            m = this._maxListeners;
          } else {
            m = EventEmitter.defaultMaxListeners;
          }
          if (m && m > 0 && this._events[type].length > m) {
            this._events[type].warned = true;
            console.error(
              "(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",
              this._events[type].length
            );
            if (typeof console.trace === "function") {
              console.trace();
            }
          }
        }
        return this;
      };
      EventEmitter.prototype.on = EventEmitter.prototype.addListener;
      EventEmitter.prototype.once = function(type, listener) {
        if (!isFunction(listener))
          throw TypeError("listener must be a function");
        var fired = false;
        function g() {
          this.removeListener(type, g);
          if (!fired) {
            fired = true;
            listener.apply(this, arguments);
          }
        }
        g.listener = listener;
        this.on(type, g);
        return this;
      };
      EventEmitter.prototype.removeListener = function(type, listener) {
        var list, position, length, i;
        if (!isFunction(listener))
          throw TypeError("listener must be a function");
        if (!this._events || !this._events[type])
          return this;
        list = this._events[type];
        length = list.length;
        position = -1;
        if (list === listener || isFunction(list.listener) && list.listener === listener) {
          delete this._events[type];
          if (this._events.removeListener)
            this.emit("removeListener", type, listener);
        } else if (isObject(list)) {
          for (i = length; i-- > 0; ) {
            if (list[i] === listener || list[i].listener && list[i].listener === listener) {
              position = i;
              break;
            }
          }
          if (position < 0)
            return this;
          if (list.length === 1) {
            list.length = 0;
            delete this._events[type];
          } else {
            list.splice(position, 1);
          }
          if (this._events.removeListener)
            this.emit("removeListener", type, listener);
        }
        return this;
      };
      EventEmitter.prototype.removeAllListeners = function(type) {
        var key, listeners;
        if (!this._events)
          return this;
        if (!this._events.removeListener) {
          if (arguments.length === 0)
            this._events = {};
          else if (this._events[type])
            delete this._events[type];
          return this;
        }
        if (arguments.length === 0) {
          for (key in this._events) {
            if (key === "removeListener")
              continue;
            this.removeAllListeners(key);
          }
          this.removeAllListeners("removeListener");
          this._events = {};
          return this;
        }
        listeners = this._events[type];
        if (isFunction(listeners)) {
          this.removeListener(type, listeners);
        } else if (listeners) {
          while (listeners.length)
            this.removeListener(type, listeners[listeners.length - 1]);
        }
        delete this._events[type];
        return this;
      };
      EventEmitter.prototype.listeners = function(type) {
        var ret;
        if (!this._events || !this._events[type])
          ret = [];
        else if (isFunction(this._events[type]))
          ret = [this._events[type]];
        else
          ret = this._events[type].slice();
        return ret;
      };
      EventEmitter.prototype.listenerCount = function(type) {
        if (this._events) {
          var evlistener = this._events[type];
          if (isFunction(evlistener))
            return 1;
          else if (evlistener)
            return evlistener.length;
        }
        return 0;
      };
      EventEmitter.listenerCount = function(emitter, type) {
        return emitter.listenerCount(type);
      };
      function isFunction(arg) {
        return typeof arg === "function";
      }
      function isNumber(arg) {
        return typeof arg === "number";
      }
      function isObject(arg) {
        return typeof arg === "object" && arg !== null;
      }
      function isUndefined(arg) {
        return arg === void 0;
      }
    }, {}], 22: [function(require2, module2, exports2) {
      var http = require2("http");
      var https = module2.exports;
      for (var key in http) {
        if (http.hasOwnProperty(key))
          https[key] = http[key];
      }
      https.request = function(params, cb) {
        if (!params)
          params = {};
        params.scheme = "https";
        params.protocol = "https:";
        return http.request.call(this, params, cb);
      };
    }, { "http": 53 }], 23: [function(require2, module2, exports2) {
      exports2.read = function(buffer, offset, isLE, mLen, nBytes) {
        var e, m;
        var eLen = nBytes * 8 - mLen - 1;
        var eMax = (1 << eLen) - 1;
        var eBias = eMax >> 1;
        var nBits = -7;
        var i = isLE ? nBytes - 1 : 0;
        var d = isLE ? -1 : 1;
        var s = buffer[offset + i];
        i += d;
        e = s & (1 << -nBits) - 1;
        s >>= -nBits;
        nBits += eLen;
        for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {
        }
        m = e & (1 << -nBits) - 1;
        e >>= -nBits;
        nBits += mLen;
        for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {
        }
        if (e === 0) {
          e = 1 - eBias;
        } else if (e === eMax) {
          return m ? NaN : (s ? -1 : 1) * Infinity;
        } else {
          m = m + Math.pow(2, mLen);
          e = e - eBias;
        }
        return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
      };
      exports2.write = function(buffer, value, offset, isLE, mLen, nBytes) {
        var e, m, c;
        var eLen = nBytes * 8 - mLen - 1;
        var eMax = (1 << eLen) - 1;
        var eBias = eMax >> 1;
        var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
        var i = isLE ? 0 : nBytes - 1;
        var d = isLE ? 1 : -1;
        var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
        value = Math.abs(value);
        if (isNaN(value) || value === Infinity) {
          m = isNaN(value) ? 1 : 0;
          e = eMax;
        } else {
          e = Math.floor(Math.log(value) / Math.LN2);
          if (value * (c = Math.pow(2, -e)) < 1) {
            e--;
            c *= 2;
          }
          if (e + eBias >= 1) {
            value += rt / c;
          } else {
            value += rt * Math.pow(2, 1 - eBias);
          }
          if (value * c >= 2) {
            e++;
            c /= 2;
          }
          if (e + eBias >= eMax) {
            m = 0;
            e = eMax;
          } else if (e + eBias >= 1) {
            m = (value * c - 1) * Math.pow(2, mLen);
            e = e + eBias;
          } else {
            m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
            e = 0;
          }
        }
        for (; mLen >= 8; buffer[offset + i] = m & 255, i += d, m /= 256, mLen -= 8) {
        }
        e = e << mLen | m;
        eLen += mLen;
        for (; eLen > 0; buffer[offset + i] = e & 255, i += d, e /= 256, eLen -= 8) {
        }
        buffer[offset + i - d] |= s * 128;
      };
    }, {}], 24: [function(require2, module2, exports2) {
      if (typeof Object.create === "function") {
        module2.exports = function inherits(ctor, superCtor) {
          if (superCtor) {
            ctor.super_ = superCtor;
            ctor.prototype = Object.create(superCtor.prototype, {
              constructor: {
                value: ctor,
                enumerable: false,
                writable: true,
                configurable: true
              }
            });
          }
        };
      } else {
        module2.exports = function inherits(ctor, superCtor) {
          if (superCtor) {
            ctor.super_ = superCtor;
            var TempCtor = function() {
            };
            TempCtor.prototype = superCtor.prototype;
            ctor.prototype = new TempCtor();
            ctor.prototype.constructor = ctor;
          }
        };
      }
    }, {}], 25: [function(require2, module2, exports2) {
      /*!
       * Determine if an object is a Buffer
       *
       * @author   Feross Aboukhadijeh <https://feross.org>
       * @license  MIT
       */
      module2.exports = function(obj) {
        return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer);
      };
      function isBuffer(obj) {
        return !!obj.constructor && typeof obj.constructor.isBuffer === "function" && obj.constructor.isBuffer(obj);
      }
      function isSlowBuffer(obj) {
        return typeof obj.readFloatLE === "function" && typeof obj.slice === "function" && isBuffer(obj.slice(0, 0));
      }
    }, {}], 26: [function(require2, module2, exports2) {
      var toString = {}.toString;
      module2.exports = Array.isArray || function(arr) {
        return toString.call(arr) == "[object Array]";
      };
    }, {}], 27: [function(require2, module2, exports2) {
      module2.exports = {
        "application/1d-interleaved-parityfec": {
          "source": "iana"
        },
        "application/3gpdash-qoe-report+xml": {
          "source": "iana",
          "charset": "UTF-8",
          "compressible": true
        },
        "application/3gpp-ims+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/a2l": {
          "source": "iana"
        },
        "application/activemessage": {
          "source": "iana"
        },
        "application/activity+json": {
          "source": "iana",
          "compressible": true
        },
        "application/alto-costmap+json": {
          "source": "iana",
          "compressible": true
        },
        "application/alto-costmapfilter+json": {
          "source": "iana",
          "compressible": true
        },
        "application/alto-directory+json": {
          "source": "iana",
          "compressible": true
        },
        "application/alto-endpointcost+json": {
          "source": "iana",
          "compressible": true
        },
        "application/alto-endpointcostparams+json": {
          "source": "iana",
          "compressible": true
        },
        "application/alto-endpointprop+json": {
          "source": "iana",
          "compressible": true
        },
        "application/alto-endpointpropparams+json": {
          "source": "iana",
          "compressible": true
        },
        "application/alto-error+json": {
          "source": "iana",
          "compressible": true
        },
        "application/alto-networkmap+json": {
          "source": "iana",
          "compressible": true
        },
        "application/alto-networkmapfilter+json": {
          "source": "iana",
          "compressible": true
        },
        "application/alto-updatestreamcontrol+json": {
          "source": "iana",
          "compressible": true
        },
        "application/alto-updatestreamparams+json": {
          "source": "iana",
          "compressible": true
        },
        "application/aml": {
          "source": "iana"
        },
        "application/andrew-inset": {
          "source": "iana",
          "extensions": ["ez"]
        },
        "application/applefile": {
          "source": "iana"
        },
        "application/applixware": {
          "source": "apache",
          "extensions": ["aw"]
        },
        "application/atf": {
          "source": "iana"
        },
        "application/atfx": {
          "source": "iana"
        },
        "application/atom+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["atom"]
        },
        "application/atomcat+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["atomcat"]
        },
        "application/atomdeleted+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["atomdeleted"]
        },
        "application/atomicmail": {
          "source": "iana"
        },
        "application/atomsvc+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["atomsvc"]
        },
        "application/atsc-dwd+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["dwd"]
        },
        "application/atsc-dynamic-event-message": {
          "source": "iana"
        },
        "application/atsc-held+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["held"]
        },
        "application/atsc-rdt+json": {
          "source": "iana",
          "compressible": true
        },
        "application/atsc-rsat+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["rsat"]
        },
        "application/atxml": {
          "source": "iana"
        },
        "application/auth-policy+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/bacnet-xdd+zip": {
          "source": "iana",
          "compressible": false
        },
        "application/batch-smtp": {
          "source": "iana"
        },
        "application/bdoc": {
          "compressible": false,
          "extensions": ["bdoc"]
        },
        "application/beep+xml": {
          "source": "iana",
          "charset": "UTF-8",
          "compressible": true
        },
        "application/calendar+json": {
          "source": "iana",
          "compressible": true
        },
        "application/calendar+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["xcs"]
        },
        "application/call-completion": {
          "source": "iana"
        },
        "application/cals-1840": {
          "source": "iana"
        },
        "application/cap+xml": {
          "source": "iana",
          "charset": "UTF-8",
          "compressible": true
        },
        "application/cbor": {
          "source": "iana"
        },
        "application/cbor-seq": {
          "source": "iana"
        },
        "application/cccex": {
          "source": "iana"
        },
        "application/ccmp+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/ccxml+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["ccxml"]
        },
        "application/cdfx+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["cdfx"]
        },
        "application/cdmi-capability": {
          "source": "iana",
          "extensions": ["cdmia"]
        },
        "application/cdmi-container": {
          "source": "iana",
          "extensions": ["cdmic"]
        },
        "application/cdmi-domain": {
          "source": "iana",
          "extensions": ["cdmid"]
        },
        "application/cdmi-object": {
          "source": "iana",
          "extensions": ["cdmio"]
        },
        "application/cdmi-queue": {
          "source": "iana",
          "extensions": ["cdmiq"]
        },
        "application/cdni": {
          "source": "iana"
        },
        "application/cea": {
          "source": "iana"
        },
        "application/cea-2018+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/cellml+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/cfw": {
          "source": "iana"
        },
        "application/clue+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/clue_info+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/cms": {
          "source": "iana"
        },
        "application/cnrp+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/coap-group+json": {
          "source": "iana",
          "compressible": true
        },
        "application/coap-payload": {
          "source": "iana"
        },
        "application/commonground": {
          "source": "iana"
        },
        "application/conference-info+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/cose": {
          "source": "iana"
        },
        "application/cose-key": {
          "source": "iana"
        },
        "application/cose-key-set": {
          "source": "iana"
        },
        "application/cpl+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/csrattrs": {
          "source": "iana"
        },
        "application/csta+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/cstadata+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/csvm+json": {
          "source": "iana",
          "compressible": true
        },
        "application/cu-seeme": {
          "source": "apache",
          "extensions": ["cu"]
        },
        "application/cwt": {
          "source": "iana"
        },
        "application/cybercash": {
          "source": "iana"
        },
        "application/dart": {
          "compressible": true
        },
        "application/dash+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["mpd"]
        },
        "application/dashdelta": {
          "source": "iana"
        },
        "application/davmount+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["davmount"]
        },
        "application/dca-rft": {
          "source": "iana"
        },
        "application/dcd": {
          "source": "iana"
        },
        "application/dec-dx": {
          "source": "iana"
        },
        "application/dialog-info+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/dicom": {
          "source": "iana"
        },
        "application/dicom+json": {
          "source": "iana",
          "compressible": true
        },
        "application/dicom+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/dii": {
          "source": "iana"
        },
        "application/dit": {
          "source": "iana"
        },
        "application/dns": {
          "source": "iana"
        },
        "application/dns+json": {
          "source": "iana",
          "compressible": true
        },
        "application/dns-message": {
          "source": "iana"
        },
        "application/docbook+xml": {
          "source": "apache",
          "compressible": true,
          "extensions": ["dbk"]
        },
        "application/dots+cbor": {
          "source": "iana"
        },
        "application/dskpp+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/dssc+der": {
          "source": "iana",
          "extensions": ["dssc"]
        },
        "application/dssc+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["xdssc"]
        },
        "application/dvcs": {
          "source": "iana"
        },
        "application/ecmascript": {
          "source": "iana",
          "compressible": true,
          "extensions": ["ecma", "es"]
        },
        "application/edi-consent": {
          "source": "iana"
        },
        "application/edi-x12": {
          "source": "iana",
          "compressible": false
        },
        "application/edifact": {
          "source": "iana",
          "compressible": false
        },
        "application/efi": {
          "source": "iana"
        },
        "application/emergencycalldata.comment+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/emergencycalldata.control+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/emergencycalldata.deviceinfo+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/emergencycalldata.ecall.msd": {
          "source": "iana"
        },
        "application/emergencycalldata.providerinfo+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/emergencycalldata.serviceinfo+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/emergencycalldata.subscriberinfo+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/emergencycalldata.veds+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/emma+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["emma"]
        },
        "application/emotionml+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["emotionml"]
        },
        "application/encaprtp": {
          "source": "iana"
        },
        "application/epp+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/epub+zip": {
          "source": "iana",
          "compressible": false,
          "extensions": ["epub"]
        },
        "application/eshop": {
          "source": "iana"
        },
        "application/exi": {
          "source": "iana",
          "extensions": ["exi"]
        },
        "application/expect-ct-report+json": {
          "source": "iana",
          "compressible": true
        },
        "application/fastinfoset": {
          "source": "iana"
        },
        "application/fastsoap": {
          "source": "iana"
        },
        "application/fdt+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["fdt"]
        },
        "application/fhir+json": {
          "source": "iana",
          "charset": "UTF-8",
          "compressible": true
        },
        "application/fhir+xml": {
          "source": "iana",
          "charset": "UTF-8",
          "compressible": true
        },
        "application/fido.trusted-apps+json": {
          "compressible": true
        },
        "application/fits": {
          "source": "iana"
        },
        "application/flexfec": {
          "source": "iana"
        },
        "application/font-sfnt": {
          "source": "iana"
        },
        "application/font-tdpfr": {
          "source": "iana",
          "extensions": ["pfr"]
        },
        "application/font-woff": {
          "source": "iana",
          "compressible": false
        },
        "application/framework-attributes+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/geo+json": {
          "source": "iana",
          "compressible": true,
          "extensions": ["geojson"]
        },
        "application/geo+json-seq": {
          "source": "iana"
        },
        "application/geopackage+sqlite3": {
          "source": "iana"
        },
        "application/geoxacml+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/gltf-buffer": {
          "source": "iana"
        },
        "application/gml+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["gml"]
        },
        "application/gpx+xml": {
          "source": "apache",
          "compressible": true,
          "extensions": ["gpx"]
        },
        "application/gxf": {
          "source": "apache",
          "extensions": ["gxf"]
        },
        "application/gzip": {
          "source": "iana",
          "compressible": false,
          "extensions": ["gz"]
        },
        "application/h224": {
          "source": "iana"
        },
        "application/held+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/hjson": {
          "extensions": ["hjson"]
        },
        "application/http": {
          "source": "iana"
        },
        "application/hyperstudio": {
          "source": "iana",
          "extensions": ["stk"]
        },
        "application/ibe-key-request+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/ibe-pkg-reply+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/ibe-pp-data": {
          "source": "iana"
        },
        "application/iges": {
          "source": "iana"
        },
        "application/im-iscomposing+xml": {
          "source": "iana",
          "charset": "UTF-8",
          "compressible": true
        },
        "application/index": {
          "source": "iana"
        },
        "application/index.cmd": {
          "source": "iana"
        },
        "application/index.obj": {
          "source": "iana"
        },
        "application/index.response": {
          "source": "iana"
        },
        "application/index.vnd": {
          "source": "iana"
        },
        "application/inkml+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["ink", "inkml"]
        },
        "application/iotp": {
          "source": "iana"
        },
        "application/ipfix": {
          "source": "iana",
          "extensions": ["ipfix"]
        },
        "application/ipp": {
          "source": "iana"
        },
        "application/isup": {
          "source": "iana"
        },
        "application/its+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["its"]
        },
        "application/java-archive": {
          "source": "apache",
          "compressible": false,
          "extensions": ["jar", "war", "ear"]
        },
        "application/java-serialized-object": {
          "source": "apache",
          "compressible": false,
          "extensions": ["ser"]
        },
        "application/java-vm": {
          "source": "apache",
          "compressible": false,
          "extensions": ["class"]
        },
        "application/javascript": {
          "source": "iana",
          "charset": "UTF-8",
          "compressible": true,
          "extensions": ["js", "mjs"]
        },
        "application/jf2feed+json": {
          "source": "iana",
          "compressible": true
        },
        "application/jose": {
          "source": "iana"
        },
        "application/jose+json": {
          "source": "iana",
          "compressible": true
        },
        "application/jrd+json": {
          "source": "iana",
          "compressible": true
        },
        "application/json": {
          "source": "iana",
          "charset": "UTF-8",
          "compressible": true,
          "extensions": ["json", "map"]
        },
        "application/json-patch+json": {
          "source": "iana",
          "compressible": true
        },
        "application/json-seq": {
          "source": "iana"
        },
        "application/json5": {
          "extensions": ["json5"]
        },
        "application/jsonml+json": {
          "source": "apache",
          "compressible": true,
          "extensions": ["jsonml"]
        },
        "application/jwk+json": {
          "source": "iana",
          "compressible": true
        },
        "application/jwk-set+json": {
          "source": "iana",
          "compressible": true
        },
        "application/jwt": {
          "source": "iana"
        },
        "application/kpml-request+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/kpml-response+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/ld+json": {
          "source": "iana",
          "compressible": true,
          "extensions": ["jsonld"]
        },
        "application/lgr+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["lgr"]
        },
        "application/link-format": {
          "source": "iana"
        },
        "application/load-control+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/lost+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["lostxml"]
        },
        "application/lostsync+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/lpf+zip": {
          "source": "iana",
          "compressible": false
        },
        "application/lxf": {
          "source": "iana"
        },
        "application/mac-binhex40": {
          "source": "iana",
          "extensions": ["hqx"]
        },
        "application/mac-compactpro": {
          "source": "apache",
          "extensions": ["cpt"]
        },
        "application/macwriteii": {
          "source": "iana"
        },
        "application/mads+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["mads"]
        },
        "application/manifest+json": {
          "charset": "UTF-8",
          "compressible": true,
          "extensions": ["webmanifest"]
        },
        "application/marc": {
          "source": "iana",
          "extensions": ["mrc"]
        },
        "application/marcxml+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["mrcx"]
        },
        "application/mathematica": {
          "source": "iana",
          "extensions": ["ma", "nb", "mb"]
        },
        "application/mathml+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["mathml"]
        },
        "application/mathml-content+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/mathml-presentation+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/mbms-associated-procedure-description+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/mbms-deregister+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/mbms-envelope+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/mbms-msk+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/mbms-msk-response+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/mbms-protection-description+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/mbms-reception-report+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/mbms-register+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/mbms-register-response+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/mbms-schedule+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/mbms-user-service-description+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/mbox": {
          "source": "iana",
          "extensions": ["mbox"]
        },
        "application/media-policy-dataset+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/media_control+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/mediaservercontrol+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["mscml"]
        },
        "application/merge-patch+json": {
          "source": "iana",
          "compressible": true
        },
        "application/metalink+xml": {
          "source": "apache",
          "compressible": true,
          "extensions": ["metalink"]
        },
        "application/metalink4+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["meta4"]
        },
        "application/mets+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["mets"]
        },
        "application/mf4": {
          "source": "iana"
        },
        "application/mikey": {
          "source": "iana"
        },
        "application/mipc": {
          "source": "iana"
        },
        "application/mmt-aei+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["maei"]
        },
        "application/mmt-usd+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["musd"]
        },
        "application/mods+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["mods"]
        },
        "application/moss-keys": {
          "source": "iana"
        },
        "application/moss-signature": {
          "source": "iana"
        },
        "application/mosskey-data": {
          "source": "iana"
        },
        "application/mosskey-request": {
          "source": "iana"
        },
        "application/mp21": {
          "source": "iana",
          "extensions": ["m21", "mp21"]
        },
        "application/mp4": {
          "source": "iana",
          "extensions": ["mp4s", "m4p"]
        },
        "application/mpeg4-generic": {
          "source": "iana"
        },
        "application/mpeg4-iod": {
          "source": "iana"
        },
        "application/mpeg4-iod-xmt": {
          "source": "iana"
        },
        "application/mrb-consumer+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["xdf"]
        },
        "application/mrb-publish+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["xdf"]
        },
        "application/msc-ivr+xml": {
          "source": "iana",
          "charset": "UTF-8",
          "compressible": true
        },
        "application/msc-mixer+xml": {
          "source": "iana",
          "charset": "UTF-8",
          "compressible": true
        },
        "application/msword": {
          "source": "iana",
          "compressible": false,
          "extensions": ["doc", "dot"]
        },
        "application/mud+json": {
          "source": "iana",
          "compressible": true
        },
        "application/multipart-core": {
          "source": "iana"
        },
        "application/mxf": {
          "source": "iana",
          "extensions": ["mxf"]
        },
        "application/n-quads": {
          "source": "iana",
          "extensions": ["nq"]
        },
        "application/n-triples": {
          "source": "iana",
          "extensions": ["nt"]
        },
        "application/nasdata": {
          "source": "iana"
        },
        "application/news-checkgroups": {
          "source": "iana",
          "charset": "US-ASCII"
        },
        "application/news-groupinfo": {
          "source": "iana",
          "charset": "US-ASCII"
        },
        "application/news-transmission": {
          "source": "iana"
        },
        "application/nlsml+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/node": {
          "source": "iana",
          "extensions": ["cjs"]
        },
        "application/nss": {
          "source": "iana"
        },
        "application/ocsp-request": {
          "source": "iana"
        },
        "application/ocsp-response": {
          "source": "iana"
        },
        "application/octet-stream": {
          "source": "iana",
          "compressible": false,
          "extensions": ["bin", "dms", "lrf", "mar", "so", "dist", "distz", "pkg", "bpk", "dump", "elc", "deploy", "exe", "dll", "deb", "dmg", "iso", "img", "msi", "msp", "msm", "buffer"]
        },
        "application/oda": {
          "source": "iana",
          "extensions": ["oda"]
        },
        "application/odm+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/odx": {
          "source": "iana"
        },
        "application/oebps-package+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["opf"]
        },
        "application/ogg": {
          "source": "iana",
          "compressible": false,
          "extensions": ["ogx"]
        },
        "application/omdoc+xml": {
          "source": "apache",
          "compressible": true,
          "extensions": ["omdoc"]
        },
        "application/onenote": {
          "source": "apache",
          "extensions": ["onetoc", "onetoc2", "onetmp", "onepkg"]
        },
        "application/oscore": {
          "source": "iana"
        },
        "application/oxps": {
          "source": "iana",
          "extensions": ["oxps"]
        },
        "application/p2p-overlay+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["relo"]
        },
        "application/parityfec": {
          "source": "iana"
        },
        "application/passport": {
          "source": "iana"
        },
        "application/patch-ops-error+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["xer"]
        },
        "application/pdf": {
          "source": "iana",
          "compressible": false,
          "extensions": ["pdf"]
        },
        "application/pdx": {
          "source": "iana"
        },
        "application/pem-certificate-chain": {
          "source": "iana"
        },
        "application/pgp-encrypted": {
          "source": "iana",
          "compressible": false,
          "extensions": ["pgp"]
        },
        "application/pgp-keys": {
          "source": "iana"
        },
        "application/pgp-signature": {
          "source": "iana",
          "extensions": ["asc", "sig"]
        },
        "application/pics-rules": {
          "source": "apache",
          "extensions": ["prf"]
        },
        "application/pidf+xml": {
          "source": "iana",
          "charset": "UTF-8",
          "compressible": true
        },
        "application/pidf-diff+xml": {
          "source": "iana",
          "charset": "UTF-8",
          "compressible": true
        },
        "application/pkcs10": {
          "source": "iana",
          "extensions": ["p10"]
        },
        "application/pkcs12": {
          "source": "iana"
        },
        "application/pkcs7-mime": {
          "source": "iana",
          "extensions": ["p7m", "p7c"]
        },
        "application/pkcs7-signature": {
          "source": "iana",
          "extensions": ["p7s"]
        },
        "application/pkcs8": {
          "source": "iana",
          "extensions": ["p8"]
        },
        "application/pkcs8-encrypted": {
          "source": "iana"
        },
        "application/pkix-attr-cert": {
          "source": "iana",
          "extensions": ["ac"]
        },
        "application/pkix-cert": {
          "source": "iana",
          "extensions": ["cer"]
        },
        "application/pkix-crl": {
          "source": "iana",
          "extensions": ["crl"]
        },
        "application/pkix-pkipath": {
          "source": "iana",
          "extensions": ["pkipath"]
        },
        "application/pkixcmp": {
          "source": "iana",
          "extensions": ["pki"]
        },
        "application/pls+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["pls"]
        },
        "application/poc-settings+xml": {
          "source": "iana",
          "charset": "UTF-8",
          "compressible": true
        },
        "application/postscript": {
          "source": "iana",
          "compressible": true,
          "extensions": ["ai", "eps", "ps"]
        },
        "application/ppsp-tracker+json": {
          "source": "iana",
          "compressible": true
        },
        "application/problem+json": {
          "source": "iana",
          "compressible": true
        },
        "application/problem+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/provenance+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["provx"]
        },
        "application/prs.alvestrand.titrax-sheet": {
          "source": "iana"
        },
        "application/prs.cww": {
          "source": "iana",
          "extensions": ["cww"]
        },
        "application/prs.hpub+zip": {
          "source": "iana",
          "compressible": false
        },
        "application/prs.nprend": {
          "source": "iana"
        },
        "application/prs.plucker": {
          "source": "iana"
        },
        "application/prs.rdf-xml-crypt": {
          "source": "iana"
        },
        "application/prs.xsf+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/pskc+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["pskcxml"]
        },
        "application/pvd+json": {
          "source": "iana",
          "compressible": true
        },
        "application/qsig": {
          "source": "iana"
        },
        "application/raml+yaml": {
          "compressible": true,
          "extensions": ["raml"]
        },
        "application/raptorfec": {
          "source": "iana"
        },
        "application/rdap+json": {
          "source": "iana",
          "compressible": true
        },
        "application/rdf+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["rdf", "owl"]
        },
        "application/reginfo+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["rif"]
        },
        "application/relax-ng-compact-syntax": {
          "source": "iana",
          "extensions": ["rnc"]
        },
        "application/remote-printing": {
          "source": "iana"
        },
        "application/reputon+json": {
          "source": "iana",
          "compressible": true
        },
        "application/resource-lists+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["rl"]
        },
        "application/resource-lists-diff+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["rld"]
        },
        "application/rfc+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/riscos": {
          "source": "iana"
        },
        "application/rlmi+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/rls-services+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["rs"]
        },
        "application/route-apd+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["rapd"]
        },
        "application/route-s-tsid+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["sls"]
        },
        "application/route-usd+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["rusd"]
        },
        "application/rpki-ghostbusters": {
          "source": "iana",
          "extensions": ["gbr"]
        },
        "application/rpki-manifest": {
          "source": "iana",
          "extensions": ["mft"]
        },
        "application/rpki-publication": {
          "source": "iana"
        },
        "application/rpki-roa": {
          "source": "iana",
          "extensions": ["roa"]
        },
        "application/rpki-updown": {
          "source": "iana"
        },
        "application/rsd+xml": {
          "source": "apache",
          "compressible": true,
          "extensions": ["rsd"]
        },
        "application/rss+xml": {
          "source": "apache",
          "compressible": true,
          "extensions": ["rss"]
        },
        "application/rtf": {
          "source": "iana",
          "compressible": true,
          "extensions": ["rtf"]
        },
        "application/rtploopback": {
          "source": "iana"
        },
        "application/rtx": {
          "source": "iana"
        },
        "application/samlassertion+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/samlmetadata+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/sbe": {
          "source": "iana"
        },
        "application/sbml+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["sbml"]
        },
        "application/scaip+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/scim+json": {
          "source": "iana",
          "compressible": true
        },
        "application/scvp-cv-request": {
          "source": "iana",
          "extensions": ["scq"]
        },
        "application/scvp-cv-response": {
          "source": "iana",
          "extensions": ["scs"]
        },
        "application/scvp-vp-request": {
          "source": "iana",
          "extensions": ["spq"]
        },
        "application/scvp-vp-response": {
          "source": "iana",
          "extensions": ["spp"]
        },
        "application/sdp": {
          "source": "iana",
          "extensions": ["sdp"]
        },
        "application/secevent+jwt": {
          "source": "iana"
        },
        "application/senml+cbor": {
          "source": "iana"
        },
        "application/senml+json": {
          "source": "iana",
          "compressible": true
        },
        "application/senml+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["senmlx"]
        },
        "application/senml-etch+cbor": {
          "source": "iana"
        },
        "application/senml-etch+json": {
          "source": "iana",
          "compressible": true
        },
        "application/senml-exi": {
          "source": "iana"
        },
        "application/sensml+cbor": {
          "source": "iana"
        },
        "application/sensml+json": {
          "source": "iana",
          "compressible": true
        },
        "application/sensml+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["sensmlx"]
        },
        "application/sensml-exi": {
          "source": "iana"
        },
        "application/sep+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/sep-exi": {
          "source": "iana"
        },
        "application/session-info": {
          "source": "iana"
        },
        "application/set-payment": {
          "source": "iana"
        },
        "application/set-payment-initiation": {
          "source": "iana",
          "extensions": ["setpay"]
        },
        "application/set-registration": {
          "source": "iana"
        },
        "application/set-registration-initiation": {
          "source": "iana",
          "extensions": ["setreg"]
        },
        "application/sgml": {
          "source": "iana"
        },
        "application/sgml-open-catalog": {
          "source": "iana"
        },
        "application/shf+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["shf"]
        },
        "application/sieve": {
          "source": "iana",
          "extensions": ["siv", "sieve"]
        },
        "application/simple-filter+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/simple-message-summary": {
          "source": "iana"
        },
        "application/simplesymbolcontainer": {
          "source": "iana"
        },
        "application/sipc": {
          "source": "iana"
        },
        "application/slate": {
          "source": "iana"
        },
        "application/smil": {
          "source": "iana"
        },
        "application/smil+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["smi", "smil"]
        },
        "application/smpte336m": {
          "source": "iana"
        },
        "application/soap+fastinfoset": {
          "source": "iana"
        },
        "application/soap+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/sparql-query": {
          "source": "iana",
          "extensions": ["rq"]
        },
        "application/sparql-results+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["srx"]
        },
        "application/spirits-event+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/sql": {
          "source": "iana"
        },
        "application/srgs": {
          "source": "iana",
          "extensions": ["gram"]
        },
        "application/srgs+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["grxml"]
        },
        "application/sru+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["sru"]
        },
        "application/ssdl+xml": {
          "source": "apache",
          "compressible": true,
          "extensions": ["ssdl"]
        },
        "application/ssml+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["ssml"]
        },
        "application/stix+json": {
          "source": "iana",
          "compressible": true
        },
        "application/swid+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["swidtag"]
        },
        "application/tamp-apex-update": {
          "source": "iana"
        },
        "application/tamp-apex-update-confirm": {
          "source": "iana"
        },
        "application/tamp-community-update": {
          "source": "iana"
        },
        "application/tamp-community-update-confirm": {
          "source": "iana"
        },
        "application/tamp-error": {
          "source": "iana"
        },
        "application/tamp-sequence-adjust": {
          "source": "iana"
        },
        "application/tamp-sequence-adjust-confirm": {
          "source": "iana"
        },
        "application/tamp-status-query": {
          "source": "iana"
        },
        "application/tamp-status-response": {
          "source": "iana"
        },
        "application/tamp-update": {
          "source": "iana"
        },
        "application/tamp-update-confirm": {
          "source": "iana"
        },
        "application/tar": {
          "compressible": true
        },
        "application/taxii+json": {
          "source": "iana",
          "compressible": true
        },
        "application/td+json": {
          "source": "iana",
          "compressible": true
        },
        "application/tei+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["tei", "teicorpus"]
        },
        "application/tetra_isi": {
          "source": "iana"
        },
        "application/thraud+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["tfi"]
        },
        "application/timestamp-query": {
          "source": "iana"
        },
        "application/timestamp-reply": {
          "source": "iana"
        },
        "application/timestamped-data": {
          "source": "iana",
          "extensions": ["tsd"]
        },
        "application/tlsrpt+gzip": {
          "source": "iana"
        },
        "application/tlsrpt+json": {
          "source": "iana",
          "compressible": true
        },
        "application/tnauthlist": {
          "source": "iana"
        },
        "application/toml": {
          "compressible": true,
          "extensions": ["toml"]
        },
        "application/trickle-ice-sdpfrag": {
          "source": "iana"
        },
        "application/trig": {
          "source": "iana"
        },
        "application/ttml+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["ttml"]
        },
        "application/tve-trigger": {
          "source": "iana"
        },
        "application/tzif": {
          "source": "iana"
        },
        "application/tzif-leap": {
          "source": "iana"
        },
        "application/ulpfec": {
          "source": "iana"
        },
        "application/urc-grpsheet+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/urc-ressheet+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["rsheet"]
        },
        "application/urc-targetdesc+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/urc-uisocketdesc+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vcard+json": {
          "source": "iana",
          "compressible": true
        },
        "application/vcard+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vemmi": {
          "source": "iana"
        },
        "application/vividence.scriptfile": {
          "source": "apache"
        },
        "application/vnd.1000minds.decision-model+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["1km"]
        },
        "application/vnd.3gpp-prose+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.3gpp-prose-pc3ch+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.3gpp-v2x-local-service-information": {
          "source": "iana"
        },
        "application/vnd.3gpp.access-transfer-events+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.3gpp.bsf+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.3gpp.gmop+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.3gpp.mc-signalling-ear": {
          "source": "iana"
        },
        "application/vnd.3gpp.mcdata-affiliation-command+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.3gpp.mcdata-info+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.3gpp.mcdata-payload": {
          "source": "iana"
        },
        "application/vnd.3gpp.mcdata-service-config+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.3gpp.mcdata-signalling": {
          "source": "iana"
        },
        "application/vnd.3gpp.mcdata-ue-config+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.3gpp.mcdata-user-profile+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.3gpp.mcptt-affiliation-command+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.3gpp.mcptt-floor-request+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.3gpp.mcptt-info+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.3gpp.mcptt-location-info+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.3gpp.mcptt-mbms-usage-info+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.3gpp.mcptt-service-config+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.3gpp.mcptt-signed+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.3gpp.mcptt-ue-config+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.3gpp.mcptt-ue-init-config+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.3gpp.mcptt-user-profile+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.3gpp.mcvideo-affiliation-command+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.3gpp.mcvideo-affiliation-info+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.3gpp.mcvideo-info+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.3gpp.mcvideo-location-info+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.3gpp.mcvideo-mbms-usage-info+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.3gpp.mcvideo-service-config+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.3gpp.mcvideo-transmission-request+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.3gpp.mcvideo-ue-config+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.3gpp.mcvideo-user-profile+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.3gpp.mid-call+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.3gpp.pic-bw-large": {
          "source": "iana",
          "extensions": ["plb"]
        },
        "application/vnd.3gpp.pic-bw-small": {
          "source": "iana",
          "extensions": ["psb"]
        },
        "application/vnd.3gpp.pic-bw-var": {
          "source": "iana",
          "extensions": ["pvb"]
        },
        "application/vnd.3gpp.sms": {
          "source": "iana"
        },
        "application/vnd.3gpp.sms+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.3gpp.srvcc-ext+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.3gpp.srvcc-info+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.3gpp.state-and-event-info+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.3gpp.ussd+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.3gpp2.bcmcsinfo+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.3gpp2.sms": {
          "source": "iana"
        },
        "application/vnd.3gpp2.tcap": {
          "source": "iana",
          "extensions": ["tcap"]
        },
        "application/vnd.3lightssoftware.imagescal": {
          "source": "iana"
        },
        "application/vnd.3m.post-it-notes": {
          "source": "iana",
          "extensions": ["pwn"]
        },
        "application/vnd.accpac.simply.aso": {
          "source": "iana",
          "extensions": ["aso"]
        },
        "application/vnd.accpac.simply.imp": {
          "source": "iana",
          "extensions": ["imp"]
        },
        "application/vnd.acucobol": {
          "source": "iana",
          "extensions": ["acu"]
        },
        "application/vnd.acucorp": {
          "source": "iana",
          "extensions": ["atc", "acutc"]
        },
        "application/vnd.adobe.air-application-installer-package+zip": {
          "source": "apache",
          "compressible": false,
          "extensions": ["air"]
        },
        "application/vnd.adobe.flash.movie": {
          "source": "iana"
        },
        "application/vnd.adobe.formscentral.fcdt": {
          "source": "iana",
          "extensions": ["fcdt"]
        },
        "application/vnd.adobe.fxp": {
          "source": "iana",
          "extensions": ["fxp", "fxpl"]
        },
        "application/vnd.adobe.partial-upload": {
          "source": "iana"
        },
        "application/vnd.adobe.xdp+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["xdp"]
        },
        "application/vnd.adobe.xfdf": {
          "source": "iana",
          "extensions": ["xfdf"]
        },
        "application/vnd.aether.imp": {
          "source": "iana"
        },
        "application/vnd.afpc.afplinedata": {
          "source": "iana"
        },
        "application/vnd.afpc.afplinedata-pagedef": {
          "source": "iana"
        },
        "application/vnd.afpc.foca-charset": {
          "source": "iana"
        },
        "application/vnd.afpc.foca-codedfont": {
          "source": "iana"
        },
        "application/vnd.afpc.foca-codepage": {
          "source": "iana"
        },
        "application/vnd.afpc.modca": {
          "source": "iana"
        },
        "application/vnd.afpc.modca-formdef": {
          "source": "iana"
        },
        "application/vnd.afpc.modca-mediummap": {
          "source": "iana"
        },
        "application/vnd.afpc.modca-objectcontainer": {
          "source": "iana"
        },
        "application/vnd.afpc.modca-overlay": {
          "source": "iana"
        },
        "application/vnd.afpc.modca-pagesegment": {
          "source": "iana"
        },
        "application/vnd.ah-barcode": {
          "source": "iana"
        },
        "application/vnd.ahead.space": {
          "source": "iana",
          "extensions": ["ahead"]
        },
        "application/vnd.airzip.filesecure.azf": {
          "source": "iana",
          "extensions": ["azf"]
        },
        "application/vnd.airzip.filesecure.azs": {
          "source": "iana",
          "extensions": ["azs"]
        },
        "application/vnd.amadeus+json": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.amazon.ebook": {
          "source": "apache",
          "extensions": ["azw"]
        },
        "application/vnd.amazon.mobi8-ebook": {
          "source": "iana"
        },
        "application/vnd.americandynamics.acc": {
          "source": "iana",
          "extensions": ["acc"]
        },
        "application/vnd.amiga.ami": {
          "source": "iana",
          "extensions": ["ami"]
        },
        "application/vnd.amundsen.maze+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.android.ota": {
          "source": "iana"
        },
        "application/vnd.android.package-archive": {
          "source": "apache",
          "compressible": false,
          "extensions": ["apk"]
        },
        "application/vnd.anki": {
          "source": "iana"
        },
        "application/vnd.anser-web-certificate-issue-initiation": {
          "source": "iana",
          "extensions": ["cii"]
        },
        "application/vnd.anser-web-funds-transfer-initiation": {
          "source": "apache",
          "extensions": ["fti"]
        },
        "application/vnd.antix.game-component": {
          "source": "iana",
          "extensions": ["atx"]
        },
        "application/vnd.apache.thrift.binary": {
          "source": "iana"
        },
        "application/vnd.apache.thrift.compact": {
          "source": "iana"
        },
        "application/vnd.apache.thrift.json": {
          "source": "iana"
        },
        "application/vnd.api+json": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.aplextor.warrp+json": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.apothekende.reservation+json": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.apple.installer+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["mpkg"]
        },
        "application/vnd.apple.keynote": {
          "source": "iana",
          "extensions": ["keynote"]
        },
        "application/vnd.apple.mpegurl": {
          "source": "iana",
          "extensions": ["m3u8"]
        },
        "application/vnd.apple.numbers": {
          "source": "iana",
          "extensions": ["numbers"]
        },
        "application/vnd.apple.pages": {
          "source": "iana",
          "extensions": ["pages"]
        },
        "application/vnd.apple.pkpass": {
          "compressible": false,
          "extensions": ["pkpass"]
        },
        "application/vnd.arastra.swi": {
          "source": "iana"
        },
        "application/vnd.aristanetworks.swi": {
          "source": "iana",
          "extensions": ["swi"]
        },
        "application/vnd.artisan+json": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.artsquare": {
          "source": "iana"
        },
        "application/vnd.astraea-software.iota": {
          "source": "iana",
          "extensions": ["iota"]
        },
        "application/vnd.audiograph": {
          "source": "iana",
          "extensions": ["aep"]
        },
        "application/vnd.autopackage": {
          "source": "iana"
        },
        "application/vnd.avalon+json": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.avistar+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.balsamiq.bmml+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["bmml"]
        },
        "application/vnd.balsamiq.bmpr": {
          "source": "iana"
        },
        "application/vnd.banana-accounting": {
          "source": "iana"
        },
        "application/vnd.bbf.usp.error": {
          "source": "iana"
        },
        "application/vnd.bbf.usp.msg": {
          "source": "iana"
        },
        "application/vnd.bbf.usp.msg+json": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.bekitzur-stech+json": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.bint.med-content": {
          "source": "iana"
        },
        "application/vnd.biopax.rdf+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.blink-idb-value-wrapper": {
          "source": "iana"
        },
        "application/vnd.blueice.multipass": {
          "source": "iana",
          "extensions": ["mpm"]
        },
        "application/vnd.bluetooth.ep.oob": {
          "source": "iana"
        },
        "application/vnd.bluetooth.le.oob": {
          "source": "iana"
        },
        "application/vnd.bmi": {
          "source": "iana",
          "extensions": ["bmi"]
        },
        "application/vnd.bpf": {
          "source": "iana"
        },
        "application/vnd.bpf3": {
          "source": "iana"
        },
        "application/vnd.businessobjects": {
          "source": "iana",
          "extensions": ["rep"]
        },
        "application/vnd.byu.uapi+json": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.cab-jscript": {
          "source": "iana"
        },
        "application/vnd.canon-cpdl": {
          "source": "iana"
        },
        "application/vnd.canon-lips": {
          "source": "iana"
        },
        "application/vnd.capasystems-pg+json": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.cendio.thinlinc.clientconf": {
          "source": "iana"
        },
        "application/vnd.century-systems.tcp_stream": {
          "source": "iana"
        },
        "application/vnd.chemdraw+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["cdxml"]
        },
        "application/vnd.chess-pgn": {
          "source": "iana"
        },
        "application/vnd.chipnuts.karaoke-mmd": {
          "source": "iana",
          "extensions": ["mmd"]
        },
        "application/vnd.ciedi": {
          "source": "iana"
        },
        "application/vnd.cinderella": {
          "source": "iana",
          "extensions": ["cdy"]
        },
        "application/vnd.cirpack.isdn-ext": {
          "source": "iana"
        },
        "application/vnd.citationstyles.style+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["csl"]
        },
        "application/vnd.claymore": {
          "source": "iana",
          "extensions": ["cla"]
        },
        "application/vnd.cloanto.rp9": {
          "source": "iana",
          "extensions": ["rp9"]
        },
        "application/vnd.clonk.c4group": {
          "source": "iana",
          "extensions": ["c4g", "c4d", "c4f", "c4p", "c4u"]
        },
        "application/vnd.cluetrust.cartomobile-config": {
          "source": "iana",
          "extensions": ["c11amc"]
        },
        "application/vnd.cluetrust.cartomobile-config-pkg": {
          "source": "iana",
          "extensions": ["c11amz"]
        },
        "application/vnd.coffeescript": {
          "source": "iana"
        },
        "application/vnd.collabio.xodocuments.document": {
          "source": "iana"
        },
        "application/vnd.collabio.xodocuments.document-template": {
          "source": "iana"
        },
        "application/vnd.collabio.xodocuments.presentation": {
          "source": "iana"
        },
        "application/vnd.collabio.xodocuments.presentation-template": {
          "source": "iana"
        },
        "application/vnd.collabio.xodocuments.spreadsheet": {
          "source": "iana"
        },
        "application/vnd.collabio.xodocuments.spreadsheet-template": {
          "source": "iana"
        },
        "application/vnd.collection+json": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.collection.doc+json": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.collection.next+json": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.comicbook+zip": {
          "source": "iana",
          "compressible": false
        },
        "application/vnd.comicbook-rar": {
          "source": "iana"
        },
        "application/vnd.commerce-battelle": {
          "source": "iana"
        },
        "application/vnd.commonspace": {
          "source": "iana",
          "extensions": ["csp"]
        },
        "application/vnd.contact.cmsg": {
          "source": "iana",
          "extensions": ["cdbcmsg"]
        },
        "application/vnd.coreos.ignition+json": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.cosmocaller": {
          "source": "iana",
          "extensions": ["cmc"]
        },
        "application/vnd.crick.clicker": {
          "source": "iana",
          "extensions": ["clkx"]
        },
        "application/vnd.crick.clicker.keyboard": {
          "source": "iana",
          "extensions": ["clkk"]
        },
        "application/vnd.crick.clicker.palette": {
          "source": "iana",
          "extensions": ["clkp"]
        },
        "application/vnd.crick.clicker.template": {
          "source": "iana",
          "extensions": ["clkt"]
        },
        "application/vnd.crick.clicker.wordbank": {
          "source": "iana",
          "extensions": ["clkw"]
        },
        "application/vnd.criticaltools.wbs+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["wbs"]
        },
        "application/vnd.cryptii.pipe+json": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.crypto-shade-file": {
          "source": "iana"
        },
        "application/vnd.ctc-posml": {
          "source": "iana",
          "extensions": ["pml"]
        },
        "application/vnd.ctct.ws+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.cups-pdf": {
          "source": "iana"
        },
        "application/vnd.cups-postscript": {
          "source": "iana"
        },
        "application/vnd.cups-ppd": {
          "source": "iana",
          "extensions": ["ppd"]
        },
        "application/vnd.cups-raster": {
          "source": "iana"
        },
        "application/vnd.cups-raw": {
          "source": "iana"
        },
        "application/vnd.curl": {
          "source": "iana"
        },
        "application/vnd.curl.car": {
          "source": "apache",
          "extensions": ["car"]
        },
        "application/vnd.curl.pcurl": {
          "source": "apache",
          "extensions": ["pcurl"]
        },
        "application/vnd.cyan.dean.root+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.cybank": {
          "source": "iana"
        },
        "application/vnd.d2l.coursepackage1p0+zip": {
          "source": "iana",
          "compressible": false
        },
        "application/vnd.dart": {
          "source": "iana",
          "compressible": true,
          "extensions": ["dart"]
        },
        "application/vnd.data-vision.rdz": {
          "source": "iana",
          "extensions": ["rdz"]
        },
        "application/vnd.datapackage+json": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.dataresource+json": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.dbf": {
          "source": "iana"
        },
        "application/vnd.debian.binary-package": {
          "source": "iana"
        },
        "application/vnd.dece.data": {
          "source": "iana",
          "extensions": ["uvf", "uvvf", "uvd", "uvvd"]
        },
        "application/vnd.dece.ttml+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["uvt", "uvvt"]
        },
        "application/vnd.dece.unspecified": {
          "source": "iana",
          "extensions": ["uvx", "uvvx"]
        },
        "application/vnd.dece.zip": {
          "source": "iana",
          "extensions": ["uvz", "uvvz"]
        },
        "application/vnd.denovo.fcselayout-link": {
          "source": "iana",
          "extensions": ["fe_launch"]
        },
        "application/vnd.desmume.movie": {
          "source": "iana"
        },
        "application/vnd.dir-bi.plate-dl-nosuffix": {
          "source": "iana"
        },
        "application/vnd.dm.delegation+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.dna": {
          "source": "iana",
          "extensions": ["dna"]
        },
        "application/vnd.document+json": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.dolby.mlp": {
          "source": "apache",
          "extensions": ["mlp"]
        },
        "application/vnd.dolby.mobile.1": {
          "source": "iana"
        },
        "application/vnd.dolby.mobile.2": {
          "source": "iana"
        },
        "application/vnd.doremir.scorecloud-binary-document": {
          "source": "iana"
        },
        "application/vnd.dpgraph": {
          "source": "iana",
          "extensions": ["dpg"]
        },
        "application/vnd.dreamfactory": {
          "source": "iana",
          "extensions": ["dfac"]
        },
        "application/vnd.drive+json": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.ds-keypoint": {
          "source": "apache",
          "extensions": ["kpxx"]
        },
        "application/vnd.dtg.local": {
          "source": "iana"
        },
        "application/vnd.dtg.local.flash": {
          "source": "iana"
        },
        "application/vnd.dtg.local.html": {
          "source": "iana"
        },
        "application/vnd.dvb.ait": {
          "source": "iana",
          "extensions": ["ait"]
        },
        "application/vnd.dvb.dvbisl+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.dvb.dvbj": {
          "source": "iana"
        },
        "application/vnd.dvb.esgcontainer": {
          "source": "iana"
        },
        "application/vnd.dvb.ipdcdftnotifaccess": {
          "source": "iana"
        },
        "application/vnd.dvb.ipdcesgaccess": {
          "source": "iana"
        },
        "application/vnd.dvb.ipdcesgaccess2": {
          "source": "iana"
        },
        "application/vnd.dvb.ipdcesgpdd": {
          "source": "iana"
        },
        "application/vnd.dvb.ipdcroaming": {
          "source": "iana"
        },
        "application/vnd.dvb.iptv.alfec-base": {
          "source": "iana"
        },
        "application/vnd.dvb.iptv.alfec-enhancement": {
          "source": "iana"
        },
        "application/vnd.dvb.notif-aggregate-root+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.dvb.notif-container+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.dvb.notif-generic+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.dvb.notif-ia-msglist+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.dvb.notif-ia-registration-request+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.dvb.notif-ia-registration-response+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.dvb.notif-init+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.dvb.pfr": {
          "source": "iana"
        },
        "application/vnd.dvb.service": {
          "source": "iana",
          "extensions": ["svc"]
        },
        "application/vnd.dxr": {
          "source": "iana"
        },
        "application/vnd.dynageo": {
          "source": "iana",
          "extensions": ["geo"]
        },
        "application/vnd.dzr": {
          "source": "iana"
        },
        "application/vnd.easykaraoke.cdgdownload": {
          "source": "iana"
        },
        "application/vnd.ecdis-update": {
          "source": "iana"
        },
        "application/vnd.ecip.rlp": {
          "source": "iana"
        },
        "application/vnd.ecowin.chart": {
          "source": "iana",
          "extensions": ["mag"]
        },
        "application/vnd.ecowin.filerequest": {
          "source": "iana"
        },
        "application/vnd.ecowin.fileupdate": {
          "source": "iana"
        },
        "application/vnd.ecowin.series": {
          "source": "iana"
        },
        "application/vnd.ecowin.seriesrequest": {
          "source": "iana"
        },
        "application/vnd.ecowin.seriesupdate": {
          "source": "iana"
        },
        "application/vnd.efi.img": {
          "source": "iana"
        },
        "application/vnd.efi.iso": {
          "source": "iana"
        },
        "application/vnd.emclient.accessrequest+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.enliven": {
          "source": "iana",
          "extensions": ["nml"]
        },
        "application/vnd.enphase.envoy": {
          "source": "iana"
        },
        "application/vnd.eprints.data+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.epson.esf": {
          "source": "iana",
          "extensions": ["esf"]
        },
        "application/vnd.epson.msf": {
          "source": "iana",
          "extensions": ["msf"]
        },
        "application/vnd.epson.quickanime": {
          "source": "iana",
          "extensions": ["qam"]
        },
        "application/vnd.epson.salt": {
          "source": "iana",
          "extensions": ["slt"]
        },
        "application/vnd.epson.ssf": {
          "source": "iana",
          "extensions": ["ssf"]
        },
        "application/vnd.ericsson.quickcall": {
          "source": "iana"
        },
        "application/vnd.espass-espass+zip": {
          "source": "iana",
          "compressible": false
        },
        "application/vnd.eszigno3+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["es3", "et3"]
        },
        "application/vnd.etsi.aoc+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.etsi.asic-e+zip": {
          "source": "iana",
          "compressible": false
        },
        "application/vnd.etsi.asic-s+zip": {
          "source": "iana",
          "compressible": false
        },
        "application/vnd.etsi.cug+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.etsi.iptvcommand+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.etsi.iptvdiscovery+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.etsi.iptvprofile+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.etsi.iptvsad-bc+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.etsi.iptvsad-cod+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.etsi.iptvsad-npvr+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.etsi.iptvservice+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.etsi.iptvsync+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.etsi.iptvueprofile+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.etsi.mcid+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.etsi.mheg5": {
          "source": "iana"
        },
        "application/vnd.etsi.overload-control-policy-dataset+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.etsi.pstn+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.etsi.sci+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.etsi.simservs+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.etsi.timestamp-token": {
          "source": "iana"
        },
        "application/vnd.etsi.tsl+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.etsi.tsl.der": {
          "source": "iana"
        },
        "application/vnd.eudora.data": {
          "source": "iana"
        },
        "application/vnd.evolv.ecig.profile": {
          "source": "iana"
        },
        "application/vnd.evolv.ecig.settings": {
          "source": "iana"
        },
        "application/vnd.evolv.ecig.theme": {
          "source": "iana"
        },
        "application/vnd.exstream-empower+zip": {
          "source": "iana",
          "compressible": false
        },
        "application/vnd.exstream-package": {
          "source": "iana"
        },
        "application/vnd.ezpix-album": {
          "source": "iana",
          "extensions": ["ez2"]
        },
        "application/vnd.ezpix-package": {
          "source": "iana",
          "extensions": ["ez3"]
        },
        "application/vnd.f-secure.mobile": {
          "source": "iana"
        },
        "application/vnd.fastcopy-disk-image": {
          "source": "iana"
        },
        "application/vnd.fdf": {
          "source": "iana",
          "extensions": ["fdf"]
        },
        "application/vnd.fdsn.mseed": {
          "source": "iana",
          "extensions": ["mseed"]
        },
        "application/vnd.fdsn.seed": {
          "source": "iana",
          "extensions": ["seed", "dataless"]
        },
        "application/vnd.ffsns": {
          "source": "iana"
        },
        "application/vnd.ficlab.flb+zip": {
          "source": "iana",
          "compressible": false
        },
        "application/vnd.filmit.zfc": {
          "source": "iana"
        },
        "application/vnd.fints": {
          "source": "iana"
        },
        "application/vnd.firemonkeys.cloudcell": {
          "source": "iana"
        },
        "application/vnd.flographit": {
          "source": "iana",
          "extensions": ["gph"]
        },
        "application/vnd.fluxtime.clip": {
          "source": "iana",
          "extensions": ["ftc"]
        },
        "application/vnd.font-fontforge-sfd": {
          "source": "iana"
        },
        "application/vnd.framemaker": {
          "source": "iana",
          "extensions": ["fm", "frame", "maker", "book"]
        },
        "application/vnd.frogans.fnc": {
          "source": "iana",
          "extensions": ["fnc"]
        },
        "application/vnd.frogans.ltf": {
          "source": "iana",
          "extensions": ["ltf"]
        },
        "application/vnd.fsc.weblaunch": {
          "source": "iana",
          "extensions": ["fsc"]
        },
        "application/vnd.fujitsu.oasys": {
          "source": "iana",
          "extensions": ["oas"]
        },
        "application/vnd.fujitsu.oasys2": {
          "source": "iana",
          "extensions": ["oa2"]
        },
        "application/vnd.fujitsu.oasys3": {
          "source": "iana",
          "extensions": ["oa3"]
        },
        "application/vnd.fujitsu.oasysgp": {
          "source": "iana",
          "extensions": ["fg5"]
        },
        "application/vnd.fujitsu.oasysprs": {
          "source": "iana",
          "extensions": ["bh2"]
        },
        "application/vnd.fujixerox.art-ex": {
          "source": "iana"
        },
        "application/vnd.fujixerox.art4": {
          "source": "iana"
        },
        "application/vnd.fujixerox.ddd": {
          "source": "iana",
          "extensions": ["ddd"]
        },
        "application/vnd.fujixerox.docuworks": {
          "source": "iana",
          "extensions": ["xdw"]
        },
        "application/vnd.fujixerox.docuworks.binder": {
          "source": "iana",
          "extensions": ["xbd"]
        },
        "application/vnd.fujixerox.docuworks.container": {
          "source": "iana"
        },
        "application/vnd.fujixerox.hbpl": {
          "source": "iana"
        },
        "application/vnd.fut-misnet": {
          "source": "iana"
        },
        "application/vnd.futoin+cbor": {
          "source": "iana"
        },
        "application/vnd.futoin+json": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.fuzzysheet": {
          "source": "iana",
          "extensions": ["fzs"]
        },
        "application/vnd.genomatix.tuxedo": {
          "source": "iana",
          "extensions": ["txd"]
        },
        "application/vnd.gentics.grd+json": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.geo+json": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.geocube+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.geogebra.file": {
          "source": "iana",
          "extensions": ["ggb"]
        },
        "application/vnd.geogebra.tool": {
          "source": "iana",
          "extensions": ["ggt"]
        },
        "application/vnd.geometry-explorer": {
          "source": "iana",
          "extensions": ["gex", "gre"]
        },
        "application/vnd.geonext": {
          "source": "iana",
          "extensions": ["gxt"]
        },
        "application/vnd.geoplan": {
          "source": "iana",
          "extensions": ["g2w"]
        },
        "application/vnd.geospace": {
          "source": "iana",
          "extensions": ["g3w"]
        },
        "application/vnd.gerber": {
          "source": "iana"
        },
        "application/vnd.globalplatform.card-content-mgt": {
          "source": "iana"
        },
        "application/vnd.globalplatform.card-content-mgt-response": {
          "source": "iana"
        },
        "application/vnd.gmx": {
          "source": "iana",
          "extensions": ["gmx"]
        },
        "application/vnd.google-apps.document": {
          "compressible": false,
          "extensions": ["gdoc"]
        },
        "application/vnd.google-apps.presentation": {
          "compressible": false,
          "extensions": ["gslides"]
        },
        "application/vnd.google-apps.spreadsheet": {
          "compressible": false,
          "extensions": ["gsheet"]
        },
        "application/vnd.google-earth.kml+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["kml"]
        },
        "application/vnd.google-earth.kmz": {
          "source": "iana",
          "compressible": false,
          "extensions": ["kmz"]
        },
        "application/vnd.gov.sk.e-form+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.gov.sk.e-form+zip": {
          "source": "iana",
          "compressible": false
        },
        "application/vnd.gov.sk.xmldatacontainer+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.grafeq": {
          "source": "iana",
          "extensions": ["gqf", "gqs"]
        },
        "application/vnd.gridmp": {
          "source": "iana"
        },
        "application/vnd.groove-account": {
          "source": "iana",
          "extensions": ["gac"]
        },
        "application/vnd.groove-help": {
          "source": "iana",
          "extensions": ["ghf"]
        },
        "application/vnd.groove-identity-message": {
          "source": "iana",
          "extensions": ["gim"]
        },
        "application/vnd.groove-injector": {
          "source": "iana",
          "extensions": ["grv"]
        },
        "application/vnd.groove-tool-message": {
          "source": "iana",
          "extensions": ["gtm"]
        },
        "application/vnd.groove-tool-template": {
          "source": "iana",
          "extensions": ["tpl"]
        },
        "application/vnd.groove-vcard": {
          "source": "iana",
          "extensions": ["vcg"]
        },
        "application/vnd.hal+json": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.hal+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["hal"]
        },
        "application/vnd.handheld-entertainment+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["zmm"]
        },
        "application/vnd.hbci": {
          "source": "iana",
          "extensions": ["hbci"]
        },
        "application/vnd.hc+json": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.hcl-bireports": {
          "source": "iana"
        },
        "application/vnd.hdt": {
          "source": "iana"
        },
        "application/vnd.heroku+json": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.hhe.lesson-player": {
          "source": "iana",
          "extensions": ["les"]
        },
        "application/vnd.hp-hpgl": {
          "source": "iana",
          "extensions": ["hpgl"]
        },
        "application/vnd.hp-hpid": {
          "source": "iana",
          "extensions": ["hpid"]
        },
        "application/vnd.hp-hps": {
          "source": "iana",
          "extensions": ["hps"]
        },
        "application/vnd.hp-jlyt": {
          "source": "iana",
          "extensions": ["jlt"]
        },
        "application/vnd.hp-pcl": {
          "source": "iana",
          "extensions": ["pcl"]
        },
        "application/vnd.hp-pclxl": {
          "source": "iana",
          "extensions": ["pclxl"]
        },
        "application/vnd.httphone": {
          "source": "iana"
        },
        "application/vnd.hydrostatix.sof-data": {
          "source": "iana",
          "extensions": ["sfd-hdstx"]
        },
        "application/vnd.hyper+json": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.hyper-item+json": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.hyperdrive+json": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.hzn-3d-crossword": {
          "source": "iana"
        },
        "application/vnd.ibm.afplinedata": {
          "source": "iana"
        },
        "application/vnd.ibm.electronic-media": {
          "source": "iana"
        },
        "application/vnd.ibm.minipay": {
          "source": "iana",
          "extensions": ["mpy"]
        },
        "application/vnd.ibm.modcap": {
          "source": "iana",
          "extensions": ["afp", "listafp", "list3820"]
        },
        "application/vnd.ibm.rights-management": {
          "source": "iana",
          "extensions": ["irm"]
        },
        "application/vnd.ibm.secure-container": {
          "source": "iana",
          "extensions": ["sc"]
        },
        "application/vnd.iccprofile": {
          "source": "iana",
          "extensions": ["icc", "icm"]
        },
        "application/vnd.ieee.1905": {
          "source": "iana"
        },
        "application/vnd.igloader": {
          "source": "iana",
          "extensions": ["igl"]
        },
        "application/vnd.imagemeter.folder+zip": {
          "source": "iana",
          "compressible": false
        },
        "application/vnd.imagemeter.image+zip": {
          "source": "iana",
          "compressible": false
        },
        "application/vnd.immervision-ivp": {
          "source": "iana",
          "extensions": ["ivp"]
        },
        "application/vnd.immervision-ivu": {
          "source": "iana",
          "extensions": ["ivu"]
        },
        "application/vnd.ims.imsccv1p1": {
          "source": "iana"
        },
        "application/vnd.ims.imsccv1p2": {
          "source": "iana"
        },
        "application/vnd.ims.imsccv1p3": {
          "source": "iana"
        },
        "application/vnd.ims.lis.v2.result+json": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.ims.lti.v2.toolconsumerprofile+json": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.ims.lti.v2.toolproxy+json": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.ims.lti.v2.toolproxy.id+json": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.ims.lti.v2.toolsettings+json": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.ims.lti.v2.toolsettings.simple+json": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.informedcontrol.rms+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.informix-visionary": {
          "source": "iana"
        },
        "application/vnd.infotech.project": {
          "source": "iana"
        },
        "application/vnd.infotech.project+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.innopath.wamp.notification": {
          "source": "iana"
        },
        "application/vnd.insors.igm": {
          "source": "iana",
          "extensions": ["igm"]
        },
        "application/vnd.intercon.formnet": {
          "source": "iana",
          "extensions": ["xpw", "xpx"]
        },
        "application/vnd.intergeo": {
          "source": "iana",
          "extensions": ["i2g"]
        },
        "application/vnd.intertrust.digibox": {
          "source": "iana"
        },
        "application/vnd.intertrust.nncp": {
          "source": "iana"
        },
        "application/vnd.intu.qbo": {
          "source": "iana",
          "extensions": ["qbo"]
        },
        "application/vnd.intu.qfx": {
          "source": "iana",
          "extensions": ["qfx"]
        },
        "application/vnd.iptc.g2.catalogitem+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.iptc.g2.conceptitem+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.iptc.g2.knowledgeitem+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.iptc.g2.newsitem+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.iptc.g2.newsmessage+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.iptc.g2.packageitem+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.iptc.g2.planningitem+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.ipunplugged.rcprofile": {
          "source": "iana",
          "extensions": ["rcprofile"]
        },
        "application/vnd.irepository.package+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["irp"]
        },
        "application/vnd.is-xpr": {
          "source": "iana",
          "extensions": ["xpr"]
        },
        "application/vnd.isac.fcs": {
          "source": "iana",
          "extensions": ["fcs"]
        },
        "application/vnd.iso11783-10+zip": {
          "source": "iana",
          "compressible": false
        },
        "application/vnd.jam": {
          "source": "iana",
          "extensions": ["jam"]
        },
        "application/vnd.japannet-directory-service": {
          "source": "iana"
        },
        "application/vnd.japannet-jpnstore-wakeup": {
          "source": "iana"
        },
        "application/vnd.japannet-payment-wakeup": {
          "source": "iana"
        },
        "application/vnd.japannet-registration": {
          "source": "iana"
        },
        "application/vnd.japannet-registration-wakeup": {
          "source": "iana"
        },
        "application/vnd.japannet-setstore-wakeup": {
          "source": "iana"
        },
        "application/vnd.japannet-verification": {
          "source": "iana"
        },
        "application/vnd.japannet-verification-wakeup": {
          "source": "iana"
        },
        "application/vnd.jcp.javame.midlet-rms": {
          "source": "iana",
          "extensions": ["rms"]
        },
        "application/vnd.jisp": {
          "source": "iana",
          "extensions": ["jisp"]
        },
        "application/vnd.joost.joda-archive": {
          "source": "iana",
          "extensions": ["joda"]
        },
        "application/vnd.jsk.isdn-ngn": {
          "source": "iana"
        },
        "application/vnd.kahootz": {
          "source": "iana",
          "extensions": ["ktz", "ktr"]
        },
        "application/vnd.kde.karbon": {
          "source": "iana",
          "extensions": ["karbon"]
        },
        "application/vnd.kde.kchart": {
          "source": "iana",
          "extensions": ["chrt"]
        },
        "application/vnd.kde.kformula": {
          "source": "iana",
          "extensions": ["kfo"]
        },
        "application/vnd.kde.kivio": {
          "source": "iana",
          "extensions": ["flw"]
        },
        "application/vnd.kde.kontour": {
          "source": "iana",
          "extensions": ["kon"]
        },
        "application/vnd.kde.kpresenter": {
          "source": "iana",
          "extensions": ["kpr", "kpt"]
        },
        "application/vnd.kde.kspread": {
          "source": "iana",
          "extensions": ["ksp"]
        },
        "application/vnd.kde.kword": {
          "source": "iana",
          "extensions": ["kwd", "kwt"]
        },
        "application/vnd.kenameaapp": {
          "source": "iana",
          "extensions": ["htke"]
        },
        "application/vnd.kidspiration": {
          "source": "iana",
          "extensions": ["kia"]
        },
        "application/vnd.kinar": {
          "source": "iana",
          "extensions": ["kne", "knp"]
        },
        "application/vnd.koan": {
          "source": "iana",
          "extensions": ["skp", "skd", "skt", "skm"]
        },
        "application/vnd.kodak-descriptor": {
          "source": "iana",
          "extensions": ["sse"]
        },
        "application/vnd.las": {
          "source": "iana"
        },
        "application/vnd.las.las+json": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.las.las+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["lasxml"]
        },
        "application/vnd.laszip": {
          "source": "iana"
        },
        "application/vnd.leap+json": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.liberty-request+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.llamagraphics.life-balance.desktop": {
          "source": "iana",
          "extensions": ["lbd"]
        },
        "application/vnd.llamagraphics.life-balance.exchange+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["lbe"]
        },
        "application/vnd.logipipe.circuit+zip": {
          "source": "iana",
          "compressible": false
        },
        "application/vnd.loom": {
          "source": "iana"
        },
        "application/vnd.lotus-1-2-3": {
          "source": "iana",
          "extensions": ["123"]
        },
        "application/vnd.lotus-approach": {
          "source": "iana",
          "extensions": ["apr"]
        },
        "application/vnd.lotus-freelance": {
          "source": "iana",
          "extensions": ["pre"]
        },
        "application/vnd.lotus-notes": {
          "source": "iana",
          "extensions": ["nsf"]
        },
        "application/vnd.lotus-organizer": {
          "source": "iana",
          "extensions": ["org"]
        },
        "application/vnd.lotus-screencam": {
          "source": "iana",
          "extensions": ["scm"]
        },
        "application/vnd.lotus-wordpro": {
          "source": "iana",
          "extensions": ["lwp"]
        },
        "application/vnd.macports.portpkg": {
          "source": "iana",
          "extensions": ["portpkg"]
        },
        "application/vnd.mapbox-vector-tile": {
          "source": "iana"
        },
        "application/vnd.marlin.drm.actiontoken+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.marlin.drm.conftoken+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.marlin.drm.license+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.marlin.drm.mdcf": {
          "source": "iana"
        },
        "application/vnd.mason+json": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.maxmind.maxmind-db": {
          "source": "iana"
        },
        "application/vnd.mcd": {
          "source": "iana",
          "extensions": ["mcd"]
        },
        "application/vnd.medcalcdata": {
          "source": "iana",
          "extensions": ["mc1"]
        },
        "application/vnd.mediastation.cdkey": {
          "source": "iana",
          "extensions": ["cdkey"]
        },
        "application/vnd.meridian-slingshot": {
          "source": "iana"
        },
        "application/vnd.mfer": {
          "source": "iana",
          "extensions": ["mwf"]
        },
        "application/vnd.mfmp": {
          "source": "iana",
          "extensions": ["mfm"]
        },
        "application/vnd.micro+json": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.micrografx.flo": {
          "source": "iana",
          "extensions": ["flo"]
        },
        "application/vnd.micrografx.igx": {
          "source": "iana",
          "extensions": ["igx"]
        },
        "application/vnd.microsoft.portable-executable": {
          "source": "iana"
        },
        "application/vnd.microsoft.windows.thumbnail-cache": {
          "source": "iana"
        },
        "application/vnd.miele+json": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.mif": {
          "source": "iana",
          "extensions": ["mif"]
        },
        "application/vnd.minisoft-hp3000-save": {
          "source": "iana"
        },
        "application/vnd.mitsubishi.misty-guard.trustweb": {
          "source": "iana"
        },
        "application/vnd.mobius.daf": {
          "source": "iana",
          "extensions": ["daf"]
        },
        "application/vnd.mobius.dis": {
          "source": "iana",
          "extensions": ["dis"]
        },
        "application/vnd.mobius.mbk": {
          "source": "iana",
          "extensions": ["mbk"]
        },
        "application/vnd.mobius.mqy": {
          "source": "iana",
          "extensions": ["mqy"]
        },
        "application/vnd.mobius.msl": {
          "source": "iana",
          "extensions": ["msl"]
        },
        "application/vnd.mobius.plc": {
          "source": "iana",
          "extensions": ["plc"]
        },
        "application/vnd.mobius.txf": {
          "source": "iana",
          "extensions": ["txf"]
        },
        "application/vnd.mophun.application": {
          "source": "iana",
          "extensions": ["mpn"]
        },
        "application/vnd.mophun.certificate": {
          "source": "iana",
          "extensions": ["mpc"]
        },
        "application/vnd.motorola.flexsuite": {
          "source": "iana"
        },
        "application/vnd.motorola.flexsuite.adsi": {
          "source": "iana"
        },
        "application/vnd.motorola.flexsuite.fis": {
          "source": "iana"
        },
        "application/vnd.motorola.flexsuite.gotap": {
          "source": "iana"
        },
        "application/vnd.motorola.flexsuite.kmr": {
          "source": "iana"
        },
        "application/vnd.motorola.flexsuite.ttc": {
          "source": "iana"
        },
        "application/vnd.motorola.flexsuite.wem": {
          "source": "iana"
        },
        "application/vnd.motorola.iprm": {
          "source": "iana"
        },
        "application/vnd.mozilla.xul+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["xul"]
        },
        "application/vnd.ms-3mfdocument": {
          "source": "iana"
        },
        "application/vnd.ms-artgalry": {
          "source": "iana",
          "extensions": ["cil"]
        },
        "application/vnd.ms-asf": {
          "source": "iana"
        },
        "application/vnd.ms-cab-compressed": {
          "source": "iana",
          "extensions": ["cab"]
        },
        "application/vnd.ms-color.iccprofile": {
          "source": "apache"
        },
        "application/vnd.ms-excel": {
          "source": "iana",
          "compressible": false,
          "extensions": ["xls", "xlm", "xla", "xlc", "xlt", "xlw"]
        },
        "application/vnd.ms-excel.addin.macroenabled.12": {
          "source": "iana",
          "extensions": ["xlam"]
        },
        "application/vnd.ms-excel.sheet.binary.macroenabled.12": {
          "source": "iana",
          "extensions": ["xlsb"]
        },
        "application/vnd.ms-excel.sheet.macroenabled.12": {
          "source": "iana",
          "extensions": ["xlsm"]
        },
        "application/vnd.ms-excel.template.macroenabled.12": {
          "source": "iana",
          "extensions": ["xltm"]
        },
        "application/vnd.ms-fontobject": {
          "source": "iana",
          "compressible": true,
          "extensions": ["eot"]
        },
        "application/vnd.ms-htmlhelp": {
          "source": "iana",
          "extensions": ["chm"]
        },
        "application/vnd.ms-ims": {
          "source": "iana",
          "extensions": ["ims"]
        },
        "application/vnd.ms-lrm": {
          "source": "iana",
          "extensions": ["lrm"]
        },
        "application/vnd.ms-office.activex+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.ms-officetheme": {
          "source": "iana",
          "extensions": ["thmx"]
        },
        "application/vnd.ms-opentype": {
          "source": "apache",
          "compressible": true
        },
        "application/vnd.ms-outlook": {
          "compressible": false,
          "extensions": ["msg"]
        },
        "application/vnd.ms-package.obfuscated-opentype": {
          "source": "apache"
        },
        "application/vnd.ms-pki.seccat": {
          "source": "apache",
          "extensions": ["cat"]
        },
        "application/vnd.ms-pki.stl": {
          "source": "apache",
          "extensions": ["stl"]
        },
        "application/vnd.ms-playready.initiator+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.ms-powerpoint": {
          "source": "iana",
          "compressible": false,
          "extensions": ["ppt", "pps", "pot"]
        },
        "application/vnd.ms-powerpoint.addin.macroenabled.12": {
          "source": "iana",
          "extensions": ["ppam"]
        },
        "application/vnd.ms-powerpoint.presentation.macroenabled.12": {
          "source": "iana",
          "extensions": ["pptm"]
        },
        "application/vnd.ms-powerpoint.slide.macroenabled.12": {
          "source": "iana",
          "extensions": ["sldm"]
        },
        "application/vnd.ms-powerpoint.slideshow.macroenabled.12": {
          "source": "iana",
          "extensions": ["ppsm"]
        },
        "application/vnd.ms-powerpoint.template.macroenabled.12": {
          "source": "iana",
          "extensions": ["potm"]
        },
        "application/vnd.ms-printdevicecapabilities+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.ms-printing.printticket+xml": {
          "source": "apache",
          "compressible": true
        },
        "application/vnd.ms-printschematicket+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.ms-project": {
          "source": "iana",
          "extensions": ["mpp", "mpt"]
        },
        "application/vnd.ms-tnef": {
          "source": "iana"
        },
        "application/vnd.ms-windows.devicepairing": {
          "source": "iana"
        },
        "application/vnd.ms-windows.nwprinting.oob": {
          "source": "iana"
        },
        "application/vnd.ms-windows.printerpairing": {
          "source": "iana"
        },
        "application/vnd.ms-windows.wsd.oob": {
          "source": "iana"
        },
        "application/vnd.ms-wmdrm.lic-chlg-req": {
          "source": "iana"
        },
        "application/vnd.ms-wmdrm.lic-resp": {
          "source": "iana"
        },
        "application/vnd.ms-wmdrm.meter-chlg-req": {
          "source": "iana"
        },
        "application/vnd.ms-wmdrm.meter-resp": {
          "source": "iana"
        },
        "application/vnd.ms-word.document.macroenabled.12": {
          "source": "iana",
          "extensions": ["docm"]
        },
        "application/vnd.ms-word.template.macroenabled.12": {
          "source": "iana",
          "extensions": ["dotm"]
        },
        "application/vnd.ms-works": {
          "source": "iana",
          "extensions": ["wps", "wks", "wcm", "wdb"]
        },
        "application/vnd.ms-wpl": {
          "source": "iana",
          "extensions": ["wpl"]
        },
        "application/vnd.ms-xpsdocument": {
          "source": "iana",
          "compressible": false,
          "extensions": ["xps"]
        },
        "application/vnd.msa-disk-image": {
          "source": "iana"
        },
        "application/vnd.mseq": {
          "source": "iana",
          "extensions": ["mseq"]
        },
        "application/vnd.msign": {
          "source": "iana"
        },
        "application/vnd.multiad.creator": {
          "source": "iana"
        },
        "application/vnd.multiad.creator.cif": {
          "source": "iana"
        },
        "application/vnd.music-niff": {
          "source": "iana"
        },
        "application/vnd.musician": {
          "source": "iana",
          "extensions": ["mus"]
        },
        "application/vnd.muvee.style": {
          "source": "iana",
          "extensions": ["msty"]
        },
        "application/vnd.mynfc": {
          "source": "iana",
          "extensions": ["taglet"]
        },
        "application/vnd.ncd.control": {
          "source": "iana"
        },
        "application/vnd.ncd.reference": {
          "source": "iana"
        },
        "application/vnd.nearst.inv+json": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.nervana": {
          "source": "iana"
        },
        "application/vnd.netfpx": {
          "source": "iana"
        },
        "application/vnd.neurolanguage.nlu": {
          "source": "iana",
          "extensions": ["nlu"]
        },
        "application/vnd.nimn": {
          "source": "iana"
        },
        "application/vnd.nintendo.nitro.rom": {
          "source": "iana"
        },
        "application/vnd.nintendo.snes.rom": {
          "source": "iana"
        },
        "application/vnd.nitf": {
          "source": "iana",
          "extensions": ["ntf", "nitf"]
        },
        "application/vnd.noblenet-directory": {
          "source": "iana",
          "extensions": ["nnd"]
        },
        "application/vnd.noblenet-sealer": {
          "source": "iana",
          "extensions": ["nns"]
        },
        "application/vnd.noblenet-web": {
          "source": "iana",
          "extensions": ["nnw"]
        },
        "application/vnd.nokia.catalogs": {
          "source": "iana"
        },
        "application/vnd.nokia.conml+wbxml": {
          "source": "iana"
        },
        "application/vnd.nokia.conml+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.nokia.iptv.config+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.nokia.isds-radio-presets": {
          "source": "iana"
        },
        "application/vnd.nokia.landmark+wbxml": {
          "source": "iana"
        },
        "application/vnd.nokia.landmark+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.nokia.landmarkcollection+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.nokia.n-gage.ac+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["ac"]
        },
        "application/vnd.nokia.n-gage.data": {
          "source": "iana",
          "extensions": ["ngdat"]
        },
        "application/vnd.nokia.n-gage.symbian.install": {
          "source": "iana",
          "extensions": ["n-gage"]
        },
        "application/vnd.nokia.ncd": {
          "source": "iana"
        },
        "application/vnd.nokia.pcd+wbxml": {
          "source": "iana"
        },
        "application/vnd.nokia.pcd+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.nokia.radio-preset": {
          "source": "iana",
          "extensions": ["rpst"]
        },
        "application/vnd.nokia.radio-presets": {
          "source": "iana",
          "extensions": ["rpss"]
        },
        "application/vnd.novadigm.edm": {
          "source": "iana",
          "extensions": ["edm"]
        },
        "application/vnd.novadigm.edx": {
          "source": "iana",
          "extensions": ["edx"]
        },
        "application/vnd.novadigm.ext": {
          "source": "iana",
          "extensions": ["ext"]
        },
        "application/vnd.ntt-local.content-share": {
          "source": "iana"
        },
        "application/vnd.ntt-local.file-transfer": {
          "source": "iana"
        },
        "application/vnd.ntt-local.ogw_remote-access": {
          "source": "iana"
        },
        "application/vnd.ntt-local.sip-ta_remote": {
          "source": "iana"
        },
        "application/vnd.ntt-local.sip-ta_tcp_stream": {
          "source": "iana"
        },
        "application/vnd.oasis.opendocument.chart": {
          "source": "iana",
          "extensions": ["odc"]
        },
        "application/vnd.oasis.opendocument.chart-template": {
          "source": "iana",
          "extensions": ["otc"]
        },
        "application/vnd.oasis.opendocument.database": {
          "source": "iana",
          "extensions": ["odb"]
        },
        "application/vnd.oasis.opendocument.formula": {
          "source": "iana",
          "extensions": ["odf"]
        },
        "application/vnd.oasis.opendocument.formula-template": {
          "source": "iana",
          "extensions": ["odft"]
        },
        "application/vnd.oasis.opendocument.graphics": {
          "source": "iana",
          "compressible": false,
          "extensions": ["odg"]
        },
        "application/vnd.oasis.opendocument.graphics-template": {
          "source": "iana",
          "extensions": ["otg"]
        },
        "application/vnd.oasis.opendocument.image": {
          "source": "iana",
          "extensions": ["odi"]
        },
        "application/vnd.oasis.opendocument.image-template": {
          "source": "iana",
          "extensions": ["oti"]
        },
        "application/vnd.oasis.opendocument.presentation": {
          "source": "iana",
          "compressible": false,
          "extensions": ["odp"]
        },
        "application/vnd.oasis.opendocument.presentation-template": {
          "source": "iana",
          "extensions": ["otp"]
        },
        "application/vnd.oasis.opendocument.spreadsheet": {
          "source": "iana",
          "compressible": false,
          "extensions": ["ods"]
        },
        "application/vnd.oasis.opendocument.spreadsheet-template": {
          "source": "iana",
          "extensions": ["ots"]
        },
        "application/vnd.oasis.opendocument.text": {
          "source": "iana",
          "compressible": false,
          "extensions": ["odt"]
        },
        "application/vnd.oasis.opendocument.text-master": {
          "source": "iana",
          "extensions": ["odm"]
        },
        "application/vnd.oasis.opendocument.text-template": {
          "source": "iana",
          "extensions": ["ott"]
        },
        "application/vnd.oasis.opendocument.text-web": {
          "source": "iana",
          "extensions": ["oth"]
        },
        "application/vnd.obn": {
          "source": "iana"
        },
        "application/vnd.ocf+cbor": {
          "source": "iana"
        },
        "application/vnd.oci.image.manifest.v1+json": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.oftn.l10n+json": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.oipf.contentaccessdownload+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.oipf.contentaccessstreaming+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.oipf.cspg-hexbinary": {
          "source": "iana"
        },
        "application/vnd.oipf.dae.svg+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.oipf.dae.xhtml+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.oipf.mippvcontrolmessage+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.oipf.pae.gem": {
          "source": "iana"
        },
        "application/vnd.oipf.spdiscovery+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.oipf.spdlist+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.oipf.ueprofile+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.oipf.userprofile+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.olpc-sugar": {
          "source": "iana",
          "extensions": ["xo"]
        },
        "application/vnd.oma-scws-config": {
          "source": "iana"
        },
        "application/vnd.oma-scws-http-request": {
          "source": "iana"
        },
        "application/vnd.oma-scws-http-response": {
          "source": "iana"
        },
        "application/vnd.oma.bcast.associated-procedure-parameter+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.oma.bcast.drm-trigger+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.oma.bcast.imd+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.oma.bcast.ltkm": {
          "source": "iana"
        },
        "application/vnd.oma.bcast.notification+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.oma.bcast.provisioningtrigger": {
          "source": "iana"
        },
        "application/vnd.oma.bcast.sgboot": {
          "source": "iana"
        },
        "application/vnd.oma.bcast.sgdd+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.oma.bcast.sgdu": {
          "source": "iana"
        },
        "application/vnd.oma.bcast.simple-symbol-container": {
          "source": "iana"
        },
        "application/vnd.oma.bcast.smartcard-trigger+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.oma.bcast.sprov+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.oma.bcast.stkm": {
          "source": "iana"
        },
        "application/vnd.oma.cab-address-book+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.oma.cab-feature-handler+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.oma.cab-pcc+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.oma.cab-subs-invite+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.oma.cab-user-prefs+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.oma.dcd": {
          "source": "iana"
        },
        "application/vnd.oma.dcdc": {
          "source": "iana"
        },
        "application/vnd.oma.dd2+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["dd2"]
        },
        "application/vnd.oma.drm.risd+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.oma.group-usage-list+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.oma.lwm2m+json": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.oma.lwm2m+tlv": {
          "source": "iana"
        },
        "application/vnd.oma.pal+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.oma.poc.detailed-progress-report+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.oma.poc.final-report+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.oma.poc.groups+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.oma.poc.invocation-descriptor+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.oma.poc.optimized-progress-report+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.oma.push": {
          "source": "iana"
        },
        "application/vnd.oma.scidm.messages+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.oma.xcap-directory+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.omads-email+xml": {
          "source": "iana",
          "charset": "UTF-8",
          "compressible": true
        },
        "application/vnd.omads-file+xml": {
          "source": "iana",
          "charset": "UTF-8",
          "compressible": true
        },
        "application/vnd.omads-folder+xml": {
          "source": "iana",
          "charset": "UTF-8",
          "compressible": true
        },
        "application/vnd.omaloc-supl-init": {
          "source": "iana"
        },
        "application/vnd.onepager": {
          "source": "iana"
        },
        "application/vnd.onepagertamp": {
          "source": "iana"
        },
        "application/vnd.onepagertamx": {
          "source": "iana"
        },
        "application/vnd.onepagertat": {
          "source": "iana"
        },
        "application/vnd.onepagertatp": {
          "source": "iana"
        },
        "application/vnd.onepagertatx": {
          "source": "iana"
        },
        "application/vnd.openblox.game+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["obgx"]
        },
        "application/vnd.openblox.game-binary": {
          "source": "iana"
        },
        "application/vnd.openeye.oeb": {
          "source": "iana"
        },
        "application/vnd.openofficeorg.extension": {
          "source": "apache",
          "extensions": ["oxt"]
        },
        "application/vnd.openstreetmap.data+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["osm"]
        },
        "application/vnd.openxmlformats-officedocument.custom-properties+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.openxmlformats-officedocument.customxmlproperties+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.openxmlformats-officedocument.drawing+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.openxmlformats-officedocument.drawingml.chart+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.openxmlformats-officedocument.drawingml.diagramcolors+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.openxmlformats-officedocument.drawingml.diagramdata+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.openxmlformats-officedocument.drawingml.diagramlayout+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.openxmlformats-officedocument.drawingml.diagramstyle+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.openxmlformats-officedocument.extended-properties+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.openxmlformats-officedocument.presentationml.commentauthors+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.openxmlformats-officedocument.presentationml.comments+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.openxmlformats-officedocument.presentationml.handoutmaster+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.openxmlformats-officedocument.presentationml.notesmaster+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.openxmlformats-officedocument.presentationml.notesslide+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.openxmlformats-officedocument.presentationml.presentation": {
          "source": "iana",
          "compressible": false,
          "extensions": ["pptx"]
        },
        "application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.openxmlformats-officedocument.presentationml.presprops+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.openxmlformats-officedocument.presentationml.slide": {
          "source": "iana",
          "extensions": ["sldx"]
        },
        "application/vnd.openxmlformats-officedocument.presentationml.slide+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.openxmlformats-officedocument.presentationml.slidelayout+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.openxmlformats-officedocument.presentationml.slidemaster+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.openxmlformats-officedocument.presentationml.slideshow": {
          "source": "iana",
          "extensions": ["ppsx"]
        },
        "application/vnd.openxmlformats-officedocument.presentationml.slideshow.main+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.openxmlformats-officedocument.presentationml.slideupdateinfo+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.openxmlformats-officedocument.presentationml.tablestyles+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.openxmlformats-officedocument.presentationml.tags+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.openxmlformats-officedocument.presentationml.template": {
          "source": "iana",
          "extensions": ["potx"]
        },
        "application/vnd.openxmlformats-officedocument.presentationml.template.main+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.openxmlformats-officedocument.presentationml.viewprops+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.openxmlformats-officedocument.spreadsheetml.calcchain+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.openxmlformats-officedocument.spreadsheetml.externallink+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcachedefinition+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcacherecords+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.openxmlformats-officedocument.spreadsheetml.pivottable+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.openxmlformats-officedocument.spreadsheetml.querytable+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionheaders+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionlog+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedstrings+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
          "source": "iana",
          "compressible": false,
          "extensions": ["xlsx"]
        },
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheetmetadata+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.openxmlformats-officedocument.spreadsheetml.tablesinglecells+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.openxmlformats-officedocument.spreadsheetml.template": {
          "source": "iana",
          "extensions": ["xltx"]
        },
        "application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.openxmlformats-officedocument.spreadsheetml.usernames+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.openxmlformats-officedocument.spreadsheetml.volatiledependencies+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.openxmlformats-officedocument.theme+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.openxmlformats-officedocument.themeoverride+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.openxmlformats-officedocument.vmldrawing": {
          "source": "iana"
        },
        "application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
          "source": "iana",
          "compressible": false,
          "extensions": ["docx"]
        },
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document.glossary+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.openxmlformats-officedocument.wordprocessingml.fonttable+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.openxmlformats-officedocument.wordprocessingml.template": {
          "source": "iana",
          "extensions": ["dotx"]
        },
        "application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.openxmlformats-officedocument.wordprocessingml.websettings+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.openxmlformats-package.core-properties+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.openxmlformats-package.digital-signature-xmlsignature+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.openxmlformats-package.relationships+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.oracle.resource+json": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.orange.indata": {
          "source": "iana"
        },
        "application/vnd.osa.netdeploy": {
          "source": "iana"
        },
        "application/vnd.osgeo.mapguide.package": {
          "source": "iana",
          "extensions": ["mgp"]
        },
        "application/vnd.osgi.bundle": {
          "source": "iana"
        },
        "application/vnd.osgi.dp": {
          "source": "iana",
          "extensions": ["dp"]
        },
        "application/vnd.osgi.subsystem": {
          "source": "iana",
          "extensions": ["esa"]
        },
        "application/vnd.otps.ct-kip+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.oxli.countgraph": {
          "source": "iana"
        },
        "application/vnd.pagerduty+json": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.palm": {
          "source": "iana",
          "extensions": ["pdb", "pqa", "oprc"]
        },
        "application/vnd.panoply": {
          "source": "iana"
        },
        "application/vnd.paos.xml": {
          "source": "iana"
        },
        "application/vnd.patentdive": {
          "source": "iana"
        },
        "application/vnd.patientecommsdoc": {
          "source": "iana"
        },
        "application/vnd.pawaafile": {
          "source": "iana",
          "extensions": ["paw"]
        },
        "application/vnd.pcos": {
          "source": "iana"
        },
        "application/vnd.pg.format": {
          "source": "iana",
          "extensions": ["str"]
        },
        "application/vnd.pg.osasli": {
          "source": "iana",
          "extensions": ["ei6"]
        },
        "application/vnd.piaccess.application-licence": {
          "source": "iana"
        },
        "application/vnd.picsel": {
          "source": "iana",
          "extensions": ["efif"]
        },
        "application/vnd.pmi.widget": {
          "source": "iana",
          "extensions": ["wg"]
        },
        "application/vnd.poc.group-advertisement+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.pocketlearn": {
          "source": "iana",
          "extensions": ["plf"]
        },
        "application/vnd.powerbuilder6": {
          "source": "iana",
          "extensions": ["pbd"]
        },
        "application/vnd.powerbuilder6-s": {
          "source": "iana"
        },
        "application/vnd.powerbuilder7": {
          "source": "iana"
        },
        "application/vnd.powerbuilder7-s": {
          "source": "iana"
        },
        "application/vnd.powerbuilder75": {
          "source": "iana"
        },
        "application/vnd.powerbuilder75-s": {
          "source": "iana"
        },
        "application/vnd.preminet": {
          "source": "iana"
        },
        "application/vnd.previewsystems.box": {
          "source": "iana",
          "extensions": ["box"]
        },
        "application/vnd.proteus.magazine": {
          "source": "iana",
          "extensions": ["mgz"]
        },
        "application/vnd.psfs": {
          "source": "iana"
        },
        "application/vnd.publishare-delta-tree": {
          "source": "iana",
          "extensions": ["qps"]
        },
        "application/vnd.pvi.ptid1": {
          "source": "iana",
          "extensions": ["ptid"]
        },
        "application/vnd.pwg-multiplexed": {
          "source": "iana"
        },
        "application/vnd.pwg-xhtml-print+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.qualcomm.brew-app-res": {
          "source": "iana"
        },
        "application/vnd.quarantainenet": {
          "source": "iana"
        },
        "application/vnd.quark.quarkxpress": {
          "source": "iana",
          "extensions": ["qxd", "qxt", "qwd", "qwt", "qxl", "qxb"]
        },
        "application/vnd.quobject-quoxdocument": {
          "source": "iana"
        },
        "application/vnd.radisys.moml+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.radisys.msml+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.radisys.msml-audit+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.radisys.msml-audit-conf+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.radisys.msml-audit-conn+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.radisys.msml-audit-dialog+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.radisys.msml-audit-stream+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.radisys.msml-conf+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.radisys.msml-dialog+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.radisys.msml-dialog-base+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.radisys.msml-dialog-fax-detect+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.radisys.msml-dialog-fax-sendrecv+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.radisys.msml-dialog-group+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.radisys.msml-dialog-speech+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.radisys.msml-dialog-transform+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.rainstor.data": {
          "source": "iana"
        },
        "application/vnd.rapid": {
          "source": "iana"
        },
        "application/vnd.rar": {
          "source": "iana"
        },
        "application/vnd.realvnc.bed": {
          "source": "iana",
          "extensions": ["bed"]
        },
        "application/vnd.recordare.musicxml": {
          "source": "iana",
          "extensions": ["mxl"]
        },
        "application/vnd.recordare.musicxml+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["musicxml"]
        },
        "application/vnd.renlearn.rlprint": {
          "source": "iana"
        },
        "application/vnd.restful+json": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.rig.cryptonote": {
          "source": "iana",
          "extensions": ["cryptonote"]
        },
        "application/vnd.rim.cod": {
          "source": "apache",
          "extensions": ["cod"]
        },
        "application/vnd.rn-realmedia": {
          "source": "apache",
          "extensions": ["rm"]
        },
        "application/vnd.rn-realmedia-vbr": {
          "source": "apache",
          "extensions": ["rmvb"]
        },
        "application/vnd.route66.link66+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["link66"]
        },
        "application/vnd.rs-274x": {
          "source": "iana"
        },
        "application/vnd.ruckus.download": {
          "source": "iana"
        },
        "application/vnd.s3sms": {
          "source": "iana"
        },
        "application/vnd.sailingtracker.track": {
          "source": "iana",
          "extensions": ["st"]
        },
        "application/vnd.sar": {
          "source": "iana"
        },
        "application/vnd.sbm.cid": {
          "source": "iana"
        },
        "application/vnd.sbm.mid2": {
          "source": "iana"
        },
        "application/vnd.scribus": {
          "source": "iana"
        },
        "application/vnd.sealed.3df": {
          "source": "iana"
        },
        "application/vnd.sealed.csf": {
          "source": "iana"
        },
        "application/vnd.sealed.doc": {
          "source": "iana"
        },
        "application/vnd.sealed.eml": {
          "source": "iana"
        },
        "application/vnd.sealed.mht": {
          "source": "iana"
        },
        "application/vnd.sealed.net": {
          "source": "iana"
        },
        "application/vnd.sealed.ppt": {
          "source": "iana"
        },
        "application/vnd.sealed.tiff": {
          "source": "iana"
        },
        "application/vnd.sealed.xls": {
          "source": "iana"
        },
        "application/vnd.sealedmedia.softseal.html": {
          "source": "iana"
        },
        "application/vnd.sealedmedia.softseal.pdf": {
          "source": "iana"
        },
        "application/vnd.seemail": {
          "source": "iana",
          "extensions": ["see"]
        },
        "application/vnd.sema": {
          "source": "iana",
          "extensions": ["sema"]
        },
        "application/vnd.semd": {
          "source": "iana",
          "extensions": ["semd"]
        },
        "application/vnd.semf": {
          "source": "iana",
          "extensions": ["semf"]
        },
        "application/vnd.shade-save-file": {
          "source": "iana"
        },
        "application/vnd.shana.informed.formdata": {
          "source": "iana",
          "extensions": ["ifm"]
        },
        "application/vnd.shana.informed.formtemplate": {
          "source": "iana",
          "extensions": ["itp"]
        },
        "application/vnd.shana.informed.interchange": {
          "source": "iana",
          "extensions": ["iif"]
        },
        "application/vnd.shana.informed.package": {
          "source": "iana",
          "extensions": ["ipk"]
        },
        "application/vnd.shootproof+json": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.shopkick+json": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.shp": {
          "source": "iana"
        },
        "application/vnd.shx": {
          "source": "iana"
        },
        "application/vnd.sigrok.session": {
          "source": "iana"
        },
        "application/vnd.simtech-mindmapper": {
          "source": "iana",
          "extensions": ["twd", "twds"]
        },
        "application/vnd.siren+json": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.smaf": {
          "source": "iana",
          "extensions": ["mmf"]
        },
        "application/vnd.smart.notebook": {
          "source": "iana"
        },
        "application/vnd.smart.teacher": {
          "source": "iana",
          "extensions": ["teacher"]
        },
        "application/vnd.snesdev-page-table": {
          "source": "iana"
        },
        "application/vnd.software602.filler.form+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["fo"]
        },
        "application/vnd.software602.filler.form-xml-zip": {
          "source": "iana"
        },
        "application/vnd.solent.sdkm+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["sdkm", "sdkd"]
        },
        "application/vnd.spotfire.dxp": {
          "source": "iana",
          "extensions": ["dxp"]
        },
        "application/vnd.spotfire.sfs": {
          "source": "iana",
          "extensions": ["sfs"]
        },
        "application/vnd.sqlite3": {
          "source": "iana"
        },
        "application/vnd.sss-cod": {
          "source": "iana"
        },
        "application/vnd.sss-dtf": {
          "source": "iana"
        },
        "application/vnd.sss-ntf": {
          "source": "iana"
        },
        "application/vnd.stardivision.calc": {
          "source": "apache",
          "extensions": ["sdc"]
        },
        "application/vnd.stardivision.draw": {
          "source": "apache",
          "extensions": ["sda"]
        },
        "application/vnd.stardivision.impress": {
          "source": "apache",
          "extensions": ["sdd"]
        },
        "application/vnd.stardivision.math": {
          "source": "apache",
          "extensions": ["smf"]
        },
        "application/vnd.stardivision.writer": {
          "source": "apache",
          "extensions": ["sdw", "vor"]
        },
        "application/vnd.stardivision.writer-global": {
          "source": "apache",
          "extensions": ["sgl"]
        },
        "application/vnd.stepmania.package": {
          "source": "iana",
          "extensions": ["smzip"]
        },
        "application/vnd.stepmania.stepchart": {
          "source": "iana",
          "extensions": ["sm"]
        },
        "application/vnd.street-stream": {
          "source": "iana"
        },
        "application/vnd.sun.wadl+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["wadl"]
        },
        "application/vnd.sun.xml.calc": {
          "source": "apache",
          "extensions": ["sxc"]
        },
        "application/vnd.sun.xml.calc.template": {
          "source": "apache",
          "extensions": ["stc"]
        },
        "application/vnd.sun.xml.draw": {
          "source": "apache",
          "extensions": ["sxd"]
        },
        "application/vnd.sun.xml.draw.template": {
          "source": "apache",
          "extensions": ["std"]
        },
        "application/vnd.sun.xml.impress": {
          "source": "apache",
          "extensions": ["sxi"]
        },
        "application/vnd.sun.xml.impress.template": {
          "source": "apache",
          "extensions": ["sti"]
        },
        "application/vnd.sun.xml.math": {
          "source": "apache",
          "extensions": ["sxm"]
        },
        "application/vnd.sun.xml.writer": {
          "source": "apache",
          "extensions": ["sxw"]
        },
        "application/vnd.sun.xml.writer.global": {
          "source": "apache",
          "extensions": ["sxg"]
        },
        "application/vnd.sun.xml.writer.template": {
          "source": "apache",
          "extensions": ["stw"]
        },
        "application/vnd.sus-calendar": {
          "source": "iana",
          "extensions": ["sus", "susp"]
        },
        "application/vnd.svd": {
          "source": "iana",
          "extensions": ["svd"]
        },
        "application/vnd.swiftview-ics": {
          "source": "iana"
        },
        "application/vnd.symbian.install": {
          "source": "apache",
          "extensions": ["sis", "sisx"]
        },
        "application/vnd.syncml+xml": {
          "source": "iana",
          "charset": "UTF-8",
          "compressible": true,
          "extensions": ["xsm"]
        },
        "application/vnd.syncml.dm+wbxml": {
          "source": "iana",
          "charset": "UTF-8",
          "extensions": ["bdm"]
        },
        "application/vnd.syncml.dm+xml": {
          "source": "iana",
          "charset": "UTF-8",
          "compressible": true,
          "extensions": ["xdm"]
        },
        "application/vnd.syncml.dm.notification": {
          "source": "iana"
        },
        "application/vnd.syncml.dmddf+wbxml": {
          "source": "iana"
        },
        "application/vnd.syncml.dmddf+xml": {
          "source": "iana",
          "charset": "UTF-8",
          "compressible": true,
          "extensions": ["ddf"]
        },
        "application/vnd.syncml.dmtnds+wbxml": {
          "source": "iana"
        },
        "application/vnd.syncml.dmtnds+xml": {
          "source": "iana",
          "charset": "UTF-8",
          "compressible": true
        },
        "application/vnd.syncml.ds.notification": {
          "source": "iana"
        },
        "application/vnd.tableschema+json": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.tao.intent-module-archive": {
          "source": "iana",
          "extensions": ["tao"]
        },
        "application/vnd.tcpdump.pcap": {
          "source": "iana",
          "extensions": ["pcap", "cap", "dmp"]
        },
        "application/vnd.think-cell.ppttc+json": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.tmd.mediaflex.api+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.tml": {
          "source": "iana"
        },
        "application/vnd.tmobile-livetv": {
          "source": "iana",
          "extensions": ["tmo"]
        },
        "application/vnd.tri.onesource": {
          "source": "iana"
        },
        "application/vnd.trid.tpt": {
          "source": "iana",
          "extensions": ["tpt"]
        },
        "application/vnd.triscape.mxs": {
          "source": "iana",
          "extensions": ["mxs"]
        },
        "application/vnd.trueapp": {
          "source": "iana",
          "extensions": ["tra"]
        },
        "application/vnd.truedoc": {
          "source": "iana"
        },
        "application/vnd.ubisoft.webplayer": {
          "source": "iana"
        },
        "application/vnd.ufdl": {
          "source": "iana",
          "extensions": ["ufd", "ufdl"]
        },
        "application/vnd.uiq.theme": {
          "source": "iana",
          "extensions": ["utz"]
        },
        "application/vnd.umajin": {
          "source": "iana",
          "extensions": ["umj"]
        },
        "application/vnd.unity": {
          "source": "iana",
          "extensions": ["unityweb"]
        },
        "application/vnd.uoml+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["uoml"]
        },
        "application/vnd.uplanet.alert": {
          "source": "iana"
        },
        "application/vnd.uplanet.alert-wbxml": {
          "source": "iana"
        },
        "application/vnd.uplanet.bearer-choice": {
          "source": "iana"
        },
        "application/vnd.uplanet.bearer-choice-wbxml": {
          "source": "iana"
        },
        "application/vnd.uplanet.cacheop": {
          "source": "iana"
        },
        "application/vnd.uplanet.cacheop-wbxml": {
          "source": "iana"
        },
        "application/vnd.uplanet.channel": {
          "source": "iana"
        },
        "application/vnd.uplanet.channel-wbxml": {
          "source": "iana"
        },
        "application/vnd.uplanet.list": {
          "source": "iana"
        },
        "application/vnd.uplanet.list-wbxml": {
          "source": "iana"
        },
        "application/vnd.uplanet.listcmd": {
          "source": "iana"
        },
        "application/vnd.uplanet.listcmd-wbxml": {
          "source": "iana"
        },
        "application/vnd.uplanet.signal": {
          "source": "iana"
        },
        "application/vnd.uri-map": {
          "source": "iana"
        },
        "application/vnd.valve.source.material": {
          "source": "iana"
        },
        "application/vnd.vcx": {
          "source": "iana",
          "extensions": ["vcx"]
        },
        "application/vnd.vd-study": {
          "source": "iana"
        },
        "application/vnd.vectorworks": {
          "source": "iana"
        },
        "application/vnd.vel+json": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.verimatrix.vcas": {
          "source": "iana"
        },
        "application/vnd.veryant.thin": {
          "source": "iana"
        },
        "application/vnd.ves.encrypted": {
          "source": "iana"
        },
        "application/vnd.vidsoft.vidconference": {
          "source": "iana"
        },
        "application/vnd.visio": {
          "source": "iana",
          "extensions": ["vsd", "vst", "vss", "vsw"]
        },
        "application/vnd.visionary": {
          "source": "iana",
          "extensions": ["vis"]
        },
        "application/vnd.vividence.scriptfile": {
          "source": "iana"
        },
        "application/vnd.vsf": {
          "source": "iana",
          "extensions": ["vsf"]
        },
        "application/vnd.wap.sic": {
          "source": "iana"
        },
        "application/vnd.wap.slc": {
          "source": "iana"
        },
        "application/vnd.wap.wbxml": {
          "source": "iana",
          "charset": "UTF-8",
          "extensions": ["wbxml"]
        },
        "application/vnd.wap.wmlc": {
          "source": "iana",
          "extensions": ["wmlc"]
        },
        "application/vnd.wap.wmlscriptc": {
          "source": "iana",
          "extensions": ["wmlsc"]
        },
        "application/vnd.webturbo": {
          "source": "iana",
          "extensions": ["wtb"]
        },
        "application/vnd.wfa.p2p": {
          "source": "iana"
        },
        "application/vnd.wfa.wsc": {
          "source": "iana"
        },
        "application/vnd.windows.devicepairing": {
          "source": "iana"
        },
        "application/vnd.wmc": {
          "source": "iana"
        },
        "application/vnd.wmf.bootstrap": {
          "source": "iana"
        },
        "application/vnd.wolfram.mathematica": {
          "source": "iana"
        },
        "application/vnd.wolfram.mathematica.package": {
          "source": "iana"
        },
        "application/vnd.wolfram.player": {
          "source": "iana",
          "extensions": ["nbp"]
        },
        "application/vnd.wordperfect": {
          "source": "iana",
          "extensions": ["wpd"]
        },
        "application/vnd.wqd": {
          "source": "iana",
          "extensions": ["wqd"]
        },
        "application/vnd.wrq-hp3000-labelled": {
          "source": "iana"
        },
        "application/vnd.wt.stf": {
          "source": "iana",
          "extensions": ["stf"]
        },
        "application/vnd.wv.csp+wbxml": {
          "source": "iana"
        },
        "application/vnd.wv.csp+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.wv.ssp+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.xacml+json": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.xara": {
          "source": "iana",
          "extensions": ["xar"]
        },
        "application/vnd.xfdl": {
          "source": "iana",
          "extensions": ["xfdl"]
        },
        "application/vnd.xfdl.webform": {
          "source": "iana"
        },
        "application/vnd.xmi+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/vnd.xmpie.cpkg": {
          "source": "iana"
        },
        "application/vnd.xmpie.dpkg": {
          "source": "iana"
        },
        "application/vnd.xmpie.plan": {
          "source": "iana"
        },
        "application/vnd.xmpie.ppkg": {
          "source": "iana"
        },
        "application/vnd.xmpie.xlim": {
          "source": "iana"
        },
        "application/vnd.yamaha.hv-dic": {
          "source": "iana",
          "extensions": ["hvd"]
        },
        "application/vnd.yamaha.hv-script": {
          "source": "iana",
          "extensions": ["hvs"]
        },
        "application/vnd.yamaha.hv-voice": {
          "source": "iana",
          "extensions": ["hvp"]
        },
        "application/vnd.yamaha.openscoreformat": {
          "source": "iana",
          "extensions": ["osf"]
        },
        "application/vnd.yamaha.openscoreformat.osfpvg+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["osfpvg"]
        },
        "application/vnd.yamaha.remote-setup": {
          "source": "iana"
        },
        "application/vnd.yamaha.smaf-audio": {
          "source": "iana",
          "extensions": ["saf"]
        },
        "application/vnd.yamaha.smaf-phrase": {
          "source": "iana",
          "extensions": ["spf"]
        },
        "application/vnd.yamaha.through-ngn": {
          "source": "iana"
        },
        "application/vnd.yamaha.tunnel-udpencap": {
          "source": "iana"
        },
        "application/vnd.yaoweme": {
          "source": "iana"
        },
        "application/vnd.yellowriver-custom-menu": {
          "source": "iana",
          "extensions": ["cmp"]
        },
        "application/vnd.youtube.yt": {
          "source": "iana"
        },
        "application/vnd.zul": {
          "source": "iana",
          "extensions": ["zir", "zirz"]
        },
        "application/vnd.zzazz.deck+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["zaz"]
        },
        "application/voicexml+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["vxml"]
        },
        "application/voucher-cms+json": {
          "source": "iana",
          "compressible": true
        },
        "application/vq-rtcpxr": {
          "source": "iana"
        },
        "application/wasm": {
          "compressible": true,
          "extensions": ["wasm"]
        },
        "application/watcherinfo+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/webpush-options+json": {
          "source": "iana",
          "compressible": true
        },
        "application/whoispp-query": {
          "source": "iana"
        },
        "application/whoispp-response": {
          "source": "iana"
        },
        "application/widget": {
          "source": "iana",
          "extensions": ["wgt"]
        },
        "application/winhlp": {
          "source": "apache",
          "extensions": ["hlp"]
        },
        "application/wita": {
          "source": "iana"
        },
        "application/wordperfect5.1": {
          "source": "iana"
        },
        "application/wsdl+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["wsdl"]
        },
        "application/wspolicy+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["wspolicy"]
        },
        "application/x-7z-compressed": {
          "source": "apache",
          "compressible": false,
          "extensions": ["7z"]
        },
        "application/x-abiword": {
          "source": "apache",
          "extensions": ["abw"]
        },
        "application/x-ace-compressed": {
          "source": "apache",
          "extensions": ["ace"]
        },
        "application/x-amf": {
          "source": "apache"
        },
        "application/x-apple-diskimage": {
          "source": "apache",
          "extensions": ["dmg"]
        },
        "application/x-arj": {
          "compressible": false,
          "extensions": ["arj"]
        },
        "application/x-authorware-bin": {
          "source": "apache",
          "extensions": ["aab", "x32", "u32", "vox"]
        },
        "application/x-authorware-map": {
          "source": "apache",
          "extensions": ["aam"]
        },
        "application/x-authorware-seg": {
          "source": "apache",
          "extensions": ["aas"]
        },
        "application/x-bcpio": {
          "source": "apache",
          "extensions": ["bcpio"]
        },
        "application/x-bdoc": {
          "compressible": false,
          "extensions": ["bdoc"]
        },
        "application/x-bittorrent": {
          "source": "apache",
          "extensions": ["torrent"]
        },
        "application/x-blorb": {
          "source": "apache",
          "extensions": ["blb", "blorb"]
        },
        "application/x-bzip": {
          "source": "apache",
          "compressible": false,
          "extensions": ["bz"]
        },
        "application/x-bzip2": {
          "source": "apache",
          "compressible": false,
          "extensions": ["bz2", "boz"]
        },
        "application/x-cbr": {
          "source": "apache",
          "extensions": ["cbr", "cba", "cbt", "cbz", "cb7"]
        },
        "application/x-cdlink": {
          "source": "apache",
          "extensions": ["vcd"]
        },
        "application/x-cfs-compressed": {
          "source": "apache",
          "extensions": ["cfs"]
        },
        "application/x-chat": {
          "source": "apache",
          "extensions": ["chat"]
        },
        "application/x-chess-pgn": {
          "source": "apache",
          "extensions": ["pgn"]
        },
        "application/x-chrome-extension": {
          "extensions": ["crx"]
        },
        "application/x-cocoa": {
          "source": "nginx",
          "extensions": ["cco"]
        },
        "application/x-compress": {
          "source": "apache"
        },
        "application/x-conference": {
          "source": "apache",
          "extensions": ["nsc"]
        },
        "application/x-cpio": {
          "source": "apache",
          "extensions": ["cpio"]
        },
        "application/x-csh": {
          "source": "apache",
          "extensions": ["csh"]
        },
        "application/x-deb": {
          "compressible": false
        },
        "application/x-debian-package": {
          "source": "apache",
          "extensions": ["deb", "udeb"]
        },
        "application/x-dgc-compressed": {
          "source": "apache",
          "extensions": ["dgc"]
        },
        "application/x-director": {
          "source": "apache",
          "extensions": ["dir", "dcr", "dxr", "cst", "cct", "cxt", "w3d", "fgd", "swa"]
        },
        "application/x-doom": {
          "source": "apache",
          "extensions": ["wad"]
        },
        "application/x-dtbncx+xml": {
          "source": "apache",
          "compressible": true,
          "extensions": ["ncx"]
        },
        "application/x-dtbook+xml": {
          "source": "apache",
          "compressible": true,
          "extensions": ["dtb"]
        },
        "application/x-dtbresource+xml": {
          "source": "apache",
          "compressible": true,
          "extensions": ["res"]
        },
        "application/x-dvi": {
          "source": "apache",
          "compressible": false,
          "extensions": ["dvi"]
        },
        "application/x-envoy": {
          "source": "apache",
          "extensions": ["evy"]
        },
        "application/x-eva": {
          "source": "apache",
          "extensions": ["eva"]
        },
        "application/x-font-bdf": {
          "source": "apache",
          "extensions": ["bdf"]
        },
        "application/x-font-dos": {
          "source": "apache"
        },
        "application/x-font-framemaker": {
          "source": "apache"
        },
        "application/x-font-ghostscript": {
          "source": "apache",
          "extensions": ["gsf"]
        },
        "application/x-font-libgrx": {
          "source": "apache"
        },
        "application/x-font-linux-psf": {
          "source": "apache",
          "extensions": ["psf"]
        },
        "application/x-font-pcf": {
          "source": "apache",
          "extensions": ["pcf"]
        },
        "application/x-font-snf": {
          "source": "apache",
          "extensions": ["snf"]
        },
        "application/x-font-speedo": {
          "source": "apache"
        },
        "application/x-font-sunos-news": {
          "source": "apache"
        },
        "application/x-font-type1": {
          "source": "apache",
          "extensions": ["pfa", "pfb", "pfm", "afm"]
        },
        "application/x-font-vfont": {
          "source": "apache"
        },
        "application/x-freearc": {
          "source": "apache",
          "extensions": ["arc"]
        },
        "application/x-futuresplash": {
          "source": "apache",
          "extensions": ["spl"]
        },
        "application/x-gca-compressed": {
          "source": "apache",
          "extensions": ["gca"]
        },
        "application/x-glulx": {
          "source": "apache",
          "extensions": ["ulx"]
        },
        "application/x-gnumeric": {
          "source": "apache",
          "extensions": ["gnumeric"]
        },
        "application/x-gramps-xml": {
          "source": "apache",
          "extensions": ["gramps"]
        },
        "application/x-gtar": {
          "source": "apache",
          "extensions": ["gtar"]
        },
        "application/x-gzip": {
          "source": "apache"
        },
        "application/x-hdf": {
          "source": "apache",
          "extensions": ["hdf"]
        },
        "application/x-httpd-php": {
          "compressible": true,
          "extensions": ["php"]
        },
        "application/x-install-instructions": {
          "source": "apache",
          "extensions": ["install"]
        },
        "application/x-iso9660-image": {
          "source": "apache",
          "extensions": ["iso"]
        },
        "application/x-java-archive-diff": {
          "source": "nginx",
          "extensions": ["jardiff"]
        },
        "application/x-java-jnlp-file": {
          "source": "apache",
          "compressible": false,
          "extensions": ["jnlp"]
        },
        "application/x-javascript": {
          "compressible": true
        },
        "application/x-keepass2": {
          "extensions": ["kdbx"]
        },
        "application/x-latex": {
          "source": "apache",
          "compressible": false,
          "extensions": ["latex"]
        },
        "application/x-lua-bytecode": {
          "extensions": ["luac"]
        },
        "application/x-lzh-compressed": {
          "source": "apache",
          "extensions": ["lzh", "lha"]
        },
        "application/x-makeself": {
          "source": "nginx",
          "extensions": ["run"]
        },
        "application/x-mie": {
          "source": "apache",
          "extensions": ["mie"]
        },
        "application/x-mobipocket-ebook": {
          "source": "apache",
          "extensions": ["prc", "mobi"]
        },
        "application/x-mpegurl": {
          "compressible": false
        },
        "application/x-ms-application": {
          "source": "apache",
          "extensions": ["application"]
        },
        "application/x-ms-shortcut": {
          "source": "apache",
          "extensions": ["lnk"]
        },
        "application/x-ms-wmd": {
          "source": "apache",
          "extensions": ["wmd"]
        },
        "application/x-ms-wmz": {
          "source": "apache",
          "extensions": ["wmz"]
        },
        "application/x-ms-xbap": {
          "source": "apache",
          "extensions": ["xbap"]
        },
        "application/x-msaccess": {
          "source": "apache",
          "extensions": ["mdb"]
        },
        "application/x-msbinder": {
          "source": "apache",
          "extensions": ["obd"]
        },
        "application/x-mscardfile": {
          "source": "apache",
          "extensions": ["crd"]
        },
        "application/x-msclip": {
          "source": "apache",
          "extensions": ["clp"]
        },
        "application/x-msdos-program": {
          "extensions": ["exe"]
        },
        "application/x-msdownload": {
          "source": "apache",
          "extensions": ["exe", "dll", "com", "bat", "msi"]
        },
        "application/x-msmediaview": {
          "source": "apache",
          "extensions": ["mvb", "m13", "m14"]
        },
        "application/x-msmetafile": {
          "source": "apache",
          "extensions": ["wmf", "wmz", "emf", "emz"]
        },
        "application/x-msmoney": {
          "source": "apache",
          "extensions": ["mny"]
        },
        "application/x-mspublisher": {
          "source": "apache",
          "extensions": ["pub"]
        },
        "application/x-msschedule": {
          "source": "apache",
          "extensions": ["scd"]
        },
        "application/x-msterminal": {
          "source": "apache",
          "extensions": ["trm"]
        },
        "application/x-mswrite": {
          "source": "apache",
          "extensions": ["wri"]
        },
        "application/x-netcdf": {
          "source": "apache",
          "extensions": ["nc", "cdf"]
        },
        "application/x-ns-proxy-autoconfig": {
          "compressible": true,
          "extensions": ["pac"]
        },
        "application/x-nzb": {
          "source": "apache",
          "extensions": ["nzb"]
        },
        "application/x-perl": {
          "source": "nginx",
          "extensions": ["pl", "pm"]
        },
        "application/x-pilot": {
          "source": "nginx",
          "extensions": ["prc", "pdb"]
        },
        "application/x-pkcs12": {
          "source": "apache",
          "compressible": false,
          "extensions": ["p12", "pfx"]
        },
        "application/x-pkcs7-certificates": {
          "source": "apache",
          "extensions": ["p7b", "spc"]
        },
        "application/x-pkcs7-certreqresp": {
          "source": "apache",
          "extensions": ["p7r"]
        },
        "application/x-pki-message": {
          "source": "iana"
        },
        "application/x-rar-compressed": {
          "source": "apache",
          "compressible": false,
          "extensions": ["rar"]
        },
        "application/x-redhat-package-manager": {
          "source": "nginx",
          "extensions": ["rpm"]
        },
        "application/x-research-info-systems": {
          "source": "apache",
          "extensions": ["ris"]
        },
        "application/x-sea": {
          "source": "nginx",
          "extensions": ["sea"]
        },
        "application/x-sh": {
          "source": "apache",
          "compressible": true,
          "extensions": ["sh"]
        },
        "application/x-shar": {
          "source": "apache",
          "extensions": ["shar"]
        },
        "application/x-shockwave-flash": {
          "source": "apache",
          "compressible": false,
          "extensions": ["swf"]
        },
        "application/x-silverlight-app": {
          "source": "apache",
          "extensions": ["xap"]
        },
        "application/x-sql": {
          "source": "apache",
          "extensions": ["sql"]
        },
        "application/x-stuffit": {
          "source": "apache",
          "compressible": false,
          "extensions": ["sit"]
        },
        "application/x-stuffitx": {
          "source": "apache",
          "extensions": ["sitx"]
        },
        "application/x-subrip": {
          "source": "apache",
          "extensions": ["srt"]
        },
        "application/x-sv4cpio": {
          "source": "apache",
          "extensions": ["sv4cpio"]
        },
        "application/x-sv4crc": {
          "source": "apache",
          "extensions": ["sv4crc"]
        },
        "application/x-t3vm-image": {
          "source": "apache",
          "extensions": ["t3"]
        },
        "application/x-tads": {
          "source": "apache",
          "extensions": ["gam"]
        },
        "application/x-tar": {
          "source": "apache",
          "compressible": true,
          "extensions": ["tar"]
        },
        "application/x-tcl": {
          "source": "apache",
          "extensions": ["tcl", "tk"]
        },
        "application/x-tex": {
          "source": "apache",
          "extensions": ["tex"]
        },
        "application/x-tex-tfm": {
          "source": "apache",
          "extensions": ["tfm"]
        },
        "application/x-texinfo": {
          "source": "apache",
          "extensions": ["texinfo", "texi"]
        },
        "application/x-tgif": {
          "source": "apache",
          "extensions": ["obj"]
        },
        "application/x-ustar": {
          "source": "apache",
          "extensions": ["ustar"]
        },
        "application/x-virtualbox-hdd": {
          "compressible": true,
          "extensions": ["hdd"]
        },
        "application/x-virtualbox-ova": {
          "compressible": true,
          "extensions": ["ova"]
        },
        "application/x-virtualbox-ovf": {
          "compressible": true,
          "extensions": ["ovf"]
        },
        "application/x-virtualbox-vbox": {
          "compressible": true,
          "extensions": ["vbox"]
        },
        "application/x-virtualbox-vbox-extpack": {
          "compressible": false,
          "extensions": ["vbox-extpack"]
        },
        "application/x-virtualbox-vdi": {
          "compressible": true,
          "extensions": ["vdi"]
        },
        "application/x-virtualbox-vhd": {
          "compressible": true,
          "extensions": ["vhd"]
        },
        "application/x-virtualbox-vmdk": {
          "compressible": true,
          "extensions": ["vmdk"]
        },
        "application/x-wais-source": {
          "source": "apache",
          "extensions": ["src"]
        },
        "application/x-web-app-manifest+json": {
          "compressible": true,
          "extensions": ["webapp"]
        },
        "application/x-www-form-urlencoded": {
          "source": "iana",
          "compressible": true
        },
        "application/x-x509-ca-cert": {
          "source": "iana",
          "extensions": ["der", "crt", "pem"]
        },
        "application/x-x509-ca-ra-cert": {
          "source": "iana"
        },
        "application/x-x509-next-ca-cert": {
          "source": "iana"
        },
        "application/x-xfig": {
          "source": "apache",
          "extensions": ["fig"]
        },
        "application/x-xliff+xml": {
          "source": "apache",
          "compressible": true,
          "extensions": ["xlf"]
        },
        "application/x-xpinstall": {
          "source": "apache",
          "compressible": false,
          "extensions": ["xpi"]
        },
        "application/x-xz": {
          "source": "apache",
          "extensions": ["xz"]
        },
        "application/x-zmachine": {
          "source": "apache",
          "extensions": ["z1", "z2", "z3", "z4", "z5", "z6", "z7", "z8"]
        },
        "application/x400-bp": {
          "source": "iana"
        },
        "application/xacml+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/xaml+xml": {
          "source": "apache",
          "compressible": true,
          "extensions": ["xaml"]
        },
        "application/xcap-att+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["xav"]
        },
        "application/xcap-caps+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["xca"]
        },
        "application/xcap-diff+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["xdf"]
        },
        "application/xcap-el+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["xel"]
        },
        "application/xcap-error+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["xer"]
        },
        "application/xcap-ns+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["xns"]
        },
        "application/xcon-conference-info+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/xcon-conference-info-diff+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/xenc+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["xenc"]
        },
        "application/xhtml+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["xhtml", "xht"]
        },
        "application/xhtml-voice+xml": {
          "source": "apache",
          "compressible": true
        },
        "application/xliff+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["xlf"]
        },
        "application/xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["xml", "xsl", "xsd", "rng"]
        },
        "application/xml-dtd": {
          "source": "iana",
          "compressible": true,
          "extensions": ["dtd"]
        },
        "application/xml-external-parsed-entity": {
          "source": "iana"
        },
        "application/xml-patch+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/xmpp+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/xop+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["xop"]
        },
        "application/xproc+xml": {
          "source": "apache",
          "compressible": true,
          "extensions": ["xpl"]
        },
        "application/xslt+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["xslt"]
        },
        "application/xspf+xml": {
          "source": "apache",
          "compressible": true,
          "extensions": ["xspf"]
        },
        "application/xv+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["mxml", "xhvml", "xvml", "xvm"]
        },
        "application/yang": {
          "source": "iana",
          "extensions": ["yang"]
        },
        "application/yang-data+json": {
          "source": "iana",
          "compressible": true
        },
        "application/yang-data+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/yang-patch+json": {
          "source": "iana",
          "compressible": true
        },
        "application/yang-patch+xml": {
          "source": "iana",
          "compressible": true
        },
        "application/yin+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["yin"]
        },
        "application/zip": {
          "source": "iana",
          "compressible": false,
          "extensions": ["zip"]
        },
        "application/zlib": {
          "source": "iana"
        },
        "application/zstd": {
          "source": "iana"
        },
        "audio/1d-interleaved-parityfec": {
          "source": "iana"
        },
        "audio/32kadpcm": {
          "source": "iana"
        },
        "audio/3gpp": {
          "source": "iana",
          "compressible": false,
          "extensions": ["3gpp"]
        },
        "audio/3gpp2": {
          "source": "iana"
        },
        "audio/aac": {
          "source": "iana"
        },
        "audio/ac3": {
          "source": "iana"
        },
        "audio/adpcm": {
          "source": "apache",
          "extensions": ["adp"]
        },
        "audio/amr": {
          "source": "iana"
        },
        "audio/amr-wb": {
          "source": "iana"
        },
        "audio/amr-wb+": {
          "source": "iana"
        },
        "audio/aptx": {
          "source": "iana"
        },
        "audio/asc": {
          "source": "iana"
        },
        "audio/atrac-advanced-lossless": {
          "source": "iana"
        },
        "audio/atrac-x": {
          "source": "iana"
        },
        "audio/atrac3": {
          "source": "iana"
        },
        "audio/basic": {
          "source": "iana",
          "compressible": false,
          "extensions": ["au", "snd"]
        },
        "audio/bv16": {
          "source": "iana"
        },
        "audio/bv32": {
          "source": "iana"
        },
        "audio/clearmode": {
          "source": "iana"
        },
        "audio/cn": {
          "source": "iana"
        },
        "audio/dat12": {
          "source": "iana"
        },
        "audio/dls": {
          "source": "iana"
        },
        "audio/dsr-es201108": {
          "source": "iana"
        },
        "audio/dsr-es202050": {
          "source": "iana"
        },
        "audio/dsr-es202211": {
          "source": "iana"
        },
        "audio/dsr-es202212": {
          "source": "iana"
        },
        "audio/dv": {
          "source": "iana"
        },
        "audio/dvi4": {
          "source": "iana"
        },
        "audio/eac3": {
          "source": "iana"
        },
        "audio/encaprtp": {
          "source": "iana"
        },
        "audio/evrc": {
          "source": "iana"
        },
        "audio/evrc-qcp": {
          "source": "iana"
        },
        "audio/evrc0": {
          "source": "iana"
        },
        "audio/evrc1": {
          "source": "iana"
        },
        "audio/evrcb": {
          "source": "iana"
        },
        "audio/evrcb0": {
          "source": "iana"
        },
        "audio/evrcb1": {
          "source": "iana"
        },
        "audio/evrcnw": {
          "source": "iana"
        },
        "audio/evrcnw0": {
          "source": "iana"
        },
        "audio/evrcnw1": {
          "source": "iana"
        },
        "audio/evrcwb": {
          "source": "iana"
        },
        "audio/evrcwb0": {
          "source": "iana"
        },
        "audio/evrcwb1": {
          "source": "iana"
        },
        "audio/evs": {
          "source": "iana"
        },
        "audio/flexfec": {
          "source": "iana"
        },
        "audio/fwdred": {
          "source": "iana"
        },
        "audio/g711-0": {
          "source": "iana"
        },
        "audio/g719": {
          "source": "iana"
        },
        "audio/g722": {
          "source": "iana"
        },
        "audio/g7221": {
          "source": "iana"
        },
        "audio/g723": {
          "source": "iana"
        },
        "audio/g726-16": {
          "source": "iana"
        },
        "audio/g726-24": {
          "source": "iana"
        },
        "audio/g726-32": {
          "source": "iana"
        },
        "audio/g726-40": {
          "source": "iana"
        },
        "audio/g728": {
          "source": "iana"
        },
        "audio/g729": {
          "source": "iana"
        },
        "audio/g7291": {
          "source": "iana"
        },
        "audio/g729d": {
          "source": "iana"
        },
        "audio/g729e": {
          "source": "iana"
        },
        "audio/gsm": {
          "source": "iana"
        },
        "audio/gsm-efr": {
          "source": "iana"
        },
        "audio/gsm-hr-08": {
          "source": "iana"
        },
        "audio/ilbc": {
          "source": "iana"
        },
        "audio/ip-mr_v2.5": {
          "source": "iana"
        },
        "audio/isac": {
          "source": "apache"
        },
        "audio/l16": {
          "source": "iana"
        },
        "audio/l20": {
          "source": "iana"
        },
        "audio/l24": {
          "source": "iana",
          "compressible": false
        },
        "audio/l8": {
          "source": "iana"
        },
        "audio/lpc": {
          "source": "iana"
        },
        "audio/melp": {
          "source": "iana"
        },
        "audio/melp1200": {
          "source": "iana"
        },
        "audio/melp2400": {
          "source": "iana"
        },
        "audio/melp600": {
          "source": "iana"
        },
        "audio/mhas": {
          "source": "iana"
        },
        "audio/midi": {
          "source": "apache",
          "extensions": ["mid", "midi", "kar", "rmi"]
        },
        "audio/mobile-xmf": {
          "source": "iana",
          "extensions": ["mxmf"]
        },
        "audio/mp3": {
          "compressible": false,
          "extensions": ["mp3"]
        },
        "audio/mp4": {
          "source": "iana",
          "compressible": false,
          "extensions": ["m4a", "mp4a"]
        },
        "audio/mp4a-latm": {
          "source": "iana"
        },
        "audio/mpa": {
          "source": "iana"
        },
        "audio/mpa-robust": {
          "source": "iana"
        },
        "audio/mpeg": {
          "source": "iana",
          "compressible": false,
          "extensions": ["mpga", "mp2", "mp2a", "mp3", "m2a", "m3a"]
        },
        "audio/mpeg4-generic": {
          "source": "iana"
        },
        "audio/musepack": {
          "source": "apache"
        },
        "audio/ogg": {
          "source": "iana",
          "compressible": false,
          "extensions": ["oga", "ogg", "spx"]
        },
        "audio/opus": {
          "source": "iana"
        },
        "audio/parityfec": {
          "source": "iana"
        },
        "audio/pcma": {
          "source": "iana"
        },
        "audio/pcma-wb": {
          "source": "iana"
        },
        "audio/pcmu": {
          "source": "iana"
        },
        "audio/pcmu-wb": {
          "source": "iana"
        },
        "audio/prs.sid": {
          "source": "iana"
        },
        "audio/qcelp": {
          "source": "iana"
        },
        "audio/raptorfec": {
          "source": "iana"
        },
        "audio/red": {
          "source": "iana"
        },
        "audio/rtp-enc-aescm128": {
          "source": "iana"
        },
        "audio/rtp-midi": {
          "source": "iana"
        },
        "audio/rtploopback": {
          "source": "iana"
        },
        "audio/rtx": {
          "source": "iana"
        },
        "audio/s3m": {
          "source": "apache",
          "extensions": ["s3m"]
        },
        "audio/silk": {
          "source": "apache",
          "extensions": ["sil"]
        },
        "audio/smv": {
          "source": "iana"
        },
        "audio/smv-qcp": {
          "source": "iana"
        },
        "audio/smv0": {
          "source": "iana"
        },
        "audio/sp-midi": {
          "source": "iana"
        },
        "audio/speex": {
          "source": "iana"
        },
        "audio/t140c": {
          "source": "iana"
        },
        "audio/t38": {
          "source": "iana"
        },
        "audio/telephone-event": {
          "source": "iana"
        },
        "audio/tetra_acelp": {
          "source": "iana"
        },
        "audio/tetra_acelp_bb": {
          "source": "iana"
        },
        "audio/tone": {
          "source": "iana"
        },
        "audio/uemclip": {
          "source": "iana"
        },
        "audio/ulpfec": {
          "source": "iana"
        },
        "audio/usac": {
          "source": "iana"
        },
        "audio/vdvi": {
          "source": "iana"
        },
        "audio/vmr-wb": {
          "source": "iana"
        },
        "audio/vnd.3gpp.iufp": {
          "source": "iana"
        },
        "audio/vnd.4sb": {
          "source": "iana"
        },
        "audio/vnd.audiokoz": {
          "source": "iana"
        },
        "audio/vnd.celp": {
          "source": "iana"
        },
        "audio/vnd.cisco.nse": {
          "source": "iana"
        },
        "audio/vnd.cmles.radio-events": {
          "source": "iana"
        },
        "audio/vnd.cns.anp1": {
          "source": "iana"
        },
        "audio/vnd.cns.inf1": {
          "source": "iana"
        },
        "audio/vnd.dece.audio": {
          "source": "iana",
          "extensions": ["uva", "uvva"]
        },
        "audio/vnd.digital-winds": {
          "source": "iana",
          "extensions": ["eol"]
        },
        "audio/vnd.dlna.adts": {
          "source": "iana"
        },
        "audio/vnd.dolby.heaac.1": {
          "source": "iana"
        },
        "audio/vnd.dolby.heaac.2": {
          "source": "iana"
        },
        "audio/vnd.dolby.mlp": {
          "source": "iana"
        },
        "audio/vnd.dolby.mps": {
          "source": "iana"
        },
        "audio/vnd.dolby.pl2": {
          "source": "iana"
        },
        "audio/vnd.dolby.pl2x": {
          "source": "iana"
        },
        "audio/vnd.dolby.pl2z": {
          "source": "iana"
        },
        "audio/vnd.dolby.pulse.1": {
          "source": "iana"
        },
        "audio/vnd.dra": {
          "source": "iana",
          "extensions": ["dra"]
        },
        "audio/vnd.dts": {
          "source": "iana",
          "extensions": ["dts"]
        },
        "audio/vnd.dts.hd": {
          "source": "iana",
          "extensions": ["dtshd"]
        },
        "audio/vnd.dts.uhd": {
          "source": "iana"
        },
        "audio/vnd.dvb.file": {
          "source": "iana"
        },
        "audio/vnd.everad.plj": {
          "source": "iana"
        },
        "audio/vnd.hns.audio": {
          "source": "iana"
        },
        "audio/vnd.lucent.voice": {
          "source": "iana",
          "extensions": ["lvp"]
        },
        "audio/vnd.ms-playready.media.pya": {
          "source": "iana",
          "extensions": ["pya"]
        },
        "audio/vnd.nokia.mobile-xmf": {
          "source": "iana"
        },
        "audio/vnd.nortel.vbk": {
          "source": "iana"
        },
        "audio/vnd.nuera.ecelp4800": {
          "source": "iana",
          "extensions": ["ecelp4800"]
        },
        "audio/vnd.nuera.ecelp7470": {
          "source": "iana",
          "extensions": ["ecelp7470"]
        },
        "audio/vnd.nuera.ecelp9600": {
          "source": "iana",
          "extensions": ["ecelp9600"]
        },
        "audio/vnd.octel.sbc": {
          "source": "iana"
        },
        "audio/vnd.presonus.multitrack": {
          "source": "iana"
        },
        "audio/vnd.qcelp": {
          "source": "iana"
        },
        "audio/vnd.rhetorex.32kadpcm": {
          "source": "iana"
        },
        "audio/vnd.rip": {
          "source": "iana",
          "extensions": ["rip"]
        },
        "audio/vnd.rn-realaudio": {
          "compressible": false
        },
        "audio/vnd.sealedmedia.softseal.mpeg": {
          "source": "iana"
        },
        "audio/vnd.vmx.cvsd": {
          "source": "iana"
        },
        "audio/vnd.wave": {
          "compressible": false
        },
        "audio/vorbis": {
          "source": "iana",
          "compressible": false
        },
        "audio/vorbis-config": {
          "source": "iana"
        },
        "audio/wav": {
          "compressible": false,
          "extensions": ["wav"]
        },
        "audio/wave": {
          "compressible": false,
          "extensions": ["wav"]
        },
        "audio/webm": {
          "source": "apache",
          "compressible": false,
          "extensions": ["weba"]
        },
        "audio/x-aac": {
          "source": "apache",
          "compressible": false,
          "extensions": ["aac"]
        },
        "audio/x-aiff": {
          "source": "apache",
          "extensions": ["aif", "aiff", "aifc"]
        },
        "audio/x-caf": {
          "source": "apache",
          "compressible": false,
          "extensions": ["caf"]
        },
        "audio/x-flac": {
          "source": "apache",
          "extensions": ["flac"]
        },
        "audio/x-m4a": {
          "source": "nginx",
          "extensions": ["m4a"]
        },
        "audio/x-matroska": {
          "source": "apache",
          "extensions": ["mka"]
        },
        "audio/x-mpegurl": {
          "source": "apache",
          "extensions": ["m3u"]
        },
        "audio/x-ms-wax": {
          "source": "apache",
          "extensions": ["wax"]
        },
        "audio/x-ms-wma": {
          "source": "apache",
          "extensions": ["wma"]
        },
        "audio/x-pn-realaudio": {
          "source": "apache",
          "extensions": ["ram", "ra"]
        },
        "audio/x-pn-realaudio-plugin": {
          "source": "apache",
          "extensions": ["rmp"]
        },
        "audio/x-realaudio": {
          "source": "nginx",
          "extensions": ["ra"]
        },
        "audio/x-tta": {
          "source": "apache"
        },
        "audio/x-wav": {
          "source": "apache",
          "extensions": ["wav"]
        },
        "audio/xm": {
          "source": "apache",
          "extensions": ["xm"]
        },
        "chemical/x-cdx": {
          "source": "apache",
          "extensions": ["cdx"]
        },
        "chemical/x-cif": {
          "source": "apache",
          "extensions": ["cif"]
        },
        "chemical/x-cmdf": {
          "source": "apache",
          "extensions": ["cmdf"]
        },
        "chemical/x-cml": {
          "source": "apache",
          "extensions": ["cml"]
        },
        "chemical/x-csml": {
          "source": "apache",
          "extensions": ["csml"]
        },
        "chemical/x-pdb": {
          "source": "apache"
        },
        "chemical/x-xyz": {
          "source": "apache",
          "extensions": ["xyz"]
        },
        "font/collection": {
          "source": "iana",
          "extensions": ["ttc"]
        },
        "font/otf": {
          "source": "iana",
          "compressible": true,
          "extensions": ["otf"]
        },
        "font/sfnt": {
          "source": "iana"
        },
        "font/ttf": {
          "source": "iana",
          "compressible": true,
          "extensions": ["ttf"]
        },
        "font/woff": {
          "source": "iana",
          "extensions": ["woff"]
        },
        "font/woff2": {
          "source": "iana",
          "extensions": ["woff2"]
        },
        "image/aces": {
          "source": "iana",
          "extensions": ["exr"]
        },
        "image/apng": {
          "compressible": false,
          "extensions": ["apng"]
        },
        "image/avci": {
          "source": "iana"
        },
        "image/avcs": {
          "source": "iana"
        },
        "image/bmp": {
          "source": "iana",
          "compressible": true,
          "extensions": ["bmp"]
        },
        "image/cgm": {
          "source": "iana",
          "extensions": ["cgm"]
        },
        "image/dicom-rle": {
          "source": "iana",
          "extensions": ["drle"]
        },
        "image/emf": {
          "source": "iana",
          "extensions": ["emf"]
        },
        "image/fits": {
          "source": "iana",
          "extensions": ["fits"]
        },
        "image/g3fax": {
          "source": "iana",
          "extensions": ["g3"]
        },
        "image/gif": {
          "source": "iana",
          "compressible": false,
          "extensions": ["gif"]
        },
        "image/heic": {
          "source": "iana",
          "extensions": ["heic"]
        },
        "image/heic-sequence": {
          "source": "iana",
          "extensions": ["heics"]
        },
        "image/heif": {
          "source": "iana",
          "extensions": ["heif"]
        },
        "image/heif-sequence": {
          "source": "iana",
          "extensions": ["heifs"]
        },
        "image/hej2k": {
          "source": "iana",
          "extensions": ["hej2"]
        },
        "image/hsj2": {
          "source": "iana",
          "extensions": ["hsj2"]
        },
        "image/ief": {
          "source": "iana",
          "extensions": ["ief"]
        },
        "image/jls": {
          "source": "iana",
          "extensions": ["jls"]
        },
        "image/jp2": {
          "source": "iana",
          "compressible": false,
          "extensions": ["jp2", "jpg2"]
        },
        "image/jpeg": {
          "source": "iana",
          "compressible": false,
          "extensions": ["jpeg", "jpg", "jpe"]
        },
        "image/jph": {
          "source": "iana",
          "extensions": ["jph"]
        },
        "image/jphc": {
          "source": "iana",
          "extensions": ["jhc"]
        },
        "image/jpm": {
          "source": "iana",
          "compressible": false,
          "extensions": ["jpm"]
        },
        "image/jpx": {
          "source": "iana",
          "compressible": false,
          "extensions": ["jpx", "jpf"]
        },
        "image/jxr": {
          "source": "iana",
          "extensions": ["jxr"]
        },
        "image/jxra": {
          "source": "iana",
          "extensions": ["jxra"]
        },
        "image/jxrs": {
          "source": "iana",
          "extensions": ["jxrs"]
        },
        "image/jxs": {
          "source": "iana",
          "extensions": ["jxs"]
        },
        "image/jxsc": {
          "source": "iana",
          "extensions": ["jxsc"]
        },
        "image/jxsi": {
          "source": "iana",
          "extensions": ["jxsi"]
        },
        "image/jxss": {
          "source": "iana",
          "extensions": ["jxss"]
        },
        "image/ktx": {
          "source": "iana",
          "extensions": ["ktx"]
        },
        "image/naplps": {
          "source": "iana"
        },
        "image/pjpeg": {
          "compressible": false
        },
        "image/png": {
          "source": "iana",
          "compressible": false,
          "extensions": ["png"]
        },
        "image/prs.btif": {
          "source": "iana",
          "extensions": ["btif"]
        },
        "image/prs.pti": {
          "source": "iana",
          "extensions": ["pti"]
        },
        "image/pwg-raster": {
          "source": "iana"
        },
        "image/sgi": {
          "source": "apache",
          "extensions": ["sgi"]
        },
        "image/svg+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["svg", "svgz"]
        },
        "image/t38": {
          "source": "iana",
          "extensions": ["t38"]
        },
        "image/tiff": {
          "source": "iana",
          "compressible": false,
          "extensions": ["tif", "tiff"]
        },
        "image/tiff-fx": {
          "source": "iana",
          "extensions": ["tfx"]
        },
        "image/vnd.adobe.photoshop": {
          "source": "iana",
          "compressible": true,
          "extensions": ["psd"]
        },
        "image/vnd.airzip.accelerator.azv": {
          "source": "iana",
          "extensions": ["azv"]
        },
        "image/vnd.cns.inf2": {
          "source": "iana"
        },
        "image/vnd.dece.graphic": {
          "source": "iana",
          "extensions": ["uvi", "uvvi", "uvg", "uvvg"]
        },
        "image/vnd.djvu": {
          "source": "iana",
          "extensions": ["djvu", "djv"]
        },
        "image/vnd.dvb.subtitle": {
          "source": "iana",
          "extensions": ["sub"]
        },
        "image/vnd.dwg": {
          "source": "iana",
          "extensions": ["dwg"]
        },
        "image/vnd.dxf": {
          "source": "iana",
          "extensions": ["dxf"]
        },
        "image/vnd.fastbidsheet": {
          "source": "iana",
          "extensions": ["fbs"]
        },
        "image/vnd.fpx": {
          "source": "iana",
          "extensions": ["fpx"]
        },
        "image/vnd.fst": {
          "source": "iana",
          "extensions": ["fst"]
        },
        "image/vnd.fujixerox.edmics-mmr": {
          "source": "iana",
          "extensions": ["mmr"]
        },
        "image/vnd.fujixerox.edmics-rlc": {
          "source": "iana",
          "extensions": ["rlc"]
        },
        "image/vnd.globalgraphics.pgb": {
          "source": "iana"
        },
        "image/vnd.microsoft.icon": {
          "source": "iana",
          "extensions": ["ico"]
        },
        "image/vnd.mix": {
          "source": "iana"
        },
        "image/vnd.mozilla.apng": {
          "source": "iana"
        },
        "image/vnd.ms-dds": {
          "extensions": ["dds"]
        },
        "image/vnd.ms-modi": {
          "source": "iana",
          "extensions": ["mdi"]
        },
        "image/vnd.ms-photo": {
          "source": "apache",
          "extensions": ["wdp"]
        },
        "image/vnd.net-fpx": {
          "source": "iana",
          "extensions": ["npx"]
        },
        "image/vnd.radiance": {
          "source": "iana"
        },
        "image/vnd.sealed.png": {
          "source": "iana"
        },
        "image/vnd.sealedmedia.softseal.gif": {
          "source": "iana"
        },
        "image/vnd.sealedmedia.softseal.jpg": {
          "source": "iana"
        },
        "image/vnd.svf": {
          "source": "iana"
        },
        "image/vnd.tencent.tap": {
          "source": "iana",
          "extensions": ["tap"]
        },
        "image/vnd.valve.source.texture": {
          "source": "iana",
          "extensions": ["vtf"]
        },
        "image/vnd.wap.wbmp": {
          "source": "iana",
          "extensions": ["wbmp"]
        },
        "image/vnd.xiff": {
          "source": "iana",
          "extensions": ["xif"]
        },
        "image/vnd.zbrush.pcx": {
          "source": "iana",
          "extensions": ["pcx"]
        },
        "image/webp": {
          "source": "apache",
          "extensions": ["webp"]
        },
        "image/wmf": {
          "source": "iana",
          "extensions": ["wmf"]
        },
        "image/x-3ds": {
          "source": "apache",
          "extensions": ["3ds"]
        },
        "image/x-cmu-raster": {
          "source": "apache",
          "extensions": ["ras"]
        },
        "image/x-cmx": {
          "source": "apache",
          "extensions": ["cmx"]
        },
        "image/x-freehand": {
          "source": "apache",
          "extensions": ["fh", "fhc", "fh4", "fh5", "fh7"]
        },
        "image/x-icon": {
          "source": "apache",
          "compressible": true,
          "extensions": ["ico"]
        },
        "image/x-jng": {
          "source": "nginx",
          "extensions": ["jng"]
        },
        "image/x-mrsid-image": {
          "source": "apache",
          "extensions": ["sid"]
        },
        "image/x-ms-bmp": {
          "source": "nginx",
          "compressible": true,
          "extensions": ["bmp"]
        },
        "image/x-pcx": {
          "source": "apache",
          "extensions": ["pcx"]
        },
        "image/x-pict": {
          "source": "apache",
          "extensions": ["pic", "pct"]
        },
        "image/x-portable-anymap": {
          "source": "apache",
          "extensions": ["pnm"]
        },
        "image/x-portable-bitmap": {
          "source": "apache",
          "extensions": ["pbm"]
        },
        "image/x-portable-graymap": {
          "source": "apache",
          "extensions": ["pgm"]
        },
        "image/x-portable-pixmap": {
          "source": "apache",
          "extensions": ["ppm"]
        },
        "image/x-rgb": {
          "source": "apache",
          "extensions": ["rgb"]
        },
        "image/x-tga": {
          "source": "apache",
          "extensions": ["tga"]
        },
        "image/x-xbitmap": {
          "source": "apache",
          "extensions": ["xbm"]
        },
        "image/x-xcf": {
          "compressible": false
        },
        "image/x-xpixmap": {
          "source": "apache",
          "extensions": ["xpm"]
        },
        "image/x-xwindowdump": {
          "source": "apache",
          "extensions": ["xwd"]
        },
        "message/cpim": {
          "source": "iana"
        },
        "message/delivery-status": {
          "source": "iana"
        },
        "message/disposition-notification": {
          "source": "iana",
          "extensions": [
            "disposition-notification"
          ]
        },
        "message/external-body": {
          "source": "iana"
        },
        "message/feedback-report": {
          "source": "iana"
        },
        "message/global": {
          "source": "iana",
          "extensions": ["u8msg"]
        },
        "message/global-delivery-status": {
          "source": "iana",
          "extensions": ["u8dsn"]
        },
        "message/global-disposition-notification": {
          "source": "iana",
          "extensions": ["u8mdn"]
        },
        "message/global-headers": {
          "source": "iana",
          "extensions": ["u8hdr"]
        },
        "message/http": {
          "source": "iana",
          "compressible": false
        },
        "message/imdn+xml": {
          "source": "iana",
          "compressible": true
        },
        "message/news": {
          "source": "iana"
        },
        "message/partial": {
          "source": "iana",
          "compressible": false
        },
        "message/rfc822": {
          "source": "iana",
          "compressible": true,
          "extensions": ["eml", "mime"]
        },
        "message/s-http": {
          "source": "iana"
        },
        "message/sip": {
          "source": "iana"
        },
        "message/sipfrag": {
          "source": "iana"
        },
        "message/tracking-status": {
          "source": "iana"
        },
        "message/vnd.si.simp": {
          "source": "iana"
        },
        "message/vnd.wfa.wsc": {
          "source": "iana",
          "extensions": ["wsc"]
        },
        "model/3mf": {
          "source": "iana",
          "extensions": ["3mf"]
        },
        "model/gltf+json": {
          "source": "iana",
          "compressible": true,
          "extensions": ["gltf"]
        },
        "model/gltf-binary": {
          "source": "iana",
          "compressible": true,
          "extensions": ["glb"]
        },
        "model/iges": {
          "source": "iana",
          "compressible": false,
          "extensions": ["igs", "iges"]
        },
        "model/mesh": {
          "source": "iana",
          "compressible": false,
          "extensions": ["msh", "mesh", "silo"]
        },
        "model/mtl": {
          "source": "iana",
          "extensions": ["mtl"]
        },
        "model/obj": {
          "source": "iana",
          "extensions": ["obj"]
        },
        "model/stl": {
          "source": "iana",
          "extensions": ["stl"]
        },
        "model/vnd.collada+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["dae"]
        },
        "model/vnd.dwf": {
          "source": "iana",
          "extensions": ["dwf"]
        },
        "model/vnd.flatland.3dml": {
          "source": "iana"
        },
        "model/vnd.gdl": {
          "source": "iana",
          "extensions": ["gdl"]
        },
        "model/vnd.gs-gdl": {
          "source": "apache"
        },
        "model/vnd.gs.gdl": {
          "source": "iana"
        },
        "model/vnd.gtw": {
          "source": "iana",
          "extensions": ["gtw"]
        },
        "model/vnd.moml+xml": {
          "source": "iana",
          "compressible": true
        },
        "model/vnd.mts": {
          "source": "iana",
          "extensions": ["mts"]
        },
        "model/vnd.opengex": {
          "source": "iana",
          "extensions": ["ogex"]
        },
        "model/vnd.parasolid.transmit.binary": {
          "source": "iana",
          "extensions": ["x_b"]
        },
        "model/vnd.parasolid.transmit.text": {
          "source": "iana",
          "extensions": ["x_t"]
        },
        "model/vnd.rosette.annotated-data-model": {
          "source": "iana"
        },
        "model/vnd.usdz+zip": {
          "source": "iana",
          "compressible": false,
          "extensions": ["usdz"]
        },
        "model/vnd.valve.source.compiled-map": {
          "source": "iana",
          "extensions": ["bsp"]
        },
        "model/vnd.vtu": {
          "source": "iana",
          "extensions": ["vtu"]
        },
        "model/vrml": {
          "source": "iana",
          "compressible": false,
          "extensions": ["wrl", "vrml"]
        },
        "model/x3d+binary": {
          "source": "apache",
          "compressible": false,
          "extensions": ["x3db", "x3dbz"]
        },
        "model/x3d+fastinfoset": {
          "source": "iana",
          "extensions": ["x3db"]
        },
        "model/x3d+vrml": {
          "source": "apache",
          "compressible": false,
          "extensions": ["x3dv", "x3dvz"]
        },
        "model/x3d+xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["x3d", "x3dz"]
        },
        "model/x3d-vrml": {
          "source": "iana",
          "extensions": ["x3dv"]
        },
        "multipart/alternative": {
          "source": "iana",
          "compressible": false
        },
        "multipart/appledouble": {
          "source": "iana"
        },
        "multipart/byteranges": {
          "source": "iana"
        },
        "multipart/digest": {
          "source": "iana"
        },
        "multipart/encrypted": {
          "source": "iana",
          "compressible": false
        },
        "multipart/form-data": {
          "source": "iana",
          "compressible": false
        },
        "multipart/header-set": {
          "source": "iana"
        },
        "multipart/mixed": {
          "source": "iana"
        },
        "multipart/multilingual": {
          "source": "iana"
        },
        "multipart/parallel": {
          "source": "iana"
        },
        "multipart/related": {
          "source": "iana",
          "compressible": false
        },
        "multipart/report": {
          "source": "iana"
        },
        "multipart/signed": {
          "source": "iana",
          "compressible": false
        },
        "multipart/vnd.bint.med-plus": {
          "source": "iana"
        },
        "multipart/voice-message": {
          "source": "iana"
        },
        "multipart/x-mixed-replace": {
          "source": "iana"
        },
        "text/1d-interleaved-parityfec": {
          "source": "iana"
        },
        "text/cache-manifest": {
          "source": "iana",
          "compressible": true,
          "extensions": ["appcache", "manifest"]
        },
        "text/calendar": {
          "source": "iana",
          "extensions": ["ics", "ifb"]
        },
        "text/calender": {
          "compressible": true
        },
        "text/cmd": {
          "compressible": true
        },
        "text/coffeescript": {
          "extensions": ["coffee", "litcoffee"]
        },
        "text/css": {
          "source": "iana",
          "charset": "UTF-8",
          "compressible": true,
          "extensions": ["css"]
        },
        "text/csv": {
          "source": "iana",
          "compressible": true,
          "extensions": ["csv"]
        },
        "text/csv-schema": {
          "source": "iana"
        },
        "text/directory": {
          "source": "iana"
        },
        "text/dns": {
          "source": "iana"
        },
        "text/ecmascript": {
          "source": "iana"
        },
        "text/encaprtp": {
          "source": "iana"
        },
        "text/enriched": {
          "source": "iana"
        },
        "text/flexfec": {
          "source": "iana"
        },
        "text/fwdred": {
          "source": "iana"
        },
        "text/grammar-ref-list": {
          "source": "iana"
        },
        "text/html": {
          "source": "iana",
          "compressible": true,
          "extensions": ["html", "htm", "shtml"]
        },
        "text/jade": {
          "extensions": ["jade"]
        },
        "text/javascript": {
          "source": "iana",
          "compressible": true
        },
        "text/jcr-cnd": {
          "source": "iana"
        },
        "text/jsx": {
          "compressible": true,
          "extensions": ["jsx"]
        },
        "text/less": {
          "compressible": true,
          "extensions": ["less"]
        },
        "text/markdown": {
          "source": "iana",
          "compressible": true,
          "extensions": ["markdown", "md"]
        },
        "text/mathml": {
          "source": "nginx",
          "extensions": ["mml"]
        },
        "text/mdx": {
          "compressible": true,
          "extensions": ["mdx"]
        },
        "text/mizar": {
          "source": "iana"
        },
        "text/n3": {
          "source": "iana",
          "charset": "UTF-8",
          "compressible": true,
          "extensions": ["n3"]
        },
        "text/parameters": {
          "source": "iana",
          "charset": "UTF-8"
        },
        "text/parityfec": {
          "source": "iana"
        },
        "text/plain": {
          "source": "iana",
          "compressible": true,
          "extensions": ["txt", "text", "conf", "def", "list", "log", "in", "ini"]
        },
        "text/provenance-notation": {
          "source": "iana",
          "charset": "UTF-8"
        },
        "text/prs.fallenstein.rst": {
          "source": "iana"
        },
        "text/prs.lines.tag": {
          "source": "iana",
          "extensions": ["dsc"]
        },
        "text/prs.prop.logic": {
          "source": "iana"
        },
        "text/raptorfec": {
          "source": "iana"
        },
        "text/red": {
          "source": "iana"
        },
        "text/rfc822-headers": {
          "source": "iana"
        },
        "text/richtext": {
          "source": "iana",
          "compressible": true,
          "extensions": ["rtx"]
        },
        "text/rtf": {
          "source": "iana",
          "compressible": true,
          "extensions": ["rtf"]
        },
        "text/rtp-enc-aescm128": {
          "source": "iana"
        },
        "text/rtploopback": {
          "source": "iana"
        },
        "text/rtx": {
          "source": "iana"
        },
        "text/sgml": {
          "source": "iana",
          "extensions": ["sgml", "sgm"]
        },
        "text/shex": {
          "extensions": ["shex"]
        },
        "text/slim": {
          "extensions": ["slim", "slm"]
        },
        "text/strings": {
          "source": "iana"
        },
        "text/stylus": {
          "extensions": ["stylus", "styl"]
        },
        "text/t140": {
          "source": "iana"
        },
        "text/tab-separated-values": {
          "source": "iana",
          "compressible": true,
          "extensions": ["tsv"]
        },
        "text/troff": {
          "source": "iana",
          "extensions": ["t", "tr", "roff", "man", "me", "ms"]
        },
        "text/turtle": {
          "source": "iana",
          "charset": "UTF-8",
          "extensions": ["ttl"]
        },
        "text/ulpfec": {
          "source": "iana"
        },
        "text/uri-list": {
          "source": "iana",
          "compressible": true,
          "extensions": ["uri", "uris", "urls"]
        },
        "text/vcard": {
          "source": "iana",
          "compressible": true,
          "extensions": ["vcard"]
        },
        "text/vnd.a": {
          "source": "iana"
        },
        "text/vnd.abc": {
          "source": "iana"
        },
        "text/vnd.ascii-art": {
          "source": "iana"
        },
        "text/vnd.curl": {
          "source": "iana",
          "extensions": ["curl"]
        },
        "text/vnd.curl.dcurl": {
          "source": "apache",
          "extensions": ["dcurl"]
        },
        "text/vnd.curl.mcurl": {
          "source": "apache",
          "extensions": ["mcurl"]
        },
        "text/vnd.curl.scurl": {
          "source": "apache",
          "extensions": ["scurl"]
        },
        "text/vnd.debian.copyright": {
          "source": "iana",
          "charset": "UTF-8"
        },
        "text/vnd.dmclientscript": {
          "source": "iana"
        },
        "text/vnd.dvb.subtitle": {
          "source": "iana",
          "extensions": ["sub"]
        },
        "text/vnd.esmertec.theme-descriptor": {
          "source": "iana",
          "charset": "UTF-8"
        },
        "text/vnd.ficlab.flt": {
          "source": "iana"
        },
        "text/vnd.fly": {
          "source": "iana",
          "extensions": ["fly"]
        },
        "text/vnd.fmi.flexstor": {
          "source": "iana",
          "extensions": ["flx"]
        },
        "text/vnd.gml": {
          "source": "iana"
        },
        "text/vnd.graphviz": {
          "source": "iana",
          "extensions": ["gv"]
        },
        "text/vnd.hgl": {
          "source": "iana"
        },
        "text/vnd.in3d.3dml": {
          "source": "iana",
          "extensions": ["3dml"]
        },
        "text/vnd.in3d.spot": {
          "source": "iana",
          "extensions": ["spot"]
        },
        "text/vnd.iptc.newsml": {
          "source": "iana"
        },
        "text/vnd.iptc.nitf": {
          "source": "iana"
        },
        "text/vnd.latex-z": {
          "source": "iana"
        },
        "text/vnd.motorola.reflex": {
          "source": "iana"
        },
        "text/vnd.ms-mediapackage": {
          "source": "iana"
        },
        "text/vnd.net2phone.commcenter.command": {
          "source": "iana"
        },
        "text/vnd.radisys.msml-basic-layout": {
          "source": "iana"
        },
        "text/vnd.senx.warpscript": {
          "source": "iana"
        },
        "text/vnd.si.uricatalogue": {
          "source": "iana"
        },
        "text/vnd.sosi": {
          "source": "iana"
        },
        "text/vnd.sun.j2me.app-descriptor": {
          "source": "iana",
          "charset": "UTF-8",
          "extensions": ["jad"]
        },
        "text/vnd.trolltech.linguist": {
          "source": "iana",
          "charset": "UTF-8"
        },
        "text/vnd.wap.si": {
          "source": "iana"
        },
        "text/vnd.wap.sl": {
          "source": "iana"
        },
        "text/vnd.wap.wml": {
          "source": "iana",
          "extensions": ["wml"]
        },
        "text/vnd.wap.wmlscript": {
          "source": "iana",
          "extensions": ["wmls"]
        },
        "text/vtt": {
          "source": "iana",
          "charset": "UTF-8",
          "compressible": true,
          "extensions": ["vtt"]
        },
        "text/x-asm": {
          "source": "apache",
          "extensions": ["s", "asm"]
        },
        "text/x-c": {
          "source": "apache",
          "extensions": ["c", "cc", "cxx", "cpp", "h", "hh", "dic"]
        },
        "text/x-component": {
          "source": "nginx",
          "extensions": ["htc"]
        },
        "text/x-fortran": {
          "source": "apache",
          "extensions": ["f", "for", "f77", "f90"]
        },
        "text/x-gwt-rpc": {
          "compressible": true
        },
        "text/x-handlebars-template": {
          "extensions": ["hbs"]
        },
        "text/x-java-source": {
          "source": "apache",
          "extensions": ["java"]
        },
        "text/x-jquery-tmpl": {
          "compressible": true
        },
        "text/x-lua": {
          "extensions": ["lua"]
        },
        "text/x-markdown": {
          "compressible": true,
          "extensions": ["mkd"]
        },
        "text/x-nfo": {
          "source": "apache",
          "extensions": ["nfo"]
        },
        "text/x-opml": {
          "source": "apache",
          "extensions": ["opml"]
        },
        "text/x-org": {
          "compressible": true,
          "extensions": ["org"]
        },
        "text/x-pascal": {
          "source": "apache",
          "extensions": ["p", "pas"]
        },
        "text/x-processing": {
          "compressible": true,
          "extensions": ["pde"]
        },
        "text/x-sass": {
          "extensions": ["sass"]
        },
        "text/x-scss": {
          "extensions": ["scss"]
        },
        "text/x-setext": {
          "source": "apache",
          "extensions": ["etx"]
        },
        "text/x-sfv": {
          "source": "apache",
          "extensions": ["sfv"]
        },
        "text/x-suse-ymp": {
          "compressible": true,
          "extensions": ["ymp"]
        },
        "text/x-uuencode": {
          "source": "apache",
          "extensions": ["uu"]
        },
        "text/x-vcalendar": {
          "source": "apache",
          "extensions": ["vcs"]
        },
        "text/x-vcard": {
          "source": "apache",
          "extensions": ["vcf"]
        },
        "text/xml": {
          "source": "iana",
          "compressible": true,
          "extensions": ["xml"]
        },
        "text/xml-external-parsed-entity": {
          "source": "iana"
        },
        "text/yaml": {
          "extensions": ["yaml", "yml"]
        },
        "video/1d-interleaved-parityfec": {
          "source": "iana"
        },
        "video/3gpp": {
          "source": "iana",
          "extensions": ["3gp", "3gpp"]
        },
        "video/3gpp-tt": {
          "source": "iana"
        },
        "video/3gpp2": {
          "source": "iana",
          "extensions": ["3g2"]
        },
        "video/bmpeg": {
          "source": "iana"
        },
        "video/bt656": {
          "source": "iana"
        },
        "video/celb": {
          "source": "iana"
        },
        "video/dv": {
          "source": "iana"
        },
        "video/encaprtp": {
          "source": "iana"
        },
        "video/flexfec": {
          "source": "iana"
        },
        "video/h261": {
          "source": "iana",
          "extensions": ["h261"]
        },
        "video/h263": {
          "source": "iana",
          "extensions": ["h263"]
        },
        "video/h263-1998": {
          "source": "iana"
        },
        "video/h263-2000": {
          "source": "iana"
        },
        "video/h264": {
          "source": "iana",
          "extensions": ["h264"]
        },
        "video/h264-rcdo": {
          "source": "iana"
        },
        "video/h264-svc": {
          "source": "iana"
        },
        "video/h265": {
          "source": "iana"
        },
        "video/iso.segment": {
          "source": "iana"
        },
        "video/jpeg": {
          "source": "iana",
          "extensions": ["jpgv"]
        },
        "video/jpeg2000": {
          "source": "iana"
        },
        "video/jpm": {
          "source": "apache",
          "extensions": ["jpm", "jpgm"]
        },
        "video/mj2": {
          "source": "iana",
          "extensions": ["mj2", "mjp2"]
        },
        "video/mp1s": {
          "source": "iana"
        },
        "video/mp2p": {
          "source": "iana"
        },
        "video/mp2t": {
          "source": "iana",
          "extensions": ["ts"]
        },
        "video/mp4": {
          "source": "iana",
          "compressible": false,
          "extensions": ["mp4", "mp4v", "mpg4"]
        },
        "video/mp4v-es": {
          "source": "iana"
        },
        "video/mpeg": {
          "source": "iana",
          "compressible": false,
          "extensions": ["mpeg", "mpg", "mpe", "m1v", "m2v"]
        },
        "video/mpeg4-generic": {
          "source": "iana"
        },
        "video/mpv": {
          "source": "iana"
        },
        "video/nv": {
          "source": "iana"
        },
        "video/ogg": {
          "source": "iana",
          "compressible": false,
          "extensions": ["ogv"]
        },
        "video/parityfec": {
          "source": "iana"
        },
        "video/pointer": {
          "source": "iana"
        },
        "video/quicktime": {
          "source": "iana",
          "compressible": false,
          "extensions": ["qt", "mov"]
        },
        "video/raptorfec": {
          "source": "iana"
        },
        "video/raw": {
          "source": "iana"
        },
        "video/rtp-enc-aescm128": {
          "source": "iana"
        },
        "video/rtploopback": {
          "source": "iana"
        },
        "video/rtx": {
          "source": "iana"
        },
        "video/smpte291": {
          "source": "iana"
        },
        "video/smpte292m": {
          "source": "iana"
        },
        "video/ulpfec": {
          "source": "iana"
        },
        "video/vc1": {
          "source": "iana"
        },
        "video/vc2": {
          "source": "iana"
        },
        "video/vnd.cctv": {
          "source": "iana"
        },
        "video/vnd.dece.hd": {
          "source": "iana",
          "extensions": ["uvh", "uvvh"]
        },
        "video/vnd.dece.mobile": {
          "source": "iana",
          "extensions": ["uvm", "uvvm"]
        },
        "video/vnd.dece.mp4": {
          "source": "iana"
        },
        "video/vnd.dece.pd": {
          "source": "iana",
          "extensions": ["uvp", "uvvp"]
        },
        "video/vnd.dece.sd": {
          "source": "iana",
          "extensions": ["uvs", "uvvs"]
        },
        "video/vnd.dece.video": {
          "source": "iana",
          "extensions": ["uvv", "uvvv"]
        },
        "video/vnd.directv.mpeg": {
          "source": "iana"
        },
        "video/vnd.directv.mpeg-tts": {
          "source": "iana"
        },
        "video/vnd.dlna.mpeg-tts": {
          "source": "iana"
        },
        "video/vnd.dvb.file": {
          "source": "iana",
          "extensions": ["dvb"]
        },
        "video/vnd.fvt": {
          "source": "iana",
          "extensions": ["fvt"]
        },
        "video/vnd.hns.video": {
          "source": "iana"
        },
        "video/vnd.iptvforum.1dparityfec-1010": {
          "source": "iana"
        },
        "video/vnd.iptvforum.1dparityfec-2005": {
          "source": "iana"
        },
        "video/vnd.iptvforum.2dparityfec-1010": {
          "source": "iana"
        },
        "video/vnd.iptvforum.2dparityfec-2005": {
          "source": "iana"
        },
        "video/vnd.iptvforum.ttsavc": {
          "source": "iana"
        },
        "video/vnd.iptvforum.ttsmpeg2": {
          "source": "iana"
        },
        "video/vnd.motorola.video": {
          "source": "iana"
        },
        "video/vnd.motorola.videop": {
          "source": "iana"
        },
        "video/vnd.mpegurl": {
          "source": "iana",
          "extensions": ["mxu", "m4u"]
        },
        "video/vnd.ms-playready.media.pyv": {
          "source": "iana",
          "extensions": ["pyv"]
        },
        "video/vnd.nokia.interleaved-multimedia": {
          "source": "iana"
        },
        "video/vnd.nokia.mp4vr": {
          "source": "iana"
        },
        "video/vnd.nokia.videovoip": {
          "source": "iana"
        },
        "video/vnd.objectvideo": {
          "source": "iana"
        },
        "video/vnd.radgamettools.bink": {
          "source": "iana"
        },
        "video/vnd.radgamettools.smacker": {
          "source": "iana"
        },
        "video/vnd.sealed.mpeg1": {
          "source": "iana"
        },
        "video/vnd.sealed.mpeg4": {
          "source": "iana"
        },
        "video/vnd.sealed.swf": {
          "source": "iana"
        },
        "video/vnd.sealedmedia.softseal.mov": {
          "source": "iana"
        },
        "video/vnd.uvvu.mp4": {
          "source": "iana",
          "extensions": ["uvu", "uvvu"]
        },
        "video/vnd.vivo": {
          "source": "iana",
          "extensions": ["viv"]
        },
        "video/vnd.youtube.yt": {
          "source": "iana"
        },
        "video/vp8": {
          "source": "iana"
        },
        "video/webm": {
          "source": "apache",
          "compressible": false,
          "extensions": ["webm"]
        },
        "video/x-f4v": {
          "source": "apache",
          "extensions": ["f4v"]
        },
        "video/x-fli": {
          "source": "apache",
          "extensions": ["fli"]
        },
        "video/x-flv": {
          "source": "apache",
          "compressible": false,
          "extensions": ["flv"]
        },
        "video/x-m4v": {
          "source": "apache",
          "extensions": ["m4v"]
        },
        "video/x-matroska": {
          "source": "apache",
          "compressible": false,
          "extensions": ["mkv", "mk3d", "mks"]
        },
        "video/x-mng": {
          "source": "apache",
          "extensions": ["mng"]
        },
        "video/x-ms-asf": {
          "source": "apache",
          "extensions": ["asf", "asx"]
        },
        "video/x-ms-vob": {
          "source": "apache",
          "extensions": ["vob"]
        },
        "video/x-ms-wm": {
          "source": "apache",
          "extensions": ["wm"]
        },
        "video/x-ms-wmv": {
          "source": "apache",
          "compressible": false,
          "extensions": ["wmv"]
        },
        "video/x-ms-wmx": {
          "source": "apache",
          "extensions": ["wmx"]
        },
        "video/x-ms-wvx": {
          "source": "apache",
          "extensions": ["wvx"]
        },
        "video/x-msvideo": {
          "source": "apache",
          "extensions": ["avi"]
        },
        "video/x-sgi-movie": {
          "source": "apache",
          "extensions": ["movie"]
        },
        "video/x-smv": {
          "source": "apache",
          "extensions": ["smv"]
        },
        "x-conference/x-cooltalk": {
          "source": "apache",
          "extensions": ["ice"]
        },
        "x-shader/x-fragment": {
          "compressible": true
        },
        "x-shader/x-vertex": {
          "compressible": true
        }
      };
    }, {}], 28: [function(require2, module2, exports2) {
      /*!
       * mime-db
       * Copyright(c) 2014 Jonathan Ong
       * MIT Licensed
       */
      module2.exports = require2("./db.json");
    }, { "./db.json": 27 }], 29: [function(require2, module2, exports2) {
      var db = require2("mime-db");
      var extname = require2("path").extname;
      var EXTRACT_TYPE_REGEXP = /^\s*([^;\s]*)(?:;|\s|$)/;
      var TEXT_TYPE_REGEXP = /^text\//i;
      exports2.charset = charset;
      exports2.charsets = { lookup: charset };
      exports2.contentType = contentType;
      exports2.extension = extension;
      exports2.extensions = /* @__PURE__ */ Object.create(null);
      exports2.lookup = lookup;
      exports2.types = /* @__PURE__ */ Object.create(null);
      populateMaps(exports2.extensions, exports2.types);
      function charset(type) {
        if (!type || typeof type !== "string") {
          return false;
        }
        var match = EXTRACT_TYPE_REGEXP.exec(type);
        var mime = match && db[match[1].toLowerCase()];
        if (mime && mime.charset) {
          return mime.charset;
        }
        if (match && TEXT_TYPE_REGEXP.test(match[1])) {
          return "UTF-8";
        }
        return false;
      }
      function contentType(str) {
        if (!str || typeof str !== "string") {
          return false;
        }
        var mime = str.indexOf("/") === -1 ? exports2.lookup(str) : str;
        if (!mime) {
          return false;
        }
        if (mime.indexOf("charset") === -1) {
          var charset2 = exports2.charset(mime);
          if (charset2)
            mime += "; charset=" + charset2.toLowerCase();
        }
        return mime;
      }
      function extension(type) {
        if (!type || typeof type !== "string") {
          return false;
        }
        var match = EXTRACT_TYPE_REGEXP.exec(type);
        var exts = match && exports2.extensions[match[1].toLowerCase()];
        if (!exts || !exts.length) {
          return false;
        }
        return exts[0];
      }
      function lookup(path) {
        if (!path || typeof path !== "string") {
          return false;
        }
        var extension2 = extname("x." + path).toLowerCase().substr(1);
        if (!extension2) {
          return false;
        }
        return exports2.types[extension2] || false;
      }
      function populateMaps(extensions, types) {
        var preference = ["nginx", "apache", void 0, "iana"];
        Object.keys(db).forEach(function forEachMimeType(type) {
          var mime = db[type];
          var exts = mime.extensions;
          if (!exts || !exts.length) {
            return;
          }
          extensions[type] = exts;
          for (var i = 0; i < exts.length; i++) {
            var extension2 = exts[i];
            if (types[extension2]) {
              var from = preference.indexOf(db[types[extension2]].source);
              var to = preference.indexOf(mime.source);
              if (types[extension2] !== "application/octet-stream" && (from > to || from === to && types[extension2].substr(0, 12) === "application/")) {
                continue;
              }
            }
            types[extension2] = type;
          }
        });
      }
    }, { "mime-db": 28, "path": 30 }], 30: [function(require2, module2, exports2) {
      (function(process) {
        function normalizeArray(parts, allowAboveRoot) {
          var up = 0;
          for (var i = parts.length - 1; i >= 0; i--) {
            var last = parts[i];
            if (last === ".") {
              parts.splice(i, 1);
            } else if (last === "..") {
              parts.splice(i, 1);
              up++;
            } else if (up) {
              parts.splice(i, 1);
              up--;
            }
          }
          if (allowAboveRoot) {
            for (; up--; up) {
              parts.unshift("..");
            }
          }
          return parts;
        }
        exports2.resolve = function() {
          var resolvedPath = "", resolvedAbsolute = false;
          for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
            var path = i >= 0 ? arguments[i] : process.cwd();
            if (typeof path !== "string") {
              throw new TypeError("Arguments to path.resolve must be strings");
            } else if (!path) {
              continue;
            }
            resolvedPath = path + "/" + resolvedPath;
            resolvedAbsolute = path.charAt(0) === "/";
          }
          resolvedPath = normalizeArray(filter(resolvedPath.split("/"), function(p) {
            return !!p;
          }), !resolvedAbsolute).join("/");
          return (resolvedAbsolute ? "/" : "") + resolvedPath || ".";
        };
        exports2.normalize = function(path) {
          var isAbsolute = exports2.isAbsolute(path), trailingSlash = substr(path, -1) === "/";
          path = normalizeArray(filter(path.split("/"), function(p) {
            return !!p;
          }), !isAbsolute).join("/");
          if (!path && !isAbsolute) {
            path = ".";
          }
          if (path && trailingSlash) {
            path += "/";
          }
          return (isAbsolute ? "/" : "") + path;
        };
        exports2.isAbsolute = function(path) {
          return path.charAt(0) === "/";
        };
        exports2.join = function() {
          var paths = Array.prototype.slice.call(arguments, 0);
          return exports2.normalize(filter(paths, function(p, index) {
            if (typeof p !== "string") {
              throw new TypeError("Arguments to path.join must be strings");
            }
            return p;
          }).join("/"));
        };
        exports2.relative = function(from, to) {
          from = exports2.resolve(from).substr(1);
          to = exports2.resolve(to).substr(1);
          function trim(arr) {
            var start = 0;
            for (; start < arr.length; start++) {
              if (arr[start] !== "")
                break;
            }
            var end = arr.length - 1;
            for (; end >= 0; end--) {
              if (arr[end] !== "")
                break;
            }
            if (start > end)
              return [];
            return arr.slice(start, end - start + 1);
          }
          var fromParts = trim(from.split("/"));
          var toParts = trim(to.split("/"));
          var length = Math.min(fromParts.length, toParts.length);
          var samePartsLength = length;
          for (var i = 0; i < length; i++) {
            if (fromParts[i] !== toParts[i]) {
              samePartsLength = i;
              break;
            }
          }
          var outputParts = [];
          for (var i = samePartsLength; i < fromParts.length; i++) {
            outputParts.push("..");
          }
          outputParts = outputParts.concat(toParts.slice(samePartsLength));
          return outputParts.join("/");
        };
        exports2.sep = "/";
        exports2.delimiter = ":";
        exports2.dirname = function(path) {
          if (typeof path !== "string")
            path = path + "";
          if (path.length === 0)
            return ".";
          var code = path.charCodeAt(0);
          var hasRoot = code === 47;
          var end = -1;
          var matchedSlash = true;
          for (var i = path.length - 1; i >= 1; --i) {
            code = path.charCodeAt(i);
            if (code === 47) {
              if (!matchedSlash) {
                end = i;
                break;
              }
            } else {
              matchedSlash = false;
            }
          }
          if (end === -1)
            return hasRoot ? "/" : ".";
          if (hasRoot && end === 1) {
            return "/";
          }
          return path.slice(0, end);
        };
        function basename(path) {
          if (typeof path !== "string")
            path = path + "";
          var start = 0;
          var end = -1;
          var matchedSlash = true;
          var i;
          for (i = path.length - 1; i >= 0; --i) {
            if (path.charCodeAt(i) === 47) {
              if (!matchedSlash) {
                start = i + 1;
                break;
              }
            } else if (end === -1) {
              matchedSlash = false;
              end = i + 1;
            }
          }
          if (end === -1)
            return "";
          return path.slice(start, end);
        }
        exports2.basename = function(path, ext) {
          var f = basename(path);
          if (ext && f.substr(-1 * ext.length) === ext) {
            f = f.substr(0, f.length - ext.length);
          }
          return f;
        };
        exports2.extname = function(path) {
          if (typeof path !== "string")
            path = path + "";
          var startDot = -1;
          var startPart = 0;
          var end = -1;
          var matchedSlash = true;
          var preDotState = 0;
          for (var i = path.length - 1; i >= 0; --i) {
            var code = path.charCodeAt(i);
            if (code === 47) {
              if (!matchedSlash) {
                startPart = i + 1;
                break;
              }
              continue;
            }
            if (end === -1) {
              matchedSlash = false;
              end = i + 1;
            }
            if (code === 46) {
              if (startDot === -1)
                startDot = i;
              else if (preDotState !== 1)
                preDotState = 1;
            } else if (startDot !== -1) {
              preDotState = -1;
            }
          }
          if (startDot === -1 || end === -1 || // We saw a non-dot character immediately before the dot
          preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
          preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
            return "";
          }
          return path.slice(startDot, end);
        };
        function filter(xs, f) {
          if (xs.filter)
            return xs.filter(f);
          var res = [];
          for (var i = 0; i < xs.length; i++) {
            if (f(xs[i], i, xs))
              res.push(xs[i]);
          }
          return res;
        }
        var substr = "ab".substr(-1) === "b" ? function(str, start, len) {
          return str.substr(start, len);
        } : function(str, start, len) {
          if (start < 0)
            start = str.length + start;
          return str.substr(start, len);
        };
      }).call(this, require2("_process"));
    }, { "_process": 32 }], 31: [function(require2, module2, exports2) {
      (function(process) {
        if (typeof process === "undefined" || !process.version || process.version.indexOf("v0.") === 0 || process.version.indexOf("v1.") === 0 && process.version.indexOf("v1.8.") !== 0) {
          module2.exports = { nextTick };
        } else {
          module2.exports = process;
        }
        function nextTick(fn, arg1, arg2, arg3) {
          if (typeof fn !== "function") {
            throw new TypeError('"callback" argument must be a function');
          }
          var len = arguments.length;
          var args, i;
          switch (len) {
            case 0:
            case 1:
              return process.nextTick(fn);
            case 2:
              return process.nextTick(function afterTickOne() {
                fn.call(null, arg1);
              });
            case 3:
              return process.nextTick(function afterTickTwo() {
                fn.call(null, arg1, arg2);
              });
            case 4:
              return process.nextTick(function afterTickThree() {
                fn.call(null, arg1, arg2, arg3);
              });
            default:
              args = new Array(len - 1);
              i = 0;
              while (i < args.length) {
                args[i++] = arguments[i];
              }
              return process.nextTick(function afterTick() {
                fn.apply(null, args);
              });
          }
        }
      }).call(this, require2("_process"));
    }, { "_process": 32 }], 32: [function(require2, module2, exports2) {
      var process = module2.exports = {};
      var cachedSetTimeout;
      var cachedClearTimeout;
      function defaultSetTimout() {
        throw new Error("setTimeout has not been defined");
      }
      function defaultClearTimeout() {
        throw new Error("clearTimeout has not been defined");
      }
      (function() {
        try {
          if (typeof setTimeout === "function") {
            cachedSetTimeout = setTimeout;
          } else {
            cachedSetTimeout = defaultSetTimout;
          }
        } catch (e) {
          cachedSetTimeout = defaultSetTimout;
        }
        try {
          if (typeof clearTimeout === "function") {
            cachedClearTimeout = clearTimeout;
          } else {
            cachedClearTimeout = defaultClearTimeout;
          }
        } catch (e) {
          cachedClearTimeout = defaultClearTimeout;
        }
      })();
      function runTimeout(fun) {
        if (cachedSetTimeout === setTimeout) {
          return setTimeout(fun, 0);
        }
        if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
          cachedSetTimeout = setTimeout;
          return setTimeout(fun, 0);
        }
        try {
          return cachedSetTimeout(fun, 0);
        } catch (e) {
          try {
            return cachedSetTimeout.call(null, fun, 0);
          } catch (e2) {
            return cachedSetTimeout.call(this, fun, 0);
          }
        }
      }
      function runClearTimeout(marker) {
        if (cachedClearTimeout === clearTimeout) {
          return clearTimeout(marker);
        }
        if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
          cachedClearTimeout = clearTimeout;
          return clearTimeout(marker);
        }
        try {
          return cachedClearTimeout(marker);
        } catch (e) {
          try {
            return cachedClearTimeout.call(null, marker);
          } catch (e2) {
            return cachedClearTimeout.call(this, marker);
          }
        }
      }
      var queue = [];
      var draining = false;
      var currentQueue;
      var queueIndex = -1;
      function cleanUpNextTick() {
        if (!draining || !currentQueue) {
          return;
        }
        draining = false;
        if (currentQueue.length) {
          queue = currentQueue.concat(queue);
        } else {
          queueIndex = -1;
        }
        if (queue.length) {
          drainQueue();
        }
      }
      function drainQueue() {
        if (draining) {
          return;
        }
        var timeout = runTimeout(cleanUpNextTick);
        draining = true;
        var len = queue.length;
        while (len) {
          currentQueue = queue;
          queue = [];
          while (++queueIndex < len) {
            if (currentQueue) {
              currentQueue[queueIndex].run();
            }
          }
          queueIndex = -1;
          len = queue.length;
        }
        currentQueue = null;
        draining = false;
        runClearTimeout(timeout);
      }
      process.nextTick = function(fun) {
        var args = new Array(arguments.length - 1);
        if (arguments.length > 1) {
          for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
          }
        }
        queue.push(new Item(fun, args));
        if (queue.length === 1 && !draining) {
          runTimeout(drainQueue);
        }
      };
      function Item(fun, array) {
        this.fun = fun;
        this.array = array;
      }
      Item.prototype.run = function() {
        this.fun.apply(null, this.array);
      };
      process.title = "browser";
      process.browser = true;
      process.env = {};
      process.argv = [];
      process.version = "";
      process.versions = {};
      function noop() {
      }
      process.on = noop;
      process.addListener = noop;
      process.once = noop;
      process.off = noop;
      process.removeListener = noop;
      process.removeAllListeners = noop;
      process.emit = noop;
      process.prependListener = noop;
      process.prependOnceListener = noop;
      process.listeners = function(name) {
        return [];
      };
      process.binding = function(name) {
        throw new Error("process.binding is not supported");
      };
      process.cwd = function() {
        return "/";
      };
      process.chdir = function(dir) {
        throw new Error("process.chdir is not supported");
      };
      process.umask = function() {
        return 0;
      };
    }, {}], 33: [function(require2, module2, exports2) {
      (function(global) {
        (function(root) {
          var freeExports = typeof exports2 == "object" && exports2 && !exports2.nodeType && exports2;
          var freeModule = typeof module2 == "object" && module2 && !module2.nodeType && module2;
          var freeGlobal = typeof global == "object" && global;
          if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal || freeGlobal.self === freeGlobal) {
            root = freeGlobal;
          }
          var punycode, maxInt = 2147483647, base = 36, tMin = 1, tMax = 26, skew = 38, damp = 700, initialBias = 72, initialN = 128, delimiter = "-", regexPunycode = /^xn--/, regexNonASCII = /[^\x20-\x7E]/, regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, errors = {
            "overflow": "Overflow: input needs wider integers to process",
            "not-basic": "Illegal input >= 0x80 (not a basic code point)",
            "invalid-input": "Invalid input"
          }, baseMinusTMin = base - tMin, floor = Math.floor, stringFromCharCode = String.fromCharCode, key;
          function error(type) {
            throw new RangeError(errors[type]);
          }
          function map(array, fn) {
            var length = array.length;
            var result = [];
            while (length--) {
              result[length] = fn(array[length]);
            }
            return result;
          }
          function mapDomain(string, fn) {
            var parts = string.split("@");
            var result = "";
            if (parts.length > 1) {
              result = parts[0] + "@";
              string = parts[1];
            }
            string = string.replace(regexSeparators, ".");
            var labels = string.split(".");
            var encoded = map(labels, fn).join(".");
            return result + encoded;
          }
          function ucs2decode(string) {
            var output = [], counter = 0, length = string.length, value, extra;
            while (counter < length) {
              value = string.charCodeAt(counter++);
              if (value >= 55296 && value <= 56319 && counter < length) {
                extra = string.charCodeAt(counter++);
                if ((extra & 64512) == 56320) {
                  output.push(((value & 1023) << 10) + (extra & 1023) + 65536);
                } else {
                  output.push(value);
                  counter--;
                }
              } else {
                output.push(value);
              }
            }
            return output;
          }
          function ucs2encode(array) {
            return map(array, function(value) {
              var output = "";
              if (value > 65535) {
                value -= 65536;
                output += stringFromCharCode(value >>> 10 & 1023 | 55296);
                value = 56320 | value & 1023;
              }
              output += stringFromCharCode(value);
              return output;
            }).join("");
          }
          function basicToDigit(codePoint) {
            if (codePoint - 48 < 10) {
              return codePoint - 22;
            }
            if (codePoint - 65 < 26) {
              return codePoint - 65;
            }
            if (codePoint - 97 < 26) {
              return codePoint - 97;
            }
            return base;
          }
          function digitToBasic(digit, flag) {
            return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
          }
          function adapt(delta, numPoints, firstTime) {
            var k = 0;
            delta = firstTime ? floor(delta / damp) : delta >> 1;
            delta += floor(delta / numPoints);
            for (; delta > baseMinusTMin * tMax >> 1; k += base) {
              delta = floor(delta / baseMinusTMin);
            }
            return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
          }
          function decode(input) {
            var output = [], inputLength = input.length, out, i = 0, n = initialN, bias = initialBias, basic, j, index, oldi, w, k, digit, t, baseMinusT;
            basic = input.lastIndexOf(delimiter);
            if (basic < 0) {
              basic = 0;
            }
            for (j = 0; j < basic; ++j) {
              if (input.charCodeAt(j) >= 128) {
                error("not-basic");
              }
              output.push(input.charCodeAt(j));
            }
            for (index = basic > 0 ? basic + 1 : 0; index < inputLength; ) {
              for (oldi = i, w = 1, k = base; ; k += base) {
                if (index >= inputLength) {
                  error("invalid-input");
                }
                digit = basicToDigit(input.charCodeAt(index++));
                if (digit >= base || digit > floor((maxInt - i) / w)) {
                  error("overflow");
                }
                i += digit * w;
                t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
                if (digit < t) {
                  break;
                }
                baseMinusT = base - t;
                if (w > floor(maxInt / baseMinusT)) {
                  error("overflow");
                }
                w *= baseMinusT;
              }
              out = output.length + 1;
              bias = adapt(i - oldi, out, oldi == 0);
              if (floor(i / out) > maxInt - n) {
                error("overflow");
              }
              n += floor(i / out);
              i %= out;
              output.splice(i++, 0, n);
            }
            return ucs2encode(output);
          }
          function encode(input) {
            var n, delta, handledCPCount, basicLength, bias, j, m, q, k, t, currentValue, output = [], inputLength, handledCPCountPlusOne, baseMinusT, qMinusT;
            input = ucs2decode(input);
            inputLength = input.length;
            n = initialN;
            delta = 0;
            bias = initialBias;
            for (j = 0; j < inputLength; ++j) {
              currentValue = input[j];
              if (currentValue < 128) {
                output.push(stringFromCharCode(currentValue));
              }
            }
            handledCPCount = basicLength = output.length;
            if (basicLength) {
              output.push(delimiter);
            }
            while (handledCPCount < inputLength) {
              for (m = maxInt, j = 0; j < inputLength; ++j) {
                currentValue = input[j];
                if (currentValue >= n && currentValue < m) {
                  m = currentValue;
                }
              }
              handledCPCountPlusOne = handledCPCount + 1;
              if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
                error("overflow");
              }
              delta += (m - n) * handledCPCountPlusOne;
              n = m;
              for (j = 0; j < inputLength; ++j) {
                currentValue = input[j];
                if (currentValue < n && ++delta > maxInt) {
                  error("overflow");
                }
                if (currentValue == n) {
                  for (q = delta, k = base; ; k += base) {
                    t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
                    if (q < t) {
                      break;
                    }
                    qMinusT = q - t;
                    baseMinusT = base - t;
                    output.push(
                      stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
                    );
                    q = floor(qMinusT / baseMinusT);
                  }
                  output.push(stringFromCharCode(digitToBasic(q, 0)));
                  bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
                  delta = 0;
                  ++handledCPCount;
                }
              }
              ++delta;
              ++n;
            }
            return output.join("");
          }
          function toUnicode(input) {
            return mapDomain(input, function(string) {
              return regexPunycode.test(string) ? decode(string.slice(4).toLowerCase()) : string;
            });
          }
          function toASCII(input) {
            return mapDomain(input, function(string) {
              return regexNonASCII.test(string) ? "xn--" + encode(string) : string;
            });
          }
          punycode = {
            /**
             * A string representing the current Punycode.js version number.
             * @memberOf punycode
             * @type String
             */
            "version": "1.4.1",
            /**
             * An object of methods to convert from JavaScript's internal character
             * representation (UCS-2) to Unicode code points, and back.
             * @see <https://mathiasbynens.be/notes/javascript-encoding>
             * @memberOf punycode
             * @type Object
             */
            "ucs2": {
              "decode": ucs2decode,
              "encode": ucs2encode
            },
            "decode": decode,
            "encode": encode,
            "toASCII": toASCII,
            "toUnicode": toUnicode
          };
          if (freeExports && freeModule) {
            if (module2.exports == freeExports) {
              freeModule.exports = punycode;
            } else {
              for (key in punycode) {
                punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
              }
            }
          } else {
            root.punycode = punycode;
          }
        })(this);
      }).call(this, typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {}], 34: [function(require2, module2, exports2) {
      function hasOwnProperty(obj, prop) {
        return Object.prototype.hasOwnProperty.call(obj, prop);
      }
      module2.exports = function(qs, sep, eq, options) {
        sep = sep || "&";
        eq = eq || "=";
        var obj = {};
        if (typeof qs !== "string" || qs.length === 0) {
          return obj;
        }
        var regexp = /\+/g;
        qs = qs.split(sep);
        var maxKeys = 1e3;
        if (options && typeof options.maxKeys === "number") {
          maxKeys = options.maxKeys;
        }
        var len = qs.length;
        if (maxKeys > 0 && len > maxKeys) {
          len = maxKeys;
        }
        for (var i = 0; i < len; ++i) {
          var x = qs[i].replace(regexp, "%20"), idx = x.indexOf(eq), kstr, vstr, k, v;
          if (idx >= 0) {
            kstr = x.substr(0, idx);
            vstr = x.substr(idx + 1);
          } else {
            kstr = x;
            vstr = "";
          }
          k = decodeURIComponent(kstr);
          v = decodeURIComponent(vstr);
          if (!hasOwnProperty(obj, k)) {
            obj[k] = v;
          } else if (isArray(obj[k])) {
            obj[k].push(v);
          } else {
            obj[k] = [obj[k], v];
          }
        }
        return obj;
      };
      var isArray = Array.isArray || function(xs) {
        return Object.prototype.toString.call(xs) === "[object Array]";
      };
    }, {}], 35: [function(require2, module2, exports2) {
      var stringifyPrimitive = function(v) {
        switch (typeof v) {
          case "string":
            return v;
          case "boolean":
            return v ? "true" : "false";
          case "number":
            return isFinite(v) ? v : "";
          default:
            return "";
        }
      };
      module2.exports = function(obj, sep, eq, name) {
        sep = sep || "&";
        eq = eq || "=";
        if (obj === null) {
          obj = void 0;
        }
        if (typeof obj === "object") {
          return map(objectKeys(obj), function(k) {
            var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
            if (isArray(obj[k])) {
              return map(obj[k], function(v) {
                return ks + encodeURIComponent(stringifyPrimitive(v));
              }).join(sep);
            } else {
              return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
            }
          }).join(sep);
        }
        if (!name)
          return "";
        return encodeURIComponent(stringifyPrimitive(name)) + eq + encodeURIComponent(stringifyPrimitive(obj));
      };
      var isArray = Array.isArray || function(xs) {
        return Object.prototype.toString.call(xs) === "[object Array]";
      };
      function map(xs, f) {
        if (xs.map)
          return xs.map(f);
        var res = [];
        for (var i = 0; i < xs.length; i++) {
          res.push(f(xs[i], i));
        }
        return res;
      }
      var objectKeys = Object.keys || function(obj) {
        var res = [];
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key))
            res.push(key);
        }
        return res;
      };
    }, {}], 36: [function(require2, module2, exports2) {
      exports2.decode = exports2.parse = require2("./decode");
      exports2.encode = exports2.stringify = require2("./encode");
    }, { "./decode": 34, "./encode": 35 }], 37: [function(require2, module2, exports2) {
      module2.exports = require2("./lib/_stream_duplex.js");
    }, { "./lib/_stream_duplex.js": 38 }], 38: [function(require2, module2, exports2) {
      var pna = require2("process-nextick-args");
      var objectKeys = Object.keys || function(obj) {
        var keys2 = [];
        for (var key in obj) {
          keys2.push(key);
        }
        return keys2;
      };
      module2.exports = Duplex;
      var util = Object.create(require2("core-util-is"));
      util.inherits = require2("inherits");
      var Readable = require2("./_stream_readable");
      var Writable = require2("./_stream_writable");
      util.inherits(Duplex, Readable);
      {
        var keys = objectKeys(Writable.prototype);
        for (var v = 0; v < keys.length; v++) {
          var method = keys[v];
          if (!Duplex.prototype[method])
            Duplex.prototype[method] = Writable.prototype[method];
        }
      }
      function Duplex(options) {
        if (!(this instanceof Duplex))
          return new Duplex(options);
        Readable.call(this, options);
        Writable.call(this, options);
        if (options && options.readable === false)
          this.readable = false;
        if (options && options.writable === false)
          this.writable = false;
        this.allowHalfOpen = true;
        if (options && options.allowHalfOpen === false)
          this.allowHalfOpen = false;
        this.once("end", onend);
      }
      Object.defineProperty(Duplex.prototype, "writableHighWaterMark", {
        // making it explicit this property is not enumerable
        // because otherwise some prototype manipulation in
        // userland will fail
        enumerable: false,
        get: function() {
          return this._writableState.highWaterMark;
        }
      });
      function onend() {
        if (this.allowHalfOpen || this._writableState.ended)
          return;
        pna.nextTick(onEndNT, this);
      }
      function onEndNT(self2) {
        self2.end();
      }
      Object.defineProperty(Duplex.prototype, "destroyed", {
        get: function() {
          if (this._readableState === void 0 || this._writableState === void 0) {
            return false;
          }
          return this._readableState.destroyed && this._writableState.destroyed;
        },
        set: function(value) {
          if (this._readableState === void 0 || this._writableState === void 0) {
            return;
          }
          this._readableState.destroyed = value;
          this._writableState.destroyed = value;
        }
      });
      Duplex.prototype._destroy = function(err, cb) {
        this.push(null);
        this.end();
        pna.nextTick(cb, err);
      };
    }, { "./_stream_readable": 40, "./_stream_writable": 42, "core-util-is": 19, "inherits": 24, "process-nextick-args": 31 }], 39: [function(require2, module2, exports2) {
      module2.exports = PassThrough;
      var Transform = require2("./_stream_transform");
      var util = Object.create(require2("core-util-is"));
      util.inherits = require2("inherits");
      util.inherits(PassThrough, Transform);
      function PassThrough(options) {
        if (!(this instanceof PassThrough))
          return new PassThrough(options);
        Transform.call(this, options);
      }
      PassThrough.prototype._transform = function(chunk, encoding, cb) {
        cb(null, chunk);
      };
    }, { "./_stream_transform": 41, "core-util-is": 19, "inherits": 24 }], 40: [function(require2, module2, exports2) {
      (function(process, global) {
        var pna = require2("process-nextick-args");
        module2.exports = Readable;
        var isArray = require2("isarray");
        var Duplex;
        Readable.ReadableState = ReadableState;
        require2("events").EventEmitter;
        var EElistenerCount = function(emitter, type) {
          return emitter.listeners(type).length;
        };
        var Stream = require2("./internal/streams/stream");
        var Buffer = require2("safe-buffer").Buffer;
        var OurUint8Array = global.Uint8Array || function() {
        };
        function _uint8ArrayToBuffer(chunk) {
          return Buffer.from(chunk);
        }
        function _isUint8Array(obj) {
          return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
        }
        var util = Object.create(require2("core-util-is"));
        util.inherits = require2("inherits");
        var debugUtil = require2("util");
        var debug = void 0;
        if (debugUtil && debugUtil.debuglog) {
          debug = debugUtil.debuglog("stream");
        } else {
          debug = function() {
          };
        }
        var BufferList = require2("./internal/streams/BufferList");
        var destroyImpl = require2("./internal/streams/destroy");
        var StringDecoder;
        util.inherits(Readable, Stream);
        var kProxyEvents = ["error", "close", "destroy", "pause", "resume"];
        function prependListener(emitter, event, fn) {
          if (typeof emitter.prependListener === "function")
            return emitter.prependListener(event, fn);
          if (!emitter._events || !emitter._events[event])
            emitter.on(event, fn);
          else if (isArray(emitter._events[event]))
            emitter._events[event].unshift(fn);
          else
            emitter._events[event] = [fn, emitter._events[event]];
        }
        function ReadableState(options, stream) {
          Duplex = Duplex || require2("./_stream_duplex");
          options = options || {};
          var isDuplex = stream instanceof Duplex;
          this.objectMode = !!options.objectMode;
          if (isDuplex)
            this.objectMode = this.objectMode || !!options.readableObjectMode;
          var hwm = options.highWaterMark;
          var readableHwm = options.readableHighWaterMark;
          var defaultHwm = this.objectMode ? 16 : 16 * 1024;
          if (hwm || hwm === 0)
            this.highWaterMark = hwm;
          else if (isDuplex && (readableHwm || readableHwm === 0))
            this.highWaterMark = readableHwm;
          else
            this.highWaterMark = defaultHwm;
          this.highWaterMark = Math.floor(this.highWaterMark);
          this.buffer = new BufferList();
          this.length = 0;
          this.pipes = null;
          this.pipesCount = 0;
          this.flowing = null;
          this.ended = false;
          this.endEmitted = false;
          this.reading = false;
          this.sync = true;
          this.needReadable = false;
          this.emittedReadable = false;
          this.readableListening = false;
          this.resumeScheduled = false;
          this.destroyed = false;
          this.defaultEncoding = options.defaultEncoding || "utf8";
          this.awaitDrain = 0;
          this.readingMore = false;
          this.decoder = null;
          this.encoding = null;
          if (options.encoding) {
            if (!StringDecoder)
              StringDecoder = require2("string_decoder/").StringDecoder;
            this.decoder = new StringDecoder(options.encoding);
            this.encoding = options.encoding;
          }
        }
        function Readable(options) {
          Duplex = Duplex || require2("./_stream_duplex");
          if (!(this instanceof Readable))
            return new Readable(options);
          this._readableState = new ReadableState(options, this);
          this.readable = true;
          if (options) {
            if (typeof options.read === "function")
              this._read = options.read;
            if (typeof options.destroy === "function")
              this._destroy = options.destroy;
          }
          Stream.call(this);
        }
        Object.defineProperty(Readable.prototype, "destroyed", {
          get: function() {
            if (this._readableState === void 0) {
              return false;
            }
            return this._readableState.destroyed;
          },
          set: function(value) {
            if (!this._readableState) {
              return;
            }
            this._readableState.destroyed = value;
          }
        });
        Readable.prototype.destroy = destroyImpl.destroy;
        Readable.prototype._undestroy = destroyImpl.undestroy;
        Readable.prototype._destroy = function(err, cb) {
          this.push(null);
          cb(err);
        };
        Readable.prototype.push = function(chunk, encoding) {
          var state = this._readableState;
          var skipChunkCheck;
          if (!state.objectMode) {
            if (typeof chunk === "string") {
              encoding = encoding || state.defaultEncoding;
              if (encoding !== state.encoding) {
                chunk = Buffer.from(chunk, encoding);
                encoding = "";
              }
              skipChunkCheck = true;
            }
          } else {
            skipChunkCheck = true;
          }
          return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
        };
        Readable.prototype.unshift = function(chunk) {
          return readableAddChunk(this, chunk, null, true, false);
        };
        function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
          var state = stream._readableState;
          if (chunk === null) {
            state.reading = false;
            onEofChunk(stream, state);
          } else {
            var er;
            if (!skipChunkCheck)
              er = chunkInvalid(state, chunk);
            if (er) {
              stream.emit("error", er);
            } else if (state.objectMode || chunk && chunk.length > 0) {
              if (typeof chunk !== "string" && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer.prototype) {
                chunk = _uint8ArrayToBuffer(chunk);
              }
              if (addToFront) {
                if (state.endEmitted)
                  stream.emit("error", new Error("stream.unshift() after end event"));
                else
                  addChunk(stream, state, chunk, true);
              } else if (state.ended) {
                stream.emit("error", new Error("stream.push() after EOF"));
              } else {
                state.reading = false;
                if (state.decoder && !encoding) {
                  chunk = state.decoder.write(chunk);
                  if (state.objectMode || chunk.length !== 0)
                    addChunk(stream, state, chunk, false);
                  else
                    maybeReadMore(stream, state);
                } else {
                  addChunk(stream, state, chunk, false);
                }
              }
            } else if (!addToFront) {
              state.reading = false;
            }
          }
          return needMoreData(state);
        }
        function addChunk(stream, state, chunk, addToFront) {
          if (state.flowing && state.length === 0 && !state.sync) {
            stream.emit("data", chunk);
            stream.read(0);
          } else {
            state.length += state.objectMode ? 1 : chunk.length;
            if (addToFront)
              state.buffer.unshift(chunk);
            else
              state.buffer.push(chunk);
            if (state.needReadable)
              emitReadable(stream);
          }
          maybeReadMore(stream, state);
        }
        function chunkInvalid(state, chunk) {
          var er;
          if (!_isUint8Array(chunk) && typeof chunk !== "string" && chunk !== void 0 && !state.objectMode) {
            er = new TypeError("Invalid non-string/buffer chunk");
          }
          return er;
        }
        function needMoreData(state) {
          return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
        }
        Readable.prototype.isPaused = function() {
          return this._readableState.flowing === false;
        };
        Readable.prototype.setEncoding = function(enc) {
          if (!StringDecoder)
            StringDecoder = require2("string_decoder/").StringDecoder;
          this._readableState.decoder = new StringDecoder(enc);
          this._readableState.encoding = enc;
          return this;
        };
        var MAX_HWM = 8388608;
        function computeNewHighWaterMark(n) {
          if (n >= MAX_HWM) {
            n = MAX_HWM;
          } else {
            n--;
            n |= n >>> 1;
            n |= n >>> 2;
            n |= n >>> 4;
            n |= n >>> 8;
            n |= n >>> 16;
            n++;
          }
          return n;
        }
        function howMuchToRead(n, state) {
          if (n <= 0 || state.length === 0 && state.ended)
            return 0;
          if (state.objectMode)
            return 1;
          if (n !== n) {
            if (state.flowing && state.length)
              return state.buffer.head.data.length;
            else
              return state.length;
          }
          if (n > state.highWaterMark)
            state.highWaterMark = computeNewHighWaterMark(n);
          if (n <= state.length)
            return n;
          if (!state.ended) {
            state.needReadable = true;
            return 0;
          }
          return state.length;
        }
        Readable.prototype.read = function(n) {
          debug("read", n);
          n = parseInt(n, 10);
          var state = this._readableState;
          var nOrig = n;
          if (n !== 0)
            state.emittedReadable = false;
          if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
            debug("read: emitReadable", state.length, state.ended);
            if (state.length === 0 && state.ended)
              endReadable(this);
            else
              emitReadable(this);
            return null;
          }
          n = howMuchToRead(n, state);
          if (n === 0 && state.ended) {
            if (state.length === 0)
              endReadable(this);
            return null;
          }
          var doRead = state.needReadable;
          debug("need readable", doRead);
          if (state.length === 0 || state.length - n < state.highWaterMark) {
            doRead = true;
            debug("length less than watermark", doRead);
          }
          if (state.ended || state.reading) {
            doRead = false;
            debug("reading or ended", doRead);
          } else if (doRead) {
            debug("do read");
            state.reading = true;
            state.sync = true;
            if (state.length === 0)
              state.needReadable = true;
            this._read(state.highWaterMark);
            state.sync = false;
            if (!state.reading)
              n = howMuchToRead(nOrig, state);
          }
          var ret;
          if (n > 0)
            ret = fromList(n, state);
          else
            ret = null;
          if (ret === null) {
            state.needReadable = true;
            n = 0;
          } else {
            state.length -= n;
          }
          if (state.length === 0) {
            if (!state.ended)
              state.needReadable = true;
            if (nOrig !== n && state.ended)
              endReadable(this);
          }
          if (ret !== null)
            this.emit("data", ret);
          return ret;
        };
        function onEofChunk(stream, state) {
          if (state.ended)
            return;
          if (state.decoder) {
            var chunk = state.decoder.end();
            if (chunk && chunk.length) {
              state.buffer.push(chunk);
              state.length += state.objectMode ? 1 : chunk.length;
            }
          }
          state.ended = true;
          emitReadable(stream);
        }
        function emitReadable(stream) {
          var state = stream._readableState;
          state.needReadable = false;
          if (!state.emittedReadable) {
            debug("emitReadable", state.flowing);
            state.emittedReadable = true;
            if (state.sync)
              pna.nextTick(emitReadable_, stream);
            else
              emitReadable_(stream);
          }
        }
        function emitReadable_(stream) {
          debug("emit readable");
          stream.emit("readable");
          flow(stream);
        }
        function maybeReadMore(stream, state) {
          if (!state.readingMore) {
            state.readingMore = true;
            pna.nextTick(maybeReadMore_, stream, state);
          }
        }
        function maybeReadMore_(stream, state) {
          var len = state.length;
          while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
            debug("maybeReadMore read 0");
            stream.read(0);
            if (len === state.length)
              break;
            else
              len = state.length;
          }
          state.readingMore = false;
        }
        Readable.prototype._read = function(n) {
          this.emit("error", new Error("_read() is not implemented"));
        };
        Readable.prototype.pipe = function(dest, pipeOpts) {
          var src = this;
          var state = this._readableState;
          switch (state.pipesCount) {
            case 0:
              state.pipes = dest;
              break;
            case 1:
              state.pipes = [state.pipes, dest];
              break;
            default:
              state.pipes.push(dest);
              break;
          }
          state.pipesCount += 1;
          debug("pipe count=%d opts=%j", state.pipesCount, pipeOpts);
          var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;
          var endFn = doEnd ? onend : unpipe;
          if (state.endEmitted)
            pna.nextTick(endFn);
          else
            src.once("end", endFn);
          dest.on("unpipe", onunpipe);
          function onunpipe(readable, unpipeInfo) {
            debug("onunpipe");
            if (readable === src) {
              if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
                unpipeInfo.hasUnpiped = true;
                cleanup();
              }
            }
          }
          function onend() {
            debug("onend");
            dest.end();
          }
          var ondrain = pipeOnDrain(src);
          dest.on("drain", ondrain);
          var cleanedUp = false;
          function cleanup() {
            debug("cleanup");
            dest.removeListener("close", onclose);
            dest.removeListener("finish", onfinish);
            dest.removeListener("drain", ondrain);
            dest.removeListener("error", onerror);
            dest.removeListener("unpipe", onunpipe);
            src.removeListener("end", onend);
            src.removeListener("end", unpipe);
            src.removeListener("data", ondata);
            cleanedUp = true;
            if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain))
              ondrain();
          }
          var increasedAwaitDrain = false;
          src.on("data", ondata);
          function ondata(chunk) {
            debug("ondata");
            increasedAwaitDrain = false;
            var ret = dest.write(chunk);
            if (false === ret && !increasedAwaitDrain) {
              if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
                debug("false write response, pause", src._readableState.awaitDrain);
                src._readableState.awaitDrain++;
                increasedAwaitDrain = true;
              }
              src.pause();
            }
          }
          function onerror(er) {
            debug("onerror", er);
            unpipe();
            dest.removeListener("error", onerror);
            if (EElistenerCount(dest, "error") === 0)
              dest.emit("error", er);
          }
          prependListener(dest, "error", onerror);
          function onclose() {
            dest.removeListener("finish", onfinish);
            unpipe();
          }
          dest.once("close", onclose);
          function onfinish() {
            debug("onfinish");
            dest.removeListener("close", onclose);
            unpipe();
          }
          dest.once("finish", onfinish);
          function unpipe() {
            debug("unpipe");
            src.unpipe(dest);
          }
          dest.emit("pipe", src);
          if (!state.flowing) {
            debug("pipe resume");
            src.resume();
          }
          return dest;
        };
        function pipeOnDrain(src) {
          return function() {
            var state = src._readableState;
            debug("pipeOnDrain", state.awaitDrain);
            if (state.awaitDrain)
              state.awaitDrain--;
            if (state.awaitDrain === 0 && EElistenerCount(src, "data")) {
              state.flowing = true;
              flow(src);
            }
          };
        }
        Readable.prototype.unpipe = function(dest) {
          var state = this._readableState;
          var unpipeInfo = { hasUnpiped: false };
          if (state.pipesCount === 0)
            return this;
          if (state.pipesCount === 1) {
            if (dest && dest !== state.pipes)
              return this;
            if (!dest)
              dest = state.pipes;
            state.pipes = null;
            state.pipesCount = 0;
            state.flowing = false;
            if (dest)
              dest.emit("unpipe", this, unpipeInfo);
            return this;
          }
          if (!dest) {
            var dests = state.pipes;
            var len = state.pipesCount;
            state.pipes = null;
            state.pipesCount = 0;
            state.flowing = false;
            for (var i = 0; i < len; i++) {
              dests[i].emit("unpipe", this, unpipeInfo);
            }
            return this;
          }
          var index = indexOf(state.pipes, dest);
          if (index === -1)
            return this;
          state.pipes.splice(index, 1);
          state.pipesCount -= 1;
          if (state.pipesCount === 1)
            state.pipes = state.pipes[0];
          dest.emit("unpipe", this, unpipeInfo);
          return this;
        };
        Readable.prototype.on = function(ev, fn) {
          var res = Stream.prototype.on.call(this, ev, fn);
          if (ev === "data") {
            if (this._readableState.flowing !== false)
              this.resume();
          } else if (ev === "readable") {
            var state = this._readableState;
            if (!state.endEmitted && !state.readableListening) {
              state.readableListening = state.needReadable = true;
              state.emittedReadable = false;
              if (!state.reading) {
                pna.nextTick(nReadingNextTick, this);
              } else if (state.length) {
                emitReadable(this);
              }
            }
          }
          return res;
        };
        Readable.prototype.addListener = Readable.prototype.on;
        function nReadingNextTick(self2) {
          debug("readable nexttick read 0");
          self2.read(0);
        }
        Readable.prototype.resume = function() {
          var state = this._readableState;
          if (!state.flowing) {
            debug("resume");
            state.flowing = true;
            resume(this, state);
          }
          return this;
        };
        function resume(stream, state) {
          if (!state.resumeScheduled) {
            state.resumeScheduled = true;
            pna.nextTick(resume_, stream, state);
          }
        }
        function resume_(stream, state) {
          if (!state.reading) {
            debug("resume read 0");
            stream.read(0);
          }
          state.resumeScheduled = false;
          state.awaitDrain = 0;
          stream.emit("resume");
          flow(stream);
          if (state.flowing && !state.reading)
            stream.read(0);
        }
        Readable.prototype.pause = function() {
          debug("call pause flowing=%j", this._readableState.flowing);
          if (false !== this._readableState.flowing) {
            debug("pause");
            this._readableState.flowing = false;
            this.emit("pause");
          }
          return this;
        };
        function flow(stream) {
          var state = stream._readableState;
          debug("flow", state.flowing);
          while (state.flowing && stream.read() !== null) {
          }
        }
        Readable.prototype.wrap = function(stream) {
          var _this = this;
          var state = this._readableState;
          var paused = false;
          stream.on("end", function() {
            debug("wrapped end");
            if (state.decoder && !state.ended) {
              var chunk = state.decoder.end();
              if (chunk && chunk.length)
                _this.push(chunk);
            }
            _this.push(null);
          });
          stream.on("data", function(chunk) {
            debug("wrapped data");
            if (state.decoder)
              chunk = state.decoder.write(chunk);
            if (state.objectMode && (chunk === null || chunk === void 0))
              return;
            else if (!state.objectMode && (!chunk || !chunk.length))
              return;
            var ret = _this.push(chunk);
            if (!ret) {
              paused = true;
              stream.pause();
            }
          });
          for (var i in stream) {
            if (this[i] === void 0 && typeof stream[i] === "function") {
              this[i] = function(method) {
                return function() {
                  return stream[method].apply(stream, arguments);
                };
              }(i);
            }
          }
          for (var n = 0; n < kProxyEvents.length; n++) {
            stream.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));
          }
          this._read = function(n2) {
            debug("wrapped _read", n2);
            if (paused) {
              paused = false;
              stream.resume();
            }
          };
          return this;
        };
        Object.defineProperty(Readable.prototype, "readableHighWaterMark", {
          // making it explicit this property is not enumerable
          // because otherwise some prototype manipulation in
          // userland will fail
          enumerable: false,
          get: function() {
            return this._readableState.highWaterMark;
          }
        });
        Readable._fromList = fromList;
        function fromList(n, state) {
          if (state.length === 0)
            return null;
          var ret;
          if (state.objectMode)
            ret = state.buffer.shift();
          else if (!n || n >= state.length) {
            if (state.decoder)
              ret = state.buffer.join("");
            else if (state.buffer.length === 1)
              ret = state.buffer.head.data;
            else
              ret = state.buffer.concat(state.length);
            state.buffer.clear();
          } else {
            ret = fromListPartial(n, state.buffer, state.decoder);
          }
          return ret;
        }
        function fromListPartial(n, list, hasStrings) {
          var ret;
          if (n < list.head.data.length) {
            ret = list.head.data.slice(0, n);
            list.head.data = list.head.data.slice(n);
          } else if (n === list.head.data.length) {
            ret = list.shift();
          } else {
            ret = hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list);
          }
          return ret;
        }
        function copyFromBufferString(n, list) {
          var p = list.head;
          var c = 1;
          var ret = p.data;
          n -= ret.length;
          while (p = p.next) {
            var str = p.data;
            var nb = n > str.length ? str.length : n;
            if (nb === str.length)
              ret += str;
            else
              ret += str.slice(0, n);
            n -= nb;
            if (n === 0) {
              if (nb === str.length) {
                ++c;
                if (p.next)
                  list.head = p.next;
                else
                  list.head = list.tail = null;
              } else {
                list.head = p;
                p.data = str.slice(nb);
              }
              break;
            }
            ++c;
          }
          list.length -= c;
          return ret;
        }
        function copyFromBuffer(n, list) {
          var ret = Buffer.allocUnsafe(n);
          var p = list.head;
          var c = 1;
          p.data.copy(ret);
          n -= p.data.length;
          while (p = p.next) {
            var buf = p.data;
            var nb = n > buf.length ? buf.length : n;
            buf.copy(ret, ret.length - n, 0, nb);
            n -= nb;
            if (n === 0) {
              if (nb === buf.length) {
                ++c;
                if (p.next)
                  list.head = p.next;
                else
                  list.head = list.tail = null;
              } else {
                list.head = p;
                p.data = buf.slice(nb);
              }
              break;
            }
            ++c;
          }
          list.length -= c;
          return ret;
        }
        function endReadable(stream) {
          var state = stream._readableState;
          if (state.length > 0)
            throw new Error('"endReadable()" called on non-empty stream');
          if (!state.endEmitted) {
            state.ended = true;
            pna.nextTick(endReadableNT, state, stream);
          }
        }
        function endReadableNT(state, stream) {
          if (!state.endEmitted && state.length === 0) {
            state.endEmitted = true;
            stream.readable = false;
            stream.emit("end");
          }
        }
        function indexOf(xs, x) {
          for (var i = 0, l = xs.length; i < l; i++) {
            if (xs[i] === x)
              return i;
          }
          return -1;
        }
      }).call(this, require2("_process"), typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, { "./_stream_duplex": 38, "./internal/streams/BufferList": 43, "./internal/streams/destroy": 44, "./internal/streams/stream": 45, "_process": 32, "core-util-is": 19, "events": 21, "inherits": 24, "isarray": 26, "process-nextick-args": 31, "safe-buffer": 46, "string_decoder/": 47, "util": 14 }], 41: [function(require2, module2, exports2) {
      module2.exports = Transform;
      var Duplex = require2("./_stream_duplex");
      var util = Object.create(require2("core-util-is"));
      util.inherits = require2("inherits");
      util.inherits(Transform, Duplex);
      function afterTransform(er, data) {
        var ts = this._transformState;
        ts.transforming = false;
        var cb = ts.writecb;
        if (!cb) {
          return this.emit("error", new Error("write callback called multiple times"));
        }
        ts.writechunk = null;
        ts.writecb = null;
        if (data != null)
          this.push(data);
        cb(er);
        var rs = this._readableState;
        rs.reading = false;
        if (rs.needReadable || rs.length < rs.highWaterMark) {
          this._read(rs.highWaterMark);
        }
      }
      function Transform(options) {
        if (!(this instanceof Transform))
          return new Transform(options);
        Duplex.call(this, options);
        this._transformState = {
          afterTransform: afterTransform.bind(this),
          needTransform: false,
          transforming: false,
          writecb: null,
          writechunk: null,
          writeencoding: null
        };
        this._readableState.needReadable = true;
        this._readableState.sync = false;
        if (options) {
          if (typeof options.transform === "function")
            this._transform = options.transform;
          if (typeof options.flush === "function")
            this._flush = options.flush;
        }
        this.on("prefinish", prefinish);
      }
      function prefinish() {
        var _this = this;
        if (typeof this._flush === "function") {
          this._flush(function(er, data) {
            done(_this, er, data);
          });
        } else {
          done(this, null, null);
        }
      }
      Transform.prototype.push = function(chunk, encoding) {
        this._transformState.needTransform = false;
        return Duplex.prototype.push.call(this, chunk, encoding);
      };
      Transform.prototype._transform = function(chunk, encoding, cb) {
        throw new Error("_transform() is not implemented");
      };
      Transform.prototype._write = function(chunk, encoding, cb) {
        var ts = this._transformState;
        ts.writecb = cb;
        ts.writechunk = chunk;
        ts.writeencoding = encoding;
        if (!ts.transforming) {
          var rs = this._readableState;
          if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark)
            this._read(rs.highWaterMark);
        }
      };
      Transform.prototype._read = function(n) {
        var ts = this._transformState;
        if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
          ts.transforming = true;
          this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
        } else {
          ts.needTransform = true;
        }
      };
      Transform.prototype._destroy = function(err, cb) {
        var _this2 = this;
        Duplex.prototype._destroy.call(this, err, function(err2) {
          cb(err2);
          _this2.emit("close");
        });
      };
      function done(stream, er, data) {
        if (er)
          return stream.emit("error", er);
        if (data != null)
          stream.push(data);
        if (stream._writableState.length)
          throw new Error("Calling transform done when ws.length != 0");
        if (stream._transformState.transforming)
          throw new Error("Calling transform done when still transforming");
        return stream.push(null);
      }
    }, { "./_stream_duplex": 38, "core-util-is": 19, "inherits": 24 }], 42: [function(require2, module2, exports2) {
      (function(process, global, setImmediate) {
        var pna = require2("process-nextick-args");
        module2.exports = Writable;
        function CorkedRequest(state) {
          var _this = this;
          this.next = null;
          this.entry = null;
          this.finish = function() {
            onCorkedFinish(_this, state);
          };
        }
        var asyncWrite = !process.browser && ["v0.10", "v0.9."].indexOf(process.version.slice(0, 5)) > -1 ? setImmediate : pna.nextTick;
        var Duplex;
        Writable.WritableState = WritableState;
        var util = Object.create(require2("core-util-is"));
        util.inherits = require2("inherits");
        var internalUtil = {
          deprecate: require2("util-deprecate")
        };
        var Stream = require2("./internal/streams/stream");
        var Buffer = require2("safe-buffer").Buffer;
        var OurUint8Array = global.Uint8Array || function() {
        };
        function _uint8ArrayToBuffer(chunk) {
          return Buffer.from(chunk);
        }
        function _isUint8Array(obj) {
          return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
        }
        var destroyImpl = require2("./internal/streams/destroy");
        util.inherits(Writable, Stream);
        function nop() {
        }
        function WritableState(options, stream) {
          Duplex = Duplex || require2("./_stream_duplex");
          options = options || {};
          var isDuplex = stream instanceof Duplex;
          this.objectMode = !!options.objectMode;
          if (isDuplex)
            this.objectMode = this.objectMode || !!options.writableObjectMode;
          var hwm = options.highWaterMark;
          var writableHwm = options.writableHighWaterMark;
          var defaultHwm = this.objectMode ? 16 : 16 * 1024;
          if (hwm || hwm === 0)
            this.highWaterMark = hwm;
          else if (isDuplex && (writableHwm || writableHwm === 0))
            this.highWaterMark = writableHwm;
          else
            this.highWaterMark = defaultHwm;
          this.highWaterMark = Math.floor(this.highWaterMark);
          this.finalCalled = false;
          this.needDrain = false;
          this.ending = false;
          this.ended = false;
          this.finished = false;
          this.destroyed = false;
          var noDecode = options.decodeStrings === false;
          this.decodeStrings = !noDecode;
          this.defaultEncoding = options.defaultEncoding || "utf8";
          this.length = 0;
          this.writing = false;
          this.corked = 0;
          this.sync = true;
          this.bufferProcessing = false;
          this.onwrite = function(er) {
            onwrite(stream, er);
          };
          this.writecb = null;
          this.writelen = 0;
          this.bufferedRequest = null;
          this.lastBufferedRequest = null;
          this.pendingcb = 0;
          this.prefinished = false;
          this.errorEmitted = false;
          this.bufferedRequestCount = 0;
          this.corkedRequestsFree = new CorkedRequest(this);
        }
        WritableState.prototype.getBuffer = function getBuffer() {
          var current = this.bufferedRequest;
          var out = [];
          while (current) {
            out.push(current);
            current = current.next;
          }
          return out;
        };
        (function() {
          try {
            Object.defineProperty(WritableState.prototype, "buffer", {
              get: internalUtil.deprecate(function() {
                return this.getBuffer();
              }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
            });
          } catch (_) {
          }
        })();
        var realHasInstance;
        if (typeof Symbol === "function" && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === "function") {
          realHasInstance = Function.prototype[Symbol.hasInstance];
          Object.defineProperty(Writable, Symbol.hasInstance, {
            value: function(object) {
              if (realHasInstance.call(this, object))
                return true;
              if (this !== Writable)
                return false;
              return object && object._writableState instanceof WritableState;
            }
          });
        } else {
          realHasInstance = function(object) {
            return object instanceof this;
          };
        }
        function Writable(options) {
          Duplex = Duplex || require2("./_stream_duplex");
          if (!realHasInstance.call(Writable, this) && !(this instanceof Duplex)) {
            return new Writable(options);
          }
          this._writableState = new WritableState(options, this);
          this.writable = true;
          if (options) {
            if (typeof options.write === "function")
              this._write = options.write;
            if (typeof options.writev === "function")
              this._writev = options.writev;
            if (typeof options.destroy === "function")
              this._destroy = options.destroy;
            if (typeof options.final === "function")
              this._final = options.final;
          }
          Stream.call(this);
        }
        Writable.prototype.pipe = function() {
          this.emit("error", new Error("Cannot pipe, not readable"));
        };
        function writeAfterEnd(stream, cb) {
          var er = new Error("write after end");
          stream.emit("error", er);
          pna.nextTick(cb, er);
        }
        function validChunk(stream, state, chunk, cb) {
          var valid = true;
          var er = false;
          if (chunk === null) {
            er = new TypeError("May not write null values to stream");
          } else if (typeof chunk !== "string" && chunk !== void 0 && !state.objectMode) {
            er = new TypeError("Invalid non-string/buffer chunk");
          }
          if (er) {
            stream.emit("error", er);
            pna.nextTick(cb, er);
            valid = false;
          }
          return valid;
        }
        Writable.prototype.write = function(chunk, encoding, cb) {
          var state = this._writableState;
          var ret = false;
          var isBuf = !state.objectMode && _isUint8Array(chunk);
          if (isBuf && !Buffer.isBuffer(chunk)) {
            chunk = _uint8ArrayToBuffer(chunk);
          }
          if (typeof encoding === "function") {
            cb = encoding;
            encoding = null;
          }
          if (isBuf)
            encoding = "buffer";
          else if (!encoding)
            encoding = state.defaultEncoding;
          if (typeof cb !== "function")
            cb = nop;
          if (state.ended)
            writeAfterEnd(this, cb);
          else if (isBuf || validChunk(this, state, chunk, cb)) {
            state.pendingcb++;
            ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
          }
          return ret;
        };
        Writable.prototype.cork = function() {
          var state = this._writableState;
          state.corked++;
        };
        Writable.prototype.uncork = function() {
          var state = this._writableState;
          if (state.corked) {
            state.corked--;
            if (!state.writing && !state.corked && !state.finished && !state.bufferProcessing && state.bufferedRequest)
              clearBuffer(this, state);
          }
        };
        Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
          if (typeof encoding === "string")
            encoding = encoding.toLowerCase();
          if (!(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((encoding + "").toLowerCase()) > -1))
            throw new TypeError("Unknown encoding: " + encoding);
          this._writableState.defaultEncoding = encoding;
          return this;
        };
        function decodeChunk(state, chunk, encoding) {
          if (!state.objectMode && state.decodeStrings !== false && typeof chunk === "string") {
            chunk = Buffer.from(chunk, encoding);
          }
          return chunk;
        }
        Object.defineProperty(Writable.prototype, "writableHighWaterMark", {
          // making it explicit this property is not enumerable
          // because otherwise some prototype manipulation in
          // userland will fail
          enumerable: false,
          get: function() {
            return this._writableState.highWaterMark;
          }
        });
        function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
          if (!isBuf) {
            var newChunk = decodeChunk(state, chunk, encoding);
            if (chunk !== newChunk) {
              isBuf = true;
              encoding = "buffer";
              chunk = newChunk;
            }
          }
          var len = state.objectMode ? 1 : chunk.length;
          state.length += len;
          var ret = state.length < state.highWaterMark;
          if (!ret)
            state.needDrain = true;
          if (state.writing || state.corked) {
            var last = state.lastBufferedRequest;
            state.lastBufferedRequest = {
              chunk,
              encoding,
              isBuf,
              callback: cb,
              next: null
            };
            if (last) {
              last.next = state.lastBufferedRequest;
            } else {
              state.bufferedRequest = state.lastBufferedRequest;
            }
            state.bufferedRequestCount += 1;
          } else {
            doWrite(stream, state, false, len, chunk, encoding, cb);
          }
          return ret;
        }
        function doWrite(stream, state, writev, len, chunk, encoding, cb) {
          state.writelen = len;
          state.writecb = cb;
          state.writing = true;
          state.sync = true;
          if (writev)
            stream._writev(chunk, state.onwrite);
          else
            stream._write(chunk, encoding, state.onwrite);
          state.sync = false;
        }
        function onwriteError(stream, state, sync, er, cb) {
          --state.pendingcb;
          if (sync) {
            pna.nextTick(cb, er);
            pna.nextTick(finishMaybe, stream, state);
            stream._writableState.errorEmitted = true;
            stream.emit("error", er);
          } else {
            cb(er);
            stream._writableState.errorEmitted = true;
            stream.emit("error", er);
            finishMaybe(stream, state);
          }
        }
        function onwriteStateUpdate(state) {
          state.writing = false;
          state.writecb = null;
          state.length -= state.writelen;
          state.writelen = 0;
        }
        function onwrite(stream, er) {
          var state = stream._writableState;
          var sync = state.sync;
          var cb = state.writecb;
          onwriteStateUpdate(state);
          if (er)
            onwriteError(stream, state, sync, er, cb);
          else {
            var finished = needFinish(state);
            if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
              clearBuffer(stream, state);
            }
            if (sync) {
              asyncWrite(afterWrite, stream, state, finished, cb);
            } else {
              afterWrite(stream, state, finished, cb);
            }
          }
        }
        function afterWrite(stream, state, finished, cb) {
          if (!finished)
            onwriteDrain(stream, state);
          state.pendingcb--;
          cb();
          finishMaybe(stream, state);
        }
        function onwriteDrain(stream, state) {
          if (state.length === 0 && state.needDrain) {
            state.needDrain = false;
            stream.emit("drain");
          }
        }
        function clearBuffer(stream, state) {
          state.bufferProcessing = true;
          var entry = state.bufferedRequest;
          if (stream._writev && entry && entry.next) {
            var l = state.bufferedRequestCount;
            var buffer = new Array(l);
            var holder = state.corkedRequestsFree;
            holder.entry = entry;
            var count = 0;
            var allBuffers = true;
            while (entry) {
              buffer[count] = entry;
              if (!entry.isBuf)
                allBuffers = false;
              entry = entry.next;
              count += 1;
            }
            buffer.allBuffers = allBuffers;
            doWrite(stream, state, true, state.length, buffer, "", holder.finish);
            state.pendingcb++;
            state.lastBufferedRequest = null;
            if (holder.next) {
              state.corkedRequestsFree = holder.next;
              holder.next = null;
            } else {
              state.corkedRequestsFree = new CorkedRequest(state);
            }
            state.bufferedRequestCount = 0;
          } else {
            while (entry) {
              var chunk = entry.chunk;
              var encoding = entry.encoding;
              var cb = entry.callback;
              var len = state.objectMode ? 1 : chunk.length;
              doWrite(stream, state, false, len, chunk, encoding, cb);
              entry = entry.next;
              state.bufferedRequestCount--;
              if (state.writing) {
                break;
              }
            }
            if (entry === null)
              state.lastBufferedRequest = null;
          }
          state.bufferedRequest = entry;
          state.bufferProcessing = false;
        }
        Writable.prototype._write = function(chunk, encoding, cb) {
          cb(new Error("_write() is not implemented"));
        };
        Writable.prototype._writev = null;
        Writable.prototype.end = function(chunk, encoding, cb) {
          var state = this._writableState;
          if (typeof chunk === "function") {
            cb = chunk;
            chunk = null;
            encoding = null;
          } else if (typeof encoding === "function") {
            cb = encoding;
            encoding = null;
          }
          if (chunk !== null && chunk !== void 0)
            this.write(chunk, encoding);
          if (state.corked) {
            state.corked = 1;
            this.uncork();
          }
          if (!state.ending && !state.finished)
            endWritable(this, state, cb);
        };
        function needFinish(state) {
          return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
        }
        function callFinal(stream, state) {
          stream._final(function(err) {
            state.pendingcb--;
            if (err) {
              stream.emit("error", err);
            }
            state.prefinished = true;
            stream.emit("prefinish");
            finishMaybe(stream, state);
          });
        }
        function prefinish(stream, state) {
          if (!state.prefinished && !state.finalCalled) {
            if (typeof stream._final === "function") {
              state.pendingcb++;
              state.finalCalled = true;
              pna.nextTick(callFinal, stream, state);
            } else {
              state.prefinished = true;
              stream.emit("prefinish");
            }
          }
        }
        function finishMaybe(stream, state) {
          var need = needFinish(state);
          if (need) {
            prefinish(stream, state);
            if (state.pendingcb === 0) {
              state.finished = true;
              stream.emit("finish");
            }
          }
          return need;
        }
        function endWritable(stream, state, cb) {
          state.ending = true;
          finishMaybe(stream, state);
          if (cb) {
            if (state.finished)
              pna.nextTick(cb);
            else
              stream.once("finish", cb);
          }
          state.ended = true;
          stream.writable = false;
        }
        function onCorkedFinish(corkReq, state, err) {
          var entry = corkReq.entry;
          corkReq.entry = null;
          while (entry) {
            var cb = entry.callback;
            state.pendingcb--;
            cb(err);
            entry = entry.next;
          }
          if (state.corkedRequestsFree) {
            state.corkedRequestsFree.next = corkReq;
          } else {
            state.corkedRequestsFree = corkReq;
          }
        }
        Object.defineProperty(Writable.prototype, "destroyed", {
          get: function() {
            if (this._writableState === void 0) {
              return false;
            }
            return this._writableState.destroyed;
          },
          set: function(value) {
            if (!this._writableState) {
              return;
            }
            this._writableState.destroyed = value;
          }
        });
        Writable.prototype.destroy = destroyImpl.destroy;
        Writable.prototype._undestroy = destroyImpl.undestroy;
        Writable.prototype._destroy = function(err, cb) {
          this.end();
          cb(err);
        };
      }).call(this, require2("_process"), typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require2("timers").setImmediate);
    }, { "./_stream_duplex": 38, "./internal/streams/destroy": 44, "./internal/streams/stream": 45, "_process": 32, "core-util-is": 19, "inherits": 24, "process-nextick-args": 31, "safe-buffer": 46, "timers": 57, "util-deprecate": 61 }], 43: [function(require2, module2, exports2) {
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      var Buffer = require2("safe-buffer").Buffer;
      var util = require2("util");
      function copyBuffer(src, target, offset) {
        src.copy(target, offset);
      }
      module2.exports = function() {
        function BufferList() {
          _classCallCheck(this, BufferList);
          this.head = null;
          this.tail = null;
          this.length = 0;
        }
        BufferList.prototype.push = function push(v) {
          var entry = { data: v, next: null };
          if (this.length > 0)
            this.tail.next = entry;
          else
            this.head = entry;
          this.tail = entry;
          ++this.length;
        };
        BufferList.prototype.unshift = function unshift(v) {
          var entry = { data: v, next: this.head };
          if (this.length === 0)
            this.tail = entry;
          this.head = entry;
          ++this.length;
        };
        BufferList.prototype.shift = function shift() {
          if (this.length === 0)
            return;
          var ret = this.head.data;
          if (this.length === 1)
            this.head = this.tail = null;
          else
            this.head = this.head.next;
          --this.length;
          return ret;
        };
        BufferList.prototype.clear = function clear() {
          this.head = this.tail = null;
          this.length = 0;
        };
        BufferList.prototype.join = function join(s) {
          if (this.length === 0)
            return "";
          var p = this.head;
          var ret = "" + p.data;
          while (p = p.next) {
            ret += s + p.data;
          }
          return ret;
        };
        BufferList.prototype.concat = function concat(n) {
          if (this.length === 0)
            return Buffer.alloc(0);
          if (this.length === 1)
            return this.head.data;
          var ret = Buffer.allocUnsafe(n >>> 0);
          var p = this.head;
          var i = 0;
          while (p) {
            copyBuffer(p.data, ret, i);
            i += p.data.length;
            p = p.next;
          }
          return ret;
        };
        return BufferList;
      }();
      if (util && util.inspect && util.inspect.custom) {
        module2.exports.prototype[util.inspect.custom] = function() {
          var obj = util.inspect({ length: this.length });
          return this.constructor.name + " " + obj;
        };
      }
    }, { "safe-buffer": 46, "util": 14 }], 44: [function(require2, module2, exports2) {
      var pna = require2("process-nextick-args");
      function destroy(err, cb) {
        var _this = this;
        var readableDestroyed = this._readableState && this._readableState.destroyed;
        var writableDestroyed = this._writableState && this._writableState.destroyed;
        if (readableDestroyed || writableDestroyed) {
          if (cb) {
            cb(err);
          } else if (err && (!this._writableState || !this._writableState.errorEmitted)) {
            pna.nextTick(emitErrorNT, this, err);
          }
          return this;
        }
        if (this._readableState) {
          this._readableState.destroyed = true;
        }
        if (this._writableState) {
          this._writableState.destroyed = true;
        }
        this._destroy(err || null, function(err2) {
          if (!cb && err2) {
            pna.nextTick(emitErrorNT, _this, err2);
            if (_this._writableState) {
              _this._writableState.errorEmitted = true;
            }
          } else if (cb) {
            cb(err2);
          }
        });
        return this;
      }
      function undestroy() {
        if (this._readableState) {
          this._readableState.destroyed = false;
          this._readableState.reading = false;
          this._readableState.ended = false;
          this._readableState.endEmitted = false;
        }
        if (this._writableState) {
          this._writableState.destroyed = false;
          this._writableState.ended = false;
          this._writableState.ending = false;
          this._writableState.finished = false;
          this._writableState.errorEmitted = false;
        }
      }
      function emitErrorNT(self2, err) {
        self2.emit("error", err);
      }
      module2.exports = {
        destroy,
        undestroy
      };
    }, { "process-nextick-args": 31 }], 45: [function(require2, module2, exports2) {
      module2.exports = require2("events").EventEmitter;
    }, { "events": 21 }], 46: [function(require2, module2, exports2) {
      var buffer = require2("buffer");
      var Buffer = buffer.Buffer;
      function copyProps(src, dst) {
        for (var key in src) {
          dst[key] = src[key];
        }
      }
      if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
        module2.exports = buffer;
      } else {
        copyProps(buffer, exports2);
        exports2.Buffer = SafeBuffer;
      }
      function SafeBuffer(arg, encodingOrOffset, length) {
        return Buffer(arg, encodingOrOffset, length);
      }
      copyProps(Buffer, SafeBuffer);
      SafeBuffer.from = function(arg, encodingOrOffset, length) {
        if (typeof arg === "number") {
          throw new TypeError("Argument must not be a number");
        }
        return Buffer(arg, encodingOrOffset, length);
      };
      SafeBuffer.alloc = function(size, fill, encoding) {
        if (typeof size !== "number") {
          throw new TypeError("Argument must be a number");
        }
        var buf = Buffer(size);
        if (fill !== void 0) {
          if (typeof encoding === "string") {
            buf.fill(fill, encoding);
          } else {
            buf.fill(fill);
          }
        } else {
          buf.fill(0);
        }
        return buf;
      };
      SafeBuffer.allocUnsafe = function(size) {
        if (typeof size !== "number") {
          throw new TypeError("Argument must be a number");
        }
        return Buffer(size);
      };
      SafeBuffer.allocUnsafeSlow = function(size) {
        if (typeof size !== "number") {
          throw new TypeError("Argument must be a number");
        }
        return buffer.SlowBuffer(size);
      };
    }, { "buffer": 16 }], 47: [function(require2, module2, exports2) {
      var Buffer = require2("safe-buffer").Buffer;
      var isEncoding = Buffer.isEncoding || function(encoding) {
        encoding = "" + encoding;
        switch (encoding && encoding.toLowerCase()) {
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
            return true;
          default:
            return false;
        }
      };
      function _normalizeEncoding(enc) {
        if (!enc)
          return "utf8";
        var retried;
        while (true) {
          switch (enc) {
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
              return enc;
            default:
              if (retried)
                return;
              enc = ("" + enc).toLowerCase();
              retried = true;
          }
        }
      }
      function normalizeEncoding(enc) {
        var nenc = _normalizeEncoding(enc);
        if (typeof nenc !== "string" && (Buffer.isEncoding === isEncoding || !isEncoding(enc)))
          throw new Error("Unknown encoding: " + enc);
        return nenc || enc;
      }
      exports2.StringDecoder = StringDecoder;
      function StringDecoder(encoding) {
        this.encoding = normalizeEncoding(encoding);
        var nb;
        switch (this.encoding) {
          case "utf16le":
            this.text = utf16Text;
            this.end = utf16End;
            nb = 4;
            break;
          case "utf8":
            this.fillLast = utf8FillLast;
            nb = 4;
            break;
          case "base64":
            this.text = base64Text;
            this.end = base64End;
            nb = 3;
            break;
          default:
            this.write = simpleWrite;
            this.end = simpleEnd;
            return;
        }
        this.lastNeed = 0;
        this.lastTotal = 0;
        this.lastChar = Buffer.allocUnsafe(nb);
      }
      StringDecoder.prototype.write = function(buf) {
        if (buf.length === 0)
          return "";
        var r;
        var i;
        if (this.lastNeed) {
          r = this.fillLast(buf);
          if (r === void 0)
            return "";
          i = this.lastNeed;
          this.lastNeed = 0;
        } else {
          i = 0;
        }
        if (i < buf.length)
          return r ? r + this.text(buf, i) : this.text(buf, i);
        return r || "";
      };
      StringDecoder.prototype.end = utf8End;
      StringDecoder.prototype.text = utf8Text;
      StringDecoder.prototype.fillLast = function(buf) {
        if (this.lastNeed <= buf.length) {
          buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
          return this.lastChar.toString(this.encoding, 0, this.lastTotal);
        }
        buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
        this.lastNeed -= buf.length;
      };
      function utf8CheckByte(byte) {
        if (byte <= 127)
          return 0;
        else if (byte >> 5 === 6)
          return 2;
        else if (byte >> 4 === 14)
          return 3;
        else if (byte >> 3 === 30)
          return 4;
        return byte >> 6 === 2 ? -1 : -2;
      }
      function utf8CheckIncomplete(self2, buf, i) {
        var j = buf.length - 1;
        if (j < i)
          return 0;
        var nb = utf8CheckByte(buf[j]);
        if (nb >= 0) {
          if (nb > 0)
            self2.lastNeed = nb - 1;
          return nb;
        }
        if (--j < i || nb === -2)
          return 0;
        nb = utf8CheckByte(buf[j]);
        if (nb >= 0) {
          if (nb > 0)
            self2.lastNeed = nb - 2;
          return nb;
        }
        if (--j < i || nb === -2)
          return 0;
        nb = utf8CheckByte(buf[j]);
        if (nb >= 0) {
          if (nb > 0) {
            if (nb === 2)
              nb = 0;
            else
              self2.lastNeed = nb - 3;
          }
          return nb;
        }
        return 0;
      }
      function utf8CheckExtraBytes(self2, buf, p) {
        if ((buf[0] & 192) !== 128) {
          self2.lastNeed = 0;
          return "�";
        }
        if (self2.lastNeed > 1 && buf.length > 1) {
          if ((buf[1] & 192) !== 128) {
            self2.lastNeed = 1;
            return "�";
          }
          if (self2.lastNeed > 2 && buf.length > 2) {
            if ((buf[2] & 192) !== 128) {
              self2.lastNeed = 2;
              return "�";
            }
          }
        }
      }
      function utf8FillLast(buf) {
        var p = this.lastTotal - this.lastNeed;
        var r = utf8CheckExtraBytes(this, buf);
        if (r !== void 0)
          return r;
        if (this.lastNeed <= buf.length) {
          buf.copy(this.lastChar, p, 0, this.lastNeed);
          return this.lastChar.toString(this.encoding, 0, this.lastTotal);
        }
        buf.copy(this.lastChar, p, 0, buf.length);
        this.lastNeed -= buf.length;
      }
      function utf8Text(buf, i) {
        var total = utf8CheckIncomplete(this, buf, i);
        if (!this.lastNeed)
          return buf.toString("utf8", i);
        this.lastTotal = total;
        var end = buf.length - (total - this.lastNeed);
        buf.copy(this.lastChar, 0, end);
        return buf.toString("utf8", i, end);
      }
      function utf8End(buf) {
        var r = buf && buf.length ? this.write(buf) : "";
        if (this.lastNeed)
          return r + "�";
        return r;
      }
      function utf16Text(buf, i) {
        if ((buf.length - i) % 2 === 0) {
          var r = buf.toString("utf16le", i);
          if (r) {
            var c = r.charCodeAt(r.length - 1);
            if (c >= 55296 && c <= 56319) {
              this.lastNeed = 2;
              this.lastTotal = 4;
              this.lastChar[0] = buf[buf.length - 2];
              this.lastChar[1] = buf[buf.length - 1];
              return r.slice(0, -1);
            }
          }
          return r;
        }
        this.lastNeed = 1;
        this.lastTotal = 2;
        this.lastChar[0] = buf[buf.length - 1];
        return buf.toString("utf16le", i, buf.length - 1);
      }
      function utf16End(buf) {
        var r = buf && buf.length ? this.write(buf) : "";
        if (this.lastNeed) {
          var end = this.lastTotal - this.lastNeed;
          return r + this.lastChar.toString("utf16le", 0, end);
        }
        return r;
      }
      function base64Text(buf, i) {
        var n = (buf.length - i) % 3;
        if (n === 0)
          return buf.toString("base64", i);
        this.lastNeed = 3 - n;
        this.lastTotal = 3;
        if (n === 1) {
          this.lastChar[0] = buf[buf.length - 1];
        } else {
          this.lastChar[0] = buf[buf.length - 2];
          this.lastChar[1] = buf[buf.length - 1];
        }
        return buf.toString("base64", i, buf.length - n);
      }
      function base64End(buf) {
        var r = buf && buf.length ? this.write(buf) : "";
        if (this.lastNeed)
          return r + this.lastChar.toString("base64", 0, 3 - this.lastNeed);
        return r;
      }
      function simpleWrite(buf) {
        return buf.toString(this.encoding);
      }
      function simpleEnd(buf) {
        return buf && buf.length ? this.write(buf) : "";
      }
    }, { "safe-buffer": 46 }], 48: [function(require2, module2, exports2) {
      module2.exports = require2("./readable").PassThrough;
    }, { "./readable": 49 }], 49: [function(require2, module2, exports2) {
      exports2 = module2.exports = require2("./lib/_stream_readable.js");
      exports2.Stream = exports2;
      exports2.Readable = exports2;
      exports2.Writable = require2("./lib/_stream_writable.js");
      exports2.Duplex = require2("./lib/_stream_duplex.js");
      exports2.Transform = require2("./lib/_stream_transform.js");
      exports2.PassThrough = require2("./lib/_stream_passthrough.js");
    }, { "./lib/_stream_duplex.js": 38, "./lib/_stream_passthrough.js": 39, "./lib/_stream_readable.js": 40, "./lib/_stream_transform.js": 41, "./lib/_stream_writable.js": 42 }], 50: [function(require2, module2, exports2) {
      module2.exports = require2("./readable").Transform;
    }, { "./readable": 49 }], 51: [function(require2, module2, exports2) {
      module2.exports = require2("./lib/_stream_writable.js");
    }, { "./lib/_stream_writable.js": 42 }], 52: [function(require2, module2, exports2) {
      module2.exports = Stream;
      var EE = require2("events").EventEmitter;
      var inherits = require2("inherits");
      inherits(Stream, EE);
      Stream.Readable = require2("readable-stream/readable.js");
      Stream.Writable = require2("readable-stream/writable.js");
      Stream.Duplex = require2("readable-stream/duplex.js");
      Stream.Transform = require2("readable-stream/transform.js");
      Stream.PassThrough = require2("readable-stream/passthrough.js");
      Stream.Stream = Stream;
      function Stream() {
        EE.call(this);
      }
      Stream.prototype.pipe = function(dest, options) {
        var source = this;
        function ondata(chunk) {
          if (dest.writable) {
            if (false === dest.write(chunk) && source.pause) {
              source.pause();
            }
          }
        }
        source.on("data", ondata);
        function ondrain() {
          if (source.readable && source.resume) {
            source.resume();
          }
        }
        dest.on("drain", ondrain);
        if (!dest._isStdio && (!options || options.end !== false)) {
          source.on("end", onend);
          source.on("close", onclose);
        }
        var didOnEnd = false;
        function onend() {
          if (didOnEnd)
            return;
          didOnEnd = true;
          dest.end();
        }
        function onclose() {
          if (didOnEnd)
            return;
          didOnEnd = true;
          if (typeof dest.destroy === "function")
            dest.destroy();
        }
        function onerror(er) {
          cleanup();
          if (EE.listenerCount(this, "error") === 0) {
            throw er;
          }
        }
        source.on("error", onerror);
        dest.on("error", onerror);
        function cleanup() {
          source.removeListener("data", ondata);
          dest.removeListener("drain", ondrain);
          source.removeListener("end", onend);
          source.removeListener("close", onclose);
          source.removeListener("error", onerror);
          dest.removeListener("error", onerror);
          source.removeListener("end", cleanup);
          source.removeListener("close", cleanup);
          dest.removeListener("close", cleanup);
        }
        source.on("end", cleanup);
        source.on("close", cleanup);
        dest.on("close", cleanup);
        dest.emit("pipe", source);
        return dest;
      };
    }, { "events": 21, "inherits": 24, "readable-stream/duplex.js": 37, "readable-stream/passthrough.js": 48, "readable-stream/readable.js": 49, "readable-stream/transform.js": 50, "readable-stream/writable.js": 51 }], 53: [function(require2, module2, exports2) {
      (function(global) {
        var ClientRequest = require2("./lib/request");
        var response = require2("./lib/response");
        var extend = require2("xtend");
        var statusCodes = require2("builtin-status-codes");
        var url = require2("url");
        var http = exports2;
        http.request = function(opts, cb) {
          if (typeof opts === "string")
            opts = url.parse(opts);
          else
            opts = extend(opts);
          var defaultProtocol = global.location.protocol.search(/^https?:$/) === -1 ? "http:" : "";
          var protocol = opts.protocol || defaultProtocol;
          var host = opts.hostname || opts.host;
          var port = opts.port;
          var path = opts.path || "/";
          if (host && host.indexOf(":") !== -1)
            host = "[" + host + "]";
          opts.url = (host ? protocol + "//" + host : "") + (port ? ":" + port : "") + path;
          opts.method = (opts.method || "GET").toUpperCase();
          opts.headers = opts.headers || {};
          var req = new ClientRequest(opts);
          if (cb)
            req.on("response", cb);
          return req;
        };
        http.get = function get(opts, cb) {
          var req = http.request(opts, cb);
          req.end();
          return req;
        };
        http.ClientRequest = ClientRequest;
        http.IncomingMessage = response.IncomingMessage;
        http.Agent = function() {
        };
        http.Agent.defaultMaxSockets = 4;
        http.globalAgent = new http.Agent();
        http.STATUS_CODES = statusCodes;
        http.METHODS = [
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
      }).call(this, typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, { "./lib/request": 55, "./lib/response": 56, "builtin-status-codes": 17, "url": 59, "xtend": 65 }], 54: [function(require2, module2, exports2) {
      (function(global) {
        exports2.fetch = isFunction(global.fetch) && isFunction(global.ReadableStream);
        exports2.writableStream = isFunction(global.WritableStream);
        exports2.abortController = isFunction(global.AbortController);
        exports2.blobConstructor = false;
        try {
          new Blob([new ArrayBuffer(1)]);
          exports2.blobConstructor = true;
        } catch (e) {
        }
        var xhr;
        function getXHR() {
          if (xhr !== void 0)
            return xhr;
          if (global.XMLHttpRequest) {
            xhr = new global.XMLHttpRequest();
            try {
              xhr.open("GET", global.XDomainRequest ? "/" : "https://example.com");
            } catch (e) {
              xhr = null;
            }
          } else {
            xhr = null;
          }
          return xhr;
        }
        function checkTypeSupport(type) {
          var xhr2 = getXHR();
          if (!xhr2)
            return false;
          try {
            xhr2.responseType = type;
            return xhr2.responseType === type;
          } catch (e) {
          }
          return false;
        }
        var haveArrayBuffer = typeof global.ArrayBuffer !== "undefined";
        var haveSlice = haveArrayBuffer && isFunction(global.ArrayBuffer.prototype.slice);
        exports2.arraybuffer = exports2.fetch || haveArrayBuffer && checkTypeSupport("arraybuffer");
        exports2.msstream = !exports2.fetch && haveSlice && checkTypeSupport("ms-stream");
        exports2.mozchunkedarraybuffer = !exports2.fetch && haveArrayBuffer && checkTypeSupport("moz-chunked-arraybuffer");
        exports2.overrideMimeType = exports2.fetch || (getXHR() ? isFunction(getXHR().overrideMimeType) : false);
        exports2.vbArray = isFunction(global.VBArray);
        function isFunction(value) {
          return typeof value === "function";
        }
        xhr = null;
      }).call(this, typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {}], 55: [function(require2, module2, exports2) {
      (function(process, global, Buffer) {
        var capability = require2("./capability");
        var inherits = require2("inherits");
        var response = require2("./response");
        var stream = require2("readable-stream");
        var toArrayBuffer = require2("to-arraybuffer");
        var IncomingMessage = response.IncomingMessage;
        var rStates = response.readyStates;
        function decideMode(preferBinary, useFetch) {
          if (capability.fetch && useFetch) {
            return "fetch";
          } else if (capability.mozchunkedarraybuffer) {
            return "moz-chunked-arraybuffer";
          } else if (capability.msstream) {
            return "ms-stream";
          } else if (capability.arraybuffer && preferBinary) {
            return "arraybuffer";
          } else if (capability.vbArray && preferBinary) {
            return "text:vbarray";
          } else {
            return "text";
          }
        }
        var ClientRequest = module2.exports = function(opts) {
          var self2 = this;
          stream.Writable.call(self2);
          self2._opts = opts;
          self2._body = [];
          self2._headers = {};
          if (opts.auth)
            self2.setHeader("Authorization", "Basic " + new Buffer(opts.auth).toString("base64"));
          Object.keys(opts.headers).forEach(function(name) {
            self2.setHeader(name, opts.headers[name]);
          });
          var preferBinary;
          var useFetch = true;
          if (opts.mode === "disable-fetch" || "requestTimeout" in opts && !capability.abortController) {
            useFetch = false;
            preferBinary = true;
          } else if (opts.mode === "prefer-streaming") {
            preferBinary = false;
          } else if (opts.mode === "allow-wrong-content-type") {
            preferBinary = !capability.overrideMimeType;
          } else if (!opts.mode || opts.mode === "default" || opts.mode === "prefer-fast") {
            preferBinary = true;
          } else {
            throw new Error("Invalid value for opts.mode");
          }
          self2._mode = decideMode(preferBinary, useFetch);
          self2._fetchTimer = null;
          self2.on("finish", function() {
            self2._onFinish();
          });
        };
        inherits(ClientRequest, stream.Writable);
        ClientRequest.prototype.setHeader = function(name, value) {
          var self2 = this;
          var lowerName = name.toLowerCase();
          if (unsafeHeaders.indexOf(lowerName) !== -1)
            return;
          self2._headers[lowerName] = {
            name,
            value
          };
        };
        ClientRequest.prototype.getHeader = function(name) {
          var header = this._headers[name.toLowerCase()];
          if (header)
            return header.value;
          return null;
        };
        ClientRequest.prototype.removeHeader = function(name) {
          var self2 = this;
          delete self2._headers[name.toLowerCase()];
        };
        ClientRequest.prototype._onFinish = function() {
          var self2 = this;
          if (self2._destroyed)
            return;
          var opts = self2._opts;
          var headersObj = self2._headers;
          var body = null;
          if (opts.method !== "GET" && opts.method !== "HEAD") {
            if (capability.arraybuffer) {
              body = toArrayBuffer(Buffer.concat(self2._body));
            } else if (capability.blobConstructor) {
              body = new global.Blob(self2._body.map(function(buffer) {
                return toArrayBuffer(buffer);
              }), {
                type: (headersObj["content-type"] || {}).value || ""
              });
            } else {
              body = Buffer.concat(self2._body).toString();
            }
          }
          var headersList = [];
          Object.keys(headersObj).forEach(function(keyName) {
            var name = headersObj[keyName].name;
            var value = headersObj[keyName].value;
            if (Array.isArray(value)) {
              value.forEach(function(v) {
                headersList.push([name, v]);
              });
            } else {
              headersList.push([name, value]);
            }
          });
          if (self2._mode === "fetch") {
            var signal = null;
            if (capability.abortController) {
              var controller = new AbortController();
              signal = controller.signal;
              self2._fetchAbortController = controller;
              if ("requestTimeout" in opts && opts.requestTimeout !== 0) {
                self2._fetchTimer = global.setTimeout(function() {
                  self2.emit("requestTimeout");
                  if (self2._fetchAbortController)
                    self2._fetchAbortController.abort();
                }, opts.requestTimeout);
              }
            }
            global.fetch(self2._opts.url, {
              method: self2._opts.method,
              headers: headersList,
              body: body || void 0,
              mode: "cors",
              credentials: opts.withCredentials ? "include" : "same-origin",
              signal
            }).then(function(response2) {
              self2._fetchResponse = response2;
              self2._connect();
            }, function(reason) {
              global.clearTimeout(self2._fetchTimer);
              if (!self2._destroyed)
                self2.emit("error", reason);
            });
          } else {
            var xhr = self2._xhr = new global.XMLHttpRequest();
            try {
              xhr.open(self2._opts.method, self2._opts.url, true);
            } catch (err) {
              process.nextTick(function() {
                self2.emit("error", err);
              });
              return;
            }
            if ("responseType" in xhr)
              xhr.responseType = self2._mode.split(":")[0];
            if ("withCredentials" in xhr)
              xhr.withCredentials = !!opts.withCredentials;
            if (self2._mode === "text" && "overrideMimeType" in xhr)
              xhr.overrideMimeType("text/plain; charset=x-user-defined");
            if ("requestTimeout" in opts) {
              xhr.timeout = opts.requestTimeout;
              xhr.ontimeout = function() {
                self2.emit("requestTimeout");
              };
            }
            headersList.forEach(function(header) {
              xhr.setRequestHeader(header[0], header[1]);
            });
            self2._response = null;
            xhr.onreadystatechange = function() {
              switch (xhr.readyState) {
                case rStates.LOADING:
                case rStates.DONE:
                  self2._onXHRProgress();
                  break;
              }
            };
            if (self2._mode === "moz-chunked-arraybuffer") {
              xhr.onprogress = function() {
                self2._onXHRProgress();
              };
            }
            xhr.onerror = function() {
              if (self2._destroyed)
                return;
              self2.emit("error", new Error("XHR error"));
            };
            try {
              xhr.send(body);
            } catch (err) {
              process.nextTick(function() {
                self2.emit("error", err);
              });
              return;
            }
          }
        };
        function statusValid(xhr) {
          try {
            var status = xhr.status;
            return status !== null && status !== 0;
          } catch (e) {
            return false;
          }
        }
        ClientRequest.prototype._onXHRProgress = function() {
          var self2 = this;
          if (!statusValid(self2._xhr) || self2._destroyed)
            return;
          if (!self2._response)
            self2._connect();
          self2._response._onXHRProgress();
        };
        ClientRequest.prototype._connect = function() {
          var self2 = this;
          if (self2._destroyed)
            return;
          self2._response = new IncomingMessage(self2._xhr, self2._fetchResponse, self2._mode, self2._fetchTimer);
          self2._response.on("error", function(err) {
            self2.emit("error", err);
          });
          self2.emit("response", self2._response);
        };
        ClientRequest.prototype._write = function(chunk, encoding, cb) {
          var self2 = this;
          self2._body.push(chunk);
          cb();
        };
        ClientRequest.prototype.abort = ClientRequest.prototype.destroy = function() {
          var self2 = this;
          self2._destroyed = true;
          global.clearTimeout(self2._fetchTimer);
          if (self2._response)
            self2._response._destroyed = true;
          if (self2._xhr)
            self2._xhr.abort();
          else if (self2._fetchAbortController)
            self2._fetchAbortController.abort();
        };
        ClientRequest.prototype.end = function(data, encoding, cb) {
          var self2 = this;
          if (typeof data === "function") {
            cb = data;
            data = void 0;
          }
          stream.Writable.prototype.end.call(self2, data, encoding, cb);
        };
        ClientRequest.prototype.flushHeaders = function() {
        };
        ClientRequest.prototype.setTimeout = function() {
        };
        ClientRequest.prototype.setNoDelay = function() {
        };
        ClientRequest.prototype.setSocketKeepAlive = function() {
        };
        var unsafeHeaders = [
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
      }).call(this, require2("_process"), typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require2("buffer").Buffer);
    }, { "./capability": 54, "./response": 56, "_process": 32, "buffer": 16, "inherits": 24, "readable-stream": 49, "to-arraybuffer": 58 }], 56: [function(require2, module2, exports2) {
      (function(process, global, Buffer) {
        var capability = require2("./capability");
        var inherits = require2("inherits");
        var stream = require2("readable-stream");
        var rStates = exports2.readyStates = {
          UNSENT: 0,
          OPENED: 1,
          HEADERS_RECEIVED: 2,
          LOADING: 3,
          DONE: 4
        };
        var IncomingMessage = exports2.IncomingMessage = function(xhr, response, mode, fetchTimer) {
          var self2 = this;
          stream.Readable.call(self2);
          self2._mode = mode;
          self2.headers = {};
          self2.rawHeaders = [];
          self2.trailers = {};
          self2.rawTrailers = [];
          self2.on("end", function() {
            process.nextTick(function() {
              self2.emit("close");
            });
          });
          if (mode === "fetch") {
            let read = function() {
              reader.read().then(function(result) {
                if (self2._destroyed)
                  return;
                if (result.done) {
                  global.clearTimeout(fetchTimer);
                  self2.push(null);
                  return;
                }
                self2.push(new Buffer(result.value));
                read();
              }).catch(function(err) {
                global.clearTimeout(fetchTimer);
                if (!self2._destroyed)
                  self2.emit("error", err);
              });
            };
            self2._fetchResponse = response;
            self2.url = response.url;
            self2.statusCode = response.status;
            self2.statusMessage = response.statusText;
            response.headers.forEach(function(header, key) {
              self2.headers[key.toLowerCase()] = header;
              self2.rawHeaders.push(key, header);
            });
            if (capability.writableStream) {
              var writable = new WritableStream({
                write: function(chunk) {
                  return new Promise(function(resolve, reject) {
                    if (self2._destroyed) {
                      reject();
                    } else if (self2.push(new Buffer(chunk))) {
                      resolve();
                    } else {
                      self2._resumeFetch = resolve;
                    }
                  });
                },
                close: function() {
                  global.clearTimeout(fetchTimer);
                  if (!self2._destroyed)
                    self2.push(null);
                },
                abort: function(err) {
                  if (!self2._destroyed)
                    self2.emit("error", err);
                }
              });
              try {
                response.body.pipeTo(writable).catch(function(err) {
                  global.clearTimeout(fetchTimer);
                  if (!self2._destroyed)
                    self2.emit("error", err);
                });
                return;
              } catch (e) {
              }
            }
            var reader = response.body.getReader();
            read();
          } else {
            self2._xhr = xhr;
            self2._pos = 0;
            self2.url = xhr.responseURL;
            self2.statusCode = xhr.status;
            self2.statusMessage = xhr.statusText;
            var headers = xhr.getAllResponseHeaders().split(/\r?\n/);
            headers.forEach(function(header) {
              var matches = header.match(/^([^:]+):\s*(.*)/);
              if (matches) {
                var key = matches[1].toLowerCase();
                if (key === "set-cookie") {
                  if (self2.headers[key] === void 0) {
                    self2.headers[key] = [];
                  }
                  self2.headers[key].push(matches[2]);
                } else if (self2.headers[key] !== void 0) {
                  self2.headers[key] += ", " + matches[2];
                } else {
                  self2.headers[key] = matches[2];
                }
                self2.rawHeaders.push(matches[1], matches[2]);
              }
            });
            self2._charset = "x-user-defined";
            if (!capability.overrideMimeType) {
              var mimeType = self2.rawHeaders["mime-type"];
              if (mimeType) {
                var charsetMatch = mimeType.match(/;\s*charset=([^;])(;|$)/);
                if (charsetMatch) {
                  self2._charset = charsetMatch[1].toLowerCase();
                }
              }
              if (!self2._charset)
                self2._charset = "utf-8";
            }
          }
        };
        inherits(IncomingMessage, stream.Readable);
        IncomingMessage.prototype._read = function() {
          var self2 = this;
          var resolve = self2._resumeFetch;
          if (resolve) {
            self2._resumeFetch = null;
            resolve();
          }
        };
        IncomingMessage.prototype._onXHRProgress = function() {
          var self2 = this;
          var xhr = self2._xhr;
          var response = null;
          switch (self2._mode) {
            case "text:vbarray":
              if (xhr.readyState !== rStates.DONE)
                break;
              try {
                response = new global.VBArray(xhr.responseBody).toArray();
              } catch (e) {
              }
              if (response !== null) {
                self2.push(new Buffer(response));
                break;
              }
            case "text":
              try {
                response = xhr.responseText;
              } catch (e) {
                self2._mode = "text:vbarray";
                break;
              }
              if (response.length > self2._pos) {
                var newData = response.substr(self2._pos);
                if (self2._charset === "x-user-defined") {
                  var buffer = new Buffer(newData.length);
                  for (var i = 0; i < newData.length; i++)
                    buffer[i] = newData.charCodeAt(i) & 255;
                  self2.push(buffer);
                } else {
                  self2.push(newData, self2._charset);
                }
                self2._pos = response.length;
              }
              break;
            case "arraybuffer":
              if (xhr.readyState !== rStates.DONE || !xhr.response)
                break;
              response = xhr.response;
              self2.push(new Buffer(new Uint8Array(response)));
              break;
            case "moz-chunked-arraybuffer":
              response = xhr.response;
              if (xhr.readyState !== rStates.LOADING || !response)
                break;
              self2.push(new Buffer(new Uint8Array(response)));
              break;
            case "ms-stream":
              response = xhr.response;
              if (xhr.readyState !== rStates.LOADING)
                break;
              var reader = new global.MSStreamReader();
              reader.onprogress = function() {
                if (reader.result.byteLength > self2._pos) {
                  self2.push(new Buffer(new Uint8Array(reader.result.slice(self2._pos))));
                  self2._pos = reader.result.byteLength;
                }
              };
              reader.onload = function() {
                self2.push(null);
              };
              reader.readAsArrayBuffer(response);
              break;
          }
          if (self2._xhr.readyState === rStates.DONE && self2._mode !== "ms-stream") {
            self2.push(null);
          }
        };
      }).call(this, require2("_process"), typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require2("buffer").Buffer);
    }, { "./capability": 54, "_process": 32, "buffer": 16, "inherits": 24, "readable-stream": 49 }], 57: [function(require2, module2, exports2) {
      (function(setImmediate, clearImmediate) {
        var nextTick = require2("process/browser.js").nextTick;
        var apply = Function.prototype.apply;
        var slice = Array.prototype.slice;
        var immediateIds = {};
        var nextImmediateId = 0;
        exports2.setTimeout = function() {
          return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
        };
        exports2.setInterval = function() {
          return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
        };
        exports2.clearTimeout = exports2.clearInterval = function(timeout) {
          timeout.close();
        };
        function Timeout(id, clearFn) {
          this._id = id;
          this._clearFn = clearFn;
        }
        Timeout.prototype.unref = Timeout.prototype.ref = function() {
        };
        Timeout.prototype.close = function() {
          this._clearFn.call(window, this._id);
        };
        exports2.enroll = function(item, msecs) {
          clearTimeout(item._idleTimeoutId);
          item._idleTimeout = msecs;
        };
        exports2.unenroll = function(item) {
          clearTimeout(item._idleTimeoutId);
          item._idleTimeout = -1;
        };
        exports2._unrefActive = exports2.active = function(item) {
          clearTimeout(item._idleTimeoutId);
          var msecs = item._idleTimeout;
          if (msecs >= 0) {
            item._idleTimeoutId = setTimeout(function onTimeout() {
              if (item._onTimeout)
                item._onTimeout();
            }, msecs);
          }
        };
        exports2.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
          var id = nextImmediateId++;
          var args = arguments.length < 2 ? false : slice.call(arguments, 1);
          immediateIds[id] = true;
          nextTick(function onNextTick() {
            if (immediateIds[id]) {
              if (args) {
                fn.apply(null, args);
              } else {
                fn.call(null);
              }
              exports2.clearImmediate(id);
            }
          });
          return id;
        };
        exports2.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
          delete immediateIds[id];
        };
      }).call(this, require2("timers").setImmediate, require2("timers").clearImmediate);
    }, { "process/browser.js": 32, "timers": 57 }], 58: [function(require2, module2, exports2) {
      var Buffer = require2("buffer").Buffer;
      module2.exports = function(buf) {
        if (buf instanceof Uint8Array) {
          if (buf.byteOffset === 0 && buf.byteLength === buf.buffer.byteLength) {
            return buf.buffer;
          } else if (typeof buf.buffer.slice === "function") {
            return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
          }
        }
        if (Buffer.isBuffer(buf)) {
          var arrayCopy = new Uint8Array(buf.length);
          var len = buf.length;
          for (var i = 0; i < len; i++) {
            arrayCopy[i] = buf[i];
          }
          return arrayCopy.buffer;
        } else {
          throw new Error("Argument must be a Buffer");
        }
      };
    }, { "buffer": 16 }], 59: [function(require2, module2, exports2) {
      var punycode = require2("punycode");
      var util = require2("./util");
      exports2.parse = urlParse;
      exports2.resolve = urlResolve;
      exports2.resolveObject = urlResolveObject;
      exports2.format = urlFormat;
      exports2.Url = Url;
      function Url() {
        this.protocol = null;
        this.slashes = null;
        this.auth = null;
        this.host = null;
        this.port = null;
        this.hostname = null;
        this.hash = null;
        this.search = null;
        this.query = null;
        this.pathname = null;
        this.path = null;
        this.href = null;
      }
      var protocolPattern = /^([a-z0-9.+-]+:)/i, portPattern = /:[0-9]*$/, simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/, delims = ["<", ">", '"', "`", " ", "\r", "\n", "	"], unwise = ["{", "}", "|", "\\", "^", "`"].concat(delims), autoEscape = ["'"].concat(unwise), nonHostChars = ["%", "/", "?", ";", "#"].concat(autoEscape), hostEndingChars = ["/", "?", "#"], hostnameMaxLen = 255, hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/, hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/, unsafeProtocol = {
        "javascript": true,
        "javascript:": true
      }, hostlessProtocol = {
        "javascript": true,
        "javascript:": true
      }, slashedProtocol = {
        "http": true,
        "https": true,
        "ftp": true,
        "gopher": true,
        "file": true,
        "http:": true,
        "https:": true,
        "ftp:": true,
        "gopher:": true,
        "file:": true
      }, querystring = require2("querystring");
      function urlParse(url, parseQueryString, slashesDenoteHost) {
        if (url && util.isObject(url) && url instanceof Url)
          return url;
        var u = new Url();
        u.parse(url, parseQueryString, slashesDenoteHost);
        return u;
      }
      Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
        if (!util.isString(url)) {
          throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
        }
        var queryIndex = url.indexOf("?"), splitter = queryIndex !== -1 && queryIndex < url.indexOf("#") ? "?" : "#", uSplit = url.split(splitter), slashRegex = /\\/g;
        uSplit[0] = uSplit[0].replace(slashRegex, "/");
        url = uSplit.join(splitter);
        var rest = url;
        rest = rest.trim();
        if (!slashesDenoteHost && url.split("#").length === 1) {
          var simplePath = simplePathPattern.exec(rest);
          if (simplePath) {
            this.path = rest;
            this.href = rest;
            this.pathname = simplePath[1];
            if (simplePath[2]) {
              this.search = simplePath[2];
              if (parseQueryString) {
                this.query = querystring.parse(this.search.substr(1));
              } else {
                this.query = this.search.substr(1);
              }
            } else if (parseQueryString) {
              this.search = "";
              this.query = {};
            }
            return this;
          }
        }
        var proto = protocolPattern.exec(rest);
        if (proto) {
          proto = proto[0];
          var lowerProto = proto.toLowerCase();
          this.protocol = lowerProto;
          rest = rest.substr(proto.length);
        }
        if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
          var slashes = rest.substr(0, 2) === "//";
          if (slashes && !(proto && hostlessProtocol[proto])) {
            rest = rest.substr(2);
            this.slashes = true;
          }
        }
        if (!hostlessProtocol[proto] && (slashes || proto && !slashedProtocol[proto])) {
          var hostEnd = -1;
          for (var i = 0; i < hostEndingChars.length; i++) {
            var hec = rest.indexOf(hostEndingChars[i]);
            if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
              hostEnd = hec;
          }
          var auth, atSign;
          if (hostEnd === -1) {
            atSign = rest.lastIndexOf("@");
          } else {
            atSign = rest.lastIndexOf("@", hostEnd);
          }
          if (atSign !== -1) {
            auth = rest.slice(0, atSign);
            rest = rest.slice(atSign + 1);
            this.auth = decodeURIComponent(auth);
          }
          hostEnd = -1;
          for (var i = 0; i < nonHostChars.length; i++) {
            var hec = rest.indexOf(nonHostChars[i]);
            if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
              hostEnd = hec;
          }
          if (hostEnd === -1)
            hostEnd = rest.length;
          this.host = rest.slice(0, hostEnd);
          rest = rest.slice(hostEnd);
          this.parseHost();
          this.hostname = this.hostname || "";
          var ipv6Hostname = this.hostname[0] === "[" && this.hostname[this.hostname.length - 1] === "]";
          if (!ipv6Hostname) {
            var hostparts = this.hostname.split(/\./);
            for (var i = 0, l = hostparts.length; i < l; i++) {
              var part = hostparts[i];
              if (!part)
                continue;
              if (!part.match(hostnamePartPattern)) {
                var newpart = "";
                for (var j = 0, k = part.length; j < k; j++) {
                  if (part.charCodeAt(j) > 127) {
                    newpart += "x";
                  } else {
                    newpart += part[j];
                  }
                }
                if (!newpart.match(hostnamePartPattern)) {
                  var validParts = hostparts.slice(0, i);
                  var notHost = hostparts.slice(i + 1);
                  var bit = part.match(hostnamePartStart);
                  if (bit) {
                    validParts.push(bit[1]);
                    notHost.unshift(bit[2]);
                  }
                  if (notHost.length) {
                    rest = "/" + notHost.join(".") + rest;
                  }
                  this.hostname = validParts.join(".");
                  break;
                }
              }
            }
          }
          if (this.hostname.length > hostnameMaxLen) {
            this.hostname = "";
          } else {
            this.hostname = this.hostname.toLowerCase();
          }
          if (!ipv6Hostname) {
            this.hostname = punycode.toASCII(this.hostname);
          }
          var p = this.port ? ":" + this.port : "";
          var h = this.hostname || "";
          this.host = h + p;
          this.href += this.host;
          if (ipv6Hostname) {
            this.hostname = this.hostname.substr(1, this.hostname.length - 2);
            if (rest[0] !== "/") {
              rest = "/" + rest;
            }
          }
        }
        if (!unsafeProtocol[lowerProto]) {
          for (var i = 0, l = autoEscape.length; i < l; i++) {
            var ae = autoEscape[i];
            if (rest.indexOf(ae) === -1)
              continue;
            var esc = encodeURIComponent(ae);
            if (esc === ae) {
              esc = escape(ae);
            }
            rest = rest.split(ae).join(esc);
          }
        }
        var hash = rest.indexOf("#");
        if (hash !== -1) {
          this.hash = rest.substr(hash);
          rest = rest.slice(0, hash);
        }
        var qm = rest.indexOf("?");
        if (qm !== -1) {
          this.search = rest.substr(qm);
          this.query = rest.substr(qm + 1);
          if (parseQueryString) {
            this.query = querystring.parse(this.query);
          }
          rest = rest.slice(0, qm);
        } else if (parseQueryString) {
          this.search = "";
          this.query = {};
        }
        if (rest)
          this.pathname = rest;
        if (slashedProtocol[lowerProto] && this.hostname && !this.pathname) {
          this.pathname = "/";
        }
        if (this.pathname || this.search) {
          var p = this.pathname || "";
          var s = this.search || "";
          this.path = p + s;
        }
        this.href = this.format();
        return this;
      };
      function urlFormat(obj) {
        if (util.isString(obj))
          obj = urlParse(obj);
        if (!(obj instanceof Url))
          return Url.prototype.format.call(obj);
        return obj.format();
      }
      Url.prototype.format = function() {
        var auth = this.auth || "";
        if (auth) {
          auth = encodeURIComponent(auth);
          auth = auth.replace(/%3A/i, ":");
          auth += "@";
        }
        var protocol = this.protocol || "", pathname = this.pathname || "", hash = this.hash || "", host = false, query = "";
        if (this.host) {
          host = auth + this.host;
        } else if (this.hostname) {
          host = auth + (this.hostname.indexOf(":") === -1 ? this.hostname : "[" + this.hostname + "]");
          if (this.port) {
            host += ":" + this.port;
          }
        }
        if (this.query && util.isObject(this.query) && Object.keys(this.query).length) {
          query = querystring.stringify(this.query);
        }
        var search = this.search || query && "?" + query || "";
        if (protocol && protocol.substr(-1) !== ":")
          protocol += ":";
        if (this.slashes || (!protocol || slashedProtocol[protocol]) && host !== false) {
          host = "//" + (host || "");
          if (pathname && pathname.charAt(0) !== "/")
            pathname = "/" + pathname;
        } else if (!host) {
          host = "";
        }
        if (hash && hash.charAt(0) !== "#")
          hash = "#" + hash;
        if (search && search.charAt(0) !== "?")
          search = "?" + search;
        pathname = pathname.replace(/[?#]/g, function(match) {
          return encodeURIComponent(match);
        });
        search = search.replace("#", "%23");
        return protocol + host + pathname + search + hash;
      };
      function urlResolve(source, relative) {
        return urlParse(source, false, true).resolve(relative);
      }
      Url.prototype.resolve = function(relative) {
        return this.resolveObject(urlParse(relative, false, true)).format();
      };
      function urlResolveObject(source, relative) {
        if (!source)
          return relative;
        return urlParse(source, false, true).resolveObject(relative);
      }
      Url.prototype.resolveObject = function(relative) {
        if (util.isString(relative)) {
          var rel = new Url();
          rel.parse(relative, false, true);
          relative = rel;
        }
        var result = new Url();
        var tkeys = Object.keys(this);
        for (var tk = 0; tk < tkeys.length; tk++) {
          var tkey = tkeys[tk];
          result[tkey] = this[tkey];
        }
        result.hash = relative.hash;
        if (relative.href === "") {
          result.href = result.format();
          return result;
        }
        if (relative.slashes && !relative.protocol) {
          var rkeys = Object.keys(relative);
          for (var rk = 0; rk < rkeys.length; rk++) {
            var rkey = rkeys[rk];
            if (rkey !== "protocol")
              result[rkey] = relative[rkey];
          }
          if (slashedProtocol[result.protocol] && result.hostname && !result.pathname) {
            result.path = result.pathname = "/";
          }
          result.href = result.format();
          return result;
        }
        if (relative.protocol && relative.protocol !== result.protocol) {
          if (!slashedProtocol[relative.protocol]) {
            var keys = Object.keys(relative);
            for (var v = 0; v < keys.length; v++) {
              var k = keys[v];
              result[k] = relative[k];
            }
            result.href = result.format();
            return result;
          }
          result.protocol = relative.protocol;
          if (!relative.host && !hostlessProtocol[relative.protocol]) {
            var relPath = (relative.pathname || "").split("/");
            while (relPath.length && !(relative.host = relPath.shift()))
              ;
            if (!relative.host)
              relative.host = "";
            if (!relative.hostname)
              relative.hostname = "";
            if (relPath[0] !== "")
              relPath.unshift("");
            if (relPath.length < 2)
              relPath.unshift("");
            result.pathname = relPath.join("/");
          } else {
            result.pathname = relative.pathname;
          }
          result.search = relative.search;
          result.query = relative.query;
          result.host = relative.host || "";
          result.auth = relative.auth;
          result.hostname = relative.hostname || relative.host;
          result.port = relative.port;
          if (result.pathname || result.search) {
            var p = result.pathname || "";
            var s = result.search || "";
            result.path = p + s;
          }
          result.slashes = result.slashes || relative.slashes;
          result.href = result.format();
          return result;
        }
        var isSourceAbs = result.pathname && result.pathname.charAt(0) === "/", isRelAbs = relative.host || relative.pathname && relative.pathname.charAt(0) === "/", mustEndAbs = isRelAbs || isSourceAbs || result.host && relative.pathname, removeAllDots = mustEndAbs, srcPath = result.pathname && result.pathname.split("/") || [], relPath = relative.pathname && relative.pathname.split("/") || [], psychotic = result.protocol && !slashedProtocol[result.protocol];
        if (psychotic) {
          result.hostname = "";
          result.port = null;
          if (result.host) {
            if (srcPath[0] === "")
              srcPath[0] = result.host;
            else
              srcPath.unshift(result.host);
          }
          result.host = "";
          if (relative.protocol) {
            relative.hostname = null;
            relative.port = null;
            if (relative.host) {
              if (relPath[0] === "")
                relPath[0] = relative.host;
              else
                relPath.unshift(relative.host);
            }
            relative.host = null;
          }
          mustEndAbs = mustEndAbs && (relPath[0] === "" || srcPath[0] === "");
        }
        if (isRelAbs) {
          result.host = relative.host || relative.host === "" ? relative.host : result.host;
          result.hostname = relative.hostname || relative.hostname === "" ? relative.hostname : result.hostname;
          result.search = relative.search;
          result.query = relative.query;
          srcPath = relPath;
        } else if (relPath.length) {
          if (!srcPath)
            srcPath = [];
          srcPath.pop();
          srcPath = srcPath.concat(relPath);
          result.search = relative.search;
          result.query = relative.query;
        } else if (!util.isNullOrUndefined(relative.search)) {
          if (psychotic) {
            result.hostname = result.host = srcPath.shift();
            var authInHost = result.host && result.host.indexOf("@") > 0 ? result.host.split("@") : false;
            if (authInHost) {
              result.auth = authInHost.shift();
              result.host = result.hostname = authInHost.shift();
            }
          }
          result.search = relative.search;
          result.query = relative.query;
          if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
            result.path = (result.pathname ? result.pathname : "") + (result.search ? result.search : "");
          }
          result.href = result.format();
          return result;
        }
        if (!srcPath.length) {
          result.pathname = null;
          if (result.search) {
            result.path = "/" + result.search;
          } else {
            result.path = null;
          }
          result.href = result.format();
          return result;
        }
        var last = srcPath.slice(-1)[0];
        var hasTrailingSlash = (result.host || relative.host || srcPath.length > 1) && (last === "." || last === "..") || last === "";
        var up = 0;
        for (var i = srcPath.length; i >= 0; i--) {
          last = srcPath[i];
          if (last === ".") {
            srcPath.splice(i, 1);
          } else if (last === "..") {
            srcPath.splice(i, 1);
            up++;
          } else if (up) {
            srcPath.splice(i, 1);
            up--;
          }
        }
        if (!mustEndAbs && !removeAllDots) {
          for (; up--; up) {
            srcPath.unshift("..");
          }
        }
        if (mustEndAbs && srcPath[0] !== "" && (!srcPath[0] || srcPath[0].charAt(0) !== "/")) {
          srcPath.unshift("");
        }
        if (hasTrailingSlash && srcPath.join("/").substr(-1) !== "/") {
          srcPath.push("");
        }
        var isAbsolute = srcPath[0] === "" || srcPath[0] && srcPath[0].charAt(0) === "/";
        if (psychotic) {
          result.hostname = result.host = isAbsolute ? "" : srcPath.length ? srcPath.shift() : "";
          var authInHost = result.host && result.host.indexOf("@") > 0 ? result.host.split("@") : false;
          if (authInHost) {
            result.auth = authInHost.shift();
            result.host = result.hostname = authInHost.shift();
          }
        }
        mustEndAbs = mustEndAbs || result.host && srcPath.length;
        if (mustEndAbs && !isAbsolute) {
          srcPath.unshift("");
        }
        if (!srcPath.length) {
          result.pathname = null;
          result.path = null;
        } else {
          result.pathname = srcPath.join("/");
        }
        if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
          result.path = (result.pathname ? result.pathname : "") + (result.search ? result.search : "");
        }
        result.auth = relative.auth || result.auth;
        result.slashes = result.slashes || relative.slashes;
        result.href = result.format();
        return result;
      };
      Url.prototype.parseHost = function() {
        var host = this.host;
        var port = portPattern.exec(host);
        if (port) {
          port = port[0];
          if (port !== ":") {
            this.port = port.substr(1);
          }
          host = host.substr(0, host.length - port.length);
        }
        if (host)
          this.hostname = host;
      };
    }, { "./util": 60, "punycode": 33, "querystring": 36 }], 60: [function(require2, module2, exports2) {
      module2.exports = {
        isString: function(arg) {
          return typeof arg === "string";
        },
        isObject: function(arg) {
          return typeof arg === "object" && arg !== null;
        },
        isNull: function(arg) {
          return arg === null;
        },
        isNullOrUndefined: function(arg) {
          return arg == null;
        }
      };
    }, {}], 61: [function(require2, module2, exports2) {
      (function(global) {
        module2.exports = deprecate;
        function deprecate(fn, msg) {
          if (config("noDeprecation")) {
            return fn;
          }
          var warned = false;
          function deprecated() {
            if (!warned) {
              if (config("throwDeprecation")) {
                throw new Error(msg);
              } else if (config("traceDeprecation")) {
                console.trace(msg);
              } else {
                console.warn(msg);
              }
              warned = true;
            }
            return fn.apply(this, arguments);
          }
          return deprecated;
        }
        function config(name) {
          try {
            if (!global.localStorage)
              return false;
          } catch (_) {
            return false;
          }
          var val = global.localStorage[name];
          if (null == val)
            return false;
          return String(val).toLowerCase() === "true";
        }
      }).call(this, typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {}], 62: [function(require2, module2, exports2) {
      if (typeof Object.create === "function") {
        module2.exports = function inherits(ctor, superCtor) {
          ctor.super_ = superCtor;
          ctor.prototype = Object.create(superCtor.prototype, {
            constructor: {
              value: ctor,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
        };
      } else {
        module2.exports = function inherits(ctor, superCtor) {
          ctor.super_ = superCtor;
          var TempCtor = function() {
          };
          TempCtor.prototype = superCtor.prototype;
          ctor.prototype = new TempCtor();
          ctor.prototype.constructor = ctor;
        };
      }
    }, {}], 63: [function(require2, module2, exports2) {
      module2.exports = function isBuffer(arg) {
        return arg && typeof arg === "object" && typeof arg.copy === "function" && typeof arg.fill === "function" && typeof arg.readUInt8 === "function";
      };
    }, {}], 64: [function(require2, module2, exports2) {
      (function(process, global) {
        var formatRegExp = /%[sdj%]/g;
        exports2.format = function(f) {
          if (!isString(f)) {
            var objects = [];
            for (var i = 0; i < arguments.length; i++) {
              objects.push(inspect(arguments[i]));
            }
            return objects.join(" ");
          }
          var i = 1;
          var args = arguments;
          var len = args.length;
          var str = String(f).replace(formatRegExp, function(x2) {
            if (x2 === "%%")
              return "%";
            if (i >= len)
              return x2;
            switch (x2) {
              case "%s":
                return String(args[i++]);
              case "%d":
                return Number(args[i++]);
              case "%j":
                try {
                  return JSON.stringify(args[i++]);
                } catch (_) {
                  return "[Circular]";
                }
              default:
                return x2;
            }
          });
          for (var x = args[i]; i < len; x = args[++i]) {
            if (isNull(x) || !isObject(x)) {
              str += " " + x;
            } else {
              str += " " + inspect(x);
            }
          }
          return str;
        };
        exports2.deprecate = function(fn, msg) {
          if (isUndefined(global.process)) {
            return function() {
              return exports2.deprecate(fn, msg).apply(this, arguments);
            };
          }
          if (process.noDeprecation === true) {
            return fn;
          }
          var warned = false;
          function deprecated() {
            if (!warned) {
              if (process.throwDeprecation) {
                throw new Error(msg);
              } else if (process.traceDeprecation) {
                console.trace(msg);
              } else {
                console.error(msg);
              }
              warned = true;
            }
            return fn.apply(this, arguments);
          }
          return deprecated;
        };
        var debugs = {};
        var debugEnviron;
        exports2.debuglog = function(set) {
          if (isUndefined(debugEnviron))
            debugEnviron = process.env.NODE_DEBUG || "";
          set = set.toUpperCase();
          if (!debugs[set]) {
            if (new RegExp("\\b" + set + "\\b", "i").test(debugEnviron)) {
              var pid = process.pid;
              debugs[set] = function() {
                var msg = exports2.format.apply(exports2, arguments);
                console.error("%s %d: %s", set, pid, msg);
              };
            } else {
              debugs[set] = function() {
              };
            }
          }
          return debugs[set];
        };
        function inspect(obj, opts) {
          var ctx = {
            seen: [],
            stylize: stylizeNoColor
          };
          if (arguments.length >= 3)
            ctx.depth = arguments[2];
          if (arguments.length >= 4)
            ctx.colors = arguments[3];
          if (isBoolean(opts)) {
            ctx.showHidden = opts;
          } else if (opts) {
            exports2._extend(ctx, opts);
          }
          if (isUndefined(ctx.showHidden))
            ctx.showHidden = false;
          if (isUndefined(ctx.depth))
            ctx.depth = 2;
          if (isUndefined(ctx.colors))
            ctx.colors = false;
          if (isUndefined(ctx.customInspect))
            ctx.customInspect = true;
          if (ctx.colors)
            ctx.stylize = stylizeWithColor;
          return formatValue(ctx, obj, ctx.depth);
        }
        exports2.inspect = inspect;
        inspect.colors = {
          "bold": [1, 22],
          "italic": [3, 23],
          "underline": [4, 24],
          "inverse": [7, 27],
          "white": [37, 39],
          "grey": [90, 39],
          "black": [30, 39],
          "blue": [34, 39],
          "cyan": [36, 39],
          "green": [32, 39],
          "magenta": [35, 39],
          "red": [31, 39],
          "yellow": [33, 39]
        };
        inspect.styles = {
          "special": "cyan",
          "number": "yellow",
          "boolean": "yellow",
          "undefined": "grey",
          "null": "bold",
          "string": "green",
          "date": "magenta",
          // "name": intentionally not styling
          "regexp": "red"
        };
        function stylizeWithColor(str, styleType) {
          var style = inspect.styles[styleType];
          if (style) {
            return "\x1B[" + inspect.colors[style][0] + "m" + str + "\x1B[" + inspect.colors[style][1] + "m";
          } else {
            return str;
          }
        }
        function stylizeNoColor(str, styleType) {
          return str;
        }
        function arrayToHash(array) {
          var hash = {};
          array.forEach(function(val, idx) {
            hash[val] = true;
          });
          return hash;
        }
        function formatValue(ctx, value, recurseTimes) {
          if (ctx.customInspect && value && isFunction(value.inspect) && // Filter out the util module, it's inspect function is special
          value.inspect !== exports2.inspect && // Also filter out any prototype objects using the circular check.
          !(value.constructor && value.constructor.prototype === value)) {
            var ret = value.inspect(recurseTimes, ctx);
            if (!isString(ret)) {
              ret = formatValue(ctx, ret, recurseTimes);
            }
            return ret;
          }
          var primitive = formatPrimitive(ctx, value);
          if (primitive) {
            return primitive;
          }
          var keys = Object.keys(value);
          var visibleKeys = arrayToHash(keys);
          if (ctx.showHidden) {
            keys = Object.getOwnPropertyNames(value);
          }
          if (isError(value) && (keys.indexOf("message") >= 0 || keys.indexOf("description") >= 0)) {
            return formatError(value);
          }
          if (keys.length === 0) {
            if (isFunction(value)) {
              var name = value.name ? ": " + value.name : "";
              return ctx.stylize("[Function" + name + "]", "special");
            }
            if (isRegExp(value)) {
              return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
            }
            if (isDate(value)) {
              return ctx.stylize(Date.prototype.toString.call(value), "date");
            }
            if (isError(value)) {
              return formatError(value);
            }
          }
          var base = "", array = false, braces = ["{", "}"];
          if (isArray(value)) {
            array = true;
            braces = ["[", "]"];
          }
          if (isFunction(value)) {
            var n = value.name ? ": " + value.name : "";
            base = " [Function" + n + "]";
          }
          if (isRegExp(value)) {
            base = " " + RegExp.prototype.toString.call(value);
          }
          if (isDate(value)) {
            base = " " + Date.prototype.toUTCString.call(value);
          }
          if (isError(value)) {
            base = " " + formatError(value);
          }
          if (keys.length === 0 && (!array || value.length == 0)) {
            return braces[0] + base + braces[1];
          }
          if (recurseTimes < 0) {
            if (isRegExp(value)) {
              return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
            } else {
              return ctx.stylize("[Object]", "special");
            }
          }
          ctx.seen.push(value);
          var output;
          if (array) {
            output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
          } else {
            output = keys.map(function(key) {
              return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
            });
          }
          ctx.seen.pop();
          return reduceToSingleString(output, base, braces);
        }
        function formatPrimitive(ctx, value) {
          if (isUndefined(value))
            return ctx.stylize("undefined", "undefined");
          if (isString(value)) {
            var simple = "'" + JSON.stringify(value).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
            return ctx.stylize(simple, "string");
          }
          if (isNumber(value))
            return ctx.stylize("" + value, "number");
          if (isBoolean(value))
            return ctx.stylize("" + value, "boolean");
          if (isNull(value))
            return ctx.stylize("null", "null");
        }
        function formatError(value) {
          return "[" + Error.prototype.toString.call(value) + "]";
        }
        function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
          var output = [];
          for (var i = 0, l = value.length; i < l; ++i) {
            if (hasOwnProperty(value, String(i))) {
              output.push(formatProperty(
                ctx,
                value,
                recurseTimes,
                visibleKeys,
                String(i),
                true
              ));
            } else {
              output.push("");
            }
          }
          keys.forEach(function(key) {
            if (!key.match(/^\d+$/)) {
              output.push(formatProperty(
                ctx,
                value,
                recurseTimes,
                visibleKeys,
                key,
                true
              ));
            }
          });
          return output;
        }
        function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
          var name, str, desc;
          desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
          if (desc.get) {
            if (desc.set) {
              str = ctx.stylize("[Getter/Setter]", "special");
            } else {
              str = ctx.stylize("[Getter]", "special");
            }
          } else {
            if (desc.set) {
              str = ctx.stylize("[Setter]", "special");
            }
          }
          if (!hasOwnProperty(visibleKeys, key)) {
            name = "[" + key + "]";
          }
          if (!str) {
            if (ctx.seen.indexOf(desc.value) < 0) {
              if (isNull(recurseTimes)) {
                str = formatValue(ctx, desc.value, null);
              } else {
                str = formatValue(ctx, desc.value, recurseTimes - 1);
              }
              if (str.indexOf("\n") > -1) {
                if (array) {
                  str = str.split("\n").map(function(line) {
                    return "  " + line;
                  }).join("\n").substr(2);
                } else {
                  str = "\n" + str.split("\n").map(function(line) {
                    return "   " + line;
                  }).join("\n");
                }
              }
            } else {
              str = ctx.stylize("[Circular]", "special");
            }
          }
          if (isUndefined(name)) {
            if (array && key.match(/^\d+$/)) {
              return str;
            }
            name = JSON.stringify("" + key);
            if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
              name = name.substr(1, name.length - 2);
              name = ctx.stylize(name, "name");
            } else {
              name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
              name = ctx.stylize(name, "string");
            }
          }
          return name + ": " + str;
        }
        function reduceToSingleString(output, base, braces) {
          var length = output.reduce(function(prev, cur) {
            if (cur.indexOf("\n") >= 0)
              ;
            return prev + cur.replace(/\u001b\[\d\d?m/g, "").length + 1;
          }, 0);
          if (length > 60) {
            return braces[0] + (base === "" ? "" : base + "\n ") + " " + output.join(",\n  ") + " " + braces[1];
          }
          return braces[0] + base + " " + output.join(", ") + " " + braces[1];
        }
        function isArray(ar) {
          return Array.isArray(ar);
        }
        exports2.isArray = isArray;
        function isBoolean(arg) {
          return typeof arg === "boolean";
        }
        exports2.isBoolean = isBoolean;
        function isNull(arg) {
          return arg === null;
        }
        exports2.isNull = isNull;
        function isNullOrUndefined(arg) {
          return arg == null;
        }
        exports2.isNullOrUndefined = isNullOrUndefined;
        function isNumber(arg) {
          return typeof arg === "number";
        }
        exports2.isNumber = isNumber;
        function isString(arg) {
          return typeof arg === "string";
        }
        exports2.isString = isString;
        function isSymbol(arg) {
          return typeof arg === "symbol";
        }
        exports2.isSymbol = isSymbol;
        function isUndefined(arg) {
          return arg === void 0;
        }
        exports2.isUndefined = isUndefined;
        function isRegExp(re) {
          return isObject(re) && objectToString(re) === "[object RegExp]";
        }
        exports2.isRegExp = isRegExp;
        function isObject(arg) {
          return typeof arg === "object" && arg !== null;
        }
        exports2.isObject = isObject;
        function isDate(d) {
          return isObject(d) && objectToString(d) === "[object Date]";
        }
        exports2.isDate = isDate;
        function isError(e) {
          return isObject(e) && (objectToString(e) === "[object Error]" || e instanceof Error);
        }
        exports2.isError = isError;
        function isFunction(arg) {
          return typeof arg === "function";
        }
        exports2.isFunction = isFunction;
        function isPrimitive(arg) {
          return arg === null || typeof arg === "boolean" || typeof arg === "number" || typeof arg === "string" || typeof arg === "symbol" || // ES6 symbol
          typeof arg === "undefined";
        }
        exports2.isPrimitive = isPrimitive;
        exports2.isBuffer = require2("./support/isBuffer");
        function objectToString(o) {
          return Object.prototype.toString.call(o);
        }
        function pad(n) {
          return n < 10 ? "0" + n.toString(10) : n.toString(10);
        }
        var months = [
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
        function timestamp() {
          var d = /* @__PURE__ */ new Date();
          var time = [
            pad(d.getHours()),
            pad(d.getMinutes()),
            pad(d.getSeconds())
          ].join(":");
          return [d.getDate(), months[d.getMonth()], time].join(" ");
        }
        exports2.log = function() {
          console.log("%s - %s", timestamp(), exports2.format.apply(exports2, arguments));
        };
        exports2.inherits = require2("inherits");
        exports2._extend = function(origin, add) {
          if (!add || !isObject(add))
            return origin;
          var keys = Object.keys(add);
          var i = keys.length;
          while (i--) {
            origin[keys[i]] = add[keys[i]];
          }
          return origin;
        };
        function hasOwnProperty(obj, prop) {
          return Object.prototype.hasOwnProperty.call(obj, prop);
        }
      }).call(this, require2("_process"), typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, { "./support/isBuffer": 63, "_process": 32, "inherits": 62 }], 65: [function(require2, module2, exports2) {
      module2.exports = extend;
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      function extend() {
        var target = {};
        for (var i = 0; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      }
    }, {}] }, {}, [1])(1);
  });
})(browser$2);
const browser = browserExports;
const browser$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: browser
}, [browserExports]);
export {
  browser$1 as b
};
