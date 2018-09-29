//页面模块名称
var decision = {};
decision.initDecList={};
decision.pageNow=1;
decision.decType=null;
decision.apiStatus=null;

decision.strategyAuth = '';  //策略
decision.gradAuth = '';   //评分
decision.selectAuth = '';
decision.updateAuth = '';
decision.changeAuth = '';

decision.init =function(){

    decision.strategyAuth = aide.judgeAuth('decisionEngine/strategy');
    decision.gradAuth = aide.judgeAuth('decisionEngine/grad');
    decision.selectAuth = aide.judgeAuth('decisionEngine/selectScene');
    decision.updateAuth = aide.judgeAuth('decisionEngine/updateScene');
    decision.changeAuth = aide.judgeAuth('decisionEngine/chageApiState');

    if (decision.selectAuth == '') {
        //日期选择设置
        jeDate("#startDate", {
            format: "YYYY-MM-DD",
            isClear: false,
            isToday: false,
            maxDate: function (that) {
                return jeDate.valText('#endDate') == "" ? aide.maxdate : jeDate.valText('#endDate');
            },
            donefun: function (obj) {
                if (jeDate.valText('#endDate') != "" && obj.val != "") {
                    decision.createPage();
                }
            }
        });
        jeDate("#endDate", {
            format: "YYYY-MM-DD",
            isClear: false,
            isToday: false,
            minDate: function (that) {
                return jeDate.valText('#startDate') == "" ? aide.mindate : jeDate.valText('#startDate');
            },
            donefun: function (obj) {
                if (jeDate.valText('#startDate') != "" && obj.val != "") {
                    decision.createPage();
                }
            }
        });
    }
    //table-下拉菜单-决策模式
	aide.downMenu({
		id:'down_menu1',
		data:[
			{'dataId':'0','name':'全部'},
			{'dataId':'1','name':'策略'},
			{'dataId':'2','name':'评分'},
		],
		callBack:function(obj,index){
            if (index == 0) {
                decision.decType = null;
            } else {
                decision.decType = index;
            }
            decision.createPage();
		}
	});
	//table-下拉菜单-API状态
	aide.downMenu({
		id:'down_menu2',
		data:[
			{'dataId':'0','name':'全部'},
			{'dataId':'1','name':'启用'},
			{'dataId':'2','name':'禁用'},
		],
		callBack:function(obj,index){
            if (index == 0) {
                decision.apiStatus = null;
            } else {
                decision.apiStatus = index;
            }
            decision.createPage();
		}
	});
    decision.createPage();
	//table-移入变色
	aide.tabBackground({
		id:'table_box'
	});

    //回车搜索
    $("#search").keyup(function(event){
        if(event.keyCode ==13){
            decision.createPage();
        }
    });
}
//初始化调用
$(document).ready(decision.init);
//设置API状态
decision.setState = function(obj){
	var dataId = $(obj).attr('data-id');
	if(dataId==0){
		$(obj).find('span').animate({left:32},200,function(){
			$(obj).addClass('state_open_active');
			$(obj).find('i').html('ON');
			$(obj).attr('data-id',1);
			$(obj).parent().parent().find('.options1 a:last').remove();
			$(obj).parent().parent().find('.options1').append(`
				<a href="javaScript:;" class="check_option option_left6 delete_option">
					<span>删除</span>
				</a>`);
			//删除提示层
			aide.tipLayer({
				id:'delete_hint2',
				oClass:'.delete_option',
				iText:'API开启时，无法删除',
				left:114,
				top:52
			});
		})
        decision.updateStatus ($(obj).parent().parent().attr("data-id"),2);
	}else{
		$(obj).find('span').animate({left:2},200,function(){
			$(obj).removeClass('state_open_active');
			$(obj).find('i').html('OFF');
			$(obj).attr('data-id',0);
			$(obj).parent().parent().find('.options1 a:last').remove();
			$(obj).parent().parent().find('.options1').append(`<a href="javaScript:;" class="check_option option_left6" onclick="decision.deleteData($(this))">删除</a>`);
		})
        decision.updateStatus ($(obj).parent().parent().attr("data-id"),1);
	}
};
//删除操作
decision.deleteData = function(obj){
	var index = $(obj).parent().parent().index();
	aide.layerBlack(); //生成遮罩层
	//生成
	var message = '是否要删除场景';
	var info = $(obj).parent().parent().find("td:eq(1)").html();
	var html =`<p class="popup_text">${message}<span>${info}</span>？</p>`
	aide.popupCreate({
		id:'delete_popup',
		html:html
	});
	//关闭确认取消操作
	aide.popupOption({
		id:'delete_popup',
		close:function(oDiv){ //关闭
			aide.closeBlack(oDiv);	
		},
		sure:function(oDiv){ //确定
			$(obj).parent().parent().remove();
			aide.closeBlack(oDiv);
            decision.toDel($(obj).parent().parent().attr("data-id"));
		},
		cancel:function(oDiv){ //取消
			aide.closeBlack(oDiv);
		}
	});
};

