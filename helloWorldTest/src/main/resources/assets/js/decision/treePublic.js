//页面模块名称
var treePublic = {};
treePublic.saveResult=-1;
//初始化
treePublic.init =function(){
    //设置最外层高度
    $('#tree_box').height($('#body_content').height()-154);
    $('#tree_parent').height($('#body_content').height()-156);
    $('#tree_map_left').width($('#tree_parent').width()-266);
    $('.hasRuleMsg').height($('#body_content').height()-350);
    $('.noRuleMsg').height($('#body_content').height()-350);
    $(window).on('resize',function(){
        $('#tree_map_left').width($('#tree_parent').width()-266);
    })
    var iH = $('#tree_map_left').height();
    //选项卡组件
    aide.tabControl({
        id:'tree_tabControl',
        callBack:function(obj,index){
            $('.tabControl_box').hide();
            if(index==0){
                $('.tabControl_box').eq(index).show();
            }else if(index==1){
                $('.tabControl_box').eq(index).show();
            }
        }
    });
    //设置画布
    tree.init({
        id:'tree_map_son',
        color:'#fff',
        gridSize:12,
        width:'100%',
        height:iH
    });
};
//初始化调用
$(document).ready(treePublic.init);

//操作绝策树，需要操作的就把这引入
treePublic.decisionOperate = function () {
    //选择按钮
    $('.selection ul li').click(function (e) {
        var This = $(this);
        //先是当前选项
        if(tree.tempOperate && tree.tempOperate.attributes.type == 'examples.CustomLink'){
            This.toggleClass('selected');
            console.log(This);

            //如果现在点击的是全选选的话，选中时全部选中，取消选中时全部取消选中
            if(This.hasClass('all')){
                if(This.hasClass('selected')){
                    $('.selection ul li').addClass('selected');
                }else{
                    $('.selection ul li').removeClass('selected');
                }
            }
            //如果点击元素的兄弟节点除了全选都选中的话，全选也选中，如果有一个元素没选中，全选也不能选中
            if($('.selection ul li.all').nextAll('.selected').length == 3){
                $('.selection ul li.all').addClass('selected');
            }else{
                $('.selection ul li.all').removeClass('selected');
            }

            var tempOpt = [];
            if($('.selection .success').hasClass('selected')){
                //如果不是隐藏的，才可以
                if($('.selection .success').css('display')!= 'none'){
                    tempOpt.push('通过');
                }
            }
            if($('.selection .refuse').hasClass('selected')){
                if($('.selection .refuse').css('display')!= 'none'){
                    tempOpt.push('拒绝');
                }
            }
            if($('.selection .review').hasClass('selected')){
                if($('.selection .review').css('display')!= 'none'){
                    tempOpt.push('人工复核');
                }
            }

            tempOpt = tempOpt.join('');

            //改变线条
            tree.changeLink(tempOpt);
            e.stopPropagation();
        }
    });

    //点击这个时，清除很多内容
    $('body').click(function (e) {
        if(e.target.tagName == 'svg'){
            $('.selection ul li').removeClass('selected');
            $('.inputDropDownBox .menu').slideUp();
            $('.treeOperate').remove();
            $('.linkOperate').remove();
            tree.tempOperate = null;
            $('.hasRuleMsg').removeClass('active');
            $('.hasRuleMsg').empty();
            $('.noRuleMsg').addClass('active');
            $('.rule_edit .edit').removeClass('active');
        }
    });

    //鼠标点击缩放上的滑块时
    $('.slider').mousedown(function () {
        $('.treeOperate').remove();
        $('.linkOperate').remove();
        tree.tempOperate = null;
    });

    //提示框关闭
    $('body').on('click','.tree_map_left p.hint .close',function () {
        console.log('jhh');
        $('.tree_map_left p.hint').hide();
    });


    //下载图片
    $('.tree_map_left.fl .export').click(function(){
        if(treePublic.isDownLoadPNG()){
            saveSvgAsPng($('#tree_map_son').children('svg')[0], "diagram.png");
        }else{
            $('.tree_map_left .hint').show();
            $('.tree_map_left .hint .text').text('请完善规则');
        }
    });


    //拖拽画布
    treePublic.dragEle({
        dragEle: $('.tree_map_son'),
        dragWrap: $('.tree_map_paernt')
    });

    //缩放paper
    treePublic.zoom(function (num) {
        tree.paper.scale(1-num/2);
        tree.scale = 1-num/2;
    });

    //清空画布
    $('.tree_map_left>a.remove').click(function () {
        function emptyPicture(callback) {
            tree.cellMsg.forEach(function (value) {
                value.remove();
            });
            tree.dataCell = [];
            tree.removeCellMsg = [];
            tree.initCreate({
                left:$('.tree_map_paernt').width()/2 - 80,
                top:100,
                text:'请选择规则'
            });
            $('.treeOperate').remove();
            $('.linkOperate').remove();
            tree.tempOperate = null;
            callback();
        }
        //出来弹窗
        treePublic.zAlert('是否要清空画布',emptyPicture)
    });


    //下拉菜单动态改变菜单列表7
    // $('.down_menu_btn span').click(function () {
    //     //根据 tree.tempOperate 以及他的父节点，来判断下拉菜单需要什么内容
    //     //1.找到祖先节点的规则，2.和下拉菜单选项的每一项对比，相同的隐藏
    //     //先找到当前数据节点元素
    //     if(tree.tempOperate && tree.tempOperate.attributes.type == 'standard.Rectangle'){
    //         var curDataCell = null;
    //         tree.dataCell.forEach(function (value) {
    //             if(value.decisionID == tree.tempOperate.decisionID){
    //                 curDataCell = value;
    //             }
    //         });
    //         var hasRules = [];
    //         //利用回调函数遍历所有父节点
    //         function callback(cur) {
    //             cur.parentID.forEach(function (value) {
    //                 tree.dataCell.forEach(function (value2) {
    //                     if(value2.decisionID == value){
    //                         hasRules.push(value2.text);
    //                         callback(value2);
    //                     }
    //                 })
    //             })
    //         }
    //         callback(curDataCell);
    //         //利用回调函数遍历所有子节点
    //         function callback2(cur) {
    //             cur.children.forEach(function (value) {
    //                 tree.dataCell.forEach(function (value2) {
    //                     if(value2.decisionID == value){
    //                         hasRules.push(value2.text);
    //                         callback2(value2);
    //                     }
    //                 })
    //             })
    //         }
    //         callback2(curDataCell);
    //         //将parents重复节点去掉，应为有多个父亲，会有重复节点
    //         var newParentsRule = [];
    //         hasRules.forEach(function (value) {
    //             if(newParentsRule.indexOf(value) == -1){
    //                 newParentsRule.push(value);
    //             }
    //         });
    //         //下拉菜单中的所有span行判断，已近被用的隐藏
    //         var lis = $(this).parent().next().children('li');
    //         lis.show();
    //         for(var i=0;i<lis.length;i++){
    //             newParentsRule.forEach(function (value) {
    //                 if($(lis[i]).children()[0].innerHTML == value){
    //                     $(lis[i]).hide();
    //                 }
    //             })
    //         }
    //     }
    // });

    //编辑跳转
    $('body').on('click','.rule_edit .edit.active',function () {
        treePublic.getRuleDetailByRuleId($("#ruleId").val());
        $('.body_content .content_tree').hide();
        $('.content_edit').remove();
        $('#body_content').append(`
            <div class="content_edit">
					<div class="body_head">
						<span>编辑</span>
						<a href="javascript:;" class="close fr"></a>
					</div>
					<div class="body_padding">
						<ul class="role_list">
							<li class="clear">
								<strong><span>规则编号：</span></strong>
								<input type="text" placeholder="请输入规则编号" value="${checkRule.baseInfo.ruleName}" readonly= "true "/>
							</li>
							<li class="clear">
								<strong><span>规则名称：</span></strong>
								<!-- class="active" 输入错误状态  -->
								<input type="text" placeholder="请输入规则名称" value="${checkRule.baseInfo.ruleNo}" readonly= "true " />
								<i class="error_tip">输入错误</i>
							</li>
							<li class="clear">
								<strong><span>规则描述：</span></strong>
								<textarea placeholder="请输入规则描述" readonly= "true ">${checkRule.baseInfo.description}</textarea>
							</li>
						</ul>
						<div class="set_fields_box">
							<div class="clear">
								<span class="set_fields_title fl">选择字段</span>
								<div class="set_fields_centent fl" id="set_fields_centent">
									<p class="set_fields_text"></p>
								</div>
							</div>
						</div>
						<div class="logic_set">
							<p class="set_fields_title">逻辑设置</p>
							<form id="form1" action="">
                                <div class="logic_set_box" id="logic_set_box">
                                    <div class="logic_set_parent" id="login_set_parent"></div>
                                    <div class="template_btn template_btn1 template_btn2" id="template_btn2" style="display:block;">
                                        <a href="javaScript:;" class="sure fr finish">保存</a>
                                    </div>
                                </div>
							</form>
						</div>
					</div>
				</div>`)
        checkRule.getSelectFields();
        rulePublic.addFields();
        checkRule.ruleContent();

        //初始化校验
        rulePublic.initValidator();
    });
    //编辑-关闭
    $('body').on('click','.body_head .close',function () {
        $('.body_content .content_tree').show();
        $('.body_content .content_edit').remove();
        // $('#login_set_parent').empty();
        $('#tree_map_left').width($('#tree_parent').width()-266);
    });
    //编辑-保存
    $('body').on('click','.template_btn2 .finish',function () {
        treePublic.save();
        if(treePublic.saveResult==1){
            $('.body_content .content_tree').show();
            $('.body_content .content_edit').remove();
            // $('#login_set_parent').empty();
            $('#tree_map_left').width($('#tree_parent').width()-266);
        }
    })
    //规则元素点击事件
    tree.paper.on('cell:pointerclick',function (e,d) {
        if(e.model.attributes.type == 'standard.Rectangle'){
            // console.log('cell');
            treePublic.showRuleMsg(e.model.decisionID);
            $('.input_drop_down_box input').val('').attr('placeholder','请选择规则')
        }else if(e.model.attributes.type == 'examples.CustomLink'){
            // console.log('link');
            //兄弟节点已经存在的策略不能选择
            //也就是在父元素节点的links里面存在的出本身以外的策略隐藏
            $('.selection ul li').show();
            //1.找到本身数据节点
            var source = null;
            var dataSource = null;
            var sourceId = e.model.get('source').id;
            if(sourceId){
                source = tree.graph.getCell(sourceId);
            }
            //2.找到数据节点
            tree.dataCell.forEach(function (value) {
                if(value.decisionID == source.decisionID){
                    dataSource = value;
                }
            });
            //3.根据数据节点进行判断
            dataSource.links.forEach(function (value) {
                switch (value){
                    case '通过':
                        $('.selection ul li.success').hide();
                        break;
                    case '拒绝':
                        $('.selection ul li.refuse').hide();
                        break;
                    case '通过拒绝':
                        $('.selection ul li.success').hide();
                        $('.selection ul li.refuse').hide();
                        break;
                    case '人工复核':
                        $('.selection ul li.review').hide();
                        break;
                    case '通过人工复核':
                        $('.selection ul li.success').hide();
                        $('.selection ul li.review').hide();
                        break;
                    case '拒绝人工复核':
                        $('.selection ul li.refuse').hide();
                        $('.selection ul li.review').hide();
                        break;
                    case '通过拒绝人工复核':
                        $('.selection ul li.success').hide();
                        $('.selection ul li.refuse').hide();
                        $('.selection ul li.review').hide();
                        break;
                }
            });



            //将当前点击策略显示
            var lineText = '';
            if(tree.tempOperate.attr().text){
                lineText = tree.tempOperate.attr().text.text;
            }
            var index = 0;
            if(lineText){
                index = lineText.indexOf('\n');
            }
            //去掉换行符
            if(index>=0){
                var tempArr = lineText.split('');
                tempArr.splice(index,1);
                lineText = tempArr.join('');
            }

            //4. 将本身显示
            switch (lineText){
                case '通过':
                    $('.selection ul li.success').show();
                    break;
                case '拒绝':
                    $('.selection ul li.refuse').show();
                    break;
                case '人工复核':
                    $('.selection ul li.review').show();
                    break;
                case '通过拒绝':
                    $('.selection ul li.success').show();
                    $('.selection ul li.refuse').show();
                    break;
                case '通过人工复核':
                    $('.selection ul li.success').show();
                    $('.selection ul li.review').show();
                    break;
                case '拒绝人工复核':
                    $('.selection ul li.refuse').show();
                    $('.selection ul li.review').show();
                    break;
                case '通过拒绝人工复核':
                    $('.selection ul li.success').show();
                    $('.selection ul li.refuse').show();
                    $('.selection ul li.review').show();
                    break;
            }

            if(lineText == '通过'){
                $('.selection ul li.success').addClass('selected');
            }else if(lineText == '拒绝'){
                $('.selection ul li.refuse').addClass('selected');
            }else if(lineText == '人工复核'){
                $('.selection ul li.review').addClass('selected');
            }else if(lineText == '通过人工复核'){
                $('.selection ul li.success').addClass('selected');
                $('.selection ul li.review').addClass('selected');
            }else if(lineText == '拒绝人工复核'){
                $('.selection ul li.refuse').addClass('selected');
                $('.selection ul li.review').addClass('selected');
            }else if(lineText == '通过拒绝'){
                $('.selection ul li.success').addClass('selected');
                $('.selection ul li.refuse').addClass('selected');
            }else if(lineText == '通过拒绝人工复核'){
                $('.selection ul li.success').addClass('selected');
                $('.selection ul li.refuse').addClass('selected');
                $('.selection ul li.review').addClass('selected');
            }

        }
    });
};
//拖拽绝策树图
treePublic.dragEle = function(opt){
    //可以来点判断，当调用这个函数时输入参数错误时提示
    if(!opt.dragEle){
        console.log('要拖拽的元素是哪个');
    }
    var dragEle = opt.dragEle;
    var dragWrap = opt.dragWrap;

    //原理，点击元素，获取源位置，移动鼠标，获取目标位置，鼠标移动多少元素移动多少
    var sourcePos = {left:0,top:0};
    var targetPos = {left:0,top:0};
    var elePos = {left:0,top:0};
    //元素宽高为了碰撞检测
    var box = {height:0,width:0};
    var son = {height:0,width:0};
    dragEle.mousedown(function(event){
        elePos.left = dragEle.position().left;
        elePos.top = dragEle.position().top;
        sourcePos.left=event.pageX;
        sourcePos.top=event.pageY;
        //因为有可能盒子也会变，所以也获取当前盒子大小
        box.width = dragWrap.width();
        box.height = dragWrap.height();
        son.width = dragEle.width();
        son.height = dragEle.height();
        if(event.target.tagName == 'svg'){
            $(document).mousemove(function(event){
                targetPos.left = event.pageX;
                targetPos.top = event.pageY;
                //这个elePos为元素位置，点击时获取
                var left = elePos.left + targetPos.left - sourcePos.left;
                var top = elePos.top + targetPos.top - sourcePos.top;
                //碰撞检测
                if(left>0){
                    left = 0;
                }
                if(top>0){
                    top = 0;
                }
                if(left<box.width-son.width){
                    left = box.width-son.width;
                }
                if(top<box.height-son.height){
                    top = box.height-son.height;
                }
                dragEle.css({
                    left: left + 'px',
                    top: top + 'px'
                })
            });
        }
    });
    $(document).mouseup(function(){
        $(document).off('mousemove');
    });
};
//缩放决策树图
treePublic.zoom = function(calback) {
    //滑块top和下面这个的比例就为要放大的比例
    var disH = $('.slider_box').height() - $('.slider').height();
    $( ".slider" ).draggable({ axis: "y" ,containment: ".slider_box", scroll: false });

    $('.slider').mousedown(function () {
        $(document).mousemove(function () {
            var top = $('.slider').position().top;
            calback(top/disH);
        })
    });
    $(document).mouseup(function () {
        $(document).off('mousemove');
    });

    $('.scale .add').click(function () {
        var top = $('.slider').position().top;
        top-=10;
        if(top<0){
            top = 0;
        }
        $('.slider').css({
            top:top + 'px'
        });
        calback(top/disH);
    });
    $('.scale .reduce').click(function () {
        var top = $('.slider').position().top;
        top+=10;
        if(top>disH){
            top = disH;
        }
        $('.slider').css({
            top:top + 'px'
        });
        calback(top/disH);
    })
};
//判断是否可以下载
treePublic.isDownLoadPNG = function () {
    var isDownLoadPNG = true;
    //1.有节点没选择规则不让下载
    tree.dataCell.forEach(function (value) {
        if(value.text == '请选择规则'){
            isDownLoadPNG = false;
        }
        value.links.forEach(function (value2) {
            if(value2 == '请选择策略'){
                isDownLoadPNG = false;
            }
        })
    });
    return isDownLoadPNG;
};
//是初始化树还是根据数据生成树
treePublic.beginDecisionTree = function (opt) {
    if(opt.dataMsg.length == 0){
        //默认第一个规则
        tree.initCreate({
            left:$('#tree_map_son').width()/2 - 80,
            top:100,
            text:'请选择规则'
        });
    }else{
        //根据数据生成树
        tree.createFromData(opt.dataMsg);
    }
    //规则下拉菜单
    treePublic.dropDownMenu({
        ele:$('#menu_box1'),
        data:opt.dropMenu,
        callBack:function(ruleName,index){
            //获取当前文本
            var tempText = ruleName;
            //遍历数据，找到相应数据节点，改变
            tree.cellMsg.forEach(function(value){
                if(tree.tempOperate == value){
                    value.attr('text/fill','#fff');
                    value.attr('rect/fill','#5E97F0');
                    value.attr('text/text',tempText);
                    $('.treeOperate').addClass('can');
                    $('.decision_tree_wrap p.hint').hide();

                    $('.hasRuleMsg').addClass('active');
                    $('.noRuleMsg').removeClass('active');
                    $('.rule_edit .edit').addClass('active');

                    tree.dataCell.forEach(function(value2){
                        if(value.decisionID == value2.decisionID){
                            value2.text = tempText;
                            value2.ruleID = index;
                        }
                    });

                    treePublic.showRuleMsg(tree.tempOperate.decisionID);
                }
            });
            $('.down_menu_btn').attr('data-id',0);
            $('.tree_map_left .hint').hide();
            $('.down_menu_list li').removeClass('active');
        }
    });
};

