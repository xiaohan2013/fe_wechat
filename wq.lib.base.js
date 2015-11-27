define("wq.lib.base", function(require, exports, module) {
	function r() {
		var e = function() {};
		return e.extend = function t(e) {
			function s() {}
			var n = new this,
				r = this.prototype;
			for (var i in e) typeof e[i] == "function" && typeof r[i] == "function" ? n[i] = function(e, t) {
				return function() {
					var n = this.callSuper;
					this.callSuper = e;
					var r = t.apply(this, arguments);
					return this.callSuper = n, this.callSuper || delete this.callSuper, r
				}
			}(r[i], e[i]) : n[i] = e[i];
			return s.prototype = n, s.prototype.constructor = s, s.extend = t, s.create = s.prototype.create = function() {
				var e = new this;
				return e.init && e.init.apply(e, arguments), e
			}, s
		}, e
	}

	function i() {
		console.log("getBaseObj.........");
		var n = {},
			i = r(),
			s = i.extend({
				get: function(e) {
					return this.__config[e]
				},
				set: function(e, t) {
					this.__config[e] = t
				},
				EVENTS: {},
				template: "",
				init: function(e) {
					var t = this;
					this.__config = e, this.delegateEveent(), this.setUp()
				},
				delegateEveent: function() {
					var t, n, r, i, s = this,
						o = this.EVENTS || {},
						u = this.get("parentNode") || e(document.body);
					for (r in o) {
						t = o[r];
						for (i in t) n = t[i], u.delegate(r, i, function(e) {
							n.call(null, s, e)
						})
					}
				},
				setUp: function() {
					this.render()
				},
				refreshData: function(n, r) {
					var i = this,
						s = i.get("__renderData");
					s[n] = r;
					if (!this.template) return;
					var o = e(t.formatJson(this.template, s)),
						u = i.get("__currentNode");
					if (!u) return;
					u.replaceWith(o), i.set("__currentNode", o)
				},
				render: function(n) {
					var r = this;
					r.set("__renderData", n);
					if (!this.template) return;
					var i = t.formatJson(this.template, n),
						s = this.get("parentNode") || e(document.body),
						o = e(i);
					r.set("__currentNode", o), s.append(o)
				},
				destory: function() {
					var e, t, n, r, i = this,
						s = i.EVENTS || {},
						o = i.get("parentNode");
					i.get("__currentNode").remove();
					for (n in s) {
						e = s[n];
						for (r in e) t = e[r], o.undelegate(n, r, t)
					}
				}
			});
		return s
	}
	var e = require("zepto"),
		t = require("formatJson"),
		_cacheThisModule_, n;
	exports.init = function() {
		return n || (n = i())
	}
});;