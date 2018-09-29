//页面模块名称
var checkRule = {};
//生成字段列表-数据
checkRule.arrData = [];
    /*checkRule.arrData = [ //模拟数据-就是接口中数据的长度
        {'name':'姓名','uid':55,'type':'5','typeName':'文本'},
        {'name':'年龄','uid':10,'type':'5','typeName':'文本'},
        {'name':'居住地','uid':33,'type':'1','typeName':'整数'},
        {'name':'工作所在地','uid':22,'type':'4','typeName':'字典'},
        {'name':'姓名1','uid':44,'type':'5','typeName':'文本'},
        {'name':'年龄1','uid':66,'type':'5','typeName':'文本'},
        {'name':'居住地1','uid':80,'type':'1','typeName':'整数'},
        {'name':'工作所在地1','uid':100,'type':'4','typeName':'字典'}
    ];*/
checkRule.arrMenu = [];
/*checkRule.arrMenu = [
	[],
	[],
	[],
	[{'name':'工作1'},{'name':'工作2'},{'name':'工作3'},{'name':'工作4'},{'name':'工作5'},{'name':'工作6'}],
	[],
	[],
	[],
	[{'name':'工作中1'},{'name':'工作中2'},{'name':'工作中3'},{'name':'工作中4'},{'name':'工作中5'},{'name':'工作中6'}]
];*/
//数据查看数组

