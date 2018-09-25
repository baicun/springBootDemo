//命名空间
var rulePublic = {};
rulePublic.arrText = []; //确定选中后字段 数组
rulePublic.arrMenuText = []; //运算逻辑下拉菜单-数据
rulePublic.newDataArr = []; //运算逻辑下拉菜单-不为空的数据
rulePublic.arrData = [];  //执行设置下拉菜单-过滤数据
rulePublic.onOff = true; //运算逻辑下拉菜单-开关
rulePublic.onOff1 = true; //执行设置下拉菜单-开关
rulePublic.onOff2 = true; //执行设置判断下拉菜单-开关
rulePublic.num = 1; //计数
aide.onOff = true; //滚动条开关
rulePublic.index =0;//唯一标识下标
//初始化
rulePublic.init =function(){
//页面内容模版
rulePublic.htmlTemplate = `<div class="logic_set_list set_number">
	<h2 class="logic_title logic_title_active" data-id="0" onclick="rulePublic.logicTitle($(this))">逻辑1</h2>
	<div class="logic_content">
		<h3 class="logic_content_title logic_icon1">运算设置</h3>
		<div class="operation_setUp">
			<div class="operation_setUp_title">
				<!--<form>-->
					<table class="setUp_title_tab">
						<thead>
							<tr>
								<th class="setUp_title_tab_th1">字段名称</th>
								<th class="setUp_title_tab_th2">字段类型</th>
								<th class="setUp_title_tab_th3">运算逻辑</th>
							</tr>
						</thead>
					</table>
				<!--</form>-->
			</div>
			<div class="operation_setUp_content" id="operation_setUp_content1">
				<div class="operation_overflow">
					<!--<form>-->
						<table class="setUp_content_tab" id="setUp_content_tab1">
							<tbody></tbody>
						</table>
					<!--</form>-->
				</div>
			</div>
		</div>
		<h3 class="logic_content_title logic_content_padding1 logic_icon2">策略设置</h3>
		<div class="strategy_setUp clear">
			<strong class="fl">策略：</strong>
			<p class="strategy_setUp_btn fl" data-id="1">
				<a href="javaScript:;" data-id="1" class="active"><span>通过</span></a>
				<a href="javaScript:;" data-id="2"><span>拒绝</span></a>
				<a href="javaScript:;" data-id="3"><span>人工复核</span></a>
			</p>
		</div>
		<div class="strategy_setUp strategy_setUp1 clear">
			<strong class="fl">评分：</strong>
			<input type="text" placeholder="请输入" name="score" id="socre_${rulePublic.index++}"/>
			<!--<i class="error_tip">输入错误</i>-->
			<p class="fields_error strategy_error">输入错误</p>
		</div>
		<div class="reset_parent">
			<h3 class="logic_content_title logic_content_padding2 logic_icon3">执行设置</h3>
			<h4 class="logic_min_title">设置高级执行顺序：1、选择字段 2、打开框选模式 3、框选字段（以字段开头、以字段结尾）4、点击生成顺序</h4>
			<a href="javaScript:;" class="reset_btn" data-id="1" onclick="rulePublic.resetBtn($(this))">重置</a>
		</div>
		<div class="checkbox_mode">
			<strong class="checkbox_mode_title fl">框选模式</strong>
			<div class="slide_btn">
				<strong data-id="0" onclick="rulePublic.setState1($(this))">
					<i>关</i>
					<span></span>
				</strong>
			</div>
			<p class="checkbox_error">全部字段已选择完毕,才能打开选框模式。</p>
		</div>
		<div class="execute_setUp_parent" id="execute_setUp_parent1" data-id="0">
			<div class="execute_mar clear" id="execute_setUp_box1">
				<div class="execute_setUp_box" id="execute_list1" data-value="0">
					<a href="javaScript:;" class="create_order"></a>
				</div>
			</div>
		</div>
		<h3 class="logic_content_title logic_content_padding2 logic_icon4">终止执行设置</h3>
		<h4 class="logic_min_title">打开终止执行，则命中该条逻辑后，之后逻辑与规则将不再执行</h4>
		<div class="slide_btn" data-id="0">
			<strong data-id="0" onclick="rulePublic.setState($(this))">
				<i>关</i>
				<span></span>
			</strong>
		</div>
		<div class="logic_content_hide" onclick="rulePublic.logicHide($(this))">收起</div>
	</div>
</div>`;
rulePublic.htmlTemplate1 = `<div class="logic_set_list">
	<h2 class="logic_title logic_title_active" data-id="0" onclick="rulePublic.logicTitle($(this))">末尾逻辑-其他情况处理</h2>
	<div class="logic_content">
		<h3 class="logic_content_title logic_content_padding1 logic_icon2">策略设置</h3>
		<div class="strategy_setUp clear">
			<strong class="fl">策略：</strong>
			<p class="strategy_setUp_btn fl" data-id="1">
				<a href="javaScript:;" data-id="1" class="active"><span>通过</span></a>
				<a href="javaScript:;" data-id="2"><span>拒绝</span></a>
				<a href="javaScript:;" data-id="3"><span>人工复核</span></a>
			</p>
		</div>
		<div class="strategy_setUp strategy_setUp1 clear">
			<strong class="fl">评分：</strong>
			<input type="text" placeholder="请输入" name="score" id="socre_${rulePublic.index++}"/>
			<!--<i class="error_tip">输入错误</i>-->
			<p class="fields_error strategy_error">输入错误</p>
		</div>
		<h3 class="logic_content_title logic_content_padding2 logic_icon4">终止执行设置</h3>
		<h4 class="logic_min_title">打开终止执行，则命中该条逻辑后，之后逻辑与规则将不再执行</h4>
		<div class="slide_btn" data-id="0">
			<strong data-id="0" onclick="rulePublic.setState($(this))">
				<i>关</i>
				<span></span>
			</strong>
		</div>
		<div class="logic_content_hide" onclick="rulePublic.logicHide($(this))">收起</div>
	</div>
</div>`;
    //初始化校验
    rulePublic.initValidator();
}
//初始化调用
$(document).ready(rulePublic.init);
//生成初始化页面内容
rulePublic.ruleContent = function(){
	$('#no_info1').hide();
	$('#template_btn2').show();
	$('#login_set_parent').append(rulePublic.htmlTemplate+rulePublic.htmlTemplate1);
	$('.logic_set_list:eq(0)').append(`<div class="logic_addBtn logic_addBtn_position">
		<a href="javaScript:;" class="logic_addBtn_left fr" data-id="0" onclick="rulePublic.addList($(this))">&#xe61f;</a>
	</div>`);
	//运算设置
	rulePublic.operationSet({
		parentId:'operation_setUp_content1',
		listId:'setUp_content_tab1',
		scrollParentId:'scroll_parent1',
		scrollId:'scroll_son1'
	});
	rulePublic.strategySetup();//策略设置
	//执行设置-字段设置
	rulePublic.executeSetup({
		id:'execute_setUp_parent1',
		parentId:'execute_setUp_box1',
		listId:'execute_list1',
		scrollParentId:'execute_scroll_parent1',
		scrollId:'execute_scroll_son1'
	});
	
};
//展示选中字段
rulePublic.addFields = function(){
	$('.set_fields_text').html('');
	$('.set_fields_text').show();
	for(var i=0;i<rulePublic.arrText.length;i++){
		$('.set_fields_text').append(`<span>${rulePublic.arrText[i].name}</span>`);
	}
};
//添加或删除逻辑
rulePublic.addList = function(obj){
	var dataId = $(obj).attr('data-id');
	if(dataId==1){  //删除
		$(obj).parent().parent().remove();
		for(var i=0;i<$('.set_number').size();i++){
			$('.set_number .logic_title').eq(i).html('逻辑'+(i+1));
		}
	}else{ //添加
		rulePublic.num++;
		$(rulePublic.htmlTemplate).insertBefore($('.logic_set_list:last'));
		$('.set_number:last').append(`<div class="logic_addBtn logic_addBtn_position">
			<a href="javaScript:;" class="logic_addBtn_left fl" data-id="0" onclick="rulePublic.addList($(this))">&#xe61f;</a>
			<a href="javaScript:;" class="logic_addBtn_right fr" data-id="1" onclick="rulePublic.addList($(this))">&#xe61d;</a>
		</div>`);
		var sizeNum = $('.set_number').size();
		$('.set_number:last').find('.logic_title').html('逻辑'+sizeNum);
		$('.setUp_content_tab:last').attr('id','setUp_content_tab'+rulePublic.num);
		$('.operation_setUp_content:last').attr('id','operation_setUp_content'+rulePublic.num);
		$('#operation_setUp_content'+rulePublic.num).find('.setUp_scroll_parent').attr('id','scroll_parent'+rulePublic.num);
		$('#operation_setUp_content'+rulePublic.num).find('.scroll_son').attr('id','scroll_son'+rulePublic.num);
		//运算设置
		rulePublic.operationSet({
			parentId:'operation_setUp_content'+rulePublic.num,
			listId:'setUp_content_tab'+rulePublic.num,
			scrollParentId:'scroll_parent'+rulePublic.num,
			scrollId:'scroll_son'+rulePublic.num
		});
		rulePublic.strategySetup();//策略设置
		$('.execute_setUp_parent:last').attr('id','execute_setUp_parent'+rulePublic.num);
		$('#execute_setUp_parent'+rulePublic.num).find('.execute_setUp_box').attr('id','execute_list'+rulePublic.num);
		$('#execute_setUp_parent'+rulePublic.num).find('.execute_mar').attr('id','execute_setUp_box'+rulePublic.num);
		$('#execute_setUp_parent'+rulePublic.num).find('.execute_scroll_parent').attr('id','execute_scroll_parent'+rulePublic.num);
		$('#execute_setUp_parent'+rulePublic.num).find('.execute_scroll_son').attr('id','execute_scroll_son'+rulePublic.num);
		$('.reset_btn:last').attr('data-id',rulePublic.num);
        $('#operation_setUp_content'+rulePublic.num).parent().parent().find('.strategy_setUp1 input').eq(0).attr('id','score_'+rulePublic.index);
		//执行设置-字段设置
		rulePublic.executeSetup({
			id:'execute_setUp_parent'+rulePublic.num,
			parentId:'execute_setUp_box'+rulePublic.num,
			listId:'execute_list'+rulePublic.num,
			scrollParentId:'execute_scroll_parent'+rulePublic.num,
			scrollId:'execute_scroll_son'+rulePublic.num
		});
	}
	
};
//重置按钮
rulePublic.resetBtn = function(obj){
	var dataId = $(obj).attr('data-id');
	var oParent = $(obj).parent().parent();
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
	//执行设置-字段设置
	rulePublic.executeSetup({
		id:'execute_setUp_parent'+dataId,
		parentId:'execute_setUp_box'+dataId,
		listId:'execute_list'+dataId,
		scrollParentId:'execute_scroll_parent'+dataId,
		scrollId:'execute_scroll_son'+dataId
	});
}
//收起
rulePublic.logicHide = function(obj){
	$(obj).parent().slideUp(500);
	$(obj).parent().parent().find('.logic_title').delay(500).removeClass('logic_title_active');
	$(obj).parent().parent().find('.logic_title').delay(500).attr('data-id',1);
	$(obj).parent().parent().find('.logic_addBtn').delay(500).removeClass('logic_addBtn_position');
	$(obj).parent().parent().find('.logic_addBtn a:eq(0)').attr('class','logic_addBtn_left fl');
};
//逻辑标题展开收缩
rulePublic.logicTitle = function(obj){
	var dataId = $(obj).attr('data-id');
	if(dataId==0){		
		$(obj).removeClass('logic_title_active');
		$(obj).parent().find('.logic_addBtn').removeClass('logic_addBtn_position');
		$(obj).parent().find('.logic_addBtn a:eq(0)').attr('class','logic_addBtn_left fl');
		$(obj).delay(500).attr('data-id',1);
		$(obj).parent().find('.logic_content').slideUp(500);
	}else{
		$(obj).parent().find('.logic_content').slideDown(500);
		$(obj).addClass('logic_title_active');
		$(obj).parent().find('.logic_addBtn').addClass('logic_addBtn_position');
		if($(obj).html()=='逻辑1'){
			$(obj).parent().find('.logic_addBtn a:eq(0)').attr('class','logic_addBtn_left fr');	
		}
		$(obj).delay(500).attr('data-id',0);
	}
};
//终止执行设置-开关
rulePublic.setState = function(obj){
	var dataId = $(obj).attr('data-id');
	if(dataId==0){
		$(obj).find('span').animate({left:24},200,function(){
			$(obj).addClass('active');
			$(obj).find('i').html('开');
			$(obj).attr('data-id',1);
			$(obj).parent().attr('data-id',1);
		})
	}else{
		$(obj).find('span').animate({left:2},200,function(){
			$(obj).removeClass('active');
			$(obj).find('i').html('关');
			$(obj).attr('data-id',0);
			$(obj).parent().attr('data-id',0);
		})
	}
};
//策略设置
rulePublic.strategySetup = function(){
	$('.strategy_setUp_btn a').off('click').on('click',function(){
		$(this).parent().find('a').removeClass('active');
		$(this).parent().attr('data-id',$(this).attr('data-id'));
		$(this).addClass('active');
	})
};
//运算设置
rulePublic.operationSet = function(opt){
	//生成运算设置列表
	var str = '';
    rulePublic.newDataArr = [];
	for(var i=0;i<rulePublic.arrText.length;i++){
		if(rulePublic.arrText[i].type == 5){//文本
			str = `<div class="setUp_type1">
						<div class="menu_template_box logic_template_box fl">
							<div class="down_menu_btn down_btn1" data-id="0" data-type="1">
								<span></span>
								<input type="hidden" value="0">
							</div>
						</div>
						<div class="setUp_text fl">
							<input type="text" class="setUp_text_input" placeholder="请输入" name="include_text" id="include_text_${rulePublic.index++}" />
							<i class="setUp_error">输入错误</i>
						</div>
					</div>`
		}else if(rulePublic.arrText[i].type == 1){//整数或小数
			str = `<div class="setUp_type2">
						<div class="setUp_text fl">
							<input type="text" class="setUp_text_input" placeholder="请输入" name="number1" id="number_${rulePublic.index++}"/>
							<span>(含)</span>
							<strong>-</strong>
							<i class="setUp_error">输入错误</i>
						</div>
						<div class="setUp_text fl">
							<input type="text" class="setUp_text_input" placeholder="请输入" name="number2" id="number_${rulePublic.index++}"/>
							<span>(不含)</span>
							<i class="setUp_error">输入错误</i>
						</div>
					</div>`
		}else if(rulePublic.arrText[i].type == 2){
            str = `<div class="setUp_type2">
						<div class="setUp_text fl">
							<input type="text" class="setUp_text_input" placeholder="请输入" name="double1" id="double_${rulePublic.index++}"/>
							<span>(含)</span>
							<strong>-</strong>
							<i class="setUp_error">输入错误</i>
						</div>
						<div class="setUp_text fl">
							<input type="text" class="setUp_text_input" placeholder="请输入" name="double2" id="double_${rulePublic.index++}"/>
							<span>(不含)</span>
							<i class="setUp_error">输入错误</i>
						</div>
					</div>`
		}else if(rulePublic.arrText[i].type == 4){//字典
			str = `<div class="setUp_type3">
						<div class="menu_template_box logic_template_box fl">
							<div class="down_menu_btn down_btn1" data-id="0" data-type="2">
								<span></span>
								<input type="hidden" value="0">
							</div>
						</div>
						<div class="menu_template_box logic_template_box fl">
							<div class="down_menu_btn down_btn2" data-id="0" data-type="3">
								<span data-value=""></span>
								<input type="hidden" value="0">
							</div>
						</div>
					</div>`
		}
		$('#'+opt.listId).find('tbody').append(`
			<tr>
				<td class="setUp_content_tab_td1" data-id="${rulePublic.arrText[i].uid}">${rulePublic.arrText[i].name}</td>
				<td class="setUp_content_tab_td2" data-id="${rulePublic.arrText[i].type}">${rulePublic.arrText[i].typeName}</td>
				<td class="setUp_content_tab_td3">${str}</td>
			</tr>
		`)
	}
	//长度大于4显示滚动条
	if(rulePublic.arrText.length>4){
		$('#'+opt.parentId).append(`
			<div class="scroll_parent setUp_scroll_parent" id="${opt.scrollParentId}">
				<div class="scroll_son" id="${opt.scrollId}"></div>
			</div>
		`)
		//滚动条滚动
		aide.scroll({
			parentId:opt.parentId,
			listId:opt.listId,
			scrollParentId:opt.scrollParentId,
			scrollId:opt.scrollId
		})
	}else{
		var iH = ($('#'+opt.listId).find('tr').outerHeight()+1)*$('#'+opt.listId).find('tr').size();
		$('#'+opt.parentId).css('height',iH);
        $('#'+opt.parentId).find('.operation_overflow').css('height',iH);
	};
	//设置下拉菜单-对应index
	for(var i=0;i<$('#'+opt.listId).find('.logic_template_box').size();i++){
		$('#'+opt.listId).find('.logic_template_box').eq(i).attr('data-id',i);	
	}
	for(var i=0;i<$('#'+opt.listId).find('.down_btn2').size();i++){
		$('#'+opt.listId).find('.down_btn2').eq(i).attr('data-value',i);
	}
	//下拉菜单默认选中项
	for(var i=0;i<$('#'+opt.listId).find('.down_btn1').size();i++){
		var aDataType = $('#'+opt.listId).find('.down_btn1').eq(i).attr('data-type');
		var htmlStr = '';
		if(aDataType==1){
			htmlStr = '包含';
		}else if(aDataType==2){
			htmlStr = '等于';
		}
		$('#'+opt.listId).find('.down_btn1').eq(i).find('span').html(htmlStr);
	}
	for(var i=0;i<rulePublic.arrMenuText.length;i++){
		if(rulePublic.arrMenuText[i]!=''){
			rulePublic.newDataArr.push(rulePublic.arrMenuText[i])

		}
	}
    console.log("&&&"+JSON.stringify(rulePublic.newDataArr));
    console.log(rulePublic.newDataArr.length);
	for(var i=0;i<rulePublic.newDataArr.length;i++){
		console.log(rulePublic.newDataArr[i][0].name);
		$('#'+opt.listId).find('.down_btn2').eq(i).find('span').html(rulePublic.newDataArr[i][0].name);
        /*$('#'+opt.listId).find('.down_btn2').eq(i).find('span').attr("data-value",rulePublic.newDataArr[i][0].code);*/
        $('#'+opt.listId).find('.down_btn2').eq(i).find('input').val(rulePublic.newDataArr[i][0].code);
	}
	//下拉菜单点击
	$('#'+opt.listId).find('.down_menu_btn').off('click').on('click',function(ev){
		var parentDataId = $(this).parent().attr('data-id');
		var dataIds = $(this).attr('data-id');
		var dataType = $(this).attr('data-type');
		var dataValue = $(this).attr('data-value');
		$('.down_menu_btn').attr('data-id',0);
		$('.down_menu_btn').removeClass('curr');
		if(dataIds==0){
			if($('.body_menu_list').css('display')=='block'){
				rulePublic.onOff = false;
			}
			$('.body_menu_list1').remove();
			rulePublic.onOff2 = true;
			rulePublic.downMenu({ //生成运算逻辑-下拉菜单
				id:opt.listId,
				This:$(this),
				oSclass:'.body_menu_list',
				dataId:parentDataId,
				dataType:dataType,
				dataValue:dataValue,
				top:$(this).offset().top+31,
				left:$(this).offset().left
			});	
			$(this).addClass('curr');
			$(this).attr('data-id',1);
		}else{
			$('.body_menu_list').remove();
			$(this).removeClass('curr');
			$(this).attr('data-id',0);
			rulePublic.onOff = true;
		}
		
		ev.stopPropagation();
	})
		
}
//生成运算逻辑-下拉菜单
rulePublic.downMenu = function(opt){
	if(rulePublic.onOff){
		$('body').append(`<ul class="down_menu_list body_menu_list"></ul>`);
	}
	//菜单数据
	var str = '';
	if(opt.dataType==1){
        str =`<li data-id="0"><a href="javaScript:;">包含</a></li><li data-id="1"><a href="javaScript:;">不包含</a></li>`;
	}else if(opt.dataType==2){
		str =`<li data-id="0"><a href="javaScript:;">等于</a></li><li data-id="1"><a href="javaScript:;">不等于</a></li>`;
	}else if(opt.dataType==3){
		for(var j=0;j<rulePublic.newDataArr[opt.dataValue].length;j++){
			str+=`<li data-id="${rulePublic.newDataArr[opt.dataValue][j].code}"><a href="javaScript:;">${rulePublic.newDataArr[opt.dataValue][j].name}</a></li>`
		}

	}

    $('.body_menu_list').html('');
	$('.body_menu_list').append(str);
	if($('.body_menu_list li').size()>5){
		$('.body_menu_list').css('max-height','160px');
	}else{
		$('.body_menu_list').css('max-height','auto');
	}
	var listIndex = $('#'+opt.id).find('.down_menu_btn').eq(opt.dataId).find('input').val();
	$('.body_menu_list li').eq(listIndex).attr('class','active');
	rulePublic.downMenuLocation(opt); //生成下拉菜单-位置
	$('.body_menu_list').show();
	//下拉框内容点击操作
	$('.body_menu_list li').off('click').on('click',function(){
		$('#'+opt.id).find('.down_menu_btn').eq(opt.dataId).find('span').html($(this).find('a').html());
		$('#'+opt.id).find('.down_menu_btn').eq(opt.dataId).find('input').val($(this).attr('data-id'));
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
}
//执行设置-选框模式
rulePublic.setState1 = function(obj){
	var dataId = $(obj).attr('data-id');
	var oParent = $(obj).parent().parent().parent().parent();
	var oSize = $(oParent).find('.execute_fields .down_menu_btn span').size();
	var onOff = false;
	
	for(var i=0;i<oSize;i++){
		if($(oParent).find('.execute_fields .down_menu_btn span').eq(i).html()!='请选择字段'){
			if($(obj).parent().parent().parent().find('.pattern_line').size()!=0 || $(obj).parent().parent().parent().find('.create_order').html()=='生成顺序1'){
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
//执行设置-字段设置
rulePublic.executeSetup = function(opt){
	var iW = $('.execute_mar').width();
	$('.execute_mar').width(iW);
	//生成执行设置字段
	for(var i=0;i<rulePublic.arrText.length;i++){
		$('#'+opt.listId).append(`
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
	$('#'+opt.listId).find('.execute_if:last').remove();
	var fieldsW = 0;
	var fieldsW1 = $('.execute_fields').outerWidth()*rulePublic.arrText.length;
	var fieldsW2 = $('.execute_if').width()*(rulePublic.arrText.length-1);
	if($('.execute_if').size()==0){
		fieldsW = fieldsW1;
	}else{
		fieldsW = fieldsW1+fieldsW2;
	}
	$('.execute_setUp_box').width(fieldsW);
	//内容宽度大于父级宽度显示滚动条
	if(fieldsW>iW){
		$('#'+opt.id).append(`
			<div class="execute_scroll_parent" id="${opt.scrollParentId}">
				<div class="execute_scroll_son" id="${opt.scrollId}"></div>
			</div>
		`)
		$('.execute_scroll_parent').width(iW);
		//滚动条滚动
		aide.scroll({
			parentId:opt.parentId,
			listId:opt.listId,
			scrollParentId:opt.scrollParentId,
			scrollId:opt.scrollId,
			onOff:true
		})
	}
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
		bool = false;
		countNum++;
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
			$('.body_menu_list').append(`<li data-index="${rulePublic.arrText[i].index}" data-id="${rulePublic.arrText[i].uid}"><a href="javaScript:;">${rulePublic.arrText[i].name}</a></li>`)	
		}	
	}else{
		for(var i=0;i<rulePublic.arrData.length;i++){
			$('.body_menu_list').append(`<li data-index="${rulePublic.arrData[i].index}" data-id="${rulePublic.arrData[i].uid}"><a href="javaScript:;">${rulePublic.arrData[i].name}</a></li>`)	
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
			rulePublic.arrData = [];
			rulePublic.arrData = rulePublic.arrData.concat(rulePublic.arrText);	
		}
		if($(opt.This).find('span').html()=='请选择字段'){
			rulePublic.arrData.splice($(this).index(),1);
		}else{
			rulePublic.arrData.splice($(this).index(),1,rulePublic.arrText[opt.dataIndex]);
		}
		if(rulePublic.arrData.length==0){
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
					<a href="javaScript:;">and</a>
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
}



/*
    *初始化校验
    */
rulePublic.initValidator=function (){
    //规则名称唯一
    $.validator.addMethod("ruleNameOnly",
        function(value, element) {
            var onlyFlag = false;
            $.ajax({
                url:ruleCheckName,
                type:"post",
                data:{ "name":$("#ruleName").val()},
                async : false,
                success: function(data) {//回调函数，result，返回值
                    if(data == 0) onlyFlag = true;
                },
                error:function(){
                    aide.alert("异常");
                }
            });
            return onlyFlag;
        },
        "规则名称已存在");
    //规则编号唯一
    $.validator.addMethod("ruleNoOnly",
        function(value, element) {
            var onlyFlag = false;
            $.ajax({
                url:ruleCheckNo,
                type:"post",
                data:{ "no":$("#ruleNo").val()},
                async : false,
                success: function(data) {//回调函数，result，返回值
                    if(data == 0) onlyFlag = true;
                },
                error:function(){
                    aide.alert("异常");
                }
            });
            return onlyFlag;
        },
        "规则编号已存在");
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

    //编号只能包含字母和数字
    $.validator.addMethod("isOnlyLetterAndNum",
        function(value, element) {
            if(null == value || "" == value){
                return true;
            }
            var reg = /^[A-Za-z0-9]+$/;
            if(reg.test(value)) return true;
            return false;
        },
        "只能填写字母和数字");

    $.validator.addMethod("isLogicSelect",
        function(value, element) {
            if(null == value || "" == value){
                return false;
            }
            return true;
        },
        "请选择字段");

    $.validator.addMethod("isDouble",
        function(value, element) {
            if(null == value || "" == value){
                return true;
            }
            var reg = /^([0-9]\d*)(\.\d{1,4})?$/;
            if(reg.test(value)) return true;
            return false;
        },
        "请保留4位小数");

    $.validator.addMethod("isLessThanRight",
        function(value, element) {
            if(null == value || "" == value){
                return true;
            }
            var rightVal= $(element).parent().parent().find("div").eq(1).find("input").val();
            /*console.log("rightVal"+rightVal);*/
            if(value < rightVal ||rightVal==""){
            	/*console.log("已执行");*/
            	return true;
			}
            return false;
        },
        "运算逻辑左侧小于右侧");
    $.validator.addMethod("isLessThanLeft",
        function(value, element) {
            if(null == value || "" == value){
                return true;
            }
            var leftVal= $(element).parent().parent().find("div").eq(0).find("input").val();
            /*console.log("leftVal"+leftVal);*/
            if(value > leftVal||leftVal==""){
                /*console.log("已执行");*/
                return true;
            }
            return false;
        },
        "运算逻辑右侧大于左侧");

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
    //整数或者一位小数两位小数
    $.validator.addMethod("isIncSpace",
        function(value, element) {
            if(null == value || "" == value){
                return true;
            }
            var reg =/\s+/g;
            if(!reg.test(value)) {
                return true;
            }
            return false;
        },
        "不能包含空格");

    //初始化
    $("#form1").validate({
        onkeyup:false,
        rules: {
            ruleNo:{
                required : true,
                ruleNoOnly:true,
                isIncSpace:true,
                isOnlyLetterAndNum:true
            },
            ruleName:{
                required : true,
                ruleNameOnly:true,
                isIncSpace:true
            },
            /*description:{
                required : true,
            },*/
            include_text:{
                required : true,
                isIncSpace:true
            },
            score:{
                isNonNegativeInt:true
            },
            number1:{
                required : true,
                isNonNegativeInt:true,
                isLessThanRight:true
            },
            number2:{
                required : true,
                isNonNegativeInt:true,
                isLessThanLeft:true
            },
            logicSelect:{
                isLogicSelect:true
            },
            double1 : {
                required : true,
                isDecimal:true,
                isDouble:true,
                isLessThanRight:true
            },
            double2 : {
                required : true,
                isDecimal:true,
                isDouble:true,
                isLessThanLeft:true
            }
        },
        messages:{
            ruleNo:{
                required:"请输入规则编号",
            },
            ruleName:{
                required:"请输入规则名称"
            },
            /*description:{
                required:"请输入规则描述"
            },*/
            include_text:{
                required : "请输入配置"
            },
            double1:{
                required : "请输入配置"
            },
            double2:{
                required : "请输入配置"
            },
            number1:{
                required : "请输入配置"
            },
            number2:{
                required : "请输入配置"
            },
            score:{
                required : "请输入分值",
            },
        },
        errorPlacement: function (error, element) {
            if ($(element).attr("name") == "logicSelect") {
                $(element).parents(".execute_fields").find(".execute_error").html(error).show();
            } else {
                $(element).parent().find(".setUp_error,.fields_error,.error_tip").html(error).show();
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




