var checkDecisionTree = {};
checkDecisionTree.ruleTree=[];
checkDecisionTree.init = function () {
    checkDecisionTree.findTreeData();
    var dataMsg = checkDecisionTree.ruleTree;
    treePublic.beginDecisionTree({
        dataMsg:dataMsg
    });

    treePublic.dragEle({
        dragEle: $('.tree_map_son'),
        dragWrap: $('.tree_map_paernt')
    });

    tree.init({
        id:'tree_map_son_2',
        color:'#fff',
        gridSize:12,
        width: 1600,
        height:00
    });

    tree.createFromData(dataMsg);

    treePublic.dragEle({
        dragEle: $('.tree_map_son_2'),
        dragWrap: $('.tree_map_paernt_2')
    });

    $('.decision_pop').hide();

    $('.check_decision .check').click(function () {
        $('.decision_pop').show();
        $('body').addClass('hasPop');
        // $('body').attr('onselectstart','return flase');
    });
    $('.decision_pop .close').click(function () {
        $('.decision_pop').hide();
        $('body').removeClass('hasPop');
    })
};


checkDecisionTree.findTreeData=function (){
    $.ajax({
        url:sceneStep3FindTree,
        type:"post",
        data:{
            "sceneId": $("#checkId").val()
        },
        async : false,
        success: function(result) {//回调函数，result，返回值
            console.log(JSON.stringify(result));
            if(null != result && "" != result && "undefined" != typeof(result)){
                checkDecisionTree.ruleTree=result;
            }
        },
        error:function(){
            aide.alert("异常");
        }
    })
}
//$(document).ready(checkDecisionTree.init);
