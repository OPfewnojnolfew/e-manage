var CashbackCouponSet = function($container, options) {
    this.MIN = 5;
    this.$container = $container;
    this.options = $.extend({}, defaultOptions, options);
    this._init();
};
CashbackSet.prototype = {
    _init: function() {
        var setObj = this.options.setObj;
        var $items = $item = $('<div></div>'),
            $contentContainer = $('<div></div>'),
            $operateContainer = $('<div></div>');
        $item.append($contentContainer).append($operateContainer);
        for (var i = 0, len = setObj.length; i < len; i++) {
            $items.append(this._createCashbackCouponItem(), i, len);
            // $contentContainer.html(this._createCashbackItemContent());
            // if (i === len - 1) {
            //     var $plus = $('<a href="javascript:void(0)" class="sms-plus iconfont">&#xe603;</a>');
            //     $operateContainer.html($plus);
            // } else {
            //     var $reduce = $('<a href="javascript:void(0)" class="sms-reduce iconfont">&#xe604;</a>');
            //     $operateContainer.html($reduce);
            // }
            // $items.append($item);
        }
    },
    _createCashbackCoupon: function($container) {
        var setObj = this.options.setObj;
        var $items = $item = $('<div></div>'),
            $contentContainer = $('<div></div>'),
            $operateContainer = $('<div></div>');
        $item.append($contentContainer).append($operateContainer);
        for (var i = 0, len = setObj.length; i < len; i++) {
            $contentContainer.append(this._createCashbackItemContent(index));
            if (i === len - 1) {
                var $plus = $('<a href="javascript:void(0)" class="sms-plus iconfont">&#xe603;</a>');
                $operateContainer.html($plus);
            } else {
                var $reduce = $('<a href="javascript:void(0)" class="sms-reduce iconfont">&#xe604;</a>');
                $operateContainer.html($reduce);
            }
            $items.append($item);
        }
    },
    _createCashbackCouponItem: function(index) {
        var itemObj = this._getCashbackCouponItemObj(index);
        var itemDom = (<div class="am-panel am-panel-default">
                <div class="am-panel-bd">
                    <div>
                        begin:<input type="text"/>
                        end:<input type="text"/>
                    </div>
                    <div>
                        <p></p>
                        <div>
                            <input type="text"/>
                            <select>
                                <option></option>
                                <option></option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <p></p>
                        <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                        </table>
                    </div>
                </div>
            </div>);
        this._createCoupon(index, $container);

    },
    _createCoupon: function(index, $container) {
        $container.html('');
        var coupons = _getCashbackCouponItemCoupon(index),
            i = 0,
            length = coupons.length,
            coupon,
            $tr = $('<tr></tr>');
        for (; i < length; i++) {
            coupon = coupons[i];
            $tr.append($('<td><input type="text" class="J_coupon_Name ccs_' + index + '_' + i + '_name" value="' + coupon.name + '"/></td>'));
            $tr.append($('<td><input type="text" class="J_coupon_Denomination ccs_' + index + '_' + i + '_denomination" value="' + coupon.denomination + '"/></td>'));
            $tr.append($('<td><input type="text" class="J_coupon_Limit ccs_' + index + '_' + i + '_limit" value="' + coupon.limit + '"/></td>'));
            $tr.append($('<td><input type="text" class="J_coupon_Expires ccs_' + index + '_' + i + '_expires" value="' + coupon.expires + '"/></td>'));
            $tr.append($('<td><input type="text" class="J_coupon_Amount ccs_' + index + '_' + i + '_amount" value="' + coupon.amount + '"/></td>'));
            $tr.append($('<td><input type="text" class="J_coupon_Gastations ccs_' + index + '_' + i + '_gastations" value="' + coupon.gastations + '"/></td>'));
            if (i === len - 1) {
                $tr.append($('<td><a href="javascript:void(0)" class="sms-plus iconfont">&#xe603;</a></td>'));
            } else {
                $tr.append($('<td><a href="javascript:void(0)" class="sms-reduce iconfont">&#xe604;</a></td>'));
            }
            $container.append($tr);
        }
    },
    _getCashbackCouponItemObj: function(index) {
        if (this.options.setObj && index < this.options.setObj.length) {
            return this.options.setObj[index];
        }
        return this.options.setObj = {
            begin: '',
            end: '',
            type: ''
        };
    },
    _getCashbackItem: function() {
        var itemObj = this._getCashbackCouponItemObj();
        !itemObj.cashback || (itemObj.cashback = {
            type: '',
            credit: ''
        });
    },
    _getCouponItem: function() {
        var itemObj = this._getCashbackCouponItemObj();
        !itemObj.coupons || (itemObj.coupons = [{
            name: '',
            denomination: '',
            limit: '',
            expires: '',
            amount: '',
            gastations: ''
        }]);
    }
};
