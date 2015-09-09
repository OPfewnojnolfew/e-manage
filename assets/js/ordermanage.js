$(function() {
    var $modal = $('.J_moal'),
        $submit = $('.J_modal_submit'),
        $id = $('.J_modal_id'),
        $modalForm = $('.J_modal_form');
    $('.J_deal').on('click', function() {
        var $li = $(this).closest('li');
        $modalForm[0].reset();
        $id.val($li.attr('data-id'));
        $modal.modal();
    });
    $submit.on('click', function() {
        $modalForm.ajaxSubmit({
            success: function(res) {
                if (res.err_code == 0) {
                    notify.success('处理成功');
                    location.href = location.href;
                } else {
                    notify.warn(res.err_msg);
                }
            }
        });
    });
});
