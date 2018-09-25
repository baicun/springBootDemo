//页面模块名称
var rulePublic = {};
rulePublic.num = 1; //计数
rulePublic.onOff = true; //运算逻辑下拉菜单-开关
rulePublic.onOff1 = true; //执行设置下拉菜单-开关
rulePublic.onOff2 = true; //执行设置判断下拉菜单-开关
aide.onOff = true; //滚动条开关
rulePublic.hasSelected=[];//存储之前已经选中的规则
rulePublic.index =0;//唯一标识下标
//选择规则-模拟数据
rulePublic.data = [
	{
		'name':'规则1',
		'uid':55,
		'index':0,
		'list':[
			{
				'data':[
					{'type':'1','name':'姓名','textType':'文本','logic':'包含','value':'赵丽颖'},
					{'type':'2','name':'手机号','textType':'整数','logic':'包含','value':'150'},
					{'type':'3','name':'身份证','textType':'区间','value1':'1965','value2':'1970'},
					{'type':'4','name':'城市','textType':'字典','logic':'等于','value':'工作中3','valueIndex':'2','data':[
							{'name':'工作中1'},
							{'name':'工作中2'},
							{'name':'工作中3'},
							{'name':'工作中4'},
							{'name':'工作中5'},
							{'name':'工作中6'}
						]
					},
					{'type':'3','name':'身份证','textType':'区间','value1':'1965','value2':'1970'},
					{'type':'3','name':'身份证','textType':'区间','value1':'1965','value2':'1970'},
					{'type':'4','name':'城市','textType':'字典','logic':'不等于','value':'工作4','valueIndex':'3','data':[
							{'name':'工作1'},
							{'name':'工作2'},
							{'name':'工作3'},
							{'name':'工作4'},
							{'name':'工作5'},
							{'name':'工作6'}
						]
					}
				]

			},
			{
				'data':[
					{'type':'1','name':'姓名','textType':'文本','logic':'包含','value':'赵丽颖'},
					{'type':'2','name':'手机号','textType':'整数','logic':'包含','value':'150'},
					{'type':'3','name':'身份证','textType':'区间','value1':'1965','value2':'1970'},
					{'type':'4','name':'城市','textType':'字典','logic':'等于','value':'工作中3','valueIndex':'2','data':[
							{'name':'工作中1'},
							{'name':'工作中2'},
							{'name':'工作中3'},
							{'name':'工作中4'},
							{'name':'工作中5'},
							{'name':'工作中6'},
						]
					},
					{'type':'3','name':'身份证','textType':'区间','value1':'1965','value2':'1970'},
					{'type':'3','name':'身份证','textType':'区间','value1':'1965','value2':'1970'},
					{'type':'4','name':'城市','textType':'字典','logic':'不等于','value':'工作4','valueIndex':'3','data':[
							{'name':'工作1'},
							{'name':'工作2'},
							{'name':'工作3'},
							{'name':'工作4'},
							{'name':'工作5'},
							{'name':'工作6'}
						]
					}
				]

			}
		],
		'list1':[
			{
				'onOff':1,
				'order':'生成顺序8',
				'orderLeft':'1540',
				'parentH1':'278',
				'parentH2':'264',
				'data':[
					{'type':'1','name':'姓名','index':'0','value':'55','state':'2','count':'6'},
					{'type':'2','name':'or','value':'1'},
					{'type':'1','name':'年龄','index':'1','value':'10','state':'2','count':'6'},
					{'type':'2','name':'and','value':'0'},
					{'type':'1','name':'居住地','index':'2','value':'33','state':'2','count':'6'},
					{'type':'2','name':'or','value':'1'},
					{'type':'1','name':'年龄1','index':'3','value':'66','state':'2','count':'6'},
					{'type':'2','name':'and','value':'0'},
					{'type':'1','name':'工作所在地','index':'4','value':'22','state':'2','count':'6'},
					{'type':'2','name':'or','value':'1'},
					{'type':'1','name':'姓名1','index':'5','value':'44','state':'2','count':'6'},
					{'type':'2','name':'and','value':'0'},
					{'type':'1','name':'居住地1','index':'6','value':'80','state':'2','count':'6'},
					{'type':'2','name':'and','value':'0'},
					{'type':'1','name':'工作所在地1','index':'7','value':'100','state':'2','count':'6'},
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
				'onOff':1,
				'order':'生成顺序8',
				'orderLeft':'1540',
				'parentH1':'278',
				'parentH2':'264',
				'data':[
					{'type':'1','name':'姓名','index':'0','value':'55','state':'2','count':'6'},
					{'type':'2','name':'or','value':'1'},
					{'type':'1','name':'年龄','index':'1','value':'10','state':'2','count':'6'},
					{'type':'2','name':'and','value':'0'},
					{'type':'1','name':'居住地','index':'2','value':'33','state':'2','count':'6'},
					{'type':'2','name':'or','value':'1'},
					{'type':'1','name':'年龄1','index':'3','value':'66','state':'2','count':'6'},
					{'type':'2','name':'and','value':'0'},
					{'type':'1','name':'工作所在地','index':'4','value':'22','state':'2','count':'6'},
					{'type':'2','name':'or','value':'1'},
					{'type':'1','name':'姓名1','index':'5','value':'44','state':'2','count':'6'},
					{'type':'2','name':'and','value':'0'},
					{'type':'1','name':'居住地1','index':'6','value':'80','state':'2','count':'6'},
					{'type':'2','name':'and','value':'0'},
					{'type':'1','name':'工作所在地1','index':'7','value':'100','state':'2','count':'6'},
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
			}
		]
	},
	{
		'name':'规则2',
		'uid':10,
		'index':1,
		'list':[
			{
				'data':[
					{'type':'1','name':'姓名','textType':'文本','logic':'包含','value':'赵丽颖'},
					{'type':'2','name':'手机号','textType':'整数','logic':'包含','value':'150'},
					{'type':'3','name':'身份证','textType':'区间','value1':'1965','value2':'1970'},
					{'type':'4','name':'城市','textType':'字典','logic':'等于','value':'工作中3','valueIndex':'2','data':[
							{'name':'工作中1'},
							{'name':'工作中2'},
							{'name':'工作中3'},
							{'name':'工作中4'},
							{'name':'工作中5'},
							{'name':'工作中6'}
						]
					},
					{'type':'3','name':'身份证','textType':'区间','value1':'1965','value2':'1970'},
					{'type':'3','name':'身份证','textType':'区间','value1':'1965','value2':'1970'},
					{'type':'4','name':'城市','textType':'字典','logic':'不等于','value':'工作4','valueIndex':'3','data':[
							{'name':'工作1'},
							{'name':'工作2'},
							{'name':'工作3'},
							{'name':'工作4'},
							{'name':'工作5'},
							{'name':'工作6'}
						]
					}
				]

			}
		],
		'list1':[]
	},
	{
		'name':'规则3',
		'uid':33,
		'index':2,
		'list':[
			{
				'data':[
					{'type':'1','name':'姓名','textType':'文本','logic':'包含','value':'赵丽颖'},
					{'type':'2','name':'手机号','textType':'整数','logic':'包含','value':'150'},
					{'type':'3','name':'身份证','textType':'区间','value1':'1965','value2':'1970'},
					{'type':'4','name':'城市','textType':'字典','logic':'等于','value':'工作中3','valueIndex':'2','data':[
							{'name':'工作中1'},
							{'name':'工作中2'},
							{'name':'工作中3'},
							{'name':'工作中4'},
							{'name':'工作中5'},
							{'name':'工作中6'}
						]
					},
					{'type':'3','name':'身份证','textType':'区间','value1':'1965','value2':'1970'},
					{'type':'3','name':'身份证','textType':'区间','value1':'1965','value2':'1970'},
					{'type':'4','name':'城市','textType':'字典','logic':'不等于','value':'工作4','valueIndex':'3','data':[
							{'name':'工作1'},
							{'name':'工作2'},
							{'name':'工作3'},
							{'name':'工作4'},
							{'name':'工作5'},
							{'name':'工作6'}
						]
					}
				]

			}
		],
		'list1':[]
	},
	{
		'name':'规则4',
		'uid':22,
		'index':3,
		'list':[
			{
				'data':[
					{'type':'1','name':'姓名','textType':'文本','logic':'包含','value':'赵丽颖'},
					{'type':'2','name':'手机号','textType':'整数','logic':'包含','value':'150'},
					{'type':'3','name':'身份证','textType':'区间','value1':'1965','value2':'1970'},
					{'type':'4','name':'城市','textType':'字典','logic':'等于','value':'工作中3','valueIndex':'2','data':[
							{'name':'工作中1'},
							{'name':'工作中2'},
							{'name':'工作中3'},
							{'name':'工作中4'},
							{'name':'工作中5'},
							{'name':'工作中6'}
						]
					},
					{'type':'3','name':'身份证','textType':'区间','value1':'1965','value2':'1970'},
					{'type':'3','name':'身份证','textType':'区间','value1':'1965','value2':'1970'},
					{'type':'4','name':'城市','textType':'字典','logic':'不等于','value':'工作4','valueIndex':'3','data':[
							{'name':'工作1'},
							{'name':'工作2'},
							{'name':'工作3'},
							{'name':'工作4'},
							{'name':'工作5'},
							{'name':'工作6'}
						]
					}
				]

			}
		],
		'list1':[]
	},
	{
		'name':'规则5',
		'uid':44,
		'index':4,
		'list':[
			{
				'data':[
					{'type':'1','name':'姓名','textType':'文本','logic':'包含','value':'赵丽颖'},
					{'type':'2','name':'手机号','textType':'整数','logic':'包含','value':'150'},
					{'type':'3','name':'身份证','textType':'区间','value1':'1965','value2':'1970'},
					{'type':'4','name':'城市','textType':'字典','logic':'等于','value':'工作中3','valueIndex':'2','data':[
							{'name':'工作中1'},
							{'name':'工作中2'},
							{'name':'工作中3'},
							{'name':'工作中4'},
							{'name':'工作中5'},
							{'name':'工作中6'}
						]
					},
					{'type':'3','name':'身份证','textType':'区间','value1':'1965','value2':'1970'},
					{'type':'3','name':'身份证','textType':'区间','value1':'1965','value2':'1970'},
					{'type':'4','name':'城市','textType':'字典','logic':'不等于','value':'工作4','valueIndex':'3','data':[
							{'name':'工作1'},
							{'name':'工作2'},
							{'name':'工作3'},
							{'name':'工作4'},
							{'name':'工作5'},
							{'name':'工作6'}
						]
					}
				]

			}
		],
		'list1':[]
	},
	{
		'name':'规则6',
		'uid':66,
		'index':5,
		'list':[
			{
				'data':[
					{'type':'1','name':'姓名','textType':'文本','logic':'包含','value':'赵丽颖'},
					{'type':'2','name':'手机号','textType':'整数','logic':'包含','value':'150'},
					{'type':'3','name':'身份证','textType':'区间','value1':'1965','value2':'1970'},
					{'type':'4','name':'城市','textType':'字典','logic':'等于','value':'工作中3','valueIndex':'2','data':[
							{'name':'工作中1'},
							{'name':'工作中2'},
							{'name':'工作中3'},
							{'name':'工作中4'},
							{'name':'工作中5'},
							{'name':'工作中6'}
						]
					},
					{'type':'3','name':'身份证','textType':'区间','value1':'1965','value2':'1970'},
					{'type':'3','name':'身份证','textType':'区间','value1':'1965','value2':'1970'},
					{'type':'4','name':'城市','textType':'字典','logic':'不等于','value':'工作4','valueIndex':'3','data':[
							{'name':'工作1'},
							{'name':'工作2'},
							{'name':'工作3'},
							{'name':'工作4'},
							{'name':'工作5'},
							{'name':'工作6'}
						]
					}
				]

			}
		],
		'list1':[]
	},
	{
		'name':'规则7',
		'uid':80,
		'index':6,
		'list':[
			{
				'data':[
					{'type':'1','name':'姓名','textType':'文本','logic':'包含','value':'赵丽颖'},
					{'type':'2','name':'手机号','textType':'整数','logic':'包含','value':'150'},
					{'type':'3','name':'身份证','textType':'区间','value1':'1965','value2':'1970'},
					{'type':'4','name':'城市','textType':'字典','logic':'等于','value':'工作中3','valueIndex':'2','data':[
							{'name':'工作中1'},
							{'name':'工作中2'},
							{'name':'工作中3'},
							{'name':'工作中4'},
							{'name':'工作中5'},
							{'name':'工作中6'}
						]
					},
					{'type':'3','name':'身份证','textType':'区间','value1':'1965','value2':'1970'},
					{'type':'3','name':'身份证','textType':'区间','value1':'1965','value2':'1970'},
					{'type':'4','name':'城市','textType':'字典','logic':'不等于','value':'工作4','valueIndex':'3','data':[
							{'name':'工作1'},
							{'name':'工作2'},
							{'name':'工作3'},
							{'name':'工作4'},
							{'name':'工作5'},
							{'name':'工作6'}
						]
					}
				]

			}
		],
		'list1':[]
	},
	{
		'name':'规则8',
		'uid':100,
		'index':7,
		'list':[
			{
				'data':[
					{'type':'1','name':'姓名','textType':'文本','logic':'包含','value':'赵丽颖'},
					{'type':'2','name':'手机号','textType':'整数','logic':'包含','value':'150'},
					{'type':'3','name':'身份证','textType':'区间','value1':'1965','value2':'1970'},
					{'type':'4','name':'城市','textType':'字典','logic':'等于','value':'工作中3','valueIndex':'2','data':[
							{'name':'工作中1'},
							{'name':'工作中2'},
							{'name':'工作中3'},
							{'name':'工作中4'},
							{'name':'工作中5'},
							{'name':'工作中6'}
						]
					},
					{'type':'3','name':'身份证','textType':'区间','value1':'1965','value2':'1970'},
					{'type':'3','name':'身份证','textType':'区间','value1':'1965','value2':'1970'},
					{'type':'4','name':'城市','textType':'字典','logic':'不等于','value':'工作4','valueIndex':'3','data':[
							{'name':'工作1'},
							{'name':'工作2'},
							{'name':'工作3'},
							{'name':'工作4'},
							{'name':'工作5'},
							{'name':'工作6'}
						]
					}
				]

			}
		],
		'list1':[
			{
				'onOff':1,
				'order':'生成顺序8',
				'orderLeft':'0',
				'parentH1':'278',//82+(线数-1)*30+16
				'parentH2':'264',//68+(线数-1)*30+16
				'data':[
					{'type':'1','name':'姓名','index':'0','value':'55','state':'2','count':'6'},
					{'type':'2','name':'or','value':'1'},
					{'type':'1','name':'年龄','index':'1','value':'10','state':'2','count':'6'},
					{'type':'2','name':'and','value':'0'},
					{'type':'1','name':'居住地','index':'2','value':'33','state':'2','count':'6'},
					{'type':'2','name':'or','value':'1'},
					{'type':'1','name':'年龄1','index':'3','value':'66','state':'2','count':'6'},
					{'type':'2','name':'and','value':'0'},
					{'type':'1','name':'工作所在地','index':'4','value':'22','state':'2','count':'6'},
					{'type':'2','name':'or','value':'1'},
					{'type':'1','name':'姓名1','index':'5','value':'44','state':'2','count':'6'},
					{'type':'2','name':'and','value':'0'},
					{'type':'1','name':'居住地1','index':'6','value':'80','state':'2','count':'6'},
					{'type':'2','name':'and','value':'0'},
					{'type':'1','name':'工作所在地1','index':'7','value':'100','state':'2','count':'6'},
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
			}
		]
	}
];

//初始化
rulePublic.init =function(){
	//初始化校验
    rulePublic.initValidator();
    //获取规则
    rulePublic.findAllRule3_1();

    //选择规则-筛选数据
    rulePublic.arrData = [];
    rulePublic.arrData = rulePublic.arrData.concat(rulePublic.data);
	//字段选择-筛选数据
    rulePublic.arrData1 = [];
    rulePublic.arrText = [];
    //获取已经选中的规则
    rulePublic.findExcuteRule();

}
//初始化调用
$(document).ready(rulePublic.init);
//页面内容模版
rulePublic.htmlTemplate = `<div class="ruleConfig_box">
	<div class="ruleConfig_menu clear">
		<strong class="fl">选择规则：</strong>
		<div class="menu_template_box select_rule fl" data-id="0">
			<div class="down_menu_btn select_rule_btn" data-id="0">
				<span class="menu_title_color">请选择</span>
				<input type="hidden" value="0">
			</div>
			<ul class="select_rule_list"></ul>
		</div>
	</div>
	<div class="ruleConfig_menu clear">
		<strong class="fl">权重系数：</strong>
		<input class="weight" type="text" placeholder="请输入" name="weight" id="weight_${rulePublic.index++}">
		<p class="fields_error">输入错误</p>
		<em>(%)</em>
	</div>	
</div>`
//最外层-添加删除逻辑
rulePublic.addList = function(obj){
	var dataId = $(obj).attr('data-id');
	var parent = $(obj).parent().parent();
	if(dataId==1){  //删除
		var dataIndex = $(parent).find('.select_rule').attr('data-id');
		$(obj).parent().parent().remove();
		rulePublic.arrData.splice(0,0,rulePublic.data[dataIndex]);
		if(rulePublic.arrData!=''){
			$('.select_title a').removeClass('active');
			$('.select_title a').attr('data-id',0);
		}
	}else{ //添加
		if($(parent).find('.select_rule_btn span').html()=='请选择'){
			return false;
		}
		if($('.ruleConfig_box').size()<rulePublic.data.length){
			$('.ruleConfig_parent').append(rulePublic.htmlTemplate);
            $('.ruleConfig_box:last').find(".weight").attr("id","weight_"+rulePublic.index++);
			$('.ruleConfig_box:last').append(`<div class="logic_addBtn logic_addBtn_position">
				<a href="javaScript:;" class="logic_addBtn_left fl" data-id="0" onclick="rulePublic.addList($(this))">&#xe61f;</a>
				<a href="javaScript:;" class="logic_addBtn_right fr" data-id="1" onclick="rulePublic.addList($(this))">&#xe61d;</a>
			</div>`);
		}
		if($('.select_rule').size()==rulePublic.data.length){
			$('.select_title a').addClass('active');
			$('.select_title a').attr('data-id',1);
		}
		//生成选择规则菜单
		rulePublic.createRuleList();
	}
	
};
//最内层-添加删除逻辑
rulePublic.addList1 = function(obj){
	var dataId = $(obj).attr('data-id');
	var parent = $(obj).parent().parent();
	var parent1 = $(obj).parent().parent().parent().parent();
	if(dataId==1){  //删除
		$(obj).parent().parent().remove();
	}else{ //添加
		rulePublic.num++;
		var parDataId = $(obj).parent().parent().parent().parent().find('.select_rule').attr('data-id');
		var data = rulePublic.data[parDataId].list[0].data;
		var num = 0;
		$(parent).parent().parent().append('<div class="ruleConfig_fields ">'+$(parent).parent().html()+'</div>');
        $(parent1).find('.operation_setUp_content:last').find("tbody tr").eq(0).find("td:last").find("input").attr('id','score_'+rulePublic.index);
        $(parent1).find('.operation_setUp_content:last').find("tbody").eq(0).find("input[name='include_text']").each(function(index,item){
        	$(item).attr("id",'include_text_'+rulePublic.index++);
		})
        $(parent1).find('.operation_setUp_content:last').find("tbody").eq(0).find("input[name='number']").each(function(index,item){
            $(item).attr("id",'number_'+rulePublic.index++);
        })
        $(parent1).find('.operation_setUp_content:last').find("tbody").eq(0).find("input[name='double']").each(function(index,item){
            $(item).attr("id",'double_'+rulePublic.index++);
        })
		$(parent1).find('.operation_setUp_content:last').attr('id','operation_setUp_content'+rulePublic.num);
		$(parent1).find('.setUp_content_tab:last').attr('id','setUp_content_tab'+rulePublic.num);
		$(parent1).find('.scroll_parent:last').attr('id','scroll_parent'+rulePublic.num);
		$(parent1).find('.scroll_son:last').attr('id','scroll_son'+rulePublic.num);
		$(parent1).find('.setUp_content_tab:last').css('top',0);
		$(parent1).find('.setUp_content_tab:last').find('input').val('');
		$(parent1).find('.scroll_son:last').css('top',0);
		$(parent1).find('.logic_addBtn:last').remove();
		$(parent1).find('.ruleConfig_fields_son:last').append(`
			<div class="logic_addBtn logic_addBtn_position"><a href="javaScript:;" class="logic_addBtn_left fl" data-id="0" onclick="rulePublic.addList1($(this))">&#xe61f;</a>
			<a href="javaScript:;" class="logic_addBtn_right fr" data-id="1" onclick="rulePublic.addList1($(this))">&#xe61d;</a></div>
		`)
		
		for(var i=0;i<data.length;i++){
			if(data[i].type == 4){
				$('#setUp_content_tab'+rulePublic.num).find('.down_btn2').eq(num).find('span').html(data[i].value);
				$('#setUp_content_tab'+rulePublic.num).find('.down_btn2').eq(num).find('input').val(data[i].valueIndex);
				num++;
			}
		}
		//滚动条滚动
		// aide.scroll({
		// 	parentId:'operation_setUp_content'+rulePublic.num,
		// 	listId:'setUp_content_tab'+rulePublic.num,
		// 	scrollParentId:'scroll_parent'+rulePublic.num,
		// 	scrollId:'scroll_son'+rulePublic.num,
		// })
        //长度大于5显示滚动条
        if($('#setUp_content_tab'+rulePublic.num).find('tbody tr').size()>5){
            $('#operation_setUp_content'+rulePublic.num).find('.scroll_parent').remove();
            $('#operation_setUp_content'+rulePublic.num).append(`
				<div class="scroll_parent setUp_scroll_parent" id="scroll_parent${rulePublic.num}">
					<div class="scroll_son" id="scroll_son${rulePublic.num}"></div>
				</div>
			`)
            //滚动条滚动
            aide.scroll({
                parentId:'operation_setUp_content'+rulePublic.num,
                listId:'setUp_content_tab'+rulePublic.num,
                scrollParentId:'scroll_parent'+rulePublic.num,
                scrollId:'scroll_son'+rulePublic.num,
            })
        }else{
            var iH = $('#setUp_content_tab'+rulePublic.num).find('tbody tr').height()*$('#setUp_content_tab'+rulePublic.num).find('tbody tr').size();
            $('#operation_setUp_content'+rulePublic.num).find('.operation_overflow').css('height',iH);

        };
		//运算逻辑-下拉菜单点击
		$('#setUp_content_tab'+rulePublic.num).find('.down_btn2').off('click').on('click',function(ev){
			var dataId = $(this).attr('data-id');
			var dataValue = $(this).attr('data-value');
			var dataTip = $(this).attr('data-tip');
			var parentDataId = parDataId
			
			if(dataId==0){
				if($('.body_menu_list').css('display')=='block'){
					rulePublic.onOff = false;
				}
				$('.down_menu_btn').removeClass('curr');
				$('.down_menu_btn').attr('data-id',0);
				$('.body_menu_list1').remove();
				$('.select_rule_list').slideUp(200);
				$(this).addClass('curr');
				$(this).attr('data-id',1);
				rulePublic.downMenu({ //生成运算逻辑-下拉菜单
					This:$(this),
					parentDataId:parentDataId,
					dataValue:dataValue,
					dataTip:dataTip,
					oSclass:'.body_menu_list',
					top:$(this).offset().top+31,
					left:$(this).offset().left
				});	
			}else{
				$(this).removeClass('curr');
				$(this).attr('data-id',0);
				$('.body_menu_list').remove();
				rulePublic.onOff = true;
			}	
			ev.stopPropagation();
		});
		$(parent1).find('.execute_setUp_parent:last').attr('id','execute_setUp_parent'+rulePublic.num);
		$(parent1).find('.execute_mar:last').attr('id','execute_setUp_box'+rulePublic.num);
		$(parent1).find('.execute_setUp_box:last').attr('id','execute_list'+rulePublic.num);
		$(parent1).find('.execute_scroll_parent:last').attr('id','execute_scroll_parent'+rulePublic.num);
		$(parent1).find('.execute_scroll_son:last').attr('id','execute_scroll_son'+rulePublic.num);
		$(parent1).find('.reset_btn:last').attr('data-id',rulePublic.num);
		$(parent1).find('.execute_setUp_box:last').css('left',0);
		$(parent1).find('.execute_scroll_son:last').css('left',0);
		$(parent1).find('.checkbox_error:last').hide();
		
		$('#execute_list'+rulePublic.num).find('.execute_common').remove();
		$('#execute_list'+rulePublic.num).find('.pattern_line').remove();
		$('#execute_list'+rulePublic.num).attr('data-value',1);
		if(rulePublic.data[parDataId].list1[0]){
			var data1 = rulePublic.data[parDataId].list1[0].data;
			var str = '';
			for(var i=0;i<data1.length;i++){
				if(data1[i].type == 1){
					str = `<div class="execute_fields execute_common">
								<div class="menu_template_box execute_down_box " data-id="${i}">
									<div class="down_menu_btn" data-id="0">
										<span>${data1[i].name}</span>
										<input type="hidden" value="${data1[i].value}" name="logicSelect" id="logicSelect_${rulePublic.index++}">
									</div>
								</div>
								<div class="execute_tem_box" data-id="${data1[i].state}"  data-value="${data1[i].count}"></div>
								<p class="execute_error">错误提示</p>
							</div>`
				}else if(data1[i].type == 2){
					str = `<div class="execute_if execute_common">
								<div class="menu_template_box execute_down_box1" data-id="${i}">
									<div class="down_menu_btn" data-id="0">
										<span>${data1[i].name}</span>
										<input type="hidden" value="${data1[i].value}">
									</div>
								</div>
							</div>`
				}
				$('#execute_list'+rulePublic.num).append(str);
			}
			//生成线
			var line = rulePublic.data[parDataId].list1[0].line;
			$(parent1).find('.execute_setUp_parent:last').height(rulePublic.data[parDataId].list1[0].parentH1);
			$(parent1).find('.execute_mar:last').height(rulePublic.data[parDataId].list1[0].parentH2);
			$(parent1).find('.create_order:last').css('left',line.orderLeft+'px');
			$(parent1).find('.create_order:last').html(line.order);
			if(line!=''){
				for(j in line){
					$(parent1).find('.execute_setUp_box:last').append(`
						<div class="pattern_line" data-start="${line[j].start}" data-end="${line[j].end}" style="left:${line[j].left}px;top:${line[j].top}px;">
							<strong>${parseInt(j)+1}</strong>
							<span style="width:${line[j].width}px;"></span>
						</div>
					`)
				}
				//画线hover对应顺序
//				rulePublic.lineHover({
//					listId:'execute_list'+(i+1),
//				});	
			}
			//滚动条滚动
			// aide.scroll({
			// 	parentId:'execute_setUp_box'+rulePublic.num,
			// 	listId:'execute_list'+rulePublic.num,
			// 	scrollParentId:'execute_scroll_parent'+rulePublic.num,
			// 	scrollId:'execute_scroll_son'+rulePublic.num,
			// 	onOff:true
			// })
            var iW = $('.rule_order_box').width()-50;
            var fieldsW = 0;
            var fieldsW1 = $('#execute_list'+rulePublic.num).find('.execute_fields').outerWidth()*Math.ceil($('#execute_list'+rulePublic.num).find('.execute_common').size()/2);
            var fieldsW2 = $('#execute_list'+rulePublic.num).find('.execute_if').width()*Math.floor($('#execute_list'+rulePublic.num).find('.execute_common').size()/2);
            if($('#execute_list'+rulePublic.num).find('.execute_if').size()==0){
                fieldsW = fieldsW1;
            }else{
                fieldsW = fieldsW1+fieldsW2;
            }
            $('#execute_list'+rulePublic.num).width(fieldsW);
            $('#execute_list'+rulePublic.num).attr('data-value',1);
            //内容宽度大于父级宽度显示滚动条
            if(fieldsW>iW){
                $('#execute_setUp_parent'+rulePublic.num).find('.execute_scroll_parent').remove();
                $('#execute_setUp_parent'+rulePublic.num).append(`
					<div class="execute_scroll_parent" id="execute_scroll_parent${rulePublic.num}">
						<div class="execute_scroll_son" id="execute_scroll_son${rulePublic.num}"></div>
					</div>
				`)
                $('#execute_setUp_parent'+rulePublic.num).find('.execute_scroll_parent').width(iW);
                //滚动条滚动
                aide.scroll({
                    parentId:'execute_setUp_box'+rulePublic.num,
                    listId:'execute_list'+rulePublic.num,
                    scrollParentId:'execute_scroll_parent'+rulePublic.num,
                    scrollId:'execute_scroll_son'+rulePublic.num,
                    onOff:true
                })
            }

            //执行设置-字段设置
			rulePublic.executeSetup({
				id:'execute_setUp_parent'+rulePublic.num,
				parentId:'execute_setUp_box'+rulePublic.num,
				listId:'execute_list'+rulePublic.num,
				scrollParentId:'execute_scroll_parent'+rulePublic.num,
				scrollId:'execute_scroll_son'+rulePublic.num
			});
			
		}
		
		
		
	}
	
};
//生成选择规则菜单
rulePublic.createRuleList = function(){
	$('.select_rule_btn').off('click').on('click',function(ev){
		var dataId = $(this).attr('data-id');
		var dataIndex = $(this).parent().attr('data-id');
		if(rulePublic.arrData.length!=0){
			if(dataId==0){
				$('.down_menu_btn').removeClass('curr');
				$('.down_menu_btn').attr('data-id',0);
				$('.select_rule_list').slideUp(200);
				$('.body_menu_list1').remove();
				$('.body_menu_list').remove();
				$(this).addClass('curr');
				$(this).attr('data-id',1);
	
				//生成选择规则-菜单列表
				rulePublic.createMenuList({
					This:this,
					dataIndex:dataIndex
				})
				$(this).parent().parent().find('.select_rule_list').slideDown(200);
			}else{
				$(this).removeClass('curr');
				$(this).parent().parent().find('.select_rule_list').slideUp(200);
				$(this).attr('data-id',0);
			}	
		}
		ev.stopPropagation();
		$(document).click(function(){
			$('.select_rule_list').slideUp(200);
			$('.down_menu_btn').attr('data-id',0);
			$('.down_menu_btn').removeClass('curr');
		});
		
	})	
};
//生成选择规则-菜单列表
rulePublic.createMenuList = function(opt){
	var old;
	var This = $(opt.This).parent().parent();
	$(This).find('.select_rule_list').html('');

	for(var i=0;i<rulePublic.arrData.length;i++){
			$(This).find('.select_rule_list').append(`<li data-index="${rulePublic.arrData[i].index}" data-id="${rulePublic.arrData[i].uid}"><a href="javaScript:;">${rulePublic.arrData[i].name}</a></li>`)
	}
	
	if($(This).find('.select_rule_list li').size()>5){
		$(This).find('.select_rule_list').css('max-height','160px');
	}else{
		$(This).find('.select_rule_list').css('max-height','auto');
	}
	//菜单子项点击操作
	$(This).find('.select_rule_list li').off('click').on('click',function(){
		var dataIndex = $(this).attr('data-index');
		var parents = $(this).parent().parent().parent().parent();
		if($(opt.This).find('span').html()=='请选择'){
			rulePublic.arrData.splice($(this).index(),1);
		}else{
			rulePublic.arrData.splice($(this).index(),1,rulePublic.data[opt.dataIndex]).sort();
		}
		$(This).find('span').html($(this).find('a').html());
		$(This).find('span').removeClass('menu_title_color');
		$(This).find('input').val($(this).attr('data-id'));
		$(this).parent().parent().attr('data-id',dataIndex);
        parents.parent().find(".weight").val(rulePublic.data[opt.dataIndex].weights);
		//生成对应规则列表-数据
		rulePublic.createData({
			This:parents,
			dataIndex:dataIndex
		})
		

	})
};
//重置按钮
rulePublic.resetBtn = function(obj){
	var dataId = $(obj).attr('data-id');
	var oParent = $(obj).parent().parent();
	var dataCode = $(oParent).parent().parent().parent().find('.select_rule').attr('data-id');
	var data = rulePublic.data[dataCode].list1[0].data;
	rulePublic.arrText = [];
	for(var i=0;i<data.length;i++){
		if(data[i].type == 1){
			rulePublic.arrText.push(data[i]);
		}
	}
	$('#execute_list'+dataId).css('left',0);
	$('#execute_scroll_parent'+dataId).remove();
	$('#execute_setUp_parent'+dataId).attr('data-id',0);
	$('#execute_list'+dataId).attr('data-value',0);
	$('#execute_list'+dataId).html('');
	$('#execute_setUp_parent'+dataId).height(82);
	$('#execute_setUp_box'+dataId).height(68);
	$(oParent).find('.slide_btn').eq(0).attr('data-id',0);
	$(oParent).find('.slide_btn:eq(0) span').css('left',2);
	$(oParent).find('.slide_btn:eq(0) strong').removeClass('active');
	$(oParent).find('.slide_btn:eq(0) strong').attr('data-id',0);
	$(oParent).find('.slide_btn:eq(0) i').html('关');
	$(oParent).find('.checkbox_error').hide();
	$('#execute_list'+dataId).append(`
		<a href="javaScript:;" class="create_order"></a>
	`)
	for(var i=0;i<rulePublic.arrText.length;i++){
		$('#execute_list'+dataId).append(`
			<div class="execute_fields execute_common">
				<div class="menu_template_box execute_down_box " data-id="${i}">
					<div class="down_menu_btn" data-id="0">
						<span class="menu_title_color">请选择字段</span>
						<input type="hidden" name="logicSelect" id="logicSelect_${rulePublic.index++}">
					</div>
				</div>
				<div class="execute_tem_box" data-id="0"></div>
				<p class="execute_error">错误提示</p>
			</div>
			<div class="execute_if execute_common">
				<div class="menu_template_box execute_down_box1" data-id="${i}">
					<div class="down_menu_btn" data-id="0">
						<span>and</span>
						<input type="hidden" value="0">
					</div>
				</div>
			</div>
		`);
	}
	//删除最后一个多余的
	$('#execute_list'+dataId).find('.execute_if:last').remove();
	var fieldsW = $('#execute_list'+dataId).width();
	var iW = $('#execute_setUp_box'+dataId).width();
	//内容宽度大于父级宽度显示滚动条
	if(fieldsW>iW){
		$('#execute_setUp_parent'+dataId).append(`
			<div class="execute_scroll_parent" id="execute_scroll_parent${dataId}">
				<div class="execute_scroll_son" id="execute_scroll_son${dataId}"></div>
			</div>
		`)
		$('#execute_scroll_parent'+dataId).width(iW);
		//滚动条滚动
		aide.scroll({
			parentId:'execute_setUp_box'+dataId,
			listId:'execute_list'+dataId,
			scrollParentId:'execute_scroll_parent'+dataId,
			scrollId:'execute_scroll_son'+dataId,
			onOff:true
		})
	}
	//执行设置-字段设置
	rulePublic.executeSetup({
		id:'execute_setUp_parent'+dataId,
		parentId:'execute_setUp_box'+dataId,
		listId:'execute_list'+dataId,
		scrollParentId:'execute_scroll_parent'+dataId,
		scrollId:'execute_scroll_son'+dataId
	});
}
//执行设置-选框模式开关
rulePublic.setState1 = function(obj){
	var dataId = $(obj).attr('data-id');
	var oParent = $(obj).parent().parent().parent().parent();
	var oSize = $(oParent).find('.execute_fields .down_menu_btn span').size();
	var onOff = false;

	for(var i=0;i<oSize;i++){
		if($(oParent).find('.execute_fields .down_menu_btn span').eq(i).html()!='请选择字段'){
			if($(obj).parent().parent().parent().find('.pattern_line').size() !=0){
				onOff = false;
				$(obj).parent().parent().find('.checkbox_error').show();
				$(obj).parent().parent().find('.checkbox_error').html('重置后，才能修改。');
			}else{
				onOff = true;
				$(obj).parent().parent().find('.checkbox_error').hide();
			}
		}else{
			onOff = false;
			$(obj).parent().parent().find('.checkbox_error').show();
			$(obj).parent().parent().find('.checkbox_error').html('全部字段已选择完毕,才能打开选框模式。');
			
		}
	}
	if(onOff){
		if(dataId==0){
			$(obj).find('span').animate({left:24},200,function(){
				$(obj).addClass('active');
				$(obj).find('i').html('开');
				$(obj).attr('data-id',1);
				$(obj).parent().attr('data-id',1);
				$(oParent).find('.execute_fields .execute_tem_box').show();
			})
			for(var i=0;i<$(oParent).find('.execute_common').size();i++){
				$(oParent).find('.execute_common').eq(i).attr('data-value',i);
			}
		}else{
			$(obj).find('span').animate({left:2},200,function(){
				$(obj).removeClass('active');
				$(obj).find('i').html('关');
				$(obj).attr('data-id',0);
				$(obj).parent().attr('data-id',0);
				$(oParent).find('.execute_fields .execute_tem_box').hide();
			})
		}	
	}	
};



//生成对应规则列表-数据
rulePublic.createData = function(opt){
	$(opt.This).find('.ruleConfig_fields').remove();
	//生成字段列表
	var str = '';
	var oSclass = '';
	var str1 = '';
	var list = rulePublic.data[opt.dataIndex].list;
	for(var i=0;i<list.length;i++){
		rulePublic.num++;
		//字段列表添加
		if(i==0){
			oSclass = 'ruleConfig_fields1';
			str1 = '<a href="javaScript:;" class="logic_addBtn_left fl" data-id="0" onclick="rulePublic.addList1($(this))">&#xe61f;</a>';
		}else{
			oSclass = ''
			str1 = `<a href="javaScript:;" class="logic_addBtn_left fl" data-id="0" onclick="rulePublic.addList1($(this))">&#xe61f;</a>
			<a href="javaScript:;" class="logic_addBtn_right fr" data-id="1" onclick="rulePublic.addList1($(this))">&#xe61d;</a>`;
		}
		$(opt.This).append(`
		<div class="ruleConfig_fields ${oSclass}">
			<div class="ruleConfig_fields_son">
				<div class="operation_setUp">
					<div class="operation_setUp_title">
						<!--<form>-->
							<table class="setUp_title_tab">
								<thead>
									<tr>
										<th class="setUp_title_tab_th1">字段名称</th>
										<th class="setUp_title_tab_th2">字段类型</th>
										<th class="setUp_title_tab_th3">运算逻辑</th>
										<th class="setUp_title_tab_th4">分值</th>
									</tr>
								</thead>
							</table>
						<!--</form>-->
					</div>
					<div class="operation_setUp_content" id="operation_setUp_content${rulePublic.num}">
						<div class="operation_overflow">
							<!--<form>-->
								<table class="setUp_content_tab" id="setUp_content_tab${rulePublic.num}">
									<tbody></tbody>
								</table>
							<!--</form>-->
						</div>
					</div>
				</div>
				<div class="logic_addBtn logic_addBtn_position">${str1}</div>
			</div>
		`);
		for(var j=0;j<list[i].data.length;j++){
			if(list[i].data[j].type == 5){
				str = `<div class="setUp_type1">
							<strong class="set_fields_s fl">${list[i].data[j].logic}</strong>
							<div class="setUp_text setUp_text1 fl">
								<input type="text" placeholder="请输入" value="${list[i].data[j].value}" name="include_text" id="include_text_${rulePublic.index++}">
								<i class="setUp_error">输入错误</i>
							</div>
						</div>`
			}else if(list[i].data[j].type == 1){
				str = `<div class="setUp_type2">
							<div class="setUp_text fl">
								<input type="text" class="setUp_text_input" placeholder="请输入" value="${list[i].data[j].value1}" name="number" id="number_${rulePublic.index++}">
								<span>(含)</span>
								<strong>-</strong>
								<i class="setUp_error">输入错误</i>
							</div>
							<div class="setUp_text fl">
								<input type="text" class="setUp_text_input" placeholder="请输入" value="${list[i].data[j].value2}" name="number" id="number_${rulePublic.index++}">
								<span>(不含)</span>
								<i class="setUp_error">输入错误</i>
							</div>
						</div>`
			}else if(list[i].data[j].type == 2){
                str = `<div class="setUp_type2">
							<div class="setUp_text fl">
								<input type="text" class="setUp_text_input" placeholder="请输入" value="${list[i].data[j].value1}" name="double" id="double_${rulePublic.index++}">
								<span>(含)</span>
								<strong>-</strong>
								<i class="setUp_error">输入错误</i>
							</div>
							<div class="setUp_text fl">
								<input type="text" class="setUp_text_input" placeholder="请输入" value="${list[i].data[j].value2}" name="double" id="double_${rulePublic.index++}">
								<span>(不含)</span>
								<i class="setUp_error">输入错误</i>
							</div>
						</div>`
			}else if(list[i].data[j].type == 4){
				str = `<div class="setUp_type1">
							<strong class="set_fields_s fl">${list[i].data[j].logic}</strong>
							<div class="menu_template_box logic_template_box fl">
								<div class="down_menu_btn down_btn2" data-id="0" data-tip="${i}" data-value="${j}">
									<span>${list[i].data[j].value}</span>
									<input type="hidden" value="${list[i].data[j].valueIndex}" data-code="${list[i].data[j].valueCode}">
								</div>
							</div>
						</div>`
				
			}
			$(opt.This).find('.setUp_content_tab:eq('+i+') tbody').append(`
				<tr data-type="${list[i].data[j].type}" data-name="${list[i].data[j].name}" data-id="${list[i].data[j].id}" data-logicType="${list[i].data[j].logicType}">
					<td class="setUp_content_tab_td1">${list[i].data[j].name}</td>
					<td class="setUp_content_tab_td2">${list[i].data[j].textType}</td>
					<td class="setUp_content_tab_td3">${str}</td>
					<td></td>
				</tr>
			`)	
		}
		//分值
		$(opt.This).find('.setUp_content_tab tbody:eq('+i+') tr:eq(0) td:eq(3)').append(`
			<div class="setUp_text fl">
				<input class="logicScore" type="text" placeholder="请输入" value="${list[i].score==null?'':list[i].score}" name="score" id="socre_${rulePublic.index++}">
				<i class="setUp_error">输入错误</i>
			</div>
		`);
		//长度大于5显示滚动条
		if($(opt.This).find('.setUp_content_tab:eq('+i+') tbody tr').size()>5){
			$(opt.This).find('.operation_setUp_content:eq('+i+')').append(`
				<div class="scroll_parent setUp_scroll_parent" id="scroll_parent${rulePublic.num}">
					<div class="scroll_son" id="scroll_son${rulePublic.num}"></div>
				</div>
			`)
			//滚动条滚动
			aide.scroll({
				parentId:'operation_setUp_content'+rulePublic.num,
				listId:'setUp_content_tab'+rulePublic.num,
				scrollParentId:'scroll_parent'+rulePublic.num,
				scrollId:'scroll_son'+rulePublic.num,
			})
		}else{
			var iH = $(opt.This).find('.setUp_content_tab:eq('+i+') tbody tr').height()*$(opt.This).find('.setUp_content_tab:eq('+i+') tbody tr').size();
			$(opt.This).find('.operation_overflow:eq('+i+')').css('height',iH);
			
		};
	};
	//其他情况
	$(opt.This).append(`
		<div class="ruleConfig_fields_other">
			<span class="fl">其他情况分值：</span>
			<div class="setUp_text fl">
				<input  type="text" placeholder="请输入" value="${rulePublic.data[opt.dataIndex].score==null?'':rulePublic.data[opt.dataIndex].score}" name="score" id="score_${rulePublic.index++}">
				<i class="setUp_error">输入错误</i>
			</div>
		</div>
	`);
	//运算逻辑-下拉菜单点击
	$(opt.This).find('.down_btn2').off('click').on('click',function(ev){
		var dataId = $(this).attr('data-id');
		var dataValue = $(this).attr('data-value');
		var dataTip = $(this).attr('data-tip');
		var parentDataId = $(opt.This).find('.select_rule').attr('data-id');
		
		if(dataId==0){
			if($('.body_menu_list').css('display')=='block'){
				rulePublic.onOff = false;
			}
			$('.down_menu_btn').removeClass('curr');
			$('.down_menu_btn').attr('data-id',0);
			$('.body_menu_list1').remove();
			$('.select_rule_list').slideUp(200);
			$(this).addClass('curr');
			$(this).attr('data-id',1);
			rulePublic.downMenu({ //生成运算逻辑-下拉菜单
				This:$(this),
				parentDataId:parentDataId,
				dataValue:dataValue,
				dataTip:dataTip,
				oSclass:'.body_menu_list',
				top:$(this).offset().top+31,
				left:$(this).offset().left
			});	
		}else{
			$(this).removeClass('curr');
			$(this).attr('data-id',0);
			$('.body_menu_list').remove();
			rulePublic.onOff = true;
		}	
		ev.stopPropagation();
	});
	//生成选框模式-字段
	$(opt.This).find('.rule_order_box').remove();
	for(var i=0;i<rulePublic.data[opt.dataIndex].list1.length;i++){
		if(rulePublic.data[opt.dataIndex].list1[i].data !=''){
			rulePublic.num++;
			$(opt.This).find('.ruleConfig_fields_son').eq(i).append(`
				<div class="rule_order_box">
					<div class="reset_parent">
						<a href="javaScript:;" class="reset_btn" data-id="${rulePublic.num}" onclick="rulePublic.resetBtn($(this))">重置</a>
					</div>
					<div class="checkbox_mode">
						<strong class="checkbox_mode_title fl">框选模式</strong>
						<div class="slide_btn">
							<strong data-id="0" onclick="rulePublic.setState1($(this))">
								<i>关</i>
								<span></span>
							</strong>
						</div>
						<p class="checkbox_error"></p>
					</div>
					<div class="execute_setUp_parent" id="execute_setUp_parent${rulePublic.num}" data-id="0">
						<div class="execute_mar clear" id="execute_setUp_box${rulePublic.num}">
							<div class="execute_setUp_box" id="execute_list${rulePublic.num}" data-value="0">
								<a href="javaScript:;" class="create_order"></a>
							</div>
						</div>
					</div>	
				</div>
			`);
			var data = rulePublic.data[opt.dataIndex].list1[i].data;
			//生成执行设置字段
			var iW = $('.rule_order_box').width()-50;
			$('.execute_mar').width(iW);
			var str = '';
			for(var j=0;j<data.length;j++){
				if(data[j].type == 1){
					str = `<div class="execute_fields execute_common">
								<div class="menu_template_box execute_down_box " data-id="${j}">
									<div class="down_menu_btn" data-id="0">
										<span>${data[j].name}</span>
										<input type="hidden" value="${data[j].value}" name="logicSelect" id="logicSelect_${rulePublic.index++}">
									</div>
								</div>
								<div class="execute_tem_box" data-id="${data[j].state}"  data-value="${data[j].count}"></div>
								<p class="execute_error">错误提示</p>
							</div>`
				}else if(data[j].type == 2){
					str = `<div class="execute_if execute_common">
								<div class="menu_template_box execute_down_box1" data-id="${i}">
									<div class="down_menu_btn" data-id="0">
										<span>${data[j].name}</span>
										<input type="hidden" value="${data[j].value}">
									</div>
								</div>
							</div>`
				}
				$('#execute_list'+rulePublic.num).append(str);
			}
			var fieldsW = 0;
			var fieldsW1 = $('#execute_list'+rulePublic.num).find('.execute_fields').outerWidth()*Math.ceil(data.length/2);
			var fieldsW2 = $('#execute_list'+rulePublic.num).find('.execute_if').width()*Math.floor(data.length/2);
			if($('#execute_list'+rulePublic.num).find('.execute_if').size()==0){
				fieldsW = fieldsW1;
			}else{
				fieldsW = fieldsW1+fieldsW2;
			}
			$('#execute_list'+rulePublic.num).width(fieldsW);
			$('#execute_list'+rulePublic.num).attr('data-value',1);
			//内容宽度大于父级宽度显示滚动条
			if(fieldsW>iW){
				$('#execute_setUp_parent'+rulePublic.num).append(`
					<div class="execute_scroll_parent" id="execute_scroll_parent${rulePublic.num}">
						<div class="execute_scroll_son" id="execute_scroll_son${rulePublic.num}"></div>
					</div>
				`)
				$('#execute_setUp_parent'+rulePublic.num).find('.execute_scroll_parent').width(iW);
				//滚动条滚动
				aide.scroll({
					parentId:'execute_setUp_box'+rulePublic.num,
					listId:'execute_list'+rulePublic.num,
					scrollParentId:'execute_scroll_parent'+rulePublic.num,
					scrollId:'execute_scroll_son'+rulePublic.num,
					onOff:true
				})
			}
			//生成线
			var line = rulePublic.data[opt.dataIndex].list1[i]
			$(opt.This).find('.execute_setUp_parent').eq(i).height(line.parentH1);
			$(opt.This).find('.execute_mar').eq(i).height(line.parentH2);
			$(opt.This).find('.create_order').eq(i).css('left',line.orderLeft+'px');
			$(opt.This).find('.create_order').eq(i).html(line.order);
			var data1 = rulePublic.data[opt.dataIndex].list1[i].line;
			if(data1!=''){
				for(j in data1){
					$(opt.This).find('.execute_setUp_box').eq(i).append(`
						<div class="pattern_line" data-start="${data1[j].start}" data-end="${data1[j].end}" style="left:${data1[j].left}px;top:${data1[j].top}px;">
							<strong>${parseInt(j)+1}</strong>
							<span style="width:${data1[j].width}px;"></span>
						</div>
					`)
				}
				//画线hover对应顺序
//				rulePublic.lineHover({
//					listId:'execute_list'+(i+1),
//				});	
			}
			//生成选框模式-字段
			rulePublic.executeSetup({
				id:'execute_setUp_parent'+rulePublic.num,
				parentId:'execute_setUp_box'+rulePublic.num,
				listId:'execute_list'+rulePublic.num,
				scrollParentId:'execute_scroll_parent'+rulePublic.num,
				scrollId:'execute_scroll_son'+rulePublic.num,
				dataIndex:opt.dataIndex
			})	
			
			
		}	
	}

};
//生成运算逻辑-下拉菜单
rulePublic.downMenu = function(opt){
	if(rulePublic.onOff){
		$('body').append(`<ul class="down_menu_list body_menu_list"></ul>`);
	}
	//菜单数据
	var data = rulePublic.data[opt.parentDataId].list[opt.dataTip].data[opt.dataValue].data;
	$('.body_menu_list').html('');
	for(var i=0;i<data.length;i++){
		$('.body_menu_list').append(`
			<li data-id="${i}" data-code="${data[i].code}"><a href="javaScript:;">${data[i].name}</a></li>
		`);
	}
	if($('.body_menu_list li').size()>5){
		$('.body_menu_list').css('max-height','160px');
	}else{
		$('.body_menu_list').css('max-height','auto');
	}
	
	var listIndex = $(opt.This).find('input').val();
	$('.body_menu_list li').eq(listIndex).attr('class','active');
	rulePublic.downMenuLocation(opt); //生成下拉菜单-位置
	$('.body_menu_list').show();
	//下拉框内容点击操作
	$('.body_menu_list li').off('click').on('click',function(){
		$(opt.This).find('span').html($(this).find('a').html());
		$(opt.This).find('input').val($(this).attr('data-id'));
        $(opt.This).find('input').attr("data-code",$(this).attr('data-code'));
		$('.down_menu_btn').attr('data-id',0);
	});
	$(document).click(function(){
		$('.body_menu_list').remove();
		$('.body_menu_list1').remove();
		$('.down_menu_btn').removeClass('curr');
		$('.down_menu_btn').attr('data-id',0);
		rulePublic.onOff = true;
	});
};
//生成下拉菜单-位置
rulePublic.downMenuLocation = function(opt){
	$(opt.oSclass).css('top',opt.top);
	$(opt.oSclass).css('left',opt.left);
};
//生成选框模式-字段
rulePublic.executeSetup = function(opt){
	//执行设置-字段下拉菜单
	$('.execute_down_box .down_menu_btn').off('click').on('click',function(ev){
		var dataId = $(this).attr('data-id');
		var dataValue = $(this).parent().parent().parent().attr('data-value');
		var parentDataId = $(this).parent().attr('data-id');
		var parentId = $(this).parent().parent().parent().attr('id');
		var parentsDataId = $(this).parent().parent().parent().parent().parent().attr('data-id');
		if($(this).attr('data-index')){
			var dataIndex = $(this).attr('data-index');
		}
		if(dataValue==0){
			if(dataId==0){
				$('.down_menu_btn').removeClass('curr');
				$('.down_menu_btn').attr('data-id',0);
				$(this).addClass('curr');
				$('.body_menu_list1').remove();
				$('.select_rule_list').slideUp(200);
				rulePublic.onOff2 = true;
				if($('.body_menu_list').css('display')=='block'){
					rulePublic.onOff1 = false;
				}
				rulePublic.downMenu1({
					id:parentId,
					This:$(this),
					oSclass:'.body_menu_list',
					parentDataId:parentDataId,
					parentsDataId:parentsDataId,
					dataIndex:dataIndex,
					top:$(this).offset().top+31,
					left:$(this).offset().left
				});	
				$(this).attr('data-id',1);
			}else{
				$(this).removeClass('curr');
				$('.body_menu_list').remove();
				$(this).attr('data-id',0);
				rulePublic.onOff1 = true;
			}	
		}
		ev.stopPropagation();
	});
	//执行设置-条件判断下拉菜单
	$('.execute_down_box1 .down_menu_btn').off('click').on('click',function(ev){
		var dataId = $(this).attr('data-id');
		if($(this).find('input').val()){
			var dataValue = $(this).find('input').val();
		}
		if(dataId==0){
			$('.down_menu_btn').removeClass('curr');
			$('.down_menu_btn').attr('data-id',0);
			$(this).addClass('curr');
			$('.body_menu_list').remove();
			$('.select_rule_list').slideUp(200);
			rulePublic.onOff = true;
			rulePublic.onOff1 = true;
			if($('.body_menu_list1').css('display')=='block'){
				rulePublic.onOff2 = false;
			}
			rulePublic.downMenu2({
				This:$(this),
				oSclass:'.body_menu_list1',
				dataValue:dataValue,
				top:$(this).offset().top+31,
				left:$(this).offset().left
			});
			$(this).attr('data-id',1);
		}else{
			$(this).removeClass('curr');
			var This = this;
			$('.body_menu_list1').remove();
			$(This).attr('data-id',0);
			rulePublic.onOff2 = true;
		}
		ev.stopPropagation();
	});
	//执行设置-选框模式
	var index = 0;
	var startNum = 0;
	var endNum1 = 0;
	var endNum = 0;
	var oValue = 0;
	var onOff = true;
	var onOff1 = false;
	var strNum =0;
	var oLeft =0;
	
	var aWidth = 0;
	var aLeft = 0;
	var aTop = 0;
	var countNum = 1;
	var arrNum = [];
	var bool = true;
	$('#'+opt.listId).find('.execute_tem_box').off('click').on('click',function(){
		var oClass = $(this).parent().hasClass('execute_active');
		if(!oClass){
			var dataId = $(this).attr('data-id');
			oLeft = $(this).parent().position().left;
			$(this).parent().addClass('execute_active');
			if(dataId==0){
				onOff = false;
				endNum = parseInt($(this).parent().attr('data-value'));
				index = oLeft;
				$('#'+opt.parentId).find('.create_order').show();
				$('#'+opt.parentId).find('.create_order').html('生成顺序'+countNum);
				$('#'+opt.parentId).find('.create_order').css('left',oLeft);
				startNum = parseInt($(this).parent().attr('data-value'));
				for(var i=0;i<$('#'+opt.listId).find('.execute_tem_box').size();i++){
					if($('#'+opt.listId).find('.execute_tem_box').eq(i).attr('data-id')==2){
						$('#'+opt.listId).find('.execute_tem_box').eq(i).attr('data-id',2);
					}else{
						$('#'+opt.listId).find('.execute_tem_box').eq(i).attr('data-id',1);
					}
				}
			}else if(dataId==1){
				endNum1 = parseInt($(this).parent().attr('data-value'));
				$('#'+opt.parentId).find('.create_order').html('生成顺序'+countNum);
				if(oLeft>index){
					for(var i=startNum;i<=endNum1;i++){
						$('#'+opt.listId).find('.execute_common').eq(i).addClass('execute_active');	
					}
					$('#'+opt.parentId).find('.create_order').show();
					$('#'+opt.parentId).find('.create_order').css('left',oLeft);
				}else{
					endNum = parseInt($(this).parent().attr('data-value'));
					for(var i=endNum;i<startNum;i++){
						$('#'+opt.listId).find('.execute_common').eq(i).addClass('execute_active');	
					}
					$('#'+opt.parentId).find('.create_order').show();
				}
			}else if(dataId==2){
				oValue = $(this).attr('data-value');
				var h = parseInt($('#'+opt.parentId).find('.pattern_line').eq(oValue).attr('data-start'));
				var f = parseInt($('#'+opt.parentId).find('.pattern_line').eq(oValue).attr('data-end'));
				for(var i=0;i<$('#'+opt.listId).find('.execute_tem_box').size();i++){
					if($('#'+opt.listId).find('.execute_tem_box').eq(i).attr('data-id')==2){
						$('#'+opt.listId).find('.execute_tem_box').eq(i).attr('data-id',2);
					}else{
						$('#'+opt.listId).find('.execute_tem_box').eq(i).attr('data-id',1);
					}
				}
				if(h==f && h==0){
					$('#'+opt.listId).find('.execute_common').eq(h).addClass('execute_active');
				}else if(h==f && h==$('#'+opt.listId).find('.execute_common').size()){
					for(var i=h;i<=f;i++){
						$('#'+opt.listId).find('.execute_common').eq(i).addClass('execute_active');	
					}
				}else{
					for(var i=h;i<=f;i++){
						$('#'+opt.listId).find('.execute_common').eq(i).addClass('execute_active');	
					}	
				}
				startNum = h;
				oLeft = $(this).parent().position().left;
				if(onOff){
					strNum = h;
					endNum = f;
					index = oLeft;
				}
				if(onOff1){
					$('#'+opt.parentId).find('.create_order').show();
					$('#'+opt.parentId).find('.create_order').html('生成顺序'+countNum);
				}
				if(oLeft>index){
					for(var i=strNum;i<=f;i++){
						$('#'+opt.listId).find('.execute_common').eq(i).addClass('execute_active');	
					}
					$('#'+opt.parentId).find('.create_order').css('left',$('#'+opt.parentId).find('.execute_common').eq(f).position().left);
				}else{
					for(var i=h;i<endNum;i++){
						$('#'+opt.listId).find('.execute_common').eq(i).addClass('execute_active');	
					}
					$('#'+opt.parentId).find('.create_order').css('left',$('#'+opt.parentId).find('.execute_common').eq(endNum).position().left);
				}

				
				onOff = false;
				onOff1 = true;
				
			}

			
			
		}

	});
	//生成顺序点击
	$('#'+opt.parentId).find('.create_order').off('click').on('click',function(){
		aWidth = 0;
		arrNum = [];
		if(bool){
			for(var i=0;i<$('#'+opt.listId).find('.execute_fields').size();i++){
				if($('#'+opt.listId).find('.execute_fields').eq(i).hasClass('execute_active')){
					$('#'+opt.listId).find('.execute_tem_box').eq(i).attr('data-id',2);
					$('#'+opt.listId).find('.execute_tem_box').eq(i).attr('data-value',countNum-1);
				}else{
					$('#'+opt.listId).find('.execute_tem_box').eq(i).attr('data-id',0);
				}
			}	
		}else{
			for(var i=0;i<$('#'+opt.listId).find('.execute_fields').size();i++){
				if($('#'+opt.listId).find('.execute_fields').eq(i).hasClass('execute_active')){
					$('#'+opt.listId).find('.execute_tem_box').eq(i).attr('data-value',countNum-1);
				}
				if($('#'+opt.listId).find('.execute_fields').eq(i).hasClass('execute_active') || $('#'+opt.listId).find('.execute_tem_box').eq(i).attr('data-id')==2){
					$('#'+opt.listId).find('.execute_tem_box').eq(i).attr('data-id',2);
				}else{
					$('#'+opt.listId).find('.execute_tem_box').eq(i).attr('data-id',0);
				}
			}
		}
		
		for(var i=0;i<$('#'+opt.listId).find('.execute_common').size();i++){
			if($('#'+opt.listId).find('.execute_common').eq(i).hasClass('execute_active')){
				arrNum.push(i);
				aWidth+=$('#'+opt.listId).find('.execute_common').eq(i).width();
				$('#'+opt.listId).find('.execute_common').eq(i).removeClass('execute_active');
			}
		}
		$(this).html('生成顺序'+countNum);
		$(this).hide();
		aLeft = $('#'+opt.listId).find('.execute_common').eq(arrNum[0]).position().left;
		if(bool){
			aTop +=60;
		}else{
			aTop+=30;
		}
		$('#'+opt.listId).append(`
			<div class="pattern_line" data-start="${arrNum[0]}" data-end="${arrNum[arrNum.length-1]}" style="left:${aLeft}px;top:${aTop}px;">
				<strong>${countNum}</strong>
				<span style="width:${aWidth-26}px;"></span>
			</div>
		`)
		if(bool){
			$('#'+opt.parentId).height($('#'+opt.parentId).height()+16);
			$('#'+opt.id).height($('#'+opt.id).height()+16);	
		}else{
			$('#'+opt.parentId).height($('#'+opt.parentId).height()+30);
			$('#'+opt.id).height($('#'+opt.id).height()+30);
		}
		//画线hover对应顺序
//		rulePublic.lineHover({
//			listId:opt.listId,
//		})
		countNum++;
		bool = false;
		onOff = true;
		onOff1 = false;
	})
	
	
	
		
};
//执行设置-生成字段下拉菜单
rulePublic.downMenu1 = function(opt){
	if(rulePublic.onOff1){
		$('body').append(`<ul class="down_menu_list body_menu_list"></ul>`);
	}
	//list内容生成
	$('.body_menu_list').html('');
	if(opt.parentsDataId==0){
		for(var i=0;i<rulePublic.arrText.length;i++){
			$('.body_menu_list').append(`<li data-index="${rulePublic.arrText[i].index}" data-id="${rulePublic.arrText[i].value}"><a href="javaScript:;">${rulePublic.arrText[i].name}</a></li>`)	
		}	
	}else{
		for(var i=0;i<rulePublic.arrData1.length;i++){
			$('.body_menu_list').append(`<li data-index="${rulePublic.arrData1[i].index}" data-id="${rulePublic.arrData1[i].value}"><a href="javaScript:;">${rulePublic.arrData1[i].name}</a></li>`)	
		}
	}
	if($('.body_menu_list li').size()>5){
		$('.body_menu_list').css('max-height','160px');
	}else{
		$('.body_menu_list').css('max-height','auto');
	}
	rulePublic.downMenuLocation(opt); //下拉菜单位置
	//点击重置数组以及重新生成列表
	$('.body_menu_list li').off('click').on('click',function(){

		if(opt.parentsDataId==0){
			rulePublic.arrData1 = [];
			rulePublic.arrData1 = rulePublic.arrData1.concat(rulePublic.arrText);	
		}
		if($(opt.This).find('span').html()=='请选择字段'){
			rulePublic.arrData1.splice($(this).index(),1);
		}else{
			rulePublic.arrData1.splice($(this).index(),1,rulePublic.arrText[opt.dataIndex]);
		}
		if(rulePublic.arrData1.length==0){
			$('#'+opt.id).attr('data-value',1);
			$(opt.This).parent().parent().parent().parent().parent().parent().find('.checkbox_error').hide();
		}
		$('#'+opt.id).find('.execute_fields').eq(opt.parentDataId).find('.down_menu_btn').attr('data-index',$(this).attr('data-index'));
		$('#'+opt.id).find('.execute_fields').eq(opt.parentDataId).find('span').html($(this).find('a').html());
		$('#'+opt.id).find('.execute_fields').eq(opt.parentDataId).find('span').removeClass('menu_title_color');
		$('#'+opt.id).find('.execute_fields').eq(opt.parentDataId).find('input').val($(this).attr('data-id'));
		$('#'+opt.id).parent().parent().attr('data-id',1);
		$('.down_menu_btn').attr('data-id',0);
        $('#'+opt.id).find('.execute_fields').eq(opt.parentDataId).find(".menu_template_box").removeClass("execute_active1");
        $('#'+opt.id).find('.execute_fields').eq(opt.parentDataId).find(".execute_error").hide();

	})
	
	$('.body_menu_list').slideDown(200);
	$(document).click(function(){
		$('.body_menu_list').slideUp(200);
		$('.execute_down_box .down_menu_btn').removeClass('curr');
		$('.body_menu_list').remove();
		$('.body_menu_list1').remove();
		$('.down_menu_btn').attr('data-id',0);
		rulePublic.onOff1 = true;
	});
};
//执行设置-条件下拉菜单
rulePublic.downMenu2 = function(opt){
	if(rulePublic.onOff2){
		$('body').append(`
			<ul class="down_menu_list body_menu_list1">
				<li data-id="0" class="active">
					<a href="javaScript:;">add</a>
				</li>
				<li data-id="1">
					<a href="javaScript:;">or</a>
				</li>
			</ul>`
		);	
	}
	rulePublic.downMenuLocation(opt); //下拉菜单位置
	$('.body_menu_list1').show();
	$('.body_menu_list1 li').removeClass('active');
	$('.body_menu_list1 li').eq(opt.dataValue).addClass('active');
	//点击列表设置
	$('.body_menu_list1 li').off('click').on('click',function(){
		$(opt.This).find('span').html($(this).find('a').html());
		$(opt.This).find('input').val($(this).index());
	})

	$(document).click(function(){
		$('.down_menu_btn').removeClass('curr');
		$('.body_menu_list').remove();
		$('.body_menu_list1').remove();
		$('.down_menu_btn').attr('data-id',0);
		rulePublic.onOff2 = true;
	});
};
//画线hover对应顺序
rulePublic.lineHover = function(opt){
	$('#'+opt.listId).find('.pattern_line').hover(function(){
		$('#'+opt.listId).find('.execute_common').removeClass('execute_active');
		var s = parseInt($(this).attr('data-start'));
		var e = parseInt($(this).attr('data-end'));
		for(var i=s;i<=e;i++){
			$('#'+opt.listId).find('.execute_common').eq(i).addClass('execute_active');
		}
		$('#'+opt.parentId).find('.create_order').hide();
		bool = false;
		onOff = true;
		onOff1 = false;
	},function(){
		var s = parseInt($(this).attr('data-start'));
		var e = parseInt($(this).attr('data-end'));
		for(var i=s;i<=e;i++){
			$('#'+opt.listId).find('.execute_common').eq(i).removeClass('execute_active');
		}
	})
};
//生成全部数据
rulePublic.createAllData = function(opt){

	for(var i=0;i<opt.data;i++){
        var showData=null;
        var indexDictionary=0;
		if(opt.isShowAll){
        	indexDictionary=i;
            showData=rulePublic.data[i];
		}else{
            for(var z=0;z<rulePublic.arrData.length;z++){
                if(rulePublic.arrData[z].uid==rulePublic.hasSelected[i]){
                    indexDictionary=z;
                    showData=rulePublic.arrData[z];
                    rulePublic.arrData.splice(z,1).sort();
                    break;
                }
            }
		}
		//生成选择规则
		$('.ruleConfig_parent').append(`
			<div class="ruleConfig_box">
				<div class="ruleConfig_menu clear">
					<strong class="fl">选择规则：</strong>
					<div class="menu_template_box select_rule fl" data-id="${showData.index}">
						<div class="down_menu_btn select_rule_btn" data-id="0">
							<span>${showData.name}</span>
							<input type="hidden" value="${showData.uid}">
						</div>
						<ul class="select_rule_list"></ul>
					</div>
				</div>
				<div class="ruleConfig_menu clear">
					<strong class="fl">权重系数：</strong>
					<input class="weight" type="text" placeholder="请输入" value="${showData.weights}"  name="weight" id="weight_${rulePublic.index++}">
					<p class="fields_error">输入错误</p>
					<em>(%)</em>
				</div>
				<div class="logic_addBtn logic_addBtn_position">
					<a href="javaScript:;" class="logic_addBtn_left fl" data-id="0" onclick="rulePublic.addList($(this))">&#xe61f;</a>
					<a href="javaScript:;" class="logic_addBtn_right fr" data-id="1" onclick="rulePublic.addList($(this))">&#xe61d;</a>
				</div>
			</div>
		`);
		//生成字段列表
		var str = '';
		var oSclass = '';
		var str1 = '';
		for(var j=0;j<showData.list.length;j++){
			rulePublic.num++;
			if(j==0){
				oSclass = 'ruleConfig_fields1';
				str1 = '<a href="javaScript:;" class="logic_addBtn_left fl" data-id="0" onclick="rulePublic.addList1($(this))">&#xe61f;</a>';
			}else{
				oSclass = ''
				str1 = `<a href="javaScript:;" class="logic_addBtn_left fl" data-id="0" onclick="rulePublic.addList1($(this))">&#xe61f;</a>
				<a href="javaScript:;" class="logic_addBtn_right fr" data-id="1" onclick="rulePublic.addList1($(this))">&#xe61d;</a>`;
			}
			$('.ruleConfig_box').eq(i).append(`
				<div class="ruleConfig_fields ${oSclass}">
					<div class="ruleConfig_fields_son">
						<div class="operation_setUp">
							<div class="operation_setUp_title">
								<!--<form>-->
									<table class="setUp_title_tab">
										<thead>
											<tr>
												<th class="setUp_title_tab_th1">字段名称</th>
												<th class="setUp_title_tab_th2">字段类型</th>
												<th class="setUp_title_tab_th3">运算逻辑</th>
												<th class="setUp_title_tab_th4">分值</th>
											</tr>
										</thead>
									</table>
								<!--</form>-->
							</div>
							<div class="operation_setUp_content" id="operation_setUp_content${rulePublic.num}">
								<div class="operation_overflow">
									<!--<form>-->
										<table class="setUp_content_tab" id="setUp_content_tab${rulePublic.num}">
											<tbody></tbody>
										</table>
									<!--</form>-->
								</div>
							</div>
						</div>
						<div class="logic_addBtn logic_addBtn_position">${str1}</div>
					</div>
			`);
			var list = showData.list;
			for(var k=0;k<list[j].data.length;k++){
				if(list[j].data[k].type == 5){
					str = `<div class="setUp_type1">
								<strong class="set_fields_s fl">${list[j].data[k].logic}</strong>
								<div class="setUp_text setUp_text1 fl">
									<input type="text" placeholder="请输入" value="${list[j].data[k].value}" name="include_text" id="include_text_${rulePublic.index++}">
									<i class="setUp_error">输入错误</i>
								</div>
							</div>`
				}else if(list[j].data[k].type == 1){
					str = `<div class="setUp_type2">
								<div class="setUp_text fl">
									<input type="text" class="setUp_text_input" placeholder="请输入" value="${list[j].data[k].value1}" name="number" id="number_${rulePublic.index++}">
									<span>(含)</span>
									<strong>-</strong>
									<i class="setUp_error">输入错误</i>
								</div>
								<div class="setUp_text fl">
									<input type="text" class="setUp_text_input" placeholder="请输入" value="${list[j].data[k].value2}" name="number" id="number_${rulePublic.index++}">
									<span>(不含)</span>
									<i class="setUp_error">输入错误</i>
								</div>
							</div>`
				}else if(list[j].data[k].type == 2){
                    str = `<div class="setUp_type2">
								<div class="setUp_text fl">
									<input type="text" class="setUp_text_input" placeholder="请输入" value="${list[j].data[k].value1}" name="double" id="double_${rulePublic.index++}">
									<span>(含)</span>
									<strong>-</strong>
									<i class="setUp_error">输入错误</i>
								</div>
								<div class="setUp_text fl">
									<input type="text" class="setUp_text_input" placeholder="请输入" value="${list[j].data[k].value2}" name="double" id="double_${rulePublic.index++}">
									<span>(不含)</span>
									<i class="setUp_error">输入错误</i>
								</div>
							</div>`
				}else if(list[j].data[k].type == 4){
					str = `<div class="setUp_type1">
								<strong class="set_fields_s fl">${list[j].data[k].logic}</strong>
								<div class="menu_template_box logic_template_box fl">
									<div class="down_menu_btn down_btn2" data-id="0" data-tip1="${indexDictionary}" data-tip="${j}" data-value="${k}">
										<span>${list[j].data[k].value}</span>
										<input type="hidden" value="${list[j].data[k].valueIndex}" data-code="${list[j].data[k].valueCode}">
									</div>
								</div>
							</div>`
					
				}
				$('#setUp_content_tab'+rulePublic.num).find('tbody').append(`
					<tr data-type="${list[j].data[k].type}" data-name="${list[j].data[k].name}" data-id="${list[j].data[k].id}"  data-logicType="${list[j].data[k].logicType}">
						<td class="setUp_content_tab_td1">${list[j].data[k].name}</td>
						<td class="setUp_content_tab_td2">${list[j].data[k].textType}</td>
						<td class="setUp_content_tab_td3">${str}</td>
						<td></td>
					</tr>
				`);
			}
			//分值
			$('#setUp_content_tab'+rulePublic.num).find('tbody tr:eq(0) td:eq(3)').append(`
				<div class="setUp_text fl">
					<input class="logicScore" type="text" placeholder="请输入" value="${showData.list[j].score==null?'':showData.list[j].score}" name="score" id="score_${rulePublic.index++}">
					<i class="setUp_error">输入错误</i>
				</div>
			`);
			//长度大于5显示滚动条
			if($('#setUp_content_tab'+rulePublic.num).find('tbody tr').size()>5){
				$('#operation_setUp_content'+rulePublic.num).append(`
					<div class="scroll_parent setUp_scroll_parent" id="scroll_parent${rulePublic.num}">
						<div class="scroll_son" id="scroll_son${rulePublic.num}"></div>
					</div>
				`)
				//滚动条滚动
				aide.scroll({
					parentId:'operation_setUp_content'+rulePublic.num,
					listId:'setUp_content_tab'+rulePublic.num,
					scrollParentId:'scroll_parent'+rulePublic.num,
					scrollId:'scroll_son'+rulePublic.num,
				})
			}else{
				var iH = $('#setUp_content_tab'+rulePublic.num).find('tbody tr').height()*$('#setUp_content_tab'+rulePublic.num).find('tbody tr').size();
				$('#operation_setUp_content'+rulePublic.num).find('.operation_overflow').css('height',iH);
				
			};
		}
		//其他情况
		$('.ruleConfig_box').eq(i).append(`
			<div class="ruleConfig_fields_other">
				<span class="fl">其他情况分值：</span>
				<div class="setUp_text fl">
					<input type="text" placeholder="请输入" value="${showData.score==null?'':showData.score}" name="score" id="score_${rulePublic.index++}">
					<i class="setUp_error">输入错误</i>
				</div>
			</div>
		`);
		//生成字段
		for(var j=0;j<showData.list1.length;j++){
			if(showData.list1[j].data){
				rulePublic.num++;
				$('.ruleConfig_box').eq(i).find('.ruleConfig_fields_son').eq(j).append(`
					<div class="rule_order_box">
						<div class="reset_parent">
							<a href="javaScript:;" class="reset_btn" data-id="${rulePublic.num}" onclick="rulePublic.resetBtn($(this))">重置</a>
						</div>
						<div class="checkbox_mode">
							<strong class="checkbox_mode_title fl">框选模式</strong>
							<div class="slide_btn">
								<strong data-id="0" onclick="rulePublic.setState1($(this))">
									<i>关</i>
									<span></span>
								</strong>
							</div>
							<p class="checkbox_error"></p>
						</div>
						<div class="execute_setUp_parent" id="execute_setUp_parent${rulePublic.num}" data-id="0">
							<div class="execute_mar clear" id="execute_setUp_box${rulePublic.num}">
								<div class="execute_setUp_box" id="execute_list${rulePublic.num}" data-value="0">
									<a href="javaScript:;" class="create_order"></a>
								</div>
							</div>
						</div>	
					</div>
				`)
			}
			//生成执行设置字段
			var iW = $('.rule_order_box').width()-50;
			$('.execute_mar').width(iW);
			var str2 = '';
			for(var e=0;e<showData.list1[j].data.length;e++){
				if(showData.list1[j].data[e].type == 1){
					str2 = `<div class="execute_fields execute_common">
								<div class="menu_template_box execute_down_box " data-id="${e}">
									<div class="down_menu_btn" data-id="0">
										<span>${showData.list1[j].data[e].name}</span>
										<input type="hidden" value="${showData.list1[j].data[e].value}" name="logicSelect" id="logicSelect_${rulePublic.index++}">
									</div>
								</div>
								<div class="execute_tem_box" data-id="${showData.list1[j].data[e].state}"  data-value="${showData.list1[j].data[e].count}"></div>
								<p class="execute_error">错误提示</p>
							</div>`
				}else if(showData.list1[j].data[e].type == 2){
					str2 = `<div class="execute_if execute_common">
								<div class="menu_template_box execute_down_box1" data-id="${indexDictionary}">
									<div class="down_menu_btn" data-id="0">
										<span>${showData.list1[j].data[e].name}</span>
										<input type="hidden" value="${showData.list1[j].data[e].value}">
									</div>
								</div>
							</div>`
				}
				$('#execute_list'+rulePublic.num).append(str2);
			}
			var fieldsW = 0;
			var fieldsW1 = $('#execute_list'+rulePublic.num).find('.execute_fields').outerWidth()*Math.ceil(showData.list1[j].data.length/2);
			var fieldsW2 = $('#execute_list'+rulePublic.num).find('.execute_if').width()*Math.floor(showData.list1[j].data.length/2);
			if($('#execute_list'+rulePublic.num).find('.execute_if').size()==0){
				fieldsW = fieldsW1;
			}else{
				fieldsW = fieldsW1+fieldsW2;
			}
			$('#execute_list'+rulePublic.num).width(fieldsW);
			$('#execute_list'+rulePublic.num).attr('data-value',1);
			//内容宽度大于父级宽度显示滚动条
			if(fieldsW>iW){
				$('#execute_setUp_parent'+rulePublic.num).append(`
					<div class="execute_scroll_parent" id="execute_scroll_parent${rulePublic.num}">
						<div class="execute_scroll_son" id="execute_scroll_son${rulePublic.num}"></div>
					</div>
				`)
				$('#execute_setUp_parent'+rulePublic.num).find('.execute_scroll_parent').width(iW);
				//滚动条滚动
				aide.scroll({
					parentId:'execute_setUp_box'+rulePublic.num,
					listId:'execute_list'+rulePublic.num,
					scrollParentId:'execute_scroll_parent'+rulePublic.num,
					scrollId:'execute_scroll_son'+rulePublic.num,
					onOff:true
				})
			}
			//生成线
			var line = showData.list1[j];
			$('#execute_setUp_parent'+rulePublic.num).height(line.parentH1);
			$('#execute_setUp_box'+rulePublic.num).height(line.parentH2);
			$('#execute_list'+rulePublic.num).find('.create_order').css('left',line.orderLeft+'px');
			$('#execute_list'+rulePublic.num).find('.create_order').html(line.order);
			var data1 = showData.list1[j].line;
			if(data1!=''){
				for(k in data1){
					$('#execute_list'+rulePublic.num).append(`
						<div class="pattern_line" data-start="${data1[k].start}" data-end="${data1[k].end}" style="left:${data1[k].left}px;top:${data1[k].top}px;">
							<strong>${parseInt(k)+1}</strong>
							<span style="width:${data1[k].width}px;"></span>
						</div>
					`)
				}
			}
			//生成选框模式-字段
			rulePublic.executeSetup({
				id:'execute_setUp_parent'+rulePublic.num,
				parentId:'execute_setUp_box'+rulePublic.num,
				listId:'execute_list'+rulePublic.num,
				scrollParentId:'execute_scroll_parent'+rulePublic.num,
				scrollId:'execute_scroll_son'+rulePublic.num,
				dataIndex:i
			})
			
		}
	}
	//运算逻辑-下拉菜单点击
	$('.down_btn2').off('click').on('click',function(ev){
		var dataId = $(this).attr('data-id');
		var dataValue = $(this).attr('data-value');
		var dataTip = $(this).attr('data-tip');
		var parentDataId = $(this).attr('data-tip1');
		
		if(dataId==0){
			if($('.body_menu_list').css('display')=='block'){
				rulePublic.onOff = false;
			}
			$('.down_menu_btn').removeClass('curr');
			$('.down_menu_btn').attr('data-id',0);
			$('.body_menu_list1').remove();
			$('.select_rule_list').slideUp(200);
			$(this).addClass('curr');
			$(this).attr('data-id',1);
			rulePublic.downMenu({ //生成运算逻辑-下拉菜单
				This:$(this),
				parentDataId:parentDataId,
				dataValue:dataValue,
				dataTip:dataTip,
				oSclass:'.body_menu_list',
				top:$(this).offset().top+31,
				left:$(this).offset().left
			});	
		}else{
			$(this).removeClass('curr');
			$(this).attr('data-id',0);
			$('.body_menu_list').remove();
			rulePublic.onOff = true;
		}	
		ev.stopPropagation();
	});
	//设置最外层-添加按钮
	$('.ruleConfig_box:eq(0)').find('.logic_addBtn:eq(0)').remove(); 
	$('.ruleConfig_box:eq(0)').append(`
		<div class="logic_addBtn logic_addBtn_position">
			<a href="javaScript:;" class="logic_addBtn_left fr" data-id="0" onclick="rulePublic.addList($(this))">&#xe61f;</a>
		</div>
	`)
}


//查询所有规则
rulePublic.findAllRule3_1=function (){
    $.ajax({
        url:sceneStep3GetSceneRulesDetail,
        type:"post",
        data:{
            "sceneId":id
        },
        async : false,
        success: function(result) {//回调函数，result，返回值
            console.log(JSON.stringify(result));
            rulePublic.data = conversionData(result);

        },
        error:function(){
            aide.alert("异常");
        }
    });
}

rulePublic.findExcuteRule=function (){
    $.ajax({
        url:sceneStep4GetExcuteRuleBySceneId,
        type:"post",
        data:{
            "sceneId":id
        },
        async : false,
        success: function(result) {//回调函数，result，返回值
            if(null != result && "" != result){
                rulePublic.hasSelected=result;
                rulePublic.createAllData({
                    data:rulePublic.hasSelected.length,
                    isShowAll:false
                });
                //设置全选按钮
				if(result.length==rulePublic.data.length){
                    $('.select_title a').addClass('active');
                    $('.select_title a').attr('data-id',1);
				}
            }

        },
        error:function(){
            aide.alert("异常");
        }
    });
}

rulePublic.save=function(){
	if($(".ruleConfig_box .ruleConfig_fields").length==0){
		aide.alert("请至少选择一条规则！")
		return;
	}
    if(!($("#form1").valid())){
        return;
    }
    var weightsMax = 0,weightsMin = 0;
	var param=[];
	$(".ruleConfig_box").each(function(index,item){
        var ruleWeightsRange = [];
		var rule={};
		rule.id=$(item).find(".ruleConfig_menu .menu_template_box .down_menu_btn input").val();
        rule.sceneId=id;
        rule.weights=$(item).find(".ruleConfig_menu .weight").val();
        //获取逻辑数据
		rule.logicString=[];
		$(item).find(".ruleConfig_fields").each(function(){

            var decision=$(this).find(".logicScore").val();
			var logic={};
            logic.atomList=[];
			//获取单个字段逻辑
			var fieldMap=new Map();
			$(this).find(".setUp_content_tab tr").each(function(){
				if($(this).attr("data-type")==1||$(this).attr("data-type")==2){
                    fieldMap[$(this).attr("data-id")]={
                    	"fieldId":$(this).attr("data-id"),
						"type":$(this).attr("data-logicType"),
						"dataValue":$(this).find(".setUp_content_tab_td3 .setUp_text_input").eq(0).val()+","+$(this).find(".setUp_content_tab_td3 .setUp_text_input").eq(1).val()
                    }
				}else if($(this).attr("data-type")==4){
                    fieldMap[$(this).attr("data-id")]={
                        "fieldId":$(this).attr("data-id"),
                        "type":$(this).attr("data-logicType"),
                        "dataValue":$(this).find(".setUp_content_tab_td3 .logic_template_box .down_menu_btn input").attr("data-code"),
                    }
				}else if($(this).attr("data-type")==5){
                    fieldMap[$(this).attr("data-id")]={
                        "fieldId":$(this).attr("data-id"),
                        "type":$(this).attr("data-logicType"),
                        "dataValue":$(this).find(".setUp_content_tab_td3 .setUp_text  input").val()
                    }
				}
			})
			//获取逻辑的执行顺序
			var tempData=[];
			var logicLine=[];
			var defaultOrder="";
			for(var i=0;i<$(this).find(".rule_order_box .execute_common").length;i++){
				var logicData=$(this).find(".rule_order_box .execute_common");
				if(i%2==0){
                    var logicField=fieldMap[$(logicData[i]).find(".down_menu_btn input").val()];
                    tempData.push(
                    	{'type':'1','index':i/2,'value':logicField.fieldId}
					);
					if(i+1<logicData.length){
						if($(logicData[i+1]).find(".down_menu_btn input").val()==0){
                            logicField.rela="6";
						}else if($(logicData[i+1]).find(".down_menu_btn input").val()==1){
                            logicField.rela="7";
						}
					}
                    logic.atomList.push(logicField);
				}else{
                    if($(logicData[i]).find(".down_menu_btn input").val()==0){
                        tempData.push(
                            {'type':'2','name':'and','value':'0'}
                        );
                    }else if($(logicData[i]).find(".down_menu_btn input").val()==1){
                        tempData.push(
                            {'type':'2','name':'or','value':'1'}
                        );
                    }
				}
			}
			$(this).find(".rule_order_box .pattern_line").each(function(){
                logicLine.push({
                    "start":$(this).attr("data-start"),
                    "end":$(this).attr("data-end"),
                    "left":$(this).css("left").toString().replace("px",""),
                    "top":$(this).css("top").toString().replace("px",""),
                    "width":$(this).children("span").css("width").toString().replace("px","")
                })
            })
            logic.logicLineList=logicLine;
            logic.priority=lineToLogicRelation(tempData,logicLine).join(",");
            logic.decisionList=[{
                "type":3,
                "value":decision
            }];
            rule.logicString.push(logic);
            ruleWeightsRange.push((parseInt(rule.weights) * parseInt(decision)) / parseInt(100));
		})
        //创建其他
        rule.logicString.push(
            {
                "atomList": [{
                "fieldId": "-1",
                "type": "9999",
                "dataValue": ""
            }],
                "decisionList": [{
                "type": 3,
                "value": $(this).find(".ruleConfig_fields_other .fl input").val()
            }],
                "priority": ""
            }
        )
        ruleWeightsRange.push((parseInt(rule.weights) * parseInt($(this).find(".ruleConfig_fields_other .fl input").val())) / parseInt(100));
        param.push(rule);
        weightsMax = (weightsMax * 100 +  Math.max.apply(null, ruleWeightsRange) * 100)/100;
        weightsMin = (weightsMin * 100 +  Math.min.apply(null, ruleWeightsRange) * 100)/100;
	})
    console.log(JSON.stringify(param));
    $.ajax({
        url:sceneStep3UpdateAtomAndDecision,
        type:"post",
        data:{"rules":JSON.stringify(param)},
        async : false,
        success: function(result) {//回调函数，result，返回值
            if(result != -1){
                rulePublic.updateDecision(weightsMin,weightsMax);
            }else{
                aide.alert("修改失败");
            }
        },
        error:function(){
            aide.alert("异常");
        }
    });
}

rulePublic.updateDecision=function (weightsMin,weightsMax){
    var url="";
    if(flag=="add"){
        url=sceneStep3SaveScoreDecision;
    }else{
        url=sceneStep3UpdateDecision;
    }
    $.ajax({
        url:url,
        type:"post",
        data:{"range":weightsMin + "," + weightsMax,
            "sceneId":id},
        async : false,
        success: function(result) {//回调函数，result，返回值
            if(result != -1){
                window.location.href = sceneStep3ToScoreDecisionConfig+"?id="+id+"&&flag="+flag;
            }else{
                aide.alert("修改失败");
            }
        },
        error:function(){
            aide.alert("异常");
        }
    });

}

/*
	 *初始化校验
	 */
rulePublic.initValidator=function (){
    //非负整数
    $.validator.addMethod("isNonNegativeInt",
        function(value, element) {
            if(null == value || "" == value){
                return true;
            }
            var reg = /^(0|[1-9]\d*)$/;
            if(reg.test(value)) return true;
            return false;
        },
        "请输入非负整数");
    //正整数
    $.validator.addMethod("isInt",
        function(value, element) {
            if(null == value || "" == value){
                return true;
            }
            var reg = /^[1-9]\d*$/;
            if(reg.test(value)) return true;
            return false;
        },
        "请输入正整数");
    //整数或者一位小数两位小数
    var a = true;
    $.validator.addMethod("isDecimal",
        function(value, element) {
            if(null == value || "" == value){
                return true;
            }
            var reg =/^[0-9]+(\.\d+)?$/;
            if(reg.test(value)) {
                a = false;
                return true;
            }
            return false;
        },
        "请输入整数或两位小数");
    $.validator.addMethod("isDouble",
        function(value, element) {
            if(null == value || "" == value){
                return true;
            }
            var reg = /^([0-9]\d*)(\.\d{1,2})?$/;
            if(reg.test(value)) return true;
            return false;
        },
        "请保留2位小数");
    $.validator.addMethod("isRang0_100",
        function(value, element) {
            if(null == value || "" == value){
                return true;
            }
            var reg = new RegExp("^(\\d|[1-9]\\d|100)$");
            if(reg.test(value)){
                return true;
            }
            return false;
        },
        "范围是0-100的整数");
    $.validator.addMethod("isLogicSelect",
        function(value, element) {
            if(null == value || "" == value){
                return false;
            }
            return true;
        },
        "请选择字段");
    $.validator.addMethod("isLessThanLeft",
        function(value, element) {
            if($(element).parent().nextAll("div").length==0){
                if(parseFloat(value)<=parseFloat($(element).parent().parent().find("input").eq(0).val())){
                    return false
                }
            }else{
                if(parseFloat(value)>=parseFloat($(element).parent().parent().find("input").eq(1).val())){
                    return false
                }
            }
            return true;
        },
        "运算逻辑左侧小于右侧");

    //初始化
    $("#form1").validate({
        onkeyup:false,
        rules: {
            logicSelect:{
                isLogicSelect:true
			},
            weight:{
                required : true,
				isRang0_100:true
			},
            include_text:{
                required : true
            },
            score:{
                required : true,
                isNonNegativeInt:true
            },
            number:{
                required : true,
                isNonNegativeInt:true,
                isLessThanLeft:true
            },
            double : {
                required : true,
                isDecimal:true,
                isDouble:true,
                isLessThanLeft:true
            }
        },
        messages:{
            weight:{
                required : "请输入配置"
            },
            include_text:{
                required : "请输入配置"
            },
            number:{
                required : "请输入配置"
            },
            score:{
                required : "请输入分值",
            },
            double : {
                required : "请输入分值",
            }
        },

        errorPlacement: function (error, element) {
            if ($(element).attr("name") == "logicSelect") {
                $(element).parents(".execute_fields").find(".execute_error").html(error).show();
            } else {
                $(element).parent().find(".setUp_error,.fields_error").html(error).show();
            }
        },
        highlight: function (element, errorClass, validClass) { // element出错时触发
            if ($(element).attr("name") == "logicSelect") {
                $(element).parents(".execute_fields").find(".menu_template_box").addClass("execute_active1");
            }
        },
        unhighlight: function (element, errorClass, validClass) {
            if ($(element).attr("name") == "logicSelect") {
                $(element).parents(".execute_fields").find(".menu_template_box").removeClass("execute_active1");
            }
        }
    });
}