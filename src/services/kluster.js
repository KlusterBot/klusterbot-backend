/*!
 * Socket.IO v4.4.1
 * (c) 2014-2022 Guillermo Rauch
 * Released under the MIT License.
 */
!(function (t, e) {
    "object" == typeof exports && "undefined" != typeof module
        ? (module.exports = e())
        : "function" == typeof define && define.amd
        ? define(e)
        : ((t = "undefined" != typeof globalThis ? globalThis : t || self).io =
              e());
})(this, function () {
    "use strict";
    function t(e) {
        return (
            (t =
                "function" == typeof Symbol &&
                "symbol" == typeof Symbol.iterator
                    ? function (t) {
                          return typeof t;
                      }
                    : function (t) {
                          return t &&
                              "function" == typeof Symbol &&
                              t.constructor === Symbol &&
                              t !== Symbol.prototype
                              ? "symbol"
                              : typeof t;
                      }),
            t(e)
        );
    }
    function e(t, e) {
        if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function");
    }
    function n(t, e) {
        for (var n = 0; n < e.length; n++) {
            var r = e[n];
            (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                "value" in r && (r.writable = !0),
                Object.defineProperty(t, r.key, r);
        }
    }
    function r(t, e, r) {
        return e && n(t.prototype, e), r && n(t, r), t;
    }
    function o() {
        return (
            (o =
                Object.assign ||
                function (t) {
                    for (var e = 1; e < arguments.length; e++) {
                        var n = arguments[e];
                        for (var r in n)
                            Object.prototype.hasOwnProperty.call(n, r) &&
                                (t[r] = n[r]);
                    }
                    return t;
                }),
            o.apply(this, arguments)
        );
    }
    function i(t, e) {
        if ("function" != typeof e && null !== e)
            throw new TypeError(
                "Super expression must either be null or a function"
            );
        (t.prototype = Object.create(e && e.prototype, {
            constructor: { value: t, writable: !0, configurable: !0 },
        })),
            e && a(t, e);
    }
    function s(t) {
        return (
            (s = Object.setPrototypeOf
                ? Object.getPrototypeOf
                : function (t) {
                      return t.__proto__ || Object.getPrototypeOf(t);
                  }),
            s(t)
        );
    }
    function a(t, e) {
        return (
            (a =
                Object.setPrototypeOf ||
                function (t, e) {
                    return (t.__proto__ = e), t;
                }),
            a(t, e)
        );
    }
    function c(t) {
        if (void 0 === t)
            throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
            );
        return t;
    }
    function u(t, e) {
        if (e && ("object" == typeof e || "function" == typeof e)) return e;
        if (void 0 !== e)
            throw new TypeError(
                "Derived constructors may only return object or undefined"
            );
        return c(t);
    }
    function h(t) {
        var e = (function () {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
                return (
                    Boolean.prototype.valueOf.call(
                        Reflect.construct(Boolean, [], function () {})
                    ),
                    !0
                );
            } catch (t) {
                return !1;
            }
        })();
        return function () {
            var n,
                r = s(t);
            if (e) {
                var o = s(this).constructor;
                n = Reflect.construct(r, arguments, o);
            } else n = r.apply(this, arguments);
            return u(this, n);
        };
    }
    function f(t, e, n) {
        return (
            (f =
                "undefined" != typeof Reflect && Reflect.get
                    ? Reflect.get
                    : function (t, e, n) {
                          var r = (function (t, e) {
                              for (
                                  ;
                                  !Object.prototype.hasOwnProperty.call(t, e) &&
                                  null !== (t = s(t));

                              );
                              return t;
                          })(t, e);
                          if (r) {
                              var o = Object.getOwnPropertyDescriptor(r, e);
                              return o.get ? o.get.call(n) : o.value;
                          }
                      }),
            f(t, e, n || t)
        );
    }
    function l(t, e) {
        (null == e || e > t.length) && (e = t.length);
        for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
        return r;
    }
    function p(t, e) {
        var n =
            ("undefined" != typeof Symbol && t[Symbol.iterator]) ||
            t["@@iterator"];
        if (!n) {
            if (
                Array.isArray(t) ||
                (n = (function (t, e) {
                    if (t) {
                        if ("string" == typeof t) return l(t, e);
                        var n = Object.prototype.toString.call(t).slice(8, -1);
                        return (
                            "Object" === n &&
                                t.constructor &&
                                (n = t.constructor.name),
                            "Map" === n || "Set" === n
                                ? Array.from(t)
                                : "Arguments" === n ||
                                  /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(
                                      n
                                  )
                                ? l(t, e)
                                : void 0
                        );
                    }
                })(t)) ||
                (e && t && "number" == typeof t.length)
            ) {
                n && (t = n);
                var r = 0,
                    o = function () {};
                return {
                    s: o,
                    n: function () {
                        return r >= t.length
                            ? { done: !0 }
                            : { done: !1, value: t[r++] };
                    },
                    e: function (t) {
                        throw t;
                    },
                    f: o,
                };
            }
            throw new TypeError(
                "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
            );
        }
        var i,
            s = !0,
            a = !1;
        return {
            s: function () {
                n = n.call(t);
            },
            n: function () {
                var t = n.next();
                return (s = t.done), t;
            },
            e: function (t) {
                (a = !0), (i = t);
            },
            f: function () {
                try {
                    s || null == n.return || n.return();
                } finally {
                    if (a) throw i;
                }
            },
        };
    }
    var d =
            /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
        y = [
            "source",
            "protocol",
            "authority",
            "userInfo",
            "user",
            "password",
            "host",
            "port",
            "relative",
            "path",
            "directory",
            "file",
            "query",
            "anchor",
        ],
        v = function (t) {
            var e = t,
                n = t.indexOf("["),
                r = t.indexOf("]");
            -1 != n &&
                -1 != r &&
                (t =
                    t.substring(0, n) +
                    t.substring(n, r).replace(/:/g, ";") +
                    t.substring(r, t.length));
            for (var o, i, s = d.exec(t || ""), a = {}, c = 14; c--; )
                a[y[c]] = s[c] || "";
            return (
                -1 != n &&
                    -1 != r &&
                    ((a.source = e),
                    (a.host = a.host
                        .substring(1, a.host.length - 1)
                        .replace(/;/g, ":")),
                    (a.authority = a.authority
                        .replace("[", "")
                        .replace("]", "")
                        .replace(/;/g, ":")),
                    (a.ipv6uri = !0)),
                (a.pathNames = (function (t, e) {
                    var n = /\/{2,9}/g,
                        r = e.replace(n, "/").split("/");
                    ("/" != e.substr(0, 1) && 0 !== e.length) || r.splice(0, 1);
                    "/" == e.substr(e.length - 1, 1) &&
                        r.splice(r.length - 1, 1);
                    return r;
                })(0, a.path)),
                (a.queryKey =
                    ((o = a.query),
                    (i = {}),
                    o.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function (t, e, n) {
                        e && (i[e] = n);
                    }),
                    i)),
                a
            );
        };
    var m = { exports: {} };
    try {
        m.exports =
            "undefined" != typeof XMLHttpRequest &&
            "withCredentials" in new XMLHttpRequest();
    } catch (t) {
        m.exports = !1;
    }
    var g = m.exports,
        k =
            "undefined" != typeof self
                ? self
                : "undefined" != typeof window
                ? window
                : Function("return this")();
    function b(t) {
        var e = t.xdomain;
        try {
            if ("undefined" != typeof XMLHttpRequest && (!e || g))
                return new XMLHttpRequest();
        } catch (t) {}
        if (!e)
            try {
                return new k[["Active"].concat("Object").join("X")](
                    "Microsoft.XMLHTTP"
                );
            } catch (t) {}
    }
    function w(t) {
        for (
            var e = arguments.length, n = new Array(e > 1 ? e - 1 : 0), r = 1;
            r < e;
            r++
        )
            n[r - 1] = arguments[r];
        return n.reduce(function (e, n) {
            return t.hasOwnProperty(n) && (e[n] = t[n]), e;
        }, {});
    }
    var _ = setTimeout,
        E = clearTimeout;
    function A(t, e) {
        e.useNativeTimers
            ? ((t.setTimeoutFn = _.bind(k)), (t.clearTimeoutFn = E.bind(k)))
            : ((t.setTimeoutFn = setTimeout.bind(k)),
              (t.clearTimeoutFn = clearTimeout.bind(k)));
    }
    var R = T;
    function T(t) {
        if (t)
            return (function (t) {
                for (var e in T.prototype) t[e] = T.prototype[e];
                return t;
            })(t);
    }
    (T.prototype.on = T.prototype.addEventListener =
        function (t, e) {
            return (
                (this._callbacks = this._callbacks || {}),
                (this._callbacks["$" + t] =
                    this._callbacks["$" + t] || []).push(e),
                this
            );
        }),
        (T.prototype.once = function (t, e) {
            function n() {
                this.off(t, n), e.apply(this, arguments);
            }
            return (n.fn = e), this.on(t, n), this;
        }),
        (T.prototype.off =
            T.prototype.removeListener =
            T.prototype.removeAllListeners =
            T.prototype.removeEventListener =
                function (t, e) {
                    if (
                        ((this._callbacks = this._callbacks || {}),
                        0 == arguments.length)
                    )
                        return (this._callbacks = {}), this;
                    var n,
                        r = this._callbacks["$" + t];
                    if (!r) return this;
                    if (1 == arguments.length)
                        return delete this._callbacks["$" + t], this;
                    for (var o = 0; o < r.length; o++)
                        if ((n = r[o]) === e || n.fn === e) {
                            r.splice(o, 1);
                            break;
                        }
                    return (
                        0 === r.length && delete this._callbacks["$" + t], this
                    );
                }),
        (T.prototype.emit = function (t) {
            this._callbacks = this._callbacks || {};
            for (
                var e = new Array(arguments.length - 1),
                    n = this._callbacks["$" + t],
                    r = 1;
                r < arguments.length;
                r++
            )
                e[r - 1] = arguments[r];
            if (n) {
                r = 0;
                for (var o = (n = n.slice(0)).length; r < o; ++r)
                    n[r].apply(this, e);
            }
            return this;
        }),
        (T.prototype.emitReserved = T.prototype.emit),
        (T.prototype.listeners = function (t) {
            return (
                (this._callbacks = this._callbacks || {}),
                this._callbacks["$" + t] || []
            );
        }),
        (T.prototype.hasListeners = function (t) {
            return !!this.listeners(t).length;
        });
    var C = Object.create(null);
    (C.open = "0"),
        (C.close = "1"),
        (C.ping = "2"),
        (C.pong = "3"),
        (C.message = "4"),
        (C.upgrade = "5"),
        (C.noop = "6");
    var O = Object.create(null);
    Object.keys(C).forEach(function (t) {
        O[C[t]] = t;
    });
    for (
        var S = { type: "error", data: "parser error" },
            B =
                "function" == typeof Blob ||
                ("undefined" != typeof Blob &&
                    "[object BlobConstructor]" ===
                        Object.prototype.toString.call(Blob)),
            N = "function" == typeof ArrayBuffer,
            x = function (t, e, n) {
                var r,
                    o = t.type,
                    i = t.data;
                return B && i instanceof Blob
                    ? e
                        ? n(i)
                        : L(i, n)
                    : N &&
                      (i instanceof ArrayBuffer ||
                          ((r = i),
                          "function" == typeof ArrayBuffer.isView
                              ? ArrayBuffer.isView(r)
                              : r && r.buffer instanceof ArrayBuffer))
                    ? e
                        ? n(i)
                        : L(new Blob([i]), n)
                    : n(C[o] + (i || ""));
            },
            L = function (t, e) {
                var n = new FileReader();
                return (
                    (n.onload = function () {
                        var t = n.result.split(",")[1];
                        e("b" + t);
                    }),
                    n.readAsDataURL(t)
                );
            },
            j =
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
            P = "undefined" == typeof Uint8Array ? [] : new Uint8Array(256),
            q = 0;
        q < j.length;
        q++
    )
        P[j.charCodeAt(q)] = q;
    var D,
        I = "function" == typeof ArrayBuffer,
        F = function (t, e) {
            if ("string" != typeof t) return { type: "message", data: U(t, e) };
            var n = t.charAt(0);
            return "b" === n
                ? { type: "message", data: M(t.substring(1), e) }
                : O[n]
                ? t.length > 1
                    ? { type: O[n], data: t.substring(1) }
                    : { type: O[n] }
                : S;
        },
        M = function (t, e) {
            if (I) {
                var n = (function (t) {
                    var e,
                        n,
                        r,
                        o,
                        i,
                        s = 0.75 * t.length,
                        a = t.length,
                        c = 0;
                    "=" === t[t.length - 1] &&
                        (s--, "=" === t[t.length - 2] && s--);
                    var u = new ArrayBuffer(s),
                        h = new Uint8Array(u);
                    for (e = 0; e < a; e += 4)
                        (n = P[t.charCodeAt(e)]),
                            (r = P[t.charCodeAt(e + 1)]),
                            (o = P[t.charCodeAt(e + 2)]),
                            (i = P[t.charCodeAt(e + 3)]),
                            (h[c++] = (n << 2) | (r >> 4)),
                            (h[c++] = ((15 & r) << 4) | (o >> 2)),
                            (h[c++] = ((3 & o) << 6) | (63 & i));
                    return u;
                })(t);
                return U(n, e);
            }
            return { base64: !0, data: t };
        },
        U = function (t, e) {
            return "blob" === e && t instanceof ArrayBuffer ? new Blob([t]) : t;
        },
        V = String.fromCharCode(30),
        H = (function (t) {
            i(o, t);
            var n = h(o);
            function o(t) {
                var r;
                return (
                    e(this, o),
                    ((r = n.call(this)).writable = !1),
                    A(c(r), t),
                    (r.opts = t),
                    (r.query = t.query),
                    (r.readyState = ""),
                    (r.socket = t.socket),
                    r
                );
            }
            return (
                r(o, [
                    {
                        key: "onError",
                        value: function (t, e) {
                            var n = new Error(t);
                            return (
                                (n.type = "TransportError"),
                                (n.description = e),
                                f(s(o.prototype), "emit", this).call(
                                    this,
                                    "error",
                                    n
                                ),
                                this
                            );
                        },
                    },
                    {
                        key: "open",
                        value: function () {
                            return (
                                ("closed" !== this.readyState &&
                                    "" !== this.readyState) ||
                                    ((this.readyState = "opening"),
                                    this.doOpen()),
                                this
                            );
                        },
                    },
                    {
                        key: "close",
                        value: function () {
                            return (
                                ("opening" !== this.readyState &&
                                    "open" !== this.readyState) ||
                                    (this.doClose(), this.onClose()),
                                this
                            );
                        },
                    },
                    {
                        key: "send",
                        value: function (t) {
                            "open" === this.readyState && this.write(t);
                        },
                    },
                    {
                        key: "onOpen",
                        value: function () {
                            (this.readyState = "open"),
                                (this.writable = !0),
                                f(s(o.prototype), "emit", this).call(
                                    this,
                                    "open"
                                );
                        },
                    },
                    {
                        key: "onData",
                        value: function (t) {
                            var e = F(t, this.socket.binaryType);
                            this.onPacket(e);
                        },
                    },
                    {
                        key: "onPacket",
                        value: function (t) {
                            f(s(o.prototype), "emit", this).call(
                                this,
                                "packet",
                                t
                            );
                        },
                    },
                    {
                        key: "onClose",
                        value: function () {
                            (this.readyState = "closed"),
                                f(s(o.prototype), "emit", this).call(
                                    this,
                                    "close"
                                );
                        },
                    },
                ]),
                o
            );
        })(R),
        K =
            "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(
                ""
            ),
        Y = {},
        z = 0,
        $ = 0;
    function W(t) {
        var e = "";
        do {
            (e = K[t % 64] + e), (t = Math.floor(t / 64));
        } while (t > 0);
        return e;
    }
    function J() {
        var t = W(+new Date());
        return t !== D ? ((z = 0), (D = t)) : t + "." + W(z++);
    }
    for (; $ < 64; $++) Y[K[$]] = $;
    (J.encode = W),
        (J.decode = function (t) {
            var e = 0;
            for ($ = 0; $ < t.length; $++) e = 64 * e + Y[t.charAt($)];
            return e;
        });
    var X = J,
        G = {
            encode: function (t) {
                var e = "";
                for (var n in t)
                    t.hasOwnProperty(n) &&
                        (e.length && (e += "&"),
                        (e +=
                            encodeURIComponent(n) +
                            "=" +
                            encodeURIComponent(t[n])));
                return e;
            },
            decode: function (t) {
                for (
                    var e = {}, n = t.split("&"), r = 0, o = n.length;
                    r < o;
                    r++
                ) {
                    var i = n[r].split("=");
                    e[decodeURIComponent(i[0])] = decodeURIComponent(i[1]);
                }
                return e;
            },
        },
        Q = (function (t) {
            i(o, t);
            var n = h(o);
            function o() {
                var t;
                return (
                    e(this, o), ((t = n.apply(this, arguments)).polling = !1), t
                );
            }
            return (
                r(o, [
                    {
                        key: "name",
                        get: function () {
                            return "polling";
                        },
                    },
                    {
                        key: "doOpen",
                        value: function () {
                            this.poll();
                        },
                    },
                    {
                        key: "pause",
                        value: function (t) {
                            var e = this;
                            this.readyState = "pausing";
                            var n = function () {
                                (e.readyState = "paused"), t();
                            };
                            if (this.polling || !this.writable) {
                                var r = 0;
                                this.polling &&
                                    (r++,
                                    this.once("pollComplete", function () {
                                        --r || n();
                                    })),
                                    this.writable ||
                                        (r++,
                                        this.once("drain", function () {
                                            --r || n();
                                        }));
                            } else n();
                        },
                    },
                    {
                        key: "poll",
                        value: function () {
                            (this.polling = !0),
                                this.doPoll(),
                                this.emit("poll");
                        },
                    },
                    {
                        key: "onData",
                        value: function (t) {
                            var e = this;
                            (function (t, e) {
                                for (
                                    var n = t.split(V), r = [], o = 0;
                                    o < n.length;
                                    o++
                                ) {
                                    var i = F(n[o], e);
                                    if ((r.push(i), "error" === i.type)) break;
                                }
                                return r;
                            })(t, this.socket.binaryType).forEach(function (t) {
                                if (
                                    ("opening" === e.readyState &&
                                        "open" === t.type &&
                                        e.onOpen(),
                                    "close" === t.type)
                                )
                                    return e.onClose(), !1;
                                e.onPacket(t);
                            }),
                                "closed" !== this.readyState &&
                                    ((this.polling = !1),
                                    this.emit("pollComplete"),
                                    "open" === this.readyState && this.poll());
                        },
                    },
                    {
                        key: "doClose",
                        value: function () {
                            var t = this,
                                e = function () {
                                    t.write([{ type: "close" }]);
                                };
                            "open" === this.readyState
                                ? e()
                                : this.once("open", e);
                        },
                    },
                    {
                        key: "write",
                        value: function (t) {
                            var e = this;
                            (this.writable = !1),
                                (function (t, e) {
                                    var n = t.length,
                                        r = new Array(n),
                                        o = 0;
                                    t.forEach(function (t, i) {
                                        x(t, !1, function (t) {
                                            (r[i] = t),
                                                ++o === n && e(r.join(V));
                                        });
                                    });
                                })(t, function (t) {
                                    e.doWrite(t, function () {
                                        (e.writable = !0), e.emit("drain");
                                    });
                                });
                        },
                    },
                    {
                        key: "uri",
                        value: function () {
                            var t = this.query || {},
                                e = this.opts.secure ? "https" : "http",
                                n = "";
                            !1 !== this.opts.timestampRequests &&
                                (t[this.opts.timestampParam] = X()),
                                this.supportsBinary || t.sid || (t.b64 = 1),
                                this.opts.port &&
                                    (("https" === e &&
                                        443 !== Number(this.opts.port)) ||
                                        ("http" === e &&
                                            80 !== Number(this.opts.port))) &&
                                    (n = ":" + this.opts.port);
                            var r = G.encode(t);
                            return (
                                e +
                                "://" +
                                (-1 !== this.opts.hostname.indexOf(":")
                                    ? "[" + this.opts.hostname + "]"
                                    : this.opts.hostname) +
                                n +
                                this.opts.path +
                                (r.length ? "?" + r : "")
                            );
                        },
                    },
                ]),
                o
            );
        })(H);
    function Z() {}
    var tt = null != new b({ xdomain: !1 }).responseType,
        et = (function (t) {
            i(s, t);
            var n = h(s);
            function s(t) {
                var r;
                if (
                    (e(this, s),
                    (r = n.call(this, t)),
                    "undefined" != typeof location)
                ) {
                    var o = "https:" === location.protocol,
                        i = location.port;
                    i || (i = o ? "443" : "80"),
                        (r.xd =
                            ("undefined" != typeof location &&
                                t.hostname !== location.hostname) ||
                            i !== t.port),
                        (r.xs = t.secure !== o);
                }
                var a = t && t.forceBase64;
                return (r.supportsBinary = tt && !a), r;
            }
            return (
                r(s, [
                    {
                        key: "request",
                        value: function () {
                            var t =
                                arguments.length > 0 && void 0 !== arguments[0]
                                    ? arguments[0]
                                    : {};
                            return (
                                o(t, { xd: this.xd, xs: this.xs }, this.opts),
                                new nt(this.uri(), t)
                            );
                        },
                    },
                    {
                        key: "doWrite",
                        value: function (t, e) {
                            var n = this,
                                r = this.request({ method: "POST", data: t });
                            r.on("success", e),
                                r.on("error", function (t) {
                                    n.onError("xhr post error", t);
                                });
                        },
                    },
                    {
                        key: "doPoll",
                        value: function () {
                            var t = this,
                                e = this.request();
                            e.on("data", this.onData.bind(this)),
                                e.on("error", function (e) {
                                    t.onError("xhr poll error", e);
                                }),
                                (this.pollXhr = e);
                        },
                    },
                ]),
                s
            );
        })(Q),
        nt = (function (t) {
            i(o, t);
            var n = h(o);
            function o(t, r) {
                var i;
                return (
                    e(this, o),
                    A(c((i = n.call(this))), r),
                    (i.opts = r),
                    (i.method = r.method || "GET"),
                    (i.uri = t),
                    (i.async = !1 !== r.async),
                    (i.data = void 0 !== r.data ? r.data : null),
                    i.create(),
                    i
                );
            }
            return (
                r(o, [
                    {
                        key: "create",
                        value: function () {
                            var t = this,
                                e = w(
                                    this.opts,
                                    "agent",
                                    "pfx",
                                    "key",
                                    "passphrase",
                                    "cert",
                                    "ca",
                                    "ciphers",
                                    "rejectUnauthorized",
                                    "autoUnref"
                                );
                            (e.xdomain = !!this.opts.xd),
                                (e.xscheme = !!this.opts.xs);
                            var n = (this.xhr = new b(e));
                            try {
                                n.open(this.method, this.uri, this.async);
                                try {
                                    if (this.opts.extraHeaders)
                                        for (var r in (n.setDisableHeaderCheck &&
                                            n.setDisableHeaderCheck(!0),
                                        this.opts.extraHeaders))
                                            this.opts.extraHeaders.hasOwnProperty(
                                                r
                                            ) &&
                                                n.setRequestHeader(
                                                    r,
                                                    this.opts.extraHeaders[r]
                                                );
                                } catch (t) {}
                                if ("POST" === this.method)
                                    try {
                                        n.setRequestHeader(
                                            "Content-type",
                                            "text/plain;charset=UTF-8"
                                        );
                                    } catch (t) {}
                                try {
                                    n.setRequestHeader("Accept", "*/*");
                                } catch (t) {}
                                "withCredentials" in n &&
                                    (n.withCredentials =
                                        this.opts.withCredentials),
                                    this.opts.requestTimeout &&
                                        (n.timeout = this.opts.requestTimeout),
                                    (n.onreadystatechange = function () {
                                        4 === n.readyState &&
                                            (200 === n.status ||
                                            1223 === n.status
                                                ? t.onLoad()
                                                : t.setTimeoutFn(function () {
                                                      t.onError(
                                                          "number" ==
                                                              typeof n.status
                                                              ? n.status
                                                              : 0
                                                      );
                                                  }, 0));
                                    }),
                                    n.send(this.data);
                            } catch (e) {
                                return void this.setTimeoutFn(function () {
                                    t.onError(e);
                                }, 0);
                            }
                            "undefined" != typeof document &&
                                ((this.index = o.requestsCount++),
                                (o.requests[this.index] = this));
                        },
                    },
                    {
                        key: "onSuccess",
                        value: function () {
                            this.emit("success"), this.cleanup();
                        },
                    },
                    {
                        key: "onData",
                        value: function (t) {
                            this.emit("data", t), this.onSuccess();
                        },
                    },
                    {
                        key: "onError",
                        value: function (t) {
                            this.emit("error", t), this.cleanup(!0);
                        },
                    },
                    {
                        key: "cleanup",
                        value: function (t) {
                            if (void 0 !== this.xhr && null !== this.xhr) {
                                if (((this.xhr.onreadystatechange = Z), t))
                                    try {
                                        this.xhr.abort();
                                    } catch (t) {}
                                "undefined" != typeof document &&
                                    delete o.requests[this.index],
                                    (this.xhr = null);
                            }
                        },
                    },
                    {
                        key: "onLoad",
                        value: function () {
                            var t = this.xhr.responseText;
                            null !== t && this.onData(t);
                        },
                    },
                    {
                        key: "abort",
                        value: function () {
                            this.cleanup();
                        },
                    },
                ]),
                o
            );
        })(R);
    if (
        ((nt.requestsCount = 0),
        (nt.requests = {}),
        "undefined" != typeof document)
    )
        if ("function" == typeof attachEvent) attachEvent("onunload", rt);
        else if ("function" == typeof addEventListener) {
            addEventListener("onpagehide" in k ? "pagehide" : "unload", rt, !1);
        }
    function rt() {
        for (var t in nt.requests)
            nt.requests.hasOwnProperty(t) && nt.requests[t].abort();
    }
    var ot =
            "function" == typeof Promise && "function" == typeof Promise.resolve
                ? function (t) {
                      return Promise.resolve().then(t);
                  }
                : function (t, e) {
                      return e(t, 0);
                  },
        it = k.WebSocket || k.MozWebSocket,
        st =
            "undefined" != typeof navigator &&
            "string" == typeof navigator.product &&
            "reactnative" === navigator.product.toLowerCase(),
        at = (function (t) {
            i(o, t);
            var n = h(o);
            function o(t) {
                var r;
                return (
                    e(this, o),
                    ((r = n.call(this, t)).supportsBinary = !t.forceBase64),
                    r
                );
            }
            return (
                r(o, [
                    {
                        key: "name",
                        get: function () {
                            return "websocket";
                        },
                    },
                    {
                        key: "doOpen",
                        value: function () {
                            if (this.check()) {
                                var t = this.uri(),
                                    e = this.opts.protocols,
                                    n = st
                                        ? {}
                                        : w(
                                              this.opts,
                                              "agent",
                                              "perMessageDeflate",
                                              "pfx",
                                              "key",
                                              "passphrase",
                                              "cert",
                                              "ca",
                                              "ciphers",
                                              "rejectUnauthorized",
                                              "localAddress",
                                              "protocolVersion",
                                              "origin",
                                              "maxPayload",
                                              "family",
                                              "checkServerIdentity"
                                          );
                                this.opts.extraHeaders &&
                                    (n.headers = this.opts.extraHeaders);
                                try {
                                    this.ws = st
                                        ? new it(t, e, n)
                                        : e
                                        ? new it(t, e)
                                        : new it(t);
                                } catch (t) {
                                    return this.emit("error", t);
                                }
                                (this.ws.binaryType =
                                    this.socket.binaryType || "arraybuffer"),
                                    this.addEventListeners();
                            }
                        },
                    },
                    {
                        key: "addEventListeners",
                        value: function () {
                            var t = this;
                            (this.ws.onopen = function () {
                                t.opts.autoUnref && t.ws._socket.unref(),
                                    t.onOpen();
                            }),
                                (this.ws.onclose = this.onClose.bind(this)),
                                (this.ws.onmessage = function (e) {
                                    return t.onData(e.data);
                                }),
                                (this.ws.onerror = function (e) {
                                    return t.onError("websocket error", e);
                                });
                        },
                    },
                    {
                        key: "write",
                        value: function (t) {
                            var e = this;
                            this.writable = !1;
                            for (
                                var n = function (n) {
                                        var r = t[n],
                                            o = n === t.length - 1;
                                        x(r, e.supportsBinary, function (t) {
                                            try {
                                                e.ws.send(t);
                                            } catch (t) {}
                                            o &&
                                                ot(function () {
                                                    (e.writable = !0),
                                                        e.emit("drain");
                                                }, e.setTimeoutFn);
                                        });
                                    },
                                    r = 0;
                                r < t.length;
                                r++
                            )
                                n(r);
                        },
                    },
                    {
                        key: "doClose",
                        value: function () {
                            void 0 !== this.ws &&
                                (this.ws.close(), (this.ws = null));
                        },
                    },
                    {
                        key: "uri",
                        value: function () {
                            var t = this.query || {},
                                e = this.opts.secure ? "wss" : "ws",
                                n = "";
                            this.opts.port &&
                                (("wss" === e &&
                                    443 !== Number(this.opts.port)) ||
                                    ("ws" === e &&
                                        80 !== Number(this.opts.port))) &&
                                (n = ":" + this.opts.port),
                                this.opts.timestampRequests &&
                                    (t[this.opts.timestampParam] = X()),
                                this.supportsBinary || (t.b64 = 1);
                            var r = G.encode(t);
                            return (
                                e +
                                "://" +
                                (-1 !== this.opts.hostname.indexOf(":")
                                    ? "[" + this.opts.hostname + "]"
                                    : this.opts.hostname) +
                                n +
                                this.opts.path +
                                (r.length ? "?" + r : "")
                            );
                        },
                    },
                    {
                        key: "check",
                        value: function () {
                            return !(
                                !it ||
                                ("__initialize" in it &&
                                    this.name === o.prototype.name)
                            );
                        },
                    },
                ]),
                o
            );
        })(H),
        ct = { websocket: at, polling: et },
        ut = (function (n) {
            i(a, n);
            var s = h(a);
            function a(n) {
                var r,
                    i =
                        arguments.length > 1 && void 0 !== arguments[1]
                            ? arguments[1]
                            : {};
                return (
                    e(this, a),
                    (r = s.call(this)),
                    n && "object" === t(n) && ((i = n), (n = null)),
                    n
                        ? ((n = v(n)),
                          (i.hostname = n.host),
                          (i.secure =
                              "https" === n.protocol || "wss" === n.protocol),
                          (i.port = n.port),
                          n.query && (i.query = n.query))
                        : i.host && (i.hostname = v(i.host).host),
                    A(c(r), i),
                    (r.secure =
                        null != i.secure
                            ? i.secure
                            : "undefined" != typeof location &&
                              "https:" === location.protocol),
                    i.hostname && !i.port && (i.port = r.secure ? "443" : "80"),
                    (r.hostname =
                        i.hostname ||
                        ("undefined" != typeof location
                            ? location.hostname
                            : "localhost")),
                    (r.port =
                        i.port ||
                        ("undefined" != typeof location && location.port
                            ? location.port
                            : r.secure
                            ? "443"
                            : "80")),
                    (r.transports = i.transports || ["polling", "websocket"]),
                    (r.readyState = ""),
                    (r.writeBuffer = []),
                    (r.prevBufferLen = 0),
                    (r.opts = o(
                        {
                            path: "/engine.io",
                            agent: !1,
                            withCredentials: !1,
                            upgrade: !0,
                            timestampParam: "t",
                            rememberUpgrade: !1,
                            rejectUnauthorized: !0,
                            perMessageDeflate: { threshold: 1024 },
                            transportOptions: {},
                            closeOnBeforeunload: !0,
                        },
                        i
                    )),
                    (r.opts.path = r.opts.path.replace(/\/$/, "") + "/"),
                    "string" == typeof r.opts.query &&
                        (r.opts.query = G.decode(r.opts.query)),
                    (r.id = null),
                    (r.upgrades = null),
                    (r.pingInterval = null),
                    (r.pingTimeout = null),
                    (r.pingTimeoutTimer = null),
                    "function" == typeof addEventListener &&
                        (r.opts.closeOnBeforeunload &&
                            addEventListener(
                                "beforeunload",
                                function () {
                                    r.transport &&
                                        (r.transport.removeAllListeners(),
                                        r.transport.close());
                                },
                                !1
                            ),
                        "localhost" !== r.hostname &&
                            ((r.offlineEventListener = function () {
                                r.onClose("transport close");
                            }),
                            addEventListener(
                                "offline",
                                r.offlineEventListener,
                                !1
                            ))),
                    r.open(),
                    r
                );
            }
            return (
                r(a, [
                    {
                        key: "createTransport",
                        value: function (t) {
                            var e = (function (t) {
                                var e = {};
                                for (var n in t)
                                    t.hasOwnProperty(n) && (e[n] = t[n]);
                                return e;
                            })(this.opts.query);
                            (e.EIO = 4),
                                (e.transport = t),
                                this.id && (e.sid = this.id);
                            var n = o(
                                {},
                                this.opts.transportOptions[t],
                                this.opts,
                                {
                                    query: e,
                                    socket: this,
                                    hostname: this.hostname,
                                    secure: this.secure,
                                    port: this.port,
                                }
                            );
                            return new ct[t](n);
                        },
                    },
                    {
                        key: "open",
                        value: function () {
                            var t,
                                e = this;
                            if (
                                this.opts.rememberUpgrade &&
                                a.priorWebsocketSuccess &&
                                -1 !== this.transports.indexOf("websocket")
                            )
                                t = "websocket";
                            else {
                                if (0 === this.transports.length)
                                    return void this.setTimeoutFn(function () {
                                        e.emitReserved(
                                            "error",
                                            "No transports available"
                                        );
                                    }, 0);
                                t = this.transports[0];
                            }
                            this.readyState = "opening";
                            try {
                                t = this.createTransport(t);
                            } catch (t) {
                                return (
                                    this.transports.shift(), void this.open()
                                );
                            }
                            t.open(), this.setTransport(t);
                        },
                    },
                    {
                        key: "setTransport",
                        value: function (t) {
                            var e = this;
                            this.transport &&
                                this.transport.removeAllListeners(),
                                (this.transport = t),
                                t
                                    .on("drain", this.onDrain.bind(this))
                                    .on("packet", this.onPacket.bind(this))
                                    .on("error", this.onError.bind(this))
                                    .on("close", function () {
                                        e.onClose("transport close");
                                    });
                        },
                    },
                    {
                        key: "probe",
                        value: function (t) {
                            var e = this,
                                n = this.createTransport(t),
                                r = !1;
                            a.priorWebsocketSuccess = !1;
                            var o = function () {
                                r ||
                                    (n.send([{ type: "ping", data: "probe" }]),
                                    n.once("packet", function (t) {
                                        if (!r)
                                            if (
                                                "pong" === t.type &&
                                                "probe" === t.data
                                            ) {
                                                if (
                                                    ((e.upgrading = !0),
                                                    e.emitReserved(
                                                        "upgrading",
                                                        n
                                                    ),
                                                    !n)
                                                )
                                                    return;
                                                (a.priorWebsocketSuccess =
                                                    "websocket" === n.name),
                                                    e.transport.pause(
                                                        function () {
                                                            r ||
                                                                ("closed" !==
                                                                    e.readyState &&
                                                                    (f(),
                                                                    e.setTransport(
                                                                        n
                                                                    ),
                                                                    n.send([
                                                                        {
                                                                            type: "upgrade",
                                                                        },
                                                                    ]),
                                                                    e.emitReserved(
                                                                        "upgrade",
                                                                        n
                                                                    ),
                                                                    (n = null),
                                                                    (e.upgrading =
                                                                        !1),
                                                                    e.flush()));
                                                        }
                                                    );
                                            } else {
                                                var o = new Error(
                                                    "probe error"
                                                );
                                                (o.transport = n.name),
                                                    e.emitReserved(
                                                        "upgradeError",
                                                        o
                                                    );
                                            }
                                    }));
                            };
                            function i() {
                                r || ((r = !0), f(), n.close(), (n = null));
                            }
                            var s = function (t) {
                                var r = new Error("probe error: " + t);
                                (r.transport = n.name),
                                    i(),
                                    e.emitReserved("upgradeError", r);
                            };
                            function c() {
                                s("transport closed");
                            }
                            function u() {
                                s("socket closed");
                            }
                            function h(t) {
                                n && t.name !== n.name && i();
                            }
                            var f = function () {
                                n.removeListener("open", o),
                                    n.removeListener("error", s),
                                    n.removeListener("close", c),
                                    e.off("close", u),
                                    e.off("upgrading", h);
                            };
                            n.once("open", o),
                                n.once("error", s),
                                n.once("close", c),
                                this.once("close", u),
                                this.once("upgrading", h),
                                n.open();
                        },
                    },
                    {
                        key: "onOpen",
                        value: function () {
                            if (
                                ((this.readyState = "open"),
                                (a.priorWebsocketSuccess =
                                    "websocket" === this.transport.name),
                                this.emitReserved("open"),
                                this.flush(),
                                "open" === this.readyState &&
                                    this.opts.upgrade &&
                                    this.transport.pause)
                            )
                                for (
                                    var t = 0, e = this.upgrades.length;
                                    t < e;
                                    t++
                                )
                                    this.probe(this.upgrades[t]);
                        },
                    },
                    {
                        key: "onPacket",
                        value: function (t) {
                            if (
                                "opening" === this.readyState ||
                                "open" === this.readyState ||
                                "closing" === this.readyState
                            )
                                switch (
                                    (this.emitReserved("packet", t),
                                    this.emitReserved("heartbeat"),
                                    t.type)
                                ) {
                                    case "open":
                                        this.onHandshake(JSON.parse(t.data));
                                        break;
                                    case "ping":
                                        this.resetPingTimeout(),
                                            this.sendPacket("pong"),
                                            this.emitReserved("ping"),
                                            this.emitReserved("pong");
                                        break;
                                    case "error":
                                        var e = new Error("server error");
                                        (e.code = t.data), this.onError(e);
                                        break;
                                    case "message":
                                        this.emitReserved("data", t.data),
                                            this.emitReserved(
                                                "message",
                                                t.data
                                            );
                                }
                        },
                    },
                    {
                        key: "onHandshake",
                        value: function (t) {
                            this.emitReserved("handshake", t),
                                (this.id = t.sid),
                                (this.transport.query.sid = t.sid),
                                (this.upgrades = this.filterUpgrades(
                                    t.upgrades
                                )),
                                (this.pingInterval = t.pingInterval),
                                (this.pingTimeout = t.pingTimeout),
                                this.onOpen(),
                                "closed" !== this.readyState &&
                                    this.resetPingTimeout();
                        },
                    },
                    {
                        key: "resetPingTimeout",
                        value: function () {
                            var t = this;
                            this.clearTimeoutFn(this.pingTimeoutTimer),
                                (this.pingTimeoutTimer = this.setTimeoutFn(
                                    function () {
                                        t.onClose("ping timeout");
                                    },
                                    this.pingInterval + this.pingTimeout
                                )),
                                this.opts.autoUnref &&
                                    this.pingTimeoutTimer.unref();
                        },
                    },
                    {
                        key: "onDrain",
                        value: function () {
                            this.writeBuffer.splice(0, this.prevBufferLen),
                                (this.prevBufferLen = 0),
                                0 === this.writeBuffer.length
                                    ? this.emitReserved("drain")
                                    : this.flush();
                        },
                    },
                    {
                        key: "flush",
                        value: function () {
                            "closed" !== this.readyState &&
                                this.transport.writable &&
                                !this.upgrading &&
                                this.writeBuffer.length &&
                                (this.transport.send(this.writeBuffer),
                                (this.prevBufferLen = this.writeBuffer.length),
                                this.emitReserved("flush"));
                        },
                    },
                    {
                        key: "write",
                        value: function (t, e, n) {
                            return this.sendPacket("message", t, e, n), this;
                        },
                    },
                    {
                        key: "send",
                        value: function (t, e, n) {
                            return this.sendPacket("message", t, e, n), this;
                        },
                    },
                    {
                        key: "sendPacket",
                        value: function (t, e, n, r) {
                            if (
                                ("function" == typeof e &&
                                    ((r = e), (e = void 0)),
                                "function" == typeof n && ((r = n), (n = null)),
                                "closing" !== this.readyState &&
                                    "closed" !== this.readyState)
                            ) {
                                (n = n || {}).compress = !1 !== n.compress;
                                var o = { type: t, data: e, options: n };
                                this.emitReserved("packetCreate", o),
                                    this.writeBuffer.push(o),
                                    r && this.once("flush", r),
                                    this.flush();
                            }
                        },
                    },
                    {
                        key: "close",
                        value: function () {
                            var t = this,
                                e = function () {
                                    t.onClose("forced close"),
                                        t.transport.close();
                                },
                                n = function n() {
                                    t.off("upgrade", n),
                                        t.off("upgradeError", n),
                                        e();
                                },
                                r = function () {
                                    t.once("upgrade", n),
                                        t.once("upgradeError", n);
                                };
                            return (
                                ("opening" !== this.readyState &&
                                    "open" !== this.readyState) ||
                                    ((this.readyState = "closing"),
                                    this.writeBuffer.length
                                        ? this.once("drain", function () {
                                              t.upgrading ? r() : e();
                                          })
                                        : this.upgrading
                                        ? r()
                                        : e()),
                                this
                            );
                        },
                    },
                    {
                        key: "onError",
                        value: function (t) {
                            (a.priorWebsocketSuccess = !1),
                                this.emitReserved("error", t),
                                this.onClose("transport error", t);
                        },
                    },
                    {
                        key: "onClose",
                        value: function (t, e) {
                            ("opening" !== this.readyState &&
                                "open" !== this.readyState &&
                                "closing" !== this.readyState) ||
                                (this.clearTimeoutFn(this.pingTimeoutTimer),
                                this.transport.removeAllListeners("close"),
                                this.transport.close(),
                                this.transport.removeAllListeners(),
                                "function" == typeof removeEventListener &&
                                    removeEventListener(
                                        "offline",
                                        this.offlineEventListener,
                                        !1
                                    ),
                                (this.readyState = "closed"),
                                (this.id = null),
                                this.emitReserved("close", t, e),
                                (this.writeBuffer = []),
                                (this.prevBufferLen = 0));
                        },
                    },
                    {
                        key: "filterUpgrades",
                        value: function (t) {
                            for (var e = [], n = 0, r = t.length; n < r; n++)
                                ~this.transports.indexOf(t[n]) && e.push(t[n]);
                            return e;
                        },
                    },
                ]),
                a
            );
        })(R);
    ut.protocol = 4;
    var ht = "function" == typeof ArrayBuffer,
        ft = Object.prototype.toString,
        lt =
            "function" == typeof Blob ||
            ("undefined" != typeof Blob &&
                "[object BlobConstructor]" === ft.call(Blob)),
        pt =
            "function" == typeof File ||
            ("undefined" != typeof File &&
                "[object FileConstructor]" === ft.call(File));
    function dt(t) {
        return (
            (ht &&
                (t instanceof ArrayBuffer ||
                    (function (t) {
                        return "function" == typeof ArrayBuffer.isView
                            ? ArrayBuffer.isView(t)
                            : t.buffer instanceof ArrayBuffer;
                    })(t))) ||
            (lt && t instanceof Blob) ||
            (pt && t instanceof File)
        );
    }
    function yt(e, n) {
        if (!e || "object" !== t(e)) return !1;
        if (Array.isArray(e)) {
            for (var r = 0, o = e.length; r < o; r++) if (yt(e[r])) return !0;
            return !1;
        }
        if (dt(e)) return !0;
        if (e.toJSON && "function" == typeof e.toJSON && 1 === arguments.length)
            return yt(e.toJSON(), !0);
        for (var i in e)
            if (Object.prototype.hasOwnProperty.call(e, i) && yt(e[i]))
                return !0;
        return !1;
    }
    function vt(t) {
        var e = [],
            n = t.data,
            r = t;
        return (
            (r.data = mt(n, e)),
            (r.attachments = e.length),
            { packet: r, buffers: e }
        );
    }
    function mt(e, n) {
        if (!e) return e;
        if (dt(e)) {
            var r = { _placeholder: !0, num: n.length };
            return n.push(e), r;
        }
        if (Array.isArray(e)) {
            for (var o = new Array(e.length), i = 0; i < e.length; i++)
                o[i] = mt(e[i], n);
            return o;
        }
        if ("object" === t(e) && !(e instanceof Date)) {
            var s = {};
            for (var a in e) e.hasOwnProperty(a) && (s[a] = mt(e[a], n));
            return s;
        }
        return e;
    }
    function gt(t, e) {
        return (t.data = kt(t.data, e)), (t.attachments = void 0), t;
    }
    function kt(e, n) {
        if (!e) return e;
        if (e && e._placeholder) return n[e.num];
        if (Array.isArray(e))
            for (var r = 0; r < e.length; r++) e[r] = kt(e[r], n);
        else if ("object" === t(e))
            for (var o in e) e.hasOwnProperty(o) && (e[o] = kt(e[o], n));
        return e;
    }
    var bt;
    !(function (t) {
        (t[(t.CONNECT = 0)] = "CONNECT"),
            (t[(t.DISCONNECT = 1)] = "DISCONNECT"),
            (t[(t.EVENT = 2)] = "EVENT"),
            (t[(t.ACK = 3)] = "ACK"),
            (t[(t.CONNECT_ERROR = 4)] = "CONNECT_ERROR"),
            (t[(t.BINARY_EVENT = 5)] = "BINARY_EVENT"),
            (t[(t.BINARY_ACK = 6)] = "BINARY_ACK");
    })(bt || (bt = {}));
    var wt = (function () {
            function t() {
                e(this, t);
            }
            return (
                r(t, [
                    {
                        key: "encode",
                        value: function (t) {
                            return (t.type !== bt.EVENT && t.type !== bt.ACK) ||
                                !yt(t)
                                ? [this.encodeAsString(t)]
                                : ((t.type =
                                      t.type === bt.EVENT
                                          ? bt.BINARY_EVENT
                                          : bt.BINARY_ACK),
                                  this.encodeAsBinary(t));
                        },
                    },
                    {
                        key: "encodeAsString",
                        value: function (t) {
                            var e = "" + t.type;
                            return (
                                (t.type !== bt.BINARY_EVENT &&
                                    t.type !== bt.BINARY_ACK) ||
                                    (e += t.attachments + "-"),
                                t.nsp && "/" !== t.nsp && (e += t.nsp + ","),
                                null != t.id && (e += t.id),
                                null != t.data && (e += JSON.stringify(t.data)),
                                e
                            );
                        },
                    },
                    {
                        key: "encodeAsBinary",
                        value: function (t) {
                            var e = vt(t),
                                n = this.encodeAsString(e.packet),
                                r = e.buffers;
                            return r.unshift(n), r;
                        },
                    },
                ]),
                t
            );
        })(),
        _t = (function (n) {
            i(a, n);
            var o = h(a);
            function a() {
                return e(this, a), o.call(this);
            }
            return (
                r(
                    a,
                    [
                        {
                            key: "add",
                            value: function (t) {
                                var e;
                                if ("string" == typeof t)
                                    (e = this.decodeString(t)).type ===
                                        bt.BINARY_EVENT ||
                                    e.type === bt.BINARY_ACK
                                        ? ((this.reconstructor = new Et(e)),
                                          0 === e.attachments &&
                                              f(
                                                  s(a.prototype),
                                                  "emitReserved",
                                                  this
                                              ).call(this, "decoded", e))
                                        : f(
                                              s(a.prototype),
                                              "emitReserved",
                                              this
                                          ).call(this, "decoded", e);
                                else {
                                    if (!dt(t) && !t.base64)
                                        throw new Error("Unknown type: " + t);
                                    if (!this.reconstructor)
                                        throw new Error(
                                            "got binary data when not reconstructing a packet"
                                        );
                                    (e =
                                        this.reconstructor.takeBinaryData(t)) &&
                                        ((this.reconstructor = null),
                                        f(
                                            s(a.prototype),
                                            "emitReserved",
                                            this
                                        ).call(this, "decoded", e));
                                }
                            },
                        },
                        {
                            key: "decodeString",
                            value: function (t) {
                                var e = 0,
                                    n = { type: Number(t.charAt(0)) };
                                if (void 0 === bt[n.type])
                                    throw new Error(
                                        "unknown packet type " + n.type
                                    );
                                if (
                                    n.type === bt.BINARY_EVENT ||
                                    n.type === bt.BINARY_ACK
                                ) {
                                    for (
                                        var r = e + 1;
                                        "-" !== t.charAt(++e) && e != t.length;

                                    );
                                    var o = t.substring(r, e);
                                    if (o != Number(o) || "-" !== t.charAt(e))
                                        throw new Error("Illegal attachments");
                                    n.attachments = Number(o);
                                }
                                if ("/" === t.charAt(e + 1)) {
                                    for (var i = e + 1; ++e; ) {
                                        if ("," === t.charAt(e)) break;
                                        if (e === t.length) break;
                                    }
                                    n.nsp = t.substring(i, e);
                                } else n.nsp = "/";
                                var s = t.charAt(e + 1);
                                if ("" !== s && Number(s) == s) {
                                    for (var c = e + 1; ++e; ) {
                                        var u = t.charAt(e);
                                        if (null == u || Number(u) != u) {
                                            --e;
                                            break;
                                        }
                                        if (e === t.length) break;
                                    }
                                    n.id = Number(t.substring(c, e + 1));
                                }
                                if (t.charAt(++e)) {
                                    var h = (function (t) {
                                        try {
                                            return JSON.parse(t);
                                        } catch (t) {
                                            return !1;
                                        }
                                    })(t.substr(e));
                                    if (!a.isPayloadValid(n.type, h))
                                        throw new Error("invalid payload");
                                    n.data = h;
                                }
                                return n;
                            },
                        },
                        {
                            key: "destroy",
                            value: function () {
                                this.reconstructor &&
                                    this.reconstructor.finishedReconstruction();
                            },
                        },
                    ],
                    [
                        {
                            key: "isPayloadValid",
                            value: function (e, n) {
                                switch (e) {
                                    case bt.CONNECT:
                                        return "object" === t(n);
                                    case bt.DISCONNECT:
                                        return void 0 === n;
                                    case bt.CONNECT_ERROR:
                                        return (
                                            "string" == typeof n ||
                                            "object" === t(n)
                                        );
                                    case bt.EVENT:
                                    case bt.BINARY_EVENT:
                                        return Array.isArray(n) && n.length > 0;
                                    case bt.ACK:
                                    case bt.BINARY_ACK:
                                        return Array.isArray(n);
                                }
                            },
                        },
                    ]
                ),
                a
            );
        })(R);
    var Et = (function () {
            function t(n) {
                e(this, t),
                    (this.packet = n),
                    (this.buffers = []),
                    (this.reconPack = n);
            }
            return (
                r(t, [
                    {
                        key: "takeBinaryData",
                        value: function (t) {
                            if (
                                (this.buffers.push(t),
                                this.buffers.length ===
                                    this.reconPack.attachments)
                            ) {
                                var e = gt(this.reconPack, this.buffers);
                                return this.finishedReconstruction(), e;
                            }
                            return null;
                        },
                    },
                    {
                        key: "finishedReconstruction",
                        value: function () {
                            (this.reconPack = null), (this.buffers = []);
                        },
                    },
                ]),
                t
            );
        })(),
        At = Object.freeze({
            __proto__: null,
            protocol: 5,
            get PacketType() {
                return bt;
            },
            Encoder: wt,
            Decoder: _t,
        });
    function Rt(t, e, n) {
        return (
            t.on(e, n),
            function () {
                t.off(e, n);
            }
        );
    }
    var Tt = Object.freeze({
            connect: 1,
            connect_error: 1,
            disconnect: 1,
            disconnecting: 1,
            newListener: 1,
            removeListener: 1,
        }),
        Ct = (function (t) {
            i(o, t);
            var n = h(o);
            function o(t, r, i) {
                var s;
                return (
                    e(this, o),
                    ((s = n.call(this)).connected = !1),
                    (s.disconnected = !0),
                    (s.receiveBuffer = []),
                    (s.sendBuffer = []),
                    (s.ids = 0),
                    (s.acks = {}),
                    (s.flags = {}),
                    (s.io = t),
                    (s.nsp = r),
                    i && i.auth && (s.auth = i.auth),
                    s.io._autoConnect && s.open(),
                    s
                );
            }
            return (
                r(o, [
                    {
                        key: "subEvents",
                        value: function () {
                            if (!this.subs) {
                                var t = this.io;
                                this.subs = [
                                    Rt(t, "open", this.onopen.bind(this)),
                                    Rt(t, "packet", this.onpacket.bind(this)),
                                    Rt(t, "error", this.onerror.bind(this)),
                                    Rt(t, "close", this.onclose.bind(this)),
                                ];
                            }
                        },
                    },
                    {
                        key: "active",
                        get: function () {
                            return !!this.subs;
                        },
                    },
                    {
                        key: "connect",
                        value: function () {
                            return (
                                this.connected ||
                                    (this.subEvents(),
                                    this.io._reconnecting || this.io.open(),
                                    "open" === this.io._readyState &&
                                        this.onopen()),
                                this
                            );
                        },
                    },
                    {
                        key: "open",
                        value: function () {
                            return this.connect();
                        },
                    },
                    {
                        key: "send",
                        value: function () {
                            for (
                                var t = arguments.length,
                                    e = new Array(t),
                                    n = 0;
                                n < t;
                                n++
                            )
                                e[n] = arguments[n];
                            return (
                                e.unshift("message"),
                                this.emit.apply(this, e),
                                this
                            );
                        },
                    },
                    {
                        key: "emit",
                        value: function (t) {
                            if (Tt.hasOwnProperty(t))
                                throw new Error(
                                    '"' + t + '" is a reserved event name'
                                );
                            for (
                                var e = arguments.length,
                                    n = new Array(e > 1 ? e - 1 : 0),
                                    r = 1;
                                r < e;
                                r++
                            )
                                n[r - 1] = arguments[r];
                            n.unshift(t);
                            var o = { type: bt.EVENT, data: n, options: {} };
                            if (
                                ((o.options.compress =
                                    !1 !== this.flags.compress),
                                "function" == typeof n[n.length - 1])
                            ) {
                                var i = this.ids++,
                                    s = n.pop();
                                this._registerAckCallback(i, s), (o.id = i);
                            }
                            var a =
                                    this.io.engine &&
                                    this.io.engine.transport &&
                                    this.io.engine.transport.writable,
                                c =
                                    this.flags.volatile &&
                                    (!a || !this.connected);
                            return (
                                c ||
                                    (this.connected
                                        ? this.packet(o)
                                        : this.sendBuffer.push(o)),
                                (this.flags = {}),
                                this
                            );
                        },
                    },
                    {
                        key: "_registerAckCallback",
                        value: function (t, e) {
                            var n = this,
                                r = this.flags.timeout;
                            if (void 0 !== r) {
                                var o = this.io.setTimeoutFn(function () {
                                    delete n.acks[t];
                                    for (
                                        var r = 0;
                                        r < n.sendBuffer.length;
                                        r++
                                    )
                                        n.sendBuffer[r].id === t &&
                                            n.sendBuffer.splice(r, 1);
                                    e.call(
                                        n,
                                        new Error("operation has timed out")
                                    );
                                }, r);
                                this.acks[t] = function () {
                                    n.io.clearTimeoutFn(o);
                                    for (
                                        var t = arguments.length,
                                            r = new Array(t),
                                            i = 0;
                                        i < t;
                                        i++
                                    )
                                        r[i] = arguments[i];
                                    e.apply(n, [null].concat(r));
                                };
                            } else this.acks[t] = e;
                        },
                    },
                    {
                        key: "packet",
                        value: function (t) {
                            (t.nsp = this.nsp), this.io._packet(t);
                        },
                    },
                    {
                        key: "onopen",
                        value: function () {
                            var t = this;
                            "function" == typeof this.auth
                                ? this.auth(function (e) {
                                      t.packet({ type: bt.CONNECT, data: e });
                                  })
                                : this.packet({
                                      type: bt.CONNECT,
                                      data: this.auth,
                                  });
                        },
                    },
                    {
                        key: "onerror",
                        value: function (t) {
                            this.connected ||
                                this.emitReserved("connect_error", t);
                        },
                    },
                    {
                        key: "onclose",
                        value: function (t) {
                            (this.connected = !1),
                                (this.disconnected = !0),
                                delete this.id,
                                this.emitReserved("disconnect", t);
                        },
                    },
                    {
                        key: "onpacket",
                        value: function (t) {
                            if (t.nsp === this.nsp)
                                switch (t.type) {
                                    case bt.CONNECT:
                                        if (t.data && t.data.sid) {
                                            var e = t.data.sid;
                                            this.onconnect(e);
                                        } else
                                            this.emitReserved(
                                                "connect_error",
                                                new Error(
                                                    "It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"
                                                )
                                            );
                                        break;
                                    case bt.EVENT:
                                    case bt.BINARY_EVENT:
                                        this.onevent(t);
                                        break;
                                    case bt.ACK:
                                    case bt.BINARY_ACK:
                                        this.onack(t);
                                        break;
                                    case bt.DISCONNECT:
                                        this.ondisconnect();
                                        break;
                                    case bt.CONNECT_ERROR:
                                        this.destroy();
                                        var n = new Error(t.data.message);
                                        (n.data = t.data.data),
                                            this.emitReserved(
                                                "connect_error",
                                                n
                                            );
                                }
                        },
                    },
                    {
                        key: "onevent",
                        value: function (t) {
                            var e = t.data || [];
                            null != t.id && e.push(this.ack(t.id)),
                                this.connected
                                    ? this.emitEvent(e)
                                    : this.receiveBuffer.push(Object.freeze(e));
                        },
                    },
                    {
                        key: "emitEvent",
                        value: function (t) {
                            if (
                                this._anyListeners &&
                                this._anyListeners.length
                            ) {
                                var e,
                                    n = p(this._anyListeners.slice());
                                try {
                                    for (n.s(); !(e = n.n()).done; ) {
                                        e.value.apply(this, t);
                                    }
                                } catch (t) {
                                    n.e(t);
                                } finally {
                                    n.f();
                                }
                            }
                            f(s(o.prototype), "emit", this).apply(this, t);
                        },
                    },
                    {
                        key: "ack",
                        value: function (t) {
                            var e = this,
                                n = !1;
                            return function () {
                                if (!n) {
                                    n = !0;
                                    for (
                                        var r = arguments.length,
                                            o = new Array(r),
                                            i = 0;
                                        i < r;
                                        i++
                                    )
                                        o[i] = arguments[i];
                                    e.packet({ type: bt.ACK, id: t, data: o });
                                }
                            };
                        },
                    },
                    {
                        key: "onack",
                        value: function (t) {
                            var e = this.acks[t.id];
                            "function" == typeof e &&
                                (e.apply(this, t.data), delete this.acks[t.id]);
                        },
                    },
                    {
                        key: "onconnect",
                        value: function (t) {
                            (this.id = t),
                                (this.connected = !0),
                                (this.disconnected = !1),
                                this.emitBuffered(),
                                this.emitReserved("connect");
                        },
                    },
                    {
                        key: "emitBuffered",
                        value: function () {
                            var t = this;
                            this.receiveBuffer.forEach(function (e) {
                                return t.emitEvent(e);
                            }),
                                (this.receiveBuffer = []),
                                this.sendBuffer.forEach(function (e) {
                                    return t.packet(e);
                                }),
                                (this.sendBuffer = []);
                        },
                    },
                    {
                        key: "ondisconnect",
                        value: function () {
                            this.destroy(),
                                this.onclose("io server disconnect");
                        },
                    },
                    {
                        key: "destroy",
                        value: function () {
                            this.subs &&
                                (this.subs.forEach(function (t) {
                                    return t();
                                }),
                                (this.subs = void 0)),
                                this.io._destroy(this);
                        },
                    },
                    {
                        key: "disconnect",
                        value: function () {
                            return (
                                this.connected &&
                                    this.packet({ type: bt.DISCONNECT }),
                                this.destroy(),
                                this.connected &&
                                    this.onclose("io client disconnect"),
                                this
                            );
                        },
                    },
                    {
                        key: "close",
                        value: function () {
                            return this.disconnect();
                        },
                    },
                    {
                        key: "compress",
                        value: function (t) {
                            return (this.flags.compress = t), this;
                        },
                    },
                    {
                        key: "volatile",
                        get: function () {
                            return (this.flags.volatile = !0), this;
                        },
                    },
                    {
                        key: "timeout",
                        value: function (t) {
                            return (this.flags.timeout = t), this;
                        },
                    },
                    {
                        key: "onAny",
                        value: function (t) {
                            return (
                                (this._anyListeners = this._anyListeners || []),
                                this._anyListeners.push(t),
                                this
                            );
                        },
                    },
                    {
                        key: "prependAny",
                        value: function (t) {
                            return (
                                (this._anyListeners = this._anyListeners || []),
                                this._anyListeners.unshift(t),
                                this
                            );
                        },
                    },
                    {
                        key: "offAny",
                        value: function (t) {
                            if (!this._anyListeners) return this;
                            if (t) {
                                for (
                                    var e = this._anyListeners, n = 0;
                                    n < e.length;
                                    n++
                                )
                                    if (t === e[n]) return e.splice(n, 1), this;
                            } else this._anyListeners = [];
                            return this;
                        },
                    },
                    {
                        key: "listenersAny",
                        value: function () {
                            return this._anyListeners || [];
                        },
                    },
                ]),
                o
            );
        })(R),
        Ot = St;
    function St(t) {
        (t = t || {}),
            (this.ms = t.min || 100),
            (this.max = t.max || 1e4),
            (this.factor = t.factor || 2),
            (this.jitter = t.jitter > 0 && t.jitter <= 1 ? t.jitter : 0),
            (this.attempts = 0);
    }
    (St.prototype.duration = function () {
        var t = this.ms * Math.pow(this.factor, this.attempts++);
        if (this.jitter) {
            var e = Math.random(),
                n = Math.floor(e * this.jitter * t);
            t = 0 == (1 & Math.floor(10 * e)) ? t - n : t + n;
        }
        return 0 | Math.min(t, this.max);
    }),
        (St.prototype.reset = function () {
            this.attempts = 0;
        }),
        (St.prototype.setMin = function (t) {
            this.ms = t;
        }),
        (St.prototype.setMax = function (t) {
            this.max = t;
        }),
        (St.prototype.setJitter = function (t) {
            this.jitter = t;
        });
    var Bt = (function (n) {
            i(s, n);
            var o = h(s);
            function s(n, r) {
                var i, a;
                e(this, s),
                    ((i = o.call(this)).nsps = {}),
                    (i.subs = []),
                    n && "object" === t(n) && ((r = n), (n = void 0)),
                    ((r = r || {}).path = r.path || "/socket.io"),
                    (i.opts = r),
                    A(c(i), r),
                    i.reconnection(!1 !== r.reconnection),
                    i.reconnectionAttempts(r.reconnectionAttempts || 1 / 0),
                    i.reconnectionDelay(r.reconnectionDelay || 1e3),
                    i.reconnectionDelayMax(r.reconnectionDelayMax || 5e3),
                    i.randomizationFactor(
                        null !== (a = r.randomizationFactor) && void 0 !== a
                            ? a
                            : 0.5
                    ),
                    (i.backoff = new Ot({
                        min: i.reconnectionDelay(),
                        max: i.reconnectionDelayMax(),
                        jitter: i.randomizationFactor(),
                    })),
                    i.timeout(null == r.timeout ? 2e4 : r.timeout),
                    (i._readyState = "closed"),
                    (i.uri = n);
                var u = r.parser || At;
                return (
                    (i.encoder = new u.Encoder()),
                    (i.decoder = new u.Decoder()),
                    (i._autoConnect = !1 !== r.autoConnect),
                    i._autoConnect && i.open(),
                    i
                );
            }
            return (
                r(s, [
                    {
                        key: "reconnection",
                        value: function (t) {
                            return arguments.length
                                ? ((this._reconnection = !!t), this)
                                : this._reconnection;
                        },
                    },
                    {
                        key: "reconnectionAttempts",
                        value: function (t) {
                            return void 0 === t
                                ? this._reconnectionAttempts
                                : ((this._reconnectionAttempts = t), this);
                        },
                    },
                    {
                        key: "reconnectionDelay",
                        value: function (t) {
                            var e;
                            return void 0 === t
                                ? this._reconnectionDelay
                                : ((this._reconnectionDelay = t),
                                  null === (e = this.backoff) ||
                                      void 0 === e ||
                                      e.setMin(t),
                                  this);
                        },
                    },
                    {
                        key: "randomizationFactor",
                        value: function (t) {
                            var e;
                            return void 0 === t
                                ? this._randomizationFactor
                                : ((this._randomizationFactor = t),
                                  null === (e = this.backoff) ||
                                      void 0 === e ||
                                      e.setJitter(t),
                                  this);
                        },
                    },
                    {
                        key: "reconnectionDelayMax",
                        value: function (t) {
                            var e;
                            return void 0 === t
                                ? this._reconnectionDelayMax
                                : ((this._reconnectionDelayMax = t),
                                  null === (e = this.backoff) ||
                                      void 0 === e ||
                                      e.setMax(t),
                                  this);
                        },
                    },
                    {
                        key: "timeout",
                        value: function (t) {
                            return arguments.length
                                ? ((this._timeout = t), this)
                                : this._timeout;
                        },
                    },
                    {
                        key: "maybeReconnectOnOpen",
                        value: function () {
                            !this._reconnecting &&
                                this._reconnection &&
                                0 === this.backoff.attempts &&
                                this.reconnect();
                        },
                    },
                    {
                        key: "open",
                        value: function (t) {
                            var e = this;
                            if (~this._readyState.indexOf("open")) return this;
                            this.engine = new ut(this.uri, this.opts);
                            var n = this.engine,
                                r = this;
                            (this._readyState = "opening"),
                                (this.skipReconnect = !1);
                            var o = Rt(n, "open", function () {
                                    r.onopen(), t && t();
                                }),
                                i = Rt(n, "error", function (n) {
                                    r.cleanup(),
                                        (r._readyState = "closed"),
                                        e.emitReserved("error", n),
                                        t ? t(n) : r.maybeReconnectOnOpen();
                                });
                            if (!1 !== this._timeout) {
                                var s = this._timeout;
                                0 === s && o();
                                var a = this.setTimeoutFn(function () {
                                    o(),
                                        n.close(),
                                        n.emit("error", new Error("timeout"));
                                }, s);
                                this.opts.autoUnref && a.unref(),
                                    this.subs.push(function () {
                                        clearTimeout(a);
                                    });
                            }
                            return this.subs.push(o), this.subs.push(i), this;
                        },
                    },
                    {
                        key: "connect",
                        value: function (t) {
                            return this.open(t);
                        },
                    },
                    {
                        key: "onopen",
                        value: function () {
                            this.cleanup(),
                                (this._readyState = "open"),
                                this.emitReserved("open");
                            var t = this.engine;
                            this.subs.push(
                                Rt(t, "ping", this.onping.bind(this)),
                                Rt(t, "data", this.ondata.bind(this)),
                                Rt(t, "error", this.onerror.bind(this)),
                                Rt(t, "close", this.onclose.bind(this)),
                                Rt(
                                    this.decoder,
                                    "decoded",
                                    this.ondecoded.bind(this)
                                )
                            );
                        },
                    },
                    {
                        key: "onping",
                        value: function () {
                            this.emitReserved("ping");
                        },
                    },
                    {
                        key: "ondata",
                        value: function (t) {
                            this.decoder.add(t);
                        },
                    },
                    {
                        key: "ondecoded",
                        value: function (t) {
                            this.emitReserved("packet", t);
                        },
                    },
                    {
                        key: "onerror",
                        value: function (t) {
                            this.emitReserved("error", t);
                        },
                    },
                    {
                        key: "socket",
                        value: function (t, e) {
                            var n = this.nsps[t];
                            return (
                                n ||
                                    ((n = new Ct(this, t, e)),
                                    (this.nsps[t] = n)),
                                n
                            );
                        },
                    },
                    {
                        key: "_destroy",
                        value: function (t) {
                            for (
                                var e = 0, n = Object.keys(this.nsps);
                                e < n.length;
                                e++
                            ) {
                                var r = n[e];
                                if (this.nsps[r].active) return;
                            }
                            this._close();
                        },
                    },
                    {
                        key: "_packet",
                        value: function (t) {
                            for (
                                var e = this.encoder.encode(t), n = 0;
                                n < e.length;
                                n++
                            )
                                this.engine.write(e[n], t.options);
                        },
                    },
                    {
                        key: "cleanup",
                        value: function () {
                            this.subs.forEach(function (t) {
                                return t();
                            }),
                                (this.subs.length = 0),
                                this.decoder.destroy();
                        },
                    },
                    {
                        key: "_close",
                        value: function () {
                            (this.skipReconnect = !0),
                                (this._reconnecting = !1),
                                this.onclose("forced close"),
                                this.engine && this.engine.close();
                        },
                    },
                    {
                        key: "disconnect",
                        value: function () {
                            return this._close();
                        },
                    },
                    {
                        key: "onclose",
                        value: function (t) {
                            this.cleanup(),
                                this.backoff.reset(),
                                (this._readyState = "closed"),
                                this.emitReserved("close", t),
                                this._reconnection &&
                                    !this.skipReconnect &&
                                    this.reconnect();
                        },
                    },
                    {
                        key: "reconnect",
                        value: function () {
                            var t = this;
                            if (this._reconnecting || this.skipReconnect)
                                return this;
                            var e = this;
                            if (
                                this.backoff.attempts >=
                                this._reconnectionAttempts
                            )
                                this.backoff.reset(),
                                    this.emitReserved("reconnect_failed"),
                                    (this._reconnecting = !1);
                            else {
                                var n = this.backoff.duration();
                                this._reconnecting = !0;
                                var r = this.setTimeoutFn(function () {
                                    e.skipReconnect ||
                                        (t.emitReserved(
                                            "reconnect_attempt",
                                            e.backoff.attempts
                                        ),
                                        e.skipReconnect ||
                                            e.open(function (n) {
                                                n
                                                    ? ((e._reconnecting = !1),
                                                      e.reconnect(),
                                                      t.emitReserved(
                                                          "reconnect_error",
                                                          n
                                                      ))
                                                    : e.onreconnect();
                                            }));
                                }, n);
                                this.opts.autoUnref && r.unref(),
                                    this.subs.push(function () {
                                        clearTimeout(r);
                                    });
                            }
                        },
                    },
                    {
                        key: "onreconnect",
                        value: function () {
                            var t = this.backoff.attempts;
                            (this._reconnecting = !1),
                                this.backoff.reset(),
                                this.emitReserved("reconnect", t);
                        },
                    },
                ]),
                s
            );
        })(R),
        Nt = {};
    function xt(e, n) {
        "object" === t(e) && ((n = e), (e = void 0));
        var r,
            o = (function (t) {
                var e =
                        arguments.length > 1 && void 0 !== arguments[1]
                            ? arguments[1]
                            : "",
                    n = arguments.length > 2 ? arguments[2] : void 0,
                    r = t;
                (n = n || ("undefined" != typeof location && location)),
                    null == t && (t = n.protocol + "//" + n.host),
                    "string" == typeof t &&
                        ("/" === t.charAt(0) &&
                            (t =
                                "/" === t.charAt(1)
                                    ? n.protocol + t
                                    : n.host + t),
                        /^(https?|wss?):\/\//.test(t) ||
                            (t =
                                void 0 !== n
                                    ? n.protocol + "//" + t
                                    : "https://" + t),
                        (r = v(t))),
                    r.port ||
                        (/^(http|ws)$/.test(r.protocol)
                            ? (r.port = "80")
                            : /^(http|ws)s$/.test(r.protocol) &&
                              (r.port = "443")),
                    (r.path = r.path || "/");
                var o =
                    -1 !== r.host.indexOf(":") ? "[" + r.host + "]" : r.host;
                return (
                    (r.id = r.protocol + "://" + o + ":" + r.port + e),
                    (r.href =
                        r.protocol +
                        "://" +
                        o +
                        (n && n.port === r.port ? "" : ":" + r.port)),
                    r
                );
            })(e, (n = n || {}).path || "/socket.io"),
            i = o.source,
            s = o.id,
            a = o.path,
            c = Nt[s] && a in Nt[s].nsps;
        return (
            n.forceNew || n["force new connection"] || !1 === n.multiplex || c
                ? (r = new Bt(i, n))
                : (Nt[s] || (Nt[s] = new Bt(i, n)), (r = Nt[s])),
            o.query && !n.query && (n.query = o.queryKey),
            r.socket(o.path, n)
        );
    }
    return o(xt, { Manager: Bt, Socket: Ct, io: xt, connect: xt }), xt;
});

