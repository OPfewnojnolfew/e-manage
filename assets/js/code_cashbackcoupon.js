var TYPE = {
    CASHBACK: 1,
    COUPON: 2
}
var CASHBACKTYPE = [{
    KEY: 1,
    VALUE: '金额（元）'
}, {
    KEY: 2,
    VALUE: '比率（%）'
}];
var defaultOptions = {
    gastationsUrl: '',
    saveUrl: ''
};
var CashbackCouponSet = function($container, options) {
    this.MIN = 5;
    this.$container = $container;
    this.options = $.extend({}, defaultOptions, options);
    this._init();
};
CashbackCouponSet.prototype = {
    _init: function() {
        this._createCashbackCoupon();
        this._bindEvent();
    },
    _createCashbackCoupon: function() {
        var setObj = this._getCashbackCouponObj();
        var $item,
            $contentContainer,
            $operateContainer;
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
        this.$container.append('<a class="J_save am-btn am-btn-primary am-margin-left">保存</a>');
    },
    _bindEvent: function() {
        var self = this;
        this.$container.on('keyup', function(e) {
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
            }
        });
        this.$container.on('change', function(e) {
            var $target = $(e.target),
                flag = $target.attr('data-flag');
            if (flag && (flag = flag.split('_')) && flag.length) {
                if ($target.is('.J_type')) {
                    var checkeds = [];
                    $('.J_type[data-flag="' + flag.join('_') + '"]:checked', self.$container).each(function() {
                        checkeds.push($(this).val());
                    });
                    self._getCashbackCouponItemObj(flag[0])[flag[1]] = checkeds.join(',');
                }
                if ($target.is('.J_gastation_select')) {
                    var val = $target.val();
                    val = val ? val.join(',') : '';
                    self._getCouponItem(flag[0])[flag[2]][flag[3]] = val;
                }
                if ($target.is('.J_cashbacktype_select')) {
                    self._getCashbackItem(flag[0])[flag[2]] = $target.val();
                }
            }
        });
        this.$container.on('click', function(e) {
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
            if ($target.hasClass('J_save')) {
                var setObj = self.get();
                setObj && $.get(self.options.saveUrl, {
                    setObj: JSON.stringify(setObj)
                }, function(res) {
                    if (res.err_code == 0) {
                        notify.success('保存成功');
                    } else {
                        notify.error('保存失败');
                    }
                });
            }
        });
    },
    _createCashbackCouponItem: function(index) {
        var cashbackCoupon = this._getCashbackCouponItemObj(index),
            cashback = this._getCashbackItem(index);
        var itemDom = `<div class="am-panel am-panel-default">
                <div class="am-panel-hd ccs-head">
                    <label>开始：</label><input type="text" data-flag="${index}_begin" value="${cashbackCoupon.begin}"/>
                    <label>结束：</label><input type="text" data-flag="${index}_end" value="${cashbackCoupon.end}"/>
                </div>
                <div class="am-panel-bd ccs-body">
                    <div class="am-margin-bottom">
                        <div class="am-checkbox"><label><input type="checkbox" class="J_type" ${(','+cashbackCoupon.type+',').indexOf(','+TYPE.CASHBACK+',')>-1?'checked':''}  data-flag="${index}_type" value="${TYPE.CASHBACK}"/>返现金</label></div>
                        <div class="am-margin-left am-form">
                            <input type="text" data-flag="${index}_${TYPE.CASHBACK}_credit" value="${cashback.credit}"/>
                            <select class="J_cashbacktype_select" data-flag="${index}_${TYPE.CASHBACK}_type">
                                <option value="${CASHBACKTYPE[0].KEY}" ${cashback.type==CASHBACKTYPE[0].KEY?'selected':''}>${CASHBACKTYPE[0].VALUE}</option>
                                <option value="${CASHBACKTYPE[1].KEY}" ${cashback.type==CASHBACKTYPE[1].KEY?'selected':''}>${CASHBACKTYPE[1].VALUE}</option>
                            </select>
                        </div>
                    </div>
                    <div class="am-margin-bottom">
                        <div class="am-checkbox"><label><input type="checkbox" class="J_type"  ${(','+cashbackCoupon.type+',').indexOf(','+TYPE.COUPON+',')>-1?'checked':''} data-flag="${index}_type" value="${TYPE.COUPON}"/>返优惠劵</label></div>
                        <div class="am-margin-left am-form">
                        <table class="am-table">
                        <thead>
                            <tr>
                                <th>名称</th>
                                <th>额度</th>
                                <th>限额</th>
                                <th>期限</th>
                                <th>数量</th>
                                <th class="secondlast">加气站</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody class="co-tbody-${index}">
                        </tbody>
                        </table>
                        </div>
                    </div>
                </div>
            </div>`;
        var $itemDom = $(itemDom);
        this._createCoupon(index, $('tbody', $itemDom));
        return $itemDom;
    },
    _createCoupon: function(index, $container) {
        var self = this;
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
            $tds = $(`<td><input type="text" data-flag="${index}_${TYPE.COUPON}_${i}_name" value="${coupon.name}"/></td>
            <td><input type="text" data-flag="${index}_${TYPE.COUPON}_${i}_denomination" value="${coupon.denomination}"/></td>
            <td><input type="text" data-flag="${index}_${TYPE.COUPON}_${i}_limit" value="${coupon.limit}"/></td>
            <td><input type="text" class="J_expires" data-flag="${index}_${TYPE.COUPON}_${i}_expires" value="${coupon.expires}" readonly/></td>
            <td><input type="text" data-flag="${index}_${TYPE.COUPON}_${i}_amount" value="${coupon.amount}"/></td>
            <td><select multiple class="J_gastation_select" data-flag="${index}_${TYPE.COUPON}_${i}_gastations"/></td>
            `);
            $('.J_expires', $tds).datepicker({
                format: 'yyyy-mm-dd',
                autoClose: true
            }).on('changeDate.datepicker.amui', function(event) {
                var $this = $(this),
                    flag = $this.attr('data-flag').split('_');
                self._getCouponItem(flag[0])[flag[2]][flag[3]] = $this.val();
            });
            this._createGastations($('select', $tds), coupon.gastations);
            $tr.append($tds);
            if (i === length - 1) {
                $tr.append($(`<td><a href="javascript:void(0)" data-flag="${index}_${i}_1" class="J_plusreduce iconfont iconfont-lg">&#xe61d;</a></td>`));
            } else {
                $tr.append($(`<td><a href="javascript:void(0)" data-flag="${index}_${i}_2" class="J_plusreduce iconfont iconfont-lg">&#xe623;</a></td>`));
            }
            $container.append($tr);
        }
    },
    _createGastations: function($container, selectedValue) {
        var self = this,
            afterAjax = function(result) {
                var $option, item, i = 0,
                    len = result.length;
                for (; i < len; i++) {
                    item = result[i];
                    $option = $(`<option value="${item.key}"  ${(','+selectedValue+',').indexOf(','+item.key+',')>-1?'selected':''}>${item.value}</option>`);
                    $container.append($option);
                }
                $container.selected({
                    btnSize: 'sm',
                    maxHeight: 60
                });
            };
        if (this.gastationsObj) {
            afterAjax(this.gastationsObj);
        } else if (this.gasAjax) {
            this.gasAjax.then(function(result) {
                afterAjax(result);
            })
        } else {
            this.gasAjax = $.get(this.options.gastationsUrl).then(function(res) {
                // res = JSON.parse(res);
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
    _getCashbackCouponObj: function() {
        return this.options.setObj || (this.options.setObj = [{
            begin: '',
            end: '',
            type: ''
        }]);
    },
    _getCashbackCouponItemObj: function(index) {
        var cashbackCouponObj = this._getCashbackCouponObj();
        return cashbackCouponObj[index];
    },
    _getCashbackItem: function(index) {
        var itemObj = this._getCashbackCouponItemObj(index);
        return itemObj.cashback || (itemObj.cashback = {
            type: '',
            credit: ''
        });
    },
    _getCouponItem: function(index) {
        var itemObj = this._getCashbackCouponItemObj(index);
        itemObj.coupons && itemObj.coupons.length || (itemObj.coupons = [{
            name: '',
            denomination: '',
            limit: '',
            expires: '',
            amount: '',
            gastations: ''
        }]);
        return itemObj.coupons;
    },
    _addCashbackCouponItem: function() {
        this.options.setObj.push({
            begin: '',
            end: '',
            type: ''
        });
        this._createCashbackCoupon();
    },
    _removeCashbackCouponItem: function(index) {
        this.options.setObj.splice(index, 1);
        this._createCashbackCoupon();
    },
    _addCouponItem: function(index) {
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
    _removeCouponItem: function(index, i) {
        var coupons = this._getCouponItem(index);
        coupons.splice(i, 1);
        this._createCoupon(index, $('.co-tbody-' + index));
    },
    get: function() {
        var setObj = this._getCashbackCouponObj(),
            length = setObj.length;
        if (length < 2) {
            notify.warn('需要两个及以上区域');
            return false;
        }
        for (var i = 0, item, begin, end; i < length; i++) {
            item = setObj[i];
            begin = +item.begin;
            end = +item.end;
            if (isNaN(begin) || isNaN(begin)) {
                notify.warn('开始金额和结束金额必须为数字');
                return false;
            }
            if (end < begin) {
                notify.warn('结束金额必须大于开始金额');
                return false;
            }
            if (i > 0 && begin != setObj[i - 1].end) {
                notify.warn('开始金额必须和上区域的结束金额相等');
                return false;
            }
        }
        return setObj;
    }
};
$(function() {
    $.get('', function(res) {
        if (res.err_code == 0) {
            var cashback = new CashbackCouponSet($('.J_container'), {
                setObj: res.data,
                gastationsUrl: gastationsUrl,
                saveUrl: saveRuleUrl
            });
        }
    });
});
