//页面模块名称
var checkResult = {};
//图形命名空间
var echartsMap = {};
var total,pageNum,pages;
var initPageData = {};

//初始化
checkResult.init =function(){
// 获取进件结果和进件状态，场景关联字段
    queryStatusResult();
    // 初始化列表
    createPage()
	//table-移入变色
	aide.tabBackground({
		id:'table_box'
	})
}

//分页
function createPage() {
    //分页
    aide.page({
        id:'page',
        onOff:true,
        callBack:function(now,all,sum){
            console.log('当前页:'+now+',总共页:'+all+',总条数:'+sum);
            initApplyList(now);
            return initPageData;
        }
    });
}

var filedList,applyList,thIndex = 5;
// 获取进件结果和进件状态，场景关联字段
function queryStatusResult() {
    var applyNoBath = $("#applyNoBath").val();
    $.ajax({
        url: queryStatusAndResult,
        type: "post",
        data: {
            "applyNoBath": applyNoBath
        },
        async: false,
        success: function (data) {//回调函数，返回值
            $("#senceName").text(data.senceName);
            initEchatsData(data);
            filedList = data.fieldList;
        },
        error: function () {
            aide.alert("异常");
        }
    });
}


// 初始化列表
function initApplyList(page) {
    var applyNoBath = $("#applyNoBath").val();
    var enterStatus = $("#enterStatus").val();
    var enterResult = $("#enterResult").val();

    $.ajax({
        url: check,
        type: "post",
        data: {
            "applyNoBath": applyNoBath,
            "pageSize":10,
            "pageNum":page,
            "status":enterStatus,
            "enterResult":enterResult
        },
        async: false,
        success: function (data) {//回调函数，result，返回值
            total = data.total;
            pageNum = data.pageNum;
            pages = data.pages;
            applyList = data.list;
            initPageData = data;
            createHtml(data.pageNum);
            /*var pageStr = creatPage(data.total,data.pageNum,data.pages);
            $("#pageDiv>p").html(pageStr);*/

        },
        error: function () {
            aide.alert("异常");
        }
    });
    //table-下拉菜单-进件状态
    aide.downMenu({
        id:'down_menu1',
        data:[{'dataId':'1','name':'全部'},
            {'dataId':'2','name':'进件成功'},
            {'dataId':'3','name':'进件失败'},
            {'dataId':'4','name':'处理中'}
        ],
        callBack:function(obj,index){
            if (index == 1) {
                $("#enterStatus").val('');
            }else if (index == 2){
                $("#enterStatus").val('0000');
            }else if (index == 3){
                $("#enterStatus").val('9999');
            }else if (index == 4){
                $("#enterStatus").val('8001');
            }
            //分页
            createPage();
        }
    });
    //table-下拉菜单-进件结果
    aide.downMenu({
        id:'down_menu2',
        data:[{'dataId':'1','name':'全部'},
            {'dataId':'2','name':'通过'},
            {'dataId':'3','name':'人工复核'},
            {'dataId':'4','name':'拒绝'},
            {'dataId':'5','name':'无法判断'}
        ],
        callBack:function(obj,index){
            if (index == 1) {
                $("#enterResult").val('');
            }else if (index == 2){
                $("#enterResult").val('1');
            }else if (index == 3){
                $("#enterResult").val('3');
            }else if (index == 4){
                $("#enterResult").val('2');
            }else if (index == 5){
                $("#enterResult").val('0');
            }
            //分页
            createPage();
        }
    });

}

// 创建列表
function createHtml(pageNum) {
    createTheadHtml(filedList);
    createTbody(filedList,applyList,pageNum);

}
/**
 * 创建表头
 * @param filedList
 * <span>▼</span>
 */
function createTheadHtml(filedList) {
    var html = "<tr>\n" +
        " <th class='table_padding'>序号</th>\n" ;
    html += "                           <th>进件编号</th>\n" ;
    for(var i=0; i<filedList.length && i< thIndex; i++){
        html += "                           <th>"+filedList[i].name +"</th>\n" ;
    }
    if (filedList.length > 5) {
        html += "                                <th>......</th>\n" ;
    }
    html += "                                <th>\n" +
        "                                    <div class='down_menu' id='down_menu1'>\n" +
        "                                    	<div class='down_menu_btn' data-id='0'>\n" +
        "                                    		<span>进件状态</span>\n" +
        "                                    		<input type='hidden' value='0' />\n" +
        "                                    	</div>\n" +
        "                                    	<ul class='down_menu_list'></ul>\n" +
        "                                    </div>\n" +
        "                                </th>\n" +
        "                                <th>原因</th>\n" +
        "                                <th>执行规则条数</th>\n" +
        "                                <th>\n" +
        "                                    <div class='down_menu' id='down_menu2'>\n" +
			"                                    <div class='down_menu_btn' data-id='0'>\n" +
			"                                    	<span>进件结果</span>\n" +
			"                                    	<input type='hidden' value='0' />\n" +
			"                                    </div>\n" +
        "                                    	<ul class='down_menu_list'></ul>\n" +
        "                                    </div>\n" +
        "                                </th>\n" +
        "                            </tr>";
    $("#theadHtml").html(html);
}
/*<div class="down_menu" id="down_menu2">
    <div class="down_menu_btn" data-id="0">
    <span>进件结果</span>
    <input type="hidden" value="0" />
    </div>
    <ul class="down_menu_list"></ul>
    </div>*/
