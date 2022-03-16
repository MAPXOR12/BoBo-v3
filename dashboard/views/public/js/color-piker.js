/*!
 * ==============================================================
 *  COLOR PICKER 2.1.6
 * ==============================================================
 * Author: Taufik Nurrohman <https://github.com/taufik-nurrohman>
 * License: MIT
 * --------------------------------------------------------------
 */
((e, t, n) => {
    let r = t.documentElement,
        i = "HEX",
        o = "top",
        u = "right",
        c = "left",
        l = "px",
        f = e.setTimeout,
        s = ["touchstart", "mousedown"],
        a = ["touchmove", "mousemove"],
        d = ["orientationchange", "resize"],
        h = ["touchend", "mouseup"];
    function p(e) {
        let t,
            n,
            r,
            i,
            o,
            u,
            c,
            l,
            f = +e[0],
            s = +e[1],
            a = +e[2];
        switch (((u = a * (1 - s)), (c = a * (1 - (o = 6 * f - (i = Math.floor(6 * f))) * s)), (l = a * (1 - (1 - o) * s)), (i = i || 0), (c = c || 0), (l = l || 0), i % 6)) {
            case 0:
                (t = a), (n = l), (r = u);
                break;
            case 1:
                (t = c), (n = a), (r = u);
                break;
            case 2:
                (t = u), (n = a), (r = l);
                break;
            case 3:
                (t = u), (n = c), (r = a);
                break;
            case 4:
                (t = l), (n = u), (r = a);
                break;
            case 5:
                (t = a), (n = u), (r = c);
        }
        return [L(255 * t), L(255 * n), L(255 * r), w(e[3]) ? +e[3] : 1];
    }
    function g(e) {
        let t,
            n,
            r = +e[0] / 255,
            i = +e[1] / 255,
            o = +e[2] / 255,
            u = Math.max(r, i, o),
            c = Math.min(r, i, o),
            l = u,
            f = u - c;
        if (((n = 0 === u ? 0 : f / u), u === c)) t = 0;
        else {
            switch (u) {
                case r:
                    t = (i - o) / f + (i < o ? 6 : 0);
                    break;
                case i:
                    t = (o - r) / f + 2;
                    break;
                case o:
                    t = (r - i) / f + 4;
            }
            t /= 6;
        }
        return [t, n, l, w(e[3]) ? +e[3] : 1];
    }
    function v(e, t) {
        let n = t.touches ? t.touches[0].clientX : t.clientX,
            r = t.touches ? t.touches[0].clientY : t.clientY,
            i = E(e);
        return [n - i[0], r - i[1]];
    }
    function b(e, t) {
        if (e === t) return e;
        for (; (e = e.parentElement) && e !== t; );
        return e;
    }
    function m(e) {
        e && e.preventDefault();
    }
    function C(e, t, n) {
        for (let r = 0, i = t.length; r < i; ++r) e.removeEventListener(t[r], n, !1);
    }
    function k(e, t, n) {
        for (let r = 0, i = t.length; r < i; ++r) e.addEventListener(t[r], n, !1);
    }
    function y(e) {
        return "function" == typeof e;
    }
    function w(e) {
        return void 0 !== e && null !== e;
    }
    function x(e) {
        return "string" == typeof e;
    }
    function E(t) {
        let n, i, o;
        return t === e ? ((n = e.pageXOffset || r.scrollLeft), (i = e.pageYOffset || r.scrollTop)) : ((n = (o = t.getBoundingClientRect()).left), (i = o.top)), [n, i];
    }
    function P(t) {
        return t === e ? [e.innerWidth, e.innerHeight] : [t.offsetWidth, t.offsetHeight];
    }
    function H(e, t, n) {
        e.style[t] = n;
    }
    function M(e, t) {
        return e < t[0] ? t[0] : e > t[1] ? t[1] : e;
    }
    function O(e, t) {
        return parseInt(e, t || 10);
    }
    function X(e, n, r) {
        return (e = t.createElement(e)), n && n.appendChild(e), r && (e.className = r), e;
    }
    function L(e) {
        return Math.round(e);
    }
    function Y(e, t) {
        return e.toString(t);
    }
    ((e) => {
        (e[i] = (e) => {
            if (x(e)) {
                let t = (e = e.trim()).length;
                if ((4 !== t && 7 !== t) || "#" !== e[0]) {
                    if ((5 === t || 9 === t) && "#" === e[0] && /^#([a-f\d]{3,4}){1,2}$/i.test(e))
                        return 5 === t ? [O(e[1] + e[1], 16), O(e[2] + e[2], 16), O(e[3] + e[3], 16), O(e[4] + e[4], 16) / 255] : [O(e[1] + e[2], 16), O(e[3] + e[4], 16), O(e[5] + e[6], 16), O(e[7] + e[8], 16) / 255];
                } else if (/^#([a-f\d]{3}){1,2}$/i.test(e)) return 4 === t ? [O(e[1] + e[1], 16), O(e[2] + e[2], 16), O(e[3] + e[3], 16), 1] : [O(e[1] + e[2], 16), O(e[3] + e[4], 16), O(e[5] + e[6], 16), 1];
                return [0, 0, 0, 1];
            }
            return "#" + ("000000" + Y(+e[2] | (+e[1] << 8) | (+e[0] << 16), 16)).slice(-6) + (w(e[3]) && e[3] < 1 ? Y(L(255 * e[3]) + 65536, 16).substr(-2) : "");
        }),
            (e.instances = {}),
            (e.state = { class: "color-picker", color: i, parent: null }),
            (e.version = "2.1.6");
    })(
        (e.CP = function (n, O) {
            if (!n) return;
            let L = this,
                Y = e.CP,
                I = {},
                N = Object.assign({}, Y.state, x(O) ? { color: O } : O || {}),
                T = N.class,
                W = X("div", 0, T);
            if (n.CP) return L;
            if (!(L instanceof Y)) return new Y(n, O);
            (Y.instances[n.id || n.name || Object.keys(Y.instances).length] = L), (n.CP = 1), (L.visible = !1);
            let $,
                z,
                B,
                D,
                R = t.body,
                S = le(),
                q = g(S),
                A = X("div", W),
                F = X("div", A, T + ":sv"),
                G = X("div", A, T + ":h"),
                J = X("div", A, T + ":a"),
                K = X("div", F),
                Q = (X("div", F), X("div", F), X("i", F)),
                U = (X("div", G), X("i", G)),
                V = X("div", J),
                Z = (X("div", J), X("i", J)),
                _ = 0,
                ee = 0,
                te = 0,
                ne = 0,
                re = 0,
                ie = 0;
            function oe(e) {
                if (I.focus) ue("focus", S);
                else {
                    let t = e.target;
                    n === b(t, n) ? !ce() && $(N.parent) : z();
                }
            }
            function ue(e, t) {
                if (!w(I[e])) return L;
                for (let n = 0, r = I[e].length; n < r; ++n) I[e][n].apply(L, t);
                return L;
            }
            function ce() {
                return W.parentNode;
            }
            function le(e) {
                let t,
                    r = Y[y(Y[N.color]) ? N.color : i];
                return (t = n.dataset.color) ? (w(e) ? (n.dataset.color = r(t)) : r(t)) : (t = n.value) ? (w(e) ? (n.value = r(t)) : r(t)) : (t = n.textContent) ? (w(e) ? (n.textContent = r(t)) : r(t)) : w(e) ? void 0 : [0, 0, 0, 1];
            }
            !(function i(y, x) {
                (q = g((S = le()))),
                    y || ((x || N.parent || R).appendChild(W), (L.visible = !0)),
                    ($ = (e) => (i(0, e), ue("enter", S), L)),
                    (z = () => {
                        let n = ce();
                        return n && (n.removeChild(W), (L.current = null), (L.visible = !1)), C(F, s, ge), C(G, s, ve), C(J, s, be), C(t, a, he), C(t, h, pe), C(e, d, D), ue("exit", S), L;
                    }),
                    (B = (t) => {
                        let i = P(e),
                            u = P(r),
                            f = i[0] - u[0],
                            s = i[1] - r.clientHeight,
                            a = E(e),
                            d = E(n),
                            h = P(W),
                            p = h[0],
                            g = h[1],
                            v = d[0] + a[0],
                            b = d[1] + a[1] + P(n)[1];
                        if ("object" == typeof t) w(t[0]) && (v = t[0]), w(t[1]) && (b = t[1]);
                        else {
                            let e = a[0],
                                t = a[1],
                                n = a[0] + i[0] - p - f,
                                r = a[1] + i[1] - g - s;
                            (v = M(v, [e, n]) >> 0), (b = M(b, [t, r]) >> 0);
                        }
                        return H(W, c, v + l), H(W, o, b + l), ue("fit", S), L;
                    }),
                    (D = () => B());
                let j = P(F),
                    O = j[0],
                    X = j[1],
                    Y = P(Q),
                    T = Y[0],
                    A = Y[1],
                    fe = P(G)[1],
                    se = P(U)[1],
                    ae = P(J)[1],
                    de = P(Z)[1];
                function he(e) {
                    ne &&
                        (function (e) {
                            let t = v(F, e),
                                n = M(t[0], [0, O]),
                                r = M(t[1], [0, X]);
                            (q[1] = 1 - (O - n) / O), (q[2] = (X - r) / X), me();
                        })(e),
                        re &&
                            (function (e) {
                                (q[0] = (fe - M(v(G, e)[1], [0, fe])) / fe), me();
                            })(e),
                        ie &&
                            (function (e) {
                                (q[3] = (ae - M(v(J, e)[1], [0, ae])) / ae), me();
                            })(e),
                        (S = p(q)),
                        (ne || re || ie) && (ue(_ || ee || te ? "start" : "drag", S), ue("change", S)),
                        (_ = ee = te = 0);
                }
                function pe(e) {
                    S = p(q);
                    let t = e.target,
                        r = n === b(t, n),
                        i = W === b(t, W);
                    (L.current = null), r || i ? i && (ne || re || ie) && ue("stop", S) : I.blur ? ue("blur", S) : ce() && z(), (ne = re = ie = 0);
                }
                function ge(e) {
                    (L.current = F), (_ = ne = 1), he(e), m(e);
                }
                function ve(e) {
                    (L.current = G), (ee = re = 1), he(e), m(e);
                }
                function be(e) {
                    (L.current = J), (te = ie = 1), he(e), m(e);
                }
                function me() {
                    var e;
                    w((e = q)[1]) && H(Q, u, O - T / 2 - O * +e[1] + l), w(e[2]) && H(Q, o, X - A / 2 - X * +e[2] + l), w(e[0]) && H(U, o, fe - se / 2 - fe * +e[0] + l), w(e[3]) && H(Z, o, ae - de / 2 - ae * +e[3] + l);
                    let t = p(q),
                        n = p([q[0], 1, 1]);
                    H(K, "backgroundColor", "rgb(" + n[0] + "," + n[1] + "," + n[2] + ")"), H(V, "backgroundImage", "linear-gradient(rgb(" + t[0] + "," + t[1] + "," + t[2] + "),transparent)");
                }
                y
                    ? (k(n, s, oe),
                      f(() => {
                          ue("change", S);
                      }, 1))
                    : (k(F, s, ge), k(G, s, ve), k(J, s, be), k(t, a, he), k(t, h, pe), k(e, d, D), B()),
                    (L.get = () => le()),
                    (L.set = (e, t, n, r) => ((q = g([e, t, n, r])), me(), L)),
                    me();
            })(1),
                (L.color = (e, t, n, r) => Y[y(Y[N.color]) ? N.color : i]([e, t, n, r])),
                (L.current = null),
                (L.enter = $),
                (L.exit = z),
                (L.fire = ue),
                (L.fit = B),
                (L.hooks = I),
                (L.off = function (e, t) {
                    if (!w(e)) return (I = {}), L;
                    if (w(I[e]))
                        if (w(t)) {
                            for (let n = 0, r = I[e].length; n < r; ++n) t === I[e][n] && I[e].splice(n, 1);
                            0 === j && delete I[e];
                        } else delete I[e];
                    return L;
                }),
                (L.on = function (e, t) {
                    return w(I[e]) || (I[e] = []), w(t) && I[e].push(t), L;
                }),
                (L.pop = () => (n.CP ? (delete n.CP, C(n, s, oe), z(), ue("pop", S)) : L)),
                (L.self = W),
                (L.source = n),
                (L.state = N),
                (L.value = (e, t, n, r) => (L.set(e, t, n, r), ue("change", [e, t, n, r])));
        })
    );
})(window, document);