checkRule.data=[];
/*checkRule.data =[
	{
		'tactics':1,
		'onOff':1,
		'onOff1':1,
		'order':'生成顺序8',
		'orderLeft':'1540',
		'parentH1':'278',
		'parentH2':'264',
		'dataList':[
			{'name':'包含','value':'0'},
			{'name':'不包含','value':'1'},
			{'name':'等于','value':'0'},
			{'name':'工作3','value':'2'},
			{'name':'不包含','value':'1'},
			{'name':'不包含','value':'1'},
			{'name':'不等于','value':'1'},
			{'name':'工作中5','value':'4'},
		],
		'dataList1':[
			{'type':'1','name':'姓名','value':'55','state':'2','count':'6'},
			{'type':'2','name':'or','value':'1'},
			{'type':'1','name':'年龄','value':'10','state':'2','count':'6'},
			{'type':'2','name':'and','value':'0'},
			{'type':'1','name':'居住地','value':'33','state':'2','count':'6'},
			{'type':'2','name':'or','value':'1'},
			{'type':'1','name':'年龄1','value':'66','state':'2','count':'6'},
			{'type':'2','name':'and','value':'0'},
			{'type':'1','name':'工作所在地','value':'22','state':'2','count':'6'},
			{'type':'2','name':'or','value':'1'},
			{'type':'1','name':'姓名1','value':'44','state':'2','count':'6'},
			{'type':'2','name':'and','value':'0'},
			{'type':'1','name':'居住地1','value':'80','state':'2','count':'6'},
			{'type':'2','name':'and','value':'0'},
			{'type':'1','name':'工作所在地1','value':'100','state':'2','count':'6'},
		],
		'line':[
/!*			{'start':'0','end':'2','left':'0','top':'60','width':'318'},
			{'start':'4','end':'6','left':'440','top':'90','width':'318'},
			{'start':'8','end':'10','left':'880','top':'120','width':'318'},
			{'start':'12','end':'14','left':'1320','top':'150','width':'318'},
			{'start':'0','end':'6','left':'0','top':'180','width':'758'},
			{'start':'8','end':'14','left':'880','top':'210','width':'758'},
			{'start':'0','end':'14','left':'0','top':'240','width':'1638'}*!/
		]
		
	},
	{
		'tactics':0,
		'onOff':0,
		'onOff1':0,
		'order':'生成顺序1',
		'orderLeft':'0',
		'parentH1':'82',
		'parentH2':'68',
		'dataList':[
			{'name':'包含','value':'0'},
			{'name':'不包含','value':'1'},
			{'name':'等于','value':'0'},
			{'name':'工作3','value':'2'},
			{'name':'不包含','value':'1'},
			{'name':'不包含','value':'1'},
			{'name':'不等于','value':'1'},
			{'name':'工作中5','value':'4'},
		],
		'dataList1':[
			{'type':'1','name':'姓名','value':'55','state':'0','count':''},
			{'type':'2','name':'or','value':'1'},
			{'type':'1','name':'年龄','value':'10','state':'0','count':''},
			{'type':'2','name':'and','value':'0'},
			{'type':'1','name':'居住地','value':'33','state':'0','count':''},
			{'type':'2','name':'or','value':'1'},
			{'type':'1','name':'年龄1','value':'66','state':'0','count':''},
			{'type':'2','name':'and','value':'0'},
			{'type':'1','name':'工作所在地','value':'22','state':'0','count':''},
			{'type':'2','name':'or','value':'1'},
			{'type':'1','name':'姓名1','value':'44','state':'0','count':''},
			{'type':'2','name':'and','value':'0'},
			{'type':'1','name':'居住地1','value':'80','state':'0','count':''},
			{'type':'2','name':'and','value':'0'},
			{'type':'1','name':'工作所在地1','value':'100','state':'0','count':''},
		],
		'line':[]
	},
	{
		'tactics':2,
		'onOff':1,
		'onOff1':1,
		'order':'生成顺序3',
		'orderLeft':'1540',
		'parentH1':'158',
		'parentH2':'144',
		'dataList':[
			{'name':'包含','value':'0'},
			{'name':'不包含','value':'1'},
			{'name':'等于','value':'0'},
			{'name':'工作3','value':'2'},
			{'name':'不包含','value':'1'},
			{'name':'不包含','value':'1'},
			{'name':'不等于','value':'1'},
			{'name':'工作中5','value':'4'},
		],
		'dataList1':[
			{'type':'1','name':'姓名','value':'55','state':'0','count':''},
			{'type':'2','name':'or','value':'1'},
			{'type':'1','name':'年龄','value':'10','state':'2','count':'0'},
			{'type':'2','name':'and','value':'0'},
			{'type':'1','name':'居住地','value':'33','state':'2','count':'0'},
			{'type':'2','name':'or','value':'1'},
			{'type':'1','name':'年龄1','value':'66','state':'0','count':''},
			{'type':'2','name':'and','value':'0'},
			{'type':'1','name':'工作所在地','value':'22','state':'2','count':'1'},
			{'type':'2','name':'or','value':'1'},
			{'type':'1','name':'姓名1','value':'44','state':'2','count':'1'},
			{'type':'2','name':'and','value':'0'},
			{'type':'1','name':'居住地1','value':'80','state':'2','count':'2'},
			{'type':'2','name':'and','value':'0'},
			{'type':'1','name':'工作所在地1','value':'100','state':'2','count':'2'},
		],
		'line':[
		/!*	{'start':'2','end':'4','left':'220','top':'60','width':'318'},
			{'start':'8','end':'10','left':'880','top':'90','width':'318'},
			{'start':'12','end':'14','left':'1320','top':'120','width':'318'},*!/
		]
		
	},
	{
		'tactics':2,
		'onOff1':1,
	},
]*/
//初始化
checkRule.init =function(){
	console.log(eval('(' + dataList + ')'));
    checkRule.getRuleInfo();
	if($('.set_fields_box').css('display')=='block'){
		checkRule.getSelectFields(); //生成字段
		rulePublic.addFields();//展示选中字段
		checkRule.ruleContent(); //生成页面内容
	}

};
//初始化调用
$(document).ready(checkRule.init);
//生成字段
checkRule.getSelectFields = function(){
	rulePublic.arrText = [];
	rulePublic.arrMenuText = [];
	for(var i=0;i<checkRule.arrData.length;i++){
		rulePublic.arrText.push({
			'name':checkRule.arrData[i].name,
			'uid':checkRule.arrData[i].uid,
			'type':checkRule.arrData[i].type,
			'typeName':checkRule.arrData[i].typeName,
			'index':i
		});
	}
	rulePublic.arrMenuText = checkRule.arrMenu;

};
//生成页面内容
checkRule.ruleContent = function(){
	for(var i=0;i<checkRule.data.length;i++){
		if(i!=checkRule.data.length-1){
			
			$('#login_set_parent').append(rulePublic.htmlTemplate);
			if(i==0){
				$('.logic_set_list').eq(i).append(`<div class="logic_addBtn logic_addBtn_position">
					<a href="javaScript:;" class="logic_addBtn_left fr" data-id="0" onclick="rulePublic.addList($(this))">&#xe61f;</a>
				</div>`);	
			}else{
				$('.logic_set_list').eq(i).append(`<div class="logic_addBtn logic_addBtn_position">
					<a href="javaScript:;" class="logic_addBtn_left fl" data-id="0" onclick="rulePublic.addList($(this))">&#xe61f;</a>
					<a href="javaScript:;" class="logic_addBtn_right fr" data-id="1" onclick="rulePublic.addList($(this))">&#xe61d;</a>
				</div>`);
			}
			$('.logic_title').eq(i).html('逻辑'+(i+1));
			$('.reset_btn').eq(i).attr('data-id',(i+1));
			$('.setUp_content_tab').eq(i).attr('id','setUp_content_tab'+(i+1));
			$('.operation_setUp_content').eq(i).attr('id','operation_setUp_content'+(i+1));
			$('#operation_setUp_content'+(i+1)).eq(i).find('.setUp_scroll_parent').attr('id','scroll_parent'+(i+1));
			$('#operation_setUp_content'+(i+1)).eq(i).find('.scroll_son').attr('id','scroll_son'+(i+1));
			//运算设置
			rulePublic.operationSet({
				parentId:'operation_setUp_content'+(i+1),
				listId:'setUp_content_tab'+(i+1),
				scrollParentId:'scroll_parent'+(i+1),
				scrollId:'scroll_son'+(i+1)
			});
			$('.execute_setUp_parent').eq(i).attr('id','execute_setUp_parent'+(i+1));
			$('.execute_setUp_box').eq(i).attr('id','execute_list'+(i+1));
			$('.execute_mar').eq(i).attr('id','execute_setUp_box'+(i+1));
			$('.execute_scroll_parent').eq(i).attr('id','execute_scroll_parent'+(i+1));
			$('.execute_scroll_son').eq(i).attr('id','execute_scroll_son'+(i+1));
			$('.execute_setUp_box').eq(i).attr('data-value',1);
			//执行设置-字段设置
			rulePublic.executeSetup({
				id:'execute_setUp_parent'+(i+1),
				parentId:'execute_setUp_box'+(i+1),
				listId:'execute_list'+(i+1),
				scrollParentId:'execute_scroll_parent'+(i+1),
				scrollId:'execute_scroll_son'+(i+1)
			});
			//策略设置-配置
			$('.strategy_setUp_btn').eq(i).find('a').removeClass('active');
			$('.strategy_setUp_btn').eq(i).attr('data-id',checkRule.data[i].tactics);
			$('.strategy_setUp_btn').eq(i).find('a:eq('+parseInt(checkRule.data[i].tactics-1)+')').addClass('active');

			$('.strategy_setUp1').eq(i).find("input").val(checkRule.data[i].strategy);


			//运算设置-配置

			for(j in checkRule.data[i].dataList){
			    if(checkRule.data[i].dataList[j].type!=4){
                    $('.setUp_content_tab').eq(i).find('.down_menu_btn span').eq(j).html(checkRule.data[i].dataList[j].name);
                    $('.setUp_content_tab').eq(i).find('.down_menu_btn input').eq(j).val(checkRule.data[i].dataList[j].value);
                }else{
                    var dicValue = checkRule.data[i].dataList[j].name;
                   /* console.log("dicValue"+dicValue);*/
                    for(var k=0;k<checkRule.arrMenu.length;k++){

                        if(checkRule.arrMenu[k]!=""){

                            for(var n=0;n<checkRule.arrMenu[k].length;n++){

                                console.log("code"+checkRule.arrMenu[k][n].code);
                                if(checkRule.arrMenu[k][n].code==dicValue){

                                    $('.setUp_content_tab').eq(i).find('.down_menu_btn span').eq(j).html(checkRule.arrMenu[k][n].name);
                                    $('.setUp_content_tab').eq(i).find('.down_menu_btn input').eq(j).val(dicValue);
                                }
                            }

                        }

                    }
                }


			}

            for(j in checkRule.data[i].dataList2){

                $('.setUp_content_tab').eq(i).find('.setUp_text_input').eq(j).val(checkRule.data[i].dataList2[j].value);
    /*            var dicValue = checkRule.data[i].dataList2[j].name;
                console.log("dicValue"+dicValue);
			    for(var k=0;k<checkRule.arrMenu.length;k++){
			        console.log("1");
			        if(checkRule.arrMenu[k]!=""){
                        console.log("2");
			            for(var n=0;n<checkRule.arrMenu[k].length;n++){
                            console.log("3");
                                console.log("code"+checkRule.arrMenu[k][n].code);
                            if(checkRule.arrMenu[k][n].code==dicValue){
                                console.log("4");
                                $('.setUp_content_tab').eq(i).find('.setUp_text_input').eq(j).val(checkRule.data[i].dataList2[j].name);
                            }
                        }

                    }

                }*/
            }
			//执行设置-字段配置
			for(j in checkRule.data[i].dataList1){
				if(checkRule.data[i].dataList1[j].type==1){
					$('.execute_setUp_box').eq(i).find('.execute_common span').eq(j).html(checkRule.data[i].dataList1[j].name);
					$('.execute_setUp_box').eq(i).find('.execute_common input').eq(j).val(checkRule.data[i].dataList1[j].value);
					$('.execute_setUp_box').eq(i).find('.execute_common span').eq(j).removeClass('menu_title_color');
					if(j==0){
						var num = j;
					}else{
						var num = j-j/2;
					}
					$('.execute_setUp_box').eq(i).find('.execute_tem_box').eq(num).attr('data-id',checkRule.data[i].dataList1[j].state)
					$('.execute_setUp_box').eq(i).find('.execute_tem_box').eq(num).attr('data-value',checkRule.data[i].dataList1[j].count)
					
				}else{
					$('.execute_setUp_box').eq(i).find('.execute_common span').eq(j).html(checkRule.data[i].dataList1[j].name);
					$('.execute_setUp_box').eq(i).find('.execute_common input').eq(j).val(checkRule.data[i].dataList1[j].value);
				}
			};
			$('.execute_setUp_parent').eq(i).height(checkRule.data[i].parentH1);
			$('.execute_mar').eq(i).height(checkRule.data[i].parentH2);
			$('.create_order').eq(i).css('left',checkRule.data[i].orderLeft+'px');
			$('.create_order').eq(i).html(checkRule.data[i].order);
			//生成线
			if(checkRule.data[i].line!=''){
				for(j in checkRule.data[i].line){
					$('.execute_setUp_box').eq(i).append(`
						<div class="pattern_line" data-start="${checkRule.data[i].line[j].start}" data-end="${checkRule.data[i].line[j].end}" style="left:${checkRule.data[i].line[j].left}px;top:${checkRule.data[i].line[j].top}px;">
							<strong>${parseInt(j)+1}</strong>
							<span style="width:${checkRule.data[i].line[j].width}px;"></span>
						</div>
					`)
				}
				//画线hover对应顺序
//				rulePublic.lineHover({
//					listId:'execute_list'+(i+1),
//				});	
			}
			//配置选框模式开关
			if(checkRule.data[i].onOff==0){
				//页面开关配置
				checkRule.onOffConfig({
					onOff:true,
					onOff1:true,
					index:i,
					index1:0
				})
			}else if(checkRule.data[i].onOff==1){
				//页面开关配置
				checkRule.onOffConfig({
					onOff:false,
					onOff1:true,
					index:i,
					index1:0
				})
			}
			//配置终止执行开关
			if(checkRule.data[i].onOff1==0){
				//页面开关配置
				checkRule.onOffConfig({
					onOff:true,
					onOff1:false,
					index:i,
					index1:1
				})
			}else if(checkRule.data[i].onOff1==1){
				//页面开关配置
				checkRule.onOffConfig({
					onOff:false,
					onOff1:false,
					index:i,
					index1:1
				})
			}	
		}else if(i==checkRule.data.length-1){	
			//最后一个 策略设置-配置
			$('#login_set_parent').append(rulePublic.htmlTemplate1);
			$('.strategy_setUp_btn').eq(i).find('a').removeClass('active');
			$('.strategy_setUp_btn').eq(i).attr('data-id',checkRule.data[i].tactics);
			$('.strategy_setUp_btn').eq(i).find('a:eq('+parseInt(checkRule.data[i].tactics-1)+')').addClass('active');

            $('.strategy_setUp1').eq(i).find("input").val(checkRule.data[i].strategy);
			//配置最后一个 终止执行开关
			if(checkRule.data[i].onOff1==0){
				//页面开关配置
				checkRule.onOffConfig({
					onOff:true,
					onOff1:false,
					index:i,
					index1:0
				})
			}else if(checkRule.data[i].onOff1==1){
				console.log(i);
				//页面开关配置
				checkRule.onOffConfig({
					onOff:false,
					onOff1:false,
					index:i,
					index1:0
				})
			}
		}
	}
	rulePublic.num = checkRule.data.length;
	rulePublic.strategySetup();//策略设置	
};
//页面开关配置
checkRule.onOffConfig = function(opt){
	var onOff = opt.onOff || false;
	var onOff1 = opt.onOff1 || false;
	if(onOff){
		$('.logic_set_list').eq(opt.index).find('.slide_btn:eq('+opt.index1+')').attr('data-id',0);
		$('.logic_set_list').eq(opt.index).find('.slide_btn:eq('+opt.index1+') strong').attr('data-id',0);
		$('.logic_set_list').eq(opt.index).find('.slide_btn:eq('+opt.index1+') strong').removeClass('active');
		$('.logic_set_list').eq(opt.index).find('.slide_btn:eq('+opt.index1+') i').html('关');
		$('.logic_set_list').eq(opt.index).find('.slide_btn:eq('+opt.index1+') span').css('left',2);
		if(onOff1){
			//$('.execute_setUp_box').eq(opt.index).find('.execute_tem_box').hide();
			$('.logic_set_list').eq(opt.index).find('.checkbox_error').show();
			$('.logic_set_list').eq(opt.index).find('.checkbox_error').html('重置后，才能修改。');
			
		}
	}else{
		$('.logic_set_list').eq(opt.index).find('.slide_btn:eq('+opt.index1+')').attr('data-id',1);
		$('.logic_set_list').eq(opt.index).find('.slide_btn:eq('+opt.index1+') strong').attr('data-id',1);
		$('.logic_set_list').eq(opt.index).find('.slide_btn:eq('+opt.index1+') strong').addClass('active');
		$('.logic_set_list').eq(opt.index).find('.slide_btn:eq('+opt.index1+') i').html('开');
		$('.logic_set_list').eq(opt.index).find('.slide_btn:eq('+opt.index1+') span').css('left',24);
		if(onOff1){
			$('.logic_set_list').eq(opt.index).find('.checkbox_error').show();
			$('.logic_set_list').eq(opt.index).find('.checkbox_error').html('重置后，才能修改。');
			//$('.execute_setUp_box').eq(opt.index).find('.execute_tem_box').show();
		}
	}
	
	
}

