define("zepto", function(require, exports, module) {
	var _cacheThisModule_, Zepto = function() {
		function O(e) {
			return e == null ? String(e) : T[N.call(e)] || "object"
		}

		function M(e) {
			return O(e) == "function"
		}

		function _(e) {
			return e != null && e == e.window
		}

		function D(e) {
			return e != null && e.nodeType == e.DOCUMENT_NODE
		}

		function P(e) {
			return O(e) == "object"
		}

		function H(e) {
			return P(e) && !_(e) && Object.getPrototypeOf(e) == Object.prototype
		}

		function B(e) {
			return e instanceof Array
		}

		function j(e) {
			return typeof e.length == "number"
		}

		function F(e) {
			return o.call(e, function(e) {
				return e != null
			})
		}

		function I(e) {
			return e.length > 0 ? n.fn.concat.apply([], e) : e
		}

		function q(e) {
			return e.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase()
		}

		function R(e) {
			return e in f ? f[e] : f[e] = new RegExp("(^|\\s)" + e + "(\\s|$)")
		}

		function U(e, t) {
			return typeof t == "number" && !l[q(e)] ? t + "px" : t
		}

		function z(e) {
			var t, n;
			return a[e] || (t = u.createElement(e), u.body.appendChild(t), n = getComputedStyle(t, "").getPropertyValue("display"), t.parentNode.removeChild(t), n == "none" && (n = "block"), a[e] = n), a[e]
		}

		function W(e) {
			return "children" in e ? s.call(e.children) : n.map(e.childNodes, function(e) {
				if (e.nodeType == 1) return e
			})
		}

		function X(n, r, i) {
			for (t in r) i && (H(r[t]) || B(r[t])) ? (H(r[t]) && !H(n[t]) && (n[t] = {}), B(r[t]) && !B(n[t]) && (n[t] = []), X(n[t], r[t], i)) : r[t] !== e && (n[t] = r[t])
		}

		function V(e, t) {
			return t == null ? n(e) : n(e).filter(t)
		}

		function $(e, t, n, r) {
			return M(t) ? t.call(e, n, r) : t
		}

		function J(e, t, n) {
			n == null ? e.removeAttribute(t) : e.setAttribute(t, n)
		}

		function K(t, n) {
			var r = t.className,
				i = r && r.baseVal !== e;
			if (n === e) return i ? r.baseVal : r;
			i ? r.baseVal = n : t.className = n
		}

		function Q(e) {
			var t;
			try {
				return e ? e == "true" || (e == "false" ? !1 : e == "null" ? null : isNaN(t = Number(e)) ? /^[\[\{]/.test(e) ? n.parseJSON(e) : e : t) : e
			} catch (r) {
				return e
			}
		}

		function G(e, t) {
			t(e);
			for (var n in e.childNodes) G(e.childNodes[n], t)
		}
		var e, t, n, r, i = [],
			s = i.slice,
			o = i.filter,
			u = window.document,
			a = {},
			f = {},
			l = {
				"column-count": 1,
				columns: 1,
				"font-weight": 1,
				"line-height": 1,
				opacity: 1,
				"z-index": 1,
				zoom: 1
			},
			c = /^\s*<(\w+|!)[^>]*>/,
			h = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
			p = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
			d = /^(?:body|html)$/i,
			v = ["val", "css", "html", "text", "data", "width", "height", "offset"],
			m = ["after", "prepend", "before", "append"],
			g = u.createElement("table"),
			y = u.createElement("tr"),
			b = {
				tr: u.createElement("tbody"),
				tbody: g,
				thead: g,
				tfoot: g,
				td: y,
				th: y,
				"*": u.createElement("div")
			},
			w = /complete|loaded|interactive/,
			E = /^\.([\w-]+)$/,
			S = /^#([\w-]*)$/,
			x = /^[\w-]+$/,
			T = {},
			N = T.toString,
			C = {},
			k, L, A = u.createElement("div");
		return C.matches = function(e, t) {
			if (!e || e.nodeType !== 1) return !1;
			var n = e.webkitMatchesSelector || e.mozMatchesSelector || e.oMatchesSelector || e.matchesSelector;
			if (n) return n.call(e, t);
			var r, i = e.parentNode,
				s = !i;
			return s && (i = A).appendChild(e), r = ~C.qsa(i, t).indexOf(e), s && A.removeChild(e), r
		}, k = function(e) {
			return e.replace(/-+(.)?/g, function(e, t) {
				return t ? t.toUpperCase() : ""
			})
		}, L = function(e) {
			return o.call(e, function(t, n) {
				return e.indexOf(t) == n
			})
		}, C.fragment = function(t, r, i) {
			var o, a, f;
			return h.test(t) && (o = n(u.createElement(RegExp.$1))), o || (t.replace && (t = t.replace(p, "<$1></$2>")), r === e && (r = c.test(t) && RegExp.$1), r in b || (r = "*"), f = b[r], f.innerHTML = "" + t, o = n.each(s.call(f.childNodes), function() {
				f.removeChild(this)
			})), H(i) && (a = n(o), n.each(i, function(e, t) {
				v.indexOf(e) > -1 ? a[e](t) : a.attr(e, t)
			})), o
		}, C.Z = function(e, t) {
			return e = e || [], e.__proto__ = n.fn, e.selector = t || "", e
		}, C.isZ = function(e) {
			return e instanceof C.Z
		}, C.init = function(t, r) {
			if (!t) return C.Z();
			if (M(t)) return n(u).ready(t);
			if (C.isZ(t)) return t;
			var i;
			if (B(t)) i = F(t);
			else if (P(t)) i = [t], t = null;
			else if (c.test(t)) i = C.fragment(t.trim(), RegExp.$1, r), t = null;
			else {
				if (r !== e) return n(r).find(t);
				i = C.qsa(u, t)
			}
			return C.Z(i, t)
		}, n = function(e, t) {
			return C.init(e, t)
		}, n.extend = function(e) {
			var t, n = s.call(arguments, 1);
			return typeof e == "boolean" && (t = e, e = n.shift()), n.forEach(function(n) {
				X(e, n, t)
			}), e
		}, C.qsa = function(e, t) {
			var n;
			return D(e) && S.test(t) ? (n = e.getElementById(RegExp.$1)) ? [n] : [] : e.nodeType !== 1 && e.nodeType !== 9 ? [] : s.call(E.test(t) ? e.getElementsByClassName(RegExp.$1) : x.test(t) ? e.getElementsByTagName(t) : e.querySelectorAll(t))
		}, n.contains = function(e, t) {
			return e !== t && e.contains(t)
		}, n.type = O, n.isFunction = M, n.isWindow = _, n.isArray = B, n.isPlainObject = H, n.isEmptyObject = function(e) {
			var t;
			for (t in e) return !1;
			return !0
		}, n.inArray = function(e, t, n) {
			return i.indexOf.call(t, e, n)
		}, n.camelCase = k, n.trim = function(e) {
			return e == null ? "" : String.prototype.trim.call(e)
		}, n.uuid = 0, n.support = {}, n.expr = {}, n.map = function(e, t) {
			var n, r = [],
				i, s;
			if (j(e))
				for (i = 0; i < e.length; i++) n = t(e[i], i), n != null && r.push(n);
			else
				for (s in e) n = t(e[s], s), n != null && r.push(n);
			return I(r)
		}, n.each = function(e, t) {
			var n, r;
			if (j(e)) {
				for (n = 0; n < e.length; n++)
					if (t.call(e[n], n, e[n]) === !1) return e
			} else
				for (r in e)
					if (t.call(e[r], r, e[r]) === !1) return e;
			return e
		}, n.grep = function(e, t) {
			return o.call(e, t)
		}, window.JSON && (n.parseJSON = JSON.parse), n.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(e, t) {
			T["[object " + t + "]"] = t.toLowerCase()
		}), n.fn = {
			forEach: i.forEach,
			reduce: i.reduce,
			push: i.push,
			sort: i.sort,
			indexOf: i.indexOf,
			concat: i.concat,
			map: function(e) {
				return n(n.map(this, function(t, n) {
					return e.call(t, n, t)
				}))
			},
			slice: function() {
				return n(s.apply(this, arguments))
			},
			ready: function(e) {
				return w.test(u.readyState) ? e(n) : u.addEventListener("DOMContentLoaded", function() {
					e(n)
				}, !1), this
			},
			get: function(t) {
				return t === e ? s.call(this) : this[t >= 0 ? t : t + this.length]
			},
			toArray: function() {
				return this.get()
			},
			size: function() {
				return this.length
			},
			remove: function() {
				return this.each(function() {
					this.parentNode != null && this.parentNode.removeChild(this)
				})
			},
			each: function(e) {
				return i.every.call(this, function(t, n) {
					return e.call(t, n, t) !== !1
				}), this
			},
			filter: function(e) {
				return M(e) ? this.not(this.not(e)) : n(o.call(this, function(t) {
					return C.matches(t, e)
				}))
			},
			add: function(e, t) {
				return n(L(this.concat(n(e, t))))
			},
			is: function(e) {
				return this.length > 0 && C.matches(this[0], e)
			},
			not: function(t) {
				var r = [];
				if (M(t) && t.call !== e) this.each(function(e) {
					t.call(this, e) || r.push(this)
				});
				else {
					var i = typeof t == "string" ? this.filter(t) : j(t) && M(t.item) ? s.call(t) : n(t);
					this.forEach(function(e) {
						i.indexOf(e) < 0 && r.push(e)
					})
				}
				return n(r)
			},
			has: function(e) {
				return this.filter(function() {
					return P(e) ? n.contains(this, e) : n(this).find(e).size()
				})
			},
			eq: function(e) {
				return e === -1 ? this.slice(e) : this.slice(e, +e + 1)
			},
			first: function() {
				var e = this[0];
				return e && !P(e) ? e : n(e)
			},
			last: function() {
				var e = this[this.length - 1];
				return e && !P(e) ? e : n(e)
			},
			find: function(e) {
				var t, r = this;
				return typeof e == "object" ? t = n(e).filter(function() {
					var e = this;
					return i.some.call(r, function(t) {
						return n.contains(t, e)
					})
				}) : this.length == 1 ? t = n(C.qsa(this[0], e)) : t = this.map(function() {
					return C.qsa(this, e)
				}), t
			},
			closest: function(e, t) {
				var r = this[0],
					i = !1;
				typeof e == "object" && (i = n(e));
				while (r && !(i ? i.indexOf(r) >= 0 : C.matches(r, e))) r = r !== t && !D(r) && r.parentNode;
				return n(r)
			},
			parents: function(e) {
				var t = [],
					r = this;
				while (r.length > 0) r = n.map(r, function(e) {
					if ((e = e.parentNode) && !D(e) && t.indexOf(e) < 0) return t.push(e), e
				});
				return V(t, e)
			},
			parent: function(e) {
				return V(L(this.pluck("parentNode")), e)
			},
			children: function(e) {
				return V(this.map(function() {
					return W(this)
				}), e)
			},
			contents: function() {
				return this.map(function() {
					return s.call(this.childNodes)
				})
			},
			siblings: function(e) {
				return V(this.map(function(e, t) {
					return o.call(W(t.parentNode), function(e) {
						return e !== t
					})
				}), e)
			},
			empty: function() {
				return this.each(function() {
					this.innerHTML = ""
				})
			},
			pluck: function(e) {
				return n.map(this, function(t) {
					return t[e]
				})
			},
			show: function() {
				return this.each(function() {
					this.style.display == "none" && (this.style.display = ""), getComputedStyle(this, "").getPropertyValue("display") == "none" && (this.style.display = z(this.nodeName))
				})
			},
			replaceWith: function(e) {
				return this.before(e).remove()
			},
			wrap: function(e) {
				var t = M(e);
				if (this[0] && !t) var r = n(e).get(0),
					i = r.parentNode || this.length > 1;
				return this.each(function(s) {
					n(this).wrapAll(t ? e.call(this, s) : i ? r.cloneNode(!0) : r)
				})
			},
			wrapAll: function(e) {
				if (this[0]) {
					n(this[0]).before(e = n(e));
					var t;
					while ((t = e.children()).length) e = t.first();
					n(e).append(this)
				}
				return this
			},
			wrapInner: function(e) {
				var t = M(e);
				return this.each(function(r) {
					var i = n(this),
						s = i.contents(),
						o = t ? e.call(this, r) : e;
					s.length ? s.wrapAll(o) : i.append(o)
				})
			},
			unwrap: function() {
				return this.parent().each(function() {
					n(this).replaceWith(n(this).children())
				}), this
			},
			clone: function() {
				return this.map(function() {
					return this.cloneNode(!0)
				})
			},
			hide: function() {
				return this.css("display", "none")
			},
			toggle: function(t) {
				return this.each(function() {
					var r = n(this);
					(t === e ? r.css("display") == "none" : t) ? r.show(): r.hide()
				})
			},
			prev: function(e) {
				return n(this.pluck("previousElementSibling")).filter(e || "*")
			},
			next: function(e) {
				return n(this.pluck("nextElementSibling")).filter(e || "*")
			},
			html: function(e) {
				return arguments.length === 0 ? this.length > 0 ? this[0].innerHTML : null : this.each(function(t) {
					var r = this.innerHTML;
					n(this).empty().append($(this, e, t, r))
				})
			},
			text: function(t) {
				return arguments.length === 0 ? this.length > 0 ? this[0].textContent : null : this.each(function() {
					this.textContent = t === e ? "" : "" + t
				})
			},
			attr: function(n, r) {
				var i;
				return typeof n == "string" && r === e ? this.length == 0 || this[0].nodeType !== 1 ? e : n == "value" && this[0].nodeName == "INPUT" ? this.val() : !(i = this[0].getAttribute(n)) && n in this[0] ? this[0][n] : i : this.each(function(e) {
					if (this.nodeType !== 1) return;
					if (P(n))
						for (t in n) J(this, t, n[t]);
					else J(this, n, $(this, r, e, this.getAttribute(n)))
				})
			},
			removeAttr: function(e) {
				return this.each(function() {
					this.nodeType === 1 && J(this, e)
				})
			},
			prop: function(t, n) {
				return n === e ? this[0] && this[0][t] : this.each(function(e) {
					this[t] = $(this, n, e, this[t])
				})
			},
			data: function(t, n) {
				var r = this.attr("data-" + q(t), n);
				return r !== null ? Q(r) : e
			},
			val: function(e) {
				return arguments.length === 0 ? this[0] && (this[0].multiple ? n(this[0]).find("option").filter(function(e) {
					return this.selected
				}).pluck("value") : this[0].value) : this.each(function(t) {
					this.value = $(this, e, t, this.value)
				})
			},
			offset: function(e) {
				if (e) return this.each(function(t) {
					var r = n(this),
						i = $(this, e, t, r.offset()),
						s = r.offsetParent().offset(),
						o = {
							top: i.top - s.top,
							left: i.left - s.left
						};
					r.css("position") == "static" && (o.position = "relative"), r.css(o)
				});
				if (this.length == 0) return null;
				var t = this[0].getBoundingClientRect();
				return {
					left: t.left + window.pageXOffset,
					top: t.top + window.pageYOffset,
					width: Math.round(t.width),
					height: Math.round(t.height)
				}
			},
			css: function(e, r) {
				if (arguments.length < 2) {
					var i = this[0],
						s = getComputedStyle(i, "");
					if (!i) return;
					if (typeof e == "string") return i.style[k(e)] || s.getPropertyValue(e);
					if (B(e)) {
						var o = {};
						return n.each(B(e) ? e : [e], function(e, t) {
							o[t] = i.style[k(t)] || s.getPropertyValue(t)
						}), o
					}
				}
				var u = "";
				if (O(e) == "string") !r && r !== 0 ? this.each(function() {
					this.style.removeProperty(q(e))
				}) : u = q(e) + ":" + U(e, r);
				else
					for (t in e) !e[t] && e[t] !== 0 ? this.each(function() {
						this.style.removeProperty(q(t))
					}) : u += q(t) + ":" + U(t, e[t]) + ";";
				return this.each(function() {
					this.style.cssText += ";" + u
				})
			},
			index: function(e) {
				return e ? this.indexOf(n(e)[0]) : this.parent().children().indexOf(this[0])
			},
			hasClass: function(e) {
				return i.some.call(this, function(e) {
					return this.test(K(e))
				}, R(e))
			},
			addClass: function(e) {
				return this.each(function(t) {
					r = [];
					var i = K(this),
						s = $(this, e, t, i);
					s.split(/\s+/g).forEach(function(e) {
						n(this).hasClass(e) || r.push(e)
					}, this), r.length && K(this, i + (i ? " " : "") + r.join(" "))
				})
			},
			removeClass: function(t) {
				return this.each(function(n) {
					if (t === e) return K(this, "");
					r = K(this), $(this, t, n, r).split(/\s+/g).forEach(function(e) {
						r = r.replace(R(e), " ")
					}), K(this, r.trim())
				})
			},
			toggleClass: function(t, r) {
				return this.each(function(i) {
					var s = n(this),
						o = $(this, t, i, K(this));
					o.split(/\s+/g).forEach(function(t) {
						(r === e ? !s.hasClass(t) : r) ? s.addClass(t): s.removeClass(t)
					})
				})
			},
			scrollTop: function(t) {
				if (!this.length) return;
				var n = "scrollTop" in this[0];
				return t === e ? n ? this[0].scrollTop : this[0].pageYOffset : this.each(n ? function() {
					this.scrollTop = t
				} : function() {
					this.scrollTo(this.scrollX, t)
				})
			},
			position: function() {
				if (!this.length) return;
				var e = this[0],
					t = this.offsetParent(),
					r = this.offset(),
					i = d.test(t[0].nodeName) ? {
						top: 0,
						left: 0
					} : t.offset();
				return r.top -= parseFloat(n(e).css("margin-top")) || 0, r.left -= parseFloat(n(e).css("margin-left")) || 0, i.top += parseFloat(n(t[0]).css("border-top-width")) || 0, i.left += parseFloat(n(t[0]).css("border-left-width")) || 0, {
					top: r.top - i.top,
					left: r.left - i.left
				}
			},
			offsetParent: function() {
				return this.map(function() {
					var e = this.offsetParent || u.body;
					while (e && !d.test(e.nodeName) && n(e).css("position") == "static") e = e.offsetParent;
					return e
				})
			}
		}, n.fn.detach = n.fn.remove, ["width", "height"].forEach(function(t) {
			var r = t.replace(/./, function(e) {
				return e[0].toUpperCase()
			});
			n.fn[t] = function(i) {
				var s, o = this[0];
				return i === e ? _(o) ? o["inner" + r] : D(o) ? o.documentElement["scroll" + r] : (s = this.offset()) && s[t] : this.each(function(e) {
					o = n(this), o.css(t, $(this, i, e, o[t]()))
				})
			}
		}), m.forEach(function(e, t) {
			var r = t % 2;
			n.fn[e] = function() {
				var e, i = n.map(arguments, function(t) {
						return e = O(t), e == "object" || e == "array" || t == null ? t : C.fragment(t)
					}),
					s, o = this.length > 1;
				return i.length < 1 ? this : this.each(function(e, u) {
					s = r ? u : u.parentNode, u = t == 0 ? u.nextSibling : t == 1 ? u.firstChild : t == 2 ? u : null, i.forEach(function(e) {
						if (o) e = e.cloneNode(!0);
						else if (!s) return n(e).remove();
						G(s.insertBefore(e, u), function(e) {
							e.nodeName != null && e.nodeName.toUpperCase() === "SCRIPT" && (!e.type || e.type === "text/javascript") && !e.src && window.eval.call(window, e.innerHTML)
						})
					})
				})
			}, n.fn[r ? e + "To" : "insert" + (t ? "Before" : "After")] = function(t) {
				return n(t)[e](this), this
			}
		}), C.Z.prototype = n.fn, C.uniq = L, C.deserializeValue = Q, n.zepto = C, window.$ = n
	}();
	return function(e) {
			"__proto__" in {} || e.extend(e.zepto, {
				Z: function(t, n) {
					return t = t || [], e.extend(t, e.fn), t.selector = n || "", t.__Z = !0, t
				},
				isZ: function(t) {
					return e.type(t) === "array" && "__Z" in t
				}
			});
			try {
				getComputedStyle(undefined)
			} catch (t) {
				var n = getComputedStyle;
				window.getComputedStyle = function(e) {
					try {
						return n(e)
					} catch (t) {
						return null
					}
				}
			}
		}(Zepto),
		function($) {
			function triggerAndReturn(e, t, n) {
				var r = $.Event(t);
				return $(e).trigger(r, n), !r.isDefaultPrevented()
			}

			function triggerGlobal(e, t, n, r) {
				if (e.global) return triggerAndReturn(t || document, n, r)
			}

			function ajaxStart(e) {
				e.global && $.active++ === 0 && triggerGlobal(e, null, "ajaxStart")
			}

			function ajaxStop(e) {
				e.global && !--$.active && triggerGlobal(e, null, "ajaxStop")
			}

			function ajaxBeforeSend(e, t) {
				var n = t.context;
				if (t.beforeSend.call(n, e, t) === !1 || triggerGlobal(t, n, "ajaxBeforeSend", [e, t]) === !1) return !1;
				triggerGlobal(t, n, "ajaxSend", [e, t])
			}

			function ajaxSuccess(e, t, n, r) {
				var i = n.context,
					s = "success";
				n.success.call(i, e, s, t), r && r.resolveWith(i, [e, s, t]), triggerGlobal(n, i, "ajaxSuccess", [t, n, e]), ajaxComplete(s, t, n)
			}

			function ajaxError(e, t, n, r, i) {
				var s = r.context;
				r.error.call(s, n, t, e), i && i.rejectWith(s, [n, t, e]), triggerGlobal(r, s, "ajaxError", [n, r, e || t]), ajaxComplete(t, n, r)
			}

			function ajaxComplete(e, t, n) {
				var r = n.context;
				n.complete.call(r, t, e), triggerGlobal(n, r, "ajaxComplete", [t, n]), ajaxStop(n)
			}

			function empty() {}

			function mimeToDataType(e) {
				return e && (e = e.split(";", 2)[0]), e && (e == htmlType ? "html" : e == jsonType ? "json" : scriptTypeRE.test(e) ? "script" : xmlTypeRE.test(e) && "xml") || "text"
			}

			function appendQuery(e, t) {
				return t == "" ? e : (e + "&" + t).replace(/[&?]{1,2}/, "?")
			}

			function serializeData(e) {
				e.processData && e.data && $.type(e.data) != "string" && (e.data = $.param(e.data, e.traditional)), e.data && (!e.type || e.type.toUpperCase() == "GET") && (e.url = appendQuery(e.url, e.data), e.data = undefined)
			}

			function parseArguments(e, t, n, r) {
				return $.isFunction(t) && (r = n, n = t, t = undefined), $.isFunction(n) || (r = n, n = undefined), {
					url: e,
					data: t,
					success: n,
					dataType: r
				}
			}

			function serialize(e, t, n, r) {
				var i, s = $.isArray(t),
					o = $.isPlainObject(t);
				$.each(t, function(t, u) {
					i = $.type(u), r && (t = n ? r : r + "[" + (o || i == "object" || i == "array" ? t : "") + "]"), !r && s ? e.add(u.name, u.value) : i == "array" || !n && i == "object" ? serialize(e, u, n, t) : e.add(t, u)
				})
			}
			var jsonpID = 0,
				document = window.document,
				key, name, rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
				scriptTypeRE = /^(?:text|application)\/javascript/i,
				xmlTypeRE = /^(?:text|application)\/xml/i,
				jsonType = "application/json",
				htmlType = "text/html",
				blankRE = /^\s*$/;
			$.active = 0, $.ajaxJSONP = function(e, t) {
				if ("type" in e) {
					var n = e.jsonpCallback,
						r = ($.isFunction(n) ? n() : n) || "jsonp" + ++jsonpID,
						i = document.createElement("script"),
						s = window[r],
						o, u = function(e) {
							$(i).triggerHandler("error", e || "abort")
						},
						a = {
							abort: u
						},
						f;
					return t && t.promise(a), $(i).on("load error", function(n, u) {
						clearTimeout(f), $(i).off().remove(), n.type == "error" || !o ? ajaxError(null, u || "error", a, e, t) : ajaxSuccess(o[0], a, e, t), window[r] = s, o && $.isFunction(s) && s(o[0]), s = o = undefined
					}), ajaxBeforeSend(a, e) === !1 ? (u("abort"), a) : (window[r] = function() {
						o = arguments
					}, i.src = e.url.replace(/\?(.+)=\?/, "?$1=" + r), document.head.appendChild(i), e.timeout > 0 && (f = setTimeout(function() {
						u("timeout")
					}, e.timeout)), a)
				}
				return $.ajax(e)
			}, $.ajaxSettings = {
				type: "GET",
				beforeSend: empty,
				success: empty,
				error: empty,
				complete: empty,
				context: null,
				global: !0,
				xhr: function() {
					return new window.XMLHttpRequest
				},
				accepts: {
					script: "text/javascript, application/javascript, application/x-javascript",
					json: jsonType,
					xml: "application/xml, text/xml",
					html: htmlType,
					text: "text/plain"
				},
				crossDomain: !1,
				timeout: 0,
				processData: !0,
				cache: !0
			}, $.ajax = function(options) {
				var settings = $.extend({}, options || {}),
					deferred = $.Deferred && $.Deferred();
				for (key in $.ajaxSettings) settings[key] === undefined && (settings[key] = $.ajaxSettings[key]);
				ajaxStart(settings), settings.crossDomain || (settings.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(settings.url) && RegExp.$2 != window.location.host), settings.url || (settings.url = window.location.toString()), serializeData(settings);
				var dataType = settings.dataType,
					hasPlaceholder = /\?.+=\?/.test(settings.url);
				hasPlaceholder && (dataType = "jsonp");
				if (settings.cache === !1 || (!options || options.cache !== !0) && ("script" == dataType || "jsonp" == dataType)) settings.url = appendQuery(settings.url, "_=" + Date.now());
				if ("jsonp" == dataType) return hasPlaceholder || (settings.url = appendQuery(settings.url, settings.jsonp ? settings.jsonp + "=?" : settings.jsonp === !1 ? "" : "callback=?")), $.ajaxJSONP(settings, deferred);
				var mime = settings.accepts[dataType],
					headers = {},
					setHeader = function(e, t) {
						headers[e.toLowerCase()] = [e, t]
					},
					protocol = /^([\w-]+:)\/\//.test(settings.url) ? RegExp.$1 : window.location.protocol,
					xhr = settings.xhr(),
					nativeSetHeader = xhr.setRequestHeader,
					abortTimeout;
				deferred && deferred.promise(xhr), settings.crossDomain || setHeader("X-Requested-With", "XMLHttpRequest"), setHeader("Accept", mime || "*/*");
				if (mime = settings.mimeType || mime) mime.indexOf(",") > -1 && (mime = mime.split(",", 2)[0]), xhr.overrideMimeType && xhr.overrideMimeType(mime);
				(settings.contentType || settings.contentType !== !1 && settings.data && settings.type.toUpperCase() != "GET") && setHeader("Content-Type", settings.contentType || "application/x-www-form-urlencoded");
				if (settings.headers)
					for (name in settings.headers) setHeader(name, settings.headers[name]);
				xhr.setRequestHeader = setHeader, xhr.onreadystatechange = function() {
					if (xhr.readyState == 4) {
						xhr.onreadystatechange = empty, clearTimeout(abortTimeout);
						var result, error = !1;
						if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304 || xhr.status == 0 && protocol == "file:") {
							dataType = dataType || mimeToDataType(settings.mimeType || xhr.getResponseHeader("content-type")), result = xhr.responseText;
							try {
								dataType == "script" ? (1, eval)(result) : dataType == "xml" ? result = xhr.responseXML : dataType == "json" && (result = blankRE.test(result) ? null : $.parseJSON(result))
							} catch (e) {
								error = e
							}
							error ? ajaxError(error, "parsererror", xhr, settings, deferred) : ajaxSuccess(result, xhr, settings, deferred)
						} else ajaxError(xhr.statusText || null, xhr.status ? "error" : "abort", xhr, settings, deferred)
					}
				};
				if (ajaxBeforeSend(xhr, settings) === !1) return xhr.abort(), ajaxError(null, "abort", xhr, settings, deferred), xhr;
				var async = "async" in settings ? settings.async : !0;
				xhr.open(settings.type, settings.url, async, settings.username, settings.password);
				if (settings.xhrFields)
					for (name in settings.xhrFields) xhr[name] = settings.xhrFields[name];
				for (name in headers) nativeSetHeader.apply(xhr, headers[name]);
				return settings.timeout > 0 && (abortTimeout = setTimeout(function() {
					xhr.onreadystatechange = empty, xhr.abort(), ajaxError(null, "timeout", xhr, settings, deferred)
				}, settings.timeout)), xhr.send(settings.data ? settings.data : null), xhr
			}, $.get = function() {
				return $.ajax(parseArguments.apply(null, arguments))
			}, $.post = function() {
				var e = parseArguments.apply(null, arguments);
				return e.type = "POST", $.ajax(e)
			}, $.getJSON = function() {
				var e = parseArguments.apply(null, arguments);
				return e.dataType = "json", $.ajax(e)
			}, $.fn.load = function(e, t, n) {
				if (!this.length) return this;
				var r = this,
					i = e.split(/\s/),
					s, o = parseArguments(e, t, n),
					u = o.success;
				return i.length > 1 && (o.url = i[0], s = i[1]), o.success = function(e) {
					r.html(s ? $("<div>").html(e.replace(rscript, "")).find(s) : e), u && u.apply(r, arguments)
				}, $.ajax(o), this
			};
			var escape = encodeURIComponent;
			$.param = function(e, t) {
				var n = [];
				return n.add = function(e, t) {
					this.push(escape(e) + "=" + escape(t))
				}, serialize(n, e, t), n.join("&").replace(/%20/g, "+")
			}
		}(Zepto),
		function(e) {
			e.fn.serializeArray = function() {
				var t = [],
					n;
				return e([].slice.call(this.get(0).elements)).each(function() {
					n = e(this);
					var r = n.attr("type");
					this.nodeName.toLowerCase() != "fieldset" && !this.disabled && r != "submit" && r != "reset" && r != "button" && (r != "radio" && r != "checkbox" || this.checked) && t.push({
						name: n.attr("name"),
						value: n.val()
					})
				}), t
			}, e.fn.serialize = function() {
				var e = [];
				return this.serializeArray().forEach(function(t) {
					e.push(encodeURIComponent(t.name) + "=" + encodeURIComponent(t.value))
				}), e.join("&")
			}, e.fn.submit = function(t) {
				if (t) this.bind("submit", t);
				else if (this.length) {
					var n = e.Event("submit");
					this.eq(0).trigger(n), n.defaultPrevented || this.get(0).submit()
				}
				return this
			}
		}(Zepto),
		function(e) {
			var t = [],
				n;
			e.fn.remove = function() {
				return this.each(function() {
					this.parentNode && (this.tagName === "IMG" && (t.push(this), this.src = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=", n && clearTimeout(n), n = setTimeout(function() {
						t = []
					}, 6e4)), this.parentNode.removeChild(this))
				})
			}
		}(Zepto),
		function(e) {
			function o(e) {
				return e._zid || (e._zid = r++)
			}

			function u(e, t, r, i) {
				t = a(t);
				if (t.ns) var s = f(t.ns);
				return (n[o(e)] || []).filter(function(e) {
					return e && (!t.e || e.e == t.e) && (!t.ns || s.test(e.ns)) && (!r || o(e.fn) === o(r)) && (!i || e.sel == i)
				})
			}

			function a(e) {
				var t = ("" + e).split(".");
				return {
					e: t[0],
					ns: t.slice(1).sort().join(" ")
				}
			}

			function f(e) {
				return new RegExp("(?:^| )" + e.replace(" ", " .* ?") + "(?: |$)")
			}

			function l(t, n, r) {
				e.type(t) != "string" ? e.each(t, r) : t.split(/\s/).forEach(function(e) {
					r(e, n)
				})
			}

			function c(e, t) {
				return e.del && (e.e == "focus" || e.e == "blur") || !!t
			}

			function h(e) {
				return s[e] || e
			}

			function p(t, r, i, u, f, p) {
				var d = o(t),
					v = n[d] || (n[d] = []);
				l(r, i, function(n, r) {
					var i = a(n);
					i.fn = r, i.sel = u, i.e in s && (r = function(t) {
						var n = t.relatedTarget;
						if (!n || n !== this && !e.contains(this, n)) return i.fn.apply(this, arguments)
					}), i.del = f && f(r, n);
					var o = i.del || r;
					i.proxy = function(e) {
						var n = o.apply(t, [e].concat(e.data));
						return n === !1 && (e.preventDefault(), e.stopPropagation()), n
					}, i.i = v.length, v.push(i), "addEventListener" in t && t.addEventListener(h(i.e), i.proxy, c(i, p))
				})
			}

			function d(e, t, r, i, s) {
				var a = o(e);
				l(t || "", r, function(t, r) {
					u(e, t, r, i).forEach(function(t) {
						delete n[a][t.i], "removeEventListener" in e && e.removeEventListener(h(t.e), t.proxy, c(t, s))
					})
				})
			}

			function b(t) {
				var n, r = {
					originalEvent: t
				};
				for (n in t) !g.test(n) && t[n] !== undefined && (r[n] = t[n]);
				return e.each(y, function(e, n) {
					r[e] = function() {
						return this[n] = v, t[e].apply(t, arguments)
					}, r[n] = m
				}), r
			}

			function w(e) {
				if (!("defaultPrevented" in e)) {
					e.defaultPrevented = !1;
					var t = e.preventDefault;
					e.preventDefault = function() {
						e.defaultPrevented = !0, t.call(e)
					}
				}
			}
			var t = e.zepto.qsa,
				n = {},
				r = 1,
				i = {},
				s = {
					mouseenter: "mouseover",
					mouseleave: "mouseout"
				};
			i.click = i.mousedown = i.mouseup = i.mousemove = "MouseEvents", e.event = {
				add: p,
				remove: d
			}, e.proxy = function(t, n) {
				if (e.isFunction(t)) {
					var r = function() {
						return t.apply(n, arguments)
					};
					return r._zid = o(t), r
				}
				if (typeof n == "string") return e.proxy(t[n], t);
				throw new TypeError("expected function")
			}, e.fn.bind = function(e, t) {
				return this.each(function() {
					p(this, e, t)
				})
			}, e.fn.unbind = function(e, t) {
				return this.each(function() {
					d(this, e, t)
				})
			}, e.fn.one = function(e, t) {
				return this.each(function(n, r) {
					p(this, e, t, null, function(e, t) {
						return function() {
							var n = e.apply(r, arguments);
							return d(r, t, e), n
						}
					})
				})
			};
			var v = function() {
					return !0
				},
				m = function() {
					return !1
				},
				g = /^([A-Z]|layer[XY]$)/,
				y = {
					preventDefault: "isDefaultPrevented",
					stopImmediatePropagation: "isImmediatePropagationStopped",
					stopPropagation: "isPropagationStopped"
				};
			e.fn.delegate = function(t, n, r) {
				return this.each(function(i, s) {
					p(s, n, r, t, function(n) {
						return function(r) {
							var i, o = e(r.target).closest(t, s).get(0);
							if (o) return i = e.extend(b(r), {
								currentTarget: o,
								liveFired: s
							}), n.apply(o, [i].concat([].slice.call(arguments, 1)))
						}
					})
				})
			}, e.fn.undelegate = function(e, t, n) {
				return this.each(function() {
					d(this, t, n, e)
				})
			}, e.fn.live = function(t, n) {
				return e(document.body).delegate(this.selector, t, n), this
			}, e.fn.die = function(t, n) {
				return e(document.body).undelegate(this.selector, t, n), this
			}, e.fn.on = function(t, n, r) {
				return !n || e.isFunction(n) ? this.bind(t, n || r) : this.delegate(n, t, r)
			}, e.fn.off = function(t, n, r) {
				return !n || e.isFunction(n) ? this.unbind(t, n || r) : this.undelegate(n, t, r)
			}, e.fn.trigger = function(t, n) {
				if (typeof t == "string" || e.isPlainObject(t)) t = e.Event(t);
				return w(t), t.data = n, this.each(function() {
					"dispatchEvent" in this ? this.dispatchEvent(t) : e(this).triggerHandler(t, n)
				})
			}, e.fn.triggerHandler = function(t, n) {
				var r, i;
				return this.each(function(s, o) {
					r = b(typeof t == "string" ? e.Event(t) : t), r.data = n, r.target = o, e.each(u(o, t.type || t), function(e, t) {
						i = t.proxy(r);
						if (r.isImmediatePropagationStopped()) return !1
					})
				}), i
			}, "focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error tap".split(" ").forEach(function(t) {
				e.fn[t] = function(e) {
					return e ? this.bind(t, e) : this.trigger(t)
				}
			}), ["focus", "blur"].forEach(function(t) {
				e.fn[t] = function(e) {
					return e ? this.bind(t, e) : this.each(function() {
						try {
							this[t]()
						} catch (e) {}
					}), this
				}
			}), e.Event = function(e, t) {
				typeof e != "string" && (t = e, e = t.type);
				var n = document.createEvent(i[e] || "Events"),
					r = !0;
				if (t)
					for (var s in t) s == "bubbles" ? r = !!t[s] : n[s] = t[s];
				return n.initEvent(e, r, !0), n.isDefaultPrevented = function() {
					return n.defaultPrevented
				}, n
			}
		}(Zepto),
		function(e) {
			function a(e, t, n, r) {
				return Math.abs(e - t) >= Math.abs(n - r) ? e - t > 0 ? "Left" : "Right" : n - r > 0 ? "Up" : "Down"
			}

			function f() {
				s = null, t.last && (t.el && t.el.trigger("longTap"), t = {})
			}

			function l() {
				s && clearTimeout(s), s = null
			}

			function c() {
				n && clearTimeout(n), r && clearTimeout(r), i && clearTimeout(i), s && clearTimeout(s), n = r = i = s = null, t = {}
			}

			function h(e) {
				return (e.pointerType == "touch" || e.pointerType == e.MSPOINTER_TYPE_TOUCH) && e.isPrimary
			}

			function p(e, t) {
				return e.type == "pointer" + t || e.type.toLowerCase() == "mspointer" + t
			}
			var t = {},
				n, r, i, s, o = 750,
				u;
			e(document).ready(function() {
				var d, v, m = 0,
					g = 0,
					y, b, w;
				"MSGesture" in window && (u = new MSGesture, u.target = document.body), e(document).bind("MSGestureEnd", function(e) {
					var n = e.velocityX > 1 ? "Right" : e.velocityX < -1 ? "Left" : e.velocityY > 1 ? "Down" : e.velocityY < -1 ? "Up" : null;
					n && (t.el && t.el.trigger("swipe"), t.el && t.el.trigger("swipe" + n))
				}).on("touchstart MSPointerDown pointerdown", function(r) {
					if ((b = p(r, "down")) && !h(r)) return;
					y = b ? r : r.touches[0], r.touches && r.touches.length === 1 && t.x2 && (t.x2 = undefined, t.y2 = undefined), d = Date.now(), v = d - (t.last || d), t.el = e("tagName" in y.target ? y.target : y.target.parentNode), n && clearTimeout(n), t.x1 = y.pageX, t.y1 = y.pageY, v > 0 && v <= 250 && (r.preventDefault(), t.isDoubleTap = !0), t.last = d, s = setTimeout(f, o), u && b && u.addPointer(r.pointerId)
				}).on("touchmove MSPointerMove pointermove", function(e) {
					if ((b = p(e, "move")) && !h(e)) return;
					y = b ? e : e.touches[0], l(), t.x2 = y.pageX, t.y2 = y.pageY, m += Math.abs(t.x1 - t.x2), g += Math.abs(t.y1 - t.y2)
				}).on("touchend MSPointerUp pointerup", function(s) {
					if ((b = p(s, "up")) && !h(s)) return;
					l(), t.x2 && Math.abs(t.x1 - t.x2) > 30 || t.y2 && Math.abs(t.y1 - t.y2) > 30 ? i = setTimeout(function() {
						t.el && t.el.trigger("swipe"), t.el && t.el.trigger("swipe" + a(t.x1, t.x2, t.y1, t.y2)), t = {}
					}, 0) : "last" in t && (m < 30 && g < 30 ? r = setTimeout(function() {
						var r = e.Event("tap");
						r.pageX = t.x2 || t.x1 || 0, r.pageY = t.y2 || t.y1 || 0, r.cancelTouch = c, t.el && t.el.trigger(r), r.defaultPrevented && (w = !0, e("select,input").attr({
							disabled: "true"
						}), setTimeout(function() {
							e("select,input").removeAttr("disabled")
						}, 350)), t.isDoubleTap ? (t.el && t.el.trigger("doubleTap"), t = {}) : n = setTimeout(function() {
							n = null, t.el && t.el.trigger("singleTap"), t = {}
						}, 250)
					}, 0) : t = {}), m = g = 0
				}).on("touchcancel MSPointerCancel pointercancel", c).on("click", function(e) {
					w && (w = null, e.preventDefault())
				}, !0), e(window).on("scroll", c)
			}), ["swipe", "swipeLeft", "swipeRight", "swipeUp", "swipeDown", "doubleTap", "tap", "singleTap", "longTap"].forEach(function(t) {
				e.fn[t] = function(e) {
					return this.on(t, e)
				}
			})
		}(Zepto),
		function(e) {
			function t(e) {
				var t = this.os = {},
					n = this.browser = {},
					r = e.match(/Web[kK]it[\/]{0,1}([\d.]+)/),
					i = e.match(/(Android);?[\s\/]+([\d.]+)?/),
					s = e.match(/(iPad).*OS\s([\d_]+)/),
					o = e.match(/(iPod)(.*OS\s([\d_]+))?/),
					u = !s && e.match(/(iPhone\sOS)\s([\d_]+)/),
					a = e.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),
					f = a && e.match(/TouchPad/),
					l = e.match(/Kindle\/([\d.]+)/),
					c = e.match(/Silk\/([\d._]+)/),
					h = e.match(/(BlackBerry).*Version\/([\d.]+)/),
					p = e.match(/(BB10).*Version\/([\d.]+)/),
					d = e.match(/(RIM\sTablet\sOS)\s([\d.]+)/),
					v = e.match(/PlayBook/),
					m = e.match(/Chrome\/([\d.]+)/) || e.match(/CriOS\/([\d.]+)/),
					g = e.match(/Firefox\/([\d.]+)/),
					y = e.match(/MSIE ([\d.]+)/),
					b = r && e.match(/Mobile\//) && !m,
					w = e.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/) && !m,
					y = e.match(/MSIE\s([\d.]+)/);
				if (n.webkit = !!r) n.version = r[1];
				i && (t.android = !0, t.version = i[2]), u && !o && (t.ios = t.iphone = !0, t.version = u[2].replace(/_/g, ".")), s && (t.ios = t.ipad = !0, t.version = s[2].replace(/_/g, ".")), o && (t.ios = t.ipod = !0, t.version = o[3] ? o[3].replace(/_/g, ".") : null), a && (t.webos = !0, t.version = a[2]), f && (t.touchpad = !0), h && (t.blackberry = !0, t.version = h[2]), p && (t.bb10 = !0, t.version = p[2]), d && (t.rimtabletos = !0, t.version = d[2]), v && (n.playbook = !0), l && (t.kindle = !0, t.version = l[1]), c && (n.silk = !0, n.version = c[1]), !c && t.android && e.match(/Kindle Fire/) && (n.silk = !0), m && (n.chrome = !0, n.version = m[1]), g && (n.firefox = !0, n.version = g[1]), y && (n.ie = !0, n.version = y[1]), b && (e.match(/Safari/) || !!t.ios) && (n.safari = !0), w && (n.webview = !0), y && (n.ie = !0, n.version = y[1]), t.tablet = !!(s || v || i && !e.match(/Mobile/) || g && e.match(/Tablet/) || y && !e.match(/Phone/) && e.match(/Touch/)), t.phone = !!(!t.tablet && !t.ipod && (i || u || a || h || p || m && e.match(/Android/) || m && e.match(/CriOS\/([\d.]+)/) || g && e.match(/Mobile/) || y && e.match(/Touch/)))
			}
			t.call(e, navigator.userAgent), e.__detect = t
		}(Zepto), module.exports = exports = Zepto
});;