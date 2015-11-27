define('ui', function(require, exports, module) {
	var _cacheThisModule_, container = document.querySelector(".wx_wrap") || document.body;
	var alertCoverDiv = document.createElement('div');
	alertCoverDiv.style.cssText = "position: fixed; width: 100%; height: 100%; top: 0px; left: 0px; z-index: 109; background: rgba(0, 0, 0, 0.3);";

	function notNeedLoadCss() {
		var uiCSSUrl = 'base.s.min',
			links = document.getElementsByTagName('link'),
			isHave = false;
		for (var i = 0, l = links.length; i < l; i++) {
			if (links[i].rel == 'stylesheet' && links[i].href.indexOf(uiCSSUrl) >= 0) {
				isHave = true;
				break;
			}
		}
		return isHave;
	}

	function loadCss(url) {
		if (notNeedLoadCss()) {
			return;
		}
		var l = document.createElement('link');
		l.setAttribute('type', 'text/css');
		l.setAttribute('rel', 'stylesheet');
		l.setAttribute('href', url);
		document.getElementsByTagName("head")[0].appendChild(l);
	};

	function showTip(obj) {
		if (!obj) return;
		var className = obj.className || 'g_small_tips',
			tips = document.querySelector("." + className),
			t = obj.t || 2000,
			title = obj.title || '操作成功!';
		if (!tips) {
			tips = document.createElement('div');
			tips.className = className;
			document.body.appendChild(tips);
		}
		tips.innerText = title;
		tips.style.display = 'block';
		setTimeout(function() {
			tips.style.display = 'none';
		}, t);
	}

	function extend(a, b) {
		for (var i in b) {
			if (b.hasOwnProperty(i)) {
				a[i] = b[i];
			}
		}
		return a;
	}

	function info(opts) {
		var option = {
			msg: "",
			icon: "none",
			delay: 2000
		};
		opts = opts || {};
		extend(option, opts);
		var el = document.createElement('div');
		el.className = "mod_alert show fixed";
		el.innerHTML = (option.icon != 'none' ? ('<i class="icon' + (option.icon != 'info' ? (' icon_' + option.icon) : '') + '"></i>') : '') + '<p>' + option.msg + '</p>';
		container.appendChild(el);
		setTimeout(function() {
			el.style.display = 'none';
			container.removeChild(el);
		}, option.delay);
	}

	function alert(opts) {
		var option = {
				msg: "",
				confirmText: '确认',
				icon: "none",
				onConfirm: null,
				stopMove: false
			},
			stopMove = function(e) {
				e.preventDefault();
			},
			el = document.createElement('div');
		opts = opts || {};
		extend(option, opts);
		container = opts.container || container;
		el.className = "mod_alert show fixed";
		el.innerHTML = (option.icon != 'none' ? ('<i class="icon' + (option.icon != 'info' ? (' icon_' + option.icon) : '') + '"></i>') : '') + '<p>' + option.msg + '</p><p class="btns"><a href="javascript:;" class="btn btn_1">' + option.confirmText + '</a></p>';
		container.appendChild(el);
		el.querySelector(".btn").onclick = function(e) {
			document.body.removeChild(alertCoverDiv);
			option.onConfirm && option.onConfirm();
			el.style.display = 'none';
			this.onclick = null;
			container.removeChild(el);
			option.stopMove && document.removeEventListener("touchmove", stopMove, false);
		};
		document.body.appendChild(alertCoverDiv);
		option.stopMove && document.addEventListener("touchmove", stopMove, false);
	}

	function confirm(opts) {
		var option = {
			msg: "",
			icon: "none",
			okText: "确定",
			cancelText: "取消",
			onConfirm: null,
			onCancel: null
		};
		opts = opts || {};
		extend(option, opts);
		var el = document.createElement('div');
		el.className = "mod_alert show fixed";
		el.innerHTML = (option.icon != 'none' ? ('<i class="icon' + (option.icon != 'info' ? (' icon_' + option.icon) : '') + '"></i>') : '') + '<p>' + option.msg + '</p><p class="btns"><a href="javascript:;" id="ui_btn_confirm" class="btn btn_1">' + option.okText + '</a><a href="javascript:;" id="ui_btn_cancel" class="btn btn_1">' + option.cancelText + '</a></p>';
		container.appendChild(el);
		document.body.appendChild(alertCoverDiv);
		el.querySelector("#ui_btn_cancel").onclick = function(e) {
			option.onCancel && option.onCancel();
			clear();
		};
		el.querySelector("#ui_btn_confirm").onclick = function(e) {
			option.onConfirm && option.onConfirm();
			clear();
		};

		function clear() {
			el.style.display = 'none';
			container.removeChild(el)
			document.body.removeChild(alertCoverDiv);
		}
	}
	loadCss("http://wq.360buyimg.com/fd/base/css/base/mod_alert.s.min.css");
	module.exports = {
		showTip: showTip,
		info: info,
		alert: alert,
		confirm: confirm
	};
});