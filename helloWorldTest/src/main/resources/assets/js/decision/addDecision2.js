//页面模块名称
var addDecision2 = {};
addDecision2.num = 0; //模拟计数不使用可以删除
addDecision2.optionData = []; //模拟选中数据不使用可以删除
addDecision2.filedByUsedArr = [];//存储选中的规则所关联到的字段信息
//简单模拟数据
addDecision2.data = ['姓名','年龄','城市','工作地','银行卡预留手机号','姓名1','年龄1','城市1','工作地1','银行卡预留手机号1','姓名2','年龄2',]
//初始化
addDecision2.init =function(){
    addDecision2.findFieldList();
	//生成页面内容模版
	addDecision2.createHtml();
	//获取选中的字段
    addDecision2.getSceneSelectedField();
}
//初始化调用
$(document).ready(addDecision2.init);
//生成页面内容模版
addDecision2.createHtml = function(){
	$('#config_box2').append(`
		<div class="config_option fl">
			<div class="search_text radius">
				<input type="text" placeholder="请输入字段名称/英文名称" id="searchContent">
				<a href="javaScript:;"><i>&#xe62a;</i></a>
			</div>
			<h2>
				<a href="javaScript:;" data-id="0"></a>
				<strong>全选</strong>
			</h2>
			<div class="config_option_box" id="config_option_box">
				<ul class="config_option_list" id="config_option_list"></ul>
			</div>
		</div>
		<div class="config_content_right">
			<div class="config_content_box">
				<p class="config_content_num">根据所选字段，已关联规则<span>0</span>条</p>
				<div class="config_rule_box" id="config_rule_box">
					<form>
						<table class="config_rule_list" id="config_rule_list">
							<tbody></tbody>
						</table>
					</form>
					<div class="no_info no_info2 clear" id="no_info">
						<div></div>
						<p>暂无信息</p>
					</div>
				</div>
			</div>
		</div>
	`);

	//生成搜索内容
    createList();

    //字段搜索功能
    $("#searchContent").change(function () {
        tarchSearch();
    });

    function tarchSearch() {
        $("#scroll_parent1").remove();
        var searchContent = $("#searchContent").val();
        var indexSum = 1;

		$("#config_option_list").find("li").each(function () {
			var text = $(this).find("strong").text();
			if(searchContent==''||text.indexOf($.trim(searchContent))>-1){
                $(this).show();
                indexSum++;
			}else{
				$(this).hide();
			}
        });
        //字段选择列表-如果数据的长度大于11出现滚动条
        if(indexSum>11){
            $('#config_option_box').append(`
					<div class="scroll_parent srcoll_decision" id="scroll_parent1">
						<div class="scroll_son" id="scroll_son1"></div>
					</div>
				`)
            //滚动条滚动
            aide.scroll({
                parentId:'config_option_box',
                listId:'config_option_list',
                scrollParentId:'scroll_parent1',
                scrollId:'scroll_son1'
            })
        }
    }

	function createList() {

        //字段选择列表
        for(var i=addDecision2.data.length-1;i>=0;i--){
                $('#config_option_list').append(`
					<li>
						<a href="javaScript:;">
							<span data-id="0" data-dataid="${addDecision2.data[i].id}"></span>
							<strong>${addDecision2.data[i].name}</strong>
						</a>
					</li>
				`);
        }
        //字段选择列表-如果数据的长度大于11出现滚动条
        if(addDecision2.data.length>11){
            $('#config_option_box').append(`
					<div class="scroll_parent srcoll_decision" id="scroll_parent1">
						<div class="scroll_son" id="scroll_son1"></div>
					</div>
				`)
            //滚动条滚动
            aide.scroll({
                parentId:'config_option_box',
                listId:'config_option_list',
                scrollParentId:'scroll_parent1',
                scrollId:'scroll_son1'
            })
        }

        //字段选择-选择字段点击操作
        addDecision2.optionFields();
    }



	
	
	
	
}
//字段选择-选择字段点击操作
addDecision2.optionFields = function(){
	//字段选择按钮点击
	$('.config_option h2 a').off('click').on('click',function(){
		var dataId = $(this).attr('data-id');
		addDecision2.optionData=[];
		if(dataId == 0){
			$('#config_option_list span').addClass('active');
			$('#config_option_list span').attr('data-id',1);
			$(this).addClass('active');
			$(this).attr('data-id',1);
			//addDecision2.num = $('#config_option_list span').size();
			addDecision2.dynGetRules(addDecision2.getSelectedFieldId);
			addDecision2.associationRules(addDecision2.optionData);//生成关联规则列表
            $('.config_content_num span').html(addDecision2.num);
            $('#no_info').hide();
		}else{
			$('#config_option_list span').removeClass('active');
			$('#config_option_list span').attr('data-id',0);
			$(this).removeClass('active');
			$(this).attr('data-id',0);
			addDecision2.num = 0;
			$('.config_content_num span').html(addDecision2.num);
			$('#no_info').show();
			$('#config_rule_list').html('');
		}
	});
	//字段列表每一项按钮点击
	$('#config_option_list span').off('click').on('click',function(){
		var dataId = $(this).attr('data-id');
		addDecision2.optionData = [];
		if(dataId == 0){
			$(this).addClass('active');
			$(this).attr('data-id',1);
			for(var i=0;i<$('#config_option_list span').size();i++){
				if($('#config_option_list span').eq(i).attr('data-id')==1){
					$('.config_option h2 a').addClass('active');
					$('.config_option h2 a').attr('data-id',1);
				}else{
					$('.config_option h2 a').removeClass('active');
					$('.config_option h2 a').attr('data-id',0);
					break;
				}
			}
			for(var i=0;i<$('#config_option_list span').size();i++){
				if($('#config_option_list span').eq(i).attr('data-id')==1){
					addDecision2.optionData.push($('#config_option_list strong').eq(i).html());
				}
			}
			//addDecision2.num++;
			// $('.config_content_num span').html(addDecision2.num);
			// if(addDecision2.num!=0){
			// 	$('#no_info').hide();
			// }else{
			// 	$('#no_info').show();
			// }
		}else{
			$(this).removeClass('active');
			$(this).attr('data-id',0);
			for(var i=0;i<$('#config_option_list span').size();i++){
				if($('#config_option_list span').eq(i).attr('data-id')==1){
					$('.config_option h2 a').addClass('active');
					$('.config_option h2 a').attr('data-id',1);
				}else{
					$('.config_option h2 a').removeClass('active');
					$('.config_option h2 a').attr('data-id',0);
					break;
				}
			}
			for(var i=0;i<$('#config_option_list span').size();i++){
				if($('#config_option_list span').eq(i).attr('data-id')==1){
					addDecision2.optionData.push($('#config_option_list strong').eq(i).html());
				}
			}
			//addDecision2.num--;
			// $('.config_content_num span').html(addDecision2.num);
			// if(addDecision2.num==0){
			// 	$('#no_info').show();
			// }else{
			// 	$('#no_info').hide();
			// }
		}
        addDecision2.dynGetRules(addDecision2.getSelectedFieldId);
		addDecision2.associationRules(addDecision2.optionData);//生成关联规则列表
        $('.config_content_num span').html(addDecision2.num);
        if(addDecision2.num==0){
            $('#no_info').show();
        }else{
            $('#no_info').hide();
        }
	});		
}
addDecision2.getSelectedFieldId=function(){
	var fields="";
	$.each($("#config_option_list li a span"),function (index,item) {
		if($(item).attr("data-id")==1){
			fields+=$(item).attr("data-dataid")+",";
		}
    })
	return fields;
}


