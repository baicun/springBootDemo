//页面模块名称
var addRule = {};
//生成字段列表-数据
addRule.arrData=[];
/*addRule.arrData = [ //模拟数据-就是接口中数据的长度
	{'name':'姓名','uid':55,'type':'1','typeName':'文本'},
	{'name':'年龄','uid':10,'type':'1','typeName':'文本'},
	{'name':'居住地','uid':33,'type':'2','typeName':'整数'},
	{'name':'工作所在地','uid':22,'type':'4','typeName':'字典'},
	{'name':'姓名1','uid':44,'type':'1','typeName':'文本'},
	{'name':'年龄1','uid':66,'type':'1','typeName':'文本'},
	{'name':'居住地1','uid':80,'type':'2','typeName':'整数'},
	{'name':'工作所在地1','uid':100,'type':'4','typeName':'字典'}
];*/
addRule.arrMenu =[];
/*addRule.arrMenu = [
	[],
	[],
	[],
	[{'name':'工作1'},{'name':'工作2'},{'name':'工作3'},{'name':'工作4'},{'name':'工作5'},{'name':'工作6'}],
	[],
	[],
	[],
	[{'name':'pp2'},{'name':'88u'},{'name':'uu2'},{'name':'mm4'},{'name':'kk5'},{'name':'kak6'}]
];*/
//初始化
addRule.init =function(){
    addRule.initFieldList();
	//选择字段第一个点击按钮
	$('.set_fields_btn').off('click').on('click',function(){
		$(this).removeClass('set_fields_btn_active');
		$(this).addClass('set_fields_click');
		aide.layerWhite(); //生成遮罩层
		addRule.setFeilds({onOff:false});//选择字段弹窗创建
		aide.loaction({ //弹窗位置
			id:'set_fields_popup',
			top:$(this).offset().top+38,
			left:$(this).offset().left
		});
		//弹窗操作
		aide.popupOption({
			id:'set_fields_popup',
			close:function(oDiv){ //关闭
				$('.set_fields_btn').removeClass('set_fields_click');
				aide.closeWhite(oDiv);
			},
			sure:function(oDiv){ //确定
				addRule.getSelectFields(); //点击确定-获取选择后的字段
				$('.set_fields_btn').removeClass('set_fields_click');
				if(rulePublic.arrText.length !=0){
					$('#login_set_parent').html('');
					rulePublic.addFields();//展示选中字段
					$('.set_fields_btn').hide();
					$('.set_fields_btn1').show();
					rulePublic.ruleContent(); //生成页面内容
				}
				aide.closeWhite(oDiv);
			},
			cancel:function(oDiv){ //取消
				$('.set_fields_btn').removeClass('set_fields_click');
				aide.closeWhite(oDiv);
			}
		});	
	});
	//选择字段第二个重新选择字段点击按钮
	$('.set_fields_btn1').off('click').on('click',function(){
		$(this).addClass('set_fields_click1');
		aide.layerWhite(); //生成遮罩层
		addRule.setFeilds({onOff:true});//选择字段弹窗创建
		aide.loaction({ //弹窗位置
			id:'set_fields_popup',
			top:$(this).offset().top+38,
			left:$(this).offset().left
		});
		//弹窗操作
		aide.popupOption({
			id:'set_fields_popup',
			close:function(oDiv){ //关闭
				$('.set_fields_btn1').removeClass('set_fields_click1');
				aide.closeWhite(oDiv);
			},
			sure:function(oDiv){ //确定
				addRule.getSelectFields(); //点击确定-获取选择后的字段
				$('.set_fields_btn1').removeClass('set_fields_click1');
				$('#login_set_parent').html('');
				if(rulePublic.arrText.length ==0){
					$('.set_fields_text').html('');
					$('.set_fields_text').hide();
					$('.set_fields_btn1').hide();
					$('.set_fields_btn').show();
					$('#no_info1').show();
					$('#template_btn2').hide();
				}else{
					rulePublic.addFields();//展示选中字段
					$('.set_fields_btn').hide();
					$('.set_fields_btn1').show();
					rulePublic.ruleContent(); //生成页面内容
				}
				aide.closeWhite(oDiv);
			},
			cancel:function(oDiv){ //取消
				$('.set_fields_btn1').removeClass('set_fields_click1');
				aide.closeWhite(oDiv);
			}
		});	
	});
};
//初始化调用
$(document).ready(addRule.init);