checkRule.getRuleInfo =function(){
    var data= eval('(' + dataList + ')');

    $("#ruleName").val(data.name);
    console.log("wwwd"+data.name)
    $("#ruleNo").val(data.no);
    $("#description").val(data.description);
    $("#ruleId").val(data.id);

    checkRule.editDiv(data);
}

checkRule.editDiv=function(data) {
    var filedArr = data.fieldList;
    var logicBean = data.logicList;
    var FieldList = "";
    var dicList="";
    FieldList += "[";
    dicList +="[";
    for (var i = 0; i < filedArr.length-1; i++) {

        var type = filedArr[i].type;
        var typeTd = "";
        if(type == 1) typeTd ="整数";
        else if(type == 2) typeTd ="小数";
        else if(type == 3) typeTd ="布尔";
        else if(type == 4) typeTd ="字典";
        else if(type == 5) typeTd ="文本";
        
        FieldList += "{'name':'"+filedArr[i].name+"','uid':'"+filedArr[i].id+"','type':'"+filedArr[i].type+"','typeName':'"+typeTd+"'},"
        if(type==4){
            //拼接字典的字符串
            dicList +="[";
            for(var j=0; j<filedArr[i].itemsList.length-1;j++) {

                dicList += "{'name':'" + filedArr[i].itemsList[j].name + "','code':'"+filedArr[i].itemsList[j].code+"'},";
            }

            dicList +="{'name':'" + filedArr[i].itemsList[filedArr[i].itemsList.length-1].name + "','code':'"+filedArr[i].itemsList[filedArr[i] .itemsList.length-1].code+"'}],";

        }else{
            dicList +="[],"
        }

    }
    var typeT = filedArr[i].type;
    var typeTdt = "";
    if(typeT == 1) typeTdt ="整数";
    else if(typeT == 2) typeTdt ="小数";
    else if(typeT == 3) typeTdt="布尔";
    else if(typeT == 4) typeTdt ="字典";
    else if(typeT == 5) typeTdt ="文本";
    var k = filedArr.length-1;
    FieldList+="{'name':'"+filedArr[k].name+"','uid':'"+filedArr[k].id+"','type':'"+filedArr[k].type+"','typeName':'"+typeTdt+"'}]"
    if(filedArr[k].type==4){//拼接字典的字符串
        dicList +="[";
        for(var j=0; j<filedArr[k].itemsList.length-1;j++) {

            dicList += "{'name':'" + filedArr[k].itemsList[j].name + "','code':'"+filedArr[k].itemsList[j].code+"'},";

        }
        dicList +="{'name':'" + filedArr[k].itemsList[filedArr[k].itemsList.length-1].name + "','code':'"+filedArr[k].itemsList[filedArr[k].itemsList.length-1].code+"'}]]";
    }else{
        dicList +="[]]";
    }

    console.log("*****"+dicList);

    var obj = eval('(' + FieldList + ')');
    checkRule.arrData=obj;
    	console.log("###"+JSON.stringify(checkRule.arrData));
    var alldicList = eval('(' + dicList + ')');
    checkRule.arrMenu = alldicList;
    console.log("%%"+checkRule.arrMenu);

    checkRule.initField(logicBean);
}

