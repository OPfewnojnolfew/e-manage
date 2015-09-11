$(function() {
    var imageUploadifyFore = $('.J_upload_container_fore').imageUploadify({
            previewWidth: 120,
            previewHeight: 80,
            fieldFormat: {
                uploadedImageId: 'yourselfiamgeid',
                uploadedImagePath: 'yourselfiamgesrc'
            }
        }),
        imageUploadifyBack = $('.J_upload_container_back').imageUploadify({
            previewWidth: 120,
            previewHeight: 80,
            fieldFormat: {
                uploadedImageId: 'yourselfiamgeid',
                uploadedImagePath: 'yourselfiamgesrc'
            }
        });
    /**
     * 提交
     * @param  {[type]} 
     * @return {[type]}   [description]
     */
    $('.J_submit').on('click', function() {
        var $websiteTitle = $('#website-title'),
            websiteTitle = $.trim($websiteTitle.trim());
        if (!websiteTitle) {
            notify.warn('网站标题不能为空');
            $websiteTitle.focus();
            return;
        }
        var message = imageUploadifyFore.get();
        if (message && (message = message.errorMessage)) {
            notify.warn(message);
            return;
        }
        message = imageUploadifyBack.get();
        if (message && (message = message.errorMessage)) {
            notify.warn(message);
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
