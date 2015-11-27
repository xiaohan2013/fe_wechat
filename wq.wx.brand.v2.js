define('wq.wx.brand.v2', function(require, exports, module) {
	var _cacheThisModule_, $ = require('zepto'),
		url = require('url'),
		fj = require('formatJson'),
		li = require('lazyLoad'),
		login = require('login'),
		ui = require('ui'),
		wfdata = require('wfdata'),
		wxsubscribe = require('wq.lib.yuyue'),
		wxpopmenu = require('wq.wx.menu'),
		report = require('report'),
		lanchGjApp = require('wq.lanchGjApp'),
		sidenav = require('wq.lib.sidenav'),
		clickEvent = 'ontouchstart' in window ? 'tap' : 'click',
		wxsubscribeObj = null,
		element = {
			body: $(document.body),
			doc: $(document),
			win: $(window),
			backTop: $('#goTop'),
			loading: $('#loading'),
			jdappdlOutter: $('#jdappdlOutter'),
			toolbarHead: $('#toolbarHead'),
			wxWrap: $('.wx_wrap'),
			bannerDiv: $('#bannerDiv'),
			navDiv: $('#navDiv'),
			catList: $('#catOne, #catOther'),
			catOne: $('#catOne'),
			catOther: $('#catOther'),
			catMore: $('#catMore'),
			tabList: $('#tabList'),
			floor1: $('#floor1'),
			floor1More: $('#floor1More'),
			floor23: $('#floor23'),
			floor23More: $('#floor23More'),
			floor4: $('#floor4'),
			floor1List: $('#floor1List'),
			floor23List: $('#floor23List'),
			floor4List: $('#floor4List')
		},
		tpl = {
			catTpl: 'catTpl',
			brandTpl: 'brandTpl',
			brandPreviewTpl: 'brandPreviewTpl'
		},
		typeMids = {},
		catvalMids = {},
		navTop = element.navDiv.offset().top,
		navH = element.navDiv.height(),
		lastScrollTop = 0,
		winH = element.win.height(),
		Temai = {
			id: 3090,
			sParams: brand_cfg.sParams,
			eachBrandH: 0,
			curBrandPageSize: 0,
			curBrandTotalPage: 0,
			curFloorIndex: 0,
			floorInfo: [{
				showTypeIndex: 0,
				showTypes: ['1', '2|3', '4'],
				holdLoad: false,
				fetchedAll: false,
				totalNum: 0,
				pi: 2,
				pc: 10
			}, {
				showTypeIndex: 0,
				showTypes: ['1'],
				holdLoad: false,
				fetchedAll: false,
				totalNum: 0,
				pi: 2,
				pc: 10
			}, {
				showTypeIndex: 0,
				showTypes: ['2|3'],
				holdLoad: false,
				fetchedAll: false,
				totalNum: 0,
				pi: 1,
				pc: 10
			}, {
				showTypeIndex: 0,
				showTypes: ['4'],
				holdLoad: false,
				fetchedAll: false,
				totalNum: 0,
				pi: 1,
				pc: 10
			}],
			scrollTop: 0,
			showBrandList: [],
			cgid: '',
			hotCatId: '',
			defaultCatRules: window.defaultCatRules,
			hotCatRules: window.hotCatRules,
			pageRd: '',
			curNavData: window.catListPPMS,
			markData: window.markListPPMS,
			remindIdData: window.remindIdListPPMS,
			curRemindId: 0
		};
	var double11_2015 = {
		changeStyle: function() {
			var _now = double11_2015.getCurTime();
			if (_now >= new Date('2015/11/06 00:00:00') && _now <= new Date('2015/11/12 23:59:59')) {
				$('.wx_wrap').addClass('brand_s11');
			}
		},
		formatTime2: function(time) {
			if (time && time.length == 14) {
				return time.substr(0, 4) + '/' + time.substr(4, 2) + '/' + time.substr(6, 2) + ' ' + time.substr(8, 2) + ':' + time.substr(10, 2) + ':' + time.substr(12, 2);
			}
			return '';
		},
		getCurTime: function() {
			var _debugTime = url.getUrlParam('debugTime');
			if (_debugTime && _debugTime.length == 14) {
				return new Date(double11_2015.formatTime2(_debugTime));
			}
			return new Date();
		},
		getShow1111: function() {
			var _show1111 = false,
				_now = double11_2015.getCurTime();
			if (_now >= new Date('2015/11/01 00:00:00') && _now <= new Date('2015/11/13 00:00:00')) {
				_show1111 = true;
			}
			return _show1111;
		},
		getAfter1101: function() {
			var _after1101 = false,
				_now = double11_2015.getCurTime();
			if (_now >= new Date('2015/11/01 00:00:00')) {
				_after1101 = true;
			}
			return _after1101;
		},
		getRandom: function(m, n) {
			return Math.round(Math.random() * (n - m) + m);
		},
		getValidData: function(oldArr, attr) {
			if (!oldArr || !oldArr.length) {
				return null;
			}
			var _timeValidRules = oldArr.filter(function(o) {
				return double11_2015.getCurTime() >= new Date(o[attr]);
			});
			if (!_timeValidRules || !_timeValidRules.length) {
				return null;
			}
			_timeValidRules.sort(function(a, b) {
				return new Date(b[attr]) - new Date(a[attr]);
			});
			return _timeValidRules[0];
		}
	};

	function defaultCatRule() {
		var _catId = '',
			_curRule = double11_2015.getValidData(Temai.defaultCatRules, 'startTime');
		if (!_curRule) {
			return _catId;
		}
		var _curRuleDetail = $.trim(_curRule.rule);
		if (!_curRuleDetail && !(/^(\d+-\d+,?)+$/.test(_curRuleDetail))) {
			return _catId;
		}
		var _curRules = _curRuleDetail.split(','),
			_curRuless = [],
			_probabilityTotal = 0;
		_curRules.forEach(function(item) {
			var _items = item.split('-'),
				_catIdItem = _items[0],
				_probability = _items[1];
			_probabilityTotal += parseFloat(_probability);
			if (_probabilityTotal > 100) {
				return;
			}
			_curRuless.push({
				catId: _catIdItem,
				probability: parseFloat(_probability)
			});
		});
		if (_probabilityTotal > 100) {
			return _catId;
		}
		var _catProbabilitys = [],
			_random = double11_2015.getRandom(1, 100);
		for (var i = 0, len = _curRuless.length; i < len; i++) {
			var _item = _curRuless[i],
				_catIdItem = _item.catId,
				_probability = _item.probability;
			_catProbabilitys[i] = _probability;
			if (i == 0) {
				if (_random <= _catProbabilitys[i]) {
					_catId = _catIdItem;
					break;
				}
				continue;
			}
			_catProbabilitys[i] = parseFloat(_catProbabilitys[i] + _catProbabilitys[i - 1]);
			if (_random > _catProbabilitys[i - 1] && _random <= _catProbabilitys[i]) {
				_catId = _catIdItem;
				break;
			}
		}
		return _catId;
	}

	function hotCatRule() {
		var _curRule = double11_2015.getValidData(Temai.hotCatRules, 'startTime');
		if (!_curRule) {
			return;
		}
		var _curRuleCatId = $.trim(_curRule.hotCatId);
		if (!_curRuleCatId || _curRuleCatId == 0) {
			return;
		}
		if (Temai.curNavData.map(function(item) {
				return item.key;
			}).indexOf(_curRuleCatId) == -1) {
			return;
		}
		Temai.hotCatId = _curRuleCatId;
	}
	Temai.initParam = function() {
		var _catId = url.getUrlParam('cgid'),
			_pageRd = url.getUrlParam('ptag') || url.getUrlParam('PTAG'),
			_floorIndex = url.getUrlParam('fi'),
			_st = url.getHashParam('st');
		_catId && (Temai.cgid = _catId);
		_pageRd && (Temai.pageRd = _pageRd);
		_st && (Temai.scrollTop = _st * 1);
		if (!Temai.cgid && _floorIndex) {
			Temai.curFloorIndex = _floorIndex;
		}
		var _remindIds = Temai.remindIdData.filter(function(o) {
			return new Date(o.startTime) <= new Date() && new Date() <= new Date(o.endTime);
		});
		if (_remindIds && _remindIds.length) {
			Temai.curRemindId = _remindIds[0].remindId;
		}
		if (double11_2015.getAfter1101()) {
			if (!_catId) {
				Temai.cgid = defaultCatRule();
			}
			hotCatRule();
		}
	};
	Temai.initPage = function() {
		handleMids();
		element.floor1List.find('a').each(function() {
			var $em = $(this),
				_mid = $em.attr('dwResourceRegistDetailId'),
				_bt = $em.attr('bt'),
				_href = $em.attr('href'),
				_markFlag = $em.attr('markFlag');
			if (_bt) {
				var _limit = myUtil.getLimitTime(_bt),
					$timer = $em.find('.timer');
				$timer.append(_limit);
				if (_limit.indexOf('小时') != -1) {
					$timer.addClass('timer_2');
				}
			}
			var _markImgUrl = findMarkImgUrl(_markFlag);
			_markImgUrl && ($em.find('img').eq(0).after('<img src="' + _markImgUrl + '" class="tag">'));
			$em.attr('href', getDetailLink(_href, _mid));
			Temai.showBrandList.push(_mid);
		});
		handlerCatData(Temai.cgid);
		Temai.eachBrandH = $('.brand_item').eq(0).height();
		Temai.curBrandPageSize = Math.ceil(winH / Temai.eachBrandH);
		if (Temai.cgid) {
			var $curCat = element.catList.find('a[val="' + Temai.cgid + '"]');
			if ($curCat.length) {
				catClicked($curCat, false);
			} else {
				tabClicked(Temai.curFloorIndex, 4);
			}
		} else {
			tabClicked(Temai.curFloorIndex, 4);
		}
		li.autoLoadImage({
			fadeIn: true
		});
		if (double11_2015.getShow1111()) {
			var $floor1Title = element.floor1.find('.brand_title');
			$floor1Title.html($floor1Title.html().replace('9:00', '0:00'));
		}
	};
	Temai.loadFocusData = function(callback) {
		var _curFloorData = Temai.floorInfo[Temai.curFloorIndex];
		if (_curFloorData.holdLoad || _curFloorData.fetchedAll) {
			callback && callback();
			return;
		}
		var _requestMid = [],
			_data = {},
			_cacheKey = '',
			_midData = [],
			_showType = _curFloorData.showTypes[_curFloorData.showTypeIndex];
		if (!Temai.cgid) {
			_midData = typeMids['type' + _showType] || [];
		} else {
			_midData = catvalMids['cat' + Temai.cgid + '_type' + _showType] || [];
		}
		_curFloorData.totalNum = _midData.length;
		if (_curFloorData.totalNum <= (_curFloorData.pi - 1) * _curFloorData.pc) {
			resetFloorDataOnST(Temai.curFloorIndex);
			if (_curFloorData.fetchedAll) {
				callback && callback();
			} else {
				Temai.loadFocusData(callback);
			}
			return;
		}
		var _beginNo = (_curFloorData.pi - 1) * _curFloorData.pc,
			_endNo = _curFloorData.pi * _curFloorData.pc;
		for (var i = _beginNo; i < _curFloorData.totalNum && i < _endNo; i++) {
			_requestMid.push(_midData[i].dwMid);
		}
		_data = {
			mids: _requestMid.join('|'),
			gid: Temai.id,
			showtype: _showType,
			pagesize: _requestMid.length,
			pageindex: _curFloorData.pi,
			rparams: Temai.sParams,
			callback: 'getBrandData'
		};
		_cacheKey = 'wxtm_' + _requestMid.join('|');
		if (Temai.cgid) {
			_data.category = Temai.cgid;
		}
		wfdata.getData({
			dataType: wfdata.DataType.MaterialQuery,
			param: _data,
			cb: function(json) {
				var _list = json.list;
				_curFloorData.holdLoad = false;
				if (json.errCode != 0 || _list.length == 0) {
					return;
				}
				Temai.showPage(_list, Temai.curFloorIndex, callback);
			},
			handleError: function() {
				_curFloorData.holdLoad = false;
			}
		});
	};
	Temai.showPage = function(list, curFloorIndex, callback) {
		var _curFloorData = Temai.floorInfo[curFloorIndex],
			_showType = _curFloorData.showTypes[_curFloorData.showTypeIndex],
			_floor1Items = [],
			_floor23Items = [],
			_floor4Items = [];
		for (var i = 0; i < list.length; i++) {
			var _d = list[i],
				_mid = _d.dwResourceRegistDetailId;
			if (Temai.showBrandList.indexOf(_mid) > -1) {
				console.log('重复商品:' + _mid);
				continue;
			}
			Temai.showBrandList.push(_mid);
			_d.limit = myUtil.getLimitTime(_d.dwShowBeginTime);
			_d.isLastDay = _d.limit.indexOf("天") == -1;
			_d.sUrl = getDetailLink(_d.sDirectClickUrl, _mid);
			_d.dwShowType = Temai.showtype;
			_d.sMaterialUrl = JD.performance.getScaleImg(_d.sMaterialUrl);
			_d.tagImgUrl = findMarkImgUrl(_d.sUserData5);
			if (_showType == '1') {
				_floor1Items.push(_d);
			} else if (_showType == '2|3') {
				_floor23Items.push(_d);
			} else if (_showType == '4') {
				var _startTime = new Date(_d.dwShowBeginTime * 1000),
					_startTimeV = (_startTime.getMonth() + 1) + '月' + _startTime.getDate() + '日 ';
				_d.startTime = _startTimeV + '9:00开抢';
				if (double11_2015.getShow1111()) {
					_d.startTime = _startTimeV + '0:00开抢';
				}
				_floor4Items.push(_d);
			}
		}
		_floor1Items.length && element.floor1List.append(fj.formatJson(tpl.brandTpl, {
			list: _floor1Items,
			floorIndex: 1
		}));
		_floor23Items.length && element.floor23List.append(fj.formatJson(tpl.brandTpl, {
			list: _floor23Items,
			floorIndex: 2
		}));
		_floor4Items.length && element.floor4List.append(fj.formatJson(tpl.brandPreviewTpl, {
			list: _floor4Items,
			floorIndex: 3
		}));
		li.autoLoadImage({
			fadeIn: true
		});
		_curFloorData.pi++;
		if (_curFloorData.totalNum <= (_curFloorData.pi - 1) * _curFloorData.pc) {
			resetFloorDataOnST(curFloorIndex);
		}
		callback && callback();
	};
	Temai.bindEvent = function() {
		if (!element.toolbarHead.length) {
			element.navDiv.find('.category_nav').css('top', '0');
		} else {
			element.navDiv.find('.category_nav').css('top', element.toolbarHead.height());
		}
		element.win.on('scroll', function() {
			myUtil.throttle(function() {
				setGoTopPosition(2);
			}, null, 5);
			myUtil.throttle(handlerScroll, null, 100);
		});
		element.body.on('touchstart', function(e) {
			if ($(e.target).attr('id') == 'goTop') {
				return;
			}
			myUtil.throttle(function() {
				setGoTopPosition(2);
			}, null, 5);
		});
		element.body.on('touchmove', function(e) {
			if ($(e.target).attr('id') == 'goTop') {
				return;
			}
			myUtil.throttle(function() {
				setGoTopPosition(2);
			}, null, 5);
		});
		element.body.on('touchend', function(e) {
			if ($(e.target).attr('id') == 'goTop') {
				return;
			}
			myUtil.throttle(function() {
				setGoTopPosition(1);
			}, null, 1000);
		});
		element.catMore.on('click', function() {
			$(this).parents('.category_nav_wrap').toggleClass('open');
		});
		element.tabList.on('click', 'a', function() {
			tabClicked($(this).index(), 1);
		});
		element.catList.on('click', 'a', function() {
			catClicked(this, true);
		});
		element.floor1More.on('click', function() {
			tabClicked(2, 2);
		});
		element.floor23More.on('click', function() {
			tabClicked(3, 2);
		});
		element.floor1List.on('tap', 'a', function() {
			floor123Click(this);
		});
		element.floor23List.on('tap', 'a', function() {
			floor123Click(this);
		});
		element.floor4List.on(clickEvent, 'a', function() {
			if (!login.isLogin()) {
				activeCommonFuc.login();
				return;
			}
			subscribeBrandMsg(this, Temai.curRemindId);
		});
		$('#topTong', '#bannerDiv').on('click', 'a', function() {
			activeCommonFuc.recordHistory();
		});
	};
	Temai.checkDomContent = function() {
		setTimeout(function() {
			if (!($.trim(element.bannerDiv.html()))) {
				JD.report.umpBiz({
					bizid: '3',
					operation: '2',
					result: '1',
					source: '0',
					message: 'brand_wx banner empty'
				});
			}
		}, 500);
	};

	function catClicked(obj, isDirect) {
		var $this = $(obj);
		if (isDirect) {
			if ($this.hasClass('cur')) {
				return;
			}
			handlerCatData($this.attr('val'));
			element.navDiv.removeClass('open');
		}
		if ($this.text().indexOf('全部') == -1) {
			element.navDiv.removeClass('has_tag');
			element.tabList.hide();
		} else {
			element.navDiv.addClass('has_tag');
			element.tabList.show();
		}
		resetFloorData();
		if (!isDirect) {
			tabClicked(0, 4);
			return;
		}
		var _st = element.win.scrollTop(),
			_toY = _st;
		if (_st >= navTop) {
			_toY = navTop - navH;
		}
		Temai.cgid = $this.attr('val');
		tabClicked(0, 3, _toY);
	}

	function tabClicked(index, isDirect, toY) {
		var $this = element.tabList.find('a').eq(index);
		if ($this.hasClass('cur') && isDirect != 3 && isDirect != 4) {
			return;
		} else {
			$this.addClass('cur').siblings().removeClass('cur');
		}
		var _cb = null;
		if (isDirect == 4) {
			_cb = function() {
				activeCommonFuc.setPosition(Temai.scrollTop, function() {
					Temai.scrollTop = 0;
				});
			};
		} else {
			var _st = element.win.scrollTop(),
				_toY = toY || _st;
			if (!toY && _st >= navTop) {
				_toY = navTop - navH;
			}
			_cb = function() {
				window.scrollTo(0, _toY);
			};
		}
		floorShow(index);
		Temai.loadFocusData(_cb);
	}

	function findMarkImgUrl(markFlag) {
		var _markImgUrl = '';
		if (!markFlag || markFlag == '0') {
			return _markImgUrl;
		}
		var _markImgUrls = Temai.markData.filter(function(o) {
			return o.markNum == markFlag;
		});
		if (_markImgUrls && _markImgUrls.length) {
			_markImgUrl = _markImgUrls[0].markImg;
		}
		return _markImgUrl;
	}

	function handlerCatData(curCatId) {
		var _cat0 = {
				key: '',
				rd: '37014.1.1',
				title: '全部'
			},
			_tempArr2 = Temai.curNavData.concat(),
			_curIndex = 0;
		if (curCatId) {
			var _curCatIndex = Temai.curNavData.map(function(item) {
				return item.key;
			}).indexOf(curCatId);
			var _tempArr1 = Temai.curNavData.concat(),
				_tempArr2 = _tempArr1.filter(function(item, index) {
					return index != _curCatIndex;
				});
			_tempArr2.unshift(_tempArr1[_curCatIndex]);
			_curIndex = 1;
		}
		_tempArr2.unshift(_cat0);
		handlerHotCatData(_tempArr2, curCatId);
		element.catOne.html(fj.formatJson(tpl.catTpl, {
			list: _tempArr2.slice(0, 5),
			curIndex: _curIndex
		}));
		element.catOther.html(fj.formatJson(tpl.catTpl, {
			list: _tempArr2.slice(5),
			curIndex: Temai.curNavData.length
		}));
		_tempArr2.shift(_cat0);
		Temai.curNavData = _tempArr2.concat();
		renderHotCatData();
	}

	function handlerHotCatData(catArr, curCatId) {
		if (double11_2015.getAfter1101() && Temai.hotCatId) {
			var _curCatIndex = catArr.map(function(item) {
				return item.key;
			}).indexOf(Temai.hotCatId);
			if (Temai.hotCatId != curCatId && _curCatIndex != 2) {
				var _curCat = catArr.splice(_curCatIndex, 1);
				catArr.splice(2, 0, _curCat[0]);
			}
		}
	}

	function renderHotCatData() {
		if (double11_2015.getAfter1101() && Temai.hotCatId) {
			element.catOne.find('a[val="' + Temai.hotCatId + '"]').prepend('<span class="sign_c_tip">HOT</span>');
		}
	}

	function floorShow(curFloorIndex) {
		if (curFloorIndex || curFloorIndex === 0) {
			Temai.curFloorIndex = curFloorIndex;
		}
		var _curBrandTotal = 0;
		switch (Temai.curFloorIndex - 0) {
			case 0:
				element.floor1.show();
				element.floor23.show();
				element.floor4.show();
				element.floor1More.addClass('c_hide');
				element.floor23More.addClass('c_hide');
				if (Temai.cgid) {
					element.floor1.find('.brand_title').removeClass('c_hide');
					element.floor23.find('.brand_title').removeClass('c_hide');
					element.floor4.find('.brand_title').removeClass('c_hide');
					_curBrandTotal = window.focusCptId.filter(function(o) {
						return o.dwCategory == Temai.cgid;
					}).length;
				} else {
					element.floor1.find('.brand_title').addClass('c_hide');
					element.floor23.find('.brand_title').addClass('c_hide');
					element.floor4.find('.brand_title').addClass('c_hide');
					_curBrandTotal = window.focusCptId.length;
				}
				break;
			case 1:
				element.floor1.show();
				element.floor23.hide();
				element.floor4.hide();
				element.floor1.find('.brand_title').addClass('c_hide');
				element.floor1More.removeClass('c_hide');
				_curBrandTotal = typeMids['type1'].length;
				break;
			case 2:
				element.floor23.show();
				element.floor1.hide();
				element.floor4.hide();
				element.floor23.find('.brand_title').addClass('c_hide');
				element.floor23More.removeClass('c_hide');
				_curBrandTotal = typeMids['type2|3'].length;
				break;
			case 3:
				element.floor4.show();
				element.floor1.hide();
				element.floor23.hide();
				element.floor4.find('.brand_title').addClass('c_hide');
				_curBrandTotal = typeMids['type4'].length;
				break;
		};
		li.autoLoadImage({
			fadeIn: true
		});
		Temai.curBrandTotalPage = Math.ceil(_curBrandTotal / Temai.curBrandPageSize);
	}

	function getDetailLink(link, mid) {
		if (/brand_detail_weixin/.test(link) || link.indexOf('/mcoss/mmart/show') > -1) {
			var _actId = url.getUrlParam('actId', link) || url.getUrlParam('actid', link),
				_areaId = url.getUrlParam('areaId', link) || url.getUrlParam('areaid', link),
				_dap = url.getUrlParam('DAP', link) || url.getUrlParam('dap', link),
				_pps = url.getUrlParam('pps', link) || url.getUrlParam('PPS', link),
				_ptag = url.getUrlParam('ptag', link) || url.getUrlParam('PTAG', link);
			if (JD.disasterRecovery.mart.useStaticUrl) {
				return wfdata.getStaticUrl({
					dataType: wfdata.DataType.MART,
					param: {
						actid: _actId,
						areaid: _areaId,
						pc: 100,
						options: 1,
						tpl: 10,
						mid: mid,
						DAP: _dap,
						pps: _pps,
						PTAG: _ptag
					}
				});
			}
			return 'http://wq.jd.com/mcoss/mmart/show?actid=' + _actId + '&areaid=' + _areaId + '&pc=100&options=1&tpl=10&mid=' + mid + '&DAP=' + _dap + '&pps=' + _pps + '&PTAG=' + _ptag;
		} else {
			return link.replace('0.0.0', '37014.6.1');
		}
	}

	function resetFloorDataOnST(curFloorIndex) {
		Temai.floorInfo[curFloorIndex].showTypeIndex++;
		var _curFloorData = Temai.floorInfo[Temai.curFloorIndex];
		if (_curFloorData.showTypeIndex >= _curFloorData.showTypes.length) {
			_curFloorData.fetchedAll = true;
			element.loading.hide();
			window._jdApp && element.jdappdlOutter.show();
		}
		if (!Temai.cgid) {
			switch (curFloorIndex - 0) {
				case 0:
					var _curShowTypeIndex = Temai.floorInfo[curFloorIndex].showTypeIndex;
					if (_curShowTypeIndex < Temai.floorInfo.length) {
						Temai.floorInfo[_curShowTypeIndex].fetchedAll = true;
						Temai.floorInfo[_curShowTypeIndex].pi = Temai.floorInfo[curFloorIndex].pi;
						Temai.floorInfo[_curShowTypeIndex].totalNum = Temai.floorInfo[curFloorIndex].totalNum;
					}
					break;
				case 1:
				case 2:
				case 3:
					!(Temai.floorInfo[0].fetchedAll) && (Temai.floorInfo[0].showTypeIndex = curFloorIndex);
					break;
			}
		}
		Temai.floorInfo[curFloorIndex].pi = 1;
		Temai.floorInfo[curFloorIndex].totalNum = 0;
	}

	function resetFloorData() {
		Temai.showBrandList = [];
		element.floor1List.html('');
		element.floor23List.html('');
		element.floor4List.html('');
		Temai.floorInfo = [{
			showTypeIndex: 0,
			showTypes: ['1', '2|3', '4'],
			holdLoad: false,
			fetchedAll: false,
			totalNum: 0,
			pi: 1,
			pc: 10
		}, {
			showTypeIndex: 0,
			showTypes: ['1'],
			holdLoad: false,
			fetchedAll: false,
			totalNum: 0,
			pi: 1,
			pc: 10
		}, {
			showTypeIndex: 0,
			showTypes: ['2|3'],
			holdLoad: false,
			fetchedAll: false,
			totalNum: 0,
			pi: 1,
			pc: 10
		}, {
			showTypeIndex: 0,
			showTypes: ['4'],
			holdLoad: false,
			fetchedAll: false,
			totalNum: 0,
			pi: 1,
			pc: 10
		}];
	}

	function handlerScroll() {
		var _st = element.body.scrollTop();
		if (_st + winH > element.doc.height() - 320) {
			Temai.loadFocusData();
		}
		if (_st >= navTop && lastScrollTop > _st) {
			element.navDiv.addClass('fixed');
		} else {
			element.navDiv.removeClass('fixed');
		}
		if (_st > winH) {
			element.backTop.show();
		} else {
			element.backTop.hide();
		}
		myUtil.throttle(function() {
			setGoTopPosition(1);
		}, null, 1000);
		lastScrollTop = _st;
	}

	function floor123Click(obj) {
		activeCommonFuc.recordHistory();
		var $obj = $(obj);
		if (!Temai.cgid && Temai.curFloorIndex == 0) {
			var _curPos = $obj.index() + 1;
			if ($obj.parents('#floor23').length) {
				_curPos += element.floor1List.children().length;
			}
			report.trace({
				ptag: $obj.attr('href'),
				action: 1,
				cpos: _curPos
			});
		} else {
			report.trace({
				ptag: $obj.attr('href'),
				action: 1
			});
		}
	}

	function subscribeBrandMsg(obj, remindId) {
		var $this = $(obj);
		if ($this.find('.remindText').text() == '已设置提醒') {
			ui.info({
				msg: '你已经预约过了，请留意“京东JD.COM”服务号的活动提醒！'
			});
		} else {
			wxsubscribeObj.setSubcribe(remindId, {
				isCheckFollow: true,
				success: function(obj) {
					obj.elseObj.find('.remindText').text('已设置提醒');
				},
				orderedCb: function(obj) {
					obj.elseObj.find('.remindText').text('已设置提醒');
				},
				elseObj: $this
			}, ['预约成功', '请留意“京东JD.COM”服务号的活动提醒', '预约成功，请留意“京东JD.COM”服务号的活动提醒']);
		}
	}

	function resetAppDownload() {
		setTimeout(function() {
			window._jdApp && window._jdApp.reload && window._jdApp.reload();
			element.jdappdlOutter.css('margin-bottom', '49px');
		}, 2000);
	}

	function doReport() {
		try {
			if (!(window.ECC_cloud_report_pv && FOOTDETECT && FOOTDETECT.objMsgPv)) {
				setTimeout(doReport, 200);
				return;
			}
			var objData = FOOTDETECT.objMsgPv;
			objData.vurl = 'http://' + location.host + '/mcoss/mportal/brand?ptag=' + Temai.pageRd;
			objData.ptag = Temai.pageRd;
			window._vurl = objData.vurl;
			ECC.cloud.report.pvPortal(objData);
		} catch (e) {}
	}

	function handleMids() {
		var _focusIds = window.focusCptId;
		typeMids['type1'] = [];
		typeMids['type2'] = [];
		typeMids['type3'] = [];
		typeMids['type4'] = [];
		for (var i = 0; i < _focusIds.length; i++) {
			var _item = _focusIds[i],
				_catId = _item.dwCategory;
			typeMids['type' + _item.dwShowType].push(_item);
			switch (_item.dwShowType - 0) {
				case 1:
					if (!catvalMids['cat' + _catId + '_type1']) {
						catvalMids['cat' + _catId + '_type1'] = [];
					}
					catvalMids['cat' + _catId + '_type1'].push(_item);
					break;
				case 4:
					if (!catvalMids['cat' + _catId + '_type4']) {
						catvalMids['cat' + _catId + '_type4'] = [];
					}
					catvalMids['cat' + _catId + '_type4'].push(_item);
					break;
				case 2:
				case 3:
					if (!catvalMids[_catId]) {
						catvalMids[_catId] = [];
					}
					catvalMids[_catId].push(_item);
					break;
			}
		}
		typeMids['type2|3'] = typeMids['type2'].concat(typeMids['type3']);
		for (var o in catvalMids) {
			catvalMids['cat' + o + '_type2|3'] = catvalMids[o].filter(function(item) {
				return item.dwShowType == 2;
			}).concat(catvalMids[o].filter(function(item) {
				return item.dwShowType == 3;
			}));
		}
	}

	function setGoTopPosition(type) {
		var _st = element.win.scrollTop();
		if (_st <= winH) {
			return;
		}
		if (type === 1) {
			element.backTop.html('').removeClass('brand_backtop');
		} else {
			var _brandListOffsetTop = navTop + navH,
				_loadedBrandH = winH + _st - _brandListOffsetTop,
				_loadedBrandNum = Math.ceil(_loadedBrandH / Temai.eachBrandH),
				_loadedBrandPage = Math.min(Math.ceil(_loadedBrandNum / Temai.curBrandPageSize), Temai.curBrandTotalPage);
			element.backTop.html('<span>' + _loadedBrandPage + '<br>' + Temai.curBrandTotalPage + '</span>').addClass('brand_backtop');
		}
	}
	exports.init = function() {
		Temai.initParam();
		Temai.initPage();
		Temai.bindEvent();
		Temai.checkDomContent();
		wxsubscribeObj = wxsubscribe.init({
			isReLogin: true,
			isShowInfo: true
		});
	};
	var activeCommonFuc = {
		recordHistory: function(link) {
			var _tabid = url.getUrlParam('tabid') || '5',
				_tpl = url.getUrlParam('tpl') || '14',
				_url = location.href.replace(/\?.*/g, '') + '?tpl=' + _tpl + '&tabid=' + _tabid + '&cgid=' + Temai.cgid + '&fi=' + Temai.curFloorIndex + '&ch=8&ptag=' + Temai.pageRd + '#st=' + element.win.scrollTop();
			history.replaceState('', document.title, _url);
			if (link) {
				location.href = link;
			}
		},
		login: function() {
			activeCommonFuc.recordHistory();
			login.login();
		},
		setPosition: function(toY, callback) {
			if (!toY) {
				return;
			}
			var _st = element.win.scrollTop();
			if (_st < toY) {
				if (element.doc.height() < toY) {
					Temai.loadFocusData(arguments.callee);
				} else {
					window.scrollTo(0, toY);
					callback && callback();
				}
			} else {
				window.scrollTo(0, toY);
				callback && callback();
			}
		}
	};
	var myUtil = {
		throttle: function(method, context, delay) {
			clearTimeout(method.tId);
			method.tId = setTimeout(function() {
				method.call(context);
			}, delay);
		},
		getTimeDistance: function(ts) {
			var _timeLeft = [0, 0, 0, 0];
			_timeLeft[0] = (ts > 86400) ? parseInt(ts / 86400) : 0;
			ts = ts - _timeLeft[0] * 86400;
			_timeLeft[1] = (ts > 3600) ? parseInt(ts / 3600) : 0;
			ts = ts - _timeLeft[1] * 3600;
			_timeLeft[2] = (ts > 60) ? parseInt(ts / 60) : 0;
			_timeLeft[3] = ts - _timeLeft[2] * 60;
			return _timeLeft;
		},
		getLimitTime: function(bt) {
			bt = bt * 1 + 3600 * 9;
			var _et = bt * 1 + 3600 * 24 * 3,
				_tmp = myUtil.getTimeDistance(_et - new Date() / 1000),
				_str = "";
			if (_tmp[0] > 0) {
				_str = '剩' + _tmp[0] + '天';
			} else if (_tmp[1] > 0) {
				_str = '剩' + _tmp[1] + '小时';
			} else if (_tmp[2] > 0) {
				_str = '剩' + _tmp[2] + '分';
			} else {
				_str = '剩' + _tmp[3] + '秒';
			}
			return _str;
		}
	};
	exports.initV2 = function() {
		double11_2015.changeStyle();
		exports.init();
		wxpopmenu.init();
		resetAppDownload();
		doReport();
		setTimeout(function() {
			lanchGjApp.lanchGjApp();
		}, 2000);
		sidenav.init({
			footDomClass: 'nav_room',
			dataId: 19557
		});
	};
});