checkRule.initField=function (logicBean) {
    var logicAarry = [];
    for(var i=0;i<logicBean.length-1;i++){
        var logicAtom = logicBean[i].logic;
        var logicDecision = logicBean[i].decisionList;
        var atomArr = logicAtom.split("\\|");
		console.log("atomArr"+atomArr);

        logicAarry.push({
            'tactics':logicDecision[0].value,//策略设置1，2,3
            'onOff':1,//框选模式开关：0关，1开
            'onOff1':logicDecision[0].isPerform,//终止执行开关：0关，1开
            'strategy':logicDecision[1]==null?"":logicDecision[1].value,
        /*    'order':'生成顺序8',
            'orderLeft':'1540',*/
            'parentH1':82+(logicBean[i].logicLineList.length-1)*30+16,
            'parentH2':68+(logicBean[i].logicLineList.length-1)*30+16,
            'dataList':checkRule.getDataList(atomArr),
            'dataList1':checkRule.getDataList1(logicBean[i],atomArr),
            'dataList2':checkRule.getDataList2(atomArr),
            'line':logicBean[i].logicLineList,

        })


	}
	logicAarry.push({
        'tactics':logicBean[logicBean.length-1].decisionList[0].value,
        'onOff1':logicBean[logicBean.length-1].decisionList[0].isPerform,
        'strategy':logicBean[logicBean.length-1].decisionList[1]==null?"":logicBean[logicBean.length-1].decisionList[1].value,
    })
    console.log("logicAarry"+JSON.stringify(logicAarry));
    checkRule.data=logicAarry;
}

