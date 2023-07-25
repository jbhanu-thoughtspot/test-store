function hi(e, i) {
  for (var a = 0; a < i.length; a++) {
    const t = i[a];
    if (typeof t != "string" && !Array.isArray(t)) {
      for (const n in t)
        if (n !== "default" && !(n in e)) {
          const r = Object.getOwnPropertyDescriptor(t, n);
          r && Object.defineProperty(e, n, r.get ? r : {
            enumerable: !0,
            get: () => t[n]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }));
}
var V = {};
(function(e) {
  var i = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Int32Array < "u";
  function a(r, l) {
    return Object.prototype.hasOwnProperty.call(r, l);
  }
  e.assign = function(r) {
    for (var l = Array.prototype.slice.call(arguments, 1); l.length; ) {
      var f = l.shift();
      if (f) {
        if (typeof f != "object")
          throw new TypeError(f + "must be non-object");
        for (var o in f)
          a(f, o) && (r[o] = f[o]);
      }
    }
    return r;
  }, e.shrinkBuf = function(r, l) {
    return r.length === l ? r : r.subarray ? r.subarray(0, l) : (r.length = l, r);
  };
  var t = {
    arraySet: function(r, l, f, o, _) {
      if (l.subarray && r.subarray) {
        r.set(l.subarray(f, f + o), _);
        return;
      }
      for (var h = 0; h < o; h++)
        r[_ + h] = l[f + h];
    },
    // Join array of chunks to single array.
    flattenChunks: function(r) {
      var l, f, o, _, h, p;
      for (o = 0, l = 0, f = r.length; l < f; l++)
        o += r[l].length;
      for (p = new Uint8Array(o), _ = 0, l = 0, f = r.length; l < f; l++)
        h = r[l], p.set(h, _), _ += h.length;
      return p;
    }
  }, n = {
    arraySet: function(r, l, f, o, _) {
      for (var h = 0; h < o; h++)
        r[_ + h] = l[f + h];
    },
    // Join array of chunks to single array.
    flattenChunks: function(r) {
      return [].concat.apply([], r);
    }
  };
  e.setTyped = function(r) {
    r ? (e.Buf8 = Uint8Array, e.Buf16 = Uint16Array, e.Buf32 = Int32Array, e.assign(e, t)) : (e.Buf8 = Array, e.Buf16 = Array, e.Buf32 = Array, e.assign(e, n));
  }, e.setTyped(i);
})(V);
var Ie = {}, j = {}, pe = {}, oi = V, di = 4, Na = 0, Ia = 1, ui = 2;
function xe(e) {
  for (var i = e.length; --i >= 0; )
    e[i] = 0;
}
var vi = 0, Et = 1, ci = 2, si = 3, bi = 258, ya = 29, Be = 256, De = Be + 1 + ya, be = 30, za = 19, St = 2 * De + 1, re = 15, ia = 16, gi = 7, ma = 256, yt = 16, zt = 17, mt = 18, ba = (
  /* extra bits for each length code */
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0]
), je = (
  /* extra bits for each distance code */
  [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13]
), wi = (
  /* extra bits for each bit length code */
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7]
), Tt = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], pi = 512, W = new Array((De + 2) * 2);
xe(W);
var ye = new Array(be * 2);
xe(ye);
var Ze = new Array(pi);
xe(Ze);
var Re = new Array(bi - si + 1);
xe(Re);
var Ta = new Array(ya);
xe(Ta);
var Qe = new Array(be);
xe(Qe);
function ra(e, i, a, t, n) {
  this.static_tree = e, this.extra_bits = i, this.extra_base = a, this.elems = t, this.max_length = n, this.has_stree = e && e.length;
}
var At, Dt, Zt;
function na(e, i) {
  this.dyn_tree = e, this.max_code = 0, this.stat_desc = i;
}
function Rt(e) {
  return e < 256 ? Ze[e] : Ze[256 + (e >>> 7)];
}
function Oe(e, i) {
  e.pending_buf[e.pending++] = i & 255, e.pending_buf[e.pending++] = i >>> 8 & 255;
}
function B(e, i, a) {
  e.bi_valid > ia - a ? (e.bi_buf |= i << e.bi_valid & 65535, Oe(e, e.bi_buf), e.bi_buf = i >> ia - e.bi_valid, e.bi_valid += a - ia) : (e.bi_buf |= i << e.bi_valid & 65535, e.bi_valid += a);
}
function Y(e, i, a) {
  B(
    e,
    a[i * 2],
    a[i * 2 + 1]
    /*.Len*/
  );
}
function Ot(e, i) {
  var a = 0;
  do
    a |= e & 1, e >>>= 1, a <<= 1;
  while (--i > 0);
  return a >>> 1;
}
function xi(e) {
  e.bi_valid === 16 ? (Oe(e, e.bi_buf), e.bi_buf = 0, e.bi_valid = 0) : e.bi_valid >= 8 && (e.pending_buf[e.pending++] = e.bi_buf & 255, e.bi_buf >>= 8, e.bi_valid -= 8);
}
function ki(e, i) {
  var a = i.dyn_tree, t = i.max_code, n = i.stat_desc.static_tree, r = i.stat_desc.has_stree, l = i.stat_desc.extra_bits, f = i.stat_desc.extra_base, o = i.stat_desc.max_length, _, h, p, u, d, s, c = 0;
  for (u = 0; u <= re; u++)
    e.bl_count[u] = 0;
  for (a[e.heap[e.heap_max] * 2 + 1] = 0, _ = e.heap_max + 1; _ < St; _++)
    h = e.heap[_], u = a[a[h * 2 + 1] * 2 + 1] + 1, u > o && (u = o, c++), a[h * 2 + 1] = u, !(h > t) && (e.bl_count[u]++, d = 0, h >= f && (d = l[h - f]), s = a[h * 2], e.opt_len += s * (u + d), r && (e.static_len += s * (n[h * 2 + 1] + d)));
  if (c !== 0) {
    do {
      for (u = o - 1; e.bl_count[u] === 0; )
        u--;
      e.bl_count[u]--, e.bl_count[u + 1] += 2, e.bl_count[o]--, c -= 2;
    } while (c > 0);
    for (u = o; u !== 0; u--)
      for (h = e.bl_count[u]; h !== 0; )
        p = e.heap[--_], !(p > t) && (a[p * 2 + 1] !== u && (e.opt_len += (u - a[p * 2 + 1]) * a[p * 2], a[p * 2 + 1] = u), h--);
  }
}
function Nt(e, i, a) {
  var t = new Array(re + 1), n = 0, r, l;
  for (r = 1; r <= re; r++)
    t[r] = n = n + a[r - 1] << 1;
  for (l = 0; l <= i; l++) {
    var f = e[l * 2 + 1];
    f !== 0 && (e[l * 2] = Ot(t[f]++, f));
  }
}
function Ei() {
  var e, i, a, t, n, r = new Array(re + 1);
  for (a = 0, t = 0; t < ya - 1; t++)
    for (Ta[t] = a, e = 0; e < 1 << ba[t]; e++)
      Re[a++] = t;
  for (Re[a - 1] = t, n = 0, t = 0; t < 16; t++)
    for (Qe[t] = n, e = 0; e < 1 << je[t]; e++)
      Ze[n++] = t;
  for (n >>= 7; t < be; t++)
    for (Qe[t] = n << 7, e = 0; e < 1 << je[t] - 7; e++)
      Ze[256 + n++] = t;
  for (i = 0; i <= re; i++)
    r[i] = 0;
  for (e = 0; e <= 143; )
    W[e * 2 + 1] = 8, e++, r[8]++;
  for (; e <= 255; )
    W[e * 2 + 1] = 9, e++, r[9]++;
  for (; e <= 279; )
    W[e * 2 + 1] = 7, e++, r[7]++;
  for (; e <= 287; )
    W[e * 2 + 1] = 8, e++, r[8]++;
  for (Nt(W, De + 1, r), e = 0; e < be; e++)
    ye[e * 2 + 1] = 5, ye[e * 2] = Ot(e, 5);
  At = new ra(W, ba, Be + 1, De, re), Dt = new ra(ye, je, 0, be, re), Zt = new ra(new Array(0), wi, 0, za, gi);
}
function It(e) {
  var i;
  for (i = 0; i < De; i++)
    e.dyn_ltree[i * 2] = 0;
  for (i = 0; i < be; i++)
    e.dyn_dtree[i * 2] = 0;
  for (i = 0; i < za; i++)
    e.bl_tree[i * 2] = 0;
  e.dyn_ltree[ma * 2] = 1, e.opt_len = e.static_len = 0, e.last_lit = e.matches = 0;
}
function Bt(e) {
  e.bi_valid > 8 ? Oe(e, e.bi_buf) : e.bi_valid > 0 && (e.pending_buf[e.pending++] = e.bi_buf), e.bi_buf = 0, e.bi_valid = 0;
}
function Si(e, i, a, t) {
  Bt(e), t && (Oe(e, a), Oe(e, ~a)), oi.arraySet(e.pending_buf, e.window, i, a, e.pending), e.pending += a;
}
function Ba(e, i, a, t) {
  var n = i * 2, r = a * 2;
  return e[n] < e[r] || e[n] === e[r] && t[i] <= t[a];
}
function fa(e, i, a) {
  for (var t = e.heap[a], n = a << 1; n <= e.heap_len && (n < e.heap_len && Ba(i, e.heap[n + 1], e.heap[n], e.depth) && n++, !Ba(i, t, e.heap[n], e.depth)); )
    e.heap[a] = e.heap[n], a = n, n <<= 1;
  e.heap[a] = t;
}
function Ca(e, i, a) {
  var t, n, r = 0, l, f;
  if (e.last_lit !== 0)
    do
      t = e.pending_buf[e.d_buf + r * 2] << 8 | e.pending_buf[e.d_buf + r * 2 + 1], n = e.pending_buf[e.l_buf + r], r++, t === 0 ? Y(e, n, i) : (l = Re[n], Y(e, l + Be + 1, i), f = ba[l], f !== 0 && (n -= Ta[l], B(e, n, f)), t--, l = Rt(t), Y(e, l, a), f = je[l], f !== 0 && (t -= Qe[l], B(e, t, f)));
    while (r < e.last_lit);
  Y(e, ma, i);
}
function ga(e, i) {
  var a = i.dyn_tree, t = i.stat_desc.static_tree, n = i.stat_desc.has_stree, r = i.stat_desc.elems, l, f, o = -1, _;
  for (e.heap_len = 0, e.heap_max = St, l = 0; l < r; l++)
    a[l * 2] !== 0 ? (e.heap[++e.heap_len] = o = l, e.depth[l] = 0) : a[l * 2 + 1] = 0;
  for (; e.heap_len < 2; )
    _ = e.heap[++e.heap_len] = o < 2 ? ++o : 0, a[_ * 2] = 1, e.depth[_] = 0, e.opt_len--, n && (e.static_len -= t[_ * 2 + 1]);
  for (i.max_code = o, l = e.heap_len >> 1; l >= 1; l--)
    fa(e, a, l);
  _ = r;
  do
    l = e.heap[
      1
      /*SMALLEST*/
    ], e.heap[
      1
      /*SMALLEST*/
    ] = e.heap[e.heap_len--], fa(
      e,
      a,
      1
      /*SMALLEST*/
    ), f = e.heap[
      1
      /*SMALLEST*/
    ], e.heap[--e.heap_max] = l, e.heap[--e.heap_max] = f, a[_ * 2] = a[l * 2] + a[f * 2], e.depth[_] = (e.depth[l] >= e.depth[f] ? e.depth[l] : e.depth[f]) + 1, a[l * 2 + 1] = a[f * 2 + 1] = _, e.heap[
      1
      /*SMALLEST*/
    ] = _++, fa(
      e,
      a,
      1
      /*SMALLEST*/
    );
  while (e.heap_len >= 2);
  e.heap[--e.heap_max] = e.heap[
    1
    /*SMALLEST*/
  ], ki(e, i), Nt(a, o, e.bl_count);
}
function La(e, i, a) {
  var t, n = -1, r, l = i[0 * 2 + 1], f = 0, o = 7, _ = 4;
  for (l === 0 && (o = 138, _ = 3), i[(a + 1) * 2 + 1] = 65535, t = 0; t <= a; t++)
    r = l, l = i[(t + 1) * 2 + 1], !(++f < o && r === l) && (f < _ ? e.bl_tree[r * 2] += f : r !== 0 ? (r !== n && e.bl_tree[r * 2]++, e.bl_tree[yt * 2]++) : f <= 10 ? e.bl_tree[zt * 2]++ : e.bl_tree[mt * 2]++, f = 0, n = r, l === 0 ? (o = 138, _ = 3) : r === l ? (o = 6, _ = 3) : (o = 7, _ = 4));
}
function $a(e, i, a) {
  var t, n = -1, r, l = i[0 * 2 + 1], f = 0, o = 7, _ = 4;
  for (l === 0 && (o = 138, _ = 3), t = 0; t <= a; t++)
    if (r = l, l = i[(t + 1) * 2 + 1], !(++f < o && r === l)) {
      if (f < _)
        do
          Y(e, r, e.bl_tree);
        while (--f !== 0);
      else
        r !== 0 ? (r !== n && (Y(e, r, e.bl_tree), f--), Y(e, yt, e.bl_tree), B(e, f - 3, 2)) : f <= 10 ? (Y(e, zt, e.bl_tree), B(e, f - 3, 3)) : (Y(e, mt, e.bl_tree), B(e, f - 11, 7));
      f = 0, n = r, l === 0 ? (o = 138, _ = 3) : r === l ? (o = 6, _ = 3) : (o = 7, _ = 4);
    }
}
function yi(e) {
  var i;
  for (La(e, e.dyn_ltree, e.l_desc.max_code), La(e, e.dyn_dtree, e.d_desc.max_code), ga(e, e.bl_desc), i = za - 1; i >= 3 && e.bl_tree[Tt[i] * 2 + 1] === 0; i--)
    ;
  return e.opt_len += 3 * (i + 1) + 5 + 5 + 4, i;
}
function zi(e, i, a, t) {
  var n;
  for (B(e, i - 257, 5), B(e, a - 1, 5), B(e, t - 4, 4), n = 0; n < t; n++)
    B(e, e.bl_tree[Tt[n] * 2 + 1], 3);
  $a(e, e.dyn_ltree, i - 1), $a(e, e.dyn_dtree, a - 1);
}
function mi(e) {
  var i = 4093624447, a;
  for (a = 0; a <= 31; a++, i >>>= 1)
    if (i & 1 && e.dyn_ltree[a * 2] !== 0)
      return Na;
  if (e.dyn_ltree[9 * 2] !== 0 || e.dyn_ltree[10 * 2] !== 0 || e.dyn_ltree[13 * 2] !== 0)
    return Ia;
  for (a = 32; a < Be; a++)
    if (e.dyn_ltree[a * 2] !== 0)
      return Ia;
  return Na;
}
var Fa = !1;
function Ti(e) {
  Fa || (Ei(), Fa = !0), e.l_desc = new na(e.dyn_ltree, At), e.d_desc = new na(e.dyn_dtree, Dt), e.bl_desc = new na(e.bl_tree, Zt), e.bi_buf = 0, e.bi_valid = 0, It(e);
}
function Ct(e, i, a, t) {
  B(e, (vi << 1) + (t ? 1 : 0), 3), Si(e, i, a, !0);
}
function Ai(e) {
  B(e, Et << 1, 3), Y(e, ma, W), xi(e);
}
function Di(e, i, a, t) {
  var n, r, l = 0;
  e.level > 0 ? (e.strm.data_type === ui && (e.strm.data_type = mi(e)), ga(e, e.l_desc), ga(e, e.d_desc), l = yi(e), n = e.opt_len + 3 + 7 >>> 3, r = e.static_len + 3 + 7 >>> 3, r <= n && (n = r)) : n = r = a + 5, a + 4 <= n && i !== -1 ? Ct(e, i, a, t) : e.strategy === di || r === n ? (B(e, (Et << 1) + (t ? 1 : 0), 3), Ca(e, W, ye)) : (B(e, (ci << 1) + (t ? 1 : 0), 3), zi(e, e.l_desc.max_code + 1, e.d_desc.max_code + 1, l + 1), Ca(e, e.dyn_ltree, e.dyn_dtree)), It(e), t && Bt(e);
}
function Zi(e, i, a) {
  return e.pending_buf[e.d_buf + e.last_lit * 2] = i >>> 8 & 255, e.pending_buf[e.d_buf + e.last_lit * 2 + 1] = i & 255, e.pending_buf[e.l_buf + e.last_lit] = a & 255, e.last_lit++, i === 0 ? e.dyn_ltree[a * 2]++ : (e.matches++, i--, e.dyn_ltree[(Re[a] + Be + 1) * 2]++, e.dyn_dtree[Rt(i) * 2]++), e.last_lit === e.lit_bufsize - 1;
}
pe._tr_init = Ti;
pe._tr_stored_block = Ct;
pe._tr_flush_block = Di;
pe._tr_tally = Zi;
pe._tr_align = Ai;
function Ri(e, i, a, t) {
  for (var n = e & 65535 | 0, r = e >>> 16 & 65535 | 0, l = 0; a !== 0; ) {
    l = a > 2e3 ? 2e3 : a, a -= l;
    do
      n = n + i[t++] | 0, r = r + n | 0;
    while (--l);
    n %= 65521, r %= 65521;
  }
  return n | r << 16 | 0;
}
var Lt = Ri;
function Oi() {
  for (var e, i = [], a = 0; a < 256; a++) {
    e = a;
    for (var t = 0; t < 8; t++)
      e = e & 1 ? 3988292384 ^ e >>> 1 : e >>> 1;
    i[a] = e;
  }
  return i;
}
var Ni = Oi();
function Ii(e, i, a, t) {
  var n = Ni, r = t + a;
  e ^= -1;
  for (var l = t; l < r; l++)
    e = e >>> 8 ^ n[(e ^ i[l]) & 255];
  return e ^ -1;
}
var $t = Ii, Aa = {
  2: "need dictionary",
  /* Z_NEED_DICT       2  */
  1: "stream end",
  /* Z_STREAM_END      1  */
  0: "",
  /* Z_OK              0  */
  "-1": "file error",
  /* Z_ERRNO         (-1) */
  "-2": "stream error",
  /* Z_STREAM_ERROR  (-2) */
  "-3": "data error",
  /* Z_DATA_ERROR    (-3) */
  "-4": "insufficient memory",
  /* Z_MEM_ERROR     (-4) */
  "-5": "buffer error",
  /* Z_BUF_ERROR     (-5) */
  "-6": "incompatible version"
  /* Z_VERSION_ERROR (-6) */
}, I = V, L = pe, Ft = Lt, Q = $t, Bi = Aa, de = 0, Ci = 1, Li = 3, ie = 4, Ma = 5, X = 0, Ha = 1, $ = -2, $i = -3, la = -5, Fi = -1, Mi = 1, Ue = 2, Hi = 3, Ui = 4, Ki = 0, Pi = 2, ea = 8, Yi = 9, Xi = 15, ji = 8, Gi = 29, Wi = 256, wa = Wi + 1 + Gi, Vi = 30, Ji = 19, Qi = 2 * wa + 1, qi = 15, E = 3, ae = 258, H = ae + E + 1, er = 32, aa = 42, pa = 69, Ge = 73, We = 91, Ve = 103, ne = 113, Se = 666, O = 1, Ce = 2, fe = 3, ke = 4, ar = 3;
function te(e, i) {
  return e.msg = Bi[i], i;
}
function Ua(e) {
  return (e << 1) - (e > 4 ? 9 : 0);
}
function ee(e) {
  for (var i = e.length; --i >= 0; )
    e[i] = 0;
}
function q(e) {
  var i = e.state, a = i.pending;
  a > e.avail_out && (a = e.avail_out), a !== 0 && (I.arraySet(e.output, i.pending_buf, i.pending_out, a, e.next_out), e.next_out += a, i.pending_out += a, e.total_out += a, e.avail_out -= a, i.pending -= a, i.pending === 0 && (i.pending_out = 0));
}
function N(e, i) {
  L._tr_flush_block(e, e.block_start >= 0 ? e.block_start : -1, e.strstart - e.block_start, i), e.block_start = e.strstart, q(e.strm);
}
function z(e, i) {
  e.pending_buf[e.pending++] = i;
}
function Ee(e, i) {
  e.pending_buf[e.pending++] = i >>> 8 & 255, e.pending_buf[e.pending++] = i & 255;
}
function tr(e, i, a, t) {
  var n = e.avail_in;
  return n > t && (n = t), n === 0 ? 0 : (e.avail_in -= n, I.arraySet(i, e.input, e.next_in, n, a), e.state.wrap === 1 ? e.adler = Ft(e.adler, i, n, a) : e.state.wrap === 2 && (e.adler = Q(e.adler, i, n, a)), e.next_in += n, e.total_in += n, n);
}
function Mt(e, i) {
  var a = e.max_chain_length, t = e.strstart, n, r, l = e.prev_length, f = e.nice_match, o = e.strstart > e.w_size - H ? e.strstart - (e.w_size - H) : 0, _ = e.window, h = e.w_mask, p = e.prev, u = e.strstart + ae, d = _[t + l - 1], s = _[t + l];
  e.prev_length >= e.good_match && (a >>= 2), f > e.lookahead && (f = e.lookahead);
  do
    if (n = i, !(_[n + l] !== s || _[n + l - 1] !== d || _[n] !== _[t] || _[++n] !== _[t + 1])) {
      t += 2, n++;
      do
        ;
      while (_[++t] === _[++n] && _[++t] === _[++n] && _[++t] === _[++n] && _[++t] === _[++n] && _[++t] === _[++n] && _[++t] === _[++n] && _[++t] === _[++n] && _[++t] === _[++n] && t < u);
      if (r = ae - (u - t), t = u - ae, r > l) {
        if (e.match_start = i, l = r, r >= f)
          break;
        d = _[t + l - 1], s = _[t + l];
      }
    }
  while ((i = p[i & h]) > o && --a !== 0);
  return l <= e.lookahead ? l : e.lookahead;
}
function le(e) {
  var i = e.w_size, a, t, n, r, l;
  do {
    if (r = e.window_size - e.lookahead - e.strstart, e.strstart >= i + (i - H)) {
      I.arraySet(e.window, e.window, i, i, 0), e.match_start -= i, e.strstart -= i, e.block_start -= i, t = e.hash_size, a = t;
      do
        n = e.head[--a], e.head[a] = n >= i ? n - i : 0;
      while (--t);
      t = i, a = t;
      do
        n = e.prev[--a], e.prev[a] = n >= i ? n - i : 0;
      while (--t);
      r += i;
    }
    if (e.strm.avail_in === 0)
      break;
    if (t = tr(e.strm, e.window, e.strstart + e.lookahead, r), e.lookahead += t, e.lookahead + e.insert >= E)
      for (l = e.strstart - e.insert, e.ins_h = e.window[l], e.ins_h = (e.ins_h << e.hash_shift ^ e.window[l + 1]) & e.hash_mask; e.insert && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[l + E - 1]) & e.hash_mask, e.prev[l & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = l, l++, e.insert--, !(e.lookahead + e.insert < E)); )
        ;
  } while (e.lookahead < H && e.strm.avail_in !== 0);
}
function ir(e, i) {
  var a = 65535;
  for (a > e.pending_buf_size - 5 && (a = e.pending_buf_size - 5); ; ) {
    if (e.lookahead <= 1) {
      if (le(e), e.lookahead === 0 && i === de)
        return O;
      if (e.lookahead === 0)
        break;
    }
    e.strstart += e.lookahead, e.lookahead = 0;
    var t = e.block_start + a;
    if ((e.strstart === 0 || e.strstart >= t) && (e.lookahead = e.strstart - t, e.strstart = t, N(e, !1), e.strm.avail_out === 0) || e.strstart - e.block_start >= e.w_size - H && (N(e, !1), e.strm.avail_out === 0))
      return O;
  }
  return e.insert = 0, i === ie ? (N(e, !0), e.strm.avail_out === 0 ? fe : ke) : (e.strstart > e.block_start && (N(e, !1), e.strm.avail_out === 0), O);
}
function _a(e, i) {
  for (var a, t; ; ) {
    if (e.lookahead < H) {
      if (le(e), e.lookahead < H && i === de)
        return O;
      if (e.lookahead === 0)
        break;
    }
    if (a = 0, e.lookahead >= E && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + E - 1]) & e.hash_mask, a = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart), a !== 0 && e.strstart - a <= e.w_size - H && (e.match_length = Mt(e, a)), e.match_length >= E)
      if (t = L._tr_tally(e, e.strstart - e.match_start, e.match_length - E), e.lookahead -= e.match_length, e.match_length <= e.max_lazy_match && e.lookahead >= E) {
        e.match_length--;
        do
          e.strstart++, e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + E - 1]) & e.hash_mask, a = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart;
        while (--e.match_length !== 0);
        e.strstart++;
      } else
        e.strstart += e.match_length, e.match_length = 0, e.ins_h = e.window[e.strstart], e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + 1]) & e.hash_mask;
    else
      t = L._tr_tally(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++;
    if (t && (N(e, !1), e.strm.avail_out === 0))
      return O;
  }
  return e.insert = e.strstart < E - 1 ? e.strstart : E - 1, i === ie ? (N(e, !0), e.strm.avail_out === 0 ? fe : ke) : e.last_lit && (N(e, !1), e.strm.avail_out === 0) ? O : Ce;
}
function ve(e, i) {
  for (var a, t, n; ; ) {
    if (e.lookahead < H) {
      if (le(e), e.lookahead < H && i === de)
        return O;
      if (e.lookahead === 0)
        break;
    }
    if (a = 0, e.lookahead >= E && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + E - 1]) & e.hash_mask, a = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart), e.prev_length = e.match_length, e.prev_match = e.match_start, e.match_length = E - 1, a !== 0 && e.prev_length < e.max_lazy_match && e.strstart - a <= e.w_size - H && (e.match_length = Mt(e, a), e.match_length <= 5 && (e.strategy === Mi || e.match_length === E && e.strstart - e.match_start > 4096) && (e.match_length = E - 1)), e.prev_length >= E && e.match_length <= e.prev_length) {
      n = e.strstart + e.lookahead - E, t = L._tr_tally(e, e.strstart - 1 - e.prev_match, e.prev_length - E), e.lookahead -= e.prev_length - 1, e.prev_length -= 2;
      do
        ++e.strstart <= n && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + E - 1]) & e.hash_mask, a = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart);
      while (--e.prev_length !== 0);
      if (e.match_available = 0, e.match_length = E - 1, e.strstart++, t && (N(e, !1), e.strm.avail_out === 0))
        return O;
    } else if (e.match_available) {
      if (t = L._tr_tally(e, 0, e.window[e.strstart - 1]), t && N(e, !1), e.strstart++, e.lookahead--, e.strm.avail_out === 0)
        return O;
    } else
      e.match_available = 1, e.strstart++, e.lookahead--;
  }
  return e.match_available && (t = L._tr_tally(e, 0, e.window[e.strstart - 1]), e.match_available = 0), e.insert = e.strstart < E - 1 ? e.strstart : E - 1, i === ie ? (N(e, !0), e.strm.avail_out === 0 ? fe : ke) : e.last_lit && (N(e, !1), e.strm.avail_out === 0) ? O : Ce;
}
function rr(e, i) {
  for (var a, t, n, r, l = e.window; ; ) {
    if (e.lookahead <= ae) {
      if (le(e), e.lookahead <= ae && i === de)
        return O;
      if (e.lookahead === 0)
        break;
    }
    if (e.match_length = 0, e.lookahead >= E && e.strstart > 0 && (n = e.strstart - 1, t = l[n], t === l[++n] && t === l[++n] && t === l[++n])) {
      r = e.strstart + ae;
      do
        ;
      while (t === l[++n] && t === l[++n] && t === l[++n] && t === l[++n] && t === l[++n] && t === l[++n] && t === l[++n] && t === l[++n] && n < r);
      e.match_length = ae - (r - n), e.match_length > e.lookahead && (e.match_length = e.lookahead);
    }
    if (e.match_length >= E ? (a = L._tr_tally(e, 1, e.match_length - E), e.lookahead -= e.match_length, e.strstart += e.match_length, e.match_length = 0) : (a = L._tr_tally(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++), a && (N(e, !1), e.strm.avail_out === 0))
      return O;
  }
  return e.insert = 0, i === ie ? (N(e, !0), e.strm.avail_out === 0 ? fe : ke) : e.last_lit && (N(e, !1), e.strm.avail_out === 0) ? O : Ce;
}
function nr(e, i) {
  for (var a; ; ) {
    if (e.lookahead === 0 && (le(e), e.lookahead === 0)) {
      if (i === de)
        return O;
      break;
    }
    if (e.match_length = 0, a = L._tr_tally(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++, a && (N(e, !1), e.strm.avail_out === 0))
      return O;
  }
  return e.insert = 0, i === ie ? (N(e, !0), e.strm.avail_out === 0 ? fe : ke) : e.last_lit && (N(e, !1), e.strm.avail_out === 0) ? O : Ce;
}
function K(e, i, a, t, n) {
  this.good_length = e, this.max_lazy = i, this.nice_length = a, this.max_chain = t, this.func = n;
}
var se;
se = [
  /*      good lazy nice chain */
  new K(0, 0, 0, 0, ir),
  /* 0 store only */
  new K(4, 4, 8, 4, _a),
  /* 1 max speed, no lazy matches */
  new K(4, 5, 16, 8, _a),
  /* 2 */
  new K(4, 6, 32, 32, _a),
  /* 3 */
  new K(4, 4, 16, 16, ve),
  /* 4 lazy matches */
  new K(8, 16, 32, 32, ve),
  /* 5 */
  new K(8, 16, 128, 128, ve),
  /* 6 */
  new K(8, 32, 128, 256, ve),
  /* 7 */
  new K(32, 128, 258, 1024, ve),
  /* 8 */
  new K(32, 258, 258, 4096, ve)
  /* 9 max compression */
];
function fr(e) {
  e.window_size = 2 * e.w_size, ee(e.head), e.max_lazy_match = se[e.level].max_lazy, e.good_match = se[e.level].good_length, e.nice_match = se[e.level].nice_length, e.max_chain_length = se[e.level].max_chain, e.strstart = 0, e.block_start = 0, e.lookahead = 0, e.insert = 0, e.match_length = e.prev_length = E - 1, e.match_available = 0, e.ins_h = 0;
}
function lr() {
  this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = ea, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new I.Buf16(Qi * 2), this.dyn_dtree = new I.Buf16((2 * Vi + 1) * 2), this.bl_tree = new I.Buf16((2 * Ji + 1) * 2), ee(this.dyn_ltree), ee(this.dyn_dtree), ee(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new I.Buf16(qi + 1), this.heap = new I.Buf16(2 * wa + 1), ee(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new I.Buf16(2 * wa + 1), ee(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
}
function Ht(e) {
  var i;
  return !e || !e.state ? te(e, $) : (e.total_in = e.total_out = 0, e.data_type = Pi, i = e.state, i.pending = 0, i.pending_out = 0, i.wrap < 0 && (i.wrap = -i.wrap), i.status = i.wrap ? aa : ne, e.adler = i.wrap === 2 ? 0 : 1, i.last_flush = de, L._tr_init(i), X);
}
function Ut(e) {
  var i = Ht(e);
  return i === X && fr(e.state), i;
}
function _r(e, i) {
  return !e || !e.state || e.state.wrap !== 2 ? $ : (e.state.gzhead = i, X);
}
function Kt(e, i, a, t, n, r) {
  if (!e)
    return $;
  var l = 1;
  if (i === Fi && (i = 6), t < 0 ? (l = 0, t = -t) : t > 15 && (l = 2, t -= 16), n < 1 || n > Yi || a !== ea || t < 8 || t > 15 || i < 0 || i > 9 || r < 0 || r > Ui)
    return te(e, $);
  t === 8 && (t = 9);
  var f = new lr();
  return e.state = f, f.strm = e, f.wrap = l, f.gzhead = null, f.w_bits = t, f.w_size = 1 << f.w_bits, f.w_mask = f.w_size - 1, f.hash_bits = n + 7, f.hash_size = 1 << f.hash_bits, f.hash_mask = f.hash_size - 1, f.hash_shift = ~~((f.hash_bits + E - 1) / E), f.window = new I.Buf8(f.w_size * 2), f.head = new I.Buf16(f.hash_size), f.prev = new I.Buf16(f.w_size), f.lit_bufsize = 1 << n + 6, f.pending_buf_size = f.lit_bufsize * 4, f.pending_buf = new I.Buf8(f.pending_buf_size), f.d_buf = 1 * f.lit_bufsize, f.l_buf = (1 + 2) * f.lit_bufsize, f.level = i, f.strategy = r, f.method = a, Ut(e);
}
function hr(e, i) {
  return Kt(e, i, ea, Xi, ji, Ki);
}
function or(e, i) {
  var a, t, n, r;
  if (!e || !e.state || i > Ma || i < 0)
    return e ? te(e, $) : $;
  if (t = e.state, !e.output || !e.input && e.avail_in !== 0 || t.status === Se && i !== ie)
    return te(e, e.avail_out === 0 ? la : $);
  if (t.strm = e, a = t.last_flush, t.last_flush = i, t.status === aa)
    if (t.wrap === 2)
      e.adler = 0, z(t, 31), z(t, 139), z(t, 8), t.gzhead ? (z(
        t,
        (t.gzhead.text ? 1 : 0) + (t.gzhead.hcrc ? 2 : 0) + (t.gzhead.extra ? 4 : 0) + (t.gzhead.name ? 8 : 0) + (t.gzhead.comment ? 16 : 0)
      ), z(t, t.gzhead.time & 255), z(t, t.gzhead.time >> 8 & 255), z(t, t.gzhead.time >> 16 & 255), z(t, t.gzhead.time >> 24 & 255), z(t, t.level === 9 ? 2 : t.strategy >= Ue || t.level < 2 ? 4 : 0), z(t, t.gzhead.os & 255), t.gzhead.extra && t.gzhead.extra.length && (z(t, t.gzhead.extra.length & 255), z(t, t.gzhead.extra.length >> 8 & 255)), t.gzhead.hcrc && (e.adler = Q(e.adler, t.pending_buf, t.pending, 0)), t.gzindex = 0, t.status = pa) : (z(t, 0), z(t, 0), z(t, 0), z(t, 0), z(t, 0), z(t, t.level === 9 ? 2 : t.strategy >= Ue || t.level < 2 ? 4 : 0), z(t, ar), t.status = ne);
    else {
      var l = ea + (t.w_bits - 8 << 4) << 8, f = -1;
      t.strategy >= Ue || t.level < 2 ? f = 0 : t.level < 6 ? f = 1 : t.level === 6 ? f = 2 : f = 3, l |= f << 6, t.strstart !== 0 && (l |= er), l += 31 - l % 31, t.status = ne, Ee(t, l), t.strstart !== 0 && (Ee(t, e.adler >>> 16), Ee(t, e.adler & 65535)), e.adler = 1;
    }
  if (t.status === pa)
    if (t.gzhead.extra) {
      for (n = t.pending; t.gzindex < (t.gzhead.extra.length & 65535) && !(t.pending === t.pending_buf_size && (t.gzhead.hcrc && t.pending > n && (e.adler = Q(e.adler, t.pending_buf, t.pending - n, n)), q(e), n = t.pending, t.pending === t.pending_buf_size)); )
        z(t, t.gzhead.extra[t.gzindex] & 255), t.gzindex++;
      t.gzhead.hcrc && t.pending > n && (e.adler = Q(e.adler, t.pending_buf, t.pending - n, n)), t.gzindex === t.gzhead.extra.length && (t.gzindex = 0, t.status = Ge);
    } else
      t.status = Ge;
  if (t.status === Ge)
    if (t.gzhead.name) {
      n = t.pending;
      do {
        if (t.pending === t.pending_buf_size && (t.gzhead.hcrc && t.pending > n && (e.adler = Q(e.adler, t.pending_buf, t.pending - n, n)), q(e), n = t.pending, t.pending === t.pending_buf_size)) {
          r = 1;
          break;
        }
        t.gzindex < t.gzhead.name.length ? r = t.gzhead.name.charCodeAt(t.gzindex++) & 255 : r = 0, z(t, r);
      } while (r !== 0);
      t.gzhead.hcrc && t.pending > n && (e.adler = Q(e.adler, t.pending_buf, t.pending - n, n)), r === 0 && (t.gzindex = 0, t.status = We);
    } else
      t.status = We;
  if (t.status === We)
    if (t.gzhead.comment) {
      n = t.pending;
      do {
        if (t.pending === t.pending_buf_size && (t.gzhead.hcrc && t.pending > n && (e.adler = Q(e.adler, t.pending_buf, t.pending - n, n)), q(e), n = t.pending, t.pending === t.pending_buf_size)) {
          r = 1;
          break;
        }
        t.gzindex < t.gzhead.comment.length ? r = t.gzhead.comment.charCodeAt(t.gzindex++) & 255 : r = 0, z(t, r);
      } while (r !== 0);
      t.gzhead.hcrc && t.pending > n && (e.adler = Q(e.adler, t.pending_buf, t.pending - n, n)), r === 0 && (t.status = Ve);
    } else
      t.status = Ve;
  if (t.status === Ve && (t.gzhead.hcrc ? (t.pending + 2 > t.pending_buf_size && q(e), t.pending + 2 <= t.pending_buf_size && (z(t, e.adler & 255), z(t, e.adler >> 8 & 255), e.adler = 0, t.status = ne)) : t.status = ne), t.pending !== 0) {
    if (q(e), e.avail_out === 0)
      return t.last_flush = -1, X;
  } else if (e.avail_in === 0 && Ua(i) <= Ua(a) && i !== ie)
    return te(e, la);
  if (t.status === Se && e.avail_in !== 0)
    return te(e, la);
  if (e.avail_in !== 0 || t.lookahead !== 0 || i !== de && t.status !== Se) {
    var o = t.strategy === Ue ? nr(t, i) : t.strategy === Hi ? rr(t, i) : se[t.level].func(t, i);
    if ((o === fe || o === ke) && (t.status = Se), o === O || o === fe)
      return e.avail_out === 0 && (t.last_flush = -1), X;
    if (o === Ce && (i === Ci ? L._tr_align(t) : i !== Ma && (L._tr_stored_block(t, 0, 0, !1), i === Li && (ee(t.head), t.lookahead === 0 && (t.strstart = 0, t.block_start = 0, t.insert = 0))), q(e), e.avail_out === 0))
      return t.last_flush = -1, X;
  }
  return i !== ie ? X : t.wrap <= 0 ? Ha : (t.wrap === 2 ? (z(t, e.adler & 255), z(t, e.adler >> 8 & 255), z(t, e.adler >> 16 & 255), z(t, e.adler >> 24 & 255), z(t, e.total_in & 255), z(t, e.total_in >> 8 & 255), z(t, e.total_in >> 16 & 255), z(t, e.total_in >> 24 & 255)) : (Ee(t, e.adler >>> 16), Ee(t, e.adler & 65535)), q(e), t.wrap > 0 && (t.wrap = -t.wrap), t.pending !== 0 ? X : Ha);
}
function dr(e) {
  var i;
  return !e || !e.state ? $ : (i = e.state.status, i !== aa && i !== pa && i !== Ge && i !== We && i !== Ve && i !== ne && i !== Se ? te(e, $) : (e.state = null, i === ne ? te(e, $i) : X));
}
function ur(e, i) {
  var a = i.length, t, n, r, l, f, o, _, h;
  if (!e || !e.state || (t = e.state, l = t.wrap, l === 2 || l === 1 && t.status !== aa || t.lookahead))
    return $;
  for (l === 1 && (e.adler = Ft(e.adler, i, a, 0)), t.wrap = 0, a >= t.w_size && (l === 0 && (ee(t.head), t.strstart = 0, t.block_start = 0, t.insert = 0), h = new I.Buf8(t.w_size), I.arraySet(h, i, a - t.w_size, t.w_size, 0), i = h, a = t.w_size), f = e.avail_in, o = e.next_in, _ = e.input, e.avail_in = a, e.next_in = 0, e.input = i, le(t); t.lookahead >= E; ) {
    n = t.strstart, r = t.lookahead - (E - 1);
    do
      t.ins_h = (t.ins_h << t.hash_shift ^ t.window[n + E - 1]) & t.hash_mask, t.prev[n & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = n, n++;
    while (--r);
    t.strstart = n, t.lookahead = E - 1, le(t);
  }
  return t.strstart += t.lookahead, t.block_start = t.strstart, t.insert = t.lookahead, t.lookahead = 0, t.match_length = t.prev_length = E - 1, t.match_available = 0, e.next_in = o, e.input = _, e.avail_in = f, t.wrap = l, X;
}
j.deflateInit = hr;
j.deflateInit2 = Kt;
j.deflateReset = Ut;
j.deflateResetKeep = Ht;
j.deflateSetHeader = _r;
j.deflate = or;
j.deflateEnd = dr;
j.deflateSetDictionary = ur;
j.deflateInfo = "pako deflate (from Nodeca project)";
var ue = {}, ta = V, Pt = !0, Yt = !0;
try {
  String.fromCharCode.apply(null, [0]);
} catch {
  Pt = !1;
}
try {
  String.fromCharCode.apply(null, new Uint8Array(1));
} catch {
  Yt = !1;
}
var Ne = new ta.Buf8(256);
for (var J = 0; J < 256; J++)
  Ne[J] = J >= 252 ? 6 : J >= 248 ? 5 : J >= 240 ? 4 : J >= 224 ? 3 : J >= 192 ? 2 : 1;
Ne[254] = Ne[254] = 1;
ue.string2buf = function(e) {
  var i, a, t, n, r, l = e.length, f = 0;
  for (n = 0; n < l; n++)
    a = e.charCodeAt(n), (a & 64512) === 55296 && n + 1 < l && (t = e.charCodeAt(n + 1), (t & 64512) === 56320 && (a = 65536 + (a - 55296 << 10) + (t - 56320), n++)), f += a < 128 ? 1 : a < 2048 ? 2 : a < 65536 ? 3 : 4;
  for (i = new ta.Buf8(f), r = 0, n = 0; r < f; n++)
    a = e.charCodeAt(n), (a & 64512) === 55296 && n + 1 < l && (t = e.charCodeAt(n + 1), (t & 64512) === 56320 && (a = 65536 + (a - 55296 << 10) + (t - 56320), n++)), a < 128 ? i[r++] = a : a < 2048 ? (i[r++] = 192 | a >>> 6, i[r++] = 128 | a & 63) : a < 65536 ? (i[r++] = 224 | a >>> 12, i[r++] = 128 | a >>> 6 & 63, i[r++] = 128 | a & 63) : (i[r++] = 240 | a >>> 18, i[r++] = 128 | a >>> 12 & 63, i[r++] = 128 | a >>> 6 & 63, i[r++] = 128 | a & 63);
  return i;
};
function Xt(e, i) {
  if (i < 65534 && (e.subarray && Yt || !e.subarray && Pt))
    return String.fromCharCode.apply(null, ta.shrinkBuf(e, i));
  for (var a = "", t = 0; t < i; t++)
    a += String.fromCharCode(e[t]);
  return a;
}
ue.buf2binstring = function(e) {
  return Xt(e, e.length);
};
ue.binstring2buf = function(e) {
  for (var i = new ta.Buf8(e.length), a = 0, t = i.length; a < t; a++)
    i[a] = e.charCodeAt(a);
  return i;
};
ue.buf2string = function(e, i) {
  var a, t, n, r, l = i || e.length, f = new Array(l * 2);
  for (t = 0, a = 0; a < l; ) {
    if (n = e[a++], n < 128) {
      f[t++] = n;
      continue;
    }
    if (r = Ne[n], r > 4) {
      f[t++] = 65533, a += r - 1;
      continue;
    }
    for (n &= r === 2 ? 31 : r === 3 ? 15 : 7; r > 1 && a < l; )
      n = n << 6 | e[a++] & 63, r--;
    if (r > 1) {
      f[t++] = 65533;
      continue;
    }
    n < 65536 ? f[t++] = n : (n -= 65536, f[t++] = 55296 | n >> 10 & 1023, f[t++] = 56320 | n & 1023);
  }
  return Xt(f, t);
};
ue.utf8border = function(e, i) {
  var a;
  for (i = i || e.length, i > e.length && (i = e.length), a = i - 1; a >= 0 && (e[a] & 192) === 128; )
    a--;
  return a < 0 || a === 0 ? i : a + Ne[e[a]] > i ? a : i;
};
function vr() {
  this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
}
var jt = vr, ze = j, me = V, xa = ue, ka = Aa, cr = jt, Gt = Object.prototype.toString, sr = 0, ha = 4, ge = 0, Ka = 1, Pa = 2, br = -1, gr = 0, wr = 8;
function _e(e) {
  if (!(this instanceof _e))
    return new _e(e);
  this.options = me.assign({
    level: br,
    method: wr,
    chunkSize: 16384,
    windowBits: 15,
    memLevel: 8,
    strategy: gr,
    to: ""
  }, e || {});
  var i = this.options;
  i.raw && i.windowBits > 0 ? i.windowBits = -i.windowBits : i.gzip && i.windowBits > 0 && i.windowBits < 16 && (i.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new cr(), this.strm.avail_out = 0;
  var a = ze.deflateInit2(
    this.strm,
    i.level,
    i.method,
    i.windowBits,
    i.memLevel,
    i.strategy
  );
  if (a !== ge)
    throw new Error(ka[a]);
  if (i.header && ze.deflateSetHeader(this.strm, i.header), i.dictionary) {
    var t;
    if (typeof i.dictionary == "string" ? t = xa.string2buf(i.dictionary) : Gt.call(i.dictionary) === "[object ArrayBuffer]" ? t = new Uint8Array(i.dictionary) : t = i.dictionary, a = ze.deflateSetDictionary(this.strm, t), a !== ge)
      throw new Error(ka[a]);
    this._dict_set = !0;
  }
}
_e.prototype.push = function(e, i) {
  var a = this.strm, t = this.options.chunkSize, n, r;
  if (this.ended)
    return !1;
  r = i === ~~i ? i : i === !0 ? ha : sr, typeof e == "string" ? a.input = xa.string2buf(e) : Gt.call(e) === "[object ArrayBuffer]" ? a.input = new Uint8Array(e) : a.input = e, a.next_in = 0, a.avail_in = a.input.length;
  do {
    if (a.avail_out === 0 && (a.output = new me.Buf8(t), a.next_out = 0, a.avail_out = t), n = ze.deflate(a, r), n !== Ka && n !== ge)
      return this.onEnd(n), this.ended = !0, !1;
    (a.avail_out === 0 || a.avail_in === 0 && (r === ha || r === Pa)) && (this.options.to === "string" ? this.onData(xa.buf2binstring(me.shrinkBuf(a.output, a.next_out))) : this.onData(me.shrinkBuf(a.output, a.next_out)));
  } while ((a.avail_in > 0 || a.avail_out === 0) && n !== Ka);
  return r === ha ? (n = ze.deflateEnd(this.strm), this.onEnd(n), this.ended = !0, n === ge) : (r === Pa && (this.onEnd(ge), a.avail_out = 0), !0);
};
_e.prototype.onData = function(e) {
  this.chunks.push(e);
};
_e.prototype.onEnd = function(e) {
  e === ge && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = me.flattenChunks(this.chunks)), this.chunks = [], this.err = e, this.msg = this.strm.msg;
};
function Da(e, i) {
  var a = new _e(i);
  if (a.push(e, !0), a.err)
    throw a.msg || ka[a.err];
  return a.result;
}
function pr(e, i) {
  return i = i || {}, i.raw = !0, Da(e, i);
}
function xr(e, i) {
  return i = i || {}, i.gzip = !0, Da(e, i);
}
Ie.Deflate = _e;
Ie.deflate = Da;
Ie.deflateRaw = pr;
Ie.gzip = xr;
var Le = {}, U = {}, Ke = 30, kr = 12, Er = function(i, a) {
  var t, n, r, l, f, o, _, h, p, u, d, s, c, k, b, T, A, x, v, m, S, g, y, Z, w;
  t = i.state, n = i.next_in, Z = i.input, r = n + (i.avail_in - 5), l = i.next_out, w = i.output, f = l - (a - i.avail_out), o = l + (i.avail_out - 257), _ = t.dmax, h = t.wsize, p = t.whave, u = t.wnext, d = t.window, s = t.hold, c = t.bits, k = t.lencode, b = t.distcode, T = (1 << t.lenbits) - 1, A = (1 << t.distbits) - 1;
  e:
    do {
      c < 15 && (s += Z[n++] << c, c += 8, s += Z[n++] << c, c += 8), x = k[s & T];
      a:
        for (; ; ) {
          if (v = x >>> 24, s >>>= v, c -= v, v = x >>> 16 & 255, v === 0)
            w[l++] = x & 65535;
          else if (v & 16) {
            m = x & 65535, v &= 15, v && (c < v && (s += Z[n++] << c, c += 8), m += s & (1 << v) - 1, s >>>= v, c -= v), c < 15 && (s += Z[n++] << c, c += 8, s += Z[n++] << c, c += 8), x = b[s & A];
            t:
              for (; ; ) {
                if (v = x >>> 24, s >>>= v, c -= v, v = x >>> 16 & 255, v & 16) {
                  if (S = x & 65535, v &= 15, c < v && (s += Z[n++] << c, c += 8, c < v && (s += Z[n++] << c, c += 8)), S += s & (1 << v) - 1, S > _) {
                    i.msg = "invalid distance too far back", t.mode = Ke;
                    break e;
                  }
                  if (s >>>= v, c -= v, v = l - f, S > v) {
                    if (v = S - v, v > p && t.sane) {
                      i.msg = "invalid distance too far back", t.mode = Ke;
                      break e;
                    }
                    if (g = 0, y = d, u === 0) {
                      if (g += h - v, v < m) {
                        m -= v;
                        do
                          w[l++] = d[g++];
                        while (--v);
                        g = l - S, y = w;
                      }
                    } else if (u < v) {
                      if (g += h + u - v, v -= u, v < m) {
                        m -= v;
                        do
                          w[l++] = d[g++];
                        while (--v);
                        if (g = 0, u < m) {
                          v = u, m -= v;
                          do
                            w[l++] = d[g++];
                          while (--v);
                          g = l - S, y = w;
                        }
                      }
                    } else if (g += u - v, v < m) {
                      m -= v;
                      do
                        w[l++] = d[g++];
                      while (--v);
                      g = l - S, y = w;
                    }
                    for (; m > 2; )
                      w[l++] = y[g++], w[l++] = y[g++], w[l++] = y[g++], m -= 3;
                    m && (w[l++] = y[g++], m > 1 && (w[l++] = y[g++]));
                  } else {
                    g = l - S;
                    do
                      w[l++] = w[g++], w[l++] = w[g++], w[l++] = w[g++], m -= 3;
                    while (m > 2);
                    m && (w[l++] = w[g++], m > 1 && (w[l++] = w[g++]));
                  }
                } else if (v & 64) {
                  i.msg = "invalid distance code", t.mode = Ke;
                  break e;
                } else {
                  x = b[(x & 65535) + (s & (1 << v) - 1)];
                  continue t;
                }
                break;
              }
          } else if (v & 64)
            if (v & 32) {
              t.mode = kr;
              break e;
            } else {
              i.msg = "invalid literal/length code", t.mode = Ke;
              break e;
            }
          else {
            x = k[(x & 65535) + (s & (1 << v) - 1)];
            continue a;
          }
          break;
        }
    } while (n < r && l < o);
  m = c >> 3, n -= m, c -= m << 3, s &= (1 << c) - 1, i.next_in = n, i.next_out = l, i.avail_in = n < r ? 5 + (r - n) : 5 - (n - r), i.avail_out = l < o ? 257 + (o - l) : 257 - (l - o), t.hold = s, t.bits = c;
}, Ya = V, ce = 15, Xa = 852, ja = 592, Ga = 0, oa = 1, Wa = 2, Sr = [
  /* Length codes 257..285 base */
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  13,
  15,
  17,
  19,
  23,
  27,
  31,
  35,
  43,
  51,
  59,
  67,
  83,
  99,
  115,
  131,
  163,
  195,
  227,
  258,
  0,
  0
], yr = [
  /* Length codes 257..285 extra */
  16,
  16,
  16,
  16,
  16,
  16,
  16,
  16,
  17,
  17,
  17,
  17,
  18,
  18,
  18,
  18,
  19,
  19,
  19,
  19,
  20,
  20,
  20,
  20,
  21,
  21,
  21,
  21,
  16,
  72,
  78
], zr = [
  /* Distance codes 0..29 base */
  1,
  2,
  3,
  4,
  5,
  7,
  9,
  13,
  17,
  25,
  33,
  49,
  65,
  97,
  129,
  193,
  257,
  385,
  513,
  769,
  1025,
  1537,
  2049,
  3073,
  4097,
  6145,
  8193,
  12289,
  16385,
  24577,
  0,
  0
], mr = [
  /* Distance codes 0..29 extra */
  16,
  16,
  16,
  16,
  17,
  17,
  18,
  18,
  19,
  19,
  20,
  20,
  21,
  21,
  22,
  22,
  23,
  23,
  24,
  24,
  25,
  25,
  26,
  26,
  27,
  27,
  28,
  28,
  29,
  29,
  64,
  64
], Tr = function(i, a, t, n, r, l, f, o) {
  var _ = o.bits, h = 0, p = 0, u = 0, d = 0, s = 0, c = 0, k = 0, b = 0, T = 0, A = 0, x, v, m, S, g, y = null, Z = 0, w, M = new Ya.Buf16(ce + 1), $e = new Ya.Buf16(ce + 1), Fe = null, Ra = 0, Oa, Me, He;
  for (h = 0; h <= ce; h++)
    M[h] = 0;
  for (p = 0; p < n; p++)
    M[a[t + p]]++;
  for (s = _, d = ce; d >= 1 && M[d] === 0; d--)
    ;
  if (s > d && (s = d), d === 0)
    return r[l++] = 1 << 24 | 64 << 16 | 0, r[l++] = 1 << 24 | 64 << 16 | 0, o.bits = 1, 0;
  for (u = 1; u < d && M[u] === 0; u++)
    ;
  for (s < u && (s = u), b = 1, h = 1; h <= ce; h++)
    if (b <<= 1, b -= M[h], b < 0)
      return -1;
  if (b > 0 && (i === Ga || d !== 1))
    return -1;
  for ($e[1] = 0, h = 1; h < ce; h++)
    $e[h + 1] = $e[h] + M[h];
  for (p = 0; p < n; p++)
    a[t + p] !== 0 && (f[$e[a[t + p]]++] = p);
  if (i === Ga ? (y = Fe = f, w = 19) : i === oa ? (y = Sr, Z -= 257, Fe = yr, Ra -= 257, w = 256) : (y = zr, Fe = mr, w = -1), A = 0, p = 0, h = u, g = l, c = s, k = 0, m = -1, T = 1 << s, S = T - 1, i === oa && T > Xa || i === Wa && T > ja)
    return 1;
  for (; ; ) {
    Oa = h - k, f[p] < w ? (Me = 0, He = f[p]) : f[p] > w ? (Me = Fe[Ra + f[p]], He = y[Z + f[p]]) : (Me = 32 + 64, He = 0), x = 1 << h - k, v = 1 << c, u = v;
    do
      v -= x, r[g + (A >> k) + v] = Oa << 24 | Me << 16 | He | 0;
    while (v !== 0);
    for (x = 1 << h - 1; A & x; )
      x >>= 1;
    if (x !== 0 ? (A &= x - 1, A += x) : A = 0, p++, --M[h] === 0) {
      if (h === d)
        break;
      h = a[t + f[p]];
    }
    if (h > s && (A & S) !== m) {
      for (k === 0 && (k = s), g += u, c = h - k, b = 1 << c; c + k < d && (b -= M[c + k], !(b <= 0)); )
        c++, b <<= 1;
      if (T += 1 << c, i === oa && T > Xa || i === Wa && T > ja)
        return 1;
      m = A & S, r[m] = s << 24 | c << 16 | g - l | 0;
    }
  }
  return A !== 0 && (r[g + A] = h - k << 24 | 64 << 16 | 0), o.bits = s, 0;
}, C = V, Ea = Lt, P = $t, Ar = Er, Te = Tr, Dr = 0, Wt = 1, Vt = 2, Va = 4, Zr = 5, Pe = 6, he = 0, Rr = 1, Or = 2, F = -2, Jt = -3, Qt = -4, Nr = -5, Ja = 8, qt = 1, Qa = 2, qa = 3, et = 4, at = 5, tt = 6, it = 7, rt = 8, nt = 9, ft = 10, qe = 11, G = 12, da = 13, lt = 14, ua = 15, _t = 16, ht = 17, ot = 18, dt = 19, Ye = 20, Xe = 21, ut = 22, vt = 23, ct = 24, st = 25, bt = 26, va = 27, gt = 28, wt = 29, D = 30, ei = 31, Ir = 32, Br = 852, Cr = 592, Lr = 15, $r = Lr;
function pt(e) {
  return (e >>> 24 & 255) + (e >>> 8 & 65280) + ((e & 65280) << 8) + ((e & 255) << 24);
}
function Fr() {
  this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new C.Buf16(320), this.work = new C.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
}
function ai(e) {
  var i;
  return !e || !e.state ? F : (i = e.state, e.total_in = e.total_out = i.total = 0, e.msg = "", i.wrap && (e.adler = i.wrap & 1), i.mode = qt, i.last = 0, i.havedict = 0, i.dmax = 32768, i.head = null, i.hold = 0, i.bits = 0, i.lencode = i.lendyn = new C.Buf32(Br), i.distcode = i.distdyn = new C.Buf32(Cr), i.sane = 1, i.back = -1, he);
}
function ti(e) {
  var i;
  return !e || !e.state ? F : (i = e.state, i.wsize = 0, i.whave = 0, i.wnext = 0, ai(e));
}
function ii(e, i) {
  var a, t;
  return !e || !e.state || (t = e.state, i < 0 ? (a = 0, i = -i) : (a = (i >> 4) + 1, i < 48 && (i &= 15)), i && (i < 8 || i > 15)) ? F : (t.window !== null && t.wbits !== i && (t.window = null), t.wrap = a, t.wbits = i, ti(e));
}
function ri(e, i) {
  var a, t;
  return e ? (t = new Fr(), e.state = t, t.window = null, a = ii(e, i), a !== he && (e.state = null), a) : F;
}
function Mr(e) {
  return ri(e, $r);
}
var xt = !0, ca, sa;
function Hr(e) {
  if (xt) {
    var i;
    for (ca = new C.Buf32(512), sa = new C.Buf32(32), i = 0; i < 144; )
      e.lens[i++] = 8;
    for (; i < 256; )
      e.lens[i++] = 9;
    for (; i < 280; )
      e.lens[i++] = 7;
    for (; i < 288; )
      e.lens[i++] = 8;
    for (Te(Wt, e.lens, 0, 288, ca, 0, e.work, { bits: 9 }), i = 0; i < 32; )
      e.lens[i++] = 5;
    Te(Vt, e.lens, 0, 32, sa, 0, e.work, { bits: 5 }), xt = !1;
  }
  e.lencode = ca, e.lenbits = 9, e.distcode = sa, e.distbits = 5;
}
function ni(e, i, a, t) {
  var n, r = e.state;
  return r.window === null && (r.wsize = 1 << r.wbits, r.wnext = 0, r.whave = 0, r.window = new C.Buf8(r.wsize)), t >= r.wsize ? (C.arraySet(r.window, i, a - r.wsize, r.wsize, 0), r.wnext = 0, r.whave = r.wsize) : (n = r.wsize - r.wnext, n > t && (n = t), C.arraySet(r.window, i, a - t, n, r.wnext), t -= n, t ? (C.arraySet(r.window, i, a - t, t, 0), r.wnext = t, r.whave = r.wsize) : (r.wnext += n, r.wnext === r.wsize && (r.wnext = 0), r.whave < r.wsize && (r.whave += n))), 0;
}
function Ur(e, i) {
  var a, t, n, r, l, f, o, _, h, p, u, d, s, c, k = 0, b, T, A, x, v, m, S, g, y = new C.Buf8(4), Z, w, M = (
    /* permutation of code lengths */
    [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]
  );
  if (!e || !e.state || !e.output || !e.input && e.avail_in !== 0)
    return F;
  a = e.state, a.mode === G && (a.mode = da), l = e.next_out, n = e.output, o = e.avail_out, r = e.next_in, t = e.input, f = e.avail_in, _ = a.hold, h = a.bits, p = f, u = o, g = he;
  e:
    for (; ; )
      switch (a.mode) {
        case qt:
          if (a.wrap === 0) {
            a.mode = da;
            break;
          }
          for (; h < 16; ) {
            if (f === 0)
              break e;
            f--, _ += t[r++] << h, h += 8;
          }
          if (a.wrap & 2 && _ === 35615) {
            a.check = 0, y[0] = _ & 255, y[1] = _ >>> 8 & 255, a.check = P(a.check, y, 2, 0), _ = 0, h = 0, a.mode = Qa;
            break;
          }
          if (a.flags = 0, a.head && (a.head.done = !1), !(a.wrap & 1) || /* check if zlib header allowed */
          (((_ & 255) << 8) + (_ >> 8)) % 31) {
            e.msg = "incorrect header check", a.mode = D;
            break;
          }
          if ((_ & 15) !== Ja) {
            e.msg = "unknown compression method", a.mode = D;
            break;
          }
          if (_ >>>= 4, h -= 4, S = (_ & 15) + 8, a.wbits === 0)
            a.wbits = S;
          else if (S > a.wbits) {
            e.msg = "invalid window size", a.mode = D;
            break;
          }
          a.dmax = 1 << S, e.adler = a.check = 1, a.mode = _ & 512 ? ft : G, _ = 0, h = 0;
          break;
        case Qa:
          for (; h < 16; ) {
            if (f === 0)
              break e;
            f--, _ += t[r++] << h, h += 8;
          }
          if (a.flags = _, (a.flags & 255) !== Ja) {
            e.msg = "unknown compression method", a.mode = D;
            break;
          }
          if (a.flags & 57344) {
            e.msg = "unknown header flags set", a.mode = D;
            break;
          }
          a.head && (a.head.text = _ >> 8 & 1), a.flags & 512 && (y[0] = _ & 255, y[1] = _ >>> 8 & 255, a.check = P(a.check, y, 2, 0)), _ = 0, h = 0, a.mode = qa;
        case qa:
          for (; h < 32; ) {
            if (f === 0)
              break e;
            f--, _ += t[r++] << h, h += 8;
          }
          a.head && (a.head.time = _), a.flags & 512 && (y[0] = _ & 255, y[1] = _ >>> 8 & 255, y[2] = _ >>> 16 & 255, y[3] = _ >>> 24 & 255, a.check = P(a.check, y, 4, 0)), _ = 0, h = 0, a.mode = et;
        case et:
          for (; h < 16; ) {
            if (f === 0)
              break e;
            f--, _ += t[r++] << h, h += 8;
          }
          a.head && (a.head.xflags = _ & 255, a.head.os = _ >> 8), a.flags & 512 && (y[0] = _ & 255, y[1] = _ >>> 8 & 255, a.check = P(a.check, y, 2, 0)), _ = 0, h = 0, a.mode = at;
        case at:
          if (a.flags & 1024) {
            for (; h < 16; ) {
              if (f === 0)
                break e;
              f--, _ += t[r++] << h, h += 8;
            }
            a.length = _, a.head && (a.head.extra_len = _), a.flags & 512 && (y[0] = _ & 255, y[1] = _ >>> 8 & 255, a.check = P(a.check, y, 2, 0)), _ = 0, h = 0;
          } else
            a.head && (a.head.extra = null);
          a.mode = tt;
        case tt:
          if (a.flags & 1024 && (d = a.length, d > f && (d = f), d && (a.head && (S = a.head.extra_len - a.length, a.head.extra || (a.head.extra = new Array(a.head.extra_len)), C.arraySet(
            a.head.extra,
            t,
            r,
            // extra field is limited to 65536 bytes
            // - no need for additional size check
            d,
            /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
            S
          )), a.flags & 512 && (a.check = P(a.check, t, d, r)), f -= d, r += d, a.length -= d), a.length))
            break e;
          a.length = 0, a.mode = it;
        case it:
          if (a.flags & 2048) {
            if (f === 0)
              break e;
            d = 0;
            do
              S = t[r + d++], a.head && S && a.length < 65536 && (a.head.name += String.fromCharCode(S));
            while (S && d < f);
            if (a.flags & 512 && (a.check = P(a.check, t, d, r)), f -= d, r += d, S)
              break e;
          } else
            a.head && (a.head.name = null);
          a.length = 0, a.mode = rt;
        case rt:
          if (a.flags & 4096) {
            if (f === 0)
              break e;
            d = 0;
            do
              S = t[r + d++], a.head && S && a.length < 65536 && (a.head.comment += String.fromCharCode(S));
            while (S && d < f);
            if (a.flags & 512 && (a.check = P(a.check, t, d, r)), f -= d, r += d, S)
              break e;
          } else
            a.head && (a.head.comment = null);
          a.mode = nt;
        case nt:
          if (a.flags & 512) {
            for (; h < 16; ) {
              if (f === 0)
                break e;
              f--, _ += t[r++] << h, h += 8;
            }
            if (_ !== (a.check & 65535)) {
              e.msg = "header crc mismatch", a.mode = D;
              break;
            }
            _ = 0, h = 0;
          }
          a.head && (a.head.hcrc = a.flags >> 9 & 1, a.head.done = !0), e.adler = a.check = 0, a.mode = G;
          break;
        case ft:
          for (; h < 32; ) {
            if (f === 0)
              break e;
            f--, _ += t[r++] << h, h += 8;
          }
          e.adler = a.check = pt(_), _ = 0, h = 0, a.mode = qe;
        case qe:
          if (a.havedict === 0)
            return e.next_out = l, e.avail_out = o, e.next_in = r, e.avail_in = f, a.hold = _, a.bits = h, Or;
          e.adler = a.check = 1, a.mode = G;
        case G:
          if (i === Zr || i === Pe)
            break e;
        case da:
          if (a.last) {
            _ >>>= h & 7, h -= h & 7, a.mode = va;
            break;
          }
          for (; h < 3; ) {
            if (f === 0)
              break e;
            f--, _ += t[r++] << h, h += 8;
          }
          switch (a.last = _ & 1, _ >>>= 1, h -= 1, _ & 3) {
            case 0:
              a.mode = lt;
              break;
            case 1:
              if (Hr(a), a.mode = Ye, i === Pe) {
                _ >>>= 2, h -= 2;
                break e;
              }
              break;
            case 2:
              a.mode = ht;
              break;
            case 3:
              e.msg = "invalid block type", a.mode = D;
          }
          _ >>>= 2, h -= 2;
          break;
        case lt:
          for (_ >>>= h & 7, h -= h & 7; h < 32; ) {
            if (f === 0)
              break e;
            f--, _ += t[r++] << h, h += 8;
          }
          if ((_ & 65535) !== (_ >>> 16 ^ 65535)) {
            e.msg = "invalid stored block lengths", a.mode = D;
            break;
          }
          if (a.length = _ & 65535, _ = 0, h = 0, a.mode = ua, i === Pe)
            break e;
        case ua:
          a.mode = _t;
        case _t:
          if (d = a.length, d) {
            if (d > f && (d = f), d > o && (d = o), d === 0)
              break e;
            C.arraySet(n, t, r, d, l), f -= d, r += d, o -= d, l += d, a.length -= d;
            break;
          }
          a.mode = G;
          break;
        case ht:
          for (; h < 14; ) {
            if (f === 0)
              break e;
            f--, _ += t[r++] << h, h += 8;
          }
          if (a.nlen = (_ & 31) + 257, _ >>>= 5, h -= 5, a.ndist = (_ & 31) + 1, _ >>>= 5, h -= 5, a.ncode = (_ & 15) + 4, _ >>>= 4, h -= 4, a.nlen > 286 || a.ndist > 30) {
            e.msg = "too many length or distance symbols", a.mode = D;
            break;
          }
          a.have = 0, a.mode = ot;
        case ot:
          for (; a.have < a.ncode; ) {
            for (; h < 3; ) {
              if (f === 0)
                break e;
              f--, _ += t[r++] << h, h += 8;
            }
            a.lens[M[a.have++]] = _ & 7, _ >>>= 3, h -= 3;
          }
          for (; a.have < 19; )
            a.lens[M[a.have++]] = 0;
          if (a.lencode = a.lendyn, a.lenbits = 7, Z = { bits: a.lenbits }, g = Te(Dr, a.lens, 0, 19, a.lencode, 0, a.work, Z), a.lenbits = Z.bits, g) {
            e.msg = "invalid code lengths set", a.mode = D;
            break;
          }
          a.have = 0, a.mode = dt;
        case dt:
          for (; a.have < a.nlen + a.ndist; ) {
            for (; k = a.lencode[_ & (1 << a.lenbits) - 1], b = k >>> 24, T = k >>> 16 & 255, A = k & 65535, !(b <= h); ) {
              if (f === 0)
                break e;
              f--, _ += t[r++] << h, h += 8;
            }
            if (A < 16)
              _ >>>= b, h -= b, a.lens[a.have++] = A;
            else {
              if (A === 16) {
                for (w = b + 2; h < w; ) {
                  if (f === 0)
                    break e;
                  f--, _ += t[r++] << h, h += 8;
                }
                if (_ >>>= b, h -= b, a.have === 0) {
                  e.msg = "invalid bit length repeat", a.mode = D;
                  break;
                }
                S = a.lens[a.have - 1], d = 3 + (_ & 3), _ >>>= 2, h -= 2;
              } else if (A === 17) {
                for (w = b + 3; h < w; ) {
                  if (f === 0)
                    break e;
                  f--, _ += t[r++] << h, h += 8;
                }
                _ >>>= b, h -= b, S = 0, d = 3 + (_ & 7), _ >>>= 3, h -= 3;
              } else {
                for (w = b + 7; h < w; ) {
                  if (f === 0)
                    break e;
                  f--, _ += t[r++] << h, h += 8;
                }
                _ >>>= b, h -= b, S = 0, d = 11 + (_ & 127), _ >>>= 7, h -= 7;
              }
              if (a.have + d > a.nlen + a.ndist) {
                e.msg = "invalid bit length repeat", a.mode = D;
                break;
              }
              for (; d--; )
                a.lens[a.have++] = S;
            }
          }
          if (a.mode === D)
            break;
          if (a.lens[256] === 0) {
            e.msg = "invalid code -- missing end-of-block", a.mode = D;
            break;
          }
          if (a.lenbits = 9, Z = { bits: a.lenbits }, g = Te(Wt, a.lens, 0, a.nlen, a.lencode, 0, a.work, Z), a.lenbits = Z.bits, g) {
            e.msg = "invalid literal/lengths set", a.mode = D;
            break;
          }
          if (a.distbits = 6, a.distcode = a.distdyn, Z = { bits: a.distbits }, g = Te(Vt, a.lens, a.nlen, a.ndist, a.distcode, 0, a.work, Z), a.distbits = Z.bits, g) {
            e.msg = "invalid distances set", a.mode = D;
            break;
          }
          if (a.mode = Ye, i === Pe)
            break e;
        case Ye:
          a.mode = Xe;
        case Xe:
          if (f >= 6 && o >= 258) {
            e.next_out = l, e.avail_out = o, e.next_in = r, e.avail_in = f, a.hold = _, a.bits = h, Ar(e, u), l = e.next_out, n = e.output, o = e.avail_out, r = e.next_in, t = e.input, f = e.avail_in, _ = a.hold, h = a.bits, a.mode === G && (a.back = -1);
            break;
          }
          for (a.back = 0; k = a.lencode[_ & (1 << a.lenbits) - 1], b = k >>> 24, T = k >>> 16 & 255, A = k & 65535, !(b <= h); ) {
            if (f === 0)
              break e;
            f--, _ += t[r++] << h, h += 8;
          }
          if (T && !(T & 240)) {
            for (x = b, v = T, m = A; k = a.lencode[m + ((_ & (1 << x + v) - 1) >> x)], b = k >>> 24, T = k >>> 16 & 255, A = k & 65535, !(x + b <= h); ) {
              if (f === 0)
                break e;
              f--, _ += t[r++] << h, h += 8;
            }
            _ >>>= x, h -= x, a.back += x;
          }
          if (_ >>>= b, h -= b, a.back += b, a.length = A, T === 0) {
            a.mode = bt;
            break;
          }
          if (T & 32) {
            a.back = -1, a.mode = G;
            break;
          }
          if (T & 64) {
            e.msg = "invalid literal/length code", a.mode = D;
            break;
          }
          a.extra = T & 15, a.mode = ut;
        case ut:
          if (a.extra) {
            for (w = a.extra; h < w; ) {
              if (f === 0)
                break e;
              f--, _ += t[r++] << h, h += 8;
            }
            a.length += _ & (1 << a.extra) - 1, _ >>>= a.extra, h -= a.extra, a.back += a.extra;
          }
          a.was = a.length, a.mode = vt;
        case vt:
          for (; k = a.distcode[_ & (1 << a.distbits) - 1], b = k >>> 24, T = k >>> 16 & 255, A = k & 65535, !(b <= h); ) {
            if (f === 0)
              break e;
            f--, _ += t[r++] << h, h += 8;
          }
          if (!(T & 240)) {
            for (x = b, v = T, m = A; k = a.distcode[m + ((_ & (1 << x + v) - 1) >> x)], b = k >>> 24, T = k >>> 16 & 255, A = k & 65535, !(x + b <= h); ) {
              if (f === 0)
                break e;
              f--, _ += t[r++] << h, h += 8;
            }
            _ >>>= x, h -= x, a.back += x;
          }
          if (_ >>>= b, h -= b, a.back += b, T & 64) {
            e.msg = "invalid distance code", a.mode = D;
            break;
          }
          a.offset = A, a.extra = T & 15, a.mode = ct;
        case ct:
          if (a.extra) {
            for (w = a.extra; h < w; ) {
              if (f === 0)
                break e;
              f--, _ += t[r++] << h, h += 8;
            }
            a.offset += _ & (1 << a.extra) - 1, _ >>>= a.extra, h -= a.extra, a.back += a.extra;
          }
          if (a.offset > a.dmax) {
            e.msg = "invalid distance too far back", a.mode = D;
            break;
          }
          a.mode = st;
        case st:
          if (o === 0)
            break e;
          if (d = u - o, a.offset > d) {
            if (d = a.offset - d, d > a.whave && a.sane) {
              e.msg = "invalid distance too far back", a.mode = D;
              break;
            }
            d > a.wnext ? (d -= a.wnext, s = a.wsize - d) : s = a.wnext - d, d > a.length && (d = a.length), c = a.window;
          } else
            c = n, s = l - a.offset, d = a.length;
          d > o && (d = o), o -= d, a.length -= d;
          do
            n[l++] = c[s++];
          while (--d);
          a.length === 0 && (a.mode = Xe);
          break;
        case bt:
          if (o === 0)
            break e;
          n[l++] = a.length, o--, a.mode = Xe;
          break;
        case va:
          if (a.wrap) {
            for (; h < 32; ) {
              if (f === 0)
                break e;
              f--, _ |= t[r++] << h, h += 8;
            }
            if (u -= o, e.total_out += u, a.total += u, u && (e.adler = a.check = /*UPDATE(state.check, put - _out, _out);*/
            a.flags ? P(a.check, n, u, l - u) : Ea(a.check, n, u, l - u)), u = o, (a.flags ? _ : pt(_)) !== a.check) {
              e.msg = "incorrect data check", a.mode = D;
              break;
            }
            _ = 0, h = 0;
          }
          a.mode = gt;
        case gt:
          if (a.wrap && a.flags) {
            for (; h < 32; ) {
              if (f === 0)
                break e;
              f--, _ += t[r++] << h, h += 8;
            }
            if (_ !== (a.total & 4294967295)) {
              e.msg = "incorrect length check", a.mode = D;
              break;
            }
            _ = 0, h = 0;
          }
          a.mode = wt;
        case wt:
          g = Rr;
          break e;
        case D:
          g = Jt;
          break e;
        case ei:
          return Qt;
        case Ir:
        default:
          return F;
      }
  return e.next_out = l, e.avail_out = o, e.next_in = r, e.avail_in = f, a.hold = _, a.bits = h, (a.wsize || u !== e.avail_out && a.mode < D && (a.mode < va || i !== Va)) && ni(e, e.output, e.next_out, u - e.avail_out), p -= e.avail_in, u -= e.avail_out, e.total_in += p, e.total_out += u, a.total += u, a.wrap && u && (e.adler = a.check = /*UPDATE(state.check, strm.next_out - _out, _out);*/
  a.flags ? P(a.check, n, u, e.next_out - u) : Ea(a.check, n, u, e.next_out - u)), e.data_type = a.bits + (a.last ? 64 : 0) + (a.mode === G ? 128 : 0) + (a.mode === Ye || a.mode === ua ? 256 : 0), (p === 0 && u === 0 || i === Va) && g === he && (g = Nr), g;
}
function Kr(e) {
  if (!e || !e.state)
    return F;
  var i = e.state;
  return i.window && (i.window = null), e.state = null, he;
}
function Pr(e, i) {
  var a;
  return !e || !e.state || (a = e.state, !(a.wrap & 2)) ? F : (a.head = i, i.done = !1, he);
}
function Yr(e, i) {
  var a = i.length, t, n, r;
  return !e || !e.state || (t = e.state, t.wrap !== 0 && t.mode !== qe) ? F : t.mode === qe && (n = 1, n = Ea(n, i, a, 0), n !== t.check) ? Jt : (r = ni(e, i, a, a), r ? (t.mode = ei, Qt) : (t.havedict = 1, he));
}
U.inflateReset = ti;
U.inflateReset2 = ii;
U.inflateResetKeep = ai;
U.inflateInit = Mr;
U.inflateInit2 = ri;
U.inflate = Ur;
U.inflateEnd = Kr;
U.inflateGetHeader = Pr;
U.inflateSetDictionary = Yr;
U.inflateInfo = "pako inflate (from Nodeca project)";
var fi = {
  /* Allowed flush values; see deflate() and inflate() below for details */
  Z_NO_FLUSH: 0,
  Z_PARTIAL_FLUSH: 1,
  Z_SYNC_FLUSH: 2,
  Z_FULL_FLUSH: 3,
  Z_FINISH: 4,
  Z_BLOCK: 5,
  Z_TREES: 6,
  /* Return codes for the compression/decompression functions. Negative values
  * are errors, positive values are used for special but normal events.
  */
  Z_OK: 0,
  Z_STREAM_END: 1,
  Z_NEED_DICT: 2,
  Z_ERRNO: -1,
  Z_STREAM_ERROR: -2,
  Z_DATA_ERROR: -3,
  //Z_MEM_ERROR:     -4,
  Z_BUF_ERROR: -5,
  //Z_VERSION_ERROR: -6,
  /* compression levels */
  Z_NO_COMPRESSION: 0,
  Z_BEST_SPEED: 1,
  Z_BEST_COMPRESSION: 9,
  Z_DEFAULT_COMPRESSION: -1,
  Z_FILTERED: 1,
  Z_HUFFMAN_ONLY: 2,
  Z_RLE: 3,
  Z_FIXED: 4,
  Z_DEFAULT_STRATEGY: 0,
  /* Possible values of the data_type field (though see inflate()) */
  Z_BINARY: 0,
  Z_TEXT: 1,
  //Z_ASCII:                1, // = Z_TEXT (deprecated)
  Z_UNKNOWN: 2,
  /* The deflate compression method */
  Z_DEFLATED: 8
  //Z_NULL:                 null // Use -1 or null inline, depending on var type
};
function Xr() {
  this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1;
}
var jr = Xr, we = U, Ae = V, Je = ue, R = fi, Sa = Aa, Gr = jt, Wr = jr, li = Object.prototype.toString;
function oe(e) {
  if (!(this instanceof oe))
    return new oe(e);
  this.options = Ae.assign({
    chunkSize: 16384,
    windowBits: 0,
    to: ""
  }, e || {});
  var i = this.options;
  i.raw && i.windowBits >= 0 && i.windowBits < 16 && (i.windowBits = -i.windowBits, i.windowBits === 0 && (i.windowBits = -15)), i.windowBits >= 0 && i.windowBits < 16 && !(e && e.windowBits) && (i.windowBits += 32), i.windowBits > 15 && i.windowBits < 48 && (i.windowBits & 15 || (i.windowBits |= 15)), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new Gr(), this.strm.avail_out = 0;
  var a = we.inflateInit2(
    this.strm,
    i.windowBits
  );
  if (a !== R.Z_OK)
    throw new Error(Sa[a]);
  if (this.header = new Wr(), we.inflateGetHeader(this.strm, this.header), i.dictionary && (typeof i.dictionary == "string" ? i.dictionary = Je.string2buf(i.dictionary) : li.call(i.dictionary) === "[object ArrayBuffer]" && (i.dictionary = new Uint8Array(i.dictionary)), i.raw && (a = we.inflateSetDictionary(this.strm, i.dictionary), a !== R.Z_OK)))
    throw new Error(Sa[a]);
}
oe.prototype.push = function(e, i) {
  var a = this.strm, t = this.options.chunkSize, n = this.options.dictionary, r, l, f, o, _, h = !1;
  if (this.ended)
    return !1;
  l = i === ~~i ? i : i === !0 ? R.Z_FINISH : R.Z_NO_FLUSH, typeof e == "string" ? a.input = Je.binstring2buf(e) : li.call(e) === "[object ArrayBuffer]" ? a.input = new Uint8Array(e) : a.input = e, a.next_in = 0, a.avail_in = a.input.length;
  do {
    if (a.avail_out === 0 && (a.output = new Ae.Buf8(t), a.next_out = 0, a.avail_out = t), r = we.inflate(a, R.Z_NO_FLUSH), r === R.Z_NEED_DICT && n && (r = we.inflateSetDictionary(this.strm, n)), r === R.Z_BUF_ERROR && h === !0 && (r = R.Z_OK, h = !1), r !== R.Z_STREAM_END && r !== R.Z_OK)
      return this.onEnd(r), this.ended = !0, !1;
    a.next_out && (a.avail_out === 0 || r === R.Z_STREAM_END || a.avail_in === 0 && (l === R.Z_FINISH || l === R.Z_SYNC_FLUSH)) && (this.options.to === "string" ? (f = Je.utf8border(a.output, a.next_out), o = a.next_out - f, _ = Je.buf2string(a.output, f), a.next_out = o, a.avail_out = t - o, o && Ae.arraySet(a.output, a.output, f, o, 0), this.onData(_)) : this.onData(Ae.shrinkBuf(a.output, a.next_out))), a.avail_in === 0 && a.avail_out === 0 && (h = !0);
  } while ((a.avail_in > 0 || a.avail_out === 0) && r !== R.Z_STREAM_END);
  return r === R.Z_STREAM_END && (l = R.Z_FINISH), l === R.Z_FINISH ? (r = we.inflateEnd(this.strm), this.onEnd(r), this.ended = !0, r === R.Z_OK) : (l === R.Z_SYNC_FLUSH && (this.onEnd(R.Z_OK), a.avail_out = 0), !0);
};
oe.prototype.onData = function(e) {
  this.chunks.push(e);
};
oe.prototype.onEnd = function(e) {
  e === R.Z_OK && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = Ae.flattenChunks(this.chunks)), this.chunks = [], this.err = e, this.msg = this.strm.msg;
};
function Za(e, i) {
  var a = new oe(i);
  if (a.push(e, !0), a.err)
    throw a.msg || Sa[a.err];
  return a.result;
}
function Vr(e, i) {
  return i = i || {}, i.raw = !0, Za(e, i);
}
Le.Inflate = oe;
Le.inflate = Za;
Le.inflateRaw = Vr;
Le.ungzip = Za;
var Jr = V.assign, Qr = Ie, qr = Le, en = fi, _i = {};
Jr(_i, Qr, qr, en);
var kt = _i;
const an = /* @__PURE__ */ hi({
  __proto__: null,
  default: kt
}, [kt]);
export {
  an as i
};
