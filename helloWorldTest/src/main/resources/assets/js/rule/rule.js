//页面模块名称
var rule = {};

var initRuleList={};

var pageNow=1;

rule.strategyAuth = '';  //策略
rule.gradAuth = '';   //评分
rule.selectAuth = '';
rule.updateAuth = '';
rule.deleteAuth = '';
//初始化
rule.init =function(){

    rule.strategyAuth = aide.judgeAuth('ruleEngine/strategy');
    rule.gradAuth = aide.judgeAuth('ruleEngine/grad');
    rule.selectAuth = aide.judgeAuth('ruleEngine/selectRule');
    rule.updateAuth = aide.judgeAuth('ruleEngine/updateRule');
    rule.deleteAuth = aide.judgeAuth('ruleEngine/deleteRule');

    if (rule.selectAuth == '') {
        //日期选择设置
        jeDate("#startDate", {
            format: "YYYY-MM-DD",
            isClear: false,
            isToday: false,
            maxDate: function (that) {
                return jeDate.valText('#endDate') == "" ? aide.maxdate : jeDate.valText('#endDate');
            },
            donefun: function (obj) {
                if (jeDate.valText('#endDate') != "" && obj.val != "") {
                    createPage();
                }
            }
        });
        jeDate("#endDate", {
            format: "YYYY-MM-DD",
            isClear: false,
            isToday: false,
            minDate: function (that) {
                return jeDate.valText('#startDate') == "" ? aide.mindate : jeDate.valText('#startDate');
            },
            donefun: function (obj) {
                if (jeDate.valText('#startDate') != "" && obj.val != "") {
                    createPage();
                }
            }
        });
    }
    //分页
    /*aide.page({
        id:'page',
        sum:initRuleList.total,
        onOff:true,
        nowNum:1,
        allNum:initRuleList.pages,
        callBack:function(now,all,sum){

            find(10,now);
            //alert('当前页:'+now+',总共页:'+all+',总条数:'+sum);
        }
    });*/
    createPage();
    //table-移入变色
    aide.tabBackground({
        id:'table_box'
    });

    //回车搜索
    $("#content").keyup(function(event){
        if(event.keyCode ==13){
            createPage();
        }
    });
}
//初始化调用
$(document).ready(rule.init);
//删除操作
rule.deleteRule = function(obj,id){
    var index = $(obj).parent().parent().index();
    aide.layerBlack(); //生成遮罩层
    //生成
    var html =`<p class="popup_text">确定删除此条规则?</p>`
    aide.popupCreate({
        id:'delete_popup',
        html:html
    });
    //关闭确认取消操作
    aide.popupOption({
        id:'delete_popup',
        close:function(oDiv){ //关闭
            aide.closeBlack(oDiv);
        },
        sure:function(oDiv){ //确定
            //执行删除操作
            toDel(id);
            $(obj).parent().parent().remove();
            aide.closeBlack(oDiv);
        },
        cancel:function(oDiv){ //取消
            aide.closeBlack(oDiv);
        }
    });
};
//删除操作
function toDel(id){
    $.ajax({
        url:delRule,
        type:"post",
        data:{id:id},
        async : false,
        success: function() {//回调函数，result，返回值
            find(10,1);
        },
        error:function(){
            aide.alert("删除规则异常");
        }
    });
}
//设置规则状态
rule.setState = function(obj,id,status){
    var dataId = $(obj).attr('data-id');
    updateStatus(id,status);
    if(dataId==0){
        $(obj).find('span').animate({left:32},200,function(){
            $(obj).addClass('state_open_active');
            $(obj).find('i').html('ON');
            $(obj).attr('data-id',1);
        })
    }else{
        $(obj).find('span').animate({left:2},200,function(){
            $(obj).removeClass('state_open_active');
            $(obj).find('i').html('OFF');
            $(obj).attr('data-id',0);
        })
    }

};