checkRule.getDataList=function (atomArr) {
    var DataListArrayTemp1=[];
    var DataListArrayTemp="";
	var DataListArray=checkRule.getDataL(atomArr);
	    console.log("DataListArray"+JSON.stringify(DataListArray));
        for(var i=0;i<DataListArray.length;i++){

            var type = DataListArray[i].type;
            console.log("type"+type);
            var DataListArrayT="";
            //包含3，不包含4，等于1，不等于2
            if(type==3){
                DataListArrayT+="{'name':'包含','value':'0'}";
            }else if(type==4){
                DataListArrayT+="{'name':'不包含','value':'1'}";
                /*DataListArrayT.push({'name':'不包含','value':'1'})*/
            }else if(type==1){
                DataListArrayT+="{'name':'等于','value':'0'}";
                DataListArrayT+=",{'name':'"+DataListArray[i].dataValue+"','value':'"+DataListArray[i].dataValue+"','type':'4'}";
                /*DataListArrayT.push({'name':'等于','value':'0'})
                DataListArrayT.push({'name':DataListArray[i].dataValue,'value':DataListArray[i].dataValue})*/
            }else if(type==2){
                DataListArrayT+="{'name':'不等于','value':'1'}";
                DataListArrayT+=",{'name':'"+DataListArray[i].dataValue+"','value':'"+DataListArray[i].dataValue+"','type':'4'}";
               /* DataListArrayT.push({'name':'不等于','value':'1'})
                DataListArrayT.push({'name':DataListArray[i].dataValue,'value':DataListArray[i].dataValue})*/
            }
            if(DataListArrayT!=""){
                DataListArrayTemp+=DataListArrayT+",";
            }
        }
            DataListArrayTemp1="["+DataListArrayTemp.substring(0,DataListArrayTemp.length-1)+"]";
        console.log("DataListArrayTemp1"+DataListArrayTemp1);
           var DataList= eval('(' + DataListArrayTemp1 + ')');
           console.log("DataListT"+DataList);
        return DataList;

/*    {'name':'包含','value':'0'},
    {'name':'不包含','value':'1'},
    {'name':'等于','value':'0'},
    {'name':'工作3','value':'2'},
    {'name':'不包含','value':'1'},
    {'name':'不包含','value':'1'},
    {'name':'不等于','value':'1'},
    {'name':'工作中5','value':'4'},*/
}

