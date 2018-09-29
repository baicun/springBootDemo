//页面模块名称
var data = {};
var initFieldList={};
var pageNow=1;
var type=null;
var isDataSource=null;
data.orderSort="desc";

data.selectAuth = '';
data.updateAuth = '';
data.deleteAuth = '';
//初始化
data.init =function() {

    data.selectAuth = aide.judgeAuth('dataEngine/selectData');
    data.updateAuth = aide.judgeAuth('dataEngine/updateData');
    data.deleteAuth = aide.judgeAuth('dataEngine/deleteData');

    if (data.selectAuth == '') {
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
    //table-下拉菜单-数据类型
    aide.downMenu({
        id: 'down_menu1',
        data: [
            {'dataId': '0', 'name': '请选择'},
            {'dataId': '1', 'name': '整数'},
            {'dataId': '2', 'name': '小数'},
            {'dataId': '4', 'name': '字典'},
            {'dataId': '5', 'name': '文本'}
        ],
        callBack: function (obj, index) {
            if (index == 0) {
                type = null;
            } else {
                type = index;
            }
            //分页
            createPage();
        }
    });
    //table-下拉菜单-是否使用数据源
    aide.downMenu({
        id: 'down_menu2',
        data: [
            {'dataId': '0', 'name': '请选择'},
            {'dataId': '1', 'name': '是'},
            {'dataId': '2', 'name': '否'},
        ],
        callBack: function (obj, index) {
            if (index == 0) {
                isDataSource = null;
            } else if (index == 1) {
                isDataSource = 1;
            } else if (index == 2) {
                isDataSource = 0;
            }
            //分页
            createPage();
        }
    });
    createPage();

    //table排序
    aide.sort({
        id: 'order',
        tabId: 'table_box',
        callBack:function (onOff) {
            if(onOff){
                data.orderSort = "desc";
            }else{
                data.orderSort = "asc";
            }
            //createPage();
            find(10, pageNow, type, isDataSource);
        }
    });

    //table-移入变色
    aide.tabBackground({
        id: 'table_box'
    });
    //上传进度条
    data.upload();
	//批量导入字段-按钮
	$('#upload_btn').on('click',function(){
        removeDiv();
        $("#fileNameIds").text("支持扩展名：.xlsx .xls");
        $('.upload_error_text').hide();
        $('#fileNameIds').removeClass('upload_error_icon');
		aide.layerBlack(); //生成遮罩层
		aide.popupOption({
			id:'upload_popup',
			close:function(oDiv){ //关闭
				aide.closeBlackHide(oDiv);
			},
			sure:function(oDiv){ //确定
                data.toupload();
				//aide.closeBlackHide(oDiv);
			},
			cancel:function(oDiv){ //取消
				aide.closeBlackHide(oDiv);
			}
		});
	});

    //回车搜索
    $("#search").keyup(function(event){
        if(event.keyCode ==13){
            createPage();
        }
    });
}
//初始化调用
$(document).ready(data.init);
//删除操作
data.deleteData = function(obj,id){
	var index = $(obj).parent().parent().index();
	aide.layerBlack(); //生成遮罩层
	//生成
	var message = '是否要删除字段';
	var info = $(obj).parent().parent().find("td:eq(0)").html();
	var html =`<p class="popup_text">${message}<span>${info}</span>？</p>`
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

function createPage(){
    //分页
    aide.page({
        id: 'page',
        onOff: true,
        nowNum: 1,
        callBack: function (now, all, sum) {
            console.log('当前页:'+now+',总共页:'+all+',总条数:'+sum);
            pageNow = now;
            find(10, pageNow, type, isDataSource);
            return initFieldList;
        }
    })
}

function toDel(id){
    $.ajax({
        url:fieldDel,
        type:"post",
        headers:{"X-CSRF-TOKEN":$("#csrfId").val()},
        data:{id:id},
        async : false ,
        success: function(data) {//回调函数，result，返回值
            if(data == 1){
                find();
            }else{
                aide.alert("删除字段失败");
            }
        },
        error:function(){
            aide.alert("删除字段异常");
        }
    });
}


// 添加进度条显示
function addShow() {
    var html = "";
    html += "<div class='progress_bar clear' id='remove'>";
    html += "<div class='progress_bar_par fl'>"
    html += "<div class='progress_bar_son'></div>"
    html += "</div>"
    html += "<div class='progress_bar_num fl'>0%</div>"
    html += "</div>"

    $("#progress").html(html);
}





function find(pageSize,pageNow,type,isDataSource){
    $.ajax({
        url:fieldFindAll,
        type:"post",
        headers:{"X-CSRF-TOKEN":$("#csrfId").val()},
        data:{
            "pageSize":pageSize,
            "pageNum":pageNow,
			"type":type,
			"isDataSource":isDataSource,
			"startDate":$("#startDate").val(),
			"endDate":$("#endDate").val(),
			"search":$("#search").val(),
            "sort":"id",
            "order":data.orderSort,

        },
        dataType: "json",
        async : false,
        success: function(data) {//回调函数，result，返回值
            if (data.list.length == 0 && pageNow == 1){
                $("#list").html('');
                $(".page_parent").hide();
                $(".no_info").show();
            }else {
                $(".no_info").hide();
                initFieldList=data;
                $("#list").html(createTable(data.list));
                $(".page_parent").show();
            }

        },
        error:function(data){
            aide.alert("获取数据异常");
        }
    });
    //删除提示层
    aide.tipLayer({
        id: 'delete_hint1',
        oClass: '.delete_option',
        iText: '字段已建立规则或建立映射关系后，无法删除，如需删除请先删除对应的规则、场景或去除映射关系。',
        left: 174,
        top: 85
    })
    //修改提示层
    aide.tipLayer({
        id: 'delete_hint',
        oClass: '.alter_option',
        iText: '字段已建立规则，无法修改或删除，如需修改或删除请先删除对应的规则。',
        left: 174,
        top: 70
    })

}

function createTable(data1){
    /*console.log(JSON.stringify(data1));*/
    var html = "";
    for(var i = 0 ;i<data1.length;i++){

        var name = aide.notNull(data1[i].name);
        var value = aide.notNull(data1[i].value);

        html +="<tr data-time='"+data1[i].creatTime+"'>";
        //字段名称
        html +="<td class='table_padding' title="+ name +">"+name+"</td>";
        //英文字段名称
        html +="<td title="+ value +">"+value+"</td>";
        //字符类型
        var type = data1[i].type;
        var typeTd = "";
        if(type == 1) typeTd ="整数";
        else if(type == 2) typeTd ="小数";
        else if(type == 3) typeTd ="布尔";
        else if(type == 4) typeTd ="字典";
        else if(type == 5) typeTd ="文本";
        html += "<td>" + typeTd + "</td>";
        var ds = data1[i].dataSource;
        var dataSource = "";
        if(ds==1) {
            dataSource ="<td>是</td>"+"<td>"+data1[i].iName+"</td>";
            /*var exparName = String((JSON.parse(data1[i].iExparValue).interExpar.exparName));*/

           try{
                var exparName = String((JSON.parse(data1[i].iExparValue).interExpar.exparName));

                if(exparName=="undefined"||exparName==''||exparName==null) throw "undefined";
            }
            catch(err) { console.log(err);exparName="undefined" ;}

            if(exparName=="undefined"||exparName==''||exparName==null){
                dataSource += "<td></td>";
            }else{
                dataSource += "<td>"+String((JSON.parse(data1[i].iExparValue).interExpar.exparName))+"</td>";
            }
        } else if(ds==0) { dataSource ="<td>否</td>"+"<td>--</td>"+"<td>--</td>"; }
        html += dataSource;
        var time = aide.notNullOfDateTime(data1[i].creatTime);
        //创建日期
        html +="<td title='"+ time +"'>"+ time +"</td>";
        //操作
        html +="<td class='options'>";

        //查看操作
        var check = "<a href='javaScript:;' class='check_option option_left10' onClick='data.editField("+data1[i].id+','+2  +")'"+ data.selectAuth +">查看</a>";

        //如果ifRelation为“1”，则字段已经建立规则
        if(parseInt(data1[i].ifRelation)==0 && parseInt(data1[i].ifRuel)==0){//未建立映射和规则
            // console.log("ifRelation"+parseInt(data1[i].ifRelation));
            // console.log("ifRuel"+parseInt(data1[i].ifRuel));

            html+= check;

            html +="<a href='javaScript:;' class='check_option option_left11' onClick='data.editField("+data1[i].id+','+1+")'"+ data.updateAuth +">修改</a>";

            html +="<a href='javaScript:;' class='check_option option_left12'  onclick='data.deleteData($(this),"+data1[i].id+")'"+ data.deleteAuth +">删除</a>";
        }else{
            if(parseInt(data1[i].ifRuel)!=0){

                html+= check;
                //字段已建立规则,无法修改
                html +="<a href='javaScript:;'  class='check_option option_left11 alter_option'"+ data.updateAuth +"><span>修改</span></a>";

                //字段已建立规则,无法删除，如需删除，请先删除对应的规则
                html +="<a href='javaScript:;'  class='check_option option_left12 delete_option' "+ data.deleteAuth +"><span>删除</span></a>";
            }
            else if(parseInt(data1[i].ifRelation)!=0){

                html+= check;

                //字段已建立映射关系,无法修改
                html +="<a href='javaScript:;'  class='check_option option_left11 alter_option' "+ data.updateAuth +"><span>修改</span></a>";
                /*html +="<a href='javaScript:;' class='check_option option_left11' onClick='data.editField("+data1[i].id+','+0+")'>修改</a>";*/

                //字段已产生映射关系，无法删除，如需删除，请先去除对应的映射关系
                html +="<a href='javaScript:;'  class='check_option option_left12 delete_option'"+ data.deleteAuth +" ><span>删除</span></a>";
            }
        }
        html +="</td>";
        html +="</tr>";
    }
    return html;
}


data.editField =function (id,ifRelation){
    if(ifRelation!="2"){
        //验证是否可以编辑
        var flagData = -1;
        $.ajax({
            url:fieldEditValidate,
            type:"post",
            headers:{"X-CSRF-TOKEN":$("#csrfId").val()},
            data:{id:id},
            async : false ,
            success: function(data) {//回调函数，result，返回值
                flagData=data;
            },
            error:function(){
                aide.alert("开启字段编辑异常");
            }
        });
        if(flagData==-1){
            aide.alert("系统异常，无法编辑");
            return;
        }else if(flagData==1){
            aide.alert("字段已被规则使用，无法编辑");
            return;
        }else if(flagData==2){
            aide.alert("字段已被关联数据源的自定义字段使用，无法编辑");
            return;
        }
    }
    window.location.href = fieldEdit+"?id="+id+"&ifRelation="+ifRelation;
}


function queryList(){
    /*find(10,1,type,isDataSource);
    //分页
    aide.page({
        id:'page',
        sum:initFieldList.total,
        onOff:true,
        nowNum:1,
        allNum:initFieldList.pages,
        callBack:function(now,all,sum){
            //alert('当前页:'+now+',总共页:'+all+',总条数:'+sum);
            pageNow=now;
            find(10,pageNow,type,isDataSource);
        }
    })*/
    createPage();
}
// 删除进度条显示
function removeDiv() {
    var my = document.getElementById("remove");
    if (my != null)
        my.parentNode.removeChild(my);
}

 data.toupload=function(){
     $('.upload_error_text').hide();
     addShow();
    $.ajaxFileUpload({
        url : excelImport,
        secureuri : false,//是否需要安全协议
        fileElementId : 'file',
        data:{"_csrf":$("#csrfId").val()},
        dataType : "json",
        type : 'POST',
        async : false,
        success : function(data) {
            $('#file').val("");
            $("#fileNameIds").text("");
            var msg = "";
            var reData = eval('(' + data + ')');
            if(reData.flag == 1){
                var num = 100;
                $('.progress_bar_son').css('width',num+'%');
                $('.progress_bar_num').html(num+'%');
                $('.fileNameIds').attr('class', 'upload_success_icon');
                msg = "上传成功!，总共上传:"+reData.total+"条,其中上传成功:"+reData.act+"条,字段重复:"+reData.field+"条,字典重复:"+reData.dicCode+"条";
            }else if(reData.flag == 2){
                removeDiv();
                $('.fileNameIds').attr('class', 'upload_error_icon');
                msg = "模板为空";
            }else if(reData.flag == 3){
                removeDiv();
                $('.fileNameIds').attr('class', 'upload_error_icon');
                msg = "模板没有可用值";
            }else if(reData.flag == 4){
                removeDiv();
                $('.fileNameIds').attr('class', 'upload_error_icon');
                msg = "参数有误，错误原因为："+reData.errReason;
            }else if(reData.flag == 5){
                removeDiv();
                $('.fileNameIds').attr('class', 'upload_error_icon');
                msg = "上传的字段已全部存在";
            }else if(reData.flag == 6){
                removeDiv();
                $('.fileNameIds').attr('class', 'upload_error_icon');
                msg = "上传的字段字典的编码或者描述重复";
            }else if(reData.flag == -1){
                removeDiv();
                $('.fileNameIds').attr('class', 'upload_error_icon');
                msg = "系统错误，请联系管理员";
            }else{
                removeDiv();
                $('.fileNameIds').attr('class', 'upload_error_icon');
                msg = "异常，请联系管理员";
            }
            //alert(msg);
            $('.upload_error_text').text(msg);
            $('.upload_error_text').show();
            $('#file ').next().html("重新上传");
        },
        error : function() {
            aide.alert("上传异常，请联系管理员");
            return false;
        }
    });
}


//选择excel
    data.fileUpload=function(obj) {
    console.log(obj);
    console.log(obj.value);
        if (obj != null && obj.value != "") {
            var reg = /\.*.(xlsx|xls)$/;
            var fileName = obj.value;
            if (!fileName.match(reg)) {
                $(obj).after($(obj).clone().val(""));
                $(obj).remove();
                $("#fileNameIds").text("支持扩展名：.xlsx .xls");
                $(".upload_error_text").text("请上传xlsx或xls格式模板！");
                $('.upload_error_text').show();
                /*aide.alert("请上传xlsx或xls格式模板！");*/
            } else {
                var val = $("#file").val();
                val = val.substr(val.lastIndexOf('\\') + 1);
                $("#fileNameIds").text(val);
                $('.upload_error_text').hide();
                $('#fileNameIds').removeClass('upload_error_icon');
                //data.toupload();
                // $(obj).val("");
            }
        } else {
            $("#fileNameIds").text("支持扩展名：.xlsx .xls");
            $('.upload_error_text').hide();
        }
    }
//上传进度条
data.upload = function(){
    var num = 100;
    $('.progress_bar_son').css('width',num+'%');
    $('.progress_bar_num').html(num+'%');
};