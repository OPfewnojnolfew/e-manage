$(function() {
    var $confirmModal = $('.J_confirm'), //模态confirm
        $confirmModalContent = $('.am-modal-bd', $confirmModal),
        $multiCheckbox = $('th input[type="checkbox"]'), //多选
        $singleCheckbox = $('td input[type="checkbox"]'), //单选
        /**
         * 下架
         * @param  {[type]}   ids      [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        downCommodity = function(ids, callback) {
            if (!ids) {
                notify.warn('未选择任何项');
                return;
            }
            $confirmModalContent.text('确定下架该商品吗?');
            $confirmModal.modal({
                onConfirm: function(options) {
                    $.post('', {
                        ids: ids
                    }).then(function(res) {
                        if (res.err_code == 0) {
                            notify.warn('下架成功');
                            callback && callback();
                        } else {
                            notify.warn(res.err_msg);
                        }
                    });
                },
                onCancel: function() {}
            });
        },
        /**
         * 上架
         * @param  {[type]}   ids      [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        upCommodity = function(ids, callback) {
            if (!ids) {
                notify.warn('未选择任何项');
                return;
            }
            $confirmModalContent.text('确定上架该商品吗?');
            $confirmModal.modal({
                onConfirm: function(options) {
                    $.post('', {
                        ids: ids
                    }).then(function(res) {
                        if (res.err_code == 0) {
                            notify.warn('上架成功');
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
     * 单条下架
     * @param  {[type]} 
     * @return {[type]}   [description]
     */
    $('.J_disable').on('click', function() {
        var $this = $(this),
            $tr = $this.closest('tr'),
            id = $tr.attr('data-id');
        downCommodity(id, function() {
            location.href = location.href;
        });
    });
    /**
     * 单条上架
     * @param  {[type]} 
     * @return {[type]}   [description]
     */
    $('.J_enable').on('click', function() {
        var $this = $(this),
            $tr = $this.closest('tr'),
            id = $tr.attr('data-id');
        upCommodity(id, function() {
            location.href = location.href;
        });
    });
    /**
     * 提交
     * @param  {[type]} 
     * @return {[type]}   [description]
     */
    $('.J_submit').on('click', function() {
        var $name = $('#commodity-name'),
            $id = $('#commodity_id'),
            id = $id.val(),
            t = id ? '编辑' : '添加',
            name = $.trim($name.val());
        if (name === '') {
            notify.warn('商品名称不能为空!');
            $name.focus();
            return;
        }
        $('.J_form').ajaxSubmit({
            success: function(res) {
                if (res.code == 200) {
                    notify.success(t + '成功');
                    location.href = '';
                } else {
                    notify.warn(t + '失败');
                }
            }
        });
    });
});
