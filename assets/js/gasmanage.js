$(function() {
    var $confirmModal = $('.J_confirm'), //模态confirm
        $confirmModalContent = $('.am-modal-bd', $confirmModal),
        $multiCheckbox = $('th input[type="checkbox"]'), //多选
        $singleCheckbox = $('td input[type="checkbox"]'), //单选
        /**
         * 禁用加气站
         * @param  {[type]}   ids      [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        disableGas = function(ids, callback) {
            if (!ids) {
                notify.warn('未选择任何项');
                return;
            }
            $confirmModalContent.text('是否停用该加气站？停用后该加气站无法被查询到且该加气站无法登陆管理后台');
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
        /**
         * 启用加气站
         * @param  {[type]}   ids      [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        startusinggGas = function(ids, callback) {
            if (!ids) {
                notify.warn('未选择任何项');
                return;
            }
            $confirmModalContent.text('是否启用该加气站？启用后该加气站可被查询到且该加气站可继续登陆管理后台?');
            $confirmModal.modal({
                onConfirm: function(options) {
                    $.post('', {
                        ids: ids
                    }).then(function(res) {
                        if (res.err_code == 0) {
                            notify.warn('启用成功');
                            callback && callback();
                        } else {
                            notify.warn(res.err_msg);
                        }
                    });
                },
                onCancel: function() {}
            });
        },
        resetPassword = function(ids) {
            if (!ids) {
                notify.warn('未选择任何项');
                return;
            }
            $confirmModalContent.text('确认重置密码后系统会自动向该账号邮箱发送一条重置链接，向该账号发送重置短信，请通知用户进入邮箱点击该链接进行重置密码?');
            $confirmModal.modal({
                onConfirm: function(options) {
                    $.post('', {
                        ids: ids
                    }).then(function(res) {
                        if (res.err_code == 0) {
                            notify.warn('重置成功');
                            callback && callback();
                        } else {
                            notify.warn(res.err_msg);
                        }
                    });
                },
                onCancel: function() {}
            });
        };
    $('.J_geo').geo({
        checked: function(a, b) {
            // $searchForm.submit();
        }
    });
    /**
     * 单条禁用
     * @param  {[type]} 
     * @return {[type]}   [description]
     */
    $('.J_disable').on('click', function() {
        var $this = $(this),
            $tr = $this.closest('tr'),
            id = $tr.attr('data-id');
        disableGas(id, function() {
            location.href = location.href;
        });
    });
    /**
     * 单条启用
     * @param  {[type]} 
     * @return {[type]}   [description]
     */
    $('.J_enable').on('click', function() {
        var $this = $(this),
            $tr = $this.closest('tr'),
            id = $tr.attr('data-id');
        startusinggGas(id, function() {
            location.href = location.href;
        });
    });
    /**
     * 重置密码
     * @param  {[type]} 
     * @return {[type]}   [description]
     */
    $('.J_resetPass').on('click', function() {
        var $this = $(this),
            $tr = $this.closest('tr'),
            id = $tr.attr('data-id');
        resetPassword(id);
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