decision.find=function(pageSize,pageNow,dectype,apiStatus){


    // var dectype = $(".clear").find('span').eq(2).attr('data-id');
    // var  apiStatus = $(".clear").find('span').eq(3).attr('data-id');


    $.ajax({
        url:sceneFindAll,
        type:"post",
        data:{
            "pageSize":pageSize,
            "pageNum":pageNow,
            "search":$("#search").val(),
            "decType":dectype,
            "apiStatus":apiStatus,
            "startDate" : $("#startDate").val(),
            "endDate" : $("#endDate").val()
        },
        dataType: "json",
        async : false,
        success: function(data) {//回调函数，result，返回值
            if (data.list.length == 0 && pageNow == 1){
                $("#list").html('');
                $(".page_parent").hide();
                $(".no_info").show();
            }else {
                $(".no_info").hide();
                decision.initDecList=data;
                $("#list").html(decision.createTable(data.list));
                $(".page_parent").show();
            }
        },
        error:function(){
            aide.alert("获取数据异常");
        }
    });
    //删除提示层
    aide.tipLayer({
        id:'delete_hint2',
        oClass:'.delete_option',
        iText:'API开启时，无法删除',
        left:114,
        top:52
    });
}


decision.createTable= function (data1){
    console.log(JSON.stringify(data1));
    var html = "";
    for(var i = 0 ;i<data1.length;i++){
    	var decisionType="";
        if(null != data1[i].decision && "" != data1[i].decision && "undefined" != typeof(data1[i].decision)){
            decisionType = (data1[i].type == 1)?"策略":"评分";
        }
        //最后维护人
        var editor = data1[i].creator;
        if(null != data1[i].editor && "" != data1[i].editor && "undefined" != typeof(data1[i].editor)){
            editor = data1[i].editor;
        }
        var sceneNo = aide.notNull(data1[i].sceneNo);
        var name = aide.notNull(data1[i].name);

    	html += '<tr data-id="'+data1[i].id+'">';
    	html += '<td class="table_padding" title='+ sceneNo +'>'+sceneNo+'</td>';
        html += '<td title='+ name +'>'+name+'</td>';
        html += '<td>'+decisionType+'</td>';
        html += '<td>'+aide.notNullOfDateTime(data1[i].creatTime)+'</td>';
        html += '<td>'+editor+'</td>';
        if (decision.changeAuth == '') {
            html += '<td>';
            if(data1[i].status == 1){
                html += '<strong class="state_open state_open_active" data-id="1" onclick="decision.setState($(this))">';
                html += '<i>ON</i>';
            }else{
                html += '<strong class="state_open" data-id="0" onclick="decision.setState($(this))">';
                html += '<i>OFF</i>';
            }
            html += '<span></span>';
            html += '</strong>';
            html += '</td>';
        }
        html += '<td class="options">';
        html += '<a href="javaScript:;" class="check_option option_left1" onclick="decision.detail($(this))" '+ decision.selectAuth +'>查看</a>';
        html += '<a href="javaScript:;" class="check_option option_left2" onclick="decision.update($(this))" '+ decision.updateAuth +'>修改</a>';
        html += '<a href="javaScript:;" class="check_option option_left3" onclick="decision.downloadApi('+data1[i].sceneNo+","+"'"+data1[i].name+"'"+');" '+ decision.changeAuth +'>下载API文档</a>';
        if(data1[i].status == 1){
            html += '<a href="javaScript:;" class="check_option option_left6 delete_option">';
            html += '<span>删除</span>';
            html += '</a>';
        }else {
            html += '<a href="javaScript:;" class="check_option option_left6" onclick="decision.deleteData($(this))">删除</a>';
		}
        html += '</td>';
        html += '</tr>';
    }
    return html;
}
decision.queryList =function (){
    decision.createPage();
}
//更新api状态
decision.updateStatus=function (id,status){
    $.ajax({
        url:sceneUpdateStatus,
        type:"post",
        data:{id:id,
            status:(status==1)?2:1
        },
        dataType: "json",
        async : false,
        success: function(data) {//回调函数，result，返回值
            //decision.find(10, 1, decision.decType, decision.apiStatus);
        },
        error:function(){
            aide.alert("修改场景状态异常");
        }
    });
}

//删除场景
decision.toDel=function (id){
    $.ajax({
        url:sceneDel,
        type:"post",
        data:{id:id},
        dataType: "json",
        async : false,
        success: function(data) {//回调函数，result，返回值
            decision.find(10, 1, decision.decType, decision.apiStatus);
        },
        error:function(){
            aide.alert("删除场景异常");
        }
    });
}

//编辑复制场景信息
decision.update=function (obj){
    $.ajax({
        url:sceneEditUpdateBackUp,
        type:"post",
        data:{id:$(obj).parent().parent().attr("data-id")},
        dataType: "json",
        async : false,
        success: function(data) {//回调函数，result，返回值
            if(data == -1){
                aide.alert("开启场景编辑失败");
            }else{
                window.location.href = sceneEditUpdate+data;
            }
        },
        error:function(){
            aide.alert("开启场景编辑异常");
        }
    });

}

// 下载API文档
decision.downloadApi=function (sceneNo, sceneName) {
    window.location.href = createPdfFile+"?sceneName="+sceneName+"&sceneNo="+sceneNo;
}


//跳转到详情
decision.detail=function (obj){
    window.location.href = sceneDetail+"?id="+$(obj).parent().parent().attr("data-id");
}

decision.createPage=function() {
    //分页
    aide.page({
        id: 'page',
        onOff: true,
        nowNum: 1,
        callBack: function (now, all, sum) {
            console.log('当前页:'+now+',总共页:'+all+',总条数:'+sum);
            pageNow = now;
            decision.find(10, now, decision.decType, decision.apiStatus);
            return decision.initDecList;
        }
    })
}