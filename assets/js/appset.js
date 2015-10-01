$(function() {
    var imageUploadify = $('.J_upload_container').imageUploadify({
            previewWidth: 120,
            previewHeight: 80,
            fieldFormat: {
                uploadedImageId: 'yourselfiamgeid',
                uploadedImagePath: 'yourselfiamgesrc'
            }
        }),
        $modal = $('.J_moal'),
        $modalTitle = $('.am-modal-hd span'),
        $modalId = $('.J_modal_id'),
        $modalIndex = $('.J_modal_index'),
        $submit = $('.J_modal_submit'),
        $modalForm = $('.J_modal_form'),
        EDIT = '编辑',
        ADD = '添加',
        _openUploadDialog = function(id, index, imageId, imagePath) {
            $modalTitle.text(id ? EDIT : ADD);
            $submit.text(id ? EDIT : ADD);
            $modalId.val(id || '');
            $modalIndex.val(index || '');
            imageUploadify.set(imageId, imagePath);
            $modal.modal();
        };
    var ADTYPE = {
        UP: 1, //上架
        DOWN: 2 //下架
    };
    /**
     * 新增
     * @param  {[type]}
     * @return {[type]}   [description]
     */
    $('.ad-uploadify-add').on('click', function() {
        _openUploadDialog();
    });
    /**
     * 编辑
     * @param  {[type]}
     * @return {[type]}   [description]
     */
    $('.ad-uploadify-edit').on('click', function() {
        var $li = $(this).closest('li');
        _openUploadDialog($li.attr('data-id'), $li.attr('data-index'), $li.attr('data-imageId'), $li.attr('data-imagePath'));
    });
    $submit.one('click', function() {
        var imageObj = imageUploadify.get();
        if (!imageObj || !imageObj.pic) {
            notify.warn('请上传图片');
            return;
        }
        if (imageObj && (imageObj = imageObj.errorMessage)) {
            notify.warn(imageObj);
            return;
        }
        $modalForm.ajaxSubmit({
            success: function(res) {
                if (res.err_code == 0) {
                    notify.success(t + '成功');
                    location.href = location.href;
                } else {
                    notify.warn(res.err_msg);
                }
            }
        });
    });
    /**
     * 上下架
     * @param  {[type]}
     * @return {[type]}   [description]
     */
    $('.ad-uploadify-type').on('click', function() {
        var $this = $(this),
            $li = $this.closest('li'),
            id = $li.attr('data-id'),
            type = $this.attr('data-type');
        $.post('', {
            id: id,
            type: type
        }, function(res) {
            if (res.err_code == 0) {
                $li.attr('data-type', type);
                $this.addClass('am-hide').siblings('.ad-uploadify-type').removeClass('am-hide');
                notify.success((type === ADTYPE.DOWN ? '下架' : '上架') + '成功');
            } else {
                notify.warn(res.err_msg);
            }
        });
    });
});
