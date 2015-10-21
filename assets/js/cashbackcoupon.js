'use strict';

var TYPE = {
    CASHBACK: 1,
    COUPON: 2
};
var CASHBACKTYPE = [{
    KEY: 1,
    VALUE: '金额（元）'
}, {
    KEY: 2,
    VALUE: '比率（%）'
}];
var defaultOptions = {
    gastationsUrl: 'assets/js/test.json'
};
var CashbackCouponSet = function CashbackCouponSet($container, options) {
    this.MIN = 5;
    this.$container = $container;
    this.options = $.extend({}, defaultOptions, options);
    this._init();
};
CashbackCouponSet.prototype = {
    _init: function _init() {
        this._createCashbackCoupon();
        this._bindEvent();
    },
    _createCashbackCoupon: function _createCashbackCoupon() {
        var setObj = this._getCashbackCouponObj();
        var $item, $contentContainer, $operateContainer;
        this.$container.html('');
        for (var i = 0, len = setObj.length; i < len; i++) {
            $item = $('<div class="am-g ccs-item"></div>');
            $contentContainer = $('<div class="am-u-md-11"></div>');
            $operateContainer = $('<div class="am-u-md-1"></div>');
            $contentContainer.html(this._createCashbackCouponItem(i));
            if (i === len - 1) {
                $operateContainer.html($('<a href="javascript:void(0)" data-flag="${i}_1" class="J_plusreduce iconfont iconfont-30">&#xe61d;</a>'));
            } else {
                $operateContainer.html($('<a href="javascript:void(0)" data-flag="${i}_2" class="J_plusreduce iconfont iconfont-30">&#xe623;</a>'));
            }
            $item.append($contentContainer).append($operateContainer);
            this.$container.append($item);
        }
    },
    _bindEvent: function _bindEvent() {
        var self = this;
        this.$container.on('keyup', function (e) {
            var $target = $(e.target),
                flag = $target.attr('data-flag');
            if ($target.is('input[type = "text"]') && flag && (flag = flag.split('_')) && flag.length) {
                if (flag.length === 2) {
                    self._getCashbackCouponItemObj(flag[0])[flag[1]] = $target.val();
                } else if (flag.length === 3) {
                    self._getCashbackItem(flag[0])[flag[2]] = $target.val();
                } else if (flag.length === 4) {
                    self._getCouponItem(flag[0])[flag[2]][flag[3]] = $target.val();
                }
                console.log(self._getCashbackCouponObj());
            }
        });
        this.$container.on('change', function (e) {
            var $target = $(e.target),
                flag = $target.attr('data-flag');
            if (flag && (flag = flag.split('_')) && flag.length) {
                if ($target.is('.J_type')) {
                    var checkeds = [];
                    $('.J_type:checked', self.$container).each(function () {
                        checkeds.push($(this).val());
                    });
                    self._getCashbackCouponItemObj(flag[0])[flag[1]] = checkeds.join(',');
                }
                if ($target.is('.J_gastation_select')) {
                    self._getCouponItem(flag[0])[flag[2]][flag[3]] = $target.val();
                }
                if ($target.is('.J_cashbacktype_select')) {
                    self._getCashbackItem(flag[0])[flag[2]] = $target.val();
                }
                console.log(self._getCashbackCouponObj());
            }
        });
        this.$container.on('click', function (e) {
            var $target = $(e.target);
            if ($target.hasClass('J_plusreduce')) {
                var flag = $target.attr('data-flag');
                if (flag && (flag = flag.split('_')) && flag.length) {
                    if (flag.length === 2) {
                        self[flag[1] == 1 ? '_addCashbackCouponItem' : '_removeCashbackCouponItem'](flag[0]);
                    } else if (flag.length === 3) {
                        self[flag[2] == 1 ? '_addCouponItem' : '_removeCouponItem'](flag[0], flag[1]);
                    }
                }
            }
        });
    },
    _createCashbackCouponItem: function _createCashbackCouponItem(index) {
        var cashbackCoupon = this._getCashbackCouponItemObj(index),
            cashback = this._getCashbackItem(index);
        var itemDom = '<div class="am-panel am-panel-default">\n                <div class="am-panel-hd ccs-head">\n                    <label>开始：</label><input type="text" data-flag="' + index + '_begin" value="' + cashbackCoupon.begin + '"/>\n                    <label>结束：</label><input type="text" data-flag="' + index + '_end" value="' + cashbackCoupon.end + '"/>\n                </div>\n                <div class="am-panel-bd ccs-body">\n                    <div class="am-margin-bottom">\n                        <div class="am-checkbox"><label><input type="checkbox" class="J_type" ' + ((',' + cashbackCoupon.type + ',').indexOf(',' + TYPE.CASHBACK + ',') > -1 ? 'checked' : '') + '  data-flag="' + index + '_type" value="' + TYPE.CASHBACK + '"/>返现金</label></div>\n                        <div class="am-margin-left am-form">\n                            <input type="text" data-flag="' + index + '_' + TYPE.CASHBACK + '_credit" value="' + cashback.credit + '"/>\n                            <select class="J_cashbacktype_select" data-flag="' + index + '_' + TYPE.CASHBACK + '_type">\n                                <option value="' + CASHBACKTYPE[0].KEY + '" ' + (cashback.type == CASHBACKTYPE[0].KEY ? 'selected' : '') + '>' + CASHBACKTYPE[0].VALUE + '</option>\n                                <option value="' + CASHBACKTYPE[1].KEY + '" ' + (cashback.type == CASHBACKTYPE[1].KEY ? 'selected' : '') + '>' + CASHBACKTYPE[1].VALUE + '</option>\n                            </select>\n                        </div>\n                    </div>\n                    <div class="am-margin-bottom">\n                        <div class="am-checkbox"><label><input type="checkbox" class="J_type"  ' + ((',' + cashbackCoupon.type + ',').indexOf(',' + TYPE.COUPON + ',') > -1 ? 'checked' : '') + ' data-flag="' + index + '_type" value="' + TYPE.COUPON + '"/>返优惠劵：</label></div>\n                        <div class="am-margin-left am-form">\n                        <table class="am-table">\n                        <thead>\n                            <tr>\n                                <th>名称</th>\n                                <th>额度</th>\n                                <th>限额</th>\n                                <th>期限</th>\n                                <th>数量</th>\n                                <th class="secondlast">加气站</th>\n                                <th></th>\n                            </tr>\n                        </thead>\n                        <tbody class="co-tbody-' + index + '">\n                        </tbody>\n                        </table>\n                        </div>\n                    </div>\n                </div>\n            </div>';
        var $itemDom = $(itemDom);
        this._createCoupon(index, $('tbody', $itemDom));
        return $itemDom;
    },
    _createCoupon: function _createCoupon(index, $container) {
        $container.html('');
        var coupons = this._getCouponItem(index),
            i = 0,
            length = coupons.length,
            coupon,
            $tds,
            $tr;
        for (; i < length; i++) {
            $tr = $('<tr></tr>');
            coupon = coupons[i];
            $tds = $('<td><input type="text" data-flag="' + index + '_' + TYPE.COUPON + '_' + i + '_name" value="' + coupon.name + '"/></td>\n            <td><input type="text" data-flag="' + index + '_' + TYPE.COUPON + '_' + i + '_denomination" value="' + coupon.denomination + '"/></td>\n            <td><input type="text" data-flag="' + index + '_' + TYPE.COUPON + '_' + i + '_limit" value="' + coupon.limit + '"/></td>\n            <td><input type="text" data-flag="' + index + '_' + TYPE.COUPON + '_' + i + '_expires" value="' + coupon.expires + '"/></td>\n            <td><input type="text" data-flag="' + index + '_' + TYPE.COUPON + '_' + i + '_amount" value="' + coupon.amount + '"/></td>\n            <td><select class="J_gastation_select" data-flag="' + index + '_' + TYPE.COUPON + '_' + i + '_gastations"/></td>\n            ');
            this._createGastations($('select', $tds), coupon.gastations);
            $tr.append($tds);
            if (i === length - 1) {
                $tr.append($('<td><a href="javascript:void(0)" data-flag="' + index + '_' + i + '_1" class="J_plusreduce iconfont iconfont-lg">&#xe61d;</a></td>'));
            } else {
                $tr.append($('<td><a href="javascript:void(0)" data-flag="' + index + '_' + i + '_2" class="J_plusreduce iconfont iconfont-lg">&#xe623;</a></td>'));
            }
            $container.append($tr);
        }
    },
    _createGastations: function _createGastations($container, selectedValue) {
        var self = this,
            afterAjax = function afterAjax(result) {
            var $option,
                item,
                i = 0,
                len = result.length;
            for (; i < len; i++) {
                item = result[i];
                $option = $('<option value="' + item.key + '" ' + (selectedValue == item.key ? 'selected' : '') + '>' + item.value + '</option>');
                $container.append($option);
            }
        };
        if (this.gastationsObj) {
            afterAjax(this.gastationsObj);
        } else if (this.gasAjax) {
            this.gasAjax.then(function (result) {
                afterAjax(result);
            });
        } else {
            this.gasAjax = $.get(this.options.gastationsUrl).then(function (res) {
                res = JSON.parse(res);
                var result = [];
                if (res.err_code == 0 && res.data) {
                    result = res.data;
                    self.gastationsObj = result;
                    afterAjax(result);
                }
                return result;
            });
        }
    },
    _getCashbackCouponObj: function _getCashbackCouponObj() {
        return this.options.setObj || (this.options.setObj = [{
            begin: '',
            end: '',
            type: ''
        }]);
    },
    _getCashbackCouponItemObj: function _getCashbackCouponItemObj(index) {
        var cashbackCouponObj = this._getCashbackCouponObj();
        return cashbackCouponObj[index];
    },
    _getCashbackItem: function _getCashbackItem(index) {
        var itemObj = this._getCashbackCouponItemObj(index);
        return itemObj.cashback || (itemObj.cashback = {
            type: '',
            credit: ''
        });
    },
    _getCouponItem: function _getCouponItem(index) {
        var itemObj = this._getCashbackCouponItemObj(index);
        return itemObj.coupons || (itemObj.coupons = [{
            name: '',
            denomination: '',
            limit: '',
            expires: '',
            amount: '',
            gastations: ''
        }]);
    },
    _addCashbackCouponItem: function _addCashbackCouponItem() {
        this.options.setObj.push({
            begin: '',
            end: '',
            type: ''
        });
        this._createCashbackCoupon();
    },
    _removeCashbackCouponItem: function _removeCashbackCouponItem(index) {
        this.options.setObj.splice(index, 1);
        this._createCashbackCoupon();
    },
    _addCouponItem: function _addCouponItem(index) {
        var coupons = this._getCouponItem(index);
        coupons.push({
            name: '',
            denomination: '',
            limit: '',
            expires: '',
            amount: '',
            gastations: ''
        });
        this._createCoupon(index, $('.co-tbody-' + index));
    },
    _removeCouponItem: function _removeCouponItem(index, i) {
        var coupons = this._getCouponItem(index);
        coupons.splice(i, 1);
        this._createCoupon(index, $('.co-tbody-' + index));
    }
};
new CashbackCouponSet($('.J_container'));