//生成关联规则列表
addDecision2.associationRules = function(data){
	$('#config_rule_list').html('');
	for(var i=0;i<data.length;i++){
		$('#config_rule_list').append(`
			<tr>
				<td class="config_table_td1"><p>${data[i].fieldNameArr}</p></td>
				<td class="config_table_td2"><span></span></td>
				<td><strong>${data[i].ruleName}</strong></td>
			</tr>
		`)	
	}
	//关联规则展示列表滚动条
	if($('#config_rule_list').height()>$('#config_rule_box').height()){
		$('#config_rule_box').append(`
			<div class="scroll_parent srcoll_decision" id="scroll_parent2">
				<div class="scroll_son" id="scroll_son2"></div>
			</div>
		`)
		//滚动条滚动
		aide.scroll({
			parentId:'config_rule_box',
			listId:'config_rule_list',
			scrollParentId:'scroll_parent2',
			scrollId:'scroll_son2'
		})
	}else{
		$('#config_rule_list').css('top',0);
		$('#scroll_parent2').remove();
	}
}


//获取字段列表信息
addDecision2.findFieldList=function  () {
    $.ajax({
        url:sceneStep2FindSelect,
        type:"post",
        dataType: "json",
        async : false,
        success: function(data) {//回调函数，result，返回值\
			console.log(data);
            addDecision2.data=data;
        },
        error:function(){
            aide.alert("异常");
        }
    })
}
//获取和字段相关联的规则信息
addDecision2.dynGetRules=function (fieldArray) {
    $.ajax({
        url:sceneStep2FindDynRule,
        data:{fieldArray:fieldArray},
        type:"post",
        dataType: "json",
        async : false,
        success: function(data) {//回调函数，result，返回值\
            console.log(data);
            var ruleIds="";
            for(var i=0;i<data.length;i++){
            	ruleIds+=data[i].ruleId+",";
			}
			$("#ruleIdArr").val(ruleIds);
            addDecision2.num=data.length;
            addDecision2.optionData = data;
        }
    })
}
//保存字段数据
addDecision2.saveStep2=function(){
	if($('.config_content_num span').html()==0){
		aide.alert("请至少关联一条规则");
		return;
	}
    var fieldArray  = "";
	$.each($("#config_option_box ul li a span "),function(index,item){
		if($(item).attr("data-id")==1){
			fieldArray+=$(item).attr("data-dataid")+",";
		}
	})
	console.log($("#sceneId").val());
    var submitFlag = $("#submitFlag").val();
    var url = "";
    if(submitFlag != "1") {
        url = sceneStep2Insert;
    }else{
        //dynGetRules();
        url = sceneStep2Update;
    }
    $.ajax({
        url:url,
        data:{
        	ruleIdArr:$("#ruleIdArr").val(),
            sceneId:$("#sceneId").val(),
            fieldArray:fieldArray,
		},
        type:"post",
        dataType: "json",
        async : false,
        success: function(data) {//回调函数，result，返回值\
            if(data == 1){
                window.location.href = sceneStep2RuleConfig+$("#sceneId").val();
            }else{
                aide.alert("至少选择一个规则");
            }
        },
        error:function(){
            aide.alert("异常");
        }
    })
}
//获取已选择规则已使用的字段
addDecision2.getFiledByUsed=function (){
    $.ajax({
        url:sceneStep2GetFieldBySceneUse,
        data:{"sceneId":$("#sceneId").val()},
        type:"post",
        dataType: "json",
        async : false,
        success: function(data) {//回调函数，result，返回值\
            addDecision2.filedByUsedArr = data;
        }
    })
}

