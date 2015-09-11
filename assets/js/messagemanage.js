$(function() {
 
    /**
     * 提交新增编辑消息
     * @param  {[type]} 
     * @return {[type]}   [description]
     */
    $('.J_submit').on('click', function() {
            var $messageConent = $('#message-content'),
                id = $('#message-id').val(),
                t = id ? '编辑' : '新增',
                messageConent = $.trim($messageConent.val());
            if (!messageConent) {
            notify.warn('消息内容不能为空！');
            $messageConent.focus();
            return false;
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
