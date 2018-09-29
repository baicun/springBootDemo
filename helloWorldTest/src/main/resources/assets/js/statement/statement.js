//页面模块名称
var statement = {};
var typeDate = [];
var compareList = [];

$(function () {
	// 初始化场景名称、图表信息
	initAll();
    statement.setPopup;
})

//初始化场景名称、图表信息
function initAll() {

	// 初始化时间选择
	initDateSelect();

    var status = true;
    $.ajax({
        url:getAllSceneInfo,
        type:"post",
        async : false,
        success: function(data) {//回调函数，result，返回值
            if(data==null||data.length==0){
                aide.alert("暂无场景信息，请前往决策引擎添加场景信息！");
            }
            if(data.length>0){
                var senceList = new Array();
                for (var i = 0;i<data.length;i++) {
                	var obj = new Object();
					obj.dataId = data[i].sceneNo;
					obj.name = data[i].sceneName;
                    senceList.push(obj);
                }
                compareList = senceList;
                typeDate = data;
                $("#sence_id1").text(data[0].sceneName);
                $("#sceneNo1").val(data[0].sceneNo);
                //下拉菜单-场景名称-第一组
                aide.downMenu({
                    id:'menu_template_box1',
                    onOff:true,
                    bool:true,
                    Iindex:0,
                    data:senceList,
                    callBack:function(obj,index){
                        $("#sceneNo1").val(index);
                        //图一决策结果统计
                        getApplyDataById();
                        // 图二规则统计
                        //getRuleDataById();
                        // 图三策略统计
                        getApplyDecisionData();
                    }
                });
                //下拉菜单-场景名称-第二组
		   		statement.bool = true;
			   	statement.arrText = [];
			   	statement.arrIndex = [];
			   	statement.num = 0;
			   	$('#menu_template_box2 .down_menu_btn').off('click').on('click',function(){
			   		aide.layerWhite(); //生成遮罩层
			   		if(statement.bool){
			   			statement.setPopup({onOff:false});//策略对比-场景名称选择弹窗
			   		}else{
			   			statement.setPopup({onOff:true});//策略对比-场景名称选择弹窗
			   		}
					aide.loaction({ //弹窗位置
						id:'set_fields_popup1',
						top:$(this).offset().top+38,
						left:$(this).offset().left
					});
					//弹窗操作
					aide.popupOption({
						id:'set_fields_popup1',
						close:function(oDiv){ //关闭
							if(statement.bool){
								$('#menu_template_box2 .down_menu_btn span').addClass('menu_title_color');
								$('#menu_template_box2 .down_menu_btn span').html('最多可选5个');
								statement.num = 0;
							}
							aide.closeWhite(oDiv);
						},
						sure:function(oDiv){ //确定
							statement.bool = false;
							aide.closeWhite(oDiv);
							//console.log(statement.arrText);
							//console.log(statement.arrIndex);
							var scenceAttr = "";
                            for (var i = 0;i < statement.arrIndex.length;i++) {
                                scenceAttr += compareList[statement.arrIndex[i]].dataId + ",";
                            }
							$("#scenceAttr").val(scenceAttr);
                            decisionCompareInfo();
						},
						cancel:function(oDiv){ //取消
							aide.closeWhite(oDiv);
							if(statement.bool){
								$('#menu_template_box2 .down_menu_btn span').addClass('menu_title_color');
								$('#menu_template_box2 .down_menu_btn span').html('最多可选5个');
								statement.num = 0;
							}
						}
					});
			   	});
            }else{
                status = false;
            }
        },
        error:function(){
            aide.alert("异常");
        }
    });
    //获取图表数据
    if (status) {
        //图一决策结果统计
        getApplyDataById();
        // 图二规则统计
        //getRuleDataById();
        // 图三策略统计
        getApplyDecisionData();
    }
}
var scoreByWeight;
var scoreData;
var ruleData;
var ruleDataOrder;
var dataRes,dataCal;
var ruleNo = [];

// 图四 策略对比信息获取
function decisionCompareInfo() {
    var sceneArr = $("#scenceAttr").val();
    var strData = $("#statementDate2").val().split("~");
    var startDate = strData[0];
    var endDate = strData[1];

    var valStatus = true;
    if(startDate == "" || endDate == ""){
        valStatus = false;
        aide.alert("请选择日期");
    }
    var status = "0";
    if(sceneArr == null || sceneArr == ""){
        valStatus = false;
        aide.alert("请选择场景");
    }
    if(valStatus) {
        $.ajax({
            url: getApplyDecisionResult,
            type: "post",
            async: true,
            data: {"sceneNo": sceneArr, "startDate": startDate, "endDate": endDate, "status": status},
            success: function (data) {//回调函数，result，返回值
                decisionCompare(data);
            },
            error: function () {
                aide.alert("异常");
            }
        });
    }
}

