//页面模块名称
var checkDecision = {};
checkDecision.type;
checkDecision.rulesList;
//初始化
checkDecision.init =function(){
	// 查询场景信息
   checkDecision.getSenceInfo();
    if (checkDecision.type == 1) {
        //策略-规则配置
        //checkDecision.ruleDeploy2();
        checkDecisionTree.init();
    }else {
        $(".tree_parent,.decision_pop").remove();
        //评分卡-规则配置
        checkDecision.ruleDeploy1();
	}
    //checkDecision.ruleDeploy2();

}
//初始化调用
$(document).ready(checkDecision.init);

// 查询场景信息
checkDecision.getSenceInfo = function () {
    var checkId = $("#checkId").val();

    $.ajax({
        url: getSenceInfo,
        type: "post",
        data: {
            "id": checkId
        },
        async: false,
        success: function (data) {//回调函数，result，返回值
            $("#senceNo").html(data.sceneNo);
            $("#senceName").html(data.name);
            var type = data.type;
            //场景类型 1：策略模式  2：评分卡
            if (type == 1) {
                $("#decisionType").html("策略模式");
                checkDecision.type = 1;
            }else if (type == 2) {
                $("#decisionType").html("评分卡");
                checkDecision.type = 2;
                checkDecision.rulesList = data.senceRulesVoList;
            }
            $("#decisionDescribe").html(aide.notNull(data.description));
            $("#creator").html(data.creator);
            $("#createTime").html(data.creatTime.substring(0, 19));
            $("#editor").html(data.editor);
            $("#editTime").html(data.editTime.substring(0, 19));

        },
        error: function () {
            aide.alert("异常");
        }
    });
}

//评分卡-规则配置
checkDecision.ruleDeploy1 = function(){
	$('#checkDecision_content').append(`
		<div class="checkRuleConfig_box1">
			<div class="ruleConfig_title">
				<form>
					<table class="ruleConfig_tab_title">
						<thead>
							<tr>
								<th class="table_td_w1">规则名称</th>
								<th>分数区间</th>
								<th>权重</th>
							</tr>
						</thead>
					</table>
				</form>
			</div>
			<div class="checkRule_parent" id="checkRule_parent">
				<form>
					<table class="checkRule_table_list" id="checkRule_table_list">
						<tbody></tbody>
					</table>
				</form>
			</div>
		</div>
	`)
	//规则列表数据以及长度
	var len = checkDecision.rulesList.length;
	for(var i=0;i<len;i++){
		var range = checkDecision.rulesList[i].ma + "-" + checkDecision.rulesList[i].mi;
		$('#checkRule_table_list tbody').append(`
			<tr>
				<td class="table_td_w1">`+ checkDecision.rulesList[i].ruleName +`</td>
				<td>`+ range +`</td>
				<td>`+ checkDecision.rulesList[i].weights + `%</td>
			</tr>
		`)
	}
	//显示滚动条
	if(len>7){
		$('#checkRule_parent').append(`
			<div class="scroll_parent decision_parent" id="scroll_parent">
				<div class="scroll_son" id="scroll_son"></div>
			</div>
		`)
		//滚动条滚动
		aide.scroll({
			parentId:'checkRule_parent',
			listId:'checkRule_table_list',
			scrollParentId:'scroll_parent',
			scrollId:'scroll_son'
		})
	}else{
		var iH = $('#checkRule_table_list').find('tbody tr').outerHeight()*$('#checkRule_table_list').find('tbody tr').size();
		$('#checkRule_parent').height(iH);
	}
};
//策略-规则配置
/*checkDecision.ruleDeploy2 = function(){
	$('#checkDecision_content').append(`
		<div class="checkRuleConfig_box2">
			<img src="../assets/image/upload/rule_img.png" alt="规则" id="rule_img"  />
		</div>
	`)
	//设置图片
	$('#rule_img').on('load',function(){
		checkDecision.AutoSizeImg({
			id:'rule_img',
			maxWidth:500,
			maxHeight:500
		})
	})
	//图片放大展示
	$('#rule_img').off('click').on('click',function(){
		aide.layerBlack();
		checkDecision.magnifyImgage();
	})
};
//图片放大展示弹窗
checkDecision.magnifyImgage = function(){
	$('body').append(`
		<div class="popup_box popup_img">
			<a href="javaScript:;"></a>
			<img src="../assets/image/upload/rule_img.png" alt="规则" id="rule_img1" />
		</div>
	`);
	$('#rule_img1').on('load',function(){
		var iw = $(window).width()-200;
		var ih = $(window).height()-200;
		$('.popup_img').show();
		$('.popup_img').css({
			'width':iw,
			'height':ih,
			'margin-left':-iw/2,
			'margin-top':-ih/2
		});
		$('.popup_img').animate({opacity:1},500);
		checkDecision.AutoSizeImg({
			id:'rule_img1',
			maxWidth:iw,
			maxHeight:ih
		})
		$('#rule_img1').css('margin-top',(ih-$('#rule_img1').height())/2);
	});
	$('.popup_img a').off('click').on('click',function(){
		aide.closeBlack('.popup_img');
	})
};
//图片比例设置
checkDecision.AutoSizeImg = function(opt){
	if(!opt.id) return false;
	var obj = document.getElementById(opt.id)
	var oImage = new Image();
	oImage.src = obj.src;
    oImage.onload = function () {
        if(oImage.width < opt.maxWidth && oImage.height < opt.maxHeight) {
            obj.width = oImage.width;
            obj.height = oImage.height;
        }else{
            if(opt.maxWidth / opt.maxHeight  <= oImage.width / oImage.height){
                obj.width = opt.maxWidth;
                obj.height = opt.maxWidth * (oImage.height / oImage.width);
            }else{
                obj.width = opt.maxHeight  * (oImage.width / oImage.height);
                obj.height = opt.maxHeight;
            }
        }
    }

};*/
















