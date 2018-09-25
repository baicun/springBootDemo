//页面模块名称
var editDecision4 = {};
editDecision4.footindex=0;
editDecision4.checkClick=true;//禁止按钮点击
editDecision4.keyLine=[];
editDecision4.decData=[];
editDecision4.type=null;
//模拟数据
editDecision4.arrData = [
	[
		'姓名身份证居住地黑名单',
		['人工复核'],
		'准入规则',
		['通过','人工复核'],
		'收入学历核验',
		['通过'],
		'姓名身份证居住地黑名单',
		['拒绝','人工复核'],
		'三要素核验',
		['拒绝'],
		'包含关系核验'
	],
	[
		'姓名身份证居住地黑名单',
		['人工复核'],
		'准入规则',
		['通过','人工复核'],
		'收入学历核验',
		['通过'],
		'姓名身份证居住地黑名单',
		['拒绝','人工复核'],
		'三要素核验',
		['拒绝'],
		'包含关系核验'
	],
	[
		'姓名身份证居住地黑名单',
		['通过','人工复核'],
		'准入规则',
		['通过'],
		'收入学历核验',
		['人工复核'],
		'姓名身份证居住地黑名单',
		['拒绝','人工复核'],
		'三要素核验',
		['拒绝'],
		'三要素核验',
		['拒绝'],
		'包含关系核验',
		['拒绝','人工复核'],
		'三要素核验',
		['拒绝'],
		'三要素核验',
		['拒绝'],
		'包含关系核验'
	],
	[
		'姓名身份证居住地黑名单姓名身份证居住地黑名单',
		['通过','人工复核'],
		'姓名身份证居住地黑名单姓名身份证居住地黑名单',
		['通过'],
		'姓名身份证居住地黑名单姓名身份证居住地黑名单',
		['人工复核'],
		'姓名身份证居住地黑名单姓名身份证居住地黑名单',
		['拒绝','人工复核'],
		'姓名身份证居住地黑名单姓名身份证居住地黑名单',
		['拒绝'],
		'姓名身份证居住地黑名单姓名身份证居住地黑名单',
		['拒绝'],
		'包含关系核验包含关系核验包含关系核验包含关系核验'
	],
	[
		'姓名身份证居住地黑名单',
		['通过','人工复核'],
		'准入规则',
		['通过'],
		'收入学历核验',
		['人工复核'],
		'姓名身份证居住地黑名单',
		['拒绝','人工复核'],
		'三要素核验',
		['拒绝'],
		'三要素核验',
		['拒绝'],
		'包含关系核验',
		['拒绝','人工复核'],
		'三要素核验',
		['拒绝'],
		'三要素核验',
		['拒绝'],
		'包含关系核验'
	],
];
//初始化
editDecision4.init =function(){

    //初始化校验
    editDecision4.initValidator();
    editDecision4.findDecision();
    editDecision4.createHtml(); //生成页面布局
	//获取场景类型
    editDecision4.findType();

	
}
//初始化调用
$(document).ready(editDecision4.init);
//生成页面布局
editDecision4.createHtml = function(){
	for(var i=0;i<editDecision4.arrData.length;i++){
		var decData=JSON.parse(editDecision4.decData[i]);
        var obj=editDecision4.keyLine[i].split("$$");
        var num=0;
        if(obj.length%2==0){
            num=parseInt(obj.length/2);
        }else{
            num=parseInt(obj.length/2)+1;
        }
		$('#rule_config_list').append(`
			<li data-value="${editDecision4.keyLine[i]}">
				<div class="rule_config_left">
					<div class="rule_config_parent" id="rule_config_parent${i+1}">
						<dl class="rule_list" id="rule_list${i+1}"></dl>
					</div>
				</div>
				<div class="rule_config_right">
					<h3><strong>规则数：</strong><span>${num}</span></h3>
					<div class="rule_config_value">
						<strong>拒绝阈值：</strong>
						<span></span>
						<input value="${decData.refuse}" type="text" class="refuse_value" placeholder="请输入"  id="refuse_${editDecision4.footindex++}" name="refuse"/>
						<i class="error_tip error_tip4">错误提示</i>
					</div>
					<div class="rule_config_value">
						<strong>人工复核阈值：</strong>
						<span></span>
						<input value="${decData.review}" type="text" placeholder="请输入" class="review_value" id="review_${editDecision4.footindex++}" name="review"/>
						<i class="error_tip error_tip4">错误提示</i>
					</div>
				</div>
			</li>
		`)
	}
	var oClass = '';
	var oClass1 = '';
	var html = '';
	for(var i=0;i<editDecision4.arrData.length;i++){
		for(var j=0;j<editDecision4.arrData[i].length;j++){
			html = '';
			if(editDecision4.arrData[i][j].length>6){
				oClass = 'list_state1';
			}else{
				oClass = 'list_state';
			}
			if(editDecision4.arrData[i][j].constructor==Array){
				for(var k=0;k<editDecision4.arrData[i][j].length;k++){
					if(editDecision4.arrData[i][j][k]=='人工复核'){
						oClass1 = 'list_color';
					}else if(editDecision4.arrData[i][j][k]=='拒绝'){
						oClass1 = 'list_color2';
					}else if(editDecision4.arrData[i][j][k]=='通过'){
						oClass1 = 'list_color1';
					}
					if(editDecision4.arrData[i][j].length==1){
						oClass = 'list_icon list_state';
						if(editDecision4.arrData[i][j][k]=='人工复核'){
							html = '<span class='+oClass1+'>'+editDecision4.arrData[i][j][k]+'</span>';
						}else if(editDecision4.arrData[i][j][k]=='拒绝'){
							html = '<span class='+oClass1+'>'+editDecision4.arrData[i][j][k]+'</span>';
						}else if(editDecision4.arrData[i][j][k]=='通过'){
							html = '<span class='+oClass1+'>'+editDecision4.arrData[i][j][k]+'</span>';
						}	
					}else{
						oClass = 'list_icon list_state1';
						html += '<span class='+oClass1+'>'+editDecision4.arrData[i][j][k]+'</span>';
					}
					
				}
			}else{
				if(editDecision4.arrData[i][j].length>10){
					html = editDecision4.arrData[i][j].substring(0,11)+'...';
				}else{
					html = editDecision4.arrData[i][j];
				}
				
			}
			$('#rule_list'+(i+1)).append(`
				<dd class="${oClass}">${html}</dd>
			`)
		}
		$('.rule_list').eq(i).css('width',$('.rule_list dd:eq(0)').width()*editDecision4.arrData[i].length);
	}
	//设置宽度
	$('.rule_config_parent').css('width',$('.rule_config_left').width()-286);
	$('.execute_scroll_parent').css('width',$('.rule_config_left').width()-286);
	
	for(var i=0;i<editDecision4.arrData.length;i++){
		if($('.rule_list').eq(i).width()>$('.rule_config_parent').eq(i).width()){
			$('#rule_config_parent'+(i+1)).append(`
				<div class="execute_scroll_parent execute_scroll_parent1" id="execute_scroll_parent${i+1}">
					<div class="execute_scroll_son" id="execute_scroll_son${i+1}"></div>
				</div>
			`);
			aide.scroll({
				parentId:'rule_config_parent'+(i+1),
				listId:'rule_list'+(i+1),
				scrollParentId:'execute_scroll_parent'+(i+1),
				scrollId:'execute_scroll_son'+(i+1),
				onOff:true
			})
		}
		
	}
	
}



