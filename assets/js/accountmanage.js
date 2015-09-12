$(function() {
    $('.J_plus').on('click', function() {
        var accountTime = $('.J_datetime').val();
        if (!accountTime) {
            notify.warn('对账时间不能为空');
            return;
        }
        $('.J_addform').ajaxSubmit({
            success: function(res) {
                if (res.err_code == 0) {
                    notify.success('添加对账成功');
                    location.href = '';
                } else {
                    notify.warn('添加对账失败');
                }
            }
        });
    });
});
