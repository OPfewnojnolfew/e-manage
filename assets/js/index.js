$(function() {
    var driverGrowth = echarts.init($('.J_drivegrowth')[0]), //司机增长
        userGrowth = echarts.init($('.J_usergrowth')[0]), //用户增长
        userConsumeGrowth = echarts.init($('.J_userConsumegrowth')[0]), //用户消费增长
        driveConsumePayGrowth = echarts.init($('.J_driverpaygrowth')[0]), //司机消费充值增长
        carOwnerPayGrowth = echarts.init($('.J_carownerpaygrowth')[0]), //车主充值增长
        gastationConsumeGrowth = echarts.init($('.J_gastationconsumegrowth')[0]), //加气站消费增长
        gastationConsumePercent = echarts.init($('.J_gastationconsumepercent')[0]); //加气站消费占比
    $(window).on('resize', function() {
        driverGrowth.resize();
        userGrowth.resize();
        userConsumeGrowth.resize();
        driveConsumePayGrowth.resize();
        carOwnerPayGrowth.resize();
        gastationConsumeGrowth.resize();
        gastationConsumePercent.resize();
    });
    var getLineChartsOptions = function(title, name, data) {
        var xD = [],
            yD = [];
        for (var item in data) {
            if (data.hasOwnProperty(item)) {
                xD.push(item);
                yD.push(data[item]);
            }
        }
        var option;
        return option = {
            title: {
                text: title
            },
            tooltip: {
                trigger: 'axis'
            },
            calculable: true,
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                data: xD
            }],
            yAxis: [{
                type: 'value',
                axisLabel: {
                    formatter: '{value}'
                }
            }],
            series: [{
                name: name,
                type: 'line',
                data: yD
            }]
        };
    };
    var getDriveConsumePayGrowthOptions = function(data) {
        var xD = [],
            yD1 = [],
            yD2 = [];
        for (var item in data) {
            if (data.hasOwnProperty(item)) {
                xD.push(item);
                yD1.push(data[item][0]);
                yD2.push(data[item][1]);
            }
        }
        var option;
        return option = {
            title: {
                text: '司机消费/充值排名'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['充值', '消费']
            },
            calculable: true,
            xAxis: [{
                type: 'category',
                data: xD
            }],
            yAxis: [{
                type: 'value'
            }],
            series: [{
                name: '充值',
                type: 'bar',
                data: yD1
            }, {
                name: '消费',
                type: 'bar',
                data: yD2
            }]
        };

    };
    var getCarOwnerPayGrowthOptions = function(data) {
        var xD = [],
            yD = [];
        for (var item in data) {
            if (data.hasOwnProperty(item)) {
                xD.push(item);
                yD.push(data[item]);
            }
        }
        var option;
        return option = {
            title: {
                text: '车主充值排名'
            },
            tooltip: {
                trigger: 'axis'
            },
            calculable: true,
            xAxis: [{
                type: 'category',
                data: xD
            }],
            yAxis: [{
                type: 'value'
            }],
            series: [{
                name: '额度',
                type: 'bar',
                data: yD
            }]
        };

    };
    var getGastationConsumePercentOption = function(data) {
        var xD = [],
            yD = [];
        for (var item in data) {
            if (data.hasOwnProperty(item)) {
                xD.push(item);
                yD.push({
                    value: data[item],
                    name: item
                });
            }
        }
        var option;
        return option = {
            title: {
                text: '加气站消费占比'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                data: xD
            },
            calculable: true,
            series: [{
                name: '加气站消费占比',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: yD
            }]
        };

    }

    $.get('assets/js/index.json').then(function(res) {
        if (res.err_code == 0) {
            driverGrowth.setOption(getLineChartsOptions('每日司机增长趋势（近一个月）', '司机数', res.driverGrowth));
            userGrowth.setOption(getLineChartsOptions('每日用户充值增长趋势（近一个月）', '用户数', res.userGrowth));
            userConsumeGrowth.setOption(getLineChartsOptions('每日用户消费增长趋势（近一个月）', '消费额', res.userConsumeGrowth));
            driveConsumePayGrowth.setOption(getDriveConsumePayGrowthOptions(res.driveConsumePayGrowth));
            carOwnerPayGrowth.setOption(getCarOwnerPayGrowthOptions(res.carOwnerPayGrowth));
            gastationConsumeGrowth.setOption(getLineChartsOptions('加气站消费增长趋势（近一个月）', '消费额', res.gastationConsumeGrowth));
            gastationConsumePercent.setOption(getGastationConsumePercentOption(res.gastationConsumePercent));

        }
    });
    // var _simulationData = function() {
    //     Date.prototype.format = function(fmt) {
    //         var o = {
    //             'M+': this.getMonth() + 1, //月份 
    //             'd+': this.getDate(), //日 
    //             'h+': this.getHours(), //小时 
    //             'm+': this.getMinutes(), //分 
    //             's+': this.getSeconds(), //秒 
    //             'q+': Math.floor((this.getMonth() + 3) / 3), //季度 
    //             'S': this.getMilliseconds() //毫秒 
    //         };
    //         if (/(y+)/.test(fmt)) {
    //             fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    //         }
    //         for (var k in o) {
    //             if (new RegExp('(' + k + ')').test(fmt)) {
    //                 fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
    //             }
    //         }
    //         return fmt;
    //     };
    //     var now = new Date(),
    //         randomNum = function(begin, end) {
    //             begin = Number(begin);
    //             end = Number(end);
    //             var r = Math.random();
    //             if (isNaN(begin) || isNaN(end) || begin > end) {
    //                 return r;
    //             }
    //             return Math.floor(r * (end - begin + 1) + begin);
    //         },
    //         result = {};
    //     result[now.format('yyyy-MM-dd')] = randomNum(10, 10000);
    //     for (i = 1; i < 30; i++) {
    //         now.setDate(now.getDate() - 1);
    //         result[now.format('yyyy-MM-dd')] = randomNum(10, 10000);
    //     }
    //     return result;
    // };
});