//获取场景选择的字段
addDecision2.getSceneSelectedField=function (){
    //查询场景字段
    $.ajax({
        url:sceneStep2GetFieldByScene,
        data:{"sceneId":$("#sceneId").val()},
        type:"post",
        dataType: "json",
        async : false,
        success: function(data) {//回调函数，result，返回值\
            if(data.length > 0){
                $("#submitFlag").val("1");
                //获取选择字段关联的规则
                var fields="";
                for(var i=0;i<data.length;i++){
                	fields+=data[i]+",";
				}
                addDecision2.dynGetRules(fields);
                addDecision2.associationRules(addDecision2.optionData);//生成关联规则列表
                $('.config_content_num span').html(addDecision2.num);
                if(addDecision2.num==0){
                    $('#no_info').show();
                }else{
                    $('#no_info').hide();
                }
                //全选按钮是否选中
				if($("#config_option_list li").length==data.length){
                	$(".config_option h2 a").attr("data-id",1);
                    $(".config_option h2 a").addClass("active");
				}
            }
            for(var i=0;i<data.length;i++){
                //fieldIdArr.push(data[i]);
                $.each($("#config_option_box ul li a span "),function(index,item){
                	if($(item).attr("data-dataid")==data[i]){
                		$(item).addClass("active");
                        $(item).attr("data-id",1);
					}
                })
            }

        }
    })
}










