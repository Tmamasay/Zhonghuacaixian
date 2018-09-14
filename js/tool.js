/**
 * 通用方法封装
 */
var objTool = {
    //取得url参数
    getUrlParam: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); // 构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg); // 匹配目标参数
        if (r != null) return unescape(r[2]);
        return null; // 返回参数值
    },
	url: 'http://39.104.94.160:8088/',
	//url: 'http://192.168.0.229:8088/',
    Get_Access_token: function (_url, _data) {
        $.ajax({
            type: "POST",
            timeout: 10000, // 超时时间 10 秒
            url: _url,
            data: _data,
            async: false,
            success: function (res) {
                console.log(res);
                // res = JSON.parse(res);
                //检查返回的标志
                if (res.code == 1) {
                    // layui.sessionData(table, settings)
                    console.log(res.data.token)
                    layui.sessionData('token', {
                        key: 'access_token',
                        value: res.data.token
                    });
                    // document.cookie = "access_token=" + res.data.token;
                    var tmid = window.setTimeout(function () {
                        window.location.href = 'index.html';
                        window.clearTimeout(tmid);
                    }, 500);

                } else if (res.code == 0) {
                    layer.msg(res.msg);
                    return
                }
            },
            error: function (err) {},
            complete: function (XMLHttpRequest, status) { //请求完成后最终执行参数　
            }
        })
    }

    /**
     * 封装ajax,获取数据,刷新表格
     * */
    // function Fun_Ajax_Table_Data(_url, _data) {
    // 	return table.render({
    // 		elem: '#Fk_Ifon',
    // 		method: 'post',
    // 		url: _url,
    // 		height: 'full-120',
    // 		headers: {
    // 			// 'authorization': $.cookie('access_token')
    // 			'authorization': 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI2IiwiQVVUSE9SSVRJRVNfS0VZIjoiNiIsImV4cCI6MTUzNjgyMTg4OX0.RDU5XY7M1jvm46IDY3kSSRUCB9pNpColeUXnr_MROsxAbC7oGWpzmKEJx4H8Vf1hjMSDgTWQWdqn7dv3h9TNzw'
    // 		},
    // 		parseData: function (res) { //res 即为原始返回的数据
    // 			console.log(res)
    // 			return {
    // 				"code": res.code, //解析接口状态
    // 				"msg": res.msg, //解析提示文本
    // 				"totalElements": res.data.totalElements, //解析数据长度
    // 				"data": res.data.content //解析数据列表
    // 			};
    // 			// debugger;
    // 		},
    // 		where: _data,
    // 		request: {
    // 			// pageName: 'page' //页码的参数名称，默认：page
    // 			// 	,
    // 			limitName: 'size' //每页数据量的参数名，默认：limit
    // 		},
    // 		response: {
    // 			statusName: 'code',
    // 			statusCode: 1,
    // 			msgName: 'msg',
    // 			countName: 'totalElements',

    // 		},
    // 		done: function (res) {
    // 			layer.closeAll('loading');
    // 		},
    // 		text: {
    // 			none: '<p align="center" style="padding:50px 50px">无数据</p>'
    // 		},
    // 		cols: [
    // 			[{
    // 					type: 'checkbox',
    // 					fixed: 'left'
    // 				},
    // 				{
    // 					title: '序号',
    // 					width: 60,
    // 					event: 'event_detail',
    // 					type: 'numbers'
    // 				},
    // 				{
    // 					field: 'theInsured',
    // 					title: '姓名',
    // 					width: 180
    // 				},
    // 				{
    // 					field: 'theInsuredPapersNum',
    // 					title: '身份证号',
    // 					width: 150,
    // 					// align: 'right',

    // 				},
    // 				{
    // 					field: 'organization',
    // 					title: '承保机构',
    // 					width: 150,

    // 				},
    // 				{
    // 					field: 'insuranceTypeInfo',
    // 					title: '险种信息',
    // 					width: 150,
    // 				},
    // 				{
    // 					field: 'duty',
    // 					title: '责任信息',
    // 					width: 150,
    // 				},
    // 				{
    // 					field: 'insureCorporation',
    // 					title: '投保单位',
    // 					width: 205,
    // 				},
    // 				{
    // 					field: 'warrantyNum',
    // 					title: '保单号',
    // 					width: 90,
    // 				},
    // 				{
    // 					field: 'reportNumber',
    // 					title: '报案号',
    // 					width: 180
    // 				},
    // 				{
    // 					field: 'reportDate',
    // 					title: '报案日期',
    // 					width: 180
    // 				}, {
    // 					field: 'HospitalizedStartDate',
    // 					title: '入院时间',
    // 					width: 180
    // 				}, {
    // 					field: 'HospitalizedEndDate',
    // 					title: '出院时间',
    // 					width: 180
    // 				}, {
    // 					field: 'HospitalizedOutCause',
    // 					title: '出院原因',
    // 					width: 180
    // 				}, {
    // 					field: 'totalMedicalFee',
    // 					title: '总医疗费',
    // 					width: 180
    // 				}, {
    // 					field: 'compensateMoney',
    // 					title: '医保报销金额',
    // 					width: 180
    // 				}, {
    // 					field: 'selfPayingMoney',
    // 					title: '个人自费费用',
    // 					width: 180
    // 				}, {
    // 					field: 'compensateNumber',
    // 					title: '赔案号',
    // 					width: 180
    // 				}, {
    // 					field: 'realityCompensateMoney',
    // 					title: '实际赔付金额',
    // 					width: 180
    // 				},
    // 				// {
    // 				// 	field: 'kh',
    // 				// 	title: '银行卡号',
    // 				// 	width: 280
    // 				// },
    // 				// //{ field: 'VC_ProjectZX', title: '项目名称', width: 190 },
    // 				{
    // 					title: '操作',
    // 					toolbar: '#barDemo',
    // 					align: 'center',
    // 					fixed: 'right',
    // 					width: 150
    // 				},
    // 			]
    // 		],
    // 		size: 20,
    // 		page: {
    // 			limits: [10, 20, 30, 50, 100, 200, 300, 400, 500],
    // 			prev: '上一页',
    // 			next: '下一页',
    // 			layout: ['prev', 'page', 'next', 'limit', 'count', 'skip']
    // 		}
    // 		// size: 20,
    // 		// page: true
    // 	});
    // };
}