//选择字段弹窗创建
addRule.setFeilds = function(opt){
	var onOff = opt.onOff || false;
	var html =`<div class="set_fields_parent">
					<div class="search_text radius">
						<input type="text" placeholder="请输入字段关键词" id="fieldSearch">
						<a href="javaScript:;" onclick=""><i>&#xe62a;</i></a>
					</div>
					<div class="select_fields_box" id="select_fields_box">
						<ul class="select_fields_list" id="select_fields_list"></ul>
					</div>
				</div>`;
	//创建弹窗
	aide.popupCreate({
		id:'set_fields_popup',
		title:'添加字段',
		html:html
	});

    //字段搜索功能
    $("#fieldSearch").change(function () {
        listCreate();
    });

    //初始化数据
    listCreate();

    //列表生成功能
    function listCreate() {
        //清除之前的数据
        $('#select_fields_list').html("");
        $('#scroll_parent').remove();
        var searchContent = $("#fieldSearch").val();
        var indexSum = 1;
        //生成字段选择列表
        for(var i=0;i<addRule.arrData.length;i++){
            if(searchContent==''||addRule.arrData[i].name.indexOf($.trim(searchContent))>-1){
                $('#select_fields_list').append(`
                <li data-type="${addRule.arrData[i].type}" data-id="${addRule.arrData[i].uid}"  data-typename="${addRule.arrData[i].typeName}" data-value='${JSON.stringify(addRule.arrMenu[i])}'>
                    <a href="javaScript:;">
                        <span data-id="0"></span>
                        <strong>${addRule.arrData[i].name}</strong>
                    </a>
                </li>
                `)
                indexSum++;
            }
        };

        //如果字段列表数据超过6个显示滚动条
        if(indexSum>6){
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
        //设置点击字段状态
        if(onOff){
            for(var i=0;i<$('#select_fields_list strong').size();i++){
                for(var j=0;j<rulePublic.arrText.length;j++){
                    if($('#select_fields_list strong').eq(i).html()==rulePublic.arrText[j].name){
                        $('#select_fields_list span').eq(i).addClass('active');
                        $('#select_fields_list span').eq(i).attr('data-id',1);
                    }
                }
            }

        }
        //点击选择字段
        $('#select_fields_list span').off('click').on('click',function(){
            var dataId = $(this).attr('data-id');
            if(dataId==0){
                $(this).addClass('active');
                $(this).attr('data-id',1);
            }else{
                $(this).removeClass('active');
                $(this).attr('data-id',0);
            }
        });

    }




};
//点击确定-获取选择后的字段
addRule.getSelectFields = function(){
	rulePublic.arrText = [];
	rulePublic.arrMenuText = [];
	for(var i=0;i<$('#select_fields_list span').size();i++){
		if($('#select_fields_list span').eq(i).attr('class')=='active'){
			rulePublic.arrText.push({
				'name':$('#select_fields_list strong').eq(i).html(),
				'uid':$('#select_fields_list li').eq(i).attr('data-id'),
				'type':$('#select_fields_list li').eq(i).attr('data-type'),
				'typeName':$('#select_fields_list li').eq(i).attr('data-typename'),
				'index':i
			});
			rulePublic.arrMenuText.push(JSON.parse($('#select_fields_list li').eq(i).attr('data-value')));
		}
	}
    console.log("****"+JSON.stringify(rulePublic.arrText));
    console.log("&&&&#"+JSON.stringify(rulePublic.arrMenuText));
}
/***
 * 获取字段字符串
 */
function getFieldString(){
    var string = "";
    for(var i = 0; i < array.length ;i++){
        string += array[i].id+",";
    }
    return string;
}
addRule.initFieldList=function() {
    $.ajax({
        url:initRuleFieldList,
        type:"post",
        data:{"search":$("#fieldSearch").val()},
        async : true,
        success: function(result) {//回调函数，result，返回值
            data = JSON.parse(result);
            for(var i = data.length-1; i >=0 ;i--){
                //字符类型
                var type = data[i].type;
                var typeTd = "";
                if(type == 1) typeTd ="整数";
                else if(type == 2) typeTd ="小数";
                else if(type == 3) typeTd ="布尔";
                else if(type == 4) typeTd ="字典";
                else if(type == 5) typeTd ="文本";
                addRule.arrMenu.push(data[i].itemsList);
                addRule.arrData.push({name:data[i].name,uid:data[i].id,type:data[i].type,typeName:typeTd})
			}
			console.log(JSON.stringify(addRule.arrMenu));
            console.log(JSON.stringify(addRule.arrData));
        },
        error:function(){
            aide.alert("异常");
        }
    });
}
//保存
addRule.save=function () {
    if(!($("#form1").valid())){
        return;
    }
    var logicArray=[];
    //逻辑中字段的取值
    for(var i=0; i<$('.set_number').size();i++){

        //策略的值
        var strategy = $('.strategy_setUp').find('.strategy_setUp_btn').eq(i).attr("data-id");
        //评分
        var score = $('.strategy_setUp1').eq(i).find("input").val();
		//是否终止执行
        var ifTerminal = $('.logic_content').eq(i).find('.slide_btn:eq(1)').attr("data-id");//判断是否终止执行，0否，1是

        console.log("st"+strategy+",sc"+score+",tm"+ifTerminal);
        var logic="";
        var decisionArray =[];
        var allLogicArray = [];
        var allLogicArrayTemp =[];
        var field_id ="";
        var field_id_list="";
        var logic_value="";
        var logic_type="";
        var logic_type_temp="";
        var nextOperatorTemp=[];

        if(null != strategy  &&  "" !=strategy){
            decisionArray.push({
                "type":1,
                "value":strategy,//策略通过拒绝人工复核
                "isPerform" :ifTerminal, //决策时；是否终止执行：0否，1是
            })
        }
        if(null != score  &&  "" !=score){
            decisionArray.push({
                "type":3,
                "value":score,//评分的值
                "isPerform" :-1, //评分时为-1
            })
        }
        console.log(JSON.stringify(decisionArray));



        for(var j=0;j<$('.setUp_content_tab').eq(i).find('tr').size();j++){
			//单个字段的值
        	field_id = $('.setUp_content_tab').eq(i).find('tr').eq(j).find('td:eq(0)').attr("data-id");

            field_id_list =field_id_list+field_id+",";

            var field_type = $('.setUp_content_tab').eq(i).find('tr').eq(j).find('td:eq(1)').attr("data-id");
            console.log("field_type"+field_type);
            //根据字段类型获取
            if(field_type=="1"||field_type=="2"){//整数或小数型

                logic_value = $('.setUp_content_tab').eq(i).find('tr').eq(j).find('.setUp_text_input:eq(0)').val()+","+$('.setUp_content_tab').eq(i).find('tr').eq(j).find('.setUp_text_input:eq(1)').val();

				logic_type="5";

            }else if(field_type=="4"){//字典型

                logic_type_temp = $('.setUp_content_tab').eq(i).find('tr').eq(j).find('.down_btn1').find("span").html();

                if(logic_type_temp=="等于"){ logic_type="1";}

                else if(logic_type_temp=="不等于") {logic_type="2";}

                logic_value= $('.setUp_content_tab').eq(i).find('tr').eq(j).find('.down_btn2').find("input").val();

                console.log("logic_value"+logic_value);

            }else if(field_type=="5"){//文本型
                logic_type_temp = $('.setUp_content_tab').eq(i).find('tr').eq(j).find('.down_btn1').find("span").html();

                if(logic_type_temp=="包含") {logic_type="3";}

                else if(logic_type_temp=="不包含") {logic_type="4";}

                logic_value= $('.setUp_content_tab').eq(i).find('tr').eq(j).find('.setUp_text').find("input").val();

                console.log("logic_value2**"+logic_value);
            }
            allLogicArray.push({
                "fieldId":field_id,//字段id
                "type":logic_type,//逻辑
                "dataValue":logic_value,//值
            })

            //按照执行顺序排列数组
            for(var k=0;k<$('.execute_setUp_box').eq(i).find('.execute_fields').size();k++){

                var fieldID = $('.execute_setUp_box').eq(i).find('.execute_fields').eq(k).find('.down_menu_btn').find("input").val();

                console.log("fieldID"+fieldID);
                console.log("@@"+JSON.stringify(allLogicArray[j].fieldId));

                if(JSON.stringify(allLogicArray[j].fieldId)==JSON.stringify(fieldID)){

                    allLogicArrayTemp[k]=allLogicArray[j];
                    console.log("allLogicArrayTemp"+JSON.stringify(allLogicArrayTemp));

                    if(k<$('.execute_setUp_box').eq(i).find('.execute_if').size()){
                        var Operator = $('.execute_setUp_box').eq(i).find('.execute_if').eq(k).find('input').val();
                        if(Operator==0){
                            nextOperatorTemp[k] = "6";
                        }else{
                            nextOperatorTemp[k] = "7";
                        }
                    }

                }

            }

        }
        var priority="";
        for(var n=0;n<allLogicArrayTemp.length-1;n++){
            logic+=JSON.stringify(allLogicArrayTemp[n])+"|" + nextOperatorTemp[n] + "|";

            priority += n+1+",";

        }
        var tempData=[];
        for(var z=0;z<$('.set_number').eq(i).find(".execute_setUp_parent .execute_common").length;z++){
            var logicData=$(this).find(".execute_setUp_parent .execute_common");
            if(z%2==0){
                tempData.push(
                    {'type':'1','index':z/2}
                )
            }else{
                tempData.push(
                    {'type':'2'}
                );
            }
        }
        var logicLine=[];
        $('.set_number').eq(i).find(".execute_setUp_parent .pattern_line").each(function(){
            logicLine.push({
                "start":$(this).attr("data-start"),
                "end":$(this).attr("data-end"),
                "left":$(this).css("left").toString().replace("px",""),
                "top":$(this).css("top").toString().replace("px",""),
                "width":$(this).children("span").css("width").toString().replace("px","")
            })
        })
        priority=lineToLogicRelation(tempData,logicLine).join(",");

        logic+=JSON.stringify(allLogicArrayTemp[allLogicArrayTemp.length-1]);

        console.log("alltemp"+JSON.stringify(allLogicArrayTemp));
        console.log("nextOperatorTemp"+JSON.stringify(nextOperatorTemp));


        logicArray.push({
			"decisionList":decisionArray,
			"logic":logic,
            "priority":priority,
            "logicLine":logicLine,
		})
        console.log("&&&"+allLogicArray);


        console.log("field_id"+field_id_list);
    }//外层循环结束
    console.log("logicList"+logic);
    //取末尾逻辑中的值
	var endStrategy  = $('.logic_set_list').find('.strategy_setUp').find('.strategy_setUp_btn').eq($('.set_number').size()).attr("data-id");

    var endScore = $('.logic_set_list').find('.strategy_setUp1').eq($('.set_number').size()).find("input").val();

    var endIfTerminal = $('.logic_content').eq($('.set_number').size()).find('.slide_btn').attr("data-id");
    console.log("et"+endStrategy+",ec"+ endScore+",ei"+endIfTerminal);

	var endDecisionArray=[];
	var endLogicAarry=[];
    if(null != endStrategy  &&  "" !=endStrategy){
        endDecisionArray.push({
            "type":1,
            "value":endStrategy,
            "isPerform" :endIfTerminal, //决策时；是否终止执行：0否，1是
        })
    }
    if(null != endScore  &&  "" !=endScore){
        endDecisionArray.push({
            "type":3,
            "value":endScore,
            "isPerform" :-1, //评分时为-1
        })
   }
  /*  endLogicAarry.push({
        "fieldId":-1,//字段id
        "type":9999,//逻辑
        "dataValue":null,//值

    })*/

    logicArray.push({
        "decisionList":endDecisionArray,
        "logic":JSON.stringify({
            "fieldId":-1,//字段id
            "type":9999,//逻辑
            "dataValue":null,//值
        })//逻辑
    })

	console.log("logicArray"+JSON.stringify(logicArray));

    $.ajax({
        url:addRules,
        type:"post",
        data:{
            "name":$("#ruleName").val(),
            "no":$("#ruleNo").val(),
            "description":$("#description").val(),
            "fieldString":field_id_list.substring(0,field_id_list.length-1),//所需字段列表
            "logicString":JSON.stringify(logicArray)//逻辑
        },
        async : false,
        success: function(result) {//回调函数，result，返回值
            if(result == 1){
                /*aide.alert("新增成功");*/
              window.location.href = ruleIndex;
            }else{
                aide.alert("新增失败");
            }
        },
        error:function(){
            aide.alert("异常");
        }
    });

}
 /*   var selectStatus = true;


    $('.select_btn').each(function(){
        var data = $(this).find('span').attr('data-id');
        if(data == "" || data == 0){
            $(this).next('div').next('div').html("请选择字段");
            selectStatus = false;
        }else{
            $(this).next('div').next('div').html("");
            $(this).next('div').next('div').html("");
        }
    })*/

    //判断是否选择规则体
    /*if(array.length>1){
        if($(".multiple_field").length<=0){
            aide.alert("至少填写一个逻辑体！");
            selectStatus = false;
        }
    }else{

    }*/

 /*   if(!selectStatus){
        return ;
    }*/

/*
        var logicResult = getLogicArray();
        var flag = logicResult.flag;
        if(flag) return;
        console.log("所需字段列表"+getFieldString());
        console.log("逻辑"+JSON.stringify(logicResult.logic));
        $.ajax({
            url:addRules,
            type:"post",
            data:{
                "name":$("#ruleName").val(),
                "no":$("#ruleNo").val(),
                "description":$("#description").val(),
                "fieldString":getFieldString(),//所需字段列表
                "logicString":JSON.stringify(getLogic())//逻辑
            },
            async : false,
            success: function(result) {//回调函数，result，返回值
                if(result == 1){
                    aide.alert("新增成功");
                    /!*window.location.href = "../rule/index";*!/
                }else{
                    aide.alert("新增失败");
                }
            },
            error:function(){
                aide.alert("异常");
            }
        });
*/


function getNextOperator(lab) {
    for(var i=0;i<lab.length;i++){

    }

}

/***
 * 获取逻辑
 */
function getLogic(lab){
    //逻辑
    var logic = "";
    if(array.length == 1){//单个
        //字段类型
        var type = array[0].type;
        var logicType = "",dataValue = "";//逻辑类型

        if(type == 4){//字典类
            logicType = $(lab).find("div:first").find("div:first").attr("data-value");//逻辑
            dataValue = $(lab).find("div:first").find("div").eq(1).attr("data-value");//值
        }else if(type == 5){//文本
            //逻辑类型
            logicType = $(lab).find("div:first").find("span[name=type]").attr("data-id");
            dataValue = $(lab).find("div:first").find("input").val();
        }else{//数值区间
            var startNum = $(lab).find("div:first").find("input:first").val();
            var endNum = $(lab).find("div:first").find("input").eq(1).val();
            dataValue = startNum + "," + endNum;
            logicType = 5;
        }

        logic = JSON.stringify({
            "fieldId":array[0].id,//字段id
            "type":logicType,//逻辑
            "dataValue":dataValue,//值

        });
    }else{//多个
        var errorFlag = false;
        var allLogicArray = [];
        var _logic =  $(lab).children("div:first").children("div:first").children("div:first");
        $(_logic).children("div").each(function(){
            if($(this).hasClass("delete-rule")) return;
            var logicType = "",dataValue = "";
            var fieldId = $(this).children("span:first").attr("data-value");
            var fieldType = $(this).children("span:first").attr("data-type");
            if(fieldType != 4 && fieldType != 5){
                var startNum = $(this).find("input:first").val();
                var endNum = $(this).find("input").eq(1).val();
                var regInt = /^\d+$/;
                dataValue =  startNum + "," + endNum;
                logicType = 5;//之间
            }else{
                logicType =  $(this).find(".select_btn:first>span").attr("data-id");
                if(fieldType == 5){
                    dataValue = $(this).find("input:first").val();

                }else{
                    dataValue = $(this).find(".select_btn:eq(1)>span").attr("data-id");
                }
            }
            allLogicArray.push({
                "fieldId":fieldId,//字段id
                "type":logicType,//逻辑
                "dataValue":dataValue,//值
            })
        })
        if(errorFlag) return;
        //执行逻辑
        //var _executeLogic = $(lab).children("div:last").find(".e-logic-list");
        var _executeLogic = $(lab).find(".content-bottom").find(".e-logic-list");
        $(_executeLogic).children("div").each(function(){
            var usedFieldId = $(this).find(".multiple_field_select>span").attr("data-id");
            var nextOperator = $(this).find(".select_btn:eq(1)>span").attr("data-id");
            for(var i = 0; i< allLogicArray.length; i++){
                if(allLogicArray[i].fieldId == usedFieldId){
                    logic += JSON.stringify(allLogicArray[i]);
                    //和下一个的逻辑 and/or
                    if("" != nextOperator && "undefined" != typeof(nextOperator)) logic += "|" + nextOperator + "|";
                    break;
                }
            }
        })
    }
    return logic;
}












