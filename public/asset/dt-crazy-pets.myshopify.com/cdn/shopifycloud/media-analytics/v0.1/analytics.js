!(function () {
  "use strict";
  function e(e) {
    !(function (e) {
      "loading" !== document.readyState
        ? e()
        : document.addEventListener
        ? document.addEventListener("DOMContentLoaded", e)
        : document.attachEvent("onreadystatechange", () => {
            "loading" !== document.readyState && e();
          });
    })(() => {
      const t = window.ShopifyAnalytics;
      t &&
        t.lib &&
        t.lib.ready(() => {
          e();
        });
    });
  }
  const t = [];
  function r(e) {
    return t.indexOf(e);
  }
  function n(e, r) {
    Array.prototype.slice.apply(document.querySelectorAll(e)).forEach((e) => {
      -1 === t.indexOf(e) && (t.push(e), r(e));
    });
  }
  function o(e) {
    return e &&
      e.__esModule &&
      Object.prototype.hasOwnProperty.call(e, "default")
      ? e.default
      : e;
  }
  function i(e, t) {
    return e((t = { exports: {} }), t.exports), t.exports;
    /*! *****************************************************************************
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the Apache License, Version 2.0 (the "License"); you may not use
  this file except in compliance with the License. You may obtain a copy of the
  License at http://www.apache.org/licenses/LICENSE-2.0

  THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
  KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
  WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
  MERCHANTABLITY OR NON-INFRINGEMENT.

  See the Apache Version 2.0 License for specific language governing permissions
  and limitations under the License.
  ***************************************************************************** */
  }
  var a = function (e, t) {
    return (a =
      Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array &&
        function (e, t) {
          e.__proto__ = t;
        }) ||
      function (e, t) {
        for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
      })(e, t);
  };
  var c = function () {
    return (c =
      Object.assign ||
      function (e) {
        for (var t, r = 1, n = arguments.length; r < n; r++)
          for (var o in (t = arguments[r]))
            Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
        return e;
      }).apply(this, arguments);
  };
  function s(e) {
    var t = "function" == typeof Symbol && e[Symbol.iterator],
      r = 0;
    return t
      ? t.call(e)
      : {
          next: function () {
            return (
              e && r >= e.length && (e = void 0),
              { value: e && e[r++], done: !e }
            );
          },
        };
  }
  function u(e, t) {
    var r = "function" == typeof Symbol && e[Symbol.iterator];
    if (!r) return e;
    var n,
      o,
      i = r.call(e),
      a = [];
    try {
      for (; (void 0 === t || t-- > 0) && !(n = i.next()).done; )
        a.push(n.value);
    } catch (e) {
      o = { error: e };
    } finally {
      try {
        n && !n.done && (r = i.return) && r.call(i);
      } finally {
        if (o) throw o.error;
      }
    }
    return a;
  }
  function d(e) {
    return this instanceof d ? ((this.v = e), this) : new d(e);
  }
  var l = Object.freeze({
      __proto__: null,
      __extends: function (e, t) {
        function r() {
          this.constructor = e;
        }
        a(e, t),
          (e.prototype =
            null === t
              ? Object.create(t)
              : ((r.prototype = t.prototype), new r()));
      },
      get __assign() {
        return c;
      },
      __rest: function (e, t) {
        var r = {};
        for (var n in e)
          Object.prototype.hasOwnProperty.call(e, n) &&
            t.indexOf(n) < 0 &&
            (r[n] = e[n]);
        if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
          var o = 0;
          for (n = Object.getOwnPropertySymbols(e); o < n.length; o++)
            t.indexOf(n[o]) < 0 &&
              Object.prototype.propertyIsEnumerable.call(e, n[o]) &&
              (r[n[o]] = e[n[o]]);
        }
        return r;
      },
      __decorate: function (e, t, r, n) {
        var o,
          i = arguments.length,
          a =
            i < 3
              ? t
              : null === n
              ? (n = Object.getOwnPropertyDescriptor(t, r))
              : n;
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
          a = Reflect.decorate(e, t, r, n);
        else
          for (var c = e.length - 1; c >= 0; c--)
            (o = e[c]) &&
              (a = (i < 3 ? o(a) : i > 3 ? o(t, r, a) : o(t, r)) || a);
        return i > 3 && a && Object.defineProperty(t, r, a), a;
      },
      __param: function (e, t) {
        return function (r, n) {
          t(r, n, e);
        };
      },
      __metadata: function (e, t) {
        if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
          return Reflect.metadata(e, t);
      },
      __awaiter: function (e, t, r, n) {
        return new (r || (r = Promise))(function (o, i) {
          function a(e) {
            try {
              s(n.next(e));
            } catch (e) {
              i(e);
            }
          }
          function c(e) {
            try {
              s(n.throw(e));
            } catch (e) {
              i(e);
            }
          }
          function s(e) {
            e.done
              ? o(e.value)
              : new r(function (t) {
                  t(e.value);
                }).then(a, c);
          }
          s((n = n.apply(e, t || [])).next());
        });
      },
      __generator: function (e, t) {
        var r,
          n,
          o,
          i,
          a = {
            label: 0,
            sent: function () {
              if (1 & o[0]) throw o[1];
              return o[1];
            },
            trys: [],
            ops: [],
          };
        return (
          (i = { next: c(0), throw: c(1), return: c(2) }),
          "function" == typeof Symbol &&
            (i[Symbol.iterator] = function () {
              return this;
            }),
          i
        );
        function c(i) {
          return function (c) {
            return (function (i) {
              if (r) throw new TypeError("Generator is already executing.");
              for (; a; )
                try {
                  if (
                    ((r = 1),
                    n &&
                      (o =
                        2 & i[0]
                          ? n.return
                          : i[0]
                          ? n.throw || ((o = n.return) && o.call(n), 0)
                          : n.next) &&
                      !(o = o.call(n, i[1])).done)
                  )
                    return o;
                  switch (((n = 0), o && (i = [2 & i[0], o.value]), i[0])) {
                    case 0:
                    case 1:
                      o = i;
                      break;
                    case 4:
                      return a.label++, { value: i[1], done: !1 };
                    case 5:
                      a.label++, (n = i[1]), (i = [0]);
                      continue;
                    case 7:
                      (i = a.ops.pop()), a.trys.pop();
                      continue;
                    default:
                      if (
                        !(o = (o = a.trys).length > 0 && o[o.length - 1]) &&
                        (6 === i[0] || 2 === i[0])
                      ) {
                        a = 0;
                        continue;
                      }
                      if (3 === i[0] && (!o || (i[1] > o[0] && i[1] < o[3]))) {
                        a.label = i[1];
                        break;
                      }
                      if (6 === i[0] && a.label < o[1]) {
                        (a.label = o[1]), (o = i);
                        break;
                      }
                      if (o && a.label < o[2]) {
                        (a.label = o[2]), a.ops.push(i);
                        break;
                      }
                      o[2] && a.ops.pop(), a.trys.pop();
                      continue;
                  }
                  i = t.call(e, a);
                } catch (e) {
                  (i = [6, e]), (n = 0);
                } finally {
                  r = o = 0;
                }
              if (5 & i[0]) throw i[1];
              return { value: i[0] ? i[1] : void 0, done: !0 };
            })([i, c]);
          };
        }
      },
      __exportStar: function (e, t) {
        for (var r in e) t.hasOwnProperty(r) || (t[r] = e[r]);
      },
      __values: s,
      __read: u,
      __spread: function () {
        for (var e = [], t = 0; t < arguments.length; t++)
          e = e.concat(u(arguments[t]));
        return e;
      },
      __spreadArrays: function () {
        for (var e = 0, t = 0, r = arguments.length; t < r; t++)
          e += arguments[t].length;
        var n = Array(e),
          o = 0;
        for (t = 0; t < r; t++)
          for (var i = arguments[t], a = 0, c = i.length; a < c; a++, o++)
            n[o] = i[a];
        return n;
      },
      __await: d,
      __asyncGenerator: function (e, t, r) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var n,
          o = r.apply(e, t || []),
          i = [];
        return (
          (n = {}),
          a("next"),
          a("throw"),
          a("return"),
          (n[Symbol.asyncIterator] = function () {
            return this;
          }),
          n
        );
        function a(e) {
          o[e] &&
            (n[e] = function (t) {
              return new Promise(function (r, n) {
                i.push([e, t, r, n]) > 1 || c(e, t);
              });
            });
        }
        function c(e, t) {
          try {
            (r = o[e](t)).value instanceof d
              ? Promise.resolve(r.value.v).then(s, u)
              : l(i[0][2], r);
          } catch (e) {
            l(i[0][3], e);
          }
          var r;
        }
        function s(e) {
          c("next", e);
        }
        function u(e) {
          c("throw", e);
        }
        function l(e, t) {
          e(t), i.shift(), i.length && c(i[0][0], i[0][1]);
        }
      },
      __asyncDelegator: function (e) {
        var t, r;
        return (
          (t = {}),
          n("next"),
          n("throw", function (e) {
            throw e;
          }),
          n("return"),
          (t[Symbol.iterator] = function () {
            return this;
          }),
          t
        );
        function n(n, o) {
          t[n] = e[n]
            ? function (t) {
                return (r = !r)
                  ? { value: d(e[n](t)), done: "return" === n }
                  : o
                  ? o(t)
                  : t;
              }
            : o;
        }
      },
      __asyncValues: function (e) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var t,
          r = e[Symbol.asyncIterator];
        return r
          ? r.call(e)
          : ((e = s(e)),
            (t = {}),
            n("next"),
            n("throw"),
            n("return"),
            (t[Symbol.asyncIterator] = function () {
              return this;
            }),
            t);
        function n(r) {
          t[r] =
            e[r] &&
            function (t) {
              return new Promise(function (n, o) {
                (function (e, t, r, n) {
                  Promise.resolve(n).then(function (t) {
                    e({ value: t, done: r });
                  }, t);
                })(n, o, (t = e[r](t)).done, t.value);
              });
            };
        }
      },
      __makeTemplateObject: function (e, t) {
        return (
          Object.defineProperty
            ? Object.defineProperty(e, "raw", { value: t })
            : (e.raw = t),
          e
        );
      },
      __importStar: function (e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
          for (var r in e) Object.hasOwnProperty.call(e, r) && (t[r] = e[r]);
        return (t.default = e), t;
      },
      __importDefault: function (e) {
        return e && e.__esModule ? e : { default: e };
      },
    }),
    f = i(function (e, t) {
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.DEVELOPMENT_DOMAIN = "http://localhost:8082"),
        (t.PRODUCTION_DOMAIN = "https://monorail-edge.shopifysvc.com"),
        (t.PRODUCE_BATCH_ENDPOINT = "/unstable/produce_batch"),
        (t.PRODUCE_ENDPOINT = "/v1/produce"),
        (t.PRODUCTION_CANADA_ENDPOINT =
          "https://monorail-edge-ca.shopifycloud.com/v1/produce"),
        (t.extractDomain = function (e) {
          return "https://" + new URL(e).hostname;
        });
    });
  o(f);
  f.DEVELOPMENT_DOMAIN,
    f.PRODUCTION_DOMAIN,
    f.PRODUCE_BATCH_ENDPOINT,
    f.PRODUCE_ENDPOINT,
    f.PRODUCTION_CANADA_ENDPOINT,
    f.extractDomain;
  for (
    var p = i(function (e) {
        var t =
          ("undefined" != typeof crypto &&
            crypto.getRandomValues &&
            crypto.getRandomValues.bind(crypto)) ||
          ("undefined" != typeof msCrypto &&
            "function" == typeof window.msCrypto.getRandomValues &&
            msCrypto.getRandomValues.bind(msCrypto));
        if (t) {
          var r = new Uint8Array(16);
          e.exports = function () {
            return t(r), r;
          };
        } else {
          var n = new Array(16);
          e.exports = function () {
            for (var e, t = 0; t < 16; t++)
              0 == (3 & t) && (e = 4294967296 * Math.random()),
                (n[t] = (e >>> ((3 & t) << 3)) & 255);
            return n;
          };
        }
      }),
      h = [],
      y = 0;
    y < 256;
    ++y
  )
    h[y] = (y + 256).toString(16).substr(1);
  var v,
    m,
    _ = function (e, t) {
      var r = t || 0,
        n = h;
      return [
        n[e[r++]],
        n[e[r++]],
        n[e[r++]],
        n[e[r++]],
        "-",
        n[e[r++]],
        n[e[r++]],
        "-",
        n[e[r++]],
        n[e[r++]],
        "-",
        n[e[r++]],
        n[e[r++]],
        "-",
        n[e[r++]],
        n[e[r++]],
        n[e[r++]],
        n[e[r++]],
        n[e[r++]],
        n[e[r++]],
      ].join("");
    },
    g = 0,
    w = 0;
  var b = function (e, t, r) {
    var n = (t && r) || 0,
      o = t || [],
      i = (e = e || {}).node || v,
      a = void 0 !== e.clockseq ? e.clockseq : m;
    if (null == i || null == a) {
      var c = p();
      null == i && (i = v = [1 | c[0], c[1], c[2], c[3], c[4], c[5]]),
        null == a && (a = m = 16383 & ((c[6] << 8) | c[7]));
    }
    var s = void 0 !== e.msecs ? e.msecs : new Date().getTime(),
      u = void 0 !== e.nsecs ? e.nsecs : w + 1,
      d = s - g + (u - w) / 1e4;
    if (
      (d < 0 && void 0 === e.clockseq && (a = (a + 1) & 16383),
      (d < 0 || s > g) && void 0 === e.nsecs && (u = 0),
      u >= 1e4)
    )
      throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
    (g = s), (w = u), (m = a);
    var l = (1e4 * (268435455 & (s += 122192928e5)) + u) % 4294967296;
    (o[n++] = (l >>> 24) & 255),
      (o[n++] = (l >>> 16) & 255),
      (o[n++] = (l >>> 8) & 255),
      (o[n++] = 255 & l);
    var f = ((s / 4294967296) * 1e4) & 268435455;
    (o[n++] = (f >>> 8) & 255),
      (o[n++] = 255 & f),
      (o[n++] = ((f >>> 24) & 15) | 16),
      (o[n++] = (f >>> 16) & 255),
      (o[n++] = (a >>> 8) | 128),
      (o[n++] = 255 & a);
    for (var h = 0; h < 6; ++h) o[n + h] = i[h];
    return t || _(o);
  };
  var E = function (e, t, r) {
      var n = (t && r) || 0;
      "string" == typeof e &&
        ((t = "binary" === e ? new Array(16) : null), (e = null));
      var o = (e = e || {}).random || (e.rng || p)();
      if (((o[6] = (15 & o[6]) | 64), (o[8] = (63 & o[8]) | 128), t))
        for (var i = 0; i < 16; ++i) t[n + i] = o[i];
      return t || _(o);
    },
    T = E;
  (T.v1 = b), (T.v4 = E);
  var O = T,
    M = i(function (e, t) {
      Object.defineProperty(t, "__esModule", { value: !0 });
      var r = (function (e) {
        function t(r) {
          var n =
            e.call(
              this,
              "Error producing to the Monorail Edge. Response received: " +
                JSON.stringify(r)
            ) || this;
          return (n.response = r), Object.setPrototypeOf(n, t.prototype), n;
        }
        return l.__extends(t, e), t;
      })(Error);
      t.MonorailUnableToProduceError = r;
      var n = (function (e) {
        function t(r) {
          var n =
            e.call(
              this,
              "Error producing to the Monorail Edge. Response received: " +
                JSON.stringify(r)
            ) || this;
          return Object.setPrototypeOf(n, t.prototype), (n.response = r), n;
        }
        return l.__extends(t, e), t;
      })(Error);
      t.MonorailBatchProduceError = n;
      var o = (function (e) {
        function t(r) {
          var n =
            e.call(
              this,
              "Error completing request. A network failure may have prevented the request from completing. Error: " +
                r
            ) || this;
          return Object.setPrototypeOf(n, t.prototype), n;
        }
        return l.__extends(t, e), t;
      })(Error);
      t.MonorailRequestError = o;
      var i = (function (e) {
        function t(r) {
          var n = e.call(this, "" + r) || this;
          return Object.setPrototypeOf(n, t.prototype), n;
        }
        return l.__extends(t, e), t;
      })(Error);
      t.MonorailRetriesExceededError = i;
    });
  o(M);
  M.MonorailUnableToProduceError,
    M.MonorailBatchProduceError,
    M.MonorailRequestError,
    M.MonorailRetriesExceededError;
  var P = i(function (e, t) {
    Object.defineProperty(t, "__esModule", { value: !0 });
    var r = (function () {
      function e(e) {
        void 0 === e && (e = f.DEVELOPMENT_DOMAIN), (this.edgeDomain = e);
      }
      return (
        (e.withEndpoint = function (t) {
          return new e(f.extractDomain(t));
        }),
        (e.getHeadersFromMetadata = function (e) {
          var t = {
            "Content-Type": "application/json; charset=utf-8",
            "X-Monorail-Edge-Event-Created-At-Ms": (
              (e && e.eventCreatedAtMs) ||
              Date.now()
            ).toString(),
            "X-Monorail-Edge-Event-Sent-At-Ms": Date.now().toString(),
            "X-Monorail-Edge-Client-Message-Id": (
              (e && e.clientMessageId) ||
              O.v4()
            ).toString(),
          };
          return e && e.userAgent && (t["User-Agent"] = e.userAgent), t;
        }),
        (e.prototype.produceBatch = function (t) {
          return l.__awaiter(this, void 0, void 0, function () {
            var r, n, o, i, a, c;
            return l.__generator(this, function (s) {
              switch (s.label) {
                case 0:
                  (r = {
                    events: this.convertAllEventsToUnderscoreCase(t),
                    metadata: this.toUnderscoreCase(t.metadata),
                  }),
                    (s.label = 1);
                case 1:
                  return (
                    s.trys.push([1, 3, , 4]),
                    [
                      4,
                      fetch(this.produceBatchEndpoint(), {
                        method: "post",
                        headers: e.getHeadersFromMetadata(t.metadata),
                        body: JSON.stringify(r),
                      }),
                    ]
                  );
                case 2:
                  return (n = s.sent()), [3, 4];
                case 3:
                  throw ((o = s.sent()), new M.MonorailRequestError(o));
                case 4:
                  return 207 !== n.status ? [3, 6] : [4, n.json()];
                case 5:
                  throw ((i = s.sent()), new M.MonorailBatchProduceError(i));
                case 6:
                  return n.ok
                    ? [3, 8]
                    : ((a = M.MonorailUnableToProduceError.bind),
                      (c = { status: n.status }),
                      [4, n.text()]);
                case 7:
                  throw new (a.apply(M.MonorailUnableToProduceError, [
                    void 0,
                    ((c.message = s.sent()), c),
                  ]))();
                case 8:
                  return [2, { status: n.status }];
              }
            });
          });
        }),
        (e.prototype.produce = function (t) {
          return l.__awaiter(this, void 0, void 0, function () {
            var r, n, o, i, a;
            return l.__generator(this, function (c) {
              switch (c.label) {
                case 0:
                  (r = {
                    schema_id: t.schemaId,
                    payload: this.toUnderscoreCase(t.payload),
                  }),
                    (c.label = 1);
                case 1:
                  return (
                    c.trys.push([1, 3, , 4]),
                    [
                      4,
                      fetch(this.produceEndpoint(), {
                        method: "post",
                        headers: e.getHeadersFromMetadata(t.metadata),
                        body: JSON.stringify(r),
                      }),
                    ]
                  );
                case 2:
                  return (n = c.sent()), [3, 4];
                case 3:
                  throw ((o = c.sent()), new M.MonorailRequestError(o));
                case 4:
                  if (!n)
                    throw new M.MonorailUnableToProduceError({
                      message: "No response from edge",
                    });
                  return n.ok
                    ? [3, 6]
                    : ((i = M.MonorailUnableToProduceError.bind),
                      (a = { status: n.status }),
                      [4, n.text()]);
                case 5:
                  throw new (i.apply(M.MonorailUnableToProduceError, [
                    void 0,
                    ((a.message = c.sent()), a),
                  ]))();
                case 6:
                  return [2, { status: n.status }];
              }
            });
          });
        }),
        (e.prototype.produceBatchEndpoint = function () {
          return this.edgeDomain + f.PRODUCE_BATCH_ENDPOINT;
        }),
        (e.prototype.produceEndpoint = function () {
          return this.edgeDomain + f.PRODUCE_ENDPOINT;
        }),
        (e.prototype.convertAllEventsToUnderscoreCase = function (e) {
          var t = this;
          return e.events.map(function (e) {
            return {
              schema_id: e.schemaId,
              payload: t.toUnderscoreCase(e.payload),
              metadata: t.toUnderscoreCase(e.metadata),
            };
          });
        }),
        (e.prototype.toUnderscoreCase = function (e) {
          var t = this;
          return e
            ? Object.keys(e)
                .map(function (r) {
                  var n;
                  return (
                    ((n = {})[t.convertStringToUnderscoreCase(r)] = e[r]), n
                  );
                })
                .reduce(function (e, t) {
                  return l.__assign({}, e, t);
                })
            : e;
        }),
        (e.prototype.convertStringToUnderscoreCase = function (e) {
          return e
            .split(/(?=[A-Z])/)
            .join("_")
            .toLowerCase();
        }),
        e
      );
    })();
    t.HttpProducer = r;
  });
  o(P);
  P.HttpProducer;
  var I = i(function (e, t) {
    Object.defineProperty(t, "__esModule", { value: !0 });
    var r = (function () {
      function e(t) {
        (this.sendToConsole = t), t && e.printWelcomeMessage(t);
      }
      return (
        (e.printWelcomeMessage = function (e) {
          console.log(
            "%c👋 from Monorail%c\n\nWe've noticed that you're" +
              (e ? "" : " not") +
              " running in debug mode. As such, we will " +
              (e ? "produce" : "not produce") +
              " Monorail events to the console. \n\nIf you want Monorail events to " +
              (e ? "stop" : "start") +
              " appearing here, %cset debugMode=" +
              (!e).toString() +
              "%c, for the Monorail Log Producer in your code.",
            "font-size: large;",
            "font-size: normal;",
            "font-weight: bold;",
            "font-weight: normal;"
          );
        }),
        (e.prototype.produce = function (e) {
          return (
            this.sendToConsole && console.log("Monorail event produced", e),
            new Promise(function (t) {
              t(e);
            })
          );
        }),
        (e.prototype.produceBatch = function (e) {
          return (
            this.sendToConsole &&
              console.log("Monorail Batch event produced", e),
            new Promise(function (t) {
              t(e);
            })
          );
        }),
        e
      );
    })();
    t.LogProducer = r;
  });
  o(I);
  I.LogProducer;
  var S = i(function (e, t) {
    Object.defineProperty(t, "__esModule", { value: !0 }),
      (t.isCompositeMonorailEvent = function (e) {
        return void 0 !== e.schemaId;
      });
  });
  o(S);
  S.isCompositeMonorailEvent;
  var j = i(function (e, t) {
    Object.defineProperty(t, "__esModule", { value: !0 });
    var r = (function () {
      function e(e) {
        this.producer = e;
      }
      return (
        (e.prototype.do = function (e, t) {
          return S.isCompositeMonorailEvent(e)
            ? this.producer.produce(e)
            : this.producer.produceBatch(e);
        }),
        e
      );
    })();
    t.ProducerMiddleware = r;
  });
  o(j);
  j.ProducerMiddleware;
  var C = i(function (e, t) {
    Object.defineProperty(t, "__esModule", { value: !0 });
    var r = (function () {
      function e(t, r) {
        (this.producer = t),
          (this.middleware = r),
          (this.executeChain = e.buildMiddlewareChain(
            this.middleware.concat(new j.ProducerMiddleware(t))
          ));
      }
      return (
        (e.createLogProducer = function (t) {
          return new e(new I.LogProducer(t.debugMode), t.middleware || []);
        }),
        (e.createHttpProducerWithEndpoint = function (t, r) {
          return (
            void 0 === r && (r = []), new e(P.HttpProducer.withEndpoint(t), r)
          );
        }),
        (e.createHttpProducer = function (t) {
          return new e(
            t.production
              ? new P.HttpProducer(f.PRODUCTION_DOMAIN)
              : new P.HttpProducer(f.DEVELOPMENT_DOMAIN),
            t.middleware || []
          );
        }),
        (e.buildMiddlewareChain = function (e, t) {
          var r = this;
          return (
            void 0 === t && (t = 0),
            t === e.length
              ? this.identityFn
              : function (n) {
                  return e[t].do(n, r.buildMiddlewareChain(e, t + 1));
                }
          );
        }),
        (e.prototype.produce = function (e) {
          return (
            (e.metadata = l.__assign(
              { eventCreatedAtMs: Date.now(), clientMessageId: O.v4() },
              e.metadata
            )),
            this.executeChain(e)
          );
        }),
        (e.prototype.produceBatch = function (e) {
          return this.executeChain(e);
        }),
        e
      );
    })();
    t.Monorail = r;
  });
  o(C);
  C.Monorail;
  var k = i(function (e, t) {
    Object.defineProperty(t, "__esModule", { value: !0 });
    var r = (function () {
      function e(e, t) {
        void 0 === e && (e = 3),
          void 0 === t && (t = 150),
          (this.maxRetries = e),
          (this.delayMs = t);
      }
      return (
        (e.prototype.do = function (e, t) {
          return l.__awaiter(this, void 0, void 0, function () {
            var r, n, o, i, a;
            return l.__generator(this, function (c) {
              switch (c.label) {
                case 0:
                  (r = 0), (c.label = 1);
                case 1:
                  if (!(r < this.maxRetries)) return [3, 7];
                  (o = void 0), (c.label = 2);
                case 2:
                  return c.trys.push([2, 4, , 6]), [4, t(e)];
                case 3:
                  return (o = c.sent()), [3, 6];
                case 4:
                  if (
                    ((i = c.sent()),
                    (n = n || new Error()),
                    (n = new Error(
                      n.message +
                        " Retry count:" +
                        (r + 1) +
                        " Error msg:" +
                        i.message +
                        "\n"
                    )),
                    i instanceof M.MonorailUnableToProduceError &&
                      (a = i.response.status) &&
                      a >= 400 &&
                      a < 500)
                  )
                    throw i;
                  return [4, this.delay(this.delayMs * Math.pow(2, r))];
                case 5:
                  return c.sent(), r++, [3, 1];
                case 6:
                  return [2, o];
                case 7:
                  throw (
                    (n
                      ? (n.message =
                          "Retry count of " +
                          this.maxRetries +
                          " exceeded. Failed with error: \n" +
                          n.message +
                          " Aborting request for " +
                          JSON.stringify(e))
                      : (n = new Error()),
                    new M.MonorailRetriesExceededError(n))
                  );
              }
            });
          });
        }),
        (e.prototype.delay = function (e) {
          return new Promise(function (t) {
            return setTimeout(t, e);
          });
        }),
        e
      );
    })();
    t.RetryMiddleware = r;
  });
  o(k);
  k.RetryMiddleware;
  var D = i(function (e, t) {
    Object.defineProperty(t, "__esModule", { value: !0 }),
      (t.Monorail = C.Monorail),
      (t.MonorailRequestError = M.MonorailRequestError),
      (t.MonorailUnableToProduceError = M.MonorailUnableToProduceError),
      (t.MonorailRetriesExceededError = M.MonorailRetriesExceededError),
      (t.RetryMiddleware = k.RetryMiddleware);
  });
  o(D);
  var x = D.Monorail,
    R =
      (D.MonorailRequestError,
      D.MonorailUnableToProduceError,
      D.MonorailRetriesExceededError,
      D.RetryMiddleware);
  function A() {
    return window.location.href;
  }
  function N() {
    const { resourceType: e = null, resourceId: t = null } =
      (function () {
        try {
          return window.ShopifyAnalytics.meta.page;
        } catch (e) {
          return null;
        }
      })() || {};
    return { resourceType: e, resourceId: t };
  }
  let U = null;
  const L = 'script#shopify-features[type="application/json"]';
  function q() {
    if (!U) {
      const e = document.head.querySelector(L) || document.querySelector(L);
      if (!e) return null;
      U = JSON.parse(e.innerHTML).shopId;
    }
    return U;
  }
  function V() {
    try {
      return window.ShopifyAnalytics.lib.user().traits().uniqToken;
    } catch (e) {
      return null;
    }
  }
  function H() {
    try {
      return window.ShopifyAnalytics.lib.trekkie.defaultAttributes.visitToken;
    } catch (e) {
      return null;
    }
  }
  let B, F;
  function J() {
    if (B) return Object.assign(Object.assign({}, B), { pageUrl: A() });
    const { resourceId: e, resourceType: t } = N();
    return (B = {
      shopId: q(),
      uniqToken: V(),
      sessionToken: H(),
      pageUrl: A(),
      resourceType: t,
      resourceId: e,
    });
  }
  var W = (F = x.createHttpProducer({
    production: !0,
    middleware: [new R(5, 200)],
  }));
  const z = {
      trackCreated(e) {
        const t = J();
        return W.produce({
          schemaId: "online_store_media_ar_created/1.0",
          payload: Object.assign(Object.assign({}, t), e),
        });
      },
      trackInvoke(e) {
        const t = J();
        return W.produce({
          schemaId: "online_store_media_ar_invoked/1.0",
          payload: Object.assign(Object.assign({}, t), e),
        });
      },
    },
    X = "html_anchor",
    { trackCreated: G, trackInvoke: Z } = z;
  let K = 0;
  function Q({ anchor: e, arElementType: t }) {
    const r = K++,
      n = e.href || "";
    e.addEventListener("click", function () {
      Z({ src: n, sessionSourceId: r, invoker: X, arType: t });
    }),
      G({ arElementType: t, sessionSourceId: r, src: n });
  }
  const Y = 'a[rel="ar"]';
  e(function () {
    n(Y, (e) => {
      Q({ anchor: e, arElementType: "ar_quicklook" });
    });
  });
  const $ =
    'a[href*="package=com.google.ar.core;action=android.intent.action.VIEW;"]';
  e(function () {
    n($, (e) => {
      Q({ anchor: e, arElementType: "scene_viewer" });
    });
  });
  const ee = {
    trackCreated(e) {
      const t = J();
      return W.produce({
        schemaId: "online_store_media_model_viewer_created/1.0",
        payload: Object.assign(Object.assign({}, t), e),
      });
    },
    trackLoaded(e) {
      const t = J();
      return W.produce({
        schemaId: "online_store_media_model_viewer_loaded/1.0",
        payload: Object.assign(Object.assign({}, t), e),
      });
    },
    trackFailed(e) {
      const t = J();
      return W.produce({
        schemaId: "online_store_media_model_viewer_failed/1.0",
        payload: Object.assign(Object.assign({}, t), e),
      });
    },
    trackInteract(e) {
      const t = J();
      return W.produce({
        schemaId: "online_store_media_model_viewer_interact/1.0",
        payload: Object.assign(Object.assign({}, t), e),
      });
    },
  };
  let te = 0;
  const re = "model-viewer";
  e(function () {
    n(re, (e) => {
      !(function ({
        modelViewer: e,
        trackCreated: t,
        trackLoaded: r,
        trackFailed: n,
        trackInteract: o,
      }) {
        const i = te++;
        let a = e.src || "",
          c = e.iosSrc,
          s = Date.now(),
          u = !1;
        t({ sessionModelViewerId: i, src: a, iosSrc: c }),
          e.addEventListener("load", function () {
            r({
              sessionModelViewerId: i,
              src: a,
              timeToLoaded: (Date.now() - s) / 1e3,
            });
          }),
          e.addEventListener("error", function (e) {
            const t = e.detail.type;
            n({ sessionModelViewerId: i, src: a, type: t });
          }),
          e.addEventListener("camera-change", function (e) {
            u ||
              ("user-interaction" === e.detail.source &&
                ((u = !0), o({ sessionModelViewerId: i, src: a })));
          }),
          e.addEventListener("progress", function () {
            e.src !== a && ((a = e.src || ""), (u = !1), (s = Date.now()));
          });
      })(Object.assign({ modelViewer: e }, ee));
    });
  });
  const { trackCreated: ne, trackInvoke: oe } = z,
    ie = function () {
      n("[data-shopify-xr]:not([data-shopify-xr-hidden])", (e) => {
        e.hasAttribute("data-shopify-xr-hidden") ||
          ne({
            arElementType: "shopify_xr",
            sessionSourceId: r(e),
            src: "unknown",
          });
      });
    };
  document.addEventListener("shopify_xr_launch", (e) => {
    const { xrMode: t, srcUrl: n, element: o } = e.detail;
    let i = null;
    "not_supported" !== t &&
      (o && (i = r(o)),
      -1 !== i &&
        oe({ arType: t, invoker: "shopify_xr", sessionSourceId: i, src: n }));
  }),
    document.addEventListener("shopify_xr_enabled", (e) => {
      ie();
    }),
    e(function () {
      ie();
    });
  const ae = {
    trackCreated(e) {
      const t = J();
      return W.produce({
        schemaId: "online_store_media_video_created/4.0",
        payload: Object.assign(Object.assign({}, t), e),
      });
    },
    trackCanPlay(e) {
      const t = J();
      return W.produce({
        schemaId: "online_store_media_video_canplay/3.0",
        payload: Object.assign(Object.assign({}, t), e),
      });
    },
    trackProgress(e) {
      const t = J();
      return W.produce({
        schemaId: "online_store_media_video_progress/3.0",
        payload: Object.assign(Object.assign({}, t), e),
      });
    },
  };
  class ce {
    constructor({ videoDuration: e, startTime: t, endTime: r }) {
      (this.videoDuration = e),
        (this._startTime = t),
        (this._endTime = r),
        r || (this._endTime = t);
    }
    get startTime() {
      return this._startTime;
    }
    get endTime() {
      return this._endTime;
    }
    get percentage() {
      return (this._endTime - this._startTime) / this.videoDuration;
    }
    isTimeInSegment(e) {
      return e >= this._startTime && e <= this._endTime;
    }
    extendSegment(e) {
      return e < this._startTime
        ? ((this._startTime = e), !0)
        : e > this._endTime && ((this._endTime = e), !0);
    }
  }
  function se(e) {
    const t = [new ce({ videoDuration: e, startTime: 0 })];
    let r = t[0];
    function n(e) {
      for (let r = 0; r < t.length; r++)
        if (t[r].isTimeInSegment(e)) return t[r];
      return null;
    }
    return {
      get percentage() {
        return 0 === t.length ? 0 : t.reduce((e, t) => e + t.percentage, 0);
      },
      seek(o) {
        let i = n(o);
        if (!i)
          return (
            (r = new ce({ videoDuration: e, startTime: o })), void t.push(r)
          );
        r = i;
      },
      addTime(o) {
        let i = n(o);
        i &&
          i !== r &&
          (r = (function (r, n) {
            for (let e = t.length - 1; e >= 0; e--)
              (t[e] !== r && t[e] !== n) || t.splice(e, 1);
            const o = r.startTime < n.startTime ? r.startTime : n.startTime,
              i = r.endTime > n.endTime ? r.endTime : n.endTime,
              a = new ce({ videoDuration: e, startTime: o, endTime: i });
            return t.push(a), a;
          })(i, r)),
          r.extendSegment(o);
      },
    };
  }
  const ue = [1e3, 2e3, 3e3, 5e3, 7e3],
    de = 3,
    le = "progress",
    fe = "canplay",
    pe = !0,
    he = "html_video",
    ye = "cdn.shopify.com/videos";
  let ve = 0;
  function me({
    video: e,
    trackCreated: t,
    trackCanPlay: r,
    trackProgress: n,
  }) {
    const o = ve++;
    let i,
      a,
      c = -1,
      s = -1,
      u = 0;
    function d(t = !1) {
      if (!a) return;
      a.addTime(e.currentTime),
        (e.currentTime >= e.duration ||
          t ||
          !(function () {
            const e = ue.length,
              t = Math.min(u, e - 1);
            return Date.now() - c < ue[t];
          })()) &&
          s !== e.currentTime &&
          (n({
            currentSrc: e.currentSrc,
            time: e.currentTime,
            duration: e.duration,
            percentageWatched: a.percentage,
            sessionVideoId: o,
            videoType: he,
          }),
          (u += 1),
          (s = e.currentTime),
          (c = Date.now()),
          1 == a.percentage &&
            (e.removeEventListener("timeupdate", y),
            e.removeEventListener("seeked", h)));
    }
    function l() {
      void 0 === i && (i = Date.now());
    }
    function f() {
      l(), e.removeEventListener(le, f);
    }
    function p() {
      l(),
        (a = se(e.duration)),
        e.removeEventListener(fe, p),
        r({
          currentSrc: e.currentSrc,
          timeToCanplay: (Date.now() - i) / 1e3,
          sessionVideoId: o,
          videoType: he,
        });
    }
    function h() {
      a.seek(e.currentTime);
    }
    function y() {
      d();
    }
    e.currentSrc
      ? t({
          currentSrc: e.currentSrc,
          sessionVideoId: o,
          canTrack: pe,
          videoType: he,
        })
      : e.addEventListener("loadstart", () => {
          t({
            currentSrc: e.currentSrc,
            sessionVideoId: o,
            canTrack: pe,
            videoType: he,
          });
        }),
      (function (e) {
        return e.currentSrc && e.currentSrc.includes(ye);
      })(e) &&
        (e.addEventListener("seeked", h),
        e.addEventListener("timeupdate", y),
        window.addEventListener("beforeunload", () => {
          d(!0);
        }),
        e.readyState < de
          ? (e.addEventListener(le, f), e.addEventListener(fe, p))
          : (f(), p()));
  }
  const _e = "video";
  e(function () {
    n(_e, (e) => {
      me(Object.assign({ video: e }, ae));
    });
  });
  const ge = "youtube",
    we = {
      trackCreated(e) {
        const t = J();
        return W.produce({
          schemaId: "online_store_media_video_created/4.0",
          payload: Object.assign(Object.assign({}, t), e),
        });
      },
    };
  let be = 0;
  function Ee({ videoType: e, querySelector: t, determineCanTrack: r }) {
    n(t, (t) => {
      const n = t;
      let o = !0;
      r && (o = r(n)),
        (function ({
          videoType: e,
          videoIframe: t,
          trackCreated: r,
          canTrack: n,
        }) {
          const o = be++;
          r({
            currentSrc: t.src,
            sessionVideoId: o,
            canTrack: n,
            videoType: e,
          });
        })(Object.assign({ videoType: e, videoIframe: n, canTrack: o }, we));
    });
  }
  const Te = 'iframe[src^="https://www.youtube.com/embed/"]';
  e(function () {
    Ee({
      querySelector: Te,
      videoType: ge,
      determineCanTrack(e) {
        return !!(t = e.src) && t.split("?").pop().includes("enablejsapi=1");
        var t;
      },
    });
  });
  const Oe = "vimeo",
    Me = 'iframe[src^="https://player.vimeo.com/video/"]';
  e(function () {
    Ee({ querySelector: Me, videoType: Oe });
  });
})();
//# sourceMappingURL=analytics.js.map
