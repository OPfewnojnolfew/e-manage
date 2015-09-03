$(function() {
    var $confirmModal = $('.J_confirm'), //模态confirm
        /**
         * 拉黑司机
         * @param  {[type]}   ids      [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        blackDiver = function(ids, callback) {
            if (!ids) {
                notify.warn('未选择任何项');
                return;
            }
            $confirmModal.modal({
                onConfirm: function(options) {
                    $.post('', {
                        ids: ids
                    }).then(function(res) {
                        if (res.err_code == 0) {
                            notify.warn('禁用成功');
                            callback && callback();
                        } else {
                            notify.warn(res.err_msg);
                        }
                    });
                },
                onCancel: function() {}
            });
        },
        whiteDiver = function(ids, callback) {
            if (!ids) {
                notify.warn('未选择任何项');
                return;
            }
            $confirmModal.modal({
                onConfirm: function(options) {
                    $.post('', {
                        ids: ids
                    }).then(function(res) {
                        if (res.err_code == 0) {
                            notify.warn('禁用成功');
                            callback && callback();
                        } else {
                            notify.warn(res.err_msg);
                        }
                    });
                },
                onCancel: function() {}
            });
        };
    /**
     * 单条拉黑司机
     * @param  {[type]} 
     * @return {[type]}   [description]
     */
    $('.J_black').on('click', function() {
        var $this = $(this),
            $tr = $this.closest('tr'),
            id = $tr.attr('data-id');
        blackDiver(id, function() {
            location.href = location.href;
        });
    });
    /**
     * 单条激活司机
     * @param  {[type]} 
     * @return {[type]}   [description]
     */
    $('.J_white').on('click', function() {
        var $this = $(this),
            $tr = $this.closest('tr'),
            id = $tr.attr('data-id');
        whiteDiver(id, function() {
            location.href = location.href;
        });
    });

});