function find(pageSize,pageNow){
    console.log("$$$$"+$("#startDate").val());
    $.ajax({
        url:ruleFindAll,
        type:"post",
        data:{
            "pageSize":pageSize,
            "pageNum":pageNow,
            "search":$("#content").val(),
            "startDate":$("#startDate").val(),
            "endDate":$("#endDate").val()
            /*  "pageNum":$("#pageNum").val(),
              "search":$("#content").val()*/
        },
        dataType: "json",
        async:false,
        success: function(data) {//回调函数，result，返回值
            if (data.list.length == 0 && pageNow == 1){
                $("#list").html('');
                $(".page_parent").hide();
                $(".no_info").show();
            }else {
                $(".no_info").hide();
                initRuleList=data;
                $("#list").html(createTable(data.list));
                $(".page_parent").show();
            }

        },
        error:function(){
            aide.alert("获取数据异常");
        }
    });
    //删除提示层
    aide.tipLayer({
        id:'delete_hint2',
        oClass:'.delete_option',
        iText:'规则已被场景使用，无法删除',
        left:114,
        top:52
    });
}

function validRules(id){
    var flag = true;
    $.ajax({
        url:validRule,
        type:"post",
        data:{id:id},
        async : false,
        success: function(result) {//回调函数，result，返回值
            console.log(result);
            return result;
        }
    });
}

rule.queryList=function(){
    createPage();
}

function createTable(data){
    var html = "";
    for(var i = 0 ;i<data.length;i++){
        var no = aide.notNull(data[i].no);
        var name = aide.notNull(data[i].name);
        html +="<tr>";
        //规则编号
        html +="<td class='table_padding' title="+ no +">"+no+"</td>";
        //规则名称
        html +="<td title="+ name +">"+name+"</td>";
        //策略配置
        var decisionArry = data[i].decisionType.split(",");

        html +="<td><div class='configuration'>";
        if(decisionArry.indexOf("1")!= -1){
            html +="<span class='active'>策略 </span>";
        }else{
            html +="<span>策略</span> ";
        }
// 				if(decisionArry.contains("2")){
// 					html +="<span class='active'>权重 </span>";
// 				}else{
// 					html +="<span>权重</span>";
// 				}
        if(decisionArry.indexOf("3")!= -1){
            html +="<span class='active'>评分 </span>";
        }else{
            html +="<span>评分</span>";
        }
        html +="</div></td>";
        //创建时间
        html +="<td>"+ aide.notNullOfDateTime(data[i].creatTime)+"</td>";
        //规则状态
        var status = data[i].status;
        if (rule.updateAuth == ''){
            html += "<td>";
            if(status == 0){
                html += "<strong class='state_open state_open_active' data-id='1' onclick='rule.setState($(this),"+data[i].id+","+data[i].status+")'>";
                html +="<i>ON</i>"+"<span></span>"+"</strong>";
            } else if(status == 1){
                html += "<strong class='state_open' data-id='0' onclick='rule.setState($(this),"+data[i].id+","+data[i].status+")'>";
                html +="<i>OFF</i>"+"<span></span>"+"</strong>";
            }else{
                html +="";
            }
            html +="</td>";
        }
        //操作
        html +="<td class='options'>";
        html +="<a href='"+editRuel+"?ruleId="+data[i].id+"' class='check_option option_left10' title='修改'"+ rule.updateAuth +">修改</a>";

        if(data[i].ifRuleUsed!=0){
            html +="<a href='javaScript:;' class='check_option option_left11 delete_option' title='删除'"+ rule.deleteAuth +"><span>删除</span></a>";
        }else{
            html +="<a href='javaScript:;' class='check_option option_left11' title='删除' onclick='rule.deleteRule($(this),"+data[i].id+")'"+ rule.deleteAuth +">删除</a>";
        }
        html +="</td>";

        html +="</tr>";
    }
    return html;
}

function updateStatus(id,status){
    $.ajax({
        url:updateStatusUrl,
        type:"post",
        data:{
            "id":id,
            "status": (0 == status)?1:0
        },
        async : false,
        success: function(data) {//回调函数，result，返回值
            if(data == 1){
                /*rule.queryList();*/
            }else{
                aide.alert("修改失败");
            }
        },
        error:function(){
            console.log("异常");
        }
    });
}

function createPage(){
    //分页
    aide.page({
        id: 'page',
        onOff: true,
        nowNum: 1,
        callBack: function (now, all, sum) {
            console.log('当前页:'+now+',总共页:'+all+',总条数:'+sum);
            pageNow = now;
            find(10, pageNow);
            return initRuleList;
        }
    })
}