treePublic.getRuleDetailByRuleId=function(ruleId){
    $.ajax({
        url:sceneStep3GetSceneRulesDetailByRuleId,
        type:"post",
        data:{
            "ruleId":ruleId
        },
        async : false,
        success: function(result) {//回调函数，result，返回值
            console.log(JSON.stringify(result));
            conversionSingleData(result);
        },
        error:function(){
            aide.alert("异常");
        }
    });
}


treePublic.save=function(){
    treePublic.saveResult=-1;
    var logicCheckFlag=true;
    $(".logic_set_list .strategy_setUp_btn").each(function(index,item){
        if($(item).find(".active").length>0){
            $(item).nextAll(".dec_set_error").hide();
        }else{
            $(item).nextAll(".dec_set_error").show();
            logicCheckFlag=false;
        }
    })
    if(!($("#form1").valid())||!logicCheckFlag){
        return;
    }
    var param=[];
    var rule={};
    rule.id=$("#ruleId").val();
    rule.sceneId=id;
    //获取逻辑数据
    rule.logicString=[];
    $(".set_number").each(function(index,item){
        var logic={};
        logic.atomList=[];
        //获取单个字段逻辑
        var fieldMap=new Map();
        $(this).find(".setUp_content_tab tr").each(function(){
            if($(this).attr("data-type")==1||$(this).attr("data-type")==2){
                fieldMap[$(this).attr("data-id")]={
                    "fieldId":$(this).attr("data-id"),
                    "type":5,
                    "dataValue":$(this).find(".setUp_content_tab_td3 .setUp_text_input").eq(0).val()+","+$(this).find(".setUp_content_tab_td3 .setUp_text_input").eq(1).val()
                }
            }else if($(this).attr("data-type")==4){
                fieldMap[$(this).attr("data-id")]={
                    "fieldId":$(this).attr("data-id"),
                    "type":$(this).find(".setUp_content_tab_td3 .down_btn1 input").val()==0?1:2,
                    "dataValue":$(this).find(".setUp_content_tab_td3 .logic_template_box .down_btn2 input").attr("data-code"),
                }
            }else if($(this).attr("data-type")==5){
                fieldMap[$(this).attr("data-id")]={
                    "fieldId":$(this).attr("data-id"),
                    "type":$(this).find(".setUp_content_tab_td3 .down_btn1 input").val()==0?3:4,
                    "dataValue":$(this).find(".setUp_content_tab_td3 .setUp_text  input").val()
                }
            }
        })
        //获取逻辑的执行顺序
        var tempData=[];
        var logicLine=[];
        var defaultOrder="";
        for(var i=0;i<$(this).find(".execute_setUp_parent .execute_common").length;i++){
            var logicData=$(this).find(".execute_setUp_parent .execute_common");
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
        $(this).find(".execute_setUp_parent .pattern_line").each(function(){
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
            "type":1,
            "value":parseInt($(this).find(".strategy_setUp .strategy_setUp_btn").attr("data-id"))+1,
            "isPerform":$(this).find(".slide_btn").attr("data-id")
        }];
        rule.logicString.push(logic);

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
                "type": 1,
                "value": parseInt($(".logic_set_list:last").find(".strategy_setUp_btn").attr("data-id"))+1,
                "isPerform":$(".logic_set_list:last").find(".slide_btn").attr("data-id")
            }],
            "priority": ""
        }
    )
    param.push(rule);
    console.log(JSON.stringify(param));
    $.ajax({
        url:sceneStep3UpdateAtomAndDecision_Dec,
        type:"post",
        data:{"rules":JSON.stringify(param)},
        async : false,
        success: function(result) {//回调函数，result，返回值
            if(result != -1){
                treePublic.saveResult=1;
            }else{
                aide.alert("修改失败");
            }
        },
        error:function(){
            aide.alert("异常");
        }
    });
}