editDecision4.initValidator=function (){
    //阈值不能大于规则数
    $.validator.addMethod("isMoreRuleNum",
        function(value, element) {
            if(parseInt(value)<=parseInt($(element).parents(".rule_config_right").find("h3 span").html())) return true;
            return false;
        },
        "阈值不超过规则数");
    //整数
    $.validator.addMethod("isInt",
        function(value, element) {
            if((/^\d+$/.test(value)))  return true;
            return false;
        },
        "请输入整数");

    $("#form1").validate({
        onkeyup:false,
        rules: {
            refuse:{
                required : true,
                maxlength: 5,
                isInt:true,
                isMoreRuleNum:true,
            },
            review:{
                required : true,
                maxlength: 5,
                isInt:true,
                isMoreRuleNum:true,
            },
        },
        messages:{
            refuse:{
                required:"请输入配置",
                maxlength: "长度不能超过5"
            },
            review:{
                required:"请输入配置",
                maxlength: "长度不能超过5"
            },
        },
        errorPlacement : function(error, element) {
            $(element).parent().find("i").html(error).show();
        },
        highlight: function (element, errorClass, validClass) { // element出错时触发
            $(element).addClass("active");
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).removeClass("active");
        },
        success:function(label){
        }
    });
}


editDecision4.save=function(){
    if(!$("#form1").valid()||!editDecision4.checkClick){
        return;
    }
    editDecision4.checkClick=false;
    $.ajax({
        url:sceneStep4SaveDecision,
        type:"post",
        data:{
            "param":JSON.stringify(editDecision4.createParam())
        },
        async : false,
        success: function(result) {//回调函数，result，返回值
            if(result != -1){
                editDecision4.delOldScene();
            }else{
                aide.alert("决策配置异常");
            }
        },
        error:function(){
            aide.alert("异常");
        }
    });
}
editDecision4.createParam=function (){
    var paramArray=new Array();
    $("#rule_config_list li").each(function(index,item){
        var param=new Object();
        param.type=editDecision4.type;
        param.sceneId=id;
        param.data=JSON.stringify({
            "review":$(item).find(".review_value").val(),
            "refuse":$(item).find(".refuse_value").val()
        });
        param.treeLine=$(item).attr("data-value");
        paramArray.push(param);
    })
	console.log(JSON.stringify(paramArray));
    return paramArray;
}
editDecision4.updateSceneStatus=function (){
	$.ajax({
		url:sceneUpdateStatus,
		type:"post",
		data:{id:id,
			  status:1
		     },
		dataType: "json",
		async : false,
	    success: function(data) {//回调函数，result，返回值
	    	window.location.href = sceneIndex;
	    },
	    error:function(){
            aide.alert("异常");
	    }
	});
}



