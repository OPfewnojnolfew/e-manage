$(function() {
    var $geo = $('.J_geo');
    $geo.length && $geo.geo({
        checked: function(a, b) {
            // $searchForm.submit();
        }
    });
    /**
     * 提交编辑新增加气站
     * @param  {[type]} 
     * @return {[type]}   [description]
     */
    $('.J_submit').on('click', function() {
        var id = $('#gas_id').val(),
            t = id ? '编辑' : '新增',
            $gasMail = $('#gas-email'),
            gasMail = $.trim($gasMail.val()),
            $gasName = $('#gas-name'),
            gasName = $.trim($gasName.val());
        if (gasMail === '') {
            notify.warn('邮箱不能为空');
            $gasMail.focus();
            return;
        }
        if (gasName === '') {
            notify.warn('名称不能为空');
            $gasName.focus();
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
