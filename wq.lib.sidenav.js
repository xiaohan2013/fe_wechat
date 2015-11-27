define("wq.lib.sidenav", function(require, exports) {
	function f() {
		var f = t.init().extend({
			setUp: function() {
				function d() {
					var t = e(window).height(),
						t = JD.device.scene == "weixin" ? t - 80 : t / 2 > 300 ? t / 2 : 300;
					return ['<div class="sessions_nav_mask"></div>', '<div class="sessions_nav">', '    <div class="sessions_inner" id="yScroll1" style="height:', t, 'px;overflow:hidden;">', '        <ul class="sessions">', "            <%", "            var hotItems=JD.calendar.selectTime(data);", "            var now=new Date();", "            for(var i=0;i<data.length;i++){", "               var item=data[i];", "              ", "   ", "            %>", "            <li>", '               <a  href="javascript:;" data-target="<%=item.link%>">', "                  <%", '                   if(now>=new Date(item.begin.replace(/-/g, "/")) &&now<new Date(item.end.replace(/-/g, "/"))){', "                 %>", '                 <span class="tag_hot" >HOT</span>', "                 <%", "               }", "                  %>", "                    ", '                    <p class="name"><%=item.title%></p>', '                    <small class="desc"><%=item.desc%></small>', "                </a>", "            </li>", "          <%}%>", "            ", "        </ul>", "    </div>", '   <span class="bor_top"></span>', '    <span class="bor_btm"></span>', '    <div class="tri"></div>', "</div>"].join("")
				}

				function v(t) {
					var r = [];
					document.getElementById("navContainer").innerHTML = n.formatJson(d(), {
						data: t.data
					}), h = e(".sessions_nav");
					var c = e(".sessions_nav .sessions_inner"),
						v = e(".sessions a");
					p = e(".sessions_nav_mask"), p.on(s, function(e) {
						e.preventDefault(), e.stopPropagation(), m()
					}), c.on(s, function(t) {
						var n = e(t.target);
						t.preventDefault(), t.stopPropagation(), l(e(n).attr("data-target") || e(n).parents("[data-target]").attr("data-target"))
					}), window.Zepto && c.on("tap", "li", function(t) {
						var n = e(t.currentTarget).children("a");
						t.preventDefault(), t.stopPropagation(), l(e(n).attr("data-target") || e(n).parents("[data-target]").attr("data-target"))
					}), s1 = i.init("#" + c.attr("id"), o), e(document).on(s, "." + f, function() {
						if (e("." + f).hasClass("on")) m();
						else {
							e("." + f).addClass("on"), h.show().addClass("expand"), p.addClass("show"), document.addEventListener("touchmove", u, !1), s1.refresh();
							var t = v.filter('[data-myindex="' + a + '"]').parent();
							t.get(0) && s1.scrollToElement(t.get(0), 1200, null, !0), s1.on("scroll", function() {})
						}
					})
				}

				function m() {
					document.removeEventListener("touchmove", u, !1), e("." + f).removeClass("on"), h.removeClass("expand"), p.removeClass("show")
				}
				var t = this.get("dataId"),
					f = this.get("footDomClass"),
					h, p;
				c(), r.getData({
					dataType: r.DataType.PPMS,
					param: {
						key: t,
						callback: "showPageData" + t
					},
					cb: v
				})
			}
		});
		return f
	}

	function l(e) {
		e && (location.href = e)
	}

	function c(e) {
		JD.calendar.selectTime = function(e) {
			function t(e, t) {
				function n(e, t) {
					for (var n = 0, r = t - (e + "").length; r > n; n++) e = "0" + e;
					return e + ""
				}
				var r = t.replace(/yyyy|YYYY/, e.getFullYear()).replace(/mm|MM/, n(e.getMonth() + 1, 2)).replace(/dd|DD/, n(e.getDate(), 2)).replace(/hh|HH/, n(e.getHours(), 2)).replace(/ii|II/, n(e.getMinutes(), 2)).replace(/ss|SS/, n(e.getSeconds(), 2));
				return r
			}

			function n() {
				var e = decodeURIComponent(JD.url.getUrlParam("__date")),
					n = new Date;
				return e && (n = new Date(e)), t(n, "yyyy/mm/dd hh:ii:ss")
			}
			var r = [],
				i = n(),
				s = {};
			if (!e) return [];
			for (var o = 0, u = e.length; u > o; o++)
				if (s = e[o]) {
					s.begin = s.begin || "1970-01-01", s.end = s.end || "2099-01-01";
					var a = (new Date(s.begin.replace(/-/g, "/"))).getTime(),
						f = (new Date(s.end.replace(/-/g, "/"))).getTime(),
						l = (new Date(i)).getTime();
					l >= a && f >= l && (s.index = o, r.push(s))
				}
			return r
		}
	}

	function h(t) {
		var n = {
			footDomClass: "eleven",
			dataId: 17529
		};
		t && e.extend(n, t);
		var r = f();
		return r.create(n)
	}
	var e = require("zepto"),
		t = require("wq.lib.base"),
		n = require("formatJson"),
		r = require("wfdata"),
		_cacheThisModule_ = "",
		i = require("iscroll"),
		s = "ontouchstart" in window ? "tap" : "click",
		o = {
			mouseWheel: !1,
			bounce: !0,
			disableMouse: !0,
			disablePointer: !0,
			freeScroll: !1,
			momentum: !0,
			fadeScrollbars: !1,
			probeType: 2
		},
		u = function(e) {
			e.preventDefault()
		},
		a = 0;
	window.Zepto && (s = "click"), exports.init = h
});;