checkRule.getDataList1=function (lab,atomArr) {
    var DataList1Array=[];
    for(var i=0;i<atomArr.length;i++){
        var dataL= JSON.parse(atomArr[i])
        if(i%2==0){
            DataList1Array.push({
                'type':1,
                'name':dataL.fieldName,
                'value':dataL.fieldId,
                'state':2,
                /*'count':,*/
            })
        }
        else{
            var operator = atomArr[i];
                console.log("operator"+operator);
                var name="";
                var value="";
                if(operator==6){
                    name='and';
                    value='0';
                }else{
                    name='or';
                    value='1'
                }
            DataList1Array.push({

                'type':2,
                'name':name,
                'value':value,
            })
        }

    }

    return DataList1Array;
/*
    {'type':'1','name':'姓名','value':'55','state':'2','count':'6'},
    {'type':'2','name':'or','value':'1'},
    {'type':'1','name':'年龄','value':'10','state':'2','count':'6'},
    {'type':'2','name':'and','value':'0'},
    {'type':'1','name':'居住地','value':'33','state':'2','count':'6'},
    {'type':'2','name':'or','value':'1'},
    {'type':'1','name':'年龄1','value':'66','state':'2','count':'6'},
    {'type':'2','name':'and','value':'0'},*/

}

/*checkRule.getLine=function (lab) {

}*/