//规则信息展示
treePublic.showRuleMsg = function (id) {
    $('.hasRuleMsg').empty();
    var nowRuleID = null;
    var ifCreateHtml = true;
    tree.dataCell.forEach(function (value) {
        if(value.decisionID == id){
            nowRuleID = value.ruleID;
            if(value.ruleID==0){
                ifCreateHtml = false;
            }
        }
    });
    var ruleObj=rulePublic.ruleMap[nowRuleID];
    console.log(nowRuleID);

    //根据ruleID生成规则信息列表

    if(ifCreateHtml&&ruleObj!=null&& ruleObj!='undefined'){
        var html = `
	<input type="hidden" value="${nowRuleID}" id="ruleId">
    <div class="item item_name">
        <span class="name">• 	名称</span>
        <br>
        <span>${ruleObj.ruleName}</span>
    </div>
    <div class="item item_number">
        <span class="name">• 	编号</span>
        <br>
        <span>${ruleObj.ruleNo}</span>
    </div>
    <div class="item item_describe">
        <span class="name">• 	描述</span>
        <br>
        <span>${ruleObj.description}</span>
    </div>
    <div class="item item_use_field">
        <span class="name">• 	应用字段</span>
        <br>`;
        for(var i=0;i<ruleObj.fieldList.length;i++){
            html+=`<p><span>${ruleObj.fieldList[i].name}</span>|<span>${ruleObj.fieldList[i].typeText}</span></p>`;
        }

        html+=`</div>
            <div class="item item_strategy">
            <span class="name">• 	策略模式</span>
        <br>
        <span class="item_item">策略</span>
            </div>`;
        $('.hasRuleMsg').append(html);
    }
};