// 图四 策略对比数据填充
function decisionCompare(data) {
    var pass = [];
    var refuse = [];
    var recheck = [];
    var sceneName = [];

    for (var i = 0; i < data.length; i++) {
        pass.push(data[i].pass);
        refuse.push(data[i].refuse);
        recheck.push(data[i].recheck);
        sceneName.push(data[i].sceneName);
    }
    statementMap.echartsMap4(pass,refuse,recheck,sceneName); //策略对比
}

//图三策略统计 信息获取
function getApplyDecisionData() {
    var sceneNo = $("#sceneNo1").val();
    var strData = $("#statementDate").val().split("~");
    var startDate = strData[0];
    var endDate = strData[1];

    var sceneId = getSceneId(typeDate,sceneNo);
    if(typeof(sceneId) =="undefined" ){
        return;
    }

    var valStatus = true;

    if(startDate == "" || endDate == ""){
        valStatus = false;
        //aide.alert("请选择日期");
    }
    if (typeof(sceneId) == "undefined") {
        valStatus = false;
    }
    if(valStatus){
        $.ajax({
            url:getApplyDecision,
            type:"post",
            async : true,
            data:{"sceneNo":sceneNo,"startDate":startDate,"endDate":endDate,"sceneId":sceneId},
            success: function(data) {//回调函数，result，返回值
                if(data !=null){
                    var sceneType = getSenceType(typeDate,sceneNo);
                    if(sceneType == 1){
                        decisionType(data);
                    }else{
                        scoreType(data);
                    }
                }


            },
            error:function(){
                aide.alert("异常");
            }

        });
    }
}
// 策略统计 评分模式
function scoreType(data) {
    var score = [];
    var num = [];
    for(var i=0;i<data.length;i++){
        score.push(data[i].score)
        num.push(data[i].num)
    }
    statementMap.echartsMap6(score,num); //策略统计-评分模式
}
// 策略统计 决策模式
function decisionType(data) {
    var pass = 0,refuse = 0,recheck = 0;
    for(var i=0;i<data.length;i++){
        pass += data[i].pass;
        refuse += data[i].refuse;
        recheck += data[i].recheck;
    }
    statementMap.echartsMap3(pass,refuse,recheck); //策略统计
}
// 图二信息获取
function getRuleDataById() {

    //规则统计-选项卡(数据百分比)
    aide.tabControl({
        id:'echartsMap_operate',
        callBack:function(obj,index){
            if(index==0){
                statementMap.echartsMap2(dataRes,ruleNo,1); //规则统计
            }else if(index==1){
                statementMap.echartsMap2(dataCal,ruleNo,0); //规则统计
            }
        }
    });


    //规则统计-选项卡(加权不加权)
    aide.tabControl({
        id:'echartsMap_operate1',
        callBack:function(obj,index){
            if(index==0){
                statementMap.echartsMap5(scoreData[1],scoreData[0]); //规则统计-评分模式
            }else if(index==1){
                statementMap.echartsMap5(scoreByWeight[1],scoreByWeight[0]); //规则统计-评分模式
            }
        }
    });

    var sceneNo = $("#sceneNo1").val();
    var strData = $("#statementDate").val().split("~");
    var startDate = strData[0];
    var endDate = strData[1];
    var valStatue = true;
    if(startDate == "" || endDate == ""){
        valStatue = false;
        //aide.alert("请选择日期");
    }

    if(valStatue){
        $.ajax({
            url:getRuleStatistics,
            type:"post",
            async : true,
            data:{"sceneNo":sceneNo,"startDate":startDate,"endDate":endDate},
            success: function(data) {//回调函数，result，返回值
                ruleData = data;
                ruleDataOrder = $.extend(true, [], data);
                ruleDataDeal(ruleData);
            },
            error:function(){
                aide.alert("异常");
            }
        });
    }
}