//查询决策类型
editDecision4.findType=function (){
    $.ajax({
        url:sceneStep4FindTypeBySceneId,
        type:"post",
        data:{
            "id":id
        },
        async : false,
        success: function(result) {//回调函数，result，返回值
            editDecision4.type = result;
        },
        error:function(){
            aide.alert("异常");
        }
    });
}


//查询决策详情
editDecision4.findDecision=function (){
    $.ajax({
        url:sceneStep4FindDecisionBySceneId,
        type:"post",
        data:{
            "sceneId":id
        },
        async : false,
        success: function(result) {//回调函数，result，返回值
            console.log(JSON.stringify(result));
            var dataArray=JSON.parse(result);
            editDecision4.keyLine=dataArray.keyLine;
            editDecision4.arrData=dataArray.valueLine;
            editDecision4.decData=dataArray.desData;
        },
        error:function(){
            aide.alert("异常");
        }
    });
}
editDecision4.delOldScene=function (){
    $.ajax({
        url:sceneStep4DelOldScene,
        type:"post",
        data:{id:id},
        dataType: "json",
        async : false,
        success: function(data) {//回调函数，result，返回值
            if(data == 1){
                //修改场景状态变为可用
                editDecision4.updateSceneStatus();
            }else{
                aide.alert("删除失败");
            }

        },
        error:function(){
            aide.alert("异常");
        }
    });
}