checkRule.getDataList2=function(atomArr){

    var DataListArrayTemp1=[];
    var DataListArrayTemp="";
    var DataListArray=checkRule.getDataL(atomArr);
    console.log("DataListArray"+JSON.stringify(DataListArray));
    for(var i=0;i<DataListArray.length;i++){

        var type = DataListArray[i].type;
        console.log("type"+type);
        var DataListArrayT="";
        //包含3，不包含4，等于1，不等于2
        if(type==3||type==4){
            DataListArrayT+="{'value':'"+DataListArray[i].dataValue+"'}";
        }else if(type==5){
            var dataValue=DataListArray[i].dataValue.split(",");
            DataListArrayT+="{'value':'"+dataValue[0]+"'}";
            DataListArrayT+=",{'value':'"+dataValue[1]+"'}";
            /*DataListArrayT.push({'name':'不包含','value':'1'})*/
        }
        if(DataListArrayT!=""){
            DataListArrayTemp+=DataListArrayT+",";
        }
    }
    DataListArrayTemp1="["+DataListArrayTemp.substring(0,DataListArrayTemp.length-1)+"]";
    console.log("GDataListArrayTemp1"+DataListArrayTemp1);
    var DataList= eval('(' + DataListArrayTemp1 + ')');
    console.log("GDataListT"+DataList);
    return DataList;

    /*    {'name':'包含','value':'0'},
        {'name':'不包含','value':'1'},
        {'name':'等于','value':'0'},
        {'name':'工作3','value':'2'},
        {'name':'不包含','value':'1'},
        {'name':'不包含','value':'1'},
        {'name':'不等于','value':'1'},
        {'name':'工作中5','value':'4'},*/
}


