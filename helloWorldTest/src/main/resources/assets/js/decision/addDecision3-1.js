//页面模块名称
var addDecision3 = {};

//初始化
addDecision3.init =function(){
	//页面默认内容
	if(rulePublic.hasSelected.length==0){
        addDecision3.defaultData();
	}else{
        //生成选择规则菜单
        rulePublic.createRuleList();
	}

    //lineToLogicRelation(data,line);
	//全部数据以及默认数据切换
	$('.select_title a').off('click').on('click',function(){
		var oDataId = $(this).attr('data-id');
		$('.ruleConfig_box').remove();
		if(oDataId==0){
			$(this).addClass('active');
			$(this).attr('data-id',1);
			rulePublic.arrData = [];
			rulePublic.num==0;
			//生成全部数据
			rulePublic.createAllData({
				data:rulePublic.data.length,
                isShowAll:true
			});
			//生成选择规则菜单
			rulePublic.createRuleList();
			
		}else if(oDataId==1){
			$(this).removeClass('active');
			$(this).attr('data-id',0);
			rulePublic.arrData = [];
			rulePublic.arrData = rulePublic.arrData.concat(rulePublic.data);
			//页面默认内容
			addDecision3.defaultData();
		}
	})
	
	
	
}
//初始化调用
$(document).ready(
    addDecision3.init
);
//页面默认内容
addDecision3.defaultData = function(){
	$('.ruleConfig_parent').append(rulePublic.htmlTemplate);
	$('.ruleConfig_box:eq(0)').append(`
		<div class="logic_addBtn logic_addBtn_position">
			<a href="javaScript:;" class="logic_addBtn_left fr" data-id="0" onclick="rulePublic.addList($(this))">&#xe61f;</a>
		</div>
	`)
	//生成选择规则菜单
	rulePublic.createRuleList();	
}