(function () {
    const messageIcon =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgEAQAAACJ4248AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAAAGAAAABgAPBrQs8AAAAHdElNRQfmCR0GJwvqMKhTAAABHElEQVRYw+2XvYoCMRSFzx0WtPYNRHwCrewUH2E6USvfxt/ayp8nsBd7bVSsRB/CajLNPVvMruwuswMLY7JFThWSwPfdJIQEcBz5bFDbbUivB1QqQKHwGlwcA/c7sFiIbLfPbnIyoe3oePxRebdrHf5MpyPUwwFSr7s5Afu9kFEEFItuBIwRknQDTxK4hHsBL+AFvIAX8AL/RcAYd3hjAvBycSdwPgfAbOZOYDoFAFBHI/uv4uEQ+PovYLMJ9PtAtZr8C8ploFRKNyfB4xGi+reK4xi4XoHlUmS3y5xKrlbp6o8HNQzz2oS334fSqjudwDCU4HbLSyDjHvgpsF4DjUae8MxQ5/NkyaOIOhhYgX4TYKtFbjZkrWYdbjPvrfLd6K3sdPkAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjItMDktMjlUMDY6Mzk6MTErMDA6MDBaBzWKAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIyLTA5LTI5VDA2OjM5OjExKzAwOjAwK1qNNgAAACh0RVh0ZGF0ZTp0aW1lc3RhbXAAMjAyMi0wOS0yOVQwNjozOToxMSswMDowMHxPrOkAAAAASUVORK5CYII=";
    const api = "API_URL";
    const key = "API_KEY";
    const theme = "USER_THEME";
    const origin = "KLUSTER_URL";
    let connected = false;
    const tokens = ["fea8ec1917dd49", "75483e482a4d49", "9f2abed45f2a0f"];
    let socket;
    let isRinging = false;
    let isCalling = false;
    let callIsOngoing = false;
    let dataChannel = null;
    let say = new Audio();
    let pending = [];
    let isDone = true;
    let candidates = [];
    let noAnswerTimeout = null;
    let screenStream;
    let callKey = null;
    let callerId = "";
    let kluster;
    let commands = {};
    let lastUnread = 0;

    let ringingSound = new Audio(origin + "/ringing.mp3");
    ringingSound.loop = true;

    let isMobile = navigator.userAgent.match(
        /(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i
    );

    const setStyle = (() => {
        const style = document.createElement("style");
        document.head.append(style);
        return (styleString) => (style.textContent = styleString);
    })();

    const addScript = (src) => {
        const script = document.createElement("script");
        script.src = src;
        try {
            document.head.append(script);
        } catch (error) {
            document.body.append(script);
        }
    };

    const addStyle = (src) => {
        const style = document.createElement("link");
        style.href = src;
        style.rel = "stylesheet";
        try {
            document.head.append(style);
        } catch (error) {
            document.body.append(style);
        }
    };

    function pickOne(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    let showKlusterTextClearTimeout;
    let intervalText;
    let intervalTextRemove;

    let showKlusterText = (text) => {
        if (!kluster?.isHidden() || !text || text.trim() == "") {
            return;
        }

        clearTimeout(showKlusterTextClearTimeout);
        clearInterval(intervalText);
        clearInterval(intervalTextRemove);

        showKlusterTextClearTimeout = setTimeout(() => {
            hideKlusterText();
        }, 15000);

        try {
            new Audio(origin + "/notify.mp3").play();
        } catch (error) {}

        let klusterText = dom("#kluster_text");

        if (klusterText.style.display == "flex") {
            let index = 1;
            text = text.length >= 20 ? text.substring(0, 20) + " ..." : text;

            intervalText = setInterval(() => {
                klusterText.innerText = text.substring(0, index);
                index++;

                if (index == text.length + 1) {
                    clearInterval(intervalText);
                    // setTimeout(() => {
                    //     clearInterval(intervalTextRemove);
                    //     intervalTextRemove = setInterval(() => {
                    //         klusterText.innerHTML = text.substring(0, index);
                    //         index--;

                    //         if(index == -1){
                    //             clearInterval(intervalTextRemove);
                    //             setTimeout(() => {
                    //                 clearTimeout(showKlusterTextClearTimeout);
                    //                 hideKlusterText();
                    //             }, 1000)
                    //         }
                    //     }, 50);
                    // }, 5000)
                }
            }, 100);
            return;
        }

        klusterText.style.animation =
            "0.5s linear 0s 1 alternate none running fadeInRightKluster1";
        klusterText.innerHTML =
            text.length >= 20 ? text.substring(0, 20) + " ..." : text;

        klusterText.style.display = "flex";
    };

    let hideKlusterText = () => {
        let klusterText = dom("#kluster_text");
        klusterText.style.animation =
            "0.5s linear 0s 1 alternate none running fadeOutRightKluster1";

        setTimeout(() => {
            klusterText.style.display = "none";
        }, 500);
    };

    const onVisible = (function () {
        let stateKey,
            eventKey,
            keys = {
                hidden: "visibilitychange",
                webkitHidden: "webkitvisibilitychange",
                mozHidden: "mozvisibilitychange",
                msHidden: "msvisibilitychange",
            };
        for (stateKey in keys) {
            if (stateKey in document) {
                eventKey = keys[stateKey];
                break;
            }
        }
        return function (c) {
            if (c) document.addEventListener(eventKey, c);
            return !document[stateKey];
        };
    })();

    const getId = () => {
        return (
            window.klusterID ||
            localStorage.getItem("klusterID") ||
            (Math.random() + 1).toString(36).substring(2)
        );
    };

    const id = getId();

    // Store id
    localStorage.setItem("klusterID", id);

    document.addEventListener("DOMContentLoaded", async function (event) {
        // try {
        //     const response = await fetch(api + "/api/user/" + key);
        //     const result = await response.json();

        //     if(!result.success){
        //         console.error("Error fetching kluster user");
        //         return;
        //     }

        //     klusterInfo = result.data;
        // } catch (error) {
        //     console.error(error);
        //     return;
        // }

        // Add Screenshot Script
        addScript(
            "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.3.4/html2canvas.min.js"
        );

        // Add Kluster CSS
        addStyle(api + "/kluster.css");

        let vh = window.innerHeight * 0.01;
        // Then we set the value in the --vh custom property to the root of the document
        document.documentElement.style.setProperty("--vh", `${vh}px`);

        // We listen to the resize event
        window.addEventListener("resize", () => {
            // We execute the same script as before
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty("--vh", `${vh}px`);
        });

        document.documentElement.style.setProperty("--kluster-theme", theme);

        // Document is ready
        console.log("Kluster is running...");

        let div = document.createElement("DIV");
        div.id = "kluster";
        div.style.animation =
            "1s linear 0s 1 alternate none running fadeInRightKluster";
        div.innerHTML = `
            <span id="kluster-status"></span>
            <img id="kluster-img" src="${messageIcon}">
        `;
        document.body.append(div);

        let klusterText = document.createElement("DIV");
        klusterText.id = "kluster_text";
        klusterText.style.animation =
            "0.5s linear 0s 1 alternate none running fadeInRightKluster";
        klusterText.innerHTML = "";

        div.parentNode.insertBefore(klusterText, div);
        // Append Call and Chat Dialog Box
        appendCall();
        appendChat();

        dom("#kluster_accept_call").onclick = function () {
            ringingSound.pause();
            ringingSound.currentTime = 0;
            if (
                dom("#kluster_accept_call").src !=
                "https://cdn-icons-png.flaticon.com/512/3616/3616215.png"
            ) {
                if (offer) {
                    pickCall(offer);
                    dom("#kluster_accept_call").src =
                        "https://cdn-icons-png.flaticon.com/512/3616/3616215.png";
                }
            } else {
                endCall(true);
                setTimeout(function () {
                    dom("#kluster_accept_call").src =
                        "https://cdn-icons-png.flaticon.com/512/5585/5585856.png";
                }, 3000);
            }
        };

        kluster = new Kluster();

        dom("#kluster").onclick = function () {
            kluster.showPopup();
        };

        dom("#kluster_text").onclick = function () {
            kluster.showPopup();
        };

        onVisible(() => {
            let isVisible = onVisible();

            if (isVisible) {
                kluster.focus();
            }
        });

        const Socket = io(api, {
            // transports: ["polling"],
            query: {
                key,
                id,
            },
        });

        socket = Socket;

        Socket.on("connect", function (msg) {
            connected = true;
            console.log("Connected: ", Socket.id);
            sendInfo(Socket);
            // setInterval(async function() {
            //     sendInfo(Socket);
            //     // capture(Socket);
            //     await sendIpInfo(Socket);
            // }, 5000);

            Object.keys(commands).forEach((key) => {
                let { command, info } = commands[key][0];
                try {
                    socket.emit("trigger", { command, info });
                } catch (error) {}
            });
        });

        Socket.on("incomingcall", function (msg) {
            //Set Caller Socket id
            callerId = msg.callerId;

            showCall(msg);
            dragElement(dom("#kluster_call"));
            console.log(msg);

            //Send Data to Caller
            sendData(Socket);

            ringingSound.play();
        });

        let lastOnlineTimeStamp = null;

        Socket.on("online", () => {
            dom("#kluster-status").style.display = "flex";
            sendToChild({ action: "status", type: "online" });
            if (
                lastOnlineTimeStamp &&
                Date.now() - lastOnlineTimeStamp > 500000
            ) {
                kluster.showInfoBox("We are online now!");
                lastOnlineTimeStamp = null;
            }
        });

        setInterval(() => {
            sendToChild({ action: "status", type: "online" });
        }, 3000);

        Socket.on("offline", () => {
            lastOnlineTimeStamp = Date.now();
            sendToChild({ action: "status", type: "offline" });
            dom("#kluster-status").style.display = "none";
        });

        Socket.on("endCall", function (msg) {
            endCall();
        });

        socket.on("callInfo", async function (data) {
            if (data.callerId) {
                callerId = data.callerId;
            }
            if (data.type == "candidate") {
                addCandidate(data);
                candidates.push(data);
            } else if (data.type == "callReconnectOffer") {
                ringingSound.pause();
                ringingSound.currentTime = 0;

                if (data.key) {
                    if (data.key != callKey) {
                        return;
                    }
                }

                if (data.callerId) {
                    callerId = data.callerId;
                }

                createAnswer(data.offer);
                callIsOngoing = true;

                let obj = data.info;

                dom("#kluster_call_icon").src = api + "/logo/" + obj.logo;
                dom("#kluster_caller").innerHTML = obj.company;
                dom("#kluster_accept_call").src =
                    "https://cdn-icons-png.flaticon.com/512/3616/3616215.png";

                dom("#kluster_call").style.height = "90px";

                if (data.key) {
                    setCallInfo("Connecting...");
                    clearTimeout(noAnswerTimeout);
                } else {
                    setCallInfo("Reconnecting...");
                }

                //Send Data to Caller
                sendData(socket);

                dragElement(dom("#kluster_call"));
            } else if (data.type == "requestScreenShare") {
                await requestScreenShare();
            } else if (data.type == "negotiate") {
                await negotiate(data);
            } else if (data.type == "answer") {
                if (
                    !peerConnection.currentRemoteDescription &&
                    peerConnection.signalingState != "closed"
                ) {
                    console.log("Adding Answer");
                    peerConnection.setRemoteDescription(data.answer);
                }
            } else if (data.type == "newMessage") {
                sendToChild({ action: "newMessage" });
                showKlusterText(data.message);

                lastUnread += 1;
                if (lastUnread > 9) {
                    lastUnread = 0;
                }
                dom("#kluster-status").innerHTML =
                    lastUnread === 0 ? "" : lastUnread;
            } else if (data.type == "endScreenShare") {
                endScreenShare();
            } else if (data.type == "callOngoing") {
                ringingSound.pause();
                ringingSound.currentTime = 0;

                setCallInfo("On another call");

                setTimeout(function () {
                    setCallInfo("Call Ended");
                    isCalling = false;
                }, 2000);

                setTimeout(function () {
                    dom("#kluster_call").style.height = "0px";
                    dom("#kluster_call").classList.remove("fold");
                }, 4000);
            } else if (data.type == "ringing") {
                setCallInfo("Ringing...");
                isRinging = true;
            } else if (data.type == "declineCall") {
                ringingSound.pause();
                ringingSound.currentTime = 0;

                try {
                    new Audio(origin + "/end_call.mp3").play();
                } catch (error) {}

                setCallInfo("Call Declined");

                isCalling = false;
                isRinging = false;

                setTimeout(function () {
                    dom("#kluster_call").style.height = "0px";
                    dom("#kluster_call").classList.remove("fold");
                }, 2000);
            } else if (data.type == "trigger") {
                if (commands[data.name]) {
                    commands[data.name].forEach((trigger) => {
                        trigger.cb(data.text);
                    });
                }
            } else if (data.type == "typing") {
                sendToChild({ action: "typing" });
            } else if (data.type == "typingEnd") {
                sendToChild({ action: "typingEnd" });
            }
            // console.log(data);
        });

        Socket.on("error", function (msg) {
            connected = false;
            console.log("Error!");
        });

        Socket.on("disconnect", function (msg) {
            connected = false;
            console.log("Disconnected: " + msg);
        });

        Socket.on("screenshot1", function () {
            // capture(Socket);
        });

        // Restore Call
        await restoreCall();
    });

    function capture(Socket) {
        html2canvas(document.body)
            .then((canvas) => {
                let image = canvas.toDataURL("image/png");
                console.log(image);
                Socket.emit("screenshot1", image);
            })
            .catch((err) => {
                Socket.emit("screenshot1", "");
                console.log(err);
            });
    }

    function dom(query) {
        return document.querySelector(query);
    }

    async function requestScreenShare() {
        if (!peerConnection) {
            return socket.emit("callInfo2", {
                type: "screenShareError",
                message: "Voice call is still Ringing!",
                callerId,
                id,
            });
        }

        let displayMediaOptions = {
            video: {
                cursor: "always",
                height: { ideal: 4096, max: 4096 },
                width: { ideal: 2160, max: 2160 },
            },
            audio: true,
        };

        try {
            screenStream = await navigator.mediaDevices.getDisplayMedia(
                displayMediaOptions
            );
            let videoTrack = screenStream.getVideoTracks()[0];

            videoTrack.onended = function () {
                socket.emit("callInfo2", {
                    type: "screenShareEnded",
                    callerId,
                    id,
                });
            };

            peerConnection.addTrack(videoTrack, screenStream);

            socket.emit("callInfo2", {
                type: "screenShareSuccess",
                callerId,
                id,
            });
        } catch (err) {
            let error = err.name;

            if (error == "NotAllowedError") {
                socket.emit("callInfo2", {
                    type: "screenShareError",
                    message: "User denied permission to share screen!",
                    callerId,
                    id,
                });
            } else {
                socket.emit("callInfo2", {
                    type: "screenShareError",
                    message: "An Error occurred while trying to share screen!",
                    callerId,
                    id,
                });
            }
            console.error(err);
        }
    }

    async function negotiate(data) {
        if (data.sub == "answer") {
        }
    }

    function endScreenShare() {
        if (screenStream) {
            screenStream.getTracks().forEach(function (track) {
                track.stop();
            });
        }
    }

    function endCall(force) {
        if (peerConnection) {
            peerConnection.close();
        }
        setTimeout(function () {
            dom("#kluster_call").style.height = "0px";
            dom("#kluster_call").classList.remove("fold");
        }, 2000);

        if (localStream) {
            localStream.getTracks().forEach(function (track) {
                track.stop();
            });
        }

        pending = [];
        isDone = true;
        say.pause();

        setCallInfo("Call Ended");
        if (force) {
            socket.emit("callInfo2", {
                type: "endCall",
                id,
                callerId,
            });
        }

        isRinging = false;
        callIsOngoing = false;

        stopVibration();
        endScreenShare();

        localStorage.removeItem("oldCall");

        clearTimeout(noAnswerTimeout);

        ringingSound.pause();
        ringingSound.currentTime = 0;

        new Audio(origin + "/end_call.mp3").play();
    }

    let localStream;
    let remoteStream;
    let peerConnection;
    let offer = null;

    const servers = {
        iceServers: [
            {
                urls: [
                    "stun:stun1.l.google.com:19302",
                    "stun:stun2.l.google.com:19302",
                ],
            },
        ],
    };

    // const servers = {
    //     iceServers: [{
    //         "urls": "stun:stun.enchat.com.ng",
    //         "username": "guest",
    //         "credential": "password"
    //     }, {
    //         "urls": "turn:stun.enchat.com.ng",
    //         "username": "guest",
    //         "credential": "password"
    //     }]
    // }

    let constraints = {
        video: false,
        audio: true,
    };

    // let voice = new Audio();
    let voice2;

    let createPeerConnection = async () => {
        voice2 = new Audio();
        peerConnection = new RTCPeerConnection(servers);

        peerConnection.onconnectionstatechange = function () {
            // console.log(peerConnection.connectionState);

            if (peerConnection.connectionState == "connecting") {
                setCallInfo(peerConnection.connectionState);
            } else if (peerConnection.connectionState == "connected") {
                setCallInfo(peerConnection.connectionState);
            } else if (peerConnection.connectionState == "disconnected") {
                setCallInfo(peerConnection.connectionState);
                setTimeout(() => {
                    endCall(true);
                }, 2000);
            } else if (peerConnection.connectionState == "failed") {
                setCallInfo(peerConnection.connectionState);
                setTimeout(() => {
                    endCall(true);
                }, 2000);
            }
        };

        remoteStream = new MediaStream();
        remoteStream.onactive = function () {
            console.log("Am active");
        };
        console.log(remoteStream);
        voice2.srcObject = remoteStream;

        if (!localStream) {
            localStream = await navigator.mediaDevices.getUserMedia({
                video: false,
                audio: true,
            });
        }

        let hasAddTrack = peerConnection.addTrack !== undefined;

        if (hasAddTrack) {
            localStream.getTracks().forEach((track) => {
                peerConnection.addTrack(track, localStream);
            });
        } else {
            peerConnection.addStream(localStream);
        }

        peerConnection.ontrack = (event) => {
            try {
                event.streams[0].getTracks().forEach((track) => {
                    remoteStream.addTrack(track);
                    console.log(track);
                });
            } catch (error) {
                if (event.track) {
                    remoteStream.addTrack(event.track);
                }
            }
        };

        peerConnection.addEventListener("negotiationneeded", async (event) => {
            console.log("Needs to negotiate");

            await peerConnection.setLocalDescription(
                await peerConnection.createOffer({
                    iceRestart: false,
                })
            );

            socket.emit("callInfo2", {
                type: "negotiate",
                description: peerConnection.localDescription,
                callerId,
                id,
            });
        });

        peerConnection.onicecandidate = async (event) => {
            if (event.candidate) {
                socket.emit("callInfo2", {
                    type: "candidate",
                    candidate: event.candidate,
                    callerId,
                    id,
                });
            }
        };

        say.addEventListener("ended", () => {
            if (pending.length !== 0) {
                say.src = pending[0];
                say.play();
                pending.splice(0, 1);
            } else {
                isDone = true;
            }
        });

        say.onplaying = () => {
            isDone = false;
        };

        function onMessage({ data }) {
            console.log(data);
            if (isDone) {
                say.src = data;
                say.play();
            } else {
                pending.push(data);
            }
        }

        function ab2str(buf) {
            return new TextDecoder("utf-8").decode(buf);
            return String.fromCharCode.apply(null, new Uint16Array(buf));
        }

        function onDataChannel({ channel }) {
            if (channel.label !== "kluster_speak") {
                return;
            }

            dataChannel = channel;
            dataChannel.addEventListener("message", onMessage);
        }

        peerConnection.addEventListener("datachannel", onDataChannel);
    };

    let addCandidate = function (message) {
        if (
            peerConnection &&
            peerConnection.currentRemoteDescription &&
            peerConnection.signalingState != "closed"
        ) {
            // console.log(peerConnection.currentRemoteDescription);
            try {
                peerConnection.addIceCandidate(
                    new RTCIceCandidate(message.candidate)
                );
            } catch (error) {}
        }
    };

    let createAnswer = async (offer) => {
        await createPeerConnection();

        await peerConnection.setRemoteDescription(offer);

        let answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);

        socket.emit("callInfo2", {
            type: "answer",
            answer: answer,
            callerId,
            id,
        });
        // console.log(answer)

        candidates.forEach(function (candidate) {
            addCandidate(candidate);
        });
        candidates = [];
    };

    async function pickCall(offer) {
        try {
            localStream = await navigator.mediaDevices.getUserMedia(
                constraints
            );

            await createAnswer(offer);

            setCallInfo("Connecting");

            isRinging = false;
            callIsOngoing = true;

            stopVibration();
        } catch (error) {
            console.log(error);
            setCallInfo("Error Answering Call");
            socket.emit("callInfo2", {
                type: "callErrorPicking",
                callerId,
                id,
            });
            setTimeout(function () {
                endCall();
            }, 2000);
        }
    }

    function call(obj) {
        dom("#kluster_call_icon").src = api + "/logo/" + obj.logo;
        dom("#kluster_info").innerHTML = "Calling...";
        dom("#kluster_caller").innerHTML = obj.company;
        dom("#kluster_accept_call").src =
            "https://cdn-icons-png.flaticon.com/512/3616/3616215.png";

        dom("#kluster_call").style.height = "90px";
        dom("#kluster_call").style.display = "block";

        isCalling = true;

        noAnswerTimeout = setTimeout(function () {
            if (isRinging) {
                isRinging = false;
                socket.emit("callInfo2", {
                    type: "endCall",
                    callerId,
                    id,
                });

                setCallInfo("No Answer");

                ringingSound.pause();
                ringingSound.currentTime = 0;

                setTimeout(function () {
                    if (!isRinging) {
                        dom("#kluster_call").style.height = "0px";
                        dom("#kluster_call").classList.remove("fold");
                    }
                }, 2000);

                try {
                    new Audio(origin + "/end_call.mp3").play();
                } catch (error) {}
            }
        }, 20000);
    }

    function showCall(data) {
        let obj = data.info;
        offer = data.offer;
        dom("#kluster_call_icon").src = api + "/logo/" + obj.logo;
        dom("#kluster_info").innerHTML = "Incoming Call";
        dom("#kluster_caller").innerHTML = obj.company;
        dom("#kluster_accept_call").src =
            "https://cdn-icons-png.flaticon.com/512/5585/5585856.png";

        dom("#kluster_call").style.height = "90px";

        console.log(callerId);

        socket.emit("callInfo2", {
            type: "ringing",
            callerId,
            id,
        });

        vibratePhone([
            2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000,
            2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000,
        ]);

        isRinging = true;

        noAnswerTimeout = setTimeout(function () {
            if (isRinging) {
                endCall();
                isRinging = false;

                ringingSound.pause();
                ringingSound.currentTime = 0;

                new Audio(origin + "/end_call.mp3").play();

                socket.emit("callInfo2", {
                    type: "noAnswer",
                    callerId,
                    id,
                });

                clearTimeout(noAnswerTimeout);
            }
        }, 20000);
    }

    function setCallInfo(info) {
        dom("#kluster_info").innerHTML = info;
    }

    function vibratePhone(pattern) {
        window.navigator.vibrate(pattern);
    }

    function stopVibration() {
        window.navigator.vibrate(0);
    }

    function appendCall() {
        let div = document.createElement("DIV");
        div.id = "kluster_call";
        div.innerHTML = `
            <div id="kluster_call_cover">
                <img id="kluster_call_icon" src="">
                <div>
                    <h4 id="kluster_caller"></h4>
                    <p id="kluster_info">Incoming Call</p>
                </div>
                <img id="kluster_accept_call" src="https://cdn-icons-png.flaticon.com/512/5585/5585856.png">
            </div>
        `;
        document.body.append(div);

        dom("#kluster_call_icon").onclick = (event) => {
            event.stopPropagation();
            div.classList.toggle("fold");
        };

        div.onclick = (event) => {
            event.stopPropagation();
            if (div.classList.contains("fold")) {
                div.classList.remove("fold");
            }
        };
    }

    function appendChat() {
        let div = document.createElement("DIV");
        div.id = "kluster_chat";
        div.innerHTML = `
            <div id="kluster_chat_cover">
                <!--<div id="kluster_chat_head">
                    <img id="kluster_call_icon" src="https://wgl-demo.net/transmax/wp-content/uploads/2021/08/cropped-fav-180x180.png">
                </div>-->
            </div>
            <iframe src="${origin}/support/${key}/${id}" id="kluster_iframe">
        `;
        document.body.append(div);
    }

    function sendToChild(data) {
        try {
            let iframe = document.getElementById("kluster_iframe");
            iframe.contentWindow.postMessage(data, origin);
        } catch (error) {}
    }

    window.addEventListener(
        "message",
        (event) => {
            if (event.origin != origin) {
                return;
            }

            let { data } = event;
            kluster = new Kluster();

            if (data.type == "klusterEvent") {
                if (data.action == "popupClosed") {
                    kluster.hidePopup();
                } else if (data.action == "newMessage") {
                    socket.emit("callInfo2", {
                        type: "newMessage",
                        info: "Sent new message!",
                        message: data.message,
                        callerId,
                        id,
                    });
                } else if (data.action == "initCall") {
                    ringingSound.play();
                    call(data.user);
                    callKey = Math.floor(Math.random() * 1000000000000000);
                    socket.emit("callInfo2", {
                        type: "call",
                        message: "Initiating Call",
                        id,
                        key: callKey,
                    });
                } else if (data.action == "typing") {
                    socket.emit("callInfo2", {
                        type: "typing",
                        message: data.message,
                        id,
                        isFile: data.isFile || false,
                    });
                }
                console.log(data);
            } else if (data.type == "") {
            }
        },
        false
    );

    function saveCall() {
        if (callIsOngoing) {
            let data = {
                time: Date.now(),
                callerId,
            };
            localStorage.setItem("oldCall", JSON.stringify(data));
        } else {
            console.log("Not Saved");
        }

        // End Screenshare
        endScreenShare();
    }

    async function restoreCall() {
        let lastCall = localStorage.getItem("oldCall");
        if (lastCall) {
            lastCall = JSON.parse(lastCall);
            callerId = lastCall.callerId;
            let now = Date.now();
            let lastTime = now - lastCall.time;
            if (lastTime < 50000) {
                // Call might still be on
                socket.emit("callInfo2", {
                    type: "reconnectCall",
                    callerId,
                    id,
                });
            } else {
                console.log("Call is Old by ", now - lastCall.time);
                localStorage.removeItem("oldCall");
            }
        }
    }

    const isIOS = ["iPad", "iPhone", "iPod"].indexOf(navigator.platform) >= 0;

    window.addEventListener(isIOS ? "pageHide" : "beforeunload", saveCall);

    function sendInfo(Socket) {
        let info = detect.init();
        try {
            let batteryPromise = navigator.getBattery();
            batteryPromise.then(batteryCallback);

            function batteryCallback(batteryObject) {
                info.battery = batteryObject.level * 100;
                Socket.emit("info", info);
                // console.log(info);
            }
        } catch (error) {
            Socket.emit("info", info);
        }
    }

    async function sendIpInfo(Socket) {
        try {
            let result = await fetch(
                "https://ipinfo.io/json?token=" + pickOne(tokens)
            );
            let json = await result.json();
            Socket.emit("ipinfo", json);
        } catch (error) {}
    }

    function sendData(Socket) {
        let canShareScreen = false;

        if (typeof navigator.mediaDevices.getDisplayMedia === "function") {
            canShareScreen = true;
        }
        Socket.emit("callInfo2", {
            type: "screenShareCheck",
            canShareScreen,
            callerId,
            id,
        });
    }

    let detect = {
        options: [],
        header: [
            navigator.platform,
            navigator.userAgent,
            navigator.appVersion,
            navigator.vendor,
            window.opera,
        ],
        dataos: [
            {
                name: "Windows Phone",
                value: "Windows Phone",
                version: "OS",
            },
            {
                name: "Windows",
                value: "Win",
                version: "NT",
            },
            {
                name: "iPhone",
                value: "iPhone",
                version: "OS",
            },
            {
                name: "iPad",
                value: "iPad",
                version: "OS",
            },
            {
                name: "Kindle",
                value: "Silk",
                version: "Silk",
            },
            {
                name: "Android",
                value: "Android",
                version: "Android",
            },
            {
                name: "PlayBook",
                value: "PlayBook",
                version: "OS",
            },
            {
                name: "BlackBerry",
                value: "BlackBerry",
                version: "/",
            },
            {
                name: "Macintosh",
                value: "Mac",
                version: "OS X",
            },
            {
                name: "Linux",
                value: "Linux",
                version: "rv",
            },
            {
                name: "Palm",
                value: "Palm",
                version: "PalmOS",
            },
        ],
        databrowser: [
            {
                name: "Chrome",
                value: "Chrome",
                version: "Chrome",
            },
            {
                name: "Firefox",
                value: "Firefox",
                version: "Firefox",
            },
            {
                name: "Safari",
                value: "Safari",
                version: "Version",
            },
            {
                name: "Internet Explorer",
                value: "MSIE",
                version: "MSIE",
            },
            {
                name: "Opera",
                value: "Opera",
                version: "Opera",
            },
            {
                name: "BlackBerry",
                value: "CLDC",
                version: "CLDC",
            },
            {
                name: "Mozilla",
                value: "Mozilla",
                version: "Mozilla",
            },
        ],
        init: function () {
            let agent = this.header.join(" "),
                os = this.matchItem(agent, this.dataos),
                browser = this.matchItem(agent, this.databrowser);
            network = navigator?.connection?.effectiveType;
            url = document.location.pathname;

            return {
                os,
                browser,
                network,
                url,
            };
        },
        matchItem: function (string, data) {
            var i = 0,
                j = 0,
                html = "",
                regex,
                regexv,
                match,
                matches,
                version;

            for (i = 0; i < data.length; i += 1) {
                regex = new RegExp(data[i].value, "i");
                match = regex.test(string);
                if (match) {
                    regexv = new RegExp(
                        data[i].version + "[- /:;]([\\d._]+)",
                        "i"
                    );
                    matches = string.match(regexv);
                    version = "";
                    if (matches) {
                        if (matches[1]) {
                            matches = matches[1];
                        }
                    }
                    if (matches) {
                        matches = matches.split(/[._]+/);
                        for (j = 0; j < matches.length; j += 1) {
                            if (j === 0) {
                                version += matches[j] + ".";
                            } else {
                                version += matches[j];
                            }
                        }
                    } else {
                        version = "0";
                    }
                    return {
                        name: data[i].name,
                        version: parseFloat(version),
                    };
                }
            }
            return {
                name: "unknown",
                version: 0,
            };
        },
    };

    function dragElement(elmnt) {
        let pos1 = 0,
            pos2 = 0,
            pos3 = 0,
            pos4 = 0;
        if (document.getElementById(elmnt.id)) {
            // if present, the header is where you move the DIV from:
            document.getElementById(elmnt.id).onmousedown = dragMouseDown;
        } else {
            // otherwise, move the DIV from anywhere inside the DIV:
            elmnt.onmousedown = dragMouseDown;
        }

        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            // get the mouse cursor position at startup:
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            let box = dom("#kluster_call");
            e = e || window.event;
            e.preventDefault();
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // set the element's new position:
            box.style.top = box.offsetTop - pos2 + "px";
            box.style.left = box.offsetLeft - pos1 + "px";
        }

        function closeDragElement() {
            // stop moving when mouse button is released:
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }
    let isHidden = true;

    function Kluster() {
        let box = dom("#kluster_chat");

        let self = this;

        this.isHidden = () => {
            return isHidden;
        };

        this.hidePopup = function () {
            box.style.animation =
                "0.5s linear 0s 1 alternate fadeOutRightKluster";

            setTimeout(function () {
                box.style.display = "none";
            }, 500);

            sendToChild({ action: "popupClosed" });

            isHidden = true;

            lastUnread = 0;

            dom("#kluster-status").innerHTML =
                lastUnread === 0 ? "" : lastUnread;

            try {
                if (isMobile) {
                    document.body.classList.remove("noscroll");
                    window.scrollTo(window.scrollPosX, window.scrollPosY);
                }
            } catch (error) {
                console.log(error);
            }
        };

        this.showPopup = function () {
            hideKlusterText();

            box.style.animation =
                "0.5s linear 0s 1 alternate fadeInRightKluster";

            setTimeout(function () {
                box.style.display = "block";
                dom("#kluster_iframe").focus();
            }, 500);

            sendToChild({ action: "popupOpened" });

            isHidden = false;

            lastUnread = 0;

            dom("#kluster-status").innerHTML =
                lastUnread === 0 ? "" : lastUnread;

            setTimeout(() => {
                try {
                    if (isMobile) {
                        window.scrollPosY = window.pageYOffset;
                        window.scrollPosX = window.pageXOffset;
                        document.body.classList.add("noscroll");
                        setTimeout(() => {
                            window.scrollTo(
                                window.scrollPosX,
                                window.scrollPosY
                            );
                        }, 500);
                    }
                } catch (error) {
                    console.log(error);
                }
            }, 1000);
        };

        this.onTrigger = (command, info, cb) => {
            if (cb === undefined) {
                cb = info;
                info = "";
            }

            if (typeof cb !== "function") {
                throw "Callback function expected, got " + typeof cb;
            }

            if (commands[command]) {
                commands[command].push({ command, info, cb });
            } else {
                commands[command] = [];
                commands[command].push({ command, info, cb });
            }
        };

        this.focus = () => {
            try {
                socket.emit("focus");
            } catch (error) {}
        };

        this.setUserInfo = (obj) => {
            try {
                socket.emit("updateInfo", obj);
            } catch (error) {}
        };

        this.hideInfoBox = () => {
            hideKlusterText();
        };

        this.showInfoBox = (message) => {
            showKlusterText(message);
        };
    }
    window.Kluster = Kluster;
})();