// 图二数据处理
function ruleDataDeal(data){
    var passArr = [];
    var refuseArr = [];
    var recheckArr = [];
    var passArrCal = [];
    var refuseArrCal = [];
    var recheckArrCal = [];
    ruleNo = [];
    if(data!=null){
        for(var i = 0;i<data.length;i++){
            passArr.push(data[i].pass);
            refuseArr.push(data[i].refuse);
            recheckArr.push(data[i].recheck);
            passArrCal.push((data[i].pass/(data[i].pass+data[i].refuse+data[i].recheck)*100).toFixed(2));
            refuseArrCal.push((data[i].refuse/(data[i].pass+data[i].refuse+data[i].recheck)*100).toFixed(2));
            recheckArrCal.push((data[i].recheck/(data[i].pass+data[i].refuse+data[i].recheck)*100).toFixed(2));
            ruleNo.push(data[i].ruleNo);
        }
    }

    dataRes = [
        {
            name:'通过',
            type:'bar',
            barWidth: statementMap.barWidth20,
            stack: '总量',
            data:passArr
        },
        {
            name:'拒绝',
            type:'bar',
            barWidth: statementMap.barWidth20,
            stack: '总量',
            data:refuseArr
        },
        {
            name:'人工复核',
            type:'bar',
            barWidth: statementMap.barWidth20,
            stack: '总量',
            data:recheckArr
        }
    ]

    dataCal = [
        {
            name:'通过',
            type:'bar',
            barWidth: statementMap.barWidth20,
            stack: '总量',
            label:statementMap.label,
            data:passArrCal,
        },
        {
            name:'拒绝',
            type:'bar',
            barWidth: statementMap.barWidth20,
            stack: '总量',
            label:statementMap.label,
            data:refuseArrCal,
        },
        {
            name:'人工复核',
            type:'bar',
            barWidth: statementMap.barWidth20,
            stack: '总量',
            label:statementMap.label,
            data:recheckArrCal,
        }
    ]

    //var sceneType = $("#sceneNo2").attr("data-type");
    var sceneType = getSenceType(typeDate,$("#sceneNo1").val());
    if(sceneType == 1){
        $("#echartsMap_operate").show();
        $("#echartsMap_operate1").hide();
        statementMap.echartsMap2(dataRes,ruleNo,1); //规则统计
        //ruleStatic(dataRes,dataCal,ruleNo);
    }else{
        $("#echartsMap_operate").hide();
        $("#echartsMap_operate1").show();
        scoreData  = OriScoreData(data[0]);
        scoreByWeight = OriScoreData(data[1]);
        statementMap.echartsMap5(scoreData[1],scoreData[0]); //规则统计-评分模式
    }
}


 // 构建评分类型数据集
function OriScoreData(data){
    var keyArr = [];
    var valueArr = [];
    var dataArr = [];
    for(var key in data){
        keyArr.push(key);
        valueArr.push(data[key]);
    }
    dataArr.push(keyArr);
    dataArr.push(valueArr);
    return dataArr;
}

// 根据sceneNo值获取选择的type
function getSenceType(data, sceneNo) {
    if(typeof(data) =="undefined" ){
        return;
    }
    for (var i = 0; i < data.length; i++) {
        if (data[i].sceneNo == sceneNo) {
            return data[i].type;
        }
    }
}
// 根据sceneNo值获取选择的sceneId
function getSceneId(data, sceneNo) {
    if(typeof(data) =="undefined" ){
        return;
    }
    for (var i = 0; i < data.length; i++) {
        if (data[i].sceneNo == sceneNo) {
            return data[i].sceneId;
        }
    }
}

