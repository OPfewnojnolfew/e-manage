$(function() {
    var $confirmModal = $('.J_confirm'), //模态confirm
        $multiCheckbox = $('th input[type="checkbox"]'), //多选
        $singleCheckbox = $('td input[type="checkbox"]'), //单选
        /**
         * 删除
         * @param  {[type]}   ids      [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        del = function(ids, callback) {
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
                            notify.warn('删除成功');
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
     * 单条删除
     * @param  {[type]} 
     * @return {[type]}   [description]
     */
    $('.J_single_del').on('click', function() {
        var $this = $(this),
            $tr = $this.closest('tr'),
            id = $tr.attr('data-id');
        del(id, function() {
            location.href = location.href;
        });
    });
    /**
     * 批量删除
     * @param  {[type]} 
     * @return {[type]}   [description]
     */
    $('.J_multi-del').on('click', function() {
        var ids = [];
        $singleCheckbox.each(function() {
            this.checked && ids.push($(this).closest('tr').attr('data-id'));
        });
        del(ids.join(','), function() {
            location.href = location.href;
        });
    });
    /**
     * 提交
     * @param  {[type]} 
     * @return {[type]}   [description]
     */
    $('.J_submit').on('click', function() {
        var $title = $('#news-title'),
            $id = $('#news_id'),
            id = $id.val(),
            t = id ? '编辑' : '添加',
            title = $.trim($title.val());
        if (title === '') {
            notify.warn('标题不能为空!');
            $title.focus();
            return;
        }
        $('.J_form').ajaxSubmit({
            success: function(res) {
                if (res.err_code == 0) {
                    notify.success(t + '成功');
                    location.href = '';
                } else {
                    notify.warn(t + '失败');
                }
            }
        });
    });
});
