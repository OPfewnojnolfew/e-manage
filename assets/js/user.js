$(function() {
    var $confirmModal = $('.J_confirm'), //模态confirm
        $confirmModalTitle = $('.am-modal-hd', $confirmModal),
        $confirmModalContent = $('.am-modal-bd', $confirmModal),
        $multiCheckbox = $('th input[type="checkbox"]'), //多选
        $singleCheckbox = $('td input[type="checkbox"]'), //单选
        /**
         * 禁用用户
         * @param  {[type]}   ids      [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        banUsers = function(ids, callback) {
            if (!ids) {
                notify.warn('未选择任何项');
                return;
            }
            $confirmModalContent.text('确定禁用选中的用户吗?');
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
         * 启用用户
         * @param  {[type]}   ids      [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        startusingUsers = function(ids, callback) {
            if (!ids) {
                notify.warn('未选择任何项');
                return;
            }
            $confirmModalContent.text('确定启用选中的用户吗?');
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
        },
        /**
         * 删除模板
         * @param  {[type]}   ids      [description]
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        delModels = function(ids, callback) {
            if (!ids) {
                notify.warn('未选择任何项');
                return;
            }
            $confirmModalContent.text('确定删除选中的权限模板吗?');
            $('.J_confirm').modal({
                onConfirm: function(options) {
                    $.post('', {
                        ids: ids
                    }).then(function(res) {
                        if (res.code == 200) {
                            notify.warn('删除成功');
                            callback && callback();
                        } else {
                            notify.warn(res.message);
                        }
                    });
                },
                onCancel: function() {}
            });
        };
    /**
     * 单条禁用
     * @param  {[type]} 
     * @return {[type]}   [description]
     */
    $('.J_disable').on('click', function() {
        var $this = $(this),
            $tr = $this.closest('tr'),
            id = $tr.attr('data-id');
        banUsers(id, function() {
            location.href = location.href;
            // $('.J_status', $tr).html('<span class="am-badge am-badge-danger">禁用</span>');
            // $this.addClass('am-hide');
            // $this.siblings('.J_enable').removeClass('am-hide');
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
        startusingUsers(id, function() {
            location.href = location.href;
            // $('.J_status', $tr).html('<span class="am-badge am-badge-success">启用</span>');
            // $this.addClass('am-hide');
            // $this.siblings('.J_disable').removeClass('am-hide');
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
     * 提交编辑新增
     * @param  {[type]} 
     * @return {[type]}   [description]
     */
    $('.J_user_submit').on('click', function() {
        var $useremail = $('#user-email'),
            id = $('#user_id').val(),
            t = id ? '编辑' : '新增',
            useremail = $.trim($useremail.val());
        if (!(/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(useremail) && useremail.length)) {
            notify.warn('邮箱格式不正确！');
            $useremail.focus();
            return false;
        }
        $('.J_user_form').ajaxSubmit({
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

    /**
     * 单条删除
     * @param  {[type]} 
     * @return {[type]}   [description]
     */
    $('.J_single_del').on('click', function() {
        var $this = $(this),
            $tr = $this.closest('tr'),
            id = $tr.attr('data-id');
        delModels(id, function() {
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
        delModels(ids.join(','), function() {
            location.href = location.href;
        });
    });
    /**
     * 提交编辑新增权限模板
     * @param  {[type]} 
     * @return {[type]}   [description]
     */
    $('.J_model_submit').on('click', function() {
            var $modelName = $('#model-name'),
                id = $('#model_id').val(),
                t = id ? '编辑' : '新增',
                modelName = $.trim($modelName.val());
            if (!modelName) {
            notify.warn('模板名称不能为空！');
            $modelName.focus();
            return false;
        }
        $('.J_model_form').ajaxSubmit({
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
