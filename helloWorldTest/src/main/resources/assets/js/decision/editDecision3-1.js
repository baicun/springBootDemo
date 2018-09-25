//页面模块名称
var editDecision3 = {};
//初始化
editDecision3.init =function(){
	//页面默认内容

    if(rulePublic.hasSelected.length==0){
        editDecision3.defaultData();
    }else{
        //生成选择规则菜单
        rulePublic.createRuleList();
	}
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
			//页面默认内容
			editDecision3.defaultData();
		}
	})
	
	
	
}
//初始化调用
$(document).ready(editDecision3.init);
//页面默认内容
editDecision3.defaultData = function(){
	rulePublic.arrData = [];
	rulePublic.arrData = rulePublic.arrData.concat(rulePublic.data);
	rulePublic.arrData.splice(0,1).sort();
	rulePublic.createAllData({
		data:1,
        isShowAll:true
	});
	//生成选择规则菜单
	rulePublic.createRuleList();	
}