//下拉框
treePublic.dropDownMenu = function (opt) {
    if(!opt.ele) return false;
    if(!opt.data) return false;
    var ele = opt.ele || null;
    var data = opt.data || [];
    var callBack = opt.callBack || function(){};

    var  canUse= [];

    //生成下拉列表
    var list = '';
    data.forEach(function (value) {
        list += '<span dataId="'+value.dataId+'">'+value.name+'</span>';
    });
    ele.find('.menu').append(list);

    //下拉效果
    var tempInput = null,
        menu = null,
        icon = null;
    ele.click(function (e) {
        ele.children('input').attr('placeholder','搜索');

        tempInput = $(this).children('input');
        menu = $(this).children('.menu');
        icon =  $(this).children('span');

        tempInput.val('');
        canUse= [];

        //修改span是否显示
        if(tree.tempOperate && tree.tempOperate.attributes.type == 'standard.Rectangle'){
            var curDataCell = null;
            tree.dataCell.forEach(function (value) {
                if(value.decisionID == tree.tempOperate.decisionID){
                    curDataCell = value;
                }
            });
            var hasRules = [];
            //利用回调函数遍历所有父节点
            function callback(cur) {
                cur.parentID.forEach(function (value) {
                    tree.dataCell.forEach(function (value2) {
                        if(value2.decisionID == value){
                            hasRules.push(value2.text);
                            callback(value2);
                        }
                    })
                })
            }
            callback(curDataCell);
            //利用回调函数遍历所有子节点
            function callback2(cur) {
                cur.children.forEach(function (value) {
                    tree.dataCell.forEach(function (value2) {
                        if(value2.decisionID == value){
                            hasRules.push(value2.text);
                            callback2(value2);
                        }
                    })
                })
            }
            callback2(curDataCell);
            //将parents重复节点去掉，应为有多个父亲，会有重复节点
            var newHasRules = [];
            hasRules.forEach(function (value) {
                if(newHasRules.indexOf(value) == -1){
                    newHasRules.push(value);
                }
            });
            //下拉菜单中的所有span行判断，已近被用的隐藏
            var lis = $(this).find('.menu span');
            lis.show();
            for(var i=0;i<lis.length;i++){
                canUse.push(lis[i]);
                newHasRules.forEach(function (value) {
                    if($(lis[i]).html() == value){
                        $(lis[i]).hide();
                        canUse.pop();
                    }
                })
            }
        }else{
            var lis_2 = $(this).find('.menu span');
            for(var j=0;j<lis_2.length;j++){
                canUse.push(lis_2[j]);
            }
            lis_2.show();
        }

        menu.slideToggle('fast');
        icon.toggleClass('up');
        e.stopPropagation();
    });
    ele.find('.menu span').click(function (e) {
        tempInput.val($(this).text());
        menu.slideUp();
        icon.removeClass('up');

        callBack($(this).text(),$(this).attr('dataid'));
        e.stopPropagation();
    });
    $(document).click(function () {
        if(menu){
            menu.slideUp();
            icon.removeClass('up');
        }
    });

    //模糊查询
    //1.先获取到已经被隐藏起来的元素，等会显示隐藏除这些之外的元素,这一步要在点击显示时候取得

    ele.find('input').on('input',function () {
        var inputVal = $(this).val();
        //在当前显示部分里面查询，在canUse数组里面查询
        canUse.forEach(function (value) {
            // 1.没回先把他们全部显示，在判断是否隐藏
            $(value).show();
            // 2.判断需要隐藏的元素
            if($(value).html().indexOf(inputVal) == -1){
                $(value).hide();
            }
        });
    })
};
//弹窗
treePublic.zAlert = function (msg,callback) {
    var html = '<div class="zAlert">\n' +
        '\t<div class="content">\n' +
        '\t\t<a class="close"></a>\n' +
        '\t\t<p class="msg">'+msg+'</p>\n' +
        '\t\t<div class="operate">\n' +
        '\t\t\t<a class="ok">确定</a>\n' +
        '\t\t\t<a class="cancel">取消</a>\n' +
        '\t\t</div>\n' +
        '\t</div>\n' +
        '</div>';
    $('body').append(html);
    $('.zAlert .ok').click(function () {
        callback(function () {
            $('.zAlert').remove();
        });
    });
    $('.zAlert .cancel').click(function () {
        $('.zAlert').remove();
    });
    $('.zAlert .close').click(function () {
        $('.zAlert').remove();
    })
};









