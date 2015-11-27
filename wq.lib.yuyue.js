define('wq.lib.yuyue', function(require, exports, module) {
	var base = require('wq.lib.base'),
		ldJs = require('loadJs'),
		cookie = require("cookie"),
		login = require("login"),
		ui = require("ui"),
		_cacheThisModule_, closeCallBack;

	function getEnv() {
		var _ua = navigator.userAgent.toLowerCase();
		if (!/mobile|android/.test(_ua)) {
			return "pc";
		} else {
			if (/micromessenger(\/[\d\.]+)*/.test(_ua)) {
				return "weixin";
			} else if (/qq\/(\/[\d\.]+)*/.test(_ua) || /qzone\//.test(_ua)) {
				return "qq";
			} else {
				return "h5";
			}
		}
	}

	function checkFollowStatus(callback, followImg) {
		if (getEnv() == "weixin") {
			var isFollowed = cookie.get("followWxAccount") == 1;
			if (isFollowed == 1) {
				callback(false);
				return;
			}
			ldJs.loadScript({
				url: "http://wq.jd.com/mlogin/userinfo/CheckUserIsFans?wxid=qqwanggou001&callback=getFollowInfo&openid=" + cookie.get('open_id') + '&t=' + Date.now(),
				onError: function() {
					callback && callback(false);
				},
				onTimeout: function() {
					callback && callback(false);
				}
			});
			if (!window.getFollowInfo) {
				window.getFollowInfo = function(json) {
					if (json.retcode == 0) {
						if (json.isfans == 0) {
							showQrcodeLayer(followImg);
							callback(true);
						} else {
							cookie.set("followWxAccount", 1, 24 * 3600, "/", "jd.com");
							callback(false);
						}
					} else {
						callback(false);
					}
				};
			}
		} else {
			callback && callback(false);
		}
	}

	function getLayerY() {
		var scrollTop = $(document.body).scrollTop();
		var windowHeight = $(window).height();
		var layerHeight = $("#followWxAccountLay").height();
		return scrollTop + (windowHeight - layerHeight) / 2;
	}

	function showQrcodeLayer(followImg) {
		console.log("enter  showQrcodeLayer  function");
		var img = followImg || "http://img11.360buyimg.com/jdphoto/s135x135_jfs/t2122/47/717920692/46309/d2488484/56270c9bN63d0a620.jpg";
		if (document.getElementById("followWxAccountLay")) {
			$("#followWxAccountLay").show().css("top", getLayerY());
			return;
		}
		$('<div id="followWxAccountLay" style="display:none" class="mod_alert mod_alert_remind show">' + '<i class="icon"></i>' + '<i class="close"></i>' + '<p class="title">离预约成功还差一步！</p>' + '<p class="desc">需要关注"京东JD.COM"服务号，<br/>才能及时获取活动提醒哦！</p>' + '<p class="qrcode"><img src="' + img + '"><span>长按二维码关注</span></p>' + '</div>').appendTo(document.body);
		$("#followWxAccountLay").show().css("top", getLayerY());
		$("#followWxAccountLay .close").click(function() {
			closeCallBack();
			$("#followWxAccountLay").hide();
		});
	}

	function loadCss(url) {
		var l = document.createElement('link');
		l.setAttribute('type', 'text/css');
		l.setAttribute('rel', 'stylesheet');
		l.setAttribute('href', url);
		document.getElementsByTagName("head")[0].appendChild(l);
	};

	function getClsWXSubscribe() {
		var wxsubscribe = base.init().extend({
			EVENTS: {
				'[data-activeid]': {
					click: function(self, e) {
						var orderid = $(e.target).closest("[data-activeid]").attr("data-activeid");
						if (orderid) {
							self.setSubcribe(orderid, null, null);
						}
					}
				},
			},
			info: function(opts) {
				var option = {
					container: opts.container || document.body,
					msg: "",
					icon: "none",
					delay: 2000
				};
				opts = opts || {};
				for (var i in opts) {
					if (opts.hasOwnProperty(i)) {
						option[i] = opts[i];
					}
				}
				ui.info({
					msg: option.msg,
					icon: "none",
					stopMove: true
				});
			},
			querySubscribeResult: function(callback) {
				if (!window.yuyueActiveListCb) {
					window.yuyueActiveListCb = function(data) {
						if (data.retCode == 13) {
							callback && callback.preLogin && callback.preLogin(data);
						} else if (data.retCode == 0) {
							callback && callback.successCb && callback.successCb(data);
						} else {
							callback && callback.failCb && callback.failCb(data);
						}
					};
				}
				ldJs.loadScript({
					url: "http://wq.jd.com/bases/yuyuelist/getactivelist?callback=yuyueActiveListCb",
					charset: 'utf-8'
				});
			},
			queryIsSub: function(activeId) {
				if (!window.queryIsSubscribe) {
					window.queryIsSubscribe = function(data) {
						if (data.retCode == 0) {
							return true;
						} else {
							return false;
						}
					};
				}
				ldJs.loadScript({
					url: "http://wq.jd.com/bases/yuyue/activeResult?callback=queryIsSubscribe&activeId=" + activeId,
					charset: 'utf-8'
				});
			},
			setSubcribe: function(orderId, cbObj, msgArr) {
				var me = this,
					orderId = orderId || me.get("orderId"),
					orderUrl = "http://wq.jd.com/bases/yuyue/active?activeId=",
					callbackObj = cbObj || me.get("callbackObj"),
					isShowInfo = callbackObj.isShowInfo || me.get("isShowInfo"),
					success = callbackObj.success || me.get("success"),
					isReLogin = callbackObj.isReLogin || me.get("isReLogin"),
					preLogin = callbackObj.preLogin || me.get("preLogin"),
					msgArray = msgArr || me.get("msgArray"),
					isCheckFollow = callbackObj.isCheckFollow || me.get("isCheckFollow"),
					isCheckFollowOrder = callbackObj.isCheckFollowOrder || me.get("isCheckFollowOrder"),
					followImg = callbackObj.followImg || me.get("followImg"),
					cbName = "setActSub" + orderId;
				closeCallBack = callbackObj.onclose || function() {};
				window[cbName] = function(json) {
					delete window[cbName];
					var errNo = json.retCode,
						msg = "";
					if (callbackObj.selfDealErr) {
						callbackObj.selfDealErr({
							json: json,
							elseObj: callbackObj.elseObj,
							orderId: orderId
						});
						return;
					}
					if (errNo == "") {
						var replyCode = json.list[0].replyCode;
						switch (replyCode) {
							case "0":
								if (isCheckFollow) {
									checkFollowStatus(function(isShownQrcode) {
										if (!isShownQrcode) {
											msg = msgArray[0] ? msgArray[0] : "设置提醒成功，请留意微信通知。";
											success && success({
												isShownQrcode: isShownQrcode,
												json: json,
												elseObj: callbackObj.elseObj,
												orderId: orderId
											});
											if (isShowInfo && msg.length != 0) {
												me.info({
													msg: msg
												});
											}
										} else {
											success && success({
												isShownQrcode: isShownQrcode,
												json: json,
												elseObj: callbackObj.elseObj,
												orderId: orderId
											});
										}
									}, followImg);
								} else {
									msg = msgArray[0] ? msgArray[0] : "设置提醒成功，请留意通知。页面底端关注大账号才可收到提醒!";
									success && success({
										json: json,
										elseObj: callbackObj.elseObj,
										orderId: orderId
									});
								}
								break;
							case "10006":
								if (isCheckFollowOrder) {
									checkFollowStatus(function(isShownQrcode) {
										if (!isShownQrcode) {
											msg = msgArray[1] ? msgArray[1] : "已设置预约，无需再进行设置";
											callbackObj.orderedCb && callbackObj.orderedCb({
												isShownQrcode: isShownQrcode,
												json: json,
												elseObj: callbackObj.elseObj,
												orderId: orderId
											});
											if (isShowInfo && msg.length != 0) {
												me.info({
													msg: msg
												});
											}
										} else {
											callbackObj.orderedCb && callbackObj.orderedCb({
												isShownQrcode: isShownQrcode,
												json: json,
												elseObj: callbackObj.elseObj,
												orderId: orderId
											});
										}
									}, followImg);
								} else {
									msg = msgArray[1] ? msgArray[1] : "已设置预约，无需再进行设置";
									callbackObj.orderedCb && callbackObj.orderedCb({
										json: json,
										elseObj: callbackObj.elseObj,
										orderId: orderId
									});
								}
								break;
							case "10007":
								msg = msgArray[2] ? msgArray[2] : "活动不存在，请稍后再试";
								callbackObj.actNotCb && callbackObj.actNotCb({
									json: json,
									elseObj: callbackObj.elseObj,
									orderId: orderId
								});
								break;
							case "10008":
								msg = msgArray[3] ? msgArray[3] : "活动已结束";
								callbackObj.actEnded && callbackObj.actEnded({
									json: json,
									elseObj: callbackObj.elseObj,
									orderId: orderId
								});
								break;
							case "10009":
								msg = msgArray[4] ? msgArray[4] : "活动还未开始";
								callbackObj.actNotStartCb && callbackObj.actNotStartCb({
									json: json,
									elseObj: callbackObj.elseObj,
									orderId: orderId
								});
						}
					} else if (errNo == "13") {
						preLogin && preLogin({
							json: json,
							elseObj: callbackObj.elseObj,
							orderId: orderId
						});
						isReLogin && login.login();
						return;
					} else {
						msg = msgArray[3] ? msgArray[3] : "系统错误,请稍后再试";
						callbackObj.failCb && callbackObj.failCb({
							json: json,
							elseObj: callbackObj.elseObj,
							orderId: orderId
						});
					}
					if (isShowInfo && msg.length != 0) {
						me.info({
							msg: msg
						});
					}
				};
				ldJs.loadScript({
					url: orderUrl + orderId + "&callback=" + cbName + "&t=" + new Date().getTime(),
					charset: 'utf-8'
				});
			}
		});
		return wxsubscribe;
	}
	exports.init = function(options) {
		loadCss("http://wq.360buyimg.com/fd/base/css/base/mod_alert_remind.s.css?t=20150521");
		var _settings = {
			orderid: null,
			isShowInfo: true,
			success: null,
			isCheckFollow: false,
			isCheckFollowOrder: false,
			preLogin: function() {},
			callbackObj: {},
			msgArray: []
		};
		if (options) {
			$.extend(_settings, options);
		}
		var cls = getClsWXSubscribe();
		return cls.create(_settings);
	}
});