// 图一信息获取
function getApplyDataById() {
    var sceneNo = $("#sceneNo1").val();
    var strData = $("#statementDate").val().split("~");
    var startDate = strData[0];
    var endDate = strData[1];

    var valStatus = true;

    if(startDate == "" || endDate ==""){
        //aide.alert("请填写日期");
        valStatus = false;
    }

    var status = "1";

    if(valStatus){
        $.ajax({
            url:getApplyDecisionResult,
            type:"post",
            data:{"sceneNo":sceneNo,"startDate":startDate,"endDate":endDate,"status":status},
            async : true,
            success: function(data) {//回调函数，result，返回值

                var dataPass = [];
                var dataRefuse = [];
                var dataRecheck = [];
                var dataAll = [];
                var xDate = [];

                for(var i=0;i<data.length;i++){
                    dataPass.push(data[i].pass);
                    dataRefuse.push(data[i].refuse);
                    dataRecheck.push(data[i].recheck);
                    dataAll.push(data[i].refuse+data[i].pass+data[i].recheck);
                    xDate.push(data[i].dateTime);
                }

                var ApplyResult = [{
                    name:'通过',
                    type:'bar',
                    barWidth: statementMap.barWidth24,
                    data:dataPass
                }, {
                    name:'拒绝',
                    type:'bar',
                    barWidth: statementMap.barWidth24,
                    data:dataRefuse
                },{
                    name:'人工复核',
                    type:'bar',
                    barWidth: statementMap.barWidth24,
                    data:dataRecheck
                }, {
                    name:'进件量',
                    type:'line',
                    data:dataAll,
                    // symbol:'circle'
                    emphasis:{
                        itemStyle:{
                            color:'#5E97F0',
                            borderColor:'#5E97F0',
                            borderWidth:2
                        }
                    }


                }];
                statementMap.echartsMap1(ApplyResult,xDate); //决策结果统计
            },
            error:function(){
                aide.alert("异常");
            }
        });
    }
}

//初始化时间选择
function initDateSelect() {
    statement.data = new Date();
    statement.minData = '2018-01-01';
    statement.maxData = statement.getDate({day:0}); //当天日期
	// 设置默认时间
	$("#statementDate").val(initDateTime());
	$("#statementDate2").val(initDateTime());
    //日期选择设置-第一组
    jeDate("#statementDate",{
        format:"YYYY-MM-DD",
        range:"~",
        multiPane:false,
        isClear:false,
        isToday:false,
        minDate:statement.minData,
        maxDate:statement.maxData,
        donefun:function(data){ //确认回调函数
            var strData = data.val.split('~');
            var startDate = strData[0];  //开始日期
            var endDate = strData[1]; //结束日期
			//移除选项卡选中状态
            $("#tab_control").each(function (){
                $(this).find('li').removeClass();
            })
            //图一决策结果统计
            getApplyDataById();
            // 图二规则统计
            //getRuleDataById();
            // 图三策略统计
            getApplyDecisionData();
        }
    });
    //选项卡选择-第一组
    aide.tabControl({
        id:'tab_control',
        callBack:function(obj,index){
            var dateBefore = 0;
            var dateNow = 0;
            dateNow = statement.getDate({day:0}); //当前日期

            if(index == 0){
                dateBefore = statement.getDate({day:1}); //昨日
                $("#statementDate").val(dateBefore+"~"+dateBefore);
            }else if(index == 1){
                dateBefore = statement.getDate({day:6}); //近7日
                $("#statementDate").val(dateBefore+"~"+dateNow);
            }else if(index == 2){
                dateBefore = statement.getDate({day:29}); //近30日
                $("#statementDate").val(dateBefore+"~"+dateNow);
            }
            //图一决策结果统计
            getApplyDataById();
            // 图二规则统计
            //getRuleDataById();
            // 图三策略统计
            getApplyDecisionData();
        }
    });
    //日期选择设置-第二组
    jeDate("#statementDate2",{
        format:"YYYY-MM-DD",
        range:"~",
        multiPane:false,
        isClear:false,
        isToday:false,
        minDate:statement.minData,
        maxDate:statement.maxData,
        donefun:function(data){ //确认回调函数
            var strData = data.val.split('~');
            var startDate = strData[0];  //开始日期
            var endDate = strData[1]; //结束日期
            //移除选项卡选中状态
            $("#tab_control2").each(function (){
                $(this).find('li').removeClass();
            })
            // 图四 策略对比信息获取
            decisionCompareInfo();
        }
    });
    //选项卡选择-第二组
    aide.tabControl({
        id:'tab_control2',
        callBack:function(obj,index){
            var dateBefore = 0;
            var dateNow = 0;
            dateNow = statement.getDate({day:0}); //当前日期

            if(index == 0){
                dateBefore = statement.getDate({day:1}); //昨日
                $("#statementDate2").val(dateBefore+"~"+dateBefore);
            }else if(index == 1){
                dateBefore = statement.getDate({day:6}); //近7日
                $("#statementDate2").val(dateBefore+"~"+dateNow);
            }else if(index == 2){
                dateBefore = statement.getDate({day:29}); //近30日
                $("#statementDate2").val(dateBefore+"~"+dateNow);
            }
            // 图四 策略对比信息获取
            decisionCompareInfo();
        }
    });
}

