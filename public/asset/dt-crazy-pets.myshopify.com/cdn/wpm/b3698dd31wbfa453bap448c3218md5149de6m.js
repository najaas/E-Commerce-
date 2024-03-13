(() => {
  var e = {
      856: function (e, t, n) {
        var o, i, r;
        !(function (s, a) {
          "use strict";
          (i = [n(652)]),
            void 0 ===
              (r =
                "function" ==
                typeof (o = function (e) {
                  var t = /(^|@)\S+:\d+/,
                    n = /^\s*at .*(\S+:\d+|\(native\))/m,
                    o = /^(eval@)?(\[native code])?$/;
                  return {
                    parse: function (e) {
                      if (
                        void 0 !== e.stacktrace ||
                        void 0 !== e["opera#sourceloc"]
                      )
                        return this.parseOpera(e);
                      if (e.stack && e.stack.match(n))
                        return this.parseV8OrIE(e);
                      if (e.stack) return this.parseFFOrSafari(e);
                      throw new Error("Cannot parse given Error object");
                    },
                    extractLocation: function (e) {
                      if (-1 === e.indexOf(":")) return [e];
                      var t = /(.+?)(?::(\d+))?(?::(\d+))?$/.exec(
                        e.replace(/[()]/g, "")
                      );
                      return [t[1], t[2] || void 0, t[3] || void 0];
                    },
                    parseV8OrIE: function (t) {
                      return t.stack
                        .split("\n")
                        .filter(function (e) {
                          return !!e.match(n);
                        }, this)
                        .map(function (t) {
                          t.indexOf("(eval ") > -1 &&
                            (t = t
                              .replace(/eval code/g, "eval")
                              .replace(/(\(eval at [^()]*)|(,.*$)/g, ""));
                          var n = t
                              .replace(/^\s+/, "")
                              .replace(/\(eval code/g, "(")
                              .replace(/^.*?\s+/, ""),
                            o = n.match(/ (\(.+\)$)/);
                          n = o ? n.replace(o[0], "") : n;
                          var i = this.extractLocation(o ? o[1] : n),
                            r = (o && n) || void 0,
                            s =
                              ["eval", "<anonymous>"].indexOf(i[0]) > -1
                                ? void 0
                                : i[0];
                          return new e({
                            functionName: r,
                            fileName: s,
                            lineNumber: i[1],
                            columnNumber: i[2],
                            source: t,
                          });
                        }, this);
                    },
                    parseFFOrSafari: function (t) {
                      return t.stack
                        .split("\n")
                        .filter(function (e) {
                          return !e.match(o);
                        }, this)
                        .map(function (t) {
                          if (
                            (t.indexOf(" > eval") > -1 &&
                              (t = t.replace(
                                / line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g,
                                ":$1"
                              )),
                            -1 === t.indexOf("@") && -1 === t.indexOf(":"))
                          )
                            return new e({ functionName: t });
                          var n = /((.*".+"[^@]*)?[^@]*)(?:@)/,
                            o = t.match(n),
                            i = o && o[1] ? o[1] : void 0,
                            r = this.extractLocation(t.replace(n, ""));
                          return new e({
                            functionName: i,
                            fileName: r[0],
                            lineNumber: r[1],
                            columnNumber: r[2],
                            source: t,
                          });
                        }, this);
                    },
                    parseOpera: function (e) {
                      return !e.stacktrace ||
                        (e.message.indexOf("\n") > -1 &&
                          e.message.split("\n").length >
                            e.stacktrace.split("\n").length)
                        ? this.parseOpera9(e)
                        : e.stack
                        ? this.parseOpera11(e)
                        : this.parseOpera10(e);
                    },
                    parseOpera9: function (t) {
                      for (
                        var n = /Line (\d+).*script (?:in )?(\S+)/i,
                          o = t.message.split("\n"),
                          i = [],
                          r = 2,
                          s = o.length;
                        r < s;
                        r += 2
                      ) {
                        var a = n.exec(o[r]);
                        a &&
                          i.push(
                            new e({
                              fileName: a[2],
                              lineNumber: a[1],
                              source: o[r],
                            })
                          );
                      }
                      return i;
                    },
                    parseOpera10: function (t) {
                      for (
                        var n =
                            /Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i,
                          o = t.stacktrace.split("\n"),
                          i = [],
                          r = 0,
                          s = o.length;
                        r < s;
                        r += 2
                      ) {
                        var a = n.exec(o[r]);
                        a &&
                          i.push(
                            new e({
                              functionName: a[3] || void 0,
                              fileName: a[2],
                              lineNumber: a[1],
                              source: o[r],
                            })
                          );
                      }
                      return i;
                    },
                    parseOpera11: function (n) {
                      return n.stack
                        .split("\n")
                        .filter(function (e) {
                          return !!e.match(t) && !e.match(/^Error created at/);
                        }, this)
                        .map(function (t) {
                          var n,
                            o = t.split("@"),
                            i = this.extractLocation(o.pop()),
                            r = o.shift() || "",
                            s =
                              r
                                .replace(/<anonymous function(: (\w+))?>/, "$2")
                                .replace(/\([^)]*\)/g, "") || void 0;
                          r.match(/\(([^)]*)\)/) &&
                            (n = r.replace(/^[^(]+\(([^)]*)\)$/, "$1"));
                          var a =
                            void 0 === n || "[arguments not available]" === n
                              ? void 0
                              : n.split(",");
                          return new e({
                            functionName: s,
                            args: a,
                            fileName: i[0],
                            lineNumber: i[1],
                            columnNumber: i[2],
                            source: t,
                          });
                        }, this);
                    },
                  };
                })
                  ? o.apply(t, i)
                  : o) || (e.exports = r);
        })();
      },
      652: function (e, t) {
        var n, o, i;
        !(function (r, s) {
          "use strict";
          (o = []),
            void 0 ===
              (i =
                "function" ==
                typeof (n = function () {
                  function e(e) {
                    return e.charAt(0).toUpperCase() + e.substring(1);
                  }
                  function t(e) {
                    return function () {
                      return this[e];
                    };
                  }
                  var n = ["isConstructor", "isEval", "isNative", "isToplevel"],
                    o = ["columnNumber", "lineNumber"],
                    i = ["fileName", "functionName", "source"],
                    r = n.concat(o, i, ["args"], ["evalOrigin"]);
                  function s(t) {
                    if (t)
                      for (var n = 0; n < r.length; n++)
                        void 0 !== t[r[n]] && this["set" + e(r[n])](t[r[n]]);
                  }
                  (s.prototype = {
                    getArgs: function () {
                      return this.args;
                    },
                    setArgs: function (e) {
                      if (
                        "[object Array]" !== Object.prototype.toString.call(e)
                      )
                        throw new TypeError("Args must be an Array");
                      this.args = e;
                    },
                    getEvalOrigin: function () {
                      return this.evalOrigin;
                    },
                    setEvalOrigin: function (e) {
                      if (e instanceof s) this.evalOrigin = e;
                      else {
                        if (!(e instanceof Object))
                          throw new TypeError(
                            "Eval Origin must be an Object or StackFrame"
                          );
                        this.evalOrigin = new s(e);
                      }
                    },
                    toString: function () {
                      var e = this.getFileName() || "",
                        t = this.getLineNumber() || "",
                        n = this.getColumnNumber() || "",
                        o = this.getFunctionName() || "";
                      return this.getIsEval()
                        ? e
                          ? "[eval] (" + e + ":" + t + ":" + n + ")"
                          : "[eval]:" + t + ":" + n
                        : o
                        ? o + " (" + e + ":" + t + ":" + n + ")"
                        : e + ":" + t + ":" + n;
                    },
                  }),
                    (s.fromString = function (e) {
                      var t = e.indexOf("("),
                        n = e.lastIndexOf(")"),
                        o = e.substring(0, t),
                        i = e.substring(t + 1, n).split(","),
                        r = e.substring(n + 1);
                      if (0 === r.indexOf("@"))
                        var a = /@(.+?)(?::(\d+))?(?::(\d+))?$/.exec(r, ""),
                          c = a[1],
                          l = a[2],
                          u = a[3];
                      return new s({
                        functionName: o,
                        args: i || void 0,
                        fileName: c,
                        lineNumber: l || void 0,
                        columnNumber: u || void 0,
                      });
                    });
                  for (var a = 0; a < n.length; a++)
                    (s.prototype["get" + e(n[a])] = t(n[a])),
                      (s.prototype["set" + e(n[a])] = (function (e) {
                        return function (t) {
                          this[e] = Boolean(t);
                        };
                      })(n[a]));
                  for (var c = 0; c < o.length; c++)
                    (s.prototype["get" + e(o[c])] = t(o[c])),
                      (s.prototype["set" + e(o[c])] = (function (e) {
                        return function (t) {
                          if (((n = t), isNaN(parseFloat(n)) || !isFinite(n)))
                            throw new TypeError(e + " must be a Number");
                          var n;
                          this[e] = Number(t);
                        };
                      })(o[c]));
                  for (var l = 0; l < i.length; l++)
                    (s.prototype["get" + e(i[l])] = t(i[l])),
                      (s.prototype["set" + e(i[l])] = (function (e) {
                        return function (t) {
                          this[e] = String(t);
                        };
                      })(i[l]));
                  return s;
                })
                  ? n.apply(t, o)
                  : n) || (e.exports = i);
        })();
      },
      332: function (e, t, n) {
        var o;
        !(function (i, r) {
          "use strict";
          var s = "function",
            a = "undefined",
            c = "object",
            l = "string",
            u = "major",
            d = "model",
            p = "name",
            f = "type",
            m = "vendor",
            h = "version",
            b = "architecture",
            w = "console",
            v = "mobile",
            g = "tablet",
            y = "smarttv",
            x = "wearable",
            k = "embedded",
            _ = "Amazon",
            E = "Apple",
            C = "ASUS",
            S = "BlackBerry",
            A = "Browser",
            I = "Chrome",
            O = "Firefox",
            N = "Google",
            T = "Huawei",
            P = "LG",
            R = "Microsoft",
            D = "Motorola",
            L = "Opera",
            $ = "Samsung",
            M = "Sharp",
            j = "Sony",
            U = "Xiaomi",
            V = "Zebra",
            B = "Facebook",
            z = "Chromium OS",
            q = "Mac OS",
            F = function (e) {
              for (var t = {}, n = 0; n < e.length; n++)
                t[e[n].toUpperCase()] = e[n];
              return t;
            },
            K = function (e, t) {
              return typeof e === l && -1 !== W(t).indexOf(W(e));
            },
            W = function (e) {
              return e.toLowerCase();
            },
            X = function (e, t) {
              if (typeof e === l)
                return (
                  (e = e.replace(/^\s\s*/, "")),
                  typeof t === a ? e : e.substring(0, 350)
                );
            },
            G = function (e, t) {
              for (var n, o, i, a, l, u, d = 0; d < t.length && !l; ) {
                var p = t[d],
                  f = t[d + 1];
                for (n = o = 0; n < p.length && !l && p[n]; )
                  if ((l = p[n++].exec(e)))
                    for (i = 0; i < f.length; i++)
                      (u = l[++o]),
                        typeof (a = f[i]) === c && a.length > 0
                          ? 2 === a.length
                            ? typeof a[1] == s
                              ? (this[a[0]] = a[1].call(this, u))
                              : (this[a[0]] = a[1])
                            : 3 === a.length
                            ? typeof a[1] !== s || (a[1].exec && a[1].test)
                              ? (this[a[0]] = u ? u.replace(a[1], a[2]) : r)
                              : (this[a[0]] = u ? a[1].call(this, u, a[2]) : r)
                            : 4 === a.length &&
                              (this[a[0]] = u
                                ? a[3].call(this, u.replace(a[1], a[2]))
                                : r)
                          : (this[a] = u || r);
                d += 2;
              }
            },
            H = function (e, t) {
              for (var n in t)
                if (typeof t[n] === c && t[n].length > 0) {
                  for (var o = 0; o < t[n].length; o++)
                    if (K(t[n][o], e)) return "?" === n ? r : n;
                } else if (K(t[n], e)) return "?" === n ? r : n;
              return e;
            },
            Y = {
              ME: "4.90",
              "NT 3.11": "NT3.51",
              "NT 4.0": "NT4.0",
              2e3: "NT 5.0",
              XP: ["NT 5.1", "NT 5.2"],
              Vista: "NT 6.0",
              7: "NT 6.1",
              8: "NT 6.2",
              8.1: "NT 6.3",
              10: ["NT 6.4", "NT 10.0"],
              RT: "ARM",
            },
            J = {
              browser: [
                [/\b(?:crmo|crios)\/([\w\.]+)/i],
                [h, [p, "Chrome"]],
                [/edg(?:e|ios|a)?\/([\w\.]+)/i],
                [h, [p, "Edge"]],
                [
                  /(opera mini)\/([-\w\.]+)/i,
                  /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i,
                  /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i,
                ],
                [p, h],
                [/opios[\/ ]+([\w\.]+)/i],
                [h, [p, L + " Mini"]],
                [/\bopr\/([\w\.]+)/i],
                [h, [p, L]],
                [
                  /(kindle)\/([\w\.]+)/i,
                  /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i,
                  /(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i,
                  /(ba?idubrowser)[\/ ]?([\w\.]+)/i,
                  /(?:ms|\()(ie) ([\w\.]+)/i,
                  /(flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i,
                  /(heytap|ovi)browser\/([\d\.]+)/i,
                  /(weibo)__([\d\.]+)/i,
                ],
                [p, h],
                [/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i],
                [h, [p, "UC" + A]],
                [
                  /microm.+\bqbcore\/([\w\.]+)/i,
                  /\bqbcore\/([\w\.]+).+microm/i,
                ],
                [h, [p, "WeChat(Win) Desktop"]],
                [/micromessenger\/([\w\.]+)/i],
                [h, [p, "WeChat"]],
                [/konqueror\/([\w\.]+)/i],
                [h, [p, "Konqueror"]],
                [/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i],
                [h, [p, "IE"]],
                [/ya(?:search)?browser\/([\w\.]+)/i],
                [h, [p, "Yandex"]],
                [/(avast|avg)\/([\w\.]+)/i],
                [[p, /(.+)/, "$1 Secure " + A], h],
                [/\bfocus\/([\w\.]+)/i],
                [h, [p, O + " Focus"]],
                [/\bopt\/([\w\.]+)/i],
                [h, [p, L + " Touch"]],
                [/coc_coc\w+\/([\w\.]+)/i],
                [h, [p, "Coc Coc"]],
                [/dolfin\/([\w\.]+)/i],
                [h, [p, "Dolphin"]],
                [/coast\/([\w\.]+)/i],
                [h, [p, L + " Coast"]],
                [/miuibrowser\/([\w\.]+)/i],
                [h, [p, "MIUI " + A]],
                [/fxios\/([-\w\.]+)/i],
                [h, [p, O]],
                [/\bqihu|(qi?ho?o?|360)browser/i],
                [[p, "360 " + A]],
                [/(oculus|samsung|sailfish|huawei)browser\/([\w\.]+)/i],
                [[p, /(.+)/, "$1 " + A], h],
                [/(comodo_dragon)\/([\w\.]+)/i],
                [[p, /_/g, " "], h],
                [
                  /(electron)\/([\w\.]+) safari/i,
                  /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i,
                  /m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i,
                ],
                [p, h],
                [
                  /(metasr)[\/ ]?([\w\.]+)/i,
                  /(lbbrowser)/i,
                  /\[(linkedin)app\]/i,
                ],
                [p],
                [/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i],
                [[p, B], h],
                [
                  /(kakao(?:talk|story))[\/ ]([\w\.]+)/i,
                  /(naver)\(.*?(\d+\.[\w\.]+).*\)/i,
                  /safari (line)\/([\w\.]+)/i,
                  /\b(line)\/([\w\.]+)\/iab/i,
                  /(chromium|instagram|snapchat)[\/ ]([-\w\.]+)/i,
                ],
                [p, h],
                [/\bgsa\/([\w\.]+) .*safari\//i],
                [h, [p, "GSA"]],
                [/musical_ly(?:.+app_?version\/|_)([\w\.]+)/i],
                [h, [p, "TikTok"]],
                [/headlesschrome(?:\/([\w\.]+)| )/i],
                [h, [p, I + " Headless"]],
                [/ wv\).+(chrome)\/([\w\.]+)/i],
                [[p, I + " WebView"], h],
                [/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i],
                [h, [p, "Android " + A]],
                [/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i],
                [p, h],
                [/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i],
                [h, [p, "Mobile Safari"]],
                [/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i],
                [h, p],
                [/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i],
                [
                  p,
                  [
                    h,
                    H,
                    {
                      "1.0": "/8",
                      1.2: "/1",
                      1.3: "/3",
                      "2.0": "/412",
                      "2.0.2": "/416",
                      "2.0.3": "/417",
                      "2.0.4": "/419",
                      "?": "/",
                    },
                  ],
                ],
                [/(webkit|khtml)\/([\w\.]+)/i],
                [p, h],
                [/(navigator|netscape\d?)\/([-\w\.]+)/i],
                [[p, "Netscape"], h],
                [/mobile vr; rv:([\w\.]+)\).+firefox/i],
                [h, [p, O + " Reality"]],
                [
                  /ekiohf.+(flow)\/([\w\.]+)/i,
                  /(swiftfox)/i,
                  /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i,
                  /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i,
                  /(firefox)\/([\w\.]+)/i,
                  /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i,
                  /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i,
                  /(links) \(([\w\.]+)/i,
                  /panasonic;(viera)/i,
                ],
                [p, h],
                [/(cobalt)\/([\w\.]+)/i],
                [p, [h, /master.|lts./, ""]],
              ],
              cpu: [
                [/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i],
                [[b, "amd64"]],
                [/(ia32(?=;))/i],
                [[b, W]],
                [/((?:i[346]|x)86)[;\)]/i],
                [[b, "ia32"]],
                [/\b(aarch64|arm(v?8e?l?|_?64))\b/i],
                [[b, "arm64"]],
                [/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i],
                [[b, "armhf"]],
                [/windows (ce|mobile); ppc;/i],
                [[b, "arm"]],
                [/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i],
                [[b, /ower/, "", W]],
                [/(sun4\w)[;\)]/i],
                [[b, "sparc"]],
                [
                  /((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i,
                ],
                [[b, W]],
              ],
              device: [
                [
                  /\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i,
                ],
                [d, [m, $], [f, g]],
                [
                  /\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i,
                  /samsung[- ]([-\w]+)/i,
                  /sec-(sgh\w+)/i,
                ],
                [d, [m, $], [f, v]],
                [/(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i],
                [d, [m, E], [f, v]],
                [
                  /\((ipad);[-\w\),; ]+apple/i,
                  /applecoremedia\/[\w\.]+ \((ipad)/i,
                  /\b(ipad)\d\d?,\d\d?[;\]].+ios/i,
                ],
                [d, [m, E], [f, g]],
                [/(macintosh);/i],
                [d, [m, E]],
                [/\b(sh-?[altvz]?\d\d[a-ekm]?)/i],
                [d, [m, M], [f, v]],
                [/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i],
                [d, [m, T], [f, g]],
                [
                  /(?:huawei|honor)([-\w ]+)[;\)]/i,
                  /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i,
                ],
                [d, [m, T], [f, v]],
                [
                  /\b(poco[\w ]+|m2\d{3}j\d\d[a-z]{2})(?: bui|\))/i,
                  /\b; (\w+) build\/hm\1/i,
                  /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i,
                  /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i,
                  /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i,
                ],
                [
                  [d, /_/g, " "],
                  [m, U],
                  [f, v],
                ],
                [/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i],
                [
                  [d, /_/g, " "],
                  [m, U],
                  [f, g],
                ],
                [
                  /; (\w+) bui.+ oppo/i,
                  /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i,
                ],
                [d, [m, "OPPO"], [f, v]],
                [/vivo (\w+)(?: bui|\))/i, /\b(v[12]\d{3}\w?[at])(?: bui|;)/i],
                [d, [m, "Vivo"], [f, v]],
                [/\b(rmx[12]\d{3})(?: bui|;|\))/i],
                [d, [m, "Realme"], [f, v]],
                [
                  /\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i,
                  /\bmot(?:orola)?[- ](\w*)/i,
                  /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i,
                ],
                [d, [m, D], [f, v]],
                [/\b(mz60\d|xoom[2 ]{0,2}) build\//i],
                [d, [m, D], [f, g]],
                [
                  /((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i,
                ],
                [d, [m, P], [f, g]],
                [
                  /(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i,
                  /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i,
                  /\blg-?([\d\w]+) bui/i,
                ],
                [d, [m, P], [f, v]],
                [
                  /(ideatab[-\w ]+)/i,
                  /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i,
                ],
                [d, [m, "Lenovo"], [f, g]],
                [
                  /(?:maemo|nokia).*(n900|lumia \d+)/i,
                  /nokia[-_ ]?([-\w\.]*)/i,
                ],
                [
                  [d, /_/g, " "],
                  [m, "Nokia"],
                  [f, v],
                ],
                [/(pixel c)\b/i],
                [d, [m, N], [f, g]],
                [/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i],
                [d, [m, N], [f, v]],
                [
                  /droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i,
                ],
                [d, [m, j], [f, v]],
                [/sony tablet [ps]/i, /\b(?:sony)?sgp\w+(?: bui|\))/i],
                [
                  [d, "Xperia Tablet"],
                  [m, j],
                  [f, g],
                ],
                [
                  / (kb2005|in20[12]5|be20[12][59])\b/i,
                  /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i,
                ],
                [d, [m, "OnePlus"], [f, v]],
                [
                  /(alexa)webm/i,
                  /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i,
                  /(kf[a-z]+)( bui|\)).+silk\//i,
                ],
                [d, [m, _], [f, g]],
                [/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i],
                [
                  [d, /(.+)/g, "Fire Phone $1"],
                  [m, _],
                  [f, v],
                ],
                [/(playbook);[-\w\),; ]+(rim)/i],
                [d, m, [f, g]],
                [/\b((?:bb[a-f]|st[hv])100-\d)/i, /\(bb10; (\w+)/i],
                [d, [m, S], [f, v]],
                [
                  /(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i,
                ],
                [d, [m, C], [f, g]],
                [/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i],
                [d, [m, C], [f, v]],
                [/(nexus 9)/i],
                [d, [m, "HTC"], [f, g]],
                [
                  /(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i,
                  /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i,
                  /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i,
                ],
                [m, [d, /_/g, " "], [f, v]],
                [/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i],
                [d, [m, "Acer"], [f, g]],
                [/droid.+; (m[1-5] note) bui/i, /\bmz-([-\w]{2,})/i],
                [d, [m, "Meizu"], [f, v]],
                [
                  /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron|infinix|tecno)[-_ ]?([-\w]*)/i,
                  /(hp) ([\w ]+\w)/i,
                  /(asus)-?(\w+)/i,
                  /(microsoft); (lumia[\w ]+)/i,
                  /(lenovo)[-_ ]?([-\w]+)/i,
                  /(jolla)/i,
                  /(oppo) ?([\w ]+) bui/i,
                ],
                [m, d, [f, v]],
                [
                  /(kobo)\s(ereader|touch)/i,
                  /(archos) (gamepad2?)/i,
                  /(hp).+(touchpad(?!.+tablet)|tablet)/i,
                  /(kindle)\/([\w\.]+)/i,
                  /(nook)[\w ]+build\/(\w+)/i,
                  /(dell) (strea[kpr\d ]*[\dko])/i,
                  /(le[- ]+pan)[- ]+(\w{1,9}) bui/i,
                  /(trinity)[- ]*(t\d{3}) bui/i,
                  /(gigaset)[- ]+(q\w{1,9}) bui/i,
                  /(vodafone) ([\w ]+)(?:\)| bui)/i,
                ],
                [m, d, [f, g]],
                [/(surface duo)/i],
                [d, [m, R], [f, g]],
                [/droid [\d\.]+; (fp\du?)(?: b|\))/i],
                [d, [m, "Fairphone"], [f, v]],
                [/(u304aa)/i],
                [d, [m, "AT&T"], [f, v]],
                [/\bsie-(\w*)/i],
                [d, [m, "Siemens"], [f, v]],
                [/\b(rct\w+) b/i],
                [d, [m, "RCA"], [f, g]],
                [/\b(venue[\d ]{2,7}) b/i],
                [d, [m, "Dell"], [f, g]],
                [/\b(q(?:mv|ta)\w+) b/i],
                [d, [m, "Verizon"], [f, g]],
                [/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i],
                [d, [m, "Barnes & Noble"], [f, g]],
                [/\b(tm\d{3}\w+) b/i],
                [d, [m, "NuVision"], [f, g]],
                [/\b(k88) b/i],
                [d, [m, "ZTE"], [f, g]],
                [/\b(nx\d{3}j) b/i],
                [d, [m, "ZTE"], [f, v]],
                [/\b(gen\d{3}) b.+49h/i],
                [d, [m, "Swiss"], [f, v]],
                [/\b(zur\d{3}) b/i],
                [d, [m, "Swiss"], [f, g]],
                [/\b((zeki)?tb.*\b) b/i],
                [d, [m, "Zeki"], [f, g]],
                [/\b([yr]\d{2}) b/i, /\b(dragon[- ]+touch |dt)(\w{5}) b/i],
                [[m, "Dragon Touch"], d, [f, g]],
                [/\b(ns-?\w{0,9}) b/i],
                [d, [m, "Insignia"], [f, g]],
                [/\b((nxa|next)-?\w{0,9}) b/i],
                [d, [m, "NextBook"], [f, g]],
                [/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i],
                [[m, "Voice"], d, [f, v]],
                [/\b(lvtel\-)?(v1[12]) b/i],
                [[m, "LvTel"], d, [f, v]],
                [/\b(ph-1) /i],
                [d, [m, "Essential"], [f, v]],
                [/\b(v(100md|700na|7011|917g).*\b) b/i],
                [d, [m, "Envizen"], [f, g]],
                [/\b(trio[-\w\. ]+) b/i],
                [d, [m, "MachSpeed"], [f, g]],
                [/\btu_(1491) b/i],
                [d, [m, "Rotor"], [f, g]],
                [/(shield[\w ]+) b/i],
                [d, [m, "Nvidia"], [f, g]],
                [/(sprint) (\w+)/i],
                [m, d, [f, v]],
                [/(kin\.[onetw]{3})/i],
                [
                  [d, /\./g, " "],
                  [m, R],
                  [f, v],
                ],
                [/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i],
                [d, [m, V], [f, g]],
                [/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i],
                [d, [m, V], [f, v]],
                [/smart-tv.+(samsung)/i],
                [m, [f, y]],
                [/hbbtv.+maple;(\d+)/i],
                [
                  [d, /^/, "SmartTV"],
                  [m, $],
                  [f, y],
                ],
                [/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i],
                [
                  [m, P],
                  [f, y],
                ],
                [/(apple) ?tv/i],
                [m, [d, E + " TV"], [f, y]],
                [/crkey/i],
                [
                  [d, I + "cast"],
                  [m, N],
                  [f, y],
                ],
                [/droid.+aft(\w+)( bui|\))/i],
                [d, [m, _], [f, y]],
                [/\(dtv[\);].+(aquos)/i, /(aquos-tv[\w ]+)\)/i],
                [d, [m, M], [f, y]],
                [/(bravia[\w ]+)( bui|\))/i],
                [d, [m, j], [f, y]],
                [/(mitv-\w{5}) bui/i],
                [d, [m, U], [f, y]],
                [/Hbbtv.*(technisat) (.*);/i],
                [m, d, [f, y]],
                [
                  /\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i,
                  /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i,
                ],
                [
                  [m, X],
                  [d, X],
                  [f, y],
                ],
                [/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i],
                [[f, y]],
                [/(ouya)/i, /(nintendo) ([wids3utch]+)/i],
                [m, d, [f, w]],
                [/droid.+; (shield) bui/i],
                [d, [m, "Nvidia"], [f, w]],
                [/(playstation [345portablevi]+)/i],
                [d, [m, j], [f, w]],
                [/\b(xbox(?: one)?(?!; xbox))[\); ]/i],
                [d, [m, R], [f, w]],
                [/((pebble))app/i],
                [m, d, [f, x]],
                [/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i],
                [d, [m, E], [f, x]],
                [/droid.+; (glass) \d/i],
                [d, [m, N], [f, x]],
                [/droid.+; (wt63?0{2,3})\)/i],
                [d, [m, V], [f, x]],
                [/(quest( 2| pro)?)/i],
                [d, [m, B], [f, x]],
                [/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i],
                [m, [f, k]],
                [/(aeobc)\b/i],
                [d, [m, _], [f, k]],
                [/droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i],
                [d, [f, v]],
                [/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i],
                [d, [f, g]],
                [/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i],
                [[f, g]],
                [
                  /(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i,
                ],
                [[f, v]],
                [/(android[-\w\. ]{0,9});.+buil/i],
                [d, [m, "Generic"]],
              ],
              engine: [
                [/windows.+ edge\/([\w\.]+)/i],
                [h, [p, "EdgeHTML"]],
                [/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i],
                [h, [p, "Blink"]],
                [
                  /(presto)\/([\w\.]+)/i,
                  /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i,
                  /ekioh(flow)\/([\w\.]+)/i,
                  /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i,
                  /(icab)[\/ ]([23]\.[\d\.]+)/i,
                  /\b(libweb)/i,
                ],
                [p, h],
                [/rv\:([\w\.]{1,9})\b.+(gecko)/i],
                [h, p],
              ],
              os: [
                [/microsoft (windows) (vista|xp)/i],
                [p, h],
                [
                  /(windows) nt 6\.2; (arm)/i,
                  /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i,
                  /(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i,
                ],
                [p, [h, H, Y]],
                [/(win(?=3|9|n)|win 9x )([nt\d\.]+)/i],
                [
                  [p, "Windows"],
                  [h, H, Y],
                ],
                [
                  /ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i,
                  /(?:ios;fbsv\/|iphone.+ios[\/ ])([\d\.]+)/i,
                  /cfnetwork\/.+darwin/i,
                ],
                [
                  [h, /_/g, "."],
                  [p, "iOS"],
                ],
                [
                  /(mac os x) ?([\w\. ]*)/i,
                  /(macintosh|mac_powerpc\b)(?!.+haiku)/i,
                ],
                [
                  [p, q],
                  [h, /_/g, "."],
                ],
                [/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i],
                [h, p],
                [
                  /(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i,
                  /(blackberry)\w*\/([\w\.]*)/i,
                  /(tizen|kaios)[\/ ]([\w\.]+)/i,
                  /\((series40);/i,
                ],
                [p, h],
                [/\(bb(10);/i],
                [h, [p, S]],
                [/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i],
                [h, [p, "Symbian"]],
                [
                  /mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i,
                ],
                [h, [p, O + " OS"]],
                [/web0s;.+rt(tv)/i, /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i],
                [h, [p, "webOS"]],
                [/watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i],
                [h, [p, "watchOS"]],
                [/crkey\/([\d\.]+)/i],
                [h, [p, I + "cast"]],
                [/(cros) [\w]+(?:\)| ([\w\.]+)\b)/i],
                [[p, z], h],
                [
                  /panasonic;(viera)/i,
                  /(netrange)mmh/i,
                  /(nettv)\/(\d+\.[\w\.]+)/i,
                  /(nintendo|playstation) ([wids345portablevuch]+)/i,
                  /(xbox); +xbox ([^\);]+)/i,
                  /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i,
                  /(mint)[\/\(\) ]?(\w*)/i,
                  /(mageia|vectorlinux)[; ]/i,
                  /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i,
                  /(hurd|linux) ?([\w\.]*)/i,
                  /(gnu) ?([\w\.]*)/i,
                  /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i,
                  /(haiku) (\w+)/i,
                ],
                [p, h],
                [/(sunos) ?([\w\.\d]*)/i],
                [[p, "Solaris"], h],
                [
                  /((?:open)?solaris)[-\/ ]?([\w\.]*)/i,
                  /(aix) ((\d)(?=\.|\)| )[\w\.])*/i,
                  /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i,
                  /(unix) ?([\w\.]*)/i,
                ],
                [p, h],
              ],
            },
            Z = function (e, t) {
              if ((typeof e === c && ((t = e), (e = r)), !(this instanceof Z)))
                return new Z(e, t).getResult();
              var n = typeof i !== a && i.navigator ? i.navigator : r,
                o = e || (n && n.userAgent ? n.userAgent : ""),
                w = n && n.userAgentData ? n.userAgentData : r,
                y = t
                  ? (function (e, t) {
                      var n = {};
                      for (var o in e)
                        t[o] && t[o].length % 2 == 0
                          ? (n[o] = t[o].concat(e[o]))
                          : (n[o] = e[o]);
                      return n;
                    })(J, t)
                  : J,
                x = n && n.userAgent == o;
              return (
                (this.getBrowser = function () {
                  var e,
                    t = {};
                  return (
                    (t[p] = r),
                    (t[h] = r),
                    G.call(t, o, y.browser),
                    (t[u] =
                      typeof (e = t[h]) === l
                        ? e.replace(/[^\d\.]/g, "").split(".")[0]
                        : r),
                    x &&
                      n &&
                      n.brave &&
                      typeof n.brave.isBrave == s &&
                      (t[p] = "Brave"),
                    t
                  );
                }),
                (this.getCPU = function () {
                  var e = {};
                  return (e[b] = r), G.call(e, o, y.cpu), e;
                }),
                (this.getDevice = function () {
                  var e = {};
                  return (
                    (e[m] = r),
                    (e[d] = r),
                    (e[f] = r),
                    G.call(e, o, y.device),
                    x && !e[f] && w && w.mobile && (e[f] = v),
                    x &&
                      "Macintosh" == e[d] &&
                      n &&
                      typeof n.standalone !== a &&
                      n.maxTouchPoints &&
                      n.maxTouchPoints > 2 &&
                      ((e[d] = "iPad"), (e[f] = g)),
                    e
                  );
                }),
                (this.getEngine = function () {
                  var e = {};
                  return (e[p] = r), (e[h] = r), G.call(e, o, y.engine), e;
                }),
                (this.getOS = function () {
                  var e = {};
                  return (
                    (e[p] = r),
                    (e[h] = r),
                    G.call(e, o, y.os),
                    x &&
                      !e[p] &&
                      w &&
                      "Unknown" != w.platform &&
                      (e[p] = w.platform
                        .replace(/chrome os/i, z)
                        .replace(/macos/i, q)),
                    e
                  );
                }),
                (this.getResult = function () {
                  return {
                    ua: this.getUA(),
                    browser: this.getBrowser(),
                    engine: this.getEngine(),
                    os: this.getOS(),
                    device: this.getDevice(),
                    cpu: this.getCPU(),
                  };
                }),
                (this.getUA = function () {
                  return o;
                }),
                (this.setUA = function (e) {
                  return (
                    (o = typeof e === l && e.length > 350 ? X(e, 350) : e), this
                  );
                }),
                this.setUA(o),
                this
              );
            };
          (Z.VERSION = "1.0.36"),
            (Z.BROWSER = F([p, h, u])),
            (Z.CPU = F([b])),
            (Z.DEVICE = F([d, m, f, w, v, y, g, x, k])),
            (Z.ENGINE = Z.OS = F([p, h])),
            typeof t !== a
              ? (e.exports && (t = e.exports = Z), (t.UAParser = Z))
              : n.amdO
              ? (o = function () {
                  return Z;
                }.call(t, n, t, e)) === r || (e.exports = o)
              : typeof i !== a && (i.UAParser = Z);
          var Q = typeof i !== a && (i.jQuery || i.Zepto);
          if (Q && !Q.ua) {
            var ee = new Z();
            (Q.ua = ee.getResult()),
              (Q.ua.get = function () {
                return ee.getUA();
              }),
              (Q.ua.set = function (e) {
                ee.setUA(e);
                var t = ee.getResult();
                for (var n in t) Q.ua[n] = t[n];
              });
          }
        })("object" == typeof window ? window : this);
      },
    },
    t = {};
  function n(o) {
    var i = t[o];
    if (void 0 !== i) return i.exports;
    var r = (t[o] = { exports: {} });
    return e[o].call(r.exports, r, r.exports, n), r.exports;
  }
  (n.amdO = {}),
    (n.n = (e) => {
      var t = e && e.__esModule ? () => e.default : () => e;
      return n.d(t, { a: t }), t;
    }),
    (n.d = (e, t) => {
      for (var o in t)
        n.o(t, o) &&
          !n.o(e, o) &&
          Object.defineProperty(e, o, { enumerable: !0, get: t[o] });
    }),
    (n.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
    (() => {
      "use strict";
      const e = "webPixelsManager",
        t = "production",
        o = "0.0.444",
        i = "modern",
        r = "3698dd31wbfa453bap448c3218md5149de6",
        s = "b3698dd31wbfa453bap448c3218md5149de6m.js",
        a = "loggedConversion2",
        c = "WebPixel::Render",
        l = "product_added_to_cart",
        u = "product_removed_from_cart",
        d = "payment_info_submitted";
      function p() {
        return window;
      }
      let f,
        m = "OFF";
      function h(e, t, n) {
        const { jQuery: o } = p();
        o && o(e).bind
          ? o(e).bind(t, n)
          : e.addEventListener && e.addEventListener(t, n);
      }
      function b(e, t) {
        "ON" === m &&
          console &&
          console.warn &&
          console.warn(
            `[pixel_shop_events_listener] Error in ${e}:  ${t.message}`
          );
      }
      function w(e) {
        h(window, "load", () => {
          for (const t of document.forms) e(t);
        });
      }
      function v(e, t, n) {
        if (t.length !== n.length)
          throw Error(
            "Payload body and response have different number of items"
          );
        t.forEach((t, o) => {
          let i = 1;
          try {
            i = parseInt(n[o].quantity, 10) || 1;
          } catch (r) {
            b("handleBulkItemCartAddResponse", r);
          }
          y(e, t, i);
        });
      }
      function g(e, t, n, o, i) {
        const r = (
            (null == (a = null == (c = p()) ? void 0 : c.ShopifyAnalytics)
              ? void 0
              : a.meta) || {}
          ).currency,
          s = {
            id: String("add" === i ? t.id : t.variant_id),
            image: { src: t.image },
            price: { amount: t.presentment_price, currencyCode: r },
            product: {
              id: String(t.product_id),
              title: t.title,
              vendor: t.vendor,
              type: t.product_type,
              untranslatedTitle: t.untranslated_product_title,
              url: t.url,
            },
            sku: t.sku,
            title: t.variant_title,
            untranslatedTitle: t.untranslated_variant_title,
          };
        var a, c;
        e(o, {
          cartLine: {
            cost: {
              totalAmount: { amount: s.price.amount * n, currencyCode: r },
            },
            merchandise: s,
            quantity: n,
          },
        });
      }
      function y(e, t, n, o = "add") {
        g(e, t, n, l, o);
      }
      function x(e, t) {
        const n = t.items_added,
          o = t.items_removed;
        n.forEach((t) => {
          y(e, t, null == t ? void 0 : t.quantity, "change");
        }),
          o.forEach((t) => {
            !(function (e, t, n, o) {
              g(e, t, n, u, "change");
            })(e, t, null == t ? void 0 : t.quantity);
          });
      }
      function k(e) {
        if (!e) return 1;
        try {
          return JSON.parse(e).quantity || 1;
        } catch (t) {
          if (e instanceof FormData) {
            if (e.has("quantity")) return Number(e.get("quantity"));
          } else {
            const t = e.split("&");
            for (const e of t) {
              const t = e.split("=");
              if ("quantity" === t[0]) return Number(t[1]);
            }
          }
        }
        return 1;
      }
      class _ {
        static handleXhrOpen() {}
        static handleXhrDone(e) {
          try {
            const t = document.createElement("a");
            t.href = e.url;
            const n = t.pathname ? t.pathname : e.url;
            _.ADD_TO_CART_REGEX.test(n)
              ? _.parsePayloadResponse(e, (t) => {
                  const n = Object.keys(t);
                  if (1 === n.length && "items" === n[0]) {
                    const n = t.items;
                    let i;
                    try {
                      i = JSON.parse(e.body).items;
                    } catch (o) {
                      i = (function (e, t) {
                        const n = new Array(t);
                        for (let o = 0; o < t; o++) n[o] = {};
                        for (const o of decodeURI(e).split("&")) {
                          const e = o.split("="),
                            t = e[0].match(/items\[(\d+)\]\[(\w+)\].*/);
                          if (t) {
                            const o = Number(t[1]),
                              i = t[2];
                            "quantity" === i
                              ? (n[o].quantity = e[1])
                              : "id" === i && (n[o].id = e[1]);
                          }
                        }
                        return n;
                      })(e.body, n.length);
                    }
                    v(e.publish, n, i);
                  } else y(e.publish, t, k(e.body));
                })
              : _.CHANGE_TO_CART_REGEX.test(n) &&
                _.parsePayloadResponse(e, (t) => {
                  x(e.publish, t);
                });
          } catch (t) {
            b("handleXhrDone", t);
          }
        }
        static parseBlobToJson(e, t) {
          const n = new FileReader();
          n.addEventListener("loadend", () => {
            t(JSON.parse(String.fromCharCode(...new Uint8Array(n.result))));
          }),
            n.readAsArrayBuffer(e);
        }
        static parsePayloadResponse(e, t) {
          e.xhr.response instanceof Blob
            ? _.parseBlobToJson(e.xhr.response, t)
            : e.xhr.responseText && t(JSON.parse(e.xhr.responseText));
        }
        constructor(e, t, n, o, i) {
          (this.oldOnReadyStateChange = void 0),
            (this.xhr = void 0),
            (this.url = void 0),
            (this.method = void 0),
            (this.body = void 0),
            (this.publish = void 0),
            (this.xhr = e),
            (this.url = t),
            (this.method = n),
            (this.body = o),
            (this.publish = i);
        }
        onReadyStateChange() {
          this.xhr.readyState === XMLHttpRequest.DONE &&
            _.handleXhrDone({
              method: this.method,
              url: this.url,
              body: this.body,
              xhr: this.xhr,
              publish: this.publish,
            }),
            this.oldOnReadyStateChange &&
              this.oldOnReadyStateChange.call(
                this.xhr,
                new Event("oldOnReadyStateChange")
              );
        }
      }
      function E(e, t) {
        const n = e.fetch;
        function o(e) {
          b("handleFetchRequest", e);
        }
        "function" == typeof n &&
          (e.fetch = function (...e) {
            return n.apply(this, Array.prototype.slice.call(e)).then((e) => {
              if (!e.ok) return e;
              const n = document.createElement("a");
              n.href = e.url;
              const i = n.pathname ? n.pathname : e.url;
              try {
                if (_.ADD_TO_CART_REGEX.test(i)) {
                  try {
                    const n =
                      arguments[1].body instanceof FormData
                        ? (function (e) {
                            const t = {};
                            return (
                              e.forEach((e, n) => {
                                C(n, e, t);
                              }),
                              t
                            );
                          })(arguments[1].body)
                        : JSON.parse(arguments[1].body);
                    if (Object.keys(n).includes("items"))
                      return (
                        (function (e, n) {
                          e.clone()
                            .json()
                            .then((e) => {
                              const o = n.items,
                                i = e.items;
                              return v(t, i, o), e;
                            })
                            .catch(o);
                        })(e, n),
                        e
                      );
                  } catch (r) {
                    o(r);
                  }
                  !(function (e, n) {
                    const i = k(n);
                    e.clone()
                      .json()
                      .then((e) => y(t, e, i))
                      .catch(o);
                  })(e, arguments[1].body);
                } else
                  _.CHANGE_TO_CART_REGEX.test(i) &&
                    (function (e) {
                      e.clone()
                        .json()
                        .then((e) => {
                          x(t, e);
                        })
                        .catch(o);
                    })(e);
              } catch (r) {
                o(r);
              }
              return e;
            });
          });
      }
      function C(e, t, n) {
        const [o, ...i] = e.split(".").filter((e) => e);
        if (i.length > 0)
          return (n[o] = n[o] || {}), void C(i.join("."), t, n[o]);
        const r = /(\w+)?\[(\d+)?\](.+)?/.exec(e);
        if (r) {
          const [e, o, i, s] = r;
          if (o) return (n[o] = n[o] || []), void C(e.replace(o, ""), t, n[o]);
          if (i) {
            const e = s && "[" === s[0] ? [] : {};
            return (n[i] = n[i] || e), void C(s, t, n[i]);
          }
          n.push(t);
        } else n[e] = t;
      }
      function S(e, t) {
        !(function (e, t) {
          const n = e.prototype.open,
            o = e.prototype.send;
          (e.prototype.open = function (e, t) {
            (this._url = t),
              (this._method = e),
              _.handleXhrOpen(),
              n.apply(this, arguments);
          }),
            (e.prototype.send = function (e) {
              if (!(e instanceof Document)) {
                const n = new _(this, this._url, this._method, e || "", t);
                this.addEventListener
                  ? this.addEventListener(
                      "readystatechange",
                      n.onReadyStateChange.bind(n),
                      !1
                    )
                  : ((n.oldOnReadyStateChange = this.onreadystatechange),
                    (this.onreadystatechange = n.onReadyStateChange));
              }
              o.call(this, e);
            });
        })(XMLHttpRequest, e),
          E(p(), e),
          w((n) => {
            const o = n.getAttribute("action");
            o &&
              o.indexOf("/cart/add") >= 0 &&
              h(n, "submit", (n) => {
                !(function (e, t, n) {
                  const o = t || window.event;
                  if (
                    o.defaultPrevented ||
                    (o.isDefaultPrevented && o.isDefaultPrevented())
                  )
                    return;
                  const i = o.currentTarget || o.srcElement;
                  if (
                    i &&
                    i instanceof Element &&
                    (i.getAttribute("action") || i.getAttribute("href"))
                  )
                    try {
                      const t = (function (e) {
                        let t;
                        const n = e.querySelector('[name="id"]');
                        return (
                          n instanceof HTMLSelectElement && n.options
                            ? (t = n.options[n.selectedIndex])
                            : (n instanceof HTMLOptionElement ||
                                n instanceof HTMLInputElement) &&
                              (t = n),
                          t
                        );
                      })(i);
                      if (!t) return;
                      const o = t.value,
                        r = (function (e) {
                          const t = e.querySelector('[name="quantity"]');
                          return t instanceof HTMLInputElement
                            ? Number(t.value)
                            : 1;
                        })(i),
                        s = (function (e, t) {
                          var n;
                          let o;
                          const i =
                            null == (n = t.productVariants)
                              ? void 0
                              : n.filter((t) => t.id === e);
                          if (!i || !i.length)
                            throw new Error("Product variant not found");
                          return (o = { ...i[0] }), o;
                        })(o, n),
                        a = {
                          cost: {
                            totalAmount: {
                              amount: s.price.amount * r,
                              currencyCode: s.price.currencyCode,
                            },
                          },
                          merchandise: s,
                          quantity: r,
                        };
                      e(l, { cartLine: a });
                    } catch (r) {
                      b("handleSubmitCartAdd", r);
                    }
                })(e, n, t);
              });
          });
      }
      function A(e, t, n) {
        var o;
        null != n && n.logLevel && ((o = n.logLevel), (m = o)),
          S(e, t),
          (function (e, t) {
            w((n) => {
              const o = n.querySelector('[name="previous_step"]');
              o &&
                o instanceof HTMLInputElement &&
                "payment_method" === o.value &&
                h(document.body, "submit", (n) => {
                  !(function (e, t, n) {
                    const o = t || window.event,
                      i = o.target || o.srcElement;
                    if (
                      i &&
                      i instanceof HTMLFormElement &&
                      i.getAttribute("action") &&
                      null !== i.getAttribute("data-payment-form")
                    )
                      try {
                        const t = n.checkout;
                        if (!t) throw new Error("Checkout data not found");
                        e(d, { checkout: t });
                      } catch (r) {
                        b("handleSubmitToPaymentAdd", r);
                      }
                  })(e, n, t);
                });
            });
          })(e, t);
      }
      var I;
      (_.ADD_TO_CART_REGEX =
        /^(?:\/[a-zA-Z]+(?:-[a-zA-Z]+)?)?\/cart\/add(?:\.js|\.json)?$/),
        (_.CHANGE_TO_CART_REGEX =
          /^(?:\/[a-zA-Z]+(?:-[a-zA-Z]+)?)?\/cart\/change(?:\.js|\.json)?$/),
        ((I = f || (f = {})).TRACKING_ACCEPTED = "trackingConsentAccepted"),
        (I.TRACKING_DECLINED = "trackingConsentDeclined"),
        (I.MARKETING_ACCEPTED = "firstPartyMarketingConsentAccepted"),
        (I.SALE_OF_DATA_ACCEPTED = "thirdPartyMarketingConsentAccepted"),
        (I.ANALYTICS_ACCEPTED = "analyticsConsentAccepted"),
        (I.PREFERENCES_ACCEPTED = "preferencesConsentAccepted"),
        (I.MARKETING_DECLINED = "firstPartyMarketingConsentDeclined"),
        (I.SALE_OF_DATA_DECLINED = "thirdPartyMarketingConsentDeclined"),
        (I.ANALYTICS_DECLINED = "analyticsConsentDeclined"),
        (I.PREFERENCES_DECLINED = "preferencesConsentDeclined"),
        (I.CONSENT_COLLECTED = "visitorConsentCollected"),
        (I.CONSENT_TRACKING_API_LOADED = "consentTrackingApiLoaded");
      const O = "2.1";
      let N, T, P, R, D, L, $;
      var M, j, U, V, B, z, q;
      ((q = N || (N = {})).ACCEPTED = "yes"),
        (q.DECLINED = "no"),
        (q.NO_INTERACTION = "no_interaction"),
        (q.NO_VALUE = ""),
        ((z = T || (T = {})).NO_VALUE = ""),
        (z.ACCEPTED = "1"),
        (z.DECLINED = "0"),
        ((B = P || (P = {})).GDPR = "GDPR"),
        (B.CCPA = "CCPA"),
        (B.NO_VALUE = ""),
        ((V = R || (R = {})).PREFERENCES = "p"),
        (V.ANALYTICS = "a"),
        (V.MARKETING = "m"),
        (V.SALE_OF_DATA = "t"),
        ((U = D || (D = {})).MARKETING = "m"),
        (U.ANALYTICS = "a"),
        (U.PREFERENCES = "p"),
        (U.SALE_OF_DATA = "s"),
        ((j = L || (L = {})).MARKETING = "marketing"),
        (j.ANALYTICS = "analytics"),
        (j.PREFERENCES = "preferences"),
        (j.SALE_OF_DATA = "sale_of_data"),
        (j.EMAIL = "email"),
        ((M = $ || ($ = {})).HEADLESS_STOREFRONT = "headlessStorefront"),
        (M.ROOT_DOMAIN = "rootDomain"),
        (M.CHECKOUT_ROOT_DOMAIN = "checkoutRootDomain"),
        (M.STOREFRONT_ROOT_DOMAIN = "storefrontRootDomain"),
        (M.STOREFRONT_ACCESS_TOKEN = "storefrontAccessToken");
      const F = ["v", "con", "reg"];
      let K = {};
      function W(e, t = null) {
        return (
          e in K ||
            (function (e) {
              const t = document.cookie ? document.cookie.split("; ") : [];
              K[e] = void 0;
              for (let n = 0; n < t.length; n++) {
                const [o, i] = t[n].split("=");
                if (e === decodeURIComponent(o))
                  return (K[e] = JSON.parse(decodeURIComponent(i))), K[e];
              }
            })(e) ||
            (function (e, t) {
              if (null === t) return;
              K[e] = void 0;
              let n,
                o,
                i = document.head.querySelector(`meta[name=${t}]`);
              if (i instanceof HTMLMetaElement) {
                n = i.content;
                try {
                  const e = n
                    .replace(/1/g, "true")
                    .replace(/0/g, "false")
                    .split(";")
                    .map((e) => e.trim())
                    .map((e) => e.split("=").map((e) => e.trim()));
                  if (((o = Object.fromEntries(e)), o.purposes)) {
                    const e = o.purposes.split(/(true|false)/).filter(Boolean),
                      t = {};
                    for (let n = 0; n < e.length; n += 2)
                      t[e[n]] = JSON.parse(e[n + 1]);
                    o.purposes = t;
                  }
                  for (let [t, n] of Object.entries(o))
                    "true" === n && (o[t] = !0), "false" === n && (o[t] = !1);
                } catch {
                  return;
                }
                K[e] = o;
              }
            })(e, t),
          K[e]
        );
      }
      const X = "_tracking_consent";
      function G() {
        try {
          let e = (function () {
            const e = W(X);
            if (
              void 0 !== e &&
              (t = e).v === O &&
              (function (e, t) {
                const n = t.slice().sort();
                return (
                  e.length === t.length &&
                  e
                    .slice()
                    .sort()
                    .every((e, t) => e === n[t])
                );
              })(
                Object.keys(t).filter((e) => "region" !== e && "lim" !== e),
                F
              )
            )
              return e;
            var t;
          })();
          if (!e) return;
          return e;
        } catch {
          return;
        }
      }
      const H = "_cmp_a",
        Y = "shopify-cmp-metadata";
      function J(e) {
        const t = W(H, Y);
        if (!t) return !0;
        const n = t.purposes[e];
        return "boolean" != typeof n || n;
      }
      function Z() {
        return J(R.ANALYTICS);
      }
      function Q() {
        return J(R.MARKETING);
      }
      function ee() {
        return (
          !!(function (e = null) {
            return null === e && (e = G()), void 0 === e;
          })() ||
          (Q() && Z())
        );
      }
      function te() {
        return J(R.SALE_OF_DATA);
      }
      const ne = "sh",
        oe = "shu",
        ie = "wpm",
        re = "trekkie";
      let se, ae;
      function ce(e) {
        return `${e || ne}-${(function () {
          const e = "xxxx-4xxx-xxxx-xxxxxxxxxxxx";
          let t = "";
          try {
            const n = window.crypto,
              o = new Uint16Array(31);
            n.getRandomValues(o);
            let i = 0;
            t = e
              .replace(/[x]/g, (e) => {
                const t = o[i] % 16;
                return i++, ("x" === e ? t : (3 & t) | 8).toString(16);
              })
              .toUpperCase();
          } catch (n) {
            t = e
              .replace(/[x]/g, (e) => {
                const t = (16 * Math.random()) | 0;
                return ("x" === e ? t : (3 & t) | 8).toString(16);
              })
              .toUpperCase();
          }
          return `${(function () {
            let e = 0,
              t = 0;
            e = new Date().getTime() >>> 0;
            try {
              t = performance.now() >>> 0;
            } catch (n) {
              t = 0;
            }
            return Math.abs(e + t)
              .toString(16)
              .toLowerCase()
              .padStart(8, "0");
          })()}-${t}`;
        })()}`;
      }
      function le() {
        const e = window;
        (e.Shopify = e.Shopify || {}),
          e.Shopify.evids ||
            ((se = {
              page_viewed: {},
              collection_viewed: {},
              product_viewed: {},
              product_variant_viewed: {},
              search_submitted: {},
              product_added_to_cart: {},
              checkout_started: {},
              checkout_completed: {},
              payment_info_submitted: {},
              session_started: {},
              checkout_contact_step_started: {},
              checkout_contact_info_submitted: {},
              checkout_address_info_submitted: {},
              checkout_shipping_step_started: {},
              checkout_shipping_info_submitted: {},
              checkout_payment_step_started: {},
            }),
            (ae = { wpm: {}, trekkie: {} }),
            (e.Shopify.evids = (e, t) =>
              (function (e, t) {
                if (
                  !se[e] ||
                  ((null == t ? void 0 : t.analyticsFramework) !== re &&
                    (null == t ? void 0 : t.analyticsFramework) !== ie)
                )
                  return ce(oe);
                const n =
                  "string" == typeof (o = t.cacheKey) && o ? o : "default";
                var o;
                const i = (function (e, t, n) {
                  const o = ae[t];
                  return (
                    void 0 === o[e] && (o[e] = {}),
                    void 0 === o[e][n] ? (o[e][n] = 0) : (o[e][n] += 1),
                    o[e][n]
                  );
                })(e, t.analyticsFramework, n);
                return (function (e, t, n) {
                  const o = se[e];
                  if (void 0 === o[n]) {
                    const e = ce();
                    o[n] = [e];
                  } else if (void 0 === o[n][t]) {
                    const e = ce();
                    o[n].push(e);
                  }
                  return o[n][t];
                })(e, i, n);
              })(e, t)));
      }
      const ue = new Set();
      function de(e) {
        const t = {};
        for (const o of e.split(/ *; */)) {
          const e = o.split("=");
          try {
            t[decodeURIComponent(e[0])] = decodeURIComponent(e[1] || "");
          } catch (n) {
            continue;
          }
        }
        return t;
      }
      function pe(e) {
        if (e <= 0 || e > 100) throw new Error("Invalid sampling percent");
        return 100 * Math.random() <= e;
      }
      var fe = n(856),
        me = n.n(fe);
      class he extends Error {
        constructor(...e) {
          super(...e),
            (this.message =
              "Excessive Stacktrace: May indicate infinite loop forming");
        }
      }
      var be = n(332);
      class we extends Error {
        constructor(...e) {
          super(...e),
            Error.captureStackTrace && Error.captureStackTrace(this, we);
        }
      }
      const ve = {
          production: "https://notify.bugsnag.com",
          test: "https://localhost",
        },
        ge = {
          severity: "error",
          context: "",
          unhandled: !0,
          library: "browser",
        },
        ye = {
          notify: (e, n) => {
            try {
              var a;
              if (
                null != n &&
                null != (a = n.options) &&
                a.sampleRate &&
                !pe(n.options.sampleRate)
              )
                return;
              const d = { ...ge, ...n };
              let p = {
                errorClass: null == e ? void 0 : e.name,
                message: null == e ? void 0 : e.message,
                stacktrace: [],
                type: "browserjs",
              };
              try {
                p = (function (e) {
                  if (
                    "string" !=
                      typeof (
                        (null == (t = e) ? void 0 : t.stack) ||
                        (null == t ? void 0 : t.stacktrace) ||
                        (null == t ? void 0 : t["opera#sourceloc"])
                      ) ||
                    t.stack === `${t.name}: ${t.message}`
                  )
                    throw new Error(
                      "Error incompatible with error-stack-parser"
                    );
                  var t;
                  const n = me()
                    .parse(e)
                    .reduce((e, t) => {
                      const n = (function ({
                        functionName: e,
                        lineNumber: t,
                        columnNumber: n,
                      }) {
                        const o = /^global code$/i.test((i = e) || "")
                          ? "global code"
                          : i;
                        var i;
                        return {
                          file: `https://cdn.shopify.com/cdn/wpm/${s}`,
                          method: o,
                          lineNumber: t,
                          columnNumber: n,
                        };
                      })(t);
                      try {
                        return "{}" === JSON.stringify(n) ? e : e.concat(n);
                      } catch (o) {
                        return e;
                      }
                    }, []);
                  return {
                    errorClass: null == e ? void 0 : e.name,
                    message: null == e ? void 0 : e.message,
                    stacktrace: n,
                    type: "browserjs",
                  };
                })(e);
              } catch (l) {
                try {
                  p = (function (e, t) {
                    let n = "";
                    const o = {
                      lineNumber: "1",
                      columnNumber: "1",
                      method: t.context,
                      file: `https://cdn.shopify.com/cdn/wpm/${s}`,
                    };
                    if (e.stackTrace || e.stack || e.description) {
                      n = e.stack.split("\n")[0];
                      const t = e.stack.match(/([0-9]+):([0-9]+)/);
                      if (
                        t &&
                        t.length > 2 &&
                        ((o.lineNumber = t[1]),
                        (o.columnNumber = t[2]),
                        parseInt(o.lineNumber, 10) > 1e5)
                      )
                        throw new he();
                    }
                    return {
                      errorClass: (null == e ? void 0 : e.name) || n,
                      message: (null == e ? void 0 : e.message) || n,
                      stacktrace: [o],
                      type: "browserjs",
                    };
                  })(e, d);
                } catch (u) {
                  if (u instanceof he) return;
                }
              }
              const f = (function (
                  n,
                  {
                    userAgent: s,
                    context: a,
                    severity: c,
                    unhandled: l,
                    library: u,
                    hashVersionSandbox: d,
                    sandboxUrl: p,
                    pixelId: f,
                    pixelType: m,
                    runtimeContext: h,
                    shopId: b,
                    initConfig: w,
                    notes: v,
                  }
                ) {
                  var g, y;
                  const {
                    device: x,
                    os: k,
                    browser: _,
                    engine: E,
                  } = (function (t) {
                    try {
                      return new be.UAParser(t).getResult();
                    } catch (e) {
                      return {
                        ua: "",
                        browser: { name: "", version: "", major: "" },
                        engine: { name: "", version: "" },
                        os: { name: "", version: "" },
                        device: { model: "", type: "", vendor: "" },
                        cpu: { architecture: "" },
                      };
                    }
                  })(
                    s || (null == (g = self.navigator) ? void 0 : g.userAgent)
                  );
                  return {
                    payloadVersion: 5,
                    notifier: {
                      name: "web-pixel-manager",
                      version: o,
                      url: "-",
                    },
                    events: [
                      {
                        exceptions: [n],
                        context: a,
                        severity: c,
                        unhandled: l,
                        app: { version: o },
                        device: {
                          manufacturer: x.vendor,
                          model: x.model,
                          osName: k.name,
                          osVersion: k.version,
                          browserName: _.name,
                          browserVersion: _.version,
                        },
                        metaData: {
                          app: {
                            library: u,
                            browserTarget: i,
                            env: t,
                            hashVersion: r,
                            hashVersionSandbox: d || "N/A",
                            sandboxUrl: p || "N/A",
                          },
                          device: {
                            userAgent:
                              s ||
                              (null == (y = self.navigator)
                                ? void 0
                                : y.userAgent),
                            renderingEngineName: E.name,
                            renderingEngineVersion: E.version,
                          },
                          request: {
                            shopId: b,
                            shopUrl: self.location.href,
                            pixelId: f,
                            pixelType: m,
                            runtimeContext: h,
                          },
                          "Additional Notes": {
                            initConfig: JSON.stringify(w),
                            notes: v,
                          },
                        },
                      },
                    ],
                  };
                })(p, d),
                m = ve[t];
              var c;
              if (!m)
                return void (
                  null == (c = console) || c.log(`[${t}]`, "Bugsnag notify:", f)
                );
              fetch(m, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Bugsnag-Api-Key": "bcbc9f6762da195561967577c2d74ff8",
                  "Bugsnag-Payload-Version": "5",
                },
                body: JSON.stringify(f),
              }).catch(() => {});
            } catch (d) {}
          },
        };
      function xe(e) {
        const t = {};
        for (const n in e)
          if (Object.prototype.hasOwnProperty.call(e, n)) {
            const o = n.replace(/[A-Z]/g, (e) => `_${e}`).toLowerCase(),
              i = e[n];
            t[o] = null !== i && "object" == typeof i ? xe(i) : i;
          }
        return t;
      }
      function ke(e) {
        return e.replace(/\/$/, "");
      }
      const _e = {},
        Ee = {
          "pixel:register": {
            start: {
              name: "pixel:register:started",
              params: { pixelId: "", source: "" },
            },
            end: {
              name: "pixel:register:completed",
              params: { pixelId: "", source: "" },
            },
          },
          "page:session": {
            start: { name: "start", params: _e },
            end: { name: "page:unload", params: _e },
          },
          completed: {
            start: { name: "start", params: _e },
            end: { name: "pixels:resolved", params: _e },
          },
        };
      function Ce(e, t = _e) {
        const n = Se(e, "end", t),
          o = (function (e, t) {
            try {
              const n = Ae(e, "start", t),
                o = Ae(e, "end", t),
                i = (function (e, t) {
                  return Ie(e, t);
                })(e, t),
                r = self.performance.measure(i, n, o);
              return {
                ...r,
                duration: Math.round(r.duration),
                startTime: Math.round(r.startTime),
              };
            } catch (n) {
              return null;
            }
          })(e, t);
        return { mark: n, measurement: o };
      }
      function Se(e, t, n) {
        try {
          const o = Ae(e, t, n);
          return self.performance.mark(o), { name: o, params: n };
        } catch (o) {
          return { name: null, params: n };
        }
      }
      function Ae(e, t, n) {
        return Ie(Ee[e][t].name, n);
      }
      function Ie(e, t) {
        const n = ["wpm", e];
        return (
          t &&
            Object.keys(t).forEach((e) => {
              n.push(t[e]);
            }),
          n.join(":")
        );
      }
      const Oe = {
        test: "edge_test_click/1.0",
        load: "web_pixels_manager_load/3.1",
        init: "web_pixels_manager_init/3.2",
        register: "web_pixels_manager_pixel_register/3.6",
        subscriberEventEmit: "web_pixels_manager_subscriber_event_emit/3.4",
        eventPublish: "web_pixels_manager_event_publish/1.6",
        consentAccepted: "web_pixels_manager_consent_accepted/1.2",
        unload: "web_pixels_manager_unload/1.2",
        visitor: "web_pixels_manager_visitor/1.0",
      };
      function Ne(e, t) {
        return { schemaId: Oe[e], payload: t };
      }
      let Te = "";
      function Pe(e = "") {
        Te = ke(e);
      }
      const Re = "/unstable/produce_batch",
        De = 500;
      let Le = "wellKnown";
      const $e = new Array();
      let Me;
      function je(e, t = !1) {
        const n = {
          schema_id: e.schemaId,
          payload: xe(e.payload),
          metadata: { event_created_at_ms: Be() },
        };
        $e.push(n), t ? Ve() : void 0 === Me && (Me = setTimeout(Ve, De));
      }
      function Ue(e, t, n = !1) {
        je(Ne(e, t), n);
      }
      function Ve({ skipXhr: e } = { skipXhr: !1 }) {
        if (((Me = void 0), 0 === $e.length)) return;
        const t = [...$e];
        ($e.length = 0),
          (function (e, t) {
            if (0 === e.length) return !1;
            const n = { metadata: { event_sent_at_ms: Be() }, events: e };
            !(function (e, t) {
              const n = `${
                {
                  global: "https://monorail-edge.shopifysvc.com",
                  wellKnown: `${Te}/.well-known/shopify/monorail`,
                  staging: "https://monorail-edge-staging.shopifycloud.com",
                  test: "https://localhost",
                }[Le]
              }${Re}`;
              try {
                if (self.navigator.sendBeacon.bind(self.navigator)(n, e))
                  return !0;
              } catch (o) {}
              if (!t) {
                const t = new XMLHttpRequest();
                try {
                  t.open("POST", n, !0),
                    t.setRequestHeader("Content-Type", "text/plain"),
                    t.send(e);
                } catch (i) {
                  ye.notify(i, {
                    context: "v0/utilities/monorail/sendRequest",
                    unhandled: !1,
                  });
                }
              }
            })(JSON.stringify(n), t);
          })(t, e);
      }
      function Be() {
        return new Date().getTime();
      }
      let ze = !1;
      const qe = ["analytics", "preferences", "marketing", "sale_of_data"];
      function Fe(e, t) {
        return e ? !t || Object.keys(e).every((n) => !e[n] || t[n]) : ee();
      }
      function Ke(e) {
        if (e)
          return qe.reduce(
            (t, n) => ((t[n] = e.includes(n.toUpperCase())), t),
            {}
          );
      }
      function We(e) {
        return new Promise((t, n) => {
          const o = {
            analytics: Z(),
            marketing: Q(),
            preferences: J(R.PREFERENCES),
            sale_of_data: te(),
          };
          if (Fe(e, o)) return void t(!0);
          const i = (n) => {
            (K = {}),
              (function (e, t) {
                const n = e.detail;
                return Fe(t, {
                  analytics: !0 === (null == n ? void 0 : n.analyticsAllowed),
                  marketing: !0 === (null == n ? void 0 : n.marketingAllowed),
                  preferences:
                    !0 === (null == n ? void 0 : n.preferencesAllowed),
                  sale_of_data:
                    !0 === (null == n ? void 0 : n.saleOfDataAllowed),
                });
              })(n, e) &&
                (document.removeEventListener(f.CONSENT_COLLECTED, i), t(!0));
          };
          document.addEventListener(f.CONSENT_COLLECTED, i);
        });
      }
      const Xe = new Set();
      class Ge extends Error {
        constructor(e) {
          super(e), (this.name = "VisitorError");
        }
      }
      const He = {
        randomUUID:
          "undefined" != typeof crypto &&
          crypto.randomUUID &&
          crypto.randomUUID.bind(crypto),
      };
      let Ye;
      const Je = new Uint8Array(16);
      function Ze() {
        if (
          !Ye &&
          ((Ye =
            "undefined" != typeof crypto &&
            crypto.getRandomValues &&
            crypto.getRandomValues.bind(crypto)),
          !Ye)
        )
          throw new Error(
            "crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported"
          );
        return Ye(Je);
      }
      const Qe = [];
      for (let n = 0; n < 256; ++n) Qe.push((n + 256).toString(16).slice(1));
      const et = function (e, t, n) {
        if (He.randomUUID && !t && !e) return He.randomUUID();
        const o = (e = e || {}).random || (e.rng || Ze)();
        if (((o[6] = (15 & o[6]) | 64), (o[8] = (63 & o[8]) | 128), t)) {
          n = n || 0;
          for (let e = 0; e < 16; ++e) t[n + e] = o[e];
          return t;
        }
        return (function (e, t = 0) {
          return (
            Qe[e[t + 0]] +
            Qe[e[t + 1]] +
            Qe[e[t + 2]] +
            Qe[e[t + 3]] +
            "-" +
            Qe[e[t + 4]] +
            Qe[e[t + 5]] +
            "-" +
            Qe[e[t + 6]] +
            Qe[e[t + 7]] +
            "-" +
            Qe[e[t + 8]] +
            Qe[e[t + 9]] +
            "-" +
            Qe[e[t + 10]] +
            Qe[e[t + 11]] +
            Qe[e[t + 12]] +
            Qe[e[t + 13]] +
            Qe[e[t + 14]] +
            Qe[e[t + 15]]
          );
        })(o);
      };
      let tt;
      function nt() {
        return (
          tt ||
            (tt = (function () {
              let e;
              try {
                var t, n;
                e =
                  null != (t = window.Shopify) && t.evids
                    ? null == (n = window.Shopify)
                      ? void 0
                      : n.evids("session_started", {
                          analyticsFramework: "wpm",
                        })
                    : et();
              } catch (o) {
                e = et();
              }
              return e;
            })()),
          tt
        );
      }
      class ot extends Set {
        constructor(e, t) {
          if (
            (super(),
            (this.maxSize = void 0),
            (this.keep = void 0),
            (Number.isFinite(e) && !Number.isInteger(e)) || e <= 0)
          )
            throw new Error("Invalid maxSize specified");
          (this.maxSize = e), (this.keep = t);
        }
        push(e) {
          if ("oldest" === this.keep) this.size < this.maxSize && this.add(e);
          else if (
            "newest" === this.keep &&
            (this.add(e), this.size > this.maxSize)
          )
            for (const t of this)
              if ((this.delete(t), this.size <= this.maxSize)) break;
          return this;
        }
      }
      const it = (e, t, n) => !0;
      class rt {
        constructor({
          bufferSize: e = 50,
          replayKeep: t = "oldest",
          subscribeAllKey: n,
          eligibility: o,
        } = {}) {
          (this.channelSubscribers = new Map()),
            (this.replayQueue = void 0),
            (this.bufferSize = void 0),
            (this.replayKeep = void 0),
            (this.subscribeAllKey = void 0),
            (this.eligibility = void 0),
            (this.bufferSize = e),
            (this.replayKeep = t),
            (this.subscribeAllKey = n),
            (this.replayQueue = new ot(e, t)),
            (this.eligibility = null != o ? o : it);
        }
        publish(e, t, n = {}) {
          var o;
          if (this.subscribeAllKey && e === this.subscribeAllKey)
            throw new Error(`Cannot publish to ${String(e)}`);
          this.replayQueue.push({ name: e, payload: t, options: n });
          const i = (o, i) => {
            this.eligibility(n, o, e) && i.call({}, { ...t });
          };
          var r;
          return (
            null == (o = this.channelSubscribers.get(e)) || o.forEach(i),
            this.subscribeAllKey &&
              (null ==
                (r = this.channelSubscribers.get(this.subscribeAllKey)) ||
                r.forEach(i)),
            !0
          );
        }
        subscribe(e, t, n = {}) {
          const o = this.channelSubscribers.get(e) || new Map();
          return (
            this.channelSubscribers.set(e, o.set(t, n)),
            this.replayQueue.forEach(({ name: o, payload: i, options: r }) => {
              this.eligibility(r, n, e) &&
                (e === o ||
                  (this.subscribeAllKey && e === this.subscribeAllKey)) &&
                t.call({}, { ...i });
            }),
            () => o.delete(t)
          );
        }
      }
      let st = (function (e) {
          return (
            (e.Custom = "custom"), (e.Dom = "dom"), (e.Standard = "standard"), e
          );
        })({}),
        at = (function (e) {
          return (e.Meta = "meta"), e;
        })({});
      const ct = {
        all_events: at.Meta,
        all_standard_events: at.Meta,
        all_custom_events: at.Meta,
        all_dom_events: at.Meta,
        checkout_address_info_submitted: st.Standard,
        checkout_completed: st.Standard,
        checkout_started: st.Standard,
        payment_info_submitted: st.Standard,
        collection_viewed: st.Standard,
        checkout_contact_info_submitted: st.Standard,
        page_viewed: st.Standard,
        product_added_to_cart: st.Standard,
        product_removed_from_cart: st.Standard,
        product_viewed: st.Standard,
        product_variant_viewed: st.Standard,
        search_submitted: st.Standard,
        cart_viewed: st.Standard,
        checkout_shipping_info_submitted: st.Standard,
        input_changed: st.Dom,
        input_blurred: st.Dom,
        input_focused: st.Dom,
        form_submitted: st.Dom,
        clicked: st.Dom,
        custom_event: st.Custom,
      };
      function lt(e) {
        return (function (e) {
          return Boolean(ct[e]);
        })(e)
          ? ct[e]
          : st.Custom;
      }
      function ut(e) {
        return lt(e) === st.Standard;
      }
      function dt(e) {
        return lt(e) === st.Dom;
      }
      function pt() {
        return /checkouts\/(.+)\/(thank_you|thank-you|post_purchase)$/.test(
          self.location.pathname
        );
      }
      let ft = (function (e) {
          return (
            (e.Shopify = "shopify"),
            (e.StorefrontRenderer = "storefront-renderer"),
            (e.CheckoutOne = "checkout-one"),
            (e.CheckoutOneSdk = "checkout-one-sdk"),
            (e.Unknown = "unknown"),
            e
          );
        })({}),
        mt = (function (e) {
          return (
            (e.WebPixelExtension = "web-pixel-extension"),
            (e.CheckoutOneSdk = "checkout-one-sdk"),
            (e.Unknown = "unknown"),
            e
          );
        })({});
      const ht = {
          string: "[object String]",
          number: "[object Number]",
          boolean: "[object Boolean]",
          undefined: "[object Undefined]",
          null: "[object Null]",
          object: "[object Object]",
        },
        bt = [ht.string, ht.number, ht.boolean, ht.undefined, ht.null];
      function wt(e) {
        let t = null,
          n = null;
        function o(e) {
          return Object.prototype.toString.call(e) === ht.object;
        }
        return void 0 === e || o(e)
          ? {
              isValid: (function e(i, r) {
                if (Array.isArray(i)) return i.every((t) => e(t, r));
                if (o(i)) return Object.keys(i).every((t) => e(i[t], t));
                const s = bt.includes(Object.prototype.toString.call(i));
                return (
                  s ||
                    ((n = r),
                    (t = `Key: ${n}; ${i} must be one of the following types: ${bt.join(
                      ", "
                    )}`)),
                  s
                );
              })(e, "root"),
              error: t,
              errorKey: n,
            }
          : ((n = "root"),
            (t = `Key: ${n}; ${e} must be an object`),
            { isValid: !1, error: t, errorKey: n });
      }
      let vt = (function (e) {
          return (e.App = "APP"), (e.Custom = "CUSTOM"), e;
        })({}),
        gt = (function (e) {
          return (e.Strict = "STRICT"), (e.Lax = "LAX"), (e.Open = "OPEN"), e;
        })({});
      function yt(e) {
        return "shopify-custom-pixel" === e.id
          ? "shopify-pixel"
          : e.type === vt.Custom
          ? "-1"
          : e.apiClientId
          ? `${e.apiClientId}`
          : void 0;
      }
      function xt() {
        return {
          document: {
            location: {
              href: window.location.href,
              hash: window.location.hash,
              host: window.location.host,
              hostname: window.location.hostname,
              origin: window.location.origin,
              pathname: window.location.pathname,
              port: window.location.port,
              protocol: window.location.protocol,
              search: window.location.search,
            },
            referrer: document.referrer,
            characterSet: document.characterSet,
            title: document.title,
          },
          navigator: {
            language: navigator.language,
            cookieEnabled: navigator.cookieEnabled,
            languages: navigator.languages,
            userAgent: navigator.userAgent,
          },
          window: {
            innerHeight: window.innerHeight,
            innerWidth: window.innerWidth,
            outerHeight: window.outerHeight,
            outerWidth: window.outerWidth,
            pageXOffset: window.pageXOffset,
            pageYOffset: window.pageYOffset,
            location: {
              href: window.location.href,
              hash: window.location.hash,
              host: window.location.host,
              hostname: window.location.hostname,
              origin: window.location.origin,
              pathname: window.location.pathname,
              port: window.location.port,
              protocol: window.location.protocol,
              search: window.location.search,
            },
            origin: window.origin,
            screen: {
              height: window.screen.height,
              width: window.screen.width,
            },
            screenX: window.screenX,
            screenY: window.screenY,
            scrollX: window.scrollX,
            scrollY: window.scrollY,
          },
        };
      }
      const kt = (e) => ({
        ...e,
        clientId: de(document.cookie)._shopify_y,
        timestamp: new Date().toISOString(),
        context: xt(),
        id: "string" == typeof e.id && e.id.length > 0 ? e.id : et(),
      });
      const _t = (e, t, n) => {
          const { pixelRuntimeConfig: o } = t || {},
            { apiClientId: i, restrictions: r } = o || {},
            { allowedEvents: s, disallowedEvents: a } = r || {},
            { sendTo: c } = e || {},
            l = c && String(c) === String(i),
            u = c && !l,
            d = !s || s.includes(n),
            p = a && a.includes(n);
          return Boolean((d && !p && !u) || l);
        },
        Et = "all_standard_events",
        Ct = "all_custom_events",
        St = "all_dom_events";
      class At extends Error {
        constructor(e) {
          super(e), (this.name = "PublishDomEventError");
        }
      }
      function It(e) {
        const t = new rt({
            bufferSize: Number.POSITIVE_INFINITY,
            subscribeAllKey: Et,
            eligibility: _t,
          }),
          n = new rt({ bufferSize: 1e3, subscribeAllKey: Ct, eligibility: _t }),
          r = new rt({
            bufferSize: 1e3,
            replayKeep: "newest",
            subscribeAllKey: St,
            eligibility: _t,
          });
        e.initData;
        let s = !1;
        return {
          publish(n, r, c) {
            var l, u, d, p, f;
            if ("string" != typeof n)
              throw new Error(
                "Expected event name to be a string, but got " + typeof n
              );
            if (!ut(n)) return !1;
            if (
              "checkout_completed" === n &&
              pt() &&
              -1 !== document.cookie.indexOf(`${a}=1`)
            )
              return !1;
            const m = wt(r);
            if (!m.isValid) return console.error(m.error), !1;
            const h = (function (e, t, n) {
                let o;
                const i = { analyticsFramework: "wpm" };
                try {
                  var r, s;
                  "product_added_to_cart" === e &&
                    "cartLine" in n &&
                    (i.cacheKey = (function (
                      { cartLine: e } = { cartLine: null }
                    ) {
                      const t = null == e ? void 0 : e.merchandise.product.id,
                        n = null == e ? void 0 : e.merchandise.id;
                      if (t && n) return `${t}-${n}`;
                    })(n)),
                    (o =
                      null == (r = window.Shopify) || null == (s = r.evids)
                        ? void 0
                        : s.call(r, e, i));
                } catch {}
                return kt({ id: o, name: e, data: n, type: st.Standard });
              })(n, 0, r),
              b =
                null == (l = h.data) || null == (u = l.checkout)
                  ? void 0
                  : u.token;
            return (
              Ue("eventPublish", {
                version: o,
                bundleTarget: i,
                pageUrl: self.location.href,
                shopId: e.shopId,
                surface: e.surface || ft.Unknown,
                eventName: h.name,
                eventType: "standard",
                extensionId:
                  null == c || null == (d = c.extension)
                    ? void 0
                    : d.extensionId,
                extensionAppId:
                  null == c || null == (p = c.extension) ? void 0 : p.appId,
                extensionType:
                  null == c || null == (f = c.extension) ? void 0 : f.type,
                userCanBeTracked: ee().toString(),
                shopPrefs: "unknown",
                eventId: h.id,
                checkoutToken: b,
                serverEventId: null == c ? void 0 : c.eventId,
              }),
              (function (e) {
                "checkout_completed" === e &&
                  (function () {
                    if (pt()) {
                      const e = self.location.pathname
                          .split("/")
                          .slice(0, -1)
                          .join("/"),
                        t = new Date();
                      t.setMonth(t.getMonth() + 2),
                        (document.cookie = `${a}=1; expires=${t}; path=${e}`);
                    }
                  })();
              })(n),
              s ||
                ((s = !0),
                (w = e.shopId),
                (v = e.surface || ft.Unknown),
                Xe.add(() =>
                  (function (e, t) {
                    ze ||
                      ((ze = !0),
                      Ue("consentAccepted", {
                        version: o,
                        bundleTarget: i,
                        shopId: e,
                        surface: t,
                        shopPrefs: "unknown",
                      }));
                  })(w, v)
                )),
              t.publish(n, h)
            );
            var w, v;
          },
          publishCustomEvent(t, r, s) {
            var a, c, l;
            if ("string" != typeof t)
              throw new Error(
                "Expected event name to be a string, but got " + typeof t
              );
            if (
              !(function (e) {
                return lt(e) === st.Custom;
              })(t)
            )
              return !1;
            const u = wt(r);
            if (!u.isValid) return console.error(u.error), !1;
            const d = (function (e, t, n = null) {
              return kt({ name: e, customData: n, type: st.Custom });
            })(t, 0, r);
            return (
              Ue("eventPublish", {
                version: o,
                bundleTarget: i,
                pageUrl: self.location.href,
                shopId: e.shopId,
                surface: e.surface || ft.Unknown,
                eventName: d.name,
                eventType: "custom",
                extensionId:
                  null == s || null == (a = s.extension)
                    ? void 0
                    : a.extensionId,
                extensionAppId:
                  null == s || null == (c = s.extension) ? void 0 : c.appId,
                extensionType:
                  null == s || null == (l = s.extension) ? void 0 : l.type,
                eventId: d.id,
              }),
              n.publish(t, d, s)
            );
          },
          publishDomEvent(e, t, n) {
            if ("string" != typeof e) {
              const t = JSON.stringify(e);
              throw new At(
                `Expected event name "${t}" to be a string, but got ${typeof e}`
              );
            }
            if (!dt(e))
              throw new At(`Event name "${e}" is not a supported DOM Event`);
            const o = wt(t);
            if (!o.isValid) throw new At(`Input Validation Error: ${o.error}`);
            const i = (function (e, t) {
              return kt({ name: e, data: t, type: st.Dom });
            })(e, t);
            return r.publish(e, i);
          },
          subscribe(s, a, c = {}) {
            const l = (t) => {
              var n, r, s, l, u, d, p, f;
              if (
                e.surface === ft.CheckoutOneSdk &&
                c.scope !== mt.CheckoutOneSdk
              )
                return;
              const m = {
                configuration:
                  null == (n = c.pixelRuntimeConfig) ? void 0 : n.configuration,
                eventPayloadVersion:
                  c.schemaVersion ||
                  (null == (r = c.pixelRuntimeConfig)
                    ? void 0
                    : r.eventPayloadVersion) ||
                  "unknown",
                id:
                  (null == (s = c.pixelRuntimeConfig) ? void 0 : s.id) ||
                  "unknown",
                type:
                  (null == (l = c.pixelRuntimeConfig) ? void 0 : l.type) ||
                  "unknown",
                runtimeContext:
                  (null == (u = c.pixelRuntimeConfig)
                    ? void 0
                    : u.runtimeContext) || "unknown",
                restrictions:
                  null == (d = c.pixelRuntimeConfig) ? void 0 : d.restrictions,
                scriptVersion:
                  (null == (p = c.pixelRuntimeConfig)
                    ? void 0
                    : p.scriptVersion) || "unknown",
                apiClientId:
                  null == (f = c.pixelRuntimeConfig) ? void 0 : f.apiClientId,
              };
              a.call(t, t);
              const h = lt(t.name);
              if (h !== st.Dom || pe(1)) {
                let e;
                var b, w;
                ut(t.name) &&
                  (e =
                    null == t ||
                    null == (b = t.data) ||
                    null == (w = b.checkout)
                      ? void 0
                      : w.token),
                  Ue("subscriberEventEmit", {
                    version: o,
                    bundleTarget: i,
                    pageUrl: self.location.href,
                    shopId: c.shopId,
                    surface: c.surface,
                    pixelId: m.id,
                    pixelAppId: yt(m),
                    pixelSource: m.type,
                    pixelRuntimeContext: m.runtimeContext,
                    pixelScriptVersion: m.scriptVersion,
                    pixelConfiguration: m.configuration,
                    pixelEventSchemaVersion: m.eventPayloadVersion,
                    eventName: t.name,
                    eventType: h,
                    eventId: t.id,
                    checkoutToken: e,
                  });
              }
            };
            if ("all_events" === s) {
              const e = t.subscribe(Et, l, c),
                o = n.subscribe(Ct, l, c),
                i = r.subscribe(St, l, c);
              return () => {
                const t = e(),
                  n = o(),
                  r = i();
                return t && n && r;
              };
            }
            return s === Ct
              ? n.subscribe(Ct, l, c)
              : s === Et || ut(s)
              ? t.subscribe(s, l, c)
              : s === St || dt(s)
              ? r.subscribe(s, l, c)
              : n.subscribe(s, l, c);
          },
        };
      }
      const Ot = ["31014027265", "28638674945", "44186959873"];
      const Nt = Symbol.for("RemoteUi::Retain"),
        Tt = Symbol.for("RemoteUi::Release"),
        Pt = Symbol.for("RemoteUi::RetainedBy");
      class Rt {
        constructor() {
          this.memoryManaged = new Set();
        }
        add(e) {
          this.memoryManaged.add(e), e[Pt].add(this), e[Nt]();
        }
        release() {
          for (const e of this.memoryManaged) e[Pt].delete(this), e[Tt]();
          this.memoryManaged.clear();
        }
      }
      function Dt(e) {
        return Boolean(e && e[Nt] && e[Tt]);
      }
      function Lt(e, { deep: t = !0 } = {}) {
        return $t(e, t, new Map());
      }
      function $t(e, t, n) {
        const o = n.get(e);
        if (null != o) return o;
        const i = Dt(e);
        if ((i && e[Nt](), n.set(e, i), t)) {
          if (Array.isArray(e)) {
            const o = e.reduce((e, o) => $t(o, t, n) || e, i);
            return n.set(e, o), o;
          }
          if (Mt(e)) {
            const o = Object.keys(e).reduce((o, i) => $t(e[i], t, n) || o, i);
            return n.set(e, o), o;
          }
        }
        return n.set(e, i), i;
      }
      function Mt(e) {
        if (null == e || "object" != typeof e) return !1;
        const t = Object.getPrototypeOf(e);
        return null == t || t === Object.prototype;
      }
      const jt = "_@f";
      function Ut(e) {
        const t = new Map(),
          n = new Map(),
          o = new Map();
        return {
          encode: function o(i, r = new Map()) {
            if (null == i) return [i];
            const s = r.get(i);
            if (s) return s;
            if ("object" == typeof i) {
              if (Array.isArray(i)) {
                r.set(i, [void 0]);
                const e = [],
                  t = [
                    i.map((t) => {
                      const [n, i = []] = o(t, r);
                      return e.push(...i), n;
                    }),
                    e,
                  ];
                return r.set(i, t), t;
              }
              if (Mt(i)) {
                r.set(i, [void 0]);
                const e = [],
                  t = [
                    Object.keys(i).reduce((t, n) => {
                      const [s, a = []] = o(i[n], r);
                      return e.push(...a), { ...t, [n]: s };
                    }, {}),
                    e,
                  ];
                return r.set(i, t), t;
              }
            }
            if ("function" == typeof i) {
              if (t.has(i)) {
                const e = t.get(i),
                  n = [{ [jt]: e }];
                return r.set(i, n), n;
              }
              const o = e.uuid();
              t.set(i, o), n.set(o, i);
              const s = [{ [jt]: o }];
              return r.set(i, s), s;
            }
            const a = [i];
            return r.set(i, a), a;
          },
          decode: i,
          async call(e, t) {
            const o = new Rt(),
              r = n.get(e);
            if (null == r)
              throw new Error(
                "You attempted to call a function that was already released."
              );
            try {
              const e = Dt(r) ? [o, ...r[Pt]] : [o];
              return await r(...i(t, e));
            } finally {
              o.release();
            }
          },
          release(e) {
            const o = n.get(e);
            o && (n.delete(e), t.delete(o));
          },
          terminate() {
            t.clear(), n.clear(), o.clear();
          },
        };
        function i(t, n) {
          if ("object" == typeof t) {
            if (null == t) return t;
            if (t instanceof ArrayBuffer) return t;
            if (Array.isArray(t)) return t.map((e) => i(e, n));
            if (jt in t) {
              const i = t[jt];
              if (o.has(i)) return o.get(i);
              let r = 0,
                s = !1;
              const a = () => {
                  (r -= 1), 0 === r && ((s = !0), o.delete(i), e.release(i));
                },
                c = () => {
                  r += 1;
                },
                l = new Set(n),
                u = (...t) => {
                  if (s)
                    throw new Error(
                      "You attempted to call a function that was already released."
                    );
                  if (!o.has(i))
                    throw new Error(
                      "You attempted to call a function that was already revoked."
                    );
                  return e.call(i, t);
                };
              Object.defineProperties(u, {
                [Tt]: { value: a, writable: !1 },
                [Nt]: { value: c, writable: !1 },
                [Pt]: { value: l, writable: !1 },
              });
              for (const e of l) e.add(u);
              return o.set(i, u), u;
            }
            return Object.keys(t).reduce(
              (e, o) => ({ ...e, [o]: i(t[o], n) }),
              {}
            );
          }
          return t;
        }
      }
      const Vt = 0,
        Bt = 1,
        zt = 2,
        qt = 3,
        Ft = 5,
        Kt = 6;
      function Wt() {
        return `${Xt()}-${Xt()}-${Xt()}-${Xt()}`;
      }
      function Xt() {
        return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(16);
      }
      const Gt = new Map();
      function Ht() {
        var e, t;
        const n =
            (null == (e = self) || null == (t = e.location)
              ? void 0
              : t.hostname) || "",
          o = Gt.get(n);
        if (o) return o;
        const i = n.split("."),
          r = [];
        return (
          i.reverse().reduce((e, t) => {
            const n = "" === e ? t : `${t}.${e}`;
            return (
              (function (e) {
                document.cookie = `wpm-domain-test=1; path=/; domain=${e}`;
              })(n),
              document.cookie
                .split(";")
                .find((e) => e.includes("wpm-domain-test")) || r.push(n),
              (function (e) {
                document.cookie = `wpm-domain-test=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; domain=${e}`;
              })(n),
              n
            );
          }, ""),
          Gt.set(n, r),
          r
        );
      }
      let Yt, Jt;
      function Zt() {
        if (void 0 !== Yt) return Yt;
        try {
          return (
            window.localStorage.setItem("local-storage-test", "test"),
            window.localStorage.removeItem("local-storage-test"),
            (Yt = !0),
            !0
          );
        } catch (e) {
          return (Yt = !1), !1;
        }
      }
      function Qt() {
        if (void 0 !== Jt) return Jt;
        try {
          return (
            window.sessionStorage.setItem("session-storage-test", "test"),
            window.sessionStorage.removeItem("session-storage-test"),
            (Jt = !0),
            !0
          );
        } catch (e) {
          return (Jt = !1), !1;
        }
      }
      function en({
        eventBus: e,
        webPixelConfig: t,
        shopId: n,
        surface: o,
        initData: i,
        forRPC: r = !1,
      }) {
        let s = {};
        try {
          s = t.configuration ? JSON.parse(t.configuration) : {};
        } catch (m) {}
        return {
          analytics: {
            subscribe: (i, s, a) => (
              r && Lt(s),
              e.subscribe(i, s, {
                ...a,
                pixelRuntimeConfig: t,
                shopId: n,
                surface: o,
                scope: mt.WebPixelExtension,
              })
            ),
          },
          browser: {
            cookie: {
              get: async (e) => {
                if (!e) return document.cookie;
                let t = "";
                const n = document.cookie.split("; ");
                for (const o of n) {
                  const [n, i] = o.split("=");
                  if (n === e) {
                    t = i;
                    break;
                  }
                }
                return t;
              },
              set: async (e, t) => {
                if (t) {
                  const n = `${e}=${t}`;
                  document.cookie = n;
                } else document.cookie = e;
                return document.cookie;
              },
            },
            sendBeacon: async (e, t = "") => {
              if (
                e.includes(self.location.origin) &&
                !e.match(
                  /\/\.well-known\/shopify\/monorail\/unstable\/produce_batch/
                )
              )
                return !1;
              const n = new window.Blob([t], { type: "text/plain" });
              return window.navigator.sendBeacon(e, n);
            },
            localStorage: {
              setItem: async (e, t) =>
                Zt() ? window.localStorage.setItem(e, t) : Promise.resolve(),
              getItem: async (e) =>
                Zt() ? window.localStorage.getItem(e) : Promise.resolve(null),
              key: async (e) =>
                Zt() ? window.localStorage.key(e) : Promise.resolve(null),
              removeItem: async (e) =>
                Zt() ? window.localStorage.removeItem(e) : Promise.resolve(),
              clear: async () =>
                Zt() ? window.localStorage.clear() : Promise.resolve(),
              length: async () =>
                Zt() ? window.localStorage.length : Promise.resolve(0),
            },
            sessionStorage: {
              setItem: async (e, t) =>
                Qt() ? window.sessionStorage.setItem(e, t) : Promise.resolve(),
              getItem: async (e) =>
                Qt() ? window.sessionStorage.getItem(e) : Promise.resolve(null),
              key: async (e) =>
                Qt() ? window.sessionStorage.key(e) : Promise.resolve(null),
              removeItem: async (e) =>
                Qt() ? window.sessionStorage.removeItem(e) : Promise.resolve(),
              clear: async () =>
                Qt() ? window.sessionStorage.clear() : Promise.resolve(),
              length: async () =>
                Qt() ? window.sessionStorage.length : Promise.resolve(0),
            },
          },
          settings: s,
          init:
            ((a = i),
            {
              context: xt(),
              data: {
                customer:
                  ((f = null == a ? void 0 : a.customer),
                  f
                    ? {
                        email: f.email,
                        firstName: f.firstName,
                        id: f.id,
                        lastName: f.lastName,
                        phone: f.phone,
                        ordersCount: f.ordersCount,
                      }
                    : null),
                cart:
                  ((c = null == a ? void 0 : a.cart),
                  c
                    ? {
                        id: null == c ? void 0 : c.id,
                        cost: {
                          totalAmount: {
                            amount:
                              null == c ||
                              null == (l = c.cost) ||
                              null == (u = l.totalAmount)
                                ? void 0
                                : u.amount,
                            currencyCode:
                              null == c ||
                              null == (d = c.cost) ||
                              null == (p = d.totalAmount)
                                ? void 0
                                : p.currencyCode,
                          },
                        },
                        lines: null == c ? void 0 : c.lines,
                        totalQuantity: null == c ? void 0 : c.totalQuantity,
                      }
                    : null),
              },
            }),
          _pixelInfo: { ...t, surface: o },
        };
        var a, c, l, u, d, p, f;
      }
      const tn = "remote-ui::ready";
      async function nn({
        sandboxId: e,
        webPixelConfig: t,
        storefrontBaseUrl: n,
      }) {
        const { search: o } = self.location,
          s = t.id,
          a = [
            ke(n),
            "/wpm",
            `@${r}`,
            `/web-pixel-${s}`,
            `@${t.scriptVersion}`,
            "/sandbox",
            `/${i}`,
            /\.(js|json|xml)$/.test(self.location.pathname)
              ? ""
              : self.location.pathname,
            o,
          ];
        if (n.match(/spin\.dev\/?/)) {
          const e = o.length ? "&" : "?";
          a.push(`${o}${e}fast_storefront_renderer=1`);
        }
        return (function (
          e,
          { terminate: t = !0, targetOrigin: n = "*" } = {}
        ) {
          var o;
          if ("undefined" == typeof window)
            throw new Error(
              "You can only run fromIframe() in a browser context, but no window was found."
            );
          const i = new WeakMap();
          let r;
          function s(t) {
            t.source === e.contentWindow &&
              t.data === tn &&
              (window.removeEventListener("message", s), r());
          }
          null === (o = e.contentWindow) ||
            void 0 === o ||
            o.postMessage(tn, n);
          const a = new Promise((e) => {
            (r = e), window.addEventListener("message", s);
          });
          return {
            async postMessage(t, o) {
              var i;
              await a,
                null === (i = e.contentWindow) ||
                  void 0 === i ||
                  i.postMessage(t, n, o);
            },
            addEventListener(t, n) {
              const o = (t) => {
                t.source === e.contentWindow && n(t);
              };
              i.set(n, o), self.addEventListener(t, o);
            },
            removeEventListener(e, t) {
              const n = i.get(t);
              null != n && (i.delete(t), self.removeEventListener(e, n));
            },
            terminate() {
              window.removeEventListener("message", s), t && e.remove();
            },
          };
        })(
          await (async function ({ id: e, src: t, privileges: n }) {
            const o = document.querySelector(`iframe#${e}`);
            if (o && "IFRAME" === o.tagName) return o;
            const i = document.createElement("iframe");
            if (!t) {
              const e = new we("src or srcdoc must be provided");
              throw (
                (ye.notify(e, {
                  context: "v0/createIframe",
                  unhandled: !1,
                  severity: "warning",
                }),
                e)
              );
            }
            if (
              (i.setAttribute("src", t),
              i.setAttribute("id", e),
              i.setAttribute("name", e),
              i.setAttribute("sandbox", n.join(" ")),
              i.setAttribute("tabIndex", "-1"),
              i.setAttribute("aria-hidden", "true"),
              !(function (e) {
                return "sandbox" in e;
              })(i))
            ) {
              const e = new we(
                "browser does not support the sandbox attribute on IFrames"
              );
              throw (
                (ye.notify(e, {
                  context: "v0/createIframe",
                  unhandled: !1,
                  severity: "warning",
                }),
                e)
              );
            }
            return (
              i.setAttribute(
                "style",
                "display:none; height:0; width:0; visibility: hidden;"
              ),
              await (function (e) {
                return new Promise((t, n) => {
                  const o = () => {
                    try {
                      let n = document.querySelector(
                        "#WebPixelsManagerSandboxContainer"
                      );
                      null == n &&
                        ((n = document.createElement("div")),
                        n.setAttribute(
                          "id",
                          "WebPixelsManagerSandboxContainer"
                        ),
                        document.body.appendChild(n)),
                        document.querySelector(`#${e.id}`) || n.appendChild(e),
                        t(e);
                    } catch (o) {
                      n(o);
                    }
                  };
                  if (document.body) o();
                  else {
                    const e = () => {
                      "loading" !== document.readyState &&
                        (o(),
                        document.removeEventListener("readystatechange", e));
                    };
                    document.addEventListener("readystatechange", e);
                  }
                });
              })(i),
              i
            );
          })({
            id: e,
            src: a.join(""),
            privileges: ["allow-scripts", "allow-forms"],
          })
        );
      }
      let on;
      const rn = () => (
        on ||
          (on = {
            localStorageItems: { ...self.localStorage },
            sessionStorageItems: { ...self.sessionStorage },
          }),
        on
      );
      class sn extends Error {
        constructor(...e) {
          super(...e),
            (this.name = "SandboxAlreadyCreatedError"),
            (this.message = "Sandbox already created.");
        }
      }
      async function an({
        webPixelConfig: e,
        eventBus: t,
        shopId: n,
        storefrontBaseUrl: o,
        surface: s,
        initData: a,
      }) {
        const c = `web-pixel-sandbox-${e.type}-${e.id}-${e.runtimeContext}-${r}`;
        if (e.runtimeContext === gt.Lax && document.getElementById(c)) {
          const t = new sn();
          return (
            ye.notify(t, {
              pixelId: e.id,
              pixelType: e.type,
              runtimeContext: e.runtimeContext,
              shopId: n,
              context: "v0/createWebPixelSandbox/alreadyCreatedError",
              userAgent: self.navigator.userAgent,
              hashVersionSandbox: r,
              sandboxUrl: self.location.href || "unknown",
              options: { sampleRate: 15 },
            }),
            !1
          );
        }
        let l, u;
        switch (e.runtimeContext) {
          case gt.Strict:
            [l, u] = await (async function ({
              sandboxId: e,
              webPixelConfig: t,
              storefrontBaseUrl: n,
            }) {
              const o = t.id,
                s = [
                  ke(n),
                  "/wpm",
                  `@${r}`,
                  `/web-pixel-${o}`,
                  `@${t.scriptVersion}`,
                  "/sandbox",
                  `/worker.${i}.js`,
                ];
              n.match(/spin\.dev\/?/) && s.push("?fast_storefront_renderer=1");
              const a = s.join(""),
                c = new Worker(a, {
                  name: e,
                  type: "classic",
                  credentials: "omit",
                }),
                l = new Promise((e, t) => {
                  const n = () => {
                    c.removeEventListener("error", n),
                      t(
                        new Error(
                          `Failed to load web worker for pixel ${o} with url ${a}}`
                        )
                      );
                  };
                  c.addEventListener("error", n);
                });
              return [c, l];
            })({ sandboxId: c, webPixelConfig: e, storefrontBaseUrl: o });
            break;
          case gt.Lax:
            l = await nn({
              sandboxId: c,
              webPixelConfig: e,
              storefrontBaseUrl: o,
            });
            break;
          default:
            throw new Error(`Unsupported runtime context: ${e.runtimeContext}`);
        }
        const d = (function (
            e,
            { uuid: t = Wt, createEncoder: n = Ut, callable: o } = {}
          ) {
            let i = !1,
              r = e;
            const s = new Map(),
              a = new Map(),
              c = (function (e, t) {
                let n;
                if (null == t) {
                  if ("function" != typeof Proxy)
                    throw new Error(
                      "You must pass an array of callable methods in environments without Proxies."
                    );
                  const t = new Map();
                  n = new Proxy(
                    {},
                    {
                      get(n, o) {
                        if (t.has(o)) return t.get(o);
                        const i = e(o);
                        return t.set(o, i), i;
                      },
                    }
                  );
                } else {
                  n = {};
                  for (const o of t)
                    Object.defineProperty(n, o, {
                      value: e(o),
                      writable: !1,
                      configurable: !0,
                      enumerable: !0,
                    });
                }
                return n;
              })(p, o),
              l = n({
                uuid: t,
                release(e) {
                  u(qt, [e]);
                },
                call(e, n, o) {
                  const i = t(),
                    r = f(i, o),
                    [s, a] = l.encode(n);
                  return u(Ft, [i, e, s], a), r;
                },
              });
            return (
              r.addEventListener("message", d),
              {
                call: c,
                replace(e) {
                  const t = r;
                  (r = e),
                    t.removeEventListener("message", d),
                    e.addEventListener("message", d);
                },
                expose(e) {
                  for (const t of Object.keys(e)) {
                    const n = e[t];
                    "function" == typeof n ? s.set(t, n) : s.delete(t);
                  }
                },
                callable(...e) {
                  if (null != o)
                    for (const t of e)
                      Object.defineProperty(c, t, {
                        value: p(t),
                        writable: !1,
                        configurable: !0,
                        enumerable: !0,
                      });
                },
                terminate() {
                  u(zt, void 0), m(), r.terminate && r.terminate();
                },
              }
            );
            function u(e, t, n) {
              i || r.postMessage(t ? [e, t] : [e], n);
            }
            async function d(e) {
              const { data: t } = e;
              if (null != t && Array.isArray(t))
                switch (t[0]) {
                  case zt:
                    m();
                    break;
                  case Vt: {
                    const e = new Rt(),
                      [o, i, r] = t[1],
                      a = s.get(i);
                    try {
                      if (null == a)
                        throw new Error(
                          `No '${i}' method is exposed on this endpoint`
                        );
                      const [t, n] = l.encode(await a(...l.decode(r, [e])));
                      u(Bt, [o, void 0, t], n);
                    } catch (n) {
                      const { name: e, message: t, stack: i } = n;
                      throw (u(Bt, [o, { name: e, message: t, stack: i }]), n);
                    } finally {
                      e.release();
                    }
                    break;
                  }
                  case Bt: {
                    const [e] = t[1];
                    a.get(e)(...t[1]), a.delete(e);
                    break;
                  }
                  case qt: {
                    const [e] = t[1];
                    l.release(e);
                    break;
                  }
                  case Kt: {
                    const [e] = t[1];
                    a.get(e)(...t[1]), a.delete(e);
                    break;
                  }
                  case Ft: {
                    const [e, o, i] = t[1];
                    try {
                      const t = await l.call(o, i),
                        [n, r] = l.encode(t);
                      u(Kt, [e, void 0, n], r);
                    } catch (n) {
                      const { name: t, message: o, stack: i } = n;
                      throw (u(Kt, [e, { name: t, message: o, stack: i }]), n);
                    }
                    break;
                  }
                }
            }
            function p(e) {
              return (...n) => {
                if (i)
                  return Promise.reject(
                    new Error(
                      "You attempted to call a function on a terminated web worker."
                    )
                  );
                if ("string" != typeof e && "number" != typeof e)
                  return Promise.reject(
                    new Error(
                      `Can’t call a symbol method on a remote endpoint: ${e.toString()}`
                    )
                  );
                const o = t(),
                  r = f(o),
                  [s, a] = l.encode(n);
                return u(Vt, [o, e, s], a), r;
              };
            }
            function f(e, t) {
              return new Promise((n, o) => {
                a.set(e, (e, i, r) => {
                  if (null == i) n(r && l.decode(r, t));
                  else {
                    const e = new Error();
                    Object.assign(e, i), o(e);
                  }
                });
              });
            }
            function m() {
              var e;
              (i = !0),
                s.clear(),
                a.clear(),
                null === (e = l.terminate) || void 0 === e || e.call(l),
                r.removeEventListener("message", d);
            }
          })(l, { callable: ["initialize"] }),
          p = en({
            eventBus: t,
            webPixelConfig: e,
            shopId: n,
            surface: s,
            initData: a,
            forRPC: !0,
          }),
          f = {
            self: { origin: { get: async () => self.origin } },
            document: { referrer: { get: async () => document.referrer } },
          },
          m = xt();
        let h = {
          status: "unknown",
          hashVersion: "unknown",
          sandboxUrl: "unknown",
        };
        const b =
          e.runtimeContext === gt.Lax
            ? rn()
            : { localStorageItems: {}, sessionStorageItems: {} };
        try {
          const t = [
            d.call
              .initialize({
                pageTitle: self.document.title,
                webPixelConfig: e,
                shopId: n,
                webPixelApi: p,
                internalApi: f,
                cookie: self.document.cookie,
                cookieRestrictedDomains: Ht(),
                origin: self.origin,
                referrer: self.document.referrer,
                ...b,
              })
              .then((e) => {
                h = e;
              }),
          ];
          u && t.push(u), await Promise.race(t);
        } catch (w) {
          return !1;
        }
        if (r !== h.hashVersion) {
          const t = new Error(
            `The main bundle hash (${r}) does not match the sandbox hash (${h.hashVersion})`
          );
          ye.notify(t, {
            severity: "warning",
            pixelId: e.id,
            pixelType: e.type,
            runtimeContext: e.runtimeContext,
            context: "v0/createSandbox/hashMismatch",
            shopId: n,
            userAgent: m.navigator.userAgent || self.navigator.userAgent,
            hashVersionSandbox: h.hashVersion,
            sandboxUrl: h.sandboxUrl,
          });
        }
        return !0;
      }
      const cn = () => {
        let e, t;
        return {
          promise: new Promise((...n) => {
            [e, t] = n;
          }),
          resolve: e,
          reject: t,
        };
      };
      class ln extends Error {
        constructor(...e) {
          super(...e),
            (this.name = "InvalidExtensionPointError"),
            (this.message = "Invalid Extension Point");
        }
      }
      class un extends Error {
        constructor(...e) {
          super(...e), (this.name = "PixelError");
        }
      }
      const dn = new Map();
      async function pn(t) {
        var n;
        let s = !1;
        const { webPixelConfig: a, eventBus: l, shopId: u, surface: d } = t,
          p = a.id,
          f = a.type.toLowerCase();
        if (a.runtimeContext === gt.Open && ("5de24938", !ue.has("5de24938")))
          return !1;
        var m, h;
        switch (
          (a.restrictions ||
            (a.restrictions = (function (e, t) {
              if (!e) return {};
              const n = (function (e) {
                  return Ot.includes(String(e));
                })(e),
                o = t !== ft.StorefrontRenderer;
              return n && o
                ? {
                    allowedEvents: [],
                    preventLoadingBeforeEvent: `shopify:app:pixels:load:${e}`,
                  }
                : n
                ? { allowedEvents: [] }
                : {};
            })(String(a.apiClientId), d)),
          await Promise.all([
            We(Ke(a.privacyPurposes)),
            ((m = (e, t) =>
              l.subscribe(e, t, {
                pixelRuntimeConfig: { apiClientId: "PIXEL-LOADER" },
              })),
            (h =
              null == (n = a.restrictions)
                ? void 0
                : n.preventLoadingBeforeEvent),
            new Promise((e, t) => {
              void 0 === h
                ? e(!0)
                : m(h, () => {
                    e(!0);
                  });
            })),
          ]),
          Se("pixel:register", "start", { pixelId: p, source: f }),
          a.runtimeContext)
        ) {
          case gt.Lax:
          case gt.Strict:
            s = await an(t);
            break;
          case gt.Open:
            try {
              s = await (async function ({
                webPixelConfig: t,
                eventBus: n,
                shopId: o,
                storefrontBaseUrl: s,
                surface: a,
                initData: l,
              }) {
                var u;
                const { promise: d, resolve: p, reject: f } = cn(),
                  { id: m, type: h } = t,
                  b = `${m}-${h}`.toLowerCase();
                dn.set(b, () => ({
                  webPixelApi: en({
                    eventBus: n,
                    webPixelConfig: t,
                    shopId: o,
                    surface: a,
                    initData: l,
                    forRPC: !0,
                  }),
                  resolve: p,
                  reject: f,
                }));
                const w = s.match(/spin\.dev\/?/),
                  v = [
                    ke(s),
                    `/wpm@${r}`,
                    `/${t.type.toLocaleLowerCase()}`,
                    `/web-pixel-${m}@${t.scriptVersion}`,
                    `/pixel.${i}.js`,
                    w ? "?fast_storefront_renderer=1" : "",
                  ].join("");
                if (
                  !("createShopifyExtend" in (null != (u = self[e]) ? u : {}))
                ) {
                  const t = (e, t) => {
                    const n = dn.get(`${e}-${t}`.toLowerCase());
                    if (!n)
                      return (
                        f(new Error(`No openPixelFn found for ${e}-${t}.`)),
                        null
                      );
                    const { resolve: o, reject: i, webPixelApi: r } = n();
                    return (
                      r || i(new Error(`No api found for pixel ${e}-${t}.`)),
                      Object.freeze({
                        extend: (e, t) => {
                          e !== c && i(new ln());
                          try {
                            t.call(r, r), o(!0);
                          } catch (n) {
                            i(new un(n));
                          }
                        },
                      })
                    );
                  };
                  Object.defineProperty(self, e, {
                    value: {},
                    enumerable: !0,
                    writable: !1,
                    configurable: !1,
                  }),
                    Object.defineProperty(self[e], "createShopifyExtend", {
                      value: t,
                      enumerable: !0,
                      writable: !1,
                      configurable: !1,
                    });
                }
                var g;
                return (
                  await ((g = v),
                  new Promise((e, t) => {
                    try {
                      const n = document.createElement("script");
                      (n.src = g),
                        (n.async = !0),
                        (n.onload = () => {
                          e();
                        }),
                        (n.onerror = () => {
                          o(), t(new Error(`Failed to load script: ${g}`));
                        });
                      const o = () => {
                        (n.onload = null), (n.onerror = null), n.remove();
                      };
                      document.head.appendChild(n);
                    } catch (n) {
                      t(n);
                    }
                  })),
                  d
                );
              })(t);
            } catch (v) {
              s = !1;
            }
            break;
          default:
            throw new Error(`Invalid runtimeContext: ${a.runtimeContext}`);
        }
        const b = yt(a),
          { measurement: w } = Ce("pixel:register", { pixelId: p, source: f });
        return (
          Ue("register", {
            version: o,
            pageUrl: self.location.href,
            shopId: u,
            surface: d,
            pixelId: p,
            pixelAppId: b,
            pixelSource: a.type,
            pixelRuntimeContext: a.runtimeContext,
            pixelScriptVersion: a.scriptVersion,
            pixelConfiguration: null == a ? void 0 : a.configuration,
            pixelEventSchemaVersion: a.eventPayloadVersion,
            status: "registered",
            userCanBeTracked: ee().toString(),
            shopPrefs: "unknown",
            bundleTarget: i,
            errorMsg: "N/A",
            duration: null == w ? void 0 : w.duration,
            startTime: null == w ? void 0 : w.startTime,
            sessionId: nt(),
          }),
          s
        );
      }
      const fn = (function () {
        const e =
          null != (t = self.Shopify) && t.Checkout
            ? ft.Shopify
            : null != (n = self.Shopify) &&
              null != (r = n.analytics) &&
              r.replayQueue
            ? ft.StorefrontRenderer
            : ft.CheckoutOne;
        var t, n, r;
        const s = self.location.href,
          a = Ne("load", {
            version: o,
            bundleTarget: i,
            pageUrl: s,
            status: "loading",
            surface: e,
          }),
          c = {
            publish: () => !1,
            publishCustomEvent: () => !1,
            publishDomEvent: () => !1,
            visitor: () => !1,
            subscribe: () => () => !1,
          };
        try {
          const e = nt();
          return (
            (a.payload.status = "loaded"),
            je(a),
            {
              init(t) {
                if (null !== self.location.href.match(/\/wpm@(.+)\/sandbox/))
                  return c;
                const {
                  shopId: n,
                  surface: r = ft.Unknown,
                  initData: a,
                  enabledBetaFlags: l,
                } = t;
                let { webPixelsConfigList: u } = t || {};
                le();
                const d = self.location.origin;
                Pe(d),
                  (function (e = []) {
                    (Array.isArray(e) ? e : [e]).forEach((e) => ue.add(e));
                  })(l);
                const p = ee().toString(),
                  f = Ne("unload", {
                    version: o,
                    bundleTarget: i,
                    pageUrl: s,
                    shopId: n,
                    surface: r,
                    isCompleted: "false",
                    runtimeErrorCaught: "false",
                    userCanBeTracked: p,
                    sessionId: e,
                  });
                var m;
                (m = f),
                  window.addEventListener("pagehide", () => {
                    var e, t;
                    (m.payload.pageDuration =
                      null == (e = Ce("page:session")) ||
                      null == (t = e.measurement)
                        ? void 0
                        : t.duration),
                      je(m),
                      Ve({ skipXhr: !0 });
                  });
                const h = It(t),
                  b = {
                    severity: "warning",
                    context: "v0/createWebPixelsManager/init",
                    unhandled: !1,
                    shopId: n,
                    initConfig: t,
                  },
                  w = Ne("init", {
                    version: o,
                    bundleTarget: i,
                    pageUrl: s,
                    shopId: n,
                    surface: r,
                    status: "initializing",
                    userCanBeTracked: p,
                  });
                try {
                  var v;
                  if (self.Shopify && !0 === self.Shopify.designMode)
                    return (
                      self.console &&
                        console.log(
                          "[WebPixelsManager] Prevented from executing in the Theme Editor"
                        ),
                      c
                    );
                  if (/^web-pixel-sandbox/.test(self.name)) {
                    const e = new we(
                      "WebPixelsManager: browser library is being run in a sandbox"
                    );
                    throw ((b.library = "browser"), ye.notify(e, b), e);
                  }
                  if (!n) {
                    const e = new we("WebPixelsManager: shopId is required");
                    throw (ye.notify(e, b), e);
                  }
                  if (!d) {
                    const e = new we(
                      "WebPixelsManager: storefrontBaseUrl is required"
                    );
                    throw (ye.notify(e, b), e);
                  }
                  if (
                    !(function (e) {
                      try {
                        return new URL(e), !0;
                      } catch (t) {
                        return (function (e) {
                          const t = new RegExp(
                            "^(https?:\\/\\/)((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)*[a-z]{1,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$",
                            "i"
                          );
                          return Boolean(t.test(e));
                        })(e);
                      }
                    })(d)
                  ) {
                    const e = new we(
                      `WebPixelsManager: storefrontBaseUrl is not a valid absolute URL: ${d}`
                    );
                    throw (ye.notify(e, b), e);
                  }
                  r === ft.CheckoutOneSdk && (u = []);
                  const e = u.reduce(
                    (e, t) => {
                      var o, i;
                      (t.type = t.type.toUpperCase()),
                        (t.runtimeContext =
                          null == (o = t.runtimeContext)
                            ? void 0
                            : o.toUpperCase());
                      const s = pn({
                        webPixelConfig: t,
                        eventBus: h,
                        shopId: n,
                        storefrontBaseUrl: d,
                        surface: r,
                        initData: a,
                      });
                      return (
                        null != (i = t.restrictions) &&
                        i.preventLoadingBeforeEvent
                          ? e.waiting.push(s)
                          : e.ready.push(s),
                        e
                      );
                    },
                    { ready: [], waiting: [] }
                  );
                  Promise.all(e.ready)
                    .then(() =>
                      (function (e) {
                        const { measurement: t } = Ce("completed");
                        (e.payload.isCompleted = "true"),
                          (e.payload.runTimeDuration =
                            null == t ? void 0 : t.duration),
                          (e.payload.startTime =
                            null == t ? void 0 : t.startTime);
                      })(f)
                    )
                    .catch((e) => {
                      self.console && console.error("[Web Pixels]", e);
                    }),
                    Promise.all(e.waiting).catch(() => {}),
                    r !== ft.CheckoutOne &&
                      r !== ft.CheckoutOneSdk &&
                      A(h.publish, a),
                    (w.payload.status = "initialized"),
                    je(w);
                  const t =
                    ((g = {
                      shopId: n,
                      surface: r,
                      pageUrl: s,
                      clientId: de(document.cookie)._shopify_y,
                      version: o,
                      customerId:
                        null == a || null == (v = a.customer) ? void 0 : v.id,
                    }),
                    {
                      visitor: (e, t) =>
                        (function (e, t, n) {
                          const o = (function (e, t) {
                            return e && (e.email || e.phone)
                              ? null != e &&
                                e.email &&
                                "string" != typeof e.email
                                ? {
                                    valid: !1,
                                    error: "Email must be of type string",
                                  }
                                : null != e &&
                                  e.phone &&
                                  "string" != typeof e.phone
                                ? {
                                    valid: !1,
                                    error: "Phone must be of type string",
                                  }
                                : null != t &&
                                  t.appId &&
                                  "string" != typeof t.appId
                                ? {
                                    valid: !1,
                                    error: "appId must be of type string",
                                  }
                                : null != t &&
                                  t.apiClientId &&
                                  "string" != typeof t.apiClientId
                                ? {
                                    valid: !1,
                                    error: "apiClientId must be of type string",
                                  }
                                : { valid: !0 }
                              : {
                                  valid: !1,
                                  error:
                                    "Visitor must have one of phone or email",
                                };
                          })(t, n);
                          if (!o.valid)
                            throw new Ge(
                              o.error || "Invalid input payload to visitorApi"
                            );
                          const i = {
                            ...e,
                            ...t,
                            apiClientId:
                              (null == n ? void 0 : n.appId) ||
                              (null == n ? void 0 : n.apiClientId),
                          };
                          return (
                            We({
                              analytics: !0,
                              marketing: !0,
                              preferences: !1,
                              sale_of_data: !1,
                            })
                              .then(() => Ue("visitor", i))
                              .catch(() =>
                                ye.notify("visitor error", {
                                  severity: "error",
                                  context: `v0/visitor-${e.surface}`,
                                  unhandled: !1,
                                  shopId: e.shopId,
                                })
                              ),
                            !0
                          );
                        })(g, e, t),
                    });
                  return {
                    publish: (e, t, n = {}) => h.publish(e, t, n),
                    publishCustomEvent: (e, t, n = {}) =>
                      h.publishCustomEvent(e, t, n),
                    publishDomEvent: (e, t, n = {}) =>
                      h.publishDomEvent(e, t, n),
                    subscribe: (e, t, o) =>
                      h.subscribe(e, t, {
                        ...o,
                        shopId: n,
                        surface: r,
                        scope:
                          r === ft.CheckoutOneSdk ? mt.CheckoutOneSdk : void 0,
                      }),
                    visitor: (e, n) => t.visitor(e, n),
                  };
                } catch (y) {
                  return (
                    y instanceof we ||
                      ye.notify(y, {
                        context: "v0/init",
                        shopId: n,
                        initConfig: t,
                      }),
                    self.console && console.error(y),
                    (w.payload.status = "failed"),
                    (w.payload.errorMsg = null == y ? void 0 : y.message),
                    je(w),
                    (f.payload.runtimeErrorCaught = "true"),
                    c
                  );
                }
                var g;
              },
            }
          );
        } catch (l) {
          return (
            l instanceof we ||
              ye.notify(l, { context: "v0/createWebPixelsManager" }),
            self.console && console.error(l),
            (a.payload.status = "manager-create-error"),
            (a.payload.errorMsg = null == l ? void 0 : l.message),
            je(a, !0),
            { init: () => c }
          );
        }
      })();
      self[e] = fn;
    })();
})();
