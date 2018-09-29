//页面模块名称
var checkRule = {};
checkRule.baseInfo={};
//生成字段列表-数据
checkRule.arrData = [ //模拟数据-就是接口中数据的长度
	{'name':'姓名','uid':55,'type':'1','typeName':'文本'},
	{'name':'年龄','uid':10,'type':'1','typeName':'文本'},
	{'name':'居住地','uid':33,'type':'2','typeName':'整数'},
	{'name':'工作所在地','uid':22,'type':'3','typeName':'字典'},
	{'name':'姓名1','uid':44,'type':'1','typeName':'文本'},
	{'name':'年龄1','uid':66,'type':'1','typeName':'文本'},
	{'name':'居住地1','uid':80,'type':'2','typeName':'整数'},
	{'name':'工作所在地1','uid':100,'type':'3','typeName':'字典'}
];
checkRule.arrMenu = [
	[],
	[],
	[],
	[{'name':'工作1'},{'name':'工作2'},{'name':'工作3'},{'name':'工作4'},{'name':'工作5'},{'name':'工作6'}],
	[],
	[],
	[],
	[{'name':'工作中1'},{'name':'工作中2'},{'name':'工作中3'},{'name':'工作中4'},{'name':'工作中5'},{'name':'工作中6'}]
];
//数据查看数组
checkRule.data =[
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
			{'start':'0','end':'2','left':'0','top':'60','width':'318'},
			{'start':'4','end':'6','left':'440','top':'90','width':'318'},
			{'start':'8','end':'10','left':'880','top':'120','width':'318'},
			{'start':'12','end':'14','left':'1320','top':'150','width':'318'},
			{'start':'0','end':'6','left':'0','top':'180','width':'758'},
			{'start':'8','end':'14','left':'880','top':'210','width':'758'},
			{'start':'0','end':'14','left':'0','top':'240','width':'1638'}
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
			{'start':'2','end':'4','left':'220','top':'60','width':'318'},
			{'start':'8','end':'10','left':'880','top':'90','width':'318'},
			{'start':'12','end':'14','left':'1320','top':'120','width':'318'},
		]
		
	},
	{
		'tactics':2,
		'onOff1':1,
	},
]
//初始化
checkRule.init =function(){
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
			$('.strategy_setUp_btn').eq(i).attr('data-id',checkRule.data[i].tactics);
			$('.strategy_setUp_btn').eq(i).find('a:eq('+checkRule.data[i].tactics+')').addClass('active');
			//运算设置-配置
			for(j in checkRule.data[i].dataList){
                $('.setUp_content_tab').eq(i).find('.down_menu_btn input').eq(j).attr("data-code",checkRule.data[i].dataList[j].valueCode);
				$('.setUp_content_tab').eq(i).find('.down_menu_btn span').eq(j).html(checkRule.data[i].dataList[j].name);
				$('.setUp_content_tab').eq(i).find('.down_menu_btn input').eq(j).val(checkRule.data[i].dataList[j].value)
			}
			//赋值操作
			for(var v=0;v<checkRule.data[i].dataList2.length;v++){
				var fieldValue=checkRule.data[i].dataList2[v];
				if(fieldValue.type==1||fieldValue.type==2){
                    $('.setUp_content_tab').eq(i).find('tr').eq(v).find(".setUp_type2 input").eq(0).val(fieldValue.value1);
                    $('.setUp_content_tab').eq(i).find('tr').eq(v).find(".setUp_type2 input").eq(1).val(fieldValue.value2);
				}else if(fieldValue.type==5){
                    $('.setUp_content_tab').eq(i).find('tr').eq(v).find(".setUp_text  input").eq(0).val(fieldValue.value);
				}
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
			$('.strategy_setUp_btn').eq(i).attr('data-id',checkRule.data[i].tactics);
			$('.strategy_setUp_btn').eq(i).find('a:eq('+checkRule.data[i].tactics+')').addClass('active');
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
			$('.logic_set_list').eq(opt.index).find('.checkbox_error').hide();
			
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
