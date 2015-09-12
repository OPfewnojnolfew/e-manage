$(function() {
    var URLS = {
        GUIDEEDIT: '', //引导页新增编辑接口
        SLIDEEDIT: '', //幻灯片新增编辑接口
        GUIDEDOWNUP: '', //引导页上架下架
        SLIDEDOWNUP: '' //幻灯片上架下架
    };
    var ADTYPE = {
        UP: 1, //上架
        DOWN: 2 //下架
    };
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
        _openUploadDialog = function(url, id, index, imageId, imagePath) {
            $submit.text(id ? EDIT : ADD);
            $modalId.val(id || '');
            $modalIndex.val(index || '');
            imageUploadify.set(imageId, imagePath);
            $modal.attr('action', url);
            $modal.modal();
        },
        _downOrUp = function($dom, url) {
            var $li = $dom.closest('li'),
                id = $li.attr('data-id'),
                type,
                typename;
            if ($li.attr('data-type') === ADTYPE.UP) {
                type = ADTYPE.DOWN;
                typename = '下架';
            } else {
                type = ADTYPE.UP;
                typename = '上架';
            }
            $.post(url, {
                id: id,
                type: type
            }, function(res) {
                if (res.err_code == 0) {
                    $(this).text(typename);
                    $li.attr('data-type', type);
                    notify.success(typename + '成功');
                } else {
                    notify.warn(res.err_msg);
                }
            });
        };
    /**
     * 引导页新增
     * @param  {[type]}
     * @return {[type]}   [description]
     */
    $('.J_guide_add').on('click', function() {
        $modalTitle.text('新增引导页');
        _openUploadDialog(URLS.GUIDEEDIT);
    });
    /**
     * 引导页编辑
     * @param  {[type]}
     * @return {[type]}   [description]
     */
    $('.J_guide_edit').on('click', function() {
        $modalTitle.text('编辑引导页');
        var $li = $(this).closest('li');
        _openUploadDialog(URLS.GUIDEEDIT, $li.attr('data-id'), $li.attr('data-index'), $li.attr('data-imageId'), $li.attr('data-imagePath'));
    });
    /**
     * 幻灯片新增
     * @param  {[type]}
     * @return {[type]}   [description]
     */
    $('.J_slide_add').on('click', function() {
        $modalTitle.text('新增幻灯片');
        _openUploadDialog(URLS.SLIDEEDIT);
    });
    /**
     * 幻灯片编辑
     * @param  {[type]}
     * @return {[type]}   [description]
     */
    $('.J_slide_edit').on('click', function() {
        $modalTitle.text('编辑幻灯片');
        var $li = $(this).closest('li');
        _openUploadDialog(URLS.SLIDEEDIT, $li.attr('data-id'), $li.attr('data-index'), $li.attr('data-imageId'), $li.attr('data-imagePath'));
    });
    /**
     * 引导页上下架
     * @param  {[type]}
     * @return {[type]}   [description]
     */
    $('.J_guide_downup').on('click', function() {
        _downOrUp($(this), URLS.GUIDEDOWNUP);
    });
    /**
     * 幻灯片上下架
     * @param  {[type]}
     * @return {[type]}   [description]
     */
    $('.J_slide_downup').on('click', function() {
        _downOrUp($(this), URLS.SLIDEDOWNUP);
    });
    /**
     * 提交
     * @param  {[type]}
     * @return {[type]}   [description]
     */
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
});
