//页面模块名称
var editDecision1 = {};
//初始化
editDecision1.init =function(){
    //查询场景详情
    if(null != id && "" != id) editDecision1.findSceneDetail();
    editDecision1.initValidator();
    //table-下拉菜单-决策模式
	/*aide.downMenu({
		id:'down_menu1',
		onOff:true,
		data:[
			{'dataId':'0','name':'请选择'},
			{'dataId':'1','name':'策略模式'},
			{'dataId':'2','name':'评分卡'},
		],
		callBack:function(obj,index){
            if(index!=0){
                $(obj).parents("tr").find("i").hide();
            }else{
                $(obj).parents("tr").find("i").show();
            }
		}
	});*/
	
}
//初始化调用
$(document).ready(
	editDecision1.init
);
//校验
editDecision1.initValidator=function (){
    //场景名称唯一
    $.validator.addMethod("isOnly",
        function(value, element) {
            if($("#name").val() == $("#hiddenName").val()) return true;
            var onlyFlag = false;
            $.ajax({
                url:sceneStep1CheckName,
                type:"post",
                data:{
                    "name":$("#name").val(),
                },
                async : false,
                success: function(result) {//回调函数，result，返回值
                    if(result == 0) onlyFlag =  true;
                },
                error:function(){
                    console.log("验证场景名称唯一异常");
                }
            });
            return onlyFlag;
        },
        "场景名称已存在");
    $.validator.addMethod("typeSelect",
        function(value, element) {
            if($(element).val()==0){
            	return false;
			}else{
            	return true;
			}
        },
        "请选择决策模式");
    //初始化
    $("#form1").validate({
        onkeyup:false,
        rules: {
            name:{
                required : true,
                maxlength: 20,
                isOnly:true
            },
            description:{
                maxlength: 120,
            },
            type:{
            	typeSelect:true,
			}
        },
        messages:{
            name:{
                required:"请输入场景名称",
                isOnly:"场景名称已存在",
                maxlength:"请输入不超过20个字符",
            },
            description:{
                maxlength:"请输入不超过120个字符",
			},
            type:{
                typeSelect:"请选择决策模式",
            }
        },
        errorPlacement : function(error, element) {
            $(element).parents("tr").find("i").html(error).show();
        }
    });
}
editDecision1.save=function (){
    if($("#form1").valid()){
        editDecision1.updateScene();
    }
}


/**
 * 查询场景详情
 */
editDecision1.findSceneDetail =function (){
    $.ajax({
        url:sceneStep1FindDetail,
        type:"post",
        data:{
            "id":id,
        },
        async : true,
        success: function(result) {//回调函数，result，返回值
            var data = result;
            $("#name").val(data.name);
            $("#description").val(data.description);
            $("#hiddenName").val(data.name);
            $("#type").val(data.type);
            $("#type").parent().find("span").html((data.type == 1)?"策略模式":"评分卡");
            if(data.type==1){
                $("#type").parent().attr("data-id",1);
                $("#type").parent().find("span").removeClass("menu_title_color");
            }else if(data.type==2){
                $("#type").parent().attr("data-id",2);
                $("#type").parent().find("span").removeClass("menu_title_color");
            }
        },
        error:function(){
            aide.alert("异常");
        }
    });
}


//修改场景
editDecision1.updateScene=function (){
    $.ajax({
        url:sceneStep1Edit,
        type:"post",
        data:{
            "id":id,
            "name":$("#name").val(),
            "description":$("#description").val(),
            "type":$("#type").val(),
        },
        async : true,
        success: function(result) {//回调函数，result，返回值
            if(result != -1){
                window.location.href = sceneStep1UpdateFieldConfig+id;
            }else{
                aide.alert("修改失败");
            }
        },
        error:function(){
            aide.alert("异常");
        }
    });
}