checkRule.getDataL=function (atomArr) {
    var DataListArrayTemp=[];
    for(var i=0;i<checkRule.arrData.length;i++){
        var fieldId = checkRule.arrData[i].uid;
        for(var j=0;j<atomArr.length;j++){
            var dataL= JSON.parse(atomArr[j])
            if(j%2==0){
                if (fieldId ==dataL.fieldId){
                    DataListArrayTemp[i]= dataL
                }
            }
        }
    }
    return DataListArrayTemp;
}

checkRule.update=function () {
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
        if(null != score  &&  "" !=score) {
            decisionArray.push({
                "type": 3,
                "value": score,//评分的值
                "isPerform": -1, //评分时为-1
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
    if(null != endScore  &&  "" !=endScore) {
        endDecisionArray.push({
            "type": 3,
            "value": endScore,
            "isPerform": -1, //评分时为-1
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
        url:editRules,
        type:"post",
        data:{
            "id":$("#ruleId").val(),
            "name":$("#ruleName").val(),
            "no":$("#ruleNo").val(),
            "description":$("#description").val(),
            "fieldString":field_id_list.substring(0,field_id_list.length-1),//所需字段列表
            "logicString":JSON.stringify(logicArray)//逻辑
        },
        async : false,
        success: function(result) {//回调函数，result，返回值
            if(result == 1){
                /*aide.alert("更新成功");*/
                window.location.href = ruleIndex;
            }else{
                aide.alert("更新失败");
            }
        },
        error:function(){
            aide.alert("异常");
        }
    });
}