/**
 * 创建列表信息
 * @param filedList
 * @param applyList
 * @param pageNum
 */
function createTbody(filedList,applyList,pageNum) {
    var html = "";
    for(var i=0; i<applyList.length; i++){
        var num = (pageNum-1)*10 + i + 1;
        html += "<tr>\n" +
            "<td>"+num+"</td>\n" ;
        html +="                                <td title="+ applyList[i].applyId +">"+applyList[i].applyId+"</td>\n";
        for(var j=0;j<filedList.length && j< thIndex;j++){
            var tmp = JSON.parse(applyList[i].paramsPre);
            html +="                                <td>"+tmp[filedList[j].value]+"</td>\n";
        }
        if (filedList.length > 5) {
            html += "                                <td>...</td>\n" ;
        }
        //判断进件状态
        if(applyList[i].status=="0000"){
            html +="                                <td class=\"zStatus\">\n" +
                //"                                    <span class=\"custom-icon icon-success\"></span>\n" +
                //"                                    <span>成功</span>\n" +
                "<p class='state_dot state_dot1'>进件成功</p>"+
                "                                </td>\n" ;
        }else  if(applyList[i].status=="8001"){
            html +="                                <td class=\"zStatus\">\n" +
                //"                                    <span class=\"custom-icon icon-fail\"></span>\n" +
                //"                                    <span>正在处理</span>\n" +
                "<p class='state_dot state_dot2'>处理中</p>"+
                "                                </td>\n" ;
        }else {
            html +="                                <td class=\"zStatus\">\n" +
                //"                                    <span class=\"custom-icon icon-doing\"></span>\n" +
                //"                                    <span>失败</span>\n" +
                "                                      <p class='state_dot state_dot3'>进件失败</p>"+
                "                                </td>\n" ;
        }
        if(applyList[i].errorMsg == null || applyList[i].errorMsg == '') {
            html +="                                <td>"+"--"+"</td>\n" +
                "                                <td>"+applyList[i].hitRuleCount+"</td>\n" ;
        }else {
            html +="                                <td>"+applyList[i].errorMsg+"</td>\n" +
                "                                <td>"+applyList[i].hitRuleCount+"</td>\n" ;
        }
        //判断进件结果
        if(applyList[i].result==1){
            html += "                                <td class=\"zFruit\">通过</td>\n";
        }else if(applyList[i].result==2){
            html += "                                <td class=\"zFruit\">拒绝</td>\n";
        }else if(applyList[i].result==3){
            html += "                                <td class=\"zFruit\">人工复核</td>\n";
        }else {
            html += "                                <td class=\"zFruit\">无法判断</td>\n";
        }
        html +="                            </tr>";
    }
    $("#tbodyHtml").html(html);
}

//初始化调用
$(document).ready(checkResult.init);
//下拉菜单点击显示不同的内容
checkResult.downTemplate = function(opt){
    var fileUrl = opt.fileUrl || '';
    var fileName = opt.fileName || '';
    $('.template_file a').addClass('file_state');
    $('.template_file a').html(fileName);
    $('.template_file a').attr('href',fileUrl);
}
var echart1;
// echarts图表
function initEchatsData(data) {
    echart1 = data;
    echartsMap.color = ['#87D068','#F35600','#FFAA00'];
    echartsMap.color1 = ['#87D068','#F35600','#5E97F0','#CEDFFA'];
    echartsMap.echartsPie1();//进件状态
    echartsMap.echartsPie2();//进件结果
}
//进件状态
echartsMap.echartsPie1 = function(){
	var myChart=echarts.init(document.getElementById("echarts_map1"));
	option = {
		color:echartsMap.color,
		backgroundColor:'rgba(0,0,0,0)',
	  	tooltip : {
		  	trigger: 'item',
	  		formatter: "{a} <br/>{b} : {c} ({d}%)"
	  	},
	  	series:[{
		  	name:'进件状态',
		  	type:'pie',
		  	radius:['35%','50%'],
		  	label:{
	            normal:{
		            textStyle: {
		                color:echartsMap.textColor,
		                fontFamily:echartsMap.fontFamily
		            },
					formatter: "{b} : {c} ({d}%)"   
	            },
	        },

			data:[
		        {value:echart1.down, name:'成功'},
		    	{value:echart1.fail, name:'失败'},
		    	{value:echart1.doing, name:'正在处理'},
			]
			
		
		}]
	};
	myChart.setOption(option);
	
};
//进件结果
echartsMap.echartsPie2 = function(){
	var myChart=echarts.init(document.getElementById("echarts_map2"));
	option = {
		color:echartsMap.color1,
		backgroundColor:'rgba(0,0,0,0)',
	  	tooltip : {
		  	trigger: 'item',
	  		formatter: "{a} <br/>{b} : {c} ({d}%)"
	  	},
	  	series:[{
		  	name:'进件状态',
		  	type:'pie',
		  	radius:['35%','50%'],
		  	label:{
	            normal:{
		            textStyle: {
		                color:echartsMap.textColor,
		                fontFamily:echartsMap.fontFamily
		            },
					formatter: "{b} : {c} ({d}%)"   
	            },
	        },

			data:[
		        {value:echart1.repeat,name:'人工复核'},
		    	{value:echart1.reject,name:'拒绝'},
		    	{value:echart1.success,name:'通过'},
		    	{value:echart1.unknown,name:'无法判断'},
			]
		}]
	};
	myChart.setOption(option);
	
};