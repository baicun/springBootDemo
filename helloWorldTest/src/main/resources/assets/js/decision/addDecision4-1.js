//页面模块名称
var addDecision4 = {};
addDecision4.range=[];
//初始化
addDecision4.init =function(){
    addDecision4.initValidator();
    //自动补全
    $("#passEnd").on("change",function(){
        $("#reviewStart").val($(this).val());
        $("#form1").valid()
    })
    $("#reviewStart").on("change",function(){
        $("#passEnd").val($(this).val());
        $("#form1").valid()
    })
    $("#reviewEnd").on("change",function(){
        $("#refuseStart").val($(this).val());
        $("#form1").valid()
    })
    $("#refuseStart").on("change",function(){
        $("#reviewEnd").val($(this).val());
        $("#form1").valid()
    })
    addDecision4.findDecision();
    //通过
	aide.downMenu({
		id:'down_menu1',
		onOff:true,
		bool:true,
		Iindex:0,
		data:addDecision4.range,
		callBack:function(obj,index){
			if(index==0){
				$('.config_number').html($(obj).parent().find('a:eq(1)').html());
				$("#passStart").val($(obj).parent().find('a:eq(0)').html());
                $("#refuseEnd").val($(obj).parent().find('a:eq(1)').html());
			}else if(index==1){
				$('.config_number').html($(obj).parent().find('a:eq(0)').html());
                $("#passStart").val($(obj).parent().find('a:eq(1)').html());
                $("#refuseEnd").val($(obj).parent().find('a:eq(0)').html());
			}
		}
	});
	//input输入框操作
	addDecision4.inputOption();
}
//初始化调用
$(document).ready(addDecision4.init);
//input输入框操作
addDecision4.inputOption = function(){
	$('.config_input1').off('keyup').on('keyup',function(ev){
		var val = $(this).val();
		$(this).parent().parent().next().find('.config_input2').val(val);
	})
	$('.config_input2').off('keyup').on('keyup',function(ev){
		var val = $(this).val();
		$(this).parent().parent().prev().find('.config_input1').val(val);
	})
}


//初始化规则
addDecision4.initValidator=function (){
    //小数，最多保留两位
    $.validator.addMethod("isFloat",
        function(value, element) {
            if((/^[0-9]+(.[0-9]{1,2})?$/.test(value)))  return true;
            return false;
        },
        "请输入数字,小数最多保留两位");
    //左右比较
    $.validator.addMethod("leftAndRight",
        function(value, element) {
            var isAsc = true;//是否正序 从小到大
            var passStart = $("#passStart").val();
            var passEnd = $("#refuseEnd").val();
            if(parseFloat(passStart) > parseFloat(passEnd)) isAsc = false;

            var name = $(element).attr("name");
            var isOverEnd = ((parseInt(name.lastIndexOf("End"))+parseInt(3)) == name.length);//以end 结尾
            var isOverStart = ((parseInt(name.lastIndexOf("Start"))+parseInt(5)) == name.length);//以 start 结束

            if(isOverEnd){//以end 结尾
                var prev = $(element).parent().children('input').eq(0).val();
                if("" == prev) return true;
                if(isAsc){
                    if($(element).attr("id")=="refuseEnd"){
                        if(parseFloat(value) > parseFloat(prev)||parseFloat(value) == parseFloat(prev)){//右侧大于左侧值
                            return true;
                        }
                    }else{
                        if(parseFloat(value) > parseFloat(prev)){//右侧大于左侧值
                            return true;
                        }
                    }

                }else{
                    if($(element).attr("id")=="refuseEnd"){
                        if(parseFloat(prev) > parseFloat(value)||parseFloat(prev) == parseFloat(value)){//左侧大于右侧值
                            return true;
                        }
                    }else{
                        if(parseFloat(prev) > parseFloat(value)){//左侧大于右侧值
                            return true;
                        }
                    }

                }
            }

            if(isOverStart){//以 start 结束
                var after = $(element).parent().children('input').eq(1).val();
                if("" == after) return true;
                if(isAsc){
                    if($(element).attr("id")=="refuseStart"){
                        if(parseFloat(value) < parseFloat(after)||parseFloat(value) == parseFloat(after)){//小于右侧值
                            return true;
                        }
                    }else{
                        if(parseFloat(value) < parseFloat(after)){//小于右侧值
                            return true;
                        }
                    }

                }else{
                    if($(element).attr("id")=="refuseStart"){
                        if(parseFloat(after) < parseFloat(value)||parseFloat(after) == parseFloat(value)){//大于右侧值
                            return true;
                        }
                    }else{
                        if(parseFloat(after) < parseFloat(value)){//大于右侧值
                            return true;
                        }
                    }

                }
            }

            return false;
        },
        "请配置正确区间");
    var rulesVo = {},messagesVo = {};
    $("#form1 td").children("input").each(function(){
        rulesVo[$(this).attr("name")] = {
            required : true,
            isFloat :true,
            leftAndRight:true
        }
        messagesVo[$(this).attr("name")] = {
            required:"请输入配置"
        }
    })
    rulesVo[refuseEnd]={
        required : true,
        isFloat :true,
        leftAndRight:true
    }
    messagesVo[refuseEnd]={
        required:"请输入配置"
    }
    //初始化
    $("#form1").validate({
        onkeyup:false,
        rules:rulesVo,
        messages:messagesVo,
        errorPlacement : function(error, element) {
            element.nextAll(".error_tip:eq(0)").html(error).show();
        }
    });
}
addDecision4.save=function(){
    if($("#form1").valid()){
        var data = JSON.stringify({
            "passStart":$("#passStart").val(),
            "passEnd":$("#passEnd").val(),
            "reviewStart":$("#reviewStart").val(),
            "reviewEnd":$("#reviewEnd").val(),
            "refuseStart":$("#refuseStart").val(),
            "refuseEnd":$("#refuseEnd").val()
        })

        var range = $("#min").text()+","+$("#max").text();
        $.ajax({
            url:sceneStep3SaveScoreDecision,
            type:"post",
            data:{
                "type":2,
                "data":data,
                "sceneId":id,
                "range":range
            },
            async : false,
            success: function(result) {//回调函数，result，返回值
                if(result != -1){
                    addDecision4.updateSceneStatus();
                }else{
                    aide.alert("决策配置异常");
                }
            },
            error:function(){
                aide.alert("异常");
            }
        });
    }
}

addDecision4.updateSceneStatus=function (){
    $.ajax({
        url:sceneUpdateStatus,
        type:"post",
        data:{
            id:id,
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

//查询决策详情
addDecision4.findDecision=function (){
    $.ajax({
        url:sceneStep4FindBySceneId,
        type:"post",
        data:{
            "sceneId":id
        },
        async : false,
        success: function(result) {//回调函数，result，返回值
            if(null != result && "" != result && "undefined" != typeof(result)){
                var min = result.range.split(",")[0];
                var max = result.range.split(",")[1];
                $("#min").text(min);
                $("#max").text(max);
                $("#passStart").val(min);
                $("#refuseEnd").val(max);
                $('.config_number').html(max);
                addDecision4.range=[
                    {'dataId':'0','name':min},
                    {'dataId':'1','name':max},
                ];
            }
        },
        error:function(){
            aide.alert("异常");
        }
    });
}