// 设置默认时间
function initDateTime() {
    var dateNow = statement.getDate({day:0}); //当前日期
	var dateBefore = statement.getDate({day:6}); //近7日
	return dateBefore+"~"+dateNow;
}

//初始化
statement.init = function(){


	
	//statementMap.echartsMap1(); //决策结果统计
	//statementMap.echartsMap2(); //规则统计
	//statementMap.echartsMap3(); //策略统计
	//statementMap.echartsMap4(); //策略对比
	//statementMap.echartsMap5(); //规则统计-评分模式
	//statementMap.echartsMap6(); //策略统计-评分模式
}
//初始化调用
$(document).ready(statement.init);
//获取前后n天日期，获取的时间不包含当前日期
statement.getDate = function(opt){ 
	var onOff = opt.onOff || false;
	var day = opt.day || 0;
	var str = 0;
	var date = new Date(); 
	if(onOff){
		date.setDate(date.getDate()+day);//获取day天后的日期 		
	}else{
		date.setDate(date.getDate()-day);//获取day天前的日期 
	}
	var y = date.getFullYear(); 
	var m = date.getMonth()+1;//获取当前月份的日期 
	var d = date.getDate(); 
	function toDouble(num){
		return num<10?'0'+num:''+num;
	}
    str = toDouble(y) + '-' + toDouble(m) + '-' + toDouble(d);
    return str;  

}
//策略对比-场景名称选择弹窗
statement.setPopup = function(opt){
	var onOff = opt.onOff || false;
	var html =`<div class="set_fields_parent set_fields_parent1">
		<div class="select_fields_box" id="select_fields_box">
			<ul class="select_fields_list" id="select_fields_list"></ul>
		</div>
	</div>`;
	//创建弹窗
	aide.popupCreate({
		id:'set_fields_popup1',
		//title:'请选择场景名称',
		html:html
	});
	//生成场景名称列表列表
	var arrData = compareList;
	for(var i=0;i<arrData.length;i++){
		$('#select_fields_list').append(`
			<li>
				<a href="javaScript:;">
					<span data-id="0"></span>
					<strong>${arrData[i].name}</strong>
				</a>
			</li>
		`)
	};
	$('#set_fields_popup1').find('.popup_title').remove();
	//设置点击场景名称状态
	if(onOff){
		for(var i=0;i<$('#select_fields_list strong').size();i++){
			for(var j=0;j<statement.arrText.length;j++){
				if($('#select_fields_list strong').eq(i).html()==statement.arrText[j]){
					$('#select_fields_list span').eq(i).addClass('active');
					$('#select_fields_list span').eq(i).attr('data-id',1);
				}
			}
		}

	}
	//如果数据超过6个显示滚动条
	if(arrData.length>6){
		$('#select_fields_box').append(`
			<div class="scroll_parent" id="scroll_parent">
				<div class="scroll_son" id="scroll_son"></div>
			</div>
		`)
		//滚动条滚动
		aide.scroll({
			parentId:'select_fields_box',
			listId:'select_fields_list',
			scrollParentId:'scroll_parent',
			scrollId:'scroll_son'
		})
	};
	//点击选择场景名称
	$('#select_fields_list span').off('click').on('click',function(){
		var dataId = $(this).attr('data-id');
		if(statement.num<5){
			if(dataId==0){
				$(this).addClass('active');
				$(this).attr('data-id',1);
				statement.num++;
			}else{
				$(this).removeClass('active');
				$(this).attr('data-id',0);
				statement.num--;
			}
		}else{
			if(dataId==0){
				console.log(123);
			}else if(dataId==1){
				$(this).removeClass('active');
				$(this).attr('data-id',0);
				statement.num--;
			}
		}
		//获取选择后的场景名称
		statement.arrText = [];
		statement.arrIndex =[];
		for(var i=0;i<$('#select_fields_list span').size();i++){
			if($('#select_fields_list span').eq(i).attr('class')=='active'){
				statement.arrText.unshift($('#select_fields_list strong').eq(i).html());
				statement.arrIndex.push(i)
			}
		}
		var oSpan = $('#menu_template_box2 .down_menu_btn span');
		if(statement.arrText==''){
			$(oSpan).addClass('menu_title_color');
			$(oSpan).html('最多可选5个');
		}else{
			$(oSpan).removeClass('menu_title_color');
			$(oSpan).html(statement.arrText.join(','));
		}

	});
};

