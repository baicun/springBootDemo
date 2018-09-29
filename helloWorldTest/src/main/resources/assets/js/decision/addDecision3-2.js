//页面模块名称
var addDecision3 = {};
addDecision3.ruleList=[];
addDecision3.ruleTree=[];
//初始化
addDecision3.init =function(){
    //获取规则数据
    addDecision3.findAllRule();
    //获取决策树数据
    addDecision3.findTreeData();
	//决策树画布调用
    treePublic.beginDecisionTree({
        dataMsg:addDecision3.ruleTree,
        dropMenu:addDecision3.ruleList
    });

    //操作绝策树，需要操作的就把这引入
    treePublic.decisionOperate()
};
//初始化调用
$(document).ready(addDecision3.init);





addDecision3.findAllRule=function (){
    $.ajax({
        url:sceneStep3GetSceneRulesDetail,
        type:"post",
        data:{
            "sceneId":id
        },
        async : false,
        success: function(result) {//回调函数，result，返回值
            console.log(JSON.stringify(result));
            for(var i = 0;i<result.length;i++){
                var ruleObj={};
                ruleObj.ruleName=result[i].name;
                ruleObj.ruleNo=result[i].no;
                ruleObj.description=result[i].description;
                ruleObj.fieldList=[];
                for(var j=0;j<result[i].fieldList.length;j++){
                    if(result[i].fieldList[j].type==1){
                        ruleObj.fieldList.push({'name':result[i].fieldList[j].name,'typeText':'整数'});
                    }else if(result[i].fieldList[j].type==2){
                        ruleObj.fieldList.push({'name':result[i].fieldList[j].name,'typeText':'小数'});
                    }else if(result[i].fieldList[j].type==4){
                        ruleObj.fieldList.push({'name':result[i].fieldList[j].name,'typeText':'字典'});
                    }else if(result[i].fieldList[j].type==5){
                        ruleObj.fieldList.push({'name':result[i].fieldList[j].name,'typeText':'文本'});
                    }
                }
                rulePublic.ruleMap[result[i].id]=ruleObj;
                addDecision3.ruleList.push({
                    'dataId':result[i].id,
                    'name':result[i].name
                });
            }
        },
        error:function(){
            aide.alert("异常");
        }
    });
}
addDecision3.save=function(){
    var data = tree.dataCell;
    console.log(JSON.stringify(data));
    if(data.length == 0){
        //aide.alert("请至少构造一条执行链");
        $('.tree_map_left p.hint').show();
        $('.tree_map_left p.hint .text').text('请至少构造一条执行链');
        return;
    }
    var selectFlag=true;
    var rootNodeNum=0;
    $.each(data,function(index,item){
        if(item.parentID.length==0){
            rootNodeNum++;
        }
        if(item.ruleID==null||item.ruleID==-1||item.ruleID==0||$.inArray(0, item.linksID)>=0||rootNodeNum>1){
            selectFlag=false;
            return false;
        }
    })
    if(!selectFlag){
        // aide.alert("请将配置填写完整!");
        $('.tree_map_left p.hint').show();
        $('.tree_map_left p.hint .text').text('请将配置填写完整');
        return;
    }
    $.ajax({
        url:sceneStep3SaveTree,
        type:"post",
        data:{
            "sceneId":id,
            "data":JSON.stringify(data)
        },
        async : false,
        success: function(result) {//回调函数，result，返回值
            if(result == 1){
                window.location.href = sceneStep3DecisionConfig+id;
            }else{
                aide.alert("新增失败");
            }
        },
        error:function(){
            aide.alert("异常");
        }
    })
}


addDecision3.findTreeData=function (){
    $.ajax({
        url:sceneStep3FindTree,
        type:"post",
        data:{
            "sceneId":id
        },
        async : false,
        success: function(result) {//回调函数，result，返回值
            console.log(JSON.stringify(result));
            if(null != result && "" != result && "undefined" != typeof(result)){
                addDecision3.ruleTree=result;
            }
        },
        error:function(){
            aide.alert("异常");
        }
    })
}




